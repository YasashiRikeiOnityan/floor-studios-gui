import { makeAutoObservable, runInAction } from "mobx";
import { GetSpecificationGroupsInteractor } from "@/interactor/GetSpecificationGroupsInteractor";
import { SpecificationGroup } from "@/lib/type";
import { PostSpecificationGroupsInteractor } from "@/interactor/PostSpecificationGroupsInteractor";
import { notificationStore } from "./notificationStore";

class SpecificationGroupsStore {
  specificationGroups: SpecificationGroup[] = [];
  ifFetched: boolean = false;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchSpecificationGroups() {
    if (this.ifFetched) {
      return;
    }
    runInAction(() => {
      this.loading = true;
    });
    const response = await GetSpecificationGroupsInteractor();
    runInAction(() => {
      this.specificationGroups = response;
      this.ifFetched = true;
      this.loading = false;
    });
  }

  async postSpecificationGroups(specificationGroupName: string) {
    runInAction(() => {
      this.loading = true;
    });
    try {
      const response = await PostSpecificationGroupsInteractor({
        specification_group_name: specificationGroupName 
      });
      notificationStore.openNotification("Success", "Specification group created successfully", "success");
      runInAction(() => {
        this.specificationGroups.push({
          specificationGroupId: response.specification_group_id,
          specificationGroupName: specificationGroupName,
        });
        this.loading = false;
      });
    } catch {
      notificationStore.openNotification("Error", "Failed to create specification group", "error");
      runInAction(() => {
        this.loading = false;
      });
    }
  }

}

export const specificationGroupsStore = new SpecificationGroupsStore();
