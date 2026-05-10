'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import {
  days,
  animals,
  desires,
  gemCutForDay,
  type DayId,
  type AnimalId,
  type DesireId,
} from './data';
import { useRouter } from 'next/navigation';
import { Icon, animalIcons, desireIcons } from './icons';
import { Gem } from './Gem';
import { Brand } from '../components/Brand';
import { SiteFooter } from '../components/SiteFooter';
import { ThaiDatePicker } from '../components/ThaiDatePicker';
import { PinInput } from '../components/PinInput';
import { createProfile } from '../actions/profile';
import { checkPhone, setPin } from '../actions/auth';

type Step = 'welcome' | 'q1' | 'q2' | 'q3' | 'loading' | 'result';

type Answers = {
  day?: DayId;
  animal?: AnimalId;
  desire?: DesireId;
};

function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <div className="jg-welcome jg-page-enter">
      <div className="jg-welcome-stars">✦ ✧ ✦</div>
      <div className="jg-welcome-eyebrow jg-eyebrow">Gem personality reading</div>
      <h1 className="jg-welcome-title">
        ค้นพบ<em>พลอยมงคล</em>
        <br />
        ที่เป็นของคุณ
      </h1>
      <p className="jg-welcome-sub">
        ตอบ 3 คำถามสั้นๆ ตามตำราโหราศาสตร์ไทย
        <br />
        เพื่อค้นหาพลอยที่ส่งเสริมพลังของคุณโดยเฉพาะ
      </p>
      <button className="jg-btn jg-btn-primary" onClick={onStart} style={{ padding: '16px 32px', fontSize: 15 }}>
        เริ่มทำนาย <Icon.ArrowRight />
      </button>
      <div className="jg-welcome-meta">
        <span>3 คำถาม</span>
        <span>1 นาที</span>
        <span>ฟรี</span>
      </div>
    </div>
  );
}

function Progress({ step }: { step: number }) {
  return (
    <div className="jg-progress">
      {[0, 1, 2].map((i) => (
        <div key={i} className={`jg-progress-dot ${i < step ? 'done' : i === step ? 'active' : ''}`}></div>
      ))}
    </div>
  );
}

function Q1({ onPick, onBack }: { onPick: (id: DayId) => void; onBack: () => void }) {
  return (
    <div className="jg-quiz jg-page-enter" key="q1">
      <button className="jg-back" onClick={onBack}>
        <Icon.ArrowLeft /> กลับ
      </button>
      <div className="jg-q-eyebrow jg-eyebrow">คำถามที่ 01 / 03</div>
      <h2 className="jg-q-title">
        คุณเกิด<em>วันอะไร?</em>
      </h2>
      <div className="jg-days">
        {days.map((d) => (
          <button key={d.id} className="jg-day" onClick={() => onPick(d.id)}>
            <span className="jg-day-dot" style={{ background: d.hex, color: d.hex }}></span>
            <span className="jg-day-name">วัน{d.th}</span>
            <span className="jg-day-color">สี{d.color}</span>
          </button>
        ))}
      </div>
      <p className="jg-q-hint">— ตามตำราโหราศาสตร์ไทย —</p>
    </div>
  );
}

