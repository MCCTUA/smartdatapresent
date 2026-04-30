import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ---------------------------------------------------------------------------
// WasteCollectionFee.jsx — Product 1: ค่าธรรมเนียมเก็บขยะ (WASTE-FEE)
// Design: Civic Trust palette (Forest green #0F6E56 + Cream #FAF7EE + Amber #BA7517)
// Font: Sarabun
// Pain-first storytelling: pain → กฎหมาย → ตปท. → solution → ROI → CTA
// Hero anchor data: อบต.กุฏโง้ง (200K vs 3M = 15:1)
// Sources: see Products/WASTE-FEE/research/01-RESEARCH-BRIEF.md
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

// ---------------------------------------------------------------------------
// Reusable atoms
// ---------------------------------------------------------------------------

function Eyebrow({ color = C.primary, children }) {
  return (
    <p
      className="text-[12px] font-semibold uppercase mb-3"
      style={{ color, letterSpacing: '2.5px' }}
    >
      {children}
    </p>
  );
}

function Section({ children, bg = 'cream', id = '' }) {
  const bgMap = {
    cream: C.surface,
    soft: C.surfaceSoft,
    deep: C.primaryDeep,
    white: '#FFFFFF',
  };
  const isDeep = bg === 'deep';
  return (
    <section
      id={id}
      className="px-6 md:px-10 py-20 md:py-24"
      style={{ background: bgMap[bg], color: isDeep ? '#FFF' : C.text }}
    >
      {children}
    </section>
  );
}

function StatCard({ label, value, sub, accent = C.primary }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}
    >
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
    <span
      className="inline-flex items-center text-[12px] font-medium px-3 py-1 rounded-full"
      style={{ background: v.bg, color: v.color, border: v.border || 'none' }}
    >
      {children}
    </span>
  );
}

function CTAButton({ children, primary = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-[15px] font-medium px-6 py-3 rounded-lg cursor-pointer transition-all"
      style={
        primary
          ? { background: C.primary, color: '#FFF', border: 'none' }
          : { background: 'transparent', color: C.primary, border: `1px solid ${C.primary}` }
      }
      onMouseEnter={(e) => {
        if (primary) e.currentTarget.style.background = C.primaryHover;
        else e.currentTarget.style.background = C.primary, (e.currentTarget.style.color = '#FFF');
      }}
      onMouseLeave={(e) => {
        if (primary) e.currentTarget.style.background = C.primary;
        else e.currentTarget.style.background = 'transparent', (e.currentTarget.style.color = C.primary);
      }}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Persona prototype panels (4 panels — switchable)
// ---------------------------------------------------------------------------

const PERSONAS = [
  { key: 'mayor', label: 'ผู้บริหาร', sub: 'Mayor Dashboard' },
  { key: 'resident', label: 'ประชาชน', sub: 'LINE Mini App' },
  { key: 'driver', label: 'เจ้าหน้าที่', sub: 'Field App' },
  { key: 'roi', label: 'ROI Calculator', sub: 'ดูผลลัพธ์' },
];

function MayorPanel() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
      {/* Window chrome — neutral, ไม่ใช่ Mac dots */}
      <div
        className="px-5 py-3 flex items-center gap-3 text-[12px]"
        style={{ background: C.surfaceSoft, color: C.textMuted, borderBottom: `1px solid ${C.surfaceSoft}` }}
      >
        <span className="font-medium">แผงควบคุมผู้บริหาร</span>
        <span style={{ color: C.textMuted }}>·</span>
        <span>เทศบาลตำบลสาธิต</span>
        <span className="ml-auto" style={{ color: C.success }}>● Real-time</span>
      </div>

      <div className="p-6 md:p-8">
        {/* Top KPIs */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl p-4" style={{ background: C.surface }}>
            <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: C.textMuted }}>รายได้ค่าธรรมเนียม</div>
            <div className="text-[24px] font-semibold leading-tight" style={{ color: C.primary }}>1,080,000 ฿</div>
            <div className="text-[11px] mt-1" style={{ color: C.success }}>↑ +50% จากเดิม 720,000</div>
          </div>
          <div className="rounded-xl p-4" style={{ background: C.surface }}>
            <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: C.textMuted }}>ต้นทุนกำจัด</div>
            <div className="text-[24px] font-semibold leading-tight" style={{ color: C.accent }}>6,500,000 ฿</div>
            <div className="text-[11px] mt-1" style={{ color: C.success }}>↓ −35% จากเดิม 10M</div>
          </div>
          <div className="rounded-xl p-4" style={{ background: C.surface }}>
            <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: C.textMuted }}>Coverage Ratio</div>
            <div className="text-[24px] font-semibold leading-tight" style={{ color: C.primary }}>16.6%</div>
            <div className="text-[11px] mt-1" style={{ color: C.success }}>↑ จาก 7% (กทม. baseline)</div>
          </div>
        </div>

        {/* 3-tier breakdown */}
        <div className="text-[13px] font-medium mb-3" style={{ color: C.text }}>การกระจายของครัวเรือน — 3 Tier</div>
        <div className="rounded-xl overflow-hidden mb-6" style={{ border: `1px solid ${C.surfaceSoft}` }}>
          <div className="flex h-10">
            <div className="flex items-center justify-center text-[12px] font-medium text-white" style={{ background: C.alert, width: '20%' }}>20% · 60฿ ไม่แยก</div>
            <div className="flex items-center justify-center text-[12px] font-medium text-white" style={{ background: C.accent, width: '50%' }}>50% · 20฿ คัดแยก verified</div>
            <div className="flex items-center justify-center text-[12px] font-medium text-white" style={{ background: C.success, width: '30%' }}>30% · 10฿ ขายรีไซเคิล</div>
          </div>
          <div className="flex text-[11px] py-2 px-3" style={{ background: '#FFF', color: C.textMuted }}>
            <span style={{ width: '20%' }}>600 ครัวเรือน</span>
            <span style={{ width: '50%' }}>1,500 ครัวเรือน</span>
            <span style={{ width: '30%' }}>900 ครัวเรือน</span>
          </div>
        </div>

        {/* Sampling cycle */}
        <div className="rounded-xl p-4" style={{ background: C.successSoft, border: `1px solid ${C.success}33` }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: '#3B6D11' }}>รอบสุ่มประเมิน</span>
            <Pill variant="success">รอบที่ 2/4 ปี 2569</Pill>
          </div>
          <div className="text-[13px]" style={{ color: C.text }}>
            ระบบสุ่ม <strong>33%</strong> ของครัวเรือนที่ลงทะเบียน — รอบนี้ <strong>800 หลัง</strong> · ทุกบ้านจะถูกสุ่มเฉลี่ย <strong>1 ครั้ง/ปี (±1)</strong> ตาม Stratified random algorithm
          </div>
        </div>
      </div>
    </div>
  );
}

