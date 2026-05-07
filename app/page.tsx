import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="jg-topbar">
        <div className="jg-brand">
          <svg className="jg-brand-mark" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="1.4">
            <path d="M12 2l3 5h5l-4 4 2 6-6-3-6 3 2-6-4-4h5z" fill="#D4A24C" fillOpacity="0.15" />
          </svg>
          <span className="jg-brand-name">
            <b>Jan</b>Gems
          </span>
        </div>
      </div>

      <div className="jg-welcome jg-page-enter">
        <div className="jg-welcome-stars">✦ ✧ ✦</div>
        <div className="jg-welcome-eyebrow jg-eyebrow">Mystic gems · Chanthaburi</div>
        <h1 className="jg-welcome-title">
          พลอยมงคล<br />
          จาก<em>จันทบุรี</em>
        </h1>
        <p className="jg-welcome-sub">
          เครื่องประดับพลอยงานสั่งทำ จากช่างฝีมือจันทบุรี<br />
          ค้นหาพลอยที่ใช่สำหรับคุณ ตามตำราโหราศาสตร์ไทย
        </p>
        <Link href="/quiz" className="jg-btn jg-btn-primary" style={{ padding: '16px 32px', fontSize: 15 }}>
          เริ่มทำนายพลอยมงคล
        </Link>
        <div className="jg-welcome-meta">
          <span>3 คำถาม</span>
          <span>1 นาที</span>
          <span>ฟรี</span>
        </div>
      </div>

      <footer className="jg-footer">
        <div className="jg-footer-divider"></div>
        JanGems · Chanthaburi gems
        <br />
        <br />
        Designed by <a href="https://chaivoot.com" target="_blank" rel="noopener noreferrer">Chaivoot</a>
      </footer>
    </>
  );
}
