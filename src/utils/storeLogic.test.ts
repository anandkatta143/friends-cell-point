import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  STORE_INFO,
  INITIAL_BRAND_DIRECTORY,
  INITIAL_SMARTPHONE_CATALOGUE,
  INITIAL_ACCESSORIES_CATALOGUE,
  ACCESSORY_CATEGORY_NAMES,
  ACCESSORY_CATEGORIES,
  formatAccessoryPriceDisplay,
  formatPublicMopPrice,
  buildAccessoryWhatsAppMessage,
  searchAndFilterAccessories,
  DEFAULT_MOBILE_FILTER_STATE,
  CENTRALIZED_PRICE_LIST_DATA,
  PRICE_CHANGE_DISCLAIMER,
  buildPriceListWhatsAppMessage,
  filterAndSortSmartphoneCatalogue,
  getCompatibleAccessoriesForPhone,
  exportSmartphonesToCsv,
  importSmartphonesFromCsvOrJson,
  auditSmartphoneCatalogue,
} from './storeLogic';

test('INITIAL_BRAND_DIRECTORY includes strictly the 6 supplied price-list brands (vivo, Redmi, Xiaomi, Nothing, Lava, Google Pixel)', () => {
  const expectedBrands = ['vivo', 'Redmi', 'Xiaomi', 'Nothing', 'Lava', 'Google Pixel'];
  assert.equal(INITIAL_BRAND_DIRECTORY.length, 6);
  for (const name of expectedBrands) {
    assert.ok(
      INITIAL_BRAND_DIRECTORY.some((b) => b.name === name),
      `Missing brand in directory: ${name}`
    );
  }
});

test('CENTRALIZED_PRICE_LIST_DATA and INITIAL_SMARTPHONE_CATALOGUE contain all 120 exact entries from the supplied price lists with verified on-disk product images', () => {
  assert.equal(CENTRALIZED_PRICE_LIST_DATA.length, 120);
  assert.equal(INITIAL_SMARTPHONE_CATALOGUE.length, 120);

  const countByBrand = (brand: string) =>
    INITIAL_SMARTPHONE_CATALOGUE.filter((p) => p.brand === brand).length;

  assert.equal(countByBrand('vivo'), 50);
  assert.equal(countByBrand('Redmi'), 30);
  assert.equal(countByBrand('Xiaomi'), 4);
  assert.equal(countByBrand('Nothing'), 10);
  assert.equal(countByBrand('Lava'), 11);
  assert.equal(countByBrand('Google Pixel'), 15);

  const audit = auditSmartphoneCatalogue(INITIAL_BRAND_DIRECTORY, INITIAL_SMARTPHONE_CATALOGUE);
  assert.equal(audit.totalVerifiedBrands, 6);
  assert.equal(audit.totalVerifiedModels, 120);
  assert.deepEqual(audit.brandsWithIncompleteData, []);
  assert.deepEqual(audit.modelsWithoutVerifiedImages, []);

  // Ensure every product has a real verified product image mapped by Brand -> Series -> Model -> Variant -> Colour
  // and that the physical image file exists on disk under public/assets/products/
  for (const product of INITIAL_SMARTPHONE_CATALOGUE) {
    assert.equal(product.sourceImage, undefined);
    assert.ok(
      Boolean(product.productImage && product.productImage.startsWith('/assets/products/')),
      `Expected verified product image for ${product.brand} -> ${product.series} -> ${product.model} -> ${product.variant}`
    );
    const diskPrimaryPath = path.join(process.cwd(), 'public', product.productImage!);
    assert.ok(
      fs.existsSync(diskPrimaryPath) && fs.statSync(diskPrimaryPath).size > 2000,
      `Missing or empty image file on disk: ${diskPrimaryPath}`
    );
    assert.ok(!product.productImage?.includes('price-lists'), 'No price-list image URL allowed');
    for (const color of product.colors) {
      const colorUrl = product.colorImages?.[color];
      assert.ok(
        Boolean(colorUrl?.startsWith('/assets/products/')),
        `Expected verified colour image for ${product.brand} ${product.model} (${color})`
      );
      const diskColorPath = path.join(process.cwd(), 'public', colorUrl!);
      assert.ok(
        fs.existsSync(diskColorPath) && fs.statSync(diskColorPath).size > 2000,
        `Missing or empty colour image file on disk: ${diskColorPath}`
      );
    }
  }
});

