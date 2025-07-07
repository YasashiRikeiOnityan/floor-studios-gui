import { specificationStore } from "@/stores/specificationStore";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Button from "@/components/Button";
import { observer } from "mobx-react-lite";
import { PostImagesInteractor } from "@/interactor/PostImagesInteractor";
import { Description } from "@/lib/type/specification/bottoms/type";
import { DescriptionWithFile } from "./DescriptionWithFile";
import { BottomsSpecification } from "@/lib/type/specification/bottoms/type";

type BottomsOEMPointProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
};

const OEMPOINTS_LIMIT = 6;

const BottomsOEMPoint = observer((props: BottomsOEMPointProps) => {
  const currentSpecification = specificationStore.currentSpecification as BottomsSpecification;
  const [oemPoints, setOemPoints] = useState(currentSpecification.oemPoints || [{ description: "", file: undefined }]);
  const [deleteFiles, setDeleteFiles] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleOemPointChange = (index: number, newDescription: Description) => {
    const newOemPoints = [...oemPoints];
    newOemPoints[index] = {
      description: newDescription.description,
      file: newDescription.file ? {
        name: newDescription.file.name,
        key: newDescription.file.key,
        preSignedUrl: newDescription.file.preSignedUrl
      } : undefined
    };
    setOemPoints(newOemPoints);
  };

  const handleAddOemPoint = () => {
    setOemPoints([...oemPoints, { description: "", file: undefined }]);
  };

  const handleRemoveOemPoint = (index: number) => {
    if (oemPoints[index].file?.key) {
      setDeleteFiles([...deleteFiles, oemPoints[index].file?.key]);
    }
    const newOemPoints = oemPoints.filter((_, i) => i !== index);
    setOemPoints(newOemPoints);
  };

  const handleCancel = () => {
    const initialPoints = currentSpecification.oemPoints || [{ description: "", file: undefined }];
    setOemPoints(initialPoints.map(point => ({
      description: point.description || "",
      file: point.file || undefined
    })));
  };

  const handleSaveAndNext = async () => {
    setIsSaving(true);
    if (deleteFiles.length > 0) {
      for (const key of deleteFiles) {
        const response = await PostImagesInteractor({
          type: "specification",
          specification_id: currentSpecification.specificationId,
          key: key,
          method: "delete",
        });
        if (response.pre_signed_url) {
          await fetch(response.pre_signed_url, {
            method: "DELETE",
          });
        }
      }
      setDeleteFiles([]);
    }
    const oemPointsWithoutEmpty = oemPoints.filter(oemPoint => oemPoint.description !== "" || oemPoint.file?.key);
    await specificationStore.putSpecificationsSpecificationId(currentSpecification.specificationId, {
      ...(props.isUpdateProgress && { progress: "SAMPLE" }),
      oem_points: oemPointsWithoutEmpty.map(oemPoint => ({
        description: oemPoint.description,
        ...(oemPoint.file && {
          file: {
            name: oemPoint.file.name,
            key: oemPoint.file.key,
          }
        })
      }))
    });
    specificationStore.updateSpecification({
      oemPoints: oemPointsWithoutEmpty.map(oemPoint => ({
        description: oemPoint.description,
        ...(oemPoint.file && {
          file: {
            name: oemPoint.file.name,
            key: oemPoint.file.key,
          }
        })
      })),
    });
    props.callBackUpdateState();
    setIsSaving(false);
  };

  return (
    <>
      <p className="text-sm text-gray-500">
        {currentSpecification.productCode} - {currentSpecification.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">OEM Point</h1>
      {/* メインコンテンツ */}
      <div className="space-y-6 mt-6">
        {oemPoints.map((oemPoint, index) => (
          <div key={index} className="min-w-0 flex-1 border-l-2 border-blue-100 pl-4 pb-2">
            {oemPoints.length > 0 && (
              <div className="flex justify-end mb-2">
                <button
                  type="button"
                  onClick={() => handleRemoveOemPoint(index)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <PlusIcon className="size-5 rotate-45" />
                </button>
              </div>
            )}
            <DescriptionWithFile
              specificationId={currentSpecification.specificationId}
              id={`oem-point-${index}`}
              description={oemPoint}
              onDescriptionChange={(newDescription) => handleOemPointChange(index, newDescription)}
              onSave={(description) => {
                handleOemPointChange(index, description);
                const oemPointsWithoutEmpty = oemPoints.map((point, i) => 
                  i === index ? description : point
                ).filter(point => point.description !== "" || point.file?.key);
                specificationStore.putSpecificationsSpecificationId(currentSpecification.specificationId, {
                  oem_points: oemPointsWithoutEmpty.map(point => ({
                    description: point.description,
                    ...(point.file && {
                      file: {
                        name: point.file.name,
                        key: point.file.key,
                      }
                    })
                  }))
                }, false);
                specificationStore.updateSpecification({
                  oemPoints: oemPointsWithoutEmpty.map(point => ({
                    description: point.description,
                    ...(point.file && {
                      file: {
                        name: point.file.name,
                        key: point.file.key,
                      }
                    })
                  })),
                });
              }}
            />
          </div>
        ))}

        {oemPoints.length < OEMPOINTS_LIMIT && <Button
          type="button"
          onClick={handleAddOemPoint}
          style={"text"}
          fullWidth={true}
        >
          <div className="flex items-center gap-x-2">
            <PlusIcon className="size-5" />
            <p>Add OEM Point</p>
          </div>
        </Button>}
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
          loadingText={"Saving..."}
          loading={isSaving}
          style={"fill"}
          fullWidth={false}
        />
      </div>
    </>
  );
});

export default BottomsOEMPoint;
