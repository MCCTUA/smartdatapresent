import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

function Section({ dark, children, id = '' }) {
  return (
    <section id={id} className={`py-24 px-6 ${dark ? 'bg-black text-white' : 'bg-[#f5f5f7] text-[#1d1d1f]'}`}>
      {children}
    </section>
  );
}

function SectionHeader({ eyebrow, title, body, dark }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      <p className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-3">{eyebrow}</p>
      <h2 className={`font-semibold leading-[1.1] mb-5 ${dark ? 'text-white' : 'text-[#1d1d1f]'}`}
        style={{ fontSize: 'clamp(28px,4vw,40px)' }}>
        {title}
      </h2>
      {body && <p className={`text-[17px] leading-[1.47] tracking-[-0.374px] ${dark ? 'text-white/70' : 'text-black/70'}`}>{body}</p>}
    </div>
  );
}

const phases = [
  {
    n: '01',
    title: 'การแจ้งเตือนและเชิญชวน',
    desc: 'เทศบาลส่งจดหมายแจ้งการเก็บค่าธรรมเนียมพร้อม LINE OA ให้ประชาชน เพื่อเชิญชวนให้ลงทะเบียนและเข้าระบบ',
    tags: ['Dynamic QR Code', 'Official LINE OA', 'Notification System'],
  },
  {
    n: '02',
    title: 'ลงทะเบียนและเข้าระบบ',
    desc: 'ประชาชนลงทะเบียนด้วยเลขที่บ้าน ชื่อ เบอร์มือถือ และเข้า Mini App ผ่าน LINE OA',
    tags: ['House Registration', 'Officer Identity Verification', 'LINE Mini App'],
  },
  {
    n: '03',
    title: 'สร้างบิลและชำระเงิน',
    desc: 'ระบบสร้างบิลอัตโนมัติตามประเภทบริการ (ค่าขยะ ค่าน้ำ ค่าไฟ) ประชาชนชำระผ่าน QR Code Payment (Cashless Only)',
    tags: ['Auto Billing', 'QR Code Payment (PromptPay)', 'Digital Receipt'],
  },
  {
    n: '04',
    title: 'กระทบยอดอัตโนมัติ',
    desc: 'ระบบกระทบยอดรายวันกับธนาคารโดยอัตโนมัติ เพื่อตรวจสอบว่าเงินที่ได้รับตรงกับบิลที่ออก (Anti-Fraud)',
    tags: ['Daily Auto-Reconciliation', 'Bank Integration', 'Anomaly Detection'],
  },
  {
    n: '05',
    title: 'อนุมัติและออกใบเสร็จ',
    desc: 'ระบบอนุมัติการชำระเงินและออกใบเสร็จพร้อม QR Code ให้ประชาชน',
    tags: ['Approval Workflow', 'QR Code Receipt', 'Digital Archive'],
  },
  {
    n: '06',
    title: 'เก็บขยะและยืนยัน',
    desc: 'เจ้าหน้าที่บันทึก GPS ตำแหน่งบ้าน และถ่ายรูปเป็นหลักฐานการเก็บขยะ ประชาชนยืนยันผ่าน QR Code',
    tags: ['GPS Tracking', 'Photo Evidence', 'Crowdsourced Verification'],
  },
  {
    n: '07',
    title: 'ตรวจจับการทุจริต',
    desc: 'ระบบ AI ตรวจจับพฤติกรรมผิดปกติและการทุจริตแบบ Real-time เช่น เจ้าหน้าที่เก็บเงินมากกว่าบิล',
    tags: ['Real-time Monitoring', 'AI Anomaly Detection', 'Alert System'],
  },
  {
    n: '08',
    title: 'ตรวจสอบและเปิดเผย',
    desc: 'ระบบ Audit รายเดือน และเปิดเผยรายงานต่อสาธารณชน เพื่อเพิ่มความโปร่งใสและความเชื่อใจ',
    tags: ['Monthly Audit', 'Public Disclosure', 'Transparency Report'],
  },
];

