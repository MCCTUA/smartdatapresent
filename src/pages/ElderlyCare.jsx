import React, { useEffect, useState, useRef } from 'react';
import RotateHint from '../components/RotateHint';

// ---------------------------------------------------------------------------
// ElderlyCare.jsx — "Software-First" Sales Pitch Deck
// 20 slides · A4 landscape 1123×794 (√2:1) · print-to-PDF ready (1 slide / page)
// Design: Civic Trust palette (Forest #0F6E56 + Cream #FAF7EE + Amber #BA7517)
// Font: Sarabun · no brand names
// Source: ElderlyCare_Pitch_SoftwareFirst_v2.html (mockup) → rebuilt as React slides
// Mechanism mirrors ElderlyCareLegacy.jsx (Slide shell · SlideCtx · ScaledSlide ·
// ScrollDots · Toolbar window.print() · AppDemoModal · DeckStyles @media print)
// ---------------------------------------------------------------------------

// Civic Trust palette
const C = {
  primary: '#0F6E56',
  primaryHover: '#1D9E75',
  primaryDeep: '#0B5544',
  primarySoft: '#E5F0EA',
  tealSoft: '#9FE1CB',
  surface: '#FAF7EE',
  surfaceSoft: '#F5F1E4',
  line: '#E4DECB',
  text: '#1F2A24',
  textMuted: '#5F6B65',
  accent: '#BA7517',
  accentSoft: '#FAEEDA',
  accentLine: '#EAD9A6',
  alert: '#A32D2D',
  alertSoft: '#FCEBEB',
  alertLine: '#F0C9C9',
  success: '#3B6D11',
  successSoft: '#EAF3DE',
  cctv: '#185FA5'
};

const IMG = 'images/elderly-care';
const ECG_WATCH = `${IMG}/ECG%20WATCH.png`; // filename has a space → URL-encode
const SLIDE_W = 1123;
const SLIDE_H = 794;
const TOTAL_SLIDES = 20; // fallback only — real {num,total} come from SlideCtx (array order)

// Page numbering is automatic: the deck wrapper provides {num,total} via this context
// based on the slides[] array order. The num={...} per slide is a fallback label only —
// to reorder/insert a slide, edit the slides[] array + titles[] (in Toolbar) only.
const SlideCtx = React.createContext(null);

// ---------------------------------------------------------------------------
// Slide shell — fixed A4 landscape, scaled to viewport (screen) and 1:1 (print)
// ---------------------------------------------------------------------------

