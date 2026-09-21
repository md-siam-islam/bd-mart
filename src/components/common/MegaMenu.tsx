import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 right-0 w-full bg-white border-b border-slate-200 shadow-2xl z-50 py-7 transition-all duration-200"
    >
      <div className="container-custom">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Categories Grid */}
          <div className="col-span-12 xl:col-span-9 grid grid-cols-2 lg:grid-cols-3 gap-6 xl:border-r xl:border-slate-100 xl:pr-8">
            {CATEGORIES.slice(0, 9).map((cat) => (
              <div key={cat.id} className="space-y-2.5">
                <Link
                  to={`/category/${cat.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 group"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-100 shrink-0 group-hover:scale-105 transition-transform shadow-xs"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors flex items-center gap-1">
                      <span className="truncate">{cat.name}</span>
                      <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </h4>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {cat.productCount} Items
                    </span>
                  </div>
                </Link>

                <ul className="space-y-1.5 pl-13">
                  {cat.subcategories.slice(0, 3).map((sub, i) => (
                    <li key={i}>
                      <Link
                        to={`/shop?category=${encodeURIComponent(cat.name)}&sub=${encodeURIComponent(sub)}`}
                        onClick={onClose}
                        className="text-xs text-slate-600 hover:text-primary hover:translate-x-0.5 transition-all block py-0.5 truncate"
                      >
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Promotional Card on Right */}
          <div className="hidden xl:flex xl:col-span-3 flex-col justify-between bg-gradient-to-br from-orange-50 via-amber-50/40 to-slate-50 rounded-2xl p-6 border border-orange-200/60 shadow-sm">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-accent text-white text-[11px] font-bold px-3 py-1 rounded-full mb-3.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" /> Special Promo
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                Eid Ul Fitr Collection 2026
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Up to 35% discount on handcrafted Panjabis, Jamdani Sarees, and festive footwear across Bangladesh.
              </p>
            </div>

            <div className="mt-5 space-y-2">
              <Link
                to="/flash-sale"
                onClick={onClose}
                className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1.5 hover:bg-primary-hover transition-colors shadow-md shadow-primary/25"
              >
                Shop Deals Now <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/shop"
                onClick={onClose}
                className="w-full py-2 bg-white text-slate-700 border border-slate-200 text-xs font-bold rounded-xl text-center flex items-center justify-center hover:bg-slate-50 transition-colors"
              >
                View All Categories →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
