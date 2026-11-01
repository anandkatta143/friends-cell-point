import React from 'react';
import {
  SmartphoneCategoryItem,
  SetupAccessoryCategory,
  FindPhoneCategoryItem,
} from '../utils/storeLogic';

interface HeroStudioPhoneProps {
  activeFinish: 'titanium' | 'obsidian' | 'pearl';
  onSelectFinish: (finish: 'titanium' | 'obsidian' | 'pearl') => void;
}

export const HeroStudioPhone: React.FC<HeroStudioPhoneProps> = ({
  activeFinish,
  onSelectFinish,
}) => {
  const finishMap = {
    titanium: {
      name: 'Natural Titanium Studio Finish',
      frameStart: '#D4CFC7',
      frameMid: '#8A847C',
      frameEnd: '#4A4640',
      backStart: '#2A2826',
      backEnd: '#141312',
      glow: 'rgba(245, 158, 11, 0.22)',
      screenAccent1: '#D97706',
      screenAccent2: '#1E293B',
    },
    obsidian: {
      name: 'Obsidian Graphite Studio Finish',
      frameStart: '#52525B',
      frameMid: '#27272A',
      frameEnd: '#09090B',
      backStart: '#18181B',
      backEnd: '#09090B',
      glow: 'rgba(148, 163, 184, 0.18)',
      screenAccent1: '#38BDF8',
      screenAccent2: '#0F172A',
    },
    pearl: {
      name: 'Warm Sandstone Studio Finish',
      frameStart: '#F5EFE6',
      frameMid: '#C8BFAE',
      frameEnd: '#78716C',
      backStart: '#44403C',
      backEnd: '#1C1917',
      glow: 'rgba(251, 191, 36, 0.20)',
      screenAccent1: '#F59E0B',
      screenAccent2: '#292524',
    },
  };

  const f = finishMap[activeFinish];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
      {/* Studio Ambient Rim Lighting */}
      <div
        className="pointer-events-none absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full blur-3xl transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${f.glow} 0%, rgba(11,12,14,0) 70%)`,
        }}
      />

      <div className="relative w-full max-w-[500px] aspect-[4/3.5] flex items-center justify-center">
        <svg
          viewBox="0 0 600 520"
          className="w-full h-full drop-shadow-[0_32px_64px_rgba(0,0,0,0.85)]"
          role="img"
          aria-label={`Studio smartphone and accessories hardware illustration in ${f.name}`}
        >
          <defs>
            <linearGradient id="heroFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={f.frameStart} />
              <stop offset="50%" stopColor={f.frameMid} />
              <stop offset="100%" stopColor={f.frameEnd} />
            </linearGradient>

            <linearGradient id="heroBackGlass" x1="0%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor={f.backStart} />
              <stop offset="100%" stopColor={f.backEnd} />
            </linearGradient>

            <linearGradient id="heroScreenWallpaper" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#090A0F" />
              <stop offset="42%" stopColor={f.screenAccent2} />
              <stop offset="78%" stopColor={f.screenAccent1} stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0B0C0E" />
            </linearGradient>

            <linearGradient id="glassSpecular" x1="0%" y1="0%" x2="100%" y2="65%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />
              <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.06" />
              <stop offset="36%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            <radialGradient id="lensOptic" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.55" />
              <stop offset="35%" stopColor="#1E293B" stopOpacity="0.9" />
              <stop offset="75%" stopColor="#090A0F" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>

            <linearGradient id="pedestalTop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#18191E" />
              <stop offset="50%" stopColor="#272930" />
              <stop offset="100%" stopColor="#121317" />
            </linearGradient>
          </defs>

          {/* Architectural Stone Studio Plinth */}
          <ellipse cx="300" cy="462" rx="245" ry="28" fill="url(#pedestalTop)" opacity="0.88" />
          <ellipse cx="300" cy="462" rx="200" ry="15" fill="#000000" opacity="0.65" />

          {/* Rear Smartphone Profile */}
          <g transform="translate(148, 62) rotate(-8)">
            <rect
              x="0"
              y="0"
              width="192"
              height="372"
              rx="34"
              fill="url(#heroFrameGrad)"
              stroke="#FFFFFF"
              strokeOpacity="0.22"
              strokeWidth="1.5"
            />
            <rect x="5" y="5" width="182" height="362" rx="30" fill="url(#heroBackGlass)" />
            <rect
              x="16"
              y="16"
              width="92"
              height="96"
              rx="22"
              fill={f.backStart}
              stroke="url(#heroFrameGrad)"
              strokeWidth="1.5"
            />
            <g transform="translate(38, 38)">
              <circle cx="0" cy="0" r="18" fill="url(#heroFrameGrad)" />
              <circle cx="0" cy="0" r="14" fill="url(#lensOptic)" />
              <circle cx="-4" cy="-4" r="3" fill="#FFFFFF" fillOpacity="0.65" />
            </g>
            <g transform="translate(38, 84)">
              <circle cx="0" cy="0" r="18" fill="url(#heroFrameGrad)" />
              <circle cx="0" cy="0" r="14" fill="url(#lensOptic)" />
              <circle cx="-4" cy="-4" r="3" fill="#FFFFFF" fillOpacity="0.65" />
            </g>
            <g transform="translate(82, 61)">
              <circle cx="0" cy="0" r="18" fill="url(#heroFrameGrad)" />
              <circle cx="0" cy="0" r="14" fill="url(#lensOptic)" />
              <circle cx="-4" cy="-4" r="3" fill="#FFFFFF" fillOpacity="0.65" />
            </g>
            <circle cx="82" cy="33" r="6" fill="#FDE68A" fillOpacity="0.8" />
            <circle cx="82" cy="89" r="6.5" fill="#1E1B18" stroke="url(#heroFrameGrad)" strokeWidth="1" />
            <rect x="5" y="5" width="182" height="362" rx="30" fill="url(#glassSpecular)" />
          </g>

          {/* Foreground Smartphone Profile */}
          <g transform="translate(258, 46) rotate(6)">
            <rect x="-3" y="88" width="3" height="22" rx="1.5" fill="url(#heroFrameGrad)" />
            <rect x="-3" y="124" width="3" height="36" rx="1.5" fill="url(#heroFrameGrad)" />
            <rect x="-3" y="168" width="3" height="36" rx="1.5" fill="url(#heroFrameGrad)" />
            <rect x="196" y="136" width="3" height="52" rx="1.5" fill="url(#heroFrameGrad)" />

            <rect
              x="0"
              y="0"
              width="196"
              height="384"
              rx="36"
              fill="url(#heroFrameGrad)"
              stroke="#FFFFFF"
              strokeOpacity="0.35"
              strokeWidth="1.5"
            />
            <rect x="4" y="4" width="188" height="376" rx="32" fill="#050507" />
            <rect
              x="8"
              y="8"
              width="180"
              height="368"
              rx="28"
              fill="url(#heroScreenWallpaper)"
            />

            <path
              d="M 8 210 Q 95 145 188 190 L 188 376 L 8 376 Z"
              fill={f.screenAccent1}
              fillOpacity="0.22"
            />
            <circle cx="135" cy="145" r="68" fill={f.screenAccent1} fillOpacity="0.18" />

            <rect x="68" y="17" width="60" height="16" rx="8" fill="#000000" />
            <circle cx="117" cy="25" r="3.5" fill="#1E293B" />
            <circle cx="116" cy="24" r="1.2" fill="#60A5FA" fillOpacity="0.7" />

            <text
              x="98"
              y="92"
              textAnchor="middle"
              fill="#F8FAFC"
              fontSize="40"
              fontWeight="600"
              fontFamily="Outfit, sans-serif"
              letterSpacing="-1"
            >
              09:41
            </text>
            <text
              x="98"
              y="112"
              textAnchor="middle"
              fill="#CBD5E1"
              fontSize="9.5"
              fontWeight="500"
              fontFamily="Plus Jakarta Sans, sans-serif"
              letterSpacing="0.8"
            >
              FRIENDS CELL POINT
            </text>

            <rect
              x="20"
              y="282"
              width="156"
              height="54"
              rx="14"
              fill="#FFFFFF"
              fillOpacity="0.1"
              stroke="#FFFFFF"
              strokeOpacity="0.18"
            />
            <text
              x="32"
              y="304"
              fill="#F8FAFC"
              fontSize="9.5"
              fontWeight="600"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              Mobiles • TWS • Accessories
            </text>
            <text
              x="32"
              y="320"
              fill="#CBD5E1"
              fontSize="8.5"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              Tiruvuru Road • +91 72079 87777
            </text>

            <rect x="66" y="364" width="64" height="4" rx="2" fill="#FFFFFF" fillOpacity="0.65" />
            <rect x="8" y="8" width="180" height="368" rx="28" fill="url(#glassSpecular)" />
          </g>

          {/* Accompanying TWS Case on Studio Plinth (Communicating Complete Store) */}
          <g transform="translate(82, 378)">
            <rect
              x="0"
              y="18"
              width="72"
              height="58"
              rx="22"
              fill="#27272A"
              stroke="url(#heroFrameGrad)"
              strokeWidth="1.5"
            />
            <line x1="2" y1="40" x2="70" y2="40" stroke="#52525B" strokeWidth="1.5" />
            <circle cx="36" cy="52" r="2.8" fill="#10B981" />
            <g transform="translate(12, 2) rotate(-10)">
              <ellipse cx="10" cy="10" rx="10" ry="8" fill="#E4E4E7" />
              <rect x="12" y="12" width="5" height="16" rx="2.5" fill="#D4D4D8" />
            </g>
            <g transform="translate(42, 0) rotate(10)">
              <ellipse cx="10" cy="10" rx="10" ry="8" fill="#E4E4E7" />
              <rect x="3" y="12" width="5" height="16" rx="2.5" fill="#D4D4D8" />
            </g>
          </g>
        </svg>
      </div>

      {/* Single-Row Studio Finish Selector */}
      <div className="relative z-10 mt-1 inline-flex items-center gap-1.5 p-1.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
        <span className="hidden sm:inline text-xs text-zinc-400 px-2 whitespace-nowrap">
          Finish:
        </span>
        {(
          [
            { id: 'titanium', label: 'Titanium', swatch: 'bg-[#A69F95]' },
            { id: 'obsidian', label: 'Obsidian', swatch: 'bg-[#27272A]' },
            { id: 'pearl', label: 'Sandstone', swatch: 'bg-[#D6CFC2]' },
          ] as const
        ).map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelectFinish(option.id)}
            aria-pressed={activeFinish === option.id}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeFinish === option.id
                ? 'bg-white text-zinc-950 shadow-sm'
                : 'text-zinc-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full border border-white/30 ${option.swatch}`} />
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export const ProductPhoneStudioRender: React.FC<{
  variant: SmartphoneCategoryItem['visualVariant'];
  brand: string;
}> = ({ variant, brand }) => {
  const paletteMap: Record<
    SmartphoneCategoryItem['visualVariant'],
    {
      bgGrad: string;
      chassis: string;
      body: string;
      accent: string;
      cameraStyle:
        | 'triple-triangle'
        | 'vertical-rings'
        | 'halo-ring'
        | 'circle-island'
        | 'dual-matrix'
        | 'twin-pro'
        | 'classic-duo';
    }
  > = {
    'titanium-pro': {
      bgGrad: 'from-[#1B1A18] via-[#262421] to-[#121210]',
      chassis: '#B8B2A6',
      body: '#2E2C29',
      accent: '#F59E0B',
      cameraStyle: 'triple-triangle',
    },
    'ultra-display': {
      bgGrad: 'from-[#131720] via-[#1E2430] to-[#0E1117]',
      chassis: '#94A3B8',
      body: '#1E293B',
      accent: '#38BDF8',
      cameraStyle: 'vertical-rings',
    },
    'portrait-studio': {
      bgGrad: 'from-[#1C1917] via-[#292524] to-[#141210]',
      chassis: '#E7E5E4',
      body: '#44403C',
      accent: '#FBBF24',
      cameraStyle: 'circle-island',
    },
    'sleek-5g': {
      bgGrad: 'from-[#0F172A] via-[#1E293B] to-[#090D16]',
      chassis: '#CBD5E1',
      body: '#1E3A5F',
      accent: '#60A5FA',
      cameraStyle: 'halo-ring',
    },
    'note-series': {
      bgGrad: 'from-[#18181B] via-[#27272A] to-[#0F0F12]',
      chassis: '#A1A1AA',
      body: '#27272A',
      accent: '#FB923C',
      cameraStyle: 'dual-matrix',
    },
    'performance-ed': {
      bgGrad: 'from-[#1C1917] via-[#27221D] to-[#12100E]',
      chassis: '#D6C7B2',
      body: '#2E2822',
      accent: '#F59E0B',
      cameraStyle: 'twin-pro',
    },
    'all-rounder': {
      bgGrad: 'from-[#141619] via-[#20242A] to-[#0D0F12]',
      chassis: '#9CA3AF',
      body: '#374151',
      accent: '#A7F3D0',
      cameraStyle: 'classic-duo',
    },
  };

  const p = paletteMap[variant];

  return (
    <div
      className={`relative w-full aspect-[4/3] bg-gradient-to-br ${p.bgGrad} flex items-center justify-center overflow-hidden select-none`}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 35%, rgba(255,255,255,0.16), transparent 65%)',
        }}
      />

      <svg
        viewBox="0 0 320 240"
        className="relative z-10 w-full h-full p-3 transition-transform duration-300 group-hover:scale-[1.03]"
        role="img"
        aria-label={`${brand} smartphone studio illustration`}
      >
        <defs>
          <linearGradient id={`screen-${variant}-${brand}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#090D16" />
            <stop offset="55%" stopColor={p.body} />
            <stop offset="100%" stopColor={p.accent} stopOpacity="0.65" />
          </linearGradient>
        </defs>

        <ellipse cx="160" cy="216" rx="88" ry="9" fill="#000000" fillOpacity="0.55" />

        <g transform="translate(88, 22) rotate(-5)">
          <rect
            x="0"
            y="0"
            width="88"
            height="178"
            rx="16"
            fill={p.body}
            stroke={p.chassis}
            strokeWidth="2"
          />
          {p.cameraStyle === 'triple-triangle' && (
            <g transform="translate(10, 10)">
              <rect width="42" height="44" rx="10" fill="#18181B" stroke={p.chassis} strokeWidth="1" />
              <circle cx="13" cy="13" r="7" fill="#090A0F" stroke={p.chassis} strokeWidth="1.5" />
              <circle cx="13" cy="31" r="7" fill="#090A0F" stroke={p.chassis} strokeWidth="1.5" />
              <circle cx="29" cy="22" r="7" fill="#090A0F" stroke={p.chassis} strokeWidth="1.5" />
            </g>
          )}
          {p.cameraStyle === 'vertical-rings' && (
            <g transform="translate(12, 12)">
              <circle cx="10" cy="10" r="7.5" fill="#090A0F" stroke={p.chassis} strokeWidth="1.5" />
              <circle cx="10" cy="28" r="7.5" fill="#090A0F" stroke={p.chassis} strokeWidth="1.5" />
              <circle cx="10" cy="46" r="7.5" fill="#090A0F" stroke={p.chassis} strokeWidth="1.5" />
              <circle cx="26" cy="19" r="3.5" fill="#090A0F" stroke={p.chassis} strokeWidth="1" />
            </g>
          )}
          {p.cameraStyle === 'circle-island' && (
            <g transform="translate(44, 38)">
              <circle cx="0" cy="0" r="24" fill="#18181B" stroke={p.chassis} strokeWidth="1.5" />
              <circle cx="-8" cy="-7" r="5.5" fill="#090A0F" stroke={p.chassis} strokeWidth="1" />
              <circle cx="8" cy="-7" r="5.5" fill="#090A0F" stroke={p.chassis} strokeWidth="1" />
              <circle cx="0" cy="9" r="5.5" fill="#090A0F" stroke={p.chassis} strokeWidth="1" />
            </g>
          )}
          {p.cameraStyle === 'halo-ring' && (
            <g transform="translate(10, 10)">
              <rect width="36" height="52" rx="18" fill="#0F172A" stroke={p.chassis} strokeWidth="1.2" />
              <circle cx="18" cy="16" r="8" fill="#090A0F" stroke={p.chassis} strokeWidth="1.2" />
              <circle cx="18" cy="37" r="7" fill="none" stroke="#FDE68A" strokeWidth="2" />
            </g>
          )}
          {p.cameraStyle === 'dual-matrix' && (
            <g transform="translate(10, 10)">
              <rect width="68" height="38" rx="9" fill="#18181B" stroke={p.chassis} strokeWidth="1" />
              <circle cx="16" cy="19" r="8.5" fill="#090A0F" stroke={p.chassis} strokeWidth="1.5" />
              <circle cx="38" cy="19" r="8.5" fill="#090A0F" stroke={p.chassis} strokeWidth="1.5" />
            </g>
          )}
          {p.cameraStyle === 'twin-pro' && (
            <g transform="translate(12, 12)">
              <circle cx="14" cy="14" r="10" fill="#090A0F" stroke={p.chassis} strokeWidth="1.5" />
              <circle cx="14" cy="38" r="10" fill="#090A0F" stroke={p.chassis} strokeWidth="1.5" />
            </g>
          )}
          {p.cameraStyle === 'classic-duo' && (
            <g transform="translate(10, 10)">
              <rect width="34" height="46" rx="10" fill="#1F2937" stroke={p.chassis} strokeWidth="1.2" />
              <circle cx="17" cy="15" r="7.5" fill="#090A0F" stroke={p.chassis} strokeWidth="1.2" />
              <circle cx="17" cy="33" r="7.5" fill="#090A0F" stroke={p.chassis} strokeWidth="1.2" />
            </g>
          )}
        </g>

        <g transform="translate(152, 26) rotate(4)">
          <rect
            x="0"
            y="0"
            width="90"
            height="180"
            rx="16"
            fill="#090A0F"
            stroke={p.chassis}
            strokeWidth="2"
          />
          <rect
            x="4"
            y="4"
            width="82"
            height="172"
            rx="13"
            fill={`url(#screen-${variant}-${brand})`}
          />
          <rect x="33" y="9" width="24" height="6" rx="3" fill="#000000" />
          <path d="M 6 10 L 68 10 L 32 170 L 6 170 Z" fill="#FFFFFF" fillOpacity="0.07" />
          <text
            x="45"
            y="94"
            textAnchor="middle"
            fill="#FFFFFF"
            fillOpacity="0.9"
            fontSize="11"
            fontWeight="600"
            fontFamily="Outfit, sans-serif"
          >
            {brand}
          </text>
          <rect x="30" y="168" width="30" height="2.5" rx="1.2" fill="#FFFFFF" fillOpacity="0.5" />
        </g>
      </svg>
    </div>
  );
};

