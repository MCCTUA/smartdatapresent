import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getAuthFlag, setAuthFlag, verifyPassword } from '../utils/auth';

// Client-side soft lock for casual viewers. The expected password hash ships
// in the bundle — anyone inspecting JS can extract it. DO NOT rely on this for
// truly sensitive data; use a server-side gate for real access control.
export default function PasswordGate({ pageId, title, passwordHash, children }) {
  const [authed, setAuthed] = useState(() => getAuthFlag(pageId));
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setAuthed(getAuthFlag(pageId));
  }, [pageId]);

  useEffect(() => {
    if (authed) return;
    inputRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') navigate('/');
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [authed, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const ok = await verifyPassword(value, passwordHash);
      if (ok) {
        setAuthFlag(pageId);
        setAuthed(true);
      } else {
        setError('รหัสผ่านไม่ถูกต้อง · กรุณาลองอีกครั้ง');
        setValue('');
        inputRef.current?.focus();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div aria-hidden={!authed} style={!authed ? { filter: 'blur(8px)', pointerEvents: 'none', userSelect: 'none' } : undefined}>
        {children}
      </div>
      <AnimatePresence>
        {!authed && (
          <motion.div
            key="pg-backdrop"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pg-title"
          >
            <motion.div
              className="bg-[#1d1d1f] text-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => navigate('/')}
                aria-label="ปิด"
                className="absolute top-3 right-3 w-9 h-9 inline-flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="flex flex-col items-center text-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mb-4">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <h2 id="pg-title" className="font-bold text-[24px] leading-tight tracking-[-0.28px]">
                  หน้านี้ต้องการรหัสผ่าน
                </h2>
                <p className="mt-2 text-[14px] text-gray-400">{title}</p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                <input
                  ref={inputRef}
                  type="password"
                  autoComplete="current-password"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="กรอกรหัสผ่าน"
                  className="bg-[#272729] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent"
                  aria-invalid={!!error}
                  aria-describedby={error ? 'pg-error' : undefined}
                />
                {error && (
                  <p id="pg-error" className="text-red-400 text-[13px]">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting || value.length === 0}
                  className="bg-[#0071e3] hover:bg-[#0077ed] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg px-6 py-3 font-semibold w-full transition"
                >
                  {submitting ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    alert('กรุณาติดต่อเจ้าหน้าที่ที่ส่งลิงก์นี้ให้คุณเพื่อขอรหัสผ่าน')
                  }
                  className="text-[12px] text-gray-400 hover:text-gray-200 mt-1 underline-offset-2 hover:underline"
                >
                  ลืมรหัสผ่าน?
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
