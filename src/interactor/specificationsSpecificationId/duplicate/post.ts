import { ApiPostSpecificationsSpecificationIdDuplicate } from "@/lib/api";
import { notificationStore } from "@/stores/notificationStore";

export const PostSpecificationsSpecificationIdDuplicateInteractor = async (specificationId: string) => {
  try {
    const response = await ApiPostSpecificationsSpecificationIdDuplicate(specificationId);
    notificationStore.addNotification("Success", "Specification duplicated successfully", "success");
    return {
      specificationId: response.specification_id,
    };
  } catch {
    notificationStore.addNotification("Error", "Failed to duplicate specification", "error");
    return undefined;
  }
};

