import { ApiPutSpecificationsSpecificationId, ApiPutTenant } from "@/lib/api";
import { ApiPutSpecificationsSpecificationIdRequest, ApiPutSpecificationsSpecificationIdResponse, ApiPutTenantRequest, ApiPutTenantResponse, Specification, Tenant } from "@/lib/type";

export const PutSpecificationsSpecificationIdInteractor = async (specification: Specification) => {
  const response = await ApiPutSpecificationsSpecificationId(specification.specificationId, mapSpecificationRequest(specification));
  return response;
};

const mapSpecificationRequest = (specification: Specification): ApiPutSpecificationsSpecificationIdRequest => {
  let request: ApiPutSpecificationsSpecificationIdRequest = {}
  if (specification.brandName) {
    request.brand_name = specification.brandName;
  }
  if (specification.productName) {
    request.product_name = specification.productName;
  }
  if (specification.productCode) {
    request.product_code = specification.productCode;
  }
  if (specification.specificationGroupId) {
    request.specification_group_id = specification.specificationGroupId;
  }
  if (specification.kind) {
    request.kind = specification.kind;
  }
  if (specification.status) {
    request.status = specification.status;
  }
  if (specification.details) {
    request.details = specification.details;
  }
  return request;
};
