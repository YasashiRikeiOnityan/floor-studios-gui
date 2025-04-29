"use client";

import { useSearchParams } from "next/navigation";
import { observer } from "mobx-react-lite";
import { Suspense, useEffect, useState } from "react";
import { specificationStore } from "@/stores/specificationStore";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Header from "@/components/Header";
import SelectType from "@/components/SelectType";
import Loading from "@/components/Loading";
import { EditSteps } from "@/lib/type";
import TShirtFit from "@/components/TShirtFit";
import Information from "@/components/Information";

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
        const currentStepIndex = EditSteps.findIndex(step => step.progress === specificationStore.currentSpecification.progress);
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
      return <Loading full={true} />;
    }
    switch (currentStep) {
      case 1:
        return <SelectType callBackUpdateState={() => {callBackUpdateState(1)}} />
      case 2:
        if (specificationStore.currentSpecification.type === "T-SHIRT") {
          return <TShirtFit callBackUpdateState={() => {callBackUpdateState(2)}} />
        } else if (specificationStore.currentSpecification.type === "SHORTS") {
          return <>ここ</>
        } else {
          return <SelectType callBackUpdateState={() => {callBackUpdateState(1)}} />
        }
      case 3:
        return <>Fabric</>
      case 4:
        return <>Colurway</>
      case 5:
        return <>Necklabel</>
      case 6:
        return <>Carelabel</>
      case 7:
        return <>OEM Point</>
      case 8:
        return <>Sample</>
      case 9:
        return <>Main Production</>
      case 10:
        return <Information />
      default:
        return <></>;
    }
  };

  const steps = EditSteps.filter(step => step.progress !== "INITIAL" && step.progress !== "COMPLETE");
  // const currentStepName = EditSteps[currentStepIndex]?.name || "";
  // const currentStepProgress = EditSteps[currentStepIndex]?.progress || "";
  // const currentStepOrder = EditSteps[currentStepIndex]?.order || 0;
  // const currentStepId = EditSteps[currentStepIndex]?.progress || "";
  // const currentStepUrl = `/design/edit?id=${specificationId}#${currentStepOrder + 1}`;

  return (
    <div className="flex min-h-full">
      <Header current="" />
      <div className="mx-auto max-w-7xl mt-16 py-5 sm:py-10 flex w-full">
        {/* プログレスバー */}
        <div className="w-64 border-r border-gray-200 pl-4 sm:pl-6 lg:pl-10 shrink-0">
          <nav aria-label="Progress">
            <ol role="list" className="space-y-6">
              {steps.map((step) => (
                <li key={step.name}>
                  {step.order < actualStep ? (
                    <button
                      onClick={() => {setCurrentStep(step.order)}}
                      className="group w-full text-left cursor-pointer"
                    >
                      <span className="flex items-start">
                        <span className="relative flex size-5 shrink-0 items-center justify-center">
                          <CheckCircleIcon
                            aria-hidden="true"
                            className="size-full text-indigo-600 group-hover:text-indigo-800"
                          />
                        </span>
                        <span className={`ml-3 text-sm font-medium ${step.order === currentStep ? "text-indigo-600" : "text-gray-500"} group-hover:text-gray-900`}>
                          {step.name}
                        </span>
                      </span>
                    </button>
                  ) : step.order === actualStep ? (
                    <button
                      onClick={() => {setCurrentStep(step.order)}}
                      className="flex w-full items-start cursor-pointer"
                      aria-current="step"
                    >
                      <span aria-hidden="true" className="relative flex size-5 shrink-0 items-center justify-center">
                        <span className="absolute size-4 rounded-full bg-indigo-200" />
                        <span className="relative block size-2 rounded-full bg-indigo-600" />
                      </span>
                      <span className={`ml-3 text-sm font-medium ${step.order === currentStep ? "text-indigo-600" : "text-gray-500"} group-hover:text-gray-900`}>
                        {step.name}
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {setCurrentStep(step.order)}}
                      className={`group w-full text-left ${step.order > actualStep ? "text-gray-300" : "text-gray-500 cursor-pointer"}`}
                      disabled={step.order > actualStep}
                    >
                      <div className="flex items-start">
                        <div aria-hidden="true" className="relative flex size-5 shrink-0 items-center justify-center">
                          <div className="size-2 rounded-full bg-gray-300" />
                          {/* <div className="size-2 rounded-full bg-gray-300 group-hover:bg-gray-400" /> */}
                        </div>
                        <p className="ml-3 text-sm font-medium text-gray-500">{step.name}</p>
                        {/* <p className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</p> */}
                      </div>
                    </button>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* メインコンテンツ */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8">
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