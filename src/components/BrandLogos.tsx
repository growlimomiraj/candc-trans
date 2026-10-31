import React from 'react';

// Kia Emblem (Modern Connected Luxury Emblem)
export const KiaLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-6" }) => (
  <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <text
      x="50"
      y="28"
      fill="#092D5C"
      fontSize="24"
      fontWeight="900"
      textAnchor="middle"
      fontFamily="sans-serif"
      letterSpacing="2"
    >
      KIA
    </text>
  </svg>
);

// Cadillac Crest
export const CadillacLogo: React.FC<{ className?: string }> = ({ className = "w-9 h-7" }) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Geometric Cadillac Crest */}
    <path
      d="M 50 6 L 85 24 L 75 62 L 50 76 L 25 62 L 15 24 Z"
      stroke="#092D5C"
      strokeWidth="4.5"
      fill="none"
    />
    <path
      d="M 50 14 L 76 28 L 68 56 L 50 66 L 32 56 L 24 28 Z"
      stroke="#FF7100"
      strokeWidth="2"
      fill="none"
    />
    <line x1="28" y1="38" x2="72" y2="38" stroke="#092D5C" strokeWidth="2.5" />
    <line x1="33" y1="48" x2="67" y2="48" stroke="#092D5C" strokeWidth="2.5" />
  </svg>
);

// Lucid Motors Luxury Emblem
export const LucidLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-5" }) => (
  <svg viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <text
      x="60"
      y="22"
      fill="#092D5C"
      fontSize="15"
      fontWeight="800"
      textAnchor="middle"
      fontFamily="sans-serif"
      letterSpacing="4"
    >
      LUCID
    </text>
  </svg>
);

// BMW Roundel Emblem
export const BmwLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="48" fill="#FFFFFF" stroke="#092D5C" strokeWidth="4" />
    <circle cx="50" cy="50" r="46" fill="#092D5C" />
    <circle cx="50" cy="50" r="30" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1" />
    <path d="M 50 20 A 30 30 0 0 1 80 50 L 50 50 Z" fill="#0066B1" />
    <path d="M 50 20 A 30 30 0 0 0 20 50 L 50 50 Z" fill="#FFFFFF" />
    <path d="M 50 80 A 30 30 0 0 1 20 50 L 50 50 Z" fill="#0066B1" />
    <path d="M 50 80 A 30 30 0 0 0 80 50 L 50 50 Z" fill="#FFFFFF" />
    <circle cx="50" cy="50" r="30" fill="none" stroke="#D1D5DB" strokeWidth="1.5" />
    <text x="31" y="16" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">B</text>
    <text x="47" y="13" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">M</text>
    <text x="64" y="16" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">W</text>
  </svg>
);

// Mercedes-Benz Three-Pointed Star
export const MercedesLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="46" stroke="#092D5C" strokeWidth="5" />
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

// Audi 4 Rings
export const AudiLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-6" }) => (
  <svg viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="24" cy="25" r="18" stroke="#092D5C" strokeWidth="4" />
    <circle cx="48" cy="25" r="18" stroke="#092D5C" strokeWidth="4" />
    <circle cx="72" cy="25" r="18" stroke="#092D5C" strokeWidth="4" />
    <circle cx="96" cy="25" r="18" stroke="#092D5C" strokeWidth="4" />
  </svg>
);
