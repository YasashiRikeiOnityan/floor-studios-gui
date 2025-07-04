"use client";

import { SpecificationStatus } from "@/lib/type/specification/type";
import { formatRelativeTime } from "@/lib/utils";
import { specificationStore } from "@/stores/specificationStore";
import { useEffect, useState } from "react";
import SpecificationMenu from "@/components/SpecificationMenu";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import AddIcon from "@/components/AddIcon";

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
    return (
      <div className="flex flex-col justify-center items-center h-full py-12">
        <div className="text-gray-500 mb-4">
          No specifications found
        </div>
        {props.status === "DRAFT" && (
          <div className="relative group">
            <button
              type="button"
              onClick={() => router.push(`/design/new?collection=${props.specificationGroupId}`)}
              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
              title="Add new design"
            >
              <AddIcon className="w-5 h-5" />
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Add new design
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
    </div>
  )
});

export default Cards;