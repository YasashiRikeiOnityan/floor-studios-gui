import { observer } from "mobx-react-lite";
import Button from "./Button";
import Types from "./Types";
import { useState } from "react";
import { specificationStore } from "@/stores/specificationStore";

type SelectTypeProps = {
  callBackUpdateState: () => void;
};

const SelectType = observer((props: SelectTypeProps) => {
  const [currentType, setCurrentType] = useState(specificationStore.currentSpecification.type || undefined);

  const handleSave = async () => {
    await specificationStore.putSpecification({
      type: currentType,
      progress: "TYPE"
    });
    specificationStore.updateSpecification({
      type: currentType,
      progress: "TYPE"
    });
    specificationStore.currentSpecification.progress = "TYPE";
    specificationStore.currentSpecification.type = currentType;
    props.callBackUpdateState();
  }

  // 種類は一度選択したら変更できないようにする
  const alreadySelected = specificationStore.currentSpecification.type !== undefined;

  return (
    <>
      <p className="text-sm text-gray-500">
      {specificationStore.currentSpecification.productCode} - {specificationStore.currentSpecification.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">What would you like to design?</h1>
      {/* <p className="mt-2 text-sm text-gray-500">
        Choose the type of design you want to create.
      </p> */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <Types currentType={currentType} callBackUpdateState={setCurrentType} disabled={specificationStore.currentSpecification.type !== undefined} />
      </div>
      {/* ボタン */}
      <div className="mt-6 flex flex-row gap-x-3 justify-end">
        <Button
          type={"button"}
          onClick={() => {setCurrentType(undefined)}}
          text={"Cancel"}
          style={"text"}
          fullWidth={false}
          disabled={alreadySelected}
        />
        {!alreadySelected &&
          <Button
            type={"button"}
            onClick={handleSave}
            text={!specificationStore.loading ? "Save and Next" : "Saving..."}
            style={"fill"}
            fullWidth={false}
          />}
          {alreadySelected &&
            <Button
              type={"button"}
              onClick={() => props.callBackUpdateState()}
              text={"Next"}
              style={"outline"}
              fullWidth={false}
            />
          }
      </div>
    </>
  );
});

export default SelectType;
