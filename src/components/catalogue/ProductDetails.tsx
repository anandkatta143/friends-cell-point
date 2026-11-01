import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  SmartphoneProduct,
  AccessoryCatalogueItem,
  STORE_INFO,
  PRICE_CHANGE_DISCLAIMER,
  buildWhatsAppUrl,
  buildPriceListWhatsAppMessage,
  formatStockStatusBadge,
  getProductGallerySlots,
} from '../../utils/storeLogic';
import { OriginalProductImageFrame } from './OriginalProductImageFrame';
import { WhatsAppButton } from './WhatsAppButton';

interface ProductDetailsProps {
  product: SmartphoneProduct | null;
  catalogue: SmartphoneProduct[];
  accessories: AccessoryCatalogueItem[];
  compareList: SmartphoneProduct[];
  onClose: () => void;
  onSelectProduct: (product: SmartphoneProduct) => void;
  onSelectBrand: (brandName: string) => void;
  onSelectSeries: (brandName: string, seriesName: string) => void;
  onEditModelInAdmin: (product: SmartphoneProduct) => void;
  onToggleCompare: (product: SmartphoneProduct) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  catalogue,
  compareList,
  onClose,
  onSelectProduct,
  onSelectBrand,
  onSelectSeries,
  onToggleCompare,
}) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [activeGalleryIdx, setActiveGalleryIdx] = useState<number | null>(0);

  useEffect(() => {
    if (product) {
      const validColors = (product.colors || []).filter(
        (c) => Boolean(c.trim()) && !c.toLowerCase().includes('details available')
      );
      setSelectedColor(validColors[0] || '');
      setActiveGalleryIdx(0);
    }
  }, [product]);

  if (!product) return null;

  const isCompared = compareList.some((c) => c.id === product.id);
  const stockBadge = formatStockStatusBadge(product.availability);

  const mopDisplay =
    product.mopPrice?.trim() ||
    (product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Check Price');

  const hasDealerPrice = Boolean(product.dealerPrice && product.dealerPrice.trim().length > 0);
  const hasEffectivePrice = Boolean(
    product.effectivePrice && product.effectivePrice.trim().length > 0
  );
  const hasOldRp = Boolean(product.oldRp && product.oldRp.trim().length > 0);
  const providedColors = (product.colors || []).filter(
    (c) => Boolean(c.trim()) && !c.toLowerCase().includes('details available')
  );

  // All RAM + Storage variants available for this exact model
  const siblingVariants = catalogue.filter(
    (item) =>
      item.brand.toLowerCase() === product.brand.toLowerCase() &&
      item.modelName.toLowerCase() === product.modelName.toLowerCase()
  );

  const whatsappEnquiryMessage = buildPriceListWhatsAppMessage({
    brand: product.brand,
    model: product.modelName || product.model,
    variant: product.variant || 'Standard',
    price: mopDisplay,
  });

  const checkAvailabilityHref = buildWhatsAppUrl(whatsappEnquiryMessage);

  const gallerySlots = getProductGallerySlots(product);
  const uploadedSlots = gallerySlots.filter((s) => Boolean(s.imageUrl));
  const activeSlot =
    activeGalleryIdx !== null
      ? uploadedSlots[activeGalleryIdx] || gallerySlots[0]
      : gallerySlots[0];

  const colorMatchedImage =
    selectedColor && product.colorImages?.[selectedColor]
      ? product.colorImages[selectedColor].trim()
      : undefined;

  const displayedImageUrl =
    activeGalleryIdx === null && colorMatchedImage
      ? colorMatchedImage
      : activeSlot.imageUrl || colorMatchedImage || product.productImage;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
    >
      <div className="relative w-full max-w-4xl my-auto rounded-3xl bg-[#111319] border border-white/15 text-zinc-100 shadow-2xl overflow-hidden">
        {/* Top Navigation & Close Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-4 bg-[#0B0C0E] border-b border-white/10">
          <nav
            aria-label="Product Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-zinc-400"
          >
            <button
              type="button"
              onClick={() => {
                onClose();
                onSelectBrand(product.brand);
              }}
              className="hover:text-amber-400 transition-colors cursor-pointer font-medium"
            >
              {product.brand}
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onSelectSeries(product.brand, product.series);
              }}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              {product.series}
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-white font-semibold truncate max-w-[240px]">
              {product.modelName}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleCompare(product)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-white/5 text-zinc-300 border-white/10 hover:text-white'
              }`}
            >
              {isCompared ? '✓ Comparing' : '+ Compare'}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close product detail view"
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Clean Professional Product Detail Page */}
        <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: [Product Photo] (or Clean "Product Image Unavailable" Placeholder) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#12151E]">
              <OriginalProductImageFrame
                imageSrc={displayedImageUrl}
                altText={`${product.brand} ${product.modelName}${selectedColor ? ` (${selectedColor})` : ''}`}
                brandLabel={product.brand}
                modelOrCategoryLabel={product.modelName}
                angleLabel={
                  activeGalleryIdx === null && selectedColor
                    ? selectedColor
                    : uploadedSlots.length > 1
                      ? activeSlot.label
                      : undefined
                }
                theme="dark"
                eager={true}
                showViewDetailsHint={false}
              />
            </div>

            {uploadedSlots.length > 1 && (
              <div
                className="grid grid-cols-4 sm:grid-cols-6 gap-2"
                role="group"
                aria-label="Product photo gallery"
              >
                {uploadedSlots.map((slot, idx) => {
                  const isSelected = activeGalleryIdx === idx;
                  return (
                    <button
                      key={slot.key}
                      type="button"
                      onClick={() => setActiveGalleryIdx(idx)}
                      className={`p-2 rounded-xl border text-[10px] font-semibold text-center transition-colors cursor-pointer flex flex-col items-center justify-center gap-1 ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                          : 'bg-[#0B0C0E] border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <img
                        src={slot.imageUrl!}
                        alt={`${product.modelName} ${slot.label}`}
                        className="w-8 h-8 object-contain rounded bg-white/5 p-0.5"
                      />
                      <span className="leading-tight">{slot.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT: Brand, Series, Model Name, Available Colours, RAM + Storage Variant, Prices, CTAs & Disclaimer */}
          <div className="lg:col-span-7 space-y-5">
            {/* Brand, Series & Model Name */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <span>{product.brand}</span>
                  <span className="text-zinc-500">·</span>
                  <span className="text-zinc-300">{product.series}</span>
                </div>

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-lg border ${
                    stockBadge === 'AVAILABLE'
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      : stockBadge === 'OUT OF STOCK'
                        ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {stockBadge}
                </span>
              </div>

              <h2
                id="pdp-modal-title"
                className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white"
              >
                {product.modelName}
              </h2>
            </div>

            {/* Available Colours (only if available in product data) */}
            {providedColors.length > 0 && (
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  Available Colours
                </span>
                <div className="flex flex-wrap gap-2">
                  {providedColors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setSelectedColor(c);
                        if (product.colorImages?.[c]) {
                          setActiveGalleryIdx(null);
                        }
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                        selectedColor === c
                          ? 'bg-amber-500 text-zinc-950 border-amber-400'
                          : 'bg-[#0B0C0E] text-zinc-200 border-white/15 hover:border-white/30'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* RAM + Storage Variant */}
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                RAM + Storage Variant
              </span>
              {siblingVariants.length > 1 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {siblingVariants.map((sib) => {
                    const isCurrent = sib.id === product.id;
                    return (
                      <button
                        key={sib.id}
                        type="button"
                        onClick={() => onSelectProduct(sib)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isCurrent
                            ? 'bg-amber-500/20 border-amber-400 text-white'
                            : 'bg-[#0B0C0E] border-white/10 text-zinc-300 hover:border-white/30'
                        }`}
                      >
                        <span className="font-mono text-xs font-bold">
                          {sib.variant || 'Standard'}
                        </span>
                        <span className="font-mono-num text-xs font-bold text-amber-400">
                          {sib.mopPrice}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="inline-flex items-center px-3.5 py-2 rounded-xl bg-[#0B0C0E] border border-white/15 font-mono text-xs sm:text-sm font-bold text-amber-400">
                  {product.variant || 'Standard'}
                </div>
              )}
            </div>

            {/* MOP / Retail Price & Dealer Price (only if available) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/15 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-xs text-zinc-400 block">MOP / Retail Price</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-mono-num text-2xl font-bold text-white">
                      {mopDisplay}
                    </span>
                    {hasOldRp && (
                      <span className="font-mono-num text-xs text-zinc-400 line-through">
                        {product.oldRp}
                      </span>
                    )}
                  </div>
                </div>

                {hasDealerPrice && (
                  <div>
                    <span className="text-xs text-amber-300/90 block">Dealer Price</span>
                    <span className="font-mono-num text-xl font-bold text-amber-400 mt-0.5 block">
                      {product.dealerPrice}
                    </span>
                  </div>
                )}

                {hasEffectivePrice && (
                  <div>
                    <span className="text-xs text-emerald-300/90 block">Effective Price</span>
                    <span className="font-mono-num text-xl font-bold text-emerald-400 mt-0.5 block">
                      {product.effectivePrice}
                    </span>
                    {(product.discountFullSwipe || product.discountEmi) && (
                      <span className="text-[11px] text-emerald-300 block">
                        Offer: {product.discountFullSwipe || product.discountEmi}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons: Check Availability, WhatsApp Enquiry, Call Now */}
            <div className="pt-1 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <a
                href={checkAvailabilityHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs tracking-wide transition-colors text-center"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Check Availability</span>
              </a>

              <WhatsAppButton
                customMessage={whatsappEnquiryMessage}
                productName={`${product.modelName} (${product.variant})`}
                label="WhatsApp Enquiry"
                variant="amber"
                size="md"
                className="font-bold w-full"
              />

              <a
                href={STORE_INFO.telHref}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs tracking-wide transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Price Disclaimer */}
            <div className="p-3.5 rounded-xl bg-[#0B0C0E] border border-white/10 flex items-start gap-2.5 text-xs text-zinc-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <span>{PRICE_CHANGE_DISCLAIMER}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
