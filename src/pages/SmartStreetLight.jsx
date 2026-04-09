import React from 'react';
import { Link } from 'react-router-dom';

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function Section({ dark, children, className = '', id = '' }) {
  return (
    <section
      id={id}
      className={`py-24 px-6 ${dark ? 'bg-black text-white' : 'bg-[#f5f5f7] text-[#1d1d1f]'} ${className}`}
    >
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

export default function SmartStreetLight() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-screen bg-black flex items-center px-6">
        <div className="max-w-[980px] mx-auto w-full flex flex-col md:flex-row items-center gap-10 py-24">
          {/* Text */}
          <div className="flex-1 md:text-left text-center">
            <p className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-4">
              Smart City Solution
            </p>
            <h1
              className="text-white font-semibold leading-[1.07] tracking-[-0.28px] mb-5"
              style={{ fontSize: 'clamp(36px,5vw,56px)' }}
            >
              ก้าวสู่เมืองอัจฉริยะ<br />ด้วยระบบไฟถนนอัจฉริยะ
            </h1>
            <p className="text-white/70 mb-10" style={{ fontSize: 'clamp(17px,2vw,21px)', lineHeight: 1.47 }}>
              Smart Street Lighting Platform ครบวงจร<br />ฮาร์ดแวร์ประสิทธิภาพสูง 155 lm/W ผสานกับซอฟต์แวร์อัจฉริยะ
            </p>
            <div className="flex gap-4 md:justify-start justify-center flex-wrap">
              <button onClick={() => scrollTo('contact')} className="bg-[#0071e3] text-white text-[17px] px-6 py-2 rounded-lg border-none cursor-pointer hover:bg-[#0077ed] transition-colors">
                ขอรับคำปรึกษาฟรี
              </button>
              <button onClick={() => scrollTo('how-it-works')} className="text-[#2997ff] border border-[#2997ff] text-[17px] px-6 py-2 rounded-full bg-transparent cursor-pointer hover:underline">
                ดูการทำงาน ›
              </button>
            </div>
          </div>
          {/* Product image */}
          <div className="flex-1 flex justify-center">
            <img
              src="images/smartlight/Gemini_Generated_Image_ykong3ykong3ykon-removebg-preview.png"
              alt="GGismo Smart Street Light"
              className="w-full max-w-[420px] drop-shadow-[0_0_80px_rgba(0,113,227,0.25)]"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-black border-t border-white/10">
        <div className="max-w-[980px] mx-auto grid grid-cols-2 md:grid-cols-4">
          {[
            { n: '155 lm/W', l: 'ประสิทธิภาพโคมไฟ\nสูงสุด' },
            { n: '50-70%', l: 'ประหยัดพลังงาน' },
            { n: '5+', l: 'ปีรับประกัน\nคุณภาพ' },
            { n: '24/7', l: 'การแจ้งเตือน\nอัตโนมัติ' },
          ].map((s, i) => (
            <div key={i} className={`py-10 text-center ${i < 3 ? 'border-r border-white/10' : ''}`}>
              <div className="text-[32px] font-semibold text-[#0071e3] leading-tight">{s.n}</div>
              <div className="text-[13px] text-white/60 mt-2 whitespace-pre-line leading-relaxed">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pain Points */}
      <Section dark>
        <div className="max-w-[980px] mx-auto">
          <SectionHeader
            dark
            eyebrow="ปัญหาที่พบ"
            title="ความท้าทายของการจัดการไฟถนนในปัจจุบัน"
            body="หน่วยงานท้องถิ่นในประเทศไทยประสบปัญหาหลักในการจัดการระบบไฟฟ้าส่องสว่างสาธารณะ"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '⚡', title: 'สิ้นเปลืองพลังงาน', desc: 'โคมไฟแบบเดิมใช้พลังงานคงที่ตลอดคืน ไม่สามารถปรับลดความสว่างในช่วงเวลาที่มีการสัญจรน้อย ทำให้สิ้นเปลืองงบประมาณโดยไม่จำเป็น' },
              { icon: '🔍', title: 'ไม่ทราบเมื่อโคมชำรุด', desc: 'เมื่อโคมไฟชำรุด หน่วยงานมักไม่ทราบจนกว่าจะมีการร้องเรียนจากประชาชน ส่งผลให้การแก้ไขปัญหาล่าช้า' },
              { icon: '🚨', title: 'เสี่ยงต่อความปลอดภัย', desc: 'พื้นที่ที่มีไฟถนนชำรุดเพิ่มความเสี่ยงต่ออุบัติเหตุทางถนน การลักขโมย และกระทบคุณภาพชีวิตของประชาชน' },
            ].map((f, i) => (
              <div key={i} className="bg-[#272729] rounded-lg p-10">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-white font-bold text-[21px] leading-snug mb-3">{f.title}</h3>
                <p className="text-white/70 text-[14px] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* How it works */}
      <Section id="how-it-works">
        <div className="max-w-[980px] mx-auto">
          <SectionHeader
            eyebrow="สถาปัตยกรรมระบบ"
            title="ระบบทำงานอย่างไร"
            body="GGismo Smart Street Light ทำงานแบบ End-to-End Integrated อย่างไร้รอยต่อ ตั้งแต่ตัวโคมไฟถึงหน้าจอผู้บริหาร"
          />
          <div className="flex flex-col divide-y divide-black/8">
            {[
              { n: '01', title: 'Node LTE บนโคมไฟ', desc: 'โคมไฟแต่ละดวงติดตั้ง Node LTE ที่ตรวจวัดและส่งข้อมูล เช่น สถานะการทำงาน ระดับความสว่าง และปริมาณพลังงาน' },
              { n: '02', title: 'ส่งข้อมูลผ่าน LTE/4G', desc: 'ข้อมูลจากแต่ละโคมไฟถูกส่งไปยัง Cloud Server ผ่านเครือข่าย LTE/4G ทำให้ติดตามได้ทุกที่ทุกเวลา' },
              { n: '03', title: 'Cloud ประมวลผล', desc: 'ระบบ Cloud ประมวลผลข้อมูลและเปรียบเทียบกับกฎเกณฑ์ที่ตั้งไว้ เพื่อตัดสินใจว่าควรทำการควบคุมอะไร' },
              { n: '04', title: 'ควบคุมอัตโนมัติ', desc: 'ระบบส่งคำสั่งไปยังโคมไฟ เช่น เปิด-ปิด หรือปรับระดับความสว่าง (Dimming) ตามตารางเวลาหรือตามความต้องการ' },
              { n: '05', title: 'Dashboard & Alerts', desc: 'ข้อมูลทั้งหมดถูกบันทึกและแสดงผลใน Dashboard เพื่อให้เจ้าหน้าที่ติดตามและวิเคราะห์ได้ พร้อมแจ้งเตือนอัตโนมัติ' },
            ].map((s, i) => (
              <div key={i} className="flex gap-6 py-8">
                <div className="text-[40px] font-semibold text-[#0071e3] leading-tight shrink-0 w-14">{s.n}</div>
                <div>
                  <h3 className="text-[#1d1d1f] font-semibold text-[21px] leading-snug mb-2">{s.title}</h3>
                  <p className="text-black/70 text-[14px] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Hardware */}
      <Section dark>
        <div className="max-w-[980px] mx-auto">
          <SectionHeader dark eyebrow="ฮาร์ดแวร์" title="ฮาร์ดแวร์ประสิทธิภาพสูง" body="โคมไฟ GGismo ออกแบบด้วยเทคโนโลยี LED ล่าสุด เพื่อให้ได้ประสิทธิภาพสูงสุด ประหยัดพลังงาน สว่างกว่า และทนทาน" />
          {/* Product showcase */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-[#111] rounded-2xl overflow-hidden">
            <img
              src="images/smartlight/Gemini_Generated_Image_am4oo4am4oo4am4o.png"
              alt="GGismo Street Light — 90° Adjustable"
              className="w-full md:w-[48%] object-cover"
            />
            <div className="flex-1 px-8 py-10 md:py-0">
              <p className="text-[12px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-3">GGismo LED</p>
              <h3 className="text-white font-semibold text-[28px] leading-[1.1] mb-4">
                ออกแบบมาเพื่อ<br />การใช้งานจริง
              </h3>
              <ul className="space-y-3 text-[14px] text-white/70 leading-relaxed">
                <li className="flex gap-2"><span className="text-[#0071e3] font-bold mt-0.5">✓</span>ขาโคมปรับองศาได้ 90° เพื่อความสว่างครอบคลุม</li>
                <li className="flex gap-2"><span className="text-[#0071e3] font-bold mt-0.5">✓</span>ประสิทธิภาพสูงสุด 155 lm/W</li>
                <li className="flex gap-2"><span className="text-[#0071e3] font-bold mt-0.5">✓</span>ผ่านมาตรฐาน IES LM-79 และ LM-80</li>
                <li className="flex gap-2"><span className="text-[#0071e3] font-bold mt-0.5">✓</span>กันน้ำ/ฝุ่น IP66 สำหรับสภาพแวดล้อมเขตร้อน</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: '🔆', title: 'สว่างกว่า 24%', desc: 'สว่างกว่านวัตกรรมที่ขึ้นทะเบียน (125 lm/W) ถึง 24% ลดค่าไฟฟ้าได้ 20-30% เมื่อเทียบกับโคมไฟแบบเดิม' },
              { icon: '🔧', title: 'ขาโคมปรับองศาได้ 90°', desc: 'ปรับมุมการส่องสว่างได้ตามสภาพพื้นที่ เหมาะสำหรับถนนกว้าง ถนนแคบ และพื้นที่พิเศษ' },
              { icon: '⏱️', title: 'ทนทาน 5+ ปี', desc: 'ทำงานได้ 24 ชั่วโมง/วัน เป็นเวลา 5+ ปี ผ่านการทดสอบมาตรฐาน IES LM-79 และ LM-80' },
              { icon: '🌧️', title: 'กันน้ำและฝุ่น IP66', desc: 'ป้องกันน้ำและฝุ่นได้อย่างสมบูรณ์ ทนทานต่อสภาพแวดล้อมที่รุนแรงของภูมิอากาศเขตร้อน' },
            ].map((f, i) => (
              <div key={i} className="bg-[#272729] rounded-lg p-10">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-white font-bold text-[21px] leading-snug mb-3">{f.title}</h3>
                <p className="text-white/70 text-[14px] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Smart Control */}
      <Section>
        <div className="max-w-[980px] mx-auto">
          <SectionHeader
            eyebrow="ระบบควบคุม"
            title="Node LTE — หัวใจของระบบ"
            body="Node LTE ที่ติดตั้งในแต่ละโคมไฟ อ่านค่า ติดตามสถานะ และแจ้งเตือนอัตโนมัติ ออกแบบให้ติดตั้งง่ายด้วย Socket NEMA มาตรฐาน"
          />
          {/* Platform screenshot */}
          <div className="rounded-2xl overflow-hidden shadow-[rgba(0,0,0,0.18)_0px_8px_40px_0px] mb-12 border border-black/8">
            <div className="bg-[#f0f0f0] px-4 py-2.5 flex items-center gap-2 border-b border-black/8">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="text-black/40 text-[11px] ml-2">SmartPole — Lamps / Devices</span>
            </div>
            <img src="images/smartlight/Screen1.webp" alt="SmartPole device management dashboard" className="w-full block" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-8 shadow-[rgba(0,0,0,0.22)_3px_5px_30px_0px]">
              <h3 className="text-[#1d1d1f] font-bold text-[21px] mb-4">ติดตั้งง่าย</h3>
              <ul className="space-y-2 text-[14px] text-black/70 leading-relaxed">
                <li>✓ ออกแบบให้ติดตั้งง่ายบนขาโคมไฟ</li>
                <li>✓ ไม่ต้องเปลี่ยนโคมเดิม</li>
                <li>✓ ใช้ Socket NEMA มาตรฐาน</li>
                <li>✓ เข้ากันได้กับโคมไฟส่วนใหญ่</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-[rgba(0,0,0,0.22)_3px_5px_30px_0px]">
              <h3 className="text-[#1d1d1f] font-bold text-[21px] mb-4">ข้อมูลที่วัดได้</h3>
              <ul className="space-y-2 text-[14px] text-black/70 leading-relaxed">
                <li>📊 Online / Offline Status</li>
                <li>📊 Power (W)</li>
                <li>📊 Current (A)</li>
                <li>📊 Voltage (V)</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-[rgba(0,0,0,0.22)_3px_5px_30px_0px]">
              <h3 className="text-[#1d1d1f] font-bold text-[21px] mb-4">การแจ้งเตือน</h3>
              <ul className="space-y-2 text-[14px] text-black/70 leading-relaxed">
                <li>🔔 Lamp Failure (ไฟดับ)</li>
                <li>🔔 Power Failure (ไฟตัด)</li>
                <li>🔔 Over/Under Voltage</li>
                <li>🔔 Over Current</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Real-time Monitoring */}
      <Section dark>
        <div className="max-w-[980px] mx-auto">
          <SectionHeader dark eyebrow="การติดตาม" title="Real-time Monitoring ปัญหาจะไม่ลับ" body="ระบบตรวจสอบแบบ Real-time ช่วยให้หน่วยงานท้องถิ่นสามารถจัดการได้อย่างมีประสิทธิภาพ" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: '🗺️', title: 'แผนที่รวมศูนย์', desc: 'แสดงตำแหน่งโคมไฟทั้งหมดบน Dashboard นำทางไปยังโคมที่มีปัญหาด้วย Google Map ไม่ต้องขับรถตระเวน' },
              { icon: '⏰', title: 'แจ้งเตือนทันที', desc: 'เมื่อโคมไฟเสีย ระบบแจ้งเตือนทันทีไปยังเจ้าหน้าที่ ไม่ต้องรอประชาชนแจ้ง ลดเวลาตอบสนองจากวันเป็นชั่วโมง' },
              { icon: '📈', title: 'สถิติการใช้งาน', desc: 'ดูสถิติการทำงาน ระดับความสว่าง ปริมาณพลังงาน เจ้าหน้าที่สามารถวางแผนการซ่อมบำรุงได้ล่วงหน้า' },
            ].map((f, i) => (
              <div key={i} className="bg-[#272729] rounded-lg p-10">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-white font-bold text-[21px] leading-snug mb-3">{f.title}</h3>
                <p className="text-white/70 text-[14px] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          {/* Dashboard screenshots */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden border border-white/10">
              <div className="bg-[#1a1a1a] px-4 py-2 flex items-center gap-2 border-b border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="text-white/30 text-[11px] ml-2">Device Map</span>
              </div>
              <img src="images/smartlight/location.webp" alt="Device Map — real-time location tracking" className="w-full block" />
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <div className="bg-[#1a1a1a] px-4 py-2 flex items-center gap-2 border-b border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="text-white/30 text-[11px] ml-2">Alerts Dashboard</span>
              </div>
              <img src="images/smartlight/Alerts.webp" alt="Alerts dashboard" className="w-full block" />
            </div>
          </div>
        </div>
      </Section>

      {/* Customization */}
      <Section>
        <div className="max-w-[980px] mx-auto">
          <SectionHeader eyebrow="ความยืดหยุ่น" title="ปรับแต่งได้ตามความต้องการ" body="เพราะแต่ละท้องถิ่นมีบริบทที่แตกต่างกัน ระบบจึงออกแบบให้ปรับแต่งได้ (Customizable)" />
          <div className="bg-black/5 rounded-xl p-8 mb-10 text-center">
            <p className="text-[17px] font-semibold text-[#1d1d1f] italic">
              เป็นเจ้าของเทคโนโลยีและซอฟต์แวร์เองทั้งหมด ทีมพัฒนาในประเทศไทยพร้อมปรับปรุงและพัฒนาฟีเจอร์ใหม่ได้อย่างรวดเร็วและตรงจุด
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: '📊', title: 'Custom Dashboard', desc: 'ปรับแต่งหน้าจอแสดงผลให้แสดงข้อมูลที่สำคัญสำหรับผู้บริหารหรือเจ้าหน้าที่แต่ละระดับ' },
              { icon: '📱', title: 'Super App Integration', desc: 'ระบบปิดที่พัฒนาเองโดยสมบูรณ์ รองรับการขยายผลไปยังการจัดเก็บค่าธรรมเนียมขยะ ค่าไฟฟ้า และ Emergency Management' },
              { icon: '📄', title: 'Template Reports', desc: 'รูปแบบรายงานมาตรฐานสำหรับหน่วยงานท้องถิ่น ลดภาระงานเอกสาร พร้อม Tailored Reports ในแพ็กเกจ Premium' },
              { icon: '🇹🇭', title: 'Local Support & Dev', desc: 'ทีมพัฒนาอยู่ในประเทศไทย พร้อมให้คำปรึกษา รับฟังปัญหา และปรับปรุงระบบอย่างรวดเร็ว' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-lg p-8 shadow-[rgba(0,0,0,0.22)_3px_5px_30px_0px]">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-[#1d1d1f] font-bold text-[21px] leading-snug mb-2">{f.title}</h3>
                <p className="text-black/70 text-[14px] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Packages */}
      <Section dark id="packages">
        <div className="max-w-[980px] mx-auto">
          <SectionHeader dark eyebrow="แพ็กเกจ" title="เลือกแพ็กเกจที่เหมาะสม" body="โซลูชันที่ยืดหยุ่น สามารถเริ่มต้นจากพื้นฐานและต่อยอดไปสู่ Super App ได้ในอนาคต" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {[
              {
                name: 'Basic',
                featured: false,
                features: [
                  'โคมไฟ LED 155 lm/W สว่างกว่า ประหยัดกว่า',
                  'ขาโคมไฟปรับองศาได้ 90°',
                  'รับประกันคุณภาพ 5 ปี',
                  'Node LTE สำหรับการควบคุมพื้นฐาน',
                  'Dashboard พื้นฐาน',
                  'อัปเกรดไป Super App ในอนาคตได้',
                ],
              },
              {
                name: 'Smart',
                featured: true,
                badge: 'แนะนำ',
                features: [
                  'โคมไฟ LED 155 lm/W พร้อมขาปรับองศา',
                  'ติดตั้ง Node LTE ทุกโคมไฟ',
                  'Web Dashboard Advance Data',
                  'ระบบควบคุมเปิด-ปิดและหรี่ไฟอัตโนมัติ',
                  'ระบบแจ้งเตือนเมื่อโคมไฟชำรุด',
                  'Super App แบบเปิด ทำงานร่วมกับ Sensor',
                ],
              },
              {
                name: 'Premium',
                featured: false,
                features: [
                  'รวมทุกคุณสมบัติของแพ็กเกจ Smart',
                  'Mobile App สำหรับการจัดการด้วยมือถือ',
                  'Customization ปรับแต่งตามความต้องการ',
                  'เชื่อมต่อกล้อง CCTV และ Smart Pole',
                  'บูรณาการระบบจัดเก็บค่าธรรมเนียมขยะ/ไฟฟ้า',
                  'AI Analytics วิเคราะห์ข้อมูลรวมศูนย์',
                ],
              },
            ].map((pkg, i) => (
              <div
                key={i}
                className={`rounded-xl p-10 relative ${pkg.featured ? 'bg-[#0071e3] text-white scale-105' : 'bg-[#272729] text-white'}`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#0071e3] text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">
                    {pkg.badge}
                  </div>
                )}
                <h3 className="text-[28px] font-normal leading-snug mb-6">{pkg.name}</h3>
                <ul className="space-y-3">
                  {pkg.features.map((f, j) => (
                    <li key={j} className={`text-[14px] leading-relaxed pl-5 relative ${pkg.featured ? 'text-white/95' : 'text-white/80'}`}>
                      <span className="absolute left-0 font-bold text-white">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ROI */}
      <Section>
        <div className="max-w-[980px] mx-auto">
          <SectionHeader eyebrow="ผลตอบแทน" title="ลงทุนวันนี้ ประหยัดทุกวัน" body="การลงทุนในระบบ Smart Street Light ไม่ใช่แค่รายจ่าย แต่คือการสร้างความคุ้มค่าในระยะยาว" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: '💰', title: 'ประหยัดพลังงาน 50-70%', desc: 'ด้วยโคมไฟ LED 155 lm/W ผสานกับระบบหรี่ไฟอัตโนมัติ ช่วยลดค่าไฟฟ้ารายเดือนได้อย่างมหาศาล' },
              { icon: '🔨', title: 'ลดค่าซ่อมบำรุง', desc: 'ระบบแจ้งเตือนจุดที่ชำรุดทันที ลดค่าน้ำมันและเวลาการทำงานจากการตรวจตระเวน' },
              { icon: '📉', title: 'คืนทุนภายในไม่กี่ปี', desc: 'นำงบประมาณที่ประหยัดได้มาชดเชยค่าลงทุน ทำให้คืนทุนได้ในเวลาอันสั้น' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-lg p-8 shadow-[rgba(0,0,0,0.22)_3px_5px_30px_0px]">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-[#1d1d1f] font-bold text-[21px] leading-snug mb-3">{f.title}</h3>
                <p className="text-black/70 text-[14px] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🛡️', title: 'ความปลอดภัยสูงขึ้น', desc: 'แสงสว่างที่เพียงพอและสม่ำเสมอ ช่วยลดอุบัติเหตุบนท้องถนนและป้องกันปัญหาอาชญากรรม' },
              { icon: '😊', title: 'ประชาชนพึงพอใจ', desc: 'หน่วยงานรับรู้ปัญหาและเข้าแก้ไขโคมไฟชำรุดก่อนที่ประชาชนจะร้องเรียน สร้างภาพลักษณ์ที่ดี' },
              { icon: '🌿', title: 'ก้าวสู่ Smart City', desc: 'ลด Carbon Footprint จากการประหยัดพลังงาน วางรากฐานข้อมูลดิจิทัลเพื่อการพัฒนาเมืองในอนาคต' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-lg p-8 shadow-[rgba(0,0,0,0.22)_3px_5px_30px_0px]">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-[#1d1d1f] font-bold text-[21px] leading-snug mb-3">{f.title}</h3>
                <p className="text-black/70 text-[14px] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Vision: Super App */}
      <Section dark>
        <div className="max-w-[980px] mx-auto">
          <SectionHeader dark eyebrow="วิสัยทัศน์" title="สู่ Super App สำหรับหน่วยงานท้องถิ่น" body="เราไม่ได้สร้างแค่ระบบไฟถนน แต่กำลังสร้างโครงสร้างพื้นฐานสำหรับ Smart City อย่างแท้จริง" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🌆', title: 'ระยะที่ 1 — รากฐาน', items: ['ระบบไฟถนนอัจฉริยะ Real-time', 'โครงสร้างพื้นฐาน IoT', 'ลดค่าใช้จ่ายพลังงานและซ่อมบำรุง'] },
              { icon: '📡', title: 'ระยะที่ 2 — ขยาย', items: ['Smart Pole บูรณาการอุปกรณ์หลายชนิด', 'เชื่อมต่อกล้อง CCTV', 'ติดตั้ง Sensor PM2.5 เพิ่มเติม'] },
              { icon: '🤖', title: 'ระยะที่ 3 — Super App', items: ['แอปเดียวสำหรับทุกกอง', 'ดึงข้อมูลเข้า Database กลาง', 'AI Analytics เพื่อการบริหารเมือง'] },
            ].map((f, i) => (
              <div key={i} className="bg-[#272729] rounded-lg p-10">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-white font-bold text-[21px] leading-snug mb-4">{f.title}</h3>
                <ul className="space-y-2">
                  {f.items.map((item, j) => (
                    <li key={j} className="text-white/70 text-[14px] leading-relaxed pl-4 relative">
                      <span className="absolute left-0 text-[#0071e3]">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section id="contact" className="bg-[#f5f5f7] py-24 px-6 text-center">
        <div className="max-w-[680px] mx-auto">
          <p className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-3">ขั้นตอนต่อไป</p>
          <h2 className="text-[#1d1d1f] font-semibold leading-tight mb-5" style={{ fontSize: 'clamp(28px,4vw,40px)' }}>
            มาเริ่มต้นการเปลี่ยนแปลง
          </h2>
          <p className="text-black/70 text-[17px] leading-relaxed mb-10">
            ติดต่อทีมงานของเราเพื่อรับคำปรึกษาและประเมินราคาเบื้องต้นฟรี
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="mailto:contact@gismo.co.th" className="bg-[#0071e3] text-white text-[17px] px-6 py-2 rounded-lg no-underline hover:bg-[#0077ed] transition-colors">
              ติดต่อเรา
            </a>
            <Link to="/" className="text-[#0066cc] border border-[#0066cc] text-[17px] px-6 py-2 rounded-full no-underline hover:underline">
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
