import React, { useEffect, useState, useRef } from 'react';

// ---------------------------------------------------------------------------
// SmartTraffic.jsx — Sales Pitch Deck (15 slides · 1280×720 · print-PDF ready)
// Design: Civic Trust palette (Forest #0F6E56 + Cream #FAF7EE + Amber #BA7517 + Navy)
// Font: Sarabun
// Audience: ผู้บริหารเมือง (นายก·ปลัด) · B2G · pain-first storytelling
// ---------------------------------------------------------------------------

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
  success: '#639922',
  successSoft: '#EAF3DE',
  navy: '#0A1F3D',
};

const IMG = 'images/smart_traffic';
const VIDEO_SRC = '/videos/0518.mp4';
const VIDEO_POSTER = '/videos/0518_poster.jpg';
const TOTAL_SLIDES = 15;

// ---------------------------------------------------------------------------
// Slide shell — fixed 1280×720, scaled to viewport (screen) and 1:1 (print)
// ---------------------------------------------------------------------------

function Slide({ num, dark = false, navy = false, children, footer = '' }) {
  const bg = navy
    ? `linear-gradient(135deg, ${C.navy} 0%, ${C.primaryDeep} 100%)`
    : dark
      ? `linear-gradient(135deg, ${C.primaryDeep} 0%, ${C.primary} 100%)`
      : C.surface;
  const isDark = dark || navy;
  return (
    <section
      className="slide-page"
      data-dark={isDark ? 'true' : 'false'}
      style={{
        position: 'relative',
        width: 1280,
        height: 720,
        background: bg,
        color: isDark ? '#FFF' : C.text,
        overflow: 'hidden',
        fontFamily: 'Sarabun, sans-serif',
        flexShrink: 0,
      }}
    >
      {!isDark && (
        <div
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: C.primary }}
        />
      )}
      <div style={{ position: 'absolute', inset: 0, padding: '52px 60px 56px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {children}
      </div>
      {footer && (
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: 60,
            fontSize: 12,
            color: isDark ? 'rgba(255,255,255,0.7)' : C.textMuted,
            opacity: 0.85,
            fontWeight: 500,
            letterSpacing: 0.5,
          }}
        >
          {footer}
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          bottom: 22,
          right: 38,
          fontSize: 13,
          color: isDark ? 'rgba(255,255,255,0.7)' : C.textMuted,
          fontWeight: 500,
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
    <p
      style={{
        display: 'inline-block',
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: col,
        marginBottom: 12,
      }}
    >
      {children}
    </p>
  );
}

