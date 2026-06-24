import React, { useEffect, useState } from 'react';

// ---------------------------------------------------------------------------
// StoryDeck — เปลี่ยนหน้า "storytelling" (สcroll ยาว) ให้นำเสนอแบบ slide
// โดย "ไม่แตะเนื้อหา" — แค่ครอบ chrome ของ deck เพิ่ม:
//   • จุดไข่ปลาด้านขวา (side dots) — ไฮไลต์สไลด์ปัจจุบัน + กดเลื่อนไปสไลด์ได้
//   • แถบเครื่องมือ: เมนู "ไปสไลด์…" (มีชื่อแต่ละสไลด์ pain/solution/…)
//                    + ปุ่ม "พิมพ์ / บันทึก PDF"
//   • scroll-snap ทีละ section + print CSS (1 section = 1 หน้า PDF)
//
// วิธีใช้: วางไว้ในหน้า story โดยส่ง rootClass (เช่น "ec-story") กับ titles[]
//   ที่ "เรียงตรงกับลำดับ <section> ลูกโดยตรงของ .rootClass"
// titles[i] = { t: 'ชื่อสไลด์', k: 'pain'|'win'|'demo'|'solution'|'how'
//                                  |'divider'|'device'|'proof'|'feature'
//                                  |'package'|'cta'|'appendix' }
// ---------------------------------------------------------------------------

const KIND = {
  pain:     { icon: '🚨', color: '#A32D2D' },
  win:      { icon: '🎯', color: '#0F6E56' },
  demo:     { icon: '🖥️', color: '#BA7517' },
  solution: { icon: '🧭', color: '#0F6E56' },
  how:      { icon: '🔄', color: '#0F6E56' },
  device:   { icon: '🛠️', color: '#BA7517' },
  proof:    { icon: '✅', color: '#3B6D11' },
  feature:  { icon: '⚙️', color: '#0F6E56' },
  package:  { icon: '📦', color: '#BA7517' },
  cta:      { icon: '🚀', color: '#0B5544' },
  divider:  { icon: '◆', color: '#9A958A' },
  appendix: { icon: '📎', color: '#6B6B63' },
};

const PRIMARY = '#0F6E56';
const PRIMARY_DEEP = '#0B5544';
const PRIMARY_HOVER = '#1D9E75';

// ความสูงของ nav (48px) + แถบเครื่องมือ deck (44px)
const OFFSET = 92;

