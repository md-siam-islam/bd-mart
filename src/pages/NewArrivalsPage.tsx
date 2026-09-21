import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Sparkles } from 'lucide-react';

export const NewArrivalsPage: React.FC = () => {
  const newProducts = PRODUCTS.filter((p) => p.newArrival);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom">
        <Breadcrumb items={[{ label: 'New Arrivals' }]} />

        <div className="rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-8 sm:p-10 my-6 shadow-xl">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" /> Just Added to Store
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
              Fresh 2026 Season Drops
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100">
              The latest flagship releases, designer panjabis, ergonomic accessories, and skincare innovations in Bangladesh.
            </p>
          </div>
        </div>

        <ProductGrid products={newProducts} />
      </div>
    </div>
  );
};
