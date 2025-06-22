import { makeAutoObservable, runInAction } from "mobx";
import { Specification, ApiPostSpecificationsRequest, Specifications, SpecificationStatus } from "@/lib/type/specification/type";
import { GetSpecificationsInteractor } from "@/interactor/specifications/get";
import { PostSpecificationsInteractor } from "@/interactor/specifications/post";
import { GetSpecificationsSpecificationIdInteractor } from "@/interactor/specificationsSpecificationId/get";
import { PutSpecificationsSpecificationIdInteractor } from "@/interactor/specificationsSpecificationId/put";
import { DeleteSpecificationsSpecificationIdInteractor } from "@/interactor/specificationsSpecificationId/delete";
import { GetSpecificationsSpecificationIdDownloadInteractor } from "@/interactor/GetSpecificationsSpecificationIdDownload";
import { GetSpecificationsSpecificationIdPreviewInteractor } from "@/interactor/GetSpecificationsSpecificationIdPreview";
import { ApiPutTShirtSpecificationRequest } from "@/lib/type/specification/t-shirt/type";

class SpecificationStore {

  constructor() {
    makeAutoObservable(this);
  }

  currentSpecification: Specification | undefined = undefined;
  specifications: Specifications = [];

  async getSpecifications(specificationGroupId: string, status: SpecificationStatus) {
    const response = await GetSpecificationsInteractor(specificationGroupId, status);
    if (!response) {
      return;
    }
    runInAction(() => {
      this.specifications = response;
    });
  }

  async postSpecifications(specification: ApiPostSpecificationsRequest) {
    const response = await PostSpecificationsInteractor(specification);
    if (!response) {
      return;
    }
    runInAction(() => {
      this.currentSpecification = {
        specificationId: response.specification_id,
        brandName: specification.brand_name,
        productName: specification.product_name,
        productCode: specification.product_code,
        specificationGroupId: specification.specification_group_id,
        type: specification.type,
        status: specification.status,
        progress: specification.progress,
      };
    });
    return response.specification_id;
  }

  async getSpecificationsSpecificationId(specificationId: string) {
    const response = await GetSpecificationsSpecificationIdInteractor(specificationId);
    if (!response) {
      return;
    }
    runInAction(() => {
      this.currentSpecification = response;
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
    this.specifications = this.specifications.filter(spec => {
      return spec.specificationId !== specificationId;
    });
  }

  async getSpecificationsSpecificationIdDownload(specificationId: string) {
    const response = await GetSpecificationsSpecificationIdDownloadInteractor(specificationId);
    return response.url;
  }

  async getSpecificationsSpecificationIdPreview(specificationId: string) {
    const response = await GetSpecificationsSpecificationIdPreviewInteractor(specificationId);
    return response.url;
  }

  updateSpecification(specification: Partial<Specification>) {
    this.currentSpecification = {
      ...this.currentSpecification,
      ...specification,
    } as Specification;
  }

  clear() {
    this.currentSpecification = undefined;
    this.specifications = [];
  }
}

export const specificationStore = new SpecificationStore();
