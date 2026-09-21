import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { Flame, Clock, ArrowRight } from 'lucide-react';

export const FlashSaleSection: React.FC = () => {
  // Live Countdown Timer (e.g. 08 : 45 : 32)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashSaleProducts = PRODUCTS.filter((p) => p.flashSale || (p.discount && p.discount >= 15)).slice(0, 4);

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-100">
      <div className="container-custom">
        {/* Header with Countdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-5 sm:p-6 rounded-2xl border border-rose-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
              <Flame className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Flash Sale
                </h2>
                <span className="bg-rose-100 text-rose-600 text-xs font-black px-2 py-0.5 rounded-full uppercase">
                  Up to 30% Off
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Limited quantity available at special promotional prices.
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-1">
              <Clock className="w-3.5 h-3.5 text-rose-500" /> Ends In:
            </span>
            <div className="flex items-center gap-1.5 font-mono text-sm font-black text-slate-900">
              <span className="bg-slate-900 text-white px-2.5 py-1.5 rounded-lg shadow-xs">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-slate-900 text-white px-2.5 py-1.5 rounded-lg shadow-xs">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-rose-600 text-white px-2.5 py-1.5 rounded-lg shadow-xs">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {flashSaleProducts.map((product) => (
            <div key={product.id} className="flex flex-col">
              <ProductCard product={product} />
              {/* Flash Sale Stock Progress Bar */}
              <div className="mt-2 bg-white p-2.5 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold mb-1">
                  <span>Sold: {Math.max(10, 40 - product.stock)}</span>
                  <span className="text-rose-600 font-bold">Only {product.stock} left</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"
                    style={{ width: `${Math.min(85, ((40 - product.stock) / 40) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link
            to="/flash-sale"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-primary text-slate-800 hover:text-primary rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            View All Flash Sale Deals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
