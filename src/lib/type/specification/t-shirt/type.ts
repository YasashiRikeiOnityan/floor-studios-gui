import { 
  SpecificationStatus,
  SpecificationType,
  SizeValue,
  Description
} from "@/lib/type/specification/type";

export type TShirtSpecification = {
  fit?: TShirtFit;
  fabric?: TShirtFabric;
  tag?: TShirtTag;
  sample?: TShirtSample;
  mainProduction?: TShirtMainProduction;
};

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
  materials: {
    rowMaterial: string;
    thickness: string;
    colourway: {
      pantone: string;
      hex: string;
    };
    description: {
      description: string;
      file?: {
        name: string;
        key: string;
      };
    };
  }[];
  subMaterials: {
    rowMaterial: string;
    colourway: {
      pantone: string;
      hex: string;
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

export type TShirtTag = {
  isLabel: boolean;
  material?: string;
  color?: {
    title: string;
    hex: string;
  },
  sendLabels: boolean;
  labelStyle?: string;
  description?: Description;
}

export type TShirtSample = {
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
  canSendSample?: boolean;
};

export type TShirtMainProduction = {
  quantity: {
    xxs: number;
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  };
  deliveryDate: string;
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
      thickness: string;
      colourway: {
        pantone: string;
        hex: string;
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
        pantone: string;
        hex: string;
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
    material?: string;
    color?: {
      title: string;
      hex: string;
    };
    send_labels: boolean;
    label_style?: string;
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
    oem_point: string;
    file?: {
      name: string;
      content: string;
      type: string;
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
    delivery_date: string;
  };
  information?: {
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
      thickness: string;
      colourway: {
        pantone: string;
        hex: string;
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
        pantone: string;
        hex: string;
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
    material?: string;
    color?: {
      title: string;
      hex: string;
    };
    send_labels: boolean;
    label_style?: string;
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
    oem_point: string;
    file?: {
      name: string;
      content: string;
      type: string;
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
    delivery_date: string;
  };
  information?: {
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
  };
};

export type ApiPutTShirtSpecificationResponse = {
  specification_id: string;
};

export const TShirtEditSteps = [
  {order: 0, name: "", progress: "INITIAL"},
  {order: 1, name: "Type", progress: "TYPE"},
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

