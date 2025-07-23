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
    shipping_information_sample: {
      same_as_billing_information: tenant.shippingInformationSample.sameAsBillingInformation,
      address_line_1: tenant.shippingInformationSample.addressLine1,
      address_line_2: tenant.shippingInformationSample.addressLine2,
      zip_code: tenant.shippingInformationSample.zipCode,
      state: tenant.shippingInformationSample.state,
      city: tenant.shippingInformationSample.city,
      country: tenant.shippingInformationSample.country,
      company_name: tenant.shippingInformationSample.companyName,
      first_name: tenant.shippingInformationSample.firstName,
      last_name: tenant.shippingInformationSample.lastName,
      phone_number: tenant.shippingInformationSample.phoneNumber,
      email: tenant.shippingInformationSample.email,
    },
    shipping_information_main_production: {
      same_as_shipping_information_sample: tenant.shippingInformationMainProduction.sameAsShippingInformationSample,
      address_line_1: tenant.shippingInformationMainProduction.addressLine1,
      address_line_2: tenant.shippingInformationMainProduction.addressLine2,
      zip_code: tenant.shippingInformationMainProduction.zipCode,
      state: tenant.shippingInformationMainProduction.state,
      city: tenant.shippingInformationMainProduction.city,
      country: tenant.shippingInformationMainProduction.country,
      company_name: tenant.shippingInformationMainProduction.companyName,
      first_name: tenant.shippingInformationMainProduction.firstName,
      last_name: tenant.shippingInformationMainProduction.lastName,
      phone_number: tenant.shippingInformationMainProduction.phoneNumber,
      email: tenant.shippingInformationMainProduction.email,
    },
  };
};
