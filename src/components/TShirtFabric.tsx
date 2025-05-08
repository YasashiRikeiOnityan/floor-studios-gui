import { specificationStore } from "@/stores/specificationStore";
import { observer } from "mobx-react-lite";
import Button from "./Button";
import { useEffect, useState } from "react";
import { tenantStore } from "@/stores/tenantStore";
import TShirtFabricMaterials from "./TShirtFabricMaterials";
import TShirtFabricSubMaterials from "./TShirtFabricSubMaterials";
import { Material, SubMaterial } from "@/lib/type/specification/type";

type TShirtFabricProps = {
  callBackUpdateState: () => void;
};

const TShirtFabric = observer((props: TShirtFabricProps) => {

  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>(specificationStore.currentSpecification.tshirt?.fabric?.materials || []);
  const [selectedSubMaterials, setSelectedSubMaterials] = useState<SubMaterial[]>(specificationStore.currentSpecification.tshirt?.fabric?.subMaterials || []);
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

  const setMaterial = (rowMaterial: string) => {
    const material = tenantStore.tenantSettingsTShirtFabric.materials.find(m => m.rowMaterial === rowMaterial);
    setSelectedMaterials([{
      rowMaterial: material?.rowMaterial || "",
      thickness: material?.thickness || "",
      description: "",
      colourway: {
        pantone: "",
        hex: "",
      },
    }]);
  }

  const setSubMaterial = (rowMaterial: string) => {
    const subMaterial = tenantStore.tenantSettingsTShirtFabric.subMaterials.find(m => m.rowMaterial === rowMaterial);
    setSelectedSubMaterials([{
      rowMaterial: subMaterial?.rowMaterial || "",
      description: "",
      colourway: {
        pantone: "",
        hex: "",
      },
    }]);
  }

  const handleCancel = () => {
    
  };

  const handleSaveAndNext = () => {
    specificationStore.putSpecification({
      progress: "TAG",
      fabric: {
        materials: selectedMaterials.map(m => ({
          row_material: m.rowMaterial,
          thickness: m.thickness,
          description: m.description,
          colourway: {
            pantone: m.colourway.pantone,
            hex: m.colourway.hex,
          },
        })),
        sub_materials: selectedSubMaterials.map(m => ({
          row_material: m.rowMaterial,
          description: m.description,
          colourway: m.colourway,
        })),
      },
    });
    specificationStore.currentSpecification.tshirt = {
      ...specificationStore.currentSpecification.tshirt,
      fabric: {
        materials: selectedMaterials,
        subMaterials: selectedSubMaterials,
      },
    };
    props.callBackUpdateState();
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
            <div className="grid grid-cols-2 gap-4">
              <TShirtFabricMaterials currentMaterial={selectedMaterials[0]?.rowMaterial || ""} setCurrentMaterial={setMaterial} fullWidth={true} />
            </div>
          </dd>
        </div>
        <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm/6 text-gray-900">Sub Material</dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div className="grid grid-cols-2 gap-4">
              <TShirtFabricSubMaterials currentSubMaterial={selectedSubMaterials[0]?.rowMaterial || ""} setCurrentSubMaterial={setSubMaterial} fullWidth={true} />
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
