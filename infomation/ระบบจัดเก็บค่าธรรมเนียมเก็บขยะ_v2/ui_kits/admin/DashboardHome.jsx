// DashboardHome.jsx — Overview screen

const STAT_CARDS = [
  { label:'รายรับเดือนนี้', value:'฿48,320', sub:'จาก 402 ครัวเรือน', trend:'+12%', trendUp:true, color:'#006400', bg:'#f0fdf4' },
  { label:'บิลที่ออกแล้ว', value:'486', sub:'เดือน เม.ย. 2569', trend:'+8%', trendUp:true, color:'#1b61c9', bg:'#eff6ff' },
  { label:'ค้างชำระ', value:'฿12,180', sub:'38 ครัวเรือน', trend:'+3 ราย', trendUp:false, color:'#b91c1c', bg:'#fef2f2' },
  { label:'รอการอนุมัติ', value:'5', sub:'คำขอรอดำเนินการ', trend:'', trendUp:null, color:'#b45309', bg:'#fffbeb' },
];

const RECENT_BILLS = [
  { id:'BL-2569-1240', name:'สมชาย จันทร์ดี', addr:'45/2 ม.3', type:'ค่าขยะ', amount:60, status:'paid' },
  { id:'BL-2569-1239', name:'สุภาพร มีสุข', addr:'12 ม.1', type:'ค่าน้ำ', amount:240, status:'overdue' },
  { id:'BL-2569-1238', name:'วิชัย ทองดี', addr:'78/1 ม.2', type:'ค่าขยะ', amount:30, status:'partial_paid' },
  { id:'BL-2569-1237', name:'นภา วงษ์ทอง', addr:'33 ม.4', type:'ค่าน้ำ', amount:180, status:'issued' },
  { id:'BL-2569-1236', name:'ประยุทธ์ สุขใจ', addr:'55 ม.1', type:'ค่าขยะ', amount:60, status:'paid' },
];

const STATUS_CONFIG = {
  paid:         { label:'ชำระแล้ว',     bg:'#f0fdf4', color:'#006400' },
  issued:       { label:'ออกบิลแล้ว',  bg:'#eff6ff', color:'#1b61c9' },
  partial_paid: { label:'ชำระบางส่วน', bg:'#fffbeb', color:'#b45309' },
  overdue:      { label:'ค้างชำระ',    bg:'#fef2f2', color:'#b91c1c' },
  draft:        { label:'Draft',        bg:'#f3f4f6', color:'#6b7280' },
};

function StatusBadge({ status }) {
  const c = STATUS_CONFIG[status] || STATUS_CONFIG.draft;
  return (
    <span style={{ background:c.bg, color:c.color, borderRadius:4, padding:'2px 8px', fontSize:11, fontWeight:500, whiteSpace:'nowrap' }}>
      {c.label}
    </span>
  );
}

function StatCard({ card }) {
  return (
    <div style={{
      background:'#fff', border:'1px solid #e0e2e6', borderRadius:14,
      padding:'16px 18px', boxShadow:'0px 1px 3px rgba(0,0,0,0.06)',
      display:'flex', flexDirection:'column', gap:6,
    }}>
      <div style={{ fontSize:11, fontWeight:600, color:'rgba(4,14,32,.45)', letterSpacing:'.4px', textTransform:'uppercase' }}>{card.label}</div>
      <div style={{ fontSize:26, fontWeight:400, color:'#181d26', lineHeight:1.1, fontVariantNumeric:'tabular-nums' }}>{card.value}</div>
      <div style={{ fontSize:12, color:'rgba(4,14,32,.5)' }}>{card.sub}</div>
      {card.trend && (
        <div style={{ display:'inline-flex', alignItems:'center', gap:3, background:card.bg, color:card.color, borderRadius:4, padding:'2px 7px', fontSize:11, fontWeight:500, alignSelf:'flex-start', marginTop:2 }}>
          {card.trendUp ? '▲' : '▼'} {card.trend}
        </div>
      )}
    </div>
  );
}

