import React from "react";
// เราจะยังไม่ใช้ motion ในวินาทีแรก เพื่อเช็กว่า UI ขึ้นไหม
// import { motion } from "framer-motion"; 

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Navigation Bar (Glass Effect) */}
      <nav className="sticky top-0 z-50 flex h-12 items-center justify-between bg-black/80 px-8 backdrop-blur-xl">
        <div className="text-sm font-semibold text-white">Smart Data Presentation</div>
        <button className="rounded-full bg-[#0071e3] px-3 py-1 text-[12px] text-white">
          Deploying...
        </button>
      </nav>

      <main>
        {/* 2. Hero Section (Binary Rhythm: Pure Black) */}
        <section className="flex min-h-screen flex-col items-center justify-center bg-[#000000] px-6 text-center text-white">
          <h1 className="max-w-4xl text-[56px] font-semibold leading-[1.07] tracking-[-0.28px] md:text-[80px]">
            Innovation <br />
            <span className="text-[#0071e3]">Simplified.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[21px] text-white/60">
            High-end interactive experience built with React 19.
          </p>
          <div className="mt-10 flex gap-4">
            <button className="rounded-full bg-[#0071e3] px-8 py-3 text-[17px]">Explore Now</button>
          </div>
        </section>

        {/* 3. Features Section (Binary Rhythm: Light Gray) */}
        <section className="flex min-h-screen flex-col items-center justify-center bg-[#f5f5f7] px-6 text-center">
          <h2 className="text-[40px] font-semibold text-[#1d1d1f] md:text-[56px]">
            Pure Performance.
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-245">
            <div className="rounded-[20px] bg-white p-12 text-left shadow-sm">
              <h3 className="text-[28px] font-semibold">Binary Rhythm</h3>
              <p className="mt-4 text-black/60">Alternating sections between Pure Black and Light Gray.</p>
            </div>
            <div className="rounded-[20px] bg-white p-12 text-left shadow-sm">
              <h3 className="text-[28px] font-semibold">Pill CTAs</h3>
              <p className="mt-4 text-black/60">Signature Apple-style buttons with 980px radius.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#f5f5f7] py-12 text-center text-[12px] text-black/40 border-t border-gray-200">
        © 2026 SmartData. All rights reserved.
      </footer>
    </div>
  );
};

export default App;