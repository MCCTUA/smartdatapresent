import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// SmartTraffic.jsx — /smart-traffic
// B2B partner pitch · mmWave Radar as sensor-fusion add-on for CCTV deployments
// Copy: verbatim from infomation/mmWave/mmwave_content.md
// Design: Civic Trust palette · Font: Sarabun · Framer-motion reveals
// ---------------------------------------------------------------------------

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
  navy: '#0A1F3D',
};

const VIDEO_SRC = '/videos/0518.mp4';
const VIDEO_POSTER = '/videos/0518_poster.jpg';
const CONTACT_HREF =
  'mailto:mcctua2@gmail.com?subject=ปรึกษา%20Radar%20%2B%20CCTV%20Partner&body=ทีม Smart Data ครับ%2C%0A%0Aสนใจคุย partnership%20Radar%20%2B%20CCTV%0A%0Aชื่อบริษัท:%0Aผู้ติดต่อ:%0Aเบอร์โทรศัพท์:%0Aพื้นที่ติดตั้งหลัก:%0Aโจทย์ลูกค้าที่อยากเสนอ:';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// Inline SVG icon set — neutral line style, single accent color
const Icon = {
  Moon: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Rain: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
      <line x1="8" y1="19" x2="8" y2="21" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="16" y1="19" x2="16" y2="21" />
    </svg>
  ),
  Gauge: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 14l4-4" /><circle cx="12" cy="14" r="8" /><path d="M5 14a7 7 0 0 1 14 0" />
    </svg>
  ),
  Stack: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Count: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="9" y1="4" x2="9" y2="20" />
    </svg>
  ),
  Speed: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Class: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  ),
  Weather: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" /><line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
      <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" /><line x1="16.95" y1="7.05" x2="19.07" y2="4.93" />
    </svg>
  ),
  Range: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="2" y1="12" x2="22" y2="12" />
      <polyline points="18 8 22 12 18 16" /><polyline points="6 8 2 12 6 16" />
    </svg>
  ),
  Battery: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="2" y="7" width="18" height="10" rx="2" /><line x1="22" y1="11" x2="22" y2="13" />
      <line x1="6" y1="10" x2="6" y2="14" />
    </svg>
  ),
  Building: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4" y="3" width="16" height="18" />
      <line x1="9" y1="7" x2="9" y2="7" /><line x1="15" y1="7" x2="15" y2="7" />
      <line x1="9" y1="12" x2="9" y2="12" /><line x1="15" y1="12" x2="15" y2="12" />
      <line x1="9" y1="17" x2="15" y2="17" />
    </svg>
  ),
  Warn: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Camera: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  Park: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
  ),
  Receipt: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z" />
      <line x1="8" y1="9" x2="16" y2="9" /><line x1="8" y1="13" x2="14" y2="13" />
    </svg>
  ),
  Plug: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="6" y1="3" x2="6" y2="9" /><line x1="18" y1="3" x2="18" y2="9" />
      <path d="M5 9h14v3a7 7 0 0 1-14 0V9z" /><line x1="12" y1="22" x2="12" y2="16" />
    </svg>
  ),
  Handshake: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2 12l3-3 4 4-2 2-5-3z" /><path d="M22 12l-3-3-4 4 2 2 5-3z" />
      <path d="M9 13l3 3 3-3" />
    </svg>
  ),
  Layers: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
    </svg>
  ),
};