test('Exact price-list fields are preserved for vivo, Redmi, Xiaomi, Nothing, Lava, and Google Pixel', () => {
  // 1. vivo X300 ULTRA (16GB + 512GB)
  const vivoX300Ultra = INITIAL_SMARTPHONE_CATALOGUE.find(
    (p) => p.brand === 'vivo' && p.model === 'X300 ULTRA' && p.variant === '16GB + 512GB'
  );
  assert.ok(vivoX300Ultra);
  assert.deepEqual(vivoX300Ultra.colors, ['Eclipse Black', 'Victory Green']);
  assert.equal('dealerPrice' in vivoX300Ultra, false);
  assert.equal(vivoX300Ultra.mopPrice, '₹ 1,59,999');
  assert.equal(vivoX300Ultra.price, 159999);

  // 2. Redmi Note 15 Pro+ 5G (12+512) -> 44,999
  const redmiNote15ProPlus = INITIAL_SMARTPHONE_CATALOGUE.find(
    (p) => p.brand === 'Redmi' && p.model === 'Redmi Note 15 Pro+ 5G' && p.variant === '12+512'
  );
  assert.ok(redmiNote15ProPlus);
  assert.equal(redmiNote15ProPlus.mopPrice, '44,999');
  assert.deepEqual(redmiNote15ProPlus.colors, []);

  // 3. Xiaomi 17 Ultra (16+512) -> 1,39,999
  const xiaomi17Ultra = INITIAL_SMARTPHONE_CATALOGUE.find(
    (p) => p.brand === 'Xiaomi' && p.model === 'Xiaomi 17 Ultra' && p.variant === '16+512'
  );
  assert.ok(xiaomi17Ultra);
  assert.equal(xiaomi17Ultra.mopPrice, '1,39,999');

  // 4. Nothing Phone 4a Pro (8GB / 128GB) -> MOP 54999, Effective 50499
  const nothing4aPro = INITIAL_SMARTPHONE_CATALOGUE.find(
    (p) => p.brand === 'Nothing' && p.model === 'Phone 4a Pro' && p.variant === '8GB / 128GB'
  );
  assert.ok(nothing4aPro);
  assert.equal(nothing4aPro.mopPrice, '54999');
  assert.equal(nothing4aPro.effectivePrice, '50499');
  assert.equal(nothing4aPro.discountFullSwipe, 'Rs.3750');
  assert.equal(nothing4aPro.discountEmi, '10% Up to 4500');

  // 5. Lava Hero Shakti -> OLD RP 878, NEW RP 908
  const lavaHeroShakti = INITIAL_SMARTPHONE_CATALOGUE.find(
    (p) => p.brand === 'Lava' && p.model === 'Hero Shakti'
  );
  assert.ok(lavaHeroShakti);
  assert.equal(lavaHeroShakti.oldRp, '878');
  assert.equal(lavaHeroShakti.newRp, '908');
  assert.equal(lavaHeroShakti.mopPrice, '908');

  // 6. Google Pixel 10 Pro Fold -> ₹1,72,999
  const pixelFold = INITIAL_SMARTPHONE_CATALOGUE.find(
    (p) => p.brand === 'Google Pixel' && p.model === 'Pixel 10 Pro Fold'
  );
  assert.ok(pixelFold);
  assert.equal(pixelFold.mopPrice, '₹1,72,999');
});

