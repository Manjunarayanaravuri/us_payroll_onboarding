
import React from 'react';
import { CheckIcon } from './icons/Icon';

interface Step {
    id: string;
    name: string;
    subText: string;
}

interface Props {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
}

const OnboardingStepper: React.FC<Props> = ({ steps, currentStep, onStepClick }) => {
  return (
    <nav className="bg-white rounded-lg shadow-sm border border-frappe-gray-200 p-6" aria-label="Progress">
      <ol role="list" className="space-y-6">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative">
            {stepIdx !== steps.length - 1 ? (
              <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-frappe-gray-300" aria-hidden="true" />
            ) : null}

            {(() => {
                const isCompleted = currentStep > stepIdx;
                const isCurrent = currentStep === stepIdx;
                const isClickable = isCompleted && steps[currentStep].id === 'review';

                const statusClasses = isCompleted 
                    ? 'bg-frappe-blue-600' 
                    : isCurrent 
                    ? 'border-2 border-frappe-blue-600 bg-white' 
                    : 'border-2 border-gray-300 bg-white';
                
                const textClasses = isCurrent ? 'text-frappe-blue-600' : 'text-frappe-gray-900';
                const subTextClasses = isCurrent ? 'text-frappe-blue-500' : 'text-frappe-gray-500';
                
                return (
                    <div onClick={() => isClickable && onStepClick(stepIdx)} className={`relative flex items-start group ${isClickable ? 'cursor-pointer' : ''}`}>
                      <span className="flex h-9 items-center" aria-hidden="true">
                        <span className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${statusClasses}`}>
                          {isCompleted ? (
                            <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                          ) : isCurrent ? (
                            <span className="h-2.5 w-2.5 rounded-full bg-frappe-blue-600" />
                          ) : null}
                        </span>
                      </span>
                      <span className="ml-4 flex min-w-0 flex-col">
                        <span className={`text-sm font-semibold ${textClasses}`}>{step.name}</span>
                        <span className={`text-sm ${subTextClasses}`}>{step.subText}</span>
                      </span>
                    </div>
                );
            })()}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default OnboardingStepper;
