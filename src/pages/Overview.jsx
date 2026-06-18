import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import RotateHint from '../components/RotateHint';

// ===========================================================================
// Overview — "ภาพรวมสำหรับผู้บริหาร" (portfolio front door)
// One concise deck for a time-poor นายก: อปท. pain points → 3-audience lens →
// 1 slide per app (ประชาชน / คนทำงาน / ผู้บริหารได้อะไร) + ลิงก์เจาะลง deck เต็ม.
// Outcome-framed only — ไม่มีคำเชิงเลือกตั้ง/ฐานเสียง, ไม่มีตัวเลข ROI, ไม่มี brand
// (ตามกฎ sensitive-framing / no-ROI / no-brand).
// ===========================================================================

const C = {
  primary: '#0F6E56',
  primaryHover: '#1D9E75',
  primaryDeep: '#0B5544',
  primaryDeepEnd: '#0F6E56',
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

// Page numbering is automatic via SlideCtx (array order). To reorder/insert a
// slide, edit the slides[] + titles[] arrays only.
const SlideCtx = React.createContext(null);

// ---------------------------------------------------------------------------
// Slide shell — fixed 1280×720, scaled to viewport (screen) and 1:1 (print)
// ---------------------------------------------------------------------------
function Slide({ num, dark = false, children }) {
  const ctx = React.useContext(SlideCtx);
  const shownNum = ctx?.num ?? num;
  const shownTotal = ctx?.total ?? 1;
  return (
    <section
      className="slide-page"
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
      <div style={{ position: 'absolute', inset: 0, padding: '50px 60px 56px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {children}
      </div>
      <div style={{ position: 'absolute', bottom: 22, right: 38, fontSize: 13, color: dark ? 'rgba(255,255,255,0.7)' : C.textMuted, fontWeight: 500 }}>
        {shownNum} / {shownTotal}
      </div>
    </section>
  );
}

function Eyebrow({ children, dark, accent }) {
  return (
    <p style={{ display: 'inline-block', fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: accent ? C.accent : dark ? '#EAE1CC' : C.primary, marginBottom: 10 }}>
      {children}
    </p>
  );
}

function Title({ children, dark, size = 40, style }) {
  return (
    <h2 style={{ fontSize: size, fontWeight: 800, lineHeight: 1.35, color: dark ? '#FFF' : C.primaryDeep, letterSpacing: -0.3, ...style }}>
      {children}
    </h2>
  );
}

// ---------------------------------------------------------------------------
// App data — order: smart lighting → solar → elderly → emergency → waste → cctv → traffic
// ---------------------------------------------------------------------------
const APPS = [
  {
    emoji: '💡',
    name: 'Smart Street Light · ไฟถนนอัจฉริยะ',
    route: '/smart-street-light',
    pain: 'ไฟถนนดับโดยไม่มีใครรู้ · ค่าไฟสูง · ร้องเรียนซ้ำซาก',
    community: ['ถนนสว่างต่อเนื่อง ปลอดภัยขึ้น', 'ไฟเสียถูกซ่อมเร็ว ไม่ปล่อยมืดนาน'],
    staff: ['รู้จุดไฟดับทันที ไม่ต้องขับวนตรวจ', 'วางแผนซ่อมล่วงหน้า ลดงานเร่งด่วน'],
    exec: ['ลดเรื่องร้องเรียนถนนมืด', 'บริหารค่าไฟโปร่งใส · ภาพลักษณ์เมืองทันสมัย'],
  },
  {
    emoji: '☀️',
    name: 'Solar Street Light · ไฟถนนพลังแสงอาทิตย์',
    route: '/solar-street-light',
    pain: 'พื้นที่ห่างไกลไม่มีสายไฟ · ลากไฟแพง · จุดเปลี่ยวมืด',
    community: ['จุดเปลี่ยว/นอกเขตไฟฟ้า มีแสงสว่าง', 'ลดความเสี่ยงและอุบัติเหตุยามค่ำคืน'],
    staff: ['ติดตั้งเร็ว ไม่ต้องขุด/ลากสายไฟ', 'ดูแลบำรุงรักษาน้อย'],
    exec: ['ขยายไฟส่องสว่างถึงชุมชนรอบนอก', 'ลงทุนครั้งเดียว ไม่มีภาระค่าไฟรายเดือน'],
  },
  {
    emoji: '👵',
    name: 'ดูแลผู้สูงอายุ · ElderlyCare 360°',
    route: '/elderly-care',
    pain: 'สังคมสูงวัย · ผู้สูงอายุอยู่ลำพัง ล้ม/ฉุกเฉินไม่มีใครรู้ทัน',
    community: ['พ่อแม่ปู่ย่าปลอดภัยแม้อยู่ลำพัง', 'ลูกหลานที่อยู่ไกลอุ่นใจ'],
    staff: ['อสม. เยี่ยมบ้านตรงจุด ไม่ต้องตรวจทุกหลัง', 'ถ่ายรูปแทนการจด ลดงานเอกสาร'],
    exec: ['ดูแลผู้สูงวัยเชิงรุก ตอบโจทย์สังคมสูงวัย', 'มีเรื่องราว/ข้อมูลสื่อสารกับชุมชน'],
  },
  {
    emoji: '🆘',
    name: 'แจ้งเหตุฉุกเฉิน · Emergency',
    route: '/emergency-mgmt',
    pain: 'แจ้งเหตุช้า ไม่รู้พิกัด · ประสานหลายหน่วยล่าช้า',
    community: ['ขอความช่วยเหลือได้เร็ว รู้พิกัดแม่นยำ', 'อุ่นใจว่ามีระบบรับเหตุ'],
    staff: ['รับแจ้ง-ประสานหน่วยในระบบเดียว', 'ลดความสับสน เหตุไม่ตกหล่น'],
    exec: ['เมืองตอบสนองเหตุไว', 'ภาพลักษณ์ดูแลความปลอดภัยประชาชน'],
  },
  {
    emoji: '🗑️',
    name: 'ค่าธรรมเนียมขยะ · จัดเก็บรายได้ท้องถิ่น',
    route: '/waste-fee',
    pain: 'จัดเก็บค่าธรรมเนียมไม่ครบ · เงินสดรั่วไหล · ตามยอดค้างยาก',
    community: ['จ่ายสะดวกผ่านออนไลน์/LINE มีหลักฐาน', 'โปร่งใส ตรวจสอบการชำระได้'],
    staff: ['เก็บเงินไม่ต้องถือเงินสด', 'ตามยอดค้าง/ออกใบเสร็จง่าย ลดงานเอกสาร'],
    exec: ['รายได้ท้องถิ่นเข้าครบ โปร่งใส', 'ตรวจสอบได้ ลดข้อครหา'],
  },
  {
    emoji: '🎥',
    name: 'CCTV + AI · เฝ้าระวังอัจฉริยะ',
    route: '/cctv-ai',
    pain: 'มีกล้องแต่ไม่มีคนเฝ้า · เหตุเกิดแล้วค่อยมาดูย้อนหลัง',
    community: ['พื้นที่เสี่ยงได้รับการเฝ้าระวัง', 'ความปลอดภัยเชิงรุกมากขึ้น'],
    staff: ['ระบบช่วยเฝ้า-แจ้งเตือน ไม่ต้องจ้องจอตลอด', 'บันทึกเหตุการณ์ครบ ค้นย้อนหลังง่าย'],
    exec: ['ใช้กล้องที่มีอยู่ให้เกิดประโยชน์จริง', 'ยกระดับความปลอดภัยของเมือง'],
  },
  {
    emoji: '🚦',
    name: 'Smart Traffic · จราจร & จุดเสี่ยง',
    route: '/smart-traffic',
    pain: 'จุดอันตราย/จราจรติดซ้ำซาก · ไม่มีข้อมูลประกอบการตัดสินใจ',
    community: ['เดินทางปลอดภัยขึ้นในจุดเสี่ยง', 'ลดอุบัติเหตุซ้ำซาก'],
    staff: ['เห็นข้อมูลจุดเสี่ยงเพื่อวางแผน', 'เฝ้าระวัง-แจ้งเตือนอัตโนมัติ'],
    exec: ['จัดการจุดอันตรายด้วยข้อมูล', 'ความปลอดภัยทางถนนในพื้นที่ดีขึ้น'],
  },
];

// ---------------------------------------------------------------------------
// Reusable benefit column
// ---------------------------------------------------------------------------
function BenefitCol({ icon, label, color, bg, points }) {
  return (
    <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 16, padding: '18px 18px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 26, lineHeight: 1 }}>{icon}</span>
        <span style={{ fontSize: 13.5, fontWeight: 800, color, background: bg, padding: '3px 10px', borderRadius: 100 }}>{label}</span>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: 9 }}>
        {points.map((p, i) => (
          <li key={i} style={{ display: 'flex', gap: 8, fontSize: 14.5, color: C.text, lineHeight: 1.45 }}>
            <span style={{ color, fontWeight: 800, flexShrink: 0 }}>✓</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// App slide (data-driven · 1 slide / app)
// ---------------------------------------------------------------------------
function AppSlide({ app, index }) {
  return (
    <Slide num={index + 4}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <Eyebrow>แอปที่ {index + 1} / {APPS.length}</Eyebrow>
          <Title size={32} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 38 }}>{app.emoji}</span>
            {app.name}
          </Title>
        </div>
      </div>
      <div style={{ marginTop: 14, background: C.alertSoft, border: `1px solid ${C.alert}33`, borderRadius: 12, padding: '12px 18px', display: 'flex', gap: 10, alignItems: 'center' }}>
        <span style={{ fontSize: 18 }}>⚠</span>
        <span style={{ fontSize: 16, color: C.alert, fontWeight: 700 }}>ปัญหาที่แก้:</span>
        <span style={{ fontSize: 15.5, color: C.text }}>{app.pain}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 16, flex: 1, minHeight: 0 }}>
        <BenefitCol icon="👨‍👩‍👧" label="ประชาชน" color={C.success} bg={C.successSoft} points={app.community} />
        <BenefitCol icon="👷" label="คนทำงาน" color={C.primary} bg={C.primarySoft} points={app.staff} />
        <BenefitCol icon="🏛️" label="ผู้บริหาร" color={C.accent} bg={C.accentSoft} points={app.exec} />
      </div>
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, color: C.textMuted }}>หากสนใจ — เจาะดูรายละเอียดแอปนี้แบบเต็มได้</span>
        <Link
          to={app.route}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.primary, color: '#FFF', borderRadius: 10, padding: '10px 20px', fontSize: 14.5, fontWeight: 700, textDecoration: 'none' }}
        >
          ดูรายละเอียดแอปนี้ →
        </Link>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// Slide 1 — Title / hook
