import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา · JanGems',
  description: 'เรื่องราวของ JanGems และช่างฝีมือพลอยจังหวัดจันทบุรี',
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <div className="jg-page">
        <div className="jg-page-hero">
          <div className="jg-page-eyebrow jg-eyebrow">Our story</div>
          <h1 className="jg-page-title">
            เรื่องราว<em>JanGems</em>
          </h1>
          <p className="jg-page-sub">
            เครื่องประดับพลอยจากช่างฝีมือจันทบุรี<br />
            ที่ผูกผสมความเชื่อ ตำราโหราศาสตร์ และงานศิลป์
          </p>
        </div>

        <section className="jg-section">
          <div className="jg-section-label">จุดเริ่มต้น</div>
          <h2 className="jg-section-title">ช่างจันทบุรี · พลอยที่คัดสรรมาดี</h2>
          <div className="jg-section-body">
            <p>
              <strong>จันทบุรี</strong> เป็นศูนย์กลางช่างฝีมือพลอยที่สั่งสมประสบการณ์มายาวนาน
              ทั้งการคัดเลือก เจียระไน และทำเครื่องประดับ
            </p>
            <p>
              ปัจจุบันพลอยส่วนใหญ่มาจากแหล่งต่างประเทศ
              สิ่งที่ทำให้ JanGems พิเศษคือ
              <strong> การคัดสรรพลอยคุณภาพ</strong>โดยช่างจันทบุรี
              ผสมผสานกับ<strong>ฝีมือการเจียระไนและทำเครื่องประดับ</strong>
              ที่ส่งต่อกันมาในเมืองพลอยแห่งนี้
            </p>
          </div>
        </section>

        <section className="jg-section">
          <div className="jg-section-label">ช่างฝีมือ</div>
          <h2 className="jg-section-title">งานที่ใส่ใจในทุกรายละเอียด</h2>
          <div className="jg-section-body">
            <p>
              ทุกชิ้นงานเป็นการคัดเลือกพลอยและออกแบบโดยช่างที่มีประสบการณ์
              ผสมผสานเทคนิคงานเจียระไนแบบดั้งเดิมเข้ากับการออกแบบร่วมสมัย
            </p>
            <p>
              เราเชื่อว่าเครื่องประดับที่ดี ต้องเป็นมากกว่าของสวย —
              ต้องเป็นของที่มีความหมายและสวมใส่ได้ทุกวัน
            </p>
          </div>
        </section>

        <section className="jg-section">
          <div className="jg-section-label">Made-to-order</div>
          <h2 className="jg-section-title">ทุกชิ้นออกแบบเฉพาะคุณ</h2>
          <div className="jg-section-body">
            <p>
              เราเน้นการ <strong>สั่งทำ</strong> มากกว่าการขายสำเร็จ
              เพราะเชื่อว่าเครื่องประดับที่ใช่ ต้องเริ่มจากดวงและความต้องการของผู้สวมใส่
            </p>
            <p>
              เริ่มจากการทำ quiz เพื่อค้นหาพลอยมงคลของคุณ
              แล้วปรึกษาดีไซน์กับเราผ่าน LINE
              จากนั้นช่างจะลงมือทำทีละชิ้นจนเสร็จสมบูรณ์
            </p>
          </div>
          <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/quiz" className="jg-btn jg-btn-primary">
              เริ่มทำ quiz
            </Link>
            <Link href="/contact" className="jg-btn jg-btn-ghost">
              ติดต่อปรึกษา
            </Link>
          </div>
        </section>

        <p className="jg-placeholder-note">— เนื้อหา placeholder · พร้อมให้แก้ไข —</p>
      </div>

      <SiteFooter />
    </>
  );
}
