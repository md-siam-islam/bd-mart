import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { Heart, Eye, ShoppingBag, Layers, Check, Star, ShieldCheck } from 'lucide-react';
import { Price } from '../common/Price';
import { Rating } from '../common/Rating';
import { QuickViewModal } from '../common/QuickViewModal';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare } = useCompare();

  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);

    setTimeout(() => {
      addToCart(product, 1, product.colors?.[0]?.name, product.sizes?.[0]);
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1800);
    }, 300);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCompare(product);
  };

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || primaryImage;

  // Track product in recently viewed
  const trackRecentlyViewed = () => {
    try {
      const stored = localStorage.getItem('bdmart_recently_viewed');
      const list: string[] = stored ? JSON.parse(stored) : [];
      const updated = [product.id, ...list.filter((id) => id !== product.id)].slice(0, 10);
      localStorage.setItem('bdmart_recently_viewed', JSON.stringify(updated));
    } catch {
      // safe fallback
    }
  };

  // Prioritized Badge
  const getBadge = () => {
    if (product.discount && product.discount >= 10) {
      return (
        <span className="bg-[#FF5722] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm tracking-wide">
          SAVE {product.discount}%
        </span>
      );
    }
    if (product.flashSale) {
      return (
        <span className="bg-rose-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm tracking-wide">
          FLASH SALE
        </span>
      );
    }
    if (product.newArrival) {
      return (
        <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm tracking-wide">
          NEW
        </span>
      );
    }
    if (product.bestSeller) {
      return (
        <span className="bg-[#FF9800] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm tracking-wide">
          BEST SELLER
        </span>
      );
    }
    return null;
  };

  // Stock Urgency Text
  const getStockUrgency = () => {
    if (product.stock <= 5) {
      return (
        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-md inline-block">
          Only {product.stock} left in stock
        </span>
      );
    }
    if (product.stock <= 10) {
      return (
        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md inline-block">
          Low Stock: {product.stock} units
        </span>
      );
    }
    return (
      <span className="text-[10px] font-semibold text-[#4CAF50] flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
        In Stock
      </span>
    );
  };

  // LIST VIEW LAYOUT
  if (viewMode === 'list') {
    return (
      <>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-5 group relative select-none"
        >
          {/* Thumbnail Image */}
          <Link
            to={`/product/${product.slug}`}
            onClick={trackRecentlyViewed}
            className="w-full sm:w-56 aspect-square rounded-2xl overflow-hidden bg-slate-50 relative shrink-0 block"
          >
            <img
              src={isHovered ? secondaryImage : primaryImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Top Badge */}
            <div className="absolute top-3 left-3 z-10">{getBadge()}</div>
          </Link>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-bold text-[#FF5722] uppercase tracking-wider text-[11px]">
                  {product.brand}
                </span>
                <span className="text-[11px]">{product.category}</span>
              </div>

              <Link
                to={`/product/${product.slug}`}
                onClick={trackRecentlyViewed}
                className="text-base sm:text-lg font-black text-slate-900 hover:text-[#FF5722] transition-colors line-clamp-1 leading-snug mb-2"
              >
                {product.name}
              </Link>

              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1 text-[#FFC107]">
                  <Star className="w-3.5 h-3.5 fill-[#FFC107]" />
                  <span className="text-xs font-bold text-slate-800">{product.rating}</span>
                  <span className="text-[11px] text-slate-400">({product.reviews})</span>
                </div>
                {getStockUrgency()}
              </div>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                {product.description}
              </p>
            </div>

            {/* Price & Action Row */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 flex-wrap gap-3">
              <Price
                amount={product.price}
                oldAmount={product.oldPrice}
                discountPercentage={product.discount}
                size="md"
              />

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    trackRecentlyViewed();
                    setIsQuickViewOpen(true);
                  }}
                  className="p-2.5 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  onClick={handleToggleWishlist}
                  className={`p-2.5 border rounded-xl transition-colors cursor-pointer ${
                    isFavorite
                      ? 'border-rose-300 bg-rose-50 text-rose-600'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                  }`}
                  title="Add to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-600' : ''}`} />
                </button>

                <button
                  onClick={handleQuickAdd}
                  disabled={isAdding}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                    isAdded
                      ? 'bg-[#4CAF50] text-white shadow-md'
                      : 'bg-[#FF5722] hover:bg-[#E64A19] text-white shadow-md shadow-[#FF5722]/25 active:scale-95'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" /> Added!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isQuickViewOpen && (
          <QuickViewModal product={product} onClose={() => setIsQuickViewOpen(false)} />
        )}
      </>
    );
  }

  // GRID VIEW LAYOUT (4-Column Desktop, 2-Column Mobile)
  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-white rounded-3xl p-3 sm:p-4 border border-slate-200/70 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group relative select-none hover:-translate-y-1"
      >
        {/* Top Badges */}
        <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-10 pointer-events-none">
          {getBadge()}
        </div>

        {/* Action icons on top right */}
        <div className="absolute top-3.5 sm:top-4 right-3.5 sm:right-4 z-10 flex flex-col gap-1.5">
          <button
            onClick={handleToggleWishlist}
            className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all cursor-pointer ${
              isFavorite
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-white/95 text-slate-600 hover:text-rose-600 hover:scale-105'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-600' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              trackRecentlyViewed();
              setIsQuickViewOpen(true);
            }}
            className="w-8 h-8 rounded-full shadow-md bg-white/95 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all hover:scale-105 cursor-pointer opacity-0 group-hover:opacity-100"
            title="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Thumbnail Image Container */}
        <Link
          to={`/product/${product.slug}`}
          onClick={trackRecentlyViewed}
          className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 relative mb-3 block"
        >
          <img
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-106"
            loading="lazy"
          />

          {/* Quick Add Overlay on Desktop Hover */}
          <div className="absolute inset-x-2 bottom-2 hidden lg:flex opacity-0 group-hover:opacity-100 transition-all duration-200">
            <button
              onClick={handleQuickAdd}
              disabled={isAdding}
              className={`w-full py-2.5 rounded-xl text-xs font-black shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer backdrop-blur-md ${
                isAdded
                  ? 'bg-[#4CAF50] text-white'
                  : 'bg-slate-950/90 hover:bg-[#FF5722] text-white'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
                </>
              )}
            </button>
          </div>
        </Link>

        {/* Card Body */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Brand & Stock Pill */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span className="font-bold text-[#FF5722] uppercase tracking-wider text-[10px]">
                {product.brand}
              </span>
              <span className="text-[10px] text-slate-400 truncate max-w-[80px]">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <Link
              to={`/product/${product.slug}`}
              onClick={trackRecentlyViewed}
              className="text-xs sm:text-sm font-black text-slate-900 hover:text-[#FF5722] transition-colors line-clamp-2 leading-snug mb-1.5 min-h-[34px]"
            >
              {product.name}
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-2.5">
              <div className="flex items-center text-[#FFC107]">
                <Star className="w-3.5 h-3.5 fill-[#FFC107]" />
              </div>
              <span className="text-xs font-bold text-slate-800">{product.rating}</span>
              <span className="text-[10px] text-slate-400 font-medium">
                ({product.reviews})
              </span>
            </div>
          </div>

          {/* Pricing & Mobile Add Button */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between mt-auto">
            <Price
              amount={product.price}
              oldAmount={product.oldPrice}
              size="sm"
            />

            {/* Mobile / Tablet Quick Add Button */}
            <button
              onClick={handleQuickAdd}
              disabled={isAdding}
              className={`lg:hidden w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                isAdded
                  ? 'bg-[#4CAF50] text-white'
                  : 'bg-[#FF5722]/10 hover:bg-[#FF5722] text-[#FF5722] hover:text-white'
              }`}
              title="Add to Cart"
            >
              {isAdded ? (
                <Check className="w-4 h-4" />
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isQuickViewOpen && (
        <QuickViewModal product={product} onClose={() => setIsQuickViewOpen(false)} />
      )}
    </>
  );
};
