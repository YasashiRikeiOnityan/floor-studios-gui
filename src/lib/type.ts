export type Tenant = {
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

type SizeValue = {
  xxs: number;
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
}

export type TenantSettingsTShirtFit = {
  fits: {
    fitName: string;
    totalLength: SizeValue;
    chestWidth: SizeValue;
    bottomWidth: SizeValue;
    sleeveLength: SizeValue;
    armhole: SizeValue;
    sleeveOpening: SizeValue;
    neckRibLength: SizeValue;
    neckOpening: SizeValue;
    shoulderToShoulder: SizeValue;
  }[];
}

export type TenantSettingsTShirtFabric = {
  materials: {
    rowMaterial: string;
    thickness: string;
  }[];
  subMaterials: {
    rowMaterial: string;
  }[];
  colourways: {
    pantone: string;
    hex: string;
  }[];
}

export type Material = {
  rowMaterial: string;
  thickness: string;
  description: string;
  colourway: Colourway;
}

export type SubMaterial = {
  rowMaterial: string;
  description: string;
  colourway: Colourway;
}

export type Colourway = {
  pantone: string;
  hex: string;
}

export type ApiGetTenantResponse = {
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

export type ApiGetTenantSettingsTShirtFitResponse = {
  fits: {
    fit_name: string;
    total_length: SizeValue;
    chest_width: SizeValue;
    bottom_width: SizeValue;
    sleeve_length: SizeValue;
    armhole: SizeValue;
    sleeve_opening: SizeValue;
    neck_rib_length: SizeValue;
    neck_opening: SizeValue;
    shoulder_to_shoulder: SizeValue;
  }[];
}

export type ApiGetTenantSettingsTShirtFabricResponse = {
  materials: {
    row_material: string;
    thickness: string;
  }[];
  sub_materials: {
    row_material: string;
  }[];
  colourways: {
    pantone: string;
    hex: string;
  }[];
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

export type SpecificationGroup = {
  specificationGroupId: string;
  specificationGroupName: string;
}

export type ApiGetSpecificationGroupsResponse = {
  specification_group_id: string;
  tenant_id: string;
  specification_group_name: string;
}
