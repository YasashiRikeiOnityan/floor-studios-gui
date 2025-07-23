import {
  TopsSpecification,
  ApiPutTopsSpecificationRequest,
  ApiGetTopsSpecificationResponse,
} from "@/lib/type/specification/tops/type";

import {
  BottomsSpecification,
  ApiPutBottomsSpecificationRequest,
  ApiGetBottomsSpecificationResponse,
} from "@/lib/type/specification/bottoms/type";

import {
  TShirtSpecification,
  ApiGetTShirtSpecificationResponse,
  ApiPutTShirtSpecificationRequest,
} from "@/lib/type/specification/t-shirt/type";

import {
  CustomSpecification,
  ApiGetCustomSpecificationResponse,
  ApiPutCustomSpecificationRequest,
} from "@/lib/type/specification/custom/type";

export type Specification =
  | TopsSpecification
  | BottomsSpecification
  | CustomSpecification
  | TShirtSpecification;

export type SpecificationStatus = "DRAFT" | "COMPLETE" | "SAMPLE" | "BULK" | undefined;

export type SpecificationType = "T-SHIRT" | "LONG_SLEEVE" | "CREWNECK" | "HOODIE" | "ZIP_HOODIE" | "HALF_ZIP" | "KNIT_CREWNECK" | "JACKET" | "HEAVY_OUTER" | "SWEATPANTS" | "DENIMPANTS" | "CUSTOMIZE" | undefined;

export type BaseSpecification = {
  specificationId: string;
  brandName: string;
  productName: string;
  productCode: string;
  status: SpecificationStatus;
  progress: string;
  specificationGroupId: string;
  updatedBy?: {
    userId: string;
    userName: string;
  };
  updatedAt?: string;
};

export type Specifications = BaseSpecification[];

export type ApiGetSpecificationsResponse = {
  specification_id: string;
  brand_name: string;
  product_name: string;
  product_code: string;
  type: SpecificationType;
  status: SpecificationStatus;
  progress: string;
  specification_group_id: string;
  updated_by?: {
    user_id: string;
    user_name: string;
  };
  updated_at?: string;
}[];

export type ApiPostSpecificationsRequest = {
  brand_name: string;
  product_name: string;
  product_code: string;
  type: SpecificationType;
  status: SpecificationStatus;
  progress: string;
  specification_group_id: string;
}

export type ApiPostSpecificationsResponse = {
  specification_id: string;
}

export type ApiGetSpecificationsSpecificationIdResponse =
  | ApiGetTopsSpecificationResponse
  | ApiGetBottomsSpecificationResponse
  | ApiGetTShirtSpecificationResponse
  | ApiGetCustomSpecificationResponse;

export type ApiPutSpecificationsSpecificationIdRequest =
  | ApiPutTopsSpecificationRequest
  | ApiPutBottomsSpecificationRequest
  | ApiPutTShirtSpecificationRequest
  | ApiPutCustomSpecificationRequest;

export type ApiPutSpecificationsSpecificationIdResponse = {
  specification_id: string;
}

export type ApiGetSpecificationsSpecificationIdDownloadResponse = {
  url: string;
}

export type ApiPostSpecificationsSpecificationIdDuplicateResponse = {
  specification_id: string;
}

export type ApiGetSpecificationsSpecificationIdPreviewResponse = {
  url: string;
}