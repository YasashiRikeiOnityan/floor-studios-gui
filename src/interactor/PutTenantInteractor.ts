import { ApiPutTenant } from "@/lib/api";
import { ApiPutTenantRequest, ApiPutTenantResponse, Tenant } from "@/lib/type";

export const PutTenantInteractor = async (tenant: Tenant): Promise<Tenant> => {
  const response = await ApiPutTenant(mapTenantRequest(tenant));
  return mapTenant(response);
};

const mapTenantRequest = (tenant: Tenant): ApiPutTenantRequest => {
  return {
    tenant_name: tenant.tenantName,
    contact: {
      first_name: tenant.contact.firstName,
      last_name: tenant.contact.lastName,
      phone_number: tenant.contact.phoneNumber,
      email: tenant.contact.email,
    },
    billing_address: {
      address_line_1: tenant.billingAddress.addressLine1,
      address_line_2: tenant.billingAddress.addressLine2,
      zip_code: tenant.billingAddress.zipCode,
      state: tenant.billingAddress.state,
      city: tenant.billingAddress.city,
      country: tenant.billingAddress.country,
    },
    shipping_address: {
      same_as_billing_address: tenant.shippingAddress.sameAsBillingAddress,
      address_line_1: tenant.shippingAddress.addressLine1,
      address_line_2: tenant.shippingAddress.addressLine2,
      zip_code: tenant.shippingAddress.zipCode,
      state: tenant.shippingAddress.state,
      city: tenant.shippingAddress.city,
      country: tenant.shippingAddress.country,
    },
  };
};

const mapTenant = (tenant: ApiPutTenantResponse): Tenant => {
  return {
    tenantId: tenant.tenant_id,
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