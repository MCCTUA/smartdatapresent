
import React, { useEffect, useState, useRef } from 'react';
import RotateHint from '../components/RotateHint';

// ---------------------------------------------------------------------------
// ElderlyCare.jsx — Sales Pitch Deck (33 slides · 1280×720 · print-PDF ready)
// Design: Civic Trust palette (Forest #0F6E56 + Cream #FAF7EE + Amber #BA7517)
// Font: Sarabun
// Content: pain-first storytelling tailored to อปท. / เทศบาล executives
// Source: pitch_decks/03_เมนูโครงการดูแลผู้สูงอายุ_ลูกค้าอปท.html
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
};

const IMG = 'images/elderly-care';
const TOTAL_SLIDES = 33; // fallback only — actual page number/total come from SlideCtx (array order)

// Page numbering is automatic: the deck wrapper provides {num,total} via this context
// based on the slides[] array order. The num={...} hard-coded in each slide is just a
// fallback/label — to reorder or insert a slide, edit the slides[] array + titles[] only.
const SlideCtx = React.createContext(null);

// ---------------------------------------------------------------------------
// Slide shell — fixed 1280×720, scaled to viewport (screen) and 1:1 (print)
// ---------------------------------------------------------------------------

function Slide({ num, dark = false, children, footer = '' }) {
  const ctx = React.useContext(SlideCtx);
  const shownNum = ctx?.num ?? num;
  const shownTotal = ctx?.total ?? TOTAL_SLIDES;
  return (
    <section
      className="slide-page"
      data-dark={dark ? 'true' : 'false'}
      style={{
        position: 'relative',
        width: 1280,
        height: 720,
        background: dark ? `linear-gradient(135deg, ${C.primaryDeep} 0%, ${C.primary} 100%)` : C.surface,
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
        {shownNum} / {shownTotal}
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
// Architecture Diagram (Source → Center → Action)
// ---------------------------------------------------------------------------

function ArchitectureDiagram() {
  return (
    <svg viewBox="0 0 900 460" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: '100%', fontFamily: 'Sarabun, sans-serif' }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-eld" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={C.primary} />
        </marker>
        <linearGradient id="grad-coc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.primary} />
          <stop offset="100%" stopColor={C.primaryDeep} />
        </linearGradient>
      </defs>

      <text x="20" y="36" fontSize="12" fontWeight="600" fill={C.textMuted} letterSpacing="1.5">SOURCE</text>
      <text x="20" y="230" fontSize="12" fontWeight="600" fill={C.textMuted} letterSpacing="1.5">CENTER</text>
      <text x="20" y="410" fontSize="12" fontWeight="600" fill={C.textMuted} letterSpacing="1.5">ACTION</text>

      {[
        { x: 130, label: '🏠 ในบ้าน', sub: 'เซนเซอร์เรดาร์', detail: 'ห้องน้ำ · ห้องนอน' },
        { x: 380, label: '⌚ พกติดตัว', sub: 'นาฬิกา + ปุ่ม SOS', detail: 'หัวใจ · GPS' },
        { x: 630, label: '🩸 วัดที่บ้าน', sub: 'BP · น้ำตาล · O₂', detail: 'ผู้สูงอายุวัดเอง · อสม. ช่วย' },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="56" width="200" height="120" rx="14" fill="#FFF" stroke={C.primary} strokeWidth="1.5" />
          <text x={s.x + 100} y="94" textAnchor="middle" fontSize="22" fontWeight="600" fill={C.text}>{s.label}</text>
          <text x={s.x + 100} y="124" textAnchor="middle" fontSize="14" fontWeight="600" fill={C.primary}>{s.sub}</text>
          <text x={s.x + 100} y="148" textAnchor="middle" fontSize="12" fill={C.textMuted}>{s.detail}</text>
          <line x1={s.x + 100} y1="178" x2={s.x + 100} y2="232" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-eld)" />
        </g>
      ))}

      <rect x="130" y="232" width="700" height="100" rx="14" fill="url(#grad-coc)" />
      <text x="480" y="270" textAnchor="middle" fontSize="20" fontWeight="700" fill="#FFF">ศูนย์ดูแลของเทศบาล</text>
      <text x="480" y="296" textAnchor="middle" fontSize="13" fill="#FFF" opacity="0.85">คัดกรองสัญญาณ · จัดลำดับเหตุ · จับคู่กับเจ้าหน้าที่ที่ใกล้สุด</text>
      <text x="480" y="316" textAnchor="middle" fontSize="11" fill="#FFF" opacity="0.7">หน้าจอสรุปภาพรวม · บันทึกเหตุการณ์ครบถ้วน · ตามมาตรฐาน PDPA</text>

      <line x1="220" y1="332" x2="220" y2="385" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-eld)" />
      <line x1="480" y1="332" x2="480" y2="385" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-eld)" />
      <line x1="740" y1="332" x2="740" y2="385" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-eld)" />

      {[
        { x: 130, label: '📞 โทรกู้ชีพ', sub: 'เชื่อมสายด่วน 1669' },
        { x: 380, label: '👨‍👩‍👧 แจ้งครอบครัว', sub: 'แอป · LINE · SMS' },
        { x: 630, label: '👨‍⚕️ ส่งให้แพทย์', sub: 'ดูแลก่อนเรื่องใหญ่' },
      ].map((a, i) => (
        <g key={i}>
          <rect x={a.x} y="385" width="200" height="60" rx="12" fill={C.surfaceSoft} stroke={C.primary} strokeWidth="1" strokeDasharray="3,3" />
          <text x={a.x + 100} y="411" textAnchor="middle" fontSize="15" fontWeight="600" fill={C.text}>{a.label}</text>
          <text x={a.x + 100} y="431" textAnchor="middle" fontSize="12" fill={C.textMuted}>{a.sub}</text>
        </g>
      ))}
    </svg>
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
// SLIDE 1 — HERO (Pain opening)
// ---------------------------------------------------------------------------

