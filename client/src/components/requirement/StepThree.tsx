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

  const handleArrayToggle = (field: string, currentArray: string[], item: string) => {
    const updated = currentArray.includes(item)
      ? currentArray.filter((i) => i !== item)
      : [...currentArray, item];
    handleFieldChange(field, updated);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-200 pb-4">
        <h3 className="text-xl font-bold text-zinc-900">Logistics & Budget</h3>
        <p className="text-sm text-zinc-500 mt-1">
          Specify equipment, timing, and budgetary expectations for your event.
        </p>
      </div>

      <div className="space-y-4">
        {/* PERFORMER LOGISTICS */}
        {category === 'PERFORMER' && (
          <>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Sound & Stage Equipment <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SOUND_EQUIPMENT_OPTIONS.map((item) => {
                  const selected = (
                    (logisticsDetails as PerformerLogistics)?.soundEquipment || []
                  ).includes(item);
                  return (
                    <label
                      key={item}
                      className={`flex items-center gap-2 p-3 rounded-lg border text-sm cursor-pointer transition ${
                        selected
                          ? 'border-blue-500 bg-blue-50/50 text-blue-900 font-medium'
                          : 'border-zinc-200 hover:border-zinc-300 text-zinc-700'
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
                        className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>{item}</span>
                    </label>
                  );
                })}
              </div>
              {errors.soundEquipment && (
                <p className="text-xs text-red-600 mt-1">{errors.soundEquipment}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Stage Requirements <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Minimum 20x15 ft platform with drum riser"
                value={(logisticsDetails as PerformerLogistics)?.budget ?? ''}
                onChange={(e) => handleFieldChange('stageRequirements', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
              {errors.stageRequirements && (
                <p className="text-xs text-red-600 mt-1">{errors.stageRequirements}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Technical Requirements <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={2}
                placeholder="Microphone counts, direct box (DI) lines, monitoring channels..."
                value={(logisticsDetails as PerformerLogistics)?.technicalRequirements || ''}
                onChange={(e) => handleFieldChange('technicalRequirements', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
              {errors.technicalRequirements && (
                <p className="text-xs text-red-600 mt-1">{errors.technicalRequirements}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Estimated Budget (BDT) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 50000"
                value={(logisticsDetails as PerformerLogistics)?.budget || ''}
                onChange={(e) => handleFieldChange('budget', Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
              {errors.budget && (
                <p className="text-xs text-red-600 mt-1">{errors.budget}</p>
              )}
            </div>
          </>
        )}

        {/* Event PLANNER LOGISTICS */}
        {category === 'EVENT_PLANNER' && (
          <>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Services Needed <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PLANNER_SERVICES_OPTIONS.map((service) => {
                  const selected = (
                    (logisticsDetails as PlannerLogistics)?.servicesNeeded || []
                  ).includes(service);
                  return (
                    <label
                      key={service}
                      className={`flex items-center gap-2 p-3 rounded-lg border text-sm cursor-pointer transition ${
                        selected
                          ? 'border-blue-500 bg-blue-50/50 text-blue-900 font-medium'
                          : 'border-zinc-200 hover:border-zinc-300 text-zinc-700'
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
                        className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>{service}</span>
                    </label>
                  );
                })}
              </div>
              {errors.servicesNeeded && (
                <p className="text-xs text-red-600 mt-1">{errors.servicesNeeded}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Estimated Planning Budget (BDT) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 150000"
               value={(logisticsDetails as PlannerLogistics)?.budget ?? ''}
                onChange={(e) => handleFieldChange('budget', Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
              {errors.budget && (
                <p className="text-xs text-red-600 mt-1">{errors.budget}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Additional Requirements <span className="text-zinc-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Any specific vendor preferences, themes, or catering notes..."
                value={(logisticsDetails as PlannerLogistics)?.additionalRequirements || ''}
                onChange={(e) => handleFieldChange('additionalRequirements', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
          </>
        )}

        {/* CREW LOGISTICS */}
        {category === 'CREW' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Work Duration <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 8 hours, Full Day"
                  value={(logisticsDetails as CrewLogistics)?.workDuration || ''}
                  onChange={(e) => handleFieldChange('workDuration', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
                {errors.workDuration && (
                  <p className="text-xs text-red-600 mt-1">{errors.workDuration}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Shift / Timing <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2:00 PM - 10:00 PM"
                  value={(logisticsDetails as CrewLogistics)?.shiftTiming || ''}
                  onChange={(e) => handleFieldChange('shiftTiming', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
                {errors.shiftTiming && (
                  <p className="text-xs text-red-600 mt-1">{errors.shiftTiming}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Equipment Handling Requirement <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Heavy stage rigging gear, camera cabling, sound console"
                value={(logisticsDetails as CrewLogistics)?.budget ?? ''}
                onChange={(e) => handleFieldChange('equipmentRequirement', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
              {errors.equipmentRequirement && (
                <p className="text-xs text-red-600 mt-1">{errors.equipmentRequirement}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Budget for Crew (BDT) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 25000"
                value={(logisticsDetails as CrewLogistics)?.budget || ''}
                onChange={(e) => handleFieldChange('budget', Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
              {errors.budget && (
                <p className="text-xs text-red-600 mt-1">{errors.budget}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Additional Requirements <span className="text-zinc-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Transport allowance, food arrangements, dress code..."
                value={(logisticsDetails as CrewLogistics)?.additionalRequirements || ''}
                onChange={(e) => handleFieldChange('additionalRequirements', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
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
          Review Requirement
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};