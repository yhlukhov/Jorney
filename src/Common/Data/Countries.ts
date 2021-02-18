// List of countries for export:
export const countries:Array<{code:string, name:string, native:string, languages:Array<string>}> = JSON.parse(
  `[
    {
      "code": "AE",
      "name": "UAE",
      "native": "دولة الإمارات العربية المتحدة",
      "languages": [
        "ar"
      ]
    },
    {
      "code": "AF",
      "name": "Afghanistan",
      "native": "افغانستان",
      "languages": [
        "ps",
        "uz",
        "tk"
      ]
    },
    {
      "code": "AL",
      "name": "Albania",
      "native": "Shqipëria",
      "languages": [
        "sq"
      ]
    },
    {
      "code": "AM",
      "name": "Armenia",
      "native": "Հայաստան",
      "languages": [
        "hy",
        "ru"
      ]
    },
    {
      "code": "AQ",
      "name": "Antarctica",
      "native": "Antarctica",
      "languages": []
    },
    {
      "code": "AR",
      "name": "Argentina",
      "native": "Argentina",
      "languages": [
        "es"
      ]
    },
    {
      "code": "AT",
      "name": "Austria",
      "native": "Österreich",
      "languages": [
        "de"
      ]
    },
    {
      "code": "AU",
      "name": "Australia",
      "native": "Australia",
      "languages": [
        "en"
      ]
    },
    {
      "code": "AX",
      "name": "Aland",
      "native": "Åland",
      "languages": [
        "sv"
      ]
    },
    {
      "code": "AZ",
      "name": "Azerbaijan",
      "native": "Azərbaycan",
      "languages": [
        "az"
      ]
    },
    {
      "code": "BA",
      "name": "Bosnia and Herzegovina",
      "native": "Bosnia and Herzegovina",
      "languages": [
        "bs",
        "hr",
        "sr"
      ]
    },
    {
      "code": "BD",
      "name": "Bangladesh",
      "native": "Bangladesh",
      "languages": [
        "bn"
      ]
    },
    {
      "code": "BE",
      "name": "Belgium",
      "native": "België",
      "languages": [
        "nl",
        "fr",
        "de"
      ]
    },
    {
      "code": "BG",
      "name": "Bulgaria",
      "native": "България",
      "languages": [
        "bg"
      ]
    },
    {
      "code": "BO",
      "name": "Bolivia",
      "native": "Bolivia",
      "languages": [
        "es"
      ]
    },
    {
      "code": "BQ",
      "name": "Bonaire",
      "native": "Bonaire",
      "languages": [
        "nl"
      ]
    },
    {
      "code": "BR",
      "name": "Brazil",
      "native": "Brasil",
      "languages": [
        "pt"
      ]
    },
    {
      "code": "BV",
      "name": "Bouvet Island",
      "native": "Bouvetøya",
      "languages": [
        "no"
      ]
    },
    {
      "code": "BY",
      "name": "Belarus",
      "native": "Белару́сь",
      "languages": [
        "be",
        "ru"
      ]
    },
    {
      "code": "CA",
      "name": "Canada",
      "native": "Canada",
      "languages": [
        "en",
        "fr"
      ]
    },
    {
      "code": "CD",
      "name": "Congo",
      "native": "Congo",
      "languages": [
        "fr",
        "sw"
      ]
    },
    {
      "code": "CF",
      "name": "Central African Republic",
      "native": "Central African Republic",
      "languages": [
        "fr"
      ]
    },
    {
      "code": "CH",
      "name": "Switzerland",
      "native": "Schweiz",
      "languages": [
        "de",
        "fr",
        "it"
      ]
    },
    {
      "code": "CL",
      "name": "Chile",
      "native": "Chile",
      "languages": [
        "es"
      ]
    },
    {
      "code": "CN",
      "name": "China",
      "native": "中国",
      "languages": [
        "zh"
      ]
    },
    {
      "code": "CO",
      "name": "Colombia",
      "native": "Colombia",
      "languages": [
        "es"
      ]
    },
    {
      "code": "CR",
      "name": "Costa Rica",
      "native": "Costa Rica",
      "languages": [
        "es"
      ]
    },
    {
      "code": "CU",
      "name": "Cuba",
      "native": "Cuba",
      "languages": [
        "es"
      ]
    },
    {
      "code": "CY",
      "name": "Cyprus",
      "native": "Κύπρος",
      "languages": [
        "el",
        "tr",
        "hy"
      ]
    },
    {
      "code": "CZ",
      "name": "Czech Republic",
      "native": "Czech Republic",
      "languages": [
        "cs",
        "sk"
      ]
    },
    {
      "code": "DE",
      "name": "Germany",
      "native": "Deutschland",
      "languages": [
        "de"
      ]
    },
    {
      "code": "DK",
      "name": "Denmark",
      "native": "Danmark",
      "languages": [
        "da"
      ]
    },
    {
      "code": "EC",
      "name": "Ecuador",
      "native": "Ecuador",
      "languages": [
        "es"
      ]
    },
    {
      "code": "EE",
      "name": "Estonia",
      "native": "Eesti",
      "languages": [
        "et"
      ]
    },
    {
      "code": "ES",
      "name": "Spain",
      "native": "España",
      "languages": [
        "es"
      ]
    },
    {
      "code": "FI",
      "name": "Finland",
      "native": "Suomi",
      "languages": [
        "fi",
        "sv"
      ]
    },
    {
      "code": "FM",
      "name": "Micronesia",
      "native": "Micronesia",
      "languages": [
        "en"
      ]
    },
    {
      "code": "FR",
      "name": "France",
      "native": "France",
      "languages": [
        "fr"
      ]
    },
    {
      "code": "GB",
      "name": "United Kingdom",
      "native": "United Kingdom",
      "languages": [
        "en"
      ]
    },
    {
      "code": "GE",
      "name": "Georgia",
      "native": "საქართველო",
      "languages": [
        "ka"
      ]
    },
    {
      "code": "GL",
      "name": "Greenland",
      "native": "Kalaallit Nunaat",
      "languages": [
        "kl"
      ]
    },
    {
      "code": "GN",
      "name": "Guinea",
      "native": "Guinée",
      "languages": [
        "fr"
      ]
    },
    {
      "code": "GR",
      "name": "Greece",
      "native": "Ελλάδα",
      "languages": [
        "el"
      ]
    },
    {
      "code": "GS",
      "name": "South Georgia",
      "native": "South Georgia",
      "languages": [
        "en"
      ]
    },
    {
      "code": "GT",
      "name": "Guatemala",
      "native": "Guatemala",
      "languages": [
        "es"
      ]
    },
    {
      "code": "GY",
      "name": "Guyana",
      "native": "Guyana",
      "languages": [
        "en"
      ]
    },
    {
      "code": "HN",
      "name": "Honduras",
      "native": "Honduras",
      "languages": [
        "es"
      ]
    },
    {
      "code": "HR",
      "name": "Croatia",
      "native": "Hrvatska",
      "languages": [
        "hr"
      ]
    },
    {
      "code": "HT",
      "name": "Haiti",
      "native": "Haïti",
      "languages": [
        "fr"
      ]
    },
    {
      "code": "HU",
      "name": "Hungary",
      "native": "Magyarország",
      "languages": [
        "hu"
      ]
    },
    {
      "code": "ID",
      "name": "Indonesia",
      "native": "Indonesia",
      "languages": [
        "id"
      ]
    },
    {
      "code": "IE",
      "name": "Ireland",
      "native": "Éire",
      "languages": [
        "ga",
        "en"
      ]
    },
    {
      "code": "IN",
      "name": "India",
      "native": "भारत",
      "languages": [
        "hi",
        "en"
      ]
    },
    {
      "code": "IR",
      "name": "Iran",
      "native": "ایران",
      "languages": [
        "fa"
      ]
    },
    {
      "code": "IS",
      "name": "Iceland",
      "native": "Ísland",
      "languages": [
        "is"
      ]
    },
    {
      "code": "IT",
      "name": "Italy",
      "native": "Italia",
      "languages": [
        "it"
      ]
    },
    {
      "code": "JM",
      "name": "Jamaica",
      "native": "Jamaica",
      "languages": [
        "en"
      ]
    },
    {
      "code": "JP",
      "name": "Japan",
      "native": "日本",
      "languages": [
        "ja"
      ]
    },
    {
      "code": "KG",
      "name": "Kyrgyzstan",
      "native": "Кыргызстан",
      "languages": [
        "ky",
        "ru"
      ]
    },
    {
      "code": "KN",
      "name": "Saint Kitts and Nevis",
      "native": "Saint Kitts and Nevis",
      "languages": [
        "en"
      ]
    },
    {
      "code": "KP",
      "name": "North Korea",
      "native": "북한",
      "languages": [
        "ko"
      ]
    },
    {
      "code": "KR",
      "name": "South Korea",
      "native": "대한민국",
      "languages": [
        "ko"
      ]
    },
    {
      "code": "KZ",
      "name": "Kazakhstan",
      "native": "Қазақстан",
      "languages": [
        "kk",
        "ru"
      ]
    },
    {
      "code": "LI",
      "name": "Liechtenstein",
      "native": "Liechtenstein",
      "languages": [
        "de"
      ]
    },
    {
      "code": "LK",
      "name": "Sri Lanka",
      "native": "śrī laṃkāva",
      "languages": [
        "si"
      ]
    },
    {
      "code": "LR",
      "name": "Liberia",
      "native": "Liberia",
      "languages": [
        "en"
      ]
    },
    {
      "code": "LT",
      "name": "Lithuania",
      "native": "Lietuva",
      "languages": [
        "lt"
      ]
    },
    {
      "code": "LV",
      "name": "Latvia",
      "native": "Latvija",
      "languages": [
        "lv"
      ]
    },
    {
      "code": "MC",
      "name": "Monaco",
      "native": "Monaco",
      "languages": [
        "fr"
      ]
    },
    {
      "code": "MD",
      "name": "Moldova",
      "native": "Moldova",
      "languages": [
        "ro"
      ]
    },
    {
      "code": "ME",
      "name": "Montenegro",
      "native": "Црна Гора",
      "languages": [
        "sr",
        "bs",
        "sq",
        "hr"
      ]
    },
    {
      "code": "MG",
      "name": "Madagascar",
      "native": "Madagasikara",
      "languages": [
        "fr"
      ]
    },
    {
      "code": "MK",
      "name": "North Macedonia",
      "native": "North Macedonia",
      "languages": [
        "mk"
      ]
    },
    {
      "code": "MN",
      "name": "Mongolia",
      "native": "Монгол улс",
      "languages": [
        "mn"
      ]
    },
    {
      "code": "MX",
      "name": "Mexico",
      "native": "México",
      "languages": [
        "es"
      ]
    },
    {
      "code": "MY",
      "name": "Malaysia",
      "native": "Malaysia",
      "languages": [
        "ms"
      ]
    },
    {
      "code": "NI",
      "name": "Nicaragua",
      "native": "Nicaragua",
      "languages": [
        "es"
      ]
    },
    {
      "code": "NL",
      "name": "Netherlands",
      "native": "Nederland",
      "languages": [
        "nl"
      ]
    },
    {
      "code": "NO",
      "name": "Norway",
      "native": "Norge",
      "languages": [
        "no"
      ]
    },
    {
      "code": "NP",
      "name": "Nepal",
      "native": "नपल",
      "languages": [
        "ne"
      ]
    },
    {
      "code": "NZ",
      "name": "New Zealand",
      "native": "New Zealand",
      "languages": [
        "en"
      ]
    },
    {
      "code": "PA",
      "name": "Panama",
      "native": "Panamá",
      "languages": [
        "es"
      ]
    },
    {
      "code": "PE",
      "name": "Peru",
      "native": "Perú",
      "languages": [
        "es"
      ]
    },
    {
      "code": "PH",
      "name": "Philippines",
      "native": "Pilipinas",
      "languages": [
        "en"
      ]
    },
    {
      "code": "PK",
      "name": "Pakistan",
      "native": "Pakistan",
      "languages": [
        "en"
      ]
    },
    {
      "code": "PL",
      "name": "Poland",
      "native": "Polska",
      "languages": [
        "pl"
      ]
    },
    {
      "code": "PR",
      "name": "Puerto Rico",
      "native": "Puerto Rico",
      "languages": [
        "es",
        "en"
      ]
    },
    {
      "code": "PT",
      "name": "Portugal",
      "native": "Portugal",
      "languages": [
        "pt"
      ]
    },
    {
      "code": "PY",
      "name": "Paraguay",
      "native": "Paraguay",
      "languages": [
        "es"
      ]
    },
    {
      "code": "RO",
      "name": "Romania",
      "native": "România",
      "languages": [
        "ro"
      ]
    },
    {
      "code": "RS",
      "name": "Serbia",
      "native": "Србија",
      "languages": [
        "sr"
      ]
    },
    {
      "code": "RU",
      "name": "Russia",
      "native": "Россия",
      "languages": [
        "ru"
      ]
    },
    {
      "code": "RW",
      "name": "Rwanda",
      "native": "Rwanda",
      "languages": [
        "en",
        "fr"
      ]
    },
    {
      "code": "SE",
      "name": "Sweden",
      "native": "Sverige",
      "languages": [
        "sv"
      ]
    },
    {
      "code": "SG",
      "name": "Singapore",
      "native": "Singapore",
      "languages": [
        "en",
        "ms",
        "zh"
      ]
    },
    {
      "code": "SI",
      "name": "Slovenia",
      "native": "Slovenija",
      "languages": [
        "sl"
      ]
    },
    {
      "code": "SJ",
      "name": "Svalbard og Jan Mayen",
      "native": "Svalbard og Jan Mayen",
      "languages": [
        "no"
      ]
    },
    {
      "code": "SK",
      "name": "Slovakia",
      "native": "Slovensko",
      "languages": [
        "sk"
      ]
    },
    {
      "code": "SV",
      "name": "El Salvador",
      "native": "El Salvador",
      "languages": [
        "es"
      ]
    },
    {
      "code": "TH",
      "name": "Thailand",
      "native": "ประเทศไทย",
      "languages": [
        "th"
      ]
    },
    {
      "code": "TJ",
      "name": "Tajikistan",
      "native": "Тоҷикистон",
      "languages": [
        "ru"
      ]
    },
    {
      "code": "TM",
      "name": "Turkmenistan",
      "native": "Türkmenistan",
      "languages": [
        "tk",
        "ru"
      ]
    },
    {
      "code": "TR",
      "name": "Turkey",
      "native": "Türkiye",
      "languages": [
        "tr"
      ]
    },
    {
      "code": "TW",
      "name": "Taiwan",
      "native": "臺灣",
      "languages": [
        "zh"
      ]
    },
    {
      "code": "UA",
      "name": "Ukraine",
      "native": "Україна",
      "languages": [
        "uk"
      ]
    },
    {
      "code": "UG",
      "name": "Uganda",
      "native": "Uganda",
      "languages": [
        "en",
        "sw"
      ]
    },
    {
      "code": "US",
      "name": "United States",
      "native": "United States",
      "languages": [
        "en"
      ]
    },
    {
      "code": "UY",
      "name": "Uruguay",
      "native": "Uruguay",
      "languages": [
        "es"
      ]
    },
    {
      "code": "UZ",
      "name": "Uzbekistan",
      "native": "O‘zbekiston",
      "languages": [
        "uz",
        "ru"
      ]
    },
    {
      "code": "VA",
      "name": "Vatican City",
      "native": "Vaticano",
      "languages": [
        "it",
        "la"
      ]
    },
    {
      "code": "VE",
      "name": "Venezuela",
      "native": "Venezuela",
      "languages": [
        "es"
      ]
    },
    {
      "code": "VN",
      "name": "Vietnam",
      "native": "Việt Nam",
      "languages": [
        "vi"
      ]
    },
    {
      "code": "ZA",
      "name": "South Africa",
      "native": "South Africa",
      "languages": [
        "af",
        "en"
      ]
    }
  ]`
)