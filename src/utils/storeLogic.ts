import {
  VERIFIED_BRAND_SERIES_MODELS_MAP,
  OFFICIAL_BRAND_SOURCE_URLS,
} from './verifiedModelsDataset';
import {
  CENTRALIZED_PRICE_LIST_DATA,
  PRICE_CHANGE_DISCLAIMER,
  PRICE_LIST_SOURCES,
  parseNumericPrice,
  PriceListProductEntry,
} from './priceListDataset';
import {
  resolveVerifiedProductImages,
  VERIFIED_PRODUCT_IMAGE_HIERARCHY,
  VerifiedProductImageRecord,
} from './productImageMapping';
import {
  ACCESSORY_CATEGORIES,
  AccessoryCategoryName,
  AccessoryCatalogueItem,
  INITIAL_ACCESSORIES_CATALOGUE,
  formatAccessoryPriceDisplay,
  buildAccessoryWhatsAppMessage,
  searchAndFilterAccessories,
} from './accessoriesDataset';

export {
  CENTRALIZED_PRICE_LIST_DATA,
  PRICE_CHANGE_DISCLAIMER,
  PRICE_LIST_SOURCES,
  parseNumericPrice,
  resolveVerifiedProductImages,
  VERIFIED_PRODUCT_IMAGE_HIERARCHY,
  ACCESSORY_CATEGORIES,
  ACCESSORY_CATEGORIES as ACCESSORY_CATEGORY_NAMES,
  INITIAL_ACCESSORIES_CATALOGUE,
  formatAccessoryPriceDisplay,
  buildAccessoryWhatsAppMessage,
  searchAndFilterAccessories,
};
export type {
  PriceListProductEntry,
  VerifiedProductImageRecord,
  AccessoryCategoryName,
  AccessoryCatalogueItem,
};

export type InventoryStatus =
  | 'Check Availability'
  | 'Available'
  | 'Out of Stock'
  | 'Enquire'
  | 'Coming Soon';

export type StockBadgeLabel =
  | 'AVAILABLE'
  | 'CHECK AVAILABILITY'
  | 'OUT OF STOCK'
  | 'ENQUIRE';

export type MobileCategorySlug =
  | 'All Smartphones'
  | 'Budget Smartphones'
  | 'Mid-Range Smartphones'
  | 'Premium Smartphones'
  | 'Flagship Smartphones'
  | 'Gaming Smartphones'
  | 'Camera Smartphones'
  | '5G Smartphones';

export type SortOption =
  | 'newest'
  | 'popular'
  | 'brand-asc'
  | 'price-asc'
  | 'price-desc';

export type PriceRangeFilterOption =
  | 'All'
  | 'Under ₹10,000'
  | '₹10,000 - ₹20,000'
  | '₹20,000 - ₹35,000'
  | '₹35,000 - ₹60,000'
  | 'Above ₹60,000'
  | 'Budget'
  | 'Mid-Range'
  | 'Premium'
  | 'Flagship';
// AccessoryCategoryName and AccessoryCatalogueItem are imported from accessoriesDataset

export interface ProductGalleryImages {
  front?: string;
  back?: string;
  side?: string;
  camera?: string;
  display?: string;
  box?: string;
}

export type GalleryAngleName =
  | 'Front'
  | 'Back'
  | 'Side'
  | 'Camera'
  | 'Display'
  | 'Box / Package';

export interface ProductGallerySlot {
  key: keyof ProductGalleryImages;
  label: GalleryAngleName;
  imageUrl: string | null;
}

export interface ProductSpecificationsMap {
  display: string;
  processor: string;
  rearCamera: string;
  frontCamera: string;
  battery: string;
  charging: string;
  network: string;
  os: string;
}

export interface BrandDirectoryEntry {
  id: string;
  name: string;
  monogram: string;
  originNote: string;
  seriesList: string[];
  featured: boolean;
}

export interface SmartphoneProduct {
  id: string;
  productName: string;
  brand: string;
  series: string;
  model: string;
  modelName: string;
  variant: string;
  colors: string[];
  colorOptions: string[];
  mopPrice: string;
  effectivePrice: string;
  oldRp?: string;
  newRp?: string;
  discountFullSwipe?: string;
  discountEmi?: string;
  offerPeriod?: string;
  notes?: string;
  source: string;
  sourceImage?: string;
  lastUpdated: string;
  productType?: 'smartphone' | 'feature-phone' | 'wearable' | 'accessory';
  modelNumber?: string;
  generation?: 'Current Model' | 'Previous Model';
  // Original uploaded product image & multi-angle gallery (never AI-substituted)
  image?: string;
  productImage?: string;
  sourceUrl?: string;
  galleryImages?: ProductGalleryImages;
  colorImages?: Record<string, string>;
  visualVariant:
    | 'titanium-pro'
    | 'ultra-display'
    | 'portrait-studio'
    | 'sleek-5g'
    | 'note-series'
    | 'performance-ed'
    | 'all-rounder';
  keySpecSummary?: string;
  // Structured specifications + flat properties for full compatibility
  specifications: ProductSpecificationsMap;
  display: string;
  processor: string;
  variants?: string[];
  ramOptions: string[];
  ramVariants: string[];
  storageOptions: string[];
  storageVariants: string[];
  rearCamera: string;
  frontCamera: string;
  battery: string;
  charging: string;
  os: string;
  network: '5G / 4G' | '5G' | '4G' | 'Details available on enquiry';
  screenSizeCategory?:
    | 'Compact'
    | 'Standard 6.5"+'
    | 'Large 6.7"+'
    | 'Foldable'
    | 'Details available on enquiry';
  cameraCategory?:
    | 'Pro Camera System'
    | 'Multi-Camera Setup'
    | 'Everyday Camera'
    | 'Details available on enquiry';
  batteryCategory?:
    | 'All-Day Battery'
    | 'High-Capacity Battery'
    | 'Details available on enquiry';
  launchInfo: string;
  verifiedRating?: number | null;
  verifiedReviewCount?: number | null;
  price: number | null;
  originalPrice: number | null;
  offerPrice: number | null;
  availability: InventoryStatus;
  productStatus: 'Featured' | 'Latest' | 'Catalogue';
  categories: Exclude<MobileCategorySlug, 'All Smartphones'>[];
  createdAtOrder: number;
  popularityOrder: number;
}

export interface SeriesCatalogueSummary {
  seriesName: string;
  brandName: string;
  modelCount: number;
  currentModelCount: number;
  previousModelCount: number;
  representativeImage?: string;
  representativeModel?: string;
}


export interface AdvancedMobileFilterState {
  searchQuery: string;
  brand: string;
  series: string;
  generationFilter?: 'All' | 'Current Model' | 'Previous Model';
  category: MobileCategorySlug;
  priceRange: PriceRangeFilterOption;
  ram: string;
  storage: string;
  network5G: 'All' | '5G' | '4G';
  camera: string;
  battery: string;
  screenSize: string;
  processor: string;
  os: string;
  sortBy: SortOption;
}

export interface SearchSuggestionItem {
  id: string;
  type: 'brand' | 'model' | 'series' | 'spec' | 'category' | 'accessory';
  label: string;
  sublabel: string;
  queryValue: string;
  brandName?: string;
  seriesName?: string;
  product?: SmartphoneProduct;
  accessoryCategory?: AccessoryCategoryName;
}

export interface CatalogueAuditReport {
  totalVerifiedBrands: number;
  totalVerifiedSeries: number;
  totalVerifiedModels: number;
  brandsWithIncompleteData: string[];
  seriesWithIncompleteData: string[];
  modelsWithoutVerifiedImages: Array<{
    brand: string;
    series: string;
    modelName: string;
  }>;
  modelCountByBrand: Record<string, number>;
  seriesCountByBrand: Record<string, number>;
}

export interface OfferCardItem {
  id: string;
  kicker: string;
  title: string;
  description: string;
  buttonText: string;
  enquiryMessage: string;
}

export interface HomepageMobileCategoryCard {
  id: string;
  title: string;
  subtitle: string;
  targetCategory: MobileCategorySlug;
  badge: string;
}

export interface HomepageAccessoryEntryTile {
  id: string;
  label: string;
  subtitle: string;
  targetCategory: AccessoryCategoryName;
  visualType: AccessoryCatalogueItem['visualType'];
}

export type SmartphoneCategoryItem = SmartphoneProduct;
export type SetupAccessoryCategory = AccessoryCatalogueItem;
export interface FindPhoneCategoryItem {
  visualTheme: 'budget' | 'midrange' | 'premium' | 'flagship' | 'camera' | 'gaming' | 'fiveg';
}

export interface CatalogueDataProvider {
  providerName: 'local-storage' | 'supabase' | 'firebase' | 'rest-api' | 'postgres';
  getBrands(): Promise<BrandDirectoryEntry[]>;
  getSmartphones(): Promise<SmartphoneProduct[]>;
  getAccessories(): Promise<AccessoryCatalogueItem[]>;
}

