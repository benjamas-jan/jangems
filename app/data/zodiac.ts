// 12 ราศี (Western tropical zodiac, used in modern Thai astrology)
// Date ranges follow standard tropical zodiac.
// Gem pairings follow the most commonly cited birthstone tradition
// in Thai jewelry-buying culture (Western birthstone-by-zodiac).
// Personality + advice text is preview content from general references.

export type ZodiacSign = {
  id: string;
  th: string;
  en: string;
  symbol: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  gemTh: string;
  gemEn: string;
  gemHex: string;
  personality: string;
  strengths: string[];
  weaknesses: string[];
  advice: string;
};

export const zodiacSigns: ZodiacSign[] = [
  {
    id: 'aries', th: 'เมษ', en: 'Aries', symbol: '♈',
    startMonth: 3, startDay: 21, endMonth: 4, endDay: 19,
    gemTh: 'ทับทิม', gemEn: 'Ruby', gemHex: '#C8364B',
    personality: 'นักบุก กล้าหาญ ท้าทาย ชอบเริ่มสิ่งใหม่',
    strengths: ['ผู้นำ', 'พลังเยอะ', 'มุ่งมั่น'],
    weaknesses: ['ใจร้อน', 'ไม่อดทน', 'หุนหัน'],
    advice: 'ทับทิมเสริมพลังภาวะผู้นำ ลดความใจร้อนผ่านการฝึกหายใจช้าๆ ก่อนตัดสินใจ',
  },
  {
    id: 'taurus', th: 'พฤษภ', en: 'Taurus', symbol: '♉',
    startMonth: 4, startDay: 20, endMonth: 5, endDay: 20,
    gemTh: 'มรกต', gemEn: 'Emerald', gemHex: '#5BA381',
    personality: 'มั่นคง รักความสบาย ติดดิน รักธรรมชาติและความสวยงาม',
    strengths: ['อดทน', 'น่าเชื่อถือ', 'มีรสนิยม'],
    weaknesses: ['ดื้อ', 'ขี้เกียจปรับตัว', 'หวงสมบัติ'],
    advice: 'มรกตเสริมความมั่นคงในอาชีพและทรัพย์ สร้างวินัยการเงินทีละน้อย',
  },
  {
    id: 'gemini', th: 'เมถุน', en: 'Gemini', symbol: '♊',
    startMonth: 5, startDay: 21, endMonth: 6, endDay: 20,
    gemTh: 'อะความารีน', gemEn: 'Aquamarine', gemHex: '#9CCFD8',
    personality: 'ฉลาด ช่างพูด ทันสมัย ชอบเรียนรู้สิ่งใหม่',
    strengths: ['สื่อสารดี', 'ปรับตัวเร็ว', 'รอบรู้'],
    weaknesses: ['เปลี่ยนใจง่าย', 'ไม่จดจ่อ', 'พูดเก่งเกิน'],
    advice: 'อะความารีนช่วยให้คำพูดมีน้ำหนัก และเสริมการตัดสินใจที่ชัดเจน',
  },
  {
    id: 'cancer', th: 'กรกฎ', en: 'Cancer', symbol: '♋',
    startMonth: 6, startDay: 21, endMonth: 7, endDay: 22,
    gemTh: 'มุก', gemEn: 'Pearl', gemHex: '#F2EAD6',
    personality: 'อ่อนโยน รักครอบครัว ละเอียดอ่อน เห็นใจคน',
    strengths: ['ดูแลคน', 'มีน้ำใจ', 'จดจำดี'],
    weaknesses: ['อ่อนไหว', 'หวงรัก', 'คิดมาก'],
    advice: 'ไข่มุกช่วยปรับสมดุลอารมณ์ ใส่เป็นต่างหูหรือสร้อยใกล้หัวใจ',
  },
  {
    id: 'leo', th: 'สิงห์', en: 'Leo', symbol: '♌',
    startMonth: 7, startDay: 23, endMonth: 8, endDay: 22,
    gemTh: 'เพอริดอท', gemEn: 'Peridot', gemHex: '#A8C66C',
    personality: 'มั่นใจ องอาจ รักการเป็นจุดสนใจ ใจกว้าง',
    strengths: ['ภาวะผู้นำ', 'สง่างาม', 'มีพลัง'],
    weaknesses: ['อีโก้', 'ดราม่า', 'หยิ่ง'],
    advice: 'เพอริดอทเสริมความสง่าและความเมตตา สมดุลความเป็นผู้นำ',
  },
  {
    id: 'virgo', th: 'กันย์', en: 'Virgo', symbol: '♍',
    startMonth: 8, startDay: 23, endMonth: 9, endDay: 22,
    gemTh: 'ไพลิน', gemEn: 'Blue Sapphire', gemHex: '#6B9DC4',
    personality: 'ละเอียด เป็นระเบียบ รักความสมบูรณ์แบบ ช่างวิเคราะห์',
    strengths: ['ใส่ใจรายละเอียด', 'จัดระบบเก่ง', 'ขยัน'],
    weaknesses: ['ขี้กังวล', 'ตำหนิตัวเอง', 'เพอร์เฟกชันนิสต์'],
    advice: 'ไพลินช่วยใจสงบ ปล่อยวางสิ่งที่คุมไม่ได้ ยอมรับ "ดีพอ" ได้',
  },
  {
    id: 'libra', th: 'ตุล', en: 'Libra', symbol: '♎',
    startMonth: 9, startDay: 23, endMonth: 10, endDay: 22,
    gemTh: 'โอปอล', gemEn: 'Opal', gemHex: '#E8D8C0',
    personality: 'รักความสวยงาม สังคมดี ยุติธรรม รักความสงบ',
    strengths: ['มีเสน่ห์', 'เจรจาเก่ง', 'มีรสนิยม'],
    weaknesses: ['ตัดสินใจยาก', 'หลีกเลี่ยงปัญหา', 'พึ่งคนอื่น'],
    advice: 'โอปอลเสริมความสมดุลและความกล้าตัดสินใจในเรื่องยาก',
  },
  {
    id: 'scorpio', th: 'พิจิก', en: 'Scorpio', symbol: '♏',
    startMonth: 10, startDay: 23, endMonth: 11, endDay: 21,
    gemTh: 'โทแพซ', gemEn: 'Topaz', gemHex: '#E8A047',
    personality: 'ลึก ทรงพลัง ลึกลับ ทุ่มเทเต็มที่ในสิ่งที่รัก',
    strengths: ['มีจุดยืน', 'ฉลาดเชิงลึก', 'จงรักภักดี'],
    weaknesses: ['ขี้หึง', 'จำแค้น', 'เก็บกด'],
    advice: 'โทแพซช่วยปลดปล่อยอารมณ์ลบ และเสริมพลังเปลี่ยนแปลงตัวเอง',
  },
  {
    id: 'sagittarius', th: 'ธนู', en: 'Sagittarius', symbol: '♐',
    startMonth: 11, startDay: 22, endMonth: 12, endDay: 21,
    gemTh: 'เทอร์ควอยซ์', gemEn: 'Turquoise', gemHex: '#5DBCA3',
    personality: 'รักอิสระ มองโลกบวก ชอบผจญภัย ใจกว้าง',
    strengths: ['มองภาพใหญ่', 'ตรงไปตรงมา', 'มีความหวัง'],
    weaknesses: ['ไม่อดทนกับรายละเอียด', 'พูดตรงเกิน', 'ไม่ผูกพัน'],
    advice: 'เทอร์ควอยซ์ปกป้องระหว่างเดินทาง และเสริมการสื่อสารด้วยเมตตา',
  },
  {
    id: 'capricorn', th: 'มกร', en: 'Capricorn', symbol: '♑',
    startMonth: 12, startDay: 22, endMonth: 1, endDay: 19,
    gemTh: 'โกเมน', gemEn: 'Garnet', gemHex: '#7A2E3A',
    personality: 'มุ่งมั่น มีเป้าหมาย รับผิดชอบ มีความเป็นมืออาชีพ',
    strengths: ['อดทน', 'วินัย', 'ทะเยอทะยาน'],
    weaknesses: ['เครียด', 'จริงจังเกิน', 'แข็งกระด้าง'],
    advice: 'โกเมนเสริมพลังบรรลุเป้าหมาย และช่วยให้ผ่านอุปสรรคได้',
  },
  {
    id: 'aquarius', th: 'กุมภ์', en: 'Aquarius', symbol: '♒',
    startMonth: 1, startDay: 20, endMonth: 2, endDay: 18,
    gemTh: 'อเมทิสต์', gemEn: 'Amethyst', gemHex: '#9B7BC4',
    personality: 'แตกต่าง คิดนอกกรอบ มีเอกลักษณ์ รักความเป็นธรรม',
    strengths: ['ความคิดสร้างสรรค์', 'มองอนาคต', 'ใจเป็นกลาง'],
    weaknesses: ['ห่างเหิน', 'ดื้อในหลักการ', 'อ่านอารมณ์คนยาก'],
    advice: 'อเมทิสต์เชื่อมต่อสัญชาตญาณกับเหตุผล ลดความเครียดทางความคิด',
  },
  {
    id: 'pisces', th: 'มีน', en: 'Pisces', symbol: '♓',
    startMonth: 2, startDay: 19, endMonth: 3, endDay: 20,
    gemTh: 'อะความารีน', gemEn: 'Aquamarine', gemHex: '#9CCFD8',
    personality: 'อ่อนโยน เห็นใจคน มีจินตนาการ ละเอียดอ่อนทางอารมณ์',
    strengths: ['เห็นอกเห็นใจ', 'มีศิลปะ', 'เข้าใจคน'],
    weaknesses: ['หนีจริง', 'ขี้กังวล', 'รับอารมณ์คนอื่นง่าย'],
    advice: 'อะความารีนช่วยให้กล้ายืนหยัดในขอบเขตของตัวเอง',
  },
];

export type ZodiacId = typeof zodiacSigns[number]['id'];
