"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { specificationStore } from "@/stores/specificationStore";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Header from "@/components/Header";
import Types from "@/components/Types";
import Button from "@/components/Button";

const steps = [
  { name: "Type", href: "#", status: "complete" },
  { name: "Fit", href: "#", status: "current" },
  { name: "Fabric", href: "#", status: "upcoming" },
  { name: "Colourway", href: "#", status: "upcoming" },
  { name: "Necklabel", href: "#", status: "upcoming" },
  { name: "Carelabel", href: "#", status: "upcoming" },
];

const EditDesign = observer(() => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const specificationId = searchParams.get("id") || "";
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentType, setCurrentType] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchSpecification = async () => {
      if (mounted && specificationId) {
        const response = await specificationStore.getSpecificationsSpecificationId(specificationId);
        console.log(specificationStore.currentSpecification);
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
    setCurrentStep(index);
    router.push(`/design/edit?id=${specificationId}#${index + 1}`);
  };

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-gray-900">What would you like to design?</h1>
            <p className="mt-2 text-sm text-gray-500">
              Choose the type of design you want to create.
            </p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <Types currentType={currentType} callBackUpdateState={setCurrentType} />
            </div>
            {/* ボタン */}
            <div className="mt-6 flex flex-row gap-x-3 justify-end">
              <Button
                type={"button"}
                onClick={() => {setCurrentType("")}}
                text={"Cancel"}
                style={"text"}
                fullWidth={false}
              />
              <Button
                type={"button"}
                onClick={() => { }}
                text={"Save and Next"}
                style={"fill"}
                fullWidth={false}
              />
            </div>
          </>
        );
      case 1:
        return <div className="w-full">Fit Content</div>;
      case 2:
        return <div className="w-full">Fabric Content</div>;
      case 3:
        return <div className="w-full">Colourway Content</div>;
      case 4:
        return <div className="w-full">Necklabel Content</div>;
      case 5:
        return <div className="w-full">Carelabel Content</div>;
      default:
        return <></>;
    }
  };

  return (
    <div className="flex min-h-full">
      <Header current="" />
      <div className="mx-auto max-w-7xl mt-16 py-5 sm:py-10 flex w-full">
        {/* プログレスバー */}
        <div className="w-72 border-r border-gray-200 px-4 sm:px-6 lg:px-10 shrink-0">
          <nav aria-label="Progress">
            <ol role="list" className="space-y-6">
              {steps.map((step, index) => (
                <li key={step.name}>
                  {index < currentStep ? (
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
                  ) : index === currentStep ? (
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
                    >
                      <div className="flex items-start">
                        <div aria-hidden="true" className="relative flex size-5 shrink-0 items-center justify-center">
                          <div className="size-2 rounded-full bg-gray-300 group-hover:bg-gray-400" />
                        </div>
                        <p className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</p>
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

export default EditDesign;