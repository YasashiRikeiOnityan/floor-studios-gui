import { makeAutoObservable, runInAction } from "mobx";
import { Tenant } from "@/lib/type";
import { GetTenantInteractor } from "@/interactor/GetTenantInteractor";
import { PutTenantInteractor } from "@/interactor/PutTenantInteractor";

class TenantStore {
  tenant: Tenant = {
    tenantId: "",
    tenantName: "",
    billingInfo: {
      name: "",
      address: "",
    },
  };
  isFetched: boolean = false;
  loading: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  async fetchTenant(): Promise<Tenant> {
    if (this.isFetched) {
      return this.tenant;
    }
    runInAction(() => {
      this.loading = true;
    });
    const response = await GetTenantInteractor();
    runInAction(() => {
      this.tenant = response;
      this.isFetched = true;
      this.loading = false;
    });
    return response;
  }

  async putTenant(tenant: Tenant) {
    runInAction(() => {
      this.loading = true;
    });
    const response = await PutTenantInteractor(tenant);
    runInAction(() => {
      this.tenant = response;
    });
    runInAction(() => {
      this.loading = false;
    });
  }
}

export const tenantStore = new TenantStore();
