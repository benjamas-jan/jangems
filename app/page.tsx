import Link from 'next/link';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { getSession } from './lib/auth';

export default async function Home() {
  const session = await getSession();
  return (
    <>
      <SiteHeader session={session} />

      <div className="jg-welcome jg-page-enter">
        <div className="jg-welcome-stars">✦ ✧ ✦</div>
        <div className="jg-welcome-eyebrow jg-eyebrow">Mystic gems · Chanthaburi</div>
        <h1 className="jg-welcome-title">
          พลอยมงคล<br />
          จาก<em>จันทบุรี</em>
        </h1>
        <p className="jg-welcome-sub">
          เครื่องประดับพลอยงานสั่งทำ จากช่างฝีมือจันทบุรี<br />
          ค้นหาพลอยที่ใช่สำหรับคุณ ตามตำราโหราศาสตร์ไทย
        </p>
        <Link href="/quiz" className="jg-btn jg-btn-primary" style={{ padding: '16px 32px', fontSize: 15 }}>
          เริ่มทำนายพลอยมงคล
        </Link>
        <div className="jg-welcome-meta">
          <span>3 คำถาม</span>
          <span>1 นาที</span>
          <span>ฟรี</span>
        </div>
      </div>

      <section className="jg-home-tiles">
        <Link href="/about" className="jg-home-tile">
          <span className="jg-home-tile-eyebrow jg-eyebrow">Our story</span>
          <span className="jg-home-tile-title">เกี่ยวกับ JanGems</span>
          <span className="jg-home-tile-desc">เรื่องราวของช่างฝีมือ และพลอยจากจันทบุรี</span>
        </Link>
        <Link href="/products" className="jg-home-tile">
          <span className="jg-home-tile-eyebrow jg-eyebrow">Made-to-order</span>
          <span className="jg-home-tile-title">เครื่องประดับสั่งทำ</span>
          <span className="jg-home-tile-desc">ตัวอย่างผลงานและวัสดุที่เลือกได้</span>
        </Link>
        <Link href="/contact" className="jg-home-tile">
          <span className="jg-home-tile-eyebrow jg-eyebrow">Get in touch</span>
          <span className="jg-home-tile-title">ติดต่อปรึกษา</span>
          <span className="jg-home-tile-desc">สอบถามและสั่งทำผ่าน LINE</span>
        </Link>
      </section>

      <SiteFooter />
    </>
  );
}
