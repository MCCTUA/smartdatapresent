import React, { useEffect, useState, useRef } from 'react';
import RotateHint from '../../components/RotateHint';

// ---------------------------------------------------------------------------
// solar/PitchDeck.jsx — Solar Street Light Sales Pitch Deck (17 slides · 1280×720)
// Design: Solar Sun palette (Amber #D97706 + Deep Navy #0B2D48 + Cream #FFFBEB)
// Font: Sarabun
// Audience: ผู้รับเหมา/Trading + อบต./เทศบาล (mixed framing)
// No dashboard, no app — pure hardware story (Pain → 4 รุ่น → Standards → ROI → CTA)
// Source: infomation/Solar_Street_Light/ (internal product spec)
// ---------------------------------------------------------------------------

const C = {
  primary: '#D97706',
  primaryHover: '#F59E0B',
  primaryDeep: '#0B2D48',
  primaryDeepEnd: '#1E3A5F',
  primarySoft: '#FEF3C7',
  surface: '#FFFBEB',
  surfaceSoft: '#FDF6D1',
  text: '#1F2937',
  textMuted: '#6B7280',
  accent: '#0EA5E9',
  accentSoft: '#E0F2FE',
  alert: '#DC2626',
  alertSoft: '#FEE2E2',
  success: '#16A34A',
  successSoft: '#DCFCE7',
};

const IMG = 'images/solar';
const TOTAL_SLIDES = 17;

