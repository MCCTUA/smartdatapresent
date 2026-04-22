# PRD — ระบบเก็บค่าธรรมเนียมท้องถิ่น (Gismo Local Authority Fee Collection Platform)

**เวอร์ชัน**: 1.1  
**วันที่**: เมษายน 2569  
**สถานะ**: Working Draft  
**เจ้าของเอกสาร**: ทีมผลิตภัณฑ์ Gismo  

---

## สารบัญ

1. [บทนำและวิสัยทัศน์](#1-บทนำและวิสัยทัศน์)
2. [กลุ่มเป้าหมายและ User Personas](#2-กลุ่มเป้าหมายและ-user-personas)
3. [ขอบเขตของผลิตภัณฑ์](#3-ขอบเขตของผลิตภัณฑ์)
4. [สถาปัตยกรรมระดับสูง](#4-สถาปัตยกรรมระดับสูง)
5. [Phase 0 — พื้นฐาน (เสร็จแล้ว)](#5-phase-0--พื้นฐาน-เสร็จแล้ว)
6. [Phase 1 — Core Billing + Field Apps](#6-phase-1--core-billing--field-apps)
7. [Phase 2 — Route Intelligence + Module System](#7-phase-2--route-intelligence--module-system)
8. [Phase 3 — Analytics + AI Intelligence](#8-phase-3--analytics--ai-intelligence)
9. [Phase 4 — Scale + Enterprise](#9-phase-4--scale--enterprise)
10. [Non-Functional Requirements](#10-non-functional-requirements)
11. [Integration Requirements](#11-integration-requirements)
12. [Security & Compliance](#12-security--compliance)
13. [Success Metrics & KPIs](#13-success-metrics--kpis)
14. [สิ่งที่อยู่นอกขอบเขต (Out of Scope)](#14-สิ่งที่อยู่นอกขอบเขต-out-of-scope)
15. [Risks & Mitigations](#15-risks--mitigations)
16. [Glossary](#16-glossary)

---

## 1. บทนำและวิสัยทัศน์

### 1.1 ปัญหาที่แก้ไข

องค์กรปกครองส่วนท้องถิ่น (อปท.) ทั่วประเทศไทยกว่า 7,850 แห่ง ยังคงพึ่งพากระบวนการเก็บค่าธรรมเนียมแบบดั้งเดิม ได้แก่ สมุดบัญชีกระดาษ, Excel spreadsheet ที่ไม่ได้ศูนย์กลาง, และระบบคอมพิวเตอร์แยกส่วนที่ไม่เชื่อมต่อกัน ปัญหาหลักที่พบ:

- **การค้างชำระสูง**: อัตราค้างชำระค่าธรรมเนียมขยะมูลฝอย 25–40% ในหลาย อปท.
- **ต้นทุนแรงงานสูง**: เจ้าหน้าที่ใช้เวลา 60–70% กับงาน manual (จดมิเตอร์, คำนวณบิล, ออกใบเสร็จ)
- **เส้นทางไม่มีประสิทธิภาพ**: รถเก็บขยะวิ่งซ้ำเส้นทางหรือข้ามจุดที่ควรเก็บ ทำให้สิ้นเปลืองเชื้อเพลิงโดยไม่จำเป็น
- **ขาดข้อมูล real-time**: ผู้บริหารไม่มีภาพรวม dashboard การเก็บรายได้ในแต่ละวัน
- **ภาษีป้ายสูญหายรายได้**: สำรวจป้ายด้วยมือ ทำให้พลาดป้ายใหม่หรือคำนวณภาษีผิด

### 1.2 วิสัยทัศน์

> **"เป็น SaaS platform ที่ครบวงจรที่สุดสำหรับการบริหารรายได้และบริการท้องถิ่นในประเทศไทย ให้ อปท. ทุกขนาดสามารถดิจิทัลเปลี่ยนแปลงได้ภายใน 30 วัน"**

### 1.3 พันธกิจ

- ลดต้นทุนการดำเนินงานของ อปท. ลง ≥ 30% ภายใน 12 เดือนหลัง go-live
- เพิ่มอัตราการชำระเงินตรงเวลา ≥ 20% ผ่านการแจ้งเตือนอัตโนมัติและช่องทาง digital payment
- ให้ผู้บริหาร อปท. มีข้อมูลแบบ real-time เพื่อตัดสินใจด้านนโยบายและงบประมาณ

### 1.4 Business Model

ผลิตภัณฑ์ให้บริการในรูปแบบ **SaaS subscription** โดยแบ่งตาม:

| Tier | ราคา (บาท/เดือน) | Modules | เหมาะสำหรับ |
|------|-----------------|---------|------------|
| Starter | 2,500–5,000 | CORE-* (4 modules) | อบต. ขนาดเล็ก < 1,000 ครัวเรือน |
| Professional | 8,000–15,000 | + FIELD-* + TAX-SIGN | เทศบาลตำบล / อบต. ขนาดกลาง |
| Enterprise | 20,000–40,000 | ทุก module + AI-* | เทศบาลเมือง / นคร |
| Custom | ตามขนาด | Unlimited + White-label | จังหวัด / กลุ่ม อปท. |

---

## 2. กลุ่มเป้าหมายและ User Personas

### 2.1 Persona 1 — ปลัด อบต. / นายก อปท. (ผู้ตัดสินใจ)

**ชื่อ**: นายสมชาย รักท้องถิ่น, ปลัด อบต. ขนาดกลาง  
**อายุ**: 45–55 ปี  
**เป้าหมาย**: ลดข้อร้องเรียนจากประชาชน, ผ่านการตรวจสอบจาก สตง., แสดงผลงานบริหารจัดการที่ดี  
**ความเจ็บปวด**: ไม่มีข้อมูลรายได้ real-time, รายงานผิดพลาดบ่อย, เจ้าหน้าที่ทำงานล่าช้า  
**ความต้องการจาก Product**: Dashboard ผู้บริหาร, รายงาน export สำหรับ สตง., การแจ้งเตือนปัญหาสำคัญ  

### 2.2 Persona 2 — เจ้าหน้าที่กองคลัง (Officer)

**ชื่อ**: นางสาวอรอุมา ขยันทำงาน, เจ้าหน้าที่งานบิลและรับชำระ  
**อายุ**: 28–40 ปี  
**เป้าหมาย**: ออกบิลได้ถูกต้อง, ค้นหาประวัติการชำระได้เร็ว, ลดข้อผิดพลาด  
**ความเจ็บปวด**: ต้องคำนวณบิลด้วยมือ, ค้นหาประวัติจากกองกระดาษ, ออกใบเสร็จผิด  
**ความต้องการ**: ระบบออกบิลอัตโนมัติ, ค้นหาทะเบียนบ้านได้เร็ว, print ใบเสร็จในคลิกเดียว  

### 2.3 Persona 3 — พนักงานขับรถเก็บขยะ (Driver)

**ชื่อ**: นายบุญมี มีน้ำใจ, พนักงานขับรถ 10 ปี  
**อายุ**: 30–50 ปี  
**เป้าหมาย**: ทำรอบให้เสร็จเร็ว, รู้ว่าบ้านไหนไม่จ่ายต้องข้าม, รายงานผลกลับออฟฟิศ  
**ความเจ็บปวด**: จำเส้นทางผิดบางวัน, ไม่รู้ว่าบ้านไหนค้างชำระ, ต้องโทรถามออฟฟิศตลอด  
**ความต้องการ**: แอปมือถือง่าย, แผนที่เส้นทาง, รายการบ้านที่ต้องข้าม, บันทึกได้ offline  

### 2.4 Persona 4 — เจ้าหน้าที่จดมิเตอร์ (Meter Reader)

**ชื่อ**: นายวิชัย ตาดี, เจ้าหน้าที่ใหม่ 2 ปี  
**อายุ**: 22–35 ปี  
**เป้าหมาย**: จดมิเตอร์ครบตามรอบ, ไม่ต้องเดินย้อนทาง, รายงานปัญหามิเตอร์ได้ง่าย  
**ความเจ็บปวด**: สมุดจดหาย, ตัวเลขอ่านยาก, เดินย้อนทางบ่อย  
**ความต้องการ**: OCR อ่านตัวเลขอัตโนมัติ, แผนที่ลำดับบ้าน, รายงานปัญหาพร้อมรูปถ่าย  

### 2.5 Persona 5 — เจ้าหน้าที่สำรวจภาษีป้าย (Tax Surveyor)

**ชื่อ**: นางมาลี ละเอียดถี่ถ้วน, เจ้าหน้าที่งานจัดเก็บรายได้  
**อายุ**: 30–45 ปี  
**เป้าหมาย**: สำรวจป้ายครบทุกป้ายในพื้นที่, คำนวณภาษีถูกต้องตามกฎหมาย, ออกใบประเมินได้เร็ว  
**ความเจ็บปวด**: จดบันทึกลงกระดาษแล้วพิมพ์ซ้ำ, คำนวณภาษีด้วยมือบ่อยผิด, ป้ายใหม่ไม่รู้ว่ามี  
**ความต้องการ**: แอปสำรวจ GPS + รูปถ่าย, คำนวณภาษีอัตโนมัติ, เชื่อมโยงกับระบบบิล  

### 2.6 Persona 6 — ประชาชน (Resident)

**ชื่อ**: นางสาวนิดา ดีใจ, ผู้อาศัยในเขต อปท.  
**อายุ**: 25–55 ปี  
**เป้าหมาย**: จ่ายค่าขยะ/น้ำง่ายๆ ไม่ต้องเดินไปสำนักงาน, ดูประวัติการจ่ายย้อนหลัง  
**ความเจ็บปวด**: ต้องเดินไปจ่ายที่สำนักงาน, ไม่รู้ยอดที่ต้องจ่าย, ลืมจ่ายแล้วโดนค่าปรับ  
**ความต้องการ**: จ่ายผ่าน LINE / QR Code, รับแจ้งเตือนก่อนครบกำหนด, ดูใบเสร็จออนไลน์  

---

## 3. ขอบเขตของผลิตภัณฑ์

### 3.1 Module Catalog (18 Modules ใน 5 Groups)

```
GROUP: core          → CORE-BILLING, CORE-PAYMENT, CORE-RESIDENT, CORE-REPORTING
GROUP: field         → FIELD-WASTE, FIELD-STICKER, FIELD-METER, FIELD-SURVEY
GROUP: tax           → TAX-SIGN, TAX-PROPERTY, TAX-BUSINESS
GROUP: intelligence  → AI-ROUTE, AI-PREDICT, AI-DUNNING
GROUP: platform      → PLAT-ASSET, PLAT-PERMIT, PLAT-CRM, PLAT-BI
```

### 3.2 Portals / Interfaces

| Interface | กลุ่มผู้ใช้ | Platform | Phase |
|-----------|-----------|---------|-------|
| Officer Web Portal | Officer, Admin, Supervisor | Web (Desktop) | Phase 1 |
| Resident Web Portal | ประชาชน | Web (Mobile-first) | Phase 1 |
| Driver Mobile App | พนักงานขับรถ | Android/iOS PWA | Phase 1 |
| Meter Reader App | เจ้าหน้าที่จดมิเตอร์ | Android/iOS PWA | Phase 1 |
| Tax Surveyor App | เจ้าหน้าที่สำรวจ | Android/iOS PWA | Phase 1 |
| Super Admin Console | Gismo staff | Web (Desktop) | Phase 1 |
| BI Dashboard | ผู้บริหาร อปท. | Web (Tablet/Desktop) | Phase 3 |

---

## 4. สถาปัตยกรรมระดับสูง

### 4.1 Technology Stack

| Layer | Technology | เหตุผล |
|-------|-----------|--------|
| Database | PostgreSQL 15+ with RLS | Multi-tenant isolation, JSON support, strong ACID consistency |
| Backend API | **FastAPI (Python 3.12)** | Async I/O, Python ecosystem (OR-Tools, sklearn, pandas ใช้ร่วมกันได้), auto OpenAPI docs |
| Background Workers | **Celery + Redis (AWS ElastiCache)** | Async tasks: dunning automation, batch billing, notifications, ML inference |
| API Gateway | **AWS API Gateway (HTTP API)** | $1/million calls, managed auth, rate limiting, ไม่มี vendor infra ให้ดูแล |
| Frontend Web | React + Tailwind CSS | Component reuse across portals |
| Mobile/PWA | React PWA (offline-capable) | Single codebase, offline support for field workers |
| OCR | Google Cloud Vision API + Tesseract.js fallback | ความแม่นยำสูง, fallback สำหรับ offline |
| File Storage | **AWS S3 (Bangkok region ap-southeast-7)** | รูปถ่ายป้าย, รูปมิเตอร์, เอกสาร — ข้อมูลอยู่ในไทยตาม PDPA |
| Notifications | ไปรษณีย์ (ราชการ) · Email (SMTP/SES) · LINE Messaging API · Twilio SMS | ส่งตามลำดับ priority + consent — postal เสมอ, LINE/email/SMS ต้อง consent ก่อน |
| Payment | PromptPay QR, Omise, 2C2P, KBank | รองรับ payment gateway ในไทย |
| Route Optimization | Google OR-Tools (Phase 2), Google Maps Route Opt. (Phase 4) | VRP solver ที่แม่นยำ; OR-Tools รันบน Python ตรงกับ FastAPI stack |
| ML/AI | **FastAPI Python workers + scikit-learn → LightGBM** | Native integration กับ backend stack, ไม่ต้องมี microservice แยก |
| Hosting | **AWS ap-southeast-7 Bangkok (ECS Fargate + RDS PostgreSQL Multi-AZ)** | ข้อมูลอยู่ในไทย, PDPA-compliant, region เปิด 2024 |

### 4.2 Multi-Tenant Architecture

- **1 Organization = 1 อปท.**: ข้อมูลแยก 100% ด้วย `org_id` + PostgreSQL Row Level Security
- **Session Variables**: ทุก transaction ต้อง `SET LOCAL app.current_org_id` และ `app.current_user_id`
- **Module Gating**: ทุก API endpoint ตรวจสอบ `check_module_access(org_id, 'MODULE-CODE')` ก่อนดำเนินการ
- **Subscription Tiers**: กำหนดโควตาบ้าน, API rate limits, storage quota ตาม tier

```
[Request] → [Auth Middleware] → [Module Gate] → [RLS-filtered DB Query] → [Response]
               ↓                    ↓
         jwt.verify()       check_module_access()
         set session vars   throw 403 if not subscribed
```

---

## 5. Phase 0 — พื้นฐาน (เสร็จแล้ว)

**ระยะเวลา**: สำเร็จแล้ว  
**สถานะ**: ✅ Complete

### 5.1 สิ่งที่ทำเสร็จแล้ว

- [x] Schema v3.0 — Multi-tenant PostgreSQL พร้อม RLS ครบ 39 ตาราง
- [x] Organizations, org_users, fiscal_years
- [x] Households, residents, meters, meter_readings
- [x] Bills, bill_items, payments, receipts, receipt_sequences
- [x] Installment plans, arrears tracking, penalties
- [x] Approval workflow (policies → requests → steps)
- [x] Issue management + SLA rules
- [x] Collection routes, collection trips, sticker system
- [x] Audit logs, notification templates
- [x] RLS policies สำหรับทุกตาราง
- [x] Helper functions: `current_org_id()`, `current_user_id()`, `user_has_org_role()`

---

## 6. Phase 1 — Core Billing + Field Apps

**ระยะเวลา**: เดือน 1–4  
**เป้าหมาย**: Launch ระบบ core ที่ใช้งานได้จริงใน production กับ อปท. นำร่อง 3–5 แห่ง

### 6.1 Epic 1.1 — Core Billing System (CORE-BILLING)

**Sprint 1–2**

#### User Stories

| # | ในฐานะ | ฉันต้องการ | เพื่อ | Priority |
|---|--------|-----------|------|----------|
| 1.1.1 | Officer | สร้างรอบบิลรายเดือน/รายไตรมาสได้ | ออกบิลให้ครัวเรือนทั้งหมดพร้อมกัน | Must |
| 1.1.2 | Officer | คำนวณค่าธรรมเนียมตามอัตราขั้นบันได | เรียกเก็บถูกต้องตามปริมาณน้ำที่ใช้ | Must |
| 1.1.3 | Officer | ค้นหาบิลและประวัติการชำระของบ้านใดก็ได้ | ตอบคำถามประชาชนได้ทันที | Must |
| 1.1.4 | Officer | แก้ไขบิล (ลด/เพิ่ม) พร้อม approval workflow | มีการตรวจสอบก่อนแก้ไขข้อมูลสำคัญ | Must |
| 1.1.5 | Admin | ตั้งอัตราค่าบริการใหม่ตามมติสภา | ระบบคำนวณตามอัตราที่ถูกต้อง | Must |
| 1.1.6 | Officer | พิมพ์ใบแจ้งหนี้ / export PDF | แจกจ่ายหรือส่งทางไปรษณีย์ได้ | Should |

#### Acceptance Criteria

- ระบบออกบิลได้ ≥ 500 ใบ/นาที (batch billing)
- คำนวณค่าธรรมเนียมผิดพลาด < 0.01% (validated ด้วย test cases)
- ค้นหาบ้านจาก keyword ได้ผลภายใน 500ms
- Approval workflow ส่ง notification ไปยังผู้อนุมัติภายใน 30 วินาที

### 6.2 Epic 1.2 — Payment & Receipt (CORE-PAYMENT)

**Sprint 2–3**

| # | User Story | Priority |
|---|-----------|----------|
| 1.2.1 | Officer รับชำระเงินสดและออกใบเสร็จได้ทันที | Must |
| 1.2.2 | **Officer สแกน Barcode/QR บนบิลกระดาษหรือมือถือ → ดึงบิลขึ้นมาทันที โดยไม่ต้องกรอกมือ** | Must |
| 1.2.3 | Officer ค้นหาบิลด้วยเลขที่บ้าน / ชื่อ / เลขที่บิล (สำหรับสอบถามทางโทรศัพท์) | Must |
| 1.2.4 | ประชาชนชำระผ่าน QR PromptPay บนบิล และรับใบเสร็จ PDF ทาง LINE | Must |
| 1.2.5 | **เมื่อเปิด payment gateway — บิลมี QR Code / payment link ที่ประชาชนสแกนจาก banking app ชำระได้ทันที** | Must |
| 1.2.6 | ระบบตรวจสอบการชำระจาก payment gateway อัตโนมัติ (webhook + idempotency key) | Must |
| 1.2.7 | Officer แบ่งชำระเป็นงวด (installment plan) ได้ | Should |
| 1.2.8 | ระบบคำนวณเบี้ยปรับค้างชำระอัตโนมัติ | Must |
| 1.2.9 | รองรับการคืนเงิน (refund) พร้อม audit trail | Should |

#### Payment Barcode & QR Standard

บิลทุกใบมี 2 code ที่ generate อัตโนมัติเมื่อ issue:

| Code | รูปแบบ | ใช้งาน |
|------|--------|--------|
| **CODE128 Barcode** | 15-digit numeric (`{org_ref:4}{fiscal_yy:2}{seq:9}`) | Officer สแกนด้วย USB/handheld barcode scanner ที่เคาน์เตอร์ |
| **QR Code (ISO 18004)** | encode: payment_ref + bill URL | Officer สแกนจากมือถือ resident (กล้องเว็บ) · resident สแกนด้วย banking app (ถ้าเปิด gateway) |
| **EMVCo PromptPay Bill Payment QR** | Thai Banks Assoc format (Phase 3+) | resident จ่ายผ่าน mobile banking / counter service / ATM โดยไม่ต้องผ่าน officer |

**มาตรฐาน CODE128** รองรับ barcode scanner ทุกยี่ห้อ (USB plug-and-play, Honeywell, Zebra, Datalogic, Symbol/Motorola) — scanner ส่ง keyboard input ปกติ ไม่ต้อง SDK พิเศษ

**ช่องทางชำระเงินต่อ Phase:**
```
Phase 1 (เปิด gateway): 
  Officer counter → scan barcode/QR → รับชำระสด/โอน
  PromptPay QR static (org's PromptPay) → resident จ่ายเอง → webhook confirm

Phase 2 (payment gateway):
  PromptPay dynamic QR บนบิล → resident scan → bank confirm → auto receipt
  payment link (SMS/LINE) → resident กดลิงก์ → จ่ายผ่าน Omise/2C2P

Phase 3 (Biller ID):
  EMVCo QR บนบิล → resident scan → จ่ายผ่าน banking app ทุกธนาคาร
  Counter service (7-11, Family Mart) → scan barcode → รับชำระ
  ATM → เลข payment_ref → โอนชำระ
```

#### Payment Gateway Integration

- **PromptPay QR**: สร้าง QR แบบ static + dynamic, verify ผ่าน Bank API
- **Omise**: Credit/Debit card, internet banking
- **2C2P**: ตัวเลือกสำรอง, รองรับ installment ผ่านบัตร
- **KBank (Phase 3)**: KPlus deep link + Biller ID

### 6.3 Epic 1.3 — Resident Portal (CORE-RESIDENT)

**Sprint 3–4**

| # | User Story | Priority |
|---|-----------|----------|
| 1.3.1 | ประชาชนเข้าสู่ระบบด้วย LINE Login / OTP | Must |
| 1.3.2 | ดูบิลที่ค้างชำระและประวัติย้อนหลัง 2 ปี | Must |
| 1.3.3 | ชำระเงินออนไลน์ผ่าน Web (mobile-first) | Must |
| 1.3.4 | รับแจ้งเตือน LINE ก่อนครบกำหนด 7 และ 3 วัน | Must |
| 1.3.5 | ร้องเรียน/แจ้งปัญหาและติดตามสถานะ | Should |
| 1.3.6 | ดาวน์โหลดใบเสร็จ PDF ย้อนหลัง | Should |

### 6.4 Epic 1.4 — Meter Reading OCR (FIELD-METER)

**Sprint 2–4**

| # | User Story | Priority |
|---|-----------|----------|
| 1.4.1 | Meter Reader เปิดแอป ดูรายการมิเตอร์ที่ต้องจดตามลำดับ GPS | Must |
| 1.4.2 | ถ่ายรูปหน้ามิเตอร์และ OCR ดึงตัวเลขอัตโนมัติ | Must |
| 1.4.3 | ยืนยัน/แก้ไขค่าที่ OCR อ่านได้ก่อน submit | Must |
| 1.4.4 | บันทึกปัญหา (มิเตอร์ชำรุด, เข้าไม่ถึง) พร้อมรูปและ GPS | Must |
| 1.4.5 | ทำงานได้แบบ offline และ sync เมื่อมี internet | Must |
| 1.4.6 | Officer ตรวจสอบและ approve ค่ามิเตอร์ที่ OCR ไม่มั่นใจ | Must |
| 1.4.7 | ระบบสร้างบิลอัตโนมัติจากค่ามิเตอร์ที่ approve แล้ว | Must |

#### OCR Technical Spec

- **Primary**: Google Cloud Vision API (accuracy > 95% สำหรับตัวเลข 5–7 หลัก)
- **Fallback**: Tesseract.js (client-side, ไม่ต้องการ internet)
- **Confidence threshold**: < 0.85 → ต้องให้ Officer review ก่อน approve
- **Photo requirements**: ≥ 720p, < 5MB, JPEG/PNG

### 6.5 Epic 1.5 — Sign Tax System (TAX-SIGN + FIELD-SURVEY)

**Sprint 3–4**

| # | User Story | Priority |
|---|-----------|----------|
| 1.5.1 | Tax Surveyor สำรวจป้ายพร้อมถ่ายรูป + GPS บันทึกลงแอป | Must |
| 1.5.2 | ระบบคำนวณภาษีป้ายอัตโนมัติตาม พ.ร.บ.2510 | Must |
| 1.5.3 | Officer ตรวจสอบและออกใบประเมินภาษีป้าย | Must |
| 1.5.4 | เชื่อมใบประเมินไปยังระบบบิลเพื่อออกบิลภาษีป้าย | Must |
| 1.5.5 | แสดงทะเบียนป้ายทั้งหมดบน map | Should |
| 1.5.6 | รายงานรายได้ภาษีป้ายรายปี | Should |

#### Sign Tax Formula (พ.ร.บ.ภาษีป้าย พ.ศ.2510)

```
ภาษี = MAX(CEIL(พื้นที่_ตร.ซม. / 500) × อัตรา_บาท_ต่อ_500, ขั้นต่ำ_200_บาท)

TYPE1 (อักษรไทยล้วน): 5 บาท/500 ตร.ซม.
TYPE2 (ไทยปนต่างประเทศ): 52 บาท/500 ตร.ซม.
TYPE3 (ต่างประเทศล้วน/ต่างชาติบน): 52 บาท/500 ตร.ซม.
```

### 6.6 Epic 1.6 — Waste Collection Field App (FIELD-WASTE)

**Sprint 1–3**

| # | User Story | Priority |
|---|-----------|----------|
| 1.6.1 | Driver เห็นรายการบ้านที่ต้องเก็บในวันนี้ตามลำดับ | Must |
| 1.6.2 | บันทึก "เก็บแล้ว" / "ข้ามเพราะไม่จ่าย" ต่อบ้าน | Must |
| 1.6.3 | แสดงแผนที่ navigation ไปยังจุดถัดไป | Should |
| 1.6.4 | Officer ดูความคืบหน้า real-time ว่าทริปไปถึงไหนแล้ว | Should |
| 1.6.5 | สรุปผลทริป: เก็บ X บ้าน ข้าม Y บ้าน ใช้เวลา Z ชั่วโมง | Must |
| 1.6.6 | ทำงาน offline ได้ (บันทึกใน local storage, sync เมื่อมี net) | Must |

#### Two-Sided Collection (v3.6 — schema additions)

| # | User Story | Priority |
|---|-----------|----------|
| 1.6.7 | Driver เห็นแผนที่สองฝั่งถนนพร้อมกัน — pin สี 🟢/🔴/🟡/⬜ ต่อบ้านแต่ละหลัง บอก required_action ทันที | Must |
| 1.6.8 | ระบบจัด cluster (จุดจอดรถ) อัตโนมัติ — รถจอดครั้งเดียว คนงานลงสองฝั่งพร้อมกัน | Must |
| 1.6.9 | คนงานบันทึก collect/skip ต่อบ้านในหน้า Cluster Card (D-03) — layout 2 คอลัมน์ ซ้าย/ขวา | Must |
| 1.6.10 | บ้านที่ยังไม่ชำระ ระบบ auto-set required_action = skip — คนงานไม่สามารถ override ได้ | Must |
| 1.6.11 | บันทึก `payment_status_at_collection` จาก DB ณ เวลากด — ใช้เป็น ground truth แทนสติ๊กเกอร์กระดาษ | Must |
| 1.6.12 | บันทึก waste_sorted (คัดแยกขยะ) ต่อบ้านสำหรับบ้านที่ collect — 1 tap | Should |
| 1.6.13 | แสดง overdue_amount บน map pin สีแดง — Driver/Officer เห็นยอดค้างโดยไม่ต้องเปิดบิล | Should |

#### Collection Map PDF — Phase 2

| Feature | รายละเอียด |
|---------|-----------|
| Printable Collection Map | แผนผังเส้นทางแบบ PDF — ระบุบ้านสองฝั่ง, road_side, สถานะการชำระ — พิมพ์ให้พนักงานก่อนออกรถ |
| รูปแบบ | A4 per zone / route — ใช้ข้อมูลจาก `v_collection_route_map` |
| เหตุผลที่เลื่อน Phase 2 | ต้องการ map rendering library (เช่น WeasyPrint + SVG) + ออกแบบ layout ที่ readable บนกระดาษ A4 |

**Business Rule (ไม่เก็บเงิน = ไม่เก็บขยะ):**
```
collection_skip_rule = {
  "skip_unpaid": true,
  "skip_threshold_days": 0,
  "show_unpaid_on_map": true,
  "allow_worker_override": false   ← ห้าม override ทุกกรณี
}
```
ระบบอ่านค่าจาก `organizations.collection_skip_rule` — ปรับได้ต่อ org แต่ default คือ strict ไม่มีข้อยกเว้น

### 6.7 Epic 1.7 — Reporting (CORE-REPORTING)

**Sprint 4**

| รายงาน | รูปแบบ | ความถี่ | Priority |
|--------|--------|---------|----------|
| รายรับรายเดือน/รายไตรมาส | PDF + Excel | On-demand | Must |
| สรุปค้างชำระแยกระดับ | PDF + Excel | Daily auto | Must |
| ความคืบหน้าการจดมิเตอร์รายรอบ | Web dashboard | Real-time | Must |
| สรุปผลทริปเก็บขยะ | Web dashboard | Per-trip | Should |
| รายได้ภาษีป้ายรายปี | PDF + Excel | Annual | Should |
| รายงานสำหรับ สตง. | PDF (standard format) | Quarterly | Should |

### 6.8 Phase 1 — Definition of Done

- [ ] ผ่าน UAT กับ อปท. นำร่อง ≥ 3 แห่ง
- [ ] Uptime ≥ 99.5% ในช่วงทดสอบ 30 วัน
- [ ] เวลา response เฉลี่ย < 2 วินาที สำหรับ API ทั่วไป
- [ ] OCR accuracy ≥ 90% บน test set 500 ภาพ
- [ ] ไม่มี P0/P1 bugs ที่ยังเปิดอยู่
- [ ] Security scan ผ่าน (OWASP Top 10)
- [ ] เอกสาร user manual ภาษาไทย พร้อม video tutorial

---

## 7. Phase 2 — Route Intelligence + Module System

**ระยะเวลา**: เดือน 5–8  
**เป้าหมาย**: เพิ่มความสามารถ AI route optimization และ self-service module management

### 7.1 Epic 2.1 — Module Subscription Management (CORE)

**Sprint 5**

| # | User Story | Priority |
|---|-----------|----------|
| 2.1.1 | Super Admin เปิด/ปิด module ต่อ org ได้จาก console | Must |
| 2.1.2 | Admin ของ org ดูรายการ module ที่เปิดใช้งานอยู่ | Must |
| 2.1.3 | ระบบ enforce feature gate ทุก API endpoint อัตโนมัติ | Must |
| 2.1.4 | Trial period 30 วันสำหรับ module ใหม่ พร้อมแจ้งเตือนก่อนหมด | Should |
| 2.1.5 | Audit log การเปลี่ยน module status ทุกครั้ง | Must |

### 7.2 Epic 2.2 — AI Route Optimization (AI-ROUTE)

**Sprint 5–7**

#### User Stories

| # | User Story | Priority |
|---|-----------|----------|
| 2.2.1 | Officer กด "สร้างเส้นทางอัตโนมัติ" สำหรับวันพรุ่งนี้ | Must |
| 2.2.2 | ระบบ solve VRP แล้วแสดง route ที่ optimize แล้วบน map | Must |
| 2.2.3 | Officer ตรวจสอบและ approve route ก่อน assign ให้ Driver | Must |
| 2.2.4 | ระบบแสดง % ที่ประหยัดได้เทียบกับ route เดิม | Should |
| 2.2.5 | รองรับข้อจำกัด: รถแต่ละคันรับน้ำหนักได้ไม่เกิน X, ต้องจบที่ depot | Must |
| 2.2.6 | Re-optimize ระหว่างทริปเมื่อมีการเพิ่ม/ลดจุด | Should |
| 2.2.7 | Driver เห็น route ที่ optimize แล้วใน Driver App | Must |

#### VRP Constraints

**Hard Constraints (ต้องทำตามเสมอ)**:
- ทุก stop ต้องอยู่ใน route ของรถอย่างน้อย 1 คัน
- น้ำหนักรวมต้องไม่เกิน capacity ของรถ
- ต้องออกจาก depot และกลับ depot
- รถต้องกลับก่อนเวลา end_time

**Soft Constraints (พยายามทำตาม)**:
- Minimize total distance
- Minimize total time
- ลด time window violations
- กระจาย workload ระหว่างรถให้สมดุล

#### Technical Implementation

```
Phase 2: Google OR-Tools (open source VRP solver)
  - FastAPI Python worker (native integration — ไม่ต้องมี microservice แยก)
  - รองรับ CVRP, VRPTW
  - Solve time < 30 วินาที สำหรับ ≤ 200 stops
  - run ใน Celery worker (async, ไม่ block main API)

Phase 4+: Google Maps Route Optimization API
  - รองรับ real-time traffic
  - รองรับ > 1,000 stops
  - เฉพาะ Enterprise tier ที่มีขนาดใหญ่
```

### 7.3 Epic 2.3 — Geo-fencing Verification

**Sprint 6**

| # | User Story | Priority |
|---|-----------|----------|
| 2.3.1 | Driver ต้องอยู่ในรัศมี 50 เมตรจากจุดจัดเก็บก่อน check-in ได้ | Must |
| 2.3.2 | Meter Reader ต้องอยู่ในรัศมี 20 เมตรจากมิเตอร์ก่อน submit ได้ | Must |
| 2.3.3 | ระบบ alert เมื่อพยายาม check-in ผิดสถานที่ | Must |
| 2.3.4 | Officer เห็น GPS track ของรถแต่ละคันแบบ real-time | Should |

### 7.4 Epic 2.4 — Sticker Premium Service (FIELD-STICKER)

**Sprint 7**

| # | User Story | Priority |
|---|-----------|----------|
| 2.4.1 | ออกสติ๊กเกอร์รายครัวเรือนพร้อมบาร์โค้ด/QR | Must |
| 2.4.2 | Driver scan สติ๊กเกอร์เพื่อยืนยันการเก็บขยะ | Should |
| 2.4.3 | บ้านที่ค้างชำระ ≥ 2 เดือน ไม่ได้รับสติ๊กเกอร์ใหม่ | Must |
| 2.4.4 | Officer ดูรายงานบ้านที่ยังไม่ได้รับสติ๊กเกอร์ | Should |

### 7.5 Epic 2.5 — Dunning Automation (AI-DUNNING Phase 2 Foundation)

**Sprint 7–8** *(schema พร้อมแล้วใน v3.3–v3.4 — sprint นี้ focus ที่ Celery workers + UI)*

| # | User Story | Priority |
|---|-----------|----------|
| 2.5.1 | Celery worker รันตาม dunning policy ของแต่ละ org อัตโนมัติทุกวัน | Must |
| 2.5.2 | Officer ตั้งค่า dunning policy (จำนวนขั้น, วัน offset, ช่องทาง) ผ่าน UI (O-30, O-31) | Must |
| 2.5.3 | ระบบส่งหนังสือเตือน + email + LINE ตาม policy step อัตโนมัติ — โดยเรียก `check_channel_consent()` ก่อนส่งทุกช่องทาง | Must |
| 2.5.4 | Officer บันทึก outcome ต่อหนังสือเตือนและเลือก next action (O-35, O-36) | Must |
| 2.5.5 | Officer ดูประวัติ dunning run และสถิติ response rate (O-33, O-34, O-37) | Should |
| 2.5.6 | ประชาชนเห็นหนังสือเตือนและปุ่มชำระใน Resident Portal (R-07, R-08) | Must |

**Celery Worker Types (Phase 2):**
- `dunning_scheduler` — scan overdue bills รายวัน, trigger policy steps ตาม day_offset
- `notification_sender` — ส่ง postal / email / LINE / SMS — ตรวจ consent ผ่าน `check_channel_consent()` ทุกครั้ง
- `billing_batch` — สร้างบิลรายรอบ batch (ACID-safe via advisory lock + checkpoint)

### 7.6 Epic 2.6 — Communication Channel Consent Management (CONSENT)

**Sprint 7** *(schema v3.7–v3.8 — `org_channel_activations`, `resident_channel_consents`, `check_channel_consent()`)*

**หลักการ — 2-Layer Gate:**

```
Layer 1 (Org Admin): เปิด channel + ยืนยันค่าใช้จ่าย → is_active = TRUE
     ↓ เมื่อผ่าน Layer 1 เท่านั้น
Layer 2 (Resident):  ประชาชนเห็น opt-in toggle → เลือก consent
     ↓ เมื่อผ่านทั้ง 2 Layer
ระบบส่ง notification ผ่าน channel นั้นได้
```

| ช่องทาง | Layer 1 (Org) | Layer 2 (Resident) | ส่งโดยไม่ผ่าน gate |
|---------|--------------|-------------------|-------------------|
| ไปรษณีย์ | ไม่ต้อง — ส่งได้เสมอ | ไม่ต้อง | ส่งได้เสมอ |
| Email | activate + acknowledge cost | resident consent + email verified | ห้ามส่ง |
| LINE | activate + acknowledge cost + เลขคำสั่งอนุมัติ | resident consent | ห้ามส่ง |
| SMS | activate + acknowledge cost | resident consent | ห้ามส่ง |

**Org Display Name:**

ทุก notification และเอกสารทางการต้องใช้ชื่อหน่วยงานจริง ไม่ใช้คำว่า "อปท."

| Template Variable | ค่า | ที่มา |
|------------------|-----|------|
| `{{org_display_name}}` | "เทศบาลตำบลบางรัก" | `organizations.display_name` (Admin กรอกใน A-01) |
| `{{org_display_name_short}}` | "ทต.บางรัก" | `organizations.display_name_short` |
| `{{org_address}}` | ที่อยู่หน่วยงาน | `organizations.display_address` |
| `{{org_phone}}` | เบอร์โทรติดต่อ | `organizations.display_phone` |

**กฎ:** ทุก dunning letter template, LINE message, SMS, email ต้องใช้ `{{org_display_name}}` เสมอ ห้าม hardcode "อปท." หรือ "หน่วยงาน" ใน template

| # | User Story | Priority |
|---|-----------|----------|
| 2.6.1 | Admin กรอกชื่อหน่วยงาน (`display_name`) และชื่อย่อ (`display_name_short`) ใน Organization Settings (A-01) — ใช้ใน template ทุกประเภท | Must |
| 2.6.2 | Admin เปิดใช้งาน channel (email/LINE/SMS) ใน Channel Management (A-05) — ต้อง tick "รับทราบค่าใช้จ่าย" ก่อนกด "เปิดใช้งาน" | Must |
| 2.6.3 | สำหรับ LINE: Admin กรอกเลขคำสั่ง/ระเบียบที่อนุมัติใช้ LINE เป็นช่องทางราชการ ก่อน activate ได้ | Must |
| 2.6.4 | ประชาชนเห็น opt-in toggle เฉพาะ channel ที่ org activate แล้ว (R-13) — channel ที่ยังไม่ activate ซ่อนทั้งหมด | Must |
| 2.6.5 | ประชาชนสามารถถอน consent (revoke) ต่อช่องทางได้ตลอดเวลา — ระบบหยุดส่งทันที | Must |
| 2.6.6 | Officer บันทึก consent แทนประชาชนที่มายื่นแบบฟอร์มกระดาษที่ counter (consent_method = paper_form) — พร้อม consent_ref เลขที่เอกสาร | Must |
| 2.6.7 | ประชาชน verify email ผ่าน link (R-14) ก่อนระบบส่ง email ครั้งแรก | Must |
| 2.6.8 | ระบบ audit log ทุกการเปลี่ยนแปลง consent_status + channel activation พร้อม timestamp + actor | Must |

### 7.7 Epic 2.7 — Overpayment: Credit Balance & Refund (CORE-CREDIT)

**Sprint 6** *(schema v3.9 — `household_credit_balances`, `credit_transactions`, `refund_requests`)*

**Business rule:** ประชาชนจ่ายเงินเกิน (เช่น บิล 1,800 แต่โอน 1,808 หรือ 1,888) → ระบบ routing อัตโนมัติตาม threshold ที่ org กำหนด

**Routing flow:**

```
จ่ายเกิน ≤ 100 บาท (auto_credit_threshold)
  → credit อัตโนมัติ → แจ้ง resident ทาง notification

จ่ายเกิน > 100 บาท
  → pending → แจ้ง officer (O-40) → เลือก:
     ├─ credit → หักบิลถัดไป (ไม่ต้อง approval)
     └─ refund → approval workflow → โอนคืน
```

| # | User Story | Priority |
|---|-----------|----------|
| 2.7.1 | ระบบตรวจจับยอดเงินเกินหลัง payment webhook สำเร็จ — เรียก `handle_overpayment()` อัตโนมัติ | Must |
| 2.7.2 | เงินเกินน้อย (≤ threshold) → credit อัตโนมัติ — resident รับ notification "ยอดเงิน XX บาท เก็บเป็น credit หักบิลถัดไป" | Must |
| 2.7.3 | เงินเกินมาก (> threshold) → แจ้ง officer ใน O-40 — Officer เลือก credit หรือ refund | Must |
| 2.7.4 | Officer เลือก refund → สร้าง refund_requests → approval workflow → บันทึกข้อมูลบัญชีธนาคาร → โอนคืน | Must |
| 2.7.5 | ระบบ apply credit ลงบิลถัดไปอัตโนมัติ (credit_auto_apply = true) ในช่วง billing cycle | Must |
| 2.7.6 | Officer apply credit ลงบิลได้ด้วยตนเอง (manual) ผ่าน O-40 | Should |
| 2.7.7 | Resident เห็น credit balance + ประวัติ credit transaction ใน R-15 | Must |
| 2.7.8 | บิลที่มี credit_applied แสดงรายการ "หักจาก credit XX บาท" ชัดเจนใน R-04 (Bill Detail) | Must |
| 2.7.9 | Admin ปรับ `auto_credit_threshold` และ policy ต่อ org ได้ | Should |

**ACID guarantee:**
- `apply_credit_to_bill()` ใช้ `SELECT FOR UPDATE` บน `household_credit_balances` — ป้องกัน race condition กรณีหลาย bill apply credit พร้อมกัน
- `handle_overpayment()` เรียกใน REPEATABLE READ transaction เดียวกับ payment processing

### 7.8 Epic 2.8 — External API Integrations & Payment Gateway Security (CORE-INTEGRATIONS)

**Sprint 6–7** *(schema v3.10 — `org_external_api_integrations`, `credential_access_logs`, payment_gateways secret columns)*

**หลักการ:** แต่ละ อปท. มี credential API รัฐเป็นของตัวเอง (ยื่นขอแยกกับหน่วยงานต้นสังกัด) — Gismo ไม่มีสิทธิ์เข้าถึงข้อมูล sensitive บางประเภท (บัตรประชาชน, ทะเบียนราษฎร) — ระบบ Dual-Mode:
- **Proxy Mode** (non-sensitive: กรมที่ดิน, กรมพัฒนาธุรกิจ ฯลฯ) — Gismo fetch ผ่าน AWS Secrets Manager + IAM
- **Zero-Knowledge Mode** (sensitive: กระทรวงมหาดไทย, กรมการปกครอง) — org admin encrypt client-side ก่อน POST, Gismo ไม่สามารถถอดรหัสได้

**Payment Gateway credential separation:**

| Storage Mode | การใช้งาน | ใครกรอก |
|-------------|----------|---------|
| `secrets_manager` | Gismo-managed gateways (proxy) | Gismo Super Admin |
| `encrypted_local` | Org-managed gateways (AES-GCM) | Org Admin |

| # | User Story | Priority |
|---|-----------|----------|
| 2.8.1 | SA-xx: Gismo Super Admin กำหนดค่า payment gateway ระดับ Platform — เลือก live/sandbox mode, บันทึก secret ลง AWS Secrets Manager, กด "Verify Connection" | Must |
| 2.8.2 | A-06: Org Admin กรอก credentials ของ payment gateway ของ org เอง (เช่น PromptPay ref ของ อปท.) — encrypt client-side ก่อน POST | Must |
| 2.8.3 | A-07: Org Admin กรอก credentials ของ API ราชการ (เช่น API Token กรมที่ดิน) — ระบบแสดงว่า provider ใดเป็น proxy mode / zero-knowledge | Must |
| 2.8.4 | ระบบตรวจสอบ proxy_mode ก่อน routing request — proxy → Gismo fetch secret → call API; non-proxy → org call โดยตรง ผ่าน client | Must |
| 2.8.5 | ทุก credential fetch (proxy mode) ต้องเรียก `log_credential_access()` — บันทึก caller, purpose, success, response_time_ms | Must |
| 2.8.6 | `v_org_api_integration_status`: Officer/SA เห็นสถานะ integration ต่อ provider — configured/pending/error — โดย **ไม่เห็นค่า credential** ใด ๆ | Must |
| 2.8.7 | Org Admin เห็นว่า provider ใดเป็น zero-knowledge (sensitive) — รายละเอียดว่า Gismo ไม่สามารถอ่าน credential ได้ | Should |
| 2.8.8 | ระบบ verification: กด "ทดสอบการเชื่อมต่อ" → ping API endpoint → บันทึก verification_status ใน payment_gateways / org_external_api_integrations | Should |
| 2.8.9 | Gismo Super Admin ไม่สามารถอ่าน `credentials_client_encrypted` ได้ — enforced at application layer (column excluded จาก all SA queries) | Must |
| 2.8.10 | credential_access_logs: SA query ดู audit trail ทุก fetch — who, when, purpose, success, latency | Should |

**Security Architecture:**
```
Payment Gateway (org-level):
  ├─ Gismo-managed → secret_ref (AWS SM ARN) → IAM fetch → Gismo proxy
  └─ Org-managed   → api_key_encrypted (AES-GCM) → org admin decrypt → direct call

Government API (per org, per provider):
  ├─ Non-sensitive (land_dept, dbd) → proxy_mode=TRUE → secret_ref → Gismo proxy
  └─ Sensitive (moi_citizen, dopa) → proxy_mode=FALSE → credentials_client_encrypted
       → org system call API โดยตรง, Gismo ไม่รับข้อมูล sensitive
```

**PDPA / legal note:**
- Zero-knowledge mode สำหรับ API บัตรประชาชน / ทะเบียนราษฎร → Gismo ไม่เป็น processor ของข้อมูลส่วนบุคคลระดับ sensitive
- ทุก credential เข้าถึงได้เฉพาะ org นั้น ผ่าน RLS (org_id isolation)

### 7.9 Phase 2 — Definition of Done

- [ ] Route optimization ลด total distance ≥ 15% เทียบกับ baseline manual route (validated บน data จริง)
- [ ] Solve time < 30 วินาที สำหรับ 200 stops บน production server
- [ ] Geo-fencing ทำงานถูกต้อง 99%+ (GPS accuracy ±10m)
- [ ] Module gate ทุก endpoint ผ่าน integration tests
- [ ] อปท. ≥ 5 แห่ง ใช้ AI route optimization จริง
- [ ] Celery dunning worker ทำงานอัตโนมัติ ≥ 7 วัน โดยไม่มี incident
- [ ] Dunning UI (O-30 ถึง O-38) ผ่าน UAT กับ อปท. นำร่อง

---

## 8. Phase 3 — Analytics + AI Intelligence

**ระยะเวลา**: เดือน 9–12  
**เป้าหมาย**: เพิ่ม intelligence layer ด้วย ML model และ advanced analytics

### 8.1 Epic 3.1 — Predictive Arrears Risk Scoring (AI-PREDICT)

**Sprint 9–10**

ระบบ ML ที่ประเมินโอกาสที่ครัวเรือนจะค้างชำระในเดือนถัดไป

**Input Features**:

| Feature | Description |
|---------|-------------|
| `payment_history_6m` | ประวัติการชำระ 6 เดือนล่าสุด (on-time/late/missed) |
| `avg_days_late` | จำนวนวันเฉลี่ยที่ชำระช้า |
| `current_arrears_amount` | ยอดค้างชำระปัจจุบัน |
| `num_installment_plans` | จำนวนแผนผ่อนชำระที่เคยทำ |
| `service_count` | จำนวน services ที่ subscribe |
| `household_size` | จำนวนสมาชิก |
| `property_type` | residential / commercial / industrial |
| `season` | เดือน (ค่าใช้จ่ายสูงในช่วงเปิดเทอม เป็นต้น) |
| `bill_amount_trend` | แนวโน้มยอดบิล 3 เดือน |

**Output**: Risk Score 0–100, กลุ่มสี (🟢 Low / 🟡 Medium / 🔴 High)

**ML Pipeline**:
- Phase 3 start: Logistic Regression (interpretable, fast to train)
- Phase 3 mid: Random Forest (accuracy ↑ ~5–8%)
- Phase 4: Gradient Boosting / Neural Net (ถ้า data ≥ 100K records)

### 8.2 Epic 3.2 — Smart Dunning Enhancement (AI-DUNNING)

**Sprint 10–11** *(Phase 2 วาง foundation แล้ว — Phase 3 เพิ่ม intelligence)*

Phase 2 วางระบบ Dunning อัตโนมัติพื้นฐานแล้ว Phase 3 ขยายด้วย ML-driven decisions:

```
ตัวอย่าง escalation policy (configurable ต่อ org):
  Day 0  (due date):   → LINE Notify "บิลครบกำหนดวันนี้"
  Day 7  (overdue):    → LINE + SMS "ค้างชำระ กรุณาติดต่อ"
  Day 14 (overdue):    → LINE + SMS + ออกหนังสือเตือนอย่างเป็นทางการ
  Day 30 (overdue):    → Assign เจ้าหน้าที่ออกพื้นที่ (next action: schedule_visit)
  Day 60 (overdue):    → งดบริการ (next action: suspend_service)
  Day 90 (overdue):    → ดำเนินการทางกฎหมาย (next action: legal_referral)
```

| # | User Story | Priority |
|---|-----------|----------|
| 3.2.1 | ระบบปรับ dunning intensity อัตโนมัติตาม risk score (high risk → aggressive) | Should |
| 3.2.2 | ML แนะนำ next action ที่มีโอกาสสูงสุดที่จะทำให้ชำระ | Should |
| 3.2.3 | รายงาน dunning effectiveness cross-org (anonymized benchmarking) | Should |
| 3.2.4 | Super Admin เห็น global dunning audit log (SA-09) | Must |

### 8.3 Epic 3.3 — BI Dashboard & Advanced Analytics (PLAT-BI)

**Sprint 11–12**

| Dashboard | Metrics | กลุ่มผู้ใช้ |
|-----------|---------|-----------|
| Revenue Dashboard | รายรับรวม, เทียบเดือนก่อน, YTD | ผู้บริหาร |
| Collection Efficiency | อัตราจัดเก็บ, ค้างชำระ, trend | ผู้บริหาร |
| Field Operations | Trip completion rate, stop efficiency | Supervisor |
| Meter Reading | OCR accuracy, round completion % | Supervisor |
| Risk Heatmap | แผนที่แสดง risk score รายพื้นที่ | Officer |
| Module Usage | feature adoption per module | Super Admin |

### 8.4 Epic 3.4 — Land & Building Tax (TAX-PROPERTY)

**Sprint 9–10** (ถ้า customer demand สูง)

- คำนวณภาษีตาม พ.ร.บ.ภาษีที่ดินและสิ่งปลูกสร้าง พ.ศ.2562
- เชื่อมกับฐานทะเบียนที่ดิน (manual import ก่อน, API integration ใน Phase 4)
- ประเมินภาษีรายแปลง, ออกใบประเมิน, รับชำระ

---

## 9. Phase 4 — Scale + Enterprise

**ระยะเวลา**: เดือน 13+  
**เป้าหมาย**: Scale ไปยัง 500+ อปท., เพิ่มความสามารถ Enterprise

### 9.1 Enterprise Features

| Feature | คำอธิบาย |
|---------|----------|
| White-label | Custom branding ต่อ อปท. (logo, สี, domain) |
| Data export API | ส่งข้อมูลไป ERP / ระบบของจังหวัด |
| Multi-org reporting | รายงานรวมหลาย อปท. สำหรับ อบจ. |
| SSO / Active Directory | สำหรับ อปท. ที่มี IT infrastructure แล้ว |
| Custom approval workflows | กำหนด workflow ที่ซับซ้อนได้เอง |
| Backup & DR | Cross-region backup, RTO < 1 ชั่วโมง |

### 9.2 Google Maps Route Optimization API (AI-ROUTE Enterprise)

- รองรับ > 1,000 stops
- Real-time traffic integration
- Multi-day planning
- กรณีพิเศษ: เส้นทางน้ำ, ถนนปิดซ่อม

### 9.3 Citizen CRM (PLAT-CRM)

- Unified ticket system สำหรับทุกช่องทาง (LINE, walk-in, phone, web)
- SLA tracking per ticket category
- Knowledge base สำหรับ officer ตอบคำถามบ่อย

### 9.4 Marketplace & 3rd Party Integration

- API marketplace สำหรับ vendors อื่น (accounting software, GIS systems)
- Integration กับ GFMIS (ระบบการเงินการคลังภาครัฐ) ถ้า feasible
- Integration กับ e-GP (ระบบจัดซื้อจัดจ้าง)

---

## 10. Non-Functional Requirements

### 10.1 Performance

| Metric | Target | Critical Threshold |
|--------|--------|------------------|
| API Response (p95) | < 500ms | < 2,000ms |
| Batch billing (1,000 bills) | < 30 วินาที | < 120 วินาที |
| OCR processing | < 5 วินาที | < 15 วินาที |
| VRP solve (200 stops) | < 30 วินาที | < 120 วินาที |
| Dashboard load | < 3 วินาที | < 8 วินาที |
| DB query (p99) | < 100ms | < 500ms |

### 10.2 Availability & Reliability

| Metric | Target |
|--------|--------|
| Uptime (production) | 99.9% (< 8.7 ชั่วโมง/ปี downtime) |
| Planned maintenance window | ไม่เกิน 2 ชั่วโมง/เดือน (01:00–03:00 น.) |
| RTO (Recovery Time Objective) | < 1 ชั่วโมง |
| RPO (Recovery Point Objective) | < 15 นาที |
| Backup frequency | ทุก 6 ชั่วโมง (database), real-time WAL streaming |

### 10.3 Scalability

| Dimension | Phase 1 | Phase 2 | Phase 4 |
|-----------|---------|---------|---------|
| Organizations | 10 | 50 | 500+ |
| Households per org | 10,000 | 30,000 | 100,000+ |
| Concurrent users | 100 | 500 | 5,000 |
| API requests/second | 100 | 500 | 5,000 |
| Storage (total) | 100 GB | 1 TB | 10+ TB |

### 10.4 Offline Capability (Mobile Apps)

- Field apps (Driver, Meter Reader, Tax Surveyor) ต้องทำงานได้เมื่อไม่มี internet
- Local storage: IndexedDB / SQLite (≥ 500 records per session)
- Sync strategy: Last-write-wins สำหรับ field records, conflict resolution แบบ manual สำหรับ office data
- Sync queue จะ process อัตโนมัติเมื่อมี connection กลับ

### 10.5 Accessibility

- ภาษาไทยเป็นหลัก ทุก UI element
- รองรับ font size ≥ 16px ใน mobile apps (ผู้ใช้สูงอายุ)
- Color contrast ratio ≥ 4.5:1 (WCAG AA)
- Error messages อธิบายชัดเจนเป็นภาษาไทย

---

## 11. Integration Requirements

### 11.1 Payment Gateways

| Gateway | ช่องทาง | Phase | Notes |
|---------|--------|-------|-------|
| PromptPay (ธนาคารแห่งประเทศไทย) | QR Code | Phase 1 | ผ่าน aggregator (Omise/2C2P) |
| Omise | Credit/Debit, Internet Banking | Phase 1 | Sandbox ทดสอบ |
| 2C2P | Credit Card, Installment | Phase 2 | Backup gateway |
| KBank KPlus | Deep link | Phase 3 | ถ้า KBank API พร้อม |

### 11.2 Messaging & Notification

| Service | ใช้งาน | Phase |
|---------|--------|-------|
| ไปรษณีย์ไทย | หนังสือราชการลงทะเบียน (dunning) — ไม่ต้อง consent | Phase 1 |
| AWS SES (Email) | แจ้งเตือนบิล, หนังสือเตือน, email verify — ต้อง consent | Phase 1 |
| LINE Messaging API | แจ้งเตือนบิล, รับชำระ, dunning — ต้องมี org authorization + resident consent | Phase 1 |
| LINE Login | Resident authentication | Phase 1 |
| Twilio SMS | Fallback / ช่องทางเสริม — ต้อง consent | Phase 2 |
| Firebase Cloud Messaging | Mobile app push notifications | Phase 2 |

### 11.3 OCR & AI Services

| Service | ใช้งาน | Phase |
|---------|--------|-------|
| Google Cloud Vision API | Meter reading OCR (primary) | Phase 1 |
| Tesseract.js | OCR fallback (client-side) | Phase 1 |
| Google Maps Platform | Maps, geocoding, navigation | Phase 1 |
| Google OR-Tools | VRP route optimization | Phase 2 |
| Google Maps Route Optimization API | Enterprise VRP | Phase 3 |

### 11.4 Infrastructure (AWS Bangkok — ap-southeast-7)

| Service | ใช้งาน | หมายเหตุ |
|---------|--------|---------|
| **AWS RDS PostgreSQL Multi-AZ** | Primary database | Bangkok region, WAL streaming, automated backup |
| **AWS S3** | Photos, documents, exports | Bangkok region, encryption at rest, presigned URLs |
| **AWS ECS Fargate** | FastAPI backend containers | Serverless containers, auto-scaling |
| **AWS ElastiCache (Redis)** | Celery broker + result backend, session cache | Bangkok region |
| **AWS API Gateway (HTTP API)** | Managed API entry point, JWT auth, rate limiting | $1/million calls |
| **AWS CloudFront** | CDN, SSL termination, static assets | Edge ใกล้ไทย |
| **AWS WAF** | DDoS protection, OWASP rule set | บังคับสำหรับ financial system |
| **AWS CloudTrail + CloudWatch** | Audit log ระดับ infrastructure, APM | ตาม Cybersecurity Act พ.ศ.2562 |
| Sentry | Application error monitoring | 3rd-party SaaS |
| Datadog | APM + infrastructure metrics | 3rd-party SaaS |

---

## 12. Security & Compliance

### 12.1 Authentication & Authorization

- **JWT tokens** พร้อม short expiry (access: 15 นาที, refresh: 7 วัน)
- **Row Level Security (RLS)**: ทุก database query ผ่าน RLS policies ที่ enforce `org_id`
- **Role-based access**: super_admin, admin, officer, supervisor, meter_reader, driver, tax_surveyor, resident
- **Module gate**: ทุก feature endpoint ตรวจสอบ `org_module_subscriptions` ก่อนให้ access
- **MFA**: บังคับสำหรับ super_admin และ admin roles

### 12.2 Data Protection

- **Encryption at rest**: Google Cloud SQL Encryption (AES-256)
- **Encryption in transit**: TLS 1.3 สำหรับทุก connection
- **PII fields**: เข้ารหัส `national_id`, `phone`, `email` ใน application layer ก่อนเก็บ
- **Audit logs**: ทุก write operation บันทึกลง `audit_logs` พร้อม user, timestamp, IP
- **Data retention**: บิล/ใบเสร็จ เก็บ 7 ปีตาม พ.ร.บ.บัญชี, audit logs เก็บ 5 ปี

### 12.3 Thai Legal Compliance

| กฎหมาย | ข้อกำหนด | Implementation |
|--------|---------|---------------|
| พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล (PDPA) 2562 | ขอ consent ก่อนเก็บ PII, ให้ลบได้ | Consent management, data deletion API |
| PDPA มาตรา 28 — Data Residency | ห้ามโอนข้อมูลส่วนบุคคลออกนอกราชอาณาจักร | **AWS Bangkok (ap-southeast-7)** — ข้อมูลทั้งหมดอยู่ในไทย, ไม่มี cross-region replication |
| พ.ร.บ.ความมั่นคงปลอดภัยไซเบอร์ 2562 | ระบบสำคัญต้องมีมาตรการรักษาความปลอดภัย, บันทึก log | AWS WAF + CloudTrail + encryption at rest/transit, penetration test ทุก 6 เดือน |
| พ.ร.บ.ว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ 2550 | Log การเข้าถึงระบบ | Comprehensive audit logs + AWS CloudTrail |
| ระเบียบกระทรวงมหาดไทยว่าด้วยการรับเงิน | ใบเสร็จมีเลขที่ sequential | `receipt_sequences` per org per fiscal year |
| พ.ร.บ.ภาษีป้าย 2510 | คำนวณภาษีถูกต้องตามประเภท/ขนาด | `calculate_sign_tax()` function + unit tests |

### 12.5 Data Residency Architecture

ทุก PII และข้อมูลการเงินของ อปท. ต้องอยู่ภายในไทย:

```
[Users / อปท.]
      │
      ▼
[AWS CloudFront] — Edge cache (static assets เท่านั้น)
      │
      ▼
[AWS API Gateway — ap-southeast-7 Bangkok]
      │
      ▼
[AWS ECS Fargate — FastAPI] ─── [AWS ElastiCache Redis]
      │
      ▼
[AWS RDS PostgreSQL Multi-AZ — Bangkok]   [AWS S3 — Bangkok]

ไม่มีการส่งข้อมูล PII ออกนอก ap-southeast-7
OCR: ภาพมิเตอร์ส่งไป Google Vision API แบบ stripped (ไม่มีชื่อ/ที่อยู่)
      ถ้า org ต้องการ full PDPA compliance → ใช้ Tesseract fallback ในประเทศ
```

### 12.4 Security Testing

- **OWASP Top 10** ตรวจสอบก่อน launch แต่ละ Phase
- **Penetration testing** ทุก 6 เดือน (Phase 2 เป็นต้นไป)
- **Dependency scanning** ทุก CI/CD run (npm audit, snyk)
- **SQL injection prevention**: Parameterized queries ทุกที่, ห้าม string concatenation

---

## 13. Success Metrics & KPIs

### 13.1 Business Metrics

| Metric | Phase 1 Target | Phase 2 Target | Phase 4 Target |
|--------|---------------|---------------|---------------|
| Organizations (paying) | 5 | 25 | 200 |
| Monthly Recurring Revenue | 50,000 บาท | 300,000 บาท | 3,000,000 บาท |
| Churn rate (monthly) | < 5% | < 3% | < 2% |
| NPS Score | > 30 | > 40 | > 50 |
| Average Revenue per Org | 10,000 บาท | 12,000 บาท | 15,000 บาท |

### 13.2 Product Metrics

| Metric | Target | วิธีวัด |
|--------|--------|--------|
| Bill generation automation rate | ≥ 95% ออกบิลโดยไม่ต้องสร้างด้วยมือ | bills.created_by = 'system' / total |
| Payment on-time rate | เพิ่ม ≥ 20% เทียบ before-system | (paid_on_time / total_bills) per org |
| OCR accuracy rate | ≥ 90% ไม่ต้องแก้ไขด้วยมือ | ocr_reviewed = false / total |
| Route optimization savings | ≥ 15% ลดระยะทาง | improvement_pct ใน route_optimization_jobs |
| Field app adoption | ≥ 80% ของ trip ทำผ่านแอป | trips_with_events / total_trips |
| Dunning response rate | ≥ 30% ชำระภายใน 7 วันหลังได้รับ dunning | — |

### 13.3 Technical Metrics

| Metric | Target |
|--------|--------|
| API uptime | ≥ 99.9% |
| Mean time to detect (MTTD) | < 5 นาที |
| Mean time to resolve (MTTR) | < 2 ชั่วโมง (P1 bugs) |
| Test coverage | ≥ 80% unit, ≥ 60% integration |
| Deployment frequency | ≥ 2 ครั้ง/สัปดาห์ |
| Lead time for change | < 3 วัน (feature → production) |

---

## 14. สิ่งที่อยู่นอกขอบเขต (Out of Scope)

### Phase 1 Out of Scope
- AI route optimization (Phase 2)
- ML risk scoring (Phase 3)
- ภาษีที่ดินและสิ่งปลูกสร้าง (Phase 3)
- White-label / custom branding (Phase 4)
- Integration กับ GFMIS หรือ e-GP (Phase 4)
- Multi-language support (ภาษาอังกฤษ, ภาษาพม่าสำหรับแรงงานต่างด้าว) — Phase 4
- Native iOS/Android apps (PWA ก่อน, Native ใน Phase 3 ถ้า demand สูง)

### ไม่อยู่ใน Roadmap ปัจจุบัน
- ระบบบัญชี (ERP) — เน้นเป็น integration partner แทน
- การบริหารบุคลากร (HR) ของ อปท.
- ระบบ e-Procurement / จัดซื้อจัดจ้าง
- Property valuation (ประเมินราคาที่ดิน)

---

## 15. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| อปท. ต้านทานการเปลี่ยนแปลง | สูง | สูง | Change management program, champion user ต่อ org, training ภาษาไทย |
| Internet ไม่เสถียรในพื้นที่ห่างไกล | สูง | สูง | Offline-first design ทุก field app, sync queue |
| OCR accuracy ต่ำกับมิเตอร์เก่า/สกปรก | กลาง | กลาง | Confidence threshold + manual review workflow, Tesseract fallback |
| Payment gateway downtime | กลาง | สูง | Multi-gateway fallback (Omise → 2C2P), cash fallback always available |
| ข้อมูล PII รั่วไหล | ต่ำ | สูง | RLS, encryption, penetration testing, PDPA compliance |
| Vendor lock-in กับ AWS | ต่ำ–กลาง | กลาง | ใช้ Docker/ECS (portable), RDS PostgreSQL (standard), abstract S3 via interface; migration path ไป GCP/Azure documented ถ้าจำเป็น |
| OR-Tools performance ไม่พอ > 200 stops | กลาง | กลาง | Benchmark early ใน Phase 2, pre-plan upgrade path ไป Google Maps Opt. API ใน Phase 4 |
| ลูกค้า อปท. ขนาดใหญ่ต้องการ customization | สูง | กลาง | Module config via JSONB, avoid hard-coding customer-specific logic |
| พ.ร.บ./ระเบียบเปลี่ยนแปลง (เช่น อัตราภาษีป้าย) | กลาง | กลาง | Config-driven rates (sign_tax_rates table), ไม่ hardcode ใน code |

---

## 16. Glossary

| คำศัพท์ | ความหมาย |
|--------|----------|
| อปท. | องค์กรปกครองส่วนท้องถิ่น (เทศบาล, อบต., อบจ., กทม., เมืองพัทยา) |
| อบต. | องค์การบริหารส่วนตำบล |
| อบจ. | องค์การบริหารส่วนจังหวัด |
| Org | Organization — 1 อปท. ใน multi-tenant system |
| RLS | Row Level Security — PostgreSQL feature สำหรับแยกข้อมูลต่อ tenant |
| VRP | Vehicle Routing Problem — ปัญหาการจัดเส้นทางหลายรถ |
| CVRP | Capacitated VRP — VRP ที่มีข้อจำกัดด้านน้ำหนัก/ปริมาตร |
| VRPTW | VRP with Time Windows — VRP ที่มีกรอบเวลา |
| OCR | Optical Character Recognition — อ่านตัวเลขจากรูปถ่าย |
| Module Gate | Feature gating ที่ตรวจสอบ module subscription ก่อนอนุญาต |
| Dunning | กระบวนการทวงหนี้อย่างเป็นระบบ |
| สตง. | สำนักงานการตรวจเงินแผ่นดิน |
| พ.ร.บ.ภาษีป้าย 2510 | พระราชบัญญัติภาษีป้าย พ.ศ.2510 — กฎหมายภาษีป้ายโฆษณา |
| PDPA | Personal Data Protection Act — พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล |
| PromptPay | ระบบโอนเงินพร้อมเพย์ ธนาคารแห่งประเทศไทย |
| Tier | ระดับ subscription (Starter → Professional → Enterprise) |
| Sprint | รอบการพัฒนา 2 สัปดาห์ |
| UAT | User Acceptance Testing — การทดสอบโดย end users |
| P1 Bug | Priority 1 Bug — bug ที่กระทบ production อย่างร้ายแรง |
| WAL | Write-Ahead Log — PostgreSQL mechanism สำหรับ streaming replication |
| RTO | Recovery Time Objective — เวลาสูงสุดที่ระบบ down ได้ |
| RPO | Recovery Point Objective — ข้อมูลสูงสุดที่สูญเสียได้ |

---

*เอกสารนี้เป็น living document — อัปเดตล่าสุด: เมษายน 2569 (v1.1 — FastAPI + AWS Bangkok + Celery + Dunning Phase 2)*  
*ไฟล์อ้างอิง: `Documents/schema_v3.sql` (v3.4), `Documents/schema_v3.md`, `Documents/Architecture_Phase_Plan_v1.md`, `Documents/UI_Design_Brief_v1.md` (69 screens)*
