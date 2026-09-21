import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { useAuth } from '../../context/AuthContext';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Layers,
  ChevronDown,
  Sparkles,
  PhoneCall,
  Truck,
  MapPin,
  ShieldCheck,
  LogOut,
  Package,
  Settings,
  X,
  Flame,
} from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { Price } from './Price';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { comparedProducts } = useCompare();
  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Scroll listener for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search auto-suggest filter
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const matched = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      ).slice(0, 5);
      setSearchResults(matched);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setIsAccountOpen(false);
      }
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="w-full bg-white dark:bg-[#0E131F] z-40 relative hidden lg:block transition-colors duration-200">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 dark:bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 dark:border-slate-900">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Truck className="w-3.5 h-3.5" />
              Free Delivery on Orders Over ৳2,000 | Cash on Delivery Available
            </span>
            <span className="hidden xl:inline text-slate-500">|</span>
            <span className="hidden xl:flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              100% Genuine Bangladeshi & International Products
            </span>
          </div>

          <div className="flex items-center gap-5 text-slate-300">
            <Link
              to="/order-tracking"
              className={`transition-colors flex items-center gap-1 ${
                isActive('/order-tracking')
                  ? 'text-[#FF5722] font-bold'
                  : 'hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#FF5722]" /> Track Order
            </Link>
            <span className="text-slate-700">|</span>
            <a
              href="tel:+8801700000000"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" /> Hotline: +880 1700-000000
            </a>
            <span className="text-slate-700">|</span>
            <Link to="/admin" className="text-amber-400 hover:text-amber-300 font-semibold">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Brand & Search Bar */}
      <div
        className={`bg-white dark:bg-[#0E131F] transition-all duration-300 border-b border-slate-100 dark:border-slate-800/80 ${
          isScrolled ? 'shadow-md dark:shadow-slate-950/50 fixed top-0 left-0 right-0 z-40 py-3' : 'py-4'
        }`}
      >
        <div className="container-custom flex items-center justify-between gap-8">
          {/* BD Mart Premium Logo */}
          <Logo size="md" />

          {/* Central Live Search Box */}
          <div ref={searchRef} className="flex-1 max-w-2xl relative">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search 50+ products, categories, or brands (e.g. Panjabi, Saree, Casio, Walton)..."
                className="w-full bg-slate-100/80 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl pl-11 pr-24 py-3 border border-slate-200/80 dark:border-slate-700/80 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-20 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="submit"
                className="absolute right-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
              >
                Search
              </button>
            </form>

            {/* Auto-suggest dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Suggested Products ({searchResults.length})
                </div>
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    onClick={() => {
                      setIsSearchFocused(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-slate-400">{product.category}</span>
                        <span className="text-[10px] text-slate-300 dark:text-slate-600">•</span>
                        <Price amount={product.price} size="sm" />
                      </div>
                    </div>
                  </Link>
                ))}
                <Link
                  to={`/search?q=${encodeURIComponent(searchQuery)}`}
                  onClick={() => setIsSearchFocused(false)}
                  className="block text-center py-2.5 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-primary transition-colors"
                >
                  View all search results for "{searchQuery}" →
                </Link>
              </div>
            )}
          </div>

          {/* Action Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button (Light / Black / System) */}
            <ThemeToggle />

            {/* Compare */}
            <Link
              to="/compare"
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors relative flex items-center gap-1.5"
              title="Compare Products"
            >
              <div className="relative">
                <Layers className="w-5 h-5" />
                {comparedProducts.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {comparedProducts.length}
                  </span>
                )}
              </div>
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors relative flex items-center gap-1.5"
              title="Saved Wishlist"
            >
              <div className="relative">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Link>

            {/* User Account / Auth Buttons */}
            {isAuthenticated && user ? (
              <div ref={accountRef} className="relative">
                <button
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors border border-slate-200/80 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 cursor-pointer"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-xl object-cover border border-primary/30"
                  />
                  <div className="text-left text-xs">
                    <span className="text-slate-400 block text-[10px] leading-tight">Hello,</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100 line-clamp-1 max-w-[90px] leading-tight">
                      {user.name.split(' ')[0]}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isAccountOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.phone ? `+880 ${user.phone}` : user.email}</p>
                    </div>
                    <Link
                      to="/account"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" /> My Account
                    </Link>
                    <Link
                      to="/account/orders"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Package className="w-4 h-4 text-slate-400" /> My Orders
                    </Link>
                    <Link
                      to="/account/addresses"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-slate-400" /> Saved Addresses
                    </Link>
                    <Link
                      to="/account/settings"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-slate-400" /> Settings
                    </Link>
                    <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                    <button
                      onClick={() => {
                        logout();
                        setIsAccountOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/account/login"
                  className="px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/account/register"
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-xs shadow-primary/25 transition-all flex items-center gap-1"
                >
                  <span>Sign Up</span>
                </Link>
              </div>
            )}

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 transition-all shadow-md shadow-primary/25 cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:inline">Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav ref={navRef} className="bg-white dark:bg-[#0E131F] border-b border-slate-200 dark:border-slate-800 text-sm font-semibold relative transition-colors duration-200">
        <div className="container-custom flex items-center justify-between">
          {/* Category Mega Menu Button */}
          <div>
            <button
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="flex items-center gap-2.5 bg-slate-900 dark:bg-slate-800 text-white px-5 py-3 rounded-t-xl hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <Layers className="w-4 h-4 text-primary" />
              All Categories
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isMegaMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Links with Active Page Indicators */}
          <div
            onMouseEnter={() => setIsMegaMenuOpen(false)}
            className="flex items-center gap-6 text-xs font-bold text-slate-700 dark:text-slate-300"
          >
            {/* Home */}
            <Link
              to="/"
              className={`relative py-3 transition-colors flex items-center gap-1 ${
                isActive('/')
                  ? 'text-[#FF5722] dark:text-[#FF5722] font-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FF5722] after:rounded-full'
                  : 'hover:text-[#FF5722] dark:hover:text-[#FF5722]'
              }`}
            >
              Home
            </Link>

            {/* Shop All */}
            <Link
              to="/shop"
              className={`relative py-3 transition-colors flex items-center gap-1 ${
                isActive('/shop')
                  ? 'text-[#FF5722] dark:text-[#FF5722] font-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FF5722] after:rounded-full'
                  : 'hover:text-[#FF5722] dark:hover:text-[#FF5722]'
              }`}
            >
              Shop All
            </Link>

            {/* Flash Sale */}
            <Link
              to="/flash-sale"
              className={`relative py-3 transition-colors flex items-center gap-1 text-rose-600 ${
                isActive('/flash-sale')
                  ? 'font-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-rose-600 after:rounded-full'
                  : 'hover:text-rose-700'
              }`}
            >
              <Flame className="w-3.5 h-3.5 fill-rose-600" />
              Flash Sale
              <span className="bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-[10px] px-1.5 py-0.5 rounded font-extrabold uppercase">
                Hot
              </span>
            </Link>

            {/* New Arrivals */}
            <Link
              to="/new-arrivals"
              className={`relative py-3 transition-colors flex items-center gap-1 ${
                isActive('/new-arrivals')
                  ? 'text-[#FF5722] dark:text-[#FF5722] font-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FF5722] after:rounded-full'
                  : 'hover:text-[#FF5722] dark:hover:text-[#FF5722]'
              }`}
            >
              New Arrivals
            </Link>

            {/* Best Sellers */}
            <Link
              to="/best-sellers"
              className={`relative py-3 transition-colors flex items-center gap-1 ${
                isActive('/best-sellers')
                  ? 'text-[#FF5722] dark:text-[#FF5722] font-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FF5722] after:rounded-full'
                  : 'hover:text-[#FF5722] dark:hover:text-[#FF5722]'
              }`}
            >
              Best Sellers
            </Link>

            {/* Deals & Offers */}
            <Link
              to="/deals"
              className={`relative py-3 transition-colors flex items-center gap-1 ${
                isActive('/deals')
                  ? 'text-[#FF5722] dark:text-[#FF5722] font-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FF5722] after:rounded-full'
                  : 'hover:text-[#FF5722] dark:hover:text-[#FF5722]'
              }`}
            >
              Deals & Offers
            </Link>

            {/* Blog */}
            <Link
              to="/blog"
              className={`relative py-3 transition-colors flex items-center gap-1 ${
                isActive('/blog')
                  ? 'text-[#FF5722] dark:text-[#FF5722] font-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FF5722] after:rounded-full'
                  : 'hover:text-[#FF5722] dark:hover:text-[#FF5722]'
              }`}
            >
              Blog
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className={`relative py-3 transition-colors flex items-center gap-1 ${
                isActive('/contact')
                  ? 'text-[#FF5722] dark:text-[#FF5722] font-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FF5722] after:rounded-full'
                  : 'hover:text-[#FF5722] dark:hover:text-[#FF5722]'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Quick Help Link */}
          <div
            onMouseEnter={() => setIsMegaMenuOpen(false)}
            className="text-xs font-semibold text-slate-500 dark:text-slate-400"
          >
            Need Help?{' '}
            <Link
              to="/faq"
              className={`transition-colors ${
                isActive('/faq')
                  ? 'text-[#FF5722] font-bold underline'
                  : 'text-primary hover:underline'
              }`}
            >
              Visit FAQ
            </Link>
          </div>
        </div>

        {/* Full-width Mega Menu Dropdown */}
        <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
      </nav>
    </header>
  );
};
