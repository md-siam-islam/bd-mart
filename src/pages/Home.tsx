import React from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { AdvancedMarquee } from '../components/home/AdvancedMarquee';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { ProductShowcase } from '../components/home/ProductShowcase';
import { BrandStorySection } from '../components/home/BrandStorySection';
import { EditorialShowcaseSlider } from '../components/home/EditorialShowcaseSlider';
import { CollectionBanner } from '../components/home/CollectionBanner';
import { BestSellersShowcase } from '../components/home/BestSellersShowcase';
import { TrustBenefitsSection } from '../components/home/TrustBenefitsSection';
import { Testimonials } from '../components/home/Testimonials';
import { NewsletterCTA } from '../components/home/NewsletterCTA';

export const Home: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-[#07090E] transition-colors duration-200 selection:bg-[#FF5722] selection:text-white">
      {/* 1. Hero Banner: Primary Visual Focus */}
      <HeroBanner />

      {/* 2. Advanced Marquee: Layered 3-Strip Editorial Infinite Ribbon */}
      <AdvancedMarquee />

      {/* 3. Featured Categories: High-Definition Visual Department Cards */}
      <FeaturedCategories />

      {/* 4. Product Showcase: New Arrivals & Curated Picks (4-col Desktop / 2-col Mobile) */}
      <ProductShowcase />

      {/* 5. Brand Story Section: Bangladeshi Heritage & Artisan Purity */}
      <BrandStorySection />

      {/* 6. Interactive Artisan Showcase Slider: 3D Rotating Product & Dual Parallax */}
      <EditorialShowcaseSlider />

      {/* 7. Promotional & Collection Banner: High-Impact Campaigns */}
      <CollectionBanner />

      {/* 7. Best Sellers: Customer Favorites Showcase */}
      <BestSellersShowcase />

      {/* 8. Benefits & Trust Section: 64 Districts COD, Warranty & Fast Delivery */}
      <TrustBenefitsSection />

      {/* 9. Customer Testimonials: Real Verified Buyer Experiences */}
      <Testimonials />

      {/* 10. Newsletter / CTA: VIP Club Instant ৳500 Voucher */}
      <NewsletterCTA />
    </div>
  );
};
