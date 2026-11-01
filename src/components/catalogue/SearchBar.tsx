import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowUpRight, Smartphone, Layers, Cpu, Headphones } from 'lucide-react';
import {
  BrandDirectoryEntry,
  SmartphoneProduct,
  SearchSuggestionItem,
  AccessoryCategoryName,
  getInstantSearchSuggestions,
} from '../../utils/storeLogic';

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
  brands: BrandDirectoryEntry[];
  catalogue: SmartphoneProduct[];
  onSelectBrandSuggestion: (brandName: string) => void;
  onSelectProductSuggestion: (product: SmartphoneProduct) => void;
  onSelectAccessorySuggestion?: (category: AccessoryCategoryName) => void;
  onSubmitSearch?: (queryText?: string) => void;
  variant?: 'hero' | 'catalogue';
  inputId?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  brands,
  catalogue,
  onSelectBrandSuggestion,
  onSelectProductSuggestion,
  onSelectAccessorySuggestion,
  onSubmitSearch,
  variant = 'catalogue',
  inputId = 'global-smart-search',
}) => {
  const [localInput, setLocalInput] = useState(value);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalInput(value);
  }, [value]);

  // Debounced search update for performance with large catalogues
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localInput !== value) {
        onChange(localInput);
      }
    }, 120);
    return () => clearTimeout(timer);
  }, [localInput, value, onChange]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const suggestions = getInstantSearchSuggestions(localInput, brands, catalogue, 8);

  const handlePickSuggestion = (sug: SearchSuggestionItem) => {
    setFocused(false);
    if (sug.type === 'model' && sug.product) {
      onSelectProductSuggestion(sug.product);
      return;
    }
    if (sug.type === 'brand' && sug.brandName) {
      setLocalInput('');
      onChange('');
      onSelectBrandSuggestion(sug.brandName);
      return;
    }
    if (sug.type === 'accessory' && sug.accessoryCategory && onSelectAccessorySuggestion) {
      setLocalInput('');
      onChange('');
      onSelectAccessorySuggestion(sug.accessoryCategory);
      return;
    }
    setLocalInput(sug.queryValue);
    onChange(sug.queryValue);
    if (onSubmitSearch) onSubmitSearch(sug.queryValue);
  };

  const isHero = variant === 'hero';

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <label htmlFor={inputId} className="sr-only">
            Search mobiles, brands, models or accessories
          </label>
          <Search
            className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
              isHero ? 'text-zinc-400' : 'text-zinc-500'
            }`}
          />
          <input
            id={inputId}
            type="search"
            value={localInput}
            onFocus={() => setFocused(true)}
            onChange={(e) => {
              setLocalInput(e.target.value);
              setFocused(true);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && onSubmitSearch) {
                setFocused(false);
                onSubmitSearch(localInput);
              }
            }}
            placeholder="Search mobiles, brands, models or accessories..."
            className={`w-full pl-10 pr-9 py-3 rounded-xl text-xs sm:text-sm focus:outline-none transition-colors ${
              isHero
                ? 'bg-[#0B0C0E] border border-white/15 text-white placeholder:text-zinc-500 focus:border-amber-400'
                : 'bg-[#F8F8FA] border border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900'
            }`}
          />
          {localInput && (
            <button
              type="button"
              onClick={() => {
                setLocalInput('');
                onChange('');
              }}
              aria-label="Clear search query"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-zinc-400 hover:text-amber-500 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {isHero && (
          <button
            type="button"
            onClick={() => {
              setFocused(false);
              if (onSubmitSearch) onSubmitSearch(localInput);
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Search Catalogue
            <ArrowUpRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Instant Smart Search Suggestions Dropdown */}
      {focused && suggestions.length > 0 && (
        <div
          role="listbox"
          aria-label="Instant search suggestions"
          className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl bg-[#12151E] border border-white/15 shadow-2xl overflow-hidden text-left"
        >
          <div className="px-3.5 py-2 bg-[#0B0C0E] border-b border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
            <span>
              {localInput.trim()
                ? `Instant matches for "${localInput.trim()}"`
                : 'Suggested searches (Mobiles, Brands, Models & Accessories)'}
            </span>
            <span className="text-amber-400 font-semibold">Click to open</span>
          </div>

          <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
            {suggestions.map((sug) => (
              <button
                key={sug.id}
                type="button"
                onClick={() => handlePickSuggestion(sug)}
                className="w-full px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-white/[0.06] transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
                    {sug.type === 'model' ? (
                      <Smartphone className="w-3.5 h-3.5" />
                    ) : sug.type === 'accessory' ? (
                      <Headphones className="w-3.5 h-3.5" />
                    ) : sug.type === 'spec' ? (
                      <Cpu className="w-3.5 h-3.5" />
                    ) : (
                      <Layers className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-white truncate">
                      {sug.label}
                    </p>
                    <p className="text-[11px] text-zinc-400 truncate">{sug.sublabel}</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-amber-400 shrink-0">
                  {sug.type === 'model'
                    ? 'View Model'
                    : sug.type === 'brand'
                      ? 'Open Brand'
                      : sug.type === 'accessory'
                        ? 'Open Accessories'
                        : 'Filter'}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
