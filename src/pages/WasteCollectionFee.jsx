
import React, { useEffect, useState, useRef } from 'react';

// ---------------------------------------------------------------------------
// WasteCollectionFee.jsx — Sales Pitch Deck (19 slides · 1280×720 · print-PDF)
// Product: ระบบจัดเก็บค่าธรรมเนียมเก็บขยะ (Gismo Local-Fee Platform)
// Design: Civic Trust palette (Forest #0F6E56 + Cream #FAF7EE + Amber #BA7517)
// Font: Sarabun
// Pain narrative: ค่าน้อย+เสียเวลาไปจ่าย+เก็บได้เฉพาะเวลาราชการ → ค้าง 25-40%
// Story angle: จ่ายง่ายขึ้น + เชื่อมกับโครงการคัดแยก (60→40→20→10) → ลดค่าทิ้งของเทศบาล
// System demo: iframe-embedded real HTML mockups from public/mockups/waste-fee/
// ---------------------------------------------------------------------------

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

const TOTAL_SLIDES = 19;

// Map slide demo IDs → real HTML mockup file paths (under public/mockups/waste-fee/)
// Filenames URL-encoded (spaces → %20). R-xx mobile mockups use a design-canvas
// with multiple artboards — `?embed=1#sN` tells design-canvas.jsx to focus on
// artboard sN with chrome hidden (see patches in design-canvas.jsx).
const MOCK = 'mockups/waste-fee/';
const M = {
  resDashboard: MOCK + 'R-02-ResidentDashboard.html?embed=1#s1',
  bill: MOCK + 'R-04-BillDetails.html?embed=1#s1',
  payQR: MOCK + 'R-05-PaymentFlow.html?embed=1#s2',
  receipt: MOCK + 'R-06-Receipt.html?embed=1#s1',
  sticker: MOCK + 'R-08%20Sticker%20Status.html',
  schedule: MOCK + 'R-09%20Collection%20Schedule.html',
  issueSubmit: MOCK + 'R-10%20Submit%20Issue.html',
  issueTrack: MOCK + 'R-11%20Issue%20Tracking.html',
  kpi: MOCK + 'O-01%20KPI%20Dashboard.html',
  households: MOCK + 'O-02%20Household%20List.html',
  generateBills: MOCK + 'O-04%20Generate%20Bills.html',
  recordPayment: MOCK + 'O-06%20Record%20Payment.html',
  receiptIssue: MOCK + 'O-07%20Receipt%20Issuance.html',
  arrears: MOCK + 'O-08%20Arrears%20Management.html',
};

// ---------------------------------------------------------------------------
// Slide shell
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
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: C.primary }} />
      )}
      <div style={{ position: 'absolute', inset: 0, padding: '52px 60px 56px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {children}
      </div>
      {footer && (
        <div style={{ position: 'absolute', bottom: 20, left: 60, fontSize: 12, color: dark ? 'rgba(255,255,255,0.7)' : C.textMuted, opacity: 0.85, fontWeight: 500, letterSpacing: 0.5 }}>
          {footer}
        </div>
      )}
      <div style={{ position: 'absolute', bottom: 22, right: 38, fontSize: 13, color: dark ? 'rgba(255,255,255,0.7)' : C.textMuted, fontWeight: 500 }}>
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
    <p style={{ display: 'inline-block', fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: col, marginBottom: 12 }}>
      {children}
    </p>
  );
}

function Title({ dark, size = 40, children, style }) {
  return (
    <h2 style={{ fontSize: size, fontWeight: 800, lineHeight: 1.4, color: dark ? '#FFF' : C.primaryDeep, letterSpacing: -0.3, ...style }}>
      {children}
    </h2>
  );
}

function Lead({ dark, children, style }) {
  return (
    <p style={{ fontSize: 21, fontWeight: 400, lineHeight: 1.55, color: dark ? 'rgba(255,255,255,0.9)' : C.textMuted, ...style }}>
      {children}
    </p>
  );
}

function Card({ children, dark, style }) {
  return (
    <div style={{ background: dark ? 'rgba(255,255,255,0.08)' : '#FFF', border: `1px solid ${dark ? 'rgba(255,255,255,0.16)' : C.surfaceSoft}`, borderRadius: 18, padding: '24px 26px', ...style }}>
      {children}
    </div>
  );
}

function CardIcon({ children }) {
  return <span style={{ fontSize: 36, lineHeight: 1, marginBottom: 12, display: 'block' }}>{children}</span>;
}

function CardTitle({ dark, children, style }) {
  return (
    <h3 style={{ fontSize: 20, fontWeight: 700, color: dark ? '#FFF' : C.text, marginBottom: 7, lineHeight: 1.45, ...style }}>
      {children}
    </h3>
  );
}

function CardBody({ dark, children, style }) {
  return (
    <p style={{ fontSize: 15, color: dark ? 'rgba(255,255,255,0.85)' : C.textMuted, lineHeight: 1.55, ...style }}>
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Mockup iframe — embeds the real HTML mockups, scaled to fit slide layout
// ---------------------------------------------------------------------------

// MobileMockup — embeds a real mobile HTML mockup, scrolling locked, pointer events disabled.
// offsetX/offsetY: shift iframe content within frame (negative values scroll content up/left)
function MobileMockup({ src, label, scale = 0.58, offsetX = 0, offsetY = 0, srcW = 420, srcH = 820 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ width: srcW * scale, height: srcH * scale, overflow: 'hidden', borderRadius: 22, background: '#f0eee9', boxShadow: '0 14px 32px rgba(0,0,0,0.18)', position: 'relative' }}>
        <iframe
          src={src}
          loading="lazy"
          title={label}
          scrolling="no"
          style={{
            width: srcW,
            height: srcH,
            border: 'none',
            transform: `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`,
            transformOrigin: 'top left',
            display: 'block',
            pointerEvents: 'none',
          }}
        />
      </div>
      {label && <div style={{ fontSize: 11.5, fontWeight: 600, color: C.textMuted, textAlign: 'center' }}>{label}</div>}
    </div>
  );
}

