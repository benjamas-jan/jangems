// Gem library — for the public /gems article page.
// Mohs hardness is a standard mineralogy scale (1 = talc, 10 = diamond).
// Hex colors are representative; actual stones vary by source/treatment.

export type ColorKey =
  | 'red' | 'pink' | 'orange' | 'yellow' | 'green'
  | 'blue' | 'purple' | 'black' | 'white';

export type GemInfo = {
  th: string;
  en: string;
  hex: string;
  mohs: number;     // representative midpoint for sorting
  mohsLabel: string; // user-facing label (can be a range)
  color: ColorKey;
  family: string;
};

export const colorMeta: Record<ColorKey, { th: string; en: string; hex: string }> = {
  red:    { th: 'แดง',     en: 'Red',     hex: '#C8364B' },
  pink:   { th: 'ชมพู',    en: 'Pink',    hex: '#E8A1B8' },
  orange: { th: 'ส้ม',      en: 'Orange',  hex: '#E08A47' },
  yellow: { th: 'เหลือง',   en: 'Yellow',  hex: '#E8C547' },
  green:  { th: 'เขียว',    en: 'Green',   hex: '#5BA381' },
  blue:   { th: 'ฟ้า/น้ำเงิน', en: 'Blue', hex: '#6B9DC4' },
  purple: { th: 'ม่วง',     en: 'Purple',  hex: '#9B7BC4' },
  black:  { th: 'ดำ/เทา',  en: 'Black',   hex: '#3A3340' },
  white:  { th: 'ขาว/ใส',  en: 'White',   hex: '#E8E4F0' },
};

export const COLOR_ORDER: ColorKey[] = [
  'red', 'pink', 'orange', 'yellow', 'green', 'blue', 'purple', 'black', 'white',
];

