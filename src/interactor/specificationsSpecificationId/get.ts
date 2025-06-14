import { 
  ApiGetSpecificationsSpecificationId,
} from "@/lib/api";
import { 
  ApiGetTShirtSpecificationResponse,
  TShirtSpecification,
} from "@/lib/type/specification/t-shirt/type";
import {
  Specification,
  ApiGetSpecificationsSpecificationIdResponse,
} from "@/lib/type/specification/type";
import { notificationStore } from "@/stores/notificationStore";

export const GetSpecificationsSpecificationIdInteractor = async (specificationId: string): Promise<Specification | undefined> => {
  try {
    const response = await ApiGetSpecificationsSpecificationId(specificationId);
    return formatSpecification(response);
  } catch (error) {
    notificationStore.addNotification("Error", "Failed to get specification", "error");
    return undefined;
  }
}

const formatSpecification = (specification: ApiGetSpecificationsSpecificationIdResponse): Specification | undefined => {
  if (specification.type === "T-SHIRT") {
    return {
      ...formatTShirtSpecification(specification),
    };
  }
  return undefined;
}

const formatTShirtSpecification = (specification: ApiGetTShirtSpecificationResponse): TShirtSpecification => {
  return {
    specificationId: specification.specification_id,
    brandName: specification.brand_name,
    productName: specification.product_name,
    productCode: specification.product_code,
    specificationGroupId: specification.specification_group_id || "",
    updatedBy: {
      userId: specification.updated_by?.user_id || "",
      userName: specification.updated_by?.user_name || "",
    },
    updatedAt: specification.updated_at || "",
    status: specification.status,
    type: "T-SHIRT",
    progress: specification.progress || "",
    fit: specification.fit ? {
      totalLength: specification.fit?.total_length || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      chestWidth: specification.fit?.chest_width || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      bottomWidth: specification.fit?.bottom_width || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      sleeveLength: specification.fit?.sleeve_length || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      armhole: specification.fit?.armhole || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      sleeveOpening: specification.fit?.sleeve_opening || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      neckRibLength: specification.fit?.neck_rib_length || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      neckOpening: specification.fit?.neck_opening || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      shoulderToShoulder: specification.fit?.shoulder_to_shoulder || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      description: {
        description: specification.fit?.description?.description || "",
        file: {
          name: specification.fit?.description?.file?.name || "",
          key: specification.fit?.description?.file?.key || "",
        },
      },
    } : undefined,
    fabric: {
      materials: (specification.fabric?.materials || []).map((material) => {
        return {
          rowMaterial: material?.row_material || "",
          thickness: material?.thickness || "",
          colourway: {
            pantone: material?.colourway?.pantone || "",
            hex: material?.colourway?.hex || "",
          },
          description: {
            description: material?.description?.description || "",
            file: material?.description?.file ? {
              name: material.description.file.name,
              key: material.description.file.key,
            } : undefined,
          },
        };
      }),
      subMaterials: (specification.fabric?.sub_materials || []).map((subMaterial) => {
        return {
          rowMaterial: subMaterial.row_material || "",
          colourway: {
            pantone: subMaterial.colourway?.pantone || "",
            hex: subMaterial.colourway?.hex || "",
          },
          description: {
            description: subMaterial.description?.description || "",
            file: subMaterial?.description?.file ? {
              name: subMaterial.description.file.name,
              key: subMaterial.description.file.key,
            } : undefined,
          },
        };
      }),
    },
    tag: {
      isLabel: specification.tag?.is_label || false,
      sendLabels: specification.tag?.send_labels || false,
      isCustom: specification.tag?.is_custom || false,
      material: specification.tag?.material || "Woven label",
      color: specification.tag?.color ? {
        pantone: specification.tag?.color?.pantone || "",
        hex: specification.tag?.color?.hex || "",
      } : undefined,
      labelStyle: specification.tag?.label_style || "Inseam loop label",
      labelWidth: specification.tag?.label_width,
      labelHeight: specification.tag?.label_height,
      description: {
        description: specification.tag?.description?.description || "",
        file: specification.tag?.description?.file ? {
          name: specification.tag?.description?.file?.name || "",
          key: specification.tag?.description?.file?.key || "",
        } : undefined,
      },
    },
    oemPoints: specification.oem_points?.map((oemPoint) => {
      return {
        description: oemPoint.description,
        file: oemPoint.file ? {
          name: oemPoint.file.name,
          key: oemPoint.file.key,
        } : undefined,
      };
    }),
    sample: {
      sample: specification.sample?.sample || false,
      quantity: {
        xxs: specification.sample?.quantity?.xxs || 0,
        xs: specification.sample?.quantity?.xs || 0,
        s: specification.sample?.quantity?.s || 0,
        m: specification.sample?.quantity?.m || 0,
        l: specification.sample?.quantity?.l || 0,
        xl: specification.sample?.quantity?.xl || 0,
        xxl: specification.sample?.quantity?.xxl || 0,
      },
      canSendSample: specification.sample?.can_send_sample || false,
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
    information: {
      contact: {
        firstName: specification.information?.contact?.first_name || "",
        lastName: specification.information?.contact?.last_name || "",
        phoneNumber: specification.information?.contact?.phone_number || "",
        email: specification.information?.contact?.email || "",
      },
      billingAddress: {
        addressLine1: specification.information?.billing_address?.address_line_1 || "",
        addressLine2: specification.information?.billing_address?.address_line_2 || "",
        zipCode: specification.information?.billing_address?.zip_code || "",
        state: specification.information?.billing_address?.state || "",
        city: specification.information?.billing_address?.city || "",
        country: specification.information?.billing_address?.country || "",
      },
      shippingAddress: {
        addressLine1: specification.information?.shipping_address?.address_line_1 || "",
        addressLine2: specification.information?.shipping_address?.address_line_2 || "",
        zipCode: specification.information?.shipping_address?.zip_code || "",
        state: specification.information?.shipping_address?.state || "",
        city: specification.information?.shipping_address?.city || "",
        country: specification.information?.shipping_address?.country || "",
      }
    }
  }
}