test('WhatsApp enquiry message format matches exact specification & Price Disclaimer matches exact string', () => {
  assert.equal(
    PRICE_CHANGE_DISCLAIMER,
    'Prices subject to change. Please confirm latest price and availability with Friends Cell Point.'
  );

  const msg = buildPriceListWhatsAppMessage({
    brand: 'vivo',
    model: 'Y05 4G',
    variant: '4GB + 64GB',
    price: '₹ 15,999',
  });
  assert.equal(
    msg,
    `Hi Friends Cell Point, I am interested in:\nBrand: vivo\nModel: Y05 4G\nVariant: 4GB + 64GB\nPrice: ₹ 15,999\n\nPlease confirm availability.`
  );

  assert.equal(
    STORE_INFO.askAboutProductMessage,
    'Hello Friends Cell Point, I would like to enquire about a mobile/accessory.'
  );
  assert.equal(STORE_INFO.whatsappNumber, '917207987777');
});

test('Brand filter, Series filter, Model/Variant search, Price range filter, and Price sorting work accurately', () => {
  // Brand filter
  const nothingItems = filterAndSortSmartphoneCatalogue(INITIAL_SMARTPHONE_CATALOGUE, {
    ...DEFAULT_MOBILE_FILTER_STATE,
    brand: 'Nothing',
  });
  assert.equal(nothingItems.length, 10);

  // Series filter
  const vivoXSeries = filterAndSortSmartphoneCatalogue(INITIAL_SMARTPHONE_CATALOGUE, {
    ...DEFAULT_MOBILE_FILTER_STATE,
    brand: 'vivo',
    series: 'X SERIES',
  });
  assert.equal(vivoXSeries.length, 5);

  // Search by variant
  const variantSearch = filterAndSortSmartphoneCatalogue(INITIAL_SMARTPHONE_CATALOGUE, {
    ...DEFAULT_MOBILE_FILTER_STATE,
    searchQuery: '16GB + 512GB',
  });
  assert.ok(variantSearch.length >= 1);

  // Price range filter: Under ₹10,000
  const under10k = filterAndSortSmartphoneCatalogue(INITIAL_SMARTPHONE_CATALOGUE, {
    ...DEFAULT_MOBILE_FILTER_STATE,
    priceRange: 'Under ₹10,000',
  });
  assert.ok(under10k.length > 0);
  assert.ok(under10k.every((p) => p.price !== null && p.price < 10000));

  // Sort by price Low to High and High to Low
  const lowToHigh = filterAndSortSmartphoneCatalogue(INITIAL_SMARTPHONE_CATALOGUE, {
    ...DEFAULT_MOBILE_FILTER_STATE,
    sortBy: 'price-asc',
  });
  assert.ok(
    lowToHigh[0].price! <= lowToHigh[lowToHigh.length - 1].price!,
    'Expected lowest price first when sorting price-asc'
  );

  const highToLow = filterAndSortSmartphoneCatalogue(INITIAL_SMARTPHONE_CATALOGUE, {
    ...DEFAULT_MOBILE_FILTER_STATE,
    sortBy: 'price-desc',
  });
  assert.equal(highToLow[0].model, 'X Fold 6');
  assert.equal(highToLow[0].price, 219999);
});

test('CSV and JSON dataset import and export preserve centralized price-list fields without dealer prices', () => {
  const csvStr = exportSmartphonesToCsv(INITIAL_SMARTPHONE_CATALOGUE.slice(0, 5));
  assert.ok(
    csvStr.includes('id,brand,series,model,variant,colors,mopPrice,effectivePrice')
  );
  assert.equal(csvStr.toLowerCase().includes('dealer'), false);
  const reimportedCsv = importSmartphonesFromCsvOrJson(csvStr, INITIAL_SMARTPHONE_CATALOGUE);
  assert.equal(reimportedCsv.ok, true);
  if (reimportedCsv.ok) {
    assert.equal(reimportedCsv.importedCount, 5);
  }
});

