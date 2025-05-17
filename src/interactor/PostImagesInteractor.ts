import { ApiPostImages } from "@/lib/api";
import { ApiPostImagesRequest, ApiPostImagesResponse } from "@/lib/type/image/type";

export const PostImagesInteractor = async (images: ApiPostImagesRequest): Promise<ApiPostImagesResponse> => {
  const response = await ApiPostImages(images);
  return response;
};