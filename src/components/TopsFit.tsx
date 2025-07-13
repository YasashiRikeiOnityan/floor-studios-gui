import { specificationStore } from "@/stores/specificationStore";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { TopsSpecification, SizeValue } from "@/lib/type/specification/tops/type";
import Button from "@/components/Button";

type TopsFitProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
};

const TopsFit = observer((props: TopsFitProps) => {
  const currentSpecification = specificationStore.currentSpecification as TopsSpecification;
  const [totalLength, setTotalLength] = useState<SizeValue>(currentSpecification?.fit?.totalLength || { xs: "", s: "", m: "", l: "", xl: "" });
  const [shoulderToShoulder, setShoulderToShoulder] = useState<SizeValue>(currentSpecification?.fit?.shoulderToShoulder || { xs: "", s: "", m: "", l: "", xl: "" });
  const [chestWidth, setChestWidth] = useState<SizeValue>(currentSpecification?.fit?.chestWidth || { xs: "", s: "", m: "", l: "", xl: "" });
  const [sleeveLength, setSleeveLength] = useState<SizeValue>(currentSpecification?.fit?.sleeveLength || { xs: "", s: "", m: "", l: "", xl: "" });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (setter: React.Dispatch<React.SetStateAction<SizeValue>>) => (size: keyof SizeValue, value: string) => {
    setter(prev => ({ ...prev, [size]: value }));
  };

  const handleCancel = () => {
    setTotalLength(currentSpecification?.fit?.totalLength || { xs: "", s: "", m: "", l: "", xl: "" });
    setShoulderToShoulder(currentSpecification?.fit?.shoulderToShoulder || { xs: "", s: "", m: "", l: "", xl: "" });
    setChestWidth(currentSpecification?.fit?.chestWidth || { xs: "", s: "", m: "", l: "", xl: "" });
    setSleeveLength(currentSpecification?.fit?.sleeveLength || { xs: "", s: "", m: "", l: "", xl: "" });
  };

  const handleSaveAndNext = async () => {
    setIsSaving(true);
    await specificationStore.putSpecificationsSpecificationId(currentSpecification.specificationId, {
      ...(props.isUpdateProgress && { progress: "FIT" }),
      fit: {
        total_length: totalLength,
        shoulder_to_shoulder: shoulderToShoulder,
        chest_width: chestWidth,
        sleeve_length: sleeveLength,
      },
    });
    specificationStore.updateSpecification({
      fit: {
        totalLength,
        shoulderToShoulder,
        chestWidth,
        sleeveLength,
      },
    });
    setIsSaving(false);
    props.callBackUpdateState();
  };

  return (
    <>
      <p className="text-sm text-gray-500">
        {specificationStore.currentSpecification?.productCode} - {specificationStore.currentSpecification?.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Fill in the size chart</h1>
      <div className="space-y-6 mt-4">
        <div className="flex justify-evenly items-start">
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <div className="block w-32"></div>
              <label className="block w-12 text-center text-xs font-medium text-gray-700">XS</label>
              <label className="block w-12 text-center text-xs font-medium text-gray-700">S</label>
              <label className="block w-12 text-center text-xs font-medium text-gray-700">M</label>
              <label className="block w-12 text-center text-xs font-medium text-gray-700">L</label>
              <label className="block w-12 text-center text-xs font-medium text-gray-700">XL</label>
            </div>
            {/* total length */}
            <div className="flex gap-2 items-center">
              <label className="block w-32 text-left text-sm font-medium text-gray-700">Total Length</label>
              {(["xs","s","m","l","xl"] as (keyof SizeValue)[]).map(size => (
                <input
                  key={size}
                  type="text"
                  placeholder={size}
                  value={totalLength[size]}
                  onChange={e => handleChange(setTotalLength)(size, e.target.value)}
                  className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              ))}
            </div>
            {/* shoulder to shoulder */}
            <div className="flex gap-2 items-center">
              <label className="block w-32 text-left text-sm font-medium text-gray-700">Shoulder to Shoulder</label>
              {(["xs","s","m","l","xl"] as (keyof SizeValue)[]).map(size => (
                <input
                  key={size}
                  type="text"
                  placeholder={size}
                  value={shoulderToShoulder[size]}
                  onChange={e => handleChange(setShoulderToShoulder)(size, e.target.value)}
                  className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              ))}
            </div>
            {/* chest width */}
            <div className="flex gap-2 items-center">
              <label className="block w-32 text-left text-sm font-medium text-gray-700">Chest Width</label>
              {(["xs","s","m","l","xl"] as (keyof SizeValue)[]).map(size => (
                <input
                  key={size}
                  type="text"
                  placeholder={size}
                  value={chestWidth[size]}
                  onChange={e => handleChange(setChestWidth)(size, e.target.value)}
                  className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              ))}
            </div>
            {/* sleeve length */}
            <div className="flex gap-2 items-center">
              <label className="block w-32 text-left text-sm font-medium text-gray-700">Sleeve Length</label>
              {(["xs","s","m","l","xl"] as (keyof SizeValue)[]).map(size => (
                <input
                  key={size}
                  type="text"
                  placeholder={size}
                  value={sleeveLength[size]}
                  onChange={e => handleChange(setSleeveLength)(size, e.target.value)}
                  className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              ))}
            </div>
          </div>
          <img src="/long_sleeve.png" alt="tops-fit" className="w-90" />
        </div>
      </div>
      {/* ボタン */}
      <div className="mt-6 flex flex-row justify-end">
        <div className="flex flex-row gap-x-3">
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
            loadingText={"Saving..."}
            loading={isSaving}
            style={"fill"}
            fullWidth={false}
          />
        </div>
      </div>
    </>
  );
});

export default TopsFit; 