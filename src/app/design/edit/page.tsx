"use client";

import { Suspense } from "react";
import Loading from "@/components/Loading";
import EditDesignContent from "@/components/EditDesignContent";

const EditDesign = () => {
  return (
    <Suspense fallback={<Loading />}>
      <EditDesignContent />
    </Suspense>
  );
};

export default EditDesign;