function Slide({
  num,
  dark = false,
  pad = '46px 56px 52px',
  children,
  footer = ''
}) {
  const ctx = React.useContext(SlideCtx);
  const shownNum = ctx?.num ?? num;
  const shownTotal = ctx?.total ?? TOTAL_SLIDES;
  return (
    <section
      className="slide-page"
      data-dark={dark ? 'true' : 'false'}
      style={{
        position: 'relative',
        width: SLIDE_W,
        height: SLIDE_H,
        background: dark
          ? `linear-gradient(150deg, ${C.primaryDeep} 0%, #0F4A3D 55%, ${C.primary} 100%)`
          : C.surface,
        color: dark ? '#FFF' : C.text,
        overflow: 'hidden',
        fontFamily: 'Sarabun, sans-serif',
        flexShrink: 0
      }}
    >
      {!dark && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 9,
            background: C.primary
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: pad,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0
        }}
      >
        {children}
      </div>
      {footer && (
        <div
          style={{
            position: 'absolute',
            bottom: 18,
            left: 56,
            fontSize: 12,
            color: dark ? 'rgba(255,255,255,0.7)' : C.textMuted,
            opacity: 0.9,
            fontWeight: 500,
            maxWidth: 880,
            lineHeight: 1.4
          }}
        >
          {footer}
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          right: 34,
          fontSize: 13,
          color: dark ? 'rgba(255,255,255,0.7)' : C.textMuted,
          fontWeight: 500
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

function Eyebrow({ color, dark, alert, accent, children, style }) {
  const col =
    color ||
    (alert ? C.alert : accent ? C.accent : dark ? C.tealSoft : C.primary);
  return (
    <p
      style={{
        display: 'inline-block',
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: col,
        marginBottom: 12,
        ...style
      }}
    >
      {children}
    </p>
  );
}

function Title({ dark, size = 32, children, style }) {
  return (
    <h2
      style={{
        fontSize: size,
        fontWeight: 700,
        lineHeight: 1.32,
        color: dark ? '#FFF' : C.primaryDeep,
        letterSpacing: -0.3,
        ...style
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
        fontSize: 17,
        fontWeight: 400,
        lineHeight: 1.62,
        color: dark ? 'rgba(255,255,255,0.88)' : C.textMuted,
        ...style
      }}
    >
      {children}
    </p>
  );
}

function Card({ children, dark, accentTop, style }) {
  return (
    <div
      style={{
        background: dark ? 'rgba(255,255,255,0.08)' : '#FFF',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.18)' : C.line}`,
        borderRadius: 16,
        borderTop: accentTop ? `4px solid ${accentTop}` : undefined,
        padding: '20px 22px',
        ...style
      }}
    >
      {children}
    </div>
  );
}

// Hardware "ดี/ประหยัด/เสถียร"-style card: coloured heading + bullet list
function HCard({ head, headColor, items, accentTop, dense, style }) {
  return (
    <div
      style={{
        background: '#FFF',
        border: `1px solid ${C.line}`,
        borderRadius: 14,
        borderTop: accentTop ? `4px solid ${accentTop}` : undefined,
        padding: dense ? '11px 14px' : '16px 18px',
        ...style
      }}
    >
      <h3
        style={{
          fontSize: dense ? 14.5 : 16,
          fontWeight: 700,
          color: headColor || C.primary,
          marginBottom: dense ? 5 : 8,
          lineHeight: 1.3
        }}
      >
        {head}
      </h3>
      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: dense ? 4 : 7
        }}
      >
        {items.map((t, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: 7,
              fontSize: dense ? 11.5 : 13,
              color: C.textMuted,
              lineHeight: 1.4
            }}
          >
            <span style={{ color: C.primary, fontWeight: 800, flexShrink: 0 }}>
              ·
            </span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Note({ children, style }) {
  return (
    <div
      style={{
        fontSize: 12.5,
        color: C.textMuted,
        marginTop: 14,
        padding: '12px 16px',
        background: '#FFF',
        border: `1px solid ${C.line}`,
        borderRadius: 12,
        lineHeight: 1.55,
        ...style
      }}
    >
      {children}
    </div>
  );
}

// Two-column device table (อุปกรณ์ | หน้าที่)
function DeviceTable({ head = ['อุปกรณ์', 'หน้าที่'], rows, style }) {
  return (
    <div
      style={{
        background: '#FFF',
        border: `1px solid ${C.line}`,
        borderRadius: 14,
        overflow: 'hidden',
        ...style
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1.35fr',
          background: C.surfaceSoft
        }}
      >
        {head.map((h, i) => (
          <div
            key={i}
            style={{
              padding: '10px 16px',
              fontWeight: 700,
              fontSize: 13,
              color: C.text,
              borderBottom: `1px solid ${C.line}`
            }}
          >
            {h}
          </div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 1.35fr',
            borderBottom: i === rows.length - 1 ? 'none' : `1px solid ${C.line}`
          }}
        >
          <div
            style={{
              padding: '9px 16px',
              fontSize: 12.5,
              color: C.text,
              fontWeight: 600,
              lineHeight: 1.4
            }}
          >
            {r[0]}
          </div>
          <div
            style={{
              padding: '9px 16px',
              fontSize: 12.5,
              color: C.textMuted,
              lineHeight: 1.4
            }}
          >
            {r[1]}
          </div>
        </div>
      ))}
    </div>
  );
}

// Amber/red callout box
function WarnBox({ tone = 'amber', children, style }) {
  const map = {
    amber: { bg: C.accentSoft, border: C.accentLine, color: '#6B4A12' },
    red: { bg: C.alertSoft, border: C.alertLine, color: '#7A2E2E' }
  };
  const t = map[tone];
  return (
    <div
      style={{
        background: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: 12,
        padding: '13px 16px',
        fontSize: 13,
        color: t.color,
        lineHeight: 1.65,
        ...style
      }}
    >
      {children}
    </div>
  );
}

// Large figure (image + caption)
function Figure({ src, alt, caption, style, imgStyle }) {
  return (
    <figure
      style={{
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        ...style
      }}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          background: '#FFF',
          border: `1px solid ${C.line}`,
          borderRadius: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: 8
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            ...imgStyle
          }}
        />
      </div>
      {caption && (
        <figcaption
          style={{
            fontSize: 12,
            color: C.textMuted,
            marginTop: 7,
            textAlign: 'center',
            lineHeight: 1.4,
            flexShrink: 0
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Demo CTA button
function DemoButton({ onClick, big, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        background: C.primary,
        color: '#FFF',
        border: 'none',
        borderRadius: 12,
        padding: big ? '15px 38px' : '12px 24px',
        fontFamily: 'inherit',
        fontSize: big ? 18 : 15,
        fontWeight: 700,
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(15,110,86,0.30)',
        ...style
      }}
    >
      ▶ เปิดระบบจริง (กดเล่นได้)
    </button>
  );
}

// ---------------------------------------------------------------------------
// Inline SVG (ก) — ข้อมูลเข้า → ซอฟต์แวร์ → ผลลัพธ์
// ---------------------------------------------------------------------------

function FlowDiagram() {
  const inputs = [
    'ปุ่มขอความช่วยเหลือ / ไลน์ / โทร',
    'เซนเซอร์จับการล้ม (ไม่จับภาพ)',
    'นาฬิกาเฝ้าระวังหัวใจ'
  ];
  const outputs = [
    'แจ้งครอบครัว + อสม. ทันที',
    'ประสานรถ–คนได้ตรงจุด',
    'ถึงมือหมอทันนาทีทอง'
  ];
  return (
    <svg
      viewBox="0 0 1000 250"
      preserveAspectRatio="xMidYMid meet"
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        fontFamily: 'Sarabun, sans-serif'
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="ec-arr-a"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M0,0 L10,5 L0,10 z" fill={C.primary} />
        </marker>
        <linearGradient id="ec-core-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.primary} />
          <stop offset="100%" stopColor={C.primaryDeep} />
        </linearGradient>
      </defs>

      <text x="40" y="26" fontSize="13" fontWeight="600" fill={C.textMuted}>
        ข้อมูลเข้า (เสริมได้ภายหลัง)
      </text>
      {inputs.map((t, i) => (
        <g key={i}>
          <rect
            x="20"
            y={46 + i * 58}
            width="290"
            height="46"
            rx="9"
            fill={C.alertSoft}
            stroke={C.alertLine}
          />
          <text
            x="165"
            y={73 + i * 58}
            textAnchor="middle"
            fontSize="13.5"
            fill="#791F1F"
          >
            {t}
          </text>
        </g>
      ))}

      <line
        x1="318"
        y1="130"
        x2="378"
        y2="130"
        stroke={C.primary}
        strokeWidth="2.5"
        markerEnd="url(#ec-arr-a)"
      />

      <rect
        x="388"
        y="58"
        width="224"
        height="134"
        rx="16"
        fill="url(#ec-core-a)"
      />
      <text
        x="500"
        y="96"
        textAnchor="middle"
        fontSize="13"
        fill={C.tealSoft}
        letterSpacing="0.5"
      >
        ซอฟต์แวร์ดูแลผู้สูงอายุ
      </text>
      <text
        x="500"
        y="130"
        textAnchor="middle"
        fontSize="20"
        fontWeight="700"
        fill="#FFF"
      >
        ผู้พิทักษ์เงียบ 24 ชม.
      </text>
      <text x="500" y="160" textAnchor="middle" fontSize="14" fill={C.tealSoft}>
        รู้ · ประสาน · ส่งต่อ
      </text>

      <line
        x1="622"
        y1="130"
        x2="682"
        y2="130"
        stroke={C.primary}
        strokeWidth="2.5"
        markerEnd="url(#ec-arr-a)"
      />

      <text x="692" y="26" fontSize="13" fontWeight="600" fill={C.textMuted}>
        ผลลัพธ์
      </text>
      {outputs.map((t, i) => (
        <g key={i}>
          <rect
            x="690"
            y={46 + i * 58}
            width="290"
            height="46"
            rx="9"
            fill={C.successSoft}
            stroke="#C0DD97"
          />
          <text
            x="835"
            y={73 + i * 58}
            textAnchor="middle"
            fontSize="13.5"
            fill="#085041"
          >
            {t}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Inline SVG (ข) — แจ้งเหตุไล่ลำดับ 3 ชั้น (เผื่อถาม)
// ---------------------------------------------------------------------------

function EscalationDiagram() {
  const tiers = [
    {
      x: 168,
      head: 'ชั้น 1',
      sub: 'อสม. / ญาติ / เพื่อนบ้าน',
      sub2: 'แจ้งผ่านไลน์',
      fill: '#FFF',
      stroke: C.line,
      hc: C.text
    },
    {
      x: 386,
      head: 'ชั้น 2',
      sub: 'เทศบาล + รพ.สต.',
      sub2: 'รับเหตุ + ส่งต่อ',
      fill: '#FFF',
      stroke: C.line,
      hc: C.text
    },
    {
      x: 604,
      head: 'ชั้น 3',
      sub: 'กู้ชีพ 1669',
      sub2: 'เหตุหนัก / ไม่มีคนรับ',
      fill: '#FFF',
      stroke: C.line,
      hc: C.text
    }
  ];
  return (
    <svg
      viewBox="0 0 1000 150"
      preserveAspectRatio="xMidYMid meet"
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        fontFamily: 'Sarabun, sans-serif'
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="ec-arr-b"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M0,0 L10,5 L0,10 z" fill={C.primary} />
        </marker>
      </defs>

      {/* เกิดเหตุ */}
      <rect
        x="10"
        y="42"
        width="148"
        height="66"
        rx="11"
        fill={C.alertSoft}
        stroke={C.alertLine}
      />
      <text
        x="84"
        y="72"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={C.alert}
      >
        เกิดเหตุ
      </text>
      <text x="84" y="93" textAnchor="middle" fontSize="11.5" fill="#791F1F">
        ล้ม / กดปุ่ม / ผิดปกติ
      </text>

      {tiers.map((t, i) => (
        <g key={i}>
          <line
            x1={t.x - 12}
            y1="75"
            x2={t.x + 6}
            y2="75"
            stroke={C.primary}
            strokeWidth="2.5"
            markerEnd="url(#ec-arr-b)"
          />
          <rect
            x={t.x + 12}
            y="42"
            width="178"
            height="66"
            rx="11"
            fill={t.fill}
            stroke={t.stroke}
          />
          <text
            x={t.x + 101}
            y="68"
            textAnchor="middle"
            fontSize="14.5"
            fontWeight="700"
            fill={C.primary}
          >
            {t.head}
          </text>
          <text
            x={t.x + 101}
            y="86"
            textAnchor="middle"
            fontSize="11.5"
            fill={C.text}
          >
            {t.sub}
          </text>
          <text
            x={t.x + 101}
            y="101"
            textAnchor="middle"
            fontSize="10.5"
            fill={C.textMuted}
          >
            {t.sub2}
          </text>
        </g>
      ))}

      {/* มีคนไปถึง */}
      <line
        x1="810"
        y1="75"
        x2="828"
        y2="75"
        stroke={C.primary}
        strokeWidth="2.5"
        markerEnd="url(#ec-arr-b)"
      />
      <rect
        x="834"
        y="42"
        width="156"
        height="66"
        rx="11"
        fill={C.successSoft}
        stroke="#C0DD97"
      />
      <text
        x="912"
        y="72"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={C.success}
      >
        มีคนไปถึง
      </text>
      <text x="912" y="93" textAnchor="middle" fontSize="11.5" fill="#27500A">
        ปิดเหตุ + บันทึก
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Inline SVG (ค) — การวางเสาเกตเวย์ครอบคลุมพื้นที่ (ซ้อนทับ ~20%)
// ---------------------------------------------------------------------------

function GatewayPlacementDiagram() {
  return (
    <svg
      viewBox="0 0 560 470"
      preserveAspectRatio="xMidYMid meet"
      style={{
        display: 'block',
        width: '100%',
        height: 'auto',
        maxHeight: '100%',
        fontFamily: 'Sarabun, sans-serif'
      }}
      role="img"
      aria-label="แผนผังการวางเสาเกตเวย์ครอบคลุมพื้นที่ ซ้อนทับ 20 เปอร์เซ็นต์"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text x="95" y="58" fill={C.primary} fontSize="17" fontWeight="700">
        พื้นที่โล่ง
      </text>
      <text x="402" y="92" fill={C.accent} fontSize="17" fontWeight="700">
        พื้นที่ตึกสูง
      </text>
      <circle
        cx="150"
        cy="205"
        r="92"
        fill={C.primary}
        fillOpacity="0.12"
        stroke={C.primary}
        strokeWidth="2.5"
      />
      <circle
        cx="300"
        cy="205"
        r="92"
        fill={C.primary}
        fillOpacity="0.12"
        stroke={C.primary}
        strokeWidth="2.5"
      />
      <circle
        cx="225"
        cy="320"
        r="92"
        fill={C.primary}
        fillOpacity="0.12"
        stroke={C.primary}
        strokeWidth="2.5"
      />
      <circle
        cx="400"
        cy="195"
        r="60"
        fill={C.accent}
        fillOpacity="0.14"
        stroke={C.accent}
        strokeWidth="2.5"
      />
      <circle
        cx="472"
        cy="235"
        r="60"
        fill={C.accent}
        fillOpacity="0.14"
        stroke={C.accent}
        strokeWidth="2.5"
      />
      <text
        x="225"
        y="183"
        fill={C.primary}
        fontSize="12.5"
        fontWeight="700"
        textAnchor="middle"
      >
        ซ้อน ~20%
      </text>
      {[
        ['150', '205', 'เสา 1'],
        ['300', '205', 'เสา 2'],
        ['225', '320', 'เสา 3'],
        ['400', '195', 'เสา 4'],
        ['472', '235', 'เสา 5']
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r="5" fill="#2B2B2B" />
          <text
            x={p[0]}
            y={String(Number(p[1]) + 25)}
            fill="#2B2B2B"
            fontSize="12.5"
            textAnchor="middle"
          >
            {p[2]}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// App Demo Modal — เปิด mockup ระบบจริง (public/ui/elderly_app.html) ทับสไลด์
// ปิดด้วยปุ่ม X / ESC / คลิกพื้นหลัง → กลับมาที่สไลด์เดิม
// ---------------------------------------------------------------------------

function AppDemoModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'rgba(15,30,24,0.82)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(8px, 2vw, 28px)',
        animation: 'ecFade .2s ease'
      }}
    >
      <style>{`@keyframes ecFade{from{opacity:0}to{opacity:1}}`}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          height: '100%',
          maxWidth: 1600,
          background: '#F7F4EC',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        <div
          style={{
            flexShrink: 0,
            height: 50,
            background: C.primaryDeep,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 18px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 14.5,
              fontWeight: 700
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                background: C.tealSoft
              }}
            />
            ตัวอย่างระบบจริง — ElderlyCare 360° (กดปุ่มในระบบเพื่อทดลองได้)
          </div>
          <button
            onClick={onClose}
            aria-label="ปิด"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255,255,255,0.16)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '7px 14px',
              fontFamily: 'inherit',
              fontSize: 13.5,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            ✕ ปิด · กลับสู่การนำเสนอ
          </button>
        </div>
        <iframe
          src={`${import.meta.env.BASE_URL}ui/elderly_app.html`}
          title="ElderlyCare 360° — ตัวอย่างระบบจริง"
          style={{
            flex: 1,
            width: '100%',
            border: 'none',
            display: 'block',
            background: '#fff'
          }}
        />
      </div>
    </div>
  );
}

// ===========================================================================
// SLIDES (18)
// ===========================================================================

// 1 · HOOK
function Slide01Hook() {
  return (
    <Slide num={1} dark pad="0">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${IMG}/hero-elderly.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.16
        }}
      />
      <div
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '56px 70px'
        }}
      >
        <Eyebrow dark>เรื่องจริงจากหน้างาน</Eyebrow>
        <h1
          style={{
            fontSize: 46,
            fontWeight: 700,
            lineHeight: 1.32,
            color: '#FFF',
            letterSpacing: -0.5,
            maxWidth: 920
          }}
        >
          "แม่ล้มในห้องน้ำตอนเช้า
          <br />
          กว่าจะมีคนรู้ ก็บ่ายไปแล้ว"
        </h1>
        <Lead dark style={{ marginTop: 22, maxWidth: 820 }}>
          เราได้ยินเรื่องแบบนี้จากแทบทุกตำบลที่ไปคุย —
          ผู้สูงอายุที่อยู่ลำพังมากขึ้นทุกปี เหตุวิกฤติอย่างหกล้ม หัวใจ
          หรือหลอดเลือดสมอง ล้วนมี "นาทีทอง" ที่ช่วยได้ แต่ความจริงที่เจ็บปวดคือ
          — กว่าจะมีใครรู้ มักจะสายไปแล้ว
        </Lead>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: '#FFF',
            fontWeight: 500,
            marginTop: 16,
            maxWidth: 820
          }}
        >
          วันนี้เราอยากเล่าว่า ตำบลของท่านดูแลคนเหล่านี้ให้ทันเวลาได้
          โดยไม่ต้องเป็นผู้เชี่ยวชาญเทคโนโลยี
        </p>
      </div>
    </Slide>
  );
}

// 2 · WHY NOW
function Slide02WhyNow() {
  return (
    <Slide num={2}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Eyebrow accent style={{ marginBottom: 18 }}>
          ทำไมต้องเป็นตอนนี้
        </Eyebrow>
        <div
          style={{
            fontSize: 128,
            fontWeight: 700,
            lineHeight: 1.1,
            color: C.primary
          }}
        >
          1 ใน 5
        </div>
        <Title size={30} style={{ marginTop: 18, maxWidth: 860 }}>
          คนไทย คือ ผู้สูงอายุ — และตัวเลขนี้กำลังโตขึ้นทุกปี
        </Title>
        <Lead style={{ marginTop: 14, maxWidth: 800 }}>
          ประเทศไทยเข้าสู่{' '}
          <b style={{ color: C.text }}>
            "สังคมสูงอายุโดยสมบูรณ์" แล้วตั้งแต่ปี 2567
          </b>{' '}
          (ผู้สูงอายุราว 20.7% ของประชากร) และกำลังจะเป็น
          "สังคมสูงวัยระดับสุดยอด" ภายในปี 2576
          การดูแลผู้สูงอายุจึงไม่ใช่เรื่องของอนาคต —
          แต่เป็นภารกิจที่มาถึงโต๊ะของ อปท. แล้ววันนี้
          และเป็นวาระที่ตรงกับนโยบายระดับชาติพอดี
        </Lead>
      </div>
    </Slide>
  );
}

// 3 · TURNING POINT
function Slide03Turning() {
  const [showDemo, setShowDemo] = useState(false);
  return (
    <Slide num={3}>
      {showDemo && <AppDemoModal onClose={() => setShowDemo(false)} />}
      <Eyebrow accent>จุดเปลี่ยน</Eyebrow>
      <Title size={28}>
        ช่วยให้ทำงานสะดวกขึ้น เฝ้าดูตลอด 24 ชั่วโมงโดยไม่ละเมิดสิทธิ —
        เพื่อสังคมที่น่าอยู่
      </Title>
      <Lead style={{ marginTop: 10, maxWidth: 940 }}>
        ลองนึกถึง อสม. สมศรี ที่ดูแลสุขภาพคนทั้งคุ้มกว่าสิบหลังคาเรือน —
        เธอไปเยี่ยมได้ทีละบ้าน แต่เหตุฉุกเฉินไม่เคยรอให้เธอไปถึง
        เธอไม่ได้ต้องการอุปกรณ์ เธอต้องการ "รู้ทันเวลา"
      </Lead>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 18,
          marginTop: 18
        }}
      >
        <Card accentTop={C.alert}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.alert }}>
            เมื่อก่อน
          </span>
          <h3
            style={{
              fontSize: 19,
              fontWeight: 700,
              color: C.text,
              margin: '4px 0 6px'
            }}
          >
            รู้ตอนสาย
          </h3>
          <p style={{ color: C.textMuted, fontSize: 14.5, lineHeight: 1.6 }}>
            ยายล้มแล้วไม่มีใครรู้จนหลายชั่วโมง · สมศรีต้องเดินเยี่ยมทีละบ้าน ·
            รู้สึกผิดทั้งที่ไม่ใช่ความผิดเธอ
          </p>
        </Card>
        <Card accentTop={C.primary}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.primary }}>
            วันนี้
          </span>
          <h3
            style={{
              fontSize: 19,
              fontWeight: 700,
              color: C.text,
              margin: '4px 0 6px'
            }}
          >
            รู้ทันที
          </h3>
          <p style={{ color: C.textMuted, fontSize: 14.5, lineHeight: 1.6 }}>
            พอยายเป็นอะไร สมศรีและครอบครัวรู้ทันที —
            แจ้งเตือนเข้ามือถือเครื่องเดิม{' '}
            <b style={{ color: C.text }}>ใช้ง่ายเหมือนได้รับไลน์</b>
          </p>
        </Card>
      </div>
      <div
        style={{
          marginTop: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24
        }}
      >
        <Lead style={{ flex: 1, marginBottom: 0 }}>
          หัวใจของระบบคือ{' '}
          <b style={{ color: C.text }}>
            ซอฟต์แวร์ที่คอยเฝ้าให้เงียบ ๆ ตลอด 24 ชั่วโมง
          </b>{' '}
          ทำงานอยู่เบื้องหลัง — คนของท่านเข้าทันทวงทีที่เกิดเหตุ
          ไม่ต้องรอให้ใครโทรตาม
        </Lead>
        <DemoButton
          onClick={() => setShowDemo(true)}
          style={{ flexShrink: 0 }}
        />
      </div>
    </Slide>
  );
}

