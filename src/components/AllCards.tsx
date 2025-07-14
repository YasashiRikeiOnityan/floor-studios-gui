"use client";

import { BaseSpecification, SpecificationStatus } from "@/lib/type/specification/type";
import { formatRelativeTime } from "@/lib/utils";
import { specificationStore } from "@/stores/specificationStore";
import { specificationGroupsStore } from "@/stores/specificationGroupsStore";
import { useEffect, useState } from "react";
import SpecificationMenu from "@/components/SpecificationMenu";
import StatusBadge from "@/components/StatusBadge";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import AddIcon from "@/components/AddIcon";

type AllCardsProps = {
  status: SpecificationStatus | undefined;
}

const AllCards = observer((props: AllCardsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [specificationsByGroup, setSpecificationsByGroup] = useState<Record<string, BaseSpecification[]>>({});

  // 削除後のコールバック関数
  const handleSpecificationDeleted = (specificationId: string) => {
    setSpecificationsByGroup(prev => {
      const updated = { ...prev };
      for (const groupId in updated) {
        updated[groupId] = updated[groupId].filter(spec => spec.specificationId !== specificationId);
      }
      return updated;
    });
  };

  useEffect(() => {
    const fetchAllSpecifications = async () => {
      setIsLoading(true);

      // 全コレクションを取得
      await specificationGroupsStore.getSpecificationGroups();

      // 各コレクションの仕様書を取得
      const allGroups = [
        { specificationGroupId: "NO_GROUP", specificationGroupName: "Not Assigned to collection" },
        ...specificationGroupsStore.specificationGroups
      ];

      const specificationsMap: Record<string, BaseSpecification[]> = {};

      for (const group of allGroups) {
        await specificationStore.getSpecifications(group.specificationGroupId, props.status);
        if (specificationStore.specifications.length > 0) {
          specificationsMap[group.specificationGroupId] = [...specificationStore.specifications];
        }
      }

      setSpecificationsByGroup(specificationsMap);
      setIsLoading(false);
    };

    fetchAllSpecifications();
  }, [props.status]);

  if (isLoading) {
    return <Loading />;
  }

  const allGroups = [
    { specificationGroupId: "NO_GROUP", specificationGroupName: "Not Assigned to collection" },
    ...specificationGroupsStore.specificationGroups
  ];

  const hasAnySpecifications = Object.values(specificationsByGroup).some(specs => specs.length > 0);

  if (!hasAnySpecifications) {
    return (
      <div className="flex flex-col justify-center items-center h-full py-12">
        <div className="text-gray-500 mb-4">
          No specifications found
        </div>
        {props.status === "DRAFT" && (
          <div className="relative group">
            <button
              type="button"
              onClick={() => router.push(`/design/new`)}
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
    <div className="space-y-6">
      {allGroups.map((group) => {
        const specifications = specificationsByGroup[group.specificationGroupId] || [];

        return (
          <div key={group.specificationGroupId} className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {group.specificationGroupName}
                </h3>
                <p className="text-sm text-gray-500">
                  {specifications.length} specification{specifications.length !== 1 ? 's' : ''}
                </p>
              </div>
              {props.status === "DRAFT" && (
                <div className="relative group">
                  <button
                    type="button"
                    onClick={() => router.push(`/design/new?collection=${group.specificationGroupId}`)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    title="Add new design"
                  >
                    <AddIcon className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    Add new design
                  </div>
                </div>
              )}
            </div>
            {specifications.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {specifications.map((specification) => (
                  <div
                    key={specification.specificationId}
                    className="rounded-lg bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow min-h-40"
                    onClick={() => {
                      router.push(`/design/edit?id=${specification.specificationId}`);
                    }}
                  >
                    <div className="p-4 flex flex-col justify-between h-full">
                      <div className="flex items-start justify-between">
                        <div className="gap-1">
                          <div className="font-bold">
                            {specification.productName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {specification.productCode}
                          </div>
                        </div>
                        <div className="relative" onClick={(e) => e.stopPropagation()}>
                          <SpecificationMenu
                            specificationId={specification.specificationId}
                            status={props.status}
                            onSpecificationDeleted={handleSpecificationDeleted}
                          />
                        </div>
                      </div>
                      <div className="pr-2 flex items-center justify-between">
                        <StatusBadge status={specification.status || ""} />
                        <div className="text-xs">
                          {formatRelativeTime(specification.updatedAt || "")}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-400 text-center">
                  <div className="text-sm">No specifications in this collection</div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

export default AllCards; 