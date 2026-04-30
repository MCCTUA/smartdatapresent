import React from 'react';
import { Link } from 'react-router-dom';

const PRIMARY = '#0F6E56';

const groups = [
  {
    title: 'ผลิตภัณฑ์',
    links: [
      { to: '/smart-street-light', label: 'Smart Street Light' },
      { to: '/solar-street-light', label: 'Solar Street Light' },
      { to: '/waste-fee', label: 'ค่าธรรมเนียมขยะ' },
      { to: '/cctv-ai', label: 'CCTV + AI' },
      { to: '/elderly-care', label: 'ดูแลผู้สูงอายุ' },
    ],
  },
  {
    title: 'มาตรฐานอ้างอิง',
    items: [
      'มอก. 2954-2562',
      'มอก. 1955-2551',
      'IES LM-79 / LM-80',
      'CIE 140 · EN 13201',
      'TIS · IEC 62386',
    ],
  },
  {
    title: 'ติดต่อ',
    items: [
      { label: 'mcctua2@gmail.com', href: 'mailto:mcctua2@gmail.com' },
      { label: 'ขอออกแบบ DIALux ฟรี', href: 'mailto:mcctua2@gmail.com?subject=ขอออกแบบ%20DIALux%20ฟรี' },
      { label: 'ขอใบเสนอราคา', href: 'mailto:mcctua2@gmail.com?subject=ขอใบเสนอราคา' },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="py-14 px-6"
      style={{
        background: '#0B5544',
        color: 'rgba(255,255,255,0.72)',
        fontFamily: "'Sarabun', system-ui, sans-serif",
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="6" fill={PRIMARY} />
                <path d="M8 14h12M14 8v12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span className="text-white text-[15px] font-semibold tracking-wide">Smart B2G</span>
            </div>
            <p className="text-[12px] leading-relaxed text-white/60">
              เทคโนโลยีไทย — เพื่อหน่วยงานท้องถิ่นไทย ทั้ง อบต. เทศบาลตำบล เทศบาลเมือง เทศบาลนคร และโครงการเอกชน
            </p>
          </div>

          {/* Products */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-3 text-white/85" style={{ letterSpacing: '1.5px' }}>
              {groups[0].title}
            </div>
            <div className="flex flex-col gap-2">
              {groups[0].links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-[12px] no-underline text-white/65 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Standards */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-3 text-white/85" style={{ letterSpacing: '1.5px' }}>
              {groups[1].title}
            </div>
            <div className="flex flex-col gap-2">
              {groups[1].items.map((item, i) => (
                <span key={i} className="text-[12px] text-white/65">{item}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-3 text-white/85" style={{ letterSpacing: '1.5px' }}>
              {groups[2].title}
            </div>
            <div className="flex flex-col gap-2">
              {groups[2].items.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="text-[12px] no-underline text-white/65 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
        >
          <p className="text-[11px] text-white/50">© 2026 Smart B2G · All rights reserved.</p>
          <p className="text-[11px] text-white/50">เทคโนโลยีไทย · ทีมพัฒนาในประเทศ · พร้อมสนับสนุนหลังการขาย</p>
        </div>
      </div>
    </footer>
  );
}
