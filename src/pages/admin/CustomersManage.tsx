import React, { useState, useEffect } from 'react';
import { UserStorageService } from '../../services/userStorage';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { UserProfile, Order } from '../../types';
import { validateBDMobile } from '../../utils/security';
import { Price } from '../../components/common/Price';
import {
  Search,
  Mail,
  PhoneCall,
  MapPin,
  Eye,
  Edit2,
  UserX,
  UserCheck,
  X,
  Check,
  Calendar,
  Package,
  AlertTriangle,
  ShieldCheck,
  Filter
} from 'lucide-react';

export const CustomersManage: React.FC = () => {
  const { orders } = useAuth();
  const { showToast } = useToast();

  const [customers, setCustomers] = useState<UserProfile[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'deactivated'>('all');

  // Modals
  const [viewCustomer, setViewCustomer] = useState<UserProfile | null>(null);
  const [editCustomer, setEditCustomer] = useState<UserProfile | null>(null);
  const [customerToToggle, setCustomerToToggle] = useState<UserProfile | null>(null);

  // Edit Customer Form State
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editStatus, setEditStatus] = useState<'active' | 'deactivated'>('active');

  const loadCustomers = () => {
    UserStorageService.init().then(() => {
      const all = UserStorageService.getAllUsers();
      setCustomers(all.map((u) => UserStorageService.toSafeProfile(u)));
    });
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.addresses?.some((a) =>
        a.fullAddress.toLowerCase().includes(search.toLowerCase()) ||
        a.division.toLowerCase().includes(search.toLowerCase())
      );

    const matchesStatus =
      statusFilter === 'all' ? true : c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenEdit = (c: UserProfile) => {
    setEditCustomer(c);
    setEditName(c.name);
    setEditEmail(c.email);
    setEditPhone(c.phone);
    setEditStatus(c.status || 'active');
  };

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCustomer) return;

    const pVal = validateBDMobile(editPhone);
    if (!pVal.isValid) {
      showToast(pVal.error || 'Please enter a valid BD phone number', 'error');
      return;
    }

    UserStorageService.updateProfile(editCustomer.id, {
      name: editName.trim(),
      email: editEmail.trim(),
      phone: pVal.normalized,
      status: editStatus
    });

    showToast(`Customer record for ${editName} updated successfully`, 'success');
    setEditCustomer(null);
    loadCustomers();
  };

  const handleConfirmToggleStatus = () => {
    if (!customerToToggle) return;

    const res = UserStorageService.toggleUserStatus(customerToToggle.id);
    if (res.user) {
      const newStatus = res.user.status;
      showToast(
        `Account for ${res.user.name} has been ${newStatus === 'active' ? 'activated' : 'deactivated'}`,
        newStatus === 'active' ? 'success' : 'info'
      );
    }
    setCustomerToToggle(null);
    loadCustomers();
  };

  // Get orders associated with a customer
  const getCustomerOrders = (customer: UserProfile): Order[] => {
    return orders.filter(
      (o) =>
        o.customer.phone === customer.phone ||
        (o.customer.email && customer.email && o.customer.email.toLowerCase() === customer.email.toLowerCase())
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Registered Customers ({customers.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Customer directory, order histories, account security status, and address books across Bangladesh.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, phone, email, city..."
            className="w-full bg-slate-50 text-xs px-3.5 py-2 pl-9 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto text-xs font-bold">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({customers.length})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              statusFilter === 'active'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Active ({customers.filter((c) => c.status === 'active').length})
          </button>
          <button
            onClick={() => setStatusFilter('deactivated')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              statusFilter === 'deactivated'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Deactivated ({customers.filter((c) => c.status === 'deactivated').length})
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider font-semibold">
              <th className="pb-3">Customer Profile</th>
              <th className="pb-3">Contact</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Orders</th>
              <th className="pb-3">Total Spent</th>
              <th className="pb-3">Joined Date</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  No customers found matching your criteria.
                </td>
              </tr>
            ) : (
              filtered.map((c) => {
                const customerOrders = getCustomerOrders(c);
                const totalSpent = customerOrders.reduce((sum, o) => sum + o.grandTotal, c.totalSpent || 0);

                return (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Customer Profile */}
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 bg-slate-100 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{c.name}</p>
                          <p className="text-[11px] text-slate-400">ID: {c.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-3.5">
                      <p className="font-semibold text-slate-800 flex items-center gap-1">
                        <PhoneCall className="w-3.5 h-3.5 text-primary" /> +880 {c.phone}
                      </p>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3 text-slate-400" /> {c.email}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="py-3.5">
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase inline-flex items-center gap-1 ${
                          c.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {c.status === 'active' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" /> Active
                          </>
                        ) : (
                          <>
                            <X className="w-3 h-3 text-rose-600" /> Deactivated
                          </>
                        )}
                      </span>
                    </td>

                    {/* Orders */}
                    <td className="py-3.5 font-bold text-slate-900">
                      {customerOrders.length} order(s)
                    </td>

                    {/* Total Spent */}
                    <td className="py-3.5 font-bold text-slate-900">
                      ৳{totalSpent.toLocaleString()}
                    </td>

                    {/* Joined */}
                    <td className="py-3.5 text-slate-500 font-medium">
                      {c.createdAt}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewCustomer(c)}
                          className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="View Customer Details & Orders"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(c)}
                          className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Customer Profile"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setCustomerToToggle(c)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            c.status === 'active'
                              ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                              : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={c.status === 'active' ? 'Deactivate Account' : 'Activate Account'}
                        >
                          {c.status === 'active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL: Customer Details */}
      {viewCustomer && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Customer Record
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  {viewCustomer.name}
                </h3>
              </div>
              <button
                onClick={() => setViewCustomer(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-xs">
              {/* Profile Card */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                <img
                  src={viewCustomer.avatar}
                  alt={viewCustomer.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900">{viewCustomer.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        viewCustomer.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {viewCustomer.status}
                    </span>
                  </div>
                  <p className="text-slate-600 font-semibold">+880 {viewCustomer.phone} • {viewCustomer.email}</p>
                  <p className="text-slate-400 text-[11px]">
                    Member since {viewCustomer.createdAt}
                    {viewCustomer.dateOfBirth ? ` • Born: ${viewCustomer.dateOfBirth}` : ''}
                    {viewCustomer.gender ? ` • Gender: ${viewCustomer.gender}` : ''}
                  </p>
                </div>
              </div>

              {/* Saved Delivery Addresses */}
              <div>
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  Address Book ({viewCustomer.addresses?.length || 0})
                </h4>
                {(!viewCustomer.addresses || viewCustomer.addresses.length === 0) ? (
                  <p className="text-slate-400 text-[11px]">No saved addresses in profile.</p>
                ) : (
                  <div className="space-y-2">
                    {viewCustomer.addresses.map((addr, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{addr.name} ({addr.addressType})</span>
                          {addr.isDefault && (
                            <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 mt-1">{addr.fullAddress}</p>
                        <p className="text-[11px] text-slate-400">
                          {addr.upazila}, {addr.district}, {addr.division} {addr.postalCode ? `- ${addr.postalCode}` : ''} • Tel: +880 {addr.phone}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Customer Order History */}
              <div>
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-primary" />
                  Customer Order History ({getCustomerOrders(viewCustomer).length})
                </h4>
                {getCustomerOrders(viewCustomer).length === 0 ? (
                  <p className="text-slate-400 text-[11px]">No placed orders found for this customer.</p>
                ) : (
                  <div className="space-y-2">
                    {getCustomerOrders(viewCustomer).map((ord) => (
                      <div key={ord.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="font-bold font-mono text-primary text-xs">{ord.id}</span>
                          <span className="text-slate-400 text-[11px] ml-2">{ord.date}</span>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {ord.items.length} item(s) • Method: {ord.paymentMethod} • Status: {ord.orderStatus}
                          </p>
                        </div>
                        <Price amount={ord.grandTotal} size="sm" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Edit Customer */}
      {editCustomer && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Edit Customer Account</h3>
              <button
                onClick={() => setEditCustomer(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomer} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Mobile Number (11 digits)</label>
                <div className="flex items-center">
                  <span className="bg-slate-100 px-2.5 py-2.5 rounded-l-xl border border-r-0 border-slate-200 font-bold text-slate-600">
                    +880
                  </span>
                  <input
                    type="tel"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="flex-1 bg-slate-50 px-3 py-2.5 rounded-r-xl border border-slate-200 outline-none focus:border-primary font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Account Access Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as any)}
                  className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-bold"
                >
                  <option value="active">Active (Can log in & purchase)</option>
                  <option value="deactivated">Deactivated (Blocked from logging in)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditCustomer(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL: Toggle Account Status */}
      {customerToToggle && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center animate-fadeIn">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
              customerToToggle.status === 'active' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
            }`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              {customerToToggle.status === 'active' ? 'Deactivate Customer Account?' : 'Activate Customer Account?'}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              {customerToToggle.status === 'active'
                ? `Deactivating ${customerToToggle.name} will immediately block them from logging in to BD Mart.`
                : `Activating ${customerToToggle.name} will restore their login access.`}
            </p>
            <div className="flex items-center justify-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setCustomerToToggle(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmToggleStatus}
                className={`px-4 py-2 text-white rounded-xl font-bold ${
                  customerToToggle.status === 'active'
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {customerToToggle.status === 'active' ? 'Yes, Deactivate' : 'Yes, Activate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
