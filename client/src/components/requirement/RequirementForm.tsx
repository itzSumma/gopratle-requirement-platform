
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
      <div className="max-w-xl mx-auto my-12 p-8 bg-white rounded-xl shadow-sm border border-zinc-200 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 mb-2">
          Requirement Submitted!
        </h2>

        <p className="text-zinc-600 mb-6">
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
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Post Another Requirement
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
      <StepIndicator currentStep={currentStep} />

      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {apiError}
        </div>
      )}

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
  );
};

