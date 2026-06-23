import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// AboutUs.jsx — "แนะนำตัว / About Us" — Smart B2G
// Story: สองทีมที่เดินทางคนละสาย (Gismo ฮาร์ดแวร์ + CodeCube ซอฟต์แวร์) มาบรรจบกัน
// Design: Civic Trust palette + Sarabun · ported from about_story.html mockup
// HW (Gismo)  = accent #BA7517 (ส้ม) · SW (CodeCube) = primary #0F6E56 (เขียว)
// Compliance: ห้ามมี ADZOSS / ตัวเลข unverify / ราคา · Central World ใช้คำ "เฝ้าระวัง/เตือน/บันทึก"
// Images already cropped/optimized in public/images/about + public/videos/about
// ---------------------------------------------------------------------------

const C = {
  primary: '#0F6E56',
  primaryDeep: '#0B5544',
  surface: '#FAF7EE',
  surfaceSoft: '#F5F1E4',
  text: '#1F2A24',
  muted: '#5F6B65',
  accent: '#BA7517',
  accentSoft: '#FAEEDA',
  border: 'rgba(15,110,86,0.12)',
};

const G = 'images/about/gismo/';
const CC = 'images/about/codecube/';
const V = 'videos/about/';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ── atoms ───────────────────────────────────────────────────────────────────
function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

// One story "slide" card
function Slide({ children, team, className = '', center = false }) {
  const topBorder =
    team === 'hw' ? `5px solid ${C.accent}` : team === 'sw' ? `5px solid ${C.primary}` : 'none';
  return (
    <Reveal>
      <section
        className={`rounded-[22px] overflow-hidden mb-7 ${className}`}
        style={{
          background: C.surface,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          borderTop: topBorder,
        }}
      >
        <div
          className="px-7 py-10 md:px-14 md:py-[52px]"
          style={center ? { textAlign: 'center' } : undefined}
        >
          {children}
        </div>
      </section>
    </Reveal>
  );
}

