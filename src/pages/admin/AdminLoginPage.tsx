import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AdminAuthService } from '../../services/adminAuthService';
import { useToast } from '../../context/ToastContext';
import { Logo } from '../../components/common/Logo';
import {
  ShieldAlert,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Store,
  AlertCircle,
  KeyRound,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { adminLogin, isAdminAuthenticated } = useAdminAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectTarget = searchParams.get('redirect') || '/admin';

  // If already authenticated, redirect to /admin
  React.useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAdminAuthenticated, navigate]);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Forgot Password Modal State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [recoveryStep, setRecoveryStep] = useState<1 | 2>(1);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please provide an administrator email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter the administrator password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await adminLogin(email, password, rememberMe);
      if (res.success) {
        navigate(redirectTarget);
      } else {
        setErrorMessage(res.error || 'Invalid administrator credentials. Access denied.');
      }
    } catch {
      setErrorMessage('A security exception occurred during administrator authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoAdmin = () => {
    setEmail('admin@bdmart.com.bd');
    setPassword('Admin@BDMart2026!');
    setErrorMessage('');
    showToast('Loaded Super Admin credentials', 'info');
  };

  const handleRequestAdminRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;

    const res = AdminAuthService.requestResetOtp(forgotEmail);
    showToast(res.message, 'info');
    if (res.simulatedCode) {
      showToast(`Admin OTP code: ${res.simulatedCode}`, 'success');
    }
    setRecoveryStep(2);
  };

  const handleResetAdminPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newAdminPassword.length < 8) {
      showToast('New password must be at least 8 characters', 'error');
      return;
    }

    const res = await AdminAuthService.resetPasswordWithOtp(
      forgotEmail,
      recoveryCode,
      newAdminPassword
    );
    if (res.success) {
      showToast('Admin password reset successfully. Please log in.', 'success');
      setIsForgotModalOpen(false);
      setRecoveryStep(1);
      setForgotEmail('');
      setRecoveryCode('');
      setNewAdminPassword('');
    } else {
      showToast(res.error || 'Recovery failed', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-primary selection:text-white">
      {/* Top Bar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-800/80">
        <Logo variant="admin" size="sm" showTagline={false} />

        <Link
          to="/"
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <Store className="w-3.5 h-3.5" /> Back to Storefront
        </Link>
      </header>

      {/* Main Login Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Top Accent Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-gold" />

            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700/80 text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-inner">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                Admin Command Portal
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Authorized store managers, operations leads, and fulfillment staff only.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 p-4 bg-rose-950/50 border border-rose-800/60 rounded-2xl flex items-start gap-3 text-xs text-rose-300 font-semibold animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Admin Email */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Administrator Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@bdmart.com.bd"
                    className="w-full bg-slate-950 text-xs sm:text-sm text-white px-4 py-3 rounded-xl border border-slate-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium transition-all"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Admin Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-300">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(email);
                      setIsForgotModalOpen(true);
                    }}
                    className="text-[11px] font-bold text-primary hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter administrative password"
                    className="w-full bg-slate-950 text-xs sm:text-sm text-white px-4 py-3 pr-11 rounded-xl border border-slate-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 p-0.5"
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
                    className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-primary focus:ring-primary accent-primary"
                  />
                  <span className="text-xs text-slate-400 font-semibold">Remember Session</span>
                </label>
                <span className="text-[10px] text-slate-500">Secure 30-Day Cookie</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Cryptographic Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate & Access Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Credentials for Review Testing */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
              <p className="text-[11px] text-slate-400 font-bold mb-2 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Default Initial Setup Account:
              </p>
              <button
                type="button"
                onClick={fillDemoAdmin}
                className="w-full py-2 px-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-amber-300 rounded-xl text-xs font-mono font-bold transition-colors flex items-center justify-center gap-2"
              >
                <span>admin@bdmart.com.bd</span>
                <span className="text-slate-500">•</span>
                <span>Click to Autofill</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-4 text-center text-[11px] text-slate-500 border-t border-slate-800/60 flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        <span>Secured with SHA-256 Web Crypto • IP Logging & Session Verification Active</span>
      </footer>

      {/* MODAL: Admin Password Recovery */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 text-white animate-fadeIn">
            <h3 className="text-base font-bold text-white mb-1">
              Admin Password Recovery
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Dispatches a secure 6-digit recovery code to the registered administrator email.
            </p>

            {recoveryStep === 1 ? (
              <form onSubmit={handleRequestAdminRecovery} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Admin Email</label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="admin@bdmart.com.bd"
                    className="w-full bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-800 text-white outline-none focus:border-primary"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary hover:bg-primary-hover rounded-xl font-bold transition-colors"
                  >
                    Send Recovery Code
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetAdminPassword} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">6-Digit Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={recoveryCode}
                    onChange={(e) => setRecoveryCode(e.target.value)}
                    placeholder="123456"
                    className="w-full bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-800 text-white font-mono text-center tracking-widest text-lg outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">New Password (8+ chars)</label>
                  <input
                    type="password"
                    required
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="w-full bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-800 text-white outline-none focus:border-primary"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setRecoveryStep(1)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary hover:bg-primary-hover rounded-xl font-bold transition-colors"
                  >
                    Reset & Save
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
