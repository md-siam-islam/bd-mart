import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Search } from 'lucide-react';

export const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const matchedProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="bg-slate-50 min-h-screen py-6">
      <div className="container-custom">
        <Breadcrumb items={[{ label: 'Search Results' }]} />

        <div className="my-6">
          <div className="flex items-center gap-2 text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">
            <Search className="w-4 h-4 text-primary" /> Search Query
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Results for <span className="text-primary">"{query}"</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Found {matchedProducts.length} matching products
          </p>
        </div>

        {matchedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm max-w-lg mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4 text-2xl">
              🔍
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              No matching products found
            </h2>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              We couldn't find any products matching your search term. Check for spelling errors, try general keywords like "Panjabi", "Watch", or browse our categories.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                to="/shop"
                className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-sm hover:bg-primary-hover transition-colors"
              >
                Browse Shop
              </Link>
              <Link
                to="/"
                className="px-6 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <ProductGrid products={matchedProducts} />
        )}
      </div>
    </div>
  );
};
