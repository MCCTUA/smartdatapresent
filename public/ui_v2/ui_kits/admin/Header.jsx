// Header.jsx — Top bar for utilitfeeapp Admin

function AppHeader({ screen }) {
  const titles = {
    dashboard:'ภาพรวม', bills:'บิลค่าธรรมเนียม', payments:'รับชำระเงิน',
    households:'ทะเบียนครัวเรือน', meters:'มิเตอร์', approvals:'อนุมัติ',
    issues:'ร้องเรียน / ติดตาม', reports:'รายงาน', settings:'ตั้งค่าองค์กร',
  };

  return (
    <header style={{
      height:52, background:'#fff', borderBottom:'1px solid #e0e2e6',
      display:'flex', alignItems:'center', padding:'0 20px',
      gap:12, flexShrink:0,
    }}>
      <div style={{ flex:1 }}>
        <span style={{ fontSize:15, fontWeight:600, color:'#181d26', letterSpacing:'.05px' }}>
          {titles[screen] || screen}
        </span>
      </div>

      {/* Search */}
      <div style={{ position:'relative' }}>
        <input
          placeholder="ค้นหาครัวเรือน, บิล..."
          style={{
            fontFamily:'DM Sans,sans-serif', fontSize:13, color:'#181d26',
            background:'#f8fafc', border:'1px solid #e0e2e6', borderRadius:8,
            padding:'6px 12px 6px 32px', width:220, outline:'none',
            letterSpacing:'.05px',
          }}
          onFocus={e => { e.target.style.borderColor='#1b61c9'; e.target.style.boxShadow='0 0 0 3px rgba(27,97,201,0.12)'; e.target.style.background='#fff'; }}
          onBlur={e => { e.target.style.borderColor='#e0e2e6'; e.target.style.boxShadow='none'; e.target.style.background='#f8fafc'; }}
        />
        <svg style={{ position:'absolute', left:9, top:'50%', transform:'translateY(-50%)', color:'rgba(4,14,32,.35)', pointerEvents:'none' }}
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </div>

      {/* Notification bell */}
      <button style={{ background:'none', border:'1px solid #e0e2e6', borderRadius:8, padding:'6px', cursor:'pointer', display:'flex', alignItems:'center', position:'relative' }}
        onMouseEnter={e => e.currentTarget.style.background='#f8fafc'}
        onMouseLeave={e => e.currentTarget.style.background='none'}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="1.8" strokeLinecap="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <span style={{ position:'absolute', top:5, right:5, width:7, height:7, background:'#dc2626', borderRadius:'50%', border:'1.5px solid #fff' }} />
      </button>

      {/* Avatar */}
      <div style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', padding:'4px 8px', borderRadius:8 }}
        onMouseEnter={e => e.currentTarget.style.background='#f8fafc'}
        onMouseLeave={e => e.currentTarget.style.background='none'}>
        <div style={{
          width:30, height:30, borderRadius:'50%', background:'var(--org-primary)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:12, fontWeight:700, color:'#fff', letterSpacing:'.1px',
        }}>นบ</div>
        <div>
          <div style={{ fontSize:12, fontWeight:600, color:'#181d26', lineHeight:1.2 }}>นางนิตยา บุญมี</div>
          <div style={{ fontSize:10.5, color:'rgba(4,14,32,.45)' }}>Account Officer</div>
        </div>
      </div>
    </header>
  );
}

Object.assign(window, { AppHeader });
