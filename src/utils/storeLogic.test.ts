import test from 'node:test';
import assert from 'node:assert/strict';
import {
  STORE_INFO,
  INITIAL_BRAND_DIRECTORY,
  INITIAL_SMARTPHONE_CATALOGUE,
  INITIAL_ACCESSORIES_CATALOGUE,
  ACCESSORY_CATEGORY_NAMES,
  HOMEPAGE_POPULAR_SEARCH_CHIPS,
  HOMEPAGE_MOBILE_CATEGORIES,
  HOMEPAGE_ACCESSORY_ENTRY_TILES,
  DEFAULT_MOBILE_FILTER_STATE,
  buildPhoneModelWhatsAppMessage,
  buildProductEnquiryWhatsAppMessage,
  buildCatalogueProductWhatsAppMessage,
  filterAndSortSmartphoneCatalogue,
  getCompatibleAccessoriesForPhone,
  getRelatedProductsForPhone,
  getInstantSearchSuggestions,
  resolveUniversalCatalogueSearch,
  formatStockStatusBadge,
  formatVerifiedSpecValue,
  formatComparisonValue,
  addBrandToDirectory,
  deleteBrandFromDirectory,
  upsertSmartphoneModel,
  upsertAccessoryItem,
  deleteSmartphoneModel,
  getProductGallerySlots,
  getSeriesDirectoryForBrand,
  exportSmartphonesToCsv,
  importSmartphonesFromCsvOrJson,
} from './storeLogic';

test('INITIAL_BRAND_DIRECTORY includes all 28 requested major smartphone brands', () => {
  const expectedBrands = [
    'Apple',
    'Samsung',
    'OnePlus',
    'OPPO',
    'vivo',
    'Xiaomi',
    'Redmi',
    'realme',
    'iQOO',
    'Nothing',
    'Motorola',
    'Google Pixel',
    'POCO',
    'Infinix',
    'TECNO',
    'Nokia',
    'Lava',
    'Micromax',
    'ASUS',
    'Sony',
    'HONOR',
    'HMD',
    'Itel',
    'CMF',
    'ZTE',
    'nubia',
    'Lenovo',
    'ROG',
  ];
  assert.ok(INITIAL_BRAND_DIRECTORY.length >= 28);
  for (const name of expectedBrands) {
    assert.ok(
      INITIAL_BRAND_DIRECTORY.some((b) => b.name === name),
      `Missing brand in directory: ${name}`
    );
  }
});

test('Hierarchical Brand -> Series -> All Models dataset includes Current and Previous models across Samsung, OnePlus, Apple, OPPO, vivo and all 28 brands', () => {
  const samsung = INITIAL_BRAND_DIRECTORY.find((b) => b.name === 'Samsung');
  assert.ok(samsung);
  assert.deepEqual(samsung.seriesList, [
    'Galaxy S Series',
    'Galaxy A Series',
    'Galaxy M Series',
    'Galaxy F Series',
    'Galaxy Z Series',
    'Other Models',
  ]);

  const samsungModels = filterAndSortSmartphoneCatalogue(INITIAL_SMARTPHONE_CATALOGUE, {
    ...DEFAULT_MOBILE_FILTER_STATE,
    brand: 'Samsung',
  });
  assert.ok(
    samsungModels.length >= 25,
    `Expected Samsung to have at least 25 models across all series, got ${samsungModels.length}`
  );

  const oneplusModels = filterAndSortSmartphoneCatalogue(INITIAL_SMARTPHONE_CATALOGUE, {
    ...DEFAULT_MOBILE_FILTER_STATE,
    brand: 'OnePlus',
  });
  assert.ok(
    oneplusModels.length >= 24,
    `Expected OnePlus to have at least 24 models across all series, got ${oneplusModels.length}`
  );

  const oneplusSeriesDir = getSeriesDirectoryForBrand(
    'OnePlus',
    INITIAL_BRAND_DIRECTORY,
    INITIAL_SMARTPHONE_CATALOGUE
  );
  assert.equal(oneplusSeriesDir.length, 5);
  const nordSeries = oneplusSeriesDir.find((s) => s.seriesName === 'OnePlus Nord Series');
  assert.ok(nordSeries && nordSeries.modelCount >= 4);
  assert.ok(nordSeries.representativeImage?.startsWith('https://'));

  for (const m of samsungModels) {
    assert.equal(m.price, null);
    assert.equal(m.availability, 'Check Availability');
    assert.equal(formatStockStatusBadge(m.availability), 'CHECK AVAILABILITY');
    assert.ok(m.productName);
    assert.ok(m.model);
    assert.ok(m.sourceUrl?.startsWith('https://'));
    assert.ok(m.generation === 'Current Model' || m.generation === 'Previous Model');
    assert.ok(m.specifications);
    assert.ok(Array.isArray(m.colors));
    assert.ok(Array.isArray(m.storageVariants));
    assert.ok(Array.isArray(m.ramVariants));
  }
});

