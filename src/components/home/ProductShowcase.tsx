import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { ArrowRight, Sparkles, Flame, Star } from 'lucide-react';

export const ProductShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'newarrivals' | 'featured' | 'flashdeals'>('newarrivals');

  const filteredProducts = React.useMemo(() => {
    switch (activeTab) {
      case 'newarrivals':
        return PRODUCTS.filter((p) => p.newArrival).slice(0, 8);
      case 'flashdeals':
        return PRODUCTS.filter((p) => p.flashSale || (p.discount && p.discount >= 15)).slice(0, 8);
      case 'featured':
      default:
        return PRODUCTS.filter((p) => p.featured).slice(0, 8);
    }
  }, [activeTab]);

  return (
    <section className="py-16 sm:py-24 bg-slate-50/60 border-b border-slate-100">
      <div className="container-custom">
        {/* Section Header & Interactive Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#FF5722] mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9800]" />
              New Season 2026
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Featured Products & New Arrivals
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Explore authentic apparel, verified electronics, and organic pantry staples crafted for quality.
            </p>
          </div>

          {/* Editorial Category Segment Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white border border-slate-200/80 rounded-2xl shadow-xs self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('newarrivals')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'newarrivals'
                  ? 'bg-[#FF5722] text-white shadow-md shadow-[#FF5722]/25'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>New Arrivals</span>
            </button>

            <button
              onClick={() => setActiveTab('featured')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'featured'
                  ? 'bg-[#FF5722] text-white shadow-md shadow-[#FF5722]/25'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Editor's Picks</span>
            </button>

            <button
              onClick={() => setActiveTab('flashdeals')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'flashdeals'
                  ? 'bg-[#FF5722] text-white shadow-md shadow-[#FF5722]/25'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Special Deals</span>
            </button>
          </div>
        </div>

        {/* Responsive Product Grid: 4 cols desktop, 3 cols tablet, 2 cols mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Catalog CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-900 text-slate-900 hover:text-white border border-slate-200 text-xs sm:text-sm font-black transition-all duration-300 shadow-sm hover:shadow-lg group"
          >
            <span>Explore All 50+ Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
