
import React, { useEffect, useState, useRef } from 'react';

// ---------------------------------------------------------------------------
// ElderlyCare.jsx — Sales Pitch Deck (19 slides · 1280×720 · print-PDF ready)
// Design: Civic Trust palette (Forest #0F6E56 + Cream #FAF7EE + Amber #BA7517)
// Font: Sarabun
// Content: pain-first storytelling tailored to อปท. / เทศบาล executives
// Source: pitch_decks/03_เมนูโครงการดูแลผู้สูงอายุ_ลูกค้าอปท.html
// ---------------------------------------------------------------------------

// Civic Trust palette
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
  success: '#5B8C2A',
  successSoft: '#EAF3DE',
};

const IMG = 'images/elderly-care';
const TOTAL_SLIDES = 20;

// ---------------------------------------------------------------------------
// Slide shell — fixed 1280×720, scaled to viewport (screen) and 1:1 (print)
// ---------------------------------------------------------------------------

function Slide({ num, dark = false, children, footer = '' }) {
  return (
    <section
      className="slide-page"
      data-dark={dark ? 'true' : 'false'}
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
        <div
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: C.primary }}
        />
      )}
      <div style={{ position: 'absolute', inset: 0, padding: '52px 60px 56px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {children}
      </div>
      {footer && (
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: 60,
            fontSize: 12,
            color: dark ? 'rgba(255,255,255,0.7)' : C.textMuted,
            opacity: 0.85,
            fontWeight: 500,
            letterSpacing: 0.5,
          }}
        >
          {footer}
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          bottom: 22,
          right: 38,
          fontSize: 13,
          color: dark ? 'rgba(255,255,255,0.7)' : C.textMuted,
          fontWeight: 500,
        }}
      >
        {num} / {TOTAL_SLIDES}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Atoms
// ---------------------------------------------------------------------------

function Eyebrow({ color, dark, alert, accent, children }) {
  const col = color || (alert ? C.alert : accent ? C.accent : dark ? '#EAE1CC' : C.primary);
  return (
    <p
      style={{
        display: 'inline-block',
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: col,
        marginBottom: 12,
      }}
    >
      {children}
    </p>
  );
}

