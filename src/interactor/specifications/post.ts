import { ApiPostSpecifications } from "@/lib/api";
import {
  ApiPostSpecificationsRequest,
  ApiPostSpecificationsResponse,
} from "@/lib/type/specification/type";
import { notificationStore } from "@/stores/notificationStore";

export const PostSpecificationsInteractor = async (specification: ApiPostSpecificationsRequest): Promise<ApiPostSpecificationsResponse | undefined> => {
  try {
    const response = await ApiPostSpecifications(specification);
    return response;
  } catch {
    notificationStore.addNotification("Error", "Failed to create specification", "error");
    return undefined;
  }
};
