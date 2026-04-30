import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ---------------------------------------------------------------------------
// CCTVAI.jsx — Product 4: CCTV + AI · 2 หลักการที่ควรรู้ก่อนตัดสินใจ
// Design: Civic Trust palette (Forest #0F6E56 + Cream #FAF7EE + Amber #BA7517)
// Font: Sarabun
// Pain-first storytelling: "กล้องเยอะแต่ไม่มีคนดู" → 2 หลักการ → LPR demo → Coverage
// Pricing: NOT in this page — sales discusses verbally
// ---------------------------------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

// Civic Trust palette (same as WasteCollectionFee / SmartStreetLight)
const C = {
  primary: '#0F6E56',
  primaryHover: '#1D9E75',
  primaryDeep: '#0B5544',
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

// ── atoms ───────────────────────────────────────────────────────────────────
function Eyebrow({ color = C.primary, children }) {
  return (
    <p className="text-[12px] font-semibold uppercase mb-3" style={{ color, letterSpacing: '2.5px' }}>
      {children}
    </p>
  );
}

function Section({ children, bg = 'cream', id = '' }) {
  const bgMap = { cream: C.surface, soft: C.surfaceSoft, deep: C.primaryDeep, white: '#FFFFFF' };
  const isDeep = bg === 'deep';
  return (
    <section id={id} className="px-6 md:px-10 py-20 md:py-24" style={{ background: bgMap[bg], color: isDeep ? '#FFF' : C.text }}>
      {children}
    </section>
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
    <span className="inline-flex items-center text-[12px] font-medium px-3 py-1 rounded-full"
      style={{ background: v.bg, color: v.color, border: v.border || 'none' }}>
      {children}
    </span>
  );
}

function CTAButton({ children, primary = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-[15px] font-medium px-6 py-3 rounded-lg cursor-pointer transition-all"
      style={primary
        ? { background: C.primary, color: '#FFF', border: 'none' }
        : { background: 'transparent', color: C.primary, border: `1px solid ${C.primary}` }}
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

function StatCard({ label, value, sub, accent = C.primary }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
      <div className="text-[12px] font-medium uppercase tracking-wider mb-2" style={{ color: C.textMuted }}>{label}</div>
      <div className="text-[32px] md:text-[36px] font-semibold leading-tight" style={{ color: accent }}>{value}</div>
      {sub && <div className="text-[13px] mt-2 leading-relaxed" style={{ color: C.textMuted }}>{sub}</div>}
    </div>
  );
}

function PanelChrome({ title, subtitle, status, children }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
      <div className="px-5 py-3 flex items-center gap-3 text-[12px]"
        style={{ background: '#FFF', color: C.textMuted, borderBottom: `1px solid ${C.surfaceSoft}` }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold"
          style={{ background: C.primary, color: '#FFF', letterSpacing: '0.5px' }}>
          อบต
        </div>
        <div>
          <div className="font-semibold" style={{ color: C.text, fontSize: '13px' }}>{title}</div>
          <div style={{ color: C.textMuted, fontSize: '11px' }}>{subtitle}</div>
        </div>
        {status && (
          <span className="ml-auto flex items-center gap-1.5" style={{ color: C.success }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.success }}></span>
            {status}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

// ── Architecture diagram (reusable for A and B) ─────────────────────────────
function ArchDiagram({ nodes, accent = C.primary, caption }) {
  return (
    <div className="rounded-2xl p-6 md:p-8" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
        {nodes.map((n, i) => (
          <React.Fragment key={i}>
            <div
              className="rounded-xl p-4 text-center"
              style={{
                background: n.heavy ? C.alertSoft : n.light ? C.successSoft : C.surface,
                border: `1.5px solid ${n.heavy ? C.alert + '55' : n.light ? C.success + '55' : C.surfaceSoft}`,
                gridColumn: 'span 1',
              }}
            >
              <div className="text-[28px] mb-1">{n.icon}</div>
              <div className="text-[13px] font-semibold leading-tight" style={{ color: n.heavy ? C.alert : n.light ? '#3B6D11' : C.text }}>{n.label}</div>
              <div className="text-[11px] mt-1" style={{ color: C.textMuted }}>{n.sub}</div>
            </div>
            {i < nodes.length - 1 && (
              <div className="text-center text-[22px] font-bold md:rotate-0 rotate-90" style={{ color: accent }}>→</div>
            )}
          </React.Fragment>
        ))}
      </div>
      {caption && (
        <div className="mt-5 p-4 rounded-lg" style={{ background: C.surface, borderLeft: `3px solid ${C.accent}` }}>
          <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>
            <strong style={{ color: C.primaryDeep }}>อ่านง่าย ๆ:</strong> {caption}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Verdict (good/warn/bad) ─────────────────────────────────────────────────
function VerdictCard({ tone, title, items }) {
  const toneMap = {
    good: { color: '#3B6D11', bg: C.successSoft, icon: '✓', borderColor: C.success },
    warn: { color: C.accent, bg: C.accentSoft, icon: '!', borderColor: C.accent },
    bad: { color: C.alert, bg: C.alertSoft, icon: '×', borderColor: C.alert },
  }[tone];
  return (
    <div className="rounded-2xl p-5" style={{ background: '#FFF', borderTop: `4px solid ${toneMap.borderColor}`, border: `1px solid ${C.surfaceSoft}`, borderTopWidth: 4, borderTopColor: toneMap.borderColor }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="w-6 h-6 rounded-full inline-flex items-center justify-center text-[13px] font-bold" style={{ background: toneMap.bg, color: toneMap.color }}>{toneMap.icon}</span>
        <div className="text-[14px] font-semibold" style={{ color: toneMap.color }}>{title}</div>
      </div>
      <ul className="space-y-2 text-[13.5px] leading-relaxed" style={{ color: C.text }}>
        {items.map((it, i) => (
          <li key={i} className="pl-4 relative">
            <span className="absolute left-0 top-0" style={{ color: C.textMuted }}>·</span>{it}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Tab definitions ─────────────────────────────────────────────────────────
const TABS = [
  { key: 'approachA', label: 'แนวทาง A · แนะนำ', sub: 'กล้องเดิม + Server กลาง · stable', recommended: true },
  { key: 'approachB', label: 'แนวทาง B', sub: 'กระจายที่หน้างาน · เคสเฉพาะ' },
  { key: 'lpr', label: 'ตัวอย่าง use-case', sub: 'LPR · ค้นหาทะเบียน' },
  { key: 'compare', label: 'เปรียบเทียบ', sub: 'A vs B เคียงข้างกัน' },
  { key: 'coverage', label: 'Coverage Estimator', sub: 'จุดติดตั้ง · โหลด Server' },
];

// ── Approach A panel — มี sub-toggle A1 (หลัง NVR) vs A2 (ก่อน NVR/dual) ──
function ApproachAPanel() {
  const [variant, setVariant] = useState('A1');

  const VARIANTS = {
    A1: {
      label: 'A1 · หลัง NVR',
      sub: 'อ่าน RTSP ผ่าน NVR ของหน่วยงาน',
      nodes: [
        { icon: '📹', label: 'กล้องเดิม', sub: 'ของหน่วยงาน' },
        { icon: '📦', label: 'NVR ของหน่วยงาน', sub: 'บันทึกภาพ + ดูเดิม' },
        { icon: '🖥️', label: 'Server AI', sub: 'อ่าน RTSP จาก NVR' },
        { icon: '📊', label: 'Dashboard', sub: 'แจ้งเตือน · ค้นหา' },
      ],
      caption: 'NVR ของหน่วยงานทำงานเหมือนเดิม 100% — Server AI ของเราเข้าไปขอ access ดึง RTSP stream จาก NVR ออกมาวิเคราะห์ → ผลส่งกลับมาเป็น dashboard',
      good: [
        'ติดตั้งง่าย — ขอแค่ access NVR เท่านั้น',
        'ไม่ต้องแตะ network เดิมของหน่วยงาน',
        'NVR + กล้องยังทำงานปกติ ไม่กระทบของเดิม',
        'เริ่มได้ใน 1 วัน · เหมาะกับ pilot',
      ],
      warn: [
        'Latency 1-2 วินาที (ภาพผ่าน NVR ก่อน)',
        'NVR เก่าบางรุ่นจำกัดจำนวน RTSP simultaneous',
        'คุณภาพภาพอาจลดลงจากการ re-encode ของ NVR',
      ],
      bad: [
        'ไม่เหมาะกับงาน real-time ที่ต้องไวมาก (เช่น แจ้งเตอนรถวิ่งย้อนศรทันที)',
        'ถ้า NVR เปลี่ยน password ระบบเราต้องอัปเดตด้วย',
      ],
      bestFor: 'เหมาะกับ: ค้นย้อนหลัง · LPR forensic · ดูแลผู้สูงอายุ · นับ/จำแนก object',
    },
    A2: {
      label: 'A2 · ก่อน NVR (Dual stream)',
      sub: 'แยกภาพจากกล้องส่ง 2 ทาง — NVR + Server AI พร้อมกัน',
      nodes: [
        { icon: '📹', label: 'กล้องเดิม', sub: 'รุ่นที่ส่ง dual stream ได้' },
        { icon: '🔀', label: 'Switch', sub: 'แยกภาพ 2 ทาง', heavy: true },
        { icon: '📦🖥️', label: 'NVR + Server AI', sub: 'ทำงานคู่กัน · พร้อมกัน', light: true },
        { icon: '📊', label: 'Dashboard', sub: 'Real-time alert' },
      ],
      caption: 'กล้องส่งภาพ 2 ชุดพร้อมกัน — ชุดหนึ่งไป NVR (บันทึกเหมือนเดิม) อีกชุดไป Server AI (วิเคราะห์ทันที) · Server AI เห็นภาพ raw จากกล้องก่อนถูก compress ที่ NVR',
      good: [
        'Latency ต่ำสุด · Real-time alert ได้ทันที',
        'คุณภาพภาพดีที่สุด (raw จากกล้องตรง)',
        'NVR ยังทำงานเหมือนเดิม · ไม่กดดัน NVR เก่า',
        'เหมาะกับงานที่ต้องไว เช่น วินัยจราจร · เก็บค่าจอด',
      ],
      warn: [
        'ต้อง config network ใหม่ — switch ต้อง support port mirroring / multicast',
        'กล้องต้อง support dual stream (RTSP main + sub) — บางรุ่นเก่าไม่ได้',
        'Bandwidth ใช้เพิ่มขึ้น (ภาพวิ่ง 2 ที่)',
      ],
      bad: [
        'ติดตั้งซับซ้อนกว่า · ต้องคุยกับ IT ของหน่วยงาน',
        'อาจต้องเปลี่ยน switch ถ้าของเดิมไม่รองรับ',
      ],
      bestFor: 'เหมาะกับ: วินัยจราจร · เก็บค่าจอดรถ · LPR live · พื้นที่หวงห้าม (real-time)',
    },
  };

  const v = VARIANTS[variant];

  return (
    <PanelChrome title="แนวทาง A · ใช้กล้องเดิม + Server AI กลาง" subtitle="Solution หลักที่เราแนะนำ · stable · พร้อมใช้งานจริง">
      <div className="p-6 md:p-8 space-y-6">

        {/* Stable / recommended banner */}
        <div className="rounded-xl p-4 flex gap-3 items-start" style={{ background: C.successSoft, borderLeft: `4px solid ${C.success}` }}>
          <span className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[14px] shrink-0" style={{ background: C.success, color: '#FFF' }}>★</span>
          <div className="text-[13.5px] leading-relaxed" style={{ color: C.text }}>
            <strong style={{ color: '#3B6D11' }}>นี่คือ solution หลักที่เราแนะนำ:</strong> ใช้งานจริงในหลายโครงการ · stable · มีทีม support พร้อม · ครอบคลุม use-case 80% ที่หน่วยงาน อปท. ต้องการ — เริ่มต้นเร็ว · ใช้กล้องเดิมต่อได้
          </div>
        </div>

        {/* Use-case pills — ทำได้จริง */}
        <div>
          <div className="text-[12px] font-semibold uppercase tracking-wider mb-2" style={{ color: C.textMuted, letterSpacing: '2px' }}>Application ที่ทำได้จริงในแนวทางนี้</div>
          <div className="flex flex-wrap gap-2">
            <Pill variant="primary">🔢 LPR · ค้นทะเบียนรถ</Pill>
            <Pill variant="primary">📦 นับ / จำแนก object (รถ · คน · ขยะ)</Pill>
            <Pill variant="primary">👤 Face Recognition</Pill>
            <Pill variant="primary">🚦 วินัยจราจร · จอผิด · ย้อนศร · ฝ่าไฟแดง</Pill>
            <Pill variant="alert">PDPA: Face ต้องอยู่ภายใต้นโยบาย</Pill>
          </div>
        </div>

        {/* Real-time disclosure */}
        <div className="rounded-xl p-4 flex gap-3 items-start" style={{ background: C.accentSoft, borderLeft: `4px solid ${C.accent}` }}>
          <span className="text-[18px] shrink-0" style={{ color: C.accent }}>ℹ️</span>
          <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>
            <strong style={{ color: C.accent }}>เกี่ยวกับความเร็ว:</strong> บาง application อาจ<em>ไม่ใช่ real-time แบบเดี๋ยวนั้น</em> (อาจหน่วง 1-2 วินาที) — แต่ระบบยังให้ข้อมูล / พฤติกรรมครบถ้วน หน่วยงาน<strong>เห็นข้อมูลย้อนหลังเอาไปบริหารต่อได้</strong> (forensic / รายงาน / วิเคราะห์ trend) · กรณีที่ต้องการ <strong>real-time จริง ๆ</strong> (เช่น แจ้งเตือนรถวิ่งย้อนศร<em>ขณะเกิดเหตุ</em>) → เราแนะนำ A2 (Dual stream) ที่ผมจะอธิบายด้านล่าง
          </div>
        </div>

        {/* Sub-variant toggle */}
        <div>
          <div className="text-[12px] font-semibold uppercase tracking-wider mb-2" style={{ color: C.textMuted }}>เลือกรูปแบบย่อย</div>
          <div className="flex p-1 rounded-xl gap-1" style={{ background: C.surfaceSoft }}>
            {Object.entries(VARIANTS).map(([k, val]) => (
              <button
                key={k}
                onClick={() => setVariant(k)}
                className="flex-1 text-left px-4 py-3 rounded-lg transition-all"
                style={variant === k
                  ? { background: '#FFF', boxShadow: `0 2px 8px ${C.primary}22` }
                  : { background: 'transparent' }}
              >
                <div className="text-[13.5px] font-semibold" style={{ color: variant === k ? C.primaryDeep : C.textMuted }}>{val.label}</div>
                <div className="text-[11.5px] mt-0.5" style={{ color: C.textMuted }}>{val.sub}</div>
              </button>
            ))}
          </div>
        </div>

        <ArchDiagram
          accent={C.primary}
          nodes={v.nodes}
          caption={v.caption}
        />

        {/* Best for callout */}
        <div className="rounded-xl p-4 flex gap-3 items-start" style={{ background: C.accentSoft, borderLeft: `4px solid ${C.accent}` }}>
          <span className="text-[18px]" style={{ color: C.accent }}>💡</span>
          <div className="text-[13.5px] leading-relaxed" style={{ color: C.text }}>
            <strong style={{ color: C.accent }}>เลือกแบบนี้เมื่อ:</strong> {v.bestFor}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <VerdictCard tone="good" title="สิ่งที่ทำได้ดี" items={v.good}/>
          <VerdictCard tone="warn" title="ข้อจำกัด" items={v.warn}/>
          <VerdictCard tone="bad" title="ต้องระวัง" items={v.bad}/>
        </div>

        {/* Quick comparison A1 vs A2 */}
        <div className="rounded-2xl p-5 md:p-6" style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}>
          <div className="text-[14px] font-semibold mb-3" style={{ color: C.primaryDeep }}>A1 vs A2 — ตารางสรุปสั้น</div>
          <div className="overflow-x-auto">
            <table className="w-full text-[12.5px]">
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.surfaceSoft}` }}>
                  <th className="text-left py-2 pr-3 font-semibold" style={{ color: C.textMuted }}>ประเด็น</th>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: C.primaryDeep }}>A1 · หลัง NVR</th>
                  <th className="text-left py-2 pl-3 font-semibold" style={{ color: C.primaryDeep }}>A2 · ก่อน NVR (dual)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['ความยากในการติดตั้ง', 'ง่าย · 1 วัน', 'ปานกลาง · ต้องแก้ network'],
                  ['Latency / ความไว', '1-2 วินาที', 'ทันที (real-time)'],
                  ['คุณภาพภาพ', 'ลดเล็กน้อย', 'ดีที่สุด'],
                  ['กระทบของเดิม', 'ไม่กระทบเลย', 'ต้อง config switch'],
                  ['ความซับซ้อนของอุปกรณ์', 'น้อย — ใช้ของเดิมทั้งหมด', 'มากขึ้น · อาจเปลี่ยน switch'],
                ].map((r, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.surfaceSoft}` }}>
                    <td className="py-2 pr-3 font-medium" style={{ color: C.text }}>{r[0]}</td>
                    <td className="py-2 px-3" style={{ color: C.text }}>{r[1]}</td>
                    <td className="py-2 pl-3" style={{ color: C.text }}>{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-[12px] leading-relaxed" style={{ color: C.textMuted }}>
            <strong style={{ color: C.primary }}>คำแนะนำของเรา:</strong> ส่วนใหญ่เริ่มที่ <strong>A1</strong> ก่อน เพราะติดตั้งใน 1 วัน · ครอบคลุม use-case 80% ที่ต้องการ · ใช้ <strong>A2</strong> เฉพาะเมื่อต้องการ real-time alert (เช่น วินัยจราจรที่ต้องไวมาก)
          </div>
        </div>

        {/* Tech details — collapsible */}
        <EdgeAITechDetails/>

      </div>
    </PanelChrome>
  );
}

// ── Approach B panel — สำหรับเคสเฉพาะ (network ไม่เสถียร / outdoor / กระจายไกล) ─
function ApproachBPanel() {
  return (
    <PanelChrome title="แนวทาง B · กระจาย Edge AI ที่หน้างาน" subtitle="สำหรับเคสเฉพาะ — เครือข่ายไม่เสถียร · outdoor · พื้นที่กระจายไกล">
      <div className="p-6 md:p-8 space-y-6">

        {/* Status banner — not the primary recommendation */}
        <div className="rounded-xl p-4 flex gap-3 items-start" style={{ background: C.accentSoft, borderLeft: `4px solid ${C.accent}` }}>
          <span className="text-[18px] shrink-0" style={{ color: C.accent }}>ℹ️</span>
          <div className="text-[13.5px] leading-relaxed" style={{ color: C.text }}>
            <strong style={{ color: C.accent }}>หมายเหตุ:</strong> แนวทาง B ออกแบบมาสำหรับ<em>เคสเฉพาะ</em> ที่แนวทาง A ทำไม่ได้ดี — เช่น กล้องอยู่นอกอาคารและเครือข่ายไม่เสถียร · กระจายในพื้นที่กว้างมาก · จุดที่ต้องการ real-time ทันทีและขาด network ไม่ได้ · <strong>solution หลักที่เราแนะนำให้หน่วยงาน อปท. ส่วนใหญ่คือ "แนวทาง A"</strong>
          </div>
        </div>

        <ArchDiagram
          accent={C.accent}
          nodes={[
            { icon: '📷', label: 'กล้อง / กล่อง AI', sub: 'มี chip AI ในตัว', light: true },
            { icon: '⚡', label: 'วิเคราะห์ที่หน้างาน', sub: 'Edge processing' },
            { icon: '📡', label: 'ส่งเฉพาะ Event', sub: 'ไม่ส่งวิดีโอทั้งวัน', light: true },
            { icon: '📊', label: 'Server เบา + Dashboard', sub: 'Cloud หรือ on-prem' },
          ]}
          caption="Edge AI Computer หรือกล้อง AI ที่ติดตั้งใกล้กล้อง → คิดเองที่หน้างาน → เกิดเหตุค่อยส่งเฉพาะ 'เหตุการณ์' ขึ้น Server กลาง → เหมาะเมื่อ network ไม่เสถียร หรือต้องการให้ระบบทำงานต่อแม้เน็ตล่ม"
        />

        {/* Best-for callout */}
        <div className="rounded-xl p-4 flex gap-3 items-start" style={{ background: C.surface, borderLeft: `4px solid ${C.primary}` }}>
          <span className="text-[18px] shrink-0">💡</span>
          <div className="text-[13.5px] leading-relaxed" style={{ color: C.text }}>
            <strong style={{ color: C.primary }}>เลือก B เมื่อ:</strong> กล้องอยู่นอกอาคาร · พื้นที่ที่ Wi-Fi/4G/5G ไม่เสถียร · ต้องการให้ระบบทำงานได้แม้เน็ตล่ม · จุดที่ต้องการ real-time ทันที (เช่น ป้อมยาม · จุดเก็บค่าจอดรถ · แยกจราจรที่ต้องประมวลผลขณะรถวิ่ง)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <VerdictCard tone="good" title="สิ่งที่ทำได้ดี" items={[
            'Server กลางใช้สเปคต่ำ — ระบบเบา',
            'ตอบสนองเร็ว (Real-time ที่หน้างาน)',
            'Bandwidth ต่ำมาก (ส่งเฉพาะ event)',
            'ขยายทีละจุด — เพิ่ม 1 กล้อง = เพิ่ม 1 ตัว',
            'ถ้าเครือข่ายล่ม กล้องยังทำงานเองได้',
          ]}/>
          <VerdictCard tone="warn" title="ข้อจำกัด" items={[
            'ติดตั้งซับซ้อนกว่า A — ต้องไปแต่ละจุด',
            'ต้องลงทุนอุปกรณ์ใหม่ที่หน้างาน',
            'AI model ฝังที่จุด → อัปเดตทีละตัว',
            'ต้องเลือกสเปกให้ตรง use-case ตั้งแต่ซื้อ',
            'Solution ยังพัฒนาอยู่ — ไม่ stable เท่า A',
          ]}/>
          <VerdictCard tone="bad" title="ต้องระวัง" items={[
            'เลือกผิดสเปก = ทำ use-case ใหม่ไม่ได้',
            'ต้องวางแผนการอัปเดต model ระยะยาว',
            'อุปกรณ์ถูกขโมย = ข้อมูลรั่ว → ต้องมี wipe',
            'ต้องมีไฟ + เครือข่ายที่จุดติดตั้งจริง',
          ]}/>
        </div>
      </div>
    </PanelChrome>
  );
}

// ── LPR Demo panel (with real video) ────────────────────────────────────────
function LPRPanel() {
  return (
    <PanelChrome title="ตัวอย่าง use-case · LPR (License Plate Recognition)" subtitle="เพื่อให้เห็นว่า 'AI กับกล้อง' ทำงานในชีวิตจริงยังไง">
      <div className="p-6 md:p-8 space-y-6">
        {/* Pain → Solution framing */}
        <div className="rounded-xl p-5 md:p-6" style={{ background: C.primaryDeep, color: '#FFF' }}>
          <div className="text-[11px] uppercase tracking-[2px] font-semibold mb-3" style={{ color: C.accent }}>ปัญหาที่หน่วยงานเจอจริง</div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            <div className="rounded-lg p-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: '#FFFFFF99' }}>ก่อนใช้ระบบ</div>
              <div className="text-[14px] leading-relaxed">"กล้องเยอะแต่ไม่มีคนนั่งดู — เวลามีเหตุ ต้องให้คนกดดูทีละกล้อง เสียเวลา หาไม่ทัน"</div>
            </div>
            <div className="text-center text-[28px] md:rotate-0 rotate-90" style={{ color: C.accent }}>→</div>
            <div className="rounded-lg p-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: '#FFFFFF99' }}>หลังใช้ระบบ</div>
              <div className="text-[14px] leading-relaxed">"พิมพ์ทะเบียนรถ → ระบบบอกได้ทันทีว่ารถผ่านกล้องตัวไหน เวลาเท่าไหร่ และวาดเส้นทางการเคลื่อนที่ให้เห็น"</div>
            </div>
          </div>
        </div>

        {/* Real demo video */}
        <div className="rounded-xl overflow-hidden" style={{ background: '#000', boxShadow: `0 6px 24px ${C.primaryDeep}33` }}>
          <video
            src="videos/lpr-demo.mp4"
            poster="videos/lpr-poster.jpg"
            controls
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="block w-full h-auto"
            style={{ background: '#000' }}
          >
            เบราว์เซอร์ของท่านไม่รองรับการเล่นวิดีโอ
          </video>
          <div className="px-5 py-3" style={{ background: C.primaryDeep, color: '#FFF' }}>
            <span style={{ color: C.accent, fontWeight: 600 }}>วิธีอ่านวิดีโอ:</span>
            <span className="text-[13.5px] ml-2">เจ้าหน้าที่พิมพ์ทะเบียน "คส 7290" → ระบบสแกนภาพย้อนหลังจากกล้องทุกตัว → แสดงรายละเอียดผู้ครอบครอง + กล้องที่พบ + เวลา (CAM2 · 19:30 น.)</span>
          </div>
        </div>

        {/* Route map SVG */}
        <div className="rounded-2xl p-5 md:p-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
          <div className="text-[14px] font-semibold mb-3" style={{ color: C.primaryDeep }}>เส้นทางที่ระบบประมวลผลให้ — ทะเบียน คส 7290 (ตัวอย่าง)</div>
          <svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ background: C.surface, borderRadius: 8, border: `1px solid ${C.surfaceSoft}` }}>
            <defs>
              <pattern id="cctvGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={C.surfaceSoft} strokeWidth="0.6"/>
              </pattern>
              <marker id="cctvArrow" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill={C.accent}/>
              </marker>
            </defs>
            <rect width="700" height="240" fill="url(#cctvGrid)"/>
            {/* roads */}
            <path d="M 40 80 Q 200 60 360 100 T 670 130" stroke="#cdc4ac" strokeWidth="14" fill="none" opacity="0.6"/>
            <path d="M 100 220 Q 250 200 400 180 T 660 60" stroke="#cdc4ac" strokeWidth="14" fill="none" opacity="0.6"/>
            {/* trace */}
            <path d="M 80 78 Q 200 70 320 100 T 540 175 L 620 95" stroke={C.accent} strokeWidth="3" fill="none" strokeDasharray="6 4" markerEnd="url(#cctvArrow)"/>
            {/* nodes */}
            <g>
              <circle cx="80" cy="78" r="11" fill={C.primary} stroke="#fff" strokeWidth="3"/>
              <text x="80" y="82" textAnchor="middle" fill="#fff" fontFamily="Sarabun, Tahoma, sans-serif" fontSize="11" fontWeight="700">1</text>
              <text x="80" y="55" textAnchor="middle" fill={C.primaryDeep} fontFamily="Sarabun, Tahoma, sans-serif" fontSize="11" fontWeight="600">CAM1 · 19:12</text>
            </g>
            <g>
              <circle cx="320" cy="100" r="13" fill={C.accent} stroke="#fff" strokeWidth="3"/>
              <text x="320" y="104" textAnchor="middle" fill={C.primaryDeep} fontFamily="Sarabun, Tahoma, sans-serif" fontSize="11" fontWeight="700">★</text>
              <text x="320" y="76" textAnchor="middle" fill={C.alert} fontFamily="Sarabun, Tahoma, sans-serif" fontSize="12" fontWeight="700">CAM2 · 19:30 (MATCH)</text>
            </g>
            <g>
              <circle cx="540" cy="175" r="11" fill={C.primary} stroke="#fff" strokeWidth="3"/>
              <text x="540" y="179" textAnchor="middle" fill="#fff" fontFamily="Sarabun, Tahoma, sans-serif" fontSize="11" fontWeight="700">3</text>
              <text x="540" y="202" textAnchor="middle" fill={C.primaryDeep} fontFamily="Sarabun, Tahoma, sans-serif" fontSize="11" fontWeight="600">CAM3 · 19:48</text>
            </g>
            <g>
              <circle cx="620" cy="95" r="11" fill={C.primary} stroke="#fff" strokeWidth="3"/>
              <text x="620" y="99" textAnchor="middle" fill="#fff" fontFamily="Sarabun, Tahoma, sans-serif" fontSize="11" fontWeight="700">4</text>
              <text x="620" y="72" textAnchor="middle" fill={C.primaryDeep} fontFamily="Sarabun, Tahoma, sans-serif" fontSize="11" fontWeight="600">CAM4 · 20:05</text>
            </g>
          </svg>
          <div className="flex flex-wrap gap-3 mt-3 text-[12px]" style={{ color: C.textMuted }}>
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-full inline-block" style={{ background: C.primary, boxShadow: `0 0 0 1px ${C.surfaceSoft}` }}></span>กล้องที่พบทะเบียน</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-full inline-block" style={{ background: C.accent, boxShadow: `0 0 0 1px ${C.surfaceSoft}` }}></span>กล้องที่ตรงผลค้นหาล่าสุด</span>
            <span>เส้นประ = เส้นทางการเคลื่อนที่ตามเวลา</span>
          </div>
        </div>

        {/* LPR-specific verdicts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <VerdictCard tone="good" title="LPR ทำได้ดี" items={[
            'ค้นหาทะเบียนข้ามกล้องในไม่กี่วินาที',
            'ดูเส้นทางการเคลื่อนที่ของรถได้',
            'แจ้งเตือนทันทีเมื่อรถ blacklist เข้าพื้นที่',
            'ลดงาน "นั่งดูกล้อง" ของเจ้าหน้าที่',
          ]}/>
          <VerdictCard tone="warn" title="ข้อจำกัด LPR" items={[
            'มุมกล้องต้องเห็นทะเบียนชัด (ไม่ใช่ทุกกล้องเดิมทำได้)',
            'ฝน · แสงค่ำ · ป้ายเลอะ → ความแม่นยำลด',
            'รถจักรยานยนต์ทะเบียนเล็ก แม่นยำน้อยกว่ารถเก๋ง',
            'การเชื่อมฐานทะเบียน — ต้องตามขอบเขต MOU',
          ]}/>
          <VerdictCard tone="bad" title="ต้องระวัง" items={[
            'PDPA: ข้อมูลผู้ครอบครองเป็นข้อมูลส่วนบุคคล',
            'การเข้าถึงต้องมี audit log',
            'ระยะเวลาเก็บข้อมูล / สิทธิ์เข้าถึง — ต้องประกาศชัด',
            'ตาม Computer Crime Act ต้องมีนโยบายชัดเจน',
          ]}/>
        </div>
      </div>
    </PanelChrome>
  );
}

// ── Compare panel ───────────────────────────────────────────────────────────
function ComparePanel() {
  const rows = [
    ['Solution พร้อมใช้งาน', { text: '✓ stable · ใช้จริงในหลายโครงการ', tone: 'success' }, { text: 'สำหรับเคสเฉพาะ · พัฒนาอยู่', tone: 'alert' }],
    ['กล้องที่ใช้', 'กล้องเดิมของหน่วยงาน', 'กล้อง / กล่อง AI ใหม่'],
    ['ที่เก็บภาระประมวลผล', 'Server กลาง 1 เครื่อง', 'กระจายไปแต่ละจุด'],
    ['เวลา deploy', { text: 'เร็ว · ภายใน 1 วัน', tone: 'success' }, 'ปานกลาง — ติดตั้งทีละจุด'],
    ['ขยายระบบ', 'ต้องอัปเกรด Server', 'เพิ่ม 1 จุด = เพิ่ม 1 ตัว'],
    ['เครือข่ายล่ม', { text: 'ระบบหยุด', tone: 'alert' }, { text: 'ยังทำงานได้', tone: 'success' }],
    ['ความยืดหยุ่น AI', 'เปลี่ยน model ที่ server ทุกกล้องได้พร้อมกัน', 'fix ที่ chip — อัปเดตทีละตัว'],
    ['PDPA / Privacy', 'วิดีโอวิ่งทั้งวัน — ต้องเข้ารหัส', 'ส่งเฉพาะ event — ความเสี่ยงต่ำกว่า'],
    ['เหมาะกับ pain แบบไหน', 'ดูภาพรวม · forensic · LPR · จราจร · นับ object · Face (PDPA)', 'พื้นที่ outdoor · network ไม่เสถียร · กระจายไกล'],
  ];

  const renderCell = (cell) => {
    if (typeof cell === 'string') return <span style={{ color: C.text }}>{cell}</span>;
    const colorMap = { alert: C.alert, success: '#3B6D11' };
    return <span className="font-semibold" style={{ color: colorMap[cell.tone] || C.text }}>{cell.text}</span>;
  };

  return (
    <PanelChrome title="เปรียบเทียบ A vs B เคียงข้างกัน" subtitle="มุมมองสำหรับผู้บริหาร — ไม่เน้นเทคนิค">
      <div className="p-6 md:p-8">
        <div className="overflow-x-auto rounded-xl" style={{ border: `1px solid ${C.surfaceSoft}` }}>
          <table className="w-full text-[13.5px]">
            <thead>
              <tr style={{ background: C.surfaceSoft }}>
                <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider text-[12px]" style={{ color: C.primaryDeep, width: '28%' }}>ประเด็น</th>
                <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider text-[12px]" style={{ color: C.primaryDeep }}>
                  <Pill variant="primary">A</Pill> <span className="ml-2">กล้องเดิม + Server กลาง</span>
                </th>
                <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider text-[12px]" style={{ color: C.primaryDeep }}>
                  <Pill variant="accent">B</Pill> <span className="ml-2">Edge AI</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#FFF' : C.surface, borderTop: `1px solid ${C.surfaceSoft}` }}>
                  <td className="px-5 py-3.5 font-semibold align-top" style={{ color: C.primaryDeep }}>{r[0]}</td>
                  <td className="px-5 py-3.5 align-top">{renderCell(r[1])}</td>
                  <td className="px-5 py-3.5 align-top">{renderCell(r[2])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 p-4 rounded-lg" style={{ background: C.accentSoft, borderLeft: `3px solid ${C.accent}` }}>
          <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>
            <strong style={{ color: C.accent }}>คำแนะนำของเรา:</strong> สำหรับหน่วยงาน อปท. ส่วนใหญ่ → เริ่มที่ <strong style={{ color: '#3B6D11' }}>แนวทาง A</strong> เพราะเป็น solution ที่ <strong>stable · พร้อมใช้งานจริง</strong> · ครอบคลุม 80% ของ use-case ที่ต้องการ · ใช้ <strong>แนวทาง B เฉพาะเคสพิเศษ</strong> (กล้อง outdoor · network ไม่เสถียร · ต้องการ real-time แบบขาด network ไม่ได้)
          </div>
        </div>
      </div>
    </PanelChrome>
  );
}

// ── Coverage Estimator panel — ไม่พูดเรื่องเงิน ─────────────────────────────
function CoveragePanel() {
  const [cameras, setCameras] = useState(8);
  const [approach, setApproach] = useState('A'); // default A (stable solution)

  // Logic: A (Server กลาง) ขยายยาก · B (Edge) ขยายทีละจุด
  const result = useMemo(() => {
    // จำนวนจุดที่ครอบคลุมได้
    const coverage = approach === 'B'
      ? Math.round(cameras * 1.0)         // Edge: 1 กล้อง = 1 จุด
      : Math.round(cameras * 1.0);        // A: ก็ 1 ต่อ 1 เหมือนกัน
    // server load — A จะหนัก, B จะเบา
    const serverLoad = approach === 'A' ? Math.min(100, cameras * 8) : Math.min(35, cameras * 1.5);
    // Edge AI Computer ที่ต้องใช้ (B only)
    const edgeBoxes = approach === 'B' ? Math.ceil(cameras / 8) : 0;
    return { coverage, serverLoad: Math.round(serverLoad), edgeBoxes };
  }, [cameras, approach]);

  return (
    <PanelChrome title="Coverage Estimator · จุดติดตั้ง vs โหลด Server" subtitle="ลองปรับจำนวนกล้อง — ดูว่าแต่ละแนวทางต้องใช้ทรัพยากรเท่าไร">
      <div className="p-6 md:p-8 space-y-6">
        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[13px] font-medium" style={{ color: C.text }}>จำนวนจุดติดตั้ง (กล้อง)</span>
              <span className="text-[20px] font-semibold" style={{ color: C.primary }}>{cameras}</span>
            </div>
            <input type="range" min="4" max="30" step="1" value={cameras} onChange={(e) => setCameras(parseInt(e.target.value))} className="w-full" style={{ accentColor: C.primary }}/>
            <div className="flex justify-between text-[11px] mt-1" style={{ color: C.textMuted }}>
              <span>4 (Pilot)</span><span>10 (Standard)</span><span>20 (Pro)</span><span>30+ (Enterprise)</span>
            </div>
          </div>
          <div>
            <div className="text-[13px] font-medium mb-2" style={{ color: C.text }}>เลือกแนวทาง</div>
            <div className="flex p-1 rounded-lg gap-1" style={{ background: C.surfaceSoft }}>
              {['A', 'B'].map(k => (
                <button key={k}
                  onClick={() => setApproach(k)}
                  className="flex-1 text-[13px] font-medium px-3 py-2 rounded-md transition-all"
                  style={approach === k
                    ? { background: '#FFF', color: C.text, boxShadow: `0 1px 3px ${C.primary}22`, fontWeight: 600 }
                    : { background: 'transparent', color: C.textMuted, border: 'none' }}>
                  แนวทาง {k} · {k === 'A' ? 'Server กลาง · แนะนำ' : 'Edge AI · เคสเฉพาะ'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Server load bar */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-[13px] font-medium" style={{ color: C.text }}>โหลดของ Server กลาง (ประมาณการ)</span>
            <span className="text-[14px] font-semibold" style={{ color: result.serverLoad > 70 ? C.alert : result.serverLoad > 40 ? C.accent : C.success }}>
              {result.serverLoad}%
            </span>
          </div>
          <div className="h-4 rounded-full overflow-hidden" style={{ background: C.surfaceSoft }}>
            <div className="h-full transition-all" style={{
              width: `${result.serverLoad}%`,
              background: result.serverLoad > 70 ? C.alert : result.serverLoad > 40 ? C.accent : C.success,
            }}/>
          </div>
          <div className="text-[11.5px] mt-1.5" style={{ color: C.textMuted }}>
            {approach === 'A'
              ? 'แนวทาง A: Server กลางต้องประมวลผลทุกกล้องพร้อมกัน — ยิ่งกล้องเยอะ Server ยิ่งหนัก'
              : 'แนวทาง B: ภาระอยู่ที่ Edge AI box ที่หน้างาน — Server กลางทำหน้าที่แค่รวบรวม event'}
          </div>
        </div>

        {/* Outcome cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            label="ครอบคลุม"
            value={`${result.coverage} จุด`}
            sub={`${cameras} กล้อง = ${result.coverage} จุดสังเกตการณ์`}
            accent={C.primary}/>
          <StatCard
            label={approach === 'B' ? 'Edge AI Box ที่ต้องใช้' : 'Server กลาง'}
            value={approach === 'B' ? `${result.edgeBoxes} ตัว` : '1 เครื่อง'}
            sub={approach === 'B' ? 'Edge AI Computer · 1 ตัวรองรับ 8 กล้อง' : 'รองรับทุกกล้องในระบบ'}
            accent={C.primary}/>
          <StatCard
            label="ความยืดหยุ่นเพิ่มจุด"
            value={approach === 'A' ? 'จำกัด' : 'ทีละจุด'}
            sub={approach === 'A' ? 'ต้องอัปเกรด Server ทุกครั้ง' : 'เพิ่ม 1 Edge box = อีก 8 กล้อง'}
            accent={approach === 'A' ? C.accent : C.success}/>
        </div>

        <div className="rounded-xl p-4" style={{ background: C.surface, borderLeft: `3px solid ${C.primary}` }}>
          <div className="text-[12.5px] leading-relaxed" style={{ color: C.text }}>
            <strong style={{ color: C.primary }}>วิธีอ่าน:</strong> ถ้า Server load &gt; 70% หมายความว่า Server กลางใกล้เต็ม — ต้องอัปเกรด หรือเปลี่ยนมาใช้แนวทาง B (Edge AI) ที่กระจายโหลดให้กล่อง AI ที่หน้างาน
          </div>
        </div>
      </div>
    </PanelChrome>
  );
}

// ── Edge AI Tech Details — collapsible sub-section (used inside Tab A) ──────
// เนื้อหาเทคนิคของ Edge AI Computer · ไม่อ้างถึงยี่ห้อ
function EdgeAITechDetails() {
  const [open, setOpen] = useState(false);
  const [tier, setTier] = useState('mid');

  // Edge AI Computer tiers — ไม่อ้างถึงยี่ห้อ
  const TIERS = {
    entry: {
      name: 'รุ่น Entry · งาน pilot',
      perf: 'ต่ำ',
      streams1080p: '4-8',
      streams4k: '1-2',
      power: '5-10W',
      useCase: 'งาน demo / proof-of-concept',
      note: 'รุ่นเริ่มต้น — เหมาะกับการทดลองก่อนตัดสินใจ scale',
    },
    mid: {
      name: 'รุ่น Standard · งานทั่วไป',
      perf: 'กลาง',
      streams1080p: '8-12',
      streams4k: '2-4',
      power: '7-15W',
      useCase: 'Pilot · 4-8 กล้อง',
      note: 'รุ่นที่นิยมใช้ปัจจุบัน · เหมาะกับ pilot และโครงการเริ่มต้น',
      recommended: true,
    },
    pro: {
      name: 'รุ่น Pro · โครงการขยาย',
      perf: 'สูง',
      streams1080p: '16-24',
      streams4k: '4-6',
      power: '10-25W',
      useCase: 'โครงการขยาย · 10-20 กล้อง',
      note: 'แรงกว่า · เหมาะกับโครงการที่มีกล้องเยอะหรือต้องทำ AI หนัก',
    },
  };
  const t = TIERS[tier];

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.surfaceSoft}`, background: C.surface }}>
      {/* Toggle header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
        style={{ background: open ? C.surfaceSoft : 'transparent' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-[20px]">⚙️</span>
          <div>
            <div className="text-[14px] font-semibold" style={{ color: C.primaryDeep }}>เทคนิคเพิ่มเติม · ชุดอุปกรณ์ Edge AI Computer</div>
            <div className="text-[12px]" style={{ color: C.textMuted }}>คลิกเพื่อดูสเปก · diagram การต่อ · ใช้งานกับ Server เก่าได้ไหม · FAQ</div>
          </div>
        </div>
        <span className="text-[20px] transition-transform" style={{ color: C.primary, transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>⌄</span>
      </button>

      {/* Body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="p-5 md:p-6 space-y-5" style={{ borderTop: `1px solid ${C.surfaceSoft}` }}>

              {/* What is Edge AI Computer */}
              <div className="rounded-xl p-5" style={{ background: C.primaryDeep, color: '#FFF' }}>
                <Eyebrow color={C.accent}>Edge AI Computer คืออะไร</Eyebrow>
                <p className="text-[13.5px] leading-relaxed mb-2">
                  <strong style={{ color: '#FFF' }}>Edge AI Computer</strong> = คอมพิวเตอร์ขนาดเล็ก (เท่าฝ่ามือ – กล่องนม) ที่มี AI chip ในตัว · ทำงานอิสระ · เสียบปลั๊กหรือ PoE++ แล้วทำงานได้เลย · ไม่ใช่การ์ดที่เสียบในเครื่อง server
                </p>
                <p className="text-[13.5px] leading-relaxed" style={{ color: '#FFFFFFCC' }}>
                  <strong style={{ color: C.accent }}>เหตุที่เลือกใช้:</strong> กินไฟ 7-25W เท่าหลอด LED · ทำงานได้ 24 ชั่วโมง · <strong style={{ color: '#FFF' }}>วางในห้อง Server ของหน่วยงานได้เลย</strong> · ขยายโดยเพิ่ม box เพิ่มได้
                </p>
              </div>

              {/* Tier selector */}
              <div>
                <div className="text-[13px] font-medium mb-2" style={{ color: C.text }}>เลือกระดับสเปกเพื่อดูข้อมูล</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {Object.entries(TIERS).map(([k, v]) => (
                    <button
                      key={k}
                      onClick={() => setTier(k)}
                      className="text-left p-3 rounded-xl transition-all relative"
                      style={tier === k
                        ? { background: '#FFF', border: `2px solid ${C.primary}`, boxShadow: `0 2px 12px ${C.primary}22` }
                        : { background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}
                    >
                      {v.recommended && (
                        <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: C.accentSoft, color: C.accent, letterSpacing: '0.5px' }}>
                          แนะนำ
                        </span>
                      )}
                      <div className="text-[13px] font-semibold mb-1" style={{ color: C.primaryDeep }}>{v.name}</div>
                      <div className="text-[11px]" style={{ color: C.textMuted }}>ทำงานเท่ากับ {v.streams1080p} กล้อง 1080p</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tier spec */}
              <div className="rounded-xl p-5" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: C.textMuted }}>กำลัง AI</div>
                    <div className="text-[16px] font-semibold" style={{ color: C.primary }}>{t.perf}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: C.textMuted }}>กล้อง 1080p</div>
                    <div className="text-[16px] font-semibold" style={{ color: C.primary }}>{t.streams1080p}</div>
                    <div className="text-[10px]" style={{ color: C.textMuted }}>สตรีมพร้อมกัน</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: C.textMuted }}>กินไฟ</div>
                    <div className="text-[16px] font-semibold" style={{ color: C.success }}>{t.power}</div>
                    <div className="text-[10px]" style={{ color: C.textMuted }}>(เท่าหลอด LED)</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: C.textMuted }}>เหมาะสำหรับ</div>
                    <div className="text-[12.5px] font-semibold leading-snug" style={{ color: C.primaryDeep }}>{t.useCase}</div>
                  </div>
                </div>
                <div className="mt-3 pt-3 text-[12.5px] leading-relaxed" style={{ borderTop: `1px solid ${C.surfaceSoft}`, color: C.text }}>
                  <strong>💡</strong> {t.note}
                </div>
              </div>

              {/* Connection diagram */}
              <div className="rounded-xl p-5" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
                <div className="text-[14px] font-semibold mb-1" style={{ color: C.primaryDeep }}>การต่อ — 1 ตัวใช้กับกล้องหลายตัวยังไง?</div>
                <div className="text-[12px] mb-4" style={{ color: C.textMuted }}>กล้อง IP CCTV ส่งภาพผ่านสาย LAN เข้า PoE switch → Edge AI Computer อ่าน RTSP stream จากแต่ละกล้องผ่าน LAN เดียวกัน</div>

                <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ background: C.surface, borderRadius: 8, border: `1px solid ${C.surfaceSoft}` }}>
                  <defs>
                    <marker id="eaArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill={C.primary}/>
                    </marker>
                  </defs>

                  {/* Cameras */}
                  {[40, 110, 180, 250].map((y, i) => (
                    <g key={i}>
                      <rect x="20" y={y} width="80" height="50" rx="6" fill="#FFF" stroke={C.primary} strokeWidth="1.5"/>
                      <text x="60" y={y + 22} textAnchor="middle" fontFamily="Sarabun, sans-serif" fontSize="14">📹</text>
                      <text x="60" y={y + 40} textAnchor="middle" fill={C.primaryDeep} fontFamily="Sarabun, sans-serif" fontSize="10" fontWeight="600">CAM {i+1}</text>
                      <line x1="100" y1={y + 25} x2="270" y2="170" stroke={C.primary} strokeWidth="1.5" markerEnd="url(#eaArrow)"/>
                    </g>
                  ))}

                  <text x="60" y="332" textAnchor="middle" fill={C.textMuted} fontFamily="Sarabun, sans-serif" fontSize="11">⋮</text>
                  <text x="60" y="355" textAnchor="middle" fill={C.textMuted} fontFamily="Sarabun, sans-serif" fontSize="10">+ อีก {tier === 'pro' ? '12-20' : tier === 'mid' ? '4-8' : '0-4'} กล้อง</text>

                  {/* PoE Switch */}
                  <rect x="270" y="140" width="140" height="60" rx="6" fill={C.accentSoft} stroke={C.accent} strokeWidth="2"/>
                  <text x="340" y="165" textAnchor="middle" fill={C.primaryDeep} fontFamily="Sarabun, sans-serif" fontSize="12" fontWeight="700">PoE Switch</text>
                  <text x="340" y="183" textAnchor="middle" fill={C.textMuted} fontFamily="Sarabun, sans-serif" fontSize="10">รวมสาย LAN + จ่ายไฟ</text>
                  <text x="340" y="195" textAnchor="middle" fill={C.textMuted} fontFamily="Sarabun, sans-serif" fontSize="9">(8/16/24 พอร์ต)</text>

                  <line x1="410" y1="170" x2="490" y2="170" stroke={C.primary} strokeWidth="2.5" markerEnd="url(#eaArrow)"/>
                  <text x="450" y="160" textAnchor="middle" fill={C.primary} fontFamily="Sarabun, sans-serif" fontSize="9" fontWeight="600">RTSP/LAN</text>

                  {/* Edge AI Computer */}
                  <rect x="490" y="120" width="160" height="100" rx="8" fill={C.primary} stroke={C.primaryDeep} strokeWidth="2"/>
                  <text x="570" y="148" textAnchor="middle" fill="#FFF" fontFamily="Sarabun, sans-serif" fontSize="13" fontWeight="700">🧠 Edge AI Computer</text>
                  <text x="570" y="168" textAnchor="middle" fill="#FFFFFFDD" fontFamily="Sarabun, sans-serif" fontSize="11">AI inference engine</text>
                  <text x="570" y="186" textAnchor="middle" fill={C.accent} fontFamily="Sarabun, sans-serif" fontSize="10" fontWeight="600">วิเคราะห์ภาพแบบ real-time</text>
                  <text x="570" y="204" textAnchor="middle" fill="#FFFFFFAA" fontFamily="Sarabun, sans-serif" fontSize="9">ทุกกล้องพร้อมกัน</text>

                  <line x1="650" y1="170" x2="730" y2="170" stroke={C.accent} strokeWidth="2.5" markerEnd="url(#eaArrow)"/>
                  <text x="690" y="160" textAnchor="middle" fill={C.accent} fontFamily="Sarabun, sans-serif" fontSize="9" fontWeight="600">เฉพาะ event</text>

                  <rect x="730" y="140" width="60" height="60" rx="6" fill="#FFF" stroke={C.primary} strokeWidth="1.5"/>
                  <text x="760" y="170" textAnchor="middle" fontSize="20">☁️</text>
                  <text x="760" y="195" textAnchor="middle" fill={C.primaryDeep} fontFamily="Sarabun, sans-serif" fontSize="10" fontWeight="600">Dashboard</text>

                  {/* Power */}
                  <rect x="490" y="260" width="160" height="40" rx="6" fill={C.successSoft} stroke={C.success} strokeWidth="1.5"/>
                  <text x="570" y="278" textAnchor="middle" fill="#3B6D11" fontFamily="Sarabun, sans-serif" fontSize="11" fontWeight="700">⚡ Adapter หรือ POE++</text>
                  <text x="570" y="293" textAnchor="middle" fill={C.textMuted} fontFamily="Sarabun, sans-serif" fontSize="9">12V/5A · กินไฟน้อย</text>
                  <line x1="570" y1="220" x2="570" y2="260" stroke={C.success} strokeWidth="1.5"/>

                  {/* Labels */}
                  <text x="60" y="20" textAnchor="middle" fill={C.primaryDeep} fontFamily="Sarabun, sans-serif" fontSize="11" fontWeight="700">กล้อง IP (RTSP)</text>
                  <text x="340" y="125" textAnchor="middle" fill={C.primaryDeep} fontFamily="Sarabun, sans-serif" fontSize="11" fontWeight="700">เครือข่าย LAN</text>
                  <text x="570" y="105" textAnchor="middle" fill={C.primaryDeep} fontFamily="Sarabun, sans-serif" fontSize="11" fontWeight="700">Edge AI Computer</text>
                  <text x="760" y="125" textAnchor="middle" fill={C.primaryDeep} fontFamily="Sarabun, sans-serif" fontSize="11" fontWeight="700">ผลลัพธ์</text>
                </svg>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-[12px]">
                  <div className="rounded-lg p-3" style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}>
                    <strong style={{ color: C.primary }}>1. กล้อง</strong> — ใช้กล้อง IP รุ่นไหนก็ได้ที่มี RTSP (Hikvision/Dahua/Uniview/อื่นๆ)
                  </div>
                  <div className="rounded-lg p-3" style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}>
                    <strong style={{ color: C.primary }}>2. PoE Switch</strong> — สายเดียวจ่ายทั้งไฟและข้อมูล · ใช้ Cat6 ยาวได้ 100 ม.
                  </div>
                  <div className="rounded-lg p-3" style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}>
                    <strong style={{ color: C.primary }}>3. Edge AI Computer</strong> — รับ stream ทุกกล้อง · ทำ AI · ส่งผลขึ้น dashboard
                  </div>
                </div>
              </div>

              {/* Use with existing server */}
              <div className="rounded-xl p-5" style={{ background: C.accentSoft, border: `1px solid ${C.accent}55` }}>
                <div className="text-[14px] font-semibold mb-3" style={{ color: C.accent }}>
                  💬 Q: ถ้าหน่วยงานมี Server เดิมอยู่แล้ว ใช้ร่วมกันได้ไหม?
                </div>
                <div className="text-[13px] leading-relaxed mb-3" style={{ color: C.text }}>
                  <strong>ได้ครับ — มี 3 ทางเลือก:</strong>
                </div>
                <div className="space-y-3 text-[12.5px] leading-relaxed">
                  <div className="rounded-lg p-3" style={{ background: '#FFF', border: `1px solid ${C.accent}33` }}>
                    <div className="font-semibold mb-1" style={{ color: C.primaryDeep }}>① ต่อ Edge AI Computer เป็น node แยก (แนะนำ)</div>
                    <div style={{ color: C.text }}>Edge AI Computer ตั้งใน rack เดียวกับ Server เดิม · ต่อ LAN เข้ากัน · Server เดิมรับผลจาก Edge มาแสดงบน dashboard ของหน่วยงาน</div>
                    <div className="mt-1 text-[11px]" style={{ color: C.textMuted }}>✓ ติดตั้งง่าย · ไม่ต้องเปิดเครื่อง Server เดิม · ไม่กระทบ workload เดิม</div>
                  </div>
                  <div className="rounded-lg p-3" style={{ background: '#FFF', border: `1px solid ${C.accent}33` }}>
                    <div className="font-semibold mb-1" style={{ color: C.primaryDeep }}>② เพิ่มการ์ด AI accelerator ลงใน Server เดิม (เงื่อนไขเยอะ)</div>
                    <div style={{ color: C.text }}>ถ้า Server เดิมมี <strong>PCIe x16 slot ว่าง + power 8/16-pin + PSU พอ</strong> — เพิ่มการ์ด GPU/accelerator ได้ · แต่ต้องตรวจสอบสเปก motherboard, BIOS, การระบายความร้อน</div>
                    <div className="mt-1 text-[11px]" style={{ color: C.textMuted }}>⚠️ Server enterprise (Dell/HPE/Lenovo) มักมี slot · Server office ทั่วไปมักไม่มี · ต้องให้ทีมเราตรวจสเปก</div>
                  </div>
                  <div className="rounded-lg p-3" style={{ background: '#FFF', border: `1px solid ${C.accent}33` }}>
                    <div className="font-semibold mb-1" style={{ color: C.primaryDeep }}>③ ใช้การ์ด accelerator ขนาดเล็ก (M.2 / mini-PCIe)</div>
                    <div style={{ color: C.text }}>Server เดิมไม่มี slot ใหญ่ — ใช้การ์ด AI ขนาด M.2 (เช่น 13 TOPS) ที่เสียบช่อง M.2 ของ motherboard ได้ · ขนาดเล็ก กินไฟน้อย</div>
                    <div className="mt-1 text-[11px]" style={{ color: C.textMuted }}>✓ ใช้กับ Server office ได้ · กำลัง AI น้อยกว่า Edge AI Computer แต่ราคาประหยัด</div>
                  </div>
                </div>
                <div className="mt-3 text-[12px] italic" style={{ color: C.textMuted }}>
                  💡 <strong>คำแนะนำ:</strong> ทางที่ ① เป็นทางที่ติดตั้งง่ายและเร็วที่สุด · ทีมเราเข้าไปตรวจ Server เดิมก่อนเสนอ scope
                </div>
              </div>

              {/* How it reads camera */}
              <div className="rounded-xl p-5" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
                <div className="text-[14px] font-semibold mb-3" style={{ color: C.primaryDeep }}>Edge AI Computer "อ่าน" ภาพจากกล้องยังไง? (อธิบายให้ลูกค้าฟัง)</div>
                <ol className="space-y-3 text-[13px] leading-relaxed">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full inline-flex items-center justify-center text-[12px] font-bold shrink-0" style={{ background: C.primary, color: '#FFF' }}>1</span>
                    <div><strong style={{ color: C.primaryDeep }}>กล้อง IP เปิด RTSP server ในตัว</strong> — ทุกกล้องมี URL เช่น <code style={{ background: C.surface, padding: '1px 6px', borderRadius: 3, fontSize: 12 }}>rtsp://admin:pass@192.168.1.10/stream1</code></div>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full inline-flex items-center justify-center text-[12px] font-bold shrink-0" style={{ background: C.primary, color: '#FFF' }}>2</span>
                    <div><strong style={{ color: C.primaryDeep }}>Edge AI Computer เปิด video pipeline</strong> — software ของเราอ่าน RTSP หลาย stream พร้อมกัน · ถอดรหัสวิดีโอด้วย hardware decoder (ไม่กิน CPU)</div>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full inline-flex items-center justify-center text-[12px] font-bold shrink-0" style={{ background: C.primary, color: '#FFF' }}>3</span>
                    <div><strong style={{ color: C.primaryDeep }}>AI Model ทำงานบน chip AI</strong> — รัน object detection / LPR / face / overhead ที่ต้องการ · ทุกกล้องแชร์ chip ตัวเดียว</div>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full inline-flex items-center justify-center text-[12px] font-bold shrink-0" style={{ background: C.primary, color: '#FFF' }}>4</span>
                    <div><strong style={{ color: C.primaryDeep }}>เกิด event → ส่งขึ้น dashboard</strong> — เช่น "พบทะเบียน คส 7290 ที่ CAM2 เวลา 19:30" · ส่งเฉพาะ JSON + thumbnail (ไม่ส่งวิดีโอเต็ม → bandwidth ต่ำ)</div>
                  </li>
                </ol>
              </div>

              {/* Caveats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <VerdictCard tone="good" title="เหมาะกับงานแบบไหน" items={[
                  'pilot 4-12 กล้อง — รุ่น Standard พอ',
                  'พื้นที่ที่ network ไม่เสถียร (ทำงานเองได้)',
                  'งาน real-time (LPR / face / overhead detection)',
                  'ขยายทีละจุด — เพิ่ม 1 ตัว = อีก 8 กล้อง',
                  'งานที่ต้องการกินไฟน้อย · ทำงาน 24 ชั่วโมง',
                ]}/>
                <VerdictCard tone="warn" title="ข้อจำกัด · ต้องระวัง" items={[
                  'อย่าเกิน spec — ลด fps ก่อนเพิ่มกล้อง',
                  'ต้องมี cooling ในไทย (อากาศร้อน) — กล่องของเรามี fan ในตัว',
                  'storage ในตัวจำกัด — ต่อ SSD ภายนอก หรือบันทึกที่ NVR เดิม',
                  'AI model ต้อง optimize ก่อนใช้ — ทีมเราจัดการให้',
                  'เลือกรุ่นต้องดูจำนวนกล้อง + ความซับซ้อนของงาน AI',
                ]}/>
              </div>

              {/* FAQ */}
              <div className="rounded-xl p-5" style={{ background: C.primaryDeep, color: '#FFF' }}>
                <Eyebrow color={C.accent}>FAQ — คำถามที่ลูกค้ามักถาม</Eyebrow>
                <div className="space-y-3 text-[12.5px] leading-relaxed">
                  <div>
                    <div style={{ color: C.accent, fontWeight: 600 }}>Q: 1 ตัวรองรับกี่กล้อง?</div>
                    <div style={{ color: '#FFFFFFCC' }}>A: ขึ้นกับรุ่นและงาน AI — รุ่น Standard รัน <strong>8-12 กล้อง 1080p</strong> สำหรับ object detection ทั่วไป · ถ้าทำ LPR ที่ต้องการความแม่นยำสูง จะลดเหลือ 4-6 กล้อง</div>
                  </div>
                  <div>
                    <div style={{ color: C.accent, fontWeight: 600 }}>Q: ถ้ากล้องเยอะกว่านั้น?</div>
                    <div style={{ color: '#FFFFFFCC' }}>A: เพิ่ม Edge AI Computer หลายตัว — เช่น 16 กล้อง = 2 ตัว · กระจายโหลด · ขยายทีละจุดได้</div>
                  </div>
                  <div>
                    <div style={{ color: C.accent, fontWeight: 600 }}>Q: ต้องเปลี่ยนกล้องเดิมหรือไม่?</div>
                    <div style={{ color: '#FFFFFFCC' }}>A: ไม่ต้อง — ถ้ากล้องเดิมเป็น IP camera ที่มี RTSP (รุ่นปกติ Hikvision/Dahua/อื่นๆ) ใช้ต่อได้เลย</div>
                  </div>
                  <div>
                    <div style={{ color: C.accent, fontWeight: 600 }}>Q: เน็ตล่ม กล้องยังทำงานไหม?</div>
                    <div style={{ color: '#FFFFFFCC' }}>A: ทำงานได้ — Edge AI Computer + กล้อง + switch อยู่ใน LAN เดียวกัน · เก็บ event ในตัว · ส่งขึ้น cloud เมื่อเน็ตกลับมา</div>
                  </div>
                  <div>
                    <div style={{ color: C.accent, fontWeight: 600 }}>Q: เปลี่ยน AI model ได้ไหม?</div>
                    <div style={{ color: '#FFFFFFCC' }}>A: ได้ — push update ผ่าน OTA (over-the-air) · ทีมเราดูแลให้</div>
                  </div>
                  <div>
                    <div style={{ color: C.accent, fontWeight: 600 }}>Q: ต้องวางใกล้กล้องไหม?</div>
                    <div style={{ color: '#FFFFFFCC' }}>A: <strong style={{ color: '#FFF' }}>ไม่ต้อง</strong> — Edge AI Computer อ่านภาพผ่าน LAN ได้ ตราบใดที่อยู่ในเครือข่ายเดียวกัน · <strong style={{ color: '#FFF' }}>วางในห้อง Server ของหน่วยงานได้เลย</strong> · ที่เรียก "Edge" หมายถึงประมวลผลในเครือข่ายของท่าน (ไม่ใช่ Cloud) · ไม่ได้แปลว่าต้องอยู่ติดกล้อง</div>
                  </div>
                  <div>
                    <div style={{ color: C.accent, fontWeight: 600 }}>Q: ติดตั้งที่ไหน · ตู้กันน้ำได้ไหม?</div>
                    <div style={{ color: '#FFFFFFCC' }}>A: ส่วนใหญ่ตั้งใน rack ห้อง Server ของหน่วยงาน (อากาศเย็น · UPS พร้อม) · กรณีพิเศษ (กล้องอยู่ฟาร์ม/ป่า · network outdoor ไม่เสถียร) ใส่ตู้ IP65 outdoor ติดเสาได้</div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Tab switcher ────────────────────────────────────────────────────────────
function TabSwitcher() {
  const [active, setActive] = useState('approachA');
  return (
    <div className="space-y-5">
      <div className="overflow-x-auto -mx-2 px-2">
        <div className="inline-flex p-1 rounded-xl gap-1 min-w-full md:min-w-0" style={{ background: C.surfaceSoft }}>
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className="text-[13px] font-medium px-4 py-2.5 rounded-lg transition-all whitespace-nowrap text-left"
              style={active === t.key
                ? { background: C.primary, color: '#FFF', boxShadow: `0 2px 8px ${C.primary}33` }
                : { background: 'transparent', color: C.textMuted, border: 'none' }}
            >
              <div className="font-semibold">{t.label}</div>
              <div className="text-[11px] mt-0.5" style={{ color: active === t.key ? '#FFFFFFAA' : C.textMuted }}>{t.sub}</div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {active === 'approachA' && <ApproachAPanel/>}
          {active === 'approachB' && <ApproachBPanel/>}
          {active === 'lpr' && <LPRPanel/>}
          {active === 'compare' && <ComparePanel/>}
          {active === 'coverage' && <CoveragePanel/>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function CCTVAI() {
  return (
    <div style={{ fontFamily: 'Sarabun, Tahoma, sans-serif', color: C.text, background: C.surface }}>
      {/* HERO — pain-first */}
      <Section bg="deep" id="hero">
        <div className="max-w-[1100px] mx-auto">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp}>
              <Eyebrow color={C.accent}>CCTV + AI · เอกสารแนวคิด</Eyebrow>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-semibold tracking-tight mb-5"
              style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: '#FFF', lineHeight: 1.25 }}
            >
              <span className="block">กล้อง + AI ที่หน่วยงานต้องการ</span>
              <span className="block">มี 2 แนวทางหลัก</span>
              <span className="block" style={{ color: C.accent }}>เลือกถูก ใช้งานได้จริง</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[17px] md:text-[19px] leading-relaxed max-w-3xl" style={{ color: '#FFFFFFCC' }}>
              ก่อนตัดสินใจซื้อ "ระบบเต็ม" ขอชวนเข้าใจหลักการ 2 แบบของการต่อกล้องกับ AI ที่มีในตลาด — เพื่อให้ท่านเลือกแบบที่เหมาะกับงาน · ความเร็วที่ต้องการ · และกล้องที่หน่วยงานมีอยู่
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-8">
              <Pill variant="accent">★ หลักการ A · แนะนำ · stable</Pill>
              <Pill variant="muted">หลักการ B · เคสเฉพาะ</Pill>
              <Pill variant="muted">ตัวอย่าง · LPR + Route Map</Pill>
              <Pill variant="muted">Coverage Estimator</Pill>
            </motion.div>
            <motion.div variants={fadeUp} className="flex gap-3 mt-8">
              <CTAButton primary onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}>เริ่มสำรวจ</CTAButton>
              <CTAButton onClick={() => document.getElementById('next')?.scrollIntoView({ behavior: 'smooth' })}>ขั้นถัดไป</CTAButton>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* WHY THIS MATTERS — ปัญหาจริงที่หน่วยงานเจอ */}
      <Section bg="cream">
        <div className="max-w-[1100px] mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp} className="max-w-2xl mb-10">
              <Eyebrow>ปัญหาจริงที่หน่วยงานเจอทุกวัน</Eyebrow>
              <h2 className="font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', color: C.primaryDeep }}>
                "มีกล้องเยอะ — แต่ยังตอบคำถามไม่ได้"
              </h2>
              <p className="text-[16px] leading-relaxed" style={{ color: C.textMuted }}>
                หน่วยงานลงทุนกล้องไปเยอะแล้ว · แต่เวลามีเหตุก็ยังต้องนั่ง replay ภาพย้อนหลังหลายชั่วโมง · กล้องคนละยี่ห้อต้องสลับ software คนละตัว · บางครั้งหาภาพไม่เจอเลย
                เป้าหมายของเราคือเปลี่ยนกล้องที่มีอยู่ให้ "ฉลาดขึ้น" — ไม่ต้องเปลี่ยนทั้งระบบ
              </p>
            </motion.div>

            {/* Pain points (3 cards) */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="rounded-2xl p-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderTop: `4px solid ${C.alert}` }}>
                <div className="text-[28px] mb-3">👀</div>
                <div className="text-[15px] font-semibold mb-2" style={{ color: C.alert }}>กล้องเยอะ ไม่มีคนดู</div>
                <p className="text-[13.5px] leading-relaxed" style={{ color: C.text }}>
                  ติดกล้องไว้หลายสิบจุด — แต่ไม่มีเจ้าหน้าที่นั่งจ้องตลอด 24 ชั่วโมง · เห็นแต่ "หลังเหตุ" · ไม่เคยจับสังเกตได้ทันที
                </p>
              </div>
              <div className="rounded-2xl p-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderTop: `4px solid ${C.alert}` }}>
                <div className="text-[28px] mb-3">⏱️</div>
                <div className="text-[15px] font-semibold mb-2" style={{ color: C.alert }}>Replay หาภาพ — เสียเวลาทั้งวัน</div>
                <p className="text-[13.5px] leading-relaxed" style={{ color: C.text }}>
                  เวลามีเหตุ ต้องไล่ดูทีละกล้อง ทีละช่วงเวลา · บางครั้งต้องใช้คน 2-3 คน นั่งดูครึ่งวัน — กว่าจะเจอภาพที่ต้องการ
                </p>
              </div>
              <div className="rounded-2xl p-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderTop: `4px solid ${C.alert}` }}>
                <div className="text-[28px] mb-3">🧩</div>
                <div className="text-[15px] font-semibold mb-2" style={{ color: C.alert }}>กล้องหลายยี่ห้อ · หลาย software</div>
                <p className="text-[13.5px] leading-relaxed" style={{ color: C.text }}>
                  Hikvision · Dahua · Bosch · ของเก่าจากผู้รับเหมาคนเดิม — แต่ละยี่ห้อใช้ app คนละตัว · ดูร่วมกันไม่ได้ · ค้นหาข้ามกล้องไม่ได้
                </p>
              </div>
            </motion.div>

            {/* Solution flow */}
            <motion.div variants={fadeUp} className="rounded-2xl p-6 md:p-8 mb-6" style={{ background: C.primaryDeep, color: '#FFF' }}>
              <Eyebrow color={C.accent}>ทางออกของเรา</Eyebrow>
              <h3 className="text-[20px] md:text-[24px] font-semibold mb-4" style={{ color: '#FFF', lineHeight: 1.35 }}>
                ใช้กล้องเดิมต่อ — เราเข้าถึง NVR / RTSP ได้ → AI ช่วยดู ช่วยค้น ช่วยแจ้งเตือน
              </h3>
              <p className="text-[14.5px] leading-relaxed" style={{ color: '#FFFFFFCC' }}>
                ถ้ากล้องเดิมยินยอมให้เราเข้าถึง NVR / RTSP ได้ — เราอ่านภาพมาวิเคราะห์ด้วย AI ได้ทันที ไม่ต้องเปลี่ยนกล้อง · ไม่ต้องเปลี่ยน software ของหน่วยงาน
                <br/><br/>
                ระบบของเราเป็น <strong style={{ color: C.accent }}>"ชั้น AI"</strong> ที่วางทับของเดิม — รวมทุกยี่ห้อมาดูได้ในจอเดียว · ค้นได้ข้ามกล้อง · แจ้งเตือนเมื่อเจอเหตุการณ์ที่กำหนด
              </p>
            </motion.div>

            {/* Application catalog */}
            <motion.div variants={fadeUp}>
              <div className="text-[14px] font-semibold mb-4 uppercase tracking-wider" style={{ color: C.primaryDeep, letterSpacing: '2px' }}>
                ตัวอย่าง Application ที่ใช้งานได้
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  { icon: '🚦', title: 'วินัยจราจร', desc: 'จดรถจอดผิดที่ · วิ่งย้อนศร · ฝ่าไฟแดง', tone: 'normal' },
                  { icon: '🅿️', title: 'เก็บค่าที่จอดรถ', desc: 'นับเวลาเข้า-ออก · คิดค่าจอดอัตโนมัติ', tone: 'normal' },
                  { icon: '🔢', title: 'LPR · ค้นทะเบียน', desc: 'พิมพ์ทะเบียน → ระบบบอกได้ว่ารถผ่านกล้องไหน', tone: 'normal' },
                  { icon: '👤', title: 'Face Recognition', desc: 'จดจำใบหน้าบุคคล · ค้นหาบุคคลข้ามกล้อง', tone: 'pdpa' },
                  { icon: '👴', title: 'ดูแลผู้สูงอายุ', desc: 'ตรวจจับการล้ม · ผู้สูงอายุออกนอกบริเวณ', tone: 'normal' },
                  { icon: '🚷', title: 'พื้นที่หวงห้าม', desc: 'แจ้งเตือนคนเข้าจุดอันตราย · นอกเวลา', tone: 'normal' },
                  { icon: '📦', title: 'นับ · จำแนก object', desc: 'นับคน · นับรถ · ตรวจขยะลักลอบทิ้ง', tone: 'normal' },
                  { icon: '🚛', title: 'Overheight / Overspeed', desc: 'รถบรรทุกเกินสูง · ตรวจความเร็ว', tone: 'normal' },
                ].map((a, i) => (
                  <div key={i} className="rounded-xl p-4 relative" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
                    {a.tone === 'pdpa' && (
                      <div className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: C.alertSoft, color: C.alert, letterSpacing: '0.5px' }}>
                        PDPA
                      </div>
                    )}
                    <div className="text-[24px] mb-2">{a.icon}</div>
                    <div className="text-[13px] font-semibold mb-1" style={{ color: C.primaryDeep }}>{a.title}</div>
                    <div className="text-[11.5px] leading-relaxed" style={{ color: C.textMuted }}>{a.desc}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-[11.5px] flex items-center gap-2" style={{ color: C.textMuted }}>
                <span className="inline-block px-1.5 py-0.5 rounded font-bold" style={{ background: C.alertSoft, color: C.alert, fontSize: '9px', letterSpacing: '0.5px' }}>PDPA</span>
                <span>= ต้องดำเนินการภายใต้ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล · ขอบเขต · นโยบาย · audit log ต้องชัดเจน</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* INTERACTIVE EXPLORE */}
      <Section bg="soft" id="explore">
        <div className="max-w-[1100px] mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp} className="max-w-2xl mb-8">
              <Eyebrow>สำรวจหลักการทั้ง 2 แบบ</Eyebrow>
              <h2 className="font-semibold leading-tight mb-3" style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', color: C.primaryDeep }}>
                คลิกแท็บเพื่อสลับมุมมอง
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ color: C.textMuted }}>
                แต่ละมุมเปิดให้ดูสถาปัตยกรรม · สิ่งที่ทำได้ · ข้อจำกัด · ข้อควรระวัง — มี Coverage Estimator + วิดีโอ LPR ให้ลองคลิกจริง
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <TabSwitcher/>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* NEXT STEP / CAUTIONS */}
      <Section bg="cream" id="next">
        <div className="max-w-[1100px] mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp} className="max-w-2xl mb-10">
              <Eyebrow>ข้อควรระวังร่วม · ขั้นถัดไป</Eyebrow>
              <h2 className="font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', color: C.primaryDeep }}>
                3 เรื่องต้องคิดก่อนเลือกแบบไหนก็ตาม
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="rounded-2xl p-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
                <div className="text-[28px] mb-2">🛡️</div>
                <div className="text-[15px] font-semibold mb-2" style={{ color: C.primaryDeep }}>PDPA / Computer Crime Act</div>
                <p className="text-[13.5px] leading-relaxed" style={{ color: C.textMuted }}>ข้อกำหนดในการเก็บภาพ · ระยะเวลา · การเข้าถึง · ป้ายแจ้งเตือนการบันทึกภาพในที่สาธารณะ</p>
              </div>
              <div className="rounded-2xl p-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
                <div className="text-[28px] mb-2">🔌</div>
                <div className="text-[15px] font-semibold mb-2" style={{ color: C.primaryDeep }}>โครงสร้างพื้นฐาน</div>
                <p className="text-[13.5px] leading-relaxed" style={{ color: C.textMuted }}>ไฟฟ้า · เครือข่าย · ห้อง Server (ถ้าเลือก A) · UPS · การบำรุงรักษาระยะยาว</p>
              </div>
              <div className="rounded-2xl p-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
                <div className="text-[28px] mb-2">🔄</div>
                <div className="text-[15px] font-semibold mb-2" style={{ color: C.primaryDeep }}>การอัปเดต AI</div>
                <p className="text-[13.5px] leading-relaxed" style={{ color: C.textMuted }}>AI ไม่ได้ตั้งครั้งเดียวจบ · ต้องวางแผน retrain เมื่อ pain หรือสภาพแวดล้อมเปลี่ยน</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-2xl p-6 md:p-8" style={{ background: C.primaryDeep, color: '#FFF' }}>
              <Eyebrow color={C.accent}>คำแนะนำของเรา</Eyebrow>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="text-[16px] font-semibold mb-2" style={{ color: '#FFF' }}>ขั้นที่ 1 · Pilot 2-3 จุด</div>
                  <p className="text-[13.5px] leading-relaxed" style={{ color: '#FFFFFFCC' }}>เลือก pain ที่ชัดที่สุด 1 เรื่อง + ติด 2-3 จุด · ใช้ <strong style={{ color: '#FFF' }}>แนวทาง A</strong> ก่อน เพราะ stable · พร้อมใช้งานจริง · ทดสอบ 60-90 วัน</p>
                </div>
                <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="text-[16px] font-semibold mb-2" style={{ color: '#FFF' }}>ขั้นที่ 2 · ขยายตามผล</div>
                  <p className="text-[13.5px] leading-relaxed" style={{ color: '#FFFFFFCC' }}>ถ้า pilot ได้ผล → เพิ่มจุดทีละจุด · ค่อยพิจารณาเสริม <strong style={{ color: '#FFF' }}>แนวทาง B</strong> เฉพาะจุด outdoor หรือพื้นที่ network ไม่เสถียร</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* CTA */}
      <Section bg="white">
        <div className="max-w-[700px] mx-auto text-center">
          <Eyebrow>เริ่มต้นวันนี้</Eyebrow>
          <h2 className="font-semibold leading-tight mb-5" style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: C.primaryDeep }}>
            อยากปรึกษาก่อนตัดสินใจ?
          </h2>
          <p className="text-[16px] leading-relaxed mb-8" style={{ color: C.textMuted }}>
            ทีมของเราเข้าไปคุยถึงหน่วยงานเพื่อประเมินกล้องเดิม · pain ที่อยากแก้ · และเสนอ scope ที่ตรงกับท่านโดยไม่มีข้อผูกพัน
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <CTAButton primary>นัดทีมเข้าหน่วยงาน</CTAButton>
            <CTAButton>ดาวน์โหลดเอกสารแนวคิด</CTAButton>
          </div>
        </div>
      </Section>
    </div>
  );
}