// 4 · HOW (3 ข้อ) + เผื่อถาม (แจ้ง 3 ชั้น)
function Slide04How() {
  return (
    <Slide num={4}>
      <Eyebrow>เข้าใจทั้งระบบใน 3 ข้อ</Eyebrow>
      <Title size={30}>รู้เหตุ → ประสานคน → ส่งถึงมือหมอทันเวลา</Title>
      <Lead style={{ marginTop: 8, maxWidth: 980, fontSize: 15.5 }}>
        อุปกรณ์ต่าง ๆ เป็นเพียง "ข้อมูลที่ส่งเข้ามา" —
        เสริมเข้าได้ตามงบและความเสี่ยงของแต่ละพื้นที่
        ไม่ต้องมีครบทุกอย่างตั้งแต่วันแรก
      </Lead>
      <div
        style={{
          marginTop: 12,
          background: '#FFF',
          border: `1px solid ${C.line}`,
          borderRadius: 16,
          padding: '14px 20px',
          height: 250,
          flexShrink: 0
        }}
      >
        <FlowDiagram />
      </div>
      <div
        style={{
          marginTop: 14,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 6
          }}
        >
          <span
            style={{
              fontSize: 12.5,
              fontWeight: 700,
              color: '#FFF',
              background: C.primary,
              borderRadius: 100,
              padding: '3px 12px',
              flexShrink: 0
            }}
          >
            เผื่อถาม
          </span>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: C.primaryDeep }}>
            เกิดเหตุจริง ระบบแจ้งไล่ลำดับ 3 ชั้น จนกว่าจะมีคนไปถึงตัว
          </h3>
        </div>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            background: C.surfaceSoft,
            border: `1px solid ${C.line}`,
            borderRadius: 14,
            padding: '8px 16px'
          }}
        >
          <EscalationDiagram />
        </div>
        <p
          style={{
            fontSize: 12.5,
            color: C.textMuted,
            marginTop: 8,
            lineHeight: 1.5
          }}
        >
          👨‍👩‍👧 <b style={{ color: C.text }}>ครอบครัวรู้คู่ขนานทุกขั้น</b>{' '}
          ไม่ต้องรอเทศบาลโทรตาม · 🔒{' '}
          <b style={{ color: C.text }}>บันทึกแก้ย้อนหลังไม่ได้</b> มีเวลา +
          ผู้รับผิดชอบทุกขั้น
        </p>
      </div>
    </Slide>
  );
}