test('Original Product Image System & 6-angle gallery slots (Front, Back, Side, Camera, Display, Box / Package)', () => {
  const basePhone = INITIAL_SMARTPHONE_CATALOGUE[0];
  assert.ok(
    basePhone.productImage && basePhone.productImage.startsWith('https://'),
    'Expected seeded smartphone to have a real online reference image URL'
  );
  const seededSlots = getProductGallerySlots(basePhone);
  assert.equal(seededSlots.length, 6);
  assert.deepEqual(
    seededSlots.map((s) => s.label),
    ['Front', 'Back', 'Side', 'Camera', 'Display', 'Box / Package']
  );
  assert.equal(seededSlots[0].imageUrl, basePhone.productImage);

  // Verify a custom model without an exact online image returns null so UI shows "Image unavailable"
  const emptySlots = getProductGallerySlots({ productImage: undefined, galleryImages: {} });
  assert.ok(emptySlots.every((s) => s.imageUrl === null));

  const upserted = upsertSmartphoneModel(INITIAL_SMARTPHONE_CATALOGUE, {
    id: basePhone.id,
    brand: basePhone.brand,
    modelName: basePhone.modelName,
    series: basePhone.series,
    productImage: 'https://example.com/original-front.png',
    galleryImages: {
      back: 'https://example.com/original-back.png',
      box: 'https://example.com/original-box.png',
    },
    colorsCsv: 'Titanium Gray, Titanium Black',
    ramCsv: '12GB',
    storageCsv: '256GB, 512GB',
  });
  assert.equal(upserted.ok, true);
  if (upserted.ok) {
    const slots = getProductGallerySlots(upserted.item);
    assert.equal(slots[0].label, 'Front');
    assert.equal(slots[0].imageUrl, 'https://example.com/original-front.png');
    assert.equal(slots[1].label, 'Back');
    assert.equal(slots[1].imageUrl, 'https://example.com/original-back.png');
    assert.equal(slots[2].label, 'Side');
    assert.equal(slots[2].imageUrl, null);
    assert.equal(slots[5].label, 'Box / Package');
    assert.equal(slots[5].imageUrl, 'https://example.com/original-box.png');
    assert.deepEqual(upserted.item.colors, ['Titanium Gray', 'Titanium Black']);
    assert.deepEqual(upserted.item.ramVariants, ['12GB']);
    assert.deepEqual(upserted.item.storageVariants, ['256GB', '512GB']);
  }

  const accUpdate = upsertAccessoryItem(INITIAL_ACCESSORIES_CATALOGUE, {
    id: INITIAL_ACCESSORIES_CATALOGUE[0].id,
    productImage: 'https://example.com/original-cover.png',
  });
  assert.equal(accUpdate.ok, true);
  if (accUpdate.ok) {
    assert.equal(accUpdate.item.productImage, 'https://example.com/original-cover.png');
  }
});

