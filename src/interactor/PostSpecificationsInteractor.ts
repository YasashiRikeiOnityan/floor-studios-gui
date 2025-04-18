import { ApiPostSpecifications } from "@/lib/api";
import { ApiPostSpecificationsRequest, ApiPostSpecificationsResponse } from "@/lib/type";

export const PostSpecificationsInteractor = async (brandName: string, productName: string, productCode: string, specificationGroupId: string) => {
  const requestBody = getRequestBody(brandName, productName, productCode, specificationGroupId);
  const response = await ApiPostSpecifications(requestBody);
  return mapSpecifications(response);
}

const getRequestBody = (brandName: string, productName: string, productCode: string, specificationGroupId: string): ApiPostSpecificationsRequest => {
  const requestBody: ApiPostSpecificationsRequest = {
    brand_name: brandName,
    product_name: productName,
    product_code: productCode,
    specification_group_id: specificationGroupId,
  };
  return requestBody;
}

const mapSpecifications = (specifications: ApiPostSpecificationsResponse) => {
  return {
    specificationId: specifications.specification_id
  }
}