export const FindPhoneTierRender: React.FC<{
  theme: FindPhoneCategoryItem['visualTheme'];
  title: string;
}> = ({ theme, title }) => {
  const themeColors: Record<
    FindPhoneCategoryItem['visualTheme'],
    { accent: string; sub: string; badge: string }
  > = {
    budget: { accent: '#10B981', sub: '#064E3B', badge: 'EVERYDAY VALUE' },
    midrange: { accent: '#38BDF8', sub: '#0C4A6E', badge: 'BALANCED 5G' },
    premium: { accent: '#F59E0B', sub: '#78350F', badge: 'PREMIUM DESIGN' },
    flagship: { accent: '#E2E8F0', sub: '#334155', badge: 'PRO FLAGSHIP' },
    camera: { accent: '#F43F5E', sub: '#881337', badge: 'PRO OPTICS' },
    gaming: { accent: '#A855F7', sub: '#4C1D95', badge: '120Hz+ PERFORMANCE' },
    fiveg: { accent: '#06B6D4', sub: '#164E63', badge: 'ULTRA-FAST 5G' },
  };
  const c = themeColors[theme];

  return (
    <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-[#13151B] via-[#1B1E26] to-[#0D0F14] flex items-center justify-center overflow-hidden select-none">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 45%, ${c.accent}44, transparent 68%)`,
        }}
      />
      <svg
        viewBox="0 0 320 200"
        className="relative z-10 w-full h-full p-3 transition-transform duration-300 group-hover:scale-105"
        role="img"
        aria-label={`${title} smartphone category illustration`}
      >
        <ellipse cx="160" cy="180" rx="85" ry="8" fill="#000000" fillOpacity="0.55" />

        {theme === 'camera' ? (
          <g transform="translate(105, 16)">
            <rect
              x="0"
              y="0"
              width="110"
              height="156"
              rx="18"
              fill="#1E2028"
              stroke="#E2E8F0"
              strokeWidth="2"
            />
            <circle cx="55" cy="64" r="36" fill="#090A0F" stroke={c.accent} strokeWidth="2" />
            <circle cx="42" cy="52" r="9" fill="#18181B" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="68" cy="52" r="9" fill="#18181B" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="55" cy="76" r="9" fill="#18181B" stroke="#94A3B8" strokeWidth="1.5" />
            <text
              x="55"
              y="134"
              textAnchor="middle"
              fill="#F8FAFC"
              fontSize="9"
              fontWeight="600"
              fontFamily="Outfit, sans-serif"
              letterSpacing="1"
            >
              {c.badge}
            </text>
          </g>
        ) : theme === 'gaming' ? (
          <g transform="translate(55, 42)">
            {/* Landscape Gaming Phone */}
            <rect
              x="0"
              y="0"
              width="210"
              height="104"
              rx="18"
              fill="#090A0F"
              stroke={c.accent}
              strokeWidth="2"
            />
            <rect x="6" y="6" width="198" height="92" rx="14" fill="#181824" />
            <path d="M 30 98 L 90 6 L 130 6 L 70 98 Z" fill={c.accent} fillOpacity="0.16" />
            <circle cx="40" cy="52" r="16" fill="none" stroke={c.accent} strokeOpacity="0.6" strokeWidth="1.5" />
            <circle cx="170" cy="42" r="5" fill={c.accent} fillOpacity="0.8" />
            <circle cx="182" cy="54" r="5" fill="#38BDF8" fillOpacity="0.8" />
            <text
              x="105"
              y="56"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="11"
              fontWeight="700"
              fontFamily="Outfit, sans-serif"
              letterSpacing="1"
            >
              {c.badge}
            </text>
          </g>
        ) : (
          <g transform="translate(112, 16)">
            <rect
              x="0"
              y="0"
              width="96"
              height="158"
              rx="18"
              fill="#090A0F"
              stroke="#CBD5E1"
              strokeWidth="2"
            />
            <rect x="5" y="5" width="86" height="148" rx="14" fill={c.sub} />
            <circle cx="48" cy="68" r="28" fill={c.accent} fillOpacity="0.25" />
            <rect x="34" y="10" width="28" height="6" rx="3" fill="#000000" />
            <text
              x="48"
              y="72"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="9.5"
              fontWeight="700"
              fontFamily="Outfit, sans-serif"
              letterSpacing="0.8"
            >
              {c.badge}
            </text>
            <rect x="32" y="144" width="32" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.6" />
          </g>
        )}
      </svg>
    </div>
  );
};