// ---------------------------------------------------------------------------
function SlideTitle() {
  return (
    <Slide num={1} dark>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', maxWidth: 980 }}>
        <Eyebrow dark>ภาพรวมสำหรับผู้บริหาร · 5 นาที</Eyebrow>
        <h1 style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.25, letterSpacing: -0.5, margin: 0 }}>
          ระบบ Smart City สำหรับท้องถิ่น<br />— เห็นภาพรวมก่อน เจาะลึกทีหลัง
        </h1>
        <p style={{ fontSize: 21, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', marginTop: 20 }}>
          ชุดระบบที่ออกแบบให้ <strong>ประชาชนได้ประโยชน์ · คนทำงานเบาแรง · ผู้บริหารมีผลงานจับต้องได้</strong>
          {' '}— เริ่มจากจุดที่เจ็บที่สุดก่อน แล้วค่อยขยาย
        </p>
        <div style={{ marginTop: 26, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {APPS.map((a, i) => (
            <span key={i} style={{ fontSize: 14, fontWeight: 600, background: 'rgba(255,255,255,0.14)', borderRadius: 100, padding: '7px 14px' }}>
              {a.emoji} {a.name.split(' · ')[1] || a.name}
            </span>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// Slide 2 — อปท. pain points
// ---------------------------------------------------------------------------
function SlidePain() {
  const pains = [
    { ic: '💸', t: 'งบจำกัด ต้องเลือกให้คุ้ม', d: 'ลงทุนแล้วต้องอธิบาย/ตรวจสอบได้ ตามระเบียบและความคาดหวังประชาชน' },
    { ic: '👷', t: 'กำลังคนน้อย งานเยอะ', d: 'หลายเรื่องต้องลงพื้นที่เอง เดินตรวจ-เฝ้าระวังไม่ทั่วถึง' },
    { ic: '📣', t: 'เรื่องร้องเรียนซ้ำซาก', d: 'ไฟดับ ถนนมืด ขยะ ความปลอดภัย — แก้ทีหลังเสมอ ไม่รู้ตัวก่อน' },
    { ic: '👵', t: 'สังคมสูงวัย + ความปลอดภัย', d: 'ความคาดหวังด้านคุณภาพชีวิตและความปลอดภัยสูงขึ้นทุกปี' },
    { ic: '🗂️', t: 'ข้อมูลกระจัดกระจาย', d: 'ตัดสินใจยาก ไม่มีภาพรวม — และต้องโปร่งใส ตรวจสอบได้' },
    { ic: '⏱️', t: 'ตอบสนองช้า เป็นเชิงรับ', d: 'รู้ปัญหาเมื่อสายไปแล้ว แทนที่จะรู้ก่อนและจัดการเชิงรุก' },
  ];
  return (
    <Slide num={2}>
      <Eyebrow alert>โจทย์ของหน่วยงานท้องถิ่น (อปท.)</Eyebrow>
      <Title size={36}>6 ความท้าทายที่ผู้บริหารท้องถิ่นเจอทุกวัน</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 20, flex: 1, minHeight: 0 }}>
        {pains.map((p, i) => (
          <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 14, padding: '16px 18px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 30, lineHeight: 1 }}>{p.ic}</div>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: C.primaryDeep, marginTop: 8, lineHeight: 1.3 }}>{p.t}</h3>
            <p style={{ fontSize: 13.5, color: C.textMuted, marginTop: 5, lineHeight: 1.45 }}>{p.d}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// Slide 3 — the lens (3 audiences win together)
// ---------------------------------------------------------------------------
function SlideLens() {
  const cols = [
    { ic: '👨‍👩‍👧', label: 'ประชาชน', color: C.success, bg: C.successSoft, head: 'ปลอดภัย · สะดวก', d: 'ได้รับบริการที่ดีขึ้น ปลอดภัยขึ้น และเข้าถึงง่ายขึ้น' },
    { ic: '👷', label: 'คนทำงาน', color: C.primary, bg: C.primarySoft, head: 'เบาแรง · ตรงจุด', d: 'ระบบช่วยเฝ้าระวังและคัดกรอง ทำงานน้อยลงแต่ได้ผลมากขึ้น' },
    { ic: '🏛️', label: 'ผู้บริหาร', color: C.accent, bg: C.accentSoft, head: 'ผลงานจับต้องได้', d: 'แก้ปัญหาเชิงรุก โปร่งใส มีข้อมูลและเรื่องราวสื่อสารกับชุมชน' },
  ];
  return (
    <Slide num={3}>
      <Eyebrow>หลักคิดเดียว ใช้ได้ทุกระบบ</Eyebrow>
      <Title size={36}>ทุกระบบออกแบบให้ "ชนะพร้อมกัน" ทั้ง 3 ฝ่าย</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, marginTop: 26, flex: 1, minHeight: 0 }}>
        {cols.map((c, i) => (
          <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, padding: '26px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 46, lineHeight: 1 }}>{c.ic}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: c.color, background: c.bg, alignSelf: 'flex-start', padding: '4px 12px', borderRadius: 100, marginTop: 14 }}>{c.label}</div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: C.primaryDeep, marginTop: 10 }}>{c.head}</h3>
            <p style={{ fontSize: 15, color: C.textMuted, marginTop: 8, lineHeight: 1.55 }}>{c.d}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, background: C.primaryDeep, color: '#FFF', borderRadius: 14, padding: '14px 22px', fontSize: 16, fontWeight: 600, textAlign: 'center' }}>
        เมื่อทั้งสามฝ่ายได้ประโยชน์พร้อมกัน ความสำเร็จของระบบก็กลายเป็น "ผลงานของผู้บริหาร" เอง
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// Closing slide
// ---------------------------------------------------------------------------
function SlideClose() {
  return (
    <Slide num={99} dark>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', maxWidth: 1000 }}>
        <Eyebrow dark>ขั้นต่อไป</Eyebrow>
        <Title dark size={42}>เริ่มจากจุดที่เจ็บที่สุดก่อน — แล้วค่อยขยาย</Title>
        <p style={{ fontSize: 20, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', marginTop: 18 }}>
          ไม่ต้องลงทุนทุกอย่างพร้อมกัน เลือกเรื่องที่ประชาชนร้องมากที่สุด หรือที่ผู้บริหารอยากเห็นผลก่อน
          แล้วต่อยอดทีละระบบบนฐานข้อมูลเดียวกัน
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 24 }}>
          {APPS.map((a, i) => (
            <Link key={i} to={a.route} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '12px 16px', color: '#FFF', textDecoration: 'none', fontSize: 15.5, fontWeight: 600 }}>
              <span style={{ fontSize: 22 }}>{a.emoji}</span>
              <span style={{ flex: 1 }}>{a.name.split(' · ')[1] || a.name}</span>
              <span style={{ opacity: 0.8 }}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// ScaledSlide — fit 1280×720 to viewport (with iOS pinch-zoom guard)
// ---------------------------------------------------------------------------
function ScaledSlide({ children }) {
  const computeScale = () => {
    if (typeof window === 'undefined') return 1;
    const availableW = Math.max(window.innerWidth - 32, 320);
    const availableH = Math.max(window.innerHeight - 160, 320);
    return Math.min(availableW / 1280, availableH / 720, 1);
  };
  const [scale, setScale] = useState(computeScale);
  const lastWidthRef = useRef(typeof window === 'undefined' ? 0 : window.innerWidth);
  useEffect(() => {
    const apply = () => {
      // Skip refits while pinch-zoomed (iOS reports a changed innerWidth mid-pinch).
      if (window.visualViewport && Math.abs(window.visualViewport.scale - 1) > 0.01) return;
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
    <div className="slide-wrapper" style={{ width: 1280 * scale, height: 720 * scale }}>
      <div className="slide-scale" style={{ transform: `scale(${scale})`, width: 1280, height: 720 }}>
        {children}
      </div>
    </div>
  );
}

function DeckStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700;800&display=swap');
      html { scroll-behavior: smooth; }
      .ov-deck-root { font-family: 'Sarabun', sans-serif; background: #6b6b6b; min-height: 100svh; padding-top: 56px; padding-bottom: 40px; max-width: 100%; overflow-x: clip; }
      .ov-toolbar { position: fixed; top: 48px; left: 0; right: 0; height: 44px; background: ${C.primaryDeep}; color: #fff; display: flex; align-items: center; gap: 16px; padding: 0 18px; z-index: 40; font-size: 13px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
      .ov-toolbar button { font-family: inherit; background: rgba(255,255,255,.16); color: #fff; border: none; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 13px; }
      .ov-toolbar button:hover { background: rgba(255,255,255,.28); }
      .ov-toolbar .note { opacity: .75; font-size: 12px; }
      .slide-wrapper { margin: 0 auto 24px; overflow: hidden; }
      .slide-scale { transform-origin: top left; box-shadow: 0 10px 40px rgba(0,0,0,.35); }
      .scroll-dots { right: max(14px, env(safe-area-inset-right, 14px)) !important; max-height: calc(100svh - 120px); overflow-y: auto; scrollbar-width: none; }
      .scroll-dots::-webkit-scrollbar { display: none; }
      @media (max-width: 932px) { .scroll-dots { display: none !important; } }
      @media print {
        @page { size: 1280px 720px; margin: 0; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        html, body { background: #fff !important; }
        nav, .ov-toolbar, .scroll-dots { display: none !important; }
        main { padding-top: 0 !important; }
        .ov-deck-root { background: #fff !important; padding: 0 !important; margin: 0 !important; }
        .slide-wrapper { margin: 0 !important; width: 1280px !important; height: 720px !important; }
        .slide-scale { transform: none !important; box-shadow: none !important; page-break-after: always; }
        .slide-page { box-shadow: none !important; }
      }
    `}</style>
  );
}

function Toolbar({ titles }) {
  const [open, setOpen] = useState(false);
  const goTo = (i) => {
    const el = document.getElementById(`slide-${i + 1}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };
  return (
    <div className="ov-toolbar">
      <span style={{ flex: 1 }} />
      <span className="note">กด "พิมพ์/บันทึก PDF" แล้วเลือก Landscape</span>
      <button onClick={() => setOpen(!open)}>{open ? 'ปิดเมนู' : 'ไปสไลด์...'}</button>
      <button onClick={() => window.print()}>พิมพ์ / บันทึก PDF</button>
      {open && (
        <div style={{ position: 'absolute', top: 44, right: 16, background: '#FFF', color: C.text, borderRadius: 8, boxShadow: '0 10px 30px rgba(0,0,0,.2)', padding: 8, maxHeight: 'calc(100vh - 110px)', overflowY: 'auto', minWidth: 320, zIndex: 1100 }}>
          {titles.map((t, i) => (
            <button key={i} type="button" onClick={() => goTo(i)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', fontSize: 13, color: C.text, background: 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit' }}>
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

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
      if (el) { el.dataset.idx = String(i); observer.observe(el); }
    }
    return () => observer.disconnect();
  }, [count]);
  return (
    <div className="scroll-dots" style={{ position: 'fixed', right: 14, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 8, zIndex: 999, background: 'rgba(0,0,0,0.35)', padding: '12px 8px', borderRadius: 100 }}>
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            type="button"
            aria-label={`ไปยังสไลด์ที่ ${i + 1}`}
            onClick={() => { const el = document.getElementById(`slide-${i + 1}`); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActive(i); }}
            style={{ width: isActive ? 12 : 8, height: isActive ? 12 : 8, padding: 0, borderRadius: '50%', background: isActive ? '#FFF' : 'rgba(255,255,255,0.45)', border: isActive ? `2px solid ${C.primaryHover}` : '1px solid rgba(255,255,255,0.6)', cursor: 'pointer' }}
          />
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
export default function Overview() {
  const slides = [
    SlideTitle,
    SlidePain,
    SlideLens,
    ...APPS.map((app, i) => () => <AppSlide app={app} index={i} />),
    SlideClose,
  ];
  const titles = [
    '1 · 🏁 ภาพรวม · เห็นภาพรวมก่อน เจาะลึกทีหลัง',
    '2 · ⚠️ โจทย์ อปท. · 6 ความท้าทายของผู้บริหารท้องถิ่น',
    '3 · 🎯 หลักคิด · ชนะพร้อมกัน 3 ฝ่าย',
    ...APPS.map((a, i) => `${i + 4} · ${a.emoji} ${a.name.split(' · ')[1] || a.name}`),
    `${APPS.length + 4} · 🚀 ขั้นต่อไป · เริ่มจากจุดที่เจ็บที่สุด`,
  ];
  return (
    <>
      <DeckStyles />
      <RotateHint />
      <Toolbar titles={titles} />
      <ScrollDots count={slides.length} />
      <div className="ov-deck-root">
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
