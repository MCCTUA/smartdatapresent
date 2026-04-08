// Shared Navigation — injected into every page
(function () {
  const navEl = document.getElementById('site-nav');
  if (!navEl) return;

  const links = [
    { href: 'index.html', label: 'หน้าหลัก' },
    { href: 'smart-street-light.html', label: 'Smart Street Light' },
    { href: 'solar-street-light.html', label: 'Solar Street Light' },
    { href: 'fee-management.html', label: 'ระบบค่าธรรมเนียม' },
  ];

  // Determine active page
  const path = window.location.pathname.split('/').pop() || 'index.html';

  const linkHTML = links.map(link => {
    const isActive = link.href === path || (path === '' && link.href === 'index.html');
    return `<a href="${link.href}"${isActive ? ' class="active"' : ''}>${link.label}</a>`;
  }).join('');

  navEl.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">GISMO</a>
      <div class="nav-links">${linkHTML}</div>
      <button class="nav-hamburger" id="nav-hamburger-btn" aria-label="เปิดเมนู">☰</button>
    </div>
    <div class="nav-mobile-overlay" id="nav-mobile-overlay">
      <button class="nav-mobile-close" id="nav-mobile-close">✕</button>
      ${links.map(link => {
        const isActive = link.href === path;
        return `<a href="${link.href}"${isActive ? ' class="active"' : ''}>${link.label}</a>`;
      }).join('')}
    </div>
  `;

  // Hamburger toggle
  document.getElementById('nav-hamburger-btn').addEventListener('click', () => {
    document.getElementById('nav-mobile-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  document.getElementById('nav-mobile-close').addEventListener('click', closeMenu);
  document.querySelectorAll('#nav-mobile-overlay a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  function closeMenu() {
    document.getElementById('nav-mobile-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }
})();