const PAINS = [
  { icon: <Icon.Moon />, title: 'Pain 1 — มืดแล้วนับไม่ได้', desc: 'ตอนกลางคืน กล้อง IR ก็ยังตกหล่น มอเตอร์ไซค์เล็ก รถความเร็วสูง หรือรถที่เปิดไฟสูงย้อนเลนส์ ระบบนับพลาด' },
  { icon: <Icon.Rain />, title: 'Pain 2 — ฝน หมอก ฝุ่น = ภาพไม่ชัด', desc: 'หน้าฝนทีไร ภาพเบลอ AI detect ผิด ลูกค้าโทรมาขอสรุปจราจรไม่ได้ ทีมต้องไปกู้ระบบ' },
  { icon: <Icon.Gauge />, title: 'Pain 3 — ความเร็วต้องวัดจริง ไม่ใช่ประมาณการ', desc: 'ลูกค้าราชการเริ่มถามว่า "วัดความเร็วได้ทุกคันไหม" เพราะต้องเอาไปทำรายงานความปลอดภัยถนน CCTV เดี่ยวๆ ไม่มีคำตอบ' },
  { icon: <Icon.Stack />, title: 'Pain 4 — ขยายงานยาก ถ้าต้องพึ่ง compute หนัก', desc: 'จะเพิ่ม analytics ลึกๆ ก็ต้องไปอัปเกรด AI box, เพิ่ม GPU, เพิ่ม bandwidth — งบบาน, ลูกค้าถอย' },
];

const STEPS = [
  {
    n: '01',
    title: 'Radar ตรวจจับ',
    desc: 'Radar ส่งคลื่นออกไปและรับสะท้อนกลับ ได้ระยะ + ความเร็ว + ทิศทาง ของทุกวัตถุที่เคลื่อนไหวในรัศมีหลายร้อยเมตร — แม้ในความมืดสนิท',
  },
  {
    n: '02',
    title: 'CCTV ยืนยันภาพ',
    desc: 'เมื่อ radar เจอวัตถุ ระบบจะ trigger ให้กล้อง CCTV ในตำแหน่งเดียวกัน snap ภาพ ณ จังหวะที่รถอยู่ในเฟรมพอดี ภาพคมขึ้น, ลด false snap, ลด storage',
  },
  {
    n: '03',
    title: 'รวมข้อมูล ส่งให้ลูกค้า',
    desc: 'ระบบหลังบ้านนำข้อมูล radar (count, speed, class) + ภาพจาก CCTV + ป้ายทะเบียน มารวมเป็น dashboard เดียว แสดงแบบ real-time + ย้อนหลังได้',
  },
];

const FEATURES = [
  {
    icon: <Icon.Count />,
    title: '1. นับยานพาหนะแบบทุกคัน ไม่มีตกหล่น',
    bullets: [
      'ตรวจจับได้ทุกขนาด ตั้งแต่มอเตอร์ไซค์ถึงรถบรรทุก',
      'ความแม่นยำในการนับ ใกล้ระดับสายตามนุษย์',
      'ทำงานได้ทั้งตอนกลางวันและกลางคืน ไม่มีจุดบอด',
    ],
  },
  {
    icon: <Icon.Speed />,
    title: '2. วัดความเร็วได้ทุกคันแบบ real-time',
    bullets: [
      'วัด instantaneous speed ของทุกวัตถุที่ผ่านพื้นที่ตรวจจับ',
      'ใช้หลัก Doppler effect — เป็นการวัดจริง ไม่ใช่ประมาณจากภาพ',
      'รายงานเป็น km/h ส่งเข้า dashboard ทันที',
    ],
  },
  {
    icon: <Icon.Class />,
    title: '3. แยกประเภทยานพาหนะอัตโนมัติ',
    bullets: [
      'แยกได้: มอเตอร์ไซค์ / รถยนต์ / รถบรรทุก / รถบัส / คนเดิน',
      'ใช้ขนาด radar cross-section + รูปแบบความเร็ว ในการจำแนก',
      'ไม่ต้องพึ่งแสง — ใช้งานคืนได้แม่นเท่ากลางวัน',
    ],
  },
  {
    icon: <Icon.Weather />,
    title: '4. ทำงานในทุกสภาพอากาศ',
    bullets: [
      'คลื่น Radar ทะลุฝน หมอก ฝุ่น ควัน ได้',
      'ไม่กระทบจากแสงย้อน / หน้าฝน / ตอนพลบค่ำ',
      'IP-rated สำหรับติดตั้ง outdoor ระยะยาว',
    ],
  },
  {
    icon: <Icon.Range />,
    title: '5. ระยะตรวจจับไกล ครอบคลุมหลายเลน',
    bullets: [
      'ระยะตรวจจับยาน 200+ เมตร',
      'ครอบคลุมถนน 4–6 เลนต่อชุด',
      'ลดจำนวนจุดติดตั้ง เทียบกับการใช้ CCTV หลายตัว',
    ],
  },
  {
    icon: <Icon.Battery />,
    title: '6. กินไฟต่ำ ใช้ compute ของกล้องเดิมได้',
    bullets: [
      'กินไฟต่ำกว่า AI camera หลายเท่า',
      'ส่งข้อมูลเป็น metadata (เลข count, speed, class) ไม่ใช่ video',
      'bandwidth ที่ต้องใช้น้อยมาก — ใช้กับ network เดิมของไซต์ลูกค้าได้',
    ],
  },
];

