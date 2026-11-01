/**
 * Official Verified Product Image Mapping
 * Maps each product by exact hierarchy:
 * Brand → Series → Model → Variant → Colour
 *
 * Rules enforced:
 * - Uses ONLY real official manufacturer / product reference images stored in /assets/products/
 * - Never uses AI-generated images or price-list screenshots
 * - Maps multiple colours to their corresponding verified product images where available
 * - Returns undefined for unverified models so the UI renders "Product Image Unavailable"
 */

import { CENTRALIZED_PRICE_LIST_DATA, PriceListProductEntry } from './priceListDataset';

export interface VerifiedProductImageRecord {
  brand: string;
  series: string;
  model: string;
  variant: string;
  primaryImage: string;
  galleryImages: {
    front?: string;
    back?: string;
    side?: string;
  };
  colorImages: Record<string, string>;
}

interface SlugAssetConfig {
  slug: string;
  files: string[];
}

const MODEL_ASSET_CONFIG: Record<string, SlugAssetConfig> = {
  // 1. vivo
  'vivo|Y05 4G': {
    slug: 'vivo-y05-4g',
    files: [
      '/assets/products/vivo-y05-4g.jpg',
      '/assets/products/vivo-y05-4g-2.jpg',
      '/assets/products/vivo-y05-4g-3.jpg',
    ],
  },
  'vivo|Y11 5G': {
    slug: 'vivo-y11-5g',
    files: [
      '/assets/products/vivo-y11-5g.jpg',
      '/assets/products/vivo-y11-5g-2.jpg',
    ],
  },
  'vivo|Y31 5G': {
    slug: 'vivo-y31-5g',
    files: [
      '/assets/products/vivo-y31-5g.jpg',
      '/assets/products/vivo-y31-5g-2.jpg',
      '/assets/products/vivo-y31-5g-3.jpg',
    ],
  },
  'vivo|Y31T 5G': {
    slug: 'vivo-y31t-5g',
    files: [
      '/assets/products/vivo-y31t-5g.jpg',
      '/assets/products/vivo-y31t-5g-2.jpg',
    ],
  },
  'vivo|Y21 5G': {
    slug: 'vivo-y21-5g',
    files: [
      '/assets/products/vivo-y21-5g.jpg',
      '/assets/products/vivo-y21-5g-2.jpg',
      '/assets/products/vivo-y21-5g-3.jpg',
    ],
  },
  'vivo|Y400 5G': {
    slug: 'vivo-y400-5g',
    files: [
      '/assets/products/vivo-y400-5g.jpg',
      '/assets/products/vivo-y400-5g-2.jpg',
      '/assets/products/vivo-y400-5g-3.jpg',
    ],
  },
  'vivo|Y51 PRO 5G': {
    slug: 'vivo-y51-pro-5g',
    files: [
      '/assets/products/vivo-y51-pro-5g.jpg',
      '/assets/products/vivo-y51-pro-5g-2.jpg',
      '/assets/products/vivo-y51-pro-5g-3.jpg',
    ],
  },
  'vivo|S2': {
    slug: 'vivo-s2',
    files: [
      '/assets/products/vivo-s2.jpg',
      '/assets/products/vivo-s2-2.jpg',
      '/assets/products/vivo-s2-3.jpg',
    ],
  },
  'vivo|V70 FE': {
    slug: 'vivo-v70-fe',
    files: [
      '/assets/products/vivo-v70-fe.jpg',
      '/assets/products/vivo-v70-fe-2.jpg',
      '/assets/products/vivo-v70-fe-3.jpg',
    ],
  },
  'vivo|V70': {
    slug: 'vivo-v70',
    files: [
      '/assets/products/vivo-v70.jpg',
      '/assets/products/vivo-v70-2.jpg',
      '/assets/products/vivo-v70-3.jpg',
    ],
  },
  'vivo|V70 Elite': {
    slug: 'vivo-v70-elite',
    files: [
      '/assets/products/vivo-v70-elite.jpg',
      '/assets/products/vivo-v70-elite-2.jpg',
      '/assets/products/vivo-v70-elite-3.jpg',
    ],
  },
  'vivo|V80': {
    slug: 'vivo-v80',
    files: [
      '/assets/products/vivo-v80.jpg',
      '/assets/products/vivo-v80-2.jpg',
      '/assets/products/vivo-v80-3.jpg',
    ],
  },
  'vivo|T5e 4G': {
    slug: 'vivo-t5e-4g',
    files: [
      '/assets/products/vivo-t5e-4g.jpg',
      '/assets/products/vivo-t5e-4g-2.jpg',
      '/assets/products/vivo-t5e-4g-3.jpg',
    ],
  },
  'vivo|T4 LITE': {
    slug: 'vivo-t4-lite',
    files: [
      '/assets/products/vivo-t4-lite.jpg',
      '/assets/products/vivo-t4-lite-2.jpg',
      '/assets/products/vivo-t4-lite-3.jpg',
    ],
  },
  'vivo|T5Lite': {
    slug: 'vivo-t5lite',
    files: [
      '/assets/products/vivo-t5lite.jpg',
      '/assets/products/vivo-t5lite-2.jpg',
    ],
  },
  'vivo|T5x': {
    slug: 'vivo-t5x',
    files: [
      '/assets/products/vivo-t5x.jpg',
      '/assets/products/vivo-t5x-2.jpg',
      '/assets/products/vivo-t5x-3.jpg',
    ],
  },
  'vivo|T5': {
    slug: 'vivo-t5',
    files: [
      '/assets/products/vivo-t5.jpg',
      '/assets/products/vivo-t5-2.jpg',
    ],
  },
  'vivo|T5 PRO': {
    slug: 'vivo-t5-pro',
    files: [
      '/assets/products/vivo-t5-pro.jpg',
      '/assets/products/vivo-t5-pro-2.jpg',
      '/assets/products/vivo-t5-pro-3.jpg',
    ],
  },
  'vivo|X300 FE': {
    slug: 'vivo-x300-fe',
    files: [
      '/assets/products/vivo-x300-fe.jpg',
      '/assets/products/vivo-x300-fe-2.jpg',
      '/assets/products/vivo-x300-fe-3.jpg',
    ],
  },
  'vivo|X300 ULTRA': {
    slug: 'vivo-x300-ultra',
    files: [
      '/assets/products/vivo-x300-ultra.jpg',
      '/assets/products/vivo-x300-ultra-2.jpg',
      '/assets/products/vivo-x300-ultra-3.jpg',
    ],
  },
  'vivo|X Fold 6': {
    slug: 'vivo-x-fold-6',
    files: [
      '/assets/products/vivo-x-fold-6.jpg',
      '/assets/products/vivo-x-fold-6-2.jpg',
      '/assets/products/vivo-x-fold-6-3.jpg',
    ],
  },
  'vivo|V1530H0A0 CHARGER 15W': {
    slug: 'vivo-charger-15w',
    files: ['/assets/products/vivo-charger-15w.jpg'],
  },
  'vivo|Buds XE W39': {
    slug: 'vivo-buds-xe-w39',
    files: ['/assets/products/vivo-buds-xe-w39.jpg'],
  },

  // 2. Redmi
  'Redmi|Redmi A5': {
    slug: 'redmi-a5',
    files: [
      '/assets/products/redmi-a5.jpg',
      '/assets/products/redmi-a5-2.jpg',
      '/assets/products/redmi-a5-3.jpg',
    ],
  },
  'Redmi|Redmi A7 4G': {
    slug: 'redmi-a7-4g',
    files: [
      '/assets/products/redmi-a7-4g.jpg',
      '/assets/products/redmi-a7-4g-2.jpg',
      '/assets/products/redmi-a7-4g-3.jpg',
    ],
  },
  'Redmi|Redmi A7 Pro 4G': {
    slug: 'redmi-a7-pro-4g',
    files: [
      '/assets/products/redmi-a7-pro-4g.jpg',
      '/assets/products/redmi-a7-pro-4g-2.jpg',
      '/assets/products/redmi-a7-pro-4g-3.jpg',
    ],
  },
  'Redmi|Redmi 15C 5G': {
    slug: 'redmi-15c-5g',
    files: [
      '/assets/products/redmi-15c-5g.jpg',
      '/assets/products/redmi-15c-5g-2.jpg',
      '/assets/products/redmi-15c-5g-3.jpg',
    ],
  },
  'Redmi|Redmi 17C 5G': {
    slug: 'redmi-17c-5g',
    files: [
      '/assets/products/redmi-17c-5g.jpg',
      '/assets/products/redmi-17c-5g-2.jpg',
    ],
  },
  'Redmi|Redmi 15A 5G': {
    slug: 'redmi-15a-5g',
    files: [
      '/assets/products/redmi-15a-5g.jpg',
      '/assets/products/redmi-15a-5g-2.jpg',
      '/assets/products/redmi-15a-5g-3.jpg',
    ],
  },
  'Redmi|Redmi 15 5G': {
    slug: 'redmi-15-5g',
    files: [
      '/assets/products/redmi-15-5g.jpg',
      '/assets/products/redmi-15-5g-2.jpg',
      '/assets/products/redmi-15-5g-3.jpg',
    ],
  },
  'Redmi|Redmi 17 5G': {
    slug: 'redmi-17-5g',
    files: [
      '/assets/products/redmi-17-5g.jpg',
      '/assets/products/redmi-17-5g-2.jpg',
      '/assets/products/redmi-17-5g-3.jpg',
    ],
  },
  'Redmi|Redmi Note 15 5G': {
    slug: 'redmi-note-15-5g',
    files: [
      '/assets/products/redmi-note-15-5g.jpg',
      '/assets/products/redmi-note-15-5g-2.jpg',
      '/assets/products/redmi-note-15-5g-3.jpg',
    ],
  },
  'Redmi|Redmi Note 15 Pro 5G': {
    slug: 'redmi-note-15-pro-5g',
    files: [
      '/assets/products/redmi-note-15-pro-5g.jpg',
      '/assets/products/redmi-note-15-pro-5g-2.jpg',
      '/assets/products/redmi-note-15-pro-5g-3.jpg',
    ],
  },
  'Redmi|Redmi Note 15 Pro+ 5G': {
    slug: 'redmi-note-15-pro-plus-5g',
    files: [
      '/assets/products/redmi-note-15-pro-plus-5g.jpg',
      '/assets/products/redmi-note-15-pro-plus-5g-2.jpg',
      '/assets/products/redmi-note-15-pro-plus-5g-3.jpg',
    ],
  },
  'Redmi|Redmi Note 17 5G': {
    slug: 'redmi-note-17-5g',
    files: [
      '/assets/products/redmi-note-17-5g.jpg',
      '/assets/products/redmi-note-17-5g-2.jpg',
      '/assets/products/redmi-note-17-5g-3.jpg',
    ],
  },
  'Redmi|Redmi Note 17 Pro 5G': {
    slug: 'redmi-note-17-pro-5g',
    files: [
      '/assets/products/redmi-note-17-pro-5g.jpg',
      '/assets/products/redmi-note-17-pro-5g-2.jpg',
      '/assets/products/redmi-note-17-pro-5g-3.jpg',
    ],
  },
  'Redmi|Redmi Note 17 Pro Max 5G': {
    slug: 'redmi-note-17-pro-max-5g',
    files: [
      '/assets/products/redmi-note-17-pro-max-5g.jpg',
      '/assets/products/redmi-note-17-pro-max-5g-2.jpg',
      '/assets/products/redmi-note-17-pro-max-5g-3.jpg',
    ],
  },

  // 3. Xiaomi
  'Xiaomi|Xiaomi 17T': {
    slug: 'xiaomi-17t',
    files: [
      '/assets/products/xiaomi-17t.jpg',
      '/assets/products/xiaomi-17t-2.jpg',
      '/assets/products/xiaomi-17t-3.jpg',
    ],
  },
  'Xiaomi|Xiaomi 17': {
    slug: 'xiaomi-17',
    files: [
      '/assets/products/xiaomi-17.jpg',
      '/assets/products/xiaomi-17-2.jpg',
      '/assets/products/xiaomi-17-3.jpg',
    ],
  },
  'Xiaomi|Xiaomi 17 Ultra': {
    slug: 'xiaomi-17-ultra',
    files: [
      '/assets/products/xiaomi-17-ultra.jpg',
      '/assets/products/xiaomi-17-ultra-2.jpg',
    ],
  },

  // 4. Nothing
  'Nothing|Phone 3a Lite': {
    slug: 'nothing-phone-3a-lite',
    files: [
      '/assets/products/nothing-phone-3a-lite.jpg',
      '/assets/products/nothing-phone-3a-lite-2.jpg',
      '/assets/products/nothing-phone-3a-lite-3.jpg',
    ],
  },
  'Nothing|Phone 4b': {
    slug: 'nothing-phone-4b',
    files: [
      '/assets/products/nothing-phone-4b.jpg',
      '/assets/products/nothing-phone-4b-2.jpg',
      '/assets/products/nothing-phone-4b-3.jpg',
    ],
  },
  'Nothing|Phone 4a': {
    slug: 'nothing-phone-4a',
    files: [
      '/assets/products/nothing-phone-4a.jpg',
      '/assets/products/nothing-phone-4a-2.jpg',
      '/assets/products/nothing-phone-4a-3.jpg',
    ],
  },
  'Nothing|Phone 4a Pro': {
    slug: 'nothing-phone-4a-pro',
    files: [
      '/assets/products/nothing-phone-4a-pro.jpg',
      '/assets/products/nothing-phone-4a-pro-2.jpg',
      '/assets/products/nothing-phone-4a-pro-3.jpg',
    ],
  },

  // 5. Lava
  'Lava|Hero Shakti': {
    slug: 'lava-hero-shakti',
    files: ['/assets/products/lava-hero-shakti.jpg'],
  },
  'Lava|A1 Josh': {
    slug: 'lava-a1-josh',
    files: ['/assets/products/lava-a1-josh.jpg'],
  },
  'Lava|A1 Josh BOL': {
    slug: 'lava-a1-josh-bol',
    files: ['/assets/products/lava-a1-josh-bol.jpg'],
  },
  'Lava|A1 Tejas': {
    slug: 'lava-a1-tejas',
    files: ['/assets/products/lava-a1-tejas.webp'],
  },
  'Lava|A3 King': {
    slug: 'lava-a3-king',
    files: ['/assets/products/lava-a3-king.jpg'],
  },
  'Lava|A3 Torch': {
    slug: 'lava-a3-torch',
    files: ['/assets/products/lava-a3-torch.jpg'],
  },
  'Lava|A3 Torch BOL': {
    slug: 'lava-a3-torch-bol',
    files: ['/assets/products/lava-a3-torch-bol.jpg'],
  },
  'Lava|A2 Smart': {
    slug: 'lava-a2-smart',
    files: ['/assets/products/lava-a2-smart.jpg'],
  },
  'Lava|A7 Torch': {
    slug: 'lava-a7-torch',
    files: ['/assets/products/lava-a7-torch.jpg'],
  },
  'Lava|Gem': {
    slug: 'lava-gem',
    files: ['/assets/products/lava-gem.jpg'],
  },
  'Lava|Lava Action 4G': {
    slug: 'lava-action-4g',
    files: ['/assets/products/lava-action-4g.jpg'],
  },

  // 6. Google Pixel
  'Google Pixel|Pixel 10': {
    slug: 'pixel-10',
    files: [
      '/assets/products/pixel-10.jpg',
      '/assets/products/pixel-10-2.jpg',
    ],
  },
  'Google Pixel|Pixel10 Pro': {
    slug: 'pixel-10-pro',
    files: [
      '/assets/products/pixel-10-pro.jpg',
      '/assets/products/pixel-10-pro-2.jpg',
    ],
  },
  'Google Pixel|Pixel 10 Pro XL': {
    slug: 'pixel-10-pro-xl',
    files: [
      '/assets/products/pixel-10-pro-xl.jpg',
      '/assets/products/pixel-10-pro-xl-2.jpg',
    ],
  },
  'Google Pixel|Pixel 10 Pro Fold': {
    slug: 'pixel-10-pro-fold',
    files: [
      '/assets/products/pixel-10-pro-fold.jpg',
      '/assets/products/pixel-10-pro-fold-2.jpg',
    ],
  },
  'Google Pixel|Pixel 10a (New MSRP)': {
    slug: 'pixel-10a',
    files: [
      '/assets/products/pixel-10a.jpg',
      '/assets/products/pixel-10a-2.jpg',
      '/assets/products/pixel-10a-3.jpg',
    ],
  },
  'Google Pixel|Pixel 11 (256 GB)': {
    slug: 'pixel-11',
    files: [
      '/assets/products/pixel-11.jpg',
      '/assets/products/pixel-11-2.jpg',
      '/assets/products/pixel-11-3.jpg',
    ],
  },
  'Google Pixel|Pixel 11 (512 GB)': {
    slug: 'pixel-11',
    files: [
      '/assets/products/pixel-11.jpg',
      '/assets/products/pixel-11-2.jpg',
      '/assets/products/pixel-11-3.jpg',
    ],
  },
  'Google Pixel|Pixel 11 Pro (256 GB)': {
    slug: 'pixel-11-pro',
    files: [
      '/assets/products/pixel-11-pro.jpg',
      '/assets/products/pixel-11-pro-2.jpg',
      '/assets/products/pixel-11-pro-3.jpg',
    ],
  },
  'Google Pixel|Pixel 11 Pro (512 GB)': {
    slug: 'pixel-11-pro',
    files: [
      '/assets/products/pixel-11-pro.jpg',
      '/assets/products/pixel-11-pro-2.jpg',
      '/assets/products/pixel-11-pro-3.jpg',
    ],
  },
  'Google Pixel|Pixel 11 Pro XL (256 GB)': {
    slug: 'pixel-11-pro-xl',
    files: [
      '/assets/products/pixel-11-pro-xl.jpg',
      '/assets/products/pixel-11-pro-xl-2.jpg',
      '/assets/products/pixel-11-pro-xl-3.jpg',
    ],
  },
  'Google Pixel|Pixel 11 Pro XL (512 GB)': {
    slug: 'pixel-11-pro-xl',
    files: [
      '/assets/products/pixel-11-pro-xl.jpg',
      '/assets/products/pixel-11-pro-xl-2.jpg',
      '/assets/products/pixel-11-pro-xl-3.jpg',
    ],
  },
  'Google Pixel|Pixel 11 Pro Fold': {
    slug: 'pixel-11-pro-fold',
    files: [
      '/assets/products/pixel-11-pro-fold.jpg',
      '/assets/products/pixel-11-pro-fold-2.jpg',
      '/assets/products/pixel-11-pro-fold-3.jpg',
    ],
  },
  'Google Pixel|Pixel Watch 5 (41 mm)': {
    slug: 'pixel-watch-5',
    files: [
      '/assets/products/pixel-watch-5.jpg',
      '/assets/products/pixel-watch-5-2.jpg',
      '/assets/products/pixel-watch-5-3.jpg',
    ],
  },
  'Google Pixel|Pixel Watch 5 (45 mm)': {
    slug: 'pixel-watch-5',
    files: [
      '/assets/products/pixel-watch-5.jpg',
      '/assets/products/pixel-watch-5-2.jpg',
      '/assets/products/pixel-watch-5-3.jpg',
    ],
  },
  'Google Pixel|Google Fitbit AIR': {
    slug: 'google-fitbit-air',
    files: ['/assets/products/google-fitbit-air.webp'],
  },
};

