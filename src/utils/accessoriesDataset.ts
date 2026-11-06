/**
 * Centralized Structured Mobile Accessories Dataset for Friends Cell Point
 *
 * IMPORTANT RULES:
 * 1. Show an actual ₹ price ONLY when a verified price has been provided in the uploaded price lists/data
 *    (e.g., vivo 15W Charger at ₹899, vivo Buds XE at ₹1,999, Pixel Watch 5 at ₹42,900 & ₹45,900, Fitbit AIR at ₹13,999).
 * 2. Do NOT invent, estimate, or generate fake accessory prices.
 * 3. If an accessory does not have a verified price, show: "Price on Enquiry" with a "Check Availability" button.
 * 4. Prices must be displayed in Indian Rupees with proper formatting, e.g. ₹899, ₹1,999.
 * 5. Keep price data separate from the UI so store admins can easily update prices later.
 */

export const ACCESSORY_CATEGORIES = [
  'Chargers',
  'Cables',
  'Power Banks',
  'Smart Watches',
  'Bluetooth Speakers',
  'Mobile Holders',
  'TWS / Earbuds',
  'Earphones',
  'Tempered Glass',
  'Mobile Covers',
  'Smart Watch Straps',
  'Other Mobile Accessories',
] as const;

export type AccessoryCategoryName = (typeof ACCESSORY_CATEGORIES)[number];

export interface AccessoryCatalogueItem {
  id: string;
  brand: string;
  productName: string;
  category: AccessoryCategoryName;
  variant: string;
  specification?: string;
  productImage: string;
  galleryImages?: {
    front?: string;
    back?: string;
    side?: string;
  };
  compatibleModels: string;
  compatibleFitGroup:
    | 'cases'
    | 'tempered'
    | 'chargers'
    | 'cables'
    | 'earphones'
    | 'tws'
    | 'other';
  price: number | null; // null indicates "Price on Enquiry"
  mopPrice?: string;
  verifiedPrice: boolean;
  availability: 'Available' | 'Check Availability' | 'Enquire' | 'Out of Stock' | 'Coming Soon';
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

/**
 * Format accessory price cleanly in Indian Rupees or "Price on Enquiry"
 */
export function formatAccessoryPriceDisplay(
  price: number | null | undefined,
  mopPrice?: string
): string {
  if (price !== null && price !== undefined && Number.isFinite(price) && price > 0) {
    return `₹${price.toLocaleString('en-IN')}`;
  }
  if (mopPrice && mopPrice.trim()) {
    const clean = mopPrice.replace(/\s+/g, ' ').trim();
    if (clean.startsWith('₹')) return clean;
    return `₹${clean}`;
  }
  return 'Price on Enquiry';
}

/**
 * Build exact WhatsApp Enquiry message format requested:
 *
 * Hello Friends Cell Point,
 * I am interested in:
 * [Brand]
 * [Product Name]
 * [Variant]
 * Price: [Price]
 *
 * Please confirm availability.
 */
export function buildAccessoryWhatsAppMessage(item: {
  brand: string;
  productName: string;
  variant?: string;
  priceDisplay?: string;
  price?: number | null;
  mopPrice?: string;
}): string {
  const brand = (item.brand || 'Friends Cell Point').trim();
  const productName = (item.productName || 'Accessory').trim();
  const variant = (item.variant || 'Standard').trim();
  const price =
    item.priceDisplay && item.priceDisplay !== 'Price on Enquiry'
      ? item.priceDisplay.trim()
      : formatAccessoryPriceDisplay(item.price, item.mopPrice);

  return `Hello Friends Cell Point,\nI am interested in:\n${brand}\n${productName}\n${variant}\nPrice: ${price}\n\nPlease confirm availability.`;
}

/**
 * Search and filter accessories by brand, product name, and category
 */
export function searchAndFilterAccessories(
  items: AccessoryCatalogueItem[],
  query: string,
  selectedCategory: AccessoryCategoryName | 'All'
): AccessoryCatalogueItem[] {
  const q = query.trim().toLowerCase();

  return items.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }
    if (!q) return true;

