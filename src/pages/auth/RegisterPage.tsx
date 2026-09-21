import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Logo } from '../../components/common/Logo';
import {
  checkPasswordRequirements,
  evaluatePasswordStrength,
  validateBDMobile
} from '../../utils/security';
import {
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  Camera,
  ArrowRight,
  ShieldCheck,
  User,
  Sparkles,
  PhoneCall,
  Mail,
  Lock,
  Calendar
} from 'lucide-react';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&q=80'
];

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(PRESET_AVATARS[0]);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | ''>('');

  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // Real-time Validations
  const phoneValidation = useMemo(() => {
    if (!phone) return null;
    return validateBDMobile(phone);
  }, [phone]);

  const passwordRequirements = useMemo(() => {
    return checkPasswordRequirements(password);
  }, [password]);

  const passwordStrength = useMemo(() => {
    return evaluatePasswordStrength(password);
  }, [password]);

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  // Handle custom image file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Profile photo must be smaller than 2MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        showToast('Profile image uploaded', 'info');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // 1. Name validation
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    // 2. Phone validation
    const pVal = validateBDMobile(phone);
    if (!pVal.isValid) {
      setErrorMessage(pVal.error || 'Please enter a valid 11-digit Bangladeshi mobile number.');
      return;
    }

    // 3. Email validation
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // 4. Password validation
    const reqs = checkPasswordRequirements(password);
    if (!Object.values(reqs).every(Boolean)) {
      setErrorMessage('Password does not meet all complexity requirements.');
      return;
    }

    // 5. Confirm password
    if (password !== confirmPassword) {
      setErrorMessage('Confirm password does not match.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await register({
        name: fullName,
        email,
        phone: pVal.normalized,
        password,
        avatar,
        dateOfBirth: dateOfBirth || undefined,
        gender: (gender as 'male' | 'female' | 'other') || undefined
      });

      if (res.success) {
        navigate('/account');
      } else {
        setErrorMessage(res.error || 'Registration failed. Please try again.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred during account creation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <Logo size="lg" />
            </div>

            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Create Your Account
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Join thousands of smart shoppers across Bangladesh with fast delivery and verified authentic products.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-xs text-rose-700 font-semibold animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Profile Avatar Selection */}
            <div className="flex flex-col items-center justify-center pb-2">
              <div className="relative group">
                <img
                  src={avatar}
                  alt="Profile Preview"
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md bg-slate-100"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-1 -right-1 bg-primary text-white p-1.5 rounded-xl cursor-pointer hover:bg-primary-hover transition-colors shadow-sm"
                  title="Upload Custom Photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                  className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Choose from Avatars
                </button>
              </div>

              {showAvatarPicker && (
                <div className="flex items-center gap-2 mt-3 p-2 bg-slate-50 rounded-2xl border border-slate-200 overflow-x-auto max-w-full">
                  {PRESET_AVATARS.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setAvatar(img);
                        setShowAvatarPicker(false);
                      }}
                      className={`w-10 h-10 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        avatar === img ? 'border-primary ring-2 ring-primary/30 scale-105' : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                Full Name <span className="text-rose-500 font-black">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full bg-slate-50 text-xs sm:text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary focus:bg-white transition-all font-medium"
                />
                <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Bangladesh Mobile Number */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Bangladesh Mobile Number <span className="text-rose-500 font-black">*</span>
                </label>
                {phoneValidation?.operator && phoneValidation.operator !== 'Unknown' && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" /> {phoneValidation.operator}
                  </span>
                )}
              </div>

              <div className="flex items-center">
                <div className="bg-slate-100 border border-r-0 border-slate-200 text-slate-700 px-3.5 py-3 rounded-l-xl text-xs font-black flex items-center gap-1.5 shrink-0">
                  <span>🇧🇩</span>
                  <span>+880</span>
                </div>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01712345678"
                  className={`flex-1 bg-slate-50 text-xs sm:text-sm text-slate-900 px-3.5 py-3 rounded-r-xl border outline-none font-semibold transition-all ${
                    phone && phoneValidation && !phoneValidation.isValid
                      ? 'border-rose-300 focus:border-rose-500 bg-rose-50/20'
                      : 'border-slate-200 focus:border-primary focus:bg-white'
                  }`}
                />
              </div>

              {phone && phoneValidation && !phoneValidation.isValid ? (
                <p className="text-[11px] text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                  <X className="w-3.5 h-3.5 shrink-0" /> {phoneValidation.error}
                </p>
              ) : (
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Format: 11 digits starting with 013-019 (GP, Banglalink, Robi, Airtel, Teletalk).
                </span>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                Email Address <span className="text-rose-500 font-black">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tanvir.ahmed@example.com"
                  className="w-full bg-slate-50 text-xs sm:text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary focus:bg-white transition-all font-medium"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Password <span className="text-rose-500 font-black">*</span>
                </label>
                {password && (
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full text-white ${passwordStrength.color}`}>
                    Strength: {passwordStrength.label}
                  </span>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters with upper, lower, number, symbol"
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

              {/* Password Requirements Checklist */}
              <div className="mt-2.5 p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] space-y-1">
                <p className="font-bold text-slate-700 mb-1">Password must contain:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  <div className={`flex items-center gap-1.5 font-semibold ${passwordRequirements.minLength ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {passwordRequirements.minLength ? <Check className="w-3 h-3 text-emerald-600" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                    <span>At least 8 characters</span>
                  </div>
                  <div className={`flex items-center gap-1.5 font-semibold ${passwordRequirements.hasUpper ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {passwordRequirements.hasUpper ? <Check className="w-3 h-3 text-emerald-600" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                    <span>One uppercase letter (A-Z)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 font-semibold ${passwordRequirements.hasLower ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {passwordRequirements.hasLower ? <Check className="w-3 h-3 text-emerald-600" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                    <span>One lowercase letter (a-z)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 font-semibold ${passwordRequirements.hasNumber ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {passwordRequirements.hasNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                    <span>At least one number (0-9)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 font-semibold ${passwordRequirements.hasSpecial ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {passwordRequirements.hasSpecial ? <Check className="w-3 h-3 text-emerald-600" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                    <span>One special symbol (!@#$...)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                Confirm Password <span className="text-rose-500 font-black">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className={`w-full bg-slate-50 text-xs sm:text-sm text-slate-900 px-4 py-3 pr-11 rounded-xl border outline-none font-medium transition-all ${
                    passwordsMismatch
                      ? 'border-rose-300 focus:border-rose-500 bg-rose-50/20'
                      : passwordsMatch
                      ? 'border-emerald-300 focus:border-emerald-500 bg-emerald-50/20'
                      : 'border-slate-200 focus:border-primary focus:bg-white'
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

              {passwordsMismatch && (
                <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                  <X className="w-3 h-3" /> Passwords do not match.
                </p>
              )}
              {passwordsMatch && (
                <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Passwords match!
                </p>
              )}
            </div>

            {/* Optional Fields Accordion / Section */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Optional Profile Information
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date of Birth */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Date of Birth <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full bg-slate-50 text-xs sm:text-sm text-slate-700 px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Gender <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full bg-slate-50 text-xs sm:text-sm text-slate-700 px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-primary hover:bg-primary-hover disabled:bg-primary/60 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Securing & Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create BD Mart Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="pt-6 mt-6 border-t border-slate-100 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/account/login" className="text-primary font-bold hover:underline">
              Sign In Here
            </Link>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>256-bit SHA Encrypted • Never Shared with Third Parties</span>
          </div>
        </div>
      </div>
    </div>
  );
};