const COMPARE_ROWS = [
  { situation: 'กลางวัน อากาศดี', cctv: 'นับได้ดี', combo: 'นับได้ดี + วัดความเร็วจริง' },
  { situation: 'กลางคืน', cctv: 'ตกหล่น เห็นบางคัน', combo: 'นับครบทุกคัน' },
  { situation: 'ฝนตก / หมอก', cctv: 'ภาพเบลอ AI ผิดพลาด', combo: 'ทำงานปกติ' },
  { situation: 'ย้อนแสง / พระอาทิตย์ตก', cctv: 'กล้องบอด ช่วงเวลาหนึ่ง', combo: 'ทำงานปกติ' },
  { situation: 'วัดความเร็วทุกคัน', cctv: 'ทำได้ แต่ใช้ compute สูง', combo: 'ทำได้ทันที ทุกคัน' },
  { situation: 'แยก class ยานพาหนะ', cctv: 'ใช้ AI vision — แม่นเฉพาะกลางวัน', combo: 'แม่นทั้งกลางวัน-กลางคืน' },
  { situation: 'Bandwidth ที่ใช้', cctv: 'สูง (video stream)', combo: 'ต่ำมาก (metadata)' },
  { situation: 'จุดติดตั้งต่อพื้นที่ครอบคลุม', cctv: 'หลายจุด', combo: 'ลดได้ครึ่งหนึ่ง' },
];

// Combo column header label — used in desktop table header + mobile card label
const COMBO_LABEL = 'CCTV + Radar';

const USE_CASES = [
  {
    n: '01',
    icon: <Icon.Building />,
    title: 'Traffic Flow Analytics สำหรับ อปท.',
    desc: 'รายงานปริมาณจราจรรายชั่วโมง / รายวัน / รายสัปดาห์ ต่อเส้นทาง พร้อม peak hours ใช้วางแผนสัญญาณไฟ, ปรับเลน, ขออนุมัติงบขยายถนน — ข้อมูลพร้อมตอบสภา',
  },
  {
    n: '02',
    icon: <Icon.Warn />,
    title: 'Speed Monitoring & Black Spot Detection',
    desc: 'รายงานความเร็วเฉลี่ย + ตำแหน่งที่รถใช้ความเร็วเกินสม่ำเสมอ ส่งให้ตำรวจ / กรมทางหลวง / ขนส่ง ใช้วางแผนจุดติดป้าย, ลูกระนาด, กล้องจับความเร็ว',
  },
  {
    n: '03',
    icon: <Icon.Camera />,
    title: 'LPR Trigger (เพิ่มความแม่น LPR เดิม)',
    desc: 'Radar trigger ให้กล้องของคุณ snap ภาพในจังหวะที่รถอยู่ตำแหน่งดีที่สุด ลด false snap, ลด storage 60–80%, เพิ่ม LPR accuracy โดยไม่ต้องเปลี่ยน engine',
  },
  {
    n: '04',
    icon: <Icon.Warn />,
    title: 'School Zone / Hospital Zone Safety',
    desc: 'ตรวจจับรถที่เกินความเร็วในเขตโรงเรียน / โรงพยาบาล อัตโนมัติ ส่ง alert เข้า LINE / Dashboard ของเทศบาล → ใช้เป็นหลักฐานก่อนเกิดเหตุจริง',
  },
  {
    n: '05',
    icon: <Icon.Park />,
    title: 'Parking & Stop Detection',
    desc: 'ตรวจจับรถจอดผิดที่ / จอดในจุดห้ามจอด / จอดนานเกินกำหนด ตั้ง zone ได้อิสระ — ทำงานบนกล้องและพื้นที่เดิมของลูกค้า',
  },
  {
    n: '06',
    icon: <Icon.Receipt />,
    title: 'Vehicle Class Tolling / Fee Capture',
    desc: 'นับและแยกประเภทยานพาหนะที่เข้า-ออกพื้นที่ (ตลาด, ด่านชุมชน, สวนสาธารณะ) ใช้สอบยอดค่าธรรมเนียม / ตรวจสอบรายได้ — audit trail',
  },
];

