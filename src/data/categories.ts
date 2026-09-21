import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Electronics',
    nameBn: 'ইলেকট্রনিক্স',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80',
    icon: 'Tv',
    productCount: 48,
    subcategories: ['Audio & Headphones', 'Smart Watches', 'Cameras & Drones', 'Home Appliances', 'Gaming Consoles'],
    featured: true
  },
  {
    id: 'cat-2',
    name: 'Mobile & Accessories',
    nameBn: 'মোবাইল ও অ্যাক্সেসরিজ',
    slug: 'mobile-accessories',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
    icon: 'Smartphone',
    productCount: 65,
    subcategories: ['Smartphones', 'Fast Chargers', 'Power Banks', 'Cases & Covers', 'Screen Protectors'],
    featured: true
  },
  {
    id: 'cat-3',
    name: "Men's Fashion",
    nameBn: 'পুরুষদের ফ্যাশন',
    slug: 'mens-fashion',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=500&q=80',
    icon: 'Shirt',
    productCount: 82,
    subcategories: ['Panjabi & Pajama', 'Casual Shirts', 'Denim Jeans', 'T-Shirts & Polos', 'Formal Suits'],
    featured: true
  },
  {
    id: 'cat-4',
    name: "Women's Fashion",
    nameBn: 'নারীদের ফ্যাশন',
    slug: 'womens-fashion',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80',
    icon: 'Sparkles',
    productCount: 94,
    subcategories: ['Sarees (Jamdani, Silk)', 'Salwar Kameez', 'Kurtis & Tunics', 'Western Wear', 'Abayas & Hijabs'],
    featured: true
  },
  {
    id: 'cat-5',
    name: 'Kids & Babies',
    nameBn: 'কিডস ও বেবি',
    slug: 'kids',
    image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=500&q=80',
    icon: 'Baby',
    productCount: 38,
    subcategories: ['Baby Clothing', 'Educational Toys', 'Diapers & Wipes', 'Baby Care Essentials', 'School Bags'],
    featured: false
  },
  {
    id: 'cat-6',
    name: 'Beauty & Personal Care',
    nameBn: 'সৌন্দর্য ও রূপচর্চা',
    slug: 'beauty-personal-care',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80',
    icon: 'Heart',
    productCount: 56,
    subcategories: ['Skin Care', 'Hair Oils & Shampoos', 'Fragrances & Attar', 'Makeup Essentials', 'Men Grooming'],
    featured: true
  },
  {
    id: 'cat-7',
    name: 'Home & Living',
    nameBn: 'হোম ও লিভিং',
    slug: 'home-living',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&q=80',
    icon: 'Home',
    productCount: 42,
    subcategories: ['Bedding & Pillows', 'Kitchenware & Cookers', 'Home Decor', 'Lighting & Lamps', 'Storage Organizers'],
    featured: true
  },
  {
    id: 'cat-8',
    name: 'Grocery & Essentials',
    nameBn: 'মুদি ও খাদ্যদ্রব্য',
    slug: 'grocery',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80',
    icon: 'ShoppingBag',
    productCount: 75,
    subcategories: ['Rice & Grains (Nazirshail, Miniket)', 'Mustard Oil & Ghee', 'Organic Spices', 'Beverages & Tea', 'Snacks & Dry Fruits'],
    featured: true
  },
  {
    id: 'cat-9',
    name: 'Sports & Fitness',
    nameBn: 'স্পোর্টস ও ফিটনেস',
    slug: 'sports',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&q=80',
    icon: 'Dumbbell',
    productCount: 31,
    subcategories: ['Cricket Bats & Gear', 'Football & Jerseys', 'Gym Weights & Bands', 'Badminton Rackets', 'Running Accessories'],
    featured: false
  },
  {
    id: 'cat-10',
    name: 'Books & Stationery',
    nameBn: 'বই ও স্টেশনারি',
    slug: 'books',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80',
    icon: 'BookOpen',
    productCount: 60,
    subcategories: ['Bangla Literature', 'Islamic Books', 'Academic & BCS Prep', 'Self Help & Business', 'Notebooks & Pens'],
    featured: false
  },
  {
    id: 'cat-11',
    name: 'Watches',
    nameBn: 'ঘড়ি',
    slug: 'watches',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80',
    icon: 'Watch',
    productCount: 29,
    subcategories: ['Men Luxury Watches', 'Women Fashion Watches', 'Smart Fitness Bands', 'Leather Strap Watches'],
    featured: true
  },
  {
    id: 'cat-12',
    name: 'Shoes & Footwear',
    nameBn: 'জুতা ও স্যান্ডেল',
    slug: 'shoes',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80',
    icon: 'Footprints',
    productCount: 52,
    subcategories: ['Leather Loafers', 'Running Sneakers', 'Traditional Nagra', 'Women Heels', 'Casual Sandals'],
    featured: true
  },
  {
    id: 'cat-13',
    name: 'Bags & Luggage',
    nameBn: 'ব্যাগ ও লাগেজ',
    slug: 'bags',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    icon: 'Briefcase',
    productCount: 34,
    subcategories: ['Laptop Backpacks', 'Leather Wallets', 'Women Handbags', 'Travel Trolleys', 'Crossbody Bags'],
    featured: false
  },
  {
    id: 'cat-14',
    name: 'Health & Wellness',
    nameBn: 'স্বাস্থ্য ও সুরক্ষাসামগ্রী',
    slug: 'health-wellness',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&q=80',
    icon: 'Activity',
    productCount: 27,
    subcategories: ['Blood Pressure Monitors', 'Digital Thermometers', 'Supplements & Vitamins', 'Massagers', 'Herbal Remidies'],
    featured: false
  },
  {
    id: 'cat-15',
    name: 'Computer & Accessories',
    nameBn: 'কম্পিউটার ও অ্যাক্সেসরিজ',
    slug: 'computer-accessories',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&q=80',
    icon: 'Monitor',
    productCount: 45,
    subcategories: ['Mechanical Keyboards', 'Wireless Mice', 'Monitors & Displays', 'USB Hubs & Cables', 'External SSDs'],
    featured: true
  },
  {
    id: 'cat-16',
    name: 'Deals & Offers',
    nameBn: 'অফার ও ডিসকাউন্ট',
    slug: 'deals',
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=500&q=80',
    icon: 'Tag',
    productCount: 30,
    subcategories: ['Eid Mega Discounts', 'Buy 1 Get 1', 'Flash Clearance', 'Under ৳999', 'Free Shipping Combos'],
    featured: true
  }
];