function ResidentPanel() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
      <div
        className="px-5 py-3 flex items-center gap-3 text-[12px]"
        style={{ background: C.surfaceSoft, color: C.textMuted, borderBottom: `1px solid ${C.surfaceSoft}` }}
      >
        <span className="font-medium">LINE Mini App สำหรับประชาชน</span>
        <span style={{ color: C.textMuted }}>·</span>
        <span>คุณสมศรี · เลขที่ 89/1</span>
      </div>

      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
        {/* Phone mockup */}
        <div className="mx-auto md:mx-0" style={{ width: 240 }}>
          <div className="rounded-[28px] p-2" style={{ background: '#1F2A24' }}>
            <div className="rounded-[22px] overflow-hidden" style={{ background: '#FFF' }}>
              {/* Phone status */}
              <div className="px-4 py-2 flex justify-between text-[10px]" style={{ background: '#06C755', color: '#FFF' }}>
                <span>LINE</span>
                <span>14:32</span>
              </div>
              {/* App content */}
              <div className="p-4">
                <div className="text-[10px] mb-1" style={{ color: C.textMuted }}>ค่าธรรมเนียมขยะ · เม.ย. 2569</div>
                <div className="rounded-xl p-3 mb-3" style={{ background: C.successSoft }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-semibold uppercase" style={{ color: '#3B6D11' }}>คัดแยก verified</span>
                    <Pill variant="success">10 ฿</Pill>
                  </div>
                  <div className="text-[11px]" style={{ color: C.text }}>คุณคัดแยกขยะสม่ำเสมอ · ขายรีไซเคิลได้ 145 ฿ เดือนนี้</div>
                </div>

                <div className="text-[11px] mb-2" style={{ color: C.textMuted }}>ใบแจ้งหนี้</div>
                <div className="rounded-lg p-3 mb-3" style={{ border: `1px solid ${C.surfaceSoft}` }}>
                  <div className="flex justify-between text-[12px] mb-1" style={{ color: C.text }}>
                    <span>ค่าเก็บขยะ</span>
                    <span className="font-medium">10.00 ฿</span>
                  </div>
                  <div className="flex justify-between text-[12px] mb-1" style={{ color: C.text }}>
                    <span>ส่วนแบ่งรีไซเคิล</span>
                    <span className="font-medium" style={{ color: C.success }}>−145.00 ฿</span>
                  </div>
                  <div className="border-t mt-2 pt-2 flex justify-between text-[13px] font-semibold" style={{ color: C.primary, borderColor: C.surfaceSoft }}>
                    <span>ยอดสุทธิ</span>
                    <span>+135.00 ฿ คืน</span>
                  </div>
                </div>

                <button
                  className="w-full text-[12px] font-medium py-2.5 rounded-lg"
                  style={{ background: C.primary, color: '#FFF', border: 'none' }}
                >
                  ชำระด้วย QR PromptPay
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right side info */}
        <div className="flex-1">
          <div className="text-[15px] font-semibold mb-3" style={{ color: C.text }}>ทำไมประชาชนใช้ระบบนี้?</div>
          <div className="space-y-3 text-[13px]" style={{ color: C.text }}>
            <div className="flex gap-3">
              <span style={{ color: C.success }}>✓</span>
              <span><strong className="font-semibold">เห็นบิลทันที</strong> — ไม่ต้องรอกระดาษ ไม่ต้องไปที่ทำการ</span>
            </div>
            <div className="flex gap-3">
              <span style={{ color: C.success }}>✓</span>
              <span><strong className="font-semibold">จ่ายผ่าน LINE</strong> — กดปุ่มเดียวแสดง QR PromptPay</span>
            </div>
            <div className="flex gap-3">
              <span style={{ color: C.success }}>✓</span>
              <span><strong className="font-semibold">คัดแยก = ประหยัด</strong> — ลดเหลือ 20 ฿ หรือ 10 ฿ + ส่วนแบ่งรีไซเคิล</span>
            </div>
            <div className="flex gap-3">
              <span style={{ color: C.success }}>✓</span>
              <span><strong className="font-semibold">ตรวจสอบเจ้าหน้าที่</strong> — สแกน QR บัตรเจ้าหน้าที่ก่อนชำระ ป้องกันมิจฉาชีพ</span>
            </div>
          </div>
          <div className="mt-5 rounded-lg p-3" style={{ background: C.accentSoft, border: `1px solid ${C.accent}33` }}>
            <div className="text-[11px] font-semibold uppercase mb-1" style={{ color: C.accent, letterSpacing: '1.5px' }}>หมายเหตุสำหรับผู้บริหาร</div>
            <div className="text-[12px]" style={{ color: C.text }}>กทม. มีคนลงทะเบียน 786,099 หลังใน 5 เดือน — แสดงว่าประชาชนเลือกถ้ามีแรงจูงใจจริง</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DriverPanel() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
      <div
        className="px-5 py-3 flex items-center gap-3 text-[12px]"
        style={{ background: C.surfaceSoft, color: C.textMuted, borderBottom: `1px solid ${C.surfaceSoft}` }}
      >
        <span className="font-medium">Driver App · Tablet ในรถเก็บขยะ</span>
        <span style={{ color: C.textMuted }}>·</span>
        <span>นายประยุทธ์ · รถ ขข-09</span>
        <span className="ml-auto" style={{ color: C.success }}>● GPS Active</span>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Map mockup */}
        <div>
          <div className="text-[12px] font-medium mb-2" style={{ color: C.text }}>เส้นทางวันนี้ — สาย 3 (ฝั่งตะวันออก)</div>
          <div
            className="rounded-xl relative overflow-hidden"
            style={{ background: C.surface, height: 320, border: `1px solid ${C.surfaceSoft}` }}
          >
            {/* SVG map simulation */}
            <svg width="100%" height="100%" viewBox="0 0 320 320" style={{ display: 'block' }}>
              {/* Road network */}
              <path d="M 30 50 Q 80 80 30 160 T 30 270" stroke={C.textMuted} strokeWidth="2" fill="none" strokeOpacity="0.3" />
              <path d="M 30 100 L 180 100 L 180 200 L 290 200" stroke={C.textMuted} strokeWidth="2" fill="none" strokeOpacity="0.3" />
              <path d="M 30 200 L 180 200" stroke={C.textMuted} strokeWidth="2" fill="none" strokeOpacity="0.3" />
              <path d="M 100 50 L 100 270" stroke={C.textMuted} strokeWidth="2" fill="none" strokeOpacity="0.3" />
              <path d="M 220 30 L 220 280" stroke={C.textMuted} strokeWidth="2" fill="none" strokeOpacity="0.3" />

              {/* House dots — color = sticker tier */}
              {[
                { x: 60, y: 100, c: C.success },
                { x: 60, y: 130, c: C.accent },
                { x: 60, y: 160, c: C.success },
                { x: 60, y: 190, c: C.alert },
                { x: 130, y: 100, c: C.accent },
                { x: 130, y: 130, c: C.success },
                { x: 130, y: 160, c: C.success },
                { x: 130, y: 190, c: C.accent },
                { x: 130, y: 220, c: C.alert },
                { x: 200, y: 100, c: C.success },
                { x: 200, y: 130, c: C.success },
                { x: 200, y: 160, c: C.accent },
                { x: 200, y: 190, c: C.alert },
                { x: 200, y: 220, c: C.success },
                { x: 250, y: 130, c: C.accent },
                { x: 250, y: 160, c: C.success },
                { x: 250, y: 190, c: C.success },
                { x: 250, y: 220, c: C.accent },
              ].map((h, i) => (
                <circle key={i} cx={h.x} cy={h.y} r="6" fill={h.c} stroke="#FFF" strokeWidth="1.5" />
              ))}

              {/* Truck position */}
              <circle cx="180" cy="160" r="12" fill={C.primary} stroke="#FFF" strokeWidth="2" />
              <text x="180" y="164" textAnchor="middle" fontSize="11" fill="#FFF" fontWeight="700">รถ</text>

              {/* Active sample badge */}
              <rect x="200" y="170" width="80" height="24" rx="12" fill={C.accent} />
              <text x="240" y="186" textAnchor="middle" fontSize="10" fill="#FFF" fontWeight="600">สุ่มถ่ายรูป</text>
            </svg>

            {/* Legend */}
            <div className="absolute bottom-2 left-2 right-2 flex gap-3 text-[10px] px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.92)' }}>
              <span className="flex items-center gap-1" style={{ color: C.text }}><span className="w-2 h-2 rounded-full" style={{ background: C.success }}></span>10฿</span>
              <span className="flex items-center gap-1" style={{ color: C.text }}><span className="w-2 h-2 rounded-full" style={{ background: C.accent }}></span>20฿</span>
              <span className="flex items-center gap-1" style={{ color: C.text }}><span className="w-2 h-2 rounded-full" style={{ background: C.alert }}></span>60฿</span>
              <span className="ml-auto" style={{ color: C.textMuted }}>18 บ้าน · 3 สุ่ม</span>
            </div>
          </div>
        </div>

        {/* Right: today's queue */}
        <div>
          <div className="text-[12px] font-medium mb-2" style={{ color: C.text }}>คิวงานวันนี้ — เก็บได้ 12 / 18 หลัง</div>
          <div className="space-y-2">
            {[
              { addr: '89/1 ม.3', tier: 'success', label: '10฿ คัดแยก', state: 'เก็บแล้ว · 13:45' },
              { addr: '89/3 ม.3', tier: 'accent', label: '20฿', state: 'สุ่ม · ถ่ายรูปแล้ว' },
              { addr: '90/2 ม.3', tier: 'alert', label: '60฿ ไม่แยก', state: 'ค้างชำระ · ข้าม' },
              { addr: '92/4 ม.3', tier: 'success', label: '10฿ คัดแยก', state: 'รอเก็บ' },
            ].map((row, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[11px] font-semibold text-white"
                  style={{ background: row.tier === 'success' ? C.success : row.tier === 'accent' ? C.accent : C.alert }}
                >
                  {row.label.split(' ')[0]}
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-medium" style={{ color: C.text }}>{row.addr}</div>
                  <div className="text-[11px]" style={{ color: C.textMuted }}>{row.state}</div>
                </div>
                {row.state.includes('แล้ว') && <span style={{ color: C.success, fontSize: 14 }}>✓</span>}
                {row.state.includes('ข้าม') && <span style={{ color: C.alert, fontSize: 14 }}>×</span>}
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg p-3" style={{ background: C.accentSoft, border: `1px solid ${C.accent}33` }}>
            <div className="text-[11px] font-semibold uppercase mb-1" style={{ color: C.accent, letterSpacing: '1.5px' }}>เหตุผลที่ทำงานเร็วขึ้น</div>
            <div className="text-[12px]" style={{ color: C.text }}>ถ่ายรูปแค่บ้านที่สุ่ม (33%) ไม่ใช่ทุกบ้าน → ลดเวลาถ่ายรูปประมาณการ −67%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ROICalculator() {
  const [households, setHouseholds] = useState(2000);

  // Pricing model — based on briefing §3.7 + §8 numbers
  const result = useMemo(() => {
    const tierA_pct = 0.20; // ไม่แยก
    const tierB_pct = 0.50; // คัดแยก
    const tierC_pct = 0.30; // ขายรีไซเคิล
    const months = 12;

    const beforeRevenue = households * 20 * months; // ของเดิม 20฿/เดือน
    const afterRevenue =
      households * tierA_pct * 60 * months +
      households * tierB_pct * 20 * months +
      households * tierC_pct * 10 * months;

    // Cost model — ประมาณการ 5 ฿/วัน/ครัวเรือน ก่อน · −35% หลัง
    const beforeCost = households * 5 * 365;
    const afterCost = beforeCost * 0.65;

    const beforeRatio = beforeRevenue / beforeCost;
    const afterRatio = afterRevenue / afterCost;

    return {
      beforeRevenue: Math.round(beforeRevenue),
      afterRevenue: Math.round(afterRevenue),
      revenueDelta: Math.round(((afterRevenue - beforeRevenue) / beforeRevenue) * 100),
      beforeCost: Math.round(beforeCost),
      afterCost: Math.round(afterCost),
      costDelta: Math.round(((afterCost - beforeCost) / beforeCost) * 100),
      beforeRatio: (beforeRatio * 100).toFixed(1),
      afterRatio: (afterRatio * 100).toFixed(1),
    };
  }, [households]);

  const fmt = (n) => n.toLocaleString('th-TH');

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
      <div
        className="px-5 py-3 flex items-center gap-3 text-[12px]"
        style={{ background: C.surfaceSoft, color: C.textMuted, borderBottom: `1px solid ${C.surfaceSoft}` }}
      >
        <span className="font-medium">ROI Calculator · ประมาณการสำหรับ อปท. ของท่าน</span>
        <span className="ml-auto" style={{ color: C.textMuted }}>* ตัวเลขเป็นประมาณการ</span>
      </div>

      <div className="p-6 md:p-8">
        {/* Slider */}
        <div className="mb-6">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-[13px] font-medium" style={{ color: C.text }}>จำนวนครัวเรือนใน อปท.</span>
            <span className="text-[24px] font-semibold" style={{ color: C.primary }}>{fmt(households)}</span>
          </div>
          <input
            type="range"
            min="500"
            max="6000"
            step="100"
            value={households}
            onChange={(e) => setHouseholds(parseInt(e.target.value))}
            className="w-full"
            style={{ accentColor: C.primary }}
          />
          <div className="flex justify-between text-[11px] mt-2" style={{ color: C.textMuted }}>
            <span>500 (อบต. เล็กมาก)</span>
            <span>2,000 (กุฏโง้ง)</span>
            <span>6,000 (เทศบาลใหญ่)</span>
          </div>
        </div>

        {/* Before / After comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* Before */}
          <div className="rounded-xl p-5" style={{ background: C.alertSoft, border: `1px solid ${C.alert}33` }}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: C.alert }}>ก่อน — ระบบเดิม</div>
            <div className="space-y-2 text-[13px]" style={{ color: C.text }}>
              <div className="flex justify-between">
                <span>รายได้/ปี</span>
                <span className="font-semibold">{fmt(result.beforeRevenue)} ฿</span>
              </div>
              <div className="flex justify-between">
                <span>ต้นทุน/ปี</span>
                <span className="font-semibold">{fmt(result.beforeCost)} ฿</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between" style={{ borderColor: `${C.alert}33` }}>
                <span className="font-semibold">Coverage</span>
                <span className="font-semibold" style={{ color: C.alert }}>{result.beforeRatio}%</span>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="rounded-xl p-5" style={{ background: C.successSoft, border: `1px solid ${C.success}33` }}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: '#3B6D11' }}>หลัง — Gismo 3-Tier</div>
            <div className="space-y-2 text-[13px]" style={{ color: C.text }}>
              <div className="flex justify-between">
                <span>รายได้/ปี</span>
                <span className="font-semibold" style={{ color: C.success }}>{fmt(result.afterRevenue)} ฿ ({result.revenueDelta > 0 ? '+' : ''}{result.revenueDelta}%)</span>
              </div>
              <div className="flex justify-between">
                <span>ต้นทุน/ปี</span>
                <span className="font-semibold" style={{ color: C.success }}>{fmt(result.afterCost)} ฿ ({result.costDelta}%)</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between" style={{ borderColor: `${C.success}33` }}>
                <span className="font-semibold">Coverage</span>
                <span className="font-semibold" style={{ color: '#3B6D11' }}>{result.afterRatio}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tier breakdown */}
        <div className="rounded-xl p-4" style={{ background: C.surface }}>
          <div className="text-[12px] font-medium mb-2" style={{ color: C.text }}>โครงสร้าง 3 Tier (สมมุติ 20% / 50% / 30%)</div>
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg p-3 text-center" style={{ background: '#FFF' }}>
              <div className="text-[11px]" style={{ color: C.alert }}>ไม่แยก · 60฿</div>
              <div className="text-[16px] font-semibold" style={{ color: C.text }}>{Math.round(households * 0.2)} หลัง</div>
            </div>
            <div className="flex-1 rounded-lg p-3 text-center" style={{ background: '#FFF' }}>
              <div className="text-[11px]" style={{ color: C.accent }}>คัดแยก · 20฿</div>
              <div className="text-[16px] font-semibold" style={{ color: C.text }}>{Math.round(households * 0.5)} หลัง</div>
            </div>
            <div className="flex-1 rounded-lg p-3 text-center" style={{ background: '#FFF' }}>
              <div className="text-[11px]" style={{ color: C.success }}>ขายรีไซเคิล · 10฿</div>
              <div className="text-[16px] font-semibold" style={{ color: C.text }}>{Math.round(households * 0.3)} หลัง</div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-lg p-3 text-[11px] leading-relaxed" style={{ background: C.surfaceSoft, color: C.textMuted }}>
          <strong style={{ color: C.text }}>หมายเหตุ:</strong> ตัวเลขเป็นประมาณการจาก Gismo MVP Briefing §3.7 + §8 — ผลจริงขึ้นกับการลงทะเบียนของประชาชน · ประสิทธิภาพการคัดแยก · ราคา recyclable rate ในตลาด · เปรียบเทียบ baseline 20 ฿/หลัง/เดือน
        </div>
      </div>
    </div>
  );
}

