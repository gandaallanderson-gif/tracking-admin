import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('clicks')
      .select('country');

    if (error) throw error;

    // Map đầy đủ tất cả mã quốc gia sang tên đầy đủ
    const countryNames = {
      // Châu Á
      'VN': 'Vietnam',
      'CN': 'China',
      'JP': 'Japan',
      'KR': 'South Korea',
      'IN': 'India',
      'ID': 'Indonesia',
      'MY': 'Malaysia',
      'TH': 'Thailand',
      'SG': 'Singapore',
      'PH': 'Philippines',
      'MM': 'Myanmar',
      'KH': 'Cambodia',
      'LA': 'Laos',
      'BN': 'Brunei',
      'TL': 'East Timor',
      'NP': 'Nepal',
      'BD': 'Bangladesh',
      'PK': 'Pakistan',
      'LK': 'Sri Lanka',
      'BT': 'Bhutan',
      'MV': 'Maldives',
      'AF': 'Afghanistan',
      'IR': 'Iran',
      'IQ': 'Iraq',
      'SA': 'Saudi Arabia',
      'YE': 'Yemen',
      'SY': 'Syria',
      'JO': 'Jordan',
      'IL': 'Israel',
      'LB': 'Lebanon',
      'CY': 'Cyprus',
      'TR': 'Turkey',
      'AZ': 'Azerbaijan',
      'GE': 'Georgia',
      'AM': 'Armenia',
      'RU': 'Russia',
      'UZ': 'Uzbekistan',
      'KZ': 'Kazakhstan',
      'TM': 'Turkmenistan',
      'KG': 'Kyrgyzstan',
      'TJ': 'Tajikistan',
      'MN': 'Mongolia',
      'TW': 'Taiwan',
      'HK': 'Hong Kong',
      'MO': 'Macau',
      
      // Châu Âu
      'GB': 'United Kingdom',
      'DE': 'Germany',
      'FR': 'France',
      'IT': 'Italy',
      'ES': 'Spain',
      'PT': 'Portugal',
      'NL': 'Netherlands',
      'BE': 'Belgium',
      'LU': 'Luxembourg',
      'CH': 'Switzerland',
      'AT': 'Austria',
      'DK': 'Denmark',
      'SE': 'Sweden',
      'NO': 'Norway',
      'FI': 'Finland',
      'IS': 'Iceland',
      'IE': 'Ireland',
      'PL': 'Poland',
      'CZ': 'Czech Republic',
      'SK': 'Slovakia',
      'HU': 'Hungary',
      'RO': 'Romania',
      'BG': 'Bulgaria',
      'GR': 'Greece',
      'HR': 'Croatia',
      'SI': 'Slovenia',
      'BA': 'Bosnia and Herzegovina',
      'RS': 'Serbia',
      'ME': 'Montenegro',
      'MK': 'North Macedonia',
      'AL': 'Albania',
      'XK': 'Kosovo',
      'EE': 'Estonia',
      'LV': 'Latvia',
      'LT': 'Lithuania',
      'BY': 'Belarus',
      'UA': 'Ukraine',
      'MD': 'Moldova',
      
      // Châu Mỹ
      'US': 'United States',
      'CA': 'Canada',
      'MX': 'Mexico',
      'BR': 'Brazil',
      'AR': 'Argentina',
      'CL': 'Chile',
      'CO': 'Colombia',
      'PE': 'Peru',
      'VE': 'Venezuela',
      'EC': 'Ecuador',
      'BO': 'Bolivia',
      'PY': 'Paraguay',
      'UY': 'Uruguay',
      'GY': 'Guyana',
      'SR': 'Suriname',
      'GF': 'French Guiana',
      'CR': 'Costa Rica',
      'PA': 'Panama',
      'NI': 'Nicaragua',
      'HN': 'Honduras',
      'SV': 'El Salvador',
      'GT': 'Guatemala',
      'BZ': 'Belize',
      'CU': 'Cuba',
      'JM': 'Jamaica',
      'HT': 'Haiti',
      'DO': 'Dominican Republic',
      'PR': 'Puerto Rico',
      'BS': 'Bahamas',
      'TT': 'Trinidad and Tobago',
      'BB': 'Barbados',
      
      // Châu Phi
      'ZA': 'South Africa',
      'NG': 'Nigeria',
      'EG': 'Egypt',
      'MA': 'Morocco',
      'DZ': 'Algeria',
      'TN': 'Tunisia',
      'LY': 'Libya',
      'SD': 'Sudan',
      'SS': 'South Sudan',
      'ET': 'Ethiopia',
      'KE': 'Kenya',
      'TZ': 'Tanzania',
      'UG': 'Uganda',
      'RW': 'Rwanda',
      'BI': 'Burundi',
      'CD': 'DR Congo',
      'CG': 'Republic of Congo',
      'GA': 'Gabon',
      'CM': 'Cameroon',
      'CF': 'Central African Republic',
      'TD': 'Chad',
      'NE': 'Niger',
      'ML': 'Mali',
      'MR': 'Mauritania',
      'SN': 'Senegal',
      'GM': 'Gambia',
      'GW': 'Guinea-Bissau',
      'GN': 'Guinea',
      'SL': 'Sierra Leone',
      'LR': 'Liberia',
      'CI': 'Ivory Coast',
      'GH': 'Ghana',
      'BF': 'Burkina Faso',
      'BJ': 'Benin',
      'TG': 'Togo',
      'AO': 'Angola',
      'NA': 'Namibia',
      'BW': 'Botswana',
      'ZW': 'Zimbabwe',
      'ZM': 'Zambia',
      'MW': 'Malawi',
      'MZ': 'Mozambique',
      'MG': 'Madagascar',
      'MU': 'Mauritius',
      'KM': 'Comoros',
      'CV': 'Cape Verde',
      'ST': 'Sao Tome and Principe',
      'GQ': 'Equatorial Guinea',
      
      // Châu Đại Dương
      'AU': 'Australia',
      'NZ': 'New Zealand',
      'PG': 'Papua New Guinea',
      'FJ': 'Fiji',
      'SB': 'Solomon Islands',
      'VU': 'Vanuatu',
      'NC': 'New Caledonia',
      'PF': 'French Polynesia',
      'WS': 'Samoa',
      'TO': 'Tonga',
      'KI': 'Kiribati',
      'MH': 'Marshall Islands',
      'FM': 'Micronesia',
      'PW': 'Palau',
      'TV': 'Tuvalu',
      'NR': 'Nauru',
      
      // Trung Đông
      'AE': 'United Arab Emirates',
      'QA': 'Qatar',
      'KW': 'Kuwait',
      'BH': 'Bahrain',
      'OM': 'Oman',
      
      // Các trường hợp đặc biệt
      'Unknown': 'Unknown',
      'null': 'Unknown',
      'undefined': 'Unknown'
    };

    const map = {};
    
    data.forEach(d => {
      // Lấy country code hoặc default
      const countryCode = d.country || 'Unknown';
      // Chuyển sang tên đầy đủ, nếu không có thì giữ nguyên code
      const fullCountryName = countryNames[countryCode] || countryCode;
      map[fullCountryName] = (map[fullCountryName] || 0) + 1;
    });

    // Chuyển object thành array và sắp xếp theo số lượng giảm dần
    // NHƯNG KHÔNG GIỚI HẠN - hiển thị TẤT CẢ
    const allCountries = Object.entries(map)
      .sort((a, b) => b[1] - a[1]); // Sắp xếp từ cao xuống thấp

    res.status(200).json(allCountries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
