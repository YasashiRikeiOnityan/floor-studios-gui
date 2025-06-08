import { ApiPostSpecificationGroupsRequest, ApiPostSpecificationGroupsResponse } from "@/lib/type/specification_group/type";
import { ApiPostSpecificationGroups } from "@/lib/api";
import { notificationStore } from "@/stores/notificationStore";

export const PostSpecificationGroupsInteractor = async (specificationGroup: ApiPostSpecificationGroupsRequest): Promise<ApiPostSpecificationGroupsResponse | undefined> => {
  try {
    const response = await ApiPostSpecificationGroups(specificationGroup);
    notificationStore.addNotification("Success", `Collection (${response.specification_group_name}) created successfully`, "success");
    return response;
  } catch {
    notificationStore.addNotification("Error", "Failed to create specification group", "error");
    return undefined;
  }
}