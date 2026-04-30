import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// SmartStreetLight.jsx — Smart Street Light (IoT)
// Design: Civic Trust palette (Forest green + Cream + Amber) + Sarabun
// Pain-first: ช่างไฟ / หัวหน้ากองช่าง / ผู้บริหาร
// Sources: internal Spec Table v6 (NOT public — selected highlights only, no pricing/tier matrix)
// ---------------------------------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

// Civic Trust palette
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

// ── Pain Persona Cards ──────────────────────────────────────────────────────
const PERSONAS = [
  {
    role: 'ช่างไฟ',
    sub: 'Field Technician',
    icon: '🔧',
    pains: [
      'ขับรถตระเวนตรวจไฟทุกคืน — ไม่รู้ว่าดวงไหนเสียจนชาวบ้านโทรร้อง',
      'ซ่อมหลังเสีย ไม่ใช่ก่อน — ใช้เวลามากกว่าควร',
      'ไม่มีประวัติซ่อมต่อต้น ทำให้แก้ปัญหาซ้ำๆ',
    ],
    solutions: [
      'แผนที่สถานะ Real-time + แจ้งเตือนทันทีเมื่อไฟดับ',
      'AI Predictive — ทายล่วงหน้าก่อนเสีย ลด downtime ประมาณการ 60–70%',
      'QR Scan ที่ต้นไฟ → ดูประวัติซ่อมได้ทันทีบนมือถือ',
    ],
  },
  {
    role: 'หัวหน้ากองช่าง',
    sub: 'Maintenance Lead',
    icon: '👷',
    pains: [
      'ไม่มีรายงานสภา → ขอ budget ไม่ได้เพราะไม่มีตัวเลข',
      'ตอบคำถามนายกไม่ได้ว่า uptime เดือนนี้กี่ %',
      'จัดเส้นทางซ่อมไม่ได้เพราะไม่รู้ว่าต้นไหนสำคัญสุด',
    ],
    solutions: [
      'รายงานประจำเดือน Auto-export PDF/CSV — รายงานสภาได้เลย',
      'Dashboard Uptime · MTTR · จำนวน Alert ที่ค้าง — สรุปครบ',
      'Work Order + Auto Escalation ถ้าช่างไม่รับใน 15 นาที',
    ],
  },
  {
    role: 'นายก / ปลัด',
    sub: 'Executive',
    icon: '🏛️',
    pains: [
      'ค่าไฟเกินงบทุกปี — ไม่รู้จะตัดตรงไหน',
      'อยากยื่นประกวด TEA / Smart City / ESG แต่ไม่มีข้อมูล',
      'นโยบายลด Carbon ของรัฐ — ทำไม่ได้เพราะไม่มี baseline',
    ],
    solutions: [
      'ประหยัดพลังงาน 30–60% — เทียบ baseline ตามมาตรฐาน UNFCCC CDM',
      'รายงาน TEA / depa Smart Energy / Carbon Footprint — Auto-generate',
      'CO₂ ที่ลดได้ตามมาตรฐาน GHG Protocol Scope 2 — ยื่น ESG ได้',
    ],
  },
];

// ── Spec highlights (curated from PDF — no tier matrix, no pricing) ─────────
const HIGHLIGHTS = [
  {
    eyebrow: 'ฮาร์ดแวร์',
    title: 'โคม LED 155 lm/W',
    body: 'ผ่านการรับรอง IES LM-79 / LM-80 · ขาโคมปรับ 90° · IP66 ทนสภาพอากาศไทย · รับประกัน 5+ ปี',
    pill: 'Tested · LM-79',
  },
  {
    eyebrow: 'ระบบควบคุม',
    title: 'Adaptive Lighting AI',
    body: 'หรี่ไฟอัตโนมัติตามบริบทจริง — ประหยัดพลังงานสูงสุด 45–55% · ทำงานร่วมกับ Microwave / Camera / Ambient Sensor',
    pill: 'AI Optional',
  },
  {
    eyebrow: 'การติดตาม',
    title: 'Real-time Monitoring',
    body: 'รู้ทันทีเมื่อไฟดับ · แผนที่สถานะแต่ละต้น · Alert ผ่าน Telegram / Email / LINE OA',
    pill: 'Live',
  },
  {
    eyebrow: 'AI ทำนายก่อนเสีย',
    title: 'Predictive Maintenance',
    body: 'AI ทำนายไฟที่จะมีปัญหาใน 7 วันข้างหน้า — ลดค่าซ่อมฉุกเฉิน 30–40% · ลด downtime 60–70%',
    pill: 'Premium',
  },
  {
    eyebrow: 'รายงาน',
    title: 'TEA / depa / ESG ครบ',
    body: 'Auto-generate รายงานยื่นประกวด Thailand Energy Awards · Smart Energy KPI · Carbon Footprint (GHG Scope 2)',
    pill: 'Award-ready',
  },
  {
    eyebrow: 'มือถือ',
    title: 'Mobile App + QR Scan',
    body: 'ช่างสแกน QR ที่ต้นไฟ → ดูประวัติซ่อม · เปิด-ปิด · อนุมัติ Work Order · Push Notification ทันที',
    pill: 'iOS / Android',
  },
];

