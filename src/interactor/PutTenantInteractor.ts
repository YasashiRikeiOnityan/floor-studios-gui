import { ApiPutTenant } from "@/lib/api";
import { ApiPutTenantRequest, Tenant } from "@/lib/type";
import { notificationStore } from "@/stores/notificationStore";

export const PutTenantInteractor = async (tenant: Tenant): Promise<void> => {
  try {
    await ApiPutTenant(mapTenantRequest(tenant));
    notificationStore.addNotification("Success", "Brand information updated successfully", "success");
  } catch {
    notificationStore.addNotification("Error", "Failed to update brand information", "error");
  }
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
    billing_information: {
      address_line_1: tenant.billingInformation.addressLine1,
      address_line_2: tenant.billingInformation.addressLine2,
      zip_code: tenant.billingInformation.zipCode,
      state: tenant.billingInformation.state,
      city: tenant.billingInformation.city,
      country: tenant.billingInformation.country,
      company_name: tenant.billingInformation.companyName,
      first_name: tenant.billingInformation.firstName,
      last_name: tenant.billingInformation.lastName,
      phone_number: tenant.billingInformation.phoneNumber,
      email: tenant.billingInformation.email,
    },
    shipping_information: {
      same_as_billing_information: tenant.shippingInformation.sameAsBillingInformation,
      address_line_1: tenant.shippingInformation.addressLine1,
      address_line_2: tenant.shippingInformation.addressLine2,
      zip_code: tenant.shippingInformation.zipCode,
      state: tenant.shippingInformation.state,
      city: tenant.shippingInformation.city,
      country: tenant.shippingInformation.country,
      company_name: tenant.shippingInformation.companyName,
      first_name: tenant.shippingInformation.firstName,
      last_name: tenant.shippingInformation.lastName,
      phone_number: tenant.shippingInformation.phoneNumber,
      email: tenant.shippingInformation.email,
    },
  };
};
