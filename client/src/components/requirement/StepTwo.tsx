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

 const handleFieldChange = (
  field: string,
  value: unknown
) => {
  updateFormData({
    categoryDetails: {
      ...categoryDetails,
      [field]: value,
    },
  });
};
  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-200 pb-4">
        <h3 className="text-xl font-bold text-zinc-900">
          {category === 'PERFORMER' && 'Performer Details'}
          {category === 'EVENT_PLANNER' && 'Event Planner Details'}
          {category === 'CREW' && 'Crew Details'}
        </h3>
        <p className="text-sm text-zinc-500 mt-1">
          Specify role expectations and requirements for the selected category.
        </p>
      </div>

      <div className="space-y-4">
        {/* PERFORMER FIELDS */}
        {category === 'PERFORMER' && (
          <>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Performance Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Band, Solo Singer, DJ, Stand-up Comedian"
                value={(categoryDetails as PerformerDetails)?.performanceType || ''}
                onChange={(e) => handleFieldChange('performanceType', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
              {errors.performanceType && (
                <p className="text-xs text-red-600 mt-1">{errors.performanceType}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Performance Duration <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 2 hours, 45 minutes slot"
                value={(categoryDetails as PerformerDetails)?.duration || ''}
                onChange={(e) => handleFieldChange('duration', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
              {errors.duration && (
                <p className="text-xs text-red-600 mt-1">{errors.duration}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Number of Performers <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={(categoryDetails as PerformerDetails)?.numberOfPerformers || 1}
                onChange={(e) =>
                  handleFieldChange('numberOfPerformers', Number(e.target.value))
                }
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
              {errors.numberOfPerformers && (
                <p className="text-xs text-red-600 mt-1">
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
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Service Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Full Event Planning, Day-of Coordination"
                value={(categoryDetails as PlannerDetails)?.serviceType || ''}
                onChange={(e) => handleFieldChange('serviceType', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
              {errors.serviceType && (
                <p className="text-xs text-red-600 mt-1">{errors.serviceType}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Expected Guests <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 250"
                value={(categoryDetails as PlannerDetails)?.expectedGuests || 1}
                onChange={(e) =>
                  handleFieldChange('expectedGuests', Number(e.target.value))
                }
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
              {errors.expectedGuests && (
                <p className="text-xs text-red-600 mt-1">{errors.expectedGuests}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Planning Requirements <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Describe theme, itinerary planning, decor coordination requirements..."
                value={(categoryDetails as PlannerDetails)?.planningRequirements || ''}
                onChange={(e) =>
                  handleFieldChange('planningRequirements', e.target.value)
                }
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
              {errors.planningRequirements && (
                <p className="text-xs text-red-600 mt-1">
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
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Crew Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Sound Engineer, Lighting Tech, Stagehand, Usher"
                value={(categoryDetails as CrewDetails)?.crewType || ''}
                onChange={(e) => handleFieldChange('crewType', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
              {errors.crewType && (
                <p className="text-xs text-red-600 mt-1">{errors.crewType}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Number of Crew Members <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={(categoryDetails as CrewDetails)?.numberOfCrew || 1}
                onChange={(e) =>
                  handleFieldChange('numberOfCrew', Number(e.target.value))
                }
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
              {errors.numberOfCrew && (
                <p className="text-xs text-red-600 mt-1">{errors.numberOfCrew}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Skill / Experience Requirement <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Specify experience level, equipment handling skills..."
                value={(categoryDetails as CrewDetails)?.skillRequirement || ''}
                onChange={(e) =>
                  handleFieldChange('skillRequirement', e.target.value)
                }
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
              {errors.skillRequirement && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.skillRequirement}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Navigation Actions */}
      <div className="flex justify-between pt-4 border-t border-zinc-100">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-300 text-zinc-700 font-medium text-sm hover:bg-zinc-50 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

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