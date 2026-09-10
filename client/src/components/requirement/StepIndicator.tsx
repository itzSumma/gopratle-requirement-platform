"use client";

import React from "react";

import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
}

// Defines the steps displayed in the requirement submission flow.
const STEPS = [
  { step: 1, label: "Event Basics" },
  { step: 2, label: "Category Details" },
  { step: 3, label: "Logistics & Budget" },
  { step: 4, label: "Review & Submit" },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-6 sm:mb-8">
      <div className="flex items-center justify-between relative">
        {STEPS.map((item, idx) => {
          // Determine the visual state of each step from the current form step.
          const isCompleted = currentStep > item.step;
          const isActive = currentStep === item.step;

          return (
            <React.Fragment key={item.step}>
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-200 ${
                    isCompleted
                      ? "bg-[#fa5d32] text-white shadow-xs border border-[#fc6f47]"
                      : isActive
                      ? "bg-[#fa5d32] text-white ring-4 ring-[#ffe9e0] shadow-xs border border-[#fc6f47]"
                      : "bg-[#FFFBF8] text-[#8E95A2] border border-[#fc6f47]/40"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    item.step
                  )}
                </div>

                <div className="text-center mt-1.5 sm:mt-2">
                  <p
                    className={`text-[11px] sm:text-xs tracking-tight transition-colors ${
                      isActive || isCompleted
                        ? "text-[#1E2024] font-bold"
                        : "text-[#8E95A2] font-medium"
                    }`}
                  >
                    {item.label}
                  </p>
                </div>
              </div>

              {idx < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1.5 sm:mx-2 -mt-5 transition-colors duration-200 ${
                    currentStep > item.step
                      ? "bg-[#fa5d32]"
                      : "bg-[#fc6f47]/20"
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