export default function SmartTraffic() {
  // Dynamic <head> for partner pitch — sets title + OG tags on mount, restores on unmount
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Smart Traffic · Radar + CCTV Sensor Fusion';

    const metas = [
      { name: 'description', content: 'Radar เสริมกล้อง CCTV ที่คุณติดตั้งให้ลูกค้าอยู่แล้ว — นับรถ วัดความเร็ว แยกประเภท แม่นยำ 24 ชั่วโมง ทุกสภาพอากาศ' },
      { property: 'og:title', content: 'กล้องเดิมของคุณ เก่งกลางวัน — แต่ยังตอบลูกค้าไม่ได้ตอนกลางคืน ฝนตก และย้อนแสง' },
      { property: 'og:description', content: 'Radar เสริมกล้อง CCTV ของคุณ ให้ตอบโจทย์ลูกค้าได้ 24/7 ทุกสภาพอากาศ' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: VIDEO_POSTER },
    ];
    const created = metas.map((attrs) => {
      const key = attrs.name ? 'name' : 'property';
      const sel = `meta[${key}="${attrs[key]}"]`;
      let el = document.head.querySelector(sel);
      const existed = !!el;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(key, attrs[key]);
        document.head.appendChild(el);
      }
      const prevContent = el.getAttribute('content');
      el.setAttribute('content', attrs.content);
      return { el, prevContent, existed };
    });

    return () => {
      document.title = prevTitle;
      created.forEach(({ el, prevContent, existed }) => {
        if (!existed) el.remove();
        else if (prevContent !== null) el.setAttribute('content', prevContent);
      });
    };
  }, []);

  return (
    <div
      className="smart-traffic-page"
      style={{ fontFamily: "'Sarabun', Tahoma, sans-serif", color: C.text, background: C.surface }}
    >
      {/* ── [1] HERO — Pain-first headline + side video ─────────────────────── */}
      <section
        className="px-6 md:px-10 py-16 md:py-24"
        style={{
          background: `linear-gradient(135deg, ${C.navy} 0%, ${C.primaryDeep} 100%)`,
          color: '#FFF',
        }}
      >
        <motion.div
          className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-12 items-center"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          {/* Copy */}
          <div>
            <motion.p
              variants={fadeUp}
              className="text-[12px] font-semibold uppercase mb-4"
              style={{ color: C.accent, letterSpacing: '2.5px' }}
            >
              SMART TRAFFIC · SENSOR FUSION
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-semibold mb-5"
              style={{ fontSize: 'clamp(30px, 4.6vw, 52px)', lineHeight: 1.18, color: '#FFF' }}
            >
              กล้องเดิมของคุณ เก่งกลางวัน — แต่ยังตอบลูกค้าไม่ได้ตอนกลางคืน ฝนตก และย้อนแสง
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-[16px] md:text-[18px] leading-relaxed mb-3"
              style={{ color: '#FFFFFFCC' }}
            >
              Radar เสริมกล้อง CCTV ที่คุณติดตั้งให้ลูกค้าอยู่แล้ว
              ให้นับรถ วัดความเร็ว แยกประเภทยานพาหนะ ได้แม่นยำ 24 ชั่วโมง ทุกสภาพอากาศ
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-[16px] md:text-[18px] leading-relaxed mb-8 font-semibold"
              style={{ color: '#FFF' }}
            >
              โดยไม่ต้องเปลี่ยนกล้อง ไม่ต้องเปลี่ยน NVR
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-3 flex-wrap">
              <a
                href={CONTACT_HREF}
                className="text-[14px] md:text-[15px] font-semibold px-6 py-3 rounded-lg no-underline transition-all"
                style={{ background: C.accent, color: '#FFF' }}
              >
                คุยโจทย์งานจริงกับเรา
              </a>
              <button
                onClick={() => scrollToId('demo')}
                className="text-[14px] md:text-[15px] font-semibold px-6 py-3 rounded-lg cursor-pointer transition-all"
                style={{ background: 'transparent', color: '#FFF', border: '1px solid rgba(255,255,255,0.4)' }}
              >
                ดูคลิปสาธิต ↓
              </button>
            </motion.div>
          </div>

          {/* Side video — autoplay muted loop background-style */}
          <motion.div variants={fadeUp}>
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{
                background: '#000',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
                aspectRatio: '21 / 9',
              }}
            >
              <video
                src={VIDEO_SRC}
                poster={VIDEO_POSTER}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover block"
                aria-label="ภาพตัวอย่าง Radar ตรวจจับและวัดความเร็วยานพาหนะ"
              />
              <div
                className="absolute bottom-3 left-3 text-[11px] font-semibold uppercase px-3 py-1 rounded-full"
                style={{ background: 'rgba(0,0,0,0.6)', color: '#FFF', letterSpacing: '1.5px' }}
              >
                LIVE TEST · 26s
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── [2] PAIN PANEL — 4 cards (2×2 desktop / 1-col mobile) ───────────── */}
      <section className="px-6 md:px-10 py-20 md:py-24" style={{ background: C.surfaceSoft }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp} className="max-w-2xl mb-10">
              <p className="text-[12px] font-semibold uppercase mb-3" style={{ color: C.alert, letterSpacing: '2.5px' }}>
                ปัญหาที่ดีลเลอร์ CCTV เจอประจำ
              </p>
              <h2 className="font-semibold mb-4" style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', color: C.primaryDeep, lineHeight: 1.3 }}>
                ลูกค้าซื้อกล้องไปแล้ว แต่ขอข้อมูลเพิ่มอีกเรื่อยๆ
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PAINS.map((p, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6"
                  style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderTop: `4px solid ${C.alert}` }}
                >
                  <div className="mb-3" style={{ color: C.alert }}>{p.icon}</div>
                  <div className="text-[16px] font-semibold mb-2" style={{ color: C.alert }}>{p.title}</div>
                  <p className="text-[14px] leading-relaxed" style={{ color: C.text }}>{p.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── [3] SOLUTION OVERVIEW — lead + 3 step cards ─────────────────────── */}
      <section className="px-6 md:px-10 py-20 md:py-24" style={{ background: C.surface }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp} className="max-w-3xl mb-10">
              <p className="text-[12px] font-semibold uppercase mb-3" style={{ color: C.primary, letterSpacing: '2.5px' }}>
                แนวทางที่เราเสนอ
              </p>
              <h2 className="font-semibold mb-5" style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', color: C.primaryDeep, lineHeight: 1.3 }}>
                ไม่ต้องเปลี่ยนกล้อง — แค่เติม Radar เป็น "ตาที่สอง"
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ color: C.textMuted }}>
                Radar คือเซนเซอร์คลื่นความถี่สูง ที่มองเห็นการเคลื่อนไหวด้วย <strong style={{ color: C.text }}>คลื่นวิทยุ ไม่ใช่แสง</strong>
                {' '}แปลว่ามันทำงานได้ดี <strong style={{ color: C.text }}>ในที่ที่กล้องทำงานไม่ดี</strong> — กลางคืน, ฝน, หมอก, ฝุ่น, ย้อนแสง
                เมื่อเอามาทำงานคู่กับ CCTV ของคุณ ระบบจะใช้ข้อมูลจาก radar เป็นความจริงหลัก (ground truth) และให้ CCTV เป็นตัวยืนยันภาพ + อ่านป้ายทะเบียน → ได้ข้อมูลที่แม่นกว่า CCTV เดี่ยวๆ มาก
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  className="rounded-2xl p-6"
                  style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, boxShadow: '0 4px 16px rgba(31,42,36,0.04)' }}
                >
                  <div
                    className="text-[13px] font-bold mb-3 inline-flex items-center justify-center w-10 h-10 rounded-lg"
                    style={{ background: C.accentSoft, color: C.accent }}
                  >
                    {s.n}
                  </div>
                  <div className="text-[16px] font-semibold mb-2" style={{ color: C.primaryDeep }}>STEP {s.n} — {s.title}</div>
                  <p className="text-[14px] leading-relaxed" style={{ color: C.text }}>{s.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── [4] FEATURES — 6-card grid · icon + title + 3 bullets ───────────── */}
      <section className="px-6 md:px-10 py-20 md:py-24" style={{ background: C.surfaceSoft }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp} className="max-w-2xl mb-10">
              <p className="text-[12px] font-semibold uppercase mb-3" style={{ color: C.primary, letterSpacing: '2.5px' }}>
                ความสามารถของ Radar ที่เราใช้
              </p>
              <h2 className="font-semibold" style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', color: C.primaryDeep, lineHeight: 1.3 }}>
                เซนเซอร์ระดับงานจราจร ที่ออกแบบสำหรับ outdoor 24/7
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6"
                  style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}
                >
                  <div className="mb-3" style={{ color: C.primary }}>{f.icon}</div>
                  <div className="text-[15.5px] font-semibold mb-3 leading-snug" style={{ color: C.primaryDeep }}>{f.title}</div>
                  <ul className="space-y-1.5">
                    {f.bullets.map((b, j) => (
                      <li key={j} className="text-[13.5px] leading-relaxed flex gap-2" style={{ color: C.text }}>
                        <span aria-hidden style={{ color: C.primary, fontWeight: 700 }}>·</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── [5] DIFFERENTIATOR — table (desktop) / stacked cards (mobile) ───── */}
      <section className="px-6 md:px-10 py-20 md:py-24" style={{ background: C.surface }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp} className="max-w-2xl mb-10">
              <p className="text-[12px] font-semibold uppercase mb-3" style={{ color: C.accent, letterSpacing: '2.5px' }}>
                ทำไมแค่ CCTV ไม่พอ
              </p>
              <h2 className="font-semibold" style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', color: C.primaryDeep, lineHeight: 1.3 }}>
                เปรียบเทียบสิ่งที่ลูกค้าเคยได้ vs สิ่งที่ลูกค้าจะได้
              </h2>
            </motion.div>

            {/* Desktop table (md+) */}
            <motion.div variants={fadeUp} className="hidden md:block rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.surfaceSoft}`, background: '#FFF' }}>
              <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: C.primaryDeep, color: '#FFF' }}>
                    <th className="px-5 py-4 text-[13px] font-semibold" style={{ width: '32%' }}>สถานการณ์</th>
                    <th className="px-5 py-4 text-[13px] font-semibold">CCTV เดี่ยว</th>
                    <th className="px-5 py-4 text-[13px] font-semibold">{COMBO_LABEL}</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row, i) => (
                    <tr key={i} style={{ borderTop: i === 0 ? 'none' : `1px solid ${C.surfaceSoft}`, background: i % 2 === 0 ? '#FFF' : C.surface }}>
                      <td className="px-5 py-4 text-[14px] font-semibold" style={{ color: C.primaryDeep }}>{row.situation}</td>
                      <td className="px-5 py-4 text-[14px]" style={{ color: C.textMuted }}>{row.cctv}</td>
                      <td className="px-5 py-4 text-[14px] font-medium" style={{ color: C.primary }}>{row.combo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Mobile stacked cards (<md) */}
            <motion.div variants={fadeUp} className="md:hidden space-y-4">
              {COMPARE_ROWS.map((row, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5"
                  style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}
                >
                  <div className="text-[13px] font-bold mb-3 uppercase" style={{ color: C.primaryDeep, letterSpacing: '1px' }}>
                    {row.situation}
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="rounded-lg px-3 py-2" style={{ background: C.alertSoft }}>
                      <div className="text-[10.5px] font-semibold uppercase mb-1" style={{ color: C.alert, letterSpacing: '1px' }}>CCTV เดี่ยว</div>
                      <div className="text-[13.5px]" style={{ color: C.text }}>{row.cctv}</div>
                    </div>
                    <div className="rounded-lg px-3 py-2" style={{ background: C.successSoft }}>
                      <div className="text-[10.5px] font-semibold uppercase mb-1" style={{ color: C.success, letterSpacing: '1px' }}>{COMBO_LABEL}</div>
                      <div className="text-[13.5px] font-medium" style={{ color: C.primaryDeep }}>{row.combo}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Bottom-line statement */}
            <motion.p
              variants={fadeUp}
              className="text-center font-semibold mt-10 mx-auto max-w-3xl"
              style={{ fontSize: 'clamp(18px, 2.4vw, 24px)', color: C.primaryDeep, lineHeight: 1.4 }}
            >
              Radar ไม่ได้มาแทนกล้อง — มันมาทำให้กล้องของคุณเก่งขึ้น 24/7
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── [6] USE CASES — 6-card grid (3×2 desktop / 2×3 tablet / 1×6 mobile) ── */}
      <section className="px-6 md:px-10 py-20 md:py-24" style={{ background: C.surfaceSoft }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp} className="max-w-2xl mb-10">
              <p className="text-[12px] font-semibold uppercase mb-3" style={{ color: C.primary, letterSpacing: '2.5px' }}>
                เอาไปทำงานอะไรกับลูกค้าได้บ้าง
              </p>
              <h2 className="font-semibold" style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', color: C.primaryDeep, lineHeight: 1.3 }}>
                ตัวอย่าง 6 application
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {USE_CASES.map((u) => (
                <div
                  key={u.n}
                  className="rounded-2xl p-6"
                  style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, boxShadow: '0 4px 16px rgba(31,42,36,0.04)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="text-[12px] font-bold inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
                      style={{ background: C.accentSoft, color: C.accent }}
                    >
                      {u.n}
                    </div>
                    <div style={{ color: C.primary }}>{u.icon}</div>
                  </div>
                  <div className="text-[15.5px] font-semibold mb-2 leading-snug" style={{ color: C.primaryDeep }}>{u.title}</div>
                  <p className="text-[13.5px] leading-relaxed" style={{ color: C.text }}>{u.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── [7] DEMO CLIP — controls video + caption ────────────────────────── */}
      <section
        id="demo"
        className="px-6 md:px-10 py-20 md:py-24"
        style={{ background: C.primaryDeep, color: '#FFF', scrollMarginTop: '64px' }}
      >
        <div className="max-w-[1100px] mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-8">
              <p className="text-[12px] font-semibold uppercase mb-3" style={{ color: C.accent, letterSpacing: '2.5px' }}>
                คลิปจริง · ไม่ใช่ animation
              </p>
              <h2 className="font-semibold mb-3" style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', color: '#FFF', lineHeight: 1.3 }}>
                ดู Radar ทำงานจริง 26 วินาที
              </h2>
              <p className="text-[15px]" style={{ color: '#FFFFFFCC' }}>
                ทดสอบจริง · นับยานพาหนะ + วัดความเร็ว + แยกประเภท ในคลิปเดียว
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mx-auto rounded-2xl overflow-hidden"
              style={{
                maxWidth: 960,
                background: '#000',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <video
                controls
                poster={VIDEO_POSTER}
                preload="metadata"
                playsInline
                className="w-full h-auto block"
                aria-label="คลิปทดสอบ Radar — นับยานพาหนะ วัดความเร็ว แยกประเภท"
              >
                <source src={VIDEO_SRC} type="video/mp4" />
                <track kind="captions" srcLang="th" label="ภาษาไทย" />
                ขออภัย เบราว์เซอร์ของท่านไม่รองรับการแสดงผลวิดีโอ
              </video>
            </motion.div>

            <motion.p variants={fadeUp} className="text-center text-[13px] mt-5" style={{ color: '#FFFFFFAA' }}>
              ภาพจากการทดสอบจริงบนถนนสาธารณะ — ขอสงวนตำแหน่งจุดทดสอบ
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
