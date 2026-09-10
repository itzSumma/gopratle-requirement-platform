"use client";

import React from "react";
import { Logo } from "../components/ui/logo";
import { RequirementForm } from "../components/requirement/RequirementForm";

// Image Urls for the 4 photos on the left side of the landing page
const EVENT_IMAGES = [
  {
    url: "https://images.pexels.com/photos/36184378/pexels-photo-36184378.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Traditional Wedding Celebration",
  },
  {
    url: "https://images.pexels.com/photos/34058994/pexels-photo-34058994.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Live Stage Performer",
  },
  {
    url: "https://images.pexels.com/photos/7153762/pexels-photo-7153762.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Cultural Festival Dance",
  },
  {
    url: "https://images.pexels.com/photos/10139991/pexels-photo-10139991.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Production Setup & Rituals",
  },
];

const OFFICIAL_PILLARS = [
  {
    label: "Vetted Portfolios",
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF4713"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3 h-3 lg:w-3.5 lg:h-3.5"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: "Transparent Bookings",
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF4713"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3 h-3 lg:w-3.5 lg:h-3.5"
      >
        <path d="m3 11 18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </svg>
    ),
  },
  {
    label: "Secure Transactions",
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF4713"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3 h-3 lg:w-3.5 lg:h-3.5"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Dedicated Support",
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF4713"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3.5 h-3.5"
      >
        <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2.4-2.4a1 1 0 0 0-1.4 0L13 13" />
        <path d="m13 13-2.6-2.6a1 1 0 0 0-1.4 0L6.7 12.7a1 1 0 0 0 0 1.4l4.3 4.3" />
        <path d="M18 11V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v13" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <main className="min-h-screen lg:h-screen w-full bg-[#FFFBF8] flex items-center justify-center p-2 sm:p-4 overflow-y-auto lg:overflow-hidden font-sans">
      
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-sm border border-orange-100/70 overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-stretch max-h-none lg:max-h-[96vh]">
        
        <div className="bg-[#FFF7F2] px-5 sm:px-6 lg:px-7 py-5 sm:py-6 flex flex-col justify-center gap-3 lg:gap-3.5 border-b lg:border-b-0 lg:border-r border-orange-100/70 overflow-hidden">
          {/* Logo & Headline */}
          <div className="shrink-0">
            <div className="mb-5 lg:mb-4 flex items-center h-8 lg:h-9">
              <Logo className="h-7.5 lg:h-9" />
            </div>

            <span className="inline-block text-[9.5px] lg:text-[11px] font-bold tracking-wider uppercase text-[#f86035] bg-[#ffe9e0] px-3 py-1.5 rounded-full mb-1 lg:mb-1.5">
              Stress-free & tailored
            </span>

            <h2 className="text-lg sm:text-[21px] lg:text-[25px] font-semibold text-[#3c424f] leading-snug tracking-tight">
              Finding the right people for your event{" "}
              <span className="text-[#fa5d32] font-bold">
                shouldn&apos;t be this hard.
              </span>
            </h2>

            <p className="text-[11.5px] lg:text-[15px] text-[#434a5a] mt-1 lg:mt-2.5 leading-normal lg:leading-relaxed font-normal">
              Connect directly with verified planners, artists, and crew to
              bring celebrations to life without endless back-and-forth.
            </p>
          </div>

          {/* 4 Photos: Crisp and clear rendering */}
          <div className="grid grid-cols-2 gap-2.5 shrink-0">
            {EVENT_IMAGES.map((img, idx) => (
              <div
                key={idx}
                className="relative h-[98px] sm:h-[105px] lg:h-[190px] w-full rounded-xl overflow-hidden border border-white shadow-xs group bg-orange-50/50"
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  loading="eager"
                  decoding="sync"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 transform-gpu [image-rendering:-webkit-optimize-contrast]"
                />
              </div>
            ))}
          </div>

          {/* 4 Value Badges */}
          <div className="shrink-0 pt-2.5 border-t border-orange-200/80">
            <p className="text-[9px] lg:text-[12px] font-semibold text-[#8E95A2] uppercase tracking-wider mb-1.5 lg:mb-2">
              Values built into GoPratle
            </p>

            <div className="grid grid-cols-2 gap-1.5 lg:gap-2">
              {OFFICIAL_PILLARS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-1.5 lg:gap-2 px-2.5 py-1.5 bg-white border border-[#fc6f47] rounded-full shadow-xs"
                  >
                    <div className="w-4 h-4 lg:w-4.5 lg:h-4.5 rounded-full border border-[#e65027] flex items-center justify-center shrink-0">
                      <Icon />
                    </div>
                    <span className="text-[9.5px] lg:text-[11px] font-bold text-[#505768] whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Form Container */}
        <div className="px-5 sm:px-6 pt-9 lg:pt-11 pb-5 flex flex-col justify-center bg-white overflow-hidden">
          <RequirementForm />
        </div>
      </div>
    </main>
  );
}
