"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  RequirementFormData,
  RequirementCategory,
} from "../../types/requirement";
import { CategorySelector } from "./CategorySelector";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface DatePickerProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  hasError?: boolean;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Select Date",
  hasError,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDate = value ? new Date(value) : null;
  const [viewDate, setViewDate] = useState<Date>(selectedDate || new Date());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handleSelect = (day: number) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    onChange(`${year}-${m}-${d}`);
    setIsOpen(false);
  };

  const formatDisplay = (val: string) => {
    if (!val) return placeholder;
    const [y, m, d] = val.split("-");
    return `${m}/${d}/${y}`;
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-1.5 sm:py-2 rounded-xl border transition bg-white text-xs sm:text-sm outline-none text-left shadow-2xs ${
          hasError
            ? "border-red-400 ring-1 ring-red-400/30"
            : isOpen
              ? "border-[#fc6f47] ring-2 ring-[#ffe9e0]"
              : "border-[#fc6f47]/50 hover:border-[#fc6f47]"
        }`}
      >
        <span
          className={value ? "text-[#1E2024] font-medium" : "text-zinc-400"}
        >
          {formatDisplay(value)}
        </span>
        <CalendarIcon className="w-3.5 h-3.5 text-[#fa5d32] shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 z-50 w-64 p-3 bg-white rounded-2xl shadow-xl border border-[#fc6f47]/30 select-none animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#1E2024]">
              {monthNames[month]} {year}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewDate(new Date(year, month - 1, 1))}
                className="p-1 rounded-lg hover:bg-[#FFF7F2] text-[#555A64] hover:text-[#fa5d32] transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewDate(new Date(year, month + 1, 1))}
                className="p-1 rounded-lg hover:bg-[#FFF7F2] text-[#555A64] hover:text-[#fa5d32] transition"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center mb-1">
            {daysOfWeek.map((d) => (
              <span
                key={d}
                className="text-[10px] font-semibold text-[#8E95A2] py-0.5"
              >
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const formatted = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isSelected = value === formatted;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelect(day)}
                  className={`h-7 w-7 mx-auto flex items-center justify-center rounded-lg text-xs font-medium transition cursor-pointer ${
                    isSelected
                      ? "bg-[#fa5d32] text-white font-bold shadow-xs"
                      : "text-[#1E2024] hover:bg-[#FFF7F2] hover:text-[#fa5d32]"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-orange-100/80 flex items-center justify-between text-[11px]">
            <button
              type="button"
              onClick={() => {
                onChange("");
                setIsOpen(false);
              }}
              className="text-[#8E95A2] hover:text-red-500 transition cursor-pointer font-medium"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                const m = String(today.getMonth() + 1).padStart(2, "0");
                const d = String(today.getDate()).padStart(2, "0");
                onChange(`${today.getFullYear()}-${m}-${d}`);
                setIsOpen(false);
              }}
              className="text-[#fa5d32] hover:underline font-semibold cursor-pointer"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

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
    value: string,
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
        <h3 className="text-md sm:text-lg font-bold text-[#3b414d] tracking-tight">
          Event Basics
        </h3>
        <p className="text-[12px] sm:text-xs text-[#444a56] mt-0.5">
          Tell us about the essential schedule and location of your event.
        </p>
      </div>

      <div className="space-y-3">
        {/* Event Name */}
        <div>
          <label className="block text-[11px] sm:text-xs font-semibold text-[#3c4353] mb-1">
            Event Name <span className="text-[#fa5d32]">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Event Name"
            value={eventDetails.eventName}
            onChange={(e) => handleFieldChange("eventName", e.target.value)}
            className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
          />
          {errors["eventDetails.eventName"] && (
            <p className="text-[11px] text-red-500 mt-0.5 font-medium">
              {errors["eventDetails.eventName"]}
            </p>
          )}
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-[11px] sm:text-xs font-semibold text-[#3c4353] mb-1">
            Event Type <span className="text-[#fa5d32]">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Event Type"
            value={eventDetails.eventType}
            onChange={(e) => handleFieldChange("eventType", e.target.value)}
            className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
          />
          {errors["eventDetails.eventType"] && (
            <p className="text-[11px] text-red-500 mt-0.5 font-medium">
              {errors["eventDetails.eventType"]}
            </p>
          )}
        </div>

        {/* Dates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold text-[#3c4353] mb-1">
              Start Date <span className="text-[#fa5d32]">*</span>
            </label>
            <CustomDatePicker
              value={eventDetails.startDate}
              onChange={(val) => handleFieldChange("startDate", val)}
              placeholder="Select Date"
              hasError={!!errors["eventDetails.startDate"]}
            />
            {errors["eventDetails.startDate"] && (
              <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                {errors["eventDetails.startDate"]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
              End Date <span className="text-[#fa5d32]">*</span>
            </label>
            <CustomDatePicker
              value={eventDetails.endDate}
              onChange={(val) => handleFieldChange("endDate", val)}
              placeholder="Select Date"
              hasError={!!errors["eventDetails.endDate"]}
            />
            {errors["eventDetails.endDate"] && (
              <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                {errors["eventDetails.endDate"]}
              </p>
            )}
          </div>
        </div>

        {/* Location & Venue */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold text-[#3c4353] mb-1">
              City / Location <span className="text-[#fa5d32]">*</span>
            </label>
            <input
              type="text"
              placeholder="Select City"
              value={eventDetails.location}
              onChange={(e) => handleFieldChange("location", e.target.value)}
              className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
            />
            {errors["eventDetails.location"] && (
              <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                {errors["eventDetails.location"]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[11px] sm:text-xs font-semibold text-[#505768] mb-1">
              Select Venue{" "}
              <span className="text-[#8E95A2] font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="Select Venue"
              value={eventDetails.venue || ""}
              onChange={(e) => handleFieldChange("venue", e.target.value)}
              className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-[#fc6f47]/50 focus:border-[#fc6f47] focus:ring-2 focus:ring-[#ffe9e0] outline-none transition bg-white text-xs sm:text-sm text-[#1E2024] placeholder:text-zinc-400 shadow-2xs"
            />
          </div>
        </div>

        {/* Category Selection */}
        <div className="pt-2 border-t border-orange-100/80">
          <label className="block text-[11px] sm:text-xs font-semibold text-[#3c4353] mb-1.5">
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