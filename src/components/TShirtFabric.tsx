import { observer } from "mobx-react-lite";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { tenantStore } from "@/stores/tenantStore";
import TShirtFabricMaterials from "@/components/TShirtFabricMaterials";
import TShirtFabricSubMaterials from "@/components/TShirtFabricSubMaterials";
import { Colourway, Material, SubMaterial, TShirtSpecification } from "@/lib/type/specification/t-shirt/type";
import { PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/20/solid";
import TShirtFabricColourway from "@/components/TShirtFabricColourway";
import { PostImagesInteractor } from "@/interactor/PostImagesInteractor";
import { specificationStore } from "@/stores/specificationStore";
import { DescriptionWithFile } from "@/components/DescriptionWithFile";
import { Description } from "@/lib/type/specification/t-shirt/type";

type TShirtFabricProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
};

const TShirtFabric = observer((props: TShirtFabricProps) => {
  const currentSpecification = specificationStore.currentSpecification as TShirtSpecification;

  const MATERIALS = tenantStore.tenantSettingsTShirtFabric.materials.map(material => material.rowMaterial);
  const COLOURWAYS = tenantStore.tenantSettingsTShirtFabric.colourways.map(colourway => ({ colorName: colourway.colorName, colorCode: colourway.colorCode }));

  const [materials, setMaterials] = useState<Material[]>(currentSpecification?.fabric?.materials || []);
  const [otherMaterials, setOtherMaterials] = useState<string[]>(currentSpecification?.fabric?.materials?.map(material => (material.rowMaterial && !MATERIALS.includes(material.rowMaterial)) ? material.rowMaterial : "") || []);
  const [otherMaterialColourways, setOtherMaterialColourways] = useState<Colourway[]>(currentSpecification?.fabric?.materials?.map(material => (material.colourway.colorName && !COLOURWAYS.some(colourway => colourway.colorName === material.colourway.colorName)) ? material.colourway : { colorName: "", colorCode: "" }) || []);
  const [subMaterials, setSubMaterials] = useState<SubMaterial[]>(currentSpecification?.fabric?.subMaterials || []);
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteMaterialFiles, setDeleteMaterialFiles] = useState<string[]>([]);
  const [deleteSubMaterialFiles, setDeleteSubMaterialFiles] = useState<string[]>([]);

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

  const handleMaterialChange = (index: number, value: string) => {
    const newMaterials = [...materials];
    newMaterials[index] = {
      ...newMaterials[index],
      rowMaterial: value,
    };
    setMaterials(newMaterials);

    // Otherが選択された場合、otherMaterialsの対応するインデックスをクリア
    if (value === "Other") {
      const newOtherMaterials = [...otherMaterials];
      newOtherMaterials[index] = "";
      setOtherMaterials(newOtherMaterials);
    }
  };

  const handleOtherMaterialChange = (index: number, value: string) => {
    const newOtherMaterials = [...otherMaterials];
    newOtherMaterials[index] = value;
    setOtherMaterials(newOtherMaterials);
  };

  const handleOtherMaterialColourwayChange = (index: number, value: Colourway) => {
    const newOtherMaterialColourways = [...otherMaterialColourways];
    newOtherMaterialColourways[index] = value;
    setOtherMaterialColourways(newOtherMaterialColourways);
  };

  const handleSubMaterialChange = (index: number, value: string) => {
    const newSubMaterials = [...subMaterials];
    newSubMaterials[index] = {
      ...newSubMaterials[index],
      rowMaterial: value,
    };
    setSubMaterials(newSubMaterials);
  };

  const handleMaterialDescriptionChange = (index: number, value: Description) => {
    const newMaterials = [...materials];
    newMaterials[index] = {
      ...newMaterials[index],
      description: {
        ...newMaterials[index].description,
        description: value.description,
        file: value.file,
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

    if (value.colorName === "Other") {
      const newOtherMaterialColourways = [...otherMaterialColourways];
      newOtherMaterialColourways[index] = {
        colorName: "",
        colorCode: "",
      };
      setOtherMaterialColourways(newOtherMaterialColourways);
    }
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

  const handleAddMaterial = () => {
    setMaterials([...materials, {
      rowMaterial: "",
      description: {
        description: "",
        file: undefined,
      },
      colourway: {
        colorName: "",
        colorCode: "",
      },
    }]);
    // otherMaterialsとotherMaterialColourwaysにも空の要素を追加
    setOtherMaterials([...otherMaterials, ""]);
    setOtherMaterialColourways([...otherMaterialColourways, { colorName: "", colorCode: "" }]);
  };

  const handleAddSubMaterial = () => {
    setSubMaterials([...subMaterials, {
      rowMaterial: "",
      description: {
        description: "",
        file: undefined,
      },
      colourway: {
        colorName: "",
        colorCode: "",
      },
    }]);
  };

  const handleRemoveMaterial = (index: number) => {
    if (materials[index].description.file?.key) {
      // 削除予定ファイルリストに追加
      setDeleteMaterialFiles([...deleteMaterialFiles, materials[index].description.file?.key || ""]);
    }
    const newMaterials = materials.filter((_, i) => i !== index);
    const newOtherMaterials = otherMaterials.filter((_, i) => i !== index);
    const newOtherMaterialColourways = otherMaterialColourways.filter((_, i) => i !== index);
    setMaterials(newMaterials);
    setOtherMaterials(newOtherMaterials);
    setOtherMaterialColourways(newOtherMaterialColourways);
  };

  const handleRemoveSubMaterial = (index: number) => {
    const newSubMaterials = subMaterials.filter((_, i) => i !== index);
    setSubMaterials(newSubMaterials);
  };

  const handleCancel = () => {
    setMaterials(currentSpecification?.fabric?.materials || []);
    setSubMaterials(currentSpecification?.fabric?.subMaterials || []);
    setOtherMaterials(currentSpecification?.fabric?.materials?.map(material => (material.rowMaterial && !MATERIALS.includes(material.rowMaterial)) ? material.rowMaterial : "") || []);
    setOtherMaterialColourways(currentSpecification?.fabric?.materials?.map(material => (material.colourway.colorName && !COLOURWAYS.some(colourway => colourway.colorName === material.colourway.colorName)) ? material.colourway : { colorName: "", colorCode: "" }) || []);
    setDeleteMaterialFiles([]);
    setDeleteSubMaterialFiles([]);
  };

  const handleSaveAndNext = async () => {
    setIsSaving(true);

    // 削除予定ファイルを先に削除
    if (deleteMaterialFiles.length > 0) {
      for (const key of deleteMaterialFiles) {
        try {
          const response = await PostImagesInteractor({
            type: "specification",
            specification_id: currentSpecification?.specificationId || "",
            key: key,
            method: "delete",
          });
          if (response.pre_signed_url) {
            await fetch(response.pre_signed_url, {
              method: "DELETE",
            });
          }
        } catch (error) {
          console.error("Error deleting file:", error);
        }
      }
      setDeleteMaterialFiles([]);
    }

    if (deleteSubMaterialFiles.length > 0) {
      for (const key of deleteSubMaterialFiles) {
        try {
          const response = await PostImagesInteractor({
            type: "specification",
            specification_id: currentSpecification?.specificationId || "",
            key: key,
            method: "delete",
          });
          if (response.pre_signed_url) {
            await fetch(response.pre_signed_url, {
              method: "DELETE",
            });
          }
        } catch (error) {
          console.error("Error deleting file:", error);
        }
      }
      setDeleteSubMaterialFiles([]);
    }

    // otherMaterialsの内容を踏まえてmaterialsのrowMaterialを更新
    const updatedMaterials = materials.map((material, index) => ({
      ...material,
      rowMaterial: material.rowMaterial && !MATERIALS.includes(material.rowMaterial) ? (otherMaterials[index] || "") : material.rowMaterial,
      colourway: material.colourway.colorName && !COLOURWAYS.some(colourway => colourway.colorName === material.colourway.colorName) ? otherMaterialColourways[index] : material.colourway,
    }));

    await specificationStore.putSpecificationsSpecificationId(currentSpecification?.specificationId || "", {
      ...(props.isUpdateProgress && { progress: "TAG" }),
      fabric: {
        materials: await Promise.all(updatedMaterials.map(async (m) => ({
          row_material: m.rowMaterial,
          description: {
            description: m.description.description,
            file: m.description.file ? {
              name: m.description.file.name,
              key: m.description.file.key,
            } : undefined,
          },
          colourway: {
            color_name: m.colourway.colorName,
            color_code: m.colourway.colorCode,
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
            color_name: m.colourway.colorName,
            color_code: m.colourway.colorCode,
          },
        }))),
      },
    });
    if (currentSpecification) {
      specificationStore.updateSpecification({
        fabric: {
          materials: updatedMaterials.map((m) => ({
            rowMaterial: m.rowMaterial,
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
      })
    }
    props.callBackUpdateState();
    setIsSaving(false);
  };

  return (
    <>
      <p className="text-sm text-gray-500">
        {currentSpecification?.productCode} - {currentSpecification?.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Choose your fabric</h1>
      <dl className="divide-y divide-gray-100">
        <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm/6 font-semibold text-gray-900">Material</dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div className="space-y-6">
              {materials.map((material, index) => (
                <div key={index} className="grid grid-cols-2 border-l-2 gap-x-6 border-blue-100 pl-4 pb-2">
                  {materials.length > 0 && (
                    <div className="flex justify-end col-span-2 mb-2">
                      <button
                        type="button"
                        onClick={() => handleRemoveMaterial(index)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <PlusIcon className="size-5 rotate-45" />
                      </button>
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <p className="block text-sm/6 font-medium text-gray-900">Material</p>
                    <TShirtFabricMaterials currentMaterial={material.rowMaterial} setCurrentMaterial={(value) => handleMaterialChange(index, value)} fullWidth={true} />
                    {material.rowMaterial && !MATERIALS.includes(material.rowMaterial) && (
                      <input
                        type="text"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        placeholder="Other Material"
                        value={otherMaterials[index] || ""}
                        onChange={(e) => handleOtherMaterialChange(index, e.target.value)}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="block text-sm/6 font-medium text-gray-900">Colourway</p>
                    <TShirtFabricColourway currentColourway={material.colourway} setCurrentColourway={(value) => handleMaterialColourwayChange(index, value)} fullWidth={true} />
                    {material.colourway.colorName && !COLOURWAYS.some(colourway => colourway.colorName === material.colourway.colorName) && (
                      <input
                        type="text"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        placeholder="Other Colourway"
                        value={otherMaterialColourways[index].colorName || ""}
                        onChange={(e) => handleOtherMaterialColourwayChange(index, { colorName: e.target.value, colorCode: "#" })}
                      />
                    )}
                  </div>
                  <div className="flex flex-col col-span-2 gap-2 mt-6">
                    <DescriptionWithFile
                      specificationId={currentSpecification?.specificationId || ""}
                      id={`material-description-${index}`}
                      description={material.description}
                      onDescriptionChange={(value) => handleMaterialDescriptionChange(index, value)}
                      onSave={async (description) => {
                        handleMaterialDescriptionChange(index, description);
                        const materialsWithoutEmpty = materials.map((m, i) =>
                          i === index ? {
                            rowMaterial: m.rowMaterial,
                            description: {
                              description: m.description.description,
                              file: {
                                name: description.file?.name || "",
                                key: description.file?.key || "",
                                preSignedUrl: m.description.file?.preSignedUrl || undefined,
                              },
                            },
                            colourway: m.colourway
                          } : m
                        ).filter(m => m.description.description !== "" || m.description.file?.key);

                        // otherMaterialsの内容を踏まえてmaterialsのrowMaterialを更新
                        const updatedMaterialsForSave = materialsWithoutEmpty.map((material, idx) => ({
                          ...material,
                          rowMaterial: material.rowMaterial,
                          // rowMaterial: material.rowMaterial && !MATERIALS.includes(material.rowMaterial) ? (otherMaterials[idx] || "") : material.rowMaterial,
                        }));

                        specificationStore.putSpecificationsSpecificationId(currentSpecification?.specificationId || "", {
                          fabric: {
                            materials: await Promise.all(updatedMaterialsForSave.map(m => ({
                              row_material: m.rowMaterial,
                              description: {
                                description: m.description.description,
                                file: (m.description.file && m.description.file.key !== "") ? {
                                  name: m.description.file.name,
                                  key: m.description.file.key,
                                } : undefined,
                              },
                              colourway: {
                                color_name: m.colourway.colorName,
                                color_code: m.colourway.colorCode,
                              },
                            }))),
                            sub_materials: await Promise.all(subMaterials.map(m => ({
                              row_material: m.rowMaterial,
                              description: {
                                description: m.description.description,
                                file: m.description.file ? {
                                  name: m.description.file.name,
                                  key: m.description.file.key,
                                } : undefined,
                              },
                              colourway: {
                                color_name: m.colourway.colorName,
                                color_code: m.colourway.colorCode,
                              },
                            }))),
                          },
                        });
                        specificationStore.updateSpecification({
                          fabric: {
                            materials: updatedMaterialsForSave.map(m => ({
                              rowMaterial: m.rowMaterial,
                              description: {
                                description: m.description.description,
                                file: {
                                  name: m.description.file?.name || "",
                                  key: m.description.file?.key || "",
                                  preSignedUrl: m.description.file?.preSignedUrl || undefined,
                                },
                              },
                              colourway: m.colourway,
                            })),
                            subMaterials: subMaterials.map(m => ({
                              rowMaterial: m.rowMaterial,
                              description: {
                                description: m.description.description,
                                file: {
                                  name: m.description.file?.name || "",
                                  key: m.description.file?.key || "",
                                  preSignedUrl: m.description.file?.preSignedUrl || undefined,
                                },
                              },
                              colourway: m.colourway,
                            })),
                          },
                        });
                      }}
                    />
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
          <dt className="text-sm/6 font-semibold text-gray-900">Sub Material</dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div className="space-y-6">
              {subMaterials.map((subMaterial, index) => (
                <div key={index} className="grid grid-cols-2 border-l-2 gap-x-6 border-blue-100 pl-4 pb-2">
                  {subMaterials.length > 0 && (
                    <div className="flex justify-end col-span-2 mb-2">
                      <button
                        type="button"
                        onClick={() => handleRemoveSubMaterial(index)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <PlusIcon className="size-5 rotate-45" />
                      </button>
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <p className="block text-sm/6 font-medium text-gray-900">Sub Material</p>
                    <TShirtFabricSubMaterials currentSubMaterial={subMaterial.rowMaterial} setCurrentSubMaterial={(value) => handleSubMaterialChange(index, value)} fullWidth={true} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="block text-sm/6 font-medium text-gray-900">Colourway</p>
                    <TShirtFabricColourway currentColourway={subMaterial.colourway} setCurrentColourway={(value) => handleSubMaterialColourwayChange(index, value)} fullWidth={true} />
                  </div>

                  <div className="flex flex-col col-span-2 gap-2 mt-6">
                    <DescriptionWithFile
                      specificationId={currentSpecification?.specificationId || ""}
                      id={`sub-material-description-${index}`}
                      description={subMaterial.description}
                      onDescriptionChange={(value) => handleSubMaterialDescriptionChange(index, value.description)}
                      onSave={() => { }}
                    />
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

export default TShirtFabric;