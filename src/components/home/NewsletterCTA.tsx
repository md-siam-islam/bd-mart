import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { Mail, Gift, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const NewsletterCTA: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Congratulations! Your ৳500 coupon code: WELCOME500', 'success');
    setEmail('');
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden select-none">
      {/* Subtle ambient lighting */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FF5722]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FF9800]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-amber-300 backdrop-blur-md">
            <Gift className="w-3.5 h-3.5 text-[#FF9800]" />
            <span>Exclusive VIP Welcome Offer</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Unlock Instant ৳500 OFF <br className="hidden sm:inline" />
            on Your First Order.
          </h2>

          {/* Subtext */}
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
            Subscribe to BD Mart VIP updates for priority access to seasonal festive drops, secret midnight sales, and curated weekly specials.
          </p>

          {/* Form */}
          {submitted ? (
            <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 max-w-md mx-auto space-y-1">
              <p className="text-sm font-bold flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Voucher Dispatched! Use Code: <span className="font-mono text-white font-black bg-emerald-800 px-2 py-0.5 rounded">WELCOME500</span>
              </p>
              <p className="text-xs text-emerald-400/80">Valid for ৳500 discount on orders over ৳2,500.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-2.5 max-w-lg mx-auto"
            >
              <div className="relative w-full">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder-slate-400 text-sm px-4 py-3.5 pl-11 rounded-2xl border border-white/20 focus:border-[#FF5722] outline-none backdrop-blur-md transition-all font-medium"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#FF5722] hover:bg-[#E64A19] text-white text-sm font-black rounded-2xl transition-all shadow-xl shadow-[#FF5722]/30 flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95"
              >
                <span>Claim ৳500</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Privacy & Trust Badge */}
          <div className="flex items-center justify-center gap-4 text-slate-400 text-xs font-medium pt-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4CAF50]" />
              Zero spam guarantee
            </span>
            <span className="text-slate-600">•</span>
            <span>Unsubscribe anytime in 1-click</span>
          </div>
        </div>
      </div>
    </section>
  );
};
