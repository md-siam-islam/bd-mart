import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Tag } from 'lucide-react';

export const PromoBanners: React.FC = () => {
  return (
    <section className="py-12 bg-slate-50 border-b border-slate-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 1: Eid Fashion & Panjabi */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-primary/30 text-white p-8 sm:p-10 flex flex-col justify-between min-h-[260px] shadow-lg group">
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-35 group-hover:opacity-45 transition-opacity pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80"
                alt="Panjabi Collection"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10 max-w-sm">
              <span className="inline-flex items-center gap-1.5 bg-primary/30 border border-primary/40 text-amber-300 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Festive Collection
              </span>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight">
                Authentic Dhakai Jamdani & Fine Silks
              </h3>
              <p className="text-xs text-slate-300 mt-2">
                Handcrafted heritage apparel direct from local weavers in Narayanganj.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Link
                to="/category/womens-fashion"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-amber-50 transition-colors shadow-sm"
              >
                Explore Sarees <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Banner 2: Smart Tech & Accessories */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 sm:p-10 flex flex-col justify-between min-h-[260px] shadow-lg group">
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-25 group-hover:opacity-35 transition-opacity pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80"
                alt="Gadgets"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10 max-w-sm">
              <span className="inline-flex items-center gap-1.5 bg-orange-500/30 text-orange-200 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                <Tag className="w-3.5 h-3.5" /> Gadget Carnival
              </span>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight">
                Next-Gen Audio & Smart Peripherals
              </h3>
              <p className="text-xs text-slate-300 mt-2">
                Anker, Sony, Casio, and Logitech with official Bangladesh warranty cards.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Link
                to="/category/electronics"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                Shop Electronics <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
