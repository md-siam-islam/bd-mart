import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useToast } from '../../context/ToastContext';
import { Logo } from '../../components/common/Logo';
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Lock,
  Mail,
  PhoneCall,
  AlertCircle,
  Sparkles
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { adminLogin } = useAdminAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect target if redirected from a guarded route (e.g. /checkout)
  const searchParams = new URLSearchParams(location.search);
  const redirectTarget = searchParams.get('redirect') || '/account';

  // Form State
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage('Please enter your email or mobile number.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);

    try {
      const cleanId = identifier.trim().toLowerCase();
      const isAdminAccount =
        cleanId === 'mdsiamislam663@gmail.com' ||
        cleanId === 'mdsiamislam6663@gmail.com' ||
        cleanId === 'admin@bdmart.com.bd' ||
        cleanId.includes('admin');

      // 1. Check if logging in with Administrator credentials
      const adminRes = await adminLogin(cleanId, password, rememberMe);
      if (adminRes.success) {
        // Also sync customer profile session
        await login(cleanId, password, rememberMe);
        showToast('Welcome Siam Ali! Redirecting to Admin Dashboard...', 'success');
        navigate('/admin', { replace: true });
        return;
      }

      // If typed an administrator email but got incorrect password, display specific warning
      if (isAdminAccount) {
        setErrorMessage(adminRes.error || 'Invalid administrator credentials. Access denied.');
        setIsLoading(false);
        return;
      }

      // 2. Standard customer authentication
      const res = await login(identifier, password, rememberMe);
      if (res.success) {
        navigate(redirectTarget);
      } else {
        setErrorMessage(res.error || 'Invalid credentials. Please try again.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo account quick filler for reviewer testing
  const fillDemoAccount = (demoId: 'tanvir' | 'deactivated') => {
    if (demoId === 'tanvir') {
      setIdentifier('01712345678');
      setPassword('Demo@1234');
      setErrorMessage('');
      showToast('Loaded demo credentials: Tanvir Ahmed', 'info');
    } else {
      setIdentifier('01512345678');
      setPassword('Customer@2026');
      setErrorMessage('');
      showToast('Loaded deactivated test customer', 'info');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-20 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl">
          {/* Brand Logo & Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <Logo size="lg" />
            </div>

            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Customer Sign In
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Access your order history, delivery tracking, and saved address book.
            </p>
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-xs text-rose-700 font-semibold animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email or Mobile Number */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                Email or Bangladesh Mobile Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. 01712345678 or tanvir@example.com"
                  className="w-full bg-slate-50 text-xs sm:text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary focus:bg-white transition-all font-medium"
                />
                <div className="absolute right-3.5 top-3.5 flex items-center gap-1.5 text-slate-400 pointer-events-none">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span className="text-[10px]">/</span>
                  <Mail className="w-3.5 h-3.5" />
                </div>
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Enter your registered 11-digit mobile number or email address.
              </span>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">Password</label>
                <Link
                  to="/account/forgot-password"
                  className="text-[11px] font-bold text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your account password"
                  className="w-full bg-slate-50 text-xs sm:text-sm text-slate-900 px-4 py-3 pr-11 rounded-xl border border-slate-200 outline-none focus:border-primary focus:bg-white transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700 p-0.5"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary accent-primary"
                />
                <span className="text-xs text-slate-600 font-semibold">Remember Me</span>
              </label>

              <span className="text-[10px] text-slate-400">Keeps session active</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-primary hover:bg-primary-hover disabled:bg-primary/60 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to BD Mart</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Login Quick Links */}
          <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50/60 -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 p-5 rounded-b-3xl text-center">
            <p className="text-[11px] font-bold text-slate-500 mb-2 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Quick Testing Accounts:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fillDemoAccount('tanvir')}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-[10px] font-bold transition-colors"
              >
                Tanvir Ahmed (Active)
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('deactivated')}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-rose-600 rounded-lg text-[10px] font-bold transition-colors"
              >
                Zubair (Deactivated Test)
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="pt-6 mt-8 text-center text-xs text-slate-500">
            New customer at BD Mart?{' '}
            <Link to="/account/register" className="text-primary font-bold hover:underline">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
