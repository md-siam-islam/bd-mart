import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, Truck, Package, Printer, ArrowRight, MapPin } from 'lucide-react';
import { Price } from '../components/common/Price';

export const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById } = useAuth();

  const order = getOrderById(orderId || '');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container-custom max-w-3xl">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm text-center">
          {/* Success Badge */}
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">
            Order Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            Thank You For Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
            We have received your order and sent a confirmation SMS to{' '}
            <strong className="text-slate-800">{order?.customer.phone || 'your phone number'}</strong>.
          </p>

          {/* Order Details Card */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-left text-xs mb-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Order ID</span>
                <strong className="text-sm font-black text-primary">{orderId}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Tracking Number</span>
                <strong className="text-slate-800 font-mono">{order?.trackingNumber || 'STEADFAST-BD'}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Method</span>
                <strong className="text-slate-800 uppercase">{order?.paymentMethod || 'COD'}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimated Delivery</span>
                <strong className="text-slate-800">{order?.estimatedDelivery || 'Within 2-3 Days'}</strong>
              </div>
            </div>

            {/* Delivery address */}
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Delivery Destination</span>
              <p className="text-slate-800 font-semibold">
                {order?.customer.name} • {order?.shippingAddress.fullAddress}, {order?.shippingAddress.upazila}, {order?.shippingAddress.district}
              </p>
            </div>

            {/* Items summary */}
            {order && order.items.length > 0 && (
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold mb-2">Items Ordered</span>
                <div className="space-y-2">
                  {order.items.map((it) => (
                    <div key={it.id} className="flex items-center justify-between text-slate-700">
                      <span>{it.quantity}x {it.product.name}</span>
                      <Price amount={it.price * it.quantity} size="sm" />
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-200/80 mt-3 pt-3 flex items-center justify-between text-sm font-bold text-slate-900">
                  <span>Grand Total Paid / Payable:</span>
                  <Price amount={order.grandTotal} size="md" />
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to={`/order-tracking?id=${orderId}`}
              className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-md shadow-primary/20"
            >
              <Truck className="w-4 h-4" /> Live Track Order
            </Link>

            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print Invoice
            </button>

            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
