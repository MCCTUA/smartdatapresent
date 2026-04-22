# utilitfeeapp Design System

## Overview

**utilitfeeapp** (ระบบเก็บค่าธรรมเนียมท้องถิ่น) is a **Multi-Tenant SaaS platform** for Thai Local Government Organizations (อปท. — องค์กรปกครองส่วนท้องถิ่น). It digitizes utility fee collection for waste, water, and electricity services — replacing manual cash collection rounds with QR code payments, digital billing, meter tracking, approvals, and resident complaint management.

### Products / Surfaces

| Surface | Users | Description |
|---------|-------|-------------|
| **Web Admin Dashboard** | Account Officer, Supervisor, Admin, Super Admin | Core back-office — billing, payments, meters, arrears, approvals, reports |
| **Resident Web/LINE App** | Residents (ประชาชน) | View bills, pay via PromptPay/QR, submit complaints |
| **Driver Mobile App** | Field Officers / Drivers | Record per-house waste collection, mark sticker status |

### User Roles

| Role | Thai Name | Access |
|------|-----------|--------|
| Resident | ประชาชน | View own bills, pay, file issues — via mobile/LINE |
| Account Officer | เจ้าหน้าที่กองคลัง | Issue bills, receive payments, print receipts/stickers |
| Field Officer | เจ้าหน้าที่ภาคสนาม | Driver App — log per-house collection |
| Supervisor | หัวหน้างาน | Approve requests, view reports, track arrears |
| Admin | ผู้ดูแลระบบ อปท. | Manage users, org settings, view everything |
| Super Admin | ทีมผู้ให้บริการ | Manage all tenants, upload org logos |

### Key Features (from schema v3.0)
- **Multi-tenant** with full Row Level Security per org
- **Billing**: tiered pricing, installment plans, penalty rules
- **Payments**: PromptPay/QR, 7-Eleven, LINE, cash — receipt sequences
- **Meter management**: water/electricity readings with tiered cost calculation
- **Sticker system**: annual paid-sticker per household for social pressure
- **Approval Workflow** (Maker/Checker): bill cancel, adjustments, write-offs, refunds
- **Issue Tracking**: complaints with SLA rules, internal/public comments
- **Notifications**: LINE, SMS, email, postal
- **Discount system**: household-level discounts for waste-sorting behavior
- **Arrears tracking**: 6 escalation levels up to legal action
- **Subscription tiers**: Starter (≤200 HH, ~49k THB/yr) → Unlimited

### Subscription Tiers
| Tier | Households | Annual Price |
|------|-----------|-------------|
| Starter | ≤ 200 | ฿49,000 |
| Basic | ≤ 500 | ฿89,000 |
| Standard | ≤ 1,000 | ฿149,000 |
| Pro | ≤ 2,500 | ฿249,000 |
| Business | ≤ 5,000 | ฿399,000 |
| Enterprise | ≤ 15,000 | ฿499,000 |
| Unlimited | > 15,000 | Custom |

---

## Sources

- **Codebase**: `Utility_Service_fees/` (mounted via File System Access API)
  - `Documents/schema_v3.sql` — PostgreSQL schema v3.0 (2710 lines)
  - `DESIGN-airtable.md` — Airtable-inspired design specification
  - `CHANGELOG.md` — schema versions v2.0 → v2.1 → v3.0
- **Presentation**: `Utility_Service_fees/Presentation/waste_fee_proposal.pptx` — 11-slide proposal on waste fee crisis for rural อปท.
- **UI Brief**: `Utility_Service_fees/Presentation/UI_Design_Brief_v1.docx` — Screen specifications (April 2569)

---

## CONTENT FUNDAMENTALS

### Language
- **Bilingual**: Thai (ภาษาไทย) is primary for all user-facing labels and messages; English used for role names, technical terms, and developer-facing code.
- Navigation labels in Thai: e.g. "บิลค่าธรรมเนียม", "รับชำระเงิน", "ทะเบียนบ้าน"
- Status labels mixed: e.g. "draft", "issued", "partial_paid" in DB but displayed in Thai UI

### Tone & Voice
- **Formal but accessible** — government-adjacent product; uses polite Thai (ราชการ-adjacent but not overly bureaucratic)
- **Direct and clear** — Thai government workers are practical; no fluff
- **Numbers prominent** — amounts in บาท (฿), dates in Buddhist Era (พ.ศ.), always shown clearly
- **No emoji** in the product UI — professional, data-dense interface
- **"ท่าน" / "คุณ"** — formal second person for resident-facing messages
- Copy is concise: "ออกบิล" not "สร้างการออกใบเสนอราคา"

### Casing
- Thai: natural sentence structure (no ALL CAPS)
- English labels: Title Case for headings, sentence case for body
- Status badges: lowercase English or Thai label (not SCREAMING CAPS)

