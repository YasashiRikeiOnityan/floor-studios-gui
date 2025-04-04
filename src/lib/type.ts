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

export type Specification = {
  specificationId: string;
  tenantId: string;
  brandName: string;
  productName: string;
  productCode: string;
  createdBy: {
    userId: string;
    userName: string;
  };
  createdAt: string;
  updatedAt: string;
  status: string;
}

export type ApiGetSpecificationsResponse = {
  specification_id: string;
  tenant_id: string;
  brand_name: string;
  product_name: string;
  product_code: string;
  created_by: {
    user_id: string;
    user_name: string;
  };
  created_at: string;
  updated_at: string;
  status: string;
}

export type ApiPostSpecificationsResponse = {
  specifications_id: string;
}
