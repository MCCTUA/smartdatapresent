import React, { useEffect, useState } from 'react';

// ---------------------------------------------------------------------------
// RotateHint — portrait-mobile overlay that prompts the viewer to rotate to
// landscape, where the fixed 16:9 (1280×720) pitch slides fill the screen.
//
// Purely additive: it overlays the deck on small portrait screens and disappears
// the moment the device is landscape (or on tablet/desktop). It never touches the
// slide layout, colours, fonts, or content.
// ---------------------------------------------------------------------------

export default function RotateHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only nudge real phones held upright — tablets/desktop are wide enough as-is.
    const mq = window.matchMedia('(orientation: portrait) and (max-width: 700px)');
    const update = () => setShow(mq.matches);
    update();
    mq.addEventListener('change', update);
    window.addEventListener('orientationchange', update);
    return () => {
      mq.removeEventListener('change', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: '#1d1d1f',
        color: '#FFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
        textAlign: 'center',
        fontFamily: 'Sarabun, sans-serif',
        paddingLeft: 28,
        paddingRight: 28,
        paddingTop: 'max(28px, env(safe-area-inset-top, 28px))',
        paddingBottom: 'max(28px, env(safe-area-inset-bottom, 28px))',
      }}
    >
      <div
        aria-hidden="true"
        style={{ fontSize: 52, lineHeight: 1, animation: 'rotateHintSpin 2.4s ease-in-out infinite' }}
      >
        📱
      </div>
      <div style={{ fontSize: 21, fontWeight: 700, letterSpacing: 0.2 }}>หมุนหน้าจอเป็นแนวนอน</div>
      <div style={{ fontSize: 15, fontWeight: 400, lineHeight: 1.5, opacity: 0.82, maxWidth: 280 }}>
        เพื่อรับชมสไลด์แบบเต็มจอ กรุณาหมุนอุปกรณ์ของท่านเป็นแนวนอน
      </div>
      <style>{`
        @keyframes rotateHintSpin {
          0%, 42% { transform: rotate(0deg); }
          58%, 100% { transform: rotate(90deg); }
        }
      `}</style>
    </div>
  );
}
