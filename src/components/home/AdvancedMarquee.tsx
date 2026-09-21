import React from 'react';

const STRIP_1_ITEMS = [
  'NEW ARRIVALS',
  'EID & FESTIVE COLLECTION 2026',
  'CASH ON DELIVERY ACROSS 64 DISTRICTS',
  '100% AUTHENTIC GUARANTEED',
  'INSTANT BKASH CASHBACK',
  'HANDCRAFTED FINE PANJABI & SILK',
  'OFFICIAL BRAND WARRANTIES',
  'FAST 24-48H DOORSTEP DELIVERY',
];

const STRIP_2_ITEMS = [
  'CURATED LUXURY FASHION',
  'FLAGSHIP AUDIO & NEXT-GEN TECH',
  '100% PURE LAB-TESTED ORGANIC AGRO',
  'INTELLIGENT HOME APPLIANCES',
  'PREMIUM BANGLADESH SHOPPING',
  'EXCLUSIVE MIDNIGHT FLASH SAVINGS',
  'ZERO-INTEREST EMI AVAILABLE',
  'BSTI & VERIFIED MERCHANTS',
];

const STRIP_3_ITEMS = [
  'FREE SHIPPING ON ORDERS OVER ৳2,000',
  '7 DAYS HASSLE-FREE REPLACEMENT',
  'STEADFAST COURIER REAL-TIME TRACKING',
  '24/7 DEDICATED HELPLINE SUPPORT',
  'NAGAD & BKASH TOKENIZED CHECKOUT',
  '100,000+ SATISFIED CUSTOMERS',
];

export const AdvancedMarquee: React.FC = () => {
  return (
    <section
      aria-label="Editorial Brand Highlights Marquee"
      className="relative w-full overflow-hidden bg-slate-950 py-8 sm:py-12 select-none marquee-group border-y border-slate-900"
    >
      {/* Subtle background ambient glow for editorial depth */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-32 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-32 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col gap-1 sm:gap-2">
        {/* STRIP 1: Primary Brand Color (#FF5722) - Slanted -1.8deg - Moves Left -> Right */}
        <div className="relative w-full overflow-hidden transform -rotate-1 sm:-rotate-1.5 scale-[1.03] z-0 shadow-lg">
          <div className="bg-[#FF5722] py-2.5 sm:py-3.5 border-y border-white/20 shadow-md">
            <div className="flex w-max animate-marquee-ltr">
              {/* Set 1 */}
              <div className="flex shrink-0 items-center">
                {STRIP_1_ITEMS.map((item, idx) => (
                  <span
                    key={`s1-a-${idx}`}
                    className="inline-flex items-center text-white font-black text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap"
                  >
                    <span className="px-3 sm:px-5">{item}</span>
                    <span className="text-amber-200 text-sm sm:text-base font-serif select-none">
                      ✦
                    </span>
                  </span>
                ))}
              </div>
              {/* Set 2 for seamless loop */}
              <div className="flex shrink-0 items-center" aria-hidden="true">
                {STRIP_1_ITEMS.map((item, idx) => (
                  <span
                    key={`s1-b-${idx}`}
                    className="inline-flex items-center text-white font-black text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap"
                  >
                    <span className="px-3 sm:px-5">{item}</span>
                    <span className="text-amber-200 text-sm sm:text-base font-serif select-none">
                      ✦
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* STRIP 2: Editorial Dark Slate (#0F172A) - Slanted +1.5deg - Moves Right -> Left */}
        <div className="relative w-full overflow-hidden transform rotate-1 sm:rotate-1.5 -mt-2.5 sm:-mt-3.5 scale-[1.03] z-10 shadow-2xl">
          <div className="bg-slate-900/95 py-2.5 sm:py-3.5 border-y border-amber-500/30 backdrop-blur-md">
            <div className="flex w-max animate-marquee-rtl">
              {/* Set 1 */}
              <div className="flex shrink-0 items-center">
                {STRIP_2_ITEMS.map((item, idx) => (
                  <span
                    key={`s2-a-${idx}`}
                    className="inline-flex items-center font-black text-xs sm:text-sm tracking-widest uppercase whitespace-nowrap"
                  >
                    <span className="px-3 sm:px-5 text-[#FF9800]">{item}</span>
                    <span className="text-slate-500 font-bold select-none">—</span>
                  </span>
                ))}
              </div>
              {/* Set 2 for seamless loop */}
              <div className="flex shrink-0 items-center" aria-hidden="true">
                {STRIP_2_ITEMS.map((item, idx) => (
                  <span
                    key={`s2-b-${idx}`}
                    className="inline-flex items-center font-black text-xs sm:text-sm tracking-widest uppercase whitespace-nowrap"
                  >
                    <span className="px-3 sm:px-5 text-[#FF9800]">{item}</span>
                    <span className="text-slate-500 font-bold select-none">—</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* STRIP 3: Accent Gold (#FFC107) - Slanted -0.8deg - Moves Left -> Right (Slow) */}
        <div className="relative w-full overflow-hidden transform -rotate-0.5 sm:-rotate-1 -mt-2.5 sm:-mt-3.5 scale-[1.03] z-20 shadow-xl">
          <div className="bg-[#FFC107] py-2 sm:py-3 border-y border-slate-900/15 shadow-inner">
            <div className="flex w-max animate-marquee-ltr-slow">
              {/* Set 1 */}
              <div className="flex shrink-0 items-center">
                {STRIP_3_ITEMS.map((item, idx) => (
                  <span
                    key={`s3-a-${idx}`}
                    className="inline-flex items-center text-slate-950 font-black text-[11px] sm:text-xs tracking-wider uppercase whitespace-nowrap"
                  >
                    <span className="px-3 sm:px-5">{item}</span>
                    <span className="text-slate-700 text-xs font-black select-none">•</span>
                  </span>
                ))}
              </div>
              {/* Set 2 for seamless loop */}
              <div className="flex shrink-0 items-center" aria-hidden="true">
                {STRIP_3_ITEMS.map((item, idx) => (
                  <span
                    key={`s3-b-${idx}`}
                    className="inline-flex items-center text-slate-950 font-black text-[11px] sm:text-xs tracking-wider uppercase whitespace-nowrap"
                  >
                    <span className="px-3 sm:px-5">{item}</span>
                    <span className="text-slate-700 text-xs font-black select-none">•</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
