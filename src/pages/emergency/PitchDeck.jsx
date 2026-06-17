import React, { useEffect, useState, useRef } from 'react';
import RotateHint from '../../components/RotateHint';

// ---------------------------------------------------------------------------
// Emergency PitchDeck.jsx — "Smart Center Solution Platform" (APP-17)
// ระบบบูรณาการข้อมูลเฝ้าระวังและบริหารจัดการเหตุฉุกเฉิน
// Design: Civic Trust palette (Forest #0F6E56 + Cream #FAF7EE + Amber #BA7517)
// Font: Sarabun · 1280×720 scaled-to-viewport · print-PDF ready
// Template: src/pages/cctv-ai/PitchDeck.jsx (followed 1:1)
// Content: Applications/APP-17-Emergency-Mgmt/dealer/presentation_v2/Presentation_Outline_v1.md
//
// RULES (CLAUDE.md §12-13 + BRIEF §0):
//  - Brand = "Smart Center Solution Platform" only (never ADZOSS/Addergy/Zeroloss/EMCC)
//  - No price numbers — price cells read "ปรึกษาทีมงาน"
//  - Pain-first · Smart City = byproduct (last)
//  - Camera-tie-in = "ต่อยอดกล้องเดิมตรวจจับเหตุ" NOT "อ่านป้ายทะเบียน"
//  - All figures = "ตัวอย่าง/ประมาณการ"
// ---------------------------------------------------------------------------

// Civic Trust palette
const C = {
  primary: '#0F6E56',
  primaryHover: '#1D9E75',
  primaryDeep: '#0B5544',
  primarySoft: '#E5F0EA',
  surface: '#FAF7EE',
  surfaceSoft: '#F5F1E4',
  text: '#1F2A24',
  textMuted: '#5F6B65',
  accent: '#BA7517',
  accentSoft: '#FAEEDA',
  alert: '#A32D2D',
  alertSoft: '#FCEBEB',
  success: '#5B8C2A',
  successSoft: '#EAF3DE',
  navy: '#0A1F3D',
};

const IMG = 'images/emergency-mgmt';
const DIA = 'images/emergency-mgmt/diagrams';
const TOTAL_SLIDES = 17;

// ---------------------------------------------------------------------------
// Slide shell — fixed 1280×720, scaled to viewport (screen) and 1:1 (print)
// ---------------------------------------------------------------------------

function Slide({ num, dark = false, children, footer = '' }) {
  return (
    <section
      className="slide-page"
      data-dark={dark ? 'true' : 'false'}
      style={{
        position: 'relative',
        width: 1280,
        height: 720,
        background: dark ? `linear-gradient(135deg, ${C.navy} 0%, ${C.primaryDeep} 100%)` : C.surface,
        color: dark ? '#FFF' : C.text,
        overflow: 'hidden',
        fontFamily: 'Sarabun, sans-serif',
        flexShrink: 0,
      }}
    >
      {!dark && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: C.primary }} />
      )}
      <div style={{ position: 'absolute', inset: 0, padding: '52px 60px 56px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {children}
      </div>
      {footer && (
        <div
          style={{
            position: 'absolute', bottom: 20, left: 60, fontSize: 12,
            color: dark ? 'rgba(255,255,255,0.7)' : C.textMuted, opacity: 0.85, fontWeight: 500, letterSpacing: 0.5,
          }}
        >
          {footer}
        </div>
      )}
      <div
        style={{
          position: 'absolute', bottom: 22, right: 38, fontSize: 13,
          color: dark ? 'rgba(255,255,255,0.7)' : C.textMuted, fontWeight: 500,
        }}
      >
        {num} / {TOTAL_SLIDES}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Atoms
// ---------------------------------------------------------------------------

function Eyebrow({ color, dark, alert, accent, children }) {
  const col = color || (alert ? C.alert : accent ? C.accent : dark ? '#EAE1CC' : C.primary);
  return (
    <p style={{ display: 'inline-block', fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: col, marginBottom: 12 }}>
      {children}
    </p>
  );
}

function Title({ dark, size = 40, children, style }) {
  return (
    <h2 style={{ fontSize: size, fontWeight: 800, lineHeight: 1.4, color: dark ? '#FFF' : C.primaryDeep, letterSpacing: -0.3, ...style }}>
      {children}
    </h2>
  );
}

function Lead({ dark, children, style }) {
  return (
    <p style={{ fontSize: 21, fontWeight: 400, lineHeight: 1.55, color: dark ? 'rgba(255,255,255,0.9)' : C.textMuted, ...style }}>
      {children}
    </p>
  );
}

function Card({ children, dark, style }) {
  return (
    <div style={{
      background: dark ? 'rgba(255,255,255,0.08)' : '#FFF',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.16)' : C.surfaceSoft}`,
      borderRadius: 18, padding: '24px 26px', ...style,
    }}>
      {children}
    </div>
  );
}

function CardIcon({ children }) {
  return <span style={{ fontSize: 36, lineHeight: 1, marginBottom: 12, display: 'block' }}>{children}</span>;
}

function CardTitle({ dark, children, style }) {
  return (
    <h3 style={{ fontSize: 20, fontWeight: 700, color: dark ? '#FFF' : C.text, marginBottom: 7, lineHeight: 1.45, ...style }}>
      {children}
    </h3>
  );
}

function CardBody({ dark, children, style }) {
  return (
    <p style={{ fontSize: 15, color: dark ? 'rgba(255,255,255,0.85)' : C.textMuted, lineHeight: 1.55, ...style }}>
      {children}
    </p>
  );
}

function Pill({ bg, color, children }) {
  return (
    <span style={{ display: 'inline-block', fontSize: 12.5, fontWeight: 600, padding: '5px 12px', borderRadius: 100, background: bg, color }}>
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// UIImage — embeds a cropped UI screenshot if present, else a labeled placeholder.
// UI screenshots from supplier are NOT yet copied (need browser-bar crop per §11.1).
// Drop the cropped file at public/images/emergency-mgmt/<file> and it appears.
// ---------------------------------------------------------------------------

function UIImage({ file, label, note, style }) {
  const [failed, setFailed] = useState(false);
  const showImg = file && !failed;
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%', borderRadius: 14, overflow: 'hidden',
      background: C.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center', ...style,
    }}>
      {showImg ? (
        <img
          src={`${IMG}/${file}`}
          alt={label}
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      ) : (
        <div style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '18px 22px',
          border: `2px dashed ${C.primary}`, borderRadius: 14, background: C.surface,
        }}>
          <div style={{ fontSize: 40, marginBottom: 10, opacity: 0.7 }}>🖼️</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.primaryDeep, lineHeight: 1.4, marginBottom: 6 }}>{label}</div>
          {note && <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.45, maxWidth: 320 }}>{note}</div>}
          <div style={{ marginTop: 10, fontSize: 11, fontWeight: 600, color: C.accent, background: C.accentSoft, padding: '4px 12px', borderRadius: 100 }}>
            รอรูป UI (crop browser bar ก่อน)
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Slide-deck wrapper — viewport-fit scaling + print CSS
// ---------------------------------------------------------------------------

function DeckStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700;800&display=swap');

      html { scroll-behavior: smooth; }
      .deck-root { font-family: 'Sarabun', sans-serif; background: #6b6b6b; min-height: 100dvh; padding-top: 56px; padding-bottom: 40px; max-width: 100vw; overflow-x: clip; }
      .deck-toolbar {
        position: fixed; top: 48px; left: 0; right: 0; height: 44px; background: ${C.primaryDeep};
        color: #fff; display: flex; align-items: center; gap: 16px; padding: 0 18px; z-index: 40; font-size: 13px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      }
      .deck-toolbar button {
        font-family: inherit; background: rgba(255,255,255,.16); color: #fff; border: none;
        padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 13px; transition: background .15s;
      }
      .deck-toolbar button:hover { background: rgba(255,255,255,.28); }
      .deck-toolbar .note { opacity: .75; font-size: 12px; }

      .slide-wrapper { margin: 0 auto 24px; overflow: hidden; }
      .scroll-dots { right: max(14px, env(safe-area-inset-right, 14px)) !important; max-height: calc(100dvh - 120px); overflow-y: auto; scrollbar-width: none; }
      .scroll-dots::-webkit-scrollbar { display: none; }
      @media (max-width: 932px) { .scroll-dots { display: none !important; } }
      .slide-scale { transform-origin: top left; box-shadow: 0 10px 40px rgba(0,0,0,.35); }

      @media print {
        @page { size: 1280px 720px; margin: 0; }
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        html, body { background: #fff !important; }
        nav, .deck-toolbar, .scroll-dots { display: none !important; }
        main { padding-top: 0 !important; }
        .deck-root { background: #fff !important; padding: 0 !important; margin: 0 !important; }
        .slide-wrapper { margin: 0 !important; width: 1280px !important; height: 720px !important; }
        .slide-scale { transform: none !important; box-shadow: none !important; page-break-after: always; }
        .slide-page { box-shadow: none !important; }
      }
    `}</style>
  );
}

function ScaledSlide({ children }) {
  const computeScale = () => {
    if (typeof window === 'undefined') return 1;
    const targetW = 1280;
    const targetH = 720;
    const availableW = Math.max(window.innerWidth - 32, 320);
    const availableH = Math.max(window.innerHeight - 160, 320);
    return Math.min(availableW / targetW, availableH / targetH, 1);
  };
  const [scale, setScale] = useState(computeScale);
  const wrapperRef = useRef(null);
  const lastWidthRef = useRef(typeof window === 'undefined' ? 0 : window.innerWidth);

  useEffect(() => {
    const apply = () => {
      if (window.innerWidth === lastWidthRef.current) return;
      lastWidthRef.current = window.innerWidth;
      setScale(computeScale());
    };
    window.addEventListener('resize', apply);
    window.addEventListener('orientationchange', apply);
    return () => {
      window.removeEventListener('resize', apply);
      window.removeEventListener('orientationchange', apply);
    };
  }, []);

  return (
    <div className="slide-wrapper" ref={wrapperRef} style={{ width: 1280 * scale, height: 720 * scale }}>
      <div className="slide-scale" style={{ transform: `scale(${scale})`, width: 1280, height: 720 }}>
        {children}
      </div>
    </div>
  );
}

// ===========================================================================
// SLIDE 1 — HOOK (cover)
// ===========================================================================

function Slide01({ num }) {
  return (
    <Slide num={num} dark>
      <div style={{ display: 'flex', alignItems: 'center', gap: 36, height: '100%' }}>
        <div style={{ width: '52%', flexShrink: 0 }}>
          <Eyebrow dark>Smart Center Solution Platform</Eyebrow>
          <h1 style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.35, color: '#FFF', letterSpacing: -0.5 }}>
            เมื่อเกิดเหตุ…<br />
            <span style={{ color: '#9FE1CB' }}>ทุกวินาที</span>คือ<br />
            ความปลอดภัยของประชาชน
          </h1>
          <Lead dark style={{ marginTop: 22, fontSize: 18, maxWidth: 560 }}>
            ศูนย์ข้อมูลกลางที่รวมทุกช่องทางแจ้งเหตุของเมืองไว้ที่เดียว
            ให้ทุกหน่วยงานเห็นข้อมูลชุดเดียวกัน และสั่งการรับมือได้แบบ real-time
          </Lead>
        </div>
        <div style={{ flex: 1, height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, rgba(29,158,117,0.18) 0%, rgba(10,31,61,0) 70%)`, pointerEvents: 'none' }} />
          <UIImage
            file="cover_hero.png"
            label="ภาพปก: เจ้าหน้าที่ + แผนที่เหตุการณ์"
            note="ใช้ Event Dashboard (รูปสะอาดสุด) เป็นภาพปก — crop browser bar + ครอบโลโก้มุมซ้ายบนด้วย Smart Center Solution Platform"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.16)' }}
          />
        </div>
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 2 — PAIN POINT
// ===========================================================================

function Slide02({ num }) {
  const pains = [
    { icon: '📞', title: 'รับแจ้งกระจัดกระจาย', desc: 'ประชาชนแจ้งมาหลายทาง (โทร · LINE · เดินมาแจ้ง) รับไม่ทัน ตกหล่น ตามสถานะไม่ได้' },
    { icon: '⏱️', title: 'ช้า — ทุกวินาทีสำคัญ', desc: 'กว่าจะรู้ว่าเกิดเหตุ กว่าจะสั่งการ กว่าหน่วยงานจะไปถึง เสียเวลาในจุดที่ทุกวินาทีคือความปลอดภัย' },
    { icon: '🧩', title: 'ข้อมูลไม่ตรงกัน', desc: 'แต่ละกอง (ปภ./ช่าง/สาธารณสุข) มีข้อมูลคนละชุด ประสานงานสับสน สื่อสารผิดพลาด' },
    { icon: '📋', title: 'ไม่มีหลักฐานย้อนหลัง', desc: 'เกิดเหตุแล้วไม่มีบันทึก/ข้อมูลย้อนหลังไปทำรายงานหรือชี้แจงต่อสภาฯ' },
  ];
  return (
    <Slide num={num}>
      <Eyebrow alert>ปัญหาที่หน่วยงานเจอจริง</Eyebrow>
      <Title>"วันนี้หน่วยงานของท่าน รับแจ้งเหตุอย่างไร?"</Title>
      <Lead style={{ marginTop: 12, maxWidth: 1040 }}>
        ก่อนพูดถึงระบบ — ลองนึกถึงครั้งล่าสุดที่มีเหตุในพื้นที่ ตั้งแต่รับแจ้งจนสั่งการ มีจุดไหนที่ติดขัดบ้าง?
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 22, flex: 1, alignContent: 'center' }}>
        {pains.map((p, i) => (
          <Card key={i} style={{ borderLeft: `4px solid ${C.alert}` }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 32, lineHeight: 1, flexShrink: 0 }}>{p.icon}</div>
              <div>
                <CardTitle style={{ fontSize: 19 }}>{p.title}</CardTitle>
                <CardBody style={{ fontSize: 14.5 }}>{p.desc}</CardBody>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <p style={{ fontSize: 14, color: C.primary, fontWeight: 700, marginTop: 16 }}>
        คำถามคือ — ถ้ารวมทุกอย่างไว้ที่เดียว จะเปลี่ยนอะไรได้บ้าง?
      </p>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 3 — SOLUTION OVERVIEW (1 sentence + 3 pillars)
// ===========================================================================

function Slide03({ num }) {
  return (
    <Slide num={num}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Eyebrow>แนวทาง</Eyebrow>
        <Title size={36}>
          ศูนย์ข้อมูลกลางที่รวมทุกช่องทางแจ้งเหตุ<br />
          ให้ทุกฝ่ายเห็นข้อมูลชุดเดียวกัน สั่งการได้ real-time
        </Title>
        <Lead style={{ marginTop: 16, maxWidth: 980, fontSize: 18 }}>
          ไม่ใช่แค่ "กล่องรับเรื่อง" — แต่เป็นระบบที่ <strong style={{ color: C.primary }}>เฝ้าระวังก่อนเกิด</strong>,
          <strong style={{ color: C.primary }}> บริหารสั่งการระหว่างเกิด</strong> และ <strong style={{ color: C.primary }}>สรุปหลักฐานครบหลังเกิด</strong>
        </Lead>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 30 }}>
          {[
            { ic: '📥', t: 'รับแจ้ง + รวบรวม', d: 'รวมทุกช่องทาง (LINE · เว็บ · Call Center · Sensor · กล้อง) เป็นข้อมูลชุดเดียว' },
            { ic: '🔎', t: 'คัดกรอง + บริหาร', d: 'กรองก่อนแจ้ง · ส่งต่อหน่วยรับผิดชอบ · สั่งการทรัพยากรและทีม' },
            { ic: '📣', t: 'แจ้งเตือน + รายงาน', d: 'เตือนถูกคนถูกพื้นที่ · อัปเดตสถานะ real-time · สรุปหลักฐานครบ' },
          ].map((p, i) => (
            <Card key={i} style={{ border: `2px solid ${C.primary}` }}>
              <CardIcon>{p.ic}</CardIcon>
              <CardTitle>{p.t}</CardTitle>
              <CardBody>{p.d}</CardBody>
            </Card>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 4 — DATA SOURCES (คำถามข้อ 1: เข้ามากี่ช่องทาง)
// ===========================================================================

function Slide04({ num }) {
  const channels = [
    { ic: '💬', t: 'LINE OA', d: 'ประชาชนแจ้งผ่าน LINE' },
    { ic: '🌐', t: 'เว็บไซต์ / Mobile App', d: 'ฟอร์มแจ้ง + ปักหมุด + แนบรูป' },
    { ic: '☎️', t: 'Call Center', d: 'เจ้าหน้าที่บันทึกแทนผู้แจ้ง' },
    { ic: '📡', t: 'Sensor IoT', d: 'น้ำ · ฝุ่น · สารเคมี — วัด 24 ชม.' },
    { ic: '📷', t: 'กล้องเดิม (AI Vision)', d: 'ต่อยอดกล้องเดิม ตรวจจับเหตุ' },
  ];
  return (
    <Slide num={num}>
      <Eyebrow accent>คำถามข้อ 1 · ข้อมูลเข้ามากี่ทาง?</Eyebrow>
      <Title size={32}>ทุกช่องทาง — ไหลเข้า "ศูนย์เดียว" ไม่ตกหล่น</Title>
      <Lead style={{ marginTop: 6, marginBottom: 10, fontSize: 16 }}>
        ทั้งจากประชาชนและจากระบบอัตโนมัติ ทุกการแจ้งกลายเป็น "เหตุการณ์เดียว" ที่มีพิกัด + รูป + ประเภท
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 18, flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: C.primary, letterSpacing: 1 }}>ช่องทางประชาชน</div>
          {channels.slice(0, 3).map((c, i) => (
            <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 12, padding: '10px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 24 }}>{c.ic}</span>
              <div><div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{c.t}</div><div style={{ fontSize: 12.5, color: C.textMuted }}>{c.d}</div></div>
            </div>
          ))}
          <div style={{ fontSize: 12.5, fontWeight: 700, color: C.success, letterSpacing: 1, marginTop: 2 }}>ช่องทางอัตโนมัติ</div>
          {channels.slice(3).map((c, i) => (
            <div key={i} style={{ background: C.successSoft, border: `1px solid ${C.success}`, borderRadius: 12, padding: '10px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 24 }}>{c.ic}</span>
              <div><div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{c.t}</div><div style={{ fontSize: 12.5, color: C.textMuted }}>{c.d}</div></div>
            </div>
          ))}
        </div>
        <UIImage
          file="create_event.png"
          label="ฟอร์มรับแจ้งเหตุ (Create Event)"
          note="แจ้งเหตุใหม่_0.png — ฟอร์ม + ปักหมุดแผนที่ + อัปโหลดรูป · crop browser bar ก่อน"
        />
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 5 — SCREENING (คำถามข้อ 2: คัดกรองอย่างไร)
// ===========================================================================

function Slide05({ num }) {
  const modes = [
    { n: '1', t: 'ตรวจสอบทุกประเภทก่อนแจ้ง', d: 'เจ้าหน้าที่ยืนยันทุกเหตุก่อนส่งต่อ — ปลอดภัยสูงสุด', tag: 'ปลอดภัยสูงสุด', bg: C.primarySoft, color: C.primary },
    { n: '2', t: 'ตรวจสอบบางประเภท', d: 'เหตุเสี่ยงสูงคัดกรองก่อน · เหตุทั่วไปแจ้งทันที — สมดุล', tag: '★ แนะนำ', bg: C.successSoft, color: '#27500A' },
    { n: '3', t: 'แจ้งทันทีไม่ต้องรอ', d: 'ส่งต่ออัตโนมัติทันที — เร็วสุด เหมาะกับงานวิกฤต', tag: 'เร็วสุด', bg: C.accentSoft, color: C.accent },
  ];
  return (
    <Slide num={num}>
      <Eyebrow accent>คำถามข้อ 2 · คัดกรองอย่างไร? ★ จุดต่างสำคัญ</Eyebrow>
      <Title size={30}>"ไม่ใช่ทุกการแจ้งจะเด้งหาทุกคนทันที"</Title>
      <Lead style={{ marginTop: 6, marginBottom: 12, fontSize: 16 }}>
        เลือกระดับการคัดกรองได้ 3 รูปแบบ ตามความเสี่ยงและกำลังเจ้าหน้าที่ของแต่ละหน่วยงาน
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, flex: 1, alignContent: 'center' }}>
        {modes.map((m, i) => (
          <div key={i} style={{ background: '#FFF', border: `2px solid ${m.color}`, borderRadius: 16, padding: '20px 22px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: m.color, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18 }}>{m.n}</div>
              <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100, background: m.bg, color: m.color }}>{m.tag}</span>
            </div>
            <CardTitle style={{ fontSize: 18, marginBottom: 8 }}>{m.t}</CardTitle>
            <CardBody style={{ fontSize: 14 }}>{m.d}</CardBody>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, background: C.primarySoft, borderRadius: 12, padding: '12px 18px', display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ fontSize: 22 }}>🛡️</span>
        <p style={{ fontSize: 14, color: C.text, lineHeight: 1.5, margin: 0 }}>
          <strong style={{ color: C.primary }}>หลักการ:</strong> เจ้าหน้าที่ได้รับทันทีเสมอ · ส่วนการแจ้ง<strong>ประชาชน</strong>คัดกรองก่อน เพื่อลดความตื่นตระหนกและข่าวผิด
        </p>
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 6 — DISPATCH + UPDATE (คำถามข้อ 3)
// ===========================================================================

function Slide06({ num }) {
  const stages = [
    { t: 'รับเรื่อง', c: C.textMuted },
    { t: 'กำลังดำเนินการ', c: C.accent },
    { t: 'แก้ไขแล้ว', c: C.success },
    { t: 'ปิดเหตุ + สรุปรายงาน', c: C.primary },
  ];
  return (
    <Slide num={num}>
      <Eyebrow accent>คำถามข้อ 3 · อัปเดตข้อมูลอย่างไร?</Eyebrow>
      <Title size={32}>ส่งต่ออัตโนมัติ + ทุกฝ่ายเห็นสถานะชุดเดียวกัน</Title>
      <Lead style={{ marginTop: 6, marginBottom: 10, fontSize: 16 }}>
        ระบบส่งต่อหน่วยรับผิดชอบให้อัตโนมัติ แล้วอัปเดตสถานะ real-time — ลดการสื่อสารผิดพลาดระหว่างกอง
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 18, flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 14, padding: '14px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.primaryDeep, marginBottom: 8 }}>ส่งต่อหน่วยรับผิดชอบอัตโนมัติ</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['ปภ. (ป้องกันฯ)', 'กองช่าง', 'สาธารณสุข · กู้ชีพ', 'ผู้บริหาร'].map((u, i) => (
                <Pill key={i} bg={C.primarySoft} color={C.primary}>{u}</Pill>
              ))}
            </div>
          </div>
          <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 14, padding: '14px 18px', flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.primaryDeep, marginBottom: 10 }}>สถานะ real-time (Timeline 4 ขั้น — ตรวจสอบย้อนหลังได้)</div>
            {stages.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: s.c, flexShrink: 0 }} />
                <div style={{ fontSize: 14.5, fontWeight: 600, color: C.text }}>{s.t}</div>
              </div>
            ))}
            <p style={{ fontSize: 12, color: C.textMuted, marginTop: 4, fontStyle: 'italic' }}>มีเวลากำกับแต่ละขั้น = accountability ตอบ "ปลัด" ได้</p>
          </div>
        </div>
        <UIImage
          file="event_dashboard.png"
          label="Event Dashboard — ทุกฝ่ายเห็นจอเดียวกัน"
          note="Events Dashboard normal view_0.png (รูปสะอาดสุด) + Timeline 4 ขั้น · crop ก่อน"
        />
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 7 — WORKFLOW DIAGRAM (flow_6 overview)
// ===========================================================================

function Slide07({ num }) {
  return (
    <Slide num={num}>
      <Eyebrow>ระบบทำงานอย่างไร</Eyebrow>
      <Title size={32}>ภาพรวม: ช่องทาง → คัดกรอง → ปลายทาง → อัปเดต</Title>
      <Lead style={{ marginTop: 6, marginBottom: 6, fontSize: 16 }}>
        เดินเล่าจากซ้ายไปขวา — จุดเน้น: Geo-fencing แจ้งเฉพาะพื้นที่ + แจ้งเตือนหลายช่องทาง
      </Lead>
      <div style={{ marginTop: 8, padding: '14px 18px', background: '#FFF', borderRadius: 18, border: `1px solid ${C.surfaceSoft}`, flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={`${DIA}/flow_6_system_overview.svg`} alt="ภาพรวมการทำงานทั้งระบบ" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
    </Slide>
  );
}

// ===========================================================================
// Package detail slide — shared layout (diagram + who/what)
// ===========================================================================

function PackageSlide({ num, eyebrow, name, who, gets, diagram, accentColor = C.primary, badge }) {
  return (
    <Slide num={num}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Title size={32}>
        แพ็กเกจ {name}{badge && <span style={{ fontSize: 16, fontWeight: 700, color: accentColor, background: C.surfaceSoft, padding: '4px 12px', borderRadius: 100, marginLeft: 12, verticalAlign: 'middle' }}>{badge}</span>}
      </Title>
      <div style={{ display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 18, flex: 1, minHeight: 0, marginTop: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <div style={{ background: '#FFF', borderRadius: 14, padding: '14px 18px', border: `1px solid ${C.surfaceSoft}`, borderLeft: `4px solid ${accentColor}` }}>
            <h4 style={{ fontSize: 13.5, fontWeight: 700, color: accentColor, marginBottom: 6 }}>เหมาะกับใคร</h4>
            <p style={{ fontSize: 14.5, color: C.text, lineHeight: 1.5, margin: 0 }}>{who}</p>
          </div>
          <div style={{ background: '#FFF', borderRadius: 14, padding: '14px 18px', border: `1px solid ${C.surfaceSoft}`, flex: 1 }}>
            <h4 style={{ fontSize: 13.5, fontWeight: 700, color: C.primaryDeep, marginBottom: 10 }}>ได้อะไร</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {gets.map((g, i) => (
                <li key={i} style={{ fontSize: 13.5, color: C.text, lineHeight: 1.5, padding: '4px 0 4px 20px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.success, fontWeight: 800 }}>✓</span>{g}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: C.surfaceSoft, borderRadius: 10, padding: '8px 14px', fontSize: 12.5, color: C.textMuted }}>
            ราคา: <strong style={{ color: C.primary }}>ปรึกษาทีมงาน</strong> — ออกแบบ scope ตามขนาดและบริบทหน่วยงาน
          </div>
        </div>
        <div style={{ background: '#FFF', borderRadius: 18, border: `1px solid ${C.surfaceSoft}`, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, overflow: 'hidden' }}>
          <img src={`${DIA}/${diagram}`} alt={`workflow ${name}`} style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </div>
      </div>
    </Slide>
  );
}

function Slide08({ num }) {
  return (
    <PackageSlide
      num={num}
      eyebrow="แพ็กเกจ 1 · เริ่มต้น"
      name="Starter"
      who="หน่วยงานที่เริ่มต้น อยากรวมช่องทางรับแจ้งเหตุให้เป็นระบบก่อน — เริ่มเล็ก พิสูจน์ workflow ก่อนขยาย"
      gets={[
        'รับแจ้งผ่านเว็บ / LINE',
        'ศูนย์ข้อมูลกลาง — ทุกเหตุที่เดียว',
        'ส่งต่อหน่วยงานที่รับผิดชอบ',
        'Event Report สรุปเหตุอัตโนมัติ',
        'แจ้งเตือนผ่าน Email',
      ]}
      diagram="flow_1_starter.svg"
    />
  );
}

function Slide09({ num }) {
  return (
    <PackageSlide
      num={num}
      eyebrow="แพ็กเกจ 2 · เน้น Sensor"
      name="Eco-Monitor"
      badge="★ ชู Sensor"
      accentColor={C.success}
      who={'งานที่ "ค่าที่วัดได้" คือหัวใจ — ประปา · โรงบำบัด · จุดเสี่ยงน้ำท่วม / สารเคมี'}
      gets={[
        'Measurement Dashboard — ค่าวัดสด',
        'Realtime Monitoring 24 ชม.',
        'คัดกรองอัตโนมัติเทียบเกณฑ์',
        'แจ้งเตือนทันทีเมื่อเกินค่า (เช่น คลอรีนรั่ว)',
        'Measurement Report ย้อนหลัง',
      ]}
      diagram="flow_2_eco_monitor.svg"
    />
  );
}

function Slide10({ num }) {
  return (
    <PackageSlide
      num={num}
      eyebrow="แพ็กเกจ 3 · เต็มระบบ"
      name="Emergency"
      badge="ครบวงจร"
      accentColor={C.accent}
      who="หน่วยงานที่ต้องการศูนย์บัญชาการเหตุครบวงจร ครอบคลุมทั้ง 4 ระยะของเหตุ"
      gets={[
        'คัดกรอง 3 รูปแบบ + GIS แผนที่',
        'Chem Hub (ฐาน MSDS สารเคมี)',
        'Hazard Modeling จำลองการแพร่กระจาย',
        'บริหารทรัพยากร / ทีม ตามความรุนแรง',
        'Mass Notify ทุกช่องทาง · ครบ 4 ระยะ',
      ]}
      diagram="flow_3_emergency.svg"
    />
  );
}

// ===========================================================================
// SLIDE 11 — LRP camera promo
// ===========================================================================

function Slide11({ num }) {
  return (
    <Slide num={num}>
      <Eyebrow accent>โปรโมชันเข้าตลาด · เริ่มงบน้อย</Eyebrow>
      <Title size={30}>ต่อยอดกล้องเดิม — ไม่ต้องลงทุนกล้องใหม่</Title>
      <Lead style={{ marginTop: 6, marginBottom: 10, fontSize: 16 }}>
        ใช้กล้อง CCTV ที่หน่วยงานมีอยู่แล้ว (เริ่ม 5 ตัว) ต่อยอดให้ <strong style={{ color: C.primary }}>ตรวจจับเหตุ</strong> และส่งเข้าศูนย์เดียวกัน
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: 18, flex: 1, minHeight: 0 }}>
        <div style={{ background: '#FFF', borderRadius: 18, border: `1px solid ${C.surfaceSoft}`, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, overflow: 'hidden' }}>
          <img src={`${DIA}/flow_4_lrp_cctv_promo.svg`} alt="ต่อยอดกล้องเดิม" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, justifyContent: 'center' }}>
          {[
            { ic: '📷', t: 'ใช้กล้องเดิม 5 ตัว', d: 'ไม่ต้องซื้อกล้องใหม่ — ต่อยอดที่มีอยู่' },
            { ic: '🖥️', t: 'ประมวลผลในพื้นที่ (On-Premise)', d: 'รันบนเซิร์ฟเวอร์ของหน่วยงาน · หากไม่พอ เสริมกล่อง Edge AI' },
            { ic: '🚪', t: 'ประตูสู่ระบบเต็ม', d: 'เริ่มงบน้อย เห็นผลเร็ว แล้วขยายเป็นแพ็กเกจเต็มภายหลัง' },
          ].map((b, i) => (
            <div key={i} style={{ background: C.primarySoft, borderRadius: 14, padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{b.ic}</span>
              <div><div style={{ fontSize: 16, fontWeight: 700, color: C.primaryDeep, marginBottom: 3 }}>{b.t}</div><div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.5 }}>{b.d}</div></div>
            </div>
          ))}
        </div>
      </div>
      <p style={{ fontSize: 12, color: C.textMuted, fontStyle: 'italic', marginTop: 10 }}>
        ส่วนต่อยอดกล้อง = "ตรวจจับเหตุ" (เหตุการณ์บนถนน/พื้นที่ของหน่วยงาน) — ไม่ใช่การติดตามตัวบุคคล
      </p>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 12 — PACKAGE COMPARISON (price hidden)
// ===========================================================================

function Slide12({ num }) {
  const rows = [
    ['Dashboard รวมศูนย์', true, true, true],
    ['ส่งต่อหน่วยงาน + รายงาน', true, true, true],
    ['แจ้งเตือน (Email / LINE OA)', true, true, true],
    ['IoT Sensor เฝ้าระวัง', false, true, true],
    ['คัดกรองอัตโนมัติเทียบเกณฑ์', false, true, true],
    ['คัดกรอง 3 รูปแบบ', false, false, true],
    ['GIS แผนที่ + Geo-fencing', false, '◐', true],
    ['Chem Hub (MSDS) · Hazard Modeling', false, false, true],
    ['บริหารทรัพยากร / ทีม', false, false, true],
  ];
  const cell = (v) => {
    if (v === true) return <span style={{ color: C.success, fontWeight: 800, fontSize: 17 }}>✓</span>;
    if (v === '◐') return <span style={{ color: C.accent, fontWeight: 800, fontSize: 15 }}>◐</span>;
    return <span style={{ color: '#C9CFCB', fontSize: 15 }}>—</span>;
  };
  return (
    <Slide num={num}>
      <Eyebrow>เปรียบเทียบแพ็กเกจ</Eyebrow>
      <Title size={32}>เลือกที่ตรงงบและงานของหน่วยงาน</Title>
      <div style={{ marginTop: 16, background: '#FFF', borderRadius: 18, border: `1px solid ${C.surfaceSoft}`, overflow: 'hidden', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr 1fr 1fr', background: C.primaryDeep, color: '#FFF' }}>
          {['ความสามารถ', 'Starter', 'Eco-Monitor', 'Emergency'].map((h, i) => (
            <div key={i} style={{ padding: '12px 16px', fontSize: 14, fontWeight: 700, textAlign: i === 0 ? 'left' : 'center' }}>{h}</div>
          ))}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr 1fr 1fr', borderTop: `1px solid ${C.surfaceSoft}`, background: i % 2 ? C.surface : '#FFF', flex: 1, alignItems: 'center' }}>
              <div style={{ padding: '0 16px', fontSize: 13.5, fontWeight: 600, color: C.text }}>{r[0]}</div>
              <div style={{ textAlign: 'center' }}>{cell(r[1])}</div>
              <div style={{ textAlign: 'center' }}>{cell(r[2])}</div>
              <div style={{ textAlign: 'center' }}>{cell(r[3])}</div>
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr 1fr 1fr', borderTop: `2px solid ${C.primary}`, background: C.primarySoft, alignItems: 'center', padding: '10px 0' }}>
            <div style={{ padding: '0 16px', fontSize: 13.5, fontWeight: 700, color: C.primaryDeep }}>ราคา</div>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, color: C.accent }}>ปรึกษาทีมงาน</div>
            ))}
          </div>
        </div>
      </div>
      <p style={{ fontSize: 11.5, color: C.textMuted, fontStyle: 'italic', marginTop: 8 }}>◐ = บางส่วน · ความสามารถปรับได้ตาม scope ที่ออกแบบร่วมกับหน่วยงาน</p>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 13 — vs Traffy Fondue
// ===========================================================================

function Slide13({ num }) {
  const rows = [
    ['ช่องทางรับเหตุ', 'แจ้งจากประชาชนเป็นหลัก', 'ประชาชน + Sensor IoT + กล้อง AI'],
    ['ขอบเขตเหตุ', 'หลังเกิดเรื่อง → แจ้งซ่อม/แก้', 'ครบ 4 ระยะ: ก่อน · เริ่ม · ระหว่าง · สิ้นสุด'],
    ['การคัดกรอง', 'ส่งต่อหน่วยงานที่เกี่ยว', 'คัดกรอง 3 รูปแบบ (กันตื่นตระหนก)'],
    ['บริหารทรัพยากร', '—', 'จัดสรรกำลัง/ทีม + ฐานข้อมูลความเสี่ยง'],
    ['การแจ้งเตือน', 'รายงานผลให้ประชาชน', 'Mass Notify + Geo-fencing เฉพาะพื้นที่'],
  ];
  return (
    <Slide num={num}>
      <Eyebrow accent>วางตำแหน่งให้ชัด</Eyebrow>
      <Title size={30}>Traffy Fondue ทำเรื่องร้องเรียนได้ดี — เราเสริมคนละมุม</Title>
      <Lead style={{ marginTop: 6, marginBottom: 10, fontSize: 15.5 }}>
        Traffy = กล่องรับเรื่อง "หลังเกิดเหตุ" · Smart Center = เฝ้าระวัง "ก่อนเกิด" + บริหารสั่งการ "ระหว่างเกิด" — ใช้คู่กัน ไม่ใช่แทนกัน
      </Lead>
      <div style={{ background: '#FFF', borderRadius: 18, border: `1px solid ${C.surfaceSoft}`, overflow: 'hidden', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr 1.4fr', background: C.primaryDeep, color: '#FFF' }}>
          {['มุม', 'Traffy Fondue', 'Smart Center Solution Platform'].map((h, i) => (
            <div key={i} style={{ padding: '12px 16px', fontSize: 14, fontWeight: 700 }}>{h}</div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr 1.4fr', borderTop: `1px solid ${C.surfaceSoft}`, background: i % 2 ? C.surface : '#FFF', flex: 1, alignItems: 'center' }}>
            <div style={{ padding: '0 16px', fontSize: 13.5, fontWeight: 700, color: C.primaryDeep }}>{r[0]}</div>
            <div style={{ padding: '0 16px', fontSize: 13, color: C.textMuted }}>{r[1]}</div>
            <div style={{ padding: '0 16px', fontSize: 13, color: C.text, fontWeight: 600 }}>{r[2]}</div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 14 — Reference (generic wording until supplier permission)
// ===========================================================================

function Slide14({ num }) {
  return (
    <Slide num={num}>
      <Eyebrow>ตัวอย่างการใช้งาน</Eyebrow>
      <Title size={32}>เฝ้าระวังจุดเสี่ยงสูง — Sensor สั่งการได้จริง</Title>
      <Lead style={{ marginTop: 6, marginBottom: 12, fontSize: 16 }}>
        ตัวอย่างงานที่เดิมพันสูง: เฝ้าระวังการรั่วไหลของสารเคมีในพื้นที่สาธารณูปโภค
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, flex: 1, minHeight: 0 }}>
        <div style={{ background: '#FFF', borderRadius: 16, border: `1px solid ${C.surfaceSoft}`, borderLeft: `4px solid ${C.primary}`, padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, letterSpacing: 1, marginBottom: 10 }}>หน่วยงานด้านสาธารณูปโภค</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: C.primaryDeep, lineHeight: 1.4, marginBottom: 12 }}>เฝ้าระวังคลอรีนรั่วไหล</h3>
          <p style={{ fontSize: 14.5, color: C.text, lineHeight: 1.6 }}>
            Sensor ตรวจจับคลอรีน + ม่านน้ำ (water curtain) กันการแพร่กระจาย → ระบบเทียบค่าเกินเกณฑ์ →
            แจ้งเจ้าหน้าที่ที่เกี่ยวข้องเข้าตรวจและแก้ไขทันที
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>
          {[
            { ic: '🏭', t: 'นิคมอุตสาหกรรม', d: 'งานตรวจวัดมลพิษอากาศ · เฝ้าระวังจุดเสี่ยง' },
            { ic: '🌫️', t: 'งานสิ่งแวดล้อม', d: 'ตรวจวัดฝุ่น / คุณภาพอากาศแบบต่อเนื่อง' },
          ].map((c, i) => (
            <div key={i} style={{ background: C.primarySoft, borderRadius: 14, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
              <span style={{ fontSize: 30 }}>{c.ic}</span>
              <div><div style={{ fontSize: 16, fontWeight: 700, color: C.primaryDeep }}>{c.t}</div><div style={{ fontSize: 13, color: C.textMuted }}>{c.d}</div></div>
            </div>
          ))}
          <div style={{ background: C.accentSoft, borderRadius: 12, padding: '12px 16px', fontSize: 12, color: C.text, lineHeight: 1.5, borderLeft: `3px solid ${C.accent}` }}>
            <strong style={{ color: C.accent }}>หมายเหตุ:</strong> ชื่อหน่วยงานอ้างอิงจะระบุเมื่อได้รับอนุญาต · ตัวเลขทุกตัวเป็นตัวอย่าง
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 15 — Chem Hub (เสริม สลับตามพื้นที่)
// ===========================================================================

function Slide15({ num }) {
  return (
    <Slide num={num}>
      <Eyebrow accent>slide เสริม · เฉพาะพื้นที่มีโรงงาน/นิคม (EEC)</Eyebrow>
      <Title size={30}>ความปลอดภัยตอนเข้าระงับเหตุ — สิ่งที่ Traffy ไม่มี</Title>
      <Lead style={{ marginTop: 6, marginBottom: 10, fontSize: 16 }}>
        เปิดดูข้อมูลสารเคมีหน้างานได้ทันที (CAS / UN / Class / AEGL / NFPA) + ชุดป้องกัน + รัศมีอพยพ + ปฐมพยาบาล
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, flex: 1, minHeight: 0 }}>
        <UIImage
          file="chem_hub.png"
          label="ฐานข้อมูลสารเคมี (Chem Hub)"
          note="Screenshot 145719_0.png — หน้าคลอรีน · crop browser bar (ติด domain ชัด) ก่อน"
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
          {[
            { ic: '🧪', t: 'ข้อมูลสารครบ', d: 'CAS · UN · Class · AEGL · NFPA — มาตรฐานสากล' },
            { ic: '🦺', t: 'ชุดป้องกันที่ต้องใส่', d: 'เจ้าหน้าที่รู้ทันทีว่าใส่อะไรก่อนเข้าพื้นที่' },
            { ic: '📐', t: 'รัศมีอพยพ', d: 'กำหนดพื้นที่อพยพได้ถูกต้อง ลดความเสี่ยงต่อชีวิต' },
            { ic: '➕', t: 'ปฐมพยาบาล', d: 'แนวทางช่วยเหลือเบื้องต้นพร้อมหน้างาน' },
          ].map((b, i) => (
            <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 12, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 24 }}>{b.ic}</span>
              <div><div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{b.t}</div><div style={{ fontSize: 12.5, color: C.textMuted }}>{b.d}</div></div>
            </div>
          ))}
        </div>
      </div>
      <p style={{ fontSize: 11.5, color: C.textMuted, fontStyle: 'italic', marginTop: 8 }}>
        ตัวเลข AEGL/NFPA = ข้อมูลมาตรฐานสากล · สลับ slide นี้ออกถ้าพื้นที่ไม่มีความเสี่ยงสารเคมี (กัน "ขายเกินจำเป็น")
      </p>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 16 — Summary (3 benefits)
// ===========================================================================

function Slide16({ num }) {
  const benefits = [
    { ic: '⚡', t: 'เร็วขึ้น', d: 'รวมศูนย์ ตอบสนองเหตุได้ไวขึ้น ลดเวลาประสานงานระหว่างกอง' },
    { ic: '🎯', t: 'แม่นขึ้น', d: 'ทุกฝ่ายตัดสินใจบนข้อมูลชุดเดียวกัน ลดความสับสน/ทำงานซ้ำซ้อน' },
    { ic: '📋', t: 'มีหลักฐาน', d: 'รายงานครบ ใช้ชี้แจง / ทำผลงาน / ของบประมาณ และต่อยอดได้' },
  ];
  return (
    <Slide num={num}>
      <Eyebrow>สรุป</Eyebrow>
      <Title size={36}>3 สิ่งที่หน่วยงานได้กลับไป</Title>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 20, flex: 1, alignContent: 'center' }}>
        {benefits.map((b, i) => (
          <Card key={i} style={{ textAlign: 'center', padding: '28px 24px' }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>{b.ic}</div>
            <CardTitle style={{ fontSize: 24, marginBottom: 10 }}>{b.t}</CardTitle>
            <CardBody style={{ fontSize: 15 }}>{b.d}</CardBody>
          </Card>
        ))}
      </div>
      <div style={{ marginTop: 18, background: C.primarySoft, borderRadius: 14, padding: '14px 20px', display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ fontSize: 22 }}>🏙️</span>
        <p style={{ fontSize: 14, color: C.text, lineHeight: 1.5, margin: 0 }}>
          <strong style={{ color: C.primary }}>ผลพลอยได้:</strong> เมื่อมีฐานข้อมูลเหตุการณ์ครบ หน่วยงานจะมีข้อมูลพร้อมต่อยอดสู่ Smart City / ขอรางวัล / ยื่นประเมินในอนาคต
        </p>
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 17 — Close / 3 feedback questions
// ===========================================================================

function Slide17({ num }) {
  return (
    <Slide num={num} dark>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Eyebrow dark>ขั้นต่อไป</Eyebrow>
        <Title dark size={42}>
          ขอเวลาท่านสักครู่<br />คุยเรื่องการรับแจ้งเหตุของหน่วยงานท่าน
        </Title>
        <Lead dark style={{ marginTop: 18, maxWidth: 960 }}>
          ท่านไม่ต้องตัดสินใจอะไรในวันนี้ — เราอยากเริ่มจากเลือก 1-2 module มาทดลอง
          ติดตั้ง pilot แล้ววัดผลจริง ก่อนขยายเป็นระบบเต็ม
        </Lead>
        <div style={{ marginTop: 28, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 18, padding: '24px 28px', maxWidth: 1000 }}>
          <h3 style={{ color: '#FFF', fontSize: 20, fontWeight: 700, marginBottom: 14 }}>3 คำถามที่อยากฟังจากท่าน</h3>
          <p style={{ color: 'rgba(255,255,255,.9)', fontSize: 17, lineHeight: 1.9 }}>
            1. แนวคิดที่เรานำเสนอ ตรงกับปัญหาการรับแจ้ง/สั่งการเหตุของท่านแค่ไหน?<br />
            2. สิ่งที่ท่านกังวลที่สุดในการเริ่มต้นใช้ระบบนี้คืออะไร?<br />
            3. ถ้าจะเริ่ม pilot — เงื่อนไขสำคัญที่สุดของท่านคืออะไร?
          </p>
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// Deck Toolbar (print + jump-to-slide)
// ---------------------------------------------------------------------------

function Toolbar() {
  const [open, setOpen] = useState(false);
  const titles = [
    '1 · 🎬 Hook · ทุกวินาทีคือความปลอดภัย',
    '2 · 🚨 Pain · รับแจ้งเหตุวันนี้เป็นอย่างไร',
    '3 · ✨ Solution · ศูนย์ข้อมูลกลาง 3 เสาหลัก',
    '4 · 📥 Q1 · เข้ามากี่ช่องทาง',
    '5 · 🔎 Q2 · คัดกรอง 3 รูปแบบ',
    '6 · 🔄 Q3 · ส่งต่อ + อัปเดตสถานะ',
    '7 · 🗺️ Workflow รวมทั้งระบบ',
    '8 · 📦 แพ็กเกจ Starter',
    '9 · 📡 แพ็กเกจ Eco-Monitor',
    '10 · 🚒 แพ็กเกจ Emergency',
    '11 · 📷 โปรโมชัน · ต่อยอดกล้องเดิม',
    '12 · 📊 เปรียบเทียบ 3 แพ็กเกจ',
    '13 · ⚖️ จุดต่างจาก Traffy Fondue',
    '14 · 🏭 ตัวอย่างใช้งานจริง',
    '15 · 🧪 เสริม · Chem Hub (พื้นที่นิคม)',
    '16 · 🏛️ สรุป 3 benefit',
    '17 · 🤝 ปิด · 3 คำถาม feedback',
  ];
  const goTo = (i) => {
    const el = document.getElementById(`slide-${i + 1}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };
  return (
    <div className="deck-toolbar">
      <span style={{ flex: 1 }} />
      <span className="note">กด "พิมพ์/บันทึก PDF" แล้วเลือก Landscape</span>
      <button onClick={() => setOpen(!open)}>{open ? 'ปิดเมนู' : 'ไปสไลด์...'}</button>
      <button onClick={() => window.print()}>พิมพ์ / บันทึก PDF</button>
      {open && (
        <div style={{ position: 'absolute', top: 44, right: 16, background: '#FFF', color: C.text, borderRadius: 8, boxShadow: '0 10px 30px rgba(0,0,0,.2)', padding: 8, maxHeight: 'calc(100vh - 110px)', overflowY: 'auto', minWidth: 320, zIndex: 1100 }}>
          {titles.map((t, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', fontSize: 13, color: C.text, background: 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.surfaceSoft)}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ScrollDots — vertical dot indicator on right edge
// ---------------------------------------------------------------------------

function ScrollDots({ count }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.idx, 10);
            if (!isNaN(idx)) setActive(idx);
          }
        });
      },
      { threshold: 0.45, rootMargin: '-20% 0px -20% 0px' }
    );
    for (let i = 0; i < count; i++) {
      const el = document.getElementById(`slide-${i + 1}`);
      if (el) {
        el.dataset.idx = String(i);
        observer.observe(el);
      }
    }
    return () => observer.disconnect();
  }, [count]);

  return (
    <div
      className="scroll-dots"
      style={{
        position: 'fixed', right: 14, top: '50%', transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: 8, zIndex: 999,
        background: 'rgba(0,0,0,0.35)', padding: '12px 8px', borderRadius: 100, backdropFilter: 'blur(8px)',
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            type="button"
            title={`Slide ${i + 1}`}
            aria-label={`ไปยังสไลด์ที่ ${i + 1}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(`slide-${i + 1}`);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              setActive(i);
            }}
            style={{
              display: 'block', width: isActive ? 12 : 8, height: isActive ? 12 : 8, padding: 0,
              borderRadius: '50%', background: isActive ? '#FFF' : 'rgba(255,255,255,0.45)',
              border: isActive ? `2px solid ${C.primaryHover}` : '1px solid rgba(255,255,255,0.6)',
              transition: 'all .2s ease', cursor: 'pointer',
            }}
          />
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function PitchDeck() {
  const slides = [
    Slide01, Slide02, Slide03, Slide04, Slide05,
    Slide06, Slide07, Slide08, Slide09, Slide10,
    Slide11, Slide12, Slide13, Slide14, Slide15,
    Slide16, Slide17,
  ];
  return (
    <>
      <DeckStyles />
      <RotateHint />
      <Toolbar />
      <ScrollDots count={slides.length} />
      <div className="deck-root">
        {slides.map((S, i) => (
          <div key={i} id={`slide-${i + 1}`}>
            <ScaledSlide>
              <S num={i + 1} />
            </ScaledSlide>
          </div>
        ))}
      </div>
    </>
  );
}
