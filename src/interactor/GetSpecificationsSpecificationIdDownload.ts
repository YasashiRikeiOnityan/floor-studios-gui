import { ApiGetSpecificationsSpecificationIdDownload } from "@/lib/api";

export const GetSpecificationsSpecificationIdDownloadInteractor = async (specificationId: string) => {
  const response = await ApiGetSpecificationsSpecificationIdDownload(specificationId);
  return response;
}
