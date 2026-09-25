import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Price } from '../../components/common/Price';
import { Package, Truck, ArrowRight, Clock } from 'lucide-react';
import { DEFAULT_PRODUCT_IMAGE, handleProductImageError } from '../../utils/imageFallback';

export const MyOrdersPage: React.FC = () => {
  const { orders } = useAuth();

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom max-w-5xl">
        <Breadcrumb
          items={[
            { label: 'My Account', link: '/account' },
            { label: 'My Orders' }
          ]}
        />

        <div className="my-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Order History ({orders.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review past purchases, download invoices, and track active courier deliveries.
          </p>
        </div>

        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 text-xs">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-black text-sm text-primary">
                      #{ord.id}
                    </span>
                    <span
                      className={`font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase ${
                        ord.orderStatus === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {ord.orderStatus}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Placed on {ord.date}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 font-bold block">Grand Total</span>
                    <Price amount={ord.grandTotal} size="md" />
                  </div>
                  <Link
                    to={`/order-tracking?id=${ord.id}`}
                    className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Truck className="w-3.5 h-3.5" /> Track Parcel
                  </Link>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {ord.items.map((it) => (
                  <div key={it.id} className="flex items-center gap-3 text-xs">
                    <img
                      src={it.product.images?.[0] || DEFAULT_PRODUCT_IMAGE}
                      alt={it.product.name}
                      onError={handleProductImageError}
                      className="w-14 h-14 rounded-xl object-cover bg-slate-50 border border-slate-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 truncate">{it.product.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Qty: {it.quantity} {it.selectedSize ? `• Size: ${it.selectedSize}` : ''}
                      </p>
                    </div>
                    <Price amount={it.price * it.quantity} size="sm" />
                  </div>
                ))}
              </div>

              {/* Delivery destination */}
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                <span>
                  Delivering to: <strong className="text-slate-800">{ord.shippingAddress.fullAddress}</strong>
                </span>
                <span>Payment: <strong className="text-slate-800">{ord.paymentMethod}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
