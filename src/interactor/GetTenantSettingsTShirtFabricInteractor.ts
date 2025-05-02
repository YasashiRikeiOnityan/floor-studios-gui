import { ApiGetTenantSettingsTShirtFabric } from "@/lib/api";
import { ApiGetTenantSettingsTShirtFabricResponse, TenantSettingsTShirtFabric } from "@/lib/type";

export const GetTenantSettingsTShirtFabricInteractor = async (): Promise<TenantSettingsTShirtFabric> => {
  const response = await ApiGetTenantSettingsTShirtFabric();
  return mapTenantSettingsTShirtFabric(response);
};

const mapTenantSettingsTShirtFabric = (response: ApiGetTenantSettingsTShirtFabricResponse): TenantSettingsTShirtFabric => {
  return {
    materials: response.materials.map((material) => ({
      rowMaterial: material.row_material,
      thickness: material.thickness,
    })),
    subMaterials: response.sub_materials.map((subMaterial) => ({
      rowMaterial: subMaterial.row_material,
    })),
    colourways: response.colourways.map((colourway) => ({
      pantone: colourway.pantone,
      hex: colourway.hex,
    })),
  };
};
