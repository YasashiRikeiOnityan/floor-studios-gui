import { useSearchParams } from "next/navigation";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
// import { specificationStore } from "@/stores/specificationStore";

const EditDesign = observer(() => {
  const searchParams = useSearchParams();
  const specificationId = searchParams.get("id") || "";

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && specificationId) {
      // specificationStore.getSpecifications(specificationId);
    }
  }, [specificationId, mounted]);

  return <div>EditDesign</div>;
});

export default EditDesign;
