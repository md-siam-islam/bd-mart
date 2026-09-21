import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Coupon } from '../types';
import { COUPONS } from '../data/coupons';
import { ShippingZone, calculateShippingFee } from '../data/bangladesh-geo';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shippingZone: ShippingZone;
  setShippingZone: (zone: ShippingZone) => void;
  shippingFee: number;
  appliedCoupon: Coupon | null;
  discountAmount: number;
  grandTotal: number;
  freeShippingTarget: number;
  freeShippingRemaining: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 2000;

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bdmart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [shippingZone, setShippingZone] = useState<ShippingZone>('inside_dhaka');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem('bdmart_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('bdmart_cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('bdmart_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('bdmart_coupon');
    }
  }, [appliedCoupon]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const shippingFee = items.length === 0 ? 0 : calculateShippingFee(subtotal, shippingZone);

  const freeShippingTarget = FREE_SHIPPING_THRESHOLD;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  // Calculate discount from coupon
  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.discountType === 'percentage') {
      const rawDiscount = (subtotal * appliedCoupon.value) / 100;
      discountAmount = appliedCoupon.maxDiscount ? Math.min(rawDiscount, appliedCoupon.maxDiscount) : rawDiscount;
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const grandTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  const addToCart = (product: Product, quantity: number = 1, color?: string, size?: string) => {
    const cartItemId = `${product.id}-${color || 'default'}-${size || 'default'}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            selectedColor: color,
            selectedSize: size,
            price: product.price,
            quantity
          }
        ];
      }
    });

    showToast(`Added "${product.name.slice(0, 28)}..." to cart!`, 'success');
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    const found = COUPONS.find((c) => c.code === cleanCode);

    if (!found) {
      showToast('Invalid coupon code. Try WELCOME10 or SAVE500', 'error');
      return false;
    }

    if (subtotal < found.minOrder) {
      showToast(`Coupon requires minimum order of ৳${found.minOrder.toLocaleString()}`, 'warning');
      return false;
    }

    setAppliedCoupon(found);
    showToast(`Coupon "${found.code}" applied successfully!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        shippingZone,
        setShippingZone,
        shippingFee,
        appliedCoupon,
        discountAmount,
        grandTotal,
        freeShippingTarget,
        freeShippingRemaining,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
