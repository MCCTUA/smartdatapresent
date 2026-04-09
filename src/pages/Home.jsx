import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.12 } },
};

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-screen bg-black flex items-center justify-center px-6 text-center">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.h1
            variants={fadeUp}
            className="text-white font-semibold leading-[1.07] tracking-[-0.28px] mb-5"
            style={{ fontSize: 'clamp(36px, 6vw, 56px)' }}
          >
            โซลูชันอัจฉริยะ<br />สำหรับเมืองแห่งอนาคต
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-white/70 mb-10"
            style={{ fontSize: 'clamp(17px, 2vw, 21px)', lineHeight: 1.47 }}
          >
            ฮาร์ดแวร์ประสิทธิภาพสูง ซอฟต์แวร์ที่ยืดหยุ่น และบริการครบวงจร<br />
            สำหรับหน่วยงานท้องถิ่นและผู้รับเหมาทั่วประเทศไทย
          </motion.p>
          <motion.div variants={fadeUp} className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => scrollTo('products')}
              className="bg-[#0071e3] text-white text-[17px] px-6 py-2 rounded-lg border-none cursor-pointer hover:bg-[#0077ed] transition-colors"
            >
              ดูผลิตภัณฑ์
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-[#2997ff] border border-[#2997ff] text-[17px] px-6 py-2 rounded-full bg-transparent cursor-pointer hover:underline"
            >
              เกี่ยวกับเรา
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-black border-t border-white/10">
        <div className="max-w-[980px] mx-auto grid grid-cols-2 md:grid-cols-4">
          {[
            { n: '50+', l: 'หน่วยงานท้องถิ่น\nที่ไว้วางใจเรา' },
            { n: '15+', l: 'ปีประสบการณ์\nอุตสาหกรรม LED' },
            { n: '70%', l: 'ประหยัดพลังงาน\nสูงสุด' },
            { n: '24/7', l: 'การสนับสนุน\nทางเทคนิค' },
          ].map((s, i) => (
            <div key={i} className={`py-10 text-center ${i < 3 ? 'border-r border-white/10' : ''}`}>
              <div className="text-[40px] font-semibold text-[#0071e3] leading-tight">{s.n}</div>
              <div className="text-[14px] text-white/60 mt-2 whitespace-pre-line leading-relaxed">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="bg-[#f5f5f7] py-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-3">ผลิตภัณฑ์และโซลูชัน</p>
            <h2 className="text-[#1d1d1f] font-semibold leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
              ครบทุกความต้องการ<br />ของหน่วยงานท้องถิ่น
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Smart Street Light */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-white rounded-xl overflow-hidden shadow-[rgba(0,0,0,0.22)_3px_5px_30px_0px]"
            >
              <div className="h-56 overflow-hidden relative bg-[#0a0e1a]">
                <img
                  src="images/smartlight/location.webp"
                  alt="Smart Street Light Dashboard"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="p-7">
                <p className="text-[12px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-2">Smart City</p>
                <h3 className="text-[#1d1d1f] font-normal leading-snug mb-3" style={{ fontSize: '28px' }}>
                  Smart<br />Street Light
                </h3>
                <p className="text-[14px] text-black/60 leading-relaxed mb-6">
                  ระบบจัดการไฟถนนอัจฉริยะครบวงจร ควบคุมและตรวจสอบแบบ Real-time ผ่าน IoT ประหยัดพลังงาน 50-70%
                </p>
                <div className="flex gap-4 items-center">
                  <Link to="/smart-street-light" className="bg-[#0071e3] text-white text-[14px] px-4 py-2 rounded-lg no-underline">ดูรายละเอียด</Link>
                  <Link to="/smart-street-light" className="text-[#0066cc] text-[14px] no-underline hover:underline">ดูแพ็กเกจ ›</Link>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Solar Street Light */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-white rounded-xl overflow-hidden shadow-[rgba(0,0,0,0.22)_3px_5px_30px_0px]"
            >
              <img
                src="images/solar/IMG_2589.jpeg"
                alt="Solar Street Light"
                className="w-full h-56 object-cover"
                loading="lazy"
              />
              <div className="p-7">
                <p className="text-[12px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-2">Solar Energy</p>
                <h3 className="text-[#1d1d1f] font-normal leading-snug mb-3" style={{ fontSize: '28px' }}>
                  Solar<br />Street Light
                </h3>
                <p className="text-[14px] text-black/60 leading-relaxed mb-6">
                  โคมไฟถนนพลังงานแสงอาทิตย์คุณภาพสูง มาตรฐาน LM-79, LM-80 และ มอก. ออกแบบมาเพื่อโครงการ อบต.
                </p>
                <div className="flex gap-4 items-center">
                  <Link to="/solar-street-light" className="bg-[#0071e3] text-white text-[14px] px-4 py-2 rounded-lg no-underline">ดูรายละเอียด</Link>
                  <Link to="/solar-street-light" className="text-[#0066cc] text-[14px] no-underline hover:underline">ดูรุ่นสินค้า ›</Link>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Fee Management */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-white rounded-xl overflow-hidden shadow-[rgba(0,0,0,0.22)_3px_5px_30px_0px]"
            >
              <div style={{ height: 224, overflow: 'hidden', position: 'relative', background: '#f0f4fa' }}>
                <iframe
                  src="ui/main_screen.html"
                  title="Fee Management UI Preview"
                  style={{
                    position: 'absolute', top: 0, left: 0,
                    width: 1440, height: 860,
                    transform: 'scale(0.243)', transformOrigin: 'top left',
                    border: 'none', pointerEvents: 'none',
                  }}
                />
              </div>
              <div className="p-7">
                <p className="text-[12px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-2">GovTech</p>
                <h3 className="text-[#1d1d1f] font-normal leading-snug mb-3" style={{ fontSize: '28px' }}>
                  ระบบบริหาร<br />จัดการค่าธรรมเนียม
                </h3>
                <p className="text-[14px] text-black/60 leading-relaxed mb-6">
                  ระบบจัดเก็บค่าธรรมเนียมท้องถิ่นแบบ Cashless โปร่งใส ป้องกันทุจริต ลดการทุจริตจาก 50% เหลือ 0-2%
                </p>
                <div className="flex gap-4 items-center">
                  <Link to="/fee-management" className="bg-[#0071e3] text-white text-[14px] px-4 py-2 rounded-lg no-underline">ดูรายละเอียด</Link>
                  <Link to="/fee-management" className="text-[#0066cc] text-[14px] no-underline hover:underline">ดูขั้นตอน ›</Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-black py-24 px-6">
        <div className="max-w-[980px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-3">เกี่ยวกับเรา</p>
            <h2 className="text-white font-semibold leading-tight mb-5" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
              เทคโนโลยีไทย<br />เพื่อเมืองไทย
            </h2>
            <p className="text-white/70 text-[17px] leading-relaxed">
              บริษัทเทคโนโลยีไทยที่พัฒนาโซลูชัน IoT และซอฟต์แวร์สำหรับหน่วยงานภาครัฐและเอกชนมากว่า 15 ปี ทีมวิศวกรในประเทศพร้อมให้การสนับสนุนและพัฒนาระบบที่ตรงกับความต้องการของคุณอย่างแท้จริง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              { icon: '🏆', title: 'มาตรฐานสากล', desc: 'ผลิตภัณฑ์ผ่านการรับรองมาตรฐาน มอก., LM-79, LM-80 และมาตรฐานสากลอื่นๆ' },
              { icon: '🛠️', title: 'ทีมพัฒนาในไทย', desc: 'เป็นเจ้าของเทคโนโลยีและซอฟต์แวร์เองทั้งหมด พร้อมพัฒนาฟีเจอร์ใหม่ได้รวดเร็ว' },
              { icon: '📞', title: 'สนับสนุน 24/7', desc: 'ทีมงานพร้อมให้คำปรึกษาและแก้ไขปัญหาตลอด 24 ชั่วโมง ทุกวัน' },
            ].map((f, i) => (
              <div key={i} className="bg-[#272729] rounded-lg p-10">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-white font-bold text-[21px] leading-snug mb-3">{f.title}</h3>
                <p className="text-white/70 text-[14px] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {[
              { icon: '🏙️', title: 'ระบบไฟถนน LED ทั่วประเทศ', desc: 'ติดตั้งระบบไฟถนนอัจฉริยะ LED ประสิทธิภาพสูงให้กับเทศบาลและองค์การบริหารส่วนท้องถิ่นกว่า 50 แห่งทั่วประเทศ' },
              { icon: '🛣️', title: 'ระบบ Sensor ทางด่วนทั่วประเทศ', desc: 'พัฒนาระบบ Sensor ตรวจสอบและติดตามสภาพถนน สัญญาณไฟ และความปลอดภัยสำหรับทางด่วนทุก Plaza' },
              { icon: '⚖️', title: 'ระบบ AI/ML — กระทรวงยุติธรรม', desc: 'พัฒนาระบบ AI/Machine Learning สำหรับติดตามพฤติกรรมผู้ต้องขังที่พ้นโทษ เพื่อความปลอดภัยของสังคม' },
            ].map((c, i) => (
              <div key={i} className="bg-[#272729] rounded-lg p-7 flex gap-6 items-start">
                <div className="text-3xl shrink-0">{c.icon}</div>
                <div>
                  <div className="text-white font-semibold text-[17px] mb-2">{c.title}</div>
                  <div className="text-white/70 text-[14px] leading-relaxed">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f5f5f7] py-24 px-6 text-center">
        <div className="max-w-[680px] mx-auto">
          <p className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-3">เริ่มต้นวันนี้</p>
          <h2 className="text-[#1d1d1f] font-semibold leading-tight mb-5" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
            พร้อมยกระดับ<br />หน่วยงานของคุณ?
          </h2>
          <p className="text-black/70 text-[17px] leading-relaxed mb-10">
            รับคำปรึกษาและประเมินราคาเบื้องต้นฟรี
          </p>
          <a
            href="#"
            className="inline-block bg-[#0071e3] text-white text-[17px] px-6 py-2 rounded-lg no-underline hover:bg-[#0077ed] transition-colors"
          >
            ติดต่อเรา
          </a>
        </div>
      </section>
    </div>
  );
}
