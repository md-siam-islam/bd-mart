import React, { useState } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { useToast } from '../context/ToastContext';
import { MapPin, PhoneCall, Mail, Clock, Send, MessageSquare } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Order Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been sent to our customer support team!', 'success');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom max-w-5xl">
        <Breadcrumb items={[{ label: 'Contact Us' }]} />

        <div className="text-center my-6">
          <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
            24/7 Helpline & Support
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            We're Here to Help You
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
            Have questions about an order, shipping charges, or returns? Reach out to our dedicated support agents.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Headquarters & Channels
              </h3>

              <div className="flex items-start gap-3 text-xs">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Dhaka Office:</h4>
                  <p className="text-slate-500 mt-0.5 leading-relaxed">
                    Plot 24, Road 11, Block D, Banani Commercial Area, Dhaka-1213, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Helpline:</h4>
                  <p className="text-slate-500 mt-0.5">+880 1700-000000 / +880 1900-000000</p>
                  <span className="text-[11px] text-emerald-600 font-semibold">Available 9:00 AM - 10:00 PM Daily</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Email Support:</h4>
                  <p className="text-slate-500 mt-0.5">support@bdmart.com.bd</p>
                  <span className="text-[11px] text-slate-400">Response within 2 hours</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Warehouse Operations:</h4>
                  <p className="text-slate-500 mt-0.5">Saturday - Thursday: 8:00 AM to 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-5">
              Send us a Message
            </h3>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1">Message Received!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto mb-4 leading-relaxed">
                  Thank you, {form.name}. A customer service representative will call or email you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 bg-primary text-white text-xs font-bold rounded-xl"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full bg-slate-50 text-xs sm:text-sm text-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="017xxxxxxxx"
                      className="w-full bg-slate-50 text-xs sm:text-sm text-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. tanvir@example.com"
                      className="w-full bg-slate-50 text-xs sm:text-sm text-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Inquiry Type
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary outline-none font-semibold"
                    >
                      <option>Order Inquiry</option>
                      <option>Delivery Delay</option>
                      <option>Return & Refund Claim</option>
                      <option>bKash Payment Issue</option>
                      <option>Wholesale & Corporate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1.5">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write details about your query or mention your Order ID..."
                    className="w-full bg-slate-50 text-xs sm:text-sm text-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md shadow-primary/25 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
