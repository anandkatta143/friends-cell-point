import React from 'react';
import { ChevronRight } from 'lucide-react';
import { BrandDirectoryEntry } from '../../utils/storeLogic';

interface BrandCardProps {
  brand: BrandDirectoryEntry;
  modelCount: number;
  isSelected: boolean;
  onSelectBrand: (brandName: string) => void;
}

export const BrandCard: React.FC<BrandCardProps> = ({
  brand,
  modelCount,
  isSelected,
  onSelectBrand,
}) => {
  return (
    <div
      onClick={() => onSelectBrand(brand.name)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectBrand(brand.name);
        }
      }}
      className={`group p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-lg'
          : 'bg-[#171A22] hover:bg-[#1D212B] text-white border-white/10 hover:border-amber-500/40'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          {/* Clean Brand Monogram Representation */}
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-display text-xs font-bold tracking-wider border ${
              isSelected
                ? 'bg-zinc-950 text-amber-400 border-zinc-900'
                : 'bg-[#0B0C0E] text-amber-400 border-white/10 group-hover:border-amber-400/40'
            }`}
          >
            {brand.monogram || brand.name.slice(0, 2).toUpperCase()}
          </div>

          {modelCount > 0 && (
            <span
              className={`text-[11px] font-mono-num font-semibold px-2 py-0.5 rounded-md ${
                isSelected
                  ? 'bg-zinc-950/15 text-zinc-950'
                  : 'bg-white/5 text-zinc-300'
              }`}
            >
              {modelCount} {modelCount === 1 ? 'Model' : 'Models'}
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-base sm:text-lg font-bold tracking-tight truncate">
          {brand.name}
        </h3>
        <p
          className={`mt-1 text-[11px] leading-snug line-clamp-2 ${
            isSelected ? 'text-zinc-900 font-medium' : 'text-zinc-400'
          }`}
        >
          {brand.originNote}
        </p>
      </div>

      <div
        className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-semibold ${
          isSelected
            ? 'border-zinc-950/15 text-zinc-950'
            : 'border-white/10 text-amber-400 group-hover:text-amber-300'
        }`}
      >
        <span>View Models</span>
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </div>
  );
};
