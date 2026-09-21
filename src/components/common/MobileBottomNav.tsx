import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Layers, Search, Heart, User } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const MobileBottomNav: React.FC = () => {
  const { wishlistCount } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { isAdminAuthenticated } = useAdminAuth();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0E131F]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-lg transition-colors duration-200">
      <div className="grid grid-cols-5 items-center text-center">
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 text-[11px] font-semibold transition-colors relative ${
              isActive
                ? 'text-[#FF5722] font-black after:content-[""] after:absolute after:-top-1.5 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-[#FF5722] after:rounded-full'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </NavLink>

        {/* Categories */}
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 text-[11px] font-semibold transition-colors relative ${
              isActive
                ? 'text-[#FF5722] font-black after:content-[""] after:absolute after:-top-1.5 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-[#FF5722] after:rounded-full'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`
          }
        >
          <Layers className="w-5 h-5" />
          <span>Shop All</span>
        </NavLink>

        {/* Search */}
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 text-[11px] font-semibold transition-colors relative ${
              isActive
                ? 'text-[#FF5722] font-black after:content-[""] after:absolute after:-top-1.5 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-[#FF5722] after:rounded-full'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`
          }
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </NavLink>

        {/* Wishlist */}
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 text-[11px] font-semibold transition-colors relative ${
              isActive
                ? 'text-[#FF5722] font-black after:content-[""] after:absolute after:-top-1.5 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-[#FF5722] after:rounded-full'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`
          }
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span>Wishlist</span>
        </NavLink>

        {/* Account / Admin / Sign In */}
        <NavLink
          to={isAdminAuthenticated ? '/admin' : (isAuthenticated ? '/account' : '/account/login')}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 text-[11px] font-semibold transition-colors relative ${
              isActive
                ? 'text-[#FF5722] font-black after:content-[""] after:absolute after:-top-1.5 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-[#FF5722] after:rounded-full'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`
          }
        >
          <User className="w-5 h-5" />
          <span>{isAdminAuthenticated ? 'Admin' : (isAuthenticated ? 'Account' : 'Sign In')}</span>
        </NavLink>
      </div>
    </div>
  );
};
