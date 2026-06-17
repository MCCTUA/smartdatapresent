import React from 'react';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// solar/LightingReport.jsx — "ภาษาคน" version of the DIALux lighting-design report
// Route: /#/solar-street-light/report
// Goal: show อบต./นายก/ปลัด that we calculate each project to standard (มอก. 2954-2562
//       + EN 13201 via DIALux evo) — explained in plain language, no engineering jargon.
//       Real sample images + full technical PDF available via button.
// Palette: matches SolarPitchDeck (Amber #D97706 + Navy #0B2D48 + Cream #FFFBEB · Sarabun)
// All numbers verified against the attached DIALux report (SA-2A01-060, Street 1).
// ---------------------------------------------------------------------------

const C = {
  primary: '#D97706',
  primaryDeep: '#0B2D48',
  primaryDeepEnd: '#1E3A5F',
  primarySoft: '#FEF3C7',
  surface: '#FFFBEB',
  surfaceSoft: '#FDF6D1',
  text: '#1F2937',
  textMuted: '#6B7280',
  accent: '#0EA5E9',
  success: '#16A34A',
  successSoft: '#DCFCE7',
};

const IMG = 'images/solar/report';
const PDF = 'downloads/Lighting_Design_Report_SA-2A01.pdf';       // DIALux technical (full calc)
const EXEC_DOC = 'downloads/Executive_Lighting_Report_SA-2A01.docx'; // executive summary report

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
};

function Section({ children, dark, soft, style }) {
  return (
    <section
      style={{
        background: dark ? `linear-gradient(135deg, ${C.primaryDeep} 0%, ${C.primaryDeepEnd} 100%)` : soft ? C.surfaceSoft : C.surface,
        color: dark ? '#FFF' : C.text,
        padding: 'clamp(48px, 8vw, 88px) 24px',
        ...style,
      }}
    >
      <div style={{ maxWidth: 980, margin: '0 auto' }}>{children}</div>
    </section>
  );
}

function Eyebrow({ color, dark, children }) {
  return (
    <p style={{ fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: color || (dark ? '#FDE68A' : C.primary), marginBottom: 14 }}>
      {children}
    </p>
  );
}

