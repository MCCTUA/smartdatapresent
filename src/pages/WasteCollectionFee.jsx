import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  show: { transition: { staggerChildren: 0.1 } }
};

// --- Reusable Components ---

function WideSection({ children, className = "", dark = false, id = "" }) {
  return (
    <section 
      id={id} 
      className={`py-20 w-full ${dark ? 'bg-[#000000] text-white' : 'bg-[#fff] text-[#1d1d1f]'} ${className}`}
    >
      <div className="w-full px-6 md:px-12">
        {children}
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, body, dark = false, center = true }) {
  return (
    <motion.div 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeUp}
      className={`${center ? 'text-center' : 'text-left'} max-w-4xl ${center ? 'mx-auto' : ''} mb-12`}
    >
      {eyebrow && (
        <p className="text-[13px] font-bold tracking-[2.5px] uppercase text-[#0071e3] mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mb-5 ${dark ? 'text-white' : 'text-[#1d1d1f]'}`}>
        {title}
      </h2>
      {body && (
        <p className={`text-[17px] md:text-xl leading-relaxed ${dark ? 'text-white/60' : 'text-black/60'}`}>
          {body}
        </p>
      )}
    </motion.div>
  );
}

// --- Interactive Full Width Canvas Viewer with Zoom ---

const FullCanvasViewer = ({ src, title, defaultHeight = "600px", baseScale = 1.0 }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const currentScale = isZoomed ? 1.5 : baseScale;
  const currentHeight = isZoomed ? "950px" : defaultHeight;

  return (
    <div className="w-full bg-white rounded-3xl shadow-[0_15px_45px_-10px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="bg-gray-50/50 px-6 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/30" />
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">{title}</span>
          <button 
            onClick={() => setIsZoomed(!isZoomed)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold transition-all ${isZoomed ? 'bg-[#0071e3] text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
          >
            <span>{isZoomed ? '🔍 ZOOM 150%' : '🔍 CLICK TO ZOOM'}</span>
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto overflow-y-auto custom-scrollbar transition-all duration-500" style={{ height: currentHeight }}>
        <div style={{ minWidth: '1200px', height: '100%', position: 'relative' }}>
          <iframe 
            src={src} 
            title={title} 
            className="w-full h-full border-none transition-transform duration-500" 
            style={{ 
              transform: `scale(${currentScale})`, 
              transformOrigin: 'top left',
              width: `${100 / currentScale}%`,
              height: `${100 / currentScale}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default function WasteCollectionFee() {
  return (
    <div className="bg-white font-sans overflow-x-hidden selection:bg-blue-100">
      {/* 1. Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center bg-black overflow-hidden pt-12">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10"></div>
          <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=2070" alt="Waste" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-20 text-center px-6 max-w-6xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[#ffffff] text-[15px] font-bold tracking-[3px] uppercase mb-5">Local Authority Fee Platform</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-[1.4] mb-8">
            หน่วยงานท้องถิ่นยุคใหม่ <br /> <span className="text-[#0071e3]">ดิจิทัลทั้งองค์กร</span> <br /> <span className='text-red-400'>เก็บรายได้ครบ งานมือลด 70%</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            เปลี่ยนการจัดเก็บค่าธรรมเนียมแบบเดิม สู่ระบบดิจิทัลที่โปร่งใส ตรวจสอบได้ และเพิ่มรายได้จริงให้ท้องถิ่นอย่างยั่งยืน
          </motion.p>
        </div>
      </section>

      {/* 2. Pain Points Section */}
      <WideSection>
        <SectionHeader eyebrow="The Challenge" title="ปัญหาที่หน่วยงานท้องถิ่นเผชิญ" body="ช่องโหว่จากการจัดเก็บด้วยระบบเดิมที่ก่อให้เกิดความไม่คุ้มค่าในเชิงบริหารจัดการ" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            { icon: "⚠️", stat: "25-40%", title: "ค้างชำระสะสม", desc: "อัตราค้างชำระค่าขยะต่อปีในหลายพื้นที่ เนื่องจากไม่มีระบบติดตาม" },
            { icon: "💰", stat: "หลายเท่า", title: "ค่าใช้จ่ายแฝง", desc: "ค่าใช้จ่ายในการกำจัดขยะสูงกว่าค่าธรรมเนียมที่จัดเก็บได้จริงหลายเท่าตัว" },
            { icon: "📉", stat: "Real-time", title: "ขาดข้อมูลบริหาร", desc: "ผู้บริหารไม่มีข้อมูลรายได้รายวันเพื่อใช้ในการตัดสินใจและวางแผน" },
            { icon: "🔍", stat: "Missing", title: "รายได้ตกหล่น", desc: "ภาษีป้ายและค่าธรรมเนียมอื่นๆ ตกหล่นจากการสำรวจที่ผิดพลาด" }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-[#f5f5f7] border border-gray-50 transition-all hover:bg-white hover:shadow-xl group">
              <div className="text-3xl mb-6 opacity-80 group-hover:scale-110 transition-transform">{item.icon}</div>
              <p className="text-4xl font-bold mb-2 text-[#0071e3]">{item.stat}</p>
              <h3 className="text-[19px] font-bold mb-3">{item.title}</h3>
              <p className="text-black/50 text-[14px] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </WideSection>

      {/* 3. Intelligence Hub (Officer Dashboard) */}
      <WideSection className="bg-[#f5f5f7]">
        <SectionHeader 
          eyebrow="Intelligence Hub" 
          title="บริหารจัดการด้วยข้อมูลจริง" 
          body="Dashboard อัจฉริยะเพื่อให้หน่วยงานเห็นภาพรวมรายได้และการทำงานทั้งหมดได้ทันที" 
        />
        <FullCanvasViewer 
          src="ui_v2/O-01 KPI Dashboard.html" 
          title="Executive Dashboard" 
          defaultHeight="700px" 
          baseScale={0.95} 
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
            {[
              { t: "Revenue Overview", d: "ยอดจัดเก็บจริงเทียบเป้าหมายรายเดือน" },
              { t: "Arrears Management", d: "วิเคราะห์ลูกหนี้ค้างชำระรายโซน" },
              { t: "Daily Reconciliation", d: "กระทบยอดธนาคารอัตโนมัติ 100%" }
            ].map((f, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="text-[17px] font-bold mb-2 text-[#0071e3]">{f.t}</h4>
                <p className="text-black/50 text-sm leading-relaxed">{f.d}</p>
              </div>
            ))}
        </div>
      </WideSection>

      {/* 4. Resident Experience */}
      <WideSection>
        <SectionHeader 
          eyebrow="Resident Experience" 
          title="หน้าจอสำหรับประชาชน" 
          body="ประสบการณ์ดิจิทัลที่ออกแบบมาให้ใช้งานง่าย เห็นผลการทำงานต่อเนื่องสวยงาม" 
        />
        <div className="space-y-16">
          <div className="max-w-[1300px] mx-auto">
            <h3 className="text-lg font-bold mb-6 text-center text-gray-400 uppercase tracking-widest">Resident Dashboard & Bills</h3>
            <FullCanvasViewer 
              src="ui_v2/R-02-ResidentDashboard.html" 
              title="Resident Flow" 
              defaultHeight="650px" 
              baseScale={0.9} 
            />
          </div>
          <div className="max-w-[1300px] mx-auto">
            <h3 className="text-lg font-bold mb-6 text-center text-gray-400 uppercase tracking-widest">Payment & Receipt Flow</h3>
            <FullCanvasViewer 
              src="ui_v2/R-05-PaymentFlow.html" 
              title="Payment Flow" 
              defaultHeight="650px" 
              baseScale={0.9} 
            />
          </div>
        </div>
      </WideSection>

      {/* 5. Field Operations */}
      <WideSection className="bg-[#f5f5f7]">
        <SectionHeader 
          eyebrow="Field Operations" 
          title="ระบบสำหรับเจ้าหน้าที่ภาคสนาม" 
          body="ช่วยให้ทีมขับรถและทีมสำรวจของหน่วยงานท้องถิ่นทำงานได้อย่างรวดเร็วและแม่นยำ" 
        />
        <div className="space-y-16">
          <div className="max-w-[1300px] mx-auto">
            <h3 className="text-lg font-bold mb-6 text-center text-gray-400 uppercase tracking-widest">Collection Schedule & Route Map</h3>
            <FullCanvasViewer 
              src="ui_v2/R-09 Collection Schedule.html" 
              title="Driver App" 
              defaultHeight="650px" 
              baseScale={0.9} 
            />
          </div>
          <div className="max-w-[1300px] mx-auto">
            <h3 className="text-lg font-bold mb-6 text-center text-gray-400 uppercase tracking-widest">Issue Tracking & Reporting</h3>
            <FullCanvasViewer 
              src="ui_v2/R-11 Issue Tracking.html" 
              title="Field Reports" 
              defaultHeight="650px" 
              baseScale={0.9} 
            />
          </div>
        </div>
      </WideSection>

      {/* 6. Success Indicators */}
      <WideSection dark={true}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-12">ความเปลี่ยนแปลง <br />ที่วัดผลได้จริง</h2>
            <div className="space-y-6">
              {[
                { label: "กระบวนการออกบิล", after: "อัตโนมัติตามรอบ" },
                { label: "การรับชำระเงิน", after: "Online 24 ชั่วโมง" },
                { label: "การจดมิเตอร์", after: "AI OCR / GPS Sync" },
                { label: "รายงาน สตง.", after: "Export ใน 1 คลิก" }
              ].map((row, i) => (
                <div key={i} className="py-5 border-b border-white/10 flex justify-between items-center">
                  <div className="text-sm font-bold text-[#0071e3] uppercase tracking-widest">{row.label}</div>
                  <div className="text-white font-medium text-lg">✓ {row.after}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 p-10 md:p-14 rounded-[3rem] border border-white/10 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-10">KPI เป้าหมายในปีแรก</h2>
            <div className="space-y-8">
              {[
                { label: "เพิ่มอัตราจัดเก็บรายได้", val: "+20%", w: "80%" },
                { label: "ลดต้นทุนการทำงาน", val: "-30%", w: "70%" },
                { label: "ความแม่นยำข้อมูล", val: "100%", w: "100%" }
              ].map((k, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-sm font-medium text-white/70">{k.label}</span>
                    <span className="text-2xl font-bold text-[#0071e3]">{k.val}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: k.w }} transition={{ duration: 1 }} className="bg-[#0071e3] h-full rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </WideSection>

      {/* Future Roadmap */}
      <WideSection className="bg-white">
        <SectionHeader 
          eyebrow="Future Roadmap" 
          title="ฟีเจอร์ที่จะช่วยยกระดับ หน่วยงานในอนาคต" 
          body="เราไม่หยุดพัฒนา เพื่อให้ เป็นแพลตฟอร์มที่ครอบคลุมทุกมิติการบริหารจัดการท้องถิ่น"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {[
            { title: "ภาษีที่ดินและสิ่งปลูกสร้าง", desc: "ระบบประเมินและจัดเก็บตาม พ.ร.บ. ภาษีที่ดินฯ พ.ศ. 2562 ครบวงจร", icon: "🏠" },
            { title: "ใบอนุญาตและค่าธรรมเนียม", desc: "จัดการการออกใบอนุญาตประกอบกิจการที่เป็นอันตรายต่อสุขภาพและอื่นๆ", icon: "📜" },
            { title: "ค่าเช่าทรัพย์สินสาธารณะ", desc: "บริหารจัดการสัญญาเช่าตลาด ห้องแถว และทรัพย์สินของหน่วยงาน", icon: "🔑" },
            { title: "ระบบร้องเรียนและ CRM ประชาชน", desc: "ช่องทางรับเรื่องร้องทุกข์ ติดตามสถานะ และวิเคราะห์ความพึงพอใจ", icon: "💬" },
            { title: "BI Dashboard และ Open Data", desc: "วิเคราะห์ข้อมูลเชิงลึก (Business Intelligence) เพื่อการตัดสินใจระดับนโยบาย", icon: "📊" },
            { title: "And more...", desc: "หน่วยงานท้องถิ่นของคุณ ต้องการฟีเจอร์หรือระบบส่วนไหนเพิ่มเติมบ้างครับ?", icon: "❓", custom: true }
          ].map((item, i) => (
            <div key={i} className={`p-8 rounded-[2.5rem] border transition-all hover:shadow-xl ${item.custom ? 'bg-blue-600 text-white border-blue-600' : 'bg-[#f5f5f7] border-gray-100'}`}>
              <div className="text-3xl mb-6">{item.icon}</div>
              <h4 className={`text-xl font-bold mb-4 ${item.custom ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
              <p className={`text-sm leading-relaxed ${item.custom ? 'text-white/80' : 'text-gray-500'}`}>{item.desc}</p>
              {item.custom && (
                <div className="mt-8">
                  <span className="inline-block px-6 py-2 bg-white text-blue-600 rounded-full font-bold text-sm">บอกความต้องการของคุณ</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </WideSection>

      {/* 8. Pricing & CTA */}
      <WideSection>
        <SectionHeader eyebrow="Getting Started" title="เริ่มต้นสู่การเป็นเมืองอัจฉริยะ" body="พร้อมติดตั้งและอบรมเจ้าหน้าที่ให้ใช้งานเป็นภายใน 30 วัน" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {[
            { tier: "Starter", target: "อบต. ขนาดเล็ก", houses: "≤ 500 ครัวเรือน", desc: "ดิจิทัลพื้นฐานสำหรับการเริ่มเปลี่ยนผ่าน" },
            { tier: "Standard", target: "เทศบาล / อบต. กลาง", houses: "≤ 2,500 ครัวเรือน", desc: "รวมระบบภาคสนามและสติ๊กเกอร์สี", featured: true },
            { tier: "Enterprise", target: "เทศบาลเมือง / นคร", houses: "> 5,000 ครัวเรือน", desc: "รองรับข้อมูลมหาศาลและการเชื่อมต่อแบบพิเศษ" }
          ].map((p, i) => (
            <div key={i} className={`p-10 rounded-[2.5rem] border ${p.featured ? 'border-[#0071e3] bg-white shadow-2xl scale-105' : 'border-gray-100 bg-white shadow-sm'} flex flex-col transition-all`}>
              <h4 className="text-xl font-bold mb-1">{p.tier}</h4>
              <p className="text-[13px] text-[#0071e3] font-bold mb-8 uppercase tracking-widest">{p.target}</p>
              <p className="text-4xl font-bold mb-5">{p.houses}</p>
              <p className="text-gray-500 text-sm mb-10 leading-relaxed">{p.desc}</p>
              <button className={`mt-auto py-4 rounded-full text-sm font-bold shadow-lg transition-all ${p.featured ? 'bg-[#0071e3] text-white hover:bg-[#0077ed]' : 'bg-gray-50 text-black hover:bg-gray-100'}`}>
                ติดต่อสอบถามราคา
              </button>
            </div>
          ))}
        </div>
        <div className="max-w-5xl mx-auto bg-[#1b61c9] rounded-[3.5rem] p-12 md:p-16 text-white text-center shadow-2xl relative overflow-hidden">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">เริ่มการสำรวจความต้องการของคุณวันนี้</h3>
         
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            
            <button className="px-10 py-4 bg-[#0071e3] text-white rounded-full font-bold text-lg border border-white/20 hover:bg-[#0077ed] transition-all">ดาวน์โหลดโบร์ชัวร์</button>
          </div>
        </div>
      </WideSection>
      <div className="h-24 bg-white"></div>
    </div>
  );
}
