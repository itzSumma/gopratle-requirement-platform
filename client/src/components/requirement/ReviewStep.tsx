"use client";

import React from "react";
import {
  RequirementFormData,
  PerformerDetails,
  PlannerDetails,
  CrewDetails,
  PerformerLogistics,
  PlannerLogistics,
  CrewLogistics,
} from "../../types/requirement";
import { ArrowLeft, Loader2, Send } from "lucide-react";

interface ReviewStepProps {
  formData: RequirementFormData;
  onBack: () => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  onBack,
  onSubmit,
  isSubmitting,
}) => {
  const { eventDetails, category, categoryDetails, logisticsDetails } =
    formData;

  const getCategoryLabel = () => {
    if (category === "EVENT_PLANNER") return "Event Planner";
    if (category === "PERFORMER") return "Performer";
    if (category === "CREW") return "Crew";
    return category;
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-200 pb-4">
        <h3 className="text-xl font-bold text-zinc-900">Review Requirement</h3>
        <p className="text-sm text-zinc-500 mt-1">
          Please verify all details carefully before submitting your
          requirement.
        </p>
      </div>

      <div className="space-y-5 text-sm">
        {/* Section 1: Event Details */}
        <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
            Event Details
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
            <div>
              <span className="text-zinc-500">Event Name:</span>{" "}
              <span className="font-medium text-zinc-900">
                {eventDetails.eventName}
              </span>
            </div>
            <div>
              <span className="text-zinc-500">Event Type:</span>{" "}
              <span className="font-medium text-zinc-900">
                {eventDetails.eventType}
              </span>
            </div>
            <div>
              <span className="text-zinc-500">Schedule:</span>{" "}
              <span className="font-medium text-zinc-900">
                {eventDetails.startDate} to {eventDetails.endDate}
              </span>
            </div>
            <div>
              <span className="text-zinc-500">Location:</span>{" "}
              <span className="font-medium text-zinc-900">
                {eventDetails.location}
                {eventDetails.venue ? ` (${eventDetails.venue})` : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Selected Category */}
        <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
            Requested Role
          </p>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold text-xs">
            {getCategoryLabel()}
          </span>
        </div>

        {/* Section 3: Role Specific Details */}
        <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
            {getCategoryLabel()} Details
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
            {category === "PERFORMER" && (
              <>
                <div>
                  <span className="text-zinc-500">Performance Type:</span>{" "}
                  <span className="font-medium text-zinc-900">
                    {(categoryDetails as PerformerDetails).performanceType}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">Duration:</span>{" "}
                  <span className="font-medium text-zinc-900">
                    {(categoryDetails as PerformerDetails).duration}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">Performers Count:</span>{" "}
                  <span className="font-medium text-zinc-900">
                    {(categoryDetails as PerformerDetails).numberOfPerformers}
                  </span>
                </div>
              </>
            )}

            {category === "EVENT_PLANNER" && (
              <>
                <div>
                  <span className="text-zinc-500">Service Type:</span>{" "}
                  <span className="font-medium text-zinc-900">
                    {(categoryDetails as PlannerDetails).serviceType}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">Expected Guests:</span>{" "}
                  <span className="font-medium text-zinc-900">
                    {(categoryDetails as PlannerDetails).expectedGuests}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-zinc-500">Requirements:</span>{" "}
                  <span className="font-medium text-zinc-900">
                    {(categoryDetails as PlannerDetails).planningRequirements}
                  </span>
                </div>
              </>
            )}

            {category === "CREW" && (
              <>
                <div>
                  <span className="text-zinc-500">Crew Type:</span>{" "}
                  <span className="font-medium text-zinc-900">
                    {(categoryDetails as CrewDetails).crewType}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">Team Size:</span>{" "}
                  <span className="font-medium text-zinc-900">
                    {(categoryDetails as CrewDetails).numberOfCrew}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-zinc-500">Skill / Experience:</span>{" "}
                  <span className="font-medium text-zinc-900">
                    {(categoryDetails as CrewDetails).skillRequirement}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Section 4: Logistics & Budget */}
        <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
            Logistics & Budget
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
            {category === "PERFORMER" && (
              <>
                <div className="sm:col-span-2">
                  <span className="text-zinc-500">
                    Required Sound/Lighting:
                  </span>{" "}
                  <span className="font-medium text-zinc-900">
                    {(
                      logisticsDetails as PerformerLogistics
                    ).soundEquipment?.join(", ") || "None"}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">Stage Setup:</span>{" "}
                  <span className="font-medium text-zinc-900">
                    {(logisticsDetails as PerformerLogistics).stageRequirements}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">Budget:</span>{" "}
                  <span className="font-semibold text-emerald-700">
                    ৳
                    {(
                      logisticsDetails as PerformerLogistics
                    ).budget?.toLocaleString()}
                  </span>
                </div>
              </>
            )}

            {category === "EVENT_PLANNER" && (
              <>
                <div className="sm:col-span-2">
                  <span className="text-zinc-500">Services Needed:</span>{" "}
                  <span className="font-medium text-zinc-900">
                    {(
                      logisticsDetails as PlannerLogistics
                    ).servicesNeeded?.join(", ") || "None"}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">Budget:</span>{" "}
                  <span className="font-semibold text-emerald-700">
                    ৳
                    {(
                      logisticsDetails as PlannerLogistics
                    ).budget?.toLocaleString()}
                  </span>
                </div>
              </>
            )}

            {category === "CREW" && (
              <>
                <div>
                  <span className="text-zinc-500">Shift Duration:</span>{" "}
                  <span className="font-medium text-zinc-900">
                    {(logisticsDetails as CrewLogistics).workDuration}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">Shift Timing:</span>{" "}
                  <span className="font-medium text-zinc-900">
                    {(logisticsDetails as CrewLogistics).shiftTiming}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">Equipment Handling:</span>{" "}
                  <span className="font-medium text-zinc-900">
                    {(logisticsDetails as CrewLogistics).equipmentRequirement}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">Budget:</span>{" "}
                  <span className="font-semibold text-emerald-700">
                    ৳
                    {(
                      logisticsDetails as CrewLogistics
                    ).budget?.toLocaleString()}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4 border-t border-zinc-100">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-300 text-zinc-700 font-medium text-sm hover:bg-zinc-50 transition disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Requirement
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
