import React from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ShieldCheck, Truck, Users, Award, MapPin, CheckCircle2 } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom max-w-4xl">
        <Breadcrumb items={[{ label: 'About Us' }]} />

        {/* Hero Header */}
        <div className="text-center my-8">
          <span className="text-xs font-bold text-primary tracking-wider uppercase block mb-1">
            Our Story & Mission
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Building Bangladesh's Most Reliable E-Commerce Network
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto mt-2 leading-relaxed">
            Founded in Dhaka, BD Mart brings together authentic Bangladeshi heritage craftsmanship with state-of-the-art logistics and consumer protection.
          </p>
        </div>

        {/* Story Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900">Who We Are</h2>
          <p>
            BD Mart is a modern multi-category marketplace engineered specifically to solve the core challenges of online shopping in Bangladesh: counterfeit merchandise, unreliable shipping times, and cumbersome payment systems.
          </p>
          <p>
            We maintain strict quality check standards at our central fulfillment centers in Tejgaon and Uttara. Before any order is handed over to our delivery fleet or courier partners, our inspection team verifies authenticity, seals, and expiration dates.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">100% Genuine Guarantee</h4>
                <p className="text-slate-500 text-xs mt-1">
                  We source directly from authorized manufacturers and verified weavers across Narayanganj, Tangail, and Sirajganj.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
              <Truck className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Nationwide Reach</h4>
                <p className="text-slate-500 text-xs mt-1">
                  From Dhaka city doorstep delivery to remote Upazilas across all 64 districts with Cash on Delivery support.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-900 pt-4">Our Core Pillars</h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Consumer First: Open-box inspection on delivery before paying COD.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Fair Pricing: Transparent delivery fees without hidden surcharges.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Empowering Artisans: Promoting local handloom weavers and organic food growers.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
