import { specificationStore } from "@/stores/specificationStore";
import { observer } from "mobx-react-lite";
import Button from "./Button";
import { useEffect, useState } from "react";
import { tenantStore } from "@/stores/tenantStore";
// import { Material, SubMaterial } from "@/lib/type";

const Fabric = observer(() => {

  // const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);
  // const [selectedSubMaterials, setSelectedSubMaterials] = useState<SubMaterial[]>([]);
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

  const handleCancel = () => {
    
  };

  const handleSaveAndNext = () => {
    
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
        </div>
        <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm/6 text-gray-900">Sub Material</dt>
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

export default Fabric;
