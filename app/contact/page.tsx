import type { Metadata } from 'next';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { getSession } from '../lib/auth';

export const metadata: Metadata = {
  title: 'ติดต่อ · JanGems',
  description: 'ติดต่อ JanGems ผ่าน LINE, โทร, หรือไปที่ร้านที่จันทบุรี',
};

const CONTACTS = [
  {
    label: 'LINE Official',
    value: '@jangems',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C6.5 3 2 6.5 2 10.9c0 3.9 3.6 7.2 8.5 7.8.3.1.8.2.9.5.1.3.1.7.1.9 0 .2-.2 1-.2 1.2-.1.4-.3 1.4 1.2.8 1.5-.6 8-4.7 10.9-8 2-2.3 2.6-4.6 2.6-7.2C26 6.5 17.5 3 12 3zm-3.7 11.5H6.5c-.2 0-.3-.1-.3-.3v-3.7c0-.2.1-.3.3-.3.2 0 .3.1.3.3v3.4h1.5c.2 0 .3.1.3.3 0 .2-.1.3-.3.3zm1.2-.3c0 .2-.1.3-.3.3-.2 0-.3-.1-.3-.3v-3.7c0-.2.1-.3.3-.3.2 0 .3.1.3.3v3.7zm4.4 0c0 .2-.1.3-.3.3-.1 0-.2 0-.3-.1l-1.9-2.5v2.3c0 .2-.1.3-.3.3-.2 0-.3-.1-.3-.3v-3.7c0-.2.1-.3.3-.3.1 0 .2 0 .3.1l1.9 2.5v-2.3c0-.2.1-.3.3-.3.2 0 .3.1.3.3v3.7zm2.7-1.9c.2 0 .3.1.3.3 0 .2-.1.3-.3.3h-1.4v.9h1.4c.2 0 .3.1.3.3 0 .2-.1.3-.3.3h-1.7c-.2 0-.3-.1-.3-.3v-3.7c0-.2.1-.3.3-.3h1.7c.2 0 .3.1.3.3 0 .2-.1.3-.3.3h-1.4v.9h1.4z" />
      </svg>
    ),
  },
  {
    label: 'โทรศัพท์',
    value: '08X-XXX-XXXX',
    href: 'tel:+660000000000',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    value: '@jangems',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    value: 'JanGems',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.5-.1-2.4 0-4.1 1.5-4.1 4.2v2.4H7.5V14h2.7v8h3.3z" />
      </svg>
    ),
  },
];

export default async function ContactPage() {
  const session = await getSession();
  return (
    <>
      <SiteHeader session={session} />

      <div className="jg-page">
        <div className="jg-page-hero">
          <div className="jg-page-eyebrow jg-eyebrow">Get in touch</div>
          <h1 className="jg-page-title">
            ติดต่อ<em>JanGems</em>
          </h1>
          <p className="jg-page-sub">
            สอบถามรายละเอียด ปรึกษาดีไซน์<br />
            หรือสั่งทำเครื่องประดับเฉพาะคุณ
          </p>
        </div>

        <section className="jg-section">
          <div className="jg-section-label">ช่องทางติดต่อ</div>
          <h2 className="jg-section-title">เลือกช่องทางที่สะดวกที่สุด</h2>
          <div className="jg-contact-list">
            {CONTACTS.map((c) => (
              <a key={c.label} href={c.href} className="jg-contact-item">
                <span className="jg-contact-icon">{c.icon}</span>
                <span className="jg-contact-main">
                  <span className="jg-contact-label">{c.label}</span>
                  <span className="jg-contact-value">{c.value}</span>
                </span>
                <span className="jg-contact-arrow">→</span>
              </a>
            ))}
          </div>
        </section>

        <section className="jg-section">
          <div className="jg-section-label">ที่ตั้งร้าน</div>
          <h2 className="jg-section-title">JanGems · จันทบุรี</h2>
          <div className="jg-section-body">
            <p>
              <strong>ที่อยู่</strong><br />
              XX ถนนพลอย ตำบล/อำเภอ จังหวัดจันทบุรี XXXXX
            </p>
            <p>
              <strong>เวลาทำการ</strong><br />
              จันทร์ - เสาร์ · 10:00 - 18:00 น.
            </p>
            <p>
              <strong>หมายเหตุ</strong><br />
              สำหรับลูกค้าที่ต้องการชมเครื่องประดับหรือพลอยที่หน้าร้าน
              กรุณานัดหมายล่วงหน้าผ่าน LINE
            </p>
          </div>
        </section>

        <p className="jg-placeholder-note">— ข้อมูลติดต่อ placeholder · พร้อมให้แก้ไข —</p>
      </div>

      <SiteFooter />
    </>
  );
}
