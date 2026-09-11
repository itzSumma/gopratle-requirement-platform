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

  // Convert the internal category value into a user-friendly label.
  const getCategoryLabel = () => {
    if (category === "EVENT_PLANNER") return "Event Planner";
    if (category === "PERFORMER") return "Performer";
    if (category === "CREW") return "Crew";

    return category;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Content Container */}
      <div className="space-y-3 sm:space-y-4 max-h-[58vh] sm:max-h-[62vh] overflow-y-auto pr-1.5 pb-2">
        <div className="border-b border-orange-100/80 pb-2.5">
          <h3 className="text-base sm:text-lg font-bold text-[#1E2024] tracking-tight">
            Review Requirement
          </h3>

          <p className="text-[11.5px] sm:text-xs text-[#555A64] mt-0.5">
            Please verify all details carefully before submitting your requirement.
          </p>
        </div>

        {/* Event information */}
        <div className="bg-[#FFFBF8] p-3 sm:p-3.5 rounded-2xl border border-orange-100/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8E95A2] mb-2">
            Event Details
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-3 text-xs sm:text-[13px]">
            <div>
              <span className="text-[#555A64]">Event Name:</span>{" "}
              <span className="font-semibold text-[#1E2024]">
                {eventDetails.eventName}
              </span>
            </div>

            <div>
              <span className="text-[#555A64]">Event Type:</span>{" "}
              <span className="font-semibold text-[#1E2024]">
                {eventDetails.eventType}
              </span>
            </div>

            <div>
              <span className="text-[#555A64]">Schedule:</span>{" "}
              <span className="font-semibold text-[#1E2024]">
                {eventDetails.startDate} to {eventDetails.endDate}
              </span>
            </div>

            <div>
              <span className="text-[#555A64]">Location:</span>{" "}
              <span className="font-semibold text-[#1E2024]">
                {eventDetails.location}
                {eventDetails.venue ? ` (${eventDetails.venue})` : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Requested Role */}
        <div className="bg-[#FFFBF8] p-3 sm:p-3.5 rounded-2xl border border-orange-100/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8E95A2] mb-1">
              Requested Role
            </p>

            <span className="inline-block px-2.5 py-0.5 bg-[#ffe9e0] text-[#fa5d32] border border-[#fa5d32]/20 rounded-full font-bold text-xs">
              {getCategoryLabel()}
            </span>
          </div>
        </div>

        {/* Category Details */}
        <div className="bg-[#FFFBF8] p-3 sm:p-3.5 rounded-2xl border border-orange-100/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8E95A2] mb-2">
            {getCategoryLabel()} Details
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-3 text-xs sm:text-[13px]">
            {category === "PERFORMER" && (
              <>
                <div>
                  <span className="text-[#555A64]">Performance Type:</span>{" "}
                  <span className="font-semibold text-[#1E2024]">
                    {(categoryDetails as PerformerDetails).performanceType}
                  </span>
                </div>

                <div>
                  <span className="text-[#555A64]">Duration:</span>{" "}
                  <span className="font-semibold text-[#1E2024]">
                    {(categoryDetails as PerformerDetails).duration}
                  </span>
                </div>

                <div>
                  <span className="text-[#555A64]">Performers Count:</span>{" "}
                  <span className="font-semibold text-[#1E2024]">
                    {(categoryDetails as PerformerDetails).numberOfPerformers}
                  </span>
                </div>
              </>
            )}

            {category === "EVENT_PLANNER" && (
              <>
                <div>
                  <span className="text-[#555A64]">Service Type:</span>{" "}
                  <span className="font-semibold text-[#1E2024]">
                    {(categoryDetails as PlannerDetails).serviceType}
                  </span>
                </div>

                <div>
                  <span className="text-[#555A64]">Expected Guests:</span>{" "}
                  <span className="font-semibold text-[#1E2024]">
                    {(categoryDetails as PlannerDetails).expectedGuests}
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-[#555A64]">Requirements:</span>{" "}
                  <span className="font-semibold text-[#1E2024]">
                    {(categoryDetails as PlannerDetails).planningRequirements}
                  </span>
                </div>
              </>
            )}

            {category === "CREW" && (
              <>
                <div>
                  <span className="text-[#555A64]">Crew Type:</span>{" "}
                  <span className="font-semibold text-[#1E2024]">
                    {(categoryDetails as CrewDetails).crewType}
                  </span>
                </div>

                <div>
                  <span className="text-[#555A64]">Team Size:</span>{" "}
                  <span className="font-semibold text-[#1E2024]">
                    {(categoryDetails as CrewDetails).numberOfCrew}
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-[#555A64]">Skill / Experience:</span>{" "}
                  <span className="font-semibold text-[#1E2024]">
                    {(categoryDetails as CrewDetails).skillRequirement}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Logistics & Budget */}
        <div className="bg-[#FFFBF8] p-3 sm:p-3.5 rounded-2xl border border-orange-100/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8E95A2] mb-2">
            Logistics & Budget
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-3 text-xs sm:text-[13px]">
            <div>
              <span className="text-[#555A64]">Estimated Budget:</span>{" "}
              <span className="font-semibold text-[#1E2024]">
                {logisticsDetails?.budget ? `₹ ${Number(logisticsDetails.budget).toLocaleString('en-IN')}` : "Not specified"}
              </span>
            </div>

            {category === "PERFORMER" && (
              <>
                <div>
                  <span className="text-[#555A64]">Sound Equipment:</span>{" "}
                  <span className="font-semibold text-[#1E2024]">
                    {(logisticsDetails as PerformerLogistics)?.soundEquipment?.length
                      ? (logisticsDetails as PerformerLogistics).soundEquipment.join(", ")
                      : "None"}
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-[#555A64]">Stage Requirements:</span>{" "}
                  <span className="font-semibold text-[#1E2024]">
                    {(logisticsDetails as PerformerLogistics)?.stageRequirements || "None"}
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-[#555A64]">Technical Requirements:</span>{" "}
                  <span className="font-semibold text-[#1E2024]">
                    {(logisticsDetails as PerformerLogistics)?.technicalRequirements || "None"}
                  </span>
                </div>
              </>
            )}

            {category === "EVENT_PLANNER" && (
              <>
                <div>
                  <span className="text-[#555A64]">Services Needed:</span>{" "}
                  <span className="font-semibold text-[#1E2024]">
                    {(logisticsDetails as PlannerLogistics)?.servicesNeeded?.length
                      ? (logisticsDetails as PlannerLogistics).servicesNeeded.join(", ")
                      : "None"}
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-[#555A64]">Additional Requirements:</span>{" "}
                  <span className="font-semibold text-[#1E2024]">
                    {(logisticsDetails as PlannerLogistics)?.additionalRequirements || "None"}
                  </span>
                </div>
              </>
            )}

            {category === "CREW" && (
              <>
                <div>
                  <span className="text-[#555A64]">Work Duration:</span>{" "}
                  <span className="font-semibold text-[#1E2024]">
                    {(logisticsDetails as CrewLogistics)?.workDuration || "None"}
                  </span>
                </div>

                <div>
                  <span className="text-[#555A64]">Shift Timing:</span>{" "}
                  <span className="font-semibold text-[#1E2024]">
                    {(logisticsDetails as CrewLogistics)?.shiftTiming || "None"}
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-[#555A64]">Equipment Requirement:</span>{" "}
                  <span className="font-semibold text-[#1E2024]">
                    {(logisticsDetails as CrewLogistics)?.equipmentRequirement || "None"}
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-[#555A64]">Additional Requirements:</span>{" "}
                  <span className="font-semibold text-[#1E2024]">
                    {(logisticsDetails as CrewLogistics)?.additionalRequirements || "None"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Buttons */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur-xs flex items-center justify-between pt-3 border-t border-orange-100/80 mt-auto">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-orange-200 text-[#555A64] font-semibold text-xs sm:text-sm hover:bg-[#FFF7F2] hover:text-[#fa5d32] transition disabled:opacity-50 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#fa5d32] text-white font-semibold text-xs sm:text-sm hover:bg-[#e65027] transition shadow-xs active:scale-95 disabled:opacity-50 cursor-pointer"
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