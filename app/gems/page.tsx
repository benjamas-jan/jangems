import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { getSession } from '../lib/auth';
import {
  gemLibrary,
  colorMeta,
  COLOR_ORDER,
  tierFor,
  tierMeta,
  type ColorKey,
  type HardnessTier,
} from '../data/gem-info';

export const metadata: Metadata = {
  title: 'รู้จักพลอย · JanGems',
  description: 'พลอยแต่ละสีมีอะไรบ้าง · พลอยแข็งกับพลอยอ่อนต่างกันอย่างไร · เลือกพลอยให้เหมาะกับการใช้งาน',
};

export default async function GemsPage() {
  const session = await getSession();

  // Group gems by color
  const byColor = COLOR_ORDER.map((c) => ({
    key: c,
    meta: colorMeta[c],
    gems: gemLibrary.filter((g) => g.color === c).sort((a, b) => b.mohs - a.mohs),
  }));

  // Group gems by hardness tier
  const tiers: HardnessTier[] = ['hard', 'medium', 'soft'];
  const byTier = tiers.map((t) => ({
    key: t,
    meta: tierMeta[t],
    gems: gemLibrary.filter((g) => tierFor(g.mohs) === t).sort((a, b) => b.mohs - a.mohs),
  }));

  return (
    <>
      <SiteHeader session={session} />

      <div className="jg-page">
        <div className="jg-page-hero">
          <div className="jg-page-eyebrow jg-eyebrow">Learn</div>
          <h1 className="jg-page-title">
            รู้จัก<em>พลอย</em>
          </h1>
          <p className="jg-page-sub">
            ก่อนเลือกพลอยใส่ — รู้จักสี ความแข็ง<br />
            และวิธีเลือกให้เหมาะกับการใช้งาน
          </p>
        </div>

        {/* Table of Contents */}
        <nav aria-label="สารบัญ" className="jg-toc">
          <div className="jg-toc-label">สารบัญ</div>
          <ol className="jg-toc-list">
            <li><a href="#colors">1. พลอยแต่ละสี มีอะไรบ้าง?</a></li>
            <li><a href="#hardness">2. พลอยแข็งกับพลอยอ่อน ต่างกันอย่างไร?</a></li>
            <li><a href="#choose">3. เลือกพลอยให้เหมาะกับการใส่</a></li>
          </ol>
        </nav>

        {/* Section 1: Colors */}
        <section id="colors" className="jg-section">
          <div className="jg-section-label">1. สีพลอย</div>
          <h2 className="jg-section-title">พลอยแต่ละสี มีอะไรบ้าง?</h2>
          <div className="jg-section-body">
            <p>
              พลอยแบ่งสีหลักออกเป็น 9 กลุ่ม ตามที่นิยมในวงการเครื่องประดับ
              แต่ละสีมีพลอยให้เลือกหลายชนิดที่ราคาและคุณภาพต่างกัน
              เช่น <strong>พลอยสีแดง</strong> มีทั้งทับทิมระดับสูง
              ไปจนถึงโกเมนและปะการังสีแดงที่ราคาเข้าถึงได้กว่า
            </p>
          </div>

          <div className="jg-color-groups">
            {byColor.map((g) => (
              <div key={g.key} className="jg-color-group">
                <div className="jg-color-group-head">
                  <span
                    className="jg-color-swatch"
                    style={{ background: g.meta.hex, boxShadow: `0 0 12px ${g.meta.hex}66` }}
                  ></span>
                  <span className="jg-color-group-th">สี{g.meta.th}</span>
                  <span className="jg-color-group-en">{g.meta.en}</span>
                </div>
                <ul className="jg-color-gem-list">
                  {g.gems.map((gem) => (
                    <li key={gem.en} className="jg-color-gem">
                      <span
                        className="jg-color-gem-dot"
                        style={{ background: gem.hex, boxShadow: `0 0 6px ${gem.hex}88` }}
                      />
                      <span className="jg-color-gem-th">{gem.th}</span>
                      <span className="jg-color-gem-en">{gem.en}</span>
                      <span className="jg-color-gem-mohs">Mohs {gem.mohsLabel}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Hardness */}
        <section id="hardness" className="jg-section">
          <div className="jg-section-label">2. ความแข็ง</div>
          <h2 className="jg-section-title">พลอยแข็งกับพลอยอ่อน ต่างกันอย่างไร?</h2>
          <div className="jg-section-body">
            <p>
              นักธรณีวิทยาวัดความแข็งพลอยด้วยมาตรา <strong>Mohs Scale</strong> (1 - 10)
              เพชรแข็งสุดที่ 10 ส่วนพลอยอินทรีย์อย่างไข่มุก/อำพันอ่อนสุด (ราว 2-4)
            </p>
            <p>
              ความแข็งสำคัญมากกับ<strong>การเลือกใช้งาน</strong> —
              พลอยอ่อนกระแทกง่าย ขีดข่วนง่าย จึงไม่เหมาะใส่เป็นแหวนติดมือทุกวัน
              แต่ใส่เป็นจี้คอ ต่างหู หรือสร้อยข้อมือ จะปลอดภัยกว่า
            </p>
          </div>

          <div className="jg-tier-list">
            {byTier.map((t) => (
              <div key={t.key} className={`jg-tier-card jg-tier-${t.key}`}>
                <div className="jg-tier-head">
                  <span className="jg-tier-th">{t.meta.th}</span>
                  <span className="jg-tier-range">Mohs {t.meta.range}</span>
                </div>
                <p className="jg-tier-advice">{t.meta.advice}</p>
                <ul className="jg-tier-gem-list">
                  {t.gems.map((gem) => (
                    <li key={gem.en}>
                      <span
                        className="jg-color-gem-dot"
                        style={{ background: gem.hex, boxShadow: `0 0 6px ${gem.hex}88` }}
                      />
                      {gem.th}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Color × Hardness combined guide */}
        <section id="choose" className="jg-section">
          <div className="jg-section-label">3. คู่มือเลือก</div>
          <h2 className="jg-section-title">พลอยแต่ละสี · แข็งหรืออ่อน?</h2>
          <div className="jg-section-body">
            <p>
              ถ้าคุณรู้สีที่อยากใส่อยู่แล้ว
              ตารางนี้ช่วยเลือกชนิดพลอยที่<strong>ทนทานพอ</strong>กับการใช้งาน
              ตัวอย่าง: อยากใส่<strong>แหวนพลอยสีแดงทุกวัน</strong>
              ทับทิม (Mohs 9) เหมาะกว่าโกเมน (6.5–7.5) เพราะแข็งกว่ามาก
            </p>
          </div>

          <div className="jg-color-groups">
            {byColor.map((g) => (
              <div key={g.key} className="jg-color-group">
                <div className="jg-color-group-head">
                  <span
                    className="jg-color-swatch"
                    style={{ background: g.meta.hex, boxShadow: `0 0 12px ${g.meta.hex}66` }}
                  ></span>
                  <span className="jg-color-group-th">สี{g.meta.th}</span>
                </div>
                <ul className="jg-color-gem-list">
                  {g.gems.map((gem) => {
                    const t = tierFor(gem.mohs);
                    return (
                      <li key={gem.en} className={`jg-color-gem jg-color-gem-tier-${t}`}>
                        <span
                          className="jg-color-gem-dot"
                          style={{ background: gem.hex, boxShadow: `0 0 6px ${gem.hex}88` }}
                        />
                        <span className="jg-color-gem-th">{gem.th}</span>
                        <span className="jg-color-gem-mohs">Mohs {gem.mohsLabel}</span>
                        <span className={`jg-tier-pill jg-tier-pill-${t}`}>{tierMeta[t].th}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="jg-section">
          <div className="jg-section-label">ขั้นตอนต่อไป</div>
          <h2 className="jg-section-title">เริ่มหาพลอยของคุณ</h2>
          <div className="jg-section-body">
            <p>
              ตอนนี้คุณรู้แล้วว่าพลอยแต่ละสีและความแข็งต่างกันอย่างไร
              ถัดไปคือการหา<strong>พลอยที่ใช่สำหรับคุณ</strong> —
              ตามวันเกิด ราศี และด้านที่อยากเสริม
            </p>
          </div>
          <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/quiz" className="jg-btn jg-btn-primary">
              เริ่มทำ quiz หาพลอยมงคล
            </Link>
            <Link href="/contact" className="jg-btn jg-btn-ghost">
              ปรึกษาแจน
            </Link>
          </div>
        </section>
      </div>

      <SiteFooter />
    </>
  );
}
