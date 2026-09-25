import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { ArrowRight } from 'lucide-react';
import { handleProductImageError } from '../../utils/imageFallback';

export const CategorySlider: React.FC = () => {
  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-primary tracking-wider uppercase block mb-1">
              Browse Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Shop by Department
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-bold text-primary hover:text-primary-hover transition-colors flex items-center gap-1 group"
          >
            All 16 Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group flex flex-col items-center p-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-primary/30 hover:shadow-card transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white shadow-xs mb-2.5 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  onError={handleProductImageError}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <h3 className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                {cat.productCount} Products
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