    const brandMatch = item.brand.toLowerCase().includes(q);
    const nameMatch = item.productName.toLowerCase().includes(q);
    const catMatch = item.category.toLowerCase().includes(q);
    const variantMatch = item.variant.toLowerCase().includes(q);
    const descMatch = item.shortDescription.toLowerCase().includes(q);

    return brandMatch || nameMatch || catMatch || variantMatch || descMatch;
  });
}

/**
 * Centralized Accessories Catalogue Dataset.
 * Store admins can easily update or add prices here.
 */
export const INITIAL_ACCESSORIES_CATALOGUE: AccessoryCatalogueItem[] = [
  // ============================================================================
  // 1. CHARGERS
  // ============================================================================
  {
    id: 'acc-vivo-charger-15w',
    brand: 'vivo',
    productName: 'V1530H0A0 15W Fast Charger',
    category: 'Chargers',
    variant: '15W Standard Adapter',
    specification: '15W FlashCharge · USB-A Output · Over-Voltage Protection',
    productImage: '/assets/products/vivo-charger-15w.jpg',
    galleryImages: {
      front: '/assets/products/vivo-charger-15w.jpg',
    },
    compatibleModels: 'vivo Y, V, T Series & Universal USB Smartphones',
    compatibleFitGroup: 'chargers',
    price: 899,
    mopPrice: '₹ 899',
    verifiedPrice: true,
    availability: 'Available',
    visualType: 'chargers',
    shortDescription:
      'Official vivo 15W FlashCharge wall adapter with built-in multi-protection for everyday fast charging.',
  },
  {
    id: 'acc-cat-chargers-wall',
    brand: 'Multi-Brand Compatible',
    productName: 'Standard USB Wall Adapters & Power Plugs',
    category: 'Chargers',
    variant: '10W / 18W USB-A Adapter',
    specification: 'Single / Dual USB Output · Compact Travel Design',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/1.webp',
    },
    compatibleModels: 'All Smartphones, Keypad Phones & Wireless Accessories',
    compatibleFitGroup: 'chargers',
    price: null,
    verifiedPrice: false,
    availability: 'Check Availability',
    visualType: 'chargers',
    shortDescription:
      'Reliable everyday USB wall adapters with surge suppression for home and travel charging.',
  },
  {
    id: 'acc-cat-fast-chargers',
    brand: 'Multi-Brand Compatible',
    productName: 'High-Speed USB-C PD & Fast Wall Chargers',
    category: 'Chargers',
    variant: '33W / 65W GaN Fast Charger',
    specification: 'Type-C Power Delivery 3.0 + QC 4.0 Fast Charge',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpower-wireless-charger/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpower-wireless-charger/1.webp',
    },
    compatibleModels: 'Fast-Charge Supported Android, Nothing, Pixel & iPhone Models',
    compatibleFitGroup: 'chargers',
    price: null,
    verifiedPrice: false,
    availability: 'Check Availability',
    visualType: 'chargers',
    shortDescription:
      'High-speed USB-C PD and multi-protocol fast chargers supporting rapid battery replenishment.',
  },
  {
    id: 'acc-cat-car-chargers',
    brand: 'Multi-Brand Compatible',
    productName: 'Dual-Port Fast Car Chargers & Adapters',
    category: 'Chargers',
    variant: 'Dual Port USB-C + USB-A',
    specification: '12V / 24V Vehicle Socket · Metal Alloy Housing',
    productImage:
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=85',
    galleryImages: {
      front:
        'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=85',
    },
    compatibleModels: 'Universal 12V/24V Vehicle Socket & All Phones',
    compatibleFitGroup: 'chargers',
    price: null,
    verifiedPrice: false,
    availability: 'Check Availability',
    visualType: 'chargers',
    shortDescription:
      'Compact vehicle power adapters with USB-C PD and USB-A fast output for charging on the move.',
  },

  // ============================================================================
  // 2. CABLES
  // ============================================================================
  {
    id: 'acc-cat-typec-cables',
    brand: 'Multi-Brand Compatible',
    productName: 'USB Type-C to Type-C & Type-A Fast Cables',
    category: 'Cables',
    variant: '60W / 100W Braided Cable (1m / 2m)',
    specification: 'High-Purity Copper Core · 480Mbps Data Sync · Nylon Braided',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/2.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/2.webp',
    },
    compatibleModels: 'All USB Type-C Android & iPhone 15/16/17 Series Models',
    compatibleFitGroup: 'cables',
    price: null,
    verifiedPrice: false,
    availability: 'Check Availability',
    visualType: 'cables',
    shortDescription:
      '60W/100W PD and SuperVOOC compatible USB Type-C fast charging cables with reinforced strain relief.',
  },
  {
    id: 'acc-cat-lightning-cables',
    brand: 'Multi-Brand Compatible',
    productName: 'USB-C to Lightning & USB-A to Lightning Cables',
    category: 'Cables',
    variant: 'Lightning Fast Sync Cable (1m)',
    specification: 'PD Fast Charging Support · Reinforced Connectors',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/1.webp',
    },
    compatibleModels: 'Compatible iPhone & iPad Models with Lightning Connector',
    compatibleFitGroup: 'cables',
    price: null,
    verifiedPrice: false,
    availability: 'Check Availability',
    visualType: 'cables',
    shortDescription:
      'Fast-charging and sync cables for Lightning-port iPhone models and Apple mobile devices.',
  },
  {
    id: 'acc-cat-usb-cables',
    brand: 'Multi-Brand Compatible',
    productName: 'High-Speed Micro-USB & USB-A Data Cables',
    category: 'Cables',
    variant: 'Standard USB 2.4A Fast Sync Cable',
    specification: 'Tangle-Free TPE / Braided Finish · 2.4A Max Current',
    productImage:
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=85',
    galleryImages: {
      front:
        'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=85',
    },
    compatibleModels: 'All USB-A & Micro-USB Smartphones & Accessories',
    compatibleFitGroup: 'cables',
    price: null,
    verifiedPrice: false,
    availability: 'Check Availability',
    visualType: 'cables',
    shortDescription:
      'Durable braided and flexible USB charging and data sync cables for reliable daily connectivity.',
  },

  // ============================================================================
  // 3. POWER BANKS
  // ============================================================================
  {
    id: 'acc-cat-powerbanks',
    brand: 'Multi-Brand Compatible',
    productName: 'MagSafe & Multi-Port Fast-Charge Power Banks',
    category: 'Power Banks',
    variant: '10,000mAh / 20,000mAh Fast Power Bank',
    specification: 'Dual USB-A + Type-C Bi-Directional Fast Charge · LED Indicator',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/1.webp',
    },
    compatibleModels: 'Universal Smartphone, Earbud & Tablet Charging',
    compatibleFitGroup: 'other',
    price: null,
    verifiedPrice: false,
    availability: 'Check Availability',
    visualType: 'powerbanks',
    shortDescription:
      'Compact portable battery packs with Type-C, USB-A and magnetic wireless output for all-day power.',
  },

  // ============================================================================
  // 4. SMART WATCHES (Official Verified Prices from Price Lists)
  // ============================================================================
  {
    id: 'acc-pixel-watch-5-41mm',
    brand: 'Google Pixel',
    productName: 'Pixel Watch 5 (41 mm)',
    category: 'Smart Watches',
    variant: '41 mm (Wi-Fi / Bluetooth)',
    specification: 'Actua AMOLED Display · Heart Rate & ECG · Wear OS · Fast Charging',
    productImage: '/assets/products/pixel-watch-5.jpg',
    galleryImages: {
      front: '/assets/products/pixel-watch-5.jpg',
    },
    compatibleModels: 'Android 10+ Companion App Support',
    compatibleFitGroup: 'other',
    price: 42900,
    mopPrice: '₹42,900',
    verifiedPrice: true,
    availability: 'Available',
    visualType: 'other',
    shortDescription:
      'Official Google Pixel Watch 5 with 41mm premium circular display, advanced Fitbit health tracking and Wear OS.',
  },
  {
    id: 'acc-pixel-watch-5-45mm',
    brand: 'Google Pixel',
    productName: 'Pixel Watch 5 (45 mm)',
    category: 'Smart Watches',
    variant: '45 mm (Wi-Fi / Bluetooth)',
    specification: 'Larger 45mm Actua Display · Extended Battery Life · Fitness & Sleep Tracking',
    productImage: '/assets/products/pixel-watch-5-2.jpg',
    galleryImages: {
      front: '/assets/products/pixel-watch-5-2.jpg',
    },
    compatibleModels: 'Android 10+ Companion App Support',
    compatibleFitGroup: 'other',
    price: 45900,
    mopPrice: '₹45,900',
    verifiedPrice: true,
    availability: 'Available',
    visualType: 'other',
    shortDescription:
      'Official Google Pixel Watch 5 in 45mm casing with larger bright screen, multi-day battery and workout metrics.',
  },
  {
    id: 'acc-google-fitbit-air',
    brand: 'Google Pixel',
    productName: 'Google Fitbit AIR',
    category: 'Smart Watches',
    variant: 'Standard Fitness Band',
    specification: 'Slim Lightweight Design · All-Day Activity Tracking · Water Resistant',
    productImage: '/assets/products/google-fitbit-air.webp',
    galleryImages: {
      front: '/assets/products/google-fitbit-air.webp',
    },
    compatibleModels: 'Android & iOS Companion App Support',
    compatibleFitGroup: 'other',
    price: 13999,
    mopPrice: '₹13,999',
    verifiedPrice: true,
    availability: 'Available',
    visualType: 'other',
    shortDescription:
      'Lightweight fitness tracker band with real-time heart rate, stress monitoring and sleep score analysis.',
  },
  {
    id: 'acc-cat-smartwatches-universal',
    brand: 'Multi-Brand Compatible',
    productName: 'Bluetooth Calling Smartwatches & Fitness Trackers',
    category: 'Smart Watches',
    variant: 'HD Bluetooth Calling Edition',
    specification: '1.9" Full Touch HD Display · SpO2 & Heart Rate · Voice Assistant',
    productImage: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-watch7.jpg',
    galleryImages: {
      front: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-watch7.jpg',
    },
    compatibleModels: 'Universal Android & iOS Companion App Support',
    compatibleFitGroup: 'other',
    price: null,
    verifiedPrice: false,
    availability: 'Check Availability',
    visualType: 'other',
    shortDescription:
      'Feature-packed Bluetooth calling smartwatches with multiple sports modes, long battery and water resistance.',
  },

  // ============================================================================
  // 5. BLUETOOTH SPEAKERS
  // ============================================================================
  {
    id: 'acc-cat-bt-speakers',
    brand: 'Multi-Brand Compatible',
    productName: 'Portable Wireless Bluetooth Speakers',
    category: 'Bluetooth Speakers',
    variant: 'Portable Stereo Bass Edition',
    specification: 'Bluetooth 5.3 · IPX6 Water Resistant · Up to 12 Hours Playtime',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-homepod-mini-cosmic-grey/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-homepod-mini-cosmic-grey/1.webp',
    },
    compatibleModels: 'Universal Bluetooth, AUX & TF Card Playback',
    compatibleFitGroup: 'other',
    price: null,
    verifiedPrice: false,
    availability: 'Check Availability',
    visualType: 'audio-acc',
    shortDescription:
      'Compact wireless speakers with punchy bass, long battery life and multi-device pairing for indoor and outdoor sound.',
  },

  // ============================================================================
  // 6. MOBILE HOLDERS
  // ============================================================================
  {
    id: 'acc-cat-holders',
    brand: 'Multi-Brand Compatible',
    productName: 'Desk Stands, Monopods, Bike & Car Mobile Holders',
    category: 'Mobile Holders',
    variant: '360° Rotatable Universal Mount',
    specification: 'Anti-Slip Silicone Pads · Aluminum Alloy Pivot · Quick One-Hand Mount',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/selfie-stick-monopod/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/selfie-stick-monopod/1.webp',
    },
    compatibleModels: 'Universal Fit for 4.7" to 7.2" Mobile Screens',
    compatibleFitGroup: 'other',
    price: null,
    verifiedPrice: false,
    availability: 'Check Availability',
    visualType: 'stands',
    shortDescription:
      'Adjustable tabletop stands, monopods and shockproof mounts for car dashboards, AC vents and bike handlebars.',
  },

  // ============================================================================
  // 7. TWS / EARBUDS (Official Verified Price for vivo Buds XE)
  // ============================================================================
  {
    id: 'acc-vivo-buds-xe-w39',
    brand: 'vivo',
    productName: 'Buds XE W39 True Wireless Earbuds',
    category: 'TWS / Earbuds',
    variant: 'Standard Stereo Case',
    specification: 'Deep Bass Drivers · Low Latency Gaming Mode · Fast Pairing · Touch Controls',
    productImage: '/assets/products/vivo-buds-xe-w39.jpg',
    galleryImages: {
      front: '/assets/products/vivo-buds-xe-w39.jpg',
    },
    compatibleModels: 'vivo Smartphones, Android & iOS Bluetooth Devices',
    compatibleFitGroup: 'tws',
    price: 1999,
    mopPrice: '₹ 1,999',
    verifiedPrice: true,
    availability: 'Available',
    visualType: 'tws',
    shortDescription:
      'Official vivo Buds XE W39 true wireless earbuds featuring powerful dynamic bass and pocket charging case.',
  },
  {
    id: 'acc-cat-tws-universal',
    brand: 'Multi-Brand Compatible',
    productName: 'High-Fidelity True Wireless Earbuds (TWS)',
    category: 'TWS / Earbuds',
    variant: 'ANC / ENC Wireless Earbuds',
    specification: 'Bluetooth 5.3 · Active Environmental Noise Cancellation · Type-C Fast Charge',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/1.webp',
    },
    compatibleModels: 'Universal Bluetooth Compatibility (Android & iOS)',
    compatibleFitGroup: 'tws',
    price: null,
    verifiedPrice: false,
    availability: 'Check Availability',
    visualType: 'tws',
    shortDescription:
      'Compact wireless earbuds with smart noise reduction, touch controls and extended playtime with charging case.',
  },

  // ============================================================================
  // 8. EARPHONES
  // ============================================================================
  {
    id: 'acc-cat-wireless-earphones',
    brand: 'Multi-Brand Compatible',
    productName: 'Bluetooth Neckband Wireless Earphones',
    category: 'Earphones',
    variant: 'Magnetic Bluetooth Neckband',
    specification: 'Up to 30 Hours Playtime · Magnetic Earbuds · In-Line Mic & Volume Controls',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/beats-flex-wireless-earphones/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/beats-flex-wireless-earphones/1.webp',
    },
    compatibleModels: 'Universal Bluetooth Compatibility (Android & iOS)',
    compatibleFitGroup: 'earphones',
    price: null,
    verifiedPrice: false,
    availability: 'Check Availability',
    visualType: 'earphones',
    shortDescription:
      'Ergonomic flexible neckbands with magnetic on/off clasp, deep bass response and clear voice call clarity.',
  },
  {
    id: 'acc-cat-wired-earphones',
    brand: 'Multi-Brand Compatible',
    productName: 'Type-C & 3.5mm Wired In-Ear Earphones',
    category: 'Earphones',
    variant: 'Type-C / 3.5mm Stereo Headset',
    specification: 'DAC Chipset (Type-C) · High-Definition Inline Microphone · Tangle-Resistant Wire',
    productImage:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=85',
    galleryImages: {
      front:
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=85',
    },
    compatibleModels: 'USB Type-C & 3.5mm Headphone Jack Smartphones',
    compatibleFitGroup: 'earphones',
    price: null,
    verifiedPrice: false,
    availability: 'Check Availability',
    visualType: 'earphones',
    shortDescription:
      'Zero-latency wired in-ear earphones with clear microphone audio, balanced acoustic drivers and call controls.',
  },

  // ============================================================================
  // 9. TEMPERED GLASS
  // ============================================================================
  {
    id: 'acc-cat-tempered',
    brand: 'Multi-Brand Compatible',
    productName: '9H Tempered Glass & Edge-to-Edge Screen Guards',
    category: 'Tempered Glass',
    variant: '9H D+ Edge-to-Edge Screen Guard',
    specification: '9H Hardness · Oleophobic Anti-Fingerprint Coating · High Touch Sensitivity',
    productImage:
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=85',
    galleryImages: {
      front:
        'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=85',
    },
    compatibleModels: 'All Major Smartphone Brands & Models (Enquire for Your Model)',
    compatibleFitGroup: 'tempered',
    price: null,
    verifiedPrice: false,
    availability: 'Check Availability',
    visualType: 'tempered',
    shortDescription:
      'Full coverage edge-to-edge tempered glass, privacy screen guards, matte gaming glass and UV curved protectors.',
  },

  // ============================================================================
  // 10. MOBILE COVERS
  // ============================================================================
  {
    id: 'acc-cat-covers',
    brand: 'Multi-Brand Compatible',
    productName: 'Protective Silicone & Shockproof Mobile Covers',
    category: 'Mobile Covers',
    variant: 'Matte Silicone / Shockproof Armor / MagSafe',
    specification: 'Raised Camera Bezel Protection · Air-Cushion Drop Absorption Corners',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/1.webp',
    },
    compatibleModels: 'All Major Smartphone Brands & Models (Enquire for Your Model)',
    compatibleFitGroup: 'cases',
    price: null,
    verifiedPrice: false,
    availability: 'Check Availability',
    visualType: 'cases',
    shortDescription:
      'Crystal clear non-yellowing covers, soft-touch matte silicone cases, heavy-duty drop cases and magnetic covers.',
  },

  // ============================================================================
  // 11. SMART WATCH STRAPS
  // ============================================================================
  {
    id: 'acc-cat-watch-straps',
    brand: 'Multi-Brand Compatible',
    productName: 'Magnetic, Silicone & Metal Smart Watch Straps',
    category: 'Smart Watch Straps',
    variant: '20mm / 22mm Quick-Release Band',
    specification: 'Skin-Friendly Breathable Silicone · Magnetic Loop Clasp · Sweat Resistant',
    productImage:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85',
    galleryImages: {
      front:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85',
    },
    compatibleModels: 'Universal 20mm & 22mm Smartwatch Lug Widths',
    compatibleFitGroup: 'other',
    price: null,
    verifiedPrice: false,
    availability: 'Check Availability',
    visualType: 'other',
    shortDescription:
      'Replacement smartwatch straps in sports silicone, stainless steel mesh and magnetic Milanese loop designs.',
  },

  // ============================================================================
  // 12. OTHER MOBILE ACCESSORIES
  // ============================================================================
  {
    id: 'acc-cat-other',
    brand: 'Multi-Brand Compatible',
    productName: 'Over-Ear Headphones, OTG Adapters & Memory Cards',
    category: 'Other Mobile Accessories',
    variant: 'Type-C OTG / MicroSD / Cleaning Kit',
    specification: 'High Speed Data Transmission · Class 10 Storage · Universal Smartphone Compatibility',
    productImage:
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp',
    galleryImages: {
      front:
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp',
    },
    compatibleModels: 'Universal Smartphone & Computing Device Support',
    compatibleFitGroup: 'other',
    price: null,
    verifiedPrice: false,
    availability: 'Check Availability',
    visualType: 'other',
    shortDescription:
      'Over-ear wireless headphones, high-speed MicroSD memory cards, Type-C OTG adapters and cleaning accessories.',
  },
];
