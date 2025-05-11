import { specificationStore } from "@/stores/specificationStore";
import { observer } from "mobx-react-lite";
import Button from "./Button";
import { useEffect, useState } from "react";
import { tenantStore } from "@/stores/tenantStore";
import TShirtFabricMaterials from "./TShirtFabricMaterials";
import TShirtFabricSubMaterials from "./TShirtFabricSubMaterials";
import { Material, SubMaterial } from "@/lib/type/specification/type";
import { PlusIcon } from "@heroicons/react/20/solid";

type TShirtFabricProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
};

const TShirtFabric = observer((props: TShirtFabricProps) => {

  const [materials, setMaterials] = useState<Material[]>(specificationStore.currentSpecification.tshirt?.fabric?.materials || []);
  const [subMaterials, setSubMaterials] = useState<SubMaterial[]>(specificationStore.currentSpecification.tshirt?.fabric?.subMaterials || []);
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

  const handleMaterialChange = (index: number, value: Material) => {
    const newMaterials = [...materials];
    newMaterials[index] = value;
    setMaterials(newMaterials);
  };

  const handleSubMaterialChange = (index: number, value: SubMaterial) => {
    const newSubMaterials = [...subMaterials];
    newSubMaterials[index] = value;
    setSubMaterials(newSubMaterials);
  };

  const handleMaterialDescriptionChange = (index: number, value: string) => {
    const newMaterials = [...materials];
    newMaterials[index].description = value;
    setMaterials(newMaterials);
  };

  const handleCancel = () => {
    setMaterials(specificationStore.currentSpecification.tshirt?.fabric?.materials || []);
    setSubMaterials(specificationStore.currentSpecification.tshirt?.fabric?.subMaterials || []);
  };

  const handleSaveAndNext = () => {
    specificationStore.putSpecification({
      ...(props.isUpdateProgress && { progress: "TAG" }),
      fabric: {
        materials: materials.map(m => ({
          row_material: m.rowMaterial,
          thickness: m.thickness,
          description: m.description,
          colourway: {
            pantone: m.colourway?.pantone || "",
            hex: m.colourway?.hex || "",
          },
        })),
        sub_materials: subMaterials.map(m => ({
          row_material: m.rowMaterial,
          description: m.description,
          colourway: {
            pantone: m.colourway?.pantone || "",
            hex: m.colourway?.hex || "",
          },
        })),
      },
    });
    specificationStore.currentSpecification.tshirt = {
      ...specificationStore.currentSpecification.tshirt,
      fabric: {
        materials: materials,
        subMaterials: subMaterials,
      },
    };
    props.callBackUpdateState();
  };

  const handleAddMaterial = () => {
    setMaterials([...materials, {
      rowMaterial: "",
      thickness: "",
      description: "",
      colourway: {
        pantone: "",
        hex: "",
      },
    }]);
  };

  const handleAddSubMaterial = () => {
    setSubMaterials([...subMaterials, {
      rowMaterial: "",
      description: "",
      colourway: {
        pantone: "",
        hex: "",
      },
    }]);
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
                  </div>
                  <div className="flex flex-col col-span-2 gap-2">
                    <p className="block text-sm/6 font-medium text-gray-900">Description</p>
                    <textarea
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
                      placeholder="Description"
                      value={material.description}
                      onChange={(e) => handleMaterialDescriptionChange(index, e.target.value)}
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
                    </div>
                    <div className="flex flex-col col-span-2 gap-2">
                      <p className="block text-sm/6 font-medium text-gray-900">Description</p>
                      <textarea
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
                        placeholder="Description"
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
