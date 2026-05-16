import React from 'react';
import { motion } from 'framer-motion';

const C = {
  primaryDeep: '#0B5544',
  accent: '#BA7517',
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function AppLegalFooter({ laws }) {
  return (
    <section
      className="cctv-app-section px-6 md:px-10 py-14 md:py-16"
      style={{ background: C.primaryDeep, color: '#FFF' }}
    >
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <p
            className="text-[12px] font-semibold uppercase mb-4"
            style={{ color: C.accent, letterSpacing: '2.5px' }}
          >
            ฐานทางกฎหมาย
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-[13px] leading-relaxed">
            {laws.map((l, i) => (
              <li key={i} className="flex gap-2 items-start" style={{ color: '#FFFFFFCC' }}>
                <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: C.accent }} />
                <span>{l}</span>
              </li>
            ))}
          </ul>
          <p className="text-[11.5px] mt-5" style={{ color: '#FFFFFF77' }}>
            ทีมเราไม่ใช่ที่ปรึกษากฎหมาย — เป็นการสรุปฐานอ้างอิงเพื่อให้หน่วยงานพิจารณาร่วมกับฝ่ายนิติการ
          </p>
        </motion.div>
      </div>
    </section>
  );
}
