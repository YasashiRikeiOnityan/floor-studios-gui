"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import Tabs from "@/components/Tabs";
import DraftsList from "@/components/DraftsList";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Specification } from "@/lib/type";
import { specificationStore } from "@/stores/specificationStore";

const Orders = () => {
  const router = useRouter();
  const tabs = ["Drafts", "Samples", "Bulks"]
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [specifications, setSpecifications] = useState<Specification[]>([]);

  useEffect(() => {
    const fetchSpecifications = async () => {
      const specifications = await specificationStore.getSpecifications();
      setSpecifications(specifications);
    };
    fetchSpecifications();
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleStartNewDesign = () => {
    router.push("/new_design");
  }
  
  return (
    <>
      <div className="min-h-full">
        <Header current="Orders"/>
        <div className="py-5 sm:py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-lg sm:text-3xl font-bold tracking-tight text-gray-900">Orders</h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-y-3 items-start sm:flex-row sm:items-center sm:justify-between">
                <Tabs
                  tabs={tabs}
                  state={activeTab}
                  callBackUpdateState={handleTabClick}
                />
                <Button
                  type={"button"}
                  onClick={handleStartNewDesign}
                  text={"Start new design"}
                  style={"outline"}
                  fullWidth={false}
                />
              </div>
              {activeTab === "Drafts" && <DraftsList specifications={specifications} />}
            </div>
          </main>
        </div>
      </div>
    </>
  )
};

export default Orders;
