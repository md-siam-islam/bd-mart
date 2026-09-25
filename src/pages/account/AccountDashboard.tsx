import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Price } from '../../components/common/Price';
import { validateBDMobile, checkPasswordRequirements } from '../../utils/security';
import { Order } from '../../types';
import { DEFAULT_PRODUCT_IMAGE, handleProductImageError, handleAvatarError } from '../../utils/imageFallback';
import {
  Package,
  Clock,
  CheckCircle2,
  Heart,
  MapPin,
  Settings,
  Bell,
  ArrowRight,
  LogOut,
  User,
  Truck,
  KeyRound,
  Eye,
  EyeOff,
  Check,
  X,
  PhoneCall,
  Mail,
  Calendar,
  ShieldCheck,
  Edit2,
  Award,
  Gift,
  Sparkles,
  TrendingUp,
  BarChart3,
  Zap,
  Banknote
} from 'lucide-react';

export const AccountDashboard: React.FC = () => {
  const { user, orders, logout, updateProfile, changePassword } = useAuth();
  const { wishlistCount } = useWishlist();
  const { showToast } = useToast();

  // Modals
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Edit Profile Form State
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editDob, setEditDob] = useState(user?.dateOfBirth || '');
  const [editGender, setEditGender] = useState(user?.gender || '');
  const [editAvatar, setEditAvatar] = useState(user?.avatar || '');

  // Change Password Form State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passError, setPassError] = useState('');
  const [isPassLoading, setIsPassLoading] = useState(false);

  if (!user) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 text-center">
        <div className="container-custom max-w-md bg-white p-8 rounded-3xl border border-slate-100 shadow-sm mx-auto">
          <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Please Sign In</h2>
          <p className="text-xs text-slate-500 mb-4">
            You need to be signed in to access your customer dashboard.
          </p>
          <Link
            to="/account/login"
            className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl inline-block"
          >
            Sign In Now
          </Link>
        </div>
      </div>
    );
  }

  const pendingOrders = orders.filter((o) => o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled').length;
  const deliveredOrders = orders.filter((o) => o.orderStatus === 'Delivered').length;
  const totalSpent = orders.reduce((sum, o) => sum + o.grandTotal, 0);
  const estimatedSavings = Math.round((totalSpent || 18500) * 0.15) + 500;
  const rewardPoints = Math.floor((totalSpent || 18500) / 10);

  // VIP Tier based on lifetime expenditure
  const effectiveSpent = totalSpent > 0 ? totalSpent : 18500;
  const vipTier = effectiveSpent >= 40000 ? 'Platinum VIP' : effectiveSpent >= 20000 ? 'Gold VIP' : effectiveSpent >= 8000 ? 'Silver Member' : 'Bronze Member';
  const nextTierTarget = effectiveSpent >= 40000 ? 100000 : effectiveSpent >= 20000 ? 40000 : effectiveSpent >= 8000 ? 20000 : 8000;
  const tierProgress = Math.min(100, Math.round((effectiveSpent / nextTierTarget) * 100));

  // Monthly spending breakdown
  const monthlySpending = [
    { month: 'Apr', amount: Math.round(effectiveSpent * 0.1) || 2800 },
    { month: 'May', amount: Math.round(effectiveSpent * 0.16) || 4200 },
    { month: 'Jun', amount: Math.round(effectiveSpent * 0.12) || 3100 },
    { month: 'Jul', amount: Math.round(effectiveSpent * 0.18) || 5400 },
    { month: 'Aug', amount: Math.round(effectiveSpent * 0.21) || 6800 },
    { month: 'Sep', amount: Math.round(effectiveSpent * 0.23) || 8200 },
  ];
  const maxMonthSpent = Math.max(...monthlySpending.map((m) => m.amount));
  const [hoveredMonth, setHoveredMonth] = useState<{ month: string; amount: number } | null>(null);

  const handleOpenEditProfile = () => {
    setEditName(user.name);
    setEditPhone(user.phone);
    setEditEmail(user.email);
    setEditDob(user.dateOfBirth || '');
    setEditGender(user.gender || '');
    setEditAvatar(user.avatar);
    setIsEditProfileOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const pVal = validateBDMobile(editPhone);
    if (!pVal.isValid) {
      showToast(pVal.error || 'Please provide a valid Bangladeshi mobile number', 'error');
      return;
    }

    updateProfile({
      name: editName.trim(),
      phone: pVal.normalized,
      email: editEmail.trim(),
      dateOfBirth: editDob || undefined,
      gender: (editGender as any) || undefined,
      avatar: editAvatar
    });

    setIsEditProfileOpen(false);
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');

    const reqs = checkPasswordRequirements(newPass);
    if (!Object.values(reqs).every(Boolean)) {
      setPassError('New password does not meet security requirements.');
      return;
    }

    if (newPass !== confirmNewPass) {
      setPassError('Confirm password does not match.');
      return;
    }

    setIsPassLoading(true);
    try {
      const res = await changePassword(currentPass, newPass);
      if (res.success) {
        setIsChangePasswordOpen(false);
        setCurrentPass('');
        setNewPass('');
        setConfirmNewPass('');
      } else {
        setPassError(res.error || 'Failed to update password.');
      }
    } catch {
      setPassError('An error occurred. Please try again.');
    } finally {
      setIsPassLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom max-w-5xl">
        <Breadcrumb items={[{ label: 'My Account' }]} />

        {/* Customer Profile Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm my-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                onError={handleAvatarError}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-slate-50 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white" title="Account Active">
                <Check className="w-3 h-3" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {user.name}
                </h1>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase">
                  {user.status || 'Active'}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-500 mt-1.5">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <PhoneCall className="w-3.5 h-3.5 text-primary" /> +880 {user.phone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {user.email}
                </span>
                {user.gender && (
                  <>
                    <span>•</span>
                    <span className="capitalize">{user.gender}</span>
                  </>
                )}
                <span>•</span>
                <span>Member since {user.createdAt}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleOpenEditProfile}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit Profile
            </button>
            <button
              onClick={() => setIsChangePasswordOpen(true)}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5" /> Password
            </button>
            <button
              onClick={logout}
              className="px-4 py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-semibold block">Total Orders</span>
              <strong className="text-xl font-black text-slate-900">{orders.length}</strong>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-semibold block">In Delivery</span>
              <strong className="text-xl font-black text-slate-900">{pendingOrders}</strong>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-semibold block">Delivered</span>
              <strong className="text-xl font-black text-slate-900">{deliveredOrders}</strong>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-semibold block">Saved Wishlist</span>
              <strong className="text-xl font-black text-slate-900">{wishlistCount}</strong>
            </div>
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link
            to="/account/orders"
            className="p-5 bg-white rounded-2xl border border-slate-200/80 hover:border-primary/40 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">
                  My Orders
                </h4>
                <p className="text-[11px] text-slate-400">Order tracking & item invoices</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/account/addresses"
            className="p-5 bg-white rounded-2xl border border-slate-200/80 hover:border-primary/40 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">
                  Address Book
                </h4>
                <p className="text-[11px] text-slate-400">{user.addresses.length} destinations saved</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/wishlist"
            className="p-5 bg-white rounded-2xl border border-slate-200/80 hover:border-primary/40 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">
                  My Wishlist
                </h4>
                <p className="text-[11px] text-slate-400">{wishlistCount} saved favorites</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ============================================================ */}
        {/* SHOPPING ANALYTICS & VIP CLUB SECTION */}
        {/* ============================================================ */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mb-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-100 text-[#FF5722] border border-orange-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#FF5722]" /> VIP Member Rewards
                </span>
                <span className="text-xs text-slate-400">• Real-time expenditure tracker</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>Shopping Analytics & Spending Insights</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Monitor your Bangladesh shopping expenditure, earned loyalty reward points, and VIP privileges.
              </p>
            </div>

            {/* VIP Tier Badge */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 shrink-0">
              <Award className="w-5 h-5 text-[#FF9800]" />
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block leading-none">Club Tier</span>
                <span className="text-xs font-black text-slate-900 leading-tight block">{vipTier}</span>
              </div>
            </div>
          </div>

          {/* 4 Analytics Highlight Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-7">
            {/* Total Spent */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <div className="flex items-center justify-between text-slate-400 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider">Lifetime Spent</span>
                <Banknote className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <strong className="text-lg font-black text-slate-900 block">
                ৳ {effectiveSpent.toLocaleString('en-IN')}
              </strong>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
                Across {orders.length > 0 ? orders.length : 3} verified orders
              </span>
            </div>

            {/* Total Savings */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <div className="flex items-center justify-between text-slate-400 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider">Estimated Savings</span>
                <TrendingUp className="w-3.5 h-3.5 text-[#FF5722]" />
              </div>
              <strong className="text-lg font-black text-[#FF5722] block">
                ৳ {estimatedSavings.toLocaleString('en-IN')}
              </strong>
              <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                Via promo prices & vouchers
              </span>
            </div>

            {/* Loyalty Points */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <div className="flex items-center justify-between text-slate-400 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider">Reward Points</span>
                <Gift className="w-3.5 h-3.5 text-[#2196F3]" />
              </div>
              <strong className="text-lg font-black text-[#2196F3] block">
                {rewardPoints.toLocaleString()} Pts
              </strong>
              <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                = ৳ {Math.floor(rewardPoints / 2)} instant discount
              </span>
            </div>

            {/* Next Tier Progress */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <div className="flex items-center justify-between text-slate-400 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider">Tier Progress</span>
                <Zap className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <strong className="text-lg font-black text-slate-900 block">
                {tierProgress}%
              </strong>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1.5">
                <div
                  className="h-full bg-gradient-to-r from-[#FF9800] to-[#FF5722] rounded-full"
                  style={{ width: `${tierProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Dual Panel: Monthly Expenditure Graph + VIP Privileges */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Monthly Expenditure Bar Chart (7 Cols) */}
            <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-50/60 border border-slate-200/70 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-[#FF5722]" /> Monthly Purchase Trend
                  </h4>
                  <p className="text-[11px] text-slate-400">Your shopping expenditure over the last 6 months</p>
                </div>
                {hoveredMonth ? (
                  <span className="text-xs font-black text-[#FF5722] bg-white px-2.5 py-1 rounded-lg border border-orange-200 shadow-2xs">
                    {hoveredMonth.month}: ৳{hoveredMonth.amount.toLocaleString('en-IN')}
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400">Hover bar for details</span>
                )}
              </div>

              {/* Responsive SVG Bar Chart */}
              <div className="pt-2">
                <div className="grid grid-cols-6 gap-3 items-end h-32 px-2">
                  {monthlySpending.map((item, idx) => {
                    const heightPct = Math.round((item.amount / maxMonthSpent) * 100);
                    const isHovered = hoveredMonth?.month === item.month;
                    return (
                      <div
                        key={idx}
                        className="flex flex-col items-center gap-1.5 h-full justify-end cursor-pointer group"
                        onMouseEnter={() => setHoveredMonth(item)}
                        onMouseLeave={() => setHoveredMonth(null)}
                      >
                        <span
                          className={`text-[9px] font-mono transition-opacity ${
                            isHovered ? 'opacity-100 font-bold text-[#FF5722]' : 'opacity-0 group-hover:opacity-100 text-slate-500'
                          }`}
                        >
                          ৳{Math.round(item.amount / 1000)}k
                        </span>
                        <div className="w-full bg-slate-200/70 rounded-t-lg h-full max-h-24 flex items-end overflow-hidden">
                          <div
                            className={`w-full rounded-t-lg transition-all duration-300 ${
                              isHovered
                                ? 'bg-[#FF5722] shadow-sm'
                                : 'bg-gradient-to-t from-orange-400 to-[#FF5722] group-hover:from-orange-500 group-hover:to-[#E64A19]'
                            }`}
                            style={{ height: `${heightPct}%` }}
                          />
                        </div>
                        <span
                          className={`text-[10px] font-semibold transition-colors ${
                            isHovered ? 'text-[#FF5722] font-black' : 'text-slate-500'
                          }`}
                        >
                          {item.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* VIP Club Perks & Category Preferences (5 Cols) */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-50/60 border border-slate-200/70 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                  <Award className="w-4 h-4 text-[#FF9800]" /> Unlocked VIP Privileges
                </h4>
                <p className="text-[11px] text-slate-400 mb-3">Active member benefits on BD Mart</p>

                <ul className="space-y-2 text-xs">
                  <li className="flex items-center gap-2 text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Free express delivery on orders over ৳1,500</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>5% VIP points cashback on all festive categories</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Priority hotline assistance & 7-day hassle-free returns</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>৳1,000 birthday gift voucher code</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-semibold">Shopping Focus:</span>
                <span className="font-bold text-[#FF5722]">Electronics & Women's Fashion</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Overview */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Purchase History</h3>
              <p className="text-xs text-slate-400">Doorstep delivery status and Steadfast courier sync</p>
            </div>
            <Link to="/account/orders" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              <span>View All ({orders.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <Package className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-xs">You haven't placed any orders yet.</p>
              <Link to="/shop" className="mt-3 inline-block px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 3).map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 bg-slate-50/70 hover:bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                      {ord.items[0]?.product?.images?.[0] ? (
                        <img
                          src={ord.items[0].product.images[0]}
                          alt="Order preview"
                          onError={handleProductImageError}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-6 h-6 text-slate-400" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 font-mono text-sm">{ord.id}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            ord.orderStatus === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ord.orderStatus === 'Cancelled'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {ord.orderStatus}
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        {ord.date} • {ord.items.length} item(s) • Paid via {ord.paymentMethod} ({ord.paymentStatus})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <Price amount={ord.grandTotal} size="sm" />
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(ord)}
                      className="px-3.5 py-1.5 bg-white border border-slate-200 hover:border-primary text-slate-700 hover:text-primary font-bold rounded-xl text-xs transition-colors shadow-2xs"
                    >
                      View Details
                    </button>
                    <Link
                      to={`/order-tracking?id=${ord.id}`}
                      className="px-3.5 py-1.5 bg-primary text-white hover:bg-primary-hover font-bold rounded-xl text-xs transition-colors shadow-2xs"
                    >
                      Track
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL: Edit Profile */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <h3 className="text-base font-black text-slate-900">Edit Customer Profile</h3>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-semibold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Bangladesh Mobile</label>
                  <div className="flex items-center">
                    <span className="bg-slate-100 px-2.5 py-2.5 rounded-l-xl border border-r-0 border-slate-200 text-[11px] font-bold text-slate-600">
                      +880
                    </span>
                    <input
                      type="tel"
                      required
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="flex-1 bg-slate-50 px-3 py-2.5 rounded-r-xl border border-slate-200 outline-none focus:border-primary font-semibold text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-semibold text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={editDob}
                    onChange={(e) => setEditDob(e.target.value)}
                    className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium text-slate-700"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Gender</label>
                  <select
                    value={editGender}
                    onChange={(e) => setEditGender(e.target.value)}
                    className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium text-slate-700"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Change Password */}
      {isChangePasswordOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <h3 className="text-base font-black text-slate-900">Change Account Password</h3>
              <button
                onClick={() => setIsChangePasswordOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {passError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">
                {passError}
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    required
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full bg-slate-50 px-3.5 py-2.5 pr-10 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    required
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Min 8 chars with upper, lower, number, symbol"
                    className="w-full bg-slate-50 px-3.5 py-2.5 pr-10 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmNewPass}
                  onChange={(e) => setConfirmNewPass(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsChangePasswordOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPassLoading}
                  className="px-5 py-2 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white rounded-xl font-bold transition-colors shadow-sm"
                >
                  {isPassLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Order Details
                </span>
                <h3 className="text-lg font-black text-slate-900 font-mono">
                  {selectedOrder.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-xs">
              {/* Status and Courier */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl">
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold">Status</span>
                  <span className="font-extrabold text-emerald-600">{selectedOrder.orderStatus}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold">Payment</span>
                  <span className="font-extrabold text-slate-800">{selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold">Courier</span>
                  <span className="font-bold text-slate-800">{selectedOrder.trackingNumber || 'Steadfast'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold">Placed On</span>
                  <span className="font-bold text-slate-800">{selectedOrder.date}</span>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="font-bold text-slate-800 mb-3">Purchased Items ({selectedOrder.items.length})</h4>
                <div className="space-y-2 border border-slate-100 rounded-2xl p-3 bg-slate-50/50">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images?.[0] || DEFAULT_PRODUCT_IMAGE}
                          alt={item.product.name}
                          onError={handleProductImageError}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{item.product.name}</p>
                          <p className="text-[11px] text-slate-400">
                            Qty: {item.quantity} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''}
                          </p>
                        </div>
                      </div>
                      <Price amount={item.price * item.quantity} size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Destination */}
              <div className="p-4 bg-slate-50 rounded-2xl">
                <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" /> Delivery Address
                </h4>
                <p className="text-slate-600 font-medium">
                  {selectedOrder.shippingAddress.fullAddress}, {selectedOrder.shippingAddress.upazila}, {selectedOrder.shippingAddress.district}, {selectedOrder.shippingAddress.division}
                </p>
                {selectedOrder.shippingAddress.instructions && (
                  <p className="text-[11px] text-slate-400 mt-1 italic">
                    Note: "{selectedOrder.shippingAddress.instructions}"
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <Price amount={selectedOrder.subtotal} size="sm" />
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Delivery Fee</span>
                  <span>{selectedOrder.shippingFee === 0 ? 'FREE' : `৳${selectedOrder.shippingFee}`}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount {selectedOrder.couponCode ? `(${selectedOrder.couponCode})` : ''}</span>
                    <span>-৳{selectedOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-100">
                  <span>Grand Total</span>
                  <Price amount={selectedOrder.grandTotal} size="md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
