import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { getSession } from '../lib/auth';

export const metadata: Metadata = {
  title: 'สินค้า · JanGems',
  description: 'ตัวอย่างเครื่องประดับพลอยสั่งทำจาก JanGems',
};

type Sample = {
  id: string;
  type: string;
  name: string;
  note: string;
  image?: string;
  tag?: string;
};

// All 6 photos are rings — kept in /public/products/ with their original
// filenames so this list maps 1:1 to the uploaded files. Add more entries
// (or change the type/category) when more photos arrive.
const SAMPLES: Sample[] = [
  { id: '132628', type: 'Ring', name: 'แหวนพลอย · งานสั่งทำ', note: 'ปรึกษาราคา', image: '/products/ring-handmade-132628.jpg', tag: 'งานช่างจันทบุรี' },
  { id: '132819', type: 'Ring', name: 'แหวนพลอย · งานสั่งทำ', note: 'ปรึกษาราคา', image: '/products/ring-handmade-132819.jpg' },
  { id: '133257', type: 'Ring', name: 'แหวนพลอย · งานสั่งทำ', note: 'ปรึกษาราคา', image: '/products/ring-handmade-133257.jpg' },
  { id: '133659', type: 'Ring', name: 'แหวนพลอย · งานสั่งทำ', note: 'ปรึกษาราคา', image: '/products/ring-handmade-133659.jpg' },
  { id: '134717', type: 'Ring', name: 'แหวนพลอย · งานสั่งทำ', note: 'ปรึกษาราคา', image: '/products/ring-handmade-134717.jpg' },
  { id: '135107', type: 'Ring', name: 'แหวนพลอย · งานสั่งทำ', note: 'ปรึกษาราคา', image: '/products/ring-handmade-135107.jpg' },
];

function GemThumb() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <defs>
        <radialGradient id="thumb-grad" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#E9BD63" />
          <stop offset="60%" stopColor="#D4A24C" />
          <stop offset="100%" stopColor="#8B6B2E" />
        </radialGradient>
      </defs>
      <path d="M40 8 L60 30 L52 64 L28 64 L20 30 Z" fill="url(#thumb-grad)" stroke="#8B6B2E" strokeWidth="0.6" />
      <path d="M40 8 L52 30 L40 36 L28 30 Z" fill="#F2EAD6" opacity="0.4" />
      <path d="M28 30 L52 30 L52 64 L28 64 Z" fill="#D4A24C" opacity="0.25" />
      <ellipse cx="36" cy="22" rx="4" ry="2" fill="white" opacity="0.5" />
    </svg>
  );
}

export default async function ProductsPage() {
  const session = await getSession();
  return (
    <>
      <SiteHeader session={session} />

      <div className="jg-page">
        <div className="jg-page-hero">
          <div className="jg-page-eyebrow jg-eyebrow">Made-to-order</div>
          <h1 className="jg-page-title">
            พลอยและ<em>เครื่องประดับ</em>
          </h1>
          <p className="jg-page-sub">
            ทุกชิ้นสั่งทำตามดวงและความต้องการของคุณ<br />
            เลือกพลอย เลือกดีไซน์ และให้ช่างของเราลงมือทำ
          </p>
        </div>

        <section className="jg-section">
          <div className="jg-section-label">ตัวอย่างผลงาน</div>
          <h2 className="jg-section-title">แหวนพลอยงานสั่งทำ</h2>
          <div className="jg-section-body">
            <p>
              ทุกวงเป็น<strong>งานช่างทำมือ</strong> คัดสรรพลอยและออกแบบเฉพาะ
              ตามความต้องการของลูกค้า
            </p>
            <p>
              ราคาขึ้นกับชนิดของพลอย ขนาด และความซับซ้อนของดีไซน์
              สอบถามรายละเอียดและราคาผ่าน LINE
            </p>
          </div>

          <div className="jg-product-grid">
            {SAMPLES.map((p) => (
              <div key={p.id} className="jg-product-card">
                <div className="jg-product-thumb">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={p.name} className="jg-product-img" />
                  ) : (
                    <GemThumb />
                  )}
                </div>
                <div className="jg-product-body">
                  <span className="jg-product-eyebrow">{p.type}</span>
                  <span className="jg-product-name">{p.name}</span>
                  {p.tag && <span className="jg-product-tag">{p.tag}</span>}
                  <span className="jg-product-price">{p.note}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="jg-section">
          <div className="jg-section-label">กระบวนการ</div>
          <h2 className="jg-section-title">วิธีการสั่งทำ</h2>
          <div className="jg-section-body">
            <p><strong>1. ทำ quiz</strong> — ค้นหาพลอยมงคลที่ใช่สำหรับคุณ</p>
            <p><strong>2. ปรึกษาดีไซน์</strong> — แชทคุยกันผ่าน LINE เลือกแบบและวัสดุ</p>
            <p><strong>3. ยืนยันแบบ + มัดจำ</strong> — ช่างจึงเริ่มลงมือทำ</p>
            <p><strong>4. รับเครื่องประดับ</strong> — ใช้เวลาประมาณ 14-30 วัน ขึ้นกับความซับซ้อน</p>
          </div>
          <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/quiz" className="jg-btn jg-btn-primary">
              เริ่มทำ quiz
            </Link>
            <Link href="/contact" className="jg-btn jg-btn-ghost">
              ปรึกษาทันที
            </Link>
          </div>
        </section>

        <p className="jg-placeholder-note">— ราคาและรูป placeholder · พร้อมให้แก้ไข —</p>
      </div>

      <SiteFooter />
    </>
  );
}
