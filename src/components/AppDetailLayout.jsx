import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ARCH_IMAGE, neighborApps } from '../data/cctvAiApps';
import AppHero from './AppHero';
import AppPainSection from './AppPainSection';
import AppOutcomeSection from './AppOutcomeSection';
import AppDataSection from './AppDataSection';
import AppLegalFooter from './AppLegalFooter';
import AppStickyBar from './AppStickyBar';

const C = {
  primary: '#0F6E56',
  primaryDeep: '#0B5544',
  surface: '#FAF7EE',
  surfaceSoft: '#F5F1E4',
  text: '#1F2A24',
  textMuted: '#5F6B65',
  accent: '#BA7517',
  accentSoft: '#FAEEDA',
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const PRESENTER_KEY = 'cctvAi.presenterMode';

export default function AppDetailLayout({ app }) {
  const navigate = useNavigate();
  const { prev, next } = neighborApps(app.slug);
  const [presenter, setPresenter] = useState(false);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [app.slug]);

  // Restore presenter mode from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem(PRESENTER_KEY);
    if (stored === '1') {
      setPresenter(true);
      document.body.classList.add('presenter-mode');
    }
    return () => {
      document.body.classList.remove('presenter-mode');
    };
  }, []);

  const togglePresenter = React.useCallback(() => {
    setPresenter((p) => {
      const next = !p;
      if (next) {
        document.body.classList.add('presenter-mode');
        sessionStorage.setItem(PRESENTER_KEY, '1');
      } else {
        document.body.classList.remove('presenter-mode');
        sessionStorage.removeItem(PRESENTER_KEY);
      }
      return next;
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      // Ignore if user typing in input
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigate(`/cctv-ai/${prev.slug}`);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigate(`/cctv-ai/${next.slug}`);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        navigate('/cctv-ai');
      } else if (e.key === 'd' || e.key === 'D') {
        if (app.pdfUrl) {
          e.preventDefault();
          window.open(app.pdfUrl, '_blank', 'noopener');
        }
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        togglePresenter();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate, prev.slug, next.slug, app.pdfUrl, togglePresenter]);

  const downloadDisabled = !app.pdfUrl || app.pdfStatus === 'preparing';

  const handleDownload = () => {
    if (downloadDisabled) return;
    window.open(app.pdfUrl, '_blank', 'noopener');
  };

  return (
    <div
      className="cctv-app-page"
      style={{ fontFamily: "'Sarabun', Tahoma, sans-serif", color: C.text, background: C.surface }}
    >
      {/* ── [1] Breadcrumb ─────────────────────────────────────────────────── */}
      <div
        className="cctv-breadcrumb sticky top-12 z-30 px-6 md:px-10 py-2.5"
        style={{
          background: '#FFFFFFE6',
          backdropFilter: 'saturate(160%) blur(8px)',
          WebkitBackdropFilter: 'saturate(160%) blur(8px)',
          borderBottom: `1px solid ${C.surfaceSoft}`,
        }}
      >
        <div className="max-w-[1100px] mx-auto text-[12px] flex items-center gap-1.5 flex-wrap" style={{ color: C.textMuted }}>
          <Link to="/" className="no-underline hover:underline" style={{ color: C.textMuted }}>หน้าหลัก</Link>
          <span>›</span>
          <Link to="/cctv-ai" className="no-underline hover:underline" style={{ color: C.textMuted }}>CCTV + AI</Link>
          <span>›</span>
          <span style={{ color: C.primaryDeep, fontWeight: 600 }}>{app.nameThai}</span>
        </div>
      </div>

      {/* ── [2] Hero ───────────────────────────────────────────────────────── */}
      <AppHero app={app} />

      {/* ── [3] Pain ───────────────────────────────────────────────────────── */}
      <AppPainSection pains={app.pains} />

      {/* ── [4] Solution / reassurance ─────────────────────────────────────── */}
      <section
        className="cctv-app-section px-6 md:px-10 py-20 md:py-24"
        style={{ background: C.primaryDeep, color: '#FFF' }}
      >
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <p className="text-[12px] font-semibold uppercase mb-3" style={{ color: C.accent, letterSpacing: '2.5px' }}>
              แนวทางแก้
            </p>
            <h2
              className="font-semibold mb-5 max-w-3xl"
              style={{ fontSize: 'clamp(24px, 3vw, 32px)', color: '#FFF', lineHeight: 1.3 }}
            >
              {app.nameThai} · เพื่อให้หน่วยงานตอบประชาชน · สภา · และต้นสังกัดได้
            </h2>
            <p className="text-[15px] leading-relaxed mb-8 max-w-3xl" style={{ color: '#FFFFFFCC' }}>
              {app.reassurance}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl">
              {app.reassureChips.map((chip, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 flex items-center gap-3"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  <span className="w-7 h-7 rounded-full inline-flex items-center justify-center text-[12px] font-bold shrink-0" style={{ background: C.accent, color: '#FFF' }}>
                    {i + 1}
                  </span>
                  <span className="text-[13.5px] font-medium" style={{ color: '#FFF' }}>{chip}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── [5] Outcome ────────────────────────────────────────────────────── */}
      <AppOutcomeSection outcomes={app.outcomes} headline={app.outcomeHeadline} />

      {/* ── [6] Data ───────────────────────────────────────────────────────── */}
      <AppDataSection data={app.data} />

      {/* ── [7] Architecture ───────────────────────────────────────────────── */}
      <section
        className="cctv-app-section px-6 md:px-10 py-20 md:py-24"
        style={{ background: '#FFF', color: C.text }}
      >
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <p className="text-[12px] font-semibold uppercase mb-3" style={{ color: C.primary, letterSpacing: '2.5px' }}>
              ระบบทำงานยังไง
            </p>
            <h2
              className="font-semibold mb-6"
              style={{ fontSize: 'clamp(24px, 3vw, 32px)', color: C.primaryDeep, lineHeight: 1.3 }}
            >
              {app.standalone
                ? 'ระบบ platform บนเว็บ + Mobile + LINE OA · ไม่ใช้กล่องประมวลผล AI'
                : 'ระบบเดียว · ใช้กล้องเดิม · เพิ่มแค่กล่องประมวลผล'}
            </h2>

            <div
              className="rounded-2xl overflow-hidden mb-4"
              style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}`, maxWidth: 900, marginInline: 'auto' }}
            >
              <img
                src={ARCH_IMAGE}
                alt="ภาพรวมระบบหลังบ้านของกลุ่ม CCTV + AI"
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
            <p className="text-[12.5px] text-center mb-6" style={{ color: C.textMuted }}>
              ภาพรวมระบบหลังบ้านที่ใช้ทุก app ในกลุ่ม CCTV + AI
            </p>
            <div className="text-center">
              <Link
                to="/cctv-ai/technical-overview"
                className="inline-flex items-center gap-1.5 text-[13.5px] font-medium no-underline px-4 py-2 rounded-lg"
                style={{ color: C.primary, background: C.accentSoft }}
              >
                เข้าใจหลักการเทคนิคเพิ่มเติม →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── [8] Legal footer ───────────────────────────────────────────────── */}
      <AppLegalFooter laws={app.laws} />

      {/* ── [9] Next step CTA + feedback ───────────────────────────────────── */}
      <section
        className="cctv-app-section px-6 md:px-10 py-20 md:py-24"
        style={{ background: C.surface, color: C.text }}
      >
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <p className="text-[12px] font-semibold uppercase mb-3" style={{ color: C.primary, letterSpacing: '2.5px' }}>
              ขั้นถัดไป
            </p>
            <h2
              className="font-semibold mb-6"
              style={{ fontSize: 'clamp(24px, 3vw, 30px)', color: C.primaryDeep, lineHeight: 1.3 }}
            >
              ก่อนตัดสินใจ · ขอชวนหน่วยงานพิจารณา 3 ข้อนี้
            </h2>
            <ol className="space-y-3 mb-8 max-w-2xl">
              {[
                'หน่วยงานท่านมีจุดไหนที่ pain ตรงกับเรื่องนี้มากที่สุด?',
                'กล้องเดิมที่มีอยู่ ครอบคลุมพื้นที่นั้นพอแล้วหรือยัง?',
                'ใครในหน่วยงานจะเป็นเจ้าของระบบนี้ (รับแจ้งเตือน · ดู dashboard)?',
              ].map((q, i) => (
                <li key={i} className="flex gap-3 items-start rounded-xl p-4" style={{ background: '#FFF', border: `1px solid ${C.surfaceSoft}` }}>
                  <span className="w-7 h-7 rounded-full inline-flex items-center justify-center text-[12px] font-bold shrink-0" style={{ background: C.accentSoft, color: C.accent }}>
                    {i + 1}
                  </span>
                  <span className="text-[14px] leading-relaxed" style={{ color: C.text }}>{q}</span>
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:mcctua2@gmail.com?subject=${encodeURIComponent('นัดทีมเข้าหน่วยงาน · ' + app.nameThai)}&body=${encodeURIComponent('สนใจ ' + app.nameThai + '\n\nชื่อหน่วยงาน: \nผู้ติดต่อ: \nเบอร์โทรศัพท์: \n')}`}
                className="text-[14px] font-semibold px-5 py-2.5 rounded-lg no-underline"
                style={{ background: C.primary, color: '#FFF' }}
              >
                นัดทีมเข้าหน่วยงาน
              </a>
              <button
                onClick={handleDownload}
                disabled={downloadDisabled}
                className="text-[14px] font-semibold px-5 py-2.5 rounded-lg transition-all"
                style={{
                  background: downloadDisabled ? '#D9D6CB' : 'transparent',
                  color: downloadDisabled ? '#7A7A6E' : C.primary,
                  border: `1px solid ${downloadDisabled ? '#D9D6CB' : C.primary}`,
                  cursor: downloadDisabled ? 'not-allowed' : 'pointer',
                }}
                title={downloadDisabled ? 'เอกสาร 1-pager กำลังจัดทำ' : 'ดาวน์โหลด 1-pager PDF'}
              >
                {downloadDisabled ? 'เอกสาร 1-pager กำลังจัดทำ' : 'ดาวน์โหลด 1-pager (PDF)'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── [10] Sticky bottom bar ─────────────────────────────────────────── */}
      <AppStickyBar app={app} prev={prev} next={next} />

      {/* ── Presenter toggle button ────────────────────────────────────────── */}
      <button
        onClick={togglePresenter}
        className="cctv-presenter-toggle fixed z-40 rounded-full shadow-lg transition-all"
        style={{
          top: 64,
          right: 16,
          width: 40,
          height: 40,
          background: presenter ? C.accent : '#FFFFFFE6',
          color: presenter ? '#FFF' : C.primaryDeep,
          border: `1px solid ${presenter ? C.accent : C.surfaceSoft}`,
          fontSize: 18,
          cursor: 'pointer',
        }}
        title={presenter ? 'ปิด presenter mode (P)' : 'เปิด presenter mode (P)'}
        aria-label="Toggle presenter mode"
      >
        🎤
      </button>

      {/* Spacer so sticky bar doesn't overlap last section */}
      <div style={{ height: 80 }} aria-hidden="true" />
    </div>
  );
}
