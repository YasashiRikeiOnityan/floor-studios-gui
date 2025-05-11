import { specificationStore } from "@/stores/specificationStore";
import { useState } from "react";
import Button from "@/components/Button";
import Toggle from "@/components/Toggle";

type TShirtMainProductionProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
};

const TShirtMainProduction = (props: TShirtMainProductionProps) => {
  const [quantity, setQuantity] = useState<{ [key: string]: number }>(specificationStore.currentSpecification.tshirt?.mainProduction?.quantity || {});
  const [deliveryDateEnabled, setDeliveryDateEnabled] = useState<boolean>(specificationStore.currentSpecification.tshirt?.mainProduction?.deliveryDate ? true : false);
  const [deliveryDate, setDeliveryDate] = useState<string>(specificationStore.currentSpecification.tshirt?.mainProduction?.deliveryDate || "");

  const handleQuantityChange = (size: string, value: string) => {
    if (parseInt(value) > 0) {
      setQuantity({ ...quantity, [size]: parseInt(value) });
    } else {
      setQuantity({ ...quantity, [size]: 0 });
    }
  }

  const handleCancel = () => {
    setQuantity(specificationStore.currentSpecification.tshirt?.mainProduction?.quantity || {});
    setDeliveryDate(specificationStore.currentSpecification.tshirt?.mainProduction?.deliveryDate || "");
    setDeliveryDateEnabled(specificationStore.currentSpecification.tshirt?.mainProduction?.deliveryDate ? true : false);
  }

  const handleSaveAndNext = () => {
    specificationStore.putSpecification({
      ...(props.isUpdateProgress && { progress: "INFORMATION" }),
      main_production: {
        quantity: {
          xxs: quantity.xxs,
          xs: quantity.xs,
          s: quantity.s,
          m: quantity.m,
          l: quantity.l,
          xl: quantity.xl,
          xxl: quantity.xxl,
        },
        delivery_date: deliveryDate,
      },
    });
    specificationStore.currentSpecification.tshirt = {
      ...specificationStore.currentSpecification.tshirt,
      mainProduction: {
        quantity: {
          xxs: quantity.xxs,
          xs: quantity.xs,
          s: quantity.s,
          m: quantity.m,
          l: quantity.l,
          xl: quantity.xl,
          xxl: quantity.xxl,
        },
        deliveryDate: deliveryDate,
      },
    };
    props.callBackUpdateState();
  }

  return (
    <>
      <p className="text-sm text-gray-500">
        {specificationStore.currentSpecification.productCode} - {specificationStore.currentSpecification.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">How many items would you like to produce?</h1>
      {/* メインコンテンツ */}
      <div className="space-y-2 max-w-lg">
        <div className="grid grid-cols-7 gap-2 mt-4 items-center">
          <label className="block text-center text-xs font-medium text-gray-700">XXS</label>
          <label className="block text-center text-xs font-medium text-gray-700">XS</label>
          <label className="block text-center text-xs font-medium text-gray-700">S</label>
          <label className="block text-center text-xs font-medium text-gray-700">M</label>
          <label className="block text-center text-xs font-medium text-gray-700">L</label>
          <label className="block text-center text-xs font-medium text-gray-700">XL</label>
          <label className="block text-center text-xs font-medium text-gray-700">XXL</label>
        </div>
        <div className="grid grid-cols-7 gap-2 items-center">
          <input
            type="text"
            placeholder="0"
            value={quantity.xxs}
            onChange={(e) => handleQuantityChange('xxs', e.target.value)}
            className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
          />
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
          <input
            type="text"
            placeholder="0"
            value={quantity.xxl}
            onChange={(e) => handleQuantityChange('xxl', e.target.value)}
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
          style={"fill"}
          fullWidth={false}
        />
      </div>
    </>
  );
};

export default TShirtMainProduction;