export const AccessoryStudioRender: React.FC<{
  visualType: SetupAccessoryCategory['visualType'];
  title: string;
}> = ({ visualType, title }) => {
  return (
    <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#16181D] via-[#1F2229] to-[#101216] flex items-center justify-center overflow-hidden select-none">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 40%, rgba(245, 158, 11, 0.2), transparent 65%)',
        }}
      />
      <svg
        viewBox="0 0 280 200"
        className="relative z-10 w-full h-full p-4 transition-transform duration-300 group-hover:scale-105"
        role="img"
        aria-label={`${title} studio illustration`}
      >
        <ellipse cx="140" cy="176" rx="74" ry="8" fill="#000000" fillOpacity="0.45" />

        {visualType === 'cases' && (
          <g transform="translate(88, 22)">
            <rect
              x="0"
              y="0"
              width="76"
              height="146"
              rx="18"
              fill="#27272A"
              stroke="#A1A1AA"
              strokeWidth="2"
            />
            <rect x="8" y="8" width="32" height="34" rx="8" fill="#18181B" stroke="#52525B" strokeWidth="1.5" />
            <circle cx="38" cy="82" r="20" fill="none" stroke="#F59E0B" strokeOpacity="0.65" strokeWidth="2.5" />
            <line x1="38" y1="108" x2="38" y2="122" stroke="#F59E0B" strokeOpacity="0.65" strokeWidth="2.5" strokeLinecap="round" />
            <rect
              x="32"
              y="10"
              width="74"
              height="142"
              rx="18"
              fill="#3F3F46"
              fillOpacity="0.88"
              stroke="#D4D4D8"
              strokeWidth="1.5"
            />
            <rect x="40" y="18" width="30" height="32" rx="7" fill="#18181B" />
            <circle cx="69" cy="88" r="18" fill="none" stroke="#E4E4E7" strokeOpacity="0.45" strokeWidth="2" />
          </g>
        )}

        {visualType === 'tempered' && (
          <g transform="translate(82, 20)">
            {/* Base Phone */}
            <rect
              x="8"
              y="16"
              width="78"
              height="142"
              rx="15"
              fill="#18181B"
              stroke="#71717A"
              strokeWidth="2"
            />
            {/* Floating Tempered Glass Layer */}
            <rect
              x="32"
              y="4"
              width="78"
              height="142"
              rx="15"
              fill="#38BDF8"
              fillOpacity="0.18"
              stroke="#7DD3FC"
              strokeWidth="2"
            />
            <line x1="46" y1="28" x2="94" y2="116" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="64" y1="24" x2="98" y2="86" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}

        {visualType === 'chargers' && (
          <g transform="translate(86, 36)">
            <rect x="18" y="28" width="72" height="84" rx="14" fill="#F4F4F5" stroke="#D4D4D8" strokeWidth="2" />
            <rect x="28" y="38" width="52" height="64" rx="8" fill="#E4E4E7" />
            <rect x="38" y="6" width="6" height="22" rx="3" fill="#A1A1AA" />
            <rect x="64" y="6" width="6" height="22" rx="3" fill="#A1A1AA" />
            <rect x="44" y="82" width="20" height="6" rx="3" fill="#18181B" />
            <text x="54" y="64" textAnchor="middle" fill="#27272A" fontSize="10" fontWeight="700" fontFamily="Outfit, sans-serif">
              FAST PD
            </text>
          </g>
        )}

        {visualType === 'cables' && (
          <g transform="translate(56, 36)">
            <path
              d="M 28 84 C 28 32, 140 32, 140 84 C 140 124, 44 124, 44 84"
              fill="none"
              stroke="#D4D4D8"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 28 84 C 28 32, 140 32, 140 84 C 140 124, 44 124, 44 84"
              fill="none"
              stroke="#71717A"
              strokeWidth="8"
              strokeDasharray="3 5"
              strokeLinecap="round"
            />
            <rect x="16" y="78" width="22" height="30" rx="5" fill="#27272A" stroke="#A1A1AA" strokeWidth="1.5" />
            <rect x="21" y="108" width="12" height="10" rx="2" fill="#F59E0B" />
            <rect x="128" y="78" width="22" height="30" rx="5" fill="#27272A" stroke="#A1A1AA" strokeWidth="1.5" />
            <rect x="133" y="108" width="12" height="10" rx="2" fill="#F59E0B" />
          </g>
        )}

        {visualType === 'tws' && (
          <g transform="translate(76, 30)">
            <rect x="20" y="50" width="88" height="72" rx="26" fill="#F4F4F5" stroke="#D4D4D8" strokeWidth="2" />
            <line x1="22" y1="78" x2="106" y2="78" stroke="#A1A1AA" strokeWidth="1.5" />
            <circle cx="64" cy="92" r="3.5" fill="#10B981" />
            <g transform="translate(26, 12) rotate(-10)">
              <ellipse cx="14" cy="14" rx="14" ry="11" fill="#F4F4F5" stroke="#D4D4D8" strokeWidth="1.5" />
              <rect x="18" y="16" width="7" height="24" rx="3.5" fill="#E4E4E7" />
            </g>
            <g transform="translate(74, 8) rotate(10)">
              <ellipse cx="14" cy="14" rx="14" ry="11" fill="#F4F4F5" stroke="#D4D4D8" strokeWidth="1.5" />
              <rect x="3" y="16" width="7" height="24" rx="3.5" fill="#E4E4E7" />
            </g>
          </g>
        )}

        {visualType === 'earphones' && (
          <g transform="translate(70, 28)">
            {/* Neckband & Wired In-Ear Illustration */}
            <path
              d="M 28 96 C 28 24, 112 24, 112 96"
              fill="none"
              stroke="#A1A1AA"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <rect x="20" y="88" width="14" height="32" rx="7" fill="#27272A" stroke="#E4E4E7" strokeWidth="1.5" />
            <rect x="106" y="88" width="14" height="32" rx="7" fill="#27272A" stroke="#E4E4E7" strokeWidth="1.5" />
            <circle cx="48" cy="128" r="12" fill="#F59E0B" fillOpacity="0.85" />
            <circle cx="92" cy="128" r="12" fill="#F59E0B" fillOpacity="0.85" />
          </g>
        )}

        {visualType === 'powerbanks' && (
          <g transform="translate(88, 22)">
            <rect x="8" y="6" width="88" height="142" rx="16" fill="#18181B" stroke="#71717A" strokeWidth="2" />
            <rect x="18" y="18" width="68" height="38" rx="8" fill="#090A0F" stroke="#27272A" />
            <text x="52" y="42" textAnchor="middle" fill="#F59E0B" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">
              100%
            </text>
            <circle cx="52" cy="96" r="18" fill="none" stroke="#52525B" strokeWidth="2" />
            <path d="M 54 84 L 45 97 L 52 97 L 50 108 L 59 95 L 52 95 Z" fill="#F59E0B" />
          </g>
        )}

        {visualType === 'audio-acc' && (
          <g transform="translate(76, 36)">
            <rect x="14" y="24" width="100" height="76" rx="22" fill="#27272A" stroke="#A1A1AA" strokeWidth="2" />
            <circle cx="44" cy="62" r="20" fill="#18181B" stroke="#F59E0B" strokeWidth="1.5" />
            <circle cx="86" cy="62" r="20" fill="#18181B" stroke="#F59E0B" strokeWidth="1.5" />
            <circle cx="44" cy="62" r="6" fill="#F59E0B" />
            <circle cx="86" cy="62" r="6" fill="#F59E0B" />
          </g>
        )}

        {visualType === 'stands' && (
          <g transform="translate(86, 26)">
            {/* Adjustable Aluminum Desk Stand + Phone */}
            <rect x="20" y="124" width="68" height="10" rx="5" fill="#A1A1AA" />
            <path d="M 42 124 L 62 72 L 70 76 L 52 124 Z" fill="#71717A" />
            <g transform="translate(26, 12) rotate(-14)">
              <rect x="0" y="0" width="54" height="98" rx="10" fill="#18181B" stroke="#E4E4E7" strokeWidth="2" />
              <rect x="4" y="4" width="46" height="90" rx="7" fill="#0F172A" />
            </g>
          </g>
        )}

        {visualType === 'other' && (
          <g transform="translate(76, 30)">
            <rect x="16" y="20" width="54" height="68" rx="8" fill="#27272A" stroke="#F59E0B" strokeWidth="1.8" />
            <text x="43" y="58" textAnchor="middle" fill="#F8FAFC" fontSize="10" fontWeight="700" fontFamily="Outfit, sans-serif">
              128GB
            </text>
            <rect x="82" y="34" width="34" height="44" rx="8" fill="#3F3F46" stroke="#D4D4D8" strokeWidth="1.5" />
            <rect x="92" y="20" width="14" height="14" rx="2" fill="#F59E0B" />
          </g>
        )}
      </svg>
    </div>
  );
};

