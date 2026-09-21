import React, { useState } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Shield, FileText, RotateCcw, Truck } from 'lucide-react';

interface PoliciesProps {
  initialTab?: 'privacy' | 'terms' | 'refund' | 'shipping';
}

export const Policies: React.FC<PoliciesProps> = ({ initialTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'refund' | 'shipping'>(initialTab);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom max-w-4xl">
        <Breadcrumb items={[{ label: 'Legal Policies' }]} />

        {/* Tab Navigation */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 my-6">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'privacy'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Shield className="w-4 h-4" /> Privacy Policy
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'terms'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" /> Terms & Conditions
          </button>

          <button
            onClick={() => setActiveTab('refund')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'refund'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <RotateCcw className="w-4 h-4" /> Return & Refund Policy
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'shipping'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Truck className="w-4 h-4" /> Shipping Policy
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm text-xs sm:text-sm text-slate-700 leading-relaxed space-y-5">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                Privacy Policy for BD Mart Customers
              </h1>
              <p className="text-slate-500">Last updated: 15 September 2026</p>

              <h3 className="font-bold text-slate-900 text-base">1. Information We Collect</h3>
              <p>
                To process your orders and ensure delivery across Bangladesh, BD Mart collects your full name, 11-digit mobile phone number, delivery address (Division, District, Thana), and order preferences.
              </p>

              <h3 className="font-bold text-slate-900 text-base">2. Payment Security & MFS Data</h3>
              <p>
                We do not store your bKash, Nagad, or credit card PINs or CVV numbers. All financial transactions are processed directly through bank-grade tokenized gateway interfaces approved by Bangladesh Bank.
              </p>

              <h3 className="font-bold text-slate-900 text-base">3. Logistics Sharing</h3>
              <p>
                Your phone number and street address are shared with registered courier partners (Steadfast, Pathao, RedX) solely for the purpose of completing parcel delivery.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                Terms and Conditions of Use
              </h1>
              <p className="text-slate-500">Effective Date: 1 January 2026</p>

              <h3 className="font-bold text-slate-900 text-base">1. Ordering & Acceptance</h3>
              <p>
                By placing an order on BD Mart, you confirm that you are at least 18 years old or possess legal guardian consent. We reserve the right to cancel orders with unverified or inactive mobile numbers to prevent fraudulent bookings.
              </p>

              <h3 className="font-bold text-slate-900 text-base">2. Pricing & Currency</h3>
              <p>
                All prices listed on BD Mart are in Bangladeshi Taka (৳) and include applicable national taxes. In the event of an erroneous pricing typo, we will notify the customer prior to dispatch.
              </p>

              <h3 className="font-bold text-slate-900 text-base">3. COD Refusal Policy</h3>
              <p>
                Repeated intentional refusal of legitimate Cash on Delivery parcels without valid cause may result in suspension of COD privileges for the associated phone number.
              </p>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-4">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                Return & Refund Policy (7 Days)
              </h1>
              <p className="text-slate-500">Updated for Seamless Consumer Protection</p>

              <h3 className="font-bold text-slate-900 text-base">1. Eligibility Criteria</h3>
              <p>
                You may request a replacement or full refund within 7 days of receiving your package under the following conditions:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Product is physically damaged or broken during transit.</li>
                <li>Product does not match size, color, or specifications ordered.</li>
                <li>Product exhibits genuine manufacturing defects.</li>
              </ul>

              <h3 className="font-bold text-slate-900 text-base">2. Refund Timeline</h3>
              <p>
                Once our warehouse receives the returned item, inspection takes 24 hours. Refunds are credited to your bKash or Nagad wallet within 48 hours without deduction.
              </p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                Shipping & Delivery Policy
              </h1>
              <p className="text-slate-500">Dhaka & Nationwide Coverage</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 text-sm">Inside Dhaka City</h4>
                  <p className="text-primary font-black text-base mt-1">৳60 Flat Rate</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Delivered within 24 to 48 hours to Dhanmondi, Gulshan, Uttara, Mirpur, and all metro Thanas.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 text-sm">Outside Dhaka (All 63 Districts)</h4>
                  <p className="text-primary font-black text-base mt-1">৳120 Flat Rate</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Delivered within 3 to 5 business days via Steadfast Courier and Pathao with live SMS tracking.
                  </p>
                </div>
              </div>

              <h3 className="font-bold text-slate-900 text-base">Free Delivery Offer:</h3>
              <p>
                Any order containing items totaling <strong>৳2,000 or above</strong> automatically qualifies for <strong>100% Free Nationwide Shipping</strong> regardless of destination!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
