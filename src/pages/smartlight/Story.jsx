import React, { useEffect, useState } from 'react';
import StoryDeck from '../../components/StoryDeck';

// ชื่อสไลด์สำหรับเมนู "ไปสไลด์…" + จุดไข่ปลา (เรียงตรงกับ <section> ในหน้า)
const SL_SLIDES = [
  { k: 'pain',     t: 'ปัญหา · ไฟถนนเสีย-ค่าไฟบาน รู้ช้า' },
  { k: 'win',      t: 'ทำไมสำคัญ · 3 ฝ่ายได้อะไร' },
  { k: 'demo',     t: 'เห็นระบบจริง · เปิดดูได้ใน 30 วินาที' },
  { k: 'solution', t: 'ภาพรวมวิธีแก้ · เข้าใจระบบใน 3 ข้อ' },
  { k: 'how',      t: 'ทำงานอย่างไร' },
  { k: 'divider',  t: 'ฮาร์ดแวร์ของเรา' },
  { k: 'device',   t: 'ฮาร์ดแวร์ · อธิบายแบบเข้าใจง่าย' },
  { k: 'device',   t: '2 โหมดติดตั้ง · เลือกตามงบ/ระบบเดิม' },
  { k: 'package',  t: 'เริ่มต้นได้อะไรบ้าง (แพ็กเกจ)' },
  { k: 'cta',      t: 'ขั้นต่อไป · เริ่มอย่างไร' },
  { k: 'appendix', t: 'ภาคผนวก' },
  { k: 'appendix', t: 'ภาคผนวก A · สถาปัตยกรรมระบบ' },
];

// ---------------------------------------------------------------------------
// SmartLight/Story.jsx — หน้า Smart Street Light แบบ storytelling เส้นเดียว
// (scroll ต่อกัน · ไม่ใช่ deck เด้งทีละสไลด์) · source: smartlight-prototype.html
// Design: Civic Trust palette (Forest #0F6E56 + Cream #FAF7EE + Amber #BA7517) + Sarabun
// NOTE: ตัด speaker hint / โน้ตภายในออกทั้งหมด — ไม่ render ขึ้นหน้าเว็บ
// ---------------------------------------------------------------------------

const BASE = import.meta.env.BASE_URL;
const SL = `${BASE}images/smartlight`;

// ---------------------------------------------------------------------------
// Demo modal — เปิดระบบจริงจาก public/ui/smartlight-demo/*.html (7 หน้า + tabs)
// ---------------------------------------------------------------------------

const DEMO_TABS = [
  { id: 'dashboard', label: '📊 ภาพรวมระบบ', file: 'dashboard.html' },
  { id: 'maps', label: '🗺️ แผนที่อุปกรณ์', file: 'maps.html' },
  { id: 'faults', label: '🔧 แจ้งซ่อม/ปัญหา', file: 'faults.html' },
  { id: 'energy', label: '⚡ พลังงาน', file: 'energy.html' },
  { id: 'remote_control', label: '🎛️ สั่งงานระยะไกล', file: 'remote_control.html' },
  { id: 'zones', label: '📍 โซน', file: 'zones.html' },
  { id: 'device', label: '💡 รายการโคม', file: 'device.html' },
];

