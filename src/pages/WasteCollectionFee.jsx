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
// Persona prototype panels (5 panels — switchable)
// Layout patterns adapted from utilitfeeapp design system (Apr 2569 handoff)
// — re-skinned in Civic Trust palette (Forest green + Cream + Sarabun)
// Design references: O-01 KPI Dashboard · R-08 Sticker · R-09 Schedule
//                    D-01 My Routes · D-02 Route Map · O-12 Sticker Issuance
// ---------------------------------------------------------------------------

const PERSONAS = [
  { key: 'mayor', label: 'ผู้บริหาร', sub: 'KPI Dashboard' },
  { key: 'resident', label: 'ประชาชน', sub: 'LINE Mini App' },
  { key: 'driver', label: 'เจ้าหน้าที่', sub: 'Driver App' },
  { key: 'sticker', label: 'ออกสติ๊กเกอร์', sub: 'Officer Portal' },
  { key: 'roi', label: 'ROI Calculator', sub: 'ดูผลลัพธ์' },
];

// Tier color tokens — used across multiple panels (sticker, map, dashboard)
const TIER_COLOR = {
  notSorted: { bg: C.alert, soft: C.alertSoft, label: '60฿ ไม่แยก' },
  sorted: { bg: C.accent, soft: C.accentSoft, label: '20฿ แยก' },
  recycled: { bg: C.success, soft: C.successSoft, label: '10฿ รีไซเคิล' },
};

// ───────────────────────────────────────────────────────────────────────────
// Panel 1 · Mayor — adapted from O-01 KPI Dashboard
// ───────────────────────────────────────────────────────────────────────────

function PanelChrome({ title, subtitle, status, children }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
      <div
        className="px-5 py-3 flex items-center gap-3 text-[12px]"
        style={{ background: '#FFF', color: C.textMuted, borderBottom: `1px solid ${C.surfaceSoft}` }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold"
          style={{ background: C.primary, color: '#FFF', letterSpacing: '0.5px' }}
        >
          อบต
        </div>
        <div>
          <div className="font-semibold" style={{ color: C.text, fontSize: '13px' }}>{title}</div>
          <div style={{ color: C.textMuted, fontSize: '11px' }}>{subtitle}</div>
        </div>
        {status && <span className="ml-auto flex items-center gap-1.5" style={{ color: C.success }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.success }}></span>
          {status}
        </span>}
      </div>
      {children}
    </div>
  );
}

function MayorPanel() {
  const [period, setPeriod] = useState('month');
  const periods = [
    { k: 'week', label: '7 วัน' },
    { k: 'month', label: 'เดือนนี้' },
    { k: 'quarter', label: 'ไตรมาส' },
    { k: 'year', label: 'ปีงบฯ 69' },
  ];

  return (
    <PanelChrome title="KPI Dashboard" subtitle="Officer Portal · ภาพรวมการจัดเก็บ" status="Real-time">
      <div className="p-6 md:p-8">
        {/* Period tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <div className="flex p-1 rounded-lg" style={{ background: C.surfaceSoft }}>
            {periods.map(p => (
              <button
                key={p.k}
                onClick={() => setPeriod(p.k)}
                className="text-[12px] font-medium px-3 py-1.5 rounded-md transition-colors"
                style={period === p.k
                  ? { background: '#FFF', color: C.text, boxShadow: `0 1px 3px ${C.primary}22` }
                  : { background: 'transparent', color: C.textMuted, border: 'none' }}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="ml-auto text-[12px] flex items-center gap-2" style={{ color: C.textMuted }}>
            <span>เทศบาลของท่าน · 3,000 ครัวเรือน</span>
          </div>
        </div>

        {/* Alert banner */}
        <div className="rounded-xl p-3 mb-5 flex items-start gap-3" style={{ background: C.accentSoft, border: `1px solid ${C.accent}33` }}>
          <span className="text-[16px] leading-none mt-0.5" style={{ color: C.accent }}>⚠</span>
          <div className="text-[13px] flex-1" style={{ color: C.text }}>
            อัตราการจัดเก็บเดือนนี้ <strong>78.4%</strong> — ต่ำกว่าเป้า 85% · ค้างชำระเพิ่ม +23 หลังจากสัปดาห์ที่แล้ว
            <a href="#" onClick={(e) => e.preventDefault()} className="ml-2 underline" style={{ color: C.accent }}>ดูรายการ →</a>
          </div>
        </div>

        {/* 4 KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {/* Revenue */}
          <div className="rounded-xl p-4" style={{ background: '#FFF', border: `1px solid ${C.successSoft}`, borderLeft: `3px solid ${C.success}` }}>
            <div className="text-[11px] uppercase tracking-wider mb-2" style={{ color: C.textMuted }}>ยอดรายได้เดือนนี้</div>
            <div className="text-[22px] font-semibold leading-tight" style={{ color: C.text }}>
              ฿485<span className="text-[16px]">,200</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-[11px]">
              <span style={{ color: C.success }}>↑ 12.3%</span>
              <span style={{ color: C.textMuted }}>จากเดือนก่อน</span>
            </div>
            <div className="text-[10px] mt-2 pt-2 border-t" style={{ color: C.textMuted, borderColor: C.surfaceSoft }}>
              เป้าหมายปี: ฿5.8M · สะสม 55.4%
            </div>
          </div>

          {/* Collection rate */}
          <div className="rounded-xl p-4" style={{ background: '#FFF', border: `1px solid ${C.accentSoft}`, borderLeft: `3px solid ${C.accent}` }}>
            <div className="text-[11px] uppercase tracking-wider mb-2" style={{ color: C.textMuted }}>อัตราการจัดเก็บ</div>
            <div className="text-[22px] font-semibold leading-tight" style={{ color: C.text }}>
              78.4<span className="text-[16px]">%</span>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-[9px] mb-1" style={{ color: C.textMuted }}>
                <span>0%</span>
                <span style={{ color: C.accent }}>เป้า 85%</span>
                <span>100%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.surfaceSoft }}>
                <div className="h-full" style={{ width: '78.4%', background: C.accent }}></div>
              </div>
            </div>
            <div className="text-[10px] mt-2" style={{ color: C.textMuted }}>↓ 2.1% · ก่อน 80.5%</div>
          </div>

          {/* Overdue bills */}
          <div className="rounded-xl p-4" style={{ background: '#FFF', border: `1px solid ${C.alertSoft}`, borderLeft: `3px solid ${C.alert}` }}>
            <div className="text-[11px] uppercase tracking-wider mb-2" style={{ color: C.textMuted }}>บิลค้างชำระ</div>
            <div className="text-[22px] font-semibold leading-tight" style={{ color: C.text }}>
              342<span className="text-[14px] font-normal" style={{ color: C.textMuted }}> ใบ</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-[11px]">
              <span style={{ color: C.alert }}>↑ 23 ใบ</span>
              <span style={{ color: C.textMuted }}>สัปดาห์ก่อน</span>
            </div>
            <div className="text-[10px] mt-2 pt-2 border-t" style={{ color: C.textMuted, borderColor: C.surfaceSoft }}>
              เกิน 90 วัน: <strong style={{ color: C.alert }}>48 ใบ</strong>
            </div>
          </div>

          {/* Total arrears */}
          <div className="rounded-xl p-4" style={{ background: '#FFF', border: `1px solid ${C.alertSoft}`, borderLeft: `3px solid ${C.alert}` }}>
            <div className="text-[11px] uppercase tracking-wider mb-2" style={{ color: C.textMuted }}>ยอดค้างรวม</div>
            <div className="text-[22px] font-semibold leading-tight" style={{ color: C.text }}>
              ฿1.28<span className="text-[16px]">M</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-[11px]">
              <span style={{ color: C.alert }}>↑ ฿84,200</span>
              <span style={{ color: C.textMuted }}>เดือนก่อน</span>
            </div>
            <div className="text-[10px] mt-2 pt-2 border-t" style={{ color: C.textMuted, borderColor: C.surfaceSoft }}>
              342 ครัวเรือน · เฉลี่ย ฿3,747/หลัง
            </div>
          </div>
        </div>

        {/* 3-tier breakdown bar */}
        <div className="mb-5">
          <div className="flex items-baseline justify-between mb-2">
            <div className="text-[13px] font-semibold" style={{ color: C.text }}>การกระจายของครัวเรือน — 3 Tier</div>
            <div className="text-[11px]" style={{ color: C.textMuted }}>3,000 หลัง</div>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.surfaceSoft}` }}>
            <div className="flex h-10">
              <div className="flex items-center justify-center text-[11px] font-medium text-white" style={{ background: TIER_COLOR.notSorted.bg, width: '20%' }}>20% · {TIER_COLOR.notSorted.label}</div>
              <div className="flex items-center justify-center text-[11px] font-medium text-white" style={{ background: TIER_COLOR.sorted.bg, width: '50%' }}>50% · {TIER_COLOR.sorted.label}</div>
              <div className="flex items-center justify-center text-[11px] font-medium text-white" style={{ background: TIER_COLOR.recycled.bg, width: '30%' }}>30% · {TIER_COLOR.recycled.label}</div>
            </div>
            <div className="flex text-[11px] py-2 px-3" style={{ background: '#FFF', color: C.textMuted }}>
              <span style={{ width: '20%' }}>600 หลัง</span>
              <span style={{ width: '50%' }}>1,500 หลัง</span>
              <span style={{ width: '30%' }}>900 หลัง</span>
            </div>
          </div>
        </div>

        {/* Secondary stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          <div className="flex items-center gap-3 rounded-lg p-3" style={{ background: C.surface }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[16px]" style={{ background: C.alertSoft, color: C.alert }}>⚠</div>
            <div className="flex-1">
              <div className="text-[11px]" style={{ color: C.textMuted }}>บ้านที่ถูกข้าม (ไม่จ่าย)</div>
              <div className="text-[16px] font-semibold" style={{ color: C.alert }}>87 หลัง</div>
              <div className="text-[10px]" style={{ color: C.textMuted }}>เดือนก่อน 64 · <span style={{ color: C.alert }}>+35.9%</span></div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg p-3" style={{ background: C.surface }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[16px]" style={{ background: C.successSoft, color: C.success }}>✓</div>
            <div className="flex-1">
              <div className="text-[11px]" style={{ color: C.textMuted }}>คัดแยกขยะถูกต้อง</div>
              <div className="text-[16px] font-semibold" style={{ color: C.success }}>61.2%</div>
              <div className="text-[10px]" style={{ color: C.textMuted }}>1,847 / 3,016 · <span style={{ color: C.success }}>↑ 4.1%</span></div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg p-3" style={{ background: C.surface }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[16px]" style={{ background: '#E6F1FB', color: '#185FA5' }}>🚛</div>
            <div className="flex-1">
              <div className="text-[11px]" style={{ color: C.textMuted }}>เที่ยวเก็บขยะเดือนนี้</div>
              <div className="text-[16px] font-semibold" style={{ color: C.text }}>68 เที่ยว</div>
              <div className="text-[10px]" style={{ color: C.textMuted }}>4,082 หลัง/เที่ยว เฉลี่ย</div>
            </div>
          </div>
        </div>

        {/* Sampling cycle banner */}
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
    </PanelChrome>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// Panel 2 · Resident — adapted from R-08 Sticker Status + R-09 Collection Schedule
// ───────────────────────────────────────────────────────────────────────────

function StickerGraphic({ size = 160, color = C.success, year = '2568' }) {
  // Adapted from R-08 — circular sticker with year + tier
  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <div
        style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: color,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 8px 24px ${color}55, inset 0 -4px 12px rgba(0,0,0,0.08)`,
        }}
      >
        <div style={{ fontSize: size * 0.08, color: '#FFF', opacity: 0.9, letterSpacing: '2px', fontWeight: 600, textTransform: 'uppercase' }}>
          ปีงบฯ
        </div>
        <div style={{ fontSize: size * 0.30, color: '#FFF', fontWeight: 800, letterSpacing: '1px', lineHeight: 1, marginTop: 2 }}>
          {year}
        </div>
        <div style={{ fontSize: size * 0.08, color: '#FFF', opacity: 0.85, marginTop: 6, letterSpacing: '1px' }}>
          ✓ คัดแยก
        </div>
      </div>
    </div>
  );
}

