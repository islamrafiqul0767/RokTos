export interface DivisionData {
  id: string;
  nameEn: string;
  nameBn: string;
  districts: {
    id: string;
    nameEn: string;
    nameBn: string;
    upazilas: { id: string; nameEn: string; nameBn: string }[];
  }[];
}

export const BANGLADESH_DIVISIONS: DivisionData[] = [
  {
    id: 'dhaka',
    nameEn: 'Dhaka',
    nameBn: 'ঢাকা',
    districts: [
      {
        id: 'dhaka_city',
        nameEn: 'Dhaka (Metropolitan)',
        nameBn: 'ঢাকা (মেট্রোপলিটন)',
        upazilas: [
          { id: 'mirpur', nameEn: 'Mirpur', nameBn: 'মিরপুর' },
          { id: 'dhanmondi', nameEn: 'Dhanmondi', nameBn: 'ধানমন্ডি' },
          { id: 'uttara', nameEn: 'Uttara', nameBn: 'উত্তরা' },
          { id: 'gulshan', nameEn: 'Gulshan / Banani', nameBn: 'গুলশান / বনানী' },
          { id: 'motijheel', nameEn: 'Motijheel', nameBn: 'মতিঝিল' },
          { id: 'mohammadpur', nameEn: 'Mohammadpur', nameBn: 'মোহাম্মদপুর' },
          { id: 'shahbagh', nameEn: 'Shahbagh / BSMMU Area', nameBn: 'শাহবাগ / পিজি হাসপাতাল এলাকা' },
          { id: 'badda', nameEn: 'Badda / Rampura', nameBn: 'বাড্ডা / রামপুরা' },
          { id: 'old_dhaka', nameEn: 'Old Dhaka / Lalbagh', nameBn: 'পুরান ঢাকা / লালবাগ' },
        ],
      },
      {
        id: 'gazipur',
        nameEn: 'Gazipur',
        nameBn: 'গাজীপুর',
        upazilas: [
          { id: 'gazipur_sadar', nameEn: 'Gazipur Sadar', nameBn: 'গাজীপুর সদর' },
          { id: 'kaliakair', nameEn: 'Kaliakair', nameBn: 'কালিয়াকৈর' },
          { id: 'kapasia', nameEn: 'Kapasia', nameBn: 'কাপাসিয়া' },
          { id: 'sreepur', nameEn: 'Sreepur', nameBn: 'শ্রীপুর' },
        ],
      },
      {
        id: 'narayanganj',
        nameEn: 'Narayanganj',
        nameBn: 'নারায়ণগঞ্জ',
        upazilas: [
          { id: 'narayanganj_sadar', nameEn: 'Narayanganj Sadar', nameBn: 'নারায়ণগঞ্জ সদর' },
          { id: 'fatullah', nameEn: 'Fatullah', nameBn: 'ফতুল্লা' },
          { id: 'rupganj', nameEn: 'Rupganj', nameBn: 'রূপগঞ্জ' },
          { id: 'sonargaon', nameEn: 'Sonargaon', nameBn: 'সোনারগাঁও' },
        ],
      },
      {
        id: 'tangail',
        nameEn: 'Tangail',
        nameBn: 'টাঙ্গাইল',
        upazilas: [
          { id: 'tangail_sadar', nameEn: 'Tangail Sadar', nameBn: 'টাঙ্গাইল সদর' },
          { id: 'mirzapur', nameEn: 'Mirzapur', nameBn: 'মির্জাপুর' },
          { id: 'madhupur', nameEn: 'Madhupur', nameBn: 'মধুপুর' },
        ],
      },
      {
        id: 'faridpur',
        nameEn: 'Faridpur',
        nameBn: 'ফরিদপুর',
        upazilas: [
          { id: 'faridpur_sadar', nameEn: 'Faridpur Sadar', nameBn: 'ফরিদপুর সদর' },
          { id: 'bhanga', nameEn: 'Bhanga', nameBn: 'ভাঙ্গা' },
        ],
      },
    ],
  },
  {
    id: 'chattogram',
    nameEn: 'Chattogram',
    nameBn: 'চট্টগ্রাম',
    districts: [
      {
        id: 'chattogram_city',
        nameEn: 'Chattogram (City & Sadar)',
        nameBn: 'চট্টগ্রাম (মেট্রো ও সদর)',
        upazilas: [
          { id: 'kotwali_ctg', nameEn: 'Kotwali / CMCH Area', nameBn: 'কোতোয়ালী / চমেক এলাকা' },
          { id: 'panchlaish', nameEn: 'Panchlaish', nameBn: 'পাঁচলাইশ' },
          { id: 'halishahar', nameEn: 'Halishahar', nameBn: 'হালিশহর' },
          { id: 'agrabad', nameEn: 'Agrabad', nameBn: 'আগ্রাবাদ' },
          { id: 'hathazari', nameEn: 'Hathazari', nameBn: 'হাটহাজারী' },
        ],
      },
      {
        id: 'coxsbazar',
        nameEn: "Cox's Bazar",
        nameBn: 'কক্সবাজার',
        upazilas: [
          { id: 'cox_sadar', nameEn: 'Sadar', nameBn: 'সদর' },
          { id: 'ramu', nameEn: 'Ramu', nameBn: 'রামু' },
          { id: 'teknaf', nameEn: 'Teknaf', nameBn: 'টেকনাফ' },
        ],
      },
      {
        id: 'cumilla',
        nameEn: 'Cumilla',
        nameBn: 'কুমিল্লা',
        upazilas: [
          { id: 'cumilla_sadar', nameEn: 'Cumilla Adarsha Sadar', nameBn: 'কুমিল্লা আদর্শ সদর' },
          { id: 'daudkandi', nameEn: 'Daudkandi', nameBn: 'দাউদকান্দি' },
          { id: 'laksham', nameEn: 'Laksham', nameBn: 'লাকসাম' },
        ],
      },
      {
        id: 'noakhali',
        nameEn: 'Noakhali',
        nameBn: 'নোয়াখালী',
        upazilas: [
          { id: 'noakhali_sadar', nameEn: 'Noakhali Sadar', nameBn: 'নোয়াখালী সদর' },
          { id: 'begumganj', nameEn: 'Begumganj', nameBn: 'বেগমগঞ্জ' },
        ],
      },
    ],
  },
  {
    id: 'rajshahi',
    nameEn: 'Rajshahi',
    nameBn: 'রাজশাহী',
    districts: [
      {
        id: 'rajshahi_sadar',
        nameEn: 'Rajshahi (Metropolitan & Sadar)',
        nameBn: 'রাজশাহী (মেট্রো ও সদর)',
        upazilas: [
          { id: 'boalia', nameEn: 'Boalia / RMCH Area', nameBn: 'বোয়ালিয়া / রামেক এলাকা' },
          { id: 'motihar', nameEn: 'Motihar', nameBn: 'মতিহার' },
          { id: 'paba', nameEn: 'Paba', nameBn: 'পবা' },
        ],
      },
      {
        id: 'bogura',
        nameEn: 'Bogura',
        nameBn: 'বগুড়া',
        upazilas: [
          { id: 'bogura_sadar', nameEn: 'Bogura Sadar', nameBn: 'বগুড়া সদর' },
          { id: 'sherpur_bogura', nameEn: 'Sherpur', nameBn: 'শেরপুর' },
        ],
      },
      {
        id: 'pabna',
        nameEn: 'Pabna',
        nameBn: 'পাবনা',
        upazilas: [
          { id: 'pabna_sadar', nameEn: 'Pabna Sadar', nameBn: 'পাবনা সদর' },
          { id: 'ishwardi', nameEn: 'Ishwardi', nameBn: 'ঈশ্বরদী' },
        ],
      },
    ],
  },
  {
    id: 'sylhet',
    nameEn: 'Sylhet',
    nameBn: 'সিলেট',
    districts: [
      {
        id: 'sylhet_sadar',
        nameEn: 'Sylhet (City & Sadar)',
        nameBn: 'সিলেট (মেট্রো ও সদর)',
        upazilas: [
          { id: 'sylhet_kotwali', nameEn: 'Kotwali / MAG Osmani Area', nameBn: 'কোতোয়ালী / ওসমানী এলাকা' },
          { id: 'beanibazar', nameEn: 'Beanibazar', nameBn: 'বিয়ানীবাজার' },
          { id: 'golapganj', nameEn: 'Golapganj', nameBn: 'গোলাপগঞ্জ' },
        ],
      },
      {
        id: 'moulvibazar',
        nameEn: 'Moulvibazar',
        nameBn: 'মৌলভীবাজার',
        upazilas: [
          { id: 'moulvibazar_sadar', nameEn: 'Moulvibazar Sadar', nameBn: 'মৌলভীবাজার সদর' },
          { id: 'sreemangal', nameEn: 'Sreemangal', nameBn: 'শ্রীমঙ্গল' },
        ],
      },
    ],
  },
  {
    id: 'khulna',
    nameEn: 'Khulna',
    nameBn: 'খুলনা',
    districts: [
      {
        id: 'khulna_sadar',
        nameEn: 'Khulna (City & Sadar)',
        nameBn: 'খুলনা (মেট্রো ও সদর)',
        upazilas: [
          { id: 'khulna_sadar_upa', nameEn: 'Sadar / KMCH Area', nameBn: 'সদর / খুমেক এলাকা' },
          { id: 'khalishpur', nameEn: 'Khalishpur', nameBn: 'খালিশপুর' },
          { id: 'daulatpur', nameEn: 'Daulatpur', nameBn: 'দৌলতপুর' },
        ],
      },
      {
        id: 'jashore',
        nameEn: 'Jashore',
        nameBn: 'যশোর',
        upazilas: [
          { id: 'jashore_sadar', nameEn: 'Jashore Sadar', nameBn: 'যশোর সদর' },
          { id: 'benapole', nameEn: 'Sharsha / Benapole', nameBn: 'শার্শা / বেনাপোল' },
        ],
      },
      {
        id: 'kushtia',
        nameEn: 'Kushtia',
        nameBn: 'কুষ্টিয়া',
        upazilas: [
          { id: 'kushtia_sadar', nameEn: 'Kushtia Sadar', nameBn: 'কুষ্টিয়া সদর' },
          { id: 'kumarkhali', nameEn: 'Kumarkhali', nameBn: 'কুমারখালী' },
        ],
      },
    ],
  },
  {
    id: 'barishal',
    nameEn: 'Barishal',
    nameBn: 'বরিশাল',
    districts: [
      {
        id: 'barishal_sadar',
        nameEn: 'Barishal (City & Sadar)',
        nameBn: 'বরিশাল (মেট্রো ও সদর)',
        upazilas: [
          { id: 'barishal_kotwali', nameEn: 'Kotwali / SBMCH Area', nameBn: 'কোতোয়ালী / শেবাচিম এলাকা' },
          { id: 'babuganj', nameEn: 'Babuganj', nameBn: 'বাবুগঞ্জ' },
        ],
      },
      {
        id: 'patuakhali',
        nameEn: 'Patuakhali',
        nameBn: 'পটুয়াখালী',
        upazilas: [
          { id: 'patuakhali_sadar', nameEn: 'Patuakhali Sadar', nameBn: 'পটুয়াখালী সদর' },
          { id: 'kalapara', nameEn: 'Kalapara / Kuakata', nameBn: 'কলাপাড়া / কুয়াকাটা' },
        ],
      },
    ],
  },
  {
    id: 'rangpur',
    nameEn: 'Rangpur',
    nameBn: 'রংপুর',
    districts: [
      {
        id: 'rangpur_sadar',
        nameEn: 'Rangpur (City & Sadar)',
        nameBn: 'রংপুর (মেট্রো ও সদর)',
        upazilas: [
          { id: 'rangpur_sadar_upa', nameEn: 'Kotwali / RpMCH Area', nameBn: 'কোতোয়ালী / রমেক এলাকা' },
          { id: 'mithapukur', nameEn: 'Mithapukur', nameBn: 'মিঠাপুকুর' },
        ],
      },
      {
        id: 'dinajpur',
        nameEn: 'Dinajpur',
        nameBn: 'দিনাজপুর',
        upazilas: [
          { id: 'dinajpur_sadar', nameEn: 'Dinajpur Sadar', nameBn: 'দিনাজপুর সদর' },
        ],
      },
    ],
  },
  {
    id: 'mymensingh',
    nameEn: 'Mymensingh',
    nameBn: 'ময়মনসিংহ',
    districts: [
      {
        id: 'mymensingh_sadar',
        nameEn: 'Mymensingh (City & Sadar)',
        nameBn: 'ময়মনসিংহ (মেট্রো ও সদর)',
        upazilas: [
          { id: 'mymensingh_kotwali', nameEn: 'Kotwali / MMCH Area', nameBn: 'কোতোয়ালী / মমেক এলাকা' },
          { id: 'muktagacha', nameEn: 'Muktagacha', nameBn: 'মুক্তাগাছা' },
        ],
      },
      {
        id: 'jamalpur',
        nameEn: 'Jamalpur',
        nameBn: 'জামালপুর',
        upazilas: [
          { id: 'jamalpur_sadar', nameEn: 'Jamalpur Sadar', nameBn: 'জামালপুর সদর' },
        ],
      },
    ],
  },
];

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;
