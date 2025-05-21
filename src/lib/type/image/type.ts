export type ApiPostImagesRequest = {
  type: "specification" | "profile";
  specification_id?: string;
  key?: string;
  image_type?: "png" | "jpg" | "jpeg";
  method?: "get" | "put" | "delete";
}

export type ApiPostImagesResponse = {
  pre_signed_url: string;
  key: string;
}