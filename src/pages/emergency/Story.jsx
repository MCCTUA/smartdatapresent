import React, { useEffect, useState } from 'react';

// ---------------------------------------------------------------------------
// emergency/Story.jsx — หน้า /emergency-mgmt แบบ storytelling เส้นเดียว
// (scroll ต่อกัน · ไม่ใช่ deck เด้งทีละสไลด์) · source: emergency-prototype.html
// Design: Civic Trust palette (Forest #0F6E56 + Cream #FAF7EE + Amber #BA7517) + Sarabun
// BRAND: หน้าลูกค้าใช้ "Smart Center Solution Platform" เท่านั้น
//        ห้ามโผล่ ADZOSS / Addergy / Zeroloss / EMCC
// NOTE: ตัด speaker hint / โน้ตภายในออกทั้งหมด — ไม่ render ขึ้นหน้าเว็บ
// ---------------------------------------------------------------------------

const BASE = import.meta.env.BASE_URL;
const IMG = `${BASE}images/emergency-mgmt`;

// ---------------------------------------------------------------------------
// Demo modal — เปิดระบบจริงจาก public/ui/emergency_app.html
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
        padding: 'clamp(12px, 3vw, 24px)', animation: 'emFade .2s ease',
      }}
    >
      <style>{`@keyframes emFade{from{opacity:0}to{opacity:1}}`}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(440px, 100%)', height: 'min(860px, 100%)',
          background: '#FFF', borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column',
        }}
      >
        <div style={{ flexShrink: 0, background: 'var(--em-primary-deep)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px' }}>
          <b style={{ fontSize: 15 }}>🖥️ ตัวอย่างระบบจริง — ศูนย์บัญชาการเหตุฉุกเฉิน</b>
          <button
            onClick={onClose}
            aria-label="ปิด"
            style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, padding: '7px 16px', borderRadius: 8 }}
          >
            ปิด ✕
          </button>
        </div>
        <iframe
          src={`${BASE}ui/emergency_app.html`}
          title="ตัวอย่างระบบ — ศูนย์บัญชาการเหตุฉุกเฉิน"
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

      .em-story{
        --em-primary:#0F6E56; --em-primary-hover:#1D9E75; --em-primary-deep:#0B5544; --em-primary-soft:#E5F0EA;
        --em-accent:#BA7517; --em-accent-soft:#FAEEDA; --em-alert:#A32D2D; --em-alert-soft:#FCEBEB;
        --em-success:#3B6D11; --em-success-soft:#EAF3DD;
        --em-cream:#FAF7EE; --em-surface:#FFFFFF; --em-surface-soft:#EFE9DA;
        --em-text:#2A2A26; --em-text-muted:#6B6B63; --em-line:#E4DECF; --em-maxw:1080px;
        font-family:'Sarabun',sans-serif; color:var(--em-text); background:var(--em-cream);
        line-height:1.6; -webkit-font-smoothing:antialiased;
      }
      .em-story img{display:block;max-width:100%}
      .em-story .wrap{max-width:var(--em-maxw);margin:0 auto;padding:0 24px}

      .em-story .progress{position:fixed;top:48px;left:0;height:4px;background:var(--em-primary);width:0;z-index:60;transition:width .1s linear}

      .em-story section{padding:84px 0;border-bottom:1px solid var(--em-line);position:relative}
      .em-story section.dark{background:linear-gradient(135deg,var(--em-primary-deep),var(--em-primary));color:#fff;border-bottom:none}
      .em-story .eyebrow{display:inline-block;font-size:14px;font-weight:700;letter-spacing:.5px;color:var(--em-primary);
        background:var(--em-primary-soft);padding:6px 16px;border-radius:100px;margin-bottom:18px}
      .em-story .eyebrow.alert{color:var(--em-alert);background:var(--em-alert-soft)}
      .em-story .eyebrow.accent{color:var(--em-accent);background:var(--em-accent-soft)}
      .em-story .dark .eyebrow{color:#fff;background:rgba(255,255,255,.16)}
      .em-story h1{font-size:clamp(30px,5vw,52px);font-weight:800;line-height:1.18;letter-spacing:-.5px;color:var(--em-primary-deep)}
      .em-story .dark h1,.em-story .dark h2{color:#fff}
      .em-story h2{font-size:clamp(26px,4vw,40px);font-weight:800;line-height:1.22;letter-spacing:-.4px;color:var(--em-primary-deep)}
      .em-story .lead{font-size:clamp(17px,2vw,20px);color:var(--em-text-muted);max-width:780px;margin-top:16px}
      .em-story .dark .lead{color:rgba(255,255,255,.9)}
      .em-story .stepno{font-size:13px;font-weight:700;color:var(--em-accent);letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;display:block}

      .em-story .grid{display:grid;gap:18px;margin-top:34px}
      .em-story .g3{grid-template-columns:repeat(3,1fr)}
      .em-story .g4{grid-template-columns:repeat(4,1fr)}
      @media(max-width:860px){.em-story .g3,.em-story .g4{grid-template-columns:1fr 1fr}}
      @media(max-width:560px){.em-story .g3,.em-story .g4{grid-template-columns:1fr}}
      .em-story .card{background:#fff;border:1px solid var(--em-line);border-radius:18px;padding:24px;box-shadow:0 4px 18px rgba(15,110,86,.05)}
      .em-story .card .ic{font-size:34px;line-height:1;margin-bottom:12px}
      .em-story .card h3{font-size:18px;font-weight:800;color:var(--em-primary-deep);margin-bottom:7px;line-height:1.3}
      .em-story .card p{font-size:14.5px;color:var(--em-text-muted);line-height:1.55}
      .em-story .card.hi{border:2px solid var(--em-primary)}

      .em-story .who{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:34px}
      @media(max-width:860px){.em-story .who{grid-template-columns:1fr}}
      .em-story .who .card{position:relative;overflow:hidden}
      .em-story .who .tag{display:inline-block;font-size:13px;font-weight:700;color:#fff;background:var(--em-primary);
        padding:4px 14px;border-radius:100px;margin-bottom:12px}
      .em-story .who .tag.b{background:var(--em-accent)} .em-story .who .tag.c{background:#4A7C59}
      .em-story .who ul{list-style:none;margin-top:6px}
      .em-story .who li{font-size:14px;color:var(--em-text);padding:5px 0 5px 24px;position:relative;line-height:1.5}
      .em-story .who li::before{content:'✓';position:absolute;left:0;color:var(--em-success);font-weight:800}

      .em-story .flow{display:flex;align-items:stretch;gap:0;margin-top:34px;flex-wrap:wrap}
      .em-story .flow .step{flex:1;min-width:150px;background:#fff;border:1.5px solid var(--em-primary);border-radius:16px;
        padding:18px 14px;text-align:center;position:relative}
      .em-story .flow .step.hi{border:3px solid var(--em-accent);background:var(--em-accent-soft)}
      .em-story .flow .step .fic{font-size:30px;margin-bottom:8px}
      .em-story .flow .step b{display:block;font-size:16px;color:var(--em-primary-deep);margin-bottom:4px}
      .em-story .flow .step span{font-size:12.5px;color:var(--em-text-muted)}
      .em-story .flow .arr{display:flex;align-items:center;justify-content:center;color:var(--em-primary);font-size:24px;font-weight:800;padding:0 6px}
      @media(max-width:680px){.em-story .flow .arr{transform:rotate(90deg);width:100%;padding:4px 0}}

      .em-story .media{margin-top:30px;background:#fff;border:1px solid var(--em-line);border-radius:20px;padding:14px;
        display:flex;align-items:center;justify-content:center}
      .em-story .media img{width:100%;height:auto;border-radius:12px;object-fit:contain}

      .em-story .demobar{margin-top:34px;background:var(--em-primary-deep);border-radius:20px;padding:30px 32px;color:#fff;
        display:flex;align-items:center;gap:24px;flex-wrap:wrap}
      .em-story .demobar .txt{flex:1;min-width:240px}
      .em-story .demobar h3{font-size:22px;font-weight:800;margin-bottom:6px}
      .em-story .demobar p{font-size:15px;color:rgba(255,255,255,.85)}
      .em-story .btn{display:inline-flex;align-items:center;gap:10px;background:var(--em-accent);color:#fff;border:none;cursor:pointer;
        font-family:inherit;font-size:17px;font-weight:700;padding:15px 30px;border-radius:14px;transition:.2s;text-decoration:none}
      .em-story .btn:hover{background:#9c6113;transform:translateY(-2px)}
      .em-story .btn.ghost{background:transparent;border:2px solid #fff}
      .em-story .btn.ghost:hover{background:rgba(255,255,255,.12)}

      .em-story .pkg{background:#fff;border:2px solid var(--em-primary);border-radius:20px;padding:30px;margin-top:34px}
      .em-story .pkg table{width:100%;border-collapse:collapse;margin-top:10px}
      .em-story .pkg th,.em-story .pkg td{text-align:left;padding:12px 10px;border-bottom:1px dashed var(--em-line);font-size:15px;vertical-align:top}
      .em-story .pkg th{font-size:13px;color:var(--em-text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.5px}
      .em-story .pkg td.it b{color:var(--em-primary-deep)}
      .em-story .pkg td.it span{display:block;font-size:13px;color:var(--em-text-muted);margin-top:2px}
      .em-story .pkg .next{margin-top:18px;background:var(--em-accent-soft);border-radius:12px;padding:16px 18px}
      .em-story .pkg .next b{color:var(--em-accent)}
      .em-story .pkg .next ul{margin:8px 0 0 0;list-style:none}
      .em-story .pkg .next li{font-size:14px;padding:4px 0 4px 22px;position:relative;color:var(--em-text)}
      .em-story .pkg .next li::before{content:'＋';position:absolute;left:0;color:var(--em-accent);font-weight:800}
      .em-story .pill{display:inline-block;background:var(--em-success-soft);color:var(--em-success);font-weight:700;font-size:15px;
        padding:8px 18px;border-radius:100px;margin-top:18px}

      .em-story .foot{font-size:12.5px;color:var(--em-text-muted);font-style:italic;margin-top:20px}
      .em-story .dark .foot{color:rgba(255,255,255,.7)}

      .em-story .divider{background:var(--em-primary-deep);text-align:center;padding:70px 0;border-bottom:none}
      .em-story .divider .num{font-size:15px;font-weight:700;letter-spacing:3px;color:var(--em-accent);text-transform:uppercase}
      .em-story .divider h2{color:#fff;margin-top:10px;font-size:clamp(30px,5vw,46px)}
      .em-story .divider p{color:rgba(255,255,255,.82);font-size:17px;margin-top:12px;max-width:700px;margin-left:auto;margin-right:auto}
      .em-story .divider.appendix{background:#2A2A26}

      .em-story .story{margin-top:34px;background:#fff;border:2px solid var(--em-primary);border-radius:20px;padding:30px 32px}
      .em-story .story .badge{display:inline-block;font-size:13px;font-weight:700;color:#fff;background:var(--em-primary);padding:5px 16px;border-radius:100px;margin-bottom:14px}
      .em-story .story h3{font-size:24px;font-weight:800;color:var(--em-primary-deep);line-height:1.3;margin-bottom:12px}
      .em-story .story p{font-size:15.5px;color:var(--em-text);line-height:1.7}
      .em-story .story .yrs{display:flex;gap:24px;flex-wrap:wrap;margin-top:18px}
      .em-story .story .yrs .y{text-align:center}
      .em-story .story .yrs .y b{display:block;font-size:30px;font-weight:800;color:var(--em-accent)}
      .em-story .story .yrs .y span{font-size:13px;color:var(--em-text-muted)}
    `}</style>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function EmergencyStory() {
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
    <div className="em-story">
      <StoryStyles />
      <div className="progress" style={{ width: `${progress}%` }} />
      {demo && <DemoModal onClose={() => setDemo(false)} />}

      {/* ============ HERO / HOOK ============ */}
      <section className="dark" style={{ paddingTop: 70, paddingBottom: 78 }}>
        <div className="wrap">
          <span className="eyebrow">เริ่มจากเรื่องที่เราได้ยินมาจากหน้างาน</span>
          <h1>
            "พอเกิดเหตุ ทุกวินาทีคือความปลอดภัย —<br />
            แต่กว่าจะรู้ กว่าจะสั่งการ กว่าจะไปถึง..."
          </h1>
          <p className="lead">
            เราคุยกับหน่วยงานที่ต้องรับมือเหตุฉุกเฉิน แล้วเจอเรื่องเดียวกัน — ประชาชนแจ้งเข้ามาหลายทาง รับไม่ทัน
            แต่ละกองมีข้อมูลคนละชุด ประสานงานสับสน และพอจบเหตุก็ไม่มีบันทึกไว้ทำรายงาน
            วันนี้เราอยากเล่าว่า ศูนย์บัญชาการเหตุฉุกเฉินที่ "รับเร็ว สั่งตรง ตามได้จนจบ" เป็นจริงได้ — และเราทำมาแล้วจริง
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button className="btn" onClick={() => setDemo(true)}>ดูระบบจริงเลย (กดเล่นได้) →</button>
          </div>
        </div>
      </section>

      {/* ============ องก์ 1 — 3 ฝ่ายได้อะไร ============ */}
      <section style={{ background: 'var(--em-cream)' }}>
        <div className="wrap">
          <span className="stepno">องก์ 1 · ทำไมเรื่องนี้ถึงสำคัญกับท่าน</span>
          <h2>ศูนย์บัญชาการที่ "เห็นภาพเดียวกัน" = ทุกฝ่ายทำงานประสานกัน</h2>
          <p className="lead">ไม่ใช่แค่รับแจ้งเหตุ แต่ทำให้ผู้บริหารสั่งการได้มั่นใจ เจ้าหน้าที่ทำงานไม่สับสน และประชาชนปลอดภัยขึ้น</p>
          <div className="who">
            <div className="card">
              <span className="tag">ผู้บริหารท้องถิ่น</span>
              <h3>สั่งการเชิงรุก เห็นภาพรวมทั้งเหตุการณ์</h3>
              <ul>
                <li>เห็นทุกเหตุบนหน้าจอเดียว ตัดสินใจสั่งการได้เร็วและมั่นใจ</li>
                <li>บริหารทรัพยากร-กำลังคนได้ตรงจุด ลดความสูญเสีย</li>
                <li>มีบันทึกครบทุกเหตุ ใช้ถอดบทเรียนและวางแผนป้องกัน</li>
              </ul>
            </div>
            <div className="card">
              <span className="tag c">เจ้าหน้าที่ (ปภ./ช่าง/สาธารณสุข)</span>
              <h3>ทำงานประสานกัน ไม่สับสน ไม่ตกหล่น</h3>
              <ul>
                <li>ทุกกองเห็นข้อมูลชุดเดียวกัน สื่อสารตรงกัน</li>
                <li>รับเหตุ-ส่งต่อ-อัปเดตสถานะในระบบเดียว ตามงานได้</li>
                <li>รู้ว่าใครรับผิดชอบอะไร ไม่ทำงานซ้ำซ้อน</li>
              </ul>
            </div>
            <div className="card">
              <span className="tag b">ประชาชน</span>
              <h3>แจ้งง่าย ช่วยถึงตัวเร็วขึ้น</h3>
              <ul>
                <li>แจ้งเหตุได้หลายช่องทางที่คุ้นเคย ไม่ตกหล่น</li>
                <li>เหตุได้รับการตอบสนองเร็วขึ้น ทุกวินาทีมีค่า</li>
                <li>อุ่นใจว่าเมืองมีระบบรับมือเหตุฉุกเฉินจริง</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ องก์ 2 — DEMO ก่อน ============ */}
      <section className="dark">
        <div className="wrap">
          <span className="eyebrow">เห็นของจริงก่อน เดี๋ยวค่อยลงรายละเอียด</span>
          <h2>หน้าจอศูนย์บัญชาการเหตุฉุกเฉิน — เปิดดูได้เลย</h2>
          <p className="lead">นี่คือระบบจริงที่เจ้าหน้าที่ใช้รับเหตุ สั่งการ และติดตามสถานะ — กดเข้าไปเล่นได้เลย</p>
          <div className="demobar">
            <div className="txt">
              <h3>🖥️ ตัวอย่างระบบศูนย์บัญชาการ</h3>
              <p>ดูว่าเวลามีเหตุเข้ามา หน้าจอรับแจ้ง · สั่งการ · ติดตามสถานะ เป็นอย่างไร</p>
            </div>
            <button className="btn" onClick={() => setDemo(true)}>▶ เปิดระบบจริง (กดเล่นได้)</button>
          </div>
        </div>
      </section>

      {/* ============ องก์ 3 — ภาพรวม 3 เสา ============ */}
      <section>
        <div className="wrap">
          <span className="stepno">องก์ 3 · สรุปสั้น ๆ ระบบนี้คืออะไร</span>
          <h2>เข้าใจทั้งระบบใน 3 ข้อ — ศูนย์ข้อมูลกลางของเมือง</h2>
          <p className="lead">เราไม่ได้ขายแค่ "แอปรับเรื่อง" — เราขาย "ศูนย์บัญชาการที่รวมข้อมูลทุกกองให้เห็นภาพเดียวกัน"</p>
          <div className="grid g3">
            <div className="card hi"><div className="ic">📥</div><h3>1 · รับ — ทุกช่องทางเข้าที่เดียว</h3>
              <p>ประชาชนแจ้งมาทางไหน (โทร · LINE · เดินมาแจ้ง · เซนเซอร์) ก็รวมเข้าระบบเดียว ไม่ตกหล่น มีสถานะทุกเรื่อง</p></div>
            <div className="card hi"><div className="ic">🔎</div><h3>2 · สั่ง — คัดกรอง + ส่งต่อให้ถูกหน่วย</h3>
              <p>คัดกรองความรุนแรง ส่งต่อให้กองที่รับผิดชอบ ทุกฝ่ายเห็นข้อมูลชุดเดียวกัน สั่งการตรงจุด</p></div>
            <div className="card hi"><div className="ic">📊</div><h3>3 · ตาม — อัปเดตสถานะจนปิดเหตุ</h3>
              <p>ติดตามสถานะแบบเรียลไทม์จนจบเหตุ บันทึกครบว่าใครทำอะไรเมื่อไร ใช้ทำรายงานและถอดบทเรียน</p></div>
          </div>
        </div>
      </section>

      {/* ============ องก์ 4 — flow ============ */}
      <section style={{ background: 'var(--em-cream)' }}>
        <div className="wrap">
          <span className="stepno">องก์ 4 · ทำงานอย่างไร</span>
          <h2>ตั้งแต่รับแจ้ง จนปิดเหตุ — เส้นทางของเหตุการณ์</h2>
          <p className="lead">ทุกเหตุวิ่งตามเส้นทางเดียวกัน มีผู้รับผิดชอบทุกขั้น ติดตามได้ตลอด</p>
          <div className="flow">
            <div className="step"><div className="fic">📥</div><b>รับแจ้ง</b><span>หลายช่องทาง รวมเข้าศูนย์</span></div>
            <div className="arr">→</div>
            <div className="step"><div className="fic">🔎</div><b>คัดกรอง</b><span>ประเมินความรุนแรง</span></div>
            <div className="arr">→</div>
            <div className="step hi"><div className="fic">📣</div><b>สั่งการ/ส่งต่อ</b><span>ให้กองที่รับผิดชอบ</span></div>
            <div className="arr">→</div>
            <div className="step"><div className="fic">🚒</div><b>หน่วยเข้าระงับ</b><span>ทีมไปถึงจุดเกิดเหตุ</span></div>
            <div className="arr">→</div>
            <div className="step"><div className="fic">✅</div><b>ปิดเหตุ + บันทึก</b><span>สรุป + รายงาน</span></div>
          </div>
          <div className="media" style={{ maxWidth: 880, marginLeft: 'auto', marginRight: 'auto' }}>
            <img src={`${IMG}/diagrams/flow_3_emergency.svg`} alt="ผังการทำงานเหตุฉุกเฉิน: รับแจ้ง → คัดกรอง → สั่งการ → ระงับเหตุ → ปิดเหตุ" />
          </div>
        </div>
      </section>

      {/* ============ DIVIDER: ผลงานจริง ============ */}
      <section className="divider">
        <div className="wrap">
          <div className="num">— ทำมาแล้วจริง ใช้งานต่อเนื่อง —</div>
          <h2>ไม่ใช่ระบบที่เพิ่งเริ่ม — เราดูแลศูนย์เหตุฉุกเฉินจริงมากว่า 10 ปี</h2>
          <p>ก่อนจะคุยเรื่องแพ็กเกจ ขอเล่าผลงานจริงที่พิสูจน์ว่าระบบนี้ใช้งานได้จริงในระยะยาว</p>
        </div>
      </section>

      {/* ============ องก์ 5 — Reference case มาบตาพุด/EIC ============ */}
      <section>
        <div className="wrap">
          <span className="eyebrow">ผลงานอ้างอิง (Reference case)</span>
          <h2>ศูนย์บัญชาการเหตุฉุกเฉิน เทศบาลนครมาบตาพุด</h2>
          <div className="story">
            <span className="badge">เรื่องจริง · ใช้งานต่อเนื่องถึงปัจจุบัน</span>
            <h3>จากโครงการป้องกันและบริหารเหตุฉุกเฉิน สู่ศูนย์ EIC ที่ยังเดินด้วยซอฟต์แวร์ของเรา</h3>
            <p>
              เมื่อราว 10 ปีก่อน ศูนย์เฝ้าระวังและควบคุมคุณภาพสิ่งแวดล้อมของการนิคมอุตสาหกรรม มาบตาพุด
              ได้จัดทำโครงการป้องกันและบริหารเหตุฉุกเฉิน และนำเสนอต่อเทศบาลเมืองมาบตาพุด (ในขณะนั้น) —
              <strong style={{ color: 'var(--em-primary)' }}> ทีมเราเป็นผู้พัฒนาซอฟต์แวร์ให้กับศูนย์นี้</strong>
              ต่อมาศูนย์ได้พัฒนาและเปลี่ยนชื่อเป็น
              <strong style={{ color: 'var(--em-primary)' }}> EIC — ศูนย์บัญชาการตอบโต้สถานการณ์ฉุกเฉินและกระจายข่าว</strong>
              ของเทศบาลนครมาบตาพุดในปัจจุบัน และยังคงใช้ซอฟต์แวร์ของเรามาอย่างต่อเนื่องจนถึงทุกวันนี้
            </p>
            <div className="yrs">
              <div className="y"><b>~10</b><span>ปีที่ใช้งานต่อเนื่อง</span></div>
              <div className="y"><b>EIC</b><span>ศูนย์บัญชาการเหตุฉุกเฉิน · ทน.มาบตาพุด</span></div>
              <div className="y"><b>นิคม+เมือง</b><span>ประสบการณ์พื้นที่เสี่ยงสูง</span></div>
            </div>
          </div>
          <p className="foot">ชื่อหน่วยงานอ้างอิงใช้โดยการยืนยันของเจ้าของโครงการ · รายละเอียดเชิงเทคนิคของแต่ละพื้นที่แตกต่างกันตามบริบท</p>
        </div>
      </section>

      {/* ============ DIVIDER: แพ็กเกจ ============ */}
      <section className="divider">
        <div className="wrap">
          <div className="num">— เริ่มได้ตามบริบทพื้นที่ —</div>
          <h2>เลือกระดับการใช้งานให้พอดีกับเมืองของท่าน</h2>
          <p>เริ่มจากรับแจ้งเหตุก่อน แล้วต่อยอดเฝ้าระวังสิ่งแวดล้อม หรือบัญชาการเหตุใหญ่ได้</p>
        </div>
      </section>

      {/* ============ องก์ 6 — แพ็กเกจ (ไม่มีราคา) ============ */}
      <section>
        <div className="wrap">
          <span className="stepno">องก์ 6 · "แล้วเริ่มต้นได้อะไรบ้าง?"</span>
          <h2>3 ระดับ — เริ่มเล็กก่อน ต่อยอดได้ ไม่ต้องรื้อ</h2>
          <div className="pkg">
            <table>
              <thead><tr><th style={{ width: '24%' }}>ระดับ</th><th style={{ width: '40%' }}>เหมาะกับ</th><th>ได้อะไร</th></tr></thead>
              <tbody>
                <tr><td className="it"><b>📦 Starter</b><span>รับแจ้งเหตุ</span></td><td>เมือง/ตำบลทั่วไป เริ่มจัดระบบรับเรื่อง</td><td>รับแจ้งหลายช่องทาง · คัดกรอง · ส่งต่อ · ติดตามสถานะ · บันทึกครบ</td></tr>
                <tr><td className="it"><b>📡 Eco-Monitor</b><span>+ เฝ้าระวังสิ่งแวดล้อม</span></td><td>พื้นที่มีปัญหาฝุ่น/อากาศ/น้ำ</td><td>Starter + เซนเซอร์สิ่งแวดล้อม · แจ้งเตือนค่าเกินเกณฑ์อัตโนมัติ</td></tr>
                <tr><td className="it"><b>🚒 Emergency</b><span>บัญชาการเหตุใหญ่</span></td><td>พื้นที่เสี่ยงสูง/มีนิคม/เหตุซับซ้อน</td><td>Eco-Monitor + บัญชาการเหตุ · ข้อมูลสารเคมีหน้างาน · ประสานหลายหน่วย</td></tr>
              </tbody>
            </table>
            <span className="pill">💡 เริ่มจากระดับที่พอดีกับงบและความเสี่ยงของพื้นที่ — ขยับขึ้นได้ภายหลัง</span>
            <div className="next">
              <b>＋ ต่อยอดทีหลังได้ (ไม่ต้องรื้อของเดิม):</b>
              <ul>
                <li>ต่อยอดกล้อง CCTV เดิมให้เข้าระบบบัญชาการ</li>
                <li>เพิ่มจุดเซนเซอร์เฝ้าระวัง (อากาศ · น้ำ · สารเคมี)</li>
                <li>เชื่อมข้อมูลข้ามกอง/ข้ามหน่วยงานบนแพลตฟอร์มเดียว</li>
              </ul>
            </div>
          </div>
          <p className="foot">รายการและจำนวนปรับตามผลสำรวจพื้นที่จริง · ทีมงานช่วยจัดระดับให้พอดีงบและบริบทของแต่ละหน่วยงาน</p>
        </div>
      </section>

      {/* ============ องก์ 7 — เริ่มอย่างไร + CTA ============ */}
      <section className="dark">
        <div className="wrap">
          <span className="eyebrow">ขั้นต่อไป ไม่ต้องตัดสินใจวันนี้</span>
          <h2>เริ่มอย่างไร — 4 ขั้น ไม่ผูกมัด</h2>
          <p className="lead">เริ่มจากระดับที่เห็นผลจริงก่อน แล้วค่อยขยายเมื่อมั่นใจ</p>
          <div className="grid g4">
            <div className="card" style={{ background: 'rgba(255,255,255,.95)' }}><div className="ic">📍</div><h3>1 · สำรวจ + ประเมินความเสี่ยง</h3><p>ดูช่องทางรับแจ้งเดิม จุดเสี่ยงในพื้นที่ เลือกระดับที่เหมาะ</p></div>
            <div className="card" style={{ background: 'rgba(255,255,255,.95)' }}><div className="ic">🌱</div><h3>2 · เริ่มระดับ Starter</h3><p>จัดระบบรับแจ้ง-คัดกรอง-ส่งต่อให้เข้าที่ก่อน เห็นผลจริง</p></div>
            <div className="card" style={{ background: 'rgba(255,255,255,.95)' }}><div className="ic">🔄</div><h3>3 · ดูผล &amp; ปรับ</h3><p>ทบทวนเหตุที่ผ่านระบบ ปรับขั้นตอนให้เหมาะหน่วยงานท่าน</p></div>
            <div className="card" style={{ background: 'rgba(255,255,255,.95)' }}><div className="ic">📈</div><h3>4 · ต่อยอดตามความเสี่ยง</h3><p>เพิ่มเฝ้าระวังสิ่งแวดล้อม/บัญชาการเหตุใหญ่ ไม่ต้องรื้อ</p></div>
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
          <p>ภาพรวมระบบ · 4 เฟสการทำงาน · ความปลอดภัยตอนระงับเหตุ (Chem Hub) — เปิดดูเฉพาะตอนอยากดูรายละเอียดเชิงลึก</p>
        </div>
      </section>

      {/* ============ APPENDIX A — system overview + 4 phases ============ */}
      <section>
        <div className="wrap">
          <span className="eyebrow accent">ภาคผนวก A</span>
          <h2>ภาพรวมระบบ + 4 เฟสการทำงาน</h2>
          <div className="media" style={{ maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}><img src={`${IMG}/diagrams/flow_6_system_overview.svg`} alt="ภาพรวมสถาปัตยกรรมระบบบริหารเหตุฉุกเฉิน" /></div>
          <div className="media" style={{ maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}><img src={`${IMG}/diagrams/flow_7_four_phases.svg`} alt="4 เฟสการทำงาน: ป้องกัน · เตรียมพร้อม · เผชิญเหตุ · ฟื้นฟู" /></div>
        </div>
      </section>

      {/* ============ APPENDIX B — Chem Hub ============ */}
      <section style={{ background: 'var(--em-cream)' }}>
        <div className="wrap">
          <span className="eyebrow accent">ภาคผนวก B · เฉพาะพื้นที่มีโรงงาน/นิคม</span>
          <h2>Chem Hub — ความปลอดภัยตอนเข้าระงับเหตุ</h2>
          <p className="lead">เปิดข้อมูลสารเคมีหน้างานได้ทันที (CAS / UN / Class / ชุดป้องกัน / รัศมีอพยพ / ปฐมพยาบาล) — สิ่งที่ระบบรับเรื่องทั่วไปไม่มี</p>
          <div className="media" style={{ maxWidth: 820, marginLeft: 'auto', marginRight: 'auto' }}><img src={`${IMG}/chem_hub.png`} alt="Chem Hub — ข้อมูลสารเคมีสำหรับเจ้าหน้าที่ตอนเข้าระงับเหตุ" /></div>
          <p className="foot">เหมาะกับพื้นที่ EEC / มีนิคมอุตสาหกรรม · ข้อมูลอ้างอิงมาตรฐานสากล</p>
        </div>
      </section>
    </div>
  );
}