// ---------------------------------------------------------------------------
// Slide shell — fixed 1280×720
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
        background: dark ? `linear-gradient(135deg, ${C.primaryDeep} 0%, ${C.primaryDeepEnd} 100%)` : C.surface,
        color: dark ? '#FFF' : C.text,
        overflow: 'hidden',
        fontFamily: 'Sarabun, sans-serif',
        flexShrink: 0,
      }}
    >
      {!dark && (
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
            color: dark ? 'rgba(255,255,255,0.7)' : C.textMuted,
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
          color: dark ? 'rgba(255,255,255,0.7)' : C.textMuted,
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
  const col = color || (alert ? C.alert : accent ? C.accent : dark ? '#FDE68A' : C.primary);
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
        fontSize: 21,
        fontWeight: 400,
        lineHeight: 1.55,
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

function CardIcon({ children }) {
  return <span style={{ fontSize: 36, lineHeight: 1, marginBottom: 12, display: 'block' }}>{children}</span>;
}

function CardTitle({ dark, children, style }) {
  return (
    <h3
      style={{
        fontSize: 20,
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

// ---------------------------------------------------------------------------
// Solar Cycle Diagram (Day · Night · Rain)
// ---------------------------------------------------------------------------

function SolarCycleDiagram() {
  return (
    <svg viewBox="0 0 900 460" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: '100%', fontFamily: 'Sarabun, sans-serif' }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-solar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={C.primary} />
        </marker>
        <linearGradient id="grad-solar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.primary} />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>

      <text x="20" y="36" fontSize="12" fontWeight="600" fill={C.textMuted} letterSpacing="1.5">DAY · กลางวัน</text>
      <text x="20" y="230" fontSize="12" fontWeight="600" fill={C.textMuted} letterSpacing="1.5">STORE · เก็บพลังงาน</text>
      <text x="20" y="410" fontSize="12" fontWeight="600" fill={C.textMuted} letterSpacing="1.5">NIGHT · กลางคืน</text>

      {/* Top row — Day cycle */}
      {[
        { x: 130, label: '☀️ แผงโซลาร์', sub: 'รับแสง 6-8 ชม./วัน', detail: 'ประสิทธิภาพสูง · ทนสภาพอากาศไทย' },
        { x: 380, label: '⚡ ชาร์จเข้าระบบ', sub: 'อัตโนมัติทุกวัน', detail: 'ไม่ต้องเดินสายไฟ · ไม่มีค่าไฟ' },
        { x: 630, label: '🛡️ IP66 · ทนทาน', sub: 'อลูมิเนียมกันน้ำ', detail: 'พายุ · ฝน · แดดจัด · ใช้ได้ทั่วประเทศ' },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="56" width="200" height="120" rx="14" fill="#FFF" stroke={C.primary} strokeWidth="1.5" />
          <text x={s.x + 100} y="94" textAnchor="middle" fontSize="22" fontWeight="600" fill={C.text}>{s.label}</text>
          <text x={s.x + 100} y="124" textAnchor="middle" fontSize="14" fontWeight="600" fill={C.primary}>{s.sub}</text>
          <text x={s.x + 100} y="148" textAnchor="middle" fontSize="12" fill={C.textMuted}>{s.detail}</text>
          <line x1={s.x + 100} y1="178" x2={s.x + 100} y2="232" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-solar)" />
        </g>
      ))}

      {/* Middle bar — Battery LiFePO4 */}
      <rect x="130" y="232" width="700" height="100" rx="14" fill="url(#grad-solar)" />
      <text x="480" y="270" textAnchor="middle" fontSize="20" fontWeight="700" fill="#FFF">🔋 แบตเตอรี่ LiFePO4 · 2,000 รอบการชาร์จ</text>
      <text x="480" y="296" textAnchor="middle" fontSize="13" fill="#FFF" opacity="0.95">เก็บพลังงานสำรองได้ 5-7 คืน · ใช้งานต่อเนื่องแม้ฝนตกหลายวัน</text>
      <text x="480" y="316" textAnchor="middle" fontSize="11" fill="#FFF" opacity="0.85">อายุการใช้งาน 5+ ปี · ถอดเปลี่ยนได้ง่าย ไม่ต้องรื้อทั้งเสา</text>

      <line x1="220" y1="332" x2="220" y2="385" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-solar)" />
      <line x1="480" y1="332" x2="480" y2="385" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-solar)" />
      <line x1="740" y1="332" x2="740" y2="385" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-solar)" />

      {/* Bottom row — Night output */}
      {[
        { x: 130, label: '💡 LED auto-on', sub: 'พอตกค่ำ · ไม่ต้องสั่ง' },
        { x: 380, label: '⏰ หรี่ไฟกลางดึก', sub: 'ประหยัดพลังงาน · สว่างทั้งคืน' },
        { x: 630, label: '🌅 auto-off เช้า', sub: 'พระอาทิตย์ขึ้น · ปิดเอง' },
      ].map((a, i) => (
        <g key={i}>
          <rect x={a.x} y="385" width="200" height="60" rx="12" fill={C.primarySoft} stroke={C.primary} strokeWidth="1" strokeDasharray="3,3" />
          <text x={a.x + 100} y="411" textAnchor="middle" fontSize="15" fontWeight="600" fill={C.text}>{a.label}</text>
          <text x={a.x + 100} y="431" textAnchor="middle" fontSize="12" fill={C.textMuted}>{a.sub}</text>
        </g>
      ))}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Deck wrapper — viewport-fit scaling + print CSS
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

      /* margin:auto centres the wrapper; the inner .slide-scale must sit at top-left (its
         layout box stays 1280px wide even when transform-scaled) — DO NOT flex-center it,
         or the oversized box overflows left and the slide renders off the left edge */
      .slide-wrapper { margin: 0 auto 24px; overflow: hidden; }

      /* Mobile — keep right-edge nav dots from overlapping the slide on narrow screens,
         and let the dot column scroll instead of overflowing when there are many slides */
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
  // Compute the fit-to-viewport scale. Used for the initial state too, so the first paint
  // is already correctly sized — never a full 1280px canvas (which on iOS Safari left the
  // page horizontally scrolled: nav dots off-screen, slide shoved into the left half).
  // Measure the LAYOUT viewport (innerWidth/innerHeight), never visualViewport. On mobile,
  // visualViewport changes every time the address bar slides in/out during scroll and on
  // pinch-zoom — recomputing there made the slide "breathe" while scrolling (auto-advancing
  // the deck) and fight the user's pinch-zoom. The layout viewport is stable through both,
  // so the slide holds still and the browser's native pinch-zoom can magnify it for detail.
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
    // Only re-fit when the viewport WIDTH changes (orientation flip or desktop window resize).
    // Height-only changes come from the mobile address bar sliding in/out as you scroll —
    // recomputing there is what made the slide shrink/grow and jump the deck to another page.
    const apply = () => {
      // Don't refit while the user is pinch-zoomed. iOS Safari reports a changed
      // window.innerWidth during a pinch gesture, which slips past the width guard
      // below and resizes the slide mid-zoom — the slide visibly jumps and fights
      // the pinch. Skip refits unless the visual viewport is back at 1:1.
      if (window.visualViewport && Math.abs(window.visualViewport.scale - 1) > 0.01) return;
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

// ---------------------------------------------------------------------------
// SLIDE 1 — HERO (Pain opening · dual audience)
// ---------------------------------------------------------------------------

function Slide01() {
  return (
    <Slide num={1} dark>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 48, alignItems: 'center', height: '100%' }}>
        <div>
          <Eyebrow dark>โซลาร์ไฟถนน สำหรับงานโครงการ อบต.</Eyebrow>
          <h1 style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.4, color: '#FFF', letterSpacing: -0.5 }}>
            ไฟถนนดับครึ่งคืน<br />
            ผู้รับเหมาเจ็บตัวซ้ำ<br />
            <span style={{ color: '#FDE68A' }}>อบต. รับเรื่องร้องเรียนไม่จบ</span>
          </h1>
          <Lead dark style={{ marginTop: 24 }}>
            งานไฟถนนที่เคย "ทำเสร็จส่งมอบ" กลับกลายเป็นปัญหายาว — มาตรฐานไม่ผ่าน
            ฝนตกไฟดับ ของพังก่อนเวลา และไม่มีใครมาแก้ — เรารวมทั้ง 4 รุ่นไว้ที่นี่
            เพื่อให้ทั้งสองฝั่งวางใจตั้งแต่ส่งมอบจนหมดอายุ
          </Lead>
        </div>
        <div style={{ width: '100%', aspectRatio: '4/5', borderRadius: 18, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.45)' }}>
          <img src={`${IMG}/IMG_2644.jpeg`} alt="Solar Street Light installation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 2 — 4 Pain Points (dual audience)
// ---------------------------------------------------------------------------

function Slide02() {
  const pains = [
    { icon: '📐', title: 'มาตรฐาน อบต. ต้องผ่านเป๊ะ', desc: 'ค่า lumen · lux · uniformity ต้องตรงตามข้อกำหนด ถ้าไม่ผ่านส่งมอบไม่ได้ — ผู้รับเหมาต้องตามแก้เอง อบต. เสียเวลาตอบสภาฯ' },
    { icon: '⚠️', title: 'ของออนไลน์สเปคไม่ตรงกระดาษ', desc: 'สินค้าราคาถูกจากตลาดทั่วไป มักไม่ได้มาตรฐานตามที่ระบุไว้ — กว่าจะรู้ตัวก็หลังติดตั้งเสร็จ พังก่อนหมดประกัน' },
    { icon: '🌧️', title: 'ฝนตก 5-7 วัน ไฟดับทั้งหมู่บ้าน', desc: 'ระบบแบตเตอรี่เก่ามักจุน้อย ฝนหลายวันไฟไม่ติด ชุมชนร้องเรียน — อบต. ต้องเรียกผู้รับเหมามาแก้ครั้งแล้วครั้งเล่า' },
    { icon: '🤝', title: 'ไม่มีทีมออกแบบแสง · ไม่มีใครดูแลต่อ', desc: 'ผู้รับเหมาต้องเดาเองว่ามาตรฐานอบต. ใช้สเปคไหน — และเมื่อของพังหลังส่งมอบ ไม่มีใครรับสาย' },
  ];
  return (
    <Slide num={2}>
      <Eyebrow alert>ปัญหาที่ทั้ง 2 ฝั่งเจอจริง</Eyebrow>
      <Title>4 เรื่องที่ทำให้โครงการไฟถนน "ส่งมอบไม่จบ"</Title>
      <Lead style={{ marginTop: 12, maxWidth: 1020 }}>
        ทั้งผู้รับเหมาและ อบต. ต่างรู้ดี — งานไฟถนนไม่ได้จบที่วันส่งมอบ
        แต่จบเมื่อ "ไม่มีเรื่องร้องเรียน" — และนั่นคือจุดที่ของถูกราคาทำให้เสียหายมากที่สุด
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24, flex: 1, alignContent: 'center' }}>
        {pains.map((p, i) => (
          <Card key={i}>
            <CardIcon>{p.icon}</CardIcon>
            <CardTitle>{p.title}</CardTitle>
            <CardBody>{p.desc}</CardBody>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 3 — Solution intro (ทางออกที่ตอบทั้งสองฝั่ง)
// ---------------------------------------------------------------------------

function Slide03() {
  return (
    <Slide num={3}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Eyebrow>ทางออกที่ตอบทั้งสองฝั่ง</Eyebrow>
        <Title size={42}>
          Solar All-in-One ที่ผ่านมาตรฐาน อบต.<br />
          แต่ติดตั้งได้ใน <span style={{ color: C.primary }}>5 นาทีต่อต้น</span>
        </Title>
        <Lead style={{ marginTop: 18, maxWidth: 1040 }}>
          ไม่ต้องเลือกระหว่าง "ของดี" กับ "ของที่ส่งงานทัน" — โคมโซลาร์ของเรา
          ทดสอบผ่านมาตรฐาน <strong style={{ color: C.primary }}>มอก. 1955-2551</strong> และ
          <strong style={{ color: C.primary }}> LM-79/LM-80</strong> มาแล้ว
          พร้อมทีมออกแบบแสงให้ตรงข้อกำหนดของแต่ละ อบต.
        </Lead>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 32 }}>
          {[
            { ic: '🏛️', t: 'สำหรับ อบต./เทศบาล', d: 'ผ่านมาตรฐานทุกรุ่น · ค่าไฟ 0 บาท · ลดร้องเรียนไฟดับ' },
            { ic: '🔧', t: 'สำหรับผู้รับเหมา', d: 'ติดตั้งเร็ว 5 นาที · ไม่ต้องขุดสาย · ส่งงานทันกำหนด' },
            { ic: '🏘️', t: 'สำหรับชุมชน', d: 'สว่างทั่วถึง · ปลอดภัยกลางคืน · ใช้งาน 8-14 ชม./คืน' },
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

// ---------------------------------------------------------------------------
// SLIDE 4 — How it works (Solar cycle diagram)
// ---------------------------------------------------------------------------

function Slide04() {
  return (
    <Slide num={4}>
      <Eyebrow>ระบบทำงานอย่างไร</Eyebrow>
      <Title size={36}>กลางวันชาร์จ · กลางคืนสว่าง · ฝนตก 7 วันก็ยังติด</Title>
      <Lead style={{ marginTop: 6, marginBottom: 4, fontSize: 17 }}>
        ระบบในเสาเดียว — แผงโซลาร์ + แบต LiFePO4 + LED ทำงานอัตโนมัติ
        ไม่ต้องเดินสายไฟ ไม่มีค่าไฟ ไม่ต้องมีคนเปิด-ปิด
      </Lead>
      <div style={{ marginTop: 10, padding: '12px 18px', background: '#FFF', borderRadius: 18, border: `1px solid ${C.surfaceSoft}`, flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <SolarCycleDiagram />
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 5 — 4 Products overview (grid 2x2)
// ---------------------------------------------------------------------------

function ProductCard({ img, badge, badgeBg, title, model, sub, bullets }) {
  return (
    <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 16, padding: 14, display: 'flex', gap: 14, alignItems: 'stretch', minHeight: 0 }}>
      <div style={{ width: 130, flexShrink: 0, background: C.primarySoft, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8 }}>
        <img src={img} alt={title} style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }} />
      </div>
      <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <span style={{ display: 'inline-block', alignSelf: 'flex-start', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100, background: badgeBg, color: '#FFF', marginBottom: 5 }}>{badge}</span>
        <h3 style={{ fontSize: 17, fontWeight: 800, color: C.primaryDeep, lineHeight: 1.4, marginBottom: 1 }}>{title}</h3>
        <div style={{ fontSize: 12, color: C.primary, fontWeight: 600, marginBottom: 4 }}>{model}</div>
        <p style={{ fontSize: 12.5, color: C.textMuted, lineHeight: 1.5, marginBottom: 4 }}>{sub}</p>
        <div style={{ fontSize: 11.5, color: C.text, lineHeight: 1.5 }}>
          {bullets.map((b, i) => <div key={i}>• {b}</div>)}
        </div>
      </div>
    </div>
  );
}

function Slide05() {
  const products = [
    {
      img: `${IMG}/product_sa2a01.webp`,
      badge: 'ALL-IN-ONE',
      badgeBg: C.primary,
      title: 'SA-2A01',
      model: '60-120W · 6,000-15,000 LM',
      sub: 'โคมรวมแบบ All-in-One ดีไซน์บางเฉียบ ติดตั้งง่าย',
      bullets: ['ถนนหลัก · หมู่บ้านจัดสรร', 'สูง 6-10 ม. · ระยะ 20-40 ม.'],
    },
    {
      img: `${IMG}/product_sa2a02.webp`,
      badge: 'ALL-IN-ONE',
      badgeBg: '#B45309',
      title: 'SA-2A02',
      model: '40-160W · 4,000-18,000 LM',
      sub: 'ความยืดหยุ่นสูง โมดูลาร์ ระบายความร้อนดี',
      bullets: ['ถนนสายหลัก · พื้นที่กว้าง', 'สูง 6-12 ม. · 180 lm/W'],
    },
    {
      img: `${IMG}/product_sk7a13.webp`,
      badge: 'SPLIT TYPE',
      badgeBg: C.primaryDeep,
      title: 'SK-7A13',
      model: '60-85W · 3,400-4,800 LM',
      sub: 'แบบแยกส่วน ปรับมุมแผงได้ +15% efficiency',
      bullets: ['พื้นที่ทิศแสงจำกัด · มีเงาบัง', 'สูง 5-8 ม. · ติดตั้งยืดหยุ่น'],
    },
    {
      img: `${IMG}/product_sk7a14.webp`,
      badge: 'INTEGRATED',
      badgeBg: C.accent,
      title: 'SK-7A14',
      model: '60-100W · 4,100-9,000 LM',
      sub: 'ดีไซน์เรือใบ ยกระดับภาพลักษณ์โครงการ',
      bullets: ['รีสอร์ท · ชายหาด · ทางเดินริมน้ำ', 'marine-grade · 200 lm/W'],
    },
  ];
  return (
    <Slide num={5}>
      <Eyebrow accent>เลือกได้ทุกสภาพถนน</Eyebrow>
      <Title>4 รุ่น สำหรับทุกประเภทโครงการ</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        ทั้ง 4 รุ่นใช้แบต LiFePO4 และผ่านมาตรฐานเดียวกัน — เปลี่ยนแค่ดีไซน์
        และสเปคให้เหมาะกับลักษณะถนนและงบประมาณของแต่ละโครงการ
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16, flex: 1, alignContent: 'center' }}>
        {products.map((p, i) => <ProductCard key={i} {...p} />)}
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 6 — SA-2A01 detail
// ---------------------------------------------------------------------------

function ProductDetailSlide({ num, img, badge, badgeBg, title, model, headline, specs, useCase, highlight }) {
  return (
    <Slide num={num}>
      <Eyebrow accent>{badge}</Eyebrow>
      <Title size={36}>{title} · <span style={{ color: C.primary }}>{model}</span></Title>
      <Lead style={{ marginTop: 8, maxWidth: 1040, fontSize: 18 }}>{headline}</Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 24, marginTop: 18, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
        <div style={{ background: C.primarySoft, borderRadius: 18, padding: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={img} alt={title} style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {specs.map((s, i) => (
              <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: C.textMuted, marginBottom: 3, letterSpacing: 0.5 }}>{s.label}</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: C.primaryDeep, lineHeight: 1.35 }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 12, padding: '12px 16px' }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: C.primary, marginBottom: 6, letterSpacing: 0.5 }}>เหมาะกับโครงการ</div>
            <div style={{ fontSize: 14.5, color: C.text, lineHeight: 1.55 }}>{useCase}</div>
          </div>
          <div style={{ background: badgeBg, color: '#FFF', borderRadius: 12, padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>⭐</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>จุดเด่นสำหรับผู้รับเหมา</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.5, opacity: 0.95 }}>{highlight}</div>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

function Slide06() {
  return (
    <ProductDetailSlide
      num={6}
      img={`${IMG}/product_sa2a01.webp`}
      badge="รุ่นที่ 1 · All-in-One"
      badgeBg={C.primary}
      title="SA-2A01"
      model="60W-120W"
      headline="โคมรวมแบบ All-in-One ดีไซน์บางเฉียบ — เหมาะกับถนนหลัก ทางหลวงและพื้นที่โรงงานอุตสาหกรรม"
      specs={[
        { label: 'กำลังไฟแผงโซลาร์', value: '60-120W' },
        { label: 'ความสว่าง', value: '6,000-15,000 LM' },
        { label: 'แบตเตอรี่ LiFePO4', value: '240-640 Wh' },
        { label: 'ความสูงติดตั้ง', value: '6-10 เมตร' },
      ]}
      useCase="ถนนสายหลักของ อบต. · หมู่บ้านจัดสรร · ทางหลวงเข้าโรงงาน · พื้นที่ที่ต้องการดีไซน์เรียบหรู"
      highlight="ติดตั้งง่ายและรวดเร็วภายใน 5 นาที ประหยัดเวลา 60% · ไม่ต้องเดินสายไฟ · โครงสร้างอลูมิเนียมกันน้ำ IP66 ทนทานต่อสภาพอากาศชายฝั่งและเขตร้อน"
    />
  );
}

// ---------------------------------------------------------------------------
// SLIDE 7 — SA-2A02 detail
// ---------------------------------------------------------------------------

function Slide07() {
  return (
    <ProductDetailSlide
      num={7}
      img={`${IMG}/product_sa2a02.webp`}
      badge="รุ่นที่ 2 · All-in-One"
      badgeBg="#B45309"
      title="SA-2A02"
      model="40W-160W"
      headline="ออกแบบโมดูลาร์ ปรับเปลี่ยนได้ตามโครงการ ระบบความเสถียรคู่ — เหมาะกับถนนกว้างและพื้นที่ขนาดใหญ่"
      specs={[
        { label: 'กำลังไฟแผงโซลาร์', value: '40-160W' },
        { label: 'ความสว่าง', value: '4,000-18,000 LM' },
        { label: 'แบตเตอรี่ LiFePO4', value: '160-640 Wh' },
        { label: 'ประสิทธิภาพ LED', value: '180 lm/W' },
      ]}
      useCase="ถนนสายหลัก · พื้นที่กว้างต้องการความสว่างสูง · เขตอุตสาหกรรม · สภาพอากาศหนัก"
      highlight="น้ำหนักเบา ขนส่งง่าย ประหยัดค่าแรงติดตั้ง · แบตเตอรี่ถอดเปลี่ยนได้ง่าย บำรุงรักษาสะดวก · ระบายความร้อนดีเยี่ยม เหมาะสภาพอากาศไทย"
    />
  );
}

// ---------------------------------------------------------------------------
// SLIDE 8 — SK-7A13 detail
// ---------------------------------------------------------------------------

function Slide08() {
  return (
    <ProductDetailSlide
      num={8}
      img={`${IMG}/product_sk7a13.webp`}
      badge="รุ่นที่ 3 · Split Type"
      badgeBg={C.primaryDeep}
      title="SK-7A13"
      model="60W-85W"
      headline="โคมไฟแบบแยกส่วน (Split Type) ปรับมุมแผงโซลาร์ได้อิสระ — เหมาะกับพื้นที่ทิศแสงจำกัด"
      specs={[
        { label: 'กำลังไฟแผงโซลาร์', value: '60-85W' },
        { label: 'ความสว่าง', value: '3,400-4,800 LM' },
        { label: 'แบตเตอรี่ LiFePO4', value: '192-256 Wh' },
        { label: 'ความสูงติดตั้ง', value: '5-8 เมตร' },
      ]}
      useCase="พื้นที่ที่มีเงาบัง · ทิศแสงแดดไม่เหมาะ · ใต้ร่มไม้ใหญ่ · บริเวณที่ต้องปรับทิศแผงให้รับแสงเต็มที่"
      highlight="แผงโซลาร์ปรับทิศทางได้อิสระ เพิ่มประสิทธิภาพรับพลังงาน +15% · ตอบโจทย์พื้นที่ที่ All-in-One ติดตั้งไม่ได้ผลดี"
    />
  );
}

// ---------------------------------------------------------------------------
// SLIDE 9 — SK-7A14 detail
// ---------------------------------------------------------------------------

function Slide09() {
  return (
    <ProductDetailSlide
      num={9}
      img={`${IMG}/product_sk7a14.webp`}
      badge="รุ่นที่ 4 · Integrated"
      badgeBg={C.accent}
      title="SK-7A14"
      model="60W-100W"
      headline="ดีไซน์เรือใบ ยกระดับภาพลักษณ์โครงการ — เหมาะกับรีสอร์ท ถนนชายทะเล และสวนสาธารณะระดับพรีเมียม"
      specs={[
        { label: 'กำลังไฟแผงโซลาร์', value: '60-100W' },
        { label: 'ความสว่าง', value: '4,100-9,000 LM' },
        { label: 'แบตเตอรี่ LiFePO4', value: '192-384 Wh' },
        { label: 'ประสิทธิภาพ LED', value: '200 lm/W' },
      ]}
      useCase="รีสอร์ท · ถนนเลียบชายหาด · สวนสาธารณะ · ทางเดินริมน้ำ · โครงการที่ต้องการดีไซน์โดดเด่น"
      highlight="โครงสร้างอลูมิเนียมเกรดมารีน ทนการกัดกร่อนน้ำเค็ม · แผงโซลาร์ปรับมุมได้ · ประสิทธิภาพแสง 200 lm/W สูงสุดในไลน์"
    />
  );
}

// ---------------------------------------------------------------------------
// SLIDE 10 — Comparison Table (4 models)
// ---------------------------------------------------------------------------

function Slide10() {
  const rows = [
    { f: 'ประเภท', a: 'All-in-One', b: 'All-in-One', c: 'Split Type', d: 'Integrated' },
    { f: 'จุดเด่น', a: 'บางเฉียบ · ติดตั้งง่าย', b: 'แข็งแรง · ระบายร้อนดี', c: 'ปรับมุมแผงได้', d: 'ดีไซน์เรือใบ' },
    { f: 'เหมาะกับ', a: 'ถนนโครงการ · หมู่บ้าน', b: 'ถนนหลัก · สว่างสูง', c: 'ทิศแสงจำกัด · เงาบัง', d: 'รีสอร์ท · ชายทะเล' },
    { f: 'ความสว่าง', a: '20-30 Lux', b: '30-50 Lux', c: '20-30 Lux', d: '15-25 Lux' },
    { f: 'แบต LiFePO4', a: '100-150 Ah', b: '150-200 Ah', c: '80-120 Ah', d: '100-150 Ah' },
    { f: 'ใช้งานต่อคืน', a: '8-12 ชม.', b: '10-14 ชม.', c: '8-12 ชม.', d: '8-12 ชม.' },
    { f: 'มาตรฐาน อบต.', a: '✓ ผ่าน', b: '✓ ผ่าน', c: '✓ ผ่าน', d: '✓ ผ่าน' },
  ];
  const headers = [
    { sub: 'All in One', name: 'SA-2A01', bg: C.primary },
    { sub: 'All in One', name: 'SA-2A02', bg: '#B45309' },
    { sub: 'Split Type', name: 'SK-7A13', bg: C.primaryDeep },
    { sub: 'Integrated', name: 'SK-7A14', bg: C.accent },
  ];
  return (
    <Slide num={10} dark>
      <Eyebrow dark>เปรียบเทียบ 4 รุ่น</Eyebrow>
      <Title dark size={34}>เลือกรุ่นที่เหมาะกับโครงการของท่าน</Title>
      <Lead dark style={{ marginTop: 8, marginBottom: 14, fontSize: 16 }}>
        ทุกรุ่นผ่านมาตรฐาน อบต. — ต่างกันที่ดีไซน์ ความสว่าง และความเหมาะสมกับสภาพพื้นที่
      </Lead>
      <div style={{ background: '#FFF', borderRadius: 16, overflow: 'hidden', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr 1fr 1fr' }}>
          <div style={{ background: C.primaryDeep, color: '#FFF', padding: '12px 14px', fontSize: 13, fontWeight: 700 }}>คุณสมบัติ</div>
          {headers.map((h, i) => (
            <div key={i} style={{ background: h.bg, color: '#FFF', padding: '8px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, opacity: 0.85, lineHeight: 1.4 }}>{h.sub}</div>
              <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.4 }}>{h.name}</div>
            </div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr 1fr 1fr', borderTop: `1px solid ${C.surfaceSoft}` }}>
            <div style={{ padding: '10px 14px', fontSize: 12.5, fontWeight: 700, color: C.primary, background: C.primarySoft, lineHeight: 1.5 }}>{r.f}</div>
            <div style={{ padding: '10px 14px', fontSize: 12.5, color: C.text, lineHeight: 1.5, textAlign: 'center' }}>{r.a}</div>
            <div style={{ padding: '10px 14px', fontSize: 12.5, color: C.text, lineHeight: 1.5, textAlign: 'center' }}>{r.b}</div>
            <div style={{ padding: '10px 14px', fontSize: 12.5, color: C.text, lineHeight: 1.5, textAlign: 'center' }}>{r.c}</div>
            <div style={{ padding: '10px 14px', fontSize: 12.5, color: C.text, lineHeight: 1.5, textAlign: 'center' }}>{r.d}</div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 11 — Performance vs Standard (4 big stats)
// ---------------------------------------------------------------------------

function Slide11() {
  const stats = [
    { n: '77.5%', l: 'ประหยัดพลังงาน', d: 'ลดจาก 1,920W เหลือ 450W เทียบโคมไฟถนน LED ทั่วไป', col: C.primary },
    { n: '+100%', l: 'สว่างเกินมาตรฐาน', d: 'ค่าความสว่างเฉลี่ย 40 ลักซ์ สูงกว่ามาตรฐาน อบต. 100%', col: '#B45309' },
    { n: '+50%', l: 'สม่ำเสมอ Uniformity', d: 'ค่า Uniformity ≥ 0.3 สูงกว่ามาตรฐาน 50% — แสงทั่วถึง ไม่มีจุดมืด', col: C.accent },
    { n: '200 lm/W', l: 'LED ประสิทธิภาพสูง', d: 'เทคโนโลยี LED คุณภาพสูง ออกแบบตามข้อกำหนดสากล', col: C.success },
  ];
  return (
    <Slide num={11}>
      <Eyebrow>ผลที่วัดได้</Eyebrow>
      <Title size={36}>เกินมาตรฐาน อบต. ในทุกตัวชี้วัด</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        ตัวเลขจากการทดสอบในแล็บมาตรฐาน — ผู้รับเหมาเอาไปใช้ตอบ TOR ได้
        อบต. เอาไปใช้ตอบสภาฯ ได้ ทุกตัวเลขมีเอกสารรับรอง
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 18, marginTop: 24, flex: 1, alignContent: 'center' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, padding: '22px 26px', display: 'flex', gap: 18, alignItems: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 800, color: s.col, lineHeight: 1.1, flexShrink: 0, minWidth: 140 }}>{s.n}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.primaryDeep, marginBottom: 4, lineHeight: 1.4 }}>{s.l}</div>
              <div style={{ fontSize: 13.5, color: C.textMuted, lineHeight: 1.55 }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 12 — Standards & Certifications
// ---------------------------------------------------------------------------

function Slide12() {
  const certs = [
    { code: 'มอก. 1955-2551', name: 'มาตรฐานผลิตภัณฑ์อุตสาหกรรมไทย', d: 'รับรองคุณภาพและความปลอดภัยของหลอด LED ตามมาตรฐานไทย' },
    { code: 'LM-79', name: 'IES Light Output Standard', d: 'ทดสอบประสิทธิภาพแสงและพลังงาน — ค่าที่ระบุเป็นค่าจริงที่ทดสอบในแล็บ' },
    { code: 'LM-80', name: 'IES LED Lifetime Standard', d: 'ทดสอบอายุการใช้งานและความเสื่อมของ LED — รับประกันคุณภาพระยะยาว' },
    { code: 'IP66', name: 'Ingress Protection', d: 'กันน้ำกันฝุ่นระดับสูงสุด — ทนสภาพอากาศไทย ฝนตกหนัก แดดจัด ลมพายุ' },
  ];
  return (
    <Slide num={12}>
      <Eyebrow accent>มาตรฐานที่รับรอง</Eyebrow>
      <Title>ทุกรุ่นผ่านมาตรฐานสากล + มอก.</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        ผู้รับเหมาเอาเอกสารรับรองยื่นต่อ อบต. ได้ทันที — ไม่ต้องลุ้นว่ามาตรฐานจะผ่านหรือเปล่า
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 22, flex: 1, alignContent: 'center' }}>
        {certs.map((c, i) => (
          <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 80, height: 80, borderRadius: 12, background: C.primary, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, textAlign: 'center', lineHeight: 1.3, flexShrink: 0, padding: 8 }}>{c.code}</div>
            <div style={{ minWidth: 0, paddingTop: 4 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: C.primaryDeep, marginBottom: 5, lineHeight: 1.4 }}>{c.name}</h3>
              <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>{c.d}</p>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 13 — Lighting design / DIALux calculation (we calculate to standard)
// Links to the full plain-language report page (/#/solar-street-light/report)
// ---------------------------------------------------------------------------

function SlideReport() {
  const results = [
    { ic: '✓', t: 'ผ่านทุกเกณฑ์', d: 'ความสว่าง · จุดมืดสุด · ความสม่ำเสมอ — ผ่านครบตาม มอก. 2954–2562', col: C.success },
    { ic: '☀️', t: 'สว่างเผื่อให้', d: 'ออกแบบช่วงหัวค่ำให้สว่างเกินเกณฑ์ขั้นต่ำของถนนประเภทนั้น', col: C.primary },
    { ic: '📊', t: 'ไม่มีจุดมืด', d: 'แสงกระจายทั่วถึงทั้งเส้น จุดมืดสุดยังสูงกว่าเกณฑ์', col: C.accent },
  ];
  return (
    <Slide num={13}>
      <Eyebrow accent>เราไม่ได้แค่ขายโคม — เราออกแบบแสงให้</Eyebrow>
      <Title size={34}>ทุกโครงการ เราคำนวณด้วย <span style={{ color: C.primary }}>DIALux</span> ตาม มอก. 2954–2562</Title>
      <Lead style={{ marginTop: 8, maxWidth: 1040, fontSize: 17 }}>
        ท่านไม่ต้องเดาว่าไฟจะสว่างพอหรือผ่านเกณฑ์ไหม — เราจำลองการกระจายแสงทั้งเส้นถนน
        เทียบกับมาตรฐานให้ก่อนเสนอราคา พร้อมรายงานที่ผู้รับเหมายื่นต่อ อบต. ได้
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 24, marginTop: 18, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
        {/* left — 3 results + CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          {results.map((r, i) => (
            <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 14, padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: `${r.col}18`, color: r.col, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, flexShrink: 0 }}>{r.ic}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: C.primaryDeep, marginBottom: 2 }}>{r.t}</div>
                <div style={{ fontSize: 13.5, color: C.textMuted, lineHeight: 1.5 }}>{r.d}</div>
              </div>
            </div>
          ))}
          <div style={{ background: C.primaryDeep, borderRadius: 14, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'center', marginTop: 'auto' }}>
            <span style={{ fontSize: 30, flexShrink: 0 }}>📄</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#FFF', marginBottom: 2 }}>มีรายงานออกแบบแสงให้ดูเป็นตัวอย่าง</div>
              <a href="#/solar-street-light/report" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 14, color: '#FDE68A', fontWeight: 600, textDecoration: 'underline' }}>
                เปิดดูตัวอย่างรายงาน (อ่านง่าย) →
              </a>
            </div>
          </div>
        </div>
        {/* right — sample document image */}
        <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, padding: 14, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ flex: 1, minHeight: 0, borderRadius: 10, overflow: 'hidden', background: C.surfaceSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={`${IMG}/report/recommended_design.png`} alt="ตัวอย่างรายงาน DIALux" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{ fontSize: 12.5, color: C.textMuted, textAlign: 'center', marginTop: 10, lineHeight: 1.5 }}>
            ตัวอย่างหน้าจากรายงานจริง — ตารางผลเทียบเกณฑ์ ขึ้น ✓ ทุกแถว
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 14 — Why us (dark)
// ---------------------------------------------------------------------------

function Slide13() {
  const reasons = [
    { ic: '🏭', t: 'ผู้ผลิตโดยตรง · 15 ปี', d: 'ดำเนินธุรกิจตั้งแต่ปี 2553 · ผลิต LED Lighting เอง ไม่ผ่านคนกลาง ราคาจึงแข่งขันได้' },
    { ic: '📐', t: 'ทีมออกแบบแสงสว่างให้ฟรี', d: 'มีวิศวกรช่วยออกแบบแสงให้ตรงข้อกำหนด อบต. · ผู้รับเหมาไม่ต้องเดาเอง' },
    { ic: '🏛️', t: 'ลูกค้าภาครัฐและบริษัทข้ามชาติ', d: 'มีประวัติการทำงานกับหน่วยงานราชการและบริษัทข้ามชาติชั้นนำมากมาย' },
    { ic: '🎓', t: 'มาตรฐานสากล + มอก.', d: 'ผ่าน LM-79 · LM-80 · มอก. 1955-2551 · เอกสารพร้อมส่งใช้ในงานราชการ' },
  ];
  return (
    <Slide num={14} dark>
      <Eyebrow dark>ทำไมต้องเรา</Eyebrow>
      <Title dark>ลดความเสี่ยง · เพิ่มความมั่นใจ · ประหยัดต้นทุนรวม</Title>
      <Lead dark style={{ marginTop: 12, maxWidth: 1020 }}>
        ในตลาดมีคนขายโซลาร์ไฟถนนเยอะ — แต่น้อยรายที่ผลิตเอง ออกแบบแสงเอง
        และมีเอกสารมาตรฐานครบในวันยื่นซอง
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 18, marginTop: 24, flex: 1, alignContent: 'center' }}>
        {reasons.map((r, i) => (
          <Card key={i} dark>
            <CardIcon>{r.ic}</CardIcon>
            <CardTitle dark>{r.t}</CardTitle>
            <CardBody dark>{r.d}</CardBody>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 14 — ROI / Cost saving
// ---------------------------------------------------------------------------

function Slide14() {
  return (
    <Slide num={15}>
      <Eyebrow>ROI · ทำไมคุ้มกว่า</Eyebrow>
      <Title size={36}>ลงทุนครั้งเดียว · ไม่มีค่าไฟ · ไม่ขุดสาย</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        เทียบกับเสาไฟ LED ปกติที่ต้องเดินสายไฟ + จ่ายค่าไฟทุกเดือน — โซลาร์ AIO
        คืนทุนเร็วกว่า และเป็นภาระงบประมาณน้อยกว่าในระยะยาว
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 22, flex: 1, alignContent: 'center' }}>
        <Card style={{ border: `2px solid ${C.alert}` }}>
          <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100, background: C.alertSoft, color: C.alert, marginBottom: 12 }}>เสาไฟ LED ปกติ</span>
          <CardTitle style={{ marginBottom: 12 }}>💸 ต้นทุนซ่อนรายปี</CardTitle>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              ['เดินสายไฟใต้ดิน', '50,000-150,000 บาท/กม.'],
              ['ค่าไฟต่อเสา', '1,200-1,800 บาท/เดือน'],
              ['ขุดถนน · ปิดจราจร', 'หลายสัปดาห์'],
              ['ค่าซ่อมเมื่อสายขาด', 'ทุกๆ 3-5 ปี'],
            ].map((r, i) => (
              <li key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '6px 0', borderBottom: i < 3 ? `1px dashed ${C.surfaceSoft}` : 'none' }}>
                <span style={{ color: C.textMuted }}>{r[0]}</span>
                <strong style={{ color: C.alert }}>{r[1]}</strong>
              </li>
            ))}
          </ul>
        </Card>
        <Card style={{ border: `2px solid ${C.success}` }}>
          <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100, background: C.successSoft, color: C.success, marginBottom: 12 }}>Solar AIO</span>
          <CardTitle style={{ marginBottom: 12 }}>✅ ลงทุนครั้งเดียว · จบ</CardTitle>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              ['เดินสายไฟ', '0 บาท · ไม่ต้องขุด'],
              ['ค่าไฟต่อเสา', '0 บาท/เดือน'],
              ['ติดตั้ง 1 เสา', '5 นาที · ไม่ปิดจราจร'],
              ['อายุแบต LiFePO4', '5+ ปี · 2,000 รอบชาร์จ'],
            ].map((r, i) => (
              <li key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '6px 0', borderBottom: i < 3 ? `1px dashed ${C.surfaceSoft}` : 'none' }}>
                <span style={{ color: C.textMuted }}>{r[0]}</span>
                <strong style={{ color: C.success }}>{r[1]}</strong>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <p style={{ fontSize: 12.5, color: C.textMuted, fontStyle: 'italic', marginTop: 10 }}>
        ตัวเลขเป็นช่วงประมาณการ · ค่าจริงขึ้นกับสภาพพื้นที่และจำนวนเสาของโครงการ ทีมงานยินดีคำนวณ ROI ให้ตามแบบโครงการของท่าน
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 15 — Process (7-step end-to-end)
// ---------------------------------------------------------------------------

function Slide15() {
  const steps = [
    { n: '01', t: 'วิเคราะห์ความต้องการ', d: 'ปรึกษา · ยืนยันข้อกำหนด · ประเมินสภาพหน้างาน' },
    { n: '02', t: 'ออกแบบโซลูชัน', d: 'เลือกรุ่นที่เหมาะสม · กำหนดค่าระบบ · จัดทำใบเสนอราคา' },
    { n: '03', t: 'ผลิตสินค้า', d: 'ควบคุมคุณภาพการผลิต · ตรวจสอบมาตรฐาน · บรรจุภัณฑ์' },
    { n: '04', t: 'ติดตั้ง', d: 'งานโยธา · ติดตั้งอุปกรณ์ · ทดสอบระบบ (Debug)' },
    { n: '05', t: 'ฝึกอบรม', d: 'อบรมใช้งาน · บำรุงรักษาเบื้องต้น · ส่งมอบเอกสารโครงการ' },
    { n: '06', t: 'บริการหลังการขาย', d: 'บำรุงรักษา · ชิ้นส่วนสำรอง · ทีมเทคนิคติดตาม' },
    { n: '07', t: 'ติดตามผล', d: 'ตรวจ KPI · ปรับปรุงการออกแบบ · สำรวจความพึงพอใจ' },
  ];
  return (
    <Slide num={16}>
      <Eyebrow>บริการครบวงจร</Eyebrow>
      <Title size={36}>7 ขั้นตอน · ตั้งแต่ปรึกษาจนถึงดูแลต่อเนื่อง</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        เราไม่ใช่แค่ขายโคม — ตั้งแต่ออกแบบให้ตรงข้อกำหนด อบต.
        ไปจนถึงดูแลหลังส่งมอบ ทุกขั้นตอนมีทีมรับผิดชอบชัดเจน
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginTop: 22 }}>
        {steps.slice(0, 4).map((s, i) => <ProcessCard key={i} {...s} />)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr) 1fr', gap: 14, marginTop: 14, flex: 1 }}>
        {steps.slice(4).map((s, i) => <ProcessCard key={i + 4} {...s} />)}
        <div style={{ background: C.primaryDeep, color: '#FFF', borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 4 }}>ลูกค้าได้</div>
          <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.45 }}>โครงการที่ส่งมอบครบ · จบเรื่องในงบเดียว</div>
        </div>
      </div>
    </Slide>
  );
}

function ProcessCard({ n, t, d }) {
  return (
    <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 14, padding: '14px 16px' }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: C.primary, marginBottom: 6 }}>{n}</div>
      <div style={{ fontSize: 14.5, fontWeight: 700, color: C.primaryDeep, marginBottom: 4, lineHeight: 1.45 }}>{t}</div>
      <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.55 }}>{d}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 16 — CTA + 3 คำถาม
// ---------------------------------------------------------------------------

function Slide17() {
  return (
    <Slide num={17} dark>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', maxWidth: 900, margin: '0 auto' }}>
        <Eyebrow dark>ขั้นต่อไป</Eyebrow>
        <Title dark size={46}>
          ขอเวลาคุย<br />
          <span style={{ color: '#FDE68A' }}>เรื่องโครงการของท่าน</span>
        </Title>
        <Lead dark style={{ marginTop: 20 }}>
          ท่านไม่ต้องตัดสินใจวันนี้ — เราอยากเข้าใจโครงการของท่านก่อน
          แล้วจึงเสนอรุ่นที่เหมาะกับสภาพถนนและงบประมาณจริง
        </Lead>
        <div style={{ marginTop: 30, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 18, padding: '24px 28px' }}>
          <h3 style={{ color: '#FFF', fontSize: 20, fontWeight: 700, marginBottom: 14 }}>3 คำถามที่อยากฟังจากท่าน</h3>
          <p style={{ color: 'rgba(255,255,255,.92)', fontSize: 17, lineHeight: 1.9 }}>
            1. โครงการมีกำหนดส่งมอบเมื่อไหร่? เร่งด่วนแค่ไหน?<br />
            2. งบประมาณช่วงไหน · เป็นงบ อบต. หรืองบโครงการเฉพาะ?<br />
            3. ความสำคัญสูงสุดคือ — ราคา · คุณภาพ · มาตรฐาน · หรือดีไซน์?
          </p>
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// Toolbar
// ---------------------------------------------------------------------------

function Toolbar() {
  const [open, setOpen] = useState(false);
  const titles = [
    '1 · 🚨 Pain · ไฟดับครึ่งคืน · เจ็บตัวซ้ำ',
    '2 · 🚨 Pain · 4 เรื่องที่ส่งมอบไม่จบ',
    '3 · ✨ Solution · Solar AIO ผ่านมาตรฐาน อบต.',
    '4 · 🔧 How · กลางวันชาร์จ · กลางคืนสว่าง',
    '5 · 📦 Hardware · 4 รุ่นครบทุกถนน',
    '6 · 📦 Hardware · SA-2A01 · RSK All-in-One',
    '7 · 📦 Hardware · SA-2A02 · RSA Modular',
    '8 · 📦 Hardware · SK-7A13 · Split Type',
    '9 · 📦 Hardware · SK-7A14 · Sailing Design',
    '10 · 📊 Compare · เปรียบเทียบ 4 รุ่น',
    '11 · 🩺 Benefit · เกินมาตรฐานทุกตัวชี้วัด',
    '12 · 🛡️ Coverage · มาตรฐาน + มอก. + IP66',
    '13 · 📐 Design · คำนวณ DIALux ตาม มอก. 2954',
    '14 · 🏆 Why us · ผู้ผลิตเอง 15 ปี',
    '15 · 💰 ROI · ลงทุนครั้งเดียว · ไม่มีค่าไฟ',
    '16 · 🛠️ Process · 7 ขั้นตอน end-to-end',
    '17 · 🤝 Close · 3 คำถาม + ขั้นต่อไป',
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
// ScrollDots
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

export default function SolarPitchDeck() {
  const slides = [Slide01, Slide02, Slide03, Slide04, Slide05, Slide06, Slide07, Slide08, Slide09, Slide10, Slide11, Slide12, SlideReport, Slide13, Slide14, Slide15, Slide17];
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
              <S />
            </ScaledSlide>
          </div>
        ))}
      </div>
    </>
  );
}