// 5 · เวลาเกิดเหตุ ใครเห็นอะไรเมื่อไหร่ (ตอบคำถามจากที่ประชุม — accountability matrix)
function SlideWhoSeesWhat() {
  const colHeads = [
    'ทันทีที่เกิดเหตุ',
    'ถ้ายังไม่มีคนรับ (~5 นาที)',
    'เมื่อปิดเหตุ + บันทึก'
  ];
  const rows = [
    {
      ic: '👨‍👩‍👧',
      who: 'ครอบครัว / ลูกหลาน',
      tier: 'เห็นคู่ขนานทุกขั้น',
      tc: C.accent,
      cells: [
        {
          alert: true,
          t: 'แจ้งเข้าไลน์/แอป — รู้ทันทีว่าใคร ที่ไหน เหตุอะไร + แผนที่'
        },
        { t: 'เห็นสถานะว่ามีคนรับเรื่องแล้วหรือยัง' },
        { t: 'เห็นผล "มีคนไปถึงแล้ว" + สรุปเหตุ' }
      ]
    },
    {
      ic: '🏃',
      who: 'อสม. / เพื่อนบ้าน',
      tier: 'ชั้น 1',
      tc: C.primary,
      cells: [
        {
          alert: true,
          t: 'คนใกล้สุดได้รับแจ้ง — กด "รับเรื่อง" + นำทางไปถึงตัว'
        },
        { t: 'ถ้ายังว่าง ระบบส่งต่อชั้นถัดไปอัตโนมัติ' },
        { t: 'บันทึกว่าใครรับและไปถึง' }
      ]
    },
    {
      ic: '🏛️',
      who: 'เทศบาล + รพ.สต.',
      tier: 'ชั้น 2',
      tc: C.primary,
      cells: [
        { t: 'เห็นเหตุใหม่บนแดชบอร์ด + สถานะกำลังแจ้งชั้น 1' },
        { alert: true, t: 'เด้งให้รับเรื่อง + ประสานรถ/คน/ทรัพยากร' },
        { t: 'เห็นสรุป + เวลาแต่ละขั้น (audit log)' }
      ]
    },
    {
      ic: '🚑',
      who: 'กู้ชีพ 1669',
      tier: 'ชั้น 3',
      tc: C.alert,
      cells: [
        { muted: true, t: '— เฉพาะเหตุหนัก' },
        { alert: true, t: 'เหตุหนัก/ไม่มีคนรับ → ส่งข้อมูล + พิกัดให้ 1669' },
        { t: 'รับเคสต่อ / บันทึกร่วม' }
      ]
    }
  ];
  const gt = '0.92fr 1.22fr 1.22fr 1.08fr';
  return (
    <Slide num={5}>
      <Eyebrow accent>คำถามจากที่ประชุม · ความรับผิดชอบชัดเจน</Eyebrow>
      <Title size={28}>เวลาเกิดเหตุ — ใครเห็นอะไร เมื่อไหร่</Title>
      <Lead style={{ marginTop: 6, fontSize: 14.5, maxWidth: 1010 }}>
        <b style={{ color: C.text }}>0 วินาที:</b> เซนเซอร์/ปุ่ม/นาฬิกาจับสัญญาณ
        → ระบบบันทึกเหตุและเริ่มจับเวลาทันที · ทุกการ "เห็น/รับเรื่อง"
        ถูกบันทึกเวลาอัตโนมัติ
      </Lead>
      <div
        style={{
          marginTop: 14,
          background: '#FFF',
          border: `1px solid ${C.line}`,
          borderRadius: 14,
          overflow: 'hidden',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: gt,
            background: C.primary
          }}
        >
          <div
            style={{
              padding: '11px 16px',
              color: '#FFF',
              fontWeight: 700,
              fontSize: 13
            }}
          >
            ใคร
          </div>
          {colHeads.map((h, i) => (
            <div
              key={i}
              style={{
                padding: '11px 16px',
                color: '#FFF',
                fontWeight: 700,
                fontSize: 13,
                borderLeft: '1px solid rgba(255,255,255,0.22)'
              }}
            >
              {h}
            </div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: gt,
              borderTop: `1px solid ${C.line}`,
              flex: 1,
              minHeight: 0
            }}
          >
            <div
              style={{
                padding: '10px 16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 3,
                background: C.surfaceSoft
              }}
            >
              <div style={{ fontSize: 20, lineHeight: 1 }}>{r.ic}</div>
              <div
                style={{
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: C.text,
                  lineHeight: 1.25
                }}
              >
                {r.who}
              </div>
              <span
                style={{
                  alignSelf: 'flex-start',
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: '#FFF',
                  background: r.tc,
                  borderRadius: 100,
                  padding: '2px 9px'
                }}
              >
                {r.tier}
              </span>
            </div>
            {r.cells.map((c, j) => (
              <div
                key={j}
                style={{
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  borderLeft: `1px solid ${C.line}`,
                  background: c.alert ? C.accentSoft : '#FFF'
                }}
              >
                <p
                  style={{
                    fontSize: 12.5,
                    lineHeight: 1.45,
                    color: c.muted ? C.textMuted : C.text,
                    fontStyle: c.muted ? 'italic' : 'normal'
                  }}
                >
                  {c.alert && <b style={{ color: '#854F0B' }}>🔔 </b>}
                  {c.t}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <p
        style={{
          fontSize: 12,
          color: C.textMuted,
          marginTop: 10,
          lineHeight: 1.5
        }}
      >
        🔔 = จุดที่ได้รับแจ้งให้ลงมือ ·{' '}
        <b style={{ color: C.text }}>ครอบครัวเห็นคู่ขนานทุกขั้น</b>{' '}
        ไม่ต้องรอเทศบาลโทรตาม · ทุกช่อง "เห็น/รับเรื่อง" บันทึกเวลาอัตโนมัติ{' '}
        <b style={{ color: C.text }}>แก้ย้อนหลังไม่ได้</b>
      </p>
    </Slide>
  );
}

// 6 · WHO BENEFITS
function Slide05Who() {
  const parties = [
    {
      who: 'ครอบครัว',
      color: C.alert,
      body: 'ออกไปทำงานได้เต็มที่ เพราะรู้ว่ามีระบบคอยเฝ้าให้ — และจะรู้ทันทีถ้ามีเหตุ'
    },
    {
      who: 'อสม. / เจ้าหน้าที่',
      color: C.primary,
      body: 'เข้าถึงคนที่ต้องช่วยก่อน ไม่ต้องคลำหา ไม่จมกองเอกสาร ทำงานได้ทั้งตำบลอย่างมั่นใจ'
    },
    {
      who: 'ผู้บริหารท้องถิ่น',
      color: C.accent,
      body: 'ตอบโจทย์สังคมสูงวัยตรงนโยบายชาติ มีข้อมูลใช้วางแผนดูแลทั้งตำบล และเป็นต้นแบบให้พื้นที่อื่น'
    }
  ];
  return (
    <Slide num={5}>
      <Eyebrow>ทุกฝ่ายได้ประโยชน์</Eyebrow>
      <Title size={32}>ดูแลเชิงรุก = ทั้งตำบลใช้ชีวิตได้สบายใจขึ้น</Title>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 20,
          flex: 1,
          minHeight: 0,
          marginTop: 26,
          alignContent: 'center'
        }}
      >
        {parties.map((p, i) => (
          <Card key={i} style={{ padding: '28px 26px' }}>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: p.color,
                marginBottom: 12
              }}
            >
              {p.who}
            </h3>
            <p style={{ color: C.textMuted, fontSize: 16, lineHeight: 1.7 }}>
              {p.body}
            </p>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

// 6 · SOFTWARE FEATURES (3 กลุ่ม)
function Slide06Features() {
  const groups = [
    {
      head: 'ช่วยเจ้าหน้าที่ทำงานง่ายขึ้น',
      color: C.primary,
      items: [
        [
          'แจ้งเตือนเข้ามือถือเครื่องเดิม',
          'ใช้งานเหมือนได้รับไลน์ ไม่ต้องเรียนรู้อะไรใหม่'
        ],
        [
          'รายชื่อกลุ่มเสี่ยง จัดลำดับให้',
          'รู้ว่าต้องดูใครก่อน ไม่ต้องไล่เยี่ยมแบบเดาสุ่ม'
        ],
        ['แจ้งเหตุไล่ลำดับอัตโนมัติ', 'ส่งต่อจนกว่าจะมีคนรับ เหตุไม่ตกหล่น'],
        ['บันทึกเหตุให้อัตโนมัติ', 'ไม่จมกองเอกสาร และมีหลักฐานครบทุกเหตุ'],
        ['เห็นประวัติผู้สูงอายุรายคน', 'เยี่ยมบ้านได้ตรงจุด พูดคุยได้แม่นขึ้น']
      ]
    },
    {
      head: 'ช่วยดูแลผู้สูงอายุ',
      color: C.alert,
      items: [
        ['ปุ่มขอความช่วยเหลือกดเดียว', 'เรียกคนช่วยได้ทันที แม้อยู่บ้านลำพัง'],
        [
          'เฝ้าระวังการล้ม 24 ชม.',
          'รู้แม้ไม่มีใครอยู่ด้วย โดยไม่จับภาพ ไม่เห็นหน้าในที่ส่วนตัว'
        ],
        ['เฝ้าระวังหัวใจ', 'เห็นสัญญาณผิดปกติล่วงหน้า พาไปหาหมอทัน'],
        ['ครอบครัวรู้คู่ขนานทุกเหตุ', 'ลูกหลานอุ่นใจ ไม่รู้สึกทอดทิ้งพ่อแม่'],
        ['ช่วยถึงตัวในนาทีทอง', 'ลดความรุนแรงของเหตุ เพิ่มโอกาสรอด']
      ]
    },
    {
      head: 'ช่วยเทศบาลบริหาร',
      color: C.accent,
      items: [
        [
          'แดชบอร์ดภาพรวมทั้งตำบล',
          'เห็นสถานการณ์ผู้สูงอายุทั้งพื้นที่ในจอเดียว'
        ],
        ['ข้อมูล-สถิติพร้อมทำรายงาน', 'ใช้ของบและรายงานผลตามนโยบายชาติได้'],
        [
          'หลักฐานครบทุกเหตุ',
          'ตรวจสอบย้อนหลังได้ ลดความเสี่ยงเรื่องความรับผิด'
        ],
        [
          'เชื่อมหลายหน่วยงานบนข้อมูลชุดเดียว',
          'รพ.สต. · กู้ชีพ · ครอบครัว ทำงานไม่ซ้ำซ้อน'
        ],
        [
          'เพิ่มฟีเจอร์-อุปกรณ์ได้ทีละส่วน',
          'เริ่มเล็กคุมงบได้ ขยายเมื่อพร้อมโดยไม่ต้องรื้อ'
        ]
      ]
    }
  ];
  const [staff, elder, muni] = groups;
  return (
    <Slide num={6}>
      <Eyebrow>มุมมองซอฟต์แวร์ · ฟีเจอร์เด่น</Eyebrow>
      <Title size={28}>ตัวซอฟต์แวร์ช่วยแต่ละฝ่ายอย่างไร</Title>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          flex: 1,
          minHeight: 0,
          marginTop: 14
        }}
      >
        {/* แถวบน — เจ้าหน้าที่ + ผู้สูงอายุ (2 คอลัมน์) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            flex: 1,
            minHeight: 0
          }}
        >
          {[staff, elder].map((g, i) => (
            <div
              key={i}
              style={{
                background: '#FFF',
                border: `1px solid ${C.line}`,
                borderTop: `4px solid ${g.color}`,
                borderRadius: 14,
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <h3
                style={{
                  fontSize: 17.5,
                  fontWeight: 700,
                  color: g.color,
                  marginBottom: 10
                }}
              >
                {g.head}
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8
                }}
              >
                {g.items.map((it, j) => (
                  <li key={j} style={{ fontSize: 13.5, lineHeight: 1.45 }}>
                    <b style={{ color: C.text }}>{it[0]}</b>{' '}
                    <span style={{ color: C.textMuted }}>— {it[1]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* แถวล่าง — ช่วยเทศบาลบริหาร (เต็มแถว เน้นอ่านง่าย) */}
        <div
          style={{
            background: '#FFF',
            border: `1px solid ${C.line}`,
            borderTop: `4px solid ${muni.color}`,
            borderRadius: 14,
            padding: '18px 24px',
            flexShrink: 0
          }}
        >
          <h3
            style={{
              fontSize: 21,
              fontWeight: 800,
              color: muni.color,
              marginBottom: 12
            }}
          >
            {muni.head}
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: '11px 26px'
            }}
          >
            {muni.items.map((it, j) => (
              <div key={j} style={{ fontSize: 15, lineHeight: 1.5 }}>
                <b style={{ color: C.text, fontWeight: 700 }}>{it[0]}</b>
                <span style={{ color: C.textMuted }}> — {it[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}

// 7 · START SMALL
function Slide07StartSmall() {
  const pills = [
    { t: '✓ เริ่มวันนี้ · ปุ่มขอความช่วยเหลือ + แจ้งผ่านไลน์', start: true },
    { t: '+ เสริมภายหลัง · เซนเซอร์จับการล้ม' },
    { t: '+ เสริมภายหลัง · กล้องช่วยดูพื้นที่ส่วนกลาง (โดยความยินยอม)' },
    { t: '+ เสริมภายหลัง · นาฬิกาเฝ้าระวังหัวใจ' },
    { t: '+ อุปกรณ์ใหม่ในอนาคต' }
  ];
  return (
    <Slide num={7}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Eyebrow>เริ่มเล็ก แล้วขยายได้</Eyebrow>
        <Title size={34}>
          เริ่มจากที่มีวันนี้ แล้วค่อยเสริมเมื่อพร้อม — ไม่ต้องรื้อ
        </Title>
        <Lead style={{ marginTop: 14, maxWidth: 820 }}>
          เริ่มจากกลุ่มเสี่ยงสูงก่อน เห็นผลจริง แล้วต่อยอดทีหลังได้
          (สถาปัตยกรรมแบบ plug-in)
        </Lead>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            marginTop: 32,
            maxWidth: 960
          }}
        >
          {pills.map((p, i) => (
            <span
              key={i}
              style={{
                fontSize: 16,
                fontWeight: p.start ? 700 : 500,
                padding: '11px 22px',
                borderRadius: 980,
                background: p.start ? C.successSoft : C.surfaceSoft,
                color: p.start ? '#27500A' : C.textMuted,
                border: `1px solid ${p.start ? '#C0DD97' : C.line}`
              }}
            >
              {p.t}
            </span>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// 8 · HARDWARE INTRO
function Slide08HwIntro() {
  const groups = [
    {
      n: '①',
      head: 'อุปกรณ์ LoRa',
      color: C.primary,
      body: 'เซนเซอร์/ปุ่มไร้สายระยะไกล กินไฟต่ำ ครอบทั้งตำบลด้วยเกตเวย์จุดเดียว'
    },
    {
      n: '②',
      head: 'กล้อง CCTV + AI',
      color: C.cctv,
      body: 'ตรวจจับการล้มในพื้นที่ส่วนกลาง ประมวลผลในเครื่อง ส่งเฉพาะเหตุการณ์'
    },
    {
      n: '③',
      head: 'นาฬิกา ECG',
      color: C.alert,
      body: 'เฝ้าระวังหัวใจ + AFib ส่งรายงานให้แพทย์ตัดสินใจ'
    }
  ];
  return (
    <Slide num={8}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Eyebrow>ฮาร์ดแวร์ที่รองรับ</Eyebrow>
        <Title size={32}>ซอฟต์แวร์คือสมอง · ฮาร์ดแวร์คือประสาทสัมผัส</Title>
        <Lead style={{ marginTop: 12, maxWidth: 940 }}>
          เราขายซอฟต์แวร์บริหารจัดการเป็นแกนกลาง — ฮาร์ดแวร์คือ "ตัวป้อนข้อมูล"
          ที่เลือก เพิ่ม ลดได้ตามโจทย์และงบของแต่ละพื้นที่ แบ่งเป็น 3 กลุ่ม
        </Lead>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 20,
            marginTop: 30
          }}
        >
          {groups.map((g, i) => (
            <Card key={i} style={{ padding: '24px 24px' }}>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: g.color,
                  marginBottom: 8
                }}
              >
                {g.n} {g.head}
              </h3>
              <p
                style={{ color: C.textMuted, fontSize: 14.5, lineHeight: 1.6 }}
              >
                {g.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// 9 · LoRa
function Slide09LoRa() {
  const devices = [
    ['เกตเวย์ในร่ม รุ่นเล็ก', 'รับสัญญาณ 1 อาคาร/ชุมชนเล็ก (ประหยัดสุด)'],
    ['เกตเวย์ในร่ม รุ่นหลายจุด', 'ครอบหลายห้อง/อาคารใหญ่'],
    ['เกตเวย์ Outdoor (4G บนเสา)', 'ครอบพื้นที่กว้างกลางแจ้ง · มีไฟสำรอง'],
    [
      'เซนเซอร์เฝ้าระวังการล้ม (ไม่มีภาพ)',
      'จับการล้มในห้องส่วนตัว ไม่บันทึกภาพ (privacy)'
    ],
    ['ปุ่มขอความช่วยเหลือฉุกเฉิน (SOS)', 'กดเรียกช่วยเหลือ แบตอยู่หลายปี'],
    [
      'เซนเซอร์น้ำรั่ว/น้ำท่วม · สิ่งแวดล้อม (PM2.5/CO₂)',
      'เฝ้าระวังจุดเสี่ยงน้ำ และคุณภาพอากาศ'
    ],
    ['เซนเซอร์ประตู-หน้าต่าง / การเคลื่อนไหว', 'เฝ้าระวังความปลอดภัยในบ้าน']
  ];
  return (
    <Slide num={9}>
      <Eyebrow>① อุปกรณ์เชื่อมต่อแบบ LoRa</Eyebrow>
      <Title size={25}>
        ส่งสัญญาณไกล กินไฟต่ำ ครอบทั้งตำบลด้วยเกตเวย์จุดเดียว
      </Title>
      <Lead
        style={{ marginTop: 5, fontSize: 13, maxWidth: 1040, lineHeight: 1.45 }}
      >
        LoRa = สื่อสารไร้สายระยะไกลกินไฟต่ำมาก ส่งข้อมูลขนาดเล็กผ่านคลื่นเสรี
        (920–925 MHz) — อุปกรณ์ปลายทางส่งตรงไป "เกตเวย์" 1 ตัว ที่รวบรวมเข้าระบบ
      </Lead>
      {/* บน — รูปใหญ่เด่น (ซ้าย) + การ์ดดี/ประหยัด/เสถียร (ขวา) — ที่เหลือหลังหักรายการอุปกรณ์ */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: 18,
          flex: 1,
          minHeight: 0,
          marginTop: 10,
          overflow: 'hidden'
        }}
      >
        <Figure
          src={`${IMG}/LoRa_WorkFlow_V2.png`}
          alt="ผังการทำงาน LoRa"
          caption="อุปกรณ์ → เกตเวย์ 1 จุด → ประมวลผล → แดชบอร์ด/แจ้งเตือน"
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            minHeight: 0,
            overflow: 'hidden'
          }}
        >
          <HCard
            dense
            head="ดีอย่างไร"
            headColor={C.primary}
            items={[
              'ระยะไกลระดับกิโลเมตร — เกตเวย์ตัวเดียวครอบทั้งตำบล',
              'ทะลุผนัง/อาคารดีกว่า WiFi · กินไฟต่ำ แบตหลายปี',
              '1 เกตเวย์รับได้หลายสิบ–ร้อยอุปกรณ์'
            ]}
          />
          <HCard
            dense
            head="ลดค่าใช้จ่าย"
            headColor={C.success}
            items={[
              '1 เกตเวย์ครอบกว้าง ไม่ต้องติดเน็ตทุกจุด',
              'ไม่เดินสาย/ไม่ใส่ซิมทุกจุด ประหยัดติดตั้ง',
              'ขยายภายหลัง = เพิ่มแค่เซนเซอร์'
            ]}
          />
          <HCard
            dense
            head="เสถียรอย่างไร"
            headColor={C.accent}
            items={[
              'คลื่นเสรี ไม่แย่งช่อง WiFi/BT',
              'ไม่พึ่งเน็ตบ้านรายจุด · มีไฟสำรอง (UPS)',
              'สถาปัตยกรรม star จุดล้มเหลวน้อย'
            ]}
          />
        </div>
      </div>
      {/* ล่าง — รายการอุปกรณ์ในกลุ่ม LoRa แบบ 2 คอลัมน์ (ความสูงตามจริง · กันทับซ้อน) */}
      <div style={{ flexShrink: 0, marginTop: 12 }}>
        <div
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            color: C.primary,
            marginBottom: 7
          }}
        >
          อุปกรณ์ในกลุ่ม LoRa (เลือกเพิ่ม–ลดได้ตามพื้นที่)
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px 14px'
          }}
        >
          {devices.map((d, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 9,
                alignItems: 'baseline',
                background: '#FFF',
                border: `1px solid ${C.line}`,
                borderRadius: 10,
                padding: '8px 13px'
              }}
            >
              <span
                style={{ color: C.primary, fontWeight: 800, flexShrink: 0 }}
              >
                •
              </span>
              <div style={{ lineHeight: 1.35 }}>
                <b style={{ fontSize: 13, color: C.text }}>{d[0]}</b>
                <span style={{ fontSize: 12, color: C.textMuted }}>
                  {' '}
                  — {d[1]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// 10 · CCTV + AI
function Slide10Cctv() {
  return (
    <Slide num={10}>
      <Eyebrow color={C.cctv}>② กล้อง CCTV + AI</Eyebrow>
      <Title size={26}>
        ตรวจจับการล้มในพื้นที่ส่วนกลาง — ประมวลผลในเครื่อง ส่งเฉพาะเหตุการณ์
      </Title>
      <Lead
        style={{ marginTop: 6, fontSize: 14, maxWidth: 1010, lineHeight: 1.55 }}
      >
        กล้องบันทึกเหตุการณ์ทำงานคู่กับ "กล่องประมวลผล AI" ที่ติดตั้งในพื้นที่ →
        AI วิเคราะห์ภาพตรวจจับการล้มในพื้นที่ส่วนกลาง (ห้องนั่งเล่น ทางเดิน)
        แล้วส่งเฉพาะ "เหตุการณ์" (event) เข้าระบบ
      </Lead>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 18,
          flex: 1,
          minHeight: 0,
          marginTop: 14
        }}
      >
        <Figure
          src={`${IMG}/pillar-cctv.jpg`}
          alt="กล้องตรวจการล้มพื้นที่ส่วนกลาง"
          caption="กล้องตรวจการล้มในพื้นที่ส่วนกลาง · ติดตั้งโดยความยินยอม ไม่ติดห้องน้ำ/ห้องนอน"
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            minHeight: 0
          }}
        >
          <HCard
            head="คุ้มครองความเป็นส่วนตัว"
            headColor={C.cctv}
            items={[
              'ประมวลผลที่ตัวกล่อง (Edge AI) ไม่ส่งวิดีโอออกนอกพื้นที่ — สอดคล้อง PDPA',
              'ส่งแค่ event + ภาพนิ่งตอนเกิดเหตุ ข้อมูลเล็ก'
            ]}
          />
          <HCard
            head="ประหยัด"
            headColor={C.success}
            items={[
              'ไม่กินอินเทอร์เน็ต/พื้นที่จัดเก็บมหาศาล ค่าเน็ต/ค่าเก็บต่ำ',
              'เลือกกล่องตามขนาด: กล่องเล็ก ~1 กล้อง · กล่องใหญ่หลายกล้อง'
            ]}
          />
          <HCard
            head="เสริมจุดบอด"
            headColor={C.accent}
            items={[
              'กล้อง AI ดูพื้นที่ส่วนกลาง · เซนเซอร์ LoRa ดูห้องส่วนตัว (ไม่มีภาพ)',
              'สองชั้นครอบคลุมกัน'
            ]}
          />
          <DeviceTable
            rows={[
              [
                'กล้องบันทึกเหตุการณ์ (IP)',
                'ติดพื้นที่ส่วนกลาง (ต้องได้รับความยินยอม · ห้ามห้องน้ำ/ห้องนอน)'
              ],
              [
                'กล่องประมวลผล AI ตรวจการล้ม',
                'วิเคราะห์ภาพในพื้นที่ ส่งเฉพาะเหตุการณ์ ไม่ส่งภาพออก'
              ]
            ]}
          />
        </div>
      </div>
    </Slide>
  );
}

// 11 · ECG + AFib
function Slide11Ecg() {
  return (
    <Slide num={11}>
      <Eyebrow alert>③ นาฬิกาเฝ้าระวังหัวใจ (ECG)</Eyebrow>
      <Title size={26}>เฝ้าระวังหัวใจ + AFib — ส่งรายงานให้แพทย์ตัดสินใจ</Title>
      <Lead
        style={{
          marginTop: 6,
          fontSize: 13.5,
          maxWidth: 1010,
          lineHeight: 1.5
        }}
      >
        ภาวะหัวใจห้องบนสั่นพลิ้ว (AFib) ทำให้เลือดคั่งและเกิดลิ่มเลือดได้
        ถ้าลิ่มเลือดหลุดไปอุดหลอดเลือดสมอง = โรคหลอดเลือดสมอง (Stroke)
        ภาวะแทรกซ้อนที่อันตรายที่สุด — นี่คือเหตุผลหลักที่ต้องเฝ้าระวัง
      </Lead>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.82fr 1.18fr',
          gap: 18,
          flex: 1,
          minHeight: 0,
          marginTop: 12
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            minHeight: 0
          }}
        >
          <Figure
            src={ECG_WATCH}
            alt="นาฬิกาเฝ้าระวังหัวใจ"
            caption="บันทึก ECG/ชีพจร/SpO₂ และนับ AF"
            style={{ flex: 1, minHeight: 0 }}
          />
          <WarnBox tone="red" style={{ flexShrink: 0 }}>
            ⚠️ <b>ห้ามใช้กับผู้มีเครื่องกระตุ้นหัวใจ (pacemaker/ICD)</b> —
            ต้องคัดกรองก่อนส่งมอบ
          </WarnBox>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            minHeight: 0
          }}
        >
          <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.55 }}>
            นาฬิกา + ระบบ: บันทึกคลื่นไฟฟ้าหัวใจ (ECG) และสัญญาณชีพ ·
            ตรวจจับและนับการเกิด AF รวมถึง AF burden (สัดส่วนเวลาที่อยู่ในภาวะ
            AF) · ออกรายงานรายเดือนให้แพทย์{' '}
            <b style={{ color: C.text }}>
              บทบาทที่ถูกต้อง = เฝ้าระวัง บันทึก ส่งข้อมูลให้แพทย์ตัดสินใจ
              ไม่ใช่เครื่องวินิจฉัย/สั่งรักษา
            </b>
          </p>
          {/* SPEAKER NOTE — ไม่แสดงผล (สำหรับทีมขายอ่าน):
              ห้ามพูดว่า AF กี่ครั้ง/เดือน → จี้/กินยา · อ้างอิง 2023 ACC/AHA · 2024 ESC */}
          <WarnBox
            tone="amber"
            style={{ padding: '16px 20px', borderWidth: 2, flexShrink: 0 }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: '#854F0B',
                marginBottom: 6,
                lineHeight: 1.3
              }}
            >
              ทำไมต้องเฝ้าระวังหัวใจต่อเนื่อง
            </div>
            <p
              style={{
                fontSize: 13,
                color: '#6B4A12',
                lineHeight: 1.6,
                marginBottom: 10
              }}
            >
              AF (หัวใจห้องบนสั่นพลิ้ว) มัก <b>“เงียบ ไม่มีอาการ”</b>{' '}
              แต่เพิ่มความเสี่ยง <b>“สโตรก”</b> หลายเท่า — ตรวจปีละครั้งจึงไม่พอ{' '}
              <b>ยิ่งรู้เร็ว ยิ่งกันทัน</b>
            </p>
            <div
              style={{
                fontSize: 13.5,
                fontWeight: 700,
                color: '#854F0B',
                marginBottom: 7
              }}
            >
              กรอบการตัดสินใจ{' '}
              <span
                style={{ fontWeight: 400, fontSize: 12, color: '#6B4A12' }}
              >
                (แพทย์เป็นผู้วินิจฉัย — นาฬิกาให้ข้อมูลที่ครบ)
              </span>
            </div>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 6
              }}
            >
              {[
                [
                  'ป้องกันสโตรก',
                  'แพทย์ประเมินจากคะแนนความเสี่ยงรวม (CHA₂DS₂-VASc)'
                ],
                [
                  'เลือกแนวทางรักษา',
                  'แพทย์ดูอาการ + ชนิดของ AF + ภาระการเกิด AF (burden)'
                ],
                [
                  'นาฬิกา = เฝ้าระวัง 24 ชม. + สรุปรายงานให้แพทย์',
                  'ตัดสินใจแม่นและทันเวลา'
                ]
              ].map((b, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 8,
                    fontSize: 12.5,
                    color: '#6B4A12',
                    lineHeight: 1.45
                  }}
                >
                  <span
                    style={{ color: C.accent, fontWeight: 800, flexShrink: 0 }}
                  >
                    ›
                  </span>
                  <span>
                    <b style={{ color: '#854F0B' }}>{b[0]}</b> → {b[1]}
                  </span>
                </li>
              ))}
            </ul>
          </WarnBox>
          <DeviceTable
            style={{ flex: 1, minHeight: 0 }}
            rows={[
              [
                'นาฬิกาเฝ้าระวังหัวใจ (ECG)',
                'บันทึก ECG/ชีพจร/SpO₂ · นับ AF + AF burden · 1 เรือน/คน'
              ],
              [
                'มือถือเชื่อมต่อ (1:1 กับนาฬิกา)',
                'จำเป็น — ใช้แอป + อัปโหลดข้อมูลเข้าระบบทุกวัน'
              ],
              [
                'ชุดเครื่องวัดสุขภาพดิจิทัล (ส่วนกลาง)',
                'ความดัน/น้ำตาล/SpO₂/ชั่งน้ำหนัก เสริมการคัดกรอง'
              ]
            ]}
          />
        </div>
      </div>
    </Slide>
  );
}