export const TwsAudioStudioScene: React.FC = () => {
  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-[#12141C] via-[#181C26] to-[#0B0C10] border border-white/10 shadow-2xl flex items-center justify-center p-6 select-none">
      <svg
        viewBox="0 0 640 400"
        className="w-full h-full"
        role="img"
        aria-label="Sound That Goes With You — Studio illustration of TWS earbuds and wireless audio gear"
      >
        <defs>
          <radialGradient id="audioGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0B0C10" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="caseBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="60%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>

        <circle cx="320" cy="200" r="220" fill="url(#audioGlow)" />

        {/* Acoustic Concentric Studio Rings */}
        {[90, 135, 180].map((r) => (
          <circle
            key={r}
            cx="320"
            cy="195"
            r={r}
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.07"
            strokeDasharray="6 8"
          />
        ))}

        {/* Studio Shadow */}
        <ellipse cx="320" cy="348" rx="165" ry="18" fill="#000000" fillOpacity="0.6" />

        {/* Open TWS Charging Case */}
        <g transform="translate(220, 155)">
          {/* Open Lid */}
          <path
            d="M 10 42 C 10 -12, 190 -12, 190 42 Z"
            fill="url(#caseBody)"
            stroke="#CBD5E1"
            strokeWidth="2"
          />
          {/* Main Lower Body */}
          <rect
            x="6"
            y="46"
            width="188"
            height="132"
            rx="48"
            fill="url(#caseBody)"
            stroke="#CBD5E1"
            strokeWidth="2"
          />
          <line x1="12" y1="68" x2="188" y2="68" stroke="#94A3B8" strokeWidth="2" />
          {/* LED Status Indicator */}
          <circle cx="100" cy="112" r="5" fill="#10B981" />
          <text
            x="100"
            y="142"
            textAnchor="middle"
            fill="#475569"
            fontSize="10"
            fontWeight="700"
            fontFamily="Outfit, sans-serif"
            letterSpacing="1.5"
          >
            TWS STUDIO AUDIO
          </text>
        </g>

        {/* Left Floating Pro Earbud */}
        <g transform="translate(155, 68) rotate(-16)">
          <ellipse cx="46" cy="36" rx="34" ry="26" fill="url(#caseBody)" stroke="#CBD5E1" strokeWidth="2" />
          <ellipse cx="22" cy="36" rx="14" ry="18" fill="#18181B" />
          <rect x="52" y="46" width="16" height="58" rx="8" fill="url(#caseBody)" stroke="#CBD5E1" strokeWidth="1.5" />
        </g>

        {/* Right Floating Pro Earbud */}
        <g transform="translate(390, 52) rotate(16)">
          <ellipse cx="46" cy="36" rx="34" ry="26" fill="url(#caseBody)" stroke="#CBD5E1" strokeWidth="2" />
          <ellipse cx="70" cy="36" rx="14" ry="18" fill="#18181B" />
          <rect x="24" y="46" width="16" height="58" rx="8" fill="url(#caseBody)" stroke="#CBD5E1" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
};

export const TemperedGlassStudioScene: React.FC = () => {
  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#090D16] border border-white/10 flex items-center justify-center p-6 select-none">
      <svg
        viewBox="0 0 560 350"
        className="w-full h-full"
        role="img"
        aria-label="Protect Your Screen — Smartphone and Tempered Glass protection layers"
      >
        <ellipse cx="280" cy="312" rx="160" ry="16" fill="#000000" fillOpacity="0.55" />

        {/* Bottom Smartphone Chassis */}
        <g transform="translate(145, 75) rotate(-6)">
          <rect
            x="0"
            y="0"
            width="220"
            height="195"
            rx="24"
            fill="#18181B"
            stroke="#94A3B8"
            strokeWidth="2.5"
          />
          <rect x="8" y="8" width="204" height="179" rx="18" fill="#090D16" />
          <text
            x="110"
            y="105"
            textAnchor="middle"
            fill="#64748B"
            fontSize="12"
            fontWeight="600"
            fontFamily="Outfit, sans-serif"
          >
            ORIGINAL DISPLAY
          </text>
        </g>

        {/* Elevated Tempered Glass Shield Layer */}
        <g transform="translate(195, 34) rotate(-6)">
          <rect
            x="0"
            y="0"
            width="220"
            height="195"
            rx="24"
            fill="#38BDF8"
            fillOpacity="0.18"
            stroke="#7DD3FC"
            strokeWidth="2.5"
          />
          <rect
            x="6"
            y="6"
            width="208"
            height="183"
            rx="20"
            fill="none"
            stroke="#0284C7"
            strokeOpacity="0.5"
            strokeWidth="4"
          />
          <line
            x1="34"
            y1="26"
            x2="145"
            y2="165"
            stroke="#FFFFFF"
            strokeOpacity="0.6"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="78"
            y1="24"
            x2="175"
            y2="145"
            stroke="#FFFFFF"
            strokeOpacity="0.35"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <text
            x="110"
            y="102"
            textAnchor="middle"
            fill="#F8FAFC"
            fontSize="13"
            fontWeight="700"
            fontFamily="Outfit, sans-serif"
            letterSpacing="1"
          >
            9H TEMPERED GLASS
          </text>
        </g>
      </svg>
    </div>
  );
};

