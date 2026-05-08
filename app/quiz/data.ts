// JanGems quiz data — Thai astrology gem mapping
//
// Day-of-birth readings draw on common Thai astrology references
// (วันเกิด → ภรณ์ → สี → พลอย). Personality + advice text is preview
// content; treat as a starting point, not authoritative scripture.

export type DayId = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
export type AnimalId = 'cat' | 'dog' | 'fish' | 'eagle';
export type DesireId = 'work' | 'love' | 'wealth' | 'protect';

export type Day = {
  id: DayId;
  th: string;
  porn: string;
  color: string;
  hex: string;
  gems: string[];
  personality: string;
  strengths: string[];
  weaknesses: string[];
  advice: string;
};

export type Animal = {
  id: AnimalId;
  th: string;
  desc: string;
};

export type Desire = {
  id: DesireId;
  th: string;
  gem: string;
  meaning: string;
  advice: string;
};

export const days: Day[] = [
  {
    id: 'sun', th: 'อาทิตย์', porn: 'รัตนาภรณ์', color: 'แดง', hex: '#C8364B',
    gems: ['ทับทิม', 'โกเมน', 'สปิเนลสีแดง'],
    personality: 'ผู้นำโดยธรรมชาติ องอาจ มีพลังขับเคลื่อน และเป็นคนที่ผู้อื่นมักหันมามอง',
    strengths: ['ตัดสินใจเร็ว', 'มีความน่าเชื่อถือ', 'ภาวะผู้นำ'],
    weaknesses: ['อีโก้สูง', 'ใจร้อน', 'ไม่ยอมแพ้'],
    advice: 'พลอยสีแดงเสริมพลังภาวะผู้นำ + ลดความหุนหัน นิยมใส่เป็นแหวนนิ้วชี้หรือแหวนเรือนกลาง',
  },
  {
    id: 'mon', th: 'จันทร์', porn: 'เศตาภรณ์', color: 'เหลือง', hex: '#E8C547',
    gems: ['อำพัน', 'ซิทริน', 'บุษราคัม'],
    personality: 'อ่อนโยน ละเอียดอ่อน รักครอบครัว เห็นใจคน มีศิลปะในใจ',
    strengths: ['เข้าใจคนอื่น', 'มีน้ำใจ', 'มีรสนิยมดี'],
    weaknesses: ['ขี้กังวล', 'ตัดสินใจช้า', 'อ่อนไหว'],
    advice: 'พลอยสีเหลือง/อำพันเสริมความสงบและความมั่นใจในตัวเอง ใส่เป็นต่างหู หรือจี้ใกล้หัวใจ',
  },
  {
    id: 'tue', th: 'อังคาร', porn: 'ตามภาภรณ์', color: 'ชมพู', hex: '#E8A1B8',
    gems: ['สปิเนลสีชมพู', 'พิ้งค์ทัวร์มาลีน', 'ไข่มุกสีชมพู'],
    personality: 'กระตือรือร้น กล้าหาญ ตัดสินใจเร็ว ทุ่มเทเพื่อคนที่รัก',
    strengths: ['ทำงานหนัก', 'กล้าเสี่ยง', 'รักคนที่รักจริง'],
    weaknesses: ['อารมณ์ร้อน', 'หุนหัน', 'ไม่อดทน'],
    advice: 'พลอยชมพูช่วยลดอารมณ์ร้อนและเพิ่มความนุ่มนวลในการสื่อสาร',
  },
  {
    id: 'wed', th: 'พุธ', porn: 'อินทนิล', color: 'เขียว', hex: '#5BA381',
    gems: ['เพอริดอท', 'มรกต', 'หยก'],
    personality: 'ฉลาด พูดเก่ง สังคมดี ปรับตัวเร็ว ชอบเรียนรู้',
    strengths: ['สื่อสารดี', 'ทันคน', 'แก้ปัญหาได้รอบด้าน'],
    weaknesses: ['เปลี่ยนใจง่าย', 'ไม่นิ่ง', 'วอกแวก'],
    advice: 'พลอยเขียว/มรกตเสริมสติปัญญาและความตั้งมั่น เหมาะใส่เป็นแหวนนิ้วก้อยหรือสร้อยข้อมือ',
  },
  {
    id: 'thu', th: 'พฤหัสบดี', porn: 'ปิตาภรณ์', color: 'ส้ม', hex: '#E08A47',
    gems: ['สปิเนลสีส้ม', 'โอปอลไฟ', 'ปะการัง'],
    personality: 'เมตตา ใจกว้าง มีหลักการ ชอบช่วยคนที่ตกทุกข์',
    strengths: ['คุณธรรม', 'มีบารมี', 'ผู้คนเชื่อถือ'],
    weaknesses: ['เชื่อคนง่าย', 'ขี้สงสาร', 'ใจดีเกินไป'],
    advice: 'พลอยส้ม/ไฟเสริมบารมีและการตัดสินใจที่หนักแน่น ใส่เป็นแหวนนิ้วชี้',
  },
  {
    id: 'fri', th: 'ศุกร์', porn: 'ปภัสราภรณ์', color: 'ฟ้า', hex: '#6B9DC4',
    gems: ['ไพลิน', 'อะความารีน', 'เทอร์คอยส์'],
    personality: 'มีรสนิยม รักความสวยงาม สังคมดี เสน่ห์ในตัว',
    strengths: ['ความคิดสร้างสรรค์', 'มนุษยสัมพันธ์', 'มีเสน่ห์'],
    weaknesses: ['ฟุ่มเฟือย', 'ตัดสินใจไม่ขาด', 'ขี้เกียจในบางเรื่อง'],
    advice: 'ไพลิน/อะความารีนเสริมเสน่ห์และการสื่อสารทางใจ ใส่เป็นต่างหูหรือจี้',
  },
  {
    id: 'sat', th: 'เสาร์', porn: 'กัณหาภรณ์', color: 'ม่วง/ดำ', hex: '#7A5C9E',
    gems: ['อเมทิสต์', 'สตาร์ดำ', 'นิลตะโก'],
    personality: 'นิ่ง สุขุม อดทน คิดลึก ไม่หวือหวา',
    strengths: ['ความอดทน', 'มีวินัย', 'รับผิดชอบสูง'],
    weaknesses: ['เก็บตัว', 'คิดมาก', 'มองโลกในแง่ลบบางครั้ง'],
    advice: 'อเมทิสต์/นิลช่วยปรับสมดุลจิตใจ ลดความเครียดสะสม ใส่เป็นแหวนหรือสร้อย',
  },
];

