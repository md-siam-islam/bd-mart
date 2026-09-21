import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Price } from './Price';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingRemaining,
    freeShippingTarget,
  } = useCart();

  const navigate = useNavigate();

  const progressPercentage = Math.min(
    100,
    Math.round(((freeShippingTarget - freeShippingRemaining) / freeShippingTarget) * 100)
  );

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Shopping Cart ({items.reduce((s, i) => s + i.quantity, 0)})
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="bg-slate-50 p-3.5 sm:p-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-semibold mb-2">
                  <Truck className="w-4 h-4 text-primary" />
                  {freeShippingRemaining > 0 ? (
                    <span>
                      Add <strong className="text-primary">৳{freeShippingRemaining.toLocaleString()}</strong> more for{' '}
                      <span className="text-emerald-600 uppercase font-bold">Free Delivery</span>
                    </span>
                  ) : (
                    <span className="text-emerald-600 font-bold">
                      🎉 Congratulations! You have unlocked Free Nationwide Delivery!
                    </span>
                  )}
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-slate-100">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mb-2">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="text-base font-semibold text-slate-700">Your cart is currently empty</p>
                    <p className="text-xs text-slate-400 max-w-xs">
                      Discover our Eid collections, gadgets, and authentic lifestyle goods with fast COD delivery.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary-hover transition-colors shadow-sm"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-xl object-cover border border-slate-100 bg-slate-50 shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              to={`/product/${item.product.slug}`}
                              onClick={() => setIsCartOpen(false)}
                              className="text-sm font-semibold text-slate-800 line-clamp-2 hover:text-primary transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {(item.selectedColor || item.selectedSize) && (
                            <div className="text-xs text-slate-500 mt-1 flex gap-2">
                              {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                              {item.selectedSize && <span>• Size: {item.selectedSize}</span>}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <Price amount={item.price * item.quantity} size="sm" />

                          {/* Quantity selector */}
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary & CTAs */}
              {items.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-slate-100 bg-white space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Subtotal:</span>
                    <Price amount={subtotal} size="md" />
                  </div>
                  <p className="text-xs text-slate-400">
                    Shipping & taxes calculated dynamically at checkout.
                  </p>

                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <Link
                      to="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-3 px-4 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      View Cart
                    </Link>

                    <button
                      onClick={handleCheckoutClick}
                      className="w-full py-3 px-4 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-hover transition-colors shadow-md shadow-primary/20 flex items-center justify-center gap-1.5"
                    >
                      Checkout <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