test('WhatsApp dynamic message builders match exact requested formats including Ask About a Product', () => {
  assert.equal(
    STORE_INFO.askAboutProductMessage,
    'Hello Friends Cell Point, I would like to enquire about a mobile/accessory.'
  );

  const productEnq = buildProductEnquiryWhatsAppMessage('Samsung Galaxy S Series');
  assert.equal(
    productEnq,
    'Hello Friends Cell Point, I would like to enquire about Samsung Galaxy S Series. Please share the current price and availability.'
  );

  const msg1 = buildPhoneModelWhatsAppMessage('Samsung', 'Galaxy S Series');
  assert.equal(
    msg1,
    'Hello Friends Cell Point, I would like to know the price and availability of Samsung Galaxy S Series.'
  );

  const msg2 = buildCatalogueProductWhatsAppMessage('9H Tempered Glass', 'Samsung Galaxy S Series');
  assert.equal(
    msg2,
    'Hello Friends Cell Point, I want to enquire about 9H Tempered Glass for Samsung Galaxy S Series. Please share the current price and availability.'
  );

  assert.equal(STORE_INFO.whatsappNumber, '917207987777');
});

test('Homepage Popular Search Chips, Mobile Categories, Accessory Tiles & Universal Router work properly', () => {
  assert.deepEqual(HOMEPAGE_POPULAR_SEARCH_CHIPS, [
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
  ]);
  assert.equal(HOMEPAGE_MOBILE_CATEGORIES.length, 8);
  assert.equal(HOMEPAGE_ACCESSORY_ENTRY_TILES.length, 11);

  const twsRoute = resolveUniversalCatalogueSearch('TWS', INITIAL_BRAND_DIRECTORY);
  assert.equal(twsRoute.targetSection, 'accessories');
  if (twsRoute.targetSection === 'accessories') {
    assert.equal(twsRoute.accessoryCategory, 'TWS / Buds');
  }

  const samsungRoute = resolveUniversalCatalogueSearch('Samsung', INITIAL_BRAND_DIRECTORY);
  assert.equal(samsungRoute.targetSection, 'mobiles');
  if (samsungRoute.targetSection === 'mobiles') {
    assert.equal(samsungRoute.brand, 'Samsung');
  }

  const fiveGRoute = resolveUniversalCatalogueSearch('5G Phones', INITIAL_BRAND_DIRECTORY);
  assert.equal(fiveGRoute.targetSection, 'mobiles');
  if (fiveGRoute.targetSection === 'mobiles') {
    assert.equal(fiveGRoute.category, '5G Smartphones');
  }
});

test('Smart Search recognizes Brand, Series, Model, and Model Number (OnePlus Nord, OnePlus 13, Samsung Galaxy S, Galaxy A, iPhone, Redmi Note, vivo V, OPPO Reno, CPH2653, SM-S928B)', () => {
  const mobileTerms = [
    'OnePlus Nord',
    'OnePlus 13',
    'Samsung Galaxy S',
    'Galaxy A',
    'iPhone',
    'Redmi Note',
    'vivo V',
    'OPPO Reno',
    'CPH2653',
    'SM-S928B',
    '5G Phones',
  ];
  for (const term of mobileTerms) {
    const results = filterAndSortSmartphoneCatalogue(INITIAL_SMARTPHONE_CATALOGUE, {
      ...DEFAULT_MOBILE_FILTER_STATE,
      searchQuery: term,
    });
    assert.ok(results.length > 0, `Expected search query "${term}" to return matching phones`);
  }

  const allSuggestionTerms = ['iPhone', 'Galaxy S', 'OnePlus', 'Redmi', 'TWS', 'Tempered Glass', 'Charger', 'CPH2653'];
  for (const term of allSuggestionTerms) {
    const suggestions = getInstantSearchSuggestions(
      term,
      INITIAL_BRAND_DIRECTORY,
      INITIAL_SMARTPHONE_CATALOGUE
    );
    assert.ok(suggestions.length > 0, `Expected instant suggestions for "${term}"`);
  }
});

test('CSV and JSON dataset import and export work properly', () => {
  const csvStr = exportSmartphonesToCsv(INITIAL_SMARTPHONE_CATALOGUE.slice(0, 5));
  assert.ok(csvStr.includes('id,brand,series,model,modelNumber,generation,image,sourceUrl'));
  const reimportedCsv = importSmartphonesFromCsvOrJson(csvStr, INITIAL_SMARTPHONE_CATALOGUE);
  assert.equal(reimportedCsv.ok, true);
  if (reimportedCsv.ok) {
    assert.equal(reimportedCsv.importedCount, 5);
  }
});

