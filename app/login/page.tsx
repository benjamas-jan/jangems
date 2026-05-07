import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { getSession } from '../lib/auth';
import { LoginPhoneForm } from './LoginPhoneForm';

export const metadata: Metadata = {
  title: 'เข้าสู่ระบบ · JanGems',
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect('/dashboard');
  return (
    <>
      <SiteHeader session={null} />

      <div className="jg-page">
        <div className="jg-page-hero">
          <div className="jg-page-eyebrow jg-eyebrow">Member login</div>
          <h1 className="jg-page-title">
            เข้าสู่<em>ระบบ</em>
          </h1>
          <p className="jg-page-sub">
            ใส่เบอร์โทรที่สมัครไว้
            <br />
            เพื่อเข้าดูพลอยมงคลเฉพาะคุณ
          </p>
        </div>

        <div className="jg-auth-card">
          <LoginPhoneForm />
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
