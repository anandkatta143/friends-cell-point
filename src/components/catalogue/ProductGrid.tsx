import React from 'react';
import { SmartphoneProduct, STORE_INFO } from '../../utils/storeLogic';
import { ProductCard } from './ProductCard';
import { WhatsAppButton } from './WhatsAppButton';

interface ProductGridProps {
  products: SmartphoneProduct[];
  totalCount: number;
  visibleCount: number;
  compareList: SmartphoneProduct[];
  searchQuery: string;
  onViewDetails: (phone: SmartphoneProduct) => void;
  onToggleCompare: (phone: SmartphoneProduct) => void;
  onLoadMore: () => void;
  onResetFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  totalCount,
  visibleCount,
  compareList,
  searchQuery,
  onViewDetails,
  onToggleCompare,
  onLoadMore,
  onResetFilters,
}) => {
  if (products.length === 0) {
    return (
      <div className="p-10 rounded-2xl bg-white border border-zinc-200 text-center">
        <p className="text-base font-semibold text-zinc-900">
          Looking for a specific phone model not shown in this filter?
        </p>
        <p className="mt-1 text-xs text-zinc-500 max-w-md mx-auto">
          Enquire directly with {STORE_INFO.displayName} on WhatsApp or reset active filters to view
          all models.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onResetFilters}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-semibold cursor-pointer"
          >
            Reset All Filters
          </button>
          <WhatsAppButton
            productName={searchQuery || 'Smartphone Model'}
            label={`Enquire About "${searchQuery || 'This Model'}" on WhatsApp`}
            variant="amber"
            size="md"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Two-column product grid on mobile, 3-column on desktop */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-5">
        {products.map((phone) => (
          <ProductCard
            key={phone.id}
            phone={phone}
            isCompared={compareList.some((c) => c.id === phone.id)}
            onViewDetails={onViewDetails}
            onToggleCompare={onToggleCompare}
          />
        ))}
      </div>

      {visibleCount < totalCount && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={onLoadMore}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-md"
          >
            Load More Smartphone Models ({totalCount - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
};