test('Spec, Comparison and Related Products formatters adhere to strict truthfulness rules', () => {
  assert.equal(formatVerifiedSpecValue('Details available on enquiry'), 'Details available on enquiry');
  assert.equal(formatComparisonValue(null, true), 'Check with store');
  assert.equal(formatComparisonValue('Details available on enquiry'), 'Check with store');

  const samsungPhone = INITIAL_SMARTPHONE_CATALOGUE.find((p) => p.brand === 'Samsung')!;
  const related = getRelatedProductsForPhone(INITIAL_SMARTPHONE_CATALOGUE, samsungPhone, 4);
  assert.equal(related.length, 4);
  assert.ok(related.every((r) => r.brand === 'Samsung' && r.id !== samsungPhone.id));
});

test('16 Accessory Categories and Accessories For This Phone compatibility work properly', () => {
  assert.equal(ACCESSORY_CATEGORY_NAMES.length, 16);
  assert.equal(INITIAL_ACCESSORIES_CATALOGUE.length, 16);
  for (const acc of INITIAL_ACCESSORIES_CATALOGUE) {
    assert.ok(
      acc.productImage && acc.productImage.startsWith('https://'),
      `Expected real online reference image for accessory category ${acc.category}`
    );
  }

  const forIphone = getCompatibleAccessoriesForPhone(
    INITIAL_ACCESSORIES_CATALOGUE,
    'Apple',
    'Apple iPhone 17'
  );
  assert.ok(forIphone.cases.length > 0);
  assert.ok(forIphone.temperedGlass.length > 0);
  assert.ok(forIphone.chargers.length > 0);
  assert.ok(forIphone.cables.length > 0);
  assert.ok(forIphone.earphones.length > 0);
  assert.ok(forIphone.tws.length > 0);
  assert.equal(forIphone.allCompatibleList.length, 7);
});

test('Admin operations: Add/Delete Brand and Add/Edit/Delete Model work cleanly', () => {
  const addedBrandRes = addBrandToDirectory(
    INITIAL_BRAND_DIRECTORY,
    INITIAL_SMARTPHONE_CATALOGUE,
    {
      name: 'Meizu',
      originNote: 'Flagship Series',
      seriesCsv: 'Meizu 21 Series, Other Models',
    }
  );
  assert.equal(addedBrandRes.ok, true);
  if (addedBrandRes.ok) {
    assert.equal(addedBrandRes.brands.length, INITIAL_BRAND_DIRECTORY.length + 1);
    const afterDelete = deleteBrandFromDirectory(
      addedBrandRes.brands,
      addedBrandRes.catalogue,
      'Meizu'
    );
    assert.equal(afterDelete.brands.length, INITIAL_BRAND_DIRECTORY.length);
  }

  const addedModelRes = upsertSmartphoneModel(INITIAL_SMARTPHONE_CATALOGUE, {
    brand: 'Samsung',
    modelName: 'Samsung Galaxy S24 Ultra',
    series: 'Galaxy S Series',
    availability: 'Check Availability',
  });
  assert.equal(addedModelRes.ok, true);
  if (addedModelRes.ok) {
    const editedRes = upsertSmartphoneModel(addedModelRes.catalogue, {
      id: addedModelRes.item.id,
      brand: 'Samsung',
      modelName: 'Samsung Galaxy S24 Ultra (5G)',
      series: 'Galaxy S Series',
      availability: 'Enquire',
    });
    assert.equal(editedRes.ok, true);
    if (editedRes.ok) {
      assert.equal(editedRes.item.availability, 'Enquire');
      const afterRemove = deleteSmartphoneModel(editedRes.catalogue, editedRes.item.id);
      assert.equal(afterRemove.length, INITIAL_SMARTPHONE_CATALOGUE.length);
    }
  }
});