// 12 · ตัวอย่างการจัดชุดอุปกรณ์
function Slide12Budget() {
  const cols = ['1.15fr', '1fr', '1fr', '1fr'];
  const headers = [
    { t: '', sub: '' },
    { t: 'แบบ 1', sub: 'นาฬิกาอย่างเดียว' },
    { t: 'แบบ 2', sub: 'ระบบที่มีนาฬิกา' },
    { t: 'แบบ 3', sub: 'ระบบครบ' }
  ];
  const rows = [
    [
      'เน้น',
      'เฝ้าระวังหัวใจเชิงลึก',
      'นาฬิกา + SOS + ศูนย์คัดกรอง',
      'เฝ้าระวังครบทุกแบบ'
    ],
    ['นาฬิกา ECG + มือถือ 1:1', '2 ราย', '1 ราย', '1 ราย'],
    ['เซนเซอร์ LoRa เฝ้าระวังการล้ม', '–', '–', '✓'],
    ['ปุ่ม SOS', '–', '6 จุด', '2 จุด'],
    ['กล้อง CCTV + AI ตรวจการล้ม', '–', '–', '✓'],
    ['ชุดวัดสุขภาพ (ส่วนกลาง)', '✓', '✓', '✓'],
    ['เกตเวย์ LoRa', '–', '✓', '✓']
  ];
  const price = ['ตัวอย่างราคา (รวม VAT)', '47x,xxx', '46x,xxx', '48x,xxx'];
  const gt = `${cols.join(' ')}`;
  return (
    <Slide num={12}>
      <Eyebrow accent>④ ตัวอย่างการจัดชุดอุปกรณ์</Eyebrow>
      <Title size={30}>
        ยกตัวอย่าง 3 รูปแบบ — เลือกชุดที่เหมาะกับพื้นที่และงบ
      </Title>
      <Lead style={{ marginTop: 8, maxWidth: 1000, fontSize: 15 }}>
        ตัวอย่างการจัดชุด ทุกแบบรวม: ซอฟต์แวร์บริหารจัดการ + แดชบอร์ด + ติดตั้ง
        + อบรม + รับประกัน 1 ปี + ค่าระบบ/คลาวด์ปีแรก
      </Lead>
      <div
        style={{
          marginTop: 16,
          background: '#FFF',
          border: `1px solid ${C.line}`,
          borderRadius: 14,
          overflow: 'hidden',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: gt,
            background: C.surfaceSoft,
            borderBottom: `1px solid ${C.line}`
          }}
        >
          {headers.map((h, i) => (
            <div
              key={i}
              style={{
                padding: '12px 16px',
                textAlign: i === 0 ? 'left' : 'center'
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>
                {h.t}
              </div>
              {h.sub && (
                <div
                  style={{
                    fontSize: 11.5,
                    fontWeight: 400,
                    color: C.textMuted,
                    marginTop: 2
                  }}
                >
                  {h.sub}
                </div>
              )}
            </div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: gt,
              borderBottom: `1px solid ${C.line}`,
              flex: 1,
              alignItems: 'center'
            }}
          >
            {r.map((c, j) => (
              <div
                key={j}
                style={{
                  padding: '9px 16px',
                  fontSize: 14,
                  textAlign: j === 0 ? 'left' : 'center',
                  color: j === 0 ? C.text : C.textMuted,
                  fontWeight: j === 0 ? 600 : 400
                }}
              >
                {c}
              </div>
            ))}
          </div>
        ))}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: gt,
            background: C.surfaceSoft,
            alignItems: 'center'
          }}
        >
          {price.map((c, j) => (
            <div
              key={j}
              style={{
                padding: '13px 16px',
                fontSize: j === 0 ? 15 : 17,
                fontWeight: 700,
                textAlign: j === 0 ? 'left' : 'center',
                color: C.text
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
      <Note style={{ marginTop: 12 }}>
        ตัวเลขเป็นเพียงตัวอย่างการจัดชุด — ปรับจำนวนนาฬิกา/เซนเซอร์ตามจริงได้ ·
        ขยายภายหลัง = เพิ่มเฉพาะอุปกรณ์ต่อหน่วย (ระบบ/เกตเวย์มีแล้ว ไม่บานปลาย)
        · รูปแบบและวงเงินการจัดซื้อให้เป็นไปตามระเบียบพัสดุของแต่ละ อปท.
      </Note>
    </Slide>
  );
}

// 13 · FUNDING
function Slide13Funding() {
  const cards = [
    {
      head: 'เบิกผ่านกลไกสุขภาพท้องถิ่น',
      body: 'งานดูแลผู้สูงอายุระยะยาว (LTC) มีงบที่ สปสช. จัดสรรให้ อปท. ผ่านกองทุนหลักประกันสุขภาพท้องถิ่น (กปท.) — เป็นค่าบริการดูแล ไม่ใช่การซื้อของ'
    },
    {
      head: 'คิดเป็น "ค่าบริการ" ไม่ใช่ "ครุภัณฑ์"',
      body: 'เพราะแกนหลักคือซอฟต์แวร์ + บริการดูแล จึงเบิกเป็นค่าบริการรายปีได้ — ไม่ติดเพดานราคาครุภัณฑ์ และไม่ต้องขึ้นทะเบียนทรัพย์สินให้ยุ่งยาก'
    },
    {
      head: 'ผสมแหล่งงบได้ตามจริง',
      body: 'ส่วนบริการใช้งบสุขภาพท้องถิ่น · ส่วนอุปกรณ์ที่จำเป็นใช้งบของ อปท. เอง — เริ่มชุดเล็กในงบที่เบิกได้ก่อน แล้วขยายเมื่อมั่นใจ'
    }
  ];
  return (
    <Slide num={13}>
      <span
        style={{
          display: 'inline-block',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 1,
          textTransform: 'uppercase',
          padding: '5px 13px',
          borderRadius: 980,
          background: C.accent,
          color: '#fff',
          marginBottom: 16
        }}
      >
        ส่วนเสริม · สำหรับฝ่ายงบประมาณ
      </span>
      <Title size={29}>
        "แล้วเอางบไหนมาทำ?" — เบิกได้ ตรงกลไกที่มีอยู่แล้ว
      </Title>
      <Lead style={{ marginTop: 10, maxWidth: 940 }}>
        นี่ไม่ใช่โครงการที่ต้องรอตั้งงบก้อนใหม่ —
        มันวางอยู่บนงบที่ท้องถิ่นใช้ได้อยู่แล้ว
      </Lead>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 18,
          marginTop: 22,
          flex: 1,
          minHeight: 0,
          alignContent: 'center'
        }}
      >
        {cards.map((c, i) => (
          <div
            key={i}
            style={{
              background: '#FFF',
              border: `1px solid ${C.line}`,
              borderTop: `4px solid ${C.accent}`,
              borderRadius: 16,
              padding: '22px 22px'
            }}
          >
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: C.text,
                marginBottom: 10,
                lineHeight: 1.35
              }}
            >
              {c.head}
            </h3>
            <p style={{ color: C.textMuted, fontSize: 14.5, lineHeight: 1.65 }}>
              {c.body}
            </p>
          </div>
        ))}
      </div>
      <Note style={{ marginTop: 14 }}>
        หมายเหตุ: รายละเอียดการเบิกและเพดานต่าง ๆ
        เป็นไปตามมติคณะกรรมการกองทุนและประกาศ สปสช. ของแต่ละปี
        แนะนำให้ยืนยันรูปแบบกับเจ้าหน้าที่พัสดุ อปท. และ สปสช. เขต
        ก่อนวางโครงสร้างงบจริง · ตัวเลขสัดส่วนเป็นการประมาณการเพื่อการนำเสนอ
      </Note>
    </Slide>
  );
}