// DesktopMockup — embeds a real desktop HTML mockup, auto-scaled to fit container.
// Uses ResizeObserver so the iframe always fits no matter how the slide layout
// divides space (full-width vs side-by-side with content panel).
function DesktopMockup({ src, label, srcW = 1280, srcH = 800 }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    if (!containerRef.current) return;
    const compute = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setScale(Math.min(width / srcW, height / srcH));
      }
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [srcW, srcH]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minHeight: 0, minWidth: 0 }}>
      <div style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 10, overflow: 'hidden', boxShadow: '0 10px 28px rgba(0,0,0,0.14)', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#F1ECDA', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: `1px solid ${C.surfaceSoft}`, flexShrink: 0 }}>
          <span style={{ width: 9, height: 9, borderRadius: 9, background: '#E2685A', display: 'inline-block' }} />
          <span style={{ width: 9, height: 9, borderRadius: 9, background: '#E6B23F', display: 'inline-block' }} />
          <span style={{ width: 9, height: 9, borderRadius: 9, background: '#7DC95E', display: 'inline-block' }} />
          <span style={{ marginLeft: 10, fontSize: 10.5, color: C.textMuted, background: '#FFF', padding: '2px 10px', borderRadius: 100, border: `1px solid ${C.surfaceSoft}` }}>gismo.go.th / officer</span>
        </div>
        <div ref={containerRef} style={{ flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative' }}>
          <iframe
            src={src}
            loading="lazy"
            title={label}
            scrolling="no"
            style={{
              width: srcW,
              height: srcH,
              border: 'none',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              display: 'block',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
      {label && <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, textAlign: 'center' }}>{label}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Deck styles + scaled wrapper
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
      const target = 1280;
      const available = Math.min(window.innerWidth - 32, target);
      setScale(available / target);
    }
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  return (
    <div className="slide-wrapper" ref={wrapperRef} style={{ width: 1280 * scale, height: 720 * scale }}>
      <div className="slide-scale" style={{ transform: `scale(${scale})`, width: 1280, height: 720 }}>
        {children}
      </div>
    </div>
  );
}

// ===========================================================================
// SLIDE 1 — HERO
// ===========================================================================

function Slide01() {
  return (
    <Slide num={1} dark>
      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr .75fr', gap: 48, alignItems: 'center', height: '100%' }}>
        <div>
          <Eyebrow dark>อปท. ของท่าน · งานเก็บค่าธรรมเนียมขยะ</Eyebrow>
          <h1 style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.4, color: '#FFF', letterSpacing: -0.5 }}>
            ค่าขยะถูก · จ่ายไม่สะดวก<br />
            สุดท้ายค้างชำระ <span style={{ color: '#FCB05A' }}>25–40%</span><br />
            ขยะเปียกเยอะ <span style={{ color: '#FCB05A' }}>ค่าทิ้งแพง</span>
          </h1>
          <Lead dark style={{ marginTop: 20, maxWidth: 620 }}>
            ค่าขยะ <strong style={{ color: '#FFF' }}>30-60 บาท/เดือน</strong> — แต่ประชาชนต้องเสียเวลามาจ่ายเองที่ อปท. ในเวลาราชการ
            ผลคือเลื่อนจ่ายเรื่อยๆ จนเก็บไม่ขึ้น · ในขณะที่เทศบาลยังต้องจ่ายค่าทิ้งขยะแพงทุกเดือน
          </Lead>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 20, padding: '26px 28px' }}>
          <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.7)', letterSpacing: 1.5, fontWeight: 700, marginBottom: 14 }}>ภาพรวมตัวเลข</div>
          {[
            { v: '25–40%', l: 'อัตราค้างชำระค่าขยะ' },
            { v: '30–60฿', l: 'ค่าขยะ/เดือน · ลูกบ้านไม่อยากเสียเวลา' },
            { v: '8:30–16:30', l: 'เก็บได้เฉพาะเวลาราชการ' },
            { v: '↑', l: 'ค่าทิ้งขยะแพงขึ้น (ขยะเปียกเยอะ)' },
          ].map((x, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '10px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>{x.l}</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#FCB05A' }}>{x.v}</span>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 2 — 4 Pain points (REVISED: convenience-first, not bill generation)
// ===========================================================================

function Slide02() {
  const pains = [
    { icon: '💸', title: 'ค่าน้อย · ค่าเดินทาง+เวลาแพงกว่า', desc: 'ค่าขยะ 40 บาท แต่ลูกบ้านต้องเสียเวลาทำงาน + ค่าน้ำมัน มา อปท. — ไม่คุ้มเวลา จึงเลื่อนเรื่อยๆ' },
    { icon: '🕒', title: 'เก็บได้เฉพาะเวลาราชการ', desc: 'จันทร์-ศุกร์ 8:30-16:30 ตรงกับเวลาทำงานของลูกบ้านพอดี — ใครจะลางานมาจ่าย 40 บาท?' },
    { icon: '📈', title: 'เลื่อนแล้วเลื่อนอีก กลายเป็นค้าง 25-40%', desc: 'ลูกบ้านไม่ใช่ไม่อยากจ่าย — แต่ไม่สะดวกพอ พอเลื่อนข้ามเดือนก็พอกพูน จนกลายเป็นยอดค้างสะสม' },
    { icon: '🗑️', title: 'ทิ้งขยะแพง — เพราะไม่คัดแยก', desc: 'แม้เก็บค่าธรรมเนียมได้ แต่ขยะที่ทิ้งมีน้ำหนัก/ปริมาณเปียกเยอะ ทำให้เทศบาลต้องจ่ายค่ากำจัดต่อตันสูง' },
  ];
  return (
    <Slide num={2}>
      <Eyebrow alert>ปัญหาที่ อปท. เจอจริง</Eyebrow>
      <Title>4 เรื่องที่ทำให้งานเก็บค่าขยะ "เก็บไม่ขึ้น"</Title>
      <Lead style={{ marginTop: 12, maxWidth: 1020 }}>
        ปัญหาไม่ใช่การออกบิล — แต่คือ "ความสะดวก" ของลูกบ้าน · และ "ต้นทุนการทิ้งขยะ" ที่ยังแพงอยู่
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

// ===========================================================================
// SLIDE 3 — 2 sides: ลูกบ้านอยากจ่ายง่าย · เทศบาลอยากเก็บได้ + ลดค่าทิ้ง
// ===========================================================================

function Slide03() {
  const resident = [
    'ค่าขยะ 40 บาท · แต่ค่ารถ+เสียเวลาทำงานแพงกว่า',
    'อยากจ่ายให้จบ แต่ไม่มีช่อง online · ไม่มี QR',
    'ลืมไปเรื่อย เพราะไม่มีอะไรเตือน',
    'จ่ายแล้วได้ใบเสร็จกระดาษ หายง่าย ใช้ยื่นไม่ได้',
  ];
  const officer = [
    'ต้องส่งเจ้าหน้าที่ไปเก็บถึงบ้าน · เปลืองคน',
    'ไม่รู้ใครจ่ายแล้ว ใครค้าง · ไม่มี dashboard',
    'ขยะเปียกเยอะ ค่ากำจัดต่อตันแพงทุกเดือน',
    'โครงการคัดแยก/ปุ๋ยหมัก ไม่รู้ใครทำจริง',
  ];
  return (
    <Slide num={3}>
      <Eyebrow alert>ทั้งสองฝ่ายเจ็บคนละแบบ</Eyebrow>
      <Title>ลูกบ้านอยากจ่ายง่าย · เทศบาลอยากลดต้นทุนการทิ้ง</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 24, flex: 1, alignContent: 'center' }}>
        <Card style={{ border: `2px solid ${C.alert}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 32 }}>👨‍👩‍👧</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.alert, letterSpacing: 1.5 }}>มุมประชาชน</div>
              <div style={{ fontSize: 19, fontWeight: 700, color: C.text }}>"ไม่ใช่ไม่อยากจ่าย — แค่ไม่สะดวก"</div>
            </div>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {resident.map((r, i) => (
              <li key={i} style={{ fontSize: 14.5, color: C.text, lineHeight: 1.55, padding: '5px 0 5px 22px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: C.alert, fontWeight: 800 }}>×</span>
                {r}
              </li>
            ))}
          </ul>
        </Card>
        <Card style={{ border: `2px solid ${C.accent}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 32 }}>🏛️</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: 1.5 }}>มุมเทศบาล</div>
              <div style={{ fontSize: 19, fontWeight: 700, color: C.text }}>"เก็บได้ ก็ยังขาดทุนค่าทิ้ง"</div>
            </div>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {officer.map((o, i) => (
              <li key={i} style={{ fontSize: 14.5, color: C.text, lineHeight: 1.55, padding: '5px 0 5px 22px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: C.accent, fontWeight: 800 }}>×</span>
                {o}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 4 — Solution overview · 1 platform 3 apps
// ===========================================================================

function Slide04() {
  return (
    <Slide num={4}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Eyebrow>แนวทางใหม่</Eyebrow>
        <Title size={44}>1 แพลตฟอร์ม · 3 แอป · จ่ายง่ายขึ้น · ค่าทิ้งถูกลง</Title>
        <Lead style={{ marginTop: 18, maxWidth: 1040 }}>
          แอปประชาชนทำให้จ่ายง่ายไม่ต้องเดินทาง · ระบบเจ้าหน้าที่ติดตามได้ใครจ่าย/ใครค้าง ·
          พนักงานเก็บขยะรู้บ้านที่เข้าโครงการคัดแยก/ปุ๋ยหมัก — ทั้งหมดเชื่อมในระบบเดียว
        </Lead>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 32 }}>
          {[
            { ic: '📱', t: 'แอปประชาชน', d: 'ดูบิล · จ่าย PromptPay QR ที่บ้าน · ใบเสร็จดิจิทัล · ตามวันเก็บขยะ — เลิกเดินทางมา อปท.' },
            { ic: '🖥️', t: 'ระบบเจ้าหน้าที่', d: 'แยกได้ทันทีว่าใครค้าง · ใครจ่ายแล้ว · ใครเข้าโครงการคัดแยก · ส่งหนังสือเตือน LINE/SMS/พิมพ์ในคลิกเดียว' },
            { ic: '🚛', t: 'แอปคนเก็บขยะ', d: 'แผนที่สองฝั่งถนน · บ้านค้างถูก skip อัตโนมัติ · บันทึก "สุ่มตรวจคัดแยก" 3 ครั้ง/ปี เพื่อยืนยันสิทธิ์ส่วนลด' },
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

// ===========================================================================
// SLIDE 5 — Story · เชื่อมการจ่ายเข้ากับการคัดแยก · ลดค่าทิ้ง
// ===========================================================================

function Slide05() {
  const tiers = [
    { tag: 'ไม่คัดแยก', tagBg: C.alertSoft, tagCol: C.alert, t: '60 ฿', sub: 'ต่อเดือน · ค่า default', d: 'เพดานตามกฎกระทรวง: ค่าเก็บขน 30 ฿ + ค่ากำจัด 30 ฿ — บังคับ 16 พ.ย. 2569', c: C.alert, cs: '#FFFFFF' },
    { tag: 'คัดแยก verified', tagBg: C.accentSoft, tagCol: C.accent, t: '20 ฿', sub: 'ต่อเดือน · ตรงกับ กทม.', d: 'ลงทะเบียน · ผ่านการสุ่มประเมิน 4 ประเภท (รีไซเคิล · อินทรีย์ · อันตราย · ทั่วไป) — กทม. precedent ตั้งแต่ 1 ต.ค. 2568', c: C.accent, cs: '#FFFFFF', highlight: true },
    { tag: 'ขายรีไซเคิล', tagBg: C.successSoft, tagCol: C.success, t: '10 ฿', sub: '+ revenue share', d: 'ระดับสูงสุดของระบบ — ครัวเรือนขายรีไซเคิลเข้าระบบ · ได้ส่วนแบ่งกลับ · เกินกว่า กทม. baseline', c: C.success, cs: '#FFFFFF' },
  ];
  const stats = [
    { k: 'กทม. COVERAGE', v: '7%', d: 'รายได้ 500 ลบ./ปี · ต้นทุน 7,000 ลบ./ปี', c: C.alert },
    { k: 'BKK WASTE PAY', v: '786,099', d: 'ครัวเรือนลงทะเบียนใน 5 เดือน · ก.พ. 2569', c: C.primary },
    { k: 'เทศบาลนครลำปาง', v: 'ใช้อัตราเดิม', d: 'รอออกข้อบัญญัติใหม่ · เป็นโอกาสของหน่วยงานท้องถิ่นอื่น', c: C.accent, small: true },
    { k: 'กฎกระทรวง 2567', v: '16 พ.ย. 69', d: 'วันที่บังคับใช้ · เหลือ ~7 เดือน', c: C.primaryDeep },
  ];
  return (
    <Slide num={5}>
      <Eyebrow accent>กฎหมายที่เปิดทาง</Eyebrow>
      <Title size={28}>กฎกระทรวง 2567 — ให้ อปท. ปรับขึ้นค่าธรรมเนียมได้</Title>
      <Lead style={{ marginTop: 4, fontSize: 15, maxWidth: 1100 }}>
        เปิดทางให้หน่วยงานท้องถิ่นขึ้นเพดานค่าธรรมเนียมเป็น 60 ฿/เดือน สำหรับครัวเรือนทั่วไป — และให้ "คัดแยก = จ่ายน้อยลง" เป็นแรงจูงใจที่เป็นทางการ
      </Lead>

      {/* 4 stat cards — context */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginTop: 12 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 12, padding: '10px 12px' }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: C.textMuted, letterSpacing: 1.2 }}>{s.k}</div>
            <div style={{ fontSize: s.small ? 18 : 24, fontWeight: 800, color: s.c, lineHeight: 1.15, marginTop: 3 }}>{s.v}</div>
            <div style={{ fontSize: 10.5, color: C.textMuted, lineHeight: 1.4, marginTop: 3 }}>{s.d}</div>
          </div>
        ))}
      </div>

      {/* 3-tier pricing — grounded in regulation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 14, flex: 1, minHeight: 0 }}>
        {tiers.map((t, i) => (
          <div key={i} style={{ background: t.cs, border: `${t.highlight ? 2 : 1}px solid ${t.c}`, borderRadius: 14, padding: '14px 16px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <span style={{ display: 'inline-block', alignSelf: 'flex-start', fontSize: 11, fontWeight: 700, padding: '3px 11px', borderRadius: 100, background: t.tagBg, color: t.tagCol, marginBottom: 8 }}>{t.tag}</span>
            <div style={{ fontSize: 34, fontWeight: 800, color: t.c, lineHeight: 1 }}>{t.t}</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>{t.sub}</div>
            <div style={{ flex: 1, marginTop: 10, fontSize: 12.5, color: C.text, lineHeight: 1.5 }}>{t.d}</div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 6 — Resident demo · R-02 Dashboard + R-04 Bill
// ===========================================================================

function Slide06() {
  return (
    <Slide num={6}>
      <Eyebrow>ฝั่งประชาชน · หน้าจอจริง</Eyebrow>
      <Title size={32}>เปิดแอปครั้งเดียว · เห็นยอดค้าง · จ่าย QR ที่บ้าน</Title>
      <Lead style={{ marginTop: 4, fontSize: 16, maxWidth: 1100 }}>
        ประชาชนเห็นยอดค้างทันทีโดยไม่ต้องโทรถาม · จ่ายด้วย PromptPay QR ในมือถือเครื่องเดิม · ไม่ต้องลางานมา อปท.
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginTop: 16, flex: 1, alignItems: 'center' }}>
        <MobileMockup src={M.resDashboard} label="R-02 · หน้าแรก ประชาชน" />
        <MobileMockup src={M.payQR} label="R-05 · QR PromptPay สแกนจ่าย" />
        <div>
          <div style={{ fontSize: 11.5, color: C.primary, fontWeight: 700, letterSpacing: 1.5, marginBottom: 10 }}>สิ่งที่ประชาชนทำได้</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              ['📊', 'เปิดแอปเห็นยอดค้างทันที — ไม่ต้องโทรถาม'],
              ['💳', 'จ่ายด้วย PromptPay QR · ใช้แอปธนาคารเครื่องเดิม'],
              ['🧾', 'ใบเสร็จดิจิทัลอย่างเป็นทางการ มีเลขที่กำกับ'],
              ['🔔', 'แจ้งเตือนก่อนถึงกำหนดผ่าน LINE / SMS'],
              ['🌱', 'สมัครเข้าโครงการคัดแยกในแอป → ส่วนลดมาเอง'],
            ].map((x, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: i < 4 ? `1px dashed ${C.surfaceSoft}` : 'none' }}>
                <span style={{ fontSize: 18, lineHeight: 1.4, flexShrink: 0 }}>{x[0]}</span>
                <span style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{x[1]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 7 — Resident demo · R-06 Receipt + R-08 Sticker
// ===========================================================================

function Slide07() {
  return (
    <Slide num={7}>
      <Eyebrow>ฝั่งประชาชน · หน้าจอจริง (ต่อ)</Eyebrow>
      <Title size={32}>ใบเสร็จดิจิทัล · สถานะสติ๊กเกอร์ · เห็นในมือถือ</Title>
      <Lead style={{ marginTop: 4, fontSize: 16, maxWidth: 1100 }}>
        ใบเสร็จเป็นทางการในมือถือ มีเลขที่กำกับ ใช้ยื่นได้ · สถานะสติ๊กเกอร์บอกว่าบ้านนี้จ่ายแล้ว/อยู่ในระดับคัดแยกใด
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginTop: 16, flex: 1, alignItems: 'center' }}>
        <MobileMockup src={M.receipt} label="R-06 · ใบเสร็จดิจิทัล" />
        <MobileMockup src={M.sticker} label="R-08 · สถานะสติ๊กเกอร์" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card style={{ borderLeft: `4px solid ${C.success}`, padding: '16px 18px' }}>
            <CardTitle style={{ fontSize: 17 }}>🧾 ใบเสร็จออกอัตโนมัติ</CardTitle>
            <CardBody style={{ fontSize: 13 }}>เลขที่ระบบกำกับ · บาร์โค้ดให้ จนท. ยืนยัน · ดาวน์โหลด PDF ใช้ยื่นได้</CardBody>
          </Card>
          <Card style={{ borderLeft: `4px solid ${C.accent}`, padding: '16px 18px' }}>
            <CardTitle style={{ fontSize: 17 }}>🏷️ สติ๊กเกอร์ = สถานะการจ่าย + ระดับคัดแยก</CardTitle>
            <CardBody style={{ fontSize: 13 }}>สีสติ๊กเกอร์บอกระดับ (0-3) · พนักงานเห็นจากรถ ไม่ต้องตรวจซ้ำ</CardBody>
          </Card>
        </div>
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 8 — Resident demo · R-09 Schedule + R-11 Issue
// ===========================================================================

function Slide08() {
  return (
    <Slide num={8}>
      <Eyebrow>ฝั่งประชาชน · หน้าจอจริง (ต่อ)</Eyebrow>
      <Title size={32}>ตารางเก็บขยะ · แจ้งร้องเรียน · ติดตามได้ทุกขั้นตอน</Title>
      <Lead style={{ marginTop: 4, fontSize: 16, maxWidth: 1100 }}>
        รู้ล่วงหน้ารถขยะมาวันไหน · เวลาไหน · ถ้ามีปัญหาแจ้งในแอป + ติดตามได้ — ไม่ต้องโทรไป อปท. ซ้ำๆ
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginTop: 16, flex: 1, alignItems: 'center' }}>
        <MobileMockup src={M.schedule} label="R-09 · ตารางเก็บขยะ" />
        <MobileMockup src={M.issueTrack} label="R-11 · ติดตามร้องเรียน" />
        <div>
          <div style={{ fontSize: 11.5, color: C.primary, fontWeight: 700, letterSpacing: 1.5, marginBottom: 10 }}>ลดสายโทรเข้า อปท.</div>
          <Card style={{ padding: '14px 16px', marginBottom: 10 }}>
            <CardTitle style={{ fontSize: 16 }}>📅 ปฏิทินเก็บขยะ</CardTitle>
            <CardBody style={{ fontSize: 12.5 }}>LINE เตือนคืนก่อนเก็บ · เลิกโทรถาม "วันนี้รถมาไหม"</CardBody>
          </Card>
          <Card style={{ padding: '14px 16px' }}>
            <CardTitle style={{ fontSize: 16 }}>🎫 Issue Tracking · SLA 48 ชม.</CardTitle>
            <CardBody style={{ fontSize: 12.5 }}>ทุกสถานะมี timestamp · ตรวจสอบ สตง. ได้</CardBody>
          </Card>
        </div>
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 9 — Officer demo · O-01 KPI Dashboard (full width)
// ===========================================================================

function Slide09() {
  const kpis = [
    { ic: '💰', t: 'รายได้วันนี้ vs เป้าหมาย', d: 'เปิดมาเห็นรายได้รวมวัน-เดือน-ปี เทียบเป้าทันที — เลิกรอรายงานสิ้นเดือน' },
    { ic: '📊', t: 'อัตราชำระตรงเวลา', d: 'เห็น % บ้านที่จ่ายตรงเวลา · เห็นแนวโน้มย้อนหลัง 6 เดือน · ตอบสภาฯ ได้เป็นกราฟ' },
    { ic: '⚠️', t: 'เคสค้างชำระ + วันที่เกิน', d: 'เห็นจำนวนบิลค้าง · ยอดรวมที่ต้องตามเก็บ · บ้านที่เข้าระดับ "ระงับเก็บ"' },
    { ic: '🌱', t: '% บ้านในโครงการคัดแยก', d: 'ดูได้ว่าโครงการคัดแยก/ปุ๋ยหมัก ครอบคลุมกี่ % แล้ว — ใช้วางแผนขยายต่อ' },
  ];
  return (
    <Slide num={9}>
      <Eyebrow accent>ฝั่ง อปท. · หน้าจอจริง</Eyebrow>
      <Title size={28}>ผู้บริหารเห็นรายได้ทุกวัน · ไม่ต้องรอรายงานสิ้นเดือน</Title>
      <Lead style={{ marginTop: 4, fontSize: 15.5, maxWidth: 1100 }}>
        Dashboard แบบ real-time — เปิดเข้ามาเห็น 4 ตัวเลขสำคัญ พร้อมกราฟแนวโน้ม
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 18, marginTop: 12, flex: 1, minHeight: 0 }}>
        <DesktopMockup src={M.kpi} label="O-01 · KPI Dashboard สำหรับปลัด / กองคลัง" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, letterSpacing: 1.5, marginBottom: 2 }}>4 ตัวเลขที่ปลัดเช็กเป็นอย่างแรก</div>
          {kpis.map((k, i) => (
            <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 11, padding: '11px 14px', display: 'flex', gap: 11, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{k.ic}</div>
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: C.primaryDeep, marginBottom: 2, lineHeight: 1.35 }}>{k.t}</h4>
                <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.45 }}>{k.d}</p>
              </div>
            </div>
          ))}
          <div style={{ background: C.primarySoft, borderRadius: 10, padding: '9px 14px', marginTop: 4, display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ fontSize: 20 }}>📥</div>
            <div style={{ fontSize: 12, color: C.primaryDeep, lineHeight: 1.45 }}>
              <strong>Export รายงาน สตง.</strong> — ปุ่มเดียว PDF/Excel · มี audit log ครบ
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 10 — Officer demo · O-02 Households + O-04 Generate
// ===========================================================================

function Slide10() {
  const features = [
    { ic: '🔎', t: 'ค้นหาทุกแบบ', d: 'ค้นด้วยเลขบ้าน · ชื่อเจ้าของ · หมู่ · ประเภท · ระดับคัดแยก' },
    { ic: '🏷️', t: 'แยกสถานะอัตโนมัติ', d: 'จ่ายแล้ว / ค้าง / รอชำระ / ระงับเก็บ — ดูสีรู้ทันที' },
    { ic: '🌱', t: 'ระดับคัดแยก L0-L3', d: 'เห็นทันทีว่าบ้านไหนคัดแยก/หมักปุ๋ย และคิดค่าธรรมเนียมตามนั้น' },
    { ic: '⚡', t: 'สร้างบิลทั้ง อปท. ใน 1 คลิก', d: '918 ใบ · ใช้เวลา 30 วินาที · ส่งทั้งกระดาษ + LINE + Email' },
  ];
  return (
    <Slide num={10}>
      <Eyebrow accent>ฝั่ง อปท. · หน้าจอจริง (ต่อ)</Eyebrow>
      <Title size={28}>ครัวเรือนทุกหลัง · ใครจ่าย/ใครค้าง · อยู่โครงการอะไร</Title>
      <Lead style={{ marginTop: 4, fontSize: 15.5, maxWidth: 1100 }}>
        แยกได้ทันที: ใครจ่ายแล้ว · ใครค้าง · บ้านไหนเข้าโครงการคัดแยก · บ้านไหนทำปุ๋ยหมัก
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 18, marginTop: 12, flex: 1, minHeight: 0 }}>
        <DesktopMockup src={M.households} label="O-02 · รายการครัวเรือน + ระดับคัดแยก" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 12, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 24, lineHeight: 1, flexShrink: 0 }}>{f.ic}</div>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: C.primaryDeep, marginBottom: 2, lineHeight: 1.35 }}>{f.t}</h4>
                <p style={{ fontSize: 12.5, color: C.textMuted, lineHeight: 1.45 }}>{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 11 — Officer demo · O-06 Record Payment
// ===========================================================================

function Slide11() {
  const steps = [
    { n: 1, t: 'สแกน Barcode บนบิล', d: 'ใช้ USB scanner หรือกล้องมือถือ · ระบบดึงข้อมูลบิลขึ้นมาในวินาที' },
    { n: 2, t: 'เลือกวิธีชำระ', d: 'เงินสด · โอน · PromptPay QR — รับได้ทุกแบบ' },
    { n: 3, t: 'ระบบคำนวณทอนให้', d: 'ใส่ยอดที่ลูกบ้านให้ · ระบบบอกทอนทันที — ไม่คำนวณผิด' },
    { n: 4, t: 'ใบเสร็จออกอัตโนมัติ', d: 'พิมพ์กระดาษ (A4 / 80mm) หรือส่ง LINE — ลูกค้าได้ทั้ง 2 แบบ' },
  ];
  return (
    <Slide num={11}>
      <Eyebrow accent>ฝั่ง อปท. · หน้าจอจริง (ต่อ)</Eyebrow>
      <Title size={28}>หน้าเคาน์เตอร์: 4 ขั้นตอน · เสร็จใน 1 นาที</Title>
      <Lead style={{ marginTop: 4, fontSize: 15.5, maxWidth: 1100 }}>
        สำหรับลูกบ้านที่ยังเลือกจ่ายเงินสด — ก็เร็วกว่าเดิมหลายเท่า · เลิกพิมพ์ใบเสร็จมือ · เลิกคำนวณทอนผิด
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 18, marginTop: 12, flex: 1, minHeight: 0 }}>
        <DesktopMockup src={M.recordPayment} label="O-06 · รับชำระเงินที่เคาน์เตอร์" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          {steps.map((s) => (
            <div key={s.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: C.primary, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>{s.n}</div>
              <div style={{ paddingTop: 2 }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: C.primaryDeep, lineHeight: 1.35, marginBottom: 2 }}>{s.t}</h4>
                <p style={{ fontSize: 12.5, color: C.textMuted, lineHeight: 1.5 }}>{s.d}</p>
              </div>
            </div>
          ))}
          <div style={{ background: C.primarySoft, borderRadius: 10, padding: '10px 14px', marginTop: 6, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 22 }}>⏱️</div>
            <div style={{ fontSize: 12.5, color: C.primaryDeep, lineHeight: 1.4 }}>
              <strong>จากเดิม 5 นาที/ราย</strong> เหลือ <strong style={{ color: C.success }}>&lt; 1 นาที/ราย</strong>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 12 — Officer demo · O-07 Receipt + O-08 Arrears
// ===========================================================================

function Slide12() {
  const levels = [
    { l: 'ใหม่', n: '23', c: '#7E8B83', cs: '#EAECE5', d: 'เกินกำหนด 1-30 วัน · ไม่ต้องทำอะไร — รอเตือนรอบแรก' },
    { l: 'เตือน 1', n: '14', c: '#D48A1B', cs: '#FFEDC5', d: 'เกิน 31-60 วัน · ส่ง LINE / SMS / Email อัตโนมัติ' },
    { l: 'เตือน 2', n: '8', c: '#C25A26', cs: '#FBDDC4', d: 'เกิน 61-90 วัน · พิมพ์หนังสือเตือนเป็นทางการ + LINE' },
    { l: 'ระงับเก็บ', n: '3', c: '#A32D2D', cs: C.alertSoft, d: 'เกิน 90 วัน · บ้านนี้รถขยะไม่เก็บ · ปุ่ม "เก็บ" บน Driver App ถูก disable' },
    { l: 'กฎหมาย', n: '0', c: '#7C3AED', cs: '#EDE3FB', d: 'ส่งฟ้อง · เคสค้างหนัก — ส่งทุกข้อมูลให้นิติกรในคลิก' },
  ];
  return (
    <Slide num={12}>
      <Eyebrow accent>ฝั่ง อปท. · หน้าจอจริง (ต่อ)</Eyebrow>
      <Title size={28}>ค้างชำระไม่ลอย · ระบบแบ่งระดับให้อัตโนมัติ</Title>
      <Lead style={{ marginTop: 4, fontSize: 15.5, maxWidth: 1100 }}>
        ไม่ต้องโทรไล่ทีละบ้าน · ไม่ต้องจดในสมุด · ระบบยกระดับให้ตามจำนวนวันที่เกินกำหนด · ส่งหนังสือเตือนเป็น batch ในคลิกเดียว
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18, marginTop: 12, flex: 1, minHeight: 0 }}>
        <DesktopMockup src={M.arrears} label="O-08 · ติดตามค้างชำระ (Arrears Management)" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, letterSpacing: 1.5, marginBottom: 4 }}>5 ระดับการยกระดับ (ESCALATION)</div>
          {levels.map((lv, i) => (
            <div key={i} style={{ background: lv.cs, border: `1.5px solid ${lv.c}`, borderRadius: 9, padding: '8px 12px', display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 38, height: 38, borderRadius: 7, background: '#FFF', color: lv.c, fontSize: 16, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${lv.c}` }}>{lv.n}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: lv.c, lineHeight: 1.2 }}>{lv.l}</div>
                <div style={{ fontSize: 11, color: C.text, lineHeight: 1.4 }}>{lv.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 13 — Driver app + spot-check (verify sorting)
// ===========================================================================

function PhoneStatusBar({ dark }) {
  return (
    <div style={{ background: dark ? C.primaryDeep : '#FFF', color: dark ? '#FFF' : C.text, padding: '6px 14px', fontSize: 10.5, fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>9:41</span>
      <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>📶 5G · 🔋 92%</span>
    </div>
  );
}

function DriverMap() {
  // GIS-style map: real-looking roads, water, park, building parcels, house pins with tier colors.
  const houses = [
    { x: 70, y: 80, c: C.success, l: '042', tier: '3' },
    { x: 110, y: 80, c: C.alert, l: '044', tier: '×' },
    { x: 200, y: 80, c: '#4A7C59', l: '046', tier: '2' },
    { x: 240, y: 80, c: C.accent, l: '048', tier: '1' },
    { x: 70, y: 175, c: C.success, l: '041', tier: '3' },
    { x: 110, y: 175, c: '#4A7C59', l: '043', tier: '2' },
    { x: 200, y: 175, c: C.accent, l: '045', tier: '1' },
    { x: 240, y: 175, c: C.accent, l: '047', tier: '1' },
  ];
  return (
    <svg viewBox="0 0 380 250" style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E8E2CF" strokeWidth="0.4" />
        </pattern>
        <filter id="shadow-mark" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Base map background — paper/satellite hybrid look */}
      <rect width="380" height="250" fill="#F5EFE0" />
      <rect width="380" height="250" fill="url(#map-grid)" />

      {/* Park / green area (top-left) */}
      <path d="M 0 0 L 130 0 L 145 28 L 138 58 L 95 70 L 0 65 Z" fill="#D7E7B8" />
      <text x="55" y="35" fontSize="9" fill="#5B7D2E" fontStyle="italic" fontWeight="600">สวนสาธารณะ</text>
      <circle cx="40" cy="50" r="5" fill="#9CBE61" /><circle cx="60" cy="48" r="4" fill="#9CBE61" />
      <circle cx="85" cy="55" r="6" fill="#9CBE61" /><circle cx="108" cy="50" r="5" fill="#9CBE61" />

      {/* Water — canal flowing through */}
      <path d="M 380 10 Q 340 30 350 70 T 365 130 Q 360 180 380 220" stroke="#A8D0E2" strokeWidth="16" fill="none" />
      <path d="M 380 10 Q 340 30 350 70 T 365 130 Q 360 180 380 220" stroke="#7FB9D8" strokeWidth="1" fill="none" strokeDasharray="0" opacity="0.5" />
      <text x="338" y="105" fontSize="8" fill="#3C7898" fontStyle="italic" transform="rotate(78 338 105)">คลองชลประทาน</text>

      {/* Building parcel blocks (light gray rectangles) */}
      <g fill="#E2DAC4" stroke="#C9BFA3" strokeWidth="0.5">
        <rect x="40" y="62" width="22" height="18" rx="1" />
        <rect x="65" y="62" width="22" height="18" rx="1" />
        <rect x="90" y="62" width="22" height="18" rx="1" />
        <rect x="180" y="62" width="22" height="18" rx="1" />
        <rect x="205" y="62" width="22" height="18" rx="1" />
        <rect x="230" y="62" width="22" height="18" rx="1" />
        <rect x="255" y="62" width="22" height="18" rx="1" />
        <rect x="280" y="62" width="22" height="18" rx="1" />
        <rect x="40" y="157" width="22" height="18" rx="1" />
        <rect x="65" y="157" width="22" height="18" rx="1" />
        <rect x="90" y="157" width="22" height="18" rx="1" />
        <rect x="180" y="157" width="22" height="18" rx="1" />
        <rect x="205" y="157" width="22" height="18" rx="1" />
        <rect x="230" y="157" width="22" height="18" rx="1" />
        <rect x="255" y="157" width="22" height="18" rx="1" />
        <rect x="280" y="157" width="22" height="18" rx="1" />
      </g>

      {/* Roads — main road horizontal */}
      <line x1="0" y1="125" x2="380" y2="125" stroke="#F4D88F" strokeWidth="22" />
      <line x1="0" y1="125" x2="380" y2="125" stroke="#FFFFFF" strokeWidth="18" />
      <line x1="0" y1="125" x2="380" y2="125" stroke="#F4D88F" strokeWidth="0.6" strokeDasharray="6 6" />
      <text x="14" y="121" fontSize="8" fill="#8C7126" fontWeight="600">ถ.ลาดพร้าว</text>

      {/* Side road vertical */}
      <line x1="150" y1="0" x2="150" y2="250" stroke="#E8E1CF" strokeWidth="14" />
      <line x1="150" y1="0" x2="150" y2="250" stroke="#FFFFFF" strokeWidth="11" />
      <text x="155" y="40" fontSize="7" fill="#7C7259">ซ.ลาดพร้าว 12</text>

      {/* Side road vertical 2 */}
      <line x1="320" y1="0" x2="320" y2="250" stroke="#E8E1CF" strokeWidth="14" />
      <line x1="320" y1="0" x2="320" y2="250" stroke="#FFFFFF" strokeWidth="11" />

      {/* Truck on main road */}
      <g transform="translate(155, 115)" filter="url(#shadow-mark)">
        <rect width="28" height="22" rx="3" fill={C.primary} />
        <rect x="2" y="3" width="8" height="6" rx="1" fill="#A6DDC5" />
        <circle cx="7" cy="22" r="3" fill="#222" />
        <circle cx="22" cy="22" r="3" fill="#222" />
        <text x="14" y="16" textAnchor="middle" fontSize="11" fill="#FFF">🚛</text>
      </g>
      <text x="155" y="148" fontSize="7.5" fill={C.primary} fontWeight="700">รถ #B-3</text>

      {/* House markers — pin style */}
      {houses.map((h, i) => (
        <g key={i} filter="url(#shadow-mark)">
          <path d={`M ${h.x} ${h.y - 16} m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0 M ${h.x} ${h.y - 6} L ${h.x - 4} ${h.y} L ${h.x + 4} ${h.y} Z`} fill={h.c} stroke="#FFF" strokeWidth="1.5" />
          <text x={h.x} y={h.y - 13} textAnchor="middle" fontSize="9" fontWeight="800" fill="#FFF">{h.tier}</text>
          <text x={h.x} y={h.y + 11} textAnchor="middle" fontSize="7.5" fontWeight="700" fill={C.text}>{h.l}</text>
        </g>
      ))}

      {/* Map controls — top-right zoom + layer */}
      <g transform="translate(347, 8)">
        <rect width="22" height="20" rx="3" fill="#FFF" stroke="#C9BFA3" strokeWidth="0.5" />
        <text x="11" y="14" textAnchor="middle" fontSize="11" fill={C.text} fontWeight="700">+</text>
        <rect y="22" width="22" height="20" rx="3" fill="#FFF" stroke="#C9BFA3" strokeWidth="0.5" />
        <text x="11" y="36" textAnchor="middle" fontSize="11" fill={C.text} fontWeight="700">−</text>
      </g>

      {/* Layer toggle — top-left */}
      <g transform="translate(8, 8)">
        <rect width="58" height="18" rx="4" fill="#FFF" stroke="#C9BFA3" strokeWidth="0.5" />
        <rect x="2" y="2" width="26" height="14" rx="3" fill={C.primary} />
        <text x="15" y="12" textAnchor="middle" fontSize="7.5" fill="#FFF" fontWeight="700">🗺 แผนที่</text>
        <text x="43" y="12" textAnchor="middle" fontSize="7.5" fill={C.textMuted}>🛰 ดาวเทียม</text>
      </g>

      {/* Compass — top right */}
      <g transform="translate(352, 60)">
        <circle r="11" fill="#FFF" stroke="#C9BFA3" strokeWidth="0.6" />
        <path d="M 0 -8 L 3 4 L 0 1 L -3 4 Z" fill={C.alert} />
        <text x="0" y="-13" textAnchor="middle" fontSize="7" fontWeight="700" fill={C.text}>N</text>
      </g>

      {/* Scale bar — bottom left */}
      <g transform="translate(10, 232)">
        <rect width="40" height="3" fill="#FFF" stroke="#444" strokeWidth="0.5" />
        <rect width="20" height="3" fill="#222" />
        <text x="0" y="-2" fontSize="6.5" fill="#444">0</text>
        <text x="20" y="-2" fontSize="6.5" fill="#444" textAnchor="middle">25m</text>
        <text x="42" y="-2" fontSize="6.5" fill="#444">50m</text>
      </g>

      {/* Legend — bottom right */}
      <g transform="translate(228, 218)" fontSize="7" fill={C.text}>
        <rect x="-4" y="-6" width="148" height="28" rx="4" fill="rgba(255,255,255,0.92)" stroke="#C9BFA3" strokeWidth="0.4" />
        <circle cx="2" cy="2" r="3" fill={C.success} /><text x="9" y="4">L3 ปุ๋ยหมัก</text>
        <circle cx="48" cy="2" r="3" fill="#4A7C59" /><text x="55" y="4">L2 แยก+อินทรีย์</text>
        <circle cx="2" cy="14" r="3" fill={C.accent} /><text x="9" y="16">L1 แยกแห้ง</text>
        <circle cx="48" cy="14" r="3" fill={C.alert} /><text x="55" y="16">ค้าง · ข้าม</text>
      </g>
    </svg>
  );
}

function DriverApp() {
  return (
    <>
      <PhoneStatusBar dark />
      <div style={{ background: C.primaryDeep, color: '#FFF', padding: '8px 12px' }}>
        <div style={{ fontSize: 11.5, fontWeight: 700 }}>เส้นทาง R-12 · ม.5</div>
        <div style={{ fontSize: 9.5, opacity: 0.75 }}>รถ #B-3 · กะเช้า · 06:30</div>
      </div>
      <div style={{ background: '#FFF', height: 220 }}>
        <DriverMap />
      </div>
      <div style={{ padding: 9 }}>
        <div style={{ fontSize: 9.5, fontWeight: 700, color: C.primary, marginBottom: 4 }}>คลัสเตอร์: บ้าน 042-048</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
          <div style={{ background: C.successSoft, border: `1px solid ${C.success}`, borderRadius: 7, padding: 7 }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: C.success }}>042 · L3 · ปุ๋ยหมัก</div>
            <div style={{ fontSize: 8, color: C.text }}>สมชาย · จ่ายแล้ว ฿10</div>
            <button style={{ background: C.success, color: '#FFF', border: 'none', borderRadius: 5, padding: '3px 0', fontSize: 8.5, fontWeight: 700, width: '100%', marginTop: 3 }}>✓ เก็บ + 🔎 สุ่มตรวจ</button>
          </div>
          <div style={{ background: C.alertSoft, border: `1px solid ${C.alert}`, borderRadius: 7, padding: 7 }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: C.alert }}>044 · ค้าง 32 วัน</div>
            <div style={{ fontSize: 8, color: C.text }}>ค้าง ฿1,240 · ไม่มีสติ๊กเกอร์</div>
            <button disabled style={{ background: '#CCC', color: '#FFF', border: 'none', borderRadius: 5, padding: '3px 0', fontSize: 9, width: '100%', marginTop: 3 }}>SKIP · ข้าม</button>
          </div>
          <div style={{ background: '#E1EFD9', border: '1px solid #4A7C59', borderRadius: 7, padding: 7 }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: '#4A7C59' }}>046 · L2 · คัดแยก</div>
            <div style={{ fontSize: 8, color: C.text }}>นพดล · จ่ายแล้ว ฿20</div>
            <button style={{ background: '#4A7C59', color: '#FFF', border: 'none', borderRadius: 5, padding: '3px 0', fontSize: 9, fontWeight: 700, width: '100%', marginTop: 3 }}>✓ เก็บ</button>
          </div>
          <div style={{ background: C.accentSoft, border: `1px solid ${C.accent}`, borderRadius: 7, padding: 7 }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: C.accent }}>048 · L1 · แห้ง</div>
            <div style={{ fontSize: 8, color: C.text }}>มาลี · จ่ายแล้ว ฿40</div>
            <button style={{ background: C.accent, color: '#FFF', border: 'none', borderRadius: 5, padding: '3px 0', fontSize: 9, fontWeight: 700, width: '100%', marginTop: 3 }}>✓ เก็บ</button>
          </div>
        </div>
        <div style={{ background: C.primarySoft, borderRadius: 7, padding: '6px 9px', marginTop: 7, fontSize: 10, color: C.primaryDeep, lineHeight: 1.4 }}>
          <strong>🔎 สุ่มตรวจรอบที่ 2/3</strong> (พ.ค.-ส.ค.) · ครบ 3 บ้านแล้ว
        </div>
      </div>
    </>
  );
}

