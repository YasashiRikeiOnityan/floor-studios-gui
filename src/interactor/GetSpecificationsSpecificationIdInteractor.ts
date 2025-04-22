import { ApiGetSpecificationsSpecificationId } from "@/lib/api";
import { ApiGetSpecificationsSpecificationIdResponse, Specification, SpecificationStatus } from "@/lib/type";

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
    specificationGroupId: specification.specification_group_id,
    type: specification.type || "",
    details: specification.details || {},
  }
}

const mapSpecificationStatus = (status: string): SpecificationStatus => {
  return status === "DRAFT" ? "DRAFT" : status === "COMPLETE" ? "COMPLETE" : status === "SAMPLE" ? "SAMPLE" : status === "BULK" ? "BULK" : undefined;
}
