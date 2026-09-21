import React, { useState } from 'react';
import { COUPONS } from '../../data/coupons';
import { Coupon } from '../../types';
import { useToast } from '../../context/ToastContext';
import { Plus, Trash2, Tag, CheckCircle2 } from 'lucide-react';

export const CouponsManage: React.FC = () => {
  const { showToast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>(COUPONS);

  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [value, setValue] = useState(10);
  const [minOrder, setMinOrder] = useState(1000);
  const [description, setDescription] = useState('');

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    const newC: Coupon = {
      code: code.toUpperCase(),
      discountType,
      value,
      minOrder,
      description: description || `${value}% off on orders above ৳${minOrder}`,
      expiryDate: '2026-12-31',
    };

    setCoupons([newC, ...coupons]);
    showToast(`Voucher ${newC.code} created!`, 'success');
    setCode('');
    setDescription('');
  };

  const handleDelete = (cCode: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== cCode));
    showToast(`Voucher ${cCode} deactivated`, 'info');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Vouchers & Coupons ({coupons.length})
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Create marketing discount codes for campaigns, flash sales, and first-time buyers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Create Coupon Form (col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-primary" /> Generate New Voucher
          </h3>

          <form onSubmit={handleCreateCoupon} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Coupon Code *</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. SUMMER25"
                className="w-full bg-slate-50 font-mono font-bold px-3.5 py-2.5 rounded-xl border outline-none uppercase focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Type</label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as any)}
                  className="w-full bg-slate-50 px-3 py-2.5 rounded-xl border outline-none font-semibold"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed (৳)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Value ({discountType === 'percentage' ? '%' : '৳'})
                </label>
                <input
                  type="number"
                  required
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="w-full bg-slate-50 font-bold px-3.5 py-2.5 rounded-xl border outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Min Order Amount (৳)</label>
              <input
                type="number"
                required
                value={minOrder}
                onChange={(e) => setMinOrder(Number(e.target.value))}
                className="w-full bg-slate-50 font-bold px-3.5 py-2.5 rounded-xl border outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description for customer view..."
                className="w-full bg-slate-50 px-3.5 py-2 rounded-xl border outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-colors shadow-sm"
            >
              Save Coupon
            </button>
          </form>
        </div>

        {/* Coupons Table (col-span-8) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider">
                <th className="pb-3 font-bold">Code</th>
                <th className="pb-3 font-bold">Discount</th>
                <th className="pb-3 font-bold">Min Spend</th>
                <th className="pb-3 font-bold">Expires</th>
                <th className="pb-3 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {coupons.map((c) => (
                <tr key={c.code} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 font-mono font-bold text-primary text-sm">{c.code}</td>
                  <td className="py-3 font-bold text-slate-900">
                    {c.discountType === 'percentage' ? `${c.value}% Off` : `৳${c.value} Flat`}
                  </td>
                  <td className="py-3 text-slate-600">৳{c.minOrder.toLocaleString()}</td>
                  <td className="py-3 text-slate-400">{c.expiryDate}</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => handleDelete(c.code)}
                      className="p-1.5 rounded-lg border hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                      title="Deactivate"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
