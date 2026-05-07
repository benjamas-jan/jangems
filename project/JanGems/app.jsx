// JanGems — main React app
const { useState, useEffect, useRef } = React;

const D = window.JG_DATA;

// ── icons (inline SVG) ──
const Icon = {
  ArrowRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  ArrowLeft: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7"/></svg>,
  Close: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6l12 12M18 6l-6 6-6 6"/></svg>,
  FB: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.5-.1-2.4 0-4.1 1.5-4.1 4.2v2.4H7.5V14h2.7v8h3.3z"/></svg>,
  LINE: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.5 3 2 6.5 2 10.9c0 3.9 3.6 7.2 8.5 7.8.3.1.8.2.9.5.1.3.1.7.1.9 0 .2-.2 1-.2 1.2-.1.4-.3 1.4 1.2.8 1.5-.6 8-4.7 10.9-8 2-2.3 2.6-4.6 2.6-7.2C26 6.5 17.5 3 12 3zm-3.7 11.5H6.5c-.2 0-.3-.1-.3-.3v-3.7c0-.2.1-.3.3-.3.2 0 .3.1.3.3v3.4h1.5c.2 0 .3.1.3.3 0 .2-.1.3-.3.3zm1.2-.3c0 .2-.1.3-.3.3-.2 0-.3-.1-.3-.3v-3.7c0-.2.1-.3.3-.3.2 0 .3.1.3.3v3.7zm4.4 0c0 .2-.1.3-.3.3-.1 0-.2 0-.3-.1l-1.9-2.5v2.3c0 .2-.1.3-.3.3-.2 0-.3-.1-.3-.3v-3.7c0-.2.1-.3.3-.3.1 0 .2 0 .3.1l1.9 2.5v-2.3c0-.2.1-.3.3-.3.2 0 .3.1.3.3v3.7zm2.7-1.9c.2 0 .3.1.3.3 0 .2-.1.3-.3.3h-1.4v.9h1.4c.2 0 .3.1.3.3 0 .2-.1.3-.3.3h-1.7c-.2 0-.3-.1-.3-.3v-3.7c0-.2.1-.3.3-.3h1.7c.2 0 .3.1.3.3 0 .2-.1.3-.3.3h-1.4v.9h1.4z"/></svg>,
  Download: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v13M7 11l5 5 5-5M5 21h14"/></svg>,
  Sparkle: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.5 7.5L21 11l-7.5 1.5L12 20l-1.5-7.5L3 11l7.5-1.5z"/></svg>,
  Cat: () => <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 9l3 6c-1 1.5-1.5 3.5-1.5 5.5 0 4 3.5 6.5 9.5 6.5s9.5-2.5 9.5-6.5c0-2-.5-4-1.5-5.5l3-6-5.5 3c-1.5-.5-3.5-1-5.5-1s-4 .5-5.5 1L5 9z"/><circle cx="12" cy="19" r="0.8" fill="currentColor"/><circle cx="20" cy="19" r="0.8" fill="currentColor"/><path d="M16 22v2"/></svg>,
  Dog: () => <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 7l-2 6 2 2v8c0 2 1 3 3 3h10c2 0 3-1 3-3v-8l2-2-2-6-3 4c-1.5-.5-3-.5-5-.5s-3.5 0-5 .5L8 7z"/><circle cx="13" cy="18" r="0.8" fill="currentColor"/><circle cx="19" cy="18" r="0.8" fill="currentColor"/><path d="M15 22h2"/></svg>,
  Fish: () => <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 16c2-5 7-8 13-8 5 0 9 3 11 5l3-3v12l-3-3c-2 2-6 5-11 5-6 0-11-3-13-8z"/><circle cx="22" cy="14" r="0.8" fill="currentColor"/><path d="M9 13l-3 3 3 3M14 12l-2 4 2 4"/></svg>,
  Eagle: () => <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M16 6c-1 0-2 .5-2.5 1.5L12 11h8l-1.5-3.5C18 6.5 17 6 16 6z"/><path d="M3 18c3-2 6-3 9-3l4 5 4-5c3 0 6 1 9 3l-6 1-4 6h-6l-4-6-6-1z"/></svg>,
  Briefcase: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18"/></svg>,
  Heart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21s-7-4.5-9.5-9c-1.5-2.5 0-6.5 3.5-6.5 2 0 3.5 1.5 4 2.5.5-1 2-2.5 4-2.5 3.5 0 5 4 3.5 6.5C19 16.5 12 21 12 21z"/></svg>,
  Coin: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M9 9h4.5a1.5 1.5 0 010 3H9m4.5 0H15m-6 3h5"/></svg>,
  Shield: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3l8 3v6c0 5-4 9-8 9s-8-4-8-9V6l8-3z"/></svg>,
};

