import React, { useState } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'What are your delivery charges across Bangladesh?',
    a: 'Inside Dhaka City: ৳60 (Doorstep home delivery within 24-48 hours). Outside Dhaka: ৳120 across all other 63 districts via Steadfast Courier and Pathao (delivered in 3-5 business days). Furthermore, any order total of ৳2,000 or higher qualifies for 100% Free Delivery.'
  },
  {
    q: 'Can I check the product before paying Cash on Delivery (COD)?',
    a: 'Yes! BD Mart actively supports open-box delivery inspections. When the delivery rider arrives at your doorstep, you are welcome to unbox the parcel and verify color, size, and physical condition before completing the cash payment.'
  },
  {
    q: 'How does bKash Direct Tokenized Checkout work?',
    a: 'When you select bKash at checkout, you will be securely redirected to bKash\'s official payment portal. Enter your bKash mobile number and one-time OTP to authenticate. Your PIN is never stored or transmitted to our servers.'
  },
  {
    q: 'What is your return & refund policy?',
    a: 'If you receive a defective, damaged, or incorrect item, you can initiate a return within 7 calendar days. Our courier will pick up the item from your address free of charge. Refunds are processed to your bKash or original payment method within 48 hours.'
  },
  {
    q: 'Can I place an order as a guest without creating an account?',
    a: 'Absolutely. We do not force account registration. Simply provide your full name, 11-digit Bangladeshi mobile number, and address on the checkout page to place an order.'
  },
  {
    q: 'How do I track my order status?',
    a: 'You can visit the "Order Tracking" page at any time and enter your BD Mart Order ID (e.g. BDM-84920) or your phone number to see the live timeline from central warehouse picking to doorstep courier dispatch.'
  }
];

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom max-w-3xl">
        <Breadcrumb items={[{ label: 'Frequently Asked Questions' }]} />

        <div className="text-center my-6">
          <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
            Help & Guidance
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
            Find quick answers about delivery, bKash payments, returns, and ordering in Bangladesh.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10 p-6 bg-white rounded-2xl border border-slate-100 text-xs text-slate-500">
          Still have questions? Our customer care team is online 24/7.{' '}
          <a href="tel:+8801700000000" className="text-primary font-bold hover:underline">
            Call +880 1700-000000
          </a>
        </div>
      </div>
    </div>
  );
};
