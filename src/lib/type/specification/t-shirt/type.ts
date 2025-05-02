import { 
  SpecificationStatus,
  SpecificationType,
  SizeValue
} from "@/lib/type/specification/type";

export type TShirtSpecification = {
  specificationId: string;
  brandName: string;
  productName: string;
  productCode: string;
  updatedBy: {
    userId: string;
    userName: string;
  };
  updatedAt: string;
  status: SpecificationStatus;
  specificationGroupId: string;
  type: "T-SHIRT";
  progress: string;
  fit?: TShirtFit;
  fabric?: TShirtFabric;
  mainProduction?: TShirtMainProduction;
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
};

export type TShirtFabric = {
  materials: {
    rowMaterial: string;
    thickness: string;
    colourway: {
      pantone: string;
      hex: string;
    };
    description: string;
  }[];
  subMaterials: {
    rowMaterial: string;
    colourway: {
      pantone: string;
      hex: string;
    };
    description: string;
  }[];
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

export type TShirtInformation = {
  description: string;
  notes: string;
  tags: string[];
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
  };
  fabric?: {
    materials: {
      row_material: string;
      thickness: string;
      colourway: {
        pantone: string;
        hex: string;
      };
      description: string;
    }[];
    sub_materials: {
      row_material: string;
      colourway: {
        pantone: string;
        hex: string;
      };
      description: string;
    }[];
  };
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
  };
  fabric?: {
    materials: {
      row_material: string;
      thickness: string;
      colourway: {
        pantone: string;
        hex: string;
      };
      description: string;
    }[];
    sub_materials: {
      row_material: string;
      colourway: {
        pantone: string;
        hex: string;
      };
      description: string;
    }[];
  };
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


