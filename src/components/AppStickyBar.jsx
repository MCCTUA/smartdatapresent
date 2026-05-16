import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const C = {
  primary: '#0F6E56',
  primaryHover: '#1D9E75',
  primaryDeep: '#0B5544',
  text: '#1F2A24',
  textMuted: '#5F6B65',
  surfaceSoft: '#F5F1E4',
  accent: '#BA7517',
};

export default function AppStickyBar({ app, prev, next }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const downloadDisabled = !app.pdfUrl || app.pdfStatus === 'preparing';

  const handleDownload = () => {
    if (downloadDisabled) return;
    window.open(app.pdfUrl, '_blank', 'noopener');
  };

  return (
    <div
      className="cctv-sticky-bar fixed left-0 right-0 z-40 transition-transform duration-300"
      style={{
        bottom: 0,
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        background: '#FFFFFFF2',
        backdropFilter: 'saturate(160%) blur(10px)',
        WebkitBackdropFilter: 'saturate(160%) blur(10px)',
        borderTop: `1px solid ${C.surfaceSoft}`,
        boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-3 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4">
        {/* Prev */}
        <Link
          to={`/cctv-ai/${prev.slug}`}
          className="hidden md:flex items-center gap-2 text-[12.5px] no-underline transition-colors px-3 py-2 rounded-lg"
          style={{ color: C.textMuted, minWidth: 0, flex: '1 1 0' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
          title={prev.nameThai}
        >
          <span style={{ color: C.primary }}>←</span>
          <span className="truncate">{prev.nameThai}</span>
        </Link>

        {/* Center: Download button */}
        <button
          onClick={handleDownload}
          disabled={downloadDisabled}
          className="text-[13px] md:text-[14px] font-semibold px-5 py-2.5 rounded-lg transition-all"
          style={{
            background: downloadDisabled ? '#D9D6CB' : C.primary,
            color: downloadDisabled ? '#7A7A6E' : '#FFF',
            border: 'none',
            cursor: downloadDisabled ? 'not-allowed' : 'pointer',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            if (!downloadDisabled) e.currentTarget.style.background = C.primaryHover;
          }}
          onMouseLeave={(e) => {
            if (!downloadDisabled) e.currentTarget.style.background = C.primary;
          }}
          title={downloadDisabled ? 'เอกสาร 1-pager กำลังจัดทำ' : 'ดาวน์โหลด 1-pager PDF'}
        >
          {downloadDisabled
            ? 'เอกสาร 1-pager กำลังจัดทำ'
            : 'ดาวน์โหลด 1-pager PDF ⬇'}
        </button>

        {/* Next */}
        <Link
          to={`/cctv-ai/${next.slug}`}
          className="hidden md:flex items-center gap-2 text-[12.5px] no-underline transition-colors px-3 py-2 rounded-lg justify-end"
          style={{ color: C.textMuted, minWidth: 0, flex: '1 1 0' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
          title={next.nameThai}
        >
          <span className="truncate">{next.nameThai}</span>
          <span style={{ color: C.primary }}>→</span>
        </Link>

        {/* Mobile prev/next stack */}
        <div className="flex md:hidden gap-2 text-[12px]">
          <Link
            to={`/cctv-ai/${prev.slug}`}
            className="flex-1 text-center py-1.5 px-2 rounded-md no-underline truncate"
            style={{ background: C.surfaceSoft, color: C.primaryDeep }}
          >
            ← prev
          </Link>
          <Link
            to={`/cctv-ai/${next.slug}`}
            className="flex-1 text-center py-1.5 px-2 rounded-md no-underline truncate"
            style={{ background: C.surfaceSoft, color: C.primaryDeep }}
          >
            next →
          </Link>
        </div>
      </div>
    </div>
  );
}
