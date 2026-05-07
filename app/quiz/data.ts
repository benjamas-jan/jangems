// JanGems quiz data — Thai astrology gem mapping

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
};

export const days: Day[] = [
  { id: 'sun', th: 'อาทิตย์',  porn: 'รัตนาภรณ์',  color: 'แดง',     hex: '#C8364B', gems: ['ทับทิม', 'โกเมน', 'สปิเนลสีแดง'] },
  { id: 'mon', th: 'จันทร์',   porn: 'เศตาภรณ์',   color: 'เหลือง',   hex: '#E8C547', gems: ['อำพัน', 'ซิทริน', 'บุษราคัม'] },
  { id: 'tue', th: 'อังคาร',   porn: 'ตามภาภรณ์',  color: 'ชมพู',     hex: '#E8A1B8', gems: ['สปิเนลสีชมพู', 'พิ้งค์ทัวร์มาลีน', 'ไข่มุกสีชมพู'] },
  { id: 'wed', th: 'พุธ',      porn: 'อินทนิล',    color: 'เขียว',    hex: '#5BA381', gems: ['เพอริดอท', 'มรกต', 'หยก'] },
  { id: 'thu', th: 'พฤหัสบดี', porn: 'ปิตาภรณ์',   color: 'ส้ม',      hex: '#E08A47', gems: ['สปิเนลสีส้ม', 'โอปอลไฟ', 'ปะการัง'] },
  { id: 'fri', th: 'ศุกร์',    porn: 'ปภัสราภรณ์', color: 'ฟ้า',      hex: '#6B9DC4', gems: ['ไพลิน', 'อะความารีน', 'เทอร์คอยส์'] },
  { id: 'sat', th: 'เสาร์',    porn: 'กัณหาภรณ์',  color: 'ม่วง/ดำ',  hex: '#7A5C9E', gems: ['อเมทิสต์', 'สตาร์ดำ', 'นิลตะโก'] },
];

export const animals: Animal[] = [
  { id: 'cat',   th: 'แมว',    desc: 'มีเสน่ห์ มีโลกของตัวเอง' },
  { id: 'dog',   th: 'หมา',    desc: 'ซื่อสัตย์ มีพลัง พร้อมลุยเพื่อคนที่รัก' },
  { id: 'fish',  th: 'ปลา',    desc: 'สงบ ลึก ปล่อยให้ทุกอย่างไหลไป' },
  { id: 'eagle', th: 'อินทรี', desc: 'สง่า มอง vision ไกล ไม่กลัวที่จะบินสูง' },
];

export const desires: Desire[] = [
  { id: 'work',    th: 'การงาน ความสำเร็จ', gem: 'ทับทิม',   meaning: 'ความสำเร็จ ลาภยศ อายุยืน' },
  { id: 'love',    th: 'ความรัก เสน่ห์',     gem: 'บุษราคัม', meaning: 'มีเสน่ห์เป็นที่รัก' },
  { id: 'wealth',  th: 'โชคลาภ ทรัพย์',      gem: 'ไพลิน',    meaning: 'ความร่ำรวย ความรัก ความเมตตา' },
  { id: 'protect', th: 'ปกป้อง คุ้มครอง',    gem: 'มรกต',     meaning: 'ป้องกันภัยอันตราย ความศรัทธา' },
];

export function gemCutForDay(dayId: DayId): 'cushion' | 'oval' | 'marquise' | 'round' {
  return ({
    sun: 'cushion', mon: 'round', tue: 'oval',
    wed: 'marquise', thu: 'cushion', fri: 'oval',
    sat: 'round',
  } as const)[dayId];
}
