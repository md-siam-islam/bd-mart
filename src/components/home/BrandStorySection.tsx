import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Brand Story (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#FF5722]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9800]" />
              The BD Mart Promise
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Authentic Craftsmanship, <br className="hidden sm:inline" />
              Delivered with Care Across Bangladesh.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
              BD Mart was founded with a singular conviction: online shopping in Bangladesh should mean uncompromising authenticity, fair pricing, and trustworthy service. From Narayanganj's master Jamdani weavers to the natural honey collectors of the Sundarbans, we source directly to guarantee purity.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Zero Adulteration</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    100% lab-tested raw honey, pure cow ghee, and cold-pressed mustard oil.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FF5722]/10 text-[#FF5722] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Official Warranty</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Authentic electronics and gadgets with genuine brand warranty cards.
                  </p>
                </div>
              </div>
            </div>

            {/* Link to About Page */}
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 hover:text-[#FF5722] transition-colors group"
              >
                <span>Read Our Full Story & Heritage</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Editorial Photo Mosaic with Live Badges (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1000&auto=format&fit=crop&q=85"
                alt="BD Mart Artisans and Quality"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              {/* Floating Live Badge Top Right */}
              <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/50 shadow-lg text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-wider">
                  Verified Merchants
                </span>
              </div>

              {/* Floating Bottom Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/15 text-white shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <Sparkles className="w-4 h-4 fill-amber-400" />
                    <span className="text-sm font-black text-white">4.9 ★</span>
                    <span className="text-xs text-slate-300">Customer Rating</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                    64 Districts
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  Over 100,000 orders safely delivered with Cash on Delivery and instant bKash cashback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
