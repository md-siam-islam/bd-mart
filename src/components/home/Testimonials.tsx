import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  purchasedItem: string;
  avatar: string;
  rating: number;
  comment: string;
  backdropColor: string; // Tailored to BD Mart's brand colors
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Misbah Ur Rahman',
    role: 'Lead Architect',
    location: 'Dhanmondi, Dhaka',
    purchasedItem: 'Sony WH-1000XM5 ANC Headset',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&auto=format&fit=crop&q=85',
    rating: 5,
    comment:
      'Alhamdulillah, the headphones arrived in pristine condition with the original warranty card intact. Fast 24-hour dispatch to Dhanmondi with Cash on Delivery. Truly a world-class shopping experience in Bangladesh!',
    backdropColor: 'from-[#FF5722] to-[#FF9800]' // Primary Brand Flame
  },
  {
    id: 'test-2',
    name: 'Rakib Hasan',
    role: 'Creative Director',
    location: 'Uttara, Dhaka',
    purchasedItem: 'Royal Silk Embroidered Panjabi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250&auto=format&fit=crop&q=85',
    rating: 5,
    comment:
      'The Panjabi fabric is premium combed fine cotton with subtle festive embroidery. The packaging came in an executive BD Mart gift box. Highly recommended for authentic Eid shopping.',
    backdropColor: 'from-[#FF9800] to-[#FFC107]' // Warm Accent Gold
  },
  {
    id: 'test-3',
    name: 'Nirob Ahmed',
    role: 'Product Specialist',
    location: 'Panchlaish, Chittagong',
    purchasedItem: 'Sundarban Raw Khalisha Honey',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=250&auto=format&fit=crop&q=85',
    rating: 5,
    comment:
      '100% authentic raw honey! Natural floral aroma, crystal clear, zero adulteration. Delivered safely to Chittagong via Steadfast courier with real-time SMS updates.',
    backdropColor: 'from-[#4CAF50] to-[#81C784]' // Fresh Green Purity
  },
  {
    id: 'test-4',
    name: 'Farhana Kabir',
    role: 'Fashion Designer',
    location: 'Zindabazar, Sylhet',
    purchasedItem: 'Authentic Dhakai Jamdani Saree',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&auto=format&fit=crop&q=85',
    rating: 5,
    comment:
      'Exquisite handwoven artistry direct from Narayanganj weavers. Soft texture, intricate motifs, and flawless finishing. Customer care even assisted me over WhatsApp!',
    backdropColor: 'from-[#FF5722] to-[#E64A19]' // Deep Coral Flame
  },
  {
    id: 'test-5',
    name: 'Mahmudul Hasan',
    role: 'Software Engineer',
    location: 'Kazir Dewri, Chittagong',
    purchasedItem: 'Smart Digital Rapid Air Fryer XXL',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=250&auto=format&fit=crop&q=85',
    rating: 5,
    comment:
      'A game changer for our family kitchen! Crisp healthy fries with 90% less oil. Official warranty, quick bKash payment verification, and courteous delivery personnel.',
    backdropColor: 'from-[#2196F3] to-[#64B5F6]' // Material Sky Blue
  }
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const length = TESTIMONIALS.length;

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % length);
  }, [length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  }, [length]);

  // Auto rotation every 6s, pauses when hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      nextSlide(); // Swiped left -> advance next
    } else if (distance < -50) {
      prevSlide(); // Swiped right -> advance prev
    }
    setTouchStart(null);
  };

  /**
   * Calculates animated styles based on relative slot position (diff):
   * diff === 0  => Center (active hero)
   * diff === 1  => Right card
   * diff === -1 => Left card
   * diff > 1    => Far right (offscreen / hidden)
   * diff < -1   => Far left (offscreen / hidden)
   *
   * On "Next" click: diff changes from 1 to 0 (Right -> Middle) and from 0 to -1 (Middle -> Left)
   * On "Prev" click: diff changes from -1 to 0 (Left -> Middle) and from 0 to 1 (Middle -> Right)
   */
  const getCardStyle = (diff: number, mobile: boolean) => {
    if (mobile) {
      if (diff === 0) {
        return {
          x: '0%',
          scale: 1,
          rotate: 0,
          opacity: 1,
          zIndex: 30,
          filter: 'blur(0px)',
          pointerEvents: 'auto' as const
        };
      }
      return {
        x: diff > 0 ? '120%' : '-120%',
        scale: 0.85,
        rotate: diff > 0 ? 6 : -6,
        opacity: 0,
        zIndex: 0,
        filter: 'blur(4px)',
        pointerEvents: 'none' as const
      };
    }

    // Tablet & Desktop
    switch (diff) {
      case 0:
        return {
          x: '0%',
          scale: 1.05,
          rotate: 0,
          opacity: 1,
          zIndex: 30,
          filter: 'blur(0px)',
          pointerEvents: 'auto' as const
        };
      case -1:
        return {
          x: '-92%',
          scale: 0.88,
          rotate: -6,
          opacity: 0.88,
          zIndex: 20,
          filter: 'blur(0px)',
          pointerEvents: 'auto' as const
        };
      case 1:
        return {
          x: '92%',
          scale: 0.88,
          rotate: 6,
          opacity: 0.88,
          zIndex: 20,
          filter: 'blur(0px)',
          pointerEvents: 'auto' as const
        };
      case -2:
        return {
          x: '-170%',
          scale: 0.7,
          rotate: -12,
          opacity: 0,
          zIndex: 10,
          filter: 'blur(4px)',
          pointerEvents: 'none' as const
        };
      case 2:
        return {
          x: '170%',
          scale: 0.7,
          rotate: 12,
          opacity: 0,
          zIndex: 10,
          filter: 'blur(4px)',
          pointerEvents: 'none' as const
        };
      default:
        return {
          x: diff < 0 ? '-200%' : '200%',
          scale: 0.6,
          rotate: diff < 0 ? -15 : 15,
          opacity: 0,
          zIndex: 0,
          filter: 'blur(8px)',
          pointerEvents: 'none' as const
        };
    }
  };

  return (
    <section
      className="py-16 sm:py-24 bg-white dark:bg-[#07090E] text-slate-900 dark:text-white overflow-hidden relative select-none border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="What Our Clients Say About Us"
    >
      {/* Background Subtle Ambient Lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF5722]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF9800]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header: Short Title Pill, Main Heading with Nav Arrows, and Short Description */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Short Title / Kicker Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/25 text-[#FF5722] text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5722]" />
            Verified Customer Reviews
          </div>

          {/* Nav Arrows & Main Heading */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 mb-3">
            {/* Left Chevron Button */}
            <button
              onClick={prevSlide}
              className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white dark:bg-slate-800 hover:bg-[#FF5722] dark:hover:bg-[#FF5722] border-2 border-slate-200 dark:border-slate-700 hover:border-[#FF5722] dark:hover:border-[#FF5722] text-slate-700 dark:text-slate-200 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 shadow-md hover:shadow-lg shadow-slate-200/60 dark:shadow-black/50 shrink-0"
              aria-label="Previous review"
              title="Previous review"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </button>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              What Our Clients Say About Us
            </h2>

            {/* Right Chevron Button */}
            <button
              onClick={nextSlide}
              className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white dark:bg-slate-800 hover:bg-[#FF5722] dark:hover:bg-[#FF5722] border-2 border-slate-200 dark:border-slate-700 hover:border-[#FF5722] dark:hover:border-[#FF5722] text-slate-700 dark:text-slate-200 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 shadow-md hover:shadow-lg shadow-slate-200/60 dark:shadow-black/50 shrink-0"
              aria-label="Next review"
              title="Next review"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </button>
          </div>

          {/* Short Description */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed px-4">
            Discover genuine stories and verified feedback from thousands of satisfied shoppers across all 64 districts who trust BD Mart every single day.
          </p>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 h-2.5 rounded-full bg-gradient-to-r from-[#FF5722] to-[#FF9800] shadow-md shadow-[#FF5722]/30'
                    : 'w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 3D Asymmetrical Motion Slider Stage */}
        <div className="relative max-w-5xl mx-auto h-[490px] sm:h-[530px] flex items-center justify-center overflow-visible">
          {TESTIMONIALS.map((item, index) => {
            // Circular relative offset: -2, -1, 0, 1, 2
            let diff = (index - currentIndex) % length;
            if (diff > length / 2) diff -= length;
            else if (diff < -length / 2) diff += length;

            const cardStyle = getCardStyle(diff, isMobile);
            const isCenter = diff === 0;

            return (
              <motion.div
                key={item.id}
                className="absolute cursor-pointer will-change-transform"
                style={{ width: isMobile ? 'min(90vw, 360px)' : '380px' }}
                initial={false}
                animate={cardStyle}
                transition={{
                  type: 'spring',
                  stiffness: 240,
                  damping: 26,
                  mass: 0.8
                }}
                onClick={() => {
                  if (diff === 1) nextSlide();
                  else if (diff === -1) prevSlide();
                }}
              >
                {/* Organic Asymmetrical Brand Backdrop Shape */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.backdropColor} rounded-[36px] sm:rounded-[42px] transform ${
                    isCenter
                      ? 'rotate-3 translate-x-2 sm:translate-x-3 translate-y-2 sm:translate-y-3 opacity-95 shadow-2xl shadow-[#FF5722]/30'
                      : diff < 0
                      ? '-rotate-6 sm:-rotate-8 translate-x-2 -translate-y-2 opacity-85 shadow-lg'
                      : 'rotate-6 sm:rotate-8 -translate-x-2 -translate-y-2 opacity-85 shadow-lg'
                  } transition-transform duration-500`}
                />

                {/* Dark Charcoal Card Body matching reference style */}
                <div className="relative bg-[#16181F] rounded-[30px] sm:rounded-[34px] p-6 sm:p-8 pt-12 sm:pt-14 text-center shadow-2xl border border-white/10 z-10 select-none">
                  {/* Overlapping Circular Avatar */}
                  <div className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2">
                    <div
                      className={`rounded-full overflow-hidden border-4 border-white shadow-xl transition-all duration-300 ${
                        isCenter
                          ? 'w-20 h-20 sm:w-22 sm:h-22 ring-3 ring-[#FF5722]'
                          : 'w-16 h-16 sm:w-18 sm:h-18 ring-2 ring-white/30'
                      }`}
                    >
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Reviewer Name */}
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                    {item.name}
                  </h3>

                  {/* Role */}
                  <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                    {item.role}
                  </p>

                  {/* Star Rating & Verified Buyer Badge */}
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="flex items-center text-[#FFC107]">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#FFC107]" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#4CAF50] bg-[#4CAF50]/15 px-2 py-0.5 rounded-full border border-[#4CAF50]/30">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  </div>

                  {/* Quotation Mark in Brand Accent */}
                  <div className="my-2 flex justify-center text-[#FF5722]">
                    <span className="text-3xl font-serif leading-none select-none">“</span>
                  </div>

                  {/* Review Text */}
                  <p
                    className={`text-xs sm:text-sm text-slate-200 leading-relaxed font-normal ${
                      isCenter ? 'line-clamp-4 sm:line-clamp-none' : 'line-clamp-4'
                    }`}
                  >
                    {item.comment}
                  </p>

                  {/* Purchased Product Tag & Location */}
                  <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-center gap-2 flex-wrap">
                    <span className="text-white font-medium truncate max-w-[180px]">
                      {item.purchasedItem}
                    </span>
                    <span>•</span>
                    <span className="text-[#FF9800] font-bold">{item.location}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Navigation Controls */}
        <div className="mt-8 flex items-center justify-center gap-3 md:hidden">
          <button
            onClick={prevSlide}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>
          <span className="text-xs text-slate-600 font-mono font-bold px-2">
            {currentIndex + 1} / {length}
          </span>
          <button
            onClick={nextSlide}
            className="px-5 py-2.5 rounded-xl bg-[#FF5722] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#FF5722]/30 active:scale-95 transition-transform"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
