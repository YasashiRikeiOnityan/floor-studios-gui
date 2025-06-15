import { useState } from "react";
import { PaperClipIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PostImagesInteractor } from "@/interactor/PostImagesInteractor";
import { dialogStore } from "@/stores/dialogStore";

type DescriptionWithFileProps = {
  specificationId: string;
  description: {
    description: string;
    file?: {
      name: string;
      key: string;
      preSignedUrl?: {
        get?: string;
        put?: string;
        delete?: string;
      };
    };
  };
  onDescriptionChange: (newDescription: { description: string; file?: { name: string; key: string, preSignedUrl?: { get?: string; put?: string; delete?: string; } } }) => void;
  onSave: (description: { description: string; file?: { name: string; key: string } }) => void;
};

export const DescriptionWithFile = (props: DescriptionWithFileProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    const file = e.target.files?.[0];
    if (!file) {
      setLoading(false);
      return;
    }

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
      setLoading(false);
      return;
    }

    try {
      const response = await PostImagesInteractor({
        type: "specification",
        specification_id: props.specificationId,
        image_type: imageType,
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

        const newDescription = {
          ...props.description,
          file: {
            name: file.name,
            key: response.key,
            preSignedUrl: {
              ...props.description.file?.preSignedUrl,
              put: response.pre_signed_url,
            },
          },
        };
        props.onDescriptionChange(newDescription);
        props.onSave(
          {
            description: newDescription.description,
            ...(newDescription.file && {
              file: {
                name: newDescription.file.name,
                key: newDescription.file.key,
              }
            })
          }
        );
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      dialogStore.openAlertDialog(
        "Error",
        "Failed to upload file. Please try again.",
        "OK",
        true,
        () => setLoading(false)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFilePreview = async (key: string) => {
    try {
      const response = await PostImagesInteractor({
        type: "specification",
        specification_id: props.specificationId,
        key: key,
        method: "get",
      });

      if (response.pre_signed_url) {
        setPreviewUrl(response.pre_signed_url);
        const newDescription = {
          ...props.description,
          file: {
            name: props.description.file?.name || "",
            key: props.description.file?.key || "",
            preSignedUrl: { ...props.description.file?.preSignedUrl, get: response.pre_signed_url },
          },
        };
        props.onDescriptionChange(newDescription);
      }
    } catch (error) {
      console.error("Error getting file preview:", error);
      dialogStore.openAlertDialog(
        "Error",
        "Failed to get file preview. Please try again.",
        "OK",
        true,
        () => setLoading(false)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = async () => {
    setLoading(true);

    if (!props.description.file?.key) {
      setLoading(false);
      return;
    }

    dialogStore.openAlertDialog(
      "Remove File",
      "Are you sure you want to remove this file?",
      "Remove",
      true,
      async () => {
        try {
          const preSignedUrl = await PostImagesInteractor({
            type: "specification",
            specification_id: props.specificationId,
            key: props.description.file?.key,
            method: "delete",
          });

          if (preSignedUrl.pre_signed_url) {
            await fetch(preSignedUrl.pre_signed_url, {
              method: "DELETE",
            });

            const newDescription = {
              ...props.description,
              file: undefined,
            };
            props.onDescriptionChange(newDescription);
            props.onSave({
              description: newDescription.description,
            });
          }
        } catch (error) {
          console.error("Error removing file:", error);
          dialogStore.openAlertDialog(
            "Error",
            "Failed to remove file. Please try again.",
            "OK",
            true,
            () => setLoading(false)
          );
        } finally {
          setLoading(false);
        }
      }
    );
  };

  const handleClosePreview = () => {
    setPreviewUrl(undefined);
  };

  return (
    <>
      <textarea
        id="comment"
        name="comment"
        rows={8}
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
        placeholder="Special requests or comments"
        value={props.description.description}
        onChange={(e) => props.onDescriptionChange({
          ...props.description,
          description: e.target.value,
        })}
      />
      <div className="flex items-center space-x-3 mt-2">
        <div className="flex items-center">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
            disabled={loading}
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center gap-x-2 justify-center rounded-full text-gray-400 hover:text-gray-500 cursor-pointer"
          >
            <PaperClipIcon aria-hidden="true" className="size-5" />
            <span className="sr-only">Attach a file</span>
            {!props.description.file?.name && <p className="text-sm text-gray-500">Attach a file</p>}
          </label>
        </div>
        {props.description.file?.name && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <button
              type="button"
              onClick={() => handleFilePreview(props.description.file?.key || "")}
              className="truncate max-w-[200px] text-blue-600 hover:text-blue-500"
            >
              {props.description.file.name}
            </button>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-gray-400 hover:text-gray-500"
            >
              <TrashIcon className="size-4" />
            </button>
          </div>
        )}
      </div>

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
    </>
  );
}; 