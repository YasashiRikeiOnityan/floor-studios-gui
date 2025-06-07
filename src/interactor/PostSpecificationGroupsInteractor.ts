import { ApiPostSpecificationGroupsRequest, ApiPostSpecificationGroupsResponse } from "@/lib/type/specification_group/type";
import { ApiPostSpecificationGroups } from "@/lib/api";

export const PostSpecificationGroupsInteractor = async (specificationGroup: ApiPostSpecificationGroupsRequest): Promise<ApiPostSpecificationGroupsResponse> => {
  try {
    const response = await ApiPostSpecificationGroups(specificationGroup);
    return response;
  } catch (error) {
    throw error;
  }
}