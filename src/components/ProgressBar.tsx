import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

type ProgressBarProps = {
  steps: {
    name: string;
    order: number;
  }[];
  actualStep: number;
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

const ProgressBar = (props: ProgressBarProps) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/orders`} className="text-sm text-blue-600 flex flex-row items-center gap-x-2">
          <span className="text-blue-600">
            <ArrowLeftIcon className="w-4 h-4" />
          </span>
          Back to Orders
        </Link>
        {props.steps.map((step) => (
          <li key={step.name} className="md:flex-1">
            {step.order < props.actualStep ? (
              <button
                onClick={() => { props.setCurrentStep(step.order) }}
                className="group flex flex-col w-full text-left border-l-4 border-blue-600 py-2 pl-4 hover:border-blue-800 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 cursor-pointer"
              >
                {/* <span className="text-sm font-medium text-blue-600 group-hover:text-blue-800">{step.order}</span> */}
                <span className={`text-sm font-medium ${step.order === props.currentStep ? "text-blue-600" : "text-gray-500"}`}>{step.name}</span>
              </button>
            ) : step.order === props.actualStep ? (
              <button
                onClick={() => { props.setCurrentStep(step.order) }}
                aria-current="step"
                className="flex flex-col w-full text-left border-l-4 border-blue-600 py-2 pl-4 hover:border-blue-800 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 cursor-pointer"
              >
                {/* <span className="text-sm font-medium text-blue-600">{step.order}</span> */}
                <span className={`text-sm font-medium ${step.order === props.currentStep ? "text-blue-600" : "text-gray-500"}`}>{step.name}</span>
              </button>
            ) : (
              <button
                onClick={() => { props.setCurrentStep(step.order) }}
                className="group flex flex-col w-full text-left border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                disabled={step.order > props.actualStep}
              >
                {/* <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">{step.order}</span> */}
                <span className={`text-sm font-medium ${step.order === props.currentStep ? "text-blue-600" : "text-gray-500"}`}>{step.name}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
};

export default ProgressBar;
