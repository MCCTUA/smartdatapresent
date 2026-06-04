import React, { useEffect, useState, useRef } from 'react';

// ---------------------------------------------------------------------------
// SmartLight/PitchDeck.jsx — Sales Pitch Deck (20 slides · 1280×720 · print-PDF ready)
// Design: Civic Trust palette (Forest #0F6E56 + Cream #FAF7EE + Amber #BA7517) + Sarabun
// Audience: ช่างไฟ · หัวหน้ากองช่าง · ผู้บริหาร เทศบาล / อบต.
// Source: infomation/SmartLight/GGismo Smart Street Light - Website Content.md
// Dashboard slides use REAL system screenshots (Screen1 · location · Alerts)
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
  success: '#5B8C2A',
  successSoft: '#EAF3DE',
};

const IMG = 'images/smartlight';
const VIDEO_SRC = 'videos/0518.mp4';
const VIDEO_POSTER = 'videos/0518_poster.jpg';
const TOTAL_SLIDES = 19;

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
        background: dark ? `linear-gradient(135deg, ${C.primaryDeep} 0%, ${C.primary} 100%)` : C.surface,
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
        <div style={{ position: 'absolute', bottom: 20, left: 60, fontSize: 12, color: dark ? 'rgba(255,255,255,0.7)' : C.textMuted, opacity: 0.85, fontWeight: 500, letterSpacing: 0.5 }}>
          {footer}
        </div>
      )}
      <div style={{ position: 'absolute', bottom: 22, right: 38, fontSize: 13, color: dark ? 'rgba(255,255,255,0.7)' : C.textMuted, fontWeight: 500 }}>
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
    <div style={{ background: dark ? 'rgba(255,255,255,0.08)' : '#FFF', border: `1px solid ${dark ? 'rgba(255,255,255,0.16)' : C.surfaceSoft}`, borderRadius: 18, padding: '24px 26px', ...style }}>
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

