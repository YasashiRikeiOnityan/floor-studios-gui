import { ApiGetSpecificationsSpecificationId } from "@/lib/api";
import {
  Specification,
  SpecificationStatus,
  ApiGetSpecificationsSpecificationIdResponse,
} from "@/lib/type/specification/type";

export const GetSpecificationsSpecificationIdInteractor = async (specificationId: string): Promise<Specification> => {
  const response = await ApiGetSpecificationsSpecificationId(specificationId);
  return formatSpecification(response);
}

const formatSpecification = (specification: ApiGetSpecificationsSpecificationIdResponse): Specification => {
  if (specification.type === "T-SHIRT") {
    return formatTShirtSpecification(specification);
  } else {
    return {
      specificationId: specification.specification_id,
      brandName: specification.brand_name,
      productName: specification.product_name,
      productCode: specification.product_code,
      updatedBy: {
        userId: specification.updated_by?.user_id || "",
        userName: specification.updated_by?.user_name || "",
      },
      updatedAt: specification.updated_at || "",
    };
  }
}

const formatSpecificationStatus = (status: string): SpecificationStatus => {
  return status === "DRAFT" ? "DRAFT" : status === "COMPLETE" ? "COMPLETE" : status === "SAMPLE" ? "SAMPLE" : status === "BULK" ? "BULK" : undefined;
}

const formatInformation = (information: ApiGetSpecificationsSpecificationIdResponse["information"]) => {
  return {
    contact: {
      firstName: information?.contact?.first_name || "",
      lastName: information?.contact?.last_name || "",
      phoneNumber: information?.contact?.phone_number || "",
      email: information?.contact?.email || "",
    },
    billingAddress: {
      addressLine1: information?.billing_address?.address_line_1 || "",
      addressLine2: information?.billing_address?.address_line_2 || "",
      zipCode: information?.billing_address?.zip_code || "",
      state: information?.billing_address?.state || "",
      city: information?.billing_address?.city || "",
      country: information?.billing_address?.country || "",
    },
    shippingAddress: {
      addressLine1: information?.shipping_address?.address_line_1 || "",
      addressLine2: information?.shipping_address?.address_line_2 || "",
      zipCode: information?.shipping_address?.zip_code || "",
      state: information?.shipping_address?.state || "",
      city: information?.shipping_address?.city || "",
      country: information?.shipping_address?.country || "",
    }
  }
}

const formatTShirtSpecification = (specification: ApiGetSpecificationsSpecificationIdResponse): Specification => {
  return {
    specificationId: specification.specification_id,
    brandName: specification.brand_name,
    productName: specification.product_name,
    productCode: specification.product_code,
    updatedBy: {
      userId: specification.updated_by?.user_id || "",
      userName: specification.updated_by?.user_name || "",
    },
    updatedAt: specification.updated_at || "",
    status: formatSpecificationStatus(specification.status || ""),
    specificationGroupId: specification.specification_group_id,
    type: "T-SHIRT",
    progress: specification.progress || "",
    fit: {
      totalLength: specification.fit?.total_length || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      chestWidth: specification.fit?.chest_width || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      bottomWidth: specification.fit?.bottom_width || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      sleeveLength: specification.fit?.sleeve_length || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      armhole: specification.fit?.armhole || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      sleeveOpening: specification.fit?.sleeve_opening || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      neckRibLength: specification.fit?.neck_rib_length || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      neckOpening: specification.fit?.neck_opening || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      shoulderToShoulder: specification.fit?.shoulder_to_shoulder || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
    },
    fabric: {
      materials: (specification.fabric?.materials || []).map((material) => ({
        rowMaterial: material?.row_material || "",
        thickness: material?.thickness || "",
        colourway: {
          pantone: material?.colourway?.pantone || "",
          hex: material?.colourway?.hex || "",
        },
        description: material?.description || "",
      })),
      subMaterials: (specification.fabric?.sub_materials || []).map((subMaterial) => ({
        rowMaterial: subMaterial.row_material || "",
        colourway: {
          pantone: subMaterial.colourway?.pantone || "",
          hex: subMaterial.colourway?.hex || "",
        },
        description: subMaterial.description || "",
      })),
    },
    mainProduction: {
      quantity: {
        xxs: specification.main_production?.quantity.xxs || 0,
        xs: specification.main_production?.quantity.xs || 0,
        s: specification.main_production?.quantity.s || 0,
        m: specification.main_production?.quantity.m || 0,
        l: specification.main_production?.quantity.l || 0,
        xl: specification.main_production?.quantity.xl || 0,
        xxl: specification.main_production?.quantity.xxl || 0,
      },
      deliveryDate: specification.main_production?.delivery_date || "",
    },
    information: formatInformation(specification.information),
  }
}
