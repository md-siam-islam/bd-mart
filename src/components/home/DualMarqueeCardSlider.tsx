import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { QuickViewModal } from '../common/QuickViewModal';
import {
  ShoppingBag,
  Eye,
  Heart,
  Star,
  Zap,
  Sparkles,
  Check
} from 'lucide-react';

interface MarqueeCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

const MarqueeCard: React.FC<MarqueeCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);

    setTimeout(() => {
      addToCart(product, 1, product.colors?.[0]?.name, product.sizes?.[0]);
      setIsAdding(false);
      setIsAdded(true);
      showToast(`Added ${product.name} to cart!`, 'success');
      setTimeout(() => setIsAdded(false), 1800);
    }, 250);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  };

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : product.discount || 0;

  return (
    <div className="group relative w-[260px] sm:w-[295px] shrink-0 bg-white dark:bg-[#0E1424] rounded-2xl border border-slate-200/90 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 dark:hover:shadow-orange-500/5 hover:border-primary/50 transition-all duration-300 flex flex-col overflow-hidden select-none">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-900/60">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Badges Over Image */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discountPercent > 0 && (
            <span className="inline-flex items-center gap-1 bg-[#FF5722] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-md tracking-wider">
              <Zap className="w-2.5 h-2.5 fill-current" />
              {discountPercent}% OFF
            </span>
          )}
          {product.bestSeller && (
            <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-sm">
              HOT
            </span>
          )}
          {product.flashSale && !product.bestSeller && (
            <span className="inline-flex items-center gap-1 bg-rose-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-sm">
              <Sparkles className="w-2.5 h-2.5" />
              FLASH
            </span>
          )}
        </div>

        {/* Top Right Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          title={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 shadow-md ${
            isFavorite
              ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400'
              : 'bg-white/90 hover:bg-white text-slate-600 hover:text-rose-500 dark:bg-slate-900/90 dark:text-slate-300'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick View Floating Action Overlay */}
        <div className="absolute inset-x-2 bottom-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 z-10">
          <button
            onClick={handleQuickViewClick}
            className="flex-1 py-1.5 px-2 bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold rounded-lg shadow-lg backdrop-blur-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Category row */}
          <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400 dark:text-slate-500 font-medium mb-1">
            <span className="truncate uppercase tracking-wider font-semibold text-primary dark:text-[#FF9800]">
              {product.brand}
            </span>
            <span className="shrink-0 text-slate-300 dark:text-slate-700">•</span>
            <span className="truncate">{product.category}</span>
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.slug}`}
            className="block font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 hover:text-primary dark:hover:text-[#FF9800] transition-colors line-clamp-2 leading-snug"
          >
            {product.name}
          </Link>
        </div>

        {/* Rating & In-Stock indicator */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-900 dark:text-slate-100">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              ({product.reviews})
            </span>
          </div>

          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            In Stock
          </span>
        </div>

        {/* Price & Action Button Row */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-slate-950 dark:text-white tracking-tight">
                ৳{product.price.toLocaleString('en-BD')}
              </span>
              {product.oldPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ৳{product.oldPrice.toLocaleString('en-BD')}
                </span>
              )}
            </div>
            {product.oldPrice && (
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                Save ৳{(product.oldPrice - product.price).toLocaleString('en-BD')}
              </span>
            )}
          </div>

          {/* Quick Add To Cart Button */}
          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            title="Add to Cart"
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-sm active:scale-90 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#FF5722] hover:bg-[#E64A19] text-white shadow-[#FF5722]/20'
            }`}
          >
            {isAdded ? (
              <Check className="w-4 h-4" />
            ) : isAdding ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export const DualMarqueeCardSlider: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Distribute products into row 1 and row 2 for diverse counter-motion
  const { row1List, row2List } = useMemo(() => {
    const row1: Product[] = [];
    const row2: Product[] = [];

    PRODUCTS.forEach((product, idx) => {
      if (idx % 2 === 0) {
        row1.push(product);
      } else {
        row2.push(product);
      }
    });

    const r1 = row1.length >= 8 ? row1 : [...row1, ...PRODUCTS].slice(0, 12);
    const r2 = row2.length >= 8 ? row2 : [...row2, ...PRODUCTS].slice(0, 12);

    return { row1List: r1, row2List: r2 };
  }, []);

  return (
    <section
      aria-label="Dual-Row Marquee Card Slider"
      className="relative w-full py-6 sm:py-10 bg-slate-50/60 dark:bg-[#07090E] border-y border-slate-200/80 dark:border-slate-900 overflow-hidden select-none transition-colors duration-200"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Slider Rows Container */}
      <div className="relative w-full overflow-hidden flex flex-col gap-4 sm:gap-6">
        {/* Soft edge gradient fades for seamless aesthetic */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-28 bg-gradient-to-r from-slate-50 dark:from-[#07090E] to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-28 bg-gradient-to-l from-slate-50 dark:from-[#07090E] to-transparent z-20" />

        {/* =========================================================================
            ROW 1: Slides LEFT -> RIGHT
            - animate-marquee-ltr-cards moves from -50% to 0% (sliding towards right)
            - marquee-track-hover pauses on mouse hover
           ========================================================================= */}
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max marquee-track-hover animate-marquee-ltr-cards">
            {/* Set 1 */}
            <div className="flex shrink-0 items-center gap-4 sm:gap-5 pr-4 sm:pr-5">
              {row1List.map((product, idx) => (
                <MarqueeCard
                  key={`r1-a-${product.id}-${idx}`}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>

            {/* Set 2 (for seamless loop) */}
            <div className="flex shrink-0 items-center gap-4 sm:gap-5 pr-4 sm:pr-5" aria-hidden="true">
              {row1List.map((product, idx) => (
                <MarqueeCard
                  key={`r1-b-${product.id}-${idx}`}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            ROW 2: Slides RIGHT -> LEFT
            - animate-marquee-rtl-cards moves from 0% to -50% (sliding towards left)
            - marquee-track-hover pauses on mouse hover
           ========================================================================= */}
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max marquee-track-hover animate-marquee-rtl-cards">
            {/* Set 1 */}
            <div className="flex shrink-0 items-center gap-4 sm:gap-5 pr-4 sm:pr-5">
              {row2List.map((product, idx) => (
                <MarqueeCard
                  key={`r2-a-${product.id}-${idx}`}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>

            {/* Set 2 (for seamless loop) */}
            <div className="flex shrink-0 items-center gap-4 sm:gap-5 pr-4 sm:pr-5" aria-hidden="true">
              {row2List.map((product, idx) => (
                <MarqueeCard
                  key={`r2-b-${product.id}-${idx}`}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
};
