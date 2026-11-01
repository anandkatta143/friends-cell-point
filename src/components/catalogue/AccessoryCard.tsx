import React from 'react';
import {
  AccessoryCatalogueItem,
  formatStockStatusBadge,
  buildCatalogueProductWhatsAppMessage,
} from '../../utils/storeLogic';
import { OriginalProductImageFrame } from './OriginalProductImageFrame';
import { WhatsAppButton } from './WhatsAppButton';

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
  const customMessage = buildCatalogueProductWhatsAppMessage(
    accessory.productName,
    forPhoneModel
  );

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
          altText={accessory.productName}
          brandLabel={compatibilityLabel || accessory.category}
          modelOrCategoryLabel={accessory.productName}
          theme={darkTheme ? 'dark' : 'light'}
          showViewDetailsHint={true}
        />

        <div className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-1.5 text-[11px]">
            <span
              className={`font-semibold ${
                darkTheme ? 'text-amber-400' : 'text-zinc-800'
              }`}
            >
              {compatibilityLabel || accessory.category}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                darkTheme
                  ? 'bg-white/10 text-amber-300'
                  : 'bg-amber-50 text-amber-800 border border-amber-200/70'
              }`}
            >
              {statusBadge}
            </span>
          </div>

          <h3
            className={`mt-1.5 font-display text-sm sm:text-base font-bold leading-snug ${
              darkTheme ? 'text-white' : 'text-zinc-950'
            }`}
          >
            {accessory.productName}
          </h3>

          <p
            className={`mt-1 text-[11px] line-clamp-2 ${
              darkTheme ? 'text-zinc-400' : 'text-zinc-500'
            }`}
          >
            {forPhoneModel
              ? `Compatible with ${forPhoneModel}`
              : accessory.shortDescription}
          </p>

          <p
            className={`mt-2 text-[11px] font-medium ${
              darkTheme ? 'text-zinc-300' : 'text-zinc-700'
            }`}
          >
            Price:{' '}
            <span className={darkTheme ? 'text-amber-400 font-semibold' : 'text-amber-700 font-semibold'}>
              {accessory.price ? `₹${accessory.price.toLocaleString('en-IN')}` : 'Check Price'}
            </span>
          </p>
        </div>
      </div>

      <div
        className={`px-4 pb-4 pt-2 border-t flex flex-col gap-1.5 ${
          darkTheme ? 'border-white/10' : 'border-zinc-100'
        }`}
      >
        {onCheckPriceModal && (
          <button
            type="button"
            onClick={() => onCheckPriceModal(accessory, customMessage)}
            className={`w-full py-2 rounded-xl text-xs font-semibold cursor-pointer ${
              darkTheme
                ? 'bg-white/10 hover:bg-white/15 text-white'
                : 'bg-zinc-950 hover:bg-zinc-800 text-white'
            }`}
          >
            Check Price
          </button>
        )}

        <WhatsAppButton
          customMessage={customMessage}
          label="WhatsApp Enquiry"
          size="sm"
          variant="amber"
          className="w-full"
        />
      </div>
    </article>
  );
};
