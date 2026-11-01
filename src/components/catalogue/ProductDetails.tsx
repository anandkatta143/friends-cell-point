import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  Edit3,
  Layers,
  ShieldCheck,
  Cpu,
  BatteryCharging,
  Camera,
  Smartphone,
  Star,
  Upload,
} from 'lucide-react';
import {
  SmartphoneProduct,
  AccessoryCatalogueItem,
  STORE_INFO,
  buildWhatsAppUrl,
  buildPhoneModelWhatsAppMessage,
  buildProductEnquiryWhatsAppMessage,
  getCompatibleAccessoriesForPhone,
  getRelatedProductsForPhone,
  formatStockStatusBadge,
  formatVerifiedSpecValue,
  getProductGallerySlots,
} from '../../utils/storeLogic';
import { OriginalProductImageFrame } from './OriginalProductImageFrame';
import { WhatsAppButton } from './WhatsAppButton';
import { AccessoryCard } from './AccessoryCard';
import { ProductCard } from './ProductCard';

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
  accessories,
  compareList,
  onClose,
  onSelectProduct,
  onSelectBrand,
  onSelectSeries,
  onEditModelInAdmin,
  onToggleCompare,
}) => {
  const [selectedRam, setSelectedRam] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);

  useEffect(() => {
    if (product) {
      setSelectedRam(product.ramOptions[0] || 'Details available on enquiry');
      setSelectedStorage(product.storageOptions[0] || 'Details available on enquiry');
      setSelectedColor(product.colorOptions[0] || 'Details available on enquiry');
      setActiveGalleryIdx(0);
    }
  }, [product]);

  if (!product) return null;

  const isCompared = compareList.some((c) => c.id === product.id);
  const stockBadge = formatStockStatusBadge(product.availability);

  const variantSummary = [
    selectedRam && !selectedRam.toLowerCase().includes('details') ? `RAM: ${selectedRam}` : '',
    selectedStorage && !selectedStorage.toLowerCase().includes('details')
      ? `Storage: ${selectedStorage}`
      : '',
    selectedColor && !selectedColor.toLowerCase().includes('details')
      ? `Colour: ${selectedColor}`
      : '',
  ]
    .filter(Boolean)
    .join(', ');

  const checkPriceHref = buildWhatsAppUrl(
    buildPhoneModelWhatsAppMessage(product.brand, product.modelName, variantSummary)
  );
  const checkAvailabilityHref = buildWhatsAppUrl(
    `Hello Friends Cell Point, I would like to check the current stock availability of ${product.modelName}${variantSummary ? ` (${variantSummary})` : ''}.`
  );
  const enquiryMessage = buildProductEnquiryWhatsAppMessage(product.modelName, variantSummary);

  const compatibleAcc = getCompatibleAccessoriesForPhone(
    accessories,
    product.brand,
    product.modelName
  );
  const relatedProducts = getRelatedProductsForPhone(catalogue, product, 4);

  // 10 Required Key Specifications
  const keySpecRows = [
    { label: 'Display', value: formatVerifiedSpecValue(product.display), icon: Smartphone },
    { label: 'Processor', value: formatVerifiedSpecValue(product.processor), icon: Cpu },
    { label: 'RAM', value: formatVerifiedSpecValue(product.ramOptions), icon: Cpu },
    { label: 'Storage', value: formatVerifiedSpecValue(product.storageOptions), icon: Layers },
    { label: 'Rear Camera', value: formatVerifiedSpecValue(product.rearCamera), icon: Camera },
    { label: 'Front Camera', value: formatVerifiedSpecValue(product.frontCamera), icon: Camera },
    { label: 'Battery', value: formatVerifiedSpecValue(product.battery), icon: BatteryCharging },
    { label: 'Charging', value: formatVerifiedSpecValue(product.charging), icon: BatteryCharging },
    { label: 'Network', value: formatVerifiedSpecValue(product.network), icon: Smartphone },
    { label: 'Operating System', value: formatVerifiedSpecValue(product.os), icon: ShieldCheck },
  ];

  // 6 Multi-Angle Original Image Gallery Slots: Front, Back, Side, Camera, Display, Box / Package
  const gallerySlots = getProductGallerySlots(product);
  const activeSlot = gallerySlots[activeGalleryIdx] || gallerySlots[0];
  const uploadedGalleryCount = gallerySlots.filter((s) => Boolean(s.imageUrl)).length;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start justify-center p-2 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
    >
      <div className="relative w-full max-w-6xl my-4 rounded-3xl bg-[#111319] border border-white/15 text-zinc-100 shadow-2xl overflow-hidden">
        {/* Top Breadcrumb & Action Bar */}
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
              {product.brand} Mobiles
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
            <span className="text-white font-semibold truncate max-w-[220px]">
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
              onClick={() => onEditModelInAdmin(product)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              Upload Photos / Edit Specs
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

        {/* ==================================================
            3. PRODUCT DETAILS PAGE LAYOUT (LEFT GALLERY / RIGHT INFO)
           ================================================== */}
        <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Large Original Product Image Gallery (Front, Back, Side, Camera, Display, Box / Package) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#12151E]">
              <OriginalProductImageFrame
                imageSrc={activeSlot.imageUrl}
                altText={`${product.modelName} - ${activeSlot.label}`}
                brandLabel={product.brand}
                modelOrCategoryLabel={product.modelName}
                angleLabel={activeSlot.label}
                theme="dark"
                eager={true}
                showViewDetailsHint={false}
              />
            </div>

            {/* 6-Angle Original Image Thumbnails: Front, Back, Side, Camera, Display, Box / Package */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2" role="group" aria-label="Original product image gallery angles">
              {gallerySlots.map((slot, idx) => {
                const isSelected = activeGalleryIdx === idx;
                const hasPhoto = Boolean(slot.imageUrl);
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
                    {hasPhoto && (
                      <img
                        src={slot.imageUrl!}
                        alt={`${product.modelName} ${slot.label} thumbnail`}
                        className="w-8 h-8 object-contain rounded bg-white/5 p-0.5"
                      />
                    )}
                    <span className="leading-tight">{slot.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Store Owner Action: Upload Original Product Image */}
            <div className="p-3 rounded-xl bg-[#0B0C0E] border border-white/10 flex items-center justify-between gap-2 text-xs">
              <span className="text-zinc-400">
                {uploadedGalleryCount > 0
                  ? `${uploadedGalleryCount} original photo(s) uploaded`
                  : 'Original product photos (no AI substitute)'}
              </span>
              <button
                type="button"
                onClick={() => onEditModelInAdmin(product)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-300 font-semibold cursor-pointer whitespace-nowrap"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload Original Image
              </button>
            </div>
          </div>

          {/* RIGHT: Brand, Model Name, Verified Rating (only if verified), Price, Availability, Variants & 4 Buttons */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {product.brand} · {product.series}
                  </span>
                  {product.generation && (
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                        product.generation === 'Current Model'
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          : 'bg-white/5 text-zinc-300 border-white/15'
                      }`}
                    >
                      {product.generation}
                    </span>
                  )}
                  {product.modelNumber && (
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">
                      Model No: {product.modelNumber}
                    </span>
                  )}
                </div>

                {/* Stock Status Badge */}
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

              {product.sourceUrl && (
                <div className="mt-1.5 text-xs text-zinc-400">
                  Official Brand Catalogue Reference:{' '}
                  <a
                    href={product.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline font-medium"
                  >
                    {product.brand} Official Website ↗
                  </a>
                </div>
              )}

              {/* Rating area ONLY if verified */}
              {typeof product.verifiedRating === 'number' && product.verifiedRating > 0 && (
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold">{product.verifiedRating.toFixed(1)}</span>
                  {product.verifiedReviewCount && (
                    <span className="text-zinc-400">
                      ({product.verifiedReviewCount} Verified Store Ratings)
                    </span>
                  )}
                </div>
              )}

              {/* Price / Check Price Box */}
              <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <span className="text-xs text-zinc-400 block">Price</span>
                  {product.offerPrice || product.price ? (
                    <div className="flex items-baseline gap-2.5 mt-0.5">
                      <span className="font-mono-num text-2xl font-bold text-white">
                        ₹{(product.offerPrice ?? product.price)?.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span className="font-mono-num text-sm text-zinc-500 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="font-display text-lg font-bold text-amber-400 mt-0.5 block">
                      Check Price
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xs text-zinc-400 block">Availability</span>
                  <strong className="text-xs sm:text-sm text-white">{stockBadge}</strong>
                </div>
              </div>
            </div>

            {/* Storage Variants, RAM Variants & Colour Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor="pdp-storage-select" className="block text-xs text-zinc-400 mb-1">
                  Storage Variants
                </label>
                <select
                  id="pdp-storage-select"
                  value={selectedStorage}
                  onChange={(e) => setSelectedStorage(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0B0C0E] border border-white/15 text-xs text-white"
                >
                  {product.storageOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="pdp-ram-select" className="block text-xs text-zinc-400 mb-1">
                  RAM Variants
                </label>
                <select
                  id="pdp-ram-select"
                  value={selectedRam}
                  onChange={(e) => setSelectedRam(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0B0C0E] border border-white/15 text-xs text-white"
                >
                  {product.ramOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="pdp-color-select" className="block text-xs text-zinc-400 mb-1">
                  Colour Options
                </label>
                <select
                  id="pdp-color-select"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0B0C0E] border border-white/15 text-xs text-white"
                >
                  {product.colorOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4 Required Action Buttons: CHECK PRICE, CHECK AVAILABILITY, WHATSAPP ENQUIRY, CALL STORE */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={checkPriceHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs tracking-wide transition-colors text-center"
              >
                CHECK PRICE
              </a>

              <a
                href={checkAvailabilityHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs tracking-wide transition-colors text-center"
              >
                CHECK AVAILABILITY
              </a>

              <WhatsAppButton
                productName={product.modelName}
                variantNote={variantSummary}
                label="WHATSAPP ENQUIRY"
                variant="emerald"
                size="md"
                className="font-bold w-full"
              />

              <a
                href={STORE_INFO.telHref}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs tracking-wide transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>CALL STORE</span>
              </a>
            </div>

            <div className="p-3 rounded-xl bg-[#0B0C0E] border border-white/10 text-[11px] text-zinc-400">
              <span className="text-zinc-300 font-medium">WhatsApp Enquiry Message: </span>
              &ldquo;{enquiryMessage}&rdquo;
            </div>
          </div>
        </div>

        {/* ==================================================
            BELOW: KEY SPECIFICATIONS (10 Verified Fields)
           ================================================== */}
        <div className="px-5 sm:px-8 pb-8 pt-6 border-t border-white/10">
          <h3 className="font-display text-lg font-bold text-white mb-4">
            KEY SPECIFICATIONS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {keySpecRows.map((row) => (
              <div
                key={row.label}
                className="p-3.5 rounded-xl bg-[#0B0C0E] border border-white/10 flex items-start justify-between gap-4"
              >
                <span className="text-xs text-zinc-400 shrink-0">{row.label}</span>
                <span className="text-xs font-medium text-zinc-200 text-right">{row.value}</span>
              </div>
            ))}
          </div>

          {/* ==================================================
              8. ACCESSORIES FOR THIS PHONE
             ================================================== */}
          {compatibleAcc.allCompatibleList.length > 0 && (
            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
                <div>
                  <span className="text-xs font-semibold text-amber-400">
                    Confirmed Catalogue Compatibility
                  </span>
                  <h4 className="font-display text-xl font-bold text-white mt-0.5">
                    ACCESSORIES FOR THIS PHONE
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    Cases, Tempered Glass, Chargers, Cables, Earphones, TWS &amp; other compatible
                    accessories for {product.modelName}.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
                {compatibleAcc.allCompatibleList.map(({ label, item }) => (
                  <AccessoryCard
                    key={`${product.id}-${label}`}
                    accessory={item}
                    forPhoneModel={product.modelName}
                    compatibilityLabel={label}
                    darkTheme
                  />
                ))}
              </div>
            </div>
          )}

          {/* ==================================================
              4. RELATED PRODUCTS ("YOU MAY ALSO LIKE")
             ================================================== */}
          {relatedProducts.length > 0 && (
            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="mb-5">
                <span className="text-xs font-semibold text-amber-400">
                  Related {product.brand} &amp; Category Models
                </span>
                <h4 className="font-display text-xl font-bold text-white mt-0.5">
                  YOU MAY ALSO LIKE
                </h4>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                {relatedProducts.map((relPhone) => (
                  <ProductCard
                    key={relPhone.id}
                    phone={relPhone}
                    isCompared={compareList.some((c) => c.id === relPhone.id)}
                    onViewDetails={(chosen) => onSelectProduct(chosen)}
                    onToggleCompare={onToggleCompare}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
