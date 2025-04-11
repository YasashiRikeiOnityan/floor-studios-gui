import { Specification, SpecificationStatus } from "@/lib/type";
import { formatRelativeTime } from "@/lib/utils";
import { specificationStore } from "@/stores/specificationStore";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

type CardsProps = {
  specificationGroupId: string | undefined;
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
    <>
      {specifications.map((specification) => (
        <div key={specification.specificationId} className="overflow-hidden rounded-lg bg-white shadow-md">
          <div className="px-2 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="gap-1">
                <div className="font-bold">
                  {specification.productName}
                </div>
                <div className="text-xs text-gray-500">
                  {specification.brandName}
                </div>
              </div>
              <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
            </div>
            <div className="mt-5 sm:mt-10 flex items-center justify-end">
              <div>
                <div className="text-xs">
                  {formatRelativeTime(specification.updatedAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Cards;