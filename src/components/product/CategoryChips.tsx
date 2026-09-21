import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { Sparkles, Layers } from 'lucide-react';

interface CategoryChipsProps {
  selectedCategory: string;
  onSelectCategory: (categoryName: string) => void;
  totalProductsCount: number;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  selectedCategory,
  onSelectCategory,
  totalProductsCount
}) => {
  return (
    <div className="w-full overflow-hidden pb-1">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
        {/* All Products Chip */}
        <button
          onClick={() => onSelectCategory('')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
            selectedCategory === ''
              ? 'bg-[#FF5722] text-white shadow-md shadow-[#FF5722]/30 scale-[1.02]'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 shadow-2xs hover:border-slate-300'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Items</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full ml-1 font-mono ${
              selectedCategory === '' ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
            }`}
          >
            {totalProductsCount}
          </span>
        </button>

        {/* Category Chips */}
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-[#FF5722] text-white shadow-md shadow-[#FF5722]/30 scale-[1.02]'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 shadow-2xs hover:border-slate-300'
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {cat.productCount}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
