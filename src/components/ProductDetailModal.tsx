import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  MessageCircle,
  Check,
  Edit3,
  Layers,
  ShieldCheck,
  Cpu,
  BatteryCharging,
  Camera,
  Smartphone,
} from 'lucide-react';
import {
  SmartphoneProduct,
  AccessoryCatalogueItem,
  STORE_INFO,
  buildWhatsAppUrl,
  buildPhoneModelWhatsAppMessage,
  buildCatalogueProductWhatsAppMessage,
  getCompatibleAccessoriesForPhone,
} from '../utils/storeLogic';
import { ProductPhoneStudioRender } from './StudioVisuals';

interface ProductDetailModalProps {
  product: SmartphoneProduct | null;
  accessories: AccessoryCatalogueItem[];
  onClose: () => void;
  onSelectBrand: (brandName: string) => void;
  onSelectSeries: (brandName: string, seriesName: string) => void;
  onEditModelInAdmin: (product: SmartphoneProduct) => void;
  onToggleCompare: (product: SmartphoneProduct) => void;
  isCompared: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  accessories,
  onClose,
  onSelectBrand,
  onSelectSeries,
  onEditModelInAdmin,
  onToggleCompare,
  isCompared,
}) => {
  const [selectedRam, setSelectedRam] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [customModelNote, setCustomModelNote] = useState('');

  useEffect(() => {
    if (product) {
      setSelectedRam(product.ramOptions[0] || 'Check Details');
      setSelectedStorage(product.storageOptions[0] || 'Check Details');
      setSelectedColor(product.colorOptions[0] || 'Check Available Colours at Store');
      setCustomModelNote('');
    }
  }, [product]);

  if (!product) return null;

  const variantSummary = [
    selectedRam !== 'Check Details' ? `RAM: ${selectedRam}` : '',
    selectedStorage !== 'Check Details' ? `Storage: ${selectedStorage}` : '',
    selectedColor !== 'Check Available Colours at Store' ? `Colour: ${selectedColor}` : '',
    customModelNote.trim() ? `Note: ${customModelNote.trim()}` : '',
  ]
    .filter(Boolean)
    .join(', ');

  const whatsappMessage = buildPhoneModelWhatsAppMessage(
    product.brand,
    product.modelName,
    variantSummary
  );
  const whatsappHref = buildWhatsAppUrl(whatsappMessage);

  const compatibleAcc = getCompatibleAccessoriesForPhone(
    accessories,
    product.brand,
    product.modelName
  );

  const specRows = [
    { label: 'Brand', value: product.brand, icon: Smartphone },
    { label: 'Model / Series', value: `${product.modelName} (${product.series})`, icon: Layers },
    { label: 'Display', value: product.display, icon: Smartphone },
    { label: 'Processor', value: product.processor, icon: Cpu },
    { label: 'RAM Options', value: product.ramOptions.join(' · '), icon: Cpu },
    { label: 'Storage Options', value: product.storageOptions.join(' · '), icon: Layers },
    { label: 'Rear Camera', value: product.rearCamera, icon: Camera },
    { label: 'Front Camera', value: product.frontCamera, icon: Camera },
    { label: 'Battery', value: product.battery, icon: BatteryCharging },
    { label: 'Charging', value: product.charging, icon: BatteryCharging },
    { label: 'Operating System', value: product.os, icon: ShieldCheck },
    { label: 'Network (5G / 4G)', value: product.network, icon: Smartphone },
    { label: 'Colour Options', value: product.colorOptions.join(' · '), icon: Layers },
    { label: 'Release / Launch Info', value: product.launchInfo, icon: ShieldCheck },
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center p-2 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
    >
      <div className="relative w-full max-w-5xl my-4 rounded-3xl bg-[#111319] border border-white/15 text-zinc-100 shadow-2xl overflow-hidden">
        {/* Top Breadcrumb & Close Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-4 bg-[#0B0C0E] border-b border-white/10">
          <nav aria-label="Product Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
            <button
              type="button"
              onClick={() => {
                onClose();
                onSelectBrand(product.brand);
              }}
              className="hover:text-amber-400 transition-colors cursor-pointer font-medium"
            >
              {product.brand} Smartphones
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
              {isCompared ? 'Added to Compare' : '+ Compare'}
            </button>
            <button
              type="button"
              onClick={() => onEditModelInAdmin(product)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              Edit Specs / Price
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

        {/* Main PDP Contiguous Purchase & Enquiry Module */}
        <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Large Studio Product Visual */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0B0C0E]">
              {product.productImage ? (
                <img
                  src={product.productImage}
                  alt={product.modelName}
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover"
                />
              ) : (
                <ProductPhoneStudioRender
                  variant={product.visualVariant}
                  brand={product.brand}
                />
              )}
            </div>

            <div className="p-4 rounded-xl bg-[#0B0C0E] border border-white/10 flex items-center justify-between text-xs text-zinc-400">
              <span>Store Inventory Status:</span>
              <span className="font-semibold text-amber-400">{product.availability}</span>
            </div>
          </div>

          {/* Right Column: Product Info, Variants & Main WhatsApp CTA */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                <span>{product.brand}</span>
                <span aria-hidden="true">·</span>
                <span>{product.series}</span>
                <span aria-hidden="true">·</span>
                <span>{product.network}</span>
              </div>
              <h2
                id="pdp-modal-title"
                className="mt-1.5 font-display text-2xl sm:text-3xl font-bold text-white"
              >
                {product.modelName}
              </h2>

              {/* Price / Check Price Display */}
              <div className="mt-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <span className="text-xs text-zinc-400 block">Store Price</span>
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
                      Check Price &amp; Current Store Offer
                    </span>
                  )}
                </div>
                <span className="text-xs text-zinc-400">
                  Availability: <strong className="text-white">{product.availability}</strong>
                </span>
              </div>
            </div>

            {/* RAM / Storage / Colour Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor="pdp-ram-select" className="block text-xs text-zinc-400 mb-1">
                  RAM Variant
                </label>
                <select
                  id="pdp-ram-select"
                  value={selectedRam}
                  onChange={(e) => setSelectedRam(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0B0C0E] border border-white/15 text-xs text-white"
                >
                  {product.ramOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="pdp-storage-select" className="block text-xs text-zinc-400 mb-1">
                  Storage Variant
                </label>
                <select
                  id="pdp-storage-select"
                  value={selectedStorage}
                  onChange={(e) => setSelectedStorage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0B0C0E] border border-white/15 text-xs text-white"
                >
                  {product.storageOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="pdp-color-select" className="block text-xs text-zinc-400 mb-1">
                  Available Colours
                </label>
                <select
                  id="pdp-color-select"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0B0C0E] border border-white/15 text-xs text-white"
                >
                  {product.colorOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="pdp-specific-model-input" className="block text-xs text-zinc-400 mb-1">
                Searching for an exact model number in {product.series}? (Optional)
              </label>
              <input
                id="pdp-specific-model-input"
                type="text"
                value={customModelNote}
                onChange={(e) => setCustomModelNote(e.target.value)}
                placeholder={`e.g., Specific ${product.brand} model, colour or GB variant...`}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0C0E] border border-white/15 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Main CTA: CHECK PRICE & AVAILABILITY */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm tracking-wide transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                CHECK PRICE &amp; AVAILABILITY
              </a>
              <a
                href={STORE_INFO.telHref}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                Call Now ({STORE_INFO.phoneDisplay})
              </a>
            </div>

            <div className="p-3 rounded-xl bg-[#0B0C0E] border border-white/10 text-[11px] text-zinc-400">
              <span className="text-zinc-300 font-medium">Auto-Generated WhatsApp Message: </span>
              &ldquo;{whatsappMessage}&rdquo;
            </div>
          </div>
        </div>

        {/* Full Specifications Section */}
        <div className="px-5 sm:px-8 pb-8 pt-4 border-t border-white/10">
          <h3 className="font-display text-lg font-bold text-white mb-4">
            Key Specifications &amp; Product Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {specRows.map((row) => (
              <div
                key={row.label}
                className="p-3.5 rounded-xl bg-[#0B0C0E] border border-white/10 flex items-start justify-between gap-4"
              >
                <span className="text-xs text-zinc-400 shrink-0">{row.label}</span>
                <span className="text-xs font-medium text-zinc-200 text-right">{row.value}</span>
              </div>
            ))}
          </div>

          {/* Compatible Accessories for This Model */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="font-display text-base font-bold text-white">
              Compatible Accessories for {product.modelName}
            </h4>
            <p className="mt-1 text-xs text-zinc-400">
              Enquire directly for cases, tempered glass, chargers and cables compatible with{' '}
              {product.modelName}.
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                ...compatibleAcc.cases.slice(0, 1),
                ...compatibleAcc.temperedGlass.slice(0, 1),
                ...compatibleAcc.chargers.slice(0, 1),
                ...compatibleAcc.cables.slice(0, 1),
              ].map((acc) => (
                <div
                  key={acc.id}
                  className="p-3.5 rounded-xl bg-[#0B0C0E] border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] text-amber-400 font-medium">{acc.category}</span>
                    <p className="mt-0.5 text-xs font-semibold text-white">{acc.productName}</p>
                  </div>
                  <a
                    href={buildWhatsAppUrl(
                      buildCatalogueProductWhatsAppMessage(acc.category, product.modelName)
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Ask for {product.brand} Fit
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
