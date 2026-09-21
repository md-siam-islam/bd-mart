import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { checkPasswordRequirements } from '../../utils/security';
import {
  Settings,
  Save,
  ShieldCheck,
  Truck,
  Banknote,
  Users,
  KeyRound,
  FileCode2,
  Store,
  Bell,
  Lock,
  Plus,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Copy,
  Check
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { showToast } = useToast();
  const { admin, adminsList, changeAdminPassword, createAdmin } = useAdminAuth();

  const [activeTab, setActiveTab] = useState<'store' | 'profile' | 'team' | 'guide' | 'security' | 'delivery'>('store');

  // Store Configuration Form
  const [storeName, setStoreName] = useState('BD Mart Bangladesh');
  const [storeHotline, setStoreHotline] = useState('+880 1700-000000');
  const [storeEmail, setStoreEmail] = useState('support@bdmart.com.bd');
  const [storeAddress, setStoreAddress] = useState('Level 7, Simpletree Anarkali, 89 Gulshan Avenue, Dhaka-1212');
  const [tradeLicense, setTradeLicense] = useState('TRAD/DNCC/049182/2026');
  const [vatNumber, setVatNumber] = useState('BIN-004918239-0101');

  // Admin Password Change Form
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passError, setPassError] = useState('');
  const [isPassLoading, setIsPassLoading] = useState(false);

  // Add Admin Modal
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'Super Admin' | 'Store Manager' | 'Logistics Admin'>('Store Manager');
  const [newAdminPassword, setNewAdminPassword] = useState('');

  // Delivery & Rates
  const [insideDhakaRate, setInsideDhakaRate] = useState(60);
  const [outsideDhakaRate, setOutsideDhakaRate] = useState(120);
  const [freeShippingLimit, setFreeShippingLimit] = useState(2000);
  const [courierProvider, setCourierProvider] = useState('Steadfast');

  // Customer Policies
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [requirePhoneVerification, setRequirePhoneVerification] = useState(true);
  const [orderSmsNotification, setOrderSmsNotification] = useState(true);

  // Copied state helper
  const [hasCopiedEnv, setHasCopiedEnv] = useState(false);

  const handleSaveStore = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Store settings saved successfully!', 'success');
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');

    const reqs = checkPasswordRequirements(newPass);
    if (!Object.values(reqs).every(Boolean)) {
      setPassError('Password must have 8+ characters, uppercase, lowercase, number, and special character.');
      return;
    }

    if (newPass !== confirmPass) {
      setPassError('Confirm password does not match.');
      return;
    }

    setIsPassLoading(true);
    try {
      const res = await changeAdminPassword(currentPass, newPass);
      if (res.success) {
        setCurrentPass('');
        setNewPass('');
        setConfirmPass('');
      } else {
        setPassError(res.error || 'Failed to update administrator password.');
      }
    } catch {
      setPassError('An unexpected error occurred.');
    } finally {
      setIsPassLoading(false);
    }
  };

  const handleCreateAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newAdminPassword.length < 8) {
      showToast('Admin password must be at least 8 characters', 'error');
      return;
    }

    const res = await createAdmin({
      name: newAdminName,
      email: newAdminEmail,
      role: newAdminRole,
      passwordPlain: newAdminPassword
    });

    if (res.success) {
      setIsAddAdminOpen(false);
      setNewAdminName('');
      setNewAdminEmail('');
      setNewAdminPassword('');
    } else {
      showToast(res.error || 'Failed to create administrator', 'error');
    }
  };

  const copyEnvSnippet = () => {
    const snippet = `# BD Mart Administrator Configuration
VITE_ADMIN_EMAIL=admin@bdmart.com.bd
VITE_ADMIN_PASSWORD=Admin@BDMart2026!
VITE_STORE_NAME=BD Mart Bangladesh
VITE_STORE_HOTLINE=+880 1700-000000`;
    navigator.clipboard.writeText(snippet);
    setHasCopiedEnv(true);
    setTimeout(() => setHasCopiedEnv(false), 2000);
    showToast('.env snippet copied to clipboard', 'info');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Website & System Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure store identification, administrative credentials, environment variables, customer policies, and delivery matrices.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 text-xs font-bold">
        <button
          onClick={() => setActiveTab('store')}
          className={`px-4 py-2.5 rounded-t-xl transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'store'
              ? 'bg-white text-primary border-t-2 border-primary shadow-2xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Store className="w-4 h-4" /> Store Information
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 rounded-t-xl transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-white text-primary border-t-2 border-primary shadow-2xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <KeyRound className="w-4 h-4" /> Admin Password
        </button>

        <button
          onClick={() => setActiveTab('team')}
          className={`px-4 py-2.5 rounded-t-xl transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'team'
              ? 'bg-white text-primary border-t-2 border-primary shadow-2xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" /> Admin Team ({adminsList.length})
        </button>

        <button
          onClick={() => setActiveTab('guide')}
          className={`px-4 py-2.5 rounded-t-xl transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'guide'
              ? 'bg-white text-primary border-t-2 border-primary shadow-2xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileCode2 className="w-4 h-4 text-amber-500" /> Admin Setup Guide (.env)
        </button>

        <button
          onClick={() => setActiveTab('delivery')}
          className={`px-4 py-2.5 rounded-t-xl transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'delivery'
              ? 'bg-white text-primary border-t-2 border-primary shadow-2xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Truck className="w-4 h-4" /> Delivery & Gateways
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 rounded-t-xl transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'security'
              ? 'bg-white text-primary border-t-2 border-primary shadow-2xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Customer & Security
        </button>
      </div>

      {/* TAB 1: Store Information */}
      {activeTab === 'store' && (
        <form onSubmit={handleSaveStore} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4 text-xs">
          <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
            <Store className="w-4 h-4 text-primary" /> Store Legal & Contact Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Store Name</label>
              <input
                type="text"
                required
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Customer Support Hotline</label>
              <input
                type="text"
                required
                value={storeHotline}
                onChange={(e) => setStoreHotline(e.target.value)}
                className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border font-semibold text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Support Email</label>
              <input
                type="email"
                required
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
                className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Trade License Number (Bangladesh)</label>
              <input
                type="text"
                value={tradeLicense}
                onChange={(e) => setTradeLicense(e.target.value)}
                className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border font-mono font-semibold text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Headquarters / Warehouse Address</label>
            <textarea
              rows={2}
              value={storeAddress}
              onChange={(e) => setStoreAddress(e.target.value)}
              className="w-full bg-slate-50 px-3.5 py-2 rounded-xl border text-slate-900 font-medium resize-none"
            />
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Store Identity
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: Admin Password Change */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 text-xs">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            <img
              src={admin?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&q=80'}
              alt={admin?.name}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200 bg-slate-100"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">{admin?.name}</h3>
                <span className="bg-amber-50 text-amber-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-200">
                  {admin?.role}
                </span>
              </div>
              <p className="text-slate-500">{admin?.email}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Admin ID: {admin?.id} • Created: {admin?.createdAt}</p>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" /> Update Administrator Password
            </h3>
            <p className="text-slate-500 mb-4">
              Your new password is immediately hashed with SHA-256 and a random salt before being stored.
            </p>

            {passError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{passError}</span>
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Current Administrator Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    required
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full bg-slate-50 px-3.5 py-2.5 pr-10 rounded-xl border outline-none font-medium"
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

              <div>
                <label className="font-bold text-slate-800 block mb-1">New Password (8+ chars, upper, lower, number, symbol)</label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    required
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Enter strong password"
                    className="w-full bg-slate-50 px-3.5 py-2.5 pr-10 rounded-xl border outline-none font-medium"
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
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border outline-none font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isPassLoading}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-sm cursor-pointer"
              >
                {isPassLoading ? 'Updating...' : 'Save New Admin Password'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: Admin Team Management */}
      {activeTab === 'team' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Administrator Team Directory</h2>
              <p className="text-slate-500 text-[11px]">Authorized staff with access to order dispatch and store catalog</p>
            </div>
            <button
              onClick={() => setIsAddAdminOpen(true)}
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Administrator
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {adminsList.map((adm) => (
              <div key={adm.id} className="py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={adm.avatar}
                    alt={adm.name}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 bg-slate-100"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-900 text-sm">{adm.name}</p>
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                        {adm.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{adm.email}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Created {adm.createdAt}</span>
                  <span className="text-[10px] text-emerald-600 font-bold">● Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Admin Setup Guide & Environment Variables */}
      {activeTab === 'guide' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 text-xs">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              Administrator Account Setup & Secure Configuration
            </h2>
            <p className="text-slate-500 mt-1 leading-relaxed">
              To adhere to best security practices, administrator credentials should never be hardcoded into client-side JavaScript or committed into public version control.
            </p>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">1</span>
                Where to add the Admin Email & Password
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Create a file named <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono font-bold text-slate-800">.env</code> in the root directory of the project (you can copy <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono font-bold text-slate-800">.env.example</code>).
                Vite automatically loads environment variables with the <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono font-bold text-slate-800">VITE_</code> prefix:
              </p>

              {/* Code Snippet Box with Copy Button */}
              <div className="relative mt-2">
                <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
{`# Initial Super Administrator Credentials
VITE_ADMIN_EMAIL=admin@bdmart.com.bd
VITE_ADMIN_PASSWORD=Admin@BDMart2026!

# Store Information
VITE_STORE_NAME=BD Mart Bangladesh
VITE_STORE_HOTLINE=+880 1700-000000`}
                </pre>
                <button
                  onClick={copyEnvSnippet}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-mono text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {hasCopiedEnv ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {hasCopiedEnv ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">2</span>
                How Passwords are Stored & Protected
              </h3>
              <p className="text-slate-600 leading-relaxed">
                BD Mart uses the <strong>Web Crypto API</strong> (<code className="font-mono text-slate-800">crypto.subtle.digest('SHA-256')</code>) with cryptographically unique 128-bit salts (<code className="font-mono text-slate-800">crypto.getRandomValues</code>).
                Plaintext passwords are never saved into localStorage or sent to other pages. Only the cryptographic hash and salt are retained.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">3</span>
                How to Change the Administrator Password
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Logged in administrators can change their password at any time via the <strong>Admin Password</strong> tab in this settings panel. Changing the password verifies the current password and re-hashes the new password with a fresh cryptographic salt.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">4</span>
                How to Create Additional Administrators
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Super Admins can create additional administrators by navigating to the <strong>Admin Team</strong> tab and clicking <strong>"+ Add Administrator"</strong>. You can assign specific roles such as "Store Manager" or "Logistics Admin" with unique hashed credentials.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Delivery & Gateways */}
      {activeTab === 'delivery' && (
        <form onSubmit={handleSaveStore} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 text-xs">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Truck className="w-4 h-4 text-primary" /> Delivery Rates Across Bangladesh
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Inside Dhaka Metro (৳)</label>
                <input
                  type="number"
                  value={insideDhakaRate}
                  onChange={(e) => setInsideDhakaRate(Number(e.target.value))}
                  className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Outside Dhaka (63 Districts) (৳)</label>
                <input
                  type="number"
                  value={outsideDhakaRate}
                  onChange={(e) => setOutsideDhakaRate(Number(e.target.value))}
                  className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Free Delivery Threshold (৳)</label>
                <input
                  type="number"
                  value={freeShippingLimit}
                  onChange={(e) => setFreeShippingLimit(Number(e.target.value))}
                  className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border font-bold"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Banknote className="w-4 h-4 text-emerald-600" /> Courier & Payment Integrations
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Primary COD Logistics Partner</label>
                <select
                  value={courierProvider}
                  onChange={(e) => setCourierProvider(e.target.value)}
                  className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border font-bold text-slate-900"
                >
                  <option value="Steadfast">Steadfast Courier (Recommended for BD COD)</option>
                  <option value="Pathao">Pathao Merchant Logistics</option>
                  <option value="RedX">RedX Delivery</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">bKash Payment Gateway Environment</label>
                <select className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border font-bold text-slate-900">
                  <option value="Tokenized Live">bKash Tokenized v1.2 (Production)</option>
                  <option value="Sandbox">bKash Sandbox (Test Mode)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-100">
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Delivery Settings
            </button>
          </div>
        </form>
      )}

      {/* TAB 6: Customer & Security Policies */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4 text-xs">
          <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" /> Customer Account Policies & Security
          </h2>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">Allow Self-Registration for New Customers</span>
                <span className="text-slate-500 text-[11px]">
                  Enables public visitors to create customer accounts at /account/register
                </span>
              </div>
              <input
                type="checkbox"
                checked={allowRegistration}
                onChange={(e) => setAllowRegistration(e.target.checked)}
                className="w-5 h-5 accent-primary rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">Enforce Bangladesh Operator Prefix Validation</span>
                <span className="text-slate-500 text-[11px]">
                  Requires phone numbers to start with 013, 014, 015, 016, 017, 018, or 019
                </span>
              </div>
              <input
                type="checkbox"
                checked={requirePhoneVerification}
                onChange={(e) => setRequirePhoneVerification(e.target.checked)}
                className="w-5 h-5 accent-primary rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">Automated Dispatch SMS to Customer</span>
                <span className="text-slate-500 text-[11px]">
                  Sends instant parcel tracking code when order status changes to "Shipped"
                </span>
              </div>
              <input
                type="checkbox"
                checked={orderSmsNotification}
                onChange={(e) => setOrderSmsNotification(e.target.checked)}
                className="w-5 h-5 accent-primary rounded cursor-pointer"
              />
            </label>
          </div>
        </div>
      )}

      {/* MODAL: Add New Administrator */}
      {isAddAdminOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900 mb-1">Add New Administrator</h3>
            <p className="text-xs text-slate-500 mb-4">
              Create a new administrative user with dedicated cryptographic credentials.
            </p>

            <form onSubmit={handleCreateAdminSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newAdminName}
                  onChange={(e) => setNewAdminName(e.target.value)}
                  placeholder="e.g. Rafiqul Islam"
                  className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border outline-none font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Official Admin Email *</label>
                <input
                  type="email"
                  required
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="rafiq@bdmart.com.bd"
                  className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border outline-none font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Role & Permissions</label>
                <select
                  value={newAdminRole}
                  onChange={(e) => setNewAdminRole(e.target.value as any)}
                  className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border outline-none font-semibold text-slate-900"
                >
                  <option value="Store Manager">Store Manager (Products & Orders)</option>
                  <option value="Logistics Admin">Logistics Admin (Courier & Delivery)</option>
                  <option value="Super Admin">Super Admin (Full System Access)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Initial Password (8+ chars) *</label>
                <input
                  type="password"
                  required
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="Temporary password"
                  className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border outline-none font-semibold text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddAdminOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-sm"
                >
                  Create Administrator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
