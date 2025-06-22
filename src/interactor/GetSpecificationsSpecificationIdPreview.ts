import { ApiGetSpecificationsSpecificationIdPreview } from "@/lib/api";

export const GetSpecificationsSpecificationIdPreviewInteractor = async (specificationId: string) => {
  const response = await ApiGetSpecificationsSpecificationIdPreview(specificationId);
  return response;
} 