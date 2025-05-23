import { specificationStore } from "@/stores/specificationStore";
import { observer } from "mobx-react-lite";

type TagProps = {
  callBackUpdateState: () => void;
  isUpdateProgress: boolean;
}

const Tag = observer((props: TagProps) => {
  return (
    <>
      <p className="text-sm text-gray-500">
        {specificationStore.currentSpecification.productCode} - {specificationStore.currentSpecification.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Select name tag and size tag</h1>
    </>
  );
});

export default Tag;