// 14 · CTA
function Slide14Cta() {
  const [showDemo, setShowDemo] = useState(false);
  const steps = [
    ['1', 'คุยทำความเข้าใจบริบทพื้นที่'],
    ['2', 'สำรวจกลุ่มเสี่ยงสูงในตำบล'],
    ['3', 'นำร่องชุดเล็กที่เห็นผลจริง'],
    ['4', 'ขยายเมื่อมั่นใจ']
  ];
  return (
    <Slide num={14} dark>
      {showDemo && <AppDemoModal onClose={() => setShowDemo(false)} />}
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Eyebrow dark>ขั้นต่อไป · ไม่ต้องตัดสินใจวันนี้</Eyebrow>
        <Title size={34} dark>
          เริ่มอย่างไร — 4 ขั้น ไม่ผูกมัด
        </Title>
        <div
          style={{
            display: 'flex',
            gap: 14,
            marginTop: 32,
            width: '100%',
            maxWidth: 940
          }}
        >
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: 13,
                padding: '18px 14px'
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: C.tealSoft,
                  lineHeight: 1
                }}
              >
                {s[0]}
              </div>
              <p
                style={{
                  fontSize: 14.5,
                  color: '#fff',
                  marginTop: 8,
                  lineHeight: 1.5
                }}
              >
                {s[1]}
              </p>
            </div>
          ))}
        </div>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: '#fff',
            fontWeight: 500,
            margin: '32px auto 0',
            maxWidth: 820
          }}
        >
          ตำบลของท่านเป็นที่แรก ๆ ที่ลงมือดูแลผู้สูงอายุเชิงรุกได้ —
          และเป็นต้นแบบให้พื้นที่ข้างเคียง
        </p>
        <div style={{ marginTop: 30 }}>
          <DemoButton
            onClick={() => setShowDemo(true)}
            big
            style={{
              background: '#fff',
              color: C.primary,
              boxShadow: '0 6px 20px rgba(0,0,0,0.25)'
            }}
          />
        </div>
      </div>
    </Slide>
  );
}

