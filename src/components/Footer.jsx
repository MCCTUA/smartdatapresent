import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white/60 py-14 text-center">
      <div className="flex justify-center mb-6">
        <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="28" height="28" rx="6" fill="#0071e3"/>
          <path d="M8 14h12M14 8v12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="flex gap-6 justify-center flex-wrap mb-6">
        <Link to="/" className="text-[12px] text-white/60 hover:text-white no-underline">หน้าหลัก</Link>
        <Link to="/smart-street-light" className="text-[12px] text-white/60 hover:text-white no-underline">Smart Street Light</Link>
        <Link to="/solar-street-light" className="text-[12px] text-white/60 hover:text-white no-underline">Solar Street Light</Link>
        <Link to="/fee-management" className="text-[12px] text-white/60 hover:text-white no-underline">ระบบค่าธรรมเนียม</Link>
      </div>
      <p className="text-[12px] tracking-tight">© 2026 All rights reserved.</p>
    </footer>
  );
}
