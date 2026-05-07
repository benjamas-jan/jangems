import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { getSession } from '../lib/auth';
import { supabaseAdmin } from '../lib/supabase';
import { displayThaiDate, dayOfWeek, zodiacFor } from '../lib/birthday';
import { days } from '../quiz/data';

export const metadata: Metadata = {
  title: 'Dashboard · JanGems',
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const supabase = supabaseAdmin();
  const { data: profile } = await supabase
    .from('profiles')
    .select('phone, name, birthday, day, animal, desire')
    .eq('phone', session.phone)
    .maybeSingle();

  if (!profile) {
    redirect('/login');
  }

  const dayId = profile.birthday ? dayOfWeek(profile.birthday) : profile.day;
  const day = days.find((d) => d.id === dayId);
  const zodiac = profile.birthday ? zodiacFor(profile.birthday) : null;

  return (
    <>
      <SiteHeader session={session} />

      <div className="jg-page">
        <div className="jg-page-hero">
          <div className="jg-page-eyebrow jg-eyebrow">Your reading</div>
          <h1 className="jg-page-title">
            ยินดีต้อนรับ<br />
            <em>คุณ{session.name}</em>
          </h1>
        </div>

        <section className="jg-section">
          <div className="jg-section-label">ข้อมูลของคุณ</div>
          <div className="jg-section-body">
            {profile.birthday && (
              <p>
                <strong>วันเกิด</strong> · {displayThaiDate(profile.birthday)}
              </p>
            )}
            {day && (
              <p>
                <strong>วัน{day.th}</strong> · ภรณ์ {day.porn} · สี{day.color}
              </p>
            )}
            {zodiac && (
              <p>
                <strong>ราศี{zodiac.th}</strong> {zodiac.symbol} · พลอย {zodiac.gemTh}
              </p>
            )}
          </div>
        </section>

        <section className="jg-section">
          <div className="jg-section-label">เร็วๆ นี้</div>
          <div className="jg-section-body">
            <p>
              Dashboard กำลังเตรียมเนื้อหาเต็มรูปแบบ:
            </p>
            <p>
              ✦ พลอยประจำวันเกิดแบบเต็ม<br />
              ✦ พลอยประจำราศีและคุณสมบัติ<br />
              ✦ พลอยนพเก้า 9 ชนิด<br />
              ✦ พลอยเสริม 9 ด้านชีวิต<br />
              ✦ ปุ่มปรึกษา Jan สั่งทำพลอย
            </p>
          </div>
        </section>

        <p className="jg-placeholder-note">— Dashboard scaffolding · Round 3 จะเติมเนื้อหาเต็ม —</p>
      </div>

      <SiteFooter />
    </>
  );
}
