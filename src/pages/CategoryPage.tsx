import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const category = useMemo(() => {
    return CATEGORIES.find((c) => c.slug === slug) || CATEGORIES[0];
  }, [slug]);

  const categoryProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === category.name);
  }, [category]);

  return (
    <div className="bg-slate-50 min-h-screen py-6">
      <div className="container-custom">
        <Breadcrumb
          items={[
            { label: 'Shop', link: '/shop' },
            { label: category.name }
          ]}
        />

        {/* Category Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-blue-950 text-white p-6 sm:p-10 mb-8 mt-3 shadow-lg">
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-bold text-primary tracking-wider uppercase block mb-1">
              Category Department
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Explore authentic {category.name.toLowerCase()} in Bangladesh with direct manufacturer warranty and nationwide Cash on Delivery.
            </p>

            {/* Subcategories tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {category.subcategories.map((sub, i) => (
                <Link
                  key={i}
                  to={`/shop?category=${encodeURIComponent(category.name)}&sub=${encodeURIComponent(sub)}`}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                >
                  {sub}
                </Link>
              ))}
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden md:block">
            <img src={category.image} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
            <span>Showing all {categoryProducts.length} items</span>
            <Link to="/shop" className="text-primary hover:underline">
              View All Products in Shop →
            </Link>
          </div>

          <ProductGrid products={categoryProducts} />
        </div>
      </div>
    </div>
  );
};
