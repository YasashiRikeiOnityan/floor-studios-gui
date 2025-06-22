"use client";

import Header from "@/components/Header";
import PageTitle from "@/components/PageTitle";
import AlertDialog from "@/components/AlertDialod";
import Notification from "@/components/Notification";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { tenantStore } from "@/stores/tenantStore";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const Brand = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [tenantName, setTenantName] = useState("");
  const [validateNameError, setValidateNameError] = useState("");
  const [contactFirstName, setContactFirstName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [billingAddressLine1, setBillingAddressLine1] = useState("");
  const [billingAddressLine2, setBillingAddressLine2] = useState("");
  const [billingZipCode, setBillingZipCode] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [billingCompanyName, setBillingCompanyName] = useState("");
  const [billingFirstName, setBillingFirstName] = useState("");
  const [billingLastName, setBillingLastName] = useState("");
  const [billingPhoneNumber, setBillingPhoneNumber] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [shippingAddressLine1, setShippingAddressLine1] = useState("");
  const [shippingAddressLine2, setShippingAddressLine2] = useState("");
  const [shippingZipCode, setShippingZipCode] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingCompanyName, setShippingCompanyName] = useState("");
  const [shippingFirstName, setShippingFirstName] = useState("");
  const [shippingLastName, setShippingLastName] = useState("");
  const [shippingPhoneNumber, setShippingPhoneNumber] = useState("");
  const [shippingEmail, setShippingEmail] = useState("");
  const [sameAsBillingInformation, setSameAsBillingInformation] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchTenant = async () => {
      if (mounted) {
        setIsLoading(true);
        await tenantStore.fetchTenant();
        setTenantName(tenantStore.tenant?.tenantName || "");
        setContactFirstName(tenantStore.tenant?.contact?.firstName || "");
        setContactLastName(tenantStore.tenant?.contact?.lastName || "");
        setContactPhoneNumber(tenantStore.tenant?.contact?.phoneNumber || "");
        setContactEmail(tenantStore.tenant?.contact?.email || "");
        setBillingAddressLine1(tenantStore.tenant?.billingInformation?.addressLine1 || "");
        setBillingAddressLine2(tenantStore.tenant?.billingInformation?.addressLine2 || "");
        setBillingZipCode(tenantStore.tenant?.billingInformation?.zipCode || "");
        setBillingState(tenantStore.tenant?.billingInformation?.state || "");
        setBillingCity(tenantStore.tenant?.billingInformation?.city || "");
        setBillingCountry(tenantStore.tenant?.billingInformation?.country || "");
        setBillingCompanyName(tenantStore.tenant?.billingInformation?.companyName || "");
        setBillingFirstName(tenantStore.tenant?.billingInformation?.firstName || "");
        setBillingLastName(tenantStore.tenant?.billingInformation?.lastName || "");
        setBillingPhoneNumber(tenantStore.tenant?.billingInformation?.phoneNumber || "");
        setBillingEmail(tenantStore.tenant?.billingInformation?.email || "");
        setShippingAddressLine1(tenantStore.tenant?.shippingInformation?.addressLine1 || "");
        setShippingAddressLine2(tenantStore.tenant?.shippingInformation?.addressLine2 || "");
        setShippingZipCode(tenantStore.tenant?.shippingInformation?.zipCode || "");
        setShippingState(tenantStore.tenant?.shippingInformation?.state || "");
        setShippingCity(tenantStore.tenant?.shippingInformation?.city || "");
        setShippingCountry(tenantStore.tenant?.shippingInformation?.country || "");
        setShippingCompanyName(tenantStore.tenant?.shippingInformation?.companyName || "");
        setShippingFirstName(tenantStore.tenant?.shippingInformation?.firstName || "");
        setShippingLastName(tenantStore.tenant?.shippingInformation?.lastName || "");
        setShippingPhoneNumber(tenantStore.tenant?.shippingInformation?.phoneNumber || "");
        setShippingEmail(tenantStore.tenant?.shippingInformation?.email || "");
        setSameAsBillingInformation(tenantStore.tenant?.shippingInformation?.sameAsBillingInformation || false);
        setIsLoading(false);
      }
    }
    fetchTenant();
  }, [mounted]);

  // 請求先情報と同じにするトグルが変更された時の処理
  useEffect(() => {
    if (sameAsBillingInformation) {
      setShippingAddressLine1(billingAddressLine1);
      setShippingAddressLine2(billingAddressLine2);
      setShippingZipCode(billingZipCode);
      setShippingState(billingState);
      setShippingCity(billingCity);
      setShippingCountry(billingCountry);
      setShippingCompanyName(billingCompanyName);
      setShippingFirstName(billingFirstName);
      setShippingLastName(billingLastName);
      setShippingPhoneNumber(billingPhoneNumber);
      setShippingEmail(billingEmail);
    }
  }, [sameAsBillingInformation, billingAddressLine1, billingAddressLine2, billingZipCode, billingState, billingCity, billingCountry, billingCompanyName, billingFirstName, billingLastName, billingPhoneNumber, billingEmail]);

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

  const handleSave = async () => {
    if (!validateName()) {
      return;
    }
    setIsSaving(true);
    await tenantStore.putTenant({
      tenantName: tenantName,
      contact: {
        firstName: contactFirstName,
        lastName: contactLastName,
        phoneNumber: contactPhoneNumber,
        email: contactEmail,
      },
      billingInformation: {
        addressLine1: billingAddressLine1,
        addressLine2: billingAddressLine2,
        zipCode: billingZipCode,
        state: billingState,
        city: billingCity,
        country: billingCountry,
        companyName: billingCompanyName,
        firstName: billingFirstName,
        lastName: billingLastName,
        phoneNumber: billingPhoneNumber,
        email: billingEmail,
      },
      shippingInformation: {
        sameAsBillingInformation: sameAsBillingInformation,
        addressLine1: shippingAddressLine1,
        addressLine2: shippingAddressLine2,
        zipCode: shippingZipCode,
        state: shippingState,
        city: shippingCity,
        country: shippingCountry,
        companyName: shippingCompanyName,
        firstName: shippingFirstName,
        lastName: shippingLastName,
        phoneNumber: shippingPhoneNumber,
        email: shippingEmail,
      },
    });
    tenantStore.tenant.tenantName = tenantName;
    tenantStore.tenant.contact = {
      firstName: contactFirstName,
      lastName: contactLastName,
      phoneNumber: contactPhoneNumber,
      email: contactEmail,
    };
    tenantStore.tenant.billingInformation = {
      addressLine1: billingAddressLine1,
      addressLine2: billingAddressLine2,
      zipCode: billingZipCode,
      state: billingState,
      city: billingCity,
      country: billingCountry,
      companyName: billingCompanyName,
      firstName: billingFirstName,
      lastName: billingLastName,
      phoneNumber: billingPhoneNumber,
      email: billingEmail,
    };
    tenantStore.tenant.shippingInformation = {
      sameAsBillingInformation: sameAsBillingInformation,
      addressLine1: shippingAddressLine1,
      addressLine2: shippingAddressLine2,
      zipCode: shippingZipCode,
      state: shippingState,
      city: shippingCity,
      country: shippingCountry,
      companyName: shippingCompanyName,
      firstName: shippingFirstName,
      lastName: shippingLastName,
      phoneNumber: shippingPhoneNumber,
      email: shippingEmail,
    };
    setIsEditing(false);
    setIsSaving(false);
  }

  return (
    <>
      <div className="min-h-full bg-gray-50">
        <Header current="Brand" />
        <div className="mt-16 py-5 sm:py-10">
          <PageTitle title="Brand" />
          <main>
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-y-3 items-end">
                <button
                  className="relative group p-1 rounded hover:bg-gray-100"
                  onClick={() => handleEdit()}
                  aria-label="Edit"
                >
                  <PencilSquareIcon className={`h-5 w-5 ${isEditing ? "text-blue-500" : "text-gray-500"}`} />
                  <span className="w-[48px] py-1 invisible rounded text-[12px] font-bold text-white bg-gray-700 -top-8 -left-2.5 group-hover:visible hover:opacity-100 absolute">
                    Edit
                  </span>
                </button>
              </div>
              <div className="mt-2">
                <dl className="divide-y divide-gray-100">
                  {/* ブランド名 */}
                  {!isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-bold text-gray-900">Brand Name</dt>
                    {!isLoading ? <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {tenantStore?.tenant?.tenantName || ""}
                    </dd> : <Loading />}
                  </div>}
                  {isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-bold text-gray-900">Brand Name</dt>
                    <div className="mt-2 sm:mt-0 sm:col-span-2">
                      <div className="relative">
                        <label
                          htmlFor="brandName"
                          className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                        >
                          Brand Name
                        </label>
                        <input
                          id="brandName"
                          name="brandName"
                          type="text"
                          placeholder="Floor Studios"
                          className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                          value={tenantName}
                          onChange={(e) => setTenantName(e.target.value)}
                        />
                      </div>
                      {validateNameError && <div className="text-sm/6 text-red-500">{validateNameError}</div>}
                    </div>
                  </div>}
                  {/* ブランドロゴ */}
                  {!isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-bold text-gray-900">Brand Logo</dt>
                    {isLoading ? <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <Loading />
                    </dd> : <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      No logo uploaded
                    </dd>}
                  </div>}
                  {isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-bold text-gray-900">Brand Logo</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <div className="flex items-center gap-x-8">
                        <img
                          alt=""
                          src="/FloorStudios.png"
                          className="max-w-36 flex-none object-cover"
                        />
                        <div>
                          <button
                            type="button"
                            className="rounded-md bg-white/10 px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-white/20"
                          >
                            Change logo
                          </button>
                          <p className="mt-2 text-xs/5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                        </div>
                      </div>
                    </dd>
                  </div>}
                  {/* 連絡先 */}
                  {!isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-bold text-gray-900">Contact</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {!isLoading ? 
                        <>
                          <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-4">
                            <div>{contactFirstName}</div>
                            <div>{contactLastName}</div>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-4">
                            <div>{contactPhoneNumber}</div>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-4">
                            <div>{contactEmail}</div>
                          </div>
                        </> : <Loading />}
                    </dd>
                  </div>}
                  {isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-bold text-gray-900">Contact</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-4">
                        <div className="relative">
                          <label
                            htmlFor="firstName"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            First Name
                          </label>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Floor"
                            className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                            value={contactFirstName}
                            onChange={(e) => setContactFirstName(e.target.value)}
                          />
                        </div>
                        <div className="relative">
                          <label
                            htmlFor="lastName"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            Last Name
                          </label>
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Studios"
                            className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                            value={contactLastName}
                            onChange={(e) => setContactLastName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="relative">
                          <label
                            htmlFor="phoneNumber"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            Phone Number
                          </label>
                          <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            placeholder="+81 90-1234-5678"
                            className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                            value={contactPhoneNumber}
                            onChange={(e) => setContactPhoneNumber(e.target.value)}
                          />
                        </div>
                        <div className="relative">
                          <label
                            htmlFor="email"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="floor@floorstudios.com"
                            className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                          />
                        </div>
                      </div>
                    </dd>
                  </div>}
                  {/* 請求先住所 */}
                  {!isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-bold text-gray-900">Billing Information</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {!isLoading ?
                        <>
                          <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-4">
                            <div>{billingCompanyName}</div>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-4">
                            <div>{billingFirstName}</div>
                            <div>{billingLastName}</div>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-4">
                            <div>{billingPhoneNumber}</div>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-4">
                            <div>{billingEmail}</div>
                          </div>
                          <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-4">
                            <div>{billingCountry}</div>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-4">
                            <div>{billingState}</div>
                            <div>{billingCity}</div>
                          </div>
                          <div className="mt-2 col-span-2">
                            <div>{billingAddressLine1}</div>
                          </div>
                          <div className="mt-2 col-span-2">
                            <div>{billingAddressLine2}</div>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-4">
                            <div>{billingZipCode}</div>
                          </div>
                        </> : <Loading />}
                    </dd>
                  </div>}
                  {isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-bold text-gray-900">Billing Information</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-4">
                        <div className="relative">
                          <label
                            htmlFor="billingCompanyName"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            Company Name
                          </label>
                          <input
                            id="billingCompanyName"
                            name="billingCompanyName"
                            type="text"
                            placeholder="Floor Studios"
                            className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                            value={billingCompanyName}
                            onChange={(e) => setBillingCompanyName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="relative">
                          <label
                            htmlFor="billingFirstName"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            First Name
                          </label>
                          <input
                            id="billingFirstName"
                            name="billingFirstName"
                            type="text"
                            placeholder="Floor"
                            className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                            value={billingFirstName}
                            onChange={(e) => setBillingFirstName(e.target.value)}
                          />
                        </div>
                        <div className="relative">
                          <label
                            htmlFor="billingLastName"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            Last Name
                          </label>
                          <input
                            id="billingLastName"
                            name="billingLastName"
                            type="text"
                            placeholder="Studios"
                            className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                            value={billingLastName}
                            onChange={(e) => setBillingLastName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="relative">
                          <label
                            htmlFor="billingPhoneNumber"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            Phone Number
                          </label>
                          <input
                            id="billingPhoneNumber"
                            name="billingPhoneNumber"
                            type="text"
                            placeholder="+81 90-1234-5678"
                            className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                            value={billingPhoneNumber}
                            onChange={(e) => setBillingPhoneNumber(e.target.value)}
                          />
                        </div>
                        <div className="relative">
                          <label
                            htmlFor="billingEmail"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            Email
                          </label>
                          <input
                            id="billingEmail"
                            name="billingEmail"
                            type="text"
                            placeholder="floor@floorstudios.com"
                            className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                            value={billingEmail}
                            onChange={(e) => setBillingEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="relative">
                          <label
                            htmlFor="billingCountry"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            Country
                          </label>
                          <input
                            id="billingCountry"
                            name="billingCountry"
                            type="text"
                            placeholder="Japan"
                            className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                            value={billingCountry}
                            onChange={(e) => setBillingCountry(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="relative">
                          <label
                            htmlFor="billingState"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            State
                          </label>
                          <input
                            id="billingState"
                            name="billingState"
                            type="text"
                            placeholder="Tokyo"
                            className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                            value={billingState}
                            onChange={(e) => setBillingState(e.target.value)}
                          />
                        </div>
                        <div className="relative">
                          <label
                            htmlFor="billingCity"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            City
                          </label>
                          <input
                            id="billingCity"
                            name="billingCity"
                            type="text"
                            placeholder="Tokyo"
                            className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                            value={billingCity}
                            onChange={(e) => setBillingCity(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-6 col-span-2">
                        <div className="relative">
                          <label
                            htmlFor="billingAddressLine1"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            Address Line 1
                          </label>
                          <input
                            id="billingAddressLine1"
                            name="billingAddressLine1"
                            type="text"
                            placeholder="Floor Studios"
                            className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                            value={billingAddressLine1}
                            onChange={(e) => setBillingAddressLine1(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-6 col-span-2">
                        <div className="relative">
                          <label
                            htmlFor="billingAddressLine2"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            Address Line 2
                          </label>
                          <input
                            id="billingAddressLine2"
                            name="billingAddressLine2"
                            type="text"
                            placeholder="Floor Studios"
                            className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                            value={billingAddressLine2}
                            onChange={(e) => setBillingAddressLine2(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="relative">
                          <label
                            htmlFor="billingZipCode"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            Zip Code
                          </label>
                          <input
                            id="billingZipCode"
                            name="billingZipCode"
                            type="text"
                            placeholder="123-4567"
                            className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                            value={billingZipCode}
                            onChange={(e) => setBillingZipCode(e.target.value)}
                          />
                        </div>
                      </div>
                    </dd>
                  </div>}
                  {/* 配送先住所 */}
                  {!isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-bold text-gray-900">Shipping Information</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {!isLoading ?
                      <>
                        <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-4">
                          <div>{shippingCompanyName}</div>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div>{shippingFirstName}</div>
                          <div>{shippingLastName}</div>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div>{shippingPhoneNumber}</div>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div>{shippingEmail}</div>
                        </div>
                        <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-4">
                          <div>{shippingCountry}</div>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div>{shippingState}</div>
                          <div>{shippingCity}</div>
                        </div>
                        <div className="mt-2 col-span-2">
                          <div>{shippingAddressLine1}</div>
                        </div>
                        <div className="mt-2 col-span-2">
                          <div>{shippingAddressLine2}</div>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div>{shippingZipCode}</div>
                        </div>
                      </> : <Loading />}
                    </dd>
                  </div>}
                  {isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-bold text-gray-900">Shipping Information</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {/* 請求先情報と同じにするトグル */}
                      <div className="mt-2 sm:mt-0 mb-6">
                        <div className="flex items-center">
                          <input
                            id="sameAsBilling"
                            name="sameAsBilling"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                            checked={sameAsBillingInformation}
                            onChange={(e) => setSameAsBillingInformation(e.target.checked)}
                          />
                          <label htmlFor="sameAsBilling" className="ml-2 text-sm text-gray-900 cursor-pointer">
                            Same as billing information
                          </label>
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-4">
                        <div className="relative">
                          <label
                            htmlFor="shippingCompanyName"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            Company Name
                          </label>
                          <input
                            id="shippingCompanyName"
                            name="shippingCompanyName"
                            type="text"
                            placeholder="Floor Studios"
                            className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-gray-100 text-gray-500' : 'bg-gray-50 text-gray-900'}`}
                            value={shippingCompanyName}
                            onChange={(e) => setShippingCompanyName(e.target.value)}
                            disabled={sameAsBillingInformation}
                          />
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="relative">
                          <label
                            htmlFor="shippingFirstName"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            First Name
                          </label>
                          <input
                            id="shippingFirstName"
                            name="shippingFirstName"
                            type="text"
                            placeholder="Floor"
                            className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-gray-100 text-gray-500' : 'bg-gray-50 text-gray-900'}`}
                            value={shippingFirstName}
                            onChange={(e) => setShippingFirstName(e.target.value)}
                            disabled={sameAsBillingInformation}
                          />
                        </div>
                        <div className="relative">
                          <label
                            htmlFor="shippingLastName"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            Last Name
                          </label>
                          <input
                            id="shippingLastName"
                            name="shippingLastName"
                            type="text"
                            placeholder="Studios"
                            className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-gray-100 text-gray-500' : 'bg-gray-50 text-gray-900'}`}
                            value={shippingLastName}
                            onChange={(e) => setShippingLastName(e.target.value)}
                            disabled={sameAsBillingInformation}
                          />
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="relative">
                          <label
                            htmlFor="shippingPhoneNumber"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            Phone Number
                          </label>
                          <input
                            id="shippingPhoneNumber"
                            name="shippingPhoneNumber"
                            type="text"
                            placeholder="+81 90-1234-5678"
                            className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-gray-100 text-gray-500' : 'bg-gray-50 text-gray-900'}`}
                            value={shippingPhoneNumber}
                            onChange={(e) => setShippingPhoneNumber(e.target.value)}
                            disabled={sameAsBillingInformation}
                          />
                        </div>
                        <div className="relative">
                          <label
                            htmlFor="shippingEmail"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            Email
                          </label>
                          <input
                            id="shippingEmail"
                            name="shippingEmail"
                            type="text"
                            placeholder="floor@floorstudios.com"
                            className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-gray-100 text-gray-500' : 'bg-gray-50 text-gray-900'}`}
                            value={shippingEmail}
                            onChange={(e) => setShippingEmail(e.target.value)}
                            disabled={sameAsBillingInformation}
                          />
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="relative">
                          <label
                            htmlFor="shippingCountry"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            Country
                          </label>
                          <input
                            id="shippingCountry"
                            name="shippingCountry"
                            type="text"
                            placeholder="Japan"
                            className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-gray-100 text-gray-500' : 'bg-gray-50 text-gray-900'}`}
                            value={shippingCountry}
                            onChange={(e) => setShippingCountry(e.target.value)}
                            disabled={sameAsBillingInformation}
                          />
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="relative">
                          <label
                            htmlFor="shippingState"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            State
                          </label>
                          <input
                            id="shippingState"
                            name="shippingState"
                            type="text"
                            placeholder="Tokyo"
                            className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-gray-100 text-gray-500' : 'bg-gray-50 text-gray-900'}`}
                            value={shippingState}
                            onChange={(e) => setShippingState(e.target.value)}
                            disabled={sameAsBillingInformation}
                          />
                        </div>
                        <div className="relative">
                          <label
                            htmlFor="shippingCity"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            City
                          </label>
                          <input
                            id="shippingCity"
                            name="shippingCity"
                            type="text"
                            placeholder="Tokyo"
                            className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-gray-100 text-gray-500' : 'bg-gray-50 text-gray-900'}`}
                            value={shippingCity}
                            onChange={(e) => setShippingCity(e.target.value)}
                            disabled={sameAsBillingInformation}
                          />
                        </div>
                      </div>
                      <div className="mt-6 col-span-2">
                        <div className="relative">
                          <label
                            htmlFor="shippingAddressLine1"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            Address Line 1
                          </label>
                          <input
                            id="shippingAddressLine1"
                            name="shippingAddressLine1"
                            type="text"
                            placeholder="Floor Studios"
                            className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-gray-100 text-gray-500' : 'bg-gray-50 text-gray-900'}`}
                            value={shippingAddressLine1}
                            onChange={(e) => setShippingAddressLine1(e.target.value)}
                            disabled={sameAsBillingInformation}
                          />
                        </div>
                      </div>
                      <div className="mt-6 col-span-2">
                        <div className="relative">
                          <label
                            htmlFor="shippingAddressLine2"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            Address Line 2
                          </label>
                          <input
                            id="shippingAddressLine2"
                            name="shippingAddressLine2"
                            type="text"
                            placeholder="Floor Studios"
                            className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-gray-100 text-gray-500' : 'bg-gray-50 text-gray-900'}`}
                            value={shippingAddressLine2}
                            onChange={(e) => setShippingAddressLine2(e.target.value)}
                            disabled={sameAsBillingInformation}
                          />
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="relative">
                          <label
                            htmlFor="shippingZipCode"
                            className="absolute -top-2 left-2 inline-block rounded-lg bg-gray-50 px-1 text-xs font-medium text-gray-500"
                          >
                            Zip Code
                          </label>
                          <input
                            id="shippingZipCode"
                            name="shippingZipCode"
                            type="text"
                            placeholder="123-4567"
                            className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-gray-100 text-gray-500' : 'bg-gray-50 text-gray-900'}`}
                            value={shippingZipCode}
                            onChange={(e) => setShippingZipCode(e.target.value)}
                            disabled={sameAsBillingInformation}
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
                  loading={isSaving}
                  loadingText={"Saving..."}
                  style={"fill"}
                  fullWidth={false}
                />
              </div>}
            </div>
          </main>
        </div>
        <AlertDialog />
        <Notification />
      </div>
    </>
  )
});

export default Brand;
