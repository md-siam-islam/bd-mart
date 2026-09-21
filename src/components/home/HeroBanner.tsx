import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Flame,
  Sparkles,
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  Tag,
  Clock,
  Pause,
  Play,
  ShoppingBag,
  Star,
  Zap,
  Gift
} from 'lucide-react';

interface Slide {
  id: number;
  tabLabel: string;
  tag: string;
  tagColor: string;
  title: string;
  highlightText: string;
  description: string;
  badge: string;
  offerPill: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  bgImage: string;
  spotlight: {
    productName: string;
    dealTag: string;
    originalPrice?: string;
    salePrice: string;
    rating: string;
    reviewsCount: string;
    perk: string;
    isCountdown?: boolean;
  };
}

const SLIDES: Slide[] = [
  {
    id: 1,
    tabLabel: 'Festive Eid',
    tag: 'EID & FESTIVE COLLECTION 2026',
    tagColor: 'text-amber-300 bg-amber-500/20 border-amber-400/40',
    title: 'Grand Elegance & ',
    highlightText: 'Festive Splendor',
    description: 'Experience Bangladesh’s finest handcrafted luxury Panjabis, exquisite Dhakai Jamdani sarees, and artisan footwear designed for celebratory moments.',
    badge: '100% Authentic Bangladeshi Craftsmanship',
    offerPill: 'Up to 40% OFF with code EID2026',
    primaryBtnText: 'Shop Festive Wear',
    primaryBtnLink: '/category/mens-fashion',
    secondaryBtnText: 'Explore Collection',
    secondaryBtnLink: '/flash-sale',
    bgImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=2400&auto=format&fit=crop&q=90',
    spotlight: {
      productName: 'Royal Silk Embroidered Panjabi',
      dealTag: 'Festive Bestseller',
      originalPrice: '৳4,500',
      salePrice: '৳2,850',
      rating: '4.9',
      reviewsCount: '1,420',
      perk: 'Complimentary Eid Gift Box Included',
      isCountdown: true
    }
  },
  {
    id: 2,
    tabLabel: 'Gadgets & Audio',
    tag: 'OFFICIAL BRAND TECH & AUDIO',
    tagColor: 'text-cyan-300 bg-cyan-500/20 border-cyan-400/40',
    title: 'Next-Gen Audio & ',
    highlightText: 'Smart Tech Gear',
    description: 'Flagship wireless noise-cancelling headphones, AMOLED smartwatches, and premium accessories backed by official brand warranty across Bangladesh.',
    badge: 'Official Brand Warranty & Zero-Interest EMI',
    offerPill: 'Instant ৳5,000 bKash Cashback',
    primaryBtnText: 'Explore Tech Deals',
    primaryBtnLink: '/category/electronics',
    secondaryBtnText: 'Audio Specials',
    secondaryBtnLink: '/best-sellers',
    bgImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=2400&auto=format&fit=crop&q=90',
    spotlight: {
      productName: 'Sony WH-1000XM5 ANC Headset',
      dealTag: 'Official Sony BD',
      originalPrice: '৳38,500',
      salePrice: '৳33,990',
      rating: '5.0',
      reviewsCount: '890',
      perk: 'Official 1 Year Replacement Warranty',
      isCountdown: false
    }
  },
  {
    id: 3,
    tabLabel: 'Pure Organic',
    tag: '100% LAB-TESTED ORGANIC AGRO',
    tagColor: 'text-emerald-300 bg-emerald-500/20 border-emerald-400/40',
    title: 'Wholesome Nutrition for ',
    highlightText: 'Your Healthy Family',
    description: 'Cold-pressed organic mustard oil, pure ghee, natural Sundarban raw honey, and premium pantry essentials delivered direct from verified farms.',
    badge: 'Lab-Tested & Zero-Adulteration Guarantee',
    offerPill: 'Free Delivery on Orders Over ৳2,000',
    primaryBtnText: 'Order Farm Fresh',
    primaryBtnLink: '/category/grocery',
    secondaryBtnText: 'Pure Pantry Staples',
    secondaryBtnLink: '/shop',
    bgImage: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=2400&auto=format&fit=crop&q=90',
    spotlight: {
      productName: 'Raw Sundarban Khalisha Honey (1kg)',
      dealTag: 'Natural Harvest',
      originalPrice: '৳1,800',
      salePrice: '৳1,450',
      rating: '4.9',
      reviewsCount: '2,150',
      perk: 'BSTI & Lab Tested Adulteration-Free',
      isCountdown: false
    }
  },
  {
    id: 4,
    tabLabel: 'Smart Living',
    tag: 'SMART LIVING & APPLIANCES',
    tagColor: 'text-orange-300 bg-orange-500/20 border-orange-400/40',
    title: 'Elevate Your Home with ',
    highlightText: 'Modern Intelligence',
    description: 'Smart kitchen air fryers, multi-room robot vacuums, inverter blenders, and ambient smart home decor engineered for modern urban apartments.',
    badge: 'Complimentary Installation Inside Dhaka',
    offerPill: 'Bundle Discount: Save up to ৳4,000',
    primaryBtnText: 'Shop Home Living',
    primaryBtnLink: '/deals',
    secondaryBtnText: 'Top Appliances',
    secondaryBtnLink: '/new-arrivals',
    bgImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=2400&auto=format&fit=crop&q=90',
    spotlight: {
      productName: 'Smart Digital Rapid Air Fryer XXL',
      dealTag: 'Energy Saver 5★',
      originalPrice: '৳14,500',
      salePrice: '৳10,990',
      rating: '4.8',
      reviewsCount: '630',
      perk: 'Free Home Demo & 2-Year Warranty',
      isCountdown: false
    }
  },
  {
    id: 5,
    tabLabel: 'Flash Deals',
    tag: 'LIMITED TIME MEGA SALE',
    tagColor: 'text-rose-300 bg-rose-500/20 border-rose-400/40',
    title: 'Midnight Flash Sale & ',
    highlightText: 'Exclusive Savings',
    description: 'Sensational price drops across top smartphones, branded sneakers, designer watches, and luxury perfumes. Stocks are strictly limited!',
    badge: 'Steadfast Courier 24-48h Fast Delivery',
    offerPill: 'Extra 10% Nagad & bKash Discount',
    primaryBtnText: 'Grab Flash Deals',
    primaryBtnLink: '/flash-sale',
    secondaryBtnText: 'All Discounted Items',
    secondaryBtnLink: '/shop',
    bgImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=2400&auto=format&fit=crop&q=90',
    spotlight: {
      productName: 'Apple Watch Ultra 2 (GPS + Cellular)',
      dealTag: 'Flash Deal: 22% OFF',
      originalPrice: '৳98,000',
      salePrice: '৳79,900',
      rating: '5.0',
      reviewsCount: '540',
      perk: 'Limited Stock: Only 12 Units Left',
      isCountdown: true
    }
  }
];

