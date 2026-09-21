import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { TrendingUp } from 'lucide-react';

export const BestSellersPage: React.FC = () => {
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom">
        <Breadcrumb items={[{ label: 'Best Sellers' }]} />

        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-primary/30 text-white p-8 sm:p-10 my-6 shadow-xl">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-primary/20 border border-primary/40 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-primary" /> Customer Favorites
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
              Most Popular in Bangladesh
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              The highest-rated and most frequently purchased items verified by real customer satisfaction.
            </p>
          </div>
        </div>

        <ProductGrid products={bestSellers} />
      </div>
    </div>
  );
};
