import { ApiPutTenant } from "@/lib/api";
import { ApiPutTenantRequest, ApiPutTenantResponse, Tenant } from "@/lib/type";

export const PutTenantInteractor = async (tenant: Tenant): Promise<Tenant> => {
  const response = await ApiPutTenant(mapTenantRequest(tenant));
  return mapTenant(response);
};

const mapTenantRequest = (tenant: Tenant): ApiPutTenantRequest => {
  return {
    tenant_name: tenant.tenantName,
    billing_info: {
      name: tenant.billingInfo.name,
      address: tenant.billingInfo.address,
    },
  };
};

const mapTenant = (tenant: ApiPutTenantResponse): Tenant => {
  return {
    tenantId: tenant.tenant_id,
    tenantName: tenant.tenant_name,
    billingInfo: {
      name: tenant.billing_info.name,
      address: tenant.billing_info.address,
    },
  };
};