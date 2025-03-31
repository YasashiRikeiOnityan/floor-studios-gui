"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import Tabs from "@/components/Tabs";
import DraftsList from "@/components/DraftsList";
import { useState } from "react";
import { signInUserStore } from "@/stores/signInUserStore";
const Orders = () => {
  const tabs = ["Drafts", "Samples", "Bulks"]
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  console.log("Orders", signInUserStore.getUserId());
  
  return (
    <>
      <div className="min-h-full">
        <Header current="Orders"/>
        <div className="py-5 sm:py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Orders</h1>
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
                  onClick={() => { }}
                  text={"Start new design"}
                  outlined={true}
                  fullWidth={false}
                />
              </div>
              {activeTab === "Drafts" && <DraftsList />}
            </div>
          </main>
        </div>
      </div>
    </>
  )
};

export default Orders;
