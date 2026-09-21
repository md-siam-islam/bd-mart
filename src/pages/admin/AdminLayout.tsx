import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Logo } from '../../components/common/Logo';
import {
  LayoutDashboard,
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Layers,
  Tag,
  MessageSquare,
  Settings,
  Store,
  Menu,
  X,
  LogOut,
  ShieldCheck,
  Home,
  ArrowRight,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { admin, adminLogout } = useAdminAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Analytics & Reports', path: '/admin/analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Products', path: '/admin/products', icon: <Package className="w-4 h-4" /> },
    { label: 'Orders', path: '/admin/orders', icon: <ShoppingCart className="w-4 h-4" /> },
    { label: 'Customers', path: '/admin/customers', icon: <Users className="w-4 h-4" /> },
    { label: 'Categories', path: '/admin/categories', icon: <Layers className="w-4 h-4" /> },
    { label: 'Coupons', path: '/admin/coupons', icon: <Tag className="w-4 h-4" /> },
    { label: 'Reviews', path: '/admin/reviews', icon: <MessageSquare className="w-4 h-4" /> },
    { label: 'Store Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Admin Bar */}
      <header className="bg-slate-900 text-white h-16 px-4 sm:px-6 flex items-center justify-between border-b border-slate-800 z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400 cursor-pointer"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Logo variant="admin" size="sm" showTagline={false} />
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Prominent Back to Storefront Button (Visible on all screen sizes) */}
          <Link
            to="/"
            className="flex items-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] text-white px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-sm transition-all hover:scale-105 active:scale-95"
            title="Return to Public Website / Storefront"
          >
            <Store className="w-4 h-4" />
            <span className="inline">Visit Website</span>
          </Link>

          {/* Admin User Info & Sign Out */}
          <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-800">
            <img
              src={admin?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&q=80'}
              alt={admin?.name || 'Administrator'}
              className="w-8 h-8 rounded-full object-cover border border-slate-700 bg-slate-800"
            />
            <div className="hidden sm:block text-left text-xs">
              <span className="font-bold text-white block leading-tight">
                {admin?.name || 'Administrator'}
              </span>
              <span className="text-[10px] text-amber-400 font-semibold">
                {admin?.role || 'Super Admin'}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Sign Out from Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container: Sidebar + Outlet */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-16 left-0 w-64 bg-white border-r border-slate-200 z-20 flex flex-col justify-between transition-transform duration-200 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-4 space-y-1">
            {/* Quick Live Storefront Card in Sidebar */}
            <div className="p-3 mb-3 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/80 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FF5722] text-white flex items-center justify-center shadow-xs">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 block leading-tight">Live Store</span>
                  <span className="text-[10px] text-slate-500 block leading-tight">Go to homepage</span>
                </div>
              </div>
              <Link
                to="/"
                className="px-2.5 py-1 bg-white hover:bg-slate-50 text-[#FF5722] border border-orange-200 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <span>Back</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Store Administration
            </div>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="p-4 border-t border-slate-100">
            <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 space-y-1">
              <p className="font-bold text-slate-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> BD Mart Logistics
              </p>
              <p className="text-emerald-600 font-semibold">● Steadfast Courier: Connected</p>
              <p className="text-emerald-600 font-semibold">● bKash Tokenized: Active</p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
