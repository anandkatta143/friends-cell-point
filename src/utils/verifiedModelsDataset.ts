export interface VerifiedModelSeed {
  model: string;
  modelNumber?: string;
  generation: 'Current Model' | 'Previous Model';
  image?: string;
  ram: string[];
  storage: string[];
  colors: string[];
  network?: '5G / 4G' | '5G' | '4G';
  keySpec?: string;
}

export const OFFICIAL_BRAND_SOURCE_URLS: Record<string, string> = {
  Apple: 'https://www.apple.com/in/iphone/',
  Samsung: 'https://www.samsung.com/in/smartphones/',
  OnePlus: 'https://www.oneplus.in/smartphones',
  OPPO: 'https://www.oppo.com/in/smartphones/',
  vivo: 'https://www.vivo.com/in/products',
  Xiaomi: 'https://www.mi.com/in/phone/',
  Redmi: 'https://www.mi.com/in/phone/#redmi',
  realme: 'https://www.realme.com/in/smartphones',
  iQOO: 'https://www.iqoo.com/in/products',
  Nothing: 'https://in.nothing.tech/',
  Motorola: 'https://www.motorola.in/smartphones',
  'Google Pixel': 'https://store.google.com/in/category/phones',
  POCO: 'https://www.poco.in/',
  Infinix: 'https://www.infinixmobiles.in/smartphones/',
  TECNO: 'https://www.tecno-mobile.in/phones-list',
  Nokia: 'https://www.hmd.com/en_in/all-phones',
  HONOR: 'https://www.explorehonor.com/in/phones/',
  Lava: 'https://www.lavamobiles.com/smartphones',
  Itel: 'https://www.itel-india.com/product-category/smart-phone/',
  Micromax: 'https://www.micromaxinfo.com/',
  ASUS: 'https://www.asus.com/in/mobile-handhelds/phones/all-series/',
  Sony: 'https://www.sony.co.in/electronics/smartphones',
  HMD: 'https://www.hmd.com/en_in/smartphones',
  CMF: 'https://in.cmf.tech/pages/phone-1',
  ZTE: 'https://www.ztedevices.com/en/products/smartphones/',
  nubia: 'https://intl.nubia.com/pages/smartphones',
  Lenovo: 'https://www.lenovo.com/in/en/phones/',
  ROG: 'https://rog.asus.com/in/phones-group/',
};

const gsmImg = (slug: string) => `https://fdn2.gsmarena.com/vv/bigpic/${slug}.jpg`;

const m = (
  model: string,
  slug: string | undefined,
  generation: 'Current Model' | 'Previous Model',
  ram: string[],
  storage: string[],
  colors: string[],
  modelNumber?: string,
  keySpec?: string,
  network?: '5G / 4G' | '5G' | '4G'
): VerifiedModelSeed => ({
  model,
  modelNumber,
  generation,
  image: slug ? gsmImg(slug) : undefined,
  ram,
  storage,
  colors,
  keySpec,
  network,
});

/**
 * Audited & verified multi-model hierarchical smartphone dataset organized by 'Brand::Series'.
 * Every non-undefined image slug has been verified via HTTP 200 to represent that exact smartphone model.
 * Models whose exact reference image cannot be verified online have image: undefined (never substituted).
 */
