"use client";

import { useState } from "react";
import Header from "@/components/Header";
import PageTitle from "@/components/PageTitle";
import AlertDialog from "@/components/AlertDialod";
import Notification from "@/components/Notification";
import Button from "@/components/Button";
import SpecificationGroupsCards from "@/components/SpecificationGroupsCards";
import AddNewCollection from "@/components/AddNewCollection";

const Collections = () => {
  const [isOpenAddNewCollection, setIsOpenAddNewCollection] = useState(false);
  return (
    <>
      <div className="min-h-full bg-gray-50">
        <Header current="Collections" />
        <div className="mt-16 py-5 sm:py-10">
          <PageTitle title="Collections" />
          <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
              <div className="flex justify-end">
                <Button
                  type={"button"}
                  onClick={() => setIsOpenAddNewCollection(true)}
                  text={"Add new collection"}
                  style={"outline"}
                  fullWidth={false}
                />
              </div>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <SpecificationGroupsCards />
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
};

export default Collections;
