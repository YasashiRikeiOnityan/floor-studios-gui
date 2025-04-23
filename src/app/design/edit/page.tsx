"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { Suspense, useEffect, useState } from "react";
import { specificationStore } from "@/stores/specificationStore";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Header from "@/components/Header";
import SelectType from "@/components/SelectType";
import Loading from "@/components/Loading";
import { EditSteps } from "@/lib/type";

const EditDesignContent = observer(() => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const specificationId = searchParams.get("id") || "";
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchSpecification = async () => {
      if (mounted && specificationId) {
        await specificationStore.getSpecificationsSpecificationId(specificationId);
      }
    };
    fetchSpecification();
  }, [specificationId, mounted]);

  // URLのハッシュを監視
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const stepIndex = parseInt(hash.substring(1)) - 1; // #1 -> 0
        if (!isNaN(stepIndex) && stepIndex >= 0 && stepIndex < steps.length) {
          setCurrentStep(stepIndex);
        }
      }
    };

    // 初期ロード時とハッシュ変更時の処理
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleStepClick = (index: number) => {
    console.log(currentStep)
    setCurrentStep(index);
    router.push(`/design/edit?id=${specificationId}#${index + 1}`);
  };

  const renderContent = () => {
    switch (specificationStore.currentSpecification.progress) {
      case "INITIAL":
        return <SelectType callBackUpdateState={handleStepClick} />;
      default:
        return <></>;
    }
  };

  const steps = EditSteps.filter(step => step.progress !== "INITIAL" && step.progress !== "COMPLETE");
  const currentStepIndex = EditSteps.findIndex(step => step.progress === specificationStore.currentSpecification.progress);
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
              {steps.map((step, index) => (
                <li key={step.name}>
                  {step.order <= currentStepIndex ? (
                    <button
                      onClick={() => handleStepClick(index)}
                      className="group w-full text-left"
                    >
                      <span className="flex items-start">
                        <span className="relative flex size-5 shrink-0 items-center justify-center">
                          <CheckCircleIcon
                            aria-hidden="true"
                            className="size-full text-indigo-600 group-hover:text-indigo-800"
                          />
                        </span>
                        <span className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                          {step.name}
                        </span>
                      </span>
                    </button>
                  ) : step.order === currentStepIndex + 1 ? (
                    <button
                      onClick={() => handleStepClick(index)}
                      className="flex w-full items-start"
                      aria-current="step"
                    >
                      <span aria-hidden="true" className="relative flex size-5 shrink-0 items-center justify-center">
                        <span className="absolute size-4 rounded-full bg-indigo-200" />
                        <span className="relative block size-2 rounded-full bg-indigo-600" />
                      </span>
                      <span className="ml-3 text-sm font-medium text-indigo-600">{step.name}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStepClick(index)}
                      className="group w-full text-left"
                      disabled={true}
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