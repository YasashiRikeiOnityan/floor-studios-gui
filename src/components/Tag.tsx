import { Description, TShirtSpecification } from "@/lib/type/specification/t-shirt/type";
import { specificationStore } from "@/stores/specificationStore";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import Button from "@/components/Button";
import { Radio } from "@headlessui/react";
import { RadioGroup } from "@headlessui/react";
import { DescriptionWithFile } from "./DescriptionWithFile";

type TagProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
}

const labelOptions = [
  { id: "no-label", title: "No label" },
  { id: "i-will-send-labels", title: "I will send labels" },
  { id: "standard", title: "Standard" },
  { id: "custom", title: "Custom" },
]

const materialOptions = [
  { id: "woven", title: "Woven label" },
  { id: "polyester", title: "Polyester" },
  { id: "cotton", title: "Cotton Canvas" },
]

const labelColorOptions = [
  { id: "lemon-chrome", title: "Lemon Chrome", colourway: { colorName: "Lemon Chrome", colorCode: "#ffc300" }, material: "Woven label" },
  { id: "exotic-orange", title: "Exotic Orange", colourway: { colorName: "Exotic Orange", colorCode: "#fa6632" }, material: "Woven label" },
  { id: "red-alert", title: "Red Alert", colourway: { colorName: "Red Alert", colorCode: "#d0342c" }, material: "Woven label" },
  { id: "phlox", title: "Phlox", colourway: { colorName: "Phlox", colorCode: "#692d5d" }, material: "Woven label" },
  { id: "green-jacket", title: "Green Jacket", colourway: { colorName: "Green Jacket", colorCode: "#005d43" }, material: "Woven label" },
  { id: "willow-bough", title: "Willow Bough", colourway: { colorName: "Willow Bough", colorCode: "#59754d" }, material: "Woven label" },
  { id: "super-sonic", title: "Super Sonic", colourway: { colorName: "Super Sonic", colorCode: "#3073b7" }, material: "Woven label" },
  { id: "royal-blue", title: "Royal Blue", colourway: { colorName: "Royal Blue", colorCode: "#3e428b" }, material: "Woven label" },
  { id: "poseidon", title: "Poseidon", colourway: { colorName: "Poseidon", colorCode: "#304561" }, material: "Woven label" },
  { id: "gray-blue", title: "Gray Blue", colourway: { colorName: "Gray Blue", colorCode: "#4e597b" }, material: "Woven label" },
  { id: "gray-flannel", title: "Gray Flannel", colourway: { colorName: "Gray Flannel", colorCode: "#898586" }, material: "Woven label" },
  { id: "volcanic-glass", title: "Volcanic Glass", colourway: { colorName: "Volcanic Glass", colorCode: "#686368" }, material: "Woven label" },
  { id: "blue-blush", title: "Blue Blush", colourway: { colorName: "Blue Blush", colorCode: "#d6dbd9" }, material: "Woven label" },
  { id: "lambs-wool", title: "Lamb's Wool", colourway: { colorName: "Lamb's Wool", colorCode: "#ead4b3" }, material: "Woven label" },
  { id: "argon-oil", title: "Argon Oil", colourway: { colorName: "Argon Oil", colorCode: "#91624d" }, material: "Woven label" },
  { id: "downtown-brown", title: "Downtown Brown", colourway: { colorName: "Downtown Brown", colorCode: "#5e3f32" }, material: "Woven label" },
  { id: "white", title: "White", colourway: { colorName: "White", colorCode: "#ffffff" }, material: "Woven label" },
  { id: "black", title: "Black", colourway: { colorName: "Black", colorCode: "#000000" }, material: "Woven label" },
  { id: "white", title: "White", colourway: { colorName: "White", colorCode: "#ffffff" }, material: "Polyester" },
  { id: "black", title: "Black", colourway: { colorName: "Black", colorCode: "#000000" }, material: "Polyester" },
  { id: "mojave-desert", title: "Mojave Desert", colourway: { colorName: "Mojave Desert", colorCode: "#c7b595" }, material: "Cotton Canvas" },
]

