'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

const STEPS = [
  { step: 1, label: 'Event Basics' },
  { step: 2, label: 'Category Details' },
  { step: 3, label: 'Logistics & Budget' },
  { step: 4, label: 'Review & Submit' },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="flex items-center justify-between relative">
        {STEPS.map((item, idx) => {
          const isCompleted = currentStep > item.step;
          const isActive = currentStep === item.step;

          return (
            <React.Fragment key={item.step}>
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : isActive
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-sm'
                      : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    item.step
                  )}
                </div>

                <div className="text-center mt-2">
                  <p
                    className={`text-xs font-medium tracking-tight ${
                      isActive || isCompleted
                        ? 'text-zinc-900 font-semibold'
                        : 'text-zinc-400'
                    }`}
                  >
                    {item.label}
                  </p>
                </div>
              </div>

              {idx < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 -mt-5 transition-colors duration-200 ${
                    currentStep > item.step
                      ? 'bg-emerald-600'
                      : 'bg-zinc-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};