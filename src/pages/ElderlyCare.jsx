import React from 'react';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// ElderlyCare.jsx — ระบบดูแลผู้สูงอายุ 360° (ลูกหลานดิจิทัล)
// Pain-first storytelling: pain → แนวคิด → 3 pillars → privacy → reuse → benefits → pilot → CTA
// Design system: Apple-style (#0071e3, Inter) — same as Home/SmartLight/SolarLight
// Status: เนื้อหาเสนอแบบสินค้าพร้อมขาย (per Tua's spec) — แต่ตัวเลขทุกตัว label "ประมาณการ"
// ---------------------------------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const painPoints = [
  {
    icon: '🚨',
    title: 'ล้มในห้องน้ำ ไม่มีคนรู้',
    desc: 'ผู้สูงอายุที่อยู่บ้านลำพังตอนกลางวัน เมื่อเกิดเหตุล้ม วูบ หรือหมดสติ — กว่าจะมีคนมาเจอบางครั้งสายเกินไป',
  },
  {
    icon: '👁️',
    title: 'ติดกล้อง = อึดอัด',
    desc: 'ผู้สูงอายุไม่ยอมให้ติดกล้องในห้องนอน/ห้องน้ำ เพราะรู้สึกถูกจ้องและเสียศักดิ์ศรี — เป็นข้อจำกัดของระบบกล้องดั้งเดิม',
  },
  {
    icon: '👥',
    title: 'อสม. 1 คน ดูแล 30 หลัง',
    desc: 'อาสาสมัครและเจ้าหน้าที่มีจำกัด ไม่สามารถเฝ้าผู้สูงอายุได้ตลอด 24 ชั่วโมง โดยเฉพาะช่วงกลางคืนและวันหยุด',
  },
  {
    icon: '📹',
    title: 'CCTV เมืองมีไว้ดูทีหลัง',
    desc: 'กล้องของเทศบาลที่ติดทั่วเมืองส่วนใหญ่ใช้สำหรับตรวจสอบย้อนหลัง — ไม่ได้แจ้งเตือนตอนคนล้มหรือต้องการช่วยเหลือ',
  },
];

const pillars = [
  {
    tag: 'Pillar 1 · ในบ้าน',
    icon: '🏠',
    title: 'เซนเซอร์เรดาร์ ในห้องที่ต้องการความเป็นส่วนตัว',
    benefit: 'ตรวจจับการล้มและสัญญาณชีพ 24 ชม. โดย "ไม่เห็นภาพ"',
    detail: 'ติดตั้งในห้องน้ำและห้องนอน ใช้คลื่น mmWave Radar ตรวจจับการเคลื่อนไหว การล้ม การหายใจ และอัตราการเต้นของหัวใจ — โดยไม่บันทึกภาพใดๆ ผู้สูงอายุยอมรับได้เพราะรู้สึกปลอดภัยและมีศักดิ์ศรี',
    proofPoints: ['ไม่ใช่กล้อง ไม่มีภาพ', 'แจ้งเตือนทันทีเมื่อล้ม', 'ทำงานได้แม้ในที่มืด'],
  },
  {
    tag: 'Pillar 2 · พื้นที่สาธารณะ',
    icon: '🏙️',
    title: 'AI ต่อยอด CCTV เดิมของเทศบาล',
    benefit: 'อัปเกรดกล้องที่มีอยู่ ให้ "ตรวจจับเหตุ" ไม่ใช่ "บันทึกเหตุ"',
    detail: 'ใช้ AI Object Detection ต่อบนกล้อง CCTV ของเทศบาลที่มีอยู่แล้ว เพื่อตรวจจับเหตุการณ์ผิดปกติในที่สาธารณะ เช่น คนล้ม คนนอนนิ่ง ฝูงคนรวมตัว และยังต่อยอดติดบนรถเก็บขยะเพื่อสแกนหาไฟดวงเสีย/ถนนชำรุดได้อัตโนมัติ',
    proofPoints: ['ใช้ของเดิม ไม่ต้องเปลี่ยนกล้อง', 'แจ้งเตือนแบบ real-time', 'ลดภาระเจ้าหน้าที่ COC'],
  },
  {
    tag: 'Pillar 3 · เมื่อออกนอกบ้าน',
    icon: '⌚',
    title: 'อุปกรณ์สวมใส่ พร้อมปุ่ม SOS',
    benefit: 'ปุ่มเดียวเรียกได้ ไม่ว่าผู้สูงอายุจะอยู่ที่ไหนในตำบล',
    detail: 'นาฬิกาหรือสายรัดข้อมือที่มีปุ่มฉุกเฉิน + GPS ติดตามตำแหน่ง เชื่อม 4G/NB-IoT ส่งสัญญาณกลับศูนย์ COC ของเทศบาลทันที — เหมาะกับผู้สูงอายุที่ออกตลาด ไปวัด หรือเดินออกกำลังกาย',
    proofPoints: ['ปุ่ม SOS กดง่าย', 'GPS ระบุตำแหน่งแม่นยำ', 'แบตอยู่ได้หลายวัน'],
  },
];

