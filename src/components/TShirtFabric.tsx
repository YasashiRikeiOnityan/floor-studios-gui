import { specificationStore } from "@/stores/specificationStore";
import { observer } from "mobx-react-lite";
import Button from "./Button";
import { useEffect, useState } from "react";
import { tenantStore } from "@/stores/tenantStore";
import TShirtFabricMaterials from "./TShirtFabricMaterials";
import TShirtFabricSubMaterials from "./TShirtFabricSubMaterials";
import { Colourway } from "@/lib/type/specification/type";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import TShirtFabricColourway from "./TShirtFabricColourway";

type TShirtFabricProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
};

const TShirtFabric = observer((props: TShirtFabricProps) => {

  const [materials, setMaterials] = useState<{
    rowMaterial: string;
    thickness: string;
  }[]>(specificationStore.currentSpecification.tshirt?.fabric?.materials.map(material => ({
      rowMaterial: material.rowMaterial,
    thickness: material.thickness
  })) || []);
  const [subMaterials, setSubMaterials] = useState<{
    rowMaterial: string;
  }[]>(specificationStore.currentSpecification.tshirt?.fabric?.subMaterials.map(subMaterial => ({
    rowMaterial: subMaterial.rowMaterial
  })) || []);
  const [materialDescriptions, setMaterialDescriptions] = useState<string[]>(specificationStore.currentSpecification.tshirt?.fabric?.materials.map(material => material.description) || []);
  const [materialColourways, setMaterialColourways] = useState<Colourway[]>(specificationStore.currentSpecification.tshirt?.fabric?.materials.map(material => material.colourway) || []);
  const [subMaterialDescriptions, setSubMaterialDescriptions] = useState<string[]>(specificationStore.currentSpecification.tshirt?.fabric?.subMaterials.map(subMaterial => subMaterial.description) || []);
  const [subMaterialColourways, setSubMaterialColourways] = useState<Colourway[]>(specificationStore.currentSpecification.tshirt?.fabric?.subMaterials.map(subMaterial => subMaterial.colourway) || []);
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
    newMaterials[index] = value;
    setMaterials(newMaterials);
  };

  const handleSubMaterialChange = (index: number, value: {
    rowMaterial: string;
  }) => {
    const newSubMaterials = [...subMaterials];
    newSubMaterials[index] = value;
    setSubMaterials(newSubMaterials);
  };

  const handleMaterialDescriptionChange = (index: number, value: string) => {
    const newMaterialDescriptions = [...materialDescriptions];
    newMaterialDescriptions[index] = value;
    setMaterialDescriptions(newMaterialDescriptions);
  };

  const handleMaterialColourwayChange = (index: number, value: Colourway) => {
    const newMaterialColourways = [...materialColourways];
    newMaterialColourways[index] = value;
    setMaterialColourways(newMaterialColourways);
  };

  const handleSubMaterialDescriptionChange = (index: number, value: string) => {
    const newSubMaterialDescriptions = [...subMaterialDescriptions];
    newSubMaterialDescriptions[index] = value;
    setSubMaterialDescriptions(newSubMaterialDescriptions);
  };

  const handleSubMaterialColourwayChange = (index: number, value: Colourway) => {
    const newSubMaterialColourways = [...subMaterialColourways];
    newSubMaterialColourways[index] = value;
    setSubMaterialColourways(newSubMaterialColourways);
  };

  const handleCancel = () => {
    setMaterials(specificationStore.currentSpecification.tshirt?.fabric?.materials.map(material => ({
      rowMaterial: material.rowMaterial,
      thickness: material.thickness
    })) || []);
    setSubMaterials(specificationStore.currentSpecification.tshirt?.fabric?.subMaterials.map(subMaterial => ({
      rowMaterial: subMaterial.rowMaterial
    })) || []);
    setMaterialDescriptions(specificationStore.currentSpecification.tshirt?.fabric?.materials.map(material => material.description) || []);
    setMaterialColourways(specificationStore.currentSpecification.tshirt?.fabric?.materials.map(material => material.colourway) || []);
    setSubMaterialDescriptions(specificationStore.currentSpecification.tshirt?.fabric?.subMaterials.map(subMaterial => subMaterial.description) || []);
    setSubMaterialColourways(specificationStore.currentSpecification.tshirt?.fabric?.subMaterials.map(subMaterial => subMaterial.colourway) || []);
  };

  const handleSaveAndNext = () => {
    specificationStore.putSpecification({
      ...(props.isUpdateProgress && { progress: "TAG" }),
      fabric: {
        materials: materials.map((m, index) => ({
          row_material: m.rowMaterial,
          thickness: m.thickness,
          description: materialDescriptions[index],
          colourway: {
            pantone: materialColourways[index]?.pantone || "",
            hex: materialColourways[index]?.hex || "",
          },
        })),
        sub_materials: subMaterials.map((m, index) => ({
          row_material: m.rowMaterial,
          description: subMaterialDescriptions[index],
          colourway: {
            pantone: subMaterialColourways[index]?.pantone || "",
            hex: subMaterialColourways[index]?.hex || "",
          },
        })),
      },
    });
    specificationStore.currentSpecification.tshirt = {
      ...specificationStore.currentSpecification.tshirt,
      fabric: {
        materials: materials.map((m, index) => ({
          rowMaterial: m.rowMaterial,
          thickness: m.thickness,
          description: materialDescriptions[index],
          colourway: materialColourways[index],
        })),
        subMaterials: subMaterials.map((m, index) => ({
          rowMaterial: m.rowMaterial,
          description: subMaterialDescriptions[index],
          colourway: subMaterialColourways[index],
        })),
      },
    };
    props.callBackUpdateState();
  };

  const handleAddMaterial = () => {
    setMaterials([...materials, {
      rowMaterial: "",
      thickness: ""
    }]);
  };

  const handleAddSubMaterial = () => {
    setSubMaterials([...subMaterials, {
      rowMaterial: ""
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
                    <TShirtFabricMaterials currentMaterial={material} setCurrentMaterial={(value) => handleMaterialChange(index, value)} fullWidth={true} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="block text-sm/6 font-medium text-gray-900">Colourway</p>
                    <TShirtFabricColourway currentColourway={materialColourways[index]} setCurrentColourway={(value) => handleMaterialColourwayChange(index, value)} fullWidth={true} />
                  </div>
                  <div className="flex flex-col col-span-2 gap-2">
                    <p className="block text-sm/6 font-medium text-gray-900">Description</p>
                    <textarea
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                      placeholder="Description"
                      value={materialDescriptions[index]}
                      onChange={(e) => handleMaterialDescriptionChange(index, e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end col-span-2">
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
                    <TShirtFabricSubMaterials currentSubMaterial={subMaterial} setCurrentSubMaterial={(value) => handleSubMaterialChange(index, value)} fullWidth={true} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="block text-sm/6 font-medium text-gray-900">Colourway</p>
                    <TShirtFabricColourway currentColourway={subMaterialColourways[index]} setCurrentColourway={(value) => handleSubMaterialColourwayChange(index, value)} fullWidth={true} />
                  </div>
                  <div className="flex flex-col col-span-2 gap-2">
                    <p className="block text-sm/6 font-medium text-gray-900">Description</p>
                    <textarea
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
                      placeholder="Description"
                      value={subMaterialDescriptions[index]}
                      onChange={(e) => handleSubMaterialDescriptionChange(index, e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end col-span-2">
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
