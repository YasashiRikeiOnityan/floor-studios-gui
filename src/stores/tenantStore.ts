import { makeAutoObservable, runInAction } from "mobx";
import { Tenant, TenantSettingsTShirtFabric, TenantSettingsTShirtFit } from "@/lib/type";
import { GetTenantInteractor } from "@/interactor/GetTenantInteractor";
import { PutTenantInteractor } from "@/interactor/PutTenantInteractor";
import { GetTenantSettingsFitInteractor } from "@/interactor/GetTenantSettingsTShirtFitInteractor";
import { GetTenantSettingsTShirtFabricInteractor } from "@/interactor/GetTenantSettingsTShirtFabricInteractor";

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
  tenantSettingsTShirtFabric: TenantSettingsTShirtFabric = {
    materials: [],
    subMaterials: [],
    colourways: [],
  };
  isTenantFetched: boolean = false;
  isTenantSettingsTShirtFitFetched: boolean = false;
  isTenantSettingsTShirtFabricFetched: boolean = false;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchTenant() {
    if (this.isTenantFetched) {
      return this.tenant;
    }
    runInAction(() => {
      this.loading = true;
    });
    const response = await GetTenantInteractor();
    runInAction(() => {
      this.tenant = response;
      this.isTenantFetched = true;
      this.loading = false;
    });
  }

  async putTenant(tenant: Tenant) {
    runInAction(() => {
      this.loading = true;
    });
    await PutTenantInteractor(tenant);
    runInAction(() => {
      this.isTenantFetched = true;
      this.loading = false;
    });
  }

  async fetchTenantSettingsTShirtFit() {
    if (this.isTenantSettingsTShirtFitFetched) {
      return this.tenantSettingsTShirtFit;
    }
    runInAction(() => {
      this.loading = true;
    });
    const response = await GetTenantSettingsFitInteractor();
    runInAction(() => {
      this.tenantSettingsTShirtFit = response;
      this.isTenantSettingsTShirtFitFetched = true;
      this.loading = false;
    });
  }

  async fetchTenantSettingsTShirtFabric() {
    if (this.isTenantSettingsTShirtFabricFetched) {
      return this.tenantSettingsTShirtFabric;
    }
    runInAction(() => {
      this.loading = true;
    });
    const response = await GetTenantSettingsTShirtFabricInteractor();
    runInAction(() => {
      this.tenantSettingsTShirtFabric = response;
      this.isTenantSettingsTShirtFabricFetched = true;
      this.loading = false;
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