// 6 · โมดูลในระบบ (features list — เดิมเป็น screen captures · เปลี่ยนเป็นรายการฟีเจอร์)
function SlideSystemModules() {
  const [showDemo, setShowDemo] = useState(false);
  const mods = [
    {
      ic: '📊',
      t: 'แดชบอร์ดภาพรวมเทศบาล',
      d: 'เห็นสถานะผู้สูงอายุทั้งตำบลในจอเดียว · กลุ่มเสี่ยง · เหตุล่าสุด · แนวโน้มรายเดือน'
    },
    {
      ic: '🔔',
      t: 'ศูนย์รับแจ้งเหตุฉุกเฉิน',
      d: 'แจ้งไล่ลำดับ (responder chain) จนกว่าจะมีคนรับเรื่อง · บันทึกเวลา + ผู้รับผิดชอบทุกขั้น'
    },
    {
      ic: '🛡️',
      t: 'เฝ้าระวังการล้ม',
      d: 'ติดตามรายห้อง โดยไม่จับภาพห้องน้ำ/ห้องนอน · สั่งจำลองเหตุเพื่อทดสอบได้'
    },
    {
      ic: '📋',
      t: 'ทะเบียนผู้สูงอายุรายคน',
      d: 'ประวัติสุขภาพ + ระดับความเสี่ยง + อุปกรณ์ที่ถืออยู่ · เยี่ยมบ้านได้ตรงจุด'
    },
    {
      ic: '🩺',
      t: 'คัดกรองสุขภาพ',
      d: 'อ่านบัตรประชาชน + OCR ค่าจากเครื่องวัด — บันทึกถูกคน ไม่ต้องคีย์มือ'
    },
    {
      ic: '📄',
      t: 'รายงาน ADL/LTC + เชื่อม JHCIS',
      d: 'สรุปคัดกรอง/ระดับพึ่งพิง ส่งออกรายงาน — ใช้ของบและรายงานผลตามนโยบายได้'
    }
  ];
  return (
    <Slide num={6}>
      {showDemo && <AppDemoModal onClose={() => setShowDemo(false)} />}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 20
        }}
      >
        <div>
          <Eyebrow>ภายในระบบ · โมดูลการทำงาน</Eyebrow>
          <Title size={28}>ระบบเดียว ครบ 6 โมดูลการทำงาน</Title>
          <Lead style={{ marginTop: 6, fontSize: 15, maxWidth: 820 }}>
            ทุกโมดูลอยู่บนข้อมูลชุดเดียวกัน — เริ่มใช้บางส่วนก่อน
            แล้วเปิดเพิ่มภายหลังได้
          </Lead>
        </div>
        <DemoButton
          onClick={() => setShowDemo(true)}
          style={{ flexShrink: 0, marginTop: 4 }}
        />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gridTemplateRows: '1fr 1fr',
          gap: 14,
          flex: 1,
          minHeight: 0,
          marginTop: 14
        }}
      >
        {mods.map((m, i) => (
          <div
            key={i}
            style={{
              background: '#FFF',
              border: `1px solid ${C.line}`,
              borderRadius: 14,
              padding: '14px 18px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ fontSize: 26, lineHeight: 1, marginBottom: 7 }}>
              {m.ic}
            </div>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: C.primaryDeep,
                marginBottom: 5,
                lineHeight: 1.3
              }}
            >
              {m.t}
            </h3>
            <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.5 }}>
              {m.d}
            </p>
          </div>
        ))}
      </div>
      {/* เผื่อถาม — แนวทางการเชื่อมข้อมูลสุขภาพ (JHCIS) */}
      <div
        style={{
          flexShrink: 0,
          marginTop: 12,
          background: C.surfaceSoft,
          border: `1px solid ${C.line}`,
          borderRadius: 12,
          padding: '11px 16px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 8
          }}
        >
          <span
            style={{
              fontSize: 11.5,
              fontWeight: 700,
              color: '#FFF',
              background: C.primary,
              borderRadius: 100,
              padding: '3px 11px',
              flexShrink: 0
            }}
          >
            เผื่อถาม
          </span>
          <h4
            style={{
              fontSize: 13.5,
              fontWeight: 700,
              color: C.primaryDeep,
              lineHeight: 1.3
            }}
          >
            การเชื่อมข้อมูลสุขภาพ (JHCIS) — เชื่อมได้
            เลือกเส้นทางตามวัตถุประสงค์ · ทุกทางประสาน รพ.สต. + ทำตาม PDPA
          </h4>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 10
          }}
        >
          {[
            {
              ic: '📤',
              t: '43 แฟ้ม (แนะนำ)',
              d: 'ส่งตามมาตรฐานเข้า HDC · ใช้เบิก สปสช./LTC · ไม่ผูกเวอร์ชัน',
              hl: true
            },
            {
              ic: '🔗',
              t: 'ต่อฐานข้อมูลตรง (read-only)',
              d: 'เร็ว · ใช้แบบอ่านอย่างเดียวเมื่อได้รับอนุญาต'
            },
            {
              ic: '🌐',
              t: 'FHIR / Health Link',
              d: 'มาตรฐานทางการ (สธ. รับรอง HL7 FHIR) · REST API · roadmap ระยะยาว'
            }
          ].map((p, i) => (
            <div
              key={i}
              style={{
                background: '#FFF',
                border: `1px solid ${p.hl ? C.primary : C.line}`,
                borderRadius: 9,
                padding: '8px 11px'
              }}
            >
              <div
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: p.hl ? C.primary : C.text
                }}
              >
                {p.ic} {p.t}
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  color: C.textMuted,
                  lineHeight: 1.4,
                  marginTop: 2
                }}
              >
                {p.d}
              </div>
            </div>
          ))}
        </div>
        <p
          style={{
            fontSize: 11.5,
            color: C.textMuted,
            marginTop: 8,
            lineHeight: 1.45
          }}
        >
          <b style={{ color: C.text }}>พูดให้ถูก:</b> “ส่งออกตามมาตรฐาน 43 แฟ้ม
          + เชื่อมผ่านมาตรฐานข้อมูลสุขภาพ สธ. โดยประสาน รพ.สต.” ·
          ข้อมูลในระบบสาธิตเป็นตัวอย่าง
        </p>
      </div>
    </Slide>
  );
}

// 16 · APPENDIX A — ECG TABLE
function Slide15AppendixEcg() {
  const rows = [
    [
      ['อัมพาต / เส้นเลือดสมองตีบ-แตก', 'หัวใจเต้นพลิ้ว'],
      'อันตรายสูงสุด',
      C.alert,
      'AFib · CHA₂DS₂-VASc'
    ],
    [
      ['หัวใจวายเฉียบพลัน / วูบหมดสติ', ''],
      'อันตรายสูงสุด',
      C.alert,
      'QT/QTc/QTcF · PR · QRS · PVC/Block'
    ],
    [
      ['ออกซิเจนต่ำ / นอนกรนแล้วหยุดหายใจ', ''],
      'เสี่ยงสูง',
      C.accent,
      'SpO₂ · RR · Night RRV'
    ],
    [
      ['เส้นเลือดแข็ง / เส้นเลือดตีบ', ''],
      'เสี่ยงสูง',
      C.accent,
      'PWV (arterial stiffness)'
    ],
    [
      ['เลือดลมไหลเวียนไม่ดี', 'ปลายมือปลายเท้า'],
      'เฝ้าระวัง',
      '#854F0B',
      'PI (Perfusion Index)'
    ],
    [
      ['เครียดลงหัวใจ / พักผ่อนไม่พอ', 'ดูความเป็นอยู่ (Non-medical)'],
      'เฝ้าระวัง',
      '#854F0B',
      'HRV: SDNN/RMSSD/Stress'
    ]
  ];
  const gt = '1.5fr 0.7fr 1.3fr';
  return (
    <Slide num={15}>
      <span
        style={{
          display: 'inline-block',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 1,
          textTransform: 'uppercase',
          padding: '5px 13px',
          borderRadius: 980,
          background: C.accent,
          color: '#fff',
          marginBottom: 14
        }}
      >
        ภาคผนวก A
      </span>
      <Title size={28}>นาฬิกา ECG วัดอะไรได้บ้าง — และเฝ้าระวังโรคใด</Title>
      <Lead style={{ marginTop: 8, maxWidth: 980, fontSize: 15 }}>
        ตารางนี้ไว้ตอบเมื่อบุคลากรการแพทย์/ฝ่ายเทคนิคถามลึก — การพูดปกติใช้แค่
        "เฝ้าระวังหัวใจ" พอ
      </Lead>
      <div
        style={{
          marginTop: 16,
          background: '#FFF',
          border: `1px solid ${C.line}`,
          borderRadius: 14,
          overflow: 'hidden',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: gt,
            background: C.surfaceSoft,
            borderBottom: `1px solid ${C.line}`
          }}
        >
          {['เฝ้าระวังภาวะ', 'ระดับ', 'ค่าที่ดู (ศัพท์เทคนิค)'].map((h, i) => (
            <div
              key={i}
              style={{
                padding: '11px 16px',
                fontSize: 13.5,
                fontWeight: 700,
                color: C.text
              }}
            >
              {h}
            </div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: gt,
              borderBottom:
                i === rows.length - 1 ? 'none' : `1px solid ${C.line}`,
              flex: 1,
              alignItems: 'center'
            }}
          >
            <div style={{ padding: '9px 16px' }}>
              <b style={{ fontSize: 14, color: C.text }}>{r[0][0]}</b>
              {r[0][1] && (
                <span
                  style={{
                    display: 'block',
                    fontSize: 11.5,
                    color: C.textMuted
                  }}
                >
                  {r[0][1]}
                </span>
              )}
            </div>
            <div
              style={{
                padding: '9px 16px',
                fontSize: 13.5,
                fontWeight: 600,
                color: r[2]
              }}
            >
              {r[1]}
            </div>
            <div
              style={{
                padding: '9px 16px',
                fontSize: 13.5,
                color: C.textMuted
              }}
            >
              {r[3]}
            </div>
          </div>
        ))}
      </div>
      <Note style={{ marginTop: 12 }}>
        ค่าทั้งหมดเป็นการคัดกรอง/เฝ้าระวังเบื้องต้น (screening)
        ไม่ใช่การวินิจฉัยโรค · ต้องพบแพทย์เพื่อตรวจยืนยันและวินิจฉัยทุกครั้ง
      </Note>
    </Slide>
  );
}

// 16 · APPENDIX B — INFRA + PRIVACY
function Slide16AppendixInfra() {
  const cards = [
    [
      'เหมือนวิทยุชุมชน',
      'ตัวรับกลางตัวเดียวรับสัญญาณทั้งหมู่บ้านเข้าศูนย์เดียว'
    ],
    ['รองรับได้มาก', '1 ตัวรับ รองรับอุปกรณ์ราว 2,000 ชิ้น'],
    ['รัศมีกว้าง', 'เมือง 0.5–2 กม. · ชนบท 2–15 กม. (พื้นที่เปิดโล่ง)'],
    [
      'วางใจได้',
      'ไม่มีกล้องในห้องส่วนตัว · ข้อมูลเป็นของเทศบาล · audit log ตาม PDPA'
    ]
  ];
  return (
    <Slide num={16}>
      <span
        style={{
          display: 'inline-block',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 1,
          textTransform: 'uppercase',
          padding: '5px 13px',
          borderRadius: 980,
          background: C.accent,
          color: '#fff',
          marginBottom: 14
        }}
      >
        ภาคผนวก B
      </span>
      <Title size={27}>
        ตัวรับกลาง 1 จุด ครอบทั้งหมู่บ้าน + ความเป็นส่วนตัว
      </Title>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.25fr 0.95fr',
          gap: 20,
          flex: 1,
          minHeight: 0,
          marginTop: 14
        }}
      >
        <Figure
          src={`${IMG}/LoRa_WorkFlow_V2.png`}
          alt="อุปกรณ์ → ตัวรับกลาง → ประมวลผล → แดชบอร์ด"
          caption="อุปกรณ์ส่งสัญญาณเข้าตัวรับกลาง → ประมวลผล → แดชบอร์ด/แจ้งเตือน"
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            alignContent: 'center'
          }}
        >
          {cards.map((c, i) => (
            <Card key={i} style={{ padding: '16px 18px' }}>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: C.text,
                  marginBottom: 6
                }}
              >
                {c[0]}
              </h3>
              <p style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.55 }}>
                {c[1]}
              </p>
            </Card>
          ))}
        </div>
      </div>
      <Note style={{ marginTop: 12 }}>
        ตัวเลขรัศมี/จำนวนเป็นค่าประมาณตามสภาพแวดล้อม ·
        ต้องสำรวจพื้นที่จริงก่อนออกแบบการติดตั้ง
      </Note>
    </Slide>
  );
}

// 10 · RADAR FALL SENSOR (เจาะลึก — ต่อจาก LoRa)
function SlideRadarFall() {
  const figs = [
    {
      src: `${IMG}/radar-fall-how.png`,
      alt: 'หลักการจับการล้ม',
      cap: 'เซนเซอร์อ่านการเคลื่อนไหว/การล้ม โดยไม่จับภาพ ไม่เห็นหน้า — ติดในห้องส่วนตัวได้ (privacy)'
    },
    {
      src: `${IMG}/radar-technical.png`,
      alt: 'ข้อมูลเทคนิคเซนเซอร์',
      cap: 'ข้อมูลเทคนิคของเซนเซอร์ — สำหรับฝ่ายเทคนิคที่ต้องการรายละเอียด'
    }
  ];
  return (
    <Slide num={10}>
      <Eyebrow>เจาะลึก · เซนเซอร์เฝ้าระวังการล้ม (เรดาร์)</Eyebrow>
      <Title size={27}>
        หลักการเฝ้าระวังการล้มด้วยเซนเซอร์เรดาร์ — ไม่จับภาพ ไม่เห็นหน้า
      </Title>
      <Lead style={{ marginTop: 6, fontSize: 14.5, maxWidth: 1010 }}>
        หนึ่งในอุปกรณ์ LoRa ที่สำคัญที่สุด —
        ตรวจจับการล้มในห้องนอน/ห้องน้ำได้โดยไม่ใช้กล้อง
        จึงติดในพื้นที่ส่วนตัวได้อย่างสบายใจ
      </Lead>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 18,
          flex: 1,
          minHeight: 0,
          marginTop: 14
        }}
      >
        {figs.map((f, i) => (
          <Figure key={i} src={f.src} alt={f.alt} caption={f.cap} />
        ))}
      </div>
    </Slide>
  );
}

