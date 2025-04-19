import { makeAutoObservable, runInAction } from "mobx";
import { GetSpecificationGroupsInteractor } from "@/interactor/GetSpecificationGroupsInteractor";
import { SpecificationGroup } from "@/lib/type";

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

}

export const specificationGroupsStore = new SpecificationGroupsStore();
