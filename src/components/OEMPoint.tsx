import { specificationStore } from "@/stores/specificationStore";
import { PaperClipIcon, TrashIcon, XMarkIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Button from "@/components/Button";
import { observer } from "mobx-react-lite";
import { dialogStore } from "@/stores/dialogStore";
import { PostImagesInteractor } from "@/interactor/PostImagesInteractor";

type OEMPointProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
};

const OEMPoint = observer((props: OEMPointProps) => {
  const [oemPoints, setOemPoints] = useState(specificationStore.currentSpecification.oemPoints || [{ oemPoint: "", file: undefined }]);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [fileUploading, setFileUploading] = useState(false);

  const handleOEMPointFileChange = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setFileUploading(true);
        const fileType = file.type.split('/')[1];
        const imageType = fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' ? fileType : undefined;

        if (!imageType) {
          dialogStore.openAlertDialog(
            "Error",
            "Only PNG, JPG, and JPEG files are supported.",
            "OK",
            false,
            () => dialogStore.closeAlertDialog()
          );
          setFileUploading(false);
          return;
        }

        // 既存のファイルがある場合は上書き更新
        if (oemPoints[index].file?.key) {
          try {
            // 既存のPUT用URLが有効かチェック
            if (oemPoints[index].file?.preSignedUrl?.put) {
              const uploadResponse = await fetch(oemPoints[index].file.preSignedUrl.put, {
                method: "PUT",
                headers: {
                  "Content-Type": file.type,
                },
                body: file,
              });
              if (uploadResponse.ok) {
                // アップロード成功後、PUT用のURLをセット
                const newOemPoints = [...oemPoints];
                if (newOemPoints[index].file) {
                  newOemPoints[index].file = {
                    name: file.name,
                    key: newOemPoints[index].file.key,
                    preSignedUrl: {
                      ...newOemPoints[index].file.preSignedUrl,
                      put: oemPoints[index].file.preSignedUrl.put || "",
                    },
                  };
                  setOemPoints(newOemPoints);
                  setFileUploading(false);
                  return;
                }
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
          ...(oemPoints[index].file?.key && { key: oemPoints[index].file?.key }),
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
            const newOemPoints = [...oemPoints];
            newOemPoints[index].file = {
              name: file.name,
              key: response.key || file.name,
              preSignedUrl: {
                ...newOemPoints[index].file?.preSignedUrl,
                put: response.pre_signed_url || "",
              },
            };
            setOemPoints(newOemPoints);
            setFileUploading(false);
          }
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        dialogStore.openAlertDialog(
          "Error",
          "Failed to upload file. Please try again.",
          "OK",
          false,
          () => dialogStore.closeAlertDialog()
        );
        setFileUploading(false);
      }
    }
  };

  const handleOemPointChange = (index: number, value: string) => {
    const newOemPoints = [...oemPoints];
    newOemPoints[index].oemPoint = value;
    setOemPoints(newOemPoints);
  };

  const handleAddOemPoint = () => {
    setOemPoints([...oemPoints, { oemPoint: "", file: undefined }]);
  };

  const handleRemoveOemPoint = (index: number) => {
    const newOemPoints = oemPoints.filter((_, i) => i !== index);
    setOemPoints(newOemPoints);
  };

  const handleCancel = () => {
    const initialPoints = specificationStore.currentSpecification.oemPoints || [{ oemPoint: "", file: undefined }];
    setOemPoints(initialPoints.map(point => ({
      oemPoint: point.oemPoint || "",
      file: point.file || undefined
    })));
  };

  const handleSaveAndNext = async () => {
    const oemPointsWithoutEmpty = oemPoints.filter(oemPoint => oemPoint.oemPoint !== "" || oemPoint.file?.key);
    specificationStore.putSpecification({
      ...(props.isUpdateProgress && { progress: "SAMPLE" }),
      oem_points: oemPointsWithoutEmpty.map(oemPoint => ({
        oem_point: oemPoint.oemPoint,
        ...(oemPoint.file && {
          file: {
            name: oemPoint.file.name,
            key: oemPoint.file.key,
          }
        })
      }))
    });
    specificationStore.currentSpecification = {
      ...specificationStore.currentSpecification,
      oemPoints: oemPointsWithoutEmpty.map(oemPoint => ({
        oemPoint: oemPoint.oemPoint,
        ...(oemPoint.file && {
          file: {
            name: oemPoint.file.name,
            key: oemPoint.file.key,
          }
        })
      })),
    };
    props.callBackUpdateState();
  };

  const handleOEMPointFilePreview = async (index: number, key: string) => {
    if (!key) {
      return;
    }
    try {
      // 既存のpre-signed URLが有効かチェック
      if (oemPoints[index].file?.preSignedUrl?.get) {
        setPreviewUrl(oemPoints[index].file?.preSignedUrl?.get || "");
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
        const newOemPoints = [...oemPoints];
        if (newOemPoints[index].file) {
          newOemPoints[index].file = {
            name: newOemPoints[index].file.name,
            key: newOemPoints[index].file.key,
            preSignedUrl: {
              ...newOemPoints[index].file.preSignedUrl,
              get: response.pre_signed_url,
            },
          };
          setOemPoints(newOemPoints);
        }
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleRemoveOEMPointFile = (index: number) => {
    if (!oemPoints[index].file?.key) {
      return;
    }
    if (fileUploading) {
      return;
    }
    dialogStore.openAlertDialog(
      "Delete File",
      "Are you sure you want to delete this file?",
      "Delete",
      false,
      async () => {
        try {
          setFileUploading(true);
          const preSignedUrl = await PostImagesInteractor({
            type: "specification",
            specification_id: specificationStore.currentSpecification.specificationId,
            key: oemPoints[index].file?.key || "",
            method: "delete",
          });
          await fetch(preSignedUrl.pre_signed_url || "", {
            method: "DELETE",
          });
          const newOemPoints = [...oemPoints];
          newOemPoints[index].file = undefined;
          setOemPoints(newOemPoints);
          // 仕様書の更新 - ファイル削除時はファイル情報を含めない
          specificationStore.putSpecification({
            oem_points: newOemPoints.map(oemPoint => ({
              oem_point: oemPoint.oemPoint,
              ...(oemPoint.file && {
                file: {
                  name: oemPoint.file.name,
                  key: oemPoint.file.key,
                }
              })
            }))
          }, true);
          specificationStore.currentSpecification.oemPoints = newOemPoints.map(oemPoint => ({
            oemPoint: oemPoint.oemPoint,
            ...(oemPoint.file && {
              file: {
                name: oemPoint.file.name,
                key: oemPoint.file.key,
              }
            })
          }));
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
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">OEM Point</h1>
      {/* メインコンテンツ */}
      <div className="space-y-6 mt-6">
        {oemPoints.map((oemPoint, index) => (
          <div key={index} className="min-w-0 flex-1 border-l-2 border-blue-100 pl-4 py-2">
            <div className="border-b border-gray-200 pb-px focus-within:border-b-2 focus-within:border-blue-600 focus-within:pb-0">
              <label htmlFor={`comment-${index}`} className="sr-only">
                Enter the OEM Point...
              </label>
              <textarea
                id={`comment-${index}`}
                name={`comment-${index}`}
                rows={3}
                placeholder="Enter the OEM Point..."
                className="block w-full resize-none text-base text-gray-900 placeholder:text-gray-400 focus:outline-0 sm:text-sm/6"
                value={oemPoint.oemPoint}
                onChange={(e) => handleOemPointChange(index, e.target.value)}
              />
            </div>
            <div className="flex justify-between pt-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <input
                    type="file"
                    id={`file-upload-${index}`}
                    className="hidden"
                    onChange={(e) => handleOEMPointFileChange(index, e)}
                  />
                  <label
                    htmlFor={`file-upload-${index}`}
                    className="inline-flex items-center gap-x-2 justify-center rounded-full text-gray-400 hover:text-gray-500 cursor-pointer"
                  >
                    <PaperClipIcon aria-hidden="true" className="size-5" />
                    <span className="sr-only">Attach a file</span>
                    {!oemPoint.file && <p className="text-sm text-gray-500">Attach a file</p>}
                  </label>
                </div>
                {oemPoint.file && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <button
                      type="button"
                      onClick={() => handleOEMPointFilePreview(index, oemPoint.file?.key || "")}
                      className="truncate max-w-[200px] text-blue-600 hover:text-blue-500"
                    >
                      {oemPoint.file.name}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveOEMPointFile(index)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <TrashIcon className="size-4" />
                    </button>
                  </div>
                )}
              </div>
              {oemPoints.length > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOemPoint(index)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <TrashIcon className="size-5" />
                </button>
              )}
            </div>
          </div>
        ))}

        {oemPoints.length < 3 && <Button
          type="button"
          onClick={handleAddOemPoint}
          style={"text"}
          fullWidth={true}
        >
          <div className="flex items-center gap-x-2">
            <PlusIcon className="size-5" />
            <p>Add OEM Point</p>
          </div>
        </Button>}
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
                    // onError={handleClosePreview}
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

export default OEMPoint;
