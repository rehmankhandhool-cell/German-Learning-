import React from 'react';

interface BrandLogoProps {
  variant?: 'horizontal' | 'mark-only' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  inverted?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  inverted = false,
  className = '',
  onClick
}) => {
  // Dimensions map
  const markDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }[size];

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }[size];

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm'
  }[size];

  return (
    <div
      id="brand-logo"
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none transition-transform hover:opacity-95 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Official German Teacher Shield / Cap / Tricolor Mark */}
      <div className={`relative flex-shrink-0 ${markDimensions}`}>
        <svg
          viewBox="0 0 96 96"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B132B" />
              <stop offset="100%" stopColor="#1C2541" />
            </linearGradient>
            <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="logoRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>

          {/* Rounded Emblem Shield */}
          <rect x="0" y="0" width="96" height="96" rx="22" fill="url(#logoBgGrad)" />

          {/* Subtle Outer Ring */}
          <rect
            x="2"
            y="2"
            width="92"
            height="92"
            rx="20"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Academic Mortarboard / Book wings */}
          <path
            d="M 48 22 L 78 36 L 48 50 L 18 36 Z"
            fill="#1E293B"
            stroke="#334155"
            strokeWidth="1.5"
          />

          {/* Graduation Cap Band in German Red */}
          <path
            d="M 28 41 L 28 54 C 28 66 68 66 68 54 L 68 41"
            fill="none"
            stroke="url(#logoRed)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* German Flag Tricolor Bookmark Ribbon */}
          {/* Black / Navy ribbon segment */}
          <path d="M 52 48 L 68 56 L 66 76 L 58 72 L 50 76 Z" fill="#0F172A" />
          {/* Red stripe */}
          <path d="M 54 53 L 64 58 L 63 71 L 58 68.5 L 53 71 Z" fill="url(#logoRed)" />
          {/* Gold stripe */}
          <path d="M 56 57 L 61 59.5 L 60.5 67 L 58 65.5 L 55.5 67 Z" fill="url(#logoGold)" />

          {/* Gold Tassel button & hanging cord */}
          <circle cx="78" cy="36" r="4.5" fill="url(#logoGold)" />
          <path
            d="M 78 40 L 76 60"
            stroke="url(#logoGold)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Speech bubble arc indicating language & teaching */}
          <path
            d="M 22 66 C 22 75 32 80 44 80 C 47 80 50 79.5 53 78.8 L 60 83 L 58 76 C 63 73.5 66 69.8 66 66"
            fill="none"
            stroke="url(#logoGold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Typography */}
      {variant !== 'mark-only' && (
        <div className={`flex ${variant === 'stacked' ? 'flex-col' : 'flex-col'} leading-none`}>
          <div className="flex items-center gap-1">
            <span
              className={`font-extrabold tracking-tight ${titleSizes} font-['Outfit'] ${
                inverted ? 'text-white' : 'text-slate-900'
              }`}
            >
              German
            </span>
            <span
              className={`font-extrabold tracking-tight ${titleSizes} font-['Outfit'] text-red-600`}
            >
              Teacher
            </span>
            {/* German flag golden dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block ml-0.5 animate-pulse" />
          </div>

          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`font-semibold uppercase tracking-wider ${subSizes} ${
                inverted ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              Learn German for Real Life
            </span>
            {/* German mini tricolor bar */}
            <div className="flex items-center gap-0.5 ml-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
