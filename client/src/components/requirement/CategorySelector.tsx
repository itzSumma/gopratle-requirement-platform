
'use client';

import React from 'react';

import { RequirementCategory } from '../../types/requirement';

import { CalendarCheck2, Mic2, Wrench } from 'lucide-react';

interface CategorySelectorProps {
  selectedCategory: RequirementCategory;
  onSelect: (category: RequirementCategory) => void;
}

// Available event professional categories shown in the requirement form.
const CATEGORIES: {
  id: RequirementCategory;
  title: string;
  desc: string;
  icon: (isSelected: boolean) => React.ReactNode;
}[] = [
  {
    id: 'EVENT_PLANNER',
    title: 'Event Planner',
    desc: 'Plan and coordinate',
    icon: (isSelected) => (
      <CalendarCheck2
        className={`w-5 h-5 transition-colors ${
          isSelected ? 'text-[#fa5d32]' : 'text-[#717784]'
        }`}
      />
    ),
  },
  {
    id: 'PERFORMER',
    title: 'Performer',
    desc: 'Artist, band or DJ',
    icon: (isSelected) => (
      <Mic2
        className={`w-5 h-5 transition-colors ${
          isSelected ? 'text-[#fa5d32]' : 'text-[#717784]'
        }`}
      />
    ),
  },
  {
    id: 'CREW',
    title: 'Crew',
    desc: 'Technical & support staff',
    icon: (isSelected) => (
      <Wrench
        className={`w-5 h-5 transition-colors ${
          isSelected ? 'text-[#fa5d32]' : 'text-[#717784]'
        }`}
      />
    ),
  },
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
      {CATEGORIES.map((cat) => {
        // Check whether the current category is selected.
        const isSelected = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            aria-pressed={isSelected}
            className={`p-3 sm:p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
              isSelected
                ? 'border-[#fa5d32] bg-[#FFF7F2] ring-2 ring-[#fa5d32]/15 shadow-xs'
                : 'border-orange-100/70 hover:border-orange-200 bg-white hover:bg-orange-50/20'
            }`}
          >
            <div
              className={`p-2 rounded-xl w-fit mb-2.5 transition-colors ${
                isSelected
                  ? 'bg-[#FFEFE8] text-[#fa5d32]'
                  : 'bg-[#FFFBF8] text-[#717784] border border-orange-100/60'
              }`}
            >
              {cat.icon(isSelected)}
            </div>

            <div>
              <p
                className={`font-semibold text-xs sm:text-sm tracking-tight ${
                  isSelected ? 'text-[#fa5d32]' : 'text-[#1E2024]'
                }`}
              >
                {cat.title}
              </p>

              <p className="text-[11px] text-[#555A64] mt-0.5 leading-snug">
                {cat.desc}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

