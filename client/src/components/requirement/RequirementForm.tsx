'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ZodError } from 'zod';

import { StepIndicator } from './StepIndicator';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { StepThree } from './StepThree';
import { ReviewStep } from './ReviewStep';
import {
  RequirementFormData,
  RequirementCategory,
} from '../../types/requirement';
import {
  stepOneSchema,
  performerDetailsSchema,
  plannerDetailsSchema,
  crewDetailsSchema,
  performerLogisticsSchema,
  plannerLogisticsSchema,
  crewLogisticsSchema,
} from '../../validations/requirement';
import { createRequirement } from '../../lib/api';

const INITIAL_DATA: RequirementFormData = {
  eventDetails: {
    eventName: '',
    eventType: '',
    startDate: '',
    endDate: '',
    location: '',
    venue: '',
  },
  category: 'PERFORMER',
  categoryDetails: {
    performanceType: '',
    duration: '',
    numberOfPerformers: 1,
  },
  logisticsDetails: {
    soundEquipment: [],
    stageRequirements: '',
    technicalRequirements: '',
    budget: 0,
  },
};

export const RequirementForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] =
    useState<RequirementFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');

  const updateFormData = (fields: Partial<RequirementFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...fields,
    }));

    setErrors({});
  };

  const handleCategoryChange = (category: RequirementCategory) => {
    let initialCategoryDetails: RequirementFormData['categoryDetails'];
    let initialLogisticsDetails: RequirementFormData['logisticsDetails'];

    if (category === 'PERFORMER') {
      initialCategoryDetails = {
        performanceType: '',
        duration: '',
        numberOfPerformers: 1,
      };

      initialLogisticsDetails = {
        soundEquipment: [],
        stageRequirements: '',
        technicalRequirements: '',
        budget: 0,
      };
    } else if (category === 'EVENT_PLANNER') {
      initialCategoryDetails = {
        serviceType: '',
        expectedGuests: 1,
        planningRequirements: '',
      };

      initialLogisticsDetails = {
        servicesNeeded: [],
        budget: 0,
        additionalRequirements: '',
      };
    } else {
      initialCategoryDetails = {
        crewType: '',
        numberOfCrew: 1,
        skillRequirement: '',
      };

      initialLogisticsDetails = {
        workDuration: '',
        shiftTiming: '',
        equipmentRequirement: '',
        budget: 0,
        additionalRequirements: '',
      };
    }

    setFormData((prev) => ({
      ...prev,
      category,
      categoryDetails: initialCategoryDetails,
      logisticsDetails: initialLogisticsDetails,
    }));

    setErrors({});
  };

  const validateCurrentStep = (): boolean => {
    try {
      if (currentStep === 1) {
        stepOneSchema.parse({
          eventDetails: formData.eventDetails,
          category: formData.category,
        });
      }

      if (currentStep === 2) {
        if (formData.category === 'PERFORMER') {
          performerDetailsSchema.parse(formData.categoryDetails);
        } else if (formData.category === 'EVENT_PLANNER') {
          plannerDetailsSchema.parse(formData.categoryDetails);
        } else {
          crewDetailsSchema.parse(formData.categoryDetails);
        }
      }

      if (currentStep === 3) {
        if (formData.category === 'PERFORMER') {
          performerLogisticsSchema.parse(formData.logisticsDetails);
        } else if (formData.category === 'EVENT_PLANNER') {
          plannerLogisticsSchema.parse(formData.logisticsDetails);
        } else {
          crewLogisticsSchema.parse(formData.logisticsDetails);
        }
      }

      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};

        error.issues.forEach((issue) => {
          const key = issue.path.join('.');
          fieldErrors[key] = issue.message;
        });

        setErrors(fieldErrors);
      }

      return false;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setApiError('');

    try {
      await createRequirement(formData);
      setIsSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.';

      setApiError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-lg mx-auto py-10 px-6 bg-[#FFFBF8] border border-orange-100/80 rounded-2xl text-center shadow-xs">
        <div className="w-16 h-16 bg-[#ffe9e0] text-[#fa5d32] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#fa5d32]/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h2 className="text-2xl font-bold text-[#1E2024] mb-2 tracking-tight">
          Requirement Submitted!
        </h2>

        <p className="text-[#555A64] text-sm mb-6 leading-relaxed">
          Your event requirement has been successfully submitted and saved.
        </p>

        <button
          onClick={() => {
            setFormData(INITIAL_DATA);
            setCurrentStep(1);
            setErrors({});
            setApiError('');
            setIsSubmitted(false);
          }}
          className="px-6 py-2.5 bg-[#fa5d32] text-white font-medium rounded-xl hover:bg-[#e65027] transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          Post Another Requirement
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-start">
      <StepIndicator currentStep={currentStep} />

      {apiError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs sm:text-sm">
          {apiError}
        </div>
      )}

      <div className="w-full">
        {currentStep === 1 && (
          <StepOne
            formData={formData}
            updateFormData={updateFormData}
            handleCategoryChange={handleCategoryChange}
            errors={errors}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <StepTwo
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <StepThree
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 4 && (
          <ReviewStep
            formData={formData}
            onBack={handleBack}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};