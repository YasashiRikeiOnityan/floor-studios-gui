import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { specificationStore } from "@/stores/specificationStore";
import { BottomsSpecification } from "@/lib/type/specification/bottoms/type";
import Button from "@/components/Button";
import { PaperClipIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PostImagesInteractor } from "@/interactor/PostImagesInteractor";
import { dialogStore } from "@/stores/dialogStore";
import Loading from "@/components/Loading";

type BottomsPatchProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
};

const BottomsPatch = observer((props: BottomsPatchProps) => {
  const currentSpecification = specificationStore.currentSpecification as BottomsSpecification;

  const [description, setDescription] = useState(currentSpecification.patch?.description || {
    description: "",
    file: undefined,
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [inputKey, setInputKey] = useState(0);

  // マウント時に画像URLを取得
  useEffect(() => {
    if (description.file?.key) {
      const fetchImage = async () => {
        try {
          setImageLoading(true);
          const response = await PostImagesInteractor({
            type: "specification",
            specification_id: currentSpecification.specificationId,
            key: description.file!.key,
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
  }, [description.file?.key]);

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

        setDescription(prev => ({
          ...prev,
          file: { name: file.name, key: response.key }
        }));

        // アップロード後に画像URLを取得
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
    if (!description.file?.key) {
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
            key: description.file!.key,
            method: "delete",
          });

          if (preSignedUrl.pre_signed_url) {
            await fetch(preSignedUrl.pre_signed_url, {
              method: "DELETE",
            });

            setDescription(prev => ({
              ...prev,
              file: undefined
            }));
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

  const handleSaveAndNext = async () => {
    setIsSaving(true);
    const body = {
      ...(props.isUpdateProgress && { progress: "PATCH" }),
      patch: {
        description: {
          description: description.description,
          ...(description.file && { file: description.file }),
        },
      }
    };
    await specificationStore.putSpecificationsSpecificationId(currentSpecification.specificationId, body);
    specificationStore.updateSpecification({
      patch: {
        description: description,
      },
    });
    props.callBackUpdateState();
    setIsSaving(false);
  };

  const handleCancel = () => {
    setDescription(currentSpecification.patch?.description || {
      description: "",
      file: undefined,
    });
  };

  // テキストエリアの行数を計算
  const calculateRows = (text: string) => {
    const lines = text.split('\n').length;
    return Math.max(3, lines + 1);
  };

  return (
    <>
      <p className="text-sm text-gray-500">
        {specificationStore.currentSpecification?.productCode} - {specificationStore.currentSpecification?.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Patch</h1>
      <div className="mt-6">
        {/* テキストエリアと画像アップロードを横並びに表示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* テキストエリア */}
          <textarea
            value={description.description}
            onChange={(e) => setDescription(prev => ({ ...prev, description: e.target.value }))}
            rows={calculateRows(description.description)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
            placeholder="Enter patch description..."
          />

          {/* 画像アップロード */}
          <div className="space-y-4">
            <div className="flex items-center gap-x-3">
              <div className="flex items-center space-x-3">
                <input
                  type="file"
                  id="patch-image-upload"
                  key={inputKey}
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={imageLoading}
                  accept="image/png,image/jpg,image/jpeg"
                />
                {!description.file && <label
                  htmlFor="patch-image-upload"
                  className="inline-flex items-center gap-x-2 justify-center rounded-md bg-white text-sm font-normal text-gray-500 hover:bg-gray-50 cursor-pointer"
                >
                  <PaperClipIcon aria-hidden="true" className="size-4" />
                  {"Upload Image"}
                </label>}
                {description.file && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="text-blue-600 truncate max-w-[200px]">
                      {description.file.name}
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
                  alt="Patch image"
                  className="max-w-full h-auto max-h-64 object-contain rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>
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
          loadingText="Saving..."
          loading={isSaving}
          style={"fill"}
          fullWidth={false}
        />
      </div>
    </>
  );
});

export default BottomsPatch;