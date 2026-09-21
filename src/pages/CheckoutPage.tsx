import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Price } from '../components/common/Price';
import {
  BANGLADESH_DIVISIONS,
  determineShippingZone,
  validateBDPhoneNumber,
  ShippingZone,
} from '../data/bangladesh-geo';
import { PaymentMethodType } from '../types';
import {
  Check,
  Truck,
  ShieldCheck,
  CreditCard,
  Banknote,
  Smartphone,
  ArrowRight,
  ArrowLeft,
  Lock,
  Building,
  Home
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutPage: React.FC = () => {
  const {
    items,
    subtotal,
    discountAmount,
    appliedCoupon,
    clearCart,
  } = useCart();

  const { user, createOrder } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Multi-step indicator (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields
  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');

  // Address Fields
  const [divisionId, setDivisionId] = useState('dhaka');
  const [districtId, setDistrictId] = useState('dhaka-city');
  const [upazilaId, setUpazilaId] = useState('dhanmondi');
  const [streetAddress, setStreetAddress] = useState(
    user?.addresses?.[0]?.fullAddress || ''
  );
  const [instructions, setInstructions] = useState('');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('COD');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cascading Geography Handlers
  const selectedDivision = useMemo(() => {
    return BANGLADESH_DIVISIONS.find((d) => d.id === divisionId);
  }, [divisionId]);

  const availableDistricts = useMemo(() => {
    return selectedDivision?.districts || [];
  }, [selectedDivision]);

  const selectedDistrict = useMemo(() => {
    return availableDistricts.find((dist) => dist.id === districtId);
  }, [availableDistricts, districtId]);

  const availableUpazilas = useMemo(() => {
    return selectedDistrict?.upazilas || [];
  }, [selectedDistrict]);

  // Dynamic Shipping Zone & Fee Calculation
  const currentZone: ShippingZone = useMemo(() => {
    return determineShippingZone(divisionId, districtId, upazilaId);
  }, [divisionId, districtId, upazilaId]);

  const shippingFee = useMemo(() => {
    if (subtotal >= 2000) return 0;
    return currentZone === 'inside_dhaka' ? 60 : 120;
  }, [subtotal, currentZone]);

  const grandTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  const handleDivisionChange = (divId: string) => {
    setDivisionId(divId);
    const div = BANGLADESH_DIVISIONS.find((d) => d.id === divId);
    if (div && div.districts.length > 0) {
      setDistrictId(div.districts[0].id);
      if (div.districts[0].upazilas.length > 0) {
        setUpazilaId(div.districts[0].upazilas[0].id);
      } else {
        setUpazilaId('');
      }
    }
  };

  const handleDistrictChange = (distId: string) => {
    setDistrictId(distId);
    const dist = availableDistricts.find((d) => d.id === distId);
    if (dist && dist.upazilas.length > 0) {
      setUpazilaId(dist.upazilas[0].id);
    } else {
      setUpazilaId('');
    }
  };

  // Step Navigations & Validations
  const handleNextFromStep1 = () => {
    if (!fullName.trim()) {
      showToast('Please enter your full name', 'error');
      return;
    }
    const phoneCheck = validateBDPhoneNumber(phone);
    if (!phoneCheck.isValid) {
      showToast('Please enter a valid 11-digit Bangladeshi mobile number (013-019)', 'error');
      return;
    }
    setCurrentStep(2);
  };

  const handleNextFromStep2 = () => {
    if (!streetAddress.trim() || streetAddress.trim().length < 6) {
      showToast('Please provide your complete street/house address', 'error');
      return;
    }
    setCurrentStep(3);
  };

  const handlePlaceOrder = () => {
    setIsSubmitting(true);

    try {
      const order = createOrder({
        customer: {
          name: fullName,
          phone: validateBDPhoneNumber(phone).formatted,
          email: email || undefined,
        },
        shippingAddress: {
          division: selectedDivision?.name || 'Dhaka',
          district: selectedDistrict?.name || 'Dhaka',
          upazila: availableUpazilas.find((u) => u.id === upazilaId)?.name || upazilaId,
          fullAddress: streetAddress,
          instructions: instructions || undefined,
        },
        items: items,
        subtotal,
        shippingFee,
        discount: discountAmount,
        couponCode: appliedCoupon?.code,
        grandTotal,
        paymentMethod,
      });

      // Trigger festive celebration confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      clearCart();
      navigate(`/order-success/${order.id}`);
    } catch (err) {
      showToast('Failed to process order. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsList = [
    'Customer Info',
    'Shipping Address',
    'Delivery Zone',
    'Payment Method',
    'Order Review'
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-6">
      <div className="container-custom">
        <Breadcrumb items={[{ label: 'Cart', link: '/cart' }, { label: 'Checkout' }]} />

        <div className="max-w-5xl mx-auto mt-4 mb-12">
          {/* Step Progress Bar */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm mb-8">
            <div className="hidden sm:flex items-center justify-between relative">
              {/* Connector line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-300"
                style={{
                  width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%`,
                }}
              />

              {stepsList.map((step, idx) => {
                const stepNum = idx + 1;
                const isCompleted = currentStep > stepNum;
                const isCurrent = currentStep === stepNum;

                return (
                  <div key={idx} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 text-white'
                          : isCurrent
                          ? 'bg-primary text-white ring-4 ring-primary/20'
                          : 'bg-white text-slate-400 border-2 border-slate-200'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                    </div>
                    <span
                      className={`text-[11px] font-bold mt-2 ${
                        isCurrent ? 'text-primary' : 'text-slate-500'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Mobile simplified progress indicator */}
            <div className="sm:hidden flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Step {currentStep} of 5:</span>
              <span className="text-primary">{stepsList[currentStep - 1]}</span>
            </div>
          </div>

          {/* Checkout Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Form (col-span-7) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
              {/* STEP 1: Customer Information */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
                    Step 1: Contact Information
                  </h2>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full bg-slate-50 text-xs sm:text-sm text-slate-800 px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Bangladeshi Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex items-center">
                      <span className="bg-slate-100 border border-r-0 border-slate-200 text-slate-600 px-3 py-3 rounded-l-xl text-xs sm:text-sm font-bold">
                        🇧🇩 +880
                      </span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="17xxxxxxxx"
                        className="flex-1 bg-slate-50 text-xs sm:text-sm text-slate-800 px-4 py-3 rounded-r-xl border border-slate-200 focus:border-primary outline-none"
                      />
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      We will verify your order & send parcel tracking updates via SMS.
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. tanvir@example.com"
                      className="w-full bg-slate-50 text-xs sm:text-sm text-slate-800 px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none"
                    />
                  </div>

                  <button
                    onClick={handleNextFromStep1}
                    className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 mt-4"
                  >
                    Continue to Shipping Address <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP 2: Shipping Address with BD Geographic Hierarchy */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
                    Step 2: Shipping Address
                  </h2>

                  {/* Division, District, Thana Dropdowns */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1.5">
                        Division <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={divisionId}
                        onChange={(e) => handleDivisionChange(e.target.value)}
                        className="w-full bg-slate-50 text-xs text-slate-800 px-3 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none font-semibold"
                      >
                        {BANGLADESH_DIVISIONS.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} ({d.nameBn})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1.5">
                        District <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={districtId}
                        onChange={(e) => handleDistrictChange(e.target.value)}
                        className="w-full bg-slate-50 text-xs text-slate-800 px-3 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none font-semibold"
                      >
                        {availableDistricts.map((dist) => (
                          <option key={dist.id} value={dist.id}>
                            {dist.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1.5">
                        Upazila / Thana <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={upazilaId}
                        onChange={(e) => setUpazilaId(e.target.value)}
                        className="w-full bg-slate-50 text-xs text-slate-800 px-3 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none font-semibold"
                      >
                        {availableUpazilas.map((up) => (
                          <option key={up.id} value={up.id}>
                            {up.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Detailed Street Address (House, Road, Area) <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="e.g. House #24, Road #7/A, Block #C, Dhanmondi"
                      className="w-full bg-slate-50 text-xs sm:text-sm text-slate-800 px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none"
                    />
                  </div>

                  {/* Delivery Instructions */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      placeholder="e.g. Call before delivery, leave with security guard"
                      className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary outline-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-3 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50"
                    >
                      <ArrowLeft className="w-4 h-4 inline mr-1" /> Back
                    </button>
                    <button
                      onClick={handleNextFromStep2}
                      className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      Next: Delivery Method <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Delivery Zone Method */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
                    Step 3: Delivery Zone & Speed
                  </h2>

                  <div className="space-y-3">
                    {/* Inside Dhaka Option */}
                    <div
                      className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                        currentZone === 'inside_dhaka'
                          ? 'border-primary bg-blue-50/40'
                          : 'border-slate-200 bg-white opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                          <Home className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            Inside Dhaka City Delivery
                          </div>
                          <span className="text-[11px] text-slate-500">
                            Estimated 1 to 2 Working Days (Doorstep)
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-slate-900">
                        {subtotal >= 2000 ? (
                          <span className="text-emerald-600">FREE</span>
                        ) : (
                          '৳60'
                        )}
                      </span>
                    </div>

                    {/* Outside Dhaka Option */}
                    <div
                      className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                        currentZone === 'outside_dhaka'
                          ? 'border-primary bg-blue-50/40'
                          : 'border-slate-200 bg-white opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
                          <Building className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            Outside Dhaka (Nationwide Courier)
                          </div>
                          <span className="text-[11px] text-slate-500">
                            Estimated 3 to 5 Working Days via Steadfast / Pathao
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-slate-900">
                        {subtotal >= 2000 ? (
                          <span className="text-emerald-600">FREE</span>
                        ) : (
                          '৳120'
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-3 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50"
                    >
                      <ArrowLeft className="w-4 h-4 inline mr-1" /> Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(4)}
                      className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      Next: Payment Method <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Payment Method */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
                    Step 4: Select Payment Method
                  </h2>

                  <div className="space-y-3">
                    {/* Cash on Delivery */}
                    <div
                      onClick={() => setPaymentMethod('COD')}
                      className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === 'COD'
                          ? 'border-primary bg-primary/5 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                          <Banknote className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            Cash on Delivery (COD)
                            <span className="bg-emerald-100 text-emerald-700 text-[10px] px-1.5 py-0.5 rounded font-bold">
                              Popular
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500">
                            Pay cash when your order arrives at your doorstep.
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'COD' ? 'border-primary' : 'border-slate-300'
                        }`}
                      >
                        {paymentMethod === 'COD' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </div>
                    </div>

                    {/* bKash */}
                    <div
                      onClick={() => setPaymentMethod('BKASH')}
                      className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === 'BKASH'
                          ? 'border-pink-600 bg-pink-50/50 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-600 text-white font-extrabold flex items-center justify-center text-xs">
                          bKash
                        </div>
                        <div>
                          <div className="text-xs font-bold text-pink-700">
                            bKash Online Payment
                          </div>
                          <span className="text-[11px] text-slate-500">
                            Pay instantly with bKash Tokenized Checkout Gateway.
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'BKASH' ? 'border-pink-600' : 'border-slate-300'
                        }`}
                      >
                        {paymentMethod === 'BKASH' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-pink-600" />
                        )}
                      </div>
                    </div>

                    {/* Nagad */}
                    <div
                      onClick={() => setPaymentMethod('NAGAD')}
                      className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === 'NAGAD'
                          ? 'border-orange-600 bg-orange-50/50 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-600 text-white font-extrabold flex items-center justify-center text-xs">
                          Nagad
                        </div>
                        <div>
                          <div className="text-xs font-bold text-orange-700">
                            Nagad Payment
                          </div>
                          <span className="text-[11px] text-slate-500">
                            Direct Nagad MFS mobile transaction.
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'NAGAD' ? 'border-orange-600' : 'border-slate-300'
                        }`}
                      >
                        {paymentMethod === 'NAGAD' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-orange-600" />
                        )}
                      </div>
                    </div>

                    {/* Credit / Debit Card */}
                    <div
                      onClick={() => setPaymentMethod('CARD')}
                      className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === 'CARD'
                          ? 'border-primary bg-primary/5 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-primary flex items-center justify-center">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            Visa / Mastercard / Amex
                          </div>
                          <span className="text-[11px] text-slate-500">
                            Secure local and international card gateway.
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'CARD' ? 'border-primary' : 'border-slate-300'
                        }`}
                      >
                        {paymentMethod === 'CARD' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="px-5 py-3 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50"
                    >
                      <ArrowLeft className="w-4 h-4 inline mr-1" /> Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(5)}
                      className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      Review Order <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: Final Review & Place Order */}
              {currentStep === 5 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
                    Step 5: Review & Place Order
                  </h2>

                  <div className="space-y-4 text-xs">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-1">Customer & Shipping:</h4>
                      <p className="text-slate-700 font-semibold">{fullName} • +880 {phone}</p>
                      <p className="text-slate-500 mt-1">
                        {streetAddress}, {availableUpazilas.find((u) => u.id === upazilaId)?.name},{' '}
                        {selectedDistrict?.name}, {selectedDivision?.name}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-1">Selected Payment:</h4>
                      <p className="text-slate-700 font-bold uppercase">
                        {paymentMethod === 'COD'
                          ? '💵 Cash on Delivery (Pay upon arrival)'
                          : paymentMethod === 'BKASH'
                          ? '⚡ bKash Instant Payment'
                          : paymentMethod === 'NAGAD'
                          ? '📱 Nagad Mobile Banking'
                          : '💳 Card Payment'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={() => setCurrentStep(4)}
                      className="px-5 py-3 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50"
                    >
                      <ArrowLeft className="w-4 h-4 inline mr-1" /> Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isSubmitting}
                      className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-black transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        'Processing Order...'
                      ) : (
                        <>
                          <Lock className="w-4 h-4" /> Confirm & Place Order (৳{grandTotal.toLocaleString()})
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side: Order Summary Sticky Card (col-span-5) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm sticky top-24 space-y-5">
              <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
                Order Items ({items.reduce((s, i) => s + i.quantity, 0)})
              </h3>

              {/* Items Thumbnails */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-xl object-cover bg-slate-50 border border-slate-100 shrink-0"
                      />
                      <div className="truncate">
                        <p className="font-bold text-slate-900 truncate">{item.product.name}</p>
                        <p className="text-slate-400 text-[11px]">
                          Qty: {item.quantity} {item.selectedSize ? `• ${item.selectedSize}` : ''}
                        </p>
                      </div>
                    </div>
                    <Price amount={item.price * item.quantity} size="sm" />
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <Price amount={subtotal} size="sm" />
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Delivery ({currentZone === 'inside_dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'}):</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong className="text-emerald-600">FREE</strong>
                    ) : (
                      `৳${shippingFee}`
                    )}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 font-bold">
                    <span>Discount ({appliedCoupon?.code}):</span>
                    <span>- ৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
                  <span className="font-black text-slate-900">Total Payable:</span>
                  <Price amount={grandTotal} size="lg" />
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero-risk ordering with cash on delivery & open-box checks.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
