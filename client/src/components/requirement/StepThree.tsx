'use client';

import React from 'react';
import {
  RequirementFormData,
  PerformerLogistics,
  PlannerLogistics,
  CrewLogistics,
} from '../../types/requirement';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface StepThreeProps {
  formData: RequirementFormData;
  updateFormData: (fields: Partial<RequirementFormData>) => void;
  errors: Record<string, string>;
  onNext: () => void;
  onBack: () => void;
}

const SOUND_EQUIPMENT_OPTIONS = [
  'PA System',
  'Wireless Microphones',
  'Stage Monitors',
  'Instrument Amplifiers',
  'Stage Lighting',
];

const PLANNER_SERVICES_OPTIONS = [
  'Venue Booking',
  'Catering Coordination',
  'Stage & Decor',
  'Guest Reception',
  'Photography & Media',
];

export const StepThree: React.FC<StepThreeProps> = ({
  formData,
  updateFormData,
  errors,
  onNext,
  onBack,
}) => {
  const { category, logisticsDetails } = formData;

  const handleFieldChange = (field: string, value: unknown) => {
    updateFormData({
      logisticsDetails: {
        ...logisticsDetails,
        [field]: value,
      },
    });
  };

  const handleArrayToggle = (
    field: string,
    currentArray: string[],
    item: string
  ) => {
    const updated = currentArray.includes(item)
      ? currentArray.filter((i) => i !== item)
      : [...currentArray, item];
    handleFieldChange(field, updated);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="border-b border-orange-100/80 pb-3">
        <h3 className="text-base sm:text-lg font-bold text-[#1E2024] tracking-tight">
          Logistics & Budget
        </h3>
        <p className="text-[11.5px] sm:text-xs text-[#555A64] mt-0.5">
          Specify equipment, timing, and budgetary expectations for your event.
        </p>
      </div>

      <div className="space-y-3">
        {/* PERFORMER LOGISTICS */}
        {category === 'PERFORMER' && (
          <>
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1.5">
                Sound & Stage Equipment <span className="text-[#fa5d32]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SOUND_EQUIPMENT_OPTIONS.map((item) => {
                  const selected = (
                    (logisticsDetails as PerformerLogistics)?.soundEquipment || []
                  ).includes(item);
                  return (
                    <label
                      key={item}
                      className={`flex items-center gap-2 p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all duration-150 ${
                        selected
                          ? 'border-[#fa5d32] bg-[#FFF7F2] text-[#fa5d32] font-semibold ring-1 ring-[#fa5d32]/20'
                          : 'border-[#fc6f47]/40 hover:border-[#fc6f47] bg-white text-[#505768]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() =>
                          handleArrayToggle(
                            'soundEquipment',
                            (logisticsDetails as PerformerLogistics)?.soundEquipment || [],
                            item
                          )
                        }
                        className="rounded border-[#fc6f47]/50 text-[#fa5d32] focus:ring-[#ffe9e0] accent-[#fa5d32]"
                      />
                      <span>{item}</span>
                    </label>
                  );
                })}
              </div>
              {errors.soundEquipment && (
                <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.soundEquipment}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
                Stage Requirements <span className="text-[#fa5d32]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Minimum 20x15 ft platform with drum riser"
                value={(logisticsDetails as PerformerLogistics)?.stageRequirements || ''}
                onChange={(e) => handleFieldChange('stageRequirements', e.target.value)}
                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
              />
              {errors.stageRequirements && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.stageRequirements}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
                Technical Requirements <span className="text-[#fa5d32]">*</span>
              </label>
              <textarea
                rows={2}
                placeholder="Microphone counts, direct box (DI) lines, monitoring channels..."
                value={(logisticsDetails as PerformerLogistics)?.technicalRequirements || ''}
                onChange={(e) => handleFieldChange('technicalRequirements', e.target.value)}
                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
              />
              {errors.technicalRequirements && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.technicalRequirements}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
                Estimated Budget (₹ / INR) <span className="text-[#fa5d32]">*</span>
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 50000"
                value={(logisticsDetails as PerformerLogistics)?.budget || ''}
                onChange={(e) => handleFieldChange('budget', Number(e.target.value))}
                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
              />
              {errors.budget && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.budget}</p>
              )}
            </div>
          </>
        )}

        {/* EVENT PLANNER LOGISTICS */}
        {category === 'EVENT_PLANNER' && (
          <>
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1.5">
                Services Needed <span className="text-[#fa5d32]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PLANNER_SERVICES_OPTIONS.map((service) => {
                  const selected = (
                    (logisticsDetails as PlannerLogistics)?.servicesNeeded || []
                  ).includes(service);
                  return (
                    <label
                      key={service}
                      className={`flex items-center gap-2 p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all duration-150 ${
                        selected
                          ? 'border-[#fa5d32] bg-[#FFF7F2] text-[#fa5d32] font-semibold ring-1 ring-[#fa5d32]/20'
                          : 'border-[#fc6f47]/40 hover:border-[#fc6f47] bg-white text-[#505768]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() =>
                          handleArrayToggle(
                            'servicesNeeded',
                            (logisticsDetails as PlannerLogistics)?.servicesNeeded || [],
                            service
                          )
                        }
                        className="rounded border-[#fc6f47]/50 text-[#fa5d32] focus:ring-[#ffe9e0] accent-[#fa5d32]"
                      />
                      <span>{service}</span>
                    </label>
                  );
                })}
              </div>
              {errors.servicesNeeded && (
                <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.servicesNeeded}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
                Estimated Planning Budget (₹ / INR) <span className="text-[#fa5d32]">*</span>
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 150000"
                value={(logisticsDetails as PlannerLogistics)?.budget || ''}
                onChange={(e) => handleFieldChange('budget', Number(e.target.value))}
                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
              />
              {errors.budget && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.budget}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
                Additional Requirements <span className="text-[#8E95A2] font-normal">(Optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Any specific vendor preferences, themes, or catering notes..."
                value={(logisticsDetails as PlannerLogistics)?.additionalRequirements || ''}
                onChange={(e) => handleFieldChange('additionalRequirements', e.target.value)}
                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
              />
            </div>
          </>
        )}

        {/* CREW LOGISTICS */}
        {category === 'CREW' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
                  Work Duration <span className="text-[#fa5d32]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 8 hours, Full Day"
                  value={(logisticsDetails as CrewLogistics)?.workDuration || ''}
                  onChange={(e) => handleFieldChange('workDuration', e.target.value)}
                  className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
                />
                {errors.workDuration && (
                  <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.workDuration}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
                  Shift / Timing <span className="text-[#fa5d32]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2:00 PM - 10:00 PM"
                  value={(logisticsDetails as CrewLogistics)?.shiftTiming || ''}
                  onChange={(e) => handleFieldChange('shiftTiming', e.target.value)}
                  className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
                />
                {errors.shiftTiming && (
                  <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.shiftTiming}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
                Equipment Handling Requirement <span className="text-[#fa5d32]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Heavy stage rigging gear, camera cabling, sound console"
                value={(logisticsDetails as CrewLogistics)?.equipmentRequirement || ''}
                onChange={(e) => handleFieldChange('equipmentRequirement', e.target.value)}
                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
              />
              {errors.equipmentRequirement && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.equipmentRequirement}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
                Budget for Crew (₹ / INR) <span className="text-[#fa5d32]">*</span>
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 25000"
                value={(logisticsDetails as CrewLogistics)?.budget || ''}
                onChange={(e) => handleFieldChange('budget', Number(e.target.value))}
                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
              />
              {errors.budget && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.budget}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
                Additional Requirements <span className="text-[#8E95A2] font-normal">(Optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Transport allowance, food arrangements, dress code..."
                value={(logisticsDetails as CrewLogistics)?.additionalRequirements || ''}
                onChange={(e) => handleFieldChange('additionalRequirements', e.target.value)}
                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
              />
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
          Review Requirement
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};