function NumBadge({ n }) {
  return (
    <div style={{ width: 44, height: 44, borderRadius: '50%', background: C.primary, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 19, flexShrink: 0 }}>
      {n}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Adaptive Dimming Visualization — Road with 40 lamps, car at left, 2 bright
// segments (15 lamps each, ~40 m apart) ahead, dim behind and far ahead.
// ---------------------------------------------------------------------------

function AdaptiveDimmingRoad() {
  const lamps = 40;
  const xStart = 50;
  const xEnd = 1080;
  const xGap = (xEnd - xStart) / (lamps - 1);
  const carIdx = 4; // car position (5th lamp from left)
  const roadY = 200;
  const lampHeadY = 70;

  function zone(i) {
    if (i < carIdx) return 'behind';
    if (i >= carIdx && i < carIdx + 15) return 'g1'; // 15 lamps full bright
    if (i >= carIdx + 15 && i < carIdx + 30) return 'g2'; // 15 lamps transition
    return 'far';
  }
  const styles = {
    behind: { halo: 18, haloOp: 0.25, pole: '#5a6066', head: '#7a8089', label: '20%' },
    g1: { halo: 38, haloOp: 0.9, pole: '#FFD66B', head: '#FFF6C8', label: '100%' },
    g2: { halo: 28, haloOp: 0.55, pole: '#F2C24B', head: '#FFE9A8', label: '60%' },
    far: { halo: 14, haloOp: 0.18, pole: '#4a5056', head: '#666c73', label: '20%' },
  };

  return (
    <svg viewBox="0 0 1100 320" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', width: '100%', height: '100%', fontFamily: 'Sarabun, sans-serif' }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-g1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFEB9B" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#FFD66B" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFD66B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow-g2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE9A8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F2C24B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow-dim" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9aa0a6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#9aa0a6" stopOpacity="0" />
        </radialGradient>
        <marker id="dir-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="10" markerHeight="10" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#FFF" />
        </marker>
      </defs>

      {/* Sky/background */}
      <rect x="0" y="0" width="1100" height="320" fill="#0F1A22" />

      {/* Zone background bands (subtle) */}
      <rect x={xStart + (carIdx - 0.5) * xGap} y="40" width={15 * xGap} height="240" fill="#FFD66B" opacity="0.06" />
      <rect x={xStart + (carIdx + 14.5) * xGap} y="40" width={15 * xGap} height="240" fill="#F2C24B" opacity="0.05" />

      {/* Lamps */}
      {Array.from({ length: lamps }).map((_, i) => {
        const x = xStart + i * xGap;
        const z = zone(i);
        const s = styles[z];
        const glowId = z === 'g1' ? 'glow-g1' : z === 'g2' ? 'glow-g2' : 'glow-dim';
        return (
          <g key={i}>
            {/* glow halo */}
            <circle cx={x} cy={lampHeadY + 4} r={s.halo} fill={`url(#${glowId})`} opacity={s.haloOp} />
            {/* arm */}
            <line x1={x} y1={lampHeadY + 4} x2={x} y2={roadY - 6} stroke={s.pole} strokeWidth="2" opacity="0.85" />
            {/* lamp head */}
            <rect x={x - 7} y={lampHeadY - 4} width="14" height="8" rx="2" fill={s.head} stroke={s.pole} strokeWidth="1" />
          </g>
        );
      })}

      {/* Road */}
      <rect x="20" y={roadY} width="1060" height="60" fill="#262B30" />
      <rect x="20" y={roadY} width="1060" height="4" fill="#3a4148" />
      <rect x="20" y={roadY + 56} width="1060" height="4" fill="#3a4148" />
      {/* dashed lane line */}
      {Array.from({ length: 22 }).map((_, i) => (
        <rect key={i} x={40 + i * 50} y={roadY + 28} width="28" height="4" fill="#E8C870" opacity="0.6" />
      ))}

      {/* Car */}
      {(() => {
        const cx = xStart + carIdx * xGap;
        return (
          <g transform={`translate(${cx - 32}, ${roadY + 6})`}>
            {/* simple car silhouette */}
            <rect x="0" y="20" width="64" height="22" rx="4" fill="#FFFFFF" />
            <path d="M8 20 L16 6 L48 6 L56 20 Z" fill="#FFFFFF" />
            <rect x="14" y="9" width="36" height="11" rx="2" fill="#8AB7E8" opacity="0.85" />
            <circle cx="14" cy="44" r="6" fill="#1F2A24" />
            <circle cx="50" cy="44" r="6" fill="#1F2A24" />
            {/* headlight beams */}
            <path d="M64 26 L96 18 L96 44 L64 36 Z" fill="#FFE9A8" opacity="0.55" />
          </g>
        );
      })()}

      {/* Direction arrow */}
      <line x1={xStart + carIdx * xGap + 110} y1={roadY + 32} x2={xStart + carIdx * xGap + 200} y2={roadY + 32} stroke="#FFFFFF" strokeWidth="2.5" markerEnd="url(#dir-arrow)" />
      <text x={xStart + carIdx * xGap + 130} y={roadY + 22} fontSize="11" fontWeight="700" fill="#FFFFFF" letterSpacing="1">DRIVE DIRECTION</text>

      {/* Zone labels */}
      <text x={xStart + 4} y="36" fontSize="11" fontWeight="700" fill="#9aa0a6" letterSpacing="1">หลังรถ · DIM 20%</text>
      <text x={xStart + (carIdx + 6.5) * xGap} y="36" textAnchor="middle" fontSize="13" fontWeight="700" fill="#FFD66B" letterSpacing="0.5">
        ① 15 โคม · 600 ม. · 100% สว่าง
      </text>
      <text x={xStart + (carIdx + 21.5) * xGap} y="36" textAnchor="middle" fontSize="13" fontWeight="700" fill="#F2C24B" letterSpacing="0.5">
        ② 15 โคม · 600 ม. · 60% (Buffer)
      </text>
      <text x={xEnd - 6} y="36" textAnchor="end" fontSize="11" fontWeight="700" fill="#9aa0a6" letterSpacing="1">เลย 1,200 ม. · DIM 20%</text>

      {/* Distance scale */}
      <line x1={xStart + carIdx * xGap} y1={roadY + 76} x2={xStart + (carIdx + 30) * xGap} y2={roadY + 76} stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
      <line x1={xStart + carIdx * xGap} y1={roadY + 72} x2={xStart + carIdx * xGap} y2={roadY + 80} stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
      <line x1={xStart + (carIdx + 30) * xGap} y1={roadY + 72} x2={xStart + (carIdx + 30) * xGap} y2={roadY + 80} stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
      <text x={xStart + (carIdx + 15) * xGap} y={roadY + 96} textAnchor="middle" fontSize="11" fontWeight="600" fill="#FFFFFF" opacity="0.7">
        1,200 ม. (40 ม. × 30 โคม) — Bright Zone เคลื่อนตามรถ
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Deck-level styles
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
// SLIDE 1 — HERO (Pain opening)
// ---------------------------------------------------------------------------

function Slide01() {
  return (
    <Slide num={1} dark>
      {/* Full-bleed transparent product cutout on the right — no crop */}
      <img
        src={`${IMG}/Gemini_Generated_Image_ykong3ykong3ykon-removebg-preview.png`}
        alt="GGismo Smart Street Light"
        style={{
          position: 'absolute',
          right: -30,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 720,
          height: 'auto',
          maxHeight: '90%',
          objectFit: 'contain',
          opacity: 0.55,
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'drop-shadow(0 18px 32px rgba(0,0,0,0.35))',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', position: 'relative', zIndex: 1, maxWidth: 760 }}>
        <Eyebrow dark>เทศบาลของท่าน · ระบบไฟถนนทั้งเขต</Eyebrow>
        <h1 style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.4, color: '#FFF', letterSpacing: -0.5 }}>
          ไฟถนนดับเป็นเดือน<br />
          กว่าจะมีคนแจ้ง<br />
          <span style={{ color: C.surfaceSoft }}>บางทีก็เกิดเหตุไปแล้ว</span>
        </h1>
        <Lead dark style={{ marginTop: 24, maxWidth: 680 }}>
          ทุกวันนี้เทศบาลจะรู้ว่าโคมไหนเสีย ต่อเมื่อประชาชนร้องเรียน — ระหว่างนั้นเปลืองค่าไฟทุกคืน
          และมุมที่ดับก็กลายเป็นจุดเสี่ยงอุบัติเหตุและความปลอดภัย
        </Lead>

        {/* Adaptive Dimming benefit chip — radar/CCTV-driven energy saving → extend coverage under same budget */}
        <div
          style={{
            marginTop: 24,
            maxWidth: 680,
            display: 'flex',
            gap: 14,
            alignItems: 'center',
            padding: '14px 18px',
            background: 'rgba(255, 214, 107, 0.10)',
            border: '1px solid rgba(255, 214, 107, 0.35)',
            borderLeft: '4px solid #FFD66B',
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: 26, lineHeight: 1, flexShrink: 0 }}>💡</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.5, color: '#FFD66B', textTransform: 'uppercase', marginBottom: 2 }}>
              Bonus · Adaptive Dimming
            </div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.95)', lineHeight: 1.5 }}>
              เพิ่ม Radar/กล้องตรวจรถ → ช่วงไม่มีรถ ระบบหรี่ไฟอัตโนมัติ —
              <strong style={{ color: '#FFE9A8' }}> พลังงานที่ประหยัดได้ ใช้ขยายเขตไฟส่องสว่างเพิ่ม</strong>
              ภายใต้งบสนับสนุนการไฟฟ้าเดิม
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 2 — 4 Pain Points
// ---------------------------------------------------------------------------

function Slide02() {
  const pains = [
    { icon: '🕯️', title: 'รอประชาชนแจ้ง กว่าจะรู้ก็สาย', desc: 'โคมเสียเป็นวัน–เป็นเดือน กว่าใครจะร้องเรียน — ทำให้ภาพลักษณ์เทศบาลเสียและมุมมืดกลายเป็นจุดเสี่ยง' },
    { icon: '🚚', title: 'ขับรถตระเวนหาโคมเสีย', desc: 'ช่างไฟต้องขับรถตรวจไล่ทีละต้น เปลืองน้ำมัน เวลา และคน — ยิ่งพื้นที่กว้าง ยิ่งยาก' },
    { icon: '💸', title: 'ไฟเปิดเต็มที่ตลอดคืน', desc: 'โคม LED เดิมเปิดเต็ม 100% ทั้งคืน แม้ตี 2–ตี 5 คนสัญจรน้อยมาก — เปลืองค่าไฟทุกเดือน' },
    { icon: '📂', title: 'ไม่มีข้อมูลตอบสภาฯ', desc: 'อยากรู้ว่าโคมในเขตมีกี่ดวง สถานะปกติกี่ดวง ใช้ไฟไปเท่าไหร่ — ไม่มีข้อมูลรวมศูนย์ให้ดู' },
  ];
  return (
    <Slide num={2}>
      <Eyebrow alert>ปัญหาที่หน่วยงานเจอจริง</Eyebrow>
      <Title>4 เรื่องที่วิธีดูแลไฟถนนแบบเดิม ตามไม่ทัน</Title>
      <Lead style={{ marginTop: 12, maxWidth: 1020 }}>
        วิธีจัดการไฟถนนที่ใช้กันอยู่ส่วนใหญ่ ต้องรอให้ "มีคนเห็น" ก่อน แล้วจึงซ่อม
        คำถามคือ — ระหว่างที่ยังไม่มีใครเห็น เปลืองงบไปเท่าไหร่ แล้วเกิดอะไรขึ้นบ้าง?
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
// SLIDE 3 — แนวทางใหม่ "รู้ก่อน"
// ---------------------------------------------------------------------------

function Slide03() {
  return (
    <Slide num={3}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Eyebrow>แนวทางใหม่</Eyebrow>
        <Title size={46}>
          ระบบ "รู้ก่อน"<br />ทุกโคมไฟ — ก่อนประชาชนร้อง
        </Title>
        <Lead style={{ marginTop: 18, maxWidth: 940 }}>
          แทนที่จะรอให้คนแจ้งแล้วค่อยซ่อม — เราติด Node LTE ที่ทุกโคม ส่งสถานะเข้าระบบ Real-time
          เมื่อโคมเสีย ระบบ <strong style={{ color: C.primary }}>แจ้งช่างไฟทันที</strong> พร้อม
          <strong style={{ color: C.primary }}> พิกัด GPS</strong> นำทางตรงจุด — ไม่ต้องขับรถตระเวน
        </Lead>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 32 }}>
          {[
            { ic: '💡', t: 'ที่หน้างาน', d: 'Node LTE บนทุกโคม วัด W · V · A · สถานะ ตลอด 24 ชั่วโมง' },
            { ic: '☁️', t: 'ที่ Cloud', d: 'รับสัญญาณ · ตรวจกฎ · สั่งหรี่ไฟ/เปิดปิด · ออกรายงานอัตโนมัติ' },
            { ic: '🖥️', t: 'ที่ศูนย์เทศบาล', d: 'เจ้าหน้าที่เห็นภาพรวมไฟถนนทั้งเขต บนหน้าจอเดียว วางแผนซ่อมตรงจุด' },
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
// SLIDE 4 — ระบบทำงานอย่างไร (Architecture)
// ---------------------------------------------------------------------------

function Slide04() {
  const steps = [
    {
      ic: '📹',
      t: 'ตรวจรถข้างหน้า',
      d: 'CCTV หรือ Radar (เลือกอย่างใดอย่างหนึ่ง) จับว่ามีรถมาในระยะ 1,200 ม. ข้างหน้าหรือไม่ · Radar เสถียรกว่าทุกสภาพอากาศ แต่ลงทุนเพิ่ม',
      tag: 'DETECT',
    },
    {
      ic: '☁️',
      t: 'ตัดสินใจ Auto',
      d: 'Cloud ส่งคำสั่งให้กลุ่มโคม ① 15 ดวง × 600 ม. = 100% และกลุ่มโคม ② อีก 15 ดวง × 600 ม. = 60% (Buffer)',
      tag: 'DECIDE',
    },
    {
      ic: '💡',
      t: 'สั่ง Dim · Bright',
      d: 'Node LTE หรี่/เพิ่มแสงตามคำสั่ง · Bright Zone 1,200 ม. เคลื่อนตามรถ · ที่เหลือ Dim ประหยัด',
      tag: 'ACT',
    },
  ];
  return (
    <Slide num={4}>
      <Eyebrow accent>ระบบทำงานอย่างไร · Adaptive Dimming</Eyebrow>
      <Title size={28}>ตรวจรถข้างหน้า → ไม่มีรถ = หรี่ · มีรถ = สว่าง 1,200 ม. ล่วงหน้า</Title>
      <p style={{ fontSize: 13.5, color: C.textMuted, marginTop: 4, lineHeight: 1.5 }}>
        ใช้ Smart Traffic (CCTV <strong>หรือ</strong> Radar — เลือกอย่างใดอย่างหนึ่ง) ตรวจจับรถ ส่งให้ Cloud สั่ง Node LTE หรี่/เพิ่มแสงทันที — สว่างเฉพาะที่จำเป็น
        ไม่ทำให้คนขับ "หลอน" (เพราะมี Buffer 600 ม. สำรองข้างหน้าเสมอ)
      </p>

      <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '0.95fr 1.6fr', gap: 14, flex: 1, minHeight: 0 }}>
        {/* LEFT: 3 process steps (DETECT → DECIDE → ACT) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 12, padding: '10px 12px', display: 'flex', gap: 10, alignItems: 'flex-start', flex: 1, minHeight: 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: C.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{s.ic}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, color: C.accent, background: C.accentSoft, padding: '2px 7px', borderRadius: 100 }}>{s.tag}</span>
                  <h4 style={{ fontSize: 14.5, fontWeight: 700, color: C.primaryDeep, lineHeight: 1.35 }}>{s.t}</h4>
                </div>
                <p style={{ fontSize: 11.5, color: C.textMuted, lineHeight: 1.5 }}>{s.d}</p>
              </div>
            </div>
          ))}
          {/* CLIP video — Smart Traffic radar/vehicle detection demo */}
          <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', background: '#000', border: `1px solid ${C.surfaceSoft}`, aspectRatio: '21 / 9', flexShrink: 0 }}>
            <video
              src={VIDEO_SRC}
              poster={VIDEO_POSTER}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              aria-label="ตัวอย่าง Smart Traffic ตรวจจับยานพาหนะ"
            />
            <div style={{ position: 'absolute', bottom: 6, left: 8, fontSize: 9.5, fontWeight: 700, letterSpacing: 1.4, color: '#FFF', background: 'rgba(0,0,0,0.6)', padding: '3px 8px', borderRadius: 100 }}>
              LIVE · SMART TRAFFIC DETECTION
            </div>
          </div>
        </div>

        {/* RIGHT: Road visualization */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
          <div style={{ flex: 1, minHeight: 0, borderRadius: 14, overflow: 'hidden', background: '#0F1A22', border: `1px solid ${C.surfaceSoft}`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
            <AdaptiveDimmingRoad />
          </div>
          {/* Benefit chips */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, flexShrink: 0 }}>
            {[
              { ic: '💰', t: 'ประหยัดไฟ 40–60%', d: 'หรี่ช่วงไม่มีรถ' },
              { ic: '🛡️', t: 'ไม่หลอนคนขับ', d: 'Buffer 1,200 ม. ล่วงหน้า' },
              { ic: '⚡', t: 'ตอบสนอง < 1 วิ', d: 'เพิ่มแสงทันรถมา' },
            ].map((b, i) => (
              <div key={i} style={{ background: C.primaryDeep, color: '#FFF', borderRadius: 10, padding: '8px 12px', display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 20, lineHeight: 1, flexShrink: 0 }}>{b.ic}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, lineHeight: 1.2 }}>{b.t}</div>
                  <div style={{ fontSize: 10.5, opacity: 0.85, lineHeight: 1.3 }}>{b.d}</div>
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
// SLIDE 5 — Hardware (LED + arm)
// ---------------------------------------------------------------------------

function Slide05() {
  const specs = [
    { ic: '💡', t: '155 lm/W', d: 'สว่างกว่านวัตกรรมที่ขึ้นทะเบียน (125 lm/W) ถึง 24%', s: 'ลดค่าไฟ 20–30%' },
    { ic: '🔧', t: 'ขาปรับ 90°', d: 'ปรับองศาส่องสว่างได้ตามถนนกว้าง/แคบ/พื้นที่พิเศษ', s: 'ติดเดิม–เสริมใหม่' },
    { ic: '🛡️', t: 'IP66 · มอก.', d: 'ป้องกันน้ำ-ฝุ่นสมบูรณ์ ผ่าน IES LM-79 / LM-80', s: 'มาตรฐานครบ' },
    { ic: '🏷️', t: 'รับประกัน 5 ปี', d: 'ทำงาน 24 ชม./วัน นานกว่า 5 ปี — โดยทีมไทย', s: 'ดูแลตลอดอายุ' },
  ];
  return (
    <Slide num={5}>
      <Eyebrow accent>ฮาร์ดแวร์ที่ได้รับ</Eyebrow>
      <Title>โคม LED ประสิทธิภาพสูง · ขาปรับองศา 90°</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        ไม่ใช่แค่ LED ทั่วไป — โคม GGismo ออกแบบเพื่อสว่างกว่า ประหยัดกว่า และทนทานพอที่จะทำงานทั้งคืน ทุกคืน นาน 5 ปี
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1fr 1fr', gap: 16, marginTop: 14, flex: 1, alignContent: 'center' }}>
        <div style={{ borderRadius: 18, overflow: 'hidden', background: C.primarySoft, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={`${IMG}/Gemini_Generated_Image_ykong3ykong3ykon-removebg-preview.png`} alt="GGismo Smart Street Light cutout" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 14 }}>
          {specs.slice(0, 2).map((s, i) => <SpecCard key={i} {...s} />)}
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 14 }}>
          {specs.slice(2, 4).map((s, i) => <SpecCard key={i} {...s} />)}
        </div>
      </div>
      <p style={{ fontSize: 12.5, color: C.primary, fontWeight: 600, marginTop: 10 }}>
        ตัวเลขประสิทธิภาพอ้างอิงสเปคทดสอบจริงในห้องแล็บ · ผลใช้งานจริงขึ้นอยู่กับสภาพแวดล้อมของแต่ละพื้นที่
      </p>
    </Slide>
  );
}

function SpecCard({ ic, t, d, s }) {
  return (
    <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 16, padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ fontSize: 30, lineHeight: 1, flexShrink: 0 }}>{ic}</div>
      <div>
        <h4 style={{ fontSize: 17, fontWeight: 700, color: C.primary, marginBottom: 4, lineHeight: 1.3 }}>{t}</h4>
        <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.45, marginBottom: 6 }}>{d}</p>
        <span style={{ display: 'inline-block', fontSize: 11.5, fontWeight: 600, color: C.accent, background: C.accentSoft, padding: '3px 9px', borderRadius: 100 }}>{s}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 6 — Node LTE + Socket NEMA
// ---------------------------------------------------------------------------

function Slide06() {
  const reads = [
    { ic: '✅', t: 'Online / Offline', d: 'รู้ทันทีว่าโคมไหนยังต่ออยู่' },
    { ic: '⚡', t: 'Power (W)', d: 'วัดพลังงานที่ใช้จริงรายดวง' },
    { ic: '🔌', t: 'Voltage / Current', d: 'จับ Over/Under V, Over Current' },
    { ic: '🚨', t: 'Lamp Fail · Power Fail', d: 'ไฟดับ · ไฟตัด · Power Outage' },
  ];
  return (
    <Slide num={6}>
      <Eyebrow accent>หัวใจของระบบควบคุม</Eyebrow>
      <Title size={34}>Node LTE · Socket NEMA · ติดบนโคมเดิมได้</Title>
      <Lead style={{ marginTop: 8, maxWidth: 1040, fontSize: 17 }}>
        Socket NEMA เป็นมาตรฐานสากล — เสียบ Node บนโคมไฟส่วนใหญ่ได้ทันที <strong style={{ color: C.primary }}>ไม่ต้องเปลี่ยนโคมเดิม</strong> · อ่าน 4 ค่าหลักเข้า Cloud ผ่าน LTE/4G
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 18, marginTop: 14, flex: 1, minHeight: 0 }}>
        <div style={{ borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(180deg, #BCD4E6 0%, #DCE8F0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, padding: 8 }}>
          <img src={`${IMG}/installation/IMG_4929.jpeg`} alt="โคมไฟ LED + Node" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 12, minHeight: 0 }}>
          {reads.map((r, i) => (
            <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 14, padding: '14px 16px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <span style={{ fontSize: 26, lineHeight: 1, marginBottom: 6 }}>{r.ic}</span>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4, lineHeight: 1.4 }}>{r.t}</h3>
              <p style={{ fontSize: 12.5, color: C.textMuted, lineHeight: 1.5 }}>{r.d}</p>
            </div>
          ))}
        </div>
      </div>
      <p style={{ fontSize: 12, color: C.primary, fontWeight: 600, marginTop: 8 }}>
        Node แสดงพิกัดบน Dashboard + นำทางผ่าน Google Maps — ช่างไฟไปตรงจุด ไม่ต้องตามหา
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 7 — สัญญาณ → การจัดการ
// ---------------------------------------------------------------------------

function Slide07() {
  const rows = [
    ['💡 Lamp Failure (ไฟดับ)', 'หลอด LED เสีย / Driver พัง', 'แจ้งช่าง + ส่งตำแหน่ง — ซ่อมก่อนประชาชนแจ้ง'],
    ['🔌 Power Failure (ไฟตัด)', 'การไฟฟ้าตัดวงจร / สายขาด', 'แจ้งกองช่าง + ประสาน กฟภ. ทันที'],
    ['⚡ Over / Under Voltage', 'แรงดันไฟผิดปกติ', 'ป้องกัน LED พัง · ยืดอายุโคม'],
    ['📈 Power สูงผิดปกติ', 'มีโหลดผิดปกติ · ลักไฟ', 'หาผู้ลักลอบใช้ไฟ · ป้องกัน Asset'],
  ];
  return (
    <Slide num={7}>
      <Eyebrow>จากสัญญาณ สู่การจัดการ</Eyebrow>
      <Title>4 สัญญาณ ที่ระบบจับให้ — ก่อนกลายเป็นเรื่องใหญ่</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        Node ส่งสถานะทุก 4 ค่าเข้า Cloud ตลอด 24 ชั่วโมง — ระบบเปรียบเทียบกับกฎที่ตั้งไว้ และตัดสินว่า "เรื่องนี้ใครต้องรู้"
      </Lead>
      <div style={{ marginTop: 18, background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.6fr 1.9fr', background: C.primary }}>
          {['สัญญาณที่ระบบจับได้', 'อาจหมายถึง', 'ระบบส่งต่อให้ใคร'].map((h, i) => (
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
        ระบบจับสัญญาณและส่งต่อ — การตัดสินใจซ่อม/เปลี่ยนยังอยู่ที่กองช่างเช่นเดิม
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 8 — ป้องกัน vs ปลายเหตุ (ROI)
// ---------------------------------------------------------------------------

function Slide08() {
  return (
    <Slide num={8} dark>
      <Eyebrow dark>ทำไมคุ้มกว่า</Eyebrow>
      <Title dark>รู้ก่อน · ซ่อมทัน · ประหยัดทุกคืน</Title>
      <Lead dark style={{ marginTop: 10, maxWidth: 1040 }}>
        เปลี่ยนจาก "รอประชาชนแจ้ง" เป็น "ระบบบอกเอง" — ลดทั้งค่าไฟ ลดทั้งค่าซ่อม ลดทั้งภาพลบกับประชาชน
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 20, alignContent: 'center' }}>
        <Card dark>
          <CardTitle dark style={{ marginBottom: 12 }}>🔁 แบบเดิม · รอแจ้ง–ขับตระเวน</CardTitle>
          <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: 15.5, lineHeight: 1.9 }}>
            • รู้ปัญหาเมื่อประชาชนร้อง<br />
            • ช่างขับรถไล่ดูทีละต้น<br />
            • โคมเปิด 100% ทั้งคืน<br />
            • ไม่มีข้อมูลตอบสภาฯ
          </p>
        </Card>
        <Card>
          <CardTitle style={{ color: C.primary, marginBottom: 12 }}>✅ แบบใหม่ · ระบบรู้ก่อน</CardTitle>
          <p style={{ color: C.text, fontSize: 15.5, lineHeight: 1.9 }}>
            • ระบบแจ้งทันทีที่โคมเสีย<br />
            • Google Maps นำช่างถึงจุด<br />
            • Dimming อัตโนมัติช่วงดึก<br />
            • รายงานพร้อมตอบสภาฯ
          </p>
        </Card>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 18 }}>
        {[
          { t: '⚡ ประหยัดค่าไฟ 50–70%', d: 'LED 155 lm/W + Dimming ช่วงรถน้อย' },
          { t: '🚚 ลด Truck Roll', d: 'ไม่ต้องขับรถตระเวน · ไปตรงจุดเดียว' },
          { t: '🛡️ คืนทุนชัด', d: 'ค่าไฟ+ซ่อมที่ประหยัด ชดเชยค่าลงทุนใน 3–5 ปี' },
        ].map((x, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 14, padding: '14px 18px' }}>
            <h4 style={{ color: '#FFF', fontSize: 16, fontWeight: 700, marginBottom: 3 }}>{x.t}</h4>
            <p style={{ color: 'rgba(255,255,255,.82)', fontSize: 13.5 }}>{x.d}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 9 — 3 จุดต่าง
// ---------------------------------------------------------------------------

function Slide09() {
  const diffs = [
    { ic: '🇹🇭', t: 'ของไทย · ทีมไทย · พัฒนาเอง', d: 'เป็นเจ้าของซอฟต์แวร์เอง ปรับปรุงและพัฒนาฟีเจอร์ใหม่ได้เอง ไม่ต้องรืออัปเดตจากต่างประเทศ' },
    { ic: '🧩', t: 'ปรับแต่ง Dashboard / Report ได้', d: 'แสดงข้อมูลที่สำคัญที่สุดสำหรับผู้บริหารแต่ละท่าน + รายงานแบบที่ใช้ตอบสภาฯ ได้จริง' },
    { ic: '🏗️', t: 'ต่อยอด Super App ได้', d: 'ระบบเดียวที่ขยายเป็น CCTV · Smart Pole · PM2.5 · ค่าธรรมเนียมขยะ ได้ในอนาคต ไม่ต้องซื้อใหม่' },
  ];
  return (
    <Slide num={9} dark>
      <Eyebrow dark>ทำไมต้องเรา</Eyebrow>
      <Title dark>3 เรื่องที่ทำให้ท่านมั่นใจได้</Title>
      <Lead dark style={{ marginTop: 12, maxWidth: 1000 }}>
        ในตลาดมีคนขาย "ระบบ Smart Street Light" หลายเจ้า แต่ 3 เรื่องนี้คือสิ่งที่ทำให้ GGismo ต่าง
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
// SLIDE 10 — เลือกแพ็กเกจ intro
// ---------------------------------------------------------------------------

function Slide10() {
  return (
    <Slide num={10}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Eyebrow accent>เลือกได้ตามความพร้อม</Eyebrow>
        <Title size={42}>ท่านไม่ต้องลงทุนทั้งเขตในครั้งเดียว</Title>
        <Lead style={{ marginTop: 18, maxWidth: 960 }}>
          เรามี 3 แพ็กเกจให้ท่านเลือกตามความพร้อมและงบประมาณ —
          เริ่มจาก LED คุณภาพสูงก่อน หรือทำเต็มรูปแบบ Smart City เลยก็ได้
          ทุกแพ็กเกจอัปเกรดเป็นแพ็กเกจถัดไปได้ในอนาคต โดยไม่ต้องเปลี่ยนของเดิม
        </Lead>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 30 }}>
          {[
            { ic: '🌱', t: 'Basic · เริ่มจาก LED', d: 'อัปเกรด LED คุณภาพสูง + พื้นฐานควบคุม' },
            { ic: '🌿', t: 'Smart · ครบ Dashboard', d: 'เพิ่ม Node + Dimming + Alert + Web Dashboard' },
            { ic: '🏛️', t: 'Premium · Super App', d: 'ต่อยอด CCTV · Smart Pole · AI Analytics' },
          ].map((m, i) => (
            <Card key={i} style={{ textAlign: 'center' }}>
              <CardIcon>{m.ic}</CardIcon>
              <CardTitle>{m.t}</CardTitle>
              <CardBody>{m.d}</CardBody>
            </Card>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 11 — 3 แพ็กเกจรายละเอียด
// ---------------------------------------------------------------------------

function Slide11() {
  const menus = [
    {
      tag: 'Basic',
      tagBg: C.primary,
      title: 'แพ็กเกจ Basic\nเริ่มจาก LED',
      who: 'เหมาะกับ: ท่านที่อยากอัปเกรดโคมเก่าเป็น LED ก่อน',
      items: [
        'โคม LED 155 lm/W · ขาปรับ 90°',
        'รับประกัน 5 ปี · IP66 มอก.',
        'Node LTE สำหรับการควบคุมพื้นฐาน',
        'Dashboard พื้นฐานแสดงข้อมูลสำคัญ',
      ],
      budget: '💰 อัปเกรดได้ในอนาคตเป็น Smart',
    },
    {
      tag: 'Smart · แนะนำ',
      tagBg: '#4A7C59',
      title: 'แพ็กเกจ Smart\nครบ Dashboard',
      who: 'เหมาะกับ: ท่านที่อยากระบบครบ + Real-time monitoring',
      items: [
        'รวมทุกอย่างของ Basic',
        'Node LTE ทุกโคม + Schedule Dimming ตามช่วงเวลา',
        'Web Dashboard · Advance Data',
        'ระบบแจ้งเตือนเมื่อโคมเสีย',
      ],
      budget: '💰 ระบบครบจบ · พร้อมใช้งานได้ทันที',
    },
    {
      tag: 'Premium',
      tagBg: C.accent,
      title: 'แพ็กเกจ Premium\nAdaptive Dimming',
      who: 'เหมาะกับ: ท่านที่อยากประหยัดสูงสุด + ต่อยอด Smart City',
      items: [
        'รวมทุกอย่างของ Smart',
        'Mobile App สำหรับช่างไฟ',
        'Custom Dashboard · Tailored Report',
        'Adaptive Dimming · เชื่อม CCTV หรือ Radar · ปรับแสงตามรถจริง',
        'AI Analytics ระดับเมือง',
      ],
      budget: '💰 ประหยัดไฟสูงสุด · พลังงานที่เหลือใช้ขยายเขตได้',
    },
  ];
  return (
    <Slide num={11}>
      <Eyebrow accent>เปรียบเทียบแพ็กเกจ</Eyebrow>
      <Title>เลือกแพ็กเกจที่เหมาะกับเทศบาลของท่าน</Title>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 18, flex: 1 }}>
        {menus.map((m, i) => (
          <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 20, padding: '28px 26px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <span style={{ position: 'absolute', top: 0, right: 0, background: m.tagBg, color: '#FFF', fontSize: 13, fontWeight: 700, padding: '6px 16px', borderBottomLeftRadius: 14 }}>{m.tag}</span>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: C.primaryDeep, marginBottom: 4, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{m.title}</h3>
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
        ราคารายโคม/รายโครงการเสนอตามขนาดพื้นที่ · ทีมงานช่วยจัดสรรงบและประเมินจุดติดตั้งให้ฟรี
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 12 — REAL DASHBOARD #1: Lamps / Devices
// ---------------------------------------------------------------------------

function ScreenSlide({ num, eyebrow, title, lead, img, alt, points, footnote }) {
  return (
    <Slide num={num}>
      <Eyebrow accent>{eyebrow}</Eyebrow>
      <Title size={30}>{title}</Title>
      <p style={{ fontSize: 14, color: C.textMuted, marginTop: 4, marginBottom: 10 }}>
        {lead}
      </p>
      <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 18 }}>
        <div style={{ borderRadius: 14, overflow: 'hidden', background: '#0F1A22', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 28px rgba(0,0,0,0.18)' }}>
          <img src={img} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
          {points.map((p, i) => (
            <div key={i} style={{ background: '#FFF', borderRadius: 14, padding: '14px 18px', border: `1px solid ${C.surfaceSoft}`, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 26, lineHeight: 1, flexShrink: 0 }}>{p.ic}</div>
              <div>
                <h4 style={{ fontSize: 15.5, fontWeight: 700, color: C.primaryDeep, marginBottom: 3, lineHeight: 1.4 }}>{p.t}</h4>
                <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.5 }}>{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {footnote && (
        <p style={{ fontSize: 12, color: C.primary, fontWeight: 600, marginTop: 10 }}>{footnote}</p>
      )}
    </Slide>
  );
}

function Slide12() {
  return (
    <ScreenSlide
      num={12}
      eyebrow="หน้าจอจริงของระบบ · Lamps / Devices"
      title="Dashboard ภาพรวม · เห็นทุกโคมในหน้าจอเดียว"
      lead="หน้าจอบริหารโคมไฟทุกดวงทั้งเขต — กรองได้ตาม Site · Status · Tenant และโฟกัสไปที่ Devices needing attention ก่อน"
      img={`${IMG}/Screen1.webp`}
      alt="GGismo Smart Light · Lamps / Devices Dashboard"
      points={[
        { ic: '📊', t: '5 KPI หลักด้านบน', d: 'Total · Online · Offline · Maintenance · Needs Attention — สรุปสถานะทั้งเขตในแถวเดียว' },
        { ic: '🔎', t: 'Filter ตาม Site · Status · Tenant', d: 'ดูเฉพาะกอง / เฉพาะหมู่ / เฉพาะที่ Offline — ลดเวลาค้นหาเป็นวินาที' },
        { ic: '⚠️', t: '"Devices needing attention" first', d: 'ระบบดันโคมที่มีปัญหาขึ้นก่อน — ช่างไฟรู้ทันทีว่าต้องไปดูที่ไหนก่อน' },
      ]}
      footnote="หน้าจอนี้คือระบบที่ติดตั้งใช้งานจริง — ไม่ใช่ภาพ mockup"
    />
  );
}

// ---------------------------------------------------------------------------
// SLIDE 13 — REAL DASHBOARD #2: Device Map
// ---------------------------------------------------------------------------

function Slide13() {
  return (
    <ScreenSlide
      num={13}
      eyebrow="หน้าจอจริงของระบบ · Device Map"
      title="แผนที่ติดตามตำแหน่ง · ทุกโคม ทุกถนน บน Google Maps"
      lead="เห็นโคมทุกดวงพร้อมพิกัด GPS · สีของหมุดบอกสถานะทันที — ช่างไฟกดเปิด Google Maps นำทางได้เลย"
      img={`${IMG}/location.webp`}
      alt="GGismo Smart Light · Device Map (GIS)"
      points={[
        { ic: '🗺️', t: 'GIS พิกัดจริงทุกโคม', d: 'ดูภาพรวมการกระจายของโคมไฟทั้งเขต — รู้ทันทีว่าหมู่ไหนยังขาดไฟ' },
        { ic: '🚦', t: 'สีหมุด = สถานะ', d: 'แดง = Offline · ส้ม = แจ้งเตือน · เขียว = Online — ดูสีรู้ทันทีว่าจุดไหนต้องไปก่อน' },
        { ic: '🧭', t: 'นำทางจาก Map ได้เลย', d: 'กดที่หมุด → เปิด Google Maps พาช่างไปถึงโคมจริง · ไม่ต้องตามหาเลขเสา' },
      ]}
      footnote="แผนที่อ้างอิงจริงจาก deployment ของลูกค้าเทศบาล"
    />
  );
}

// ---------------------------------------------------------------------------
// SLIDE 14 — REAL DASHBOARD #3: Alerts
// ---------------------------------------------------------------------------

function Slide14() {
  return (
    <Slide num={14}>
      <Eyebrow accent>หน้าจอจริงของระบบ · Alerts</Eyebrow>
      <Title size={30}>ระบบแจ้งเตือนอัตโนมัติ · ไม่ต้องรอประชาชนแจ้ง</Title>
      <p style={{ fontSize: 14, color: C.textMuted, marginTop: 4, marginBottom: 10 }}>
        ทุกเหตุการณ์ผิดปกติถูกเปิดเป็น Alert พร้อม Severity, Rule, Duration, และ Auto-assign ไปที่ทีมที่รับผิดชอบ — ปิด workflow ในระบบเดียว
      </p>
      <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 18 }}>
        <div style={{ borderRadius: 14, overflow: 'hidden', background: '#0F1A22', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 28px rgba(0,0,0,0.18)' }}>
          <img src={`${IMG}/Alerts.webp`} alt="GGismo Smart Light · Alerts" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11, justifyContent: 'center' }}>
          {[
            { ic: '🚨', t: '4 สถานะ Alert', d: 'Total · Open · Acknowledged · Resolved — รู้ทันทีว่ายังมีกี่เคสค้าง' },
            { ic: '📋', t: 'Rule บอกชัด ทำไมเตือน', d: 'เช่น "กำลังไฟฟ้าต่ำกว่าปกติ Power: 85W (ปกติ 150W)" — ช่างวินิจฉัยเองได้ก่อนออก' },
            { ic: '⏱️', t: 'Duration ของแต่ละ Alert', d: '2h 15m, 51m — รู้ว่าเรื่องนี้ค้างนานแค่ไหน · จัดลำดับ urgency ได้' },
            { ic: '👷', t: 'Auto-assigned ไปทีม', d: 'ระบบมอบหมาย Tech Team อัตโนมัติตามประเภท Alert — ไม่มีเคสตกหล่น' },
          ].map((p, i) => (
            <div key={i} style={{ background: '#FFF', borderRadius: 12, padding: '11px 14px', border: `1px solid ${C.surfaceSoft}`, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{p.ic}</div>
              <div>
                <h4 style={{ fontSize: 14.5, fontWeight: 700, color: C.primaryDeep, marginBottom: 2, lineHeight: 1.4 }}>{p.t}</h4>
                <p style={{ fontSize: 12.5, color: C.textMuted, lineHeight: 1.5 }}>{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p style={{ fontSize: 12, color: C.primary, fontWeight: 600, marginTop: 10 }}>
        Dark theme เหมาะกับ war room / ศูนย์ติดตาม 24 ชม. — เปิดทิ้งไว้บนจอใหญ่ตลอดเวลา
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 15 — RACI (Roles)
// ---------------------------------------------------------------------------

function Slide15() {
  const raci = [
    { who: 'ระบบ (ของเรา)', do: 'เฝ้าสัญญาณ · แจ้งเตือน · Dimming อัตโนมัติ · ออกรายงาน · นำทาง — ไม่ทำงานช่าง' },
    { who: 'ช่างไฟ / กองช่าง', do: 'รับ Alert · ออกซ่อมตามพิกัด · ปิดงานในระบบ — เหมือนเดิมแต่ตรงจุดและน้อยกว่ามาก' },
    { who: 'หัวหน้ากองช่าง', do: 'ดู Dashboard ภาพรวม · จัดสรรช่างประจำวัน · ใช้รายงานวางแผนงบ' },
    { who: 'ผู้บริหารเทศบาล', do: 'ดู KPI ภาพรวม · ใช้รายงานตอบสภาฯ · ขยายขอบเขตโครงการ' },
  ];
  return (
    <Slide num={15}>
      <Eyebrow>ความรับผิดชอบชัดเจน</Eyebrow>
      <Title>ใครทำหน้าที่อะไร — ระบบช่วย ไม่ใช่แทนคน</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        เรื่องที่กังวลคือ "เพิ่มของ แล้วต้องเพิ่มคนอีกไหม" — คำตอบคือ ไม่ต้อง ระบบช่วยให้คนที่มีอยู่ทำงานได้ดีและตรงจุดมากขึ้น
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
        ระบบเป็นเครื่องมือของช่างและผู้บริหาร — ไม่ใช่ของฝ่าย ICT ที่ใครจะใช้ก็ต้องเรียก ICT มา
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 16 — ลดงานช่างไฟ
// ---------------------------------------------------------------------------

function Slide16() {
  return (
    <Slide num={16}>
      <Eyebrow>เบาแรงช่างไฟ</Eyebrow>
      <Title>ระบบนี้ช่วยลดงาน ไม่ใช่เพิ่มงาน</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, marginTop: 20, flex: 1, alignContent: 'center' }}>
        <Card style={{ border: `2px solid ${C.alert}` }}>
          <span style={{ display: 'inline-block', fontSize: 13, fontWeight: 600, padding: '5px 12px', borderRadius: 100, background: C.alertSoft, color: C.alert, marginBottom: 12 }}>แบบเดิม</span>
          <CardTitle style={{ marginBottom: 12 }}>ขับรถตระเวนตรวจทุกต้น</CardTitle>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: C.textMuted }}>
            ช่างไฟต้องขับรถวนเขตทุกสัปดาห์เพื่อตรวจไฟ ใช้น้ำมัน เวลา และคน — ยังพลาดโคมที่ดับระหว่างวันอยู่ดี
          </p>
        </Card>
        <div style={{ borderRadius: 18, overflow: 'hidden', background: C.primarySoft }}>
          <img src={`${IMG}/installation/IMG_5887.jpeg`} alt="ติดตั้งโคมไฟกับ Node" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <Card style={{ border: `2px solid ${C.success}` }}>
          <span style={{ display: 'inline-block', fontSize: 13, fontWeight: 600, padding: '5px 12px', borderRadius: 100, background: C.successSoft, color: C.success, marginBottom: 12 }}>แบบใหม่</span>
          <CardTitle style={{ marginBottom: 12 }}>ระบบบอกเอง — ไปเฉพาะที่ต้องไป</CardTitle>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: C.textMuted }}>
            ระบบเฝ้าทุกโคมตลอด 24 ชม. ช่างไปเฉพาะดวงที่แจ้ง พร้อมพิกัด GPS — เปลี่ยนงานจาก "ตรวจไล่" เป็น "ซ่อมตรงจุด"
          </p>
        </Card>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 17 — KPI ตอบสภาฯ (was Slide 18)
// ---------------------------------------------------------------------------

function Slide17() {
  const benefits = [
    { ic: '⏱️', t: 'ลดเวลาแก้ปัญหา', d: 'จาก "วัน/สัปดาห์" เหลือ "ชั่วโมง" — ช่างไปตรงจุดทันที' },
    { ic: '⚡', t: 'ประหยัดค่าไฟ 50–70%', d: 'LED 155 lm/W + Dimming ช่วงรถน้อย · มีตัวเลขรายเดือนยืนยัน' },
    { ic: '📋', t: 'มีตัวเลขตอบสภาฯ', d: 'จำนวนโคม · สถานะ · Alert ที่ปิดได้ · kWh ที่ประหยัด — ผลงานวัดได้' },
    { ic: '🏆', t: 'ภาพลักษณ์ผู้นำ Smart City', d: 'ใช้เป็น case study + ต่อยอดสมัครรางวัล อปท. ดีเด่นได้' },
  ];
  return (
    <Slide num={17}>
      <Eyebrow>สิ่งที่เทศบาลและประชาชนได้</Eyebrow>
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
          <div style={{ borderRadius: 18, overflow: 'hidden', minHeight: 0 }}>
            <img src={`${IMG}/installation/IMG_5052.jpeg`} alt="ติดตั้งโคมไฟ" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ borderRadius: 18, overflow: 'hidden', minHeight: 0 }}>
            <img src={`${IMG}/installation/IMG_6042.jpeg`} alt="ใช้งานจริง" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 18 — LED Hardware Track Record (replaces old Support slide)
// Honest framing: Smart Light system is new, but the underlying LED hardware
// has 50+ site references meeting standard illumination.
// ---------------------------------------------------------------------------

function Slide18() {
  const kpis = [
    { ic: '🏛️', big: '50+', label: 'เทศบาล / อบต.', sub: 'ติดตั้งจริงทั่วประเทศ' },
    { ic: '📅', big: '5+', label: 'ปีใช้งานจริง', sub: 'พิสูจน์ความทนทาน' },
    { ic: '✅', big: 'IES', label: 'LM-79 / LM-80', sub: 'ผ่านมาตรฐานสากล' },
    { ic: '🏷️', big: 'มอก.', label: 'รับรองคุณภาพ', sub: 'มาตรฐานไทย' },
  ];
  const photos = [
    { src: `${IMG}/installation/IMG_5052.jpeg`, alt: 'ติดตั้งโคม LED · เทศบาล' },
    { src: `${IMG}/installation/IMG_5887.jpeg`, alt: 'โคม LED ขาปรับองศา' },
    { src: `${IMG}/installation/IMG_6042.jpeg`, alt: 'โคม LED ใช้งานจริง' },
    { src: `${IMG}/installation/IMG_5057.jpeg`, alt: 'โคม LED บนเสา' },
    { src: `${IMG}/installation/IMG_6040.jpeg`, alt: 'งานติดตั้งภาคสนาม' },
    { src: `${IMG}/installation/IMG_6032.jpeg`, alt: 'ถนนตอนกลางคืน · แสงตามมาตรฐาน' },
  ];
  return (
    <Slide num={18}>
      <Eyebrow accent>ฐานฮาร์ดแวร์ Smart Light · Hardware Track Record</Eyebrow>
      <Title size={30}>โคม LED ของเรา ติดตั้งจริง 50+ แห่ง · แสงตามมาตรฐาน</Title>
      <p style={{ fontSize: 14.5, color: C.textMuted, marginTop: 6, lineHeight: 1.55, maxWidth: 1080 }}>
        Smart Light ใช้ <strong style={{ color: C.primary }}>โคม LED ตัวเดียวกัน</strong> กับที่เราติดตั้งให้เทศบาล/อบต. มา 5+ ปี —
        แสงสว่างตามมาตรฐาน IES LM-79/80 · มอก. · ทนแดดทนฝนพิสูจน์แล้ว
      </p>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 12, flexShrink: 0 }}>
        {kpis.map((k, i) => (
          <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 12, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: C.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{k.ic}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.primaryDeep, lineHeight: 1.05 }}>{k.big}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>{k.label}</div>
              <div style={{ fontSize: 10.5, color: C.textMuted, lineHeight: 1.3 }}>{k.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Photo grid 3×2 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: '1fr 1fr', gap: 10, marginTop: 12, flex: 1, minHeight: 0 }}>
        {photos.map((p, i) => (
          <div key={i} style={{ borderRadius: 12, overflow: 'hidden', background: '#0F1A22', minHeight: 0, position: 'relative' }}>
            <img src={p.src} alt={p.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '6px 10px', background: 'linear-gradient(0deg, rgba(0,0,0,0.65) 0%, transparent 100%)', color: '#FFF', fontSize: 11, fontWeight: 600 }}>
              {p.alt}
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 11.5, color: C.textMuted, fontStyle: 'italic', marginTop: 8, flexShrink: 0 }}>
        หมายเหตุ: Smart Light (Node LTE + Cloud) เป็นรุ่นใหม่ที่เรากำลังเริ่มโครงการนำร่องกับเทศบาลที่สนใจ · ส่วน LED hardware ที่ใช้ มีฐานติดตั้งจริง 50+ แห่ง ดังภาพ
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 20 — CTA · 3 คำถาม
// ---------------------------------------------------------------------------

function Slide20() {
  return (
    <Slide num={19} dark>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Eyebrow dark>ขั้นต่อไป</Eyebrow>
        <Title dark size={44}>
          ขอเวลาท่านสักครู่<br />คุยเรื่องไฟถนนในเขตของท่าน
        </Title>
        <Lead dark style={{ marginTop: 20, maxWidth: 940 }}>
          ท่านไม่ต้องตัดสินใจอะไรในวันนี้ — เราอยากฟังก่อนว่าเทศบาลของท่านเจอปัญหาอะไร
          มีโคมกี่ดวงในเขต พื้นที่ลักษณะไหน แล้วจึงเสนอแบบที่เหมาะกับงบและบริบทจริง ไม่ใช่ขายแพ็กเกจสำเร็จรูป
        </Lead>
        <div style={{ marginTop: 30, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 18, padding: '24px 28px', maxWidth: 980 }}>
          <h3 style={{ color: '#FFF', fontSize: 20, fontWeight: 700, marginBottom: 14 }}>3 คำถามที่อยากฟังจากท่าน</h3>
          <p style={{ color: 'rgba(255,255,255,.9)', fontSize: 17, lineHeight: 1.9 }}>
            1. ปัญหาเรื่องไฟถนนที่หนักที่สุดในเขตของท่าน คืออะไร?<br />
            2. งบที่มีอยู่ตอนนี้สำหรับไฟถนน รายปีอยู่ที่เท่าไหร่?<br />
            3. ถ้าจะเริ่มทดลอง — เริ่มที่ถนนสายไหน หรือหมู่ไหนก่อนดี?
          </p>
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// Toolbar (jump-to-slide + print)
// ---------------------------------------------------------------------------

function Toolbar() {
  const [open, setOpen] = useState(false);
  const titles = [
    '1 · 🚨 Pain · ไฟถนนดับเป็นเดือน กว่าจะรู้',
    '2 · 🚨 Pain · 4 เรื่องที่วิธีเดิมตามไม่ทัน',
    '3 · ✨ Solution · ระบบ "รู้ก่อน" ทุกโคม',
    '4 · 🔧 How · End-to-End Architecture',
    '5 · 📦 Hardware · LED 155 lm/W + ขาปรับ 90°',
    '6 · 📦 Hardware · Node LTE + Socket NEMA',
    '7 · 🩺 Benefit · 4 สัญญาณ ก่อนเป็นเรื่องใหญ่',
    '8 · 💰 ROI · รู้ก่อน · ซ่อมทัน · ประหยัดทุกคืน',
    '9 · 🏆 Why us · 3 จุดต่างที่มั่นใจได้',
    '10 · 🌱 Choice · 3 แพ็กเกจให้เลือก',
    '11 · 💵 Plans · Basic / Smart / Premium',
    '12 · 📊 Demo · Lamps / Devices Dashboard',
    '13 · 📊 Demo · Device Map (GIS)',
    '14 · 📊 Demo · Alerts ระบบแจ้งเตือน',
    '15 · 🎯 Roles · ใครทำหน้าที่อะไร',
    '16 · 💪 Win · ระบบช่วยลดงานช่างไฟ',
    '17 · 🏛️ Outcome · KPI ตอบสภาฯ ได้',
    '18 · 🏗️ Track Record · LED ติดตั้งจริง 50+ แห่ง',
    '19 · 🤝 Close · 3 คำถาม + ขั้นต่อไป',
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

export default function SmartLightPitchDeck() {
  const slides = [Slide01, Slide02, Slide03, Slide04, Slide05, Slide06, Slide07, Slide08, Slide09, Slide10, Slide11, Slide12, Slide13, Slide14, Slide15, Slide16, Slide17, Slide18, Slide20];
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
