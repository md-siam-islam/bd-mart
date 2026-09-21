// Core TypeScript Definitions for BD Mart E-Commerce Platform

export interface ProductVariant {
  id: string;
  sku: string;
  color?: {
    name: string;
    hex: string;
  };
  size?: string;
  price?: number;
  stock: number;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  brand: string;
  price: number;
  oldPrice?: number;
  discount?: number; // e.g. 20 for 20%
  rating: number;
  reviews: number;
  stock: number;
  images: string[];
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  description: string;
  shortDescription?: string;
  specifications: Record<string, string>;
  sku: string;
  warranty: string;
  tags: string[];
  featured?: boolean;
  bestSeller?: boolean;
  flashSale?: boolean;
  newArrival?: boolean;
  variants?: ProductVariant[];
}

export interface Category {
  id: string;
  name: string;
  nameBn?: string;
  slug: string;
  image: string;
  icon?: string;
  productCount: number;
  subcategories: string[];
  featured?: boolean;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  productCount: number;
  isPopular?: boolean;
}

export interface CartItem {
  id: string; // Unique cart item key (productId + variantId)
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
  price: number;
  quantity: number;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  altPhone?: string;
  division: string;
  district: string;
  upazila: string;
  area?: string;
  fullAddress: string;
  postalCode?: string;
  addressType: 'Home' | 'Office';
  isDefault: boolean;
}

export type PaymentMethodType = 'COD' | 'BKASH' | 'NAGAD' | 'ROCKET' | 'CARD';

export type OrderStatusType = 
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Refunded';

export interface Order {
  id: string; // e.g. "BDM-84920"
  date: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  shippingAddress: {
    division: string;
    district: string;
    upazila: string;
    fullAddress: string;
    instructions?: string;
  };
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  couponCode?: string;
  grandTotal: number;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'Paid' | 'Unpaid';
  orderStatus: OrderStatusType;
  trackingNumber: string;
  estimatedDelivery: string;
  timeline: {
    status: OrderStatusType;
    time: string;
    completed: boolean;
    description: string;
  }[];
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  maxDiscount?: number;
  description: string;
  expiryDate: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  readTime: string;
  tags: string[];
}

export interface CustomerReview {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  images?: string[];
  helpfulCount: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  addresses: Address[];
  createdAt: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  status: 'active' | 'deactivated';
  ordersCount?: number;
  totalSpent?: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Store Manager' | 'Logistics Admin';
  avatar: string;
  createdAt: string;
  lastLogin?: string;
}

export interface StoredUserAccount extends UserProfile {
  passwordHash: string;
  salt: string;
}

export interface StoredAdminAccount extends AdminUser {
  passwordHash: string;
  salt: string;
}
