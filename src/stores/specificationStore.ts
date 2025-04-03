import { PostSpecificationsInteractor } from "@/interactor/PostSpecificationsInteractor";
import { makeAutoObservable } from "mobx";

class SpecificationStore {
  constructor() {
    makeAutoObservable(this);
  }

  currentSpecification: {
    specificationsId: string;
    brandName: string;
    productName: string;
    productCode: string;
  } = {
    specificationsId: "",
    brandName: "",
    productName: "",
    productCode: "",
  };

  loading: boolean = false;

  setCurrentSpecification(specificationsId: string, brandName: string, productName: string, productCode: string) {
    this.currentSpecification = {
      specificationsId,
      brandName,
      productName,
      productCode,
    };
  }

  async postSpecifications(brandName: string, productName: string, productCode: string) {
    this.loading = true;
    // リクエストを送信
    const response = await PostSpecificationsInteractor(brandName, productName, productCode);
    // ストアにセットする
    this.setCurrentSpecification(response.specificationsId, brandName, productName, productCode);
    this.loading = false;
  }

  clear() {
    this.currentSpecification = {
      specificationsId: "",
      brandName: "",
      productName: "",
      productCode: "",
    };
  }

}

export const specificationStore = new SpecificationStore();