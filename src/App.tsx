import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';

// Context Providers
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider } from './context/CompareContext';

// Route Guards
import { CustomerProtectedRoute } from './components/auth/CustomerProtectedRoute';
import { AdminProtectedRoute } from './components/auth/AdminProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';

// Common Components
import { Header } from './components/common/Header';
import { MobileHeader } from './components/common/MobileHeader';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { ToastContainer } from './components/common/ToastContainer';

// Storefront Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { CategoryPage } from './pages/CategoryPage';
import { SearchResults } from './pages/SearchResults';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { WishlistPage } from './pages/WishlistPage';
import { ComparePage } from './pages/ComparePage';
import { FlashSalePage } from './pages/FlashSalePage';
import { NewArrivalsPage } from './pages/NewArrivalsPage';
import { BestSellersPage } from './pages/BestSellersPage';
import { DealsOffersPage } from './pages/DealsOffersPage';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { FAQPage } from './pages/FAQPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailsPage } from './pages/BlogDetailsPage';
import { Policies } from './pages/Policies';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Customer Account Pages
import { AccountDashboard } from './pages/account/AccountDashboard';
import { MyOrdersPage } from './pages/account/MyOrdersPage';
import { SavedAddresses } from './pages/account/SavedAddresses';
import { AccountSettings } from './pages/account/AccountSettings';
import { Notifications } from './pages/account/Notifications';

// Admin Portal Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/Dashboard';
import { ProductsManage } from './pages/admin/ProductsManage';
import { OrdersManage } from './pages/admin/OrdersManage';
import { CustomersManage } from './pages/admin/CustomersManage';
import { CategoriesManage } from './pages/admin/CategoriesManage';
import { CouponsManage } from './pages/admin/CouponsManage';
import { ReviewsManage } from './pages/admin/ReviewsManage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminSettings } from './pages/admin/AdminSettings';

// 404 Not Found
import { NotFound } from './pages/NotFound';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Storefront Layout Wrapper (includes Header, Footer, and Bottom Nav)
const StorefrontLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Header />
      <MobileHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
      <CartDrawer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AdminAuthProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <CompareProvider>
                  <ScrollToTop />
                  <Routes>
                    {/* Storefront Routes with Header & Footer */}
                    <Route element={<StorefrontLayout />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/product/:slug" element={<ProductDetails />} />
                      <Route path="/category/:slug" element={<CategoryPage />} />
                      <Route path="/search" element={<SearchResults />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
                      <Route path="/order-tracking" element={<OrderTrackingPage />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="/compare" element={<ComparePage />} />
                      <Route path="/flash-sale" element={<FlashSalePage />} />
                      <Route path="/new-arrivals" element={<NewArrivalsPage />} />
                      <Route path="/best-sellers" element={<BestSellersPage />} />
                      <Route path="/deals" element={<DealsOffersPage />} />

                      {/* Informational & Policy Pages */}
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/contact" element={<ContactUs />} />
                      <Route path="/faq" element={<FAQPage />} />
                      <Route path="/blog" element={<BlogPage />} />
                      <Route path="/blog/:slug" element={<BlogDetailsPage />} />
                      <Route path="/privacy-policy" element={<Policies initialTab="privacy" />} />
                      <Route path="/terms" element={<Policies initialTab="terms" />} />
                      <Route path="/return-refund-policy" element={<Policies initialTab="refund" />} />
                      <Route path="/shipping-policy" element={<Policies initialTab="shipping" />} />

                      {/* Customer Authentication */}
                      <Route path="/account/login" element={<LoginPage />} />
                      <Route path="/account/register" element={<RegisterPage />} />
                      <Route path="/account/forgot-password" element={<ForgotPasswordPage />} />

                      {/* Protected Customer Account Dashboard Routes */}
                      <Route element={<CustomerProtectedRoute />}>
                        <Route path="/account" element={<AccountDashboard />} />
                        <Route path="/account/orders" element={<MyOrdersPage />} />
                        <Route path="/account/addresses" element={<SavedAddresses />} />
                        <Route path="/account/settings" element={<AccountSettings />} />
                        <Route path="/account/notifications" element={<Notifications />} />
                      </Route>

                      {/* 404 Fallback */}
                      <Route path="*" element={<NotFound />} />
                    </Route>

                    {/* Dedicated Admin Portal Authentication */}
                    <Route path="/admin/login" element={<AdminLoginPage />} />

                    {/* Protected Admin Portal Routes */}
                    <Route element={<AdminProtectedRoute />}>
                      <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="products" element={<ProductsManage />} />
                        <Route path="orders" element={<OrdersManage />} />
                        <Route path="customers" element={<CustomersManage />} />
                        <Route path="categories" element={<CategoriesManage />} />
                        <Route path="coupons" element={<CouponsManage />} />
                        <Route path="reviews" element={<ReviewsManage />} />
                        <Route path="analytics" element={<AdminAnalyticsPage />} />
                        <Route path="settings" element={<AdminSettings />} />
                      </Route>
                    </Route>
                  </Routes>

                  <ToastContainer />
                </CompareProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </AdminAuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