function Title({ dark, size = 40, children, style }) {
  return (
    <h2
      style={{
        fontSize: size,
        fontWeight: 800,
        lineHeight: 1.4,
        color: dark ? '#FFF' : C.primaryDeep,
        letterSpacing: -0.3,
        ...style,
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
        fontSize: 21,
        fontWeight: 400,
        lineHeight: 1.55,
        color: dark ? 'rgba(255,255,255,0.9)' : C.textMuted,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function Card({ children, dark, style }) {
  return (
    <div
      style={{
        background: dark ? 'rgba(255,255,255,0.08)' : '#FFF',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.16)' : C.surfaceSoft}`,
        borderRadius: 18,
        padding: '24px 26px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CardIcon({ children }) {
  return <span style={{ fontSize: 36, lineHeight: 1, marginBottom: 12, display: 'block' }}>{children}</span>;
}

function CardTitle({ dark, children, style }) {
  return (
    <h3
      style={{
        fontSize: 20,
        fontWeight: 700,
        color: dark ? '#FFF' : C.text,
        marginBottom: 7,
        lineHeight: 1.45,
        ...style,
      }}
    >
      {children}
    </h3>
  );
}

function CardBody({ dark, children, style }) {
  return (
    <p
      style={{
        fontSize: 15,
        color: dark ? 'rgba(255,255,255,0.85)' : C.textMuted,
        lineHeight: 1.55,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function NumBadge({ n }) {
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: C.primary,
        color: '#FFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: 19,
        flexShrink: 0,
      }}
    >
      {n}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Architecture Diagram (Source → Center → Action)
// ---------------------------------------------------------------------------

function ArchitectureDiagram() {
  return (
    <svg viewBox="0 0 900 460" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: '100%', fontFamily: 'Sarabun, sans-serif' }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-eld" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={C.primary} />
        </marker>
        <linearGradient id="grad-coc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.primary} />
          <stop offset="100%" stopColor={C.primaryDeep} />
        </linearGradient>
      </defs>

      <text x="20" y="36" fontSize="12" fontWeight="600" fill={C.textMuted} letterSpacing="1.5">SOURCE</text>
      <text x="20" y="230" fontSize="12" fontWeight="600" fill={C.textMuted} letterSpacing="1.5">CENTER</text>
      <text x="20" y="410" fontSize="12" fontWeight="600" fill={C.textMuted} letterSpacing="1.5">ACTION</text>

      {[
        { x: 130, label: '🏠 ในบ้าน', sub: 'เซนเซอร์เรดาร์', detail: 'ห้องน้ำ · ห้องนอน' },
        { x: 380, label: '⌚ พกติดตัว', sub: 'นาฬิกา + ปุ่ม SOS', detail: 'หัวใจ · GPS' },
        { x: 630, label: '🩸 วัดที่บ้าน', sub: 'BP · น้ำตาล · O₂', detail: 'ผู้สูงอายุวัดเอง · อสม. ช่วย' },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="56" width="200" height="120" rx="14" fill="#FFF" stroke={C.primary} strokeWidth="1.5" />
          <text x={s.x + 100} y="94" textAnchor="middle" fontSize="22" fontWeight="600" fill={C.text}>{s.label}</text>
          <text x={s.x + 100} y="124" textAnchor="middle" fontSize="14" fontWeight="600" fill={C.primary}>{s.sub}</text>
          <text x={s.x + 100} y="148" textAnchor="middle" fontSize="12" fill={C.textMuted}>{s.detail}</text>
          <line x1={s.x + 100} y1="178" x2={s.x + 100} y2="232" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-eld)" />
        </g>
      ))}

      <rect x="130" y="232" width="700" height="100" rx="14" fill="url(#grad-coc)" />
      <text x="480" y="270" textAnchor="middle" fontSize="20" fontWeight="700" fill="#FFF">ศูนย์ดูแลของเทศบาล</text>
      <text x="480" y="296" textAnchor="middle" fontSize="13" fill="#FFF" opacity="0.85">คัดกรองสัญญาณ · จัดลำดับเหตุ · จับคู่กับเจ้าหน้าที่ที่ใกล้สุด</text>
      <text x="480" y="316" textAnchor="middle" fontSize="11" fill="#FFF" opacity="0.7">หน้าจอสรุปภาพรวม · บันทึกเหตุการณ์ครบถ้วน · ตามมาตรฐาน PDPA</text>

      <line x1="220" y1="332" x2="220" y2="385" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-eld)" />
      <line x1="480" y1="332" x2="480" y2="385" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-eld)" />
      <line x1="740" y1="332" x2="740" y2="385" stroke={C.primary} strokeWidth="2" markerEnd="url(#arrow-eld)" />

      {[
        { x: 130, label: '📞 โทรกู้ชีพ', sub: 'เชื่อมสายด่วน 1669' },
        { x: 380, label: '👨‍👩‍👧 แจ้งครอบครัว', sub: 'แอป · LINE · SMS' },
        { x: 630, label: '👨‍⚕️ ส่งให้แพทย์', sub: 'ดูแลก่อนเรื่องใหญ่' },
      ].map((a, i) => (
        <g key={i}>
          <rect x={a.x} y="385" width="200" height="60" rx="12" fill={C.surfaceSoft} stroke={C.primary} strokeWidth="1" strokeDasharray="3,3" />
          <text x={a.x + 100} y="411" textAnchor="middle" fontSize="15" fontWeight="600" fill={C.text}>{a.label}</text>
          <text x={a.x + 100} y="431" textAnchor="middle" fontSize="12" fill={C.textMuted}>{a.sub}</text>
        </g>
      ))}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Slide-deck wrapper — viewport-fit scaling + print CSS
// ---------------------------------------------------------------------------

function DeckStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700;800&display=swap');

      html { scroll-behavior: smooth; }
      .deck-root { font-family: 'Sarabun', sans-serif; background: #6b6b6b; min-height: 100vh; padding-top: 56px; padding-bottom: 40px; }
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

      .slide-wrapper { display: flex; justify-content: center; margin: 0 auto 24px; }

      /* Mobile — keep right-edge nav dots from overlapping the slide on narrow screens,
         and let the dot column scroll instead of overflowing when there are many slides */
      .scroll-dots { max-height: calc(100dvh - 120px); overflow-y: auto; scrollbar-width: none; }
      .scroll-dots::-webkit-scrollbar { display: none; }
      @media (max-width: 700px) { .scroll-dots { display: none !important; } }
      .slide-scale { transform-origin: top left; box-shadow: 0 10px 40px rgba(0,0,0,.35); }

      @media print {
        @page { size: 1280px 720px; margin: 0; }
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        html, body { background: #fff !important; }
        nav, .deck-toolbar, .scroll-dots { display: none !important; }
        main { padding-top: 0 !important; }
        .deck-root { background: #fff !important; padding: 0 !important; margin: 0 !important; }
        .slide-wrapper { margin: 0 !important; width: 1280px !important; height: 720px !important; }
        .slide-scale { transform: none !important; box-shadow: none !important; page-break-after: always; }
        .slide-page { box-shadow: none !important; }
      }
    `}</style>
  );
}

function ScaledSlide({ children }) {
  const [scale, setScale] = useState(1);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function compute() {
      const targetW = 1280;
      const targetH = 720;
      // visualViewport.height excludes mobile browser chrome (address bar) — falls back to innerHeight
      const vh = window.visualViewport?.height ?? window.innerHeight;
      const availableW = Math.max(window.innerWidth - 32, 320);
      const availableH = Math.max(vh - 160, 320);
      const s = Math.min(availableW / targetW, availableH / targetH, 1);
      setScale(s);
    }
    compute();
    window.addEventListener('resize', compute);
    window.addEventListener('orientationchange', compute);
    window.visualViewport?.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('resize', compute);
      window.removeEventListener('orientationchange', compute);
      window.visualViewport?.removeEventListener('resize', compute);
    };
  }, []);

  return (
    <div className="slide-wrapper" ref={wrapperRef} style={{ width: 1280 * scale, height: 720 * scale }}>
      <div className="slide-scale" style={{ transform: `scale(${scale})`, width: 1280, height: 720 }}>
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 1 — HERO (Pain opening)
// ---------------------------------------------------------------------------

function Slide01() {
  return (
    <Slide num={1} dark>
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr .85fr', gap: 48, alignItems: 'center', height: '100%' }}>
        <div>
          <Eyebrow dark>เทศบาลของท่าน · ดูแลผู้สูงอายุในตำบล</Eyebrow>
          <h1 style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.4, color: '#FFF', letterSpacing: -0.5 }}>
            ผู้สูงอายุล้มในบ้านลำพัง<br />
            กว่าจะมีคนเดินไปเจอ<br />
            <span style={{ color: C.surfaceSoft }}>บางครั้งก็สายเกินไป</span>
          </h1>
          <Lead dark style={{ marginTop: 24 }}>
            ทุกวันนี้คนวัยทำงานออกไปทำงานนอกบ้าน เหลือผู้สูงอายุอยู่บ้านคนเดียวตอนกลางวัน
            เมื่อล้ม วูบ หรือหมดสติ — ไม่มีใครรู้ทัน และเทศบาลก็ไม่มีเครื่องมือที่จะรู้ก่อน
          </Lead>
        </div>
        <div style={{ width: '100%', aspectRatio: '4/5', borderRadius: 18, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.45)' }}>
          <img src={`${IMG}/hero-elderly.png`} alt="ผู้สูงอายุไทยที่บ้าน" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 2 — 4 Pain Points
// ---------------------------------------------------------------------------

function Slide02() {
  const pains = [
    { icon: '🚨', title: 'ล้มในห้องน้ำ ไม่มีคนรู้', desc: 'ผู้สูงอายุอยู่บ้านลำพังตอนกลางวัน เมื่อล้มหรือหมดสติ กว่าจะมีคนเดินมาเจอ บางครั้งก็สายไปแล้ว' },
    { icon: '👁️', title: 'ติดกล้องในห้อง = ผู้เฒ่าอึดอัด', desc: 'ผู้สูงอายุส่วนใหญ่ไม่ยอมให้ติดกล้องในห้องนอนหรือห้องน้ำ เพราะรู้สึกถูกจ้องและเสียศักดิ์ศรี' },
    { icon: '👥', title: 'อสม. หนึ่งคน ดูแลหลายสิบหลัง', desc: 'อาสาสมัครและเจ้าหน้าที่มีจำกัด เฝ้าผู้สูงอายุได้ไม่ตลอด 24 ชม. โดยเฉพาะกลางคืนและวันหยุด' },
    { icon: '📞', title: 'กว่าจะรู้ ก็โทรหากันวุ่นไปหมด', desc: 'เมื่อเกิดเหตุ ต้องโทรตามลูกหลาน ตามเจ้าหน้าที่ กว่าจะถึงมือคนช่วยจริง เสียเวลาไปมาก' },
  ];
  return (
    <Slide num={2}>
      <Eyebrow alert>ปัญหาที่เทศบาลเจอจริง</Eyebrow>
      <Title>4 เรื่องที่วิธีดูแลแบบเดิม ตามไม่ทัน</Title>
      <Lead style={{ marginTop: 12, maxWidth: 1020 }}>
        วิธีดูแลผู้สูงอายุที่ใช้กันอยู่ส่วนใหญ่ ต้องรอให้ "คนเห็น" ก่อน แล้วจึงช่วย
        คำถามคือ — ระหว่างที่ยังไม่มีใครเห็น เกิดอะไรขึ้น?
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24, flex: 1, alignContent: 'center' }}>
        {pains.map((p, i) => (
          <Card key={i}>
            <CardIcon>{p.icon}</CardIcon>
            <CardTitle>{p.title}</CardTitle>
            <CardBody>{p.desc}</CardBody>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 3 — แนวทางใหม่ "รู้ก่อน"
// ---------------------------------------------------------------------------

function Slide03() {
  return (
    <Slide num={3}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Eyebrow>แนวทางใหม่</Eyebrow>
        <Title size={46}>
          ระบบ "รู้ก่อน"<br />ที่ใครจะเดินไปเจอ
        </Title>
        <Lead style={{ marginTop: 18, maxWidth: 940 }}>
          แทนที่จะรอให้คนเห็นแล้วค่อยช่วย — เราติดตั้งระบบเฝ้าระวังที่คอยดูแลผู้สูงอายุตลอด 24 ชั่วโมง
          เมื่อเกิดเหตุ ระบบ <strong style={{ color: C.primary }}>แจ้งเตือนทันที</strong> และ
          <strong style={{ color: C.primary }}> ส่งต่อให้คนที่รับผิดชอบจริง</strong> โดยไม่ต้องรอให้ใครบังเอิญเดินไปเจอ
        </Lead>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 32 }}>
          {[
            { ic: '🏠', t: 'ในบ้าน', d: 'เฝ้าระวังการล้มและสัญญาณผิดปกติ ในห้องส่วนตัว โดยไม่ต้องติดกล้อง' },
            { ic: '⌚', t: 'นอกบ้าน', d: 'อุปกรณ์พกติดตัว มีปุ่มขอความช่วยเหลือ เรียกได้ทุกที่ในตำบล' },
            { ic: '📊', t: 'ที่ศูนย์เทศบาล', d: 'เจ้าหน้าที่เห็นภาพรวมสุขภาพผู้สูงอายุทั้งตำบล วางแผนดูแลได้ตรงจุด' },
          ].map((p, i) => (
            <Card key={i} style={{ border: `2px solid ${C.primary}` }}>
              <CardIcon>{p.ic}</CardIcon>
              <CardTitle>{p.t}</CardTitle>
              <CardBody>{p.d}</CardBody>
            </Card>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 4 — ระบบทำงานอย่างไร (Architecture Diagram)
// ---------------------------------------------------------------------------

function Slide04() {
  return (
    <Slide num={4}>
      <Eyebrow>ระบบทำงานอย่างไร</Eyebrow>
      <Title size={36}>จาก 3 จุดข้อมูล สู่ศูนย์เทศบาลใน 1 นาที</Title>
      <Lead style={{ marginTop: 6, marginBottom: 4, fontSize: 17 }}>
        รวมสัญญาณจากในบ้าน · อุปกรณ์พกติดตัว · เครื่องวัดสุขภาพที่บ้าน เข้าศูนย์ของเทศบาล แล้วส่งต่อให้คนที่รับผิดชอบจริง
      </Lead>
      <div style={{ marginTop: 10, padding: '12px 18px', background: '#FFF', borderRadius: 18, border: `1px solid ${C.surfaceSoft}`, flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ArchitectureDiagram />
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 5 — อุปกรณ์ที่ผู้สูงอายุได้รับ
// ---------------------------------------------------------------------------

function Slide05() {
  const devices = [
    { ic: '⌚', t: 'นาฬิกาเฝ้าระวังหัวใจ', d: 'สวมข้อมือตลอดวัน คอยจับจังหวะการเต้นของหัวใจ ระดับออกซิเจน และการหายใจ', s: 'จับสัญญาณ: หัวใจเต้นผิดจังหวะ · ภาวะหยุดหายใจขณะนอน' },
    { ic: '🩸', t: 'เครื่องวัดความดัน', d: 'วัดความดันที่บ้านได้เอง ส่งค่าเข้าระบบอัตโนมัติ ไม่ต้องจดใส่กระดาษ', s: 'จับสัญญาณ: ความดันสูง/ต่ำผิดปกติ' },
    { ic: '💉', t: 'เครื่องเจาะน้ำตาลปลายนิ้ว', d: 'ตรวจระดับน้ำตาลในเลือด เหมาะกับผู้ป่วยเบาหวานที่ต้องเฝ้าระวัง', s: 'จับสัญญาณ: น้ำตาลในเลือดสูง/ต่ำ' },
    { ic: '🌡️', t: 'เครื่องวัดออกซิเจน · ไข้ · น้ำหนัก', d: 'วัดออกซิเจนปลายนิ้ว วัดไข้ และชั่งน้ำหนัก เชื่อมเข้าระบบในชุดเดียวกัน', s: 'จับสัญญาณ: ออกซิเจนต่ำ · มีไข้ · น้ำหนักเปลี่ยน' },
  ];
  return (
    <Slide num={5}>
      <Eyebrow accent>สิ่งที่ผู้สูงอายุได้รับ</Eyebrow>
      <Title>ผู้สูงอายุแต่ละคนได้อะไรบ้าง?</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        ไม่ใช่แค่แอปในมือถือ — ผู้สูงอายุที่เข้าร่วมโครงการได้รับ "ชุดดูแลสุขภาพ" ที่คอยจับสัญญาณร่างกายให้
        และแต่ละชิ้นดูแลคนละเรื่อง
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '0.78fr 1fr 1fr', gap: 16, marginTop: 14, flex: 1, alignContent: 'center' }}>
        <div style={{ borderRadius: 18, overflow: 'hidden', background: C.primarySoft, height: '100%', display: 'flex' }}>
          <img src={`${IMG}/health-kit.png`} alt="ชุดอุปกรณ์ดูแลสุขภาพ" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 14 }}>
          {devices.slice(0, 2).map((d, i) => (
            <DeviceCard key={i} {...d} />
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 14 }}>
          {devices.slice(2, 4).map((d, i) => (
            <DeviceCard key={i} {...d} />
          ))}
        </div>
      </div>
      <p style={{ fontSize: 12.5, color: C.primary, fontWeight: 600, marginTop: 10 }}>
        อุปกรณ์ทุกชิ้นทำหน้าที่ "จับสัญญาณเบื้องต้น" แล้วส่งให้แพทย์เป็นผู้วินิจฉัย — ระบบไม่วินิจฉัยเอง
      </p>
    </Slide>
  );
}

function DeviceCard({ ic, t, d, s }) {
  return (
    <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 16, padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ fontSize: 30, lineHeight: 1, flexShrink: 0 }}>{ic}</div>
      <div>
        <h4 style={{ fontSize: 16, fontWeight: 700, color: C.primary, marginBottom: 4, lineHeight: 1.25 }}>{t}</h4>
        <p style={{ fontSize: 12.5, color: C.textMuted, lineHeight: 1.45, marginBottom: 6 }}>{d}</p>
        <span style={{ display: 'inline-block', fontSize: 11.5, fontWeight: 600, color: C.accent, background: C.accentSoft, padding: '3px 9px', borderRadius: 100 }}>{s}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 6 — สัญญาณ → แพทย์
// ---------------------------------------------------------------------------

function Slide06() {
  const rows = [
    ['หัวใจเต้นผิดจังหวะ', 'โรคหัวใจ · เสี่ยงหลอดเลือดสมอง', 'ส่งตรวจเพิ่ม · ป้องกันก่อนเกิดอัมพาต'],
    ['ความดันสูงต่อเนื่อง', 'ความดันโลหิตสูง', 'ปรับยา · คุมก่อนเกิดภาวะแทรกซ้อน'],
    ['น้ำตาลในเลือดผิดปกติ', 'เบาหวาน · ภาวะน้ำตาลต่ำ', 'ปรับการดูแล · ลดเสี่ยงฉุกเฉิน'],
    ['ออกซิเจนต่ำ · หายใจผิดปกติ', 'โรคปอด · ภาวะหยุดหายใจขณะนอน', 'ส่งตรวจปอด · ดูแลการนอน'],
  ];
  return (
    <Slide num={6}>
      <Eyebrow>จากสัญญาณ สู่การดูแล</Eyebrow>
      <Title>ข้อมูลที่เก็บได้ ช่วยให้แพทย์เห็นอะไรล่วงหน้า</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        ระบบเก็บสัญญาณร่างกายต่อเนื่อง ไม่ใช่แค่วัดทีเดียวตอนไปหาหมอ —
        ทำให้แพทย์เห็น "แนวโน้ม" และสังเกตความผิดปกติได้ก่อนที่จะกลายเป็นเรื่องใหญ่
      </Lead>
      <div style={{ marginTop: 18, background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.6fr 1.9fr', background: C.primary }}>
          {['สัญญาณที่ระบบจับได้', 'อาจเป็นสัญญาณเตือนของ', 'แพทย์นำไปใช้'].map((h, i) => (
            <div key={i} style={{ padding: '14px 18px', color: '#FFF', fontWeight: 700, fontSize: 15 }}>{h}</div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.6fr 1.9fr', borderTop: `1px solid ${C.surfaceSoft}` }}>
            <div style={{ padding: '14px 18px', fontSize: 14.5, color: C.primary, fontWeight: 600, lineHeight: 1.4 }}>{r[0]}</div>
            <div style={{ padding: '14px 18px', fontSize: 14.5, color: C.text, lineHeight: 1.4 }}>{r[1]}</div>
            <div style={{ padding: '14px 18px', fontSize: 14.5, color: C.text, lineHeight: 1.4 }}>{r[2]}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12.5, color: C.textMuted, fontStyle: 'italic', marginTop: 10 }}>
        ระบบทำหน้าที่จับสัญญาณและคัดกรองเบื้องต้นเท่านั้น · การวินิจฉัยและรักษาเป็นของแพทย์
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 7 — ป้องกันถูกกว่ารักษา
// ---------------------------------------------------------------------------

function Slide07() {
  return (
    <Slide num={7} dark>
      <Eyebrow dark>ทำไมคุ้มกว่า</Eyebrow>
      <Title dark>ป้องกันไว้ก่อน คุ้มกว่ารักษาปลายทาง</Title>
      <Lead dark style={{ marginTop: 10, maxWidth: 1040 }}>
        เมื่อจับสัญญาณได้เร็ว ผู้สูงอายุได้รับการดูแลตั้งแต่เนิ่นๆ —
        แทนที่จะรอจนอาการหนักแล้วต้องนอนโรงพยาบาล ซึ่งเป็นภาระทั้งครอบครัวและงบประมาณ
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 20, alignContent: 'center' }}>
        <Card dark>
          <CardTitle dark style={{ marginBottom: 12 }}>🔁 แบบเดิม · รอจนป่วยหนัก</CardTitle>
          <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: 15.5, lineHeight: 1.9 }}>
            • รู้ตัวเมื่ออาการหนักแล้ว<br />
            • ต้องนอนโรงพยาบาล ค่าใช้จ่ายสูง<br />
            • ครอบครัวต้องหยุดงานมาดูแล<br />
            • บางครั้งกลายเป็นผู้ป่วยติดเตียง
          </p>
        </Card>
        <Card>
          <CardTitle style={{ color: C.primary, marginBottom: 12 }}>✅ แบบใหม่ · จับสัญญาณก่อน</CardTitle>
          <p style={{ color: C.text, fontSize: 15.5, lineHeight: 1.9 }}>
            • เห็นความผิดปกติแต่เนิ่นๆ<br />
            • ดูแลที่บ้านได้ ไม่ต้องนอน รพ. บ่อย<br />
            • ครอบครัวอุ่นใจ ไม่ต้องเฝ้าตลอด<br />
            • ลดโอกาสเป็นผู้ป่วยติดเตียง
          </p>
        </Card>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 18 }}>
        {[
          { t: '📲 วัดเองที่บ้าน', d: 'ผู้สูงอายุ/ผู้ดูแลวัดเอง ค่าส่งเข้าระบบอัตโนมัติ' },
          { t: '👥 อสม. ช่วยวัดตอนเยี่ยม', d: 'อสม. นำชุดวัดไปเยี่ยมบ้าน บันทึกให้อัตโนมัติ' },
          { t: '⌚ เฝ้าต่อเนื่องอัตโนมัติ', d: 'นาฬิกาจับสัญญาณหัวใจตลอดวันโดยไม่ต้องทำอะไร' },
        ].map((x, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 14, padding: '14px 18px' }}>
            <h4 style={{ color: '#FFF', fontSize: 16, fontWeight: 700, marginBottom: 3 }}>{x.t}</h4>
            <p style={{ color: 'rgba(255,255,255,.82)', fontSize: 13.5 }}>{x.d}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 8 — 3 จุดต่าง
// ---------------------------------------------------------------------------

function Slide08() {
  const diffs = [
    { ic: '🛡️', t: 'ไม่ต้องติดกล้องในห้องส่วนตัว', d: 'ใช้เซนเซอร์ที่เห็น "การเคลื่อนไหว" ไม่เห็นภาพตัวคน ผู้สูงอายุยอมรับได้ ครอบครัวสบายใจ' },
    { ic: '📞', t: 'เตือนแล้วมีคนรับสายจริง', d: 'ไม่ใช่แค่แจ้งเตือนลอยๆ — ระบบเชื่อมต่อกับเจ้าหน้าที่และสายด่วนฉุกเฉิน 1669 ตามขั้นตอนที่ตกลงไว้' },
    { ic: '🏆', t: 'เทศบาลได้ข้อมูล และได้ภาพลักษณ์', d: 'มีข้อมูลสุขภาพผู้สูงอายุทั้งตำบล ใช้ตอบสภาฯ และต่อยอดสมัครรางวัล อปท. ดีเด่นได้' },
  ];
  return (
    <Slide num={8} dark>
      <Eyebrow dark>ทำไมต้องแบบนี้</Eyebrow>
      <Title dark>3 เรื่องที่ทำให้ท่านมั่นใจได้</Title>
      <Lead dark style={{ marginTop: 12, maxWidth: 1000 }}>
        ในตลาดมีคนขาย "ชุดวัดสุขภาพ + แอป" หลายเจ้า แต่ 3 เรื่องนี้คือสิ่งที่ทำให้แนวทางของเราต่าง
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 30, flex: 1, alignContent: 'center' }}>
        {diffs.map((d, i) => (
          <Card key={i} dark>
            <CardIcon>{d.ic}</CardIcon>
            <CardTitle dark>{d.t}</CardTitle>
            <CardBody dark>{d.d}</CardBody>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 9 — Privacy (radar)
// ---------------------------------------------------------------------------

function Slide09() {
  const zones = [
    {
      tag: '🏠 ในห้องส่วนตัว',
      tagBg: C.primarySoft,
      tagColor: C.primary,
      title: 'เซนเซอร์เรดาร์',
      sub: 'เห็นการเคลื่อนไหว ไม่เห็นภาพ',
      img: `${IMG}/radar-technical.png`,
      imgFit: 'contain',
      bullets: [
        'ไม่บันทึกภาพ — เห็นแต่การเคลื่อนไหว',
        'ติดในห้องน้ำ/ห้องนอนได้ ตามหลัก PDPA',
        'ทำงานได้แม้ในที่มืด',
      ],
    },
    {
      tag: '🏙️ ในพื้นที่สาธารณะ',
      tagBg: C.accentSoft,
      tagColor: C.accent,
      title: 'AI ต่อยอด CCTV เดิม',
      sub: 'อัปเกรดกล้องที่เทศบาลมีอยู่',
      img: `${IMG}/pillar-cctv.jpg`,
      imgFit: 'contain',
      bullets: [
        'ใช้กล้องเดิม ไม่ต้องเปลี่ยน',
        'แจ้งเตือนเมื่อพบคนล้ม/นอนนิ่ง',
        'ขยายไปงานจราจร/ขยะได้ในระบบเดียว',
      ],
    },
    {
      tag: '⌚ เมื่อออกนอกบ้าน',
      tagBg: C.successSoft,
      tagColor: C.success,
      title: 'นาฬิกา + ปุ่ม SOS',
      sub: 'เรียกได้ทุกที่ในตำบล',
      img: `${IMG}/pillar-wearable.jpg`,
      imgFit: 'contain',
      bullets: [
        'จับสัญญาณหัวใจตลอดวัน',
        'ปุ่มฉุกเฉิน + GPS ระบุพิกัด',
        'เชื่อมกับศูนย์เทศบาลทันที',
      ],
    },
  ];
  return (
    <Slide num={9} dark>
      <Eyebrow dark>ครอบคลุมทุกที่ที่ผู้สูงอายุไป</Eyebrow>
      <Title dark size={32}>3 พื้นที่ · 3 เซนเซอร์ ที่เหมาะกับแต่ละจุด</Title>
      <Lead dark style={{ marginTop: 6, marginBottom: 4, fontSize: 16 }}>
        ในห้องส่วนตัวไม่มีกล้อง · ในที่สาธารณะอัปเกรดกล้องเดิม · นอกบ้านมีนาฬิกาพกติดตัว
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 12, flex: 1, minHeight: 0 }}>
        {zones.map((z, i) => (
          <div key={i} style={{ background: '#FFF', borderRadius: 16, padding: 14, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ width: '100%', flex: 1, minHeight: 200, borderRadius: 12, overflow: 'hidden', background: C.primarySoft, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={z.img} alt={z.title} style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: z.imgFit }} />
            </div>
            <span style={{ display: 'inline-block', alignSelf: 'flex-start', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100, background: z.tagBg, color: z.tagColor, marginBottom: 6 }}>{z.tag}</span>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: C.primaryDeep, lineHeight: 1.35, marginBottom: 2 }}>{z.title}</h3>
            <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.45, marginBottom: 6 }}>{z.sub}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {z.bullets.map((b, j) => (
                <li key={j} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.45, padding: '2px 0 2px 18px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.success, fontWeight: 800 }}>✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 10 — เมนูโครงการ intro
// ---------------------------------------------------------------------------

function Slide10() {
  return (
    <Slide num={10}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Eyebrow accent>เลือกได้ตามความพร้อม</Eyebrow>
        <Title size={42}>ท่านไม่ต้องลงทุนทั้งตำบลในครั้งเดียว</Title>
        <Lead style={{ marginTop: 18, maxWidth: 960 }}>
          เรามี 3 รูปแบบโครงการให้ท่านเลือกตามความพร้อมและงบประมาณ —
          เริ่มจากเล็กเพื่อทดลอง หรือทำเต็มรูปแบบเลยก็ได้
          แต่ละแบบใช้แหล่งงบที่ต่างกัน ท่านชี้ได้เลยว่าแบบไหนเหมาะกับเทศบาลของท่าน
        </Lead>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 30 }}>
          {[
            { ic: '🌱', t: 'แบบที่ 1 · เริ่มเล็ก', d: 'ทดลองในชุมชนเดียว ความเสี่ยงต่ำ' },
            { ic: '🌿', t: 'แบบที่ 2 · ดูแลทั้งตำบล', d: 'ขยายครอบคลุมกลุ่มเสี่ยง' },
            { ic: '🚒', t: 'แบบที่ 3 · รวมงานป้องกันภัย', d: 'ผูกกับงานกู้ชีพ–บรรเทาสาธารณภัย' },
          ].map((m, i) => (
            <Card key={i} style={{ textAlign: 'center' }}>
              <CardIcon>{m.ic}</CardIcon>
              <CardTitle>{m.t}</CardTitle>
              <CardBody>{m.d}</CardBody>
            </Card>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 11 — เมนู 3 โครงการ รายละเอียด
// ---------------------------------------------------------------------------

function Slide11() {
  const menus = [
    {
      tag: 'เริ่มเล็ก',
      tagBg: C.primary,
      title: 'แบบที่ 1\nนำร่อง 1 ชุมชน',
      who: 'เหมาะกับ: ท่านที่อยากเห็นผลก่อนตัดสินใจลงทุนใหญ่',
      items: [
        'เฝ้าระวังผู้สูงอายุกลุ่มเสี่ยงในชุมชนเดียว',
        'ทดลองใช้ระยะสั้น เก็บผลจริง',
        'มีรายงานให้ท่านใช้ตอบสภาฯ',
        'ความเสี่ยงงบประมาณต่ำที่สุด',
      ],
      budget: '💰 เริ่มได้ในงบกองทุนสุขภาพท้องถิ่น (กปท.)',
    },
    {
      tag: 'ทั้งตำบล',
      tagBg: '#4A7C59',
      title: 'แบบที่ 2\nดูแลครอบคลุมทั้งตำบล',
      who: 'เหมาะกับ: ท่านที่พร้อมดูแลผู้สูงอายุกลุ่มเสี่ยงทั่วเขต',
      items: [
        'ขยายการเฝ้าระวังตามชุมชนที่เสี่ยงสูง',
        'ศูนย์เทศบาลเห็นภาพรวมทั้งตำบล',
        'ครอบครัวรับรู้สถานะผู้สูงอายุได้',
        'เชื่อมต่อระบบสุขภาพในพื้นที่',
      ],
      budget: '💰 ใช้งบดูแลผู้มีภาวะพึ่งพิงระยะยาว (LTC) + กปท.',
    },
    {
      tag: 'รวมป้องกันภัย',
      tagBg: C.accent,
      title: 'แบบที่ 3\nรวมงานกู้ชีพ–บรรเทาภัย',
      who: 'เหมาะกับ: ท่านที่มีงานป้องกันสาธารณภัยอยู่แล้ว',
      items: [
        'ผูกกับงานกู้ชีพ–รถฉุกเฉินของเทศบาล',
        'เชื่อมการแจ้งเหตุเข้าระบบฉุกเฉิน 1669',
        'ดูแลทั้งสุขภาพและความปลอดภัยในเขต',
        'ระบบเดียว ตอบได้หลายภารกิจ',
      ],
      budget: '💰 ใช้งบป้องกันสาธารณภัย + งบโครงการ',
    },
  ];
  return (
    <Slide num={11}>
      <Eyebrow accent>เมนูโครงการ</Eyebrow>
      <Title>เลือกแบบที่เหมาะกับเทศบาลของท่าน</Title>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 18, flex: 1 }}>
        {menus.map((m, i) => (
          <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 20, padding: '28px 26px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <span style={{ position: 'absolute', top: 0, right: 0, background: m.tagBg, color: '#FFF', fontSize: 13, fontWeight: 700, padding: '6px 16px', borderBottomLeftRadius: 14 }}>{m.tag}</span>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: C.primaryDeep, marginBottom: 4, lineHeight: 1.2, whiteSpace: 'pre-line' }}>{m.title}</h3>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: C.textMuted, marginBottom: 12, display: 'block' }}>{m.who}</span>
            <ul style={{ listStyle: 'none', margin: '6px 0 0 0', padding: 0 }}>
              {m.items.map((it, j) => (
                <li key={j} style={{ fontSize: 14.5, color: C.text, lineHeight: 1.5, padding: '5px 0 5px 22px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.success, fontWeight: 800 }}>✓</span>
                  {it}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 'auto', paddingTop: 14, fontSize: 13.5, fontWeight: 600, color: C.primary, borderTop: `1px dashed ${C.surfaceSoft}` }}>{m.budget}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11.5, color: C.textMuted, fontStyle: 'italic', marginTop: 8 }}>
        แหล่งงบเป็นแนวทางเบื้องต้น · ทีมงานจะช่วยท่านตรวจสอบความเหมาะสมกับระเบียบของแต่ละกองทุน
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 12 — Escalation flow
// ---------------------------------------------------------------------------

function FlowBox({ alert, success, children }) {
  const border = alert ? C.alert : success ? C.success : C.primary;
  return (
    <div style={{ background: '#FFF', border: `2px solid ${border}`, borderRadius: 14, padding: '16px 20px', textAlign: 'center' }}>
      {children}
    </div>
  );
}

function Slide12() {
  return (
    <Slide num={12}>
      <Eyebrow>คำถามสำคัญที่สุด</Eyebrow>
      <Title>เตือนแล้ว... ใครรับสาย?</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        ท่านไม่ต้องจ้างคนนั่งเฝ้าหน้าจอ 24 ชั่วโมง — ระบบแบ่งการรับเหตุเป็น 2 ช่วงชัดเจน
      </Lead>
      <div style={{ marginTop: 16, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
        <div style={{ maxWidth: 700, margin: '0 auto', width: '100%' }}>
          <FlowBox alert>
            <h4 style={{ fontSize: 17, fontWeight: 700, color: C.alert, marginBottom: 4 }}>⚠ เกิดเหตุ — ผู้สูงอายุล้ม / กดปุ่ม / สัญญาณผิดปกติ</h4>
            <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.4 }}>ระบบเฝ้าระวังตรวจจับ และคัดกรองว่าเป็นเหตุจริง ก่อนแจ้งเตือน</p>
          </FlowBox>
        </div>
        <div style={{ fontSize: 26, color: C.primary, textAlign: 'center', fontWeight: 800 }}>↓</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <FlowBox>
            <h4 style={{ fontSize: 17, fontWeight: 700, color: C.primary, marginBottom: 4 }}>🕘 ในเวลาราชการ</h4>
            <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.4 }}>
              <strong style={{ color: C.text }}>เจ้าหน้าที่เทศบาล / กองสาธารณสุข</strong> เฝ้าหน้าจอ รับเหตุ และตัดสินใจส่งต่อ
            </p>
          </FlowBox>
          <FlowBox>
            <h4 style={{ fontSize: 17, fontWeight: 700, color: C.primary, marginBottom: 4 }}>🌙 นอกเวลาราชการ / ไม่มีคนรับใน X นาที</h4>
            <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.4 }}>
              ระบบ <strong style={{ color: C.text }}>โอนอัตโนมัติ</strong> ไปยังสายด่วนฉุกเฉิน <strong style={{ color: C.text }}>1669</strong> หรือหน่วยกู้ภัย / โรงพยาบาล ที่ตกลงไว้ล่วงหน้า
            </p>
          </FlowBox>
        </div>
        <div style={{ fontSize: 26, color: C.primary, textAlign: 'center', fontWeight: 800 }}>↓</div>
        <div style={{ maxWidth: 700, margin: '0 auto', width: '100%' }}>
          <FlowBox success>
            <h4 style={{ fontSize: 17, fontWeight: 700, color: C.success, marginBottom: 4 }}>✓ คนช่วยถึงตัวผู้สูงอายุ · บันทึกเหตุการณ์ครบถ้วน</h4>
            <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.4 }}>ทุกขั้นตอนถูกบันทึกตามมาตรฐานคุ้มครองข้อมูลส่วนบุคคล (PDPA)</p>
          </FlowBox>
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 13 — RACI
// ---------------------------------------------------------------------------

function Slide13() {
  const raci = [
    { who: 'ระบบ (ของเรา)', do: 'เฝ้าระวัง · แจ้งเตือน · คัดกรองเบื้องต้น · ส่งต่อตามขั้นตอน — ไม่วินิจฉัย ไม่รักษา' },
    { who: 'เจ้าหน้าที่เทศบาล', do: 'รับเหตุในเวลาราชการ · ตัดสินใจส่งต่อ · ประสานครอบครัว' },
    { who: 'อสม. / ผู้ดูแล', do: 'ช่วยติดตามเยี่ยมบ้านเฉพาะรายที่ระบบแจ้ง — ไม่ต้องเดินตรวจทุกหลังทุกวัน' },
    { who: 'สายด่วน 1669 / รพ.', do: 'วินิจฉัยและรักษา ตามมาตรฐานการแพทย์ — เหมือนที่ทำอยู่ทุกวันนี้' },
  ];
  return (
    <Slide num={13}>
      <Eyebrow>ความรับผิดชอบชัดเจน</Eyebrow>
      <Title>ใครทำหน้าที่อะไร — ไม่มีภาระลอยๆ</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        เรื่องที่ผู้บริหารกังวลที่สุดคือ "ถ้าเกิดเหตุ ใครรับผิดชอบ" — เราตอบชัดตั้งแต่ต้น
      </Lead>
      <div style={{ marginTop: 18, background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {raci.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.4fr 2.6fr', borderBottom: i < raci.length - 1 ? `1px solid ${C.surfaceSoft}` : 'none' }}>
            <div style={{ padding: '16px 18px', fontWeight: 700, color: C.primary, fontSize: 16, background: C.primarySoft }}>{r.who}</div>
            <div style={{ padding: '16px 18px', fontSize: 15, color: C.text, lineHeight: 1.45 }}>{r.do}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 13, color: C.primary, fontWeight: 600, marginTop: 12 }}>
        การวินิจฉัยและรักษายังเป็นหน้าที่ของบุคลากรการแพทย์เช่นเดิม เทศบาลทำหน้าที่เฝ้าระวังและส่งต่อเท่านั้น
      </p>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 14 — อสม. (osm-visit.png)
// ---------------------------------------------------------------------------

function Slide14() {
  return (
    <Slide num={14}>
      <Eyebrow>เบาแรง อสม. และเจ้าหน้าที่</Eyebrow>
      <Title>ระบบนี้ช่วยลดงาน ไม่ใช่เพิ่มงาน</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, marginTop: 20, flex: 1, alignContent: 'center' }}>
        <Card style={{ border: `2px solid ${C.alert}` }}>
          <span style={{ display: 'inline-block', fontSize: 13, fontWeight: 600, padding: '5px 12px', borderRadius: 100, background: C.alertSoft, color: C.alert, marginBottom: 12 }}>แบบเดิม</span>
          <CardTitle style={{ marginBottom: 12 }}>อสม. ต้องเดินเคาะบ้านทุกหลัง</CardTitle>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: C.textMuted }}>
            เดินตรวจเยี่ยมผู้สูงอายุทุกหลังทุกวัน ใช้เวลามาก กำลังคนไม่พอ
            และยังไม่รู้ว่าระหว่างวันบ้านไหนเกิดเหตุ
          </p>
        </Card>
        <div style={{ borderRadius: 18, overflow: 'hidden', background: C.primarySoft }}>
          <img src={`${IMG}/osm-visit.png`} alt="อสม. เยี่ยมผู้สูงอายุที่บ้าน" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <Card style={{ border: `2px solid ${C.success}` }}>
          <span style={{ display: 'inline-block', fontSize: 13, fontWeight: 600, padding: '5px 12px', borderRadius: 100, background: C.successSoft, color: C.success, marginBottom: 12 }}>แบบใหม่</span>
          <CardTitle style={{ marginBottom: 12 }}>ระบบเฝ้าให้ — อสม. ไปเฉพาะที่จำเป็น</CardTitle>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: C.textMuted }}>
            ระบบเฝ้าระวังตลอด 24 ชม. แทน อสม. จะไปเยี่ยมเฉพาะบ้านที่ระบบแจ้งว่ามีเรื่อง
            กำลังคนเท่าเดิม แต่ดูแลได้ทั่วถึงและตรงจุดกว่า
          </p>
        </Card>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 15 — ต่อยอดจากสิ่งที่มี
// ---------------------------------------------------------------------------

function Slide15() {
  const items = [
    { n: 1, t: 'ศูนย์ดูแลที่เทศบาลมีอยู่', d: 'เพิ่มหน้าจอติดตามให้ ไม่ต้องสร้างศูนย์ใหม่' },
    { n: 2, t: 'งาน อสม. และเยี่ยมบ้านที่ทำอยู่', d: 'ระบบช่วยบอกว่าควรไปบ้านไหนก่อน ไม่ทิ้งของเดิม' },
    { n: 3, t: 'งานกู้ชีพ–รถฉุกเฉินในพื้นที่', d: 'เชื่อมการแจ้งเหตุเข้าช่องทางที่กู้ชีพรู้จักอยู่แล้ว' },
    { n: 4, t: 'งบกองทุนที่ท่านมีสิทธิใช้', d: 'เริ่มได้ด้วยงบที่หน่วยงานมีอยู่ ไม่ต้องรองบก้อนใหม่' },
  ];
  return (
    <Slide num={15}>
      <Eyebrow accent>ไม่ต้องเริ่มจากศูนย์</Eyebrow>
      <Title>ต่อยอดจากสิ่งที่เทศบาลมีอยู่แล้ว</Title>
      <Lead style={{ marginTop: 12, maxWidth: 1020 }}>
        เราออกแบบให้ทำงานบนสิ่งที่ท่านลงทุนไปแล้ว ลดงบประมาณรอบใหม่ และลดเวลาติดตั้ง
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 24, flex: 1, alignContent: 'center' }}>
        {items.map((it, i) => (
          <Card key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <NumBadge n={it.n} />
            <div>
              <CardTitle style={{ marginBottom: 5 }}>{it.t}</CardTitle>
              <CardBody>{it.d}</CardBody>
            </div>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 16 — Dashboard placeholder (PDPA-pending)
// ---------------------------------------------------------------------------

function Slide16() {
  const stats = [
    { l: 'ผู้สูงอายุในเขต', v: '1,284', c: C.primary },
    { l: 'ผู้พึ่งพิง (LTC)', v: '96', c: C.accent },
    { l: 'ครอบคลุมการดูแล', v: '87%', c: '#3B6D11' },
    { l: 'อสม.ในพื้นที่', v: '62', c: C.primary },
  ];
  const diseases = [
    { n: 'ความดันโลหิตสูง', c: 418, w: '78%', col: C.primary },
    { n: 'เบาหวาน', c: 301, w: '56%', col: C.primaryHover },
    { n: 'โรคหัวใจ', c: 147, w: '28%', col: C.accent },
    { n: 'โรคปอด/ทางเดินหายใจ', c: 89, w: '17%', col: '#5DCAA5' },
  ];
  const zones = [
    { l: 'ม.4 · เหตุฉุกเฉิน 5 ครั้ง', bg: C.alertSoft, col: C.alert },
    { l: 'ม.2 · จุดน้ำท่วมซ้ำ', bg: C.accentSoft, col: '#854F0B' },
    { l: 'ม.6 · ครอบคลุม อสม. ต่ำ', bg: C.accentSoft, col: '#854F0B' },
    { l: 'ม.1, 5, 7 · ปกติ', bg: C.successSoft, col: '#27500A' },
  ];
  const legend = [
    { c: '#E24B4A', l: 'เสี่ยงสูง' },
    { c: '#EF9F27', l: 'เฝ้าระวัง' },
    { c: '#97C459', l: 'ปกติ' },
    { c: '#5DCAA5', l: 'ครอบคลุมดี' },
  ];
  return (
    <Slide num={16}>
      <Eyebrow accent>หน้าจอศูนย์เทศบาล</Eyebrow>
      <Title size={28}>Dashboard ภาพรวมสุขภาพชุมชน · GIS · PDPA-safe</Title>
      <p style={{ fontSize: 13.5, color: C.textMuted, marginTop: 2, marginBottom: 8 }}>
        ภาพรวมระดับพื้นที่ · ไม่แสดงข้อมูลรายบุคคล — เห็นสีก็รู้ทันทีว่าหมู่ไหนต้องดูแลก่อน
      </p>

      <div style={{ flex: 1, minHeight: 0, background: C.surface, borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 6px 24px rgba(0,0,0,0.1)' }}>
        {/* Dashboard topbar */}
        <div style={{ background: '#143228', color: '#FFF', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>🗺️</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>ภาพรวมสุขภาพชุมชน · เทศบาลตำบลสาธิต</div>
            <div style={{ fontSize: 11, opacity: 0.75 }}>ภาพรวมระดับพื้นที่ · ไม่แสดงข้อมูลรายบุคคล</div>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 11, background: 'rgba(255,255,255,0.14)', padding: '5px 12px', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 6 }}>🛡️ ข้อมูลสรุป ไม่ระบุตัวตน</div>
        </div>

        {/* Dashboard body */}
        <div style={{ padding: 12, flex: 1, minHeight: 0, display: 'grid', gridTemplateRows: '1.55fr 1fr', gap: 10 }}>
          {/* Top row: map + (stats + diseases) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 10, minHeight: 0 }}>
            {/* MAP */}
            <div style={{ background: '#FFF', borderRadius: 10, padding: 12, border: `1px solid ${C.surfaceSoft}`, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <h3 style={{ fontSize: 12.5, fontWeight: 700, color: C.primary }}>ระดับความเสี่ยงรายพื้นที่ (7 หมู่)</h3>
                <span style={{ fontSize: 10.5, color: C.textMuted }}>ดูสีรู้ทันทีว่าหมู่ไหนต้องดูแลก่อน</span>
              </div>
              <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
                <svg viewBox="0 0 520 280" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', borderRadius: 8, background: '#EFECE1' }}>
                  <rect x="14" y="16" width="150" height="78" rx="8" fill="#C0DD97" />
                  <rect x="178" y="16" width="150" height="78" rx="8" fill="#FAC775" />
                  <rect x="342" y="16" width="164" height="78" rx="8" fill="#C0DD97" />
                  <rect x="14" y="106" width="150" height="74" rx="8" fill="#F09595" />
                  <rect x="178" y="106" width="150" height="74" rx="8" fill="#C0DD97" />
                  <rect x="342" y="106" width="164" height="74" rx="8" fill="#FAC775" />
                  <rect x="14" y="192" width="234" height="72" rx="8" fill="#C0DD97" />
                  <rect x="262" y="192" width="244" height="72" rx="8" fill="#9FE1CB" />
                  <text x="89" y="60" fontSize="16" fontWeight="700" fill="#27500A" textAnchor="middle">ม.1</text>
                  <text x="253" y="60" fontSize="16" fontWeight="700" fill="#633806" textAnchor="middle">ม.2</text>
                  <text x="424" y="60" fontSize="16" fontWeight="700" fill="#27500A" textAnchor="middle">ม.3</text>
                  <text x="89" y="150" fontSize="16" fontWeight="700" fill="#791F1F" textAnchor="middle">ม.4</text>
                  <text x="253" y="150" fontSize="16" fontWeight="700" fill="#27500A" textAnchor="middle">ม.5</text>
                  <text x="424" y="150" fontSize="16" fontWeight="700" fill="#633806" textAnchor="middle">ม.6</text>
                  <text x="131" y="234" fontSize="16" fontWeight="700" fill="#27500A" textAnchor="middle">ม.7</text>
                  <circle cx="360" cy="230" r="6" fill="#0F6E56" />
                  <text x="375" y="235" fontSize="14" fontWeight="700" fill="#085041">รพ.สต. / ศูนย์ดูแล</text>
                </svg>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 6, flexWrap: 'wrap' }}>
                {legend.map((g, i) => (
                  <span key={i} style={{ fontSize: 10.5, color: C.textMuted, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <i style={{ width: 9, height: 9, borderRadius: 3, background: g.c, display: 'inline-block' }} />
                    {g.l}
                  </span>
                ))}
              </div>
            </div>

            {/* Right column: 4 stats + diseases */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, flexShrink: 0 }}>
                {stats.map((s, i) => (
                  <div key={i} style={{ background: '#FFF', borderRadius: 8, padding: '7px 10px', border: `1px solid ${C.surfaceSoft}` }}>
                    <div style={{ fontSize: 10.5, color: C.textMuted }}>{s.l}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: s.c, lineHeight: 1.2 }}>{s.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#FFF', borderRadius: 10, padding: 10, border: `1px solid ${C.surfaceSoft}`, flex: 1, minHeight: 0 }}>
                <h3 style={{ fontSize: 12.5, fontWeight: 700, color: C.primary, marginBottom: 6 }}>สถิติรวมรายโรค (ไม่ระบุตัว)</h3>
                {diseases.map((d, i) => (
                  <div key={i} style={{ marginBottom: 5 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5 }}>
                      <span style={{ color: C.textMuted }}>{d.n}</span>
                      <span style={{ fontWeight: 700, color: C.text }}>{d.c}</span>
                    </div>
                    <div style={{ height: 5, background: C.primarySoft, borderRadius: 3, marginTop: 2 }}>
                      <div style={{ height: 5, width: d.w, background: d.col, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row: zones + locked */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 10, minHeight: 0 }}>
            <div style={{ background: '#FFF', borderRadius: 10, padding: 12, border: `1px solid ${C.surfaceSoft}` }}>
              <h3 style={{ fontSize: 12.5, fontWeight: 700, color: C.primary, marginBottom: 8 }}>จุดเสี่ยง / เหตุตามพื้นที่ (สัปดาห์นี้)</h3>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                {zones.map((z, i) => (
                  <span key={i} style={{ fontSize: 11.5, padding: '5px 11px', borderRadius: 100, background: z.bg, color: z.col }}>{z.l}</span>
                ))}
              </div>
              <p style={{ fontSize: 10.5, color: C.textMuted, marginTop: 8, lineHeight: 1.45 }}>
                ใช้วางแผนสวัสดิการและจัดสรรกำลัง อสม. ตามความเสี่ยงจริงของแต่ละพื้นที่ — ทุกตัวเลขเป็นภาพรวม ไม่ชี้ตัวบุคคล
              </p>
            </div>
            <div style={{ background: C.primarySoft, border: `1px dashed ${C.primary}`, borderRadius: 10, padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 700, color: C.primary }}>🔒 ข้อมูลรายบุคคล</div>
              <p style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.5, marginTop: 5 }}>
                สรุปสุขภาพรายคน (เช่น แนวโน้มความดัน / สัญญาณหัวใจ) ดูได้เฉพาะเจ้าหน้าที่ที่มีสิทธิ์ — ต้องเข้าระบบ + มีการบันทึกการเข้าถึง (audit log) ตามมาตรฐาน PDPA
              </p>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 17 — OSM Field-Worker App (phone mockup)
// ---------------------------------------------------------------------------

function QrPattern() {
  // 7×7 stylized QR-like pattern (decorative)
  const cells = [
    [1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1],
    [1,0,1,0,1,0,1],
    [1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1],
  ];
  return (
    <div style={{ width: 78, height: 78, background: '#FFF', borderRadius: 4, padding: 5, display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 1.5 }}>
      {cells.flat().map((c, i) => (
        <div key={i} style={{ background: c ? '#1F2A24' : 'transparent', borderRadius: 1 }} />
      ))}
    </div>
  );
}

function CornerBracket({ pos }) {
  const map = {
    tl: { top: 8, left: 8, borderTop: '3px solid #5DCAA5', borderLeft: '3px solid #5DCAA5' },
    tr: { top: 8, right: 8, borderTop: '3px solid #5DCAA5', borderRight: '3px solid #5DCAA5' },
    bl: { bottom: 8, left: 8, borderBottom: '3px solid #5DCAA5', borderLeft: '3px solid #5DCAA5' },
    br: { bottom: 8, right: 8, borderBottom: '3px solid #5DCAA5', borderRight: '3px solid #5DCAA5' },
  };
  return <div style={{ position: 'absolute', width: 18, height: 18, borderRadius: 3, ...map[pos] }} />;
}

function Slide17App() {
  const steps = [
    { n: 1, t: 'เปิดหน้าผู้สูงอายุที่เยี่ยม', d: 'ระบบรู้ว่ากำลังดูแลใคร (ยายบุญมา · บ้าน 42)' },
    { n: 2, t: 'สแกน QR บนเครื่องวัด', d: 'ระบบรู้ทันทีว่าเป็นเครื่องวัดอะไร — ความดัน · น้ำตาล · ออกซิเจน' },
    { n: 3, t: 'วัด → ระบบบันทึกอัตโนมัติ', d: 'ค่าวัดเข้าประวัติของยายบุญมาทันที — ไม่ต้องคีย์ ไม่ผิดคน' },
  ];
  return (
    <Slide num={17}>
      <Eyebrow accent>เครื่องมือสำหรับ อสม. ภาคสนาม</Eyebrow>
      <Title size={30}>วัดแล้ว ระบบจดให้ — ไม่ต้องคีย์มือ ไม่ผิดคน</Title>
      <p style={{ fontSize: 14, color: C.textMuted, marginTop: 2, marginBottom: 8 }}>
        ถ่ายรูป · สแกน QR ของเครื่องวัด · ระบบจับคู่ "คน + เครื่อง + ค่าวัด" ให้อัตโนมัติ — ข้อมูลถูกบันทึกถูกคนเสมอ
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '290px 1fr', gap: 24, flex: 1, minHeight: 0 }}>
        {/* Phone mockup — QR scan + measurement workflow */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 270, background: C.primaryDeep, padding: 10, borderRadius: 28, boxShadow: '0 18px 40px rgba(0,0,0,0.18)' }}>
            <div style={{ background: '#FFF', borderRadius: 20, overflow: 'hidden' }}>
              {/* Patient context header */}
              <div style={{ background: C.primaryDeep, color: '#FFF', padding: '11px 14px' }}>
                <div style={{ fontSize: 10, opacity: 0.8 }}>กำลังเยี่ยม · 1 / 5 บ้าน</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 1 }}>ยายบุญมา · บ้านเลขที่ 42</div>
              </div>
              <div style={{ padding: '11px 13px' }}>
                {/* Step ① */}
                <div style={{ fontSize: 10.5, fontWeight: 700, color: C.primary, marginBottom: 6 }}>① สแกน QR บนเครื่องวัด</div>
                <div style={{ position: 'relative', height: 122, background: '#1F2A24', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 9 }}>
                  <CornerBracket pos="tl" />
                  <CornerBracket pos="tr" />
                  <CornerBracket pos="bl" />
                  <CornerBracket pos="br" />
                  <QrPattern />
                  <div style={{ position: 'absolute', bottom: 6, left: 0, right: 0, textAlign: 'center', color: '#5DCAA5', fontSize: 9.5, fontWeight: 600 }}>กำลังสแกน...</div>
                </div>

                {/* Step ② — device detected */}
                <div style={{ fontSize: 10.5, fontWeight: 700, color: C.primary, marginBottom: 6 }}>② เครื่องที่ตรวจจับได้</div>
                <div style={{ background: C.primarySoft, borderRadius: 9, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9 }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>🩸</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 11.5, fontWeight: 600, color: C.primaryDeep }}>เครื่องวัดความดัน · OMRON M3</div>
                    <div style={{ fontSize: 10, color: C.primary }}>✓ ลิงก์กับยายบุญมาอัตโนมัติ</div>
                  </div>
                </div>

                {/* Step ③ — readings */}
                <div style={{ fontSize: 10.5, fontWeight: 700, color: C.primary, marginBottom: 6 }}>③ ค่าวัดที่ได้</div>
                <div style={{ display: 'flex', gap: 5, marginBottom: 9 }}>
                  <div style={{ flex: 1, background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 8, padding: '5px 6px', textAlign: 'center' }}>
                    <div style={{ fontSize: 9.5, color: C.textMuted }}>ความดัน</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: C.primaryDeep, lineHeight: 1.1 }}>138/85</div>
                  </div>
                  <div style={{ flex: 1, background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 8, padding: '5px 6px', textAlign: 'center' }}>
                    <div style={{ fontSize: 9.5, color: C.textMuted }}>ชีพจร</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: C.primaryDeep, lineHeight: 1.1 }}>78</div>
                  </div>
                  <div style={{ flex: 0.7, background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 8, padding: '5px 6px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 20 }}>📷</span>
                  </div>
                </div>

                {/* Success */}
                <div style={{ background: C.successSoft, color: '#27500A', borderRadius: 9, padding: '9px 11px', textAlign: 'center', fontSize: 12, fontWeight: 700 }}>
                  ✓ บันทึกในประวัติยายบุญมาแล้ว
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: workflow steps + "บันทึกถูกคน" callout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
          <div style={{ background: '#FFF', borderRadius: 14, padding: '16px 20px', border: `1px solid ${C.surfaceSoft}` }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: C.primaryDeep, marginBottom: 10 }}>3 ขั้นตอน · เครื่องเดียวจบ</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {steps.map((s) => (
                <div key={s.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: C.primary, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, flexShrink: 0 }}>{s.n}</div>
                  <div style={{ paddingTop: 2 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 2, lineHeight: 1.4 }}>{s.t}</h4>
                    <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.5 }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: C.primaryDeep, color: '#FFF', borderRadius: 14, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ fontSize: 38, lineHeight: 1, flexShrink: 0 }}>🎯</div>
            <div>
              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, lineHeight: 1.4 }}>ทำไม "ข้อมูลถูกบันทึกถูกคน" เสมอ?</h4>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.88)', lineHeight: 1.55 }}>
                App กำลังเปิดอยู่บนหน้าผู้สูงอายุที่เยี่ยม + QR บอกระบบว่าเป็นเครื่องอะไร —
                ระบบจับคู่ "คน × เครื่อง × ค่าวัด" อัตโนมัติ ไม่ต้องเลือกซ้ำ ไม่กลัวสลับคน
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { ic: '📷', t: 'ถ่ายรูปประกอบหลักฐาน' },
              { ic: '⚡', t: 'ข้อมูลขึ้น Dashboard ทันที' },
            ].map((b, i) => (
              <div key={i} style={{ background: C.surfaceSoft, borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{b.ic}</span>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{b.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 18 — ประโยชน์ + KPI
// ---------------------------------------------------------------------------

function Slide17() {
  const benefits = [
    { ic: '⏱️', t: 'ช่วยได้เร็วขึ้น', d: 'เปลี่ยนจาก "รอคนเห็น" เป็น "ระบบแจ้ง" คนช่วยถึงตัวเร็วขึ้น' },
    { ic: '👨‍👩‍👧', t: 'ครอบครัวอุ่นใจ', d: 'ลูกหลานที่ทำงานต่างถิ่นสบายใจ ผู้สูงอายุอยู่บ้านตัวเองได้' },
    { ic: '📋', t: 'มีตัวเลขตอบสภาฯ', d: 'จำนวนผู้สูงอายุที่ดูแล จำนวนครั้งที่แจ้งเหตุได้ทัน — เป็นผลงานที่วัดได้' },
    { ic: '🏆', t: 'ภาพลักษณ์ผู้นำที่ใส่ใจ', d: 'มีข้อมูลและกรณีศึกษาเพื่อต่อยอดสมัครรางวัล อปท. ดีเด่น' },
  ];
  return (
    <Slide num={18}>
      <Eyebrow>สิ่งที่เทศบาลและประชาชนได้</Eyebrow>
      <Title size={36}>ผลที่ท่านนำไปตอบสภาฯ ได้</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 18, marginTop: 14, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 14, minHeight: 0 }}>
          {benefits.map((b, i) => (
            <Card key={i} style={{ padding: '16px 18px', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <CardIcon>{b.ic}</CardIcon>
              <CardTitle style={{ fontSize: 17, marginBottom: 4 }}>{b.t}</CardTitle>
              <CardBody style={{ fontSize: 13.5 }}>{b.d}</CardBody>
            </Card>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 14, minHeight: 0 }}>
          <div style={{ borderRadius: 18, overflow: 'hidden', minHeight: 0 }}>
            <img src={`${IMG}/family-peace.png`} alt="ครอบครัวอุ่นใจ" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ borderRadius: 18, overflow: 'hidden', minHeight: 0 }}>
            <img src={`${IMG}/active-senior.png`} alt="ผู้สูงอายุใช้ชีวิตอิสระ" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 18 — อบรม + ดูแลต่อเนื่อง
// ---------------------------------------------------------------------------

function Slide18() {
  return (
    <Slide num={19}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Eyebrow>เราอยู่ดูแลต่อเนื่อง</Eyebrow>
        <Title size={42}>ไม่ได้แค่ติดตั้งแล้วจากไป</Title>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 30 }}>
          {[
            { ic: '🎓', t: 'อบรมเจ้าหน้าที่และ อสม.', d: 'สอนใช้งานจริงจนใช้เป็น ไม่ทิ้งให้งง' },
            { ic: '🛠️', t: 'มีทีมซัพพอร์ตและรับประกัน', d: 'อุปกรณ์มีปัญหา มีทีมดูแล ไม่ปล่อยทิ้ง' },
            { ic: '📅', t: 'วางแผนปีต่อๆ ไปให้', d: 'ชี้แจงค่าใช้จ่ายต่อเนื่องชัด ไม่เป็นภาระงบที่ค้าง' },
          ].map((x, i) => (
            <Card key={i} style={{ textAlign: 'center' }}>
              <CardIcon>{x.ic}</CardIcon>
              <CardTitle>{x.t}</CardTitle>
              <CardBody>{x.d}</CardBody>
            </Card>
          ))}
        </div>
        <Lead style={{ marginTop: 28, maxWidth: 920 }}>
          เราจะชี้แจงให้ชัดตั้งแต่ต้นว่า ค่าใช้จ่ายส่วนไหนเป็น "ครั้งเดียว" และส่วนไหนเป็น "รายปี"
          เพื่อให้ท่านวางงบได้อย่างมั่นใจ ไม่มีค่าใช้จ่ายซ่อนเร้น
        </Lead>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// SLIDE 19 — CTA + 3 คำถาม
// ---------------------------------------------------------------------------

function Slide19() {
  return (
    <Slide num={20} dark>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Eyebrow dark>ขั้นต่อไป</Eyebrow>
        <Title dark size={44}>
          ขอเวลาท่านสักครู่<br />คุยเรื่องผู้สูงอายุในพื้นที่ของท่าน
        </Title>
        <Lead dark style={{ marginTop: 20, maxWidth: 940 }}>
          ท่านไม่ต้องตัดสินใจอะไรในวันนี้ — เราอยากฟังก่อนว่าเทศบาลของท่านเจอปัญหาอะไร
          แล้วจึงเสนอแบบที่เหมาะกับพื้นที่จริง ไม่ใช่ขายแพ็กเกจสำเร็จรูป
        </Lead>
        <div style={{ marginTop: 30, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 18, padding: '24px 28px', maxWidth: 980 }}>
          <h3 style={{ color: '#FFF', fontSize: 20, fontWeight: 700, marginBottom: 14 }}>3 คำถามที่อยากฟังจากท่าน</h3>
          <p style={{ color: 'rgba(255,255,255,.9)', fontSize: 17, lineHeight: 1.9 }}>
            1. ปัญหาการดูแลผู้สูงอายุที่หนักที่สุดในพื้นที่ของท่าน คืออะไร?<br />
            2. สิ่งที่ท่านกังวลที่สุดถ้าจะเริ่มโครงการแบบนี้ คืออะไร?<br />
            3. ถ้าจะเริ่มทดลอง — เงื่อนไขสำคัญที่สุดของท่านคืออะไร?
          </p>
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// Deck Toolbar (print + jump-to-slide)
// ---------------------------------------------------------------------------

function Toolbar() {
  const [open, setOpen] = useState(false);
  // Pain · Benefit · Demo framing — ชื่อช่วยให้ sales รู้จุดประสงค์แต่ละสไลด์
  const titles = [
    '1 · 🚨 Pain · ผู้สูงอายุล้มในบ้านลำพัง',
    '2 · 🚨 Pain · 4 เรื่องดูแลแบบเดิมตามไม่ทัน',
    '3 · ✨ Solution · ระบบ "รู้ก่อน" ที่ใครจะเจอ',
    '4 · 🔧 How · 3 จุดข้อมูล สู่ศูนย์ใน 1 นาที',
    '5 · 📦 Hardware · ชุดดูแลสุขภาพให้ผู้สูงอายุ',
    '6 · 🩺 Benefit · แพทย์เห็นแนวโน้มล่วงหน้า',
    '7 · 💰 ROI · ป้องกันถูกกว่ารักษาปลายทาง',
    '8 · 🏆 Why us · 3 จุดต่างที่มั่นใจได้',
    '9 · 🛡️ Coverage · 3 พื้นที่ ไม่ติดกล้องในห้อง',
    '10 · 🌱 Choice · ไม่ต้องลงทุนทั้งตำบลทีเดียว',
    '11 · 💵 Plans · 3 แบบ + แหล่งงบที่ใช้ได้',
    '12 · 📞 Trust · เตือนแล้วใครรับสาย',
    '13 · 🎯 Roles · ใครทำหน้าที่อะไร · ไม่มีภาระลอย',
    '14 · 💪 Win · ระบบช่วยลดงาน อสม.',
    '15 · 🔁 Reuse · ต่อยอดของที่เทศบาลมี',
    '16 · 📊 Demo · Dashboard ภาพรวมตำบล',
    '17 · 📱 Demo · แอป อสม. · บันทึกถูกคน',
    '18 · 🏛️ Outcome · KPI ตอบสภาฯ ได้',
    '19 · 🛠️ Support · เราอยู่ดูแลต่อเนื่อง',
    '20 · 🤝 Close · 3 คำถาม + ขั้นต่อไป',
  ];
  const goTo = (i) => {
    const el = document.getElementById(`slide-${i + 1}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };
  return (
    <div className="deck-toolbar">
      <span style={{ flex: 1 }} />
      <span className="note">กด "พิมพ์/บันทึก PDF" แล้วเลือก Landscape</span>
      <button onClick={() => setOpen(!open)}>{open ? 'ปิดเมนู' : 'ไปสไลด์...'}</button>
      <button onClick={() => window.print()}>พิมพ์ / บันทึก PDF</button>
      {open && (
        <div style={{ position: 'absolute', top: 44, right: 16, background: '#FFF', color: C.text, borderRadius: 8, boxShadow: '0 10px 30px rgba(0,0,0,.2)', padding: 8, maxHeight: 'calc(100vh - 110px)', overflowY: 'auto', minWidth: 320, zIndex: 1100 }}>
          {titles.map((t, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', fontSize: 13, color: C.text, background: 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.surfaceSoft)}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
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
        backdropFilter: 'blur(8px)',
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
              border: isActive ? `2px solid ${C.primaryHover}` : '1px solid rgba(255,255,255,0.6)',
              transition: 'all .2s ease',
              cursor: 'pointer',
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
  const slides = [Slide01, Slide02, Slide03, Slide04, Slide05, Slide06, Slide07, Slide08, Slide09, Slide10, Slide11, Slide12, Slide13, Slide14, Slide15, Slide16, Slide17App, Slide17, Slide18, Slide19];
  return (
    <>
      <DeckStyles />
      <Toolbar />
      <ScrollDots count={slides.length} />
      <div className="deck-root">
        {slides.map((S, i) => (
          <div key={i} id={`slide-${i + 1}`}>
            <ScaledSlide>
              <S />
            </ScaledSlide>
          </div>
        ))}
      </div>
    </>
  );
}
