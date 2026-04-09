import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'หน้าหลัก' },
  { to: '/smart-street-light', label: 'Smart Street Light' },
  { to: '/solar-street-light', label: 'Solar Street Light' },
  { to: '/fee-management', label: 'ระบบค่าธรรมเนียม' },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-12 bg-black/80 backdrop-blur-xl backdrop-saturate-180">
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-6">
          <Link to="/" className="no-underline flex items-center">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="6" fill="#0071e3"/>
              <path d="M8 14h12M14 8v12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-[12px] no-underline transition-colors duration-150 ${
                  pathname === link.to
                    ? 'text-white font-semibold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button
            className="md:hidden text-white text-xl p-2"
            onClick={() => setOpen(true)}
            aria-label="เปิดเมนู"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[999] bg-black/95 flex flex-col items-center justify-center gap-8">
          <button
            className="absolute top-4 right-6 text-white text-3xl"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`text-2xl no-underline ${
                pathname === link.to ? 'text-[#0071e3]' : 'text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
