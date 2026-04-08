# Product Requirements Document (PRD)
## Gismo Smart Data Presentation Website

**Version:** 1.0  
**Date:** 2026-04-09  
**Audience:** Local government agencies (เทศบาล/อบต.), contractors (ผู้รับเหมา), private sector

---

## 1. Overview

A static multi-page marketing website for Gismo Group presenting 3 product lines to prospective customers. The site must communicate product value clearly, allow navigation between products, and inspire confidence via a premium design inspired by Apple's web design language.

---

## 2. Products

### Product 1: GGismo Smart Street Light
**Tagline:** ก้าวสู่เมืองอัจฉริยะด้วยระบบจัดการไฟถนนอัจฉริยะแบบครบวงจร  
**Target:** Local government (เทศบาล/อบต.)  
**Core value:** IoT-connected street lights with real-time monitoring, remote control, and energy savings of 50-70%

Key sections:
- Hero with headline and CTA
- Problem statement (pain points of current street light management)
- Solution overview (hardware + software)
- How it works (End-to-End architecture)
- Hardware excellence (155 lm/W, IP66, adjustable bracket)
- Smart control (Node LTE, NEMA socket, fault alerts)
- Real-time monitoring (dashboard, map view)
- Customization (Custom Dashboard, Super App, Template Reports)
- Packages (Basic / Smart / Premium)
- ROI & benefits (50-70% energy savings, reduced maintenance)
- Case studies (50+ local governments, expressway sensor system)
- Why GGismo
- Next steps / CTA

### Product 2: Gismo Lighting Solar Street Light
**Tagline:** โซล่าเซลล์ไฟถนน คุณภาพสูง มาตรฐานสากล  
**Target:** Contractors (ผู้รับเหมา), trading companies, government procurement officers  
**Core value:** High-quality solar street lights meeting Thai local government standards, 15+ years experience manufacturer

Key sections:
- Hero with product image and headline
- Challenges faced by contractors (standards, quality risk, stability, support)
- Company profile (15 years, LM-79/LM-80/มอก. certified)
- Design highlights (77.5% energy reduction, 200 lm/W)
- Product lineup:
  - SA-2A01 (All-in-One RSK Series) — 60-120W, 6,000-15,000 lm, main roads
  - SA-2A02 (RSA Series) — 40-160W, 5,100-18,000 lm, wide roads
  - SK-7A13 (Split Type YY Series) — 60-85W, 3,400-4,800 lm, flexible installation
  - SK-7A14 (Sailing Light) — 60-100W, 4,100-9,000 lm, premium projects
- Product comparison table
- Smart platform integration (optional IoT control)
- Packages (Standard / Smart / Premium)
- End-to-end service
- Key takeaways / benefits
- Contact / CTA

### Product 3: ระบบบริหารจัดการค่าธรรมเนียมท้องถิ่น
**Tagline:** โปร่งใส ปลอดภัย และเชื่อถือได้  
**Target:** Local government (เทศบาล/อบต.) finance and operations departments  
**Core value:** Cashless, transparent, anti-fraud fee collection system (garbage, water, electricity) with 8-phase workflow

Key sections:
- Hero with headline and key benefits
- 8-Phase workflow overview (notification → registration → billing → reconciliation → approval → collection → fraud detection → audit)
- Security features:
  - Anti-scam (Dynamic QR, Officer ID QR, Verified LINE OA)
  - Anti-fraud (Cashless only, Segregation of duties, Auto-reconciliation, Immutable audit logs)
  - Monitoring & transparency (Real-time dashboard, GPS Geofencing, Photo evidence, Public disclosure)
- Expected benefits table (fraud 50%→0-2%, trust 30%→95%)
- Implementation timeline (3 phases, 6 months)
- UI mockups/screenshots
- CTA

---

## 3. Site Structure

```
index.html                  — Landing page (company overview + 3 product cards)
smart-street-light.html     — GGismo Smart Street Light product page
solar-street-light.html     — Gismo Lighting Solar Street Light product page
fee-management.html         — ระบบบริหารจัดการค่าธรรมเนียมท้องถิ่น product page
css/main.css                — Shared styles (Apple design system)
js/nav.js                   — Shared navigation injection
```

---

## 4. Navigation

- Sticky glass navigation bar (Apple-style: `rgba(0,0,0,0.8)` + backdrop blur)
- Logo: "GISMO" wordmark left-aligned
- Nav links: Home | Smart Street Light | Solar Street Light | Fee Management
- Mobile: hamburger menu with full-screen overlay
- Active page highlighted

---

## 5. Design Requirements

- Follow DESIGN.md (Apple design system) strictly
- Font: Inter from Google Fonts (SF Pro substitute)
- Color tokens: `#000000`, `#f5f5f7`, `#1d1d1f`, `#0071e3`, `#0066cc`, `#2997ff`
- Alternating black / light-gray sections per product page
- Product images: use real images from Solar folder; CSS visual elements for SmartLight
- All CTAs: Apple Blue pill buttons or outlined pill links
- Responsive: mobile-first, 4 breakpoints per DESIGN.md

---

## 6. Content Language

- Thai language for all body content
- English for technical terms, product codes, section labels where appropriate
- No translation needed — Thai is the primary language

---

## 7. Success Criteria

- All 3 product pages accessible from navigation
- Each product page fully represents its source material
- Design matches Apple-inspired spec from DESIGN.md
- Renders correctly on mobile (360px+) and desktop (1440px)
- No broken image links
- Page load < 3s on standard connection
