import React, { useState } from 'react';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// ElderlyCare.jsx — ระบบดูแลผู้สูงอายุ 360° (ลูกหลานดิจิทัล)
// Design: Civic Trust palette (Forest green #0F6E56 + Cream #FAF7EE + Amber #BA7517)
// Font: Sarabun
// Pain-first storytelling: pain → flow → 3 pillars → privacy → reuse → ROI → pilot → CTA
// All metrics labeled "ประมาณการ" — no fabricated stats per §3.1.1
// ---------------------------------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

// Civic Trust shorthand
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
};

// Image base path (Tua to add files — see IMAGES_NEEDED.md)
const IMG = 'images/elderly-care';

// ---------------------------------------------------------------------------
// Reusable atoms
// ---------------------------------------------------------------------------

function Eyebrow({ color = C.primary, children }) {
  return (
    <p className="text-[12px] font-semibold uppercase mb-3" style={{ color, letterSpacing: '2.5px' }}>
      {children}
    </p>
  );
}

function Section({ children, bg = 'cream', id = '' }) {
  const bgMap = { cream: C.surface, soft: C.surfaceSoft, deep: C.primaryDeep, white: '#FFFFFF', primary: C.primary };
  const isDark = bg === 'deep' || bg === 'primary';
  return (
    <section id={id} className="px-6 md:px-10 py-20 md:py-24" style={{ background: bgMap[bg], color: isDark ? '#FFF' : C.text, fontFamily: 'Sarabun, sans-serif' }}>
      {children}
    </section>
  );
}

function StatCard({ label, value, sub, accent = C.primary }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
      <div className="text-[12px] font-medium uppercase tracking-wider mb-2" style={{ color: C.textMuted }}>{label}</div>
      <div className="text-[32px] md:text-[36px] font-semibold leading-tight" style={{ color: accent }}>{value}</div>
      {sub && <div className="text-[13px] mt-2 leading-relaxed" style={{ color: C.textMuted }}>{sub}</div>}
    </div>
  );
}

function Pill({ children, variant = 'primary' }) {
  const variants = {
    primary: { bg: C.primary, color: '#FFF' },
    outline: { bg: 'transparent', color: C.primary, border: `1px solid ${C.primary}` },
    accent: { bg: C.accentSoft, color: C.accent },
    alert: { bg: C.alertSoft, color: C.alert },
    success: { bg: C.successSoft, color: '#3B6D11' },
    muted: { bg: '#FFFFFF', color: C.textMuted, border: `1px solid ${C.surfaceSoft}` },
  };
  const v = variants[variant];
  return (
    <span className="inline-flex items-center text-[12px] font-medium px-3 py-1 rounded-full" style={{ background: v.bg, color: v.color, border: v.border || 'none' }}>
      {children}
    </span>
  );
}

