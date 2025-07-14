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

export type Specification =
  | TopsSpecification
  | BottomsSpecification
  | TShirtSpecification;

export type SpecificationStatus = "DRAFT" | "COMPLETE" | "SAMPLE" | "BULK" | undefined;

export type SpecificationType = "T-SHIRT" | "LONG_SLEEVE" | "CREWNECK" | "HOODIE" | "ZIP_HOODIE" | "HALF_ZIP" | "KNIT_CREWNECK" | "SWEATPANTS" | "DENIMPANTS" | undefined;

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
  | ApiGetTShirtSpecificationResponse;

export type ApiPutSpecificationsSpecificationIdRequest =
  | ApiPutTopsSpecificationRequest
  | ApiPutBottomsSpecificationRequest
  | ApiPutTShirtSpecificationRequest;

export type ApiPutSpecificationsSpecificationIdResponse = {
  specification_id: string;
}

export type ApiGetSpecificationsSpecificationIdDownloadResponse = {
  url: string;
}

export type ApiGetSpecificationsSpecificationIdPreviewResponse = {
  url: string;
}