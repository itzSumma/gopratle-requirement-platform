'use client';

import React from 'react';
import { RequirementFormData, RequirementCategory } from '../../types/requirement';
import { CategorySelector } from './CategorySelector';
import { ArrowRight } from 'lucide-react';

interface StepOneProps {
  formData: RequirementFormData;
  updateFormData: (fields: Partial<RequirementFormData>) => void;
  handleCategoryChange: (category: RequirementCategory) => void;
  errors: Record<string, string>;
  onNext: () => void;
}

export const StepOne: React.FC<StepOneProps> = ({
  formData,
  updateFormData,
  handleCategoryChange,
  errors,
  onNext,
}) => {
  const { eventDetails, category } = formData;

  const handleFieldChange = (
    field: keyof typeof eventDetails,
    value: string
  ) => {
    updateFormData({
      eventDetails: {
        ...eventDetails,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="border-b border-orange-100/80 pb-3">
        <h3 className="text-base sm:text-lg font-bold text-[#1E2024] tracking-tight">
          Event Basics
        </h3>
        <p className="text-[11.5px] sm:text-xs text-[#555A64] mt-0.5">
          Tell us about the essential schedule and location of your event.
        </p>
      </div>

      <div className="space-y-3">
        {/* Event Name */}
        <div>
          <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
            Event Name <span className="text-[#fa5d32]">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Annual Cultural Fest 2026"
            value={eventDetails.eventName}
            onChange={(e) => handleFieldChange('eventName', e.target.value)}
            className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
          />
          {errors['eventDetails.eventName'] && (
            <p className="text-[11px] text-red-500 mt-0.5 font-medium">
              {errors['eventDetails.eventName']}
            </p>
          )}
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
            Event Type <span className="text-[#fa5d32]">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Wedding, Music Festival, Conference"
            value={eventDetails.eventType}
            onChange={(e) => handleFieldChange('eventType', e.target.value)}
            className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
          />
          {errors['eventDetails.eventType'] && (
            <p className="text-[11px] text-red-500 mt-0.5 font-medium">
              {errors['eventDetails.eventType']}
            </p>
          )}
        </div>

        {/* Dates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
              Start Date <span className="text-[#fa5d32]">*</span>
            </label>
            <input
              type="date"
              value={eventDetails.startDate}
              onChange={(e) => handleFieldChange('startDate', e.target.value)}
              className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] accent-[#fa5d32] shadow-2xs"
            />
            {errors['eventDetails.startDate'] && (
              <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                {errors['eventDetails.startDate']}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
              End Date <span className="text-[#fa5d32]">*</span>
            </label>
            <input
              type="date"
              value={eventDetails.endDate}
              onChange={(e) => handleFieldChange('endDate', e.target.value)}
              className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] accent-[#fa5d32] shadow-2xs"
            />
            {errors['eventDetails.endDate'] && (
              <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                {errors['eventDetails.endDate']}
              </p>
            )}
          </div>
        </div>

        {/* Location & Venue */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
              City / Location <span className="text-[#fa5d32]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Dhaka"
              value={eventDetails.location}
              onChange={(e) => handleFieldChange('location', e.target.value)}
              className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
            />
            {errors['eventDetails.location'] && (
              <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                {errors['eventDetails.location']}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
              Specific Venue <span className="text-[#8E95A2] font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Army Stadium"
              value={eventDetails.venue || ''}
              onChange={(e) => handleFieldChange('venue', e.target.value)}
              className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
            />
          </div>
        </div>

        {/* Category Selection */}
        <div className="pt-2 border-t border-orange-100/80">
          <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1.5">
            Who are you looking for? <span className="text-[#fa5d32]">*</span>
          </label>
          <CategorySelector
            selectedCategory={category}
            onSelect={handleCategoryChange}
          />
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-end pt-3 sm:pt-4 border-t border-orange-100/80">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#fa5d32] hover:bg-[#e65027] text-white font-semibold text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer"
        >
          Next Step
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};