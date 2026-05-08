import type { Metadata } from 'next';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { getSession } from '../lib/auth';
import { LINE_OA_URL, LINE_OA_LABEL } from '../lib/config';

export const metadata: Metadata = {
  title: 'ติดต่อ · JanGems',
  description: 'ติดต่อ JanGems ผ่าน LINE Official หรือไปที่ร้านเบญจจิวเวอรี่ที่จันทบุรี',
};

const CONTACTS = [
  {
    label: 'LINE Official',
    value: LINE_OA_LABEL,
    href: LINE_OA_URL,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C6.5 3 2 6.5 2 10.9c0 3.9 3.6 7.2 8.5 7.8.3.1.8.2.9.5.1.3.1.7.1.9 0 .2-.2 1-.2 1.2-.1.4-.3 1.4 1.2.8 1.5-.6 8-4.7 10.9-8 2-2.3 2.6-4.6 2.6-7.2C26 6.5 17.5 3 12 3zm-3.7 11.5H6.5c-.2 0-.3-.1-.3-.3v-3.7c0-.2.1-.3.3-.3.2 0 .3.1.3.3v3.4h1.5c.2 0 .3.1.3.3 0 .2-.1.3-.3.3zm1.2-.3c0 .2-.1.3-.3.3-.2 0-.3-.1-.3-.3v-3.7c0-.2.1-.3.3-.3.2 0 .3.1.3.3v3.7zm4.4 0c0 .2-.1.3-.3.3-.1 0-.2 0-.3-.1l-1.9-2.5v2.3c0 .2-.1.3-.3.3-.2 0-.3-.1-.3-.3v-3.7c0-.2.1-.3.3-.3.1 0 .2 0 .3.1l1.9 2.5v-2.3c0-.2.1-.3.3-.3.2 0 .3.1.3.3v3.7zm2.7-1.9c.2 0 .3.1.3.3 0 .2-.1.3-.3.3h-1.4v.9h1.4c.2 0 .3.1.3.3 0 .2-.1.3-.3.3h-1.7c-.2 0-.3-.1-.3-.3v-3.7c0-.2.1-.3.3-.3h1.7c.2 0 .3.1.3.3 0 .2-.1.3-.3.3h-1.4v.9h1.4z" />
      </svg>
    ),
  },
];

const STORES = [
  {
    name: 'ร้านเบญจจิวเวอรี่ · KP Grand',
    location: 'โรงแรมเคพีแกรนด์',
    address:
      '35 200-201 ถนนตรีรัตน์ ตำบลจันทนิมิต อำเภอเมืองจันทบุรี จังหวัดจันทบุรี 22000',
    mapsQuery: 'เบญจจิวเวอรี่ KP Grand โรงแรมเคพีแกรนด์ จันทบุรี',
  },
  {
    name: 'ร้านเบญจจิวเวอรี่ · ร้านต้นตำรับของฝากจันทบุรี',
    location: null,
    address:
      '81/38 ถนนสุขุมวิท ตำบลพลับพลา อำเภอเมืองจันทบุรี จังหวัดจันทบุรี 22000',
    mapsQuery: 'เบญจจิวเวอรี่ ร้านต้นตำรับของฝากจันทบุรี',
  },
];

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

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
            สอบถามรายละเอียด ปรึกษาดีไซน์
            <br />
            หรือสั่งทำเครื่องประดับเฉพาะคุณ
          </p>
        </div>

        <section className="jg-section">
          <div className="jg-section-label">ช่องทางติดต่อ</div>
          <h2 className="jg-section-title">เลือกช่องทางที่สะดวกที่สุด</h2>
          <div className="jg-contact-list">
            {CONTACTS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="jg-contact-item"
              >
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
          <div className="jg-section-label">ที่ตั้งร้าน · 2 สาขา</div>
          <h2 className="jg-section-title">ร้านเบญจจิวเวอรี่ · จันทบุรี</h2>

          <div className="jg-stores">
            {STORES.map((s) => (
              <a
                key={s.name}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="jg-store-card"
              >
                <span className="jg-store-icon">
                  <PinIcon />
                </span>
                <span className="jg-store-main">
                  <span className="jg-store-name">{s.name}</span>
                  {s.location && <span className="jg-store-location">{s.location}</span>}
                  <span className="jg-store-address">{s.address}</span>
                  <span className="jg-store-cta">เปิดใน Google Maps →</span>
                </span>
              </a>
            ))}
          </div>

          <div className="jg-section-body" style={{ marginTop: 18 }}>
            <p>
              <strong>เวลาทำการ</strong>
              <br />
              ทุกวัน · 10:00 - 16:30 น.
            </p>
            <p>
              <strong>หมายเหตุ</strong>
              <br />
              ลูกค้าที่ต้องการชมพลอยหรือเครื่องประดับที่หน้าร้าน
              กรุณานัดหมายล่วงหน้าผ่าน LINE
            </p>
          </div>
        </section>
      </div>

      <SiteFooter />
    </>
  );
}
