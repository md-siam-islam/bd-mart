import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Check,
  Star,
  ShieldCheck,
  ExternalLink,
  Truck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { PRODUCTS } from '../../data/products';
import { Price } from '../common/Price';

// Curated Showcase mapping directly to REAL website products in PRODUCTS
interface ShowcaseConfig {
  productId: string;
  slideNumber: string;
  categoryTag: string;
  highlightBadge: string;
  brandTag: string;
  accentColor: string; // Site Brand Colors: #FF5722, #FF9800, #FFC107, #4CAF50, #2196F3
  macroBgImage: string;
}

const SHOWCASE_CONFIGS: ShowcaseConfig[] = [
  {
    productId: 'prod-13', // Authentic Dhakai Jamdani Saree
    slideNumber: '01',
    categoryTag: "Women's Heritage Handloom",
    highlightBadge: '84-Count Traditional Zari Weave',
    brandTag: 'Aarong Earth',
    accentColor: '#FF5722', // Primary Brand Color
    macroBgImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200&auto=format&fit=crop&q=80' // Royal maroon silk & golden zari weave macro texture
  },
  {
    productId: 'prod-1', // Sony WH-1000XM5 ANC Headphones
    slideNumber: '02',
    categoryTag: 'Flagship Electronics & Audio',
    highlightBadge: 'Industry-Leading Active Noise Cancelling',
    brandTag: 'Sony Electronics',
    accentColor: '#2196F3', // Material Sky Blue
    macroBgImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&auto=format&fit=crop&q=80' // Studio audio mixing waveforms & acoustic console
  },
  {
    productId: 'prod-9', // Aarong Fine Cotton Festive Panjabi
    slideNumber: '03',
    categoryTag: "Men's Festive & Eid Collection",
    highlightBadge: '100% Combed Fine Cotton & Embroidery',
    brandTag: 'Aarong Earth',
    accentColor: '#FF9800', // Vibrant Orange Accent
    macroBgImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&auto=format&fit=crop&q=80' // Golden artisan festive embroidery stitches on cotton
  },
  {
    productId: 'prod-21', // Al-Haramain Amber Oud Gold Edition
    slideNumber: '04',
    categoryTag: 'Luxury Fragrance & Attar',
    highlightBadge: '24-Hour Pure Sillage & Dehn Al Oudh',
    brandTag: 'Al Haramain',
    accentColor: '#FFC107', // Amber Gold
    macroBgImage: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=1200&auto=format&fit=crop&q=80' // Liquid amber gold droplets & dehn al oudh essence
  },
  {
    productId: 'prod-19', // Khaas Food Virgin Cold-Pressed Coconut Oil
    slideNumber: '05',
    categoryTag: '100% Pure Organic & Wellness',
    highlightBadge: 'Wood-Pressed Cold Ghani Purity',
    brandTag: 'Khaas Food',
    accentColor: '#4CAF50', // Fresh Green
    macroBgImage: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=1200&auto=format&fit=crop&q=80' // Fresh organic coconut halves & pure cold-pressed oil
  }
];