function Slide13() {
  return (
    <Slide num={13}>
      <Eyebrow>ฝั่งพนักงานเก็บขยะ · หน้าจอจริง</Eyebrow>
      <Title size={28}>รถจอดครั้งเดียว · เก็บ 2 ฝั่ง · สุ่มตรวจคัดแยก 3 ครั้ง/ปี</Title>
      <Lead style={{ marginTop: 4, fontSize: 16, maxWidth: 1100 }}>
        แอปบนมือถือของพนักงาน — แผนที่ GPS แบบ Google Maps · แสดง zone · จำนวนบ้านที่ต้องเก็บ · ปุ่ม "เลือกบ้าน" เพื่อบันทึกผลและสุ่มตรวจคัดแยก
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 36, marginTop: 14, flex: 1, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ background: C.primaryDeep, padding: 8, borderRadius: 28, boxShadow: '0 18px 40px rgba(0,0,0,0.22)' }}>
            <div style={{ borderRadius: 22, overflow: 'hidden', width: 260, height: 484, background: '#000' }}>
              <img
                src="images/waste-fee/driver-map.png"
                alt="Driver App · GPS Map · Zone A-12"
                style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, textAlign: 'center' }}>Driver App · GPS Map · Zone A-12 · 12 / 42 หลัง</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { ic: '🗺️', t: 'แผนที่ GPS · zone-based', d: 'พนักงานเห็นแผนที่แบบ Google Maps จริง · แบ่งโซน (A-12) · เห็นทุกบ้านที่ต้องเก็บใน zone นั้น (12 / 42 หลัง)' },
            { ic: '🔎', t: 'สุ่มตรวจคัดแยก 3 ครั้ง/ปี', d: 'ทุก 4 เดือนระบบเตือนให้พนักงานสุ่ม X บ้าน · กด "เลือกบ้าน" → บันทึก "คัดแยกจริง" หรือ "ไม่ตรงตามที่สมัคร" · ระดับและส่วนลดปรับให้บิลถัดไปอัตโนมัติ' },
            { ic: '🛑', t: 'บ้านค้าง = ปุ่ม "เก็บ" disable', d: 'ระบบเช็คสถานะค่าธรรมเนียมอัตโนมัติ · บ้านค้างชำระจะถูก skip · ไม่มี bypass · ลดความขัดแย้งระหว่างพนักงานกับเจ้าของบ้าน' },
            { ic: '📍', t: 'บันทึก GPS ทุกการเก็บ', d: 'พิกัด + เวลา + พนักงานคนไหน · เก็บเป็น audit log สำหรับ สตง. · พิสูจน์ว่ารถมาเก็บจริง' },
          ].map((b, i) => (
            <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 12, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{b.ic}</div>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: C.primaryDeep, lineHeight: 1.35, marginBottom: 2 }}>{b.t}</h4>
                <p style={{ fontSize: 12.5, color: C.textMuted, lineHeight: 1.5 }}>{b.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 14 — Trust · PDPA + Security
// ===========================================================================

function Slide14() {
  const items = [
    { ic: '🇹🇭', t: 'ข้อมูลทั้งหมดอยู่ในประเทศไทย', d: 'AWS Bangkok region · ตาม PDPA มาตรา 28 · ไม่ส่งข้อมูลออกนอกประเทศ' },
    { ic: '🔒', t: 'Row-Level Security (RLS)', d: 'ข้อมูลของแต่ละ อปท. แยกกันสมบูรณ์ ข้ามกันไม่ได้เด็ดขาด · ผู้ดูแลของเราเองก็เข้าไม่ได้' },
    { ic: '🛡️', t: 'Zero-Knowledge ID', d: 'Gismo ไม่เก็บเลขบัตรประชาชน · ใช้ ID อ้างอิงเท่านั้น · เชื่อมกรมที่ดิน/มหาดไทยตามต้องการ' },
    { ic: '📋', t: 'Audit Log ครบทุก action', d: 'ทุกคำสั่ง edit/approval/refund/spot-check มี timestamp + user + reason · ตรวจสอบ สตง. ใน 1 คลิก' },
  ];
  return (
    <Slide num={14} dark>
      <Eyebrow dark>ข้อมูลปลอดภัย · ตรวจสอบได้</Eyebrow>
      <Title dark size={36}>PDPA-compliant · ตอบ สตง. ได้ทุกบรรทัด</Title>
      <Lead dark style={{ marginTop: 12, maxWidth: 1020 }}>
        ทุกการกระทำในระบบมี audit log · ข้อมูลแต่ละ อปท. แยกกันชัดเจน · เจ้าหน้าที่เข้าได้เฉพาะหน้าที่ตัวเอง
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 22, flex: 1, alignContent: 'center' }}>
        {items.map((it, i) => (
          <Card key={i} dark style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 32, lineHeight: 1, flexShrink: 0 }}>{it.ic}</div>
            <div>
              <CardTitle dark style={{ fontSize: 18, marginBottom: 4 }}>{it.t}</CardTitle>
              <CardBody dark style={{ fontSize: 14 }}>{it.d}</CardBody>
            </div>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 15 — Before / After
// ===========================================================================

function Slide15() {
  const rows = [
    ['ลูกบ้านจ่ายค่าขยะ', 'มาเองที่ อปท. ในเวลาราชการ', 'จ่ายในแอป ที่ไหน เมื่อไหร่ก็ได้'],
    ['อัตราชำระตรงเวลา', '60-70% (ค้าง 25-40%)', 'เพิ่มขึ้น ≥ 20% ภายในปีแรก'],
    ['ขยะที่ทิ้ง', 'ขยะรวม · ขยะเปียกเยอะ · ค่าทิ้งสูง', 'แยกตามระดับ · ขยะเปียกลด · ค่าทิ้งลด'],
    ['โครงการคัดแยก/ปุ๋ยหมัก', 'ไม่รู้ใครทำจริง · ส่วนลดให้แบบประมาณ', 'ระบุบ้านได้ + พนักงานสุ่มตรวจ 3x/ปี'],
    ['ติดตามค้างชำระ', 'โทรไล่ทีละบ้าน · จดในสมุด', 'แบ่งระดับอัตโนมัติ · timeline ครบ'],
    ['รถขยะกับบ้านค้าง', 'พึ่งสายตา · เกิดข้อโต้แย้ง', 'ระบบ disable ปุ่ม "เก็บ" อัตโนมัติ'],
    ['รายงาน สตง.', 'รวบรวมเอกสาร 1-2 สัปดาห์', 'Export PDF/Excel 1 คลิก'],
  ];
  return (
    <Slide num={15}>
      <Eyebrow>ก่อน vs หลัง</Eyebrow>
      <Title>เปลี่ยนงานทั้ง 7 เรื่องในการเก็บค่าขยะ</Title>
      <div style={{ marginTop: 18, background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 18, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.6fr 1.6fr', background: C.primary }}>
          {['เรื่อง', 'แบบเดิม', 'แบบใหม่'].map((h, i) => (
            <div key={i} style={{ padding: '12px 18px', color: '#FFF', fontWeight: 700, fontSize: 15 }}>{h}</div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.6fr 1.6fr', borderTop: `1px solid ${C.surfaceSoft}`, alignItems: 'center' }}>
            <div style={{ padding: '10px 18px', fontSize: 13.5, fontWeight: 700, color: C.primary }}>{r[0]}</div>
            <div style={{ padding: '10px 18px', fontSize: 13, color: C.alert, lineHeight: 1.4 }}>✗ {r[1]}</div>
            <div style={{ padding: '10px 18px', fontSize: 13, color: C.success, fontWeight: 600, lineHeight: 1.4 }}>✓ {r[2]}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12.5, color: C.textMuted, fontStyle: 'italic', marginTop: 10 }}>
        ตัวเลข baseline จากการสำรวจ อปท. ขนาดกลาง 918 ครัวเรือน · ผลจริงอาจต่างกันตามขนาดและความพร้อม
      </p>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 16 — Plans (3 tiers)
// ===========================================================================

function Slide16() {
  const tiers = [
    {
      tag: 'เริ่มเล็ก',
      tagBg: C.primary,
      title: 'Starter\n< 1,000 ครัวเรือน',
      price: '2,500 – 5,000',
      who: 'เหมาะกับ: อบต. ขนาดเล็ก',
      items: [
        'แอปประชาชน + Officer Portal',
        'ออกบิลรอบเดือน + รับชำระ',
        'รายงานพื้นฐาน',
        'อบรม + onboarding 7 วัน',
      ],
      budget: '💰 งบสารสนเทศ · งบดำเนินงาน',
    },
    {
      tag: 'พร้อมเปลี่ยน',
      tagBg: '#4A7C59',
      title: 'Professional\n1,000 – 5,000 ครัวเรือน',
      price: '8,000 – 15,000',
      who: 'เหมาะกับ: เทศบาลตำบล · อบต.กลาง',
      items: [
        'ครบ Starter +',
        'Driver App + sorting tier + spot-check',
        'Dunning อัตโนมัติ (LINE + SMS)',
        'ระบบจัดการเงินเกิน/คืนเงิน',
        'API เชื่อมต่อกรมที่ดิน',
      ],
      budget: '💰 งบโครงการ + งบสารสนเทศ',
    },
    {
      tag: 'เต็มรูปแบบ',
      tagBg: C.accent,
      title: 'Enterprise\n> 5,000 ครัวเรือน',
      price: '20,000 – 40,000',
      who: 'เหมาะกับ: เทศบาลเมือง · นคร',
      items: [
        'ครบ Pro +',
        'Multi-zone + ผู้ใช้ไม่จำกัด',
        'Custom report + Export สตง.',
        'SLA 99.9% + Account manager',
        'Onboarding + อบรมเต็มทีม',
      ],
      budget: '💰 งบโครงการพิเศษ · งบลงทุน',
    },
  ];
  return (
    <Slide num={16}>
      <Eyebrow accent>แผนราคา · 3 ระดับ</Eyebrow>
      <Title>เลือกขนาดที่เหมาะกับ อปท. ของท่าน</Title>
      <Lead style={{ marginTop: 10, maxWidth: 1040 }}>
        ราคาเป็น "บาท/เดือน" — ไม่มีค่าติดตั้งซ่อน · ยกเลิกได้ทุกเมื่อ · onboarding 30 วันรวมในแพ็กเกจ
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 14, flex: 1 }}>
        {tiers.map((m, i) => (
          <div key={i} style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderRadius: 20, padding: '22px 22px 18px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <span style={{ position: 'absolute', top: 0, right: 0, background: m.tagBg, color: '#FFF', fontSize: 12, fontWeight: 700, padding: '5px 14px', borderBottomLeftRadius: 14 }}>{m.tag}</span>
            <h3 style={{ fontSize: 19, fontWeight: 800, color: C.primaryDeep, marginBottom: 4, lineHeight: 1.25, whiteSpace: 'pre-line' }}>{m.title}</h3>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: C.textMuted, marginBottom: 10, display: 'block' }}>{m.who}</span>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>เริ่มต้น</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: C.primary, lineHeight: 1.1 }}>฿ {m.price}</div>
            <div style={{ fontSize: 11.5, color: C.textMuted, marginBottom: 10 }}>บาท / เดือน</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {m.items.map((it, j) => (
                <li key={j} style={{ fontSize: 13, color: C.text, lineHeight: 1.5, padding: '3px 0 3px 18px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.success, fontWeight: 800 }}>✓</span>
                  {it}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 'auto', paddingTop: 12, fontSize: 12, fontWeight: 600, color: C.primary, borderTop: `1px dashed ${C.surfaceSoft}` }}>{m.budget}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11.5, color: C.textMuted, fontStyle: 'italic', marginTop: 8 }}>
        ราคาเป็นแนวทางเบื้องต้น · ส่วนลด อปท. ขนาดเล็กที่เริ่มต้นพร้อมกัน · ทีมงานยินดีปรับ scope ตามงบที่ท่านมี
      </p>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 17 — 30-day Onboarding
// ===========================================================================

function Slide17() {
  const phases = [
    { n: '1-7', t: 'Setup & นำเข้าข้อมูล', d: 'นำเข้าข้อมูลครัวเรือน · ตั้งชื่อหน่วยงาน · โลโก้ · สีสติ๊กเกอร์ปีงบ · ตั้งอัตรา 3 tier (60/20/10 ฿) ตามกฎกระทรวง 2567', ic: '⚙️' },
    { n: '8-14', t: 'ฝึกอบรม Officer + Driver', d: 'กองคลัง ½ วัน · พนักงานเก็บขยะ ½ วัน (รวมวิธีสุ่มตรวจ) · มีคู่มือไทย + วิดีโอย้อนหลัง', ic: '🎓' },
    { n: '15-30', t: 'Pilot รอบแรก', d: 'ออกบิลรอบแรก · รับชำระจริง · เก็บขยะผ่าน Driver App · ทีมเราคุมหลังบ้าน 24 ชม.', ic: '🚀' },
    { n: '31+', t: 'เต็มรูปแบบ + ดูแลต่อเนื่อง', d: 'Dunning อัตโนมัติ · ขยายไป Meter OCR / ภาษีป้าย · Account manager รายเดือน', ic: '🛠️' },
  ];
  return (
    <Slide num={17}>
      <Eyebrow>30 วัน เริ่มใช้งานได้</Eyebrow>
      <Title size={36}>ไม่ใช่แค่ติดตั้ง — เราอยู่จนระบบนิ่ง</Title>
      <Lead style={{ marginTop: 12, maxWidth: 1040 }}>
        จากวันแรกที่เซ็นสัญญา ถึงวันที่ออกบิลรอบแรก — ทีมเราเดินคู่ทุกขั้น ไม่ทิ้งให้ จนท. งงคนเดียว
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginTop: 20, flex: 1, alignItems: 'stretch' }}>
        {phases.map((p, i) => (
          <Card key={i} style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'absolute', top: -12, left: 16, background: C.primary, color: '#FFF', fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 100, letterSpacing: 1 }}>วันที่ {p.n}</div>
            <CardIcon>{p.ic}</CardIcon>
            <CardTitle style={{ fontSize: 18 }}>{p.t}</CardTitle>
            <CardBody style={{ fontSize: 13.5 }}>{p.d}</CardBody>
          </Card>
        ))}
      </div>
      <div style={{ background: C.primarySoft, borderRadius: 14, padding: '14px 18px', marginTop: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ fontSize: 28 }}>📞</div>
        <div style={{ fontSize: 14, color: C.primaryDeep, lineHeight: 1.5 }}>
          <strong>ผู้ดูแลคนเดียว ตลอดสัญญา</strong> — Account manager ประจำ อปท. ไม่ใช่ call center เปลี่ยนคน
        </div>
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 18 — Benefit summary
// ===========================================================================

function Slide18() {
  const benefits = [
    { ic: '💸', t: 'ลดค่าทิ้งขยะของเทศบาล', d: 'บ้านคัดแยก/หมักปุ๋ยมากขึ้น → ขยะเปียกลด → ค่ารถขน+ค่ากำจัด/ตันลด · ส่วนลดที่ให้ลูกบ้าน คุ้มกับค่าทิ้งที่ประหยัด' },
    { ic: '📈', t: 'รายได้ค่าขยะเก็บได้ ≥ 20%', d: 'จากอัตราชำระตรงเวลาดีขึ้น (จ่ายผ่านแอป ไม่ลืม ไม่ค้าง) · ลดต้นทุนเจ้าหน้าที่ออกเก็บ' },
    { ic: '📊', t: 'รายงานพร้อมตอบสภาฯ ทุกวัน', d: 'ตัวเลขรายได้ · อัตราชำระ · % บ้านในโครงการคัดแยก · ผลสุ่มตรวจ — Export 1 คลิก' },
    { ic: '🏆', t: 'ภาพลักษณ์ อปท. ทันสมัย', d: 'ใช้ผลโครงการต่อยอดสมัครรางวัล อปท. ดีเด่นด้านดิจิทัล/สิ่งแวดล้อม' },
  ];
  return (
    <Slide num={18} dark>
      <Eyebrow dark>สิ่งที่ท่านได้</Eyebrow>
      <Title dark size={38}>ผลที่ท่านนำไปตอบสภาฯ ได้</Title>
      <Lead dark style={{ marginTop: 12, maxWidth: 1020 }}>
        ไม่ใช่แค่ "ระบบใหม่" — แต่เป็นผลงานที่วัดได้ทั้ง 2 ทาง: รายได้เพิ่ม + ค่าใช้จ่ายลด
      </Lead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 22, flex: 1, alignContent: 'center' }}>
        {benefits.map((b, i) => (
          <Card key={i} dark style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 34, lineHeight: 1, flexShrink: 0 }}>{b.ic}</div>
            <div>
              <CardTitle dark style={{ fontSize: 19, marginBottom: 4 }}>{b.t}</CardTitle>
              <CardBody dark style={{ fontSize: 14 }}>{b.d}</CardBody>
            </div>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

// ===========================================================================
// SLIDE 19 — Close · 3 questions
// ===========================================================================

function Slide19() {
  return (
    <Slide num={19} dark>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Eyebrow dark>ขั้นต่อไป</Eyebrow>
        <Title dark size={44}>
          ขอเวลาท่านสักครู่<br />คุยเรื่อง อปท. ของท่าน
        </Title>
        <Lead dark style={{ marginTop: 20, maxWidth: 940 }}>
          ท่านไม่ต้องตัดสินใจวันนี้ — เราอยากฟังก่อนว่า อปท. ของท่านเก็บค่าขยะอยู่อย่างไร เจ็บปวดตรงไหน
          และมีโครงการคัดแยกอยู่แล้วหรือยัง · จากนั้นเราจะเสนอแบบที่เหมาะกับขนาด งบประมาณ และความพร้อมจริง
        </Lead>
        <div style={{ marginTop: 30, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 18, padding: '24px 28px', maxWidth: 1000 }}>
          <h3 style={{ color: '#FFF', fontSize: 20, fontWeight: 700, marginBottom: 14 }}>3 คำถามที่อยากฟังจากท่าน</h3>
          <p style={{ color: 'rgba(255,255,255,.9)', fontSize: 17, lineHeight: 1.9 }}>
            1. อปท. ของท่านเก็บค่าขยะอยู่กี่ครัวเรือน · อัตราค้างชำระประมาณเท่าไหร่?<br />
            2. ค่าทิ้งขยะต่อตันของท่าน ปัจจุบันแพงแค่ไหน · มีโครงการคัดแยกอยู่หรือยัง?<br />
            3. ถ้าจะเริ่ม pilot — งบประมาณที่ใช้ได้คือก้อนไหน (สารสนเทศ · ดำเนินงาน · โครงการ)?
          </p>
        </div>
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// Toolbar (jump-to-slide + print)
// ---------------------------------------------------------------------------

function Toolbar() {
  const [open, setOpen] = useState(false);
  const titles = [
    '1 · 🚨 Pain · ค่าถูก · จ่ายไม่สะดวก · ค้าง 25-40%',
    '2 · 🚨 Pain · 4 เรื่องทำให้เก็บไม่ขึ้น',
    '3 · 🚨 Pain · ลูกบ้านอยากจ่ายง่าย · เทศบาลอยากลดค่าทิ้ง',
    '4 · ✨ Solution · 1 platform 3 apps',
    '5 · ⚖️ Regulation · กฎกระทรวง 2567 · 60→20→10 ฿ (กทม. precedent)',
    '6 · 📱 Demo · R-02 Dashboard + R-04 Bill QR',
    '7 · 📱 Demo · R-06 Receipt + R-08 Sticker',
    '8 · 📱 Demo · R-09 Schedule + R-11 Issue',
    '9 · 🖥️ Demo · O-01 KPI Dashboard',
    '10 · 🖥️ Demo · O-02 Households + O-04 Generate',
    '11 · 🖥️ Demo · O-06 รับชำระ (< 1 นาที)',
    '12 · 🖥️ Demo · O-07 Receipt + O-08 Arrears',
    '13 · 🚛 Demo · Driver App · tier + สุ่มตรวจ',
    '14 · 🛡️ Trust · PDPA + Zero-Knowledge + Audit',
    '15 · 🩺 Benefit · ก่อน vs หลัง (7 เรื่อง)',
    '16 · 💵 Plans · Starter / Pro / Enterprise',
    '17 · 🛠️ Support · 30 วัน · onboarding',
    '18 · 🏛️ Outcome · ลดค่าทิ้ง + เก็บได้เพิ่ม',
    '19 · 🤝 Close · 3 คำถาม + ขั้นต่อไป',
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
        <div style={{ position: 'absolute', top: 44, right: 16, background: '#FFF', color: C.text, borderRadius: 8, boxShadow: '0 10px 30px rgba(0,0,0,.2)', padding: 8, maxHeight: 'calc(100vh - 110px)', overflowY: 'auto', minWidth: 360, zIndex: 1100 }}>
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
// ScrollDots
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
    <div className="scroll-dots" style={{ position: 'fixed', right: 14, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 8, zIndex: 999, background: 'rgba(0,0,0,0.35)', padding: '12px 8px', borderRadius: 100, backdropFilter: 'blur(8px)' }}>
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
            style={{ display: 'block', width: isActive ? 12 : 8, height: isActive ? 12 : 8, padding: 0, borderRadius: '50%', background: isActive ? '#FFF' : 'rgba(255,255,255,0.45)', border: isActive ? `2px solid ${C.primaryHover}` : '1px solid rgba(255,255,255,0.6)', transition: 'all .2s ease', cursor: 'pointer' }}
          />
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function WasteCollectionFee() {
  const slides = [Slide01, Slide02, Slide03, Slide04, Slide05, Slide06, Slide07, Slide08, Slide09, Slide10, Slide11, Slide12, Slide13, Slide14, Slide15, Slide16, Slide17, Slide18, Slide19];
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