### Key UI Copy Examples
- "รับชำระเงิน" (Receive Payment) not "Process Transaction"
- "ค้างชำระ" (Arrears) — concise term used throughout
- "ใบเสร็จ" (Receipt), "บิล" (Bill), "มิเตอร์" (Meter)
- "อนุมัติ / ปฏิเสธ" (Approve / Reject) in approval flows

---

## VISUAL FOUNDATIONS

### Color Philosophy
The design follows **Airtable's visual language**: white canvas, deep navy text, blue primary CTA. Each org (อปท.) can set a **custom Primary Color** — the system generates a full palette from it via CSS custom properties.

### Typography
**Haas** font family is specified but proprietary. Substituting with:
- **Body**: `DM Sans` (Google Fonts) — closest match to Neue Haas Grotesk; clean, neutral, Swiss-precision
- **Display**: `Plus Jakarta Sans` (Google Fonts) — strong heavy weights for "Haas Groot Disp" role

⚠️ **Font substitution**: Haas / Neue Haas Grotesk / Haas Groot Disp are not available on Google Fonts. DM Sans and Plus Jakarta Sans are used. If you have Haas font files, add them to `fonts/` and update `colors_and_type.css` accordingly.

### Backgrounds
- Primary: White (`#ffffff`) — always white canvas, no dark/patterned backgrounds in admin
- Subtle surface: `#f8fafc` — for sidebar, table rows, input backgrounds
- No full-bleed hero images in admin UI
- No gradients (per design brief: avoid heavy gradients)

### Animation
- Minimal — government data app; subtle only
- Transitions: 150–200ms ease-out for modals, dropdowns
- No bounces; no spring physics
- Hover: opacity 0.85 or background lightens slightly
- Press: slight scale(0.98) on buttons

### Hover / Press States
- Primary button hover: slightly darker blue (`#1550b0`), no shadow change
- Secondary/ghost hover: light blue tint background (`rgba(27,97,201,0.06)`)
- Table row hover: `#f0f4ff` tint
- Press: scale(0.98) + darken

### Cards & Borders
- `1px solid #e0e2e6` border
- 16px radius for cards, 12px for buttons, 2px for badges/tags
- Blue-tinted multi-layer shadow: `rgba(0,0,0,0.32) 0px 0px 1px, rgba(45,127,249,0.28) 0px 1px 3px`
- Soft ambient: `rgba(15,48,106,0.05) 0px 0px 20px` for modals

### Transparency & Blur
- Used sparingly — sticky header may use `backdrop-filter: blur(8px)` with white/0.95 bg
- No frosted glass aesthetic in data tables

### Imagery
- No decorative photography in admin UI
- Icons: Lucide icon set (clean stroke, consistent weight)
- Placeholder illustrations: simple line art (not used in data-dense admin)

### Corner Radii
- 2px — status tags, inline badges
- 12px — buttons, small chips
- 16px — cards, panels
- 24px — modal dialogs, large containers
- 50% — avatar circles

### Letter Spacing
- Body text: +0.08–0.18px (positive tracking per Haas spec)
- Buttons: +0.08px
- Caption/label: +0.07–0.28px

---

## ICONOGRAPHY

No custom icon font found in codebase. Using **Lucide Icons** (CDN: `https://unpkg.com/lucide@latest`) — matches stroke weight and clean style appropriate for this product.

**Usage**:
- 16px icons inline with text
- 20px for navigation sidebar items
- 24px for empty state illustrations / action buttons
- Always `stroke-width: 1.5` for consistency with Airtable-style lightness

**No emoji** in the product. Unicode characters not used as icons.

---

## File Index

```
README.md                    ← This file
SKILL.md                     ← Agent skill definition
colors_and_type.css          ← CSS custom properties: colors + typography
preview/
  colors-primary.html        ← Primary color palette
  colors-neutral.html        ← Neutral/gray palette
  colors-semantic.html       ← Semantic (status) colors
  type-scale.html            ← Typography scale specimen
  type-display.html          ← Display type specimen
  spacing-tokens.html        ← Spacing + radius tokens
  shadow-elevation.html      ← Shadow system
  components-buttons.html    ← Button states
  components-inputs.html     ← Form inputs
  components-cards.html      ← Card components
  components-badges.html     ← Status badges & tags
  components-table.html      ← Data table rows
ui_kits/
  admin/
    README.md                ← Admin dashboard UI kit notes
    index.html               ← Admin dashboard (interactive prototype)
    Sidebar.jsx              ← Navigation sidebar component
    Header.jsx               ← Top header bar
    BillsTable.jsx           ← Bills list with status
    DashboardHome.jsx        ← Home/overview screen
    PaymentModal.jsx         ← Accept payment modal
assets/
  (no logos found in codebase — placeholder used)
fonts/
  (no font files — using Google Fonts DM Sans + Plus Jakarta Sans)
```
