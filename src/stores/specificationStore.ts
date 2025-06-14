import { PostSpecificationsInteractor } from "@/interactor/PostSpecificationsInteractor";
import { action, makeAutoObservable, runInAction } from "mobx";
import { ApiPutSpecificationsSpecificationIdRequest, SpecificationStatus } from "@/lib/type";
import { Specification } from "@/lib/type/specification/type";
import { GetSpecificationsInteractor } from "@/interactor/GetSpecificationsInteractor";
import { DeleteSpecificationsSpecificationIdInteractor } from "@/interactor/DeleteSpecificationsSpecificationIdInteractor";
import { GetSpecificationsSpecificationIdDownloadInteractor } from "@/interactor/GetSpecificationsSpecificationIdDownload";
import { GetSpecificationsSpecificationIdInteractor } from "@/interactor/GetSpecificationsSpecificationIdInteractor";
import { PutSpecificationsSpecificationIdInteractor } from "@/interactor/PutSpecificationsSpecificationIdInteractor";
import { ApiPutTShirtSpecificationRequest } from "@/lib/type/specification/t-shirt/type";

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

  currentSpecification: Specification | undefined = undefined;
  specifications: Specification[] = [];
  loading: boolean = false;

  setCurrentSpecification(specification: Specification) {
    this.currentSpecification = specification;
  }

  async getSpecifications(specificationGroupId: string, status: SpecificationStatus) {
    const response = await GetSpecificationsInteractor(specificationGroupId, status);
    response.sort((a, b) => {
      return new Date(b.updatedAt || "").getTime() - new Date(a.updatedAt || "").getTime();
    });
    runInAction(() => {
      this.specifications = response;
    });
  }

  async postSpecifications(brandName: string, productName: string, productCode: string, specificationGroupId: string) {
    this.loading = true;
    // リクエストを送信
    const response = await PostSpecificationsInteractor(brandName, productName, productCode, specificationGroupId);
    // ストアにセットする
    this.setCurrentSpecification({
      specificationId: response.specificationId,
      brandName: brandName,
      productName: productName,
      productCode: productCode,
      specificationGroupId: specificationGroupId,
    });
    this.loading = false;
    return response.specificationId;
  }

  async getSpecificationsSpecificationId(specificationId: string) {
    this.loading = true;
    const response = await GetSpecificationsSpecificationIdInteractor(specificationId);
    if (!response) {
      this.loading = false;
      return;
    }
    runInAction(() => {
      this.currentSpecification = response;
      this.loading = false;
    });
  }

  async putSpecificationsSpecificationId(specificationId: string, data: ApiPutTShirtSpecificationRequest) {
    const response = await PutSpecificationsSpecificationIdInteractor(specificationId, data);
    if (!response) {
      return;
    }
  }

  async deleteSpecificationsSpecificationsId(specificationId: string) {
    await DeleteSpecificationsSpecificationIdInteractor(specificationId);
    this.specifications = this.specifications.filter(spec => spec.specificationId !== specificationId);
  }

  async getSpecificationsSpecificationIdDownload(specificationId: string) {
    const response = await GetSpecificationsSpecificationIdDownloadInteractor(specificationId);
    return response.url;
  }

  updateSpecification(specification: Partial<Specification>) {
    if (this.currentSpecification) {
      this.currentSpecification = {
        ...this.currentSpecification,
        ...specification,
      };
    }
  }

  clear() {
    this.currentSpecification = undefined;
  }
}

export const specificationStore = new SpecificationStore();
