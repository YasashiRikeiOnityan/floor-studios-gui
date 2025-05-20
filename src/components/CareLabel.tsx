import { specificationStore } from "@/stores/specificationStore";
import { useState } from "react";
import Button from "./Button";

type CareLabelProps = {
  isUpdateProgress: boolean;
  callBackUpdateState: () => void;
};

const CareLabel = (props: CareLabelProps) => {
  const [hasBrandLogo, setHasBrandLogo] = useState(specificationStore.currentSpecification.careLabel?.hasBrandLogo || false);
  // const [description, setDescription] = useState(specificationStore.currentSpecification.careLabel?.description || "");

  const handleSaveAndNext = () => {
    specificationStore.putSpecification({
      ...(props.isUpdateProgress && { progress: "OEMPOINT" }),
      care_label: {
        has_brand_logo: hasBrandLogo,
        description: {
          description: "備考",
          // file: {
          //   name: "",
          //   key: "",
          // },
        },
      },
    });
    specificationStore.currentSpecification.careLabel = {
      hasBrandLogo: hasBrandLogo,
      description: {
        description: "備考",
        // file: {
        //   name: "",
        //   key: "",
        // },
      },
    }
    props.callBackUpdateState();
  }

  const handleCancel = () => {
    setHasBrandLogo(specificationStore.currentSpecification.careLabel?.hasBrandLogo || false);
  }

  return (
    <>
      <p className="text-sm text-gray-500">
        {specificationStore.currentSpecification.productCode} - {specificationStore.currentSpecification.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Select your care label option</h1>
      <div className="mt-6 space-y-6">
        <div className="flex items-center">
          <input
            checked={hasBrandLogo}
            id="yes"
            name="hasBrandLogo"
            type="radio"
            onChange={() => setHasBrandLogo(true)}
            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-blue-600 checked:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
          />
          <label htmlFor="yes" className="ml-3 block text-sm/6 font-medium text-gray-900">
            My brand logo
          </label>
        </div>
        <div className="flex items-center">
          <input
            checked={!hasBrandLogo}
            id="no"
            name="hasBrandLogo"
            type="radio"
            onChange={() => setHasBrandLogo(false)}
            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-blue-600 checked:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
          />
          <label htmlFor="no" className="ml-3 block text-sm/6 font-medium text-gray-900">
            No logo
          </label>
        </div>
      </div>

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
};

export default CareLabel;
