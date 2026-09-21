import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { useToast } from '../../context/ToastContext';
import { validateBDMobile, checkPasswordRequirements } from '../../utils/security';
import {
  User,
  Lock,
  Bell,
  ShieldCheck,
  Check,
  Eye,
  EyeOff,
  PhoneCall,
  Mail,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const AccountSettings: React.FC = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const { showToast } = useToast();

  // Profile Form
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || '');
  const [gender, setGender] = useState(user?.gender || '');

  // Password Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passError, setPassError] = useState('');
  const [isPassLoading, setIsPassLoading] = useState(false);

  // Notifications
  const [orderSms, setOrderSms] = useState(true);
  const [promoOffers, setPromoOffers] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const pVal = validateBDMobile(phone);
    if (!pVal.isValid) {
      showToast(pVal.error || 'Please enter a valid Bangladeshi mobile number', 'error');
      return;
    }

    updateProfile({
      name: name.trim(),
      email: email.trim(),
      phone: pVal.normalized,
      dateOfBirth: dateOfBirth || undefined,
      gender: (gender as any) || undefined
    });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');

    const reqs = checkPasswordRequirements(newPassword);
    if (!Object.values(reqs).every(Boolean)) {
      setPassError('New password does not meet security requirements (8+ chars, upper, lower, number, special char).');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError('Confirm password does not match.');
      return;
    }

    setIsPassLoading(true);
    try {
      const res = await changePassword(currentPassword, newPassword);
      if (res.success) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPassError(res.error || 'Current password does not match.');
      }
    } catch {
      setPassError('An error occurred while changing password.');
    } finally {
      setIsPassLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom max-w-3xl">
        <Breadcrumb
          items={[
            { label: 'My Account', link: '/account' },
            { label: 'Account Settings' }
          ]}
        />

        <div className="my-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Account Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Update your personal profile, secure your account password, and configure delivery SMS notifications.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 mb-6">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-primary" /> Personal Profile
          </h2>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-800 block mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-semibold text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-800 block mb-1.5">Mobile Number</label>
                <div className="flex items-center">
                  <span className="bg-slate-100 px-3 py-2.5 rounded-l-xl border border-r-0 border-slate-200 text-xs font-bold text-slate-600">
                    +880
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-slate-50 px-3 py-2.5 rounded-r-xl border border-slate-200 outline-none focus:border-primary font-semibold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-semibold text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-800 block mb-1.5">Date of Birth</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium text-slate-700"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1.5">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium text-slate-700"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-colors shadow-sm cursor-pointer"
            >
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5 mb-6">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" /> Security & Password
          </h2>

          {passError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{passError}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPass ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full bg-slate-50 px-4 py-2.5 pr-10 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                >
                  {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-800 block mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 8 chars"
                    className="w-full bg-slate-50 px-4 py-2.5 pr-10 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPassLoading}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white rounded-xl font-bold transition-colors shadow-sm cursor-pointer"
            >
              {isPassLoading ? 'Updating Password...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Communication Preferences */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" /> Notifications & Alerts
          </h2>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100/70 transition-colors">
              <div>
                <span className="font-bold text-slate-900 block">Order Status SMS</span>
                <span className="text-slate-500 text-[11px]">
                  Receive automated delivery step notifications on your phone via Steadfast courier
                </span>
              </div>
              <input
                type="checkbox"
                checked={orderSms}
                onChange={(e) => setOrderSms(e.target.checked)}
                className="w-5 h-5 accent-primary rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100/70 transition-colors">
              <div>
                <span className="font-bold text-slate-900 block">Flash Deals & Vouchers</span>
                <span className="text-slate-500 text-[11px]">
                  Receive exclusive Eid, Pohela Boishakh, and weekend discount alerts
                </span>
              </div>
              <input
                type="checkbox"
                checked={promoOffers}
                onChange={(e) => setPromoOffers(e.target.checked)}
                className="w-5 h-5 accent-primary rounded cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
