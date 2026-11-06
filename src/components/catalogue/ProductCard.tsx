import React, { useState } from 'react';
import { Phone, CheckCircle2 } from 'lucide-react';
import {
  SmartphoneProduct,
  STORE_INFO,
  PRICE_CHANGE_DISCLAIMER,
  formatStockStatusBadge,
  formatPublicMopPrice,
  buildPriceListWhatsAppMessage,
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

  const mopDisplay = formatPublicMopPrice(phone.mopPrice, phone.price);

  const hasEffectivePrice = Boolean(
    phone.effectivePrice && phone.effectivePrice.trim().length > 0
  );
  const hasOldRp = Boolean(phone.oldRp && phone.oldRp.trim().length > 0);
  const providedColors = (phone.colors || []).filter(
    (c) => Boolean(c.trim()) && !c.toLowerCase().includes('details available')
  );
  const [selectedColor, setSelectedColor] = useState<string>(providedColors[0] || '');

  const whatsappEnquiryMessage = buildPriceListWhatsAppMessage({
    brand: phone.brand,
    model: phone.modelName || phone.model,
    variant: phone.variant || 'Standard',
    price: mopDisplay,
  });

  const colorMatchedImage =
    selectedColor && phone.colorImages?.[selectedColor]
      ? phone.colorImages[selectedColor].trim()
      : undefined;

  const primaryOriginalImage =
    colorMatchedImage ||
    phone.productImage?.trim() ||
    phone.galleryImages?.front?.trim() ||
    undefined;

  return (
    <article className="group rounded-2xl bg-white border border-zinc-200/90 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
      <div>
        {/* Product Photo or Clean "Product Image Unavailable" Placeholder */}
        <div
          onClick={() => onViewDetails(phone)}
          className="cursor-pointer relative overflow-hidden"
        >
          <OriginalProductImageFrame
            imageSrc={primaryOriginalImage}
            altText={`${phone.brand} ${phone.modelName} (${phone.variant})${selectedColor ? ` - ${selectedColor}` : ''}`}
            brandLabel={phone.brand}
            modelOrCategoryLabel={
              phone.variant && phone.variant !== 'Standard'
                ? `${phone.modelName} · ${phone.variant}`
                : phone.modelName
            }
            theme="light"
            showViewDetailsHint={true}
          />
        </div>

        <div className="p-3.5 sm:p-5">
          {/* Brand, Series & Stock Status Badge */}
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-800 shrink-0">
                {phone.brand}
              </span>
              <span className="text-zinc-300 shrink-0">·</span>
              <span className="text-[11px] font-medium text-zinc-500 truncate">
                {phone.series}
              </span>
            </div>
            <span
              className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded border shrink-0 ${badgeColors}`}
            >
              {statusBadge}
            </span>
          </div>

          {/* Model Name & RAM + Storage Variant */}
          <div className="mt-1.5 flex items-start justify-between gap-2">
            <h3 className="font-display text-sm sm:text-base font-bold text-zinc-950 leading-snug">
              <button
                type="button"
                onClick={() => onViewDetails(phone)}
                className="text-left hover:text-amber-700 transition-colors cursor-pointer"
              >
                {phone.modelName}
              </button>
            </h3>
            {phone.variant && (
              <span className="px-2 py-0.5 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-800 font-mono text-[11px] font-bold shrink-0">
                {phone.variant}
              </span>
            )}
          </div>

          {/* Available Colours (only if available) */}
          {providedColors.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mr-0.5">
                Available Colours:
              </span>
              {providedColors.map((color) => {
                const isSelected = selectedColor === color;
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                      isSelected && providedColors.length > 1
                        ? 'bg-amber-50 text-amber-900 border-amber-300 font-semibold'
                        : 'bg-zinc-100 text-zinc-700 border-zinc-200/80 hover:border-zinc-300'
                    }`}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
          )}

          {/* Pricing Section: MOP / Retail Price & Effective Price (only if available) */}
          <div className="mt-3 pt-2.5 border-t border-zinc-100 space-y-1.5">
            <div className="flex items-baseline justify-between gap-2">
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  MOP / Retail Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono-num text-sm sm:text-base font-bold text-zinc-950">
                    {mopDisplay}
                  </span>
                  {hasOldRp && (
                    <span className="font-mono-num text-xs text-zinc-400 line-through">
                      {phone.oldRp}
                    </span>
                  )}
                </div>
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

            {/* Effective Price — ONLY if applicable */}
            {hasEffectivePrice && (
              <div className="rounded-lg bg-emerald-50/80 border border-emerald-200/80 px-2.5 py-1.5 space-y-0.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-emerald-900">
                    Effective Price:
                  </span>
                  <span className="font-mono-num font-bold text-emerald-950">
                    {phone.effectivePrice}
                  </span>
                </div>
                {(phone.discountFullSwipe || phone.discountEmi) && (
                  <p className="text-[10px] text-emerald-800">
                    Instant Offer: {phone.discountFullSwipe || phone.discountEmi}
                  </p>
                )}
              </div>
            )}

            {/* Price Disclaimer */}
            <p className="text-[10px] leading-snug text-zinc-500 italic pt-1">
              {PRICE_CHANGE_DISCLAIMER}
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer Actions: Check Availability, WhatsApp Enquiry, Call Now */}
      <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-2 border-t border-zinc-100 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onViewDetails(phone)}
            aria-label={`Check Availability for ${phone.modelName} ${phone.variant}`}
            className="w-full px-2.5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Check Availability</span>
          </button>

          <a
            href={STORE_INFO.telHref}
            aria-label={`Call Now for ${phone.modelName}`}
            className="w-full px-2.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-900 text-xs font-semibold transition-colors inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Call Now</span>
          </a>
        </div>

        <WhatsAppButton
          customMessage={whatsappEnquiryMessage}
          productName={`${phone.modelName} (${phone.variant})`}
          label="WhatsApp Enquiry"
          size="sm"
          variant="amber"
          className="w-full"
        />
      </div>
    </article>
  );
};
