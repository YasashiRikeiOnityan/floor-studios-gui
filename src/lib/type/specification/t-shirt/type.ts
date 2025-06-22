import { 
  SpecificationStatus,
  SpecificationType,
  BaseSpecification,
} from "@/lib/type/specification/type";

export type TShirtSpecification = BaseSpecification & {
  type: SpecificationType;
  fit?: TShirtFit;
  fabric?: TShirtFabric;
  tag?: TShirtTag;
  careLabel?: TShirtCareLabel;
  oemPoints?: TShirtOemPoints;
  sample?: TShirtSample;
  mainProduction?: TShirtMainProduction;
  information?: TShirtInformation;
};


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
  description: Description;
  colourway: Colourway;
}

export type SubMaterial = {
  rowMaterial: string;
  description: Description;
  colourway: Colourway;
}

export type Colourway = {
  colorName: string;
  colorCode: string;
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

export type TShirtFit = {
  totalLength: SizeValue;
  chestWidth: SizeValue;
  bottomWidth: SizeValue;
  sleeveLength: SizeValue;
  armhole: SizeValue;
  sleeveOpening: SizeValue;
  neckRibLength: SizeValue;
  neckOpening: SizeValue;
  shoulderToShoulder: SizeValue;
  description: Description;
};

export type TShirtFabric = {
  materials: Material[];
  subMaterials: SubMaterial[];
};

export type TShirtTag = {
  isLabel: boolean;
  sendLabels: boolean;
  isCustom: boolean;
  material?: string;
  colourway?: Colourway,
  labelStyle?: string;
  description?: Description;
  labelWidth?: number;
  labelHeight?: number;
}

export type TShirtCareLabel = {
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

export type TShirtOemPoints = Description[];

export type TShirtSample = {
  sample: boolean;
  quantity?: SizeValue;
  canSendSample?: boolean;
};

export type TShirtMainProduction = {
  quantity: SizeValue;
  deliveryDate?: string;
};

export type TShirtInformation = {
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

export type ApiGetTShirtSpecificationResponse = {
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
    bottom_width: SizeValue;
    sleeve_length: SizeValue;
    armhole: SizeValue;
    sleeve_opening: SizeValue;
    neck_rib_length: SizeValue;
    neck_opening: SizeValue;
    shoulder_to_shoulder: SizeValue;
    description: {
      description: string;
      file?: {
        name: string;
        key: string;
      };
    };
  };
  fabric?: {
    materials: {
      row_material: string;
      colourway: {
        color_name: string;
        color_code: string;
      };
      description: {
        description: string;
        file?: {
          name: string;
          key: string;
        };
      };
    }[];
    sub_materials: {
      row_material: string;
      colourway: {
        color_name: string;
        color_code: string;
      };
      description: {
        description: string;
        file?: {
          name: string;
          key: string;
        };
      };
    }[];
  };
  care_label?: {
    has_logo: boolean;
    default_logo: boolean;
    file?: {
      name: string;
      key: string;
    };
    description: {
      description: string;
      file?: {
        name: string;
        key: string;
      };
    };
  };
  tag?: {
    is_label: boolean;
    send_labels: boolean;
    is_custom: boolean;
    material?: string;
    colourway?: {
      color_name: string;
      color_code: string;
    };
    label_style?: string;
    label_width?: number;
    label_height?: number;
    description?: {
      description: string;
      file?: {
        name: string;
        key: string;
      };
    };
  };  
  sample?: {
    sample: boolean;
    quantity?: {
      xxs: number;
      xs: number;
      s: number;
      m: number;
      l: number;
      xl: number;
      xxl: number;
    };
    can_send_sample: boolean;
  };
  oem_points?: {
    description: string;
    file?: {
      name: string;
      key: string;
    };
  }[];
  main_production?: {
    quantity: {
      xxs: number;
      xs: number;
      s: number;
      m: number;
      l: number;
      xl: number;
      xxl: number;
    };
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

export type ApiPutTShirtSpecificationRequest = {
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
    bottom_width: SizeValue;
    sleeve_length: SizeValue;
    armhole: SizeValue;
    sleeve_opening: SizeValue;
    neck_rib_length: SizeValue;
    neck_opening: SizeValue;
    shoulder_to_shoulder: SizeValue;
    description: {
      description: string;
      file?: {
        name: string;
        key: string;
      };
    };
  };
  fabric?: {
    materials: {
      row_material: string;
      colourway: {
        color_name: string;
        color_code: string;
      };
      description: {
        description: string;
        file?: {
          name: string;
          key: string;
        };
      };
    }[];
    sub_materials: {
      row_material: string;
      colourway: {
        color_name: string;
        color_code: string;
      };
      description: {
        description: string;
        file?: {
          name: string;
          key: string;
        };
      };
    }[];
  };
  care_label?: {
    has_logo: boolean;
    default_logo: boolean;
    file?: {
      name: string;
      key: string;
    };
    description: {
      description: string;
      file?: {
        name: string;
        key: string;
      };
    };
  };
  tag?: {
    is_label: boolean;
    send_labels: boolean;
    is_custom: boolean;
    material?: string;
    color?: {
      color_name: string;
      color_code: string;
    };
    label_style?: string;
    label_width?: number;
    label_height?: number;
    description?: {
      description: string;
      file?: {
        name: string;
        key: string;
      };
    };
  };
  sample?: {
    sample: boolean;
    quantity?: {
      xxs: number;
      xs: number;
      s: number;
      m: number;
      l: number;
      xl: number;
      xxl: number;
    };
    can_send_sample?: boolean;
  };
  oem_points?: {
    description: string;
    file?: {
      name: string;
      key: string;
    };
  }[];
  main_production?: {
    quantity: {
      xxs: number;
      xs: number;
      s: number;
      m: number;
      l: number;
      xl: number;
      xxl: number;
    };
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

export type ApiPutTShirtSpecificationResponse = {
  specification_id: string;
};

export const TShirtEditSteps = [
  {order: 0, name: "", progress: "INITIAL"},
  {order: 1, name: "Basic Information", progress: "BASICINFORMATION"},
  {order: 2, name: "Fit", progress: "FIT"},
  {order: 3, name: "Fabric", progress: "FABRIC"},
  {order: 4, name: "Tag", progress: "TAG"},
  {order: 5, name: "Carelabel", progress: "CARELABEL"},
  {order: 6, name: "OEM Point", progress: "OEMPOINT"},
  {order: 7, name: "Sample", progress: "SAMPLE"},
  {order: 8, name: "Main Production", progress: "MAINPRODUCTION"},
  {order: 9, name: "Information", progress: "INFORMATION"},
  {order: 10, name: "", progress: "COMPLETE"}
]
