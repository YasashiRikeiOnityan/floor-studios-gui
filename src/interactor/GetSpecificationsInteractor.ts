import { ApiGetSpecifications } from "@/lib/api"
import { ApiGetSpecificationsResponse, Specification } from "@/lib/type";

export const GetSpecificationsInteractor = async () => {
  const response = await ApiGetSpecifications();
  return response.map(elem => mapSpecifications(elem));
}

const mapSpecifications = (specifications: ApiGetSpecificationsResponse): Specification => {
  return {
    specificationId: specifications.specification_id,
    tenantId: specifications.tenant_id,
    brandName: specifications.brand_name,
    productName: specifications.product_name,
    productCode: specifications.product_code,
    createdBy: {
      userId: specifications.created_by.user_id,
      userName: specifications.created_by.user_name,
    },
    createdAt: specifications.created_at,
    updatedAt: specifications.updated_at,
    status: specifications.status,
  }
}