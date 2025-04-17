import { ApiGetTenant } from "@/lib/api";
import { ApiGetTenantResponse, Tenant } from "@/lib/type";

export const GetTenantInteractor = async (): Promise<Tenant> => {
  const tenant = await ApiGetTenant();
  return mapTenant(tenant);
};

const mapTenant = (tenant: ApiGetTenantResponse): Tenant => {
  return {
    tenantId: tenant.tenant_id,
    tenantName: tenant.tenant_name,
    billingInfo: {
      name: tenant.billing_info.name,
      address: tenant.billing_info.address,
    },
  };
};
