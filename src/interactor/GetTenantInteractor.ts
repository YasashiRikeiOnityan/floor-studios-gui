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
    billingInformation: {
      addressLine1: tenant.billing_information?.address_line_1 || "",
      addressLine2: tenant.billing_information?.address_line_2 || "",
      zipCode: tenant.billing_information?.zip_code || "",
      state: tenant.billing_information?.state || "",
      city: tenant.billing_information?.city || "",
      country: tenant.billing_information?.country || "",
      companyName: tenant.billing_information?.company_name || "",
      firstName: tenant.billing_information?.first_name || "",
      lastName: tenant.billing_information?.last_name || "",
      phoneNumber: tenant.billing_information?.phone_number || "",
      email: tenant.billing_information?.email || "",
    },
    shippingInformation: {
      sameAsBillingInformation: tenant.shipping_information?.same_as_billing_information || false,
      addressLine1: tenant.shipping_information?.address_line_1 || "",
      addressLine2: tenant.shipping_information?.address_line_2 || "",
      zipCode: tenant.shipping_information?.zip_code || "",
      state: tenant.shipping_information?.state || "",
      city: tenant.shipping_information?.city || "",
      country: tenant.shipping_information?.country || "",
      companyName: tenant.shipping_information?.company_name || "",
      firstName: tenant.shipping_information?.first_name || "",
      lastName: tenant.shipping_information?.last_name || "",
      phoneNumber: tenant.shipping_information?.phone_number || "",
      email: tenant.shipping_information?.email || "",
    },
  };
};
