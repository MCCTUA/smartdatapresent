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

// ─── Swimlane diagram data ────────────────────────────────────────────────────

const DIAGRAM_ACTORS = [
  { label: 'ประชาชน', sub: 'Resident', emoji: '👤' },
  { label: 'เทศบาล/อบต.', sub: 'Admin', emoji: '🏛️' },
  { label: 'เจ้าหน้าที่', sub: 'Field Officer', emoji: '👮' },
  { label: 'LINE OA', sub: 'Official', emoji: '💬' },
  { label: 'ระบบ', sub: 'System', emoji: '⚙️' },
  { label: 'รถเก็บขยะ', sub: 'Garbage Truck', emoji: '🚛' },
  { label: 'บัญชี', sub: 'Accounting', emoji: '📊' },
  { label: 'กองคลัง', sub: 'Finance', emoji: '💰' },
  { label: 'ธนาคาร', sub: 'Bank API', emoji: '🏦' },
];

const DIAGRAM_PHASES = [
  {
    n: '01', title: 'แจ้งเตือนและนัดหมาย', sub: 'Anti-Scam', color: '#0071e3',
    flows: [
      { from: 1, to: 4, label: 'สร้างบิล + QR Code' },
      { from: 1, to: 0, label: 'ส่งจดหมาย + QR Code' },
    ],
  },
  {
    n: '02', title: 'ตรวจสอบตัวตนเจ้าหน้าที่', sub: 'Identity Verification', color: '#ff9f0a',
    flows: [
      { from: 2, to: 0, label: 'แสดงบัตร QR' },
      { from: 0, to: 4, label: 'สแกน QR' },
      { from: 4, to: 0, label: 'แสดงข้อมูลเจ้าหน้าที่' },
    ],
  },
  {
    n: '03', title: 'ชำระเงิน (Cashless Only)', sub: 'Digital Payment', color: '#34c759',
    flows: [
      { from: 0, to: 8, label: 'โอนเงิน PromptPay' },
      { from: 8, to: 4, label: 'API Webhook: Success' },
      { from: 4, to: 6, label: 'Alert: Payment' },
      { from: 6, to: 4, label: 'ยืนยัน Approve' },
      { from: 4, to: 3, label: 'ส่ง e-Receipt' },
      { from: 3, to: 0, label: 'e-Receipt + ยอดค้าง' },
    ],
  },
  {
    n: '04', title: 'Daily Bank Reconciliation', sub: 'Auto-Reconciliation', color: '#5856d6',
    flows: [
      { from: 4, to: 8, label: 'ดึง Bank Statement' },
      { from: 8, to: 4, label: 'Transaction List' },
      { from: 4, to: 7, label: 'Daily Report' },
    ],
  },
  {
    n: '05', title: 'ออกใบเสร็จและสติกเกอร์', sub: 'Receipt Issuance', color: '#ff2d55',
    flows: [
      { from: 7, to: 4, label: 'อนุมัติ Approval' },
      { from: 4, to: 7, label: 'ออกใบเสร็จ + QR' },
      { from: 7, to: 0, label: 'จัดส่งใบเสร็จ + Sticker' },
    ],
  },
  {
    n: '06', title: 'เก็บขยะ (GPS + Photo)', sub: 'Garbage Collection', color: '#ff6b35',
    flows: [
      { from: 5, to: 4, label: 'Check-in GPS + รูป' },
      { from: 4, to: 3, label: 'Notification' },
      { from: 3, to: 0, label: 'แจ้งเตือน: รถขยะมาแล้ว' },
      { from: 0, to: 3, label: 'ยืนยัน / รายงานปัญหา' },
    ],
  },
  {
    n: '07', title: 'Real-time Monitoring', sub: 'AI Anomaly Detection', color: '#32ade6',
    flows: [
      { from: 4, to: 4, label: 'AI ตรวจสอบทุกชั่วโมง', self: true },
      { from: 4, to: 7, label: 'Alert + Dashboard' },
    ],
  },
  {
    n: '08', title: 'Monthly Audit & Disclosure', sub: 'Transparency Report', color: '#30d158',
    flows: [
      { from: 7, to: 4, label: 'สั่ง Monthly Audit' },
      { from: 4, to: 1, label: 'Audit Report' },
      { from: 1, to: 0, label: 'เปิดเผยต่อสาธารณะ' },
    ],
  },
];

