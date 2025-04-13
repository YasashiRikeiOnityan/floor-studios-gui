import { ApiDeleteSpecificationsSpecificationId } from "@/lib/api";

export const DeleteSpecificationsSpecificationIdInteractor = async (specificationId: string) => {
  const response = await ApiDeleteSpecificationsSpecificationId(specificationId);
  return response;
}