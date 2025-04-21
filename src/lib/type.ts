export type Tenant = {
  tenantId: string;
  tenantName: string;
  contact: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
  billingAddress: {
    addressLine1: string;
    addressLine2: string;
    zipCode: string;
    state: string;
    city: string;
    country: string;
  };
  shippingAddress: {
    sameAsBillingAddress: boolean;
    addressLine1: string;
    addressLine2: string;
    zipCode: string;
    state: string;
    city: string;
    country: string;
  };
}

export type ApiGetTenantResponse = {
  tenant_id: string;
  tenant_name: string;
  contact?: {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
  };
  billing_address?: {
    address_line_1: string;
    address_line_2: string;
    zip_code: string;
    state: string;
    city: string;
    country: string;
  };
  shipping_address?: {
    same_as_billing_address: boolean;
    address_line_1: string;
    address_line_2: string;
    zip_code: string;
    state: string;
    city: string;
    country: string;
  };
}

export type ApiPutTenantRequest = {
  tenant_name: string;
  contact: {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
  };
  billing_address: {
    address_line_1: string;
    address_line_2: string;
    zip_code: string;
    state: string;
    city: string;
    country: string;
  };
  shipping_address: {
    same_as_billing_address: boolean;
    address_line_1: string;
    address_line_2: string;
    zip_code: string;
    state: string;
    city: string;
    country: string;
  };
}

export type ApiPutTenantResponse = {
  tenant_id: string;
  tenant_name: string;
  contact?: {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
  };
  billing_address?: {
    address_line_1: string;
    address_line_2: string;
    zip_code: string;
    state: string;
    city: string;
    country: string;
  };
  shipping_address?: {
    same_as_billing_address: boolean;
    address_line_1: string;
    address_line_2: string;
    zip_code: string;
    state: string;
    city: string;
    country: string;
  };
}

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
  specification_group_id: string;
}

export type Specification = {
  specificationId: string;
  tenantIdStatus?: string;
  brandName: string;
  productName: string;
  productCode: string;
  updatedBy?: {
    userId: string;
    userName: string;
  };
  updatedAt?: string;
  status?: SpecificationStatus;
  specificationGroupId: string;
  kind?: string;
  details?: {
    [key: string]: string;
  };
}

export type SpecificationStatus = "DRAFT" | "COMPLETE" | "SAMPLE" | "BULK" | undefined;

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


export type ApiGetSpecificationsSpecificationIdResponse = {
  specification_id: string;
  brand_name: string;
  product_name: string;
  product_code: string;
  updated_by?: {
    user_id: string;
    user_name: string;
  };
  updated_at?: string;
  status?: SpecificationStatus;
  specification_group_id: string;
  kind?: string;
  details?: {
    [key: string]: string;
  };
}

export type ApiPutSpecificationsSpecificationIdRequest = {
  brand_name?: string;
  product_name?: string;
  product_code?: string;
  specification_group_id?: string;
  kind?: string;
  status?: SpecificationStatus;
  details?: {
    [key: string]: string;
  };
}

export type ApiPutSpecificationsSpecificationIdResponse = {
  specification_id: string;
}

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
