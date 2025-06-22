import { ApiDeleteSpecificationsSpecificationId } from "@/lib/api";
import { notificationStore } from "@/stores/notificationStore";

export const DeleteSpecificationsSpecificationIdInteractor = async (specificationId: string) => {
  try {
    const response = await ApiDeleteSpecificationsSpecificationId(specificationId);
    notificationStore.addNotification("Success", "Specification deleted successfully", "success");
    return response;
  } catch {
    notificationStore.addNotification("Error", "Failed to delete specification", "error");
  }
}