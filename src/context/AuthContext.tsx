import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, Address, Order, CartItem, PaymentMethodType, OrderStatusType } from '../types';
import { useToast } from './ToastContext';
import { UserStorageService } from '../services/userStorage';

interface RegisterParams {
  name: string;
  email: string;
  phone: string;
  password: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  orders: Order[];
  login: (
    phoneOrEmail: string,
    password?: string,
    rememberMe?: boolean
  ) => Promise<{ success: boolean; error?: string }>;
  register: (params: RegisterParams) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  changePassword: (
    currentPass: string,
    newPass: string
  ) => Promise<{ success: boolean; error?: string }>;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  createOrder: (params: {
    customer: { name: string; phone: string; email?: string };
    shippingAddress: {
      division: string;
      district: string;
      upazila: string;
      area?: string;
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
  }) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, newStatus: OrderStatusType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial realistic demo orders
const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'BDM-84920',
    date: '2026-09-15 14:30',
    customer: {
      name: 'Tanvir Ahmed',
      phone: '01712345678',
      email: 'tanvir.ahmed@example.com'
    },
    shippingAddress: {
      division: 'Dhaka',
      district: 'Dhaka (City & Suburbs)',
      upazila: 'Dhanmondi',
      fullAddress: 'House 42, Road 7/A, Dhanmondi R/A, Dhaka-1209',
      instructions: 'Please call before delivery'
    },
    items: [
      {
        id: 'c1',
        product: {
          id: 'prod-9',
          name: 'Aarong Earth Fine Cotton Embroidered Festive Panjabi',
          slug: 'aarong-fine-cotton-embroidered-panjabi',
          category: "Men's Fashion",
          categorySlug: 'mens-fashion',
          subcategory: 'Panjabi & Pajama',
          brand: 'Aarong Earth',
          price: 3250,
          rating: 4.9,
          reviews: 145,
          stock: 25,
          images: ['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80'],
          description: '',
          specifications: {},
          sku: 'ARG-PANJ-EMB-01',
          warranty: '3 Days Return',
          tags: []
        },
        selectedColor: 'Royal Navy',
        selectedSize: 'L (42)',
        price: 3250,
        quantity: 1
      },
      {
        id: 'c2',
        product: {
          id: 'prod-42',
          name: 'Aarong Handcrafted Genuine Leather Bi-Fold Wallet',
          slug: 'aarong-genuine-leather-bifold-wallet',
          category: 'Bags & Luggage',
          categorySlug: 'bags',
          subcategory: 'Leather Wallets',
          brand: 'Aarong Earth',
          price: 1450,
          rating: 4.9,
          reviews: 135,
          stock: 45,
          images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80'],
          description: '',
          specifications: {},
          sku: 'ARG-WLT-BRN',
          warranty: '',
          tags: []
        },
        selectedColor: 'Vintage Havana Brown',
        price: 1450,
        quantity: 1
      }
    ],
    subtotal: 4700,
    shippingFee: 0,
    discount: 500,
    couponCode: 'SAVE500',
    grandTotal: 4200,
    paymentMethod: 'BKASH',
    paymentStatus: 'Paid',
    orderStatus: 'Out for Delivery',
    trackingNumber: 'STEADFAST-7489201BD',
    estimatedDelivery: '17 September 2026',
    timeline: [
      { status: 'Pending', time: '15 Sep, 02:30 PM', completed: true, description: 'Order submitted online' },
      { status: 'Confirmed', time: '15 Sep, 03:15 PM', completed: true, description: 'Order verified by BD Mart operations' },
      { status: 'Processing', time: '16 Sep, 10:00 AM', completed: true, description: 'Packed at Tejgaon Central Warehouse' },
      { status: 'Shipped', time: '16 Sep, 04:45 PM', completed: true, description: 'Handed over to Steadfast Courier Hub' },
      { status: 'Out for Delivery', time: '17 Sep, 09:15 AM', completed: true, description: 'Rider is on the way to Dhanmondi' },
      { status: 'Delivered', time: 'Expected by 05:00 PM', completed: false, description: 'Package handed to recipient' }
    ]
  },
  {
    id: 'BDM-39142',
    date: '2026-09-10 11:15',
    customer: {
      name: 'Tanvir Ahmed',
      phone: '01712345678',
      email: 'tanvir.ahmed@example.com'
    },
    shippingAddress: {
      division: 'Dhaka',
      district: 'Dhaka (City & Suburbs)',
      upazila: 'Dhanmondi',
      fullAddress: 'House 42, Road 7/A, Dhanmondi R/A, Dhaka-1209'
    },
    items: [
      {
        id: 'c3',
        product: {
          id: 'prod-27',
          name: 'Khaas Food Organic Cold-Pressed Mustard Oil 1 Litre',
          slug: 'khaas-food-cold-pressed-mustard-oil-1l',
          category: 'Grocery & Essentials',
          categorySlug: 'grocery',
          subcategory: 'Mustard Oil & Ghee',
          brand: 'Khaas Food',
          price: 360,
          rating: 5.0,
          reviews: 215,
          stock: 120,
          images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80'],
          description: '',
          specifications: {},
          sku: 'KHF-MST-1L',
          warranty: '',
          tags: []
        },
        price: 360,
        quantity: 2
      }
    ],
    subtotal: 720,
    shippingFee: 60,
    discount: 0,
    grandTotal: 780,
    paymentMethod: 'COD',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    trackingNumber: 'STEADFAST-6391420BD',
    estimatedDelivery: '12 September 2026',
    timeline: [
      { status: 'Pending', time: '10 Sep, 11:15 AM', completed: true, description: 'Order submitted' },
      { status: 'Confirmed', time: '10 Sep, 11:45 AM', completed: true, description: 'Order confirmed' },
      { status: 'Processing', time: '11 Sep, 09:30 AM', completed: true, description: 'Packed & dispatched' },
      { status: 'Shipped', time: '11 Sep, 02:00 PM', completed: true, description: 'Dispatched to courier' },
      { status: 'Out for Delivery', time: '12 Sep, 10:00 AM', completed: true, description: 'Rider on the way' },
      { status: 'Delivered', time: '12 Sep, 01:25 PM', completed: true, description: 'Delivered successfully and COD collected' }
    ]
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  // Initialize user strictly from existing explicit session
  const [user, setUser] = useState<UserProfile | null>(() => {
    // Clear legacy hardcoded user session if it was auto-seeded
    try {
      localStorage.removeItem('bdmart_user');
      const session = UserStorageService.getSession();
      return session;
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('bdmart_orders');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_ORDERS;
    } catch {
      return INITIAL_DEMO_ORDERS;
    }
  });

  useEffect(() => {
    // Initialize database only. DO NOT auto-login any user!
    UserStorageService.init();
  }, []);

  useEffect(() => {
    localStorage.setItem('bdmart_orders', JSON.stringify(orders));
  }, [orders]);

  /**
   * Customer Login
   */
  const login = async (
    phoneOrEmail: string,
    password?: string,
    rememberMe = true
  ): Promise<{ success: boolean; error?: string }> => {
    if (!password) {
      // Direct quick login for demo convenience if password not supplied
      const found = UserStorageService.findByIdentifier(phoneOrEmail);
      if (found) {
        const safe = UserStorageService.toSafeProfile(found);
        setUser(safe);
        UserStorageService.saveSession(safe, rememberMe);
        showToast(`Welcome back, ${safe.name}!`, 'success');
        return { success: true };
      }
      return { success: false, error: 'User not found.' };
    }

    const res = await UserStorageService.authenticateCustomer(phoneOrEmail, password);
    if (res.success && res.user) {
      setUser(res.user);
      UserStorageService.saveSession(res.user, rememberMe);
      showToast(`Welcome back, ${res.user.name}!`, 'success');
      return { success: true };
    } else {
      return { success: false, error: res.error || 'Invalid credentials' };
    }
  };

  /**
   * Customer Registration
   */
  const register = async (params: RegisterParams): Promise<{ success: boolean; error?: string }> => {
    const res = await UserStorageService.registerCustomer(params);
    if (res.success && res.user) {
      setUser(res.user);
      UserStorageService.saveSession(res.user, true);
      showToast(`Account created successfully! Welcome to BD Mart, ${res.user.name}.`, 'success');
      return { success: true };
    } else {
      return { success: false, error: res.error || 'Failed to create account.' };
    }
  };

  /**
   * Customer Logout
   */
  const logout = () => {
    UserStorageService.clearSession();
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  /**
   * Update Profile
   */
  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    const refreshed = UserStorageService.updateProfile(user.id, updated);
    if (refreshed) {
      setUser(refreshed);
      showToast('Profile updated successfully', 'success');
    }
  };

  /**
   * Change Customer Password
   */
  const changePassword = async (
    currentPass: string,
    newPass: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'You must be signed in.' };
    const res = await UserStorageService.changePassword(user.id, currentPass, newPass);
    if (res.success) {
      showToast('Password changed successfully!', 'success');
      return { success: true };
    }
    return res;
  };

