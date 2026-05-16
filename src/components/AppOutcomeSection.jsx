import React from 'react';
import { motion } from 'framer-motion';

const C = {
  surface: '#FAF7EE',
  text: '#1F2A24',
  textMuted: '#5F6B65',
  primary: '#0F6E56',
  primaryDeep: '#0B5544',
  success: '#639922',
  successSoft: '#EAF3DE',
  surfaceSoft: '#F5F1E4',
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

export default function AppOutcomeSection({ outcomes, headline }) {
  return (
    <section
      className="cctv-app-section px-6 md:px-10 py-20 md:py-24"
      style={{ background: C.surface, color: C.text }}
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
            ประโยชน์ที่หน่วยงานจะได้รับ
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-semibold mb-10 max-w-3xl"
            style={{ fontSize: 'clamp(24px, 3.2vw, 32px)', color: C.primaryDeep, lineHeight: 1.35 }}
          >
            {headline}
          </motion.h2>

          <motion.ul variants={fadeUp} className="space-y-3 max-w-3xl">
            {outcomes.map((o, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl p-4"
                style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}
              >
                <span
                  className="w-6 h-6 rounded-full inline-flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5"
                  style={{ background: C.successSoft, color: '#3B6D11' }}
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="text-[14.5px] leading-relaxed" style={{ color: C.text }}>
                  {o}
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
