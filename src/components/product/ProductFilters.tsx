import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../../data/categories';
import { BRANDS } from '../../data/brands';
import {
  Star,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Check,
  Tag,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export interface FilterState {
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  newArrivalsOnly: boolean;
  minDiscount: number;
}

interface ProductFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  onApply?: () => void;
  totalFilteredCount?: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  setFilters,
  onReset,
  onApply,
  totalFilteredCount
}) => {
  // Collapsible section toggles
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    brands: true,
    ratings: true,
    availability: true,
    discount: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Brand search filter
  const [brandSearch, setBrandSearch] = useState('');

  const filteredBrands = useMemo(() => {
    if (!brandSearch.trim()) return BRANDS;
    return BRANDS.filter((b) =>
      b.name.toLowerCase().includes(brandSearch.toLowerCase())
    );
  }, [brandSearch]);

  // Calculate active filters count
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
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-5 text-slate-800">
      {/* Header with Active Filters Count Badge & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#FF5722]" />
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
            Filters
          </h3>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#FF5722] text-white text-[11px] font-black flex items-center justify-center shadow-xs">
              {activeFiltersCount}
            </span>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={onReset}
            className="text-xs font-bold text-[#FF5722] hover:text-[#E64A19] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* 1. Category Filter Accordion */}
      <div className="border-b border-slate-100 pb-4">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 py-1 hover:text-[#FF5722] transition-colors cursor-pointer"
        >
          <span>Category {filters.category ? `(1)` : ''}</span>
          {openSections.categories ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.categories && (
          <div className="mt-3 space-y-1 max-h-48 overflow-y-auto pr-1 text-xs">
            <label className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === ''}
                  onChange={() => setFilters((f) => ({ ...f, category: '' }))}
                  className="text-[#FF5722] focus:ring-[#FF5722] accent-[#FF5722] w-3.5 h-3.5 cursor-pointer"
                />
                <span className={filters.category === '' ? 'font-bold text-[#FF5722]' : 'text-slate-600'}>
                  All Categories
                </span>
              </div>
            </label>

            {CATEGORIES.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === cat.name}
                    onChange={() => setFilters((f) => ({ ...f, category: cat.name }))}
                    className="text-[#FF5722] focus:ring-[#FF5722] accent-[#FF5722] w-3.5 h-3.5 cursor-pointer"
                  />
                  <span className={filters.category === cat.name ? 'font-bold text-[#FF5722]' : 'text-slate-700'}>
                    {cat.name}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">({cat.productCount})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 2. Price Range Accordion */}
      <div className="border-b border-slate-100 pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 py-1 hover:text-[#FF5722] transition-colors cursor-pointer"
        >
          <span>Price Range (৳)</span>
          {openSections.price ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.price && (
          <div className="mt-3 space-y-3">
            {/* Slider */}
            <input
              type="range"
              min={100}
              max={170000}
              step={500}
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))
              }
              className="w-full accent-[#FF5722] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />

            {/* Price Inputs */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block mb-1">Min (৳)</span>
                <input
                  type="number"
                  min={0}
                  max={filters.maxPrice}
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, minPrice: Number(e.target.value) }))
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-[#FF5722]"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block mb-1">Max (৳)</span>
                <input
                  type="number"
                  min={filters.minPrice}
                  max={200000}
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-[#FF5722]"
                />
              </div>
            </div>

            <div className="text-[11px] font-bold text-[#FF5722] text-center bg-[#FF5722]/10 py-1 rounded-lg">
              ৳{filters.minPrice.toLocaleString()} – ৳{filters.maxPrice.toLocaleString()}
            </div>
          </div>
        )}
      </div>

      {/* 3. Brands Filter Accordion with Search */}
      <div className="border-b border-slate-100 pb-4">
        <button
          onClick={() => toggleSection('brands')}
          className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 py-1 hover:text-[#FF5722] transition-colors cursor-pointer"
        >
          <span>Brands {filters.brand ? `(1)` : ''}</span>
          {openSections.brands ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.brands && (
          <div className="mt-3 space-y-2">
            {/* Search Brand Input */}
            <div className="relative">
              <input
                type="text"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                placeholder="Search brands..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 outline-none focus:border-[#FF5722] placeholder-slate-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Brand Options */}
            <div className="space-y-1 max-h-40 overflow-y-auto pr-1 text-xs">
              <label className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="brand"
                    checked={filters.brand === ''}
                    onChange={() => setFilters((f) => ({ ...f, brand: '' }))}
                    className="text-[#FF5722] focus:ring-[#FF5722] accent-[#FF5722] w-3.5 h-3.5 cursor-pointer"
                  />
                  <span className={filters.brand === '' ? 'font-bold text-[#FF5722]' : 'text-slate-600'}>
                    All Brands
                  </span>
                </div>
              </label>

              {filteredBrands.map((brand) => (
                <label
                  key={brand.id}
                  className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="brand"
                      checked={filters.brand === brand.name}
                      onChange={() => setFilters((f) => ({ ...f, brand: brand.name }))}
                      className="text-[#FF5722] focus:ring-[#FF5722] accent-[#FF5722] w-3.5 h-3.5 cursor-pointer"
                    />
                    <span className={filters.brand === brand.name ? 'font-bold text-[#FF5722]' : 'text-slate-700'}>
                      {brand.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">({brand.productCount})</span>
                </label>
              ))}

              {filteredBrands.length === 0 && (
                <p className="text-[11px] text-slate-400 text-center py-2">No brands found</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 4. Customer Rating Accordion */}
      <div className="border-b border-slate-100 pb-4">
        <button
          onClick={() => toggleSection('ratings')}
          className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 py-1 hover:text-[#FF5722] transition-colors cursor-pointer"
        >
          <span>Customer Rating</span>
          {openSections.ratings ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.ratings && (
          <div className="mt-3 space-y-1 text-xs">
            {[4, 3, 2].map((stars) => (
              <label
                key={stars}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === stars}
                  onChange={() => setFilters((f) => ({ ...f, rating: stars }))}
                  className="text-[#FF5722] focus:ring-[#FF5722] accent-[#FF5722] w-3.5 h-3.5 cursor-pointer"
                />
                <div className="flex items-center gap-1 text-[#FFC107]">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FFC107]" />
                  ))}
                </div>
                <span className="text-slate-600 font-bold">& Up</span>
              </label>
            ))}

            <label className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === 0}
                onChange={() => setFilters((f) => ({ ...f, rating: 0 }))}
                className="text-[#FF5722] focus:ring-[#FF5722] accent-[#FF5722] w-3.5 h-3.5 cursor-pointer"
              />
              <span className="text-slate-600 font-medium">All Ratings</span>
            </label>
          </div>
        )}
      </div>

      {/* 5. Availability & Status Accordion */}
      <div className="border-b border-slate-100 pb-4">
        <button
          onClick={() => toggleSection('availability')}
          className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 py-1 hover:text-[#FF5722] transition-colors cursor-pointer"
        >
          <span>Availability</span>
          {openSections.availability ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.availability && (
          <div className="mt-3 space-y-2 text-xs">
            <label className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors font-medium">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, inStockOnly: e.target.checked }))
                }
                className="rounded text-[#FF5722] focus:ring-[#FF5722] accent-[#FF5722] w-4 h-4 cursor-pointer"
              />
              <span className="text-slate-700">In Stock Only</span>
            </label>

            <label className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors font-medium">
              <input
                type="checkbox"
                checked={filters.onSaleOnly}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, onSaleOnly: e.target.checked }))
                }
                className="rounded text-[#FF5722] focus:ring-[#FF5722] accent-[#FF5722] w-4 h-4 cursor-pointer"
              />
              <span className="text-slate-700">On Sale / Discounted</span>
            </label>

            <label className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors font-medium">
              <input
                type="checkbox"
                checked={filters.newArrivalsOnly}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, newArrivalsOnly: e.target.checked }))
                }
                className="rounded text-[#FF5722] focus:ring-[#FF5722] accent-[#FF5722] w-4 h-4 cursor-pointer"
              />
              <span className="text-slate-700">New Arrivals Only</span>
            </label>
          </div>
        )}
      </div>

      {/* 6. Discount Thresholds Accordion */}
      <div>
        <button
          onClick={() => toggleSection('discount')}
          className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 py-1 hover:text-[#FF5722] transition-colors cursor-pointer"
        >
          <span>Discount Percentage</span>
          {openSections.discount ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.discount && (
          <div className="mt-3 space-y-1 text-xs">
            {[10, 20, 30, 50].map((disc) => (
              <label
                key={disc}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="discount"
                  checked={filters.minDiscount === disc}
                  onChange={() => setFilters((f) => ({ ...f, minDiscount: disc }))}
                  className="text-[#FF5722] focus:ring-[#FF5722] accent-[#FF5722] w-3.5 h-3.5 cursor-pointer"
                />
                <span className="text-slate-700 font-bold">{disc}% or more</span>
              </label>
            ))}

            <label className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
              <input
                type="radio"
                name="discount"
                checked={filters.minDiscount === 0}
                onChange={() => setFilters((f) => ({ ...f, minDiscount: 0 }))}
                className="text-[#FF5722] focus:ring-[#FF5722] accent-[#FF5722] w-3.5 h-3.5 cursor-pointer"
              />
              <span className="text-slate-600 font-medium">All Discounts</span>
            </label>
          </div>
        )}
      </div>

      {/* Filter Action Buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
        <button
          type="button"
          onClick={onApply}
          className="flex-1 py-3 bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-black rounded-2xl shadow-md shadow-[#FF5722]/25 transition-all text-center cursor-pointer active:scale-95"
        >
          Apply Filters {totalFilteredCount !== undefined ? `(${totalFilteredCount})` : ''}
        </button>

        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="px-3.5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-all cursor-pointer"
            title="Reset All Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