export default function FeeManagement() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-screen bg-black flex items-center justify-center px-6 text-center">
        <motion.div className="max-w-3xl" initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-4">
            GovTech Solution
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-white font-semibold leading-[1.07] tracking-[-0.28px] mb-5"
            style={{ fontSize: 'clamp(36px,6vw,56px)' }}
          >
            ระบบบริหารจัดการ<br />ค่าธรรมเนียมท้องถิ่น
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/70 mb-8" style={{ fontSize: 'clamp(17px,2vw,21px)', lineHeight: 1.47 }}>
            โปร่งใส ปลอดภัย และเชื่อถือได้
          </motion.p>
          <motion.div variants={fadeUp} className="flex gap-3 justify-center flex-wrap mb-10">
            {['Cashless Only', 'Anti-Fraud AI', 'Real-time Dashboard', 'GPS Tracking'].map((tag, i) => (
              <span key={i} className="text-[13px] font-semibold px-3 py-1 rounded-[980px] border border-[#0071e3] text-[#0071e3]">
                {tag}
              </span>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} className="flex gap-4 justify-center flex-wrap">
            <a href="#workflow" className="bg-[#0071e3] text-white text-[17px] px-6 py-2 rounded-lg no-underline hover:bg-[#0077ed] transition-colors">
              ดูขั้นตอนการทำงาน
            </a>
            <a href="#contact" className="text-[#2997ff] border border-[#2997ff] text-[17px] px-6 py-2 rounded-[980px] no-underline hover:underline">
              ขอรับคำปรึกษา ›
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-black border-t border-white/10">
        <div className="max-w-[980px] mx-auto grid grid-cols-2 md:grid-cols-4">
          {[
            { before: '50%', after: '0-2%', l: 'การทุจริต' },
            { before: '30%', after: '95%', l: 'ความเชื่อใจประชาชน' },
            { before: '40h', after: '20h', l: 'เวลาเก็บเงิน/เดือน' },
            { before: '15%', after: '<1%', l: 'ข้อผิดพลาด' },
          ].map((s, i) => (
            <div key={i} className={`py-10 text-center ${i < 3 ? 'border-r border-white/10' : ''}`}>
              <div className="text-[13px] text-white/40 line-through mb-1">{s.before}</div>
              <div className="text-[32px] font-semibold text-[#0071e3] leading-[1.1]">{s.after}</div>
              <div className="text-[13px] text-white/60 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Overview */}
      <Section>
        <div className="max-w-[980px] mx-auto">
          <SectionHeader eyebrow="ภาพรวม" title="ระบบครบวงจรเพื่อขจัดทุจริต" body="ระบบจัดการค่าธรรมเนียม ค่าขยะ ค่าน้ำ และค่าไฟ สำหรับเทศบาล/อบต. รองรับการทำงานพร้อมกันจำนวนมาก พร้อมมาตรการป้องกันทุจริตและมิจฉาชีพ" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '💳', title: 'Cashless Only', desc: 'ยกเลิกเงินสดทั้งหมด ทุกการชำระผ่าน QR Code Payment เพื่อตรวจสอบได้ 100%' },
              { icon: '🔍', title: 'Transparent', desc: 'เปิดเผยข้อมูลต่อสาธารณชน ประชาชนตรวจสอบสถานะการชำระและเก็บขยะได้แบบ Real-time' },
              { icon: '🤖', title: 'AI Anti-Fraud', desc: 'AI ตรวจจับพฤติกรรมผิดปกติและการทุจริตแบบ Real-time พร้อมแจ้งเตือนทันที' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-lg p-8 shadow-[rgba(0,0,0,0.22)_3px_5px_30px_0px]">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-[#1d1d1f] font-bold text-[21px] leading-[1.19] mb-2">{f.title}</h3>
                <p className="text-black/70 text-[14px] leading-[1.47]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 8 Phases Workflow */}
      <Section dark id="workflow">
        <div className="max-w-[980px] mx-auto">
          <SectionHeader dark eyebrow="ขั้นตอนการทำงาน" title="8 Phase Workflow" body="กระบวนการทำงานครบวงจรตั้งแต่การแจ้งเตือนประชาชนจนถึงการเปิดเผยรายงานสาธารณะ" />
          <div className="flex flex-col">
            {phases.map((p, i) => (
              <div key={i} className="flex gap-6 py-8 border-b border-white/10 last:border-b-0">
                <div className="text-[40px] font-semibold text-[#0071e3] leading-[1] flex-shrink-0 w-14">{p.n}</div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-[21px] leading-[1.19] mb-2">{p.title}</h3>
                  <p className="text-white/70 text-[14px] leading-[1.47] mb-3">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag, j) => (
                      <span key={j} className="text-[12px] font-semibold px-3 py-1 rounded-[980px] border border-[#0071e3] text-[#0071e3]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Security Features */}
      <Section>
        <div className="max-w-[980px] mx-auto">
          <SectionHeader eyebrow="ความปลอดภัย" title="3 ชั้นป้องกัน\nที่ครอบคลุม" body="ระบบออกแบบให้ป้องกันทั้งมิจฉาชีพภายนอกและการทุจริตภายในอย่างครอบคลุม" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🛡️',
                title: 'ป้องกันมิจฉาชีพ\n(Anti-Scam)',
                items: [
                  'Dynamic QR Code เฉพาะเจาะจงต่อบ้าน',
                  'Officer Identity QR Code ตรวจสอบตัวตน',
                  'Official LINE OA ที่ Verified (โล่สีเขียว)',
                  'No Link Policy ไม่ส่ง SMS แนบลิงก์',
                ],
              },
              {
                icon: '🔒',
                title: 'ป้องกันการทุจริต\n(Anti-Fraud)',
                items: [
                  'Cashless Only ยกเลิกเงินสดทั้งหมด',
                  'Segregation of Duties แยกหน้าที่',
                  'Auto-Reconciliation กระทบยอดรายวัน',
                  'Immutable Audit Logs บันทึกไม่แก้ไขได้',
                ],
              },
              {
                icon: '📡',
                title: 'ติดตามและโปร่งใส\n(Monitoring)',
                items: [
                  'Real-time Dashboard ติดตามสถานะ',
                  'GPS Geofencing ตรวจว่าอยู่หน้าบ้านจริง',
                  'Photo Evidence บังคับถ่ายรูปหลักฐาน',
                  'Public Disclosure เปิดเผยรายงาน',
                ],
              },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-lg p-8 shadow-[rgba(0,0,0,0.22)_3px_5px_30px_0px]">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-[#1d1d1f] font-bold text-[21px] leading-[1.19] mb-4 whitespace-pre-line">{f.title}</h3>
                <ul className="space-y-3">
                  {f.items.map((item, j) => (
                    <li key={j} className="text-[14px] text-black/70 leading-[1.47] pl-5 relative">
                      <span className="absolute left-0 text-[#0071e3] font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Benefits Table */}
      <Section dark>
        <div className="max-w-[980px] mx-auto">
          <SectionHeader dark eyebrow="ผลลัพธ์ที่คาดหวัง" title="ก่อนและหลัง\nที่พิสูจน์แล้ว" />
          <div className="overflow-x-auto">
            <table className="w-full text-[15px]">
              <thead>
                <tr className="border-b border-white/15">
                  <th className="text-left py-4 px-5 text-white/50 font-semibold text-[12px] tracking-[0.5px] uppercase">ประเด็น</th>
                  <th className="text-center py-4 px-5 text-white/50 font-semibold text-[12px] tracking-[0.5px] uppercase">ก่อน</th>
                  <th className="text-center py-4 px-5 text-white/50 font-semibold text-[12px] tracking-[0.5px] uppercase">หลัง</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'การทุจริต', before: '50%', after: '0-2%' },
                  { label: 'ความเชื่อใจประชาชน', before: '30%', after: '95%' },
                  { label: 'เวลาเก็บเงิน', before: '40 ชั่วโมง/เดือน', after: '20 ชั่วโมง/เดือน' },
                  { label: 'ข้อผิดพลาด', before: '15%', after: '<1%' },
                  { label: 'ความพึงพอใจประชาชน', before: '40%', after: '90%' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/8">
                    <td className="py-4 px-5 text-white font-semibold">{row.label}</td>
                    <td className="py-4 px-5 text-center text-red-400">{row.before}</td>
                    <td className="py-4 px-5 text-center text-green-400 font-semibold">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section>
        <div className="max-w-[980px] mx-auto">
          <SectionHeader eyebrow="แผนการพัฒนา" title="Timeline การติดตั้ง\n3 Phase ใน 6 เดือน" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                phase: 'Phase 1',
                period: 'เดือนที่ 1-2',
                title: 'Foundation',
                items: ['ออกแบบ Database & API', 'สร้าง Core System (Billing, Payment)', 'Integrate Payment Gateway', 'ทดสอบ Cashless Payment'],
                result: 'ระบบพื้นฐานทำงานได้ ชำระผ่าน QR Code',
              },
              {
                phase: 'Phase 2',
                period: 'เดือนที่ 3-4',
                title: 'Security & Verification',
                items: ['เพิ่ม GPS + Photo Evidence', 'เพิ่ม Officer Identity QR Code', 'เพิ่ม Daily Auto-Reconciliation', 'เพิ่ม Anomaly Detection'],
                result: 'ลดการทุจริตจาก 50% → 10%',
                featured: true,
              },
              {
                phase: 'Phase 3',
                period: 'เดือนที่ 5-6',
                title: 'Monitoring & Transparency',
                items: ['สร้าง Real-time Dashboard', 'เพิ่ม Public Disclosure Feature', 'ทำ Regular Audit', 'ทดสอบ Crowdsourced Verification'],
                result: 'ลดทุจริต 10% → 0-2% + เพิ่มความเชื่อใจ',
              },
            ].map((t, i) => (
              <div key={i} className={`rounded-xl p-8 ${t.featured ? 'bg-[#0071e3] text-white' : 'bg-white shadow-[rgba(0,0,0,0.22)_3px_5px_30px_0px]'}`}>
                <p className={`text-[12px] font-semibold tracking-[2px] uppercase mb-1 ${t.featured ? 'text-white/80' : 'text-[#0071e3]'}`}>{t.phase} — {t.period}</p>
                <h3 className={`text-[21px] font-bold leading-[1.19] mb-5 ${t.featured ? 'text-white' : 'text-[#1d1d1f]'}`}>{t.title}</h3>
                <ul className="space-y-2 mb-6">
                  {t.items.map((item, j) => (
                    <li key={j} className={`text-[14px] leading-[1.47] pl-4 relative ${t.featured ? 'text-white/90' : 'text-black/70'}`}>
                      <span className={`absolute left-0 font-bold ${t.featured ? 'text-white' : 'text-[#0071e3]'}`}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className={`text-[13px] font-semibold p-3 rounded-lg ${t.featured ? 'bg-white/20 text-white' : 'bg-[#f5f5f7] text-[#0071e3]'}`}>
                  ผลลัพธ์: {t.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section id="contact" className="bg-black py-24 px-6 text-center">
        <div className="max-w-[680px] mx-auto">
          <p className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-3">เริ่มต้นวันนี้</p>
          <h2 className="text-white font-semibold leading-[1.1] mb-5" style={{ fontSize: 'clamp(28px,4vw,40px)' }}>
            ยกระดับความโปร่งใส<br />ในหน่วยงานของคุณ
          </h2>
          <p className="text-white/70 text-[17px] leading-[1.47] mb-10">
            ติดต่อทีมงาน Gismo เพื่อรับการสาธิตระบบและประเมินราคาเบื้องต้นฟรี
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="mailto:contact@gismo.co.th" className="bg-[#0071e3] text-white text-[17px] px-6 py-2 rounded-lg no-underline hover:bg-[#0077ed] transition-colors">
              ขอรับการสาธิต
            </a>
            <Link to="/" className="text-[#2997ff] border border-[#2997ff] text-[17px] px-6 py-2 rounded-[980px] no-underline hover:underline">
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