function Title({ dark, size = 40, children, style }) {
  return (
    <h2
      style={{
        fontSize: size,
        fontWeight: 800,
        lineHeight: 1.4,
        color: dark ? '#FFF' : C.primaryDeep,
        letterSpacing: -0.3,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

function Lead({ dark, children, style }) {
  return (
    <p
      style={{
        fontSize: 19,
        fontWeight: 400,
        lineHeight: 1.6,
        color: dark ? 'rgba(255,255,255,0.9)' : C.textMuted,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function Card({ children, dark, style }) {
  return (
    <div
      style={{
        background: dark ? 'rgba(255,255,255,0.08)' : '#FFF',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.16)' : C.surfaceSoft}`,
        borderRadius: 18,
        padding: '24px 26px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CardIcon({ children, bg, color }) {
  return (
    <div
      style={{
        width: 46,
        height: 46,
        borderRadius: 12,
        background: bg || C.primarySoft,
        color: color || C.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}

function CardTitle({ dark, children, style }) {
  return (
    <h3
      style={{
        fontSize: 19,
        fontWeight: 700,
        color: dark ? '#FFF' : C.text,
        marginBottom: 7,
        lineHeight: 1.45,
        ...style,
      }}
    >
      {children}
    </h3>
  );
}

function CardBody({ dark, children, style }) {
  return (
    <p
      style={{
        fontSize: 15,
        color: dark ? 'rgba(255,255,255,0.85)' : C.textMuted,
        lineHeight: 1.55,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function NumBadge({ n }) {
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: C.primary,
        color: '#FFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: 19,
        flexShrink: 0,
      }}
    >
      {n}
    </div>
  );
}

function Pill({ bg, color, children, style }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 1,
        textTransform: 'uppercase',
        padding: '5px 12px',
        borderRadius: 100,
        background: bg || 'rgba(255,255,255,0.14)',
        color: color || '#FFF',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function Note({ children, style }) {
  return (
    <div
      style={{
        fontSize: 13.5,
        color: C.textMuted,
        padding: '12px 16px',
        background: '#FFF',
        borderLeft: `3px solid ${C.accent}`,
        borderRadius: '0 8px 8px 0',
        lineHeight: 1.6,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Deck Styles (toolbar + print PDF + scroll-behavior)
// ---------------------------------------------------------------------------

function DeckStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700;800&display=swap');

      html { scroll-behavior: smooth; }
      .deck-root { font-family: 'Sarabun', sans-serif; background: #6b6b6b; min-height: 100vh; padding-top: 56px; padding-bottom: 40px; }
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

      .slide-wrapper { display: flex; justify-content: center; margin: 0 auto 24px; }
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
  const [scale, setScale] = useState(1);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function compute() {
      const target = 1280;
      const available = Math.min(window.innerWidth - 32, target);
      setScale(available / target);
    }
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  return (
    <div className="slide-wrapper" ref={wrapperRef} style={{ width: 1280 * scale, height: 720 * scale }}>
      <div className="slide-scale" style={{ transform: `scale(${scale})`, width: 1280, height: 720 }}>
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 1 — HERO (Title + Pain frame)
// ---------------------------------------------------------------------------

function Slide01() {
  return (
    <Slide num={1} navy>
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 44, alignItems: 'center', height: '100%' }}>
        <div>
          <Eyebrow color={C.accent}>SMART TRAFFIC · ระบบบริหารจราจร + ความปลอดภัยจุดตัดทางรถไฟ</Eyebrow>
          <h1 style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.35, color: '#FFF', letterSpacing: -0.5 }}>
            ถนนในเขตของท่าน ลื่นไหลและปลอดภัยขึ้น<br />
            <span style={{ color: C.surfaceSoft }}>ด้วยข้อมูลจริง 24 ชั่วโมง</span>
          </h1>
          <Lead dark style={{ marginTop: 22 }}>
            ระบบเฝ้าระวังและบริหารจราจรอัจฉริยะ ที่ทำงานได้ทั้งกลางคืน ฝนตก และย้อนแสง —
            และปกป้องจุดตัดทางรถไฟไม่ให้เกิดเหตุซ้ำ
          </Lead>
          <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Pill>จราจรลื่นไหล</Pill>
            <Pill>ปลอดภัยจุดตัดรถไฟ</Pill>
            <Pill>ข้อมูลพร้อมตอบสภา</Pill>
          </div>
        </div>
        <div style={{ width: '100%', height: '78%', borderRadius: 18, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.45)' }}>
          <img src={`${IMG}/slide01-hero.png`} alt="แยกจราจรในเขตเทศบาล" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 2 — EXEC SUMMARY (3 cards)
// ---------------------------------------------------------------------------

function Slide02() {
  const items = [
    { ic: '🚦', bg: C.primaryHover, color: '#FFF', t: 'จราจรลื่นไหล', d: 'ไฟแดงปรับตามปริมาณรถจริง ไม่ใช่ตั้งเวลาตายตัว ลดเวลารถติดสะสมในชั่วโมงเร่งด่วน' },
    { ic: '🛡️', bg: C.alert, color: '#FFF', t: 'ปลอดภัยจุดตัดรถไฟ', d: 'ป้องกันรถติดคร่อมราง ก่อนรถไฟจะมาถึง — ลดความเสี่ยงเหตุร้ายแรงที่เป็นข่าวซ้ำๆ' },
    { ic: '📊', bg: C.accent, color: '#FFF', t: 'ข้อมูลพร้อมตัดสินใจ', d: 'รายงานปริมาณจราจร จุดเสี่ยง ช่วงเวลาวิกฤต — ใช้วางแผนงบ ขออนุมัติ ตอบสภาได้' },
  ];
  return (
    <Slide num={2}>
      <Eyebrow>ภาพรวมใน 1 นาที</Eyebrow>
      <Title>ระบบเดียว แก้ 3 เรื่องที่ประชาชนเดือดร้อนที่สุด</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 28, marginTop: 18, flex: 1, alignItems: 'center' }}>
        <div style={{ display: 'grid', gridTemplateRows: 'repeat(3,1fr)', gap: 14 }}>
          {items.map((it, i) => (
            <Card key={i} style={{ padding: '18px 22px', display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 54, height: 54, borderRadius: 12, background: it.bg, color: it.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{it.ic}</div>
              <div>
                <CardTitle style={{ marginBottom: 3 }}>{it.t}</CardTitle>
                <CardBody style={{ fontSize: 14.5 }}>{it.d}</CardBody>
              </div>
            </Card>
          ))}
        </div>
        <div style={{ width: '100%', height: '92%', borderRadius: 18, overflow: 'hidden', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12, border: `1px solid ${C.surfaceSoft}` }}>
          <img src={`${IMG}/slide02-summary.png`} alt="ภาพรวมระบบ Smart Traffic 3 เสา" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </div>
      </div>
      <Note style={{ marginTop: 14 }}>
        <b>หลักคิด:</b> เราไม่ได้มาขาย "เมืองอัจฉริยะ" — เรามาช่วยแก้ปัญหาจราจรและความปลอดภัยที่ท่านเจอทุกวัน ส่วนรางวัล Smart City คือผลพลอยได้ที่ตามมาเมื่อท่านมีข้อมูลพร้อม
      </Note>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 3 — PAIN 1 · TRAFFIC
// ---------------------------------------------------------------------------

function Slide03() {
  const pains = [
    { t: 'รอนานเกินจริง', d: 'สัญญาณไฟไม่รู้ว่าตอนนี้เลนไหนรถแน่น ปล่อยไฟตามนาฬิกาอย่างเดียว' },
    { t: 'จุดเสี่ยงซ้ำซาก', d: 'รถสวนเลน / ขึ้นทางเท้า เกิดที่จุดเดิมๆ แต่ไม่มีข้อมูลยืนยันให้แก้เชิงกายภาพ' },
    { t: 'ตอบสภาไม่ได้', d: 'เวลาถูกถามว่า "ถนนเส้นนี้รถเยอะแค่ไหน" ไม่มีตัวเลขจริงในมือ' },
  ];
  return (
    <Slide num={3}>
      <Eyebrow alert>ปัญหาที่ 1</Eyebrow>
      <Title>ไฟแดงตั้งเวลาตายตัว ไม่ตรงกับรถจริง</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1080 }}>
        เลนที่รถแน่นต้องรอ เลนที่ว่างกลับได้ไฟเขียวยาว — รถติดสะสมโดยไม่จำเป็น
        และเมื่อมีคนขับสวนเลนหรือขึ้นทางเท้า ก็ไม่มีข้อมูลว่าจุดไหนเกิดบ่อย เกิดเวลาใด
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, marginTop: 16, flex: 1, alignItems: 'center' }}>
        <div style={{ width: '100%', height: '88%', borderRadius: 18, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.18)' }}>
          <img src={`${IMG}/slide03-pain-traffic.png`} alt="รถติดในเมือง" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateRows: 'repeat(3,1fr)', gap: 14 }}>
          {pains.map((p, i) => (
            <Card key={i} style={{ borderTop: `4px solid ${C.alert}`, padding: '16px 20px' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: C.alert, marginBottom: 4, lineHeight: 1.45 }}>{p.t}</h3>
              <p style={{ fontSize: 14.5, color: C.text, lineHeight: 1.5 }}>{p.d}</p>
            </Card>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 4 — PAIN 2 · RAILWAY (dark/deep)
// ---------------------------------------------------------------------------

function Slide04() {
  const pains = [
    { t: 'รถติดคร่อมราง', d: 'ข้ามมาแล้วไปต่อไม่ได้ เพราะฝั่งหน้าเต็ม' },
    { t: 'ไม้กั้นลงไม่ทัน', d: 'มีวัตถุ/รถค้างบนราง ขณะรถไฟใกล้เข้ามา' },
    { t: 'ไม่มีสัญญาณล่วงหน้า', d: 'ไม่มีระบบแจ้งเตือนก่อนเหตุจะเกิด' },
  ];
  return (
    <Slide num={4} dark>
      <Eyebrow dark color={C.accent}>ปัญหาที่ 2 · จุดที่อันตรายที่สุด</Eyebrow>
      <Title dark size={36}>จุดตัดทางรถไฟ — รถติดคร่อมราง คือเหตุร้ายแรงที่เกิดซ้ำ</Title>
      <Lead dark style={{ marginTop: 10, maxWidth: 1080 }}>
        อุบัติเหตุรถไฟชนรถที่ติดค้างบนราง มักไม่ได้เกิดจากความประมาทคนเดียว แต่เกิดจาก
        <strong style={{ color: '#FFF' }}> "รถฝั่งตรงข้ามเต็ม"</strong> ทำให้รถที่ข้ามมาติดค้างบนรางทั้งที่ยังไม่ทันรู้ตัว
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 24, marginTop: 16, flex: 1, alignItems: 'center' }}>
        <div style={{ width: '100%', height: '94%', borderRadius: 18, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.45)' }}>
          <img src={`${IMG}/slide04-railway-pain.png`} alt="จุดตัดทางรถไฟ — รถติดคร่อมราง" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateRows: 'repeat(3,1fr)', gap: 12 }}>
          {pains.map((p, i) => (
            <div key={i} style={{ background: '#16271F', borderRadius: 14, padding: '14px 18px' }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#FFF', marginBottom: 4, lineHeight: 1.45 }}>{p.t}</h3>
              <p style={{ fontSize: 14, color: '#cfe8dd', lineHeight: 1.5 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 12, background: 'rgba(186,117,23,0.18)', border: `1px dashed ${C.accent}`, borderRadius: 12, padding: '10px 16px', fontSize: 13, color: '#f0d9b0', lineHeight: 1.55 }}>
        ✏️ จุดนี้คือ "พระเอก" ที่ปลอดภัยที่สุดในเชิง compliance — เป็นการปกป้อง
        <b style={{ color: '#FFF' }}> โครงสร้างพื้นฐานของเมืองเอง</b> (ราง/สะพาน) ไม่ใช่การจับตาประชาชน เหมาะใช้นำเรื่อง
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 5 — SOLUTION · SENSOR FUSION
// ---------------------------------------------------------------------------

function Slide05() {
  return (
    <Slide num={5}>
      <Eyebrow>ทางออกที่เราเสนอ</Eyebrow>
      <Title size={36}>"ตา" 2 ชนิดทำงานคู่กัน — เห็นชัดทั้งกลางวันและกลางคืน</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.95fr', gap: 26, marginTop: 18, flex: 1, alignItems: 'center' }}>
        <div style={{ width: '100%', height: '94%', borderRadius: 18, overflow: 'hidden', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, border: `1px solid ${C.surfaceSoft}`, boxShadow: '0 10px 30px rgba(0,0,0,0.10)' }}>
          <img src={`${IMG}/slide05-sensor-fusion.png`} alt="กล้อง AI + Radar ทำงานคู่กัน" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 14 }}>
          <Card style={{ borderTop: `4px solid ${C.success}`, padding: '18px 22px' }}>
            <CardTitle style={{ color: C.primaryDeep, marginBottom: 6 }}>เซนเซอร์เรดาร์ (Radar)</CardTitle>
            <CardBody style={{ fontSize: 14.5 }}>
              มองด้วยคลื่นวิทยุ ไม่ใช่แสง → รู้ตำแหน่ง ความเร็ว ทิศทาง ของทุกคันที่เคลื่อนไหว
              แม้มืดสนิท ฝนตก หมอกลง — ทำงานได้ในที่ที่กล้องทำงานไม่ดี
            </CardBody>
          </Card>
          <Card style={{ borderTop: `4px solid ${C.success}`, padding: '18px 22px' }}>
            <CardTitle style={{ color: C.primaryDeep, marginBottom: 6 }}>กล้อง CCTV</CardTitle>
            <CardBody style={{ fontSize: 14.5 }}>
              ยืนยันภาพและประเภทยานพาหนะ ใช้คู่กับกล้องที่เมืองมีอยู่แล้วได้
              ไม่ต้องเปลี่ยนกล้อง ไม่ต้องเปลี่ยนระบบบันทึก
            </CardBody>
          </Card>
        </div>
      </div>
      <Note style={{ marginTop: 12 }}>
        <b>หมายเหตุ compliance:</b> ระบบนี้ <b>เฝ้าระวัง · บันทึก · ส่งข้อมูล</b> เหตุการณ์บนถนนของเมือง
        ไม่ใช่ "อุปกรณ์ตรวจวัด/ออกใบสั่ง" และการอ่านป้ายทะเบียนทำเฉพาะเมื่อมี event เท่านั้น
        โดยเทียบกับรายการที่เจ้าหน้าที่เมืองถือเอง — ไม่ใช่การติดตามรถประชาชนทั่วไป
      </Note>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 6 — HOW IT WORKS · 3 STEPS
// ---------------------------------------------------------------------------

function Slide06() {
  const steps = [
    { n: '01', t: 'เรดาร์ตรวจจับ', d: 'จับระยะ + ความเร็ว + ทิศทางของทุกคันในรัศมีหลายร้อยเมตร แม้มืดสนิท' },
    { n: '02', t: 'กล้องยืนยันภาพ', d: 'เมื่อเรดาร์เจอวัตถุ ระบบสั่งกล้องเก็บภาพ ณ จังหวะที่รถอยู่ในเฟรมพอดี ภาพคมชัดขึ้น' },
    { n: '03', t: 'รวมเป็นข้อมูล', d: 'นับรถ · ความเร็ว · ประเภท + ภาพ มารวมเป็นหน้าจอเดียว ดูสดและย้อนหลังได้' },
  ];
  return (
    <Slide num={6}>
      <Eyebrow>ทำงานอย่างไร</Eyebrow>
      <Title>3 ขั้น จากเซนเซอร์ → ข้อมูลที่ใช้ได้จริง</Title>
      <div style={{ width: '100%', height: 280, marginTop: 18, borderRadius: 18, overflow: 'hidden', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12, border: `1px solid ${C.surfaceSoft}` }}>
        <img src={`${IMG}/slide06-howitworks.png`} alt="3 ขั้นตอนการทำงาน" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 18, flex: 1, alignContent: 'center' }}>
        {steps.map((s) => (
          <Card key={s.n} style={{ padding: '18px 22px' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: C.accentSoft, color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, marginBottom: 10 }}>{s.n}</div>
            <CardTitle style={{ marginBottom: 5 }}>{s.t}</CardTitle>
            <CardBody style={{ fontSize: 14 }}>{s.d}</CardBody>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 7 — EDGE / ARCHITECTURE
// ---------------------------------------------------------------------------

function Slide07() {
  return (
    <Slide num={7}>
      <Eyebrow>เบื้องหลังที่มั่นใจได้</Eyebrow>
      <Title size={36}>ประมวลผลที่เสาไฟ — ไม่กินอินเทอร์เน็ตของเมือง</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1080 }}>
        ระบบคิดงานส่วนใหญ่ "ที่หน้างาน" (ที่เสาไฟ/ตู้ริมถนน) แล้วส่งเฉพาะ
        <strong style={{ color: C.text }}> ผลสรุป</strong> เข้าส่วนกลาง ไม่ได้ส่งวิดีโอทั้งหมด
        → ใช้เน็ตน้อย เสถียร และทำงานต่อได้แม้เน็ตสะดุดชั่วคราว
      </Lead>
      <div style={{ flex: 1, marginTop: 16, borderRadius: 18, overflow: 'hidden', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 18, border: `1px solid ${C.surfaceSoft}`, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
        <img src={`${IMG}/slide07-edge.png`} alt="Edge processing → Central platform" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
      <Note style={{ marginTop: 14 }}>
        <b>ผู้บริหารได้อะไร:</b> ไม่ต้องลงทุนวางสายเน็ตใหม่ทั้งเมือง ขยายทีละจุดได้ และระบบไม่ล่มทั้งหมดถ้าจุดใดจุดหนึ่งมีปัญหา
      </Note>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 8 — COMPARE TABLE
// ---------------------------------------------------------------------------

function Slide08() {
  const rows = [
    ['กลางวัน อากาศดี', 'นับได้ดี', 'นับได้ดี + รู้ความเร็วจริง'],
    ['กลางคืน', 'ตกหล่น เห็นบางคัน', 'นับครบทุกคัน'],
    ['ฝนตก / หมอกลง', 'ภาพเบลอ พลาดง่าย', 'ทำงานปกติ'],
    ['ย้อนแสง / พลบค่ำ', 'กล้องบอดชั่วขณะ', 'ทำงานปกติ'],
    ['ใช้เน็ตมากแค่ไหน', 'สูง (ส่งวิดีโอ)', 'ต่ำมาก (ส่งสรุป)'],
    ['จุดติดตั้งต่อพื้นที่', 'หลายจุด', 'ลดจำนวนจุดลงได้'],
  ];
  return (
    <Slide num={8}>
      <Eyebrow accent>ทำไมกล้องอย่างเดียวไม่พอ</Eyebrow>
      <Title>สิ่งที่เมืองเคยได้ vs สิ่งที่เมืองจะได้</Title>
      <div style={{ marginTop: 18, background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1.4fr', background: C.primaryDeep, color: '#FFF' }}>
          {['สถานการณ์', 'กล้องอย่างเดียว', 'กล้อง + เรดาร์'].map((h, i) => (
            <div key={i} style={{ padding: '14px 20px', fontSize: 15, fontWeight: 700 }}>{h}</div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1.4fr', borderTop: `1px solid ${C.surfaceSoft}`, background: i % 2 === 0 ? '#FFF' : C.surface }}>
            <div style={{ padding: '13px 20px', fontSize: 14.5, fontWeight: 600, color: C.primaryDeep, lineHeight: 1.5 }}>{r[0]}</div>
            <div style={{ padding: '13px 20px', fontSize: 14.5, color: C.textMuted, lineHeight: 1.5 }}>{r[1]}</div>
            <div style={{ padding: '13px 20px', fontSize: 14.5, color: C.primary, fontWeight: 600, lineHeight: 1.5 }}>{r[2]}</div>
          </div>
        ))}
      </div>
      <p style={{ textAlign: 'center', fontSize: 22, fontWeight: 700, color: C.primaryDeep, marginTop: 24, lineHeight: 1.5 }}>
        เรดาร์ไม่ได้มาแทนกล้อง — มาทำให้กล้องของเมืองทำงานได้ครบ 24 ชั่วโมง
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 9 — ADAPTIVE TRAFFIC LIGHT FLOWCHART
// ---------------------------------------------------------------------------

function Slide09() {
  return (
    <Slide num={9}>
      <Eyebrow>หัวใจที่ 1 · ไฟจราจรอัตโนมัติ</Eyebrow>
      <Title size={36}>ไฟแดงที่ "ดูรถจริง" แล้วค่อยตัดสินใจ</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1080 }}>
        ระบบอ่านปริมาณรถแต่ละเลนตลอดเวลา แล้วปรับเวลาไฟเขียวให้เลนที่รถแน่นกว่า —
        และเปิดทางให้รถฉุกเฉินก่อนเสมอ
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 22, marginTop: 14, flex: 1, alignItems: 'stretch' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 18, overflow: 'hidden', background: '#0E1B16', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.18)' }}>
          <img src={`${IMG}/slide09-adaptive-light.png`} alt="ระบบไฟอัตโนมัติ" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <FNode kind="start">อ่านจำนวนรถ + คิวรอ ของทุกเลน (ทุกไม่กี่วินาที)</FNode>
          <FArrow>↓</FArrow>
          <FNode kind="decision">มีรถฉุกเฉิน / รถพยาบาล หรือไม่?</FNode>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div>
              <FLabel>มี →</FLabel>
              <FNode kind="action">เปิดไฟเขียวให้เลนนั้นก่อน</FNode>
            </div>
            <div>
              <FLabel>ไม่มี →</FLabel>
              <FNode>คำนวณเลนที่ควรได้ไฟเขียวก่อน</FNode>
            </div>
          </div>
          <FArrow>↓</FArrow>
          <FNode kind="action">ปรับเพิ่ม/ลดเวลาไฟเขียวแบบสด แล้ววนกลับไปอ่านใหม่</FNode>
        </div>
      </div>
    </Slide>
  );
}

function FNode({ kind, children }) {
  const map = {
    start: { bg: C.primaryDeep, color: '#FFF', border: C.primaryDeep, weight: 600 },
    decision: { bg: C.accentSoft, color: C.primaryDeep, border: C.accent, weight: 600 },
    action: { bg: C.successSoft, color: C.text, border: C.success, weight: 500 },
    danger: { bg: C.alertSoft, color: C.alert, border: C.alert, weight: 600 },
  }[kind] || { bg: '#FFF', color: C.text, border: C.surfaceSoft, weight: 500 };
  return (
    <div
      style={{
        background: map.bg,
        color: map.color,
        border: `1.5px solid ${map.border}`,
        borderRadius: 10,
        padding: '10px 14px',
        fontSize: 13,
        lineHeight: 1.45,
        fontWeight: map.weight,
      }}
    >
      {children}
    </div>
  );
}

function FArrow({ children }) {
  return <div style={{ textAlign: 'center', fontSize: 16, color: C.textMuted, lineHeight: 1 }}>{children}</div>;
}

function FLabel({ children }) {
  return <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, textAlign: 'center', padding: '4px 0' }}>{children}</div>;
}

// ---------------------------------------------------------------------------
// SLIDE 10 — RAILWAY SAFETY FLOW
// ---------------------------------------------------------------------------

function Slide10() {
  return (
    <Slide num={10}>
      <Eyebrow alert>หัวใจที่ 2 · ความปลอดภัยจุดตัดรถไฟ</Eyebrow>
      <Title size={36}>กันรถไม่ให้ติดคร่อมราง ก่อนรถไฟจะมาถึง</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 22, marginTop: 16, flex: 1, alignItems: 'stretch' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 18, overflow: 'hidden', background: '#0E1B16', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.18)' }}>
          <img src={`${IMG}/slide10-railway-flow.png`} alt="ระบบป้องกันรถติดคร่อมราง" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <FNode kind="start">เฝ้าดูพื้นที่บนรางและฝั่งตรงข้าม ตลอด 24 ชม.</FNode>
          <FArrow>↓</FArrow>
          <FNode kind="decision">ฝั่งตรงข้ามรางเต็ม / รถขยับต่อไม่ได้?</FNode>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 6 }}>
            <FLabel>ใช่ →</FLabel>
            <FNode kind="danger">เปลี่ยนไฟก่อนเข้าทางรถไฟเป็นแดงทันที — ไม่ปล่อยรถเข้าไปติดบนราง</FNode>
            <FLabel>มีวัตถุค้างบนรางขณะไม้กั้นลง →</FLabel>
            <FNode kind="danger">ส่งสัญญาณเตือนล่วงหน้าให้ฝ่ายเดินรถไฟ เพื่อชะลอรถ</FNode>
          </div>
          <FArrow>↓</FArrow>
          <FNode kind="action">บันทึกเหตุการณ์ไว้เป็นหลักฐาน + รายงานจุดเสี่ยง</FNode>
        </div>
      </div>
      <Note style={{ marginTop: 12 }}>
        <b>หมายเหตุ:</b> การประสานกับระบบเดินรถไฟต้องทำร่วมกับ รฟท. ตามขั้นตอนของหน่วยงาน —
        สไลด์นี้แสดง "ตรรกะการป้องกัน" ที่ระบบเสนอ
      </Note>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 11 — SAFETY EVENT DETECTION
// ---------------------------------------------------------------------------

function Slide11() {
  const events = [
    { ic: '↩️', t: 'รถสวนเลน', d: 'เมื่อพบรถวิ่งสวนทิศทางในจุดที่กำหนด ระบบบันทึกเหตุการณ์ส่งให้เจ้าหน้าที่ review' },
    { ic: '🚶', t: 'รถเข้าพื้นที่ห้าม', d: 'ตีกรอบทางเท้า/พื้นที่ห้าม เมื่อมีรถเข้า ระบบบันทึกไว้ให้เจ้าหน้าที่พิจารณา' },
    { ic: '🏫', t: 'เขตโรงเรียน/รพ.', d: 'เฝ้าระวังรถเร็วในเขตเปราะบาง แจ้งเตือนเข้าหน้าจอเมือง ก่อนเกิดเหตุจริง' },
  ];
  return (
    <Slide num={11}>
      <Eyebrow>เหตุการณ์ความปลอดภัยอื่นๆ</Eyebrow>
      <Title size={32}>บันทึกเหตุเสี่ยง เพื่อให้เจ้าหน้าที่ "ตรวจสอบ" ไม่ใช่ระบบตัดสินเอง</Title>
      <div style={{ width: '100%', height: 240, marginTop: 16, borderRadius: 18, overflow: 'hidden', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, border: `1px solid ${C.surfaceSoft}` }}>
        <img src={`${IMG}/slide11-safety-events.png`} alt="ตัวอย่างเหตุการณ์ความปลอดภัย" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 14, flex: 1, alignContent: 'center' }}>
        {events.map((e, i) => (
          <Card key={i} style={{ padding: '16px 20px' }}>
            <CardIcon bg={C.alertSoft} color={C.alert}>{e.ic}</CardIcon>
            <CardTitle style={{ marginBottom: 5 }}>{e.t}</CardTitle>
            <CardBody style={{ fontSize: 13.5 }}>{e.d}</CardBody>
          </Card>
        ))}
      </div>
      <div style={{ marginTop: 10, background: C.alertSoft, border: `1px dashed ${C.alert}`, borderRadius: 10, padding: '8px 14px', fontSize: 12.5, color: C.alert, lineHeight: 1.5 }}>
        ⚠️ ระบบไม่ออกใบสั่งอัตโนมัติ · เจ้าหน้าที่เป็นผู้ตัดสินใจ — เพื่อให้สอดคล้องกับระเบียบการบังคับใช้กฎหมายของท้องถิ่น
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 12 — DASHBOARD (dark)
// ---------------------------------------------------------------------------

function Slide12() {
  return (
    <Slide num={12} dark>
      <Eyebrow dark color={C.accent}>หน้าจอสำหรับผู้บริหาร</Eyebrow>
      <Title dark>เห็นภาพรวมเมืองในจอเดียว</Title>
      <Lead dark style={{ marginTop: 8, maxWidth: 1080 }}>
        แผนที่เมืองแสดงระดับการจราจร (เขียว/เหลือง/แดง) · กราฟแนวโน้มรายวัน-รายสัปดาห์ ·
        รายการเหตุการณ์ความปลอดภัยล่าสุด — ส่งออกเป็นรายงานเพื่อใช้วางงบและตอบสภาได้
      </Lead>
      <div style={{ flex: 1, marginTop: 14, borderRadius: 16, overflow: 'hidden', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.45)' }}>
        <img src={`${IMG}/slide12-dashboard.png`} alt="Dashboard ระบบบริหารจราจร" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
      <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.7)', marginTop: 10 }}>
        ตัวเลขบนหน้าจอเป็นภาพประกอบ · ค่าจริงขึ้นกับข้อมูลของแต่ละพื้นที่
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 13 — DEMO VIDEO CLIP (uses existing 0518.mp4)
// ---------------------------------------------------------------------------

function Slide13() {
  const caps = [
    { ic: '📍', t: 'ระยะ + ทิศทาง', d: 'รู้ว่าวัตถุอยู่ไกลกี่เมตร · เลนไหน · ทิศใด — ทำ tracking ได้แม่นแม้รถซ้อนกัน' },
    { ic: '⚡', t: 'ความเร็วจริง', d: 'วัดความเร็วทันทีของทุกคัน · เป็นการวัดจากการสะท้อนคลื่น ไม่ใช่ประมาณจากภาพ' },
    { ic: '🚗', t: 'แยกประเภท', d: 'มอเตอร์ไซค์ · รถยนต์ · รถบรรทุก · คนเดิน — แยกได้จากขนาดและ pattern ความเร็ว' },
    { ic: '🌧️', t: 'ทุกสภาพอากาศ · 24 ชม.', d: 'คลื่นวิทยุทะลุฝน หมอก ฝุ่น · ไม่กระทบจากย้อนแสง · ทำงานกลางคืนแม่นเท่ากลางวัน' },
  ];
  return (
    <Slide num={13} dark>
      <Eyebrow dark color={C.accent}>คลิปจริง · ไม่ใช่ animation</Eyebrow>
      <Title dark size={32}>Traffic Radar (เรดาร์จราจร) — ดูทำงานจริง 26 วินาที</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, marginTop: 14, flex: 1, alignItems: 'center' }}>
        {/* LEFT — video 50% */}
        <div>
          <div style={{ borderRadius: 16, overflow: 'hidden', background: '#000', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <video
              controls
              poster={VIDEO_POSTER}
              preload="metadata"
              playsInline
              style={{ display: 'block', width: '100%', height: 'auto' }}
              aria-label="คลิปทดสอบ Traffic Radar"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
              <track kind="captions" srcLang="th" label="ภาษาไทย" />
              ขออภัย เบราว์เซอร์ของท่านไม่รองรับการแสดงผลวิดีโอ
            </video>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 10, lineHeight: 1.5 }}>
            ภาพจากการทดสอบจริงบนถนนสาธารณะ — กล่องสี่เหลี่ยมในคลิปคือวัตถุที่ระบบ track อยู่
            พร้อมตัวเลขความเร็ว/ระยะ ที่อัปเดตทุก frame
          </p>
        </div>

        {/* RIGHT — capability description */}
        <div>
          <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: 16, lineHeight: 1.65, marginBottom: 14 }}>
            เรดาร์จราจรมองด้วย <strong style={{ color: '#FFF' }}>คลื่นวิทยุ</strong> ไม่ใช่แสง —
            รู้พร้อมกันทั้ง <strong style={{ color: '#FFF' }}>ระยะ · ทิศทาง · ความเร็ว</strong> ของทุกวัตถุที่เคลื่อนไหว
            ทำให้ track รถทีละหลายสิบคันได้พร้อมกัน
          </p>
          <div style={{ display: 'grid', gridTemplateRows: 'repeat(4,1fr)', gap: 10 }}>
            {caps.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(186,117,23,0.25)', color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, flexShrink: 0 }}>{c.ic}</div>
                <div style={{ minWidth: 0 }}>
                  <h4 style={{ fontSize: 14.5, fontWeight: 700, color: '#FFF', marginBottom: 2, lineHeight: 1.45 }}>{c.t}</h4>
                  <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.5 }}>{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 14 — ROADMAP (3 phases)
// ---------------------------------------------------------------------------

function Slide14() {
  const phases = [
    { ph: 'ระยะที่ 1', t: 'นำร่อง 1 แยก / 1 จุดตัด', d: 'ติดตั้งจุดวิกฤตที่สุดก่อน เก็บข้อมูลจริง ปรับจูนให้เข้ากับพื้นที่', color: C.primary },
    { ph: 'ระยะที่ 2', t: 'จุดตัดรถไฟ + แยกหลัก', d: 'ขยายไปจุดเสี่ยงรองลงมา เชื่อมข้อมูลเข้าหน้าจอกลางของเมือง', color: C.accent },
    { ph: 'ระยะที่ 3', t: 'ขยายทั่วเขต', d: 'ครอบคลุมเส้นทางหลัก พร้อมข้อมูลสำหรับขอรับรองมาตรฐาน/รางวัลในอนาคต', color: C.success },
  ];
  return (
    <Slide num={14}>
      <Eyebrow>แผนการดำเนินงาน</Eyebrow>
      <Title>เริ่มจากจุดเดียว พิสูจน์ผล แล้วค่อยขยาย</Title>
      <div style={{ width: '100%', height: 230, marginTop: 14, borderRadius: 18, overflow: 'hidden', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, border: `1px solid ${C.surfaceSoft}` }}>
        <img src={`${IMG}/slide13-roadmap.png`} alt="Roadmap 3 ระยะ" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 16, flex: 1, alignContent: 'center' }}>
        {phases.map((p, i) => (
          <div key={i} style={{ background: '#FFF', borderTop: `5px solid ${p.color}`, borderRadius: 14, padding: '18px 22px', border: `1px solid ${C.surfaceSoft}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, letterSpacing: 1, marginBottom: 4 }}>{p.ph}</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: C.primaryDeep, marginBottom: 6, lineHeight: 1.4 }}>{p.t}</h3>
            <p style={{ fontSize: 14, color: C.text, lineHeight: 1.55 }}>{p.d}</p>
          </div>
        ))}
      </div>
      <Note style={{ marginTop: 12 }}>
        <b>ข้อดีของการแบ่งเฟส:</b> ใช้งบทีละก้อนตามปีงบประมาณ ลดความเสี่ยง และเห็นผลก่อนตัดสินใจขยาย
      </Note>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 15 — IMPACT + CTA (dark navy)
// ---------------------------------------------------------------------------

function Slide15() {
  const benefits = [
    { t: 'ลดความเสี่ยงจุดตัดรถไฟ', d: 'ออกแบบเพื่อกันเหตุรถติดคร่อมราง', tag: 'เป้าหมายการออกแบบ' },
    { t: 'บรรเทารถติด', d: 'ไฟปรับตามรถจริงในชั่วโมงเร่งด่วน', tag: 'ผลขึ้นกับพื้นที่' },
    { t: 'มีข้อมูลในมือ', d: 'ใช้วางแผน ขออนุมัติงบ ตอบสภา และต่อยอดรางวัลในอนาคต', tag: null },
  ];
  return (
    <Slide num={15} navy>
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 32, alignItems: 'center', height: '100%' }}>
        <div>
          <Eyebrow color={C.accent}>ผลลัพธ์ที่ตั้งเป้า</Eyebrow>
          <Title dark size={38}>ถนนที่ลื่นไหลขึ้น และปลอดภัยขึ้น สำหรับทุกชีวิต</Title>
          <div style={{ display: 'grid', gridTemplateRows: 'repeat(3,1fr)', gap: 12, marginTop: 18 }}>
            {benefits.map((b, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 14, padding: '14px 18px' }}>
                <h3 style={{ color: '#FFF', fontSize: 17, fontWeight: 700, marginBottom: 4, lineHeight: 1.45 }}>{b.t}</h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13.5, lineHeight: 1.55 }}>
                  {b.d}
                  {b.tag && (
                    <span style={{ display: 'inline-block', marginLeft: 8, fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: C.accentSoft, color: C.accent, letterSpacing: 0.5 }}>{b.tag}</span>
                  )}
                </p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 14, padding: '14px 18px' }}>
            <p style={{ color: '#FFF', fontSize: 16, fontWeight: 700, lineHeight: 1.55, marginBottom: 4 }}>
              ร่วมสร้างเมืองที่ลื่นไหล และปลอดภัยสำหรับทุกชีวิต
            </p>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13.5, lineHeight: 1.55 }}>
              ขั้นถัดไป: นัดสำรวจจุดวิกฤต 1 จุด เพื่อออกแบบนำร่องร่วมกัน
            </p>
          </div>
        </div>
        <div style={{ width: '100%', height: '88%', borderRadius: 18, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.45)' }}>
          <img src={`${IMG}/slide14-impact.png`} alt="ผลลัพธ์เมืองปลอดภัย" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
    '1 · 🚨 Pain · ถนนติดและจุดตัดรถไฟอันตราย',
    '2 · ✨ Solution · ระบบเดียว แก้ 3 เรื่อง',
    '3 · 🚨 Pain · ไฟแดงตั้งเวลาตายตัว',
    '4 · 🚨 Pain · จุดตัดรถไฟ รถติดคร่อมราง',
    '5 · 📦 Hardware · Radar + CCTV ทำงานคู่กัน',
    '6 · 🔧 How · 3 ขั้นตอน เซนเซอร์ → ข้อมูล',
    '7 · 🔧 How · Edge processing ที่เสาไฟ',
    '8 · 🏆 Why us · เปรียบเทียบ CCTV เดี่ยว vs Combo',
    '9 · 🔧 How · ไฟจราจรอัตโนมัติ Flow',
    '10 · 🛡️ Coverage · ป้องกันรถติดคร่อมราง Flow',
    '11 · 🛡️ Coverage · เหตุการณ์ความปลอดภัยอื่นๆ',
    '12 · 📊 Demo · Dashboard ผู้บริหาร',
    '13 · 📊 Demo · คลิป Radar จริง 26 วินาที',
    '14 · 💵 Plans · Roadmap 3 ระยะ',
    '15 · 🤝 Close · ผลลัพธ์ + ขั้นต่อไป',
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
        <div style={{ position: 'absolute', top: 44, right: 16, background: '#FFF', color: C.text, borderRadius: 8, boxShadow: '0 10px 30px rgba(0,0,0,.2)', padding: 8, maxHeight: 'calc(100vh - 110px)', overflowY: 'auto', minWidth: 340, zIndex: 1100 }}>
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
// ScrollDots — vertical dot indicator
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
        position: 'fixed',
        right: 14,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        zIndex: 999,
        background: 'rgba(0,0,0,0.35)',
        padding: '12px 8px',
        borderRadius: 100,
        backdropFilter: 'blur(8px)',
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
              display: 'block',
              width: isActive ? 12 : 8,
              height: isActive ? 12 : 8,
              padding: 0,
              borderRadius: '50%',
              background: isActive ? '#FFF' : 'rgba(255,255,255,0.45)',
              border: isActive ? `2px solid ${C.primaryHover}` : '1px solid rgba(255,255,255,0.6)',
              transition: 'all .2s ease',
              cursor: 'pointer',
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

export default function SmartTraffic() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Smart Traffic · Pitch Deck';
    return () => { document.title = prevTitle; };
  }, []);

  const slides = [
    Slide01, Slide02, Slide03, Slide04, Slide05,
    Slide06, Slide07, Slide08, Slide09, Slide10,
    Slide11, Slide12, Slide13, Slide14, Slide15,
  ];
  return (
    <>
      <DeckStyles />
      <Toolbar />
      <ScrollDots count={slides.length} />
      <div className="deck-root">
        {slides.map((S, i) => (
          <div key={i} id={`slide-${i + 1}`}>
            <ScaledSlide>
              <S />
            </ScaledSlide>
          </div>
        ))}
      </div>
    </>
  );
}
