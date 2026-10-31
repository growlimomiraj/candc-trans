import React from 'react';

// Toyota Emblem
export const ToyotaLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-7" }) => (
  <svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Outer ellipse */}
    <ellipse cx="50" cy="35" rx="46" ry="31" stroke="#092D5C" strokeWidth="6" />
    {/* Vertical inner ellipse */}
    <ellipse cx="50" cy="35" rx="14" ry="24" stroke="#092D5C" strokeWidth="5.5" />
    {/* Horizontal top inner ellipse */}
    <ellipse cx="50" cy="27" rx="30" ry="11" stroke="#092D5C" strokeWidth="5" />
  </svg>
);

// BMW Roundel Emblem
export const BmwLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="48" fill="#FFFFFF" stroke="#092D5C" strokeWidth="4" />
    {/* Outer ring */}
    <circle cx="50" cy="50" r="46" fill="#092D5C" />
    {/* Inner ring */}
    <circle cx="50" cy="50" r="30" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1" />
    {/* BMW quadrants */}
    <path d="M 50 20 A 30 30 0 0 1 80 50 L 50 50 Z" fill="#0066B1" />
    <path d="M 50 20 A 30 30 0 0 0 20 50 L 50 50 Z" fill="#FFFFFF" />
    <path d="M 50 80 A 30 30 0 0 1 20 50 L 50 50 Z" fill="#0066B1" />
    <path d="M 50 80 A 30 30 0 0 0 80 50 L 50 50 Z" fill="#FFFFFF" />
    <circle cx="50" cy="50" r="30" fill="none" stroke="#D1D5DB" strokeWidth="1.5" />
    {/* Letters B M W */}
    <text x="31" y="16" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">B</text>
    <text x="47" y="13" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">M</text>
    <text x="64" y="16" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">W</text>
  </svg>
);

// Mercedes-Benz Three-Pointed Star
export const MercedesLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="46" stroke="#092D5C" strokeWidth="5" />
    {/* Three-pointed star */}
    <polygon points="50,10 54,46 50,50 46,46" fill="#092D5C" />
    <polygon points="85,70 54,54 50,50 52,47" fill="#092D5C" />
    <polygon points="15,70 48,47 50,50 46,54" fill="#092D5C" />
  </svg>
);

// Land Rover Oval
export const LandRoverLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-6" }) => (
  <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="60" cy="30" rx="58" ry="28" fill="#005A2B" stroke="#092D5C" strokeWidth="2" />
    <ellipse cx="60" cy="30" rx="53" ry="23" fill="none" stroke="#E5E7EB" strokeWidth="1.5" />
    <text x="60" y="27" fill="#FFFFFF" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="0.8">LAND</text>
    <text x="60" y="42" fill="#FFFFFF" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="0.8">ROVER</text>
    <path d="M 16 30 L 26 30" stroke="#FFFFFF" strokeWidth="1.5" />
    <path d="M 94 30 L 104 30" stroke="#FFFFFF" strokeWidth="1.5" />
  </svg>
);

// Honda Shield Emblem
export const HondaLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-7" }) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M 12 12 C 12 8, 18 6, 50 6 C 82 6, 88 8, 88 12 L 80 68 C 80 74, 74 76, 50 76 C 26 76, 20 74, 20 68 Z"
      stroke="#092D5C"
      strokeWidth="5"
      fill="none"
    />
    <path
      d="M 33 18 L 33 64 M 67 18 L 67 64 M 33 42 L 67 42 M 25 18 L 35 18 M 65 18 L 75 18"
      stroke="#092D5C"
      strokeWidth="6"
      strokeLinecap="round"
    />
  </svg>
);

// Audi 4 Rings
export const AudiLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-6" }) => (
  <svg viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="24" cy="25" r="18" stroke="#092D5C" strokeWidth="4" />
    <circle cx="48" cy="25" r="18" stroke="#092D5C" strokeWidth="4" />
    <circle cx="72" cy="25" r="18" stroke="#092D5C" strokeWidth="4" />
    <circle cx="96" cy="25" r="18" stroke="#092D5C" strokeWidth="4" />
  </svg>
);

// Hyundai Slanted Oval Emblem
export const HyundaiLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-7" }) => (
  <svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse
      cx="50"
      cy="35"
      rx="44"
      ry="28"
      transform="rotate(-10 50 35)"
      stroke="#092D5C"
      strokeWidth="5.5"
    />
    <path
      d="M 36 22 C 37 34, 38 48, 38 52 C 45 42, 55 42, 62 50 C 62 46, 63 32, 64 20"
      stroke="#092D5C"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
