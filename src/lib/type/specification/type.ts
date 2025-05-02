import {
  ApiGetTShirtSpecificationResponse,
  ApiPutTShirtSpecificationRequest,
  TShirtSpecification
} from "@/lib/type/specification/t-shirt/type";

type FirstSpecification = {
  specificationId: string;
  brandName: string;
  productName: string;
  productCode: string;
  updatedBy?: {
    userId: string;
    userName: string;
  };
  updatedAt?: string;
}

export type Specification = FirstSpecification | TShirtSpecification;

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
