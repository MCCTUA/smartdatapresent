import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { APPS, ARCH_IMAGE } from '../data/cctvAiApps';

// ---------------------------------------------------------------------------
// CCTVAI.jsx — Catalog index page · /cctv-ai
// Hero + Architecture hero + Pain summary + 9-card grid + TechOverview CTA + Closing
// Design: Civic Trust palette · Font: Sarabun
// ---------------------------------------------------------------------------

const C = {
  primary: '#0F6E56',
  primaryHover: '#1D9E75',
  primaryDeep: '#0B5544',
  surface: '#FAF7EE',
  surfaceSoft: '#F5F1E4',
  text: '#1F2A24',
  textMuted: '#5F6B65',
  accent: '#BA7517',
  accentSoft: '#FAEEDA',
  alert: '#A32D2D',
  alertSoft: '#FCEBEB',
  success: '#639922',
  navy: '#0A1F3D',
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function CCTVAI() {
  // Preload 9 hero images on mount so detail pages feel instant
  useEffect(() => {
    APPS.forEach((a) => {
      const img = new Image();
      img.src = a.heroImage;
    });
  }, []);

  return (
    <div
      className="cctv-app-page"
      style={{ fontFamily: "'Sarabun', Tahoma, sans-serif", color: C.text, background: C.surface }}
    >
      {/* ── [1] Hero ──────────────────────────────────────────────────────── */}
      <section
        className="cctv-app-section px-6 md:px-10 py-20 md:py-28"
        style={{
          background: `linear-gradient(135deg, ${C.navy} 0%, ${C.primaryDeep} 100%)`,
          color: '#FFF',
        }}
      >
        <motion.div
          className="max-w-[1100px] mx-auto"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-[12px] font-semibold uppercase mb-4"
            style={{ color: C.accent, letterSpacing: '2.5px' }}
          >
            CCTV + AI · ครอบคลุม 6 ปัญหา
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-semibold mb-5 max-w-4xl"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.18, color: '#FFF' }}
          >
            กล้องเดิมที่หน่วยงานมี · ตอบคำถามได้มากกว่าเดิม
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[17px] md:text-[19px] leading-relaxed mb-8 max-w-3xl"
            style={{ color: '#FFFFFFCC' }}
          >
            เปลี่ยนกล้องที่ติดไว้ให้ฉลาดขึ้น · ไม่ต้องเปลี่ยนทั้งระบบ — เลือกที่ตรง pain ของหน่วยงานมากที่สุดเพื่อเริ่ม pilot
          </motion.p>

          {/* Stats inline */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-6 mb-10">
            <div>
              <div className="text-[32px] md:text-[40px] font-semibold leading-tight" style={{ color: C.accent }}>6</div>
              <div className="text-[12.5px]" style={{ color: '#FFFFFFAA' }}>ปัญหาที่ครอบคลุม</div>
            </div>
            <div className="self-center" style={{ width: 1, height: 40, background: '#FFFFFF33' }} />
            <div>
              <div className="text-[32px] md:text-[40px] font-semibold leading-tight" style={{ color: C.accent }}>1</div>
              <div className="text-[12.5px]" style={{ color: '#FFFFFFAA' }}>ระบบหลังบ้านเดียว</div>
            </div>
            <div className="self-center" style={{ width: 1, height: 40, background: '#FFFFFF33' }} />
            <div>
              <div className="text-[32px] md:text-[40px] font-semibold leading-tight" style={{ color: C.accent }}>0</div>
              <div className="text-[12.5px]" style={{ color: '#FFFFFFAA' }}>ค่ากล้องใหม่ (ใช้กล้องเดิม)</div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-3 flex-wrap">
            <button
              onClick={() => scrollToId('catalog')}
              className="text-[14px] md:text-[15px] font-semibold px-6 py-3 rounded-lg cursor-pointer border-none transition-all"
              style={{ background: '#FFF', color: C.primaryDeep }}
            >
              เริ่มสำรวจ 6 ปัญหา ↓
            </button>
            <Link
              to="/cctv-ai/technical-overview"
              className="inline-flex items-center text-[14px] md:text-[15px] font-semibold px-6 py-3 rounded-lg no-underline transition-all"
              style={{ background: 'transparent', color: '#FFF', border: '1px solid rgba(255,255,255,0.4)' }}
            >
              ดูหลักการเทคนิค →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── [2] Architecture hero (full-width image) ──────────────────────── */}
      <section className="cctv-app-section px-6 md:px-10 py-16 md:py-20" style={{ background: C.surface }}>
        <div className="max-w-[1100px] mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <p className="text-[12px] font-semibold uppercase mb-3" style={{ color: C.primary, letterSpacing: '2.5px' }}>
              ภาพรวมระบบ
            </p>
            <h2
              className="font-semibold mb-6"
              style={{ fontSize: 'clamp(24px, 3.2vw, 32px)', color: C.primaryDeep, lineHeight: 1.3 }}
            >
              ระบบเดียว · ใช้กล้องเดิม · ครอบคลุม 6 ปัญหา
            </h2>
            <div
              className="rounded-2xl overflow-hidden mx-auto"
              style={{ maxWidth: 960, background: '#FFF', border: `1px solid ${C.surfaceSoft}`, boxShadow: '0 6px 28px rgba(0,0,0,0.06)' }}
            >
              <img
                src={ARCH_IMAGE}
                alt="ภาพรวมระบบหลังบ้านของ CCTV + AI"
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
            <p className="text-[13px] mt-4" style={{ color: C.textMuted }}>
              ภาพนี้ใช้ทุก app ในกลุ่ม CCTV + AI · กล่องประมวลผลตั้งในตู้อุปกรณ์ของหน่วยงาน
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── [3] Pain summary ──────────────────────────────────────────────── */}
      <section className="cctv-app-section px-6 md:px-10 py-20 md:py-24" style={{ background: C.surfaceSoft }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="max-w-2xl mb-10">
              <p className="text-[12px] font-semibold uppercase mb-3" style={{ color: C.alert, letterSpacing: '2.5px' }}>
                ปัญหาที่หน่วยงานเจอจริง
              </p>
              <h2
                className="font-semibold mb-4"
                style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', color: C.primaryDeep, lineHeight: 1.3 }}
              >
                "มีกล้องเยอะ — แต่ยังตอบคำถามไม่ได้"
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ color: C.textMuted }}>
                หน่วยงานลงทุนกล้องไปเยอะแล้ว · แต่เวลามีเหตุก็ยังต้องนั่ง replay หลายชั่วโมง · กล้องคนละยี่ห้อใช้ software คนละตัว · บางครั้งหาภาพไม่เจอเลย
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: '👀',
                  title: 'กล้องเยอะ ไม่มีคนดู',
                  desc: 'ติดกล้องไว้หลายสิบจุด — แต่ไม่มีเจ้าหน้าที่นั่งจ้องตลอด 24 ชั่วโมง · เห็นแต่ "หลังเหตุ" · ไม่เคยจับสังเกตได้ทันที',
                },
                {
                  icon: '⏱️',
                  title: 'Replay หาภาพ — เสียเวลาทั้งวัน',
                  desc: 'เวลามีเหตุ ต้องไล่ดูทีละกล้อง ทีละช่วงเวลา · ใช้คน 2-3 คน นั่งดูครึ่งวัน กว่าจะเจอภาพที่ต้องการ',
                },
                {
                  icon: '🧩',
                  title: 'หลายยี่ห้อ · หลาย software',
                  desc: 'กล้องของเก่าจากผู้รับเหมาคนเดิม + ของใหม่ปะปนกัน — แต่ละยี่ห้อใช้ app คนละตัว · ดูร่วมกันไม่ได้',
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6"
                  style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}`, borderTop: `4px solid ${C.alert}` }}
                >
                  <div className="text-[28px] mb-3">{p.icon}</div>
                  <div className="text-[15px] font-semibold mb-2" style={{ color: C.alert }}>{p.title}</div>
                  <p className="text-[13.5px] leading-relaxed" style={{ color: C.text }}>{p.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── [4] App catalog grid ──────────────────────────────────────────── */}
      <section id="catalog" className="cctv-app-section px-6 md:px-10 py-20 md:py-24" style={{ background: C.surface }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="max-w-2xl mb-10">
              <p className="text-[12px] font-semibold uppercase mb-3" style={{ color: C.primary, letterSpacing: '2.5px' }}>
                เลือกที่ตรงปัญหาท่านมากที่สุด
              </p>
              <h2
                className="font-semibold mb-4"
                style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', color: C.primaryDeep, lineHeight: 1.3 }}
              >
                6 ปัญหาในงานประจำวัน · 1 ระบบเดียวที่แก้ได้
              </h2>
              <p className="text-[14.5px] leading-relaxed" style={{ color: C.textMuted }}>
                แต่ละหน้าอธิบายปัญหา · ประโยชน์ · ข้อมูลที่ได้ · ฐานทางกฎหมาย พร้อม 1-pager PDF ให้นำกลับไปประชุมต่อ
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {APPS.map((app) => (
                <motion.div
                  key={app.slug}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Link
                    to={`/cctv-ai/${app.slug}`}
                    className="block rounded-2xl overflow-hidden no-underline transition-all"
                    style={{
                      background: '#FFF',
                      border: `1px solid ${C.surfaceSoft}`,
                      boxShadow: '0 4px 16px rgba(31, 42, 36, 0.04)',
                    }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ aspectRatio: '3 / 2', maxHeight: 180, background: C.surfaceSoft }}>
                      <img
                        src={app.heroImage}
                        alt={app.nameThai}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    {/* Body */}
                    <div className="p-5">
                      <p
                        className="text-[10.5px] font-semibold uppercase mb-2"
                        style={{ color: C.primary, letterSpacing: '1.2px' }}
                      >
                        {app.category}
                      </p>
                      <h3 className="text-[16.5px] font-semibold mb-2 leading-tight" style={{ color: C.primaryDeep }}>
                        {app.nameThai}
                      </h3>
                      <p className="text-[12.5px] leading-relaxed" style={{ color: C.textMuted }}>
                        {app.painHeadline}
                      </p>
                      <div className="mt-3 text-[12px] font-medium" style={{ color: C.primary }}>
                        ดูรายละเอียด →
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── [5] Technical overview CTA ────────────────────────────────────── */}
      <section className="cctv-app-section px-6 md:px-10 py-16 md:py-20" style={{ background: C.primaryDeep, color: '#FFF' }}>
        <div className="max-w-[900px] mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <p className="text-[12px] font-semibold uppercase mb-3" style={{ color: C.accent, letterSpacing: '2.5px' }}>
              เข้าใจหลังบ้านเพิ่ม
            </p>
            <h2
              className="font-semibold mb-5"
              style={{ fontSize: 'clamp(22px, 3vw, 30px)', color: '#FFF', lineHeight: 1.3 }}
            >
              อยากเข้าใจหลักการเทคนิคก่อนตัดสินใจ scope ใหญ่?
            </h2>
            <p className="text-[14.5px] leading-relaxed mb-7" style={{ color: '#FFFFFFCC' }}>
              ดู 2 หลักการ A/B + Cloud option + ตัวอย่าง use-case อ่านป้ายทะเบียน + Coverage Estimator ก่อนกำหนดจำนวนจุด
            </p>
            <Link
              to="/cctv-ai/technical-overview"
              className="inline-block text-[14.5px] font-semibold px-6 py-3 rounded-lg no-underline"
              style={{ background: C.accent, color: '#FFF' }}
            >
              → ดูหลักการเทคนิค + Coverage Estimator
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── [6] Closing — trust + CTA ─────────────────────────────────────── */}
      <section className="cctv-app-section px-6 md:px-10 py-20 md:py-24" style={{ background: '#FFF' }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {[
                { icon: '🛡️', title: 'PDPA · ภาพในไทย', desc: 'ภาพต้นฉบับเก็บที่ตู้หน่วยงาน · ไม่ออกนอกองค์กร · มีนโยบายเข้าถึงและ audit log' },
                { icon: '🔧', title: 'Site Survey ฟรี', desc: 'ทีมเราเข้าไปตรวจกล้องเดิม · เครือข่าย · ห้อง Server ก่อนเสนอ scope ที่ตรงหน่วยงาน' },
                { icon: '👥', title: 'ทีมงานในไทย', desc: 'พัฒนาเอง · พูดภาษาไทย · ปรับระบบให้ตรงบริบทแต่ละหน่วยงานได้' },
              ].map((t, i) => (
                <div key={i} className="rounded-2xl p-6" style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}>
                  <div className="text-[28px] mb-2">{t.icon}</div>
                  <div className="text-[15px] font-semibold mb-2" style={{ color: C.primaryDeep }}>{t.title}</div>
                  <p className="text-[13px] leading-relaxed" style={{ color: C.textMuted }}>{t.desc}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-2xl p-6 md:p-8" style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}>
              <p className="text-[12px] font-semibold uppercase mb-3" style={{ color: C.primary, letterSpacing: '2.5px' }}>
                ขั้นถัดไป
              </p>
              <h3
                className="font-semibold mb-5"
                style={{ fontSize: 'clamp(22px, 2.8vw, 28px)', color: C.primaryDeep, lineHeight: 1.3 }}
              >
                ก่อนตัดสินใจ · ขอชวนพิจารณา 3 ข้อนี้
              </h3>
              <ol className="space-y-2 mb-7 max-w-2xl">
                {[
                  'หน่วยงานท่านมี pain ตรงกับเรื่องไหนใน 6 ปัญหามากที่สุด?',
                  'กล้องเดิมที่มี ครอบคลุมพื้นที่นั้นแล้วหรือยัง? (จุดไหนยังไม่มี)',
                  'ใครจะเป็นเจ้าของระบบในหน่วยงาน (รับแจ้งเตือน · ดู dashboard)?',
                ].map((q, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full inline-flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5" style={{ background: C.accentSoft, color: C.accent }}>
                      {i + 1}
                    </span>
                    <span className="text-[14px] leading-relaxed" style={{ color: C.text }}>{q}</span>
                  </li>
                ))}
              </ol>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:mcctua2@gmail.com?subject=ปรึกษา%20CCTV%20+%20AI&body=สนใจกลุ่ม CCTV + AI%0A%0Aชื่อหน่วยงาน:%20%0Aผู้ติดต่อ:%20%0Aเบอร์โทรศัพท์:%20%0Aปัญหาที่อยากแก้:%20"
                  className="text-[14px] font-semibold px-5 py-2.5 rounded-lg no-underline"
                  style={{ background: C.primary, color: '#FFF' }}
                >
                  นัดทีมเข้าหน่วยงาน
                </a>
                <button
                  onClick={() => scrollToId('catalog')}
                  className="text-[14px] font-semibold px-5 py-2.5 rounded-lg cursor-pointer transition-all"
                  style={{ background: 'transparent', color: C.primary, border: `1px solid ${C.primary}` }}
                >
                  ↑ กลับไปเลือก app
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
