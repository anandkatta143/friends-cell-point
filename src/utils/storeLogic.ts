import {
  VERIFIED_BRAND_SERIES_MODELS_MAP,
  OFFICIAL_BRAND_SOURCE_URLS,
} from './verifiedModelsDataset';

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

export type AccessoryCategoryName =
  | 'Mobile Covers'
  | 'Tempered Glass'
  | 'TWS / Buds'
  | 'Wireless Earphones'
  | 'Wired Earphones'
  | 'Chargers'
  | 'Fast Chargers'
  | 'USB Cables'
  | 'Type-C Cables'
  | 'Lightning Cables'
  | 'Power Banks'
  | 'Bluetooth Speakers'
  | 'Smart Watches'
  | 'Mobile Holders'
  | 'Car Chargers'
  | 'Other Mobile Accessories';

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
  model: string;
  modelName: string;
  modelNumber?: string;
  series: string;
  generation?: 'Current Model' | 'Previous Model';
  // Original uploaded product image & multi-angle gallery (never AI-substituted)
  image?: string;
  productImage?: string;
  sourceUrl?: string;
  galleryImages?: ProductGalleryImages;
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
  colorOptions: string[];
  colors: string[];
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

export interface AccessoryCatalogueItem {
  id: string;
  brand: string;
  productName: string;
  category: AccessoryCategoryName;
  productImage?: string;
  galleryImages?: ProductGalleryImages;
  compatibleModels: string;
  compatibleFitGroup:
    | 'cases'
    | 'tempered'
    | 'chargers'
    | 'cables'
    | 'earphones'
    | 'tws'
    | 'other';
  price: number | null;
  availability: InventoryStatus;
  visualType:
    | 'cases'
    | 'tempered'
    | 'earphones'
    | 'tws'
    | 'chargers'
    | 'cables'
    | 'powerbanks'
    | 'audio-acc'
    | 'stands'
    | 'other';
  shortDescription: string;
}