function PrototypePanels() {
  const [active, setActive] = useState('mayor');

  const renderPanel = () => {
    switch (active) {
      case 'mayor': return <MayorPanel />;
      case 'resident': return <ResidentPanel />;
      case 'driver': return <DriverPanel />;
      case 'roi': return <ROICalculator />;
      default: return <MayorPanel />;
    }
  };

  return (
    <div>
      {/* Persona switcher */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {PERSONAS.map((p) => (
          <button
            key={p.key}
            onClick={() => setActive(p.key)}
            className="text-[13px] font-medium px-5 py-2.5 rounded-full cursor-pointer transition-all"
            style={
              active === p.key
                ? { background: C.primary, color: '#FFF', border: 'none' }
                : { background: '#FFF', color: C.text, border: `1px solid ${C.surfaceSoft}` }
            }
          >
            {p.label}
            <span className="ml-2 text-[11px] opacity-70">{p.sub}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {renderPanel()}
        </motion.div>
      </AnimatePresence>

      <div className="text-center mt-4 text-[12px]" style={{ color: C.textMuted }}>
        <strong style={{ color: C.text }}>Speaker hint:</strong> ลองให้ผู้บริหารเลือก persona ที่ตรงกับงานของท่าน — เริ่มจาก "ผู้บริหาร" เพื่อแสดงผลรวม แล้วค่อยลงรายละเอียดประชาชน/เจ้าหน้าที่
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function WasteCollectionFee() {
  return (
    <div className="civic-scope" style={{ background: C.surface }}>

      {/* ════════════════════ HERO — Pain First ════════════════════ */}
      <section
        className="px-6 md:px-10 pt-16 pb-20 md:pt-24 md:pb-28"
        style={{ background: C.surface }}
      >
        <motion.div
          className="max-w-[1100px] mx-auto"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <Eyebrow color={C.accent}>ปัญหาประจำวันที่ท่านอาจไม่รู้ว่ามี</Eyebrow>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-semibold leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', color: C.text }}
          >
            เก็บค่าธรรมเนียม <span style={{ color: C.primary }}>200,000 ฿/ปี</span><br />
            แต่จ่ายค่าทิ้งขยะ <span style={{ color: C.alert }}>3,000,000 ฿/ปี</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-[18px] md:text-[20px] leading-relaxed max-w-[780px] mb-8" style={{ color: C.textMuted }}>
            อบต./เทศบาลส่วนใหญ่ในไทยขาดทุนกับการจัดการขยะแบบเงียบๆ
            ตัวเลขนี้มาจาก <strong style={{ color: C.text }}>อบต.กุฏโง้ง</strong> ชลบุรี (~2,000 ครัวเรือน) —
            <strong style={{ color: C.text }}> รายได้ : ต้นทุน = ประมาณการ 1 : 15</strong>
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
            <Pill variant="alert">15:1 · ขาดทุน 15 เท่า</Pill>
            <Pill variant="muted">~30-44% Collection rate (ประมาณการ)</Pill>
            <Pill variant="muted">เก็บเงินสด → หาย/ทุจริต</Pill>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <CTAButton primary onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })}>
              ดูวิธีแก้
            </CTAButton>
            <CTAButton onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
              ลอง Prototype
            </CTAButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════ STATS ════════════════════ */}
      <section className="px-6 md:px-10 py-12" style={{ background: '#FFF', borderTop: `1px solid ${C.surfaceSoft}`, borderBottom: `1px solid ${C.surfaceSoft}` }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="กทม. Coverage" value="7%" sub="รายได้ 500ลบ./ปี · ต้นทุน 7,000ลบ./ปี" accent={C.alert} />
          <StatCard label="BKK WASTE PAY" value="786,099" sub="ครัวเรือนลงทะเบียนใน 5 เดือน · ก.พ. 2569" accent={C.primary} />
          <StatCard label="ลำปาง" value="ใช้อัตราเดิม" sub="รอออกข้อบัญญัติใหม่ · เป็นโอกาสของ อปท. อื่น" accent={C.accent} />
          <StatCard label="กฎกระทรวง 2567" value="16 พ.ย. 69" sub="วันที่บังคับใช้ · เหลือ ~7 เดือน" accent={C.primary} />
        </div>
      </section>

      {/* ════════════════════ THE LAW ════════════════════ */}
      <Section bg="cream" id="law">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>กฎหมายที่เปิดทาง</Eyebrow>
            <h2 className="font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
              กฎกระทรวง 2567 — ให้ อปท. <span style={{ color: C.primary }}>ปรับขึ้นค่าธรรมเนียม</span> ได้
            </h2>
            <p className="max-w-[680px] mx-auto text-[16px] leading-relaxed" style={{ color: C.textMuted }}>
              เปิดทางให้ อปท. ขึ้นเพดานค่าธรรมเนียมเป็น 60 ฿/เดือน สำหรับครัวเรือนทั่วไป — และให้ "คัดแยก = จ่ายน้อยลง" เป็นแรงจูงใจที่เป็นทางการ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl p-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
              <Pill variant="alert">ไม่คัดแยก</Pill>
              <div className="text-[40px] font-semibold mt-3 mb-1" style={{ color: C.alert }}>60 ฿</div>
              <div className="text-[13px] mb-3" style={{ color: C.textMuted }}>ต่อเดือน · ค่า default</div>
              <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>
                เพดานตามกฎกระทรวง: ค่าเก็บขน 30 ฿ + ค่ากำจัด 30 ฿ — บังคับ 16 พ.ย. 2569
              </div>
            </div>

            <div className="rounded-2xl p-6" style={{ background: '#FFF', border: `2px solid ${C.accent}` }}>
              <Pill variant="accent">คัดแยก verified</Pill>
              <div className="text-[40px] font-semibold mt-3 mb-1" style={{ color: C.accent }}>20 ฿</div>
              <div className="text-[13px] mb-3" style={{ color: C.textMuted }}>ต่อเดือน · ตรงกับ กทม.</div>
              <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>
                ลงทะเบียน · ผ่านการสุ่มประเมิน 4 ประเภท (รีไซเคิล · อินทรีย์ · อันตราย · ทั่วไป) — กทม. precedent ตั้งแต่ 1 ต.ค. 2568
              </div>
            </div>

            <div className="rounded-2xl p-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
              <Pill variant="success">ขายรีไซเคิล</Pill>
              <div className="text-[40px] font-semibold mt-3 mb-1" style={{ color: C.success }}>10 ฿</div>
              <div className="text-[13px] mb-3" style={{ color: C.textMuted }}>+ revenue share</div>
              <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>
                ระดับสูงสุดของ Gismo — ครัวเรือนขายรีไซเคิลเข้าระบบ · ได้ส่วนแบ่งกลับ · เกินกว่า กทม. baseline
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl p-6" style={{ background: C.accentSoft, border: `1px solid ${C.accent}33` }}>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div>
                <div className="text-[12px] font-semibold uppercase mb-1" style={{ color: C.accent, letterSpacing: '1.5px' }}>นาฬิกานับถอยหลัง</div>
                <div className="text-[20px] font-semibold" style={{ color: C.text }}>เหลือ ~7 เดือนก่อนกฎหมายบังคับ</div>
              </div>
              <div className="md:ml-auto text-[13px] leading-relaxed" style={{ color: C.text }}>
                อปท. ที่ออกข้อบัญญัติก่อน — มีเวลาทดสอบระบบ · ขอ Smart City Award · ใช้เป็น showcase
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ════════════════════ INTERNATIONAL BENCHMARK ════════════════════ */}
      <Section bg="white">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>ตัวอย่างที่ทำสำเร็จแล้ว</Eyebrow>
            <h2 className="font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
              สิ่งที่ <span style={{ color: C.primary }}>เมืองอื่นทำได้</span> ท่านก็ทำได้
            </h2>
          </div>

          <div className="space-y-6">
            {/* Thailand precedent — นางแล */}
            <div className="rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6" style={{ background: C.successSoft, border: `1px solid ${C.success}33` }}>
              <div>
                <Pill variant="success">ไทย · ทำได้แล้ว</Pill>
                <div className="text-[20px] font-semibold mt-3" style={{ color: C.text }}>เทศบาลตำบลนางแล</div>
                <div className="text-[13px] mt-1" style={{ color: C.textMuted }}>เชียงราย · ~2,400 ครัวเรือน</div>
              </div>
              <div className="md:col-span-2">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider" style={{ color: C.textMuted }}>ปี 2553</div>
                    <div className="text-[28px] font-semibold" style={{ color: C.alert }}>12 ตัน/วัน</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider" style={{ color: C.textMuted }}>ปี 2564</div>
                    <div className="text-[28px] font-semibold" style={{ color: C.success }}>&lt;1 ตัน/วัน</div>
                  </div>
                </div>
                <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>
                  ใช้ระบบ "ธงเขียว" — ครัวเรือนคัดแยกได้ติดธงเขียว จ่าย ≤10 ฿/เดือน · ลดขยะส่งกำจัดสุทธิ <strong>−92%</strong> ภายใน 11 ปี · ขนาดใกล้เคียงกับ อปท. ทุ่งขวาง / หนองขยาด
                </div>
              </div>
            </div>

            {/* Singapore */}
            <div className="rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
              <div>
                <Pill variant="muted">สิงคโปร์</Pill>
                <div className="text-[20px] font-semibold mt-3" style={{ color: C.text }}>NEA · 3 PWC Model</div>
                <div className="text-[13px] mt-1" style={{ color: C.textMuted }}>5.6 ล้านคน · ตั้งแต่ ก.ค. 2024</div>
              </div>
              <div className="md:col-span-2">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider" style={{ color: C.textMuted }}>HDB จ่าย/เดือน</div>
                    <div className="text-[28px] font-semibold" style={{ color: C.primary }}>S$10.20</div>
                    <div className="text-[11px]" style={{ color: C.textMuted }}>≈ 260 ฿ · 4x ของ กทม.</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider" style={{ color: C.textMuted }}>Coverage rate</div>
                    <div className="text-[28px] font-semibold" style={{ color: C.success }}>~100%</div>
                    <div className="text-[11px]" style={{ color: C.textMuted }}>เก็บผ่าน utility bill</div>
                  </div>
                </div>
                <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>
                  เก็บค่าธรรมเนียมร่วมกับบิลน้ำ/ไฟ → ไม่มี leakage · 3 PWC แบ่ง 6 sectors ผ่านประมูล · "Sort It Out" campaign 2024
                </div>
              </div>
            </div>

            {/* Yokohama */}
            <div className="rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
              <div>
                <Pill variant="muted">ญี่ปุ่น</Pill>
                <div className="text-[20px] font-semibold mt-3" style={{ color: C.text }}>Yokohama · G30 Plan</div>
                <div className="text-[13px] mt-1" style={{ color: C.textMuted }}>3.7 ล้านคน · 2003-2013</div>
              </div>
              <div className="md:col-span-2">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider" style={{ color: C.textMuted }}>ลดขยะ</div>
                    <div className="text-[28px] font-semibold" style={{ color: C.success }}>−43%</div>
                    <div className="text-[11px]" style={{ color: C.textMuted }}>แม้ประชากรเพิ่ม +8%</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider" style={{ color: C.textMuted }}>Capex หลีกเลี่ยง</div>
                    <div className="text-[28px] font-semibold" style={{ color: C.primary }}>€900M</div>
                    <div className="text-[11px]" style={{ color: C.textMuted }}>ไม่ต้องสร้างเตาเผา 2 โรง</div>
                  </div>
                </div>
                <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>
                  ขยายการคัดแยกจาก 5 → 10 ประเภท · community engagement หนัก · ค่าเก็บขยะครัวเรือนปกติ = ฟรี (เก็บเฉพาะขยะใหญ่)
                </div>
              </div>
            </div>

            {/* Kamikatsu */}
            <div className="rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
              <div>
                <Pill variant="muted">ญี่ปุ่น · เมืองเล็ก</Pill>
                <div className="text-[20px] font-semibold mt-3" style={{ color: C.text }}>Kamikatsu · Zero Waste</div>
                <div className="text-[13px] mt-1" style={{ color: C.textMuted }}>1,400 คน · upper-bound case</div>
              </div>
              <div className="md:col-span-2">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider" style={{ color: C.textMuted }}>ลดปริมาณขยะ</div>
                    <div className="text-[28px] font-semibold" style={{ color: C.success }}>150 → 54 ตัน</div>
                    <div className="text-[11px]" style={{ color: C.textMuted }}>−65% · 20 ปี</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider" style={{ color: C.textMuted }}>Recycling rate</div>
                    <div className="text-[28px] font-semibold" style={{ color: C.success }}>81%</div>
                    <div className="text-[11px]" style={{ color: C.textMuted }}>เฉลี่ยญี่ปุ่น 20% · สหรัฐ 10%</div>
                  </div>
                </div>
                <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>
                  คัดแยก 45 ประเภท · ไม่มีรถเก็บขยะ — ประชาชนเอามาเองที่ Zero Waste Center · พิสูจน์ upper bound ของระบบคัดแยก
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ════════════════════ SOLUTION OVERVIEW ════════════════════ */}
      <Section bg="cream" id="solution">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>วิธีที่เราช่วยท่าน</Eyebrow>
            <h2 className="font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
              ระบบเดียว — <span style={{ color: C.primary }}>3-Tier</span> + Driver + Sticker + LIFF + Dashboard
            </h2>
            <p className="max-w-[680px] mx-auto text-[16px] leading-relaxed" style={{ color: C.textMuted }}>
              สิ่งที่ทำให้ Gismo ต่างจาก BKK WASTE PAY: เพิ่ม Tier 10 ฿ (ขายรีไซเคิล) · Stratified random sampling 33% · Driver tracking + Sticker color gate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: '3-Tier Pricing', sub: '60 / 20 / 10 ฿', desc: 'อิงเพดานกฎกระทรวง + กทม. precedent · เพิ่ม Tier 10 ฿ revenue share สำหรับครัวเรือนที่ขายรีไซเคิลเข้าระบบ' },
              { title: 'Stratified Random Sampling', sub: '33% / รอบ', desc: 'ทุกบ้านถูกสุ่มเฉลี่ย 1 ครั้ง/ปี (±1) — ประมาณการลด storage รูป −67% · พนง. ทำงานเร็วขึ้น 3 เท่า' },
              { title: 'Driver App + GPS', sub: 'Field tracking', desc: 'tablet ในรถเก็บขยะ · บันทึกเก็บได้/ข้าม/ไม่คัดแยก · รถจอด 1 ครั้ง เก็บ 2 ฝั่ง · BKK WASTE PAY ไม่มี' },
              { title: 'Sticker Color Gate', sub: 'Visual enforcement', desc: 'ครัวเรือนจ่าย → ติดสติ๊กเกอร์ตามสี Tier · ไม่จ่าย = ไม่มีสติ๊กเกอร์ = รถข้าม (configurable per อปท.)' },
              { title: 'LINE Mini App (LIFF)', sub: 'ประชาชน-facing', desc: 'ดูบิล/จ่าย/ร้องเรียน บน LINE ที่ทุกบ้านมี · QR PromptPay · ใบเสร็จดิจิทัล · ไม่ต้อง install แอปแยก' },
              { title: 'Mayor Dashboard', sub: 'Real-time KPI', desc: 'รายได้ vs ต้นทุน · 3-Tier breakdown · Coverage ratio · รถเก็บขยะ live map · Excel/PDF export ในคลิกเดียว' },
            ].map((m, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-[18px] font-semibold" style={{ color: C.text }}>{m.title}</h3>
                  <span className="text-[12px] font-medium" style={{ color: C.primary }}>{m.sub}</span>
                </div>
                <p className="text-[14px] leading-relaxed" style={{ color: C.textMuted }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════ INTERACTIVE PROTOTYPE ════════════════════ */}
      <Section bg="soft" id="demo">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <Eyebrow color={C.accent}>Live Prototype · ลองได้เลย</Eyebrow>
            <h2 className="font-semibold leading-tight mb-3" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
              เลือกมุมมอง — <span style={{ color: C.primary }}>4 persona</span> ที่ใช้งานจริง
            </h2>
            <p className="max-w-[680px] mx-auto text-[16px] leading-relaxed" style={{ color: C.textMuted }}>
              ระบบเดียวที่ทำงานจาก 4 มุมพร้อมกัน — ผู้บริหาร / ประชาชน / เจ้าหน้าที่ / ROI calculator (ปรับจำนวนครัวเรือนของท่านได้)
            </p>
          </div>

          <PrototypePanels />
        </div>
      </Section>

      {/* ════════════════════ CONCERNS / FAQ ════════════════════ */}
      <Section bg="white">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <Eyebrow>ข้อกังวลที่นายก/ปลัดมักยก</Eyebrow>
            <h2 className="font-semibold leading-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
              เรามีคำตอบให้ทุกข้อ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { q: '"ขึ้นราคาประชาชนจะโกรธ"', a: 'กทม. ขึ้น 20 → 60 ฿ ใน 5 เดือน มีคนลงทะเบียนลดเหลือ 20 ฿ เกือบ 800,000 หลัง — ประชาชนเลือกได้ + อยากประหยัด' },
              { q: '"อปท. เล็กไม่มีงบ 350K"', a: 'อบต.กุฏโง้งขาดทุนประมาณการ 3M/ปี — Gismo 350K คืนทุนปีแรกจากรายได้ที่เก็บได้เพิ่มขึ้น' },
              { q: '"ไม่มีพนักงาน IT"', a: 'Gismo เป็น SaaS — ไม่ต้อง install server · ทีม support พูดไทย · Tua + dealer ดูแลให้' },
              { q: '"ประชาชนไม่มี smartphone"', a: 'LIFF ใช้บน LINE ที่เกือบทุกบ้านมี · กลุ่มไม่มีมือถือ → เคาน์เตอร์ + counter receipt ปกติ' },
              { q: '"พนง.เก็บขยะถ่ายรูปทุกบ้านช้า"', a: 'Sampling 33% — ถ่ายแค่บ้านที่สุ่ม → ประมาณการทำงานเร็วขึ้น 3 เท่า · storage saving −67%' },
              { q: '"กฎหมายยังไม่บังคับ"', a: 'ใช่ — แต่ window 16 พ.ย. 2569 ใกล้แล้ว · early mover ได้เปรียบทั้ง award + showcase + เวลาทดสอบระบบ' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-5" style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}>
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
            อปท. ของท่าน — เก็บได้กี่ % ?
          </h2>
          <p className="text-[17px] leading-relaxed mb-10 text-white/70">
            เราสำรวจให้ฟรี ภายใน 2 สัปดาห์ — ดูว่าตัวเลขจริงของท่านห่างจาก 15:1 เท่าไหร่ · เริ่มที่ Package A 350,000 ฿ สำหรับ อปท. ≤1,500 ครัวเรือน
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="rounded-2xl p-6 text-left" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#9FE1CB' }}>Package A · Lite</div>
              <div className="text-[28px] font-semibold text-white mb-1">350K</div>
              <div className="text-[12px] text-white/60 mb-3">≤1,500 ครัวเรือน</div>
              <div className="text-[12px] text-white/70 leading-relaxed">Core + Sticker + Photo (ไม่มี LIFF)</div>
            </div>
            <div className="rounded-2xl p-6 text-left" style={{ background: 'rgba(255,255,255,0.10)', border: `2px solid ${C.primaryHover}` }}>
              <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#9FE1CB' }}>Package B · Standard ⭐</div>
              <div className="text-[28px] font-semibold text-white mb-1">500K</div>
              <div className="text-[12px] text-white/60 mb-3">1,500-4,000 ครัวเรือน</div>
              <div className="text-[12px] text-white/70 leading-relaxed">+ Sorting + Cost Dashboard + LIFF</div>
            </div>
            <div className="rounded-2xl p-6 text-left" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#9FE1CB' }}>Package B+ · Plus</div>
              <div className="text-[28px] font-semibold text-white mb-1">500K</div>
              <div className="text-[12px] text-white/60 mb-3">&gt;4,000 ครัวเรือน</div>
              <div className="text-[12px] text-white/70 leading-relaxed">+ Custom Reports + Year 2 path</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="mailto:mcctua2@gmail.com?subject=ขอสำรวจ%20อปท.%20ของท่าน&body=สนใจระบบ%20Gismo%20Waste-Fee%20สำหรับ%20อปท.%20ของท่าน"
              className="inline-block text-[15px] font-medium px-6 py-3 rounded-lg no-underline"
              style={{ background: C.primaryHover, color: '#FFF' }}
            >
              ขอสำรวจฟรี
            </a>
            <a
              href="mailto:mcctua2@gmail.com?subject=ขอนัด%20Demo%20Gismo"
              className="inline-block text-[15px] font-medium px-6 py-3 rounded-lg no-underline"
              style={{ background: 'transparent', color: '#FFF', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              นัด Demo
            </a>
          </div>

          <div className="mt-8 text-[12px] text-white/40 leading-relaxed">
            ตัวเลขประมาณการในหน้านี้อ้างจาก: Gismo MVP Briefing · กฎกระทรวง 2567 · BKK WASTE PAY (ก.พ. 2569) · เทศบาลตำบลนางแล (2553-2564) · NEA Singapore (ก.ค. 2024) · Yokohama G30 (2003-2013) · Kamikatsu Frontiers Review (2023) — ดูรายละเอียด source ใน Research Brief
          </div>
        </div>
      </Section>

    </div>
  );
}
