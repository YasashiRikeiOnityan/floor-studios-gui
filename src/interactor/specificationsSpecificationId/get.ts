import { 
  ApiGetSpecificationsSpecificationId,
} from "@/lib/api";
import {
  ApiGetTopsSpecificationResponse,
  TopsSpecification,
  CustomFitWithFile,
} from "@/lib/type/specification/tops/type";
import {
  ApiGetBottomsSpecificationResponse,
  BottomsSpecification,
} from "@/lib/type/specification/bottoms/type";
// import { 
//   ApiGetTShirtSpecificationResponse,
//   TShirtSpecification,
// } from "@/lib/type/specification/t-shirt/type";
import {
  Specification,
  ApiGetSpecificationsSpecificationIdResponse,
} from "@/lib/type/specification/type";
import {
  notificationStore,
} from "@/stores/notificationStore";

export const GetSpecificationsSpecificationIdInteractor = async (specificationId: string): Promise<Specification | undefined> => {
  try {
    const response = await ApiGetSpecificationsSpecificationId(specificationId);
    return formatSpecification(response);
  } catch {
    notificationStore.addNotification("Error", "Failed to get specification", "error");
    return undefined;
  }
}

const formatSpecification = (specification: ApiGetSpecificationsSpecificationIdResponse | ApiGetBottomsSpecificationResponse): Specification | undefined => {
  if (["T-SHIRT", "LONG_SLEEVE", "CREWNECK", "HOODIE", "ZIP_HOODIE", "HALF_ZIP", "KNIT_CREWNECK", "JACKET", "HEAVY_OUTER", "CUSTOMIZE"].includes(specification.type || "")) {
    return {
      ...formatTopsSpecification(specification as ApiGetTopsSpecificationResponse),
    };
  } else if (["SWEATPANTS", "DENIMPANTS"].includes(specification.type || "")) {
    return {
      ...formatBottomsSpecification(specification as ApiGetBottomsSpecificationResponse),
    };
  }
  return undefined;
}

