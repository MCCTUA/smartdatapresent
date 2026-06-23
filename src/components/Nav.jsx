import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'หน้าหลัก' },
  { to: '/about', label: 'แนะนำตัว' },
  { to: '/overview', label: 'ภาพรวม' },
  { to: '/smart-street-light', label: 'Smart Street Light' },
  { to: '/waste-fee', label: 'ค่าธรรมเนียมขยะ' },
  { to: '/smart-traffic', label: 'Smart Traffic' },
  { to: '/elderly-care', label: 'ดูแลผู้สูงอายุ' },
  {
    label: 'อื่นๆ',
    children: [
      { to: '/cctv-ai', label: 'CCTV + AI' },
      { to: '/solar-street-light', label: 'Solar Street Light' },
      { to: '/elderly-care/legacy', label: 'ดูแลผู้สูงอายุ (เวอร์ชันเดิม)' },
      { to: '/smart-street-light/legacy', label: 'Smart Street Light (เวอร์ชันเดิม)' },
      { to: '/emergency-mgmt', label: 'บริหารเหตุฉุกเฉิน' },
    ],
  },
];

// Civic Trust palette (sync with index.css)
const PRIMARY = '#0F6E56';

// Section-aware active: sub-routes like /cctv-ai/public-area-watch highlight
// their parent /cctv-ai link. Home only matches exactly.
function isActive(pathname, to) {
  if (to === '/') return pathname === '/';
  return pathname === to || pathname.startsWith(to + '/');
}

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false); // mobile overlay
  const [dropOpen, setDropOpen] = useState(false); // desktop "อื่นๆ" dropdown
  const dropRef = useRef(null);

  // Close desktop dropdown on outside click
  useEffect(() => {
    if (!dropOpen) return;
    const onClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [dropOpen]);

  // Close dropdown when the route changes
  useEffect(() => { setDropOpen(false); }, [pathname]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-12"
        style={{
          // Solid (near-opaque) background — NO backdrop-filter.
          // A position:fixed element with backdrop-filter:blur() triggers an
          // iOS/iPadOS Safari compositing bug that makes the whole page
          // shimmer/jitter during scroll and pinch-zoom.
          background: 'rgba(31, 42, 36, 0.97)',
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
              if (link.children) {
                const groupActive = link.children.some((c) => isActive(pathname, c.to));
                return (
                  <div
                    key={link.label}
                    ref={dropRef}
                    className="relative"
                    onMouseEnter={() => setDropOpen(true)}
                    onMouseLeave={() => setDropOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setDropOpen((v) => !v)}
                      className="text-[12.5px] bg-transparent border-none cursor-pointer transition-colors duration-150 flex items-center gap-1"
                      style={{
                        color: groupActive || dropOpen ? '#FFF' : 'rgba(255,255,255,0.78)',
                        fontWeight: groupActive ? 600 : 500,
                        fontFamily: 'inherit',
                      }}
                      aria-haspopup="true"
                      aria-expanded={dropOpen}
                    >
                      {link.label}
                      <span style={{ fontSize: 9, lineHeight: 1, transform: dropOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>▾</span>
                    </button>
                    {dropOpen && (
                      <div
                        className="absolute right-0 top-full pt-2 min-w-[230px]"
                        style={{ zIndex: 60 }}
                      >
                        <div
                          className="rounded-xl overflow-hidden py-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.32)]"
                          style={{ background: 'rgba(31, 42, 36, 0.99)', border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                          {link.children.map((c) => {
                            const active = isActive(pathname, c.to);
                            return (
                              <Link
                                key={c.to}
                                to={c.to}
                                className="block no-underline px-4 py-2.5 text-[12.5px] transition-colors duration-150"
                                style={{
                                  color: active ? '#FFF' : 'rgba(255,255,255,0.78)',
                                  fontWeight: active ? 600 : 500,
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#FFF'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.78)'; }}
                              >
                                {c.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const active = isActive(pathname, link.to);
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
              if (link.children) {
                return (
                  <div key={link.label} className="w-full mt-2">
                    <div
                      className="text-[13px] font-semibold uppercase tracking-wide py-2"
                      style={{ color: 'rgba(255,255,255,0.5)' }}
                    >
                      {link.label}
                    </div>
                    <div className="flex flex-col items-start pl-4 border-l border-white/15">
                      {link.children.map((c) => {
                        const active = isActive(pathname, c.to);
                        return (
                          <Link
                            key={c.to}
                            to={c.to}
                            onClick={() => setOpen(false)}
                            className="text-[16px] no-underline font-medium py-2 w-full"
                            style={{ color: active ? '#9FE1CB' : '#FFF' }}
                          >
                            {c.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              const active = isActive(pathname, link.to);
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
