import React, { useState, useEffect } from 'react';
import { Smartphone, ArrowUpRight } from 'lucide-react';

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
 * Displays the exact product photo using `object-contain` on a clean studio background
 * so the phone/accessory shape, camera layout, colour, display design, brand logo, and
 * proportions are preserved without stretching or cropping.
 *
 * When an exact product photo is not yet available, it displays a clean
 * "Photo Coming Soon" placeholder without substituting AI or price-list images.
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
      ? 'bg-gradient-to-b from-[#F5F6FA] to-[#ECEEF4] border-b border-zinc-200/80 text-zinc-800'
      : 'bg-gradient-to-b from-[#151924] to-[#0E1017] border-b border-white/10 text-zinc-200';

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
      {/* Top Brand Header */}
      <div className="w-full flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
        <span className={theme === 'light' ? 'text-zinc-500 truncate' : 'text-amber-400/90 truncate'}>
          {brandLabel || 'Friends Cell Point'}
        </span>
        {angleLabel && (
          <span
            className={`px-2 py-0.5 rounded ${
              theme === 'light'
                ? 'bg-zinc-200/80 text-zinc-700'
                : 'bg-white/10 text-zinc-300'
            }`}
          >
            {angleLabel}
          </span>
        )}
      </div>

      {/* Center Clean "Product Image Unavailable" Placeholder */}
      <div className="my-auto flex flex-col items-center max-w-[220px]">
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center border mb-2.5 ${
            theme === 'light'
              ? 'bg-white border-zinc-200/90 text-zinc-500 shadow-xs'
              : 'bg-[#0B0C0E] border-white/10 text-amber-400/80'
          }`}
        >
          <Smartphone className="w-5 h-5" />
        </div>
        <p
          className={`text-xs font-bold tracking-wide ${
            theme === 'light' ? 'text-zinc-800' : 'text-zinc-100'
          }`}
        >
          Product Image Unavailable
        </p>
        {modelOrCategoryLabel && (
          <p
            className={`mt-0.5 text-[11px] font-medium truncate max-w-full ${
              theme === 'light' ? 'text-zinc-500' : 'text-zinc-400'
            }`}
          >
            {modelOrCategoryLabel}
          </p>
        )}
      </div>

      {/* Bottom Action Hint */}
      <div className="w-full pt-2 border-t border-current/10 flex items-center justify-center gap-1 text-[11px] font-semibold">
        {showViewDetailsHint ? (
          <span
            className={`inline-flex items-center gap-1 ${
              theme === 'light' ? 'text-amber-700' : 'text-amber-400'
            }`}
          >
            <span>View Model Details</span>
            <ArrowUpRight className="w-3 h-3" />
          </span>
        ) : (
          <span className={theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}>
            Product Photo
          </span>
        )}
      </div>
    </div>
  );
};
