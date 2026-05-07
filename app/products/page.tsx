import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';

export const metadata: Metadata = {
  title: 'สินค้า · JanGems',
  description: 'ตัวอย่างเครื่องประดับพลอยสั่งทำจาก JanGems',
};

const SAMPLES = [
  { type: 'Ring',     name: 'แหวนพลอยเม็ดเดี่ยว',  price: 'เริ่มต้น 8,500 บาท' },
  { type: 'Earring',  name: 'ต่างหูพลอยทรงหยดน้ำ',  price: 'เริ่มต้น 6,200 บาท' },
  { type: 'Pendant',  name: 'จี้พลอยล้อมเพชร',     price: 'เริ่มต้น 12,000 บาท' },
  { type: 'Bracelet', name: 'กำไลพลอยร้อยลวดทอง',  price: 'เริ่มต้น 9,800 บาท' },
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

export default function ProductsPage() {
  return (
    <>
      <SiteHeader />

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
          <h2 className="jg-section-title">งานสั่งทำที่ผ่านมา</h2>
          <div className="jg-section-body">
            <p>
              ตัวอย่างประเภทเครื่องประดับที่ลูกค้านิยมสั่งทำ
              ราคาขึ้นกับชนิดของพลอย ความซับซ้อนของดีไซน์ และโลหะที่เลือก
            </p>
          </div>

          <div className="jg-product-grid">
            {SAMPLES.map((p) => (
              <div key={p.name} className="jg-product-card">
                <div className="jg-product-thumb">
                  <GemThumb />
                </div>
                <div className="jg-product-body">
                  <span className="jg-product-eyebrow">{p.type}</span>
                  <span className="jg-product-name">{p.name}</span>
                  <span className="jg-product-price">{p.price}</span>
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
