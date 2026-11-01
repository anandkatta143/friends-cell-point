import React, { useState, useEffect } from 'react';
import { ImageOff, ArrowUpRight } from 'lucide-react';

interface OriginalProductImageFrameProps {
  imageSrc?: string | null;
  altText: string;
  brandLabel?: string;
  modelOrCategoryLabel?: string;
  angleLabel?: string;
  theme?: 'light' | 'dark';
  eager?: boolean;
  showViewDetailsHint?: boolean;
  className?: string;
}

/**
 * Displays ONLY the exact real online product reference image or uploaded product photo
 * using `object-contain` on a clean studio background so the phone/accessory shape,
 * camera layout, colour, display design, brand logo, and proportions are preserved
 * without stretching or cropping.
 *
 * If the exact model image cannot be found or fails to load, it strictly avoids
 * substituting a similar phone or AI image and displays "Product image unavailable".
 */
export const OriginalProductImageFrame: React.FC<OriginalProductImageFrameProps> = ({
  imageSrc,
  altText,
  brandLabel,
  modelOrCategoryLabel,
  angleLabel,
  theme = 'light',
  eager = false,
  showViewDetailsHint = true,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [imageSrc]);

  const trimmedSrc = imageSrc?.trim() || '';
  const hasValidImage = Boolean(trimmedSrc.length > 0 && !imgError);

  const fallbackBg =
    theme === 'light'
      ? 'bg-[#F3F4F7] border-b border-zinc-200/80 text-zinc-800'
      : 'bg-[#12151E] border-b border-white/10 text-zinc-200';

  if (hasValidImage) {
    return (
      <div
        className={`relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden bg-white border-b ${
          theme === 'light' ? 'border-zinc-200/80' : 'border-white/10'
        } ${className}`}
      >
        <img
          src={trimmedSrc}
          alt={altText}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-contain p-3 sm:p-4 select-none transition-transform duration-200 group-hover:scale-[1.03]"
        />
        {angleLabel && (
          <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-zinc-950/80 text-[10px] font-semibold text-white">
            {angleLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative w-full aspect-[4/3] p-4 flex flex-col items-center justify-between text-center select-none ${fallbackBg} ${className}`}
    >
      {/* Top Brand / Angle Metadata */}
      <div className="w-full flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-wider">
        <span className={theme === 'light' ? 'text-zinc-500 truncate' : 'text-zinc-400 truncate'}>
          {brandLabel || 'Friends Cell Point'}
        </span>
        {angleLabel && (
          <span
            className={`px-2 py-0.5 rounded ${
              theme === 'light'
                ? 'bg-zinc-200/80 text-zinc-700'
                : 'bg-white/10 text-amber-300'
            }`}
          >
            {angleLabel}
          </span>
        )}
      </div>

      {/* Center Neutral "Product image unavailable" Notice (No AI or Similar-Phone Substitute) */}
      <div className="my-auto flex flex-col items-center max-w-[220px]">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-2 ${
            theme === 'light'
              ? 'bg-white border-zinc-200 text-zinc-400 shadow-2xs'
              : 'bg-[#0B0C0E] border-white/10 text-zinc-500'
          }`}
        >
          <ImageOff className="w-4 h-4" />
        </div>
        <p
          className={`text-xs font-semibold leading-snug ${
            theme === 'light' ? 'text-zinc-800' : 'text-zinc-200'
          }`}
        >
          Image unavailable
        </p>
        {modelOrCategoryLabel && (
          <p
            className={`mt-0.5 text-[11px] truncate max-w-full ${
              theme === 'light' ? 'text-zinc-500' : 'text-zinc-400'
            }`}
          >
            {modelOrCategoryLabel}
          </p>
        )}
      </div>

      {/* Bottom "View product details" Prompt */}
      <div className="w-full pt-2 border-t border-current/10 flex items-center justify-center gap-1 text-[11px] font-semibold">
        {showViewDetailsHint ? (
          <span
            className={`inline-flex items-center gap-1 ${
              theme === 'light' ? 'text-amber-700' : 'text-amber-400'
            }`}
          >
            <span>View product details</span>
            <ArrowUpRight className="w-3 h-3" />
          </span>
        ) : (
          <span className={theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}>
            Exact Model Reference Slot
          </span>
        )}
      </div>
    </div>
  );
};