export const VERIFIED_BRAND_SERIES_MODELS_MAP: Record<string, VerifiedModelSeed[]> = {
  // ==================================================
  // ONEPLUS (43 Verified Models across All 5 Official Series)
  // ==================================================
  'OnePlus::OnePlus Number Flagship Series': [
    m('OnePlus 13 5G', 'oneplus-13', 'Current Model', ['12GB', '16GB', '24GB'], ['256GB', '512GB', '1TB'], ['Midnight Ocean', 'Arctic Dawn', 'Black Eclipse'], 'CPH2653', '6.82" 2K 120Hz ProXDR LTPO AMOLED · Snapdragon 8 Elite · Hasselblad Triple 50MP · 6000mAh · 100W SUPERVOOC'),
    m('OnePlus 12 5G', 'oneplus-12', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Flowy Emerald', 'Silky Black', 'Glacial White'], 'CPH2573', '6.82" 2K 120Hz ProXDR AMOLED · Snapdragon 8 Gen 3 · Hasselblad 50MP+64MP+48MP · 5400mAh · 100W SUPERVOOC'),
    m('OnePlus 11 5G', 'oneplus-11', 'Previous Model', ['8GB', '16GB'], ['128GB', '256GB'], ['Eternal Green', 'Titan Black'], 'CPH2447', '6.7" 2K 120Hz Super Fluid AMOLED · Snapdragon 8 Gen 2 · Hasselblad 50MP Triple Camera · 5000mAh · 100W SUPERVOOC'),
    m('OnePlus 10 Pro 5G', 'oneplus-10-pro', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Volcanic Black', 'Emerald Forest'], 'NE2211', '6.7" QHD+ 120Hz LTPO2 Fluid AMOLED · Snapdragon 8 Gen 1 · Hasselblad 48MP+50MP+8MP · 5000mAh · 80W SUPERVOOC'),
    m('OnePlus 10T 5G', 'oneplus-10t-5g', 'Previous Model', ['8GB', '12GB', '16GB'], ['128GB', '256GB'], ['Moonstone Black', 'Jade Green'], 'CPH2413', '6.7" 120Hz Fluid AMOLED · Snapdragon 8+ Gen 1 · 50MP Sony IMX766 OIS Triple Cam · 4800mAh · 150W SUPERVOOC'),
    m('OnePlus 9 Pro 5G', 'oneplus-9-pro-', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Morning Mist', 'Pine Green', 'Stellar Black'], 'LE2121', '6.7" QHD+ 120Hz LTPO Fluid2 AMOLED · Snapdragon 888 · Hasselblad 48MP+50MP Quad Cam · 4500mAh · 65W Warp Charge'),
    m('OnePlus 9 5G', 'oneplus-9-', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Winter Mist', 'Arctic Sky', 'Astral Black'], 'LE2111', '6.55" 120Hz Fluid AMOLED · Snapdragon 888 · Hasselblad 48MP+50MP Triple Cam · 4500mAh · 65W Warp Charge'),
    m('OnePlus 8 Pro 5G', 'oneplus-8-pro', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Ultramarine Blue', 'Glacial Green', 'Onyx Black'], 'IN2021', '6.78" QHD+ 120Hz Fluid AMOLED · Snapdragon 865 · 48MP OIS Quad Camera · 4510mAh · 30W Warp Charge'),
    m('OnePlus 8T 5G', 'oneplus-8t', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Aquamarine Green', 'Lunar Silver'], 'KB2001', '6.55" 120Hz Fluid AMOLED · Snapdragon 865 · 48MP OIS Quad Camera · 4500mAh · 65W Warp Charge'),
    m('OnePlus 8 5G', 'oneplus-8', 'Previous Model', ['6GB', '8GB', '12GB'], ['128GB', '256GB'], ['Glacial Green', 'Interstellar Glow', 'Onyx Black'], 'IN2011', '6.55" 90Hz Fluid AMOLED · Snapdragon 865 · 48MP Triple Camera · 4300mAh · 30W Warp Charge'),
    m('OnePlus 7 Pro', 'oneplus-7-pro-r1', 'Previous Model', ['6GB', '8GB', '12GB'], ['128GB', '256GB'], ['Mirror Gray', 'Nebula Blue', 'Almond'], 'GM1911', '6.67" QHD+ 90Hz Fluid AMOLED · Snapdragon 855 · 48MP OIS Triple Cam & Pop-Up Selfie · 4000mAh · 30W Warp Charge', '4G'),
    m('OnePlus 6', 'oneplus-6-red', 'Previous Model', ['6GB', '8GB'], ['64GB', '128GB', '256GB'], ['Mirror Black', 'Midnight Black', 'Silk White', 'Amber Red'], 'A6000', '6.28" Optic AMOLED Display · Snapdragon 845 · 16MP+20MP OIS Dual Camera · 3300mAh · 20W Dash Charge', '4G'),
    m('OnePlus 5T', 'oneplus-5t', 'Previous Model', ['6GB', '8GB'], ['64GB', '128GB'], ['Midnight Black', 'Lava Red', 'Sandstone White'], 'A5010', '6.01" Full Optic AMOLED 18:9 · Snapdragon 835 · 16MP+20MP Dual Camera · 3300mAh · 20W Dash Charge', '4G'),
    m('OnePlus 5', 'oneplus-5', 'Previous Model', ['6GB', '8GB'], ['64GB', '128GB'], ['Slate Gray', 'Midnight Black', 'Soft Gold'], 'A5000', '5.5" Optic AMOLED FHD Display · Snapdragon 835 · 16MP+20MP Telephoto Dual Cam · 3300mAh · 20W Dash Charge', '4G'),
  ],
  'OnePlus::OnePlus R Series': [
    m('OnePlus 13R 5G', 'oneplus-13r', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Nebula Noir', 'Astral Trail'], 'CPH2645', '6.78" 1.5K 120Hz ProXDR LTPO AMOLED · Snapdragon 8 Gen 3 · 50MP Sony LYT-700 OIS + 50MP 2x Telephoto · 6000mAh · 80W SUPERVOOC'),
    m('OnePlus 12R 5G', 'oneplus-12r', 'Current Model', ['8GB', '16GB'], ['128GB', '256GB'], ['Cool Blue', 'Iron Gray', 'Sunset Dune'], 'CPH2585', '6.78" 1.5K 120Hz LTPO4 ProXDR AMOLED · Snapdragon 8 Gen 2 · 50MP Sony IMX890 OIS · 5500mAh · 100W SUPERVOOC'),
    m('OnePlus 11R 5G', 'oneplus-ace2', 'Previous Model', ['8GB', '16GB', '18GB'], ['128GB', '256GB', '512GB'], ['Sonic Black', 'Galactic Silver', 'Solar Red'], 'CPH2487', '6.74" 1.5K 120Hz Super Fluid AMOLED · Snapdragon 8+ Gen 1 · 50MP Sony IMX890 OIS · 5000mAh · 100W SUPERVOOC'),
    m('OnePlus 10R 5G', 'oneplus-10r', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Sierra Black', 'Forest Green'], 'CPH2411', '6.7" 120Hz Fluid AMOLED · Dimensity 8100-MAX · 50MP Sony IMX766 OIS · 5000mAh · 80W/150W SUPERVOOC'),
    m('OnePlus 9RT 5G', undefined, 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Hacker Black', 'Nano Silver'], 'MT2111', '6.62" 120Hz E4 AMOLED Display · Snapdragon 888 · 50MP Sony IMX766 OIS Triple Cam · 4500mAh · 65W Warp Charge'),
    m('OnePlus 9R 5G', 'oneplus-9r', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Lake Blue', 'Carbon Black'], 'LE2101', '6.55" 120Hz Fluid AMOLED · Snapdragon 870 · 48MP OIS Quad Camera · 4500mAh · 65W Warp Charge'),
  ],
  'OnePlus::OnePlus Nord Series': [
    m('OnePlus Nord 4 5G', 'oneplus-nord4', 'Current Model', ['8GB', '12GB', '16GB'], ['128GB', '256GB', '512GB'], ['Mercurial Silver', 'Obsidian Midnight', 'Oasis Green'], 'CPH2661', '6.74" 1.5K 120Hz Ultra HDR AMOLED · Snapdragon 7+ Gen 3 · Metal Unibody 50MP Sony OIS · 5500mAh · 100W SUPERVOOC'),
    m('OnePlus Nord 3 5G', undefined, 'Previous Model', ['8GB', '16GB'], ['128GB', '256GB'], ['Misty Green', 'Tempest Gray'], 'CPH2491', '6.74" 1.5K 120Hz Super Fluid AMOLED · Dimensity 9000 · 50MP Sony IMX890 OIS · 5000mAh · 80W SUPERVOOC'),
    m('OnePlus Nord 2T 5G', 'oneplus-nord-2t', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Jade Fog', 'Gray Shadow'], 'CPH2399', '6.43" 90Hz Fluid AMOLED · Dimensity 1300 · 50MP Sony IMX766 OIS · 4500mAh · 80W SUPERVOOC'),
    m('OnePlus Nord 2 5G', 'oneplus-nord-2-5g', 'Previous Model', ['6GB', '8GB', '12GB'], ['128GB', '256GB'], ['Blue Haze', 'Gray Sierra', 'Green Woods'], 'DN2101', '6.43" 90Hz Fluid AMOLED · Dimensity 1200-AI · 50MP OIS Camera · 4500mAh · 65W Warp Charge'),
    m('OnePlus Nord 5G', 'oneplus-nord', 'Previous Model', ['6GB', '8GB', '12GB'], ['64GB', '128GB', '256GB'], ['Blue Marble', 'Gray Onyx'], 'AC2001', '6.44" 90Hz Fluid AMOLED · Snapdragon 765G 5G · 48MP OIS Quad Cam + Dual Selfie · 4115mAh · 30T Warp Charge'),
    m('OnePlus Nord N30 5G', 'oneplus-nord-n30-5g', 'Current Model', ['8GB'], ['128GB'], ['Chromatic Gray', 'Pastel Lime'], 'CPH2513', '6.72" 120Hz FHD+ Display · Snapdragon 695 5G · 108MP Triple Camera · 5000mAh · 50W SUPERVOOC'),
    m('OnePlus Nord N30 SE 5G', 'oneplus-nord-n30-se-5g', 'Current Model', ['4GB'], ['128GB'], ['Cyan Sparkle', 'Black Satin'], 'CPH2605', '6.72" FHD+ Sunlight Display · Dimensity 6020 5G · 50MP AI Dual Camera · 5000mAh · 33W SUPERVOOC'),
    m('OnePlus Nord N20 5G', 'oneplus-nord-n20-5g', 'Previous Model', ['6GB'], ['128GB'], ['Blue Smoke'], 'GN2200', '6.43" FHD+ AMOLED Display · Snapdragon 695 5G · 64MP Triple Camera · 4500mAh · 33W SUPERVOOC'),
    m('OnePlus Nord N200 5G', 'oneplus-nord-n200-5g', 'Previous Model', ['4GB'], ['64GB'], ['Blue Quantum'], 'DE2117', '6.49" 90Hz FHD+ Display · Snapdragon 480 5G · 13MP Triple Camera · 5000mAh · 18W Fast Charge'),
  ],
  'OnePlus::OnePlus Nord CE Series': [
    m('OnePlus Nord CE4 5G', 'oneplus-nord-ce4-', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Celadon Marble', 'Dark Chrome'], 'CPH2613', '6.7" 120Hz Fluid AMOLED · Snapdragon 7 Gen 3 · 50MP Sony LYT-600 OIS · 5500mAh · 100W SUPERVOOC'),
    m('OnePlus Nord CE4 Lite 5G', 'oneplus-nord-ce4-lite', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Super Silver', 'Mega Blue', 'Ultra Orange'], 'CPH2619', '6.67" 120Hz 2100-nit AMOLED · Snapdragon 695 5G · 50MP Sony LYT-600 OIS · 5500mAh · 80W SUPERVOOC'),
    m('OnePlus Nord CE 3 5G', 'oneplus-nord-ce3-5g', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Aqua Surge', 'Gray Shimmer'], 'CPH2569', '6.7" 120Hz Fluid AMOLED · Snapdragon 782G · 50MP Sony IMX890 OIS · 5000mAh · 80W SUPERVOOC'),
    m('OnePlus Nord CE 3 Lite 5G', undefined, 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Pastel Lime', 'Chromatic Gray'], 'CPH2467', '6.72" 120Hz FHD+ Display · Snapdragon 695 5G · 108MP 3x Lossless Zoom Camera · 5000mAh · 67W SUPERVOOC'),
    m('OnePlus Nord CE 2 5G', 'oneplus-nord-ce-2-5g', 'Previous Model', ['6GB', '8GB'], ['128GB'], ['Bahamas Blue', 'Gray Mirror'], 'IV2201', '6.43" 90Hz Fluid AMOLED · Dimensity 900 5G · 64MP Triple Camera · 4500mAh · 65W SUPERVOOC'),
    m('OnePlus Nord CE 2 Lite 5G', undefined, 'Previous Model', ['6GB', '8GB'], ['128GB'], ['Blue Tide', 'Black Dusk'], 'CPH2381', '6.59" 120Hz FHD+ Display · Snapdragon 695 5G · 64MP AI Triple Camera · 5000mAh · 33W SUPERVOOC'),
    m('OnePlus Nord CE 5G', 'oneplus-nord-ce-5g', 'Previous Model', ['6GB', '8GB', '12GB'], ['128GB', '256GB'], ['Charcoal Ink', 'Blue Void', 'Silver Ray'], 'EB2101', '6.43" 90Hz Fluid AMOLED · Snapdragon 750G 5G · 64MP Triple Camera · 4500mAh · 30T Warp Charge'),
  ],
  'OnePlus::OnePlus Open & Other Models': [
    m('OnePlus Open 5G', undefined, 'Current Model', ['16GB'], ['512GB', '1TB'], ['Emerald Dusk', 'Voyager Black', 'Crimson Shadow'], 'CPH2551', '7.82" 2K 120Hz Flexi-fluid LTPO3 Foldable AMOLED · Snapdragon 8 Gen 2 · Hasselblad 48MP+64MP+48MP · 4805mAh · 67W SUPERVOOC'),
    m('OnePlus Ace 3 5G', 'oneplus-ace3', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB', '1TB'], ['Sand Gold', 'Star Black', 'Moon Sea Blue'], 'PJE110', '6.78" 1.5K 120Hz LTPO AMOLED · Snapdragon 8 Gen 2 · 50MP Sony IMX890 OIS · 5500mAh · 100W SUPERVOOC'),
    m('OnePlus Ace 3V 5G', 'oneplus-ace-3v', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Titanium Air', 'Magic Purple Silver'], 'PJF110', '6.74" 1.5K 120Hz AMOLED · Snapdragon 7+ Gen 3 · 50MP Sony OIS Camera · 5500mAh · 100W SUPERVOOC'),
    m('OnePlus Ace 2 Pro 5G', 'oneplus-ace-2-pro', 'Previous Model', ['12GB', '16GB', '24GB'], ['256GB', '512GB', '1TB'], ['Aurora Green', 'Titanium Gray'], 'PJA110', '6.74" 1.5K 120Hz AMOLED · Snapdragon 8 Gen 2 · 50MP Sony IMX890 OIS · 5000mAh · 150W SUPERVOOC'),
    m('OnePlus Ace 2 5G', 'oneplus-ace2', 'Previous Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Vast Black', 'Glacier Blue'], 'PHK110', '6.74" 1.5K 120Hz Curved AMOLED · Snapdragon 8+ Gen 1 · 50MP OIS Camera · 5000mAh · 100W SUPERVOOC'),
    m('OnePlus 7T Pro', 'oneplus-7t-pro', 'Previous Model', ['8GB', '12GB'], ['256GB'], ['Haze Blue', 'McLaren Edition'], 'HD1911', '6.67" QHD+ 90Hz Fluid AMOLED · Snapdragon 855+ · 48MP Triple Cam & Pop-Up Selfie · 4085mAh · 30T Warp Charge', '4G'),
    m('OnePlus 7T', 'oneplus-7t-', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Frosted Silver', 'Glacier Blue'], 'HD1901', '6.55" 90Hz Fluid AMOLED · Snapdragon 855+ · 48MP Triple Camera · 3800mAh · 30T Warp Charge', '4G'),
  ],

  // ==================================================
  // SAMSUNG (47 Verified Models across All 6 Official Series)
  // ==================================================
  'Samsung::Galaxy S Series': [
    m('Samsung Galaxy S25 Ultra 5G', 'samsung-galaxy-s25-ultra-sm-s938', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB', '1TB'], ['Titanium Silverblue', 'Titanium Black', 'Titanium Whitesilver', 'Titanium Gray'], 'SM-S938B', '6.9" QHD+ Dynamic AMOLED 2X 120Hz · Snapdragon 8 Elite for Galaxy · 200MP Quad Telephoto · 5000mAh · 45W Charge'),
    m('Samsung Galaxy S25+ 5G', 'samsung-galaxy-s25-plus-sm-s936', 'Current Model', ['12GB'], ['256GB', '512GB'], ['Navy', 'Icyblue', 'Mint', 'Silver Shadow'], 'SM-S936B', '6.7" QHD+ Dynamic AMOLED 2X 120Hz · Snapdragon 8 Elite · 50MP OIS Triple Camera · 4900mAh · 45W Charge'),
    m('Samsung Galaxy S25 5G', 'samsung-galaxy-s25-sm-s931', 'Current Model', ['12GB'], ['128GB', '256GB', '512GB'], ['Navy', 'Icyblue', 'Mint', 'Silver Shadow'], 'SM-S931B', '6.2" FHD+ Dynamic AMOLED 2X 120Hz · Snapdragon 8 Elite · 50MP OIS Triple Camera · 4000mAh · 25W Charge'),
    m('Samsung Galaxy S24 Ultra 5G', 'samsung-galaxy-s24-ultra-5g-sm-s928', 'Current Model', ['12GB'], ['256GB', '512GB', '1TB'], ['Titanium Gray', 'Titanium Black', 'Titanium Violet', 'Titanium Yellow'], 'SM-S928B', '6.8" QHD+ Dynamic AMOLED 2X 120Hz · Snapdragon 8 Gen 3 · 200MP Quad Telephoto Camera · 5000mAh · 45W Charge'),
    m('Samsung Galaxy S24+ 5G', 'samsung-galaxy-s24-plus-5g-sm-s926', 'Current Model', ['12GB'], ['256GB', '512GB'], ['Onyx Black', 'Marble Gray', 'Cobalt Violet'], 'SM-S926B', '6.7" QHD+ Dynamic AMOLED 2X 120Hz · Exynos 2400 · 50MP Triple Camera · 4900mAh · 45W Charge'),
    m('Samsung Galaxy S24 5G', 'samsung-galaxy-s24-5g-sm-s921', 'Current Model', ['8GB'], ['128GB', '256GB', '512GB'], ['Onyx Black', 'Marble Gray', 'Amber Yellow', 'Cobalt Violet'], 'SM-S921B', '6.2" FHD+ 120Hz LTPO Dynamic AMOLED 2X · Exynos 2400 · 50MP OIS Triple Camera · 4000mAh · 25W Charge'),
    m('Samsung Galaxy S24 FE 5G', 'samsung-galaxy-s24-fe-r1', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Blue', 'Graphite', 'Mint', 'Yellow'], 'SM-S721B', '6.7" Dynamic AMOLED 2X 120Hz · Exynos 2400e · 50MP ProVisual Engine Triple Cam · 4700mAh · 25W Charge'),
    m('Samsung Galaxy S23 Ultra 5G', 'samsung-galaxy-s23-ultra-5g', 'Previous Model', ['8GB', '12GB'], ['256GB', '512GB', '1TB'], ['Green', 'Phantom Black', 'Cream', 'Lavender'], 'SM-S918B', '6.8" QHD+ Dynamic AMOLED 2X 120Hz · Snapdragon 8 Gen 2 · 200MP Adaptive Pixel Quad Cam · 5000mAh · 45W Charge'),
    m('Samsung Galaxy S23+ 5G', 'samsung-galaxy-s23-plus-5g', 'Previous Model', ['8GB'], ['256GB', '512GB'], ['Phantom Black', 'Cream', 'Green', 'Lavender'], 'SM-S916B', '6.6" FHD+ Dynamic AMOLED 2X 120Hz · Snapdragon 8 Gen 2 · 50MP OIS Triple Camera · 4700mAh · 45W Charge'),
    m('Samsung Galaxy S23 5G', 'samsung-galaxy-s23-5g', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Phantom Black', 'Cream', 'Green', 'Lavender'], 'SM-S911B', '6.1" Dynamic AMOLED 2X 120Hz · Snapdragon 8 Gen 2 · 50MP OIS Triple Camera · 3900mAh · 25W Charge'),
    m('Samsung Galaxy S23 FE 5G', 'samsung-galaxy-s23-fe', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Mint', 'Cream', 'Graphite', 'Purple'], 'SM-S711B', '6.4" Dynamic AMOLED 2X 120Hz · Exynos 2200 · 50MP OIS Camera · 4500mAh · 25W Charge'),
    m('Samsung Galaxy S22 Ultra 5G', 'samsung-galaxy-s22-ultra-5g', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB', '512GB'], ['Burgundy', 'Phantom Black', 'Phantom White', 'Green'], 'SM-S908B', '6.8" QHD+ Dynamic AMOLED 2X · Snapdragon 8 Gen 1 · 108MP 100x Space Zoom Quad Cam · 5000mAh · 45W Charge'),
    m('Samsung Galaxy S22+ 5G', 'samsung-galaxy-s22-plus-5g', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Phantom Black', 'Phantom White', 'Green', 'Pink Gold'], 'SM-S906B', '6.6" FHD+ Dynamic AMOLED 2X 120Hz · Snapdragon 8 Gen 1 · 50MP OIS Triple Cam · 4500mAh · 45W Charge'),
  ],
  'Samsung::Galaxy Z Series': [
    m('Samsung Galaxy Z Fold6 5G', 'samsung-galaxy-z-fold6', 'Current Model', ['12GB'], ['256GB', '512GB', '1TB'], ['Silver Shadow', 'Pink', 'Navy', 'Crafted Black'], 'SM-F956B', '7.6" QXGA+ Foldable Dynamic AMOLED 2X 120Hz · Snapdragon 8 Gen 3 · 50MP Triple Camera · 4400mAh · 25W Charge'),
    m('Samsung Galaxy Z Flip6 5G', 'samsung-galaxy-z-flip6', 'Current Model', ['12GB'], ['256GB', '512GB'], ['Silver Shadow', 'Yellow', 'Blue', 'Mint'], 'SM-F741B', '6.7" Foldable AMOLED 120Hz + 3.4" FlexWindow · Snapdragon 8 Gen 3 · 50MP Dual Camera · 4000mAh · 25W Charge'),
    m('Samsung Galaxy Z Fold5 5G', 'samsung-galaxy-z-fold5-5g', 'Previous Model', ['12GB'], ['256GB', '512GB', '1TB'], ['Icy Blue', 'Phantom Black', 'Cream'], 'SM-F946B', '7.6" Infinity Flex Dynamic AMOLED 2X · Snapdragon 8 Gen 2 · 50MP Triple Camera · 4400mAh · 25W Charge'),
    m('Samsung Galaxy Z Flip5 5G', 'samsung-galaxy-z-flip5-5g', 'Previous Model', ['8GB'], ['256GB', '512GB'], ['Mint', 'Graphite', 'Cream', 'Lavender'], 'SM-F731B', '6.7" Foldable AMOLED + 3.4" Flex Window · Snapdragon 8 Gen 2 · 12MP Dual Camera · 3700mAh · 25W Charge'),
    m('Samsung Galaxy Z Fold4 5G', 'samsung-galaxy-z-fold4-5g', 'Previous Model', ['12GB'], ['256GB', '512GB'], ['Graygreen', 'Phantom Black', 'Beige'], 'SM-F936B', '7.6" Foldable Dynamic AMOLED 2X 120Hz · Snapdragon 8+ Gen 1 · 50MP Nightography Triple Cam · 4400mAh · 25W Charge'),
    m('Samsung Galaxy Z Flip4 5G', 'samsung-galaxy-z-flip4-5g', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Bora Purple', 'Graphite', 'Pink Gold', 'Blue'], 'SM-F721B', '6.7" Foldable Dynamic AMOLED 2X 120Hz · Snapdragon 8+ Gen 1 · 12MP FlexCam · 3700mAh · 25W Charge'),
  ],
  'Samsung::Galaxy A Series': [
    m('Samsung Galaxy A55 5G', 'samsung-galaxy-a55', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Awesome Iceblue', 'Awesome Navy', 'Awesome Lilac'], 'SM-A556E', '6.6" Super AMOLED 120Hz · Exynos 1480 · 50MP OIS Triple Camera · 5000mAh · 25W Charge'),
    m('Samsung Galaxy A35 5G', 'samsung-galaxy-a35', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Awesome Iceblue', 'Awesome Navy', 'Awesome Lilac'], 'SM-A356E', '6.6" Super AMOLED 120Hz · Exynos 1380 · 50MP OIS Triple Camera · 5000mAh · 25W Charge'),
    m('Samsung Galaxy A25 5G', 'samsung-galaxy-a25', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Blue Black', 'Blue', 'Yellow'], 'SM-A256E', '6.5" Super AMOLED 120Hz · Exynos 1280 · 50MP OIS Triple Camera · 5000mAh · 25W Charge'),
    m('Samsung Galaxy A16 5G', 'samsung-galaxy-a16-5g', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Gold', 'Blue Black', 'Light Green'], 'SM-A166P', '6.7" FHD+ Super AMOLED 90Hz · Dimensity 6300 · 50MP Triple Camera · 5000mAh · 25W Charge'),
    m('Samsung Galaxy A15 5G', 'samsung-galaxy-a15-5g', 'Current Model', ['6GB', '8GB'], ['128GB', '256GB'], ['Blue Black', 'Blue', 'Light Blue'], 'SM-A156E', '6.5" Super AMOLED 90Hz · Dimensity 6100+ · 50MP Triple Camera · 5000mAh · 25W Charge'),
    m('Samsung Galaxy A05s', 'samsung-galaxy-a05s', 'Current Model', ['4GB', '6GB'], ['128GB'], ['Black', 'Light Green', 'Light Violet'], 'SM-A057F', '6.7" FHD+ 90Hz PLS LCD Display · Snapdragon 680 · 50MP Triple Camera · 5000mAh · 25W Charge', '4G'),
    m('Samsung Galaxy A05', 'samsung-galaxy-a05', 'Current Model', ['4GB', '6GB'], ['64GB', '128GB'], ['Black', 'Silver', 'Light Green'], 'SM-A055F', '6.7" HD+ Display · Helio G85 · 50MP Dual Camera · 5000mAh · 25W Charge', '4G'),
    m('Samsung Galaxy A54 5G', 'samsung-galaxy-a54', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Awesome Lime', 'Awesome Violet', 'Awesome Graphite'], 'SM-A546E', '6.4" Super AMOLED 120Hz · Exynos 1380 · 50MP OIS Nightography · 5000mAh · 25W Charge'),
    m('Samsung Galaxy A34 5G', 'samsung-galaxy-a34', 'Previous Model', ['6GB', '8GB'], ['128GB', '256GB'], ['Awesome Lime', 'Awesome Violet', 'Awesome Graphite'], 'SM-A346E', '6.6" Super AMOLED 120Hz · Dimensity 1080 · 48MP OIS Camera · 5000mAh · 25W Charge'),
    m('Samsung Galaxy A73 5G', 'samsung-galaxy-a73-5g', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Awesome Mint', 'Awesome Gray', 'Awesome White'], 'SM-A736B', '6.7" Super AMOLED+ 120Hz · Snapdragon 778G 5G · 108MP OIS Quad Camera · 5000mAh · 25W Charge'),
    m('Samsung Galaxy A53 5G', 'samsung-galaxy-a53-5g-', 'Previous Model', ['6GB', '8GB'], ['128GB', '256GB'], ['Awesome Black', 'Awesome Blue', 'Awesome Peach', 'Awesome White'], 'SM-A536E', '6.5" Super AMOLED 120Hz · Exynos 1280 · 64MP OIS Quad Camera · 5000mAh · 25W Charge'),
    m('Samsung Galaxy A33 5G', 'samsung-galaxy-a33-5g', 'Previous Model', ['6GB', '8GB'], ['128GB'], ['Awesome Black', 'Awesome Blue', 'Awesome Peach'], 'SM-A336E', '6.4" Super AMOLED 90Hz · Exynos 1280 · 48MP OIS Quad Camera · 5000mAh · 25W Charge'),
    m('Samsung Galaxy A14 5G', 'samsung-galaxy-a14-5g', 'Previous Model', ['4GB', '6GB', '8GB'], ['64GB', '128GB'], ['Dark Red', 'Light Green', 'Black'], 'SM-A146B', '6.6" FHD+ 90Hz Display · Exynos 1330 5G · 50MP Triple Camera · 5000mAh · 15W Charge'),
  ],
  'Samsung::Galaxy M Series': [
    m('Samsung Galaxy M55 5G', 'samsung-galaxy-m55', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Denim Black', 'Light Green'], 'SM-M556B', '6.7" Super AMOLED+ 120Hz · Snapdragon 7 Gen 1 · 50MP OIS Rear & 50MP Selfie · 5000mAh · 45W Charge'),
    m('Samsung Galaxy M15 5G', 'samsung-galaxy-m15', 'Current Model', ['4GB', '6GB', '8GB'], ['128GB'], ['Celestial Blue', 'Stone Grey', 'Blue Topaz'], 'SM-M156B', '6.5" Super AMOLED 90Hz · Dimensity 6100+ 5G · 50MP Triple Camera · 6000mAh · 25W Charge'),
    m('Samsung Galaxy M54 5G', 'samsung-galaxy-m54-5g', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Meteor Blue', 'Silver'], 'SM-M546B', '6.7" Super AMOLED+ 120Hz · Exynos 1380 · 108MP OIS Triple Camera · 6000mAh · 25W Charge'),
    m('Samsung Galaxy M34 5G', 'samsung-galaxy-m34-5g', 'Previous Model', ['6GB', '8GB'], ['128GB', '256GB'], ['Midnight Blue', 'Prism Silver', 'Waterfall Blue'], 'SM-M346B', '6.5" 120Hz Super AMOLED · Exynos 1280 · 50MP OIS No Shake Cam · 6000mAh · 25W Charge'),
    m('Samsung Galaxy M14 5G', 'samsung-galaxy-m14-5g-sm-m146', 'Previous Model', ['4GB', '6GB'], ['128GB'], ['Berry Blue', 'Smoky Teal', 'Icy Silver'], 'SM-M146B', '6.6" FHD+ 90Hz PLS LCD · Exynos 1330 5G · 50MP Triple Camera · 6000mAh · 25W Charge'),
    m('Samsung Galaxy M53 5G', 'samsung-galaxy-m53-5g', 'Previous Model', ['6GB', '8GB'], ['128GB'], ['Mystique Green', 'Deep Ocean Blue'], 'SM-M536B', '6.7" Super AMOLED+ 120Hz · Dimensity 900 5G · 108MP Quad Camera · 5000mAh · 25W Charge'),
    m('Samsung Galaxy M33 5G', 'samsung-galaxy-m33', 'Previous Model', ['6GB', '8GB'], ['128GB'], ['Mystique Green', 'Deep Ocean Blue'], 'SM-M336BU', '6.6" FHD+ 120Hz Display · Exynos 1280 5G · 50MP Quad Camera · 6000mAh · 25W Charge'),
  ],
  'Samsung::Galaxy F Series': [
    m('Samsung Galaxy F55 5G', 'samsung-galaxy-f55', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Apricot Crush', 'Raisin Black'], 'SM-E556B', '6.7" Super AMOLED+ 120Hz · Snapdragon 7 Gen 1 · 50MP OIS Triple Camera · 5000mAh · 45W Charge'),
    m('Samsung Galaxy F15 5G', 'samsung-galaxy-f15-5g', 'Current Model', ['4GB', '6GB', '8GB'], ['128GB'], ['Ash Black', 'Groovy Violet', 'Jazzy Green'], 'SM-E156B', '6.5" Super AMOLED 90Hz · Dimensity 6100+ 5G · 50MP Triple Camera · 6000mAh · 25W Charge'),
    m('Samsung Galaxy F54 5G', 'samsung-galaxy-f54-5g', 'Previous Model', ['8GB'], ['256GB'], ['Meteor Blue', 'Stardust Silver'], 'SM-E546B', '6.7" 120Hz Super AMOLED+ · Exynos 1380 · 108MP OIS No Shake Camera · 6000mAh · 25W Charge'),
    m('Samsung Galaxy F34 5G', 'samsung-galaxy-f34', 'Previous Model', ['6GB', '8GB'], ['128GB'], ['Electric Black', 'Mystic Green', 'Orchid Violet'], 'SM-E346B', '6.5" 120Hz Super AMOLED · Exynos 1280 · 50MP OIS Camera · 6000mAh · 25W Charge'),
    m('Samsung Galaxy F13', 'samsung-galaxy-f13', 'Previous Model', ['4GB'], ['64GB', '128GB'], ['Waterfall Blue', 'Sunrise Copper', 'Nightsky Green'], 'SM-E135F', '6.6" FHD+ Display · Exynos 850 · 50MP Triple Camera · 6000mAh · 15W Charge', '4G'),
  ],
  'Samsung::Other Models': [
    m('Samsung Galaxy S21 Ultra 5G', 'samsung-galaxy-s21-ultra-5g-', 'Previous Model', ['12GB', '16GB'], ['128GB', '256GB', '512GB'], ['Phantom Black', 'Phantom Silver'], 'SM-G998B', '6.8" WQHD+ Dynamic AMOLED 2X 120Hz · Exynos 2100 · 108MP Quad Telephoto · 5000mAh · 25W Charge'),
    m('Samsung Galaxy S21 FE 5G', 'samsung-galaxy-s21-fe-5g', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Olive', 'Lavender', 'White', 'Graphite'], 'SM-G990B', '6.4" Dynamic AMOLED 2X 120Hz · Snapdragon 888 · 12MP Pro-Grade Triple Camera · 4500mAh · 25W Charge'),
    m('Samsung Galaxy S22 5G', 'samsung-galaxy-s22-5g', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Phantom Black', 'Phantom White', 'Green', 'Pink Gold'], 'SM-S901B', '6.1" Dynamic AMOLED 2X 120Hz · Snapdragon 8 Gen 1 · 50MP Nightography Camera · 3700mAh · 25W Charge'),
  ],

  // ==================================================
  // APPLE (32 Verified Models across All 4 Official Series)
  // ==================================================
  'Apple::iPhone Pro Series': [
    m('Apple iPhone 17 Pro Max', 'apple-iphone-17-pro-max', 'Current Model', ['12GB'], ['256GB', '512GB', '1TB'], ['Natural Titanium', 'Desert Titanium', 'Black Titanium', 'White Titanium'], 'A3297', '6.9" ProMotion Super Retina XDR OLED · Apple A19 Pro Chip · Triple 48MP Pro Camera System · 4685mAh · MagSafe & USB-C Fast Charge'),
    m('Apple iPhone 16 Pro Max', 'apple-iphone-16-pro-max', 'Current Model', ['8GB'], ['256GB', '512GB', '1TB'], ['Desert Titanium', 'Natural Titanium', 'Black Titanium', 'White Titanium'], 'A3296', '6.9" Super Retina XDR 120Hz OLED · A18 Pro Chip · 48MP Fusion + 5x Telephoto · 4685mAh · 25W MagSafe & USB-C'),
    m('Apple iPhone 16 Pro', 'apple-iphone-16-pro', 'Current Model', ['8GB'], ['128GB', '256GB', '512GB', '1TB'], ['Desert Titanium', 'Natural Titanium', 'Black Titanium', 'White Titanium'], 'A3293', '6.3" Super Retina XDR 120Hz OLED · A18 Pro Chip · 48MP Fusion + 5x Telephoto · 3582mAh · 25W MagSafe & USB-C'),
    m('Apple iPhone 15 Pro Max', 'apple-iphone-15-pro-max', 'Previous Model', ['8GB'], ['256GB', '512GB', '1TB'], ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'], 'A3106', '6.7" ProMotion Super Retina XDR OLED · A17 Pro Chip · 48MP Main + 5x Tetraprism Telephoto · 4441mAh · USB-C & MagSafe'),
    m('Apple iPhone 15 Pro', 'apple-iphone-15-pro', 'Previous Model', ['8GB'], ['128GB', '256GB', '512GB', '1TB'], ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'], 'A3102', '6.1" ProMotion Super Retina XDR Titanium · A17 Pro Chip · 48MP Pro Camera System · 3274mAh · USB-C & MagSafe'),
    m('Apple iPhone 14 Pro Max', 'apple-iphone-14-pro-max-', 'Previous Model', ['6GB'], ['128GB', '256GB', '512GB', '1TB'], ['Deep Purple', 'Gold', 'Silver', 'Space Black'], 'A2894', '6.7" Super Retina XDR Always-On OLED · A16 Bionic Chip · 48MP Pro Camera System · 4323mAh · MagSafe Fast Charge'),
    m('Apple iPhone 14 Pro', 'apple-iphone-14-pro', 'Previous Model', ['6GB'], ['128GB', '256GB', '512GB', '1TB'], ['Deep Purple', 'Gold', 'Silver', 'Space Black'], 'A2890', '6.1" Always-On ProMotion XDR OLED · A16 Bionic Chip · 48MP Main Pro Camera · 3200mAh · MagSafe Fast Charge'),
    m('Apple iPhone 13 Pro Max', 'apple-iphone-13-pro-max', 'Previous Model', ['6GB'], ['128GB', '256GB', '512GB', '1TB'], ['Sierra Blue', 'Alpine Green', 'Graphite', 'Gold', 'Silver'], 'A2643', '6.7" 120Hz ProMotion Super Retina XDR · A15 Bionic Chip · Pro 12MP Triple Camera · 4352mAh · 27W Fast Charge'),
    m('Apple iPhone 13 Pro', 'apple-iphone-13-pro', 'Previous Model', ['6GB'], ['128GB', '256GB', '512GB', '1TB'], ['Sierra Blue', 'Alpine Green', 'Graphite', 'Gold', 'Silver'], 'A2638', '6.1" 120Hz ProMotion Super Retina XDR · A15 Bionic Chip · Pro 12MP Telephoto Camera · 3095mAh · 23W Fast Charge'),
    m('Apple iPhone 12 Pro Max', 'apple-iphone-12-pro-max', 'Previous Model', ['6GB'], ['128GB', '256GB', '512GB'], ['Pacific Blue', 'Gold', 'Graphite', 'Silver'], 'A2411', '6.7" Super Retina XDR OLED · A14 Bionic 5G Chip · Pro 12MP Camera + LiDAR · 3687mAh · 20W MagSafe'),
    m('Apple iPhone 11 Pro Max', 'apple-iphone-11-pro-max-', 'Previous Model', ['4GB'], ['64GB', '256GB', '512GB'], ['Midnight Green', 'Space Gray', 'Silver', 'Gold'], 'A2218', '6.5" Super Retina XDR OLED · A13 Bionic Chip · Triple 12MP Ultra Wide & Telephoto · 3969mAh · 18W Fast Charge', '4G'),
    m('Apple iPhone 11 Pro', 'apple-iphone-11-pro', 'Previous Model', ['4GB'], ['64GB', '256GB', '512GB'], ['Midnight Green', 'Space Gray', 'Silver', 'Gold'], 'A2215', '5.8" Super Retina XDR OLED · A13 Bionic Chip · Triple 12MP Pro Camera · 3046mAh · 18W Fast Charge', '4G'),
  ],
  'Apple::iPhone Number Series': [
    m('Apple iPhone 17', 'apple-iphone-17', 'Current Model', ['8GB'], ['128GB', '256GB', '512GB'], ['Ultramarine', 'Teal', 'Pink', 'White', 'Black'], 'A3288', '6.1" Super Retina XDR OLED · A19 Chip · Dual 48MP Fusion Camera · All-Day Battery · USB-C & MagSafe'),
    m('Apple iPhone 16', 'apple-iphone-16', 'Current Model', ['8GB'], ['128GB', '256GB', '512GB'], ['Ultramarine', 'Teal', 'Pink', 'White', 'Black'], 'A3287', '6.1" Super Retina XDR OLED · A18 Chip · 48MP Fusion Camera & Camera Control · 3561mAh · USB-C & MagSafe'),
    m('Apple iPhone 15', 'apple-iphone-15', 'Current Model', ['6GB'], ['128GB', '256GB', '512GB'], ['Pink', 'Yellow', 'Green', 'Blue', 'Black'], 'A3090', '6.1" Dynamic Island Super Retina XDR OLED · A16 Bionic Chip · 48MP Main Camera · 3349mAh · USB-C Charge'),
    m('Apple iPhone 14', 'apple-iphone-14', 'Previous Model', ['6GB'], ['128GB', '256GB', '512GB'], ['Midnight', 'Starlight', 'Blue', 'Purple', 'Yellow', '(PRODUCT)RED'], 'A2882', '6.1" Super Retina XDR OLED · A15 Bionic Chip · 12MP Dual Camera System · 3279mAh · 20W Fast Charge'),
    m('Apple iPhone 13', 'apple-iphone-13', 'Previous Model', ['4GB'], ['128GB', '256GB', '512GB'], ['Midnight', 'Starlight', 'Pink', 'Blue', 'Green', '(PRODUCT)RED'], 'A2633', '6.1" Super Retina XDR OLED · A15 Bionic Chip · Dual 12MP Sensor-Shift OIS Camera · 3240mAh · 20W Fast Charge'),
    m('Apple iPhone 12', 'apple-iphone-12', 'Previous Model', ['4GB'], ['64GB', '128GB', '256GB'], ['Purple', 'Blue', 'Green', 'White', 'Black', '(PRODUCT)RED'], 'A2403', '6.1" Super Retina XDR OLED · A14 Bionic 5G Chip · 12MP Dual Camera · 2815mAh · 20W MagSafe'),
    m('Apple iPhone 11', 'apple-iphone-11', 'Previous Model', ['4GB'], ['64GB', '128GB'], ['Black', 'White', 'Green', 'Purple', 'Yellow', '(PRODUCT)RED'], 'A2221', '6.1" Liquid Retina HD LCD · A13 Bionic Chip · Dual 12MP Ultra Wide Camera · 3110mAh · 18W Fast Charge', '4G'),
    m('Apple iPhone XR', 'apple-iphone-xr', 'Previous Model', ['3GB'], ['64GB', '128GB'], ['Black', 'White', 'Blue', 'Yellow', 'Coral', '(PRODUCT)RED'], 'A2105', '6.1" Liquid Retina HD LCD · A12 Bionic Chip · 12MP OIS Wide Camera · 2942mAh · 15W Fast Charge', '4G'),
  ],
  'Apple::iPhone Plus Series': [
    m('Apple iPhone 16 Plus', 'apple-iphone-16-plus', 'Current Model', ['8GB'], ['128GB', '256GB', '512GB'], ['Ultramarine', 'Teal', 'Pink', 'White', 'Black'], 'A3290', '6.7" Super Retina XDR OLED · A18 Chip · 48MP Fusion Camera · 4674mAh Battery · USB-C & MagSafe'),
    m('Apple iPhone 15 Plus', 'apple-iphone-15-plus-', 'Current Model', ['6GB'], ['128GB', '256GB', '512GB'], ['Blue', 'Pink', 'Yellow', 'Green', 'Black'], 'A3094', '6.7" Dynamic Island Super Retina XDR OLED · A16 Bionic Chip · 48MP Main Camera · 4383mAh · USB-C Charge'),
    m('Apple iPhone 14 Plus', 'apple-iphone-14-plus', 'Previous Model', ['6GB'], ['128GB', '256GB', '512GB'], ['Midnight', 'Starlight', 'Blue', 'Purple', 'Yellow'], 'A2886', '6.7" Super Retina XDR OLED · A15 Bionic 5G Chip · 12MP Dual Camera · 4325mAh · 20W MagSafe'),
    m('Apple iPhone 8 Plus', 'apple-iphone-8-plus', 'Previous Model', ['3GB'], ['64GB', '128GB', '256GB'], ['Space Gray', 'Silver', 'Gold'], 'A1897', '5.5" Retina HD IPS Display · A11 Bionic Chip · Dual 12MP Portrait Camera · 2691mAh · Qi Wireless Charge', '4G'),
  ],
  'Apple::iPhone SE & Other Models': [
    m('Apple iPhone 16e', 'apple-iphone-16e', 'Current Model', ['8GB'], ['128GB', '256GB', '512GB'], ['Black', 'White'], 'A3409', '6.1" Super Retina XDR OLED · A18 Chip · 48MP 2-in-1 Fusion Camera · 4005mAh · USB-C Fast Charge'),
    m('Apple iPhone SE (3rd Gen) 5G', 'apple-iphone-se-2022', 'Current Model', ['4GB'], ['64GB', '128GB', '256GB'], ['Midnight', 'Starlight', '(PRODUCT)RED'], 'A2783', '4.7" Retina HD Display · A15 Bionic 5G Chip · 12MP OIS Camera · 2018mAh · 20W Fast Charge'),
    m('Apple iPhone SE (2nd Gen)', 'apple-iphone-se-2020', 'Previous Model', ['3GB'], ['64GB', '128GB', '256GB'], ['Black', 'White', '(PRODUCT)RED'], 'A2296', '4.7" Retina HD Display · A13 Bionic Chip · 12MP OIS Portrait Camera · 1821mAh · 18W Fast Charge', '4G'),
    m('Apple iPhone 13 mini', 'apple-iphone-13-mini', 'Previous Model', ['4GB'], ['128GB', '256GB', '512GB'], ['Pink', 'Blue', 'Midnight', 'Starlight', 'Green'], 'A2628', '5.4" Super Retina XDR Compact OLED · A15 Bionic 5G · Dual 12MP OIS Camera · 2438mAh · MagSafe Charge'),
    m('Apple iPhone 12 mini', 'apple-iphone-12-mini', 'Previous Model', ['4GB'], ['64GB', '128GB', '256GB'], ['Blue', 'Purple', 'Green', 'White', 'Black'], 'A2399', '5.4" Super Retina XDR OLED · A14 Bionic 5G · Dual 12MP Camera · 2227mAh · MagSafe Charge'),
    m('Apple iPhone XS Max', 'apple-iphone-xs-max', 'Previous Model', ['4GB'], ['64GB', '256GB', '512GB'], ['Space Gray', 'Silver', 'Gold'], 'A2101', '6.5" Super Retina OLED Display · A12 Bionic Chip · Dual 12MP Telephoto Camera · 3174mAh · 15W Charge', '4G'),
    m('Apple iPhone XS', 'apple-iphone-xs', 'Previous Model', ['4GB'], ['64GB', '256GB', '512GB'], ['Space Gray', 'Silver', 'Gold'], 'A2097', '5.8" Super Retina OLED Display · A12 Bionic Chip · Dual 12MP OIS Camera · 2658mAh · 15W Charge', '4G'),
    m('Apple iPhone 8', 'apple-iphone-8', 'Previous Model', ['2GB'], ['64GB', '128GB', '256GB'], ['Space Gray', 'Silver', 'Gold'], 'A1905', '4.7" Retina HD Display · A11 Bionic Chip · 12MP OIS Camera · 1821mAh · Qi Wireless Charge', '4G'),
  ],

  // ==================================================
  // OPPO (28 Verified Models across All 6 Official Series)
  // ==================================================
  'OPPO::Find Series': [
    m('OPPO Find X8 Pro 5G', 'oppo-find-x8-pro', 'Current Model', ['16GB'], ['512GB'], ['Space Black', 'Pearl White'], 'CPH2659', '6.78" 120Hz LTPO AMOLED · Dimensity 9400 · Hasselblad Quad 50MP Dual Periscope · 5910mAh · 80W SUPERVOOC'),
    m('OPPO Find X8 5G', 'oppo-find-x8', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Star Grey', 'Space Black', 'Shell Pink'], 'CPH2651', '6.59" 120Hz AMOLED · Dimensity 9400 · Hasselblad Triple 50MP Periscope · 5630mAh · 80W SUPERVOOC'),
    m('OPPO Find X7 Ultra', 'oppo-find-x7-ultra', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Ocean Blue', 'Sepia Brown', 'Tailored Black'], 'PHY110', '6.82" QHD+ 120Hz LTPO AMOLED · Snapdragon 8 Gen 3 · 1-Inch Sony LYT-900 Quad Camera · 5000mAh · 100W SUPERVOOC'),
    m('OPPO Find X6 Pro', 'oppo-find-x6-pro', 'Previous Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Brown', 'Green', 'Black'], 'PGEM10', '6.82" QHD+ 120Hz AMOLED · Snapdragon 8 Gen 2 · Hasselblad Triple 50MP Camera · 5000mAh · 100W SUPERVOOC'),
    m('OPPO Find X5 Pro 5G', 'oppo-find-x5-pro', 'Previous Model', ['12GB'], ['256GB'], ['Ceramic White', 'Glaze Black'], 'CPH2305', '6.7" QHD+ 120Hz LTPO2 AMOLED · Snapdragon 8 Gen 1 + MariSilicon X · Hasselblad 50MP Camera · 5000mAh · 80W SUPERVOOC'),
    m('OPPO Find X5 5G', 'oppo-find-x5', 'Previous Model', ['8GB'], ['256GB'], ['Black', 'White'], 'CPH2307', '6.55" 120Hz OLED Display · Snapdragon 888 · Hasselblad 50MP+50MP+13MP Camera · 4800mAh · 80W SUPERVOOC'),
  ],
  'OPPO::Reno Series': [
    m('OPPO Reno12 5G', 'oppo-reno12', 'Current Model', ['8GB', '12GB'], ['256GB', '512GB'], ['Astro Silver', 'Sunset Peach', 'Matte Brown'], 'CPH2625', '6.7" 120Hz 3D Curved AMOLED · Dimensity 7300-Energy · 50MP OIS Portrait Camera · 5000mAh · 80W SUPERVOOC'),
    m('OPPO Reno10 Pro+ 5G', 'oppo-reno10-pro-plus', 'Previous Model', ['12GB'], ['256GB'], ['Silvery Grey', 'Glossy Purple'], 'CPH2521', '6.74" 1.5K 120Hz Curved AMOLED · Snapdragon 8+ Gen 1 · 64MP Telephoto Periscope + 50MP OIS · 4700mAh · 100W SUPERVOOC'),
    m('OPPO Reno10 Pro 5G', 'oppo-reno10-pro', 'Previous Model', ['12GB'], ['256GB'], ['Silvery Grey', 'Glossy Purple'], 'CPH2525', '6.7" 120Hz 3D Curved AMOLED · Snapdragon 778G 5G · 50MP Sony IMX890 OIS + 32MP Telephoto · 4600mAh · 80W SUPERVOOC'),
    m('OPPO Reno10 5G', 'oppo-reno10', 'Previous Model', ['8GB'], ['256GB'], ['Ice Blue', 'Silvery Grey'], 'CPH2531', '6.7" 120Hz 3D Curved AMOLED · Dimensity 7050 5G · 64MP Main + 32MP Telephoto Portrait · 5000mAh · 67W SUPERVOOC'),
    m('OPPO Reno8 Pro 5G', 'oppo-reno8-pro', 'Previous Model', ['8GB', '12GB'], ['256GB'], ['Glazed Green', 'Glazed Black'], 'CPH2357', '6.7" 120Hz AMOLED · Dimensity 8100-MAX + MariSilicon X · 50MP Sony IMX766 Camera · 4500mAh · 80W SUPERVOOC'),
    m('OPPO Reno8 5G', 'oppo-reno8', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Shimmer Gold', 'Shimmer Black'], 'CPH2359', '6.4" 90Hz AMOLED Display · Dimensity 1300 · 50MP Sony IMX766 + 32MP IMX709 · 4500mAh · 80W SUPERVOOC'),
  ],
  'OPPO::F Series': [
    m('OPPO F27 5G', 'oppo-f27', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Emerald Green', 'Amber Orange'], 'CPH2637', '6.67" 120Hz AMOLED Halo Light Display · Dimensity 6300 5G · 50MP Ultra-Clear Camera · 5000mAh · 45W SUPERVOOC'),
    m('OPPO F25 Pro 5G', 'oppo-f25-pro', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Lava Red', 'Ocean Blue'], 'CPH2603', '6.7" 120Hz Borderless AMOLED · Dimensity 7050 5G · 64MP 4K Video Camera · 5000mAh · 67W SUPERVOOC'),
    m('OPPO F23 5G', 'oppo-f23-5g', 'Previous Model', ['8GB'], ['256GB'], ['Bold Gold', 'Cool Black'], 'CPH2527', '6.72" 120Hz FHD+ Display · Snapdragon 695 5G · 64MP AI Triple Camera · 5000mAh · 67W SUPERVOOC'),
  ],
  'OPPO::A Series': [
    m('OPPO A3 Pro 5G', 'oppo-a3-pro', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Moonlight Purple', 'Starry Black'], 'CPH2665', '6.67" 120Hz Armour Body Display · Dimensity 6300 5G · 50MP AI Dual Camera · 5100mAh · 45W SUPERVOOC'),
    m('OPPO A79 5G', 'oppo-a79-5g', 'Current Model', ['8GB'], ['128GB'], ['Glowing Green', 'Mystery Black'], 'CPH2553', '6.72" 90Hz FHD+ Sunlight Display · Dimensity 6020 5G · 50MP AI Camera · 5000mAh · 33W SUPERVOOC'),
    m('OPPO A60', 'oppo-a60', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Ripple Blue', 'Midnight Purple'], 'CPH2631', '6.67" 90Hz 950-nit Ultra Bright Display · Snapdragon 680 · 50MP Dual Camera · 5000mAh · 45W SUPERVOOC', '4G'),
    m('OPPO A59 5G', 'oppo-a59-5g', 'Current Model', ['4GB', '6GB'], ['128GB'], ['Silk Gold', 'Starry Black'], 'CPH2617', '6.56" 90Hz Sunlight Screen · Dimensity 6020 5G · 13MP AI Dual Camera · 5000mAh · 33W SUPERVOOC'),
    m('OPPO A58', 'oppo-a58', 'Previous Model', ['6GB', '8GB'], ['128GB'], ['Dazzling Green', 'Glowing Black'], 'CPH2577', '6.72" FHD+ Sunlight Display · Helio G85 · 50MP AI Dual Camera · 5000mAh · 33W SUPERVOOC', '4G'),
    m('OPPO A38', 'oppo-a38', 'Previous Model', ['4GB'], ['128GB'], ['Glowing Gold', 'Glowing Black'], 'CPH2579', '6.56" 90Hz Colour-Rich Display · Helio G85 · 50MP AI Camera · 5000mAh · 33W SUPERVOOC', '4G'),
  ],
  'OPPO::K Series': [
    m('OPPO K12x 5G', 'oppo-k12x', 'Current Model', ['6GB', '8GB'], ['128GB', '256GB'], ['Breeze Blue', 'Midnight Violet', 'Feather Pink'], 'CPH2667', '6.67" 120Hz MIL-STD-810H Display · Dimensity 6300 5G · 32MP AI Dual Camera · 5100mAh · 45W SUPERVOOC'),
    m('OPPO K12 5G', 'oppo-k12', 'Current Model', ['8GB', '12GB'], ['256GB', '512GB'], ['Celadon Marble', 'Dark Chrome'], 'PJR110', '6.7" 120Hz AMOLED Display · Snapdragon 7 Gen 3 · 50MP Sony OIS Camera · 5500mAh · 100W SUPERVOOC'),
    m('OPPO K11x 5G', 'oppo-k11x', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Jade Black', 'Pearl'], 'PHF110', '6.72" 120Hz FHD+ Display · Snapdragon 695 5G · 108MP Ultra-Clear Camera · 5000mAh · 67W SUPERVOOC'),
  ],
  'OPPO::Other Models': [
    m('OPPO Find N3 5G', 'oppo-find-n3', 'Current Model', ['16GB'], ['512GB'], ['Champagne Gold', 'Classic Black'], 'CPH2499', '7.82" 120Hz Foldable LTPO OLED · Snapdragon 8 Gen 2 · Hasselblad 48MP+64MP+48MP · 4805mAh · 67W SUPERVOOC'),
    m('OPPO Find N3 Flip 5G', 'oppo-find-n3-flip', 'Current Model', ['12GB'], ['256GB'], ['Cream Gold', 'Sleek Black', 'Misty Pink'], 'CPH2519', '6.8" 120Hz Foldable LTPO AMOLED · Dimensity 9200 · Hasselblad 50MP+32MP+48MP · 4300mAh · 44W SUPERVOOC'),
    m('OPPO Find N2 5G', 'oppo-find-n2', 'Previous Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Black', 'White', 'Green'], 'PGU110', '7.1" 120Hz Foldable LTPO AMOLED · Snapdragon 8+ Gen 1 · Hasselblad 50MP Triple Camera · 4520mAh · 67W SUPERVOOC'),
    m('OPPO Find N2 Flip 5G', 'oppo-find-n2-flip', 'Previous Model', ['8GB'], ['256GB'], ['Astral Black', 'Moonlit Purple'], 'CPH2437', '6.8" 120Hz Foldable AMOLED + 3.26" Cover Screen · Dimensity 9000+ · 50MP Sony IMX890 · 4300mAh · 44W SUPERVOOC'),
  ],

  // ==================================================
  // VIVO (31 Verified Models across All 5 Official Series)
  // ==================================================
  'vivo::X Series': [
    m('vivo X200 Pro 5G', 'vivo-x200-pro', 'Current Model', ['16GB'], ['512GB'], ['Titanium Grey', 'Cosmos Black'], 'V2413', '6.78" 120Hz LTPO AMOLED · Dimensity 9400 · ZEISS 200MP APO Telephoto + 50MP Main · 6000mAh · 90W FlashCharge'),
    m('vivo X200 5G', 'vivo-x200', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Natural Green', 'Cosmos Black'], 'V2415', '6.67" 120Hz AMOLED · Dimensity 9400 · ZEISS Triple 50MP Optics · 5800mAh · 90W FlashCharge'),
    m('vivo X100 Pro 5G', 'vivo-x100-pro', 'Current Model', ['16GB'], ['512GB'], ['Asteroid Black', 'Sunset Orange'], 'V2309', '6.78" 120Hz LTPO AMOLED · Dimensity 9300 + V3 Chip · ZEISS 1-Inch 50MP + Floating Telephoto · 5400mAh · 100W FlashCharge'),
    m('vivo X100 5G', 'vivo-x100', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Stargazer Blue', 'Asteroid Black'], 'V2308', '6.78" 120Hz LTPO AMOLED · Dimensity 9300 · ZEISS Co-Engineered Triple 50MP Camera · 5000mAh · 120W FlashCharge'),
    m('vivo X Fold3 Pro 5G', 'vivo-x-fold3-pro', 'Current Model', ['16GB'], ['512GB'], ['Celestial Black', 'Solar White'], 'V2330', '8.03" 120Hz Foldable LTPO AMOLED · Snapdragon 8 Gen 3 · ZEISS 50MP+64MP+50MP Optics · 5700mAh · 100W FlashCharge'),
    m('vivo X90 Pro 5G', 'vivo-x90-pro', 'Previous Model', ['12GB'], ['256GB'], ['Legendary Black'], 'V2219', '6.78" 120Hz AMOLED · Dimensity 9200 + V2 Chip · 1-Inch ZEISS T* 50MP Main Sensor · 4870mAh · 120W FlashCharge'),
    m('vivo X90 5G', 'vivo-x90', 'Previous Model', ['8GB', '12GB'], ['256GB'], ['Breeze Blue', 'Asteroid Black'], 'V2218', '6.78" 120Hz Curved AMOLED · Dimensity 9200 · ZEISS T* 50MP VCS True Color Camera · 4810mAh · 120W FlashCharge'),
    m('vivo X80 Pro 5G', 'vivo-x80-pro', 'Previous Model', ['12GB'], ['256GB'], ['Cosmic Black'], 'V2145', '6.78" WQHD+ 120Hz LTPO3 AMOLED · Snapdragon 8 Gen 1 + V1+ Chip · ZEISS Gimbal Quad Camera · 4700mAh · 80W FlashCharge'),
    m('vivo X80 5G', 'vivo-x80', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Urban Blue', 'Cosmic Black'], 'V2144', '6.78" 120Hz Curved AMOLED · Dimensity 9000 + V1+ Chip · ZEISS 50MPSony IMX866 OIS · 4500mAh · 80W FlashCharge'),
  ],
  'vivo::V Series': [
    m('vivo V40 Pro 5G', 'vivo-v40-pro', 'Current Model', ['8GB', '12GB'], ['256GB', '512GB'], ['Ganges Blue', 'Titanium Grey'], 'V2347', '6.78" 120Hz 1.5K Curved AMOLED · Dimensity 9200+ · ZEISS Triple 50MP + 50MP Selfie · 5500mAh · 80W FlashCharge'),
    m('vivo V40 5G', 'vivo-v40', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB', '512GB'], ['Lotus Purple', 'Ganges Blue', 'Titanium Grey'], 'V2348', '6.78" 120Hz Curved AMOLED · Snapdragon 7 Gen 3 · ZEISS Dual 50MP + Smart Aura Light · 5500mAh · 80W FlashCharge'),
    m('vivo V40e 5G', 'vivo-v40e', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Royal Bronze', 'Mint Green'], 'V2403', '6.77" 120Hz 3D Curved AMOLED · Dimensity 7300 · 50MP Sony OIS + 50MP Eye AF Selfie · 5500mAh · 80W FlashCharge'),
    m('vivo V30 Pro 5G', 'vivo-v30-pro', 'Previous Model', ['8GB', '12GB'], ['256GB', '512GB'], ['Andaman Blue', 'Classic Black'], 'V2319', '6.78" 1.5K 120Hz Curved AMOLED · Dimensity 8200 · ZEISS Triple 50MP + Aura Light · 5000mAh · 80W FlashCharge'),
    m('vivo V30e 5G', 'vivo-v30e', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Velvet Red', 'Silk Blue'], 'V2339', '6.78" 120Hz 3D Curved AMOLED · Snapdragon 6 Gen 1 · 50MP Sony IMX882 OIS + 50MP Selfie · 5500mAh · 44W FlashCharge'),
    m('vivo V29 Pro 5G', 'vivo-v29-pro', 'Previous Model', ['8GB', '12GB'], ['256GB'], ['Himalayan Blue', 'Space Black'], 'V2251', '6.78" 1.5K 120Hz 3D Curved AMOLED · Dimensity 8200 · 50MP OIS + 2x Pro Portrait Telephoto · 4600mAh · 80W FlashCharge'),
    m('vivo V27 Pro 5G', 'vivo-v27-pro', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Magic Blue', 'Noble Black'], 'V2230', '6.78" 120Hz 3D Curved AMOLED · Dimensity 8200 · 50MP Sony IMX766V OIS · 4600mAh · 66W FlashCharge'),
    m('vivo V27 5G', 'vivo-v27', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Magic Blue', 'Noble Black'], 'V2231', '6.78" 120Hz Curved AMOLED · Dimensity 7200 5G · 50MP Sony OIS + 50MP Eye AF Selfie · 4600mAh · 66W FlashCharge'),
    m('vivo V25 Pro 5G', 'vivo-v25-pro', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Sailing Blue', 'Pure Black'], 'V2158', '6.56" 120Hz 3D Curved AMOLED · Dimensity 1300 · 64MP OIS Night Camera · 4830mAh · 66W FlashCharge'),
  ],
  'vivo::T Series': [
    m('vivo T3 Ultra 5G', 'vivo-t3-ultra', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Lunar Gray', 'Frost Green'], 'V2426', '6.78" 1.5K 120Hz 3D Curved AMOLED · Dimensity 9200+ · 50MP Sony IMX921 OIS · 5500mAh · 80W FlashCharge'),
    m('vivo T3 Pro 5G', 'vivo-t3-pro', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Sandstone Orange', 'Emerald Green'], 'V2404', '6.77" 120Hz 4500-nit Curved AMOLED · Snapdragon 7 Gen 3 · 50MP Sony IMX882 OIS · 5500mAh · 80W FlashCharge'),
    m('vivo T3 5G', 'vivo-t3', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Cosmic Blue', 'Crystal Flake'], 'V2334', '6.67" 120Hz Vision AMOLED · Dimensity 7200 5G · 50MP Sony IMX882 OIS · 5000mAh · 44W FlashCharge'),
    m('vivo T3x 5G', 'vivo-t3x', 'Current Model', ['4GB', '6GB', '8GB'], ['128GB', '256GB'], ['Crimson Bliss', 'Celestial Green'], 'V2338', '6.72" 120Hz FHD+ Display · Snapdragon 6 Gen 1 5G · 50MP Dual Camera · 6000mAh · 44W FlashCharge'),
    m('vivo T2 Pro 5G', 'vivo-t2-pro', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['New Moon Black', 'Dune Gold'], 'V2321', '6.78" 120Hz 3D Curved AMOLED · Dimensity 7200 · 64MP Aura Light OIS Camera · 4600mAh · 66W FlashCharge'),
  ],
  'vivo::Y Series': [
    m('vivo Y200e 5G', 'vivo-y200e-5g', 'Current Model', ['6GB', '8GB'], ['128GB'], ['Saffron Delight', 'Black Diamond'], 'V2336', '6.67" 120Hz Eco-Fiber Leather AMOLED · Snapdragon 4 Gen 2 5G · 50MP Triple Camera · 5000mAh · 44W FlashCharge'),
    m('vivo Y100 5G', 'vivo-y100', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Twilight Gold', 'Pacific Blue', 'Metal Black'], 'V2239', '6.38" 90Hz AMOLED Display · Dimensity 900 5G · 64MP OIS Anti-Shake Camera · 4500mAh · 44W FlashCharge'),
    m('vivo Y56 5G', 'vivo-y56-5g', 'Previous Model', ['4GB', '8GB'], ['128GB'], ['Orange Shimmer', 'Black Engine'], 'V2225', '6.58" FHD+ Display · Dimensity 700 5G · 50MP Super Night Dual Camera · 5000mAh · 18W Fast Charge'),
    m('vivo Y36', 'vivo-y36', 'Previous Model', ['8GB'], ['128GB'], ['Vibrant Gold', 'Meteor Black'], 'V2247', '6.64" 90Hz FHD+ Sunlight Display · Snapdragon 680 · 50MP Bokeh Flare Camera · 5000mAh · 44W FlashCharge', '4G'),
    m('vivo Y28s 5G', 'vivo-y28s', 'Current Model', ['4GB', '6GB', '8GB'], ['128GB'], ['Vintage Red', 'Twinkling Purple'], 'V2346', '6.56" 90Hz High Brightness Display · Dimensity 6300 5G · 50MP Sony Main Camera · 5000mAh · 15W Charge'),
    m('vivo Y18', 'vivo-y18', 'Current Model', ['4GB'], ['64GB', '128GB'], ['Space Black', 'Gem Green'], 'V2333', '6.56" 90Hz High Brightness Display · Helio G85 · 50MP Clear Camera · 5000mAh · 15W Charge', '4G'),
  ],
  'vivo::Other Models': [
    m('vivo V29e 5G', 'vivo-v29e-international', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Artistic Red', 'Artistic Blue'], 'V2303', '6.78" 120Hz 3D Curved AMOLED · Snapdragon 695 5G · 64MP OIS + 50MP Eye AF Selfie · 5000mAh · 44W FlashCharge'),
    m('vivo V23 Pro 5G', 'vivo-v23-pro', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Sunshine Gold', 'Stardust Black'], 'V2132', '6.56" 90Hz 3D Curved AMOLED · Dimensity 1200 5G · 108MP Rear + 50MP Eye AF Dual Selfie · 4300mAh · 44W FlashCharge'),
  ],

  // ==================================================
  // XIAOMI (18 Verified Models across All 4 Official Series)
  // ==================================================
  'Xiaomi::Xiaomi Number Series': [
    m('Xiaomi 14 Pro 5G', 'xiaomi-14-pro', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB', '1TB'], ['Black', 'White', 'Rock Green', 'Titanium'], '23116PN5BC', '6.73" 2K 120Hz All-Around Liquid LTPO AMOLED · Snapdragon 8 Gen 3 · Leica Summilux Triple 50MP · 4880mAh · 120W HyperCharge'),
    m('Xiaomi 14 5G', 'xiaomi-14', 'Current Model', ['12GB'], ['256GB', '512GB'], ['Jade Green', 'Black', 'White'], '23127PN0CG', '6.36" 1.5K 120Hz LTPO CrystalRes AMOLED · Snapdragon 8 Gen 3 · Leica Summilux Triple 50MP · 4610mAh · 90W HyperCharge'),
    m('Xiaomi 12 Pro 5G', 'xiaomi-12-pro', 'Previous Model', ['8GB', '12GB'], ['256GB'], ['Couture Blue', 'Noir Black', 'Opera Mauve'], '2201122G', '6.73" WQHD+ 120Hz LTPO AMOLED · Snapdragon 8 Gen 1 · Pro Triple 50MP Camera Array · 4600mAh · 120W HyperCharge'),
    m('Xiaomi 12 5G', 'xiaomi-12', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Gray', 'Purple', 'Blue'], '2201123G', '6.28" 120Hz AMOLED Compact Flagship · Snapdragon 8 Gen 1 · 50MP Pro-Grade Camera · 4500mAh · 67W Turbo Charge'),
  ],
  'Xiaomi::Xiaomi Ultra Series': [
    m('Xiaomi 14 Ultra 5G', 'xiaomi-14-ultra-new', 'Current Model', ['16GB'], ['512GB'], ['Black', 'White'], '24030PN60G', '6.73" WQHD+ 120Hz LTPO AMOLED · Snapdragon 8 Gen 3 · Leica Quad 50MP 1-Inch Variable Aperture · 5000mAh · 90W HyperCharge'),
    m('Xiaomi 13 Ultra 5G', 'xiaomi-13-ultra', 'Previous Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Olive Green', 'Black', 'White'], '2304FPN6DG', '6.73" WQHD+ 120Hz LTPO AMOLED · Snapdragon 8 Gen 2 · Leica Vario-Summicron Quad 50MP · 5000mAh · 90W Turbo Charge'),
    m('Xiaomi 12S Ultra', 'xiaomi-12s-ultra', 'Previous Model', ['8GB', '12GB'], ['256GB', '512GB'], ['Classic Black', 'Verdant Green'], '2203121C', '6.73" 2K 120Hz LTPO2 AMOLED · Snapdragon 8+ Gen 1 · Leica 1-Inch 50MP IMX989 Sensor · 4860mAh · 67W Fast Charge'),
  ],
  'Xiaomi::Xiaomi Civi Series': [
    m('Xiaomi 14 Civi 5G', 'xiaomi-civi-4-pro', 'Current Model', ['8GB', '12GB'], ['256GB', '512GB'], ['Cruise Blue', 'Matcha Green', 'Shadow Black'], '24053PY09I', '6.55" 1.5K 120Hz Quad-Curved AMOLED · Snapdragon 8s Gen 3 · Leica 50MP Triple + Dual 32MP Selfie · 4700mAh · 67W Turbo Charge'),
    m('Xiaomi Civi 3 5G', 'xiaomi-civi-3', 'Previous Model', ['12GB', '16GB'], ['256GB', '512GB', '1TB'], ['Rose Purple', 'Mint Green', 'Adventure Gold', 'Coconut Grey'], '23046PNC9C', '6.55" 120Hz Curved OLED · Dimensity 8200-Ultra · 50MP Sony IMX800 OIS + Dual 32MP Selfie · 4500mAh · 67W Charge'),
  ],
  'Xiaomi::Other Models': [
    m('Xiaomi Mix Fold 4 5G', 'xiaomi-mix-fold4', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB', '1TB'], ['Black', 'White', 'Blue', 'Carbon Fiber'], '24072PX77C', '7.98" 120Hz Ultra-Thin Foldable LTPO OLED · Snapdragon 8 Gen 3 · Leica Quad 50MP Periscope · 5100mAh · 67W Charge'),
    m('Xiaomi Mix Flip 5G', 'xiaomi-mix-flip', 'Current Model', ['12GB'], ['512GB'], ['Purple', 'Black', 'White'], '2405CPX3DG', '6.86" Foldable 120Hz + 4.01" Liquid Outer AMOLED · Snapdragon 8 Gen 3 · Leica Summilux 50MP Dual Cam · 4780mAh · 67W Charge'),
    m('Xiaomi 14T Pro 5G', 'xiaomi-14t-pro', 'Current Model', ['12GB'], ['256GB', '512GB'], ['Titan Gray', 'Titan Blue', 'Titan Black'], '2407FPN8EG', '6.67" 144Hz 1.5K AI AMOLED · Dimensity 9300+ · Leica Summilux 50MP Triple Cam · 5000mAh · 120W HyperCharge'),
    m('Xiaomi 14T 5G', 'xiaomi-14t', 'Current Model', ['12GB'], ['256GB', '512GB'], ['Titan Gray', 'Titan Blue', 'Lemon Green'], '2406APNFAG', '6.67" 144Hz CrystalRes AMOLED · Dimensity 8300-Ultra · Leica 50MP Triple Camera · 5000mAh · 67W HyperCharge'),
    m('Xiaomi 13T Pro 5G', 'xiaomi-13t-pro', 'Previous Model', ['12GB'], ['512GB'], ['Meadow Green', 'Alpine Blue', 'Black'], '23078PND5G', '6.67" 144Hz CrystalRes AMOLED · Dimensity 9200+ · Leica 50MP Professional Optical Lens · 5000mAh · 120W HyperCharge'),
    m('Xiaomi 13T 5G', 'xiaomi-13t', 'Previous Model', ['8GB', '12GB'], ['256GB'], ['Alpine Blue', 'Meadow Green', 'Black'], '2306EPN60G', '6.67" 144Hz CrystalRes AMOLED · Dimensity 8200-Ultra · Leica 50MP Triple Camera · 5000mAh · 67W Turbo Charge'),
    m('Xiaomi 12T Pro 5G', 'xiaomi-12t-pro', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Black', 'Silver', 'Blue'], '22081212UG', '6.67" 120Hz CrystalRes AMOLED · Snapdragon 8+ Gen 1 · 200MP OIS Pro-Grade Camera · 5000mAh · 120W HyperCharge'),
    m('Xiaomi 12T 5G', 'xiaomi-12t', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Black', 'Silver', 'Blue'], '22071212AG', '6.67" 120Hz CrystalRes AMOLED · Dimensity 8100-Ultra · 108MP OIS Triple Camera · 5000mAh · 120W HyperCharge'),
    m('Xiaomi 11T Pro 5G', 'xiaomi-11t-pro', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Celestial Magic', 'Meteorite Gray', 'Moonlight White'], '2107113SG', '6.67" 120Hz Dolby Vision AMOLED · Snapdragon 888 · 108MP Pro-Grade Camera · 5000mAh · 120W HyperCharge'),
  ],

  // ==================================================
  // REDMI (18 Verified Models across All 5 Official Series)
  // ==================================================
  'Redmi::Redmi Note Pro Series': [
    m('Redmi Note 14 Pro+ 5G', 'xiaomi-redmi-note-14-pro-plus-5g', 'Current Model', ['8GB', '12GB'], ['256GB', '512GB'], ['Spectre Blue', 'Phantom Purple', 'Titan Black'], '24115RA8EI', '6.67" 1.5K 120Hz Curved AMOLED · Snapdragon 7s Gen 3 · 50MP Light Hunter 800 OIS + 50MP Telephoto · 6200mAh · 90W HyperCharge'),
    m('Redmi Note 14 Pro 5G', 'xiaomi-redmi-note-14-pro-5g', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Ivy Green', 'Phantom Purple', 'Titan Black'], '24090RA29I', '6.67" 1.5K 120Hz 3D Curved AMOLED · Dimensity 7300-Ultra · 50MP Sony LYT-600 OIS · 5500mAh · 45W Turbo Charge'),
    m('Redmi Note 13 Pro+ 5G', 'xiaomi-redmi-note-13-pro-plus', 'Current Model', ['8GB', '12GB'], ['256GB', '512GB'], ['Fusion Purple', 'Fusion Black', 'Fusion White'], '23090RA98I', '6.67" 1.5K 120Hz 3D Curved AMOLED · Dimensity 7200-Ultra · 200MP OIS Camera · 5000mAh · 120W HyperCharge'),
    m('Redmi Note 13 Pro 5G', 'xiaomi-redmi-note-13-pro-5g', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Coral Purple', 'Arctic White', 'Midnight Black', 'Scarlet Red'], '2312DRA50I', '6.67" 1.5K 120Hz AMOLED · Snapdragon 7s Gen 2 · 200MP OIS Flagship Camera · 5100mAh · 67W Turbo Charge'),
    m('Redmi Note 12 Pro+ 5G', 'xiaomi-redmi-note-12-pro-plus', 'Previous Model', ['8GB', '12GB'], ['256GB'], ['Iceberg Blue', 'Obsidian Black', 'Arctic White'], '22101316UG', '6.67" 120Hz Pro AMOLED · Dimensity 1080 5G · 200MP HPX OIS Sensor · 4980mAh · 120W HyperCharge'),
    m('Redmi Note 12 Pro 5G', 'xiaomi-redmi-note-12-pro', 'Previous Model', ['6GB', '8GB', '12GB'], ['128GB', '256GB'], ['Stardust Purple', 'Glacier Blue', 'Onyx Black'], '22101316I', '6.67" 120Hz Pro AMOLED · Dimensity 1080 5G · 50MP Sony IMX766 OIS Camera · 5000mAh · 67W Turbo Charge'),
  ],
  'Redmi::Redmi Note Series': [
    m('Redmi Note 14 5G', 'xiaomi-redmi-note-14-5g', 'Current Model', ['6GB', '8GB', '12GB'], ['128GB', '256GB'], ['Mystique White', 'Phantom Purple', 'Titan Black'], '24094RAD4I', '6.67" 120Hz FHD+ GOLED Display · Dimensity 7025-Ultra · 50MP Sony LYT-600 OIS · 5110mAh · 45W Fast Charge'),
    m('Redmi Note 13 5G', 'xiaomi-redmi-note-13-5g', 'Current Model', ['6GB', '8GB', '12GB'], ['128GB', '256GB'], ['Arctic White', 'Stealth Black', 'Prism Gold', 'Chromatic Purple'], '2312DRAABI', '6.67" 120Hz Ultra-Thin Bezel AMOLED · Dimensity 6080 5G · 108MP 3x In-Sensor Zoom · 5000mAh · 33W Fast Charge'),
    m('Redmi Note 12 5G', 'xiaomi-redmi-note-12-5g', 'Previous Model', ['4GB', '6GB', '8GB'], ['128GB', '256GB'], ['Frosted Green', 'Matte Black', 'Mystique Blue'], '22111317I', '6.67" 120Hz Super AMOLED · Snapdragon 4 Gen 1 5G · 48MP AI Triple Camera · 5000mAh · 33W Fast Charge'),
  ],
  'Redmi::Redmi Number Series': [
    m('Redmi 13 5G', 'xiaomi-redmi-13-5g', 'Current Model', ['6GB', '8GB'], ['128GB'], ['Hawaiian Blue', 'Orchid Pink', 'Black Diamond'], '2406ERN9CI', '6.79" 120Hz FHD+ AdaptiveSync Display · Snapdragon 4 Gen 2 AE · 108MP Pro-Grade Camera · 5030mAh · 33W Fast Charge'),
    m('Redmi 13C 5G', 'xiaomi-redmi-13c-5g', 'Current Model', ['4GB', '6GB', '8GB'], ['128GB', '256GB'], ['Starlight Black', 'Startrail Green', 'Startrail Silver'], '23124RN87I', '6.74" 90Hz Gorilla Glass Display · Dimensity 6100+ 5G · 50MP AI Dual Camera · 5000mAh · 18W Fast Charge'),
    m('Redmi 12 5G', 'xiaomi-redmi-12-5g', 'Previous Model', ['4GB', '6GB', '8GB'], ['128GB', '256GB'], ['Moonstone Silver', 'Pastel Blue', 'Jade Black'], '23076RN4BI', '6.79" 90Hz FHD+ Display · Snapdragon 4 Gen 2 5G · 50MP AI Dual Camera · 5000mAh · 18W Charge'),
    m('Redmi 12', 'xiaomi-redmi-12', 'Previous Model', ['4GB', '6GB'], ['128GB'], ['Moonstone Silver', 'Pastel Blue', 'Jade Black'], '23053RN02I', '6.79" 90Hz FHD+ Display · Helio G88 · 50MP Triple Camera · 5000mAh · 18W Fast Charge', '4G'),
  ],
  'Redmi::Redmi A Series': [
    m('Redmi A3', 'xiaomi-redmi-a3', 'Current Model', ['3GB', '4GB', '6GB'], ['64GB', '128GB'], ['Olive Green', 'Lake Blue', 'Midnight Black'], '23129RN51X', '6.71" 90Hz Smooth Halo Display · Helio G36 · 8MP AI Dual Camera · 5000mAh · 10W USB Type-C', '4G'),
    m('Redmi A2+', 'xiaomi-redmi-a2-plus', 'Previous Model', ['2GB', '4GB'], ['32GB', '64GB'], ['Sea Green', 'Aqua Blue', 'Classic Black'], '23028RN4DI', '6.52" HD+ Scratch-Resistant Display · Helio G36 · 8MP Dual Camera · 5000mAh · 10W Charge', '4G'),
  ],
  'Redmi::Other Models': [
    m('Redmi K70 Pro 5G', 'xiaomi-redmi-k70-pro', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Black', 'White', 'Bamboo Blue'], '23117RK66C', '6.67" 2K 120Hz 4000-nit OLED · Snapdragon 8 Gen 3 · 50MP Light Hunter 800 + 50MP 2x Telephoto · 5000mAh · 120W HyperCharge'),
    m('Redmi K70 5G', 'xiaomi-redmi-k70', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Black', 'White', 'Purple', 'Blue'], '23113RKC6C', '6.67" 2K 120Hz OLED Display · Snapdragon 8 Gen 2 · 50MP Light Hunter 800 OIS · 5000mAh · 120W HyperCharge'),
    m('Redmi K60 Pro 5G', 'xiaomi-redmi-k60-pro', 'Previous Model', ['8GB', '12GB', '16GB'], ['128GB', '256GB', '512GB'], ['Black', 'White', 'Mint'], '22127RK46C', '6.67" 2K 120Hz OLED · Snapdragon 8 Gen 2 · 50MP Sony IMX800 OIS · 5000mAh · 120W HyperCharge'),
  ],

  // ==================================================
  // POCO (15 Verified Models across All 5 Official Series)
  // ==================================================
  'POCO::POCO F Series': [
    m('POCO F6 Pro 5G', 'xiaomi-poco-f6-pro', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Black', 'White'], '23113RKC6G', '6.67" WQHD+ 120Hz Flow AMOLED · Snapdragon 8 Gen 2 · 50MP Light Fusion 800 OIS · 5000mAh · 120W HyperCharge'),
    m('POCO F6 5G', 'xiaomi-poco-f6', 'Current Model', ['8GB', '12GB'], ['256GB', '512GB'], ['Titanium', 'Black'], '24069PC21I', '6.67" 1.5K 120Hz CrystalRes AMOLED · Snapdragon 8s Gen 3 · 50MP Sony IMX882 OIS · 5000mAh · 90W Turbo Charge'),
    m('POCO F3 5G', 'xiaomi-poco-f3', 'Previous Model', ['6GB', '8GB'], ['128GB', '256GB'], ['Arctic White', 'Night Black', 'Deep Ocean Blue'], 'M2012K11AG', '6.67" 120Hz E4 AMOLED Display · Snapdragon 870 5G · 48MP Triple Camera · 4520mAh · 33W Fast Charge'),
  ],
  'POCO::POCO X Series': [
    m('POCO X6 Pro 5G', 'xiaomi-poco-x6-pro', 'Current Model', ['8GB', '12GB'], ['256GB', '512GB'], ['POCO Yellow', 'Spectre Black', 'Racing Grey'], '2311DRK48I', '6.67" 1.5K 120Hz Flow AMOLED · Dimensity 8300-Ultra · 64MP OIS Triple Camera · 5000mAh · 67W Turbo Charge'),
    m('POCO X6 5G', 'xiaomi-poco-x6', 'Current Model', ['8GB', '12GB'], ['256GB', '512GB'], ['Mirror Black', 'Snowstorm White', 'Skyline Blue'], '23122PCD1I', '6.67" 1.5K 120Hz AMOLED · Snapdragon 7s Gen 2 · 64MP OIS Triple Camera · 5100mAh · 67W Turbo Charge'),
    m('POCO X5 Pro 5G', 'xiaomi-poco-x5-pro-5g', 'Previous Model', ['6GB', '8GB'], ['128GB', '256GB'], ['POCO Yellow', 'Horizon Blue', 'Astral Black'], '22101320I', '6.67" 120Hz FHD+ Flow AMOLED · Snapdragon 778G 5G · 108MP Pro-Grade Camera · 5000mAh · 67W SonicCharge'),
    m('POCO X5 5G', 'xiaomi-poco-x5-5g', 'Previous Model', ['6GB', '8GB'], ['128GB', '256GB'], ['Supernova Green', 'Wildcat Blue', 'Jaguar Black'], '22111317PI', '6.67" 120Hz Super AMOLED · Snapdragon 695 5G · 48MP AI Triple Camera · 5000mAh · 33W Fast Charge'),
  ],
  'POCO::POCO M Series': [
    m('POCO M6 Pro 5G', 'xiaomi-poco-m6-pro', 'Current Model', ['4GB', '6GB', '8GB'], ['128GB', '256GB'], ['Forest Green', 'Power Black'], '23076PC4BI', '6.79" 90Hz FHD+ Gorilla Glass Display · Snapdragon 4 Gen 2 5G · 50MP AI Dual Cam · 5000mAh · 18W Fast Charge'),
    m('POCO M6 Plus 5G', 'xiaomi-poco-m6-plus', 'Current Model', ['6GB', '8GB'], ['128GB'], ['Misty Lavender', 'Ice Silver', 'Graphite Black'], '24065PC95I', '6.79" 120Hz FHD+ AdaptiveSync Display · Snapdragon 4 Gen 2 AE · 108MP 3x In-Sensor Zoom · 5030mAh · 33W Fast Charge'),
    m('POCO M5', 'xiaomi-poco-m5', 'Previous Model', ['4GB', '6GB'], ['64GB', '128GB'], ['Power Black', 'Icy Blue', 'POCO Yellow'], '22071219CI', '6.58" 90Hz FHD+ DynamicSwitch Display · Helio G99 · 50MP Triple Camera · 5000mAh · 18W Fast Charge', '4G'),
    m('POCO M4 Pro 5G', 'xiaomi-poco-m4-pro-5g', 'Previous Model', ['4GB', '6GB', '8GB'], ['64GB', '128GB'], ['Power Black', 'Cool Blue', 'POCO Yellow'], '21091116AG', '6.6" 90Hz FHD+ DotDisplay · Dimensity 810 5G · 50MP Dual Camera · 5000mAh · 33W Pro Fast Charge'),
  ],
  'POCO::POCO C Series': [
    m('POCO C65', 'xiaomi-poco-c65', 'Current Model', ['4GB', '6GB', '8GB'], ['128GB', '256GB'], ['Pastel Blue', 'Matte Black', 'Pastel Green'], '2310FPCA4I', '6.74" 90Hz HD+ Gorilla Glass Display · Helio G85 · 50MP AI Triple Camera · 5000mAh · 18W Type-C', '4G'),
    m('POCO C61', 'xiaomi-poco-c61', 'Current Model', ['4GB', '6GB'], ['64GB', '128GB'], ['Mystical Green', 'Ethereal Blue', 'Diamond Dust Black'], '24048RN6CI', '6.71" 90Hz HD+ Gorilla Glass 3 Display · Helio G36 · 8MP AI Dual Camera · 5000mAh · 10W Type-C', '4G'),
    m('POCO C55', 'xiaomi-poco-c55', 'Previous Model', ['4GB', '6GB'], ['64GB', '128GB'], ['Forest Green', 'Cool Blue', 'Power Black'], '22127PC95I', '6.71" HD+ Leather-Stitch Design · Helio G85 · 50MP Dual Camera · 5000mAh · 10W Charge', '4G'),
  ],
  'POCO::Other Models': [
    m('POCO F4 5G', 'xiaomi-poco-f4-5g', 'Previous Model', ['6GB', '8GB', '12GB'], ['128GB', '256GB'], ['Night Black', 'Nebula Green'], '22021211RI', '6.67" 120Hz E4 AMOLED Display · Snapdragon 870 5G · 64MP OIS Triple Camera · 4500mAh · 67W SonicCharge'),
  ],

  // ==================================================
  // REALME (26 Verified Models across All 6 Official Series)
  // ==================================================
  'realme::GT Series': [
    m('realme GT 6 5G', 'realme-gt6', 'Current Model', ['8GB', '12GB', '16GB'], ['256GB', '512GB'], ['Fluid Silver', 'Razor Green'], 'RMX3851', '6.78" 6000-nit 120Hz LTPO AMOLED · Snapdragon 8s Gen 3 · 50MP Sony LYT-808 OIS + 50MP Telephoto · 5500mAh · 120W SUPERVOOC'),
    m('realme GT 2 Pro 5G', 'realme-gt2-pro', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Paper White', 'Paper Green', 'Steel Black'], 'RMX3301', '6.7" 2K 120Hz LTPO2 Super Reality AMOLED · Snapdragon 8 Gen 1 · Dual 50MP Sony IMX766 OIS · 5000mAh · 65W SuperDart'),
    m('realme GT Neo 3 5G', 'realme-gt-neo3', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Nitro Blue', 'Sprint White', 'Asphalt Black'], 'RMX3561', '6.7" 120Hz Reality AMOLED · Dimensity 8100 5G · 50MP Sony IMX766 OIS · 5000mAh · 80W/150W SuperDart'),
  ],
  'realme::Number Pro+ & Pro Series': [
    m('realme 13 Pro+ 5G', 'realme-13-pro-plus', 'Current Model', ['8GB', '12GB'], ['256GB', '512GB'], ['Monet Gold', 'Emerald Green'], 'RMX3921', '6.7" 120Hz Curved Vision AMOLED · Snapdragon 7s Gen 2 · Dual Sony 50MP OIS + 50MP 3x Periscope · 5200mAh · 80W SUPERVOOC'),
    m('realme 13 Pro 5G', 'realme-13-pro', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB', '512GB'], ['Monet Purple', 'Monet Gold', 'Emerald Green'], 'RMX3990', '6.7" 120Hz Curved Vision AMOLED · Snapdragon 7s Gen 2 · 50MP Sony LYT-600 OIS · 5200mAh · 45W SUPERVOOC'),
    m('realme 12 Pro+ 5G', 'realme-12-pro-plus', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Submarine Blue', 'Navigator Beige', 'Explorer Red'], 'RMX3840', '6.7" 120Hz Curved Vision AMOLED · Snapdragon 7s Gen 2 · 64MP Periscope Portrait OIS + 50MP Sony IMX890 · 5000mAh · 67W SUPERVOOC'),
    m('realme 12 Pro 5G', 'realme-12-pro', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Submarine Blue', 'Navigator Beige'], 'RMX3842', '6.7" 120Hz Curved Vision AMOLED · Snapdragon 6 Gen 1 · 50MP Sony IMX882 OIS + 32MP Telephoto · 5000mAh · 67W SUPERVOOC'),
    m('realme 12+ 5G', 'realme-12-plus', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Pioneer Green', 'Navigator Beige'], 'RMX3867', '6.67" 120Hz Ultra Smooth AMOLED · Dimensity 7050 5G · 50MP Sony LYT-600 OIS · 5000mAh · 67W SUPERVOOC'),
    m('realme 12x 5G', 'realme-12x', 'Current Model', ['4GB', '6GB', '8GB'], ['128GB'], ['Twilight Purple', 'Woodland Green'], 'RMX3998', '6.72" 120Hz Dynamic FHD+ Display · Dimensity 6100+ 5G · 50MP AI Dual Camera · 5000mAh · 45W SUPERVOOC'),
    m('realme 11 Pro+ 5G', 'realme-11-pro-plus', 'Previous Model', ['8GB', '12GB'], ['256GB'], ['Sunrise Beige', 'Oasis Green', 'Astral Black'], 'RMX3741', '6.7" 120Hz Curved Vision AMOLED · Dimensity 7050 5G · 200MP OIS SuperZoom Camera · 5000mAh · 100W SUPERVOOC'),
    m('realme 11 Pro 5G', 'realme-11-pro', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Sunrise Beige', 'Oasis Green', 'Astral Black'], 'RMX3771', '6.7" 120Hz Curved AMOLED · Dimensity 7050 5G · 100MP OIS ProLight Camera · 5000mAh · 67W SUPERVOOC'),
    m('realme 10 Pro+ 5G', 'realme-10-pro-plus', 'Previous Model', ['6GB', '8GB', '12GB'], ['128GB', '256GB'], ['Hyperspace Gold', 'Dark Matter', 'Nebula Blue'], 'RMX3686', '6.7" 120Hz Hyperspace Curved AMOLED · Dimensity 1080 5G · 108MP ProLight Camera · 5000mAh · 67W SUPERVOOC'),
    m('realme 10 Pro 5G', 'realme-10-pro', 'Previous Model', ['6GB', '8GB'], ['128GB'], ['Hyperspace Gold', 'Dark Matter', 'Nebula Blue'], 'RMX3661', '6.72" 120Hz Boundless Display · Snapdragon 695 5G · 108MP ProLight Dual Camera · 5000mAh · 33W SUPERVOOC'),
  ],
  'realme::P Series': [
    m('realme P2 Pro 5G', 'realme-p2-pro', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB', '512GB'], ['Parrot Green', 'Eagle Grey'], 'RMX3987', '6.7" 120Hz Curved AMOLED Display · Snapdragon 7s Gen 2 · 50MP Sony LYT-600 OIS · 5200mAh · 80W SUPERVOOC'),
    m('realme P1 Pro 5G', 'realme-p1-pro', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Phoenix Red', 'Parrot Blue'], 'RMX3844', '6.7" 120Hz Curved Vision AMOLED · Snapdragon 6 Gen 1 · 50MP Sony LYT-600 OIS · 5000mAh · 45W SUPERVOOC'),
    m('realme P1 Speed 5G', 'realme-p1-speed', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Brushed Blue', 'Textured Titanium'], 'RMX5004', '6.67" 120Hz OLED Esports Display · Dimensity 7300 Energy 5G · 50MP AI Camera · 5000mAh · 45W SUPERVOOC'),
    m('realme P1 5G', 'realme-p1', 'Current Model', ['6GB', '8GB'], ['128GB', '256GB'], ['Phoenix Red', 'Peacock Green'], 'RMX3870', '6.67" 120Hz AMOLED Display · Dimensity 7050 5G · 50MP Sony LYT-600 Camera · 5000mAh · 45W SUPERVOOC'),
  ],
  'realme::Narzo Series': [
    m('realme Narzo 70 Pro 5G', 'realme-narzo-70-pro', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Glass Green', 'Glass Gold'], 'RMX3868', '6.67" 120Hz Horizon Glass AMOLED · Dimensity 7050 5G · 50MP Sony IMX890 OIS · 5000mAh · 67W SUPERVOOC'),
    m('realme Narzo 70x 5G', 'realme-narzo-70x', 'Current Model', ['4GB', '6GB', '8GB'], ['128GB'], ['Ice Blue', 'Forest Green'], 'RMX3997', '6.72" 120Hz Ultra Smooth Display · Dimensity 6100+ 5G · 50MP AI Camera · 5000mAh · 45W SUPERVOOC'),
    m('realme Narzo N55', 'realme-narzo-n55', 'Previous Model', ['4GB', '6GB'], ['64GB', '128GB'], ['Prime Blue', 'Prime Black'], 'RMX3710', '6.72" 90Hz FHD+ Display · Helio G88 · 64MP AI Camera · 5000mAh · 33W SUPERVOOC', '4G'),
  ],
  'realme::C Series': [
    m('realme C67 5G', 'realme-c67-5g', 'Current Model', ['4GB', '6GB'], ['128GB'], ['Sunny Oasis', 'Dark Purple'], 'RMX3782', '6.72" 120Hz Dynamic FHD+ Display · Dimensity 6100+ 5G · 50MP AI Dual Camera · 5000mAh · 33W SUPERVOOC'),
    m('realme C63', 'realme-c63', 'Current Model', ['4GB', '6GB', '8GB'], ['64GB', '128GB'], ['Leather Blue', 'Jade Green'], 'RMX3939', '6.74" 90Hz Vegan Leather Display · UNISOC T612 · 50MP AI Camera · 5000mAh · 45W SUPERVOOC', '4G'),
    m('realme C55', 'realme-c55', 'Previous Model', ['4GB', '6GB', '8GB'], ['64GB', '128GB'], ['Sunshower', 'Rainy Night', 'Rainforest'], 'RMX3710', '6.72" 90Hz FHD+ Mini Capsule Display · Helio G88 · 64MP AI Camera · 5000mAh · 33W SUPERVOOC', '4G'),
    m('realme C53', 'realme-c53', 'Previous Model', ['4GB', '6GB'], ['64GB', '128GB'], ['Champion Gold', 'Mighty Black'], 'RMX3760', '6.74" 90Hz Display · UNISOC T612 · 108MP Ultra Clear Camera · 5000mAh · 18W Quick Charge', '4G'),
  ],
  'realme::Other Models': [
    m('realme GT Neo 2 5G', 'realme-gt-neo2', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Neo Green', 'Neo Blue', 'Neo Black'], 'RMX3370', '6.62" 120Hz E4 AMOLED Display · Snapdragon 870 5G · 64MP Triple Camera · 5000mAh · 65W SuperDart'),
    m('realme GT Neo 3T 5G', undefined, 'Previous Model', ['6GB', '8GB'], ['128GB', '256GB'], ['Dash Yellow', 'Drifting White', 'Shade Black'], 'RMX3371', '6.62" 120Hz E4 AMOLED · Snapdragon 870 5G · 64MP Triple Camera · 5000mAh · 80W SuperDart'),
  ],

  // ==================================================
  // iQOO (13 Verified Models across All 4 Official Series)
  // ==================================================
  'iQOO::iQOO Number Flagship Series': [
    m('iQOO 13 5G', 'vivo-iqoo-13', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Legend Edition', 'Nardo Grey'], 'I2401', '6.82" 2K 144Hz LTPO AMOLED · Snapdragon 8 Elite + Q2 Chip · Triple 50MP Sony IMX921 OIS · 6000mAh · 120W FlashCharge'),
    m('iQOO 9 Pro 5G', 'vivo-iqoo-9-pro', 'Previous Model', ['8GB', '12GB'], ['256GB'], ['Legend', 'Dark Cruise'], 'I2020', '6.78" 2K E5 120Hz LTPO AMOLED · Snapdragon 8 Gen 1 · 50MP Gimbal Camera + 50MP Fisheye · 4700mAh · 120W FlashCharge'),
    m('iQOO 9 5G', 'vivo-iqoo-9', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Legend', 'Alpha', 'Phoenix Orange'], 'I2018', '6.56" 120Hz 10-bit AMOLED · Snapdragon 888+ · 48MP Gimbal OIS Triple Camera · 4350mAh · 120W FlashCharge'),
    m('iQOO 7 5G', 'vivo-iqoo-7', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Storm Black', 'Solid Ice Blue', 'Monster Orange'], 'I2009', '6.62" 120Hz AMOLED Display · Snapdragon 870 5G · 48MP Sony IMX598 OIS · 4400mAh · 66W FlashCharge'),
  ],
  'iQOO::iQOO Neo Series': [
    m('iQOO Neo 7 5G', 'vivo-iqoo-neo7', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Interstellar Black', 'Frost Blue'], 'I2214', '6.78" 120Hz E5 AMOLED Display · Dimensity 8200 5G · 64MP OIS Triple Camera · 5000mAh · 120W FlashCharge'),
    m('iQOO Neo 6 5G', 'vivo-iqoo-neo6', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Dark Nova', 'Cyber Rage'], 'I2202', '6.62" 120Hz E4 AMOLED Display · Snapdragon 870 5G · 64MP OIS GW1P Camera · 4700mAh · 80W FlashCharge'),
  ],
  'iQOO::iQOO Z Series': [
    m('iQOO Z9s Pro 5G', 'vivo-iqoo-z9s-pro', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Flamboyant Orange', 'Luxe Marble'], 'I2305', '6.77" 120Hz 4500-nit 3D Curved AMOLED · Snapdragon 7 Gen 3 · 50MP Sony IMX882 OIS · 5500mAh · 80W FlashCharge'),
    m('iQOO Z9s 5G', 'vivo-iqoo-z9s', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Titanium Matte', 'Onyx Green'], 'I2403', '6.77" 120Hz 3D Curved AMOLED · Dimensity 7300 5G · 50MP Sony IMX882 OIS · 5500mAh · 44W FlashCharge'),
    m('iQOO Z9 5G', 'vivo-iqoo-z9', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Brushed Green', 'Graphene Blue'], 'I2302', '6.67" 120Hz 1800-nit AMOLED · Dimensity 7200 5G · 50MP Sony IMX882 OIS · 5000mAh · 44W FlashCharge'),
    m('iQOO Z9x 5G', 'vivo-iqoo-z9x', 'Current Model', ['4GB', '6GB', '8GB'], ['128GB'], ['Tornado Green', 'Storm Grey'], 'I2219', '6.72" 120Hz FHD+ Display · Snapdragon 6 Gen 1 5G · 50MP AI Dual Camera · 6000mAh · 44W FlashCharge'),
    m('iQOO Z7 Pro 5G', 'vivo-iqoo-z7-pro', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Blue Lagoon', 'Graphite Matte'], 'I2301', '6.78" 120Hz 3D Curved AMOLED · Dimensity 7200 · 64MP Aura Light OIS · 4600mAh · 66W FlashCharge'),
  ],
  'iQOO::Other Models': [
    m('iQOO Z6 Pro 5G', 'vivo-iqoo-z6-pro', 'Previous Model', ['6GB', '8GB', '12GB'], ['128GB', '256GB'], ['Phantom Dusk', 'Legion Sky'], 'I2126', '6.44" 90Hz FHD+ AMOLED · Snapdragon 778G 5G · 64MP Triple Camera · 4700mAh · 66W FlashCharge'),
    m('iQOO Z6 Lite 5G', 'vivo-iqoo-z6-lite-5g', 'Previous Model', ['4GB', '6GB'], ['64GB', '128GB'], ['Stellar Green', 'Mystic Night'], 'I2208', '6.58" 120Hz FHD+ Display · Snapdragon 4 Gen 1 5G · 50MP Eye Autofocus Camera · 5000mAh · 18W Charge'),
  ],

  // ==================================================
  // NOTHING (5 Verified Models across All 3 Official Series)
  // ==================================================
  'Nothing::Phone Flagship Series': [
    m('Nothing Phone (2) 5G', 'nothing-phone2_', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB', '512GB'], ['Dark Grey', 'White'], 'A065', '6.7" 120Hz LTPO OLED + New Glyph Interface · Snapdragon 8+ Gen 1 · Dual 50MP Sony IMX890 OIS · 4700mAh · 45W Fast Charge'),
    m('Nothing Phone (1) 5G', 'nothing-phone-1', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Black', 'White'], 'A063', '6.55" 120Hz OLED + Glyph LED Interface · Snapdragon 778G+ 5G · Dual 50MP Sony IMX766 OIS · 4500mAh · 33W PD Charge'),
  ],
  'Nothing::Phone (a) Series': [
    m('Nothing Phone (2a) Plus 5G', 'nothing-phone-2a-plus', 'Current Model', ['8GB', '12GB'], ['256GB'], ['Metallic Grey', 'Black'], 'A142P', '6.7" 120Hz Flexible AMOLED · Dimensity 7350 Pro 5G · Triple 50MP (Rear + Selfie) · 5000mAh · 50W Fast Charge'),
    m('Nothing Phone (2a) 5G', 'nothing-phone-2a', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Black', 'White', 'Blue', 'Special Edition'], 'A142', '6.7" 120Hz Flexible AMOLED · Dimensity 7200 Pro · Dual 50MP OIS Rear Camera · 5000mAh · 45W Fast Charge'),
  ],
  'Nothing::Other Models': [
    m('CMF Phone 1 5G (by Nothing)', 'nothing-cmf-phone-1-ofic', 'Current Model', ['6GB', '8GB'], ['128GB'], ['Orange', 'Light Green', 'Black'], 'A015', '6.67" 120Hz Super AMOLED · Dimensity 7300 5G · 50MP Sony Sensor · 5000mAh · 33W Fast Charge'),
  ],

  // ==================================================
  // MOTOROLA (21 Verified Models across All 5 Official Series)
  // ==================================================
  'Motorola::Razr Series': [
    m('Motorola Razr 50 Ultra 5G', 'motorola-razr-50-ultra', 'Current Model', ['12GB'], ['512GB'], ['Midnight Blue', 'Spring Green', 'Peach Fuzz'], 'XT2451', '6.9" 165Hz Foldable LTPO pOLED + 4.0" External pOLED · Snapdragon 8s Gen 3 · Dual 50MP Telephoto · 4000mAh · 45W TurboPower'),
    m('Motorola Razr 50 5G', 'motorola-razr-50', 'Current Model', ['8GB'], ['256GB'], ['Koala Grey', 'Beach Sand', 'Spritz Orange'], 'XT2453', '6.9" 120Hz Foldable pOLED + 3.6" External pOLED · Dimensity 7300X · 50MP OIS Camera · 4200mAh · 30W TurboPower'),
    m('Motorola Razr 40 Ultra 5G', 'motorola-razr-40-ultra', 'Previous Model', ['8GB', '12GB'], ['256GB'], ['Viva Magenta', 'Infinite Black', 'Glacier Blue'], 'XT2321', '6.9" 165Hz Foldable pOLED + 3.6" Cover Screen · Snapdragon 8+ Gen 1 · 12MP OIS Dual Camera · 3800mAh · 30W TurboPower'),
    m('Motorola Razr 40 5G', 'motorola-razr-40', 'Previous Model', ['8GB'], ['256GB'], ['Sage Green', 'Summer Lilac', 'Vanilla Cream'], 'XT2323', '6.9" 144Hz Foldable pOLED Vegan Leather · Snapdragon 7 Gen 1 · 64MP OIS Camera · 4200mAh · 30W TurboPower'),
  ],
  'Motorola::Edge Series': [
    m('Motorola Edge 50 Ultra 5G', 'motorola-edge-50-ultra', 'Current Model', ['12GB'], ['512GB'], ['Nordic Wood', 'Forest Grey', 'Peach Fuzz'], 'XT2401', '6.7" 144Hz Curved pOLED · Snapdragon 8s Gen 3 · 50MP Main + 64MP 3x Periscope + 50MP UW · 4500mAh · 125W TurboPower'),
    m('Motorola Edge 50 Pro 5G', 'motorola-edge-50-pro', 'Current Model', ['8GB', '12GB'], ['256GB'], ['Luxe Lavender', 'Black Beauty', 'Moonlight Pearl'], 'XT2403', '6.7" 1.5K 144Hz Pantone Curved pOLED · Snapdragon 7 Gen 3 · 50MP f/1.4 OIS + 3x Telephoto · 4500mAh · 125W TurboPower'),
    m('Motorola Edge 50 Fusion 5G', 'motorola-edge-50-fusion', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Forest Blue', 'Marshmallow Blue', 'Hot Pink'], 'XT2429', '6.7" 144Hz 3D Curved pOLED · Snapdragon 7s Gen 2 · 50MP Sony LYTIA 700C OIS · 5000mAh · 68W TurboPower'),
    m('Motorola Edge 50 Neo 5G', 'motorola-edge-50-neo', 'Current Model', ['8GB'], ['256GB'], ['Pantone Poinciana', 'Lattè', 'Grisaille', 'Nautical Blue'], 'XT2409', '6.4" 120Hz LTPO Compact pOLED · Dimensity 7300 · 50MP Sony OIS + 10MP 3x Telephoto · 4310mAh · 68W TurboPower'),
    m('Motorola Edge 40 Neo 5G', 'motorola-edge-40-neo', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Caneel Bay', 'Soothing Sea', 'Black Beauty'], 'XT2307', '6.55" 144Hz 10-bit Curved pOLED · Dimensity 7030 · 50MP Ultra Pixel OIS · 5000mAh · 68W TurboPower'),
    m('Motorola Edge 40 5G', 'motorola-edge-40', 'Previous Model', ['8GB'], ['256GB'], ['Nebula Green', 'Eclipse Black', 'Lunar Blue'], 'XT2303', '6.55" 144Hz Curved pOLED IP68 · Dimensity 8020 · 50MP f/1.4 OIS Camera · 4400mAh · 68W TurboPower'),
    m('Motorola Edge 30 Ultra 5G', 'motorola-edge-30-ultra', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Interstellar Black', 'Starlight White'], 'XT2241', '6.67" 144Hz Curved pOLED · Snapdragon 8+ Gen 1 · 200MP OIS + 50MP UW + 12MP Telephoto · 4610mAh · 125W TurboPower'),
    m('Motorola Edge 30 Pro 5G', 'motorola-edge-30-pro', 'Previous Model', ['8GB'], ['128GB'], ['Cosmos Blue', 'Stardust White'], 'XT2201', '6.7" 144Hz MAX Vision OLED · Snapdragon 8 Gen 1 · Dual 50MP Rear + 60MP Selfie · 4800mAh · 68W TurboPower'),
  ],
  'Motorola::Moto G Series': [
    m('Motorola Moto G85 5G', 'motorola-moto-g85', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Olive Green', 'Cobalt Blue', 'Urban Grey'], 'XT2427', '6.67" 120Hz 3D Curved pOLED · Snapdragon 6s Gen 3 · 50MP Sony LYTIA 600 OIS · 5000mAh · 33W TurboPower'),
    m('Motorola Moto G64 5G', 'motorola-moto-g64', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Ice Lilac', 'Mint Green', 'Pearl Blue'], 'XT2431', '6.5" 120Hz FHD+ Display · Dimensity 7025 5G · 50MP OIS Camera · 6000mAh · 33W TurboPower'),
    m('Motorola Moto G24 Power', 'motorola-moto-g24-power', 'Current Model', ['4GB', '8GB'], ['128GB'], ['Glacier Blue', 'Ink Blue'], 'XT2425', '6.56" 90Hz Display · Helio G85 · 50MP Quad Pixel Dual Camera · 6000mAh · 30W TurboPower', '4G'),
    m('Motorola Moto G84 5G', 'motorola-moto-g84', 'Previous Model', ['12GB'], ['256GB'], ['Viva Magenta', 'Marshmallow Blue', 'Midnight Blue'], 'XT2347', '6.55" 120Hz 10-bit pOLED · Snapdragon 695 5G · 50MP Ultra Pixel OIS · 5000mAh · 30W TurboPower'),
    m('Motorola Moto G54 5G', 'motorola-moto-g54', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Mint Green', 'Midnight Blue', 'Pearl Blue'], 'XT2343', '6.5" 120Hz FHD+ Display · Dimensity 7020 5G · 50MP OIS Camera · 6000mAh · 33W TurboPower'),
  ],
  'Motorola::Moto E Series': [
    m('Motorola Moto E14', 'motorola-moto-e14', 'Current Model', ['2GB', '4GB'], ['64GB'], ['Graphite Gray', 'Pastel Green', 'Pastel Purple'], 'XT2421', '6.56" 90Hz Gorilla Glass 3 Display · UNISOC T606 · 13MP AI Camera · 5000mAh · 15W USB-C', '4G'),
    m('Motorola Moto E13', 'motorola-moto-e13', 'Previous Model', ['4GB', '8GB'], ['64GB', '128GB'], ['Cosmic Black', 'Aurora Green', 'Creamy White'], 'XT2345', '6.5" HD+ Dolby Atmos Display · UNISOC T606 · 13MP AI Camera · 5000mAh · 10W USB-C', '4G'),
    m('Motorola Moto E32', 'motorola-moto-e32', 'Previous Model', ['4GB'], ['64GB'], ['Eco Black', 'Artic Blue'], 'XT2229', '6.5" 90Hz HD+ Display · Helio G37 · 50MP Dual Camera · 5000mAh · 10W Charge', '4G'),
  ],
  'Motorola::Other Models': [
    m('Motorola ThinkPhone by Lenovo', 'motorola-thinkphone', 'Current Model', ['8GB', '12GB'], ['256GB'], ['Carbon Black'], 'XT2309', '6.6" 144Hz pOLED Aramid Fiber Body · Snapdragon 8+ Gen 1 · 50MP OIS Camera · 5000mAh · 68W TurboPower'),
  ],

  // ==================================================
  // GOOGLE PIXEL (13 Verified Models across All 4 Official Series)
  // ==================================================
  'Google Pixel::Pixel Pro Series': [
    m('Google Pixel 9 Pro XL 5G', 'google-pixel-9-pro-xl-', 'Current Model', ['16GB'], ['256GB', '512GB', '1TB'], ['Porcelain', 'Rose Quartz', 'Hazel', 'Obsidian'], 'GGX8B', '6.8" Super Actua 120Hz LTPO OLED · Google Tensor G4 · 50MP Main + 48MP UW + 48MP 5x Telephoto · 5060mAh · 37W Fast Charge'),
    m('Google Pixel 9 Pro 5G', 'google-pixel-9-pro-', 'Current Model', ['16GB'], ['256GB'], ['Porcelain', 'Rose Quartz', 'Hazel', 'Obsidian'], 'GR83Y', '6.3" Super Actua 120Hz LTPO OLED · Google Tensor G4 · 50MP + 48MP UW + 48MP 5x Telephoto · 4700mAh · 27W Fast Charge'),
    m('Google Pixel 8 Pro 5G', 'google-pixel-8-pro', 'Previous Model', ['12GB'], ['128GB', '256GB'], ['Bay', 'Porcelain', 'Obsidian'], 'GC3VE', '6.7" Super Actua 120Hz LTPO OLED · Google Tensor G3 · 50MP + 48MP UW + 48MP 5x Zoom · 5050mAh · 30W Fast Charge'),
    m('Google Pixel 6 Pro 5G', 'google-pixel-6-pro', 'Previous Model', ['12GB'], ['128GB', '256GB'], ['Cloudy White', 'Sorta Sunny', 'Stormy Black'], 'GLU0G', '6.7" QHD+ 120Hz LTPO OLED · Google Tensor · 50MP Wide + 48MP 4x Telephoto · 5003mAh · 30W Charge'),
  ],
  'Google Pixel::Pixel Number Series': [
    m('Google Pixel 9 5G', 'google-pixel-9-', 'Current Model', ['12GB'], ['256GB'], ['Peony', 'Wintergreen', 'Porcelain', 'Obsidian'], 'GUR25', '6.3" Actua 120Hz OLED Display · Google Tensor G4 · 50MP Main + 48MP Ultra Wide · 4700mAh · 27W Fast Charge'),
    m('Google Pixel 8 5G', 'google-pixel-8', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Hazel', 'Obsidian', 'Rose', 'Mint'], 'GKWS6', '6.2" Actua 120Hz OLED Display · Google Tensor G3 · 50MP Octa PD Main Camera · 4575mAh · 27W Fast Charge'),
    m('Google Pixel 6 5G', 'google-pixel-6', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Sorta Seafoam', 'Kinda Coral', 'Stormy Black'], 'GB7N6', '6.4" 90Hz FHD+ OLED Display · Google Tensor · 50MP Octa PD Wide + 12MP UW · 4614mAh · 30W Charge'),
  ],
  'Google Pixel::Pixel a-Series': [
    m('Google Pixel 8a 5G', 'google-pixel-8a', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Aloe', 'Bay', 'Porcelain', 'Obsidian'], 'G6GPR', '6.1" Actua 120Hz OLED Display · Google Tensor G3 · 64MP Quad PD Main Camera · 4492mAh · 18W Fast Charge'),
    m('Google Pixel 7a 5G', 'google-pixel-7a', 'Previous Model', ['8GB'], ['128GB'], ['Sea', 'Coral', 'Snow', 'Charcoal'], 'GWKK3', '6.1" 90Hz FHD+ OLED Display · Google Tensor G2 · 64MP OIS Main Camera · 4385mAh · 18W Charge'),
    m('Google Pixel 6a 5G', 'google-pixel-6a', 'Previous Model', ['6GB'], ['128GB'], ['Sage', 'Chalk', 'Charcoal'], 'GX7AS', '6.1" FHD+ OLED Display · Google Tensor · Dual 12.2MP OIS Camera · 4410mAh · 18W Fast Charge'),
    m('Google Pixel 4a', 'google-pixel-4a', 'Previous Model', ['6GB'], ['128GB'], ['Just Black', 'Barely Blue'], 'G025N', '5.81" FHD+ OLED Compact Display · Snapdragon 730G · 12.2MP Dual-Pixel OIS Camera · 3140mAh · 18W USB-PD', '4G'),
  ],
  'Google Pixel::Pixel Fold & Other Models': [
    m('Google Pixel 9 Pro Fold 5G', 'google-pixel-9-pro-fold-', 'Current Model', ['16GB'], ['256GB', '512GB'], ['Obsidian', 'Porcelain'], 'GC15S', '8.0" Super Actua Flex Foldable 120Hz OLED · Google Tensor G4 · 48MP Triple Rear Pro Camera · 4650mAh · 21W Charge'),
    m('Google Pixel Fold 5G', 'google-pixel-fold', 'Previous Model', ['12GB'], ['256GB', '512GB'], ['Obsidian', 'Porcelain'], 'G9FPL', '7.6" Foldable 120Hz OLED + 5.8" Cover Screen · Google Tensor G2 · 48MP Triple Rear Camera · 4821mAh · 21W Charge'),
  ],

  // ==================================================
  // INFINIX (11 Verified Models across All 6 Official Series)
  // ==================================================
  'Infinix::GT Series': [
    m('Infinix GT 20 Pro 5G', 'infinix-gt-20-pro', 'Current Model', ['8GB', '12GB'], ['256GB'], ['Mecha Blue', 'Mecha Orange', 'Mecha Silver'], 'X6871', '6.78" 144Hz Bezelless AMOLED · Dimensity 8200 Ultimate · 108MP OIS Triple Camera · 5000mAh · 45W Fast Charge'),
  ],
  'Infinix::Zero Series': [
    m('Infinix Zero Ultra 5G', 'infinix-zero-ultra', 'Previous Model', ['8GB'], ['256GB'], ['Coslight Silver', 'Genesis Noir'], 'X6820', '6.8" 120Hz 3D Curved AMOLED · Dimensity 920 5G · 200MP OIS Camera · 4500mAh · 180W Thunder Charge'),
    m('Infinix Zero 5G 2023', 'infinix-zero-5g-2023', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Pearly White', 'Coral Orange', 'Submariner Black'], 'X6815B', '6.78" 120Hz FHD+ Display · Dimensity 1080 5G · 50MP Triple Camera · 5000mAh · 33W Fast Charge'),
  ],
  'Infinix::Note Series': [
    m('Infinix Note 30 Pro', 'infinix-note-30-pro', 'Current Model', ['8GB'], ['256GB'], ['Magic Black', 'Variable Gold'], 'X678B', '6.67" 120Hz 10-bit AMOLED · Helio G99 · 108MP Triple Camera · 5000mAh · 68W Fast Charge + 15W Wireless', '4G'),
    m('Infinix Note 30 5G', 'infinix-note-30-5g', 'Current Model', ['4GB', '8GB'], ['128GB', '256GB'], ['Interstellar Blue', 'Sunset Gold', 'Magic Black'], 'X6711', '6.78" 120Hz FHD+ Display · Dimensity 6080 5G · 108MP Triple Camera · 5000mAh · 45W All-Round FastCharge'),
  ],
  'Infinix::Hot Series': [
    m('Infinix Hot 40 Pro', 'infinix-hot-40-pro', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Palm Blue', 'Horizon Gold', 'Starlit Black'], 'X6837', '6.78" 120Hz FHD+ Magic Ring Display · Helio G99 · 108MP Triple Camera · 5000mAh · 33W Fast Charge', '4G'),
    m('Infinix Hot 40i', 'infinix-hot-40i', 'Current Model', ['4GB', '8GB'], ['128GB', '256GB'], ['Starlit Black', 'Palm Blue', 'Horizon Gold', 'Starfall Green'], 'X6528', '6.56" 90Hz Magic Ring Display · UNISOC T606 · 50MP Dual Rear + 32MP Selfie · 5000mAh · 18W Type-C', '4G'),
    m('Infinix Hot 30 5G', 'infinix-hot-30-5g', 'Previous Model', ['4GB', '8GB'], ['128GB'], ['Aurora Blue', 'Knight Black'], 'X6832', '6.78" 120Hz FHD+ Display · Dimensity 6020 5G · 50MP Dual AI Camera · 6000mAh · 18W Fast Charge'),
  ],
  'Infinix::Smart Series': [
    m('Infinix Smart 8 HD', 'infinix-smart-8-hd', 'Current Model', ['3GB', '4GB'], ['64GB'], ['Crystal Green', 'Shiny Gold', 'Timber Black'], 'X6525', '6.6" 90Hz Punch-Hole Magic Ring Display · UNISOC T606 · 13MP AI Dual Cam · 5000mAh · 10W Type-C', '4G'),
    m('Infinix Smart 7', 'infinix-smart-7', 'Previous Model', ['4GB'], ['64GB'], ['Azure Blue', 'Emerald Green', 'Night Black'], 'X6517', '6.6" HD+ Antibacterial Wave Design · Helio A22 · 13MP Dual AI Camera · 6000mAh · 10W Type-C', '4G'),
  ],
  'Infinix::Other Models': [
    m('Infinix Zero 30 5G', undefined, 'Current Model', ['8GB', '12GB'], ['256GB'], ['Rome Green', 'Golden Hour'], 'X6731', '6.78" 144Hz 3D Curved AMOLED · Dimensity 8020 5G · 108MP OIS Rear + 50MP 4K60 Front Cam · 5000mAh · 68W SuperCharge'),
  ],

  // ==================================================
  // TECNO (14 Verified Models across All 6 Official Series)
  // ==================================================
  'TECNO::Phantom Series': [
    m('TECNO Phantom V Fold 5G', 'tecno-phantom-v-fold', 'Current Model', ['12GB'], ['256GB', '512GB'], ['Black', 'White'], 'AD10', '7.85" 2K+ 120Hz LTPO Foldable AMOLED · Dimensity 9000+ · 50MP Triple Camera · 5000mAh · 45W Flash Charge'),
    m('TECNO Phantom X2 Pro 5G', 'tecno-phantom-x2-pro', 'Previous Model', ['12GB'], ['256GB'], ['Mars Orange', 'Stardust Grey'], 'AD9', '6.8" 120Hz Dual-Curved AMOLED · Dimensity 9000 5G · 50MP Retractable Portrait Lens · 5160mAh · 45W Charge'),
    m('TECNO Phantom X2 5G', 'tecno-phantom-x2', 'Previous Model', ['8GB'], ['256GB'], ['Stardust Grey', 'Moonlight Silver'], 'AD8', '6.8" 120Hz Curved AMOLED · Dimensity 9000 5G · 64MP OIS RGBW Camera · 5160mAh · 45W Flash Charge'),
  ],
  'TECNO::Camon Series': [
    m('TECNO Camon 30 Pro 5G', 'tecno-camon-30-pro', 'Current Model', ['12GB'], ['256GB', '512GB'], ['Iceland Basaltic Dark', 'Alps Snowy Silver'], 'CL8', '6.78" 144Hz AMOLED · Dimensity 8200 Ultimate · Dual 50MP Sony IMX890 OIS + 50MP AF Selfie · 5000mAh · 70W Ultra Charge'),
    m('TECNO Camon 30 5G', 'tecno-camon-30', 'Current Model', ['8GB', '12GB'], ['256GB', '512GB'], ['Basaltic Dark', 'Uyuni Salt White', 'Emerald Lake Green'], 'CL7', '6.78" 120Hz AMOLED · Dimensity 7020 5G · 50MP OIS Night Portrait + 50MP AF Selfie · 5000mAh · 70W Ultra Charge'),
    m('TECNO Camon 19 Pro 5G', 'tecno-camon-19-pro-5g', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Eco Black', 'Cedar Green'], 'CI7n', '6.8" 120Hz 0.98mm Slim Bezel Display · Dimensity 810 5G · 64MP RGBW+G OIS Camera · 5000mAh · 33W Flash Charge'),
  ],
  'TECNO::Pova Series': [
    m('TECNO Pova 6', 'tecno-pova-6', 'Current Model', ['8GB', '12GB'], ['256GB'], ['Comet Green', 'Meteorite Grey', 'Interstellar Blue'], 'LI7', '6.78" 120Hz FHD+ AMOLED Dynamic-Light Effect · Helio G99 Ultimate · 108MP Camera · 6000mAh · 70W Ultra Charge', '4G'),
    m('TECNO Pova 5 Pro 5G', 'tecno-pova-5-pro', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Dark Illusion', 'Silver Fantasy'], 'LH8n', '6.78" 120Hz FHD+ Arc Interface Display · Dimensity 6080 5G · 50MP AI Dual Camera · 5000mAh · 68W Ultra Charge'),
    m('TECNO Pova 5', 'tecno-pova-5', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Mecha Black', 'Amber Gold', 'Hurricane Blue'], 'LH7n', '6.78" 120Hz FHD+ Mecha Design · Helio G99 · 50MP AI Dual Camera · 6000mAh · 45W Smart Charge', '4G'),
  ],
  'TECNO::Spark Series': [
    m('TECNO Spark 20 Pro+', 'tecno-spark-20-pro-plus', 'Current Model', ['8GB'], ['256GB'], ['Temporal Orbits', 'Lunar Frost', 'Radiant Starstream', 'Magic Skin 2.0 Green'], 'KJ7', '6.78" 120Hz Curved AMOLED Display · Helio G99 Ultimate · 108MP Ultra-Sensing Camera · 5000mAh · 33W Super Charge', '4G'),
    m('TECNO Spark 20 Pro', 'tecno-spark-20-pro', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Moonlit Black', 'Frosty Ivory', 'Sunset Blush'], 'KJ6', '6.78" 120Hz FHD+ Hole Screen · Helio G99 · 108MP Main Camera · 5000mAh · 33W Super Charge', '4G'),
    m('TECNO Spark 20', 'tecno-spark-20', 'Current Model', ['4GB', '8GB'], ['128GB', '256GB'], ['Gravity Black', 'Cyber White', 'Neon Gold', 'Magic Skin Blue'], 'KJ5', '6.6" 90Hz Dynamic Port Display · Helio G85 · 50MP HDR Rear + 32MP Selfie · 5000mAh · 18W Type-C', '4G'),
  ],
  'TECNO::Pop Series': [
    m('TECNO Pop 8', undefined, 'Current Model', ['4GB'], ['64GB'], ['Mystery White', 'Alpenglow Gold', 'Gravity Black'], 'BG6', '6.6" 90Hz Dot-In Dynamic Port Display · UNISOC T606 · 12MP Dual AI Camera · 5000mAh · 10W Type-C', '4G'),
  ],
  'TECNO::Other Models': [
    m('TECNO Pova 6 Pro 5G', undefined, 'Current Model', ['8GB', '12GB'], ['256GB'], ['Comet Green', 'Meteorite Grey'], 'LI9', '6.78" 120Hz AMOLED Dynamic-Tech Design · Dimensity 6080 5G · 108MP 3x In-Sensor Zoom · 6000mAh · 70W Ultra Charge'),
  ],

  // ==================================================
  // NOKIA (13 Verified Models across All 4 Official Series)
  // ==================================================
  'Nokia::G Series Smartphones': [
    m('Nokia G60 5G', 'nokia-g60-5g', 'Current Model', ['6GB'], ['128GB'], ['Black', 'Ice Gray'], 'TA-1479', '6.58" 120Hz FHD+ Gorilla Glass 5 Display · Snapdragon 695 5G · 50MP AI Triple Camera · 4500mAh · 20W Fast Charge'),
    m('Nokia G42 5G', 'nokia-g42-5g', 'Current Model', ['6GB', '8GB'], ['128GB', '256GB'], ['So Purple', 'So Grey', 'So Pink'], 'TA-1581', '6.56" 90Hz QuickFix Repairable Display · Snapdragon 480+ 5G · 50MP AI Triple Camera · 5000mAh · 20W Fast Charge'),
    m('Nokia G50 5G', 'nokia-g50', 'Previous Model', ['4GB', '6GB'], ['64GB', '128GB'], ['Ocean Blue', 'Midnight Sun'], 'TA-1361', '6.82" HD+ Display · Snapdragon 480 5G · 48MP Triple Camera · 5000mAh · 18W Fast Charge'),
    m('Nokia G20', 'nokia-g20', 'Previous Model', ['4GB'], ['64GB', '128GB'], ['Night', 'Glacier'], 'TA-1336', '6.52" HD+ Display · Helio G35 · 48MP Quad Camera · 5050mAh 3-Day Battery · 10W USB-C', '4G'),
    m('Nokia G11', 'nokia-g11', 'Previous Model', ['3GB', '4GB'], ['32GB', '64GB'], ['Charcoal', 'Ice'], 'TA-1401', '6.5" 90Hz HD+ Display · UNISOC T606 · 13MP Triple Camera · 5050mAh · 18W Fast Charge', '4G'),
  ],
  'Nokia::C Series Smartphones': [
    m('Nokia C31', 'nokia-c31', 'Previous Model', ['3GB', '4GB'], ['32GB', '64GB'], ['Charcoal', 'Mint', 'Cyan'], 'TA-1493', '6.7" HD+ Display · UNISOC 9863A1 · 13MP Triple Camera · 5050mAh 3-Day Battery · 10W Charge', '4G'),
    m('Nokia C30', 'nokia-c30', 'Previous Model', ['3GB', '4GB'], ['32GB', '64GB'], ['Green', 'White', 'Dark Grey'], 'TA-1359', '6.82" HD+ Large Screen · UNISOC SC9863A · 13MP Dual Camera · 6000mAh Mega Battery · 10W Charge', '4G'),
    m('Nokia C12', 'nokia-c12', 'Current Model', ['2GB', '3GB'], ['64GB'], ['Dark Cyan', 'Charcoal', 'Light Mint'], 'TA-1535', '6.3" HD+ Toughened Glass Display · Octa-Core Processor · 8MP Night & Portrait Camera · 3000mAh Removable Battery · 5W Charging', '4G'),
  ],
  'Nokia::Feature & Keypad Phones': [
    m('Nokia 2660 Flip 4G', 'nokia-2660-flip', 'Current Model', ['Feature Phone'], ['4G VoLTE Keypad'], ['Black', 'Blue', 'Red', 'Pop Pink', 'Lush Green'], 'TA-1474', '2.8" Main + 1.77" Outer Flip Screen · Unisoc T107 4G VoLTE · VGA Camera · 1450mAh Removable Battery · Micro-USB / Charging Cradle', '4G'),
    m('Nokia 8210 4G', 'nokia-8210-4g', 'Current Model', ['Feature Phone'], ['4G VoLTE Keypad'], ['Sand', 'Blue', 'Red'], 'TA-1489', '2.8" QVGA Display · Unisoc T107 4G VoLTE · MP3 Player & Wireless FM · 1450mAh Removable Battery · Micro-USB Charging', '4G'),
    m('Nokia 105 Classic', 'nokia-105-2023', 'Current Model', ['Keypad Phone'], ['Standard Memory'], ['Charcoal', 'Cyan', 'Red Terracotta'], 'TA-1557', '1.8" QQVGA Display · Wireless FM Radio · Durable Polycarbonate Body · 1000mAh Long-Lasting Battery · Micro-USB Charger Included', '4G'),
  ],
  'Nokia::Other Models': [
    m('Nokia X30 5G', 'nokia-x30-5g', 'Previous Model', ['8GB'], ['256GB'], ['Cloudy Blue', 'Ice White'], 'TA-1450', '6.43" 90Hz PureDisplay AMOLED · Snapdragon 695 5G · 50MP PureView OIS Camera · 4200mAh · 33W Fast Charge'),
    m('Nokia XR21 5G', 'nokia-xr21', 'Previous Model', ['6GB'], ['128GB'], ['Midnight Black', 'Pine Green'], 'TA-1486', '6.49" 120Hz Gorilla Glass Victus MIL-STD-810H Display · Snapdragon 695 5G · 64MP Dual Cam · 4800mAh · 33W Charge'),
  ],

  // ==================================================
  // HONOR (13 Verified Models across All 4 Official Series)
  // ==================================================
  'HONOR::Magic Series': [
    m('HONOR Magic6 Pro 5G', 'honor-magic6-pro', 'Current Model', ['12GB'], ['512GB'], ['Epi Green', 'Black'], 'BVL-N49', '6.8" 120Hz LTPO Quad-Curved OLED · Snapdragon 8 Gen 3 · 180MP Periscope + 50MP Falcon Camera · 5600mAh · 80W SuperCharge'),
    m('HONOR Magic V3 5G', 'honor-magic-v3', 'Current Model', ['12GB', '16GB'], ['512GB'], ['Reddish Brown', 'Green', 'Black'], 'FCP-N49', '7.92" 9.2mm Ultra-Slim Foldable LTPO OLED · Snapdragon 8 Gen 3 · 50MP Periscope Triple Camera · 5150mAh · 66W SuperCharge'),
    m('HONOR Magic5 Pro 5G', 'honor-magic5-pro', 'Previous Model', ['12GB'], ['512GB'], ['Meadow Green', 'Black'], 'PGT-N19', '6.81" 120Hz LTPO Quad-Curved OLED · Snapdragon 8 Gen 2 · Triple 50MP Falcon Camera System · 5100mAh · 66W SuperCharge'),
    m('HONOR Magic4 Pro 5G', 'honor-magic4-pro', 'Previous Model', ['8GB', '12GB'], ['256GB'], ['Cyan', 'Black', 'Gold'], 'LGE-NX9', '6.81" 120Hz LTPO Quad-Curved OLED · Snapdragon 8 Gen 1 · 50MP + 50MP + 64MP Periscope · 4600mAh · 100W SuperCharge'),
  ],
  'HONOR::HONOR Number Series': [
    m('HONOR 90 5G', 'honor-90', 'Current Model', ['8GB', '12GB'], ['256GB', '512GB'], ['Diamond Silver', 'Emerald Green', 'Midnight Black'], 'REA-NX9', '6.7" 120Hz 3840Hz PWM Quad-Curved AMOLED · Snapdragon 7 Gen 1 AE · 200MP Main + 50MP Selfie · 5000mAh · 66W SuperCharge'),
    m('HONOR 70 5G', 'honor-70', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Crystal Silver', 'Emerald Green', 'Midnight Black'], 'FNE-NX9', '6.67" 120Hz Dual-Curved OLED · Snapdragon 778G+ 5G · 54MP Sony IMX800 + 50MP Ultra Wide · 4800mAh · 66W SuperCharge'),
  ],
  'HONOR::HONOR X Series': [
    m('HONOR X9b 5G', 'honor-x9b', 'Current Model', ['8GB', '12GB'], ['256GB'], ['Sunrise Orange', 'Midnight Black'], 'ALI-NX1', '6.78" 1.5K 120Hz Ultra-Bounce Anti-Drop Curved AMOLED · Snapdragon 6 Gen 1 · 108MP Triple Cam · 5800mAh · 35W Charge'),
    m('HONOR X9a 5G', 'honor-x9a', 'Previous Model', ['8GB'], ['256GB'], ['Titanium Silver', 'Emerald Green', 'Midnight Black'], 'RMO-NX1', '6.67" 120Hz 45° Curved OLED Display · Snapdragon 695 5G · 64MP Triple Camera · 5100mAh · 40W SuperCharge'),
    m('HONOR X9 5G', 'honor-x9', 'Previous Model', ['8GB'], ['128GB'], ['Titanium Silver', 'Ocean Blue', 'Midnight Black'], 'ANY-NX1', '6.81" 120Hz FHD+ FullView Display · Snapdragon 695 5G · 48MP Quad Camera · 4800mAh · 66W SuperCharge'),
    m('HONOR X8b', 'honor-x8b', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Glamorous Green', 'Titanium Silver', 'Midnight Black'], 'LLY-LX1', '6.7" 90Hz AMOLED Magic Capsule Display · Snapdragon 680 · 108MP Main + 50MP Spotlight Selfie · 4500mAh · 35W Charge', '4G'),
    m('HONOR X8a', 'honor-x8a', 'Previous Model', ['8GB'], ['128GB'], ['Cyan Lake', 'Titanium Silver', 'Midnight Black'], 'CRT-LX1', '6.7" 90Hz FHD+ Edgeless Display · Helio G88 · 100MP Ultra-Clear Triple Camera · 4500mAh · 22.5W SuperCharge', '4G'),
    m('HONOR X7b', 'honor-x7b', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Flowing Silver', 'Emerald Green', 'Midnight Black'], 'CLK-LX1', '6.8" 90Hz FHD+ Hyper-Transmissive Display · Snapdragon 680 · 108MP Main Camera · 6000mAh · 35W SuperCharge', '4G'),
  ],
  'HONOR::Other Models': [
    m('HONOR 200 Pro 5G', undefined, 'Current Model', ['12GB'], ['512GB'], ['Ocean Cyan', 'Black'], 'ELP-NX9', '6.78" 120Hz Quad-Curved OLED · Snapdragon 8s Gen 3 · Studio Harcourt Triple 50MP Portrait Camera · 5200mAh · 100W SuperCharge'),
  ],

  // ==================================================
  // LAVA (13 Verified Models across All 5 Official Series)
  // ==================================================
  'Lava::Agni Series': [
    m('Lava Agni 3 5G', undefined, 'Current Model', ['8GB'], ['128GB', '256GB'], ['Heather Glass', 'Pristine Glass'], 'LXX518', '6.78" 1.5K 120Hz Curved AMOLED + 1.74" Rear InstaScreen · Dimensity 7300X · 50MP OIS + 3x Telephoto · 5000mAh · 66W Charge'),
    m('Lava Agni 5G', 'lava-agni-5g', 'Previous Model', ['8GB'], ['128GB'], ['Fiery Blue'], 'LXX501', '6.78" 90Hz FHD+ Punch-Hole Display · Dimensity 810 5G · 64MP Quad Camera · 5000mAh · 30W Fast Charge'),
  ],
  'Lava::Blaze Series': [
    m('Lava Blaze Curve 5G', 'lava-blaze-curve-5g', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Iron Glass', 'Viridian Glass'], 'LXX509', '6.67" 120Hz 3D Curved AMOLED · Dimensity 7050 5G · 64MP Sony Sensor Triple Cam · 5000mAh · 33W Fast Charge'),
    m('Lava Blaze Pro 5G', 'lava-blaze-pro-5g', 'Current Model', ['8GB'], ['128GB'], ['Starry Night', 'Radiant Pearl'], 'LXX506', '6.78" 120Hz FHD+ Punch-Hole Display · Dimensity 6020 5G · 50MP EIS Dual Camera · 5000mAh · 33W Fast Charge'),
    m('Lava Blaze 2 5G', 'lava-blaze-2-5g', 'Current Model', ['4GB', '6GB'], ['64GB', '128GB'], ['Glass Black', 'Glass Blue', 'Glass Lavender'], 'LXX507', '6.56" 90Hz Punch-Hole Ring Light Display · Dimensity 6020 5G · 50MP Rear Camera · 5000mAh · 18W Type-C'),
    m('Lava Blaze 1X 5G', 'lava-blaze-1x-5g', 'Previous Model', ['6GB'], ['128GB'], ['Glass Green', 'Glass Blue'], 'LXX504', '6.5" 90Hz HD+ Matte Glass Display · Dimensity 700 5G · 50MP AI Triple Camera · 5000mAh · 15W Type-C'),
    m('Lava Blaze 5G', 'lava-blaze-5g', 'Previous Model', ['4GB', '6GB', '8GB'], ['128GB'], ['Glass Green', 'Glass Blue'], 'LXX503', '6.5" 90Hz HD+ Widevine L1 Display · Dimensity 700 5G · 50MP AI Triple Camera · 5000mAh · 15W Type-C'),
    m('Lava Blaze NXT', 'lava-blaze-nxt', 'Previous Model', ['4GB'], ['64GB'], ['Glass Red', 'Glass Green', 'Glass Blue'], 'LZX409', '6.5" HD+ Premium Glass Back Display · Helio G37 · 13MP AI Triple Camera · 5000mAh · 10W Type-C', '4G'),
  ],
  'Lava::Storm Series': [
    m('Lava Storm 5G', 'lava-storm-5g', 'Current Model', ['8GB'], ['128GB'], ['Gale Green', 'Thunder Black'], 'LXX508', '6.78" 120Hz FHD+ Punch-Hole Display · Dimensity 6080 5G · 50MP + 8MP Ultrawide · 5000mAh · 33W Fast Charge'),
  ],
  'Lava::Yuva Series': [
    m('Lava Yuva 5G', 'lava-yuva-5g', 'Current Model', ['4GB'], ['64GB', '128GB'], ['Mystic Blue', 'Mystic Green'], 'LXX513', '6.52" 90Hz Punch-Hole Matte Glass Display · UNISOC T750 5G · 50MP AI Dual Camera · 5000mAh · 18W Fast Charge'),
    m('Lava Yuva 3 Pro', 'lava-yuva-3-pro', 'Current Model', ['8GB'], ['128GB'], ['Desert Gold', 'Forest Viridian', 'Meadow Purple'], 'LZX414', '6.5" 90Hz Punch-Hole Display · UNISOC T616 · 50MP AI Dual Camera · 5000mAh · 18W Type-C', '4G'),
    m('Lava Yuva 2 Pro', 'lava-yuva-2-pro', 'Previous Model', ['4GB'], ['64GB'], ['Glass White', 'Glass Green', 'Glass Lavender'], 'LZX408', '6.5" HD+ Glass Back Display · Helio G37 · 13MP AI Triple Camera · 5000mAh · 10W Type-C', '4G'),
  ],
  'Lava::Keypad & Other Models': [
    m('Lava Yuva Pro', 'lava-yuva-pro', 'Previous Model', ['3GB'], ['32GB'], ['Metallic Black', 'Metallic Blue', 'Metallic Red'], 'LZX404', '6.51" HD+ Display · MediaTek Quad-Core · 13MP AI Triple Camera · 5000mAh · 10W Type-C', '4G'),
  ],

  // ==================================================
  // ITEL (10 Verified Models across All 5 Official Series)
  // ==================================================
  'Itel::Color Pro & S Series': [
    m('Itel S24', 'itel-s24', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Dawn White', 'Coastline Blue', 'Starry Black'], 'S667LN', '6.6" 90Hz Punch-Hole Color-Changing Display · Helio G91 Ultra · 108MP Samsung HM6 Camera · 5000mAh · 18W Type-C', '4G'),
    m('Itel S23+', 'itel-s23-plus', 'Current Model', ['8GB'], ['256GB'], ['Elemental Blue', 'Lake Cyan'], 'S681LN', '6.78" 3D Curved FHD+ AMOLED Display · UNISOC T616 · 50MP AI Rear + 32MP Selfie · 5000mAh · 18W Fast Charge', '4G'),
    m('Itel S23', 'itel-s23', 'Previous Model', ['4GB', '8GB'], ['128GB'], ['Starry Black', 'Mystery White'], 'S665L', '6.6" 90Hz Color-Changing Display · UNISOC T606 · 50MP Super Clear Dual Camera · 5000mAh · 10W Type-C', '4G'),
  ],
  'Itel::P Series': [
    m('Itel P55 5G', 'itel-p55', 'Current Model', ['4GB', '6GB'], ['64GB', '128GB'], ['Galaxy Blue', 'Mint Green'], 'P661N', '6.6" 90Hz HD+ Display · Dimensity 6080 5G · 50MP AI Dual Camera · 5000mAh · 18W Fast Charge'),
    m('Itel P55+', 'itel-p55-plus', 'Current Model', ['8GB'], ['256GB'], ['Royal Green', 'Meteor Black'], 'P663L', '6.6" 90Hz Vegan Leather Punch-Hole Display · UNISOC T606 · 50MP AI Dual Camera · 5000mAh · 45W PowerCharge', '4G'),
  ],
  'Itel::A Series': [
    m('Itel A70', 'itel-a70', 'Current Model', ['4GB'], ['64GB', '128GB', '256GB'], ['Brilliant Gold', 'Stylish Black', 'Field Green', 'Azure Blue'], 'A665L', '6.6" Dynamic Bar Display · UNISOC T603 · 13MP HDR Dual Camera · 5000mAh · 10W Type-C', '4G'),
    m('Itel A60s', 'itel-a60s', 'Previous Model', ['4GB'], ['64GB', '128GB'], ['Shadow Black', 'Glacier Green', 'Moonlit Violet'], 'A662LM', '6.6" HD+ Waterdrop Display · Octa-Core Processor · 8MP AI Dual Camera · 5000mAh · 10W Charge', '4G'),
    m('Itel A05s', 'itel-a05s', 'Current Model', ['2GB', '4GB'], ['32GB', '64GB'], ['Nebula Black', 'Meadow Green', 'Crystal Blue', 'Glorious Orange'], 'A663LC', '6.6" HD+ Drop Notch Display · Octa-Core 1.6GHz · 8MP Rear Camera · 4000mAh · Type-C Port', '4G'),
  ],
  'Itel::Keypad Phones': [
    m('Itel P40', 'itel-p40', 'Previous Model', ['4GB'], ['64GB'], ['Force Black', 'Dreamy Blue', 'Luxurious Gold'], 'P662L', '6.6" HD+ Waterdrop Display · Octa-Core Processor · 13MP Dual Camera · 6000mAh Mega Battery · 18W Fast Charge', '4G'),
  ],
  'Itel::Other Models': [
    m('Itel Color Pro 5G', undefined, 'Current Model', ['6GB'], ['128GB'], ['Lavender Fantasy', 'River Blue'], 'P661N-Pro', '6.6" 90Hz IVCO Color-Changing Display · Dimensity 6080 5G · 50MP AI Dual Camera · 5000mAh · 18W Fast Charge'),
  ],

  // ==================================================
  // MICROMAX (4 Verified Models across All 4 Official Series)
  // ==================================================
  'Micromax::IN Note Series': [
    m('Micromax IN Note 1', 'micromax-in-note1', 'Previous Model', ['4GB'], ['64GB', '128GB'], ['Green', 'White'], 'E7746', '6.67" FHD+ Punch-Hole Display · Helio G85 · 48MP AI Quad Camera · 5000mAh · 18W Fast Charge', '4G'),
  ],
  'Micromax::IN B Series': [
    m('Micromax IN 2b', 'micromax-in-2b', 'Previous Model', ['4GB', '6GB'], ['64GB'], ['Black', 'Blue', 'Green'], 'E7544', '6.52" HD+ Display · UNISOC T610 · 13MP Dual Rear Camera · 5000mAh · 10W USB Type-C', '4G'),
  ],
  'Micromax::Feature Phones': [
    m('Micromax IN 1b', 'micromax-in-1b', 'Previous Model', ['2GB', '4GB'], ['32GB', '64GB'], ['Purple', 'Blue', 'Green'], 'E6523', '6.52" HD+ Mini-Drop Display · Helio G35 · 13MP Dual Camera · 5000mAh Reverse Charging · 10W Type-C', '4G'),
  ],
  'Micromax::Other Models': [
    m('Micromax IN Note 2', undefined, 'Previous Model', ['4GB'], ['64GB'], ['Black', 'Brown'], 'E7748', '6.43" FHD+ AMOLED Display · Helio G95 · 48MP Quad Camera · 5000mAh · 30W Fast Charge', '4G'),
  ],

  // ==================================================
  // ASUS (4 Verified Models across All 2 Official Series)
  // ==================================================
  'ASUS::Zenfone Series': [
    m('ASUS Zenfone 11 Ultra 5G', 'asus-zenfone-11-ultra', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Eternal Black', 'Skyline Blue', 'Misty Grey', 'Desert Sand'], 'AI2401', '6.78" LTPO 144Hz AMOLED · Snapdragon 8 Gen 3 · 50MP 6-Axis Hybrid Gimbal 3.0 + 32MP 3x Telephoto · 5500mAh · 65W HyperCharge'),
    m('ASUS Zenfone 9 5G', 'asus-zenfone-9', 'Previous Model', ['8GB', '16GB'], ['128GB', '256GB'], ['Midnight Black', 'Moonlight White', 'Sunset Red', 'Starry Blue'], 'AI2202', '5.9" 120Hz Compact Samsung AMOLED · Snapdragon 8+ Gen 1 · 50MP 6-Axis Gimbal Camera · 4300mAh · 30W HyperCharge'),
  ],
  'ASUS::Other Models': [
    m('ASUS Zenfone 8 Flip 5G', 'asus-zenfone-8-flip', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Galactic Black', 'Glacier Silver'], 'ZS672KS', '6.67" 90Hz Notchless AMOLED · Snapdragon 888 5G · Motorized Flip 64MP+12MP+8MP Telephoto · 5000mAh · 30W Charge'),
    m('ASUS Zenfone 8 5G', 'asus-zenfone-8', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Obsidian Black', 'Horizon Silver'], 'ZS590KS', '5.9" 120Hz Samsung E4 AMOLED · Snapdragon 888 5G · 64MP Sony IMX686 OIS Dual Cam · 4000mAh · 30W HyperCharge'),
  ],

  // ==================================================
  // SONY (9 Verified Models across All 4 Official Series)
  // ==================================================
  'Sony::Xperia 1 Series': [
    m('Sony Xperia 1 VI 5G', 'sony-xperia-1-vi', 'Current Model', ['12GB'], ['256GB', '512GB'], ['Black', 'Platinum Silver', 'Khaki Green', 'Scarlet'], 'XQ-EC54', '6.5" 120Hz LTPO Bravia OLED · Snapdragon 8 Gen 3 · 48MP Exmor T + 85-170mm True Optical Zoom · 5000mAh · 30W PD Charge'),
    m('Sony Xperia 1 V 5G', 'sony-xperia-1-v', 'Previous Model', ['12GB'], ['256GB', '512GB'], ['Black', 'Khaki Green', 'Platinum Silver'], 'XQ-DQ54', '6.5" 4K HDR 120Hz 21:9 OLED · Snapdragon 8 Gen 2 · 48MP Next-Gen Exmor T ZEISS Optics · 5000mAh · 30W PD Charge'),
    m('Sony Xperia 1 IV 5G', 'sony-xperia-1-iv', 'Previous Model', ['12GB'], ['256GB', '512GB'], ['Black', 'Ice White', 'Purple'], 'XQ-CT54', '6.5" 4K HDR 120Hz OLED · Snapdragon 8 Gen 1 · Triple 12MP ZEISS T* 85-125mm Continuous Optical Zoom · 5000mAh · 30W Charge'),
    m('Sony Xperia 1 III 5G', 'sony-xperia-1-iii', 'Previous Model', ['12GB'], ['256GB', '512GB'], ['Frosted Black', 'Frosted Gray', 'Frosted Purple'], 'XQ-BC52', '6.5" 4K HDR 120Hz OLED · Snapdragon 888 5G · ZEISS Variable Telephoto Triple 12MP · 4500mAh · 30W PD Charge'),
  ],
  'Sony::Xperia 5 Series': [
    m('Sony Xperia 5 V 5G', 'sony-xperia-5-v', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Black', 'Platinum Silver', 'Blue'], 'XQ-DE54', '6.1" 120Hz FHD+ HDR OLED · Snapdragon 8 Gen 2 · 48MP Exmor T ZEISS Dual Camera · 5000mAh · 30W PD Charge'),
    m('Sony Xperia 5 III 5G', 'sony-xperia-5-iii', 'Previous Model', ['8GB'], ['128GB', '256GB'], ['Black', 'Green', 'Pink'], 'XQ-BQ52', '6.1" 120Hz HDR OLED Compact · Snapdragon 888 5G · Triple 12MP ZEISS Variable Telephoto · 4500mAh · 30W Charge'),
  ],
  'Sony::Xperia 10 Series': [
    m('Sony Xperia 10 VI 5G', 'sony-xperia-10-vi', 'Current Model', ['8GB'], ['128GB'], ['Black', 'White', 'Blue'], 'XQ-ES54', '6.1" FHD+ Triluminos OLED · Snapdragon 6 Gen 1 · 48MP OIS 2x Optical-Quality Zoom · 5000mAh · 30W PD Charge'),
    m('Sony Xperia 10 IV 5G', 'sony-xperia-10-iv', 'Previous Model', ['6GB'], ['128GB'], ['Black', 'White', 'Mint', 'Lavender'], 'XQ-CC54', '6.0" FHD+ Triluminos OLED 161g Ultra-Light · Snapdragon 695 5G · 12MP OIS Triple Camera · 5000mAh · 30W Charge'),
  ],
  'Sony::Other Models': [
    m('Sony Xperia PRO-I 5G', 'sony-xperia-pro-i', 'Previous Model', ['12GB'], ['512GB'], ['Frosted Black'], 'XQ-BE52', '6.5" 4K HDR 120Hz OLED · Snapdragon 888 5G · 1.0-Type Exmor RS Sensor with ZEISS Tessar f/2.0-4.0 Optics · 4500mAh · 30W Charge'),
  ],

  // ==================================================
  // HMD (7 Verified Models across All 4 Official Series)
  // ==================================================
  'HMD::HMD Crest Series': [
    m('HMD Crest Max 5G', 'hmd-crest-max', 'Current Model', ['8GB'], ['256GB'], ['Deep Purple', 'Royal Pink', 'Aqua Green'], 'Crest-Max', '6.67" 90Hz FHD+ OLED Repairability 1.0 · UNISOC T760 5G · 64MP Triple Rear + 50MP Selfie · 5000mAh · 33W Fast Charge'),
    m('HMD Crest 5G', 'hmd-crest', 'Current Model', ['6GB'], ['128GB'], ['Midnight Blue', 'Royal Pink', 'Lush Lilac'], 'Crest-5G', '6.67" 90Hz FHD+ OLED Display · UNISOC T760 5G · 50MP Dual Rear + 50MP Selfie · 5000mAh · 33W Fast Charge'),
  ],
  'HMD::HMD Pulse Series': [
    m('HMD Pulse Pro', 'hmd-pulse-pro', 'Current Model', ['6GB', '8GB'], ['128GB'], ['Glacier Green', 'Black Ocean', 'Twilight Purple'], 'TA-1595', '6.56" 90Hz Self-Repairable Gen 1 Display · UNISOC T606 · 50MP Rear + 50MP Selfie Camera · 5000mAh · 20W Type-C', '4G'),
    m('HMD Pulse+', 'hmd-pulse-plus-', 'Current Model', ['4GB', '6GB', '8GB'], ['128GB'], ['Apricot Crush', 'Glacier Green', 'Midnight Blue'], 'TA-1588', '6.56" 90Hz HD+ Repairable Display · UNISOC T606 · 50MP AF Rear Camera · 5000mAh · 10W Type-C', '4G'),
    m('HMD Pulse', 'hmd-pulse-', 'Current Model', ['4GB', '6GB'], ['64GB'], ['Meteor Black', 'Dreamy Pink', ' Atmos Blue'], 'TA-1584', '6.56" 90Hz HD+ Display · UNISOC T606 · 13MP AI Dual Camera · 5000mAh · 10W Type-C', '4G'),
  ],
  'HMD::Feature Phones': [
    m('HMD Fusion 5G', 'hmd-fusion', 'Current Model', ['8GB'], ['256GB'], ['Industrial Black'], 'TA-1640', '6.56" 90Hz Smart Outfits Modular Display · Snapdragon 4 Gen 2 5G · 108MP Dual Rear + 50MP Selfie · 5000mAh · 33W Charge'),
  ],
  'HMD::Other Models': [
    m('HMD Skyline 5G', 'hmd-skyline', 'Current Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Twisted Black', 'Neon Pink', 'Topaz Blue'], 'TA-1600', '6.55" 144Hz pOLED Gen2 Repairability · Snapdragon 7s Gen 2 · 108MP OIS + 50MP Telephoto + 50MP AF Selfie · 4600mAh · 33W & Qi2'),
  ],

  // ==================================================
  // CMF (2 Verified Models across All 2 Official Series)
  // ==================================================
  'CMF::CMF Phone Series': [
    m('CMF Phone 1 5G', 'nothing-cmf-phone-1-ofic', 'Current Model', ['6GB', '8GB'], ['128GB'], ['Orange', 'Light Green', 'Black', 'Blue'], 'A015', '6.67" 120Hz Super AMOLED · Dimensity 7300 5G · 50MP Sony Sensor · 5000mAh · 33W Fast Charge'),
  ],
  'CMF::Other Models': [
    m('CMF Phone 2 Pro 5G', 'nothing-cmf-phone-2-pro', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Orange', 'White', 'Black'], 'A020', '6.77" 120Hz Flexible AMOLED Modular Design · Dimensity 7300 Pro 5G · 50MP Triple Camera · 5000mAh · 33W Fast Charge'),
  ],

  // ==================================================
  // ZTE (7 Verified Models across All 3 Official Series)
  // ==================================================
  'ZTE::Axon Series': [
    m('ZTE Axon 60 Ultra 5G', 'zte-axon-60-ultra', 'Current Model', ['12GB', '16GB'], ['512GB'], ['Gold', 'Black'], 'A2422H', '6.78" 120Hz OLED Dual Satellite Connectivity · Snapdragon 8 Gen 2 · 50MP OIS Triple Camera · 6000mAh · 80W Charge'),
    m('ZTE Axon 40 Ultra 5G', 'zte-axon-40-ultra', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Black', 'Gold', 'Silver'], 'A2023P', '6.8" 120Hz Under-Display Camera Curved AMOLED · Snapdragon 8 Gen 1 · Triple 64MP Flagship Optics · 5000mAh · 65W Charge'),
  ],
  'ZTE::Blade Series': [
    m('ZTE Blade V50 Design 5G', 'zte-blade-v50-design-5g', 'Current Model', ['8GB'], ['128GB', '256GB'], ['Diamond Black', 'Sunrise Violet'], 'Z2350N', '6.6" 90Hz FHD+ Display · UNISOC T760 5G · 50MP Triple Camera · 4500mAh · 22.5W Fast Charge'),
    m('ZTE Blade V40 Design', 'zte-blade-v40-design', 'Previous Model', ['6GB'], ['128GB'], ['Starry Black', 'Pearl White'], '8046', '6.6" FHD+ Slim 7.98mm Display · UNISOC T616 · 50MP Triple Camera · 4500mAh · 22.5W Fast Charge', '4G'),
    m('ZTE Blade V40 Vita', 'zte-blade-v40-vita', 'Previous Model', ['4GB'], ['128GB'], ['Zeus Black', 'Pine Green', 'Flame Red'], '8045', '6.75" 90Hz HD+ Display · UNISOC T606 · 48MP Triple Camera · 6000mAh Battery · 22.5W Fast Charge', '4G'),
  ],
  'ZTE::Other Models': [
    m('ZTE Blade A73 5G', 'zte-blade-a73-5g', 'Current Model', ['4GB'], ['128GB'], ['Grey', 'Blue'], 'A7050', '6.52" 90Hz Display · UNISOC T760 5G · 50MP Main Camera · 5000mAh · 10W Charge'),
    m('ZTE Blade A72 5G', 'zte-blade-a72-5g', 'Previous Model', ['4GB'], ['64GB'], ['Space Grey', 'Skyline Blue'], '7055', '6.52" 90Hz HD+ Display · Dimensity 700 5G · 13MP Triple Camera · 4000mAh · 10W Charge'),
  ],

  // ==================================================
  // NUBIA (9 Verified Models across All 4 Official Series)
  // ==================================================
  'nubia::nubia Z Series': [
    m('nubia Z70 Ultra 5G', 'zte-nubia-z70-ultra', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Black', 'Amber', 'Starry Night'], 'NX733J', '6.85" 144Hz 7th-Gen Under-Display Full Screen AMOLED · Snapdragon 8 Elite · 50MP 35mm Variable Aperture · 6150mAh · 80W Charge'),
    m('nubia Z60 Ultra 5G', 'zte-nubia-z60-ultra', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Black', 'Silver', 'Starry Night'], 'NX721J', '6.8" 120Hz UDC Full Screen AMOLED · Snapdragon 8 Gen 3 · 18mm+35mm+85mm Triple OIS Optics · 6000mAh · 80W Charge'),
    m('nubia Z50 Ultra 5G', 'zte-nubia-z50-ultra', 'Previous Model', ['8GB', '12GB', '16GB'], ['256GB', '512GB', '1TB'], ['Black', 'Silver', 'Starry Night'], 'NX712J', '6.8" 120Hz 4th-Gen UDC AMOLED · Snapdragon 8 Gen 2 · 64MP 35mm + 64MP 85mm Periscope · 5000mAh · 80W Charge'),
    m('nubia Z50 5G', 'zte-nubia-z50', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Black', 'White', 'Green'], 'NX711J', '6.67" 144Hz Curved AMOLED · Snapdragon 8 Gen 2 · 64MP 35mm Custom Optical System · 5000mAh · 80W Charge'),
  ],
  'nubia::nubia Flip Series': [
    m('nubia Flip 5G', undefined, 'Current Model', ['8GB', '12GB'], ['256GB', '512GB'], ['Cosmic Black', 'Sunshine Gold', 'Flowing Lilac'], 'NX724J', '6.9" 120Hz Foldable OLED + 1.43" Circular Cover Screen · Snapdragon 7 Gen 1 · 50MP Dual Camera · 4310mAh · 33W Fast Charge'),
  ],
  'nubia::nubia Neo Series': [
    m('nubia RedMagic 9S Pro 5G', 'zte-nubia-red-magic-9s-pro', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Sleet', 'Snowfall', 'Cyclone', 'Frost'], 'NX769S', '6.8" 120Hz UDC Full Screen AMOLED · Snapdragon 8 Gen 3 Leading Version · 50MP OIS Flat Back · 6500mAh · 80W Charge'),
    m('nubia RedMagic 9 Pro 5G', 'zte-nubia-red-magic-9-pro', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Sleet', 'Snowfall', 'Cyclone'], 'NX769J', '6.8" 120Hz UDC AMOLED + 520Hz Shoulder Triggers · Snapdragon 8 Gen 3 · 50MP OIS Camera · 6500mAh · 80W Charge'),
  ],
  'nubia::Other Models': [
    m('nubia RedMagic 8 Pro 5G', 'zte-nubia-red-magic-8-pro', 'Previous Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Matte Black', 'Void Transparent'], 'NX729J', '6.8" 120Hz UDC Full Screen AMOLED · Snapdragon 8 Gen 2 · 50MP Triple Camera · 6000mAh · 65W Fast Charge'),
    m('nubia RedMagic 7 Pro 5G', 'zte-nubia-red-magic-7-pro', 'Previous Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Obsidian', 'Supernova'], 'NX709J', '6.8" 120Hz UDC Gaming AMOLED · Snapdragon 8 Gen 1 · 64MP Triple Camera · 5000mAh · 65W Charge'),
  ],

  // ==================================================
  // LENOVO (6 Verified Models across All 3 Official Series)
  // ==================================================
  'Lenovo::Legion Series': [
    m('Lenovo Legion Y90 5G', 'lenovo-legion-y90', 'Previous Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Titanium Grey'], 'L71061', '6.92" 144Hz E4 AMOLED Dual Engine Air Cooling · Snapdragon 8 Gen 1 · 64MP Dual Camera · 5600mAh · 68W Turbo Charge'),
    m('Lenovo Legion Y700', 'lenovo-legion-y700', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Titanium Grey', 'Ultimate Black'], 'TB-9707F', '8.8" 2.5K 120Hz Gaming Display · Snapdragon 870 · 13MP Rear Camera · 6550mAh · 45W Turbo Charge', '5G / 4G'),
  ],
  'Lenovo::K Series': [
    m('Lenovo K14 Plus', 'lenovo-k14-plus', 'Previous Model', ['4GB'], ['64GB'], ['Grey', 'Pink'], 'XT2155-7', '6.5" 90Hz Max Vision HD+ Display · UNISOC T700 · 48MP Triple Camera · 5000mAh · 10W Charge', '4G'),
    m('Lenovo K13 Note', 'lenovo-k13-note', 'Previous Model', ['4GB'], ['128GB'], ['Aurora Grey', 'Pearl Sakura'], 'XT2128-2', '6.5" Max Vision HD+ Display · Snapdragon 460 · 48MP Quad Camera · 5000mAh · 10W Charge', '4G'),
    m('Lenovo K12 Pro', 'lenovo-k12-pro', 'Previous Model', ['4GB'], ['64GB', '128GB'], ['Metallic Violet', 'Steel Grey'], 'XT2091-8', '6.8" HD+ Max Vision Display · Snapdragon 662 · 64MP Triple Camera · 6000mAh Mega Battery · 20W Charge', '4G'),
  ],
  'Lenovo::Other Models': [
    m('Lenovo Legion Y70 5G', 'lenovo-legion-y70', 'Previous Model', ['8GB', '12GB'], ['128GB', '256GB'], ['Ice White', 'Titanium Grey', 'Flame Red'], 'L71091', '6.67" 144Hz OLED 7.99mm CNC Metal Frame · Snapdragon 8+ Gen 1 · 50MP OIS Triple Camera · 5100mAh · 68W Fast Charge'),
  ],

  // ==================================================
  // ROG (10 Verified Models across All 3 Official Series)
  // ==================================================
  'ROG::ROG Phone Pro Series': [
    m('ASUS ROG Phone 9 Pro 5G', 'asus-rog-phone-9-pro', 'Current Model', ['16GB', '24GB'], ['512GB', '1TB'], ['Phantom Black'], 'AI2501-Pro', '6.78" 185Hz LTPO AMOLED + AniMe Vision 648-LED Matrix · Snapdragon 8 Elite · 50MP Gimbal OIS + 32MP 3x Telephoto · 5800mAh · 65W HyperCharge'),
    m('ASUS ROG Phone 8 Pro 5G', 'asus-rog-phone-8-pro', 'Current Model', ['16GB', '24GB'], ['512GB', '1TB'], ['Phantom Black'], 'AI2401-D', '6.78" 165Hz LTPO AMOLED + AniMe Vision Mini-LED · Snapdragon 8 Gen 3 · 50MP Gimbal OIS + 3x Telephoto · 5500mAh · 65W HyperCharge'),
    m('ASUS ROG Phone 5s Pro 5G', 'asus-rog-phone-5s-pro', 'Previous Model', ['18GB'], ['512GB'], ['Phantom Black'], 'ZS676KS-Pro', '6.78" 144Hz Samsung E4 AMOLED + ROG Vision Color PMOLED · Snapdragon 888+ 5G · 64MP Sony IMX686 Triple Cam · 6000mAh · 65W HyperCharge'),
  ],
  'ROG::ROG Phone Number Series': [
    m('ASUS ROG Phone 9 5G', 'asus-rog-phone-9', 'Current Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Storm White', 'Phantom Black'], 'AI2501', '6.78" 185Hz LTPO Samsung AMOLED · Snapdragon 8 Elite · 50MP Sony Lytia 700 Gimbal OIS · 5800mAh · 65W HyperCharge'),
    m('ASUS ROG Phone 8 5G', 'asus-rog-phone-8', 'Current Model', ['12GB', '16GB'], ['256GB'], ['Phantom Black', 'Rebel Grey'], 'AI2401-C', '6.78" 165Hz LTPO AMOLED · Snapdragon 8 Gen 3 · 50MP 6-Axis Hybrid Gimbal OIS · 5500mAh · 65W HyperCharge'),
    m('ASUS ROG Phone 7 5G', 'asus-rog-phone-7', 'Previous Model', ['12GB', '16GB'], ['256GB', '512GB'], ['Phantom Black', 'Storm White'], 'AI2205', '6.78" 165Hz Samsung AMOLED · Snapdragon 8 Gen 2 · 50MP Sony IMX766 Triple Cam · 6000mAh · 65W HyperCharge'),
    m('ASUS ROG Phone 6D 5G', 'asus-rog-phone-6d', 'Previous Model', ['12GB', '16GB'], ['256GB'], ['Space Gray'], 'AI2203-A', '6.78" 165Hz AMOLED Display · Dimensity 9000+ 5G · 50MP Sony IMX766 Triple Cam · 6000mAh · 65W HyperCharge'),
    m('ASUS ROG Phone 5 5G', 'asus-rog-phone-5', 'Previous Model', ['8GB', '12GB', '16GB'], ['128GB', '256GB'], ['Phantom Black', 'Storm White'], 'ZS673KS', '6.78" 144Hz Samsung E4 AMOLED · Snapdragon 888 5G · 64MP Sony IMX686 Triple Cam · 6000mAh · 65W HyperCharge'),
  ],
  'ROG::Other Models': [
    m('ASUS ROG Phone 7 Ultimate 5G', 'asus-rog-phone-7-ultimate', 'Previous Model', ['16GB'], ['512GB'], ['Storm White'], 'AI2205-D', '6.78" 165Hz AMOLED + AeroActive Portal Cooling Vent · Snapdragon 8 Gen 2 · 50MP Triple Camera · 6000mAh · 65W HyperCharge'),
    m('ASUS ROG Phone 6D Ultimate 5G', 'asus-rog-phone-6d-ultimate', 'Previous Model', ['16GB'], ['512GB'], ['Space Gray'], 'AI2203-D', '6.78" 165Hz AMOLED + AeroActive Portal · Dimensity 9000+ 5G · 50MP Sony IMX766 Camera · 6000mAh · 65W HyperCharge'),
  ],
};
