import React, { useState } from 'react';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// SolarStreetLight.jsx — โคมไฟถนนโซล่าเซลล์
// Design: Civic Trust palette + Sarabun
// Pain-first: หน่วยงาน + ผู้รับเหมา ที่ทำโครงการ อบต./เทศบาล
// Differentiators: Real Lumen + DIALux verified + มอก. 2954-2562 ระดับ C4
// All images = real installation work (เทศบาลเมืองสระบุรี + TOA Factory) — KEEP ALL
// Sources: internal DIALux evo report (Solar Street Light comparison)
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

const imgBase = 'images/solar/';

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

// ── Product Data — verified by DIALux evo (internal report) ────────────────
const products = [
  {
    model: 'SA-2A01',
    series: 'All-in-One',
    tagline: 'ติดตั้งง่าย ถนนหลัก/ทางหลวง',
    img: `${imgBase}product_sa2a01.webp`,
    specs: [
      { label: 'กำลังไฟแผงโซลาร์', value: '60W – 120W' },
      { label: 'ความสว่าง (Luminous Flux)', value: '6,000 – 15,000 lm' },
      { label: 'ประสิทธิภาพ LED', value: '199.5 lm/W' },
      { label: 'แบตเตอรี่ (LiFePO4)', value: '240WH – 640WH' },
      { label: 'ความสูงติดตั้ง', value: '6 – 10 เมตร' },
      { label: 'ระยะห่างเสา (DIALux)', value: '29 เมตร' },
      { label: 'สำรองไฟ (ฝนตก)', value: '5-7 วัน' },
      { label: 'การทนทาน', value: 'IP66 กันน้ำกันฝุ่น' },
    ],
    dialux: { Eav: '10.31', Uo: '0.40', spacing: '29', verdict: 'ผ่านเกณฑ์ C4' },
    highlight: '★ รุ่นแนะนำ — All-in-One ติดตั้งใน 5 นาที · ระยะห่างเสา 29 ม. กว้างที่สุดในกลุ่ม · ผ่านเกณฑ์ C4 (E_av 10.31 lx) · เหมาะกับถนนหลักและทางหลวงในต่างจังหวัด',
  },
  {
    model: 'SA-2A02',
    series: 'Modular',
    tagline: 'ความยืดหยุ่นสูง ถนนกว้าง/อุตสาหกรรม',
    img: `${imgBase}product_sa2a02.webp`,
    specs: [
      { label: 'กำลังไฟแผงโซลาร์', value: '40W – 160W' },
      { label: 'ความสว่าง (Luminous Flux)', value: '5,100 – 18,000 lm' },
      { label: 'ประสิทธิภาพ LED', value: '184.6 lm/W' },
      { label: 'แบตเตอรี่ (LiFePO4)', value: '160WH – 832WH' },
      { label: 'ความสูงติดตั้ง', value: '6 – 12 เมตร' },
      { label: 'ระยะห่างเสา (DIALux)', value: '23 เมตร' },
      { label: 'สำรองไฟ (ฝนตก)', value: '5-7 วัน' },
      { label: 'การจัดการความร้อน', value: 'ยอดเยี่ยม เหมาะอากาศร้อน' },
    ],
    dialux: { Eav: '15.10', Uo: '0.40', spacing: '23', verdict: 'ผ่านเกณฑ์ C4' },
    highlight: 'Modular ปรับแยกได้ — ความสว่าง 15.10 lx (เผื่อมาร์จินสูง) · เหมาะกับถนนกว้างหรืองานที่ต้องการระยะเสาถี่กว่า 23 ม.',
  },
  {
    model: 'SK-7A13',
    series: 'Split Type',
    tagline: 'ปรับแผงโซลาร์อิสระ 360°',
    img: `${imgBase}product_sk7a13.webp`,
    specs: [
      { label: 'กำลังไฟแผงโซลาร์', value: '60W – 85W' },
      { label: 'ความสว่าง', value: '3,400 – 4,800 lm' },
      { label: 'แบตเตอรี่ (LiFePO4)', value: '192WH – 256WH' },
      { label: 'ความสูงติดตั้ง', value: '5 – 8 เมตร' },
      { label: 'ปรับแผงโซลาร์', value: 'อิสระ 360°' },
      { label: 'เพิ่มประสิทธิภาพ', value: '+15% รับพลังงาน' },
    ],
    dialux: null,
    highlight: 'แผงโซลาร์เซลล์ปรับทิศทางได้อิสระ — เพิ่มประสิทธิภาพรับพลังงาน 15% · ตอบโจทย์พื้นที่จำกัดทิศแสงแดด',
  },
  {
    model: 'SK-7A14',
    series: 'Premium',
    tagline: 'ดีไซน์หรูหรา สวนสาธารณะ/รีสอร์ท',
    img: `${imgBase}product_sk7a14.webp`,
    specs: [
      { label: 'กำลังไฟแผงโซลาร์', value: '60W – 100W' },
      { label: 'ความสว่าง (Luminous Flux)', value: '4,100 – 9,000 lm' },
      { label: 'ประสิทธิภาพ LED', value: '193.6 lm/W' },
      { label: 'แบตเตอรี่ (LiFePO4)', value: '192WH – 384WH' },
      { label: 'ความสูงติดตั้ง', value: '6 – 10 เมตร' },
      { label: 'ระยะห่างเสา (DIALux)', value: '26 เมตร' },
      { label: 'วัสดุ', value: 'อลูมิเนียมเกรดมารีน' },
    ],
    dialux: { Eav: '10.18', Uo: '0.43', spacing: '26', verdict: 'ผ่านเกณฑ์ C4' },
    highlight: 'ดีไซน์พรีเมียม วัสดุเกรดมารีน (กันไอเกลือ) — ผ่านเกณฑ์ C4 + Uo 0.43 (สูงกว่ามาตรฐาน) · เหมาะกับสวนสาธารณะ รีสอร์ท ถนนเลียบชายหาด',
  },
];