const labelStyleOptions = [
  { id: "inseam-loop-label", title: "Inseam loop label" },
  { id: "label-on-the-back", title: "Label on the back" },
]

const Tag = observer((props: TagProps) => {
  const currentSpecification = specificationStore.currentSpecification as TShirtSpecification;
  const [isLabel, setIsLabel] = useState<boolean>(currentSpecification?.tag?.isLabel || false);
  const [sendLabels, setSendLabels] = useState<boolean>(currentSpecification?.tag?.sendLabels || false);
  const [isCustom, setIsCustom] = useState<boolean>(currentSpecification?.tag?.isCustom || false);
  const [description, setDescription] = useState<Description | undefined>(currentSpecification?.tag?.description || undefined);
  const [material, setMaterial] = useState<string | undefined>(currentSpecification?.tag?.material || "Woven label");
  const [selectedColor, setSelectedColor] = useState<{ colorName: string, colorCode: string } | undefined>(currentSpecification?.tag?.colourway || undefined);
  const [labelStyle, setLabelStyle] = useState<string | undefined>(currentSpecification?.tag?.labelStyle || "Inseam loop label");
  const [labelWidth, setLabelWidth] = useState<number | undefined>(currentSpecification?.tag?.labelWidth || (currentSpecification?.tag?.labelStyle === "Inseam loop label" ? 3 : 4));
  const [labelHeight, setLabelHeight] = useState<number | undefined>(currentSpecification?.tag?.labelHeight || (currentSpecification?.tag?.labelStyle === "Inseam loop label" ? 6 : 3));
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleCancel = () => {
    setIsLabel(currentSpecification?.tag?.isLabel || false);
    setSendLabels(currentSpecification?.tag?.sendLabels || false);
    setDescription(currentSpecification?.tag?.description || undefined);
    setMaterial(currentSpecification?.tag?.material || "Woven label");
    setSelectedColor(currentSpecification?.tag?.colourway || undefined);
    setLabelStyle(currentSpecification?.tag?.labelStyle || "Inseam loop label");
  };

  const handleSaveAndNext = async () => {
    setIsSaving(true);
    await specificationStore.putSpecificationsSpecificationId(currentSpecification?.specificationId || "", {
      ...(props.isUpdateProgress && { progress: "TAG" }),
      tag: {
        is_label: isLabel,
        send_labels: sendLabels,
        is_custom: isCustom,
        ...(isLabel && !sendLabels && { material: material ? material : "" }),
        ...(isLabel && !sendLabels && selectedColor && {
          colourway: {
            color_name: selectedColor?.colorName || "",
            color_code: selectedColor?.colorCode || "",
          }
        }),
        ...(labelStyle && { label_style: labelStyle }),
        ...(isCustom && { label_width: labelWidth }),
        ...(isCustom && { label_height: labelHeight }),
        ...(description && {
          description: {
            description: description?.description || "",
            ...(description?.file && {
              file: {
                name: description?.file?.name || "",
                key: description?.file?.key || "",
              },
            }),
          },
        }),
      }
    });
    specificationStore.updateSpecification({
      ...currentSpecification,
      tag: {
        isLabel: isLabel,
        sendLabels: sendLabels,
        isCustom: isCustom,
        material: material,
        colourway: selectedColor,
        labelStyle: labelStyle,
        description: description,
        labelWidth: labelWidth,
        labelHeight: labelHeight,
      },
    });
    props.callBackUpdateState();
    setIsSaving(false);
  };

  const labelOptionId = !isLabel ? "no-label" : sendLabels ? "i-will-send-labels" : !isCustom ? "standard" : "custom";

  return (
    <>
      <p className="text-sm text-gray-500">
        {currentSpecification.productCode} - {currentSpecification.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Select name tag and size tag</h1>
      <div className="flex gap-6 mt-6">
        <div className="w-3/10 flex flex-col gap-y-8">
          <fieldset className={`${isLabel && !sendLabels ? "pb-8 border-b border-gray-200" : ""}`}>
            <legend className="text-sm/6 font-semibold text-gray-900">Select a label option</legend>
            <div className="mt-4 space-y-2">
              {labelOptions.map((labelOption) => (
                <div key={labelOption.id} className="flex items-center">
                  <input
                    defaultChecked={labelOptionId === labelOption.id}
                    id={labelOption.id}
                    name="label-option"
                    type="radio"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                    onChange={() => {
                      setIsLabel(labelOption.id !== "no-label");
                      setSendLabels(labelOption.id === "i-will-send-labels");
                      setIsCustom(labelOption.id === "custom");
                      if (labelOption.id === "no-label" || labelOption.id === "i-will-send-labels") {
                        setMaterial("Woven label");
                        setSelectedColor(undefined);
                      }
                      if (labelOption.id !== "custom") {
                        setLabelWidth(3);
                        setLabelHeight(6);
                      }
                    }}
                  />
                  <label htmlFor={labelOption.id} className="ml-3 block text-sm/6 font-medium text-gray-900">
                    {labelOption.title}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
          {isLabel && !sendLabels &&
            <fieldset className="pb-8 border-b border-gray-200">
              <legend className="text-sm/6 font-semibold text-gray-900">Choose the material</legend>
              <div className="mt-4 space-y-2">
                {materialOptions.map((materialOption) => (
                  <div key={materialOption.id} className="flex items-center">
                    <input
                      id={materialOption.id}
                      checked={materialOption.title === material}
                      name="material-option"
                      type="radio"
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                      onChange={() => {
                        setMaterial(materialOption.title);
                        setSelectedColor(undefined);
                      }}
                    />
                    <label htmlFor={materialOption.id} className="ml-3 block text-sm/6 font-medium text-gray-900">
                      {materialOption.title}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          }
          {isLabel && !sendLabels &&
            <fieldset>
              <legend className="text-sm/6 font-semibold text-gray-900">Choose the label color</legend>
              <RadioGroup
                value={selectedColor?.colorName || ""}
                onChange={(value) => {
                  const option = labelColorOptions.find(opt => opt.title === value);
                  if (option) {
                    setSelectedColor({
                      colorName: option.colourway.colorName,
                      colorCode: option.colourway.colorCode
                    });
                  }
                }}
                className="mt-4 flex flex-wrap gap-3"
              >
                {labelColorOptions
                  .filter(option => option.material === (material || "Woven label"))
                  .map((option) => (
                    <Radio
                      key={option.id}
                      value={option.title}
                      aria-label={option.title}
                      className="group relative"
                    >
                      <div className="relative group">
                        <span
                          className={`block size-8 rounded-full border border-black/20 cursor-pointer ${option.colourway.colorCode === selectedColor?.colorCode ? "ring-2 ring-offset-2 data-[state=checked]:ring-2 data-[state=checked]:ring-offset-2" : "ring-0"}`}
                          style={{
                            backgroundColor: option.colourway.colorCode,
                            "--tw-ring-color": option.id === "white" ? "#6b7280" : option.colourway.colorCode
                          } as React.CSSProperties}
                        />
                        <div className="absolute z-10 top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-blue-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          <div>{option.title}</div>
                          <div>{option.colourway.colorCode}</div>
                        </div>
                      </div>
                    </Radio>
                  ))}
              </RadioGroup>
            </fieldset>
          }
        </div>
        <div className="w-7/10">
          {isLabel && !sendLabels &&
            <>
              <fieldset className="mb-8">
                <legend className="text-sm/6 font-semibold text-gray-900">Select a label option</legend>
                <div className="mt-4 space-y-2">
                  {labelStyleOptions.map((labelStyleOption) => (
                    <div key={labelStyleOption.id} className="flex items-center">
                      <input
                        defaultChecked={(labelStyle || "Inseam loop label") === labelStyleOption.title}
                        id={labelStyleOption.id}
                        name="label-style-option"
                        type="radio"
                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                        onChange={() => {
                          setLabelStyle(labelStyleOption.title);
                          if (labelStyleOption.title === "Inseam loop label") {
                            setLabelWidth(3);
                            setLabelHeight(6);
                          } else if (labelStyleOption.title === "Label on the back") {
                            setLabelWidth(4);
                            setLabelHeight(3);
                          }
                        }}
                      />
                      <label htmlFor={labelStyleOption.id} className="ml-3 block text-sm/6 font-medium text-gray-900">
                        {labelStyleOption.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <div className="flex items-start gap-6 mb-8">
                {labelStyle === "Inseam loop label" && <div className="w-1/2 flex justify-center">
                  <div className="relative">
                    <img src="/t-shirt_tag.png" />
                  </div>
                </div>}
                {labelStyle === "Label on the back" && <div className="w-1/2 flex justify-center">
                  <div className="relative">
                    <img src="/t-shirt_tag_horizontal.png" />
                  </div>
                </div>}
                {labelStyle === "Inseam loop label" && <div className="w-1/2 flex justify-center">
                  <div className="relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[calc(100%+2px)] flex items-center gap-2">
                      <input
                        // type="number"
                        // min="1"
                        // max="9"
                        value={labelWidth || ""}
                        onChange={(e) => setLabelWidth(Number(e.target.value))}
                        className={"w-12 rounded-md bg-white px-2 py-1 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 disabled:bg-gray-100 disabled:text-gray-500 text-center"}
                        disabled={!isCustom}
                      />
                      <span className="text-sm">cm</span>
                    </div>
                    <div className="absolute top-1/2 right-0 transform translate-x-[calc(100%+2px)] -translate-y-1/2 flex items-center gap-2">
                      <input
                        // type="number"
                        // min="1"
                        // max="9"
                        value={labelHeight || ""}
                        onChange={(e) => setLabelHeight(Number(e.target.value))}
                        className={"w-12 rounded-md bg-white px-2 py-1 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 disabled:bg-gray-100 disabled:text-gray-500 text-center"}
                        disabled={!isCustom}
                      />
                      <span className="text-sm">cm</span>
                    </div>
                    <img src="/tag_size.svg" />
                  </div>
                </div>}
                {labelStyle === "Label on the back" && <div className="w-1/2 flex justify-center">
                  <div className="relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[calc(100%+2px)] flex items-center gap-2">
                      <input
                        // type="number"
                        // min="1"
                        // max="9"
                        value={labelWidth || ""}
                        onChange={(e) => setLabelWidth(Number(e.target.value))}
                        className={"w-12 rounded-md bg-white px-2 py-1 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 disabled:bg-gray-100 disabled:text-gray-500 text-center"}
                        disabled={!isCustom}
                      />
                      <span className="text-sm">cm</span>
                    </div>
                    <div className="absolute top-1/2 right-0 transform translate-x-[calc(100%+2px)] -translate-y-1/2 flex items-center gap-2">
                      <input
                        // type="number"
                        // min="1"
                        // max="9"
                        value={labelHeight || ""}
                        onChange={(e) => setLabelHeight(Number(e.target.value))}
                        className={"w-12 rounded-md bg-white px-2 py-1 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 disabled:bg-gray-100 disabled:text-gray-500 text-center"}
                        disabled={!isCustom}
                      />
                      <span className="text-sm">cm</span>
                    </div>
                    <img src="/tag_size_horizontal.svg" />
                  </div>
                </div>}
              </div>
            </>
          }
          <DescriptionWithFile
            specificationId={currentSpecification?.specificationId || ""}
            description={description || { description: "", file: undefined }}
            onDescriptionChange={setDescription}
            onSave={() => { }}
          />
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
          loadingText="Saving..."
          loading={isSaving}
          style={"fill"}
          fullWidth={false}
        />
      </div>
    </>
  );
});

export default Tag;