export const STORE_INFO = {
  name: 'FRIENDS CELL POINT',
  displayName: 'Friends Cell Point',
  heroTagline: 'Explore Mobiles. Discover More.',
  destinationSubtitle: 'FRIENDS CELL POINT – COMPLETE MOBILE & ACCESSORIES DESTINATION',
  street: 'Tiruvuru Road',
  city: 'Vissannapeta',
  state: 'Andhra Pradesh',
  postalCode: '521215',
  country: 'India',
  shortLocation: 'Vissannapeta • Andhra Pradesh',
  fullAddress: 'Tiruvuru Road, Vissannapeta, Andhra Pradesh 521215, India',
  phoneDisplay: '+91 72079 87777',
  phoneRaw: '+917207987777',
  telHref: 'tel:+917207987777',
  whatsappNumber: '917207987777',
  defaultWhatsAppMessage:
    'Hello Friends Cell Point, I would like to enquire about mobile phones and accessories.',
  askAboutProductMessage:
    'Hello Friends Cell Point, I would like to enquire about a mobile/accessory.',
  askTodayOffersMessage:
    "Hello Friends Cell Point, I would like to ask about today's store offers on mobiles and accessories.",
  checkPriceProductMessage:
    'Hello Friends Cell Point, I would like to check the price and availability of this product.',
  checkPriceMobileMessage:
    'Hello Friends Cell Point, I would like to check the availability and price of this mobile.',
  checkPriceAccessoryMessage:
    'Hello Friends Cell Point, I would like to enquire about this accessory.',
  temperedGlassMessage:
    'Hello Friends Cell Point, I want to enquire about tempered glass for my phone.',
  aboutDescription:
    'Friends Cell Point is a mobile phone and accessories store located on Tiruvuru Road, Vissannapeta, Andhra Pradesh.',
} as const;

export const MOBILE_CATEGORY_SLUGS: MobileCategorySlug[] = [
  'All Smartphones',
  'Budget Smartphones',
  'Mid-Range Smartphones',
  'Premium Smartphones',
  'Flagship Smartphones',
  'Gaming Smartphones',
  'Camera Smartphones',
  '5G Smartphones',
];


export const GALLERY_ANGLE_DEFINITIONS: Array<{
  key: keyof ProductGalleryImages;
  label: GalleryAngleName;
}> = [
  { key: 'front', label: 'Front' },
  { key: 'back', label: 'Back' },
  { key: 'side', label: 'Side' },
  { key: 'camera', label: 'Camera' },
  { key: 'display', label: 'Display' },
  { key: 'box', label: 'Box / Package' },
];

export function getProductGallerySlots(product: {
  productImage?: string;
  galleryImages?: ProductGalleryImages;
}): ProductGallerySlot[] {
  const g = product.galleryImages || {};
  const primaryFront = g.front?.trim() || product.productImage?.trim() || null;

  return [
    { key: 'front', label: 'Front', imageUrl: primaryFront },
    { key: 'back', label: 'Back', imageUrl: g.back?.trim() || null },
    { key: 'side', label: 'Side', imageUrl: g.side?.trim() || null },
    { key: 'camera', label: 'Camera', imageUrl: g.camera?.trim() || null },
    { key: 'display', label: 'Display', imageUrl: g.display?.trim() || null },
    { key: 'box', label: 'Box / Package', imageUrl: g.box?.trim() || null },
  ];
}

export const HOMEPAGE_POPULAR_SEARCH_CHIPS: string[] = [
  'vivo',
  'Redmi',
  'Xiaomi',
  'Nothing',
  'Lava',
  'Google Pixel',
  '8GB + 256GB',
  '5G Phones',
  'TWS',
  'Tempered Glass',
  'Chargers',
];

export const HOMEPAGE_MOBILE_CATEGORIES: HomepageMobileCategoryCard[] = [
  {
    id: 'cat-all-mobiles',
    title: 'All Mobiles',
    subtitle: 'Complete smartphone directory across vivo, Redmi, Xiaomi, Nothing, Lava & Google Pixel.',
    targetCategory: 'All Smartphones',
    badge: 'All Models',
  },
  {
    id: 'cat-5g-mobiles',
    title: '5G Mobiles',
    subtitle: '5G smartphones across vivo, Redmi, Xiaomi, Nothing & Google Pixel.',
    targetCategory: '5G Smartphones',
    badge: '5G Models',
  },
  {
    id: 'cat-budget-mobiles',
    title: 'Budget Mobiles',
    subtitle: 'Keypad & entry smartphones under ₹15,000 from Lava, Redmi & vivo.',
    targetCategory: 'Budget Smartphones',
    badge: 'Under ₹15,000',
  },
  {
    id: 'cat-midrange-mobiles',
    title: 'Mid-Range Mobiles',
    subtitle: 'Models between ₹15,000 and ₹35,000 across vivo, Redmi & Nothing.',
    targetCategory: 'Mid-Range Smartphones',
    badge: '₹15K – ₹35K',
  },
  {
    id: 'cat-premium-mobiles',
    title: 'Premium Mobiles',
    subtitle: 'Models between ₹35,000 and ₹65,000 across vivo V/S/T, Xiaomi, Nothing & Pixel.',
    targetCategory: 'Premium Smartphones',
    badge: '₹35K – ₹65K',
  },
  {
    id: 'cat-flagship-mobiles',
    title: 'Flagship Mobiles',
    subtitle: 'Flagship & foldable devices above ₹65,000 across vivo X, Xiaomi Ultra & Pixel Pro.',
    targetCategory: 'Flagship Smartphones',
    badge: 'Flagship Tier',
  },
  {
    id: 'cat-gaming-mobiles',
    title: 'Gaming Mobiles',
    subtitle: 'High-performance T Series, Note Pro & Ultra series smartphones.',
    targetCategory: 'Gaming Smartphones',
    badge: 'Performance',
  },
  {
    id: 'cat-camera-mobiles',
    title: 'Camera Mobiles',
    subtitle: 'vivo V & X Series, Xiaomi 17 Series and Google Pixel 10/11 Pro lineup.',
    targetCategory: 'Camera Smartphones',
    badge: 'Flagship Optics',
  },
];

export const HOMEPAGE_ACCESSORY_ENTRY_TILES: HomepageAccessoryEntryTile[] = [
  {
    id: 'acc-entry-chargers',
    label: 'Chargers',
    subtitle: 'Wall adapters, fast chargers & car power',
    targetCategory: 'Chargers',
    visualType: 'chargers',
  },
  {
    id: 'acc-entry-cables',
    label: 'Cables',
    subtitle: 'USB Type-C, Lightning & fast data sync',
    targetCategory: 'Cables',
    visualType: 'cables',
  },
  {
    id: 'acc-entry-powerbanks',
    label: 'Power Banks',
    subtitle: 'Multi-port & MagSafe fast power backup',
    targetCategory: 'Power Banks',
    visualType: 'powerbanks',
  },
  {
    id: 'acc-entry-smartwatches',
    label: 'Smart Watches',
    subtitle: 'Pixel Watch, Fitbit & calling smartwatches',
    targetCategory: 'Smart Watches',
    visualType: 'other',
  },
  {
    id: 'acc-entry-speakers',
    label: 'Bluetooth Speakers',
    subtitle: 'Portable wireless speakers for music',
    targetCategory: 'Bluetooth Speakers',
    visualType: 'audio-acc',
  },
  {
    id: 'acc-entry-holders',
    label: 'Mobile Holders',
    subtitle: 'Desk stands, monopods, car & bike mounts',
    targetCategory: 'Mobile Holders',
    visualType: 'stands',
  },
  {
    id: 'acc-entry-tws',
    label: 'TWS / Earbuds',
    subtitle: 'True wireless earbuds with charging cases',
    targetCategory: 'TWS / Earbuds',
    visualType: 'tws',
  },
  {
    id: 'acc-entry-earphones',
    label: 'Earphones',
    subtitle: 'Wireless neckbands & wired earphones',
    targetCategory: 'Earphones',
    visualType: 'earphones',
  },
  {
    id: 'acc-entry-tempered',
    label: 'Tempered Glass',
    subtitle: '9H screen guards, privacy & matte glass',
    targetCategory: 'Tempered Glass',
    visualType: 'tempered',
  },
  {
    id: 'acc-entry-covers',
    label: 'Mobile Covers',
    subtitle: 'Silicone, matte, clear & shockproof cases',
    targetCategory: 'Mobile Covers',
    visualType: 'cases',
  },
  {
    id: 'acc-entry-straps',
    label: 'Smart Watch Straps',
    subtitle: 'Silicone, magnetic & metal replacement straps',
    targetCategory: 'Smart Watch Straps',
    visualType: 'other',
  },
  {
    id: 'acc-entry-other',
    label: 'Other Mobile Accessories',
    subtitle: 'OTG adapters, memory cards & essentials',
    targetCategory: 'Other Mobile Accessories',
    visualType: 'other',
  },
];

export const INITIAL_BRAND_DIRECTORY: BrandDirectoryEntry[] = [
  {
    id: 'brand-vivo',
    name: 'vivo',
    monogram: 'VV',
    originNote: 'Y, S, V, T, X Series & Accessories',
    seriesList: ['Y SERIES', 'S SERIES', 'V SERIES', 'T SERIES', 'X SERIES', 'Accessories'],
    featured: true,
  },
  {
    id: 'brand-redmi',
    name: 'Redmi',
    monogram: 'RM',
    originNote: 'Redmi A, C, Number & Note Series',
    seriesList: ['Redmi A Series', 'Redmi C Series', 'Redmi Number Series', 'Redmi Note Series'],
    featured: true,
  },
  {
    id: 'brand-xiaomi',
    name: 'Xiaomi',
    monogram: 'MI',
    originNote: 'Xiaomi 17, 17T & 17 Ultra Series',
    seriesList: ['Xiaomi 17 Series'],
    featured: true,
  },
  {
    id: 'brand-nothing',
    name: 'Nothing',
    monogram: 'NT',
    originNote: 'Phone 3a Lite, 4b, 4a & 4a Pro',
    seriesList: ['Phone 3a Series', 'Phone 4 Series'],
    featured: true,
  },
  {
    id: 'brand-lava',
    name: 'Lava',
    monogram: 'LV',
    originNote: 'Feature Phone Series',
    seriesList: ['Feature Phone Series'],
    featured: true,
  },
  {
    id: 'brand-pixel',
    name: 'Google Pixel',
    monogram: 'PX',
    originNote: 'Pixel 10, Pixel 11, Watch 5 & Fitbit',
    seriesList: ['Pixel 10 Series', 'Pixel 11 Series', 'Wearables & Watches'],
    featured: true,
  },
];