const animalIcons = { cat: Icon.Cat, dog: Icon.Dog, fish: Icon.Fish, eagle: Icon.Eagle };
const desireIcons = { work: Icon.Briefcase, love: Icon.Heart, wealth: Icon.Coin, protect: Icon.Shield };

function Brand() {
  return (
    <div className="jg-brand">
      <svg className="jg-brand-mark" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="1.4">
        <path d="M12 2l3 5h5l-4 4 2 6-6-3-6 3 2-6-4-4h5z" fill="#D4A24C" fillOpacity="0.15"/>
      </svg>
      <span className="jg-brand-name"><b>Jan</b>Gems</span>
    </div>
  );
}

// ── Welcome ──
function Welcome({ onStart }) {
  return (
    <div className="jg-welcome jg-page-enter">
      <div className="jg-welcome-stars">✦ ✧ ✦</div>
      <div className="jg-welcome-eyebrow jg-eyebrow">Gem personality reading</div>
      <h1 className="jg-welcome-title">
        ค้นพบ<em>พลอยมงคล</em><br/>ที่เป็นของคุณ
      </h1>
      <p className="jg-welcome-sub">
        ตอบ 3 คำถามสั้นๆ ตามตำราโหราศาสตร์ไทย<br/>
        เพื่อค้นหาพลอยที่ส่งเสริมพลังของคุณโดยเฉพาะ
      </p>
      <button className="jg-btn jg-btn-primary" onClick={onStart} style={{padding:'16px 32px', fontSize:15}}>
        เริ่มทำนาย <Icon.ArrowRight/>
      </button>
      <div className="jg-welcome-meta">
        <span>3 คำถาม</span>
        <span>1 นาที</span>
        <span>ฟรี</span>
      </div>
    </div>
  );
}

// ── Quiz ──
function Progress({ step }) {
  return (
    <div className="jg-progress">
      {[0, 1, 2].map(i => (
        <div key={i} className={`jg-progress-dot ${i < step ? 'done' : i === step ? 'active' : ''}`}></div>
      ))}
    </div>
  );
}

function Q1({ onPick, onBack }) {
  return (
    <div className="jg-quiz jg-page-enter" key="q1">
      <button className="jg-back" onClick={onBack}><Icon.ArrowLeft/> กลับ</button>
      <div className="jg-q-eyebrow jg-eyebrow">คำถามที่ 01 / 03</div>
      <h2 className="jg-q-title">คุณเกิด<em>วันอะไร?</em></h2>
      <div className="jg-days">
        {D.days.map(d => (
          <button key={d.id} className="jg-day" onClick={() => onPick(d.id)}>
            <span className="jg-day-dot" style={{background: d.hex, color: d.hex}}></span>
            <span className="jg-day-name">วัน{d.th}</span>
            <span className="jg-day-color">สี{d.color}</span>
          </button>
        ))}
      </div>
      <p className="jg-q-hint">— ตามตำราโหราศาสตร์ไทย —</p>
    </div>
  );
}