function CTAButton({ children, primary = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-[15px] font-medium px-6 py-3 rounded-lg cursor-pointer transition-all"
      style={primary ? { background: C.primary, color: '#FFF', border: 'none' } : { background: 'transparent', color: C.primary, border: `1px solid ${C.primary}` }}
      onMouseEnter={(e) => {
        if (primary) e.currentTarget.style.background = C.primaryHover;
        else { e.currentTarget.style.background = C.primary; e.currentTarget.style.color = '#FFF'; }
      }}
      onMouseLeave={(e) => {
        if (primary) e.currentTarget.style.background = C.primary;
        else { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.primary; }
      }}
    >
      {children}
    </button>
  );
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// ---------------------------------------------------------------------------
// Diagrams (SVG inline)
// ---------------------------------------------------------------------------

// System architecture: Home + Public + Travel → COC → 1132/Traffy
function ArchitectureDiagram() {
  return (
    <svg viewBox="0 0 900 480" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" style={{ fontFamily: 'Sarabun, sans-serif' }}>
      <defs>
        <marker id="arrow-eld" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={C.primary} />
        </marker>
        <linearGradient id="grad-coc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.primary} />
          <stop offset="100%" stopColor={C.primaryDeep} />
        </linearGradient>
      </defs>

      {/* Layer labels */}
      <text x="20" y="40" fontSize="13" fontWeight="600" fill={C.textMuted} letterSpacing="1.5">SOURCE</text>
      <text x="20" y="240" fontSize="13" fontWeight="600" fill={C.textMuted} letterSpacing="1.5">CENTER</text>
      <text x="20" y="420" fontSize="13" fontWeight="600" fill={C.textMuted} letterSpacing="1.5">ACTION</text>

      {/* 3 Sources */}
      {[
        { x: 130, label: '🏠 ในบ้าน', sub: 'mmWave Radar', detail: 'ห้องน้ำ · ห้องนอน' },
        { x: 380, label: '🏙️ ในเมือง', sub: 'AI + CCTV เดิม', detail: 'ที่สาธารณะ · รถขยะ' },
        { x: 630, label: '⌚ พกติดตัว', sub: 'Wearable + SOS', detail: '4G / NB-IoT · GPS' },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="60" width="200" height="120" rx="14" fill="#FFF" stroke={C.primary} strokeWidth="1.5" />
          <text x={s.x + 100} y="98" textAnchor="middle" fontSize="22" fontWeight="600" fill={C.text}>{s.label}</text>
          <text x={s.x + 100} y="128" textAnchor="middle" fontSize="14" fontWeight="600" fill={C.primary}>{s.sub}</text>
          <text x={s.x + 100} y="152" textAnchor="middle" fontSize="12" fill={C.textMuted}>{s.detail}</text>
          {/* Arrow down */}
          <line x1={s.x + 100} y1="180" x2={s.x + 100} y2="240" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-eld)" />
        </g>
      ))}

      {/* COC Center */}
      <rect x="130" y="240" width="700" height="100" rx="14" fill="url(#grad-coc)" />
      <text x="480" y="278" textAnchor="middle" fontSize="20" fontWeight="700" fill="#FFF">ศูนย์ COC ของเทศบาล</text>
      <text x="480" y="304" textAnchor="middle" fontSize="13" fill="#FFF" opacity="0.85">AI คัดกรอง · จัดลำดับเหตุ · จับคู่กับเจ้าหน้าที่ที่ใกล้สุด</text>
      <text x="480" y="324" textAnchor="middle" fontSize="11" fill="#FFF" opacity="0.7">Dashboard · Alert Engine · PDPA-compliant Audit Log</text>

      {/* Arrows down */}
      <line x1="220" y1="340" x2="220" y2="395" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-eld)" />
      <line x1="480" y1="340" x2="480" y2="395" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-eld)" />
      <line x1="740" y1="340" x2="740" y2="395" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-eld)" />

      {/* 3 Actions */}
      {[
        { x: 130, label: '📞 1132 / กู้ชีพ', sub: 'ส่งเหตุฉุกเฉิน' },
        { x: 380, label: '👨‍👩‍👧 แจ้งครอบครัว', sub: 'LINE / SMS' },
        { x: 630, label: '📋 Traffy / 1132', sub: 'API เข้าระบบเดิม' },
      ].map((a, i) => (
        <g key={i}>
          <rect x={a.x} y="395" width="200" height="65" rx="12" fill={C.surfaceSoft} stroke={C.primary} strokeWidth="1" strokeDasharray="3,3" />
          <text x={a.x + 100} y="421" textAnchor="middle" fontSize="15" fontWeight="600" fill={C.text}>{a.label}</text>
          <text x={a.x + 100} y="442" textAnchor="middle" fontSize="12" fill={C.textMuted}>{a.sub}</text>
        </g>
      ))}
    </svg>
  );
}

// Reactive vs Proactive timeline diagram
function TimelineDiagram() {
  return (
    <svg viewBox="0 0 800 320" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" style={{ fontFamily: 'Sarabun, sans-serif' }}>
      {/* Reactive timeline */}
      <text x="20" y="35" fontSize="14" fontWeight="700" fill={C.alert}>แบบเดิม · เชิงรับ</text>
      <line x1="20" y1="80" x2="780" y2="80" stroke={C.alert} strokeWidth="3" opacity="0.3" />
      {[
        { x: 80, t: '00:00', label: 'ผู้สูงอายุล้ม', color: C.alert },
        { x: 280, t: '+30 นาที', label: 'ยังไม่มีคนรู้', color: C.alert },
        { x: 480, t: '+1 ชม.', label: 'ลูกหลานโทรไม่รับ', color: C.alert },
        { x: 680, t: '+2 ชม.', label: 'พบเหตุ → แจ้ง', color: C.alert },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy="80" r="9" fill={p.color} />
          <text x={p.x} y="62" textAnchor="middle" fontSize="11" fontWeight="600" fill={p.color}>{p.t}</text>
          <text x={p.x} y="108" textAnchor="middle" fontSize="12" fill={C.text}>{p.label}</text>
        </g>
      ))}
      <text x="400" y="138" textAnchor="middle" fontSize="12" fontStyle="italic" fill={C.alert}>↑ ความเสี่ยงเสียชีวิต/พิการสูงขึ้นทุกนาที</text>

      {/* Proactive timeline */}
      <text x="20" y="195" fontSize="14" fontWeight="700" fill={C.primary}>แบบใหม่ · เชิงรุก</text>
      <line x1="20" y1="240" x2="780" y2="240" stroke={C.primary} strokeWidth="3" opacity="0.3" />
      {[
        { x: 80, t: '00:00', label: 'ผู้สูงอายุล้ม', color: C.primary },
        { x: 230, t: '+5 วินาที', label: 'เรดาร์ตรวจจับ', color: C.primary },
        { x: 400, t: '+10 วินาที', label: 'AI ยืนยันเหตุ', color: C.primary },
        { x: 580, t: '+30 วินาที', label: 'COC แจ้ง 1132', color: C.primary },
        { x: 740, t: '+1 นาที', label: 'รถกู้ชีพออก', color: C.primary },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy="240" r="9" fill={p.color} />
          <text x={p.x} y="222" textAnchor="middle" fontSize="11" fontWeight="600" fill={p.color}>{p.t}</text>
          <text x={p.x} y="268" textAnchor="middle" fontSize="11" fill={C.text}>{p.label}</text>
        </g>
      ))}
      <text x="400" y="298" textAnchor="middle" fontSize="12" fontStyle="italic" fill={C.primary}>↓ Response time ลดลง — ประมาณการจาก use case ที่ออกแบบ</text>
    </svg>
  );
}

