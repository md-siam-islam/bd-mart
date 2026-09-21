import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Price } from '../components/common/Price';
import { Order } from '../types';
import {
  Search,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  MapPin,
  PhoneCall,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export const OrderTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const { orders } = useAuth();

  const [orderIdInput, setOrderIdInput] = useState(initialId);
  const [phoneInput, setPhoneInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialId) {
      const match = orders.find(
        (o) => o.id.toLowerCase() === initialId.toLowerCase()
      );
      if (match) {
        setSearchedOrder(match);
        setHasSearched(true);
      }
    }
  }, [initialId, orders]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    const cleanId = orderIdInput.trim().toUpperCase();
    const cleanPhone = phoneInput.trim();

    const match = orders.find((o) => {
      const idMatches = o.id.toUpperCase() === cleanId;
      if (cleanPhone) {
        return idMatches && o.customer.phone.includes(cleanPhone);
      }
      return idMatches;
    });

    setSearchedOrder(match || null);
  };

  const getStatusIndex = (status: string) => {
    const statuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    return statuses.indexOf(status);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom max-w-4xl">
        <Breadcrumb items={[{ label: 'Order Tracking' }]} />

        {/* Header */}
        <div className="text-center my-6">
          <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
            Real-Time Logistics
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
            Enter your BD Mart Order ID (e.g. <strong>BDM-84920</strong>) and phone number to see live status updates.
          </p>
        </div>

        {/* Tracking Search Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm mb-8">
          <form onSubmit={handleTrackSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6">
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                Order ID <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                placeholder="e.g. BDM-84920"
                className="w-full bg-slate-50 text-xs sm:text-sm text-slate-800 font-mono font-bold px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none uppercase"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="017xxxxxxxx"
                className="w-full bg-slate-50 text-xs sm:text-sm text-slate-800 px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded-xl transition-colors shadow-md shadow-primary/20 flex items-center justify-center gap-1.5"
              >
                <Search className="w-4 h-4" /> Track
              </button>
            </div>
          </form>
        </div>

        {/* Tracking Results */}
        {hasSearched && (
          searchedOrder ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Order Quick Overview Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-black text-slate-900">
                        Order #{searchedOrder.id}
                      </h2>
                      <span className="bg-blue-100 text-blue-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                        {searchedOrder.orderStatus}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Placed on {searchedOrder.date} • Courier:{' '}
                      <strong className="text-slate-700 font-mono">
                        {searchedOrder.trackingNumber}
                      </strong>
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-slate-400 block font-semibold">Total Amount</span>
                    <Price amount={searchedOrder.grandTotal} size="lg" />
                  </div>
                </div>

                {/* Animated Status Timeline */}
                <div className="py-8">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-8">
                    Shipment Progress Timeline
                  </h3>

                  <div className="relative pl-6 sm:pl-8 space-y-8 border-l-2 border-slate-200 ml-3 sm:ml-4">
                    {searchedOrder.timeline.map((step, idx) => {
                      const isCompleted = step.completed;

                      return (
                        <div key={idx} className="relative group">
                          {/* Dot Icon */}
                          <div
                            className={`absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                              isCompleted
                                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30 ring-4 ring-emerald-50'
                                : 'bg-white border-2 border-slate-300 text-slate-400'
                            }`}
                          >
                            {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <div>
                              <h4
                                className={`text-xs sm:text-sm font-bold ${
                                  isCompleted ? 'text-slate-900' : 'text-slate-400'
                                }`}
                              >
                                {step.status}
                              </h4>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {step.description}
                              </p>
                            </div>
                            <span className="text-[11px] font-semibold text-slate-400 shrink-0">
                              {step.time}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery Address & Customer Snapshot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100 text-xs text-slate-600">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-1.5">
                      <MapPin className="w-4 h-4 text-primary" /> Delivery Address
                    </h4>
                    <p className="font-semibold text-slate-800">{searchedOrder.customer.name}</p>
                    <p className="text-slate-500 mt-0.5">{searchedOrder.shippingAddress.fullAddress}</p>
                    <p className="text-slate-500">
                      {searchedOrder.shippingAddress.upazila}, {searchedOrder.shippingAddress.district}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-1.5">
                      <Package className="w-4 h-4 text-emerald-600" /> Package Details
                    </h4>
                    <p className="text-slate-500">
                      Contains {searchedOrder.items.length} product(s).
                    </p>
                    <p className="font-semibold text-slate-800 mt-1">
                      Payment: {searchedOrder.paymentMethod} ({searchedOrder.paymentStatus})
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-100 shadow-sm">
              <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Order Not Found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                We couldn't locate order "{orderIdInput}". Please double check your order number or call our helpline.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-primary">
                <PhoneCall className="w-4 h-4" /> Helpline: +880 1700-000000
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
