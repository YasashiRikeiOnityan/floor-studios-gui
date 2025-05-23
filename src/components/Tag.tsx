import { Description } from "@/lib/type/specification/type";
import { specificationStore } from "@/stores/specificationStore";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { TrashIcon, PaperClipIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { PostImagesInteractor } from "@/interactor/PostImagesInteractor";
import { dialogStore } from "@/stores/dialogStore";
import Button from "./Button";

type TagProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
}

const labelOptions = [
  { id: "no-label", title: "No label" },
  { id: "i-will-send-labels", title: "I will send labels" },
  { id: "standard", title: "Standard" },
  { id: "custom", title: "Custom" },
]

const materialOptions = [
  { id: "woven", title: "Woven label" },
  { id: "polyester", title: "Polyester" },
  { id: "cotton", title: "Cotton Canvas" },
]

const Tag = observer((props: TagProps) => {
  const [isLabel, setIsLabel] = useState<boolean>(false);
  const [sendLabels, setSendLabels] = useState<boolean>(false);
  const [description, setDescription] = useState<Description>({ description: "" });
  const [material, setMaterial] = useState<string>("Woven label");
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [fileUploading, setFileUploading] = useState<boolean>(false);

  const handleCancel = () => {
    console.log("Cancel");
    console.log(material);
  };

  const handleSaveAndNext = () => {
    console.log("Save and Next");
    props.callBackUpdateState();
  };

  const handleTagFilePreview = async (key: string) => {
    if (!key) {
      return;
    }
    try {
      // 既存のpre-signed URLが有効かチェック
      if (description.file?.preSignedUrl?.get) {
        setPreviewUrl(description.file?.preSignedUrl?.get || "");
        return;
      }

      // 新しいpre-signed URLを取得
      const response = await PostImagesInteractor({
        type: "specification",
        specification_id: specificationStore.currentSpecification.specificationId,
        key: key,
        method: "get",
      });

      if (response.pre_signed_url) {
        setPreviewUrl(response.pre_signed_url);
        const newDescription = {
          ...description,
          file: {
            name: description.file?.name || "",
            key: description.file?.key || "",
            preSignedUrl: {
              get: response.pre_signed_url,
              put: response.pre_signed_url,
              delete: response.pre_signed_url,
            },
          },
        };
        setDescription(newDescription);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleTagFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setFileUploading(true);
        const fileType = file.type.split('/')[1];
        const imageType = fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' ? fileType : 'png';

        // 既存のファイルがある場合は上書き更新
        if (description.file?.key) {
          try {
            // 既存のPUT用URLが有効かチェック
            if (description.file?.preSignedUrl?.put) {
              const uploadResponse = await fetch(description.file.preSignedUrl.put, {
                method: "PUT",
                headers: {
                  "Content-Type": file.type,
                },
                body: file,
              });
              if (uploadResponse.ok) {
                // アップロード成功後、PUT用のURLをセット
                const newDescription = {
                  ...description,
                  file: {
                    name: file.name,
                    key: description.file.key,
                    preSignedUrl: {
                      ...description.file.preSignedUrl,
                      put: description.file.preSignedUrl.put || "",
                    },
                  },
                };
                setDescription(newDescription);
                setFileUploading(false);
                return;
              }
            }
          } catch (error) {
            console.error(error);
            console.log("Pre-signed URL expired or failed, getting new one");
          }
        }

        // 新しいファイルのアップロード用URLを取得
        const response = await PostImagesInteractor({
          type: "specification",
          specification_id: specificationStore.currentSpecification.specificationId,
          ...(description.file?.key && { key: description.file?.key }),
          image_type: imageType,
          method: "put",
        });

        if (response.pre_signed_url) {
          // ファイルをアップロード
          const uploadResponse = await fetch(response.pre_signed_url, {
            method: "PUT",
            headers: {
              "Content-Type": file.type,
            },
            body: file,
          });

          if (uploadResponse.ok) {
            // アップロード成功後、PUT用のURLをセット
            const newDescription = {
              ...description,
              file: {
                name: file.name,
                key: response.key || file.name,
                preSignedUrl: {
                  ...description.file?.preSignedUrl,
                  put: response.pre_signed_url || "",
                },
              },
            };
            setDescription(newDescription);
            setFileUploading(false);
          }
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        dialogStore.openAlertDialog(
          "Error",
          "Failed to upload file. Please try again.",
          "OK",
          () => dialogStore.closeAlertDialog()
        );
        setFileUploading(false);
      }
    }
  };

  const handleRemoveTagFile = async () => {
    if (!description.file?.key) {
      return;
    }
    if (fileUploading) {
      return;
    }
    dialogStore.openAlertDialog(
      "Delete File",
      "Are you sure you want to delete this file?",
      "Delete",
      async () => {
        try {
          setFileUploading(true);
          const preSignedUrl = await PostImagesInteractor({
            type: "specification",
            specification_id: specificationStore.currentSpecification.specificationId,
            key: description.file?.key || "",
            method: "delete",
          });
          await fetch(preSignedUrl.pre_signed_url || "", {
            method: "DELETE",
          });
          const newDescription = {
            ...description,
            file: undefined,
          };
          setDescription(newDescription);
          dialogStore.closeAlertDialog();
          setFileUploading(false);
        } catch (error) {
          console.error("Error deleting file:", error);
          dialogStore.closeAlertDialog();
          setFileUploading(false);
        }
      }
    );
  };

  const handleClosePreview = () => {
    setPreviewUrl(undefined);
  };

  return (
    <>
      <p className="text-sm text-gray-500">
        {specificationStore.currentSpecification.productCode} - {specificationStore.currentSpecification.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Select name tag and size tag</h1>
      <div className="flex gap-6 mt-6">
        <div className="w-3/10 flex flex-col gap-y-6">
          <fieldset>
            <legend className="text-sm/6 font-semibold text-gray-900">Select a label option</legend>
            <div className="mt-2 space-y-4">
              {labelOptions.map((labelOption) => (
                <div key={labelOption.id} className="flex items-center">
                  <input
                    defaultChecked={labelOption.id === "no-label"}
                    id={labelOption.id}
                    name="label-option"
                    type="radio"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                    onChange={() => {
                      setIsLabel(labelOption.id !== "no-label");
                      setSendLabels(labelOption.id === "i-will-send-labels");
                    }}
                  />
                  <label htmlFor={labelOption.id} className="ml-3 block text-sm/6 font-medium text-gray-900">
                    {labelOption.title}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
          {isLabel && !sendLabels &&
            <fieldset>
              <legend className="text-sm/6 font-semibold text-gray-900">Choose the material</legend>
              <div className="mt-2 space-y-4">
                {materialOptions.map((materialOption) => (
                  <div key={materialOption.id} className="flex items-center">
                    <input
                      defaultChecked={materialOption.id === "woven"}
                      id={materialOption.id}
                      name="material-option"
                      type="radio"
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                      onChange={() => {
                        setMaterial(materialOption.title);
                      }}
                    />
                    <label htmlFor={materialOption.id} className="ml-3 block text-sm/6 font-medium text-gray-900">
                      {materialOption.title}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          }
        </div>
        <div className="w-7/10">
          <textarea
            id="comment"
            name="comment"
            rows={8}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
            placeholder="Special requests or comments"
            value={description.description}
            onChange={(e) => setDescription({
              ...description,
              description: e.target.value,
            })}
          />
          <div className="mt-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <input
                  type="file"
                  id={`tag-file-upload`}
                  className="hidden"
                  onChange={(e) => handleTagFileChange(e)}
                  disabled={fileUploading}
                />
                <label
                  htmlFor={`tag-file-upload`}
                  className="inline-flex items-center gap-x-2 justify-center rounded-full text-gray-400 hover:text-gray-500 cursor-pointer"
                >
                  <PaperClipIcon aria-hidden="true" className="size-5" />
                  <span className="sr-only">Attach a file</span>
                  {!description.file && <p className="text-sm text-gray-500">Attach a file</p>}
                </label>
              </div>
              {description.file && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <button
                    type="button"
                    onClick={() => handleTagFilePreview(description.file?.key || "")}
                    className="truncate max-w-[200px] text-blue-600 hover:text-blue-500"
                  >
                    {description.file.name}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveTagFile()}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <TrashIcon className="size-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* プレビューモーダル */}
      {previewUrl && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={handleClosePreview}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <div className="mt-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="mx-auto max-h-[70vh] w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
          style={"fill"}
          fullWidth={false}
        />
      </div>
    </>
  );
});

export default Tag;