// Radar coverage diagram (how mmWave sees movement, not images)
function RadarDiagram() {
  return (
    <svg viewBox="0 0 600 360" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" style={{ fontFamily: 'Sarabun, sans-serif' }}>
      {/* Room outline */}
      <rect x="60" y="60" width="480" height="240" rx="8" fill="#FFF" stroke={C.textMuted} strokeWidth="1.5" />
      <text x="80" y="50" fontSize="12" fill={C.textMuted}>ห้องน้ำ / ห้องนอน (ภาพตัดข้าง)</text>

      {/* Sensor on wall */}
      <rect x="290" y="70" width="32" height="14" rx="3" fill={C.primary} />
      <text x="306" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill={C.primary}>เซนเซอร์เรดาร์</text>

      {/* Radar pulse cones */}
      {[0, 1, 2].map(i => (
        <path
          key={i}
          d={`M 306 84 L ${200 - i*20} ${300 - i*10} A 220 180 0 0 1 ${412 + i*20} ${300 - i*10} Z`}
          fill={C.primary}
          opacity={0.06 + i * 0.04}
        />
      ))}
      <path d="M 306 84 L 180 290 A 220 180 0 0 1 432 290 Z" fill="none" stroke={C.primary} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.6" />

      {/* Person standing (silhouette) */}
      <g opacity="0.7">
        <circle cx="200" cy="200" r="11" fill={C.primaryDeep} />
        <rect x="192" y="211" width="16" height="42" rx="3" fill={C.primaryDeep} />
        <rect x="192" y="253" width="6" height="32" fill={C.primaryDeep} />
        <rect x="202" y="253" width="6" height="32" fill={C.primaryDeep} />
      </g>
      <text x="200" y="305" textAnchor="middle" fontSize="11" fill={C.success}>✓ ปกติ — ยืน หายใจสม่ำเสมอ</text>

      {/* Person fallen */}
      <g opacity="0.85">
        <circle cx="380" cy="280" r="10" fill={C.alert} />
        <rect x="365" y="275" width="42" height="14" rx="3" fill={C.alert} />
      </g>
      <text x="380" y="305" textAnchor="middle" fontSize="11" fontWeight="600" fill={C.alert}>⚠ ตรวจจับการล้ม → แจ้ง COC</text>

      {/* Annotation */}
      <text x="306" y="340" textAnchor="middle" fontSize="13" fontWeight="600" fill={C.text}>เห็น "การเคลื่อนไหว + การหายใจ" — ไม่บันทึกภาพ</text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Page sections data
// ---------------------------------------------------------------------------

const painPoints = [
  { icon: '🚨', title: 'ล้มในห้องน้ำ ไม่มีคนรู้', desc: 'ผู้สูงอายุที่อยู่บ้านลำพังตอนกลางวัน เมื่อล้ม วูบ หรือหมดสติ — กว่าจะมีคนเดินมาเจอ บางครั้งสายเกินไป' },
  { icon: '👁️', title: 'ติดกล้อง = อึดอัด', desc: 'ผู้สูงอายุไม่ยอมให้ติดกล้องในห้องนอน/ห้องน้ำ เพราะรู้สึกถูกจ้องและเสียศักดิ์ศรี — เป็นข้อจำกัดของระบบกล้องดั้งเดิม' },
  { icon: '👥', title: 'อสม. 1 คน ดูแล 30 หลัง', desc: 'อาสาสมัครและเจ้าหน้าที่มีจำกัด ไม่สามารถเฝ้าผู้สูงอายุได้ตลอด 24 ชม. โดยเฉพาะกลางคืนและวันหยุด' },
  { icon: '📹', title: 'CCTV เมือง ไว้ดูทีหลัง', desc: 'กล้องของเทศบาลส่วนใหญ่ใช้สำหรับตรวจสอบย้อนหลัง — ไม่ได้แจ้งเตือนตอนคนล้มหรือต้องการช่วยเหลือ' },
];

const pillars = [
  {
    tag: 'Pillar 1 · ในบ้าน',
    icon: '🏠',
    title: 'เซนเซอร์เรดาร์ ในห้องที่ต้องการความเป็นส่วนตัว',
    benefit: 'ตรวจจับการล้มและสัญญาณชีพ 24 ชม. โดย "ไม่เห็นภาพ"',
    detail: 'ติดตั้งในห้องน้ำและห้องนอน ใช้คลื่น mmWave Radar ตรวจจับการเคลื่อนไหว การล้ม การหายใจ และอัตราการเต้นของหัวใจ — โดยไม่บันทึกภาพ ผู้สูงอายุยอมรับได้เพราะรู้สึกปลอดภัยและมีศักดิ์ศรี',
    proofPoints: ['ไม่ใช่กล้อง ไม่มีภาพ', 'แจ้งเตือนทันทีเมื่อล้ม', 'ทำงานได้แม้ในที่มืด'],
    image: `${IMG}/pillar-radar.jpg`,
  },
  {
    tag: 'Pillar 2 · พื้นที่สาธารณะ',
    icon: '🏙️',
    title: 'AI ต่อยอด CCTV เดิมของเทศบาล',
    benefit: 'อัปเกรดกล้องที่มีอยู่ ให้ "ตรวจจับเหตุ" ไม่ใช่ "บันทึกเหตุ"',
    detail: 'ใช้ AI Object Detection ต่อบนกล้อง CCTV ของเทศบาลที่มีอยู่แล้ว เพื่อตรวจจับเหตุการณ์ผิดปกติในที่สาธารณะ เช่น คนล้ม คนนอนนิ่ง และยังต่อยอดติดบนรถเก็บขยะเพื่อสแกนหาไฟดวงเสีย/ถนนชำรุดได้อัตโนมัติ',
    proofPoints: ['ใช้ของเดิม ไม่ต้องเปลี่ยนกล้อง', 'แจ้งเตือนแบบ real-time', 'ลดภาระเจ้าหน้าที่ COC'],
    image: `${IMG}/pillar-cctv.jpg`,
  },
  {
    tag: 'Pillar 3 · เมื่อออกนอกบ้าน',
    icon: '⌚',
    title: 'อุปกรณ์สวมใส่ พร้อมปุ่ม SOS',
    benefit: 'ปุ่มเดียวเรียกได้ ไม่ว่าผู้สูงอายุจะอยู่ที่ไหนในตำบล',
    detail: 'นาฬิกาหรือสายรัดข้อมือที่มีปุ่มฉุกเฉิน + GPS ติดตามตำแหน่ง เชื่อม 4G/NB-IoT ส่งสัญญาณกลับศูนย์ COC ของเทศบาลทันที — เหมาะกับผู้สูงอายุที่ออกตลาด ไปวัด หรือเดินออกกำลังกาย',
    proofPoints: ['ปุ่ม SOS กดง่าย', 'GPS ระบุตำแหน่งแม่นยำ', 'แบตอยู่ได้หลายวัน'],
    image: `${IMG}/pillar-wearable.jpg`,
  },
];

const reuseAdvantages = [
  { label: 'CCTV เดิมของเทศบาล', detail: 'อัปเกรดด้วย AI Edge — ไม่ต้องเปลี่ยนกล้อง' },
  { label: 'รถเก็บขยะที่วิ่งทุกวัน', detail: 'ติดกล้อง + AI สแกนเมืองอัตโนมัติ' },
  { label: 'ศูนย์ COC ที่มีอยู่', detail: 'ต่อ Dashboard เพิ่ม ไม่สร้างศูนย์ใหม่' },
  { label: 'ระบบ 1132 / Traffy Fondue', detail: 'เชื่อม API ส่งเหตุเข้าระบบเดิม' },
];

const benefits = [
  { icon: '⏱️', title: 'ลดเวลาเข้าถึงเหตุ', desc: 'จากการแจ้งโดย "คนเห็น" → "ระบบแจ้ง" — ลด response time ลงได้อย่างมีนัยสำคัญ (ประมาณการ ขึ้นกับโครงข่ายกู้ชีพในพื้นที่)' },
  { icon: '👨‍👩‍👧', title: 'ครอบครัวอุ่นใจ ผู้สูงอายุมีอิสระ', desc: 'ลูกหลานที่ทำงานต่างจังหวัดสบายใจขึ้น — ผู้สูงอายุไม่ต้องไปอยู่กับลูกหลาน ใช้ชีวิตในบ้านตัวเองได้เหมือนเดิม' },
  { icon: '📊', title: 'ข้อมูลสุขภาพชุมชน', desc: 'เทศบาลมีข้อมูลพฤติกรรมและความเสี่ยงของผู้สูงอายุในพื้นที่ — ใช้วางแผนสวัสดิการและงบประมาณได้ตรงกลุ่มเป้าหมาย' },
  { icon: '🏆', title: 'ภาพลักษณ์เทศบาลที่ใส่ใจคน', desc: 'หลังใช้ระบบ 6-12 เดือน เทศบาลมีข้อมูลและกรณีศึกษาเพื่อนำไปสมัคร depa Smart City Awards / รางวัล อปท. ดีเด่นได้' },
];

const phases = [
  { phase: 'Phase 1', title: '1 ชุมชนนำร่อง', detail: '5-10 บ้าน + 2-3 จุดสาธารณะ ระยะ 3 เดือน', icon: '🌱' },
  { phase: 'Phase 2', title: 'ขยายในเขตเทศบาล', detail: 'อิงผลจาก Phase 1 ขยายตามชุมชนที่ความเสี่ยงสูง', icon: '🌿' },
  { phase: 'Phase 3', title: 'เชื่อมงบสวัสดิการระยะยาว', detail: 'ต่อยอดเป็นโครงการดูแลผู้สูงอายุระยะยาวของเทศบาล', icon: '🌳' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ElderlyCare() {
  return (
    <div style={{ fontFamily: 'Sarabun, sans-serif', background: C.surface, color: C.text }}>
      {/* ============================ HERO ============================ */}
      <section
        className="relative px-6 md:px-10 py-24 md:py-32 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${C.primaryDeep} 0%, ${C.primary} 100%)`, color: '#FFF' }}
      >
        {/* Decorative radar pulse */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-10 opacity-20">
          <div className="absolute w-[500px] h-[500px] rounded-full border border-white animate-ping" style={{ animationDuration: '4s' }} />
          <div className="absolute w-[340px] h-[340px] rounded-full border border-white animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute w-[200px] h-[200px] rounded-full border border-white animate-ping" style={{ animationDuration: '2s' }} />
        </div>

        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="text-[12px] font-semibold uppercase mb-4" style={{ letterSpacing: '2.5px', color: C.surfaceSoft }}>
              ดูแลผู้สูงอายุ · Smart Living
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-bold mb-6" style={{ fontSize: 'clamp(34px, 5.5vw, 54px)', letterSpacing: '-0.3px', lineHeight: 1.3 }}>
              <span className="block">ลูกหลานดิจิทัล</span>
              <span className="block" style={{ color: C.surfaceSoft }}>24 ชั่วโมง</span>
              <span className="block">สำหรับผู้สูงอายุในตำบล</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[17px] md:text-[19px] leading-relaxed mb-8" style={{ color: '#FFF', opacity: 0.92 }}>
              เมื่อผู้สูงอายุล้มในบ้านลำพัง — ระบบรู้ก่อนที่ใครจะเดินมาเจอ<br />
              เมื่อออกนอกบ้านไปตลาด — ปุ่มเดียวเรียกได้ทันที<br />
              ทั้งหมดทำงาน <strong>โดยไม่ต้องติดกล้องในห้องส่วนตัว</strong>
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('flow')}
                className="text-[15px] font-semibold px-7 py-3 rounded-lg border-none cursor-pointer transition-all"
                style={{ background: '#FFF', color: C.primary }}
              >
                ดูระบบทำงานอย่างไร
              </button>
              <button
                onClick={() => scrollTo('pillars')}
                className="text-[15px] font-medium px-7 py-3 rounded-lg cursor-pointer transition-all"
                style={{ background: 'transparent', color: '#FFF', border: '1px solid rgba(255,255,255,0.5)' }}
              >
                ระบบ 3 ส่วน
              </button>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
            <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.35)' }}>
              <img
                src={`${IMG}/hero-elderly.jpg`}
                alt="ผู้สูงอายุชาวเอเชียในบ้าน"
                className="w-full h-[400px] md:h-[460px] object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                loading="eager"
              />
              {/* Fallback gradient if image missing */}
              <div className="absolute inset-0 -z-10" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDeep} 100%)` }} />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl p-4 backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.92)', color: C.text }}>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: C.success }} />
                  <div className="text-[13px] font-semibold">ระบบทำงาน · 24 ชม.</div>
                  <div className="ml-auto text-[12px]" style={{ color: C.textMuted }}>เซนเซอร์ 12 จุด · พร้อม</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================ PAIN POINTS ============================ */}
      <Section bg="cream" id="pain">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow>ปัญหาที่เทศบาลเจอจริง</Eyebrow>
            <h2 className="font-bold leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: C.text }}>
              4 เหตุการณ์ที่<br />ระบบเดิมตามไม่ทัน
            </h2>
            <p className="text-[16px] leading-relaxed mt-5" style={{ color: C.textMuted }}>
              ระบบดูแลผู้สูงอายุที่ใช้กันอยู่ส่วนใหญ่เป็น <strong style={{ color: C.alert }}>"เชิงรับ"</strong> — ต้องรอให้คนเห็น แล้วจึงแจ้ง<br />
              คำถามคือ ระหว่างที่ยังไม่มีใครเห็น... เกิดอะไรขึ้น?
            </p>
          </div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            {painPoints.map((p, i) => (
              <motion.div key={i} variants={fadeUp} className="rounded-2xl p-7" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
                <div className="flex items-start gap-4">
                  <div className="text-[36px] leading-none">{p.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[20px] leading-snug mb-2" style={{ color: C.text }}>{p.title}</h3>
                    <p className="text-[14px] leading-relaxed" style={{ color: C.textMuted }}>{p.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Timeline diagram */}
          <div className="mt-16 rounded-3xl p-6 md:p-10" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
            <div className="text-center mb-6">
              <Eyebrow color={C.accent}>เปรียบเทียบ Timeline</Eyebrow>
              <h3 className="font-bold text-[22px] md:text-[28px]" style={{ color: C.text }}>เกิดอะไรขึ้นในนาทีที่ 1, 30, 60?</h3>
            </div>
            <TimelineDiagram />
            <p className="text-center text-[12px] mt-3 italic" style={{ color: C.textMuted }}>
              * เวลาเป็นประมาณการจาก use case ที่ออกแบบ — เวลาจริงขึ้นกับโครงข่ายกู้ชีพในพื้นที่
            </p>
          </div>
        </div>
      </Section>

      {/* ============================ SYSTEM FLOW (DIAGRAM) ============================ */}
      <Section bg="white" id="flow">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow>ระบบทำงานอย่างไร</Eyebrow>
            <h2 className="font-bold leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: C.text }}>
              จาก 3 จุดข้อมูล<br />สู่ศูนย์ COC ใน 1 นาที
            </h2>
            <p className="text-[16px] leading-relaxed mt-5" style={{ color: C.textMuted }}>
              ระบบเชื่อมข้อมูลจากในบ้าน · ในเมือง · พกติดตัว — เข้าศูนย์ควบคุม COC ของเทศบาล
              <br />AI คัดกรองเหตุก่อนส่งต่อให้เจ้าหน้าที่ที่ใกล้สุด
            </p>
          </div>

          <div className="rounded-3xl p-6 md:p-10" style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}>
            <ArchitectureDiagram />
          </div>
        </div>
      </Section>

      {/* ============================ 3 PILLARS ============================ */}
      <Section bg="cream" id="pillars">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow>ระบบ 3 ส่วน</Eyebrow>
            <h2 className="font-bold leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: C.text }}>
              ครอบคลุมทุกที่<br />ที่ผู้สูงอายุไป
            </h2>
            <p className="text-[16px] leading-relaxed mt-5" style={{ color: C.textMuted }}>
              ในบ้าน · ออกนอกบ้าน · ในเมือง — ทำงานเชื่อมกัน ผ่านศูนย์ COC ของเทศบาล
            </p>
          </div>

          <div className="space-y-8">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl overflow-hidden"
                style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}
              >
                <div className={`grid grid-cols-1 md:grid-cols-2 ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                  {/* Image */}
                  <div className="relative h-[280px] md:h-auto min-h-[300px]" style={{ background: C.primarySoft }}>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <Pill variant="primary">{p.tag}</Pill>
                    </div>
                    <div className="absolute bottom-4 right-4 text-[64px] leading-none opacity-90">{p.icon}</div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <h3 className="font-bold text-[24px] md:text-[28px] leading-snug mb-3" style={{ color: C.text }}>{p.title}</h3>
                    <p className="text-[17px] font-semibold leading-relaxed mb-4" style={{ color: C.primary }}>{p.benefit}</p>
                    <p className="text-[14px] leading-relaxed mb-5" style={{ color: C.textMuted }}>{p.detail}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.proofPoints.map((pp, j) => (
                        <Pill key={j} variant="success">✓ {pp}</Pill>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================ PRIVACY (RADAR DIAGRAM) ============================ */}
      <Section bg="deep">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow color={C.surfaceSoft}>Privacy First</Eyebrow>
            <h2 className="font-bold leading-tight mb-5" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
              ทำไมเราเลือก "เรดาร์"<br />แทนการติดกล้องในห้อง?
            </h2>
            <p className="text-[16px] leading-relaxed" style={{ color: '#FFF', opacity: 0.85 }}>
              ความเป็นส่วนตัวของผู้สูงอายุ คือเหตุผลที่ครอบครัวส่วนใหญ่ปฏิเสธระบบดูแลที่ใช้กล้อง
              <br />เราจึงใช้คลื่น mmWave Radar ที่เห็น "การเคลื่อนไหว" แต่ไม่เห็น "ตัวคน"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="rounded-2xl p-7" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 className="font-bold text-[19px] mb-5">📷 ระบบที่ใช้กล้อง</h3>
              <ul className="text-[14px] leading-relaxed space-y-3" style={{ color: '#FFF', opacity: 0.85 }}>
                <li className="flex gap-3"><span style={{ color: '#FCA5A5' }} className="shrink-0">✕</span> เห็นภาพร่างกายผู้สูงอายุชัดเจน</li>
                <li className="flex gap-3"><span style={{ color: '#FCA5A5' }} className="shrink-0">✕</span> ผู้สูงอายุรู้สึกถูกจ้อง อึดอัด</li>
                <li className="flex gap-3"><span style={{ color: '#FCA5A5' }} className="shrink-0">✕</span> ติดในห้องนอน/ห้องน้ำลำบาก</li>
                <li className="flex gap-3"><span style={{ color: '#FCA5A5' }} className="shrink-0">✕</span> ในที่มืดประสิทธิภาพลดลง</li>
              </ul>
            </div>
            <div className="rounded-2xl p-7" style={{ background: '#FFF', color: C.text }}>
              <h3 className="font-bold text-[19px] mb-5" style={{ color: C.primary }}>📡 ระบบเรดาร์ของเรา</h3>
              <ul className="text-[14px] leading-relaxed space-y-3">
                <li className="flex gap-3"><span style={{ color: C.success }} className="shrink-0">✓</span> ไม่บันทึกภาพ — เห็นแต่ "การเคลื่อนไหว"</li>
                <li className="flex gap-3"><span style={{ color: C.success }} className="shrink-0">✓</span> ผู้สูงอายุยอมรับได้ ไม่รู้สึกถูกจ้อง</li>
                <li className="flex gap-3"><span style={{ color: C.success }} className="shrink-0">✓</span> ติดในห้องส่วนตัวได้ ไม่ละเมิด PDPA</li>
                <li className="flex gap-3"><span style={{ color: C.success }} className="shrink-0">✓</span> ทำงานได้ดีในที่มืด มีกำแพงกั้นยังตรวจจับได้</li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl p-6 md:p-10" style={{ background: '#FFF', color: C.text }}>
            <div className="text-center mb-4">
              <Eyebrow color={C.accent}>เรดาร์ทำงานอย่างไร</Eyebrow>
              <h3 className="font-bold text-[20px] md:text-[24px]" style={{ color: C.text }}>เห็นการเคลื่อนไหว ไม่เห็นภาพ</h3>
            </div>
            <RadarDiagram />
          </div>
        </div>
      </Section>

      {/* ============================ DEMO VIDEO ============================ */}
      <Section bg="cream">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Eyebrow>Demo</Eyebrow>
            <h2 className="font-bold leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: C.text }}>
              ดูระบบทำงานจริง<br />ในสถานการณ์จำลอง
            </h2>
          </div>

          <div className="rounded-3xl overflow-hidden" style={{ background: '#000', boxShadow: `0 20px 50px ${C.primary}22` }}>
            <video
              src={`${IMG}/demo-radar.mp4`}
              poster={`${IMG}/demo-poster.jpg`}
              controls
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-auto"
              onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.style.minHeight = '200px'; e.currentTarget.parentElement.style.display='flex'; e.currentTarget.parentElement.style.alignItems='center'; e.currentTarget.parentElement.style.justifyContent='center'; e.currentTarget.parentElement.innerHTML = '<div style=\"color:#FFF;padding:40px;text-align:center;\">📹 วิดีโอ demo จะใส่หลังจาก Tua โหลดไฟล์ลง public/' + 'images/elderly-care/demo-radar.mp4</div>'; }}
            />
          </div>
          <p className="text-center text-[12px] mt-4 italic" style={{ color: C.textMuted }}>
            * วิดีโอเป็นการจำลอง use case — สถานการณ์จริงและตัวเลขขึ้นกับการติดตั้งและทดสอบในพื้นที่
          </p>
        </div>
      </Section>

      {/* ============================ REUSE — ใช้ของเดิม ============================ */}
      <Section bg="white">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow color={C.accent}>ไม่ต้องเริ่มจากศูนย์</Eyebrow>
            <h2 className="font-bold leading-tight mb-5" style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: C.text }}>
              ต่อยอดจากสิ่งที่<br />เทศบาลมีอยู่แล้ว
            </h2>
            <p className="text-[16px] leading-relaxed" style={{ color: C.textMuted }}>
              เราออกแบบระบบให้ทำงานบนโครงสร้างพื้นฐานที่เทศบาลลงทุนไปแล้ว — ลดงบประมาณรอบใหม่ ลดเวลาติดตั้ง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[900px] mx-auto">
            {reuseAdvantages.map((r, i) => (
              <div key={i} className="rounded-2xl p-6 flex items-start gap-4" style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-[16px] shrink-0" style={{ background: C.primary, color: '#FFF' }}>
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-bold text-[17px] mb-1" style={{ color: C.text }}>{r.label}</h4>
                  <p className="text-[14px] leading-relaxed" style={{ color: C.textMuted }}>{r.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================ BENEFITS ============================ */}
      <Section bg="primary">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow color={C.surfaceSoft}>ผลลัพธ์ที่คาดหวัง</Eyebrow>
            <h2 className="font-bold leading-tight mb-5" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
              ประโยชน์ที่<br />เทศบาลและประชาชนได้
            </h2>
            <p className="text-[13px] italic" style={{ color: '#FFF', opacity: 0.75 }}>
              * ตัวเลขและผลลัพธ์เป็นประมาณการ ขึ้นอยู่กับขนาดพื้นที่และจำนวนจุดติดตั้ง — สามารถวัด KPI ได้จริงในช่วง pilot
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl p-7"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
              >
                <div className="text-[40px] mb-3 leading-none">{b.icon}</div>
                <h3 className="font-bold text-[20px] leading-snug mb-3">{b.title}</h3>
                <p className="text-[14px] leading-relaxed" style={{ color: '#FFF', opacity: 0.85 }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================ PILOT (PHASES) ============================ */}
      <Section bg="cream">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow>เริ่มจากเล็กไปใหญ่</Eyebrow>
            <h2 className="font-bold leading-tight mb-5" style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: C.text }}>
              ไม่ต้องลงทุนทั้งตำบล<br />เริ่ม Pilot 1 ชุมชนก่อน
            </h2>
            <p className="text-[16px] leading-relaxed" style={{ color: C.textMuted }}>
              แนะนำให้เลือก 1 ชุมชนในเขตเทศบาลเป็นพื้นที่นำร่อง 3-6 เดือน เพื่อพิสูจน์ผลและเก็บข้อมูล
              <br />ก่อนขยายไปยังพื้นที่อื่น — ลดความเสี่ยงงบประมาณ และมี case study เป็นของตัวเอง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {phases.map((s, i) => (
              <div key={i} className="rounded-2xl p-7 relative" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
                <div className="text-[36px] mb-3 leading-none">{s.icon}</div>
                <Eyebrow color={C.accent}>{s.phase}</Eyebrow>
                <h4 className="font-bold text-[19px] leading-snug mb-2" style={{ color: C.text }}>{s.title}</h4>
                <p className="text-[14px] leading-relaxed" style={{ color: C.textMuted }}>{s.detail}</p>
                {i < phases.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 rounded-full items-center justify-center font-bold flex" style={{ background: C.accent, color: '#FFF' }}>›</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================ COMPLIANCE ============================ */}
      <Section bg="white">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-10">
            <Eyebrow color={C.textMuted}>มาตรฐานและความปลอดภัย</Eyebrow>
            <h2 className="font-bold text-[24px] md:text-[32px]" style={{ color: C.text }}>ออกแบบตามกฎหมายไทย</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'PDPA', desc: 'รองรับ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล 2562 — มี consent + audit log', icon: '🔒' },
              { title: 'Open API', desc: 'เชื่อมระบบ 1132 และ Traffy Fondue ของหน่วยงานท้องถิ่นได้', icon: '🔗' },
              { title: 'Edge + Cloud', desc: 'ประมวลผลที่อุปกรณ์ก่อนส่ง Cloud — ลดข้อมูลส่วนบุคคลที่ออกนอกระบบ', icon: '⚙️' },
            ].map((c, i) => (
              <div key={i} className="text-left">
                <div className="text-[28px] mb-3">{c.icon}</div>
                <h4 className="font-bold text-[17px] mb-2" style={{ color: C.text }}>{c.title}</h4>
                <p className="text-[14px] leading-relaxed" style={{ color: C.textMuted }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================ CTA ============================ */}
      <Section bg="deep">
        <div className="max-w-[800px] mx-auto text-center">
          <Eyebrow color={C.surfaceSoft}>ขั้นต่อไป</Eyebrow>
          <h2 className="font-bold leading-tight mb-5" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
            ขอ 30 นาที คุยปัญหา<br />ผู้สูงอายุในพื้นที่ของท่าน
          </h2>
          <p className="text-[17px] leading-relaxed mb-10" style={{ color: '#FFF', opacity: 0.85 }}>
            ไม่ต้องตัดสินใจอะไรในวันนี้ — เราขอฟังก่อนว่าเทศบาลของท่านเจอปัญหาอะไร<br />
            แล้วเราจึงเสนอแบบที่เหมาะกับพื้นที่ ไม่ใช่ขายแพ็กเกจสำเร็จรูป
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="#" className="text-[15px] font-semibold px-7 py-3 rounded-lg no-underline" style={{ background: '#FFF', color: C.primary }}>
              นัดคุยกับทีม
            </a>
            <a href="#" className="text-[15px] font-medium px-7 py-3 rounded-lg no-underline" style={{ background: 'transparent', color: '#FFF', border: '1px solid rgba(255,255,255,0.5)' }}>
              ขอเอกสารเพิ่มเติม
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
