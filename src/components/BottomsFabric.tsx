import { BottomsSpecification } from "@/lib/type/specification/bottoms/type";
import { specificationStore } from "@/stores/specificationStore";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { DescriptionWithFile } from "@/components/DescriptionWithFile";
import { Description } from "@/lib/type/specification/bottoms/type";
import Button from "@/components/Button";
import { TrashIcon } from "@heroicons/react/20/solid";
import AddIcon from "@/components/AddIcon";

type BottomsFabricProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
};

const BottomsFabric = observer((props: BottomsFabricProps) => {
  const currentSpecification = specificationStore.currentSpecification as BottomsSpecification;

  const [materials, setMaterials] = useState<string[]>(
    currentSpecification?.fabric?.materials?.length ? currentSpecification.fabric.materials : [""]
  );
  const [subMaterials, setSubMaterials] = useState<string[]>(
    currentSpecification?.fabric?.subMaterials?.length ? currentSpecification.fabric.subMaterials : [""]
  );
  const [description, setDescription] = useState<Description>({
    description: currentSpecification?.fabric?.description?.description || "",
    file: currentSpecification?.fabric?.description?.file,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleMaterialChange = (index: number, value: string) => {
    const newMaterials = [...materials];
    newMaterials[index] = value;
    setMaterials(newMaterials);
  };

  const handleSubMaterialChange = (index: number, value: string) => {
    const newSubMaterials = [...subMaterials];
    newSubMaterials[index] = value;
    setSubMaterials(newSubMaterials);
  };

  const handleAddMaterial = () => {
    if (materials.length < 5) {
      setMaterials([...materials, ""]);
    }
  };

  const handleAddSubMaterial = () => {
    if (subMaterials.length < 5) {
      setSubMaterials([...subMaterials, ""]);
    }
  };

  const handleRemoveMaterial = (index: number) => {
    if (materials.length > 1) {
      const newMaterials = materials.filter((_, i) => i !== index);
      setMaterials(newMaterials);
    }
  };

  const handleRemoveSubMaterial = (index: number) => {
    if (subMaterials.length > 1) {
      const newSubMaterials = subMaterials.filter((_, i) => i !== index);
      setSubMaterials(newSubMaterials);
    }
  };

  const handleCancel = () => {
    setMaterials(currentSpecification?.fabric?.materials?.length ? currentSpecification.fabric.materials : [""]);
    setSubMaterials(currentSpecification?.fabric?.subMaterials?.length ? currentSpecification.fabric.subMaterials : [""]);
    setDescription({
      description: currentSpecification?.fabric?.description?.description || "",
      file: currentSpecification?.fabric?.description?.file,
    });
  };

  const handleSaveAndNext = async () => {
    setIsSaving(true);
    await specificationStore.putSpecificationsSpecificationId(currentSpecification.specificationId, {
      ...(props.isUpdateProgress && { progress: "FABRIC" }),
      fabric: {
        materials: materials.filter(material => material.trim() !== ""),
        sub_materials: subMaterials.filter(subMaterial => subMaterial.trim() !== ""),
        description: {
          description: description.description,
          file: description.file ? {
            name: description.file.name,
            key: description.file.key,
          } : undefined,
        },
      },
    });
    specificationStore.updateSpecification({
      fabric: {
        materials: materials.filter(material => material.trim() !== ""),
        subMaterials: subMaterials.filter(subMaterial => subMaterial.trim() !== ""),
        description: description,
      },
    });
    setIsSaving(false);
    props.callBackUpdateState();
  };

  return (
    <>
      <p className="text-sm text-gray-500">
        {specificationStore.currentSpecification?.productCode} - {specificationStore.currentSpecification?.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Fabric</h1>

      <div className="mt-6 space-y-6">
        {/* Materials */}
        <div>
          <div className="flex items-start gap-6 border-b border-gray-200 pb-3">
            <h2 className="text-md font-semibold text-gray-900 w-32">Materials</h2>
            <div className="flex-1 space-y-3">
              {materials.map((material, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={material}
                    onChange={(e) => handleMaterialChange(index, e.target.value)}
                    className="w-80 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                    placeholder="Enter material"
                  />
                  {materials.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMaterial(index)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <TrashIcon className="size-5" />
                    </button>
                  )}
                </div>
              ))}
              {materials.length < 5 && (
                <div className="w-80 flex justify-center">
                  <button
                    type="button"
                    onClick={handleAddMaterial}
                    className="text-gray-400 p-1 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    title="Add Material"
                  >
                    <AddIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sub Materials */}
        <div>
          <div className="flex items-start gap-6">
            <h2 className="text-md font-semibold text-gray-900 w-32">Sub Materials</h2>
            <div className="flex-1 space-y-3">
              {subMaterials.map((subMaterial, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={subMaterial}
                    onChange={(e) => handleSubMaterialChange(index, e.target.value)}
                    className="w-80 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                    placeholder="Enter sub material"
                  />
                  {subMaterials.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSubMaterial(index)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <TrashIcon className="size-5" />
                    </button>
                  )}
                </div>
              ))}
              {subMaterials.length < 5 && (
                <div className="w-80 flex justify-center">
                  <button
                    type="button"
                    onClick={handleAddSubMaterial}
                    className="text-gray-400 p-1 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    title="Add Sub Material"
                  >
                    <AddIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <DescriptionWithFile
            specificationId={currentSpecification?.specificationId || ""}
            id="bottoms-fabric-description"
            description={description}
            onDescriptionChange={setDescription}
            onSave={async (description) => {
              setDescription(description);
              await specificationStore.putSpecificationsSpecificationId(currentSpecification.specificationId, {
                fabric: {
                  materials: materials.filter(material => material.trim() !== ""),
                  sub_materials: subMaterials.filter(subMaterial => subMaterial.trim() !== ""),
                  description: {
                    description: description.description,
                    file: description.file ? {
                      name: description.file.name,
                      key: description.file.key,
                    } : undefined,
                  },
                },
              }, false);
              specificationStore.updateSpecification({
                fabric: {
                  materials: materials.filter(material => material.trim() !== ""),
                  subMaterials: subMaterials.filter(subMaterial => subMaterial.trim() !== ""),
                  description: description,
                },
              });
            }}
          />
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

export default BottomsFabric;