import React, { useEffect, useState, useRef } from 'react';
import RotateHint from '../../components/RotateHint';

// ---------------------------------------------------------------------------
// CCTV+AI PitchDeck.jsx — Sales Pitch Deck (20 slides · 1280×720 · print-PDF ready)
// Design: Civic Trust palette (Forest #0F6E56 + Cream #FAF7EE + Amber #BA7517)
// Font: Sarabun
// Content: pain-first storytelling tailored to อปท. / เทศบาล executives
// Source: src/pages/CCTVAI.jsx + src/data/cctvAiApps.js
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

const IMG = 'images/cctv-ai';
const TOTAL_SLIDES = 20;

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

function Pill({ bg, color, children }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 12.5,
        fontWeight: 600,
        padding: '5px 12px',
        borderRadius: 100,
        background: bg,
        color,
      }}
    >
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Architecture Diagram (Camera → AI Box → Action)
// ---------------------------------------------------------------------------

function ArchitectureDiagram() {
  return (
    <svg viewBox="0 0 900 460" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: '100%', fontFamily: 'Sarabun, sans-serif' }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-cctv" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={C.primary} />
        </marker>
        <linearGradient id="grad-cctv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.primary} />
          <stop offset="100%" stopColor={C.primaryDeep} />
        </linearGradient>
      </defs>

      <text x="20" y="36" fontSize="12" fontWeight="600" fill={C.textMuted} letterSpacing="1.5">CAMERA (เดิม)</text>
      <text x="20" y="230" fontSize="12" fontWeight="600" fill={C.textMuted} letterSpacing="1.5">AI BOX (ในตู้)</text>
      <text x="20" y="410" fontSize="12" fontWeight="600" fill={C.textMuted} letterSpacing="1.5">ACTION</text>

      {[
        { x: 130, label: '📹 กล้องเดิม', sub: 'IP/Analog ที่หน่วยงานมี', detail: 'ไม่ต้องเปลี่ยน · ใช้สายเดิม' },
        { x: 380, label: '🚦 กล้องริมถนน', sub: 'Traffic · Public area', detail: 'ทุกยี่ห้อ · ทุก software' },
        { x: 630, label: '🏛️ กล้องในเขต', sub: 'ตลาด · สวน · ลานจอด', detail: 'รวมเข้าระบบเดียว' },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="56" width="200" height="120" rx="14" fill="#FFF" stroke={C.primary} strokeWidth="1.5" />
          <text x={s.x + 100} y="94" textAnchor="middle" fontSize="22" fontWeight="600" fill={C.text}>{s.label}</text>
          <text x={s.x + 100} y="124" textAnchor="middle" fontSize="14" fontWeight="600" fill={C.primary}>{s.sub}</text>
          <text x={s.x + 100} y="148" textAnchor="middle" fontSize="12" fill={C.textMuted}>{s.detail}</text>
          <line x1={s.x + 100} y1="178" x2={s.x + 100} y2="232" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-cctv)" />
        </g>
      ))}

      <rect x="130" y="232" width="700" height="100" rx="14" fill="url(#grad-cctv)" />
      <text x="480" y="270" textAnchor="middle" fontSize="20" fontWeight="700" fill="#FFF">AI Box · ตั้งในตู้ของหน่วยงาน</text>
      <text x="480" y="296" textAnchor="middle" fontSize="13" fill="#FFF" opacity="0.85">วิเคราะห์ภาพแบบ real-time · ไม่ส่งภาพออกนอกองค์กร · บันทึก audit log ครบ</text>
      <text x="480" y="316" textAnchor="middle" fontSize="11" fill="#FFF" opacity="0.7">ปลอดภัย PDPA · ภาพอยู่ในไทย · จัดเก็บที่ตู้ภายในหน่วยงาน</text>

      <line x1="220" y1="332" x2="220" y2="385" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-cctv)" />
      <line x1="480" y1="332" x2="480" y2="385" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-cctv)" />
      <line x1="740" y1="332" x2="740" y2="385" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-cctv)" />

      {[
        { x: 130, label: '📱 LINE OA', sub: 'แจ้งเหตุเข้ามือถือทันที' },
        { x: 380, label: '📊 Dashboard', sub: 'ผู้บริหารเห็นภาพรวม' },
        { x: 630, label: '🚓 ส่งต่อ ตร./กู้ภัย', sub: 'หลักฐานพร้อมส่ง' },
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

      .slide-wrapper { display: flex; justify-content: center; margin: 0 auto 24px; }

      /* Mobile — keep right-edge nav dots from overlapping the slide on narrow screens,
         and let the dot column scroll instead of overflowing when there are many slides */
      .scroll-dots { right: max(14px, env(safe-area-inset-right, 14px)) !important; max-height: calc(100dvh - 120px); overflow-y: auto; scrollbar-width: none; }
      .scroll-dots::-webkit-scrollbar { display: none; }
      @media (max-width: 700px) { .scroll-dots { display: none !important; } }
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
  const computeScale = () => {
    if (typeof window === 'undefined') return 1;
    const targetW = 1280;
    const targetH = 720;
    // visualViewport.height excludes mobile browser chrome (address bar) — falls back to innerHeight
    const vh = window.visualViewport?.height ?? window.innerHeight;
    const availableW = Math.max(window.innerWidth - 32, 320);
    const availableH = Math.max(vh - 160, 320);
    return Math.min(availableW / targetW, availableH / targetH, 1);
  };
  const [scale, setScale] = useState(computeScale);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const apply = () => setScale(computeScale());
    apply();
    window.addEventListener('resize', apply);
    window.addEventListener('orientationchange', apply);
    window.visualViewport?.addEventListener('resize', apply);
    return () => {
      window.removeEventListener('resize', apply);
      window.removeEventListener('orientationchange', apply);
      window.visualViewport?.removeEventListener('resize', apply);
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

function Slide01({ num }) {
  return (
    <Slide num={num} dark>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32, height: '100%' }}>
        {/* Text — left 38% */}
        <div style={{ width: '38%', flexShrink: 0 }}>
          <Eyebrow dark>หน่วยงานท่าน · CCTV + AI</Eyebrow>
          <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.4, color: '#FFF', letterSpacing: -0.5 }}>
            กล้องเดิมที่หน่วยงานมี<br />
            ไว้ดูภาพย้อนหลัง<br />
            <span style={{ color: C.surfaceSoft }}>ไม่แจ้งเตือนตอนเกิดเหตุ</span>
          </h1>
          <Lead dark style={{ marginTop: 22, fontSize: 18 }}>
            หน่วยงานลงทุนกล้องไปเยอะแล้ว — แต่ตอนมีเหตุก็ยังต้องนั่ง replay หลายชั่วโมง
            ตอบประชาชนได้ไม่ครบ ขณะที่กล้องคนละยี่ห้อก็ใช้ software คนละตัว ดูร่วมกันไม่ได้
          </Lead>
        </div>

        {/* Image — right side, contained inside slide padding */}
        <div style={{ flex: 1, height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Soft glow backdrop */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at center, rgba(29, 158, 117, 0.18) 0%, rgba(10, 31, 61, 0) 70%)`,
            pointerEvents: 'none',
          }} />
          <img
            src={`${IMG}/Hero_image_cctv_ai_hero.png`}
            alt="CCTV + AI"
            style={{
              display: 'block',
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
              position: 'relative',
              borderRadius: 12,
            }}
          />
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 2 — 3 Pain Points
// ---------------------------------------------------------------------------

function Slide02({ num }) {
  const pains = [
    { icon: '👀', title: 'กล้องเยอะ · ไม่มีคนนั่งดู 24 ชั่วโมง', desc: 'ติดกล้องไว้หลายสิบจุด — แต่ไม่มีเจ้าหน้าที่นั่งจ้องตลอดเวลา · เห็นแต่ "หลังเหตุ" ไม่เคยจับสังเกตได้ทันที' },
    { icon: '⏱️', title: 'Replay หาภาพ · เสียเวลาทั้งวัน', desc: 'เวลามีเหตุ ต้องไล่ดูทีละกล้อง ทีละช่วงเวลา · ใช้คน 2-3 คน นั่งดูครึ่งวัน กว่าจะเจอภาพที่ต้องการ' },
    { icon: '🧩', title: 'หลายยี่ห้อ · ใช้ software คนละตัว', desc: 'กล้องของเก่าจากผู้รับเหมาคนเดิม + ของใหม่ปะปนกัน — แต่ละยี่ห้อใช้ app คนละตัว ดูร่วมกันไม่ได้' },
    { icon: '📋', title: 'ประชาชนร้องเรียน · ตอบไม่ครบ', desc: 'ขยะลักลอบทิ้ง · พื้นที่ถูกบุกรุก · ชนแล้วหนี — มีกล้องอยู่ แต่หาภาพไม่เจอ ตอบประชาชนไม่ทัน' },
  ];
  return (
    <Slide num={num}>
      <Eyebrow alert>ปัญหาที่หน่วยงานเจอจริง</Eyebrow>
      <Title>"มีกล้องเยอะ · แต่ยังตอบคำถามไม่ได้"</Title>
      <Lead style={{ marginTop: 12, maxWidth: 1020 }}>
        หน่วยงานลงทุนกล้องไปแล้ว — แต่กล้องที่มี ยังตอบโจทย์ของหน่วยงานไม่ครบ
        คำถามคือ ทำอย่างไรให้กล้องเดิม ทำงานได้มากกว่า "ดูย้อนหลัง"?
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
// SLIDE 3 — แนวทางใหม่ "AI Box"
// ---------------------------------------------------------------------------

function Slide03({ num }) {
  return (
    <Slide num={num}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Eyebrow>แนวทางใหม่</Eyebrow>
        <Title size={44}>
          เพิ่ม AI Box ที่ตู้ของหน่วยงาน<br />กล้องเดิมก็แจ้งเหตุเองได้
        </Title>
        <Lead style={{ marginTop: 18, maxWidth: 940 }}>
          ไม่ต้องเปลี่ยนกล้องทั้งระบบ — เราต่อ AI Box เข้ากับกล้องเดิมที่หน่วยงานมี
          กล้องจะวิเคราะห์ภาพแบบ real-time และ <strong style={{ color: C.primary }}>แจ้งเตือนทันทีเมื่อเกิดเหตุ</strong>
          ส่งหลักฐานเข้า LINE OA และ <strong style={{ color: C.primary }}>เก็บไว้พร้อมตอบประชาชน</strong>
        </Lead>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 32 }}>
          {[
            { ic: '📹', t: 'ใช้กล้องเดิม', d: 'ทุกยี่ห้อ · ทุก software · ไม่ต้องซื้อกล้องใหม่' },
            { ic: '🧠', t: 'AI Box ที่ตู้หน่วยงาน', d: 'วิเคราะห์ภาพ real-time · ภาพไม่ออกองค์กร · PDPA-safe' },
            { ic: '⚡', t: 'แจ้งเตือนทันที', d: 'LINE OA + Dashboard + ส่งต่อ ตร./กู้ภัย ในระบบเดียว' },
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
// SLIDE 4 — Architecture
// ---------------------------------------------------------------------------

function Slide04({ num }) {
  return (
    <Slide num={num}>
      <Eyebrow>ระบบทำงานอย่างไร</Eyebrow>
      <Title size={36}>จากกล้องเดิม สู่การแจ้งเหตุใน 5 วินาที</Title>
      <Lead style={{ marginTop: 6, marginBottom: 4, fontSize: 17 }}>
        รวมกล้องทุกยี่ห้อในเขต เข้า AI Box ที่ตู้หน่วยงาน · วิเคราะห์ภาพ real-time · แจ้งเหตุ LINE OA และ Dashboard ทันที
      </Lead>
      <div style={{ marginTop: 10, padding: '12px 18px', background: '#FFF', borderRadius: 18, border: `1px solid ${C.surfaceSoft}`, flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ArchitectureDiagram />
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 5 — Hardware (AI Box + กล้องเดิม)
// ---------------------------------------------------------------------------

function HardwareCard({ ic, t, d, s }) {
  return (
    <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 16, padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ fontSize: 30, lineHeight: 1, flexShrink: 0 }}>{ic}</div>
      <div>
        <h4 style={{ fontSize: 16, fontWeight: 700, color: C.primary, marginBottom: 4, lineHeight: 1.25 }}>{t}</h4>
        <p style={{ fontSize: 12.5, color: C.textMuted, lineHeight: 1.45, marginBottom: 6 }}>{d}</p>
        <span style={{ display: 'inline-block', fontSize: 11.5, fontWeight: 600, color: C.accent, background: C.accentSoft, padding: '3px 9px', borderRadius: 100 }}>{s}</span>
      </div>
    </div>
  );
}

function Slide05({ num }) {
  const items = [
    { ic: '📹', t: 'กล้องเดิมของหน่วยงาน', d: 'ใช้กล้อง IP/Analog ที่ติดอยู่แล้ว · ทุกยี่ห้อ · ผ่าน RTSP/ONVIF', s: 'ไม่ต้องซื้อใหม่' },
    { ic: '🧠', t: 'AI Box (Edge GPU)', d: 'กล่องประมวลผลตั้งในตู้อุปกรณ์ของหน่วยงาน · ภาพไม่ออกองค์กร', s: 'PDPA-safe · ภาพในไทย' },
    { ic: '🌐', t: 'Network Switch + Storage', d: 'รวมสาย LAN จากกล้องเข้า Switch · เก็บภาพย้อนหลังที่ NVR', s: 'ใช้ network เดิม' },
    { ic: '📱', t: 'LINE OA + Dashboard', d: 'แจ้งเตือนเข้า LINE OA ของหน่วยงาน · ผู้บริหารเปิด Dashboard ดูภาพรวม', s: 'ดูบนมือถือได้' },
  ];
  return (
    <Slide num={num}>
      <Eyebrow accent>อุปกรณ์ที่หน่วยงานได้</Eyebrow>
      <Title>ติดตั้งง่าย · ไม่กระทบระบบเดิม</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        ทีมงานเข้ามาเพิ่มแค่ AI Box ที่ตู้หน่วยงานและตั้งค่าเชื่อมกับกล้องเดิม
        ติดตั้งจริงประมาณ 1 วัน · ระบบกล้องเดิมยังใช้งานได้ตามเดิม
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '0.78fr 1fr 1fr', gap: 16, marginTop: 14, flex: 1, alignContent: 'center' }}>
        <div style={{ borderRadius: 18, overflow: 'hidden', background: C.primarySoft, height: '100%', display: 'flex' }}>
          <img src={`${IMG}/App-06_hero.png`} alt="AI Box + กล้องเดิม" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 14 }}>
          {items.slice(0, 2).map((d, i) => (<HardwareCard key={i} {...d} />))}
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 14 }}>
          {items.slice(2, 4).map((d, i) => (<HardwareCard key={i} {...d} />))}
        </div>
      </div>
      <p style={{ fontSize: 12.5, color: C.primary, fontWeight: 600, marginTop: 10 }}>
        AI Box ทำหน้าที่ "จับเหตุการณ์เบื้องต้น" แล้วส่งให้เจ้าหน้าที่ตัดสินใจ — ระบบไม่ตัดสินใจเอง
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 6 (NEW) — สำรวจการติดตั้ง · แนวทาง A vs แนวทาง B
// ---------------------------------------------------------------------------

function ArchFlow({ nodes, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 6 }}>
      {nodes.map((n, i) => (
        <React.Fragment key={i}>
          <div style={{
            flex: 1, background: n.highlight ? C.successSoft : '#FFF',
            border: `1.5px solid ${n.highlight ? C.success : C.surfaceSoft}`,
            borderRadius: 10, padding: '10px 8px', textAlign: 'center', minWidth: 0,
          }}>
            <div style={{ fontSize: 22, marginBottom: 3 }}>{n.ic}</div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: n.highlight ? '#27500A' : C.text, lineHeight: 1.3 }}>{n.t}</div>
            <div style={{ fontSize: 10, color: C.textMuted, lineHeight: 1.35, marginTop: 2 }}>{n.s}</div>
          </div>
          {i < nodes.length - 1 && (
            <div style={{ display: 'flex', alignItems: 'center', color: accent, fontSize: 20, fontWeight: 800, flexShrink: 0 }}>→</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function SlideInstallAB({ num }) {
  return (
    <Slide num={num}>
      <Eyebrow>สำรวจการติดตั้ง</Eyebrow>
      <Title size={32}>2 แนวทางในการเชื่อม AI กับกล้องเดิม</Title>
      <Lead style={{ marginTop: 4, marginBottom: 8, fontSize: 16 }}>
        เลือกตามลักษณะหน่วยงาน — ส่วนใหญ่เริ่มที่ <strong style={{ color: C.primary }}>แนวทาง A</strong> เพราะติดตั้งใน 1 วัน · ใช้กล้องเดิมต่อได้
      </Lead>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
        {/* แนวทาง A — RECOMMENDED */}
        <div style={{ background: '#FFF', border: `2px solid ${C.success}`, borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          <span style={{ position: 'absolute', top: 0, right: 0, background: C.success, color: '#FFF', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderBottomLeftRadius: 10 }}>★ แนะนำ</span>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: C.primaryDeep, marginBottom: 2, lineHeight: 1.35 }}>แนวทาง A · Server AI กลาง</h3>
          <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 10, lineHeight: 1.4 }}>กล้องเดิม → NVR → Server AI ในห้องของหน่วยงาน · stable · เริ่มได้ใน 1 วัน</p>

          <ArchFlow accent={C.primary} nodes={[
            { ic: '📹', t: 'กล้องเดิม', s: 'ของหน่วยงาน' },
            { ic: '📦', t: 'NVR', s: 'บันทึก + ดูเดิม' },
            { ic: '🧠', t: 'Server AI', s: 'อ่าน RTSP', highlight: true },
            { ic: '📊', t: 'Dashboard', s: 'แจ้งเตือน' },
          ]} />

          <div style={{ marginTop: 10, fontSize: 12.5, color: C.text, lineHeight: 1.55 }}>
            <p style={{ fontWeight: 700, color: C.success, marginBottom: 4, fontSize: 12.5 }}>✓ เหมาะกับ</p>
            <p style={{ marginBottom: 8 }}>ค้นย้อนหลัง · LPR · นับคน-รถ · งานที่ยอมรับ delay 1-2 วินาทีได้</p>
            <p style={{ fontWeight: 700, color: C.primary, marginBottom: 4, fontSize: 12.5 }}>จุดเด่น</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {[
                'ติดตั้งง่าย · ขอแค่ access NVR',
                'ไม่กระทบกล้อง / network เดิม',
                'ครอบคลุม use-case 80% ของ อปท.',
                'ขยายเพิ่ม app ผ่าน Server เดียว',
              ].map((b, i) => (
                <li key={i} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.5, padding: '2px 0 2px 16px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.success, fontWeight: 800 }}>✓</span>{b}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Pill bg={C.successSoft} color="#27500A">stable · ใช้จริง</Pill>
            <Pill bg={C.primarySoft} color={C.primary}>deploy 1 วัน</Pill>
            <Pill bg={C.primarySoft} color={C.primary}>ใช้กล้องเดิม</Pill>
          </div>
        </div>

        {/* แนวทาง B */}
        <div style={{ background: '#FFF', border: `2px solid ${C.accent}`, borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          <span style={{ position: 'absolute', top: 0, right: 0, background: C.accent, color: '#FFF', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderBottomLeftRadius: 10 }}>เคสเฉพาะ</span>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: C.primaryDeep, marginBottom: 2, lineHeight: 1.35 }}>แนวทาง B · Edge AI หน้างาน</h3>
          <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 10, lineHeight: 1.4 }}>กล่อง AI ติดที่จุดติดตั้ง · ประมวลผลที่หน้างาน · ส่งเฉพาะ event ขึ้น Server กลาง</p>

          <ArchFlow accent={C.accent} nodes={[
            { ic: '📷', t: 'กล้อง AI', s: 'มี chip ในตัว', highlight: true },
            { ic: '⚡', t: 'Edge AI', s: 'คิดที่จุดติดตั้ง', highlight: true },
            { ic: '📡', t: 'ส่ง Event', s: 'ไม่ส่งวิดีโอ' },
            { ic: '📊', t: 'Dashboard', s: 'Server เบา' },
          ]} />

          <div style={{ marginTop: 10, fontSize: 12.5, color: C.text, lineHeight: 1.55 }}>
            <p style={{ fontWeight: 700, color: C.accent, marginBottom: 4, fontSize: 12.5 }}>✓ เหมาะกับ</p>
            <p style={{ marginBottom: 8 }}>กล้องนอกอาคาร · พื้นที่กระจายไกล · เน็ตไม่เสถียร · ต้องการ real-time ทันที</p>
            <p style={{ fontWeight: 700, color: C.primary, marginBottom: 4, fontSize: 12.5 }}>จุดเด่น</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {[
                'Server กลางสเปกต่ำ · ระบบเบา',
                'Real-time ที่หน้างาน · เน็ตล่มไม่กระทบ',
                'Bandwidth ต่ำ · ส่งเฉพาะ event',
                'ขยายทีละจุด · 1 จุด = 1 ตัว',
              ].map((b, i) => (
                <li key={i} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.5, padding: '2px 0 2px 16px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.success, fontWeight: 800 }}>✓</span>{b}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Pill bg={C.accentSoft} color={C.accent}>outdoor</Pill>
            <Pill bg={C.accentSoft} color={C.accent}>real-time</Pill>
            <Pill bg={C.surfaceSoft} color={C.textMuted}>กล้อง AI ใหม่</Pill>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 11.5, color: C.textMuted, fontStyle: 'italic', marginTop: 8 }}>
        ทีมงานทำ Site Survey ฟรี · ตรวจกล้องเดิม + เครือข่าย + ห้อง Server แล้วแนะนำแนวทางที่ตรงหน่วยงาน
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 7 (NEW) — ตัวอย่าง use-case · LPR ค้นทะเบียนข้ามกล้อง
// ---------------------------------------------------------------------------

function SlideLPRUseCase({ num }) {
  return (
    <Slide num={num}>
      <Eyebrow accent>ตัวอย่าง use-case</Eyebrow>
      <Title size={30}>LPR · พิมพ์ทะเบียน → ระบบบอกได้ทันทีว่ารถผ่านกล้องไหน</Title>
      <Lead style={{ marginTop: 4, marginBottom: 10, fontSize: 16 }}>
        ตัวอย่างการทำงานจริง · เห็นว่า "AI กับกล้อง" ทำงานในชีวิตจริงยังไง — ใช้ได้กับงานสืบสวน · จัดเก็บค่าจอด · วินัยจราจร
      </Lead>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, flex: 1, minHeight: 0 }}>
        {/* Left — Pain → Solution + 3 steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          {/* Before / After */}
          <div style={{ background: C.primaryDeep, color: '#FFF', borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 10, alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,.08)', borderRadius: 10, padding: '10px 12px' }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,.65)', letterSpacing: 1.5, marginBottom: 3 }}>ก่อนใช้</div>
                <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>"กล้องเยอะ ไม่มีคนนั่งดู — เวลามีเหตุ ต้องกดดูทีละกล้อง"</div>
              </div>
              <div style={{ fontSize: 22, color: C.accent, fontWeight: 800 }}>→</div>
              <div style={{ background: 'rgba(255,255,255,.08)', borderRadius: 10, padding: '10px 12px' }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,.65)', letterSpacing: 1.5, marginBottom: 3 }}>หลังใช้</div>
                <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>"พิมพ์ทะเบียน → ระบบบอกได้ทันทีว่ารถผ่านกล้องตัวไหน เวลาเท่าไหร่"</div>
              </div>
            </div>
          </div>

          {/* 3 steps */}
          <div style={{ background: '#FFF', borderRadius: 14, padding: '14px 18px', border: `1px solid ${C.surfaceSoft}`, flex: 1, minHeight: 0 }}>
            <h4 style={{ fontSize: 14, fontWeight: 800, color: C.primaryDeep, marginBottom: 10 }}>3 ขั้นตอนของระบบ</h4>
            {[
              { n: 1, t: 'เจ้าหน้าที่พิมพ์ทะเบียน', d: 'เช่น "คส 7290" ในหน้า Search ของ Dashboard' },
              { n: 2, t: 'ระบบสแกนภาพย้อนหลังทุกกล้อง', d: 'AI อ่านป้ายทุกเฟรม · คัดเฉพาะคันที่ตรงกัน' },
              { n: 3, t: 'แสดงเวลา + กล้องที่พบ + เส้นทาง', d: 'CAM2 · 19:30 — พร้อมแผนที่การเคลื่อนที่' },
            ].map((s) => (
              <div key={s.n} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: C.primary, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12.5, fontWeight: 800, flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: C.text, lineHeight: 1.35 }}>{s.t}</div>
                  <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.45 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Video demo + PDPA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
          <div style={{ background: '#000', borderRadius: 14, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, boxShadow: `0 6px 24px ${C.primaryDeep}33` }}>
            <div style={{ flex: 1, minHeight: 0, display: 'flex', background: '#000' }}>
              <video
                src="videos/lpr-demo.mp4"
                poster="videos/lpr-poster.jpg"
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
              >
                เบราว์เซอร์ของท่านไม่รองรับการเล่นวิดีโอ
              </video>
            </div>
            <div style={{ background: C.primaryDeep, color: '#FFF', padding: '8px 14px', fontSize: 11.5, lineHeight: 1.5 }}>
              <strong style={{ color: C.accent }}>วิธีอ่าน:</strong> เจ้าหน้าที่พิมพ์ทะเบียน "คส 7290" → ระบบสแกนภาพย้อนหลังทุกกล้อง → แสดงรายละเอียดผู้ครอบครอง + กล้องที่พบ (CAM2 · 19:30 น.)
            </div>
          </div>

          <div style={{ background: C.accentSoft, borderLeft: `4px solid ${C.accent}`, borderRadius: 10, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18, color: C.accent, flexShrink: 0 }}>🛡️</span>
            <div style={{ fontSize: 11.5, color: C.text, lineHeight: 1.5 }}>
              <strong style={{ color: C.accent }}>PDPA:</strong> ข้อมูลผู้ครอบครองเป็นข้อมูลส่วนบุคคล · ต้องมี audit log การเข้าถึง · ระยะเวลาเก็บข้อมูลและสิทธิ์ใช้งานประกาศชัดตามนโยบายของหน่วยงาน
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 8 — Apps Catalog Overview (เดิมคือ Slide 6)
// ---------------------------------------------------------------------------

function Slide06({ num }) {
  const apps = [
    { ic: '🛡️', t: 'พื้นที่สาธารณะ', d: 'ขยะ · บุกรุก · ร้องเรียน' },
    { ic: '🚫', t: 'พื้นที่หวงห้าม', d: 'บุกรุกนอกเวลา · สวนปิด' },
    { ic: '👥', t: 'นับคน · ความหนาแน่น', d: 'ตลาด · สวน · ลานกิจกรรม' },
    { ic: '🚦', t: 'จราจรในเขต', d: 'ฝ่าไฟ · ย้อนศร · ส่ง ตร.' },
    { ic: '🚗', t: 'ตรวจสอบยานพาหนะ', d: 'อ่านป้าย · ค้นย้อนหลัง · watchlist' },
    { ic: '🅿️', t: 'บริหารลานจอด', d: 'เก็บค่าจอดครบทุกคัน' },
    { ic: '🌉', t: 'สะพาน · อุโมงค์', d: 'แจ้งเหตุก่อนกู้ภัยถึง' },
  ];
  return (
    <Slide num={num}>
      <Eyebrow accent>เลือกที่ตรงปัญหาท่านมากที่สุด</Eyebrow>
      <Title>7 ปัญหาประจำวัน · 1 ระบบเดียวที่แก้ได้</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        แต่ละปัญหาเริ่มเป็น pilot ได้แยกก่อน · ใช้ AI Box และ Dashboard เดียวกัน · ขยายเพิ่มทีละจุดตามงบประมาณ
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginTop: 20, flex: 1, alignContent: 'center' }}>
        {apps.map((a, i) => (
          <Card key={i} style={{ padding: '18px 18px', textAlign: 'center' }}>
            <div style={{ fontSize: 34, marginBottom: 8 }}>{a.ic}</div>
            <CardTitle style={{ fontSize: 16, marginBottom: 4 }}>{a.t}</CardTitle>
            <CardBody style={{ fontSize: 13 }}>{a.d}</CardBody>
          </Card>
        ))}
        <div style={{ background: C.primarySoft, borderRadius: 18, border: `1.5px dashed ${C.primary}`, padding: '18px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>➕</div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.primary, marginBottom: 4, lineHeight: 1.4 }}>ขยายต่อได้</h4>
          <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.45 }}>เพิ่ม app ใหม่เมื่อหน่วยงานพร้อม</p>
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// App Detail slides — shared layout
// ---------------------------------------------------------------------------

function AppDetailSlide({ num, eyebrow, title, lead, image, painList, outcomeList, chips }) {
  return (
    <Slide num={num}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Title size={32}>{title}</Title>
      <Lead style={{ marginTop: 6, marginBottom: 8, fontSize: 16 }}>{lead}</Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 18, flex: 1, minHeight: 0 }}>
        <div style={{ borderRadius: 18, overflow: 'hidden', background: C.primarySoft, display: 'flex' }}>
          <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <div style={{ background: '#FFF', borderRadius: 14, padding: '14px 18px', border: `1px solid ${C.surfaceSoft}`, borderLeft: `4px solid ${C.alert}` }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.alert, marginBottom: 8, lineHeight: 1.4 }}>🚨 ปัญหาที่หน่วยงานเจอ</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {painList.map((p, i) => (
                <li key={i} style={{ fontSize: 13.5, color: C.text, lineHeight: 1.5, padding: '3px 0 3px 18px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.alert, fontWeight: 800 }}>•</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: '#FFF', borderRadius: 14, padding: '14px 18px', border: `1px solid ${C.surfaceSoft}`, borderLeft: `4px solid ${C.success}` }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.success, marginBottom: 8, lineHeight: 1.4 }}>✅ หลังใช้ระบบ</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {outcomeList.map((p, i) => (
                <li key={i} style={{ fontSize: 13.5, color: C.text, lineHeight: 1.5, padding: '3px 0 3px 18px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.success, fontWeight: 800 }}>✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {chips.map((c, i) => (
              <Pill key={i} bg={C.primarySoft} color={C.primary}>{c}</Pill>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}

function Slide07({ num }) {
  return (
    <AppDetailSlide
      num={num}
      eyebrow="ดูแลพื้นที่ · ความปลอดภัยสาธารณะ"
      title="พื้นที่สาธารณะ · เห็นทุกเหตุการณ์ในเขตที่ดูแล"
      lead="ตลาด · สวน · ศูนย์ราชการ · พื้นที่ราชพัสดุ — ระบบช่วยจับขยะลักลอบทิ้ง / บุกรุก / ร้องเรียน พร้อมหลักฐานครบ"
      image={`${IMG}/App-06_hero.png`}
      painList={[
        'ขยะลักลอบทิ้งในที่สาธารณะ ตามตัวคนทิ้งไม่เจอ',
        'พื้นที่ราชพัสดุถูกบุกรุก ตอบประชาชนไม่ได้',
        'ไม่รู้จำนวนคน-รถใช้บริการตลาด/สวน',
        'ประชาชนร้องเรียน หน่วยงานไม่มีหลักฐาน',
      ]}
      outcomeList={[
        'แจ้งเตือนเหตุการณ์เข้า LINE OA ของหน่วยงานทันที',
        'มีภาพหลักฐาน + เวลา + ตำแหน่ง พร้อมตอบประชาชน',
        'Dashboard ผู้บริหารใช้ตัดสินใจรายวัน',
        'เพิ่มภาพลักษณ์การดูแลพื้นที่',
      ]}
      chips={['ใช้กล้องเดิม', 'ติดตั้ง 1 วัน', 'ขยายทีละจุด']}
    />
  );
}

function Slide08({ num }) {
  return (
    <AppDetailSlide
      num={num}
      eyebrow="ดูแลพื้นที่ · พื้นที่หวงห้าม"
      title="พื้นที่หวงห้ามตามเวลา · ตั้งเงื่อนไขผ่าน Dashboard"
      lead="สวนปิดยามค่ำคืน · ลานกีฬา · ศาลาประชาคม — ระบบเฝ้าระวังเฉพาะนอกเวลาที่กำหนด · แจ้งเหตุทันที"
      image={`${IMG}/App-14_hero.png`}
      painList={[
        'สวน/พื้นที่ปิดยามค่ำคืนถูกบุกรุก',
        'จุดอันตรายขาดการเฝ้าระวัง',
        'ขาดความสงบเรียบร้อยช่วงนอกเวลา',
        'ขาดหลักฐานเชิงระบบของการเข้า-ออก',
      ]}
      outcomeList={[
        'แจ้งเตือนการบุกรุกตามเวลาเข้า LINE OA',
        'ภาพหลักฐาน + ตำแหน่งจุดเกิดเหตุ',
        'สถิติเหตุการณ์รายเดือน/ปี ปรับมาตรการ',
        'ใช้ตัดสินใจวางกำลังเจ้าหน้าที่',
      ]}
      chips={['ใช้กล้องเดิม', 'ตั้งเวลาง่าย', 'กล้องกลางคืน (IR)']}
    />
  );
}

function Slide09({ num }) {
  return (
    <AppDetailSlide
      num={num}
      eyebrow="ดูแลพื้นที่ · จราจรในเขต"
      title="ความปลอดภัยถนน · เก็บหลักฐานครบ · ส่งต่อ ตร. ดำเนินคดี"
      lead="ฝ่าไฟแดง · ย้อนศร · จอดผิดที่ · รถใหญ่ฝ่าฝืน — อปท. เป็นผู้เก็บหลักฐาน · ตำรวจเป็นผู้ออกใบสั่ง (ไม่ละเมิดอำนาจ)"
      image={`${IMG}/App-05_hero.png`}
      painList={[
        'ฝ่าไฟแดง · ย้อนศร · จอดผิดที่ในเขต',
        'รถใหญ่ฝ่าฝืนน้ำหนัก/เวลา ถนนชำรุด',
        'ส่งคดีให้ ตร. แต่หลักฐานไม่ครบ',
        'ข้อร้องเรียนเรื่องจราจร ตอบประชาชนไม่ได้',
      ]}
      outcomeList={[
        'เก็บหลักฐานเหตุจราจร ส่งให้ ตร. ดำเนินคดี',
        'ตามทศวรรษความปลอดภัยทางถนน 2564-2573',
        'ใช้สนับสนุนของบบำรุงทาง/สะพาน',
        'Dashboard ติดตามสถานการณ์รายวัน',
      ]}
      chips={['มติ ครม. 5 มี.ค. 2562', 'ใช้กล้องเดิม', 'ส่งต่อ ตร. ทันที']}
    />
  );
}

function Slide10({ num }) {
  return (
    <AppDetailSlide
      num={num}
      eyebrow="ดูแลพื้นที่ · ตรวจสอบยานพาหนะ"
      title="ตรวจสอบยานพาหนะ · ค้นย้อนหลังภายในไม่กี่วินาที"
      lead="อ่านป้ายทะเบียนรถที่ผ่านในเขต · ค้นย้อนหลังเมื่อมีเหตุ · แจ้งเตือนเมื่อพบทะเบียนต้องสงสัยจากรายการของ ตร."
      image={`${IMG}/App-10_hero.png`}
      painList={[
        'ค้นย้อนหลังรถที่ผ่านในเขตไม่ได้',
        'ทะเบียนต้องสงสัยจาก ตร. ไม่มีระบบเฝ้าระวัง',
        'เหตุชนแล้วหนีในเขต ตอบไม่ได้ว่าใคร',
        'ส่งหลักฐานยานพาหนะให้ ตร. ไม่เป็นระบบ',
      ]}
      outcomeList={[
        'บันทึกป้ายทะเบียน + เวลา + ตำแหน่ง',
        'ค้นย้อนหลังตามทะเบียน/วันเวลา/พื้นที่',
        'แจ้งเตือนเมื่อพบทะเบียนใน watchlist',
        'ส่งต่อข้อมูลให้ ตร. ใช้สืบสวน',
      ]}
      chips={['กล้องมี IR (กลางคืน)', 'PDPA · DPIA + consent', 'ส่งต่อ ตร. ได้']}
    />
  );
}

function Slide11({ num }) {
  return (
    <AppDetailSlide
      num={num}
      eyebrow="ดูแลพื้นที่ · บริหารลานจอด"
      title="บริหารลานจอด · เก็บรายได้ครบทุกคัน"
      lead="ตลาดสด · ศูนย์ราชการ · แหล่งท่องเที่ยว — บันทึกเวลาเข้า-ออก · ลด revenue leakage · มีข้อมูลย้อนหลังตรวจสอบทุกบาท"
      image={`${IMG}/App-13_hero.png`}
      painList={[
        'เก็บค่าจอดไม่ครบ · มีรอยรั่ว revenue leakage',
        'ไม่รู้เวลาเข้า-ออกของรถแต่ละคัน',
        'ไม่มีข้อมูลย้อนหลังตรวจสอบการจัดเก็บ',
        'ประชาชนร้องเรียนเรื่องเก็บไม่เป็นธรรม',
      ]}
      outcomeList={[
        'บันทึกยานพาหนะเข้า-ออก + ทะเบียน',
        'รายได้รายวัน/เดือน เทียบเป้า ปรับแผน',
        'ระยะเวลาจอดเฉลี่ย · พื้นที่ใช้สูงสุด',
        'ข้อมูลย้อนหลังตรวจสอบได้ทุกคัน',
      ]}
      chips={['บันทึกครบทุกคัน', 'ลด leakage', 'รายงานรายวัน']}
    />
  );
}

function Slide12({ num }) {
  return (
    <AppDetailSlide
      num={num}
      eyebrow="ดูแลพื้นที่ · วางแผนพื้นที่"
      title="นับคน-รถ · วางแผนงบและบริการตรงเวลา peak"
      lead="ตลาด · สวน · ลานกิจกรรม — รู้จำนวนคน-รถจริง · เห็น peak time · ใช้ข้อมูลของบประมาณปีถัดไป (ไม่เก็บใบหน้า)"
      image={`${IMG}/App-12_hero.png`}
      painList={[
        'ไม่รู้จำนวนคน-รถเข้าตลาด/สวน/กิจกรรม',
        'วางแผนการจัดงาน/ทำความสะอาดไม่ตรง peak',
        'ไม่มีตัวเลขประกอบจัดสรรงบประมาณ',
        'ตัดสินใจขยาย/ปรับขนาดพื้นที่ไม่ได้',
      ]}
      outcomeList={[
        'จำนวนคน-รถรายชั่วโมง · รายวัน · รายเดือน',
        'Heatmap ช่วงเวลา peak ของแต่ละพื้นที่',
        'เปรียบเทียบสัปดาห์/เดือน/ปี ปรับแผน',
        'รายงานประกอบของบประมาณ',
      ]}
      chips={['ไม่เก็บใบหน้า', 'PDPA light', 'ใช้กล้องเดิม']}
    />
  );
}

function Slide13({ num }) {
  return (
    <AppDetailSlide
      num={num}
      eyebrow="โครงสร้างพื้นฐาน · ความปลอดภัยเส้นทาง"
      title="สะพาน · อุโมงค์ · แจ้งเหตุก่อนกู้ภัยถึง"
      lead="รถจอดเสีย · ของตกหล่น · คนเดินในอุโมงค์ — ระบบจับเหตุภายในไม่กี่วินาที · ส่งภาพและตำแหน่งให้กู้ภัยทันที"
      image={`${IMG}/App-15_hero.png`}
      painList={[
        'เกิดอุบัติเหตุในอุโมงค์ · กู้ภัยรู้ช้า',
        'สะพานมีของตกหล่น/รถจอดเสีย · ไม่มีคนแจ้ง',
        'รถบรรทุกเกินขนาด/น้ำหนัก เข้าโครงสร้างจำกัด',
        'ไม่มีข้อมูลปริมาณรถบนสะพาน/อุโมงค์',
      ]}
      outcomeList={[
        'แจ้งเตือนเหตุผิดปกติภายในไม่กี่วินาที',
        'เห็นภาพ + ตำแหน่งทันที · กู้ภัยเข้าถึงเร็ว',
        'ตรวจจับรถเกินขนาดก่อนเข้าโครงสร้าง',
        'ข้อมูลปริมาณรถ สนับสนุนซ่อมบำรุง',
      ]}
      chips={['LINE OA + ศูนย์ควบคุม', 'ใช้กล้องเดิม', 'รายงานปริมาณรถ']}
    />
  );
}

// ---------------------------------------------------------------------------
// SLIDE 14 — Privacy / PDPA
// ---------------------------------------------------------------------------

function Slide14({ num }) {
  return (
    <Slide num={num} dark>
      <Eyebrow dark>ข้อมูลอยู่ที่หน่วยงาน · ไม่ออกองค์กร</Eyebrow>
      <Title dark>PDPA · ภาพในไทย · มีร่องรอยการเข้าถึงทุกครั้ง</Title>
      <Lead dark style={{ marginTop: 12, maxWidth: 1040 }}>
        ผู้บริหารกังวลที่สุดคือ "ภาพประชาชนจะไปไหน" — เราออกแบบตั้งแต่ต้นให้ภาพทั้งหมดอยู่ในตู้ของหน่วยงาน
        ไม่ส่งออกนอกองค์กร · มีนโยบายเข้าถึงและ audit log ครบตาม PDPA
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 24, flex: 1, alignContent: 'center' }}>
        {[
          { ic: '🏠', t: 'ภาพอยู่ในตู้หน่วยงาน', d: 'ภาพต้นฉบับเก็บที่ NVR ในตู้ของหน่วยงาน · ไม่ส่งออก cloud ต่างประเทศ · ไม่ออกองค์กร' },
          { ic: '🔒', t: 'มีนโยบายเข้าถึง', d: 'เจ้าหน้าที่ต้อง login + มีสิทธิ์ตามบทบาท · บันทึก audit log ทุกการเข้าถึงและ export' },
          { ic: '🇹🇭', t: 'ภาพในไทย · ทีมไทย', d: 'พัฒนาเอง · ภาษาไทย · ปรับระบบให้ตรงบริบทแต่ละหน่วยงาน · ไม่พึ่ง vendor ต่างชาติ' },
        ].map((p, i) => (
          <Card key={i} dark>
            <CardIcon>{p.ic}</CardIcon>
            <CardTitle dark>{p.t}</CardTitle>
            <CardBody dark>{p.d}</CardBody>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 15 — Why us · 3 จุดต่าง
// ---------------------------------------------------------------------------

function Slide15({ num }) {
  const diffs = [
    { ic: '🔧', t: 'Site Survey ฟรี ก่อนเสนอ scope', d: 'ทีมเข้าไปตรวจกล้องเดิม · เครือข่าย · ห้อง Server ก่อน — เสนอ scope ที่ตรงหน่วยงาน ไม่ขายแพ็กเกจสำเร็จรูป' },
    { ic: '🇹🇭', t: 'ทีมงานในไทย · พัฒนาเอง', d: 'ไม่ใช่ตัวแทนจำหน่าย · ปรับระบบให้ตรงบริบทแต่ละหน่วยงานได้ · แก้ปัญหาเฉพาะหน้าเร็วเพราะอยู่ที่นี่' },
    { ic: '🏆', t: 'หน่วยงานได้ข้อมูลและภาพลักษณ์', d: 'มีข้อมูลรายงานตอบสภาฯ · ต่อยอดสมัครรางวัล อปท. ดีเด่นได้ · พิสูจน์การลงทุนกล้องคุ้มค่า' },
  ];
  return (
    <Slide num={num} dark>
      <Eyebrow dark>ทำไมต้องเรา</Eyebrow>
      <Title dark>3 เรื่องที่ทำให้ท่านมั่นใจได้</Title>
      <Lead dark style={{ marginTop: 12, maxWidth: 1000 }}>
        ในตลาดมีคนขาย "กล้อง + AI" หลายเจ้า แต่ 3 เรื่องนี้คือสิ่งที่ทำให้แนวทางของเราต่าง
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 30, flex: 1, alignContent: 'center' }}>
        {diffs.map((d, i) => (
          <Card key={i} dark>
            <CardIcon>{d.ic}</CardIcon>
            <CardTitle dark>{d.t}</CardTitle>
            <CardBody dark>{d.d}</CardBody>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 16 — Plans · 3 แบบ
// ---------------------------------------------------------------------------

function Slide16({ num }) {
  const menus = [
    {
      tag: 'เริ่มเล็ก',
      tagBg: C.primary,
      title: 'แบบที่ 1\nนำร่อง 1 ปัญหา',
      who: 'เหมาะกับ: ท่านที่อยากเห็นผลก่อนตัดสินใจลงทุนใหญ่',
      items: [
        'เลือก 1 app ที่ตรง pain มากที่สุด (เช่น พื้นที่สาธารณะ)',
        'ติดตั้ง AI Box 1 จุด · ทดลองใช้ระยะสั้น',
        'มีรายงานให้ท่านใช้ตอบสภาฯ',
        'ความเสี่ยงงบประมาณต่ำที่สุด',
      ],
      budget: '💰 เริ่มได้ในงบประจำของกองที่รับผิดชอบ',
    },
    {
      tag: 'ครอบคลุมเขต',
      tagBg: '#4A7C59',
      title: 'แบบที่ 2\nครอบคลุม 3-4 ปัญหา',
      who: 'เหมาะกับ: ท่านที่พร้อมขยายไปหลาย pain',
      items: [
        'ครอบคลุมพื้นที่สาธารณะ + จราจร + ลานจอด',
        'ใช้กล้องเดิมหลายจุดในเขต',
        'Dashboard ผู้บริหารเห็นภาพรวมทั้งเขต',
        'เชื่อม LINE OA ของหน่วยงาน',
      ],
      budget: '💰 ใช้งบลงทุน + งบโครงการ พ.ร.บ. รายจ่ายประจำปี',
    },
    {
      tag: 'รวมป้องกันภัย',
      tagBg: C.accent,
      title: 'แบบที่ 3\nรวมงานกู้ภัย-จราจร',
      who: 'เหมาะกับ: ท่านที่มีงานป้องกันสาธารณภัยอยู่แล้ว',
      items: [
        'ครอบคลุมทุก app · ผูกกับงานกู้ภัย',
        'เชื่อมการแจ้งเหตุเข้าศูนย์รับแจ้ง',
        'ดูแลทั้งความปลอดภัยและจราจรในเขต',
        'ระบบเดียว · ตอบได้หลายภารกิจ',
      ],
      budget: '💰 งบป้องกันสาธารณภัย + งบบูรณาการกล้อง (มติ ครม. 2562)',
    },
  ];
  return (
    <Slide num={num}>
      <Eyebrow accent>เมนูโครงการ</Eyebrow>
      <Title>เลือกแบบที่เหมาะกับหน่วยงานของท่าน</Title>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 18, flex: 1 }}>
        {menus.map((m, i) => (
          <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 20, padding: '28px 26px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <span style={{ position: 'absolute', top: 0, right: 0, background: m.tagBg, color: '#FFF', fontSize: 13, fontWeight: 700, padding: '6px 16px', borderBottomLeftRadius: 14 }}>{m.tag}</span>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: C.primaryDeep, marginBottom: 4, lineHeight: 1.2, whiteSpace: 'pre-line' }}>{m.title}</h3>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: C.textMuted, marginBottom: 12, display: 'block' }}>{m.who}</span>
            <ul style={{ listStyle: 'none', margin: '6px 0 0 0', padding: 0 }}>
              {m.items.map((it, j) => (
                <li key={j} style={{ fontSize: 14, color: C.text, lineHeight: 1.5, padding: '5px 0 5px 22px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.success, fontWeight: 800 }}>✓</span>
                  {it}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 'auto', paddingTop: 14, fontSize: 13.5, fontWeight: 600, color: C.primary, borderTop: `1px dashed ${C.surfaceSoft}` }}>{m.budget}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11.5, color: C.textMuted, fontStyle: 'italic', marginTop: 8 }}>
        แหล่งงบเป็นแนวทางเบื้องต้น · ทีมงานจะช่วยท่านตรวจสอบความเหมาะสมกับระเบียบของแต่ละกอง
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 19 — Outcome / KPI
// ---------------------------------------------------------------------------

function Slide19({ num }) {
  const benefits = [
    { ic: '⚡', t: 'ตอบเหตุเร็วขึ้น', d: 'เปลี่ยนจาก "รอประชาชนแจ้ง" เป็น "ระบบแจ้ง" · ส่งกำลังถึงจุดเร็วขึ้น' },
    { ic: '📋', t: 'มีตัวเลขตอบสภาฯ', d: 'จำนวนเหตุที่จับได้ · หลักฐานส่ง ตร. · ภาพประกอบรายงานประจำปี' },
    { ic: '🛡️', t: 'ภาพลักษณ์ผู้บริหาร', d: 'มีกรณีศึกษาต่อยอดสมัครรางวัล อปท. ดีเด่น · พิสูจน์การลงทุนกล้องคุ้มค่า' },
    { ic: '💰', t: 'ใช้งบเดิม · ขยายต่อได้', d: 'ใช้กล้องเดิม ลดงบลงทุนรอบใหม่ · เพิ่ม app ทีละจุดตามความพร้อม' },
  ];
  return (
    <Slide num={num}>
      <Eyebrow>สิ่งที่หน่วยงานและประชาชนได้</Eyebrow>
      <Title size={36}>ผลที่ท่านนำไปตอบสภาฯ ได้</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 18, marginTop: 14, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 14, minHeight: 0 }}>
          {benefits.map((b, i) => (
            <Card key={i} style={{ padding: '16px 18px', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <CardIcon>{b.ic}</CardIcon>
              <CardTitle style={{ fontSize: 17, marginBottom: 4 }}>{b.t}</CardTitle>
              <CardBody style={{ fontSize: 13.5 }}>{b.d}</CardBody>
            </Card>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 14, minHeight: 0 }}>
          <div style={{ borderRadius: 18, overflow: 'hidden', minHeight: 0, background: C.primarySoft }}>
            <img src={`${IMG}/App-05_hero.png`} alt="ความปลอดภัยถนน" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{ borderRadius: 18, overflow: 'hidden', minHeight: 0, background: C.primarySoft }}>
            <img src={`${IMG}/App-12_hero.png`} alt="ใช้ข้อมูลวางแผน" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 20 — Close / 3 คำถาม
// ---------------------------------------------------------------------------

function Slide20({ num }) {
  return (
    <Slide num={num} dark>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Eyebrow dark>ขั้นต่อไป</Eyebrow>
        <Title dark size={44}>
          ขอเวลาท่านสักครู่<br />คุยเรื่องกล้องที่หน่วยงานท่านมี
        </Title>
        <Lead dark style={{ marginTop: 20, maxWidth: 940 }}>
          ท่านไม่ต้องตัดสินใจอะไรในวันนี้ — เราอยากเข้าไปทำ Site Survey ฟรี
          ตรวจกล้องเดิม · เครือข่าย · ห้อง Server ก่อนเสนอ scope ที่ตรงหน่วยงาน ไม่ขายแพ็กเกจสำเร็จรูป
        </Lead>
        <div style={{ marginTop: 30, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 18, padding: '24px 28px', maxWidth: 980 }}>
          <h3 style={{ color: '#FFF', fontSize: 20, fontWeight: 700, marginBottom: 14 }}>3 คำถามที่อยากฟังจากท่าน</h3>
          <p style={{ color: 'rgba(255,255,255,.9)', fontSize: 17, lineHeight: 1.9 }}>
            1. ปัญหากล้อง/พื้นที่ที่หนักที่สุดในเขตของท่าน คืออะไร?<br />
            2. ใน 7 ปัญหาที่เราเสนอ · เรื่องไหนตรงกับ pain หน่วยงานท่านที่สุด?<br />
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
    '1 · 🚨 Pain · CCTV เดิมไว้ดูทีหลัง ไม่แจ้งเหตุ',
    '2 · 🚨 Pain · 4 ปัญหากล้องที่ลงทุนไปแล้ว',
    '3 · ✨ Solution · AI Box ทำให้กล้องเดิมแจ้งได้',
    '4 · 🔧 How · กล้องเดิม → AI Box → LINE/Dashboard',
    '5 · 📦 Hardware · AI Box + กล้องเดิม',
    '6 · 🔧 Install · แนวทาง A (Server กลาง) vs B (Edge)',
    '7 · 🎬 Use-case · LPR ค้นทะเบียนข้ามกล้อง',
    '8 · 🎯 Apps · 7 ปัญหาในระบบเดียว',
    '9 · 🛡️ App · พื้นที่สาธารณะ',
    '10 · 🚫 App · พื้นที่หวงห้ามตามเวลา',
    '11 · 🚦 App · ความปลอดภัยถนน · ส่ง ตร.',
    '12 · 🚗 App · ตรวจสอบยานพาหนะ',
    '13 · 🅿️ App · บริหารลานจอด',
    '14 · 👥 App · นับคน · ความหนาแน่น',
    '15 · 🌉 App · สะพาน · อุโมงค์',
    '16 · 🛡️ Privacy · PDPA · ภาพในไทย',
    '17 · 🏆 Why us · 3 จุดต่าง',
    '18 · 💵 Plans · 3 แบบ + แหล่งงบ',
    '19 · 🏛️ Outcome · KPI ตอบสภาฯ ได้',
    '20 · 🤝 Close · 3 คำถาม + ขั้นต่อไป',
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

export default function PitchDeck() {
  const slides = [
    Slide01, Slide02, Slide03, Slide04, Slide05,
    SlideInstallAB, SlideLPRUseCase,
    Slide06, Slide07, Slide08, Slide09, Slide10,
    Slide11, Slide12, Slide13, Slide14, Slide15,
    Slide16, Slide19, Slide20,
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
