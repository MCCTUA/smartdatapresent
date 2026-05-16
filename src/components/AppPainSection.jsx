import React from 'react';
import { motion } from 'framer-motion';

const C = {
  surface: '#FAF7EE',
  text: '#1F2A24',
  textMuted: '#5F6B65',
  primaryDeep: '#0B5544',
  alert: '#A32D2D',
  surfaceSoft: '#F5F1E4',
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const PAIN_ICONS = ['⚠️', '❗', '🔍', '📢'];

export default function AppPainSection({ pains }) {
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
            style={{ color: C.alert, letterSpacing: '2.5px' }}
          >
            ปัญหาในพื้นที่
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-semibold mb-10"
            style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', color: C.primaryDeep, lineHeight: 1.3 }}
          >
            หน่วยงานท่านเจอเรื่องเหล่านี้หรือไม่?
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {pains.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl p-6"
                style={{
                  background: '#FFF',
                  border: `1px solid ${C.surfaceSoft}`,
                  borderTop: `4px solid ${C.alert}`,
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-[24px] shrink-0" aria-hidden="true">
                    {PAIN_ICONS[i % PAIN_ICONS.length]}
                  </span>
                  <p className="text-[14.5px] leading-relaxed" style={{ color: C.text }}>
                    {p}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
