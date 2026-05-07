import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SiteHeader } from '../../components/SiteHeader';
import { SiteFooter } from '../../components/SiteFooter';
import { getSession, getLoginPhone } from '../../lib/auth';
import { LoginPinForm } from './LoginPinForm';

export const metadata: Metadata = {
  title: 'ใส่ PIN · JanGems',
};

export default async function LoginPinPage() {
  const session = await getSession();
  if (session) redirect('/dashboard');

  const phone = await getLoginPhone();
  if (!phone) redirect('/login');

  // Mask phone: 081-xxx-xx78 (show first 3, last 2)
  const masked = phone.length === 10 ? `${phone.slice(0, 3)}-xxx-xx${phone.slice(-2)}` : phone;

  return (
    <>
      <SiteHeader session={null} />

      <div className="jg-page">
        <div className="jg-page-hero">
          <div className="jg-page-eyebrow jg-eyebrow">Enter PIN</div>
          <h1 className="jg-page-title">
            ใส่ <em>PIN</em>
          </h1>
          <p className="jg-page-sub">
            สำหรับเบอร์ <strong style={{ color: 'var(--jg-gold)' }}>{masked}</strong>
          </p>
        </div>

        <div className="jg-auth-card">
          <LoginPinForm />
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
