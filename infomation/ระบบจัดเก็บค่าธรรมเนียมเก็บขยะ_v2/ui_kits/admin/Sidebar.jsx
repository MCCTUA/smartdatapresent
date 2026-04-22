// Sidebar.jsx — utilitfeeapp Admin Navigation

const NAV_ITEMS = [
  { id:'dashboard', icon:'grid', label:'ภาพรวม' },
  { id:'bills',     icon:'file-text', label:'บิลค่าธรรมเนียม' },
  { id:'payments',  icon:'credit-card', label:'รับชำระเงิน' },
  { id:'households',icon:'home', label:'ทะเบียนครัวเรือน' },
  { id:'meters',    icon:'activity', label:'มิเตอร์' },
];
const NAV_BOTTOM = [
  { id:'approvals', icon:'check-square', label:'อนุมัติ' },
  { id:'issues',    icon:'alert-circle', label:'ร้องเรียน' },
  { id:'reports',   icon:'bar-chart-2', label:'รายงาน' },
  { id:'settings',  icon:'settings', label:'ตั้งค่า' },
];

const ICONS = {
  'grid': <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
  'file-text': <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
  'credit-card': <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
  'home': <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
  'activity': <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
  'check-square': <><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></>,
  'alert-circle': <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
  'bar-chart-2': <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
  'settings': <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
  'chevrons-left': <><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></>,
  'chevrons-right': <><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></>,
};

function Icon({ name, size=16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

function NavItem({ item, active, onClick, collapsed }) {
  const isActive = active === item.id;
  return (
    <button
      onClick={() => onClick(item.id)}
      title={collapsed ? item.label : undefined}
      style={{
        display:'flex', alignItems:'center', gap:10,
        padding: collapsed ? '9px 10px' : '9px 12px',
        borderRadius:8, border:'none', cursor:'pointer', width:'100%',
        background: isActive ? 'var(--org-primary-tint)' : 'transparent',
        color: isActive ? 'var(--org-primary)' : 'rgba(4,14,32,.65)',
        fontFamily:'DM Sans,sans-serif', fontSize:13.5, fontWeight: isActive ? 600 : 400,
        letterSpacing:'.04px', transition:'all 120ms', whiteSpace:'nowrap', overflow:'hidden',
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}
      onMouseEnter={e => { if(!isActive) e.currentTarget.style.background='rgba(4,14,32,.04)'; }}
      onMouseLeave={e => { if(!isActive) e.currentTarget.style.background='transparent'; }}
    >
      <span style={{ flexShrink:0, color: isActive ? 'var(--org-primary)' : 'rgba(4,14,32,.5)' }}>
        <Icon name={item.icon} size={17} />
      </span>
      {!collapsed && <span>{item.label}</span>}
      {!collapsed && isActive && <span style={{ marginLeft:'auto', width:6, height:6, borderRadius:'50%', background:'var(--org-primary)', flexShrink:0 }} />}
    </button>
  );
}

function AppSidebar({ active, onNav, collapsed, onToggle }) {
  return (
    <aside style={{
      width: collapsed ? 56 : 220,
      background:'#fff',
      borderRight:'1px solid #e0e2e6',
      display:'flex', flexDirection:'column',
      transition:'width 200ms ease',
      flexShrink:0, overflow:'hidden',
    }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? '16px 10px' : '16px 16px',
        display:'flex', alignItems:'center', gap:10,
        borderBottom:'1px solid #f0f0f2', minHeight:56,
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}>
        <div style={{
          width:30, height:30, borderRadius:8, background:'var(--org-primary)',
          display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:'#181d26', letterSpacing:'.1px', lineHeight:1.2 }}>อบต.บ้านแป้ง</div>
            <div style={{ fontSize:10.5, color:'rgba(4,14,32,.45)', letterSpacing:'.2px' }}>ระบบเก็บค่าธรรมเนียม</div>
          </div>
        )}
      </div>

      {/* Nav main */}
      <nav style={{ flex:1, padding:'8px 8px', display:'flex', flexDirection:'column', gap:2 }}>
        {NAV_ITEMS.map(item => (
          <NavItem key={item.id} item={item} active={active} onClick={onNav} collapsed={collapsed} />
        ))}
      </nav>

      {/* Divider */}
      <div style={{ height:1, background:'#f0f0f2', margin:'0 8px' }} />

      {/* Nav bottom */}
      <nav style={{ padding:'8px 8px', display:'flex', flexDirection:'column', gap:2 }}>
        {NAV_BOTTOM.map(item => (
          <NavItem key={item.id} item={item} active={active} onClick={onNav} collapsed={collapsed} />
        ))}
      </nav>

      {/* Collapse toggle */}
      <div style={{ padding:'8px', borderTop:'1px solid #f0f0f2' }}>
        <button onClick={onToggle} style={{
          display:'flex', alignItems:'center', justifyContent: collapsed ? 'center' : 'flex-end',
          width:'100%', padding:'6px', background:'none', border:'none', cursor:'pointer',
          color:'rgba(4,14,32,.4)', borderRadius:6,
        }}
        onMouseEnter={e => e.currentTarget.style.background='rgba(4,14,32,.04)'}
        onMouseLeave={e => e.currentTarget.style.background='none'}>
          <Icon name={collapsed ? 'chevrons-right' : 'chevrons-left'} size={15} />
        </button>
      </div>
    </aside>
  );
}

Object.assign(window, { AppSidebar, Icon });