function extractRamAndStorageFromVariant(variant: string): {
  ramOptions: string[];
  storageOptions: string[];
} {
  const clean = variant.trim();
  if (!clean) {
    return { ramOptions: [], storageOptions: [] };
  }
  if (clean.includes('+')) {
    const [rawRam, rawStorage] = clean.split('+').map((s) => s.trim());
    const ramFormatted =
      rawRam && /^\d+$/.test(rawRam) ? `${rawRam}GB` : rawRam;
    const storageFormatted =
      rawStorage && /^\d+$/.test(rawStorage) ? `${rawStorage}GB` : rawStorage;
    return {
      ramOptions: ramFormatted ? [ramFormatted] : [clean],
      storageOptions: storageFormatted ? [storageFormatted] : [clean],
    };
  }
  return {
    ramOptions: [clean],
    storageOptions: [clean],
  };
}

function deriveCategoriesFromPriceListEntry(
  entry: PriceListProductEntry,
  numericMop: number | null
): Exclude<MobileCategorySlug, 'All Smartphones'>[] {
  const cats: Exclude<MobileCategorySlug, 'All Smartphones'>[] = [];
  const modelUpper = entry.model.toUpperCase();
  const seriesUpper = entry.series.toUpperCase();

  if (
    modelUpper.includes('5G') ||
    entry.brand === 'Nothing' ||
    entry.brand === 'Xiaomi' ||
    (entry.brand === 'Google Pixel' && entry.productType === 'smartphone') ||
    seriesUpper.includes('V SERIES') ||
    seriesUpper.includes('X SERIES') ||
    seriesUpper.includes('S SERIES')
  ) {
    cats.push('5G Smartphones');
  }

  if (numericMop !== null) {
    if (numericMop < 15000) {
      cats.push('Budget Smartphones');
    } else if (numericMop <= 35000) {
      cats.push('Mid-Range Smartphones');
    } else if (numericMop <= 65000) {
      cats.push('Premium Smartphones');
    } else {
      cats.push('Flagship Smartphones', 'Premium Smartphones');
    }
  } else {
    cats.push('Mid-Range Smartphones');
  }

  if (
    seriesUpper.includes('T SERIES') ||
    modelUpper.includes('PRO') ||
    modelUpper.includes('ULTRA')
  ) {
    cats.push('Gaming Smartphones');
  }

  if (
    seriesUpper.includes('V SERIES') ||
    seriesUpper.includes('X SERIES') ||
    entry.brand === 'Xiaomi' ||
    (entry.brand === 'Google Pixel' && entry.productType === 'smartphone')
  ) {
    cats.push('Camera Smartphones');
  }

  return Array.from(new Set(cats));
}

function mapPriceListEntryToSmartphoneProduct(
  entry: PriceListProductEntry,
  index: number,
  total: number
): SmartphoneProduct {
  const numericMop = parseNumericPrice(entry.mopPrice);
  const numericOldRp = parseNumericPrice(entry.oldRp);
  const numericEffective = parseNumericPrice(entry.effectivePrice);
  const { ramOptions, storageOptions } = extractRamAndStorageFromVariant(entry.variant);

  const variantCycle: SmartphoneProduct['visualVariant'][] = [
    'titanium-pro',
    'ultra-display',
    'portrait-studio',
    'sleek-5g',
    'note-series',
    'performance-ed',
    'all-rounder',
  ];

  const networkVal: SmartphoneProduct['network'] = entry.model.includes('5G')
    ? '5G'
    : entry.model.includes('4G') || entry.brand === 'Lava'
      ? '4G'
      : 'Details available on enquiry';

  const summaryParts = [
    entry.series,
    entry.variant ? `Variant: ${entry.variant}` : '',
    entry.colors.length > 0 ? `Colours: ${entry.colors.join(', ')}` : '',
    entry.effectivePrice ? `Effective: ${entry.effectivePrice}` : '',
    entry.oldRp ? `Old RP: ${entry.oldRp}` : '',
  ].filter(Boolean);

  const isFeatured =
    index === 0 ||
    entry.model === 'V80' ||
    entry.model === 'X300 ULTRA' ||
    entry.model === 'Redmi Note 17 Pro Max 5G' ||
    entry.model === 'Xiaomi 17 Ultra' ||
    entry.model === 'Phone 4a Pro' ||
    entry.model === 'Pixel 11 Pro XL (256 GB)' ||
    entry.model === 'Lava Action 4G';

  return {
    id: entry.id,
    productName:
      entry.variant && entry.variant !== 'Standard'
        ? `${entry.model} (${entry.variant})`
        : entry.model,
    brand: entry.brand,
    series: entry.series,
    model: entry.model,
    modelName: entry.model,
    variant: entry.variant,
    colors: [...entry.colors],
    colorOptions: [...entry.colors],
    mopPrice: entry.mopPrice?.trim() || 'Price on Enquiry',
    effectivePrice: entry.effectivePrice,
    oldRp: entry.oldRp,
    newRp: entry.newRp,
    discountFullSwipe: entry.discountFullSwipe,
    discountEmi: entry.discountEmi,
    offerPeriod: entry.offerPeriod,
    notes: entry.notes,
    source: entry.source,
    sourceImage: undefined,
    lastUpdated: entry.lastUpdated,
    productType: entry.productType,
    generation: 'Current Model',
    image: resolveVerifiedProductImages(entry)?.primaryImage,
    productImage: resolveVerifiedProductImages(entry)?.primaryImage,
    sourceUrl: OFFICIAL_BRAND_SOURCE_URLS[entry.brand] || undefined,
    galleryImages: resolveVerifiedProductImages(entry)?.galleryImages || {},
    colorImages: resolveVerifiedProductImages(entry)?.colorImages || {},
    visualVariant: variantCycle[index % variantCycle.length],
    keySpecSummary: summaryParts.join(' · '),
    specifications: {
      display: 'Details available on enquiry',
      processor: 'Details available on enquiry',
      rearCamera: 'Details available on enquiry',
      frontCamera: 'Details available on enquiry',
      battery: 'Details available on enquiry',
      charging: 'Details available on enquiry',
      network: networkVal,
      os: entry.brand === 'Lava' ? 'Feature OS' : 'Android',
    },
    display: 'Details available on enquiry',
    processor: 'Details available on enquiry',
    variants: entry.variant ? [entry.variant] : [],
    ramOptions,
    ramVariants: ramOptions,
    storageOptions,
    storageVariants: storageOptions,
    rearCamera: 'Details available on enquiry',
    frontCamera: 'Details available on enquiry',
    battery: 'Details available on enquiry',
    charging: 'Details available on enquiry',
    os: entry.brand === 'Lava' ? 'Feature OS' : 'Android',
    network: networkVal,
    screenSizeCategory: entry.model.toLowerCase().includes('fold')
      ? 'Foldable'
      : 'Details available on enquiry',
    cameraCategory: 'Details available on enquiry',
    batteryCategory: 'Details available on enquiry',
    launchInfo: `Last Updated: ${entry.lastUpdated}`,
    verifiedRating: null,
    verifiedReviewCount: null,
    price: numericMop,
    originalPrice: numericOldRp,
    offerPrice: numericEffective ?? numericMop,
    availability: 'Check Availability',
    productStatus: isFeatured ? 'Featured' : 'Latest',
    categories: deriveCategoriesFromPriceListEntry(entry, numericMop),
    createdAtOrder: total - index,
    popularityOrder: index + 1,
  };
}

function createCatalogueSeedProducts(brands: BrandDirectoryEntry[]): SmartphoneProduct[] {
  const brandSet = new Set(brands.map((b) => b.name.toLowerCase()));
  const matchingEntries = CENTRALIZED_PRICE_LIST_DATA.filter((entry) =>
    brandSet.has(entry.brand.toLowerCase())
  );

  const products = matchingEntries.map((entry, idx) =>
    mapPriceListEntryToSmartphoneProduct(entry, idx, matchingEntries.length)
  );

  // Support custom brands added via Admin that are not in CENTRALIZED_PRICE_LIST_DATA
  for (const brand of brands) {
    const hasPriceListItems = products.some(
      (p) => p.brand.toLowerCase() === brand.name.toLowerCase()
    );
    if (!hasPriceListItems) {
      const firstSeries = brand.seriesList[0] || `${brand.name} Series`;
      products.push({
        id: `${brand.id}-custom-0`,
        productName: `${brand.name} ${firstSeries}`,
        brand: brand.name,
        series: firstSeries,
        model: `${brand.name} ${firstSeries}`,
        modelName: `${brand.name} ${firstSeries}`,
        variant: 'Standard',
        colors: [],
        colorOptions: [],
        mopPrice: 'Price on Enquiry',
        effectivePrice: '',
        source: 'Store Admin Entry',
        lastUpdated: 'Oct 2026',
        productType: 'smartphone',
        generation: 'Current Model',
        visualVariant: 'titanium-pro',
        keySpecSummary: `${firstSeries} · Store Admin Entry`,
        specifications: {
          display: 'Details available on enquiry',
          processor: 'Details available on enquiry',
          rearCamera: 'Details available on enquiry',
          frontCamera: 'Details available on enquiry',
          battery: 'Details available on enquiry',
          charging: 'Details available on enquiry',
          network: 'Details available on enquiry',
          os: 'Android',
        },
        display: 'Details available on enquiry',
        processor: 'Details available on enquiry',
        variants: ['Standard'],
        ramOptions: ['Standard'],
        ramVariants: ['Standard'],
        storageOptions: ['Standard'],
        storageVariants: ['Standard'],
        rearCamera: 'Details available on enquiry',
        frontCamera: 'Details available on enquiry',
        battery: 'Details available on enquiry',
        charging: 'Details available on enquiry',
        os: 'Android',
        network: 'Details available on enquiry',
        launchInfo: 'Store Admin Entry',
        verifiedRating: null,
        verifiedReviewCount: null,
        price: null,
        originalPrice: null,
        offerPrice: null,
        availability: 'Check Availability',
        productStatus: 'Catalogue',
        categories: ['Mid-Range Smartphones'],
        createdAtOrder: 1,
        popularityOrder: products.length + 1,
      });
    }
  }

  return products;
}

