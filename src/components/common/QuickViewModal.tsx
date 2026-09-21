import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { X, Heart, ShoppingBag, Check, ShieldCheck, Truck } from 'lucide-react';
import { Price } from './Price';
import { Rating } from './Rating';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]?.name
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) return null;

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
            {/* Gallery Column */}
            <div className="flex flex-col gap-3">
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center">
                <img
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImage === idx ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Column */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-primary tracking-wider uppercase mb-1">
                  {product.brand}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-2">
                  {product.name}
                </h3>

                <div className="flex items-center gap-3 mb-4">
                  <Rating value={product.rating} reviewsCount={product.reviews} size="sm" />
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    In Stock ({product.stock} left)
                  </span>
                </div>

                <div className="mb-4">
                  <Price
                    amount={product.price}
                    oldAmount={product.oldPrice}
                    size="lg"
                    showDiscountBadge={true}
                  />
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 mb-5 leading-relaxed">
                  {product.description}
                </p>

                {/* Color selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-4">
                    <label className="text-xs font-bold text-slate-800 block mb-2">
                      Color: <span className="text-slate-500 font-normal">{selectedColor}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedColor === c.name ? 'border-primary scale-110 shadow-sm' : 'border-slate-200'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        >
                          {selectedColor === c.name && (
                            <Check
                              className={`w-3.5 h-3.5 ${
                                c.hex === '#FFFFFF' || c.hex === '#F8FAFC' ? 'text-slate-900' : 'text-white'
                              }`}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-5">
                    <label className="text-xs font-bold text-slate-800 block mb-2">
                      Size: <span className="text-slate-500 font-normal">{selectedSize}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                            selectedSize === s
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex gap-2.5">
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2.5 text-slate-600 hover:bg-slate-200 text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2.5 text-slate-600 hover:bg-slate-200 text-sm font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-white py-2.5 px-4 rounded-xl font-bold text-xs hover:bg-primary-hover transition-colors shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-2.5 border rounded-xl transition-colors ${
                      isFavorite
                        ? 'border-rose-300 bg-rose-50 text-rose-600'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                    title="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-600' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-slate-500" /> Cash on Delivery Available
                  </span>
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={onClose}
                    className="text-primary font-bold hover:underline"
                  >
                    View Full Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
