import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { Logo } from '../../components/common/Logo';
import { UserStorageService } from '../../services/userStorage';
import {
  checkPasswordRequirements,
  evaluatePasswordStrength
} from '../../utils/security';
import {
  KeyRound,
  Mail,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Eye,
  EyeOff,
  Check,
  X,
  Lock,
  RotateCcw
} from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Wizard Steps: 1: Request, 2: Verify OTP, 3: New Password, 4: Success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [identifier, setIdentifier] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);

  // Real-time password requirement check
  const passwordRequirements = useMemo(() => {
    return checkPasswordRequirements(newPassword);
  }, [newPassword]);

  const passwordStrength = useMemo(() => {
    return evaluatePasswordStrength(newPassword);
  }, [newPassword]);

  const passwordsMatch = confirmPassword.length > 0 && newPassword === confirmPassword;

  // Step 1: Request OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage('Please enter your email or Bangladesh mobile number.');
      return;
    }

    setIsLoading(true);

    try {
      const res = UserStorageService.requestPasswordReset(identifier);
      showToast(res.message, 'info');

      if (res.simulatedCode) {
        // Helpful test banner for reviewer testing
        showToast(`Verification code: ${res.simulatedCode}`, 'success');
      }

      setStep(2);
      startResendTimer();
    } catch {
      setErrorMessage('Unable to process recovery request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const startResendTimer = () => {
    setResendCountdown(60);
    const interval = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!otpCode || otpCode.trim().length !== 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.');
      return;
    }

    const isValid = UserStorageService.verifyResetCode(identifier, otpCode);
    if (!isValid) {
      setErrorMessage('Invalid or expired verification code. Please check and try again.');
      return;
    }

    setStep(3);
  };

  // Step 3: Set New Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const reqs = checkPasswordRequirements(newPassword);
    if (!Object.values(reqs).every(Boolean)) {
      setErrorMessage('Password does not satisfy all security requirements.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Confirm password does not match.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await UserStorageService.resetPasswordWithOtp(identifier, otpCode, newPassword);
      if (res.success) {
        setStep(4);
        showToast('Password reset successfully! You can now log in.', 'success');
      } else {
        setErrorMessage(res.error || 'Failed to update password.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred while saving your new password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-20 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <Logo size="lg" />
            </div>

            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Password Recovery
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {step === 1 && 'Enter your registered email or mobile number to receive a verification code.'}
              {step === 2 && 'Enter the 6-digit confirmation code dispatched to your contact.'}
              {step === 3 && 'Choose a strong, unique password to secure your account.'}
              {step === 4 && 'Your password has been changed successfully.'}
            </p>
          </div>

          {/* Progress Pills */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === s
                    ? 'w-8 bg-primary'
                    : step > s
                    ? 'w-4 bg-emerald-500'
                    : 'w-4 bg-slate-200'
                }`}
              />
            ))}
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-xs text-rose-700 font-semibold animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Request Code */}
          {step === 1 && (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1.5">
                  Email Address or Bangladesh Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. 01712345678 or customer@example.com"
                    className="w-full bg-slate-50 text-xs sm:text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary focus:bg-white transition-all font-medium"
                  />
                  <div className="absolute right-3.5 top-3.5 flex items-center gap-1 text-slate-400 pointer-events-none">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span className="text-[10px]">/</span>
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  For privacy, the system will never disclose whether an account exists.
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-primary hover:bg-primary-hover disabled:bg-primary/60 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: Verify Code */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-800">
                    Enter 6-Digit Code
                  </label>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Sent to: {identifier}
                  </span>
                </div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="w-full text-center tracking-[0.4em] font-mono text-2xl text-slate-900 bg-slate-50 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary focus:bg-white font-bold"
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Change Contact
                </button>

                {resendCountdown > 0 ? (
                  <span className="text-slate-400 text-[11px]">
                    Resend in {resendCountdown}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const res = UserStorageService.requestPasswordReset(identifier);
                      if (res.simulatedCode) {
                        showToast(`New code: ${res.simulatedCode}`, 'success');
                      }
                      startResendTimer();
                    }}
                    className="text-primary font-bold hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Resend Code
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Verify Identity</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 3: Enter New Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-800">New Password</label>
                  {newPassword && (
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full text-white ${passwordStrength.color}`}>
                      {passwordStrength.label}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new strong password"
                    className="w-full bg-slate-50 text-xs sm:text-sm text-slate-900 px-4 py-3 pr-11 rounded-xl border border-slate-200 outline-none focus:border-primary focus:bg-white font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700 p-0.5"
                    tabIndex={-1}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Requirements */}
                <div className="mt-2.5 p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] space-y-1">
                  <div className={`flex items-center gap-1.5 font-semibold ${passwordRequirements.minLength ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {passwordRequirements.minLength ? <Check className="w-3 h-3 text-emerald-600" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                    <span>At least 8 characters</span>
                  </div>
                  <div className={`flex items-center gap-1.5 font-semibold ${passwordRequirements.hasUpper && passwordRequirements.hasLower ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {passwordRequirements.hasUpper && passwordRequirements.hasLower ? <Check className="w-3 h-3 text-emerald-600" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                    <span>Upper & lowercase letters</span>
                  </div>
                  <div className={`flex items-center gap-1.5 font-semibold ${passwordRequirements.hasNumber && passwordRequirements.hasSpecial ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {passwordRequirements.hasNumber && passwordRequirements.hasSpecial ? <Check className="w-3 h-3 text-emerald-600" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                    <span>Number & special symbol</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className={`w-full bg-slate-50 text-xs sm:text-sm text-slate-900 px-4 py-3 pr-11 rounded-xl border outline-none font-medium ${
                      confirmPassword && !passwordsMatch
                        ? 'border-rose-300 focus:border-rose-500'
                        : confirmPassword && passwordsMatch
                        ? 'border-emerald-300 focus:border-emerald-500'
                        : 'border-slate-200 focus:border-primary'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700 p-0.5"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-primary hover:bg-primary-hover disabled:bg-primary/60 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Encrypting & Updating...</span>
                  </>
                ) : (
                  <>
                    <span>Save & Update Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-lg font-black text-slate-900">
                Password Successfully Reset!
              </h2>
              <p className="text-xs text-slate-500">
                Your account credentials have been securely updated. You may now log in with your new password.
              </p>
              <button
                type="button"
                onClick={() => navigate('/account/login')}
                className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Back to Login Footer */}
          {step !== 4 && (
            <div className="pt-6 mt-6 border-t border-slate-100 text-center text-xs">
              <Link
                to="/account/login"
                className="text-slate-500 hover:text-slate-800 font-semibold flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
