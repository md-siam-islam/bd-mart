import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react';

export const FeaturedSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'featured' | 'bestsellers' | 'newarrivals'>('featured');

  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'bestsellers':
        return PRODUCTS.filter((p) => p.bestSeller).slice(0, 8);
      case 'newarrivals':
        return PRODUCTS.filter((p) => p.newArrival).slice(0, 8);
      case 'featured':
      default:
        return PRODUCTS.filter((p) => p.featured).slice(0, 8);
    }
  };

  const products = getFilteredProducts();

  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <div className="container-custom">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-primary tracking-wider uppercase block mb-1">
              Curated Picks
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Recommended for You
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl overflow-x-auto">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'featured'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Featured
            </button>

            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'bestsellers'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" /> Best Sellers
            </button>

            <button
              onClick={() => setActiveTab('newarrivals')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'newarrivals'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5" /> New Arrivals
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Footer Link */}
        <div className="text-center mt-10">
          <Link
            to={
              activeTab === 'bestsellers'
                ? '/best-sellers'
                : activeTab === 'newarrivals'
                ? '/new-arrivals'
                : '/shop'
            }
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md"
          >
            Explore More in {activeTab === 'bestsellers' ? 'Best Sellers' : activeTab === 'newarrivals' ? 'New Arrivals' : 'Shop'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
