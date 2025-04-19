"use client";

import Header from "@/components/Header";
import PageTitle from "@/components/PageTitle";
import AlertDialog from "@/components/AlertDialod";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { tenantStore } from "@/stores/tenantStore";

const Brand = observer(() => {
  const [isEditing, setIsEditing] = useState(false);
  const [tenantName, setTenantName] = useState(tenantStore.tenant.tenantName || "");
  const [validateNameError, setValidateNameError] = useState("");
  const [contactFirstName, setContactFirstName] = useState(tenantStore.tenant.contact.firstName || "");
  const [contactLastName, setContactLastName] = useState(tenantStore.tenant.contact.lastName || "");
  const [contactPhoneNumber, setContactPhoneNumber] = useState(tenantStore.tenant.contact.phoneNumber || "");
  const [contactEmail, setContactEmail] = useState(tenantStore.tenant.contact.email || "");
  const [billingAddressLine1, setBillingAddressLine1] = useState(tenantStore.tenant.billingAddress.addressLine1 || "");
  const [billingAddressLine2, setBillingAddressLine2] = useState(tenantStore.tenant.billingAddress.addressLine2 || "");
  const [billingZipCode, setBillingZipCode] = useState(tenantStore.tenant.billingAddress.zipCode || "");
  const [billingState, setBillingState] = useState(tenantStore.tenant.billingAddress.state || "");
  const [billingCity, setBillingCity] = useState(tenantStore.tenant.billingAddress.city || "");
  const [billingCountry, setBillingCountry] = useState(tenantStore.tenant.billingAddress.country || "");
  const [shippingAddressLine1, setShippingAddressLine1] = useState(tenantStore.tenant.shippingAddress.addressLine1 || "");
  const [shippingAddressLine2, setShippingAddressLine2] = useState(tenantStore.tenant.shippingAddress.addressLine2 || "");
  const [shippingZipCode, setShippingZipCode] = useState(tenantStore.tenant.shippingAddress.zipCode || "");
  const [shippingState, setShippingState] = useState(tenantStore.tenant.shippingAddress.state || "");
  const [shippingCity, setShippingCity] = useState(tenantStore.tenant.shippingAddress.city || "");
  const [shippingCountry, setShippingCountry] = useState(tenantStore.tenant.shippingAddress.country || "");
  const [sameAsBillingAddress, setSameAsBillingAddress] = useState(tenantStore.tenant.shippingAddress.sameAsBillingAddress || false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchTenant = async () => {
      if (mounted) {
        await tenantStore.fetchTenant();
        setTenantName(tenantStore.tenant.tenantName || "");
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
        setSameAsBillingAddress(tenantStore.tenant.shippingAddress.sameAsBillingAddress || false);
      }
    }
    fetchTenant();
  }, [mounted]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  }

  const validateName = () => {
    if (tenantName.length === 0) {
      setValidateNameError("Brand name is required");
      return false;
    } else if (tenantName.length > 20) {
      setValidateNameError("Brand name must be less than 20 characters");
      return false;
    } else {
      setValidateNameError("");
      return true;
    }
  }

  const handleSave = () => {
    if (!validateName()) {
      return;
    }
    tenantStore.putTenant({
      tenantId: tenantStore.tenant?.tenantId || "",
      tenantName: tenantName,
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
        sameAsBillingAddress: sameAsBillingAddress,
        addressLine1: shippingAddressLine1,
        addressLine2: shippingAddressLine2,
        zipCode: shippingZipCode,
        state: shippingState,
        city: shippingCity,
        country: shippingCountry,
      },
    });
    setIsEditing(false);
  }

  return (
    <>
      <div className="min-h-full">
        <Header current="Brand" />
        <div className="mt-16 py-5 sm:py-10">
          <PageTitle title="Brand" />
          <main>
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-y-3 items-end">
                <Button
                  type={"button"}
                  onClick={handleEdit}
                  text={"Edit"}
                  style={"text"}
                  fullWidth={false}
                />
              </div>
              <div className="mt-2 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  {/* ブランド名 */}
                  {!isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-bold text-gray-900">Brand Name</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {tenantStore.loading ? <Loading /> : tenantStore?.tenant?.tenantName || ""}
                    </dd>
                  </div>}
                  {isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-bold text-gray-900">Brand Name</dt>
                    <div className="mt-2 sm:mt-0 sm:col-span-2">
                      <div className="relative">
                        <label
                          htmlFor="brandName"
                          className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                        >
                          Brand Name
                        </label>
                        <input
                          id="brandName"
                          name="brandName"
                          type="text"
                          placeholder="Floor Studios"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          value={tenantName}
                          onChange={(e) => setTenantName(e.target.value)}
                        />
                      </div>
                      {validateNameError && <div className="text-sm/6 text-red-500">{validateNameError}</div>}
                    </div>
                  </div>}
                  {/* 連絡先 */}
                  {!isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-bold text-gray-900">Contact</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-4">
                        <div>{tenantStore.loading ? <Loading /> : contactFirstName}</div>
                        <div>{tenantStore.loading ? <Loading /> : contactLastName}</div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>{tenantStore.loading ? <Loading /> : contactPhoneNumber}</div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>{tenantStore.loading ? <Loading /> : contactEmail}</div>
                      </div>
                    </dd>
                  </div>}
                  {isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-bold text-gray-900">Contact</dt>
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
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                          />
                        </div>
                      </div>
                    </dd>
                  </div>}
                  {/* 請求先住所 */}
                  {!isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-bold text-gray-900">Billing Address</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-4">
                        <div>{tenantStore.loading ? <Loading /> : billingCountry}</div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>{tenantStore.loading ? <Loading /> : billingState}</div>
                        <div>{tenantStore.loading ? <Loading /> : billingCity}</div>
                      </div>
                      <div className="mt-2 col-span-2">
                        <div>{tenantStore.loading ? <Loading /> : billingAddressLine1}</div>
                      </div>
                      <div className="mt-2 col-span-2">
                        <div>{tenantStore.loading ? <Loading /> : billingAddressLine2}</div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>{tenantStore.loading ? <Loading /> : billingZipCode}</div>
                      </div>
                    </dd>
                  </div>}
                  {isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-bold text-gray-900">Billing Address</dt>
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
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            value={billingZipCode}
                            onChange={(e) => setBillingZipCode(e.target.value)}
                          />
                        </div>
                      </div>
                    </dd>
                  </div>}
                  {/* 配送先住所 */}
                  {!isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-bold text-gray-900">Shipping Address</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-4">
                        <div>{tenantStore.loading ? <Loading /> : shippingCountry}</div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>{tenantStore.loading ? <Loading /> : shippingState}</div>
                        <div>{tenantStore.loading ? <Loading /> : shippingCity}</div>
                      </div>
                      <div className="mt-2 col-span-2">
                        <div>{tenantStore.loading ? <Loading /> : shippingAddressLine1}</div>
                      </div>
                      <div className="mt-2 col-span-2">
                        <div>{tenantStore.loading ? <Loading /> : shippingAddressLine2}</div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>{tenantStore.loading ? <Loading /> : shippingZipCode}</div>
                      </div>
                    </dd>
                  </div>}
                  {isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-bold text-gray-900">Shipping Address</dt>
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
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            value={shippingZipCode}
                            onChange={(e) => setShippingZipCode(e.target.value)}
                          />
                        </div>
                      </div>
                    </dd>
                  </div>}
                </dl>
              </div>
              {/* ボタン */}
              {isEditing && <div className="mt-6 flex flex-row gap-x-3 justify-end">
                <Button
                  type={"button"}
                  onClick={() => { setIsEditing(!isEditing) }}
                  text={"Cancel"}
                  style={"text"}
                  fullWidth={false}
                />
                <Button
                  type={"button"}
                  onClick={handleSave}
                  text={"Save"}
                  style={"fill"}
                  fullWidth={false}
                />
              </div>}
            </div>
          </main>
        </div>
        <AlertDialog />
      </div>
    </>
  )
});

export default Brand;
