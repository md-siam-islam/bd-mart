import React from 'react';
import { Truck, ShieldCheck, Sparkles, CreditCard, RotateCcw, Clock } from 'lucide-react';

export const TrustBenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <Truck className="w-6 h-6 text-[#FF5722]" />,
      iconBg: 'bg-[#FF5722]/10',
      title: 'Cash on Delivery Nationwide',
      description: 'Available across all 64 districts in Bangladesh. Check your parcel at your doorstep before payment.',
      tag: '64 Districts Covered'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#4CAF50]" />,
      iconBg: 'bg-[#4CAF50]/10',
      title: '100% Authentic Guaranteed',
      description: 'Directly sourced from verified artisans and official brand importers with warranty cards.',
      tag: 'Zero Counterfeits'
    },
    {
      icon: <Clock className="w-6 h-6 text-[#FF9800]" />,
      iconBg: 'bg-[#FF9800]/10',
      title: 'Fast 24-48h Dispatch',
      description: 'Steadfast & Pathao express logistics with live SMS tracking updates from dispatch to doorstep.',
      tag: 'Express Fulfillment'
    },
    {
      icon: <CreditCard className="w-6 h-6 text-[#2196F3]" />,
      iconBg: 'bg-[#2196F3]/10',
      title: 'bKash & Nagad Instant Pay',
      description: 'Secure tokenized digital payment gateways with zero transaction fees and special cashback promos.',
      tag: 'Safe & Instant'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-100">
      <div className="container-custom">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#FF5722] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FF9800]" />
            Why Choose BD Mart
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Built for Secure, Seamless Shopping
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2 font-normal">
            Every order is protected by our customer-first guarantees and verified logistics network.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-100 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-2xl ${b.iconBg} flex items-center justify-center transition-transform group-hover:scale-110`}
                  >
                    {b.icon}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {b.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {b.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-[#4CAF50]">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Verified Guarantee</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
