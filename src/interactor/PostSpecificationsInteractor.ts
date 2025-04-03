import { ApiPostSpecifications } from "@/lib/api";
import { ApiPostSpecificationsRequest, ApiPostSpecificationsResponse } from "@/lib/type";

export const PostSpecificationsInteractor = async (brandName: string, productName: string, productCode: string) => {
  const requestBody = getRequestBody(brandName, productName, productCode);
  const response = await ApiPostSpecifications(requestBody);
  return mapSpecifications(response);
}

const getRequestBody = (brandName: string, productName: string, productCode: string): ApiPostSpecificationsRequest => {
  const requestBody: ApiPostSpecificationsRequest = {
    brand_name: brandName,
    product_name: productName,
    product_code: productCode,
  };
  return requestBody;
}

const mapSpecifications = (specifications: ApiPostSpecificationsResponse) => {
  return {
    specificationsId: specifications.specifications_id,
  }
}
