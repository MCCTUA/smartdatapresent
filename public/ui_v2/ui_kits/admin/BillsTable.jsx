// BillsTable.jsx — Bills management screen

const BILLS_DATA = [
  { id:'BL-2569-1240', name:'สมชาย จันทร์ดี', addr:'45/2 ม.3 ต.บ้านแป้ง', type:'ค่าขยะ', period:'เม.ย. 2569', amount:60, status:'paid' },
  { id:'BL-2569-1239', name:'สุภาพร มีสุข', addr:'12 ม.1 ต.บ้านแป้ง', type:'ค่าน้ำ', period:'เม.ย. 2569', amount:240, status:'overdue' },
  { id:'BL-2569-1238', name:'วิชัย ทองดี', addr:'78/1 ม.2 ต.บ้านแป้ง', type:'ค่าขยะ', period:'มี.ค. 2569', amount:30, status:'partial_paid' },
  { id:'BL-2569-1237', name:'นภา วงษ์ทอง', addr:'33 ม.4 ต.บ้านแป้ง', type:'ค่าน้ำ', period:'เม.ย. 2569', amount:180, status:'issued' },
  { id:'BL-2569-1236', name:'ประยุทธ์ สุขใจ', addr:'55 ม.1 ต.บ้านแป้ง', type:'ค่าขยะ', period:'เม.ย. 2569', amount:60, status:'paid' },
  { id:'BL-2569-1235', name:'อรุณี พรมดี', addr:'7 ม.5 ต.บ้านแป้ง', type:'ค่าน้ำ', period:'เม.ย. 2569', amount:360, status:'overdue' },
  { id:'BL-2569-1234', name:'มานะ สว่างใจ', addr:'19/2 ม.2 ต.บ้านแป้ง', type:'ค่าขยะ', period:'เม.ย. 2569', amount:60, status:'issued' },
  { id:'BL-2569-1233', name:'ลำใย หวังดี', addr:'62 ม.3 ต.บ้านแป้ง', type:'ค่าน้ำ', period:'มี.ค. 2569', amount:120, status:'paid' },
];

const { useState: uSt } = React;