export const EditorialShowcaseSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart } = useCart();
  const { showToast } = useToast();

  const totalSlides = SHOWCASE_CONFIGS.length;
  const currentConfig = SHOWCASE_CONFIGS[currentIndex];

  // Resolve active product from actual store database
  const currentProduct = PRODUCTS.find((p) => p.id === currentConfig.productId) || PRODUCTS[0];

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      else if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Auto rotation every 7 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Instant Add to Cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(currentProduct, 1);
    setIsAdded(true);
    showToast(`Added "${currentProduct.name}" to cart!`, 'success');
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section
      className="py-10 sm:py-14 bg-slate-50 dark:bg-[#07090E] transition-colors duration-200 relative select-none overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured Product Showcase"
    >
      <div className="container-custom relative z-10">
        {/* Sleek, Clean Showcase Card Container (No dead bottom space, zero clipping) */}
        <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden shadow-sm hover:shadow-md dark:shadow-none border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0E131F] transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px] sm:min-h-[500px]">

            {/* ============================================================ */}
            {/* LEFT SIDE PANEL: Vertical Slide & Text Reveal Animation */}
            {/* ============================================================ */}
            <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 lg:p-10 lg:pr-14 xl:p-12 xl:pr-18 relative z-10 bg-white dark:bg-[#0E131F] transition-colors duration-300">
              {/* Header: Brand & Category Badge */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: currentConfig.accentColor }}
                  />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    {currentConfig.brandTag}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {currentConfig.categoryTag}
                  </span>
                </div>

                {/* Counter Badge */}
                <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                  {currentConfig.slideNumber} / 0{totalSlides}
                </span>
              </div>

              {/* Animated Text Block (Vertical Slide In / Out) - Safe bounded width */}
              <div className="my-auto py-2 sm:py-3 max-w-[320px] sm:max-w-[350px] lg:max-w-[330px] xl:max-w-[380px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`left-text-${currentProduct.id}`}
                    custom={direction}
                    variants={{
                      enter: (dir: number) => ({
                        opacity: 0,
                        y: dir > 0 ? 25 : -25
                      }),
                      center: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.38,
                          ease: [0.22, 1, 0.36, 1]
                        }
                      },
                      exit: (dir: number) => ({
                        opacity: 0,
                        y: dir > 0 ? -25 : 25,
                        transition: {
                          duration: 0.25,
                          ease: 'easeIn'
                        }
                      })
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-3"
                  >
                    {/* Highlight Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                      <Sparkles className="w-3 h-3 text-[#FF5722]" />
                      <span className="truncate">{currentConfig.highlightBadge}</span>
                    </div>

                    {/* Compact, Refined Heading (Won't overlap center card) */}
                    <h3 className="text-xl sm:text-2xl lg:text-[25px] xl:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug line-clamp-2">
                      {currentProduct.name}
                    </h3>

                    {/* Star Rating & Reviews */}
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center text-[#FFC107]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#FFC107]" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {currentProduct.rating}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        ({currentProduct.reviews} reviews)
                      </span>
                    </div>

                    {/* Readable, Sized-Down Description */}
                    <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {currentProduct.shortDescription || currentProduct.description}
                    </p>

                    {/* Price & Action Row */}
                    <div className="pt-2 flex items-center gap-3.5 flex-wrap">
                      <div className="flex items-baseline gap-2">
                        <Price amount={currentProduct.price} size="lg" className="text-slate-900 dark:text-white font-black" />
                        {currentProduct.oldPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ৳{currentProduct.oldPrice.toLocaleString()}
                          </span>
                        )}
                        {currentProduct.discount && (
                          <span className="text-[10px] font-black text-[#FF5722] bg-[#FF5722]/10 px-2 py-0.5 rounded-md">
                            -{currentProduct.discount}%
                          </span>
                        )}
                      </div>

                      {/* Action Buttons: ADD TO CART & View Details */}
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                          onClick={handleAddToCart}
                          className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-[#FF5722]/30 flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                              <span>ADDED!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>ADD TO CART</span>
                            </>
                          )}
                        </button>

                        <Link
                          to={`/product/${currentProduct.slug}`}
                          className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#FF5722] dark:hover:text-[#FF5722] transition-colors flex items-center gap-1"
                        >
                          <span>Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Guarantee Strip (Safely constrained within left column) */}
              <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1 max-w-[320px] sm:max-w-[350px] lg:max-w-[330px] xl:max-w-[380px]">
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4CAF50]" /> 100% Genuine Guaranteed
                </span>
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <Truck className="w-3.5 h-3.5 text-[#FF9800]" /> 64 Districts Delivery
                </span>
              </div>
            </div>

            {/* ============================================================ */}
            {/* RIGHT SIDE PANEL: Horizontal Pan & Zoom Parallax Animation */}
            {/* ============================================================ */}
            <div className="lg:col-span-6 relative overflow-hidden bg-slate-950 flex flex-col justify-between p-6 sm:p-8 lg:p-10 min-h-[280px] sm:min-h-[320px] lg:min-h-full">
              {/* Macro Background Image with Parallax Wipe */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`right-bg-${currentProduct.id}`}
                  custom={direction}
                  variants={{
                    enter: (dir: number) => ({
                      opacity: 0,
                      scale: 1.15,
                      x: dir > 0 ? 40 : -40
                    }),
                    center: {
                      opacity: 1,
                      scale: 1,
                      x: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1]
                      }
                    },
                    exit: (dir: number) => ({
                      opacity: 0,
                      scale: 1.08,
                      x: dir > 0 ? -40 : 40,
                      transition: {
                        duration: 0.3,
                        ease: 'easeIn'
                      }
                    })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 z-0 overflow-hidden"
                >
                  <img
                    src={currentConfig.macroBgImage}
                    alt={currentProduct.name}
                    className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.05]"
                  />
                  {/* Atmospheric Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/60" />
                </motion.div>
              </AnimatePresence>

              {/* Right Top Bar: Category Pill */}
              <div className="relative z-10 flex items-center justify-end">
                <span className="text-[11px] font-semibold text-white/90 bg-black/40 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15 shadow-xs">
                  Featured Showcase
                </span>
              </div>

              {/* Right Bottom Bar: PREV / NEXT Navigation */}
              <div className="relative z-10 flex items-center justify-between sm:justify-end gap-5 pt-6">
                {/* PREV BUTTON */}
                <button
                  onClick={prevSlide}
                  className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/85 hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous slide"
                >
                  <span className="w-8 h-8 rounded-full bg-white/15 hover:bg-[#FF5722] flex items-center justify-center transition-all group-hover:-translate-x-0.5">
                    <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span className="underline-offset-4 group-hover:underline">PREV</span>
                </button>

                <div className="h-3 w-px bg-white/30" />

                {/* NEXT BUTTON */}
                <button
                  onClick={nextSlide}
                  className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/85 hover:text-white transition-colors cursor-pointer"
                  aria-label="Next slide"
                >
                  <span className="underline-offset-4 group-hover:underline">NEXT</span>
                  <span className="w-8 h-8 rounded-full bg-white/15 hover:bg-[#FF5722] flex items-center justify-center transition-all group-hover:translate-x-0.5">
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                </button>
              </div>
            </div>

            {/* ============================================================ */}
            {/* CENTER FLOATING HERO PRODUCT (ROTATES INSTANTLY ON CHANGE) */}
            {/* ============================================================ */}
            <div className="absolute top-1/2 left-1/2 lg:left-[51%] xl:left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none hidden lg:flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentProduct.id}
                  custom={direction}
                  variants={{
                    enter: (dir: number) => ({
                      opacity: 0,
                      scale: 0.75,
                      rotate: dir > 0 ? -110 : 110,
                      y: dir > 0 ? 20 : -20
                    }),
                    center: {
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      y: 0,
                      transition: {
                        type: 'spring',
                        stiffness: 240,
                        damping: 20,
                        mass: 0.8
                      }
                    },
                    exit: (dir: number) => ({
                      opacity: 0,
                      scale: 0.75,
                      rotate: dir > 0 ? 110 : -110,
                      y: dir > 0 ? -20 : 20,
                      transition: {
                        duration: 0.28,
                        ease: 'easeIn'
                      }
                    })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative flex items-center justify-center"
                >
                  {/* Soft Dropped Shadow */}
                  <div className="absolute -bottom-3 w-3/4 h-4 bg-black/20 blur-md rounded-full pointer-events-none" />

                  {/* Clean Framed Product Visual (Safe width so it never covers left text) */}
                  <div className="w-[195px] lg:w-[220px] xl:w-[245px] aspect-[4/5] relative rounded-2xl overflow-hidden shadow-md border-2 border-white dark:border-slate-700 bg-white dark:bg-slate-900 group">
                    <img
                      src={currentProduct.images[0]}
                      alt={currentProduct.name}
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Stock & Price Tag */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-slate-900/85 backdrop-blur-sm py-1 px-2 rounded-lg text-center border border-white/10">
                      <span className="text-white font-bold text-xs">
                        ৳ {currentProduct.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-emerald-400 block font-semibold">
                        In Stock • Verified
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Thumbnail Dots Indicator (Site Primary Brand Highlight) */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {SHOWCASE_CONFIGS.map((config, idx) => (
            <button
              key={config.productId}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 h-2 rounded-full bg-[#FF5722] shadow-xs'
                  : 'w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