const formatTopsSpecification = (specification: ApiGetTopsSpecificationResponse): TopsSpecification => {
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
    type: specification.type,
    progress: specification.progress || "",
    fit: specification.fit ? {
      totalLength: specification.fit?.total_length || { xs: "", s: "", m: "", l: "", xl: "" },
      chestWidth: specification.fit?.chest_width || { xs: "", s: "", m: "", l: "", xl: "" },
      shoulderToShoulder: specification.fit?.shoulder_to_shoulder || { xs: "", s: "", m: "", l: "", xl: "" },
      sleeveLength: specification.fit?.sleeve_length || { xs: "", s: "", m: "", l: "", xl: "" },
    } : undefined,
    customFit: specification.custom_fit ? {
      ...Object.fromEntries(
        Object.entries(specification.custom_fit).filter(([key, value]) => 
          key !== 'file' && typeof value === 'object' && 'free' in value
        )
      ),
      file: specification.custom_fit.file ? {
        name: specification.custom_fit.file.name,
        key: specification.custom_fit.file.key,
      } : undefined,
    } as CustomFitWithFile : undefined,
    fabric: {
      materials: specification.fabric?.materials || [],
      subMaterials: specification.fabric?.sub_materials || [],
      description: {
        description: specification.fabric?.description?.description || "",
        file: specification.fabric?.description?.file ? {
          name: specification.fabric.description.file.name,
          key: specification.fabric.description.file.key,
        } : undefined,
      },
    },
    tag: {
      description: {
        description: specification.tag?.description?.description || "",
        file: specification.tag?.description?.file ? {
          name: specification.tag.description.file.name,
          key: specification.tag.description.file.key,
        } : undefined,
      },
    },
    careLabel: {
      description: {
        description: specification.care_label?.description?.description || "",
        file: specification.care_label?.description?.file ? {
          name: specification.care_label.description.file.name,
          key: specification.care_label.description.file.key,
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
      isSample: specification.sample?.is_sample || false,
      quantity: {
        xs: specification.sample?.quantity?.xs || "0",
        s: specification.sample?.quantity?.s || "0",
        m: specification.sample?.quantity?.m || "0",
        l: specification.sample?.quantity?.l || "0",
        xl: specification.sample?.quantity?.xl || "0",
      },
      canSendSample: specification.sample?.can_send_sample || false,
      sampleFront: specification.sample?.sample_front ? {
        name: specification.sample.sample_front.name,
        key: specification.sample.sample_front.key,
      } : undefined,
      sampleBack: specification.sample?.sample_back ? {
        name: specification.sample.sample_back.name,
        key: specification.sample.sample_back.key,
      } : undefined,
    },
    mainProduction: {
      quantity: {
        xs: specification.main_production?.quantity.xs || "0",
        s: specification.main_production?.quantity.s || "0",
        m: specification.main_production?.quantity.m || "0",
        l: specification.main_production?.quantity.l || "0",
        xl: specification.main_production?.quantity.xl || "0",
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
      billingInformation: {
        addressLine1: specification.information?.billing_information?.address_line_1 || "",
        addressLine2: specification.information?.billing_information?.address_line_2 || "",
        zipCode: specification.information?.billing_information?.zip_code || "",
        state: specification.information?.billing_information?.state || "",
        city: specification.information?.billing_information?.city || "",
        country: specification.information?.billing_information?.country || "",
        companyName: specification.information?.billing_information?.company_name || "",
        firstName: specification.information?.billing_information?.first_name || "",
        lastName: specification.information?.billing_information?.last_name || "",
        phoneNumber: specification.information?.billing_information?.phone_number || "",
        email: specification.information?.billing_information?.email || "",
      },
      shippingInformation: {
        sameAsBillingInformation: specification.information?.shipping_information?.same_as_billing_information || false,
        addressLine1: specification.information?.shipping_information?.address_line_1 || "",
        addressLine2: specification.information?.shipping_information?.address_line_2 || "",
        zipCode: specification.information?.shipping_information?.zip_code || "",
        state: specification.information?.shipping_information?.state || "",
        city: specification.information?.shipping_information?.city || "",
        country: specification.information?.shipping_information?.country || "",
        companyName: specification.information?.shipping_information?.company_name || "",
        firstName: specification.information?.shipping_information?.first_name || "",
        lastName: specification.information?.shipping_information?.last_name || "",
        phoneNumber: specification.information?.shipping_information?.phone_number || "",
        email: specification.information?.shipping_information?.email || "",
      }
    }
  };
}

const formatBottomsSpecification = (specification: ApiGetBottomsSpecificationResponse): BottomsSpecification => {
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
    type: specification.type,
    progress: specification.progress || "",
    fit: specification.fit ? {
      totalLength: specification.fit?.total_length || { xs: "", s: "", m: "", l: "", xl: "" },
      waist: specification.fit?.waist || { xs: "", s: "", m: "", l: "", xl: "" },
      rise: specification.fit?.rise || { xs: "", s: "", m: "", l: "", xl: "" },
      inseam: specification.fit?.inseam || { xs: "", s: "", m: "", l: "", xl: "" },
      hip: specification.fit?.hip || { xs: "", s: "", m: "", l: "", xl: "" },
      aroundTheThigh: specification.fit?.around_the_thigh || { xs: "", s: "", m: "", l: "", xl: "" },
      aroundTheKnee: specification.fit?.around_the_knee || { xs: "", s: "", m: "", l: "", xl: "" },
      hemWidth: specification.fit?.hem_width || { xs: "", s: "", m: "", l: "", xl: "" },
      aroundTheHem: specification.fit?.around_the_hem || { xs: "", s: "", m: "", l: "", xl: "" },
    } : undefined,
    fabric: {
      materials: specification.fabric?.materials || [],
      subMaterials: specification.fabric?.sub_materials || [],
      description: {
        description: specification.fabric?.description?.description || "",
        file: specification.fabric?.description?.file ? {
          name: specification.fabric.description.file.name,
          key: specification.fabric.description.file.key,
        } : undefined,
      },
    },
    tag: {
      description: {
        description: specification.tag?.description?.description || "",
        file: specification.tag?.description?.file ? {
          name: specification.tag.description.file.name,
          key: specification.tag.description.file.key,
        } : undefined,
      },
    },
    careLabel: {
      description: {
        description: specification.care_label?.description?.description || "",
        file: specification.care_label?.description?.file ? {
          name: specification.care_label.description.file.name,
          key: specification.care_label.description.file.key,
        } : undefined,
      },
    },
    patch: {
      description: {
        description: specification.patch?.description?.description || "",
        file: specification.patch?.description?.file ? {
          name: specification.patch.description.file.name,
          key: specification.patch.description.file.key,
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
      isSample: specification.sample?.is_sample || false,
      quantity: {
        xs: specification.sample?.quantity?.xs || "0",
        s: specification.sample?.quantity?.s || "0",
        m: specification.sample?.quantity?.m || "0",
        l: specification.sample?.quantity?.l || "0",
        xl: specification.sample?.quantity?.xl || "0",
      },
      canSendSample: specification.sample?.can_send_sample || false,
      sampleFront: specification.sample?.sample_front ? {
        name: specification.sample.sample_front.name,
        key: specification.sample.sample_front.key,
      } : undefined,
      sampleBack: specification.sample?.sample_back ? {
        name: specification.sample.sample_back.name,
        key: specification.sample.sample_back.key,
      } : undefined,
    },
    mainProduction: {
      quantity: {
        xs: specification.main_production?.quantity.xs || "0",
        s: specification.main_production?.quantity.s || "0",
        m: specification.main_production?.quantity.m || "0",
        l: specification.main_production?.quantity.l || "0",
        xl: specification.main_production?.quantity.xl || "0",
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
      billingInformation: {
        addressLine1: specification.information?.billing_information?.address_line_1 || "",
        addressLine2: specification.information?.billing_information?.address_line_2 || "",
        zipCode: specification.information?.billing_information?.zip_code || "",
        state: specification.information?.billing_information?.state || "",
        city: specification.information?.billing_information?.city || "",
        country: specification.information?.billing_information?.country || "",
        companyName: specification.information?.billing_information?.company_name || "",
        firstName: specification.information?.billing_information?.first_name || "",
        lastName: specification.information?.billing_information?.last_name || "",
        phoneNumber: specification.information?.billing_information?.phone_number || "",
        email: specification.information?.billing_information?.email || "",
      },
      shippingInformation: {
        sameAsBillingInformation: specification.information?.shipping_information?.same_as_billing_information || false,
        addressLine1: specification.information?.shipping_information?.address_line_1 || "",
        addressLine2: specification.information?.shipping_information?.address_line_2 || "",
        zipCode: specification.information?.shipping_information?.zip_code || "",
        state: specification.information?.shipping_information?.state || "",
        city: specification.information?.shipping_information?.city || "",
        country: specification.information?.shipping_information?.country || "",
        companyName: specification.information?.shipping_information?.company_name || "",
        firstName: specification.information?.shipping_information?.first_name || "",
        lastName: specification.information?.shipping_information?.last_name || "",
        phoneNumber: specification.information?.shipping_information?.phone_number || "",
        email: specification.information?.shipping_information?.email || "",
      }
    }
  };
}


// const formatTShirtSpecification = (specification: ApiGetTShirtSpecificationResponse): TShirtSpecification => {
//   return {
//     specificationId: specification.specification_id,
//     brandName: specification.brand_name,
//     productName: specification.product_name,
//     productCode: specification.product_code,
//     specificationGroupId: specification.specification_group_id || "",
//     updatedBy: {
//       userId: specification.updated_by?.user_id || "",
//       userName: specification.updated_by?.user_name || "",
//     },
//     updatedAt: specification.updated_at || "",
//     status: specification.status,
//     type: specification.type,
//     progress: specification.progress || "",
//     fit: specification.fit ? {
//       totalLength: specification.fit?.total_length || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
//       chestWidth: specification.fit?.chest_width || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
//       bottomWidth: specification.fit?.bottom_width || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
//       sleeveLength: specification.fit?.sleeve_length || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
//       armhole: specification.fit?.armhole || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
//       sleeveOpening: specification.fit?.sleeve_opening || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
//       neckRibLength: specification.fit?.neck_rib_length || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
//       neckOpening: specification.fit?.neck_opening || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
//       shoulderToShoulder: specification.fit?.shoulder_to_shoulder || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
//       description: {
//         description: specification.fit?.description?.description || "",
//         file: {
//           name: specification.fit?.description?.file?.name || "",
//           key: specification.fit?.description?.file?.key || "",
//         },
//       },
//     } : undefined,
//     fabric: {
//       materials: (specification.fabric?.materials || []).map((material) => {
//         return {
//           rowMaterial: material?.row_material || "",
//           colourway: {
//             colorName: material?.colourway?.color_name || "",
//             colorCode: material?.colourway?.color_code || "",
//           },
//           description: {
//             description: material?.description?.description || "",
//             file: material?.description?.file ? {
//               name: material.description.file.name,
//               key: material.description.file.key,
//             } : undefined,
//           },
//         };
//       }),
//       subMaterials: (specification.fabric?.sub_materials || []).map((subMaterial) => {
//         return {
//           rowMaterial: subMaterial.row_material || "",
//           colourway: {
//             colorName: subMaterial.colourway?.color_name || "",
//             colorCode: subMaterial.colourway?.color_code || "",
//           },
//           description: {
//             description: subMaterial.description?.description || "",
//             file: subMaterial?.description?.file ? {
//               name: subMaterial.description.file.name,
//               key: subMaterial.description.file.key,
//             } : undefined,
//           },
//         };
//       }),
//     },
//     tag: {
//       isLabel: specification.tag?.is_label || false,
//       sendLabels: specification.tag?.send_labels || false,
//       isCustom: specification.tag?.is_custom || false,
//       material: specification.tag?.material || "Woven label",
//       colourway: specification.tag?.colourway ? {
//         colorName: specification.tag?.colourway?.color_name || "",
//         colorCode: specification.tag?.colourway?.color_code || "",
//       } : undefined,
//       labelStyle: specification.tag?.label_style || "Inseam loop label",
//       labelWidth: specification.tag?.label_width,
//       labelHeight: specification.tag?.label_height,
//       description: {
//         description: specification.tag?.description?.description || "",
//         file: specification.tag?.description?.file ? {
//           name: specification.tag?.description?.file?.name || "",
//           key: specification.tag?.description?.file?.key || "",
//         } : undefined,
//       },
//     },
//     careLabel: {
//       hasLogo: specification.care_label?.has_logo || false,
//       description: {
//         description: specification.care_label?.description?.description || "",
//         file: specification.care_label?.description?.file ? {
//           name: specification.care_label.description.file.name,
//           key: specification.care_label.description.file.key,
//         } : undefined,
//       },
//     },
//     oemPoints: specification.oem_points?.map((oemPoint) => {
//       return {
//         description: oemPoint.description,
//         file: oemPoint.file ? {
//           name: oemPoint.file.name,
//           key: oemPoint.file.key,
//         } : undefined,
//       };
//     }),
//     sample: {
//       isSample: specification.sample?.is_sample || false,
//       quantity: {
//         xxs: specification.sample?.quantity?.xxs || 0,
//         xs: specification.sample?.quantity?.xs || 0,
//         s: specification.sample?.quantity?.s || 0,
//         m: specification.sample?.quantity?.m || 0,
//         l: specification.sample?.quantity?.l || 0,
//         xl: specification.sample?.quantity?.xl || 0,
//         xxl: specification.sample?.quantity?.xxl || 0,
//       },
//       canSendSample: specification.sample?.can_send_sample || false,
//       sampleFront: specification.sample?.sample_front ? {
//         name: specification.sample.sample_front.name,
//         key: specification.sample.sample_front.key,
//       } : undefined,
//       sampleBack: specification.sample?.sample_back ? {
//         name: specification.sample.sample_back.name,
//         key: specification.sample.sample_back.key,
//       } : undefined,
//     },
//     mainProduction: {
//       quantity: {
//         xxs: specification.main_production?.quantity.xxs || 0,
//         xs: specification.main_production?.quantity.xs || 0,
//         s: specification.main_production?.quantity.s || 0,
//         m: specification.main_production?.quantity.m || 0,
//         l: specification.main_production?.quantity.l || 0,
//         xl: specification.main_production?.quantity.xl || 0,
//         xxl: specification.main_production?.quantity.xxl || 0,
//       },
//       deliveryDate: specification.main_production?.delivery_date || "",
//     },
//     information: {
//       contact: {
//         firstName: specification.information?.contact?.first_name || "",
//         lastName: specification.information?.contact?.last_name || "",
//         phoneNumber: specification.information?.contact?.phone_number || "",
//         email: specification.information?.contact?.email || "",
//       },
//       billingInformation: {
//         addressLine1: specification.information?.billing_information?.address_line_1 || "",
//         addressLine2: specification.information?.billing_information?.address_line_2 || "",
//         zipCode: specification.information?.billing_information?.zip_code || "",
//         state: specification.information?.billing_information?.state || "",
//         city: specification.information?.billing_information?.city || "",
//         country: specification.information?.billing_information?.country || "",
//         companyName: specification.information?.billing_information?.company_name || "",
//         firstName: specification.information?.billing_information?.first_name || "",
//         lastName: specification.information?.billing_information?.last_name || "",
//         phoneNumber: specification.information?.billing_information?.phone_number || "",
//         email: specification.information?.billing_information?.email || "",
//       },
//       shippingInformation: {
//         sameAsBillingInformation: specification.information?.shipping_information?.same_as_billing_information || false,
//         addressLine1: specification.information?.shipping_information?.address_line_1 || "",
//         addressLine2: specification.information?.shipping_information?.address_line_2 || "",
//         zipCode: specification.information?.shipping_information?.zip_code || "",
//         state: specification.information?.shipping_information?.state || "",
//         city: specification.information?.shipping_information?.city || "",
//         country: specification.information?.shipping_information?.country || "",
//         companyName: specification.information?.shipping_information?.company_name || "",
//         firstName: specification.information?.shipping_information?.first_name || "",
//         lastName: specification.information?.shipping_information?.last_name || "",
//         phoneNumber: specification.information?.shipping_information?.phone_number || "",
//         email: specification.information?.shipping_information?.email || "",
//       }
//     }
//   }
// }