export interface AdvancedMobileFilterState {
  searchQuery: string;
  brand: string;
  series: string;
  generationFilter?: 'All' | 'Current Model' | 'Previous Model';
  category: MobileCategorySlug;
  priceRange: 'All' | 'Budget' | 'Mid-Range' | 'Premium' | 'Flagship';
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
  product?: SmartphoneProduct;
  accessoryCategory?: AccessoryCategoryName;
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

export const ACCESSORY_CATEGORY_NAMES: AccessoryCategoryName[] = [
  'Mobile Covers',
  'Tempered Glass',
  'TWS / Buds',
  'Wireless Earphones',
  'Wired Earphones',
  'Chargers',
  'Fast Chargers',
  'USB Cables',
  'Type-C Cables',
  'Lightning Cables',
  'Power Banks',
  'Bluetooth Speakers',
  'Smart Watches',
  'Mobile Holders',
  'Car Chargers',
  'Other Mobile Accessories',
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
  'iPhone',
  'Samsung',
  'OnePlus',
  'vivo',
  'OPPO',
  'Redmi',
  'realme',
  '5G Phones',
  'TWS',
  'Tempered Glass',
  'Chargers',
];

export const HOMEPAGE_MOBILE_CATEGORIES: HomepageMobileCategoryCard[] = [
  {
    id: 'cat-all-mobiles',
    title: 'All Mobiles',
    subtitle: 'Complete multi-brand smartphone directory across all series.',
    targetCategory: 'All Smartphones',
    badge: 'Full Catalogue',
  },
  {
    id: 'cat-5g-mobiles',
    title: '5G Mobiles',
    subtitle: 'Next-generation 5G connectivity across budget to flagship tiers.',
    targetCategory: '5G Smartphones',
    badge: 'High-Speed 5G',
  },
  {
    id: 'cat-budget-mobiles',
    title: 'Budget Mobiles',
    subtitle: 'Dependable daily smartphones focused on battery and value.',
    targetCategory: 'Budget Smartphones',
    badge: 'Everyday Value',
  },
  {
    id: 'cat-midrange-mobiles',
    title: 'Mid-Range Mobiles',
    subtitle: 'Balanced AMOLED displays, fast charging and versatile cameras.',
    targetCategory: 'Mid-Range Smartphones',
    badge: 'Balanced Choice',
  },
  {
    id: 'cat-premium-mobiles',
    title: 'Premium Mobiles',
    subtitle: 'Refined design, flagship-grade materials and smooth performance.',
    targetCategory: 'Premium Smartphones',
    badge: 'Premium Series',
  },
  {
    id: 'cat-flagship-mobiles',
    title: 'Flagship Mobiles',
    subtitle: 'Top-tier processors, pro camera systems and ultra displays.',
    targetCategory: 'Flagship Smartphones',
    badge: 'Top Tier',
  },
  {
    id: 'cat-gaming-mobiles',
    title: 'Gaming Mobiles',
    subtitle: 'High-refresh displays, fast touch response and sustained cooling.',
    targetCategory: 'Gaming Smartphones',
    badge: 'Performance',
  },
  {
    id: 'cat-camera-mobiles',
    title: 'Camera Mobiles',
    subtitle: 'Portrait optics, night photography and stabilised video capture.',
    targetCategory: 'Camera Smartphones',
    badge: 'Pro Optics',
  },
];

export const HOMEPAGE_ACCESSORY_ENTRY_TILES: HomepageAccessoryEntryTile[] = [
  {
    id: 'acc-entry-covers',
    label: 'Covers & Cases',
    subtitle: 'Silicone, matte, clear & shockproof cases',
    targetCategory: 'Mobile Covers',
    visualType: 'cases',
  },
  {
    id: 'acc-entry-tempered',
    label: 'Tempered Glass',
    subtitle: '9H screen guards, privacy & matte glass',
    targetCategory: 'Tempered Glass',
    visualType: 'tempered',
  },
  {
    id: 'acc-entry-tws',
    label: 'TWS / Buds',
    subtitle: 'True wireless earbuds & charging cases',
    targetCategory: 'TWS / Buds',
    visualType: 'tws',
  },
  {
    id: 'acc-entry-earphones',
    label: 'Earphones',
    subtitle: 'Wireless neckbands & wired earphones',
    targetCategory: 'Wireless Earphones',
    visualType: 'earphones',
  },
  {
    id: 'acc-entry-chargers',
    label: 'Chargers',
    subtitle: 'Wall adapters & high-speed fast chargers',
    targetCategory: 'Fast Chargers',
    visualType: 'chargers',
  },
  {
    id: 'acc-entry-cables',
    label: 'Cables',
    subtitle: 'USB Type-C, Lightning & data cables',
    targetCategory: 'USB Cables',
    visualType: 'cables',
  },
  {
    id: 'acc-entry-powerbanks',
    label: 'Power Banks',
    subtitle: 'Multi-port portable fast power backup',
    targetCategory: 'Power Banks',
    visualType: 'powerbanks',
  },
  {
    id: 'acc-entry-smartwatches',
    label: 'Smart Watches',
    subtitle: 'Calling smartwatches & watch straps',
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
    subtitle: 'Desk stands, car & bike phone mounts',
    targetCategory: 'Mobile Holders',
    visualType: 'stands',
  },
  {
    id: 'acc-entry-other',
    label: 'Other Accessories',
    subtitle: 'OTG adapters, memory cards & essentials',
    targetCategory: 'Other Mobile Accessories',
    visualType: 'other',
  },
];

export const INITIAL_BRAND_DIRECTORY: BrandDirectoryEntry[] = [
  {
    id: 'brand-apple',
    name: 'Apple',
    monogram: 'AP',
    originNote: 'iPhone Series Smartphones',
    seriesList: ['iPhone Pro Series', 'iPhone Number Series', 'iPhone Plus Series', 'iPhone SE & Other Models'],
    featured: true,
  },
  {
    id: 'brand-samsung',
    name: 'Samsung',
    monogram: 'SM',
    originNote: 'Galaxy Smartphone Lineup',
    seriesList: ['Galaxy S Series', 'Galaxy A Series', 'Galaxy M Series', 'Galaxy F Series', 'Galaxy Z Series', 'Other Models'],
    featured: true,
  },
  {
    id: 'brand-oneplus',
    name: 'OnePlus',
    monogram: '1+',
    originNote: 'Flagship & Nord Series',
    seriesList: ['OnePlus Number Flagship Series', 'OnePlus R Series', 'OnePlus Nord Series', 'OnePlus Nord CE Series', 'OnePlus Open & Other Models'],
    featured: true,
  },
  {
    id: 'brand-oppo',
    name: 'OPPO',
    monogram: 'OP',
    originNote: 'Reno, Find, F & A Series',
    seriesList: ['Find Series', 'Reno Series', 'F Series', 'A Series', 'K Series', 'Other Models'],
    featured: true,
  },
  {
    id: 'brand-vivo',
    name: 'vivo',
    monogram: 'VV',
    originNote: 'X, V, T & Y Series',
    seriesList: ['X Series', 'V Series', 'T Series', 'Y Series', 'Other Models'],
    featured: true,
  },
  {
    id: 'brand-xiaomi',
    name: 'Xiaomi',
    monogram: 'MI',
    originNote: 'Flagship & Civi Series',
    seriesList: ['Xiaomi Number Series', 'Xiaomi Ultra Series', 'Xiaomi Civi Series', 'Other Models'],
    featured: true,
  },
  {
    id: 'brand-redmi',
    name: 'Redmi',
    monogram: 'RM',
    originNote: 'Note, Number & A Series',
    seriesList: ['Redmi Note Pro Series', 'Redmi Note Series', 'Redmi Number Series', 'Redmi A Series', 'Other Models'],
    featured: true,
  },
  {
    id: 'brand-realme',
    name: 'realme',
    monogram: 'RL',
    originNote: 'GT, Number, P, C & Narzo Series',
    seriesList: ['GT Series', 'Number Pro+ & Pro Series', 'P Series', 'Narzo Series', 'C Series', 'Other Models'],
    featured: true,
  },
  {
    id: 'brand-iqoo',
    name: 'iQOO',
    monogram: 'iQ',
    originNote: 'Flagship, Neo & Z Series',
    seriesList: ['iQOO Number Flagship Series', 'iQOO Neo Series', 'iQOO Z Series', 'Other Models'],
    featured: true,
  },
  {
    id: 'brand-nothing',
    name: 'Nothing',
    monogram: 'NT',
    originNote: 'Phone Series & Glyph OS',
    seriesList: ['Phone Flagship Series', 'Phone (a) Series', 'Other Models'],
    featured: true,
  },
  {
    id: 'brand-motorola',
    name: 'Motorola',
    monogram: 'MT',
    originNote: 'Razr, Edge, Moto G & E Series',
    seriesList: ['Razr Series', 'Edge Series', 'Moto G Series', 'Moto E Series', 'Other Models'],
    featured: true,
  },
  {
    id: 'brand-pixel',
    name: 'Google Pixel',
    monogram: 'PX',
    originNote: 'Pixel Pro, Number & A Series',
    seriesList: ['Pixel Pro Series', 'Pixel Number Series', 'Pixel a-Series', 'Pixel Fold & Other Models'],
    featured: true,
  },
  {
    id: 'brand-poco',
    name: 'POCO',
    monogram: 'PC',
    originNote: 'F, X, M & C Series',
    seriesList: ['POCO F Series', 'POCO X Series', 'POCO M Series', 'POCO C Series', 'Other Models'],
    featured: true,
  },
  {
    id: 'brand-infinix',
    name: 'Infinix',
    monogram: 'IX',
    originNote: 'GT, Zero, Note, Hot & Smart Series',
    seriesList: ['GT Series', 'Zero Series', 'Note Series', 'Hot Series', 'Smart Series', 'Other Models'],
    featured: true,
  },
  {
    id: 'brand-tecno',
    name: 'TECNO',
    monogram: 'TC',
    originNote: 'Phantom, Camon, Pova, Spark & Pop',
    seriesList: ['Phantom Series', 'Camon Series', 'Pova Series', 'Spark Series', 'Pop Series', 'Other Models'],
    featured: true,
  },
  {
    id: 'brand-nokia',
    name: 'Nokia',
    monogram: 'NK',
    originNote: '5G Smartphones & Classic Keypad',
    seriesList: ['G Series Smartphones', 'C Series Smartphones', 'Feature & Keypad Phones', 'Other Models'],
    featured: true,
  },
  {
    id: 'brand-honor',
    name: 'HONOR',
    monogram: 'HN',
    originNote: 'Magic, Number & X Series',
    seriesList: ['Magic Series', 'HONOR Number Series', 'HONOR X Series', 'Other Models'],
    featured: true,
  },
  {
    id: 'brand-lava',
    name: 'Lava',
    monogram: 'LV',
    originNote: 'Agni, Blaze, Storm & Yuva Series',
    seriesList: ['Agni Series', 'Blaze Series', 'Storm Series', 'Yuva Series', 'Keypad & Other Models'],
    featured: true,
  },
  {
    id: 'brand-itel',
    name: 'Itel',
    monogram: 'IT',
    originNote: 'S, P, A Series & Keypad Phones',
    seriesList: ['Color Pro & S Series', 'P Series', 'A Series', 'Keypad Phones', 'Other Models'],
    featured: true,
  },
  {
    id: 'brand-micromax',
    name: 'Micromax',
    monogram: 'MM',
    originNote: 'IN Series & Feature Handsets',
    seriesList: ['IN Note Series', 'IN B Series', 'Feature Phones', 'Other Models'],
    featured: false,
  },
  {
    id: 'brand-asus',
    name: 'ASUS',
    monogram: 'AS',
    originNote: 'Zenfone & Compact Flagships',
    seriesList: ['Zenfone Series', 'Other Models'],
    featured: false,
  },
  {
    id: 'brand-sony',
    name: 'Sony',
    monogram: 'SN',
    originNote: 'Xperia 1, 5 & 10 Series',
    seriesList: ['Xperia 1 Series', 'Xperia 5 Series', 'Xperia 10 Series', 'Other Models'],
    featured: false,
  },
  {
    id: 'brand-hmd',
    name: 'HMD',
    monogram: 'HM',
    originNote: 'Crest, Pulse & Feature Devices',
    seriesList: ['HMD Crest Series', 'HMD Pulse Series', 'Feature Phones', 'Other Models'],
    featured: false,
  },
  {
    id: 'brand-cmf',
    name: 'CMF',
    monogram: 'CM',
    originNote: 'CMF by Nothing Modular Series',
    seriesList: ['CMF Phone Series', 'Other Models'],
    featured: false,
  },
  {
    id: 'brand-zte',
    name: 'ZTE',
    monogram: 'ZT',
    originNote: 'Axon & Blade Series',
    seriesList: ['Axon Series', 'Blade Series', 'Other Models'],
    featured: false,
  },
  {
    id: 'brand-nubia',
    name: 'nubia',
    monogram: 'NB',
    originNote: 'Z Series, Flip & Neo Series',
    seriesList: ['nubia Z Series', 'nubia Flip Series', 'nubia Neo Series', 'Other Models'],
    featured: false,
  },
  {
    id: 'brand-lenovo',
    name: 'Lenovo',
    monogram: 'LN',
    originNote: 'Legion & K Series Devices',
    seriesList: ['Legion Series', 'K Series', 'Other Models'],
    featured: false,
  },
  {
    id: 'brand-rog',
    name: 'ROG',
    monogram: 'RG',
    originNote: 'Republic of Gamers Smartphones',
    seriesList: ['ROG Phone Pro Series', 'ROG Phone Number Series', 'Other Models'],
    featured: false,
  },
];

function createCatalogueSeedProducts(brands: BrandDirectoryEntry[]): SmartphoneProduct[] {
  const products: SmartphoneProduct[] = [];
  let orderCounter = 1;

  const variantCycle: SmartphoneProduct['visualVariant'][] = [
    'titanium-pro',
    'ultra-display',
    'portrait-studio',
    'sleek-5g',
    'note-series',
    'performance-ed',
    'all-rounder',
  ];

  for (let bIdx = 0; bIdx < brands.length; bIdx++) {
    const brand = brands[bIdx];
    const sourceUrl = OFFICIAL_BRAND_SOURCE_URLS[brand.name] || 'https://www.gsmarena.com/';

    for (let sIdx = 0; sIdx < brand.seriesList.length; sIdx++) {
      const seriesName = brand.seriesList[sIdx];
      const lookupKey = `${brand.name}::${seriesName}`;
      const verifiedModelsInSeries = VERIFIED_BRAND_SERIES_MODELS_MAP[lookupKey] || [];

      const isFlagship =
        seriesName.includes('Pro') ||
        seriesName.includes('S Series') ||
        seriesName.includes('Z Series') ||
        seriesName.includes('Find') ||
        seriesName.includes('X Series') ||
        seriesName.includes('Ultra') ||
        seriesName.includes('ROG') ||
        seriesName.includes('Flagship') ||
        seriesName.includes('Magic');

      const isGaming =
        brand.name === 'iQOO' ||
        brand.name === 'ROG' ||
        brand.name === 'POCO' ||
        seriesName.includes('GT') ||
        seriesName.includes('Gaming') ||
        seriesName.includes('Neo');

      const isCamera =
        brand.name === 'OPPO' ||
        brand.name === 'vivo' ||
        brand.name === 'Google Pixel' ||
        brand.name === 'Apple' ||
        brand.name === 'Samsung' ||
        seriesName.includes('Reno') ||
        seriesName.includes('Camon');

      const isBudget =
        seriesName.includes('A Series') ||
        seriesName.includes('C Series') ||
        seriesName.includes('M Series') ||
        seriesName.includes('F Series') ||
        seriesName.includes('Spark') ||
        seriesName.includes('Hot') ||
        seriesName.includes('Smart') ||
        seriesName.includes('Yuva') ||
        seriesName.includes('Keypad') ||
        seriesName.includes('Feature');

      const baseCategories: Exclude<MobileCategorySlug, 'All Smartphones'>[] = ['5G Smartphones'];
      if (isFlagship) {
        baseCategories.push('Flagship Smartphones', 'Premium Smartphones');
      } else if (isBudget) {
        baseCategories.push('Budget Smartphones');
      } else {
        baseCategories.push('Mid-Range Smartphones');
      }
      if (isGaming) baseCategories.push('Gaming Smartphones');
      if (isCamera) baseCategories.push('Camera Smartphones');

      const osVal = brand.name === 'Apple' ? 'iOS' : 'Android';

      // If a newly added custom brand/series has no verified seed models yet, create a placeholder series entry without an unverified image
      const modelsToBuild =
        verifiedModelsInSeries.length > 0
          ? verifiedModelsInSeries
          : [
              {
                model: `${brand.name} ${seriesName}`,
                modelNumber: undefined,
                generation: 'Current Model' as const,
                image: undefined,
                ram: ['8GB', '12GB'],
                storage: ['128GB', '256GB'],
                colors: ['Details available on enquiry'],
                network: '5G / 4G' as const,
                keySpec: `${seriesName} · Official Series`,
              },
            ];

      for (let mIdx = 0; mIdx < modelsToBuild.length; mIdx++) {
        const seed = modelsToBuild[mIdx];
        const visualVariant = variantCycle[(bIdx + sIdx + mIdx) % variantCycle.length];
        const networkVal: SmartphoneProduct['network'] =
          seed.network ||
          (seriesName.includes('Keypad') || seriesName.includes('Feature') ? '4G' : '5G / 4G');
        const ramList = seed.ram?.length ? seed.ram : ['Details available on enquiry'];
        const storageList = seed.storage?.length ? seed.storage : ['Details available on enquiry'];
        const colorList = seed.colors?.length ? seed.colors : ['Details available on enquiry'];
        const exactRefImage = seed.image?.trim() || undefined;
        const combinedVariants = ramList.flatMap((r) =>
          storageList
            .filter((s) => !s.includes('Details'))
            .map((s) => (r.includes('Details') ? s : `${r} / ${s}`))
        );

        const productStatus: SmartphoneProduct['productStatus'] =
          mIdx === 0 && sIdx === 0 && brand.featured
            ? 'Featured'
            : mIdx === 0 && seed.generation === 'Current Model' && brand.featured
              ? 'Latest'
              : 'Catalogue';

        products.push({
          id: `${brand.id}-s${sIdx}-m${mIdx}`,
          productName: seed.model,
          brand: brand.name,
          model: seed.model,
          modelName: seed.model,
          modelNumber: seed.modelNumber,
          series: seriesName,
          generation: seed.generation,
          image: exactRefImage,
          productImage: exactRefImage,
          sourceUrl,
          galleryImages: exactRefImage ? { front: exactRefImage } : {},
          visualVariant,
          keySpecSummary:
            seed.keySpec ||
            `${seriesName} · ${ramList.filter((r) => !r.includes('Details')).join('/')} · ${storageList.filter((s) => !s.includes('Details')).join('/')} · ${networkVal}`,
          specifications: {
            display: seed.keySpec || 'Details available on enquiry',
            processor: seed.keySpec || 'Details available on enquiry',
            rearCamera: 'Details available on enquiry',
            frontCamera: 'Details available on enquiry',
            battery: 'Details available on enquiry',
            charging: 'Details available on enquiry',
            network: networkVal,
            os: osVal,
          },
          display: seed.keySpec || 'Details available on enquiry',
          processor: seed.keySpec || 'Details available on enquiry',
          variants: combinedVariants.length ? combinedVariants : storageList,
          ramOptions: ramList,
          ramVariants: ramList,
          storageOptions: storageList,
          storageVariants: storageList,
          rearCamera: 'Details available on enquiry',
          frontCamera: 'Details available on enquiry',
          battery: 'Details available on enquiry',
          charging: 'Details available on enquiry',
          os: osVal,
          network: networkVal,
          screenSizeCategory:
            seriesName.includes('Fold') ||
            seriesName.includes('Z Series') ||
            seriesName.includes('Razr') ||
            seed.model.includes('Fold') ||
            seed.model.includes('Flip')
              ? 'Foldable'
              : isFlagship
                ? 'Large 6.7"+'
                : 'Standard 6.5"+',
          cameraCategory: isCamera || isFlagship ? 'Pro Camera System' : 'Multi-Camera Setup',
          batteryCategory: isGaming || isBudget ? 'High-Capacity Battery' : 'All-Day Battery',
          colorOptions: colorList,
          colors: colorList,
          launchInfo: seed.generation === 'Current Model' ? 'Current Lineup' : 'Previous Generation',
          verifiedRating: null,
          verifiedReviewCount: null,
          price: null,
          originalPrice: null,
          offerPrice: null,
          availability: 'Check Availability',
          productStatus,
          categories: baseCategories,
          createdAtOrder: 1000 - orderCounter,
          popularityOrder: bIdx * 100 + sIdx * 15 + mIdx,
        });

        orderCounter++;
      }
    }
  }

  return products;
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

export const INITIAL_ACCESSORIES_CATALOGUE: AccessoryCatalogueItem[] = [
  {
    id: 'acc-cat-covers',
    brand: 'Multi-Brand Compatible',
    productName: 'Protective Silicone & MagSafe Mobile Covers',
    category: 'Mobile Covers',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/1.webp',
    },
    compatibleModels: 'All Major Smartphone Brands & Models (Ask for Your Model)',
    compatibleFitGroup: 'cases',
    price: null,
    availability: 'Check Availability',
    visualType: 'cases',
    shortDescription: 'Clear cases, matte silicone, shockproof bumpers and designer covers.',
  },
  {
    id: 'acc-cat-tempered',
    brand: 'Multi-Brand Compatible',
    productName: '9H Tempered Glass & Screen Guards',
    category: 'Tempered Glass',
    productImage:
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=85',
    galleryImages: {
      front:
        'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=85',
    },
    compatibleModels: 'All Major Smartphone Brands & Models (Ask for Your Model)',
    compatibleFitGroup: 'tempered',
    price: null,
    availability: 'Check Availability',
    visualType: 'tempered',
    shortDescription: 'Edge-to-edge D+ glass, privacy guards, matte gaming glass and UV glass.',
  },
  {
    id: 'acc-cat-tws',
    brand: 'Audio & TWS Showcase',
    productName: 'True Wireless Earbuds (TWS / Buds)',
    category: 'TWS / Buds',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/1.webp',
    },
    compatibleModels: 'Universal Bluetooth Compatibility (Android & iOS)',
    compatibleFitGroup: 'tws',
    price: null,
    availability: 'Check Availability',
    visualType: 'tws',
    shortDescription: 'Compact wireless earbuds with pocket charging cases for music and calls.',
  },
  {
    id: 'acc-cat-wireless-earphones',
    brand: 'Wireless Audio Showcase',
    productName: 'Bluetooth Neckband Wireless Earphones',
    category: 'Wireless Earphones',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/beats-flex-wireless-earphones/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/beats-flex-wireless-earphones/1.webp',
    },
    compatibleModels: 'Universal Bluetooth Compatibility (Android & iOS)',
    compatibleFitGroup: 'earphones',
    price: null,
    availability: 'Check Availability',
    visualType: 'earphones',
    shortDescription: 'Magnetic wireless neckbands with long battery backup and inline mic.',
  },
  {
    id: 'acc-cat-wired-earphones',
    brand: 'Wired Audio Showcase',
    productName: 'Type-C & 3.5mm Wired In-Ear Earphones',
    category: 'Wired Earphones',
    productImage:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=85',
    galleryImages: {
      front:
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=85',
    },
    compatibleModels: 'USB Type-C & 3.5mm Jack Smartphones',
    compatibleFitGroup: 'earphones',
    price: null,
    availability: 'Check Availability',
    visualType: 'earphones',
    shortDescription: 'Zero-latency wired in-ear earphones with clear microphone controls.',
  },
  {
    id: 'acc-cat-chargers',
    brand: 'Power & Charging',
    productName: 'Standard Wall Chargers & Power Adapters',
    category: 'Chargers',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/1.webp',
    },
    compatibleModels: 'All Smartphones & Keypad Phones',
    compatibleFitGroup: 'chargers',
    price: null,
    availability: 'Check Availability',
    visualType: 'chargers',
    shortDescription: 'Reliable everyday USB wall adapters for home and travel charging.',
  },
  {
    id: 'acc-cat-fast-chargers',
    brand: 'Fast Power Delivery',
    productName: 'High-Speed USB-C PD & Wireless Fast Chargers',
    category: 'Fast Chargers',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpower-wireless-charger/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpower-wireless-charger/1.webp',
    },
    compatibleModels: 'Fast-Charge Supported Android & iPhone Models',
    compatibleFitGroup: 'chargers',
    price: null,
    availability: 'Check Availability',
    visualType: 'chargers',
    shortDescription: 'High-speed USB-C PD, SuperVOOC and wireless fast charging pads.',
  },
  {
    id: 'acc-cat-usb-cables',
    brand: 'Charging & Data Sync',
    productName: 'High-Speed USB Data & Charging Cables',
    category: 'USB Cables',
    productImage:
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=85',
    galleryImages: {
      front:
        'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=85',
    },
    compatibleModels: 'All USB-A & Micro-USB Smartphones & Accessories',
    compatibleFitGroup: 'cables',
    price: null,
    availability: 'Check Availability',
    visualType: 'cables',
    shortDescription: 'Durable braided and standard USB charging and data sync cables.',
  },
  {
    id: 'acc-cat-typec-cables',
    brand: 'Fast Type-C Sync',
    productName: 'USB Type-C to Type-C & USB-A to Type-C Cables',
    category: 'Type-C Cables',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/2.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/2.webp',
    },
    compatibleModels: 'All USB Type-C Android & iPhone 15/16/17 Series Models',
    compatibleFitGroup: 'cables',
    price: null,
    availability: 'Check Availability',
    visualType: 'cables',
    shortDescription: '60W/100W PD and SuperVOOC compatible USB Type-C fast charging cables.',
  },
  {
    id: 'acc-cat-lightning-cables',
    brand: 'iOS Charging & Sync',
    productName: 'USB-C to Lightning & USB-A to Lightning Cables',
    category: 'Lightning Cables',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/1.webp',
    },
    compatibleModels: 'Compatible iPhone & iPad Models',
    compatibleFitGroup: 'cables',
    price: null,
    availability: 'Check Availability',
    visualType: 'cables',
    shortDescription: 'Fast-charging and sync cables for Lightning-port iPhone models.',
  },
  {
    id: 'acc-cat-powerbanks',
    brand: 'Portable Backup Power',
    productName: 'MagSafe & Multi-Port Fast-Charge Power Banks',
    category: 'Power Banks',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/1.webp',
    },
    compatibleModels: 'Universal Smartphone & Earbud Charging',
    compatibleFitGroup: 'other',
    price: null,
    availability: 'Check Availability',
    visualType: 'powerbanks',
    shortDescription: 'Compact portable battery packs with Type-C, USB-A and magnetic outputs.',
  },
  {
    id: 'acc-cat-bt-speakers',
    brand: 'Portable Audio',
    productName: 'Portable Wireless Bluetooth Speakers',
    category: 'Bluetooth Speakers',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-homepod-mini-cosmic-grey/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-homepod-mini-cosmic-grey/1.webp',
    },
    compatibleModels: 'Universal Bluetooth, AUX & TF Card Playback',
    compatibleFitGroup: 'other',
    price: null,
    availability: 'Check Availability',
    visualType: 'audio-acc',
    shortDescription: 'Compact wireless speakers for indoor and outdoor music playback.',
  },
  {
    id: 'acc-cat-smartwatches',
    brand: 'Wearables & Straps',
    productName: 'Smart Watches & Watch Straps',
    category: 'Smart Watches',
    productImage: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-watch7.jpg',
    galleryImages: {
      front: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-watch7.jpg',
    },
    compatibleModels: 'Android & iOS Companion App Support',
    compatibleFitGroup: 'other',
    price: null,
    availability: 'Check Availability',
    visualType: 'other',
    shortDescription: 'Bluetooth calling smartwatches, fitness trackers and replacement straps.',
  },
  {
    id: 'acc-cat-holders',
    brand: 'Stands & Mounts',
    productName: 'Desk Stands, Monopods, Bike & Car Mobile Holders',
    category: 'Mobile Holders',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/selfie-stick-monopod/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/selfie-stick-monopod/1.webp',
    },
    compatibleModels: 'Universal Fit for All Screen Sizes',
    compatibleFitGroup: 'other',
    price: null,
    availability: 'Check Availability',
    visualType: 'stands',
    shortDescription: 'Adjustable tabletop stands, monopods and secure mounts for navigation.',
  },
  {
    id: 'acc-cat-car-chargers',
    brand: 'In-Vehicle Power',
    productName: 'Dual-Port Fast Car Chargers & Power Adapters',
    category: 'Car Chargers',
    productImage:
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=85',
    galleryImages: {
      front:
        'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=85',
    },
    compatibleModels: 'Universal 12V/24V Vehicle Socket & All Phones',
    compatibleFitGroup: 'chargers',
    price: null,
    availability: 'Check Availability',
    visualType: 'chargers',
    shortDescription: 'Compact car power adapters with USB-C PD and USB-A fast output.',
  },
  {
    id: 'acc-cat-other',
    brand: 'Mobile Essentials',
    productName: 'Wireless Headphones, OTG Adapters, Memory Cards & SIM Tools',
    category: 'Other Mobile Accessories',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp',
    },
    compatibleModels: 'Universal Smartphone & Audio/Storage Accessories',
    compatibleFitGroup: 'other',
    price: null,
    availability: 'Check Availability',
    visualType: 'other',
    shortDescription: 'Over-ear wireless headphones, MicroSD cards, Type-C OTG connectors and daily essentials.',
  },
];

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
    { keywords: ['tws', 'buds', 'earbud', 'airpods'], category: 'TWS / Buds' },
    { keywords: ['tempered', 'screen guard', 'glass'], category: 'Tempered Glass' },
    { keywords: ['charger', 'chargers', 'adapter', 'supervooc'], category: 'Fast Chargers' },
    { keywords: ['cover', 'covers', 'case', 'cases', 'back cover'], category: 'Mobile Covers' },
    { keywords: ['type-c', 'type c'], category: 'Type-C Cables' },
    { keywords: ['cable', 'cables', 'usb'], category: 'USB Cables' },
    { keywords: ['lightning'], category: 'Lightning Cables' },
    { keywords: ['earphone', 'earphones', 'neckband', 'wireless earphone'], category: 'Wireless Earphones' },
    { keywords: ['power bank', 'powerbank', 'power banks'], category: 'Power Banks' },
    { keywords: ['watch', 'smart watch', 'smartwatches'], category: 'Smart Watches' },
    { keywords: ['speaker', 'speakers'], category: 'Bluetooth Speakers' },
    { keywords: ['holder', 'holders', 'stand', 'mount'], category: 'Mobile Holders' },
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
      const targetCat = `${filters.priceRange} Smartphones` as Exclude<
        MobileCategorySlug,
        'All Smartphones'
      >;
      if (!item.categories.includes(targetCat)) {
        return false;
      }
    }
    if (filters.network5G === '5G' && !item.network.includes('5G')) {
      return false;
    }
    if (filters.network5G === '4G' && !item.network.includes('4G')) {
      return false;
    }
    if (filters.os !== 'All') {
      if (!item.os.toLowerCase().includes(filters.os.toLowerCase())) {
        return false;
      }
    }
    if (filters.ram !== 'All') {
      const ramJoined = item.ramOptions.join(' ').toLowerCase();
      if (!ramJoined.includes(filters.ram.toLowerCase())) {
        return false;
      }
    }
    if (filters.storage !== 'All') {
      const storageJoined = item.storageOptions.join(' ').toLowerCase();
      if (!storageJoined.includes(filters.storage.toLowerCase())) {
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
      item.modelNumber || '',
      item.series,
      item.generation || '',
      item.display,
      item.processor,
      item.ramOptions.join(' '),
      item.storageOptions.join(' '),
      item.network,
      item.os,
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
        const pa = a.offerPrice ?? a.price ?? Number.MAX_SAFE_INTEGER;
        const pb = b.offerPrice ?? b.price ?? Number.MAX_SAFE_INTEGER;
        return pa - pb || a.popularityOrder - b.popularityOrder;
      }
      case 'price-desc': {
        const pa = a.offerPrice ?? a.price ?? -1;
        const pb = b.offerPrice ?? b.price ?? -1;
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
      { id: 'sug-iphone', type: 'model', label: 'iPhone', sublabel: 'Apple iPhone Flagships & Series', queryValue: 'iPhone', brandName: 'Apple' },
      { id: 'sug-galaxy-s', type: 'series', label: 'Galaxy S', sublabel: 'Samsung Flagship Series', queryValue: 'Galaxy S', brandName: 'Samsung' },
      { id: 'sug-oneplus', type: 'brand', label: 'OnePlus', sublabel: 'Flagship & Nord Smartphones', queryValue: 'OnePlus', brandName: 'OnePlus' },
      { id: 'sug-redmi', type: 'brand', label: 'Redmi', sublabel: 'Redmi Note & 5G Series', queryValue: 'Redmi', brandName: 'Redmi' },
      { id: 'sug-tws', type: 'accessory', label: 'TWS / Buds', sublabel: 'Accessory · True Wireless Earbuds', queryValue: 'TWS', accessoryCategory: 'TWS / Buds' },
      { id: 'sug-tempered', type: 'accessory', label: 'Tempered Glass', sublabel: 'Accessory · 9H Screen Protection', queryValue: 'Tempered Glass', accessoryCategory: 'Tempered Glass' },
      { id: 'sug-charger', type: 'accessory', label: 'Fast Chargers', sublabel: 'Accessory · USB-C PD & Wall Adapters', queryValue: 'Chargers', accessoryCategory: 'Fast Chargers' },
    ];
  }

  const results: SearchSuggestionItem[] = [];

  for (const b of brands) {
    if (
      b.name.toLowerCase().includes(q) ||
      b.originNote.toLowerCase().includes(q) ||
      (q.includes('iphone') && b.name === 'Apple')
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

  const specQuickTokens = ['256GB', '128GB', '512GB', '12GB', '8GB', '16GB', '5G'];
  for (const specToken of specQuickTokens) {
    if (specToken.toLowerCase().includes(q)) {
      results.push({
        id: `spec-${specToken}`,
        type: 'spec',
        label: `${specToken} Smartphones`,
        sublabel: `Filter by ${specToken} specification`,
        queryValue: specToken,
      });
    }
  }

  const normalizedQ = q.replace(/\bphones\b|\bmobiles\b/g, '').trim() || q;
  for (const prod of catalogue) {
    if (results.length >= limit) break;
    const blob = `${prod.brand} ${prod.modelName} ${prod.modelNumber || ''} ${prod.series} ${prod.ramOptions.join(' ')} ${prod.storageOptions.join(' ')} ${prod.network}`.toLowerCase();
    const tokens = normalizedQ.split(/\s+/).filter(Boolean);
    if (tokens.every((t) => blob.includes(t))) {
      results.push({
        id: `model-${prod.id}`,
        type: 'model',
        label: prod.modelName,
        sublabel: `${prod.brand} · ${prod.series}${prod.modelNumber ? ` · ${prod.modelNumber}` : ''} · ${prod.network}`,
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
    if (!isApple && a.category === 'Lightning Cables') return false;
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
    : [`${cleanName} Flagship Series`, `${cleanName} 5G Series`, 'Other Models'];

  const seriesList = parsedSeries.length > 0 ? parsedSeries : ['All Models'];
  const monogram = cleanName.slice(0, 2).toUpperCase();
  const newBrand: BrandDirectoryEntry = {
    id: `brand-${cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
    name: cleanName,
    monogram,
    originNote: input.originNote?.trim() || `${cleanName} Smartphones`,
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

  if (!brand) return { ok: false, error: 'Brand is required.' };
  if (!modelName) return { ok: false, error: 'Model Name is required.' };

  const ramOptions = input.ramCsv
    ? input.ramCsv
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : ['Details available on enquiry'];
  const storageOptions = input.storageCsv
    ? input.storageCsv
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : ['Details available on enquiry'];
  const colorOptions = input.colorsCsv
    ? input.colorsCsv
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : ['Details available on enquiry'];

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

    const updatedItem: SmartphoneProduct = {
      ...existing,
      productName: modelName,
      brand,
      model: modelName,
      modelName,
      series,
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
      colorOptions: colorOptions.length ? colorOptions : existing.colorOptions,
      colors: colorOptions.length ? colorOptions : existing.colorOptions,
      price: input.price !== undefined ? input.price : existing.price,
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
  const osVal = input.os?.trim() || (brand.toLowerCase() === 'apple' ? 'iOS' : 'Android');
  const netVal = input.network || '5G / 4G';
  const galleryVal: ProductGalleryImages = input.galleryImages || {};
  const primaryImage = cleanProductImage || galleryVal.front?.trim() || undefined;

  const newItem: SmartphoneProduct = {
    id: `model-${brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
    productName: modelName,
    brand,
    model: modelName,
    modelName,
    series,
    productImage: primaryImage,
    galleryImages: galleryVal,
    visualVariant: 'titanium-pro',
    keySpecSummary: `${series} · ${netVal}`,
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
    screenSizeCategory: 'Standard 6.5"+',
    cameraCategory: 'Multi-Camera Setup',
    batteryCategory: 'All-Day Battery',
    colorOptions,
    colors: colorOptions,
    launchInfo: 'Details available on enquiry',
    verifiedRating: null,
    verifiedReviewCount: null,
    price: input.price ?? null,
    originalPrice: input.originalPrice ?? null,
    offerPrice: input.offerPrice ?? null,
    availability: input.availability || 'Check Availability',
    productStatus: input.productStatus || 'Latest',
    categories: ['5G Smartphones', 'Mid-Range Smartphones'],
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
      input.productImage !== undefined
        ? input.productImage.trim() || undefined
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
    'modelNumber',
    'generation',
    'image',
    'sourceUrl',
    'ram',
    'storage',
    'colors',
    'network',
    'price',
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
      p.modelNumber || '',
      p.generation || 'Current Model',
      p.productImage || p.image || '',
      p.sourceUrl || '',
      p.ramOptions.join(' | '),
      p.storageOptions.join(' | '),
      p.colorOptions.join(' | '),
      p.network,
      p.price ?? '',
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
    if (!brand || !model) continue;

    const imageStr = String(rec.productImage || rec.image || '').trim() || undefined;
    const modelNumber = String(rec.modelNumber || '').trim() || undefined;
    const generationRaw = String(rec.generation || 'Current Model').trim();
    const generation: 'Current Model' | 'Previous Model' =
      generationRaw === 'Previous Model' ? 'Previous Model' : 'Current Model';
    const sourceUrl =
      String(rec.sourceUrl || '').trim() ||
      OFFICIAL_BRAND_SOURCE_URLS[brand] ||
      'https://www.gsmarena.com/';

    const splitPipeOrComma = (v: unknown): string[] => {
      if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
      if (typeof v === 'string' && v.trim()) {
        return v
          .split(/[|,]/)
          .map((x) => x.trim())
          .filter(Boolean);
      }
      return ['Details available on enquiry'];
    };

    const ramList = splitPipeOrComma(rec.ramOptions || rec.ram || rec.ramVariants);
    const storageList = splitPipeOrComma(rec.storageOptions || rec.storage || rec.storageVariants);
    const colorList = splitPipeOrComma(rec.colorOptions || rec.colors);
    const priceNum =
      rec.price !== undefined && rec.price !== null && String(rec.price).trim() !== ''
        ? Number(rec.price)
        : null;

    const idVal =
      String(rec.id || '').trim() ||
      `imported-${brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${model.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    const newEntry: SmartphoneProduct = {
      id: idVal,
      productName: model,
      brand,
      model,
      modelName: model,
      modelNumber,
      series,
      generation,
      image: imageStr,
      productImage: imageStr,
      sourceUrl,
      galleryImages: imageStr ? { front: imageStr } : {},
      visualVariant: 'titanium-pro',
      keySpecSummary: `${series} · ${ramList.filter((r) => !r.includes('Details')).join('/')} · ${storageList.filter((s) => !s.includes('Details')).join('/')}`,
      specifications: {
        display: String((rec.specifications as Record<string, string>)?.display || rec.display || 'Details available on enquiry'),
        processor: String((rec.specifications as Record<string, string>)?.processor || rec.processor || 'Details available on enquiry'),
        rearCamera: String((rec.specifications as Record<string, string>)?.rearCamera || rec.rearCamera || 'Details available on enquiry'),
        frontCamera: String((rec.specifications as Record<string, string>)?.frontCamera || rec.frontCamera || 'Details available on enquiry'),
        battery: String((rec.specifications as Record<string, string>)?.battery || rec.battery || 'Details available on enquiry'),
        charging: String((rec.specifications as Record<string, string>)?.charging || rec.charging || 'Details available on enquiry'),
        network: '5G / 4G',
        os: brand.toLowerCase() === 'apple' ? 'iOS' : 'Android',
      },
      display: String(rec.display || 'Details available on enquiry'),
      processor: String(rec.processor || 'Details available on enquiry'),
      variants: storageList,
      ramOptions: ramList,
      ramVariants: ramList,
      storageOptions: storageList,
      storageVariants: storageList,
      rearCamera: String(rec.rearCamera || 'Details available on enquiry'),
      frontCamera: String(rec.frontCamera || 'Details available on enquiry'),
      battery: String(rec.battery || 'Details available on enquiry'),
      charging: String(rec.charging || 'Details available on enquiry'),
      os: brand.toLowerCase() === 'apple' ? 'iOS' : 'Android',
      network: '5G / 4G',
      screenSizeCategory: 'Standard 6.5"+',
      cameraCategory: 'Multi-Camera Setup',
      batteryCategory: 'All-Day Battery',
      colorOptions: colorList,
      colors: colorList,
      launchInfo: generation === 'Current Model' ? 'Current Lineup' : 'Previous Generation',
      verifiedRating: null,
      verifiedReviewCount: null,
      price: Number.isFinite(priceNum) ? priceNum : null,
      originalPrice: null,
      offerPrice: null,
      availability:
        (rec.availability as InventoryStatus) || 'Check Availability',
      productStatus: 'Catalogue',
      categories: ['5G Smartphones', 'Mid-Range Smartphones'],
      createdAtOrder: updatedCatalogue.length + importedCount + 1,
      popularityOrder: importedCount + 1,
    };

    const existingIdx = updatedCatalogue.findIndex(
      (p) =>
        p.id === newEntry.id ||
        (p.brand.toLowerCase() === brand.toLowerCase() &&
          p.modelName.toLowerCase() === model.toLowerCase())
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