function ResidentPanel() {
  const [tab, setTab] = useState('sticker');

  // R-09 mock — next 4 collection days
  const nextCollections = [
    { day: 'จ.', date: '5 พ.ค.', isNext: true },
    { day: 'พ.', date: '7 พ.ค.', isNext: false },
    { day: 'ศ.', date: '9 พ.ค.', isNext: false },
    { day: 'จ.', date: '12 พ.ค.', isNext: false },
  ];

  return (
    <PanelChrome title="LINE Mini App" subtitle="ประชาชน · คุณสมศรี · 89/1 ม.3" status="online">
      <div className="p-5 md:p-7 flex flex-col md:flex-row gap-5">
        {/* Phone frame — R-08 style */}
        <div className="mx-auto md:mx-0 flex-shrink-0" style={{ width: 260 }}>
          <div className="rounded-[28px] p-1.5" style={{ background: '#1F2A24' }}>
            <div className="rounded-[22px] overflow-hidden" style={{ background: '#FFF' }}>
              {/* Status bar */}
              <div className="px-3.5 py-1.5 flex justify-between text-[9px] font-medium" style={{ background: '#06C755', color: '#FFF' }}>
                <span>LINE</span>
                <span>14:32</span>
              </div>

              {/* Tab switcher inside phone */}
              <div className="flex border-b" style={{ borderColor: C.surfaceSoft }}>
                {[
                  { k: 'sticker', label: 'สติ๊กเกอร์' },
                  { k: 'schedule', label: 'ตารางเก็บขยะ' },
                ].map(t => (
                  <button
                    key={t.k}
                    onClick={() => setTab(t.k)}
                    className="flex-1 text-[11px] font-medium py-2.5"
                    style={tab === t.k
                      ? { background: '#FFF', color: C.primary, borderBottom: `2px solid ${C.primary}`, marginBottom: '-1px' }
                      : { background: '#FFF', color: C.textMuted, border: 'none' }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* R-08 — Sticker view */}
              {tab === 'sticker' && (
                <div className="p-4 pb-5">
                  <div className="text-center mb-3">
                    <Pill variant="success">✓ ได้รับสติ๊กเกอร์แล้ว</Pill>
                  </div>
                  <StickerGraphic size={140} color={C.success} year="2568" />
                  <div className="text-center mt-3">
                    <div className="text-[12px] font-semibold" style={{ color: C.text }}>สีเขียว · Tier 10 บาท</div>
                    <div className="text-[10px] mt-1" style={{ color: C.textMuted }}>ปีงบฯ 2568 · 1 ต.ค. 67 – 30 ก.ย. 68</div>
                  </div>
                  {/* History — small dots */}
                  <div className="mt-4 pt-3 border-t" style={{ borderColor: C.surfaceSoft }}>
                    <div className="text-[10px] mb-2" style={{ color: C.textMuted }}>ประวัติ 4 ปี</div>
                    <div className="flex gap-2 justify-between">
                      {[
                        { y: '68', c: C.success },
                        { y: '67', c: '#185FA5' },
                        { y: '66', c: C.accent },
                        { y: '65', c: C.alert },
                      ].map((h, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <div className="w-7 h-7 rounded-full" style={{ background: h.c }}></div>
                          <span className="text-[9px]" style={{ color: C.textMuted }}>{h.y}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* R-09 — Schedule view */}
              {tab === 'schedule' && (
                <div className="p-4 pb-5">
                  <div className="rounded-lg p-3 mb-3" style={{ background: C.surface }}>
                    <div className="text-[10px] mb-1" style={{ color: C.textMuted }}>โซน A · เส้นทาง 1</div>
                    <div className="text-[13px] font-semibold" style={{ color: C.text }}>หมู่ 1, 2, 3</div>
                    <div className="text-[10px] mt-1 flex items-center gap-1" style={{ color: C.textMuted }}>
                      <span>🕐</span> 06:00 – 09:00 น.
                    </div>
                  </div>
                  <div className="text-[11px] mb-2" style={{ color: C.textMuted }}>เก็บขยะ 4 ครั้งถัดไป</div>
                  <div className="space-y-1.5">
                    {nextCollections.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-lg px-3 py-2"
                        style={c.isNext
                          ? { background: C.successSoft, border: `1px solid ${C.success}33` }
                          : { background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold"
                          style={c.isNext
                            ? { background: C.success, color: '#FFF' }
                            : { background: C.surfaceSoft, color: C.textMuted }}
                        >
                          {c.day}
                        </div>
                        <div className="flex-1">
                          <div className="text-[11px] font-medium" style={{ color: C.text }}>{c.date}</div>
                          {c.isNext && <div className="text-[9px]" style={{ color: '#3B6D11' }}>ครั้งถัดไป · เหลือ 5 วัน</div>}
                        </div>
                        {c.isNext && <span className="text-[10px]" style={{ color: C.success }}>เร็วๆ นี้</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom action button */}
              <div className="px-4 pb-4 pt-2 border-t" style={{ borderColor: C.surfaceSoft }}>
                <button
                  className="w-full text-[12px] font-semibold py-2.5 rounded-lg"
                  style={{ background: C.primary, color: '#FFF', border: 'none' }}
                >
                  ชำระด้วย QR PromptPay
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right info column */}
        <div className="flex-1">
          <div className="text-[14px] font-semibold mb-3" style={{ color: C.text }}>ทำไมประชาชนใช้ระบบนี้?</div>
          <div className="space-y-2.5 text-[13px]" style={{ color: C.text }}>
            <div className="flex gap-2.5">
              <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ background: C.successSoft, color: C.success }}>✓</span>
              <span><strong>เห็นบิลทันที</strong> — ไม่ต้องรอกระดาษ ไม่ต้องไปที่ทำการ</span>
            </div>
            <div className="flex gap-2.5">
              <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ background: C.successSoft, color: C.success }}>✓</span>
              <span><strong>จ่ายผ่าน LINE</strong> — กดปุ่มเดียวแสดง QR PromptPay</span>
            </div>
            <div className="flex gap-2.5">
              <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ background: C.successSoft, color: C.success }}>✓</span>
              <span><strong>คัดแยก = ประหยัด</strong> — สติ๊กเกอร์เขียวจ่าย 10 ฿/เดือน + ส่วนแบ่งรีไซเคิล</span>
            </div>
            <div className="flex gap-2.5">
              <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ background: C.successSoft, color: C.success }}>✓</span>
              <span><strong>เห็นตารางเก็บล่วงหน้า</strong> — รู้ว่ารถมาเมื่อไหร่ ไม่ต้องเดาวัน</span>
            </div>
            <div className="flex gap-2.5">
              <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ background: C.successSoft, color: C.success }}>✓</span>
              <span><strong>ตรวจสอบเจ้าหน้าที่</strong> — สแกน QR บัตรเจ้าหน้าที่ก่อนชำระ ป้องกันมิจฉาชีพ</span>
            </div>
          </div>
          <div className="mt-4 rounded-lg p-3" style={{ background: C.accentSoft, border: `1px solid ${C.accent}33` }}>
            <div className="text-[11px] font-semibold uppercase mb-1" style={{ color: C.accent, letterSpacing: '1.5px' }}>Reality check</div>
            <div className="text-[12px]" style={{ color: C.text }}>
              กทม. มีคนลงทะเบียน <strong>786,099 หลัง</strong> ใน 5 เดือน (BKK WASTE PAY) — ประชาชนเลือกถ้ามีแรงจูงใจจริง
            </div>
          </div>
        </div>
      </div>
    </PanelChrome>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// Panel 3 · Driver — adapted from D-01 My Routes + D-02 Route Map
// ───────────────────────────────────────────────────────────────────────────

// ── Reusable: Phone frame (mobile screens used by field staff) ───────────────
function PhoneFrame({ caption, children, accent = C.primary }) {
  return (
    <div className="flex flex-col items-center" style={{ width: 220 }}>
      <div className="rounded-[28px] p-1.5 shadow-lg" style={{ background: '#1F2A24' }}>
        <div className="rounded-[22px] overflow-hidden relative" style={{ background: '#FFF', width: 200, height: 400 }}>
          {/* Status bar */}
          <div className="px-3 py-1 flex justify-between items-center text-[8px] font-medium" style={{ background: accent, color: '#FFF' }}>
            <span>{new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}</span>
            <span className="flex gap-1 items-center">
              <span>📶</span><span>4G</span><span>🔋 86%</span>
            </span>
          </div>
          {children}
        </div>
      </div>
      <div className="text-[11px] font-medium mt-2 text-center" style={{ color: C.text }}>{caption}</div>
    </div>
  );
}

function DriverPanel() {
  // Numbers from D-01 reference
  const totalHouses = 48;
  const collectedHouses = 29;
  const skippedHouses = 4;
  const remaining = totalHouses - collectedHouses - skippedHouses;
  const pct = Math.round((collectedHouses / totalHouses) * 100);
  const [activeScreen, setActiveScreen] = useState('today');

  // Mock queue for "Today" screen
  const queue = [
    { id: 1, addr: '89/1 ม.3', name: 'นายมานพ', tier: 'success', label: '10฿', state: 'เก็บแล้ว 13:45', done: true },
    { id: 2, addr: '89/3 ม.3', name: 'น.ส.สมศรี', tier: 'accent', label: '20฿', state: 'สุ่มถ่ายรูปแล้ว', done: true, sampled: true },
    { id: 3, addr: '90/2 ม.3', name: 'นายประสิทธิ์', tier: 'alert', label: '60฿', state: 'ค้างชำระ · ข้าม', skipped: true },
    { id: 4, addr: '92/4 ม.3', name: 'น.ส.วิภา', tier: 'success', label: '10฿', state: 'ครั้งถัดไป', current: true },
    { id: 5, addr: '94/1 ม.3', name: 'นายชาลี', tier: 'accent', label: '20฿', state: 'รอเก็บ' },
    { id: 6, addr: '94/3 ม.3', name: 'น.ส.อุไร', tier: 'success', label: '10฿', state: 'รอเก็บ' },
  ];

  return (
    <PanelChrome title="Driver App · Mobile" subtitle="นายประยุทธ์ · รถ ขข-09 · เส้นทาง 1" status="GPS Active">
      <div className="p-5 md:p-7">
        {/* Progress hero (above phones) */}
        <div className="rounded-xl p-5 mb-5" style={{ background: C.primary, color: '#FFF' }}>
          <div className="flex items-baseline justify-between mb-2">
            <div className="text-[11px] uppercase tracking-wider opacity-80">รอบเช้า · 06:00 น.</div>
            <div className="text-[11px] opacity-80">หมู่ 1, 2, 3 · โซน A</div>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-[36px] font-bold leading-none">{collectedHouses}</span>
            <span className="text-[16px] font-medium opacity-90">/ {totalHouses} หลัง</span>
            <span className="text-[14px] ml-auto opacity-90">{pct}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <div className="h-full" style={{ width: `${pct}%`, background: '#FFF' }}></div>
          </div>
          <div className="flex gap-4 text-[11px]">
            <span className="opacity-90">เก็บแล้ว <strong>{collectedHouses}</strong></span>
            <span className="opacity-90">ข้ามแล้ว <strong>{skippedHouses}</strong></span>
            <span className="opacity-90">เหลือ <strong>{remaining}</strong></span>
            <span className="ml-auto opacity-90">~ 1 ชม. 20 นาที</span>
          </div>
        </div>

        {/* === 3 phone screens — mobile-first showcase === */}
        <div className="text-[12px] font-medium mb-3" style={{ color: C.text }}>
          มือถือของเจ้าหน้าที่ในรถเก็บขยะ — 3 หน้าจอที่ใช้จริง
        </div>

        <div className="flex flex-wrap justify-center gap-5 md:gap-7 mb-6">

          {/* ════════ Phone 1 — Today's Route List ════════ */}
          <PhoneFrame caption="หน้าหลัก · รายการบ้านวันนี้">
            {/* Header */}
            <div className="px-3 py-2 border-b" style={{ borderColor: C.surfaceSoft, background: '#FFF' }}>
              <div className="flex items-center gap-2">
                <button className="text-[14px]" style={{ color: C.textMuted }}>☰</button>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-semibold" style={{ color: C.text }}>เส้นทาง 1 · ฝั่งซ้าย</div>
                  <div className="text-[8px]" style={{ color: C.textMuted }}>หมู่ 3 · 26 หลัง</div>
                </div>
                <span className="text-[8px] flex items-center gap-1" style={{ color: C.success }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.success }}></span>GPS
                </span>
              </div>
              {/* Mini progress */}
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-[18px] font-bold leading-none" style={{ color: C.primary }}>{collectedHouses}</span>
                <span className="text-[10px]" style={{ color: C.textMuted }}>/ {totalHouses} หลัง</span>
                <span className="ml-auto text-[10px] font-medium" style={{ color: C.primary }}>{pct}%</span>
              </div>
              <div className="h-1 mt-1 rounded-full overflow-hidden" style={{ background: C.surfaceSoft }}>
                <div className="h-full" style={{ width: `${pct}%`, background: C.primary }}></div>
              </div>
            </div>

            {/* List */}
            <div className="overflow-y-auto" style={{ height: 280, background: '#FFF' }}>
              {queue.map((row) => (
                <div
                  key={row.id}
                  className="flex items-center gap-2 px-3 py-2 border-b"
                  style={{
                    borderColor: C.surfaceSoft,
                    background: row.current ? C.successSoft : row.skipped ? '#FAFAFA' : '#FFF',
                    opacity: row.done ? 0.65 : 1,
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0"
                    style={{ background: row.tier === 'success' ? C.success : row.tier === 'accent' ? C.accent : C.alert }}
                  >
                    {row.label}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-medium truncate" style={{ color: C.text }}>{row.addr}</div>
                    <div className="text-[8px] truncate" style={{ color: C.textMuted }}>
                      {row.name} · {row.state}
                    </div>
                  </div>
                  {row.done && row.sampled && <span className="text-[10px]">📷</span>}
                  {row.done && !row.sampled && <span className="text-[10px]" style={{ color: C.success }}>✓</span>}
                  {row.skipped && <span className="text-[10px]" style={{ color: C.alert }}>✕</span>}
                  {row.current && <span className="text-[8px] font-bold" style={{ color: C.success }}>NOW</span>}
                </div>
              ))}
            </div>

            {/* Bottom tab bar */}
            <div className="absolute bottom-0 left-0 right-0 flex border-t" style={{ borderColor: C.surfaceSoft, background: '#FFF' }}>
              {[
                { k: 'list', label: 'รายการ', icon: '☰', active: true },
                { k: 'map', label: 'แผนที่', icon: '🗺' },
                { k: 'me', label: 'ฉัน', icon: '👤' },
              ].map((t, i) => (
                <div key={i} className="flex-1 flex flex-col items-center py-1.5"
                  style={{ color: t.active ? C.primary : C.textMuted, borderTop: t.active ? `2px solid ${C.primary}` : 'none', marginTop: t.active ? -1 : 0 }}>
                  <span className="text-[12px]">{t.icon}</span>
                  <span className="text-[8px] mt-0.5">{t.label}</span>
                </div>
              ))}
            </div>
          </PhoneFrame>

          {/* ════════ Phone 2 — Map View ════════ */}
          <PhoneFrame caption="แผนที่เส้นทาง · GPS Real-time">
            {/* Search bar */}
            <div className="absolute top-6 left-2 right-2 z-10">
              <div className="rounded-full px-2.5 py-1.5 flex items-center gap-1.5 shadow-md" style={{ background: '#FFF' }}>
                <span className="text-[10px]">🔍</span>
                <span className="text-[9px] flex-1" style={{ color: C.textMuted }}>หมู่ 3 · เส้นทาง 1</span>
                <span className="text-[10px]">⚙</span>
              </div>
            </div>

            {/* Google-style map */}
            <div className="relative" style={{ height: 340, background: '#EDE9DD', overflow: 'hidden' }}>
              <svg width="100%" height="100%" viewBox="0 0 200 340" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
                <rect x="0" y="0" width="200" height="340" fill="#EDE9DD" />
                {/* Park areas */}
                <ellipse cx="30" cy="40" rx="40" ry="30" fill="#C8DEC0" />
                <path d="M 150 280 L 200 270 L 200 340 L 140 340 Z" fill="#C8DEC0" />
                {/* River */}
                <path d="M 200 60 Q 175 110 185 160 T 200 250 L 200 280 Q 165 250 175 200 T 200 80 Z" fill="#A6CFE8" />
                <rect x="178" y="170" width="22" height="5" fill="#EDE9DD" />

                {/* Building blocks */}
                <g fill="#DDD7C8" stroke="#CFC9BA" strokeWidth="0.4">
                  <rect x="20" y="100" width="32" height="20" rx="1.5" />
                  <rect x="20" y="125" width="32" height="20" rx="1.5" />
                  <rect x="20" y="150" width="32" height="20" rx="1.5" />
                  <rect x="20" y="175" width="32" height="20" rx="1.5" />
                  <rect x="62" y="100" width="32" height="20" rx="1.5" />
                  <rect x="62" y="125" width="32" height="20" rx="1.5" />
                  <rect x="62" y="150" width="32" height="20" rx="1.5" />
                  <rect x="62" y="175" width="32" height="20" rx="1.5" />
                  <rect x="62" y="200" width="32" height="20" rx="1.5" />
                  <rect x="105" y="100" width="32" height="20" rx="1.5" />
                  <rect x="105" y="125" width="32" height="20" rx="1.5" />
                  <rect x="105" y="150" width="32" height="20" rx="1.5" />
                  <rect x="105" y="175" width="32" height="20" rx="1.5" />
                  <rect x="105" y="200" width="32" height="20" rx="1.5" />
                  <rect x="148" y="125" width="28" height="20" rx="1.5" />
                  <rect x="148" y="150" width="28" height="20" rx="1.5" />
                  <rect x="148" y="175" width="28" height="20" rx="1.5" />
                  <rect x="148" y="200" width="28" height="20" rx="1.5" />
                </g>

                {/* Roads — borders */}
                <g stroke="#C8B89A" strokeLinecap="round" fill="none">
                  <path d="M 0 95 L 200 95" strokeWidth="9" />
                  <path d="M 0 220 L 200 220" strokeWidth="9" />
                  <path d="M 56 0 L 56 340" strokeWidth="9" />
                  <path d="M 142 0 L 142 340" strokeWidth="9" />
                </g>
                {/* Roads — fill */}
                <g strokeLinecap="round" fill="none">
                  <path d="M 0 95 L 200 95" stroke="#FFF7DA" strokeWidth="7" />
                  <path d="M 0 220 L 200 220" stroke="#FFF7DA" strokeWidth="7" />
                  <path d="M 56 0 L 56 340" stroke="#FFF7DA" strokeWidth="7" />
                  <path d="M 142 0 L 142 340" stroke="#FFF7DA" strokeWidth="7" />
                </g>
                {/* Road label */}
                <text x="100" y="97" textAnchor="middle" fontSize="6" fill="#7A6A4A" fontStyle="italic" fontFamily="Sarabun">ถ.หลัก</text>

                {/* Completed route line — Google blue */}
                <path d="M 30 95 L 56 95 L 56 130 L 100 130 L 100 220" stroke="#1B61C9" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />

                {/* House pins */}
                {[
                  { x: 36, y: 110, c: C.success, done: true },
                  { x: 36, y: 135, c: C.accent, done: true },
                  { x: 36, y: 160, c: C.success, done: true },
                  { x: 36, y: 185, c: C.alert, done: false },
                  { x: 78, y: 110, c: C.accent, done: true },
                  { x: 78, y: 135, c: C.success, done: true },
                  { x: 78, y: 160, c: C.success, done: true },
                  { x: 78, y: 185, c: C.accent, done: false },
                  { x: 78, y: 210, c: C.alert, done: false },
                  { x: 121, y: 110, c: C.success, done: false },
                  { x: 121, y: 135, c: C.success, done: false },
                  { x: 121, y: 160, c: C.accent, done: false },
                  { x: 121, y: 185, c: C.alert, done: false },
                  { x: 121, y: 210, c: C.success, done: false },
                  { x: 162, y: 135, c: C.accent, done: false },
                  { x: 162, y: 160, c: C.success, done: false },
                  { x: 162, y: 185, c: C.success, done: false },
                ].map((h, i) => (
                  <g key={i} style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.25))' }}>
                    <path
                      d={`M ${h.x} ${h.y - 6} C ${h.x - 3.5} ${h.y - 6}, ${h.x - 3.5} ${h.y - 1}, ${h.x} ${h.y + 3} C ${h.x + 3.5} ${h.y - 1}, ${h.x + 3.5} ${h.y - 6}, ${h.x} ${h.y - 6} Z`}
                      fill={h.done ? '#9CA3AF' : h.c}
                      stroke="#FFF"
                      strokeWidth="0.9"
                    />
                    <circle cx={h.x} cy={h.y - 4} r="1.1" fill="#FFF" />
                  </g>
                ))}

                {/* Truck position */}
                <g style={{ filter: 'drop-shadow(0 1.5px 2px rgba(0,0,0,0.35))' }}>
                  <ellipse cx="100" cy="222" rx="9" ry="2" fill="rgba(0,0,0,0.18)" />
                  <circle cx="100" cy="220" r="11" fill={C.primary} stroke="#FFF" strokeWidth="2" />
                  <text x="100" y="223" textAnchor="middle" fontSize="9" fill="#FFF" fontWeight="700">🚛</text>
                  {/* Pulse ring */}
                  <circle cx="100" cy="220" r="11" fill="none" stroke={C.primary} strokeWidth="1.5">
                    <animate attributeName="r" values="11;18;11" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* Sample badge */}
                <g>
                  <rect x="125" y="155" width="58" height="13" rx="6.5" fill={C.accent} />
                  <text x="154" y="164" textAnchor="middle" fontSize="7" fill="#FFF" fontWeight="600" fontFamily="Sarabun">📷 สุ่ม</text>
                </g>

                {/* Map controls */}
                <g>
                  <rect x="178" y="50" width="18" height="36" rx="3" fill="#FFF" stroke="#D8D2C2" strokeWidth="0.4" />
                  <line x1="178" y1="68" x2="196" y2="68" stroke="#D8D2C2" strokeWidth="0.4" />
                  <text x="187" y="64" textAnchor="middle" fontSize="11" fill="#5F6B65" fontWeight="600">+</text>
                  <text x="187" y="82" textAnchor="middle" fontSize="11" fill="#5F6B65" fontWeight="600">−</text>
                  <circle cx="187" cy="100" r="8.5" fill="#FFF" stroke="#D8D2C2" strokeWidth="0.4" />
                  <polygon points="187,94 189,100 187,98 185,100" fill={C.alert} />
                  <polygon points="187,106 189,100 187,102 185,100" fill="#5F6B65" />
                  <text x="187" y="108" textAnchor="middle" fontSize="3.5" fill="#5F6B65" fontWeight="600">N</text>
                </g>

                {/* Scale */}
                <g transform="translate(8 320)">
                  <rect x="0" y="-4" width="46" height="8" fill="#FFF" stroke="#D8D2C2" strokeWidth="0.4" rx="1.5" />
                  <line x1="4" y1="0" x2="42" y2="0" stroke="#1F2A24" strokeWidth="0.7" />
                  <line x1="4" y1="-2" x2="4" y2="2" stroke="#1F2A24" strokeWidth="0.7" />
                  <line x1="42" y1="-2" x2="42" y2="2" stroke="#1F2A24" strokeWidth="0.7" />
                  <text x="46" y="2" fontSize="5" fill="#5F6B65" fontFamily="Sarabun" dx="2">200 ม.</text>
                </g>
              </svg>

              {/* Bottom info card overlay */}
              <div className="absolute bottom-12 left-2 right-2 rounded-lg p-2 shadow-md" style={{ background: '#FFF' }}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded flex items-center justify-center text-[8px] font-bold text-white" style={{ background: C.success }}>10฿</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] font-semibold truncate" style={{ color: C.text }}>92/4 ม.3 · น.ส.วิภา</div>
                    <div className="text-[7px]" style={{ color: C.textMuted }}>หลังถัดไป · 12 ม. ข้างหน้า</div>
                  </div>
                  <button className="text-[8px] font-semibold px-2 py-1 rounded" style={{ background: C.primary, color: '#FFF' }}>เริ่ม</button>
                </div>
              </div>
            </div>

            {/* Bottom tab bar */}
            <div className="absolute bottom-0 left-0 right-0 flex border-t" style={{ borderColor: C.surfaceSoft, background: '#FFF' }}>
              {[
                { k: 'list', label: 'รายการ', icon: '☰' },
                { k: 'map', label: 'แผนที่', icon: '🗺', active: true },
                { k: 'me', label: 'ฉัน', icon: '👤' },
              ].map((t, i) => (
                <div key={i} className="flex-1 flex flex-col items-center py-1.5"
                  style={{ color: t.active ? C.primary : C.textMuted, borderTop: t.active ? `2px solid ${C.primary}` : 'none', marginTop: t.active ? -1 : 0 }}>
                  <span className="text-[12px]">{t.icon}</span>
                  <span className="text-[8px] mt-0.5">{t.label}</span>
                </div>
              ))}
            </div>
          </PhoneFrame>

          {/* ════════ Phone 3 — House Detail / Photo Capture ════════ */}
          <PhoneFrame caption="ถ่ายรูปหลักฐาน · บ้านที่ถูกสุ่ม">
            {/* Top header */}
            <div className="px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: C.surfaceSoft, background: '#FFF' }}>
              <button className="text-[12px]" style={{ color: C.textMuted }}>‹</button>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-semibold" style={{ color: C.text }}>89/3 ม.3</div>
                <div className="text-[8px]" style={{ color: C.textMuted }}>น.ส.สมศรี รักดี</div>
              </div>
              <Pill variant="accent">สุ่มรอบนี้</Pill>
            </div>

            {/* Tier info */}
            <div className="px-3 py-2.5" style={{ background: C.accentSoft, borderBottom: `1px solid ${C.surfaceSoft}` }}>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[10px] font-bold text-white" style={{ background: C.accent }}>20฿</div>
                <div className="flex-1">
                  <div className="text-[10px] font-semibold" style={{ color: C.text }}>คัดแยก verified · 20 ฿/เดือน</div>
                  <div className="text-[8px]" style={{ color: C.textMuted }}>ลงทะเบียนเมื่อ 12 ก.พ. 69</div>
                </div>
              </div>
            </div>

            {/* Camera viewfinder */}
            <div className="relative" style={{ height: 180, background: '#1F2A24' }}>
              {/* Mock camera view — gradient */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, #4A5568 0%, #2D3748 50%, #1F2A24 100%)',
              }}></div>

              {/* Trash bag illustration */}
              <svg width="100%" height="100%" viewBox="0 0 200 180" style={{ position: 'absolute', inset: 0 }}>
                {/* Ground */}
                <rect x="0" y="130" width="200" height="50" fill="rgba(0,0,0,0.3)" />
                {/* Green bag (sorted) */}
                <ellipse cx="60" cy="135" rx="22" ry="6" fill="rgba(0,0,0,0.4)" />
                <path d="M 42 130 Q 42 105 50 95 L 70 95 Q 78 105 78 130 Q 78 138 60 138 Q 42 138 42 130 Z" fill={C.success} />
                <path d="M 50 95 L 50 88 L 70 88 L 70 95" stroke="#FFF" strokeWidth="1.5" fill="none" />
                {/* Yellow bag (recyclable) */}
                <ellipse cx="120" cy="138" rx="20" ry="5" fill="rgba(0,0,0,0.4)" />
                <path d="M 105 134 Q 105 112 112 103 L 128 103 Q 135 112 135 134 Q 135 141 120 141 Q 105 141 105 134 Z" fill={C.accent} />
                <path d="M 112 103 L 112 96 L 128 96 L 128 103" stroke="#FFF" strokeWidth="1.5" fill="none" />
              </svg>

              {/* Corner brackets (camera frame) */}
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} viewBox="0 0 200 180">
                <g stroke="#FFF" strokeWidth="2" fill="none" opacity="0.85">
                  <path d="M 12 12 L 12 28 M 12 12 L 28 12" />
                  <path d="M 188 12 L 188 28 M 188 12 L 172 12" />
                  <path d="M 12 168 L 12 152 M 12 168 L 28 168" />
                  <path d="M 188 168 L 188 152 M 188 168 L 172 168" />
                </g>
              </svg>

              {/* GPS overlay top-left */}
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[8px] font-medium flex items-center gap-1" style={{ background: 'rgba(0,0,0,0.6)', color: '#FFF' }}>
                <span style={{ color: C.success }}>●</span> 13.7521°N 100.5018°E
              </div>
              {/* Live badge */}
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[8px] font-bold flex items-center gap-1" style={{ background: C.alert, color: '#FFF' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#FFF' }}></span> REC
              </div>
              {/* Timestamp */}
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[8px]" style={{ background: 'rgba(0,0,0,0.6)', color: '#FFF', fontFamily: 'monospace' }}>
                30 เม.ย. 69 · 14:32:11
              </div>
            </div>

            {/* Sorting checklist */}
            <div className="px-3 py-2 text-[9px]">
              <div className="font-semibold mb-1.5" style={{ color: C.text }}>คัดแยกถูกต้อง?</div>
              <div className="space-y-1">
                {[
                  { label: 'ขยะอินทรีย์', ok: true, color: C.success },
                  { label: 'ขยะรีไซเคิล', ok: true, color: C.accent },
                  { label: 'ขยะอันตราย', ok: false, color: '#9CA3AF' },
                  { label: 'ขยะทั่วไป', ok: true, color: '#5F6B65' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-[8px]">
                    <span className="w-3 h-3 rounded-sm flex items-center justify-center" style={{ background: c.ok ? c.color : 'transparent', border: `1px solid ${c.ok ? c.color : C.textMuted}`, color: '#FFF' }}>
                      {c.ok && '✓'}
                    </span>
                    <span style={{ color: C.text }}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Capture buttons */}
            <div className="absolute bottom-12 left-0 right-0 px-3 flex items-center justify-center gap-2">
              <button className="w-7 h-7 rounded-full flex items-center justify-center text-[10px]" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>↺</button>
              <button className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: C.primary, border: '3px solid #FFF', boxShadow: '0 2px 6px rgba(0,0,0,0.25)' }}>
                <span className="text-[14px]">📷</span>
              </button>
              <button className="w-7 h-7 rounded-full flex items-center justify-center text-[10px]" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>⚡</button>
            </div>

            {/* Bottom tab bar */}
            <div className="absolute bottom-0 left-0 right-0 flex border-t" style={{ borderColor: C.surfaceSoft, background: '#FFF' }}>
              {[
                { k: 'list', label: 'รายการ', icon: '☰' },
                { k: 'map', label: 'แผนที่', icon: '🗺' },
                { k: 'me', label: 'ฉัน', icon: '👤' },
              ].map((t, i) => (
                <div key={i} className="flex-1 flex flex-col items-center py-1.5"
                  style={{ color: t.active ? C.primary : C.textMuted }}>
                  <span className="text-[12px]">{t.icon}</span>
                  <span className="text-[8px] mt-0.5">{t.label}</span>
                </div>
              ))}
            </div>
          </PhoneFrame>

        </div>

        {/* Two-sided route badges (compact, below phones) */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="rounded-lg p-3 text-center" style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}>
            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: C.textMuted }}>ฝั่งซ้าย</div>
            <div className="text-[20px] font-semibold" style={{ color: C.text }}>26 หลัง</div>
            <div className="text-[10px]" style={{ color: C.success }}>เก็บแล้ว 18</div>
          </div>
          <div className="rounded-lg p-3 text-center" style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}>
            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: C.textMuted }}>ฝั่งขวา</div>
            <div className="text-[20px] font-semibold" style={{ color: C.text }}>22 หลัง</div>
            <div className="text-[10px]" style={{ color: C.success }}>เก็บแล้ว 11</div>
          </div>
        </div>

        {/* Callout: why this is faster */}
        <div className="rounded-xl p-4 mb-2 grid grid-cols-1 md:grid-cols-3 gap-4" style={{ background: C.accentSoft, border: `1px solid ${C.accent}33` }}>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: C.accent, letterSpacing: '1.5px' }}>เหตุผลที่ทำงานเร็วขึ้น</div>
            <div className="text-[12px] leading-relaxed" style={{ color: C.text }}>ถ่ายรูปแค่บ้านที่สุ่ม <strong>(33%)</strong> ไม่ใช่ทุกบ้าน → ลดเวลาถ่ายรูป<strong>ประมาณการ −67%</strong></div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: C.accent, letterSpacing: '1.5px' }}>ใช้บนมือถือธรรมดา</div>
            <div className="text-[12px] leading-relaxed" style={{ color: C.text }}>ไม่ต้องซื้อ tablet ราคาแพง · ใช้ Android ปกติได้ · GPS + กล้องในตัว</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: C.accent, letterSpacing: '1.5px' }}>ออฟไลน์ก็ทำงานได้</div>
            <div className="text-[12px] leading-relaxed" style={{ color: C.text }}>เก็บข้อมูลในเครื่องระหว่างไม่มี signal · sync อัตโนมัติเมื่อ online กลับมา</div>
          </div>
        </div>
      </div>
    </PanelChrome>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// Panel 4 · Officer — adapted from O-12 Sticker Issuance
