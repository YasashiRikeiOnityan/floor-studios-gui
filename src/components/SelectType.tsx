import { observer } from "mobx-react-lite";
import Button from "./Button";
import Types from "./Types";
import { useState } from "react";
import { specificationStore } from "@/stores/specificationStore";

type SelectTypeProps = {
  callBackUpdateState: (step: number) => void;
};

const SelectType = observer((props: SelectTypeProps) => {
  const [currentType, setCurrentType] = useState(specificationStore.currentSpecification.type || "");

  const handleSave = async () => {
    await specificationStore.putSpecification({
      type: currentType,
    });
    props.callBackUpdateState(1);
  }

  return (
    <>
      <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-gray-900">What would you like to design?</h1>
      <p className="mt-2 text-sm text-gray-500">
        Choose the type of design you want to create.
      </p>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <Types currentType={currentType} callBackUpdateState={setCurrentType} />
      </div>
      {/* ボタン */}
      <div className="mt-6 flex flex-row gap-x-3 justify-end">
        <Button
          type={"button"}
          onClick={() => {setCurrentType("")}}
          text={"Cancel"}
          style={"text"}
          fullWidth={false}
        />
        <Button
          type={"button"}
          onClick={handleSave}
          text={"Save and Next"}
          style={"fill"}
          fullWidth={false}
        />
      </div>
    </>
  );
});

export default SelectType;
