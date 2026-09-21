import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { BANGLADESH_DIVISIONS } from '../../data/bangladesh-geo';
import { validateBDMobile } from '../../utils/security';
import { useToast } from '../../context/ToastContext';
import { Address } from '../../types';
import {
  MapPin,
  Plus,
  Trash2,
  Edit2,
  Home,
  Building,
  Check,
  X,
  PhoneCall,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export const SavedAddresses: React.FC = () => {
  const { user, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAuth();
  const { showToast } = useToast();

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [division, setDivision] = useState('dhaka');
  const [district, setDistrict] = useState('dhaka-city');
  const [upazila, setUpazila] = useState('dhanmondi');
  const [area, setArea] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [addressType, setAddressType] = useState<'Home' | 'Office'>('Home');
  const [isDefault, setIsDefault] = useState(false);

  // Geo options based on selection
  const currentDivisionObj = BANGLADESH_DIVISIONS.find((d) => d.id === division) || BANGLADESH_DIVISIONS[0];
  const currentDistrictObj = currentDivisionObj.districts.find((d) => d.id === district) || currentDivisionObj.districts[0];

  const handleOpenAdd = () => {
    setEditingAddress(null);
    setName(user?.name || '');
    setPhone(user?.phone || '');
    setDivision('dhaka');
    setDistrict('dhaka-city');
    setUpazila('dhanmondi');
    setArea('');
    setFullAddress('');
    setPostalCode('1209');
    setAddressType('Home');
    setIsDefault((user?.addresses?.length || 0) === 0);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (addr: Address) => {
    setEditingAddress(addr);
    setName(addr.name);
    setPhone(addr.phone);
    setDivision(addr.division);
    setDistrict(addr.district);
    setUpazila(addr.upazila);
    setArea(addr.area || '');
    setFullAddress(addr.fullAddress);
    setPostalCode(addr.postalCode || '');
    setAddressType(addr.addressType);
    setIsDefault(addr.isDefault);
    setIsAddModalOpen(true);
  };

  const handleDivisionChange = (newDiv: string) => {
    setDivision(newDiv);
    const divObj = BANGLADESH_DIVISIONS.find((d) => d.id === newDiv);
    if (divObj && divObj.districts.length > 0) {
      setDistrict(divObj.districts[0].id);
      if (divObj.districts[0].upazilas.length > 0) {
        setUpazila(divObj.districts[0].upazilas[0].id);
      }
    }
  };

  const handleDistrictChange = (newDist: string) => {
    setDistrict(newDist);
    const distObj = currentDivisionObj.districts.find((d) => d.id === newDist);
    if (distObj && distObj.upazilas.length > 0) {
      setUpazila(distObj.upazilas[0].id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !fullAddress.trim()) {
      showToast('Please fill in all mandatory address details', 'error');
      return;
    }

    const pVal = validateBDMobile(phone);
    if (!pVal.isValid) {
      showToast(pVal.error || 'Please enter a valid 11-digit Bangladeshi mobile number', 'error');
      return;
    }

    const addressPayload = {
      name: name.trim(),
      phone: pVal.normalized,
      division,
      district,
      upazila,
      area: area.trim(),
      fullAddress: fullAddress.trim(),
      postalCode: postalCode.trim(),
      addressType,
      isDefault
    };

    if (editingAddress) {
      updateAddress(editingAddress.id, addressPayload);
      showToast('Address updated successfully', 'success');
    } else {
      addAddress(addressPayload);
    }

    setIsAddModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (addressToDelete) {
      deleteAddress(addressToDelete);
      setAddressToDelete(null);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom max-w-4xl">
        <Breadcrumb
          items={[
            { label: 'My Account', link: '/account' },
            { label: 'Saved Addresses' }
          ]}
        />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Address Book ({user?.addresses?.length || 0})
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage shipping destinations across all 8 Bangladesh divisions for faster 1-click checkout.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New Address
          </button>
        </div>

        {/* Addresses Grid */}
        {(!user?.addresses || user.addresses.length === 0) ? (
          <div className="bg-white rounded-3xl p-10 border border-slate-200/80 shadow-xs text-center">
            <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">No Saved Addresses</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Save your home or office address to enable instant delivery calculation and doorstep delivery.
            </p>
            <button
              onClick={handleOpenAdd}
              className="mt-4 px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-hover transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add First Address
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.addresses.map((addr) => {
              const divName = BANGLADESH_DIVISIONS.find((d) => d.id === addr.division)?.name || addr.division;
              const distName = BANGLADESH_DIVISIONS.flatMap((d) => d.districts).find((di) => di.id === addr.district)?.name || addr.district;
              const upaName = BANGLADESH_DIVISIONS.flatMap((d) => d.districts).flatMap((di) => di.upazilas).find((u) => u.id === addr.upazila)?.name || addr.upazila;

              return (
                <div
                  key={addr.id}
                  className={`bg-white rounded-3xl p-6 border transition-all relative flex flex-col justify-between ${
                    addr.isDefault
                      ? 'border-primary/50 shadow-md ring-1 ring-primary/20'
                      : 'border-slate-200/80 shadow-xs hover:border-slate-300'
                  }`}
                >
                  <div>
                    {/* Header with Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
                          {addr.addressType === 'Office' ? (
                            <Building className="w-3.5 h-3.5" />
                          ) : (
                            <Home className="w-3.5 h-3.5" />
                          )}
                        </span>
                        <span className="font-bold text-slate-900 text-sm">{addr.name}</span>
                      </div>

                      {addr.isDefault && (
                        <span className="bg-primary/10 text-primary text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-primary/20">
                          Default Address
                        </span>
                      )}
                    </div>

                    {/* Contact & Address Details */}
                    <div className="space-y-1 text-xs text-slate-600 mb-4">
                      <p className="flex items-center gap-1.5 font-semibold text-slate-800">
                        <PhoneCall className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        +880 {addr.phone}
                      </p>
                      <p className="text-slate-700 font-medium leading-relaxed mt-2">
                        {addr.fullAddress}
                      </p>
                      {addr.area && (
                        <p className="text-slate-500 font-medium">Area: {addr.area}</p>
                      )}
                      <p className="text-slate-400 text-[11px]">
                        {upaName}, {distName}, {divName} {addr.postalCode ? `- ${addr.postalCode}` : ''}
                      </p>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                    {!addr.isDefault ? (
                      <button
                        type="button"
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-primary font-bold hover:underline cursor-pointer"
                      >
                        Set as Default
                      </button>
                    ) : (
                      <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                        <Check className="w-3.5 h-3.5" /> Selected for Delivery
                      </span>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(addr)}
                        className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit Address"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setAddressToDelete(addr.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Address"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL: Add / Edit Address */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <h3 className="text-base font-black text-slate-900">
                {editingAddress ? 'Edit Delivery Destination' : 'Add New Bangladesh Address'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    Recipient Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    Contact Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <span className="bg-slate-100 px-2.5 py-2.5 rounded-l-xl border border-r-0 border-slate-200 text-[11px] font-bold text-slate-600">
                      +880
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="017xxxxxxxx"
                      className="flex-1 bg-slate-50 px-3 py-2.5 rounded-r-xl border border-slate-200 outline-none focus:border-primary font-medium text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Bangladesh Hierarchy: Division, District, Upazila */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Division *</label>
                  <select
                    value={division}
                    onChange={(e) => handleDivisionChange(e.target.value)}
                    className="w-full bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium text-slate-900"
                  >
                    {BANGLADESH_DIVISIONS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.nameBn})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">District *</label>
                  <select
                    value={district}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    className="w-full bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium text-slate-900"
                  >
                    {currentDivisionObj.districts.map((di) => (
                      <option key={di.id} value={di.id}>
                        {di.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Upazila / Thana *</label>
                  <select
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    className="w-full bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium text-slate-900"
                  >
                    {currentDistrictObj.upazilas.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Area & Postal Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    Area / Neighborhood / Sector
                  </label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Sector 4, Dhanmondi R/A, Block C"
                    className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="e.g. 1209"
                    className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* Full Address Details */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Full Street Address (House, Road, Holding) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  placeholder="e.g. House 42, Road 7/A, Dhanmondi R/A, Flat 4B"
                  className="w-full bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium text-slate-900 resize-none"
                />
              </div>

              {/* Type and Default Checkbox */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-700">Address Label:</span>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="addrType"
                      checked={addressType === 'Home'}
                      onChange={() => setAddressType('Home')}
                      className="accent-primary"
                    />
                    <span>Home</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="addrType"
                      checked={addressType === 'Office'}
                      onChange={() => setAddressType('Office')}
                      className="accent-primary"
                    />
                    <span>Office / Work</span>
                  </label>
                </div>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    className="accent-primary w-4 h-4 rounded"
                  />
                  <span className="font-bold text-slate-800">Set as Default Delivery Address</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-colors shadow-sm cursor-pointer"
                >
                  {editingAddress ? 'Update Address' : 'Save Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL: Delete Address */}
      {addressToDelete && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Delete Address?</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to remove this delivery destination from your address book?
            </p>
            <div className="flex items-center justify-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setAddressToDelete(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold transition-colors shadow-sm cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