test('Global Dealer Price Privacy Rule: zero dealer prices exist in any smartphone or accessory dataset', () => {
  for (const entry of CENTRALIZED_PRICE_LIST_DATA) {
    assert.equal(
      'dealerPrice' in entry,
      false,
      `Entry ${entry.id} must not expose dealerPrice in client dataset`
    );
    const serialized = JSON.stringify(entry);
    assert.equal(
      serialized.toLowerCase().includes('dealer'),
      false,
      `Entry ${entry.id} JSON must not include dealer references`
    );
  }

  for (const product of INITIAL_SMARTPHONE_CATALOGUE) {
    assert.equal(
      'dealerPrice' in product,
      false,
      `Product ${product.id} must not expose dealerPrice`
    );
    assert.equal(
      (product.keySpecSummary || '').includes('DP:'),
      false,
      `Product ${product.id} keySpecSummary must not contain DP:`
    );
    assert.ok(
      formatPublicMopPrice(product.mopPrice, product.price).startsWith('₹') ||
        formatPublicMopPrice(product.mopPrice, product.price) === 'Price on Enquiry'
    );
  }

  assert.equal(formatPublicMopPrice('', null), 'Price on Enquiry');
  assert.equal(formatPublicMopPrice('Not explicitly listed', null), 'Price on Enquiry');
  assert.equal(formatPublicMopPrice('₹ 15,999', 15999), '₹ 15,999');
  assert.equal(formatPublicMopPrice('44,999', 44999), '₹44,999');

  for (const acc of INITIAL_ACCESSORIES_CATALOGUE) {
    assert.equal(
      'dealerPrice' in acc,
      false,
      `Accessory ${acc.id} must not expose dealerPrice`
    );
  }
});

