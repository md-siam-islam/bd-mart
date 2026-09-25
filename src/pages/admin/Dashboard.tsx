import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserStorageService } from '../../services/userStorage';
import { PRODUCTS } from '../../data/products';
import { Price } from '../../components/common/Price';
import { UserProfile, OrderStatusType } from '../../types';
import {
  Banknote,
  ShoppingCart,
  Users,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  Truck,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calendar,
  BarChart3,
  LayoutDashboard,
  Store
} from 'lucide-react';
import { handleAvatarError } from '../../utils/imageFallback';
import { AdminAnalyticsPage } from './AdminAnalyticsPage';

export const AdminDashboard: React.FC = () => {
  const { orders, updateOrderStatus } = useAuth();
  const [customers, setCustomers] = useState<UserProfile[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics'>('overview');

  useEffect(() => {
    UserStorageService.init().then(() => {
      const all = UserStorageService.getAllUsers();
      setCustomers(all.map((u) => UserStorageService.toSafeProfile(u)));
    });
  }, []);

  // Calculated metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.grandTotal, 0);
  const pendingOrders = orders.filter(
    (o) => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed' || o.orderStatus === 'Processing'
  ).length;
  const completedOrders = orders.filter((o) => o.orderStatus === 'Delivered').length;
  const cancelledOrders = orders.filter((o) => o.orderStatus === 'Cancelled').length;

  return (
    <div className="space-y-8">
      {/* Top Header with Tab Switcher & Return to Storefront */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {activeTab === 'overview' ? 'Dashboard Overview' : 'Business Analytics & Insights'}
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {activeTab === 'overview'
              ? 'Real-time operations metrics across orders, registered customers, catalog items, and Bangladesh revenue.'
              : 'Interactive revenue trajectory curves, orders fulfillment health, and category revenue performance.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Sub-tab Switcher: Overview vs Analytics */}
          <div className="bg-slate-200/80 p-1 rounded-2xl flex items-center gap-1 text-xs font-bold shadow-inner">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-[#FF5722] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Analytics & Graphs</span>
            </button>
          </div>

          {/* Visit Storefront Return Button */}
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/80 rounded-xl text-xs font-bold shadow-2xs hover:shadow-xs transition-all"
            title="Return to Public Storefront"
          >
            <Store className="w-4 h-4 text-[#FF5722]" />
            <span>Storefront</span>
          </Link>

          <Link
            to="/admin/products"
            className="px-4 py-2 bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            + Add Product
          </Link>
        </div>
      </div>

      {/* Conditionally Render Analytics View or Overview View */}
      {activeTab === 'analytics' ? (
        <AdminAnalyticsPage />
      ) : (
        <>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase">Total Revenue</span>
            <Banknote className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-lg font-black text-slate-900">
            ৳{totalRevenue.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center mt-1">
            <ArrowUpRight className="w-3 h-3" /> +18.4% month
          </span>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase">Total Orders</span>
            <ShoppingCart className="w-4 h-4 text-primary" />
          </div>
          <div className="text-lg font-black text-slate-900">{orders.length}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Lifetime volume</span>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase">Pending Orders</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-lg font-black text-amber-600">{pendingOrders}</div>
          <span className="text-[10px] text-amber-600 font-semibold mt-1 block">Awaiting delivery</span>
        </div>

        {/* Completed Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-lg font-black text-emerald-600">{completedOrders}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Delivered & verified</span>
        </div>

        {/* Cancelled Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase">Cancelled</span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-lg font-black text-rose-600">{cancelledOrders}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Returned/cancelled</span>
        </div>

        {/* Total Customers */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase">Total Customers</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-lg font-black text-slate-900">{customers.length}</div>
          <span className="text-[10px] text-purple-600 font-bold mt-1 block">Registered in DB</span>
        </div>
      </div>

      {/* Dual Tables: Recent Orders & Recent Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Orders</h2>
              <p className="text-xs text-slate-400">Order timeline and payment statuses</p>
            </div>
            <Link to="/admin/orders" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              <span>Manage Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider font-semibold">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80">
                    <td className="py-3 font-mono font-bold text-primary">{ord.id}</td>
                    <td className="py-3">
                      <p className="font-bold text-slate-900">{ord.customer.name}</p>
                      <p className="text-[11px] text-slate-400">{ord.customer.phone}</p>
                    </td>
                    <td className="py-3 font-bold text-slate-900">
                      ৳{ord.grandTotal.toLocaleString()}
                    </td>
                    <td className="py-3">
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
                    </td>
                    <td className="py-3 text-right">
                      {ord.orderStatus !== 'Delivered' && ord.orderStatus !== 'Cancelled' ? (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'Shipped')}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-primary hover:text-white rounded-lg text-[10px] font-bold text-slate-700 transition-colors"
                        >
                          Dispatch
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-semibold">Settled</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Customers (1 Column) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Customers</h2>
              <p className="text-xs text-slate-400">Newly registered shoppers</p>
            </div>
            <Link to="/admin/customers" className="text-xs font-bold text-primary hover:underline">
              View All →
            </Link>
          </div>

          <div className="space-y-3.5">
            {customers.slice(0, 5).map((cust) => (
              <div key={cust.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img
                    src={cust.avatar}
                    alt={cust.name}
                    onError={handleAvatarError}
                    className="w-9 h-9 rounded-xl object-cover border border-slate-200 bg-slate-100 shrink-0"
                  />
                  <div>
                    <p className="font-bold text-slate-900 leading-tight">{cust.name}</p>
                    <p className="text-[11px] text-slate-400">+880 {cust.phone}</p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                    cust.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {cust.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
};