  /**
   * Add Address
   */
  const addAddress = (addressData: Omit<Address, 'id'>) => {
    if (!user) return;
    const updatedList = UserStorageService.addAddress(user.id, addressData);
    setUser({ ...user, addresses: updatedList });
    showToast('Address added to your address book', 'success');
  };

  /**
   * Update Address
   */
  const updateAddress = (id: string, updatedFields: Partial<Address>) => {
    if (!user) return;
    const updatedList = UserStorageService.updateAddress(user.id, id, updatedFields);
    setUser({ ...user, addresses: updatedList });
    showToast('Address updated successfully', 'success');
  };

  /**
   * Delete Address
   */
  const deleteAddress = (id: string) => {
    if (!user) return;
    const updatedList = UserStorageService.deleteAddress(user.id, id);
    setUser({ ...user, addresses: updatedList });
    showToast('Address removed from address book', 'info');
  };

  /**
   * Set Default Address
   */
  const setDefaultAddress = (id: string) => {
    if (!user) return;
    const updatedList = UserStorageService.setDefaultAddress(user.id, id);
    setUser({ ...user, addresses: updatedList });
    showToast('Default delivery address updated', 'success');
  };

  /**
   * Create Order
   */
  const createOrder = (params: {
    customer: { name: string; phone: string; email?: string };
    shippingAddress: {
      division: string;
      district: string;
      upazila: string;
      area?: string;
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
  }): Order => {
    const randomId = 'BDM-' + Math.floor(10000 + Math.random() * 90000);
    const trackingCode = 'STEADFAST-' + Math.floor(1000000 + Math.random() * 9000000) + 'BD';

    const newOrder: Order = {
      id: randomId,
      date: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      customer: params.customer,
      shippingAddress: params.shippingAddress,
      items: params.items,
      subtotal: params.subtotal,
      shippingFee: params.shippingFee,
      discount: params.discount,
      couponCode: params.couponCode,
      grandTotal: params.grandTotal,
      paymentMethod: params.paymentMethod,
      paymentStatus: params.paymentMethod === 'COD' ? 'Unpaid' : 'Paid',
      orderStatus: 'Confirmed',
      trackingNumber: trackingCode,
      estimatedDelivery: 'Within 2 to 3 Working Days',
      timeline: [
        {
          status: 'Pending',
          time: 'Just now',
          completed: true,
          description: 'Order placed online by customer'
        },
        {
          status: 'Confirmed',
          time: 'Just now',
          completed: true,
          description: 'Order automatically verified via BD Mart logistics engine'
        },
        {
          status: 'Processing',
          time: 'Next step',
          completed: false,
          description: 'Picking and packing in central warehouse'
        },
        {
          status: 'Shipped',
          time: 'Upcoming',
          completed: false,
          description: 'Handover to Steadfast courier hub'
        },
        {
          status: 'Out for Delivery',
          time: 'Upcoming',
          completed: false,
          description: 'Rider out for doorstep delivery'
        },
        {
          status: 'Delivered',
          time: 'Upcoming',
          completed: false,
          description: 'Customer signature and unboxing check'
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update user order count & total spent in database if logged in
    if (user) {
      const updatedCount = (user.ordersCount || 0) + 1;
      const updatedSpent = (user.totalSpent || 0) + newOrder.grandTotal;
      updateProfile({ ordersCount: updatedCount, totalSpent: updatedSpent });
    }

    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    const cleanId = orderId.trim().toUpperCase();
    return orders.find((o) => o.id.toUpperCase() === cleanId);
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatusType) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id.toUpperCase() === orderId.toUpperCase()) {
          const updatedTimeline = ord.timeline.map((item) => {
            if (item.status === newStatus) {
              return { ...item, completed: true, time: 'Updated by Admin' };
            }
            return item;
          });
          return {
            ...ord,
            orderStatus: newStatus,
            timeline: updatedTimeline,
            paymentStatus: newStatus === 'Delivered' ? 'Paid' : ord.paymentStatus
          };
        }
        return ord;
      })
    );
    showToast(`Order ${orderId} status set to "${newStatus}"`, 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        orders,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        createOrder,
        getOrderById,
        updateOrderStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
