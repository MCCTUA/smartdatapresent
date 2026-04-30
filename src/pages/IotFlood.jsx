import React from 'react';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// IotFlood.jsx — Product 6: IoT + AI ระบบเตือนน้ำท่วม + วิเคราะห์แนวโน้ม
// Design: Civic Trust palette (Forest #0F6E56 + Cream #FAF7EE + Amber #BA7517)
// Font: Sarabun
// Pain-first storytelling: "ปีที่แล้วท่วมที่ไหน?" → 3 pain segments → 3-layer
//   solution → 3 หลักการ → comparison vs existing systems → Smart City bonus
// Pricing: NOT in this page — sales discusses verbally
// Feedback: NOT in this page — sales collects in person
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
  // IOT-FLOOD signature blue (used sparingly, only for water-themed accents)
  water: '#2E7BA8',
  waterSoft: '#E5F0F7',
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
  const bgMap = {
    cream: C.surface,
    soft: C.surfaceSoft,
    deep: C.primaryDeep,
    white: '#FFFFFF',
    alert: C.alertSoft,
  };
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
    water: { bg: C.waterSoft, color: C.water },
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

function CTAButton({ children, primary = false, onClick, href }) {
  const sharedStyle = primary
    ? { background: C.primary, color: '#FFF', border: 'none' }
    : { background: 'transparent', color: C.primary, border: `1px solid ${C.primary}` };
  const className = 'text-[15px] font-medium px-6 py-3 rounded-lg cursor-pointer transition-all no-underline inline-block';

  const handleEnter = (e) => {
    if (primary) e.currentTarget.style.background = C.primaryHover;
    else { e.currentTarget.style.background = C.primary; e.currentTarget.style.color = '#FFF'; }
  };
  const handleLeave = (e) => {
    if (primary) e.currentTarget.style.background = C.primary;
    else { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.primary; }
  };

  if (href) {
    return (
      <a href={href} className={className} style={sharedStyle} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={className} style={sharedStyle} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {children}
    </button>
  );
}

// ── icons ───────────────────────────────────────────────────────────────────
function IconRain({ color = '#FFF', size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M14 22a8 8 0 1116 0c4 0 6 2 6 5s-2 5-6 5H14c-3 0-5-2-5-5s2-5 5-5z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M16 38l-2 4M24 38l-2 4M32 38l-2 4" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
function IconDrain({ color = '#FFF', size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="20" width="32" height="14" rx="2" stroke={color} strokeWidth="2.2" />
      <path d="M14 20v-6h20v6M16 26h2M22 26h2M28 26h2" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="34" cy="29" r="1.5" fill={color} />
    </svg>
  );
}
function IconMountain({ color = '#FFF', size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M6 38l10-16 8 12 6-8 12 12H6z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M14 30l3-2 4 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IconSensor({ color = '#FFF', size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="18" y="8" width="12" height="20" rx="2" stroke={color} strokeWidth="2.2" />
      <path d="M22 14h4M22 18h4M22 22h4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 36c2-2 6-2 10-2s8 0 10 2" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M10 40c4-3 9-3 14-3s10 0 14 3" stroke={color} strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
      <path d="M24 28v6" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
function IconBrain({ color = '#FFF', size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M16 14a6 6 0 016-6h4a6 6 0 016 6v4a4 4 0 010 8v4a6 6 0 01-6 6h-4a6 6 0 01-6-6v-4a4 4 0 010-8v-4z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M24 14v22M20 18h-2M28 18h2M20 30h-2M28 30h2" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconLine({ color = '#FFF', size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M10 14h28a4 4 0 014 4v12a4 4 0 01-4 4H22l-8 6v-6h-4a4 4 0 01-4-4V18a4 4 0 014-4z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M16 22h16M16 26h10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconWave({ color = '#FFF', size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M6 26c4-4 8-4 12 0s8 4 12 0 8-4 12 0M6 34c4-4 8-4 12 0s8 4 12 0 8-4 12 0" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 14l4-4 4 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="px-6 md:px-10 pt-16 pb-20 md:pt-20 md:pb-24"
      style={{
        background: `linear-gradient(135deg, ${C.primaryDeep} 0%, #134B40 45%, #1A5C70 100%)`,
        color: '#FFF',
      }}
    >
      <motion.div
        className="max-w-[1100px] mx-auto"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="mb-5">
          <span
            className="inline-flex items-center text-[12px] font-medium px-3 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.12)', color: '#A8DCEA', letterSpacing: '0.5px' }}
          >
            สำหรับ อบต. · เทศบาล · อบจ. ที่เผชิญน้ำท่วมซ้ำซาก
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-semibold mb-6"
          style={{ fontSize: 'clamp(34px, 5.2vw, 58px)', lineHeight: 1.2 }}
        >
          <span className="block">ปีที่แล้ว <span style={{ color: '#A8DCEA' }}>น้ำท่วมที่ไหน</span> ของเทศบาลครับ?</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-[18px] md:text-[20px] leading-relaxed max-w-[760px] mb-8"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          ฝนตก 1 ชั่วโมง — ชาวบ้านโทรเข้ามาตลอดคืน · ส่งเจ้าหน้าที่ขับรถออกไปดูเอง · พอน้ำลด <strong className="text-white">ก็ไม่รู้ว่าครั้งหน้าจะท่วมที่ไหนอีก</strong>
          <br />
          เราออกแบบระบบให้เห็นน้ำขึ้นก่อนถึงชุมชน · ส่ง <strong className="text-white">LINE</strong> เข้ามือถือท่าน + ผู้นำชุมชนโดยตรง
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-9">
          <Pill variant="muted">ติดเซ็นเซอร์เฉพาะจุดที่ท่านเลือก</Pill>
          <Pill variant="muted">ใช้ CCTV ของเทศบาลที่มีอยู่ได้</Pill>
          <Pill variant="muted">LINE เด้งหาผู้นำชุมชนโดยตรง</Pill>
        </motion.div>

        <motion.div variants={fadeUp} className="flex gap-3 flex-wrap">
          <CTAButton
            primary
            href="mailto:mcctua2@gmail.com?subject=สนใจคุยเรื่องระบบเตือนน้ำท่วม&body=เรียนทีมงาน%0A%0Aชื่อหน่วยงาน:%20%0Aผู้ติดต่อ:%20%0Aตำแหน่ง:%20%0Aเบอร์โทร:%20%0A%0Aปัญหาน้ำท่วมที่เผชิญ:%20"
          >
            อยากคุยกับทีม
          </CTAButton>
          <CTAButton
            href="#how"
          >
            ดูหลักการที่เราใช้
          </CTAButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── PAIN ─────────────────────────────────────────────────────────────────────
const PAINS = [
  {
    icon: <IconDrain color="#FFF" />,
    bg: '#3D2B0F',
    eyebrow: 'น้ำท่วมในเขตเมือง',
    title: 'ฝน 1 ชั่วโมง — ท่วมขังหลายจุด',
    body: 'ท่อระบายอุดด้วยขยะ · ถนนสายหลักรอระบาย · ชาวบ้านโทรร้องเรียนต่อเนื่อง · ไม่รู้ว่าจุดไหนท่วมก่อน',
    evidenceLabel: 'อ้างอิงเหตุการณ์',
    evidence: 'ชลบุรี ก.ย. 2568 — 4 อำเภอ 13 ตำบล 37 ชุมชน 16 เส้นทางได้รับผลกระทบ',
  },
  {
    icon: <IconWave color="#FFF" />,
    bg: '#0E2540',
    eyebrow: 'น้ำท่วมจากแม่น้ำ/ลำคลอง',
    title: 'น้ำเหนือมา — ท่วมซ้ำซากปีละ 1-2 ครั้ง',
    body: 'แม่น้ำล้นตลิ่ง · ตัดสินใจอพยพช้า · เจ้าหน้าที่ต้องเฝ้าระดับน้ำเองตลอดคืน · ไม่มีตัวเลขวัดได้',
    evidenceLabel: 'อ้างอิงเหตุการณ์',
    evidence: 'ลำปาง ก.ย. 2567 — แม่น้ำวังล้น "หนักสุดในรอบเกือบ 50 ปี" ระดับน้ำสูงกว่า 1 ม.',
  },
  {
    icon: <IconMountain color="#FFF" />,
    bg: '#1E3A2A',
    eyebrow: 'น้ำหลาก/ดินถล่มในพื้นที่ภูเขา',
    title: 'ฝนบนภูเขา — น้ำมาในไม่กี่ชั่วโมง',
    body: 'พื้นที่ลุ่มต่ำหรือเชิงเขามีเวลาเตรียมตัวน้อย · เตือนล่วงหน้า 30 นาทีก็ช่วยชีวิตได้ · ไม่มีเครื่องมือวัดในจุดเสี่ยง',
    evidenceLabel: 'อ้างอิงเหตุการณ์',
    evidence: 'ลำปาง 2567 — ห้างฉัตร · ปงยางคก · เขลางค์ทอง ผู้ว่าฯ สั่งเฝ้าระวังพื้นที่ลาดเชิงเขา',
  },
];

function PainSection() {
  return (
    <Section bg="cream" id="pain">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Eyebrow color={C.alert}>3 รูปแบบที่ อปท. ต้องรับมือ</Eyebrow>
          <h2
            className="font-semibold mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: C.text, lineHeight: 1.3 }}
          >
            <span className="block">แต่ละ อปท.</span>
            <span className="block">เผชิญน้ำคนละแบบ</span>
          </h2>
          <p className="text-[15.5px] leading-relaxed" style={{ color: C.textMuted }}>
            ก่อนเสนอเครื่องมือ — เราอยากเข้าใจก่อนว่าน้ำของท่านเป็นแบบไหน
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PAINS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}
            >
              <div
                className="flex items-center justify-center"
                style={{ height: 140, background: p.bg }}
              >
                <div style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>
                  {p.icon}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-[11px] font-semibold uppercase mb-2" style={{ color: C.alert, letterSpacing: '1.5px' }}>
                  {p.eyebrow}
                </p>
                <h3 className="text-[19px] font-semibold mb-3" style={{ color: C.text, lineHeight: 1.3 }}>
                  {p.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed mb-4 flex-1" style={{ color: C.textMuted }}>
                  {p.body}
                </p>
                <div
                  className="text-[12px] leading-relaxed pt-3"
                  style={{ color: C.textMuted, borderTop: `1px solid ${C.surfaceSoft}` }}
                >
                  <span className="font-semibold" style={{ color: C.text }}>
                    {p.evidenceLabel}:{' '}
                  </span>
                  {p.evidence}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-[12.5px] text-center mt-8 italic" style={{ color: C.textMuted }}>
          เหตุการณ์ที่อ้างอิงรายงานโดยสื่อสาธารณะ (Ch7, Thairath, ThaiPBS, Bangkokbiznews ก.ย. 2567 / ก.ย. 2568) — ไม่ใช่ข้อมูลภายในของหน่วยงาน
        </p>
      </div>
    </Section>
  );
}

// ── 3-LAYER SOLUTION ─────────────────────────────────────────────────────────
const LAYERS = [
  {
    n: '01',
    icon: <IconSensor color={C.water} size={36} />,
    title: 'SENSE — เห็นน้ำที่กำลังขึ้น',
    body: 'ติดเซ็นเซอร์วัดระดับน้ำในจุดที่เทศบาลเป็นห่วง (ท่อระบาย · คลอง · ใต้สะพาน · จุดท่วมซ้ำ) + เชื่อมกับ CCTV ของเทศบาลที่มีอยู่แล้ว · วัดค่าทุก 5 นาที · ส่งข้อมูลผ่าน LoRaWAN/4G · ไม่ต้องลากสาย',
    points: [
      'เซ็นเซอร์ผ่านมาตรฐาน IP65/67 — กันฝน กันแดด',
      'พลังงานจากโซล่าเซลล์ + แบตเตอรี่ — ไม่ต้องต่อไฟ',
      'ใช้กล้อง CCTV ของเทศบาลที่ติดอยู่ได้เลย',
    ],
  },
  {
    n: '02',
    icon: <IconBrain color={C.water} size={36} />,
    title: 'DECIDE — ระบบประมวลผลให้ก่อน',
    body: 'AI วิเคราะห์ข้อมูลจากเซ็นเซอร์ + ภาพ CCTV + ปริมาณฝน · ตัดสินใจให้ว่า "จุดไหนกำลังเข้าโหมดเสี่ยง" · ใช้นานยิ่งแม่น เพราะระบบเรียนรู้รูปแบบของแต่ละ อปท. โดยเฉพาะ',
    points: [
      'ระดับเตือน 3 ขั้น: ปกติ · เฝ้าระวัง · อันตราย',
      'ประมาณการล่วงหน้า 30 นาที – 6 ชั่วโมง (ขึ้นกับประเภทน้ำ)',
      'จำลองว่า "ถ้าฝนต่อไปอีก 30 นาที — จุด X จะท่วมที่ระดับเท่าไร"',
    ],
  },
  {
    n: '03',
    icon: <IconLine color={C.water} size={36} />,
    title: 'NOTIFY — ผู้ที่ต้องรู้ ได้รู้ทันที',
    body: 'ส่งแจ้งเตือนไปที่นายก/ปลัด/หน.ป้องกัน + ประธานชุมชน + ผู้ใหญ่บ้านในพื้นที่เสี่ยง · ผ่าน LINE ที่ทุกคนใช้กันอยู่ · มี dashboard ให้ดูภาพรวมตลอดคืนได้',
    points: [
      'LINE OA Group — ส่งทุกคนพร้อมกัน',
      'Dashboard บนเบราว์เซอร์ — ดูจากที่ไหนก็ได้',
      'ป้าย LED ในชุมชน (เลือกได้) — เตือนชาวบ้านโดยตรง',
    ],
  },
];

function SolutionSection() {
  return (
    <Section bg="white" id="how">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Eyebrow color={C.water}>วิธีที่เราแก้ปัญหา</Eyebrow>
          <h2
            className="font-semibold mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: C.text, lineHeight: 1.3 }}
          >
            <span className="block">3 ชั้นทำงานต่อเนื่อง</span>
            <span className="block">เห็น → ตัดสิน → แจ้ง</span>
          </h2>
          <p className="text-[15.5px] leading-relaxed" style={{ color: C.textMuted }}>
            ระบบแบ่งเป็น 3 ส่วนชัดเจน — เริ่มเฉพาะส่วนที่ท่านพร้อมก่อนได้ ไม่ต้องลงทุนทั้งหมดในครั้งเดียว
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {LAYERS.map((l, i) => (
            <motion.div
              key={l.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl p-7 flex flex-col"
              style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}
            >
              <div className="flex items-center justify-between mb-5">
                <span
                  className="text-[14px] font-semibold px-3 py-1 rounded-md"
                  style={{ background: C.waterSoft, color: C.water, letterSpacing: '1px' }}
                >
                  {l.n}
                </span>
                <div style={{ opacity: 0.95 }}>{l.icon}</div>
              </div>
              <h3 className="text-[20px] font-semibold mb-3" style={{ color: C.text, lineHeight: 1.3 }}>
                {l.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed mb-5" style={{ color: C.textMuted }}>
                {l.body}
              </p>
              <ul className="flex flex-col gap-2 mt-auto">
                {l.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2 text-[13px]" style={{ color: C.text }}>
                    <span className="mt-[7px] inline-block w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.water }} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ── 3 หลักการ ────────────────────────────────────────────────────────────────
const PRINCIPLES = [
  {
    title: 'หลักการที่ 1 — เซ็นเซอร์อยู่ในจุดที่ท่านเลือก ไม่ใช่จุดที่ระบบรัฐเลือก',
    body: 'สสน. และกรมชลประทานวัดระดับน้ำในแม่น้ำสายหลัก ซึ่งเป็นภาพประเทศ — แต่ "ซอย 12 ของเทศบาลท่าน" ไม่อยู่ในนั้น · เราติดเซ็นเซอร์ในจุดที่ท่านเป็นห่วงจริงๆ จะ 3 จุด หรือ 30 จุด ก็ออกแบบได้',
  },
  {
    title: 'หลักการที่ 2 — ใช้ของที่ท่านมีอยู่แล้วก่อน',
    body: 'ถ้าเทศบาลมี CCTV ติดตามแยกหรือคลองอยู่แล้ว — เราเอา AI มาดูภาพแทนคนเฝ้าจอ · ไม่ต้องซื้อกล้องใหม่ · เซ็นเซอร์ใหม่ติดเฉพาะจุดที่กล้องเข้าไม่ถึง',
  },
  {
    title: 'หลักการที่ 3 — ผู้นำชุมชนต้องได้รับข้อมูล ไม่ใช่แค่ผู้ว่าฯ',
    body: 'ระบบเตือนภัยของรัฐส่งข้อมูลไปที่ระดับจังหวัด/ปภ. — แต่ผู้ใหญ่บ้านที่ต้องเดินเคาะประตูชาวบ้านมักได้ทราบช้า · เราส่ง LINE ตรงเข้า LINE Group ของชุมชน ที่ทุกคนใช้กันอยู่แล้ว',
  },
];

function PrinciplesSection() {
  return (
    <Section bg="cream">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Eyebrow>หลักการออกแบบ</Eyebrow>
          <h2
            className="font-semibold mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: C.text, lineHeight: 1.3 }}
          >
            <span className="block">3 หลักการที่เรายึด</span>
            <span className="block">เพื่อให้ใช้ได้จริงในเทศบาล</span>
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl p-6 md:p-7 flex gap-5 items-start"
              style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-[15px] font-semibold"
                style={{ background: C.successSoft, color: '#3B6D11' }}
              >
                ✓
              </div>
              <div>
                <h3 className="text-[17px] font-semibold mb-2" style={{ color: C.text, lineHeight: 1.4 }}>
                  {p.title}
                </h3>
                <p className="text-[14px] leading-relaxed" style={{ color: C.textMuted }}>
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ── COMPARE — ต่างจากระบบเดิมยังไง ────────────────────────────────────────────
const COMPARE_ROWS = [
  {
    aspect: 'ขอบเขตการวัด',
    existing: 'ภาพรวมประเทศ / ลุ่มน้ำใหญ่',
    ours: 'จุดที่เทศบาลห่วง — ซอย · ท่อ · ใต้สะพาน',
  },
  {
    aspect: 'ผู้รับการแจ้ง',
    existing: 'ระดับจังหวัด · ปภ. · กรม',
    ours: 'นายก · ปลัด · ประธานชุมชน · ผู้ใหญ่บ้าน',
  },
  {
    aspect: 'ช่องทาง',
    existing: 'อีเมล · หนังสือราชการ · เว็บไซต์',
    ours: 'LINE ที่ทุกคนใช้อยู่แล้ว + Dashboard',
  },
  {
    aspect: 'การตัดสินใจ',
    existing: 'เจ้าหน้าที่ต้องเฝ้าจอ CCTV เอง',
    ours: 'AI ตัดสินก่อน · แจ้งเฉพาะตอนถึงเกณฑ์',
  },
  {
    aspect: 'ความยืดหยุ่น',
    existing: 'ปรับ threshold เฉพาะจุดไม่ได้',
    ours: 'ตั้ง threshold เฉพาะแต่ละจุดของเทศบาลได้',
  },
];

function CompareSection() {
  return (
    <Section bg="white">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Eyebrow color={C.accent}>เทียบกับระบบเดิม</Eyebrow>
          <h2
            className="font-semibold mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: C.text, lineHeight: 1.3 }}
          >
            <span className="block">ระบบเดิมของรัฐดีอยู่แล้ว</span>
            <span className="block">— เราเสริมในระดับ "ซอยของท่าน"</span>
          </h2>
          <p className="text-[15.5px] leading-relaxed" style={{ color: C.textMuted }}>
            เราไม่ได้แทน สสน. กรมชลประทาน หรือ Google Flood Hub — เราเสริมรายละเอียดที่ระบบใหญ่ลงไม่ถึง
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}
        >
          <div
            className="grid grid-cols-3 px-5 py-4 text-[12px] font-semibold uppercase"
            style={{ background: C.surfaceSoft, color: C.textMuted, letterSpacing: '1.5px' }}
          >
            <div>หัวข้อ</div>
            <div>ระบบเดิม (รัฐ)</div>
            <div style={{ color: C.primary }}>ของเรา</div>
          </div>
          {COMPARE_ROWS.map((r, i) => (
            <div
              key={i}
              className="grid grid-cols-3 px-5 py-5 items-start text-[14px]"
              style={{
                color: C.text,
                borderTop: i > 0 ? `1px solid ${C.surfaceSoft}` : 'none',
                background: i % 2 === 0 ? '#FFF' : '#FBF9F1',
              }}
            >
              <div className="font-semibold pr-3">{r.aspect}</div>
              <div className="pr-3 leading-relaxed" style={{ color: C.textMuted }}>{r.existing}</div>
              <div className="font-medium leading-relaxed" style={{ color: C.text }}>{r.ours}</div>
            </div>
          ))}
        </div>

        <p className="text-[12.5px] mt-6 text-center italic" style={{ color: C.textMuted }}>
          เปรียบเทียบเชิงโครงสร้าง — ไม่ใช่การวัดคุณภาพระบบใดระบบหนึ่ง · ระบบของรัฐยังคงเป็นแหล่งข้อมูลหลักที่เราใช้เสริม
        </p>
      </div>
    </Section>
  );
}

// ── SMART CITY BONUS ─────────────────────────────────────────────────────────
function BonusSection() {
  return (
    <Section bg="soft">
      <div className="max-w-[860px] mx-auto">
        <div
          className="rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start gap-7"
          style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}
        >
          <div
            className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: C.accentSoft }}
          >
            <span className="text-[24px]">🏆</span>
          </div>
          <div>
            <Eyebrow color={C.accent}>โบนัสที่จะได้ในภายหลัง</Eyebrow>
            <h2
              className="font-semibold mb-3"
              style={{ fontSize: 'clamp(22px, 3vw, 28px)', color: C.text, lineHeight: 1.35 }}
            >
              ใช้ระบบ 6 เดือน — ข้อมูลพร้อมยื่นรางวัล Smart City
            </h2>
            <p className="text-[14.5px] leading-relaxed mb-3" style={{ color: C.textMuted }}>
              เป้าหมายแรกของระบบคือ "ลดความเดือดร้อนชาวบ้าน" — ไม่ใช่รางวัล · แต่หลังใช้งาน 6 เดือน เทศบาลจะมีข้อมูล time-series ที่ใช้ประกอบการยื่น <strong style={{ color: C.text }}>depa Smart City Solutions Awards</strong> หรือใช้ในรายงานต่อ ปภ./กระทรวงมหาดไทยได้
            </p>
            <p className="text-[12.5px] italic" style={{ color: C.textMuted }}>
              หมายเหตุ: รางวัลขึ้นกับเกณฑ์ของ depa และคุณภาพการดำเนินงานของแต่ละหน่วยงาน — เราไม่รับประกันผลรางวัล แต่ช่วยเตรียมข้อมูลให้พร้อมยื่น
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── CTA ──────────────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <Section bg="deep">
      <div className="max-w-[680px] mx-auto text-center">
        <Eyebrow color="#A8DCEA">ขั้นถัดไป</Eyebrow>
        <h2
          className="font-semibold mb-5 text-white"
          style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.3 }}
        >
          <span className="block">นัดคุย 30 นาที</span>
          <span className="block">เพื่อเข้าใจปัญหาน้ำของท่าน</span>
        </h2>
        <p className="text-[16.5px] leading-relaxed mb-9 text-white/80">
          ในการคุยรอบแรก เราไม่ขายระบบ — เราอยากเข้าใจน้ำในเทศบาลของท่านก่อน
          แล้วจึงเสนอวิธีที่เหมาะกับขนาดและบริบทของท่านในรอบถัดไป
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-7">
          <CTAButton
            primary
            href="mailto:mcctua2@gmail.com?subject=สนใจคุยเรื่องระบบเตือนน้ำท่วม&body=เรียนทีมงาน%0A%0Aชื่อหน่วยงาน:%20%0Aผู้ติดต่อ:%20%0Aตำแหน่ง:%20%0Aเบอร์โทร:%20%0A%0Aปัญหาน้ำท่วมที่เผชิญในปีที่ผ่านมา:%20%0A"
          >
            ส่งอีเมลถึงทีม
          </CTAButton>
          <a
            href="tel:+66"
            className="text-[15px] font-medium px-6 py-3 rounded-lg no-underline inline-block"
            style={{ background: 'transparent', color: '#FFF', border: '1px solid rgba(255,255,255,0.4)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            โทรปรึกษา
          </a>
        </div>

        <p className="text-[12.5px] text-white/55">
          การปรึกษาเบื้องต้นไม่มีค่าใช้จ่าย · ทีมงานติดต่อกลับภายใน 1-2 วันทำการ
        </p>
      </div>
    </Section>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────
export default function IotFlood() {
  return (
    <div style={{ fontFamily: "'Sarabun', system-ui, sans-serif", color: C.text }}>
      <Hero />
      <PainSection />
      <SolutionSection />
      <PrinciplesSection />
      <CompareSection />
      <BonusSection />
      <CtaSection />
    </div>
  );
}
