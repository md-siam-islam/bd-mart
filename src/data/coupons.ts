import type { Coupon } from '../types';

export const COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    value: 10,
    minOrder: 1000,
    maxDiscount: 300,
    description: 'Get 10% off (up to ৳300) on your first purchase over ৳1,000',
    expiryDate: '2026-12-31'
  },
  {
    code: 'SAVE500',
    discountType: 'fixed',
    value: 500,
    minOrder: 3500,
    description: 'Flat ৳500 discount on orders above ৳3,500',
    expiryDate: '2026-12-31'
  },
  {
    code: 'FLASH20',
    discountType: 'percentage',
    value: 20,
    minOrder: 2000,
    maxDiscount: 600,
    description: 'Exclusive 20% off (up to ৳600) on Flash Sale purchases',
    expiryDate: '2026-12-31'
  },
  {
    code: 'EID2026',
    discountType: 'fixed',
    value: 250,
    minOrder: 1500,
    description: 'Special Eid Festive Voucher: ৳250 off on orders over ৳1,500',
    expiryDate: '2026-12-31'
  }
];