function Q2({ onPick, onBack }: { onPick: (id: AnimalId) => void; onBack: () => void }) {
  return (
    <div className="jg-quiz jg-page-enter" key="q2">
      <button className="jg-back" onClick={onBack}>
        <Icon.ArrowLeft /> กลับ
      </button>
      <div className="jg-q-eyebrow jg-eyebrow">คำถามที่ 02 / 03</div>
      <h2 className="jg-q-title">
        คุณคือคนแบบ<em>ไหน?</em>
      </h2>
      <div className="jg-options">
        {animals.map((a) => {
          const I = animalIcons[a.id];
          return (
            <button key={a.id} className="jg-opt jg-opt-animal" onClick={() => onPick(a.id)}>
              <span className="jg-opt-animal-icon">
                <I />
              </span>
              <span className="jg-opt-main">
                <span className="jg-opt-label">{a.th}</span>
                <span className="jg-opt-sub">{a.desc}</span>
              </span>
              <span className="jg-opt-arrow">
                <Icon.ArrowRight />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Q3({ onPick, onBack }: { onPick: (id: DesireId) => void; onBack: () => void }) {
  return (
    <div className="jg-quiz jg-page-enter" key="q3">
      <button className="jg-back" onClick={onBack}>
        <Icon.ArrowLeft /> กลับ
      </button>
      <div className="jg-q-eyebrow jg-eyebrow">คำถามที่ 03 / 03</div>
      <h2 className="jg-q-title">
        อยากเสริม<em>เรื่องไหน?</em>
      </h2>
      <div className="jg-options">
        {desires.map((x) => {
          const I = desireIcons[x.id];
          return (
            <button key={x.id} className="jg-opt jg-opt-animal" onClick={() => onPick(x.id)}>
              <span className="jg-opt-animal-icon">
                <I />
              </span>
              <span className="jg-opt-main">
                <span className="jg-opt-label">{x.th}</span>
                <span className="jg-opt-sub">
                  เสริมพลัง{x.gem} · {x.meaning}
                </span>
              </span>
              <span className="jg-opt-arrow">
                <Icon.ArrowRight />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="jg-loader">
      <div className="jg-loader-stage">
        <svg className="jg-constellation" viewBox="0 0 220 220" width="220" height="220">
          <g fill="none" stroke="#D4A24C" strokeWidth="0.6" opacity="0.55">
            <circle cx="110" cy="110" r="95" />
            <circle cx="110" cy="110" r="80" />
          </g>
          <g fill="#D4A24C">
            <circle cx="110" cy="15" r="2.5" />
            <circle cx="200" cy="80" r="1.8" />
            <circle cx="180" cy="170" r="2.2" />
            <circle cx="80" cy="200" r="1.6" />
            <circle cx="20" cy="140" r="2" />
            <circle cx="40" cy="50" r="1.5" />
          </g>
          <g stroke="#D4A24C" strokeWidth="0.4" opacity="0.4" fill="none">
            <path d="M110 15 L200 80 L180 170 L80 200 L20 140 L40 50 Z" />
          </g>
        </svg>
        <svg
          className="jg-constellation jg-constellation-2"
          viewBox="0 0 220 220"
          width="220"
          height="220"
          style={{ position: 'absolute', inset: 0 }}
        >
          <g fill="none" stroke="#B8869C" strokeWidth="0.5" opacity="0.4">
            <circle cx="110" cy="110" r="60" />
          </g>
          <g fill="#F2EAD6">
            <circle cx="170" cy="110" r="1.2" />
            <circle cx="50" cy="110" r="1.2" />
            <circle cx="110" cy="50" r="1" />
            <circle cx="110" cy="170" r="1" />
          </g>
        </svg>
        <div className="jg-loader-core">
          <div className="jg-loader-core-inner"></div>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div className="jg-loader-text">
          กำลังคำนวณดวง
          <span className="jg-loader-dots">
            <span />
            <span />
            <span />
          </span>
        </div>
        <div className="jg-loader-sub" style={{ marginTop: 8 }}>
          Reading the stars
        </div>
      </div>
    </div>
  );
}

function SignupCard({ onClick }: { onClick: () => void }) {
  return (
    <div className="jg-cta-card">
      <div className="jg-cta-eyebrow">✦ ข้อมูลโหราศาสตร์ครบทุกมิติ ✦</div>
      <h3 className="jg-cta-title">
        ปลดล็อคข้อมูลโหราศาสตร์เพิ่มเติม
        <br />
        เพียงสมัครสมาชิก
      </h3>
      <div className="jg-cta-list">
        <div className="jg-cta-list-item">
          <span className="jg-cta-check">
            <Icon.Check />
          </span>
          <span>พลอยประจำวันเกิด + ราศี อย่างละเอียด</span>
        </div>
        <div className="jg-cta-list-item">
          <span className="jg-cta-check">
            <Icon.Check />
          </span>
          <span>พลอยนพเก้า · 9 ด้านชีวิต</span>
        </div>
        <div className="jg-cta-list-item">
          <span className="jg-cta-check">
            <Icon.Check />
          </span>
          <span>คำแนะนำการสั่งทำจากแจน</span>
        </div>
      </div>
      <button className="jg-btn jg-btn-primary" onClick={onClick} style={{ width: '100%' }}>
        <Icon.Sparkle /> สมัครฟรี · ดูดวงเต็ม
      </button>
      <div className="jg-cta-fineprint">30 วินาที · ฟรีตลอดชีพ</div>
    </div>
  );
}

function DashboardLinkCard() {
  return (
    <div className="jg-cta-card">
      <div className="jg-cta-eyebrow">✦ Welcome back ✦</div>
      <h3 className="jg-cta-title">
        ดูพลอยมงคลครบ
        <br />
        ใน Dashboard ของคุณ
      </h3>
      <div className="jg-cta-list">
        <div className="jg-cta-list-item">
          <span className="jg-cta-check">
            <Icon.Check />
          </span>
          <span>พลอยประจำวันเกิด · ราศี</span>
        </div>
        <div className="jg-cta-list-item">
          <span className="jg-cta-check">
            <Icon.Check />
          </span>
          <span>พลอยนพเก้า 9 ด้านชีวิต</span>
        </div>
        <div className="jg-cta-list-item">
          <span className="jg-cta-check">
            <Icon.Check />
          </span>
          <span>ปรึกษาแจนสั่งทำเครื่องประดับ</span>
        </div>
      </div>
      <Link href="/dashboard" className="jg-btn jg-btn-primary" style={{ width: '100%' }}>
        <Icon.Sparkle /> ไป Dashboard
      </Link>
    </div>
  );
}

function Result({
  answers,
  onSignup,
  onShare,
  onRestart,
  loggedIn,
}: {
  answers: Required<Answers>;
  onSignup: () => void;
  onShare: () => void;
  onRestart: () => void;
  loggedIn: boolean;
}) {
  const day = days.find((d) => d.id === answers.day)!;
  const animal = animals.find((a) => a.id === answers.animal)!;
  const desire = desires.find((x) => x.id === answers.desire)!;
  const cut = gemCutForDay(day.id);
  const AnimalI = animalIcons[animal.id];

  const dotStyle: CSSProperties = { background: day.hex, color: day.hex };
  const titleIconWrap: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
  };
  const titleIcon: CSSProperties = {
    width: 36,
    height: 36,
    display: 'grid',
    placeItems: 'center',
    color: 'var(--jg-gold)',
    flexShrink: 0,
  };

  return (
    <div className="jg-result">
      <div className="jg-result-eyebrow jg-eyebrow">Your reading</div>
      <h1 className="jg-result-porn">{day.porn}</h1>
      <div className="jg-result-meta">
        ผู้เกิดวัน<b>{day.th}</b> · สี<b>{day.color}</b>
      </div>

      <div className="jg-result-divider">
        <svg width="10" height="10" viewBox="0 0 10 10">
          <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="jg-result-hero">
        <Gem color={day.hex} cut={cut} size={240} />
      </div>

      <div className="jg-result-section">
        <div className="jg-rs-label">พลอยประจำตัว</div>
        <div className="jg-rs-title">{day.gems[0]}</div>
        <p className="jg-rs-desc">
          ตามตำราโหราศาสตร์ไทย ผู้เกิดวัน{day.th}เป็น<b style={{ color: 'var(--jg-gold)' }}>{day.porn}</b>{' '}
          มีพลอยประจำตัวเป็นพลอยสี{day.color}
        </p>
        <div className="jg-gem-row">
          {day.gems.map((g) => (
            <span key={g} className="jg-gem-chip">
              <span className="jg-gem-chip-dot" style={dotStyle}></span>
              {g}
            </span>
          ))}
        </div>
      </div>

      <div className="jg-result-section">
        <div className="jg-rs-label">บุคลิกของคุณ</div>
        <div className="jg-rs-title jg-rs-title-with-icon" style={titleIconWrap}>
          <span style={titleIcon}>
            <AnimalI />
          </span>
          คุณคือ{animal.th}
        </div>
        <p className="jg-rs-desc">{animal.desc}</p>
      </div>

      <div className="jg-result-section">
        <div className="jg-rs-label">พลอยเสริม{desire.th.split(' ')[0]}</div>
        <div className="jg-rs-title">{desire.gem}</div>
        <p className="jg-rs-desc">
          เสริมพลัง<b style={{ color: 'var(--jg-ink)' }}>{desire.th}</b>
        </p>
        <p className="jg-quote-th">&ldquo;{desire.meaning}&rdquo;</p>
      </div>

      <div className="jg-result-section">
        <div className="jg-rs-label">แชร์ผลของคุณ</div>
        <div className="jg-share-row jg-share-row-1">
          <button className="jg-share-btn jg-share-btn-line" onClick={onShare}>
            <span className="jg-share-icon">
              <Icon.LINE />
            </span>
            แชร์บอกเพื่อนใน LINE
          </button>
        </div>
      </div>

      {loggedIn ? <DashboardLinkCard /> : <SignupCard onClick={onSignup} />}

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <button className="jg-back" onClick={onRestart}>
          ↺ ทำใหม่อีกครั้ง
        </button>
      </div>

      <SiteFooter />
    </div>
  );
}

type ModalStep = 'form' | 'pin';

function Modal({ answers, onClose }: { answers: Required<Answers>; onClose: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState<ModalStep>('form');
  const [form, setForm] = useState({ name: '', phone: '', line: '', birthday: '' });
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!form.name.trim()) {
      setError('กรุณากรอกชื่อ');
      return;
    }
    if (!/^0\d{9}$/.test(form.phone)) {
      setError('เบอร์โทรต้อง 10 หลัก ขึ้นต้นด้วย 0');
      return;
    }
    if (!form.birthday) {
      setError('กรุณากรอกวันเกิด');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await createProfile({
        name: form.name,
        phone: form.phone,
        line_id: form.line,
        birthday: form.birthday,
        day: answers.day,
        animal: answers.animal,
        desire: answers.desire,
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      // Set the short-lived phone cookie so setPin() knows whose PIN to write
      const phoneRes = await checkPhone(form.phone);
      if (!phoneRes.ok) {
        setError(phoneRes.error);
        return;
      }
      if (phoneRes.status === 'has-pin') {
        // Already had a PIN — odd, but redirect to login
        router.push('/login/pin');
        return;
      }
      setStep('pin');
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาด ลองใหม่อีกครั้ง');
    } finally {
      setSubmitting(false);
    }
  };

  const submitPin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (pin1.length !== 6 || pin2.length !== 6) {
      setError('PIN ต้องเป็นตัวเลข 6 หลัก');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await setPin(pin1, pin2);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาด ลองใหม่');
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 'pin') {
    return (
      <div className="jg-modal-backdrop" onClick={onClose}>
        <div className="jg-modal" onClick={(e) => e.stopPropagation()}>
          <button className="jg-modal-close" onClick={onClose}>
            <Icon.Close />
          </button>
          <div className="jg-modal-eyebrow jg-eyebrow">ขั้นตอนสุดท้าย</div>
          <h3 className="jg-modal-title">ตั้ง PIN 6 หลัก</h3>
          <p className="jg-modal-sub">
            คุณ{form.name} — ใช้เปิด Dashboard ของคุณ
            <br />
            ครั้งถัดไป
          </p>
          <form onSubmit={submitPin}>
            <div className="jg-field">
              <label>PIN ใหม่</label>
              <PinInput value={pin1} onChange={setPin1} autoFocus />
            </div>
            <div className="jg-field">
              <label>ยืนยันอีกครั้ง</label>
              <PinInput value={pin2} onChange={setPin2} />
            </div>
            {error && <p className="jg-modal-error">{error}</p>}
            <button
              type="submit"
              className="jg-btn jg-btn-primary"
              disabled={submitting || pin1.length !== 6 || pin2.length !== 6}
            >
              {submitting ? 'กำลังบันทึก…' : 'บันทึกและเข้า Dashboard'}
            </button>
            <p className="jg-modal-fineprint">
              ลืม PIN ต้องปรึกษาแจนผ่าน LINE เพื่อรีเซ็ต
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="jg-modal-backdrop" onClick={onClose}>
      <div className="jg-modal" onClick={(e) => e.stopPropagation()}>
        <button className="jg-modal-close" onClick={onClose}>
          <Icon.Close />
        </button>
        <div className="jg-modal-eyebrow jg-eyebrow">Create profile</div>
        <h3 className="jg-modal-title">Profile ของคุณ</h3>
        <p className="jg-modal-sub">ใช้เวลา 30 วินาที · ฟรี ตลอดชีพ</p>
        <form onSubmit={submit}>
          <div className="jg-field">
            <label>ชื่อเล่น</label>
            <input
              type="text"
              placeholder="แอน, นิว, มาย…"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="jg-field">
            <label>เบอร์โทร</label>
            <input
              type="tel"
              maxLength={10}
              placeholder="08x xxx xxxx"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })}
            />
          </div>
          <div className="jg-field">
            <label>วันเกิด</label>
            <ThaiDatePicker
              value={form.birthday}
              onChange={(v) => setForm({ ...form, birthday: v })}
            />
          </div>
          <div className="jg-field">
            <label>LINE ID (ถ้ามี)</label>
            <input
              type="text"
              placeholder="@yourline"
              value={form.line}
              onChange={(e) => setForm({ ...form, line: e.target.value })}
            />
          </div>
          {error && <p className="jg-modal-error">{error}</p>}
          <button type="submit" className="jg-btn jg-btn-primary" disabled={submitting}>
            <Icon.Sparkle /> {submitting ? 'กำลังบันทึก…' : 'สร้าง Profile ของฉัน'}
          </button>
          <p className="jg-modal-fineprint">
            ข้อมูลของคุณปลอดภัย ใช้เพื่อส่ง profile
            <br />
            และคำแนะนำเฉพาะที่คุณสนใจเท่านั้น
          </p>
        </form>
      </div>
    </div>
  );
}

const STORAGE_KEY = 'jg-answers';

type SessionInfo = { phone: string; name: string } | null;

export default function QuizApp({ session }: { session?: SessionInfo }) {
  const loggedIn = !!session;
  const [step, setStep] = useState<Step>('welcome');
  const [answers, setAnswers] = useState<Answers>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // hydrate from URL search params (shared link) or localStorage
  useEffect(() => {
    const url = new URL(window.location.href);
    const d = url.searchParams.get('d');
    const a = url.searchParams.get('a');
    const w = url.searchParams.get('w');
    const validDay = d && days.some((x) => x.id === d);
    const validAnimal = a && animals.some((x) => x.id === a);
    const validDesire = w && desires.some((x) => x.id === w);

    if (validDay && validAnimal && validDesire) {
      setAnswers({
        day: d as DayId,
        animal: a as AnimalId,
        desire: w as DesireId,
      });
      setStep('result');
      setHydrated(true);
      return;
    }

    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Answers;
      setAnswers(saved);
      if (saved.day && saved.animal && saved.desire) {
        setStep('result');
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers, hydrated]);

  // sync URL with answers when on result step (shareable link with personalised OG)
  useEffect(() => {
    if (!hydrated) return;
    if (step === 'result' && answers.day && answers.animal && answers.desire) {
      const params = new URLSearchParams({
        d: answers.day,
        a: answers.animal,
        w: answers.desire,
      });
      const target = `/quiz?${params.toString()}`;
      if (window.location.pathname + window.location.search !== target) {
        window.history.replaceState({}, '', target);
      }
    } else if (step === 'welcome') {
      if (window.location.search) {
        window.history.replaceState({}, '', '/quiz');
      }
    }
  }, [step, answers, hydrated]);

  const goQ1 = () => setStep('q1');
  const pickDay = (id: DayId) => {
    setAnswers((a) => ({ ...a, day: id }));
    setStep('q2');
  };
  const pickAnimal = (id: AnimalId) => {
    setAnswers((a) => ({ ...a, animal: id }));
    setStep('q3');
  };
  const pickDesire = (id: DesireId) => {
    setAnswers((a) => ({ ...a, desire: id }));
    setStep('loading');
    setTimeout(() => setStep('result'), 2200);
  };

  const back = () => {
    if (step === 'q1') setStep('welcome');
    else if (step === 'q2') setStep('q1');
    else if (step === 'q3') setStep('q2');
  };

  const restart = () => {
    setAnswers({});
    if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);
    setStep('welcome');
  };

  const onShare = () => {
    if (!answers.day || !answers.animal || !answers.desire) return;
    const params = new URLSearchParams({
      d: answers.day,
      a: answers.animal,
      w: answers.desire,
    });
    const shareUrl = `${window.location.origin}/quiz?${params.toString()}`;
    window.open(
      `https://line.me/R/msg/text/?${encodeURIComponent('ผลทำนายพลอยมงคลของฉัน ' + shareUrl)}`,
      '_blank',
    );
  };

  const stepIndex = step === 'q1' ? 0 : step === 'q2' ? 1 : step === 'q3' ? 2 : -1;

  return (
    <div data-screen-label={`JanGems ${step}`}>
      <div className="jg-topbar">
        <Brand asLink />
        {step !== 'welcome' && step !== 'loading' && (
          <button
            className="jg-back"
            onClick={restart}
            style={{ fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase' }}
          >
            ↺ ทำใหม่
          </button>
        )}
      </div>

      {stepIndex >= 0 && <Progress step={stepIndex} />}

      {step === 'welcome' && <Welcome onStart={goQ1} />}
      {step === 'q1' && <Q1 onPick={pickDay} onBack={back} />}
      {step === 'q2' && <Q2 onPick={pickAnimal} onBack={back} />}
      {step === 'q3' && <Q3 onPick={pickDesire} onBack={back} />}
      {step === 'loading' && <Loader />}
      {step === 'result' && answers.day && answers.animal && answers.desire && (
        <Result
          answers={answers as Required<Answers>}
          onSignup={() => setModalOpen(true)}
          onShare={onShare}
          onRestart={restart}
          loggedIn={loggedIn}
        />
      )}

      {modalOpen && answers.day && answers.animal && answers.desire && (
        <Modal answers={answers as Required<Answers>} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