function Chapter({ team = 'hw', tag, label, center = false }) {
  const bg = team === 'sw' ? C.primary : C.accent;
  return (
    <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
      <span
        className="text-[12px] font-bold text-white px-3.5 py-[5px] rounded-full shrink-0"
        style={{ background: bg, letterSpacing: '.5px' }}
      >
        {tag}
      </span>
      {label && (
        <span
          className="text-[13px] font-semibold uppercase"
          style={{ color: C.muted, letterSpacing: '1.2px' }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

function H2({ children }) {
  return (
    <h2
      className="text-[24px] md:text-[29px] font-bold leading-[1.25]"
      style={{ color: C.primaryDeep }}
    >
      {children}
    </h2>
  );
}

function Story({ children, muted = false, className = '' }) {
  return (
    <p
      className={`text-[16.5px] md:text-[18.5px] leading-[1.8] mt-4 max-w-[790px] ${className}`}
      style={{ color: muted ? C.muted : C.text }}
    >
      {children}
    </p>
  );
}

const HL = ({ children }) => (
  <span style={{ color: C.primary, fontWeight: 600 }}>{children}</span>
);
const HLA = ({ children }) => (
  <span style={{ color: C.accent, fontWeight: 600 }}>{children}</span>
);

function Bridge({ children }) {
  return (
    <Reveal>
      <div
        className="text-center my-3 italic text-[15px] px-4"
        style={{ color: C.muted }}
      >
        <span className="block text-[22px] not-italic mb-0.5" style={{ color: C.accent }}>
          ↓
        </span>
        {children}
      </div>
    </Reveal>
  );
}

// Media frame — fixed aspect, object-cover anchored top (clips any residual edge)
function Media({ src, alt, ratio = '3 / 2', position = 'center', minH }) {
  return (
    <div
      className="w-full overflow-hidden"
      style={{ aspectRatio: ratio, minHeight: minH, background: C.surfaceSoft }}
    >
      <img
        src={encodeURI(src)}
        alt={alt}
        loading="lazy"
        className="w-full h-full"
        style={{ objectFit: 'cover', objectPosition: position }}
      />
    </div>
  );
}

// Work card (image on top + body)
function Work({ src, alt, title, desc, badge, ratio = '3 / 2', position = 'center' }) {
  return (
    <div
      className="rounded-[14px] overflow-hidden bg-white h-full flex flex-col"
      style={{ border: `1px solid ${C.border}` }}
    >
      <Media src={src} alt={alt} ratio={ratio} position={position} />
      <div className="px-[18px] py-4 flex-1">
        <h4 className="text-[16px] font-semibold mb-1" style={{ color: C.primaryDeep }}>
          {title}
        </h4>
        <p className="text-[13px] leading-[1.55]" style={{ color: C.muted }}>
          {desc}
        </p>
        {badge && (
          <span
            className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-2"
            style={{ color: C.accent, background: C.accentSoft }}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

// Wide card — shows the FULL screenshot un-cropped (natural ratio) so dashboard text stays readable
function WorkWide({ src, alt, title, desc }) {
  return (
    <div
      className="rounded-[14px] overflow-hidden bg-white"
      style={{ border: `1px solid ${C.border}` }}
    >
      <div
        className="w-full overflow-hidden"
        style={{ aspectRatio: '720 / 150', background: C.surfaceSoft }}
      >
        <img
          src={encodeURI(src)}
          alt={alt}
          loading="lazy"
          className="w-full h-full block"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>
      <div className="px-5 py-4" style={{ borderTop: `1px solid ${C.border}` }}>
        <h4 className="text-[17px] font-semibold mb-1" style={{ color: C.primaryDeep }}>
          {title}
        </h4>
        <p className="text-[13.5px] leading-[1.55]" style={{ color: C.muted }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

// ── data ────────────────────────────────────────────────────────────────────
const GISMO_WORKS = [
  {
    src: G + 'MMTH.jpg',
    alt: 'High Mast ลานจอด MMTH',
    title: 'High Mast — MMTH',
    desc: 'ลานจอดรถส่งออก เสาสูง 25 ม. ระยะห่าง 160 ม. ออกแบบให้สว่างทั่วถึงไม่มีจุดมืด',
    badge: 'งานออกแบบพิเศษ',
  },
  {
    src: G + 'EGAT.jpg',
    alt: 'งานแสงสว่าง การไฟฟ้าฝ่ายผลิต EGAT',
    title: 'การไฟฟ้าฝ่ายผลิต (EGAT)',
    desc: 'งานแสงสว่างให้หน่วยงานพลังงานระดับประเทศ มาตรฐานที่พลาดไม่ได้',
    badge: 'หน่วยงานรัฐ',
  },
  {
    src: G + 'huaykwang.jpg',
    alt: 'ปรับปรุงไฟถนน เขตห้วยขวาง',
    title: 'ไฟถนน เขตห้วยขวาง',
    desc: 'ปรับปรุงแสงสว่างถนนสาธารณะในเขตเมือง — งานท้องถิ่นจริง',
    badge: 'งานท้องถิ่น',
  },
  {
    src: G + 'TOA.jpg',
    alt: 'Solar Street Light ลานจอด TOA',
    title: 'Solar Street Light — TOA',
    desc: 'ไฟถนนโซลาร์ในพื้นที่โรงงาน ออกแบบตามมาตรฐานความสว่างราชกิจจาฯ',
    badge: 'พลังงานสะอาด',
  },
  {
    src: G + 'panasonic.jpg',
    alt: 'งานแสงสว่าง Panasonic',
    title: 'Panasonic',
    desc: 'งานไฟถนนและไฟลานในพื้นที่โรงงานของผู้ผลิตข้ามชาติ',
    badge: 'องค์กรข้ามชาติ',
  },
  {
    src: G + 'somapa_fifa.jpg',
    alt: 'สนามฟุตบอล โรงเรียนโสมาภาพัฒนา',
    title: 'สนามฟุตบอล โสมาภาพัฒนา',
    desc: 'ออกแบบแสงสว่างสนามตามมาตรฐาน FIFA Grade 2 (Match Practice)',
    badge: 'มาตรฐาน FIFA',
  },
];

const CODECUBE_WORKS = [
  {
    src: CC + '09_justice.jpg',
    alt: 'ระบบ Big Data กระทรวงยุติธรรม',
    title: 'กระทรวงยุติธรรม',
    desc: 'ระบบข้อมูลขนาดใหญ่เชื่อมหลายหน่วยงานในกระบวนการยุติธรรม',
    ratio: '24 / 7',
    position: 'top',
  },
  {
    src: CC + '10_truedigitalpark.jpg',
    alt: 'ระบบจองพื้นที่ True Digital Park',
    title: 'True Digital Park',
    desc: 'ระบบบริหารจัดการพื้นที่และแดชบอร์ดสรุปผลแบบเรียลไทม์',
    ratio: '24 / 7',
    position: 'top',
  },
  {
    src: CC + '11_gistda.jpg',
    alt: 'ระบบ GISTDA ภาพถ่ายดาวเทียม',
    title: 'GISTDA',
    desc: 'ระบบให้บริการข้อมูลภูมิสารสนเทศและภาพถ่ายดาวเทียม',
    ratio: '24 / 7',
    position: 'top',
  },
  {
    src: CC + '12_nt.jpg',
    alt: 'งานพัฒนาซอฟต์แวร์ร่วมกับ NT',
    title: 'NT — โทรคมนาคมแห่งชาติ',
    desc: 'พัฒนาซอฟต์แวร์ร่วมกับทีมระบบคลาวด์ของหน่วยงานรัฐ',
    ratio: '24 / 7',
    position: 'center',
  },
];

// ── page ────────────────────────────────────────────────────────────────────
export default function AboutUs() {
  return (
    <div style={{ background: '#e8e6dd', fontFamily: "'Sarabun', system-ui, sans-serif" }}>
      <div className="max-w-[1040px] mx-auto px-4 py-8 md:py-10">

        {/* 1 · HERO */}
        <Reveal>
          <section
            className="rounded-[22px] overflow-hidden mb-7"
            style={{
              background: `linear-gradient(135deg, ${C.primaryDeep}, ${C.primary})`,
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            }}
          >
            <div className="px-7 py-12 md:px-14 md:py-[60px] text-white">
              <div className="flex items-center gap-2.5 mb-5 font-bold" style={{ letterSpacing: '1.5px' }}>
                <span
                  className="inline-block w-[26px] h-[26px] rounded-[7px]"
                  style={{ background: C.accent }}
                />
                <span className="text-[20px]">Smart B2G</span>
              </div>
              <h1 className="text-[28px] md:text-[39px] font-bold leading-[1.18]" style={{ letterSpacing: '-0.5px' }}>
                เบื้องหลังระบบของเรา<br />
                คือสองทีมที่เดินทางคนละสาย<br />
                แล้วมาบรรจบกัน
              </h1>
              <p className="text-[16.5px] md:text-[18.5px] leading-[1.8] mt-4 max-w-[790px]" style={{ color: 'rgba(255,255,255,0.92)' }}>
                ทีมหนึ่งเริ่มจากโรงงานอิเล็กทรอนิกส์ อีกทีมเริ่มจากการเขียนระบบให้หน่วยงานระดับประเทศ
                — วันนี้ทั้งสองมารวมกันเพื่อท้องถิ่นไทย
              </p>
              <p className="text-[15px] md:text-[16px] leading-[1.8] mt-3 max-w-[790px]" style={{ color: 'rgba(255,255,255,0.82)' }}>
                ขอเล่าให้ฟังว่าแต่ละทีมเป็นใคร และทำไมการมาเจอกันจึงสำคัญกับท่าน
              </p>
            </div>
          </section>
        </Reveal>

        <Bridge>เริ่มจากทีมแรก — ทีมที่ลงมือผลิตด้วยมือตัวเอง</Bridge>

        {/* 2 · GISMO คือใคร */}
        <Slide team="hw">
          <Chapter team="hw" tag="ทีมที่ 1 · ฮาร์ดแวร์" label="Genius Gismo" />
          <H2>จากโรงงานอิเล็กทรอนิกส์ สู่ผู้ผลิตโคมไฟ LED</H2>
          <Story>
            Genius Gismo เริ่มต้นจากการเป็น{' '}
            <HLA>โรงงานประกอบแผงวงจรอิเล็กทรอนิกส์ (PCBA)</HLA>{' '}
            — งานที่ต้องการความละเอียดและการควบคุมคุณภาพระดับสูง
          </Story>
          <Story>
            ตั้งแต่ปี <HLA>2553</HLA> เราต่อยอดความเชี่ยวชาญนั้นมาสู่การ{' '}
            <HLA>ออกแบบและผลิตโคมไฟ LED</HLA> ด้วยตัวเอง ตั้งแต่แผงวงจรจนถึงตัวโคมสำเร็จ
            — ไม่ใช่แค่ซื้อมาขายไป แต่ผลิตเองในโรงงานของเรา
          </Story>
          <div className="flex gap-3.5 mt-6 flex-wrap">
            {[
              ['PCBA', 'รากฐานงานอิเล็กทรอนิกส์'],
              ['ตั้งแต่ปี 2553', 'ผลิตโคมไฟ LED เอง'],
              ['โรงงานของเราเอง', 'ควบคุมคุณภาพทุกขั้นตอน'],
            ].map(([v, l]) => (
              <div
                key={v}
                className="bg-white rounded-xl px-5 py-3.5"
                style={{ border: `1px solid ${C.border}` }}
              >
                <div className="text-[21px] font-bold" style={{ color: C.primary }}>{v}</div>
                <div className="text-[12.5px] mt-0.5" style={{ color: C.muted }}>{l}</div>
              </div>
            ))}
          </div>
        </Slide>

        <Bridge>และเพราะผลิตเอง เราจึงควบคุมคุณภาพได้ตั้งแต่ต้นทาง</Bridge>

        {/* 3 · โรงงาน & มาตรฐาน — §4.1 PCBA video · §4.2 heading reworded */}
        <Slide team="hw">
          <Chapter team="hw" tag="ทีมที่ 1 · ฮาร์ดแวร์" label="โรงงาน & มาตรฐาน" />
          <H2>ผลิตในโรงงานของเรา ด้วยมาตรฐานระดับอุตสาหกรรม</H2>
          <Story muted>
            ควบคุมคุณภาพทุกขั้นตอน ตั้งแต่แผงวงจรจนถึงโคมสำเร็จ — สิ่งที่ทำให้ลูกค้าองค์กรใหญ่ไว้วางใจ
          </Story>

          {/* PCBA production clip */}
          <div
            className="mt-6 rounded-[14px] overflow-hidden bg-black"
            style={{ border: `1px solid ${C.border}` }}
          >
            <video
              src={encodeURI(G + 'SMT_LED_PCBA_01.mp4')}
              poster={encodeURI(G + 'SMT_LED_PCBA_01_poster.jpg')}
              controls
              playsInline
              preload="metadata"
              className="w-full block"
              style={{ aspectRatio: '16 / 9', objectFit: 'cover' }}
            />
          </div>
          <p className="text-[13px] mt-2.5" style={{ color: C.muted }}>
            สายการผลิตแผงวงจร LED (SMT / PCBA) ภายในโรงงานของเรา
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            <Work
              src={G + 'SMT_Machine_01.jpg'}
              alt="เครื่องจักรสายการผลิต SMT ในโรงงาน"
              title="เครื่องจักรผลิตในโรงงาน"
              desc="ผลิตแผงวงจรและประกอบโคมไฟเองครบวงจร พร้อมตรวจคุณภาพแสงทุกล็อต"
            />
            <Work
              src={G + 'QC_Process_01.jpg'}
              alt="กระบวนการตรวจสอบคุณภาพ QC"
              title="ตรวจสอบคุณภาพทุกล็อต"
              desc="กระบวนการ QC ตั้งแต่แผงวงจรถึงโคมสำเร็จ ก่อนส่งมอบหน้างาน"
            />
            <Work
              src={G + 'TISI_certificate_1955-2551.jpg'}
              alt="ใบรับรอง มอก. 1955-2551"
              title="มาตรฐาน มอก. 1955-2551"
              desc="ผ่านการรับรองมาตรฐานผลิตภัณฑ์อุตสาหกรรม พร้อมทดสอบ LM-79 / LM-80"
            />
          </div>
        </Slide>

        <Bridge>ด้วยพื้นฐานนี้ เราจึงรับงานยาก ๆ ที่คนอื่นทำไม่ได้</Bridge>

        {/* 4 · งานยาก (ผลงาน Gismo) */}
        <Slide team="hw">
          <Chapter team="hw" tag="ทีมที่ 1 · ฮาร์ดแวร์" label="ผลงานที่พิสูจน์ความเชี่ยวชาญ" />
          <H2>งานที่ยาก คือสนามที่เราถนัด</H2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px] mt-6">
            {GISMO_WORKS.map((w) => (
              <Work key={w.title} {...w} />
            ))}
          </div>
        </Slide>

        <Bridge>นั่นคือทีมฮาร์ดแวร์ — ทีนี้ขอแนะนำอีกทีมหนึ่ง</Bridge>

        {/* 5a · CODECUBE คือใคร — หน้าแรก 2 ผลงาน */}
        <Slide team="sw">
          <Chapter team="sw" tag="ทีมที่ 2 · ซอฟต์แวร์" label="CodeCube" />
          <H2>ทีมที่ดูแลระบบให้หน่วยงานระดับประเทศ</H2>
          <Story>
            CodeCube คือผู้เชี่ยวชาญด้าน{' '}
            <HL>ซอฟต์แวร์ แพลตฟอร์ม และการจัดการข้อมูล</HL>{' '}
            ที่สั่งสมประสบการณ์มากว่า 20 ปี — พัฒนาและดูแลระบบให้หน่วยงานที่หยุดทำงานไม่ได้
          </Story>
          <div className="flex flex-col gap-7 mt-6 max-w-[840px] mx-auto">
            {CODECUBE_WORKS.slice(0, 2).map((w) => (
              <WorkWide key={w.title} {...w} />
            ))}
          </div>
        </Slide>

        {/* 5b · CODECUBE — หน้าสอง 2 ผลงาน */}
        <Slide team="sw">
          <Chapter team="sw" tag="ทีมที่ 2 · ซอฟต์แวร์" label="CodeCube · ผลงานเพิ่มเติม" />
          <H2>และอีกหลายระบบที่ดูแลให้หน่วยงานระดับประเทศ</H2>
          <div className="flex flex-col gap-7 mt-6 max-w-[840px] mx-auto">
            {CODECUBE_WORKS.slice(2, 4).map((w) => (
              <WorkWide key={w.title} {...w} />
            ))}
          </div>
        </Slide>

        <Bridge>และจากงานเหล่านั้น เราได้รับความไว้วางใจให้ทำสิ่งที่ยากขึ้น</Bridge>

        {/* 6 · custom เหตุฉุกเฉินมาบตาพุด */}
        <Slide team="sw">
          <Chapter team="sw" tag="ทีมที่ 2 · ซอฟต์แวร์" label="งานออกแบบเฉพาะ (Custom)" />
          <H2>ระบบดูแลเหตุฉุกเฉิน ที่ออกแบบขึ้นเฉพาะพื้นที่</H2>
          <Story>
            เราได้รับความไว้วางใจให้พัฒนา{' '}
            <HL>ซอฟต์แวร์บริหารจัดการเหตุฉุกเฉินแบบ Custom Made</HL> ให้กับ{' '}
            <HL>เทศบาลเมืองมาบตาพุด</HL> และ <HL>พื้นที่นิคมอุตสาหกรรมมาบตาพุด</HL>
            {' '}— พื้นที่ที่ความปลอดภัยคือเรื่องใหญ่ที่สุด
          </Story>
          <Story muted>
            ระบบที่ออกแบบให้ตรงกับสภาพพื้นที่จริง ไม่ใช่ระบบสำเร็จรูป — นี่คือสิ่งที่เราถนัด
          </Story>
          <div
            className="mt-5 rounded-[14px] overflow-hidden"
            style={{ border: `1px solid ${C.border}` }}
          >
            <Media
              src={CC + '13_maptaphut_emergency.jpg'}
              alt="หน้าจอระบบบริหารจัดการเหตุฉุกเฉิน"
              ratio="1500 / 380"
              position="top"
            />
          </div>
        </Slide>

        <Bridge>และนี่คือตัวอย่างที่เห็นภาพชัดที่สุด ว่าระบบของเราทำงานจริงอย่างไร</Bridge>

        {/* 7 · คลิป Central World */}
        <Slide team="sw">
          <Chapter team="sw" tag="ทีมที่ 2 · ซอฟต์แวร์" label="ระบบที่ทำงานในวินาทีจริง" />
          <H2>ระบบเฝ้าระวังและแจ้งเตือนความสูงของรถ ที่ Central World</H2>
          <Story muted>
            ดูได้ว่าระบบเฝ้าระวัง จับภาพ และแจ้งเตือนอย่างไรในวินาทีจริง ก่อนรถเข้าพื้นที่อาคาร
          </Story>
          <div
            className="mt-5 rounded-[14px] overflow-hidden bg-black"
            style={{ border: `1px solid ${C.border}` }}
          >
            <video
              src={encodeURI(V + '14_centralworld_height.mp4')}
              poster={encodeURI(V + '14_centralworld_poster.jpg')}
              controls
              playsInline
              preload="metadata"
              className="w-full block"
              style={{ aspectRatio: '960 / 352', objectFit: 'cover' }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-5">
            {[
              ['ปัญหา', 'รถสูงเกินพิกัดชนโครงสร้างอาคาร เกิดความเสียหาย'],
              ['ระบบทำอะไร', 'เฝ้าระวัง จับภาพ และแจ้งเตือนล่วงหน้าก่อนรถเข้าพื้นที่ พร้อมบันทึกหลักฐาน'],
              ['นำไปใช้ต่อ', 'หลักการเดียวกัน ใช้เฝ้าระวังสะพานและอุโมงค์ของท้องถิ่นได้'],
            ].map(([t, p]) => (
              <div
                key={t}
                className="bg-white rounded-xl p-4"
                style={{ border: `1px solid ${C.border}` }}
              >
                <div className="font-semibold text-[15px] mb-1" style={{ color: C.primaryDeep }}>{t}</div>
                <p className="text-[13px]" style={{ color: C.muted }}>{p}</p>
              </div>
            ))}
          </div>
        </Slide>

        <Bridge>และงานข้อมูลที่ใหญ่ที่สุดของเรา อยู่บนทางด่วน</Bridge>

        {/* 8 · IoT การทางพิเศษ */}
        <Slide team="sw">
          <Chapter team="sw" tag="ทีมที่ 2 · ซอฟต์แวร์" label="งานข้อมูลขนาดใหญ่ & IoT" />
          <H2>ดูแลข้อมูลจากอุปกรณ์ทุกตัวบนทางด่วน</H2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-center mt-6">
            <div>
              <h3 className="text-[22px] font-bold mb-1.5" style={{ color: C.primaryDeep }}>
                การทางพิเศษแห่งประเทศไทย
              </h3>
              <div className="text-[14px] font-semibold mb-3" style={{ color: C.accent }}>
                งาน IoT & Big Data บนด่านเก็บเงินทุกด่าน
              </div>
              <p className="text-[15px] leading-[1.7]" style={{ color: C.text }}>
                เราพัฒนาระบบที่รับข้อมูลจาก <HL>เซนเซอร์ทุกตัวในด่านเก็บเงิน</HL> ทุกด่านบนทางด่วน
                — ทั้งเซนเซอร์ใต้พื้น ไม้กั้น ระบบเก็บเงิน และอื่น ๆ เมื่ออุปกรณ์ตัวใดผิดปกติ ระบบ
                <strong> แจ้งเตือนแบบเรียลไทม์</strong> ให้ทีมซ่อมบำรุงเข้าแก้ไขได้ทัน
              </p>
              <p
                className="text-[14.5px] italic mt-4 pl-3.5"
                style={{ color: C.muted, borderLeft: `3px solid ${C.accent}` }}
              >
                งานนี้คือบทพิสูจน์ว่าเราดูแลระบบ IoT ขนาดใหญ่ที่ทำงานตลอด 24 ชั่วโมงได้จริง
              </p>
            </div>
            <div
              className="rounded-[14px] overflow-hidden"
              style={{ border: `1px solid ${C.border}` }}
            >
              <Media
                src={CC + '15_expressway_iot.jpg'}
                alt="ระบบ IoT ด่านเก็บเงินทางด่วน"
                ratio="720 / 190"
                position="top"
              />
            </div>
          </div>
        </Slide>

        <Bridge>และเมื่อสองทีมที่แข็งแกร่งคนละด้าน มาเจอกัน…</Bridge>

        {/* 9 · จุดบรรจบ */}
        <Slide center>
          <Chapter tag="จุดบรรจบ" center />
          <H2>เราจึงจับมือกัน สร้างระบบที่ครบทั้งฮาร์ดแวร์และซอฟต์แวร์</H2>
          <p className="text-[16.5px] md:text-[18.5px] leading-[1.8] mt-4 mx-auto max-w-[790px]" style={{ color: C.text }}>
            เมื่อทีมที่ผลิตอุปกรณ์เองได้ มาเจอกับทีมที่ดูแลข้อมูลระดับชาติ
            — ผลลัพธ์คือระบบที่ออกแบบ ผลิต ติดตั้ง และดูแลได้โดยทีมเดียว
          </p>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-5 items-center mt-7">
            <div
              className="bg-white rounded-2xl p-[22px]"
              style={{ border: `1px solid ${C.border}` }}
            >
              <span
                className="inline-block text-[12px] font-semibold text-white px-3 py-1 rounded-full mb-2.5"
                style={{ background: C.accent }}
              >
                Genius Gismo
              </span>
              <h4 className="text-[18px] font-bold mb-1.5" style={{ color: C.primaryDeep }}>ฮาร์ดแวร์</h4>
              <p className="text-[13px]" style={{ color: C.muted }}>
                โคมไฟ อุปกรณ์ เซนเซอร์ ผลิตในโรงงานมาตรฐาน มอก.
              </p>
            </div>
            <div className="text-[34px] font-bold" style={{ color: C.accent }}>+</div>
            <div
              className="bg-white rounded-2xl p-[22px]"
              style={{ border: `1px solid ${C.border}` }}
            >
              <span
                className="inline-block text-[12px] font-semibold text-white px-3 py-1 rounded-full mb-2.5"
                style={{ background: C.primary }}
              >
                CodeCube
              </span>
              <h4 className="text-[18px] font-bold mb-1.5" style={{ color: C.primaryDeep }}>ซอฟต์แวร์</h4>
              <p className="text-[13px]" style={{ color: C.muted }}>
                แพลตฟอร์ม ข้อมูล แดชบอร์ด ระบบแจ้งเตือนเรียลไทม์
              </p>
            </div>
          </div>
          <p className="text-[20px] md:text-[24px] font-semibold leading-[1.5] mt-7 mx-auto max-w-[770px]" style={{ color: C.primaryDeep }}>
            งานแรกที่เราทำร่วมกันคือ <HLA>Smart Street Light</HLA>
            {' '}— โดย Gismo ดูแลฮาร์ดแวร์ และ CodeCube ดูแลซอฟต์แวร์
          </p>
          <div className="mt-7">
            <Link
              to="/smart-street-light"
              className="inline-block text-white font-semibold text-[16px] px-9 py-3.5 rounded-full no-underline"
              style={{ background: C.accent }}
            >
              ดูผลงาน Smart Street Light →
            </Link>
          </div>
        </Slide>

        <Bridge>และนี่คือหน่วยงานที่ไว้วางใจเราตลอดเส้นทาง</Bridge>

        {/* 10 · ปิดท้าย — โลโก้/ชื่อลูกค้า */}
        <Slide>
          <Chapter tag="ปิดท้าย" label="คนที่ไว้วางใจเราแล้ว" />
          <H2>หน่วยงานและองค์กรที่เลือกใช้ผลงานของเรา</H2>

          <div className="font-semibold mt-5 mb-1.5 text-[15px]" style={{ color: C.primaryDeep }}>
            ภาครัฐ & รัฐวิสาหกิจ
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <ClientChip name="การไฟฟ้าฝ่ายผลิต (EGAT)" />
            <ClientChip name="กระทรวงยุติธรรม / สนง.กิจการยุติธรรม" />
            <ClientChip name="GISTDA" />
            <ClientChip name="NT / การทางพิเศษ" />
          </div>

          <div className="font-semibold mt-6 mb-1.5 text-[15px]" style={{ color: C.primaryDeep }}>
            องค์กรขนาดใหญ่ & ท้องถิ่น
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <ClientChip name="เทศบาลเมือง / นิคมมาบตาพุด" />
            <ClientChip name="Panasonic / MMTH" />
            <ClientChip name="TOA" />
            <ClientChip name="True Digital Park" />
          </div>

          <p className="text-[16.5px] md:text-[18.5px] leading-[1.8] mt-7" style={{ color: C.text }}>
            นี่คือ <HL>Smart B2G</HL> — สองทีมที่เดินทางคนละสาย มาบรรจบกันเพื่อท้องถิ่นไทย
          </p>
        </Slide>

      </div>
    </div>
  );
}

// Customer chips / logos for the closing wall
function ClientChip({ name }) {
  return (
    <div
      className="rounded-xl bg-white flex items-center justify-center text-center px-3 min-h-[88px]"
      style={{ border: `1px solid ${C.border}` }}
    >
      <span className="text-[13.5px] font-semibold leading-snug" style={{ color: C.primaryDeep }}>
        {name}
      </span>
    </div>
  );
}
