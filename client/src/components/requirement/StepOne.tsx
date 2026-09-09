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
    <div className="space-y-6">
      <div className="border-b border-zinc-200 pb-4">
        <h3 className="text-xl font-bold text-zinc-900">Event Basics</h3>
        <p className="text-sm text-zinc-500 mt-1">
          Tell us about the essential schedule and location of your event.
        </p>
      </div>

      <div className="space-y-4">
        {/* Event Name */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            Event Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Annual Cultural Fest 2026"
            value={eventDetails.eventName}
            onChange={(e) => handleFieldChange('eventName', e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
          {errors['eventDetails.eventName'] && (
            <p className="text-xs text-red-600 mt-1">{errors['eventDetails.eventName']}</p>
          )}
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            Event Type <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Wedding, Music Festival, Conference"
            value={eventDetails.eventType}
            onChange={(e) => handleFieldChange('eventType', e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
          {errors['eventDetails.eventType'] && (
            <p className="text-xs text-red-600 mt-1">{errors['eventDetails.eventType']}</p>
          )}
        </div>

        {/* Dates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={eventDetails.startDate}
              onChange={(e) => handleFieldChange('startDate', e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
            {errors['eventDetails.startDate'] && (
              <p className="text-xs text-red-600 mt-1">{errors['eventDetails.startDate']}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={eventDetails.endDate}
              onChange={(e) => handleFieldChange('endDate', e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
            {errors['eventDetails.endDate'] && (
              <p className="text-xs text-red-600 mt-1">{errors['eventDetails.endDate']}</p>
            )}
          </div>
        </div>

        {/* Location & Venue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              City / Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Dhaka"
              value={eventDetails.location}
              onChange={(e) => handleFieldChange('location', e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
            {errors['eventDetails.location'] && (
              <p className="text-xs text-red-600 mt-1">{errors['eventDetails.location']}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Specific Venue <span className="text-zinc-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Army Stadium"
              value={eventDetails.venue || ''}
              onChange={(e) => handleFieldChange('venue', e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>
        </div>

        {/* Category Selection */}
        <div className="pt-4 border-t border-zinc-100">
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            Who are you looking for? <span className="text-red-500">*</span>
          </label>
          <CategorySelector
            selectedCategory={category}
            onSelect={handleCategoryChange}
          />
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-end pt-4 border-t border-zinc-100">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition"
        >
          Next Step
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};