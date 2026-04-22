---
name: utilitfeeapp-design
description: Use this skill to generate well-branded interfaces and assets for utilitfeeapp — a Multi-Tenant SaaS for Thai Local Authority fee collection (ระบบเก็บค่าธรรมเนียมท้องถิ่น). Contains essential design guidelines, Airtable-inspired design tokens, typography, UI components, and a full Admin Dashboard UI kit.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

Key things to know:
- Design language: Airtable-inspired (white canvas, Deep Navy #181d26, Airtable Blue #1b61c9)
- Fonts: DM Sans (body) + Plus Jakarta Sans (display) — substitutes for Haas / Neue Haas Grotesk
- Org primary color is customizable via --org-primary CSS var
- UI is bilingual Thai/English; Thai is primary for all user-facing text
- Product surfaces: Web Admin Dashboard, Resident Mobile/LINE App, Driver Mobile App
- Core entities: Household (ครัวเรือน), Bill (บิล), Payment (การชำระ), Receipt (ใบเสร็จ), Meter (มิเตอร์)
- See ui_kits/admin/index.html for the interactive Admin Dashboard prototype

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
