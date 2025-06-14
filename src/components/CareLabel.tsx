import { specificationStore } from "@/stores/specificationStore";
import { dialogStore } from "@/stores/dialogStore";
import { useState } from "react";
import Button from "./Button";
import { TrashIcon, PaperClipIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { PostImagesInteractor } from "@/interactor/PostImagesInteractor";
import { observer } from "mobx-react-lite";
import { ReactElement } from "react";
import { TShirtSpecification } from "@/lib/type/specification/t-shirt/type";

type CareLabelProps = {
  isUpdateProgress: boolean;
  callBackUpdateState: () => void;
};

const CareLabel = observer((props: CareLabelProps): ReactElement => {
  const currentSpecification = specificationStore.currentSpecification as TShirtSpecification;
  const [hasLogo, setHasLogo] = useState(currentSpecification?.careLabel?.hasLogo || false);
  const [defaultLogo, setDefaultLogo] = useState(currentSpecification?.careLabel?.defaultLogo || false);
  const [file, setFile] = useState(currentSpecification?.careLabel?.file || undefined);
  const [description, setDescription] = useState(currentSpecification?.careLabel?.description || {
    description: "",
    file: undefined,
  });
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [fileUploading, setFileUploading] = useState(false);

  const handleCancel = () => {
    setHasLogo(currentSpecification?.careLabel?.hasLogo || false);
    setDefaultLogo(currentSpecification?.careLabel?.defaultLogo || false);
    setFile(currentSpecification?.careLabel?.file || undefined);
    setDescription({
      description: currentSpecification?.careLabel?.description?.description || "",
      file: currentSpecification?.careLabel?.description?.file || undefined,
    });
  };

  const handleSaveAndNext = () => {
    specificationStore.putSpecificationsSpecificationId(currentSpecification?.specificationId || "", {
      ...(props.isUpdateProgress && { progress: "OEMPOINT" }),
      care_label: {
        has_logo: hasLogo,
        default_logo: defaultLogo,
        ...(file && {
          file: {
            name: file.name,
            key: file.key,
          }
        }),
        description: {
          description: description.description,
          ...(description.file && {
            file: {
              name: description.file.name,
              key: description.file.key,
            }
          })
        }
      }
    });
    if (currentSpecification) {
      specificationStore.updateSpecification({
        careLabel: {
          hasLogo: hasLogo,
          defaultLogo: defaultLogo,
          ...(file && {
            file: {
              name: file.name,
              key: file.key,
            }
          }),
          description: {
            description: description.description,
            ...(file && {
              file: {
                name: file.name,
                key: file.key,
              }
            })
          }
        }
      });
      props.callBackUpdateState();
    }
  };

  const handleCareLabelDescriptionFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = event.target.files?.[0];
    if (uploadFile) {
      try {
        setFileUploading(true);
        const fileType = uploadFile.type.split('/')[1];
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
        if (description.file?.key) {
          try {
            // 既存のPUT用URLが有効かチェック
            if (description.file?.preSignedUrl?.put) {
              const uploadResponse = await fetch(description.file.preSignedUrl.put, {
                method: "PUT",
                headers: {
                  "Content-Type": uploadFile.type,
                },
                body: uploadFile,
              });
              if (uploadResponse.ok) {
                // アップロード成功後、PUT用のURLをセット
                const newDescription = {
                  ...description,
                  file: {
                    name: uploadFile.name,
                    key: description.file.key,
                    preSignedUrl: {
                      ...description.file.preSignedUrl,
                      put: description.file.preSignedUrl.put || "",
                    },
                  },
                };
                setDescription(newDescription);
                // 仕様書の更新 - ファイル更新時
                specificationStore.putSpecificationsSpecificationId(currentSpecification?.specificationId || "", {
                  ...(props.isUpdateProgress && { progress: "OEMPOINT" }),
                  care_label: {
                    has_logo: hasLogo,
                    default_logo: defaultLogo,
                    ...(description.file && {
                      file: {
                        name: description.file.name,
                        key: description.file.key,
                      }
                    }),
                    description: {
                      description: description.description,
                      file: {
                        name: uploadFile.name,
                        key: description.file.key
                      }
                    }
                  }
                });
                if (currentSpecification) {
                  specificationStore.updateSpecification({
                    careLabel: {
                      hasLogo: hasLogo,
                      defaultLogo: defaultLogo,
                      ...(file && {
                        file: {
                          name: file.name,
                          key: file.key,
                        }
                      }),
                      description: {
                        description: description.description,
                        file: {
                          name: uploadFile.name,
                          key: description.file.key
                        }
                      }
                    }
                  });
                }
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
          specification_id: currentSpecification?.specificationId || "",
          key: description.file?.key || "",
          image_type: imageType,
          method: "put",
        });

        if (response.pre_signed_url) {
          // ファイルをアップロード
          const uploadResponse = await fetch(response.pre_signed_url, {
            method: "PUT",
            headers: {
              "Content-Type": uploadFile.type,
            },
            body: uploadFile,
          });

          if (uploadResponse.ok) {
            // アップロード成功後、PUT用のURLをセット
            const newDescription = {
              ...description,
              file: {
                name: uploadFile.name,
                key: response.key,
                preSignedUrl: {
                  ...description.file?.preSignedUrl,
                  put: response.pre_signed_url || "",
                },
              },
            };
            setDescription(newDescription);
            // 仕様書の更新 - 新規ファイルアップロード時
            specificationStore.putSpecificationsSpecificationId(currentSpecification?.specificationId || "", {
              ...(props.isUpdateProgress && { progress: "OEMPOINT" }),
              care_label: {
                has_logo: hasLogo,
                default_logo: defaultLogo,
                ...(file && {
                  file: {
                    name: file.name,
                    key: file.key,
                  }
                }),
                description: {
                  description: description.description,
                  file: {
                    name: uploadFile.name,
                    key: response.key,
                  }
                }
              }
            });
            if (currentSpecification) {
              specificationStore.updateSpecification({
                careLabel: {
                  hasLogo: hasLogo,
                  defaultLogo: defaultLogo,
                  ...(file && {
                    file: {
                      name: file.name,
                      key: file.key,
                    }
                  }),
                  description: {
                    description: description.description,
                    file: {
                      name: uploadFile.name,
                      key: response.key,
                    }
                  }
                }
              });
            }
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

  const handleCareLabelDescriptionFilePreview = async (key: string) => {
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
        specification_id: currentSpecification?.specificationId || "",
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
              ...description.file?.preSignedUrl,
              get: response.pre_signed_url,
            },
          },
        };
        setDescription(newDescription);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleRemoveCareLabelDescriptionFile = () => {
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
      false,
      async () => {
        try {
          setFileUploading(true);
          const preSignedUrl = await PostImagesInteractor({
            type: "specification",
            specification_id: currentSpecification?.specificationId || "",
            key: description.file?.key,
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
          // 仕様書の更新 - ファイル削除時はファイル情報を含めない
          specificationStore.putSpecificationsSpecificationId(currentSpecification?.specificationId || "", {
            ...(props.isUpdateProgress && { progress: "OEMPOINT" }),
            care_label: {
              has_logo: hasLogo,
              default_logo: defaultLogo,
              ...(file && {
                file: {
                  name: file.name,
                  key: file.key,
                }
              }),
              description: {
                description: description.description
              }
            }
          });
          if (specificationStore.currentSpecification) {
            specificationStore.updateSpecification({
              careLabel: {
                hasLogo: hasLogo,
                defaultLogo: defaultLogo,
                ...(file && {
                  file: {
                    name: file.name,
                    key: file.key,
                  }
                }),
                description: {
                  description: description.description
                }
              }
            });
          }
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

  const handleCareLabelFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = event.target.files?.[0];
    if (uploadFile) {
      try {
        setFileUploading(true);
        const fileType = uploadFile.type.split('/')[1];
        const imageType = fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' ? fileType : 'png';

        // 既存のファイルがある場合は上書き更新
        if (file?.key) {
          try {
            // 既存のPUT用URLが有効かチェック
            if (file?.preSignedUrl?.put) {
              const uploadResponse = await fetch(file.preSignedUrl.put, {
                method: "PUT",
                headers: {
                  "Content-Type": uploadFile.type,
                },
                body: uploadFile,
              });
              if (uploadResponse.ok) {
                // アップロード成功後、PUT用のURLをセット
                const newFile = {
                  name: uploadFile.name,
                  key: file.key,
                  preSignedUrl: {
                    ...file?.preSignedUrl,
                    put: file?.preSignedUrl?.put || "",
                  }
                };
                setFile(newFile);
                // 仕様書の更新 - ファイル更新時
                specificationStore.putSpecificationsSpecificationId(currentSpecification?.specificationId || "", {
                  ...(props.isUpdateProgress && { progress: "OEMPOINT" }),
                  care_label: {
                    has_logo: hasLogo,
                    default_logo: defaultLogo,
                    file: {
                      name: uploadFile.name,
                      key: file.key,
                    },
                    description: {
                      description: description.description,
                      ...(description.file && {
                        file: {
                          name: description.file.name,
                          key: description.file.key,
                        }
                      })
                    }
                  }
                });
                if (currentSpecification) {
                  specificationStore.updateSpecification({
                    careLabel: {
                      hasLogo: hasLogo,
                      defaultLogo: defaultLogo,
                      file: {
                        name: uploadFile.name,
                        key: file.key,
                      },
                      description: {
                        description: description.description,
                        ...(description.file && {
                          file: {
                            name: description.file.name,
                            key: description.file.key,
                          }
                        })
                      }
                    }
                  });
                }
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
          specification_id: currentSpecification?.specificationId || "",
          image_type: imageType,
          method: "put",
        });

        if (response.pre_signed_url) {
          // ファイルをアップロード
          const uploadResponse = await fetch(response.pre_signed_url, {
            method: "PUT",
            headers: {
              "Content-Type": uploadFile.type,
            },
            body: uploadFile,
          });

          if (uploadResponse.ok) {
            // アップロード成功後、PUT用のURLをセット
            const newFile = {
              name: uploadFile.name,
              key: response.key,
              preSignedUrl: {
                ...file?.preSignedUrl,
                put: response.pre_signed_url || "",
              },
            };
            setFile(newFile);
            // 仕様書の更新 - 新規ファイルアップロード時
            specificationStore.putSpecificationsSpecificationId(currentSpecification?.specificationId || "", {
              ...(props.isUpdateProgress && { progress: "OEMPOINT" }),
              care_label: {
                has_logo: hasLogo,
                default_logo: defaultLogo,
                file: {
                  name: uploadFile.name,
                  key: response.key,
                },
                description: {
                  description: description.description,
                  ...(description.file && {
                    file: {
                      name: description.file.name,
                      key: description.file.key,
                    }
                  })
                }
              }
            });
            if (currentSpecification) {
              specificationStore.updateSpecification({
                careLabel: {
                  hasLogo: hasLogo,
                  defaultLogo: defaultLogo,
                  file: {
                    name: uploadFile.name,
                    key: response.key,
                  },
                  description: {
                    description: description.description,
                    ...(description.file && {
                      file: {
                        name: description.file.name,
                        key: description.file.key,
                      }
                    })
                  }
                }
              });
            }
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

  const handleCareLabelFilePreview = async (key: string) => {
    if (!key) {
      return;
    }
    try {
      // 既存のpre-signed URLが有効かチェック
      if (file?.preSignedUrl?.get) {
        setPreviewUrl(file?.preSignedUrl?.get || "");
        return;
      }

      // 新しいpre-signed URLを取得
      const response = await PostImagesInteractor({
        type: "specification",
        specification_id: currentSpecification?.specificationId || "",
        key: key,
        method: "get",
      });

      if (response.pre_signed_url) {
        setPreviewUrl(response.pre_signed_url);
        const newFile = {
          ...file,
          name: file?.name || "",
          key: file?.key || "",
          preSignedUrl: {
            ...file?.preSignedUrl,
            get: response.pre_signed_url,
          },
        };
        setFile(newFile);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleRemoveCareLabelFile = () => {
    if (!file?.key) {
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
            specification_id: currentSpecification?.specificationId || "",
            key: file?.key || "",
            method: "delete",
          });
          await fetch(preSignedUrl.pre_signed_url || "", {
            method: "DELETE",
          });
          setFile(undefined);
          // 仕様書の更新 - ファイル削除時はファイル情報を含めない
          specificationStore.putSpecificationsSpecificationId(currentSpecification?.specificationId || "", {
            care_label: {
              has_logo: hasLogo,
              default_logo: defaultLogo,
              description: {
                description: description.description,
                ...(description.file && {
                  file: {
                    name: description.file.name,
                    key: description.file.key,
                  }
                })
              }
            }
          });
          if (currentSpecification) {
            specificationStore.updateSpecification({
              careLabel: {
                hasLogo: hasLogo,
                defaultLogo: defaultLogo,
                description: {
                  description: description.description,
                  ...(description.file && {
                    file: {
                      name: description.file.name,
                      key: description.file.key,
                    }
                  })
                }
              }
            });
          }
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
        {currentSpecification?.productCode} - {currentSpecification?.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Select your care label option</h1>
      <div className="mt-6 items-center md:grid md:grid-cols-3 md:gap-4">
        <div className="mb-2 md:mb-0 md:col-span-1 space-y-6">
          <div className="flex items-center">
            <input
              checked={hasLogo && defaultLogo}
              id="yes"
              name="hasLogo"
              type="radio"
              onChange={() => {
                setHasLogo(true);
                setDefaultLogo(true);
              }}
              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-blue-600 checked:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
            />
            <label htmlFor="yes" className="ml-3 block text-sm/6 font-medium text-gray-900">
              My brand logo
            </label>
          </div>
          <div className="flex items-center">
            <input
              checked={!hasLogo && !defaultLogo}
              id="no"
              name="hasLogo"
              type="radio"
              onChange={() => {
                setHasLogo(false);
                setDefaultLogo(false);
              }}
              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-blue-600 checked:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
            />
            <label htmlFor="no" className="ml-3 block text-sm/6 font-medium text-gray-900">
              No logo
            </label>
          </div>
          <div className="flex items-center">
            <input
              checked={!defaultLogo && hasLogo}
              id="default"
              name="defaultLogo"
              type="radio"
              onChange={() => {
                setDefaultLogo(false);
                setHasLogo(true);
              }}
              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-blue-600 checked:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
            />
            <label htmlFor="default" className="ml-3 block text-sm/6 font-medium text-gray-900">
              Upload new logo
            </label>
          </div>
          <div className="mt-6">
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
          </div>
          <div className="mt-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <input
                  type="file"
                  id={`care-label-description-file-upload`}
                  className="hidden"
                  onChange={(e) => handleCareLabelDescriptionFileChange(e)}
                  disabled={fileUploading}
                />
                <label
                  htmlFor={`care-label-description-file-upload`}
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
                    onClick={() => handleCareLabelDescriptionFilePreview(description.file?.key || "")}
                    className="truncate max-w-[200px] text-blue-600 hover:text-blue-500"
                  >
                    {description.file.name}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveCareLabelDescriptionFile()}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <TrashIcon className="size-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          {hasLogo && defaultLogo && <img src="/care_label_with_logo.png" alt="Care Label" />}
          {hasLogo && !defaultLogo && <img src="/care_label.png" alt="Care Label" />}
          {!hasLogo && !defaultLogo && <img src="/care_label.png" alt="Care Label" />}
          {hasLogo && !defaultLogo && <div className="mt-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <input
                  type="file"
                  id={`care-label-file-upload`}
                  className="hidden"
                  onChange={(e) => handleCareLabelFileChange(e)}
                  disabled={fileUploading}
                />
                <label
                  htmlFor={`care-label-file-upload`}
                  className="inline-flex items-center gap-x-2 justify-center rounded-full text-gray-400 hover:text-gray-500 cursor-pointer"
                >
                  <PaperClipIcon aria-hidden="true" className="size-5" />
                  <span className="sr-only">Attach a file</span>
                  {!file && <p className="text-sm text-gray-500">Attach a file</p>}
                </label>
              </div>
              {file && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <button
                    type="button"
                    onClick={() => handleCareLabelFilePreview(file?.key || "")}
                    className="truncate max-w-[200px] text-blue-600 hover:text-blue-500"
                  >
                    {file.name}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveCareLabelFile()}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <TrashIcon className="size-4" />
                  </button>
                </div>
              )}
            </div>
          </div>}
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

export default CareLabel;
