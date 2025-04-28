import { ApiGetSpecificationsSpecificationId } from "@/lib/api";
import { ApiGetSpecificationsSpecificationIdResponse, Specification, SpecificationStatus, SpecificationType, TShirtFit } from "@/lib/type";

export const GetSpecificationsSpecificationIdInteractor = async (specificationId: string): Promise<Specification> => {
  const response = await ApiGetSpecificationsSpecificationId(specificationId);
  return mapSpecification(response);
}

const mapSpecification = (specification: ApiGetSpecificationsSpecificationIdResponse): Specification => {
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
    status: mapSpecificationStatus(specification.status || ""),
    specificationGroupId: specification.specification_group_id || "",
    type: mapSpecificationType(specification.type || ""),
    progress: specification.progress || "",
    fit: convertFit(specification.type || "", specification.fit || {}),
  }
}

const mapSpecificationStatus = (status: string): SpecificationStatus => {
  return status === "DRAFT" ? "DRAFT" : status === "COMPLETE" ? "COMPLETE" : status === "SAMPLE" ? "SAMPLE" : status === "BULK" ? "BULK" : undefined;
}

const mapSpecificationType = (type: string): SpecificationType => {
  return type === "T-SHIRT" ? "T-SHIRT" : type === "SHORTS" ? "SHORTS" : undefined;
}

const convertFit = (type: string, fit: ApiGetSpecificationsSpecificationIdResponse["fit"]): TShirtFit | undefined => {
  if (!fit) {
    return undefined
  }
  if (type === "T-SHIRT") {
    return {
      totalLength: fit.total_length || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      chestWidth: fit.chest_width || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      bottomWidth: fit.bottom_width || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      sleeveLength: fit.sleeve_length || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      armhole: fit.armhole || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      sleeveOpening: fit.sleeve_opening || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      neckRibLength: fit.neck_rib_length || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      neckOpening: fit.neck_opening || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
      shoulderToShoulder: fit.shoulder_to_shoulder || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
    }
  }
  return undefined
}