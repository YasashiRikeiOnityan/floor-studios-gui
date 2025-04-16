"use client";

import Header from "@/components/Header";
import PageTitle from "@/components/PageTitle";
import AlertDialog from "@/components/AlertDialod";
import { observer } from "mobx-react-lite";

const Collections = observer(() => {
  return (
    <>
      <div className="min-h-full">
        <Header current="Collections" />
        <div className="py-5 sm:py-10">
          <PageTitle title="Collections" />
          <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-y-3 items-start sm:flex-row sm:items-center sm:justify-between">
              </div>
            </div>
          </main>
        </div>
        <AlertDialog />
      </div>
    </>
  )
});

export default Collections;