function Q2({ onPick, onBack }) {
  return (
    <div className="jg-quiz jg-page-enter" key="q2">
      <button className="jg-back" onClick={onBack}><Icon.ArrowLeft/> กลับ</button>
      <div className="jg-q-eyebrow jg-eyebrow">คำถามที่ 02 / 03</div>
      <h2 className="jg-q-title">คุณคือคนแบบ<em>ไหน?</em></h2>
      <div className="jg-options">
        {D.animals.map((a, i) => {
          const I = animalIcons[a.id];
          return (
            <button key={a.id} className="jg-opt jg-opt-animal" onClick={() => onPick(a.id)}>
              <span className="jg-opt-animal-icon"><I/></span>
              <span className="jg-opt-main">
                <span className="jg-opt-label">{a.th}</span>
                <span className="jg-opt-sub">{a.desc}</span>
              </span>
              <span className="jg-opt-arrow"><Icon.ArrowRight/></span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Q3({ onPick, onBack }) {
  return (
    <div className="jg-quiz jg-page-enter" key="q3">
      <button className="jg-back" onClick={onBack}><Icon.ArrowLeft/> กลับ</button>
      <div className="jg-q-eyebrow jg-eyebrow">คำถามที่ 03 / 03</div>
      <h2 className="jg-q-title">อยากเสริม<em>เรื่องไหน?</em></h2>
      <div className="jg-options">
        {D.desires.map(x => {
          const I = desireIcons[x.id];
          return (
            <button key={x.id} className="jg-opt jg-opt-animal" onClick={() => onPick(x.id)}>
              <span className="jg-opt-animal-icon"><I/></span>
              <span className="jg-opt-main">
                <span className="jg-opt-label">{x.th}</span>
                <span className="jg-opt-sub">เสริมพลัง{x.gem} · {x.meaning}</span>
              </span>
              <span className="jg-opt-arrow"><Icon.ArrowRight/></span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Loader ──
function Loader() {
  return (
    <div className="jg-loader">
      <div className="jg-loader-stage">
        <svg className="jg-constellation" viewBox="0 0 220 220" width="220" height="220">
          <g fill="none" stroke="#D4A24C" strokeWidth="0.6" opacity="0.55">
            <circle cx="110" cy="110" r="95"/>
            <circle cx="110" cy="110" r="80"/>
          </g>
          <g fill="#D4A24C">
            <circle cx="110" cy="15" r="2.5"/>
            <circle cx="200" cy="80" r="1.8"/>
            <circle cx="180" cy="170" r="2.2"/>
            <circle cx="80" cy="200" r="1.6"/>
            <circle cx="20" cy="140" r="2"/>
            <circle cx="40" cy="50" r="1.5"/>
          </g>
          <g stroke="#D4A24C" strokeWidth="0.4" opacity="0.4" fill="none">
            <path d="M110 15 L200 80 L180 170 L80 200 L20 140 L40 50 Z"/>
          </g>
        </svg>
        <svg className="jg-constellation jg-constellation-2" viewBox="0 0 220 220" width="220" height="220" style={{position:'absolute',inset:0}}>
          <g fill="none" stroke="#B8869C" strokeWidth="0.5" opacity="0.4">
            <circle cx="110" cy="110" r="60"/>
          </g>
          <g fill="#F2EAD6">
            <circle cx="170" cy="110" r="1.2"/>
            <circle cx="50" cy="110" r="1.2"/>
            <circle cx="110" cy="50" r="1"/>
            <circle cx="110" cy="170" r="1"/>
          </g>
        </svg>
        <div className="jg-loader-core"><div className="jg-loader-core-inner"></div></div>
      </div>
      <div style={{textAlign:'center'}}>
        <div className="jg-loader-text">กำลังคำนวณดวง<span className="jg-loader-dots"><span/><span/><span/></span></div>
        <div className="jg-loader-sub" style={{marginTop:8}}>Reading the stars</div>
      </div>
    </div>
  );
}

// ── Result ──
function Result({ answers, onSignup, onShare, onRestart }) {
  const Gem = window.JG_Gem;
  const day = D.days.find(d => d.id === answers.day);
  const animal = D.animals.find(a => a.id === answers.animal);
  const desire = D.desires.find(x => x.id === answers.desire);
  const cut = window.JG_gemCutForDay(day.id);
  const AnimalI = animalIcons[animal.id];

  return (
    <div className="jg-result">
      <div className="jg-result-eyebrow jg-eyebrow">Your reading</div>
      <h1 className="jg-result-porn">
        {day.porn}
      </h1>
      <div className="jg-result-meta">
        ผู้เกิดวัน<b>{day.th}</b> · สี<b>{day.color}</b>
      </div>

      <div className="jg-result-divider">
        <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="currentColor"/></svg>
      </div>

      <div className="jg-result-hero">
        <Gem color={day.hex} cut={cut} size={240}/>
      </div>

      <div className="jg-result-section">
        <div className="jg-rs-label">พลอยประจำตัว</div>
        <div className="jg-rs-title">{day.gems[0]}</div>
        <p className="jg-rs-desc">
          ตามตำราโหราศาสตร์ไทย ผู้เกิดวัน{day.th}เป็น<b style={{color:'var(--jg-gold)'}}>{day.porn}</b> มีพลอยประจำตัวเป็นพลอยสี{day.color}
        </p>
        <div className="jg-gem-row">
          {day.gems.map(g => (
            <span key={g} className="jg-gem-chip">
              <span className="jg-gem-chip-dot" style={{background: day.hex, color: day.hex}}></span>
              {g}
            </span>
          ))}
        </div>
      </div>

      <div className="jg-result-section">
        <div className="jg-rs-label">บุคลิกของคุณ</div>
        <div className="jg-rs-title jg-rs-title-with-icon" style={{display:'flex',alignItems:'center',gap:14}}>
          <span style={{width:36,height:36,display:'grid',placeItems:'center',color:'var(--jg-gold)',flexShrink:0}}><AnimalI/></span>
          คุณคือ{animal.th}
        </div>
        <p className="jg-rs-desc">{animal.desc}</p>
      </div>

      <div className="jg-result-section">
        <div className="jg-rs-label">พลอยเสริม{desire.th.split(' ')[0]}</div>
        <div className="jg-rs-title">{desire.gem}</div>
        <p className="jg-rs-desc">
          เสริมพลัง<b style={{color:'var(--jg-ink)'}}>{desire.th}</b>
        </p>
        <p className="jg-quote-th">"{desire.meaning}"</p>
      </div>

      <div className="jg-result-section">
        <div className="jg-rs-label">แชร์ผลของคุณ</div>
        <div className="jg-share-row">
          <button className="jg-share-btn" onClick={() => onShare('fb')}>
            <span className="jg-share-icon"><Icon.FB/></span>Facebook
          </button>
          <button className="jg-share-btn" onClick={() => onShare('line')}>
            <span className="jg-share-icon"><Icon.LINE/></span>LINE
          </button>
          <button className="jg-share-btn" onClick={() => onShare('ig')}>
            <span className="jg-share-icon"><Icon.Download/></span>IG Story
          </button>
        </div>
      </div>

      <SignupCard onClick={onSignup}/>

      <div style={{textAlign:'center',marginTop:24}}>
        <button className="jg-back" onClick={onRestart}>↺ ทำใหม่อีกครั้ง</button>
      </div>

      <footer className="jg-footer">
        <div className="jg-footer-divider"></div>
        JanGems · Chanthaburi gems
      </footer>
    </div>
  );
}

// ── Signup teaser ──
function SignupCard({ onClick }) {
  return (
    <div className="jg-cta-card">
      <div className="jg-cta-eyebrow">✦ Unlock the full reading ✦</div>
      <h3 className="jg-cta-title">อยากรู้พลอยที่ใช่<br/>สำหรับคุณจริงๆ?</h3>
      <div className="jg-cta-list">
        <div className="jg-cta-list-item">
          <span className="jg-cta-check"><Icon.Check/></span>
          <span>พลอยประจำตัวคุณแบบเต็ม<br/><small>ตามตำราโหราศาสตร์ไทย</small></span>
        </div>
        <div className="jg-cta-list-item">
          <span className="jg-cta-check"><Icon.Check/></span>
          <span>พลอยเสริม 9 ด้าน<br/><small>การงาน · ความรัก · โชคลาภ · ปกป้อง · เสน่ห์ · สุขภาพ · บารมี · สติปัญญา · คุ้มครอง</small></span>
        </div>
        <div className="jg-cta-list-item">
          <span className="jg-cta-check"><Icon.Check/></span>
          <span>คำแนะนำส่วนตัวจากแจน</span>
        </div>
      </div>
      <button className="jg-btn jg-btn-primary" onClick={onClick} style={{width:'100%'}}>
        <Icon.Sparkle/> สร้าง Profile (ใช้แค่เบอร์โทร)
      </button>
      <div className="jg-cta-fineprint">30 วินาที · ฟรีตลอดชีพ</div>
    </div>
  );
}

// ── Modal ──
function Modal({ onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', line: '' });
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || form.phone.length < 9) return;
    setDone(true);
  };

  if (done) {
    return (
      <div className="jg-modal-backdrop" onClick={onClose}>
        <div className="jg-modal" onClick={e=>e.stopPropagation()}>
          <button className="jg-modal-close" onClick={onClose}><Icon.Close/></button>
          <div className="jg-success">
            <div className="jg-success-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="1.5">
                <path d="M12 2l2.5 6L21 9l-5 4.5L17.5 20 12 17l-5.5 3L8 13.5 3 9l6.5-1z" fill="#D4A24C" fillOpacity="0.2"/>
              </svg>
            </div>
            <div className="jg-eyebrow" style={{marginBottom:8}}>welcome</div>
            <h3 className="jg-modal-title">ยินดีต้อนรับ คุณ{form.name}</h3>
            <p className="jg-modal-sub">
              Profile ของคุณกำลังเตรียมพร้อม<br/>
              แจนจะส่งรายละเอียดพลอยเสริมครบ 9 ด้าน<br/>
              ทาง LINE ภายใน 24 ชั่วโมง
            </p>
            <div className="jg-success-preview">
              <div className="jg-success-preview-grid">
                {[...Array(9)].map((_,i)=><div key={i} className="jg-success-preview-cell"></div>)}
              </div>
              <div className="jg-success-preview-overlay">9 gems unlocked</div>
            </div>
            <button className="jg-btn jg-btn-ghost" onClick={onClose} style={{marginTop:20,width:'100%'}}>
              กลับสู่หน้าหลัก
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="jg-modal-backdrop" onClick={onClose}>
      <div className="jg-modal" onClick={e=>e.stopPropagation()}>
        <button className="jg-modal-close" onClick={onClose}><Icon.Close/></button>
        <div className="jg-modal-eyebrow jg-eyebrow">Create profile</div>
        <h3 className="jg-modal-title">Profile ของคุณ</h3>
        <p className="jg-modal-sub">ใช้เวลา 30 วินาที · ฟรี ตลอดชีพ</p>
        <form onSubmit={submit}>
          <div className="jg-field">
            <label>ชื่อเล่น</label>
            <input type="text" placeholder="แอน, นิว, มาย…" value={form.name}
                   onChange={e=>setForm({...form,name:e.target.value})}/>
          </div>
          <div className="jg-field">
            <label>เบอร์โทร</label>
            <input type="tel" maxLength="10" placeholder="08x xxx xxxx" value={form.phone}
                   onChange={e=>setForm({...form,phone:e.target.value.replace(/\D/g,'')})}/>
          </div>
          <div className="jg-field">
            <label>LINE ID (ถ้ามี)</label>
            <input type="text" placeholder="@yourline" value={form.line}
                   onChange={e=>setForm({...form,line:e.target.value})}/>
          </div>
          <button type="submit" className="jg-btn jg-btn-primary">
            <Icon.Sparkle/> สร้าง Profile ของฉัน
          </button>
          <p className="jg-modal-fineprint">
            ข้อมูลของคุณปลอดภัย ใช้เพื่อส่ง profile<br/>
            และคำแนะนำเฉพาะที่คุณสนใจเท่านั้น
          </p>
        </form>
      </div>
    </div>
  );
}

// ── App ──
function App() {
  const [step, setStep] = useState('welcome'); // welcome, q1, q2, q3, loading, result
  const [answers, setAnswers] = useState(() => {
    try { return JSON.parse(localStorage.getItem('jg-answers') || '{}'); }
    catch { return {}; }
  });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('jg-answers', JSON.stringify(answers));
  }, [answers]);

  // resume on reload if quiz was complete
  useEffect(() => {
    if (answers.day && answers.animal && answers.desire) {
      // skip welcome → result
      // (only if actively on welcome — first load)
      if (step === 'welcome') setStep('result');
    }
  // eslint-disable-next-line
  }, []);

  const goQ1 = () => setStep('q1');
  const pickDay    = id => { setAnswers(a=>({...a,day:id}));    setStep('q2'); };
  const pickAnimal = id => { setAnswers(a=>({...a,animal:id})); setStep('q3'); };
  const pickDesire = id => {
    setAnswers(a=>({...a,desire:id}));
    setStep('loading');
    setTimeout(()=>setStep('result'), 2200);
  };

  const back = () => {
    if (step === 'q1') setStep('welcome');
    else if (step === 'q2') setStep('q1');
    else if (step === 'q3') setStep('q2');
  };

  const restart = () => {
    setAnswers({});
    localStorage.removeItem('jg-answers');
    setStep('welcome');
  };

  const onShare = (kind) => {
    // placeholder: visually indicate. real share would copy URL etc.
    const url = window.location.href;
    if (kind === 'line') window.open(`https://line.me/R/msg/text/?${encodeURIComponent('ผลทำนายพลอยมงคลของฉัน '+url)}`, '_blank');
    else if (kind === 'fb') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    else alert('กำลังเตรียมรูปสำหรับ IG Story…');
  };

  const stepIndex = step === 'q1' ? 0 : step === 'q2' ? 1 : step === 'q3' ? 2 : -1;

  return (
    <div data-screen-label={`JanGems ${step}`}>
      <div className="jg-topbar">
        <Brand/>
        {(step !== 'welcome' && step !== 'loading') && (
          <button className="jg-back" onClick={restart} style={{fontSize:11,letterSpacing:'.15em',textTransform:'uppercase'}}>
            ↺ ทำใหม่
          </button>
        )}
      </div>

      {stepIndex >= 0 && <Progress step={stepIndex}/>}

      {step === 'welcome' && <Welcome onStart={goQ1}/>}
      {step === 'q1' && <Q1 onPick={pickDay} onBack={back}/>}
      {step === 'q2' && <Q2 onPick={pickAnimal} onBack={back}/>}
      {step === 'q3' && <Q3 onPick={pickDesire} onBack={back}/>}
      {step === 'loading' && <Loader/>}
      {step === 'result' && (
        <Result
          answers={answers}
          onSignup={()=>setModalOpen(true)}
          onShare={onShare}
          onRestart={restart}
        />
      )}

      {modalOpen && <Modal onClose={()=>setModalOpen(false)}/>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