// ── Energy Saving Calculator ────────────────────────────────────────────────
function SavingsCalculator() {
  const [lampCount, setLampCount] = useState(500);
  const [hpsWatts] = useState(250); // baseline HPS 250W
  const [ledWatts] = useState(110); // efficient LED equivalent
  const [hours] = useState(11.5); // hours per night avg
  const [days] = useState(365);
  const [costPerKwh] = useState(4.0); // ประมาณการ ฿/kWh
  const [savingsPct, setSavingsPct] = useState(40); // baseline + adaptive

  const result = useMemo(() => {
    const kwhBefore = (lampCount * hpsWatts * hours * days) / 1000;
    const kwhAfter = kwhBefore * (1 - savingsPct / 100);
    const kwhSaved = kwhBefore - kwhAfter;
    const thbBefore = kwhBefore * costPerKwh;
    const thbAfter = kwhAfter * costPerKwh;
    const thbSaved = thbBefore - thbAfter;
    // EGAT factor 0.4999 kgCO₂/kWh
    const co2Saved = (kwhSaved * 0.4999) / 1000; // tonnes
    return {
      kwhBefore: Math.round(kwhBefore),
      kwhAfter: Math.round(kwhAfter),
      kwhSaved: Math.round(kwhSaved),
      thbBefore: Math.round(thbBefore),
      thbAfter: Math.round(thbAfter),
      thbSaved: Math.round(thbSaved),
      co2Saved: co2Saved.toFixed(1),
    };
  }, [lampCount, hpsWatts, ledWatts, hours, days, costPerKwh, savingsPct]);

  const fmt = (n) => n.toLocaleString('th-TH');

  return (
    <PanelChrome
      title="ROI Calculator · ประมาณการสำหรับหน่วยงานของท่าน"
      subtitle="คำนวณตาม UNFCCC CDM Methodology + EGAT 0.4999 kgCO₂/kWh"
      status="* ตัวเลขเป็นประมาณการ"
    >
      <div className="p-6 md:p-8">
        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[13px] font-medium" style={{ color: C.text }}>จำนวนต้นไฟในเขตของท่าน</span>
              <span className="text-[20px] font-semibold" style={{ color: C.primary }}>{fmt(lampCount)}</span>
            </div>
            <input
              type="range"
              min="100"
              max="3000"
              step="50"
              value={lampCount}
              onChange={(e) => setLampCount(parseInt(e.target.value))}
              className="w-full"
              style={{ accentColor: C.primary }}
            />
            <div className="flex justify-between text-[11px] mt-1" style={{ color: C.textMuted }}>
              <span>100 (อบต. เล็ก)</span>
              <span>1,500 (เทศบาลตำบล)</span>
              <span>3,000+ (เทศบาลนคร)</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[13px] font-medium" style={{ color: C.text }}>% ประหยัดที่คาดว่าจะได้</span>
              <span className="text-[20px] font-semibold" style={{ color: C.success }}>{savingsPct}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="60"
              step="5"
              value={savingsPct}
              onChange={(e) => setSavingsPct(parseInt(e.target.value))}
              className="w-full"
              style={{ accentColor: C.success }}
            />
            <div className="flex justify-between text-[11px] mt-1" style={{ color: C.textMuted }}>
              <span>30% (LED only)</span>
              <span>40% (Auto Dim)</span>
              <span>60% (Adaptive AI)</span>
            </div>
          </div>
        </div>

        {/* Before / After */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div className="rounded-xl p-5" style={{ background: C.alertSoft, border: `1px solid ${C.alert}33` }}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: C.alert }}>ก่อน — หลอด HPS เดิม (250W)</div>
            <div className="space-y-2 text-[13px]" style={{ color: C.text }}>
              <div className="flex justify-between"><span>การใช้ไฟ/ปี</span><span className="font-semibold">{fmt(result.kwhBefore)} kWh</span></div>
              <div className="flex justify-between"><span>ค่าไฟ/ปี</span><span className="font-semibold">{fmt(result.thbBefore)} ฿</span></div>
            </div>
          </div>

          <div className="rounded-xl p-5" style={{ background: C.successSoft, border: `1px solid ${C.success}33` }}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: '#3B6D11' }}>หลัง — Smart LED + Adaptive AI</div>
            <div className="space-y-2 text-[13px]" style={{ color: C.text }}>
              <div className="flex justify-between"><span>การใช้ไฟ/ปี</span><span className="font-semibold" style={{ color: C.success }}>{fmt(result.kwhAfter)} kWh</span></div>
              <div className="flex justify-between"><span>ค่าไฟ/ปี</span><span className="font-semibold" style={{ color: C.success }}>{fmt(result.thbAfter)} ฿</span></div>
            </div>
          </div>
        </div>

        {/* Results highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          <div className="rounded-xl p-4 text-center" style={{ background: C.primary, color: '#FFF' }}>
            <div className="text-[11px] uppercase tracking-wider opacity-90 mb-1">ประหยัดต่อปี</div>
            <div className="text-[28px] font-semibold leading-tight">{fmt(result.thbSaved)} ฿</div>
          </div>
          <div className="rounded-xl p-4 text-center" style={{ background: C.successSoft, border: `1px solid ${C.success}33` }}>
            <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: '#3B6D11' }}>ลดการใช้ไฟ</div>
            <div className="text-[28px] font-semibold leading-tight" style={{ color: C.success }}>{fmt(result.kwhSaved)} kWh</div>
          </div>
          <div className="rounded-xl p-4 text-center" style={{ background: C.accentSoft, border: `1px solid ${C.accent}33` }}>
            <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: C.accent }}>CO₂ ที่ลดได้</div>
            <div className="text-[28px] font-semibold leading-tight" style={{ color: C.accent }}>{result.co2Saved} ตัน</div>
          </div>
        </div>

        <div className="rounded-lg p-3 text-[11px] leading-relaxed" style={{ background: C.surfaceSoft, color: C.textMuted }}>
          <strong style={{ color: C.text }}>หมายเหตุ:</strong> ตัวเลขเป็นประมาณการจาก HPS 250W baseline · 11.5 ชม./คืน · 365 วัน · ราคาประมาณการ 4 ฿/kWh · EGAT factor 0.4999 kgCO₂/kWh · ผลจริงขึ้นกับเส้นทาง / ค่าไฟท้องถิ่น / pattern การใช้งาน
        </div>
      </div>
    </PanelChrome>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────
export default function SmartStreetLight() {
  return (
    <div className="civic-scope" style={{ background: C.surface }}>

      {/* ════════════════════ HERO — Pain First ════════════════════ */}
      <section className="px-6 md:px-10 pt-16 pb-20 md:pt-24 md:pb-28" style={{ background: C.surface }}>
        <motion.div className="max-w-[1100px] mx-auto" initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fadeUp}>
            <Eyebrow color={C.accent}>ปัญหาที่กองช่างเจอทุกคืน</Eyebrow>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-semibold leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', color: C.text }}
          >
            ไฟถนนดับ <span style={{ color: C.alert }}>ไม่มีใครรู้</span><br />
            ค่าไฟแพง <span style={{ color: C.alert }}>เกินงบทุกปี</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-[18px] md:text-[20px] leading-relaxed max-w-[780px] mb-8" style={{ color: C.textMuted }}>
            ช่างไฟต้องขับรถตระเวนตรวจทุกคืน — ซ่อมหลังเสีย ไม่ใช่ก่อนเสีย ผู้บริหารไม่มีรายงานยื่น TEA / Smart City / ESG เพราะ
            <strong style={{ color: C.text }}> ไม่มีข้อมูลตั้งต้น</strong>
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
            <Pill variant="alert">ซ่อมหลังเสีย</Pill>
            <Pill variant="muted">ค่าไฟเกินงบ</Pill>
            <Pill variant="muted">ขอ budget ยาก</Pill>
            <Pill variant="muted">ยื่น TEA / ESG ไม่ได้</Pill>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <CTAButton primary onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })}>
              ดูวิธีแก้
            </CTAButton>
            <CTAButton onClick={() => document.getElementById('roi')?.scrollIntoView({ behavior: 'smooth' })}>
              ลอง ROI Calculator
            </CTAButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════ STATS STRIP ════════════════════ */}
      <section className="px-6 md:px-10 py-12" style={{ background: '#FFF', borderTop: `1px solid ${C.surfaceSoft}`, borderBottom: `1px solid ${C.surfaceSoft}` }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="ประหยัดไฟ" value="30–60%" sub="LED + Adaptive AI vs HPS เดิม · UNFCCC CDM" accent={C.success} />
          <StatCard label="ลด Downtime" value="60–70%" sub="AI ทายก่อนเสีย ประมาณการ" accent={C.primary} />
          <StatCard label="ลดค่าซ่อมฉุกเฉิน" value="30–40%" sub="Predictive Maintenance ประมาณการ" accent={C.primary} />
          <StatCard label="โคม LED" value="155 lm/W" sub="IES LM-79 / LM-80 รับรองจริง" accent={C.accent} />
        </div>
      </section>

      {/* ════════════════════ PERSONA PAINS ════════════════════ */}
      <Section bg="cream">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>ปัญหาของแต่ละคน</Eyebrow>
            <h2 className="font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
              ระบบเดียว — แก้ปัญหา <span style={{ color: C.primary }}>3 บทบาท</span>
            </h2>
            <p className="max-w-[680px] mx-auto text-[16px] leading-relaxed" style={{ color: C.textMuted }}>
              ช่างไฟ · หัวหน้ากองช่าง · นายก/ปลัด — แต่ละคนเจอปัญหาคนละแบบ ระบบออกแบบให้ทุกบทบาทใช้งานได้จริง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PERSONAS.map((p, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[24px]"
                    style={{ background: C.surface }}>
                    {p.icon}
                  </div>
                  <div>
                    <div className="text-[16px] font-semibold" style={{ color: C.text }}>{p.role}</div>
                    <div className="text-[11px]" style={{ color: C.textMuted }}>{p.sub}</div>
                  </div>
                </div>

                <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: C.alert, letterSpacing: '1.5px' }}>เจอปัญหาเหล่านี้</div>
                <ul className="space-y-2 mb-4">
                  {p.pains.map((pain, j) => (
                    <li key={j} className="flex gap-2 text-[13px]" style={{ color: C.text }}>
                      <span style={{ color: C.alert }}>✕</span>
                      <span>{pain}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: C.success, letterSpacing: '1.5px' }}>เราช่วยอย่างนี้</div>
                <ul className="space-y-2">
                  {p.solutions.map((sol, j) => (
                    <li key={j} className="flex gap-2 text-[13px]" style={{ color: C.text }}>
                      <span style={{ color: C.success }}>✓</span>
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════ HIGHLIGHTS ════════════════════ */}
      <Section bg="white" id="solution">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>จุดเด่นของระบบ</Eyebrow>
            <h2 className="font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
              ฮาร์ดแวร์มาตรฐาน · ซอฟต์แวร์อัจฉริยะ · <span style={{ color: C.primary }}>รายงานยื่นประกวดได้</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} className="rounded-2xl p-6 flex flex-col"
                style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}>
                <div className="flex items-baseline justify-between mb-2">
                  <Eyebrow color={C.primary}>{h.eyebrow}</Eyebrow>
                  <Pill variant="muted">{h.pill}</Pill>
                </div>
                <h3 className="text-[20px] font-semibold mb-2" style={{ color: C.text }}>{h.title}</h3>
                <p className="text-[14px] leading-relaxed" style={{ color: C.textMuted }}>{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════ HOW IT WORKS ════════════════════ */}
      <Section bg="cream">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>สถาปัตยกรรมระบบ</Eyebrow>
            <h2 className="font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
              ทำงานอย่างไร — End-to-End
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { n: '01', title: 'Node LTE บนโคมไฟ', desc: 'แต่ละต้นมี Node LTE วัดค่า — สถานะ · กำลังไฟ · กระแส · แรงดัน · อุณหภูมิ Driver' },
              { n: '02', title: 'ส่งข้อมูลผ่าน LTE/4G', desc: 'ไม่ต้องเดิน LAN เพิ่ม — ใช้ SIM ของแต่ละต้น ส่งเข้า Cloud' },
              { n: '03', title: 'Cloud + AI ประมวลผล', desc: 'AI วิเคราะห์ pattern ทำนายการเสีย · ตรวจ anomaly · จำลอง dimming pattern' },
              { n: '04', title: 'ควบคุมอัตโนมัติ', desc: 'ส่งคำสั่งกลับโคม — ตั้งเวลา · หรี่ไฟ · ปรับ tag-based dimming · บูรณาการ Sensor (Optional)' },
              { n: '05', title: 'Dashboard + Mobile + Alerts', desc: 'ผู้ใช้ดูบน Web/Mobile · แจ้งเตือนผ่าน Telegram / Email / LINE OA · Auto-export รายงาน' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl p-5 flex gap-5 items-start"
                style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
                <div className="text-[28px] font-semibold leading-none" style={{ color: C.primary }}>{s.n}</div>
                <div>
                  <h3 className="text-[17px] font-semibold mb-1" style={{ color: C.text }}>{s.title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: C.textMuted }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════ REFERENCE PROJECT ════════════════════ */}
      <Section bg="white">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>ผลงานติดตั้งจริง</Eyebrow>
            <h2 className="font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
              เขตห้วยขวาง <span style={{ color: C.primary }}>กรุงเทพมหานคร</span>
            </h2>
            <p className="max-w-[680px] mx-auto text-[16px] leading-relaxed" style={{ color: C.textMuted }}>
              โคม LED รุ่นเดียวกันที่ติดตั้งบนถนนสาธารณะ พร้อม Node LTE ควบคุมผ่านระบบ Real-time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.surfaceSoft}` }}>
              <img src="images/smartlight/installation/IMG_5887.jpeg" alt="โคม LED — เขตห้วยขวาง" className="w-full object-cover" loading="lazy" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <img src="images/smartlight/installation/IMG_5052.jpeg" alt="ถนนกลางคืน" className="w-full h-full object-cover rounded-xl" loading="lazy" style={{ border: `1px solid ${C.surfaceSoft}` }} />
              <img src="images/smartlight/installation/IMG_5057.jpeg" alt="ถนนกลางคืน" className="w-full h-full object-cover rounded-xl" loading="lazy" style={{ border: `1px solid ${C.surfaceSoft}` }} />
              <img src="images/smartlight/installation/IMG_4929.jpeg" alt="โคม LED close-up" className="w-full h-full object-cover rounded-xl" loading="lazy" style={{ border: `1px solid ${C.surfaceSoft}` }} />
              <img src="images/smartlight/installation/IMG_6032.jpeg" alt="ติดตั้งจริง" className="w-full h-full object-cover rounded-xl" loading="lazy" style={{ border: `1px solid ${C.surfaceSoft}` }} />
            </div>
          </div>

          <div className="rounded-xl p-5 flex flex-col md:flex-row gap-5 items-start" style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}>
            <div className="flex-1">
              <Eyebrow color={C.primary}>โครงการ กรุงเทพมหานคร</Eyebrow>
              <h3 className="text-[20px] font-semibold mb-2" style={{ color: C.text }}>เขตห้วยขวาง</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: C.textMuted }}>
                ติดตั้งโคม LED 155 lm/W บนถนนสาธารณะในเขตห้วยขวาง พร้อม Node LTE ทุกดวง รองรับการควบคุมและติดตามสถานะแบบ Real-time
              </p>
            </div>
            <div className="flex gap-4 flex-shrink-0">
              {[
                { n: '155 lm/W', l: 'ประสิทธิภาพ' },
                { n: 'Node LTE', l: 'ทุกดวง' },
                { n: '24/7', l: 'Monitoring' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-[18px] font-semibold" style={{ color: C.primary }}>{s.n}</div>
                  <div className="text-[11px]" style={{ color: C.textMuted }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ════════════════════ ROI CALCULATOR ════════════════════ */}
      <Section bg="cream" id="roi">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <Eyebrow color={C.accent}>ROI · ลองคิดสำหรับหน่วยงานท่าน</Eyebrow>
            <h2 className="font-semibold leading-tight mb-3" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
              ปรับจำนวนต้นไฟ + % ประหยัด → <span style={{ color: C.primary }}>ดูตัวเลขจริง</span>
            </h2>
            <p className="max-w-[680px] mx-auto text-[16px] leading-relaxed" style={{ color: C.textMuted }}>
              คำนวณตามมาตรฐาน UNFCCC CDM Methodology + EGAT Carbon Factor — ตัวเลขที่ใช้ยื่น TEA / ESG ได้จริง
            </p>
          </div>
          <SavingsCalculator />
        </div>
      </Section>

      {/* ════════════════════ STANDARDS ════════════════════ */}
      <Section bg="white">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <Eyebrow>มาตรฐานที่อ้างอิง</Eyebrow>
            <h2 className="font-semibold leading-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
              รายงานทุกฉบับ <span style={{ color: C.primary }}>ยื่นได้ทันที</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'TEA', sub: 'Thailand Energy Awards', body: 'พพ. — ยื่นประกวดด้านพลังงาน' },
              { name: 'depa Smart City', sub: 'Smart Energy 1/7 มิติ', body: 'depa — ยื่นรับรอง Smart City' },
              { name: 'IPMVP', sub: 'Option A/B', body: 'มาตรฐานวัดผลประหยัดพลังงานสากล' },
              { name: 'GHG Protocol', sub: 'Scope 2', body: 'ใช้คำนวณ Carbon Footprint สำหรับ ESG' },
              { name: 'ISO 50001', sub: 'Energy Management', body: 'ระบบจัดการพลังงานสากล' },
              { name: 'UNFCCC CDM', sub: 'Methodology', body: 'Baseline + Monitoring ที่ยอมรับสากล' },
              { name: 'IEC 62386', sub: 'DALI Standard', body: 'มาตรฐานการควบคุมไฟ' },
              { name: 'IES LM-79/80', sub: 'LED Performance', body: 'ทดสอบประสิทธิภาพและอายุการใช้งาน' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl p-4" style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}>
                <div className="text-[15px] font-semibold mb-1" style={{ color: C.primary }}>{s.name}</div>
                <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: C.textMuted, letterSpacing: '1px' }}>{s.sub}</div>
                <div className="text-[12px] leading-relaxed" style={{ color: C.text }}>{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════ CONCERNS / FAQ ════════════════════ */}
      <Section bg="cream">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <Eyebrow>ข้อกังวลที่กองช่าง / ผู้บริหารมักยก</Eyebrow>
            <h2 className="font-semibold leading-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
              เรามีคำตอบให้ทุกข้อ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { q: '"ต้องเปลี่ยนโคมเดิมทั้งหมดไหม?"', a: 'ไม่จำเป็น — Node LTE ใส่ใน Socket NEMA มาตรฐาน เข้ากันได้กับโคมไฟส่วนใหญ่ที่มีอยู่ · เริ่มทดลองได้บางต้นก่อน' },
              { q: '"กองช่างไม่ถนัด IT"', a: 'Web Dashboard + Mobile App ออกแบบสำหรับช่างไฟ — สแกน QR ที่ต้นไฟ → ดูประวัติ + เปิด-ปิดได้ · ทีม support พูดไทย' },
              { q: '"ค่าไฟ Internet เพิ่มไหม?"', a: 'แต่ละต้นใช้ SIM 4G เป็นของตัวเอง — ปริมาณข้อมูลประมาณ 5-70 MB/ปี/ต้น · ค่า SIM แยกต่างหาก ไม่กระทบเครือข่ายของหน่วยงาน' },
              { q: '"ขอ budget สภายาก"', a: 'ใช้ ROI Calculator นี้เป็นตัวเลขเริ่มต้น · เราออก Baseline Comparison Report ตาม UNFCCC CDM ให้ — ใช้ยื่นสภาได้เลย' },
              { q: '"ของเสียแล้วหาช่างยาก"', a: 'เราดูแล + AI Predictive แจ้งเตือนล่วงหน้า · มี On-site Support และ Remote Diagnostic ลด downtime ประมาณการ 60-70%' },
              { q: '"กฎหมายไฟส่องสว่างเข้มไหม?"', a: 'ยื่นได้ตามมาตรฐานเทศบาล + IEC 62386 + IES LM-79/80 · มีรายงาน Compliance ออกให้พร้อมยื่นกรมพัฒนาพลังงานทดแทน (พพ.)' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-5" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
                <div className="text-[14px] font-semibold mb-2" style={{ color: C.text }}>{item.q}</div>
                <div className="text-[13px] leading-relaxed" style={{ color: C.textMuted }}>{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════ CTA ════════════════════ */}
      <Section bg="deep">
        <div className="max-w-[800px] mx-auto text-center">
          <Eyebrow color="#9FE1CB">ขั้นตอนต่อไป</Eyebrow>
          <h2 className="font-semibold leading-tight mb-5 text-white" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}>
            หน่วยงานของท่าน — ประหยัดได้เท่าไหร่ ?
          </h2>
          <p className="text-[17px] leading-relaxed mb-10 text-white/70">
            เราสำรวจให้ฟรี ภายใน 2 สัปดาห์ — เก็บ baseline 30 วันก่อนติดตั้ง · ออกแบบ ROI ตามขนาดของท่านจริง · ทั้ง อบต., เทศบาลตำบล, เทศบาลเมือง, เทศบาลนคร
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="rounded-2xl p-6 text-left" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#9FE1CB' }}>Basic · งบจำกัด</div>
              <div className="text-[20px] font-semibold text-white mb-1">ควบคุมได้</div>
              <div className="text-[12px] text-white/60 mb-3">+ ประหยัดเบื้องต้น</div>
              <div className="text-[12px] text-white/70 leading-relaxed">เปิด-ปิดพร้อมกัน + ตั้งเวลา + รายงานประจำวัน</div>
            </div>
            <div className="rounded-2xl p-6 text-left" style={{ background: 'rgba(255,255,255,0.10)', border: `2px solid ${C.primaryHover}` }}>
              <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#9FE1CB' }}>Standard · ⭐ แนะนำ</div>
              <div className="text-[20px] font-semibold text-white mb-1">รายงานสภา</div>
              <div className="text-[12px] text-white/60 mb-3">+ ขยายพื้นที่ + ยื่น TEA</div>
              <div className="text-[12px] text-white/70 leading-relaxed">+ Auto Dimming + Zone Control + Carbon Report + ESG</div>
            </div>
            <div className="rounded-2xl p-6 text-left" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#9FE1CB' }}>Premium · Smart City</div>
              <div className="text-[20px] font-semibold text-white mb-1">AI + ROI</div>
              <div className="text-[12px] text-white/60 mb-3">+ Mobile App + Predictive</div>
              <div className="text-[12px] text-white/70 leading-relaxed">+ Adaptive Lighting AI + Predictive Maint. + Smart City Award</div>
            </div>
          </div>

          <div className="text-[13px] text-white/50 mb-8 italic">
            * รายละเอียดและราคาขึ้นกับขนาด/ขอบเขต — คุยปากเปล่าเพื่อหาจุดที่เหมาะกับงบประมาณของท่าน
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="mailto:mcctua2@gmail.com?subject=ขอสำรวจ%20Smart%20Street%20Light&body=สนใจระบบไฟถนนอัจฉริยะสำหรับหน่วยงานของท่าน%20%0A%0Aชื่อหน่วยงาน:%20%0Aจำนวนต้นไฟโดยประมาณ:%20%0Aผู้ติดต่อ:%20%0Aเบอร์โทรศัพท์:%20"
              className="inline-block text-[15px] font-medium px-6 py-3 rounded-lg no-underline"
              style={{ background: C.primaryHover, color: '#FFF' }}
            >
              ขอสำรวจฟรี
            </a>
            <a
              href="mailto:mcctua2@gmail.com?subject=ขอใบเสนอราคา%20Smart%20Street%20Light"
              className="inline-block text-[15px] font-medium px-6 py-3 rounded-lg no-underline"
              style={{ background: 'transparent', color: '#FFF', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              ขอใบเสนอราคา
            </a>
          </div>

          <div className="mt-8 text-[12px] text-white/40 leading-relaxed">
            ตัวเลขประมาณการอ้างจาก: UNFCCC CDM Methodology · IPMVP Option A/B · ISO 50001 · GHG Protocol Scope 2 · TEA · depa Smart City · EGAT Carbon Factor (0.4999 kgCO₂/kWh) — เอกสารสเปคเต็มมอบให้ลูกค้าหลังคุยรายละเอียด
          </div>
        </div>
      </Section>

    </div>
  );
}
