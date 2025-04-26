import { PostSpecificationsInteractor } from "@/interactor/PostSpecificationsInteractor";
import { action, makeAutoObservable } from "mobx";
import { ApiPutSpecificationsSpecificationIdRequest, Specification, SpecificationStatus } from "@/lib/type";
import { GetSpecificationsInteractor } from "@/interactor/GetSpecificationsInteractor";
import { DeleteSpecificationsSpecificationIdInteractor } from "@/interactor/DeleteSpecificationsSpecificationIdInteractor";
import { GetSpecificationsSpecificationIdDownloadInteractor } from "@/interactor/GetSpecificationsSpecificationIdDownload";
import { GetSpecificationsSpecificationIdInteractor } from "@/interactor/GetSpecificationsSpecificationIdInteractor";
import { PutSpecificationsSpecificationIdInteractor } from "@/interactor/PutSpecificationsSpecificationIdInteractor";

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

  currentSpecification: Specification = {
    specificationId: "",
    tenantIdStatus: "",
    brandName: "",
    productName: "",
    productCode: "",
    updatedBy: {
      userId: "",
      userName: "",
    },
    updatedAt: "",
    status: undefined,
    progress: "INITIAL",
    specificationGroupId: "",
    type: "",
    details: {},
  }
  specifications: Specification[] = [];
  loading: boolean = false;

  setCurrentSpecification(specification: Specification) {
    this.currentSpecification = specification;
  }

  async getSpecifications(specificationGroupId: string, status: SpecificationStatus) {
    this.loading = true;
    const response = await GetSpecificationsInteractor(specificationGroupId, status);
    response.sort((a, b) => {
      return new Date(b.updatedAt || "").getTime() - new Date(a.updatedAt || "").getTime();
    });
    this.specifications = response;
    this.loading = false;
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
    this.setCurrentSpecification(response);
    this.loading = false;
  }

  async putSpecification(specification: ApiPutSpecificationsSpecificationIdRequest) {
    this.loading = true;
    await PutSpecificationsSpecificationIdInteractor(this.currentSpecification.specificationId, specification);
    this.loading = false;
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
    this.currentSpecification = {
      ...this.currentSpecification,
      ...specification,
    };
  }

  clear() {
    this.currentSpecification = {
      specificationId: "",
      tenantIdStatus: "",
      brandName: "",
      productName: "",
      productCode: "",
      specificationGroupId: "",
      updatedBy: {
        userId: "",
        userName: "",
      },
      updatedAt: "",
      status: undefined,
      progress: "INITIAL",
      type: "",
      details: {},
    };
  }

}

export const specificationStore = new SpecificationStore();
