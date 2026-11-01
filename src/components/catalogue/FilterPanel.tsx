import React from 'react';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import {
  AdvancedMobileFilterState,
  BrandDirectoryEntry,
  SortOption,
} from '../../utils/storeLogic';

interface FilterPanelProps {
  filters: AdvancedMobileFilterState;
  brands: BrandDirectoryEntry[];
  matchingCount: number;
  mobileDrawerOpen: boolean;
  onCloseMobileDrawer: () => void;
  onUpdateFilters: (updater: (prev: AdvancedMobileFilterState) => AdvancedMobileFilterState) => void;
  onResetFilters: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  brands,
  matchingCount,
  mobileDrawerOpen,
  onCloseMobileDrawer,
  onUpdateFilters,
  onResetFilters,
}) => {
  const renderFilterControls = () => (
    <div className="space-y-4">
      {/* 1. Brand Filter */}
      <div>
        <label htmlFor="fp-brand" className="block text-xs font-semibold text-zinc-800 mb-1.5">
          Brand
        </label>
        <select
          id="fp-brand"
          aria-label="Filter by Brand"
          value={filters.brand}
          onChange={(e) =>
            onUpdateFilters((prev) => ({ ...prev, brand: e.target.value, series: 'All' }))
          }
          className="w-full px-3 py-2 rounded-xl bg-[#F8F8FA] border border-zinc-300 text-xs font-medium text-zinc-900"
        >
          <option value="All">All Brands ({brands.length})</option>
          {brands.map((b) => (
            <option key={b.id} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Price Tier Filter */}
      <div>
        <label htmlFor="fp-price" className="block text-xs font-semibold text-zinc-800 mb-1.5">
          Price Segment
        </label>
        <select
          id="fp-price"
          aria-label="Filter by Price"
          value={filters.priceRange}
          onChange={(e) =>
            onUpdateFilters((prev) => ({
              ...prev,
              priceRange: e.target.value as AdvancedMobileFilterState['priceRange'],
            }))
          }
          className="w-full px-3 py-2 rounded-xl bg-[#F8F8FA] border border-zinc-300 text-xs font-medium text-zinc-900"
        >
          <option value="All">All Price Tiers (Check Price)</option>
          <option value="Budget">Budget Phones</option>
          <option value="Mid-Range">Mid-Range Phones</option>
          <option value="Premium">Premium Phones</option>
          <option value="Flagship">Flagship Phones</option>
        </select>
      </div>

      {/* 3. RAM Filter */}
      <div>
        <label htmlFor="fp-ram" className="block text-xs font-semibold text-zinc-800 mb-1.5">
          RAM
        </label>
        <select
          id="fp-ram"
          aria-label="Filter by RAM"
          value={filters.ram}
          onChange={(e) => onUpdateFilters((prev) => ({ ...prev, ram: e.target.value }))}
          className="w-full px-3 py-2 rounded-xl bg-[#F8F8FA] border border-zinc-300 text-xs font-medium text-zinc-900"
        >
          <option value="All">Any RAM</option>
          <option value="6GB">6GB RAM</option>
          <option value="8GB">8GB RAM</option>
          <option value="12GB">12GB RAM</option>
          <option value="16GB">16GB RAM</option>
        </select>
      </div>

      {/* 4. Storage Filter */}
      <div>
        <label htmlFor="fp-storage" className="block text-xs font-semibold text-zinc-800 mb-1.5">
          Storage
        </label>
        <select
          id="fp-storage"
          aria-label="Filter by Storage"
          value={filters.storage}
          onChange={(e) => onUpdateFilters((prev) => ({ ...prev, storage: e.target.value }))}
          className="w-full px-3 py-2 rounded-xl bg-[#F8F8FA] border border-zinc-300 text-xs font-medium text-zinc-900"
        >
          <option value="All">Any Storage</option>
          <option value="128GB">128GB</option>
          <option value="256GB">256GB</option>
          <option value="512GB">512GB</option>
          <option value="1TB">1TB</option>
        </select>
      </div>

      {/* 5. 5G Network Filter */}
      <div>
        <label htmlFor="fp-5g" className="block text-xs font-semibold text-zinc-800 mb-1.5">
          5G / Network
        </label>
        <select
          id="fp-5g"
          aria-label="Filter by 5G Network"
          value={filters.network5G}
          onChange={(e) =>
            onUpdateFilters((prev) => ({
              ...prev,
              network5G: e.target.value as AdvancedMobileFilterState['network5G'],
            }))
          }
          className="w-full px-3 py-2 rounded-xl bg-[#F8F8FA] border border-zinc-300 text-xs font-medium text-zinc-900"
        >
          <option value="All">5G &amp; 4G Smartphones</option>
          <option value="5G">5G Ready Only</option>
          <option value="4G">4G / Keypad Phones</option>
        </select>
      </div>

      {/* 6. Camera Filter */}
      <div>
        <label htmlFor="fp-camera" className="block text-xs font-semibold text-zinc-800 mb-1.5">
          Camera Setup
        </label>
        <select
          id="fp-camera"
          aria-label="Filter by Camera"
          value={filters.camera}
          onChange={(e) => onUpdateFilters((prev) => ({ ...prev, camera: e.target.value }))}
          className="w-full px-3 py-2 rounded-xl bg-[#F8F8FA] border border-zinc-300 text-xs font-medium text-zinc-900"
        >
          <option value="All">All Camera Systems</option>
          <option value="Pro Camera">Pro Camera System</option>
          <option value="Multi-Camera">Multi-Camera Setup</option>
        </select>
      </div>

      {/* 7. Battery Filter */}
      <div>
        <label htmlFor="fp-battery" className="block text-xs font-semibold text-zinc-800 mb-1.5">
          Battery Class
        </label>
        <select
          id="fp-battery"
          aria-label="Filter by Battery"
          value={filters.battery}
          onChange={(e) => onUpdateFilters((prev) => ({ ...prev, battery: e.target.value }))}
          className="w-full px-3 py-2 rounded-xl bg-[#F8F8FA] border border-zinc-300 text-xs font-medium text-zinc-900"
        >
          <option value="All">All Battery Types</option>
          <option value="High-Capacity">High-Capacity Battery</option>
          <option value="All-Day">All-Day Battery</option>
        </select>
      </div>

      {/* 8. Screen Size Filter */}
      <div>
        <label htmlFor="fp-screen" className="block text-xs font-semibold text-zinc-800 mb-1.5">
          Screen Size
        </label>
        <select
          id="fp-screen"
          aria-label="Filter by Screen Size"
          value={filters.screenSize}
          onChange={(e) => onUpdateFilters((prev) => ({ ...prev, screenSize: e.target.value }))}
          className="w-full px-3 py-2 rounded-xl bg-[#F8F8FA] border border-zinc-300 text-xs font-medium text-zinc-900"
        >
          <option value="All">All Screen Sizes</option>
          <option value="Compact">Compact Display</option>
          <option value="Standard">Standard 6.5&quot;+ Display</option>
          <option value="Large">Large 6.7&quot;+ Display</option>
          <option value="Foldable">Foldable Display</option>
        </select>
      </div>

      {/* 9. Operating System Filter */}
      <div>
        <label htmlFor="fp-os" className="block text-xs font-semibold text-zinc-800 mb-1.5">
          Operating System
        </label>
        <select
          id="fp-os"
          aria-label="Filter by Operating System"
          value={filters.os}
          onChange={(e) => onUpdateFilters((prev) => ({ ...prev, os: e.target.value }))}
          className="w-full px-3 py-2 rounded-xl bg-[#F8F8FA] border border-zinc-300 text-xs font-medium text-zinc-900"
        >
          <option value="All">Android &amp; iOS</option>
          <option value="Android">Android</option>
          <option value="iOS">iOS (Apple)</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP LEFT-SIDE FILTER PANEL */}
      <aside
        aria-label="Desktop Smartphone Filters"
        className="hidden lg:block w-64 xl:w-72 shrink-0"
      >
        <div className="sticky top-20 p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-sm">
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-600" />
              <h3 className="font-display text-sm font-bold text-zinc-950">Filters</h3>
            </div>
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-900 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {renderFilterControls()}

          <div className="mt-5 pt-3.5 border-t border-zinc-100 text-xs text-zinc-500 flex items-center justify-between">
            <span>Matching phones:</span>
            <strong className="text-zinc-950 font-mono-num">{matchingCount}</strong>
          </div>
        </div>
      </aside>

      {/* MOBILE BOTTOM-SHEET / DRAWER ("FILTER & SORT") */}
      {mobileDrawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Filter and Sort Drawer"
        >
          <div className="w-full max-h-[85vh] rounded-t-3xl bg-white text-zinc-900 shadow-2xl flex flex-col overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-bold text-zinc-950">
                  Filter &amp; Sort Mobiles
                </h3>
                <p className="text-xs text-zinc-500">{matchingCount} models matching</p>
              </div>
              <button
                type="button"
                onClick={onCloseMobileDrawer}
                aria-label="Close filter drawer"
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              {/* Mobile Sort Option */}
              <div>
                <label
                  htmlFor="fp-mobile-sort"
                  className="block text-xs font-semibold text-zinc-800 mb-1.5"
                >
                  Sort By
                </label>
                <select
                  id="fp-mobile-sort"
                  value={filters.sortBy}
                  onChange={(e) =>
                    onUpdateFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value as SortOption,
                    }))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F8FA] border border-zinc-300 text-xs font-semibold text-zinc-900"
                >
                  <option value="popular">Popular</option>
                  <option value="newest">Newest</option>
                  <option value="brand-asc">Brand A–Z</option>
                  <option value="price-asc">Price Low to High</option>
                  <option value="price-desc">Price High to Low</option>
                </select>
              </div>

              {renderFilterControls()}
            </div>

            <div className="p-4 border-t border-zinc-200 bg-zinc-50 flex items-center gap-3">
              <button
                type="button"
                onClick={onResetFilters}
                className="flex-1 py-3 rounded-xl border border-zinc-300 bg-white text-xs font-semibold text-zinc-800 cursor-pointer"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={onCloseMobileDrawer}
                className="flex-1 py-3 rounded-xl bg-amber-500 text-zinc-950 text-xs font-bold cursor-pointer"
              >
                Show {matchingCount} Phones
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
