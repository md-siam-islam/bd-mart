import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // Category 1: Electronics (1-4)
  {
    id: 'prod-1',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    slug: 'sony-wh-1000xm5-wireless-headphones',
    category: 'Electronics',
    categorySlug: 'electronics',
    subcategory: 'Audio & Headphones',
    brand: 'Sony',
    price: 34500,
    oldPrice: 38000,
    discount: 9,
    rating: 4.9,
    reviews: 128,
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80'
    ],
    colors: [
      { name: 'Midnight Black', hex: '#111827' },
      { name: 'Silver Platinum', hex: '#CBD5E1' }
    ],
    description: 'Industry-leading noise canceling with two processors and 8 microphones for unprecedented noise cancellation. Crystal clear hands-free calling and up to 30-hour battery life with quick charging.',
    shortDescription: 'Flagship wireless active noise cancelling headphones with 30-hour battery life.',
    specifications: {
      'Battery Life': 'Up to 30 hours (ANC on)',
      'Charging Time': '3.5 hours via USB-C (3 min charge gives 3 hours playback)',
      'Driver Unit': '30mm, Carbon fiber composite dome',
      'Bluetooth Version': '5.2 with LDAC, AAC, SBC',
      'Weight': '250g'
    },
    sku: 'SNY-WH-1000XM5',
    warranty: '1 Year Official Brand Warranty',
    tags: ['Headphones', 'Sony', 'Wireless', 'ANC', 'Premium Audio'],
    featured: true,
    bestSeller: true,
    flashSale: false,
    newArrival: false
  },
  {
    id: 'prod-2',
    name: 'Walton Primo Sound Bar with Wireless Subwoofer 120W',
    slug: 'walton-primo-sound-bar-120w',
    category: 'Electronics',
    categorySlug: 'electronics',
    subcategory: 'Home Appliances',
    brand: 'Walton Digi-Tech',
    price: 9499,
    oldPrice: 11999,
    discount: 21,
    rating: 4.6,
    reviews: 76,
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80'
    ],
    colors: [{ name: 'Piano Black', hex: '#000000' }],
    description: 'Enrich your living room cinema with Walton 120W sound bar. Equipped with wireless 6.5-inch subwoofer, HDMI ARC, optical input, and Bluetooth 5.0.',
    specifications: {
      'Total Output': '120 Watts RMS',
      'Connectivity': 'HDMI ARC, Optical, Aux, Bluetooth 5.0, USB',
      'Subwoofer': 'Wireless 6.5-inch Deep Bass Driver',
      'Warranty': '1 Year Walton Service Warranty'
    },
    sku: 'WLT-SND-120',
    warranty: '1 Year Walton Official Warranty',
    tags: ['Soundbar', 'Walton', 'Home Theater', 'Audio', 'Bass'],
    featured: false,
    bestSeller: true,
    flashSale: true,
    newArrival: false
  },
  {
    id: 'prod-3',
    name: 'Anker Soundcore Life Q30 Hybrid ANC Headphones',
    slug: 'anker-soundcore-life-q30',
    category: 'Electronics',
    categorySlug: 'electronics',
    subcategory: 'Audio & Headphones',
    brand: 'Anker',
    price: 7850,
    oldPrice: 8900,
    discount: 12,
    rating: 4.8,
    reviews: 189,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
    ],
    colors: [
      { name: 'Black', hex: '#1E293B' },
      { name: 'Midnight Blue', hex: '#1E3A8A' }
    ],
    description: 'Advanced hybrid active noise cancellation reduces ambient noise by up to 95%. Custom Silk-Diaphragm drivers reproduce music with Hi-Res Audio certification.',
    specifications: {
      'Playtime': '40 Hours (ANC On) / 60 Hours (Standard)',
      'Fast Charge': '5-Min Charge = 4-Hour Playtime',
      'Soundcore App': '22 EQ Presets + Custom Equalizer'
    },
    sku: 'ANK-Q30-BL',
    warranty: '18 Months Anker BD Replacement Warranty',
    tags: ['Anker', 'Noise Cancelling', 'Hi-Res', 'Travel'],
    featured: true,
    bestSeller: false,
    flashSale: false,
    newArrival: true
  },
  {
    id: 'prod-4',
    name: 'Mi Smart Band 8 Active Fitness Tracker',
    slug: 'mi-smart-band-8-active',
    category: 'Electronics',
    categorySlug: 'electronics',
    subcategory: 'Smart Watches',
    brand: 'Xiaomi BD',
    price: 2650,
    oldPrice: 3200,
    discount: 17,
    rating: 4.7,
    reviews: 310,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80'
    ],
    colors: [
      { name: 'Space Black', hex: '#18181B' },
      { name: 'Ivory Cream', hex: '#FEF3C7' },
      { name: 'Pink Rose', hex: '#FBCFE8' }
    ],
    description: 'Vibrant 1.47-inch TFT display with 50+ workout modes, 24-hour heart rate monitoring, SpO2 blood oxygen tracking, and 14-day ultra-long battery life.',
    specifications: {
      'Display': '1.47" TFT (172 x 320 pixels)',
      'Water Resistance': '5 ATM (up to 50 meters)',
      'Battery': '210mAh, up to 14 days typical use',
      'Weight': '14.9g (without strap)'
    },
    sku: 'XIA-BAND-8ACT',
    warranty: '6 Months Official Warranty',
    tags: ['Xiaomi', 'Fitness Tracker', 'Smart Band', 'Heart Rate'],
    featured: false,
    bestSeller: true,
    flashSale: true,
    newArrival: false
  },

  // Category 2: Mobile & Accessories (5-8)
  {
    id: 'prod-5',
    name: 'Samsung Galaxy S24 Ultra 5G (12GB/256GB)',
    slug: 'samsung-galaxy-s24-ultra-5g',
    category: 'Mobile & Accessories',
    categorySlug: 'mobile-accessories',
    subcategory: 'Smartphones',
    brand: 'Samsung Electronics',
    price: 154999,
    oldPrice: 169999,
    discount: 9,
    rating: 4.9,
    reviews: 64,
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80'
    ],
    colors: [
      { name: 'Titanium Gray', hex: '#64748B' },
      { name: 'Titanium Black', hex: '#0F172A' },
      { name: 'Titanium Violet', hex: '#6D28D9' }
    ],
    description: 'Meet Galaxy S24 Ultra with Galaxy AI, Titanium exterior, 200MP camera system, and built-in S Pen. Powered by Snapdragon 8 Gen 3 for Galaxy.',
    specifications: {
      'Display': '6.8" Dynamic AMOLED 2X, 120Hz, 2600 nits',
      'Processor': 'Snapdragon 8 Gen 3 for Galaxy',
      'Main Camera': '200MP + 50MP + 12MP + 10MP',
      'Battery': '5000mAh with 45W Fast Charging'
    },
    sku: 'SAM-S24U-256',
    warranty: '1 Year Samsung Bangladesh Official Warranty',
    tags: ['Samsung', 'S24 Ultra', '5G', 'Flagship', 'Galaxy AI'],
    featured: true,
    bestSeller: false,
    flashSale: false,
    newArrival: true
  },
  {
    id: 'prod-6',
    name: 'Anker 735 GaNPrime 65W Fast Charger (3-Port)',
    slug: 'anker-735-ganprime-65w-fast-charger',
    category: 'Mobile & Accessories',
    categorySlug: 'mobile-accessories',
    subcategory: 'Fast Chargers',
    brand: 'Anker',
    price: 4350,
    oldPrice: 5200,
    discount: 16,
    rating: 4.8,
    reviews: 92,
    stock: 28,
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80',
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&q=80'
    ],
    colors: [{ name: 'Matte Black', hex: '#18181B' }],
    description: 'Charge 3 devices at once. Fast charge your laptop, phone, and earbuds simultaneously with PowerIQ 4.0 dynamic power distribution and ActiveShield 2.0 temperature monitoring.',
    specifications: {
      'Total Output': '65W Max',
      'Ports': '2x USB-C + 1x USB-A',
      'Technology': 'GaNPrime with PowerIQ 4.0',
      'Compatibility': 'MacBook, iPhone, Samsung, iPad, Pixel'
    },
    sku: 'ANK-735-65W',
    warranty: '18 Months Anker Official Warranty',
    tags: ['Charger', 'GaN', 'Anker', 'USB-C', 'Fast Charging'],
    featured: false,
    bestSeller: true,
    flashSale: true,
    newArrival: false
  },
  {
    id: 'prod-7',
    name: 'Baseus 20000mAh 22.5W Fast Charging Power Bank with Digital Display',
    slug: 'baseus-20000mah-fast-charging-power-bank',
    category: 'Mobile & Accessories',
    categorySlug: 'mobile-accessories',
    subcategory: 'Power Banks',
    brand: 'Baseus',
    price: 2450,
    oldPrice: 2990,
    discount: 18,
    rating: 4.7,
    reviews: 142,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80',
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80'
    ],
    colors: [
      { name: 'Classic Black', hex: '#1E293B' },
      { name: 'Pure White', hex: '#F8FAFC' }
    ],
    description: 'High capacity 20,000mAh external battery pack supporting PD 3.0 and QC 3.0 22.5W high-speed charging. Features real-time percentage LED numerical display.',
    specifications: {
      'Capacity': '20,000mAh / 3.7V (74Wh)',
      'Outputs': '2x USB-A + 1x Type-C (Bidirectional)',
      'Max Power': '22.5W Super Charge',
      'Display': 'LED Percentage Screen'
    },
    sku: 'BAS-PB-20K',
    warranty: '6 Months Replacement Warranty',
    tags: ['PowerBank', 'Baseus', '20000mAh', 'Fast Charge'],
    featured: false,
    bestSeller: true,
    flashSale: false,
    newArrival: false
  },
  {
    id: 'prod-8',
    name: 'Spigen Ultra Hybrid Shockproof Case for iPhone 15 Pro Max',
    slug: 'spigen-ultra-hybrid-iphone-15-pro-max',
    category: 'Mobile & Accessories',
    categorySlug: 'mobile-accessories',
    subcategory: 'Cases & Covers',
    brand: 'Spigen',
    price: 1950,
    oldPrice: 2400,
    discount: 19,
    rating: 4.9,
    reviews: 58,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80'
    ],
    colors: [
      { name: 'Crystal Clear', hex: '#E2E8F0' },
      { name: 'Matte Black Bumper', hex: '#0F172A' }
    ],
    description: 'Air Cushion Technology shock-absorbing corners with durable anti-yellowing resin back. Raised bezels protect display and camera lenses from flat surfaces.',
    specifications: {
      'Material': 'TPU Bumper + Polycarbonate Back',
      'Drop Protection': 'Military-Grade MIL-STD 810G-516.6',
      'Wireless Charging': 'Fully Qi & MagSafe Compatible'
    },
    sku: 'SPG-IP15PM-UH',
    warranty: '100% Original Guarantee',
    tags: ['Spigen', 'iPhone', 'Case', 'Shockproof'],
    featured: false,
    bestSeller: false,
    flashSale: false,
    newArrival: true
  },

  // Category 3: Men's Fashion (9-12)
  {
    id: 'prod-9',
    name: 'Aarong Earth Fine Cotton Embroidered Festive Panjabi',
    slug: 'aarong-fine-cotton-embroidered-panjabi',
    category: "Men's Fashion",
    categorySlug: 'mens-fashion',
    subcategory: 'Panjabi & Pajama',
    brand: 'Aarong Earth',
    price: 3250,
    oldPrice: 3850,
    discount: 16,
    rating: 4.9,
    reviews: 145,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&q=80'
    ],
    colors: [
      { name: 'Royal Navy', hex: '#1E3A8A' },
      { name: 'Ivory White', hex: '#F8FAFC' },
      { name: 'Olive Green', hex: '#3F6212' }
    ],
    sizes: ['M (40)', 'L (42)', 'XL (44)', 'XXL (46)'],
    description: 'Crafted from 100% fine combed cotton fabric with elegant tone-on-tone neckline and placket embroidery. Tailored in a modern semi-fitted cut ideal for Jummah, Eid, and family weddings.',
    specifications: {
      'Fabric': '100% Fine Combed Cotton',
      'Pattern': 'Handcrafted Collar & Cuff Embroidery',
      'Cut': 'Semi-fitted with Side Pockets',
      'Care': 'Hand wash or dry clean recommended'
    },
    sku: 'ARG-PANJ-EMB-01',
    warranty: '3 Days Easy Return & Exchange',
    tags: ['Aarong', 'Panjabi', 'Eid', 'Festive', 'Traditional'],
    featured: true,
    bestSeller: true,
    flashSale: false,
    newArrival: false
  },
  {
    id: 'prod-10',
    name: 'Taaga Man Regular Fit Oxford Cotton Casual Shirt',
    slug: 'taaga-man-oxford-cotton-casual-shirt',
    category: "Men's Fashion",
    categorySlug: 'mens-fashion',
    subcategory: 'Casual Shirts',
    brand: 'Taaga',
    price: 1850,
    oldPrice: 2200,
    discount: 16,
    rating: 4.7,
    reviews: 64,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80'
    ],
    colors: [
      { name: 'Sky Blue', hex: '#38BDF8' },
      { name: 'Blush Pink', hex: '#F472B6' },
      { name: 'Crisp White', hex: '#FFFFFF' }
    ],
    sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)'],
    description: 'Classic button-down collar Oxford shirt with soft enzyme wash finish. Perfect for smart-casual office days and weekend dinners.',
    specifications: {
      'Fabric': '100% Premium Oxford Cotton',
      'Fit': 'Contemporary Regular Fit',
      'Collar': 'Button-Down Collar with Chest Pocket'
    },
    sku: 'TAG-OXF-SHT',
    warranty: 'Exchange within 7 days',
    tags: ['Taaga', 'Shirt', 'Casual', 'Office Wear', 'Cotton'],
    featured: false,
    bestSeller: true,
    flashSale: true,
    newArrival: false
  },
  {
    id: 'prod-11',
    name: 'Apex Comfort Stretch Slim Denim Jeans - Deep Indigo',
    slug: 'apex-comfort-stretch-slim-denim-jeans',
    category: "Men's Fashion",
    categorySlug: 'mens-fashion',
    subcategory: 'Denim Jeans',
    brand: 'Apex Footwear',
    price: 2450,
    oldPrice: 2950,
    discount: 17,
    rating: 4.8,
    reviews: 88,
    stock: 32,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80'
    ],
    colors: [
      { name: 'Deep Indigo', hex: '#1E1B4B' },
      { name: 'Washed Charcoal', hex: '#334155' }
    ],
    sizes: ['30', '32', '34', '36', '38'],
    description: 'Durable 12.5 oz ring-spun denim with 2% elastane for maximum comfort and mobility. YKK brass zipper with reinforced stress rivets.',
    specifications: {
      'Composition': '98% Cotton, 2% Elastane',
      'Rise': 'Mid-rise, Slim leg opening',
      'Closure': 'YKK Heavy-duty Brass Zipper'
    },
    sku: 'APX-DNM-IND-32',
    warranty: '7 Days Return Policy',
    tags: ['Jeans', 'Denim', 'Slim Fit', 'Apex'],
    featured: false,
    bestSeller: false,
    flashSale: false,
    newArrival: true
  },
  {
    id: 'prod-12',
    name: 'Premium 100% Combed Cotton Pajama with Drawstring',
    slug: 'premium-cotton-pajama-drawstring',
    category: "Men's Fashion",
    categorySlug: 'mens-fashion',
    subcategory: 'Panjabi & Pajama',
    brand: 'Aarong Earth',
    price: 850,
    oldPrice: 1100,
    discount: 23,
    rating: 4.8,
    reviews: 112,
    stock: 65,
    images: [
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=800&q=80'
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Off-White Cream', hex: '#FEF9C3' }
    ],
    sizes: ['M (38-40)', 'L (42-44)', 'XL (46-48)'],
    description: 'Comfortable breathable cotton pajama featuring elasticated waistband, adjustable drawstring, and deep dual zipper pockets.',
    specifications: {
      'Fabric': '100% Breathable Cotton',
      'Waist': 'Elastic + Cotton Drawstring',
      'Pockets': '2 Side Zipper Pockets'
    },
    sku: 'ARG-PAJ-WHT',
    warranty: 'Quality Assured',
    tags: ['Pajama', 'Panjabi Match', 'Cotton', 'Everyday'],
    featured: false,
    bestSeller: true,
    flashSale: false,
    newArrival: false
  },

  // Category 4: Women's Fashion (13-16)
  {
    id: 'prod-13',
    name: 'Authentic Handloomed Dhakai Jamdani Saree (84 Count)',
    slug: 'authentic-handloomed-dhakai-jamdani-saree',
    category: "Women's Fashion",
    categorySlug: 'womens-fashion',
    subcategory: 'Sarees (Jamdani, Silk)',
    brand: 'Aarong Earth',
    price: 12500,
    oldPrice: 15500,
    discount: 19,
    rating: 5.0,
    reviews: 95,
    stock: 6,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80'
    ],
    colors: [
      { name: 'Royal Red & Gold Zari', hex: '#991B1B' },
      { name: 'Emerald Green', hex: '#065F46' },
      { name: 'Midnight Black & Silver', hex: '#0F172A' }
    ],
    description: 'Traditional 84-count Dhakai Jamdani hand-woven in Rupganj, Narayanganj. Takes over 45 days of artisan weaving. Comes in a luxury gift box with certificate of authenticity.',
    specifications: {
      'Origin': 'Rupganj, Narayanganj, Bangladesh',
      'Count': '84 Count Fine Cotton & Zari',
      'Length': '5.5 Meters (Includes unstitched blouse piece)',
      'Artisan Code': 'JAM-RUP-84'
    },
    sku: 'ARG-JAM-84C',
    warranty: '100% Authentic Handloom Guarantee',
    tags: ['Jamdani', 'Saree', 'Dhakai', 'Wedding', 'Festive', 'Heritage'],
    featured: true,
    bestSeller: true,
    flashSale: false,
    newArrival: false
  },
  {
    id: 'prod-14',
    name: 'Festive 3-Piece Georgette Embroidered Salwar Kameez',
    slug: 'festive-3-piece-georgette-salwar-kameez',
    category: "Women's Fashion",
    categorySlug: 'womens-fashion',
    subcategory: 'Salwar Kameez',
    brand: 'Taaga',
    price: 5490,
    oldPrice: 6500,
    discount: 16,
    rating: 4.8,
    reviews: 62,
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80'
    ],
    colors: [
      { name: 'Powder Lilac', hex: '#C084FC' },
      { name: 'Teal Peacock', hex: '#0D9488' },
      { name: 'Dusty Rose', hex: '#FB7185' }
    ],
    sizes: ['M', 'L', 'XL', 'Semi-Stitched'],
    description: 'Exquisite heavy sequence and zari embroidery work on pure georgette kameez paired with santoon inner, trouser, and digitally printed chiffon dupatta.',
    specifications: {
      'Top Fabric': 'Heavy Fox Georgette with Embroidery',
      'Bottom': 'Santoon Silk Straight Trouser',
      'Dupatta': 'Nazmeen Chiffon with Lace Border'
    },
    sku: 'TAA-SK3-LIL',
    warranty: 'Easy 3-Day Return',
    tags: ['Salwar Kameez', 'Eid Special', 'Georgette', '3 Piece'],
    featured: false,
    bestSeller: true,
    flashSale: true,
    newArrival: false
  },
  {
    id: 'prod-15',
    name: 'Modern Modest Premium Dubai Cherry Abaya with Shaila Hijab',
    slug: 'modern-dubai-cherry-abaya-with-hijab',
    category: "Women's Fashion",
    categorySlug: 'womens-fashion',
    subcategory: 'Abayas & Hijabs',
    brand: 'Aarong Earth',
    price: 3850,
    oldPrice: 4600,
    discount: 16,
    rating: 4.9,
    reviews: 78,
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#09090B' },
      { name: 'Cocoa Brown', hex: '#451A03' }
    ],
    sizes: ['52', '54', '56'],
    description: 'Crafted from original imported Dubai Cherry fabric with subtle cuff pearl beading and discreet front buttons. Soft on skin and completely opaque.',
    specifications: {
      'Fabric': 'Imported Dubai Cherry Georgette',
      'Includes': 'Abaya Gown + Matching Shaila Hijab',
      'Length Options': '52" / 54" / 56"'
    },
    sku: 'ARG-ABY-DCH',
    warranty: 'Original Quality Guarantee',
    tags: ['Abaya', 'Hijab', 'Modest Fashion', 'Dubai Fabric'],
    featured: false,
    bestSeller: false,
    flashSale: false,
    newArrival: true
  },
  {
    id: 'prod-16',
    name: 'Casual Cotton Kurti with Floral Block Print',
    slug: 'casual-cotton-kurti-floral-block-print',
    category: "Women's Fashion",
    categorySlug: 'womens-fashion',
    subcategory: 'Kurtis & Tunics',
    brand: 'Taaga',
    price: 1450,
    oldPrice: 1850,
    discount: 22,
    rating: 4.7,
    reviews: 84,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80'
    ],
    colors: [
      { name: 'Mustard Yellow', hex: '#CA8A04' },
      { name: 'Sky Mint', hex: '#2DD4BF' }
    ],
    sizes: ['S (36)', 'M (38)', 'L (40)', 'XL (42)'],
    description: '100% fine voile cotton single kurti with traditional hand-carved woodblock floral motifs and wooden decorative buttons.',
    specifications: {
      'Fabric': '100% Voile Cotton',
      'Print': 'Eco-friendly Vegetable Dye Handblock',
      'Sleeve': 'Three-Quarter Sleeves'
    },
    sku: 'TAA-KRT-MST',
    warranty: 'Standard Return Policy',
    tags: ['Kurti', 'Taaga', 'Handblock', 'Summer Wear'],
    featured: false,
    bestSeller: false,
    flashSale: false,
    newArrival: false
  },

  // Category 5: Kids & Babies (17-18)
  {
    id: 'prod-17',
    name: 'Soft Organic Cotton 5-Piece Newborn Baby Gift Set',
    slug: 'organic-cotton-5pc-newborn-baby-set',
    category: 'Kids & Babies',
    categorySlug: 'kids',
    subcategory: 'Baby Clothing',
    brand: 'Aarong Earth',
    price: 1850,
    oldPrice: 2250,
    discount: 18,
    rating: 4.9,
    reviews: 52,
    stock: 26,
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80',
      'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=800&q=80'
    ],
    colors: [
      { name: 'Pastel Blue', hex: '#93C5FD' },
      { name: 'Pastel Yellow', hex: '#FEF08A' }
    ],
    sizes: ['0-3 Months', '3-6 Months'],
    description: 'Hypoallergenic GOTS certified organic cotton baby essentials: includes 1 front snap romper, 1 pajama, 1 cap, 1 pair mittens, and 1 bib.',
    specifications: {
      'Fabric': '100% GOTS Certified Organic Cotton',
      'Set Contains': '5 Matching Pieces in Gift Box',
      'Safety': 'Nickel-free snaps and tagless necklines'
    },
    sku: 'ARG-BABY-5PC',
    warranty: 'Safe & Non-Toxic Guarantee',
    tags: ['Baby', 'Newborn', 'Organic', 'Gift Set'],
    featured: false,
    bestSeller: true,
    flashSale: false,
    newArrival: false
  },
  {
    id: 'prod-18',
    name: 'Interactive Wooden Bangla Alphabet & Number Learning Board',
    slug: 'wooden-bangla-alphabet-learning-board',
    category: 'Kids & Babies',
    categorySlug: 'kids',
    subcategory: 'Educational Toys',
    brand: 'Walton Digi-Tech',
    price: 950,
    oldPrice: 1250,
    discount: 24,
    rating: 4.8,
    reviews: 41,
    stock: 38,
    images: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80'
    ],
    description: 'Handcrafted smooth pine wood puzzle board featuring full Bangla Borno-Mala (স্বরবর্ণ ও ব্যঞ্জনবর্ণ) with colorful easy-to-grip knobs for toddlers.',
    specifications: {
      'Material': 'Non-toxic natural beech wood with water-based colors',
      'Age Group': '2 to 6 Years',
      'Dimensions': '30cm x 22cm'
    },
    sku: 'WLT-KID-BNG',
    warranty: 'Non-Toxic Safety Tested',
    tags: ['Toys', 'Educational', 'Bangla', 'Montessori'],
    featured: false,
    bestSeller: false,
    flashSale: false,
    newArrival: true
  },

  // Category 6: Beauty & Personal Care (19-22)
  {
    id: 'prod-19',
    name: 'Khaas Food 100% Pure Cold-Pressed Virgin Coconut Oil 250ml',
    slug: 'khaas-food-cold-pressed-virgin-coconut-oil',
    category: 'Beauty & Personal Care',
    categorySlug: 'beauty-personal-care',
    subcategory: 'Hair Oils & Shampoos',
    brand: 'Khaas Food',
    price: 360,
    oldPrice: 420,
    discount: 14,
    rating: 4.9,
    reviews: 167,
    stock: 80,
    images: [
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&q=80',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80'
    ],
    description: 'Extracted from fresh coastal coconuts using wood-pressed ghani technique without heat or chemicals. Excellent natural moisturizer for glowing skin and thick hair.',
    specifications: {
      'Extraction': 'Wood-pressed cold extraction',
      'Volume': '250 ml Glass Bottle',
      'Purity': '100% Edible & Cosmetic Grade'
    },
    sku: 'KHF-COCO-250',
    warranty: '100% Organic Purity Certificate',
    tags: ['Hair Oil', 'Coconut Oil', 'Organic', 'Khaas Food', 'Skincare'],
    featured: true,
    bestSeller: true,
    flashSale: true,
    newArrival: false
  },
  {
    id: 'prod-20',
    name: 'CeraVe Hydrating Facial Cleanser for Normal to Dry Skin 473ml',
    slug: 'cerave-hydrating-facial-cleanser-473ml',
    category: 'Beauty & Personal Care',
    categorySlug: 'beauty-personal-care',
    subcategory: 'Skin Care',
    brand: 'CeraVe Authentic',
    price: 2650,
    oldPrice: 3100,
    discount: 15,
    rating: 4.9,
    reviews: 130,
    stock: 24,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80'
    ],
    description: 'Developed with dermatologists, formulated with 3 essential ceramides and hyaluronic acid to cleanse, hydrate and help restore the protective skin barrier.',
    specifications: {
      'Volume': '473 ml (16 fl oz)',
      'Skin Type': 'Normal to Dry, Sensitive Skin',
      'Formulation': 'Non-comedogenic, Fragrance-free'
    },
    sku: 'CRV-HYD-473',
    warranty: 'Authentic Import with Verification Hologram',
    tags: ['CeraVe', 'Facial Cleanser', 'Skincare', 'Dermatologist'],
    featured: false,
    bestSeller: true,
    flashSale: false,
    newArrival: false
  },
  {
    id: 'prod-21',
    name: 'Al-Haramain Amber Oud Gold Edition Eau De Parfum 60ml',
    slug: 'al-haramain-amber-oud-gold-edition-60ml',
    category: 'Beauty & Personal Care',
    categorySlug: 'beauty-personal-care',
    subcategory: 'Fragrances & Attar',
    brand: 'Al Haramain',
    price: 6850,
    oldPrice: 7900,
    discount: 13,
    rating: 4.9,
    reviews: 84,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80'
    ],
    description: 'A luxurious unisex sweet oriental fragrance blending bergamot, fresh melon, pineapple, warm amber, and sensual vanilla. Incredible 12+ hour sillage.',
    specifications: {
      'Volume': '60 ml EDP Spray',
      'Concentration': 'Eau De Parfum (Long Lasting)',
      'Notes': 'Melon, Pineapple, Amber, Musk, Woody Vanilla'
    },
    sku: 'ALH-AMB-60',
    warranty: '100% Original Sealed Box',
    tags: ['Perfume', 'Al Haramain', 'Oud', 'Fragrance', 'Luxury'],
    featured: false,
    bestSeller: false,
    flashSale: false,
    newArrival: true
  },
  {
    id: 'prod-22',
    name: 'Philips Series 3000 Rechargeable Beard Trimmer with Fast Charge',
    slug: 'philips-series-3000-beard-trimmer',
    category: 'Beauty & Personal Care',
    categorySlug: 'beauty-personal-care',
    subcategory: 'Men Grooming',
    brand: 'Philips',
    price: 3250,
    oldPrice: 3800,
    discount: 14,
    rating: 4.7,
    reviews: 118,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&q=80'
    ],
    description: 'Self-sharpening stainless steel blades with Lift & Trim system that cuts 30% faster. 20 lock-in precision length settings from 0.5 to 10mm.',
    specifications: {
      'Run Time': '60 Minutes Cordless Use on 1hr Charge',
      'Precision': '0.5mm Steps with Zoom Wheel',
      'Blades': 'DuraPower Self-Sharpening Steel'
    },
    sku: 'PHI-BT-3000',
    warranty: '2 Years Philips International Warranty',
    tags: ['Trimmer', 'Grooming', 'Philips', 'Beard Care'],
    featured: false,
    bestSeller: true,
    flashSale: true,
    newArrival: false
  },

  // Category 7: Home & Living (23-26)
  {
    id: 'prod-23',
    name: 'Prestige 5-Litre Deluxe Stainless Steel Pressure Cooker',
    slug: 'prestige-5-litre-stainless-steel-pressure-cooker',
    category: 'Home & Living',
    categorySlug: 'home-living',
    subcategory: 'Kitchenware & Cookers',
    brand: 'Prestige',
    price: 4650,
    oldPrice: 5500,
    discount: 15,
    rating: 4.8,
    reviews: 79,
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&q=80',
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&q=80'
    ],
    description: 'Heavy gauge 304 food-grade stainless steel with induction-compatible sandwich alpha base. Equipped with controlled gasket release system and metallic safety plug.',
    specifications: {
      'Capacity': '5.0 Litres',
      'Base': 'Alpha Induction Base for Even Heat',
      'Material': 'AISI 304 Food Grade Stainless Steel'
    },
    sku: 'PRS-PC-5L',
    warranty: '5 Years Manufacturer Warranty',
    tags: ['Cooker', 'Kitchenware', 'Prestige', 'Cooking'],
    featured: false,
    bestSeller: true,
    flashSale: false,
    newArrival: false
  },
  {
    id: 'prod-24',
    name: 'Aarong Handwoven Cotton King Bed Sheet Set with 2 Pillow Covers',
    slug: 'aarong-handwoven-cotton-king-bedsheet-set',
    category: 'Home & Living',
    categorySlug: 'home-living',
    subcategory: 'Bedding & Pillows',
    brand: 'Aarong Earth',
    price: 2450,
    oldPrice: 2950,
    discount: 17,
    rating: 4.9,
    reviews: 93,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80'
    ],
    colors: [
      { name: 'Indigo Mandala', hex: '#1E3A8A' },
      { name: 'Earthy Terracotta', hex: '#9A3412' }
    ],
    description: 'Crafted from 100% thick handloom yarn in Sirajganj. Breathable, durable, and gets softer with every wash. Perfectly fits king size mattresses up to 8 inches deep.',
    specifications: {
      'Size': 'King Size (7.5 ft x 8.5 ft / 90" x 102")',
      'Includes': '1 King Bed Sheet + 2 Matching Pillow Shams',
      'Material': '100% Handloom Cotton'
    },
    sku: 'ARG-BDS-KNG',
    warranty: 'Color Fastness Guaranteed',
    tags: ['Bed Sheet', 'Aarong', 'Handloom', 'Home Decor'],
    featured: true,
    bestSeller: false,
    flashSale: false,
    newArrival: true
  },
  {
    id: 'prod-25',
    name: 'Smart Ambient LED Floor Corner Lamp with RGB Remote & App Control',
    slug: 'smart-ambient-rgb-floor-corner-lamp',
    category: 'Home & Living',
    categorySlug: 'home-living',
    subcategory: 'Lighting & Lamps',
    brand: 'Walton Digi-Tech',
    price: 3150,
    oldPrice: 3800,
    discount: 17,
    rating: 4.6,
    reviews: 54,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'
    ],
    description: 'Minimalist Nordic corner light offering 16 million colors and 300+ dynamic lighting effects. Syncs with music rhythm for gaming and living room entertainment.',
    specifications: {
      'Height': '140 cm (55 inches)',
      'Control': 'Wireless Remote + Smart Life App (iOS/Android)',
      'Power': '20W Energy Efficient LEDs'
    },
    sku: 'WLT-LGT-CRN',
    warranty: '1 Year Replacement Warranty',
    tags: ['Lighting', 'Smart Home', 'RGB Lamp', 'Living Room'],
    featured: false,
    bestSeller: false,
    flashSale: true,
    newArrival: false
  },
  {
    id: 'prod-26',
    name: 'Heavy Duty 4-Tier Multipurpose Metal Kitchen Storage Rack',
    slug: 'heavy-duty-4-tier-metal-kitchen-storage-rack',
    category: 'Home & Living',
    categorySlug: 'home-living',
    subcategory: 'Storage Organizers',
    brand: 'Walton Digi-Tech',
    price: 2850,
    oldPrice: 3400,
    discount: 16,
    rating: 4.8,
    reviews: 67,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80'
    ],
    description: 'Rust-resistant powder-coated carbon steel shelving unit with 360-degree lockable caster wheels. Holds up to 80kg of kitchen microwave, spices, and groceries.',
    specifications: {
      'Material': 'Anti-rust Powder Coated Carbon Steel',
      'Capacity': 'Up to 20kg per tier (80kg total)',
      'Dimensions': '125cm H x 60cm W x 35cm D'
    },
    sku: 'WLT-RCK-4T',
    warranty: '1 Year Rust-Free Warranty',
    tags: ['Kitchen Rack', 'Storage', 'Organizer', 'Home Living'],
    featured: false,
    bestSeller: false,
    flashSale: false,
    newArrival: false
  },

  // Category 8: Grocery & Essentials (27-30)
  {
    id: 'prod-27',
    name: 'Khaas Food Organic Cold-Pressed Mustard Oil 1 Litre',
    slug: 'khaas-food-cold-pressed-mustard-oil-1l',
    category: 'Grocery & Essentials',
    categorySlug: 'grocery',
    subcategory: 'Mustard Oil & Ghee',
    brand: 'Khaas Food',
    price: 360,
    oldPrice: 410,
    discount: 12,
    rating: 5.0,
    reviews: 215,
    stock: 120,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80'
    ],
    description: 'Ghani-broken from premium native mustard seeds (দেশি সরিষা). Pungent natural aroma and deep golden texture, essential for authentic Bangladeshi bhortas, curries, and fish.',
    specifications: {
      'Process': 'Traditional Slow Wooden Ghani Cold-Press',
      'Net Volume': '1 Litre Pet Bottle',
      'Standard': 'BSTI Certified 100% Pure'
    },
    sku: 'KHF-MST-1L',
    warranty: 'Chemical-Free Purity Tested',
    tags: ['Mustard Oil', 'Organic', 'Ghani', 'Khaas Food', 'Cooking'],
    featured: true,
    bestSeller: true,
    flashSale: false,
    newArrival: false
  },
  {
    id: 'prod-28',
    name: 'Premium Dinajpur Katari Bhog Aromatic Rice 5kg Bag',
    slug: 'dinajpur-katari-bhog-aromatic-rice-5kg',
    category: 'Grocery & Essentials',
    categorySlug: 'grocery',
    subcategory: 'Rice & Grains (Nazirshail, Miniket)',
    brand: 'Khaas Food',
    price: 680,
    oldPrice: 780,
    discount: 13,
    rating: 4.9,
    reviews: 140,
    stock: 90,
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80'
    ],
    description: 'Authentic medium-grain aromatic Katari Bhog rice cultivated in Dinajpur. Known for exceptional fragrance when cooked into Polao, Biryani, and Khichuri.',
    specifications: {
      'Weight': '5 kg Sealed Bag',
      'Origin': 'Dinajpur District, Bangladesh',
      'Quality': 'Aged 1 Year for Non-Sticky Fluffy Grains'
    },
    sku: 'KHF-KAT-5KG',
    warranty: 'Pure Indigenous Grain',
    tags: ['Rice', 'Polao', 'Katari Bhog', 'Dinajpur', 'Grocery'],
    featured: false,
    bestSeller: true,
    flashSale: false,
    newArrival: false
  },
  {
    id: 'prod-29',
    name: 'Khaas Food Raw Sundarban Honey (সুন্দরবনের প্রাকৃতিক মধু) 500g',
    slug: 'khaas-food-raw-sundarban-honey-500g',
    category: 'Grocery & Essentials',
    categorySlug: 'grocery',
    subcategory: 'Organic Spices',
    brand: 'Khaas Food',
    price: 650,
    oldPrice: 750,
    discount: 13,
    rating: 4.9,
    reviews: 198,
    stock: 75,
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80'
    ],
    description: 'Directly sourced from the deep mangrove forest of Sundarban through registered Mowals. Unprocessed, unpasteurized, retaining all natural pollen and enzymes.',
    specifications: {
      'Net Weight': '500 grams Glass Jar',
      'Source': 'Sundarban Mangrove Floral Nectar',
      'Moisture': 'Natural under 20%'
    },
    sku: 'KHF-HNY-500',
    warranty: '100% Raw Wild Honey Certificate',
    tags: ['Honey', 'Sundarban', 'Immunity', 'Organic', 'Natural'],
    featured: false,
    bestSeller: true,
    flashSale: true,
    newArrival: false
  },
  {
    id: 'prod-30',
    name: 'Sreemangal Premium CTC Black Tea 400g Foil Pack',
    slug: 'sreemangal-premium-ctc-black-tea-400g',
    category: 'Grocery & Essentials',
    categorySlug: 'grocery',
    subcategory: 'Beverages & Tea',
    brand: 'Khaas Food',
    price: 240,
    oldPrice: 280,
    discount: 14,
    rating: 4.8,
    reviews: 82,
    stock: 110,
    images: [
      'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=800&q=80'
    ],
    description: 'Selected from first-flush tea gardens of Sreemangal (Sylhet). Offers robust brisk liquor, rich golden color, and strong invigorating aroma.',
    specifications: {
      'Weight': '400 grams Vacuum Sealed Foil',
      'Type': 'Finest Grade CTC Broken Orange Pekoe',
      'Origin': 'Sreemangal, Moulvibazar'
    },
    sku: 'KHF-TEA-400',
    warranty: 'Garden Fresh Quality',
    tags: ['Tea', 'Sylhet', 'Cha', 'Beverages'],
    featured: false,
    bestSeller: false,
    flashSale: false,
    newArrival: false
  },

  // Category 9: Sports & Fitness (31-32)
  {
    id: 'prod-31',
    name: 'CA Plus 15000 7-Star English Willow Cricket Bat',
    slug: 'ca-plus-15000-english-willow-cricket-bat',
    category: 'Sports & Fitness',
    categorySlug: 'sports',
    subcategory: 'Cricket Bats & Gear',
    brand: 'CA Sports',
    price: 18500,
    oldPrice: 22000,
    discount: 16,
    rating: 4.9,
    reviews: 43,
    stock: 10,
    images: [
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80'
    ],
    description: 'Expertly handcrafted from selected Grade 1 English willow with 8 to 11 straight clear grains. Massive 40mm thick edges and featherlight pickup balance.',
    specifications: {
      'Willow': 'Grade 1 Handcrafted English Willow',
      'Weight': '2.8 to 2.9 lbs (Short Handle)',
      'Grip': 'Chevron 3D Rubber Grip'
    },
    sku: 'CAS-BAT-15K',
    warranty: '100% Genuine CA with Barcode Verification',
    tags: ['Cricket', 'Bat', 'English Willow', 'Sports'],
    featured: true,
    bestSeller: false,
    flashSale: false,
    newArrival: true
  },
  {
    id: 'prod-32',
    name: 'Yonex Nanoray 10F Professional Badminton Racket Set with Cover',
    slug: 'yonex-nanoray-10f-badminton-racket-set',
    category: 'Sports & Fitness',
    categorySlug: 'sports',
    subcategory: 'Badminton Rackets',
    brand: 'Yonex',
    price: 3650,
    oldPrice: 4200,
    discount: 13,
    rating: 4.8,
    reviews: 65,
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80'
    ],
    colors: [
      { name: 'Electric Blue', hex: '#2563EB' },
      { name: 'Fiery Red', hex: '#DC2626' }
    ],
    description: 'Head-light aerodynamic frame engineered for lightning-fast swing recovery and repulsion power. Full graphite shaft absorbs impact vibrations.',
    specifications: {
      'Weight / Grip': '4U (80-84g) / G4',
      'String Tension': 'Factory pre-strung at 24 lbs (supports up to 28 lbs)',
      'Material': 'Full Carbon Graphite Frame'
    },
    sku: 'YNX-NR-10F',
    warranty: 'Authentic Sunrise Verified Hologram',
    tags: ['Badminton', 'Yonex', 'Racket', 'Sports'],
    featured: false,
    bestSeller: true,
    flashSale: true,
    newArrival: false
  },

  // Category 10: Books & Stationery (33-34)
  {
    id: 'prod-33',
    name: 'Paradoxical Sajid 1 & 2 Combo (প্যারাডক্সিক্যাল সাজিদ ১ ও ২) - Arif Azad',
    slug: 'paradoxical-sajid-combo-arif-azad',
    category: 'Books & Stationery',
    categorySlug: 'books',
    subcategory: 'Islamic Books',
    brand: 'Guardian Publications',
    price: 680,
    oldPrice: 900,
    discount: 24,
    rating: 5.0,
    reviews: 320,
    stock: 85,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80'
    ],
    description: 'All-time Bangladeshi best-selling intellectual faith book series by author Arif Azad. Deluxe hardcover edition with gold foil embossing.',
    specifications: {
      'Author': 'Arif Azad',
      'Publisher': 'Guardian Publications',
      'Binding': 'Hardcover (Both volumes 1 and 2 included)',
      'Language': 'Bengali (বাংলা)'
    },
    sku: 'BK-SAJID-12',
    warranty: 'Original Printing Guarantee',
    tags: ['Books', 'Bestseller', 'Arif Azad', 'Bangla Literature'],
    featured: true,
    bestSeller: true,
    flashSale: false,
    newArrival: false
  },
  {
    id: 'prod-34',
    name: 'Parker Jotter Stainless Steel Ballpoint Pen with Chrome Trim',
    slug: 'parker-jotter-stainless-steel-ballpoint-pen',
    category: 'Books & Stationery',
    categorySlug: 'books',
    subcategory: 'Notebooks & Pens',
    brand: 'Parker',
    price: 1250,
    oldPrice: 1500,
    discount: 17,
    rating: 4.8,
    reviews: 58,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&q=80'
    ],
    description: 'Iconic Parker design with stainless steel barrel and arrow clip. Quinkflow ink technology provides smooth, clean, and consistent writing.',
    specifications: {
      'Body': 'Expertly crafted stainless steel barrel',
      'Ink Color': 'Blue (Medium 0.7mm tip)',
      'Packaging': 'Parker Official Presentation Gift Box'
    },
    sku: 'PRK-JOT-SS',
    warranty: '2 Years Parker International Mechanical Guarantee',
    tags: ['Pen', 'Parker', 'Stationery', 'Gift', 'Executive'],
    featured: false,
    bestSeller: false,
    flashSale: false,
    newArrival: false
  },

  // Category 11: Watches (35-37)
  {
    id: 'prod-35',
    name: 'Casio Edifice EFR-552D Chronograph Stainless Steel Watch',
    slug: 'casio-edifice-efr-552d-chronograph-watch',
    category: 'Watches',
    categorySlug: 'watches',
    subcategory: 'Men Luxury Watches',
    brand: 'Casio Watches',
    price: 11500,
    oldPrice: 13500,
    discount: 15,
    rating: 4.9,
    reviews: 94,
    stock: 16,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80'
    ],
    colors: [
      { name: 'Silver & Navy Blue Dial', hex: '#1E3A8A' },
      { name: 'All Black Stainless', hex: '#18181B' }
    ],
    description: 'Motorsport inspired precision chronograph with 100-meter water resistance, screw-lock back, retro date display, and mineral crystal glass.',
    specifications: {
      'Water Resistance': '100 Meters (10 Bar)',
      'Movement': 'Japanese Quartz Chronograph (1-second stopwatch)',
      'Band': 'Solid Stainless Steel One-Touch 3-Fold Clasp',
      'Battery Life': 'Approx. 3 Years on SR920SW'
    },
    sku: 'CAS-EFR-552D',
    warranty: '2 Years Official Casio Warranty Card with Hologram',
    tags: ['Casio', 'Edifice', 'Watch', 'Chronograph', 'Luxury'],
    featured: true,
    bestSeller: true,
    flashSale: false,
    newArrival: false
  },
  {
    id: 'prod-36',
    name: 'Curren Chrono Quartz Leather Strap Watch for Men',
    slug: 'curren-chrono-quartz-leather-watch',
    category: 'Watches',
    categorySlug: 'watches',
    subcategory: 'Leather Strap Watches',
    brand: 'Curren BD',
    price: 1850,
    oldPrice: 2450,
    discount: 24,
    rating: 4.6,
    reviews: 112,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80'
    ],
    colors: [
      { name: 'Cognac Brown Strap', hex: '#78350F' },
      { name: 'Pitch Black Strap', hex: '#0F172A' }
    ],
    description: 'Classic business luxury watch featuring calendar display, genuine leather band, and scratch-resistant Hardlex mineral glass dial.',
    specifications: {
      'Case Diameter': '45 mm',
      'Strap Material': 'Genuine Leather',
      'Water Resistance': '3 ATM (Daily Splash Proof)'
    },
    sku: 'CRN-8301-BRN',
    warranty: '1 Year Machine Warranty',
    tags: ['Curren', 'Watch', 'Leather', 'Budget Luxury'],
    featured: false,
    bestSeller: false,
    flashSale: true,
    newArrival: false
  },
  {
    id: 'prod-37',
    name: 'Fossil Carlie Mini Rose Gold Dial Women Mesh Watch',
    slug: 'fossil-carlie-mini-rose-gold-watch',
    category: 'Watches',
    categorySlug: 'watches',
    subcategory: 'Women Fashion Watches',
    brand: 'Fossil',
    price: 13900,
    oldPrice: 16500,
    discount: 16,
    rating: 4.9,
    reviews: 42,
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80'
    ],
    colors: [{ name: 'Rose Gold', hex: '#FB7185' }],
    description: 'Subtle elegance featuring an iridescent mother-of-pearl dial with Roman numerals and an adjustable stainless steel rose gold mesh strap.',
    specifications: {
      'Case Size': '28 mm',
      'Strap': 'Stainless Steel Mesh 12mm',
      'Movement': 'Three-Hand Quartz'
    },
    sku: 'FSL-ES-4502',
    warranty: '2 Years Fossil Official International Warranty',
    tags: ['Fossil', 'Women Watch', 'Rose Gold', 'Luxury'],
    featured: false,
    bestSeller: false,
    flashSale: false,
    newArrival: true
  },

  // Category 12: Shoes & Footwear (38-40)
  {
    id: 'prod-38',
    name: 'Apex Venturini Handcrafted Genuine Leather Formal Loafers',
    slug: 'apex-venturini-genuine-leather-formal-loafers',
    category: 'Shoes & Footwear',
    categorySlug: 'shoes',
    subcategory: 'Leather Loafers',
    brand: 'Apex Footwear',
    price: 4990,
    oldPrice: 5990,
    discount: 17,
    rating: 4.9,
    reviews: 86,
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80'
    ],
    colors: [
      { name: 'Burnished Tan Brown', hex: '#78350F' },
      { name: 'Midnight Black', hex: '#0F172A' }
    ],
    sizes: ['39 (6)', '40 (7)', '41 (8)', '42 (9)', '43 (10)', '44 (11)'],
    description: 'Handcrafted from full-grain bovine leather with cushioned memory foam insoles and anti-skid rubber outsoles. Built for long executive office hours.',
    specifications: {
      'Upper': '100% Genuine Full-Grain Leather',
      'Sole': 'Flexible Lightweight TPR Sole with Grip',
      'Insole': 'Ergonomic Memory Cushion Footbed'
    },
    sku: 'APX-VEN-TAN',
    warranty: '6 Months Sole Pasting Warranty',
    tags: ['Apex', 'Leather Shoes', 'Loafers', 'Formal', 'Office'],
    featured: true,
    bestSeller: true,
    flashSale: false,
    newArrival: false
  },
  {
    id: 'prod-39',
    name: 'Bata Power Breathable Men Running Sneakers with Air Cushion',
    slug: 'bata-power-running-sneakers-air-cushion',
    category: 'Shoes & Footwear',
    categorySlug: 'shoes',
    subcategory: 'Running Sneakers',
    brand: 'Bata Bangladesh',
    price: 2790,
    oldPrice: 3490,
    discount: 20,
    rating: 4.7,
    reviews: 104,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80'
    ],
    colors: [
      { name: 'Crimson Red & Black', hex: '#DC2626' },
      { name: 'All White Sport', hex: '#F8FAFC' }
    ],
    sizes: ['40 (7)', '41 (8)', '42 (9)', '43 (10)', '44 (11)'],
    description: 'High-energy return Power running shoe featuring breathable Flyknit mesh upper, responsive EVA midsole, and heel air cushioning bubble.',
    specifications: {
      'Weight': 'Lightweight 290g per shoe',
      'Upper': 'Seamless Breathable Knit Mesh',
      'Cushioning': 'Impact Absorb Heel Bubble'
    },
    sku: 'BTA-PWR-RED',
    warranty: 'Bata Standard Quality Assurance',
    tags: ['Bata', 'Sneakers', 'Running', 'Sports', 'Power'],
    featured: false,
    bestSeller: true,
    flashSale: true,
    newArrival: false
  },
  {
    id: 'prod-40',
    name: 'Traditional Royal Velvet Nagra Shoes with Golden Jari Embroidery',
    slug: 'traditional-royal-velvet-nagra-shoes',
    category: 'Shoes & Footwear',
    categorySlug: 'shoes',
    subcategory: 'Traditional Nagra',
    brand: 'Apex Footwear',
    price: 2150,
    oldPrice: 2600,
    discount: 17,
    rating: 4.8,
    reviews: 58,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80'
    ],
    colors: [
      { name: 'Royal Maroon & Gold', hex: '#831843' },
      { name: 'Emerald Velvet', hex: '#064E3B' }
    ],
    sizes: ['40', '41', '42', '43', '44'],
    description: 'Hand-stitched velvet Nagra footwear with fine zardozi gold bullion embroidery. The essential partner for groom and wedding panjabi attires.',
    specifications: {
      'Upper': 'Imported Velvet with Hand Embroidered Zari',
      'Lining': 'Soft genuine leather padding',
      'Sole': 'Leather sheet outsole'
    },
    sku: 'APX-NAG-MAR',
    warranty: 'Festive Collection Quality Checked',
    tags: ['Nagra', 'Wedding', 'Traditional', 'Panjabi Match'],
    featured: false,
    bestSeller: false,
    flashSale: false,
    newArrival: true
  },

  // Category 13: Bags & Luggage (41-43)
  {
    id: 'prod-41',
    name: 'Arctic Hunter Water-Resistant 15.6" Laptop Backpack with USB Port',
    slug: 'arctic-hunter-water-resistant-laptop-backpack',
    category: 'Bags & Luggage',
    categorySlug: 'bags',
    subcategory: 'Laptop Backpacks',
    brand: 'Arctic Hunter',
    price: 3450,
    oldPrice: 4200,
    discount: 18,
    rating: 4.9,
    reviews: 74,
    stock: 28,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'
    ],
    colors: [
      { name: 'Space Gray', hex: '#475569' },
      { name: 'Carbon Black', hex: '#0F172A' }
    ],
    description: 'Anti-theft hidden pocket, water-repellent Oxford nylon fabric, shockproof padded 15.6-inch laptop compartment, and external USB passthrough charging port.',
    specifications: {
      'Capacity': '25 Litres',
      'Laptop Fit': 'Up to 15.6" MacBook / Gaming Laptop',
      'Fabric': 'High-density Waterproof Oxford Nylon'
    },
    sku: 'ARC-BP-156',
    warranty: '1 Year Zippers & Stitching Warranty',
    tags: ['Backpack', 'Laptop Bag', 'Waterproof', 'Travel'],
    featured: false,
    bestSeller: true,
    flashSale: true,
    newArrival: false
  },
  {
    id: 'prod-42',
    name: 'Aarong Handcrafted Genuine Leather Bi-Fold Wallet',
    slug: 'aarong-genuine-leather-bifold-wallet',
    category: 'Bags & Luggage',
    categorySlug: 'bags',
    subcategory: 'Leather Wallets',
    brand: 'Aarong Earth',
    price: 1450,
    oldPrice: 1750,
    discount: 17,
    rating: 4.9,
    reviews: 135,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80'
    ],
    colors: [
      { name: 'Vintage Havana Brown', hex: '#78350F' },
      { name: 'Matte Charcoal Black', hex: '#18181B' }
    ],
    description: 'Top-grain vegetable tanned Bangladeshi cowhide leather. Slim profile holding 8 card slots, 2 cash compartments, and a transparent NID card window.',
    specifications: {
      'Leather': '100% Top-Grain Vegetable Tanned Cowhide',
      'Slots': '8 Credit Card Slots, 2 Currency Pockets, 1 ID Window',
      'Packaging': 'Aarong Signature Gift Box'
    },
    sku: 'ARG-WLT-BRN',
    warranty: '100% Genuine Leather Guarantee',
    tags: ['Wallet', 'Aarong', 'Leather', 'Men Accessories'],
    featured: true,
    bestSeller: true,
    flashSale: false,
    newArrival: false
  },
  {
    id: 'prod-43',
    name: 'President 24-Inch Hardshell Unbreakable Polycarbonate Spinner Luggage',
    slug: 'president-24-inch-polycarbonate-spinner-luggage',
    category: 'Bags & Luggage',
    categorySlug: 'bags',
    subcategory: 'Travel Trolleys',
    brand: 'President Luggage',
    price: 8900,
    oldPrice: 10500,
    discount: 15,
    rating: 4.8,
    reviews: 38,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&q=80'
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#D97706' },
      { name: 'Metallic Navy', hex: '#1E3A8A' }
    ],
    description: 'Heavy duty 100% virgin Bayer polycarbonate shell that flexes on impact and pops back into shape. Features smooth 360-degree Hinomoto dual wheels and recessed TSA combination lock.',
    specifications: {
      'Size': '24 Inch Medium Check-in Trolley',
      'Lock': 'Official TSA 3-Digit Recessed Lock',
      'Wheels': 'Ultra-Silent 8-Wheel Dual Spinners'
    },
    sku: 'PRS-TRL-24',
    warranty: '3 Years International Shell Warranty',
    tags: ['Luggage', 'Trolley', 'Travel', 'TSA Lock'],
    featured: false,
    bestSeller: false,
    flashSale: false,
    newArrival: true
  },

  // Category 14: Health & Wellness (44-45)
  {
    id: 'prod-44',
    name: 'Omron HEM-7120 Fully Automatic Digital Blood Pressure Monitor',
    slug: 'omron-hem-7120-automatic-blood-pressure-monitor',
    category: 'Health & Wellness',
    categorySlug: 'health-wellness',
    subcategory: 'Blood Pressure Monitors',
    brand: 'Omron Healthcare',
    price: 3650,
    oldPrice: 4200,
    discount: 13,
    rating: 4.9,
    reviews: 142,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80'
    ],
    description: 'Clinically validated Intellisense Technology for comfortable, controlled inflation without pressure pre-setting. Detects irregular heartbeat and body movement.',
    specifications: {
      'Measurement': 'Oscillometric Method (Systolic, Diastolic, Pulse)',
      'Accuracy': 'Pressure +/- 3 mmHg, Pulse +/- 5%',
      'Includes': 'Monitor, Medium Arm Cuff (22-32cm), 4x AA Batteries'
    },
    sku: 'OMR-BP-7120',
    warranty: '3 Years Omron Official Replacement Warranty',
    tags: ['BP Monitor', 'Omron', 'Health', 'Senior Care'],
    featured: true,
    bestSeller: true,
    flashSale: false,
    newArrival: false
  },
  {
    id: 'prod-45',
    name: 'Khaas Food Organic Raw Kalijira Oil (কালোজিরার তেল) 100ml',
    slug: 'khaas-food-organic-kalijira-oil-100ml',
    category: 'Health & Wellness',
    categorySlug: 'health-wellness',
    subcategory: 'Herbal Remidies',
    brand: 'Khaas Food',
    price: 290,
    oldPrice: 340,
    discount: 15,
    rating: 5.0,
    reviews: 180,
    stock: 90,
    images: [
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80'
    ],
    description: 'Cold-pressed from selected Grade-A Nigella Sativa (Black Cumin) seeds. Rich in Thymoquinone antioxidants to support natural immunity, digestion, and respiratory wellness.',
    specifications: {
      'Process': 'Cold-Pressed Unrefined First Extraction',
      'Net Volume': '100 ml Amber Glass Bottle',
      'Grade': '100% Pure Edible Herbal Grade'
    },
    sku: 'KHF-KLJ-100',
    warranty: 'Pure Organic Certificate',
    tags: ['Kalijira Oil', 'Black Seed', 'Immunity', 'Herbal', 'Khaas Food'],
    featured: false,
    bestSeller: true,
    flashSale: false,
    newArrival: false
  },

  // Category 15: Computer & Accessories (46-48)
  {
    id: 'prod-46',
    name: 'Royal Kludge RK61 Wireless RGB 60% Mechanical Keyboard',
    slug: 'royal-kludge-rk61-wireless-mechanical-keyboard',
    category: 'Computer & Accessories',
    categorySlug: 'computer-accessories',
    subcategory: 'Mechanical Keyboards',
    brand: 'Royal Kludge',
    price: 3650,
    oldPrice: 4400,
    discount: 17,
    rating: 4.8,
    reviews: 125,
    stock: 24,
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80'
    ],
    colors: [
      { name: 'Pristine White (Red Switch)', hex: '#F8FAFC' },
      { name: 'Matte Black (Brown Switch)', hex: '#0F172A' }
    ],
    description: 'Compact 61-key hot-swappable mechanical keyboard supporting 3 connection modes: Bluetooth 5.0, 2.4GHz wireless dongle, and Type-C wired. Features 18 dynamic RGB backlighting modes.',
    specifications: {
      'Switches': 'RK Hot-Swappable (Red Linear / Brown Tactile)',
      'Connectivity': 'Tri-Mode (Bluetooth, 2.4G Wireless, USB-C)',
      'Battery': '1450mAh Rechargeable Lithium',
      'Compatibility': 'Windows, Mac, iOS, Android'
    },
    sku: 'RK-61-RGB',
    warranty: '1 Year Replacement Warranty',
    tags: ['Keyboard', 'Mechanical', 'Gaming', 'RGB', 'Wireless'],
    featured: true,
    bestSeller: true,
    flashSale: true,
    newArrival: false
  },
  {
    id: 'prod-47',
    name: 'Logitech MX Master 3S Wireless Performance Ergonomic Mouse',
    slug: 'logitech-mx-master-3s-wireless-mouse',
    category: 'Computer & Accessories',
    categorySlug: 'computer-accessories',
    subcategory: 'Wireless Mice',
    brand: 'Logitech',
    price: 11450,
    oldPrice: 13200,
    discount: 13,
    rating: 4.9,
    reviews: 84,
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80'
    ],
    colors: [
      { name: 'Graphite Black', hex: '#1E293B' },
      { name: 'Pale Gray', hex: '#E2E8F0' }
    ],
    description: 'Quiet click electromagnetic MagSpeed scroll wheel that scrolls 1,000 lines per second. 8,000 DPI sensor tracks on any surface, including glass.',
    specifications: {
      'Sensor': 'Darkfield High Precision (200 - 8000 DPI)',
      'Battery': 'Up to 70 days on full charge (1 min charge = 3 hours use)',
      'Connectivity': 'Bluetooth Low Energy & Logi Bolt USB Receiver'
    },
    sku: 'LOG-MXM-3S',
    warranty: '2 Years Official Logitech Warranty',
    tags: ['Logitech', 'Mouse', 'Productivity', 'Ergonomic'],
    featured: false,
    bestSeller: false,
    flashSale: false,
    newArrival: true
  },
  {
    id: 'prod-48',
    name: 'Walton 23.8-inch Full HD 100Hz Frameless IPS Monitor',
    slug: 'walton-23-8-inch-fhd-ips-monitor',
    category: 'Computer & Accessories',
    categorySlug: 'computer-accessories',
    subcategory: 'Monitors & Displays',
    brand: 'Walton Digi-Tech',
    price: 12900,
    oldPrice: 14900,
    discount: 13,
    rating: 4.7,
    reviews: 63,
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80'
    ],
    description: '3-side borderless bezel design with wide 178-degree viewing angles. 100Hz refresh rate and low blue light filter for effortless office and gaming comfort.',
    specifications: {
      'Panel': '23.8" IPS Full HD (1920 x 1080)',
      'Refresh Rate': '100Hz with AMD FreeSync',
      'Ports': 'HDMI 1.4, VGA, Audio Out',
      'Features': 'Flicker-Free, Low Blue Light'
    },
    sku: 'WLT-MON-24',
    warranty: '3 Years Walton Official Warranty (1 Year Panel)',
    tags: ['Monitor', 'Walton', 'IPS', '100Hz', 'Gaming'],
    featured: false,
    bestSeller: true,
    flashSale: false,
    newArrival: false
  },

  // Category 16: Deals & Offers (49-52)
  {
    id: 'prod-49',
    name: 'Eid Mega Grocery Bumper Pack (Mustard Oil + Katari Rice + Honey + Ghee)',
    slug: 'eid-mega-grocery-bumper-pack',
    category: 'Deals & Offers',
    categorySlug: 'deals',
    subcategory: 'Free Shipping Combos',
    brand: 'Khaas Food',
    price: 2199,
    oldPrice: 2850,
    discount: 23,
    rating: 5.0,
    reviews: 148,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80'
    ],
    description: 'All your festive kitchen essentials in one super saver bundle! Includes 1L Pure Mustard Oil, 5kg Katari Bhog Rice, 250g Sundarban Honey, and 200g Pure Cow Ghee. Free delivery across Bangladesh.',
    specifications: {
      'Contents': '1L Mustard Oil + 5KG Katari Rice + 250g Honey + 200g Ghee',
      'Bonus': 'Free Nationwide Delivery Included',
      'Packaging': 'Heavy duty branded carton'
    },
    sku: 'BDM-EID-GRP',
    warranty: '100% Quality & Freshness Guarantee',
    tags: ['Combo', 'Eid Offer', 'Free Delivery', 'Grocery', 'Super Saver'],
    featured: true,
    bestSeller: true,
    flashSale: true,
    newArrival: false
  },
  {
    id: 'prod-50',
    name: 'Executive Festive Panjabi & Watch Combo Gift Box',
    slug: 'executive-festive-panjabi-watch-combo',
    category: 'Deals & Offers',
    categorySlug: 'deals',
    subcategory: 'Eid Mega Discounts',
    brand: 'Aarong Earth',
    price: 4999,
    oldPrice: 6500,
    discount: 23,
    rating: 4.9,
    reviews: 67,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80'
    ],
    colors: [{ name: 'Navy Panjabi + Silver Chrono', hex: '#1E3A8A' }],
    sizes: ['M (40)', 'L (42)', 'XL (44)'],
    description: 'The ultimate gift bundle: Aarong Earth fine cotton embroidered panjabi paired with a stainless steel quartz chronograph watch in a velvet luxury gift box.',
    specifications: {
      'Includes': 'Embroidered Panjabi + Chrono Watch + Gift Box',
      'Delivery': 'Priority Express Inside Dhaka within 24 Hours'
    },
    sku: 'BDM-EXC-COMBO',
    warranty: 'Authentic Aarong & Watch Warranties',
    tags: ['Gift Box', 'Panjabi', 'Watch', 'Eid Special', 'Combo'],
    featured: true,
    bestSeller: false,
    flashSale: true,
    newArrival: true
  }
];
