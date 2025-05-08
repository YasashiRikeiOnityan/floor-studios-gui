import { CheckCircleIcon } from "@heroicons/react/20/solid";

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
    <div className="w-64 border-r border-gray-200 pl-4 sm:pl-6 lg:pl-10 shrink-0">
      <nav aria-label="Progress">
        <ol role="list" className="space-y-6">
          {props.steps.map((step) => (
            <li key={step.name}>
              {step.order < props.actualStep ? (
                <button
                  onClick={() => { props.setCurrentStep(step.order) }}
                  className="group w-full text-left cursor-pointer"
                >
                  <span className="flex items-start">
                    <span className="relative flex size-5 shrink-0 items-center justify-center">
                      <CheckCircleIcon
                        aria-hidden="true"
                        className="size-full text-indigo-600 group-hover:text-indigo-800"
                      />
                    </span>
                    <span className={`ml-3 text-sm font-medium ${step.order === props.currentStep ? "text-indigo-600" : "text-gray-500"} group-hover:text-gray-900`}>
                      {step.name}
                    </span>
                  </span>
                </button>
              ) : step.order === props.actualStep ? (
                <button
                  onClick={() => { props.setCurrentStep(step.order) }}
                  className="flex w-full items-start cursor-pointer"
                  aria-current="step"
                >
                  <span aria-hidden="true" className="relative flex size-5 shrink-0 items-center justify-center">
                    <span className="absolute size-4 rounded-full bg-indigo-200" />
                    <span className="relative block size-2 rounded-full bg-indigo-600" />
                  </span>
                  <span className={`ml-3 text-sm font-medium ${step.order === props.currentStep ? "text-indigo-600" : "text-gray-500"} group-hover:text-gray-900`}>
                    {step.name}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => { props.setCurrentStep(step.order) }}
                  className={`group w-full text-left ${step.order > props.actualStep ? "text-gray-300" : "text-gray-500 cursor-pointer"}`}
                  disabled={step.order > props.actualStep}
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
  );
};

export default ProgressBar;
