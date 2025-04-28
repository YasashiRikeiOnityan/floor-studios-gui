import { makeAutoObservable, runInAction } from "mobx";
import { Tenant, TenantSettingsTShirtFit } from "@/lib/type";
import { GetTenantInteractor } from "@/interactor/GetTenantInteractor";
import { PutTenantInteractor } from "@/interactor/PutTenantInteractor";
import { GetTenantSettingsFitInteractor } from "@/interactor/GetTenantSettingsFitInteractor";
class TenantStore {
  tenant: Tenant = {
    tenantName: "",
    contact: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    },
    billingAddress: {
      addressLine1: "",
      addressLine2: "",
      zipCode: "",
      state: "",
      city: "",
      country: "",
    },
    shippingAddress: {
      sameAsBillingAddress: false,
      addressLine1: "",
      addressLine2: "",
      zipCode: "",
      state: "",
      city: "",
      country: "",
    },
  };
  tenantSettingsTShirtFit: TenantSettingsTShirtFit = {
    fits: [],
  };
  isFetched: boolean = false;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchTenant() {
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
  }

  async putTenant(tenant: Tenant) {
    runInAction(() => {
      this.loading = true;
    });
    const response = await PutTenantInteractor(tenant);
    runInAction(() => {
      this.tenant = response;
      this.isFetched = true;
      this.loading = false;
    });
  }

  async fetchTenantSettingsFit() {
    const response = await GetTenantSettingsFitInteractor();
    runInAction(() => {
      this.tenantSettingsTShirtFit = response;
    });
  }

  clear() {
    this.tenant = {
      tenantName: "",
      contact: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
      },
      billingAddress: {
        addressLine1: "",
        addressLine2: "",
        zipCode: "",
        state: "",
        city: "",
        country: "",
      },
      shippingAddress: {
        sameAsBillingAddress: false,
        addressLine1: "",
        addressLine2: "",
        zipCode: "",
        state: "",
        city: "",
        country: "",
      },
    };
    this.loading = false;
  }
}

export const tenantStore = new TenantStore();
