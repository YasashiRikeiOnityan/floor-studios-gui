import { PostSpecificationsInteractor } from "@/interactor/PostSpecificationsInteractor";
import { action, makeAutoObservable } from "mobx";
import { Specification, SpecificationStatus } from "@/lib/type";
import { GetSpecificationsInteractor } from "@/interactor/GetSpecificationsInteractor";
import { DeleteSpecificationsSpecificationIdInteractor } from "@/interactor/DeleteSpecificationsSpecificationIdInteractor";

class SpecificationStore {
  constructor() {
    makeAutoObservable(this, {
      setCurrentSpecification: action,
      postSpecifications: action,
      deleteSpecificationsSpecificationsId: action,
      clear: action,
      getSpecifications: action,
    });
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

  async getSpecifications(specificationGroupId: string | undefined, status: SpecificationStatus) {
    this.loading = true;
    const response = await GetSpecificationsInteractor(specificationGroupId, status);
    response.sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    this.specifications = response;
    this.loading = false;
  }

  async postSpecifications(brandName: string, productName: string, productCode: string) {
    this.loading = true;
    // リクエストを送信
    const response = await PostSpecificationsInteractor(brandName, productName, productCode);
    // ストアにセットする
    this.setCurrentSpecification(response.specificationId, brandName, productName, productCode);
    this.loading = false;
  }

  async deleteSpecificationsSpecificationsId(specificationId: string) {
    this.loading = true;
    await DeleteSpecificationsSpecificationIdInteractor(specificationId);
    this.specifications = this.specifications.filter(spec => spec.specificationId !== specificationId);
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
