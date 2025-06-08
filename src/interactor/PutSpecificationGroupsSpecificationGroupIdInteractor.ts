import { ApiPutSpecificationGroupsSpecificationGroupId } from "@/lib/api";
import { ApiPutSpecificationGroupsSpecificationGroupIdRequest, ApiPutSpecificationGroupsSpecificationGroupIdResponse } from "@/lib/type/specification_group/type";
import { notificationStore } from "@/stores/notificationStore";

export const PutSpecificationGroupsSpecificationGroupId = async (specificationGroupId: string, specificationGroup: ApiPutSpecificationGroupsSpecificationGroupIdRequest): Promise<ApiPutSpecificationGroupsSpecificationGroupIdResponse | undefined> => {
  try {
    const response = await ApiPutSpecificationGroupsSpecificationGroupId(specificationGroupId, specificationGroup);
    notificationStore.addNotification("Success", "Collection saved successfully", "success");
    return response;
  } catch {
    notificationStore.addNotification("Error", "Failed to save collection", "error");
    return undefined;
  }
};