function DemoModal({ onClose, initialTab = 'dashboard' }) {
  const [tab, setTab] = useState(initialTab);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const active = DEMO_TABS.find((t) => t.id === tab) || DEMO_TABS[0];

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(11,85,68,0.55)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(12px, 3vw, 36px)', animation: 'slFade .2s ease',
      }}
    >
      <style>{`@keyframes slFade{from{opacity:0}to{opacity:1}}`}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(1320px, 100%)', height: 'min(820px, 100%)',
          background: '#FFF', borderRadius: 16, overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column',
        }}
      >
        <div style={{ flexShrink: 0, height: 50, background: 'var(--sl-primary-deep)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14.5, fontWeight: 700 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#9FE3C0' }} />
            ตัวอย่างระบบจริง — ศูนย์ควบคุมไฟถนน (กดเมนูด้านบนเพื่อดูแต่ละหน้า)
          </div>
          <button
            onClick={onClose}
            aria-label="ปิด"
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.16)', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 14px', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}
          >
            ✕ ปิด · กลับสู่การนำเสนอ
          </button>
        </div>
        <div style={{ flexShrink: 0, display: 'flex', gap: 4, padding: '8px 12px', background: 'var(--sl-surface-soft)', overflowX: 'auto' }}>
          {DEMO_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                whiteSpace: 'nowrap', flexShrink: 0, border: 'none', cursor: 'pointer',
                borderRadius: 8, padding: '8px 14px', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600,
                background: tab === t.id ? 'var(--sl-primary)' : '#FFF',
                color: tab === t.id ? '#FFF' : 'var(--sl-text)',
                boxShadow: tab === t.id ? '0 2px 6px rgba(15,110,86,0.3)' : 'none',
                transition: 'background .15s ease',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <iframe
          key={active.id}
          src={`${BASE}ui/smartlight-demo/${active.file}`}
          title={`ศูนย์ควบคุมไฟถนน — ${active.label}`}
          style={{ flex: 1, width: '100%', border: 'none', display: 'block', background: '#F4F6FB' }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Scoped stylesheet — ถอดจาก prototype (ตัด .hint / .imgprompt ออก)
// ---------------------------------------------------------------------------

function StoryStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700;800&display=swap');

      .sl-story{
        --sl-primary:#0F6E56; --sl-primary-hover:#1D9E75; --sl-primary-deep:#0B5544; --sl-primary-soft:#E5F0EA;
        --sl-accent:#BA7517; --sl-accent-soft:#FAEEDA; --sl-alert:#A32D2D; --sl-alert-soft:#FCEBEB;
        --sl-success:#3B6D11; --sl-success-soft:#EAF3DD;
        --sl-cream:#FAF7EE; --sl-surface:#FFFFFF; --sl-surface-soft:#EFE9DA;
        --sl-text:#2A2A26; --sl-text-muted:#6B6B63; --sl-line:#E4DECF; --sl-maxw:1080px;
        font-family:'Sarabun',sans-serif; color:var(--sl-text); background:var(--sl-cream);
        line-height:1.6; -webkit-font-smoothing:antialiased;
      }
      .sl-story img{display:block;max-width:100%}
      .sl-story .wrap{max-width:var(--sl-maxw);margin:0 auto;padding:0 24px}

      .sl-story .progress{position:fixed;top:48px;left:0;height:4px;background:var(--sl-primary);width:0;z-index:60;transition:width .1s linear}

      .sl-story section{padding:84px 0;border-bottom:1px solid var(--sl-line);position:relative}
      .sl-story section.dark{background:linear-gradient(135deg,var(--sl-primary-deep),var(--sl-primary));color:#fff;border-bottom:none}
      .sl-story .eyebrow{display:inline-block;font-size:14px;font-weight:700;letter-spacing:.5px;color:var(--sl-primary);
        background:var(--sl-primary-soft);padding:6px 16px;border-radius:100px;margin-bottom:18px}
      .sl-story .eyebrow.alert{color:var(--sl-alert);background:var(--sl-alert-soft)}
      .sl-story .eyebrow.accent{color:var(--sl-accent);background:var(--sl-accent-soft)}
      .sl-story .dark .eyebrow{color:#fff;background:rgba(255,255,255,.16)}
      .sl-story h1{font-size:clamp(30px,5vw,52px);font-weight:800;line-height:1.18;letter-spacing:-.5px;color:var(--sl-primary-deep)}
      .sl-story .dark h1,.sl-story .dark h2{color:#fff}
      .sl-story h2{font-size:clamp(26px,4vw,40px);font-weight:800;line-height:1.22;letter-spacing:-.4px;color:var(--sl-primary-deep)}
      .sl-story .lead{font-size:clamp(17px,2vw,20px);color:var(--sl-text-muted);max-width:780px;margin-top:16px}
      .sl-story .dark .lead{color:rgba(255,255,255,.9)}
      .sl-story .stepno{font-size:13px;font-weight:700;color:var(--sl-accent);letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;display:block}

      .sl-story .grid{display:grid;gap:18px;margin-top:34px}
      .sl-story .g3{grid-template-columns:repeat(3,1fr)}
      .sl-story .g4{grid-template-columns:repeat(4,1fr)}
      @media(max-width:860px){.sl-story .g3,.sl-story .g4{grid-template-columns:1fr 1fr}}
      @media(max-width:560px){.sl-story .g3,.sl-story .g4{grid-template-columns:1fr}}
      .sl-story .card{background:#fff;border:1px solid var(--sl-line);border-radius:18px;padding:24px;box-shadow:0 4px 18px rgba(15,110,86,.05)}
      .sl-story .card .ic{font-size:34px;line-height:1;margin-bottom:12px}
      .sl-story .card h3{font-size:18px;font-weight:800;color:var(--sl-primary-deep);margin-bottom:7px;line-height:1.3}
      .sl-story .card p{font-size:14.5px;color:var(--sl-text-muted);line-height:1.55}
      .sl-story .card.hi{border:2px solid var(--sl-primary)}

      .sl-story .who{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:34px}
      @media(max-width:860px){.sl-story .who{grid-template-columns:1fr}}
      .sl-story .who .card{position:relative;overflow:hidden}
      .sl-story .who .tag{display:inline-block;font-size:13px;font-weight:700;color:#fff;background:var(--sl-primary);
        padding:4px 14px;border-radius:100px;margin-bottom:12px}
      .sl-story .who .tag.b{background:var(--sl-accent)} .sl-story .who .tag.c{background:#4A7C59}
      .sl-story .who ul{list-style:none;margin-top:6px}
      .sl-story .who li{font-size:14px;color:var(--sl-text);padding:5px 0 5px 24px;position:relative;line-height:1.5}
      .sl-story .who li::before{content:'✓';position:absolute;left:0;color:var(--sl-success);font-weight:800}

      .sl-story .flow{display:flex;align-items:stretch;gap:0;margin-top:34px;flex-wrap:wrap}
      .sl-story .flow .step{flex:1;min-width:150px;background:#fff;border:1.5px solid var(--sl-primary);border-radius:16px;
        padding:18px 14px;text-align:center;position:relative}
      .sl-story .flow .step.hi{border:3px solid var(--sl-accent);background:var(--sl-accent-soft)}
      .sl-story .flow .step .fic{font-size:30px;margin-bottom:8px}
      .sl-story .flow .step b{display:block;font-size:16px;color:var(--sl-primary-deep);margin-bottom:4px}
      .sl-story .flow .step span{font-size:12.5px;color:var(--sl-text-muted)}
      .sl-story .flow .arr{display:flex;align-items:center;justify-content:center;color:var(--sl-primary);font-size:24px;font-weight:800;padding:0 6px}
      @media(max-width:680px){.sl-story .flow .arr{transform:rotate(90deg);width:100%;padding:4px 0}}

      .sl-story .media{margin-top:30px;background:#fff;border:1px solid var(--sl-line);border-radius:20px;padding:14px;
        display:flex;align-items:center;justify-content:center}
      .sl-story .media img{width:100%;height:auto;border-radius:12px;object-fit:contain}
      .sl-story .split{display:grid;grid-template-columns:1.05fr .95fr;gap:26px;align-items:center;margin-top:34px}
      @media(max-width:860px){.sl-story .split{grid-template-columns:1fr}}
      .sl-story .feat{background:#fff;border:1px solid var(--sl-line);border-radius:12px;padding:12px 16px;display:flex;gap:13px;align-items:flex-start;margin-bottom:11px}
      .sl-story .feat .fi{font-size:23px;flex-shrink:0;line-height:1}
      .sl-story .feat b{font-size:15px;color:var(--sl-text)} .sl-story .feat p{font-size:13px;color:var(--sl-text-muted);margin-top:2px}

      .sl-story .demobar{margin-top:34px;background:var(--sl-primary-deep);border-radius:20px;padding:30px 32px;color:#fff;
        display:flex;align-items:center;gap:24px;flex-wrap:wrap}
      .sl-story .demobar .txt{flex:1;min-width:240px}
      .sl-story .demobar h3{font-size:22px;font-weight:800;margin-bottom:6px}
      .sl-story .demobar p{font-size:15px;color:rgba(255,255,255,.85)}
      .sl-story .btn{display:inline-flex;align-items:center;gap:10px;background:var(--sl-accent);color:#fff;border:none;cursor:pointer;
        font-family:inherit;font-size:17px;font-weight:700;padding:15px 30px;border-radius:14px;transition:.2s;text-decoration:none}
      .sl-story .btn:hover{background:#9c6113;transform:translateY(-2px)}
      .sl-story .btn.ghost{background:transparent;border:2px solid #fff}
      .sl-story .btn.ghost:hover{background:rgba(255,255,255,.12)}
      .sl-story .demochips{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
      .sl-story .demochips button{background:rgba(255,255,255,.14);color:#fff;border:1px solid rgba(255,255,255,.25);cursor:pointer;
        font-family:inherit;font-size:13.5px;font-weight:600;padding:8px 16px;border-radius:100px;transition:.15s}
      .sl-story .demochips button:hover{background:var(--sl-accent);border-color:var(--sl-accent)}

      .sl-story .pkg{background:#fff;border:2px solid var(--sl-primary);border-radius:20px;padding:30px;margin-top:34px}
      .sl-story .pkg .hd{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:8px}
      .sl-story .pkg table{width:100%;border-collapse:collapse;margin-top:10px}
      .sl-story .pkg th,.sl-story .pkg td{text-align:left;padding:12px 10px;border-bottom:1px dashed var(--sl-line);font-size:15px;vertical-align:top}
      .sl-story .pkg th{font-size:13px;color:var(--sl-text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.5px}
      .sl-story .pkg td.qty{text-align:center;font-weight:800;color:var(--sl-primary-deep);white-space:nowrap}
      .sl-story .pkg td.it b{color:var(--sl-primary-deep)}
      .sl-story .pkg td.it span{display:block;font-size:13px;color:var(--sl-text-muted);margin-top:2px}
      .sl-story .pkg .next{margin-top:18px;background:var(--sl-accent-soft);border-radius:12px;padding:16px 18px}
      .sl-story .pkg .next b{color:var(--sl-accent)}
      .sl-story .pkg .next ul{margin:8px 0 0 0;list-style:none}
      .sl-story .pkg .next li{font-size:14px;padding:4px 0 4px 22px;position:relative;color:var(--sl-text)}
      .sl-story .pkg .next li::before{content:'＋';position:absolute;left:0;color:var(--sl-accent);font-weight:800}
      .sl-story .pill{display:inline-block;background:var(--sl-success-soft);color:var(--sl-success);font-weight:700;font-size:15px;
        padding:8px 18px;border-radius:100px;margin-top:18px}

      .sl-story .foot{font-size:12.5px;color:var(--sl-text-muted);font-style:italic;margin-top:20px}
      .sl-story .dark .foot{color:rgba(255,255,255,.7)}

      .sl-story .divider{background:var(--sl-primary-deep);text-align:center;padding:70px 0;border-bottom:none}
      .sl-story .divider .num{font-size:15px;font-weight:700;letter-spacing:3px;color:var(--sl-accent);text-transform:uppercase}
      .sl-story .divider h2{color:#fff;margin-top:10px;font-size:clamp(30px,5vw,46px)}
      .sl-story .divider p{color:rgba(255,255,255,.82);font-size:17px;margin-top:12px;max-width:680px;margin-left:auto;margin-right:auto}
      .sl-story .divider.appendix{background:#2A2A26}

      .sl-story .tag-line{font-size:13px;font-weight:700;color:var(--sl-primary);background:var(--sl-primary-soft);
        display:inline-block;padding:4px 12px;border-radius:100px;margin-bottom:10px}
      .sl-story .twocol{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:24px}
      @media(max-width:760px){.sl-story .twocol{grid-template-columns:1fr}}
      .sl-story .twocol .bx{border-radius:16px;padding:20px 22px}
      .sl-story .twocol .a{background:var(--sl-primary-soft);border:1.5px solid var(--sl-primary)}
      .sl-story .twocol .b{background:var(--sl-accent-soft);border:1.5px solid var(--sl-accent)}
      .sl-story .twocol h4{font-size:17px;font-weight:800;margin-bottom:6px;color:var(--sl-primary-deep)}
      .sl-story .twocol p{font-size:14px;color:var(--sl-text);line-height:1.55}
      .sl-story .gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:24px}
      @media(max-width:680px){.sl-story .gallery{grid-template-columns:1fr 1fr}}
      .sl-story .gallery img{width:100%;height:200px;object-fit:cover;border-radius:14px;border:1px solid var(--sl-line)}
    `}</style>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SmartLightStory() {
  const [demo, setDemo] = useState(null); // null | tabId
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const sh = h.scrollHeight - h.clientHeight;
      setProgress(sh > 0 ? (h.scrollTop / sh) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openDemo = (tab = 'dashboard') => setDemo(tab);

  return (
    <div className="sl-story">
      <StoryStyles />
      <StoryDeck rootClass="sl-story" titles={SL_SLIDES} />
      <div className="progress" style={{ width: `${progress}%` }} />
      {demo && <DemoModal initialTab={demo} onClose={() => setDemo(null)} />}

      {/* ============ HERO / HOOK ============ */}
      <section className="dark" style={{ paddingTop: 70, paddingBottom: 78 }}>
        <div className="wrap">
          <span className="eyebrow">เริ่มจากเรื่องที่เราได้ยินมาจากหน้างาน</span>
          <h1>
            "ไฟถนนดับเป็นเดือน...<br />
            กว่าเทศบาลจะรู้ ก็ตอนประชาชนร้องเรียนมาแล้ว"
          </h1>
          <p className="lead">
            เราคุยกับกองช่างหลายเทศบาล แล้วเจอเรื่องเดียวกัน — ไม่มีใครรู้ว่าโคมไหนเสีย จนกว่าจะมีคนโทรมาบ่น
            ช่างต้องขับรถตระเวนหาทีละต้น มุมมืดกลายเป็นจุดเสี่ยง และค่าไฟก็จ่ายเต็มทุกเดือนแม้ตอนตี 3 ไม่มีใครสัญจร
            วันนี้เราอยากเล่าว่า ไฟถนนทั้งเขต "รู้ก่อน ซ่อมทัน ประหยัดทุกคืน" ได้ และเริ่มต้นในงบที่ท่านมี
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button className="btn" onClick={() => openDemo('dashboard')}>ดูระบบจริงเลย (กดเล่นได้) →</button>
          </div>
        </div>
      </section>

      {/* ============ องก์ 1 — 3 ฝ่ายได้อะไร ============ */}
      <section style={{ background: 'var(--sl-cream)' }}>
        <div className="wrap">
          <span className="stepno">องก์ 1 · ทำไมเรื่องนี้ถึงสำคัญกับเทศบาลของท่าน</span>
          <h2>ไฟถนนที่ "รู้ตัวเอง" = ทุกฝ่ายในเขตได้ประโยชน์</h2>
          <p className="lead">ไม่ใช่แค่ไฟติด แต่ช่วยให้คนของท่านทำงานเบาลง ค่าไฟลดลง และประชาชนรู้สึกปลอดภัยขึ้น</p>
          <div className="who">
            <div className="card">
              <span className="tag">ผู้บริหารท้องถิ่น</span>
              <h3>ทำงานเชิงรุก บริหารพลังงานเป็น</h3>
              <ul>
                <li>ป้องกันปัญหาก่อนเกิด — รู้ว่าโคมไหนใกล้เสีย ดูแลก่อนดับ</li>
                <li>มีข้อมูลช่วยบริหารการใช้พลังงานทั้งเขต ลดค่าไฟอย่างมีหลักการ</li>
                <li>งบ-พลังงานที่ประหยัดได้ นำไปขยายไฟส่องสว่างให้ชุมชนที่ยังขาด</li>
              </ul>
            </div>
            <div className="card">
              <span className="tag c">ช่างไฟ / กองช่าง</span>
              <h3>ไม่ต้องตระเวนหาโคมเสียอีกต่อไป</h3>
              <ul>
                <li>ระบบบอกเลยว่าโคมไหนเสีย อยู่ตรงไหน ก่อนออกจากออฟฟิศ</li>
                <li>ออกซ่อมตรงจุด ประหยัดน้ำมัน เวลา และแรง</li>
                <li>งานแจ้งซ่อมเข้าระบบ ไม่ตกหล่น ติดตามได้</li>
              </ul>
            </div>
            <div className="card">
              <span className="tag b">ประชาชน</span>
              <h3>ถนนสว่าง ปลอดภัย ไม่มีมุมมืด</h3>
              <ul>
                <li>โคมเสียถูกซ่อมไว ไม่ต้องรอเป็นเดือน</li>
                <li>ทางเดิน-ทางสัญจรกลางคืนปลอดภัยขึ้น ลดจุดเสี่ยง</li>
                <li>ชุมชนที่เคยมืด ได้ไฟส่องสว่างเพิ่มจากงบที่ประหยัดได้</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 30, background: 'var(--sl-primary-deep)', color: '#fff', borderRadius: 18, padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 40, lineHeight: 1, flexShrink: 0 }}>📊</div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10, color: '#fff' }}>"บริหารเป็น" คือบริหารอะไรบ้าง</h3>
                <div className="grid g3" style={{ marginTop: 0, gap: 14 }}>
                  <div style={{ background: 'rgba(255,255,255,.1)', borderRadius: 12, padding: '14px 16px', fontSize: 14 }}><b style={{ color: '#FFE3AE' }}>บริหารพลังงาน</b><br />หรี่ไฟตามช่วงเวลา ลดค่าไฟทุกเดือน เห็นว่าเขตไหนกินไฟผิดปกติ</div>
                  <div style={{ background: 'rgba(255,255,255,.1)', borderRadius: 12, padding: '14px 16px', fontSize: 14 }}><b style={{ color: '#FFE3AE' }}>บริหารงานซ่อม</b><br />รู้ก่อนว่าโคมไหนใกล้เสีย วางแผนซ่อมล่วงหน้า ใช้ช่าง-รถคุ้มค่า</div>
                  <div style={{ background: 'rgba(255,255,255,.1)', borderRadius: 12, padding: '14px 16px', fontSize: 14 }}><b style={{ color: '#FFE3AE' }}>บริหารงบ-ขยายเขต</b><br />งบ/พลังงานที่ประหยัดได้ นำไปขยายไฟส่องสว่างให้พื้นที่ที่ยังขาด</div>
                </div>
                <p style={{ fontSize: 14.5, color: '#FFE3AE', fontWeight: 600, marginTop: 14 }}>
                  👉 ไม่ใช่แค่ "ซ่อมไฟ" — แต่คือนายกที่ใช้ข้อมูลบริหารทรัพยากรของเขตอย่างคุ้มค่า
                </p>
              </div>
            </div>
          </div>
          <p className="foot">ไฟฟ้าสาธารณะ/ไฟส่องสว่างเป็นอำนาจหน้าที่ของ อปท. (มีคู่มือมาตรฐานไฟฟ้าสาธารณะ โดยกรมส่งเสริมการปกครองท้องถิ่น มหาดไทย)</p>
        </div>
      </section>

      {/* ============ องก์ 2 — DEMO ก่อน ============ */}
      <section className="dark">
        <div className="wrap">
          <span className="eyebrow">เห็นของจริงก่อน เดี๋ยวค่อยลงรายละเอียด</span>
          <h2>หน้าจอศูนย์ควบคุมไฟถนน — เปิดดูได้เลย</h2>
          <p className="lead">นี่คือระบบจริงที่เจ้าหน้าที่ใช้ — เห็นทุกโคมบนแผนที่ · รู้ว่าดวงไหนเสีย · สั่งหรี่/เปิด-ปิดได้จากศูนย์</p>
          <div className="demobar">
            <div className="txt">
              <h3>🖥️ ตัวอย่างระบบศูนย์ควบคุม</h3>
              <p>กดเลือกหน้าจอที่อยากดู — ภาพรวมระบบ · แผนที่อุปกรณ์ · แจ้งซ่อม · พลังงาน · สั่งงานระยะไกล</p>
              <div className="demochips">
                <button onClick={() => openDemo('dashboard')}>📊 ภาพรวมระบบ</button>
                <button onClick={() => openDemo('maps')}>🗺️ แผนที่อุปกรณ์</button>
                <button onClick={() => openDemo('faults')}>🔧 แจ้งซ่อม</button>
                <button onClick={() => openDemo('energy')}>⚡ พลังงาน</button>
                <button onClick={() => openDemo('remote_control')}>🎛️ สั่งงานระยะไกล</button>
              </div>
            </div>
            <button className="btn" onClick={() => openDemo('dashboard')}>▶ เปิดระบบจริง</button>
          </div>
        </div>
      </section>

      {/* ============ องก์ 3 — ภาพรวม 3 ข้อ ============ */}
      <section>
        <div className="wrap">
          <span className="stepno">องก์ 3 · สรุปสั้น ๆ ระบบนี้คืออะไร</span>
          <h2>เข้าใจทั้งระบบใน 3 ข้อ — ไฟถนนที่ "รู้ตัวเอง"</h2>
          <p className="lead">เราไม่ได้ขายแค่ "โคมไฟ" — เราขาย "ระบบที่ทำให้ไฟถนนทั้งเขตบอกสถานะตัวเองได้"</p>
          <div className="grid g3">
            <div className="card hi"><div className="ic">📡</div><h3>1 · รู้ก่อน — ทุกโคมรายงานสถานะเอง</h3>
              <p>อุปกรณ์บนทุกเสาวัดกระแส-แรงดัน-สถานะตลอด 24 ชม. โคมเสียปุ๊บ ระบบรู้ทันที ไม่ต้องรอประชาชนแจ้ง</p></div>
            <div className="card hi"><div className="ic">🔧</div><h3>2 · ซ่อมทัน — ออกตรงจุด ไม่ต้องตระเวน</h3>
              <p>ระบบบอกพิกัดโคมที่เสีย ช่างออกซ่อมตรงจุด งานแจ้งซ่อมเข้าระบบ ไม่ตกหล่น ติดตามได้</p></div>
            <div className="card hi"><div className="ic">⚡</div><h3>3 · ประหยัดทุกคืน — หรี่ไฟตามเวลา</h3>
              <p>ช่วงดึกที่คนสัญจรน้อย ระบบหรี่ไฟอัตโนมัติตามที่ตั้งไว้ ลดค่าไฟทุกเดือน พร้อมรายงานให้ตอบสภาฯ</p></div>
          </div>
        </div>
      </section>

      {/* ============ องก์ 4 — flow ============ */}
      <section style={{ background: 'var(--sl-cream)' }}>
        <div className="wrap">
          <span className="stepno">องก์ 4 · ทำงานอย่างไร</span>
          <h2>จากโคมบนเสา ถึงหน้าจอเทศบาล — เส้นทางข้อมูล</h2>
          <p className="lead">ทำงานเองอัตโนมัติ ข้อมูลวิ่งเข้าศูนย์เดียว เจ้าหน้าที่เห็นภาพรวมทั้งเขต</p>
          <div className="flow">
            <div className="step"><div className="fic">💡</div><b>ที่หน้างาน</b><span>อุปกรณ์บนทุกโคม วัด W·V·A 24 ชม.</span></div>
            <div className="arr">→</div>
            <div className="step"><div className="fic">☁️</div><b>ที่ Cloud</b><span>รับสัญญาณ · ตรวจกฎ · สั่งหรี่/เปิด-ปิด</span></div>
            <div className="arr">→</div>
            <div className="step"><div className="fic">🖥️</div><b>ที่ศูนย์เทศบาล</b><span>เห็นไฟถนนทั้งเขตบนหน้าจอเดียว</span></div>
            <div className="arr">→</div>
            <div className="step hi"><div className="fic">🔧</div><b>ออกซ่อมตรงจุด</b><span>รู้พิกัดโคมเสีย · วางแผนซ่อม</span></div>
          </div>
          <div style={{ marginTop: 30, background: '#fff', border: '2px solid var(--sl-primary)', borderRadius: 16, padding: '22px 24px' }}>
            <b style={{ color: 'var(--sl-primary-deep)', fontSize: 16 }}>🩺 4 สัญญาณที่ระบบจับได้ ก่อนกลายเป็นเรื่องใหญ่</b>
            <div className="grid g4" style={{ marginTop: 14, gap: 12 }}>
              <div style={{ background: 'var(--sl-primary-soft)', borderRadius: 10, padding: '12px 14px', fontSize: 13.5 }}><b>โคมดับ</b><br />ไม่มีกระแสไฟ → แจ้งทันที</div>
              <div style={{ background: 'var(--sl-primary-soft)', borderRadius: 10, padding: '12px 14px', fontSize: 13.5 }}><b>ไฟกะพริบ/ผิดปกติ</b><br />ค่าผิดเพี้ยน → เฝ้าระวัง</div>
              <div style={{ background: 'var(--sl-primary-soft)', borderRadius: 10, padding: '12px 14px', fontSize: 13.5 }}><b>กินไฟเกินปกติ</b><br />สัญญาณโคมใกล้เสีย</div>
              <div style={{ background: 'var(--sl-primary-soft)', borderRadius: 10, padding: '12px 14px', fontSize: 13.5 }}><b>ตู้ควบคุมผิดปกติ</b><br />รู้ก่อนทั้งโซนดับ</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DIVIDER: ฮาร์ดแวร์ ============ */}
      <section className="divider">
        <div className="wrap">
          <div className="num">— ฮาร์ดแวร์ของเรา —</div>
          <h2>โคม LED + อุปกรณ์อัจฉริยะบนทุกเสา</h2>
          <p>โคมสว่างกว่า ประหยัดกว่า · มี Node สื่อสารบนทุกโคม ทำให้ไฟถนน "รู้ตัวเอง" ได้</p>
        </div>
      </section>

      {/* ============ องก์ 5 — ฮาร์ดแวร์ ============ */}
      <section>
        <div className="wrap">
          <span className="eyebrow accent">ฮาร์ดแวร์ · อธิบายแบบเข้าใจง่าย</span>
          <h2>โคมไฟที่สว่างกว่า ประหยัดกว่า และ "พูดได้"</h2>
          <div className="split">
            <div className="media" style={{ flexDirection: 'column', gap: 14 }}>
              <img src={`${SL}/Gemini_Generated_Image_ykong3ykong3ykon-removebg-preview.png`} alt="โคมไฟ LED อัจฉริยะ มี Node ควบคุมติดบนหัวโคม" />
              <img src={`${SL}/Gemini_Generated_Image_am4oo4am4oo4am4o.png`} alt="โคมไฟ LED ปรับมุมส่องได้ 90° เห็นแผง LED ประสิทธิภาพสูง" />
            </div>
            <div>
              <div className="feat"><div className="fi">💡</div><div><b>โคม LED ประสิทธิภาพสูง</b><p>ให้แสงสว่างกว่าโคมเดิม กินไฟน้อยกว่า อายุการใช้งานยาว ปรับมุมส่องได้</p></div></div>
              <div className="feat"><div className="fi">📡</div><div><b>Node สื่อสารบนทุกโคม</b><p>วัดสถานะไฟแต่ละดวงตลอดเวลา ส่งข้อมูลเข้าศูนย์ — นี่คือสิ่งที่ทำให้ "รู้ก่อน" ได้</p></div></div>
              <div className="feat"><div className="fi">🔌</div><div><b>เข้ากับเสา/ระบบเดิมได้</b><p>ใช้ซ็อกเก็ตมาตรฐาน ติดตั้งกับเสาที่มีอยู่ได้ ไม่ต้องรื้อทั้งระบบ</p></div></div>
              <div className="feat"><div className="fi">🎛️</div><div><b>สั่งหรี่/เปิด-ปิดจากศูนย์</b><p>ตั้งตารางหรี่ไฟตามช่วงเวลา หรือสั่งทีละโคม/ทั้งโซนจากหน้าจอ</p></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ องก์ 5b — 2 โหมดติดตั้ง ============ */}
      <section style={{ background: 'var(--sl-cream)' }}>
        <div className="wrap">
          <span className="eyebrow accent">เลือกได้ตามงบและระบบเดิม</span>
          <h2>เริ่มได้ 2 แบบ — ตามความพร้อมของพื้นที่</h2>
          <div className="twocol">
            <div className="bx a">
              <h4>① ควบคุมรายโคม (Full)</h4>
              <p>ติด Node ทุกดวง — เห็นสถานะและสั่งงานได้ทีละโคม ละเอียดที่สุด เหมาะกับพื้นที่ที่ต้องการข้อมูลครบ</p>
            </div>
            <div className="bx b">
              <h4>② ควบคุมรายโซน/ตู้ (ประหยัดเริ่มต้น)</h4>
              <p>คุมที่ตู้ควบคุม/โซน — อัปเกรดระบบเดิมได้เร็ว งบเริ่มต้นน้อยกว่า เห็นภาพรวมเป็นโซน เหมาะเริ่มนำร่อง</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ องก์ 7 — Package (ไม่มีราคา) ============ */}
      <section style={{ background: 'var(--sl-cream)' }}>
        <div className="wrap">
          <span className="stepno">องก์ 7 · "แล้วเริ่มต้นได้อะไรบ้าง?"</span>
          <h2>เริ่มต้นในงบที่ท่านมี — แล้วขยายทีละโซน ไม่ต้องรื้อ</h2>
          <p className="lead">ไม่ต้องเปลี่ยนทั้งเขตทีเดียว — เริ่มนำร่องโซนที่ปัญหาเยอะก่อน เห็นผลจริง แล้วค่อยขยาย</p>
          <div className="pkg">
            <div className="hd"><span className="tag-line">📦 ชุดเริ่มต้น (นำร่อง 1 โซน)</span></div>
            <table>
              <thead><tr><th style={{ width: '52%' }}>ในชุดเริ่มต้นมีอะไร</th><th style={{ width: '20%', textAlign: 'center' }}>จำนวน</th><th>ช่วยเรื่อง</th></tr></thead>
              <tbody>
                <tr><td className="it"><b>💡 โคม LED ประสิทธิภาพสูง</b><span>เปลี่ยน/ติดตั้งในโซนนำร่อง</span></td><td className="qty">ตามจำนวน<br />เสาในโซน</td><td>สว่างขึ้น ประหยัดไฟ</td></tr>
                <tr><td className="it"><b>📡 Node / ตัวควบคุม</b><span>รายโคม หรือ รายโซน/ตู้ (เลือกตามงบ)</span></td><td className="qty">ตามโหมด</td><td>ทำให้ไฟ "รู้ตัวเอง"</td></tr>
                <tr><td className="it"><b>☁️ แพลตฟอร์มศูนย์ควบคุม</b><span>แดชบอร์ด · แผนที่ · แจ้งซ่อม · รายงานพลังงาน</span></td><td className="qty">ใช้ร่วม<br />ทั้งเขต</td><td>หัวใจของระบบ</td></tr>
                <tr><td className="it"><b>🔧 ติดตั้ง + อบรมเจ้าหน้าที่</b><span>สอนใช้งานจริงจนใช้เป็น</span></td><td className="qty">รวมในชุด</td><td>เริ่มใช้ได้ทันที</td></tr>
              </tbody>
            </table>
            <span className="pill">💡 ชุดนำร่องอยู่ในกรอบงบที่หน่วยงานเบิกได้ — เริ่มเล็กก่อน เห็นผลแล้วค่อยขยาย</span>
            <div className="next">
              <b>＋ ต่อยอดทีหลังได้ (ไม่ต้องรื้อของเดิม):</b>
              <ul>
                <li>ขยายไปโซน/ถนนอื่นในเขต ใช้แพลตฟอร์มเดิมต่อ</li>
                <li>อัปจากโหมดโซน → รายโคม เมื่อต้องการข้อมูลละเอียดขึ้น</li>
                <li>ต่อยอดเสาไฟอัจฉริยะ (กล้อง · จอ · จุด Wi-Fi · เซนเซอร์สิ่งแวดล้อม)</li>
                <li>เชื่อมระบบอื่นของเทศบาลบนแพลตฟอร์มเดียว</li>
              </ul>
            </div>
          </div>
          <p className="foot">รายการและจำนวนปรับตามผลสำรวจพื้นที่จริง · ทีมงานช่วยจัดชุดให้พอดีงบและบริบทของแต่ละหน่วยงาน</p>
        </div>
      </section>

      {/* ============ องก์ 8 — เริ่มอย่างไร + CTA ============ */}
      <section className="dark">
        <div className="wrap">
          <span className="eyebrow">ขั้นต่อไป ไม่ต้องตัดสินใจวันนี้</span>
          <h2>เริ่มอย่างไร — 4 ขั้น ไม่ผูกมัด</h2>
          <p className="lead">เริ่มจากโซนเล็กที่เห็นผลจริงก่อน แล้วค่อยขยายเมื่อมั่นใจ</p>
          <div className="grid g4">
            <div className="card" style={{ background: 'rgba(255,255,255,.95)' }}><div className="ic">📍</div><h3>1 · สำรวจ + เลือกโซนนำร่อง</h3><p>ลงพื้นที่ดูเสา/ระบบเดิม เลือกโซนที่ปัญหาเยอะให้เริ่มก่อน</p></div>
            <div className="card" style={{ background: 'rgba(255,255,255,.95)' }}><div className="ic">🌱</div><h3>2 · ติดตั้งนำร่อง</h3><p>เริ่มจำนวนไม่มาก วางฐานระบบ เห็นผลจริงด้วยงบไม่สูง</p></div>
            <div className="card" style={{ background: 'rgba(255,255,255,.95)' }}><div className="ic">📊</div><h3>3 · ดูผล & ปรับ</h3><p>ดูข้อมูลค่าไฟ/การแจ้งเสีย ปรับตารางหรี่ไฟให้เหมาะพื้นที่</p></div>
            <div className="card" style={{ background: 'rgba(255,255,255,.95)' }}><div className="ic">📈</div><h3>4 · ขยายทีละโซน</h3><p>มั่นใจแล้วค่อยต่อยอด เพิ่มโซน/ถนน ไม่ต้องรื้อของเดิม</p></div>
          </div>
          <div style={{ marginTop: 34, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="btn" onClick={() => openDemo('dashboard')}>▶ เปิดดูระบบจริงอีกครั้ง</button>
          </div>
        </div>
      </section>

      {/* ============ DIVIDER: ภาคผนวก ============ */}
      <section className="divider appendix">
        <div className="wrap">
          <div className="num">— สำหรับผู้ที่อยากดูลึก —</div>
          <h2>ภาคผนวก (Appendix)</h2>
          <p>ส่วนนี้เป็นสเปกเทคนิค/สถาปัตยกรรมระบบ — เปิดดูเฉพาะตอนอยากดูรายละเอียดเชิงลึก</p>
        </div>
      </section>

      {/* ============ APPENDIX A — Architecture ============ */}
      <section>
        <div className="wrap">
          <span className="eyebrow accent">ภาคผนวก A</span>
          <h2>สถาปัตยกรรมระบบ End-to-End</h2>
          <div className="flow" style={{ marginTop: 24 }}>
            <div className="step"><div className="fic">💡</div><b>Edge (ที่โคม)</b><span>Node สื่อสาร วัด W·V·A · สั่งหรี่/เปิด-ปิด</span></div>
            <div className="arr">→</div>
            <div className="step"><div className="fic">📶</div><b>เครือข่าย</b><span>ส่งข้อมูลขึ้น Cloud (LTE / mesh ตามพื้นที่)</span></div>
            <div className="arr">→</div>
            <div className="step"><div className="fic">☁️</div><b>Cloud / CMS</b><span>เก็บข้อมูล · ตรวจกฎ · ออกรายงานอัตโนมัติ</span></div>
            <div className="arr">→</div>
            <div className="step"><div className="fic">🖥️</div><b>ศูนย์เทศบาล</b><span>แดชบอร์ด · แผนที่ · แจ้งซ่อม</span></div>
          </div>
          <div className="grid g3" style={{ marginTop: 24 }}>
            <div className="card"><div className="ic">🔧</div><h3>เข้ากับระบบเดิม</h3><p>ใช้ซ็อกเก็ตมาตรฐาน · ติดบนเสาที่มีได้ · รองรับทั้งโหมดรายโคมและรายโซน</p></div>
            <div className="card"><div className="ic">📊</div><h3>รายงานอัตโนมัติ</h3><p>ค่าไฟ · จำนวนโคมปกติ/เสีย · ประวัติการแจ้งซ่อม — ใช้ตอบสภาฯ และของบ</p></div>
            <div className="card"><div className="ic">🔒</div><h3>ข้อมูลเป็นของหน่วยงาน</h3><p>เทศบาลเป็นเจ้าของข้อมูลระบบไฟถนนของตนเอง จัดเก็บตามมาตรฐาน</p></div>
          </div>
          <p className="foot">สเปกฮาร์ดแวร์/โปรโตคอลที่ใช้จริง ขึ้นกับผลสำรวจพื้นที่ · ทีมวิศวกรเสนอ BOQ หลัง site survey</p>
        </div>
      </section>
    </div>
  );
}
