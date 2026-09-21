import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from '../common/LoadingSkeleton';
import { SearchX, RotateCcw } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  viewMode?: 'grid' | 'list';
  emptyMessage?: string;
  onResetFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  viewMode = 'grid',
  emptyMessage = 'No products found matching your criteria.',
  onResetFilters,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-slate-200/80 shadow-xs my-4 space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-[#FF5722]/10 text-[#FF5722] flex items-center justify-center mx-auto shadow-inner">
          <SearchX className="w-8 h-8" />
        </div>

        <div className="max-w-md mx-auto space-y-1.5">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            No Matching Products Found
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            {emptyMessage || 'Try adjusting your price range, clearing brand or category filters to discover more items.'}
          </p>
        </div>

        {onResetFilters && (
          <div className="pt-2">
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-black rounded-xl shadow-md shadow-[#FF5722]/25 transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} viewMode="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode="grid" />
      ))}
    </div>
  );
};
