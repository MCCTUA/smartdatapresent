// PaymentModal.jsx — Accept payment modal

const { useState: usePSt } = React;

function PaymentModal({ bill, onClose }) {
  const [method, setMethod] = usePSt('เงินสด');
  const [amount, setAmount] = usePSt(bill ? String(bill.amount) : '');
  const [note, setNote] = usePSt('');
  const [done, setDone] = usePSt(false);

  const methods = ['เงินสด','PromptPay / QR','Counter Service','LINE Pay'];

  function handleSubmit(e) {
    e.preventDefault();
    setDone(true);
    setTimeout(() => { onClose(); setDone(false); }, 1800);
  }

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(15,25,50,0.35)', backdropFilter:'blur(3px)',
      display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000,
    }} onClick={e => { if(e.target===e.currentTarget) onClose(); }}>
      <div style={{
        background:'#fff', borderRadius:20, width:420, maxWidth:'94vw',
        boxShadow:'rgba(15,48,106,0.06) 0px 0px 40px, rgba(0,0,0,0.14) 0px 8px 32px',
        overflow:'hidden',
      }}>
        {done ? (
          <div style={{ padding:'48px 32px', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
            <div style={{ width:52, height:52, borderRadius:'50%', background:'#f0fdf4', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div style={{ fontSize:16, fontWeight:600, color:'#181d26' }}>รับชำระเงินสำเร็จ</div>
            <div style={{ fontSize:13, color:'rgba(4,14,32,.55)' }}>ออกใบเสร็จให้ลูกค้าเรียบร้อย</div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ padding:'18px 22px 14px', borderBottom:'1px solid #f0f0f2', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div>
                <div style={{ fontSize:15, fontWeight:600, color:'#181d26' }}>รับชำระเงิน</div>
                <div style={{ fontSize:12, color:'rgba(4,14,32,.5)', marginTop:2 }}>{bill?.name} · {bill?.type}</div>
              </div>
              <button onClick={onClose} style={{ background:'none', border:'1px solid #e0e2e6', borderRadius:8, padding:'5px', cursor:'pointer', display:'flex', color:'rgba(4,14,32,.5)', lineHeight:0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit}>
              <div style={{ padding:'18px 22px', display:'flex', flexDirection:'column', gap:14 }}>
                {/* Bill summary */}
                <div style={{ background:'#f8fafc', borderRadius:10, padding:'12px 14px', border:'1px solid #e0e2e6' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:13 }}>
                    <span style={{ color:'rgba(4,14,32,.55)' }}>ยอดค้างชำระ</span>
                    <span style={{ fontWeight:600, color:'#dc2626', fontVariantNumeric:'tabular-nums' }}>฿{bill?.amount?.toFixed(2)}</span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginTop:4 }}>
                    <span style={{ color:'rgba(4,14,32,.45)' }}>รอบบิล</span>
                    <span style={{ color:'rgba(4,14,32,.6)' }}>{bill?.period || 'เม.ย. 2569'}</span>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:500, marginBottom:5 }}>จำนวนเงินที่รับ (บาท)</label>
                  <input
                    value={amount} onChange={e=>setAmount(e.target.value)} required
                    type="number" min="1" step="0.01"
                    style={{ fontFamily:'DM Sans,sans-serif', fontSize:18, fontWeight:500, color:'#181d26', background:'#fff', border:'1.5px solid #1b61c9', borderRadius:8, padding:'9px 12px', width:'100%', outline:'none', boxShadow:'0 0 0 3px rgba(27,97,201,0.1)', fontVariantNumeric:'tabular-nums' }}
                  />
                </div>

                {/* Method */}
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:500, marginBottom:6 }}>ช่องทางชำระ</label>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    {methods.map(m => (
                      <button type="button" key={m} onClick={()=>setMethod(m)} style={{
                        border: method===m ? '1.5px solid var(--org-primary)' : '1px solid #e0e2e6',
                        background: method===m ? 'var(--org-primary-tint)' : '#fff',
                        color: method===m ? 'var(--org-primary)' : '#181d26',
                        borderRadius:8, padding:'6px 12px', fontSize:12.5, fontWeight: method===m ? 600 : 400,
                        cursor:'pointer', fontFamily:'DM Sans,sans-serif',
                      }}>{m}</button>
                    ))}
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:500, marginBottom:5 }}>หมายเหตุ</label>
                  <textarea value={note} onChange={e=>setNote(e.target.value)} rows={2} placeholder="หมายเหตุ (ถ้ามี)" style={{ fontFamily:'DM Sans,sans-serif', fontSize:13, color:'#181d26', background:'#fff', border:'1px solid #e0e2e6', borderRadius:8, padding:'8px 12px', width:'100%', outline:'none', resize:'none', letterSpacing:'.05px' }}
                    onFocus={e=>{ e.target.style.borderColor='#1b61c9'; e.target.style.boxShadow='0 0 0 3px rgba(27,97,201,0.1)'; }}
                    onBlur={e=>{ e.target.style.borderColor='#e0e2e6'; e.target.style.boxShadow='none'; }} />
                </div>
              </div>

              {/* Footer */}
              <div style={{ padding:'14px 22px', borderTop:'1px solid #f0f0f2', display:'flex', gap:8, justifyContent:'flex-end' }}>
                <button type="button" onClick={onClose} style={{ background:'#fff', color:'#181d26', border:'1px solid #e0e2e6', borderRadius:10, padding:'9px 18px', fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'DM Sans,sans-serif' }}>
                  ยกเลิก
                </button>
                <button type="submit" style={{ background:'var(--org-primary)', color:'#fff', border:'none', borderRadius:10, padding:'9px 20px', fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'DM Sans,sans-serif' }}>
                  ยืนยันรับชำระ · ฿{parseFloat(amount||0).toFixed(2)}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { PaymentModal });