function Slide01() {
  return (
    <Slide num={1} dark>
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr .85fr', gap: 48, alignItems: 'center', height: '100%' }}>
        <div>
          <Eyebrow dark>เทศบาลของท่าน · ดูแลผู้สูงอายุในตำบล</Eyebrow>
          <h1 style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.4, color: '#FFF', letterSpacing: -0.5 }}>
            ผู้สูงอายุล้มในบ้านลำพัง<br />
            กว่าจะมีคนเดินไปเจอ<br />
            <span style={{ color: C.surfaceSoft }}>บางครั้งก็สายเกินไป</span>
          </h1>
          <Lead dark style={{ marginTop: 24 }}>
            ทุกวันนี้คนวัยทำงานออกไปทำงานนอกบ้าน เหลือผู้สูงอายุอยู่บ้านคนเดียวตอนกลางวัน
            เมื่อล้ม วูบ หรือหมดสติ — ไม่มีใครรู้ทัน และเทศบาลก็ไม่มีเครื่องมือที่จะรู้ก่อน
          </Lead>
        </div>
        <div style={{ width: '100%', aspectRatio: '4/5', borderRadius: 18, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.45)' }}>
          <img src={`${IMG}/hero-elderly.png`} alt="ผู้สูงอายุไทยที่บ้าน" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 5 — ระบบทำงานอย่างไร (Architecture Diagram) — kept (was Slide04)
// ---------------------------------------------------------------------------

function Slide05Arch() {
  return (
    <Slide num={5}>
      <Eyebrow>ระบบทำงานอย่างไร</Eyebrow>
      <Title size={36}>จาก 3 จุดข้อมูล สู่ศูนย์เทศบาลใน 1 นาที</Title>
      <Lead style={{ marginTop: 6, marginBottom: 4, fontSize: 17 }}>
        รวมสัญญาณจากในบ้าน · อุปกรณ์พกติดตัว · เครื่องวัดสุขภาพที่บ้าน เข้าศูนย์ของเทศบาล แล้วส่งต่อให้คนที่รับผิดชอบจริง
      </Lead>
      <div style={{ marginTop: 10, padding: '12px 18px', background: '#FFF', borderRadius: 18, border: `1px solid ${C.surfaceSoft}`, flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ArchitectureDiagram />
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 6 — สัญญาณ → แพทย์
// ---------------------------------------------------------------------------

function Slide13Signals() {
  const rows = [
    ['หัวใจเต้นผิดจังหวะ', 'โรคหัวใจ · เสี่ยงหลอดเลือดสมอง', 'ส่งตรวจเพิ่ม · ป้องกันก่อนเกิดอัมพาต'],
    ['ความดันสูงต่อเนื่อง', 'ความดันโลหิตสูง', 'ปรับยา · คุมก่อนเกิดภาวะแทรกซ้อน'],
    ['น้ำตาลในเลือดผิดปกติ', 'เบาหวาน · ภาวะน้ำตาลต่ำ', 'ปรับการดูแล · ลดเสี่ยงฉุกเฉิน'],
    ['ออกซิเจนต่ำ · หายใจผิดปกติ', 'โรคปอด · ภาวะหยุดหายใจขณะนอน', 'ส่งตรวจปอด · ดูแลการนอน'],
  ];
  return (
    <Slide num={13}>
      <Eyebrow>จากสัญญาณ สู่การดูแล</Eyebrow>
      <Title>ข้อมูลที่เก็บได้ ช่วยให้แพทย์เห็นอะไรล่วงหน้า</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        ระบบเก็บสัญญาณร่างกายต่อเนื่อง ไม่ใช่แค่วัดทีเดียวตอนไปหาหมอ —
        ทำให้แพทย์เห็น "แนวโน้ม" และสังเกตความผิดปกติได้ก่อนที่จะกลายเป็นเรื่องใหญ่
      </Lead>
      <div style={{ marginTop: 18, background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.6fr 1.9fr', background: C.primary }}>
          {['สัญญาณที่ระบบจับได้', 'อาจเป็นสัญญาณเตือนของ', 'แพทย์นำไปใช้'].map((h, i) => (
            <div key={i} style={{ padding: '14px 18px', color: '#FFF', fontWeight: 700, fontSize: 15 }}>{h}</div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.6fr 1.9fr', borderTop: `1px solid ${C.surfaceSoft}` }}>
            <div style={{ padding: '14px 18px', fontSize: 14.5, color: C.primary, fontWeight: 600, lineHeight: 1.4 }}>{r[0]}</div>
            <div style={{ padding: '14px 18px', fontSize: 14.5, color: C.text, lineHeight: 1.4 }}>{r[1]}</div>
            <div style={{ padding: '14px 18px', fontSize: 14.5, color: C.text, lineHeight: 1.4 }}>{r[2]}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12.5, color: C.textMuted, fontStyle: 'italic', marginTop: 10 }}>
        ระบบทำหน้าที่จับสัญญาณและคัดกรองเบื้องต้นเท่านั้น · การวินิจฉัยและรักษาเป็นของแพทย์
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 7 — หลักฐานจริง: เห็นทุกจังหวะหัวใจ (real ECG + HR trend)
// ---------------------------------------------------------------------------

function EvidenceCard({ img, alt, badge, title, caption, flex }) {
  return (
    <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 16, padding: '12px 16px', display: 'flex', flexDirection: 'column', minHeight: 0, flex }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexShrink: 0 }}>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: C.primary, background: C.primarySoft, padding: '4px 11px', borderRadius: 100 }}>{badge}</span>
        <h3 style={{ fontSize: 15.5, fontWeight: 700, color: C.primaryDeep, lineHeight: 1.3 }}>{title}</h3>
      </div>
      <div style={{ flex: 1, minHeight: 0, background: '#FCFBF6', border: `1px solid ${C.surfaceSoft}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 6 }}>
        <img src={img} alt={alt} style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }} />
      </div>
      <p style={{ fontSize: 12.5, color: C.textMuted, lineHeight: 1.45, marginTop: 8, flexShrink: 0 }}>{caption}</p>
    </div>
  );
}

function Slide11Evidence() {
  return (
    <Slide num={11} footer="ตัวอย่างจากการตรวจวัดจริง (สาธิต) · ตัดเฉพาะกราฟ ไม่มีข้อมูลส่วนบุคคล (PDPA-safe)">
      <Eyebrow accent>หลักฐานจากการตรวจวัดจริง</Eyebrow>
      <Title size={34}>ไม่ใช่แค่บอกว่าดี — เห็นคลื่นหัวใจจริงทุกจังหวะ</Title>
      <Lead style={{ marginTop: 8, fontSize: 16.5, maxWidth: 1060 }}>
        นาฬิกาเฝ้าระวังหัวใจบันทึกคลื่นไฟฟ้าหัวใจ <strong style={{ color: C.primary }}>ระดับการแพทย์</strong> ในการวัด
        ~2 นาทีครั้งเดียว — ภาพข้างล่างคือกราฟจริงที่ตัดมาจากรายงานการตรวจวัด
      </Lead>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14, flex: 1, minHeight: 0 }}>
        <EvidenceCard
          flex={1.5}
          img={`${IMG}/real_ecg_strip.png`}
          alt="คลื่นไฟฟ้าหัวใจจริง Lead I มาตรฐาน 25 mm/s, 10 mm/mV"
          badge="คลื่นไฟฟ้าหัวใจ (ECG)"
          title="บันทึกทุกจังหวะ พร้อมจัดประเภทการเต้น"
          caption="คลื่นไฟฟ้าหัวใจ Lead I มาตรฐานคลินิก 25 mm/s · 10 mm/mV — จัดประเภทการเต้นให้อัตโนมัติ (N = ปกติ) เป็นภาพที่ “ดูแล้วเชื่อ” ที่สุด"
        />
        <EvidenceCard
          flex={1}
          img={`${IMG}/real_hr_trend.png`}
          alt="อัตราการเต้นหัวใจต่อเนื่อง 153 ครั้งใน 2 นาที เฉลี่ย 82"
          badge="อัตราการเต้นหัวใจ"
          title="เห็นทุกจังหวะ ไม่ใช่ค่าเฉลี่ยรายชั่วโมง"
          caption="บันทึกการเต้นหัวใจต่อเนื่อง 153 ครั้งใน ~2 นาที (เฉลี่ย 82 · ช่วง 76–89) ยืนยันจังหวะปกติแบบจังหวะต่อจังหวะ"
        />
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 8 — เบื้องหลังการวิเคราะห์ 3 ชั้น + ไฟสถานะ (credibility)
// ---------------------------------------------------------------------------

function StatusDot({ color }) {
  return <span style={{ width: 11, height: 11, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />;
}

function MetricRow({ label, value, status }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderTop: `1px solid ${C.surfaceSoft}` }}>
      {status ? <StatusDot color={status} /> : <span style={{ width: 11, flexShrink: 0 }} />}
      <span style={{ fontSize: 13, color: C.text, flex: 1, lineHeight: 1.3 }}>{label}</span>
      <span style={{ fontSize: 13.5, fontWeight: 700, color: C.primaryDeep, flexShrink: 0 }}>{value}</span>
    </div>
  );
}

function AnalysisLayerCard({ badge, badgeBg, title, sub, rows }) {
  return (
    <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <span style={{ alignSelf: 'flex-start', fontSize: 11.5, fontWeight: 700, color: '#FFF', background: badgeBg, padding: '4px 12px', borderRadius: 100, marginBottom: 8 }}>{badge}</span>
      <h3 style={{ fontSize: 16.5, fontWeight: 800, color: C.primaryDeep, lineHeight: 1.3 }}>{title}</h3>
      <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.4, marginBottom: 6 }}>{sub}</p>
      <div style={{ marginTop: 'auto' }}>
        {rows.map((r, i) => <MetricRow key={i} {...r} />)}
      </div>
    </div>
  );
}

// Certification strip — drop real logo files into public/images/elderly-care/
// (either one combined strip `cert-logos.png`, OR separate cert-fda/ce/tga/iso/medsafe.png)
// and swap the pill fallback below for <img>. Until the files exist we render text pills.
const CERTS = [
  { short: 'FDA', alt: 'US FDA cleared' },
  { short: 'CE · MDR 2797', alt: 'CE / EU MDR 2797' },
  { short: 'TGA', alt: 'TGA Australia' },
  { short: 'ISO', alt: 'ISO' },
  { short: 'MEDSAFE', alt: 'MEDSAFE' },
];
let certLogoWarned = false;

function CertStrip() {
  useEffect(() => {
    if (certLogoWarned) return;
    certLogoWarned = true;
    console.warn('[elderly-care] ยังไม่มีไฟล์โลโก้รับรอง (cert-logos.png หรือ cert-fda/ce/tga/iso/medsafe.png) ใน public/images/elderly-care/ — แสดงป้ายตัวอักษรแทนชั่วคราว');
  }, []);
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
      {CERTS.map((c, i) => (
        <span
          key={i}
          title={c.alt}
          aria-label={c.alt}
          style={{
            height: 40,
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: 12.5,
            fontWeight: 700,
            color: C.primaryDeep,
            background: C.surfaceSoft,
            border: `1px solid ${C.primarySoft}`,
            borderRadius: 8,
            padding: '0 14px',
          }}
        >
          {c.short}
        </span>
      ))}
    </div>
  );
}

function Slide12Analysis() {
  const legend = [
    { c: C.success, l: 'เขียว · ปกติ' },
    { c: C.accent, l: 'เหลือง · เฝ้าดู' },
    { c: C.alert, l: 'แดง · ควรติดตาม' },
  ];
  return (
    <Slide num={12}>
      <Eyebrow>เบื้องหลังที่เชื่อถือได้</Eyebrow>
      <Title size={30}>วัดครั้งเดียว ~2 นาที ได้บทวิเคราะห์ 3 ชั้น</Title>
      <Lead style={{ marginTop: 4, marginBottom: 2, fontSize: 15, maxWidth: 1080 }}>
        นาฬิกาทั่วไปบอกแค่ “หัวใจเต้นกี่ครั้ง” — อุปกรณ์นี้ให้ผลวิเคราะห์ 3 ชั้น พร้อมระบบไฟ เขียว/เหลือง/แดง ที่ อสม. และครอบครัวอ่านได้ทันที ·
        ระบบ <strong style={{ color: C.primaryDeep }}>“อ่านผลให้” เป็นข้อความ</strong> และทุกดัชนีมีนิยามคลินิกรองรับ
      </Lead>
      <div style={{ display: 'flex', gap: 10, margin: '10px 0' }}>
        {legend.map((g, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600, color: C.text }}>
            <StatusDot color={g.c} />{g.l}
          </span>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, flex: 1, minHeight: 0 }}>
        <AnalysisLayerCard
          badge="ชั้นที่ 1"
          badgeBg={C.primary}
          title="ค่าคลื่นไฟฟ้าหัวใจ (ECG)"
          sub="ภาษาเดียวกับที่แพทย์โรคหัวใจใช้"
          rows={[
            { label: 'QT / QTc', value: '402 / 471 ms' },
            { label: 'PR interval', value: '145 ms' },
            { label: 'QRS', value: '117 ms' },
          ]}
        />
        <AnalysisLayerCard
          badge="ชั้นที่ 2"
          badgeBg="#4A7C59"
          title="ดัชนีสุขภาวะหัวใจ"
          sub="สรุปรวม พร้อมไฟสถานะ"
          rows={[
            { label: 'จังหวะการเต้น (Rhythm)', value: '100', status: C.success },
            { label: 'สภาพกล้ามเนื้อหัวใจ', value: '74%', status: C.accent },
            { label: 'ความเสี่ยงภาวะหัวใจ', value: '58', status: C.accent },
            { label: 'ระดับความเครียด', value: 'ปกติ', status: C.success },
          ]}
        />
        <AnalysisLayerCard
          badge="ชั้นที่ 3"
          badgeBg={C.accent}
          title="ความแปรปรวนหัวใจ (HRV)"
          sub="สัญญาณเตือนล่วงหน้า"
          rows={[
            { label: 'อัตราการเต้นหัวใจ', value: '82 bpm', status: C.success },
            { label: 'SDNN / RMSSD', value: '24 / 19 ms', status: C.alert },
            { label: 'Stress index', value: '470', status: C.alert },
            { label: 'สมดุลประสาท (LF/HF)', value: '0.33', status: C.alert },
          ]}
        />
      </div>
      <p style={{ fontSize: 11.5, color: C.textMuted, lineHeight: 1.45, marginTop: 10 }}>
        <strong style={{ color: C.text }}>อ่านค่าเร็ว:</strong> กล้ามเนื้อหัวใจ = ความแข็งแรงของหัวใจ · SDNN = ความยืดหยุ่น/การปรับตัว · RMSSD = การผ่อนคลาย · Stress index = ความเครียดสรีรวิทยา · LF/HF = สมดุลประสาทเร่ง/ผ่อน
      </p>
      <div style={{ marginTop: 10, background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 14, padding: '10px 18px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.primary, textAlign: 'center', marginBottom: 8 }}>การรับรองมาตรฐานระดับสากล (ตัวเครื่อง)</div>
        <CertStrip />
        <p style={{ fontSize: 11, color: C.textMuted, fontStyle: 'italic', textAlign: 'center', marginTop: 8 }}>
          ความแม่นยำตรวจ AFib &gt;99% เทียบ Holter · ใช้เพื่อคัดกรองเท่านั้น
        </p>
      </div>
      <p style={{ fontSize: 11, color: C.textMuted, fontStyle: 'italic', marginTop: 8 }}>
        ค่าดัชนีเป็นเชิงสุขภาวะ (Wellbeing · Non-medical) สำหรับเฝ้าระวัง/คัดกรองเบื้องต้นเท่านั้น ไม่ใช่การวินิจฉัย
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 9–10 — อธิบายศัพท์ + สัญญาณเตือน (glossary)
// ---------------------------------------------------------------------------

function GlossaryTable({ rows }) {
  return (
    <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 16, overflow: 'hidden', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr 1.85fr', background: C.primary }}>
        {['ตัวย่อ', 'ความหมายภาษาคน', 'ถ้าผิดปกติ อาจเป็นสัญญาณเตือนของ'].map((h, i) => (
          <div key={i} style={{ padding: '10px 16px', color: '#FFF', fontWeight: 700, fontSize: 13.5 }}>{h}</div>
        ))}
      </div>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr 1.85fr', borderTop: `1px solid ${C.surfaceSoft}`, flex: 1, alignItems: 'center' }}>
            <div style={{ padding: '7px 16px' }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: C.primary, lineHeight: 1.25 }}>{r.abbr}</div>
              {r.th && <div style={{ fontSize: 11.5, color: C.textMuted, lineHeight: 1.25 }}>{r.th}</div>}
            </div>
            <div style={{ padding: '7px 16px', fontSize: 13, color: C.text, lineHeight: 1.35 }}>{r.mean}</div>
            <div style={{ padding: '7px 16px', fontSize: 13, color: C.text, lineHeight: 1.35 }}>{r.signal}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const GLOSSARY_DISCLAIMER = 'ค่าผิดปกติเป็นเพียงสัญญาณให้ไปพบแพทย์ ไม่ใช่การวินิจฉัยว่าเป็นโรค · ระบบทำหน้าที่เฝ้าระวัง/คัดกรองเบื้องต้นเท่านั้น';

function Slide34Glossary() {
  const rows = [
    { abbr: 'AFib', th: 'หัวใจห้องบนสั่นพลิ้ว', mean: 'หัวใจห้องบนเต้นรัว ไม่เป็นจังหวะ', signal: 'ลิ่มเลือด → โรคหลอดเลือดสมอง/อัมพาต, หัวใจล้มเหลว' },
    { abbr: 'HR', th: 'อัตราการเต้นหัวใจ', mean: 'จำนวนครั้งหัวใจเต้นต่อนาที', signal: 'เต้นเร็ว/ช้าผิดปกติ, หัวใจเต้นผิดจังหวะ, ไทรอยด์' },
    { abbr: 'ECG', th: 'คลื่นไฟฟ้าหัวใจ', mean: 'สัญญาณไฟฟ้าของหัวใจ', signal: 'จังหวะ/การนำไฟฟ้าหัวใจผิดปกติ' },
    { abbr: 'SpO₂', th: 'ออกซิเจนในเลือด', mean: '% ออกซิเจนในเลือด', signal: 'ต่ำ → โรคปอด, ภาวะหยุดหายใจขณะหลับ' },
    { abbr: 'QT / QTc', th: '', mean: 'ระยะบีบ–คลายหัวใจห้องล่าง', signal: 'ยาวผิดปกติ → หัวใจเต้นผิดจังหวะชนิดอันตราย (เสี่ยงหัวใจหยุดเต้น)' },
    { abbr: 'PR', th: '', mean: 'เวลานำสัญญาณ ห้องบน→ห้องล่าง', signal: 'ยาว → หัวใจนำไฟฟ้าช้า/บล็อก (AV block)' },
    { abbr: 'QRS', th: '', mean: 'เวลาสัญญาณวิ่งในห้องล่าง', signal: 'กว้าง → การนำไฟฟ้าห้องล่างผิดปกติ (bundle branch block)' },
  ];
  return (
    <Slide num={34}>
      <Eyebrow>เข้าใจค่าต่าง ๆ แบบง่าย ๆ</Eyebrow>
      <Title size={27}>ค่าที่วัดได้ บอกอะไร และถ้าผิดปกติ = สัญญาณเตือนของอะไร</Title>
      <div style={{ marginTop: 10, marginBottom: 10, background: C.primarySoft, borderRadius: 12, padding: '10px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: C.primaryDeep, background: '#FFF', border: `1px solid ${C.primary}`, padding: '4px 12px', borderRadius: 100, flexShrink: 0 }}>AFib &gt;99%</span>
        <p style={{ fontSize: 12.5, color: C.text, lineHeight: 1.45, flex: 1 }}>
          ในการทดสอบทางคลินิก เครื่องตรวจจับภาวะหัวใจห้องบนสั่นพลิ้วได้ถูกต้องเกิน 99% เทียบเครื่องมาตรฐาน (Holter) — จาก 100 ครั้งจับถูกเกิน 99 ครั้ง
        </p>
      </div>
      <GlossaryTable rows={rows} />
      <p style={{ fontSize: 11.5, color: C.textMuted, fontStyle: 'italic', marginTop: 10 }}>
        {GLOSSARY_DISCLAIMER}
      </p>
    </Slide>
  );
}

function Slide35Glossary() {
  const rows = [
    { abbr: 'Myocardium', th: 'กล้ามเนื้อหัวใจ', mean: 'ความแข็งแรงกล้ามเนื้อ+ระบบนำไฟฟ้าหัวใจ', signal: 'ต่ำ → กล้ามเนื้อหัวใจอ่อนแรง' },
    { abbr: 'SDNN', th: '', mean: 'ความยืดหยุ่น/การปรับตัวของหัวใจ', signal: 'ต่ำ → ความเครียดสะสม, เสี่ยงหัวใจ–หลอดเลือดสูงขึ้น' },
    { abbr: 'RMSSD', th: '', mean: 'ระดับการผ่อนคลายของระบบประสาท', signal: 'ต่ำ → พักผ่อน/ฟื้นตัวไม่ดี, เครียด' },
    { abbr: 'Stress index', th: '', mean: 'ความเครียดทางสรีรวิทยา', signal: 'สูง → เครียดเรื้อรัง เสี่ยงความดัน/หัวใจ' },
    { abbr: 'LF/HF', th: '', mean: 'สมดุลระบบประสาท “เร่ง vs ผ่อน”', signal: 'เสียสมดุล → ระบบประสาทอัตโนมัติผิดปกติ' },
    { abbr: 'PWV', th: 'ความเร็วคลื่นชีพจร', mean: 'บอกความแข็งตัวของหลอดเลือด', signal: 'สูง → หลอดเลือดแข็ง เสี่ยงความดัน/หัวใจ–หลอดเลือด' },
  ];
  return (
    <Slide num={35}>
      <Eyebrow>เข้าใจค่าต่าง ๆ แบบง่าย ๆ (ต่อ)</Eyebrow>
      <Title size={27}>ความแปรปรวนหัวใจ &amp; หลอดเลือด — บอกอะไร และสัญญาณเตือน</Title>
      <Lead style={{ marginTop: 8, marginBottom: 10, fontSize: 15, maxWidth: 1080 }}>
        ค่ากลุ่มนี้คือ “สัญญาณเตือนล่วงหน้า” — สะท้อนความเครียดสะสมและสุขภาพหลอดเลือด ก่อนที่จะกลายเป็นอาการชัดเจน
      </Lead>
      <GlossaryTable rows={rows} />
      <p style={{ fontSize: 11.5, color: C.textMuted, fontStyle: 'italic', marginTop: 10 }}>
        {GLOSSARY_DISCLAIMER}
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 12 — Escalation flow
// ---------------------------------------------------------------------------

function FlowBox({ alert, success, children }) {
  const border = alert ? C.alert : success ? C.success : C.primary;
  return (
    <div style={{ background: '#FFF', border: `2px solid ${border}`, borderRadius: 14, padding: '16px 20px', textAlign: 'center' }}>
      {children}
    </div>
  );
}

function Slide19Answer() {
  return (
    <Slide num={19}>
      <Eyebrow>คำถามสำคัญที่สุด</Eyebrow>
      <Title>เลือกเวลาผู้รับสายได้</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        ท่านไม่ต้องจ้างคนนั่งเฝ้าหน้าจอ 24 ชั่วโมง — ระบบแบ่งการรับเหตุเป็น 2 ช่วงชัดเจน
      </Lead>
      <div style={{ marginTop: 16, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
        <div style={{ maxWidth: 700, margin: '0 auto', width: '100%' }}>
          <FlowBox alert>
            <h4 style={{ fontSize: 17, fontWeight: 700, color: C.alert, marginBottom: 4 }}>⚠ เกิดเหตุ — ผู้สูงอายุล้ม / กดปุ่ม / สัญญาณผิดปกติ</h4>
            <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.4 }}>ระบบเฝ้าระวังตรวจจับ และคัดกรองว่าเป็นเหตุจริง ก่อนแจ้งเตือน</p>
          </FlowBox>
        </div>
        <div style={{ fontSize: 26, color: C.primary, textAlign: 'center', fontWeight: 800 }}>↓</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <FlowBox>
            <h4 style={{ fontSize: 17, fontWeight: 700, color: C.primary, marginBottom: 4 }}>🕘 ในเวลาราชการ</h4>
            <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.4 }}>
              <strong style={{ color: C.text }}>เจ้าหน้าที่เทศบาล / กองสาธารณสุข</strong> เฝ้าหน้าจอ รับเหตุ และตัดสินใจส่งต่อ
            </p>
          </FlowBox>
          <FlowBox>
            <h4 style={{ fontSize: 17, fontWeight: 700, color: C.primary, marginBottom: 4 }}>🌙 นอกเวลาราชการ / ไม่มีคนรับใน X นาที</h4>
            <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.4 }}>
              ระบบ <strong style={{ color: C.text }}>โอนอัตโนมัติ</strong> ไปยังสายด่วนฉุกเฉิน <strong style={{ color: C.text }}>1669</strong> หรือหน่วยกู้ภัย / โรงพยาบาล ที่ตกลงไว้ล่วงหน้า
            </p>
          </FlowBox>
        </div>
        <div style={{ fontSize: 26, color: C.primary, textAlign: 'center', fontWeight: 800 }}>↓</div>
        <div style={{ maxWidth: 700, margin: '0 auto', width: '100%' }}>
          <FlowBox success>
            <h4 style={{ fontSize: 17, fontWeight: 700, color: C.success, marginBottom: 4 }}>✓ คนช่วยถึงตัวผู้สูงอายุ · บันทึกเหตุการณ์ครบถ้วน</h4>
            <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.4 }}>ทุกขั้นตอนถูกบันทึกตามมาตรฐานคุ้มครองข้อมูลส่วนบุคคล (PDPA)</p>
          </FlowBox>
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 13 — RACI
// ---------------------------------------------------------------------------

function Slide23Raci() {
  const raci = [
    { who: 'ระบบ (ของเรา)', do: 'เฝ้าระวัง · แจ้งเตือน · คัดกรองเบื้องต้น · ส่งต่อตามขั้นตอน — ไม่วินิจฉัย ไม่รักษา' },
    { who: 'เจ้าหน้าที่เทศบาล', do: 'รับเหตุในเวลาราชการ · ตัดสินใจส่งต่อ · ประสานครอบครัว' },
    { who: 'อสม. / ผู้ดูแล', do: 'ช่วยติดตามเยี่ยมบ้านเฉพาะรายที่ระบบแจ้ง — ไม่ต้องเดินตรวจทุกหลังทุกวัน' },
    { who: 'สายด่วน 1669 / รพ.', do: 'วินิจฉัยและรักษา ตามมาตรฐานการแพทย์ — เหมือนที่ทำอยู่ทุกวันนี้' },
  ];
  return (
    <Slide num={23}>
      <Eyebrow>ความรับผิดชอบชัดเจน</Eyebrow>
      <Title>ใครทำหน้าที่อะไร — ไม่มีภาระลอยๆ</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        เรื่องที่ผู้บริหารกังวลที่สุดคือ "ถ้าเกิดเหตุ ใครรับผิดชอบ" — เราตอบชัดตั้งแต่ต้น
      </Lead>
      <div style={{ marginTop: 18, background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {raci.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.4fr 2.6fr', borderBottom: i < raci.length - 1 ? `1px solid ${C.surfaceSoft}` : 'none' }}>
            <div style={{ padding: '16px 18px', fontWeight: 700, color: C.primary, fontSize: 16, background: C.primarySoft }}>{r.who}</div>
            <div style={{ padding: '16px 18px', fontSize: 15, color: C.text, lineHeight: 1.45 }}>{r.do}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 13, color: C.primary, fontWeight: 600, marginTop: 12 }}>
        การวินิจฉัยและรักษายังเป็นหน้าที่ของบุคลากรการแพทย์เช่นเดิม เทศบาลทำหน้าที่เฝ้าระวังและส่งต่อเท่านั้น
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 27 — Dashboard ภาพรวมสุขภาพชุมชน — kept (was Slide16)
// ---------------------------------------------------------------------------

function Slide27Dash() {
  const screens = [
    { img: 'Office_screen.png', tag: 'ฝั่งเทศบาล · Web Platform', t: 'ภาพรวมสุขภาพชุมชน (GIS)', d: 'แผนที่ความเสี่ยงรายพื้นที่ · สถิติรวมรายโรค · แจ้งเตือน — ข้อมูลภาพรวม ไม่ระบุตัวบุคคล' },
    { img: 'osm_screen.png', tag: 'ฝั่ง อสม. · ภาคสนาม', t: 'แผงควบคุมงานเยี่ยมบ้าน', d: 'รายการติดตามวันนี้ · แจ้งเตือนล่าสุด · แนวโน้มสุขภาพรายคน (เฉพาะผู้มีสิทธิ์)' },
  ];
  return (
    <Slide num={28}>
      <Eyebrow accent>หน้าจอจริงของระบบ</Eyebrow>
      <Title size={28}>Dashboard ทำงานจริง · เทศบาล &amp; อสม.</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 12, flex: 1, minHeight: 0 }}>
        {screens.map((s, i) => (
          <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, padding: 14, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <span style={{ alignSelf: 'flex-start', fontSize: 12, fontWeight: 700, color: C.primary, background: C.primarySoft, padding: '4px 12px', borderRadius: 100, marginBottom: 8 }}>{s.tag}</span>
            <div style={{ flex: 1, minHeight: 0, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.surfaceSoft }}>
              <img src={`${IMG}/${s.img}`} alt={s.t} style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }} />
            </div>
            <h3 style={{ fontSize: 16.5, fontWeight: 800, color: C.primaryDeep, marginTop: 9, lineHeight: 1.3 }}>{s.t}</h3>
            <p style={{ fontSize: 12.5, color: C.textMuted, lineHeight: 1.45, marginTop: 2 }}>{s.d}</p>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11.5, color: C.textMuted, fontStyle: 'italic', marginTop: 8 }}>
        ภาพรวมระดับพื้นที่ไม่แสดงข้อมูลรายบุคคล · ข้อมูลรายคนดูได้เฉพาะเจ้าหน้าที่ที่มีสิทธิ์ + บันทึกการเข้าถึง (audit log) ตาม PDPA
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE — แอป OCR "ถ่ายไม่ต้องจด" (was OSM field app) — image + workflow
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// App Demo Modal — เปิด mockup ระบบจริง (public/ui/elderly_app.html) ทับสไลด์
// ปิดด้วยปุ่ม X / ESC / คลิกพื้นหลัง → กลับมาที่สไลด์เดิม (ไม่หลุดจาก present)
// ---------------------------------------------------------------------------
function AppDemoModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(20,22,20,0.62)', backdropFilter: 'blur(3px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(12px, 3vw, 36px)', animation: 'ecFade .2s ease',
      }}
    >
      <style>{`@keyframes ecFade{from{opacity:0}to{opacity:1}}`}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(1280px, 100%)', height: 'min(800px, 100%)',
          background: '#F7F4EC', borderRadius: 16, overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column',
        }}
      >
        <div style={{ flexShrink: 0, height: 52, background: '#1F6B4C', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14.5, fontWeight: 700 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#9FE3C0' }} />
            ตัวอย่างระบบจริง — ElderlyCare 360° (กดปุ่มในระบบเพื่อทดลองได้)
          </div>
          <button
            onClick={onClose}
            aria-label="ปิด"
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.16)', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 14px', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}
          >
            ✕ ปิด · กลับสู่การนำเสนอ
          </button>
        </div>
        <iframe
          src={`${import.meta.env.BASE_URL}ui/elderly_app.html`}
          title="ElderlyCare 360° — ตัวอย่างระบบ"
          style={{ flex: 1, width: '100%', border: 'none', display: 'block' }}
        />
      </div>
    </div>
  );
}

function Slide21App() {
  const [showDemo, setShowDemo] = useState(false);
  const steps = [
    { n: 1, t: 'เปิดหน้าผู้สูงอายุที่เยี่ยม', d: 'ระบบรู้ว่ากำลังดูแลใคร (ยายบุญมา · บ้าน 42)' },
    { n: 2, t: 'ถ่ายรูปหน้าจอเครื่องวัด', d: 'ระบบอ่านค่าจากภาพให้อัตโนมัติ (OCR) — ความดัน · น้ำตาล · ออกซิเจน' },
    { n: 3, t: 'ค่าเข้าประวัติทันที', d: 'บันทึกเข้าประวัติของยายบุญมาทันที — ไม่ต้องคีย์ ไม่ผิดคน' },
  ];
  return (
    <Slide num={21}>
      {showDemo && <AppDemoModal onClose={() => setShowDemo(false)} />}
      <Eyebrow accent>เครื่องมือสำหรับ อสม. ภาคสนาม</Eyebrow>
      <Title size={32}>ทำงานสะดวก แค่ถ่ายไม่ต้องจด</Title>
      <p style={{ fontSize: 14, color: C.textMuted, marginTop: 2, marginBottom: 8 }}>
        ถ่ายรูปหน้าจอเครื่องวัด · ระบบอ่านค่าให้อัตโนมัติ (OCR) แล้วจับคู่ "คน + ค่าวัด" — บันทึกถูกคนเสมอ
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 24, flex: 1, minHeight: 0 }}>
        {/* OCR feature image */}
        <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, padding: 14, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={`${IMG}/OCR_Features.png`} alt="ถ่ายรูปหน้าจอเครื่องวัด → ระบบอ่านค่าด้วย OCR และบันทึกขึ้นแดชบอร์ดให้อัตโนมัติ" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }} />
        </div>

        {/* Right: workflow steps + "บันทึกถูกคน" callout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
          <div style={{ background: '#FFF', borderRadius: 14, padding: '16px 20px', border: `1px solid ${C.surfaceSoft}` }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: C.primaryDeep, marginBottom: 10 }}>3 ขั้นตอน · ถ่ายแล้วจบ</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {steps.map((s) => (
                <div key={s.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: C.primary, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, flexShrink: 0 }}>{s.n}</div>
                  <div style={{ paddingTop: 2 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 2, lineHeight: 1.4 }}>{s.t}</h4>
                    <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.5 }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: C.primaryDeep, color: '#FFF', borderRadius: 14, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ fontSize: 38, lineHeight: 1, flexShrink: 0 }}>🎯</div>
            <div>
              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, lineHeight: 1.4 }}>ทำไม "ข้อมูลถูกบันทึกถูกคน" เสมอ?</h4>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.88)', lineHeight: 1.55 }}>
                App กำลังเปิดอยู่บนหน้าผู้สูงอายุที่เยี่ยม + ถ่ายค่าจากเครื่องเดียวกัน —
                ระบบจับคู่ "คน × ค่าวัด" อัตโนมัติ ไม่ต้องคีย์ซ้ำ ไม่กลัวสลับคน
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { ic: '📷', t: 'ถ่ายรูปประกอบหลักฐาน' },
              { ic: '⚡', t: 'ข้อมูลขึ้น Dashboard ทันที' },
            ].map((b, i) => (
              <div key={i} style={{ background: C.surfaceSoft, borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{b.ic}</span>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{b.t}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowDemo(true)}
            style={{ marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', background: C.primary, color: '#FFF', border: 'none', borderRadius: 12, padding: '13px 18px', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(31,107,76,0.28)' }}
          >
            🖥️ เปิดดูระบบจริง (กดเล่นได้)
          </button>
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 18 — อบรม + ดูแลต่อเนื่อง
// ---------------------------------------------------------------------------

function Slide32Support() {
  return (
    <Slide num={32}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Eyebrow>เราอยู่ดูแลต่อเนื่อง</Eyebrow>
        <Title size={42}>ไม่ได้แค่ติดตั้งแล้วจากไป</Title>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 30 }}>
          {[
            { ic: '🎓', t: 'อบรมเจ้าหน้าที่และ อสม.', d: 'สอนใช้งานจริงจนใช้เป็น ไม่ทิ้งให้งง' },
            { ic: '🛠️', t: 'มีทีมซัพพอร์ตและรับประกัน', d: 'อุปกรณ์มีปัญหา มีทีมดูแล ไม่ปล่อยทิ้ง' },
            { ic: '📅', t: 'วางแผนปีต่อๆ ไปให้', d: 'ชี้แจงค่าใช้จ่ายต่อเนื่องชัด ไม่เป็นภาระงบที่ค้าง' },
          ].map((x, i) => (
            <Card key={i} style={{ textAlign: 'center' }}>
              <CardIcon>{x.ic}</CardIcon>
              <CardTitle>{x.t}</CardTitle>
              <CardBody>{x.d}</CardBody>
            </Card>
          ))}
        </div>
        <Lead style={{ marginTop: 28, maxWidth: 920 }}>
          เราจะชี้แจงให้ชัดตั้งแต่ต้นว่า ค่าใช้จ่ายส่วนไหนเป็น "ครั้งเดียว" และส่วนไหนเป็น "รายปี"
          เพื่อให้ท่านวางงบได้อย่างมั่นใจ ไม่มีค่าใช้จ่ายซ่อนเร้น
        </Lead>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 19 — CTA + 3 คำถาม
// ---------------------------------------------------------------------------

function Slide33Cta() {
  return (
    <Slide num={33} dark>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Eyebrow dark>ขั้นต่อไป</Eyebrow>
        <Title dark size={44}>
          ขอเวลาท่านสักครู่<br />คุยเรื่องผู้สูงอายุในพื้นที่ของท่าน
        </Title>
        <Lead dark style={{ marginTop: 20, maxWidth: 940 }}>
          ท่านไม่ต้องตัดสินใจอะไรในวันนี้ — เราอยากฟังก่อนว่าเทศบาลของท่านเจอปัญหาอะไร
          แล้วจึงเสนอแบบที่เหมาะกับพื้นที่จริง ไม่ใช่ขายแพ็กเกจสำเร็จรูป
        </Lead>
        <div style={{ marginTop: 30, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 18, padding: '24px 28px', maxWidth: 980 }}>
          <h3 style={{ color: '#FFF', fontSize: 20, fontWeight: 700, marginBottom: 14 }}>3 คำถามที่อยากฟังจากท่าน</h3>
          <p style={{ color: 'rgba(255,255,255,.9)', fontSize: 17, lineHeight: 1.9 }}>
            1. ปัญหาการดูแลผู้สูงอายุที่หนักที่สุดในพื้นที่ของท่าน คืออะไร?<br />
            2. สิ่งที่ท่านกังวลที่สุดถ้าจะเริ่มโครงการแบบนี้ คืออะไร?<br />
            3. ถ้าจะเริ่มทดลอง — เงื่อนไขสำคัญที่สุดของท่านคืออะไร?
          </p>
        </div>
      </div>
    </Slide>
  );
}

// ===========================================================================
// NEW SLIDES (pitch-deck restructure) — authored with the existing
// atoms/Card/FlowBox pattern so the new pages read as one deck.
// Render order is the slides[] array at the bottom of the file; each
// component hard-codes its own num. Compliance: เฝ้าระวัง · บันทึก · คัดกรอง ·
// แจ้งเตือน language only — no prices / brands / ROI% / dealer appendix.
// ===========================================================================

// SLIDE 2 — 5 ปัญหาที่ผู้บริหารท้องถิ่นนอนไม่หลับ
function Slide02() {
  const pains = [
    { icon: '🚨', title: 'ล้ม–เสียชีวิตคาบ้าน', desc: 'ผู้สูงอายุอยู่ลำพังตอนกลางวัน ล้มหรือวูบ กว่าจะมีคนเดินมาเจอก็สายเกินไป' },
    { icon: '📞', title: 'แจ้งแล้ว...ไม่มีคนไปถึง', desc: 'เตือนลอย ๆ แต่ไม่มีใครรับผิดชอบไปถึงตัวจริง เหตุค้างอยู่กลางทาง' },
    { icon: '📋', title: 'อสม. จมกองเอกสาร', desc: 'เดินเยี่ยมทุกหลัง จดมือ ตามแบบฟอร์ม งานล้นจนดูแลไม่ทั่วถึง' },
    { icon: '🚑', title: 'ต้นทุนรถกู้ชีพพุ่ง', desc: 'ออกเหตุเองทุกครั้ง มักเจอตอนอาการหนักแล้ว ภาระค่าใช้จ่ายสูงขึ้นเรื่อย ๆ' },
    { icon: '💸', title: 'อยากทำ แต่กลัวเบิกงบไม่ได้', desc: 'ไม่มั่นใจว่าใช้งบไหน เขียนสเปกอย่างไรไม่ให้ถูกท้วงว่าล็อกสเปก' },
  ];
  const span = ['1 / 3', '3 / 5', '5 / 7', '2 / 4', '4 / 6'];
  return (
    <Slide num={2}>
      <Eyebrow alert>ปัญหาที่ผู้บริหารท้องถิ่นนอนไม่หลับ</Eyebrow>
      <Title>5 เรื่องที่วิธีดูแลแบบเดิม ตามไม่ทัน</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        ทุกเรื่องจบลงที่คำถามเดียวกัน — "ระหว่างที่ยังไม่มีใครเห็น เกิดอะไรขึ้น และใครไปถึงตัวก่อน"
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 16, marginTop: 22, flex: 1, alignContent: 'center' }}>
        {pains.map((p, i) => (
          <Card key={i} style={{ gridColumn: span[i] }}>
            <CardIcon>{p.icon}</CardIcon>
            <CardTitle>{p.title}</CardTitle>
            <CardBody>{p.desc}</CardBody>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

// SLIDE 3 — แนวคิด: เราขาย "ระบบ" ไม่ใช่ "อุปกรณ์"
function Slide03() {
  const pillars = [
    { ic: '👵', t: 'คน', d: 'อุปกรณ์สวมใส่ + เซนเซอร์ในบ้าน เฝ้าระวังต่อเนื่อง 24 ชม. โดยไม่ต้องติดกล้อง' },
    { ic: '🔔', t: 'การตอบสนอง', d: 'ไม่ใช่แค่เตือน — แจ้งไล่ลำดับจนมีคนไปถึงตัวจริง และปิดเหตุได้' },
    { ic: '📊', t: 'ข้อมูล + งบ', d: 'ทุกเหตุการณ์เข้าระบบเอง บันทึกครบ ใช้ตอบสภาฯ และอ้างอิงประกอบการเบิกงบ' },
  ];
  return (
    <Slide num={3}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Eyebrow>แนวคิดของเรา</Eyebrow>
        <Title size={44}>เราขาย "ระบบ" ไม่ใช่ "อุปกรณ์"</Title>
        <Lead style={{ marginTop: 16, maxWidth: 960 }}>
          อุปกรณ์เป็นแค่จุดเริ่ม — สิ่งที่เทศบาลได้คือ <strong style={{ color: C.primary }}>ระบบที่ทำงานจนจบเหตุ</strong>
          ยืนอยู่บน 3 เสาที่ขาดเสาใดเสาหนึ่งไม่ได้
        </Lead>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 30 }}>
          {pillars.map((p, i) => (
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

// SLIDE 4 — ระบบเป็นชั้น: CORE / แนะนำเริ่มต้น / OPTIONAL
function Slide04() {
  const layers = [
    {
      tag: 'ชั้นโครงสร้างพื้นฐาน (CORE)', tagBg: C.primary,
      t: 'ขาดไม่ได้ — เป็นฐานของทุกอย่าง',
      items: ['ตัวรับกลางครอบพื้นที่', 'ศูนย์ดูแลของเทศบาล', 'ระบบบันทึก & แจ้งไล่ลำดับ'],
    },
    {
      tag: 'แนะนำเริ่มต้น', tagBg: '#4A7C59',
      t: 'เริ่มกับกลุ่มเสี่ยงสูงก่อน',
      items: ['นาฬิกาเฝ้าระวังหัวใจ + ปุ่ม SOS', 'ตัวจับการล้มติดเพดาน', 'เห็นผลจริงด้วยงบไม่มาก'],
    },
    {
      tag: 'OPTIONAL', tagBg: C.accent,
      t: 'เพิ่มทีหลังตามงบ ไม่ต้องรื้อ',
      items: ['ชุดวัดสุขภาพที่บ้าน', 'เซนเซอร์อากาศ / ประตู-หน้าต่าง', 'เซนเซอร์น้ำรั่ว / เสียง / อุณหภูมิ'],
    },
  ];
  return (
    <Slide num={4}>
      <Eyebrow>ออกแบบให้เริ่มน้อยก่อน</Eyebrow>
      <Title>ระบบเป็นชั้น — เริ่มน้อยก่อน เพิ่มทีหลังไม่ต้องรื้อ</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        ท่านไม่ต้องลงทุนทุกอย่างพร้อมกัน — วางฐานที่จำเป็นก่อน แล้วค่อยต่อยอดทีละชั้นเมื่อมั่นใจ
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 22, flex: 1, alignContent: 'center' }}>
        {layers.map((l, i) => (
          <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, padding: '20px 22px', display: 'flex', flexDirection: 'column' }}>
            <span style={{ alignSelf: 'flex-start', fontSize: 12.5, fontWeight: 700, color: '#FFF', background: l.tagBg, padding: '5px 14px', borderRadius: 100, marginBottom: 12 }}>{l.tag}</span>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: C.primaryDeep, lineHeight: 1.35, marginBottom: 12 }}>{l.t}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {l.items.map((it, j) => (
                <li key={j} style={{ fontSize: 14.5, color: C.text, lineHeight: 1.5, padding: '5px 0 5px 22px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.success, fontWeight: 800 }}>✓</span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Slide>
  );
}

// SLIDE 6 — Flow ติดตั้ง → แจ้งเหตุ 5 ขั้น (SVG)
function FiveStepFlowSvg() {
  const steps = [
    { ic: '🔧', t: 'ติดตั้ง', d: 'วางอุปกรณ์ + ตัวรับกลาง' },
    { ic: '👁️', t: 'เฝ้าระวัง', d: 'ดูแลต่อเนื่อง 24 ชม.' },
    { ic: '⚠️', t: 'เกิดเหตุ', d: 'จับการล้ม/สัญญาณผิดปกติ' },
    { ic: '🔔', t: 'แจ้งไล่ลำดับ', d: 'ส่งต่อจนมีคนรับ' },
    { ic: '✅', t: 'มีคนไปถึง', d: 'ช่วยถึงตัว + บันทึกเหตุ' },
  ];
  const xs = [12, 240, 468, 696, 924];
  const W = 184, Y = 30, H = 140;
  return (
    <svg viewBox="0 0 1120 200" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', width: '100%', height: 'auto', fontFamily: 'Sarabun, sans-serif' }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-flow5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={C.primary} />
        </marker>
      </defs>
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={xs[i]} y={Y} width={W} height={H} rx="16" fill={i === 3 ? C.accentSoft : '#FFF'} stroke={i === 3 ? C.accent : C.primary} strokeWidth={i === 3 ? 3 : 1.5} />
          <circle cx={xs[i] + W / 2} cy={Y + 38} r="22" fill={C.primarySoft} />
          <text x={xs[i] + W / 2} y={Y + 47} textAnchor="middle" fontSize="24">{s.ic}</text>
          <text x={xs[i] + W / 2} y={Y + 92} textAnchor="middle" fontSize="19" fontWeight="700" fill={C.primaryDeep}>{s.t}</text>
          <text x={xs[i] + W / 2} y={Y + 118} textAnchor="middle" fontSize="12.5" fill={C.textMuted}>{s.d}</text>
          {i < steps.length - 1 && (
            <line x1={xs[i] + W} y1={Y + H / 2} x2={xs[i + 1]} y2={Y + H / 2} stroke={C.primary} strokeWidth="2.5" markerEnd="url(#arrow-flow5)" />
          )}
        </g>
      ))}
    </svg>
  );
}

function FlowArrowH() {
  return <span style={{ fontSize: 20, color: C.primary, fontWeight: 800, flexShrink: 0 }}>→</span>;
}

function Slide06() {
  const layers = [
    { tag: 'ชั้นที่ 1', who: 'อสม. / เพื่อนบ้าน', via: 'แจ้งผ่าน LINE' },
    { tag: 'ชั้นที่ 2', who: 'เทศบาล + รพ.สต.', via: 'รับเหตุ + ส่งต่อ' },
    { tag: 'ชั้นที่ 3', who: 'กู้ชีพ 1669', via: 'เหตุหนัก/ไม่มีคนรับ' },
  ];
  return (
    <Slide num={6}>
      <Eyebrow>เส้นทางทำงานของระบบ</Eyebrow>
      <Title size={28}>จากติดตั้ง ถึงมีคนไปถึงตัว — และเบื้องหลังขั้น "แจ้งไล่ลำดับ"</Title>
      <div style={{ marginTop: 10, padding: '10px 18px', background: '#FFF', borderRadius: 16, border: `1px solid ${C.surfaceSoft}`, flexShrink: 0 }}>
        <FiveStepFlowSvg />
      </div>
      <div style={{ textAlign: 'center', fontSize: 13.5, fontWeight: 700, color: C.accent, margin: '10px 0 8px' }}>
        🔍 ซูมขั้นที่ 4 · แจ้งไล่ลำดับ 3 ชั้น จนกว่าจะมีคนไปถึงตัว
      </div>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 8 }}>
          <div style={{ flex: '0 0 130px', background: C.alertSoft, border: `2px solid ${C.alert}`, borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.alert }}>⚠ เกิดเหตุ</div>
            <div style={{ fontSize: 11.5, color: C.textMuted }}>ล้ม/กดปุ่ม/สัญญาณผิดปกติ</div>
          </div>
          {layers.map((l, i) => (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', alignItems: 'center' }}><FlowArrowH /></div>
              <div style={{ flex: 1, background: '#FFF', border: `2px solid ${C.primary}`, borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                <span style={{ alignSelf: 'center', fontSize: 11, fontWeight: 700, color: '#FFF', background: C.primary, padding: '2px 10px', borderRadius: 100, marginBottom: 5 }}>{l.tag}</span>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>{l.who}</div>
                <div style={{ fontSize: 11.5, color: C.textMuted }}>{l.via}</div>
              </div>
            </React.Fragment>
          ))}
          <div style={{ display: 'flex', alignItems: 'center' }}><FlowArrowH /></div>
          <div style={{ flex: '0 0 130px', background: C.successSoft, border: `2px solid ${C.success}`, borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.success }}>✓ มีคนไปถึง</div>
            <div style={{ fontSize: 11.5, color: C.textMuted }}>ปิดเหตุ + บันทึก</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, background: C.primarySoft, borderRadius: 10, padding: '8px 14px', fontSize: 12.5, color: C.text, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>👨‍👩‍👧</span> <strong style={{ color: C.primaryDeep }}>ครอบครัวรู้คู่ขนาน</strong> ทุกขั้น ไม่ต้องรอเทศบาลโทรตาม
          </div>
          <div style={{ flex: 1, background: C.accentSoft, borderRadius: 10, padding: '8px 14px', fontSize: 12.5, color: C.text, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>🔒</span> <strong style={{ color: C.accent }}>บันทึกแก้ย้อนหลังไม่ได้</strong> มีเวลา+ผู้รับผิดชอบทุกขั้น
          </div>
        </div>
      </div>
      <p style={{ fontSize: 11.5, color: C.textMuted, fontStyle: 'italic', marginTop: 8 }}>
        ระบบทำหน้าที่เฝ้าระวัง คัดกรอง และแจ้งเตือนเบื้องต้น · การวินิจฉัยและรักษาเป็นของบุคลากรการแพทย์
      </p>
    </Slide>
  );
}

// SLIDE 7 — ตัวรับกลาง 1 จุด ครอบทั้งหมู่บ้าน (LoRa workflow image + facts)
function Slide07() {
  const facts = [
    { ic: '📻', t: 'เหมือนวิทยุสื่อสารชุมชน', d: 'ตัวรับกลางตัวเดียวรับสัญญาณจากอุปกรณ์ทั้งหมู่บ้านเข้าศูนย์เดียว' },
    { ic: '🔗', t: '1 ตัวรับ รองรับได้มาก', d: 'รองรับอุปกรณ์ได้ราว 2,000 ชิ้น — ครอบทั้งตำบลด้วยจุดติดตั้งไม่กี่จุด' },
    { ic: '📍', t: 'รัศมีครอบคลุมกว้าง', d: 'ในเมืองราว 0.5–2 กม. · ชนบทราว 2–15 กม. (พื้นที่เปิดโล่ง ไม่มีสิ่งปลูกสร้างสูง)' },
  ];
  return (
    <Slide num={7}>
      <Eyebrow>โครงสร้างพื้นฐานที่ประหยัด</Eyebrow>
      <Title size={34}>ตัวรับกลาง 1 จุด ครอบทั้งหมู่บ้าน</Title>
      <div style={{ marginTop: 12, background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, padding: 4, overflow: 'hidden', flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={`${IMG}/LoRa_WorkFlow_V2.png`} alt="ภาพรวมการทำงาน: อุปกรณ์ส่งสัญญาณเข้าตัวรับกลาง (Gateway) → ประมวลผล → แดชบอร์ด/แจ้งเตือน" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 12 }}>
        {facts.map((f, i) => (
          <Card key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 18px' }}>
            <div style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{f.ic}</div>
            <div>
              <CardTitle style={{ fontSize: 16, marginBottom: 3 }}>{f.t}</CardTitle>
              <CardBody style={{ fontSize: 13 }}>{f.d}</CardBody>
            </div>
          </Card>
        ))}
      </div>
      <p style={{ fontSize: 11.5, color: C.textMuted, fontStyle: 'italic', marginTop: 8 }}>
        ตัวเลขรัศมีและจำนวนอุปกรณ์เป็นค่าประมาณตามสภาพแวดล้อม · ต้องสำรวจพื้นที่จริงก่อนออกแบบการติดตั้ง
      </p>
    </Slide>
  );
}

// SLIDE 8 — Hero ① ตัวจับการล้มติดเพดาน
function Slide08() {
  const features = [
    { ic: '📡', t: 'เซนเซอร์เพดาน ไม่ใช่กล้อง', d: 'ติดบนเพดาน มองเห็นแต่ "การเคลื่อนไหว" ไม่บันทึกภาพใบหน้า' },
    { ic: '🤕', t: 'จับการล้ม & การนิ่งผิดปกติ', d: 'รู้เมื่อล้ม ลุกไม่ขึ้น หรือออกจากเตียงแล้วนิ่งนานผิดปกติ' },
    { ic: '🌬️', t: 'เฝ้าจังหวะการหายใจตอนนอน', d: 'สังเกตจังหวะการหายใจ เป็นสัญญาณเฝ้าระวังเบื้องต้น' },
    { ic: '🚿', t: 'เฝ้าห้องน้ำได้ ไม่มีกล้อง', d: 'จุดเสี่ยงล้มที่สุด ดูแลได้โดยไม่ละเมิดความเป็นส่วนตัว' },
  ];
  return (
    <Slide num={8}>
      <Eyebrow accent>อุปกรณ์หลัก ① ป้องกันการล้ม</Eyebrow>
      <Title size={30} style={{ marginBottom: 0 }}>ตัวจับการล้มติดเพดาน — เฝ้าระวังโดยไม่ต้องมีกล้อง</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 18, marginTop: 12, flex: 1, minHeight: 0 }}>
        <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, padding: 14, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={`${IMG}/radar-technical.png`} alt="เซนเซอร์เรดาร์ติดเพดานตรวจจับการล้ม 3 แกน (ยืน/นั่ง/ล้ม) — ไม่ใช่กล้อง" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: '100%', objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
          <div style={{ background: C.primaryDeep, color: '#FFF', borderRadius: 14, padding: '12px 16px', flexShrink: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 6 }}>📐 ข้อมูลการติดตั้ง</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.65, color: 'rgba(255,255,255,0.92)' }}>
              • ติดเพดานสูง <strong style={{ color: '#FFF' }}>2.3–3 ม.</strong><br />
              • พื้นที่ตรวจจับ: สูง 2.3 ม. ≈ <strong style={{ color: '#FFF' }}>2×2 ม.</strong> · สูง 3 ม. ≈ <strong style={{ color: '#FFF' }}>4×5 ม.</strong><br />
              • พื้นที่ครอบคลุมแปรตามความสูงที่ติดตั้ง
            </div>
          </div>
          {features.map((f, i) => (
            <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 12, padding: '9px 14px', display: 'flex', gap: 12, alignItems: 'flex-start', flex: 1, minHeight: 0 }}>
              <div style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{f.ic}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>{f.t}</div>
                <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.4 }}>{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p style={{ fontSize: 11.5, color: C.textMuted, fontStyle: 'italic', marginTop: 8 }}>
        ระบบทำหน้าที่เฝ้าระวัง/คัดกรองเบื้องต้น ไม่ใช่การวินิจฉัย · ออกแบบตามหลักความเป็นส่วนตัว (PDPA)
      </p>
    </Slide>
  );
}

// SLIDE 9 — วิธีการทำงานของตัวจับการล้ม (radar fall workflow image + logic/use-cases)
function Slide08bWork() {
  return (
    <Slide num={9}>
      <Eyebrow accent>อุปกรณ์หลัก ① ป้องกันการล้ม</Eyebrow>
      <Title size={30}>ตัวจับการล้มทำงานอย่างไร</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: 18, marginTop: 12, flex: 1, minHeight: 0 }}>
        <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, padding: 14, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={`${IMG}/radar-fall-how.png`} alt="ขั้นตอน: ตรวจจับการล้ม → ส่งสัญญาณผ่าน LoRaWAN เข้า Gateway → ผู้ช่วยรับแจ้งเตือน → นำทางไปยังจุดเกิดเหตุ" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11, minHeight: 0 }}>
          <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 14, padding: '12px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.primaryDeep, marginBottom: 6 }}>🎯 ตรวจจับการล้มจากอะไร</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['จับการลดความสูงของร่างกายอย่างรวดเร็ว (ทรุด/ล้มลง)', 'ยืนยันด้วยการนิ่งอยู่กับพื้นนานตามเวลาที่กำหนด'].map((t, i) => (
                <li key={i} style={{ fontSize: 13, color: C.text, lineHeight: 1.45, padding: '3px 0 3px 20px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.primary, fontWeight: 800 }}>›</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: C.successSoft, border: `1px solid ${C.success}`, borderRadius: 14, padding: '12px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#3B6D11', marginBottom: 4 }}>✅ เหมาะกับห้องส่วนตัว / คนไม่พลุกพล่าน</div>
            <p style={{ fontSize: 12.5, color: C.text, lineHeight: 1.5 }}>
              ห้องนอน · ห้องน้ำ · ผู้สูงอายุอยู่คนเดียว · ห้องผู้ป่วย/สถานดูแล — แจ้งได้แม้มีหลายคน
              ตราบใดที่คนอื่นอยู่นิ่ง (เช่น คนหนึ่งนอนนิ่งบนเตียง อีกคนลุกไปห้องน้ำแล้วล้ม ➡️ แจ้งได้ถูกต้อง)
            </p>
          </div>
          <div style={{ background: C.accentSoft, border: `1px solid ${C.accent}`, borderRadius: 14, padding: '12px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#854F0B', marginBottom: 4 }}>⚠️ พื้นที่พลุกพล่าน → ใช้กล้อง AI แทน</div>
            <p style={{ fontSize: 12.5, color: C.text, lineHeight: 1.5 }}>
              พื้นที่สาธารณะ/เปิดที่มีคนเดินตลอด เรดาร์ไม่ตอบโจทย์การล้มหลายคนพร้อมกัน —
              แนะนำเปลี่ยนไปใช้กล้อง AI ตรวจจับการล้ม
            </p>
          </div>
        </div>
      </div>
      <p style={{ fontSize: 11.5, color: C.textMuted, fontStyle: 'italic', marginTop: 8 }}>
        ระบบทำหน้าที่เฝ้าระวัง/คัดกรองเบื้องต้น ไม่ใช่การวินิจฉัย · ออกแบบตามหลักความเป็นส่วนตัว (PDPA)
      </p>
    </Slide>
  );
}

// SLIDE 10 — ตรวจจับการล้ม: เสริมอีก 2 วิธี (กล้อง AI + อุปกรณ์สวมใส่)
function Slide09Fall() {
  const cards = [
    { img: 'pillar-cctv.jpg', tag: '🏙️ พื้นที่ส่วนกลาง / สาธารณะ', t: 'กล้อง AI ตรวจจับการล้ม', d: 'ต่อยอดกล้อง CCTV เดิม จับภาพคนล้ม/นอนนิ่งในพื้นที่ส่วนกลาง แล้วแจ้งเตือนทันที' },
    { img: 'pillar-wearable.jpg', tag: '⌚ เมื่อออกนอกบ้าน', t: 'อุปกรณ์สวมใส่ตรวจจับการล้ม', d: 'นาฬิกา/สายรัดข้อมือจับการล้มขณะสวมใส่ มีปุ่ม SOS และระบุพิกัด แจ้งถึงผู้ดูแลทันที' },
  ];
  return (
    <Slide num={9}>
      <Eyebrow accent>อุปกรณ์หลัก ① ป้องกันการล้ม (ต่อ)</Eyebrow>
      <Title size={32}>ตรวจจับการล้มได้ทุกที่ — เสริมอีก 2 วิธี</Title>
      <Lead style={{ marginTop: 6, fontSize: 16, maxWidth: 1060 }}>
        นอกจากเรดาร์ติดเพดานในห้องส่วนตัว ยังเสริมการตรวจจับการล้มในพื้นที่ส่วนกลางและตอนออกนอกบ้าน
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 12, flex: 1, minHeight: 0 }}>
        {cards.map((c, i) => (
          <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, padding: 14, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <span style={{ alignSelf: 'flex-start', fontSize: 12, fontWeight: 700, color: C.primary, background: C.primarySoft, padding: '4px 12px', borderRadius: 100, marginBottom: 8 }}>{c.tag}</span>
            <div style={{ flex: 1, minHeight: 0, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.surfaceSoft }}>
              <img src={`${IMG}/${c.img}`} alt={c.t} style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: C.primaryDeep, lineHeight: 1.3, marginTop: 10 }}>{c.t}</h3>
            <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.45, marginTop: 3 }}>{c.d}</p>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11.5, color: C.textMuted, fontStyle: 'italic', marginTop: 8 }}>
        ในพื้นที่ส่วนกลางใช้กล้อง · ในห้องส่วนตัวไม่มีกล้อง (ใช้เรดาร์) · ระบบทำหน้าที่เฝ้าระวัง/แจ้งเตือนเบื้องต้น ไม่ใช่การวินิจฉัย
      </p>
    </Slide>
  );
}

// SLIDE 11 — Hero ② นาฬิกาวัด ECG — image (ซ้าย) + การ์ดโรคกระจายตามระดับอันตราย (ขวา)
function Slide10Watch() {
  // ระดับอันตราย: 🔴 แดง = ร้ายแรงสุด (ใหญ่สุด) · 🟠 ส้ม = เสี่ยงสูง · 🟡 เหลือง = เฝ้าระวัง
  // ตำแหน่ง/มุมเอียงตั้งใจให้ดูกระจายแบบสุ่ม (ไม่ใช่ grid) — พิกัด absolute ใน 1280×720 ที่จัดไม่ให้ทับกัน
  const cards = [
    { lvl: 'อันตรายสูงสุด', col: '#D92D20', bw: 3, w: 240, rot: -3, ts: 16.5, mt: 0,
      name: 'อัมพาต / เส้นเลือดสมองตีบ–แตก', sub: '(หัวใจเต้นพลิ้ว)', val: 'AFib · CHA₂DS₂-VASc' },
    { lvl: 'อันตรายสูงสุด', col: '#D92D20', bw: 3, w: 244, rot: 3, ts: 16.5, mt: 12,
      name: 'หัวใจวายเฉียบพลัน / วูบหมดสติ', sub: '', val: 'QT/QTc/QTcF · PR · QRS · PVC/Block' },
    { lvl: 'เสี่ยงสูง', col: '#F79009', bw: 2.5, w: 204, rot: -2.5, ts: 14.5, mt: 6,
      name: 'ออกซิเจนต่ำ / นอนกรนแล้วหยุดหายใจ', sub: '', val: 'SpO₂ · RR · Night RRV' },
    { lvl: 'เสี่ยงสูง', col: '#F79009', bw: 2.5, w: 202, rot: 2.5, ts: 14.5, mt: 16,
      name: 'เส้นเลือดแข็ง / เส้นเลือดตีบ', sub: '', val: 'PWV (arterial stiffness)' },
    { lvl: 'เฝ้าระวัง', col: '#EAB308', bw: 2, w: 174, rot: -3.5, ts: 13, mt: 2,
      name: 'เลือดลมไหลเวียนไม่ดี', sub: '(ปลายมือปลายเท้า)', val: 'PI (Perfusion Index)' },
    { lvl: 'เฝ้าระวัง', col: '#EAB308', bw: 2, w: 178, rot: 3, ts: 13, mt: 12,
      name: 'เครียดลงหัวใจ / พักผ่อนไม่พอ', sub: 'ดูความเป็นอยู่ (Non-medical)', val: 'HRV: SDNN/RMSSD/Stress' },
  ];
  return (
    <Slide num={11}>
      <Eyebrow accent>อุปกรณ์หลัก ② เฝ้าระวังหัวใจ</Eyebrow>
      <Title size={32} style={{ marginBottom: 0 }}>นาฬิกาวัดคลื่นไฟฟ้าหัวใจ (ECG)</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr', gap: 18, marginTop: 10, flex: 1, minHeight: 0 }}>
        <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, padding: 14, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={`${IMG}/ECG WATCH.png`} alt="นาฬิกาวัด ECG พร้อมแอป แสดงคลื่นไฟฟ้าหัวใจ อัตราการเต้นหัวใจ การหายใจ และออกซิเจน" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, gap: 6 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: C.primaryDeep, lineHeight: 1.2, letterSpacing: -0.3, flexShrink: 0 }}>
            รู้ก่อน ป้องกันได้<br /><span style={{ color: C.accent }}>ดีกว่าเสียใจภายหลัง</span>
          </h2>
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexWrap: 'wrap', gap: 11, alignContent: 'center', justifyContent: 'center' }}>
            {cards.map((c, i) => (
              <div key={i} style={{ width: c.w, marginTop: c.mt, transform: `rotate(${c.rot}deg)`, background: '#FFF', border: `${c.bw}px solid ${c.col}`, borderRadius: 14, padding: '8px 12px', boxShadow: '0 4px 13px rgba(0,0,0,0.10)', alignSelf: 'flex-start' }}>
                <span style={{ display: 'inline-block', fontSize: 9.5, fontWeight: 800, color: '#FFF', background: c.col, padding: '1.5px 8px', borderRadius: 100, marginBottom: 4 }}>{c.lvl}</span>
                <div style={{ fontSize: c.ts, fontWeight: 800, color: C.primaryDeep, lineHeight: 1.2 }}>{c.name}</div>
                {c.sub && <div style={{ fontSize: 10.5, color: C.textMuted, lineHeight: 1.2 }}>{c.sub}</div>}
                <div style={{ fontSize: 10, fontWeight: 600, color: c.col, marginTop: 3 }}>{c.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 8, flexWrap: 'wrap' }}>
        <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 4, background: C.primary, color: '#FFF', borderRadius: 10, padding: '5px 12px', fontWeight: 800 }}><span style={{ fontSize: 18 }}>2</span><span style={{ fontSize: 11 }}>นาที</span></span>
        <span style={{ fontSize: 12.5, color: C.text }}>วัดคัดกรองเร็ว · หากมีอาการน่าสงสัย แพทย์อาจให้สวมต่อเนื่อง</span>
        {[7, 14, 30].map((n) => (
          <span key={n} style={{ display: 'inline-flex', alignItems: 'baseline', gap: 3, background: C.primarySoft, color: C.primaryDeep, borderRadius: 10, padding: '5px 11px', fontWeight: 800 }}><span style={{ fontSize: 16 }}>{n}</span><span style={{ fontSize: 10.5 }}>วัน</span></span>
        ))}
        <span style={{ fontSize: 12.5, color: C.textMuted }}>ตามที่แพทย์วินิจฉัย</span>
      </div>
      <p style={{ fontSize: 11.5, color: C.textMuted, fontStyle: 'italic', marginTop: 8 }}>
        ค่าทั้งหมดเป็นการคัดกรอง/เฝ้าระวังเบื้องต้น (screening) ไม่ใช่การวินิจฉัยโรค · หากพบค่าผิดปกติ ต้องไปพบแพทย์เพื่อตรวจยืนยันและวินิจฉัยทุกครั้ง
      </p>
    </Slide>
  );
}

// SLIDE — ปุ่มกดฉุกเฉินอัจฉริยะ (Smart SOS Button) — image + 4 features (was air sensor)
function SlideSosButton() {
  const feats = [
    { t: 'แจ้งเตือนฉับไว ทันเหตุการณ์', en: 'Instant Alert', d: 'ส่งสัญญาณขอความช่วยเหลือพุ่งตรงเข้าแอปฯ มือถือ หรือระบบ Nurse Call ทันทีแบบเรียลไทม์ ลดความสูญเสียจากเหตุไม่คาดฝัน' },
    { t: '1 ปุ่ม รองรับ 3 คำสั่ง', en: 'Smart Actions', d: 'ตั้งค่าแยกได้ — กด 1 ครั้ง (เรียกทั่วไป/ขอน้ำ) · กด 2 ครั้ง (ต้องการคนพยุง) · กดค้าง (ฉุกเฉิน/หกล้ม) ช่วยให้ผู้ดูแลประเมินสถานการณ์ได้ถูกต้อง' },
    { t: 'กะทัดรัด พกพาง่าย ติดได้ทุกที่', en: 'Flexible Usage', d: 'ไร้สาย 100% — ใส่สายคล้องคอพกติดตัว หรือแปะกาวสองหน้าติดผนังห้องน้ำ หัวเตียง และจุดเสี่ยงต่าง ๆ ได้อิสระ' },
    { t: 'แบตเตอรี่สุดอึด ใช้งานยาวนาน', en: '5+ Years Battery', d: 'ไม่ต้องคอยชาร์จให้วุ่นวาย อายุแบตยาวกว่า 5 ปี ลดภาระซ่อมบำรุง (Maintenance-free)' },
  ];
  return (
    <Slide num={12}>
      <Eyebrow accent>อุปกรณ์ · ปุ่มฉุกเฉิน</Eyebrow>
      <Title size={32} style={{ marginBottom: 0 }}>ปุ่มกดฉุกเฉินอัจฉริยะ (Smart SOS Button)</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 20, marginTop: 12, flex: 1, minHeight: 0 }}>
        <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, padding: 14, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={`${IMG}/SOS_button.png`} alt="ปุ่มกดฉุกเฉินอัจฉริยะ ไร้สาย" style={{ display: 'block', maxWidth: '90%', maxHeight: '90%', width: 'auto', height: 'auto', objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 12, minHeight: 0 }}>
          {feats.map((f, i) => (
            <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 14, padding: '13px 16px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 15.5, fontWeight: 800, color: C.primaryDeep, lineHeight: 1.3 }}>{f.t}</h3>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, marginBottom: 5 }}>{f.en}</div>
              <p style={{ fontSize: 12.5, color: C.textMuted, lineHeight: 1.5 }}>{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// SLIDE 16 — อุปกรณ์เสริม: ตัวจับประตู-หน้าต่าง (with image)
function Slide16Door() {
  const points = [
    { ic: '🚪', t: 'รู้เมื่อเปิดผิดเวลา', d: 'แจ้งเตือนเมื่อประตู-หน้าต่างเปิดในเวลาที่ไม่ควร' },
    { ic: '🌙', t: 'กันผู้ป่วยสมองเสื่อมออกกลางดึก', d: 'ช่วยเฝ้าผู้สูงอายุที่อาจเดินออกจากบ้านโดยไม่รู้ตัว' },
    { ic: '🔋', t: 'แบตเตอรี่ใช้ได้หลายปี', d: 'ติดตั้งง่าย ไม่ต้องเดินสายไฟ ดูแลรักษาน้อย' },
  ];
  return (
    <Slide num={16}>
      <Eyebrow accent>อุปกรณ์เสริม (Optional)</Eyebrow>
      <Title>ตัวจับประตู-หน้าต่าง — รู้ทันเมื่อมีการเปิดผิดเวลา</Title>
      <Lead style={{ marginTop: 8, fontSize: 17, maxWidth: 1040 }}>
        เซนเซอร์ขนาดเล็กติดที่บานประตู-หน้าต่าง คอยเฝ้าการเข้า-ออกในจังหวะที่ควรระวัง
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 24, marginTop: 14, flex: 1, minHeight: 0, alignItems: 'center' }}>
        <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, padding: 14, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={`${IMG}/ตรวจจับประตูหน้าต่างเปิด_LoRa.png`} alt="เซนเซอร์ประตู-หน้าต่าง แจ้งเตือนเมื่อมีการเปิด" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: 12 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {points.map((p, i) => (
            <Card key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 30, lineHeight: 1, flexShrink: 0 }}>{p.ic}</div>
              <div>
                <CardTitle style={{ marginBottom: 4 }}>{p.t}</CardTitle>
                <CardBody>{p.d}</CardBody>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// SLIDE 16 — อุปกรณ์เสริม OPTIONAL อื่น ๆ
function Slide17Optional() {
  const sensors = [
    { img: 'Motion_sensor.png', t: 'การขยับตัว', d: 'เช็กว่าผู้สูงอายุขยับตัวตามกิจวัตรไหม — ไม่ขยับเลยตามเวลาที่ตั้ง ระบบแจ้งผู้ดูแล' },
    { img: 'Leak_detector.png', t: 'น้ำรั่ว', d: 'วางที่พื้นห้องน้ำ/ครัว เตือนทันทีเมื่อมีน้ำนอง กันลื่นล้ม' },
    { img: 'Sound_detector.png', t: 'ระดับเสียง', d: 'จับเสียงผิดปกติ เช่น เสียงล้มหรือเสียงร้องขอความช่วยเหลือ' },
    { ic: '🌡️', t: 'ตัววัดอากาศในห้อง', d: 'วัดร้อน/อับ/ฝุ่น แจ้งเตือนก่อนผู้สูงอายุทรุด' },
  ];
  return (
    <Slide num={17}>
      <Eyebrow accent>อุปกรณ์เสริม (Optional)</Eyebrow>
      <Title>เลือกเพิ่มเซนเซอร์ตามจุดเสี่ยงของแต่ละบ้าน</Title>
      <Lead style={{ marginTop: 8, fontSize: 17, maxWidth: 1040 }}>
        ทุกตัวทำงานบนระบบเดียวกัน — เพิ่มเฉพาะที่จำเป็น ไม่ต้องเปลี่ยนโครงสร้างเดิม
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginTop: 16, flex: 1, minHeight: 0, alignContent: 'center' }}>
        {sensors.map((s, i) => (
          <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, padding: 14, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ height: 116, borderRadius: 12, background: C.surfaceSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: 10, flexShrink: 0 }}>
              {s.img
                ? <img src={`${IMG}/${s.img}`} alt={s.t} style={{ maxWidth: '86%', maxHeight: '86%', width: 'auto', height: 'auto', objectFit: 'contain' }} />
                : <span style={{ fontSize: 56, lineHeight: 1 }}>{s.ic}</span>}
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: C.text, marginBottom: 5, lineHeight: 1.3 }}>{s.t}</h3>
            <p style={{ fontSize: 12.5, color: C.textMuted, lineHeight: 1.5 }}>{s.d}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

// SLIDE 17 — โครงสร้างพื้นฐาน: เน็ตหลุดข้อมูลไม่หาย
function Slide18Infra() {
  const points = [
    { ic: '🗼', t: 'ตัวรับกลางครอบทั้งตำบล', d: 'วางจุดรับกลางไม่กี่จุดก็ครอบคลุมอุปกรณ์ทั้งพื้นที่' },
    { ic: '💾', t: 'เน็ตหลุด ข้อมูลไม่หาย', d: 'อุปกรณ์เก็บข้อมูลไว้ก่อน แล้วส่งซ้ำเมื่อสัญญาณกลับมา' },
    { ic: '🔌', t: 'ทำงานต่อได้แม้เน็ตล่ม', d: 'การเฝ้าระวังและแจ้งเตือนในพื้นที่ยังเดินหน้าได้' },
  ];
  return (
    <Slide num={18}>
      <Eyebrow>เชื่อถือได้แม้สภาพไม่พร้อม</Eyebrow>
      <Title>โครงสร้างพื้นฐานที่ไม่ทิ้งใครไว้กลางทาง</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        ในพื้นที่จริง อินเทอร์เน็ตไม่ได้เสถียรเสมอ — ระบบจึงออกแบบให้ทำงานต่อได้และไม่ทำข้อมูลหาย
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 24, flex: 1, alignContent: 'center' }}>
        {points.map((p, i) => (
          <Card key={i}>
            <CardIcon>{p.ic}</CardIcon>
            <CardTitle>{p.t}</CardTitle>
            <CardBody>{p.d}</CardBody>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

// SLIDE 20 — ช่องทาง: Web Platform (หน่วยงาน) + LINE Mini App (ประชาชน)
function Slide20() {
  return (
    <Slide num={20}>
      <Eyebrow>2 ช่องทาง · เลือกตามผู้ใช้</Eyebrow>
      <Title>คนละช่องทาง สำหรับคนละบทบาท</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        เจ้าหน้าที่ใช้เครื่องมือที่ทำงานจริงจัง · ประชาชนใช้สิ่งที่มีอยู่แล้วในมือ ไม่ต้องเรียนรู้ใหม่
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 22, flex: 1, minHeight: 0 }}>
        <div style={{ background: '#FFF', border: `2px solid ${C.primary}`, borderRadius: 20, padding: '26px 28px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 44, lineHeight: 1, marginBottom: 12 }}>🖥️</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: C.primaryDeep, marginBottom: 4 }}>ฝั่งหน่วยงาน · Web Platform</h3>
          <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 14 }}>สำหรับเทศบาล · กองสาธารณสุข · รพ.สต.</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {['แดชบอร์ดภาพรวมสุขภาพชุมชน', 'รายงานสำหรับตอบสภาฯ และเบิกงบ', 'บันทึกการเข้าถึงข้อมูล (audit log) ตาม PDPA'].map((it, j) => (
              <li key={j} style={{ fontSize: 15, color: C.text, lineHeight: 1.5, padding: '6px 0 6px 22px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: C.success, fontWeight: 800 }}>✓</span>{it}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ background: '#FFF', border: `2px solid ${C.accent}`, borderRadius: 20, padding: '26px 28px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 44, lineHeight: 1, marginBottom: 12 }}>💬</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: C.primaryDeep, marginBottom: 4 }}>ฝั่งประชาชน · LINE Mini App</h3>
          <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 14 }}>สำหรับครอบครัว · อสม. · เพื่อนบ้าน</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {['ไม่ต้องโหลดแอปใหม่ ใช้ LINE ที่มีอยู่', 'รับแจ้งเหตุและสถานะผู้สูงอายุได้ทันที', 'กดยืนยันรับเหตุ / ส่งต่อได้ในไม่กี่จังหวะ'].map((it, j) => (
              <li key={j} style={{ fontSize: 15, color: C.text, lineHeight: 1.5, padding: '6px 0 6px 22px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: C.success, fontWeight: 800 }}>✓</span>{it}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ gridColumn: '1 / 3', background: C.primaryDeep, color: '#FFF', borderRadius: 20, padding: '16px 26px', display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ fontSize: 38, lineHeight: 1, flexShrink: 0 }}>🚑</div>
          <div>
            <h3 style={{ fontSize: 19, fontWeight: 800, marginBottom: 3 }}>เมื่อเกิดเหตุ — คนเข้าไปช่วยได้ทันที</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
              ผู้ช่วย / อสม. กด "ยืนยันรับเหตุ" ใน LINE Mini App → ระบบนำทางไปยังตัวผู้สูงอายุด้วย Google Map ทันที
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
}

// SLIDE 22 — Workflow ยืม-คืนหมุนเวียน
function Slide22() {
  const steps = [
    { n: 1, t: 'คัดคนเสี่ยงสูง', d: 'เลือกผู้สูงอายุกลุ่มเสี่ยงที่ควรเฝ้าระวังก่อน' },
    { n: 2, t: 'ยืมใช้ 7–30 วัน', d: 'ให้ยืมอุปกรณ์ในช่วงที่ต้องติดตามใกล้ชิด' },
    { n: 3, t: 'ดูผล & สรุป', d: 'รวบรวมข้อมูลเฝ้าระวังเพื่อวางแผนการดูแล' },
    { n: 4, t: 'คืน & ล้างข้อมูล', d: 'คืนอุปกรณ์ ล้างข้อมูลส่วนบุคคล หมุนเวียนสู่รายต่อไป' },
  ];
  return (
    <Slide num={22}>
      <Eyebrow accent>ใช้ทรัพยากรให้คุ้ม</Eyebrow>
      <Title>ยืม-คืนหมุนเวียน — ดูแลได้มากคน ด้วยอุปกรณ์ชุดเดียว</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        ไม่ต้องซื้อให้ทุกคนถาวร — หมุนเวียนอุปกรณ์ไปยังผู้ที่ต้องเฝ้าระวังในแต่ละช่วง เป็นบริการสาธารณะที่อ้างอิงประกอบการเบิกงบได้
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginTop: 24, flex: 1, alignContent: 'center' }}>
        {steps.map((s) => (
          <Card key={s.n} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <NumBadge n={s.n} />
            <CardTitle style={{ fontSize: 17, marginBottom: 0 }}>{s.t}</CardTitle>
            <CardBody style={{ fontSize: 13.5 }}>{s.d}</CardBody>
          </Card>
        ))}
      </div>
      <p style={{ fontSize: 12.5, color: C.primary, fontWeight: 600, marginTop: 10 }}>
        ดูแลผู้สูงอายุได้มากขึ้นด้วยอุปกรณ์เท่าเดิม · ทุกการคืนล้างข้อมูลส่วนบุคคลตามมาตรฐาน PDPA
      </p>
    </Slide>
  );
}

// SLIDE 24 — ช่วยแต่ละบทบาทในพื้นที่ (6 role)
function Slide24() {
  const roles = [
    { ic: '🧑‍⚕️', t: 'อสม.', d: 'ไปเฉพาะบ้านที่ระบบแจ้ง ไม่ต้องเดินตรวจทุกหลัง' },
    { ic: '🏥', t: 'รพ.สต.', d: 'เห็นแนวโน้มสุขภาพล่วงหน้า วางแผนดูแลตรงจุด' },
    { ic: '🏛️', t: 'กองสาธารณสุข', d: 'มีข้อมูลภาพรวมทั้งตำบล ใช้วางนโยบายและจัดงบ' },
    { ic: '👨‍👩‍👧', t: 'ญาติ / ครอบครัว', d: 'รับรู้สถานะผู้สูงอายุได้คู่ขนาน อุ่นใจแม้อยู่ไกล' },
    { ic: '👵', t: 'ผู้สูงอายุ', d: 'อยู่บ้านตัวเองได้อย่างปลอดภัย มีคนคอยเฝ้าระวัง' },
    { ic: '🏠', t: 'เจ้าของสถานดูแล', d: 'เฝ้าผู้สูงอายุหลายคนได้ทั่วถึง ลดภาระเจ้าหน้าที่' },
  ];
  return (
    <Slide num={24}>
      <Eyebrow>ได้ประโยชน์ทุกฝ่าย</Eyebrow>
      <Title>ระบบเดียว ช่วยแต่ละบทบาทในพื้นที่</Title>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 18, flex: 1, alignContent: 'center' }}>
        {roles.map((r, i) => (
          <Card key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 32, lineHeight: 1, flexShrink: 0 }}>{r.ic}</div>
            <div>
              <CardTitle style={{ fontSize: 17, marginBottom: 4 }}>{r.t}</CardTitle>
              <CardBody style={{ fontSize: 13.5 }}>{r.d}</CardBody>
            </div>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

// SLIDE 25 — ความเป็นส่วนตัว & ความรับผิด
function Slide25() {
  const points = [
    { ic: '🛡️', t: 'เฝ้าระวัง ไม่ใช่จับตา', d: 'ระบบดูแลความปลอดภัย ไม่ได้สอดส่องชีวิตประจำวัน' },
    { ic: '🚫', t: 'ไม่มีกล้องในห้องส่วนตัว', d: 'ใช้เซนเซอร์ที่เห็นการเคลื่อนไหว ไม่บันทึกภาพใบหน้า' },
    { ic: '🏛️', t: 'ข้อมูลเป็นของเทศบาล', d: 'จัดเก็บตามข้อตกลงคุ้มครองข้อมูล (DPA) เทศบาลเป็นเจ้าของข้อมูล' },
    { ic: '🧾', t: 'บันทึกทุกการตอบสนอง', d: 'ทุกการเข้าถึงและการส่งต่อมี audit log ตรวจสอบย้อนหลังได้' },
  ];
  return (
    <Slide num={25} dark>
      <Eyebrow dark>ความเป็นส่วนตัว & ความรับผิด</Eyebrow>
      <Title dark>ออกแบบมาให้ "วางใจได้" ตั้งแต่ต้น</Title>
      <Lead dark style={{ marginTop: 10, maxWidth: 1040 }}>
        เรื่องที่ครอบครัวและผู้บริหารกังวลที่สุด เราตอบไว้ในการออกแบบระบบ ไม่ใช่แค่คำพูด
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 22, flex: 1, alignContent: 'center' }}>
        {points.map((p, i) => (
          <Card key={i} dark>
            <CardIcon>{p.ic}</CardIcon>
            <CardTitle dark>{p.t}</CardTitle>
            <CardBody dark>{p.d}</CardBody>
          </Card>
        ))}
      </div>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', marginTop: 10 }}>
        ระบบทำหน้าที่เฝ้าระวัง/คัดกรองเบื้องต้น ไม่ใช่การวินิจฉัย · จัดเก็บและประมวลผลข้อมูลตามมาตรฐาน PDPA
      </p>
    </Slide>
  );
}

// SLIDE 26 — คำถามที่อยู่ในใจผู้บริหาร 4 ข้อ
function Slide26() {
  const qa = [
    { q: 'จะเป็นข่าวไหม ถ้าเกิดเหตุ?', a: 'ระบบมีบันทึกครบทุกขั้นว่าใครรับ-ส่งต่อเมื่อไร แสดงว่าเทศบาลดูแลเชิงรุก ไม่ใช่ปล่อยปละ' },
    { q: 'เบิกได้จริงไหม?', a: 'ออกแบบเป็นบริการสาธารณะที่มีรายงานและหลักฐานประกอบ ทีมงานช่วยจับคู่กับแหล่งงบที่เหมาะสม' },
    { q: 'เขียนสเปกไม่โดนท้วงล็อกสเปก?', a: 'ใช้ภาษาเชิงหน้าที่/คุณภาพ (เฝ้าระวัง · แจ้งเตือน · บันทึก) เปิดให้แข่งขันได้ ไม่ผูกยี่ห้อ' },
    { q: 'ระบบพลาด ใครรับผิดชอบ?', a: 'บทบาทชัดเจน — ระบบเฝ้าระวัง/แจ้งเตือน, เจ้าหน้าที่ตัดสินใจ, แพทย์วินิจฉัย ไม่มีภาระลอย' },
  ];
  return (
    <Slide num={26}>
      <Eyebrow>ตอบให้ก่อนถาม</Eyebrow>
      <Title>4 คำถามที่อยู่ในใจผู้บริหาร</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 18, flex: 1, alignContent: 'center' }}>
        {qa.map((x, i) => (
          <Card key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: C.primaryDeep, lineHeight: 1.4 }}>
              <span style={{ color: C.accent }}>Q{i + 1}.</span> {x.q}
            </h3>
            <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.55 }}>
              <span style={{ fontWeight: 700, color: C.primary }}>ตอบ:</span> {x.a}
            </p>
          </Card>
        ))}
      </div>
      <p style={{ fontSize: 12, color: C.textMuted, fontStyle: 'italic', marginTop: 10 }}>
        ทีมงานพร้อมช่วยตรวจสอบความเหมาะสมกับระเบียบจัดซื้อและแหล่งงบของแต่ละหน่วยงาน
      </p>
    </Slide>
  );
}

// SLIDE — Features ของ software · section divider ก่อนกลุ่มช่องทาง/แอป
function SlideFeatures() {
  return (
    <Slide num={23} dark>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: 60, marginBottom: 18 }}>💻</div>
        <Eyebrow dark>Software</Eyebrow>
        <h2 style={{ fontSize: 58, fontWeight: 800, color: '#FFF', letterSpacing: -0.5, lineHeight: 1.15 }}>Features ของ Software</h2>
        <Lead dark style={{ marginTop: 16, maxWidth: 820 }}>
          เครื่องมือฝั่งซอฟต์แวร์ที่ทำให้ทุกอย่างใช้งานได้จริง — แพลตฟอร์มหน่วยงาน · แอปภาคสนาม · ช่องทางถึงประชาชน
        </Lead>
      </div>
    </Slide>
  );
}

// SLIDE — ภาคผนวก · section divider ก่อนหน้าอธิบายศัพท์ (glossary)
function SlideAppendix() {
  return (
    <Slide num={31} dark>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 18 }}>📎</div>
        <Eyebrow dark>Appendix</Eyebrow>
        <h2 style={{ fontSize: 68, fontWeight: 800, color: '#FFF', letterSpacing: -0.5, lineHeight: 1.15 }}>ภาคผนวก</h2>
        <Lead dark style={{ marginTop: 16, maxWidth: 760 }}>
          อธิบายศัพท์และค่าที่วัดได้จากคลื่นหัวใจและสัญญาณสุขภาพ — สำหรับผู้สนใจรายละเอียดเชิงเทคนิค
        </Lead>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE — ภาพรวมวิธีแก้ 1 หน้า (Pain → Solution bridge) · องก์ 1
// วางหลังสไลด์ "5 ปัญหา" เพื่อเชื่อมจาก pain เข้าสู่ภาพรวมระบบก่อนลงรายละเอียด
// ---------------------------------------------------------------------------
function SlideOverview() {
  const cols = [
    { ic: '👁️', tag: 'เฝ้าระวัง', t: 'รู้ทันตั้งแต่ยังไม่สาย', d: 'เซนเซอร์ในบ้าน + อุปกรณ์สวมใส่ ดูแลต่อเนื่อง 24 ชม. จับการล้ม วูบ หรือสัญญาณผิดปกติ โดยไม่ต้องมีคนนั่งเฝ้า' },
    { ic: '🔔', tag: 'แจ้งไล่ลำดับ', t: 'มีคนไปถึงตัวจริง', d: 'ไม่ใช่แค่เตือนลอย ๆ — ระบบส่งต่อจาก อสม. → เทศบาล → 1669 จนกว่าจะมีคนรับเหตุและไปถึงผู้สูงอายุ' },
    { ic: '📊', tag: 'บันทึก & รายงาน', t: 'ใช้ตอบสภาฯ และเบิกงบ', d: 'ทุกเหตุการณ์เข้าระบบเอง บันทึกครบว่าใครรับ-ส่งต่อเมื่อไร เป็นหลักฐานเชิงรุกและอ้างอิงประกอบการของบประมาณ' },
  ];
  return (
    <Slide num={3}>
      <Eyebrow>ภาพรวมวิธีแก้</Eyebrow>
      <Title>3 อย่างที่ระบบทำให้ — ครบในหน้าเดียว</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        ก่อนลงรายละเอียดอุปกรณ์ ขอให้เห็นภาพรวมก่อนว่า เทศบาลได้อะไรจากระบบนี้ — ทำงานครบวงจรตั้งแต่รู้เหตุ จนปิดเหตุ และมีหลักฐาน
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 24, flex: 1, alignContent: 'center' }}>
        {cols.map((c, i) => (
          <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, padding: '24px 24px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <span style={{ position: 'absolute', top: 18, right: 20, fontSize: 22, fontWeight: 800, color: C.primarySoft }}>{i + 1}</span>
            <span style={{ fontSize: 40, lineHeight: 1, marginBottom: 12 }}>{c.ic}</span>
            <span style={{ alignSelf: 'flex-start', fontSize: 12.5, fontWeight: 700, color: '#FFF', background: C.primary, padding: '4px 14px', borderRadius: 100, marginBottom: 10 }}>{c.tag}</span>
            <h3 style={{ fontSize: 19, fontWeight: 800, color: C.primaryDeep, lineHeight: 1.3, marginBottom: 8 }}>{c.t}</h3>
            <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.55 }}>{c.d}</p>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12, color: C.textMuted, fontStyle: 'italic', marginTop: 12 }}>
        ระบบทำหน้าที่เฝ้าระวัง · คัดกรอง · แจ้งเตือน · บันทึก เท่านั้น — การวินิจฉัยและรักษาเป็นของบุคลากรการแพทย์
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE — ขั้นตอนเริ่มต้น (Next step · ไม่มีราคา) · องก์ 5 ก่อนปิด
// สอดคล้อง framework §5.1 ขั้น F — ไม่ขอ decision วันนั้น · นัด follow-up
// ---------------------------------------------------------------------------
function SlideHowToStart() {
  const steps = [
    { n: 1, t: 'สำรวจพื้นที่ + คัดกลุ่มเสี่ยง', d: 'ลงพื้นที่ดูสภาพจริง ร่วมคัดเลือกผู้สูงอายุกลุ่มเสี่ยงสูงที่ควรเริ่มก่อน' },
    { n: 2, t: 'นำร่องกลุ่มเล็กก่อน', d: 'เริ่มกับจำนวนไม่มาก วางฐานที่จำเป็น เห็นผลจริงด้วยงบไม่สูง' },
    { n: 3, t: 'ดูผล & ปรับร่วมกัน', d: 'ทบทวนเหตุการณ์ที่ระบบจับได้ ปรับการตั้งค่าให้เหมาะกับพื้นที่ของท่าน' },
    { n: 4, t: 'ขยายทีละชั้นตามงบ', d: 'มั่นใจแล้วค่อยต่อยอด เพิ่มอุปกรณ์/พื้นที่ได้ ไม่ต้องรื้อของเดิม' },
  ];
  return (
    <Slide num={31}>
      <Eyebrow>เริ่มต้นแบบไม่ต้องลงทุนทั้งหมดทีเดียว</Eyebrow>
      <Title>เริ่มอย่างไร — 4 ขั้น ไม่ผูกมัด</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        ท่านไม่ต้องตัดสินใจครั้งใหญ่วันนี้ — เริ่มจากเล็ก ๆ ที่เห็นผลจริงก่อน แล้วค่อยขยายเมื่อมั่นใจ
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginTop: 24, flex: 1, alignContent: 'center' }}>
        {steps.map((s) => (
          <Card key={s.n} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <NumBadge n={s.n} />
            <CardTitle style={{ fontSize: 17, marginBottom: 0 }}>{s.t}</CardTitle>
            <CardBody style={{ fontSize: 13.5 }}>{s.d}</CardBody>
          </Card>
        ))}
      </div>
      <p style={{ fontSize: 12.5, color: C.primary, fontWeight: 600, marginTop: 12 }}>
        ทีมงานพร้อมลงสำรวจพื้นที่และช่วยวางแผนการเริ่มที่เหมาะกับงบและบริบทของแต่ละหน่วยงาน
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// Deck Toolbar (print + jump-to-slide)
// ---------------------------------------------------------------------------

function Toolbar() {
  const [open, setOpen] = useState(false);
  // Pain · Benefit · Demo framing — ชื่อช่วยให้ sales รู้จุดประสงค์แต่ละสไลด์
  const titles = [
    // องก์ 1 — HOOK + คุณค่าสำหรับผู้บริหาร (5 สไลด์ front-load)
    '1 · 🚨 Pain · ผู้สูงอายุล้มในบ้านลำพัง',
    '2 · 🎯 ทำไมสำคัญ · 3 ฝ่ายได้อะไร (ผู้บริหาร·คนทำงาน·ประชาชน)',
    '3 · 🖥️ Demo · เห็นระบบจริงใน 30 วินาที (กดเล่นได้)',
    '4 · 📞 Trust · ระบบทำงานจนมีผู้รับสายจริง',
    '5 · 🧭 Bridge · ภาพรวมวิธีแก้ 1 หน้า',
    // องก์ 2 — เจาะลึกปัญหา + CONCEPT
    '6 · 🚨 Pain · 5 ปัญหาที่ผู้บริหารนอนไม่หลับ',
    '7 · ✨ Concept · ขาย "ระบบ" ไม่ใช่ "อุปกรณ์"',
    '8 · 🧱 Model · ระบบเป็นชั้น เริ่มน้อยก่อน',
    '9 · 🔧 How · 3 จุดข้อมูล สู่ศูนย์ใน 1 นาที',
    // องก์ 3 — HOW + DEVICES (proof ติด ECG)
    '10 · 🔄 Flow · 5 ขั้น + ซูมแจ้งไล่ลำดับ 3 ชั้น',
    '11 · 📡 Infra · ตัวรับกลาง 1 จุด ครอบหมู่บ้าน',
    '12 · 🛡️ Device · ตัวจับการล้มติดเพดาน (เรดาร์)',
    '13 · ⚙️ How · ตัวจับการล้มทำงานอย่างไร',
    '14 · 🎥 Device · การล้ม: กล้อง AI + อุปกรณ์สวมใส่',
    '15 · ⌚ Device · นาฬิกาวัด ECG',
    '16 · ❤️ Proof · เห็นคลื่นหัวใจจริงทุกจังหวะ',
    '17 · 🔬 Proof · วิเคราะห์ 3 ชั้น + ไฟสถานะ + รับรอง',
    '18 · 🩺 Benefit · แพทย์เห็นแนวโน้มล่วงหน้า',
    '19 · 🆘 Device · ปุ่มฉุกเฉินอัจฉริยะ (SOS)',
    '20 · 🚪 Option · ตัวจับประตู-หน้าต่าง',
    '21 · 🧩 Option · เซนเซอร์เสริมอื่น ๆ',
    '22 · 🔌 Infra · เน็ตหลุดข้อมูลไม่หาย',
    // องก์ 4 — SOFTWARE + TRUST
    '23 · 💻 Section · Features ของ software',
    '24 · 📊 Demo · Dashboard ทำงานจริง (เทศบาล & อสม.)',
    '25 · 💬 Channels · Web + LINE Mini App',
    '26 · 📱 Software · แอป OCR · ถ่ายไม่ต้องจด',
    '27 · ♻️ Workflow · ยืม-คืนหมุนเวียน',
    '28 · 🤝 Roles · ช่วยแต่ละบทบาท 6 ฝ่าย',
    '29 · 🎯 Roles · ใครทำหน้าที่อะไร (RACI)',
    '30 · 🔒 Trust · ความเป็นส่วนตัว & ความรับผิด',
    '31 · ❓ Objection · 4 คำถามในใจผู้บริหาร',
    // องก์ 5 — CLOSE + APPENDIX
    '32 · 🛠️ Support · เราอยู่ดูแลต่อเนื่อง',
    '33 · 🚀 Next · เริ่มอย่างไร 4 ขั้น',
    '34 · 🤝 Close · 3 คำถาม + ขั้นต่อไป',
    '35 · 📎 ภาคผนวก · Appendix',
    '36 · 📖 Glossary · ศัพท์ ECG/จังหวะหัวใจ',
    '37 · 📖 Glossary · ศัพท์ HRV/หลอดเลือด',
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
// ScrollDots — vertical dot indicator on right edge (jumps to slide on click)
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

// ---------------------------------------------------------------------------
// NEW · องก์ 1 — "3 ฝ่ายได้อะไร" (win slide สำหรับผู้บริหารที่เวลาน้อย)
// Outcome-framed: ผู้บริหารได้ "ผลงาน" — ปล่อยให้เชื่อมโยงเชิงการเมืองเอง
// (เลี่ยงคำเชิงเลือกตั้ง/ฐานเสียงบนสไลด์ ตามกฎ sensitive-framing)
// ---------------------------------------------------------------------------
function SlideWinThreeParties() {
  const parties = [
    {
      icon: '🏛️',
      who: 'ผู้บริหาร อปท.',
      head: 'ผลงานเชิงรุกที่จับต้องได้',
      points: [
        'ดูแลผู้สูงวัยถึงบ้าน — ลดเหตุเศร้าในพื้นที่ก่อนเกิด',
        'มีข้อมูล & เรื่องราวจริงไว้สื่อสารกับชุมชน',
        'ภาพลักษณ์ทันสมัย ใส่ใจคุณภาพชีวิตประชาชน',
      ],
    },
    {
      icon: '👷',
      who: 'เจ้าหน้าที่ & อสม.',
      head: 'เบาแรง ทำงานตรงจุด',
      points: [
        'ระบบชี้ว่าใครต้องเยี่ยมก่อน ไม่ต้องเดินตรวจทุกหลังทุกวัน',
        'ถ่ายรูปแทนการจด — ลดงานเอกสาร',
        'รับเหตุเฉพาะที่ระบบคัดกรองแล้วว่าจริง',
      ],
    },
    {
      icon: '👵',
      who: 'ประชาชน & ครอบครัว',
      head: 'อุ่นใจ ปลอดภัยแม้อยู่ลำพัง',
      points: [
        'ล้ม / ฉุกเฉิน มีคนรู้และช่วยได้ทัน',
        'ลูกหลานที่อยู่ไกลสบายใจ',
        'ได้รับการดูแลต่อเนื่อง ไม่ตกหล่น',
      ],
    },
  ];
  return (
    <Slide num={2}>
      <Eyebrow>ทำไมเรื่องนี้สำคัญกับผู้บริหาร</Eyebrow>
      <Title size={36}>ดูแลผู้สูงวัย "ก่อน" เกิดเหตุ — ได้ประโยชน์พร้อมกันทั้ง 3 ฝ่าย</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, marginTop: 22, flex: 1, minHeight: 0 }}>
        {parties.map((p, i) => (
          <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, padding: '22px 22px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 40, lineHeight: 1 }}>{p.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, color: C.primary, marginTop: 12, textTransform: 'uppercase' }}>{p.who}</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: C.primaryDeep, marginTop: 4, lineHeight: 1.3 }}>{p.head}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {p.points.map((pt, j) => (
                <li key={j} style={{ display: 'flex', gap: 9, fontSize: 14.5, color: C.text, lineHeight: 1.5 }}>
                  <span style={{ color: C.primary, fontWeight: 800, flexShrink: 0 }}>✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, background: C.primaryDeep, color: '#FFF', borderRadius: 14, padding: '14px 22px', fontSize: 16, fontWeight: 600, textAlign: 'center', lineHeight: 1.5 }}>
        เมื่อทั้งสามฝ่ายได้ประโยชน์พร้อมกัน ความสำเร็จของระบบก็กลายเป็น "ผลงานของผู้บริหาร" เอง
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// NEW · องก์ 1 — Demo CTA (เปิด mockup ระบบจริงตั้งแต่ต้น เพื่อสร้าง wow)
// ใช้ AppDemoModal เดิม (iframe ui/elderly_app.html · กดเล่นได้)
// ---------------------------------------------------------------------------
function SlideDemoCTA() {
  const [showDemo, setShowDemo] = useState(false);
  return (
    <Slide num={3}>
      {showDemo && <AppDemoModal onClose={() => setShowDemo(false)} />}
      <Eyebrow accent>เห็นของจริงก่อนตัดสินใจ</Eyebrow>
      <Title size={38}>ไม่ต้องจินตนาการ — เปิดระบบจริงดูได้ใน 30 วินาที</Title>
      <Lead style={{ marginTop: 12, maxWidth: 980 }}>
        นี่คือหน้าตาระบบที่ใช้งานจริง กดเล่นได้เลยตอนนี้ — เห็นว่าเจ้าหน้าที่และ อสม. ทำงานบนระบบนี้อย่างไร
      </Lead>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, width: '100%', maxWidth: 980 }}>
          {[
            { ic: '🗺️', t: 'แดชบอร์ดเทศบาล', d: 'ภาพรวมสุขภาพชุมชนรายพื้นที่' },
            { ic: '📲', t: 'แอป อสม. ภาคสนาม', d: 'เยี่ยมบ้าน · ถ่ายไม่ต้องจด' },
            { ic: '🔔', t: 'แจ้งเตือนเหตุจริง', d: 'ล้ม / ฉุกเฉิน ส่งถึงคนรับผิดชอบ' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 14, padding: '18px 18px', textAlign: 'center' }}>
              <div style={{ fontSize: 34, lineHeight: 1 }}>{c.ic}</div>
              <h4 style={{ fontSize: 16, fontWeight: 800, color: C.primaryDeep, marginTop: 10 }}>{c.t}</h4>
              <p style={{ fontSize: 13, color: C.textMuted, marginTop: 4, lineHeight: 1.45 }}>{c.d}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowDemo(true)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, background: C.primary, color: '#FFF', border: 'none', borderRadius: 14, padding: '18px 44px', fontFamily: 'inherit', fontSize: 20, fontWeight: 800, cursor: 'pointer', boxShadow: '0 6px 20px rgba(31,107,76,0.32)' }}
        >
          🖥️ เปิดดูระบบจริง (กดเล่นได้)
        </button>
        <p style={{ fontSize: 13, color: C.textMuted }}>กดปุ่มในระบบเพื่อทดลองได้ · ปิดแล้วกลับสู่การนำเสนอทันที</p>
      </div>
    </Slide>
  );
}

export default function ElderlyCareLegacy() {
  // Render order = page order. Page numbers run automatically (SlideCtx) from this array,
  // so inserting/reordering a slide only needs an edit here + titles[] below.
  const slides = [
    // องก์ 1 — HOOK + คุณค่าสำหรับผู้บริหารที่เวลาน้อย (front-load 5 สไลด์)
    // Pain → 3 ฝ่ายได้อะไร → เห็นระบบจริง (demo) → ระบบมีผู้รับสายจริง → ภาพรวม 1 หน้า
    Slide01, SlideWinThreeParties, SlideDemoCTA, Slide19Answer, SlideOverview,
    // องก์ 2 — เจาะลึกปัญหา + CONCEPT (สำหรับคนที่มีเวลาฟังต่อ)
    Slide02, Slide03, Slide04, Slide05Arch,
    // องก์ 3 — HOW + DEVICES (proof ติดกับ ECG)
    Slide06, Slide07, Slide08, Slide08bWork, Slide09Fall,
    Slide10Watch, Slide11Evidence, Slide12Analysis, Slide13Signals, SlideSosButton,
    Slide16Door, Slide17Optional, Slide18Infra,
    // องก์ 4 — SOFTWARE + TRUST
    SlideFeatures, Slide27Dash, Slide20, Slide21App, Slide22,
    Slide24, Slide23Raci, Slide25, Slide26,
    // องก์ 5 — CLOSE + APPENDIX
    Slide32Support, SlideHowToStart, Slide33Cta,
    SlideAppendix, Slide34Glossary, Slide35Glossary,
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
            <SlideCtx.Provider value={{ num: i + 1, total: slides.length }}>
              <ScaledSlide>
                <S />
              </ScaledSlide>
            </SlideCtx.Provider>
          </div>
        ))}
      </div>
    </>
  );
}
