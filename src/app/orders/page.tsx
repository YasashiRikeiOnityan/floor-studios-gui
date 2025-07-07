"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import Tabs from "@/components/Tabs";
import Toggle from "@/components/Toggle";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import Cards from "@/components/Cards";
import AllCards from "@/components/AllCards";
import { SpecificationStatus } from "@/lib/type/specification/type";
import AlertDialog from "@/components/AlertDialod";
import Notification from "@/components/Notification";
import { observer } from "mobx-react-lite";
import SpecificationGroups from "@/components/SpecificationGroups";
import AddNewCollection from "@/components/AddNewCollection";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

const OrdersContent = observer(() => {
  const router = useRouter();
  const tabs = ["Drafts", "Completes"]
  const searchParams = useSearchParams();
  // クエリパラメータ取得
  const statusParam = searchParams.get("status");
  const collectionParam = searchParams.get("collection");
  // statusパラメータをタブ名に変換
  const statusToTab = (status: string | null) => {
    if (status === "DRAFT" || status === "DRAFTS") return "Drafts";
    if (status === "COMPLETE" || status === "COMPLETES") return "Completes";
    return "Drafts";
  };
  const initialTab = statusToTab(statusParam);
  const initialGroupId = collectionParam || "NO_GROUP";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [specificationGroupId, setSpecificationGroupId] = useState<string>(initialGroupId);
  const [status, setStatus] = useState<SpecificationStatus>(initialTab === "Drafts" ? "DRAFT" : "COMPLETE");
  const [isOpenAddNewCollection, setIsOpenAddNewCollection] = useState(false);
  const [showAllCollections, setShowAllCollections] = useState(true);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setStatus(tab === "Drafts" ? "DRAFT" : tab === "Completes" ? "COMPLETE" : tab === "Samples" ? "SAMPLE" : "BULK");
    // URLも同期したい場合は下記を有効化
    // router.replace(`/orders?status=${tab === "Drafts" ? "DRAFT" : "COMPLETE"}&collection=${specificationGroupId}`);
  };

  return (
    <>
      <div className="min-h-full bg-white">
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
                  {!showAllCollections && (
                    <div className="hidden lg:block">
                      <SpecificationGroups currentSpecificationGroupId={specificationGroupId} setCurrentSpecificationGroupId={setSpecificationGroupId} />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-x-8">
                  <div className="hidden lg:block">
                    <Toggle
                      enabled={showAllCollections}
                      setEnabled={() => setShowAllCollections(!showAllCollections)}
                      label="Show all collections"
                    />
                  </div>
                  <div className="hidden lg:block">
                    <Button
                      type={"button"}
                      onClick={() => {
                        router.push(`/design/new?collection=NO_GROUP`);
                      }}
                      text={"Add new design"}
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
                {!showAllCollections && (
                  <SpecificationGroups currentSpecificationGroupId={specificationGroupId} setCurrentSpecificationGroupId={setSpecificationGroupId} />
                )}
                <Toggle
                  enabled={showAllCollections}
                  setEnabled={() => setShowAllCollections(!showAllCollections)}
                  label="Show all collections"
                />
              </div>
              <div className="mt-5">
                {showAllCollections ? (
                  <AllCards status={status} />
                ) : (
                  <Cards specificationGroupId={specificationGroupId} status={status} />
                )}
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

const Orders = () => {
  return (
    <Suspense fallback={<Loading />}>
      <OrdersContent />
    </Suspense>
  );
};

export default Orders;
