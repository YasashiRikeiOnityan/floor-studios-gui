"use client";

import { SpecificationStatus } from "@/lib/type/specification/type";
import { formatRelativeTime } from "@/lib/utils";
import { specificationStore } from "@/stores/specificationStore";
import { useEffect, useState } from "react";
import SpecificationMenu from "@/components/SpecificationMenu";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

type CardsProps = {
  specificationGroupId: string;
  status: SpecificationStatus;
}

const Cards = observer((props: CardsProps) => {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSpecifications = async () => {
      setIsLoading(true);
      await specificationStore.getSpecifications(props.specificationGroupId, props.status);
      setIsLoading(false);
    };
    fetchSpecifications();
  }, [props.specificationGroupId, props.status]);

  if (isLoading) {
    return <Loading />;
  }

  if (specificationStore.specifications.length === 0) {
    return <div className="flex justify-center items-center h-full">
      <div className="text-gray-500">
        No specifications found
      </div>
    </div>;
  }

  return (
    <>
      {specificationStore.specifications.map((specification) => (
        <div
          key={specification.specificationId}
          className="rounded-lg bg-white shadow-md cursor-pointer"
          onClick={() => {
            router.push(`/design/edit?id=${specification.specificationId}`);
          }}
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="gap-1">
                <div className="font-bold">
                  {specification.productName}
                </div>
                <div className="text-xs text-gray-500">
                  {specification.productCode}
                </div>
              </div>
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <SpecificationMenu specificationId={specification.specificationId} status={props.status} />
              </div>
            </div>
            <div className="mt-5 pr-2 sm:mt-10 flex items-center justify-end">
              <div>
                <div className="text-xs">
                  {formatRelativeTime(specification.updatedAt || "")}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
});

export default Cards;