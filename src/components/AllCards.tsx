"use client";

import { BaseSpecification, SpecificationStatus } from "@/lib/type/specification/type";
import { formatRelativeTime } from "@/lib/utils";
import { specificationStore } from "@/stores/specificationStore";
import { specificationGroupsStore } from "@/stores/specificationGroupsStore";
import { useEffect, useState } from "react";
import SpecificationMenu from "@/components/SpecificationMenu";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

type AllCardsProps = {
  status: SpecificationStatus;
}

const AllCards = observer((props: AllCardsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [specificationsByGroup, setSpecificationsByGroup] = useState<Record<string, BaseSpecification[]>>({});

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
      <div className="flex justify-center items-center h-full">
        <div className="text-gray-500">
          No specifications found
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {allGroups.map((group) => {
        const specifications = specificationsByGroup[group.specificationGroupId] || [];
        
        if (specifications.length === 0) {
          return null;
        }

        return (
          <div key={group.specificationGroupId} className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {group.specificationGroupName}
              </h3>
              <p className="text-sm text-gray-500">
                {specifications.length} specification{specifications.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {specifications.map((specification) => (
                <div
                  key={specification.specificationId}
                  className="rounded-lg bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow"
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
          </div>
        );
      })}
    </div>
  );
});

export default AllCards; 