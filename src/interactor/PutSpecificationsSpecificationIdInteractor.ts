import { ApiPutSpecificationsSpecificationId } from "@/lib/api";
import { ApiPutSpecificationsSpecificationIdRequest } from "@/lib/type/specification/type";

export const PutSpecificationsSpecificationIdInteractor = async (specificationId: string, specification: ApiPutSpecificationsSpecificationIdRequest) => {
  const response = await ApiPutSpecificationsSpecificationId(specificationId, specification);
  return response;
};

