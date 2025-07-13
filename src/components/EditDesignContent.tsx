import { useSearchParams } from "next/navigation";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { specificationStore } from "@/stores/specificationStore";
import Header from "@/components/Header";
import { TShirtEditSteps } from "@/lib/type/specification/t-shirt/type";
import { BottomsEditSteps } from "@/lib/type/specification/bottoms/type";
import TShirtFit from "@/components/TShirtFit";
import Information from "@/components/Information";
import TShirtMainProduction from "@/components/TShirtMainProduction";
import TShirtFabric from "@/components/TShirtFabric";
import Tag from "@/components/Tag";
import ProgressBar from "@/components/ProgressBar";
import TShirtsSample from "@/components/TShirtsSample";
import OEMPoint from "@/components/OEMPoint";
import AlertDialog from "@/components/AlertDialod";
import CareLabel from "@/components/CareLabel";
import Notification from "@/components/Notification";
import SuccessDialog from "@/components/SuccessDialog";
import BasicInformation from "@/components/BasicInformation";
import Loading from "@/components/Loading";
import BottomsFit from "@/components/BottomsFit";
import BottomsFabric from "@/components/BottomsFabric";
import BottomsTag from "@/components/BottomsTag";
import BottomsCarelabel from "@/components/BottomsCarelabel";
import BottomsOEMPoint from "@/components/BottomsOEMPoint";
import BottomsPatch from "@/components/BottomsPatch";
import BottomsSample from "@/components/BottomsSample";
import BottomsMainProduction from "@/components/BottomsMainProduction";
import BottomsInformation from "@/components/BottomsInformation";

