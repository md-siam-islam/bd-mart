import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { TrendingUp, ArrowRight } from 'lucide-react';

export const BestSellersShowcase: React.FC = () => {
  const bestSellers = React.useMemo(() => {
    return PRODUCTS.filter((p) => p.bestSeller).slice(0, 4);
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#FF5722] mb-2.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#FF9800]" />
              Most In-Demand
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Best Sellers in Bangladesh
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2 font-normal">
              Customer favorites with the highest verified re-order rates and 5-star satisfaction ratings.
            </p>
          </div>

          <Link
            to="/best-sellers"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 hover:text-[#FF5722] transition-colors group shrink-0"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* 4-Column Balanced Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
