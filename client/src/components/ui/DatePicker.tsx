'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hasError?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  hasError = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDate = value ? new Date(value) : null;
  const [viewDate, setViewDate] = useState<Date>(selectedDate || new Date());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    onChange(`${year}-${m}-${d}`);
    setIsOpen(false);
  };

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${m}/${d}/${y}`;
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Input Display Field */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-1.5 sm:py-2 rounded-xl border transition text-xs sm:text-sm bg-white text-left outline-none ${
          hasError
            ? 'border-red-400'
            : isOpen
            ? 'border-[#fc6f47] ring-2 ring-[#ffe9e0]'
            : 'border-[#fc6f47]/50 hover:border-[#fc6f47]'
        }`}
      >
        <span className={value ? 'text-[#1E2024] font-medium' : 'text-zinc-400'}>
          {value ? formatDateDisplay(value) : placeholder}
        </span>
        <CalendarIcon className="w-3.5 h-3.5 text-[#fa5d32] shrink-0" />
      </button>

      {/* Branded Calendar Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 z-50 w-64 p-3 bg-white rounded-2xl shadow-xl border border-[#fc6f47]/20 select-none animate-in fade-in zoom-in-95 duration-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#1E2024]">
              {monthNames[month]} {year}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1 rounded-lg hover:bg-[#FFF7F2] text-[#555A64] hover:text-[#fa5d32] transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1 rounded-lg hover:bg-[#FFF7F2] text-[#555A64] hover:text-[#fa5d32] transition"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 text-center mb-1">
            {daysOfWeek.map((day) => (
              <span key={day} className="text-[10px] font-semibold text-[#8E95A2] py-0.5">
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const formattedCurrent = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isSelected = value === formattedCurrent;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`h-7 w-7 mx-auto flex items-center justify-center rounded-lg text-xs font-medium transition ${
                    isSelected
                      ? 'bg-[#fa5d32] text-white font-bold shadow-xs'
                      : 'text-[#1E2024] hover:bg-[#FFF7F2] hover:text-[#fa5d32]'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Footer Clear */}
          <div className="mt-2 pt-2 border-t border-orange-100/80 flex justify-between">
            <button
              type="button"
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
              className="text-[10px] font-medium text-[#8E95A2] hover:text-red-500"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                const m = String(today.getMonth() + 1).padStart(2, '0');
                const d = String(today.getDate()).padStart(2, '0');
                onChange(`${today.getFullYear()}-${m}-${d}`);
                setIsOpen(false);
              }}
              className="text-[10px] font-semibold text-[#fa5d32] hover:underline"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};