// ── Main Page ───────────────────────────────────────────────────────────────
export default function SolarStreetLight() {
  return (
    <div className="civic-scope" style={{ background: C.surface }}>

      {/* ════════════════════ HERO — pain-first ════════════════════ */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden px-6 md:px-10 pb-16 md:pb-24" style={{ background: C.primaryDeep }}>
        <img
          src={`${imgBase}IMG_2589.jpeg`}
          alt="โคมไฟถนนโซล่าเซลล์ — ติดตั้งจริง"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 0%, ${C.primaryDeep}cc 70%, ${C.primaryDeep}ee 100%)` }}></div>
        <motion.div className="relative z-10 max-w-[1100px] mx-auto w-full" initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fadeUp}>
            <Eyebrow color="#9FE1CB">ผ่านเกณฑ์ มอก. 2954-2562 ระดับ C4 — ทุกตัวพิสูจน์ด้วย DIALux evo</Eyebrow>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-semibold mb-6 text-white"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.25 }}
          >
            <span className="block">โคมโซล่าเซลล์</span>
            <span className="block" style={{ color: '#9FE1CB' }}>ที่ผ่านการคำนวณจริง</span>
            <span className="block text-white/85" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 500, marginTop: '0.5rem' }}>— ไม่ใช่แค่ใบ Spec</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[18px] md:text-[20px] leading-relaxed max-w-[780px] mb-8 text-white/80">
            ในตลาดมีโคมโซล่าเซลล์ "วัตต์สูง" แต่<strong className="text-white"> Lumen ไม่จริง</strong> ของเราพิสูจน์ด้วยซอฟต์แวร์ <strong className="text-white">DIALux evo</strong> — มีไฟล์ IES/LDT ใช้เทียบ TOR งานราชการได้
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
            <Pill variant="success">มอก. 2954-2562 · C4</Pill>
            <Pill variant="muted">DIALux verified</Pill>
            <Pill variant="muted">IES / LDT files</Pill>
            <Pill variant="muted">ติดตั้งจริงในไทย</Pill>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <CTAButton primary onClick={() => document.getElementById('dialux')?.scrollIntoView({ behavior: 'smooth' })}>
              ดูผลคำนวณ DIALux
            </CTAButton>
            <CTAButton onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
              ดูรุ่นสินค้า
            </CTAButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════ STATS STRIP ════════════════════ */}
      <section className="px-6 md:px-10 py-12" style={{ background: '#FFF', borderBottom: `1px solid ${C.surfaceSoft}` }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="ผ่านมาตรฐาน" value="C4" sub="มอก. 2954-2562 · ทุกรุ่นที่นำเสนอ" accent={C.success} />
          <StatCard label="ประสิทธิภาพ LED" value="180–200 lm/W" sub="Real Lumen · ตรวจสอบได้ด้วย DIALux" accent={C.primary} />
          <StatCard label="สำรองไฟ (ฝนตก)" value="5-7 วัน" sub="LiFePO4 เกรด A · MPPT อัจฉริยะ" accent={C.primary} />
          <StatCard label="ผลงานติดตั้งจริง" value="2 โครงการ" sub="เทศบาลเมืองสระบุรี + TOA Factory" accent={C.accent} />
        </div>
      </section>

      {/* ════════════════════ THE STANDARDS (professional + knowledge) ════════════════════ */}
      <Section bg="cream" id="standard">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <Eyebrow>การออกแบบที่ทำงานบนมาตรฐาน</Eyebrow>
            <h2 className="font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
              งานทุกชิ้นของเรา <span style={{ color: C.primary }}>อ้างอิงมาตรฐาน</span> · ตรวจสอบได้ในทุกขั้น
            </h2>
            <p className="max-w-[780px] mx-auto text-[16px] leading-relaxed" style={{ color: C.textMuted }}>
              ทีมวิศวกรของเราออกแบบทุกโครงการตามมาตรฐานสากลและไทย — ทั้ง <strong>มอก. 2954-2562</strong> สำหรับสมรรถนะการส่องสว่าง และ <strong>แบบมาตรฐานกรมทางหลวงชนบท</strong> สำหรับการติดตั้งจริง — เพื่อให้ผ่านการตรวจสอบและใช้เป็นหลักฐานเปรียบเทียบ TOR ได้ทุกครั้ง
            </p>
          </div>

          {/* TWO STANDARDS side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {/* TIS 2954-2562 */}
            <div className="rounded-2xl p-6" style={{ background: '#FFF', border: `2px solid ${C.primary}` }}>
              <div className="flex items-baseline justify-between mb-3">
                <Eyebrow color={C.primary}>มาตรฐานสมรรถนะการส่องสว่าง</Eyebrow>
                <Pill variant="primary">หลักในการคำนวณ</Pill>
              </div>
              <h3 className="text-[20px] font-semibold mb-2" style={{ color: C.text }}>มอก. 2954-2562</h3>
              <div className="text-[12px] mb-3" style={{ color: C.textMuted }}>
                ผลิตภัณฑ์อุตสาหกรรม · ระบบไฟฟ้าแสงสว่างถนน (อ้างอิง CIE 140 / EN 13201)
              </div>
              <p className="text-[13px] leading-relaxed mb-3" style={{ color: C.text }}>
                เป็นมาตรฐานที่ใช้<strong>กำหนดเกณฑ์ความสว่างที่ต้องผ่าน</strong> — ความสว่างเฉลี่ย (E_av) · ความสม่ำเสมอ (U_o) · ส่วนเพิ่มแสงแยงตา (f_TI) — แบ่งระดับชั้น <strong>C0 ถึง C5</strong> ตามประเภทถนน
              </p>
              <div className="text-[12px] leading-relaxed p-3 rounded-lg" style={{ background: C.surface, color: C.text }}>
                <strong style={{ color: C.primary }}>เราพิสูจน์ด้วย DIALux evo:</strong> ทุกผลิตภัณฑ์ของเรามีไฟล์ IES/LDT — คำนวณและเทียบ TOR ได้จริง ไม่ใช่แค่อ้างค่า Watt
              </div>
            </div>

            {/* กรมทางหลวงชนบท */}
            <div className="rounded-2xl p-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
              <div className="flex items-baseline justify-between mb-3">
                <Eyebrow color={C.accent}>มาตรฐานการติดตั้งจริง</Eyebrow>
                <Pill variant="accent">หลักในการก่อสร้าง</Pill>
              </div>
              <h3 className="text-[20px] font-semibold mb-2" style={{ color: C.text }}>กรมทางหลวงชนบท</h3>
              <div className="text-[12px] mb-3" style={{ color: C.textMuted }}>
                แบบมาตรฐานงานติดตั้งไฟฟ้าแสงสว่างบนถนน
              </div>
              <p className="text-[13px] leading-relaxed mb-3" style={{ color: C.text }}>
                เป็นแบบมาตรฐานที่<strong>กำหนดวิธีติดตั้ง</strong> — เสาไฟ · กิ่งโคม · ความสูง · ระยะห่างระหว่างเสา · มุมเงย — ให้สอดคล้องกับลักษณะถนนแต่ละประเภท
              </p>
              <div className="text-[12px] leading-relaxed p-3 rounded-lg" style={{ background: C.surface, color: C.text }}>
                <strong style={{ color: C.accent }}>เราติดตั้งตามแบบ:</strong> ทีมช่างของเราทำตามแบบกรมทางหลวงชนบท หรือแบบของหน่วยงานเจ้าของพื้นที่ — ผ่านการตรวจรับงานทุกครั้ง
              </div>
            </div>
          </div>

          {/* Why C4 for rural roads — professional framing */}
          <div className="rounded-2xl p-6 mb-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
            <Eyebrow color={C.success}>เหตุผลที่ TOR ของท่านมักกำหนดเกณฑ์ระดับ C4</Eyebrow>
            <p className="text-[14px] leading-relaxed mb-4" style={{ color: C.text }}>
              มอก. 2954-2562 แบ่งระดับการส่องสว่างถนนเป็น <strong>6 ระดับ (C0 → C5)</strong> ตามความเร็วและความซับซ้อนของจราจร
              ทีมวิศวกรของเราพิจารณาประเภทถนนของหน่วยงานในต่างจังหวัด — ทั้ง<strong>ถนนเลียบในชุมชน · ถนนทางเข้าหมู่บ้าน · ถนนสายรองในเขต อบต. / เทศบาล</strong> —
              ส่วนใหญ่จัดอยู่ในกลุ่มถนนความเร็วต่ำที่ตรงกับเกณฑ์ <strong style={{ color: C.success }}>ระดับ C4</strong>
            </p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.textMuted }}>
              ระดับ C4 เป็นจุดสมดุลระหว่าง <strong style={{ color: C.text }}>ความปลอดภัยตามมาตรฐานสากล</strong> + <strong style={{ color: C.text }}>ความเหมาะสมกับงบประมาณของหน่วยงานท้องถิ่น</strong> — เป็นเหตุผลที่ TOR ราชการในต่างจังหวัดส่วนใหญ่กำหนดเกณฑ์นี้เป็นขั้นต่ำ
            </p>
          </div>

          {/* C0-C5 scale — full explanation */}
          <div className="rounded-2xl overflow-hidden mb-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
            <div className="px-6 py-4 border-b" style={{ background: C.surface, borderColor: C.surfaceSoft }}>
              <div className="text-[14px] font-semibold" style={{ color: C.text }}>ระดับชั้นการส่องสว่าง C0 — C5 (ตามมาตรฐาน มอก. 2954-2562)</div>
              <div className="text-[12px]" style={{ color: C.textMuted }}>เลือกระดับตามประเภทถนน — ความสว่างเฉลี่ย (E_av) ขั้นต่ำต่างกัน</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr style={{ background: C.surface }}>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: C.text }}>ระดับ</th>
                    <th className="text-center py-3 px-3 font-semibold" style={{ color: C.text }}>E_av (ขั้นต่ำ)</th>
                    <th className="text-center py-3 px-3 font-semibold" style={{ color: C.text }}>U_o</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: C.text }}>ตัวอย่างประเภทถนน</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { c: 'C0', e: '50 lx', u: '0.40', desc: 'พื้นที่ขัดแย้งสูง · ทางแยกขนาดใหญ่ในเมือง · จราจรหนาแน่นมาก' },
                    { c: 'C1', e: '30 lx', u: '0.40', desc: 'ถนนสายหลัก · ทางด่วน · จราจรหนาแน่น ความเร็วสูง' },
                    { c: 'C2', e: '20 lx', u: '0.40', desc: 'ถนนสายหลักในเมือง · ทางแยก · ความเร็วปานกลาง' },
                    { c: 'C3', e: '15 lx', u: '0.40', desc: 'ถนนในเมืองทั่วไป · จราจรหนาแน่นปานกลาง' },
                    { c: 'C4', e: '10 lx', u: '0.40', desc: 'ถนนเลียบชุมชน · ถนนสายรองในต่างจังหวัด · ถนน อบต./เทศบาลตำบล', highlight: true },
                    { c: 'C5', e: '7.5 lx', u: '0.40', desc: 'ถนนซอยในชุมชน · ถนนตันที่มีจราจรน้อยมาก' },
                  ].map((row, i) => (
                    <tr key={i} className="border-t" style={{
                      borderColor: C.surfaceSoft,
                      background: row.highlight ? C.successSoft : '#FFF',
                    }}>
                      <td className="py-3 px-4 font-semibold" style={{ color: row.highlight ? '#3B6D11' : C.text }}>
                        {row.c}{row.highlight && <span className="ml-2 text-[10px] font-bold uppercase" style={{ color: C.success, letterSpacing: '0.5px' }}>★ ของท่าน</span>}
                      </td>
                      <td className="py-3 px-3 text-center font-semibold" style={{ color: row.highlight ? '#3B6D11' : C.text }}>{row.e}</td>
                      <td className="py-3 px-3 text-center" style={{ color: C.textMuted }}>≥ {row.u}</td>
                      <td className="py-3 px-4" style={{ color: row.highlight ? C.text : C.textMuted, fontWeight: row.highlight ? 500 : 400 }}>{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 border-t text-[11px] leading-relaxed" style={{ background: C.surface, borderColor: C.surfaceSoft, color: C.textMuted }}>
              <strong style={{ color: C.text }}>หมายเหตุ:</strong> ตัวเลขความสว่างเฉลี่ยเป็นเกณฑ์ <em>ขั้นต่ำ</em> · ทุกระดับใช้ U_o ≥ 0.40 เพื่อความสม่ำเสมอของแสง · ระดับเลขน้อย = สว่างมาก ระดับเลขมาก = สว่างน้อย
            </div>
          </div>

          {/* CIE R3 + Q0 explanation */}
          <div className="rounded-2xl p-6 mb-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
            <Eyebrow color={C.accent}>เกี่ยวกับ CIE R3 และค่าสะท้อนผิวถนน Q₀ = 0.07</Eyebrow>
            <p className="text-[14px] leading-relaxed mb-4" style={{ color: C.text }}>
              ผิวถนนสะท้อนแสงไม่เท่ากัน — มาตรฐาน CIE จึงแบ่ง<strong>ลักษณะผิวถนน</strong>เป็นชั้น R1 → R4
              เพื่อให้ซอฟต์แวร์คำนวณแสงสว่างได้ผลที่ตรงกับหน้างานจริง ทีมวิศวกรของเราเลือกใช้ค่าที่<strong>ตรงกับสภาพถนนของท่าน</strong>เสมอ
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="rounded-lg p-4" style={{ background: C.surface }}>
                <div className="text-[13px] font-semibold mb-1" style={{ color: C.text }}>CIE R3 — ผิวถนนแอสฟัลต์ปกติ</div>
                <div className="text-[12px] leading-relaxed" style={{ color: C.textMuted }}>
                  ผิวสีเข้ม · มีความหยาบ · สะท้อนแสงน้อย — เป็นลักษณะผิวถนน<strong>ส่วนใหญ่ในไทย</strong> ทั้งถนน อบต. · ถนนทางหลวงชนบท · ถนนเทศบาล
                </div>
              </div>
              <div className="rounded-lg p-4" style={{ background: C.surface }}>
                <div className="text-[13px] font-semibold mb-1" style={{ color: C.text }}>Q₀ = 0.07 — ค่าสะท้อนแสงเฉลี่ย</div>
                <div className="text-[12px] leading-relaxed" style={{ color: C.textMuted }}>
                  ค่ามาตรฐานสำหรับผิว CIE R3 ที่ใช้ในการคำนวณ DIALux — ค่ายิ่งต่ำหมายถึงผิวสะท้อนแสงน้อย โคมไฟที่นำเสนอจึงต้อง<strong>กระจายแสงได้ดี</strong>เพื่อชดเชย
                </div>
              </div>
            </div>
            <div className="text-[12px] leading-relaxed p-3 rounded-lg" style={{ background: C.accentSoft, color: C.text }}>
              <strong style={{ color: C.accent }}>การคำนวณอย่างมืออาชีพ:</strong> ทีมเรา<strong>ไม่เลือกค่าที่ทำให้ตัวเลขสวยเกินจริง</strong> (เช่น R1 ผิวอ่อน) — แต่ใช้ R3 / Q₀ = 0.07 ที่ตรงกับสภาพถนนแอสฟัลต์จริงของไทย เพื่อให้ผลการคำนวณ<strong>ใช้งานจริงได้</strong>เมื่อติดตั้ง
            </div>
          </div>

          {/* TIS 2954-2562 C4 detail spec */}
          <div className="rounded-2xl overflow-hidden mb-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
            <div className="px-6 py-4 border-b" style={{ background: C.successSoft, borderColor: C.surfaceSoft }}>
              <div className="text-[14px] font-semibold" style={{ color: '#3B6D11' }}>เกณฑ์ระดับ C4 — ที่ TOR ของท่านต้องผ่าน</div>
              <div className="text-[12px]" style={{ color: '#3B6D11', opacity: 0.8 }}>มอก. 2954-2562 · พื้นที่ขัดแย้งกัน</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[14px]">
                <tbody>
                  {[
                    { p: 'ความสว่างเฉลี่ย (E_av)', v: '≥ 10.00 lx', why: 'ค่าเฉลี่ยทั่วพื้นที่ใช้งาน' },
                    { p: 'ความสม่ำเสมอ (U_o)', v: '≥ 0.40', why: 'แสงไม่มืดเป็นจุดๆ — ความปลอดภัยในการขับขี่' },
                    { p: 'ส่วนเพิ่มขีดเริ่มเปลี่ยน (f_TI) — ความเร็วสูง/ปานกลาง', v: '≤ 15%', why: 'ลดแสงแยงตา (Glare) สำหรับผู้ขับขี่' },
                    { p: 'ส่วนเพิ่มขีดเริ่มเปลี่ยน (f_TI) — ความเร็วต่ำ/ต่ำมาก', v: '≤ 20%', why: 'ระดับ glare ที่ยอมรับได้สำหรับ C4' },
                  ].map((row, i) => (
                    <tr key={i} className="border-t" style={{ borderColor: C.surfaceSoft }}>
                      <td className="py-3 px-5" style={{ color: C.text }}>{row.p}</td>
                      <td className="py-3 px-3 text-center font-semibold whitespace-nowrap" style={{ color: C.success }}>{row.v}</td>
                      <td className="py-3 px-5 text-[12px]" style={{ color: C.textMuted }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Calculation Parameters */}
          <div className="rounded-2xl p-6 mb-6" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
            <div className="text-[14px] font-semibold mb-1" style={{ color: C.text }}>พารามิเตอร์การคำนวณ (Common Baseline สำหรับเปรียบเทียบ TOR)</div>
            <div className="text-[12px] mb-4" style={{ color: C.textMuted }}>ต้องใช้ค่าเดียวกันทุกผู้เสนอราคา เพื่อให้เปรียบเทียบได้ — กำหนดใน TOR อ้างอิงตาม มอก. 2954-2562</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-[13px]">
              {[
                { k: 'ค่าตัวประกอบการบำรุงรักษา (MF)', v: '0.80' },
                { k: 'ความกว้างถนน', v: '7 ม. (2 ช่องจราจร)' },
                { k: 'ความสูงติดตั้ง (Mounting Height)', v: '6 เมตร' },
                { k: 'รูปแบบติดตั้ง', v: 'ด้านเดียว (Single Side)' },
                { k: 'ผิวถนน', v: 'แอสฟัลต์ CIE R3 · Q₀ = 0.07' },
                { k: 'มุมเงย (Boom Inclination)', v: '≥ 20° (worst-case)' },
                { k: 'ระยะยื่นโคม (Light Overhang)', v: '0.5 ม. + Boom 0/2 ม.' },
                { k: 'ระยะห่างเสา (Pole Distance)', v: 'คำนวณตามรุ่นที่เสนอ' },
              ].map((row, i) => (
                <div key={i} className="flex justify-between gap-3 py-2 border-b" style={{ borderColor: C.surfaceSoft, color: C.text }}>
                  <span style={{ color: C.textMuted }}>{row.k}</span>
                  <span className="font-medium text-right">{row.v}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Section>

      {/* ════════════════════ DIALUX RESULTS — Main Comparison Table ════════════════════ */}
      <Section bg="white" id="dialux">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <Eyebrow color={C.accent}>ผลการคำนวณ DIALux evo</Eyebrow>
            <h2 className="font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
              <span style={{ color: C.success }}>3 รุ่นผ่านเกณฑ์ C4</span> ทุกตัว — ใช้พารามิเตอร์เดียวกันตาม TOR
            </h2>
            <p className="max-w-[780px] mx-auto text-[16px] leading-relaxed" style={{ color: C.textMuted }}>
              คำนวณบน DIALux evo · ใช้ MF 0.8 · ถนน 7 ม. · เสาสูง 6 ม. · CIE R3 · ติดตั้งด้านเดียว — ตรงตามเงื่อนไข TOR ราชการ
            </p>
          </div>

          {/* Result table */}
          <div className="rounded-2xl overflow-hidden mb-8" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, boxShadow: '0 4px 16px rgba(31, 42, 36, 0.04)' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] md:text-[14px]">
                <thead>
                  <tr style={{ background: C.surface }}>
                    <th className="text-left py-4 px-5 font-semibold" style={{ color: C.text }}>รุ่นสินค้า</th>
                    <th className="text-left py-4 px-3 font-semibold" style={{ color: C.text }}>ลักษณะ</th>
                    <th className="text-center py-4 px-3 font-semibold" style={{ color: C.text }}>ระยะเสา</th>
                    <th className="text-center py-4 px-3 font-semibold" style={{ color: C.text }}>E_av (lx)</th>
                    <th className="text-center py-4 px-3 font-semibold" style={{ color: C.text }}>U_o</th>
                    <th className="text-center py-4 px-5 font-semibold" style={{ color: C.text }}>ผลการประเมิน</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Standard row */}
                  <tr style={{ background: C.successSoft }}>
                    <td className="py-3 px-5 font-semibold" style={{ color: '#3B6D11' }}>เกณฑ์ มาตรฐาน C4</td>
                    <td className="py-3 px-3" style={{ color: C.textMuted }}>—</td>
                    <td className="py-3 px-3 text-center" style={{ color: C.textMuted }}>—</td>
                    <td className="py-3 px-3 text-center font-semibold" style={{ color: '#3B6D11' }}>≥ 10.00</td>
                    <td className="py-3 px-3 text-center font-semibold" style={{ color: '#3B6D11' }}>≥ 0.40</td>
                    <td className="py-3 px-5 text-center" style={{ color: C.textMuted }}>—</td>
                  </tr>
                  {/* Product rows */}
                  {[
                    { model: 'SA-2A01', desc: 'All-in-One', spacing: '29 ม.', Eav: '10.31', Uo: '0.40', star: true },
                    { model: 'SA-2A02', desc: 'Modular', spacing: '23 ม.', Eav: '15.10', Uo: '0.40' },
                    { model: 'SK-7A14', desc: 'Premium', spacing: '26 ม.', Eav: '10.18', Uo: '0.43' },
                  ].map((row, i) => (
                    <tr key={i} className="border-t" style={{ borderColor: C.surfaceSoft, background: row.star ? C.surface : '#FFF' }}>
                      <td className="py-4 px-5">
                        <div className="font-semibold" style={{ color: C.text }}>{row.model}</div>
                        {row.star && <span className="text-[10px] font-bold uppercase ml-2" style={{ color: C.accent, letterSpacing: '0.5px' }}>★ แนะนำ</span>}
                      </td>
                      <td className="py-4 px-3" style={{ color: C.textMuted }}>{row.desc}</td>
                      <td className="py-4 px-3 text-center" style={{ color: C.text }}>{row.spacing}</td>
                      <td className="py-4 px-3 text-center font-semibold" style={{ color: C.text }}>{row.Eav}</td>
                      <td className="py-4 px-3 text-center font-semibold" style={{ color: C.text }}>{row.Uo}</td>
                      <td className="py-4 px-5 text-center">
                        <Pill variant="success">✓ ผ่านเกณฑ์</Pill>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t text-[11px]" style={{ background: C.surface, borderColor: C.surfaceSoft, color: C.textMuted }}>
              * คำนวณที่ความสูง 6 ม. · มุมเงย 15° · MF 0.80 · ติดตั้งด้านเดียว · ผิวถนน CIE R3
            </div>
          </div>

          {/* Why this matters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl p-6" style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}>
              <Eyebrow color={C.alert}>สิ่งที่สินค้าราคาถูกในตลาดมักทำ</Eyebrow>
              <ul className="space-y-2.5 text-[13px]" style={{ color: C.text }}>
                <li className="flex gap-2"><span style={{ color: C.alert }}>✕</span><span>โฆษณา Watt สูงเกินจริง — แต่ Lumen ต่ำมาก</span></li>
                <li className="flex gap-2"><span style={{ color: C.alert }}>✕</span><span>ไม่มีไฟล์ IES/LDT — คำนวณ DIALux ไม่ได้</span></li>
                <li className="flex gap-2"><span style={{ color: C.alert }}>✕</span><span>เลนส์ไม่ใช่ Bat-wing — แสงไม่สม่ำเสมอ U_o ต่ำ</span></li>
                <li className="flex gap-2"><span style={{ color: C.alert }}>✕</span><span>แบตเตอรี่ไม่ใช่ LiFePO4 — เสื่อมเร็ว</span></li>
              </ul>
            </div>

            <div className="rounded-2xl p-6" style={{ background: C.successSoft, border: `1px solid ${C.success}33` }}>
              <Eyebrow color="#3B6D11">สิ่งที่ของเราทำได้</Eyebrow>
              <ul className="space-y-2.5 text-[13px]" style={{ color: C.text }}>
                <li className="flex gap-2"><span style={{ color: C.success }}>✓</span><span><strong>Real Lumen</strong> — มีไฟล์ IES/LDT พิสูจน์ใน DIALux ได้จริง</span></li>
                <li className="flex gap-2"><span style={{ color: C.success }}>✓</span><span>ประสิทธิภาพ <strong>180-200 lm/W</strong> — ระดับสูงในตลาด</span></li>
                <li className="flex gap-2"><span style={{ color: C.success }}>✓</span><span>เลนส์ <strong>Bat-wing</strong> — กระจายแสงสม่ำเสมอ U_o ≥ 0.40</span></li>
                <li className="flex gap-2"><span style={{ color: C.success }}>✓</span><span>แบตเตอรี่ <strong>LiFePO4 เกรด A</strong> + MPPT อัจฉริยะ</span></li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ════════════════════ DESIGN HIGHLIGHTS (real installation results) ════════════════════ */}
      <Section bg="cream">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>ผลงานติดตั้งจริงที่ตรวจสอบได้</Eyebrow>
            <h2 className="font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
              ออกแบบเพื่อ <span style={{ color: C.primary }}>ประสิทธิภาพสูงสุด</span> · พิสูจน์แล้ว
            </h2>
          </div>

          {/* Stats row from internal data */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { n: '77.5%', l: 'ลดการใช้พลังงาน', sub: 'จาก 1,920W → 450W (ประมาณการ)', color: C.success },
              { n: '+100%', l: 'ความสว่างเฉลี่ย', sub: '40 ลักซ์ — สูงกว่ามาตรฐาน', color: C.primary },
              { n: 'U_o ≥ 0.40', l: 'ความสม่ำเสมอ', sub: 'ผ่านเกณฑ์ C4 ทุกรุ่น', color: C.primary },
              { n: '200 lm/W', l: 'ประสิทธิภาพ LED', sub: 'Real Lumen · ตรวจสอบได้', color: C.accent },
            ].map((s, i) => (
              <div key={i} className="rounded-xl p-5 text-center" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
                <div className="text-[24px] md:text-[28px] font-semibold leading-tight mb-1" style={{ color: s.color }}>{s.n}</div>
                <div className="text-[12px] font-medium mb-1" style={{ color: C.text }}>{s.l}</div>
                <div className="text-[10px] leading-relaxed" style={{ color: C.textMuted }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Use case — ลานจอดรถ · ทางเดิน · ป้อมยาม (มาตรฐาน 50 lux) */}
          <div className="rounded-2xl p-6 mb-10" style={{ background: C.accentSoft, border: `1px solid ${C.accent}33` }}>
            <Eyebrow color={C.accent}>กรณีงานนอกถนน — ลานจอดรถ · ทางเดิน · ป้อมยาม</Eyebrow>
            <p className="text-[14px] leading-relaxed mb-3" style={{ color: C.text }}>
              ทีมของเราออกแบบให้สอดคล้องกับ<strong>ลักษณะการใช้งานของแต่ละพื้นที่</strong> — สำหรับงานที่ไม่ใช่ถนน เช่น ลานจอดรถหรือทางเดิน
              ใช้มาตรฐานตาม<strong> ประกาศกรมสวัสดิการและคุ้มครองแรงงาน</strong> ซึ่งกำหนดเกณฑ์<strong>ความสว่างเฉลี่ยขั้นต่ำ 50 ลักซ์</strong>เพื่อความปลอดภัย
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              {[
                { area: 'ลานจอดรถทั่วไป', lux: '≥ 50 Lux', sub: 'เกณฑ์มาตรฐาน' },
                { area: 'ทางเดิน / บันได', lux: '50–100 Lux', sub: 'ใกล้ทางเข้าควรสว่างกว่า' },
                { area: 'ป้อมยาม', lux: '≥ 50 Lux', sub: 'เพื่อการมองเห็นชัด' },
              ].map((a, i) => (
                <div key={i} className="rounded-lg p-3 text-center" style={{ background: '#FFF' }}>
                  <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: C.textMuted }}>{a.area}</div>
                  <div className="text-[18px] font-semibold" style={{ color: C.accent }}>{a.lux}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: C.textMuted }}>{a.sub}</div>
                </div>
              ))}
            </div>
            <div className="rounded-lg p-4" style={{ background: '#FFF' }}>
              <div className="flex items-baseline gap-2 mb-2">
                <Pill variant="success">✓ ผลงานติดตั้งจริง</Pill>
                <span className="text-[13px] font-semibold" style={{ color: C.text }}>โรงงาน TOA — ลานจอดรถ</span>
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
                โครงการลานจอดรถโรงงาน TOA ที่ทีมเราติดตั้ง <strong style={{ color: C.success }}>ผ่านเกณฑ์ ≥ 50 Lux</strong> ตามประกาศกรมสวัสดิการฯ —
                ครอบคลุมพื้นที่กว้าง สว่างสม่ำเสมอตลอดคืน · ระบบสำรองไฟ 5-7 วันในวันฝนตก ทำให้พนักงานและรถใช้พื้นที่ได้อย่างปลอดภัย
              </p>
            </div>
          </div>

          {/* Real install — TOA Factory 4 photos grid */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="rounded-xl overflow-hidden">
              <img src={`${imgBase}IMG_2582.jpeg`} alt="TOA Factory — กลางวัน" className="w-full h-52 object-cover" loading="lazy" />
            </div>
            <div className="rounded-xl overflow-hidden">
              <img src={`${imgBase}IMG_2587.jpeg`} alt="TOA Factory UNITHAI — กลางวัน" className="w-full h-52 object-cover" loading="lazy" />
            </div>
            <div className="rounded-xl overflow-hidden">
              <img src={`${imgBase}IMG_2644.jpeg`} alt="TOA Factory — กลางคืน" className="w-full h-52 object-cover" loading="lazy" />
            </div>
            <div className="rounded-xl overflow-hidden">
              <img src={`${imgBase}IMG_2649.jpeg`} alt="TOA Factory — กลางคืน" className="w-full h-52 object-cover" loading="lazy" />
            </div>
          </div>
          <p className="text-[12px] text-center mt-3" style={{ color: C.textMuted }}>
            📍 ผลงานติดตั้งจริง: โรงงาน TOA — ระบบไฟถนนโซลาร์ลานจอดรถ
          </p>
        </div>
      </Section>

      {/* ════════════════════ REFERENCE PROJECTS ════════════════════ */}
      <Section bg="white">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>โครงการอ้างอิง</Eyebrow>
            <h2 className="font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
              งานจริงทั้ง <span style={{ color: C.primary }}>ภาครัฐและเอกชน</span>
            </h2>
            <p className="max-w-[680px] mx-auto text-[16px] leading-relaxed" style={{ color: C.textMuted }}>
              ผลงานติดตั้งจริงที่สามารถลงพื้นที่ตรวจสอบได้
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project 1: เทศบาลเมืองสระบุรี */}
            <div className="rounded-2xl overflow-hidden" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
              <div className="grid grid-cols-2 gap-2 p-2">
                <div className="col-span-2 rounded-xl overflow-hidden">
                  <img src={`${imgBase}IMG_0775.jpeg`} alt="เทศบาลเมืองสระบุรี — ถนนไฟกินรี" className="w-full h-52 object-cover" loading="lazy" />
                </div>
                <div className="rounded-xl overflow-hidden">
                  <img src={`${imgBase}IMG_0777.jpeg`} alt="กินรี close-up" className="w-full h-36 object-cover" loading="lazy" />
                </div>
                <div className="rounded-xl overflow-hidden">
                  <img src={`${imgBase}IMG_2588.jpeg`} alt="TOA — ลานจอดรถกลางวัน" className="w-full h-36 object-cover" loading="lazy" />
                </div>
              </div>
              <div className="px-5 pb-5">
                <Pill variant="primary">ภาครัฐ</Pill>
                <h3 className="text-[20px] font-semibold mt-3 mb-2" style={{ color: C.text }}>เทศบาลเมืองสระบุรี</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: C.textMuted }}>
                  ไฟถนนโซลาร์ดีไซน์กินรี สะท้อนอัตลักษณ์ท้องถิ่น ติดตั้งบนถนนสายหลักในเขตเทศบาล — ผสานความสวยงามกับประสิทธิภาพพลังงานแสงอาทิตย์
                </p>
              </div>
            </div>

            {/* Project 2: TOA Factory */}
            <div className="rounded-2xl overflow-hidden" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
              <div className="grid grid-cols-2 gap-2 p-2">
                <div className="rounded-xl overflow-hidden">
                  <img src={`${imgBase}IMG_2582.jpeg`} alt="TOA Factory — กลางวัน" className="w-full h-36 object-cover" loading="lazy" />
                </div>
                <div className="rounded-xl overflow-hidden">
                  <img src={`${imgBase}IMG_2644.jpeg`} alt="TOA Factory — กลางคืน" className="w-full h-36 object-cover" loading="lazy" />
                </div>
                <div className="col-span-2 rounded-xl overflow-hidden">
                  <img src={`${imgBase}IMG_2649.jpeg`} alt="TOA Factory — บรรยากาศกลางคืน" className="w-full h-52 object-cover" loading="lazy" />
                </div>
              </div>
              <div className="px-5 pb-5">
                <Pill variant="accent">ภาคอุตสาหกรรม</Pill>
                <h3 className="text-[20px] font-semibold mt-3 mb-2" style={{ color: C.text }}>โรงงาน TOA</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: C.textMuted }}>
                  ระบบไฟถนนโซลาร์สำหรับลานจอดรถโรงงาน — ครอบคลุมพื้นที่กว้าง สว่างสม่ำเสมอตลอดคืน · ไม่ต้องเดินสายไฟ
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ════════════════════ PRODUCTS — 4 รุ่น ════════════════════ */}
      <Section bg="cream" id="products">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>รุ่นสินค้า</Eyebrow>
            <h2 className="font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
              เลือกรุ่นที่เหมาะสม — <span style={{ color: C.primary }}>ทุกรุ่นผ่านเกณฑ์ C4</span>
            </h2>
            <p className="max-w-[680px] mx-auto text-[16px] leading-relaxed" style={{ color: C.textMuted }}>
              4 รุ่นเลือกตามขนาดถนน · งบประมาณ · ความต้องการพิเศษของโครงการ
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {products.map((p, i) => (
              <div key={i} className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}>
                <div className="rounded-2xl overflow-hidden md:[direction:ltr]" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
                  <img src={p.img} alt={p.model} className="w-full" loading="lazy" />
                </div>
                <div className="md:[direction:ltr]">
                  <Eyebrow color={C.primary}>{p.series}</Eyebrow>
                  <h3 className="text-[28px] md:text-[32px] font-semibold leading-tight mb-1" style={{ color: C.text }}>{p.model}</h3>
                  <p className="text-[15px] mb-5" style={{ color: C.textMuted }}>{p.tagline}</p>

                  {/* DIALux verdict */}
                  {p.dialux && (
                    <div className="rounded-lg p-3 mb-5 flex flex-wrap gap-3 items-center" style={{ background: C.successSoft, border: `1px solid ${C.success}33` }}>
                      <Pill variant="success">✓ DIALux Verified</Pill>
                      <span className="text-[12px]" style={{ color: C.text }}>
                        E_av <strong>{p.dialux.Eav} lx</strong> · U_o <strong>{p.dialux.Uo}</strong> · ระยะเสา <strong>{p.dialux.spacing} ม.</strong>
                      </span>
                    </div>
                  )}

                  <table className="w-full text-[13px] mb-5">
                    <tbody>
                      {p.specs.map((s, j) => (
                        <tr key={j} className="border-b" style={{ borderColor: C.surfaceSoft }}>
                          <td className="py-2.5 pr-3 w-[45%]" style={{ color: C.textMuted }}>{s.label}</td>
                          <td className="py-2.5 font-semibold" style={{ color: C.text }}>{s.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="rounded-lg p-3 text-[13px] leading-relaxed" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, color: C.text }}>
                    <span className="font-semibold" style={{ color: C.primary }}>จุดเด่น: </span>{p.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════ COMPARISON ════════════════════ */}
      <Section bg="white">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <Eyebrow>เปรียบเทียบรุ่นสินค้า</Eyebrow>
            <h2 className="font-semibold leading-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
              เลือกรุ่นที่ใช่
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
            <table className="w-full min-w-[700px] text-[13px] md:text-[14px]">
              <thead>
                <tr style={{ background: C.surface }}>
                  <th className="text-left py-4 px-4 font-semibold" style={{ color: C.text }}>คุณสมบัติ</th>
                  <th className="text-center py-4 px-3 font-semibold" style={{ background: C.successSoft, color: '#3B6D11' }}>SA-2A01 ★</th>
                  <th className="text-center py-4 px-3 font-semibold" style={{ color: C.text }}>SA-2A02</th>
                  <th className="text-center py-4 px-3 font-semibold" style={{ color: C.text }}>SK-7A13</th>
                  <th className="text-center py-4 px-3 font-semibold" style={{ color: C.text }}>SK-7A14</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Series', vals: ['All-in-One', 'Modular', 'Split Type', 'Premium'] },
                  { label: 'กำลังไฟ', vals: ['60-120W', '40-160W', '60-85W', '60-100W'] },
                  { label: 'Lumen', vals: ['6,000-15,000', '5,100-18,000', '3,400-4,800', '4,100-9,000'] },
                  { label: 'Efficacy', vals: ['199.5 lm/W', '184.6 lm/W', '—', '193.6 lm/W'] },
                  { label: 'DIALux E_av', vals: ['10.31 lx', '15.10 lx', '—', '10.18 lx'] },
                  { label: 'ความสูง', vals: ['6-10 ม.', '6-12 ม.', '5-8 ม.', '6-10 ม.'] },
                  { label: 'มอก. C4', vals: ['✓', '✓', 'TBD', '✓'] },
                  { label: 'เหมาะกับ', vals: ['ถนนหลัก/ทางหลวง', 'ถนนกว้าง/อุตฯ', 'ที่จำกัดทิศแสงแดด', 'พรีเมียม/มารีน'] },
                ].map((row, i) => (
                  <tr key={i} className="border-t" style={{ borderColor: C.surfaceSoft }}>
                    <td className="py-3 px-4 font-semibold" style={{ color: C.text }}>{row.label}</td>
                    {row.vals.map((v, j) => (
                      <td key={j} className="py-3 px-3 text-center"
                        style={{
                          color: v === '✓' ? C.success : v === 'TBD' ? C.textMuted : C.text,
                          background: j === 0 ? C.successSoft : 'transparent',
                          fontWeight: v === '✓' ? 700 : 400,
                        }}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-[12px] mt-4" style={{ color: C.textMuted }}>
            ★ SA-2A01 (All-in-One) = แนะนำสำหรับงานทั่วไป — ติดตั้งง่ายภายใน 5 นาที · ระยะเสา 29 ม. กว้างที่สุด · ผ่านเกณฑ์ C4 (E_av 10.31 lx) · เหมาะกับถนนหลัก/ทางเลียบและงานที่ต้องการความเร็วในการติดตั้ง
          </p>
        </div>
      </Section>

      {/* ════════════════════ END-TO-END SERVICE ════════════════════ */}
      <Section bg="cream">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <Eyebrow>บริการครบวงจร</Eyebrow>
              <h2 className="font-semibold leading-tight mb-5" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.text }}>
                End-to-End Service
              </h2>
              <p className="text-[16px] leading-relaxed mb-6" style={{ color: C.textMuted }}>
                ตั้งแต่การออกแบบแสงสว่างฟรี (DIALux) ไปจนถึงการติดตั้งและการสนับสนุนหลังการขาย — ทุกขั้นตอนทำเองในไทย
              </p>
              <div className="space-y-3">
                {[
                  { t: 'ออกแบบแสงสว่างฟรี', d: 'ทีมวิศวกรคำนวณด้วย DIALux evo ตามมาตรฐานที่ TOR กำหนด — ไม่มีค่าใช้จ่าย' },
                  { t: 'ผู้ผลิต/ตัวแทนโดยตรง', d: 'ราคาดี คุณภาพมั่นใจ ไม่ผ่านตัวแทนหลายชั้น' },
                  { t: 'สนับสนุนเทคนิค', d: 'ทีมงานพร้อมช่วยแก้ปัญหาตลอดโครงการ — ทั้งก่อนติดตั้งและหลังส่งมอบ' },
                  { t: 'มาตรฐานรับรอง', d: 'ทุกผลิตภัณฑ์ผ่านการรับรอง LM-79, LM-80 และ มอก. 1955-2551' },
                ].map((s, i) => (
                  <div key={i} className="flex gap-3 items-start rounded-lg p-3" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
                    <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: C.successSoft, color: C.success }}>✓</div>
                    <div>
                      <div className="text-[14px] font-semibold" style={{ color: C.text }}>{s.t}</div>
                      <div className="text-[12px] mt-0.5" style={{ color: C.textMuted }}>{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden mb-3" style={{ border: `1px solid ${C.surfaceSoft}` }}>
                <img src={`${imgBase}IMG_2648.jpeg`} alt="TOA Factory — ระบบแสงสว่างกลางคืน" className="w-full object-cover" loading="lazy" />
              </div>
              <p className="text-center text-[12px]" style={{ color: C.textMuted }}>📍 ผลงาน: โรงงาน TOA — ลานจอดรถ</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ════════════════════ DOWNLOAD ════════════════════ */}
      <Section bg="white">
        <div className="max-w-[640px] mx-auto text-center">
          <Eyebrow>เอกสารสำหรับงาน TOR</Eyebrow>
          <h2 className="font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(24px, 3vw, 34px)', color: C.text }}>
            ดาวน์โหลดข้อมูลโบรชัวร์
          </h2>
          <p className="text-[14px] mb-6" style={{ color: C.textMuted }}>
            ผลคำนวณ DIALux evo ฉบับเต็มและไฟล์ IES/LDT ส่งให้เฉพาะลูกค้าที่ขอใบเสนอราคา
          </p>

          <div className="rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, boxShadow: '0 2px 8px rgba(31, 42, 36, 0.04)' }}>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: C.surfaceSoft }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="14 2 14 8 20 8" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <div className="text-[14px] font-semibold" style={{ color: C.text }}>Solar Street Light Solutions</div>
              <div className="text-[12px]" style={{ color: C.textMuted }}>โบรชัวร์ครบทุก Series · 1.5 MB · PDF</div>
            </div>
            <a
              href="downloads/Solar_Street_Light_Solutions.pdf"
              download
              className="text-[13px] font-semibold px-5 py-2.5 rounded-lg no-underline flex items-center gap-2"
              style={{ background: C.primary, color: '#FFF' }}
            >
              ดาวน์โหลด PDF
            </a>
          </div>
        </div>
      </Section>

      {/* ════════════════════ CTA — dark ════════════════════ */}
      <Section bg="deep">
        <div className="max-w-[800px] mx-auto text-center">
          <Eyebrow color="#9FE1CB">ขั้นตอนต่อไป</Eyebrow>
          <h2 className="font-semibold leading-tight mb-5 text-white" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}>
            พร้อมเริ่มโครงการของท่านแล้ว?
          </h2>
          <p className="text-[17px] leading-relaxed mb-10 text-white/70">
            ส่ง TOR หรือพื้นที่หน้างานมาให้เรา — เราจะออกแบบแสงสว่าง DIALux ให้ฟรี · ใช้ยื่นเปรียบเทียบ TOR ได้ทันที
          </p>

          <div className="text-[13px] text-white/50 mb-8 italic">
            * รายละเอียดและราคาขึ้นกับขนาด/ขอบเขต — คุยปากเปล่าเพื่อหาจุดที่เหมาะกับงบประมาณของท่าน
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="mailto:mcctua2@gmail.com?subject=ขอออกแบบ%20DIALux%20ฟรี%20—%20Solar%20Street%20Light&body=สนใจให้ออกแบบ%20DIALux%20สำหรับโครงการของท่าน%0A%0Aชื่อหน่วยงาน%20%2F%20โครงการ:%20%0Aขนาดถนน%20%2F%20จำนวนต้นไฟ:%20%0Aผู้ติดต่อ:%20%0Aเบอร์โทรศัพท์:%20%0A%0ATOR%20หรือผังพื้นที่%20(ถ้ามี):"
              className="inline-block text-[15px] font-medium px-6 py-3 rounded-lg no-underline"
              style={{ background: C.primaryHover, color: '#FFF' }}
            >
              ขอออกแบบ DIALux ฟรี
            </a>
            <a
              href="mailto:mcctua2@gmail.com?subject=ขอใบเสนอราคา%20Solar%20Street%20Light"
              className="inline-block text-[15px] font-medium px-6 py-3 rounded-lg no-underline"
              style={{ background: 'transparent', color: '#FFF', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              ขอใบเสนอราคา
            </a>
          </div>

          <div className="mt-8 text-[12px] text-white/40 leading-relaxed">
            มาตรฐานอ้างอิง: มอก. 2954-2562 · IES LM-79/80 · มอก. 1955-2551 · CIE 140 · EN 13201 · DIALux evo · ผลคำนวณฉบับเต็มและไฟล์ IES/LDT มอบให้เฉพาะลูกค้าหลังคุยรายละเอียด
          </div>
        </div>
      </Section>

    </div>
  );
}
