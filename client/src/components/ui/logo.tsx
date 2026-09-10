import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "h-8",
  showText = true,
}) => {
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Official Rounded Orange Brand Icon */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto aspect-square shrink-0"
      >
        {/* Coral Orange Square with smooth corners */}
        <rect width="100" height="100" rx="20" fill="#FF4713" />

        {/* Slanted G Geometric Mark */}
        <g transform="rotate(-12 50 50) translate(0, 1)">
          {/* Outer Bold Arc of 'G' */}
          <path
            d="M 68 34
               C 60 20, 38 20, 27 32
               C 15 45, 15 67, 27 79
               C 39 90, 62 89, 73 78
               L 73 59
               L 54 59"
            stroke="white"
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Inner Parallel Curved Trace */}
          <path
            d="M 59 42
               C 54 34, 42 33, 35 39
               C 27 47, 27 63, 35 71
               C 42 77, 56 77, 63 70"
            stroke="white"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Vertical Parallel Strip */}
          <rect x="70" y="44" width="8" height="37" rx="4" fill="white" />
        </g>
      </svg>

      {/* Official Exact Brand Typography */}
      {showText && (
        <span className="text-[23px] font-bold tracking-[-0.035em] text-[#3a3c42] leading-none flex items-baseline font-sans">
          <span className="font-semibold text-[#3a3d44]">Go</span>
          <span>Pratle</span>
        </span>
      )}
    </div>
  );
};
