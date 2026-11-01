import React from 'react';
import {
  SmartphoneProduct,
  formatStockStatusBadge,
} from '../../utils/storeLogic';
import { OriginalProductImageFrame } from './OriginalProductImageFrame';
import { WhatsAppButton } from './WhatsAppButton';

interface ProductCardProps {
  phone: SmartphoneProduct;
  isCompared: boolean;
  onViewDetails: (phone: SmartphoneProduct) => void;
  onToggleCompare: (phone: SmartphoneProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  phone,
  isCompared,
  onViewDetails,
  onToggleCompare,
}) => {
  const statusBadge = formatStockStatusBadge(phone.availability);

  const badgeColors =
    statusBadge === 'AVAILABLE'
      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
      : statusBadge === 'OUT OF STOCK'
        ? 'text-rose-700 bg-rose-50 border-rose-200'
        : 'text-amber-800 bg-amber-50 border-amber-200/80';

  const keySpec =
    phone.keySpecSummary ||
    `${phone.series} · ${phone.network}`;

  const displayPrice =
    phone.offerPrice ?? phone.price
      ? `₹${(phone.offerPrice ?? phone.price)?.toLocaleString('en-IN')}`
      : 'Check Price';

  const primaryOriginalImage =
    phone.productImage?.trim() || phone.galleryImages?.front?.trim() || undefined;

  return (
    <article className="group rounded-2xl bg-white border border-zinc-200/90 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
      <div>
        {/* Original Product Image Frame (object-contain, no AI substitute) */}
        <div
          onClick={() => onViewDetails(phone)}
          className="cursor-pointer relative overflow-hidden"
        >
          <OriginalProductImageFrame
            imageSrc={primaryOriginalImage}
            altText={phone.modelName}
            brandLabel={phone.brand}
            modelOrCategoryLabel={phone.modelName}
            theme="light"
            showViewDetailsHint={true}
          />
        </div>

        <div className="p-3.5 sm:p-5">
          {/* Brand & Stock Status Badge */}
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-700">
                {phone.brand}
              </span>
              {phone.generation && (
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    phone.generation === 'Current Model'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/70'
                      : 'bg-zinc-100 text-zinc-600 border border-zinc-200/80'
                  }`}
                >
                  {phone.generation === 'Current Model' ? 'Current' : 'Previous'}
                </span>
              )}
            </div>
            <span
              className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded border ${badgeColors}`}
            >
              {statusBadge}
            </span>
          </div>

          {/* Series & Model Number */}
          <div className="mt-1 flex items-center justify-between gap-1.5 text-[10px] text-zinc-400">
            <span className="truncate font-medium">{phone.series}</span>
            {phone.modelNumber && (
              <span className="font-mono text-[10px] text-zinc-400 shrink-0">
                {phone.modelNumber}
              </span>
            )}
          </div>

          {/* Model Name */}
          <h3 className="mt-1 font-display text-sm sm:text-base font-bold text-zinc-950 leading-snug">
            <button
              type="button"
              onClick={() => onViewDetails(phone)}
              className="text-left hover:text-amber-700 transition-colors cursor-pointer"
            >
              {phone.modelName}
            </button>
          </h3>

          {/* Key Specification */}
          <p className="mt-1 text-[11px] sm:text-xs text-zinc-500 line-clamp-2">
            {keySpec}
          </p>

          {/* Price / Check Price & Compare Toggle */}
          <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between gap-2">
            <div>
              <span className="block text-[10px] text-zinc-400">Price</span>
              <span className="font-display text-xs sm:text-sm font-bold text-zinc-950">
                {displayPrice}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onToggleCompare(phone)}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:text-zinc-950'
              }`}
            >
              {isCompared ? '✓ Comparing' : '+ Compare'}
            </button>
          </div>
        </div>
      </div>

      {/* Card Footer Actions: View Details & WhatsApp Enquiry */}
      <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-2 border-t border-zinc-100 grid grid-cols-1 gap-2">
        <button
          type="button"
          onClick={() => onViewDetails(phone)}
          aria-label={`View Details for ${phone.modelName}`}
          className="w-full px-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
        >
          View Details
        </button>

        <WhatsAppButton
          productName={phone.modelName}
          label="WhatsApp Enquiry"
          size="sm"
          variant="amber"
          className="w-full"
        />
      </div>
    </article>
  );
};
