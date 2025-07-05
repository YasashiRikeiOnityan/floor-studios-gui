import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Button from "@/components/Button";
import SpecificationGroups from "@/components/SpecificationGroups";
import { specificationStore } from "@/stores/specificationStore";

interface BasicInformationProps {
  callBackUpdateState: (step: number) => void;
  isUpdateProgress: boolean;
}

const BasicInformation = observer((props: BasicInformationProps) => {
  const [mounted, setMounted] = useState(false);
  const [localBrandName, setLocalBrandName] = useState("");
  const [localProductName, setLocalProductName] = useState("");
  const [localProductCode, setLocalProductCode] = useState("");
  const [localSpecificationGroupId, setLocalSpecificationGroupId] = useState("");
  const [localValidateBrandNameError, setLocalValidateBrandNameError] = useState("");
  const [localValidateProductNameError, setLocalValidateProductNameError] = useState("");
  const [localValidateProductCodeError, setLocalValidateProductCodeError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    if (specificationStore.currentSpecification?.type === "T-SHIRT") {
      setLocalBrandName(specificationStore.currentSpecification?.brandName || "");
      setLocalProductName(specificationStore.currentSpecification?.productName || "");
      setLocalProductCode(specificationStore.currentSpecification?.productCode || "");
      setLocalSpecificationGroupId(specificationStore.currentSpecification?.specificationGroupId || "");
    }
  }, [mounted]);

  const handleValidate = () => {
    let isValid = true;

    if (localBrandName.length === 0) {
      setLocalValidateBrandNameError("Brand name is required");
      isValid = false;
    } else {
      setLocalValidateBrandNameError("");
    }

    if (localProductName.length === 0) {
      setLocalValidateProductNameError("Product name is required");
      isValid = false;
    } else {
      setLocalValidateProductNameError("");
    }

    if (localProductCode.length === 0) {
      setLocalValidateProductCodeError("Product code is required");
      isValid = false;
    } else {
      setLocalValidateProductCodeError("");
    }

    return isValid;
  }

  const handleSave = async () => {
    setIsSaving(true);
    if (!handleValidate() || !specificationStore.currentSpecification) {
      return;
    }
    await specificationStore.putSpecificationsSpecificationId(specificationStore.currentSpecification.specificationId, {
      brand_name: localBrandName,
      product_name: localProductName,
      product_code: localProductCode,
      specification_group_id: localSpecificationGroupId
    });
    setIsSaving(false);
  }

  const handleSaveAndNext = async () => {
    if (!handleValidate() || !specificationStore.currentSpecification) {
      return;
    }
    await handleSave();
    props.callBackUpdateState(3);
  }

  if (!specificationStore.currentSpecification) {
    return null;
  }

  return (
    <>
      <p className="text-sm text-gray-500">
        {specificationStore.currentSpecification.productCode} - {specificationStore.currentSpecification.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Basic Information</h1>
      <dl className="divide-y divide-gray-100">
        <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm/6 font-semibold text-gray-900">Brand Information</dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="brandname"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Brand Name
                </label>
                <input
                  id="brandname"
                  name="brandname"
                  type="text"
                  placeholder=""
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${localValidateBrandNameError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                    } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                  value={localBrandName}
                  onChange={(e) => setLocalBrandName(e.target.value)}
                />
                {localValidateBrandNameError && <div className="text-sm/6 text-red-500">{localValidateBrandNameError}</div>}
              </div>
            </div>
          </dd>
        </div>

        <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm/6 font-semibold text-gray-900">Collection</dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-1 sm:mt-0">
            <div className="mt-2 sm:mt-0">
              <SpecificationGroups
                currentSpecificationGroupId={localSpecificationGroupId}
                setCurrentSpecificationGroupId={setLocalSpecificationGroupId}
                fullWidth={true}
              />
            </div>
          </dd>
        </div>

        <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm/6 font-semibold text-gray-900">Product Information</dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="productname"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Product Name
                </label>
                <input
                  id="productname"
                  name="productname"
                  type="text"
                  placeholder=""
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${localValidateProductNameError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                    } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                  value={localProductName}
                  onChange={(e) => setLocalProductName(e.target.value)}
                />
                {localValidateProductNameError && <div className="text-sm/6 text-red-500">{localValidateProductNameError}</div>}
              </div>
              <div className="relative">
                <label
                  htmlFor="productcode"
                  className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-500"
                >
                  Product Code
                </label>
                <input
                  id="productcode"
                  name="productcode"
                  type="text"
                  placeholder=""
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${localValidateProductCodeError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                    } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                  value={localProductCode}
                  onChange={(e) => setLocalProductCode(e.target.value)}
                />
                {localValidateProductCodeError && <div className="text-sm/6 text-red-500">{localValidateProductCodeError}</div>}
              </div>
            </div>
          </dd>
        </div>
      </dl>

      {/* ボタン */}
      <div className="mt-6 flex flex-row gap-x-3 justify-end">
        <Button
          type={"button"}
          onClick={handleSaveAndNext}
          text={"Save and Next"}
          style={"fill"}
          loading={isSaving}
          loadingText={"Saving..."}
          fullWidth={false}
        />
      </div>
    </>
  );
});

export default BasicInformation; 