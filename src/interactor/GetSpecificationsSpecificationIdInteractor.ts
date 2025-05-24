import { ApiGetSpecificationsSpecificationId } from "@/lib/api";
import { TShirtSpecification } from "@/lib/type/specification/t-shirt/type";
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
    type: specification.type || undefined,
    progress: specification.progress || "",
    tshirt: specification.type === "T-SHIRT" ? formatTShirtSpecification(specification) : undefined,
    careLabel: formatCareLabel(specification.care_label),
    oemPoints: formatOemPoints(specification.oem_points),
    information: formatInformation(specification.information),
  }
}

const formatSpecificationStatus = (status: string): SpecificationStatus => {
  return status === "DRAFT" ? "DRAFT" : status === "COMPLETE" ? "COMPLETE" : status === "SAMPLE" ? "SAMPLE" : status === "BULK" ? "BULK" : undefined;
}

const formatCareLabel = (careLabel: ApiGetSpecificationsSpecificationIdResponse["care_label"]) => {
  return {
    hasLogo: careLabel?.has_logo || false,
    defaultLogo: careLabel?.default_logo === undefined ? true : careLabel?.default_logo,
    file: careLabel?.file ? {
      name: careLabel?.file?.name || "",
      key: careLabel?.file?.key || "",
    } : undefined,
    description: {
      description: careLabel?.description?.description || "",
      file: careLabel?.description?.file ? {
        name: careLabel?.description?.file?.name || "",
        key: careLabel?.description?.file?.key || "",
      } : undefined,
    },
  }
}

const formatOemPoints = (oemPoints: ApiGetSpecificationsSpecificationIdResponse["oem_points"]): {
  oemPoint: string;
  file?: File;
}[] => {
  return oemPoints?.map((oemPoint) => {
    let file: File | undefined = undefined;
    if (oemPoint.file?.content) {
      try {
        // base64データをデコード
        const base64Data = oemPoint.file.content;
        const isDataUrl = base64Data.startsWith("data:");
        const base64String = isDataUrl ? base64Data.split(",")[1] : base64Data;
        
        // base64をバイナリデータに変換
        const binaryString = window.atob(base64String);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        // BlobとFileオブジェクトを作成
        const blob = new Blob([bytes], { type: oemPoint.file.type });
        file = new File([blob], oemPoint.file.name, {
          type: oemPoint.file.type,
          lastModified: new Date().getTime()
        });

      } catch (error) {
        console.error("Error converting base64 to File:", error);
      }
    }
    return {
      oemPoint: oemPoint.oem_point,
      file: file,
    };
  }) || [];
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

const formatTShirtSpecification = (specification: ApiGetSpecificationsSpecificationIdResponse): TShirtSpecification => {
  return {
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
      material: specification.tag?.material || "Woven label",
      color: specification.tag?.color ? {
        title: specification.tag?.color?.title,
        hex: specification.tag?.color?.hex,
      } : undefined,
      sendLabels: specification.tag?.send_labels || false,
      labelStyle: specification.tag?.label_style || "Inseam loop label",
      description: {
        description: specification.tag?.description?.description || "",
        file: specification.tag?.description?.file ? {
          name: specification.tag?.description?.file?.name || "",
          key: specification.tag?.description?.file?.key || "",
        } : undefined,
      },
    },
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
  }
}
