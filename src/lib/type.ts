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
  progress?: string;
  specificationGroupId: string;
  type?: string;
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
  status?: SpecificationStatus;
  progress?: string;
  specification_group_id: string;
  type?: string;
  details?: {
    [key: string]: string;
  };
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
  progress?: string;
  specification_group_id: string;
  type?: string;
  details?: {
    [key: string]: string;
  };
}

export type ApiPutSpecificationsSpecificationIdRequest = {
  brand_name?: string;
  product_name?: string;
  product_code?: string;
  specification_group_id?: string;
  type?: string;
  status?: SpecificationStatus;
  progress?: string;
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

export const EditSteps = [
  {order: 0, name: "", progress: "INITIAL"},
  {order: 1, name: "Type", progress: "TYPE"},
  {order: 2, name: "Fit", progress: "FIT"},
  {order: 3, name: "Fabric", progress: "FABRIC"},
  {order: 4, name: "Clourway", progress: "COLOURWAY"},
  {order: 5, name: "Necklabel", progress: "NECKLABEL"},
  {order: 6, name: "Carelabel", progress: "CARELABEL"},
  {order: 7, name: "OEM Point", progress: "OEMPOINT"},
  {order: 8, name: "Sample", progress: "SAMPLE"},
  {order: 9, name: "Main Production", progress: "MAINPRODUCTION"},
  {order: 10, name: "Information", progress: "INFORMATION"},
  {order: 11, name: "", progress: "COMPLETE"}
]