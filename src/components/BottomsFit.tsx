import { specificationStore } from "@/stores/specificationStore";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { BottomsSpecification, SizeValue } from "@/lib/type/specification/bottoms/type";
import Button from "@/components/Button";

type BottomsFitProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
};

const BottomsFit = observer((props: BottomsFitProps) => {

  const currentSpecification = specificationStore.currentSpecification as BottomsSpecification;
  const [totalLength, setTotalLength] = useState<SizeValue>(currentSpecification?.fit?.totalLength || { xs: "", s: "", m: "", l: "", xl: "" });
  const [waist, setWaist] = useState<SizeValue>(currentSpecification?.fit?.waist || { xs: "", s: "", m: "", l: "", xl: "" });
  const [rise, setRise] = useState<SizeValue>(currentSpecification?.fit?.rise || { xs: "", s: "", m: "", l: "", xl: "" });
  const [inseam, setInseam] = useState<SizeValue>(currentSpecification?.fit?.inseam || { xs: "", s: "", m: "", l: "", xl: "" });
  const [hip, setHip] = useState<SizeValue>(currentSpecification?.fit?.hip || { xs: "", s: "", m: "", l: "", xl: "" });
  const [aroundTheThigh, setAroundTheThigh] = useState<SizeValue>(currentSpecification?.fit?.aroundTheThigh || { xs: "", s: "", m: "", l: "", xl: "" });
  const [aroundTheKnee, setAroundTheKnee] = useState<SizeValue>(currentSpecification?.fit?.aroundTheKnee || { xs: "", s: "", m: "", l: "", xl: "" });
  const [hemWidth, setHemWidth] = useState<SizeValue>(currentSpecification?.fit?.hemWidth || { xs: "", s: "", m: "", l: "", xl: "" });
  const [aroundTheHem, setAroundTheHem] = useState<SizeValue>(currentSpecification?.fit?.aroundTheHem || { xs: "", s: "", m: "", l: "", xl: "" });
  const [isSaving, setIsSaving] = useState(false);

  const handleTotalLengthChange = (size: keyof SizeValue, value: string) => {
    setTotalLength(prev => ({
      ...prev,
      [size]: value
    }));
  };

  const handleWaistChange = (size: keyof SizeValue, value: string) => {
    setWaist(prev => ({
      ...prev,
      [size]: value
    }));
  };

  const handleRiseChange = (size: keyof SizeValue, value: string) => {
    setRise(prev => ({
      ...prev,
      [size]: value
    }));
  };

  const handleInseamChange = (size: keyof SizeValue, value: string) => {
    setInseam(prev => ({
      ...prev,
      [size]: value
    }));
  };

  const handleHipChange = (size: keyof SizeValue, value: string) => {
    setHip(prev => ({
      ...prev,
      [size]: value
    }));
  };

  const handleAroundTheThighChange = (size: keyof SizeValue, value: string) => {
    setAroundTheThigh(prev => ({
      ...prev,
      [size]: value
    }));
  };

  const handleAroundTheKneeChange = (size: keyof SizeValue, value: string) => {
    setAroundTheKnee(prev => ({
      ...prev,
      [size]: value
    }));
  };

  const handleHemWidthChange = (size: keyof SizeValue, value: string) => {
    setHemWidth(prev => ({
      ...prev,
      [size]: value
    }));
  };

  const handleAroundTheHemChange = (size: keyof SizeValue, value: string) => {
    setAroundTheHem(prev => ({
      ...prev,
      [size]: value
    }));
  };

  const handleCancel = () => {
    setTotalLength(currentSpecification?.fit?.totalLength || { xs: "", s: "", m: "", l: "", xl: "" });
    setWaist(currentSpecification?.fit?.waist || { xs: "", s: "", m: "", l: "", xl: "" });
    setRise(currentSpecification?.fit?.rise || { xs: "", s: "", m: "", l: "", xl: "" });
    setInseam(currentSpecification?.fit?.inseam || { xs: "", s: "", m: "", l: "", xl: "" });
    setHip(currentSpecification?.fit?.hip || { xs: "", s: "", m: "", l: "", xl: "" });
    setAroundTheThigh(currentSpecification?.fit?.aroundTheThigh || { xs: "", s: "", m: "", l: "", xl: "" });
    setAroundTheKnee(currentSpecification?.fit?.aroundTheKnee || { xs: "", s: "", m: "", l: "", xl: "" });
    setHemWidth(currentSpecification?.fit?.hemWidth || { xs: "", s: "", m: "", l: "", xl: "" });
    setAroundTheHem(currentSpecification?.fit?.aroundTheHem || { xs: "", s: "", m: "", l: "", xl: "" });
  };

  const handleSaveAndNext = async () => {
    setIsSaving(true);
    await specificationStore.putSpecificationsSpecificationId(currentSpecification.specificationId, {
      ...(props.isUpdateProgress && { progress: "FIT" }),
      fit: {
        total_length: totalLength,
        waist: waist,
        rise: rise,
        inseam: inseam,
        hip: hip,
        around_the_thigh: aroundTheThigh,
        around_the_knee: aroundTheKnee,
        hem_width: hemWidth,
        around_the_hem: aroundTheHem,
      },
    });
    specificationStore.updateSpecification({
      fit: {
        totalLength: totalLength,
        waist: waist,
        rise: rise,
        inseam: inseam,
        hip: hip,
        aroundTheThigh: aroundTheThigh,
        aroundTheKnee: aroundTheKnee,
        hemWidth: hemWidth,
        aroundTheHem: aroundTheHem,
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
            <div className="flex gap-2 items-center">
              {/* total length */}
              <label className="block w-32 text-left text-sm font-medium text-gray-700">Total Length</label>
              <input
                type="text"
                placeholder="xs"
                value={totalLength.xs}
                onChange={(e) => handleTotalLengthChange('xs', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="s"
                value={totalLength.s}
                onChange={(e) => handleTotalLengthChange('s', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="m"
                value={totalLength.m}
                onChange={(e) => handleTotalLengthChange('m', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="l"
                value={totalLength.l}
                onChange={(e) => handleTotalLengthChange('l', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="xl"
                value={totalLength.xl}
                onChange={(e) => handleTotalLengthChange('xl', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
            </div>
            {/* waist */}
            <div className="flex gap-2 items-center">
              <label className="block w-32 text-left text-sm font-medium text-gray-700">Waist</label>
              <input
                type="text"
                placeholder="xs"
                value={waist.xs}
                onChange={(e) => handleWaistChange('xs', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="s"
                value={waist.s}
                onChange={(e) => handleWaistChange('s', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="m"
                value={waist.m}
                onChange={(e) => handleWaistChange('m', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="l"
                value={waist.l}
                onChange={(e) => handleWaistChange('l', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="xl"
                value={waist.xl}
                onChange={(e) => handleWaistChange('xl', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
            </div>
            {/* rise */}
            <div className="flex gap-2 items-center">
              <label className="block w-32 text-left text-sm font-medium text-gray-700">Rise</label>
              <input
                type="text"
                placeholder="xs"
                value={rise.xs}
                onChange={(e) => handleRiseChange('xs', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="s"
                value={rise.s}
                onChange={(e) => handleRiseChange('s', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="m"
                value={rise.m}
                onChange={(e) => handleRiseChange('m', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="l"
                value={rise.l}
                onChange={(e) => handleRiseChange('l', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="xl"
                value={rise.xl}
                onChange={(e) => handleRiseChange('xl', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
            </div>
            {/* inseam */}
            <div className="flex gap-2 items-center">
              <label className="block w-32 text-left text-sm font-medium text-gray-700">Inseam</label>
              <input
                type="text"
                placeholder="xs"
                value={inseam.xs}
                onChange={(e) => handleInseamChange('xs', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="s"
                value={inseam.s}
                onChange={(e) => handleInseamChange('s', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="m"
                value={inseam.m}
                onChange={(e) => handleInseamChange('m', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="l"
                value={inseam.l}
                onChange={(e) => handleInseamChange('l', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="xl"
                value={inseam.xl}
                onChange={(e) => handleInseamChange('xl', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
            </div>
            {/* hip */}
            <div className="flex gap-2 items-center">
              <label className="block w-32 text-left text-sm font-medium text-gray-700">Hip</label>
              <input
                type="text"
                placeholder="xs"
                value={hip.xs}
                onChange={(e) => handleHipChange('xs', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="s"
                value={hip.s}
                onChange={(e) => handleHipChange('s', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="m"
                value={hip.m}
                onChange={(e) => handleHipChange('m', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="l"
                value={hip.l}
                onChange={(e) => handleHipChange('l', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="xl"
                value={hip.xl}
                onChange={(e) => handleHipChange('xl', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
            </div>
            {/* around the thigh */}
            <div className="flex gap-2 items-center">
              <label className="block w-32 text-left text-sm font-medium text-gray-700">Around the Thigh</label>
              <input
                type="text"
                placeholder="xs"
                value={aroundTheThigh.xs}
                onChange={(e) => handleAroundTheThighChange('xs', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="s"
                value={aroundTheThigh.s}
                onChange={(e) => handleAroundTheThighChange('s', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="m"
                value={aroundTheThigh.m}
                onChange={(e) => handleAroundTheThighChange('m', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="l"
                value={aroundTheThigh.l}
                onChange={(e) => handleAroundTheThighChange('l', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="xl"
                value={aroundTheThigh.xl}
                onChange={(e) => handleAroundTheThighChange('xl', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
            </div>
            {/* around the knee */}
            <div className="flex gap-2 items-center">
              <label className="block w-32 text-left text-sm font-medium text-gray-700">Around the Knee</label>
              <input
                type="text"
                placeholder="xs"
                value={aroundTheKnee.xs}
                onChange={(e) => handleAroundTheKneeChange('xs', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="s"
                value={aroundTheKnee.s}
                onChange={(e) => handleAroundTheKneeChange('s', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="m"
                value={aroundTheKnee.m}
                onChange={(e) => handleAroundTheKneeChange('m', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="l"
                value={aroundTheKnee.l}
                onChange={(e) => handleAroundTheKneeChange('l', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="xl"
                value={aroundTheKnee.xl}
                onChange={(e) => handleAroundTheKneeChange('xl', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
            </div>
            {/* hem width */}
            <div className="flex gap-2 items-center">
              <label className="block w-32 text-left text-sm font-medium text-gray-700">Hem Width</label>
              <input
                type="text"
                placeholder="xs"
                value={hemWidth.xs}
                onChange={(e) => handleHemWidthChange('xs', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="s"
                value={hemWidth.s}
                onChange={(e) => handleHemWidthChange('s', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="m"
                value={hemWidth.m}
                onChange={(e) => handleHemWidthChange('m', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="l"
                value={hemWidth.l}
                onChange={(e) => handleHemWidthChange('l', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="xl"
                value={hemWidth.xl}
                onChange={(e) => handleHemWidthChange('xl', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
            </div>
            {/* around the hem */}
            <div className="flex gap-2 items-center">
              <label className="block w-32 text-left text-sm font-medium text-gray-700">Around the Hem</label>
              <input
                type="text"
                placeholder="xs"
                value={aroundTheHem.xs}
                onChange={(e) => handleAroundTheHemChange('xs', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="s"
                value={aroundTheHem.s}
                onChange={(e) => handleAroundTheHemChange('s', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="m"
                value={aroundTheHem.m}
                onChange={(e) => handleAroundTheHemChange('m', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="l"
                value={aroundTheHem.l}
                onChange={(e) => handleAroundTheHemChange('l', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              <input
                type="text"
                placeholder="xl"
                value={aroundTheHem.xl}
                onChange={(e) => handleAroundTheHemChange('xl', e.target.value)}
                className="block w-12 rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
            </div>
          </div>
          <img src="/bottoms.jpg" alt="bottoms-fit" className="w-90" />
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

export default BottomsFit;