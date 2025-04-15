import { makeAutoObservable, runInAction } from "mobx";
import { GetSpecificationGroupsInteractor } from "@/interactor/GetSpecificationGroupsInteractor";
import { SpecificationGroup } from "@/lib/type";

class SpecificationGroupsStore {
  specificationGroups: SpecificationGroup[] = [];
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchSpecificationGroups() {
    runInAction(() => {
      this.loading = true;
    });
    const response = await GetSpecificationGroupsInteractor();
    runInAction(() => {
      this.specificationGroups = response;
    });
    runInAction(() => {
      this.loading = false;
    });
  }

}

export const specificationGroupsStore = new SpecificationGroupsStore();
