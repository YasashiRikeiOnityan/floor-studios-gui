import { specificationStore } from "@/stores/specificationStore";
import { observer } from "mobx-react-lite";
import Button from "./Button";
import { useEffect, useState } from "react";
import { tenantStore } from "@/stores/tenantStore";
import TShirtFabricMaterials from "./TShirtFabricMaterials";
import TShirtFabricSubMaterials from "./TShirtFabricSubMaterials";
import { Colourway, Material, SubMaterial } from "@/lib/type/specification/type";
import { PlusIcon, TrashIcon, PaperClipIcon, XMarkIcon } from "@heroicons/react/20/solid";
import TShirtFabricColourway from "./TShirtFabricColourway";
import { PostImagesInteractor } from "@/interactor/PostImagesInteractor";
import { dialogStore } from "@/stores/dialogStore";

type TShirtFabricProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
};

const TShirtFabric = observer((props: TShirtFabricProps) => {

  const [materials, setMaterials] = useState<Material[]>(specificationStore.currentSpecification.tshirt?.fabric?.materials || []);
  const [subMaterials, setSubMaterials] = useState<SubMaterial[]>(specificationStore.currentSpecification.tshirt?.fabric?.subMaterials || []);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const fetchTenantSettingsTShirtFabric = async () => {
        await tenantStore.fetchTenantSettingsTShirtFabric();
      };
      fetchTenantSettingsTShirtFabric();
    }
  }, [mounted]);

  const handleMaterialChange = (index: number, value: {
    rowMaterial: string;
    thickness: string;
  }) => {
    const newMaterials = [...materials];
    newMaterials[index] = {
      ...newMaterials[index],
      ...value,
    };
    setMaterials(newMaterials);
  };

  const handleSubMaterialChange = (index: number, value: {
    rowMaterial: string;
  }) => {
    const newSubMaterials = [...subMaterials];
    newSubMaterials[index] = {
      ...newSubMaterials[index],
      ...value,
    };
    setSubMaterials(newSubMaterials);
  };

  const handleMaterialDescriptionChange = (index: number, value: string) => {
    const newMaterials = [...materials];
    newMaterials[index] = {
      ...newMaterials[index],
      description: {
        ...newMaterials[index].description,
        description: value,
      },
    };
    setMaterials(newMaterials);
  };

  const handleMaterialColourwayChange = (index: number, value: Colourway) => {
    const newMaterials = [...materials];
    newMaterials[index] = {
      ...newMaterials[index],
      colourway: {
        ...newMaterials[index].colourway,
        ...value,
      },
    };
    setMaterials(newMaterials);
  };

  const handleSubMaterialDescriptionChange = (index: number, value: string) => {
    const newSubMaterials = [...subMaterials];
    newSubMaterials[index] = {
      ...newSubMaterials[index],
      description: {
        ...newSubMaterials[index].description,
        description: value,
      },
    };
    setSubMaterials(newSubMaterials);
  };

  const handleSubMaterialColourwayChange = (index: number, value: Colourway) => {
    const newSubMaterials = [...subMaterials];
    newSubMaterials[index] = {
      ...newSubMaterials[index],
      colourway: {
        ...newSubMaterials[index].colourway,
        ...value,
      },
    };
    setSubMaterials(newSubMaterials);
  };

  const handleMaterialFilePreview = async (index: number, key: string) => {
    if (!key) {
      return;
    }
    try {
      // 既存のpre-signed URLが有効かチェック
      if (materials[index].description.file?.preSignedUrl?.get) {
        try {
          const response = await fetch(materials[index].description.file.preSignedUrl.get);
          if (response.ok) {
            setPreviewUrl(materials[index].description.file.preSignedUrl.get);
            return;
          }
        } catch (error) {
          console.log("Pre-signed URL expired, fetching new one");
        }
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
        const newMaterials = [...materials];
        if (newMaterials[index].description.file) {
          newMaterials[index].description.file = {
            name: newMaterials[index].description.file.name,
            key: newMaterials[index].description.file.key,
            preSignedUrl: {
              ...newMaterials[index].description.file.preSignedUrl,
              get: response.pre_signed_url,
            },
          };
          setMaterials(newMaterials);
        }
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleMaterialFileChange = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setFileUploading(true);
        const fileType = file.type.split('/')[1];
        const imageType = fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' ? fileType : 'png';

        // 既存のファイルがある場合は上書き更新
        if (materials[index].description.file?.key) {
          try {
            // 既存のPUT用URLが有効かチェック
            if (materials[index].description.file?.preSignedUrl?.put) {
              const uploadResponse = await fetch(materials[index].description.file.preSignedUrl.put, {
                method: "PUT",
                headers: {
                  "Content-Type": file.type,
                },
                body: file,
              });
              if (uploadResponse.ok) {
                // アップロード成功後、PUT用のURLをセット
                const newMaterials = [...materials];
                if (newMaterials[index].description.file) {
                  newMaterials[index].description.file = {
                    name: file.name,
                    key: newMaterials[index].description.file.key,
                    preSignedUrl: {
                      ...newMaterials[index].description.file.preSignedUrl,
                      put: materials[index].description.file.preSignedUrl.put || "",
                    },
                  };
                  setMaterials(newMaterials);
                  setFileUploading(false);
                  return;
                }
              }
            }
          } catch (error) {
            console.log("Pre-signed URL expired or failed, getting new one");
          }
        }

        // 新しいファイルのアップロード用URLを取得
        const response = await PostImagesInteractor({
          type: "specification",
          specification_id: specificationStore.currentSpecification.specificationId,
          ...(materials[index].description.file?.key && { key: materials[index].description.file?.key }),
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
            const newMaterials = [...materials];
            newMaterials[index].description.file = {
              name: file.name,
              key: response.key || file.name,
              preSignedUrl: {
                ...newMaterials[index].description.file?.preSignedUrl,
                put: response.pre_signed_url || "",
              },
            };
            setMaterials(newMaterials);
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

  const handleRemoveMaterialFile = async (index: number) => {
    if (!materials[index].description.file?.key) {
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
            key: materials[index].description.file?.key || "",
            method: "delete",
          });
          await fetch(preSignedUrl.pre_signed_url || "", {
            method: "DELETE",
          });
          const newMaterials = [...materials];
          newMaterials[index].description.file = undefined;
          setMaterials(newMaterials);
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

  const handleSubMaterialFilePreview = async (index: number, key: string) => {
    if (!key) {
      return;
    }
    try {
      // 既存のpre-signed URLが有効かチェック
      if (subMaterials[index].description.file?.preSignedUrl?.get) {
        try {
          const response = await fetch(subMaterials[index].description.file.preSignedUrl.get);
          if (response.ok) {
            setPreviewUrl(subMaterials[index].description.file.preSignedUrl.get);
            return;
          }
        } catch (error) {
          console.log("Pre-signed URL expired, fetching new one");
        }
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
        const newSubMaterials = [...subMaterials];
        if (newSubMaterials[index].description.file) {
          newSubMaterials[index].description.file = {
            name: newSubMaterials[index].description.file.name,
            key: newSubMaterials[index].description.file.key,
            preSignedUrl: {
              ...newSubMaterials[index].description.file.preSignedUrl,
              get: response.pre_signed_url,
            },
          };
          setSubMaterials(newSubMaterials);
        }
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleSubMaterialFileChange = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setFileUploading(true);
        const fileType = file.type.split('/')[1];
        const imageType = fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' ? fileType : 'png';

        // 既存のファイルがある場合は上書き更新
        if (subMaterials[index].description.file?.key) {
          try {
            // 既存のPUT用URLが有効かチェック
            if (subMaterials[index].description.file?.preSignedUrl?.put) {
              const uploadResponse = await fetch(subMaterials[index].description.file.preSignedUrl.put, {
                method: "PUT",
                headers: {
                  "Content-Type": file.type,
                },
                body: file,
              });
              if (uploadResponse.ok) {
                // アップロード成功後、PUT用のURLをセット
                const newSubMaterials = [...subMaterials];
                if (newSubMaterials[index].description.file) {
                  newSubMaterials[index].description.file = {
                    name: file.name,
                    key: newSubMaterials[index].description.file.key,
                    preSignedUrl: {
                      ...newSubMaterials[index].description.file.preSignedUrl,
                      put: subMaterials[index].description.file?.preSignedUrl?.put || "",
                    },
                  };
                  setSubMaterials(newSubMaterials);
                  setFileUploading(false);
                  return;
                }
              }
            }
          } catch (error) {
            console.log("Pre-signed URL expired or failed, getting new one");
          }
        }

        // 新しいファイルのアップロード用URLを取得
        const response = await PostImagesInteractor({
          type: "specification",
          specification_id: specificationStore.currentSpecification.specificationId,
          ...(subMaterials[index].description.file?.key && { key: subMaterials[index].description.file?.key }),
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
            const newSubMaterials = [...subMaterials];
            newSubMaterials[index].description.file = {
              name: file.name,
              key: response.key || file.name,
              preSignedUrl: {
                ...newSubMaterials[index].description.file?.preSignedUrl,
                put: response.pre_signed_url || "",
              },
            };
            setSubMaterials(newSubMaterials);
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

  const handleRemoveSubMaterialFile = async (index: number) => {
    if (!subMaterials[index].description.file?.key) {
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
            key: subMaterials[index].description.file?.key || "",
            method: "delete",
          });
          await fetch(preSignedUrl.pre_signed_url || "", {
            method: "DELETE",
          });
          const newSubMaterials = [...subMaterials];
          newSubMaterials[index].description.file = undefined;
          setSubMaterials(newSubMaterials);
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

  const handleAddMaterial = () => {
    setMaterials([...materials, {
      rowMaterial: "",
      thickness: "",
      description: {
      description: "",
        file: undefined,
      },
      colourway: {
        pantone: "",
        hex: "",
      },
    }]);
  };

  const handleAddSubMaterial = () => {
    setSubMaterials([...subMaterials, {
      rowMaterial: "",
      description: {
      description: "",
        file: undefined,
      },
      colourway: {
        pantone: "",
        hex: "",
      },
    }]);
  };

  const handleRemoveMaterial = (index: number) => {
    const newMaterials = materials.filter((_, i) => i !== index);
    setMaterials(newMaterials);
  };

  const handleRemoveSubMaterial = (index: number) => {
    const newSubMaterials = subMaterials.filter((_, i) => i !== index);
    setSubMaterials(newSubMaterials);
  };

  const handleCancel = () => {
    setMaterials(specificationStore.currentSpecification.tshirt?.fabric?.materials || []);
    setSubMaterials(specificationStore.currentSpecification.tshirt?.fabric?.subMaterials || []);
  };

  const handleSaveAndNext = async () => {
    specificationStore.putSpecification({
      ...(props.isUpdateProgress && { progress: "TAG" }),
      fabric: {
        materials: await Promise.all(materials.map(async (m) => ({
          row_material: m.rowMaterial,
          thickness: m.thickness,
          description: {
            description: m.description.description,
            file: m.description.file ? {
              name: m.description.file.name,
              key: m.description.file.key,
            } : undefined,
          },
          colourway: {
            pantone: m.colourway.pantone,
            hex: m.colourway.hex,
          },
        }))),
        sub_materials: await Promise.all(subMaterials.map(async (m) => ({
          row_material: m.rowMaterial,
          description: {
            description: m.description.description,
            file: m.description.file ? {
              name: m.description.file.name,
              key: m.description.file.key,
            } : undefined,
          },
          colourway: {
            pantone: m.colourway.pantone,
            hex: m.colourway.hex,
          },
        }))),
      },
    });
    specificationStore.currentSpecification.tshirt = {
      ...specificationStore.currentSpecification.tshirt,
      fabric: {
        materials: materials.map((m) => ({
          rowMaterial: m.rowMaterial,
          thickness: m.thickness,
          description: {
            description: m.description.description,
            file: m.description.file,
          },
          colourway: m.colourway,
        })),
        subMaterials: subMaterials.map((m) => ({
          rowMaterial: m.rowMaterial,
          description: {
            description: m.description.description,
            file: m.description.file,
          },
          colourway: m.colourway,
        })),
      },
    };
    props.callBackUpdateState();
  };

  const handleClosePreview = () => {
    setPreviewUrl(undefined);
  };

  return (
    <>
      <p className="text-sm text-gray-500">
        {specificationStore.currentSpecification.productCode} - {specificationStore.currentSpecification.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Choose your fabric</h1>
      <dl className="divide-y divide-gray-100">
        <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm/6 text-gray-900">Material</dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div className="space-y-6">
              {materials.map((material, index) => (
                <div key={index} className="grid grid-cols-2 gap-6 border-l-2 border-blue-100 pl-4 py-2">
                  <div className="flex flex-col gap-2">
                    <p className="block text-sm/6 font-medium text-gray-900">Material</p>
                    <TShirtFabricMaterials currentMaterial={{rowMaterial: material.rowMaterial, thickness: material.thickness}} setCurrentMaterial={(value) => handleMaterialChange(index, value)} fullWidth={true} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="block text-sm/6 font-medium text-gray-900">Colourway</p>
                    <TShirtFabricColourway currentColourway={material.colourway} setCurrentColourway={(value) => handleMaterialColourwayChange(index, value)} fullWidth={true} />
                  </div>
                  <div className="flex flex-col col-span-2 gap-2">
                    <p className="block text-sm/6 font-medium text-gray-900">Description</p>
                    <textarea
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                      placeholder="Description"
                      value={material.description.description}
                      onChange={(e) => handleMaterialDescriptionChange(index, e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between col-span-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <input
                          type="file"
                          id={`material-file-upload-${index}`}
                          className="hidden"
                          onChange={(e) => handleMaterialFileChange(index, e)}
                          disabled={fileUploading}
                        />
                        <label
                          htmlFor={`material-file-upload-${index}`}
                          className="inline-flex items-center gap-x-2 justify-center rounded-full text-gray-400 hover:text-gray-500 cursor-pointer"
                        >
                          <PaperClipIcon aria-hidden="true" className="size-5" />
                          <span className="sr-only">Attach a file</span>
                          {!material.description.file && <p className="text-sm text-gray-500">Attach a file</p>}
                        </label>
                      </div>
                      {material.description.file && (
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <button
                            type="button"
                            onClick={() => handleMaterialFilePreview(index, material.description.file?.key || "")}
                            className="truncate max-w-[200px] text-blue-600 hover:text-blue-500"
                          >
                            {material.description.file.name}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveMaterialFile(index)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <TrashIcon className="size-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMaterial(index)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <TrashIcon className="size-5" />
                    </button>
                  </div>
                </div>
              ))}
              {materials.length < 3 && <Button
                type="button"
                onClick={handleAddMaterial}
                style={"text"}
                fullWidth={true}
              >
                <div className="flex items-center gap-x-2">
                  <PlusIcon className="size-5" />
                  <p>Add Material</p>
                </div>
              </Button>}
            </div>
          </dd>
        </div>
        <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm/6 text-gray-900">Sub Material</dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div className="space-y-6">
              {subMaterials.map((subMaterial, index) => (
                <div key={index} className="grid grid-cols-2 gap-6 border-l-2 border-blue-100 pl-4 py-2">
                  <div className="flex flex-col gap-2">
                    <p className="block text-sm/6 font-medium text-gray-900">Sub Material</p>
                    <TShirtFabricSubMaterials currentSubMaterial={{rowMaterial: subMaterial.rowMaterial}} setCurrentSubMaterial={(value) => handleSubMaterialChange(index, value)} fullWidth={true} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="block text-sm/6 font-medium text-gray-900">Colourway</p>
                    <TShirtFabricColourway currentColourway={subMaterial.colourway} setCurrentColourway={(value) => handleSubMaterialColourwayChange(index, value)} fullWidth={true} />
                  </div>
                  <div className="flex flex-col col-span-2 gap-2">
                    <p className="block text-sm/6 font-medium text-gray-900">Description</p>
                    <textarea
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                      placeholder="Description"
                      value={subMaterial.description.description}
                      onChange={(e) => handleSubMaterialDescriptionChange(index, e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between col-span-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <input
                          type="file"
                          id={`submaterial-file-upload-${index}`}
                          className="hidden"
                          onChange={(e) => handleSubMaterialFileChange(index, e)}
                          disabled={fileUploading}
                        />
                        <label
                          htmlFor={`submaterial-file-upload-${index}`}
                          className="inline-flex items-center gap-x-2 justify-center rounded-full text-gray-400 hover:text-gray-500 cursor-pointer"
                        >
                          <PaperClipIcon aria-hidden="true" className="size-5" />
                          <span className="sr-only">Attach a file</span>
                          {!subMaterial.description.file && <p className="text-sm text-gray-500">Attach a file</p>}
                        </label>
                      </div>
                      {subMaterial.description.file && (
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <button
                            type="button"
                            onClick={() => handleSubMaterialFilePreview(index, subMaterial.description.file?.key || "")}
                            className="truncate max-w-[200px] text-blue-600 hover:text-blue-500"
                          >
                            {subMaterial.description.file.name}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveSubMaterialFile(index)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <TrashIcon className="size-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubMaterial(index)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <TrashIcon className="size-5" />
                    </button>
                  </div>
                </div>
              ))}
              {subMaterials.length < 3 && <Button
                type="button"
                onClick={handleAddSubMaterial}
                style={"text"}
                fullWidth={true}
              >
                <div className="flex items-center gap-x-2">
                  <PlusIcon className="size-5" />
                  <p>Add Sub Material</p>
                </div>
              </Button>}
            </div>
          </dd>
        </div>
      </dl>
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

export default TShirtFabric;