export function parseKeySpecParts(keySpec?: string): {
  display: string;
  processor: string;
  rearCamera: string;
  frontCamera: string;
  battery: string;
  charging: string;
} {
  if (!keySpec || !keySpec.trim()) {
    return {
      display: 'Details available on enquiry',
      processor: 'Details available on enquiry',
      rearCamera: 'Details available on enquiry',
      frontCamera: 'Details available on enquiry',
      battery: 'Details available on enquiry',
      charging: 'Details available on enquiry',
    };
  }
  const parts = keySpec
    .split('·')
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    display: parts[0] || keySpec,
    processor: parts[1] || parts[0] || 'Details available on enquiry',
    rearCamera: parts[2] || 'Details available on enquiry',
    frontCamera: 'Details available on enquiry',
    battery: parts[3] || 'Details available on enquiry',
    charging: parts[4] || 'Details available on enquiry',
  };
}

export function auditSmartphoneCatalogue(
  brands: BrandDirectoryEntry[] = INITIAL_BRAND_DIRECTORY,
  catalogue: SmartphoneProduct[] = INITIAL_SMARTPHONE_CATALOGUE
): CatalogueAuditReport {
  const modelCountByBrand: Record<string, number> = {};
  const seriesCountByBrand: Record<string, number> = {};
  const brandsWithIncompleteData: string[] = [];
  const seriesWithIncompleteData: string[] = [];
  const modelsWithoutVerifiedImages: Array<{
    brand: string;
    series: string;
    modelName: string;
  }> = [];

  let totalVerifiedBrands = 0;
  let totalVerifiedSeries = 0;

  for (const brand of brands) {
    const brandModels = catalogue.filter(
      (m) => m.brand.toLowerCase() === brand.name.toLowerCase()
    );
    modelCountByBrand[brand.name] = brandModels.length;

    const seriesDirectory = getSeriesDirectoryForBrand(brand.name, brands, catalogue);
    const verifiedSeriesForBrand = seriesDirectory.filter((s) => s.modelCount > 0);
    seriesCountByBrand[brand.name] = verifiedSeriesForBrand.length;
    totalVerifiedSeries += verifiedSeriesForBrand.length;

    let brandIncomplete = brand.seriesList.length === 0 || brandModels.length === 0;

    for (const s of seriesDirectory) {
      const modelsInSeries = brandModels.filter(
        (m) => m.series.toLowerCase() === s.seriesName.toLowerCase()
      );
      const hasMissingFields = modelsInSeries.some(
        (m) =>
          !m.brand ||
          !m.series ||
          !m.modelName ||
          !m.variant ||
          !m.mopPrice ||
          !m.source ||
          !m.lastUpdated
      );
      if (s.modelCount === 0 || hasMissingFields) {
        seriesWithIncompleteData.push(`${brand.name} :: ${s.seriesName}`);
        brandIncomplete = true;
      }
    }

    if (brandIncomplete) {
      brandsWithIncompleteData.push(brand.name);
    } else {
      totalVerifiedBrands++;
    }
  }

  for (const m of catalogue) {
    const img = (m.productImage || m.image || m.sourceImage || '').trim();
    if (!img) {
      modelsWithoutVerifiedImages.push({
        brand: m.brand,
        series: m.series,
        modelName: m.modelName,
      });
    }
  }

  return {
    totalVerifiedBrands,
    totalVerifiedSeries,
    totalVerifiedModels: catalogue.length,
    brandsWithIncompleteData,
    seriesWithIncompleteData,
    modelsWithoutVerifiedImages,
    modelCountByBrand,
    seriesCountByBrand,
  };
}

export const INITIAL_SMARTPHONE_CATALOGUE: SmartphoneProduct[] =
  createCatalogueSeedProducts(INITIAL_BRAND_DIRECTORY);

export function getSeriesDirectoryForBrand(
  brandName: string,
  brands: BrandDirectoryEntry[],
  catalogue: SmartphoneProduct[]
): SeriesCatalogueSummary[] {
  const brandEntry = brands.find((b) => b.name.toLowerCase() === brandName.toLowerCase());
  const brandModels = catalogue.filter((m) => m.brand.toLowerCase() === brandName.toLowerCase());

  const declaredSeries = brandEntry ? [...brandEntry.seriesList] : [];
  for (const m of brandModels) {
    if (!declaredSeries.some((s) => s.toLowerCase() === m.series.toLowerCase())) {
      declaredSeries.push(m.series);
    }
  }

  return declaredSeries.map((seriesName) => {
    const modelsInSeries = brandModels.filter(
      (m) => m.series.toLowerCase() === seriesName.toLowerCase()
    );
    const currentModelCount = modelsInSeries.filter(
      (m) => m.generation !== 'Previous Model'
    ).length;
    const previousModelCount = modelsInSeries.filter(
      (m) => m.generation === 'Previous Model'
    ).length;
    const firstWithImage = modelsInSeries.find((m) => Boolean(m.productImage || m.image));

    return {
      seriesName,
      brandName: brandEntry?.name || brandName,
      modelCount: modelsInSeries.length,
      currentModelCount,
      previousModelCount,
      representativeImage: firstWithImage?.productImage || firstWithImage?.image,
      representativeModel: firstWithImage?.modelName || modelsInSeries[0]?.modelName,
    };
  });
}


export const INITIAL_OFFER_CARDS: OfferCardItem[] = [
  {
    id: 'offer-today',
    kicker: 'Store Enquiry · 01',
    title: "Ask About Today's Offers",
    description:
      'Contact Friends Cell Point directly to check any ongoing store promotions on smartphones, TWS buds or accessory combos.',
    buttonText: "Ask About Today's Offers",
    enquiryMessage:
      "Hello Friends Cell Point, I would like to ask about today's store offers on mobiles and accessories.",
  },
  {
    id: 'offer-stock',
    kicker: 'Availability Check · 02',
    title: 'Check Current Stock',
    description:
      'Looking for a specific smartphone brand, model, mobile cover, tempered glass or charger? Message us to confirm stock.',
    buttonText: 'Check Stock on WhatsApp',
    enquiryMessage:
      'Hello Friends Cell Point, I would like to check current stock availability for a mobile or accessory.',
  },
  {
    id: 'offer-whatsapp',
    kicker: 'Direct Assistance · 03',
    title: 'Ask About a Product',
    description:
      'Connect directly with Friends Cell Point on WhatsApp for current pricing on smartphones, audio gear and protection.',
    buttonText: 'Ask About a Product',
    enquiryMessage:
      'Hello Friends Cell Point, I would like to enquire about a mobile/accessory.',
  },
];

export function formatStockStatusBadge(status: InventoryStatus): StockBadgeLabel {
  switch (status) {
    case 'Available':
      return 'AVAILABLE';
    case 'Out of Stock':
      return 'OUT OF STOCK';
    case 'Enquire':
    case 'Coming Soon':
      return 'ENQUIRE';
    case 'Check Availability':
    default:
      return 'CHECK AVAILABILITY';
  }
}

export function formatVerifiedSpecValue(value: string | string[] | undefined | null): string {
  if (!value) return 'Details available on enquiry';
  const joined = Array.isArray(value) ? value.join(' · ') : value.trim();
  if (
    !joined ||
    joined.toLowerCase().includes('check details') ||
    joined.toLowerCase().includes('coming soon') ||
    joined.toLowerCase().includes('details available on enquiry') ||
    joined.toLowerCase().includes('check available colours')
  ) {
    return 'Details available on enquiry';
  }
  return joined;
}

export function formatComparisonValue(
  value: string | string[] | number | undefined | null,
  isPrice = false
): string {
  if (value === null || value === undefined) {
    return 'Check with store';
  }
  if (isPrice && typeof value === 'number') {
    return `₹${value.toLocaleString('en-IN')}`;
  }
  const str = Array.isArray(value)
    ? value
        .filter((v) => !v.toLowerCase().includes('details') && !v.toLowerCase().includes('check'))
        .join(', ')
    : String(value).trim();

  if (
    !str ||
    str.toLowerCase().includes('check details') ||
    str.toLowerCase().includes('coming soon') ||
    str.toLowerCase().includes('details available on enquiry') ||
    str.toLowerCase().includes('check available') ||
    str.toLowerCase().includes('enquire for')
  ) {
    return 'Check with store';
  }
  return str;
}

export function buildWhatsAppUrl(customMessage?: string): string {
  const cleanMessage =
    customMessage && customMessage.trim().length > 0
      ? customMessage.trim()
      : STORE_INFO.defaultWhatsAppMessage;
  return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(cleanMessage)}`;
}

export function formatPublicMopPrice(
  mopPrice?: string | null,
  numericPrice?: number | null
): string {
  const cleanMop = mopPrice?.trim() || '';
  const lowerMop = cleanMop.toLowerCase();
  if (
    cleanMop &&
    lowerMop !== 'check price' &&
    lowerMop !== 'price on enquiry' &&
    lowerMop !== 'needs verification' &&
    lowerMop !== 'not explicitly listed'
  ) {
    return cleanMop.startsWith('₹') ? cleanMop : `₹${cleanMop}`;
  }
  if (
    numericPrice !== null &&
    numericPrice !== undefined &&
    Number.isFinite(numericPrice) &&
    numericPrice > 0
  ) {
    return `₹${numericPrice.toLocaleString('en-IN')}`;
  }
  return 'Price on Enquiry';
}

export function buildPriceListWhatsAppMessage(params: {
  brand: string;
  model: string;
  variant: string;
  price: string;
}): string {
  const brand = params.brand.trim() || 'Needs verification';
  const model = params.model.trim() || 'Needs verification';
  const variant = params.variant.trim() || 'Standard';
  const rawPrice = params.price.trim();
  const price =
    rawPrice && rawPrice.toLowerCase() !== 'check price'
      ? rawPrice
      : 'Price on Enquiry';

  return `Hi Friends Cell Point, I am interested in:
