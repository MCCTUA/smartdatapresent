import React from 'react';
import { motion } from 'framer-motion';

const C = {
  primaryDeep: '#0B5544',
  accent: '#BA7517',
  accentSoft: '#FAEEDA',
  navy: '#0A1F3D',
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

export default function AppHero({ app }) {
  return (
    <section
      className="cctv-app-hero px-6 md:px-10 py-20 md:py-24"
      style={{
        background: `linear-gradient(135deg, ${C.navy} 0%, ${C.primaryDeep} 100%)`,
        color: '#FFF',
      }}
    >
      <motion.div
        className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        {/* Left: text */}
        <div>
          <motion.div variants={fadeUp} className="mb-5">
            <span
              className="inline-flex items-center text-[11px] font-semibold uppercase px-2.5 py-1 rounded"
              style={{ background: C.accentSoft, color: C.accent, letterSpacing: '1.2px' }}
            >
              {app.category}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-semibold mb-4"
            style={{ fontSize: 'clamp(32px, 4.6vw, 52px)', lineHeight: 1.22, color: '#FFF' }}
          >
            {app.nameThai}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[16px] md:text-[18px] leading-relaxed mb-4"
            style={{ color: '#FFFFFFCC' }}
          >
            {app.painHeadline}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-[13.5px] leading-relaxed"
            style={{ color: '#FFFFFF99' }}
          >
            {app.subtitleLong}
          </motion.p>
        </div>

        {/* Right: image */}
        <motion.div variants={fadeUp} className="relative">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              aspectRatio: '3 / 2',
              maxHeight: 420,
              background: 'rgba(0,0,0,0.3)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
            }}
          >
            <img
              src={app.heroImage}
              alt={app.nameThai}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          {app.heroImageTemp && (
            <div
              className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded uppercase"
              style={{ background: C.accent, color: '#FFF', letterSpacing: '0.5px' }}
              title="ภาพชั่วคราว · จะอัปเดตเมื่อ asset พร้อม"
            >
              TEMP
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
