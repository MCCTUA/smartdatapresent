# Admin Dashboard UI Kit

## Overview
High-fidelity interactive prototype of the utilitfeeapp Web Admin Dashboard — the primary surface used by Account Officers, Supervisors, and Admins at อปท. organizations.

## Design Width
1280px (desktop-first, sidebar + content layout)

## Screens Included
| Screen | Component | Description |
|--------|-----------|-------------|
| Dashboard Home | `DashboardHome.jsx` | Stat cards, recent bills, quick actions, pending approvals |
| Bills Management | `BillsTable.jsx` | Filterable/searchable bill list with status tabs |
| Payment History | inline in `index.html` | Receipt list with print action |
| [Placeholder] Households | — | ทะเบียนครัวเรือน |
| [Placeholder] Meters | — | มิเตอร์น้ำ/ไฟ |
| [Placeholder] Approvals | — | Maker/Checker workflow |
| [Placeholder] Issues | — | Complaint tracking |
| [Placeholder] Reports | — | Revenue reports |
| [Placeholder] Settings | — | Org settings |

## Interactive Features
- Sidebar navigation (collapsible)
- Tab filters on Bills screen (all / ออกบิล / ค้างชำระ / ชำระบางส่วน / ชำระแล้ว)
- Search on Bills screen
- "รับชำระ" button opens PaymentModal
- Payment modal with method selection + success state
- Screen state persisted in localStorage

## Components
- `Sidebar.jsx` — Collapsible nav with icons (Lucide inline SVG)
- `Header.jsx` — Search bar, notification bell, user avatar
- `DashboardHome.jsx` — Overview with stat cards + recent bills table
- `BillsTable.jsx` — Full bills management with filters
- `PaymentModal.jsx` — Accept payment with channel selection + success animation

## Design Tokens Used
- `--org-primary: #1b61c9` (Airtable Blue, customizable per org)
- Font: DM Sans (Haas substitute)
- Radius: 10px buttons, 14px cards, 20px modals
- Shadow: `0px 1px 3px rgba(0,0,0,0.07)` for cards

## Customization
Change `--org-primary` in `index.html` to adapt to any อปท. brand color.
