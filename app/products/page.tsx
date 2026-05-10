import type { Metadata } from 'next';
import Link from 'next/link';
import { readdirSync } from 'fs';
import path from 'path';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { getSession } from '../lib/auth';

export const metadata: Metadata = {
  title: 'สินค้า · JanGems',
  description: 'ตัวอย่างเครื่องประดับพลอยสั่งทำจาก JanGems',
};

type Product = {
  id: string;
  type: string;
  name: string;
  note: string;
  image: string;
  tag?: string;
};

// Detect a category from filename prefix so different jewelry kinds
// can be uploaded to the same folder.
function categoryFromFilename(name: string): { type: string; name: string } {
  const lower = name.toLowerCase();
  if (lower.startsWith('pendant')) return { type: 'Pendant', name: 'จี้พลอย · งานสั่งทำ' };
  if (lower.startsWith('bangle')) return { type: 'Bangle', name: 'กำไลพลอย · งานสั่งทำ' };
  if (lower.startsWith('bracelet')) return { type: 'Bracelet', name: 'สร้อยข้อมือพลอย · งานสั่งทำ' };
  if (lower.startsWith('earring')) return { type: 'Earring', name: 'ต่างหูพลอย · งานสั่งทำ' };
  if (lower.startsWith('necklace')) return { type: 'Necklace', name: 'สร้อยคอพลอย · งานสั่งทำ' };
  return { type: 'Ring', name: 'แหวนพลอย · งานสั่งทำ' };
}

// Read /public/products at request time. Newest first by filename (descending),
// which works naturally if filenames embed a timestamp (HHMMSS or YYYYMMDD).
function loadProducts(): Product[] {
  try {
    const dir = path.join(process.cwd(), 'public', 'products');
    const files = readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort()
      .reverse();
    return files.map((f) => {
      const cat = categoryFromFilename(f);
      return {
        id: f.replace(/\.[^.]+$/, ''),
        type: cat.type,
        name: cat.name,
        note: 'ปรึกษาราคา',
        image: `/products/${f}`,
        tag: 'งานช่างจันทบุรี',
      };
    });
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const session = await getSession();
  const products = loadProducts();

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
          <h2 className="jg-section-title">เครื่องประดับงานสั่งทำ</h2>
          <div className="jg-section-body">
            <p>
              ทุกชิ้นเป็น<strong>งานช่างทำมือ</strong> คัดสรรพลอยและออกแบบเฉพาะ
              ตามความต้องการของลูกค้า
            </p>
            <p>
              ราคาขึ้นกับชนิดของพลอย ขนาด และความซับซ้อนของดีไซน์
              สอบถามรายละเอียดและราคาผ่าน LINE
            </p>
          </div>

          {products.length > 0 && (
            <div className="jg-product-grid">
              {products.map((p) => (
                <div key={p.id} className="jg-product-card">
                  <div className="jg-product-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} className="jg-product-img" />
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
          )}
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
      </div>

      <SiteFooter />
    </>
  );
}