test('Accessories catalogue contains all 12 requested categories with verified pricing and Price on Enquiry rules', () => {
  const expected12Categories = [
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
  ];

  assert.equal(ACCESSORY_CATEGORIES.length, 12);
  for (const cat of expected12Categories) {
    assert.ok(
      ACCESSORY_CATEGORIES.includes(cat as any),
      `Missing expected category: ${cat}`
    );
    assert.ok(
      INITIAL_ACCESSORIES_CATALOGUE.some((item) => item.category === cat),
      `Category ${cat} has no items in catalogue`
    );
  }

  // 1. Verified prices from official uploaded price lists
  const vivoCharger = INITIAL_ACCESSORIES_CATALOGUE.find((a) => a.id === 'acc-vivo-charger-15w');
  assert.ok(vivoCharger);
  assert.equal(vivoCharger.price, 899);
  assert.equal(vivoCharger.verifiedPrice, true);
  assert.equal(formatAccessoryPriceDisplay(vivoCharger.price), '₹899');

  const vivoBuds = INITIAL_ACCESSORIES_CATALOGUE.find((a) => a.id === 'acc-vivo-buds-xe-w39');
  assert.ok(vivoBuds);
  assert.equal(vivoBuds.price, 1999);
  assert.equal(vivoBuds.verifiedPrice, true);
  assert.equal(formatAccessoryPriceDisplay(vivoBuds.price), '₹1,999');

  const pixelWatch41 = INITIAL_ACCESSORIES_CATALOGUE.find((a) => a.id === 'acc-pixel-watch-5-41mm');
  assert.ok(pixelWatch41);
  assert.equal(pixelWatch41.price, 42900);
  assert.equal(formatAccessoryPriceDisplay(pixelWatch41.price), '₹42,900');

  const fitbitAir = INITIAL_ACCESSORIES_CATALOGUE.find((a) => a.id === 'acc-google-fitbit-air');
  assert.ok(fitbitAir);
  assert.equal(fitbitAir.price, 13999);
  assert.equal(formatAccessoryPriceDisplay(fitbitAir.price), '₹13,999');

  // 2. Unverified accessories MUST have price: null and display "Price on Enquiry"
  const unverifiedItems = INITIAL_ACCESSORIES_CATALOGUE.filter((a) => !a.verifiedPrice);
  assert.ok(unverifiedItems.length >= 10);
  for (const item of unverifiedItems) {
    assert.equal(item.price, null, `Unverified item ${item.productName} must not have a fake price`);
    assert.equal(
      formatAccessoryPriceDisplay(item.price, item.mopPrice),
      'Price on Enquiry',
      `Unverified item ${item.productName} must display 'Price on Enquiry'`
    );
  }

  // 3. WhatsApp enquiry format must strictly match:
  // Hello Friends Cell Point,\nI am interested in:\n[Brand]\n[Product Name]\n[Variant]\nPrice: [Price]\n\nPlease confirm availability.
  const whatsappMsgVerified = buildAccessoryWhatsAppMessage({
    brand: 'vivo',
    productName: 'V1530H0A0 15W Fast Charger',
    variant: '15W Standard Adapter',
    price: 899,
  });
  const expectedVerifiedMsg =
    'Hello Friends Cell Point,\nI am interested in:\nvivo\nV1530H0A0 15W Fast Charger\n15W Standard Adapter\nPrice: ₹899\n\nPlease confirm availability.';
  assert.equal(whatsappMsgVerified, expectedVerifiedMsg);

  const whatsappMsgUnverified = buildAccessoryWhatsAppMessage({
    brand: 'Multi-Brand Compatible',
    productName: '9H Tempered Glass & Edge-to-Edge Screen Guards',
    variant: '9H D+ Edge-to-Edge Screen Guard',
    price: null,
  });
  const expectedUnverifiedMsg =
    'Hello Friends Cell Point,\nI am interested in:\nMulti-Brand Compatible\n9H Tempered Glass & Edge-to-Edge Screen Guards\n9H D+ Edge-to-Edge Screen Guard\nPrice: Price on Enquiry\n\nPlease confirm availability.';
  assert.equal(whatsappMsgUnverified, expectedUnverifiedMsg);

  // 4. Search and filtering system allows searching by brand, product name, and category
  const vivoResults = searchAndFilterAccessories(INITIAL_ACCESSORIES_CATALOGUE, 'vivo', 'All');
  assert.equal(vivoResults.length, 2);
  assert.ok(vivoResults.every((item) => item.brand.toLowerCase().includes('vivo')));

  const chargerCatResults = searchAndFilterAccessories(
    INITIAL_ACCESSORIES_CATALOGUE,
    '',
    'Chargers'
  );
  assert.ok(chargerCatResults.length >= 3);
  assert.ok(chargerCatResults.every((item) => item.category === 'Chargers'));

  const nameResults = searchAndFilterAccessories(
    INITIAL_ACCESSORIES_CATALOGUE,
    'Tempered Glass',
    'All'
  );
  assert.ok(nameResults.length >= 1);
  assert.equal(nameResults[0].category, 'Tempered Glass');

  // Compatibility helper keeps returning compatible items
  const forVivo = getCompatibleAccessoriesForPhone(
    INITIAL_ACCESSORIES_CATALOGUE,
    'vivo',
    'vivo Y05 4G'
  );
  assert.equal(forVivo.allCompatibleList.length, 7);
});

test('index.html contains the exact Google Search Console verification meta tag once inside <head>', () => {
  const indexHtmlPath = path.join(process.cwd(), 'index.html');
  const html = fs.readFileSync(indexHtmlPath, 'utf8');
  const expectedTag =
    '<meta name="google-site-verification" content="YMzf-S5Sy_5iRYli8UlUIe6cgegJLwCUwwLgM1iS4AI" />';
  assert.equal(html.includes(expectedTag), true);
  const matches = html.match(/name="google-site-verification"/g) || [];
  assert.equal(matches.length, 1);
  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
  assert.ok(headMatch && headMatch[1].includes(expectedTag));
});


