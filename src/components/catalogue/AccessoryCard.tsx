import React from 'react';
import {
  AccessoryCatalogueItem,
  formatStockStatusBadge,
  buildAccessoryWhatsAppMessage,
  formatAccessoryPriceDisplay,
} from '../../utils/storeLogic';
import { OriginalProductImageFrame } from './OriginalProductImageFrame';
import { WhatsAppButton } from './WhatsAppButton';
import { CheckCircle2, HelpCircle } from 'lucide-react';

interface AccessoryCardProps {
  accessory: AccessoryCatalogueItem;
  forPhoneModel?: string;
  compatibilityLabel?: string;
  onCheckPriceModal?: (accessory: AccessoryCatalogueItem, message: string) => void;
  darkTheme?: boolean;
}

export const AccessoryCard: React.FC<AccessoryCardProps> = ({
  accessory,
  forPhoneModel,
  compatibilityLabel,
  onCheckPriceModal,
  darkTheme = false,
}) => {
  const statusBadge = formatStockStatusBadge(accessory.availability);
  const formattedPrice = formatAccessoryPriceDisplay(accessory.price, accessory.mopPrice);
  const isPriceVerified = Boolean(
    accessory.verifiedPrice || (accessory.price !== null && accessory.price !== undefined)
  );

  // Exact WhatsApp enquiry message format:
  // Hello Friends Cell Point,
  // I am interested in:
  // [Brand]
  // [Product Name]
  // [Variant]
  // Price: [Price]
  //
  // Please confirm availability.
  const whatsappMessage = buildAccessoryWhatsAppMessage({
    brand: accessory.brand,
    productName: accessory.productName,
    variant: forPhoneModel
      ? `${accessory.variant} (for ${forPhoneModel})`
      : accessory.variant || 'Standard',
    priceDisplay: formattedPrice,
  });

  const handleCheckAvailability = () => {
    if (onCheckPriceModal) {
      onCheckPriceModal(accessory, whatsappMessage);
    } else {
      // Fallback: trigger direct WhatsApp enquiry
      const encoded = encodeURIComponent(whatsappMessage);
      window.open(`https://wa.me/917207987777?text=${encoded}`, '_blank');
    }
  };

  return (
    <article
      className={`group rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        darkTheme
          ? 'bg-[#141720] border-white/10 text-white'
          : 'bg-white border-zinc-200/90 text-zinc-900'
      }`}
    >
      <div>
        <OriginalProductImageFrame
          imageSrc={accessory.productImage}
          altText={`${accessory.brand} ${accessory.productName}`}
          brandLabel={accessory.brand}
          modelOrCategoryLabel={accessory.category}
          theme={darkTheme ? 'dark' : 'light'}
          showViewDetailsHint={true}
        />

        <div className="p-4">
          {/* Brand & Category row + Availability Status */}
          <div className="flex flex-wrap items-center justify-between gap-1.5 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span
                className={`font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded ${
                  darkTheme
                    ? 'bg-amber-400/15 text-amber-300 border border-amber-400/20'
                    : 'bg-zinc-100 text-zinc-800 border border-zinc-200'
                }`}
              >
                {accessory.brand}
              </span>
              <span className={`text-[11px] font-medium ${darkTheme ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {compatibilityLabel || accessory.category}
              </span>
            </div>

            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                accessory.availability === 'Available'
                  ? darkTheme
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : darkTheme
                    ? 'bg-white/10 text-amber-300'
                    : 'bg-amber-50 text-amber-800 border border-amber-200/70'
              }`}
            >
              {accessory.availability === 'Available' ? (
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
              ) : (
                <HelpCircle className="w-3 h-3 text-amber-500 shrink-0" />
              )}
              {statusBadge}
            </span>
          </div>

          {/* Product Name */}
          <h3
            className={`mt-2 font-display text-sm sm:text-base font-bold leading-snug line-clamp-2 ${
              darkTheme ? 'text-white' : 'text-zinc-950'
            }`}
          >
            {accessory.productName}
          </h3>

          {/* Variant / Specification */}
          <div className="mt-1.5 space-y-0.5">
            <p
              className={`text-xs font-semibold ${
                darkTheme ? 'text-amber-400' : 'text-amber-700'
              }`}
            >
              {accessory.variant}
            </p>
            {accessory.specification && (
              <p
                className={`text-[11px] line-clamp-1 ${
                  darkTheme ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                {accessory.specification}
              </p>
            )}
            <p
              className={`text-[11px] line-clamp-2 ${
                darkTheme ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              {forPhoneModel
                ? `Compatible with ${forPhoneModel}`
                : accessory.shortDescription}
            </p>
          </div>

          {/* Price display: Verified ₹ price or "Price on Enquiry" */}
          <div className="mt-3 pt-2.5 border-t border-dashed border-zinc-200 dark:border-white/10 flex items-center justify-between">
            <span className={`text-[11px] font-medium ${darkTheme ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Price:
            </span>
            {isPriceVerified ? (
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-sm sm:text-base font-extrabold ${
                    darkTheme ? 'text-emerald-400' : 'text-emerald-700'
                  }`}
                >
                  {formattedPrice}
                </span>
                <span className="text-[10px] text-zinc-400 font-normal">
                  (Verified)
                </span>
              </div>
            ) : (
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded ${
                  darkTheme
                    ? 'bg-amber-400/10 text-amber-300 border border-amber-400/20'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                Price on Enquiry
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons: "Check Availability" + "Ask on WhatsApp" */}
      <div
        className={`px-4 pb-4 pt-2.5 border-t flex flex-col gap-2 ${
          darkTheme ? 'border-white/10' : 'border-zinc-100'
        }`}
      >
        <button
          type="button"
          onClick={handleCheckAvailability}
          className={`w-full py-2 px-3 rounded-xl text-xs font-semibold cursor-pointer transition-colors text-center ${
            darkTheme
              ? 'bg-white/10 hover:bg-white/15 text-white border border-white/15'
              : 'bg-zinc-950 hover:bg-zinc-800 text-white'
          }`}
        >
          Check Availability
        </button>

        <WhatsAppButton
          customMessage={whatsappMessage}
          label="Ask on WhatsApp"
          size="sm"
          variant="amber"
          className="w-full text-center"
        />
      </div>
    </article>
  );
};
