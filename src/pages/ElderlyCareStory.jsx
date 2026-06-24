import React, { useEffect, useState } from 'react';
import StoryDeck from '../components/StoryDeck';

// ชื่อสไลด์สำหรับเมนู "ไปสไลด์…" + จุดไข่ปลา (เรียงตรงกับ <section> ในหน้า)
const EC_SLIDES = [
  { k: 'pain',     t: 'ปัญหา · ผู้สูงอายุล้มลำพัง กว่าจะมีคนรู้ก็สาย' },
  { k: 'win',      t: 'ทำไมสำคัญ · 3 ฝ่ายอุ่นใจ + นโยบายชาติ' },
  { k: 'demo',     t: 'เห็นระบบจริง · เปิดดูได้ใน 30 วินาที' },
  { k: 'solution', t: 'ภาพรวมวิธีแก้ · เข้าใจทั้งระบบใน 3 ข้อ' },
  { k: 'how',      t: 'วิธีใช้งาน · 5 ขั้น ตั้งแต่ติดตั้งถึงช่วยถึงตัว' },
  { k: 'divider',  t: 'อุปกรณ์หลักของเรา' },
  { k: 'device',   t: 'อุปกรณ์ ① · เรดาร์จับการล้ม (ในบ้าน)' },
  { k: 'device',   t: 'อุปกรณ์ ① · กล้อง AI จับล้ม (พื้นที่ส่วนกลาง)' },
  { k: 'device',   t: 'อุปกรณ์ ② · นาฬิกาเฝ้าหัวใจ (ECG)' },
  { k: 'divider',  t: 'เครื่องมือสำหรับคนทำงาน' },
  { k: 'feature',  t: 'ช่วยให้คนทำงานหน้างานเบาลง' },
  { k: 'package',  t: 'เริ่มต้นได้อะไรบ้าง (แพ็กเกจ)' },
  { k: 'cta',      t: 'ขั้นต่อไป · เริ่มอย่างไร' },
  { k: 'appendix', t: 'ภาคผนวก' },
  { k: 'appendix', t: 'ภาคผนวก A · ค่าทางเทคนิค ECG' },
  { k: 'appendix', t: 'ภาคผนวก B · โครงสร้างพื้นฐาน + ความเป็นส่วนตัว' },
];

// ---------------------------------------------------------------------------
// ElderlyCareStory.jsx — หน้า /elderly-care แบบ storytelling เส้นเดียว
// (scroll ต่อกัน · ไม่ใช่ deck เด้งทีละสไลด์) · source: elderly-care-prototype.html
// Design: Civic Trust palette (Forest #0F6E56 + Cream #FAF7EE + Amber #BA7517) + Sarabun
// NOTE: ตัด speaker hint / โน้ตภายในออกทั้งหมด — ไม่ render ขึ้นหน้าเว็บ
// ---------------------------------------------------------------------------

const BASE = import.meta.env.BASE_URL;
const IMG = `${BASE}images/elderly-care`;

// ---------------------------------------------------------------------------
// Demo modal — เปิดระบบจริงจาก public/ui/elderly_app.html (mobile app mockup)
// ---------------------------------------------------------------------------

function DemoModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(11,85,68,0.55)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(12px, 3vw, 24px)', animation: 'ecFade .2s ease',
      }}
    >
      <style>{`@keyframes ecFade{from{opacity:0}to{opacity:1}}`}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(1320px, 100%)', height: 'min(820px, 100%)',
          background: '#FFF', borderRadius: 16, overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column',
        }}
      >
        <div style={{ flexShrink: 0, height: 50, background: 'var(--ec-primary-deep)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14.5, fontWeight: 700 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#9FE3C0' }} />
            ตัวอย่างระบบจริง — ศูนย์ดูแลผู้สูงอายุ (เลือกเมนูด้านซ้ายเพื่อดูแต่ละหน้า)
          </div>
          <button
            onClick={onClose}
            aria-label="ปิด"
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.16)', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 14px', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}
          >
            ✕ ปิด · กลับสู่การนำเสนอ
          </button>
        </div>
        <iframe
          src={`${BASE}ui/elderly_app.html`}
          title="ตัวอย่างระบบ — ศูนย์ดูแลผู้สูงอายุ"
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

      .ec-story{
        --ec-primary:#0F6E56; --ec-primary-hover:#1D9E75; --ec-primary-deep:#0B5544; --ec-primary-soft:#E5F0EA;
        --ec-accent:#BA7517; --ec-accent-soft:#FAEEDA; --ec-alert:#A32D2D; --ec-alert-soft:#FCEBEB;
        --ec-success:#3B6D11; --ec-success-soft:#EAF3DD;
        --ec-cream:#FAF7EE; --ec-surface:#FFFFFF; --ec-surface-soft:#EFE9DA;
        --ec-text:#2A2A26; --ec-text-muted:#6B6B63; --ec-line:#E4DECF; --ec-maxw:1080px;
        font-family:'Sarabun',sans-serif; color:var(--ec-text); background:var(--ec-cream);
        line-height:1.6; -webkit-font-smoothing:antialiased;
      }
      .ec-story img{display:block;max-width:100%}
      .ec-story .wrap{max-width:var(--ec-maxw);margin:0 auto;padding:0 24px}

      .ec-story .progress{position:fixed;top:48px;left:0;height:4px;background:var(--ec-primary);width:0;z-index:60;transition:width .1s linear}

      .ec-story section{padding:84px 0;border-bottom:1px solid var(--ec-line);position:relative}
      .ec-story section.dark{background:linear-gradient(135deg,var(--ec-primary-deep),var(--ec-primary));color:#fff;border-bottom:none}
      .ec-story .eyebrow{display:inline-block;font-size:14px;font-weight:700;letter-spacing:.5px;color:var(--ec-primary);
        background:var(--ec-primary-soft);padding:6px 16px;border-radius:100px;margin-bottom:18px}
      .ec-story .eyebrow.alert{color:var(--ec-alert);background:var(--ec-alert-soft)}
      .ec-story .eyebrow.accent{color:var(--ec-accent);background:var(--ec-accent-soft)}
      .ec-story .dark .eyebrow{color:#fff;background:rgba(255,255,255,.16)}
      .ec-story h1{font-size:clamp(30px,5vw,52px);font-weight:800;line-height:1.18;letter-spacing:-.5px;color:var(--ec-primary-deep)}
      .ec-story .dark h1,.ec-story .dark h2{color:#fff}
      .ec-story h2{font-size:clamp(26px,4vw,40px);font-weight:800;line-height:1.22;letter-spacing:-.4px;color:var(--ec-primary-deep)}
      .ec-story .lead{font-size:clamp(17px,2vw,20px);color:var(--ec-text-muted);max-width:780px;margin-top:16px}
      .ec-story .dark .lead{color:rgba(255,255,255,.9)}
      .ec-story .stepno{font-size:13px;font-weight:700;color:var(--ec-accent);letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;display:block}

      .ec-story .grid{display:grid;gap:18px;margin-top:34px}
      .ec-story .g3{grid-template-columns:repeat(3,1fr)}
      .ec-story .g2{grid-template-columns:repeat(2,1fr)}
      .ec-story .g4{grid-template-columns:repeat(4,1fr)}
      @media(max-width:860px){.ec-story .g3,.ec-story .g4{grid-template-columns:1fr 1fr}.ec-story .g2{grid-template-columns:1fr}}
      @media(max-width:560px){.ec-story .g3,.ec-story .g4,.ec-story .g2{grid-template-columns:1fr}}
      .ec-story .card{background:#fff;border:1px solid var(--ec-line);border-radius:18px;padding:24px;box-shadow:0 4px 18px rgba(15,110,86,.05)}
      .ec-story .card .ic{font-size:34px;line-height:1;margin-bottom:12px}
      .ec-story .card h3{font-size:18px;font-weight:800;color:var(--ec-primary-deep);margin-bottom:7px;line-height:1.3}
      .ec-story .card p{font-size:14.5px;color:var(--ec-text-muted);line-height:1.55}
      .ec-story .card.hi{border:2px solid var(--ec-primary)}

      .ec-story .who{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:34px}
      @media(max-width:860px){.ec-story .who{grid-template-columns:1fr}}
      .ec-story .who .card{position:relative;overflow:hidden}
      .ec-story .who .tag{display:inline-block;font-size:13px;font-weight:700;color:#fff;background:var(--ec-primary);
        padding:4px 14px;border-radius:100px;margin-bottom:12px}
      .ec-story .who .tag.b{background:var(--ec-accent)} .ec-story .who .tag.c{background:#4A7C59}
      .ec-story .who ul{list-style:none;margin-top:6px}
      .ec-story .who li{font-size:14px;color:var(--ec-text);padding:5px 0 5px 24px;position:relative;line-height:1.5}
      .ec-story .who li::before{content:'✓';position:absolute;left:0;color:var(--ec-success);font-weight:800}

      .ec-story .flow{display:flex;align-items:stretch;gap:0;margin-top:34px;flex-wrap:wrap}
      .ec-story .flow .step{flex:1;min-width:150px;background:#fff;border:1.5px solid var(--ec-primary);border-radius:16px;
        padding:18px 14px;text-align:center;position:relative}
      .ec-story .flow .step.hi{border:3px solid var(--ec-accent);background:var(--ec-accent-soft)}
      .ec-story .flow .step .fic{font-size:30px;margin-bottom:8px}
      .ec-story .flow .step b{display:block;font-size:16px;color:var(--ec-primary-deep);margin-bottom:4px}
      .ec-story .flow .step span{font-size:12.5px;color:var(--ec-text-muted)}
      .ec-story .flow .arr{display:flex;align-items:center;justify-content:center;color:var(--ec-primary);font-size:24px;font-weight:800;padding:0 6px}
      @media(max-width:680px){.ec-story .flow .arr{transform:rotate(90deg);width:100%;padding:4px 0}}

      .ec-story .media{margin-top:30px;background:#fff;border:1px solid var(--ec-line);border-radius:20px;padding:14px;
        display:flex;align-items:center;justify-content:center}
      .ec-story .media img{width:100%;height:auto;border-radius:12px;object-fit:contain}
      .ec-story .split{display:grid;grid-template-columns:1.05fr .95fr;gap:26px;align-items:center;margin-top:34px}
      @media(max-width:860px){.ec-story .split{grid-template-columns:1fr}}
      .ec-story .feat{background:#fff;border:1px solid var(--ec-line);border-radius:12px;padding:12px 16px;display:flex;gap:13px;align-items:flex-start;margin-bottom:11px}
      .ec-story .feat .fi{font-size:23px;flex-shrink:0;line-height:1}
      .ec-story .feat b{font-size:15px;color:var(--ec-text)} .ec-story .feat p{font-size:13px;color:var(--ec-text-muted);margin-top:2px}

      .ec-story .demobar{margin-top:34px;background:var(--ec-primary-deep);border-radius:20px;padding:30px 32px;color:#fff;
        display:flex;align-items:center;gap:24px;flex-wrap:wrap}
      .ec-story .demobar .txt{flex:1;min-width:240px}
      .ec-story .demobar h3{font-size:22px;font-weight:800;margin-bottom:6px}
      .ec-story .demobar p{font-size:15px;color:rgba(255,255,255,.85)}
      .ec-story .btn{display:inline-flex;align-items:center;gap:10px;background:var(--ec-accent);color:#fff;border:none;cursor:pointer;
        font-family:inherit;font-size:17px;font-weight:700;padding:15px 30px;border-radius:14px;transition:.2s;text-decoration:none}
      .ec-story .btn:hover{background:#9c6113;transform:translateY(-2px)}
      .ec-story .btn.ghost{background:transparent;border:2px solid #fff}
      .ec-story .btn.ghost:hover{background:rgba(255,255,255,.12)}

      .ec-story .pkg{background:#fff;border:2px solid var(--ec-primary);border-radius:20px;padding:30px;margin-top:34px}
      .ec-story .pkg .hd{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:8px}
      .ec-story .pkg table{width:100%;border-collapse:collapse;margin-top:10px}
      .ec-story .pkg th,.ec-story .pkg td{text-align:left;padding:12px 10px;border-bottom:1px dashed var(--ec-line);font-size:15px;vertical-align:top}
      .ec-story .pkg th{font-size:13px;color:var(--ec-text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.5px}
      .ec-story .pkg td.qty{text-align:center;font-weight:800;color:var(--ec-primary-deep);white-space:nowrap}
      .ec-story .pkg td.it b{color:var(--ec-primary-deep)}
      .ec-story .pkg td.it span{display:block;font-size:13px;color:var(--ec-text-muted);margin-top:2px}
      .ec-story .pkg .next{margin-top:18px;background:var(--ec-accent-soft);border-radius:12px;padding:16px 18px}
      .ec-story .pkg .next b{color:var(--ec-accent)}
      .ec-story .pkg .next ul{margin:8px 0 0 0;list-style:none}
      .ec-story .pkg .next li{font-size:14px;padding:4px 0 4px 22px;position:relative;color:var(--ec-text)}
      .ec-story .pkg .next li::before{content:'＋';position:absolute;left:0;color:var(--ec-accent);font-weight:800}
      .ec-story .pill{display:inline-block;background:var(--ec-success-soft);color:var(--ec-success);font-weight:700;font-size:15px;
        padding:8px 18px;border-radius:100px;margin-top:18px}

      .ec-story .foot{font-size:12.5px;color:var(--ec-text-muted);font-style:italic;margin-top:20px}
      .ec-story .dark .foot{color:rgba(255,255,255,.7)}

      .ec-story .divider{background:var(--ec-primary-deep);text-align:center;padding:70px 0;border-bottom:none}
      .ec-story .divider .num{font-size:15px;font-weight:700;letter-spacing:3px;color:var(--ec-accent);text-transform:uppercase}
      .ec-story .divider h2{color:#fff;margin-top:10px;font-size:clamp(30px,5vw,46px)}
      .ec-story .divider p{color:rgba(255,255,255,.82);font-size:17px;margin-top:12px;max-width:680px;margin-left:auto;margin-right:auto}
      .ec-story .divider.appendix{background:#2A2A26}

      .ec-story .tag-line{font-size:13px;font-weight:700;color:var(--ec-primary);background:var(--ec-primary-soft);
        display:inline-block;padding:4px 12px;border-radius:100px;margin-bottom:10px}
      .ec-story .blindspot{margin-top:24px;display:grid;grid-template-columns:1fr 1fr;gap:18px}
      @media(max-width:760px){.ec-story .blindspot{grid-template-columns:1fr}}
      .ec-story .blindspot .bx{border-radius:16px;padding:20px 22px}
      .ec-story .blindspot .warn{background:var(--ec-alert-soft);border:1.5px solid var(--ec-alert)}
      .ec-story .blindspot .fix{background:var(--ec-success-soft);border:1.5px solid var(--ec-success)}
      .ec-story .blindspot h4{font-size:17px;font-weight:800;margin-bottom:6px}
      .ec-story .blindspot .warn h4{color:var(--ec-alert)} .ec-story .blindspot .fix h4{color:var(--ec-success)}
      .ec-story .blindspot p{font-size:14px;color:var(--ec-text);line-height:1.55}
    `}</style>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ElderlyCareStory() {
  const [demo, setDemo] = useState(false);
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

  return (
    <div className="ec-story">
      <StoryStyles />
      <StoryDeck rootClass="ec-story" titles={EC_SLIDES} />
      <div className="progress" style={{ width: `${progress}%` }} />
      {demo && <DemoModal onClose={() => setDemo(false)} />}

      {/* ============ HERO / HOOK ============ */}
      <section className="dark" style={{ paddingTop: 70, paddingBottom: 78 }}>
        <div className="wrap">
          <span className="eyebrow">เริ่มจากเรื่องที่เราได้ยินมาจากหน้างาน</span>
          <h1>
            "ผู้สูงอายุอยู่บ้านลำพังตอนกลางวัน<br />
            ล้มทีไร...กว่าจะมีคนรู้ก็สายไปแล้ว"
          </h1>
          <p className="lead">
            เราลงพื้นที่คุยกับ อปท. หลายแห่ง แล้วเจอเรื่องเดียวกันซ้ำ ๆ — ลูกหลานออกไปทำงานหาเลี้ยงครอบครัว
            เหลือผู้สูงอายุอยู่บ้านคนเดียว พอเกิดเหตุ ไม่มีใครรู้จนกว่าจะมีคนบังเอิญเดินมาเจอ
            วันนี้เราอยากเล่าให้ฟังว่า เรื่องแบบนี้ "เห็นก่อน ช่วยทัน" ได้ และไม่ได้แพงอย่างที่คิด
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button className="btn" onClick={() => setDemo(true)}>ดูระบบจริงเลย (กดเล่นได้) →</button>
          </div>
        </div>
      </section>

      {/* ============ องก์ 1 — 3 ฝ่ายอุ่นใจ + นโยบายชาติ ============ */}
      <section style={{ background: 'var(--ec-cream)' }}>
        <div className="wrap">
          <span className="stepno">องก์ 1 · ทำไมเรื่องนี้ถึงสำคัญกับชุมชนของท่าน</span>
          <h2>ดูแลเชิงรุก = คนทั้งตำบลใช้ชีวิตได้สบายใจขึ้น</h2>
          <p className="lead">เมื่อมีระบบคอยเฝ้าระวังให้ ความกังวลที่เคยถ่วงทุกคนไว้ก็เบาลง — ครอบครัวไปทำงานได้เต็มที่ ชุมชนเดินหน้าได้</p>
          <div className="who">
            <div className="card">
              <span className="tag">ผู้บริหารท้องถิ่น</span>
              <h3>ดูแลผู้สูงอายุเชิงรุก สอดรับนโยบายชาติ</h3>
              <ul>
                <li>เห็นเหตุตั้งแต่เนิ่น ๆ ดูแลได้ก่อนจะลุกลาม</li>
                <li>เดินหน้างานที่ "ยังไงก็ต้องทำ" ได้ก่อนใคร</li>
                <li>มีข้อมูลรองรับ ใช้วางแผนและดูแลได้อย่างมั่นใจ</li>
              </ul>
            </div>
            <div className="card">
              <span className="tag c">เจ้าหน้าที่ / อสม.</span>
              <h3>ทำงานเบาลง ดูแลได้ทั่วถึงกว่าเดิม</h3>
              <ul>
                <li>ไม่ต้องเดินเคาะทุกบ้านทุกวัน ระบบบอกว่าใครต้องไปก่อน</li>
                <li>ลดงานจดมือ-กรอกแบบฟอร์มซ้ำซ้อน</li>
                <li>ออกหน้างานตอนที่จำเป็นจริง ๆ ไม่เหนื่อยฟรี</li>
              </ul>
            </div>
            <div className="card">
              <span className="tag b">ประชาชน / ครอบครัว</span>
              <h3>คลายกังวล ไปทำงานสร้างรายได้ได้เต็มที่</h3>
              <ul>
                <li>ออกไปทำงานนอกบ้านได้ ไม่ต้องพะวงพ่อแม่ที่บ้านตลอดเวลา</li>
                <li>เกิดเหตุ มีคนไปถึงตัวจริง ไม่ใช่แค่เตือนลอย ๆ</li>
                <li>ผู้สูงอายุได้อยู่บ้านตัวเองอย่างปลอดภัย มีคนคอยดู</li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: 30, background: 'var(--ec-primary-deep)', color: '#fff', borderRadius: 18, padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 40, lineHeight: 1, flexShrink: 0 }}>🇹🇭</div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color: '#fff' }}>เรื่องนี้ไม่ใช่ "ทำก็ได้ ไม่ทำก็ได้" — เป็นทิศทางของประเทศ</h3>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,.92)', lineHeight: 1.6 }}>
                  ไทยเข้าสู่ <b style={{ color: '#FFE3AE' }}>"สังคมสูงวัยอย่างสมบูรณ์"</b> ตั้งแต่ปี 2566 รัฐบาลยกผู้สูงอายุเป็น
                  <b style={{ color: '#FFE3AE' }}> ระเบียบวาระแห่งชาติ</b> มี <b style={{ color: '#FFE3AE' }}>แผนปฏิบัติการด้านผู้สูงอายุ ระยะที่ 3
                  (พ.ศ. 2566–2580)</b> เป็นกรอบระยะยาว · ที่สำคัญ ตั้งแต่ปี 2559 มี
                  <b style={{ color: '#FFE3AE' }}> กองทุนดูแลระยะยาว (LTC)</b> สำหรับผู้สูงอายุติดบ้าน-ติดเตียง ผ่าน สปสช.
                  ที่ <b style={{ color: '#FFE3AE' }}>กำหนดให้ อปท. เป็นกลไกหลักในการบริหาร</b> ร่วมกับกรมส่งเสริมการปกครองท้องถิ่น มหาดไทย
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginTop: 14 }}>
                  <div style={{ background: 'rgba(255,227,174,.18)', border: '1.5px solid #FFE3AE', borderRadius: 12, padding: '10px 18px' }}>
                    <span style={{ fontSize: 24, fontWeight: 800, color: '#FFE3AE' }}>~6,800</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,.9)' }}> / 7,700 อปท. เข้าร่วมกองทุน LTC แล้ว</span>
                  </div>
                  <p style={{ fontSize: 14.5, color: '#FFE3AE', fontWeight: 600, flex: 1, minWidth: 220 }}>
                    👉 เกือบทุก อปท. เดินงานนี้แล้ว — เรื่องนี้ไม่ใช่ "ทำหรือไม่ทำ" แต่คือ "เริ่มเมื่อไร"
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="foot">อ้างอิง: แผนปฏิบัติการด้านผู้สูงอายุ ระยะที่ 3 (พ.ศ. 2566–2580) กรมกิจการผู้สูงอายุ (dop.go.th) · กองทุนระบบการดูแลระยะยาวฯ (LTC) จัดตั้งปี 2559 สำนักงานหลักประกันสุขภาพแห่งชาติ (nhso.go.th) · จำนวน อปท. ที่เข้าร่วม ~6,800/7,700 เป็นข้อมูลที่เผยแพร่โดย สปสช.</p>
        </div>
      </section>

      {/* ============ องก์ 2 — DEMO ก่อน ============ */}
      <section className="dark">
        <div className="wrap">
          <span className="eyebrow">เห็นของจริงก่อน เดี๋ยวค่อยลงรายละเอียด</span>
          <h2>หน้าตาระบบจริง — เปิดดูได้เลยใน 30 วินาที</h2>
          <p className="lead">นี่ไม่ใช่ภาพ mock-up — เป็นแอปจริงที่เจ้าหน้าที่และครอบครัวใช้ กดเข้าไปเล่นได้เลย</p>
          <div className="demobar">
            <div className="txt">
              <h3>📱 ตัวอย่างแอป "ศูนย์ดูแลผู้สูงอายุ"</h3>
              <p>ดูว่าเวลาเกิดเหตุ หน้าจอแจ้งเตือนเป็นอย่างไร · ใครได้รับแจ้ง · ติดตามจนปิดเหตุได้อย่างไร</p>
            </div>
            <button className="btn" onClick={() => setDemo(true)}>▶ เปิดระบบจริง (กดเล่นได้)</button>
          </div>
        </div>
      </section>

      {/* ============ องก์ 3 — ภาพรวม 3 ข้อ ============ */}
      <section>
        <div className="wrap">
          <span className="stepno">องก์ 3 · สรุปสั้น ๆ ระบบนี้คืออะไร</span>
          <h2>เข้าใจทั้งระบบใน 3 ข้อ — ครบตั้งแต่รู้เหตุ จนปิดเหตุ</h2>
          <p className="lead">เราไม่ได้ขาย "อุปกรณ์" — เราขาย "ระบบที่ทำงานจนจบเหตุ" ยืนอยู่บน 3 อย่างนี้</p>
          <div className="grid g3">
            <div className="card hi"><div className="ic">👁️</div><h3>1 · เฝ้าระวัง — รู้ทันตั้งแต่ยังไม่สาย</h3>
              <p>เซนเซอร์ในบ้าน + อุปกรณ์สวมใส่ ดูแลต่อเนื่อง 24 ชม. จับการล้ม วูบ หรือสัญญาณผิดปกติ โดยไม่ต้องมีคนนั่งเฝ้า และไม่ต้องติดกล้องในห้องส่วนตัว</p></div>
            <div className="card hi"><div className="ic">🔔</div><h3>2 · แจ้งไล่ลำดับ — มีคนไปถึงตัวจริง</h3>
              <p>ไม่ใช่แค่เตือนลอย ๆ ระบบส่งต่อจาก อสม. → เทศบาล → กู้ชีพ จนกว่าจะมีคนรับเหตุและไปถึงตัวผู้สูงอายุ ครอบครัวรู้คู่ขนานทุกขั้น</p></div>
            <div className="card hi"><div className="ic">📊</div><h3>3 · บันทึก &amp; รายงาน — มีข้อมูลรองรับ</h3>
              <p>ทุกเหตุการณ์เข้าระบบเอง บันทึกครบว่าใครรับ-ส่งต่อเมื่อไร ใช้วางแผนดูแลและอ้างอิงประกอบการของบประมาณ แก้ย้อนหลังไม่ได้</p></div>
          </div>
          <p className="foot">ระบบทำหน้าที่เฝ้าระวัง · คัดกรอง · แจ้งเตือน · บันทึก เท่านั้น — การวินิจฉัยและรักษาเป็นของบุคลากรการแพทย์</p>
        </div>
      </section>

      {/* ============ องก์ 4 — ใช้งาน 5 ขั้น ============ */}
      <section style={{ background: 'var(--ec-cream)' }}>
        <div className="wrap">
          <span className="stepno">องก์ 4 · ใช้งานจริงเป็นขั้นเป็นตอน</span>
          <h2>ตั้งแต่ติดตั้ง จนมีคนไปถึงตัว — แค่ 5 ขั้น</h2>
          <p className="lead">ไม่ซับซ้อน ทำงานเองอัตโนมัติ คนของท่านเข้ามาตอนสำคัญพอ</p>
          <div className="flow">
            <div className="step"><div className="fic">🔧</div><b>ติดตั้ง</b><span>วางอุปกรณ์ + ตัวรับกลาง</span></div>
            <div className="arr">→</div>
            <div className="step"><div className="fic">👁️</div><b>เฝ้าระวัง</b><span>ดูแลต่อเนื่อง 24 ชม.</span></div>
            <div className="arr">→</div>
            <div className="step"><div className="fic">⚠️</div><b>เกิดเหตุ</b><span>จับการล้ม / สัญญาณผิดปกติ</span></div>
            <div className="arr">→</div>
            <div className="step hi"><div className="fic">🔔</div><b>แจ้งไล่ลำดับ</b><span>ส่งต่อจนมีคนรับ</span></div>
            <div className="arr">→</div>
            <div className="step"><div className="fic">✅</div><b>มีคนไปถึง</b><span>ช่วยถึงตัว + บันทึกเหตุ</span></div>
          </div>
          <div style={{ marginTop: 30 }} className="card">
            <h3 style={{ marginBottom: 14 }}>🔍 ซูมขั้น "แจ้งไล่ลำดับ" — แจ้ง 3 ชั้น จนกว่าจะมีคนไปถึงตัว</h3>
            <div className="flow" style={{ marginTop: 6 }}>
              <div className="step" style={{ borderColor: 'var(--ec-alert)', background: 'var(--ec-alert-soft)' }}><div className="fic">⚠️</div><b style={{ color: 'var(--ec-alert)' }}>เกิดเหตุ</b><span>ล้ม/กดปุ่ม/ผิดปกติ</span></div>
              <div className="arr">→</div>
              <div className="step"><b>ชั้น 1</b><span>อสม./เพื่อนบ้าน<br />แจ้งผ่าน LINE</span></div>
              <div className="arr">→</div>
              <div className="step"><b>ชั้น 2</b><span>เทศบาล + รพ.สต.<br />รับเหตุ + ส่งต่อ</span></div>
              <div className="arr">→</div>
              <div className="step"><b>ชั้น 3</b><span>กู้ชีพ 1669<br />เหตุหนัก/ไม่มีคนรับ</span></div>
              <div className="arr">→</div>
              <div className="step" style={{ borderColor: 'var(--ec-success)', background: 'var(--ec-success-soft)' }}><div className="fic">✅</div><b style={{ color: 'var(--ec-success)' }}>มีคนไปถึง</b><span>ปิดเหตุ + บันทึก</span></div>
            </div>
            <div className="grid g2" style={{ marginTop: 18 }}>
              <div style={{ background: 'var(--ec-primary-soft)', borderRadius: 10, padding: '12px 16px', fontSize: 14 }}>👨‍👩‍👧 <b>ครอบครัวรู้คู่ขนาน</b> ทุกขั้น ไม่ต้องรอเทศบาลโทรตาม</div>
              <div style={{ background: 'var(--ec-accent-soft)', borderRadius: 10, padding: '12px 16px', fontSize: 14 }}>🔒 <b>บันทึกแก้ย้อนหลังไม่ได้</b> มีเวลา + ผู้รับผิดชอบทุกขั้น</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DIVIDER: Hero Products ============ */}
      <section className="divider">
        <div className="wrap">
          <div className="num">— อุปกรณ์หลักของเรา —</div>
          <h2>พระเอก 2 ตัว ที่ทำให้ระบบนี้ "เห็นก่อน ช่วยทัน"</h2>
          <p>① ตัวจับการล้ม (เรดาร์ mmWave) สำหรับในบ้าน &nbsp;·&nbsp; ② นาฬิกาเฝ้าหัวใจ (ECG) สำหรับเฝ้าระวังสุขภาพ</p>
        </div>
      </section>

      {/* ============ องก์ 5a — เรดาร์ mmWave + จุดบอด→กล้องแก้ ============ */}
      <section>
        <div className="wrap">
          <span className="eyebrow accent">อุปกรณ์หลัก ① · ป้องกันการล้ม</span>
          <h2>ตัวจับการล้มเรดาร์ (mmWave) — เฝ้าระวังโดยไม่ต้องมีกล้อง</h2>
          <p className="lead">ติดบนเพดาน เห็นแต่ "การเคลื่อนไหว" ไม่เห็นหน้า ไม่บันทึกภาพ — เหมาะที่สุดกับจุดที่อยู่คนเดียว เช่น ห้องน้ำ ซึ่งเป็นจุดล้มบ่อยที่สุด</p>
          <div className="split">
            <div className="media"><img src={`${IMG}/radar-technical.png`} alt="เซนเซอร์เรดาร์ติดเพดานตรวจจับการล้ม ยืน/นั่ง/ล้ม — ไม่ใช่กล้อง" /></div>
            <div>
              <div className="feat"><div className="fi">📡</div><div><b>เซนเซอร์เพดาน ไม่ใช่กล้อง</b><p>ติดบนเพดาน มองเห็นแต่การเคลื่อนไหว ไม่บันทึกภาพใบหน้า</p></div></div>
              <div className="feat"><div className="fi">🚿</div><div><b>เฝ้าห้องน้ำได้ ไม่มีกล้อง</b><p>จุดเสี่ยงล้มที่สุด ดูแลได้โดยไม่ละเมิดความเป็นส่วนตัว</p></div></div>
              <div className="feat"><div className="fi">🤕</div><div><b>จับการล้ม &amp; การนิ่งผิดปกติ</b><p>รู้เมื่อล้ม ลุกไม่ขึ้น หรือออกจากเตียงแล้วนิ่งนานผิดปกติ</p></div></div>
              <div className="feat"><div className="fi">🌬️</div><div><b>เฝ้าจังหวะการหายใจตอนนอน</b><p>สังเกตจังหวะการหายใจ เป็นสัญญาณเฝ้าระวังเบื้องต้น</p></div></div>
            </div>
          </div>
          <div className="blindspot">
            <div className="bx warn">
              <h4>⚠️ จุดที่เรดาร์มีข้อจำกัด</h4>
              <p>เรดาร์เหมาะกับห้องที่ <b>อยู่คนเดียว</b> — ถ้ามีคนมากกว่า 1 คนในห้อง ทุกคนต้องอยู่นิ่งระบบถึงจะจับการล้มได้แม่น พื้นที่ที่คนเดินตลอด (ห้องโถง/พื้นที่ส่วนกลาง) เรดาร์จึงไม่ตอบโจทย์</p>
            </div>
            <div className="bx fix">
              <h4>✅ จุดบอดนี้ "กล้อง AI" แก้ได้</h4>
              <p>ในพื้นที่ส่วนกลางที่คนพลุกพล่าน ใช้ <b>กล้อง AI ตรวจจับการล้ม</b> ต่อยอดกล้องเดิม จับภาพคนล้ม/นอนนิ่งแล้วแจ้งเตือนทันที — เรดาร์ในห้องส่วนตัว + กล้องในพื้นที่ส่วนกลาง = ครอบคลุมครบ</p>
            </div>
          </div>
          <p className="foot">ระบบทำหน้าที่เฝ้าระวัง/คัดกรองเบื้องต้น ไม่ใช่การวินิจฉัย · ออกแบบตามหลักความเป็นส่วนตัว (PDPA)</p>
        </div>
      </section>

      {/* ============ องก์ 5cam — กล้อง AI (พื้นที่ส่วนกลาง) ============ */}
      <section style={{ background: 'var(--ec-cream)' }}>
        <div className="wrap">
          <span className="eyebrow accent">อุปกรณ์หลัก ① · ป้องกันการล้ม (พื้นที่ส่วนกลาง)</span>
          <h2>กล้อง AI ตรวจจับการล้ม — แก้จุดบอดของเรดาร์ในที่คนพลุกพล่าน</h2>
          <p className="lead">ตรงที่เรดาร์ไม่ถนัด (มีคนหลายคน เดินไปมา) ให้กล้อง AI ช่วยดู — และต่อยอด <b>กล้อง CCTV เดิม</b> ที่หน่วยงานมีอยู่แล้วได้ ไม่ต้องเปลี่ยนทั้งระบบ</p>
          <div className="split">
            <div className="media"><img src={`${IMG}/pillar-cctv.jpg`} alt="กล้อง AI ตรวจจับการล้มในพื้นที่ส่วนกลาง — จับภาพคนล้ม/นอนนิ่งแล้วแจ้งเตือน" /></div>
            <div>
              <div className="feat"><div className="fi">🏙️</div><div><b>เหมาะกับพื้นที่ส่วนกลาง</b><p>ลานกิจกรรม · ทางเดิน · ศูนย์ดูแลกลางวัน · โรงพยาบาลส่งเสริมสุขภาพ — ที่ที่มีคนหลายคน</p></div></div>
              <div className="feat"><div className="fi">🤖</div><div><b>AI จับ "คนล้ม / นอนนิ่งผิดปกติ"</b><p>วิเคราะห์ท่าทางจากภาพ เมื่อพบคนล้มหรือนอนนิ่งนานผิดปกติ แจ้งเตือนเข้าศูนย์ทันที</p></div></div>
              <div className="feat"><div className="fi">♻️</div><div><b>ต่อยอดกล้องเดิม ไม่ต้องรื้อ</b><p>ถ้ากล้องที่มีรองรับ ก็ดึงภาพมาวิเคราะห์เพิ่มได้เลย ประหยัดงบ</p></div></div>
              <div className="feat"><div className="fi">🔔</div><div><b>เข้าระบบแจ้งไล่ลำดับเดียวกัน</b><p>เหตุจากกล้องวิ่งเข้า flow แจ้ง 3 ชั้นเหมือนเรดาร์ — มีคนไปถึงตัวจริง</p></div></div>
            </div>
          </div>
          <div style={{ marginTop: 24, background: 'var(--ec-primary-deep)', color: '#fff', borderRadius: 16, padding: '20px 24px' }}>
            <b style={{ color: '#FFE3AE', fontSize: 15 }}>🛠️ หมายเหตุทางเทคนิค — คุณสมบัติกล้องที่ใช้ต่อยอดได้</b>
            <div className="grid g2" style={{ marginTop: 12, gap: 12 }}>
              <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,.92)', lineHeight: 1.6 }}>
                • รองรับสตรีมมาตรฐาน <b style={{ color: '#FFE3AE' }}>RTSP</b> (ดึงภาพเข้า AI ได้) · ตามมาตรฐาน <b style={{ color: '#FFE3AE' }}>ONVIF</b> ยิ่งดี<br />
                • ความละเอียดอย่างน้อย <b style={{ color: '#FFE3AE' }}>1080p (Full HD)</b> · เฟรมเรต ≥ 15–25 fps<br />
                • เข้ารหัส <b style={{ color: '#FFE3AE' }}>H.264 / H.265</b>
              </div>
              <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,.92)', lineHeight: 1.6 }}>
                • มุมกล้องเห็น "ทั้งตัว" คนในพื้นที่ (ไม่ใช่เห็นแค่หัว)<br />
                • แสงเพียงพอ / มี IR สำหรับกลางคืน<br />
                • อยู่ในเครือข่ายเดียวกับตัวประมวลผล (LAN/PoE)
              </div>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,.7)', fontStyle: 'italic', marginTop: 10 }}>กล้องที่ไม่ผ่านสเปกเหล่านี้ อาจต้องเพิ่มกล้องใหม่เฉพาะจุด · ทีมงานตรวจกล้องเดิม (site survey) ก่อนเสนอจริง</p>
          </div>
          <p className="foot">กล้องในพื้นที่ส่วนกลางเท่านั้น — ในห้องส่วนตัวใช้เรดาร์ (ไม่มีกล้อง) · ระบบเฝ้าระวัง/แจ้งเตือนเบื้องต้น ไม่ใช่การวินิจฉัย · เป็นกล้องของหน่วยงานเอง บันทึกเหตุความปลอดภัยในพื้นที่ของหน่วยงาน ตาม PDPA</p>
        </div>
      </section>

      {/* ============ องก์ 5b — นาฬิกา ECG ============ */}
      <section style={{ background: 'var(--ec-cream)' }}>
        <div className="wrap">
          <span className="eyebrow accent">อุปกรณ์หลัก ② · เฝ้าระวังหัวใจ</span>
          <h2>นาฬิกาเฝ้าหัวใจ (ECG) — รู้ก่อน ป้องกันได้ ดีกว่าเสียใจภายหลัง</h2>
          <p className="lead">หลายโรคร้ายของผู้สูงอายุ "ส่งสัญญาณล่วงหน้า" ที่หัวใจ — ถ้าเห็นก่อน ก็พาไปหาหมอทัน ลดการเจ็บหนัก ลดค่าใช้จ่ายในการรักษา</p>
          <div className="split">
            <div className="media"><img src={`${IMG}/ECG%20WATCH.png`} alt="นาฬิกาวัด ECG พร้อมแอป แสดงคลื่นหัวใจ อัตราการเต้น การหายใจ และออกซิเจน" /></div>
            <div>
              <div className="feat"><div className="fi">🛡️</div><div><b>เฝ้าระวังภาวะหัวใจเต้นผิดจังหวะ</b><p>สัญญาณเตือนที่อาจนำไปสู่อัมพาต/เส้นเลือดสมอง ถ้าคัดกรองเจอก่อน พาไปพบแพทย์ได้ทัน</p></div></div>
              <div className="feat"><div className="fi">😴</div><div><b>เห็นภาวะออกซิเจนต่ำ/หยุดหายใจตอนนอน</b><p>ปัญหาที่คนไข้มักไม่รู้ตัว ช่วยให้ดูแลก่อนกลายเป็นเรื่องใหญ่</p></div></div>
              <div className="feat"><div className="fi">❤️</div><div><b>ดูความเป็นอยู่โดยรวม</b><p>ความเครียด/การพักผ่อน เป็นข้อมูลให้ครอบครัวและ อสม. ดูแลคุณภาพชีวิตได้ตรงจุด</p></div></div>
              <div className="feat"><div className="fi">⏱️</div><div><b>วัดคัดกรองเร็ว ภายใน 2 นาที</b><p>หากพบค่าน่าสงสัย แพทย์อาจให้สวมต่อเนื่องตามที่วินิจฉัย</p></div></div>
            </div>
          </div>
          <div style={{ marginTop: 24, background: 'var(--ec-alert-soft)', border: '1.5px solid var(--ec-alert)', borderRadius: 16, padding: '22px 24px' }}>
            <b style={{ color: 'var(--ec-alert)', fontSize: 17 }}>🫀 เฝ้าระวัง "สัญญาณเงียบ" ที่นำไปสู่ อัมพาต · วูบหมดสติ · ล้ม</b>
            <p style={{ fontSize: 14, color: 'var(--ec-text)', marginTop: 6, lineHeight: 1.55 }}>หลายภาวะหัวใจไม่แสดงอาการจนสายเกินไป — นาฬิกาช่วยคัดกรองให้เห็นก่อน แล้วพาไปพบแพทย์ทัน</p>
            <div className="grid g2" style={{ marginTop: 14, gap: 14 }}>
              <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', borderLeft: '4px solid var(--ec-alert)' }}>
                <b style={{ color: 'var(--ec-primary-deep)', fontSize: 15 }}>หัวใจเต้นพลิ้ว (AF)</b>
                <p style={{ fontSize: 13.5, color: 'var(--ec-text-muted)', marginTop: 3, lineHeight: 1.5 }}>สาเหตุสำคัญของ <b>อัมพาต/เส้นเลือดสมอง</b> ในผู้สูงอายุ มักไม่มีอาการเตือน — คัดกรองเจอก่อน ลดความเสี่ยงได้</p>
              </div>
              <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', borderLeft: '4px solid var(--ec-alert)' }}>
                <b style={{ color: 'var(--ec-primary-deep)', fontSize: 15 }}>หัวใจหยุดเต้นชั่วขณะ / เต้นเร็ว-ช้าผิดปกติ</b>
                <p style={{ fontSize: 13.5, color: 'var(--ec-text-muted)', marginTop: 3, lineHeight: 1.5 }}>ภาวะ Pause / เต้นเร็ว-ช้า เป็นต้นเหตุของ <b>วูบหมดสติแล้วล้ม</b> — รู้ก่อนช่วยป้องกันอุบัติเหตุ</p>
              </div>
              <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', borderLeft: '4px solid var(--ec-accent)' }}>
                <b style={{ color: 'var(--ec-primary-deep)', fontSize: 15 }}>ออกซิเจนต่ำ / หยุดหายใจตอนนอน</b>
                <p style={{ fontSize: 13.5, color: 'var(--ec-text-muted)', marginTop: 3, lineHeight: 1.5 }}>ภาวะที่คนไข้มักไม่รู้ตัว เพิ่มความเสี่ยงโรคหัวใจและสมองในระยะยาว</p>
              </div>
              <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', borderLeft: '4px solid var(--ec-accent)' }}>
                <b style={{ color: 'var(--ec-primary-deep)', fontSize: 15 }}>เส้นเลือดแข็ง-ตีบ / เลือดไหลเวียนไม่ดี</b>
                <p style={{ fontSize: 13.5, color: 'var(--ec-text-muted)', marginTop: 3, lineHeight: 1.5 }}>สัญญาณสะสมที่นำไปสู่หัวใจวาย/อัมพาต — เฝ้าระวังแนวโน้มได้ต่อเนื่อง</p>
              </div>
            </div>
            <p style={{ fontSize: 12, color: 'var(--ec-text-muted)', fontStyle: 'italic', marginTop: 12 }}>ศัพท์การแพทย์ของแต่ละภาวะ (AFib · Pause · VT · SpO₂ · PWV ฯลฯ) อยู่ในภาคผนวก A · ทั้งหมดเป็นการคัดกรองเบื้องต้น ไม่ใช่การวินิจฉัย</p>
          </div>
          <div style={{ marginTop: 18, background: '#fff', border: '2px solid var(--ec-primary)', borderRadius: 16, padding: '20px 24px' }}>
            <b style={{ color: 'var(--ec-primary-deep)', fontSize: 16 }}>💚 สิ่งที่ชุมชนได้จริง</b>
            <div className="grid g3" style={{ marginTop: 14, gap: 14 }}>
              <div style={{ background: 'var(--ec-primary-soft)', borderRadius: 12, padding: '14px 16px', fontSize: 14 }}><b>ผู้สูงอายุ</b><br />มีชีวิตความเป็นอยู่ดีขึ้น เจ็บหนักน้อยลง อยู่กับครอบครัวได้นานขึ้น</div>
              <div style={{ background: 'var(--ec-primary-soft)', borderRadius: 12, padding: '14px 16px', fontSize: 14 }}><b>ครอบครัว</b><br />ลดค่าใช้จ่ายรักษาพยาบาลจากการเจอก่อน คลายกังวลเรื่องสุขภาพพ่อแม่</div>
              <div style={{ background: 'var(--ec-primary-soft)', borderRadius: 12, padding: '14px 16px', fontSize: 14 }}><b>ชุมชน</b><br />คนแก่แข็งแรง ลูกหลานสบายใจ ภาพรวมสุขภาวะของตำบลดีขึ้น</div>
            </div>
          </div>
          <div style={{ marginTop: 24 }}>
            <b style={{ color: 'var(--ec-primary-deep)', fontSize: 17 }}>📈 ไม่ใช่แค่บอกว่าดี — เห็นคลื่นหัวใจจริงทุกจังหวะ</b>
            <p style={{ fontSize: 14.5, color: 'var(--ec-text-muted)', marginTop: 6, maxWidth: 820 }}>
              นาฬิกาบันทึกคลื่นไฟฟ้าหัวใจ <b>ระดับการแพทย์</b> ในการวัด ~2 นาที — ภาพข้างล่างคือกราฟจริงที่ตัดจากรายงานการตรวจวัด (ตัดเฉพาะกราฟ ไม่มีข้อมูลส่วนบุคคล)
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
              <div style={{ background: '#fff', border: '1px solid var(--ec-line)', borderRadius: 16, padding: 16 }}>
                <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--ec-primary)', padding: '3px 12px', borderRadius: 100, marginBottom: 10 }}>คลื่นไฟฟ้าหัวใจ (ECG)</span>
                <div className="media" style={{ marginTop: 0, border: 'none', padding: 0 }}><img src={`${IMG}/real_ecg_strip.png`} alt="คลื่นไฟฟ้าหัวใจจริง Lead I มาตรฐานคลินิก 25 mm/s · 10 mm/mV จัดประเภทการเต้นอัตโนมัติ" /></div>
                <p style={{ fontSize: 13, color: 'var(--ec-text-muted)', marginTop: 10, lineHeight: 1.5 }}>คลื่นไฟฟ้าหัวใจ Lead I มาตรฐานคลินิก 25 mm/s · 10 mm/mV — จัดประเภทการเต้นให้อัตโนมัติ (N = ปกติ) เป็นภาพที่ "ดูแล้วเชื่อ" ที่สุด</p>
              </div>
              <div className="grid g2" style={{ marginTop: 0, gap: 14 }}>
                <div style={{ background: '#fff', border: '1px solid var(--ec-line)', borderRadius: 16, padding: 16 }}>
                  <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--ec-accent)', padding: '3px 12px', borderRadius: 100, marginBottom: 10 }}>อัตราการเต้นหัวใจ</span>
                  <div className="media" style={{ marginTop: 0, border: 'none', padding: 0 }}><img src={`${IMG}/real_hr_trend.png`} alt="อัตราการเต้นหัวใจต่อเนื่อง 153 ครั้งใน 2 นาที เฉลี่ย 82" /></div>
                  <p style={{ fontSize: 13, color: 'var(--ec-text-muted)', marginTop: 10, lineHeight: 1.5 }}>บันทึกการเต้นต่อเนื่อง 153 ครั้งใน ~2 นาที (เฉลี่ย 82 · ช่วง 76–89) — เห็นทุกจังหวะ ไม่ใช่ค่าเฉลี่ยรายชั่วโมง</p>
                </div>
                <div style={{ background: '#fff', border: '1px solid var(--ec-line)', borderRadius: 16, padding: 16 }}>
                  <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--ec-primary)', padding: '3px 12px', borderRadius: 100, marginBottom: 10 }}>ECG + PPG</span>
                  <div className="media" style={{ marginTop: 0, border: 'none', padding: 0 }}><img src={`${IMG}/real_ecg_ppg.png`} alt="สัญญาณ ECG คู่กับ PPG จากการวัดจริง" /></div>
                  <p style={{ fontSize: 13, color: 'var(--ec-text-muted)', marginTop: 10, lineHeight: 1.5 }}>วัดคลื่นไฟฟ้าหัวใจ (ECG) คู่กับสัญญาณชีพจร (PPG) พร้อมกัน ให้ข้อมูลครบสำหรับเฝ้าระวัง</p>
                </div>
              </div>
            </div>
          </div>
          <p className="foot">ตัวอย่างจากการตรวจวัดจริง (สาธิต) · ตัดเฉพาะกราฟ ไม่มีข้อมูลส่วนบุคคล (PDPA-safe) · ทั้งหมดเป็นการคัดกรอง/เฝ้าระวังเบื้องต้น ไม่ใช่การวินิจฉัย · พบค่าผิดปกติต้องพบแพทย์เพื่อยืนยันทุกครั้ง</p>
        </div>
      </section>

      {/* ============ DIVIDER: เครื่องมือเจ้าหน้าที่ ============ */}
      <section className="divider">
        <div className="wrap">
          <div className="num">— เครื่องมือสำหรับคนทำงาน —</div>
          <h2>เจ้าหน้าที่ &amp; อสม. ทำงานง่ายขึ้น ไม่จมกองเอกสาร</h2>
          <p>ยืม-คืนนาฬิกาหมุนเวียน · อ่านบัตรประชาชนแล้วบันทึกค่าได้เลย · ถ่ายรูปหน้าจอเครื่องวัด ระบบอ่านค่าให้</p>
        </div>
      </section>

      {/* ============ องก์ 6 — Features อสม. ============ */}
      <section>
        <div className="wrap">
          <span className="stepno">องก์ 6 · ช่วยให้คนทำงานหน้างานเบาลง</span>
          <h2>3 อย่างที่ทำให้ อสม. ทำงานเร็วขึ้น แม่นขึ้น</h2>
          <div className="grid g3">
            <div className="card"><div className="ic">🪪</div><h3>อ่านบัตรประชาชน → ตรวจ → บันทึก</h3>
              <p>แตะบัตรประชาชน ระบบดึงข้อมูลผู้สูงอายุขึ้นมาให้ทันที ทำการตรวจแล้วบันทึกค่าได้เลย ไม่ต้องค้นหา ไม่ต้องกรอกชื่อใหม่ บันทึกถูกคนเสมอ</p></div>
            <div className="card"><div className="ic">📷</div><h3>ถ่ายไม่ต้องจด (OCR อ่านจากหน้าจอ)</h3>
              <p>ถ่ายรูปหน้าจอเครื่องวัด — ความดัน · น้ำตาล · ออกซิเจน ระบบอ่านค่าด้วย OCR แล้วบันทึกให้อัตโนมัติ ลดงานจดมือและความผิดพลาด</p></div>
            <div className="card"><div className="ic">♻️</div><h3>ยืม-คืนนาฬิกาหมุนเวียน</h3>
              <p>ไม่ต้องซื้อให้ทุกคนถาวร — ให้กลุ่มเสี่ยงยืมใช้ 7–30 วัน ดูผลแล้วคืน ล้างข้อมูลส่วนบุคคล หมุนเวียนสู่รายต่อไป ดูแลได้มากคนด้วยอุปกรณ์ชุดเดียว</p></div>
          </div>
          <div className="media" style={{ maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}>
            <img src={`${IMG}/Office_screen.png`} alt="หน้าจอระบบฝั่งเจ้าหน้าที่ — รายการติดตาม แจ้งเตือน และบันทึกค่าสุขภาพ" />
          </div>
          <p className="foot">ทุกการยืม-คืนล้างข้อมูลส่วนบุคคลตามมาตรฐาน PDPA · เจ้าหน้าที่บันทึก, ระบบจัดเก็บ, แพทย์วินิจฉัย</p>
        </div>
      </section>

      {/* ============ องก์ 7 — Package (ไม่มีราคา) ============ */}
      <section style={{ background: 'var(--ec-cream)' }}>
        <div className="wrap">
          <span className="stepno">องก์ 7 · "แล้วเริ่มต้นซื้อ ได้อะไรบ้าง?"</span>
          <h2>ฟังดูเหมือนของแพง — แต่ชุดเริ่มต้นอยู่ในงบที่ท่านเบิกได้</h2>
          <p className="lead">ไม่ต้องรอโครงการใหญ่ ชุดเริ่มต้นเห็นผลจริง — เริ่มจากกลุ่มเสี่ยงสูงก่อน แล้วต่อยอดทีหลังได้ ไม่ต้องรื้อ</p>
          <div className="pkg">
            <div className="hd">
              <span className="tag-line">📦 ชุดเริ่มต้น (Starter Package) — แนะนำสำหรับนำร่อง</span>
            </div>
            <table>
              <thead><tr><th style={{ width: '55%' }}>ในชุดเริ่มต้นมีอะไร</th><th style={{ width: '18%', textAlign: 'center' }}>จำนวน</th><th>ช่วยเรื่อง</th></tr></thead>
              <tbody>
                <tr><td className="it"><b>🛡️ ตัวจับการล้มเรดาร์ (mmWave)</b><span>ติดในห้องส่วนตัว/ห้องน้ำของกลุ่มเสี่ยง</span></td><td className="qty">หลายจุด<br />ตามกลุ่มเสี่ยง</td><td>ป้องกันการล้มในบ้าน</td></tr>
                <tr><td className="it"><b>🎥 กล้อง AI จับการล้ม (พื้นที่ส่วนกลาง)</b><span>เสริมจุดบอดของเรดาร์ในพื้นที่ที่คนพลุกพล่าน</span></td><td className="qty">ตามจุดเสี่ยง</td><td>ครอบคลุมพื้นที่ส่วนกลาง</td></tr>
                <tr><td className="it"><b>⌚ นาฬิกาเฝ้าหัวใจ (ECG)</b><span>หมุนเวียนยืม-คืนในกลุ่มเสี่ยงสุขภาพ</span></td><td className="qty">ชุดหมุนเวียน</td><td>เฝ้าระวังหัวใจ</td></tr>
                <tr><td className="it"><b>📻 ตัวรับกลาง (Gateway)</b><span>ครอบพื้นที่ — รุ่นเริ่มต้นประหยัด</span></td><td className="qty">1 จุด+</td><td>เชื่อมอุปกรณ์ทั้งหมด</td></tr>
                <tr><td className="it"><b>🖥️ ศูนย์ดูแล + ระบบแจ้งไล่ลำดับ + แอป อสม.</b><span>Web เทศบาล + LINE ครอบครัว + OCR/อ่านบัตร</span></td><td className="qty">ใช้ร่วม<br />ทั้งตำบล</td><td>หัวใจของระบบ</td></tr>
              </tbody>
            </table>
            <span className="pill">💡 ชุดเริ่มต้นทั้งหมดนี้ อยู่ในกรอบงบที่หน่วยงานเบิกได้ — ไม่ต้องตั้งโครงการใหญ่</span>
            <div className="next">
              <b>＋ ต่อยอดทีหลังได้ (ไม่ต้องรื้อของเดิม):</b>
              <ul>
                <li>เพิ่มนาฬิกา ECG / ตัวจับการล้ม ให้ครอบคลุมมากขึ้น</li>
                <li>ปุ่มฉุกเฉิน SOS ไร้สาย · เซนเซอร์ประตู-หน้าต่าง (กันผู้ป่วยสมองเสื่อมออกกลางดึก)</li>
                <li>เซนเซอร์อากาศ / น้ำรั่ว / เสียง · ชุดวัดสุขภาพที่บ้าน</li>
                <li>ขยายไปหมู่บ้าน/ตำบลข้างเคียง ใช้ตัวรับกลางเดิมต่อได้</li>
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
          <p className="lead">เริ่มจากเล็ก ๆ ที่เห็นผลจริงก่อน แล้วค่อยขยายเมื่อมั่นใจ</p>
          <div className="grid g4">
            <div className="card" style={{ background: 'rgba(255,255,255,.95)' }}><div className="ic">📍</div><h3>1 · สำรวจ + คัดกลุ่มเสี่ยง</h3><p>ลงพื้นที่ดูสภาพจริง คัดผู้สูงอายุกลุ่มเสี่ยงสูงที่ควรเริ่มก่อน</p></div>
            <div className="card" style={{ background: 'rgba(255,255,255,.95)' }}><div className="ic">🌱</div><h3>2 · นำร่องกลุ่มเล็ก</h3><p>เริ่มจำนวนไม่มาก วางฐานที่จำเป็น เห็นผลจริงด้วยงบไม่สูง</p></div>
            <div className="card" style={{ background: 'rgba(255,255,255,.95)' }}><div className="ic">🔄</div><h3>3 · ดูผล &amp; ปรับร่วมกัน</h3><p>ทบทวนเหตุที่ระบบจับได้ ปรับตั้งค่าให้เหมาะพื้นที่ท่าน</p></div>
            <div className="card" style={{ background: 'rgba(255,255,255,.95)' }}><div className="ic">📈</div><h3>4 · ขยายทีละชั้นตามงบ</h3><p>มั่นใจแล้วค่อยต่อยอด เพิ่มอุปกรณ์/พื้นที่ ไม่ต้องรื้อของเดิม</p></div>
          </div>
          <div style={{ marginTop: 34, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="btn" onClick={() => setDemo(true)}>▶ เปิดดูระบบจริงอีกครั้ง</button>
          </div>
        </div>
      </section>

      {/* ============ DIVIDER: ภาคผนวก ============ */}
      <section className="divider appendix">
        <div className="wrap">
          <div className="num">— สำหรับผู้ที่อยากดูลึก —</div>
          <h2>ภาคผนวก (Appendix)</h2>
          <p>ส่วนนี้เป็นเทคนิค/ตารางค่าทางการแพทย์ — เปิดดูเฉพาะตอนอยากดูรายละเอียดเชิงลึก</p>
        </div>
      </section>

      {/* ============ APPENDIX A — ค่าทางเทคนิค ECG ============ */}
      <section>
        <div className="wrap">
          <span className="eyebrow accent">ภาคผนวก A</span>
          <h2>นาฬิกา ECG วัดอะไรได้บ้าง — และเฝ้าระวังโรคใด</h2>
          <p className="lead">ตารางนี้ไว้ตอบเมื่อบุคลากรการแพทย์/คนเทคนิคถามลึก — ในการพูดปกติใช้แค่ "เฝ้าระวังหัวใจ" พอ</p>
          <div className="pkg" style={{ borderColor: 'var(--ec-line)' }}>
            <table>
              <thead><tr><th style={{ width: '34%' }}>เฝ้าระวังภาวะ</th><th style={{ width: '20%' }}>ระดับ</th><th>ค่าที่ดู (ศัพท์เทคนิค)</th></tr></thead>
              <tbody>
                <tr><td className="it"><b>อัมพาต / เส้นเลือดสมองตีบ-แตก</b><span>หัวใจเต้นพลิ้ว</span></td><td style={{ color: '#D92D20', fontWeight: 800 }}>อันตรายสูงสุด</td><td>AFib · CHA₂DS₂-VASc</td></tr>
                <tr><td className="it"><b>หัวใจวายเฉียบพลัน / วูบหมดสติ</b></td><td style={{ color: '#D92D20', fontWeight: 800 }}>อันตรายสูงสุด</td><td>QT/QTc/QTcF · PR · QRS · PVC/Block</td></tr>
                <tr><td className="it"><b>ออกซิเจนต่ำ / นอนกรนแล้วหยุดหายใจ</b></td><td style={{ color: '#F79009', fontWeight: 800 }}>เสี่ยงสูง</td><td>SpO₂ · RR · Night RRV</td></tr>
                <tr><td className="it"><b>เส้นเลือดแข็ง / เส้นเลือดตีบ</b></td><td style={{ color: '#F79009', fontWeight: 800 }}>เสี่ยงสูง</td><td>PWV (arterial stiffness)</td></tr>
                <tr><td className="it"><b>เลือดลมไหลเวียนไม่ดี</b><span>ปลายมือปลายเท้า</span></td><td style={{ color: '#B8920B', fontWeight: 800 }}>เฝ้าระวัง</td><td>PI (Perfusion Index)</td></tr>
                <tr><td className="it"><b>เครียดลงหัวใจ / พักผ่อนไม่พอ</b><span>ดูความเป็นอยู่ (Non-medical)</span></td><td style={{ color: '#B8920B', fontWeight: 800 }}>เฝ้าระวัง</td><td>HRV: SDNN/RMSSD/Stress</td></tr>
              </tbody>
            </table>
          </div>
          <p className="foot">ค่าทั้งหมดเป็นการคัดกรอง/เฝ้าระวังเบื้องต้น (screening) ไม่ใช่การวินิจฉัยโรค · ต้องพบแพทย์เพื่อตรวจยืนยันและวินิจฉัยทุกครั้ง</p>
        </div>
      </section>

      {/* ============ APPENDIX B — โครงสร้างพื้นฐาน + privacy ============ */}
      <section style={{ background: 'var(--ec-cream)' }}>
        <div className="wrap">
          <span className="eyebrow accent">ภาคผนวก B</span>
          <h2>ตัวรับกลาง 1 จุด ครอบทั้งหมู่บ้าน + ความเป็นส่วนตัว</h2>
          <div className="media" style={{ maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
            <img src={`${IMG}/LoRa_WorkFlow_V2.png`} alt="อุปกรณ์ส่งสัญญาณเข้าตัวรับกลาง → ประมวลผล → แดชบอร์ด/แจ้งเตือน" />
          </div>
          <div className="grid g4" style={{ marginTop: 24 }}>
            <div className="card"><div className="ic">📻</div><h3>เหมือนวิทยุชุมชน</h3><p>ตัวรับกลางตัวเดียวรับสัญญาณทั้งหมู่บ้านเข้าศูนย์เดียว</p></div>
            <div className="card"><div className="ic">🔗</div><h3>รองรับได้มาก</h3><p>1 ตัวรับ รองรับอุปกรณ์ราว 2,000 ชิ้น</p></div>
            <div className="card"><div className="ic">📍</div><h3>รัศมีกว้าง</h3><p>เมือง 0.5–2 กม. · ชนบท 2–15 กม. (พื้นที่เปิดโล่ง)</p></div>
            <div className="card"><div className="ic">🔒</div><h3>วางใจได้</h3><p>ไม่มีกล้องในห้องส่วนตัว · ข้อมูลเป็นของเทศบาล · audit log ตาม PDPA</p></div>
          </div>
          <p className="foot">ตัวเลขรัศมี/จำนวนเป็นค่าประมาณตามสภาพแวดล้อม · ต้องสำรวจพื้นที่จริงก่อนออกแบบการติดตั้ง</p>
        </div>
      </section>
    </div>
  );
}
