// Complete Bangladesh Administrative Hierarchy and Shipping Calculation

export interface GeoLocation {
  id: string;
  name: string;
  nameBn: string;
}

export interface Upazila extends GeoLocation {
  districtId: string;
  isMetro?: boolean;
}

export interface District extends GeoLocation {
  divisionId: string;
  upazilas: Upazila[];
}

export interface Division extends GeoLocation {
  districts: District[];
}

export const DHAKA_METRO_THANAS = new Set([
  'dhanmondi', 'gulshan', 'banani', 'uttara', 'mirpur', 'mohammadpur',
  'badda', 'motijheel', 'paltan', 'khilgaon', 'ramna', 'tejgaon',
  'new-market', 'shahbagh', 'lalbagh', 'sutrapur', 'wari', 'kotwali-dhaka',
  'shampur', 'demra', 'khilkhet', 'kafrul', 'cantonment', 'vatara',
  'hatirjheel', 'adabor', 'darus-salam', 'hazaribagh', 'chawkbazar',
  'kamrangirchar', 'kadamtali', 'gandaria', 'rampura', 'bashundhara'
]);

export const BANGLADESH_DIVISIONS: Division[] = [
  {
    id: 'dhaka',
    name: 'Dhaka',
    nameBn: 'ঢাকা',
    districts: [
      {
        id: 'dhaka-city',
        divisionId: 'dhaka',
        name: 'Dhaka (City & Suburbs)',
        nameBn: 'ঢাকা (সিটি ও উপশহর)',
        upazilas: [
          { id: 'dhanmondi', districtId: 'dhaka-city', name: 'Dhanmondi', nameBn: 'ধানমন্ডি', isMetro: true },
          { id: 'gulshan', districtId: 'dhaka-city', name: 'Gulshan / Banani', nameBn: 'গুলশান / বনানী', isMetro: true },
          { id: 'uttara', districtId: 'dhaka-city', name: 'Uttara', nameBn: 'উত্তরা', isMetro: true },
          { id: 'mirpur', districtId: 'dhaka-city', name: 'Mirpur', nameBn: 'মিরপুর', isMetro: true },
          { id: 'mohammadpur', districtId: 'dhaka-city', name: 'Mohammadpur', nameBn: 'মোহাম্মদপুর', isMetro: true },
          { id: 'badda', districtId: 'dhaka-city', name: 'Badda / Rampura', nameBn: 'বাড্ডা / রামপুরা', isMetro: true },
          { id: 'motijheel', districtId: 'dhaka-city', name: 'Motijheel / Dilkusha', nameBn: 'মতিঝিল / দিলকুশা', isMetro: true },
          { id: 'bashundhara', districtId: 'dhaka-city', name: 'Bashundhara R/A', nameBn: 'বসুন্ধরা আ/এ', isMetro: true },
          { id: 'tejgaon', districtId: 'dhaka-city', name: 'Tejgaon / Farmgate', nameBn: 'তেজগাঁও / ফার্মগেট', isMetro: true },
          { id: 'khilgaon', districtId: 'dhaka-city', name: 'Khilgaon / Malibagh', nameBn: 'খিলগাঁও / মালিবাগ', isMetro: true },
          { id: 'old-dhaka', districtId: 'dhaka-city', name: 'Old Dhaka (Kotwali, Lalbagh)', nameBn: 'পুরান ঢাকা', isMetro: true },
          { id: 'savar', districtId: 'dhaka-city', name: 'Savar', nameBn: 'সাভার', isMetro: false },
          { id: 'keraniganj', districtId: 'dhaka-city', name: 'Keraniganj', nameBn: 'কেরানীগঞ্জ', isMetro: false },
          { id: 'dhamrai', districtId: 'dhaka-city', name: 'Dhamrai', nameBn: 'ধামরাই', isMetro: false },
        ]
      },
      {
        id: 'gazipur',
        divisionId: 'dhaka',
        name: 'Gazipur',
        nameBn: 'গাজীপুর',
        upazilas: [
          { id: 'gazipur-sadar', districtId: 'gazipur', name: 'Gazipur Sadar / Joydebpur', nameBn: 'গাজীপুর সদর' },
          { id: 'tongi', districtId: 'gazipur', name: 'Tongi', nameBn: 'টঙ্গী' },
          { id: 'kaliakair', districtId: 'gazipur', name: 'Kaliakair', nameBn: 'কালিয়াকৈর' },
          { id: 'sreepur', districtId: 'gazipur', name: 'Sreepur', nameBn: 'শ্রীপুর' }
        ]
      },
      {
        id: 'narayanganj',
        divisionId: 'dhaka',
        name: 'Narayanganj',
        nameBn: 'নারায়ণগঞ্জ',
        upazilas: [
          { id: 'narayanganj-sadar', districtId: 'narayanganj', name: 'Narayanganj Sadar', nameBn: 'নারায়ণগঞ্জ সদর' },
          { id: 'fatullah', districtId: 'narayanganj', name: 'Fatullah', nameBn: 'ফতুল্লা' },
          { id: 'siddhirganj', districtId: 'narayanganj', name: 'Siddhirganj', nameBn: 'সিদ্ধিরগঞ্জ' },
          { id: 'rupganj', districtId: 'narayanganj', name: 'Rupganj', nameBn: 'রূপগঞ্জ' }
        ]
      }
    ]
  },
  {
    id: 'chattogram',
    name: 'Chattogram',
    nameBn: 'চট্টগ্রাম',
    districts: [
      {
        id: 'chattogram-city',
        divisionId: 'chattogram',
        name: 'Chattogram Metro',
        nameBn: 'চট্টগ্রাম মেট্রো',
        upazilas: [
          { id: 'kotwali-ctg', districtId: 'chattogram-city', name: 'Kotwali', nameBn: 'কোতোয়ালী' },
          { id: 'panchlaish', districtId: 'chattogram-city', name: 'Panchlaish', nameBn: 'পাঁচলাইশ' },
          { id: 'halishahar', districtId: 'chattogram-city', name: 'Halishahar', nameBn: 'হালিশহর' },
          { id: 'agrabad', districtId: 'chattogram-city', name: 'Agrabad', nameBn: 'আগ্রাবাদ' }
        ]
      },
      {
        id: 'coxs-bazar',
        divisionId: 'chattogram',
        name: "Cox's Bazar",
        nameBn: 'কক্সবাজার',
        upazilas: [
          { id: 'cox-sadar', districtId: 'coxs-bazar', name: "Cox's Bazar Sadar", nameBn: 'কক্সবাজার সদর' },
          { id: 'ramu', districtId: 'coxs-bazar', name: 'Ramu', nameBn: 'রামু' }
        ]
      },
      {
        id: 'cumilla',
        divisionId: 'chattogram',
        name: 'Cumilla',
        nameBn: 'কুমিল্লা',
        upazilas: [
          { id: 'cumilla-sadar', districtId: 'cumilla', name: 'Cumilla Adarsha Sadar', nameBn: 'কুমিল্লা সদর' },
          { id: 'daudkandi', districtId: 'cumilla', name: 'Daudkandi', nameBn: 'দাউদকান্দি' }
        ]
      }
    ]
  },
  {
    id: 'sylhet',
    name: 'Sylhet',
    nameBn: 'সিলেট',
    districts: [
      {
        id: 'sylhet-sadar-dist',
        divisionId: 'sylhet',
        name: 'Sylhet District',
        nameBn: 'সিলেট',
        upazilas: [
          { id: 'sylhet-sadar', districtId: 'sylhet-sadar-dist', name: 'Sylhet Sadar / Zindabazar', nameBn: 'সিলেট সদর / জিন্দাবাজার' },
          { id: 'beanibazar', districtId: 'sylhet-sadar-dist', name: 'Beanibazar', nameBn: 'বিয়ানীবাজার' }
        ]
      }
    ]
  },
  {
    id: 'rajshahi',
    name: 'Rajshahi',
    nameBn: 'রাজশাহী',
    districts: [
      {
        id: 'rajshahi-district',
        divisionId: 'rajshahi',
        name: 'Rajshahi District',
        nameBn: 'রাজশাহী',
        upazilas: [
          { id: 'boalia', districtId: 'rajshahi-district', name: 'Boalia', nameBn: 'বোয়ালিয়া' },
          { id: 'rajpara', districtId: 'rajshahi-district', name: 'Rajpara', nameBn: 'রাজপাড়া' }
        ]
      },
      {
        id: 'bogura',
        divisionId: 'rajshahi',
        name: 'Bogura',
        nameBn: 'বগুড়া',
        upazilas: [
          { id: 'bogura-sadar', districtId: 'bogura', name: 'Bogura Sadar', nameBn: 'বগুড়া সদর' }
        ]
      }
    ]
  },
  {
    id: 'khulna',
    name: 'Khulna',
    nameBn: 'খুলনা',
    districts: [
      {
        id: 'khulna-district',
        divisionId: 'khulna',
        name: 'Khulna District',
        nameBn: 'খুলনা',
        upazilas: [
          { id: 'khulna-sadar', districtId: 'khulna-district', name: 'Khulna Sadar', nameBn: 'খুলনা সদর' },
          { id: 'sonadanga', districtId: 'khulna-district', name: 'Sonadanga', nameBn: 'সোনাডাঙ্গা' }
        ]
      },
      {
        id: 'jashore',
        divisionId: 'khulna',
        name: 'Jashore',
        nameBn: 'যশোর',
        upazilas: [
          { id: 'jashore-sadar', districtId: 'jashore', name: 'Jashore Sadar', nameBn: 'যশোর সদর' }
        ]
      }
    ]
  },
  {
    id: 'barishal',
    name: 'Barishal',
    nameBn: 'বরিশাল',
    districts: [
      {
        id: 'barishal-district',
        divisionId: 'barishal',
        name: 'Barishal District',
        nameBn: 'বরিশাল',
        upazilas: [
          { id: 'barishal-sadar', districtId: 'barishal-district', name: 'Barishal Sadar / Kotwali', nameBn: 'বরিশাল সদর' }
        ]
      }
    ]
  },
  {
    id: 'rangpur',
    name: 'Rangpur',
    nameBn: 'রংপুর',
    districts: [
      {
        id: 'rangpur-district',
        divisionId: 'rangpur',
        name: 'Rangpur District',
        nameBn: 'রংপুর',
        upazilas: [
          { id: 'rangpur-sadar', districtId: 'rangpur-district', name: 'Rangpur Sadar', nameBn: 'রংপুর সদর' }
        ]
      }
    ]
  },
  {
    id: 'mymensingh',
    name: 'Mymensingh',
    nameBn: 'ময়মনসিংহ',
    districts: [
      {
        id: 'mymensingh-district',
        divisionId: 'mymensingh',
        name: 'Mymensingh District',
        nameBn: 'ময়মনসিংহ',
        upazilas: [
          { id: 'mymensingh-sadar', districtId: 'mymensingh-district', name: 'Mymensingh Sadar', nameBn: 'ময়মনসিংহ সদর' }
        ]
      }
    ]
  }
];

export type ShippingZone = 'inside_dhaka' | 'outside_dhaka';

export function determineShippingZone(divisionId: string, districtId: string, upazilaId?: string): ShippingZone {
  if (divisionId === 'dhaka' && districtId === 'dhaka-city') {
    if (!upazilaId) return 'inside_dhaka';
    const cleanThana = upazilaId.toLowerCase();
    if (DHAKA_METRO_THANAS.has(cleanThana)) {
      return 'inside_dhaka';
    }
  }
  return 'outside_dhaka';
}

export function calculateShippingFee(subtotal: number, zone: ShippingZone): number {
  if (subtotal >= 2000) {
    return 0; // Free delivery over ৳2,000
  }
  return zone === 'inside_dhaka' ? 60 : 120;
}

export function validateBDPhoneNumber(phone: string): { isValid: boolean; formatted: string } {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  const regex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
  const match = cleaned.match(regex);

  if (match && match[1]) {
    return { isValid: true, formatted: match[1] };
  }
  return { isValid: false, formatted: cleaned };
}
