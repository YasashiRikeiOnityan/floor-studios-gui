import { PostSpecificationsInteractor } from "@/interactor/PostSpecificationsInteractor";
import { makeAutoObservable } from "mobx";
import { Specification } from "@/lib/type";
import { GetSpecificationsInteractor } from "@/interactor/GetSpecificationsInteractor";
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
  specifications: Specification[] = [];
  loading: boolean = false;

  setCurrentSpecification(specificationsId: string, brandName: string, productName: string, productCode: string) {
    this.currentSpecification = {
      specificationsId,
      brandName,
      productName,
      productCode,
    };
  }

  async getSpecifications(): Promise<Specification[]> {
    this.loading = true;
    const response = await GetSpecificationsInteractor();
    this.specifications = response;
    this.loading = false;
    return response;
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