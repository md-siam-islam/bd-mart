import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { CATEGORIES } from '../../data/categories';
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  Heart,
  User,
  ChevronRight,
  Flame,
  PhoneCall,
  MapPin,
  Sparkles,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

export const MobileHeader: React.FC = () => {
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="lg:hidden w-full bg-white dark:bg-[#0E131F] z-40 relative transition-colors duration-200">
      {/* Top Banner */}
      <div className="bg-slate-900 dark:bg-slate-950 text-slate-300 text-[11px] py-1.5 px-3 text-center font-medium border-b border-slate-800 dark:border-slate-900">
        Free Delivery over ৳2,000 | Cash on Delivery
      </div>

      {/* Main Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
        {/* Left: Hamburger Menu */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 -ml-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          aria-label="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Center: Brand Logo */}
        <Logo size="sm" showTagline={false} />

        {/* Right: Theme, User / Auth, Search & Cart buttons */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          <Link
            to={isAuthenticated ? '/account' : '/account/login'}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center"
            title={isAuthenticated ? 'My Account' : 'Sign In'}
          >
            {isAuthenticated && user ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-6 h-6 rounded-full object-cover border border-primary"
              />
            ) : (
              <User className="w-5 h-5 text-slate-700 dark:text-slate-200" />
            )}
          </Link>

          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 -mr-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 relative cursor-pointer"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Search Input on Mobile */}
      {isSearchOpen && (
        <div className="p-3 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products in Bangladesh..."
              className="w-full bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 rounded-xl pl-10 pr-20 py-2.5 border border-slate-300 dark:border-slate-700 focus:border-primary outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            <button
              type="submit"
              className="absolute right-1.5 px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 max-w-xs w-full bg-white dark:bg-[#0E131F] text-slate-900 dark:text-slate-100 shadow-2xl z-10 flex flex-col transition-colors duration-200"
            >
              {/* Drawer Header */}
              <div className="p-4 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between border-b border-slate-800 dark:border-slate-900">
                <Logo size="sm" variant="white" showTagline={false} />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Account Section */}
                {isAuthenticated && user ? (
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-xl object-cover border border-primary/20"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user.name}</p>
                        <Link
                          to="/account"
                          onClick={() => setIsMenuOpen(false)}
                          className="text-[11px] text-primary font-bold hover:underline"
                        >
                          Customer Dashboard →
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 text-center">
                      Welcome to BD Mart
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/account/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="py-2.5 px-3 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl text-center shadow-xs"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/account/register"
                        onClick={() => setIsMenuOpen(false)}
                        className="py-2.5 px-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl text-center shadow-xs shadow-primary/25"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </div>
                )}

                {/* Theme Selector Row */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Theme</span>
                  <ThemeToggle variant="segmented" />
                </div>

                {/* Primary Navigation with Active Page Indicators */}
                <div className="space-y-1">
                  <Link
                    to="/"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-sm transition-colors ${
                      isActive('/')
                        ? 'bg-[#FF5722]/10 dark:bg-[#FF5722]/20 text-[#FF5722] dark:text-[#FF5722] font-black border-l-4 border-[#FF5722]'
                        : 'font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive('/') && <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />}
                      Home
                    </span>
                    <ChevronRight className={`w-4 h-4 ${isActive('/') ? 'text-[#FF5722]' : 'text-slate-400'}`} />
                  </Link>

                  <Link
                    to="/shop"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-sm transition-colors ${
                      isActive('/shop')
                        ? 'bg-[#FF5722]/10 dark:bg-[#FF5722]/20 text-[#FF5722] dark:text-[#FF5722] font-black border-l-4 border-[#FF5722]'
                        : 'font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive('/shop') && <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />}
                      Shop All Products
                    </span>
                    <ChevronRight className={`w-4 h-4 ${isActive('/shop') ? 'text-[#FF5722]' : 'text-slate-400'}`} />
                  </Link>

                  <Link
                    to="/flash-sale"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-sm transition-colors ${
                      isActive('/flash-sale')
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 font-black border-l-4 border-rose-600'
                        : 'font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 fill-rose-600" /> Flash Sale
                    </span>
                    <span className="bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-[10px] px-1.5 py-0.5 rounded font-bold">
                      HOT
                    </span>
                  </Link>

                  <Link
                    to="/new-arrivals"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-sm transition-colors ${
                      isActive('/new-arrivals')
                        ? 'bg-[#FF5722]/10 dark:bg-[#FF5722]/20 text-[#FF5722] dark:text-[#FF5722] font-black border-l-4 border-[#FF5722]'
                        : 'font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive('/new-arrivals') && <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />}
                      New Arrivals
                    </span>
                    <ChevronRight className={`w-4 h-4 ${isActive('/new-arrivals') ? 'text-[#FF5722]' : 'text-slate-400'}`} />
                  </Link>

                  <Link
                    to="/best-sellers"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-sm transition-colors ${
                      isActive('/best-sellers')
                        ? 'bg-[#FF5722]/10 dark:bg-[#FF5722]/20 text-[#FF5722] dark:text-[#FF5722] font-black border-l-4 border-[#FF5722]'
                        : 'font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive('/best-sellers') && <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />}
                      Best Sellers
                    </span>
                    <ChevronRight className={`w-4 h-4 ${isActive('/best-sellers') ? 'text-[#FF5722]' : 'text-slate-400'}`} />
                  </Link>

                  <Link
                    to="/deals"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-sm transition-colors ${
                      isActive('/deals')
                        ? 'bg-[#FF5722]/10 dark:bg-[#FF5722]/20 text-[#FF5722] dark:text-[#FF5722] font-black border-l-4 border-[#FF5722]'
                        : 'font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive('/deals') && <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />}
                      Deals & Offers
                    </span>
                    <ChevronRight className={`w-4 h-4 ${isActive('/deals') ? 'text-[#FF5722]' : 'text-slate-400'}`} />
                  </Link>

                  <Link
                    to="/blog"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-sm transition-colors ${
                      isActive('/blog')
                        ? 'bg-[#FF5722]/10 dark:bg-[#FF5722]/20 text-[#FF5722] dark:text-[#FF5722] font-black border-l-4 border-[#FF5722]'
                        : 'font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive('/blog') && <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />}
                      Blog Articles
                    </span>
                    <ChevronRight className={`w-4 h-4 ${isActive('/blog') ? 'text-[#FF5722]' : 'text-slate-400'}`} />
                  </Link>

                  <Link
                    to="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-sm transition-colors ${
                      isActive('/contact')
                        ? 'bg-[#FF5722]/10 dark:bg-[#FF5722]/20 text-[#FF5722] dark:text-[#FF5722] font-black border-l-4 border-[#FF5722]'
                        : 'font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive('/contact') && <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />}
                      Contact Us
                    </span>
                    <ChevronRight className={`w-4 h-4 ${isActive('/contact') ? 'text-[#FF5722]' : 'text-slate-400'}`} />
                  </Link>

                  <Link
                    to="/order-tracking"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-sm transition-colors ${
                      isActive('/order-tracking')
                        ? 'bg-[#FF5722]/10 dark:bg-[#FF5722]/20 text-[#FF5722] dark:text-[#FF5722] font-black border-l-4 border-[#FF5722]'
                        : 'font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#FF5722]" /> Track Order
                    </span>
                    <ChevronRight className={`w-4 h-4 ${isActive('/order-tracking') ? 'text-[#FF5722]' : 'text-slate-400'}`} />
                  </Link>
                </div>

                {/* Categories List */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                    Shop by Category
                  </h4>
                  <div className="space-y-1">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.slug}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between py-2 px-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-primary rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-slate-400">({cat.productCount})</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Helpline & Admin */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                  <a
                    href="tel:+8801700000000"
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-semibold"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-500" /> +880 1700-000000
                  </a>
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-amber-600 dark:text-amber-400 font-bold hover:underline"
                  >
                    🔒 Open Admin Dashboard
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
