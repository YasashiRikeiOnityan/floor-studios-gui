"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import Tabs from "@/components/Tabs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import Cards from "@/components/Cards";
import { SpecificationStatus } from "@/lib/type";

const Orders = () => {
  const router = useRouter();
  const tabs = ["Drafts", "Completed", "Samples", "Bulks"]
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [specificationGroupId, setSpecificationGroupId] = useState<string | undefined>("NO_GROUP");
  const [status, setStatus] = useState<SpecificationStatus>("DRAFT");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setStatus(tab === "Drafts" ? "DRAFT" : tab === "Completed" ? "COMPLETED" : tab === "Samples" ? "SAMPLE" : "BULK");
    // ビルド通すように仮置き
    setSpecificationGroupId("NO_GROUP");
  };

  const handleStartNewDesign = () => {
    router.push("/new_design");
  }
  
  return (
    <>
      <div className="min-h-full">
        <Header current="Orders"/>
        <div className="py-5 sm:py-10">
          <PageTitle title="Orders" />
          <main>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-y-3 items-start sm:flex-row sm:items-center sm:justify-between">
                <Tabs
                  tabs={tabs}
                  state={activeTab}
                  callBackUpdateState={handleTabClick}
                />
                <div className="hidden sm:block">
                  <Button
                    type={"button"}
                    onClick={handleStartNewDesign}
                    text={"Start new design"}
                    style={"outline"}
                    fullWidth={false}
                  />
                </div>
              </div>
              <div className="sm:hidden flex justify-end">
                <Button
                  type={"button"}
                  onClick={handleStartNewDesign}
                  text={"Start new design"}
                  style={"outline"}
                  fullWidth={false}
                />
              </div>
              {/* {activeTab === "Drafts" && <DraftsList specifications={specifications} />} */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {activeTab === "Drafts" && <Cards specificationGroupId={specificationGroupId} status={status} />}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
};

export default Orders;