// 18 · APPENDIX — GATEWAY PLACEMENT
function Slide18AppendixGateway() {
  return (
    <Slide num={18}>
      <Eyebrow>ภาคผนวก · การวางเสาเกตเวย์</Eyebrow>
      <Title size={27}>การวางเสาเกตเวย์ให้ครอบคลุมพื้นที่ (ซ้อนทับ ~20%)</Title>
      <Lead style={{ marginTop: 6, fontSize: 14.5 }}>
        วงใหญ่ (เขียว) = พื้นที่โล่ง รัศมียาว · วงเล็ก (เหลือง) = พื้นที่ตึกสูง
        รัศมีสั้น ตั้งเสาถี่ขึ้น
      </Lead>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.35fr 1fr',
          gap: 22,
          flex: 1,
          minHeight: 0,
          marginTop: 14,
          alignItems: 'center'
        }}
      >
        <div
          style={{
            height: '100%',
            background: '#FFF',
            border: `1px solid ${C.line}`,
            borderRadius: 16,
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 0
          }}
        >
          <GatewayPlacementDiagram />
        </div>
        <div
          style={{
            background: '#FFF',
            border: `1px solid ${C.line}`,
            borderTop: `4px solid ${C.primary}`,
            borderRadius: 14,
            padding: '20px 22px'
          }}
        >
          <h3
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: C.primary,
              marginBottom: 8
            }}
          >
            วิธีประเมินจำนวนเสา (คร่าว ๆ)
          </h3>
          <ol
            style={{
              margin: 0,
              paddingLeft: 20,
              fontSize: 13.5,
              color: C.textMuted,
              lineHeight: 1.7
            }}
          >
            <li>พื้นที่ครอบ/เสา = π × รัศมี²</li>
            <li>หักซ้อนทับ ~20% → ใช้ได้จริง ~80%</li>
            <li>จำนวนเสา = พื้นที่เป้าหมาย ÷ พื้นที่ใช้จริง/เสา</li>
          </ol>
          <div
            style={{
              marginTop: 16,
              padding: '14px 16px',
              background: C.accentSoft,
              border: `1px solid ${C.accentLine}`,
              borderRadius: 12
            }}
          >
            <div style={{ fontWeight: 700, color: '#854F0B' }}>
              ตัวอย่าง — ตำบล 100 กม.²
            </div>
            <div style={{ fontSize: 12, color: '#6B4A12', marginBottom: 8 }}>
              (โล่ง 80 + ตึกสูง 20)
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: 18,
                fontSize: 13,
                color: '#6B4A12',
                lineHeight: 1.8
              }}
            >
              <li>โล่ง รัศมี 5 กม. → 78 × 0.8 ≈ 62 กม.²/เสา</li>
              <li>ตึกสูง รัศมี 3 กม. → 28 × 0.8 ≈ 22 กม.²/เสา</li>
              <li>โล่ง 80 ÷ 62 ≈ 2 เสา · ตึกสูง 20 ÷ 22 ≈ 1 เสา</li>
            </ul>
            <div style={{ fontWeight: 700, color: '#854F0B', marginTop: 8 }}>
              รวม ~3 เสา (เผื่อรูปพื้นที่ → 3–4 เสา)
            </div>
          </div>
        </div>
      </div>
      <Note style={{ marginTop: 12 }}>
        π × รัศมี² = พื้นที่วงกลมที่เกตเวย์ 1 ต้นครอบ · ตัวเลขประมาณการ
        ต้องยืนยันด้วย RF site survey
      </Note>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// Deck wrapper — viewport-fit scaling + print CSS (A4 landscape)
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

      /* margin:auto centres the wrapper; inner .slide-scale stays top-left (its layout box
         keeps full slide width even when transform-scaled) — do NOT flex-center it. */
      .slide-wrapper { margin: 0 auto 24px; overflow: hidden; }
      .scroll-dots { right: max(14px, env(safe-area-inset-right, 14px)) !important; max-height: calc(100dvh - 120px); overflow-y: auto; scrollbar-width: none; }
      .scroll-dots::-webkit-scrollbar { display: none; }
      @media (max-width: 932px) { .scroll-dots { display: none !important; } }
      .slide-scale { transform-origin: top left; box-shadow: 0 10px 40px rgba(0,0,0,.35); }

      @media print {
        @page { size: A4 landscape; margin: 0; }
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        html, body { background: #fff !important; width: auto !important; height: auto !important; margin: 0 !important; padding: 0 !important; }
        nav, .deck-toolbar, .scroll-dots { display: none !important; }
        main { padding-top: 0 !important; }
        .deck-root { background: #fff !important; padding: 0 !important; margin: 0 !important; }
        /* Size each slide to EXACTLY A4 landscape in mm so the 1123×794px design canvas
           can't round past the printable page and spill onto a 2nd page. The slide
           section's own overflow:hidden trims any sub-pixel excess. */
        .slide-wrapper { margin: 0 !important; width: 297mm !important; height: 210mm !important; overflow: hidden !important; }
        .slide-scale { transform: none !important; box-shadow: none !important; width: 297mm !important; height: 210mm !important; }
        .slide-page { width: 297mm !important; height: 210mm !important; box-shadow: none !important; }
        /* exactly one slide per page · no trailing blank page */
        .deck-root > div[id^="slide-"] { break-after: page; page-break-after: always; }
        .deck-root > div[id^="slide-"]:last-child { break-after: auto; page-break-after: auto; }
      }
    `}</style>
  );
}

function ScaledSlide({ children }) {
  // Fit-to-viewport scale, computed for the initial paint too (no flash of full-size canvas).
  // Measure the LAYOUT viewport (innerWidth/innerHeight), never visualViewport — the latter
  // changes on mobile address-bar slide and pinch-zoom, making the slide "breathe" mid-scroll.
  const computeScale = () => {
    if (typeof window === 'undefined') return 1;
    const availableW = Math.max(window.innerWidth - 32, 320);
    const availableH = Math.max(window.innerHeight - 160, 320);
    return Math.min(availableW / SLIDE_W, availableH / SLIDE_H, 1);
  };
  const [scale, setScale] = useState(computeScale);
  const wrapperRef = useRef(null);
  const lastWidthRef = useRef(
    typeof window === 'undefined' ? 0 : window.innerWidth
  );

  useEffect(() => {
    const apply = () => {
      if (
        window.visualViewport &&
        Math.abs(window.visualViewport.scale - 1) > 0.01
      )
        return;
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
    <div
      className="slide-wrapper"
      ref={wrapperRef}
      style={{ width: SLIDE_W * scale, height: SLIDE_H * scale }}
    >
      <div
        className="slide-scale"
        style={{
          transform: `scale(${scale})`,
          width: SLIDE_W,
          height: SLIDE_H
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Deck Toolbar (print + jump-to-slide)
// ---------------------------------------------------------------------------

function Toolbar() {
  const [open, setOpen] = useState(false);
  const titles = [
    '1 · 🚨 Hook · "แม่ล้มในห้องน้ำ กว่าจะมีคนรู้ก็สาย"',
    '2 · 📈 Why now · "1 ใน 5" สังคมสูงวัยสมบูรณ์ 2567',
    '3 · ✨ จุดเปลี่ยน · ผู้พิทักษ์เงียบ + before/after สมศรี',
    '4 · 🔧 เข้าใจ 3 ข้อ · เข้า→ซอฟต์แวร์→ออก + แจ้ง 3 ชั้น',
    '5 · ⏱️ เกิดเหตุ · ใครเห็นอะไร เมื่อไหร่ (matrix)',
    '6 · 🧰 ภายในระบบ · 6 โมดูลการทำงาน (กดเล่นได้)',
    '7 · 🤝 ใครได้อะไร · 3 ฝ่าย',
    '8 · 💻 ฟีเจอร์เด่น · 3 กลุ่ม',
    '9 · 🧩 เริ่มเล็กขยายได้ · plug-in',
    '10 · 🧠 ฮาร์ดแวร์ intro · สมอง/ประสาทสัมผัส',
    '11 · 📡 ① LoRa · ดี/ประหยัด/เสถียร + อุปกรณ์',
    '12 · 📶 เจาะลึก · เซนเซอร์เรดาร์เฝ้าระวังการล้ม',
    '13 · 🎥 ② CCTV + AI · พื้นที่ส่วนกลาง',
    '14 · ⌚ ③ นาฬิกา ECG + AFib · พูดให้ถูก',
    '15 · 💰 ④ ตัวอย่างการจัดชุดอุปกรณ์ · 3 แบบ',
    '16 · 🏦 งบเบิกได้อย่างไร · LTC/กปท.',
    '17 · 🚀 CTA · เริ่ม 4 ขั้น',
    '18 · 📎 ภาคผนวก A · ตาราง ECG',
    '19 · 📎 ภาคผนวก B · ตัวรับกลาง + privacy',
    '20 · 🗼 ภาคผนวก · การวางเสาเกตเวย์'
  ];
  const goTo = (i) => {
    const el = document.getElementById(`slide-${i + 1}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };
  return (
    <div className="deck-toolbar">
      <span style={{ flex: 1 }} />
      <span className="note">
        กด "พิมพ์/บันทึก PDF" แล้วเลือก Landscape (A4)
      </span>
      <button onClick={() => setOpen(!open)}>
        {open ? 'ปิดเมนู' : 'ไปสไลด์...'}
      </button>
      <button onClick={() => window.print()}>พิมพ์ / บันทึก PDF</button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 44,
            right: 16,
            background: '#FFF',
            color: C.text,
            borderRadius: 8,
            boxShadow: '0 10px 30px rgba(0,0,0,.2)',
            padding: 8,
            maxHeight: 'calc(100vh - 110px)',
            overflowY: 'auto',
            minWidth: 340,
            zIndex: 1100
          }}
        >
          {titles.map((t, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '8px 12px',
                fontSize: 13,
                color: C.text,
                background: 'transparent',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = C.surfaceSoft)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'transparent')
              }
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
        backdropFilter: 'blur(8px)'
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
              border: isActive
                ? `2px solid ${C.primaryHover}`
                : '1px solid rgba(255,255,255,0.6)',
              transition: 'all .2s ease',
              cursor: 'pointer'
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

export default function ElderlyCare() {
  // Render order = page order. Page numbers run automatically (SlideCtx) from this array,
  // so inserting/reordering a slide only needs an edit here + titles[] in Toolbar.
  const slides = [
    Slide01Hook,
    Slide02WhyNow,
    Slide03Turning,
    Slide04How,
    SlideWhoSeesWhat,
    SlideSystemModules,
    Slide05Who,
    Slide06Features,
    Slide07StartSmall,
    Slide08HwIntro,
    Slide09LoRa,
    SlideRadarFall,
    Slide10Cctv,
    Slide11Ecg,
    Slide12Budget,
    Slide13Funding,
    Slide14Cta,
    Slide15AppendixEcg,
    Slide16AppendixInfra,
    Slide18AppendixGateway
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
