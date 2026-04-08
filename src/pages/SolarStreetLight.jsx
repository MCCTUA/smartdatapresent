import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

const imgBase = 'images/solar/';

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

const products = [
  {
    model: 'SA-2A01',
    series: 'RSK Series — All-in-One',
    tagline: 'สำหรับถนนหลัก',
    img: `${imgBase}slide_5_image_1.jpg`,
    detailImg: `${imgBase}slide_7_image_1.jpg`,
    specs: [
      { label: 'กำลังไฟแผงโซลาร์', value: '60W – 120W' },
      { label: 'ความสว่าง', value: '6,000 – 15,000 LM' },
      { label: 'แบตเตอรี่ (LiFePO4)', value: '240WH – 640WH' },
      { label: 'ความสูงติดตั้ง', value: '6 – 10 เมตร' },
      { label: 'ระยะห่างติดตั้ง', value: '20 – 40 เมตร' },
      { label: 'สำรองไฟ', value: '5-7 วัน (ฝนตกต่อเนื่อง)' },
    ],
    highlight: 'ติดตั้งง่ายในเวลา 5 นาที ไม่ต้องเดินสายไฟ ประหยัดเวลา 60% โครงสร้างอลูมิเนียมกันน้ำ IP66',
  },
  {
    model: 'SA-2A02',
    series: 'RSA Series — Modular',
    tagline: 'ความยืดหยุ่นสูง ถนนกว้าง',
    img: `${imgBase}slide_6_image_1.jpg`,
    detailImg: `${imgBase}slide_8_image_1.jpg`,
    specs: [
      { label: 'กำลังไฟแผงโซลาร์', value: '40W – 160W' },
      { label: 'ความสว่าง', value: '5,100 – 18,000 LM' },
      { label: 'แบตเตอรี่ (LiFePO4)', value: '160WH – 640WH' },
      { label: 'ความสูงติดตั้ง', value: '6 – 12 เมตร' },
      { label: 'ประสิทธิภาพ LED', value: '180 lm/W' },
      { label: 'การจัดการความร้อน', value: 'ยอดเยี่ยม เหมาะอากาศร้อน' },
    ],
    highlight: 'น้ำหนักเบา ขนส่งง่าย แบตเตอรี่ถอดเปลี่ยนได้ง่าย เหมาะกับถนนสายรองในเขตชุมชน',
  },
  {
    model: 'SK-7A13',
    series: 'YY Series — Split Type',
    tagline: 'ยืดหยุ่นสูง แยกส่วน',
    img: `${imgBase}slide_9_image_1.jpg`,
    detailImg: `${imgBase}slide_9_image_1.jpg`,
    specs: [
      { label: 'กำลังไฟแผงโซลาร์', value: '60W – 85W' },
      { label: 'ความสว่าง', value: '3,400 – 4,800 LM' },
      { label: 'แบตเตอรี่ (LiFePO4)', value: '192WH – 256WH' },
      { label: 'ความสูงติดตั้ง', value: '5 – 8 เมตร' },
      { label: 'ปรับแผงโซลาร์', value: 'อิสระ 360°' },
      { label: 'เพิ่มประสิทธิภาพ', value: '+15% รับพลังงาน' },
    ],
    highlight: 'แผงโซลาร์เซลล์ปรับทิศทางได้อิสระ ช่วยเพิ่มประสิทธิภาพรับพลังงาน 15% ตอบโจทย์พื้นที่ที่มีข้อจำกัดเรื่องทิศทางแสงแดด',
  },
  {
    model: 'SK-7A14',
    series: 'Sailing Light — Premium',
    tagline: 'ดีไซน์หรูหรา พรีเมียม',
    img: `${imgBase}slide_10_image_1.jpg`,
    detailImg: `${imgBase}slide_10_image_1.jpg`,
    specs: [
      { label: 'กำลังไฟแผงโซลาร์', value: '60W – 100W' },
      { label: 'ความสว่าง', value: '4,100 – 9,000 LM' },
      { label: 'แบตเตอรี่ (LiFePO4)', value: '192WH – 384WH' },
      { label: 'ความสูงติดตั้ง', value: '6 – 10 เมตร' },
      { label: 'ประสิทธิภาพ LED', value: '200 lm/W' },
      { label: 'วัสดุ', value: 'อลูมิเนียมเกรดมารีน' },
    ],
    highlight: 'ตอบโจทย์โครงการระดับพรีเมียม รีสอร์ท สวนสาธารณะ ถนนเลียบชายหาด โครงสร้างทนทานต่อการกัดกร่อน',
  },
];

