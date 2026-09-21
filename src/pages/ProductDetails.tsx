import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { CUSTOMER_REVIEWS } from '../data/reviews';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductCard } from '../components/product/ProductCard';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Price } from '../components/common/Price';
import { Rating } from '../components/common/Rating';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import {
  Heart,
  Layers,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  Share2,
  ThumbsUp,
  MapPin
} from 'lucide-react';
import { BANGLADESH_DIVISIONS } from '../data/bangladesh-geo';
import { useToast } from '../context/ToastContext';

export const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare } = useCompare();
  const { showToast } = useToast();

  const product = useMemo(() => {
    return PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  }, [slug]);

  // Variant States
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]?.name
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews' | 'shipping'>('desc');

  // Delivery Estimator State
  const [selectedDivision, setSelectedDivision] = useState('dhaka');

  const isFavorite = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 4);
  }, [product]);

  const productReviews = useMemo(() => {
    return CUSTOMER_REVIEWS.filter((r) => r.productId === product.id).concat(
      CUSTOMER_REVIEWS.slice(0, 2)
    );
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6">
      <div className="container-custom">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Shop', link: '/shop' },
            { label: product.category, link: `/category/${product.categorySlug}` },
            { label: product.name },
          ]}
        />

        {/* Product Showcase Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm mt-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Gallery (col-span-6) */}
            <div className="lg:col-span-6">
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            {/* Right Column: Information & Actions (col-span-6) */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Brand & Stock */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-primary tracking-wider uppercase">
                    Brand: {product.brand}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    ✓ In Stock ({product.stock} units)
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight mb-3">
                  {product.name}
                </h1>

                {/* SKU & Ratings */}
                <div className="flex items-center gap-4 flex-wrap text-xs text-slate-500 mb-4">
                  <Rating value={product.rating} reviewsCount={product.reviews} size="sm" />
                  <span>•</span>
                  <span>SKU: <strong className="text-slate-800">{product.sku}</strong></span>
                  <span>•</span>
                  <span>Warranty: <strong className="text-slate-800">{product.warranty}</strong></span>
                </div>

                {/* Price */}
                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 mb-6">
                  <Price
                    amount={product.price}
                    oldAmount={product.oldPrice}
                    discountPercentage={product.discount}
                    size="xl"
                    showDiscountBadge={true}
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Prices include all applicable local VAT & taxes.
                  </p>
                </div>

                {/* Color Variants */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-5">
                    <label className="text-xs font-bold text-slate-900 block mb-2">
                      Color Selection:{' '}
                      <span className="text-primary font-normal">{selectedColor}</span>
                    </label>
                    <div className="flex items-center gap-2.5">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedColor === c.name
                              ? 'border-primary ring-2 ring-primary/20 scale-110 shadow-xs'
                              : 'border-slate-300'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        >
                          {selectedColor === c.name && (
                            <Check
                              className={`w-4 h-4 ${
                                c.hex === '#FFFFFF' || c.hex === '#F8FAFC'
                                  ? 'text-slate-900'
                                  : 'text-white'
                              }`}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Variants */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <label className="text-xs font-bold text-slate-900 block mb-2">
                      Size Selection:{' '}
                      <span className="text-primary font-normal">{selectedSize}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                            selectedSize === s
                              ? 'border-primary bg-primary text-white shadow-sm'
                              : 'border-slate-200 text-slate-700 hover:border-slate-400 bg-white'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2 mb-6">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white shrink-0 self-start sm:self-auto">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-3 hover:bg-slate-100 text-slate-700 font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 text-xs font-bold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-3 hover:bg-slate-100 text-slate-700 font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary hover:bg-primary-hover text-white py-3 px-6 rounded-xl font-bold text-xs shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>

                  {/* Buy Now */}
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-xl font-bold text-xs shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4" /> Buy Now
                  </button>

                  {/* Wishlist & Share */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`p-3 rounded-xl border transition-colors ${
                        isFavorite
                          ? 'border-rose-300 bg-rose-50 text-rose-600'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                      title="Wishlist"
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-600' : ''}`} />
                    </button>

                    <button
                      onClick={() => addToCompare(product)}
                      className={`p-3 rounded-xl border transition-colors ${
                        isCompared
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                      title="Compare"
                    >
                      <Layers className="w-5 h-5" />
                    </button>

                    <button
                      onClick={handleShare}
                      className="p-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                      title="Share link"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Bangladesh Delivery Estimator Box */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-primary" /> Delivery Estimator:
                    </span>
                    <select
                      value={selectedDivision}
                      onChange={(e) => setSelectedDivision(e.target.value)}
                      className="text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg px-2.5 py-1 outline-none"
                    >
                      {BANGLADESH_DIVISIONS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} Division
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1.5">
                    {selectedDivision === 'dhaka' ? (
                      <p className="flex items-center justify-between">
                        <span>Inside Dhaka City (Home Delivery):</span>
                        <strong className="text-slate-900">৳60 (1-2 Working Days)</strong>
                      </p>
                    ) : (
                      <p className="flex items-center justify-between">
                        <span>Outside Dhaka (Nationwide Courier):</span>
                        <strong className="text-slate-900">৳120 (3-5 Working Days)</strong>
                      </p>
                    )}
                    <p className="text-[11px] text-emerald-600 font-bold">
                      💡 Orders over ৳2,000 qualify for 100% Free Shipping!
                    </p>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center text-xs text-slate-600">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center gap-1">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-[11px]">100% Authentic</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center gap-1">
                    <Truck className="w-5 h-5 text-emerald-500" />
                    <span className="font-semibold text-[11px]">Cash on Delivery</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center gap-1">
                    <RotateCcw className="w-5 h-5 text-amber-500" />
                    <span className="font-semibold text-[11px]">7 Days Return</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center gap-1">
                    <Zap className="w-5 h-5 text-purple-500" />
                    <span className="font-semibold text-[11px]">Instant bKash</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Description, Specifications, Reviews, Shipping */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm mt-8">
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 overflow-x-auto gap-8 text-sm font-bold">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-4 transition-colors relative whitespace-nowrap ${
                activeTab === 'desc'
                  ? 'text-primary'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              Description
              {activeTab === 'desc' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 transition-colors relative whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'text-primary'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              Specifications
              {activeTab === 'specs' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 transition-colors relative whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'text-primary'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              Customer Reviews ({product.reviews})
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-4 transition-colors relative whitespace-nowrap ${
                activeTab === 'shipping'
                  ? 'text-primary'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              Shipping & Return Policy
              {activeTab === 'shipping' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>

          {/* Tab Contents */}
          <div className="pt-6">
            {activeTab === 'desc' && (
              <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
                <p>{product.description}</p>
                <p>
                  Every product shipped through BD Mart undergoes rigorous quality inspection at our central hub before dispatch to courier. We package all delicate items in customized bubble wraps and tamper-evident courier bags.
                </p>
                <h4 className="text-base font-bold text-slate-900 mt-4">Highlights:</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>Original imported or genuine local Bangladesh brand warranty</li>
                  <li>Fast dispatch within 24 hours of phone confirmation</li>
                  <li>Full open-box inspection supported before paying Cash on Delivery</li>
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border border-slate-200 rounded-xl overflow-hidden">
                  <tbody className="divide-y divide-slate-200">
                    {Object.entries(product.specifications).map(([key, value], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'}>
                        <td className="py-3 px-4 font-bold text-slate-900 w-1/3 sm:w-1/4 border-r border-slate-200">
                          {key}
                        </td>
                        <td className="py-3 px-4 text-slate-700">{value}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-200">
                        SKU Number
                      </td>
                      <td className="py-3 px-4 text-slate-700">{product.sku}</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-200">
                        Warranty Type
                      </td>
                      <td className="py-3 px-4 text-slate-700">{product.warranty}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Review Header Stats */}
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-center">
                    <div className="text-4xl font-black text-slate-900">{product.rating}</div>
                    <Rating value={product.rating} showNumber={false} size="md" />
                    <span className="text-xs text-slate-400 mt-1 block">
                      Based on {product.reviews} reviews
                    </span>
                  </div>
                  <div className="h-12 w-px bg-slate-200 hidden sm:block" />
                  <div className="flex-1 space-y-1.5 w-full">
                    {[5, 4, 3, 2, 1].map((s) => (
                      <div key={s} className="flex items-center gap-2 text-xs">
                        <span className="w-12 text-slate-600 font-semibold">{s} Star</span>
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: `${s === 5 ? 85 : s === 4 ? 12 : 3}%` }}
                          />
                        </div>
                        <span className="w-8 text-right text-slate-400 font-medium">
                          {s === 5 ? '85%' : s === 4 ? '12%' : '3%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4 divide-y divide-slate-100">
                  {productReviews.map((rev) => (
                    <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900">{rev.userName}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">
                              ✓ Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">{rev.date}</span>
                      </div>
                      <Rating value={rev.rating} size="sm" showNumber={false} />
                      <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                      <button className="text-[11px] text-slate-400 hover:text-primary flex items-center gap-1 pt-1">
                        <ThumbsUp className="w-3 h-3" /> Helpful ({rev.helpfulCount})
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
                <h4 className="text-base font-bold text-slate-900">Delivery Guidelines:</h4>
                <p>
                  <strong>Inside Dhaka City:</strong> Regular delivery charge is ৳60. Typical delivery window is 24 to 48 hours. Express same-day delivery is available upon phone request.
                </p>
                <p>
                  <strong>Outside Dhaka:</strong> Delivery charge is ৳120 across all other 63 districts. Packages are dispatched via Steadfast Courier and Pathao with live SMS tracking.
                </p>
                <h4 className="text-base font-bold text-slate-900 pt-2">Return & Refund:</h4>
                <p>
                  If you receive a defective or mismatched product, you may return it on spot to the delivery rider or claim a replacement within 7 calendar days.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-6">
              Customers Also Viewed
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
