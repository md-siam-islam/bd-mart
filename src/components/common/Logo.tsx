import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'default' | 'white' | 'admin';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  to?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  size = 'md',
  showTagline = true,
  to,
  className = ''
}) => {
  const isWhite = variant === 'white';
  const isAdmin = variant === 'admin';
  const destination = to !== undefined ? to : isAdmin ? '/admin' : '/';

  // Size configurations
  const dimensions = {
    sm: { icon: 34, title: 'text-xl', tag: 'text-[9px]', sub: 'text-[8px]' },
    md: { icon: 42, title: 'text-2xl', tag: 'text-[10px]', sub: 'text-[9px]' },
    lg: { icon: 50, title: 'text-3xl', tag: 'text-xs', sub: 'text-[10px]' },
    xl: { icon: 60, title: 'text-4xl', tag: 'text-xs', sub: 'text-[11px]' }
  }[size];

  return (
    <Link
      to={destination}
      className={`inline-flex items-center gap-2.5 sm:gap-3 group select-none transition-transform hover:opacity-95 ${className}`}
      aria-label="BD Mart - Bangladesh Online Shopping"
    >
      {/* Premium Stylized Emblem SVG */}
      <div
        className="relative shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ width: dimensions.icon, height: dimensions.icon }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          <defs>
            {/* Primary Brand Flame Gradient */}
            <linearGradient id="bdmBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF5722" />
              <stop offset="50%" stopColor="#FF9800" />
              <stop offset="100%" stopColor="#FFC107" />
            </linearGradient>

            {/* Glossy Overlay Highlight */}
            <linearGradient id="bdmGlossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Inner Gold Sparkle Gradient */}
            <linearGradient id="bdmGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8E1" />
              <stop offset="100%" stopColor="#FFC107" />
            </linearGradient>

            {/* Blue Accent Ring */}
            <linearGradient id="bdmBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2196F3" />
              <stop offset="100%" stopColor="#1976D2" />
            </linearGradient>

            <filter id="bdmShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#FF5722" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Squircle Luxury Emblem Container */}
          <rect
            x="6"
            y="6"
            width="88"
            height="88"
            rx="24"
            fill="url(#bdmBrandGrad)"
            filter="url(#bdmShadow)"
          />

          {/* Gloss Top Corner Shimmer */}
          <rect
            x="6"
            y="6"
            width="88"
            height="44"
            rx="24"
            fill="url(#bdmGlossGrad)"
          />

          {/* Outer Thin Gold Border */}
          <rect
            x="7"
            y="7"
            width="86"
            height="86"
            rx="23"
            stroke="#ffffff"
            strokeOpacity="0.35"
            strokeWidth="2"
          />

          {/* Stylized Modern Shopping Bag / Ribbon / Monogram */}
          {/* Bag Handle */}
          <path
            d="M37 38 C 37 26, 63 26, 63 38"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Bag Body with Modern Geometric Cut */}
          <path
            d="M26 40 L 74 40 L 69 76 C 68.5 80, 65 83, 60 83 L 40 83 C 35 83, 31.5 80, 31 76 Z"
            fill="#ffffff"
          />

          {/* Shopping Gem / Star Cut inside Bag in Brand Flame Gradient */}
          <path
            d="M50 48 L 54 58 L 65 59 L 56 66 L 59 76 L 50 70 L 41 76 L 44 66 L 35 59 L 46 58 Z"
            fill="url(#bdmBrandGrad)"
          />

          {/* Top-right Luxury Sparkle Star */}
          <path
            d="M74 14 L 76.5 22.5 L 85 25 L 76.5 27.5 L 74 36 L 71.5 27.5 L 63 25 L 71.5 22.5 Z"
            fill="url(#bdmGoldGrad)"
          />

          {/* Verified Small Green Dot Badge Bottom Right */}
          <circle cx="80" cy="80" r="8" fill="#4CAF50" stroke="#ffffff" strokeWidth="2.5" />
          <path d="M77 80 L 79 82 L 83 78" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-black tracking-tight ${dimensions.title} ${
              isWhite ? 'text-white' : 'text-slate-950'
            }`}
          >
            BD
          </span>
          <span
            className={`font-black tracking-tight ${dimensions.title} bg-gradient-to-r from-[#FF5722] via-[#FF9800] to-[#FFC107] bg-clip-text text-transparent`}
          >
            MART
          </span>

          {/* Admin Badge if Admin layout */}
          {isAdmin && (
            <span className="ml-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white shadow-sm">
              ADMIN
            </span>
          )}
        </div>

        {/* Tagline / Subtitle */}
        {showTagline && (
          <div className="flex items-center gap-1.5 mt-0.5 leading-tight">
            <span
              className={`font-bold uppercase tracking-[0.2em] ${dimensions.sub} ${
                isWhite ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Bangladesh Online
            </span>
            <span className="w-1 h-1 rounded-full bg-[#4CAF50] shrink-0" />
            <span className="text-[9px] font-bold text-[#4CAF50] tracking-wider uppercase hidden sm:inline">
              Verified
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};
