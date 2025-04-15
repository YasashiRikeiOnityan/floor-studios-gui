export type ApiGetUsersUserIdResponse = {
  user_id: string;
  email: string;
  user_name?: string;
  image_url?: string;
}

export type User = {
  userId: string;
  email?: string;
  userName?: string;
  imageUrl?: string;
  timezone?: string;
  language?: string;
}

export type ApiPutUsersUserIdRequest = {
  user_name?: string;
  image_url?: string;
}

export type ApiPutUsersUserIdResponse = {
  user_id: string;
  email: string;
  user_name?: string;
  image_url?: string;
}

export type ApiPostSpecificationsRequest = {
  brand_name: string;
  product_name: string;
  product_code: string;
}

export type Specification = {
  specificationId: string;
  tenantIdStatus: string;
  brandName: string;
  productName: string;
  productCode: string;
  updatedBy: {
    userId: string;
    userName: string;
  };
  updatedAt: string;
}

export type ApiGetSpecificationsResponse = {
  specification_id: string;
  tenant_id_status: string;
  brand_name: string;
  product_name: string;
  product_code: string;
  updated_by: {
    user_id: string;
    user_name: string;
  };
  updated_at: string;
}

export type ApiPostSpecificationsResponse = {
  specification_id: string;
}

export type SpecificationStatus = "DRAFT" | "COMPLETED" | "SAMPLE" | "BULK" | undefined;

export type ApiGetSpecificationsSpecificationIdDownloadResponse = {
  url: string;
}

export type SpecificationGroup = {
  specificationGroupId: string;
  specificationGroupName: string;
}

export type ApiGetSpecificationGroupsResponse = {
  specification_group_id: string;
  tenant_id: string;
  specification_group_name: string;
}
