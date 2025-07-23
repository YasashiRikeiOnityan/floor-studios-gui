import {
    SpecificationStatus,
    SpecificationType,
    BaseSpecification,
  } from "@/lib/type/specification/type";
  
  export type CustomSpecification = BaseSpecification & {
    type: SpecificationType;
    fit?: CustomFit;
    fabric?: CustomFabric;
    tag?: CustomTag;
    careLabel?: CustomCareLabel;
    oemPoints?: CustomOemPoints;
    sample?: CustomSample;
    mainProduction?: CustomMainProduction;
    information?: CustomInformation;
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
  
  export type CustomSizeValue = {
    free: string;
    xs: string;
    s: string;
    m: string;
    l: string;
    xl: string;
  }
  
  export type CustomFitData = {
    [key: string]: CustomSizeValue;
  }
  
  export type CustomFit = CustomFitData & {
    file?: {
      name: string;
      key: string;
    };
  }
  
  export type CustomFabric = {
    materials: string[];
    subMaterials: string[];
    description: Description;
  };
  
  export type CustomTag = {
    description: Description;
  };
  
  export type CustomCareLabel = {
    description: Description;
  };
  
  
  export type CustomOemPoints = Description[];
  
  export type CustomSample = {
    isSample: boolean;
    quantity: CustomSizeValue;
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
  
  export type CustomMainProduction = {
    quantity: CustomSizeValue;
    deliveryDate?: string;
  };
  
  export type CustomInformation = {
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
  
  export type ApiGetCustomSpecificationResponse = {
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
    fit?: CustomFit;
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
      quantity: CustomSizeValue;
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
      quantity: CustomSizeValue;
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
  
  export type ApiPutCustomSpecificationRequest = {
    brand_name?: string;
    product_name?: string;
    product_code?: string;
    status?: SpecificationStatus;
    specification_group_id?: string;
    type?: SpecificationType;
    progress?: string;
    fit?: CustomFit;
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
      quantity: CustomSizeValue;
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
      quantity: CustomSizeValue;
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
  
  export type ApiPutCustomSpecificationResponse = {
    specification_id: string;
  };
  
  export const CustomEditSteps = [
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