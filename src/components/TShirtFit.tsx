import Button from "@/components/Button";
import { SizeValue } from "@/lib/type";
import { specificationStore } from "@/stores/specificationStore";
import { tenantStore } from "@/stores/tenantStore";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

type TShirtFitProps = {
  callBackUpdateState: () => void;
};

const TShirtFit = observer((props: TShirtFitProps) => {
  const [totalLength, setTotalLength] = useState<SizeValue>({ xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
  const [chestWidth, setChestWidth] = useState<SizeValue>({ xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
  const [bottomWidth, setBottomWidth] = useState<SizeValue>({ xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
  const [sleeveLength, setSleeveLength] = useState<SizeValue>({ xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
  const [armhole, setArmhole] = useState<SizeValue>({ xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
  const [sleeveOpening, setSleeveOpening] = useState<SizeValue>({ xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
  const [neckRibLength, setNeckRibLength] = useState<SizeValue>({ xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
  const [neckOpening, setNeckOpening] = useState<SizeValue>({ xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
  const [shoulderToShoulder, setShoulderToShoulder] = useState<SizeValue>({ xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchSettingsFit = async () => {
      if (mounted) {
        await tenantStore.fetchTenantSettingsTShirtFit();
        if (specificationStore.currentSpecification.fit) {
          setTotalLength(specificationStore.currentSpecification.fit.totalLength);
          setChestWidth(specificationStore.currentSpecification.fit.chestWidth);
          setBottomWidth(specificationStore.currentSpecification.fit.bottomWidth);
          setSleeveLength(specificationStore.currentSpecification.fit.sleeveLength);
          setArmhole(specificationStore.currentSpecification.fit.armhole);
          setSleeveOpening(specificationStore.currentSpecification.fit.sleeveOpening);
          setNeckRibLength(specificationStore.currentSpecification.fit.neckRibLength);
          setNeckOpening(specificationStore.currentSpecification.fit.neckOpening);
          setShoulderToShoulder(specificationStore.currentSpecification.fit.shoulderToShoulder);
        } else {
          setTotalLength(tenantStore.tenantSettingsTShirtFit.fits[0].totalLength);
          setChestWidth(tenantStore.tenantSettingsTShirtFit.fits[0].chestWidth);
          setBottomWidth(tenantStore.tenantSettingsTShirtFit.fits[0].bottomWidth);
          setSleeveLength(tenantStore.tenantSettingsTShirtFit.fits[0].sleeveLength);
          setArmhole(tenantStore.tenantSettingsTShirtFit.fits[0].armhole);
          setSleeveOpening(tenantStore.tenantSettingsTShirtFit.fits[0].sleeveOpening);
          setNeckRibLength(tenantStore.tenantSettingsTShirtFit.fits[0].neckRibLength);
          setNeckOpening(tenantStore.tenantSettingsTShirtFit.fits[0].neckOpening);
          setShoulderToShoulder(tenantStore.tenantSettingsTShirtFit.fits[0].shoulderToShoulder);
        }
      }
    };
    fetchSettingsFit();
  }, [mounted]);

  const handleTotalLengthChange = (size: keyof SizeValue, value: string) => {
    setTotalLength(prev => ({
      ...prev,
      [size]: value
    }));
  };

  const handleChestWidthChange = (size: keyof SizeValue, value: string) => {
    setChestWidth(prev => ({
      ...prev,
      [size]: value
    }));
  };

  const handleBottomWidthChange = (size: keyof SizeValue, value: string) => {
    setBottomWidth(prev => ({
      ...prev,
      [size]: value
    }));
  };

  const handleSleeveLengthChange = (size: keyof SizeValue, value: string) => {
    setSleeveLength(prev => ({
      ...prev,
      [size]: value
    }));
  };

  const handleArmholeChange = (size: keyof SizeValue, value: string) => {
    setArmhole(prev => ({
      ...prev,
      [size]: value
    }));
  };

  const handleSleeveOpeningChange = (size: keyof SizeValue, value: string) => {
    setSleeveOpening(prev => ({
      ...prev,
      [size]: value
    }));
  };

  const handleNeckRibLengthChange = (size: keyof SizeValue, value: string) => {
    setNeckRibLength(prev => ({
      ...prev,
      [size]: value
    }));
  };

  const handleNeckOpeningChange = (size: keyof SizeValue, value: string) => {
    setNeckOpening(prev => ({
      ...prev,
      [size]: value
    }));
  };

  const handleShoulderToShoulderChange = (size: keyof SizeValue, value: string) => {
    setShoulderToShoulder(prev => ({
      ...prev,
      [size]: value
    }));
  };

  const handleSaveAndNext = () => {
    specificationStore.putSpecification({
      progress: "FIT",
      fit: {
        total_length: totalLength,
        chest_width: chestWidth,
        bottom_width: bottomWidth,
        sleeve_length: sleeveLength,
        armhole: armhole,
        sleeve_opening: sleeveOpening,
        neck_rib_length: neckRibLength,
        neck_opening: neckOpening,
        shoulder_to_shoulder: shoulderToShoulder,
      }
    });
    specificationStore.currentSpecification.progress = "FIT";
    specificationStore.currentSpecification.fit = {
      totalLength: totalLength,
      chestWidth: chestWidth,
      bottomWidth: bottomWidth,
      sleeveLength: sleeveLength,
      armhole: armhole,
      sleeveOpening: sleeveOpening,
      neckRibLength: neckRibLength,
      neckOpening: neckOpening,
      shoulderToShoulder: shoulderToShoulder,
    };
    props.callBackUpdateState();
  };

  return (
    <>
      <p className="text-sm text-gray-500">
        {specificationStore.currentSpecification.productCode} - {specificationStore.currentSpecification.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Fill in the size chart</h1>
      {/* メインコンテンツ */}
      <div className="space-y-6">
      <div>
          <div className="grid grid-cols-8 gap-2 mt-4 items-center">
            <div className="col-span-1"></div>
            <label className="block text-center text-xs font-medium text-gray-700">XXS</label>
            <label className="block text-center text-xs font-medium text-gray-700">XS</label>
            <label className="block text-center text-xs font-medium text-gray-700">S</label>
            <label className="block text-center text-xs font-medium text-gray-700">M</label>
            <label className="block text-center text-xs font-medium text-gray-700">L</label>
            <label className="block text-center text-xs font-medium text-gray-700">XL</label>
            <label className="block text-center text-xs font-medium text-gray-700">XXL</label>
          </div>
        </div>
        {/* Total Length */}
        <div>
          <div className="grid grid-cols-8 gap-2 mb-2 items-center">
            <label className="block text-left text-sm font-medium text-gray-700">Total Length</label>
            <input
              type="text"
              placeholder="xxs"
              value={totalLength.xxs}
              onChange={(e) => handleTotalLengthChange('xxs', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xs"
              value={totalLength.xs}
              onChange={(e) => handleTotalLengthChange('xs', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="s"
              value={totalLength.s}
              onChange={(e) => handleTotalLengthChange('s', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="m"
              value={totalLength.m}
              onChange={(e) => handleTotalLengthChange('m', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="l"
              value={totalLength.l}
              onChange={(e) => handleTotalLengthChange('l', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xl"
              value={totalLength.xl}
              onChange={(e) => handleTotalLengthChange('xl', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xxl"
              value={totalLength.xxl}
              onChange={(e) => handleTotalLengthChange('xxl', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {/* Chest Width */}
        <div>
          <div className="grid grid-cols-8 gap-2 mb-2 items-center">
            <label className="block text-left text-sm font-medium text-gray-700">Chest Width</label>
            <input
              type="text"
              placeholder="xxs"
              value={chestWidth.xxs}
              onChange={(e) => handleChestWidthChange('xxs', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xs"
              value={chestWidth.xs}
              onChange={(e) => handleChestWidthChange('xs', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="s"
              value={chestWidth.s}
              onChange={(e) => handleChestWidthChange('s', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="m"
              value={chestWidth.m}
              onChange={(e) => handleChestWidthChange('m', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="l"
              value={chestWidth.l}
              onChange={(e) => handleChestWidthChange('l', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xl"
              value={chestWidth.xl}
              onChange={(e) => handleChestWidthChange('xl', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xxl"
              value={chestWidth.xxl}
              onChange={(e) => handleChestWidthChange('xxl', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {/* Bottom Width */}
        <div>
          <div className="grid grid-cols-8 gap-2 mb-2 items-center">
            <label className="block text-left text-sm font-medium text-gray-700">Bottom Width</label>
            <input
              type="text"
              placeholder="xxs"
              value={bottomWidth.xxs}
              onChange={(e) => handleBottomWidthChange('xxs', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xs"
              value={bottomWidth.xs}
              onChange={(e) => handleBottomWidthChange('xs', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="s"
              value={bottomWidth.s}
              onChange={(e) => handleBottomWidthChange('s', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="m"
              value={bottomWidth.m}
              onChange={(e) => handleBottomWidthChange('m', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="l"
              value={bottomWidth.l}
              onChange={(e) => handleBottomWidthChange('l', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xl"
              value={bottomWidth.xl}
              onChange={(e) => handleBottomWidthChange('xl', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xxl"
              value={bottomWidth.xxl}
              onChange={(e) => handleBottomWidthChange('xxl', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {/* Sleeve Length */}
        <div>
          <div className="grid grid-cols-8 gap-2 mb-2 items-center">
            <label className="block text-left text-sm font-medium text-gray-700">Sleeve Length</label>
            <input
              type="text"
              placeholder="xxs"
              value={sleeveLength.xxs}
              onChange={(e) => handleSleeveLengthChange('xxs', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xs"
              value={sleeveLength.xs}
              onChange={(e) => handleSleeveLengthChange('xs', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="s"
              value={sleeveLength.s}
              onChange={(e) => handleSleeveLengthChange('s', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="m"
              value={sleeveLength.m}
              onChange={(e) => handleSleeveLengthChange('m', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="l"
              value={sleeveLength.l}
              onChange={(e) => handleSleeveLengthChange('l', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xl"
              value={sleeveLength.xl}
              onChange={(e) => handleSleeveLengthChange('xl', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xxl"
              value={sleeveLength.xxl}
              onChange={(e) => handleSleeveLengthChange('xxl', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {/* Armhole */}
        <div>
          <div className="grid grid-cols-8 gap-2 mb-2 items-center">
            <label className="block text-left text-sm font-medium text-gray-700">Armhole</label>
            <input
              type="text"
              placeholder="xxs"
              value={armhole.xxs}
              onChange={(e) => handleArmholeChange('xxs', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xs"
              value={armhole.xs}
              onChange={(e) => handleArmholeChange('xs', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="s"
              value={armhole.s}
              onChange={(e) => handleArmholeChange('s', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="m"
              value={armhole.m}
              onChange={(e) => handleArmholeChange('m', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="l"
              value={armhole.l}
              onChange={(e) => handleArmholeChange('l', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xl"
              value={armhole.xl}
              onChange={(e) => handleArmholeChange('xl', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xxl"
              value={armhole.xxl}
              onChange={(e) => handleArmholeChange('xxl', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {/* Sleeve Opening */}
        <div>
          <div className="grid grid-cols-8 gap-2 mb-2 items-center">
            <label className="block text-left text-sm font-medium text-gray-700">Sleeve Opening</label>
            <input
              type="text"
              placeholder="xxs"
              value={sleeveOpening.xxs}
              onChange={(e) => handleSleeveOpeningChange('xxs', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xs"
              value={sleeveOpening.xs}
              onChange={(e) => handleSleeveOpeningChange('xs', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="s"
              value={sleeveOpening.s}
              onChange={(e) => handleSleeveOpeningChange('s', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="m"
              value={sleeveOpening.m}
              onChange={(e) => handleSleeveOpeningChange('m', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="l"
              value={sleeveOpening.l}
              onChange={(e) => handleSleeveOpeningChange('l', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xl"
              value={sleeveOpening.xl}
              onChange={(e) => handleSleeveOpeningChange('xl', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xxl"
              value={sleeveOpening.xxl}
              onChange={(e) => handleSleeveOpeningChange('xxl', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {/* Neck Rib Length */}
        <div>
          <div className="grid grid-cols-8 gap-2 mb-2 items-center">
            <label className="block text-left text-sm font-medium text-gray-700">Neck Rib Length</label>
            <input
              type="text"
              placeholder="xxs"
              value={neckRibLength.xxs}
              onChange={(e) => handleNeckRibLengthChange('xxs', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xs"
              value={neckRibLength.xs}
              onChange={(e) => handleNeckRibLengthChange('xs', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="s"
              value={neckRibLength.s}
              onChange={(e) => handleNeckRibLengthChange('s', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="m"
              value={neckRibLength.m}
              onChange={(e) => handleNeckRibLengthChange('m', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="l"
              value={neckRibLength.l}
              onChange={(e) => handleNeckRibLengthChange('l', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xl"
              value={neckRibLength.xl}
              onChange={(e) => handleNeckRibLengthChange('xl', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xxl"
              value={neckRibLength.xxl}
              onChange={(e) => handleNeckRibLengthChange('xxl', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {/* Neck Opening */}
        <div>
          <div className="grid grid-cols-8 gap-2 mb-2 items-center">
            <label className="block text-left text-sm font-medium text-gray-700">Neck Opening</label>
            <input
              type="text"
              placeholder="xxs"
              value={neckOpening.xxs}
              onChange={(e) => handleNeckOpeningChange('xxs', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xs"
              value={neckOpening.xs}
              onChange={(e) => handleNeckOpeningChange('xs', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="s"
              value={neckOpening.s}
              onChange={(e) => handleNeckOpeningChange('s', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="m"
              value={neckOpening.m}
              onChange={(e) => handleNeckOpeningChange('m', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="l"
              value={neckOpening.l}
              onChange={(e) => handleNeckOpeningChange('l', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xl"
              value={neckOpening.xl}
              onChange={(e) => handleNeckOpeningChange('xl', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xxl"
              value={neckOpening.xxl}
              onChange={(e) => handleNeckOpeningChange('xxl', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {/* Shoulder to Shoulder */}
        <div>
          <div className="grid grid-cols-8 gap-2">
            <label className="block text-left text-sm font-medium text-gray-700">Shoulder to Shoulder</label>
            <input
              type="text"
              placeholder="xxs"
              value={shoulderToShoulder.xxs}
              onChange={(e) => handleShoulderToShoulderChange('xxs', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xs"
              value={shoulderToShoulder.xs}
              onChange={(e) => handleShoulderToShoulderChange('xs', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="s"
              value={shoulderToShoulder.s}
              onChange={(e) => handleShoulderToShoulderChange('s', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="m"
              value={shoulderToShoulder.m}
              onChange={(e) => handleShoulderToShoulderChange('m', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="l"
              value={shoulderToShoulder.l}
              onChange={(e) => handleShoulderToShoulderChange('l', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xl"
              value={shoulderToShoulder.xl}
              onChange={(e) => handleShoulderToShoulderChange('xl', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="text"
              placeholder="xxl"
              value={shoulderToShoulder.xxl}
              onChange={(e) => handleShoulderToShoulderChange('xxl', e.target.value)}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
      </div>


      {/* ボタン */}
      <div className="mt-6 flex flex-row gap-x-3 justify-end">
        <Button
          type={"button"}
          onClick={() => { }}
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
});

export default TShirtFit;
