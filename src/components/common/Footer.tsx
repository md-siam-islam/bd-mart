import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      showToast('Thank you for subscribing to BD Mart newsletter!', 'success');
      setEmail('');
    } else {
      showToast('Please enter a valid email address', 'error');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 mt-auto pb-16 lg:pb-0">
      {/* Service Highlights Bar */}
      <div className="border-b border-slate-900/80 py-8 bg-slate-900/40">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Nationwide Delivery</h4>
                <p className="text-slate-400 text-[11px]">Free delivery on orders over ৳2,000</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Cash on Delivery</h4>
                <p className="text-slate-400 text-[11px]">Pay when your order arrives</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">7 Days Easy Return</h4>
                <p className="text-slate-400 text-[11px]">Hassle-free replacement policy</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">24/7 Dedicated Support</h4>
                <p className="text-slate-400 text-[11px]">Direct helpline & WhatsApp assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-12 lg:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Col 1: Brand & Bio */}
            <div className="lg:col-span-2 space-y-4">
              <Logo variant="white" size="lg" />
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                BD Mart is Bangladesh's premium multi-category online store. We curate authentic fashion, electronics, organic food, and home essentials with verified doorstep delivery and trusted bKash payment.
              </p>

              {/* Newsletter */}
              <div className="pt-2">
                <p className="text-white font-bold text-xs mb-2">
                  Get the Latest Deals Straight to Your Inbox
                </p>
                {subscribed ? (
                  <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 p-2.5 rounded-xl text-xs">
                    <CheckCircle2 className="w-4 h-4" /> You're subscribed to BD Mart updates!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="bg-slate-900 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-primary outline-none flex-1"
                    />
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Col 2: Customer Service */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm tracking-wide uppercase">
                Customer Service
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-white transition-colors">
                    Help & FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/order-tracking" className="hover:text-white transition-colors">
                    Order Tracking
                  </Link>
                </li>
                <li>
                  <Link to="/shipping-policy" className="hover:text-white transition-colors">
                    Shipping Policy (Dhaka & Nationwide)
                  </Link>
                </li>
                <li>
                  <Link to="/return-refund-policy" className="hover:text-white transition-colors">
                    Return & Refund Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: About BD Mart */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm tracking-wide uppercase">
                About BD Mart
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-white transition-colors">
                    BD Mart Blog
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact & Headquarters */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm tracking-wide uppercase">
                Contact & Support
              </h4>
              <div className="space-y-2.5 text-xs">
                <p className="flex items-start gap-2.5 text-slate-300">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Plot 24, Road 11, Banani, Dhaka-1213, Bangladesh</span>
                </p>
                <p className="flex items-center gap-2.5 text-slate-300">
                  <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>+880 1700-000000</span>
                </p>
                <p className="flex items-center gap-2.5 text-slate-300">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span>support@bdmart.com.bd</span>
                </p>
              </div>

              {/* Supported Payment Gateways */}
              <div className="pt-3">
                <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                  Verified Payment Methods:
                </span>
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="bg-white text-pink-600 px-2 py-0.5 rounded font-extrabold text-[10px] tracking-tight">
                    bKash
                  </span>
                  <span className="bg-white text-orange-600 px-2 py-0.5 rounded font-extrabold text-[10px] tracking-tight">
                    Nagad
                  </span>
                  <span className="bg-white text-purple-600 px-2 py-0.5 rounded font-extrabold text-[10px] tracking-tight">
                    Rocket
                  </span>
                  <span className="bg-white text-blue-800 px-2 py-0.5 rounded font-extrabold text-[10px] tracking-tight">
                    VISA
                  </span>
                  <span className="bg-white text-red-600 px-2 py-0.5 rounded font-extrabold text-[10px] tracking-tight">
                    Mastercard
                  </span>
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">
                    COD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-slate-900 py-6 text-center text-slate-400 text-[11px]">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 BD Mart Limited. All Rights Reserved. Regulated under Bangladesh E-Commerce Guidelines.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <span>•</span>
            <Link to="/shipping-policy" className="hover:text-slate-300 transition-colors">Shipping Rates</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
