import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// Home.jsx — Smart B2G portfolio landing page
// Design: Civic Trust palette (Forest green + Cream + Amber) + Sarabun
// ---------------------------------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

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
  success: '#639922',
  successSoft: '#EAF3DE',
};

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// Product cards data
const PRODUCTS = [
  {
    to: '/smart-street-light',
    eyebrow: 'IoT · ประหยัดพลังงาน',
    title: 'Smart Street Light',
    body: 'ระบบไฟถนนอัจฉริยะ — Real-time monitoring + AI Predictive ลด downtime 60-70% · ประหยัดพลังงาน 30-60%',
    accent: C.primary,
    icon: 'lamp',
    image: 'images/smartlight/Gemini_Generated_Image_ykong3ykong3ykon-removebg-preview.png',
    bg: C.primaryDeep,
  },
  {
    to: '/solar-street-light',
    eyebrow: 'พลังงานทางเลือก',
    title: 'Solar Street Light',
    body: 'โคมโซล่าเซลล์ผ่าน มอก. 2954-2562 ระดับ C4 · พิสูจน์ด้วย DIALux evo · ติดตั้งจริง 2 โครงการ',
    accent: C.success,
    icon: 'sun',
    image: 'images/solar/IMG_2589.jpeg',
    bg: '#1E3A2A',
  },
  {
    to: '/waste-fee',
    eyebrow: 'GovTech · ใหม่ · 6 กลยุทธ์ลดขยะ',
    title: 'ค่าธรรมเนียมเก็บขยะ',
    body: '3-Tier (60/20/10 ฿) ตามกฎกระทรวง 2567 + กทม. precedent · เก็บได้ครบ ลดต้นทุนกำจัด · LIFF + Driver App · พร้อม 6 กลยุทธ์ลดขยะที่ต้นทาง (ปุ๋ยหมัก · ธนาคารขยะ · RDF · ฯลฯ) อ้างอิง อปท.ไทยที่ทำสำเร็จแล้ว',
    accent: C.accent,
    icon: 'recycle',
    bg: '#3D2B0F',
  },
  {
    to: '/cctv-ai',
    eyebrow: 'AI · 6 applications',
    title: 'CCTV + AI',
    body: 'AI วิเคราะห์ภาพจากกล้อง CCTV ที่มีอยู่ — ครอบคลุม 6 ปัญหาในงาน อปท. ตั้งแต่เฝ้าระวังพื้นที่ · ความปลอดภัยถนน · บริหารลานจอด ใช้กล้องเดิมที่หน่วยงานมี',
    accent: '#185FA5',
    icon: 'camera',
    bg: '#0E2540',
  },
  {
    to: '/elderly-care',
    eyebrow: 'Smart Living · ดูแล 24 ชม.',
    title: 'ดูแลผู้สูงอายุ',
    body: 'ระบบดูแลผู้สูงอายุในตำบล — ปุ่มเรียกฉุกเฉิน · ตรวจจับการล้ม · ทำงานโดยไม่ต้องติดกล้องในห้องส่วนตัว',
    accent: '#A23E48',
    icon: 'heart',
    bg: '#3D1418',
  },
  {
    to: '/emergency-mgmt',
    eyebrow: 'ศูนย์บัญชาการ · เฝ้าระวัง',
    title: 'บริหารเหตุฉุกเฉิน',
    body: 'Smart Center Solution Platform — รวมทุกช่องทางแจ้งเหตุไว้ศูนย์เดียว · คัดกรองก่อนสั่งการ · ทุกฝ่ายเห็นข้อมูลชุดเดียวกันแบบ real-time · มีหลักฐานครบ',
    accent: '#BA7517',
    icon: 'siren',
    bg: '#0B5544',
  },
];

function ProductIcon({ name, color = '#FFF' }) {
  if (name === 'lamp') return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 6v6M16 14h16l-2 14H18l-2-14z" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 32h4v6h-4z" stroke={color} strokeWidth="2.2" />
      <path d="M20 42h8" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
  if (name === 'sun') return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="8" stroke={color} strokeWidth="2.2" />
      <path d="M24 8v4M24 36v4M40 24h-4M12 24H8M35.3 12.7l-2.8 2.8M15.5 32.5l-2.8 2.8M35.3 35.3l-2.8-2.8M15.5 15.5l-2.8-2.8" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
  if (name === 'recycle') return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M16 14l-4 7 7 4M32 34l4-7-7-4M14 30l4 4 4-4" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 25l5-9 5 9M16 34h16" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (name === 'camera') return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="14" width="28" height="20" rx="2" stroke={color} strokeWidth="2.2" />
      <circle cx="22" cy="24" r="5" stroke={color} strokeWidth="2.2" />
      <path d="M36 18l6-3v18l-6-3" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
  if (name === 'heart') return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 40s-14-8-14-18a8 8 0 0114-5 8 8 0 0114 5c0 10-14 18-14 18z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M16 24l4 4 4-6 4 4 4-2" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (name === 'siren') return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M14 28a10 10 0 0120 0v2H14v-2z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M10 36h28M24 14v-4" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M34 18l3-3M14 18l-3-3M40 28h4M4 28h4" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
  return null;
}

