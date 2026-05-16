import React from 'react';
import { motion } from 'framer-motion';

const C = {
  surfaceSoft: '#F5F1E4',
  text: '#1F2A24',
  textMuted: '#5F6B65',
  primary: '#0F6E56',
  primaryDeep: '#0B5544',
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

export default function AppDataSection({ data }) {
  return (
    <section
      className="cctv-app-section px-6 md:px-10 py-20 md:py-24"
      style={{ background: C.surfaceSoft, color: C.text }}
    >
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-[12px] font-semibold uppercase mb-3"
            style={{ color: C.primary, letterSpacing: '2.5px' }}
          >
            ข้อมูลที่หน่วยงานจะได้
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-semibold mb-10"
            style={{ fontSize: 'clamp(24px, 3vw, 30px)', color: C.primaryDeep, lineHeight: 1.3 }}
          >
            ข้อมูลที่นำไปใช้งานได้จริง — วางแผน · พัฒนาบริการ · ป้องกันปัญหา
          </motion.h2>

          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.map((d, i) => (
              <div
                key={i}
                className="rounded-xl p-4 flex gap-3 items-start"
                style={{ background: '#FFF' }}
              >
                <span
                  className="w-7 h-7 rounded-md inline-flex items-center justify-center text-[12px] font-bold shrink-0"
                  style={{ background: '#E8EFEB', color: C.primary }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="text-[13.5px] leading-relaxed" style={{ color: C.text }}>
                  {d}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
