import React from 'react';
import { COUPONS } from '../data/coupons';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { useToast } from '../context/ToastContext';
import { Tag, Copy, Gift, Sparkles } from 'lucide-react';

export const DealsOffersPage: React.FC = () => {
  const { showToast } = useToast();

  const handleCopyCode = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      showToast(`Coupon code "${code}" copied!`, 'success');
    }
  };

  const dealProducts = PRODUCTS.filter((p) => p.categorySlug === 'deals' || (p.discount && p.discount >= 20));

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom">
        <Breadcrumb items={[{ label: 'Deals & Offers' }]} />

        {/* Header Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 text-white p-8 sm:p-10 my-6 shadow-xl">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase mb-3">
              <Gift className="w-4 h-4 text-white" /> Promotional Campaign
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
              Exclusive Vouchers & Super Savers
            </h1>
            <p className="text-xs sm:text-sm text-orange-100">
              Apply valid coupon vouchers at checkout to save flat discounts up to ৳600 on your favorite products.
            </p>
          </div>
        </div>

        {/* Coupon Grid */}
        <div className="mb-12">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5 text-primary" /> Active Coupon Codes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COUPONS.map((coupon) => (
              <div
                key={coupon.code}
                className="bg-white rounded-2xl p-5 border-2 border-dashed border-primary/30 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="bg-primary/10 text-primary font-mono font-black text-sm px-2.5 py-1 rounded-lg">
                      {coupon.code}
                    </span>
                    <button
                      onClick={() => handleCopyCode(coupon.code)}
                      className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
                      title="Copy code"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    {coupon.description}
                  </h4>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Min order: ৳{coupon.minOrder.toLocaleString()}</span>
                  <span>Valid till {coupon.expiryDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Super Saver Products */}
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" /> Bumper Deals & Combos
          </h2>
          <ProductGrid products={dealProducts} />
        </div>
      </div>
    </div>
  );
};
