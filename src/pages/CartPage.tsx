import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Price } from '../components/common/Price';
import {
  Trash2,
  Plus,
  Minus,
  Heart,
  ShoppingBag,
  ArrowRight,
  Truck,
  Tag,
  CheckCircle2,
  XCircle,
  ShieldCheck
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    freeShippingTarget,
    freeShippingRemaining,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    shippingFee,
    grandTotal,
  } = useCart();

  const { toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');

  const progressPercentage = Math.min(
    100,
    Math.round(((freeShippingTarget - freeShippingRemaining) / freeShippingTarget) * 100)
  );

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const ok = applyCoupon(couponInput);
      if (ok) setCouponInput('');
    }
  };

  const handleMoveToWishlist = (item: typeof items[0]) => {
    toggleWishlist(item.product);
    removeFromCart(item.id);
  };

  if (items.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen py-12">
        <div className="container-custom max-w-lg text-center bg-white rounded-3xl p-10 border border-slate-100 shadow-sm mx-auto">
          <div className="w-20 h-20 rounded-full bg-blue-50 text-primary flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            Looks like you haven't added any products to your shopping bag yet. Explore our latest deals and top picks!
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-xs font-bold rounded-xl shadow-md shadow-primary/25 hover:bg-primary-hover transition-colors"
          >
            Start Shopping Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-6">
      <div className="container-custom">
        <Breadcrumb items={[{ label: 'Shopping Cart' }]} />

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight my-4">
          Shopping Cart ({items.reduce((s, i) => s + i.quantity, 0)} Items)
        </h1>

        {/* Free Delivery Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm mb-6">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary" />
              {freeShippingRemaining > 0 ? (
                <span>
                  Add <strong className="text-primary font-bold">৳{freeShippingRemaining.toLocaleString()}</strong> more to claim{' '}
                  <strong className="text-emerald-600 font-extrabold uppercase">Free Delivery</strong>
                </span>
              ) : (
                <span className="text-emerald-600 font-bold">
                  🎉 Free Delivery Unlocked across Bangladesh!
                </span>
              )}
            </span>
            <span className="text-slate-400 font-bold">{progressPercentage}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Layout: Cart Items Table + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List (col-span-8) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5 divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item.id} className="pt-5 first:pt-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                {/* Product Thumbnail & Details */}
                <div className="flex gap-4 items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-2xl object-cover bg-slate-50 border border-slate-100 shrink-0"
                  />
                  <div>
                    <span className="text-[11px] font-bold text-primary tracking-wider uppercase block">
                      {item.product.brand}
                    </span>
                    <Link
                      to={`/product/${item.product.slug}`}
                      className="text-sm font-bold text-slate-900 hover:text-primary transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    {(item.selectedColor || item.selectedSize) && (
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.selectedColor && <span>Color: {item.selectedColor} </span>}
                        {item.selectedSize && <span>• Size: {item.selectedSize}</span>}
                      </p>
                    )}
                    <div className="mt-1">
                      <Price amount={item.price} size="sm" />
                    </div>
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1.5 hover:bg-slate-200 text-slate-600 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1.5 hover:bg-slate-200 text-slate-600 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Total Line Price */}
                  <div className="w-24 text-right">
                    <Price amount={item.price * item.quantity} size="md" />
                  </div>

                  {/* Quick Buttons: Move to Wishlist / Remove */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMoveToWishlist(item)}
                      className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-50 transition-colors"
                      title="Move to Wishlist"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                      title="Remove from Cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4 flex items-center justify-between">
              <Link
                to="/shop"
                className="text-xs font-bold text-primary hover:underline"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary & Voucher Card (col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Coupon Box */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-primary" /> Apply Promotional Voucher
              </h3>

              {appliedCoupon ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {appliedCoupon.code} Applied
                    </span>
                    <p className="text-[11px] text-emerald-600 mt-0.5">
                      {appliedCoupon.description}
                    </p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-700 hover:text-rose-600 p-1 font-bold text-xs"
                    title="Remove coupon"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="e.g. WELCOME10, SAVE500"
                    className="flex-1 bg-slate-50 text-xs font-mono font-bold text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-primary outline-none uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <Price amount={subtotal} size="sm" />
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Estimated Delivery Fee:</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `৳${shippingFee}`}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 font-bold">
                    <span>Coupon Discount:</span>
                    <span>- ৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
                  <span className="font-extrabold text-slate-900">Grand Total:</span>
                  <Price amount={grandTotal} size="lg" />
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-xs shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Encrypted 256-bit SSL Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
