import Button from "@/components/Button";
import { SizeValue } from "@/lib/type";
import { specificationStore } from "@/stores/specificationStore";
import { tenantStore } from "@/stores/tenantStore";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { TrashIcon, PaperClipIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { PostImagesInteractor } from "@/interactor/PostImagesInteractor";
import { Description } from "@/lib/type/specification/type";
import { dialogStore } from "@/stores/dialogStore";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type TShirtFitProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
};

const TShirtFit = observer((props: TShirtFitProps) => {

  const [totalLength, setTotalLength] = useState<SizeValue>(specificationStore.currentSpecification.tshirt?.fit?.totalLength || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
  const [chestWidth, setChestWidth] = useState<SizeValue>(specificationStore.currentSpecification.tshirt?.fit?.chestWidth || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
  const [bottomWidth, setBottomWidth] = useState<SizeValue>(specificationStore.currentSpecification.tshirt?.fit?.bottomWidth || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
  const [sleeveLength, setSleeveLength] = useState<SizeValue>(specificationStore.currentSpecification.tshirt?.fit?.sleeveLength || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
  const [armhole, setArmhole] = useState<SizeValue>(specificationStore.currentSpecification.tshirt?.fit?.armhole || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
  const [sleeveOpening, setSleeveOpening] = useState<SizeValue>(specificationStore.currentSpecification.tshirt?.fit?.sleeveOpening || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
  const [neckRibLength, setNeckRibLength] = useState<SizeValue>(specificationStore.currentSpecification.tshirt?.fit?.neckRibLength || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
  const [neckOpening, setNeckOpening] = useState<SizeValue>(specificationStore.currentSpecification.tshirt?.fit?.neckOpening || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
  const [shoulderToShoulder, setShoulderToShoulder] = useState<SizeValue>(specificationStore.currentSpecification.tshirt?.fit?.shoulderToShoulder || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
  const [description, setDescription] = useState<Description>(specificationStore.currentSpecification.tshirt?.fit?.description || {
    description: "",
    file: {
      name: "",
      key: "",
      preSignedUrl: {
        get: "",
        put: "",
        delete: "",
      },
    },
  });
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [fileUploading, setFileUploading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchSettingsFit = async () => {
      await tenantStore.fetchTenantSettingsTShirtFit();
      if (mounted) {
        if (specificationStore.currentSpecification.tshirt?.fit) {
          setTotalLength(specificationStore.currentSpecification.tshirt.fit.totalLength);
          setChestWidth(specificationStore.currentSpecification.tshirt.fit.chestWidth);
          setBottomWidth(specificationStore.currentSpecification.tshirt.fit.bottomWidth);
          setSleeveLength(specificationStore.currentSpecification.tshirt.fit.sleeveLength);
          setArmhole(specificationStore.currentSpecification.tshirt.fit.armhole);
          setSleeveOpening(specificationStore.currentSpecification.tshirt.fit.sleeveOpening);
          setNeckRibLength(specificationStore.currentSpecification.tshirt.fit.neckRibLength);
          setNeckOpening(specificationStore.currentSpecification.tshirt.fit.neckOpening);
          setShoulderToShoulder(specificationStore.currentSpecification.tshirt.fit.shoulderToShoulder);
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

  const handleCancel = () => {
    setTotalLength(specificationStore.currentSpecification.tshirt?.fit?.totalLength || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
    setChestWidth(specificationStore.currentSpecification.tshirt?.fit?.chestWidth || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
    setBottomWidth(specificationStore.currentSpecification.tshirt?.fit?.bottomWidth || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
    setSleeveLength(specificationStore.currentSpecification.tshirt?.fit?.sleeveLength || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
    setArmhole(specificationStore.currentSpecification.tshirt?.fit?.armhole || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
    setSleeveOpening(specificationStore.currentSpecification.tshirt?.fit?.sleeveOpening || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
    setNeckRibLength(specificationStore.currentSpecification.tshirt?.fit?.neckRibLength || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
    setNeckOpening(specificationStore.currentSpecification.tshirt?.fit?.neckOpening || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
    setShoulderToShoulder(specificationStore.currentSpecification.tshirt?.fit?.shoulderToShoulder || { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
    setDescription(specificationStore.currentSpecification.tshirt?.fit?.description || {
      description: "",
      file: {
        name: "",
        key: "",
      },
    });
  }

  const handleSaveAndNext = () => {
    specificationStore.putSpecification({
      ...(props.isUpdateProgress && { progress: "FIT" }),
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
        description: {
          description: description.description,
          ...(description.file && {
            file: {
              name: description.file.name,
              key: description.file.key,
            },
          }),
        },
      }
    });
    specificationStore.currentSpecification.tshirt = {
      ...specificationStore.currentSpecification.tshirt,
      fit: {
        totalLength: totalLength,
        chestWidth: chestWidth,
        bottomWidth: bottomWidth,
        sleeveLength: sleeveLength,
        armhole: armhole,
        sleeveOpening: sleeveOpening,
        neckRibLength: neckRibLength,
        neckOpening: neckOpening,
        shoulderToShoulder: shoulderToShoulder,
        description: {
          description: description.description,
          ...(description.file && {
            file: {
              name: description.file.name,
              key: description.file.key,
            },
          }),
        },
      },
    };
    props.callBackUpdateState();
  };

  const handleFitChange = (index: number) => {
    if (index === 0) {
      return
    } else {
      setTotalLength(tenantStore.tenantSettingsTShirtFit.fits[index - 1].totalLength);
      setChestWidth(tenantStore.tenantSettingsTShirtFit.fits[index - 1].chestWidth);
      setBottomWidth(tenantStore.tenantSettingsTShirtFit.fits[index - 1].bottomWidth);
      setSleeveLength(tenantStore.tenantSettingsTShirtFit.fits[index - 1].sleeveLength);
      setArmhole(tenantStore.tenantSettingsTShirtFit.fits[index - 1].armhole);
      setSleeveOpening(tenantStore.tenantSettingsTShirtFit.fits[index - 1].sleeveOpening);
      setNeckRibLength(tenantStore.tenantSettingsTShirtFit.fits[index - 1].neckRibLength);
      setNeckOpening(tenantStore.tenantSettingsTShirtFit.fits[index - 1].neckOpening);
      setShoulderToShoulder(tenantStore.tenantSettingsTShirtFit.fits[index - 1].shoulderToShoulder);
    }
  };

  const handleFitFilePreview = async (key: string) => {
    if (!key) {
      return;
    }
    try {
      // 既存のpre-signed URLが有効かチェック
      if (description.file?.preSignedUrl?.get) {
        setPreviewUrl(description.file?.preSignedUrl?.get || "");
        return;
      }

      // 新しいpre-signed URLを取得
      const response = await PostImagesInteractor({
        type: "specification",
        specification_id: specificationStore.currentSpecification.specificationId,
        key: key,
        method: "get",
      });

      if (response.pre_signed_url) {
        setPreviewUrl(response.pre_signed_url);
        const newDescription = {
          ...description,
          file: {
            name: description.file?.name || "",
            key: description.file?.key || "",
            preSignedUrl: {
              get: response.pre_signed_url,
              put: response.pre_signed_url,
              delete: response.pre_signed_url,
            },
          },
        };
        setDescription(newDescription);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleFitFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setFileUploading(true);
        const fileType = file.type.split('/')[1];
        const imageType = fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' ? fileType : 'png';

        // 既存のファイルがある場合は上書き更新
        if (description.file?.key) {
          try {
            // 既存のPUT用URLが有効かチェック
            if (description.file?.preSignedUrl?.put) {
              const uploadResponse = await fetch(description.file.preSignedUrl.put, {
                method: "PUT",
                headers: {
                  "Content-Type": file.type,
                },
                body: file,
              });
              if (uploadResponse.ok) {
                // アップロード成功後、PUT用のURLをセット
                const newDescription = {
                  ...description,
                  file: {
                    name: file.name,
                    key: description.file.key,
                    preSignedUrl: {
                      ...description.file.preSignedUrl,
                      put: description.file.preSignedUrl.put || "",
                    },
                  },
                };
                setDescription(newDescription);
                setFileUploading(false);
                return;
              }
            }
          } catch (error) {
            console.error(error);
            console.log("Pre-signed URL expired or failed, getting new one");
          }
        }

        // 新しいファイルのアップロード用URLを取得
        const response = await PostImagesInteractor({
          type: "specification",
          specification_id: specificationStore.currentSpecification.specificationId,
          ...(description.file?.key && { key: description.file?.key }),
          image_type: imageType,
          method: "put",
        });

        if (response.pre_signed_url) {
          // ファイルをアップロード
          const uploadResponse = await fetch(response.pre_signed_url, {
            method: "PUT",
            headers: {
              "Content-Type": file.type,
            },
            body: file,
          });

          if (uploadResponse.ok) {
            // アップロード成功後、PUT用のURLをセット
            const newDescription = {
              ...description,
              file: {
                name: file.name,
                key: response.key || file.name,
                preSignedUrl: {
                  ...description.file?.preSignedUrl,
                  put: response.pre_signed_url || "",
                },
              },
            };
            setDescription(newDescription);
            setFileUploading(false);
          }
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        dialogStore.openAlertDialog(
          "Error",
          "Failed to upload file. Please try again.",
          "OK",
          false,
          () => dialogStore.closeAlertDialog()
        );
        setFileUploading(false);
      }
    }
  };

  const handleRemoveFitFile = async () => {
    if (!description.file?.key) {
      return;
    }
    if (fileUploading) {
      return;
    }
    dialogStore.openAlertDialog(
      "Delete File",
      "Are you sure you want to delete this file?",
      "Delete",
      false,
      async () => {
        try {
          setFileUploading(true);
          const preSignedUrl = await PostImagesInteractor({
            type: "specification",
            specification_id: specificationStore.currentSpecification.specificationId,
            key: description.file?.key || "",
            method: "delete",
          });
          await fetch(preSignedUrl.pre_signed_url || "", {
            method: "DELETE",
          });
          const newDescription = {
            ...description,
            file: undefined,
          };
          setDescription(newDescription);
          dialogStore.closeAlertDialog();
          setFileUploading(false);
        } catch (error) {
          console.error("Error deleting file:", error);
          dialogStore.closeAlertDialog();
          setFileUploading(false);
        }
      }
    );
  };

  const handleClosePreview = () => {
    setPreviewUrl(undefined);
  };

  return (
    <>
      <p className="text-sm text-gray-500">
        {specificationStore.currentSpecification.productCode} - {specificationStore.currentSpecification.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Fill in the size chart</h1>
      {/* メインコンテンツ */}
      <div className="flex gap-6">
        {/* Fit List */}
        <div className="w-2/10">
          <div className="mt-6 space-y-6">
            {[{ fitName: "Custom fit", ...specificationStore.currentSpecification.tshirt?.fit }, ...tenantStore.tenantSettingsTShirtFit.fits].map((fit, index) => (
              <div key={fit.fitName + index} className="flex items-center">
                <input
                  defaultChecked={index === 0}
                  id={fit.fitName}
                  name="fit-name"
                  type="radio"
                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-blue-600 checked:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                  onChange={() => handleFitChange(index)}
                />
                <label htmlFor={fit.fitName} className="ml-3 block text-sm/6 font-medium text-gray-900">
                  {fit.fitName}
                </label>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <textarea
              id="comment"
              name="comment"
              rows={8}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              placeholder="Special requests or comments"
              value={description.description}
              onChange={(e) => setDescription({
                ...description,
                description: e.target.value,
              })}
            />
          </div>
          <div className="mt-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <input
                  type="file"
                  id={`fit-file-upload`}
                  className="hidden"
                  onChange={(e) => handleFitFileChange(e)}
                  disabled={fileUploading}
                />
                <label
                  htmlFor={`fit-file-upload`}
                  className="inline-flex items-center gap-x-2 justify-center rounded-full text-gray-400 hover:text-gray-500 cursor-pointer"
                >
                  <PaperClipIcon aria-hidden="true" className="size-5" />
                  <span className="sr-only">Attach a file</span>
                  {!description.file && <p className="text-sm text-gray-500">Attach a file</p>}
                </label>
              </div>
              {description.file && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <button
                    type="button"
                    onClick={() => handleFitFilePreview(description.file?.key || "")}
                    className="truncate max-w-[200px] text-blue-600 hover:text-blue-500"
                  >
                    {description.file.name}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveFitFile()}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <TrashIcon className="size-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* サイズ表（7/10） */}
        <div className="w-6/10">
          <div className="space-y-6">
            <div>
              <div className="grid grid-cols-9 gap-2 mt-4 items-center">
                <div className="col-span-2"></div>
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
              <div className="grid grid-cols-9 gap-2 mb-2 items-center">
                <label className="block text-left text-sm font-medium text-gray-700 col-span-2">Total Length</label>
                <input
                  type="text"
                  placeholder="xxs"
                  value={totalLength.xxs}
                  onChange={(e) => handleTotalLengthChange('xxs', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xs"
                  value={totalLength.xs}
                  onChange={(e) => handleTotalLengthChange('xs', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="s"
                  value={totalLength.s}
                  onChange={(e) => handleTotalLengthChange('s', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="m"
                  value={totalLength.m}
                  onChange={(e) => handleTotalLengthChange('m', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="l"
                  value={totalLength.l}
                  onChange={(e) => handleTotalLengthChange('l', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xl"
                  value={totalLength.xl}
                  onChange={(e) => handleTotalLengthChange('xl', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xxl"
                  value={totalLength.xxl}
                  onChange={(e) => handleTotalLengthChange('xxl', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Chest Width */}
            <div>
              <div className="grid grid-cols-9 gap-2 mb-2 items-center">
                <label className="block text-left text-sm font-medium text-gray-700 col-span-2">Chest Width</label>
                <input
                  type="text"
                  placeholder="xxs"
                  value={chestWidth.xxs}
                  onChange={(e) => handleChestWidthChange('xxs', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xs"
                  value={chestWidth.xs}
                  onChange={(e) => handleChestWidthChange('xs', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="s"
                  value={chestWidth.s}
                  onChange={(e) => handleChestWidthChange('s', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="m"
                  value={chestWidth.m}
                  onChange={(e) => handleChestWidthChange('m', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="l"
                  value={chestWidth.l}
                  onChange={(e) => handleChestWidthChange('l', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xl"
                  value={chestWidth.xl}
                  onChange={(e) => handleChestWidthChange('xl', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xxl"
                  value={chestWidth.xxl}
                  onChange={(e) => handleChestWidthChange('xxl', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Bottom Width */}
            <div>
              <div className="grid grid-cols-9 gap-2 mb-2 items-center">
                <label className="block text-left text-sm font-medium text-gray-700 col-span-2">Bottom Width</label>
                <input
                  type="text"
                  placeholder="xxs"
                  value={bottomWidth.xxs}
                  onChange={(e) => handleBottomWidthChange('xxs', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xs"
                  value={bottomWidth.xs}
                  onChange={(e) => handleBottomWidthChange('xs', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="s"
                  value={bottomWidth.s}
                  onChange={(e) => handleBottomWidthChange('s', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="m"
                  value={bottomWidth.m}
                  onChange={(e) => handleBottomWidthChange('m', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="l"
                  value={bottomWidth.l}
                  onChange={(e) => handleBottomWidthChange('l', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xl"
                  value={bottomWidth.xl}
                  onChange={(e) => handleBottomWidthChange('xl', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xxl"
                  value={bottomWidth.xxl}
                  onChange={(e) => handleBottomWidthChange('xxl', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Sleeve Length */}
            <div>
              <div className="grid grid-cols-9 gap-2 mb-2 items-center">
                <label className="block text-left text-sm font-medium text-gray-700 col-span-2">Sleeve Length</label>
                <input
                  type="text"
                  placeholder="xxs"
                  value={sleeveLength.xxs}
                  onChange={(e) => handleSleeveLengthChange('xxs', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xs"
                  value={sleeveLength.xs}
                  onChange={(e) => handleSleeveLengthChange('xs', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="s"
                  value={sleeveLength.s}
                  onChange={(e) => handleSleeveLengthChange('s', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="m"
                  value={sleeveLength.m}
                  onChange={(e) => handleSleeveLengthChange('m', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="l"
                  value={sleeveLength.l}
                  onChange={(e) => handleSleeveLengthChange('l', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xl"
                  value={sleeveLength.xl}
                  onChange={(e) => handleSleeveLengthChange('xl', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xxl"
                  value={sleeveLength.xxl}
                  onChange={(e) => handleSleeveLengthChange('xxl', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Armhole */}
            <div>
              <div className="grid grid-cols-9 gap-2 mb-2 items-center">
                <label className="block text-left text-sm font-medium text-gray-700 col-span-2">Armhole</label>
                <input
                  type="text"
                  placeholder="xxs"
                  value={armhole.xxs}
                  onChange={(e) => handleArmholeChange('xxs', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xs"
                  value={armhole.xs}
                  onChange={(e) => handleArmholeChange('xs', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="s"
                  value={armhole.s}
                  onChange={(e) => handleArmholeChange('s', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="m"
                  value={armhole.m}
                  onChange={(e) => handleArmholeChange('m', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="l"
                  value={armhole.l}
                  onChange={(e) => handleArmholeChange('l', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xl"
                  value={armhole.xl}
                  onChange={(e) => handleArmholeChange('xl', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xxl"
                  value={armhole.xxl}
                  onChange={(e) => handleArmholeChange('xxl', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Sleeve Opening */}
            <div>
              <div className="grid grid-cols-9 gap-2 mb-2 items-center">
                <label className="block text-left text-sm font-medium text-gray-700 col-span-2">Sleeve Opening</label>
                <input
                  type="text"
                  placeholder="xxs"
                  value={sleeveOpening.xxs}
                  onChange={(e) => handleSleeveOpeningChange('xxs', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xs"
                  value={sleeveOpening.xs}
                  onChange={(e) => handleSleeveOpeningChange('xs', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="s"
                  value={sleeveOpening.s}
                  onChange={(e) => handleSleeveOpeningChange('s', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="m"
                  value={sleeveOpening.m}
                  onChange={(e) => handleSleeveOpeningChange('m', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="l"
                  value={sleeveOpening.l}
                  onChange={(e) => handleSleeveOpeningChange('l', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xl"
                  value={sleeveOpening.xl}
                  onChange={(e) => handleSleeveOpeningChange('xl', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xxl"
                  value={sleeveOpening.xxl}
                  onChange={(e) => handleSleeveOpeningChange('xxl', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Neck Rib Length */}
            <div>
              <div className="grid grid-cols-9 gap-2 mb-2 items-center">
                <label className="block text-left text-sm font-medium text-gray-700 col-span-2">Neck Rib Length</label>
                <input
                  type="text"
                  placeholder="xxs"
                  value={neckRibLength.xxs}
                  onChange={(e) => handleNeckRibLengthChange('xxs', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xs"
                  value={neckRibLength.xs}
                  onChange={(e) => handleNeckRibLengthChange('xs', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="s"
                  value={neckRibLength.s}
                  onChange={(e) => handleNeckRibLengthChange('s', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="m"
                  value={neckRibLength.m}
                  onChange={(e) => handleNeckRibLengthChange('m', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="l"
                  value={neckRibLength.l}
                  onChange={(e) => handleNeckRibLengthChange('l', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xl"
                  value={neckRibLength.xl}
                  onChange={(e) => handleNeckRibLengthChange('xl', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xxl"
                  value={neckRibLength.xxl}
                  onChange={(e) => handleNeckRibLengthChange('xxl', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Neck Opening */}
            <div>
              <div className="grid grid-cols-9 gap-2 mb-2 items-center">
                <label className="block text-left text-sm font-medium text-gray-700 col-span-2">Neck Opening</label>
                <input
                  type="text"
                  placeholder="xxs"
                  value={neckOpening.xxs}
                  onChange={(e) => handleNeckOpeningChange('xxs', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xs"
                  value={neckOpening.xs}
                  onChange={(e) => handleNeckOpeningChange('xs', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="s"
                  value={neckOpening.s}
                  onChange={(e) => handleNeckOpeningChange('s', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="m"
                  value={neckOpening.m}
                  onChange={(e) => handleNeckOpeningChange('m', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="l"
                  value={neckOpening.l}
                  onChange={(e) => handleNeckOpeningChange('l', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xl"
                  value={neckOpening.xl}
                  onChange={(e) => handleNeckOpeningChange('xl', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xxl"
                  value={neckOpening.xxl}
                  onChange={(e) => handleNeckOpeningChange('xxl', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Shoulder to Shoulder */}
            <div>
              <div className="grid grid-cols-9 gap-2">
                <label className="block text-left text-sm font-medium text-gray-700 col-span-2">Shoulder to Shoulder</label>
                <input
                  type="text"
                  placeholder="xxs"
                  value={shoulderToShoulder.xxs}
                  onChange={(e) => handleShoulderToShoulderChange('xxs', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xs"
                  value={shoulderToShoulder.xs}
                  onChange={(e) => handleShoulderToShoulderChange('xs', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="s"
                  value={shoulderToShoulder.s}
                  onChange={(e) => handleShoulderToShoulderChange('s', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="m"
                  value={shoulderToShoulder.m}
                  onChange={(e) => handleShoulderToShoulderChange('m', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="l"
                  value={shoulderToShoulder.l}
                  onChange={(e) => handleShoulderToShoulderChange('l', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xl"
                  value={shoulderToShoulder.xl}
                  onChange={(e) => handleShoulderToShoulderChange('xl', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                <input
                  type="text"
                  placeholder="xxl"
                  value={shoulderToShoulder.xxl}
                  onChange={(e) => handleShoulderToShoulderChange('xxl', e.target.value)}
                  className="block rounded-md bg-white py-1.5 text-center text-base text-gray-900 outline-1 -outline-offset-1 border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 画像（3/10） */}
        <div className="w-2/10 mt-10">
          <img src="/tee_measures.png" alt="T-Shirt Measurements" className="w-full" />
        </div>
      </div>

      {/* プレビューモーダル */}
      {previewUrl && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={handleClosePreview}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <div className="mt-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="mx-auto max-h-[70vh] w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ボタン */}
      <div className="mt-6 flex flex-row justify-between">
        <Link href="https://floor-studios.com/orders" className="text-sm text-blue-600 flex flex-row items-center gap-x-2">
          <span className="text-blue-600">
            <ArrowLeftIcon className="w-4 h-4" />
          </span>
          Back to Orders
        </Link>
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
            style={"fill"}
            fullWidth={false}
          />
        </div>
      </div>
    </>
  );
});

export default TShirtFit;
