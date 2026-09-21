import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Flame, Clock } from 'lucide-react';

export const FlashSalePage: React.FC = () => {
  const flashProducts = PRODUCTS.filter((p) => p.flashSale || (p.discount && p.discount >= 15));

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom">
        <Breadcrumb items={[{ label: 'Flash Sale Deals' }]} />

        {/* Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-rose-600 to-orange-600 text-white p-8 sm:p-10 my-6 shadow-xl relative overflow-hidden">
          <div className="max-w-xl relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase mb-3">
              <Flame className="w-4 h-4 fill-white" /> Limited Time Flash Sale
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
              Save Up to 35% on Top Brands
            </h1>
            <p className="text-xs sm:text-sm text-rose-100">
              Exclusive timed price drops across smartphones, electronics, festive wear, and groceries. Grab yours before stock runs out!
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
            <span>Showing {flashProducts.length} flash sale items</span>
          </div>
          <ProductGrid products={flashProducts} />
        </div>
      </div>
    </div>
  );
};