function DashboardHome({ onNav, onPayBill }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      {/* Stat cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
        {STAT_CARDS.map(c => <StatCard key={c.label} card={c} />)}
      </div>

      {/* Recent bills + Quick actions */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:16 }}>
        {/* Bills table */}
        <div style={{ background:'#fff', border:'1px solid #e0e2e6', borderRadius:14, overflow:'hidden', boxShadow:'0px 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ padding:'14px 18px', borderBottom:'1px solid #f0f0f2', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:14, fontWeight:600 }}>บิลล่าสุด</span>
            <button onClick={() => onNav('bills')} style={{ background:'none', border:'none', color:'var(--org-primary)', fontSize:12, fontWeight:500, cursor:'pointer', fontFamily:'DM Sans,sans-serif', padding:'4px 8px', borderRadius:6 }}
              onMouseEnter={e => e.currentTarget.style.background='var(--org-primary-tint)'}
              onMouseLeave={e => e.currentTarget.style.background='none'}>
              ดูทั้งหมด →
            </button>
          </div>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
            <thead>
              <tr>
                {['ครัวเรือน','ประเภท','ยอดเงิน','สถานะ',''].map(h => (
                  <th key={h} style={{ background:'#f8fafc', padding:'7px 14px', textAlign:'left', fontSize:11, fontWeight:600, color:'rgba(4,14,32,.45)', letterSpacing:'.35px', textTransform:'uppercase', borderBottom:'1px solid #e0e2e6' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_BILLS.map(b => (
                <tr key={b.id} style={{ borderBottom:'1px solid #f5f5f7' }}
                  onMouseEnter={e => e.currentTarget.style.background='#f5f8ff'}
                  onMouseLeave={e => e.currentTarget.style.background=''}>
                  <td style={{ padding:'10px 14px' }}>
                    <div style={{ fontWeight:500, color:'#181d26' }}>{b.name}</div>
                    <div style={{ fontSize:11, color:'rgba(4,14,32,.45)', marginTop:1 }}>{b.addr}</div>
                  </td>
                  <td style={{ padding:'10px 14px', color:'rgba(4,14,32,.65)' }}>{b.type}</td>
                  <td style={{ padding:'10px 14px', fontWeight:500, fontVariantNumeric:'tabular-nums' }}>฿{b.amount}</td>
                  <td style={{ padding:'10px 14px' }}><StatusBadge status={b.status} /></td>
                  <td style={{ padding:'10px 14px' }}>
                    {(b.status === 'issued' || b.status === 'overdue' || b.status === 'partial_paid') && (
                      <button onClick={() => onPayBill(b)} style={{ background:'none', border:'1px solid var(--org-primary)', borderRadius:6, padding:'3px 9px', fontSize:11, color:'var(--org-primary)', cursor:'pointer', fontFamily:'DM Sans,sans-serif', fontWeight:500 }}>
                        รับชำระ
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick actions */}
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <div style={{ background:'#fff', border:'1px solid #e0e2e6', borderRadius:14, padding:'16px', boxShadow:'0px 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize:13, fontWeight:600, marginBottom:12, color:'#181d26' }}>ดำเนินการด่วน</div>
            {[
              { label:'ออกบิลใหม่', icon:'file-text', action:() => onNav('bills') },
              { label:'รับชำระเงิน', icon:'credit-card', action:() => onNav('payments') },
              { label:'เพิ่มครัวเรือน', icon:'home', action:() => onNav('households') },
              { label:'บันทึกมิเตอร์', icon:'activity', action:() => onNav('meters') },
            ].map(a => (
              <button key={a.label} onClick={a.action} style={{
                display:'flex', alignItems:'center', gap:10, width:'100%',
                padding:'9px 10px', background:'none', border:'none',
                borderRadius:8, cursor:'pointer', fontFamily:'DM Sans,sans-serif',
                fontSize:13, color:'#181d26', letterSpacing:'.04px', marginBottom:2,
              }}
              onMouseEnter={e => e.currentTarget.style.background='#f5f8ff'}
              onMouseLeave={e => e.currentTarget.style.background='none'}>
                <span style={{ width:28, height:28, borderRadius:7, background:'var(--org-primary-tint)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--org-primary)', flexShrink:0 }}>
                  <Icon name={a.icon} size={14} />
                </span>
                {a.label}
              </button>
            ))}
          </div>

          {/* Pending approvals */}
          <div style={{ background:'#fffbeb', border:'1px solid #fde68a', borderRadius:14, padding:'14px 16px' }}>
            <div style={{ fontSize:12, fontWeight:600, color:'#b45309', marginBottom:6 }}>รอการอนุมัติ</div>
            <div style={{ fontSize:22, fontWeight:400, color:'#181d26' }}>5 คำขอ</div>
            <button onClick={() => onNav('approvals')} style={{ marginTop:10, background:'#f59e0b', color:'#fff', border:'none', borderRadius:8, padding:'7px 14px', fontSize:12, fontWeight:500, cursor:'pointer', fontFamily:'DM Sans,sans-serif' }}>
              ดูคำขอ →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DashboardHome, StatusBadge, STATUS_CONFIG });
