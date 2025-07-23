import { specificationStore } from "@/stores/specificationStore";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { CustomSpecification, CustomSample, CustomSizeValue } from "@/lib/type/specification/custom/type";
import Button from "@/components/Button";
import { PaperClipIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PostImagesInteractor } from "@/interactor/PostImagesInteractor";
import { dialogStore } from "@/stores/dialogStore";
import Loading from "@/components/Loading";

type CustomSampleProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
};

const CustomSampleComponent = observer((props: CustomSampleProps) => {
  const currentSpecification = specificationStore.currentSpecification as CustomSpecification;
  const [quantity, setQuantity] = useState<CustomSizeValue>({
    free: "",
    xs: "",
    s: "",
    m: "",
    l: "",
    xl: "",
  });
  const [isSample, setIsSample] = useState(false);
  const [canSendSample, setCanSendSample] = useState(false);
  const [sampleFront, setSampleFront] = useState<{ name: string; key: string } | undefined>(currentSpecification?.sample?.sampleFront);
  const [sampleBack, setSampleBack] = useState<{ name: string; key: string } | undefined>(currentSpecification?.sample?.sampleBack);
  const [isSaving, setIsSaving] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [frontImageUrl, setFrontImageUrl] = useState<string | undefined>(undefined);
  const [backImageUrl, setBackImageUrl] = useState<string | undefined>(undefined);
  const [inputKey, setInputKey] = useState(0);

  // 初期化時にデータを設定
  useEffect(() => {
    if (currentSpecification?.sample) {
      setQuantity(currentSpecification.sample.quantity);
      setIsSample(currentSpecification.sample.isSample);
      setCanSendSample(currentSpecification.sample.canSendSample);
      setSampleFront(currentSpecification.sample.sampleFront);
      setSampleBack(currentSpecification.sample.sampleBack);
    }
  }, [currentSpecification?.sample]);

  // 画像の読み込み
  useEffect(() => {
    if (sampleFront?.key) {
      const fetchFrontImage = async () => {
        try {
          setImageLoading(true);
          const response = await PostImagesInteractor({
            type: "specification",
            specification_id: currentSpecification.specificationId,
            key: sampleFront.key,
            method: "get",
          });
          if (response.pre_signed_url) {
            setFrontImageUrl(response.pre_signed_url);
          }
        } catch (error) {
          console.error("Error fetching front image:", error);
        } finally {
          setImageLoading(false);
        }
      };
      fetchFrontImage();
    }
  }, [sampleFront?.key]);

  useEffect(() => {
    if (sampleBack?.key) {
      const fetchBackImage = async () => {
        try {
          setImageLoading(true);
          const response = await PostImagesInteractor({
            type: "specification",
            specification_id: currentSpecification.specificationId,
            key: sampleBack.key,
            method: "get",
          });
          if (response.pre_signed_url) {
            setBackImageUrl(response.pre_signed_url);
          }
        } catch (error) {
          console.error("Error fetching back image:", error);
        } finally {
          setImageLoading(false);
        }
      };
      fetchBackImage();
    }
  }, [sampleBack?.key]);

  const handleQuantityChange = (size: keyof CustomSizeValue, value: string) => {
    setQuantity(prev => ({ ...prev, [size]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back') => {
    setImageLoading(true);

    const file = e.target.files?.[0];
    if (!file) {
      setImageLoading(false);
      return;
    }

    const fileType = file.type.split('/')[1];
    const imageFileType = fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' ? fileType : undefined;

    if (!imageFileType) {
      dialogStore.openAlertDialog(
        "Error",
        "Only PNG, JPG, and JPEG files are supported.",
        "OK",
        false,
        () => dialogStore.closeAlertDialog()
      );
      setImageLoading(false);
      return;
    }

    try {
      const response = await PostImagesInteractor({
        type: "specification",
        specification_id: currentSpecification.specificationId,
        image_type: imageFileType,
        method: "put",
      });

      if (response.pre_signed_url) {
        await fetch(response.pre_signed_url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        const fileData = { name: file.name, key: response.key };

        if (type === 'front') {
          setSampleFront(fileData);
        } else {
          setSampleBack(fileData);
        }

        const getResponse = await PostImagesInteractor({
          type: "specification",
          specification_id: currentSpecification.specificationId,
          key: response.key,
          method: "get",
        });
        if (getResponse.pre_signed_url) {
          if (type === 'front') {
            setFrontImageUrl(getResponse.pre_signed_url);
          } else {
            setBackImageUrl(getResponse.pre_signed_url);
          }
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      dialogStore.openAlertDialog(
        "Error",
        "Failed to upload file. Please try again.",
        "OK",
        true,
        () => setImageLoading(false)
      );
    } finally {
      setImageLoading(false);
    }
  };

  const handleRemoveFile = async (type: 'front' | 'back') => {
    const fileData = type === 'front' ? sampleFront : sampleBack;
    const key = fileData?.key;
    if (!key) {
      return;
    }

    dialogStore.openAlertDialog(
      "Remove File",
      "Are you sure you want to remove this file?",
      "Remove",
      false,
      async () => {
        try {
          setImageLoading(true);
          dialogStore.closeAlertDialog();
          const preSignedUrl = await PostImagesInteractor({
            type: "specification",
            specification_id: currentSpecification.specificationId,
            key: key,
            method: "delete",
          });

          if (preSignedUrl.pre_signed_url) {
            await fetch(preSignedUrl.pre_signed_url, {
              method: "DELETE",
            });

            if (type === 'front') {
              setSampleFront(undefined);
              setFrontImageUrl(undefined);
            } else {
              setSampleBack(undefined);
              setBackImageUrl(undefined);
            }
            setInputKey(prev => prev + 1);
          }
        } catch (error) {
          console.error("Error removing file:", error);
          dialogStore.openAlertDialog(
            "Error",
            "Failed to remove file. Please try again.",
            "OK",
            true,
            () => setImageLoading(false)
          );
        } finally {
          setImageLoading(false);
        }
      }
    );
  };

  const handleCancel = () => {
    if (currentSpecification?.sample) {
      setQuantity(currentSpecification.sample.quantity);
      setIsSample(currentSpecification.sample.isSample);
      setCanSendSample(currentSpecification.sample.canSendSample);
      setSampleFront(currentSpecification.sample.sampleFront);
      setSampleBack(currentSpecification.sample.sampleBack);
    }
  };

  const handleSaveAndNext = async () => {
    setIsSaving(true);

    const sampleData: CustomSample = {
      isSample,
      quantity,
      canSendSample,
      sampleFront,
      sampleBack,
    };

    await specificationStore.putSpecificationsSpecificationId(currentSpecification.specificationId, {
      ...(props.isUpdateProgress && { progress: "SAMPLE" }),
      sample: {
        is_sample: isSample,
        quantity: quantity,
        can_send_sample: canSendSample,
        sample_front: sampleFront,
        sample_back: sampleBack,
      },
    });
    specificationStore.updateSpecification({
      sample: sampleData,
    });
    setIsSaving(false);
    props.callBackUpdateState();
  };

  return (
    <>
      <p className="text-sm text-gray-500">
        {specificationStore.currentSpecification?.productCode} - {specificationStore.currentSpecification?.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Fill in the custom sample quantities</h1>

      <div className="space-y-6 mt-4">
        {/* サンプル設定 */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isSample}
                onChange={(e) => setIsSample(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">Is Sample</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={canSendSample}
                onChange={(e) => setCanSendSample(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">Can Send Sample</span>
            </label>
          </div>

          {/* サンプル数表 */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Sample Quantities</h4>
            <div className="flex gap-2 items-center">
              <label className="block w-12 text-center text-xs font-medium text-gray-700">Free</label>
              <label className="block w-12 text-center text-xs font-medium text-gray-700">XS</label>
              <label className="block w-12 text-center text-xs font-medium text-gray-700">S</label>
              <label className="block w-12 text-center text-xs font-medium text-gray-700">M</label>
              <label className="block w-12 text-center text-xs font-medium text-gray-700">L</label>
              <label className="block w-12 text-center text-xs font-medium text-gray-700">XL</label>
            </div>
            <div className="flex gap-2 items-center">
              {(["free", "xs", "s", "m", "l", "xl"] as (keyof CustomSizeValue)[]).map(size => (
                <input
                  key={size}
                  type="text"
                  placeholder={size}
                  value={quantity[size]}
                  onChange={e => handleQuantityChange(size, e.target.value)}
                  className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              ))}
            </div>
          </div>
        </div>

        {/* 画像アップロード */}
        <div className="grid grid-cols-2 gap-6">
          {/* フロント画像 */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Sample Front Image</h4>
            <div className="flex items-center gap-x-3">
              <div className="flex items-center space-x-3">
                <input
                  type="file"
                  id="custom-sample-front-upload"
                  key={inputKey}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'front')}
                  disabled={imageLoading}
                  accept="image/png,image/jpg,image/jpeg"
                />
                {!sampleFront && <label
                  htmlFor="custom-sample-front-upload"
                  className="py-2 inline-flex items-center gap-x-2 justify-center rounded-md bg-white text-sm font-normal text-gray-500 cursor-pointer"
                >
                  <PaperClipIcon aria-hidden="true" className="size-4" />
                  {"Upload Front Image"}
                </label>}
                {sampleFront && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="text-blue-600 truncate max-w-[200px]">
                      {sampleFront.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile('front')}
                      className="text-gray-400 hover:text-gray-500 cursor-pointer"
                    >
                      <TrashIcon className="size-4" />
                    </button>
                  </div>
                )}
                {imageLoading && <Loading />}
              </div>
            </div>
            {frontImageUrl && (
              <div className="mt-4">
                <img
                  src={frontImageUrl}
                  alt="Sample front image"
                  className="max-w-full h-auto max-h-64 object-contain rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>

          {/* バック画像 */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Sample Back Image</h4>
            <div className="flex items-center gap-x-3">
              <div className="flex items-center space-x-3">
                <input
                  type="file"
                  id="custom-sample-back-upload"
                  key={inputKey + 1}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'back')}
                  disabled={imageLoading}
                  accept="image/png,image/jpg,image/jpeg"
                />
                {!sampleBack && <label
                  htmlFor="custom-sample-back-upload"
                  className="py-2 inline-flex items-center gap-x-2 justify-center rounded-md bg-white text-sm font-normal text-gray-500 cursor-pointer"
                >
                  <PaperClipIcon aria-hidden="true" className="size-4" />
                  {"Upload Back Image"}
                </label>}
                {sampleBack && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="text-blue-600 truncate max-w-[200px]">
                      {sampleBack.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile('back')}
                      className="text-gray-400 hover:text-gray-500 cursor-pointer"
                    >
                      <TrashIcon className="size-4" />
                    </button>
                  </div>
                )}
                {imageLoading && <Loading />}
              </div>
            </div>
            {backImageUrl && (
              <div className="mt-4">
                <img
                  src={backImageUrl}
                  alt="Sample back image"
                  className="max-w-full h-auto max-h-64 object-contain rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ボタン */}
      <div className="mt-6 flex flex-row justify-end">
        <div className="flex flex-row gap-x-3">
          <Button
            type={"button"}
            onClick={handleCancel}
            text={"Cancel"}
            style={"text"}
            fullWidth={false}
          />
          <Button
            type={"button"}
            onClick={handleSaveAndNext}
            text={"Save and Next"}
            loadingText={"Saving..."}
            loading={isSaving}
            style={"fill"}
            fullWidth={false}
          />
        </div>
      </div>
    </>
  );
});

export default CustomSampleComponent;
