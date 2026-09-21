import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductFilters, FilterState } from '../components/product/ProductFilters';
import { CategoryChips } from '../components/product/CategoryChips';
import { ShopTrustStrip } from '../components/product/ShopTrustStrip';
import { RecentlyViewed } from '../components/product/RecentlyViewed';
import { Breadcrumb } from '../components/common/Breadcrumb';
import {
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
  Sparkles,
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ITEMS_PER_PAGE = 12;

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const brandParam = searchParams.get('brand') || '';

  const initialFilters: FilterState = {
    category: categoryParam,
    brand: brandParam,
    minPrice: 100,
    maxPrice: 170000,
    rating: 0,
    inStockOnly: false,
    onSaleOnly: false,
    newArrivalsOnly: false,
    minDiscount: 0,
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const productSectionRef = useRef<HTMLDivElement>(null);

  // Synchronize URL search params with filters
  useEffect(() => {
    if (categoryParam) {
      setFilters((f) => ({ ...f, category: categoryParam }));
    }
    if (brandParam) {
      setFilters((f) => ({ ...f, brand: brandParam }));
    }
  }, [categoryParam, brandParam]);

  // Reset page when filters or sorting change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  // Handle Category Chip Selection
  const handleSelectCategory = (catName: string) => {
    setFilters((prev) => ({ ...prev, category: catName }));
    if (catName) {
      setSearchParams({ category: catName });
    } else {
      setSearchParams({});
    }
  };

  const handleResetFilters = () => {
    setFilters({
      category: '',
      brand: '',
      minPrice: 100,
      maxPrice: 170000,
      rating: 0,
      inStockOnly: false,
      onSaleOnly: false,
      newArrivalsOnly: false,
      minDiscount: 0,
    });
    setSearchParams({});
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      if (filters.brand && product.brand !== filters.brand) {
        return false;
      }
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }
      if (filters.inStockOnly && product.stock <= 0) {
        return false;
      }
      if (filters.onSaleOnly && (!product.discount || product.discount <= 0)) {
        return false;
      }
      if (filters.newArrivalsOnly && !product.newArrival) {
        return false;
      }
      if (filters.minDiscount > 0 && (!product.discount || product.discount < filters.minDiscount)) {
        return false;
      }
      return true;
    });
  }, [filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return list.sort((a, b) => a.price - b.price);
      case 'price-high':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return list.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
      case 'popular':
        return list.sort((a, b) => b.reviews - a.reviews);
      case 'discount':
        return list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      case 'featured':
      default:
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.brand) count++;
    if (filters.minPrice > 100 || filters.maxPrice < 170000) count++;
    if (filters.rating > 0) count++;
    if (filters.inStockOnly) count++;
    if (filters.onSaleOnly) count++;
    if (filters.newArrivalsOnly) count++;
    if (filters.minDiscount > 0) count++;
    return count;
  }, [filters]);

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-8 font-sans">
      <div className="container-custom">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Shop All Products' }]} />

        {/* 1. Shop Page Header */}
        <div className="mb-6 pt-2">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#FF5722] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#FF9800]" />
                Bangladesh Online Catalog
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                {filters.category ? filters.category : 'All Products'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-normal leading-relaxed">
                Explore {PRODUCTS.length}+ authentic products across electronics, fashion, beauty, grocery, and home essentials with nationwide doorstep Cash on Delivery.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-2 self-start md:self-auto text-xs font-bold text-slate-600 bg-white px-3.5 py-1.5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
              <span>{sortedProducts.length} Products Available</span>
            </div>
          </div>
        </div>

        {/* 2. Smart Category Filter Chips */}
        <div className="mb-6">
          <CategoryChips
            selectedCategory={filters.category}
            onSelectCategory={handleSelectCategory}
            totalProductsCount={PRODUCTS.length}
          />
        </div>

        {/* 3. Product Toolbar */}
        <div
          ref={productSectionRef}
          className="bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 mb-6 shadow-2xs flex flex-wrap items-center justify-between gap-3.5"
        >
          {/* Left: Results Count & Active Filter Pills */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-[#FF5722] text-white rounded-xl text-xs font-black shadow-md shadow-[#FF5722]/25 cursor-pointer active:scale-95"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4.5 h-4.5 rounded-full bg-white text-[#FF5722] text-[10px] font-black flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <span className="text-xs font-bold text-slate-700">
              Showing{' '}
              <strong className="text-slate-950 font-black">
                {paginatedProducts.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}–
                {Math.min(currentPage * ITEMS_PER_PAGE, sortedProducts.length)}
              </strong>{' '}
              of <strong className="text-slate-950 font-black">{sortedProducts.length}</strong> items
            </span>

            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-[#FF5722] hover:text-[#E64A19] ml-2 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear Filters ({activeFiltersCount})</span>
              </button>
            )}
          </div>

          {/* Right: Sort By Dropdown & Grid/List View Mode */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Sort Control */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px] font-bold text-slate-500 hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-bold text-slate-800 bg-transparent outline-none cursor-pointer pr-1"
                aria-label="Sort products by"
              >
                <option value="featured">Featured Picks</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-slate-50 border border-slate-200/80 rounded-xl p-0.5 shadow-2xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#FF5722] shadow-xs'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Grid View (4 columns)"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-[#FF5722] shadow-xs'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="List View"
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4. Main Body: Sticky Filter Sidebar (Desktop) + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Desktop Sticky Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto no-scrollbar pr-1">
            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              onReset={handleResetFilters}
              totalFilteredCount={sortedProducts.length}
            />
          </aside>

          {/* Main Product Area (9 cols) */}
          <main className="lg:col-span-9 space-y-6">
            <ProductGrid
              products={paginatedProducts}
              isLoading={isLoading}
              viewMode={viewMode}
              onResetFilters={handleResetFilters}
              emptyMessage="No products match your selected filter criteria. Try clearing some filters or searching for another term."
            />

            {/* 5. Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200/80">
                <span className="text-xs font-medium text-slate-500">
                  Page {currentPage} of {totalPages} ({sortedProducts.length} Total Items)
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            currentPage === pageNum
                              ? 'bg-[#FF5722] text-white shadow-md shadow-[#FF5722]/30'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* 6. Bangladesh Shopping Trust Strip */}
            <ShopTrustStrip />

            {/* 7. Recently Viewed Products History */}
            <RecentlyViewed />
          </main>
        </div>
      </div>

      {/* 8. Mobile Filter Slide-Up Bottom Sheet */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Sliding Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-3xl shadow-2xl flex flex-col z-10"
            >
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#FF5722]" />
                  <h3 className="text-base font-black text-slate-900">
                    Filter Products
                  </h3>
                  {activeFiltersCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#FF5722] text-white text-[11px] font-black flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="p-4 overflow-y-auto flex-1 no-scrollbar">
                <ProductFilters
                  filters={filters}
                  setFilters={setFilters}
                  onReset={handleResetFilters}
                  onApply={() => setIsMobileFilterOpen(false)}
                  totalFilteredCount={sortedProducts.length}
                />
              </div>

              {/* Drawer Sticky Action Footer */}
              <div className="p-4 border-t border-slate-100 bg-white">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3.5 bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-black rounded-2xl shadow-lg shadow-[#FF5722]/30 text-center cursor-pointer active:scale-95 transition-all"
                >
                  Show {sortedProducts.length} Results
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
