import { ApiDeleteSpecificationGroupsSpecificationGroupId } from "@/lib/api";
import { ApiDeleteSpecificationGroupsSpecificationGroupIdResponse } from "@/lib/type/specification_group/type";
import { notificationStore } from "@/stores/notificationStore";

export const DeleteSpecificationGroupsSpecificationGroupId = async (specificationGroupId: string): Promise<ApiDeleteSpecificationGroupsSpecificationGroupIdResponse | undefined> => {
  try {
    const response = await ApiDeleteSpecificationGroupsSpecificationGroupId(specificationGroupId);
    notificationStore.addNotification("Success", "Collection deleted successfully", "success");
    return response;
  } catch (error: any) {
    if (error.response?.status === 409) {
      notificationStore.addNotification("Error", "Cannot delete collection because it contains specifications. Please remove all specifications from this collection first.", "error");
    } else {
      notificationStore.addNotification("Error", "Failed to delete collection", "error");
    }
    return undefined;
  }
};