const EditDesignContent = observer(() => {
  const searchParams = useSearchParams();
  const specificationId = searchParams.get("id") || "";

  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [actualStep, setActualStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    if (specificationId) {
      const fetchSpecification = async () => {
        try {
          setIsLoading(true);
          await specificationStore.getSpecificationsSpecificationId(specificationId);
          if (["T-SHIRT", "LONG_SLEEVE", "CREWNECK", "HOODIE", "ZIP_HOODIE", "HALF_ZIP", "KNIT_CREWNECK"].includes(specificationStore.currentSpecification?.type || "")) {
            const currentStepIndex = TShirtEditSteps.findIndex(step => step.progress === specificationStore.currentSpecification?.progress);
            setCurrentStep(currentStepIndex + 1);
            setActualStep(currentStepIndex + 1);
          } else if (["SWETPANTS1"].includes(specificationStore.currentSpecification?.type || "")) {
            const currentStepIndex = BottomsEditSteps.findIndex(step => step.progress === specificationStore.currentSpecification?.progress);
            setCurrentStep(currentStepIndex + 1);
            setActualStep(currentStepIndex + 1);
          }
        } catch (error) {
          console.error("Failed to fetch specification:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSpecification();
    }
  }, [mounted, specificationId]);

  const callBackUpdateState = (step: number) => {
    if (step < actualStep) {
      setCurrentStep(step);
    } else {
      setCurrentStep(step);
      setActualStep(step);
    }
  }

  const renderContent = () => {
    if (["T-SHIRT", "LONG_SLEEVE", "CREWNECK", "HOODIE", "ZIP_HOODIE", "HALF_ZIP", "KNIT_CREWNECK"].includes(specificationStore.currentSpecification?.type || "")) {
      switch (currentStep) {
        case 1:
          return <BasicInformation callBackUpdateState={() => { callBackUpdateState(2) }} isUpdateProgress={actualStep === 1} />;
        case 2:
          return <TShirtFit callBackUpdateState={() => { callBackUpdateState(3) }} isUpdateProgress={actualStep === 2} />
        case 3:
          return <TShirtFabric callBackUpdateState={() => { callBackUpdateState(4) }} isUpdateProgress={actualStep === 3} />
        case 4:
          return <Tag callBackUpdateState={() => { callBackUpdateState(5) }} isUpdateProgress={actualStep === 4} />
        case 5:
          return <CareLabel callBackUpdateState={() => { callBackUpdateState(6) }} isUpdateProgress={actualStep === 5} />
        case 6:
          return <OEMPoint callBackUpdateState={() => { callBackUpdateState(7) }} isUpdateProgress={actualStep === 6} />
        case 7:
          return <TShirtsSample callBackUpdateState={() => { callBackUpdateState(8) }} isUpdateProgress={actualStep === 7} />
        case 8:
          return <TShirtMainProduction callBackUpdateState={() => { callBackUpdateState(9) }} isUpdateProgress={actualStep === 8} />
        case 9:
          return <Information callBackUpdateState={() => { callBackUpdateState(10) }} isUpdateProgress={actualStep === 9} />
        default:
          return <BasicInformation callBackUpdateState={() => { callBackUpdateState(2) }} isUpdateProgress={actualStep === 1} />;
      }
    } else if (["SWETPANTS1"].includes(specificationStore.currentSpecification?.type || "")) {
      switch (currentStep) {
        case 1:
          return <BasicInformation callBackUpdateState={() => { callBackUpdateState(2) }} isUpdateProgress={actualStep === 1} />;
        case 2:
          return <BottomsFit callBackUpdateState={() => { callBackUpdateState(3) }} isUpdateProgress={actualStep === 2} />
        case 3:
          return <BottomsFabric callBackUpdateState={() => { callBackUpdateState(4) }} isUpdateProgress={actualStep === 3} />
        case 4:
          return <BottomsTag callBackUpdateState={() => { callBackUpdateState(5) }} isUpdateProgress={actualStep === 4} />
        case 5:
          return <BottomsCarelabel callBackUpdateState={() => { callBackUpdateState(6) }} isUpdateProgress={actualStep === 5} />
        case 6:
          return <BottomsPatch callBackUpdateState={() => { callBackUpdateState(7) }} isUpdateProgress={actualStep === 6} />
        case 7:
          return <BottomsOEMPoint callBackUpdateState={() => { callBackUpdateState(8) }} isUpdateProgress={actualStep === 7} />
        case 8:
          return <BottomsSample callBackUpdateState={() => { callBackUpdateState(9) }} isUpdateProgress={actualStep === 8} />
        case 9:
          return <BottomsMainProduction callBackUpdateState={() => { callBackUpdateState(10) }} isUpdateProgress={actualStep === 9} />
        case 10:
          return <BottomsInformation callBackUpdateState={() => { callBackUpdateState(11) }} isUpdateProgress={actualStep === 10} />
        default:
          return <BasicInformation callBackUpdateState={() => { callBackUpdateState(2) }} isUpdateProgress={actualStep === 1} />;
      }
    } else {
      return <>{specificationStore.currentSpecification?.type} is not supported</>
    }
  };

  let steps: { order: number, name: string, progress: string }[] = [];
  if (["T-SHIRT", "LONG_SLEEVE", "CREWNECK", "HOODIE", "ZIP_HOODIE", "HALF_ZIP", "KNIT_CREWNECK"].includes(specificationStore.currentSpecification?.type || "")) {
    steps = TShirtEditSteps.filter(step => step.progress !== "INITIAL" && step.progress !== "COMPLETE");
  } else if (["SWETPANTS1"].includes(specificationStore.currentSpecification?.type || "")) {
    steps = BottomsEditSteps.filter(step => step.progress !== "INITIAL" && step.progress !== "COMPLETE");
  }

  return (
    <>
      <div className="flex min-h-full bg-white">
        <Header current="" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 mt-16 py-5 sm:py-10 w-full">
          {/* プログレスバー */}
          <ProgressBar steps={steps} actualStep={actualStep} currentStep={currentStep} setCurrentStep={setCurrentStep} />
          {/* メインコンテンツ */}
          <div className="flex-1 mt-4">
            {isLoading ? <Loading /> : renderContent()}
          </div>
        </div>
      </div>
      <Notification />
      <AlertDialog />
      <SuccessDialog />
    </>
  );
});

export default EditDesignContent; 