const benefits = [
  {
    icon: '⏱️',
    title: 'ลดเวลาเข้าถึงเหตุ',
    desc: 'จากการแจ้งโดย "คนเห็น" → เปลี่ยนเป็น "ระบบแจ้ง" — ลด response time ลงได้อย่างมีนัยสำคัญ (ประมาณการ ขึ้นกับโครงข่ายกู้ชีพในพื้นที่)',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'ครอบครัวอุ่นใจ ผู้สูงอายุมีอิสระ',
    desc: 'ลูกหลานทำงานต่างจังหวัดสบายใจขึ้น — ผู้สูงอายุไม่ต้องไปอยู่กับลูกหลาน ใช้ชีวิตในบ้านตัวเองได้เหมือนเดิม',
  },
  {
    icon: '📊',
    title: 'ข้อมูลสุขภาพชุมชน',
    desc: 'เทศบาลมีข้อมูลพฤติกรรมและความเสี่ยงของผู้สูงอายุในพื้นที่ — ใช้วางแผนสวัสดิการและงบประมาณได้ตรงกลุ่มเป้าหมาย',
  },
  {
    icon: '🏆',
    title: 'ภาพลักษณ์เทศบาลที่ใส่ใจคน',
    desc: 'หลังใช้ระบบ 6-12 เดือน เทศบาลมีข้อมูลและกรณีศึกษาเพื่อนำไปสมัคร depa Smart City Awards / รางวัล อปท. ดีเด่นได้',
  },
];

