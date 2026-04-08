# Technical Specification
## Gismo Smart Data Presentation Website

**Version:** 1.0  
**Date:** 2026-04-09

---

## 1. Architecture

**Type:** Static multi-page website (no build system, no framework)  
**Deployment:** Static file hosting (Nginx/Apache/CDN)  
**Languages:** HTML5, CSS3, Vanilla JavaScript (ES6+)

---

## 2. File Structure

```
/
├── index.html
├── smart-street-light.html
├── solar-street-light.html
├── fee-management.html
├── css/
│   └── main.css
├── js/
│   └── nav.js
├── infomation/
│   ├── SmartLight/
│   ├── Solar_Street_Light/
│   │   └── Gismo_Lighting_Solar_Street_Light_Solutions/
│   │       └── pptx_extraction/images/   ← product images
│   └── ระบบจัดเก็บค่าธรรมเนียมเก็บขยะ/
│       └── *.html                         ← UI mockup files
├── prd.md
├── techspec.md
├── CLAUDE.md
└── DESIGN.md
```

---

## 3. CSS Architecture

### Design Tokens (CSS Custom Properties)
```css
:root {
  /* Colors */
  --black: #1d1d1f;
  --pure-black: #000000;
  --light-gray: #f5f5f7;
  --white: #ffffff;
  --apple-blue: #0071e3;
  --link-blue: #0066cc;
  --link-blue-dark: #2997ff;
  --gray-80: rgba(0,0,0,0.8);
  --gray-48: rgba(0,0,0,0.48);
  --dark-surface-1: #272729;
  --dark-surface-2: #28282a;
  --shadow-card: rgba(0,0,0,0.22) 3px 5px 30px 0px;
  --nav-bg: rgba(0,0,0,0.8);

  /* Typography */
  --font-display: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', Helvetica, Arial, sans-serif;
  --font-text: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Text', Helvetica, Arial, sans-serif;
}
```

### Component Classes
- `.nav-glass` — sticky navigation with backdrop blur
- `.hero-dark` — full-width black background hero section
- `.section-light` — `#f5f5f7` background section
- `.section-dark` — `#000000` background section
- `.product-card` — card with shadow and `8px` radius
- `.btn-primary` — Apple Blue filled button
- `.btn-pill` — pill-shaped outline link
- `.spec-grid` — 2-3 column responsive feature grid

---

## 4. JavaScript

### `js/nav.js`
- Injects shared navigation HTML into every page
- Highlights active nav item based on `window.location.pathname`
- Handles mobile hamburger toggle
- No external dependencies

### Mobile Menu
- Toggle class `.nav-open` on `<body>`
- Full-screen overlay with links
- Close on link click or ESC key

---

## 5. Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, hamburger nav |
| Tablet | 640–1024px | 2-column grids, expanded content |
| Desktop | 1024–1440px | Full layout, max 980px content |
| Large | > 1440px | Centered with generous margins |

---

## 6. Images

### Solar Street Light
- Source: `infomation/Solar_Street_Light/Gismo_Lighting_Solar_Street_Light_Solutions/pptx_extraction/images/`
- Key images used:
  - `slide_1_image_1.jpg` — hero/cover
  - `slide_4_image_1.jpg` — performance chart
  - `slide_5_image_1.jpg` — SA-2A01 product
  - `slide_6_image_1.jpg` — SA-2A02 product
  - `slide_9_image_1.jpg` — SK-7A13 product
  - `slide_10_image_1.jpg` — SK-7A14 product
  - `slide_3_image_1.jpg` — company profile
  - `slide_14_image_1.jpg` — service workflow

### SmartLight
- No image files available locally
- Use CSS gradient/icon placeholders for feature sections
- Dashboard mockup: described via text and CSS

### Fee Management
- No images; use HTML mockup files as iframe embeds where appropriate
- Use CSS diagrams for workflow phases

---

## 7. Typography Scale (per DESIGN.md)

| Role | Size | Weight | Line-height | Letter-spacing |
|------|------|--------|-------------|----------------|
| Display Hero | 56px | 600 | 1.07 | -0.28px |
| Section Heading | 40px | 600 | 1.10 | normal |
| Tile Heading | 28px | 400 | 1.14 | 0.196px |
| Body | 17px | 400 | 1.47 | -0.374px |
| Caption | 14px | 400 | 1.29 | -0.224px |
| Micro | 12px | 400 | 1.33 | -0.12px |

Mobile scaling: 56px → 40px → 28px for hero headline at each breakpoint

---

## 8. Performance

- Google Fonts loaded with `display=swap` and preconnect
- Images below fold use `loading="lazy"`
- No JavaScript frameworks — vanilla JS only
- No build step required — files served directly
- Total page weight target: < 2MB per page

---

## 9. Accessibility

- All images have `alt` text in Thai/English
- Focus states: `2px solid #0071e3` outline on all interactive elements
- Minimum touch target: 44×44px
- Color contrast: WCAG AA compliant for body text
- `lang="th"` on all pages

---

## 10. Navigation Injection Pattern

Each page includes `js/nav.js` which renders:
```html
<nav class="nav-glass">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">GISMO</a>
    <div class="nav-links">
      <a href="index.html">หน้าหลัก</a>
      <a href="smart-street-light.html">Smart Street Light</a>
      <a href="solar-street-light.html">Solar Street Light</a>
      <a href="fee-management.html">ระบบค่าธรรมเนียม</a>
    </div>
    <button class="nav-hamburger">☰</button>
  </div>
</nav>
```
Active link determined by matching `href` against current URL pathname.
