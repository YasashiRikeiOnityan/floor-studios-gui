import {
  SpecificationStatus,
  SpecificationType,
  BaseSpecification,
} from "@/lib/type/specification/type";

export type TopsSpecification = BaseSpecification & {
  type: SpecificationType;
  fit?: TopsFit;
  fabric?: TopsFabric;
  tag?: TopsTag;
  careLabel?: TopsCareLabel;
  oemPoints?: TopsOemPoints;
  sample?: TopsSample;
  mainProduction?: TopsMainProduction;
  information?: TopsInformation;
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

export type TopsFit = {
  totalLength: SizeValue;
  chestWidth: SizeValue;
  shoulderToShoulder: SizeValue;
  sleeveLength: SizeValue;
};

export type TopsFabric = {
  materials: string[];
  subMaterials: string[];
  description: Description;
};

export type TopsTag = {
  description: Description;
};

export type TopsCareLabel = {
  description: Description;
};


export type TopsOemPoints = Description[];

export type TopsSample = {
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

export type TopsMainProduction = {
  quantity: SizeValue;
  deliveryDate?: string;
};

export type TopsInformation = {
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

export type ApiGetTopsSpecificationResponse = {
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
    chest_width: SizeValue;
    shoulder_to_shoulder: SizeValue;
    sleeve_length: SizeValue;
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

export type ApiPutTopsSpecificationRequest = {
  brand_name?: string;
  product_name?: string;
  product_code?: string;
  status?: SpecificationStatus;
  specification_group_id?: string;
  type?: SpecificationType;
  progress?: string;
  fit?: {
    total_length: SizeValue;
    chest_width: SizeValue;
    shoulder_to_shoulder: SizeValue;
    sleeve_length: SizeValue;
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

export type ApiPutTopsSpecificationResponse = {
  specification_id: string;
};

export const TopsEditSteps = [
  { order: 0, name: "", progress: "INITIAL" },
  { order: 1, name: "Basic Information", progress: "BASICINFORMATION" },
  { order: 2, name: "Fit", progress: "FIT" },
  { order: 3, name: "Fabric", progress: "FABRIC" },
  { order: 4, name: "Tag", progress: "TAG" },
  { order: 5, name: "Carelabel", progress: "CARELABEL" },
  { order: 6, name: "OEM Point", progress: "OEMPOINT" },
  { order: 7, name: "Sample", progress: "SAMPLE" },
  { order: 8, name: "Main Production", progress: "MAINPRODUCTION" },
  { order: 9, name: "Information", progress: "INFORMATION" },
  { order: 10, name: "", progress: "COMPLETE" }
]