import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Check, RotateCcw, Database, Upload, Image as ImageIcon } from 'lucide-react';
import {
  BrandDirectoryEntry,
  SmartphoneProduct,
  AccessoryCatalogueItem,
  InventoryStatus,
  ProductGalleryImages,
  GALLERY_ANGLE_DEFINITIONS,
  addBrandToDirectory,
  deleteBrandFromDirectory,
  upsertSmartphoneModel,
  upsertAccessoryItem,
  deleteSmartphoneModel,
  exportSmartphonesToCsv,
  importSmartphonesFromCsvOrJson,
} from '../utils/storeLogic';
import { OriginalProductImageFrame } from './catalogue/OriginalProductImageFrame';

interface AdminCatalogueModalProps {
  isOpen: boolean;
  onClose: () => void;
  brands: BrandDirectoryEntry[];
  catalogue: SmartphoneProduct[];
  accessories: AccessoryCatalogueItem[];
  initialEditProduct: SmartphoneProduct | null;
  onUpdateStoreData: (newBrands: BrandDirectoryEntry[], newCatalogue: SmartphoneProduct[]) => void;
  onUpdateAccessories: (newAccessories: AccessoryCatalogueItem[]) => void;
  onResetAllToDefault: () => void;
}

export const AdminCatalogueModal: React.FC<AdminCatalogueModalProps> = ({
  isOpen,
  onClose,
  brands,
  catalogue,
  accessories,
  initialEditProduct,
  onUpdateStoreData,
  onUpdateAccessories,
  onResetAllToDefault,
}) => {
  const [activeTab, setActiveTab] = useState<'models' | 'accessories' | 'brands' | 'import'>(
    'models'
  );

  // Model Form State
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [brandName, setBrandName] = useState(brands[0]?.name || 'vivo');
  const [modelName, setModelName] = useState('');
  const [seriesName, setSeriesName] = useState('');
  const [variantStr, setVariantStr] = useState('');
  const [mopPriceStr, setMopPriceStr] = useState('');
  const [dealerPriceStr, setDealerPriceStr] = useState('');
  const [effectivePriceStr, setEffectivePriceStr] = useState('');
  const [sourceStr, setSourceStr] = useState('Official Price List');
  const [lastUpdatedStr, setLastUpdatedStr] = useState('April 2026');
  const [productImage, setProductImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<ProductGalleryImages>({});
  const [displaySpec, setDisplaySpec] = useState('');
  const [processorSpec, setProcessorSpec] = useState('');
  const [ramCsv, setRamCsv] = useState('');
  const [storageCsv, setStorageCsv] = useState('');
  const [colorsCsv, setColorsCsv] = useState('');
  const [rearCamera, setRearCamera] = useState('');
  const [batterySpec, setBatterySpec] = useState('');
  const [priceStr, setPriceStr] = useState('');
  const [availability, setAvailability] = useState<InventoryStatus>('Check Availability');
  const [formNotice, setFormNotice] = useState('');
  const [formError, setFormError] = useState('');

  // Accessory Image Upload Form State
  const [selectedAccessoryId, setSelectedAccessoryId] = useState<string>(
    accessories[0]?.id || 'acc-mobile-covers'
  );
  const [accessoryImageUrl, setAccessoryImageUrl] = useState('');
  const [accessoryPriceStr, setAccessoryPriceStr] = useState('');
  const [accessoryAvailability, setAccessoryAvailability] =
    useState<InventoryStatus>('Check Availability');

  // Brand Form State
  const [newBrandInput, setNewBrandInput] = useState('');
  const [newBrandNote, setNewBrandNote] = useState('');
  const [newBrandSeriesCsv, setNewBrandSeriesCsv] = useState('');

  // JSON Import / Export State
  const [jsonBuffer, setJsonBuffer] = useState('');

  useEffect(() => {
    if (initialEditProduct) {
      setActiveTab('models');
      setEditingId(initialEditProduct.id);
      setBrandName(initialEditProduct.brand);
      setModelName(initialEditProduct.model || initialEditProduct.modelName);
      setSeriesName(initialEditProduct.series);
      setVariantStr(initialEditProduct.variant || '');
      setMopPriceStr(initialEditProduct.mopPrice || '');
      setDealerPriceStr(initialEditProduct.dealerPrice || '');
      setEffectivePriceStr(initialEditProduct.effectivePrice || '');
      setSourceStr(initialEditProduct.source || 'Official Price List');
      setLastUpdatedStr(initialEditProduct.lastUpdated || 'April 2026');
      setProductImage(initialEditProduct.productImage || '');
      setGalleryImages(initialEditProduct.galleryImages || {});
      setDisplaySpec(initialEditProduct.display);
      setProcessorSpec(initialEditProduct.processor);
      setRamCsv(initialEditProduct.ramOptions.join(', '));
      setStorageCsv(initialEditProduct.storageOptions.join(', '));
      setColorsCsv(initialEditProduct.colorOptions.join(', '));
      setRearCamera(initialEditProduct.rearCamera);
      setBatterySpec(initialEditProduct.battery);
      setPriceStr(initialEditProduct.price !== null ? String(initialEditProduct.price) : '');
      setAvailability(initialEditProduct.availability);
    } else {
      setEditingId(undefined);
      setModelName('');
      setSeriesName('');
      setVariantStr('');
      setMopPriceStr('');
      setDealerPriceStr('');
      setEffectivePriceStr('');
      setSourceStr('Official Price List');
      setLastUpdatedStr('April 2026');
      setProductImage('');
      setGalleryImages({});
      setPriceStr('');
      setAvailability('Check Availability');
    }
    setFormNotice('');
    setFormError('');
  }, [initialEditProduct, isOpen]);

  useEffect(() => {
    const foundAcc = accessories.find((a) => a.id === selectedAccessoryId);
    if (foundAcc) {
      setAccessoryImageUrl(foundAcc.productImage || '');
      setAccessoryPriceStr(foundAcc.price !== null ? String(foundAcc.price) : '');
      setAccessoryAvailability(foundAcc.availability);
    }
  }, [selectedAccessoryId, accessories]);

  if (!isOpen) return null;

  const handleImageFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onLoaded: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onLoaded(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveModel = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = priceStr.trim() ? Number(priceStr.trim()) : null;
    if (priceStr.trim() && Number.isNaN(numericPrice)) {
      setFormError('Price must be a valid number or left blank for "Check Price".');
      return;
    }

    const res = upsertSmartphoneModel(catalogue, {
      id: editingId,
      brand: brandName,
      modelName,
      series: seriesName || `${brandName} Series`,
      variant: variantStr,
      mopPrice: mopPriceStr,
      dealerPrice: dealerPriceStr,
      effectivePrice: effectivePriceStr,
      source: sourceStr,
      lastUpdated: lastUpdatedStr,
      productImage,
      galleryImages,
      display: displaySpec,
      processor: processorSpec,
      ramCsv,
      storageCsv,
      colorsCsv,
      rearCamera,
      battery: batterySpec,
      price: numericPrice,
      availability,
    });

    if (!res.ok) {
      setFormError(res.error);
      return;
    }

    onUpdateStoreData(brands, res.catalogue);
    setFormError('');
    setFormNotice(
      editingId
        ? `Updated "${res.item.modelName}" across the price-list catalogue.`
        : `Added "${res.item.modelName}" to the price-list catalogue.`
    );
    if (!editingId) {
      setModelName('');
      setSeriesName('');
      setVariantStr('');
      setMopPriceStr('');
      setDealerPriceStr('');
      setEffectivePriceStr('');
      setProductImage('');
      setGalleryImages({});
      setPriceStr('');
    }
  };

  const handleSaveAccessoryImage = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = accessoryPriceStr.trim() ? Number(accessoryPriceStr.trim()) : null;
    if (accessoryPriceStr.trim() && Number.isNaN(numericPrice)) {
      setFormError('Accessory price must be a valid number or left blank for "Check Price".');
      return;
    }

    const res = upsertAccessoryItem(accessories, {
      id: selectedAccessoryId,
      productImage: accessoryImageUrl,
      price: numericPrice,
      availability: accessoryAvailability,
    });

    if (!res.ok) {
      setFormError(res.error);
      return;
    }

    onUpdateAccessories(res.accessories);
    setFormError('');
    setFormNotice(`Updated original product photo & details for "${res.item.productName}".`);
  };

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    const res = addBrandToDirectory(brands, catalogue, {
      name: newBrandInput,
      originNote: newBrandNote,
      seriesCsv: newBrandSeriesCsv,
    });
    if (!res.ok) {
      setFormError(res.error);
      return;
    }
    onUpdateStoreData(res.brands, res.catalogue);
    setNewBrandInput('');
    setNewBrandNote('');
    setNewBrandSeriesCsv('');
    setFormError('');
    setFormNotice(`Added brand "${newBrandInput}" and its series to the directory.`);
  };

  const handleDeleteBrand = (targetBrandName: string) => {
    const after = deleteBrandFromDirectory(brands, catalogue, targetBrandName);
    onUpdateStoreData(after.brands, after.catalogue);
    setFormNotice(`Removed brand "${targetBrandName}" from directory.`);
  };

  const handleDeleteModel = (id: string, title: string) => {
    const updated = deleteSmartphoneModel(catalogue, id);
    onUpdateStoreData(brands, updated);
    setFormNotice(`Removed "${title}" from catalogue.`);
  };

  const handleExportJson = () => {
    const structuredEntries = catalogue.map((p) => ({
      brand: p.brand,
      series: p.series,
      model: p.model,
      variant: p.variant,
      colors: p.colors,
      mopPrice: p.mopPrice,
      dealerPrice: p.dealerPrice,
      effectivePrice: p.effectivePrice,
      source: p.source,
      lastUpdated: p.lastUpdated,
    }));
    setJsonBuffer(JSON.stringify(structuredEntries, null, 2));
    setFormError('');
    setFormNotice(
      'Generated centralized JSON export (brand, series, model, variant, colors, mopPrice, dealerPrice, effectivePrice, source, lastUpdated).'
    );
  };

  const handleExportCsv = () => {
    setJsonBuffer(exportSmartphonesToCsv(catalogue));
    setFormError('');
    setFormNotice(
      'Generated CSV export with price-list fields (id, brand, series, model, variant, colors, mopPrice, dealerPrice, effectivePrice, source, lastUpdated).'
    );
  };

  const handleImportDataset = () => {
    const trimmed = jsonBuffer.trim();
    if (!trimmed) {
      setFormError('Please paste a JSON or CSV dataset first.');
      return;
    }

    // Check if full store backup object { brands, catalogue }
    if (trimmed.startsWith('{')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed.brands) && Array.isArray(parsed.catalogue)) {
          onUpdateStoreData(parsed.brands, parsed.catalogue);
          setFormNotice(
            `Imported ${parsed.brands.length} brands and ${parsed.catalogue.length} models from JSON.`
          );
          setFormError('');
          return;
        }
      } catch {
        // Fall through to importSmartphonesFromCsvOrJson
      }
    }

    const res = importSmartphonesFromCsvOrJson(trimmed, catalogue);
    if (!res.ok) {
      setFormError(res.error);
      return;
    }

    onUpdateStoreData(brands, res.catalogue);
    setFormError('');
    setFormNotice(`Imported / updated ${res.importedCount} price-list smartphone entries into the catalogue.`);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-catalogue-title"
    >
      <div className="relative w-full max-w-5xl my-4 rounded-3xl bg-[#12141C] border border-white/15 text-zinc-100 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-[#0B0C0E] border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-amber-400" />
            <div>
              <h3 id="admin-catalogue-title" className="font-display text-lg font-bold text-white">
                Original Product Image &amp; Catalogue Manager
              </h3>
              <p className="text-xs text-zinc-400">
                Upload Original Product Images · {brands.length} Brands · {catalogue.length} Models
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetAllToDefault}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Seed Data
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close catalogue manager"
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-4 border-b border-white/10 flex flex-wrap items-center gap-2 bg-[#0F1117]">
          {(
            [
              {
                id: 'models',
                label: editingId
                  ? 'Upload Original Image & Edit Model'
                  : 'Upload Original Image & Add Model',
              },
              { id: 'accessories', label: 'Accessories Original Photos (16)' },
              { id: 'brands', label: `Manage Brands (${brands.length})` },
              { id: 'import', label: 'Bulk JSON / CSV Dataset Import & Export' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setActiveTab(t.id);
                setFormError('');
                setFormNotice('');
              }}
              className={`px-4 py-2.5 rounded-t-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === t.id
                  ? 'bg-[#12141C] text-amber-400 border-t border-x border-white/15'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-6">
          {formError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300">
              {formError}
            </div>
          )}
          {formNotice && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              {formNotice}
            </div>
          )}

          {activeTab === 'models' && (
            <div className="space-y-6">
              <form onSubmit={handleSaveModel} className="space-y-6">
                {/* STEP 1: UPLOAD ORIGINAL PRODUCT IMAGE & 6-ANGLE GALLERY */}
                <div className="p-5 rounded-2xl bg-[#0B0C0E] border border-white/10 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                        Step 1 · Original Product Image System
                      </span>
                      <h4 className="font-display text-sm sm:text-base font-bold text-white">
                        Upload Original Product Image &amp; Multi-Angle Gallery
                      </h4>
                      <p className="text-xs text-zinc-400">
                        Original images are displayed unmodified (`object-contain`) with zero AI substitution.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                    {/* Live Preview of Original Image */}
                    <div className="lg:col-span-4 rounded-xl overflow-hidden border border-white/10">
                      <OriginalProductImageFrame
                        imageSrc={productImage || galleryImages.front}
                        altText={modelName || 'Product preview'}
                        brandLabel={brandName}
                        modelOrCategoryLabel={modelName || 'Original Photo Preview'}
                        angleLabel="Primary / Front"
                        theme="dark"
                        showViewDetailsHint={false}
                      />
                    </div>

                    {/* Primary Image File Upload + URL + 6 Angle Inputs */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor="admin-primary-image-url"
                            className="block text-xs font-semibold text-zinc-300 mb-1"
                          >
                            Primary Original Image URL (`productImage`)
                          </label>
                          <input
                            id="admin-primary-image-url"
                            type="text"
                            value={productImage}
                            onChange={(e) => setProductImage(e.target.value)}
                            placeholder="Paste original product photo URL or upload file..."
                            className="w-full px-3 py-2 rounded-xl bg-[#141720] border border-white/15 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="admin-primary-image-file"
                            className="block text-xs font-semibold text-zinc-300 mb-1"
                          >
                            Or Upload Original Photo From Device
                          </label>
                          <label
                            htmlFor="admin-primary-image-file"
                            className="w-full px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-300 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Choose Original Image File</span>
                            <input
                              id="admin-primary-image-file"
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleImageFileUpload(e, (dataUrl) => setProductImage(dataUrl))
                              }
                              className="sr-only"
                            />
                          </label>
                        </div>
                      </div>

                      {/* 6 Multi-Angle Original Gallery Inputs: Front, Back, Side, Camera, Display, Box / Package */}
                      <div className="pt-2 border-t border-white/10">
                        <span className="block text-xs font-semibold text-zinc-300 mb-2">
                          Multi-Angle Original Gallery (`galleryImages`: Front, Back, Side, Camera, Display, Box / Package)
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                          {GALLERY_ANGLE_DEFINITIONS.map((angleDef) => (
                            <div
                              key={angleDef.key}
                              className="p-2.5 rounded-xl bg-[#141720] border border-white/10 space-y-1.5"
                            >
                              <div className="flex items-center justify-between gap-1">
                                <label
                                  htmlFor={`gallery-angle-${angleDef.key}`}
                                  className="text-[11px] font-semibold text-amber-400"
                                >
                                  {angleDef.label}
                                </label>
                                <label
                                  htmlFor={`gallery-file-${angleDef.key}`}
                                  className="text-[10px] text-zinc-300 hover:text-white underline cursor-pointer"
                                >
                                  Upload File
                                  <input
                                    id={`gallery-file-${angleDef.key}`}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageFileUpload(e, (dataUrl) =>
                                        setGalleryImages((prev) => ({
                                          ...prev,
                                          [angleDef.key]: dataUrl,
                                        }))
                                      )
                                    }
                                    className="sr-only"
                                  />
                                </label>
                              </div>
                              <input
                                id={`gallery-angle-${angleDef.key}`}
                                type="text"
                                value={galleryImages[angleDef.key] || ''}
                                onChange={(e) =>
                                  setGalleryImages((prev) => ({
                                    ...prev,
                                    [angleDef.key]: e.target.value,
                                  }))
                                }
                                placeholder={`${angleDef.label} image URL`}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-[#0B0C0E] border border-white/10 text-[11px] text-white"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 2: ENTER PRODUCT DETAILS */}
                <div className="p-5 rounded-2xl bg-[#0B0C0E] border border-white/10 space-y-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                      Step 2 · Enter Product Details
                    </span>
                    <h4 className="font-display text-sm sm:text-base font-bold text-white">
                      Brand, Model, Variants, Specifications &amp; Availability
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="admin-brand-select" className="block text-xs text-zinc-400 mb-1">
                        Brand (`brand`)
                      </label>
                      <select
                        id="admin-brand-select"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#141720] border border-white/15 text-xs text-white"
                      >
                        {brands.map((b) => (
                          <option key={b.id} value={b.name}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="admin-model-name" className="block text-xs text-zinc-400 mb-1">
                        Product / Model Name (`productName` / `model`) *
                      </label>
                      <input
                        id="admin-model-name"
                        type="text"
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                        placeholder="e.g., Samsung Galaxy S24 Ultra"
                        className="w-full px-3 py-2 rounded-xl bg-[#141720] border border-white/15 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="admin-series-name" className="block text-xs text-zinc-400 mb-1">
                        Series
                      </label>
                      <input
                        id="admin-series-name"
                        type="text"
                        value={seriesName}
                        onChange={(e) => setSeriesName(e.target.value)}
                        placeholder="e.g., Galaxy S Series"
                        className="w-full px-3 py-2 rounded-xl bg-[#141720] border border-white/15 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="admin-price-input" className="block text-xs text-zinc-400 mb-1">
                        Price in ₹ (`price` · Blank = Check Price)
                      </label>
                      <input
                        id="admin-price-input"
                        type="text"
                        value={priceStr}
                        onChange={(e) => setPriceStr(e.target.value)}
                        placeholder="Leave blank for Check Price"
                        className="w-full px-3 py-2 rounded-xl bg-[#141720] border border-white/15 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="admin-availability-select" className="block text-xs text-zinc-400 mb-1">
                        Availability (`availability`)
                      </label>
                      <select
                        id="admin-availability-select"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value as InventoryStatus)}
                        className="w-full px-3 py-2 rounded-xl bg-[#141720] border border-white/15 text-xs text-white"
                      >
                        <option value="Check Availability">Check Availability (Default)</option>
                        <option value="Available">Available (Verified In Stock)</option>
                        <option value="Enquire">Enquire</option>
                        <option value="Coming Soon">Coming Soon</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="admin-colors-input" className="block text-xs text-zinc-400 mb-1">
                        Colors (`colors` CSV)
                      </label>
                      <input
                        id="admin-colors-input"
                        type="text"
                        value={colorsCsv}
                        onChange={(e) => setColorsCsv(e.target.value)}
                        placeholder="e.g., Titanium Gray, Titanium Black"
                        className="w-full px-3 py-2 rounded-xl bg-[#141720] border border-white/15 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="admin-ram-input" className="block text-xs text-zinc-400 mb-1">
                        RAM Variants (`ramVariants` CSV)
                      </label>
                      <input
                        id="admin-ram-input"
                        type="text"
                        value={ramCsv}
                        onChange={(e) => setRamCsv(e.target.value)}
                        placeholder="e.g., 8GB, 12GB"
                        className="w-full px-3 py-2 rounded-xl bg-[#141720] border border-white/15 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="admin-storage-input" className="block text-xs text-zinc-400 mb-1">
                        Storage Variants (`storageVariants` CSV)
                      </label>
                      <input
                        id="admin-storage-input"
                        type="text"
                        value={storageCsv}
                        onChange={(e) => setStorageCsv(e.target.value)}
                        placeholder="e.g., 128GB, 256GB, 512GB"
                        className="w-full px-3 py-2 rounded-xl bg-[#141720] border border-white/15 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="admin-display-input" className="block text-xs text-zinc-400 mb-1">
                        Display Specification
                      </label>
                      <input
                        id="admin-display-input"
                        type="text"
                        value={displaySpec}
                        onChange={(e) => setDisplaySpec(e.target.value)}
                        placeholder="Details available on enquiry"
                        className="w-full px-3 py-2 rounded-xl bg-[#141720] border border-white/15 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    {editingId ? 'Save Original Images & Model Changes' : 'Add Smartphone Model'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(undefined);
                        setModelName('');
                        setSeriesName('');
                        setProductImage('');
                        setGalleryImages({});
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white/10 text-xs text-white cursor-pointer"
                    >
                      Switch to Add New Model
                    </button>
                  )}
                </div>
              </form>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs font-semibold text-zinc-300 mb-3">
                  Catalogue Entries — Click any model to upload/edit its original photos ({catalogue.length} total)
                </p>
                <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                  {catalogue.slice(0, 25).map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-[#0B0C0E] border border-white/10 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          {item.productImage ? (
                            <img
                              src={item.productImage}
                              alt={item.modelName}
                              className="w-6 h-6 object-contain"
                            />
                          ) : (
                            <ImageIcon className="w-3.5 h-3.5 text-zinc-500" />
                          )}
                        </span>
                        <div className="truncate">
                          <span className="font-semibold text-white">{item.modelName}</span>
                          <span className="text-zinc-400 ml-2">
                            ({item.brand} · {item.series} ·{' '}
                            {item.productImage ? 'Original Photo Uploaded' : 'Image Coming Soon'})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(item.id);
                            setBrandName(item.brand);
                            setModelName(item.modelName);
                            setSeriesName(item.series);
                            setProductImage(item.productImage || '');
                            setGalleryImages(item.galleryImages || {});
                            setDisplaySpec(item.display);
                            setProcessorSpec(item.processor);
                            setRamCsv(item.ramOptions.join(', '));
                            setStorageCsv(item.storageOptions.join(', '));
                            setColorsCsv(item.colorOptions.join(', '));
                            setPriceStr(item.price !== null ? String(item.price) : '');
                            setAvailability(item.availability);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-[11px] font-semibold text-amber-300 cursor-pointer"
                        >
                          Edit / Upload Photo
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteModel(item.id, item.modelName)}
                          aria-label={`Delete ${item.modelName}`}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'accessories' && (
            <form onSubmit={handleSaveAccessoryImage} className="space-y-5">
              <div className="p-5 rounded-2xl bg-[#0B0C0E] border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                <div className="lg:col-span-4 rounded-xl overflow-hidden border border-white/10">
                  <OriginalProductImageFrame
                    imageSrc={accessoryImageUrl}
                    altText="Accessory preview"
                    brandLabel="Accessory"
                    modelOrCategoryLabel={
                      accessories.find((a) => a.id === selectedAccessoryId)?.productName ||
                      'Accessory'
                    }
                    theme="dark"
                    showViewDetailsHint={false}
                  />
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <div>
                    <label
                      htmlFor="admin-accessory-select"
                      className="block text-xs font-semibold text-zinc-300 mb-1"
                    >
                      Select Accessory Category Item
                    </label>
                    <select
                      id="admin-accessory-select"
                      value={selectedAccessoryId}
                      onChange={(e) => setSelectedAccessoryId(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#141720] border border-white/15 text-xs text-white"
                    >
                      {accessories.map((acc) => (
                        <option key={acc.id} value={acc.id}>
                          {acc.category} — {acc.productName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="admin-accessory-image-url"
                        className="block text-xs text-zinc-400 mb-1"
                      >
                        Original Accessory Image URL (`productImage`)
                      </label>
                      <input
                        id="admin-accessory-image-url"
                        type="text"
                        value={accessoryImageUrl}
                        onChange={(e) => setAccessoryImageUrl(e.target.value)}
                        placeholder="Paste original accessory image URL..."
                        className="w-full px-3 py-2 rounded-xl bg-[#141720] border border-white/15 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="admin-accessory-image-file"
                        className="block text-xs text-zinc-400 mb-1"
                      >
                        Or Upload Original Accessory Photo
                      </label>
                      <label
                        htmlFor="admin-accessory-image-file"
                        className="w-full px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-300 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Accessory Image File</span>
                        <input
                          id="admin-accessory-image-file"
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageFileUpload(e, (dataUrl) => setAccessoryImageUrl(dataUrl))
                          }
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="admin-accessory-price"
                        className="block text-xs text-zinc-400 mb-1"
                      >
                        Price in ₹ (Blank = Check Price)
                      </label>
                      <input
                        id="admin-accessory-price"
                        type="text"
                        value={accessoryPriceStr}
                        onChange={(e) => setAccessoryPriceStr(e.target.value)}
                        placeholder="Leave blank for Check Price"
                        className="w-full px-3 py-2 rounded-xl bg-[#141720] border border-white/15 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="admin-accessory-availability"
                        className="block text-xs text-zinc-400 mb-1"
                      >
                        Availability
                      </label>
                      <select
                        id="admin-accessory-availability"
                        value={accessoryAvailability}
                        onChange={(e) =>
                          setAccessoryAvailability(e.target.value as InventoryStatus)
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#141720] border border-white/15 text-xs text-white"
                      >
                        <option value="Check Availability">Check Availability</option>
                        <option value="Available">Available</option>
                        <option value="Enquire">Enquire</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    Save Original Accessory Photo &amp; Details
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'brands' && (
            <div className="space-y-6">
              <form onSubmit={handleAddBrand} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={newBrandInput}
                  onChange={(e) => setNewBrandInput(e.target.value)}
                  placeholder="New Brand Name (e.g., Meizu)"
                  className="px-3.5 py-2.5 rounded-xl bg-[#0B0C0E] border border-white/15 text-xs text-white"
                />
                <input
                  type="text"
                  value={newBrandNote}
                  onChange={(e) => setNewBrandNote(e.target.value)}
                  placeholder="Subtitle (e.g., 5G Smartphones)"
                  className="px-3.5 py-2.5 rounded-xl bg-[#0B0C0E] border border-white/15 text-xs text-white"
                />
                <input
                  type="text"
                  value={newBrandSeriesCsv}
                  onChange={(e) => setNewBrandSeriesCsv(e.target.value)}
                  placeholder="Series CSV (e.g., Pro Series, Note Series)"
                  className="px-3.5 py-2.5 rounded-xl bg-[#0B0C0E] border border-white/15 text-xs text-white"
                />
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-semibold text-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Add Brand to Directory
                  </button>
                </div>
              </form>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-64 overflow-y-auto pr-1">
                {brands.map((b) => (
                  <div
                    key={b.id}
                    className="p-3 rounded-xl bg-[#0B0C0E] border border-white/10 flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="truncate">
                      <p className="font-semibold text-white truncate">{b.name}</p>
                      <p className="text-[10px] text-zinc-500">{b.seriesList.length} series</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteBrand(b.name)}
                      aria-label={`Delete brand ${b.name}`}
                      className="p-1 text-zinc-500 hover:text-rose-400 cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'import' && (
            <div className="space-y-4">
              <p className="text-xs text-zinc-400">
                Import or export structured <strong>JSON</strong> or <strong>CSV</strong> datasets
                (`id, brand, series, model, modelNumber, generation, image, sourceUrl, specifications, variants, price, availability`)
                to manage hundreds or thousands of verified smartphone models without changing code.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white cursor-pointer"
                >
                  Export Sample JSON
                </button>
                <button
                  type="button"
                  onClick={handleExportCsv}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white cursor-pointer"
                >
                  Export Sample CSV
                </button>
                <button
                  type="button"
                  onClick={handleImportDataset}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-semibold text-zinc-950 cursor-pointer"
                >
                  Import JSON / CSV Dataset
                </button>
              </div>
              <textarea
                rows={9}
                value={jsonBuffer}
                onChange={(e) => setJsonBuffer(e.target.value)}
                placeholder='Paste JSON array/object OR CSV with header: id,brand,series,model,modelNumber,generation,image,sourceUrl,ram,storage,colors,network,price,availability'
                className="w-full p-3.5 rounded-xl bg-[#0B0C0E] border border-white/15 font-mono text-xs text-zinc-300"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
