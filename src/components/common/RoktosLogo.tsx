import React from 'react';

interface RoktosLogoProps {
  variant?: 'full' | 'horizontal' | 'symbol' | 'compact';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSubtitle?: boolean;
}

export const RoktosLogo: React.FC<RoktosLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  size = 'md',
  className = '',
  showSubtitle = true,
}) => {
  // Dimensions based on size
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const subtitleColor = isDark ? 'text-teal-200' : 'text-slate-500';

  // SVG Blood Drop + Human Connection Symbol
  const SymbolSVG = (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${iconSizes[size]} shrink-0 transition-transform duration-200 hover:scale-105`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="roktosDropGrad" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E11D48" />
          <stop offset="50%" stopColor="#BE123C" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>
        <linearGradient id="roktosHeartGrad" x1="14" y1="16" x2="34" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#0F766E" />
        </linearGradient>
        <filter id="roktosGlow" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#BE123C" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Main Outer Blood Drop with subtle shadow */}
      <path
        d="M24 3C24 3 9 20.4 9 30.6C9 38.6 15.7 45 24 45C32.3 45 39 38.6 39 30.6C39 20.4 24 3 24 3Z"
        fill="url(#roktosDropGrad)"
        filter="url(#roktosGlow)"
      />

      {/* Inner Interlocking Protective Heart / Caring Hands Curve */}
      <path
        d="M24 16C21.8 12.8 17.5 13.5 15.5 16.5C13.2 20 14 24.5 18 28.5L24 34.5L30 28.5C34 24.5 34.8 20 32.5 16.5C30.5 13.5 26.2 12.8 24 16Z"
        fill="#FFFFFF"
        fillOpacity="0.95"
      />

      {/* Central Vital Core Drop */}
      <path
        d="M24 19.5C22.6 21.5 20.2 24.2 20.2 26.5C20.2 28.6 21.9 30.2 24 30.2C26.1 30.2 27.8 28.6 27.8 26.5C27.8 24.2 25.4 21.5 24 19.5Z"
        fill="url(#roktosDropGrad)"
      />

      {/* Tiny light reflection node */}
      <circle cx="16" cy="27" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />
    </svg>
  );

  if (variant === 'symbol') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {SymbolSVG}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {SymbolSVG}
      <div className="flex flex-col text-left leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-tight ${textSizes[size]} ${textColor} uppercase font-sans`}>
            ROKTOS
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-rose-600/10 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300 uppercase tracking-widest">
            BD
          </span>
        </div>
        {showSubtitle && (
          <span className={`text-[10px] sm:text-[11px] font-medium tracking-normal ${subtitleColor} mt-0.5`}>
            Blood Donor Network
          </span>
        )}
      </div>
    </div>
  );
};
