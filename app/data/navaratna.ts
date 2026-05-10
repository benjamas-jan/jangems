// พลอยนพเก้า (Navaratna) — 9 sacred gems
// Pairings (ดาว ↔ พลอย) follow the standard Indian Navaratna tradition
// adopted in Thai. Reading + advice text is preview content;
// per-customer interpretation is deferred to Jan via LINE.

export type NavaratnaGem = {
  id: string;
  th: string;
  en: string;
  planet: string;
  hex: string;
  domain: string;
  reading: string;
  advice: string;
  cut: 'cushion' | 'oval' | 'marquise' | 'round';
};

export const navaratna: NavaratnaGem[] = [
  {
    id: 'ruby', th: 'ทับทิม', en: 'Ruby',
    planet: 'อาทิตย์', hex: '#C8364B',
    domain: 'การงาน · บารมี',
    reading: 'พลอยของพระอาทิตย์ เสริมพลังภาวะผู้นำ การได้รับการยอมรับ และความสำเร็จในหน้าที่การงาน',
    advice: 'นิยมใส่เป็นแหวนนิ้วชี้หรือนิ้วนาง สีแดงเข้มลึกถือว่ามีพลังสูงสุด',
    cut: 'cushion',
  },
  {
    id: 'pearl', th: 'มุกดาหาร', en: 'Pearl',
    planet: 'จันทร์', hex: '#F2EAD6',
    domain: 'ใจสงบ · เสน่ห์',
    reading: 'พลอยของพระจันทร์ ปรับสมดุลอารมณ์ เสริมเสน่ห์อ่อนหวาน เหมาะกับคนทำงานคนหรือสายบริการ',
    advice: 'ใส่เป็นต่างหูหรือสร้อยใกล้คอ — พลังจันทร์ดีเป็นพิเศษเวลากลางคืน',
    cut: 'round',
  },
  {
    id: 'coral', th: 'ปะการัง', en: 'Red Coral',
    planet: 'อังคาร', hex: '#E08A47',
    domain: 'พลังกาย · ความกล้า',
    reading: 'พลอยของพระอังคาร เพิ่มพลังกาย สุขภาพ และความกล้าหาญ ดีสำหรับคนป่วยอ่อนเพลีย',
    advice: 'นิยมใส่เป็นแหวนนิ้วนาง สีแดงสดถือว่าพลังเต็ม',
    cut: 'oval',
  },
  {
    id: 'emerald', th: 'มรกต', en: 'Emerald',
    planet: 'พุธ', hex: '#5BA381',
    domain: 'ปัญญา · การพูด',
    reading: 'พลอยของพระพุธ เสริมสติปัญญา การสื่อสารที่ชัดเจน และไหวพริบในการเจรจาธุรกิจ',
    advice: 'แหวนนิ้วก้อยหรือสร้อยข้อมือ ดีสำหรับนักเรียน นักธุรกิจ คนทำงานสื่อสาร',
    cut: 'marquise',
  },
  {
    id: 'topaz', th: 'บุษราคัม', en: 'Yellow Sapphire',
    planet: 'พฤหัสบดี', hex: '#E8C547',
    domain: 'ความรู้ · บารมี',
    reading: 'พลอยของพระพฤหัสบดี เพิ่มบารมี ความน่าเชื่อถือ และโชคในด้านการศึกษา',
    advice: 'นิยมใส่เป็นแหวนนิ้วชี้ — สีเหลืองทองเข้มถือว่ามีคุณภาพสูง',
    cut: 'cushion',
  },
  {
    id: 'diamond', th: 'เพชร', en: 'Diamond',
    planet: 'ศุกร์', hex: '#E8E4F0',
    domain: 'ความรัก · ความสง่า',
    reading: 'พลอยของพระศุกร์ เสริมความรัก ความสง่างาม รสนิยม และมนุษยสัมพันธ์ที่ดี',
    advice: 'ใส่ได้ทุกตำแหน่ง นิยมเป็นแหวนแต่งงานหรือต่างหูสำหรับงานพิเศษ',
    cut: 'round',
  },
  {
    id: 'sapphire', th: 'ไพลิน', en: 'Blue Sapphire',
    planet: 'เสาร์', hex: '#6B9DC4',
    domain: 'โชค · ทรัพย์',
    reading: 'พลอยของพระเสาร์ เสริมโชคลาภ ทรัพย์สินสะสม และพลังต้านทานคุณไสย',
    advice: 'ระมัดระวัง — ไพลินมีพลังแรง ควรลองใส่ดูสัก 3 วันก่อนใส่ถาวร',
    cut: 'oval',
  },
  {
    id: 'garnet', th: 'โกเมน', en: 'Hessonite',
    planet: 'ราหู', hex: '#B25F2E',
    domain: 'ปกป้องภัย',
    reading: 'พลอยของพระราหู สีน้ำตาลส้ม (cinnamon) ปกป้องจากพลังลบ คุณไสย และอุบัติเหตุที่ไม่คาดคิด',
    advice: 'ใส่เป็นแหวนนิ้วกลางหรือจี้ — เหมาะสำหรับคนเดินทางบ่อยหรือทำงานกลางคืน',
    cut: 'cushion',
  },
  {
    id: 'catseye', th: 'เพทาย', en: 'Cat\'s Eye',
    planet: 'เกตุ', hex: '#A89B7E',
    domain: 'ความเชื่อใจ · ปาฏิหาริย์',
    reading: 'พลอยของพระเกตุ เสริมศรัทธา ความรู้สึกแม่นยำ และโอกาสที่ไม่คาดคิด',
    advice: 'นิยมใส่เป็นแหวนนิ้วกลางหรือแหวนนิ้วก้อย — ดีสำหรับนักลงทุน',
    cut: 'oval',
  },
];
