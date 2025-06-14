import { ApiDeleteSpecificationGroupsSpecificationGroupId } from "@/lib/api";
import { ApiDeleteSpecificationGroupsSpecificationGroupIdResponse } from "@/lib/type/specification_group/type";
import { notificationStore } from "@/stores/notificationStore";

export const DeleteSpecificationGroupsSpecificationGroupId = async (specificationGroupId: string): Promise<ApiDeleteSpecificationGroupsSpecificationGroupIdResponse | undefined> => {
  try {
    const response = await ApiDeleteSpecificationGroupsSpecificationGroupId(specificationGroupId);
    notificationStore.addNotification("Success", "Collection deleted successfully", "success");
    return response;
  } catch {
    notificationStore.addNotification("Error", "Failed to delete collection", "error");
    return undefined;
  }
};