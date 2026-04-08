# CLAUDE.md — Gismo Smart Data Presentation Website

## Project Overview
React + Vite + Tailwind CSS v4 marketing website for Gismo Group presenting 3 product lines:
1. **GGismo Smart Street Light** — IoT smart street lighting platform
2. **Gismo Lighting Solar Street Light** — Solar street light hardware
3. **ระบบบริหารจัดการค่าธรรมเนียมท้องถิ่น** — Local fee management system

Target audience: Thai local government agencies (เทศบาล/อบต.) and contractors.

## Tech Stack
- **React 19** with **Vite 8**
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin — no tailwind.config.js needed)
- **Framer Motion** for animations
- **React Router DOM v7** with HashRouter (for static file hosting compatibility)

## File Structure
```
src/
  components/
    Nav.jsx         — Sticky glass navigation (reads route for active state)
    Footer.jsx      — Shared footer
  pages/
    Home.jsx        — Landing page with 3 product cards
    SmartStreetLight.jsx  — Product page 1
    SolarStreetLight.jsx  — Product page 2
    FeeManagement.jsx     — Product page 3
  App.jsx           — HashRouter + Routes setup
  main.jsx          — React entry point
  index.css         — Tailwind import + Google Fonts + base styles

public/
  images/
    solar/          — Solar street light product images (from infomation/ folder)

infomation/         — Source content (do not modify)
css/main.css        — Reference CSS (not used in React app — for static reference only)
js/nav.js           — Reference JS (not used in React app — for static reference only)
prd.md              — Product requirements
techspec.md         — Technical specification
DESIGN.md           — Apple design system reference
```

## Design System
Follow DESIGN.md (Apple-inspired design) strictly using Tailwind utility classes:
- **Font**: `font-family: Inter` (imported via Google Fonts in index.css)
- **Dark sections**: `bg-black text-white`
- **Light sections**: `bg-[#f5f5f7] text-[#1d1d1f]`
- **Accent**: `text-[#0071e3]` / `bg-[#0071e3]` — ALL interactive elements only
- **Navigation**: `bg-black/80 backdrop-blur-xl backdrop-saturate-180`, sticky, h-12
- **Headlines**: tight line-height `leading-[1.07]` at 56px, negative tracking `tracking-[-0.28px]`
- **Primary button**: `bg-[#0071e3] rounded-lg px-6 py-2` (8px radius)
- **Pill link**: `border border-[#0071e3] rounded-[980px] px-6 py-2` (pill shape)
- **Dark card**: `bg-[#272729] rounded-lg`
- **Light card**: `bg-white rounded-xl shadow-[rgba(0,0,0,0.22)_3px_5px_30px_0px]`
- **No gradients, no textures, no borders on cards**

## Routing
Uses `HashRouter` — all routes start with `/#/`:
- `/#/` → Home
- `/#/smart-street-light` → Smart Street Light
- `/#/solar-street-light` → Solar Street Light
- `/#/fee-management` → Fee Management

## Images
Solar images are in `public/images/solar/` — reference as `/images/solar/slide_X_image_Y.jpg` or `images/solar/slide_X_image_Y.jpg` with Vite's base `./`.

## Content Sources
- SmartLight: `infomation/SmartLight/GGismo Smart Street Light - Website Content.md`
- Solar: `infomation/Solar_Street_Light/Gismo_Lighting_Solar_Street_Light_Solutions/Gismo_Lighting_Solar_Street_Light_Solutions.md`
- Fee management: `infomation/ระบบจัดเก็บค่าธรรมเนียมเก็บขยะ/ระบบบริหารจัดการค่าธรรมเนียมท้องถิ่น - คู่มือการนำเสนอ.md`

## Build & Dev
- Dev server: `npm run dev`
- Build: `npm run build` → output in `dist/`
- Preview build: `npm run preview`

## Do Not
- Do not modify files in the `infomation/` folder
- Do not install CSS frameworks other than Tailwind
- Do not introduce accent colors other than `#0071e3`
- Do not use font weights above 700
- Do not use BrowserRouter (use HashRouter for static hosting)
- Do not add gradients or textures to section backgrounds
