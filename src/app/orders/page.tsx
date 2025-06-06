"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import Tabs from "@/components/Tabs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import Cards from "@/components/Cards";
import { SpecificationStatus } from "@/lib/type";
import AlertDialog from "@/components/AlertDialod";
import Notification from "@/components/Notification";
import { observer } from "mobx-react-lite";
import SpecificationGroups from "@/components/SpecificationGroups";
import AddNewCollection from "@/components/AddNewCollection";

const Orders = observer(() => {
  const router = useRouter();
  const tabs = ["Drafts", "Completes"]
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [specificationGroupId, setSpecificationGroupId] = useState<string>("NO_GROUP");
  const [status, setStatus] = useState<SpecificationStatus>("DRAFT");
  const [isOpenAddNewCollection, setIsOpenAddNewCollection] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setStatus(tab === "Drafts" ? "DRAFT" : tab === "Completes" ? "COMPLETE" : tab === "Samples" ? "SAMPLE" : "BULK");
  };

  const handleStartNewDesign = () => {
    router.push("/design/new");
  }

  return (
    <>
      <div className="min-h-full">
        <Header current="Orders" />
        <div className="mt-16 py-5 sm:py-10">
          <PageTitle title="Orders" />
          <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-y-3 items-start sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-x-8">
                  <Tabs
                    tabs={tabs}
                    state={activeTab}
                    callBackUpdateState={handleTabClick}
                  />
                  <div className="hidden lg:block">
                    <SpecificationGroups currentSpecificationGroupId={specificationGroupId} setCurrentSpecificationGroupId={setSpecificationGroupId} />
                  </div>
                </div>
                <div className="flex items-center gap-x-8">
                  <div className="hidden lg:block">
                    <Button
                      type={"button"}
                      onClick={handleStartNewDesign}
                      text={"Start new design"}
                      style={"outline"}
                      fullWidth={false}
                    />
                  </div>
                  <div className="hidden lg:block">
                    <Button
                      type={"button"}
                      onClick={() => setIsOpenAddNewCollection(true)}
                      text={"Add new collection"}
                      style={"outline"}
                      fullWidth={false}
                    />
                  </div>
                </div>
              </div>
              <div className="lg:hidden flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-3">
                <SpecificationGroups currentSpecificationGroupId={specificationGroupId} setCurrentSpecificationGroupId={setSpecificationGroupId} />
                <Button
                  type={"button"}
                  onClick={handleStartNewDesign}
                  text={"Start new design"}
                  style={"outline"}
                  fullWidth={false}
                />
              </div>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Cards specificationGroupId={specificationGroupId} status={status} />
              </div>
            </div>
          </main>
        </div>
        <AlertDialog />
        <AddNewCollection isOpen={isOpenAddNewCollection} close={() => setIsOpenAddNewCollection(false)} />
        <Notification />
      </div>
    </>
  )
});

export default Orders;
