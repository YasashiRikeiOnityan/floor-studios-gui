// import { CheckCircleIcon } from "@heroicons/react/20/solid";

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
  // return (
  //   <div className="w-64 border-r border-gray-200 pl-4 sm:pl-6 lg:pl-10 shrink-0">
  //     <nav aria-label="Progress">
  //       <ol role="list" className="space-y-6">
  //         {props.steps.map((step) => (
  //           <li key={step.name}>
  //             {step.order < props.actualStep ? (
  //               <button
  //                 onClick={() => { props.setCurrentStep(step.order) }}
  //                 className="group w-full text-left cursor-pointer"
  //               >
  //                 <span className="flex items-start">
  //                   <span className="relative flex size-5 shrink-0 items-center justify-center">
  //                     <CheckCircleIcon
  //                       aria-hidden="true"
  //                       className="size-full text-blue-600 group-hover:text-blue-800"
  //                     />
  //                   </span>
  //                   <span className={`ml-3 text-sm font-medium ${step.order === props.currentStep ? "text-blue-600" : "text-gray-500"} group-hover:text-gray-900`}>
  //                     {step.name}
  //                   </span>
  //                 </span>
  //               </button>
  //             ) : step.order === props.actualStep ? (
  //               <button
  //                 onClick={() => { props.setCurrentStep(step.order) }}
  //                 className="flex w-full items-start cursor-pointer"
  //                 aria-current="step"
  //               >
  //                 <span aria-hidden="true" className="relative flex size-5 shrink-0 items-center justify-center">
  //                   <span className="absolute size-4 rounded-full bg-blue-200" />
  //                   <span className="relative block size-2 rounded-full bg-blue-600" />
  //                 </span>
  //                 <span className={`ml-3 text-sm font-medium ${step.order === props.currentStep ? "text-blue-600" : "text-gray-500"} group-hover:text-gray-900`}>
  //                   {step.name}
  //                 </span>
  //               </button>
  //             ) : (
  //               <button
  //                 onClick={() => { props.setCurrentStep(step.order) }}
  //                 className={`group w-full text-left ${step.order > props.actualStep ? "text-gray-300" : "text-gray-500 cursor-pointer"}`}
  //                 disabled={step.order > props.actualStep}
  //               >
  //                 <div className="flex items-start">
  //                   <div aria-hidden="true" className="relative flex size-5 shrink-0 items-center justify-center">
  //                     <div className="size-2 rounded-full bg-gray-300" />
  //                     {/* <div className="size-2 rounded-full bg-gray-300 group-hover:bg-gray-400" /> */}
  //                   </div>
  //                   <p className="ml-3 text-sm font-medium text-gray-500">{step.name}</p>
  //                   {/* <p className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</p> */}
  //                 </div>
  //               </button>
  //             )}
  //           </li>
  //         ))}
  //       </ol>
  //     </nav>
  //   </div>
  // );
};

export default ProgressBar;