export default function SolarStreetLight() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-screen bg-black relative overflow-hidden flex items-end justify-center pb-20 px-6">
        <img
          src={`${imgBase}slide_1_image_1.jpg`}
          alt="Gismo Lighting Solar Street Light"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 text-center max-w-3xl">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-4">
              GISMO LIGHTING
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-white font-semibold leading-[1.07] tracking-[-0.28px] mb-5"
              style={{ fontSize: 'clamp(36px,6vw,56px)' }}
            >
              โซล่าเซลล์ไฟถนน<br />คุณภาพสูง มาตรฐานสากล
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 mb-10" style={{ fontSize: 'clamp(17px,2vw,21px)', lineHeight: 1.47 }}>
              โซลูชันแสงสว่างประหยัดพลังงาน ออกแบบมาเพื่อโครงการ อบต. และหน่วยงานรัฐ
            </motion.p>
            <motion.div variants={fadeUp} className="flex gap-4 justify-center flex-wrap">
              <a href="#products" className="bg-[#0071e3] text-white text-[17px] px-6 py-2 rounded-lg no-underline hover:bg-[#0077ed] transition-colors">
                ดูรุ่นสินค้า
              </a>
              <a href="#contact" className="text-[#2997ff] border border-[#2997ff] text-[17px] px-6 py-2 rounded-[980px] no-underline hover:underline">
                ขอรับคำปรึกษา ›
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points */}
      <Section>
        <div className="max-w-[980px] mx-auto">
          <SectionHeader eyebrow="ปัญหาที่พบ" title="ความท้าทายของผู้รับเหมา" body="ผู้รับเหมาและ Trading ที่ทำงานโครงการ อบต. มักเผชิญกับความท้าทายหลายด้าน" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: '📋', title: 'มาตรฐาน อบต.', desc: 'ต้องปฏิบัติตามข้อกำหนดความสว่างของหน่วยงานท้องถิ่นอย่างเคร่งครัด' },
              { icon: '⚠️', title: 'ความเสี่ยงด้านคุณภาพ', desc: 'สินค้าจากตลาดออนไลน์ทั่วไปมักไม่ได้มาตรฐานตามที่ระบุไว้' },
              { icon: '☁️', title: 'ความเสถียร', desc: 'ต้องการระบบที่ให้แสงสว่างได้สม่ำเสมอตลอดคืน แม้ในวันฝนตกต่อเนื่อง' },
              { icon: '📞', title: 'ขาดการสนับสนุน', desc: 'ต้องการผู้เชี่ยวชาญช่วยออกแบบแสงสว่างและแก้ปัญหาทางเทคนิค' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-lg p-8 shadow-[rgba(0,0,0,0.22)_3px_5px_30px_0px]">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-[#1d1d1f] font-bold text-[21px] leading-[1.19] mb-2">{f.title}</h3>
                <p className="text-black/70 text-[14px] leading-[1.47]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Company Profile */}
      <Section dark>
        <div className="max-w-[980px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-3">บริษัทของเรา</p>
              <h2 className="text-white font-semibold leading-[1.1] mb-6" style={{ fontSize: 'clamp(28px,4vw,40px)' }}>
                Gismo Lighting<br />ผู้นำด้านแสงสว่าง LED
              </h2>
              <p className="text-white/70 text-[17px] leading-[1.47] mb-8">
                ดำเนินกิจการตั้งแต่ปี 2553 มีประสบการณ์กว่า 15 ปี ในฐานะผู้ผลิตและจำหน่าย LED Lighting ที่ได้รับการรับรองมาตรฐานระดับประเทศ
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: '15+', l: 'ปีประสบการณ์' },
                  { n: 'LM-79', l: 'มาตรฐานสากล' },
                  { n: 'LM-80', l: 'มาตรฐานสากล' },
                  { n: 'มอก.', l: 'มาตรฐานไทย' },
                ].map((s, i) => (
                  <div key={i} className="bg-[#272729] rounded-lg p-4 text-center">
                    <div className="text-[#0071e3] font-bold text-[24px]">{s.n}</div>
                    <div className="text-white/60 text-[13px] mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img src={`${imgBase}slide_3_image_1.jpg`} alt="Gismo Lighting Company" className="w-full" loading="lazy" />
            </div>
          </div>
        </div>
      </Section>

      {/* Design Highlights */}
      <Section>
        <div className="max-w-[980px] mx-auto">
          <SectionHeader eyebrow="จุดเด่น" title="ออกแบบเพื่อประสิทธิภาพสูงสุด" body="ให้ค่าความสว่างและความสม่ำเสมอที่เกินมาตรฐาน ลดพลังงานได้ถึง 77.5%" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[
              { n: '77.5%', l: 'ลดการใช้พลังงาน\nจาก 1,920W → 450W' },
              { n: '+100%', l: 'ความสว่างเฉลี่ย 40 ลักซ์\nสูงกว่ามาตรฐาน' },
              { n: '+50%', l: 'ค่าความสม่ำเสมอ ≥ 0.3\nสูงกว่ามาตรฐาน' },
              { n: '200 lm/W', l: 'ประสิทธิภาพ LED\nคุณภาพสูง' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-lg p-6 text-center shadow-[rgba(0,0,0,0.22)_3px_5px_30px_0px]">
                <div className="text-[28px] font-semibold text-[#0071e3] leading-[1.1] mb-2">{s.n}</div>
                <div className="text-[13px] text-black/60 whitespace-pre-line leading-[1.47]">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl overflow-hidden">
            <img src={`${imgBase}slide_4_image_1.jpg`} alt="Performance Comparison Chart" className="w-full" loading="lazy" />
          </div>
        </div>
      </Section>

      {/* Products */}
      <Section dark id="products">
        <div className="max-w-[1100px] mx-auto">
          <SectionHeader dark eyebrow="รุ่นสินค้า" title="เลือกรุ่นที่เหมาะสมกับโครงการ" body="มี 4 รุ่นให้เลือกตามขนาดถนน งบประมาณ และความต้องการพิเศษของโครงการ" />
          <div className="flex flex-col gap-16">
            {products.map((p, i) => (
              <div key={i} className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}>
                <div className="rounded-xl overflow-hidden md:[direction:ltr]">
                  <img src={p.img} alt={p.model} className="w-full" loading="lazy" />
                </div>
                <div className="md:[direction:ltr]">
                  <p className="text-[#0071e3] text-[14px] font-semibold tracking-[2px] uppercase mb-2">{p.series}</p>
                  <h3 className="text-white font-semibold text-[36px] leading-[1.1] mb-1">{p.model}</h3>
                  <p className="text-white/60 text-[17px] mb-6">{p.tagline}</p>
                  <table className="w-full text-[14px] mb-6">
                    <tbody>
                      {p.specs.map((s, j) => (
                        <tr key={j} className="border-b border-white/10">
                          <td className="py-3 pr-4 text-white/50 font-medium w-[45%]">{s.label}</td>
                          <td className="py-3 text-white font-semibold">{s.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="bg-[#272729] rounded-lg p-4 text-[14px] text-white/75 leading-[1.47]">
                    <span className="text-[#0071e3] font-semibold">จุดเด่น: </span>{p.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Comparison Table */}
      <Section>
        <div className="max-w-[980px] mx-auto">
          <SectionHeader eyebrow="เปรียบเทียบ" title="เลือกรุ่นที่ใช่" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-[14px]">
              <thead>
                <tr className="border-b-2 border-black/12">
                  <th className="text-left py-4 px-3 text-[#1d1d1f] font-semibold">คุณสมบัติ</th>
                  <th className="text-center py-4 px-3 text-[#1d1d1f] font-semibold">SA-2A01</th>
                  <th className="text-center py-4 px-3 text-[#1d1d1f] font-semibold bg-[#0071e3]/8">SA-2A02 ⭐</th>
                  <th className="text-center py-4 px-3 text-[#1d1d1f] font-semibold">SK-7A13</th>
                  <th className="text-center py-4 px-3 text-[#1d1d1f] font-semibold">SK-7A14</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Series', vals: ['RSK All-in-One', 'RSA Modular', 'YY Split Type', 'Sailing Premium'] },
                  { label: 'กำลังไฟ', vals: ['60-120W', '40-160W', '60-85W', '60-100W'] },
                  { label: 'ความสว่าง', vals: ['6,000-15,000 lm', '5,100-18,000 lm', '3,400-4,800 lm', '4,100-9,000 lm'] },
                  { label: 'ความสูง', vals: ['6-10 ม.', '6-12 ม.', '5-8 ม.', '6-10 ม.'] },
                  { label: 'เหมาะกับ', vals: ['ถนนหลัก 2 เลน', 'ถนนกว้าง', 'ถนนทุกรูปแบบ', 'โครงการพรีเมียม'] },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-black/6">
                    <td className="py-3 px-3 font-semibold text-[#1d1d1f]">{row.label}</td>
                    {row.vals.map((v, j) => (
                      <td key={j} className={`py-3 px-3 text-center text-black/70 ${j === 1 ? 'bg-[#0071e3]/8' : ''}`}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Service */}
      <Section dark>
        <div className="max-w-[980px] mx-auto">
          <SectionHeader dark eyebrow="บริการครบวงจร" title="End-to-End Service" body="บริการตั้งแต่การออกแบบแสงสว่างฟรี ไปจนถึงการติดตั้งและการสนับสนุนหลังการขาย" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col gap-4">
              {[
                { icon: '🎨', title: 'ออกแบบแสงสว่างฟรี', desc: 'ทีมวิศวกรผู้เชี่ยวชาญออกแบบแสงสว่างให้ตรงตามข้อกำหนดของโครงการโดยไม่คิดค่าใช้จ่าย' },
                { icon: '📦', title: 'ผู้ผลิตโดยตรง', desc: 'ซื้อตรงจากโรงงาน ราคาดี คุณภาพมั่นใจ ไม่ผ่านตัวแทน' },
                { icon: '🔧', title: 'สนับสนุนเทคนิค', desc: 'ทีมงานพร้อมช่วยแก้ปัญหาทางเทคนิคตลอดโครงการ' },
                { icon: '📜', title: 'มาตรฐานรับรอง', desc: 'ทุกผลิตภัณฑ์ผ่านการรับรอง LM-79, LM-80 และ มอก. 1955-2551' },
              ].map((s, i) => (
                <div key={i} className="flex gap-4 items-start bg-[#272729] rounded-lg p-5">
                  <div className="text-2xl flex-shrink-0">{s.icon}</div>
                  <div>
                    <div className="text-white font-semibold text-[17px] mb-1">{s.title}</div>
                    <div className="text-white/70 text-[14px] leading-[1.47]">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl overflow-hidden">
              <img src={`${imgBase}slide_14_image_1.jpg`} alt="End-to-End Service" className="w-full" loading="lazy" />
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section id="contact" className="bg-[#f5f5f7] py-24 px-6 text-center">
        <div className="max-w-[680px] mx-auto">
          <p className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-3">ติดต่อเรา</p>
          <h2 className="text-[#1d1d1f] font-semibold leading-[1.1] mb-5" style={{ fontSize: 'clamp(28px,4vw,40px)' }}>
            พร้อมเริ่มโครงการ<br />ของคุณแล้ว?
          </h2>
          <p className="text-black/70 text-[17px] leading-[1.47] mb-10">
            ติดต่อทีมงาน Gismo Lighting เพื่อรับการออกแบบแสงสว่างและใบเสนอราคาฟรี
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="mailto:contact@gismo.co.th" className="bg-[#0071e3] text-white text-[17px] px-6 py-2 rounded-lg no-underline hover:bg-[#0077ed] transition-colors">
              ขอใบเสนอราคาฟรี
            </a>
            <Link to="/" className="text-[#0066cc] border border-[#0066cc] text-[17px] px-6 py-2 rounded-[980px] no-underline hover:underline">
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
