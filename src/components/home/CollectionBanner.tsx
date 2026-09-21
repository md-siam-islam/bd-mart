import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Tag, Zap } from 'lucide-react';

export const CollectionBanner: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Campaign 1: Festive Eid Collection */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 sm:p-12 flex flex-col justify-between min-h-[320px] sm:min-h-[360px] shadow-lg group select-none">
            {/* Background Image with Hover Effect */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1000&auto=format&fit=crop&q=85"
                alt="Eid Festive Collection"
                className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out opacity-45 group-hover:opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-md space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#FF5722]/30 border border-[#FF5722]/50 text-amber-300 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Festive Eid 2026 Collection
              </span>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight">
                Authentic Dhakai Jamdani & Handcrafted Panjabis
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Celebrate in timeless Bangladeshi splendor with premium combed cotton, fine silks, and exclusive celebratory gift boxes.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Link
                to="/category/mens-fashion"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-[#FF5722]/30 group cursor-pointer"
              >
                <span>Shop Festive Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Campaign 2: Flagship Audio & Smart Tech */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 sm:p-12 flex flex-col justify-between min-h-[320px] sm:min-h-[360px] shadow-lg group select-none">
            {/* Background Image with Hover Effect */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1000&auto=format&fit=crop&q=85"
                alt="Flagship Tech"
                className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out opacity-45 group-hover:opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-md space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 backdrop-blur-md">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                Zero-Interest EMI Available
              </span>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight">
                Next-Gen Audio & Smart Peripherals
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Flagship Sony, Apple, Anker, and Casio with 100% manufacturer warranty cards and nationwide doorstep courier dispatch.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Link
                to="/category/electronics"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md group cursor-pointer"
              >
                <span>Explore Official Tech</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
