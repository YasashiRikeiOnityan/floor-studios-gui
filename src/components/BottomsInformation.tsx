import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { tenantStore } from "@/stores/tenantStore";
import Button from "@/components/Button";
import { specificationStore } from "@/stores/specificationStore";
import { useRouter } from "next/navigation";
import { dialogStore } from "@/stores/dialogStore";
import { BottomsSpecification } from "@/lib/type/specification/bottoms/type";
import { formatSpecificationType } from "@/lib/utils";

const BottomsInformation = observer(() => {
  const currentSpecification = specificationStore.currentSpecification as BottomsSpecification;
  const router = useRouter();
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
  const [sameAsBillingInformation, setSameAsBillingInformation] = useState(false);
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
  const [sameAsShippingInformationSample, setSameAsShippingInformationSample] = useState(false);
  const [mainProductionAddressLine1, setMainProductionAddressLine1] = useState("");
  const [mainProductionAddressLine2, setMainProductionAddressLine2] = useState("");
  const [mainProductionZipCode, setMainProductionZipCode] = useState("");
  const [mainProductionState, setMainProductionState] = useState("");
  const [mainProductionCity, setMainProductionCity] = useState("");
  const [mainProductionCountry, setMainProductionCountry] = useState("");
  const [mainProductionCompanyName, setMainProductionCompanyName] = useState("");
  const [mainProductionFirstName, setMainProductionFirstName] = useState("");
  const [mainProductionLastName, setMainProductionLastName] = useState("");
  const [mainProductionPhoneNumber, setMainProductionPhoneNumber] = useState("");
  const [mainProductionEmail, setMainProductionEmail] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchTenant = async () => {
      if (mounted) {
        await tenantStore.fetchTenant();
        setContactFirstName(currentSpecification?.information?.contact?.firstName || tenantStore.tenant?.contact?.firstName || "");
        setContactLastName(currentSpecification?.information?.contact?.lastName || tenantStore.tenant?.contact?.lastName || "");
        setContactPhoneNumber(currentSpecification?.information?.contact?.phoneNumber || tenantStore.tenant?.contact?.phoneNumber || "");
        setContactEmail(currentSpecification?.information?.contact?.email || tenantStore.tenant?.contact?.email || "");
        setBillingAddressLine1(currentSpecification?.information?.billingInformation?.addressLine1 || tenantStore.tenant?.billingInformation?.addressLine1 || "");
        setBillingAddressLine2(currentSpecification?.information?.billingInformation?.addressLine2 || tenantStore.tenant?.billingInformation?.addressLine2 || "");
        setBillingZipCode(currentSpecification?.information?.billingInformation?.zipCode || tenantStore.tenant?.billingInformation?.zipCode || "");
        setBillingState(currentSpecification?.information?.billingInformation?.state || tenantStore.tenant?.billingInformation?.state || "");
        setBillingCity(currentSpecification?.information?.billingInformation?.city || tenantStore.tenant?.billingInformation?.city || "");
        setBillingCountry(currentSpecification?.information?.billingInformation?.country || tenantStore.tenant?.billingInformation?.country || "");
        setBillingCompanyName(currentSpecification?.information?.billingInformation?.companyName || tenantStore.tenant?.billingInformation?.companyName || "");
        setBillingFirstName(currentSpecification?.information?.billingInformation?.firstName || tenantStore.tenant?.billingInformation?.firstName || "");
        setBillingLastName(currentSpecification?.information?.billingInformation?.lastName || tenantStore.tenant?.billingInformation?.lastName || "");
        setBillingPhoneNumber(currentSpecification?.information?.billingInformation?.phoneNumber || tenantStore.tenant?.billingInformation?.phoneNumber || "");
        setBillingEmail(currentSpecification?.information?.billingInformation?.email || tenantStore.tenant?.billingInformation?.email || "");
        setSameAsBillingInformation(currentSpecification?.information?.shippingInformationSample?.sameAsBillingInformation || false);
        setShippingAddressLine1(currentSpecification?.information?.shippingInformationSample?.addressLine1 || tenantStore.tenant?.shippingInformationSample?.addressLine1 || "");
        setShippingAddressLine2(currentSpecification?.information?.shippingInformationSample?.addressLine2 || tenantStore.tenant?.shippingInformationSample?.addressLine2 || "");
        setShippingZipCode(currentSpecification?.information?.shippingInformationSample?.zipCode || tenantStore.tenant?.shippingInformationSample?.zipCode || "");
        setShippingState(currentSpecification?.information?.shippingInformationSample?.state || tenantStore.tenant?.shippingInformationSample?.state || "");
        setShippingCity(currentSpecification?.information?.shippingInformationSample?.city || tenantStore.tenant?.shippingInformationSample?.city || "");
        setShippingCountry(currentSpecification?.information?.shippingInformationSample?.country || tenantStore.tenant?.shippingInformationSample?.country || "");
        setShippingCompanyName(currentSpecification?.information?.shippingInformationSample?.companyName || tenantStore.tenant?.shippingInformationSample?.companyName || "");
        setShippingFirstName(currentSpecification?.information?.shippingInformationSample?.firstName || tenantStore.tenant?.shippingInformationSample?.firstName || "");
        setShippingLastName(currentSpecification?.information?.shippingInformationSample?.lastName || tenantStore.tenant?.shippingInformationSample?.lastName || "");
        setShippingPhoneNumber(currentSpecification?.information?.shippingInformationSample?.phoneNumber || tenantStore.tenant?.shippingInformationSample?.phoneNumber || "");
        setShippingEmail(currentSpecification?.information?.shippingInformationSample?.email || tenantStore.tenant?.shippingInformationSample?.email || "");
        setSameAsShippingInformationSample(currentSpecification?.information?.shippingInformationMainProduction?.sameAsShippingInformationSample || false);
        setMainProductionAddressLine1(currentSpecification?.information?.shippingInformationMainProduction?.addressLine1 || tenantStore.tenant?.shippingInformationMainProduction?.addressLine1 || "");
        setMainProductionAddressLine2(currentSpecification?.information?.shippingInformationMainProduction?.addressLine2 || tenantStore.tenant?.shippingInformationMainProduction?.addressLine2 || "");
        setMainProductionZipCode(currentSpecification?.information?.shippingInformationMainProduction?.zipCode || tenantStore.tenant?.shippingInformationMainProduction?.zipCode || "");
        setMainProductionState(currentSpecification?.information?.shippingInformationMainProduction?.state || tenantStore.tenant?.shippingInformationMainProduction?.state || "");
        setMainProductionCity(currentSpecification?.information?.shippingInformationMainProduction?.city || tenantStore.tenant?.shippingInformationMainProduction?.city || "");
        setMainProductionCountry(currentSpecification?.information?.shippingInformationMainProduction?.country || tenantStore.tenant?.shippingInformationMainProduction?.country || "");
        setMainProductionCompanyName(currentSpecification?.information?.shippingInformationMainProduction?.companyName || tenantStore.tenant?.shippingInformationMainProduction?.companyName || "");
        setMainProductionFirstName(currentSpecification?.information?.shippingInformationMainProduction?.firstName || tenantStore.tenant?.shippingInformationMainProduction?.firstName || "");
        setMainProductionLastName(currentSpecification?.information?.shippingInformationMainProduction?.lastName || tenantStore.tenant?.shippingInformationMainProduction?.lastName || "");
        setMainProductionPhoneNumber(currentSpecification?.information?.shippingInformationMainProduction?.phoneNumber || tenantStore.tenant?.shippingInformationMainProduction?.phoneNumber || "");
        setMainProductionEmail(currentSpecification?.information?.shippingInformationMainProduction?.email || tenantStore.tenant?.shippingInformationMainProduction?.email || "");
      }
    };
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

  // Mass Productionの情報がSampleと同じ場合の自動設定
  useEffect(() => {
    if (sameAsShippingInformationSample) {
      setMainProductionAddressLine1(shippingAddressLine1);
      setMainProductionAddressLine2(shippingAddressLine2);
      setMainProductionZipCode(shippingZipCode);
      setMainProductionState(shippingState);
      setMainProductionCity(shippingCity);
      setMainProductionCountry(shippingCountry);
      setMainProductionCompanyName(shippingCompanyName);
      setMainProductionFirstName(shippingFirstName);
      setMainProductionLastName(shippingLastName);
      setMainProductionPhoneNumber(shippingPhoneNumber);
      setMainProductionEmail(shippingEmail);
    }
  }, [sameAsShippingInformationSample, shippingAddressLine1, shippingAddressLine2, shippingZipCode, shippingState, shippingCity, shippingCountry, shippingCompanyName, shippingFirstName, shippingLastName, shippingPhoneNumber, shippingEmail]);

  const handleSaveAndNext = async () => {
    setIsSaving(true);
    await specificationStore.putSpecificationsSpecificationId(currentSpecification?.specificationId || "", {
      progress: "COMPLETE",
      status: "COMPLETE",
      information: {
        contact: {
          first_name: contactFirstName,
          last_name: contactLastName,
          phone_number: contactPhoneNumber,
          email: contactEmail,
        },
        billing_information: {
          address_line_1: billingAddressLine1,
          address_line_2: billingAddressLine2,
          zip_code: billingZipCode,
          state: billingState,
          city: billingCity,
          country: billingCountry,
          company_name: billingCompanyName,
          first_name: billingFirstName,
          last_name: billingLastName,
          phone_number: billingPhoneNumber,
          email: billingEmail,
        },
        shipping_information_sample: {
          same_as_billing_information: sameAsBillingInformation,
          address_line_1: shippingAddressLine1,
          address_line_2: shippingAddressLine2,
          zip_code: shippingZipCode,
          state: shippingState,
          city: shippingCity,
          country: shippingCountry,
          company_name: shippingCompanyName,
          first_name: shippingFirstName,
          last_name: shippingLastName,
          phone_number: shippingPhoneNumber,
          email: shippingEmail,
        },
        shipping_information_main_production: {
          same_as_shipping_information_sample: sameAsShippingInformationSample,
          address_line_1: mainProductionAddressLine1,
          address_line_2: mainProductionAddressLine2,
          zip_code: mainProductionZipCode,
          state: mainProductionState,
          city: mainProductionCity,
          country: mainProductionCountry,
          company_name: mainProductionCompanyName,
          first_name: mainProductionFirstName,
          last_name: mainProductionLastName,
          phone_number: mainProductionPhoneNumber,
          email: mainProductionEmail,
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
        shippingInformationSample: {
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
        shippingInformationMainProduction: {
          sameAsShippingInformationSample: sameAsShippingInformationSample,
          addressLine1: mainProductionAddressLine1,
          addressLine2: mainProductionAddressLine2,
          zipCode: mainProductionZipCode,
          state: mainProductionState,
          city: mainProductionCity,
          country: mainProductionCountry,
          companyName: mainProductionCompanyName,
          firstName: mainProductionFirstName,
          lastName: mainProductionLastName,
          phoneNumber: mainProductionPhoneNumber,
          email: mainProductionEmail,
        },
      }
    });
    setIsSaving(false);
    // 成功ダイアログを表示
    dialogStore.openSuccessDialog(
      "Complete",
      "Specification has been created.",
      "OK",
      () => {
        dialogStore.closeSuccessDialog();
        router.push(`/orders?status=COMPLETE&collection=${currentSpecification?.specificationGroupId || "NO_GROUP"}`);
      }
    );
  }

  const handleCancel = () => {
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
    setSameAsBillingInformation(false);
    setShippingAddressLine1(tenantStore.tenant?.shippingInformationSample?.addressLine1 || "");
    setShippingAddressLine2(tenantStore.tenant?.shippingInformationSample?.addressLine2 || "");
    setShippingZipCode(tenantStore.tenant?.shippingInformationSample?.zipCode || "");
    setShippingState(tenantStore.tenant?.shippingInformationSample?.state || "");
    setShippingCity(tenantStore.tenant?.shippingInformationSample?.city || "");
    setShippingCountry(tenantStore.tenant?.shippingInformationSample?.country || "");
    setShippingCompanyName(tenantStore.tenant?.shippingInformationSample?.companyName || "");
    setShippingFirstName(tenantStore.tenant?.shippingInformationSample?.firstName || "");
    setShippingLastName(tenantStore.tenant?.shippingInformationSample?.lastName || "");
    setShippingPhoneNumber(tenantStore.tenant?.shippingInformationSample?.phoneNumber || "");
    setShippingEmail(tenantStore.tenant?.shippingInformationSample?.email || "");
    setSameAsShippingInformationSample(false);
    setMainProductionAddressLine1(tenantStore.tenant?.shippingInformationMainProduction?.addressLine1 || "");
    setMainProductionAddressLine2(tenantStore.tenant?.shippingInformationMainProduction?.addressLine2 || "");
    setMainProductionZipCode(tenantStore.tenant?.shippingInformationMainProduction?.zipCode || "");
    setMainProductionState(tenantStore.tenant?.shippingInformationMainProduction?.state || "");
    setMainProductionCity(tenantStore.tenant?.shippingInformationMainProduction?.city || "");
    setMainProductionCountry(tenantStore.tenant?.shippingInformationMainProduction?.country || "");
    setMainProductionCompanyName(tenantStore.tenant?.shippingInformationMainProduction?.companyName || "");
    setMainProductionFirstName(tenantStore.tenant?.shippingInformationMainProduction?.firstName || "");
    setMainProductionLastName(tenantStore.tenant?.shippingInformationMainProduction?.lastName || "");
    setMainProductionPhoneNumber(tenantStore.tenant?.shippingInformationMainProduction?.phoneNumber || "");
    setMainProductionEmail(tenantStore.tenant?.shippingInformationMainProduction?.email || "");
  }

  return (
    <>
      <p className="text-sm text-gray-500">
        {formatSpecificationType(currentSpecification?.type)}
      </p>
      <p className="text-sm text-gray-500">
        {currentSpecification?.productCode} - {currentSpecification?.productName}
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
                  htmlFor="lastName"
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
          <dt className="text-sm/6 font-semibold text-gray-900">Billing Information</dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="billingCompanyName"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Company Name
                </label>
                <input
                  id="billingCompanyName"
                  name="billingCompanyName"
                  type="text"
                  placeholder="Floor Studios"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={billingCompanyName}
                  onChange={(e) => setBillingCompanyName(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="billingFirstName"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  First Name
                </label>
                <input
                  id="billingFirstName"
                  name="billingFirstName"
                  type="text"
                  placeholder="Floor"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={billingFirstName}
                  onChange={(e) => setBillingFirstName(e.target.value)}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="billingLastName"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Last Name
                </label>
                <input
                  id="billingLastName"
                  name="billingLastName"
                  type="text"
                  placeholder="Studios"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={billingLastName}
                  onChange={(e) => setBillingLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="billingPhoneNumber"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Phone Number
                </label>
                <input
                  id="billingPhoneNumber"
                  name="billingPhoneNumber"
                  type="text"
                  placeholder="+81 90-1234-5678"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={billingPhoneNumber}
                  onChange={(e) => setBillingPhoneNumber(e.target.value)}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="billingEmail"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Email
                </label>
                <input
                  id="billingEmail"
                  name="billingEmail"
                  type="text"
                  placeholder="floor@floorstudios.com"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={billingEmail}
                  onChange={(e) => setBillingEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
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
          <dt className="text-sm/6 font-semibold text-gray-900">Shipping Information (Sample Production)</dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            {/* 請求先情報と同じにするトグル */}
            <div className="mt-2 sm:mt-0 mb-6">
              <div className="flex items-center">
                <input
                  id="sameAsBilling"
                  name="sameAsBilling"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  checked={sameAsBillingInformation}
                  onChange={(e) => setSameAsBillingInformation(e.target.checked)}
                />
                <label htmlFor="sameAsBilling" className="ml-2 text-sm text-gray-900">
                  Same as billing information
                </label>
              </div>
            </div>
            <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="shippingCompanyName"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Company Name
                </label>
                <input
                  id="shippingCompanyName"
                  name="shippingCompanyName"
                  type="text"
                  placeholder="Floor Studios"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-white0 text-gray-500' : 'bg-white text-gray-900'}`}
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
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  First Name
                </label>
                <input
                  id="shippingFirstName"
                  name="shippingFirstName"
                  type="text"
                  placeholder="Floor"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-white0 text-gray-500' : 'bg-white text-gray-900'}`}
                  value={shippingFirstName}
                  onChange={(e) => setShippingFirstName(e.target.value)}
                  disabled={sameAsBillingInformation}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="shippingLastName"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Last Name
                </label>
                <input
                  id="shippingLastName"
                  name="shippingLastName"
                  type="text"
                  placeholder="Studios"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-white0 text-gray-500' : 'bg-white text-gray-900'}`}
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
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Phone Number
                </label>
                <input
                  id="shippingPhoneNumber"
                  name="shippingPhoneNumber"
                  type="text"
                  placeholder="+81 90-1234-5678"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-white0 text-gray-500' : 'bg-white text-gray-900'}`}
                  value={shippingPhoneNumber}
                  onChange={(e) => setShippingPhoneNumber(e.target.value)}
                  disabled={sameAsBillingInformation}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="shippingEmail"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Email
                </label>
                <input
                  id="shippingEmail"
                  name="shippingEmail"
                  type="text"
                  placeholder="floor@floorstudios.com"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-white0 text-gray-500' : 'bg-white text-gray-900'}`}
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
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Country
                </label>
                <input
                  id="shippingCountry"
                  name="shippingCountry"
                  type="text"
                  placeholder="Japan"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-white0 text-gray-500' : 'bg-white text-gray-900'}`}
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
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  State
                </label>
                <input
                  id="shippingState"
                  name="shippingState"
                  type="text"
                  placeholder="Tokyo"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-white0 text-gray-500' : 'bg-white text-gray-900'}`}
                  value={shippingState}
                  onChange={(e) => setShippingState(e.target.value)}
                  disabled={sameAsBillingInformation}
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
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-white0 text-gray-500' : 'bg-white text-gray-900'}`}
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
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Address Line 1
                </label>
                <input
                  id="shippingAddressLine1"
                  name="shippingAddressLine1"
                  type="text"
                  placeholder="Floor Studios"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-white0 text-gray-500' : 'bg-white text-gray-900'}`}
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
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Address Line 2
                </label>
                <input
                  id="shippingAddressLine2"
                  name="shippingAddressLine2"
                  type="text"
                  placeholder="Floor Studios"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-white0 text-gray-500' : 'bg-white text-gray-900'}`}
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
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Zip Code
                </label>
                <input
                  id="shippingZipCode"
                  name="shippingZipCode"
                  type="text"
                  placeholder="123-4567"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsBillingInformation ? 'bg-white0 text-gray-500' : 'bg-white text-gray-900'}`}
                  value={shippingZipCode}
                  onChange={(e) => setShippingZipCode(e.target.value)}
                  disabled={sameAsBillingInformation}
                />
              </div>
            </div>
          </dd>
        </div>

        <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm/6 font-semibold text-gray-900">Shipping Information (Mass Production)</dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            {/* Mass Productionの情報がSampleと同じにするトグル */}
            <div className="mt-2 sm:mt-0 mb-6">
              <div className="flex items-center">
                <input
                  id="sameAsShippingInformationSample"
                  name="sameAsShippingInformationSample"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  checked={sameAsShippingInformationSample}
                  onChange={(e) => setSameAsShippingInformationSample(e.target.checked)}
                />
                <label htmlFor="sameAsShippingInformationSample" className="ml-2 text-sm text-gray-900">
                  Same as shipping information (sample production)
                </label>
              </div>
            </div>
            <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="mainProductionCompanyName"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Company Name
                </label>
                <input
                  id="mainProductionCompanyName"
                  name="mainProductionCompanyName"
                  type="text"
                  placeholder="Floor Studios"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsShippingInformationSample ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'}`}
                  value={mainProductionCompanyName}
                  onChange={(e) => setMainProductionCompanyName(e.target.value)}
                  disabled={sameAsShippingInformationSample}
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="mainProductionFirstName"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  First Name
                </label>
                <input
                  id="mainProductionFirstName"
                  name="mainProductionFirstName"
                  type="text"
                  placeholder="Floor"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsShippingInformationSample ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'}`}
                  value={mainProductionFirstName}
                  onChange={(e) => setMainProductionFirstName(e.target.value)}
                  disabled={sameAsShippingInformationSample}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="mainProductionLastName"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Last Name
                </label>
                <input
                  id="mainProductionLastName"
                  name="mainProductionLastName"
                  type="text"
                  placeholder="Studios"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsShippingInformationSample ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'}`}
                  value={mainProductionLastName}
                  onChange={(e) => setMainProductionLastName(e.target.value)}
                  disabled={sameAsShippingInformationSample}
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="mainProductionPhoneNumber"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Phone Number
                </label>
                <input
                  id="mainProductionPhoneNumber"
                  name="mainProductionPhoneNumber"
                  type="text"
                  placeholder="+81 90-1234-5678"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsShippingInformationSample ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'}`}
                  value={mainProductionPhoneNumber}
                  onChange={(e) => setMainProductionPhoneNumber(e.target.value)}
                  disabled={sameAsShippingInformationSample}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="mainProductionEmail"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Email
                </label>
                <input
                  id="mainProductionEmail"
                  name="mainProductionEmail"
                  type="text"
                  placeholder="floor@floorstudios.com"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsShippingInformationSample ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'}`}
                  value={mainProductionEmail}
                  onChange={(e) => setMainProductionEmail(e.target.value)}
                  disabled={sameAsShippingInformationSample}
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="mainProductionCountry"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Country
                </label>
                <input
                  id="mainProductionCountry"
                  name="mainProductionCountry"
                  type="text"
                  placeholder="Japan"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsShippingInformationSample ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'}`}
                  value={mainProductionCountry}
                  onChange={(e) => setMainProductionCountry(e.target.value)}
                  disabled={sameAsShippingInformationSample}
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="mainProductionState"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  State
                </label>
                <input
                  id="mainProductionState"
                  name="mainProductionState"
                  type="text"
                  placeholder="Tokyo"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsShippingInformationSample ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'}`}
                  value={mainProductionState}
                  onChange={(e) => setMainProductionState(e.target.value)}
                  disabled={sameAsShippingInformationSample}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="mainProductionCity"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  City
                </label>
                <input
                  id="mainProductionCity"
                  name="mainProductionCity"
                  type="text"
                  placeholder="Tokyo"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsShippingInformationSample ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'}`}
                  value={mainProductionCity}
                  onChange={(e) => setMainProductionCity(e.target.value)}
                  disabled={sameAsShippingInformationSample}
                />
              </div>
            </div>
            <div className="mt-6 col-span-2">
              <div className="relative">
                <label
                  htmlFor="mainProductionAddressLine1"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Address Line 1
                </label>
                <input
                  id="mainProductionAddressLine1"
                  name="mainProductionAddressLine1"
                  type="text"
                  placeholder="Floor Studios"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsShippingInformationSample ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'}`}
                  value={mainProductionAddressLine1}
                  onChange={(e) => setMainProductionAddressLine1(e.target.value)}
                  disabled={sameAsShippingInformationSample}
                />
              </div>
            </div>
            <div className="mt-6 col-span-2">
              <div className="relative">
                <label
                  htmlFor="mainProductionAddressLine2"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Address Line 2
                </label>
                <input
                  id="mainProductionAddressLine2"
                  name="mainProductionAddressLine2"
                  type="text"
                  placeholder="Floor Studios"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsShippingInformationSample ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'}`}
                  value={mainProductionAddressLine2}
                  onChange={(e) => setMainProductionAddressLine2(e.target.value)}
                  disabled={sameAsShippingInformationSample}
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="mainProductionZipCode"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Zip Code
                </label>
                <input
                  id="mainProductionZipCode"
                  name="mainProductionZipCode"
                  type="text"
                  placeholder="123-4567"
                  className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${sameAsShippingInformationSample ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'}`}
                  value={mainProductionZipCode}
                  onChange={(e) => setMainProductionZipCode(e.target.value)}
                  disabled={sameAsShippingInformationSample}
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
          loadingText="Saving..."
          loading={isSaving}
          style={"fill"}
          fullWidth={false}
        />
      </div>
    </>
  );
});

export default BottomsInformation;
