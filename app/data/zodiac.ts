// 12 ราศี (Western zodiac, used in Thai astrology)
// Date ranges follow standard tropical zodiac.
// Gem pairings follow the most commonly cited birthstone tradition
// in Thai jewelry-buying culture (Western birthstone-by-zodiac).

export type ZodiacSign = {
  id: string;
  th: string;
  en: string;
  symbol: string;     // unicode glyph
  startMonth: number; // 1-12
  startDay: number;
  endMonth: number;
  endDay: number;
  gemTh: string;
  gemEn: string;
  gemHex: string;
};

export const zodiacSigns: ZodiacSign[] = [
  { id: 'aries',       th: 'เมษ',     en: 'Aries',       symbol: '♈',
    startMonth: 3,  startDay: 21, endMonth: 4,  endDay: 19,
    gemTh: 'ทับทิม',     gemEn: 'Ruby',        gemHex: '#C8364B' },
  { id: 'taurus',      th: 'พฤษภ',    en: 'Taurus',      symbol: '♉',
    startMonth: 4,  startDay: 20, endMonth: 5,  endDay: 20,
    gemTh: 'มรกต',       gemEn: 'Emerald',     gemHex: '#5BA381' },
  { id: 'gemini',      th: 'เมถุน',   en: 'Gemini',      symbol: '♊',
    startMonth: 5,  startDay: 21, endMonth: 6,  endDay: 20,
    gemTh: 'อะความารีน',  gemEn: 'Aquamarine', gemHex: '#9CCFD8' },
  { id: 'cancer',      th: 'กรกฎ',    en: 'Cancer',      symbol: '♋',
    startMonth: 6,  startDay: 21, endMonth: 7,  endDay: 22,
    gemTh: 'มุก',        gemEn: 'Pearl',       gemHex: '#F2EAD6' },
  { id: 'leo',         th: 'สิงห์',   en: 'Leo',         symbol: '♌',
    startMonth: 7,  startDay: 23, endMonth: 8,  endDay: 22,
    gemTh: 'เพอริดอท',   gemEn: 'Peridot',     gemHex: '#A8C66C' },
  { id: 'virgo',       th: 'กันย์',   en: 'Virgo',       symbol: '♍',
    startMonth: 8,  startDay: 23, endMonth: 9,  endDay: 22,
    gemTh: 'ไพลิน',      gemEn: 'Blue Sapphire', gemHex: '#6B9DC4' },
  { id: 'libra',       th: 'ตุล',     en: 'Libra',       symbol: '♎',
    startMonth: 9,  startDay: 23, endMonth: 10, endDay: 22,
    gemTh: 'โอปอล',      gemEn: 'Opal',        gemHex: '#E8D8C0' },
  { id: 'scorpio',     th: 'พิจิก',   en: 'Scorpio',     symbol: '♏',
    startMonth: 10, startDay: 23, endMonth: 11, endDay: 21,
    gemTh: 'โทแพซ',      gemEn: 'Topaz',       gemHex: '#E8A047' },
  { id: 'sagittarius', th: 'ธนู',     en: 'Sagittarius', symbol: '♐',
    startMonth: 11, startDay: 22, endMonth: 12, endDay: 21,
    gemTh: 'เทอร์ควอยซ์', gemEn: 'Turquoise',  gemHex: '#5DBCA3' },
  { id: 'capricorn',   th: 'มกร',     en: 'Capricorn',   symbol: '♑',
    startMonth: 12, startDay: 22, endMonth: 1,  endDay: 19,
    gemTh: 'โกเมน',      gemEn: 'Garnet',      gemHex: '#7A2E3A' },
  { id: 'aquarius',    th: 'กุมภ์',   en: 'Aquarius',    symbol: '♒',
    startMonth: 1,  startDay: 20, endMonth: 2,  endDay: 18,
    gemTh: 'อเมทิสต์',    gemEn: 'Amethyst',   gemHex: '#9B7BC4' },
  { id: 'pisces',      th: 'มีน',     en: 'Pisces',      symbol: '♓',
    startMonth: 2,  startDay: 19, endMonth: 3,  endDay: 20,
    gemTh: 'อะความารีน',  gemEn: 'Aquamarine', gemHex: '#9CCFD8' },
];

export type ZodiacId = typeof zodiacSigns[number]['id'];