export const CompleteEcosystemScene: React.FC = () => {
  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#12141C] border border-white/15 shadow-2xl flex items-center justify-center p-4 select-none">
      <svg
        viewBox="0 0 760 460"
        className="w-full h-full"
        role="img"
        aria-label="Everything Your Phone Needs — Smartphone surrounded by TWS earbuds, charger, cable, case, tempered glass, and power bank"
      >
        <defs>
          <radialGradient id="ecoCenterGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.22" />
            <stop offset="65%" stopColor="#38BDF8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#12141C" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="380" cy="230" r="240" fill="url(#ecoCenterGlow)" />

        {/* Orbital Connection Lines */}
        <ellipse
          cx="380"
          cy="230"
          rx="255"
          ry="155"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.12"
          strokeDasharray="5 7"
        />

        {/* Centerpiece Smartphone */}
        <g transform="translate(318, 95)">
          <rect
            x="0"
            y="0"
            width="124"
            height="254"
            rx="24"
            fill="#18181B"
            stroke="#E2E8F0"
            strokeWidth="2.5"
          />
          <rect x="6" y="6" width="112" height="242" rx="19" fill="#090D16" />
          <circle cx="62" cy="118" r="38" fill="#F59E0B" fillOpacity="0.22" />
          <rect x="44" y="14" width="36" height="8" rx="4" fill="#000000" />
          <text
            x="62"
            y="115"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="11"
            fontWeight="700"
            fontFamily="Outfit, sans-serif"
          >
            SMARTPHONES
          </text>
          <text
            x="62"
            y="132"
            textAnchor="middle"
            fill="#F59E0B"
            fontSize="9"
            fontWeight="600"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            ALL MAJOR BRANDS
          </text>
        </g>

        {/* Satellite 1 (Top Left): TWS Earbuds */}
        <g transform="translate(88, 52)">
          <rect x="0" y="0" width="138" height="86" rx="16" fill="#1B1F2A" stroke="#FFFFFF" strokeOpacity="0.18" />
          <circle cx="42" cy="43" r="18" fill="#F4F4F5" />
          <circle cx="62" cy="43" r="4" fill="#10B981" />
          <text x="82" y="40" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="Outfit, sans-serif">
            TWS Buds
          </text>
          <text x="82" y="55" fill="#94A3B8" fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif">
            &amp; Audio
          </text>
        </g>

        {/* Satellite 2 (Middle Left): Protective Case */}
        <g transform="translate(52, 188)">
          <rect x="0" y="0" width="144" height="86" rx="16" fill="#1B1F2A" stroke="#FFFFFF" strokeOpacity="0.18" />
          <rect x="18" y="16" width="32" height="54" rx="7" fill="#27272A" stroke="#F59E0B" strokeWidth="1.5" />
          <circle cx="34" cy="43" r="9" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
          <text x="64" y="40" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="Outfit, sans-serif">
            Phone Cases
          </text>
          <text x="64" y="55" fill="#94A3B8" fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif">
            Covers &amp; Grip
          </text>
        </g>

        {/* Satellite 3 (Bottom Left): Tempered Glass */}
        <g transform="translate(92, 322)">
          <rect x="0" y="0" width="148" height="86" rx="16" fill="#1B1F2A" stroke="#FFFFFF" strokeOpacity="0.18" />
          <rect
            x="18"
            y="16"
            width="32"
            height="54"
            rx="7"
            fill="#38BDF8"
            fillOpacity="0.22"
            stroke="#7DD3FC"
            strokeWidth="1.5"
          />
          <text x="62" y="40" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="Outfit, sans-serif">
            Screen Guard
          </text>
          <text x="62" y="55" fill="#94A3B8" fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif">
            Tempered Glass
          </text>
        </g>

        {/* Satellite 4 (Top Right): Fast Charger */}
        <g transform="translate(534, 52)">
          <rect x="0" y="0" width="144" height="86" rx="16" fill="#1B1F2A" stroke="#FFFFFF" strokeOpacity="0.18" />
          <rect x="18" y="24" width="32" height="42" rx="6" fill="#F4F4F5" />
          <rect x="25" y="14" width="4" height="10" fill="#A1A1AA" />
          <rect x="39" y="14" width="4" height="10" fill="#A1A1AA" />
          <text x="62" y="40" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="Outfit, sans-serif">
            Fast Chargers
          </text>
          <text x="62" y="55" fill="#94A3B8" fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif">
            Wall Adapters
          </text>
        </g>

        {/* Satellite 5 (Middle Right): USB-C Cable */}
        <g transform="translate(562, 188)">
          <rect x="0" y="0" width="146" height="86" rx="16" fill="#1B1F2A" stroke="#FFFFFF" strokeOpacity="0.18" />
          <circle cx="34" cy="43" r="16" fill="none" stroke="#E4E4E7" strokeWidth="3" />
          <rect x="28" y="56" width="12" height="12" rx="2" fill="#F59E0B" />
          <text x="62" y="40" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="Outfit, sans-serif">
            USB Cables
          </text>
          <text x="62" y="55" fill="#94A3B8" fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif">
            Type-C &amp; Data
          </text>
        </g>

        {/* Satellite 6 (Bottom Right): Power Bank */}
        <g transform="translate(524, 322)">
          <rect x="0" y="0" width="148" height="86" rx="16" fill="#1B1F2A" stroke="#FFFFFF" strokeOpacity="0.18" />
          <rect x="18" y="16" width="32" height="54" rx="6" fill="#090A0F" stroke="#F59E0B" strokeWidth="1.5" />
          <text x="34" y="47" textAnchor="middle" fill="#F59E0B" fontSize="8" fontWeight="700" fontFamily="JetBrains Mono, monospace">
            100%
          </text>
          <text x="62" y="40" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="Outfit, sans-serif">
            Power Banks
          </text>
          <text x="62" y="55" fill="#94A3B8" fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif">
            Portable Power
          </text>
        </g>
      </svg>
    </div>
  );
};

