import {
  SpecificationStatus,
  SpecificationType,
  BaseSpecification,
} from "@/lib/type/specification/type";

export type BottomsSpecification = BaseSpecification & {
  type: SpecificationType;
  fit?: BottomsFit;
  fabric?: BottomsFabric;
  tag?: BottomsTag;
  careLabel?: BottomsCareLabel;
  patch?: BottomsPatch;
  oemPoints?: BottomsOemPoints;
  sample?: BottomsSample;
  mainProduction?: BottomsMainProduction;
  information?: BottomsInformation;
};

export type SizeValue = {
  xs: string;
  s: string;
  m: string;
  l: string;
  xl: string;
};

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

export type BottomsFit = {
  totalLength: SizeValue;
  waist: SizeValue;
  rise: SizeValue;
  inseam: SizeValue;
  hip: SizeValue;
  aroundTheThigh: SizeValue;
  aroundTheKnee: SizeValue;
  hemWidth: SizeValue;
  aroundTheHem: SizeValue;
};

export type BottomsFabric = {
  materials: string[];
  subMaterials: string[];
  description: Description;
};

export type BottomsTag = {
  description: Description;
};

export type BottomsCareLabel = {
  description: Description;
};

export type BottomsPatch = {
  description: Description;
};

export type BottomsOemPoints = Description[];

export type BottomsSample = {
  isSample: boolean;
  quantity: SizeValue;
  canSendSample: boolean;
  sampleFront?: {
    name: string;
    key: string;
  };
  sampleBack?: {
    name: string;
    key: string;
  };
};

export type BottomsMainProduction = {
  quantity: SizeValue;
  deliveryDate?: string;
};

export type BottomsInformation = {
  contact?: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
  billingInformation?: {
    addressLine1: string;
    addressLine2: string;
    zipCode: string;
    state: string;
    city: string;
    country: string;
    companyName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
  shippingInformation?: {
    sameAsBillingInformation: boolean;
    addressLine1: string;
    addressLine2: string;
    zipCode: string;
    state: string;
    city: string;
    country: string;
    companyName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
};

export type ApiGetBottomsSpecificationResponse = {
  specification_id: string;
  brand_name: string;
  product_name: string;
  product_code: string;
  updated_by: {
    user_id: string;
    user_name: string;
  };
  updated_at: string;
  status: SpecificationStatus;
  specification_group_id: string;
  type: SpecificationType;
  progress: string;
  fit?: {
    total_length: SizeValue;
    waist: SizeValue;
    rise: SizeValue;
    inseam: SizeValue;
    hip: SizeValue;
    around_the_thigh: SizeValue;
    around_the_knee: SizeValue;
    hem_width: SizeValue;
    around_the_hem: SizeValue;
  };
  fabric?: {
    materials: string[];
    sub_materials: string[];
    description: {
      description: string;
      file?: {
        name: string;
        key: string;
      };
    };
  };
  tag?: {
    description: {
      description: string;
      file?: {
        name: string;
        key: string;
      };
    };
  };
  care_label?: {
    description: {
      description: string;
      file?: {
        name: string;
        key: string;
      };
    };
  };
  patch?: {
    description: {
      description: string;
      file?: {
        name: string;
        key: string;
      };
    };
  };
  oem_points?: {
    description: string;
    file?: {
      name: string;
      key: string;
    };
  }[];
  sample?: {
    is_sample: boolean;
    quantity: SizeValue;
    can_send_sample: boolean;
    sample_front?: {
      name: string;
      key: string;
    };
    sample_back?: {
      name: string;
      key: string;
    };
  };
  main_production?: {
    quantity: SizeValue;
    delivery_date?: string;
  };
  information?: {
    contact?: {
      first_name: string;
      last_name: string;
      phone_number: string;
      email: string;
    };
    billing_information?: {
      address_line_1: string;
      address_line_2: string;
      zip_code: string;
      state: string;
      city: string;
      country: string;
      company_name: string;
      first_name: string;
      last_name: string;
      phone_number: string;
      email: string;
    };
    shipping_information?: {
      same_as_billing_information: boolean; 
      address_line_1: string;
      address_line_2: string;
      zip_code: string;
      state: string;
      city: string;
      country: string;
      company_name: string;
      first_name: string;
      last_name: string;
      phone_number: string;
      email: string;
    };
  };
};

export type ApiPutBottomsSpecificationRequest = {
  brand_name?: string;
  product_name?: string;
  product_code?: string;
  status?: SpecificationStatus;
  specification_group_id?: string;
  type?: SpecificationType;
  progress?: string;
  fit?: {
    total_length: SizeValue;
    waist: SizeValue;
    rise: SizeValue;
    inseam: SizeValue;
    hip: SizeValue;
    around_the_thigh: SizeValue;
    around_the_knee: SizeValue;
    hem_width: SizeValue;
    around_the_hem: SizeValue;
  };
  fabric?: {
    materials: string[];
    sub_materials: string[];
    description: {
      description: string;
      file?: {
        name: string;
        key: string;
      };
    };
  };
  tag?: {
    description: {
      description: string;
      file?: {
        name: string;
        key: string;
      };
    };
  };
  care_label?: {
    description: {
      description: string;
      file?: {
        name: string;
        key: string;
      };
    };
  };
  patch?: {
    description: {
      description: string;
      file?: {
        name: string;
        key: string;
      };
    };
  };
  oem_points?: {
    description: string;
    file?: {
      name: string;
      key: string;
    };
  }[];
  sample?: {
    is_sample: boolean;
    quantity: SizeValue;
    can_send_sample?: boolean;
    sample_front?: {
      name: string;
      key: string;
    };
    sample_back?: {
      name: string;
      key: string;
    };
  };
  main_production?: {
    quantity: SizeValue;
    delivery_date?: string;
  };
  information?: {
    contact?: {
      first_name: string;
      last_name: string;
      phone_number: string;
      email: string;
    };
    billing_information?: {
      address_line_1: string;
      address_line_2: string;
      zip_code: string;
      state: string;
      city: string;
      country: string;
      company_name: string;
      first_name: string;
      last_name: string;
      phone_number: string;
      email: string;
    };
    shipping_information?: {
      same_as_billing_information: boolean;
      address_line_1: string;
      address_line_2: string;
      zip_code: string;
      state: string;
      city: string;
      country: string;
      company_name: string;
      first_name: string;
      last_name: string;
      phone_number: string;
      email: string;
    };
  };
};

export type ApiPutBottomsSpecificationResponse = {
  specification_id: string;
};

export const BottomsEditSteps = [
  {order: 0, name: "", progress: "INITIAL"},
  {order: 1, name: "Basic Information", progress: "BASICINFORMATION"},
  {order: 2, name: "Fit", progress: "FIT"},
  {order: 3, name: "Fabric", progress: "FABRIC"},
  {order: 4, name: "Tag", progress: "TAG"},
  {order: 5, name: "Carelabel", progress: "CARELABEL"},
  {order: 6, name: "Patch", progress: "PATCH"},
  {order: 7, name: "OEM Point", progress: "OEMPOINT"},
  {order: 8, name: "Sample", progress: "SAMPLE"},
  {order: 9, name: "Main Production", progress: "MAINPRODUCTION"},
  {order: 10, name: "Information", progress: "INFORMATION"},
  {order: 11, name: "", progress: "COMPLETE"}
]