Brand: ${brand}
Model: ${model}
Variant: ${variant}
Price: ${price}

Please confirm availability.`;
}

export function buildProductEnquiryWhatsAppMessage(
  productName: string,
  variantNote?: string
): string {
  const cleanName = productName.trim();
  const base = `Hello Friends Cell Point, I would like to enquire about ${cleanName}. Please share the current price and availability.`;
  if (variantNote && variantNote.trim().length > 0) {
    return `${base} (${variantNote.trim()})`;
  }
  return base;
}

export function buildPhoneModelWhatsAppMessage(
  brand: string,
  modelName: string,
  variantNote?: string
): string {
  const cleanModel = modelName.toLowerCase().startsWith(brand.toLowerCase())
    ? modelName.trim()
    : `${brand.trim()} ${modelName.trim()}`;
  const base = `Hello Friends Cell Point, I would like to know the price and availability of ${cleanModel}.`;
  if (variantNote && variantNote.trim().length > 0) {
    return `${base} (${variantNote.trim()})`;
  }
  return base;
}

export function buildCatalogueProductWhatsAppMessage(
  productName: string,
  forPhoneModel?: string
): string {
  const target =
    forPhoneModel && forPhoneModel.trim().length > 0
      ? `${productName.trim()} for ${forPhoneModel.trim()}`
      : productName.trim();
  return `Hello Friends Cell Point, I want to enquire about ${target}. Please share the current price and availability.`;
}

export function buildTemperedGlassEnquiryUrl(phoneModelNote?: string): string {
  const msg =
    phoneModelNote && phoneModelNote.trim().length > 0
      ? `${STORE_INFO.temperedGlassMessage} (Model: ${phoneModelNote.trim()})`
      : STORE_INFO.temperedGlassMessage;
  return buildWhatsAppUrl(msg);
}

export function resolveUniversalCatalogueSearch(
  rawQuery: string,
  brands: BrandDirectoryEntry[]
):
  | {
      targetSection: 'accessories';
      accessoryCategory: AccessoryCategoryName | 'All';
      searchQuery: string;
    }
  | {
      targetSection: 'mobiles';
      brand: string;
      category: MobileCategorySlug;
      searchQuery: string;
    } {
  const q = rawQuery.trim();
  const lower = q.toLowerCase();

  const accessoryMap: Array<{ keywords: string[]; category: AccessoryCategoryName }> = [
    { keywords: ['tws', 'buds', 'earbud', 'earbuds', 'airpods', 'buds xe'], category: 'TWS / Earbuds' },
    { keywords: ['tempered', 'screen guard', 'glass', 'screen protector'], category: 'Tempered Glass' },
    { keywords: ['charger', 'chargers', 'adapter', 'supervooc', 'flashcharge', '15w'], category: 'Chargers' },
    { keywords: ['cover', 'covers', 'case', 'cases', 'back cover', 'silicone case'], category: 'Mobile Covers' },
    { keywords: ['cable', 'cables', 'usb', 'type-c', 'type c', 'lightning'], category: 'Cables' },
    { keywords: ['earphone', 'earphones', 'neckband', 'wireless earphone', 'wired earphone'], category: 'Earphones' },
    { keywords: ['power bank', 'powerbank', 'power banks', 'battery pack'], category: 'Power Banks' },
    { keywords: ['watch', 'smart watch', 'smartwatches', 'pixel watch', 'fitbit'], category: 'Smart Watches' },
    { keywords: ['speaker', 'speakers', 'bluetooth speaker'], category: 'Bluetooth Speakers' },
    { keywords: ['holder', 'holders', 'stand', 'mount', 'monopod'], category: 'Mobile Holders' },
    { keywords: ['strap', 'straps', 'watch strap', 'watch band'], category: 'Smart Watch Straps' },
    { keywords: ['otg', 'memory card', 'essentials', 'headphone'], category: 'Other Mobile Accessories' },
  ];

  for (const entry of accessoryMap) {
    if (entry.keywords.some((kw) => lower === kw || lower.includes(kw))) {
      return {
        targetSection: 'accessories',
        accessoryCategory: entry.category,
        searchQuery: '',
      };
    }
  }

  if (lower === '5g phones' || lower === '5g mobiles') {
    return {
      targetSection: 'mobiles',
      brand: 'All',
      category: '5G Smartphones',
      searchQuery: '5G',
    };
  }

  const matchedBrand = brands.find((b) => b.name.toLowerCase() === lower);
  if (matchedBrand) {
    return {
      targetSection: 'mobiles',
      brand: matchedBrand.name,
      category: 'All Smartphones',
      searchQuery: '',
    };
  }

  return {
    targetSection: 'mobiles',
    brand: 'All',
    category: 'All Smartphones',
    searchQuery: q,
  };
}

export const DEFAULT_MOBILE_FILTER_STATE: AdvancedMobileFilterState = {
  searchQuery: '',
  brand: 'All',
  series: 'All',
  generationFilter: 'All',
  category: 'All Smartphones',
  priceRange: 'All',
  ram: 'All',
  storage: 'All',
  network5G: 'All',
  camera: 'All',
  battery: 'All',
  screenSize: 'All',
  processor: 'All',
  os: 'All',
  sortBy: 'popular',
};

export function filterAndSortSmartphoneCatalogue(
  catalogue: SmartphoneProduct[],
  filters: AdvancedMobileFilterState
): SmartphoneProduct[] {
  const q = filters.searchQuery.trim().toLowerCase();

  const filtered = catalogue.filter((item) => {
    if (filters.brand !== 'All' && item.brand.toLowerCase() !== filters.brand.toLowerCase()) {
      return false;
    }
    if (filters.series !== 'All' && item.series.toLowerCase() !== filters.series.toLowerCase()) {
      return false;
    }
    if (
      filters.generationFilter &&
      filters.generationFilter !== 'All' &&
      (item.generation || 'Current Model') !== filters.generationFilter
    ) {
      return false;
    }
    if (
      filters.category !== 'All Smartphones' &&
      !item.categories.includes(filters.category)
    ) {
      return false;
    }
    if (filters.priceRange !== 'All') {
      const numericPrice = item.price ?? parseNumericPrice(item.mopPrice);
      switch (filters.priceRange) {
        case 'Under ₹10,000':
          if (numericPrice === null || numericPrice >= 10000) return false;
          break;
        case '₹10,000 - ₹20,000':
          if (numericPrice === null || numericPrice < 10000 || numericPrice > 20000) return false;
          break;
        case '₹20,000 - ₹35,000':
          if (numericPrice === null || numericPrice < 20000 || numericPrice > 35000) return false;
          break;
        case '₹35,000 - ₹60,000':
          if (numericPrice === null || numericPrice < 35000 || numericPrice > 60000) return false;
          break;
        case 'Above ₹60,000':
          if (numericPrice === null || numericPrice <= 60000) return false;
          break;
        default: {
          const targetCat = `${filters.priceRange} Smartphones` as Exclude<
            MobileCategorySlug,
            'All Smartphones'
          >;
          if (!item.categories.includes(targetCat)) {
            return false;
          }
        }
      }
    }
    if (filters.network5G === '5G' && !item.network.includes('5G') && !item.modelName.includes('5G')) {
      return false;
    }
    if (filters.network5G === '4G' && !item.network.includes('4G') && !item.modelName.includes('4G') && item.brand !== 'Lava') {
      return false;
    }
    if (filters.os !== 'All') {
      if (!item.os.toLowerCase().includes(filters.os.toLowerCase())) {
        return false;
      }
    }
    if (filters.ram !== 'All') {
      const ramJoined = `${item.variant || ''} ${item.ramOptions.join(' ')}`.toLowerCase();
      const ramToken = filters.ram.toLowerCase().replace('gb', '');
      if (
        !ramJoined.includes(filters.ram.toLowerCase()) &&
        !new RegExp(`\\b${ramToken}\\s*(gb|\\+)`, 'i').test(ramJoined)
      ) {
        return false;
      }
    }
    if (filters.storage !== 'All') {
      const storageJoined = `${item.variant || ''} ${item.storageOptions.join(' ')}`.toLowerCase();
      const storageToken = filters.storage.toLowerCase().replace('gb', '');
      if (
        !storageJoined.includes(filters.storage.toLowerCase()) &&
        !new RegExp(`(\\+|\\b)${storageToken}\\s*(gb|\\b)`, 'i').test(storageJoined)
      ) {
        return false;
      }
    }
    if (filters.camera !== 'All') {
      const camStr = `${item.cameraCategory || ''} ${item.rearCamera} ${item.categories.join(' ')}`.toLowerCase();
      if (!camStr.includes(filters.camera.toLowerCase())) {
        return false;
      }
    }
    if (filters.battery !== 'All') {
      const batStr = `${item.batteryCategory || ''} ${item.battery}`.toLowerCase();
      if (!batStr.includes(filters.battery.toLowerCase())) {
        return false;
      }
    }
    if (filters.screenSize !== 'All') {
      const scrStr = `${item.screenSizeCategory || ''} ${item.display}`.toLowerCase();
      if (!scrStr.includes(filters.screenSize.toLowerCase())) {
        return false;
      }
    }
    if (!q) return true;

    const normalizedQ = q.replace(/\bphones\b|\bmobiles\b/g, '').trim() || q;
    const searchableBlob = [
      item.brand,
      item.modelName,
      item.model,
      item.variant || '',
      item.mopPrice || '',
      item.effectivePrice || '',
      item.colors.join(' '),
      item.modelNumber || '',
      item.series,
      item.generation || '',
      item.ramOptions.join(' '),
      item.storageOptions.join(' '),
      item.network,
      item.categories.join(' '),
      item.keySpecSummary || '',
    ]
      .join(' ')
      .toLowerCase();

    const tokens = normalizedQ.split(/\s+/).filter(Boolean);
    return tokens.every((token) => searchableBlob.includes(token));
  });

  return [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case 'brand-asc':
        return a.brand.localeCompare(b.brand) || a.modelName.localeCompare(b.modelName);
      case 'newest':
        return b.createdAtOrder - a.createdAtOrder;
      case 'price-asc': {
        const pa = a.price ?? parseNumericPrice(a.mopPrice) ?? Number.MAX_SAFE_INTEGER;
        const pb = b.price ?? parseNumericPrice(b.mopPrice) ?? Number.MAX_SAFE_INTEGER;
        return pa - pb || a.popularityOrder - b.popularityOrder;
      }
      case 'price-desc': {
        const pa = a.price ?? parseNumericPrice(a.mopPrice) ?? -1;
        const pb = b.price ?? parseNumericPrice(b.mopPrice) ?? -1;
        return pb - pa || a.popularityOrder - b.popularityOrder;
      }
      case 'popular':
      default:
        return a.popularityOrder - b.popularityOrder;
    }
  });
}

export function getInstantSearchSuggestions(
  query: string,
  brands: BrandDirectoryEntry[],
  catalogue: SmartphoneProduct[],
  limit = 8
): SearchSuggestionItem[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return [
      { id: 'sug-vivo', type: 'brand', label: 'vivo', sublabel: 'Y, S, V, T & X Series Smartphones', queryValue: 'vivo', brandName: 'vivo' },
      { id: 'sug-redmi', type: 'brand', label: 'Redmi', sublabel: 'Redmi A, Number, C & Note Series', queryValue: 'Redmi', brandName: 'Redmi' },
      { id: 'sug-xiaomi', type: 'brand', label: 'Xiaomi', sublabel: 'Xiaomi 17, 17T & 17 Ultra', queryValue: 'Xiaomi', brandName: 'Xiaomi' },
      { id: 'sug-nothing', type: 'brand', label: 'Nothing', sublabel: 'Phone 3a Lite, 4b, 4a & 4a Pro', queryValue: 'Nothing', brandName: 'Nothing' },
      { id: 'sug-lava', type: 'brand', label: 'Lava', sublabel: 'Feature & Keypad Series', queryValue: 'Lava', brandName: 'Lava' },
      { id: 'sug-pixel', type: 'brand', label: 'Google Pixel', sublabel: 'Pixel 10, Pixel 11, Watch 5 & Fitbit', queryValue: 'Google Pixel', brandName: 'Google Pixel' },
      { id: 'sug-tws', type: 'accessory', label: 'TWS / Earbuds', sublabel: 'Accessory · True Wireless Earbuds', queryValue: 'TWS', accessoryCategory: 'TWS / Earbuds' },
    ];
  }

  const results: SearchSuggestionItem[] = [];

  for (const b of brands) {
    if (
      b.name.toLowerCase().includes(q) ||
      b.originNote.toLowerCase().includes(q)
    ) {
      results.push({
        id: `brand-${b.id}`,
        type: 'brand',
        label: b.name,
        sublabel: `Brand · ${b.originNote}`,
        queryValue: b.name,
        brandName: b.name,
      });
    }

    for (const sName of b.seriesList) {
      const fullSeriesLabel = `${b.name} ${sName}`;
      if (
        sName.toLowerCase().includes(q) ||
        fullSeriesLabel.toLowerCase().includes(q)
      ) {
        results.push({
          id: `series-${b.id}-${sName}`,
          type: 'series',
          label: fullSeriesLabel,
          sublabel: `Series · ${b.name} Smartphones`,
          queryValue: fullSeriesLabel,
          brandName: b.name,
          seriesName: sName,
        });
      }
    }
  }

  for (const acc of INITIAL_ACCESSORIES_CATALOGUE) {
    if (
      acc.category.toLowerCase().includes(q) ||
      acc.productName.toLowerCase().includes(q) ||
      acc.shortDescription.toLowerCase().includes(q)
    ) {
      results.push({
        id: `acc-${acc.id}`,
        type: 'accessory',
        label: acc.category,
        sublabel: `Accessory · ${acc.productName}`,
        queryValue: acc.category,
        accessoryCategory: acc.category,
      });
    }
  }

  const specQuickTokens = ['8GB + 256GB', '12GB + 256GB', '8+256', '12+512', '256GB', '128GB', '512GB', '5G'];
  for (const specToken of specQuickTokens) {
    if (specToken.toLowerCase().includes(q)) {
      results.push({
        id: `spec-${specToken}`,
        type: 'spec',
        label: `${specToken} Variant`,
        sublabel: `Filter by ${specToken} variant`,
        queryValue: specToken,
      });
    }
  }

  const normalizedQ = q.replace(/\bphones\b|\bmobiles\b/g, '').trim() || q;
  for (const prod of catalogue) {
    if (results.length >= limit) break;
    const blob = `${prod.brand} ${prod.modelName} ${prod.variant} ${prod.series} ${prod.colors.join(' ')} ${prod.mopPrice}`.toLowerCase();
    const tokens = normalizedQ.split(/\s+/).filter(Boolean);
    if (tokens.every((t) => blob.includes(t))) {
      results.push({
        id: `model-${prod.id}`,
        type: 'model',
        label: `${prod.modelName} (${prod.variant})`,
        sublabel: `${prod.brand} · ${prod.series} · MOP: ${prod.mopPrice}`,
        queryValue: prod.modelName,
        brandName: prod.brand,
        product: prod,
      });
    }
  }

  return results.slice(0, limit);
}

export function getRelatedProductsForPhone(
  catalogue: SmartphoneProduct[],
  currentProduct: SmartphoneProduct,
  maxItems = 4
): SmartphoneProduct[] {
  const sameBrand = catalogue.filter(
    (p) =>
      p.id !== currentProduct.id &&
      p.brand.toLowerCase() === currentProduct.brand.toLowerCase()
  );

  if (sameBrand.length >= maxItems) {
    return sameBrand.slice(0, maxItems);
  }

  const sameCategory = catalogue.filter(
    (p) =>
      p.id !== currentProduct.id &&
      p.brand.toLowerCase() !== currentProduct.brand.toLowerCase() &&
      p.categories.some((cat) => currentProduct.categories.includes(cat))
  );

  return [...sameBrand, ...sameCategory].slice(0, maxItems);
}

export function getCompatibleAccessoriesForPhone(
  accessories: AccessoryCatalogueItem[],
  brand: string,
  modelName: string
): {
  cases: AccessoryCatalogueItem[];
  temperedGlass: AccessoryCatalogueItem[];
  chargers: AccessoryCatalogueItem[];
  cables: AccessoryCatalogueItem[];
  earphones: AccessoryCatalogueItem[];
  tws: AccessoryCatalogueItem[];
  otherAccessories: AccessoryCatalogueItem[];
  allCompatibleList: Array<{ label: string; item: AccessoryCatalogueItem }>;
} {
  const isApple = brand.toLowerCase() === 'apple' || modelName.toLowerCase().includes('iphone');
  const cases = accessories.filter((a) => a.compatibleFitGroup === 'cases');
  const temperedGlass = accessories.filter((a) => a.compatibleFitGroup === 'tempered');
  const chargers = accessories.filter((a) => a.compatibleFitGroup === 'chargers');
  const cables = accessories.filter((a) => {
    if (a.compatibleFitGroup !== 'cables') return false;
    if (!isApple && a.productName.toLowerCase().includes('lightning')) return false;
    return true;
  });
  const earphones = accessories.filter((a) => a.compatibleFitGroup === 'earphones');
  const tws = accessories.filter((a) => a.compatibleFitGroup === 'tws');
  const otherAccessories = accessories.filter(
    (a) =>
      (a.compatibleFitGroup === 'other' ||
        a.compatibleFitGroup === 'tws' ||
        a.compatibleFitGroup === 'earphones') &&
      (!modelName || a.productName.length > 0)
  );

  const allCompatibleList: Array<{ label: string; item: AccessoryCatalogueItem }> = [
    ...(cases[0] ? [{ label: 'Cases', item: cases[0] }] : []),
    ...(temperedGlass[0] ? [{ label: 'Tempered Glass', item: temperedGlass[0] }] : []),
    ...(chargers[0] ? [{ label: 'Chargers', item: chargers[0] }] : []),
    ...(cables[0] ? [{ label: 'Cables', item: cables[0] }] : []),
    ...(earphones[0] ? [{ label: 'Earphones', item: earphones[0] }] : []),
    ...(tws[0] ? [{ label: 'TWS', item: tws[0] }] : []),
    ...(otherAccessories.find((a) => a.compatibleFitGroup === 'other')
      ? [
          {
            label: 'Other compatible accessories',
            item: otherAccessories.find((a) => a.compatibleFitGroup === 'other')!,
          },
        ]
      : []),
  ];

  return {
    cases,
    temperedGlass,
    chargers,
    cables,
    earphones,
    tws,
    otherAccessories,
    allCompatibleList,
  };
}

export function addBrandToDirectory(
  brands: BrandDirectoryEntry[],
  catalogue: SmartphoneProduct[],
  input: { name: string; originNote?: string; seriesCsv?: string }
):
  | { ok: true; brands: BrandDirectoryEntry[]; catalogue: SmartphoneProduct[] }
  | { ok: false; error: string } {
  const cleanName = input.name.trim();
  if (!cleanName) {
    return { ok: false, error: 'Brand name is required.' };
  }
  if (brands.some((b) => b.name.toLowerCase() === cleanName.toLowerCase())) {
    return { ok: false, error: 'Brand already exists in directory.' };
  }
  const parsedSeries = input.seriesCsv
    ? input.seriesCsv
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [`${cleanName} Series`];

  const seriesList = parsedSeries.length > 0 ? parsedSeries : ['All Models'];
  const monogram = cleanName.slice(0, 2).toUpperCase();
  const newBrand: BrandDirectoryEntry = {
    id: `brand-${cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
    name: cleanName,
    monogram,
    originNote: input.originNote?.trim() || `${cleanName} Price List`,
    seriesList,
    featured: true,
  };

  const newSeedModels = createCatalogueSeedProducts([newBrand]).filter(
    (m) => m.brand.toLowerCase() === cleanName.toLowerCase()
  );
  return {
    ok: true,
    brands: [...brands, newBrand],
    catalogue: [...newSeedModels, ...catalogue],
  };
}