export default function StoryDeck({ rootClass, titles }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(titles.length);

  // ผูก section จริงเข้ากับ id/observer (ไม่ต้องไปแก้ในหน้า story)
  useEffect(() => {
    const root = document.querySelector(`.${rootClass}`);
    if (!root) return;
    const sections = Array.from(root.querySelectorAll(':scope > section'));
    setCount(sections.length);
    sections.forEach((el, i) => {
      el.id = `slide-${i + 1}`;
      el.dataset.idx = String(i);
      el.classList.add('deck-slide');
    });

    // active = section ที่คาบเส้นกึ่งกลางจอ (รองรับสไลด์สูง-เตี้ยไม่เท่ากัน)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = parseInt(e.target.dataset.idx, 10);
            if (!isNaN(idx)) setActive(idx);
          }
        });
      },
      { threshold: 0, rootMargin: '-48% 0px -48% 0px' }
    );
    sections.forEach((el) => observer.observe(el));

    // เปิด scroll-snap เฉพาะตอนหน้านี้ทำงาน แล้วคืนค่าเมื่อออกจากหน้า
    const html = document.documentElement;
    const prevSnap = html.style.scrollSnapType;
    const prevPad = html.style.scrollPaddingTop;
    html.style.scrollSnapType = 'y proximity';
    html.style.scrollPaddingTop = `${OFFSET}px`;

    return () => {
      observer.disconnect();
      html.style.scrollSnapType = prevSnap;
      html.style.scrollPaddingTop = prevPad;
    };
  }, [rootClass]);

  const goTo = (i) => {
    const el = document.getElementById(`slide-${i + 1}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(i);
    setOpen(false);
  };

  const label = (i) => titles[i]?.t || `สไลด์ ${i + 1}`;
  const kindOf = (i) => KIND[titles[i]?.k] || KIND.divider;

  return (
    <>
      <style>{`
        .${rootClass} .deck-slide{
          scroll-snap-align:start; scroll-margin-top:${OFFSET}px;
          min-height:calc(100dvh - ${OFFSET}px);
          display:flex; flex-direction:column; justify-content:center; box-sizing:border-box;
        }
        /* แถบความคืบหน้าเดิมของหน้า story อยู่ที่ top:48px — ดันลงใต้ toolbar */
        .${rootClass} .progress{top:${OFFSET}px !important}

        .story-deck-toolbar{
          position:fixed; top:48px; left:0; right:0; height:44px; z-index:45;
          background:${PRIMARY_DEEP}; color:#fff; display:flex; align-items:center; gap:14px;
          padding:0 16px; font-family:'Sarabun',sans-serif; font-size:13px;
          box-shadow:0 2px 8px rgba(0,0,0,.15);
        }
        .story-deck-toolbar .note{opacity:.75; font-size:12px}
        .story-deck-toolbar button{
          font-family:inherit; background:rgba(255,255,255,.16); color:#fff; border:none;
          padding:6px 14px; border-radius:6px; cursor:pointer; font-size:13px; transition:background .15s;
        }
        .story-deck-toolbar button:hover{background:rgba(255,255,255,.30)}
        .story-deck-menu{
          position:absolute; top:44px; right:12px; min-width:330px; max-height:calc(100dvh - 120px);
          overflow-y:auto; background:#fff; color:#2A2A26; border-radius:10px;
          box-shadow:0 14px 36px rgba(0,0,0,.26); padding:8px; z-index:1100;
        }
        .story-deck-menu button{
          display:flex; align-items:center; gap:10px; width:100%; text-align:left;
          padding:9px 12px; font-size:13px; color:#2A2A26; background:transparent;
          border:none; border-radius:7px; cursor:pointer; font-family:inherit; line-height:1.35;
        }
        .story-deck-menu button:hover{background:#F1EEE3}
        .story-deck-menu button.is-active{background:${PRIMARY}1A; font-weight:700}
        .story-deck-menu .n{font-size:11px; font-weight:700; color:#9A958A; width:20px; flex-shrink:0; text-align:right}
        .story-deck-menu .ic{font-size:15px; flex-shrink:0}

        .story-deck-dots{
          position:fixed; right:max(14px, env(safe-area-inset-right, 14px)); top:calc(50% + 22px);
          transform:translateY(-50%); display:flex; flex-direction:column; gap:8px; z-index:44;
          background:rgba(11,85,68,.42); padding:12px 8px; border-radius:100px;
          max-height:calc(100dvh - 160px); overflow-y:auto; scrollbar-width:none;
        }
        .story-deck-dots::-webkit-scrollbar{display:none}
        .story-deck-dots button{
          display:block; width:9px; height:9px; padding:0; border-radius:50%; cursor:pointer;
          background:rgba(255,255,255,.5); border:1px solid rgba(255,255,255,.65); transition:all .2s ease;
        }
        .story-deck-dots button.is-active{
          width:13px; height:13px; background:#fff; border:2px solid ${PRIMARY_HOVER};
        }
        @media (max-width:932px){ .story-deck-dots{display:none !important} }

        @media print{
          nav, .story-deck-toolbar, .story-deck-dots, .${rootClass} .progress{display:none !important}
          main{padding-top:0 !important}
          html{scroll-snap-type:none !important}
          .${rootClass} .deck-slide{
            min-height:auto !important; display:block !important;
            page-break-after:always; break-after:page;
          }
          @page{size:A4 landscape; margin:10mm}
          *{-webkit-print-color-adjust:exact !important; print-color-adjust:exact !important}
        }
      `}</style>

      {/* แถบเครื่องมือ */}
      <div className="story-deck-toolbar">
        <span style={{ fontWeight: 700, letterSpacing: .3 }}>นำเสนอแบบสไลด์</span>
        <span style={{ flex: 1 }} />
        <span className="note">สไลด์ {active + 1} / {count}</span>
        <button onClick={() => setOpen((v) => !v)}>{open ? 'ปิดเมนู ✕' : 'ไปสไลด์ ▾'}</button>
        <button onClick={() => window.print()}>พิมพ์ / บันทึก PDF</button>
        {open && (
          <div className="story-deck-menu">
            {Array.from({ length: count }).map((_, i) => {
              const k = kindOf(i);
              return (
                <button
                  key={i}
                  type="button"
                  className={i === active ? 'is-active' : ''}
                  onClick={() => goTo(i)}
                >
                  <span className="n">{i + 1}</span>
                  <span className="ic">{k.icon}</span>
                  <span style={{ flex: 1, color: k.color }}>{label(i)}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* จุดไข่ปลาด้านข้าง */}
      <div className="story-deck-dots" role="tablist" aria-label="นำทางสไลด์">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={i === active ? 'is-active' : ''}
            title={`${i + 1} · ${label(i)}`}
            aria-label={`ไปสไลด์ ${i + 1}: ${label(i)}`}
            aria-selected={i === active}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </>
  );
}