const reuseAdvantages = [
  { label: 'CCTV เดิมของเทศบาล', detail: 'อัปเกรดด้วย AI Edge — ไม่ต้องเปลี่ยนกล้อง' },
  { label: 'รถเก็บขยะที่วิ่งทุกวัน', detail: 'ติดกล้อง + AI สแกนเมืองอัตโนมัติ' },
  { label: 'ศูนย์ COC ที่มีอยู่', detail: 'ต่อ Dashboard เพิ่ม ไม่สร้างศูนย์ใหม่' },
  { label: 'ระบบ 1132 / Traffy Fondue', detail: 'เชื่อม API ส่งเหตุเข้าระบบเดิม' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ElderlyCare() {
  return (
    <div>
      {/* HERO — Pain-led */}
      <section className="min-h-[88vh] bg-black flex items-center justify-center px-6 py-24 text-center relative overflow-hidden">
        {/* subtle radar-pulse background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#0071e3] animate-ping" style={{ animationDuration: '4s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#0071e3] animate-ping" style={{ animationDuration: '3s' }} />
        </div>

        <motion.div
          className="max-w-3xl relative z-10"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-[#2997ff] text-[14px] font-semibold tracking-[2.5px] uppercase mb-5"
          >
            ดูแลผู้สูงอายุ · Smart Living
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-white font-semibold leading-[1.07] tracking-[-0.5px] mb-6"
            style={{ fontSize: 'clamp(36px, 6vw, 60px)' }}
          >
            ลูกหลานดิจิทัล<br />
            <span className="text-[#2997ff]">24 ชั่วโมง</span><br />
            สำหรับผู้สูงอายุในตำบล
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-white/75 mb-10 max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(17px, 2vw, 21px)', lineHeight: 1.5 }}
          >
            เมื่อผู้สูงอายุล้มในบ้านลำพัง — ระบบรู้ก่อนที่ใครจะเดินมาเจอ<br />
            เมื่อออกนอกบ้านไปตลาด — ปุ่มเดียวเรียกได้ทันที<br />
            ทั้งหมดทำงานโดยไม่ต้องติดกล้องในห้องส่วนตัว
          </motion.p>
          <motion.div variants={fadeUp} className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => scrollTo('pain')}
              className="bg-[#0071e3] text-white text-[17px] px-6 py-2 rounded-lg border-none cursor-pointer hover:bg-[#0077ed] transition-colors"
            >
              ดูปัญหาที่แก้ได้
            </button>
            <button
              onClick={() => scrollTo('pillars')}
              className="text-[#2997ff] border border-[#2997ff] text-[17px] px-6 py-2 rounded-full bg-transparent cursor-pointer hover:underline"
            >
              ระบบ 3 ส่วน
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* PAIN POINTS */}
      <section id="pain" className="bg-[#f5f5f7] py-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-3">ปัญหาที่เทศบาลเจอจริง</p>
            <h2 className="text-[#1d1d1f] font-semibold leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
              4 เหตุการณ์ที่<br />ระบบเดิมตามไม่ทัน
            </h2>
            <p className="text-black/60 text-[17px] leading-relaxed mt-5">
              ระบบดูแลผู้สูงอายุที่ใช้กันอยู่ส่วนใหญ่เป็น <span className="font-semibold">"เชิงรับ"</span> — ต้องรอให้คนเห็น แล้วจึงแจ้ง
              <br />คำถามคือ ระหว่างที่ยังไม่มีใครเห็น... เกิดอะไรขึ้น?
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            {painPoints.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-xl p-7 shadow-[rgba(0,0,0,0.08)_3px_5px_24px_0px]"
              >
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="text-[#1d1d1f] font-semibold text-[21px] leading-snug mb-3">{p.title}</h3>
                <p className="text-black/65 text-[15px] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CONCEPT — Reactive vs Proactive */}
      <section className="bg-black py-24 px-6">
        <div className="max-w-[980px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-3">แนวคิดของระบบ</p>
            <h2 className="text-white font-semibold leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
              ไม่รอเหตุเกิด<br />ระบบเตือนก่อนสายเกินไป
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#272729] rounded-2xl p-8 border border-white/5">
              <p className="text-[12px] font-semibold tracking-[2px] uppercase text-white/50 mb-3">แบบเดิม</p>
              <h3 className="text-white text-[24px] font-semibold mb-4">เชิงรับ (Reactive)</h3>
              <ul className="text-white/70 text-[15px] leading-relaxed space-y-2">
                <li>• รอให้มีคนเห็น แล้วจึงแจ้ง</li>
                <li>• ผู้สูงอายุต้องกดโทรเอง — ถ้ายังกดไหว</li>
                <li>• CCTV ใช้ดูย้อนหลังว่าเกิดอะไรขึ้น</li>
                <li>• เจ้าหน้าที่ต้องเฝ้าจอตลอดเวลา</li>
              </ul>
            </div>
            <div className="bg-[#0a3a6b] rounded-2xl p-8 border border-[#0071e3]/30">
              <p className="text-[12px] font-semibold tracking-[2px] uppercase text-[#2997ff] mb-3">แบบใหม่</p>
              <h3 className="text-white text-[24px] font-semibold mb-4">เชิงรุก (Proactive)</h3>
              <ul className="text-white/85 text-[15px] leading-relaxed space-y-2">
                <li>• ระบบตรวจจับเหตุก่อน แล้วแจ้งเอง</li>
                <li>• ไม่ต้องรอให้กดปุ่ม</li>
                <li>• AI วิเคราะห์เหตุการณ์ผิดปกติแบบ real-time</li>
                <li>• เจ้าหน้าที่รับเฉพาะเหตุที่ผ่านการคัดกรองแล้ว</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3 PILLARS */}
      <section id="pillars" className="bg-[#f5f5f7] py-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-3">ระบบ 3 ส่วน</p>
            <h2 className="text-[#1d1d1f] font-semibold leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
              ครอบคลุมทุกที่<br />ที่ผู้สูงอายุไป
            </h2>
            <p className="text-black/60 text-[17px] leading-relaxed mt-5">
              ในบ้าน · ออกนอกบ้าน · ในเมือง — ระบบ 3 ส่วนที่ทำงานเชื่อมกัน ผ่านศูนย์ COC ของเทศบาล
            </p>
          </div>

          <div className="space-y-8">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-white rounded-2xl overflow-hidden shadow-[rgba(0,0,0,0.1)_3px_5px_30px_0px]"
              >
                <div className="grid grid-cols-1 md:grid-cols-[280px_1fr]">
                  <div className="bg-[#0a3a6b] text-white p-8 flex flex-col justify-center items-center text-center">
                    <div className="text-6xl mb-4">{p.icon}</div>
                    <p className="text-[12px] font-semibold tracking-[2px] uppercase text-[#2997ff] mb-2">{p.tag}</p>
                  </div>
                  <div className="p-8 md:p-10">
                    <h3 className="text-[#1d1d1f] font-semibold text-[24px] leading-snug mb-3">{p.title}</h3>
                    <p className="text-[#0071e3] text-[17px] font-medium leading-relaxed mb-4">{p.benefit}</p>
                    <p className="text-black/65 text-[15px] leading-relaxed mb-5">{p.detail}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.proofPoints.map((pp, j) => (
                        <span key={j} className="text-[13px] bg-[#f5f5f7] text-[#0071e3] px-3 py-1 rounded-full font-medium">
                          ✓ {pp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIVACY — ทำไมเรดาร์ ไม่ใช้กล้อง */}
      <section className="bg-black py-24 px-6">
        <div className="max-w-[980px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-3">Privacy First</p>
            <h2 className="text-white font-semibold leading-tight mb-5" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
              ทำไมเราเลือก "เรดาร์"<br />แทนการติดกล้องในห้อง?
            </h2>
            <p className="text-white/70 text-[17px] leading-relaxed">
              ความเป็นส่วนตัวของผู้สูงอายุ คือเหตุผลที่ครอบครัวส่วนใหญ่ปฏิเสธระบบดูแลที่ใช้กล้อง
              <br />เราจึงใช้คลื่น mmWave Radar ที่เห็น "การเคลื่อนไหว" แต่ไม่เห็น "ตัวคน"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#272729] rounded-2xl p-8">
              <h3 className="text-white text-[20px] font-semibold mb-5">📷 ระบบที่ใช้กล้อง</h3>
              <ul className="text-white/70 text-[15px] leading-relaxed space-y-3">
                <li className="flex gap-3"><span className="text-red-400 shrink-0">✕</span> เห็นภาพร่างกายผู้สูงอายุชัดเจน</li>
                <li className="flex gap-3"><span className="text-red-400 shrink-0">✕</span> ผู้สูงอายุรู้สึกถูกจ้อง อึดอัด</li>
                <li className="flex gap-3"><span className="text-red-400 shrink-0">✕</span> ติดในห้องนอน/ห้องน้ำลำบาก</li>
                <li className="flex gap-3"><span className="text-red-400 shrink-0">✕</span> ในที่มืดประสิทธิภาพลดลง</li>
              </ul>
            </div>
            <div className="bg-[#0a3a6b] rounded-2xl p-8 border border-[#0071e3]/30">
              <h3 className="text-white text-[20px] font-semibold mb-5">📡 ระบบเรดาร์ของเรา</h3>
              <ul className="text-white/85 text-[15px] leading-relaxed space-y-3">
                <li className="flex gap-3"><span className="text-[#2997ff] shrink-0">✓</span> ไม่บันทึกภาพใดๆ — เห็นแต่ "การเคลื่อนไหว"</li>
                <li className="flex gap-3"><span className="text-[#2997ff] shrink-0">✓</span> ผู้สูงอายุยอมรับได้ ไม่รู้สึกถูกจ้อง</li>
                <li className="flex gap-3"><span className="text-[#2997ff] shrink-0">✓</span> ติดในห้องส่วนตัวได้ ไม่ละเมิด PDPA</li>
                <li className="flex gap-3"><span className="text-[#2997ff] shrink-0">✓</span> ทำงานได้ดีในที่มืด มีกำแพงกั้นยังตรวจจับได้</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* REUSE — ใช้ของเดิมที่มี */}
      <section className="bg-[#f5f5f7] py-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-3">ไม่ต้องเริ่มจากศูนย์</p>
            <h2 className="text-[#1d1d1f] font-semibold leading-tight mb-5" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
              ต่อยอดจากสิ่งที่<br />เทศบาลมีอยู่แล้ว
            </h2>
            <p className="text-black/60 text-[17px] leading-relaxed">
              เราออกแบบระบบให้ทำงานบนโครงสร้างพื้นฐานที่เทศบาลลงทุนไปแล้ว — ลดงบประมาณรอบใหม่ ลดเวลาติดตั้ง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[900px] mx-auto">
            {reuseAdvantages.map((r, i) => (
              <div key={i} className="bg-white rounded-xl p-6 flex items-start gap-4 shadow-[rgba(0,0,0,0.05)_3px_5px_18px_0px]">
                <div className="bg-[#0071e3] text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h4 className="text-[#1d1d1f] font-semibold text-[17px] mb-1">{r.label}</h4>
                  <p className="text-black/60 text-[14px] leading-relaxed">{r.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-black py-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-3">ผลลัพธ์ที่คาดหวัง</p>
            <h2 className="text-white font-semibold leading-tight mb-5" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
              ประโยชน์ที่<br />เทศบาลและประชาชนได้
            </h2>
            <p className="text-white/60 text-[14px] leading-relaxed italic">
              * ตัวเลขและผลลัพธ์เป็นประมาณการ ขึ้นอยู่กับขนาดพื้นที่และจำนวนจุดติดตั้ง — สามารถวัด KPI ได้จริงในช่วง pilot
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-[#272729] rounded-2xl p-8"
              >
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className="text-white font-semibold text-[21px] leading-snug mb-3">{b.title}</h3>
                <p className="text-white/70 text-[15px] leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PILOT — Sandbox */}
      <section className="bg-[#f5f5f7] py-24 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-3">เริ่มจากเล็กไปใหญ่</p>
          <h2 className="text-[#1d1d1f] font-semibold leading-tight mb-5" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
            ไม่ต้องลงทุนทั้งตำบล<br />เริ่ม Pilot 1 ชุมชนก่อน
          </h2>
          <p className="text-black/65 text-[17px] leading-relaxed mb-12">
            แนะนำให้เลือก 1 ชุมชนในเขตเทศบาลเป็นพื้นที่นำร่อง 3-6 เดือน เพื่อพิสูจน์ผลและเก็บข้อมูล
            <br />ก่อนขยายไปยังพื้นที่อื่น — ลดความเสี่ยงงบประมาณ และมี case study เป็นของตัวเอง
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { phase: 'Phase 1', title: '1 ชุมชนนำร่อง', detail: '5-10 บ้าน + 2-3 จุดสาธารณะ ระยะ 3 เดือน', },
              { phase: 'Phase 2', title: 'ขยายในเขตเทศบาล', detail: 'อิงผลจาก Phase 1 ขยายตามชุมชนที่ความเสี่ยงสูง', },
              { phase: 'Phase 3', title: 'เชื่อมกับงบสวัสดิการ', detail: 'ต่อยอดเป็นโครงการดูแลผู้สูงอายุระยะยาวของเทศบาล', },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-[rgba(0,0,0,0.06)_3px_5px_20px_0px] text-left">
                <p className="text-[12px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-2">{s.phase}</p>
                <h4 className="text-[#1d1d1f] font-semibold text-[19px] leading-snug mb-2">{s.title}</h4>
                <p className="text-black/60 text-[14px] leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section className="bg-white py-16 px-6 border-t border-black/5">
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'PDPA', desc: 'รองรับ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล 2562 — มี consent + audit log' },
              { title: 'Open API', desc: 'เชื่อมระบบ 1132 และ Traffy Fondue ของหน่วยงานท้องถิ่นได้' },
              { title: 'Edge + Cloud', desc: 'ประมวลผลที่อุปกรณ์ก่อนส่ง Cloud — ลดข้อมูลส่วนบุคคลที่ออกนอกระบบ' },
            ].map((c, i) => (
              <div key={i} className="border-l-2 border-[#0071e3] pl-5">
                <h4 className="text-[#1d1d1f] font-semibold text-[17px] mb-2">{c.title}</h4>
                <p className="text-black/60 text-[14px] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-24 px-6 text-center">
        <div className="max-w-[680px] mx-auto">
          <p className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-3">ขั้นต่อไป</p>
          <h2 className="text-white font-semibold leading-tight mb-5" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
            ขอ 30 นาที<br />คุยปัญหาผู้สูงอายุในพื้นที่ของท่าน
          </h2>
          <p className="text-white/70 text-[17px] leading-relaxed mb-10">
            ไม่ต้องตัดสินใจอะไรในวันนี้ — เราขอฟังก่อนว่าเทศบาลของท่านเจอปัญหาอะไร
            <br />แล้วเราจึงเสนอแบบที่เหมาะกับพื้นที่ ไม่ใช่ขายแพ็กเกจสำเร็จรูป
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#"
              className="inline-block bg-[#0071e3] text-white text-[17px] px-6 py-2 rounded-lg no-underline hover:bg-[#0077ed] transition-colors"
            >
              นัดคุยกับทีม
            </a>
            <a
              href="#"
              className="inline-block text-[#2997ff] border border-[#2997ff] text-[17px] px-6 py-2 rounded-full no-underline hover:underline"
            >
              ขอเอกสารเพิ่มเติม
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