export const animals: Animal[] = [
  { id: 'cat',   th: 'แมว',    desc: 'มีเสน่ห์ มีโลกของตัวเอง' },
  { id: 'dog',   th: 'หมา',    desc: 'ซื่อสัตย์ มีพลัง พร้อมลุยเพื่อคนที่รัก' },
  { id: 'fish',  th: 'ปลา',    desc: 'สงบ ลึก ปล่อยให้ทุกอย่างไหลไป' },
  { id: 'eagle', th: 'อินทรี', desc: 'สง่า มอง vision ไกล ไม่กลัวที่จะบินสูง' },
];

export const desires: Desire[] = [
  {
    id: 'work', th: 'การงาน ความสำเร็จ', gem: 'ทับทิม',
    meaning: 'ความสำเร็จ ลาภยศ อายุยืน',
    advice: 'ทับทิมเป็นพลอยของอาทิตย์ ส่งเสริมภาวะผู้นำและการได้รับการยอมรับในที่ทำงาน นิยมใส่เป็นแหวน',
  },
  {
    id: 'love', th: 'ความรัก เสน่ห์', gem: 'บุษราคัม',
    meaning: 'มีเสน่ห์เป็นที่รัก',
    advice: 'บุษราคัมเสริมความนุ่มนวลและมนุษยสัมพันธ์ที่อบอุ่น เหมาะใส่ใกล้หัวใจ เช่น จี้หรือต่างหู',
  },
  {
    id: 'wealth', th: 'โชคลาภ ทรัพย์', gem: 'ไพลิน',
    meaning: 'ความร่ำรวย ความรัก ความเมตตา',
    advice: 'ไพลินเป็นพลอยของศุกร์/เสาร์ ตามตำราเสริมโชคและทรัพย์สินสะสม นิยมใส่เป็นแหวนหรือจี้',
  },
  {
    id: 'protect', th: 'ปกป้อง คุ้มครอง', gem: 'มรกต',
    meaning: 'ป้องกันภัยอันตราย ความศรัทธา',
    advice: 'มรกตช่วยป้องกันสิ่งร้ายและพลังลบ นิยมใส่เป็นแหวนนิ้วก้อยหรือสร้อยข้อมือ',
  },
];

export function gemCutForDay(dayId: DayId): 'cushion' | 'oval' | 'marquise' | 'round' {
  return ({
    sun: 'cushion', mon: 'round', tue: 'oval',
    wed: 'marquise', thu: 'cushion', fri: 'oval',
    sat: 'round',
  } as const)[dayId];
}
