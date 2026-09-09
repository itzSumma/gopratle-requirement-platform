'use client';

import React from 'react';
import { RequirementCategory } from '../../types/requirement';
import { CalendarCheck2, Mic2, Wrench } from 'lucide-react';

interface CategorySelectorProps {
  selectedCategory: RequirementCategory;
  onSelect: (category: RequirementCategory) => void;
}

const CATEGORIES: {
  id: RequirementCategory;
  title: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'EVENT_PLANNER',
    title: 'Event Planner',
    desc: 'Plan and coordinate',
    icon: <CalendarCheck2 className="w-6 h-6 text-blue-600" />,
  },
  {
    id: 'PERFORMER',
    title: 'Performer',
    desc: 'Artist, band or DJ',
    icon: <Mic2 className="w-6 h-6 text-indigo-600" />,
  },
  {
    id: 'CREW',
    title: 'Crew',
    desc: 'Technical & support staff',
    icon: <Wrench className="w-6 h-6 text-emerald-600" />,
  },
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            aria-pressed={isSelected}
            className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-150 ${
              isSelected
                ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                : 'border-zinc-200 hover:border-zinc-300 bg-white'
            }`}
          >
            <div className="p-2 rounded-lg bg-zinc-100 w-fit mb-3">
              {cat.icon}
            </div>

            <div>
              <p className="font-semibold text-zinc-900 text-sm">
                {cat.title}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                {cat.desc}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};