import { specificationStore } from "@/stores/specificationStore";
import { PaperClipIcon, TrashIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import { ApiPutTShirtSpecificationRequest } from "@/lib/type/specification/t-shirt/type";
import { fileToBase64 } from "@/lib/utils";
import { observer } from "mobx-react-lite";

type OEMPointProps = {
  callBackUpdateState: () => void;
};

const OEMPoint = observer((props: OEMPointProps) => {
  const [oemPoints, setOemPoints] = useState<{
    oemPoint: string;
    file?: File;
  }[]>([...(specificationStore.currentSpecification.oemPoints || [])]);
  const [previewFile, setPreviewFile] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newOemPoints = [...oemPoints];
      newOemPoints[index].file = event.target.files[0];
      setOemPoints(newOemPoints);
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

  const handleRemoveFile = (index: number) => {
    const newOemPoints = [...oemPoints];
    newOemPoints[index].file = undefined;
    setOemPoints(newOemPoints);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleCancel = () => {
    console.log(specificationStore.currentSpecification.oemPoints);
    setOemPoints(specificationStore.currentSpecification.oemPoints || [{ oemPoint: "", file: undefined }]);
  };

  const handleSaveAndNext = async () => {
    const request: ApiPutTShirtSpecificationRequest = {
      progress: "SAMPLE",
      oem_points: await Promise.all(oemPoints.map(async (oemPoint) => {
        return oemPoint.file ? {
          oem_point: oemPoint.oemPoint,
          file: {
            name: oemPoint.file.name,
            content: await fileToBase64(oemPoint.file),
            type: oemPoint.file.type,
          }
        } : {
          oem_point: oemPoint.oemPoint,
        }
      }))
    };

    specificationStore.putSpecification(request);
    specificationStore.currentSpecification = {
      ...specificationStore.currentSpecification,
      progress: "SAMPLE",
      oemPoints: oemPoints,
    };
    props.callBackUpdateState();
  };

  const handleFilePreview = (file: File) => {
    if (!file || file.size === 0 || !file.type.startsWith('image/')) {
      return;
    }
    setPreviewFile(file);
  };

  // プレビューURLの管理
  useEffect(() => {
    let url: string | undefined;

    if (previewFile) {
      url = URL.createObjectURL(previewFile);
      setPreviewUrl(url);
    }

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [previewFile]);

  const handleClosePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewFile(undefined);
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
          <div key={index} className="min-w-0 flex-1">
            <div className="border-b border-gray-200 pb-px focus-within:border-b-2 focus-within:border-indigo-600 focus-within:pb-0">
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
              <div className="flex items-center space-x-5">
                <div className="flex items-center">
                  <input
                    type="file"
                    id={`file-upload-${index}`}
                    className="hidden"
                    onChange={(e) => handleFileChange(index, e)}
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
                      onClick={() => handleFilePreview(oemPoint.file!)}
                      className="truncate max-w-[200px] text-indigo-600 hover:text-indigo-500"
                    >
                      {oemPoint.file.name}
                    </button>
                    <span className="whitespace-nowrap">({formatFileSize(oemPoint.file.size)})</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <TrashIcon className="size-4" />
                    </button>
                  </div>
                )}
              </div>
              {oemPoints.length > 1 && (
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

        <Button
          type="button"
          onClick={handleAddOemPoint}
          text={"Add OEM Point"}
          style={"text"}
          fullWidth={false}
        />
      </div>

      {/* プレビューモーダル */}
      {previewFile && previewUrl && (
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
                    onError={handleClosePreview}
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
