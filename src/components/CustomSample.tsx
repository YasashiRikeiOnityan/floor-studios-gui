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
  const [frontImageLoading, setFrontImageLoading] = useState(false);
  const [backImageLoading, setBackImageLoading] = useState(false);
  const [frontImageUrl, setFrontImageUrl] = useState<string | undefined>(undefined);
  const [backImageUrl, setBackImageUrl] = useState<string | undefined>(undefined);
  const [frontInputKey, setFrontInputKey] = useState(0);
  const [backInputKey, setBackInputKey] = useState(0);

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
          setFrontImageLoading(true);
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
          setFrontImageLoading(false);
        }
      };
      fetchFrontImage();
    }
  }, [sampleFront?.key]);

  useEffect(() => {
    if (sampleBack?.key) {
      const fetchBackImage = async () => {
        try {
          setBackImageLoading(true);
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
          setBackImageLoading(false);
        }
      };
      fetchBackImage();
    }
  }, [sampleBack?.key]);

  const handleQuantityChange = (size: keyof CustomSizeValue, value: string) => {
    setQuantity(prev => ({ ...prev, [size]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back') => {
    if (type === "front") {
      setFrontImageLoading(true);
    } else {
      setBackImageLoading(true);
    }

    const file = e.target.files?.[0];
    if (!file) {
      if (type === "front") {
        setFrontImageLoading(false);
      } else {
        setBackImageLoading(false);
      }
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
      if (type === "front") {
        setFrontImageLoading(false);
      } else {
        setBackImageLoading(false);
      }
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
          const getResponse = await PostImagesInteractor({
            type: "specification",
            specification_id: currentSpecification.specificationId,
            key: response.key,
            method: "get",
          });
          if (getResponse.pre_signed_url) {
            setFrontImageUrl(getResponse.pre_signed_url);
          }
        } else {
          setSampleBack(fileData);
          const getResponse = await PostImagesInteractor({
            type: "specification",
            specification_id: currentSpecification.specificationId,
            key: response.key,
            method: "get",
          });
          if (getResponse.pre_signed_url) {
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
        () => {
          if (type === "front") {
            setFrontImageLoading(false);
          } else {
            setBackImageLoading(false);
          }
        }
      );
    } finally {
      if (type === "front") {
        setFrontImageLoading(false);
      } else {
        setBackImageLoading(false);
      }
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
          if (type === "front") {
            setFrontImageLoading(true);
          } else {
            setBackImageLoading(true);
          }
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
              setFrontInputKey(prev => prev + 1);
            } else {
              setSampleBack(undefined);
              setBackImageUrl(undefined);
              setBackInputKey(prev => prev + 1);
            }
          }
        } catch (error) {
          console.error("Error removing file:", error);
          dialogStore.openAlertDialog(
            "Error",
            "Failed to remove file. Please try again.",
            "OK",
            true,
            () => {
              if (type === "front") {
                setFrontImageLoading(false);
              } else {
                setBackImageLoading(false);
              }
            }
          );
        } finally {
          if (type === "front") {
            setFrontImageLoading(false);
          } else {
            setBackImageLoading(false);
          }
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
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Do you want a sample first?</h1>

      {/* メインコンテンツ */}
      <div className="flex gap-6">
        {/* サイズ表（3/10） */}
        <div className="w-3/10">
          <div className="mt-6 space-y-6">
            <div className="flex items-center">
              <input
                checked={!isSample}
                id="no"
                name="sample"
                type="radio"
                onChange={() => setIsSample(false)}
                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-blue-600 checked:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
              />
              <label htmlFor="no" className="ml-3 block text-sm/6 font-medium text-gray-900">
                No
              </label>
            </div>
            <div className="flex items-center">
              <input
                checked={isSample}
                id="yes"
                name="sample"
                type="radio"
                onChange={() => setIsSample(true)}
                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-blue-600 checked:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
              />
              <label htmlFor="yes" className="ml-3 block text-sm/6 font-medium text-gray-900">
                Yes, I want a sample
              </label>
            </div>
          </div>
        </div>
        <div className="w-7/10">
          {isSample && <div className="mt-6 space-y-2 max-w-lg">
            <div className="grid grid-cols-7 gap-2 mt-4 items-center">
              <label className="block text-center text-xs font-medium text-gray-700">Free</label>
              <label className="block text-center text-xs font-medium text-gray-700">XS</label>
              <label className="block text-center text-xs font-medium text-gray-700">S</label>
              <label className="block text-center text-xs font-medium text-gray-700">M</label>
              <label className="block text-center text-xs font-medium text-gray-700">L</label>
              <label className="block text-center text-xs font-medium text-gray-700">XL</label>
            </div>
            <div className="grid grid-cols-7 gap-2 items-center">
              {(["free", "xs", "s", "m", "l", "xl"] as (keyof CustomSizeValue)[]).map(size => (
                <input
                  key={size}
                  type="text"
                  placeholder={size}
                  value={quantity[size]}
                  onChange={e => handleQuantityChange(size, e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              ))}
            </div>
          </div>}
          {!isSample && <div className="mt-6 flex gap-3">
            <div className="flex h-6 shrink-0 items-center">
              <div className="group grid size-4 grid-cols-1">
                <input
                  defaultChecked={canSendSample}
                  id="canSendSample"
                  name="canSendSample"
                  type="checkbox"
                  onChange={(e) => setCanSendSample(e.target.checked)}
                  aria-describedby="canSendSample-description"
                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-blue-600 checked:bg-blue-600 indeterminate:border-blue-600 indeterminate:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                />
                <svg
                  fill="none"
                  viewBox="0 0 14 14"
                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-has-[:checked]:opacity-100"
                  />
                  <path
                    d="M3 7H11"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                  />
                </svg>
              </div>
            </div>
            <div className="text-sm/6">
              <label htmlFor="canSendSample" className="font-medium text-gray-900">
                It is possible to ship your sample to the factory.
              </label>
            </div>
          </div>}

          {/* サンプル画像アップロード */}
          {isSample && (
            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 前面画像 */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">Front View</h4>
                  <div className="flex items-center gap-x-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="file"
                        id="custom-sample-front-upload"
                        key={frontInputKey}
                        className="hidden"
                        onChange={(e) => handleFileChange(e, 'front')}
                        disabled={frontImageLoading}
                        accept="image/png,image/jpg,image/jpeg"
                      />
                      {!sampleFront && <label
                        htmlFor="custom-sample-front-upload"
                        className="inline-flex items-center gap-x-2 justify-center rounded-md bg-white py-2 text-sm font-normal text-gray-500 hover:bg-gray-50 cursor-pointer"
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
                      {frontImageLoading && <Loading />}
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

                {/* 背面画像 */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">Back View</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="file"
                        id="custom-sample-back-upload"
                        key={backInputKey}
                        className="hidden"
                        onChange={(e) => handleFileChange(e, 'back')}
                        disabled={backImageLoading}
                        accept="image/png,image/jpg,image/jpeg"
                      />
                      {!sampleBack && <label
                        htmlFor="custom-sample-back-upload"
                        className="inline-flex items-center gap-x-2 justify-center rounded-md bg-white py-2 text-sm font-normal text-gray-500 hover:bg-gray-50 cursor-pointer"
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
                      {backImageLoading && <Loading />}
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
          )}
        </div>
      </div>

      {/* ボタン */}
      <div className="mt-6 flex flex-row gap-x-3 justify-end">
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
    </>
  );
});

export default CustomSampleComponent;
