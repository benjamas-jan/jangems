// พลอยนพเก้า (Navaratna) — 9 sacred gems
// Pairings (ดาว ↔ พลอย) follow the standard Indian Navaratna tradition
// adopted in Thai. Descriptions are intentionally brief and general —
// per-customer interpretation is deferred to Jan via LINE consultation.

export type NavaratnaGem = {
  id: string;
  th: string;
  en: string;
  planet: string;     // ดาวประจำ
  hex: string;        // representative color for SVG/UI
  domain: string;     // คุณสมบัติเด่น (ความเชื่อทั่วไป)
  cut: 'cushion' | 'oval' | 'marquise' | 'round';
};

export const navaratna: NavaratnaGem[] = [
  { id: 'ruby',     th: 'ทับทิม',    en: 'Ruby',            planet: 'อาทิตย์',  hex: '#C8364B', domain: 'อำนาจ ความสำเร็จ', cut: 'cushion' },
  { id: 'pearl',    th: 'มุกดาหาร',  en: 'Pearl',           planet: 'จันทร์',   hex: '#F2EAD6', domain: 'ความสงบ จิตใจ',     cut: 'round' },
  { id: 'coral',    th: 'ปะการัง',   en: 'Red Coral',       planet: 'อังคาร',   hex: '#E08A47', domain: 'พลัง ความกล้า',     cut: 'oval' },
  { id: 'emerald',  th: 'มรกต',      en: 'Emerald',         planet: 'พุธ',      hex: '#5BA381', domain: 'ปัญญา การงาน',      cut: 'marquise' },
  { id: 'topaz',    th: 'บุษราคัม',  en: 'Yellow Sapphire', planet: 'พฤหัสบดี', hex: '#E8C547', domain: 'ความรู้ บารมี',     cut: 'cushion' },
  { id: 'diamond',  th: 'เพชร',      en: 'Diamond',         planet: 'ศุกร์',    hex: '#E8E4F0', domain: 'ความรัก เสน่ห์',    cut: 'round' },
  { id: 'sapphire', th: 'ไพลิน',     en: 'Blue Sapphire',   planet: 'เสาร์',    hex: '#6B9DC4', domain: 'โชคลาภ ทรัพย์',    cut: 'oval' },
  { id: 'garnet',   th: 'โกเมน',     en: 'Hessonite',       planet: 'ราหู',     hex: '#7A5C9E', domain: 'ปกป้องภัย',         cut: 'cushion' },
  { id: 'catseye',  th: 'เพทาย',     en: 'Cat\'s Eye',      planet: 'เกตุ',     hex: '#A89B7E', domain: 'ความเชื่อใจ',       cut: 'oval' },
];
