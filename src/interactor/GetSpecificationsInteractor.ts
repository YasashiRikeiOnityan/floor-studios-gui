import { ApiGetSpecifications } from "@/lib/api"
import { ApiGetSpecificationsResponse, Specification } from "@/lib/type";

export const GetSpecificationsInteractor = async () => {
  const response = await ApiGetSpecifications();
  return response.map(elem => mapSpecifications(elem));
}

const mapSpecifications = (specifications: ApiGetSpecificationsResponse): Specification => {
  return {
    specificationId: specifications.specification_id,
    tenantIdStatus: specifications.tenant_id_status,
    brandName: specifications.brand_name,
    productName: specifications.product_name,
    productCode: specifications.product_code,
    updatedBy: {
      userId: specifications.updated_by.user_id,
      userName: specifications.updated_by.user_name,
    },
    updatedAt: specifications.updated_at,
  }
}