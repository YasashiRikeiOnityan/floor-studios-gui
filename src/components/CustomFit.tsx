import { specificationStore } from "@/stores/specificationStore";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { TopsSpecification, CustomSizeValue, CustomFitWithFile } from "@/lib/type/specification/tops/type";
import Button from "@/components/Button";
import { PaperClipIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PostImagesInteractor } from "@/interactor/PostImagesInteractor";
import { dialogStore } from "@/stores/dialogStore";
import Loading from "@/components/Loading";

type CustomFitProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
};

type CustomFitItem = {
  itemName: string;
  free: string;
  xs: string;
  s: string;
  m: string;
  l: string;
  xl: string;
};

const CustomFit = observer((props: CustomFitProps) => {
  const currentSpecification = specificationStore.currentSpecification as TopsSpecification;
  const [customFitItems, setCustomFitItems] = useState<CustomFitItem[]>([]);
  const [file, setFile] = useState<{ name: string; key: string } | undefined>(currentSpecification?.customFit?.file);
  const [isSaving, setIsSaving] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [inputKey, setInputKey] = useState(0);

  // 初期化時にデータを設定
  useEffect(() => {
    if (currentSpecification?.customFit) {
      const items: CustomFitItem[] = [];
      Object.entries(currentSpecification.customFit).forEach(([key, value]) => {
        if (key !== 'file' && typeof value === 'object' && 'free' in value) {
          items.push({
            itemName: key,
            free: value.free,
            xs: value.xs,
            s: value.s,
            m: value.m,
            l: value.l,
            xl: value.xl,
          });
        }
      });

      // 9個になるまで空の要素を追加
      while (items.length < 9) {
        items.push({
          itemName: "",
          free: "",
          xs: "",
          s: "",
          m: "",
          l: "",
          xl: "",
        });
      }

      setCustomFitItems(items);
    } else {
      // デフォルトの9つの空項目
      const defaultItems: CustomFitItem[] = Array(9).fill(null).map(() => ({
        itemName: "",
        free: "",
        xs: "",
        s: "",
        m: "",
        l: "",
        xl: "",
      }));
      setCustomFitItems(defaultItems);
    }
  }, [currentSpecification?.customFit]);

  // 画像の読み込み
  useEffect(() => {
    if (file?.key) {
      const fetchImage = async () => {
        try {
          setImageLoading(true);
          const response = await PostImagesInteractor({
            type: "specification",
            specification_id: currentSpecification.specificationId,
            key: file.key,
            method: "get",
          });
          if (response.pre_signed_url) {
            setImageUrl(response.pre_signed_url);
          }
        } catch (error) {
          console.error("Error fetching image:", error);
        } finally {
          setImageLoading(false);
        }
      };
      fetchImage();
    }
  }, [file?.key]);

  const handleItemNameChange = (index: number, value: string) => {
    setCustomFitItems(prev => prev.map((item, i) =>
      i === index ? { ...item, itemName: value } : item
    ));
  };

  const handleSizeValueChange = (index: number, size: keyof CustomSizeValue, value: string) => {
    setCustomFitItems(prev => prev.map((item, i) =>
      i === index ? { ...item, [size]: value } : item
    ));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

        setFile({ name: file.name, key: response.key });

        const getResponse = await PostImagesInteractor({
          type: "specification",
          specification_id: currentSpecification.specificationId,
          key: response.key,
          method: "get",
        });
        if (getResponse.pre_signed_url) {
          setImageUrl(getResponse.pre_signed_url);
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

  const handleRemoveFile = async () => {
    const key = file?.key;
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

            setFile(undefined);
            setImageUrl(undefined);
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
    if (currentSpecification?.customFit) {
      const items: CustomFitItem[] = [];
      Object.entries(currentSpecification.customFit).forEach(([key, value]) => {
        if (key !== 'file' && typeof value === 'object' && 'free' in value) {
          items.push({
            itemName: key,
            free: value.free,
            xs: value.xs,
            s: value.s,
            m: value.m,
            l: value.l,
            xl: value.xl,
          });
        }
      });

      while (items.length < 9) {
        items.push({
          itemName: "",
          free: "",
          xs: "",
          s: "",
          m: "",
          l: "",
          xl: "",
        });
      }

      setCustomFitItems(items);
      setFile(currentSpecification.customFit.file);
    }
  };

  const handleSaveAndNext = async () => {
    setIsSaving(true);

    // 空文字でない項目のみをAPIリクエスト用のデータに変換
    const filteredData: CustomFitWithFile = {};
    customFitItems.forEach(item => {
      if (item.itemName.trim() !== '') {
        filteredData[item.itemName] = {
          free: item.free,
          xs: item.xs,
          s: item.s,
          m: item.m,
          l: item.l,
          xl: item.xl,
        };
      }
    });

    if (file) {
      filteredData.file = file;
    }

    await specificationStore.putSpecificationsSpecificationId(currentSpecification.specificationId, {
      ...(props.isUpdateProgress && { progress: "FIT" }),
      custom_fit: filteredData,
    });
    specificationStore.updateSpecification({
      customFit: filteredData,
    });
    setIsSaving(false);
    props.callBackUpdateState();
  };

  return (
    <>
      <p className="text-sm text-gray-500">
        {specificationStore.currentSpecification?.productCode} - {specificationStore.currentSpecification?.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Fill in the custom size chart</h1>

      <div className="space-y-6 mt-4">
        <div className="flex">
          {/* サイズ表（5/10） */}
          <div className="flex justify-center w-5/10">
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <div className="block w-32"></div>
                <label className="block w-12 text-center text-xs font-medium text-gray-700">Free</label>
                <label className="block w-12 text-center text-xs font-medium text-gray-700">XS</label>
                <label className="block w-12 text-center text-xs font-medium text-gray-700">S</label>
                <label className="block w-12 text-center text-xs font-medium text-gray-700">M</label>
                <label className="block w-12 text-center text-xs font-medium text-gray-700">L</label>
                <label className="block w-12 text-center text-xs font-medium text-gray-700">XL</label>
              </div>

              {customFitItems.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={item.itemName}
                    onChange={(e) => handleItemNameChange(index, e.target.value)}
                    className="block w-32 text-left text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  {(["free", "xs", "s", "m", "l", "xl"] as (keyof CustomSizeValue)[]).map(size => (
                    <input
                      key={size}
                      type="text"
                      placeholder={size}
                      value={item[size]}
                      onChange={e => handleSizeValueChange(index, size, e.target.value)}
                      className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* 画像アップロード（5/10） */}
          <div className="flex justify-start w-5/10">
            <div className="space-y-5">
              <h4 className="text-sm font-medium text-gray-700">Size Chart Image</h4>
              <div className="flex items-center gap-x-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="file"
                    id="custom-fit-image-upload"
                    key={inputKey}
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={imageLoading}
                    accept="image/png,image/jpg,image/jpeg"
                  />
                  {!file && <label
                    htmlFor="custom-fit-image-upload"
                    className="py-2 inline-flex items-center gap-x-2 justify-center rounded-md bg-white text-sm font-normal text-gray-500 cursor-pointer"
                  >
                    <PaperClipIcon aria-hidden="true" className="size-4" />
                    {"Upload Image"}
                  </label>}
                  {file && (
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span className="text-blue-600 truncate max-w-[200px]">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="text-gray-400 hover:text-gray-500 cursor-pointer"
                      >
                        <TrashIcon className="size-4" />
                      </button>
                    </div>
                  )}
                  {imageLoading && <Loading />}
                </div>
              </div>
              {imageUrl && (
                <div className="mt-4">
                  <img
                    src={imageUrl}
                    alt="Custom fit size chart"
                    className="max-w-full h-auto max-h-64 object-contain rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>
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

export default CustomFit; 