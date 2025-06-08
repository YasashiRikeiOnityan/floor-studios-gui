import { makeAutoObservable, runInAction } from "mobx";
import { SpecificationGroup } from "@/lib/type";
import { GetSpecificationGroupsInteractor } from "@/interactor/GetSpecificationGroupsInteractor";
import { PostSpecificationGroupsInteractor } from "@/interactor/PostSpecificationGroupsInteractor";
import { PutSpecificationGroupsSpecificationGroupId } from "@/interactor/PutSpecificationGroupsSpecificationGroupIdInteractor";
import { DeleteSpecificationGroupsSpecificationGroupId } from "@/interactor/DeleteSpecificationGroupsSpecificationGroupIdInteractor";

class SpecificationGroupsStore {
  specificationGroups: SpecificationGroup[] = [];
  isFetchedSpecificationGroups: boolean = false;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getSpecificationGroups() {
    if (this.isFetchedSpecificationGroups) {
      return;
    }
    const response = await GetSpecificationGroupsInteractor();
    runInAction(() => {
      this.specificationGroups = response;
      this.isFetchedSpecificationGroups = true;
    });
  }

  async postSpecificationGroups(specificationGroupName: string) {
    const response = await PostSpecificationGroupsInteractor({
      specification_group_name: specificationGroupName
    });
    if (!response) {
      return;
    }
    runInAction(() => {
      this.specificationGroups.push({
        specificationGroupId: response.specification_group_id,
        specificationGroupName: response.specification_group_name,
      });
    });
  }

  async putSpecificationGroupName(specificationGroupId: string, specificationGroupName: string) {
    const response = await PutSpecificationGroupsSpecificationGroupId(specificationGroupId, {
      specification_group_name: specificationGroupName
    });
    if (!response) {
      return;
    }
    runInAction(() => {
      const index = this.specificationGroups.findIndex(group => group.specificationGroupId === specificationGroupId);
      if (index !== -1) {
        this.specificationGroups[index].specificationGroupName = specificationGroupName;
      }
    });
  }

  async deleteSpecificationGroupName(specificationGroupId: string) {
    const response = await DeleteSpecificationGroupsSpecificationGroupId(specificationGroupId);
    if (!response) {
      return;
    }
    runInAction(() => {
      this.specificationGroups = this.specificationGroups.filter(group => group.specificationGroupId !== response.specification_group_id);
    });
  }

}

export const specificationGroupsStore = new SpecificationGroupsStore();