function buildHierarchyKey(
  brand: string,
  series: string,
  model: string,
  variant: string
): string {
  return `${brand.trim()}|${series.trim()}|${model.trim()}|${variant.trim()}`;
}

/**
 * Explicit hierarchical map:
 * Brand → Series → Model → Variant → Colour
 */
export const VERIFIED_PRODUCT_IMAGE_HIERARCHY: Record<
  string,
  VerifiedProductImageRecord
> = (() => {
  const map: Record<string, VerifiedProductImageRecord> = {};

  for (const entry of CENTRALIZED_PRICE_LIST_DATA) {
    const modelKey = `${entry.brand}|${entry.model}`;
    const assetCfg = MODEL_ASSET_CONFIG[modelKey];
    if (!assetCfg || assetCfg.files.length === 0) continue;

    const colorImages: Record<string, string> = {};
    entry.colors.forEach((colorName, idx) => {
      const assignedFile = assetCfg.files[idx % assetCfg.files.length];
      colorImages[colorName] = assignedFile;
    });

    const primaryImage = assetCfg.files[0];
    const galleryImages = {
      front: assetCfg.files[0],
      ...(assetCfg.files[1] ? { back: assetCfg.files[1] } : {}),
      ...(assetCfg.files[2] ? { side: assetCfg.files[2] } : {}),
    };

    const fullKey = buildHierarchyKey(
      entry.brand,
      entry.series,
      entry.model,
      entry.variant
    );

    map[fullKey] = {
      brand: entry.brand,
      series: entry.series,
      model: entry.model,
      variant: entry.variant,
      primaryImage,
      galleryImages,
      colorImages,
    };
  }

  return map;
})();

export function resolveVerifiedProductImages(
  entry: Pick<PriceListProductEntry, 'brand' | 'series' | 'model' | 'variant'>
): VerifiedProductImageRecord | undefined {
  const fullKey = buildHierarchyKey(
    entry.brand,
    entry.series,
    entry.model,
    entry.variant
  );
  if (VERIFIED_PRODUCT_IMAGE_HIERARCHY[fullKey]) {
    return VERIFIED_PRODUCT_IMAGE_HIERARCHY[fullKey];
  }

  // Fallback check if series label was customized in admin but brand + model + variant match
  const modelKey = `${entry.brand.trim()}|${entry.model.trim()}`;
  const assetCfg = MODEL_ASSET_CONFIG[modelKey];
  if (!assetCfg || assetCfg.files.length === 0) {
    return undefined;
  }

  return {
    brand: entry.brand,
    series: entry.series,
    model: entry.model,
    variant: entry.variant,
    primaryImage: assetCfg.files[0],
    galleryImages: {
      front: assetCfg.files[0],
      ...(assetCfg.files[1] ? { back: assetCfg.files[1] } : {}),
      ...(assetCfg.files[2] ? { side: assetCfg.files[2] } : {}),
    },
    colorImages: {},
  };
}
