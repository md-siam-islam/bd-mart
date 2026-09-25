import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Price } from '../../components/common/Price';
import { useToast } from '../../context/ToastContext';
import { Search, Truck, Filter, MapPin, Eye, CheckCircle2, XCircle, Clock, X, PhoneCall, Mail } from 'lucide-react';
import { OrderStatusType, Order } from '../../types';
import { DEFAULT_PRODUCT_IMAGE, handleProductImageError } from '../../utils/imageFallback';

export const OrdersManage: React.FC = () => {
  const { orders, updateOrderStatus } = useAuth();
  const { showToast } = useToast();

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statuses: (OrderStatusType | 'All')[] = [
    'All',
    'Pending',
    'Confirmed',
    'Processing',
    'Shipped',
    'Out for Delivery',
    'Delivered',
    'Cancelled'
  ];

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'All' || o.orderStatus === statusFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatusType) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Orders Management ({orders.length})
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor order lifecycle, update delivery step statuses, and dispatch Steadfast couriers across Bangladesh.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, customer name, phone..."
            className="w-full bg-slate-50 text-xs px-3.5 py-2 pl-9 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Status Pills */}
        <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider font-semibold">
              <th className="pb-3">Order ID & Date</th>
              <th className="pb-3">Customer Information</th>
              <th className="pb-3">Delivery Zone</th>
              <th className="pb-3">Payment</th>
              <th className="pb-3">Grand Total</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  No orders found matching the filter criteria.
                </td>
              </tr>
            ) : (
              filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5">
                    <p className="font-mono font-bold text-primary text-sm">{ord.id}</p>
                    <span className="text-[11px] text-slate-400">{ord.date}</span>
                  </td>

                  <td className="py-3.5">
                    <p className="font-bold text-slate-900">{ord.customer.name}</p>
                    <p className="text-[11px] text-slate-500 font-semibold">+880 {ord.customer.phone}</p>
                  </td>

                  <td className="py-3.5">
                    <p className="font-semibold text-slate-800">{ord.shippingAddress.upazila}, {ord.shippingAddress.district}</p>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">{ord.shippingAddress.division}</span>
                  </td>

                  <td className="py-3.5">
                    <span className="font-bold text-slate-800 block">{ord.paymentMethod}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                        ord.paymentStatus === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {ord.paymentStatus}
                    </span>
                  </td>

                  <td className="py-3.5 font-bold text-slate-900">
                    <Price amount={ord.grandTotal} size="sm" />
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-3.5">
                    <select
                      value={ord.orderStatus}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatusType)}
                      className={`text-[11px] font-extrabold px-2.5 py-1.5 rounded-xl border outline-none cursor-pointer ${
                        ord.orderStatus === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : ord.orderStatus === 'Cancelled'
                          ? 'bg-rose-50 text-rose-800 border-rose-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL: Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Admin Order Inspector
                </span>
                <h3 className="text-lg font-black text-slate-900 font-mono">
                  {selectedOrder.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-xs">
              {/* Customer & Shipping Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <h4 className="font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-primary" /> Customer Contact
                  </h4>
                  <p className="font-bold text-slate-900">{selectedOrder.customer.name}</p>
                  <p className="text-slate-600">+880 {selectedOrder.customer.phone}</p>
                  {selectedOrder.customer.email && (
                    <p className="text-slate-400 text-[11px]">{selectedOrder.customer.email}</p>
                  )}
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl">
                  <h4 className="font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" /> Shipping Destination
                  </h4>
                  <p className="text-slate-700 font-semibold">{selectedOrder.shippingAddress.fullAddress}</p>
                  <p className="text-slate-500 text-[11px]">
                    {selectedOrder.shippingAddress.upazila}, {selectedOrder.shippingAddress.district}, {selectedOrder.shippingAddress.division}
                  </p>
                </div>
              </div>

              {/* Status Update Banner */}
              <div className="p-4 bg-slate-100/70 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Manage Delivery Status</span>
                  <span className="text-[11px] text-slate-500">Tracking code: {selectedOrder.trackingNumber}</span>
                </div>
                <select
                  value={selectedOrder.orderStatus}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatusType)}
                  className="font-bold px-3 py-1.5 bg-white border border-slate-300 rounded-xl outline-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Items */}
              <div>
                <h4 className="font-bold text-slate-800 mb-2">Ordered Items ({selectedOrder.items.length})</h4>
                <div className="space-y-2 border border-slate-100 rounded-2xl p-3 bg-slate-50/50">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images?.[0] || DEFAULT_PRODUCT_IMAGE}
                          alt={item.product.name}
                          onError={handleProductImageError}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{item.product.name}</p>
                          <p className="text-[11px] text-slate-400">
                            Qty: {item.quantity} • Unit Price: ৳{item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Price amount={item.price * item.quantity} size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Totals */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <Price amount={selectedOrder.subtotal} size="sm" />
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping Fee</span>
                  <span>{selectedOrder.shippingFee === 0 ? 'FREE' : `৳${selectedOrder.shippingFee}`}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-৳{selectedOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-100">
                  <span>Grand Total</span>
                  <Price amount={selectedOrder.grandTotal} size="md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
