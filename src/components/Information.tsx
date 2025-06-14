import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { tenantStore } from "@/stores/tenantStore";
import Button from "./Button";
import { specificationStore } from "@/stores/specificationStore";
import { useRouter } from "next/navigation";
import { dialogStore } from "@/stores/dialogStore";

type InformationProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
};

const Information = observer((props: InformationProps) => {
  const router = useRouter();

  const [contactFirstName, setContactFirstName] = useState(specificationStore.currentSpecification?.information?.contact?.firstName || tenantStore.tenant.contact.firstName || "");
  const [contactLastName, setContactLastName] = useState(specificationStore.currentSpecification?.information?.contact?.lastName || tenantStore.tenant.contact.lastName || "");
  const [contactPhoneNumber, setContactPhoneNumber] = useState(specificationStore.currentSpecification?.information?.contact?.phoneNumber || tenantStore.tenant.contact.phoneNumber || "");
  const [contactEmail, setContactEmail] = useState(specificationStore.currentSpecification?.information?.contact?.email || tenantStore.tenant.contact.email || "");
  const [billingAddressLine1, setBillingAddressLine1] = useState(specificationStore.currentSpecification?.information?.billingAddress?.addressLine1 || tenantStore.tenant.billingAddress.addressLine1 || "");
  const [billingAddressLine2, setBillingAddressLine2] = useState(specificationStore.currentSpecification?.information?.billingAddress?.addressLine2 || tenantStore.tenant.billingAddress.addressLine2 || "");
  const [billingZipCode, setBillingZipCode] = useState(specificationStore.currentSpecification?.information?.billingAddress?.zipCode || tenantStore.tenant.billingAddress.zipCode || "");
  const [billingState, setBillingState] = useState(specificationStore.currentSpecification?.information?.billingAddress?.state || tenantStore.tenant.billingAddress.state || "");
  const [billingCity, setBillingCity] = useState(specificationStore.currentSpecification?.information?.billingAddress?.city || tenantStore.tenant.billingAddress.city || "");
  const [billingCountry, setBillingCountry] = useState(specificationStore.currentSpecification?.information?.billingAddress?.country || tenantStore.tenant.billingAddress.country || "");
  const [shippingAddressLine1, setShippingAddressLine1] = useState(specificationStore.currentSpecification?.information?.shippingAddress?.addressLine1 || tenantStore.tenant.shippingAddress.addressLine1 || "");
  const [shippingAddressLine2, setShippingAddressLine2] = useState(specificationStore.currentSpecification?.information?.shippingAddress?.addressLine2 || tenantStore.tenant.shippingAddress.addressLine2 || "");
  const [shippingZipCode, setShippingZipCode] = useState(specificationStore.currentSpecification?.information?.shippingAddress?.zipCode || tenantStore.tenant.shippingAddress.zipCode || "");
  const [shippingState, setShippingState] = useState(specificationStore.currentSpecification?.information?.shippingAddress?.state || tenantStore.tenant.shippingAddress.state || "");
  const [shippingCity, setShippingCity] = useState(specificationStore.currentSpecification?.information?.shippingAddress?.city || tenantStore.tenant.shippingAddress.city || "");
  const [shippingCountry, setShippingCountry] = useState(specificationStore.currentSpecification?.information?.shippingAddress?.country || tenantStore.tenant.shippingAddress.country || "");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchTenant = async () => {
      if (mounted) {
        await tenantStore.fetchTenant();
        setContactFirstName(specificationStore.currentSpecification?.information?.contact?.firstName || tenantStore.tenant.contact.firstName || "");
        setContactLastName(specificationStore.currentSpecification?.information?.contact?.lastName || tenantStore.tenant.contact.lastName || "");
        setContactPhoneNumber(specificationStore.currentSpecification?.information?.contact?.phoneNumber || tenantStore.tenant.contact.phoneNumber || "");
        setContactEmail(specificationStore.currentSpecification?.information?.contact?.email || tenantStore.tenant.contact.email || "");
        setBillingAddressLine1(specificationStore.currentSpecification?.information?.billingAddress?.addressLine1 || tenantStore.tenant.billingAddress.addressLine1 || "");
        setBillingAddressLine2(specificationStore.currentSpecification?.information?.billingAddress?.addressLine2 || tenantStore.tenant.billingAddress.addressLine2 || "");
        setBillingZipCode(specificationStore.currentSpecification?.information?.billingAddress?.zipCode || tenantStore.tenant.billingAddress.zipCode || "");
        setBillingState(specificationStore.currentSpecification?.information?.billingAddress?.state || tenantStore.tenant.billingAddress.state || "");
        setBillingCity(specificationStore.currentSpecification?.information?.billingAddress?.city || tenantStore.tenant.billingAddress.city || "");
        setBillingCountry(specificationStore.currentSpecification?.information?.billingAddress?.country || tenantStore.tenant.billingAddress.country || "");
        setShippingAddressLine1(specificationStore.currentSpecification?.information?.shippingAddress?.addressLine1 || tenantStore.tenant.shippingAddress.addressLine1 || "");
        setShippingAddressLine2(specificationStore.currentSpecification?.information?.shippingAddress?.addressLine2 || tenantStore.tenant.shippingAddress.addressLine2 || "");
        setShippingZipCode(specificationStore.currentSpecification?.information?.shippingAddress?.zipCode || tenantStore.tenant.shippingAddress.zipCode || "");
        setShippingState(specificationStore.currentSpecification?.information?.shippingAddress?.state || tenantStore.tenant.shippingAddress.state || "");
        setShippingCity(specificationStore.currentSpecification?.information?.shippingAddress?.city || tenantStore.tenant.shippingAddress.city || "");
        setShippingCountry(specificationStore.currentSpecification?.information?.shippingAddress?.country || tenantStore.tenant.shippingAddress.country || "");
      }
    };
    fetchTenant();
  }, [mounted]);

  const handleSaveAndNext = () => {
    specificationStore.putSpecificationsSpecificationId(specificationStore.currentSpecification?.specificationId || "", {
      ...(props.isUpdateProgress && { progress: "COMPLETE" }),
      ...(props.isUpdateProgress && { status: "COMPLETE" }),
      information: {
        contact: {
          first_name: contactFirstName,
          last_name: contactLastName,
          phone_number: contactPhoneNumber,
          email: contactEmail,
        },
        billing_address: {
          address_line_1: billingAddressLine1,
          address_line_2: billingAddressLine2,
          zip_code: billingZipCode,
          state: billingState,
          city: billingCity,
          country: billingCountry,
        },
        shipping_address: {
          same_as_billing_address: true,
          address_line_1: shippingAddressLine1,
          address_line_2: shippingAddressLine2,
          zip_code: shippingZipCode,
          state: shippingState,
          city: shippingCity,
          country: shippingCountry,
        }
      }
    });
    specificationStore.updateSpecification({
      ...specificationStore.currentSpecification,
      information: {
        contact: {
          firstName: contactFirstName,
          lastName: contactLastName,
          phoneNumber: contactPhoneNumber,
          email: contactEmail,
        },
        billingAddress: {
          addressLine1: billingAddressLine1,
          addressLine2: billingAddressLine2,
          zipCode: billingZipCode,
          state: billingState,
          city: billingCity,
          country: billingCountry,
        },
        shippingAddress: {
          addressLine1: shippingAddressLine1,
          addressLine2: shippingAddressLine2,
          zipCode: shippingZipCode,
          state: shippingState,
          city: shippingCity,
          country: shippingCountry,
        },
      }
    });
    // 成功ダイアログを表示
    dialogStore.openSuccessDialog(
      "Complete",
      "Specification has been created.",
      "OK",
      () => {
        dialogStore.closeSuccessDialog();
        router.push(`/orders?status=COMPLETE&collection=${specificationStore.currentSpecification?.specificationGroupId || 'NO_GROUP'}`);
      }
    );
  }

  const handleCancel = () => {
    setContactFirstName(tenantStore.tenant.contact.firstName || "");
    setContactLastName(tenantStore.tenant.contact.lastName || "");
    setContactPhoneNumber(tenantStore.tenant.contact.phoneNumber || "");
    setContactEmail(tenantStore.tenant.contact.email || "");
    setBillingAddressLine1(tenantStore.tenant.billingAddress.addressLine1 || "");
    setBillingAddressLine2(tenantStore.tenant.billingAddress.addressLine2 || "");
    setBillingZipCode(tenantStore.tenant.billingAddress.zipCode || "");
    setBillingState(tenantStore.tenant.billingAddress.state || "");
    setBillingCity(tenantStore.tenant.billingAddress.city || "");
    setBillingCountry(tenantStore.tenant.billingAddress.country || "");
    setShippingAddressLine1(tenantStore.tenant.shippingAddress.addressLine1 || "");
    setShippingAddressLine2(tenantStore.tenant.shippingAddress.addressLine2 || "");
    setShippingZipCode(tenantStore.tenant.shippingAddress.zipCode || "");
    setShippingState(tenantStore.tenant.shippingAddress.state || "");
    setShippingCity(tenantStore.tenant.shippingAddress.city || "");
    setShippingCountry(tenantStore.tenant.shippingAddress.country || "");
  }

  return (
    <>
      <p className="text-sm text-gray-500">
        {specificationStore.currentSpecification?.productCode} - {specificationStore.currentSpecification?.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Confirm your information</h1>
      <dl className="divide-y divide-gray-100">
        <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm/6 font-semibold text-gray-900">Contact</dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="firstName"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Floor"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={contactFirstName}
                  onChange={(e) => setContactFirstName(e.target.value)}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="firstName"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Studios"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={contactLastName}
                  onChange={(e) => setContactLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="phoneNumber"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  placeholder="+81 90-1234-5678"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={contactPhoneNumber}
                  onChange={(e) => setContactPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="floor@floorstudios.com"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
            </div>
          </dd>
        </div>
        <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm/6 font-semibold text-gray-900">Billing Address</dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="billingCountry"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Country
                </label>
                <input
                  id="billingCountry"
                  name="billingCountry"
                  type="text"
                  placeholder="Japan"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={billingCountry}
                  onChange={(e) => setBillingCountry(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="billingState"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  State
                </label>
                <input
                  id="billingState"
                  name="billingState"
                  type="text"
                  placeholder="Tokyo"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={billingState}
                  onChange={(e) => setBillingState(e.target.value)}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="billingCity"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  City
                </label>
                <input
                  id="billingCity"
                  name="billingCity"
                  type="text"
                  placeholder="Tokyo"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={billingCity}
                  onChange={(e) => setBillingCity(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 col-span-2">
              <div className="relative">
                <label
                  htmlFor="billingAddressLine1"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Address Line 1
                </label>
                <input
                  id="billingAddressLine1"
                  name="billingAddressLine1"
                  type="text"
                  placeholder="Floor Studios"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={billingAddressLine1}
                  onChange={(e) => setBillingAddressLine1(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 col-span-2">
              <div className="relative">
                <label
                  htmlFor="billingAddressLine2"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Address Line 2
                </label>
                <input
                  id="billingAddressLine2"
                  name="billingAddressLine2"
                  type="text"
                  placeholder="Floor Studios"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={billingAddressLine2}
                  onChange={(e) => setBillingAddressLine2(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="billingZipCode"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Zip Code
                </label>
                <input
                  id="billingZipCode"
                  name="billingZipCode"
                  type="text"
                  placeholder="123-4567"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={billingZipCode}
                  onChange={(e) => setBillingZipCode(e.target.value)}
                />
              </div>
            </div>
          </dd>
        </div>
        <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm/6 font-semibold text-gray-900">Shipping Address</dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="shippingCountry"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Country
                </label>
                <input
                  id="shippingCountry"
                  name="shippingCountry"
                  type="text"
                  placeholder="Japan"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={shippingCountry}
                  onChange={(e) => setShippingCountry(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="shippingState"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  State
                </label>
                <input
                  id="shippingState"
                  name="shippingState"
                  type="text"
                  placeholder="Tokyo"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={shippingState}
                  onChange={(e) => setShippingState(e.target.value)}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="shippingCity"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  City
                </label>
                <input
                  id="shippingCity"
                  name="shippingCity"
                  type="text"
                  placeholder="Tokyo"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={shippingCity}
                  onChange={(e) => setShippingCity(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 col-span-2">
              <div className="relative">
                <label
                  htmlFor="shippingAddressLine1"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Address Line 1
                </label>
                <input
                  id="shippingAddressLine1"
                  name="shippingAddressLine1"
                  type="text"
                  placeholder="Floor Studios"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={shippingAddressLine1}
                  onChange={(e) => setShippingAddressLine1(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 col-span-2">
              <div className="relative">
                <label
                  htmlFor="shippingAddressLine2"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Address Line 2
                </label>
                <input
                  id="shippingAddressLine2"
                  name="shippingAddressLine2"
                  type="text"
                  placeholder="Floor Studios"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={shippingAddressLine2}
                  onChange={(e) => setShippingAddressLine2(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="zipCode"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Zip Code
                </label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  placeholder="123-4567"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={shippingZipCode}
                  onChange={(e) => setShippingZipCode(e.target.value)}
                />
              </div>
            </div>
          </dd>
        </div>
      </dl>

      {/* ボタン */}
      <div className="mt-6 flex flex-row gap-x-3 justify-end">
        <Button
          type={"button"}
          onClick={handleCancel}
          text={"Cancel"}
          style={"text"}
          fullWidth={false}
        />
        <Button
          type={"button"}
          onClick={handleSaveAndNext}
          text={"Save and Next"}
          style={"fill"}
          fullWidth={false}
        />
      </div>
    </>
  );
});

export default Information;
