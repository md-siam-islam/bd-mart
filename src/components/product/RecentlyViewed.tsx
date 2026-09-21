import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { History, X, Sparkles } from 'lucide-react';

export const RecentlyViewed: React.FC = () => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('bdmart_recently_viewed');
      if (!stored) return;
      const ids: string[] = JSON.parse(stored);
      if (!Array.isArray(ids) || ids.length === 0) return;

      const found = ids
        .map((id) => PRODUCTS.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p))
        .slice(0, 4);

      setRecentProducts(found);
    } catch {
      // fallback
    }
  }, []);

  const handleClear = () => {
    localStorage.removeItem('bdmart_recently_viewed');
    setRecentProducts([]);
  };

  if (recentProducts.length === 0) return null;

  return (
    <section className="mt-14 pt-10 border-t border-slate-200/80">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#FF5722] mb-1">
            <History className="w-3.5 h-3.5 text-[#FF9800]" />
            Browsing History
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Recently Viewed Products
          </h3>
        </div>

        <button
          onClick={handleClear}
          className="text-xs font-bold text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
        {recentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