export const gemLibrary: GemInfo[] = [
  // Red
  { th: 'ทับทิม',           en: 'Ruby',                hex: '#C8364B', mohs: 9,    mohsLabel: '9',     color: 'red',    family: 'Corundum' },
  { th: 'โกเมนสีแดง',       en: 'Red Garnet',          hex: '#7A2E3A', mohs: 7,    mohsLabel: '6.5–7.5', color: 'red',  family: 'Garnet' },
  { th: 'ปะการังสีแดง',     en: 'Red Coral',           hex: '#C44536', mohs: 3.5,  mohsLabel: '3–4',   color: 'red',    family: 'Organic' },

  // Pink
  { th: 'แซพไฟร์สีชมพู',    en: 'Pink Sapphire',       hex: '#E8A1B8', mohs: 9,    mohsLabel: '9',     color: 'pink',   family: 'Corundum' },
  { th: 'ทัวร์มาลีนสีชมพู', en: 'Pink Tourmaline',     hex: '#D87FA1', mohs: 7.25, mohsLabel: '7–7.5', color: 'pink',   family: 'Tourmaline' },
  { th: 'โรสควอร์ตซ์',      en: 'Rose Quartz',         hex: '#E6BFC4', mohs: 7,    mohsLabel: '7',     color: 'pink',   family: 'Quartz' },
  { th: 'ไข่มุกสีชมพู',     en: 'Pink Pearl',          hex: '#F5C8C8', mohs: 3.5,  mohsLabel: '2.5–4.5', color: 'pink', family: 'Organic' },

  // Orange
  { th: 'โอปอลไฟ',          en: 'Fire Opal',           hex: '#E08A47', mohs: 6,    mohsLabel: '5.5–6.5', color: 'orange', family: 'Opal' },
  { th: 'ปะการัง',          en: 'Coral',               hex: '#E07F4D', mohs: 3.5,  mohsLabel: '3–4',   color: 'orange', family: 'Organic' },
  { th: 'สเปสซาร์ไทท์',     en: 'Spessartite Garnet',  hex: '#D9603A', mohs: 7,    mohsLabel: '6.5–7.5', color: 'orange', family: 'Garnet' },
  { th: 'โทพาซสีส้ม',       en: 'Imperial Topaz',      hex: '#D9803A', mohs: 8,    mohsLabel: '8',     color: 'orange', family: 'Topaz' },

  // Yellow
  { th: 'บุษราคัม',         en: 'Yellow Sapphire',     hex: '#E8C547', mohs: 9,    mohsLabel: '9',     color: 'yellow', family: 'Corundum' },
  { th: 'ซิทริน',           en: 'Citrine',             hex: '#E8B847', mohs: 7,    mohsLabel: '7',     color: 'yellow', family: 'Quartz' },
  { th: 'อำพัน',            en: 'Amber',               hex: '#D9A248', mohs: 2.25, mohsLabel: '2–2.5', color: 'yellow', family: 'Organic' },
  { th: 'โทพาซสีเหลือง',    en: 'Yellow Topaz',        hex: '#E8B14F', mohs: 8,    mohsLabel: '8',     color: 'yellow', family: 'Topaz' },

  // Green
  { th: 'มรกต',             en: 'Emerald',             hex: '#5BA381', mohs: 7.75, mohsLabel: '7.5–8', color: 'green',  family: 'Beryl' },
  { th: 'เพอริดอท',         en: 'Peridot',             hex: '#A8C66C', mohs: 6.75, mohsLabel: '6.5–7', color: 'green',  family: 'Olivine' },
  { th: 'หยก',              en: 'Jade (Jadeite)',      hex: '#5A9F7B', mohs: 6.75, mohsLabel: '6.5–7', color: 'green',  family: 'Jadeite' },
  { th: 'ทัวร์มาลีนสีเขียว', en: 'Green Tourmaline',   hex: '#3FA86F', mohs: 7.25, mohsLabel: '7–7.5', color: 'green',  family: 'Tourmaline' },

  // Blue
  { th: 'ไพลิน',            en: 'Blue Sapphire',       hex: '#3B5F8C', mohs: 9,    mohsLabel: '9',     color: 'blue',   family: 'Corundum' },
  { th: 'โทพาซสีฟ้า',       en: 'Blue Topaz',          hex: '#6B9DC4', mohs: 8,    mohsLabel: '8',     color: 'blue',   family: 'Topaz' },
  { th: 'อะความารีน',       en: 'Aquamarine',          hex: '#9CCFD8', mohs: 7.75, mohsLabel: '7.5–8', color: 'blue',   family: 'Beryl' },
  { th: 'เทอร์ควอยซ์',      en: 'Turquoise',           hex: '#5DBCA3', mohs: 5.5,  mohsLabel: '5–6',   color: 'blue',   family: 'Phosphate' },
  { th: 'ลาพิสลาซูลี',      en: 'Lapis Lazuli',        hex: '#26619C', mohs: 5.25, mohsLabel: '5–5.5', color: 'blue',   family: 'Lazurite' },

  // Purple
  { th: 'อเมทิสต์',         en: 'Amethyst',            hex: '#9B7BC4', mohs: 7,    mohsLabel: '7',     color: 'purple', family: 'Quartz' },
  { th: 'แซพไฟร์สีม่วง',    en: 'Purple Sapphire',     hex: '#6B4F8E', mohs: 9,    mohsLabel: '9',     color: 'purple', family: 'Corundum' },

  // Black / Grey
  { th: 'นิลดำ',            en: 'Black Onyx',          hex: '#1A1A1A', mohs: 6.75, mohsLabel: '6.5–7', color: 'black',  family: 'Quartz' },
  { th: 'ไพลินสีดำ',        en: 'Black Sapphire',      hex: '#0F0F1A', mohs: 9,    mohsLabel: '9',     color: 'black',  family: 'Corundum' },
  { th: 'สตาร์แบล็คแซพไฟร์', en: 'Black Star Sapphire', hex: '#1A1F2E', mohs: 9,   mohsLabel: '9',     color: 'black',  family: 'Corundum' },
  { th: 'ทัวร์มาลีนดำ',     en: 'Schorl Tourmaline',   hex: '#1F1A24', mohs: 7.25, mohsLabel: '7–7.5', color: 'black',  family: 'Tourmaline' },

  // White / Clear
  { th: 'เพชร',             en: 'Diamond',             hex: '#E8E4F0', mohs: 10,   mohsLabel: '10',    color: 'white',  family: 'Diamond' },
  { th: 'ไข่มุก',           en: 'Pearl',               hex: '#F2EAD6', mohs: 3.5,  mohsLabel: '2.5–4.5', color: 'white', family: 'Organic' },
  { th: 'มูนสโตน',          en: 'Moonstone',           hex: '#E8E0DE', mohs: 6.25, mohsLabel: '6–6.5', color: 'white',  family: 'Feldspar' },
  { th: 'โทพาซสีขาว',       en: 'White Topaz',         hex: '#F0EDF5', mohs: 8,    mohsLabel: '8',     color: 'white',  family: 'Topaz' },
];

export type HardnessTier = 'hard' | 'medium' | 'soft';

export function tierFor(mohs: number): HardnessTier {
  if (mohs >= 8) return 'hard';
  if (mohs >= 6) return 'medium';
  return 'soft';
}

export const tierMeta: Record<HardnessTier, { th: string; range: string; advice: string }> = {
  hard:   { th: 'แข็งมาก', range: '8 – 10', advice: 'ใส่ทุกวันได้ — ทำเป็นแหวนหลัก ใส่ติดมือไม่กลัวกระแทก' },
  medium: { th: 'กลาง',   range: '6 – 7.5', advice: 'ใส่ทั่วไปได้ ระวังกระแทกกับของแข็ง เลี่ยงงานที่ใช้แรงกับมือ' },
  soft:   { th: 'อ่อน',    range: 'ต่ำกว่า 6', advice: 'เหมาะใส่เป็นจี้/ต่างหู/สร้อย ระมัดระวังการกระแทกและสารเคมี' },
};
