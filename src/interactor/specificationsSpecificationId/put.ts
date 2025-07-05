import { ApiPutSpecificationsSpecificationId } from "@/lib/api";
import { ApiPutSpecificationsSpecificationIdRequest } from "@/lib/type/specification/type";
import { notificationStore } from "@/stores/notificationStore";

export const PutSpecificationsSpecificationIdInteractor = async (specificationId: string, specification: ApiPutSpecificationsSpecificationIdRequest, notification: boolean = true) => {
  try {
    const response = await ApiPutSpecificationsSpecificationId(specificationId, specification);
    if (notification) {
      notificationStore.addNotification("Success", "Specification saved successfully", "success");
    }
    return response;
  } catch {
    notificationStore.addNotification("Error", "Failed to save specification", "error");
  }
};

