'use client';

import React from 'react';
import {
  RequirementFormData,
  PerformerDetails,
  PlannerDetails,
  CrewDetails,
} from '../../types/requirement';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface StepTwoProps {
  formData: RequirementFormData;
  updateFormData: (fields: Partial<RequirementFormData>) => void;
  errors: Record<string, string>;
  onNext: () => void;
  onBack: () => void;
}

export const StepTwo: React.FC<StepTwoProps> = ({
  formData,
  updateFormData,
  errors,
  onNext,
  onBack,
}) => {
  const { category, categoryDetails } = formData;

  const handleFieldChange = (field: string, value: unknown) => {
    updateFormData({
      categoryDetails: {
        ...categoryDetails,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="border-b border-orange-100/80 pb-3">
        <h3 className="text-base sm:text-lg font-bold text-[#1E2024] tracking-tight">
          {category === 'PERFORMER' && 'Performer Details'}
          {category === 'EVENT_PLANNER' && 'Event Planner Details'}
          {category === 'CREW' && 'Crew Details'}
        </h3>
        <p className="text-[11.5px] sm:text-xs text-[#555A64] mt-0.5">
          Specify role expectations and requirements for the selected category.
        </p>
      </div>

      <div className="space-y-3">
        {/* PERFORMER FIELDS */}
        {category === 'PERFORMER' && (
          <>
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
                Performance Type <span className="text-[#fa5d32]">*</span>
              </label>
              <input
                type="text"
                placeholder="Band, Solo Singer, DJ, Stand-up Comedian"
                value={(categoryDetails as PerformerDetails)?.performanceType || ''}
                onChange={(e) => handleFieldChange('performanceType', e.target.value)}
                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
              />
              {errors.performanceType && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.performanceType}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
                Performance Duration <span className="text-[#fa5d32]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 2 hours, 45 minutes slot"
                value={(categoryDetails as PerformerDetails)?.duration || ''}
                onChange={(e) => handleFieldChange('duration', e.target.value)}
                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
              />
              {errors.duration && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.duration}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
                Number of Performers <span className="text-[#fa5d32]">*</span>
              </label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 4"
                value={(categoryDetails as PerformerDetails)?.numberOfPerformers ?? ''}
                onChange={(e) =>
                  handleFieldChange(
                    'numberOfPerformers',
                    e.target.value === '' ? '' : Number(e.target.value)
                  )
                }
                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
              />
              {errors.numberOfPerformers && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                  {errors.numberOfPerformers}
                </p>
              )}
            </div>
          </>
        )}

        {/* EVENT PLANNER FIELDS */}
        {category === 'EVENT_PLANNER' && (
          <>
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
                Service Type <span className="text-[#fa5d32]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Full Event Planning, Day-of Coordination"
                value={(categoryDetails as PlannerDetails)?.serviceType || ''}
                onChange={(e) => handleFieldChange('serviceType', e.target.value)}
                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
              />
              {errors.serviceType && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.serviceType}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
                Expected Guests <span className="text-[#fa5d32]">*</span>
              </label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 250"
                value={(categoryDetails as PlannerDetails)?.expectedGuests ?? ''}
                onChange={(e) =>
                  handleFieldChange(
                    'expectedGuests',
                    e.target.value === '' ? '' : Number(e.target.value)
                  )
                }
                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
              />
              {errors.expectedGuests && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.expectedGuests}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
                Planning Requirements <span className="text-[#fa5d32]">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Describe theme, itinerary planning, decor coordination requirements..."
                value={(categoryDetails as PlannerDetails)?.planningRequirements || ''}
                onChange={(e) =>
                  handleFieldChange('planningRequirements', e.target.value)
                }
                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
              />
              {errors.planningRequirements && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                  {errors.planningRequirements}
                </p>
              )}
            </div>
          </>
        )}

        {/* CREW FIELDS */}
        {category === 'CREW' && (
          <>
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
                Crew Type <span className="text-[#fa5d32]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Sound Engineer, Lighting Tech, Stagehand, Usher"
                value={(categoryDetails as CrewDetails)?.crewType || ''}
                onChange={(e) => handleFieldChange('crewType', e.target.value)}
                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
              />
              {errors.crewType && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.crewType}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
                Number of Crew Members <span className="text-[#fa5d32]">*</span>
              </label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 3"
                value={(categoryDetails as CrewDetails)?.numberOfCrew ?? ''}
                onChange={(e) =>
                  handleFieldChange(
                    'numberOfCrew',
                    e.target.value === '' ? '' : Number(e.target.value)
                  )
                }
                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
              />
              {errors.numberOfCrew && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.numberOfCrew}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
                Skill / Experience Requirement <span className="text-[#fa5d32]">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Specify experience level, equipment handling skills..."
                value={(categoryDetails as CrewDetails)?.skillRequirement || ''}
                onChange={(e) =>
                  handleFieldChange('skillRequirement', e.target.value)
                }
                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
              />
              {errors.skillRequirement && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                  {errors.skillRequirement}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Navigation Actions */}
      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-orange-100/80">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-orange-200 text-[#555A64] font-semibold text-xs sm:text-sm hover:bg-[#FFF7F2] hover:text-[#fa5d32] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-1.5 px-6 py-2 rounded-xl bg-[#fa5d32] hover:bg-[#e65027] text-white font-semibold text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer"
        >
          Next Step
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};