import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'หน้าหลัก' },
  { to: '/smart-street-light', label: 'Smart Street Light' },
  { to: '/solar-street-light', label: 'Solar Street Light' },
  { to: '/waste-fee', label: 'ค่าธรรมเนียมขยะ' },
  { to: '/cctv-ai', label: 'CCTV + AI' },
  { to: '/smart-traffic', label: 'Smart Traffic' },
  { to: '/elderly-care', label: 'ดูแลผู้สูงอายุ' },
];

// Civic Trust palette (sync with index.css)
const PRIMARY = '#0F6E56';
const TEXT = '#1F2A24';

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-12"
        style={{
          background: 'rgba(31, 42, 36, 0.92)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          fontFamily: "'Sarabun', system-ui, sans-serif",
        }}
      >
        <div className="max-w-[1200px] mx-auto h-full flex items-center px-4 sm:px-6 gap-3">
          <button
            className="md:hidden text-white text-2xl leading-none p-2 -ml-2"
            onClick={() => setOpen(true)}
            aria-label="เปิดเมนู"
          >
            ☰
          </button>

          <Link to="/" className="no-underline flex items-center gap-2">
            <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="6" fill={PRIMARY} />
              <path d="M8 14h12M14 8v12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="text-white text-[13px] font-semibold tracking-wide hidden sm:inline">
              Smart B2G
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-5 ml-auto">
            {links.map((link) => {
              // Section-aware active: sub-routes like /cctv-ai/public-area-watch
              // should highlight the parent /cctv-ai link
              const active = link.to === '/'
                ? pathname === '/'
                : pathname === link.to || pathname.startsWith(link.to + '/');
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-[12.5px] no-underline transition-colors duration-150"
                  style={{
                    color: active ? '#FFF' : 'rgba(255,255,255,0.78)',
                    fontWeight: active ? 600 : 500,
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = '#FFF'; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.78)'; }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[999] overflow-y-auto"
          style={{
            background: 'rgba(11, 85, 68, 0.97)',
            fontFamily: "'Sarabun', system-ui, sans-serif",
          }}
        >
          <button
            className="absolute top-3 right-5 text-white text-3xl leading-none p-2 z-10"
            onClick={() => setOpen(false)}
            aria-label="ปิดเมนู"
          >
            ✕
          </button>
          <div className="flex flex-col items-start gap-1 pt-14 pb-6 px-6">
            {links.map((link) => {
              const active = link.to === '/'
                ? pathname === '/'
                : pathname === link.to || pathname.startsWith(link.to + '/');
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="text-[18px] no-underline font-medium py-2 w-full"
                  style={{ color: active ? '#9FE1CB' : '#FFF' }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
