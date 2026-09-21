import React from 'react';
import { Truck, ShieldCheck, RotateCcw, CreditCard, CheckCircle2 } from 'lucide-react';

export const ShopTrustStrip: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs my-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-slate-700 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FF5722]/10 text-[#FF5722] flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">64 Districts COD</p>
            <span className="text-[10px] text-slate-400">Doorstep pay & check</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#4CAF50]/10 text-[#4CAF50] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">100% Genuine</p>
            <span className="text-[10px] text-slate-400">Authenticity guaranteed</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FF9800]/10 text-[#FF9800] flex items-center justify-center shrink-0">
            <RotateCcw className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">7 Days Return</p>
            <span className="text-[10px] text-slate-400">Hassle-free replacement</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#2196F3]/10 text-[#2196F3] flex items-center justify-center shrink-0">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">bKash & Nagad</p>
            <span className="text-[10px] text-slate-400">Instant tokenized pay</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">Steadfast Logistics</p>
            <span className="text-[10px] text-slate-400">Live SMS parcel tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
};
