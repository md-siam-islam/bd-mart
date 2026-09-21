import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedCategory {
  id: string;
  name: string;
  slug: string;
  tag: string;
  description: string;
  image: string;
  itemCount: string;
}

const FEATURED_CATEGORIES: FeaturedCategory[] = [
  {
    id: 'cat-mens',
    name: "Men's Heritage & Festive Wear",
    slug: 'mens-fashion',
    tag: 'Festive Eid Collection',
    description: 'Fine cotton Panjabis, handcrafted embroidery, and tailored festive comfort.',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&auto=format&fit=crop&q=85',
    itemCount: '82+ Items'
  },
  {
    id: 'cat-womens',
    name: "Women's Jamdani & Silk Sarees",
    slug: 'womens-fashion',
    tag: 'Artisan Woven',
    description: 'Authentic Dhakai Jamdani, pure silk sarees, and festive designer ensembles.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=85',
    itemCount: '94+ Items'
  },
  {
    id: 'cat-tech',
    name: 'Flagship Tech & Audio Gear',
    slug: 'electronics',
    tag: 'Official Warranty',
    description: 'Active noise-cancelling headphones, AMOLED smartwatches, and computing gear.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=85',
    itemCount: '48+ Items'
  },
  {
    id: 'cat-organic',
    name: '100% Pure Organic Agro & Honey',
    slug: 'grocery',
    tag: 'Lab-Tested Pure',
    description: 'Sundarban raw Khalisha honey, cold-pressed mustard oil, and pure cow ghee.',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&auto=format&fit=crop&q=85',
    itemCount: '75+ Items'
  },
  {
    id: 'cat-home',
    name: 'Smart Living & Kitchen Appliances',
    slug: 'home-kitchen',
    tag: 'Energy Saver',
    description: 'Digital air fryers, multi-room robot vacuums, and modern lifestyle appliances.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=85',
    itemCount: '56+ Items'
  },
  {
    id: 'cat-footwear',
    name: 'Handcrafted Leather & Footwear',
    slug: 'footwear',
    tag: 'Genuine Leather',
    description: 'Artisan genuine leather shoes, formal footwear, and comfortable festive sandals.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=85',
    itemCount: '42+ Items'
  }
];

export const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="container-custom">
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#FF5722] mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9800]" />
              Curated Departments
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Featured Categories
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2 font-normal">
              Explore handpicked collections crafted with authentic craftsmanship and official brand warranties.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 hover:text-[#FF5722] transition-colors group shrink-0"
          >
            <span>Browse All 16 Departments</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-3xl bg-slate-950 aspect-[4/3] sm:aspect-[16/11] flex flex-col justify-end p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 select-none"
            >
              {/* Background Image with Hover Zoom */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-108 transition-transform duration-700 ease-out will-change-transform"
                />
                {/* Cinematic Vignette & Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent group-hover:via-slate-950/75 transition-all duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              </div>

              {/* Foreground Card Content */}
              <div className="relative z-10 space-y-2.5 transform transition-transform duration-300 group-hover:-translate-y-1">
                {/* Tag & Item Count */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20">
                    {category.tag}
                  </span>
                  <span className="text-[11px] font-bold text-white/75 font-mono">
                    {category.itemCount}
                  </span>
                </div>

                {/* Category Title */}
                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                  {category.description}
                </p>

                {/* Explore Pill Button */}
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                    <span>Shop Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
