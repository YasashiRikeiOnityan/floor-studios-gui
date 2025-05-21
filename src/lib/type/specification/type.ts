import {
  ApiGetTShirtSpecificationResponse,
  ApiPutTShirtSpecificationRequest,
  TShirtSpecification,
} from "@/lib/type/specification/t-shirt/type";

export type Specification = {
  specificationId: string;
  brandName: string;
  productName: string;
  productCode: string;
  type?: SpecificationType;
  status?: SpecificationStatus;
  progress?: string;
  specificationGroupId?: string;
  updatedBy?: {
    userId: string;
    userName: string;
  };
  updatedAt?: string;
  careLabel?: {
    hasLogo: boolean;
    defaultLogo: boolean;
    file?: {
      name: string;
      key: string;
      preSignedUrl?: {
        get?: string;
        put?: string;
        delete?: string;
      };
    };
    description: Description;
  };
  oemPoints?: {
    oemPoint: string;
    file?: File;
  }[];
  information?: {
    contact?: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
    };
    billingAddress?: {
      addressLine1: string;
      addressLine2: string;
      zipCode: string;
      state: string;
      city: string;
      country: string;
    };
    shippingAddress?: {
      addressLine1: string;
      addressLine2: string;
      zipCode: string;
      state: string;
      city: string;
      country: string;
    };
  };
  tshirt?: TShirtSpecification;
}

export type ApiGetSpecificationsSpecificationIdResponse = ApiGetTShirtSpecificationResponse;

export type ApiPutSpecificationsSpecificationIdRequest = ApiPutTShirtSpecificationRequest;

export type ApiPutSpecificationsSpecificationIdResponse = {
  specification_id: string
};

export type ApiPostSpecificationsRequest = {
  brand_name: string;
  product_name: string;
  product_code: string;
  specification_group_id: string;
}

export type ApiPostSpecificationsResponse = {
  specification_id: string;
}

export type SpecificationStatus = "DRAFT" | "COMPLETE" | "SAMPLE" | "BULK" | undefined;

export type SpecificationType = "T-SHIRT" | "SHORTS" | undefined;

export type SizeValue = {
  xxs: number;
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
};

export type Material = {
  rowMaterial: string;
  thickness: string;
  description: Description;
  colourway: Colourway;
}

export type SubMaterial = {
  rowMaterial: string;
  description: Description;
  colourway: Colourway;
}

export type Colourway = {
  pantone: string;
  hex: string;
}

export type Description = {
  description: string;
  file?: {
    name: string;
    key: string;
    preSignedUrl?: {
      get?: string;
      put?: string;
      delete?: string;
    };
  };
}