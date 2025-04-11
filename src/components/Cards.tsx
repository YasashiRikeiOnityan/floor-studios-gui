import { Specification, SpecificationStatus } from "@/lib/type";
import { specificationStore } from "@/stores/specificationStore";
import { useEffect, useState } from "react";

type CardsProps = {
  specificationGroupId: string;
  status: SpecificationStatus;
}

const Cards = (props: CardsProps) => {
  const [specifications, setSpecifications] = useState<Specification[]>([]);

  useEffect(() => {
    const fetchSpecifications = async () => {
      const specifications = await specificationStore.getSpecifications(props.specificationGroupId, props.status);
      setSpecifications(specifications);
    };
    fetchSpecifications();
  }, []);

  return (
    <div>
      {specifications.map((specification) => (
        <div key={specification.specificationId} className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            {specification.brandName}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Cards;