// ───────────────────────────────────────────────────────────────────────────

function StickerPanel() {
  const [selectedHouse, setSelectedHouse] = useState(2);

  // Mock household queue — like O-12
  const queue = [
    { id: 1, addr: '88/2 ม.3', name: 'นายมานพ ใจดี', status: 'paid', amount: '120฿', tier: 'sorted', issued: false },
    { id: 2, addr: '89/1 ม.3', name: 'น.ส.สมศรี รักดี', status: 'paid', amount: '120฿', tier: 'recycled', issued: false }, // Active
    { id: 3, addr: '89/3 ม.3', name: 'นายประสิทธิ์ ขยัน', status: 'paid', amount: '240฿', tier: 'sorted', issued: false },
    { id: 4, addr: '90/1 ม.3', name: 'น.ส.วิภาภรณ์', status: 'unpaid', amount: '720฿', tier: 'notSorted', issued: false },
    { id: 5, addr: '90/2 ม.3', name: 'นายสุเทพ', status: 'partial', amount: '60/240฿', tier: 'notSorted', issued: false },
    { id: 6, addr: '91/1 ม.3', name: 'น.ส.อุไรวรรณ', status: 'paid', amount: '120฿', tier: 'recycled', issued: true, issuedDate: '21 เม.ย. 69' },
    { id: 7, addr: '91/4 ม.3', name: 'นายชาลี', status: 'paid', amount: '240฿', tier: 'sorted', issued: true, issuedDate: '20 เม.ย. 69' },
  ];

  const active = queue.find(q => q.id === selectedHouse) || queue[1];
  const tierMap = TIER_COLOR[active.tier] || TIER_COLOR.sorted;

  const statusBadge = (status, amount) => {
    if (status === 'paid') return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold" style={{ background: C.successSoft, color: '#3B6D11' }}>✓ ชำระแล้ว {amount}</span>;
    if (status === 'unpaid') return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold" style={{ background: C.alertSoft, color: C.alert }}>✕ ค้าง {amount}</span>;
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold" style={{ background: C.accentSoft, color: C.accent }}>⚠ {amount}</span>;
  };

  return (
    <PanelChrome title="ออกสติ๊กเกอร์" subtitle="Officer Portal · O-12 Sticker Issuance" status="ปีงบฯ 2569">
      <div className="p-5 md:p-7">
        {/* Top — period banner */}
        <div className="rounded-xl p-3 mb-4 flex flex-wrap items-center gap-3" style={{ background: C.accentSoft, border: `1px solid ${C.accent}33` }}>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: C.accent }}>รอบสติ๊กเกอร์</div>
            <div className="text-[13px] font-medium" style={{ color: C.text }}>ปีงบประมาณ 2569 · 1 ต.ค. 68 – 30 ก.ย. 69</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[11px]" style={{ color: C.textMuted }}>ออกแล้ววันนี้</span>
            <span className="text-[16px] font-semibold" style={{ color: C.text }}>32 ดวง</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* LEFT — Search + Queue (3 col) */}
          <div className="md:col-span-3">
            {/* Search */}
            <div className="relative mb-3">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px]" style={{ color: C.textMuted }}>🔍</span>
              <input
                type="text"
                placeholder="ค้นหาด้วยเลขที่บ้าน หรือสแกน QR Code"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg text-[13px] outline-none"
                style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}`, color: C.text, fontFamily: 'inherit' }}
              />
            </div>

            <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: C.textMuted }}>คิวรอออกสติ๊กเกอร์ — {queue.filter(q => !q.issued).length} ครัวเรือน</div>

            {/* Queue list */}
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.surfaceSoft}` }}>
              {queue.map((row, i) => {
                const isActive = row.id === selectedHouse;
                const isIssued = row.issued;
                return (
                  <button
                    key={row.id}
                    onClick={() => !isIssued && setSelectedHouse(row.id)}
                    disabled={isIssued}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors"
                    style={{
                      background: isActive ? C.successSoft : '#FFF',
                      borderBottom: i < queue.length - 1 ? `1px solid ${C.surfaceSoft}` : 'none',
                      cursor: isIssued ? 'default' : 'pointer',
                      opacity: isIssued ? 0.6 : 1,
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                      style={{ background: TIER_COLOR[row.tier].bg }}
                    >
                      {TIER_COLOR[row.tier].label.split(' ')[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-semibold" style={{ color: C.text }}>{row.addr}</span>
                        <span className="text-[11px]" style={{ color: C.textMuted }}>· {row.name}</span>
                      </div>
                      <div className="mt-0.5">{statusBadge(row.status, row.amount)}</div>
                    </div>
                    {isIssued
                      ? <span className="text-[10px]" style={{ color: C.success }}>✓ ออกแล้ว {row.issuedDate}</span>
                      : isActive
                        ? <span className="text-[10px] font-semibold" style={{ color: C.success }}>กำลังเลือก →</span>
                        : <span className="text-[14px]" style={{ color: C.textMuted }}>›</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Sticker preview + Issue button (2 col) */}
          <div className="md:col-span-2">
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: C.textMuted }}>พรีวิวสติ๊กเกอร์</div>
            <div className="rounded-xl p-5 mb-3" style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}>
              {/* Sticker visual */}
              <StickerGraphic size={130} color={tierMap.bg} year="2569" />
              <div className="text-center mt-3">
                <div className="text-[13px] font-semibold" style={{ color: C.text }}>{active.addr}</div>
                <div className="text-[11px]" style={{ color: C.textMuted }}>{active.name}</div>
                <div className="mt-2">
                  <Pill variant={active.tier === 'recycled' ? 'success' : active.tier === 'sorted' ? 'accent' : 'alert'}>
                    Tier · {tierMap.label}
                  </Pill>
                </div>
              </div>
            </div>

            <button
              disabled={active.status === 'unpaid'}
              className="w-full text-[14px] font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
              style={active.status === 'unpaid'
                ? { background: C.surfaceSoft, color: C.textMuted, border: 'none', cursor: 'not-allowed' }
                : { background: C.primary, color: '#FFF', border: 'none', cursor: 'pointer' }}
            >
              {active.status === 'unpaid' ? 'ต้องชำระเงินก่อน' : 'พิมพ์ + ออกสติ๊กเกอร์'}
            </button>

            <div className="mt-3 text-[11px] leading-relaxed" style={{ color: C.textMuted }}>
              <strong style={{ color: C.text }}>วิธีทำงาน:</strong> ประชาชนชำระเงินเสร็จ → ระบบ enrich tier color (10/20/60฿) → เจ้าหน้าที่กดปุ่มเดียวเพื่อพิมพ์สติ๊กเกอร์ตามสีและส่งให้ ครัวเรือนติดที่หน้าบ้านสำหรับปีงบฯ ปัจจุบัน
            </div>
          </div>
        </div>
      </div>
    </PanelChrome>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// Panel 5 · ROI Calculator (re-skinned with design tokens)
// ───────────────────────────────────────────────────────────────────────────

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
        <span className="font-medium">ROI Calculator · ประมาณการสำหรับหน่วยงานของท่าน</span>
        <span className="ml-auto" style={{ color: C.textMuted }}>* ตัวเลขเป็นประมาณการ</span>
      </div>

      <div className="p-6 md:p-8">
        {/* Slider */}
        <div className="mb-6">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-[13px] font-medium" style={{ color: C.text }}>จำนวนครัวเรือนในหน่วยงาน</span>
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
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: '#3B6D11' }}>หลัง — ระบบใหม่ 3-Tier</div>
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
          <strong style={{ color: C.text }}>หมายเหตุ:</strong> ตัวเลขเป็นประมาณการจาก briefing ภายใน — ผลจริงขึ้นกับการลงทะเบียนของประชาชน · ประสิทธิภาพการคัดแยก · ราคา recyclable rate ในตลาด · เปรียบเทียบ baseline 20 ฿/หลัง/เดือน
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
      case 'sticker': return <StickerPanel />;
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
        <strong style={{ color: C.text }}>Speaker hint:</strong> ลองให้ผู้บริหารหน่วยงานเลือก persona ที่ตรงกับงานของท่าน · เริ่มจาก "ผู้บริหาร" → "ประชาชน" → "เจ้าหน้าที่" → "ออกสติ๊กเกอร์" → ปิดด้วย ROI Calculator (ปรับจำนวนครัวเรือนของท่านได้)
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
            <CTAButton onClick={() => document.getElementById('prototype')?.scrollIntoView({ behavior: 'smooth' })}>
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
          <StatCard label="เทศบาลนครลำปาง" value="ใช้อัตราเดิม" sub="รอออกข้อบัญญัติใหม่ · เป็นโอกาสของหน่วยงานท้องถิ่นอื่น" accent={C.accent} />
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
              เปิดทางให้หน่วยงานท้องถิ่นขึ้นเพดานค่าธรรมเนียมเป็น 60 ฿/เดือน สำหรับครัวเรือนทั่วไป — และให้ "คัดแยก = จ่ายน้อยลง" เป็นแรงจูงใจที่เป็นทางการ
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
                ระดับสูงสุดของระบบ — ครัวเรือนขายรีไซเคิลเข้าระบบ · ได้ส่วนแบ่งกลับ · เกินกว่า กทม. baseline
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
                หน่วยงานที่ออกข้อบัญญัติก่อน — มีเวลาทดสอบระบบ · ขอ Smart City Award · ใช้เป็น showcase
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
                  ใช้ระบบ "ธงเขียว" — ครัวเรือนคัดแยกได้ติดธงเขียว จ่าย ≤10 ฿/เดือน · ลดขยะส่งกำจัดสุทธิ <strong>−92%</strong> ภายใน 11 ปี · ขนาดใกล้เคียงกับ อบต. / เทศบาลตำบลทั่วไป
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
              สิ่งที่ทำให้ระบบของเราต่างจาก BKK WASTE PAY: เพิ่ม Tier 10 ฿ (ขายรีไซเคิล) · Stratified random sampling 33% · Driver tracking + Sticker color gate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: '3-Tier Pricing', sub: '60 / 20 / 10 ฿', desc: 'อิงเพดานกฎกระทรวง + กทม. precedent · เพิ่ม Tier 10 ฿ revenue share สำหรับครัวเรือนที่ขายรีไซเคิลเข้าระบบ' },
              { title: 'Stratified Random Sampling', sub: '33% / รอบ', desc: 'ทุกบ้านถูกสุ่มเฉลี่ย 1 ครั้ง/ปี (±1) — ประมาณการลด storage รูป −67% · พนง. ทำงานเร็วขึ้น 3 เท่า' },
              { title: 'Driver App + GPS', sub: 'Field tracking', desc: 'tablet ในรถเก็บขยะ · บันทึกเก็บได้/ข้าม/ไม่คัดแยก · รถจอด 1 ครั้ง เก็บ 2 ฝั่ง · BKK WASTE PAY ไม่มี' },
              { title: 'Sticker Color Gate', sub: 'Visual enforcement', desc: 'ครัวเรือนจ่าย → ติดสติ๊กเกอร์ตามสี Tier · ไม่จ่าย = ไม่มีสติ๊กเกอร์ = รถข้าม (ปรับได้ตามนโยบายของแต่ละหน่วยงาน)' },
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
      <Section bg="soft" id="prototype">
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

      {/* ════════════════════ UI SHOWCASE ════════════════════ */}
      <Section bg="white" id="ui-showcase">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>หน้าจอระบบจริง</Eyebrow>
            <h2 className="font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
              UI ครบวงจร <span style={{ color: C.primary }}>Web & Mobile</span>
            </h2>
            <p className="max-w-[680px] mx-auto text-[16px] leading-relaxed" style={{ color: C.textMuted }}>
              ออกแบบมาเพื่อหน่วยงานท้องถิ่นโดยเฉพาะ — ใช้งานง่าย รองรับทุก Platform ทั้งหน้าจอผู้ดูแลระบบและประชาชน
            </p>
          </div>

          {/* ── Featured: Main Dashboard ─────────────────────────── */}
          <div className="mb-6 rounded-2xl overflow-hidden" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, boxShadow: '0 8px 32px rgba(31, 42, 36, 0.06)' }}>
            <div className="px-4 py-2.5 flex items-center gap-3 border-b" style={{ background: C.surface, borderColor: C.surfaceSoft }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold" style={{ background: C.primary, color: '#FFF' }}>อบต</div>
              <div className="flex-1">
                <div className="text-[12px] font-semibold" style={{ color: C.text }}>แผงควบคุมผู้ดูแลระบบ</div>
                <div className="text-[10px]" style={{ color: C.textMuted }}>The Digital Ledger · Officer Portal</div>
              </div>
              <span className="text-[10px] flex items-center gap-1.5" style={{ color: C.success }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.success }}></span>
                Live
              </span>
            </div>
            <div style={{ height: 559, overflow: 'hidden', position: 'relative', background: '#FFF' }}>
              <iframe
                src="ui/main_screen.html"
                title="Main Dashboard"
                loading="lazy"
                style={{ position: 'absolute', top: 0, left: 0, width: 1440, height: 860, transform: 'scale(0.65)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none' }}
              />
            </div>
          </div>

          {/* ── 3-col Desktop Screens ─────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { src: 'ui/bill_listing.html', label: 'จัดการรอบบิล', desc: 'สร้างและติดตามบิลทุกประเภท' },
              { src: 'ui/Daily_Bank_Reconclliation.html', label: 'กระทบยอดธนาคาร', desc: 'Daily Auto-Reconciliation' },
              { src: 'ui/phase_6_web.html', label: 'รายงานปฏิบัติงาน', desc: 'ติดตามรถเก็บขยะ GPS' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, boxShadow: '0 2px 8px rgba(31, 42, 36, 0.04)' }}>
                <div className="px-3 py-1.5 flex items-center gap-2 border-b" style={{ background: C.surface, borderColor: C.surfaceSoft }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.success }}></div>
                  <span className="text-[11px] font-medium" style={{ color: C.text }}>{s.label}</span>
                </div>
                <div style={{ height: 258, overflow: 'hidden', position: 'relative', background: '#FFF' }}>
                  <iframe
                    src={s.src}
                    title={s.label}
                    loading="lazy"
                    style={{ position: 'absolute', top: 0, left: 0, width: 1024, height: 860, transform: 'scale(0.30)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none' }}
                  />
                </div>
                <div className="px-3 py-2 border-t" style={{ background: C.surface, borderColor: C.surfaceSoft }}>
                  <p className="text-[11px] leading-tight" style={{ color: C.textMuted }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── 4-col Mobile Phones (LIFF + Field) ─────────────────────────── */}
          <div className="text-center mb-4">
            <span className="text-[12px] font-medium uppercase tracking-wider" style={{ color: C.textMuted, letterSpacing: '2px' }}>
              บนมือถือ — ประชาชน + เจ้าหน้าที่ภาคสนาม
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 justify-items-center">
            {[
              { src: 'ui/billing.html', label: 'ชำระค่าธรรมเนียม' },
              { src: 'ui/collection_notification.html', label: 'แจ้งเตือนประชาชน' },
              { src: 'ui/line_mini_app_notification_fee.html', label: 'LINE Mini App' },
              { src: 'ui/phase_6_mobile.html', label: 'รถเก็บขยะ (GPS)' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="rounded-[22px] overflow-hidden" style={{
                  width: 214,
                  height: 463,
                  border: `3px solid ${C.text}`,
                  boxShadow: '0 10px 30px rgba(31, 42, 36, 0.18)',
                  background: '#FFF',
                }}>
                  <div style={{ height: 463, overflow: 'hidden', position: 'relative' }}>
                    <iframe
                      src={s.src}
                      title={s.label}
                      loading="lazy"
                      style={{ position: 'absolute', top: 0, left: 0, width: 390, height: 844, transform: 'scale(0.549)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none' }}
                    />
                  </div>
                </div>
                <p className="text-[12px] mt-3 text-center font-medium" style={{ color: C.text }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* ── 2-col Registration Screens ─────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { src: 'ui/House_registration.html', label: 'ทะเบียนบ้านและประชาชน', desc: 'บันทึกและจัดการข้อมูลผู้เสียค่าธรรมเนียม' },
              { src: 'ui/Officer_registration.html', label: 'จัดการเจ้าหน้าที่', desc: 'ลงทะเบียนและกำหนดสิทธิ์เจ้าหน้าที่' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, boxShadow: '0 2px 8px rgba(31, 42, 36, 0.04)' }}>
                <div className="px-3 py-1.5 flex items-center gap-2 border-b" style={{ background: C.surface, borderColor: C.surfaceSoft }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.success }}></div>
                  <span className="text-[11px] font-medium" style={{ color: C.text }}>{s.label}</span>
                </div>
                <div style={{ height: 388, overflow: 'hidden', position: 'relative', background: '#FFF' }}>
                  <iframe
                    src={s.src}
                    title={s.label}
                    loading="lazy"
                    style={{ position: 'absolute', top: 0, left: 0, width: 1024, height: 860, transform: 'scale(0.451)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none' }}
                  />
                </div>
                <div className="px-3 py-2 border-t" style={{ background: C.surface, borderColor: C.surfaceSoft }}>
                  <p className="text-[11px]" style={{ color: C.textMuted }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footnote */}
          <div className="mt-6 text-center text-[11px]" style={{ color: C.textMuted }}>
            หน้าจอจริงจากระบบ · iframe scale ลงเพื่อพรีวิว · ขอ Demo เต็มจอได้จากปุ่ม "ขอใบเสนอราคา"
          </div>
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
              { q: '"หน่วยงานเล็กลงทุนแล้วคุ้มไหม?"', a: 'อบต. / เทศบาลตำบลขนาดใกล้เคียงกันขาดทุนประมาณการ 3M/ปีกับขยะ — ระบบช่วยให้กลับมาเก็บได้ครบ + ลดต้นทุนกำจัด → คืนทุนได้ในปีแรก (ตัวเลขขึ้นกับขนาดของหน่วยงาน)' },
              { q: '"ไม่มีพนักงาน IT"', a: 'เป็นระบบ SaaS — ไม่ต้องติดตั้ง server · ทีม support พูดไทย · ทีมงานและตัวแทนในพื้นที่ดูแลให้ตลอด' },
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
            หน่วยงานของท่าน — เก็บได้กี่ % ?
          </h2>
          <p className="text-[17px] leading-relaxed mb-10 text-white/70">
            เราสำรวจให้ฟรี ภายใน 2 สัปดาห์ — ดูว่าตัวเลขจริงของหน่วยงานท่านห่างจาก 15:1 เท่าไหร่ · ทั้ง อบต., เทศบาลตำบล, เทศบาลเมือง, เทศบาลนคร เลือกขอบเขตที่เหมาะกับขนาดของท่านได้
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="rounded-2xl p-6 text-left" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#9FE1CB' }}>Lite · หน่วยงานเล็ก</div>
              <div className="text-[28px] font-semibold text-white mb-1">≤ 1,500</div>
              <div className="text-[12px] text-white/60 mb-3">ครัวเรือน</div>
              <div className="text-[12px] text-white/70 leading-relaxed">Core + Sticker + Photo evidence — เริ่มทดลองได้เร็ว</div>
            </div>
            <div className="rounded-2xl p-6 text-left" style={{ background: 'rgba(255,255,255,0.10)', border: `2px solid ${C.primaryHover}` }}>
              <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#9FE1CB' }}>Standard · หน่วยงานกลาง ⭐</div>
              <div className="text-[28px] font-semibold text-white mb-1">1,500–4,000</div>
              <div className="text-[12px] text-white/60 mb-3">ครัวเรือน</div>
              <div className="text-[12px] text-white/70 leading-relaxed">+ Sorting verification + Cost Dashboard + LINE Mini App</div>
            </div>
            <div className="rounded-2xl p-6 text-left" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#9FE1CB' }}>Plus · หน่วยงานใหญ่ / ทน.</div>
              <div className="text-[28px] font-semibold text-white mb-1">&gt; 4,000</div>
              <div className="text-[12px] text-white/60 mb-3">ครัวเรือน</div>
              <div className="text-[12px] text-white/70 leading-relaxed">+ Custom Reports + บูรณาการระบบเดิม + Year 2 roadmap</div>
            </div>
          </div>

          <div className="text-[13px] text-white/50 mb-8 italic">
            * ราคาขึ้นกับขนาด/ขอบเขต — คุยปากเปล่าเพื่อหาจุดที่เหมาะกับงบประมาณของท่าน
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="mailto:mcctua2@gmail.com?subject=ขอสำรวจหน่วยงานของท่าน"
              className="inline-block text-[15px] font-medium px-6 py-3 rounded-lg no-underline"
              style={{ background: C.primaryHover, color: '#FFF' }}
            >
              ขอสำรวจฟรี
            </a>
            <a
              href="mailto:mcctua2@gmail.com?subject=ขอใบเสนอราคา%20ระบบเก็บค่าธรรมเนียมขยะ&body=สนใจขอใบเสนอราคาสำหรับหน่วยงานของท่าน%20%0A%0Aชื่อหน่วยงาน:%20%0Aจำนวนครัวเรือนโดยประมาณ:%20%0Aผู้ติดต่อ:%20%0Aเบอร์โทรศัพท์:%20"
              className="inline-block text-[15px] font-medium px-6 py-3 rounded-lg no-underline"
              style={{ background: 'transparent', color: '#FFF', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              ขอใบเสนอราคา
            </a>
          </div>

          <div className="mt-8 text-[12px] text-white/40 leading-relaxed">
            ตัวเลขประมาณการในหน้านี้อ้างจาก: กฎกระทรวง 2567 · BKK WASTE PAY (ก.พ. 2569) · เทศบาลตำบลนางแล (2553-2564) · NEA Singapore (ก.ค. 2024) · Yokohama G30 (2003-2013) · Kamikatsu Frontiers Review (2023) — ดูรายละเอียด source ใน Research Brief
          </div>
        </div>
      </Section>

    </div>
  );
}