export const ShowroomArchitecturalScene: React.FC = () => {
  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#121318] border border-white/10 shadow-2xl select-none">
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full object-cover"
        role="img"
        aria-label="Modern mobile showroom interior illustration for Friends Cell Point in Vissannapeta"
      >
        <defs>
          <linearGradient id="ceilingWarm" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#16181E" />
            <stop offset="100%" stopColor="#23252E" />
          </linearGradient>
          <linearGradient id="floorReflect" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1B1D24" />
            <stop offset="100%" stopColor="#0D0E12" />
          </linearGradient>
          <linearGradient id="woodTable" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9A6B3E" />
            <stop offset="50%" stopColor="#7C522B" />
            <stop offset="100%" stopColor="#58381C" />
          </linearGradient>
          <radialGradient id="spotGlow" cx="50%" cy="0%" r="75%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="800" height="330" fill="url(#ceilingWarm)" />
        <rect y="330" width="800" height="170" fill="url(#floorReflect)" />

        {[160, 400, 640].map((cx) => (
          <g key={cx}>
            <ellipse cx={cx} cy="34" rx="48" ry="8" fill="#FEF3C7" />
            <ellipse cx={cx} cy="190" rx="160" ry="180" fill="url(#spotGlow)" />
          </g>
        ))}

        <rect x="64" y="88" width="190" height="220" rx="8" fill="#181A20" stroke="#F59E0B" strokeOpacity="0.35" strokeWidth="1.5" />
        <rect x="280" y="88" width="240" height="220" rx="8" fill="#14161B" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="1.5" />
        <rect x="546" y="88" width="190" height="220" rx="8" fill="#181A20" stroke="#F59E0B" strokeOpacity="0.35" strokeWidth="1.5" />

        <text
          x="400"
          y="142"
          textAnchor="middle"
          fill="#F8FAFC"
          fontSize="20"
          fontWeight="700"
          fontFamily="Outfit, sans-serif"
          letterSpacing="2"
        >
          FRIENDS CELL POINT
        </text>
        <text
          x="400"
          y="166"
          textAnchor="middle"
          fill="#F59E0B"
          fontSize="11"
          fontWeight="500"
          fontFamily="Plus Jakarta Sans, sans-serif"
          letterSpacing="1.5"
        >
          MOBILES • TWS • COVERS • CHARGERS
        </text>

        {[125, 175, 225, 270].map((sy) => (
          <g key={sy}>
            <line x1="84" y1={sy} x2="234" y2={sy} stroke="#52525B" strokeWidth="2" />
            <rect x="96" y={sy - 26} width="16" height="24" rx="3" fill="#3F3F46" />
            <rect x="122" y={sy - 26} width="16" height="24" rx="3" fill="#71717A" />
            <rect x="152" y={sy - 26} width="16" height="24" rx="3" fill="#D97706" fillOpacity="0.7" />
            <rect x="182" y={sy - 26} width="16" height="24" rx="3" fill="#3F3F46" />
            <rect x="208" y={sy - 26} width="16" height="24" rx="3" fill="#52525B" />

            <line x1="566" y1={sy} x2="716" y2={sy} stroke="#52525B" strokeWidth="2" />
            <rect x="578" y={sy - 26} width="18" height="24" rx="3" fill="#52525B" />
            <rect x="606" y={sy - 26} width="18" height="24" rx="3" fill="#3F3F46" />
            <rect x="636" y={sy - 26} width="18" height="24" rx="3" fill="#A1A1AA" />
            <rect x="666" y={sy - 26} width="18" height="24" rx="3" fill="#D97706" fillOpacity="0.7" />
          </g>
        ))}

        <polygon points="180,310 620,310 680,355 120,355" fill="url(#woodTable)" />
        <rect x="120" y="355" width="560" height="18" fill="#462C15" />
        <rect x="165" y="373" width="24" height="82" fill="#27272A" />
        <rect x="611" y="373" width="24" height="82" fill="#27272A" />

        {[210, 285, 360, 435, 510, 585].map((px, idx) => (
          <g key={px} transform={`translate(${px}, 282)`}>
            <ellipse cx="0" cy="46" rx="16" ry="5" fill="#18181B" />
            <line x1="0" y1="22" x2="0" y2="46" stroke="#A1A1AA" strokeWidth="2.5" />
            <rect
              x="-14"
              y="0"
              width="28"
              height="38"
              rx="5"
              fill={idx % 2 === 0 ? '#0F172A' : '#1E1B4B'}
              stroke="#E2E8F0"
              strokeWidth="1.5"
            />
            <rect
              x="-11"
              y="3"
              width="22"
              height="32"
              rx="3"
              fill={idx % 2 === 0 ? '#38BDF8' : '#F59E0B'}
              fillOpacity="0.35"
            />
          </g>
        ))}

        <ellipse cx="400" cy="462" rx="280" ry="18" fill="#F59E0B" fillOpacity="0.08" />
      </svg>
    </div>
  );
};