function BillsTable({ onPayBill }) {
  const [filter, setFilter] = uSt('all');
  const [search, setSearch] = uSt('');

  const filtered = BILLS_DATA.filter(b => {
    if (filter !== 'all' && b.status !== filter) return false;
    if (search && !b.name.includes(search) && !b.addr.includes(search) && !b.id.includes(search)) return false;
    return true;
  });

  const tabs = [
    { id:'all', label:'ทั้งหมด', count: BILLS_DATA.length },
    { id:'issued', label:'ออกบิลแล้ว', count: BILLS_DATA.filter(b=>b.status==='issued').length },
    { id:'overdue', label:'ค้างชำระ', count: BILLS_DATA.filter(b=>b.status==='overdue').length },
    { id:'partial_paid', label:'ชำระบางส่วน', count: BILLS_DATA.filter(b=>b.status==='partial_paid').length },
    { id:'paid', label:'ชำระแล้ว', count: BILLS_DATA.filter(b=>b.status==='paid').length },
  ];

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <div>
          <h1 style={{ fontSize:20, fontWeight:600 }}>บิลค่าธรรมเนียม</h1>
          <p style={{ fontSize:13, color:'rgba(4,14,32,.5)', marginTop:2 }}>จัดการบิลและติดตามการชำระเงิน</p>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button style={{ background:'#fff', color:'#181d26', border:'1px solid #e0e2e6', borderRadius:10, padding:'8px 16px', fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'DM Sans,sans-serif', display:'flex', alignItems:'center', gap:6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            ส่งออก
          </button>
          <button style={{ background:'var(--org-primary)', color:'#fff', border:'none', borderRadius:10, padding:'8px 16px', fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'DM Sans,sans-serif', display:'flex', alignItems:'center', gap:6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            ออกบิลใหม่
          </button>
        </div>
      </div>

      <div style={{ background:'#fff', border:'1px solid #e0e2e6', borderRadius:14, overflow:'hidden', boxShadow:'0px 1px 3px rgba(0,0,0,0.06)' }}>
        {/* Toolbar */}
        <div style={{ padding:'12px 16px', borderBottom:'1px solid #f0f0f2', display:'flex', alignItems:'center', gap:12 }}>
          {/* Tabs */}
          <div style={{ display:'flex', gap:2, flex:1 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setFilter(t.id)} style={{
                background: filter===t.id ? 'var(--org-primary-tint)' : 'none',
                color: filter===t.id ? 'var(--org-primary)' : 'rgba(4,14,32,.55)',
                border:'none', borderRadius:7, padding:'5px 10px', fontSize:12.5, fontWeight: filter===t.id ? 600 : 400,
                cursor:'pointer', fontFamily:'DM Sans,sans-serif', display:'flex', alignItems:'center', gap:5,
              }}>
                {t.label}
                <span style={{ background: filter===t.id ? 'var(--org-primary)' : '#e0e2e6', color: filter===t.id ? '#fff' : '#6b7280', borderRadius:9999, padding:'0px 5px', fontSize:10, fontWeight:600 }}>{t.count}</span>
              </button>
            ))}
          </div>
          {/* Search */}
          <div style={{ position:'relative' }}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ค้นหา..." style={{ fontFamily:'DM Sans,sans-serif', fontSize:12.5, background:'#f8fafc', border:'1px solid #e0e2e6', borderRadius:7, padding:'5px 10px 5px 28px', width:180, outline:'none', color:'#181d26' }}
              onFocus={e=>{ e.target.style.borderColor='#1b61c9'; e.target.style.background='#fff'; }}
              onBlur={e=>{ e.target.style.borderColor='#e0e2e6'; e.target.style.background='#f8fafc'; }} />
            <svg style={{ position:'absolute', left:8, top:'50%', transform:'translateY(-50%)', color:'rgba(4,14,32,.35)', pointerEvents:'none' }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
        </div>

        {/* Table */}
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
          <thead>
            <tr>
              {['เลขที่บิล','ครัวเรือน','ประเภท','รอบบิล','ยอดเงิน','สถานะ',''].map(h => (
                <th key={h} style={{ background:'#f8fafc', padding:'8px 14px', textAlign:'left', fontSize:11, fontWeight:600, color:'rgba(4,14,32,.45)', letterSpacing:'.35px', textTransform:'uppercase', borderBottom:'1px solid #e0e2e6', whiteSpace:'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id} style={{ borderBottom:'1px solid #f5f5f7' }}
                onMouseEnter={e=>e.currentTarget.style.background='#f5f8ff'}
                onMouseLeave={e=>e.currentTarget.style.background=''}>
                <td style={{ padding:'10px 14px' }}><span style={{ fontFamily:'monospace', fontSize:11.5, color:'rgba(4,14,32,.55)' }}>{b.id}</span></td>
                <td style={{ padding:'10px 14px' }}>
                  <div style={{ fontWeight:500 }}>{b.name}</div>
                  <div style={{ fontSize:11, color:'rgba(4,14,32,.45)', marginTop:1 }}>{b.addr}</div>
                </td>
                <td style={{ padding:'10px 14px', color:'rgba(4,14,32,.65)' }}>{b.type}</td>
                <td style={{ padding:'10px 14px', color:'rgba(4,14,32,.55)' }}>{b.period}</td>
                <td style={{ padding:'10px 14px', fontWeight:500, fontVariantNumeric:'tabular-nums' }}>฿{b.amount.toFixed(2)}</td>
                <td style={{ padding:'10px 14px' }}><StatusBadge status={b.status} /></td>
                <td style={{ padding:'10px 14px' }}>
                  <div style={{ display:'flex', gap:4 }}>
                    {(b.status==='issued'||b.status==='overdue'||b.status==='partial_paid') && (
                      <button onClick={()=>onPayBill(b)} style={{ background:'var(--org-primary)', color:'#fff', border:'none', borderRadius:6, padding:'4px 10px', fontSize:11.5, fontWeight:500, cursor:'pointer', fontFamily:'DM Sans,sans-serif' }}>รับชำระ</button>
                    )}
                    {b.status==='paid' && (
                      <button style={{ background:'none', border:'1px solid #e0e2e6', borderRadius:6, padding:'4px 10px', fontSize:11.5, color:'rgba(4,14,32,.6)', cursor:'pointer', fontFamily:'DM Sans,sans-serif' }}>ใบเสร็จ</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ padding:'32px', textAlign:'center', color:'rgba(4,14,32,.35)', fontSize:13 }}>ไม่พบรายการ</td></tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ padding:'10px 16px', borderTop:'1px solid #f0f0f2', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontSize:12, color:'rgba(4,14,32,.45)' }}>แสดง {filtered.length} จาก {BILLS_DATA.length} รายการ</span>
          <div style={{ display:'flex', gap:4 }}>
            {['←','1','2','3','→'].map(p => (
              <button key={p} style={{ background: p==='1'?'var(--org-primary)':'none', color:p==='1'?'#fff':'rgba(4,14,32,.55)', border:'1px solid', borderColor:p==='1'?'var(--org-primary)':'#e0e2e6', borderRadius:6, padding:'3px 9px', fontSize:12, cursor:'pointer', fontFamily:'DM Sans,sans-serif' }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BillsTable });
