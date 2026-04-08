import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white/60 py-14 text-center">
      <div className="text-white font-bold text-xl tracking-widest mb-6">GISMO</div>
      <div className="flex gap-6 justify-center flex-wrap mb-6">
        <Link to="/" className="text-[12px] text-white/60 hover:text-white no-underline">หน้าหลัก</Link>
        <Link to="/smart-street-light" className="text-[12px] text-white/60 hover:text-white no-underline">Smart Street Light</Link>
        <Link to="/solar-street-light" className="text-[12px] text-white/60 hover:text-white no-underline">Solar Street Light</Link>
        <Link to="/fee-management" className="text-[12px] text-white/60 hover:text-white no-underline">ระบบค่าธรรมเนียม</Link>
      </div>
      <p className="text-[12px] tracking-tight">© 2026 Gismo Group. All rights reserved.</p>
    </footer>
  );
}
