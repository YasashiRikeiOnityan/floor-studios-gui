"use client";

import { SpecificationStatus } from "@/lib/type";
import { formatRelativeTime } from "@/lib/utils";
import { specificationStore } from "@/stores/specificationStore";
import { useEffect } from "react";
import SpecificationMenu from "./SpecificationMenu";
import { observer } from "mobx-react-lite";
import Loading from "./Loading";
import { useRouter } from "next/navigation";

type CardsProps = {
  specificationGroupId: string;
  status: SpecificationStatus;
}

const Cards = observer((props: CardsProps) => {

  const router = useRouter();

  useEffect(() => {
    const fetchSpecifications = async () => {
      await specificationStore.getSpecifications(props.specificationGroupId, props.status);
    };
    fetchSpecifications();
  }, [props.specificationGroupId, props.status]);

  if (specificationStore.loading) {
    return <Loading full={true} />;
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