import React from 'react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Bell, Truck, Flame, Tag, CheckCircle2 } from 'lucide-react';

export const Notifications: React.FC = () => {
  const notifications = [
    {
      id: 'notif-1',
      title: 'Order Dispatched to Steadfast Courier',
      message: 'Your order #BDM-84920 has been packed at our Tejgaon warehouse and handed over to courier for delivery.',
      time: 'Today, 09:15 AM',
      icon: <Truck className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50',
      unread: true,
    },
    {
      id: 'notif-2',
      title: 'Eid Flash Sale Starts in 2 Hours!',
      message: 'Huge discounts up to 35% on pure silk panjabis and authentic Jamdani sarees.',
      time: 'Yesterday, 04:00 PM',
      icon: <Flame className="w-5 h-5 text-rose-600" />,
      bg: 'bg-rose-50',
      unread: false,
    },
    {
      id: 'notif-3',
      title: 'Special ৳500 Voucher Code Available',
      message: 'Use code SAVE500 on all electronics and home appliances on orders over ৳3,500.',
      time: '14 Sep 2026',
      icon: <Tag className="w-5 h-5 text-primary" />,
      bg: 'bg-blue-50',
      unread: false,
    },
    {
      id: 'notif-4',
      title: 'Delivery Completed',
      message: 'Order #BDM-39142 was successfully delivered to your Dhanmondi address.',
      time: '12 Sep 2026',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50',
      unread: false,
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom max-w-3xl">
        <Breadcrumb
          items={[
            { label: 'My Account', link: '/account' },
            { label: 'Notifications' }
          ]}
        />

        <div className="my-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Notifications Feed
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time status updates on your shipments, coupons, and flash deals.
          </p>
        </div>

        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-5 rounded-2xl bg-white border transition-all flex items-start gap-4 ${
                n.unread ? 'border-primary/40 shadow-sm ring-2 ring-primary/5' : 'border-slate-100'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl ${n.bg} flex items-center justify-center shrink-0`}>
                {n.icon}
              </div>
              <div className="flex-1 min-w-0 text-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-bold text-slate-900">{n.title}</h3>
                  <span className="text-[11px] text-slate-400 shrink-0">{n.time}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{n.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