export default function Home() {
  return (
    <div className="civic-scope" style={{ background: C.surface }}>

      {/* ════════════════════ HERO ════════════════════ */}
      <section
        className="min-h-[88vh] px-6 md:px-10 flex items-center"
        style={{
          background: `linear-gradient(135deg, ${C.primaryDeep} 0%, #0F4A3D 50%, ${C.primary} 100%)`,
        }}
      >
        <motion.div
          className="max-w-[1100px] mx-auto w-full"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <p className="text-[12px] font-semibold uppercase mb-4" style={{ letterSpacing: '2.5px', color: '#9FE1CB' }}>
              เทคโนโลยีไทย · เพื่อหน่วยงานท้องถิ่นไทย
            </p>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-semibold mb-6 text-white"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.3 }}
          >
            <span className="block">โซลูชันที่ทำตาม<span style={{ color: '#9FE1CB' }}>มาตรฐาน</span></span>
            <span className="block">สำหรับ อบต. เทศบาล <span style={{ color: '#9FE1CB' }}>และเอกชน</span></span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[18px] md:text-[20px] leading-relaxed max-w-[780px] mb-8 text-white/85"
          >
            6 ผลิตภัณฑ์ที่<strong className="text-white"> ติดตั้งใช้จริง · พิสูจน์ด้วยมาตรฐานสากล · ออกแบบโดยทีมวิศวกรในประเทศ</strong>
            <br />— ตั้งแต่ไฟถนน · พลังงานสะอาด · GovTech · AI · ดูแลผู้สูงอายุ · บริหารเหตุฉุกเฉิน
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
            <span className="inline-flex items-center text-[12px] font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.12)', color: '#9FE1CB' }}>
              มอก. รับรอง
            </span>
            <span className="inline-flex items-center text-[12px] font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.12)', color: '#9FE1CB' }}>
              ติดตั้งจริงในไทย
            </span>
            <span className="inline-flex items-center text-[12px] font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.12)', color: '#9FE1CB' }}>
              พิสูจน์ด้วย DIALux
            </span>
            <span className="inline-flex items-center text-[12px] font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.12)', color: '#9FE1CB' }}>
              ทีมงานในไทย
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-4 flex-wrap">
            <button
              onClick={() => scrollTo('products')}
              className="text-[15px] font-semibold px-6 py-3 rounded-lg cursor-pointer border-none transition-all"
              style={{ background: '#FFF', color: C.primary }}
            >
              ดูผลิตภัณฑ์ทั้งหมด
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-[15px] font-semibold px-6 py-3 rounded-lg cursor-pointer transition-all"
              style={{ background: 'transparent', color: '#FFF', border: '1px solid rgba(255,255,255,0.4)' }}
            >
              เกี่ยวกับเรา
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════ STATS STRIP ════════════════════ */}
      <section className="px-6 md:px-10 py-12" style={{ background: '#FFF', borderBottom: `1px solid ${C.surfaceSoft}` }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: '6', l: 'ผลิตภัณฑ์ในกลุ่ม', sub: 'ครบทุกหน่วยงานต้องการ' },
            { n: '15+', l: 'ปีประสบการณ์', sub: 'ทีมพัฒนาในประเทศไทย' },
            { n: 'มอก.', l: 'มาตรฐานรับรอง', sub: '2954-2562, 1955-2551, IES' },
            { n: '24/7', l: 'การสนับสนุน', sub: 'ทีมงานพูดไทย ดูแลตลอด' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-[28px] md:text-[32px] font-semibold leading-tight" style={{ color: C.primary }}>{s.n}</div>
              <div className="text-[13px] font-medium mt-1" style={{ color: C.text }}>{s.l}</div>
              <div className="text-[11px] mt-0.5" style={{ color: C.textMuted }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════ PRODUCTS ════════════════════ */}
      <section id="products" className="px-6 md:px-10 py-20 md:py-24" style={{ background: C.surface }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[12px] font-semibold uppercase mb-3" style={{ color: C.primary, letterSpacing: '2.5px' }}>
              ผลิตภัณฑ์และโซลูชัน
            </p>
            <h2
              className="font-semibold mb-5"
              style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: C.text, lineHeight: 1.3 }}
            >
              <span className="block">ครบทุกความต้องการ</span>
              <span className="block">ของหน่วยงานท้องถิ่น</span>
            </h2>
            <p className="text-[16px] leading-relaxed" style={{ color: C.textMuted }}>
              เลือกผลิตภัณฑ์ที่ตรงกับโครงการของท่าน — ทุกผลิตภัณฑ์ติดตั้งและสนับสนุนโดยทีมงานในไทย
            </p>
          </div>

          {/* 5 product cards — 3 col on desktop, 1-2 col responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((p, i) => (
              <motion.div
                key={p.to}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{
                  background: '#FFF',
                  border: `1px solid ${C.surfaceSoft}`,
                  boxShadow: '0 4px 16px rgba(31, 42, 36, 0.04)',
                }}
              >
                {/* Image / Icon header */}
                <div
                  className="relative flex items-center justify-center"
                  style={{ height: 180, background: p.bg, overflow: 'hidden' }}
                >
                  {p.image ? (
                    <>
                      <img
                        src={p.image}
                        alt={p.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ opacity: 0.55 }}
                        loading="lazy"
                      />
                      <div className="relative z-10" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>
                        <ProductIcon name={p.icon} color="#FFF" />
                      </div>
                    </>
                  ) : (
                    <div className="relative">
                      <div
                        className="absolute inset-0 rounded-full opacity-30 blur-3xl"
                        style={{ background: p.accent, width: 100, height: 100, transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}
                      />
                      <ProductIcon name={p.icon} color="#FFF" />
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="flex-1 flex flex-col p-6">
                  <p className="text-[11px] font-semibold uppercase mb-2" style={{ color: p.accent, letterSpacing: '1.5px' }}>
                    {p.eyebrow}
                  </p>
                  <h3 className="text-[20px] font-semibold mb-3" style={{ color: C.text, lineHeight: 1.3 }}>
                    {p.title}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed mb-5 flex-1" style={{ color: C.textMuted }}>
                    {p.body}
                  </p>
                  <div className="flex gap-3 items-center">
                    <Link
                      to={p.to}
                      className="text-[13px] font-medium px-4 py-2 rounded-lg no-underline"
                      style={{ background: C.primary, color: '#FFF' }}
                    >
                      ดูรายละเอียด
                    </Link>
                    <Link
                      to={p.to}
                      className="text-[13px] no-underline hover:underline"
                      style={{ color: p.accent }}
                    >
                      อ่านเพิ่ม ›
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ ABOUT ════════════════════ */}
      <section id="about" className="px-6 md:px-10 py-20 md:py-24" style={{ background: '#FFF' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[12px] font-semibold uppercase mb-3" style={{ color: C.primary, letterSpacing: '2.5px' }}>
              เกี่ยวกับเรา
            </p>
            <h2
              className="font-semibold mb-5"
              style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: C.text, lineHeight: 1.3 }}
            >
              <span className="block">เทคโนโลยีไทย</span>
              <span className="block">เพื่อหน่วยงานท้องถิ่นไทย</span>
            </h2>
            <p className="text-[16px] leading-relaxed" style={{ color: C.textMuted }}>
              ทีมวิศวกรในประเทศพัฒนาผลิตภัณฑ์และซอฟต์แวร์เองทั้งหมด — รับฟังปัญหาจริง ปรับระบบได้ตามบริบทของแต่ละหน่วยงาน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              {
                icon: '🏆',
                title: 'มาตรฐานสากล',
                desc: 'ผลิตภัณฑ์ผ่านการรับรอง มอก., LM-79, LM-80, IEC, CIE 140, EN 13201 และมาตรฐานสากลอื่นๆ',
              },
              {
                icon: '🛠️',
                title: 'ทีมพัฒนาในไทย',
                desc: 'เป็นเจ้าของเทคโนโลยีและซอฟต์แวร์เอง — พัฒนาฟีเจอร์ใหม่และปรับปรุงระบบได้รวดเร็ว',
              },
              {
                icon: '📞',
                title: 'สนับสนุน 24/7',
                desc: 'ทีมงานในไทยพูดภาษาไทย พร้อมให้คำปรึกษาและแก้ไขปัญหาตลอดอายุการใช้งาน',
              },
            ].map((f, i) => (
              <div
                key={i}
                className="rounded-2xl p-7"
                style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}
              >
                <div className="text-[36px] mb-3">{f.icon}</div>
                <h3 className="font-semibold text-[18px] mb-2" style={{ color: C.text }}>{f.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: C.textMuted }}>{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Reference projects */}
          <div className="text-[12px] font-semibold uppercase mb-4" style={{ color: C.primary, letterSpacing: '2px' }}>
            ผลงานอ้างอิง
          </div>
          <div className="flex flex-col gap-3">
            {[
              {
                icon: '🏙️',
                title: 'ระบบไฟถนน LED ทั่วประเทศ',
                desc: 'ติดตั้งระบบไฟถนน LED ประสิทธิภาพสูงให้กับเทศบาลและองค์การบริหารส่วนท้องถิ่นกว่า 50 แห่ง · รวมถึงเขตห้วยขวาง กรุงเทพฯ',
              },
              {
                icon: '☀️',
                title: 'Solar Street Light · เทศบาลเมืองสระบุรี + TOA',
                desc: 'ไฟโซล่าเซลล์ดีไซน์กินรีบนถนนสาธารณะของเทศบาลเมืองสระบุรี + ระบบไฟลานจอดรถโรงงาน TOA · ผ่านเกณฑ์ มอก. 2954-2562 ระดับ C4',
              },
              {
                icon: '🛣️',
                title: 'ระบบ Sensor ทางด่วนทั่วประเทศ',
                desc: 'พัฒนาระบบ Sensor ตรวจสอบสภาพถนน สัญญาณไฟ และความปลอดภัยสำหรับทางด่วนทุก Plaza',
              },
              {
                icon: '⚖️',
                title: 'ระบบ AI/ML — กระทรวงยุติธรรม',
                desc: 'พัฒนาระบบ AI/Machine Learning สำหรับติดตามพฤติกรรมผู้ต้องขังที่พ้นโทษ — ปลอดภัยของสังคม',
              },
            ].map((c, i) => (
              <div
                key={i}
                className="rounded-xl p-5 flex gap-5 items-start"
                style={{ background: C.surface, border: `1px solid ${C.surfaceSoft}` }}
              >
                <div className="text-[28px] flex-shrink-0">{c.icon}</div>
                <div>
                  <div className="font-semibold text-[15px] mb-1" style={{ color: C.text }}>{c.title}</div>
                  <div className="text-[13px] leading-relaxed" style={{ color: C.textMuted }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ CTA ════════════════════ */}
      <section className="px-6 md:px-10 py-20 md:py-24" style={{ background: C.primaryDeep }}>
        <div className="max-w-[680px] mx-auto text-center">
          <p className="text-[12px] font-semibold uppercase mb-3" style={{ color: '#9FE1CB', letterSpacing: '2.5px' }}>
            เริ่มต้นวันนี้
          </p>
          <h2
            className="font-semibold mb-5 text-white"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.3 }}
          >
            <span className="block">พร้อมยกระดับ</span>
            <span className="block">หน่วยงานของท่าน?</span>
          </h2>
          <p className="text-[17px] leading-relaxed mb-10 text-white/75">
            รับคำปรึกษาและประเมินราคาเบื้องต้น<strong className="text-white">ฟรี</strong> — เราออกแบบให้ตรงกับขนาดและบริบทของหน่วยงานท่าน
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="mailto:mcctua2@gmail.com?subject=ขอคำปรึกษา&body=สนใจผลิตภัณฑ์ในกลุ่ม%20Smart%20B2G%0A%0Aชื่อหน่วยงาน:%20%0Aผลิตภัณฑ์ที่สนใจ:%20%0Aผู้ติดต่อ:%20%0Aเบอร์โทรศัพท์:%20"
              className="inline-block text-[15px] font-semibold px-6 py-3 rounded-lg no-underline"
              style={{ background: '#FFF', color: C.primary }}
            >
              ติดต่อเรา
            </a>
            <a
              href="mailto:mcctua2@gmail.com?subject=ขอใบเสนอราคา"
              className="inline-block text-[15px] font-semibold px-6 py-3 rounded-lg no-underline"
              style={{ background: 'transparent', color: '#FFF', border: '1px solid rgba(255,255,255,0.4)' }}
            >
              ขอใบเสนอราคา
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
