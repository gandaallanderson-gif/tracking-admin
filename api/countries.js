export default async function handler(req, res) {
  try {
    // Fetch dữ liệu từ Supabase
    const response = await fetch(
      "https://xaeyujupphagmklxtnsf.supabase.co/rest/v1/clicks?select=country",
      {
        headers: {
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZXl1anVwcGhhZ21rbHh0bnNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NTI1MjMsImV4cCI6MjA4ODAyODUyM30.LwXh6RJx2x0i_rAfUnzO-ZTn2VLoVPKunku5A24SYHE",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZXl1anVwcGhhZ21rbHh0bnNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NTI1MjMsImV4cCI6MjA4ODAyODUyM30.LwXh6RJx2x0i_rAfUnzO-ZTn2VLoVPKunku5A24SYHE"
        }
      }
    );

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch data from Supabase' });
    }

    const data = await response.json();

    // Map đầy đủ tất cả mã quốc gia 2 ký tự sang tên tiếng Anh
    const countryNames = {
      // Châu Á (Asia)
      'AF': 'Afghanistan',
      'AM': 'Armenia',
      'AZ': 'Azerbaijan',
      'BH': 'Bahrain',
      'BD': 'Bangladesh',
      'BT': 'Bhutan',
      'BN': 'Brunei',
      'KH': 'Cambodia',
      'CN': 'China',
      'CY': 'Cyprus',
      'GE': 'Georgia',
      'IN': 'India',
      'ID': 'Indonesia',
      'IR': 'Iran',
      'IQ': 'Iraq',
      'IL': 'Israel',
      'JP': 'Japan',
      'JO': 'Jordan',
      'KZ': 'Kazakhstan',
      'KW': 'Kuwait',
      'KG': 'Kyrgyzstan',
      'LA': 'Laos',
      'LB': 'Lebanon',
      'MY': 'Malaysia',
      'MV': 'Maldives',
      'MN': 'Mongolia',
      'MM': 'Myanmar',
      'NP': 'Nepal',
      'KP': 'North Korea',
      'OM': 'Oman',
      'PK': 'Pakistan',
      'PS': 'Palestine',
      'PH': 'Philippines',
      'QA': 'Qatar',
      'SA': 'Saudi Arabia',
      'SG': 'Singapore',
      'KR': 'South Korea',
      'LK': 'Sri Lanka',
      'SY': 'Syria',
      'TW': 'Taiwan',
      'TJ': 'Tajikistan',
      'TH': 'Thailand',
      'TL': 'Timor-Leste',
      'TR': 'Turkey',
      'TM': 'Turkmenistan',
      'AE': 'United Arab Emirates',
      'UZ': 'Uzbekistan',
      'VN': 'Vietnam',
      'YE': 'Yemen',

      // Châu Âu (Europe)
      'AL': 'Albania',
      'AD': 'Andorra',
      'AT': 'Austria',
      'BY': 'Belarus',
      'BE': 'Belgium',
      'BA': 'Bosnia and Herzegovina',
      'BG': 'Bulgaria',
      'HR': 'Croatia',
      'CZ': 'Czech Republic',
      'DK': 'Denmark',
      'EE': 'Estonia',
      'FI': 'Finland',
      'FR': 'France',
      'DE': 'Germany',
      'GR': 'Greece',
      'HU': 'Hungary',
      'IS': 'Iceland',
      'IE': 'Ireland',
      'IT': 'Italy',
      'XK': 'Kosovo',
      'LV': 'Latvia',
      'LI': 'Liechtenstein',
      'LT': 'Lithuania',
      'LU': 'Luxembourg',
      'MT': 'Malta',
      'MD': 'Moldova',
      'MC': 'Monaco',
      'ME': 'Montenegro',
      'NL': 'Netherlands',
      'MK': 'North Macedonia',
      'NO': 'Norway',
      'PL': 'Poland',
      'PT': 'Portugal',
      'RO': 'Romania',
      'RU': 'Russia',
      'SM': 'San Marino',
      'RS': 'Serbia',
      'SK': 'Slovakia',
      'SI': 'Slovenia',
      'ES': 'Spain',
      'SE': 'Sweden',
      'CH': 'Switzerland',
      'UA': 'Ukraine',
      'GB': 'United Kingdom',
      'VA': 'Vatican City',

      // Châu Mỹ (Americas)
      'AI': 'Anguilla',
      'AG': 'Antigua and Barbuda',
      'AR': 'Argentina',
      'AW': 'Aruba',
      'BS': 'Bahamas',
      'BB': 'Barbados',
      'BZ': 'Belize',
      'BM': 'Bermuda',
      'BO': 'Bolivia',
      'BQ': 'Bonaire',
      'BR': 'Brazil',
      'VG': 'British Virgin Islands',
      'CA': 'Canada',
      'KY': 'Cayman Islands',
      'CL': 'Chile',
      'CO': 'Colombia',
      'CR': 'Costa Rica',
      'CU': 'Cuba',
      'CW': 'Curaçao',
      'DM': 'Dominica',
      'DO': 'Dominican Republic',
      'EC': 'Ecuador',
      'SV': 'El Salvador',
      'FK': 'Falkland Islands',
      'GF': 'French Guiana',
      'GL': 'Greenland',
      'GD': 'Grenada',
      'GP': 'Guadeloupe',
      'GT': 'Guatemala',
      'GY': 'Guyana',
      'HT': 'Haiti',
      'HN': 'Honduras',
      'JM': 'Jamaica',
      'MQ': 'Martinique',
      'MX': 'Mexico',
      'MS': 'Montserrat',
      'NI': 'Nicaragua',
      'PA': 'Panama',
      'PY': 'Paraguay',
      'PE': 'Peru',
      'PR': 'Puerto Rico',
      'BL': 'Saint Barthélemy',
      'KN': 'Saint Kitts and Nevis',
      'LC': 'Saint Lucia',
      'MF': 'Saint Martin',
      'PM': 'Saint Pierre and Miquelon',
      'VC': 'Saint Vincent and the Grenadines',
      'SX': 'Sint Maarten',
      'SR': 'Suriname',
      'TT': 'Trinidad and Tobago',
      'TC': 'Turks and Caicos Islands',
      'US': 'United States',
      'UY': 'Uruguay',
      'VE': 'Venezuela',
      'VI': 'U.S. Virgin Islands',

      // Châu Phi (Africa)
      'DZ': 'Algeria',
      'AO': 'Angola',
      'BJ': 'Benin',
      'BW': 'Botswana',
      'BF': 'Burkina Faso',
      'BI': 'Burundi',
      'CV': 'Cabo Verde',
      'CM': 'Cameroon',
      'CF': 'Central African Republic',
      'TD': 'Chad',
      'KM': 'Comoros',
      'CG': 'Congo',
      'CD': 'DR Congo',
      'DJ': 'Djibouti',
      'EG': 'Egypt',
      'GQ': 'Equatorial Guinea',
      'ER': 'Eritrea',
      'SZ': 'Eswatini',
      'ET': 'Ethiopia',
      'GA': 'Gabon',
      'GM': 'Gambia',
      'GH': 'Ghana',
      'GN': 'Guinea',
      'GW': 'Guinea-Bissau',
      'CI': 'Ivory Coast',
      'KE': 'Kenya',
      'LS': 'Lesotho',
      'LR': 'Liberia',
      'LY': 'Libya',
      'MG': 'Madagascar',
      'MW': 'Malawi',
      'ML': 'Mali',
      'MR': 'Mauritania',
      'MU': 'Mauritius',
      'MA': 'Morocco',
      'MZ': 'Mozambique',
      'NA': 'Namibia',
      'NE': 'Niger',
      'NG': 'Nigeria',
      'RW': 'Rwanda',
      'ST': 'Sao Tome and Principe',
      'SN': 'Senegal',
      'SC': 'Seychelles',
      'SL': 'Sierra Leone',
      'SO': 'Somalia',
      'ZA': 'South Africa',
      'SS': 'South Sudan',
      'SD': 'Sudan',
      'TZ': 'Tanzania',
      'TG': 'Togo',
      'TN': 'Tunisia',
      'UG': 'Uganda',
      'EH': 'Western Sahara',
      'ZM': 'Zambia',
      'ZW': 'Zimbabwe',

      // Châu Đại Dương (Oceania)
      'AS': 'American Samoa',
      'AU': 'Australia',
      'CK': 'Cook Islands',
      'FJ': 'Fiji',
      'PF': 'French Polynesia',
      'GU': 'Guam',
      'KI': 'Kiribati',
      'MH': 'Marshall Islands',
      'FM': 'Micronesia',
      'NR': 'Nauru',
      'NC': 'New Caledonia',
      'NZ': 'New Zealand',
      'NU': 'Niue',
      'NF': 'Norfolk Island',
      'MP': 'Northern Mariana Islands',
      'PW': 'Palau',
      'PG': 'Papua New Guinea',
      'PN': 'Pitcairn Islands',
      'WS': 'Samoa',
      'SB': 'Solomon Islands',
      'TK': 'Tokelau',
      'TO': 'Tonga',
      'TV': 'Tuvalu',
      'VU': 'Vanuatu',
      'WF': 'Wallis and Futuna',

      // Các trường hợp đặc biệt
      'Unknown': 'Unknown',
      'null': 'Unknown',
      'undefined': 'Unknown',
      '': 'Unknown'
    };

    // Đếm số lượng click theo quốc gia
    const countryCount = {};

    data.forEach(item => {
      let countryCode = item.country || 'Unknown';
      
      // Xử lý nếu countryCode là null/undefined
      if (!countryCode || countryCode === 'null' || countryCode === 'undefined') {
        countryCode = 'Unknown';
      }
      
      // Chuyển mã quốc gia sang tên đầy đủ
      let countryName = countryNames[countryCode];
      
      // Nếu không tìm thấy trong map, giữ nguyên giá trị gốc
      if (!countryName) {
        countryName = countryCode;
      }
      
      // Đếm
      countryCount[countryName] = (countryCount[countryName] || 0) + 1;
    });

    // Chuyển object thành array và sắp xếp theo số lượng giảm dần
    const sortedCountries = Object.entries(countryCount)
      .sort((a, b) => b[1] - a[1]);

    // Log để debug
    console.log('Total countries:', sortedCountries.length);
    console.log('Sample data:', sortedCountries.slice(0, 3));

    // Trả về kết quả
    res.status(200).json(sortedCountries);

  } catch (error) {
    console.error('Countries API Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