function WorkflowDiagram() {
  const W = 1260;
  const N = DIAGRAM_ACTORS.length;
  const COL_W = W / N;
  const CENTERS = Array.from({ length: N }, (_, i) => COL_W * i + COL_W / 2);
  const HEADER_H = 104;
  const PHASE_HDR_H = 36;
  const FLOW_ROW_H = 28;
  const FLOW_PAD = 10;

  const phaseHeights = DIAGRAM_PHASES.map(p =>
    PHASE_HDR_H + FLOW_PAD + p.flows.length * FLOW_ROW_H + FLOW_PAD
  );

  const phaseStartY = [];
  let cumY = HEADER_H;
  phaseHeights.forEach(h => { phaseStartY.push(cumY); cumY += h; });
  const TOTAL_H = cumY + 2;

  function drawFlow(fromIdx, toIdx, fy, color, label, isSelf) {
    const fromX = CENTERS[fromIdx];
    const toX = CENTERS[toIdx];

    if (isSelf) {
      const arcW = 20;
      return (
        <g>
          <path
            d={`M ${fromX - arcW},${fy} A ${arcW},16 0 0,0 ${fromX + arcW},${fy}`}
            stroke={color} strokeWidth={1.5} fill="none"
          />
          <polygon
            points={`${fromX + arcW},${fy} ${fromX + arcW - 6},${fy - 6} ${fromX + arcW + 6},${fy - 6}`}
            fill={color}
          />
          <rect x={fromX + arcW + 6} y={fy - 11} width={label.length * 6 + 8} height={14} rx={3}
            fill="white" opacity={0.92} />
          <text x={fromX + arcW + 10} y={fy + 1} fill={color} fontSize={8.5} fontWeight="600"
            style={{ fontFamily: 'Inter, sans-serif' }}>{label}</text>
        </g>
      );
    }

    const goRight = toX > fromX;
    const lineEndX = goRight ? toX - 9 : toX + 9;
    const arrowPts = goRight
      ? `${toX},${fy} ${toX - 9},${fy - 4} ${toX - 9},${fy + 4}`
      : `${toX},${fy} ${toX + 9},${fy - 4} ${toX + 9},${fy + 4}`;
    const midX = (fromX + toX) / 2;
    const span = Math.abs(toX - fromX);
    const lblW = Math.min(label.length * 6.2 + 10, span * 0.72, 160);

    return (
      <g>
        <line x1={fromX} y1={fy} x2={lineEndX} y2={fy} stroke={color} strokeWidth={1.5} />
        <polygon points={arrowPts} fill={color} />
        <rect x={midX - lblW / 2} y={fy - 10} width={lblW} height={14} rx={3}
          fill="white" opacity={0.92} />
        <text x={midX} y={fy + 1.5} textAnchor="middle" fill={color} fontSize={8} fontWeight="600"
          style={{ fontFamily: 'Inter, sans-serif' }}>{label}</text>
      </g>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <svg
        viewBox={`0 0 ${W} ${TOTAL_H}`}
        style={{ minWidth: 800, width: '100%', display: 'block' }}
        aria-label="Swimlane workflow diagram"
      >
        {/* Actor header background */}
        <rect x={0} y={0} width={W} height={HEADER_H} fill="white" />
        <line x1={0} y1={HEADER_H} x2={W} y2={HEADER_H} stroke="#e5e5e7" strokeWidth={1} />

        {/* Actor columns */}
        {DIAGRAM_ACTORS.map((actor, i) => {
          const cx = CENTERS[i];
          return (
            <g key={i}>
              {i > 0 && (
                <line x1={cx - COL_W / 2} y1={0} x2={cx - COL_W / 2} y2={HEADER_H}
                  stroke="#f0f0f0" strokeWidth={1} />
              )}
              <circle cx={cx} cy={38} r={26} fill="#1d1d1f" />
              <text x={cx} y={38} textAnchor="middle" fontSize={18}
                style={{ dominantBaseline: 'middle' }}>{actor.emoji}</text>
              <text x={cx} y={73} textAnchor="middle" fill="#1d1d1f" fontSize={10} fontWeight="700"
                style={{ fontFamily: 'Inter, sans-serif' }}>{actor.label}</text>
              <text x={cx} y={88} textAnchor="middle" fill="#6e6e73" fontSize={8.5}
                style={{ fontFamily: 'Inter, sans-serif' }}>{actor.sub}</text>
            </g>
          );
        })}

        {/* Vertical lane dashes through all phases */}
        {CENTERS.map((cx, i) => (
          <line key={i} x1={cx} y1={HEADER_H} x2={cx} y2={TOTAL_H}
            stroke="#e0e0e0" strokeWidth={1} strokeDasharray="4,4" />
        ))}

        {/* Phase rows */}
        {DIAGRAM_PHASES.map((phase, pi) => {
          const startY = phaseStartY[pi];
          const h = phaseHeights[pi];
          const flowBaseY = startY + PHASE_HDR_H + FLOW_PAD + FLOW_ROW_H / 2;

          return (
            <g key={pi}>
              <rect x={0} y={startY} width={W} height={h}
                fill={pi % 2 === 0 ? '#fafafa' : '#ffffff'} />
              {/* Phase header tint */}
              <rect x={0} y={startY} width={W} height={PHASE_HDR_H}
                fill={phase.color} opacity={0.08} />
              <line x1={0} y1={startY} x2={W} y2={startY} stroke="#e5e5e7" strokeWidth={1} />
              {/* Phase badge */}
              <rect x={12} y={startY + 9} width={32} height={18} rx={4} fill={phase.color} />
              <text x={28} y={startY + 22} textAnchor="middle" fill="white" fontSize={9.5} fontWeight="700"
                style={{ fontFamily: 'Inter, sans-serif' }}>P{phase.n}</text>
              {/* Phase title */}
              <text x={52} y={startY + 20} fill={phase.color} fontSize={12} fontWeight="700"
                style={{ fontFamily: 'Inter, sans-serif' }}>{phase.title}</text>
              <text x={52} y={startY + 32} fill="#6e6e73" fontSize={8.5}
                style={{ fontFamily: 'Inter, sans-serif' }}>{phase.sub}</text>
              {/* Flows */}
              {phase.flows.map((flow, fi) => {
                const fy = flowBaseY + fi * FLOW_ROW_H;
                return (
                  <g key={fi}>
                    <circle cx={CENTERS[flow.from]} cy={fy} r={3.5} fill={phase.color} />
                    {drawFlow(flow.from, flow.to, fy, phase.color, flow.label, flow.self)}
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Bottom border */}
        <line x1={0} y1={TOTAL_H - 1} x2={W} y2={TOTAL_H - 1} stroke="#e5e5e7" strokeWidth={1} />
      </svg>
    </div>
  );
}

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
            <button onClick={() => document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#0071e3] text-white text-[17px] px-6 py-2 rounded-lg border-none cursor-pointer hover:bg-[#0077ed] transition-colors">
              ดูขั้นตอนการทำงาน
            </button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-[#2997ff] border border-[#2997ff] text-[17px] px-6 py-2 rounded-full bg-transparent cursor-pointer hover:underline">
              ขอรับคำปรึกษา ›
            </button>
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

      {/* Swimlane Workflow Diagram */}
      <Section id="diagram">
        <div className="max-w-[980px] mx-auto">
          <SectionHeader
            eyebrow="Swimlane Workflow Diagram"
            title="ผังกระบวนการทำงาน"
            body="การทำงานร่วมกันของทุกฝ่ายในระบบ ตั้งแต่เทศบาลออกบิลจนถึงการเปิดเผยรายงานสาธารณะ"
          />
        </div>
        <div className="max-w-[1200px] mx-auto">
          <WorkflowDiagram />
        </div>
      </Section>

      {/* Security Features */}
      <Section>
        <div className="max-w-[980px] mx-auto">
          <SectionHeader eyebrow="ความปลอดภัย" title="เกราะ 3 ชั้นป้องกัน ที่ครอบคลุม" body="ระบบออกแบบให้ป้องกันทั้งมิจฉาชีพภายนอกและการทุจริตภายในอย่างครอบคลุม" />
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

      {/* UI Showcase */}
      <Section id="ui-showcase">
        <div className="max-w-[980px] mx-auto">
          <SectionHeader
            eyebrow="หน้าจอระบบจริง"
            title="UI ครบวงจร Web & Mobile"
            body="ออกแบบมาเพื่อเทศบาลและ อบต. โดยเฉพาะ ใช้งานง่าย รองรับทุก Platform"
          />

          {/* Featured: Main Dashboard */}
          <div className="mb-6 rounded-2xl overflow-hidden border border-black/8 shadow-[rgba(0,0,0,0.15)_0px_8px_32px]">
            <div className="bg-[#f0f0f0] px-4 py-2.5 flex items-center gap-2 border-b border-black/8">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="text-black/40 text-[11px] ml-2 font-medium">แผงควบคุมผู้ดูแลระบบ — The Digital Ledger</span>
            </div>
            <div style={{ height: 559, overflow: 'hidden', position: 'relative' }}>
              <iframe
                src="ui/main_screen.html"
                title="Main Dashboard"
                style={{ position: 'absolute', top: 0, left: 0, width: 1440, height: 860, transform: 'scale(0.65)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none' }}
              />
            </div>
          </div>

          {/* 3-col Desktop Screens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { src: 'ui/bill_listing.html', label: 'จัดการรอบบิล', desc: 'สร้างและติดตามบิลทุกประเภท' },
              { src: 'ui/Daily_Bank_Reconclliation.html', label: 'กระทบยอดธนาคาร', desc: 'Daily Auto-Reconciliation' },
              { src: 'ui/phase_6_web.html', label: 'รายงานปฏิบัติงาน', desc: 'ติดตามรถเก็บขยะ GPS' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-black/8 shadow-sm">
                <div className="bg-[#f5f5f5] px-3 py-1.5 flex items-center gap-1.5 border-b border-black/8">
                  <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                  <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                  <span className="text-black/35 text-[10px] ml-1">{s.label}</span>
                </div>
                <div style={{ height: 258, overflow: 'hidden', position: 'relative' }}>
                  <iframe
                    src={s.src}
                    title={s.label}
                    style={{ position: 'absolute', top: 0, left: 0, width: 1024, height: 860, transform: 'scale(0.30)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none' }}
                  />
                </div>
                <div className="bg-[#fafafa] px-3 py-2 border-t border-black/6">
                  <p className="text-[11px] text-black/45 leading-tight">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 4-col Mobile Phones */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 justify-items-center">
            {[
              { src: 'ui/billing.html', label: 'ชำระค่าธรรมเนียม' },
              { src: 'ui/collection_notification.html', label: 'แจ้งเตือนประชาชน' },
              { src: 'ui/line_mini_app_notification_fee.html', label: 'LINE Mini App' },
              { src: 'ui/phase_6_mobile.html', label: 'รถเก็บขยะ (GPS)' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="rounded-[22px] overflow-hidden border-[3px] border-[#1d1d1f] shadow-[rgba(0,0,0,0.3)_0px_10px_24px]"
                  style={{ width: 214, height: 463 }}>
                  <div style={{ height: 463, overflow: 'hidden', position: 'relative' }}>
                    <iframe
                      src={s.src}
                      title={s.label}
                      style={{ position: 'absolute', top: 0, left: 0, width: 390, height: 844, transform: 'scale(0.549)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none' }}
                    />
                  </div>
                </div>
                <p className="text-[12px] text-black/50 mt-3 text-center font-medium">{s.label}</p>
              </div>
            ))}
          </div>

          {/* 2-col Registration Screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { src: 'ui/House_registration.html', label: 'ทะเบียนบ้านและประชาชน', desc: 'บันทึกและจัดการข้อมูลผู้เสียค่าธรรมเนียม' },
              { src: 'ui/Officer_registration.html', label: 'จัดการเจ้าหน้าที่', desc: 'ลงทะเบียนและกำหนดสิทธิ์เจ้าหน้าที่' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-black/8 shadow-sm">
                <div className="bg-[#f5f5f5] px-3 py-1.5 flex items-center gap-1.5 border-b border-black/8">
                  <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                  <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                  <span className="text-black/35 text-[10px] ml-1">{s.label}</span>
                </div>
                <div style={{ height: 388, overflow: 'hidden', position: 'relative' }}>
                  <iframe
                    src={s.src}
                    title={s.label}
                    style={{ position: 'absolute', top: 0, left: 0, width: 1024, height: 860, transform: 'scale(0.451)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none' }}
                  />
                </div>
                <div className="bg-[#fafafa] px-3 py-2 border-t border-black/6">
                  <p className="text-[11px] text-black/45">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Features Summary */}
      <Section dark>
        <div className="max-w-[980px] mx-auto">
          <SectionHeader dark eyebrow="ฟีเจอร์ทั้งหมด" title="ครบทุกความต้องการของเทศบาลและ อบต." body="ระบบเดียวที่จัดการทุกขั้นตอน ตั้งแต่ทะเบียนบ้านจนถึงรายงานสาธารณะ" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🏘️', title: 'ทะเบียนบ้าน', desc: 'ฐานข้อมูลบ้านและประชาชนครบถ้วน พร้อม QR Code เฉพาะบ้าน' },
              { icon: '🧾', title: 'ออกบิลอัตโนมัติ', desc: 'สร้างบิลค่าขยะ ค่าน้ำ ค่าไฟ ตามรอบที่กำหนด' },
              { icon: '💳', title: 'Cashless Payment', desc: 'ชำระผ่าน QR Code PromptPay เท่านั้น ตรวจสอบได้ 100%' },
              { icon: '🏦', title: 'กระทบยอดธนาคาร', desc: 'Auto-Reconciliation รายวัน เทียบ Bank Statement อัตโนมัติ' },
              { icon: '🚛', title: 'ติดตาม GPS', desc: 'แผนที่รถเก็บขยะ Real-time บ้านจ่ายแล้ว vs ค้างจ่าย' },
              { icon: '💬', title: 'LINE OA แจ้งเตือน', desc: 'ส่ง e-Receipt และแจ้งเตือนผ่าน LINE OA ทันที' },
              { icon: '👮', title: 'QR ตรวจสอบเจ้าหน้าที่', desc: 'ประชาชนสแกนยืนยันตัวตนเจ้าหน้าที่ก่อนชำระเงิน' },
              { icon: '📊', title: 'รายงานสาธารณะ', desc: 'Monthly Audit และเปิดเผยรายงานต่อสาธารณชนอัตโนมัติ' },
            ].map((f, i) => (
              <div key={i} className="bg-[#272729] rounded-xl p-5">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-white font-semibold text-[15px] leading-snug mb-2">{f.title}</h3>
                <p className="text-white/55 text-[13px] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Downloads */}
      <section className="bg-[#f5f5f7] py-16 px-6">
        <div className="max-w-[980px] mx-auto">
          <p className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-3 text-center">เอกสารดาวน์โหลด</p>
          <h2 className="text-[#1d1d1f] font-semibold text-center leading-[1.1] mb-10" style={{ fontSize: 'clamp(24px,3.5vw,36px)' }}>
            ดาวน์โหลดข้อมูลผลิตภัณฑ์
          </h2>
          <div className="flex justify-center">
            <div className="bg-white rounded-xl shadow-[rgba(0,0,0,0.22)_3px_5px_30px_0px] p-6 flex flex-col gap-4 max-w-[400px] w-full">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#f5f5f7] rounded-lg flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="#0071e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14,2 14,8 20,8" stroke="#0071e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-[#1d1d1f]">ระบบบริหารจัดการค่าธรรมเนียมท้องถิ่น</p>
                  <p className="text-[13px] text-[#6e6e73]">Presentation • PDF • 1.4 MB</p>
                </div>
              </div>
              <a
                href="downloads/FeeManagement_Presentation.pdf"
                download="FeeManagement_Presentation.pdf"
                className="flex items-center justify-center gap-2 bg-[#0071e3] text-white text-[14px] font-semibold px-4 py-2 rounded-lg no-underline hover:bg-[#0077ed] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                ดาวน์โหลด PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="bg-black py-24 px-6 text-center">
        <div className="max-w-[680px] mx-auto">
          <p className="text-[14px] font-semibold tracking-[2px] uppercase text-[#0071e3] mb-3">เริ่มต้นวันนี้</p>
          <h2 className="text-white font-semibold leading-[1.1] mb-5" style={{ fontSize: 'clamp(28px,4vw,40px)' }}>
            ยกระดับความโปร่งใส<br />ในหน่วยงานของคุณ
          </h2>
          <p className="text-white/70 text-[17px] leading-[1.47] mb-10">
            รับการสาธิตระบบและประเมินราคาเบื้องต้นฟรี
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#" className="bg-[#0071e3] text-white text-[17px] px-6 py-2 rounded-lg no-underline hover:bg-[#0077ed] transition-colors">
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
