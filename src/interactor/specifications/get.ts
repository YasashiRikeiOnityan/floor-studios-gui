import { ApiGetSpecifications } from "@/lib/api"
import {
  ApiGetSpecificationsResponse,
  SpecificationStatus,
  Specifications,
} from "@/lib/type/specification/type";
import { notificationStore } from "@/stores/notificationStore";

export const GetSpecificationsInteractor = async (specificationGroupId: string, status: SpecificationStatus): Promise<Specifications | undefined> => {
  try {
    const response = await ApiGetSpecifications(specificationGroupId, status);
    return mapSpecifications(response);
  } catch {
    notificationStore.addNotification("Error", "Failed to get specifications", "error");
    return undefined;
  }
}

const mapSpecifications = (specifications: ApiGetSpecificationsResponse): Specifications => {
  return specifications.map(elem => {
    return {
      specificationId: elem.specification_id,
      brandName: elem.brand_name,
      productName: elem.product_name,
      productCode: elem.product_code,
      type: elem.type,
      status: elem.status,
      progress: elem.progress,
      specificationGroupId: elem.specification_group_id,
      updatedBy: {
        userId: elem.updated_by?.user_id || "",
        userName: elem.updated_by?.user_name || "",
      },
      updatedAt: elem.updated_at,
    }
  });
}