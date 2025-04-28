import { ApiGetTenant } from "@/lib/api";
import { ApiGetTenantResponse, Tenant } from "@/lib/type";

export const GetTenantInteractor = async (): Promise<Tenant> => {
  const tenant = await ApiGetTenant();
  return mapTenant(tenant);
};

const mapTenant = (tenant: ApiGetTenantResponse): Tenant => {
  return {
    tenantName: tenant.tenant_name,
    contact: {
      firstName: tenant.contact?.first_name || "",
      lastName: tenant.contact?.last_name || "",
      phoneNumber: tenant.contact?.phone_number || "",
      email: tenant.contact?.email || "",
    },
    billingAddress: {
      addressLine1: tenant.billing_address?.address_line_1 || "",
      addressLine2: tenant.billing_address?.address_line_2 || "",
      zipCode: tenant.billing_address?.zip_code || "",
      state: tenant.billing_address?.state || "",
      city: tenant.billing_address?.city || "",
      country: tenant.billing_address?.country || "",
    },
    shippingAddress: {
      sameAsBillingAddress: tenant.shipping_address?.same_as_billing_address || false,
      addressLine1: tenant.shipping_address?.address_line_1 || "",
      addressLine2: tenant.shipping_address?.address_line_2 || "",
      zipCode: tenant.shipping_address?.zip_code || "",
      state: tenant.shipping_address?.state || "",
      city: tenant.shipping_address?.city || "",
      country: tenant.shipping_address?.country || "",
    },
  };
};
