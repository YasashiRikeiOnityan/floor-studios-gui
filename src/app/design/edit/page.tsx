"use client";

import { useSearchParams } from "next/navigation";
import { observer } from "mobx-react-lite";
import { Suspense, useEffect, useState } from "react";
import { specificationStore } from "@/stores/specificationStore";
import Header from "@/components/Header";
import SelectType from "@/components/SelectType";
import Loading from "@/components/Loading";
import { TShirtEditSteps } from "@/lib/type/specification/t-shirt/type";
import TShirtFit from "@/components/TShirtFit";
import Information from "@/components/Information";
import TShirtMainProduction from "@/components/TShirtMainProduction";
import TShirtFabric from "@/components/TShirtFabric";
import ProgressBar from "@/components/ProgressBar";
import TShirtsSample from "@/components/TShirtsSample";
import OEMPoint from "@/components/OEMPoint";

const EditDesignContent = observer(() => {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const specificationId = searchParams.get("id") || "";

  const [mounted, setMounted] = useState(false);
  const [actualStep, setActualStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchSpecification = async () => {
      if (mounted && specificationId) {
        await specificationStore.getSpecificationsSpecificationId(specificationId);
        const currentStepIndex = TShirtEditSteps.findIndex(step => step.progress === specificationStore.currentSpecification?.progress);
        if (currentStepIndex <= 0) {
          setActualStep(1);
          setCurrentStep(1);
        } else {
          setActualStep(currentStepIndex);
          setCurrentStep(currentStepIndex);
        }
      }
    };
    fetchSpecification();
  }, [specificationId, mounted]);

  const callBackUpdateState = (step: number) => {
    if (step < actualStep) {
      setCurrentStep(actualStep);
    } else {
      setCurrentStep(step);
      setActualStep(step);
    }
  }

  const renderContent = () => {
    if (specificationStore.loading) {
      return <Loading />;
    }
    if (specificationStore.currentSpecification.type === "T-SHIRT") {
      switch (currentStep) {
        case 1:
          return <SelectType callBackUpdateState={() => {callBackUpdateState(2)}} isUpdateProgress={actualStep === 1} />
        case 2:
            return <TShirtFit callBackUpdateState={() => {callBackUpdateState(3)}} isUpdateProgress={actualStep === 2} />
        case 3:
          return <TShirtFabric callBackUpdateState={() => {callBackUpdateState(4)}} isUpdateProgress={actualStep === 3} />
        case 4:
          return <>Tag</>
        case 5:
          return <>Carelabel</>
        case 6:
          return <OEMPoint callBackUpdateState={() => {callBackUpdateState(7)}} isUpdateProgress={actualStep === 6} />
        case 7:
          return <TShirtsSample callBackUpdateState={() => {callBackUpdateState(8)}} isUpdateProgress={actualStep === 7} />
        case 8:
          return <TShirtMainProduction callBackUpdateState={() => {callBackUpdateState(9)}} isUpdateProgress={actualStep === 8} />
        case 9:
            return <Information callBackUpdateState={() => {callBackUpdateState(10)}} isUpdateProgress={actualStep === 9} />
        default:
          return <></>;
      }
    } else {
      return <>{specificationStore.currentSpecification.type} is not supported</>
    }
  };

  const steps = TShirtEditSteps.filter(step => step.progress !== "INITIAL" && step.progress !== "COMPLETE");

  return (
    <div className="flex min-h-full">
      <Header current="" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 mt-16 py-5 sm:py-10 w-full">
        {/* プログレスバー */}
        <ProgressBar steps={steps} actualStep={actualStep} currentStep={currentStep} setCurrentStep={setCurrentStep} />
        {/* メインコンテンツ */}
        <div className="flex-1 mt-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
});

const EditDesign = () => {
  return (
    <Suspense fallback={<Loading />}>
      <EditDesignContent />
    </Suspense>
  );
};

export default EditDesign;