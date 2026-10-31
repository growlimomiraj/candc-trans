import React from 'react';

export const AnticorLogo: React.FC<{ className?: string; subtitleClass?: string }> = ({
  className = "h-8",
  subtitleClass = "text-[9px] text-[#64748B]"
}) => {
  return (
    <div className="flex items-center gap-2 select-none group cursor-pointer">
      {/* Brand Icon: Dynamic overlapping swooshes */}
      <svg
        viewBox="0 0 54 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-8 flex-shrink-0"
      >
        {/* Navy dynamic wave ribbon */}
        <path
          d="M 6 22 C 12 10, 28 6, 44 10 C 32 14, 18 18, 12 28 C 8 34, 10 38, 18 36 C 26 34, 34 26, 48 18 C 36 26, 24 38, 14 38 C 6 38, 2 30, 6 22 Z"
          fill="#092D5C"
        />
        {/* Top vibrant orange speed swoosh */}
        <path
          d="M 14 12 C 22 4, 38 2, 50 6 C 40 8, 26 12, 18 18 C 14 22, 12 20, 14 12 Z"
          fill="#FF7100"
        />
        {/* Bottom subtle accent line */}
        <path
          d="M 22 34 C 30 32, 40 28, 48 22 C 40 28, 30 32, 22 34 Z"
          stroke="#092D5C"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline font-bold text-xl tracking-tight">
          <span className="text-[#092D5C]">Anticor</span>
          <span className="text-[#092D5C]">Car</span>
          <span className="text-[#FF7100]">.com</span>
        </div>
        <span className={`tracking-normal font-medium mt-0.5 ${subtitleClass}`}>
          Renting. Your Way. Premium.
        </span>
      </div>
    </div>
  );
};
