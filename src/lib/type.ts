export type ApiGetUsersUserIdResponse = {
  user_id: string;
  email: string;
  user_name?: string;
  img_url?: string;
}

export type User = {
  userId: string;
  email?: string;
  userName?: string;
  imgUrl?: string;
}

export type ApiPutUsersUserIdRequest = {
  user_name?: string;
  img_url?: string;
}

export type ApiPutUsersUserIdResponse = {
  user_id: string;
  email: string;
  user_name?: string;
  img_url?: string;
}

export type ApiPostSpecificationsRequest = {
  brand_name: string;
  product_name: string;
  product_code: string;
}

export type ApiPostSpecificationsResponse = {
  specifications_id: string;
}
