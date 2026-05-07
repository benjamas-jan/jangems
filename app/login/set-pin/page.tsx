import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SiteHeader } from '../../components/SiteHeader';
import { SiteFooter } from '../../components/SiteFooter';
import { getSession, getLoginPhone } from '../../lib/auth';
import { SetPinForm } from './SetPinForm';

export const metadata: Metadata = {
  title: 'ตั้ง PIN · JanGems',
};

export default async function SetPinPage() {
  const session = await getSession();
  if (session) redirect('/dashboard');

  const phone = await getLoginPhone();
  if (!phone) redirect('/login');

  const masked = phone.length === 10 ? `${phone.slice(0, 3)}-xxx-xx${phone.slice(-2)}` : phone;

  return (
    <>
      <SiteHeader session={null} />

      <div className="jg-page">
        <div className="jg-page-hero">
          <div className="jg-page-eyebrow jg-eyebrow">Set up PIN</div>
          <h1 className="jg-page-title">
            ตั้ง <em>PIN 6 หลัก</em>
          </h1>
          <p className="jg-page-sub">
            สำหรับเบอร์ <strong style={{ color: 'var(--jg-gold)' }}>{masked}</strong>
            <br />
            ใช้สำหรับเข้า Dashboard ครั้งถัดไป
          </p>
        </div>

        <div className="jg-auth-card">
          <SetPinForm />
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