export default function LightingReport() {
  return (
    <div style={{ fontFamily: 'Sarabun, sans-serif', background: C.surface }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700;800&display=swap');`}</style>

      {/* ---------- HERO ---------- */}
      <Section dark style={{ paddingTop: 'clamp(56px, 9vw, 96px)' }}>
        <motion.div {...fade}>
          <Eyebrow dark>ตัวอย่างรายงานการออกแบบแสงสว่าง</Eyebrow>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.35, color: '#FFF', letterSpacing: -0.5, marginBottom: 22 }}>
            ก่อนติดตั้งทุกโครงการ<br />
            <span style={{ color: '#FDE68A' }}>เราคำนวณแสงให้ตามมาตรฐานก่อนเสมอ</span>
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2.2vw, 21px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.9)', maxWidth: 760 }}>
            ท่านไม่ต้องเดาว่าโคมจะสว่างพอไหม ผ่านมาตรฐาน อบต. หรือเปล่า — เพราะเราออกแบบและคำนวณ
            ด้วยโปรแกรมวิศวกรรม <strong style={{ color: '#FFF' }}>DIALux evo</strong> ตามมาตรฐาน
            <strong style={{ color: '#FFF' }}> มอก. 2954–2562</strong> ให้เรียบร้อยตั้งแต่ก่อนเสนอราคา
            หน้านี้คือตัวอย่างผลการคำนวณจริง อธิบายแบบเข้าใจง่าย ไม่ต้องเป็นวิศวกรก็อ่านรู้เรื่อง
          </p>
          <div style={{ marginTop: 28, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href={EXEC_DOC} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', background: C.primary, color: '#FFF', fontWeight: 700, fontSize: 16, padding: '14px 28px', borderRadius: 12, textDecoration: 'none' }}>
              ดาวน์โหลดรายงานผู้บริหาร (Word) →
            </a>
            <a href="#/solar-street-light"
              style={{ display: 'inline-block', background: 'rgba(255,255,255,0.12)', color: '#FFF', fontWeight: 600, fontSize: 16, padding: '14px 28px', borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.25)' }}>
              ← กลับไปหน้านำเสนอ
            </a>
          </div>
        </motion.div>
      </Section>

      {/* ---------- 1. ปัญหา: ทำไมต้องคำนวณ ---------- */}
      <Section>
        <motion.div {...fade}>
          <Eyebrow>ทำไมเรื่องนี้สำคัญ</Eyebrow>
          <h2 style={{ fontSize: 'clamp(26px, 3.6vw, 38px)', fontWeight: 800, color: C.primaryDeep, lineHeight: 1.4, marginBottom: 18 }}>
            "ติดไฟแล้ว แต่จะผ่านเกณฑ์ อบต. ไหม?" — คำถามที่ไม่ควรต้องลุ้น
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.75, color: C.textMuted, maxWidth: 820 }}>
            ถ้าเลือกโคมผิด หรือตั้งเสาห่างเกินไป ไฟอาจจะดูสว่างตอนกลางคืน แต่จริง ๆ
            แล้ว <strong style={{ color: C.text }}>มีจุดมืดเป็นช่วง ๆ</strong> หรือ
            <strong style={{ color: C.text }}>ค่าความสว่างไม่ถึงเกณฑ์มาตรฐาน</strong> ทำให้ส่งมอบงานไม่ผ่าน
            ต้องแก้ใหม่ เสียทั้งเวลาและงบ เราจึงคำนวณให้ก่อนทุกครั้ง เพื่อให้ท่านมั่นใจตั้งแต่วันแรก
          </p>
        </motion.div>
      </Section>

      {/* ---------- 2. เราทำให้ 3 ขั้น ---------- */}
      <Section soft>
        <motion.div {...fade}>
          <Eyebrow>เราทำอะไรให้ท่าน</Eyebrow>
          <h2 style={{ fontSize: 'clamp(26px, 3.6vw, 38px)', fontWeight: 800, color: C.primaryDeep, lineHeight: 1.4, marginBottom: 32 }}>
            จากหน้างานของท่าน → สู่ผลที่การันตีได้ ใน 3 ขั้น
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {[
              { n: '1', t: 'ดูหน้างานจริงของท่าน', d: 'ความกว้างถนน · ประเภทผิวถนน · ความสูงเสาที่มี · ระยะห่างเสา — เก็บข้อมูลจริงจากพื้นที่ ไม่ใช่ค่ามาตรฐานสำเร็จรูป' },
              { n: '2', t: 'คำนวณด้วย DIALux evo', d: 'จำลองการกระจายแสงทั้งเส้นถนน ทดสอบหลายทางเลือก (ความสูงเสา/ระยะเสา) เทียบกับเกณฑ์ มอก. 2954–2562 ทุกค่า' },
              { n: '3', t: 'เลือกแบบที่ "ผ่าน + เผื่อ"', d: 'เสนอแบบที่ผ่านเกณฑ์อย่างปลอดภัย ไม่ใช่แค่เฉียดผ่าน เพื่อให้สว่างสม่ำเสมอจริงและรับการตรวจวัดหน้างานได้' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#FFF', borderRadius: 18, padding: '28px 26px', border: `1px solid ${C.surfaceSoft}` }}>
                <div style={{ width: 46, height: 46, borderRadius: '50%', background: C.primary, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 20, marginBottom: 16 }}>{s.n}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: C.primaryDeep, marginBottom: 8, lineHeight: 1.4 }}>{s.t}</h3>
                <p style={{ fontSize: 15.5, color: C.textMuted, lineHeight: 1.65 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ---------- 3. ผลที่ได้ (ตัวเลขจริง แต่อธิบายง่าย) ---------- */}
      <Section>
        <motion.div {...fade}>
          <Eyebrow color={C.success}>ผลจากตัวอย่างจริง · ถนนชุมชน</Eyebrow>
          <h2 style={{ fontSize: 'clamp(26px, 3.6vw, 38px)', fontWeight: 800, color: C.primaryDeep, lineHeight: 1.4, marginBottom: 14 }}>
            ผลออกมา "ผ่านทุกข้อ" และยังสว่างเผื่อให้ด้วย
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: C.textMuted, maxWidth: 820, marginBottom: 32 }}>
            ตัวอย่างนี้เป็นถนนชุมชนจริงเส้นหนึ่ง (ใช้โคมรุ่น SA-2A01) ตามมาตรฐานถนนแบบนี้ต้องสว่างระดับหนึ่ง
            แต่เราตั้งใจออกแบบให้ <strong style={{ color: C.text }}>สว่างเกินเกณฑ์ขั้นต่ำ</strong> ในช่วงหัวค่ำที่คนใช้ถนนเยอะ
            แล้วค่อยหรี่ลงตอนดึกเพื่อประหยัดพลังงานแบต — โดยยังผ่านเกณฑ์อยู่
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 18, marginBottom: 28 }}>
            {[
              { big: 'ผ่าน ✓', label: 'ทุกเกณฑ์มาตรฐาน', desc: 'ทั้งความสว่างเฉลี่ย ความสว่างจุดมืดสุด และความสม่ำเสมอ — ผ่านครบตามเกณฑ์ มอก. 2954–2562', col: C.success },
              { big: 'สว่างเผื่อ', label: 'ออกแบบเกินขั้นต่ำ', desc: 'ช่วงเปิดเต็มออกแบบให้สว่างกว่าที่มาตรฐานถนนประเภทนี้กำหนด เพื่อความปลอดภัยช่วงคนสัญจรหนาแน่น', col: C.primary },
              { big: 'ไม่มีจุดมืด', label: 'แสงสม่ำเสมอทั้งเส้น', desc: 'ความสว่างกระจายทั่วถึง จุดที่มืดที่สุดยังสูงกว่าเกณฑ์ ไม่มีช่วงดำสนิทระหว่างเสา', col: C.accent },
            ].map((s, i) => (
              <div key={i} style={{ background: '#FFF', border: `2px solid ${s.col}22`, borderRadius: 18, padding: '26px 24px' }}>
                <div style={{ fontSize: 30, fontWeight: 800, color: s.col, lineHeight: 1.2, marginBottom: 4 }}>{s.big}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.primaryDeep, marginBottom: 8 }}>{s.label}</div>
                <p style={{ fontSize: 14.5, color: C.textMuted, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* กลางวัน-กลางคืน หรี่ไฟ */}
          <div style={{ background: C.primarySoft, borderRadius: 18, padding: 'clamp(22px, 4vw, 32px)' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: C.primaryDeep, marginBottom: 16 }}>หัวค่ำสว่างเต็มที่ · ดึกหรี่ลงประหยัดไฟ — แต่ยังผ่านเกณฑ์ทั้งคู่</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              <div style={{ background: '#FFF', borderRadius: 14, padding: '20px 22px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, marginBottom: 6, letterSpacing: 0.5 }}>🌆 ช่วงหัวค่ำ · เปิดเต็ม 100%</div>
                <p style={{ fontSize: 15, color: C.text, lineHeight: 1.65, margin: 0 }}>
                  สว่างระดับสูง (ราว 10 ลักซ์) สำหรับช่วงที่มีคนและรถสัญจรหนาแน่น — สูงกว่าเกณฑ์ขั้นต่ำของถนนชุมชนทั่วไป
                </p>
              </div>
              <div style={{ background: '#FFF', borderRadius: 14, padding: '20px 22px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.accent, marginBottom: 6, letterSpacing: 0.5 }}>🌙 ช่วงดึก · หรี่ลง ~30%</div>
                <p style={{ fontSize: 15, color: C.text, lineHeight: 1.65, margin: 0 }}>
                  หรี่ลงเพื่อยืดพลังงานแบต ใช้ไฟน้อยลงมาก แต่ความสว่างยังผ่านเกณฑ์มาตรฐานสำหรับช่วงจราจรเบา
                </p>
              </div>
            </div>
            <p style={{ fontSize: 13, color: C.textMuted, marginTop: 16, marginBottom: 0, fontStyle: 'italic' }}>
              การหรี่ไฟช่วยให้โคมทำงานต่อเนื่องได้หลายวันแม้ช่วงฝนตกหรือแดดน้อย โดยไม่กระทบความปลอดภัย
            </p>
          </div>
        </motion.div>
      </Section>

      {/* ---------- 4. เอกสารจริง (รูปตัวอย่าง) ---------- */}
      <Section soft>
        <motion.div {...fade}>
          <Eyebrow>เอกสารที่จับต้องได้</Eyebrow>
          <h2 style={{ fontSize: 'clamp(26px, 3.6vw, 38px)', fontWeight: 800, color: C.primaryDeep, lineHeight: 1.4, marginBottom: 14 }}>
            ทุกตัวเลขมีเอกสารวิศวกรรมรองรับ
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: C.textMuted, maxWidth: 820, marginBottom: 28 }}>
            ผลการคำนวณทุกค่ามาจากรายงานฉบับจริงที่ผู้รับเหมานำไปยื่นต่อ อบต. ได้
            และวิศวกรของ อบต. ตรวจสอบได้ — นี่คือตัวอย่างหน้าจากเอกสารฉบับเต็ม
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 36 }}>
            {[
              { src: `${IMG}/recommended_design.png`, cap: 'หน้าสรุปผล — ตารางเทียบกับเกณฑ์มาตรฐาน ทุกแถวขึ้นเครื่องหมายผ่าน ✓' },
              { src: `${IMG}/iso_illuminance.png`, cap: 'แผนภาพการกระจายแสงทั้งเส้นถนน — เห็นได้ว่าแสงทั่วถึง ไม่มีช่วงมืด' },
            ].map((im, i) => (
              <figure key={i} style={{ margin: 0, background: '#FFF', borderRadius: 16, padding: 14, border: `1px solid ${C.surfaceSoft}`, boxShadow: 'rgba(0,0,0,0.10) 0px 6px 24px' }}>
                <img src={im.src} alt={im.cap} style={{ width: '100%', height: 'auto', borderRadius: 8, display: 'block', border: `1px solid ${C.surfaceSoft}` }} />
                <figcaption style={{ fontSize: 13.5, color: C.textMuted, lineHeight: 1.6, marginTop: 12, padding: '0 4px' }}>{im.cap}</figcaption>
              </figure>
            ))}
          </div>

          {/* two separate document cards */}
          <h3 style={{ fontSize: 'clamp(19px, 2.4vw, 24px)', fontWeight: 800, color: C.primaryDeep, marginBottom: 18 }}>
            ดาวน์โหลดเอกสาร 2 ฉบับ
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {[
              {
                tag: 'สำหรับผู้บริหาร',
                tagBg: C.primary,
                icon: '📋',
                title: 'รายงานผู้บริหาร (Executive Report)',
                desc: 'สรุปการออกแบบและผลการคำนวณ พร้อมบทสรุปผู้บริหาร เปรียบเทียบทางเลือก และคำอธิบายมาตรฐาน — อ่านเข้าใจง่าย เหมาะสำหรับ นายก/ปลัด และผู้ตัดสินใจ',
                href: EXEC_DOC,
                btn: 'ดาวน์โหลดรายงานผู้บริหาร (Word)',
                meta: 'ไฟล์ Word · .docx',
                btnBg: C.primary,
              },
              {
                tag: 'สำหรับวิศวกร',
                tagBg: C.primaryDeep,
                icon: '📐',
                title: 'เอกสารคำนวณเทคนิค (DIALux)',
                desc: 'ผลการคำนวณ DIALux evo ฉบับเต็มทุก scenario พร้อมแผนภาพการกระจายแสงและค่าตามจุดวัด — สำหรับวิศวกร อบต. ที่ต้องการตรวจสอบรายละเอียด',
                href: PDF,
                btn: 'เปิดเอกสารคำนวณเทคนิค (PDF)',
                meta: 'ไฟล์ PDF · 31 หน้า',
                btnBg: C.primaryDeep,
              },
            ].map((d, i) => (
              <div key={i} style={{ background: '#FFF', borderRadius: 18, padding: 'clamp(22px, 3vw, 28px)', border: `1px solid ${C.surfaceSoft}`, boxShadow: 'rgba(0,0,0,0.08) 0px 6px 24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <span style={{ fontSize: 34, lineHeight: 1 }}>{d.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#FFF', background: d.tagBg, padding: '4px 12px', borderRadius: 100, letterSpacing: 0.5 }}>{d.tag}</span>
                </div>
                <h4 style={{ fontSize: 20, fontWeight: 800, color: C.primaryDeep, marginBottom: 10, lineHeight: 1.4 }}>{d.title}</h4>
                <p style={{ fontSize: 14.5, color: C.textMuted, lineHeight: 1.65, marginBottom: 20, flex: 1 }}>{d.desc}</p>
                <div style={{ fontSize: 12.5, color: C.textMuted, marginBottom: 12, fontWeight: 600 }}>{d.meta}</div>
                <a href={d.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', textAlign: 'center', background: d.btnBg, color: '#FFF', fontWeight: 700, fontSize: 15, padding: '13px 20px', borderRadius: 12, textDecoration: 'none' }}>
                  {d.btn} →
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ---------- 5. มาตรฐานอ้างอิง + disclaimer ---------- */}
      <Section dark>
        <motion.div {...fade}>
          <Eyebrow dark>ยึดตามมาตรฐานจริง</Eyebrow>
          <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 34px)', fontWeight: 800, color: '#FFF', lineHeight: 1.4, marginBottom: 24 }}>
            เราคำนวณตามมาตรฐานเหล่านี้
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
            {[
              { code: 'มอก. 2954–2562', d: 'มาตรฐานไฟส่องสว่างถนนของไทย (มาตรฐานหลักที่ใช้อ้างอิง)' },
              { code: 'EN 13201:2015', d: 'มาตรฐานไฟถนนยุโรป — ฐานเดียวกับที่ใช้คำนวณใน DIALux' },
              { code: 'CIE 115:2010', d: 'เอกสารฐานสากลด้านการให้แสงสว่างบนถนน' },
            ].map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 16, padding: '22px 24px' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#FDE68A', marginBottom: 8 }}>{c.code}</div>
                <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, margin: 0 }}>{c.d}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontStyle: 'italic', maxWidth: 820 }}>
            หมายเหตุ: ค่าความสว่างทั้งหมดเป็นผลจากการคำนวณด้วยโปรแกรม DIALux evo
            แนะนำให้วัดค่าความสว่างจริงหน้างานหลังติดตั้งตาม มอก. 2954–2562 อีกครั้ง เพื่อยืนยันผลก่อนการรับรองอย่างเป็นทางการ
            ตัวเลขจริงของแต่ละโครงการขึ้นอยู่กับสภาพหน้างาน
          </p>
        </motion.div>
      </Section>

      {/* ---------- CTA ---------- */}
      <Section soft style={{ textAlign: 'center' }}>
        <motion.div {...fade}>
          <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 34px)', fontWeight: 800, color: C.primaryDeep, lineHeight: 1.4, marginBottom: 16 }}>
            อยากได้รายงานแบบนี้สำหรับถนนของท่าน?
          </h2>
          <p style={{ fontSize: 17, color: C.textMuted, lineHeight: 1.7, maxWidth: 680, margin: '0 auto 28px' }}>
            ส่งข้อมูลถนน (ความยาว · ความกว้าง · ความสูงเสาที่ต้องการ) มาให้เรา
            เราจะคำนวณและจัดทำรายงานการออกแบบแสงให้ตามมาตรฐาน เพื่อใช้ประกอบการตัดสินใจ
          </p>
          <a href="#/solar-street-light"
            style={{ display: 'inline-block', background: C.primary, color: '#FFF', fontWeight: 700, fontSize: 16, padding: '15px 32px', borderRadius: 12, textDecoration: 'none' }}>
            ← กลับไปดูสินค้าและการนำเสนอ
          </a>
        </motion.div>
      </Section>
    </div>
  );
}