const SLIDE_DURATION = 6000; // 6 seconds per slide

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState({ hours: 7, minutes: 34, seconds: 18 });
  const touchStartXRef = useRef<number | null>(null);

  // Preload high-res images in the background on mount
  useEffect(() => {
    SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.bgImage;
    });
  }, []);

  // Flash deal countdown timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  // Progress Bar & Auto-rotation
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50; // update every 50ms for smooth progress bar
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
  };

  const slide = SLIDES[currentSlide];

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-950 font-sans select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Promotional Hero Slider"
    >
      {/* Slider Carousel Container */}
      <div className="relative min-h-[580px] sm:min-h-[620px] lg:min-h-[680px] flex items-center justify-center">
        {/* Cinematic Background Image with Ken Burns Zoom & Smooth Cross-fade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 z-0 overflow-hidden"
          >
            <img
              src={slide.bgImage}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-100 will-change-transform"
              loading="eager"
            />

            {/* Premium Studio Gradient Overlays */}
            {/* Left dark mask for crystal-clear text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 via-45% to-slate-950/40 lg:to-slate-950/20" />
            {/* Top subtle fade for header blend */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-slate-950/90" />
            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Foreground Content Container */}
        <div className="container-custom relative z-10 py-12 sm:py-16 lg:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Headings, Badges & CTA (7 cols on desktop) */}
            <div className="lg:col-span-7 text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 25 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="space-y-5 sm:space-y-6"
                >
                  {/* Category & Collection Tag + Offer Pill */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase backdrop-blur-md border shadow-sm ${slide.tagColor}`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{slide.tag}</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 backdrop-blur-md text-white/95 text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 transition-colors">
                      <Tag className="w-3.5 h-3.5 text-amber-400" />
                      <span>{slide.offerPill}</span>
                    </span>
                  </div>

                  {/* Hero Main Heading */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                    {slide.title}
                    <span className="bg-gradient-to-r from-[#FF5722] via-[#FF9800] to-[#FFC107] bg-clip-text text-transparent block sm:inline sm:ml-2">
                      {slide.highlightText}
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl drop-shadow-md">
                    {slide.description}
                  </p>

                  {/* Trust Badge Bar */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-950/60 backdrop-blur-md border border-emerald-500/30 px-3.5 py-1.5 rounded-xl shadow-inner">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{slide.badge}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-950/40 backdrop-blur-md border border-amber-500/30 px-3 py-1.5 rounded-xl">
                      <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Fast Shipping in BD</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <Link
                      to={slide.primaryBtnLink}
                      className="px-8 py-3.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-xl shadow-xl shadow-primary/30 transition-all flex items-center justify-center gap-2.5 group cursor-pointer active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>{slide.primaryBtnText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </Link>

                    <Link
                      to={slide.secondaryBtnLink}
                      className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl border border-white/25 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                      <span>{slide.secondaryBtnText}</span>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Floating Glassmorphism Product Spotlight Card (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="relative p-6 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/50 overflow-hidden"
                >
                  {/* Decorative subtle ambient glow inside card */}
                  <div className="absolute -top-16 -right-16 w-44 h-44 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

                  {/* Spotlight Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
                    <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 uppercase tracking-wider">
                      <Gift className="w-3.5 h-3.5 text-amber-400" />
                      <span>{slide.spotlight.dealTag}</span>
                    </span>

                    <div className="flex items-center gap-1 text-xs font-bold text-slate-300">
                      <div className="flex items-center text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                      </div>
                      <span className="text-white font-bold">{slide.spotlight.rating}</span>
                      <span className="text-slate-400">({slide.spotlight.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Spotlight Product Title */}
                  <h2 className="text-lg font-bold text-white mb-3 line-clamp-2 relative z-10 leading-snug">
                    {slide.spotlight.productName}
                  </h2>

                  {/* Pricing Display */}
                  <div className="flex items-baseline gap-3 mb-4 relative z-10">
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      {slide.spotlight.salePrice}
                    </span>
                    {slide.spotlight.originalPrice && (
                      <span className="text-sm font-semibold text-slate-400 line-through">
                        {slide.spotlight.originalPrice}
                      </span>
                    )}
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                      Special Rate
                    </span>
                  </div>

                  {/* Highlight Perk */}
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 rounded-xl p-3 mb-5 relative z-10">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{slide.spotlight.perk}</span>
                  </div>

                  {/* Flash Deal Live Countdown Widget */}
                  {slide.spotlight.isCountdown && (
                    <div className="bg-slate-950/70 border border-amber-500/30 rounded-2xl p-3.5 mb-5 relative z-10">
                      <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-2">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                          <span>Flash Deal Closes In:</span>
                        </div>
                        <span className="text-[11px] uppercase tracking-wider text-slate-400">Live Counter</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-slate-900/90 border border-white/10 rounded-xl py-1.5">
                          <span className="block text-lg font-black text-white font-mono leading-none">
                            {String(countdown.hours).padStart(2, '0')}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase">Hours</span>
                        </div>
                        <div className="bg-slate-900/90 border border-white/10 rounded-xl py-1.5">
                          <span className="block text-lg font-black text-white font-mono leading-none">
                            {String(countdown.minutes).padStart(2, '0')}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase">Mins</span>
                        </div>
                        <div className="bg-slate-900/90 border border-white/10 rounded-xl py-1.5">
                          <span className="block text-lg font-black text-amber-400 font-mono leading-none">
                            {String(countdown.seconds).padStart(2, '0')}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase">Secs</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Quick Link */}
                  <Link
                    to={slide.primaryBtnLink}
                    className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer relative z-10 group"
                  >
                    <span>View Spotlight Item</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Previous & Next Control Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-slate-900/70 hover:bg-slate-900/95 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer group"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-slate-900/70 hover:bg-slate-900/95 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer group"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Play / Pause & Slide Counter Widget (Top-Right of Hero) */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-8 z-20 flex items-center gap-2 bg-slate-900/75 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-xs font-medium text-white/90 shadow-lg">
          <button
            onClick={() => setIsPaused((p) => !p)}
            className="text-white/80 hover:text-white transition-colors cursor-pointer p-0.5"
            aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
            title={isPaused ? 'Resume Slideshow' : 'Pause Slideshow'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 fill-white" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          <span className="w-px h-3 bg-white/20" />
          <span className="font-mono font-bold text-white text-xs">
            {String(currentSlide + 1).padStart(2, '0')}
          </span>
          <span className="text-white/40 text-[11px]">/</span>
          <span className="text-white/50 text-[11px] font-mono">
            {String(SLIDES.length).padStart(2, '0')}
          </span>
        </div>

        {/* Interactive Bottom Slide Tabs with Animated Fill Bars */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-full max-w-3xl px-4">
          <div className="bg-slate-950/70 backdrop-blur-xl border border-white/15 rounded-2xl p-2 shadow-2xl flex items-center justify-between gap-1.5 sm:gap-2">
            {SLIDES.map((s, idx) => {
              const isActive = currentSlide === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => goToSlide(idx)}
                  className={`relative flex-1 py-1.5 sm:py-2 px-2 rounded-xl text-left transition-all duration-300 overflow-hidden cursor-pointer group ${
                    isActive ? 'bg-white/15 shadow-inner' : 'hover:bg-white/5'
                  }`}
                  aria-label={`Jump to slide ${idx + 1}: ${s.tabLabel}`}
                >
                  {/* Tab Label */}
                  <div className="flex items-center justify-between gap-1 relative z-10">
                    <span
                      className={`text-[11px] sm:text-xs font-bold truncate transition-colors ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {s.tabLabel}
                    </span>
                    <span className="text-[10px] font-mono text-white/40 hidden md:inline">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Progress / Active Indicator Bar */}
                  <div className="w-full bg-white/15 h-1 rounded-full mt-1.5 overflow-hidden relative">
                    {isActive ? (
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary via-accent to-gold rounded-full"
                        style={{ width: `${progress}%` }}
                        transition={{ ease: 'linear' }}
                      />
                    ) : (
                      <div
                        className={`h-full rounded-full ${
                          idx < currentSlide ? 'w-full bg-white/40' : 'w-0'
                        }`}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
