import { specificationStore } from "@/stores/specificationStore";
import { useState } from "react";
import Button from "@/components/Button";
import { observer } from "mobx-react-lite";
import { ReactElement } from "react";
import { TShirtSpecification } from "@/lib/type/specification/t-shirt/type";
import { DescriptionWithFile } from "./DescriptionWithFile";

type CareLabelProps = {
  isUpdateProgress: boolean;
  callBackUpdateState: () => void;
};

const CareLabel = observer((props: CareLabelProps): ReactElement => {
  const currentSpecification = specificationStore.currentSpecification as TShirtSpecification;
  const [hasLogo, setHasLogo] = useState(currentSpecification?.careLabel?.hasLogo || false);
  const [file, setFile] = useState(currentSpecification?.careLabel?.file || undefined);
  const [description, setDescription] = useState(currentSpecification?.careLabel?.description || {
    description: "",
    file: undefined,
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleCancel = () => {
    setHasLogo(currentSpecification?.careLabel?.hasLogo || false);
    setFile(currentSpecification?.careLabel?.file || undefined);
    setDescription({
      description: currentSpecification?.careLabel?.description?.description || "",
      file: currentSpecification?.careLabel?.description?.file || undefined,
    });
  };

  const handleSaveAndNext = async () => {
    setIsSaving(true);
    await specificationStore.putSpecificationsSpecificationId(currentSpecification?.specificationId || "", {
      ...(props.isUpdateProgress && { progress: "OEMPOINT" }),
      care_label: {
        has_logo: hasLogo,
        ...(file && {
          file: {
            name: file.name,
            key: file.key,
          }
        }),
        description: {
          description: description.description,
          ...(description.file && {
            file: {
              name: description.file.name,
              key: description.file.key,
            }
          })
        }
      }
    });
    if (currentSpecification) {
      specificationStore.updateSpecification({
        careLabel: {
          hasLogo: hasLogo,
          ...(file && {
            file: {
              name: file.name,
              key: file.key,
            }
          }),
          description: {
            description: description.description,
            ...(file && {
              file: {
                name: file.name,
                key: file.key,
              }
            })
          }
        }
      });
      props.callBackUpdateState();
      setIsSaving(false);
    }
  };

  return (
    <>
      <p className="text-sm text-gray-500">
        {currentSpecification?.productCode} - {currentSpecification?.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Select your care label option</h1>
      <div className="mt-6 items-start md:grid md:grid-cols-3 md:gap-4">
        <div className="mb-2 md:mb-0 md:col-span-1 space-y-6">
          <div className="flex items-center">
            <input
              checked={hasLogo}
              id="yes"
              name="hasLogo"
              type="radio"
              onChange={() => setHasLogo(true)}
              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-blue-600 checked:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
            />
            <label htmlFor="yes" className="ml-3 block text-sm/6 font-medium text-gray-900">
              My brand logo
            </label>
          </div>
          <div className="flex items-center">
            <input
              checked={!hasLogo}
              id="no"
              name="hasLogo"
              type="radio"
              onChange={() => setHasLogo(false)}
              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-blue-600 checked:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
            />
            <label htmlFor="no" className="ml-3 block text-sm/6 font-medium text-gray-900">
              No logo
            </label>
          </div>
        </div>
        <div className="col-span-2">
          <DescriptionWithFile
            specificationId={currentSpecification?.specificationId || ""}
            description={description}
            onDescriptionChange={setDescription}
            onSave={(description) => {
              specificationStore.putSpecificationsSpecificationId(currentSpecification?.specificationId || "", {
                care_label: {
                  has_logo: hasLogo,
                  description: description,
                }
              });
              specificationStore.updateSpecification({
                careLabel: {
                  hasLogo: hasLogo,
                  description: description,
                }
              });
            }}
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

export default CareLabel;
