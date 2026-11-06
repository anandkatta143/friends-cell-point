/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Menu,
  X,
  Search,
  SlidersHorizontal,
  Database,
  Layers,
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  Smartphone,
  Headphones,
  Sparkles,
} from 'lucide-react';
import {
  STORE_INFO,
  MOBILE_CATEGORY_SLUGS,
  MobileCategorySlug,
  ACCESSORY_CATEGORY_NAMES,
  AccessoryCategoryName,
  HOMEPAGE_POPULAR_SEARCH_CHIPS,
  HOMEPAGE_MOBILE_CATEGORIES,
  HOMEPAGE_ACCESSORY_ENTRY_TILES,
  INITIAL_OFFER_CARDS,
  BrandDirectoryEntry,
  INITIAL_BRAND_DIRECTORY,
  SmartphoneProduct,
  INITIAL_SMARTPHONE_CATALOGUE,
  AccessoryCatalogueItem,
  INITIAL_ACCESSORIES_CATALOGUE,
  AdvancedMobileFilterState,
  DEFAULT_MOBILE_FILTER_STATE,
  SortOption,
  buildWhatsAppUrl,
  buildCatalogueProductWhatsAppMessage,
  buildTemperedGlassEnquiryUrl,
  filterAndSortSmartphoneCatalogue,
  getCompatibleAccessoriesForPhone,
  getSeriesDirectoryForBrand,
  resolveUniversalCatalogueSearch,
  auditSmartphoneCatalogue,
  PRICE_CHANGE_DISCLAIMER,
  searchAndFilterAccessories,
} from './utils/storeLogic';
import {
  HeroStudioPhone,
  TwsAudioStudioScene,
  TemperedGlassStudioScene,
  CompleteEcosystemScene,
  ShowroomArchitecturalScene,
} from './components/StudioVisuals';
import { BrandCard } from './components/catalogue/BrandCard';
import { SeriesCard } from './components/catalogue/SeriesCard';
import { ProductCard } from './components/catalogue/ProductCard';
import { ProductGrid } from './components/catalogue/ProductGrid';
import { ProductDetails } from './components/catalogue/ProductDetails';
import { SearchBar } from './components/catalogue/SearchBar';
import { FilterPanel } from './components/catalogue/FilterPanel';
import { ComparePanel } from './components/catalogue/ComparePanel';
import { AccessoryCard } from './components/catalogue/AccessoryCard';
import { OriginalProductImageFrame } from './components/catalogue/OriginalProductImageFrame';
import { WhatsAppButton } from './components/catalogue/WhatsAppButton';
import { AdminCatalogueModal } from './components/AdminCatalogueModal';
import { EnquiryModal, EnquiryTarget } from './components/EnquiryModal';
import { DirectionsModal } from './components/DirectionsModal';

const STORAGE_KEYS = {
  brandDirectory: 'fcp_brand_dir_v13',
  phoneCatalogue: 'fcp_phone_catalogue_v13',
  accessoriesCatalogue: 'fcp_accessories_catalogue_v13',
  mapsUrl: 'fcp_maps_url_v1',
};

