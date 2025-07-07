import { specificationStore } from "@/stores/specificationStore";
import { useState } from "react";
import Button from "@/components/Button";
import Toggle from "@/components/Toggle";
import { BottomsSpecification, SizeValue } from "@/lib/type/specification/bottoms/type";

type BottomsMainProductionProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
};

const BottomsMainProduction = (props: BottomsMainProductionProps) => {
  const currentSpecification = specificationStore.currentSpecification as BottomsSpecification;
  const [quantity, setQuantity] = useState<SizeValue>(currentSpecification?.mainProduction?.quantity || { xs: "0", s: "0", m: "0", l: "0", xl: "0" });
  const [deliveryDateEnabled, setDeliveryDateEnabled] = useState<boolean>(currentSpecification?.mainProduction?.deliveryDate ? true : false);
  const [deliveryDate, setDeliveryDate] = useState<string>(currentSpecification?.mainProduction?.deliveryDate || "");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleQuantityChange = (size: string, value: string) => {
    const newValue = parseInt(value) || 0;
    setQuantity({ ...quantity, [size]: newValue });
  }

  const handleCancel = () => {
    setQuantity(currentSpecification?.mainProduction?.quantity || { xs: "0", s: "0", m: "0", l: "0", xl: "0" });
    setDeliveryDate(currentSpecification?.mainProduction?.deliveryDate || "");
    setDeliveryDateEnabled(currentSpecification?.mainProduction?.deliveryDate ? true : false);
  }

  const handleSaveAndNext = async () => {
    setIsSaving(true);
    await specificationStore.putSpecificationsSpecificationId(currentSpecification?.specificationId || "", {
      ...(props.isUpdateProgress && { progress: "MAINPRODUCTION" }),
      main_production: {
        quantity: {
          xs: quantity.xs,
          s: quantity.s,
          m: quantity.m,
          l: quantity.l,
          xl: quantity.xl,
        },
        ...(deliveryDateEnabled && { delivery_date: deliveryDate }),
      },
    });
    specificationStore.updateSpecification({
      ...currentSpecification,
      mainProduction: {
        quantity: {
          xs: quantity.xs,
          s: quantity.s,
          m: quantity.m,
          l: quantity.l,
          xl: quantity.xl,
        },
        ...(deliveryDateEnabled && { deliveryDate: deliveryDate }),
      },
    });
    props.callBackUpdateState();
    setIsSaving(false);
  }

  return (
    <>
      <p className="text-sm text-gray-500">
        {currentSpecification.productCode} - {currentSpecification.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">How many items would you like to produce?</h1>
      {/* メインコンテンツ */}
      <div className="space-y-2 max-w-lg">
        <div className="grid grid-cols-7 gap-2 mt-4 items-center">
          <label className="block text-center text-xs font-medium text-gray-700">XS</label>
          <label className="block text-center text-xs font-medium text-gray-700">S</label>
          <label className="block text-center text-xs font-medium text-gray-700">M</label>
          <label className="block text-center text-xs font-medium text-gray-700">L</label>
          <label className="block text-center text-xs font-medium text-gray-700">XL</label>
        </div>
        <div className="grid grid-cols-7 gap-2 items-center">
          <input
            type="text"
            placeholder="0"
            value={quantity.xs}
            onChange={(e) => handleQuantityChange('xs', e.target.value)}
            className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
          />
          <input
            type="text"
            placeholder="0"
            value={quantity.s}
            onChange={(e) => handleQuantityChange('s', e.target.value)}
            className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
          />
          <input
            type="text"
            placeholder="0"
            value={quantity.m}
            onChange={(e) => handleQuantityChange('m', e.target.value)}
            className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
          />
          <input
            type="text"
            placeholder="0"
            value={quantity.l}
            onChange={(e) => handleQuantityChange('l', e.target.value)}
            className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
          />
          <input
            type="text"
            placeholder="0"
            value={quantity.xl}
            onChange={(e) => handleQuantityChange('xl', e.target.value)}
            className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
          />
        </div>
      </div>
      {/* 希望納期 */}
      <div className="mt-10 items-center md:grid md:grid-cols-3 md:gap-4">
        <div className="mb-2 md:mb-0 md:col-span-1">
          <Toggle label="Set delivery date" enabled={deliveryDateEnabled} setEnabled={() => setDeliveryDateEnabled(!deliveryDateEnabled)} />
        </div>
        {deliveryDateEnabled && (
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full block rounded-md bg-white px-3 py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
          />
        )}
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
          loadingText="Saving..."
          loading={isSaving}
          style={"fill"}
          fullWidth={false}
        />
      </div>
    </>
  );
};

export default BottomsMainProduction;