export function deleteBrandFromDirectory(
  brands: BrandDirectoryEntry[],
  catalogue: SmartphoneProduct[],
  brandName: string
): { brands: BrandDirectoryEntry[]; catalogue: SmartphoneProduct[] } {
  return {
    brands: brands.filter((b) => b.name.toLowerCase() !== brandName.toLowerCase()),
    catalogue: catalogue.filter((p) => p.brand.toLowerCase() !== brandName.toLowerCase()),
  };
}

export function upsertSmartphoneModel(
  catalogue: SmartphoneProduct[],
  input: {
    id?: string;
    brand: string;
    modelName: string;
    series: string;
    variant?: string;
    mopPrice?: string;
    effectivePrice?: string;
    source?: string;
    lastUpdated?: string;
    productImage?: string;
    galleryImages?: ProductGalleryImages;
    display?: string;
    processor?: string;
    ramCsv?: string;
    storageCsv?: string;
    rearCamera?: string;
    frontCamera?: string;
    battery?: string;
    charging?: string;
    os?: string;
    network?: SmartphoneProduct['network'];
    colorsCsv?: string;
    price?: number | null;
    originalPrice?: number | null;
    offerPrice?: number | null;
    availability?: InventoryStatus;
    productStatus?: SmartphoneProduct['productStatus'];
  }
): { ok: true; catalogue: SmartphoneProduct[]; item: SmartphoneProduct } | { ok: false; error: string } {
  const brand = input.brand.trim();
  const modelName = input.modelName.trim();
  const series = input.series.trim() || 'Other Models';
  const variant = input.variant?.trim() || 'Standard';

  if (!brand) return { ok: false, error: 'Brand is required.' };
  if (!modelName) return { ok: false, error: 'Model Name is required.' };

  const ramOptions = input.ramCsv
    ? input.ramCsv
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [variant];
  const storageOptions = input.storageCsv
    ? input.storageCsv
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [variant];
  const colorOptions = input.colorsCsv
    ? input.colorsCsv
        .split(',')
        .map((s) => s.trim())
        .filter((s) => Boolean(s) && !s.toLowerCase().includes('details available'))
    : [];

  const cleanProductImage =
    input.productImage !== undefined
      ? input.productImage.trim() || undefined
      : undefined;

  if (input.id) {
    const existing = catalogue.find((c) => c.id === input.id);
    if (!existing) return { ok: false, error: 'Model not found.' };
    const mergedGallery: ProductGalleryImages = {
      ...(existing.galleryImages || {}),
      ...(input.galleryImages || {}),
      ...(input.productImage !== undefined && input.galleryImages?.front === undefined
        ? { front: cleanProductImage }
        : {}),
    };
    const finalPrimaryImage =
      input.productImage !== undefined
        ? cleanProductImage
        : mergedGallery.front?.trim() || existing.productImage;

    const updatedDisplay = input.display?.trim() || existing.display;
    const updatedProcessor = input.processor?.trim() || existing.processor;
    const updatedRearCam = input.rearCamera?.trim() || existing.rearCamera;
    const updatedFrontCam = input.frontCamera?.trim() || existing.frontCamera;
    const updatedBattery = input.battery?.trim() || existing.battery;
    const updatedCharging = input.charging?.trim() || existing.charging;
    const updatedOs = input.os?.trim() || existing.os;
    const updatedNetwork = input.network || existing.network;
    const updatedVariant = input.variant?.trim() || existing.variant;
    const updatedPriceNum = input.price !== undefined ? input.price : existing.price;
    const updatedMopStr =
      input.mopPrice?.trim() ||
      (updatedPriceNum !== null
        ? `₹${updatedPriceNum.toLocaleString('en-IN')}`
        : existing.mopPrice);

    const updatedItem: SmartphoneProduct = {
      ...existing,
      productName:
        updatedVariant && updatedVariant !== 'Standard'
          ? `${modelName} (${updatedVariant})`
          : modelName,
      brand,
      model: modelName,
      modelName,
      series,
      variant: updatedVariant,
      mopPrice: updatedMopStr,
      effectivePrice:
        input.effectivePrice !== undefined
          ? input.effectivePrice.trim()
          : existing.effectivePrice,
      source: input.source?.trim() || existing.source,
      lastUpdated: input.lastUpdated?.trim() || existing.lastUpdated,
      productImage: finalPrimaryImage,
      galleryImages: mergedGallery,
      specifications: {
        display: updatedDisplay,
        processor: updatedProcessor,
        rearCamera: updatedRearCam,
        frontCamera: updatedFrontCam,
        battery: updatedBattery,
        charging: updatedCharging,
        network: updatedNetwork,
        os: updatedOs,
      },
      display: updatedDisplay,
      processor: updatedProcessor,
      ramOptions: ramOptions.length ? ramOptions : existing.ramOptions,
      ramVariants: ramOptions.length ? ramOptions : existing.ramOptions,
      storageOptions: storageOptions.length ? storageOptions : existing.storageOptions,
      storageVariants: storageOptions.length ? storageOptions : existing.storageOptions,
      rearCamera: updatedRearCam,
      frontCamera: updatedFrontCam,
      battery: updatedBattery,
      charging: updatedCharging,
      os: updatedOs,
      network: updatedNetwork,
      colorOptions: input.colorsCsv !== undefined ? colorOptions : existing.colorOptions,
      colors: input.colorsCsv !== undefined ? colorOptions : existing.colors,
      price: updatedPriceNum,
      originalPrice:
        input.originalPrice !== undefined ? input.originalPrice : existing.originalPrice,
      offerPrice: input.offerPrice !== undefined ? input.offerPrice : existing.offerPrice,
      availability: input.availability || existing.availability,
      productStatus: input.productStatus || existing.productStatus,
    };
    return {
      ok: true,
      item: updatedItem,
      catalogue: catalogue.map((c) => (c.id === input.id ? updatedItem : c)),
    };
  }

  const displayVal = input.display?.trim() || 'Details available on enquiry';
  const processorVal = input.processor?.trim() || 'Details available on enquiry';
  const rearCamVal = input.rearCamera?.trim() || 'Details available on enquiry';
  const frontCamVal = input.frontCamera?.trim() || 'Details available on enquiry';
  const batteryVal = input.battery?.trim() || 'Details available on enquiry';
  const chargingVal = input.charging?.trim() || 'Details available on enquiry';
  const osVal = input.os?.trim() || (brand.toLowerCase() === 'lava' ? 'Feature OS' : 'Android');
  const netVal = input.network || 'Details available on enquiry';
  const galleryVal: ProductGalleryImages = input.galleryImages || {};
  const primaryImage = cleanProductImage || galleryVal.front?.trim() || undefined;
  const priceNum = input.price ?? parseNumericPrice(input.mopPrice);
  const mopPriceStr =
    input.mopPrice?.trim() ||
    (priceNum !== null ? `₹${priceNum.toLocaleString('en-IN')}` : 'Price on Enquiry');

  const newItem: SmartphoneProduct = {
    id: `model-${brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
    productName: variant !== 'Standard' ? `${modelName} (${variant})` : modelName,
    brand,
    model: modelName,
    modelName,
    series,
    variant,
    colors: colorOptions,
    colorOptions,
    mopPrice: mopPriceStr,
    effectivePrice: input.effectivePrice?.trim() || '',
    source: input.source?.trim() || 'Friends Cell Point Price List',
    lastUpdated: input.lastUpdated?.trim() || 'Oct 2026',
    productType: 'smartphone',
    productImage: primaryImage,
    galleryImages: galleryVal,
    visualVariant: 'titanium-pro',
    keySpecSummary: `${series} · Variant: ${variant}`,
    specifications: {
      display: displayVal,
      processor: processorVal,
      rearCamera: rearCamVal,
      frontCamera: frontCamVal,
      battery: batteryVal,
      charging: chargingVal,
      network: netVal,
      os: osVal,
    },
    display: displayVal,
    processor: processorVal,
    variants: [variant],
    ramOptions,
    ramVariants: ramOptions,
    storageOptions,
    storageVariants: storageOptions,
    rearCamera: rearCamVal,
    frontCamera: frontCamVal,
    battery: batteryVal,
    charging: chargingVal,
    os: osVal,
    network: netVal,
    screenSizeCategory: 'Details available on enquiry',
    cameraCategory: 'Details available on enquiry',
    batteryCategory: 'Details available on enquiry',
    launchInfo: `Last Updated: ${input.lastUpdated?.trim() || 'Oct 2026'}`,
    verifiedRating: null,
    verifiedReviewCount: null,
    price: priceNum,
    originalPrice: input.originalPrice ?? null,
    offerPrice: input.offerPrice ?? priceNum,
    availability: input.availability || 'Check Availability',
    productStatus: input.productStatus || 'Latest',
    categories: ['Mid-Range Smartphones'],
    createdAtOrder: catalogue.length + 100,
    popularityOrder: 1,
  };

  return {
    ok: true,
    item: newItem,
    catalogue: [newItem, ...catalogue],
  };
}

export function upsertAccessoryItem(
  accessories: AccessoryCatalogueItem[],
  input: {
    id: string;
    productName?: string;
    productImage?: string;
    price?: number | null;
    availability?: InventoryStatus;
    shortDescription?: string;
  }
): { ok: true; accessories: AccessoryCatalogueItem[]; item: AccessoryCatalogueItem } | { ok: false; error: string } {
  const existing = accessories.find((a) => a.id === input.id);
  if (!existing) {
    return { ok: false, error: 'Accessory category item not found.' };
  }
  const updated: AccessoryCatalogueItem = {
    ...existing,
    productName: input.productName?.trim() || existing.productName,
    productImage:
      input.productImage !== undefined && input.productImage.trim().length > 0
        ? input.productImage.trim()
        : existing.productImage,
    price: input.price !== undefined ? input.price : existing.price,
    availability: input.availability || existing.availability,
    shortDescription: input.shortDescription?.trim() || existing.shortDescription,
  };

  return {
    ok: true,
    item: updated,
    accessories: accessories.map((a) => (a.id === input.id ? updated : a)),
  };
}

export function deleteSmartphoneModel(
  catalogue: SmartphoneProduct[],
  id: string
): SmartphoneProduct[] {
  return catalogue.filter((item) => item.id !== id);
}

export function validateMapsConfigUrl(
  urlInput: string
): { ok: true; url: string } | { ok: false; error: string } {
  const trimmed = urlInput.trim();
  if (!trimmed) {
    return { ok: true, url: '' };
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return { ok: false, error: 'Please enter a valid http:// or https:// Google Maps link.' };
    }
    return { ok: true, url: parsed.toString() };
  } catch {
    return {
      ok: false,
      error: 'Please enter a valid URL (for example, https://maps.app.goo.gl/...).',
    };
  }
}

export function exportSmartphonesToCsv(catalogue: SmartphoneProduct[]): string {
  const headers = [
    'id',
    'brand',
    'series',
    'model',
    'variant',
    'colors',
    'mopPrice',
    'effectivePrice',
    'source',
    'lastUpdated',
    'availability',
  ];

  const escapeCsvCell = (val: string | number | null | undefined) => {
    const str = val === null || val === undefined ? '' : String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = catalogue.map((p) =>
    [
      p.id,
      p.brand,
      p.series,
      p.modelName || p.model,
      p.variant || 'Standard',
      p.colors.join(' | '),
      p.mopPrice || (p.price ? `₹${p.price.toLocaleString('en-IN')}` : 'Price on Enquiry'),
      p.effectivePrice || '',
      p.source || '',
      p.lastUpdated || '',
      p.availability,
    ]
      .map(escapeCsvCell)
      .join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

export function importSmartphonesFromCsvOrJson(
  rawText: string,
  existingCatalogue: SmartphoneProduct[]
):
  | { ok: true; catalogue: SmartphoneProduct[]; importedCount: number }
  | { ok: false; error: string } {
  const trimmed = rawText.trim();
  if (!trimmed) {
    return { ok: false, error: 'Please paste a non-empty JSON or CSV product dataset.' };
  }

  let rawRecords: Array<Record<string, unknown>> = [];

  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    try {
      const parsed = JSON.parse(trimmed);
      rawRecords = Array.isArray(parsed)
        ? parsed
        : Array.isArray(parsed.catalogue)
          ? parsed.catalogue
          : Array.isArray(parsed.products)
            ? parsed.products
            : [];
      if (!rawRecords.length) {
        return { ok: false, error: 'JSON dataset must be a non-empty array of smartphone objects.' };
      }
    } catch {
      return { ok: false, error: 'Invalid JSON syntax. Please check your JSON formatting.' };
    }
  } else {
    const lines = trimmed
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length < 2) {
      return {
        ok: false,
        error: 'CSV dataset must include a header row and at least one product row.',
      };
    }
    const headers = parseCsvLine(lines[0]).map((h) => h.trim());
    for (let i = 1; i < lines.length; i++) {
      const cols = parseCsvLine(lines[i]);
      const rowObj: Record<string, unknown> = {};
      headers.forEach((h, idx) => {
        rowObj[h] = cols[idx] ?? '';
      });
      rawRecords.push(rowObj);
    }
  }

  let updatedCatalogue = [...existingCatalogue];
  let importedCount = 0;

  for (const rec of rawRecords) {
    const brand = String(rec.brand || '').trim();
    const model = String(rec.modelName || rec.model || rec.productName || '').trim();
    const series = String(rec.series || 'Other Models').trim();
    const variant = String(rec.variant || 'Standard').trim();
    if (!brand || !model) continue;

    const imageStr = String(rec.productImage || rec.image || '').trim() || undefined;
    const mopPriceRaw = String(rec.mopPrice || rec.price || '').trim();
    const effectivePrice = String(rec.effectivePrice || '').trim();
    const source = String(rec.source || 'Friends Cell Point Price List').trim();
    const lastUpdated = String(rec.lastUpdated || 'Oct 2026').trim();

    const splitPipeOrComma = (v: unknown): string[] => {
      if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
      if (typeof v === 'string' && v.trim()) {
        return v
          .split(/[|,]/)
          .map((x) => x.trim())
          .filter(Boolean);
      }
      return [];
    };

    const colorList = splitPipeOrComma(rec.colors || rec.colorOptions);
    const { ramOptions, storageOptions } = extractRamAndStorageFromVariant(variant);
    const numericPrice = parseNumericPrice(mopPriceRaw);
    const formattedMop =
      mopPriceRaw.startsWith('₹') || !numericPrice
        ? mopPriceRaw || 'Price on Enquiry'
        : `₹${numericPrice.toLocaleString('en-IN')}`;

    const idVal =
      String(rec.id || '').trim() ||
      `imported-${brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${model.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${variant.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    const newEntry: SmartphoneProduct = {
      id: idVal,
      productName: variant !== 'Standard' ? `${model} (${variant})` : model,
      brand,
      series,
      model,
      modelName: model,
      variant,
      colors: colorList,
      colorOptions: colorList,
      mopPrice: formattedMop,
      effectivePrice,
      source,
      lastUpdated,
      productType: 'smartphone',
      generation: 'Current Model',
      image: imageStr,
      productImage: imageStr,
      sourceUrl: OFFICIAL_BRAND_SOURCE_URLS[brand] || undefined,
      galleryImages: imageStr ? { front: imageStr } : {},
      visualVariant: 'titanium-pro',
      keySpecSummary: `${series} · Variant: ${variant}`,
      specifications: {
        display: 'Details available on enquiry',
        processor: 'Details available on enquiry',
        rearCamera: 'Details available on enquiry',
        frontCamera: 'Details available on enquiry',
        battery: 'Details available on enquiry',
        charging: 'Details available on enquiry',
        network: model.includes('5G') ? '5G' : 'Details available on enquiry',
        os: brand.toLowerCase() === 'lava' ? 'Feature OS' : 'Android',
      },
      display: 'Details available on enquiry',
      processor: 'Details available on enquiry',
      variants: [variant],
      ramOptions: ramOptions.length ? ramOptions : [variant],
      ramVariants: ramOptions.length ? ramOptions : [variant],
      storageOptions: storageOptions.length ? storageOptions : [variant],
      storageVariants: storageOptions.length ? storageOptions : [variant],
      rearCamera: 'Details available on enquiry',
      frontCamera: 'Details available on enquiry',
      battery: 'Details available on enquiry',
      charging: 'Details available on enquiry',
      os: brand.toLowerCase() === 'lava' ? 'Feature OS' : 'Android',
      network: model.includes('5G') ? '5G' : 'Details available on enquiry',
      screenSizeCategory: 'Details available on enquiry',
      cameraCategory: 'Details available on enquiry',
      batteryCategory: 'Details available on enquiry',
      launchInfo: `Last Updated: ${lastUpdated}`,
      verifiedRating: null,
      verifiedReviewCount: null,
      price: numericPrice,
      originalPrice: null,
      offerPrice: parseNumericPrice(effectivePrice) ?? numericPrice,
      availability:
        (rec.availability as InventoryStatus) || 'Check Availability',
      productStatus: 'Catalogue',
      categories: ['Mid-Range Smartphones'],
      createdAtOrder: updatedCatalogue.length + importedCount + 1,
      popularityOrder: importedCount + 1,
    };

    const existingIdx = updatedCatalogue.findIndex(
      (p) =>
        p.id === newEntry.id ||
        (p.brand.toLowerCase() === brand.toLowerCase() &&
          p.modelName.toLowerCase() === model.toLowerCase() &&
          p.variant.toLowerCase() === variant.toLowerCase())
    );
    if (existingIdx >= 0) {
      updatedCatalogue[existingIdx] = newEntry;
    } else {
      updatedCatalogue = [newEntry, ...updatedCatalogue];
    }
    importedCount++;
  }

  if (importedCount === 0) {
    return {
      ok: false,
      error: 'No valid smartphone records found (each row requires at least brand and model).',
    };
  }

  return { ok: true, catalogue: updatedCatalogue, importedCount };
}
