import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { getSession } from '../lib/auth';
import { supabaseAdmin } from '../lib/supabase';
import { displayThaiDate, dayOfWeek, zodiacFor } from '../lib/birthday';
import { days, animals, desires, gemCutForDay } from '../quiz/data';
import { Gem } from '../quiz/Gem';
import { CtaConsult } from './CtaConsult';
import { NavaratnaGrid } from './NavaratnaGrid';

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

  if (!profile) redirect('/login');

  const dayId = profile.birthday ? dayOfWeek(profile.birthday) : profile.day;
  const day = dayId ? days.find((d) => d.id === dayId) ?? null : null;
  const zodiac = profile.birthday ? zodiacFor(profile.birthday) : null;
  const animal = profile.animal ? animals.find((a) => a.id === profile.animal) ?? null : null;
  const desire = profile.desire ? desires.find((x) => x.id === profile.desire) ?? null : null;

  const phoneFmt = profile.phone.length === 10
    ? `${profile.phone.slice(0, 3)}-${profile.phone.slice(3, 6)}-${profile.phone.slice(6)}`
    : profile.phone;

  return (
    <>
      <SiteHeader session={session} />

      <div className="jg-page">
        {/* Hero */}
        <section className="jg-dash-hero">
          <div className="jg-page-eyebrow jg-eyebrow">Your reading</div>
          <h1 className="jg-page-title">
            ยินดีต้อนรับ<br />
            <em>คุณ{session.name}</em>
          </h1>
          {(profile.birthday || day || zodiac) && (
            <p className="jg-dash-meta">
              {profile.birthday && <span>{displayThaiDate(profile.birthday)}</span>}
              {day && <span>วัน{day.th}</span>}
              {zodiac && <span>ราศี{zodiac.th} {zodiac.symbol}</span>}
            </p>
          )}
          {day && (
            <div className="jg-dash-hero-gem">
              <Gem color={day.hex} cut={gemCutForDay(day.id)} size={200} />
              <div className="jg-dash-porn">{day.porn}</div>
              <div className="jg-dash-porn-meta">สี{day.color}</div>
            </div>
          )}
        </section>

        <div className="jg-preview-banner">
          เนื้อหา preview · เนื้อหาบางส่วนกำลังตรวจสอบกับผู้เชี่ยวชาญ
        </div>

        {/* Section: พลอยประจำวันเกิด */}
        {day && (
          <section className="jg-section">
            <div className="jg-section-label">พลอยประจำวันเกิด</div>
            <h2 className="jg-section-title">วัน{day.th} · {day.porn}</h2>
            <div className="jg-section-body">
              <p>{day.personality}</p>
            </div>

            <div className="jg-trait-grid">
              <div className="jg-trait-card">
                <div className="jg-trait-label">จุดแข็ง</div>
                <ul className="jg-trait-list">
                  {day.strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="jg-trait-card">
                <div className="jg-trait-label">จุดควรระวัง</div>
                <ul className="jg-trait-list">
                  {day.weaknesses.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="jg-advice">
              <div className="jg-advice-label">คำแนะนำพลอย</div>
              <p>{day.advice}</p>
            </div>

            <div className="jg-gem-row">
              {day.gems.map((g) => (
                <span key={g} className="jg-gem-chip">
                  <span
                    className="jg-gem-chip-dot"
                    style={{ background: day.hex, color: day.hex }}
                  ></span>
                  {g}
                </span>
              ))}
            </div>
            <CtaConsult label={`ปรึกษาแจนสั่งทำพลอยวัน${day.th}`} />
          </section>
        )}

        {/* Section: พลอยประจำราศี */}
        {zodiac && (
          <section className="jg-section">
            <div className="jg-section-label">พลอยประจำราศี</div>
            <h2 className="jg-section-title">
              ราศี{zodiac.th} {zodiac.symbol}
            </h2>
            <div className="jg-section-body">
              <p>{zodiac.personality}</p>
            </div>

            <div className="jg-trait-grid">
              <div className="jg-trait-card">
                <div className="jg-trait-label">จุดแข็ง</div>
                <ul className="jg-trait-list">
                  {zodiac.strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="jg-trait-card">
                <div className="jg-trait-label">จุดควรระวัง</div>
                <ul className="jg-trait-list">
                  {zodiac.weaknesses.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="jg-advice">
              <div className="jg-advice-label">พลอยของราศี{zodiac.th}</div>
              <p>
                <strong style={{ color: 'var(--jg-gold)' }}>{zodiac.gemTh}</strong>
                {' '}({zodiac.gemEn}) — {zodiac.advice}
              </p>
            </div>

            <div className="jg-gem-row">
              <span className="jg-gem-chip">
                <span
                  className="jg-gem-chip-dot"
                  style={{ background: zodiac.gemHex, color: zodiac.gemHex }}
                ></span>
                {zodiac.gemTh}
              </span>
            </div>
            <CtaConsult label={`ปรึกษาแจนสั่งทำพลอยราศี${zodiac.th}`} />
          </section>
        )}

        {/* Section: พลอยเสริมที่คุณเลือก */}
        {desire && (
          <section className="jg-section">
            <div className="jg-section-label">พลอยเสริม{desire.th.split(' ')[0]}</div>
            <h2 className="jg-section-title">{desire.gem}</h2>
            <div className="jg-section-body">
              <p>
                คุณเลือกอยากเสริม <strong>{desire.th}</strong>
                {' '}— ความเชื่อทั่วไปนิยมใช้พลอย
                <strong style={{ color: 'var(--jg-gold)' }}> {desire.gem}</strong>
              </p>
              <p className="jg-quote-th">&ldquo;{desire.meaning}&rdquo;</p>
            </div>

            <div className="jg-advice">
              <div className="jg-advice-label">วิธีใส่ที่นิยม</div>
              <p>{desire.advice}</p>
            </div>

            <CtaConsult label={`ปรึกษาแจนสั่งทำพลอย${desire.gem}`} />
          </section>
        )}

        {/* Section: พลอยนพเก้า — 9 ด้านชีวิต */}
        <section className="jg-section">
          <div className="jg-section-label">พลอยนพเก้า · 9 ด้านชีวิต</div>
          <h2 className="jg-section-title">9 พลอยศักดิ์สิทธิ์</h2>
          <div className="jg-section-body">
            <p>
              พลอย 9 ชนิดผูกพันกับ <strong>9 ดาวประจำในจักรวาล</strong>
              แต่ละชนิดส่งเสริมด้านชีวิตที่ต่างกัน — งาน รัก โชค คุ้มครอง สุขภาพ ปัญญา
            </p>
          </div>
          <NavaratnaGrid highlightHex={day?.hex} />
          <CtaConsult label="ปรึกษาแจนสั่งทำพลอยนพเก้าครบเซต" />
        </section>

        {/* Section: บัญชี */}
        <section className="jg-section">
          <div className="jg-section-label">บัญชีของคุณ</div>
          <h2 className="jg-section-title">ข้อมูลส่วนตัว</h2>
          <div className="jg-account-list">
            <div className="jg-account-item">
              <span className="jg-account-label">ชื่อเล่น</span>
              <span className="jg-account-value">คุณ{session.name}</span>
            </div>
            <div className="jg-account-item">
              <span className="jg-account-label">เบอร์โทร</span>
              <span className="jg-account-value">{phoneFmt}</span>
            </div>
            {profile.birthday && (
              <div className="jg-account-item">
                <span className="jg-account-label">วันเกิด</span>
                <span className="jg-account-value">{displayThaiDate(profile.birthday)}</span>
              </div>
            )}
            {animal && (
              <div className="jg-account-item">
                <span className="jg-account-label">บุคลิก</span>
                <span className="jg-account-value">{animal.th}</span>
              </div>
            )}
          </div>
          <p className="jg-account-note">
            แก้ไขข้อมูล: ติดต่อแจนผ่าน LINE (ระบบแก้ไขในตัวเองกำลังพัฒนา)
          </p>
        </section>
      </div>

      <SiteFooter />
    </>
  );
}
