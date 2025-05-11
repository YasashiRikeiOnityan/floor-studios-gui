import { specificationStore } from "@/stores/specificationStore";
import { useState } from "react";
import Button from "@/components/Button";

type TShirtsSampleProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
};

const TShirtsSample = (props: TShirtsSampleProps) => {
  const [sample, setSample] = useState<boolean>(specificationStore.currentSpecification.tshirt?.sample?.sample || false);
  const [quantity, setQuantity] = useState<{ [key: string]: number }>(specificationStore.currentSpecification.tshirt?.sample?.quantity || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
  const [canSendSample, setCanSendSample] = useState<boolean>(specificationStore.currentSpecification.tshirt?.sample?.canSendSample || false);

  const handleQuantityChange = (size: string, value: string) => {
    if (parseInt(value) > 0) {
      setQuantity({ ...quantity, [size]: parseInt(value) });
    } else {
      setQuantity({ ...quantity, [size]: 0 });
    }
  }

  const handleSaveAndNext = () => {
    const body = sample ? {
      ...(props.isUpdateProgress && { progress: "MAINPRODUCTION" }),
      sample: {
        sample: sample,
        quantity: {
          xxs: quantity.xxs,
          xs: quantity.xs,
          s: quantity.s,
          m: quantity.m,
          l: quantity.l,
          xl: quantity.xl,
          xxl: quantity.xxl,
        }
      }
    } : {
      ...(props.isUpdateProgress && { progress: "MAINPRODUCTION" }),
      sample: {
        sample: sample,
        can_send_sample: canSendSample,
      }
    }
    specificationStore.putSpecification(body);
    specificationStore.currentSpecification.tshirt = {
      ...specificationStore.currentSpecification.tshirt,
      sample: sample ? {
        sample: sample,
        quantity: {
          xxs: quantity.xxs,
          xs: quantity.xs,
          s: quantity.s,
          m: quantity.m,
          l: quantity.l,
          xl: quantity.xl,
          xxl: quantity.xxl,
        },
      } : {
        sample: sample,
        canSendSample: canSendSample,
      },
    };
    props.callBackUpdateState();
  }

  const handleCancel = () => {
    setSample(specificationStore.currentSpecification.tshirt?.sample?.sample || false);
    setQuantity(specificationStore.currentSpecification.tshirt?.sample?.quantity || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
    setCanSendSample(specificationStore.currentSpecification.tshirt?.sample?.canSendSample || false);
  }

  return (
    <>
      <p className="text-sm text-gray-500">
        {specificationStore.currentSpecification.productCode} - {specificationStore.currentSpecification.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Do you want a sample first?</h1>
      {/* メインコンテンツ */}
      <div className="flex gap-6">
        {/* サイズ表（7/10） */}
        <div className="w-3/10">
          <div className="mt-6 space-y-6">
            <div className="flex items-center">
              <input
                checked={sample}
                id="yes"
                name="sample"
                type="radio"
                onChange={() => setSample(true)}
                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-blue-600 checked:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
              />
              <label htmlFor="yes" className="ml-3 block text-sm/6 font-medium text-gray-900">
                Yes, I want a sample first.
              </label>
            </div>
            <div className="flex items-center">
              <input
                checked={!sample}
                id="no"
                name="sample"
                type="radio"
                onChange={() => setSample(false)}
                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-blue-600 checked:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
              />
              <label htmlFor="no" className="ml-3 block text-sm/6 font-medium text-gray-900">
                No, I don&apos;t want a sample.
              </label>
            </div>
          </div>
        </div>
        <div className="w-7/10">
          {sample && <div className="mt-6 space-y-2 max-w-lg">
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
          </div>}
          {!sample && <div className="mt-6 flex gap-3">
            <div className="flex h-6 shrink-0 items-center">
              <div className="group grid size-4 grid-cols-1">
                <input
                  defaultChecked={canSendSample}
                  id="canSendSample"
                  name="canSendSample"
                  type="checkbox"
                  onChange={(e) => setCanSendSample(e.target.checked)}
                  aria-describedby="canSendSample-description"
                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-blue-600 checked:bg-blue-600 indeterminate:border-blue-600 indeterminate:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                />
                <svg
                  fill="none"
                  viewBox="0 0 14 14"
                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-has-[:checked]:opacity-100"
                  />
                  <path
                    d="M3 7H11"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                  />
                </svg>
              </div>
            </div>
            <div className="text-sm/6">
              <label htmlFor="canSendSample" className="font-medium text-gray-900">
                It is possible to ship your sample to the factory.
              </label>
            </div>
          </div>}
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

export default TShirtsSample;