export default function App() {
  // Navigation & Hero state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroFinish, setHeroFinish] = useState<'titanium' | 'obsidian' | 'pearl'>('titanium');
  const [showAllBrandsDirectory, setShowAllBrandsDirectory] = useState(true);
  const [brandSearchFilter, setBrandSearchFilter] = useState('');

  // Centralized Expandable Brand Directory & Smartphone Catalogue State
  const [brands, setBrands] = useState<BrandDirectoryEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.brandDirectory);
      return saved ? JSON.parse(saved) : INITIAL_BRAND_DIRECTORY;
    } catch {
      return INITIAL_BRAND_DIRECTORY;
    }
  });

  const [catalogue, setCatalogue] = useState<SmartphoneProduct[]>(() => {
    try {
      // Remove legacy storage keys that may have contained internal dealer price fields
      localStorage.removeItem('fcp_phone_catalogue_v11');
      localStorage.removeItem('fcp_phone_catalogue_v12');
      localStorage.removeItem('fcp_accessories_catalogue_v11');
      localStorage.removeItem('fcp_accessories_catalogue_v12');
      const saved = localStorage.getItem(STORAGE_KEYS.phoneCatalogue);
      return saved ? JSON.parse(saved) : INITIAL_SMARTPHONE_CATALOGUE;
    } catch {
      return INITIAL_SMARTPHONE_CATALOGUE;
    }
  });

  const [accessoriesCatalogue, setAccessoriesCatalogue] = useState<AccessoryCatalogueItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.accessoriesCatalogue);
      return saved ? JSON.parse(saved) : INITIAL_ACCESSORIES_CATALOGUE;
    } catch {
      return INITIAL_ACCESSORIES_CATALOGUE;
    }
  });

  // Advanced Search, Filter & Sort State
  const [filters, setFilters] = useState<AdvancedMobileFilterState>(DEFAULT_MOBILE_FILTER_STATE);
  const [activeCatalogueTab, setActiveCatalogueTab] = useState<'all' | 'featured' | 'latest'>('all');
  const [visibleCount, setVisibleCount] = useState(1000);
  const [mobileFilterDrawerOpen, setMobileFilterDrawerOpen] = useState(false);

  // Selected Accessory Category Filter
  const [selectedAccessoryCat, setSelectedAccessoryCat] = useState<AccessoryCategoryName | 'All'>(
    'All'
  );
  const [accessorySearchQuery, setAccessorySearchQuery] = useState('');

  // "FIND ACCESSORIES FOR YOUR PHONE" State
  const [finderBrand, setFinderBrand] = useState<string>('vivo');
  const [finderModel, setFinderModel] = useState<string>('Y05 4G (4+64GB)');
  const [finderCustomModel, setFinderCustomModel] = useState<string>('');

  // Product Detail Page (PDP), Comparison & Admin Modals
  const [selectedProductForPdp, setSelectedProductForPdp] = useState<SmartphoneProduct | null>(
    null
  );
  const [compareList, setCompareList] = useState<SmartphoneProduct[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminEditTarget, setAdminEditTarget] = useState<SmartphoneProduct | null>(null);
  const [activeEnquiryTarget, setActiveEnquiryTarget] = useState<EnquiryTarget | null>(null);

  // Google Maps & Contact Composer State
  const [configuredMapsUrl, setConfiguredMapsUrl] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.mapsUrl) || '';
    } catch {
      return '';
    }
  });
  const [directionsModalOpen, setDirectionsModalOpen] = useState(false);
  const [customEnquiryTopic, setCustomEnquiryTopic] = useState('mobile phones and accessories');
  const [customEnquiryDetails, setCustomEnquiryDetails] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.brandDirectory, JSON.stringify(brands));
    } catch {
      // Ignore storage quota errors
    }
  }, [brands]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.phoneCatalogue, JSON.stringify(catalogue));
    } catch {
      // Ignore storage quota errors
    }
  }, [catalogue]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.accessoriesCatalogue, JSON.stringify(accessoriesCatalogue));
    } catch {
      // Ignore storage quota errors
    }
  }, [accessoriesCatalogue]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.mapsUrl, configuredMapsUrl);
    } catch {
      // Ignore storage quota errors
    }
  }, [configuredMapsUrl]);

  // Real model count per brand and dynamic series count from connected catalogue data
  const modelCountByBrand = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of catalogue) {
      const key = item.brand.toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
    }
    return counts;
  }, [catalogue]);

  const catalogueAuditSummary = useMemo(
    () => auditSmartphoneCatalogue(brands, catalogue),
    [brands, catalogue]
  );
  const totalSeriesCount = catalogueAuditSummary.totalVerifiedSeries;

  // Derived active brand object for Brand Model Page
  const activeBrandObj = useMemo(
    () =>
      filters.brand !== 'All'
        ? brands.find((b) => b.name.toLowerCase() === filters.brand.toLowerCase()) || null
        : null,
    [brands, filters.brand]
  );

  // Derived Series Directory for the active brand (Brand -> Series -> Models)
  const activeBrandSeriesDirectory = useMemo(() => {
    if (!activeBrandObj) return [];
    return getSeriesDirectoryForBrand(activeBrandObj.name, brands, catalogue);
  }, [activeBrandObj, brands, catalogue]);

  // Filtered brands for ALL MOBILE BRANDS directory
  const displayedBrands = useMemo(() => {
    const base = showAllBrandsDirectory ? brands : brands.filter((b) => b.featured);
    const q = brandSearchFilter.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.originNote.toLowerCase().includes(q) ||
        b.seriesList.some((s) => s.toLowerCase().includes(q))
    );
  }, [brands, showAllBrandsDirectory, brandSearchFilter]);

  // Limited Homepage Preview for "LATEST SMARTPHONES"
  const homepageLatestSmartphones = useMemo(() => {
    const prioritized = catalogue.filter(
      (p) => p.productStatus === 'Latest' || p.productStatus === 'Featured'
    );
    return (prioritized.length >= 4 ? prioritized : catalogue).slice(0, 4);
  }, [catalogue]);

  // Filtered and sorted smartphone catalogue
  const matchingSmartphones = useMemo(() => {
    const base = filterAndSortSmartphoneCatalogue(catalogue, filters);
    if (activeCatalogueTab === 'featured') {
      return base.filter((p) => p.productStatus === 'Featured');
    }
    if (activeCatalogueTab === 'latest') {
      return base.filter((p) => p.productStatus === 'Latest' || p.productStatus === 'Featured');
    }
    return base;
  }, [catalogue, filters, activeCatalogueTab]);

  const displayedSmartphones = useMemo(
    () => matchingSmartphones.slice(0, visibleCount),
    [matchingSmartphones, visibleCount]
  );

  // Models for the "FIND ACCESSORIES FOR YOUR PHONE" Step 2 dropdown
  const finderBrandModels = useMemo(
    () => catalogue.filter((p) => p.brand.toLowerCase() === finderBrand.toLowerCase()),
    [catalogue, finderBrand]
  );

  useEffect(() => {
    if (finderBrandModels.length > 0) {
      setFinderModel(finderBrandModels[0].modelName);
    } else {
      setFinderModel(`${finderBrand} Smartphone`);
    }
  }, [finderBrand, finderBrandModels]);

  const effectiveFinderModelName = finderCustomModel.trim() || finderModel;
  const compatibleFinderResults = useMemo(
    () =>
      getCompatibleAccessoriesForPhone(
        accessoriesCatalogue,
        finderBrand,
        effectiveFinderModelName
      ),
    [accessoriesCatalogue, finderBrand, effectiveFinderModelName]
  );

  // Filtered Accessories Catalogue (search by brand, product name, and category)
  const filteredAccessoriesCatalogue = useMemo(() => {
    return searchAndFilterAccessories(
      accessoriesCatalogue,
      accessorySearchQuery,
      selectedAccessoryCat
    );
  }, [accessoriesCatalogue, selectedAccessoryCat, accessorySearchQuery]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Universal Search & Chip Handler (routes to Mobiles or Accessories)
  const handleUniversalSearchTrigger = (queryText: string) => {
    const resolved = resolveUniversalCatalogueSearch(queryText, brands);
    if (resolved.targetSection === 'accessories') {
      setSelectedAccessoryCat(resolved.accessoryCategory);
      setAccessorySearchQuery(resolved.searchQuery);
      scrollToSection('accessories');
      return;
    }

    setFilters({
      ...DEFAULT_MOBILE_FILTER_STATE,
      brand: resolved.brand,
      category: resolved.category,
      searchQuery: resolved.searchQuery,
    });
    setActiveCatalogueTab('all');
    setVisibleCount(1000);
    scrollToSection('catalogue');
  };

  const handleSelectBrandFromDirectory = (brandName: string) => {
    setFilters((prev) => ({
      ...prev,
      brand: brandName,
      series: 'All',
      generationFilter: 'All',
      category: 'All Smartphones',
      searchQuery: '',
    }));
    setActiveCatalogueTab('all');
    setVisibleCount(1000);
    scrollToSection('catalogue');
  };

  const handleSelectSeries = (brandName: string, seriesName: string) => {
    setFilters((prev) => ({
      ...prev,
      brand: brandName,
      series: seriesName,
      generationFilter: 'All',
    }));
    setActiveCatalogueTab('all');
    setVisibleCount(1000);
    scrollToSection('catalogue');
  };

  const handleSelectCategoryCard = (categorySlug: MobileCategorySlug) => {
    setFilters({
      ...DEFAULT_MOBILE_FILTER_STATE,
      category: categorySlug,
    });
    setActiveCatalogueTab('all');
    setVisibleCount(1000);
    scrollToSection('catalogue');
  };

  const handleSelectAccessoryCategoryTile = (categoryName: AccessoryCategoryName | 'All') => {
    setSelectedAccessoryCat(categoryName);
    setAccessorySearchQuery('');
    scrollToSection('accessories');
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_MOBILE_FILTER_STATE);
    setActiveCatalogueTab('all');
    setVisibleCount(1000);
  };

  const handleToggleCompare = (product: SmartphoneProduct) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), product];
      }
      return [...prev, product];
    });
  };

  const defaultWhatsAppHref = buildWhatsAppUrl();
  const askAboutProductWhatsAppHref = buildWhatsAppUrl(STORE_INFO.askAboutProductMessage);
  const temperedGlassWhatsAppHref = buildTemperedGlassEnquiryUrl();

  const composedContactWhatsAppUrl = buildWhatsAppUrl(
    customEnquiryDetails.trim()
      ? `Hello Friends Cell Point, I would like to enquire about ${customEnquiryTopic}: ${customEnquiryDetails.trim()}`
      : `Hello Friends Cell Point, I would like to enquire about ${customEnquiryTopic}.`
  );

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Shop Mobiles', href: '#catalogue' },
    { label: 'All Brands', href: '#brands' },
    { label: 'Accessories', href: '#accessories' },
    { label: 'Find Accessories', href: '#accessory-finder' },
    { label: 'Store Offers', href: '#store-offers' },
    { label: 'Visit Store', href: '#visit-store' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0C0E] text-[#F5F5F7] pb-16 md:pb-0 overflow-x-hidden">
      {/* ==================================================
          STICKY PREMIUM HEADER
         ================================================== */}
      <header className="sticky top-0 z-40 h-14 sm:h-16 bg-[#0B0C0E]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <a
            href="#home"
            className="font-display text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            {STORE_INFO.name}
          </a>

          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-5 text-sm font-medium text-zinc-300"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setAdminEditTarget(null);
                setAdminModalOpen(true);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Database className="w-3.5 h-3.5 text-amber-400" />
              Manage Catalogue
            </button>

            <a
              href={STORE_INFO.telHref}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-zinc-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              Call Now
            </a>

            <a
              href={askAboutProductWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-zinc-950 bg-amber-500 hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Ask About a Product
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="xl:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#111318] border-b border-white/15 px-4 pt-3 pb-5 shadow-2xl">
            <nav aria-label="Mobile Navigation" className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-200 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAdminEditTarget(null);
                  setAdminModalOpen(true);
                }}
                className="w-full py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-amber-400 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Database className="w-3.5 h-3.5" />
                Manage Catalogue ({brands.length} Brands · {catalogue.length} Models)
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* ==================================================
            PRIORITY 1: HERO SECTION + SEARCH ENTRY POINT + POPULAR SEARCH CHIPS
           ================================================== */}
        <section
          id="home"
          className="relative flex items-center bg-[#0B0C0E] overflow-hidden py-10 lg:py-14"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 75% 35%, rgba(245, 158, 11, 0.09) 0%, rgba(11, 12, 14, 0) 60%)',
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7 text-left">
                <p className="text-xs sm:text-sm font-medium tracking-wide text-amber-400">
                  {STORE_INFO.name} · {STORE_INFO.shortLocation}
                </p>

                <h1
                  className="mt-3 font-display font-bold tracking-tight text-white leading-[1.06]"
                  style={{
                    fontSize: 'clamp(2.25rem, 4.3vw, 3.85rem)',
                    textWrap: 'balance',
                  }}
                >
                  YOUR NEXT PHONE
                  <br />
                  <span className="text-zinc-300">STARTS HERE.</span>
                </h1>

                <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl">
                  Explore the latest smartphones, mobile accessories, TWS earbuds, tempered glass
                  and charging solutions across{' '}
                  <strong className="text-white">{brands.length} mobile brands</strong> and{' '}
                  <strong className="text-white">{catalogue.length} verified models</strong> at
                  Friends Cell Point.
                </p>

                {/* Major Search Entry Point */}
                <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#141720] border border-white/15 shadow-2xl max-w-2xl">
                  <span className="block text-xs font-semibold text-amber-400 mb-2">
                    Search Mobiles, Brands, Models or Accessories
                  </span>

                  <SearchBar
                    inputId="hero-global-search"
                    variant="hero"
                    value={filters.searchQuery}
                    onChange={(q) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
                    brands={brands}
                    catalogue={catalogue}
                    onSelectBrandSuggestion={(brandName) =>
                      handleSelectBrandFromDirectory(brandName)
                    }
                    onSelectSeriesSuggestion={(brandName, seriesName) =>
                      handleSelectSeries(brandName, seriesName)
                    }
                    onSelectProductSuggestion={(prod) => setSelectedProductForPdp(prod)}
                    onSelectAccessorySuggestion={(accCat) =>
                      handleSelectAccessoryCategoryTile(accCat)
                    }
                    onSubmitSearch={(q) => handleUniversalSearchTrigger(q ?? filters.searchQuery)}
                  />

                  {/* Popular Searches Clickable Chips */}
                  <div className="mt-3.5 pt-3 border-t border-white/10">
                    <span className="block text-[11px] font-medium text-zinc-400 mb-2">
                      Popular Searches:
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {HOMEPAGE_POPULAR_SEARCH_CHIPS.map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => handleUniversalSearchTrigger(chip)}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-amber-500 text-zinc-200 hover:text-zinc-950 text-xs font-medium transition-colors cursor-pointer border border-white/10 hover:border-amber-400"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary Hero CTAs */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#shop-entry"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs sm:text-sm font-bold transition-colors"
                  >
                    Explore Mobiles &amp; Accessories
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a
                    href={askAboutProductWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-xs sm:text-sm font-semibold text-white transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    Ask About a Product
                  </a>
                  <button
                    type="button"
                    onClick={() => setDirectionsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs sm:text-sm font-medium text-zinc-200 transition-colors cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-sky-400" />
                    {STORE_INFO.city} Store
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 flex items-center justify-center">
                <HeroStudioPhone
                  activeFinish={heroFinish}
                  onSelectFinish={(finish) => setHeroFinish(finish)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            PRIORITY 2 & 3: PRIMARY CATALOGUE ENTRY
            "SHOP MOBILES & ACCESSORIES" (Two Large Premium Cards)
           ================================================== */}
        <section
          id="shop-entry"
          className="bg-[#111319] text-white py-14 lg:py-18 border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Primary Store Catalogue
                </p>
                <h2 className="mt-1 font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
                  SHOP MOBILES &amp; ACCESSORIES
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
                Choose a department below to browse smartphones from all major mobile brands or
                explore mobile accessories.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card 1: SMARTPHONES */}
              <div className="group relative rounded-3xl bg-gradient-to-br from-[#181C26] to-[#101218] border border-white/15 hover:border-amber-400/50 p-6 sm:p-8 flex flex-col justify-between transition-all shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-7 space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold">
                      <Smartphone className="w-3.5 h-3.5" />
                      01 · SMARTPHONES
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                      SMARTPHONES
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      Explore smartphones from leading mobile brands.
                    </p>
                    <p className="text-xs text-zinc-400">
                      {brands.length} Brands · {totalSeriesCount} Series · {catalogue.length} Models ·
                      5G, Budget, Mid-Range &amp; Flagships
                    </p>
                  </div>

                  <div className="sm:col-span-5 rounded-2xl overflow-hidden border border-white/10 bg-[#0B0C0E]">
                    <OriginalProductImageFrame
                      imageSrc={catalogue.find((p) => Boolean(p.productImage))?.productImage}
                      altText="Smartphones Catalogue"
                      brandLabel="Smartphones"
                      modelOrCategoryLabel={`${brands.length} Brands · ${catalogue.length} Models`}
                      theme="dark"
                      showViewDetailsHint={true}
                    />
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      handleResetFilters();
                      scrollToSection('catalogue');
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Browse All Mobiles
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <a
                    href="#brands"
                    className="text-xs font-semibold text-zinc-300 hover:text-amber-400 transition-colors inline-flex items-center gap-1"
                  >
                    Or View All {brands.length} Brands
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 2: ACCESSORIES */}
              <div className="group relative rounded-3xl bg-gradient-to-br from-[#181C26] to-[#101218] border border-white/15 hover:border-amber-400/50 p-6 sm:p-8 flex flex-col justify-between transition-all shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-7 space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500/15 text-sky-300 border border-sky-500/30 text-xs font-bold">
                      <Headphones className="w-3.5 h-3.5" />
                      02 · ACCESSORIES
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                      ACCESSORIES
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      Find covers, tempered glass, TWS, earphones, chargers, cables and more.
                    </p>
                    <p className="text-xs text-zinc-400">
                      15 Accessory Categories · Protection, Audio, Fast Charging &amp; Smart
                      Essentials
                    </p>
                  </div>

                  <div className="sm:col-span-5 rounded-2xl overflow-hidden border border-white/10 bg-[#0B0C0E]">
                    <OriginalProductImageFrame
                      imageSrc={
                        accessoriesCatalogue.find((a) => Boolean(a.productImage))?.productImage
                      }
                      altText="Mobile Accessories Catalogue"
                      brandLabel="Accessories"
                      modelOrCategoryLabel="Covers, Glass, TWS & Chargers"
                      theme="dark"
                      showViewDetailsHint={true}
                    />
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleSelectAccessoryCategoryTile('All')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Browse Accessories
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <a
                    href="#accessory-finder"
                    className="text-xs font-semibold text-zinc-300 hover:text-amber-400 transition-colors inline-flex items-center gap-1"
                  >
                    Find Accessories for Your Phone
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            PRIORITY 4: SHOP BY BRAND (Horizontally Scrollable Brand Strip)
           ================================================== */}
        <section
          id="shop-by-brand"
          className="bg-[#0B0C0E] text-white py-14 lg:py-16 border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Browse By Manufacturer
                </p>
                <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  SHOP BY BRAND
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                  Select any brand below to open its complete smartphone model lineup.
                </p>
              </div>

              <a
                href="#brands"
                onClick={() => setShowAllBrandsDirectory(true)}
                className="self-start sm:self-end inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors whitespace-nowrap"
              >
                View All Brands ({brands.length})
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </a>
            </div>

            {/* Horizontally Scrollable Brand List + "View All Brands" Button at the End */}
            <div
              role="region"
              aria-label="Horizontally scrollable mobile brands"
              className="mt-6 flex items-stretch gap-3 overflow-x-auto pb-3 pt-1"
            >
              {brands.map((brand) => {
                const count = modelCountByBrand[brand.name.toLowerCase()] || 0;
                const isSelected = filters.brand.toLowerCase() === brand.name.toLowerCase();
                return (
                  <button
                    key={`strip-${brand.id}`}
                    type="button"
                    onClick={() => handleSelectBrandFromDirectory(brand.name)}
                    className={`shrink-0 w-40 sm:w-44 p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-lg'
                        : 'bg-[#141720] hover:bg-[#1B1F2B] text-white border-white/10 hover:border-amber-400/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-display text-xs font-bold ${
                            isSelected
                              ? 'bg-zinc-950 text-amber-400'
                              : 'bg-[#0B0C0E] text-amber-400 border border-white/10'
                          }`}
                        >
                          {brand.monogram}
                        </span>
                        <span
                          className={`text-[10px] font-mono-num font-semibold px-2 py-0.5 rounded ${
                            isSelected
                              ? 'bg-zinc-950/15 text-zinc-950'
                              : 'bg-white/5 text-zinc-400'
                          }`}
                        >
                          {count} Models
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-base font-bold truncate">
                        {brand.name}
                      </h3>
                      <p
                        className={`mt-0.5 text-[11px] truncate ${
                          isSelected ? 'text-zinc-900' : 'text-zinc-400'
                        }`}
                      >
                        {brand.originNote}
                      </p>
                    </div>

                    <div
                      className={`mt-3 pt-2 border-t flex items-center justify-between text-[11px] font-semibold ${
                        isSelected
                          ? 'border-zinc-950/15 text-zinc-950'
                          : 'border-white/10 text-amber-400'
                      }`}
                    >
                      <span>All Models</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}

              {/* End Card: View All Brands */}
              <a
                href="#brands"
                onClick={() => setShowAllBrandsDirectory(true)}
                className="shrink-0 w-44 p-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold flex flex-col justify-between transition-colors"
              >
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-extrabold opacity-80">
                    Complete Directory
                  </span>
                  <p className="mt-2 font-display text-lg font-bold leading-snug">
                    View All Brands
                  </p>
                  <p className="mt-1 text-xs font-medium opacity-85">
                    Explore all {brands.length} smartphone brands
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-zinc-950/15 flex items-center justify-between text-xs font-bold">
                  <span>Open Directory</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ==================================================
            PRIORITY 5: SHOP BY CATEGORY (8 Mobile Category Cards)
           ================================================== */}
        <section
          id="shop-by-category"
          className="bg-[#111319] text-white py-16 lg:py-20 border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Find Your Phone By Segment
                </p>
                <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  SHOP BY CATEGORY
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                  Select a smartphone category below to view matching models in the catalogue.
                </p>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
              {HOMEPAGE_MOBILE_CATEGORIES.map((catCard) => {
                const isActive = filters.category === catCard.targetCategory;
                return (
                  <button
                    key={catCard.id}
                    type="button"
                    onClick={() => handleSelectCategoryCard(catCard.targetCategory)}
                    className={`group p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-lg'
                        : 'bg-[#171A23] hover:bg-[#1E222E] text-white border-white/10 hover:border-amber-400/40'
                    }`}
                  >
                    <div>
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          isActive
                            ? 'bg-zinc-950/15 text-zinc-950'
                            : 'bg-white/5 text-amber-400'
                        }`}
                      >
                        {catCard.badge}
                      </span>
                      <h3 className="mt-2.5 font-display text-base sm:text-lg font-bold">
                        {catCard.title}
                      </h3>
                      <p
                        className={`mt-1 text-xs leading-snug line-clamp-2 ${
                          isActive ? 'text-zinc-900 font-medium' : 'text-zinc-400'
                        }`}
                      >
                        {catCard.subtitle}
                      </p>
                    </div>

                    <div
                      className={`mt-4 pt-2.5 border-t flex items-center justify-between text-xs font-semibold ${
                        isActive
                          ? 'border-zinc-950/15 text-zinc-950'
                          : 'border-white/10 text-amber-400 group-hover:text-amber-300'
                      }`}
                    >
                      <span>Explore {catCard.title}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================
            PRIORITY 6: LATEST SMARTPHONES (Homepage Highlight Grid)
           ================================================== */}
        <section
          id="latest-smartphones"
          className="bg-[#F8F8FA] text-zinc-900 py-16 lg:py-20 border-t border-zinc-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Catalogue Highlights · Demo / Enquiry Ready
                </p>
                <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
                  LATEST SMARTPHONES
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-zinc-600 max-w-2xl">
                  {PRICE_CHANGE_DISCLAIMER}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  handleResetFilters();
                  scrollToSection('catalogue');
                }}
                className="self-start sm:self-end inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                View All Smartphones ({catalogue.length})
                <ArrowUpRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            <div className="mt-7 grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
              {homepageLatestSmartphones.map((phone) => (
                <ProductCard
                  key={`latest-${phone.id}`}
                  phone={phone}
                  isCompared={compareList.some((c) => c.id === phone.id)}
                  onViewDetails={(chosen) => setSelectedProductForPdp(chosen)}
                  onToggleCompare={handleToggleCompare}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            ACCESSORIES ENTRY POINTS ("ACCESSORIES" 11 Clickable Category Tiles)
           ================================================== */}
        <section
          id="accessories-entry"
          className="bg-[#0B0C0E] text-white py-16 lg:py-20 border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Complete Your Mobile Setup
                </p>
                <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  ACCESSORIES
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-2xl">
                  Click any accessory category below to browse compatible products in our
                  accessories catalogue.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleSelectAccessoryCategoryTile('All')}
                className="self-start sm:self-end inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                View All Accessories
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
              {HOMEPAGE_ACCESSORY_ENTRY_TILES.map((tile) => {
                const isSelected = selectedAccessoryCat === tile.targetCategory;
                const matchingAccItem = accessoriesCatalogue.find(
                  (a) => a.category === tile.targetCategory
                );
                return (
                  <button
                    key={tile.id}
                    type="button"
                    onClick={() => handleSelectAccessoryCategoryTile(tile.targetCategory)}
                    className={`group rounded-2xl border overflow-hidden text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400 text-white'
                        : 'bg-[#141720] hover:bg-[#191D28] border-white/10 hover:border-amber-400/40 text-white'
                    }`}
                  >
                    <div>
                      <OriginalProductImageFrame
                        imageSrc={matchingAccItem?.productImage}
                        altText={tile.label}
                        brandLabel="Accessory Category"
                        modelOrCategoryLabel={tile.label}
                        theme="dark"
                        showViewDetailsHint={true}
                      />
                      <div className="p-4">
                        <h3 className="font-display text-sm sm:text-base font-bold text-white">
                          {tile.label}
                        </h3>
                        <p className="mt-1 text-[11px] text-zinc-400 line-clamp-2">
                          {tile.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-3.5 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                      <span>Browse {tile.label}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}

              {/* 12th Card: View All Accessories CTA Tile */}
              <button
                type="button"
                onClick={() => handleSelectAccessoryCategoryTile('All')}
                className="rounded-2xl bg-gradient-to-br from-amber-500 to-amber-400 text-zinc-950 p-5 text-left flex flex-col justify-between cursor-pointer hover:brightness-105 transition-all"
              >
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-80">
                    All {ACCESSORY_CATEGORY_NAMES.length} Categories
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold">
                    View All Accessories
                  </h3>
                  <p className="mt-1.5 text-xs font-medium opacity-90">
                    Explore our full mobile protection, audio, charging and smart accessories
                    catalogue.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-950/15 flex items-center justify-between text-xs font-bold">
                  <span>Open Marketplace</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* ==================================================
            PRIORITY 7: FIND ACCESSORIES FOR YOUR PHONE
           ================================================== */}
        <section
          id="accessory-finder"
          className="bg-[#111319] text-white py-18 lg:py-22 border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Interactive Compatibility System
              </p>
              <h2
                className="mt-1.5 font-display text-2xl sm:text-4xl font-bold tracking-tight text-white"
                style={{ textWrap: 'balance' }}
              >
                FIND ACCESSORIES FOR YOUR PHONE
              </h2>
              <p className="mt-2 text-sm sm:text-base text-zinc-300">
                Select your phone and discover compatible accessories.
              </p>
            </div>

            {/* Select Brand -> Select Model -> Find Accessories CTA */}
            <div className="mt-7 p-6 rounded-2xl bg-[#161922] border border-white/15 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-4">
                <label
                  htmlFor="finder-step1-brand"
                  className="block text-xs font-semibold text-amber-400 mb-2"
                >
                  1. Select Brand
                </label>
                <select
                  id="finder-step1-brand"
                  value={finderBrand}
                  onChange={(e) => {
                    setFinderBrand(e.target.value);
                    setFinderCustomModel('');
                  }}
                  className="w-full px-3.5 py-3 rounded-xl bg-[#0B0C0E] border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-5">
                <label
                  htmlFor="finder-step2-model"
                  className="block text-xs font-semibold text-amber-400 mb-2"
                >
                  2. Select Model ({finderBrand})
                </label>
                <select
                  id="finder-step2-model"
                  value={finderModel}
                  onChange={(e) => setFinderModel(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-[#0B0C0E] border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {finderBrandModels.map((m) => (
                    <option key={m.id} value={m.modelName}>
                      {m.modelName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <button
                  type="button"
                  onClick={() => scrollToSection('finder-results-grid')}
                  className="w-full py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Find Accessories</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Compatible Accessories Results */}
            <div id="finder-results-grid" className="mt-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  Compatible Accessories for{' '}
                  <span className="text-amber-400">{effectiveFinderModelName}</span>
                </h3>
                <WhatsAppButton
                  customMessage={`Hello Friends Cell Point, I would like to enquire about compatible cases, tempered glass and accessories for ${effectiveFinderModelName}. Please share the current price and availability.`}
                  label={`Enquire All Accessories for ${effectiveFinderModelName}`}
                  variant="amber"
                  size="md"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {compatibleFinderResults.allCompatibleList.map(({ label, item }) => (
                  <AccessoryCard
                    key={`finder-${label}`}
                    accessory={item}
                    forPhoneModel={effectiveFinderModelName}
                    compatibilityLabel={label}
                    darkTheme
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            PRIORITY 8: STORE OFFERS ("STORE OFFERS")
           ================================================== */}
        <section
          id="store-offers"
          className="bg-[#0B0C0E] text-white py-16 lg:py-20 border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Direct Store Promotions &amp; Enquiries
                </p>
                <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  STORE OFFERS
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-2xl">
                  Connect directly with Friends Cell Point to check current in-store offers on
                  smartphones, TWS earbuds and accessory combos.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={buildWhatsAppUrl(STORE_INFO.askTodayOffersMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm transition-colors whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4" />
                  Explore Current Offers
                </a>
                <a
                  href={buildWhatsAppUrl(STORE_INFO.askTodayOffersMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  Ask About Today&apos;s Offers
                </a>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5">
              {INITIAL_OFFER_CARDS.map((offer) => (
                <div
                  key={offer.id}
                  className="p-6 rounded-2xl bg-[#141720] border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                      {offer.kicker}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-bold text-white">
                      {offer.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {offer.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <WhatsAppButton
                      customMessage={offer.enquiryMessage}
                      label={offer.buttonText}
                      variant="amber"
                      size="md"
                      className="w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            FULL DIRECTORY: ALL MOBILE BRANDS (#brands)
           ================================================== */}
        <section id="brands" className="bg-[#111319] text-white py-16 lg:py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <p className="text-xs font-medium text-amber-400">
                  Complete Brand Directory ({brands.length} Smartphone Brands)
                </p>
                <h2
                  className="mt-1.5 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white"
                  style={{ textWrap: 'balance' }}
                >
                  ALL MOBILE BRANDS
                </h2>
                <p className="mt-2.5 text-sm text-zinc-300 max-w-2xl">
                  Select any mobile brand card below to open that brand&apos;s model catalogue and
                  explore all available models.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-end">
                <input
                  type="search"
                  aria-label="Filter brands by name"
                  value={brandSearchFilter}
                  onChange={(e) => setBrandSearchFilter(e.target.value)}
                  placeholder="Filter brand name..."
                  className="px-3.5 py-2 rounded-xl bg-[#0B0C0E] border border-white/15 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={() => setShowAllBrandsDirectory((prev) => !prev)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white cursor-pointer whitespace-nowrap"
                >
                  {showAllBrandsDirectory
                    ? 'Show Featured Brands Only'
                    : `View All ${brands.length} Brands`}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAdminEditTarget(null);
                    setAdminModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-semibold cursor-pointer whitespace-nowrap"
                >
                  <Database className="w-3.5 h-3.5" />
                  + Add / Manage Brands
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3">
              {displayedBrands.map((brand) => {
                const isSelected = filters.brand.toLowerCase() === brand.name.toLowerCase();
                const count = modelCountByBrand[brand.name.toLowerCase()] || 0;
                return (
                  <BrandCard
                    key={brand.id}
                    brand={brand}
                    modelCount={count}
                    isSelected={isSelected}
                    onSelectBrand={(name) =>
                      handleSelectBrandFromDirectory(isSelected ? 'All' : name)
                    }
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================
            BRAND MODEL PAGE & COMPLETE SMARTPHONE CATALOGUE (#catalogue)
           ================================================== */}
        <section id="catalogue" className="bg-[#F8F8FA] text-zinc-900 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeBrandObj ? (
              <div className="mb-8 space-y-6">
                {/* Brand & Series Hierarchical Header */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#111319] text-white border border-white/10 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
                    <div>
                      {/* Hierarchical Breadcrumb: All Mobile Brands -> Brand -> Series */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
                        <button
                          type="button"
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              brand: 'All',
                              series: 'All',
                              generationFilter: 'All',
                            }))
                          }
                          className="inline-flex items-center gap-1 hover:text-amber-300 cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          All Mobile Brands
                        </button>
                        <span className="text-zinc-600">/</span>
                        <button
                          type="button"
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              series: 'All',
                              generationFilter: 'All',
                            }))
                          }
                          className={`cursor-pointer ${
                            filters.series === 'All' ? 'text-white' : 'hover:text-amber-300'
                          }`}
                        >
                          {activeBrandObj.name}
                        </button>
                        {filters.series !== 'All' && (
                          <>
                            <span className="text-zinc-600">/</span>
                            <span className="text-white">{filters.series}</span>
                          </>
                        )}
                      </div>

                      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
                        {filters.series === 'All'
                          ? activeBrandObj.name
                          : `${activeBrandObj.name} ${filters.series}`}
                      </h2>
                      <p className="mt-1 text-sm sm:text-base text-zinc-300">
                        {filters.series === 'All'
                          ? `Browse ${activeBrandObj.name} Smartphones (${modelCountByBrand[activeBrandObj.name.toLowerCase()] || 0} Verified Models across ${activeBrandSeriesDirectory.length} Series)`
                          : `Showing all ${matchingSmartphones.length} models in ${activeBrandObj.name} · ${filters.series}`}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {filters.series !== 'All' && (
                        <button
                          type="button"
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              series: 'All',
                              generationFilter: 'All',
                            }))
                          }
                          className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-bold text-zinc-950 cursor-pointer"
                        >
                          ← Back to All {activeBrandObj.name} Series
                        </button>
                      )}
                      <WhatsAppButton
                        productName={
                          filters.series === 'All'
                            ? `${activeBrandObj.name} Smartphones`
                            : `${activeBrandObj.name} ${filters.series}`
                        }
                        label={`Enquire ${activeBrandObj.name} Models`}
                        variant="amber"
                        size="md"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            brand: 'All',
                            series: 'All',
                            generationFilter: 'All',
                          }))
                        }
                        className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white cursor-pointer"
                      >
                        View All Brands
                      </button>
                    </div>
                  </div>

                  {/* Series Filter Pills & Current / Previous Generation Filter */}
                  <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-zinc-400 mb-2">
                        Select {activeBrandObj.name} Series:
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setFilters((prev) => ({ ...prev, series: 'All' }));
                            setVisibleCount(200);
                          }}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                            filters.series === 'All'
                              ? 'bg-white text-zinc-950'
                              : 'bg-[#0B0C0E] text-zinc-300 hover:text-white border border-white/10'
                          }`}
                        >
                          All {activeBrandObj.name} Models (
                          {modelCountByBrand[activeBrandObj.name.toLowerCase()] || 0})
                        </button>
                        {activeBrandSeriesDirectory.map((seriesEntry) => {
                          const active =
                            filters.series.toLowerCase() === seriesEntry.seriesName.toLowerCase();
                          return (
                            <button
                              key={seriesEntry.seriesName}
                              type="button"
                              onClick={() => {
                                setFilters((prev) => ({
                                  ...prev,
                                  series: active ? 'All' : seriesEntry.seriesName,
                                }));
                                setVisibleCount(200);
                              }}
                              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                                active
                                  ? 'bg-amber-500 text-zinc-950'
                                  : 'bg-[#0B0C0E] text-zinc-300 hover:text-white border border-white/10'
                              }`}
                            >
                              {seriesEntry.seriesName} ({seriesEntry.modelCount})
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Generation Filter: All / Current Models / Previous Models */}
                    <div className="shrink-0">
                      <p className="text-xs text-zinc-400 mb-2">Model Generation:</p>
                      <div className="inline-flex rounded-xl bg-[#0B0C0E] p-1 border border-white/10">
                        {(
                          [
                            { id: 'All', label: 'All Generations' },
                            { id: 'Current Model', label: 'Current Models' },
                            { id: 'Previous Model', label: 'Previous Models' },
                          ] as const
                        ).map((genTab) => {
                          const isGenActive = (filters.generationFilter || 'All') === genTab.id;
                          return (
                            <button
                              key={genTab.id}
                              type="button"
                              onClick={() =>
                                setFilters((prev) => ({
                                  ...prev,
                                  generationFilter: genTab.id,
                                }))
                              }
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                                isGenActive
                                  ? 'bg-amber-500 text-zinc-950'
                                  : 'text-zinc-300 hover:text-white'
                              }`}
                            >
                              {genTab.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ==================================================
                    3. SERIES PAGE: Official Brand Series Cards Grid
                    Displayed when viewing a Brand (or switchable at any time)
                   ================================================== */}
                {filters.series === 'All' && activeBrandSeriesDirectory.length > 0 && (
                  <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                          Step 1 · Browse {activeBrandObj.name} By Official Series
                        </span>
                        <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-zinc-950">
                          {activeBrandObj.name} Smartphone Series ({activeBrandSeriesDirectory.length})
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">
                          Select any {activeBrandObj.name} series below to view all models in that
                          series, or scroll down to browse all{' '}
                          {modelCountByBrand[activeBrandObj.name.toLowerCase()] || 0}{' '}
                          {activeBrandObj.name} models directly.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                      {activeBrandSeriesDirectory.map((seriesSummary) => (
                        <SeriesCard
                          key={`${activeBrandObj.id}-${seriesSummary.seriesName}`}
                          series={seriesSummary}
                          onSelectSeries={(chosenSeries) => {
                            setFilters((prev) => ({
                              ...prev,
                              series: chosenSeries,
                            }));
                            setVisibleCount(200);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-amber-700">
                    Complete Smartphone Discovery &amp; Enquiry Catalogue
                  </p>
                  <h2 className="mt-1.5 font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
                    {activeCatalogueTab === 'featured'
                      ? 'Featured Smartphones'
                      : activeCatalogueTab === 'latest'
                        ? 'Latest Models'
                        : 'Explore All Smartphones'}
                  </h2>
                  <p className="mt-2 text-sm text-zinc-600 max-w-2xl">
                    Showing <strong className="text-zinc-950">{matchingSmartphones.length}</strong>{' '}
                    smartphone models &amp; variants across{' '}
                    <strong className="text-zinc-950">{brands.length}</strong> mobile brands.{' '}
                    {PRICE_CHANGE_DISCLAIMER}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-start lg:self-end">
                  {(
                    [
                      { id: 'all', label: `All Catalogue (${catalogue.length})` },
                      { id: 'featured', label: 'Featured Smartphones' },
                      { id: 'latest', label: 'Latest Models' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveCatalogueTab(tab.id);
                        setVisibleCount(1000);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                        activeCatalogueTab === tab.id
                          ? 'bg-zinc-950 text-white shadow-sm'
                          : 'bg-white border border-zinc-300 text-zinc-700 hover:border-zinc-400'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Swipeable Mobile Category Tabs */}
            <div
              role="tablist"
              aria-label="Mobile Category System"
              className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-3 border-t border-zinc-200"
            >
              {MOBILE_CATEGORY_SLUGS.map((catSlug) => {
                const active = filters.category === catSlug;
                return (
                  <button
                    key={catSlug}
                    role="tab"
                    aria-selected={active}
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, category: catSlug }))}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-amber-500 text-zinc-950 shadow-sm'
                        : 'bg-zinc-200/75 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-950'
                    }`}
                  >
                    {catSlug}
                  </button>
                );
              })}
            </div>

            {/* Sticky Search Bar + Sort & Mobile "FILTER & SORT" Trigger */}
            <div className="sticky top-14 sm:top-16 z-30 mt-4 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200/90 shadow-sm">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="flex-1">
                  <SearchBar
                    inputId="catalogue-search-input"
                    variant="catalogue"
                    value={filters.searchQuery}
                    onChange={(q) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
                    brands={brands}
                    catalogue={catalogue}
                    onSelectBrandSuggestion={(brandName) =>
                      handleSelectBrandFromDirectory(brandName)
                    }
                    onSelectSeriesSuggestion={(brandName, seriesName) =>
                      handleSelectSeries(brandName, seriesName)
                    }
                    onSelectProductSuggestion={(prod) => setSelectedProductForPdp(prod)}
                    onSelectAccessorySuggestion={(accCat) =>
                      handleSelectAccessoryCategoryTile(accCat)
                    }
                    onSubmitSearch={(q) => handleUniversalSearchTrigger(q ?? filters.searchQuery)}
                  />
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="catalogue-sort-select"
                      className="text-xs font-medium text-zinc-600 whitespace-nowrap"
                    >
                      Sort by:
                    </label>
                    <select
                      id="catalogue-sort-select"
                      value={filters.sortBy}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, sortBy: e.target.value as SortOption }))
                      }
                      className="px-3 py-2.5 rounded-xl bg-[#F8F8FA] border border-zinc-300 text-xs font-semibold text-zinc-900"
                    >
                      <option value="popular">Popular</option>
                      <option value="newest">Newest</option>
                      <option value="brand-asc">Brand A–Z</option>
                      <option value="price-asc">Price Low to High</option>
                      <option value="price-desc">Price High to Low</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMobileFilterDrawerOpen(true)}
                    className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-zinc-950 text-white text-xs font-bold cursor-pointer whitespace-nowrap"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                    FILTER &amp; SORT
                  </button>
                </div>
              </div>
            </div>

            {/* DESKTOP LEFT-SIDE FILTER PANEL + MAIN PRODUCT GRID */}
            <div className="mt-6 flex flex-col lg:flex-row items-start gap-6">
              <FilterPanel
                filters={filters}
                brands={brands}
                matchingCount={matchingSmartphones.length}
                mobileDrawerOpen={mobileFilterDrawerOpen}
                onCloseMobileDrawer={() => setMobileFilterDrawerOpen(false)}
                onUpdateFilters={setFilters}
                onResetFilters={handleResetFilters}
              />

              <div className="flex-1 w-full min-w-0">
                <ProductGrid
                  products={displayedSmartphones}
                  totalCount={matchingSmartphones.length}
                  visibleCount={visibleCount}
                  compareList={compareList}
                  searchQuery={filters.searchQuery}
                  onViewDetails={(phone) => setSelectedProductForPdp(phone)}
                  onToggleCompare={handleToggleCompare}
                  onLoadMore={() => setVisibleCount((prev) => prev + 24)}
                  onResetFilters={handleResetFilters}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            COMPLETE 15-CATEGORY ACCESSORIES CATALOGUE (#accessories)
           ================================================== */}
        <section id="accessories" className="bg-[#F8F8FA] text-zinc-900 py-20 lg:py-24 border-t border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold tracking-wide text-amber-700">
                  Complete Accessories Catalogue ({ACCESSORY_CATEGORY_NAMES.length} Categories)
                </p>
                <h2 className="mt-1.5 font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
                  Mobile Accessories Marketplace
                </h2>
                <p className="mt-2 text-sm text-zinc-600 max-w-2xl">
                  Explore mobile covers, tempered glass, TWS earbuds, wireless &amp; wired
                  earphones, fast chargers, USB, Type-C &amp; Lightning cables, power banks, mobile
                  holders, car chargers, speakers and smart watches.
                </p>
              </div>

              <WhatsAppButton
                customMessage={STORE_INFO.checkPriceAccessoryMessage}
                label="Enquire About Any Accessory"
                variant="dark"
                size="md"
              />
            </div>

            {/* Search Accessories by Brand, Product Name or Category */}
            <div className="mt-6 pt-4 border-t border-zinc-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                <input
                  type="search"
                  aria-label="Search accessories by brand, product name or category"
                  value={accessorySearchQuery}
                  onChange={(e) => setAccessorySearchQuery(e.target.value)}
                  placeholder="Search accessories by brand, product name or category..."
                  className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white border border-zinc-300 text-xs text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-sm"
                />
                {accessorySearchQuery && (
                  <button
                    type="button"
                    onClick={() => setAccessorySearchQuery('')}
                    aria-label="Clear accessory search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="text-xs text-zinc-600 flex items-center gap-2">
                <span>
                  Showing <strong className="text-zinc-950 font-bold">{filteredAccessoriesCatalogue.length}</strong> of{' '}
                  <strong className="text-zinc-950">{accessoriesCatalogue.length}</strong> accessories
                </span>
                {(accessorySearchQuery || selectedAccessoryCat !== 'All') && (
                  <button
                    type="button"
                    onClick={() => {
                      setAccessorySearchQuery('');
                      setSelectedAccessoryCat('All');
                    }}
                    className="text-amber-700 hover:text-amber-800 font-semibold underline cursor-pointer text-xs"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* 12 Accessory Category Filter Pills */}
            <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-2 pt-1">
              <button
                type="button"
                onClick={() => setSelectedAccessoryCat('All')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedAccessoryCat === 'All'
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'bg-zinc-200/75 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                All Categories ({accessoriesCatalogue.length})
              </button>
              {ACCESSORY_CATEGORY_NAMES.map((catName) => {
                const active = selectedAccessoryCat === catName;
                const catCount = accessoriesCatalogue.filter((a) => a.category === catName).length;
                return (
                  <button
                    key={catName}
                    type="button"
                    onClick={() => setSelectedAccessoryCat(catName)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-amber-500 text-zinc-950 font-bold shadow-sm'
                        : 'bg-zinc-200/75 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-950'
                    }`}
                  >
                    {catName} {catCount > 0 && <span className="opacity-80">({catCount})</span>}
                  </button>
                );
              })}
            </div>

            {filteredAccessoriesCatalogue.length === 0 ? (
              <div className="mt-8 p-10 rounded-2xl bg-white border border-zinc-200 text-center">
                <p className="text-sm font-semibold text-zinc-900">
                  No accessories found matching &ldquo;{accessorySearchQuery}&rdquo;
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Try searching with a different brand, model, or category name.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setAccessorySearchQuery('');
                    setSelectedAccessoryCat('All');
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold cursor-pointer"
                >
                  View All Accessories
                </button>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
              {filteredAccessoriesCatalogue.map((acc) => (
                <AccessoryCard
                  key={acc.id}
                  accessory={acc}
                  onCheckPriceModal={(item, msg) =>
                    setActiveEnquiryTarget({
                      kind: 'accessory',
                      title: item.productName,
                      subtitle: `${item.category} · ${item.availability}`,
                      defaultMessage: msg,
                    })
                  }
                />
              ))}
              </div>
            )}
          </div>
        </section>

        {/* ==================================================
            DEDICATED SHOWCASE SECTIONS:
            - TWS & AUDIO ("Sound That Goes With You.")
            - CASES & TEMPERED GLASS ("Protect Your Screen")
            - CHARGERS & POWER BANKS ("Everything Your Phone Needs.")
           ================================================== */}
        <section className="bg-[#0B0C0E] text-white py-20 lg:py-24 border-t border-white/10 space-y-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6">
                <p className="text-xs font-medium text-amber-400">TWS &amp; Audio</p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-white">
                  Sound That Goes With You.
                </h2>
                <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
                  Explore TWS earbuds, Bluetooth neckband earphones, wired Type-C &amp; 3.5mm
                  earphones, and portable wireless speakers.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <WhatsAppButton
                    productName="TWS Earbuds & Audio Products"
                    label="Check Available Audio Products"
                    variant="amber"
                    size="lg"
                  />
                </div>
              </div>
              <div className="lg:col-span-6">
                <TwsAudioStudioScene />
              </div>
            </div>

            <div className="pt-12 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <TemperedGlassStudioScene />
              </div>
              <div className="lg:col-span-6 order-1 lg:order-2">
                <p className="text-xs font-medium text-sky-400">
                  Cases &amp; Tempered Glass
                </p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-white">
                  Protect Your Screen &amp; Style Your Phone.
                </h2>
                <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
                  Screen protection and protective mobile covers for a wide range of smartphones.
                  Ask for your specific handset model on WhatsApp.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={temperedGlassWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs sm:text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Ask for Your Model
                  </a>
                  <WhatsAppButton
                    customMessage={buildCatalogueProductWhatsAppMessage('Mobile Covers & Cases')}
                    label="Check Covers for My Phone"
                    variant="outline"
                    size="lg"
                  />
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5">
                <p className="text-xs font-medium text-amber-400">
                  Chargers, Cables &amp; Power Banks
                </p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-white">
                  Everything Your Phone Needs.
                </h2>
                <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
                  Mobiles, protection, charging and audio accessories — all in one place at Friends
                  Cell Point.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#accessories"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs sm:text-sm"
                  >
                    Explore Accessories
                  </a>
                </div>
              </div>
              <div className="lg:col-span-7">
                <CompleteEcosystemScene />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            VISIT OUR STORE, ABOUT & CONTACT
           ================================================== */}
        <section
          id="visit-store"
          className="bg-[#12141B] text-white py-20 lg:py-24 border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5">
                <p className="text-xs font-medium text-amber-400">
                  Visit Our Store · Vissannapeta
                </p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-white">
                  Technology. Choice. Convenience.
                </h2>
                <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {STORE_INFO.aboutDescription}
                </p>
                <address className="mt-5 not-italic p-4 rounded-xl bg-[#0B0C0E] border border-white/10 text-xs sm:text-sm text-zinc-200 space-y-1">
                  <strong className="text-white block">{STORE_INFO.name}</strong>
                  <span>
                    {STORE_INFO.street}, {STORE_INFO.city}, {STORE_INFO.state}{' '}
                    {STORE_INFO.postalCode}, {STORE_INFO.country}
                  </span>
                  <span className="block font-mono-num text-amber-400 pt-1">
                    Phone: {STORE_INFO.phoneDisplay}
                  </span>
                </address>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={STORE_INFO.telHref}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-zinc-950 font-semibold text-xs sm:text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Call Store
                  </a>
                  <WhatsAppButton
                    customMessage={STORE_INFO.askAboutProductMessage}
                    label="Ask About a Product"
                    variant="amber"
                    size="md"
                  />
                  <button
                    type="button"
                    onClick={() => setDirectionsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-medium cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-sky-400" />
                    Get Directions
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <ShowroomArchitecturalScene />
              </div>
            </div>

            {/* Direct WhatsApp Enquiry Form */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0B0C0E] border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5">
                <h3 className="font-display text-xl font-bold text-white">
                  Direct WhatsApp Price &amp; Model Enquiry
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">
                  Type any mobile brand, model name, or accessory below to send a direct WhatsApp
                  enquiry to {STORE_INFO.displayName} ({STORE_INFO.phoneDisplay}).
                </p>
              </div>
              <div className="lg:col-span-7 flex flex-col sm:flex-row gap-3">
                <select
                  aria-label="Enquiry Category"
                  value={customEnquiryTopic}
                  onChange={(e) => setCustomEnquiryTopic(e.target.value)}
                  className="px-3.5 py-3 rounded-xl bg-[#141720] border border-white/15 text-xs sm:text-sm text-white"
                >
                  <option value="mobile phones and accessories">Mobiles &amp; Accessories</option>
                  <option value="a specific smartphone model">Smartphone Price &amp; Stock</option>
                  <option value="tempered glass and mobile covers">
                    Cases &amp; Tempered Glass
                  </option>
                  <option value="TWS earbuds and audio">TWS / Buds &amp; Earphones</option>
                  <option value="fast chargers, cables and power banks">
                    Chargers &amp; Power Banks
                  </option>
                </select>
                <input
                  type="text"
                  value={customEnquiryDetails}
                  onChange={(e) => setCustomEnquiryDetails(e.target.value)}
                  placeholder="Enter brand, model name or accessory..."
                  className="flex-1 px-3.5 py-3 rounded-xl bg-[#141720] border border-white/15 text-xs sm:text-sm text-white placeholder:text-zinc-500"
                />
                <a
                  href={composedContactWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs sm:text-sm whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  Send on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==================================================
          FOOTER
         ================================================== */}
      <footer className="bg-[#08090B] border-t border-white/10 text-zinc-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-display text-sm font-bold text-white">
              {STORE_INFO.destinationSubtitle}
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              {STORE_INFO.fullAddress} · Phone: {STORE_INFO.phoneDisplay}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-xs">
            <a href="#shop-entry" className="hover:text-white transition-colors">
              Shop Mobiles &amp; Accessories
            </a>
            <a href="#brands" className="hover:text-white transition-colors">
              All Brands ({brands.length})
            </a>
            <a href="#catalogue" className="hover:text-white transition-colors">
              Smartphones ({catalogue.length})
            </a>
            <a href="#accessories" className="hover:text-white transition-colors">
              Accessories
            </a>
            <a href="#store-offers" className="hover:text-white transition-colors">
              Store Offers
            </a>
            <button
              type="button"
              onClick={() => {
                setAdminEditTarget(null);
                setAdminModalOpen(true);
              }}
              className="text-amber-400 hover:text-amber-300 cursor-pointer"
            >
              Catalogue Admin
            </button>
          </div>
        </div>
      </footer>

      {/* ==================================================
          PERSISTENT FLOATING ACTIONS:
          - COMPARE DRAWER TRIGGER (When Models Selected)
          - PERSISTENT WHATSAPP "Ask About a Product" CTA
         ================================================== */}
      <div className="fixed bottom-16 md:bottom-5 right-4 z-40 flex flex-col items-end gap-2.5">
        {compareList.length > 0 && (
          <button
            type="button"
            onClick={() => setCompareModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-zinc-950 hover:bg-zinc-900 text-amber-400 border border-amber-400/50 font-bold text-xs shadow-2xl cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            COMPARE ({compareList.length}/3)
          </button>
        )}

        <a
          href={askAboutProductWhatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-2xl transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Ask About a Product
        </a>
      </div>

      {/* ==================================================
          STICKY MOBILE CALL / WHATSAPP BAR (<= 52px height)
         ================================================== */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 h-13 bg-[#0B0C0E]/95 backdrop-blur-md border-t border-white/15 px-3 flex items-center gap-2.5">
        <a
          href={STORE_INFO.telHref}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/10 text-white text-xs font-semibold whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          Call Now
        </a>
        <a
          href={askAboutProductWhatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-amber-500 text-zinc-950 text-xs font-semibold whitespace-nowrap"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Ask About a Product
        </a>
      </div>

      {/* ==================================================
          MODALS (PRODUCT DETAILS, COMPARE PANEL, ADMIN, ENQUIRY, DIRECTIONS)
         ================================================== */}
      <ProductDetails
        product={selectedProductForPdp}
        catalogue={catalogue}
        accessories={accessoriesCatalogue}
        compareList={compareList}
        onClose={() => setSelectedProductForPdp(null)}
        onSelectProduct={(prod) => setSelectedProductForPdp(prod)}
        onSelectBrand={(b) => handleSelectBrandFromDirectory(b)}
        onSelectSeries={(b, s) => handleSelectSeries(b, s)}
        onEditModelInAdmin={(prod) => {
          setSelectedProductForPdp(null);
          setAdminEditTarget(prod);
          setAdminModalOpen(true);
        }}
        onToggleCompare={handleToggleCompare}
      />

      <ComparePanel
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        items={compareList}
        onRemoveItem={(id) =>
          setCompareList((prev) => prev.filter((item) => item.id !== id))
        }
        onClearAll={() => {
          setCompareList([]);
          setCompareModalOpen(false);
        }}
      />

      <AdminCatalogueModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        brands={brands}
        catalogue={catalogue}
        accessories={accessoriesCatalogue}
        initialEditProduct={adminEditTarget}
        onUpdateStoreData={(newBrands, newCatalogue) => {
          setBrands(newBrands);
          setCatalogue(newCatalogue);
        }}
        onUpdateAccessories={(newAccessories) => {
          setAccessoriesCatalogue(newAccessories);
        }}
        onResetAllToDefault={() => {
          setBrands(INITIAL_BRAND_DIRECTORY);
          setCatalogue(INITIAL_SMARTPHONE_CATALOGUE);
          setAccessoriesCatalogue(INITIAL_ACCESSORIES_CATALOGUE);
        }}
      />

      <EnquiryModal
        target={activeEnquiryTarget}
        onClose={() => setActiveEnquiryTarget(null)}
      />

      <DirectionsModal
        isOpen={directionsModalOpen}
        onClose={() => setDirectionsModalOpen(false)}
        configuredMapsUrl={configuredMapsUrl}
        onSaveMapsUrl={(url) => setConfiguredMapsUrl(url)}
      />
    </div>
  );
}
