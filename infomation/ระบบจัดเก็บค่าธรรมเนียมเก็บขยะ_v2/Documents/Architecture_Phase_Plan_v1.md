# Architecture & Phase Development Plan — v1.2
## Local Authority Fee Management SaaS — Route Optimization + Module System + AWS Bangkok

> **วัตถุประสงค์:** วิเคราะห์ architecture สำหรับ (1) ระบบ Module/Package subscriptions, (2) AI Route Optimization, (3) Value-add features — พร้อม phased development plan และ schema additions ที่ backward-compatible
>
> เวอร์ชัน 1.2 · เมษายน 2569 · เอกสารสำหรับทีม Product & Engineering  
> **v1.2 changes:** Two-Sided Collection — road_side detection, cluster generation, collection skip rule, printable map Phase 2  
> **v1.1 changes:** FastAPI (Python) แทน Node.js · AWS Bangkok (ap-southeast-7) แทน GCP · Celery + Redis workers · AWS API Gateway · IoT expansion path (Phase 4)

---

## สารบัญ

1. [Feature Overview — สิ่งที่เพิ่มใหม่ทั้งหมด](#1-feature-overview)
2. [Module / Package Subscription System](#2-module--package-subscription-system)
3. [AI Route Optimization Engine](#3-ai-route-optimization-engine)
4. [Value-Add Features แนะนำเพิ่มเติม](#4-value-add-features-แนะนำเพิ่มเติม)
5. [Schema Additions — ตารางและคอลัมน์ใหม่](#5-schema-additions)
6. [Backward Compatibility Guarantees](#6-backward-compatibility-guarantees)
7. [Phased Development Plan](#7-phased-development-plan)
8. [Technology Stack Recommendations](#8-technology-stack-recommendations)
9. [ROI & Pricing Justification](#9-roi--pricing-justification)
10. [Infrastructure Architecture — AWS Bangkok](#10-infrastructure-architecture--aws-bangkok)
11. [Celery Worker Architecture](#11-celery-worker-architecture)
12. [GPS Tracking & IoT Expansion Path](#12-gps-tracking--iot-expansion-path)
13. [Two-Sided Collection Architecture](#13-two-sided-collection-architecture-v36)

---

## 1. Feature Overview

### 1.1 สรุป Features ที่เพิ่มใหม่ทั้งหมด

```
┌─────────────────────────────────────────────────────────────────┐
│                    NEW FEATURE GROUPS                           │
├─────────────┬──────────────────────────────────────────────────┤
│  GROUP 1    │  Module / Package Subscription System            │
│             │  → Feature flags per org, enable/disable any     │
│             │    service module independently                   │
├─────────────┼──────────────────────────────────────────────────┤
│  GROUP 2    │  AI Route Optimization Engine                    │
│             │  → Waste collection route optimization           │
│             │  → Meter reading route optimization              │
│             │  → Real-time GPS tracking of field workers       │
│             │  → Fuel & cost efficiency analytics              │
├─────────────┼──────────────────────────────────────────────────┤
│  GROUP 3    │  Value-Add Intelligence Features                 │
│             │  → Predictive arrears risk scoring               │
│             │  → Smart dunning (automated escalation)          │
│             │  → Geo-fencing verification for field ops        │
│             │  → Workload auto-balancing for field teams       │
│             │  → Carbon footprint / ESG reporting              │
│             │  → QR household identity cards                   │
│             │  → Multi-channel payment expansion               │
└─────────────┴──────────────────────────────────────────────────┘
```

### 1.2 Design Principles ที่ยึดตลอดการพัฒนา

| Principle | รายละเอียด |
|-----------|-----------|
| **Schema-stable** | เพิ่ม features ใหม่โดย ALTER ADD COLUMN เท่านั้น ไม่ DROP/RENAME |
| **Feature-flagged** | ทุก feature ใหม่อยู่หลัง module subscription check |
| **JSONB for flexibility** | ใช้ JSONB สำหรับ config และ optimization params — ไม่ต้อง migrate ทุกครั้งที่ parameter เปลี่ยน |
| **Additive-only API** | API endpoints ใหม่ ไม่แก้ไข endpoint เดิม |
| **Tenant-isolated** | ทุก table ใหม่ต้องมี org_id + RLS |
| **Event-sourced routes** | บันทึก route changes เป็น events ไม่ใช่ overwrite |

---

## 2. Module / Package Subscription System

### 2.1 ภาพรวมและเหตุผล

เปลี่ยนจาก "ซื้อทั้งระบบ" เป็น **"subscribe เฉพาะ module ที่ต้องการ"** ทำให้:
- ลดต้นทุนสำหรับ อปท. ขนาดเล็ก (ไม่ต้องจ่ายสำหรับ feature ที่ไม่ใช้)
- เพิ่ม upsell opportunity เมื่อ อปท. โต
- Enable/disable ได้ทันทีโดยไม่ต้องแตะ database schema
- Pricing ชัดเจน คาดการณ์รายได้ได้ดีกว่า

### 2.2 Module Catalog (Platform Level)

```
MODULE GROUPS:
─────────────
CORE (รวมในทุก subscription)
  [CORE-BILLING]    ระบบเก็บค่าธรรมเนียมและบิลลิ่ง
  [CORE-PAYMENT]    รับชำระ + ใบเสร็จ + LINE Notify
  [CORE-RESIDENT]   Resident Portal / Mobile App
  [CORE-REPORTING]  รายงานพื้นฐาน

FIELD OPERATIONS (add-on)
  [FIELD-WASTE]     บริหารการจัดเก็บขยะ + Driver App
  [FIELD-STICKER]   Sticker System (ต้องมี FIELD-WASTE)
  [FIELD-METER]     จดมิเตอร์ + OCR + Meter Reader App
  [FIELD-SURVEY]    สำรวจภาษีป้าย + Tax Surveyor App

TAX MODULES (add-on)
  [TAX-SIGN]        ระบบภาษีป้าย (ต้องมี FIELD-SURVEY)
  [TAX-PROPERTY]    ภาษีที่ดินและสิ่งปลูกสร้าง [Phase 3]
  [TAX-BUSINESS]    ภาษีธุรกิจ / ใบอนุญาต [Phase 3]

INTELLIGENCE (add-on — premium)
  [AI-ROUTE]        AI Route Optimization (ต้องมี FIELD-WASTE หรือ FIELD-METER)
  [AI-PREDICT]      Predictive Arrears Risk Scoring [Phase 3]
  [AI-DUNNING]      Smart Dunning Engine [Phase 3]

PLATFORM (add-on — enterprise)
  [PLAT-ASSET]      ค่าเช่าทรัพย์สินสาธารณะ [Phase 3]
  [PLAT-PERMIT]     ใบอนุญาต / License Management [Phase 3]
  [PLAT-CRM]        Citizen CRM + ร้องเรียน [Phase 3]
  [PLAT-BI]         BI Dashboard + Analytics [Phase 3]
```

### 2.3 ตัวอย่าง Subscription Bundles

| Bundle | Modules รวม | เหมาะกับ |
|--------|------------|---------|
| **Starter** | CORE only | อบต. เพิ่งเริ่ม ค่าขยะอย่างเดียว |
| **Field Pack** | CORE + FIELD-WASTE + FIELD-STICKER | อบต./เทศบาลตำบลที่มีรถเก็บขยะ |
| **Water Pack** | CORE + FIELD-METER | อบต./เทศบาลที่บริหารน้ำประปาเอง |
| **Tax Pack** | CORE + FIELD-SURVEY + TAX-SIGN | เน้นงานภาษีป้าย |
| **Pro Pack** | CORE + FIELD-WASTE + FIELD-METER + TAX-SIGN + AI-ROUTE | เทศบาลเมือง |
| **Enterprise** | ทั้งหมด | เทศบาลนคร / อบจ. |

### 2.4 Feature Flag Logic (Application Level)

```python
# FastAPI dependency — ตรวจสอบ module ก่อน execute feature

async def check_module_access(
    org_id: UUID,
    module_code: str,
    db: AsyncConnection
) -> bool:
    row = await db.fetchrow(
        """SELECT status FROM org_module_subscriptions
           WHERE org_id = $1 AND module_code = $2
             AND (trial_ends_at IS NULL OR trial_ends_at > NOW())""",
        org_id, module_code
    )
    return row is not None and row["status"] in ("active", "trial")

# FastAPI dependency injection ใน route
async def require_ai_route(
    org_id: UUID = Depends(current_org),
    db: AsyncConnection = Depends(get_db),
):
    if not await check_module_access(org_id, "AI-ROUTE", db):
        raise HTTPException(status_code=403, detail="Module AI-ROUTE not subscribed")

# ใช้งานใน endpoint
@router.post("/route-optimization/jobs", dependencies=[Depends(require_ai_route)])
async def create_optimization_job(...):
    ...
```

---

## 3. AI Route Optimization Engine

### 3.1 ปัญหาที่แก้ไขได้

| ปัญหาปัจจุบัน | ผลกระทบ | วิธีแก้ |
|-------------|---------|--------|
| เส้นทางออกแบบด้วยมือ ไม่มีการ optimize | ระยะทางไกล เวลานาน เชื้อเพลิงสูง | AI คำนวณเส้นทางสั้นสุด |
| พนักงานกลุ่มเดิมรับผิดชอบพื้นที่เดิมเสมอ | workload ไม่สมดุล บางคนยุ่งมาก บางคนน้อย | Auto-balance ตาม capacity |
| ไม่รู้ว่ามิเตอร์/บ้านใดถูกข้ามไปจนสิ้นวัน | งานตกหล่น ร้องเรียนตามมา | Real-time tracking + alert |
| ไม่มีข้อมูลต้นทุนต่อทริป | งบประมาณ IT ไม่มีหลักอ้างอิง | Cost tracking + ROI report |

### 3.2 Algorithm Architecture

```
INPUT:
  → รายการจุดที่ต้องแวะ (households / meters) + GPS coordinates
  → รถที่ใช้ได้ + capacity + จุดเริ่มต้น (depot)
  → เวลาเริ่ม-สิ้นสุดงาน
  → Constraints (บ้านต้องแวะในช่วงเวลาเฉพาะ, มิเตอร์บางตัว priority สูง)

ALGORITHM (Vehicle Routing Problem — VRP):
  Option A: Google OR-Tools (open-source, ทำงาน on-premise)
  Option B: OpenRouteService Optimization API (free tier มี, self-host ได้)
  Option C: Google Maps Route Optimization API (ต้องจ่าย แต่แม่นยำสูง)
  → แนะนำ: เริ่มด้วย OR-Tools (Phase 2) → upgrade เป็น Google Maps API (Phase 3)

OUTPUT:
  → เส้นทางที่ optimized สำหรับรถแต่ละคัน (ordered stops + ETA per stop)
  → ระยะทางรวม, เวลารวม, น้ำมันโดยประมาณ
  → เปรียบเทียบกับเส้นทางเดิม (improvement %)
```

### 3.3 Route Optimization Flow

```
ขั้นที่ 1: SETUP (เจ้าหน้าที่)
  Officer กด "Optimize Routes" → เลือกวันที่ → เลือก vehicle/driver pool
  ↓
ขั้นที่ 2: COMPUTATION (Backend)
  System ดึงจุดทั้งหมดที่ต้องแวะ (unread meters / unvisited households)
  → ส่ง API ไป Route Optimization Engine
  → รอผล (< 30 วินาที สำหรับ ≤ 500 จุด)
  ↓
ขั้นที่ 3: REVIEW (เจ้าหน้าที่)
  Officer ดู Optimized Plan → map preview → comparison vs manual plan
  → อนุมัติ หรือ ปรับแต่งด้วยมือ (drag & drop stops)
  ↓
ขั้นที่ 4: DISPATCH (Field Workers)
  Driver / Meter Reader เปิด App → เห็น optimized route พร้อม turn-by-turn guidance
  → ระบบติดตาม GPS แบบ real-time ระหว่างออกงาน
  ↓
ขั้นที่ 5: POST-TRIP ANALYSIS
  System เปรียบเทียบ planned vs actual → คำนวณ efficiency score
  → บันทึกใน trip analytics สำหรับ BI
```

### 3.4 Constraints ที่ระบบรองรับ

```yaml
Hard Constraints (ต้องทำตาม):
  - vehicle_capacity:      ไม่เกิน capacity ของรถแต่ละคัน
  - time_window:           ต้องแวะในช่วงเวลาที่กำหนด (บ้านที่แจ้งล่วงหน้า)
  - driver_shift_hours:    ไม่เกินชั่วโมงทำงาน (e.g., 8 ชั่วโมง)
  - depot_return:          รถต้องกลับ depot ก่อนสิ้นกะ
  - mandatory_stops:       บ้านที่ค้างชำระนาน priority สูง ต้องแวะ

Soft Constraints (optimize ให้ดีที่สุด):
  - minimize_total_distance:   ลดระยะทางรวม
  - minimize_total_time:       ลดเวลารวม
  - balance_workload:          กระจาย stops ให้สมดุลระหว่างรถ/คนขับ
  - cluster_nearby_stops:      จัดกลุ่มจุดที่ใกล้กัน (ลด backtracking)
  - avoid_peak_traffic:        หลีกเลี่ยงช่วง rush hour (ถ้ามีข้อมูล)
```

---

## 4. Value-Add Features แนะนำเพิ่มเติม

### 4.1 Geo-fencing Verification ⭐ (สำคัญมาก)

**ปัญหาที่แก้ไข:** ไม่มีหลักฐานว่าพนักงานไปถึงจุดที่กำหนดจริง

**วิธีทำงาน:**
- รถ/พนักงานต้องอยู่ภายใน radius N เมตร จากพิกัดมิเตอร์/บ้าน จึงจะบันทึกผลได้
- ถ้าอยู่นอก geo-fence → แอป alert และไม่อนุญาตให้กด "เก็บแล้ว"
- Officer portal เห็น GPS trail ของพนักงานแต่ละคนตลอดวัน

**ผลที่ได้:**
- ป้องกันการ "mark done" โดยไม่ได้ไปจริง
- หลักฐานทางกฎหมายถ้ามีข้อพิพาท
- เพิ่มความรับผิดชอบของพนักงาน

**Pricing Justification:** Feature นี้ทำให้ อปท. สามารถ audit การทำงานของพนักงานได้ — มูลค่าสูงมากในแง่ความโปร่งใส

---

### 4.2 Smart Dunning Engine ⭐ (เพิ่มรายได้โดยตรง)

**ปัญหาที่แก้ไข:** การติดตามหนี้ใช้เจ้าหน้าที่ทำด้วยมือ ไม่สม่ำเสมอ ไม่มี escalation logic

**วิธีทำงาน:**
```
Day 1:    ออกบิล → LINE Notify ส่งอัตโนมัติ
Day 7:    ยังไม่จ่าย → Reminder SMS (อ่อนโยน)
Day 15:   ยังไม่จ่าย → LINE แจ้ง + แสดงสติ๊กเกอร์สีปีนี้จะหมดสิทธิ์
Day 30:   ครบกำหนด → เพิ่มเบี้ยปรับอัตโนมัติ
Day 45:   ยังไม่จ่าย → แจ้งหัวหน้าทีมให้ติดตามด้วยตัวเอง
Day 60:   ยังไม่จ่าย → แจ้งเตือนระดับกฎหมาย (ถ้า อปท. กำหนด)
```

**ผลที่ได้:** เพิ่มอัตราการจัดเก็บ 10-20% โดยไม่ต้องเพิ่มพนักงาน

---

### 4.3 Predictive Arrears Risk Scoring

**ปัญหาที่แก้ไข:** เจ้าหน้าที่ไม่รู้ว่าบ้านไหนมีความเสี่ยงจะค้างชำระ จนกว่าจะค้างแล้ว

**วิธีทำงาน:**
- ML model วิเคราะห์ patterns จากประวัติการชำระ
- ให้ risk score (0-100) กับแต่ละครัวเรือนทุกเดือน
- High-risk households → ระบบ flag ให้เจ้าหน้าที่ติดตามก่อน

**Features:**
- Risk score dashboard
- "Top 50 at-risk households this month"
- Alert เมื่อ household เปลี่ยนจาก low → high risk

---

### 4.4 QR Household Identity System

**ปัญหาที่แก้ไข:** พนักงานต้องค้นหาบ้านด้วยชื่อ/เลขที่บ้าน ช้า และผิดพลาดได้

**วิธีทำงาน:**
- ออก QR Code unique ให้แต่ละบ้าน (link ไป household ID)
- พนักงานสแกน QR → เปิดข้อมูลบ้านทันที (ยอดค้าง/มิเตอร์/สติ๊กเกอร์)
- ประชาชนสแกน QR หน้าบ้านตัวเอง → เปิดหน้าชำระเงิน

**Use Cases:**
- ติดบน QR Card ส่งให้แต่ละบ้าน
- ติดตรงมิเตอร์น้ำ → พนักงานสแกนก่อนจดมิเตอร์
- ติดหน้าบ้าน → คนขับรถสแกนแทนการค้นหา

---

### 4.5 Carbon Footprint & ESG Reporting

**เหตุผล:** อปท. ขนาดใหญ่เริ่มถูกถามเรื่อง ESG จากภาครัฐและองค์กรสากล

**ข้อมูลที่ track:**
- ปริมาณน้ำมันที่ใช้ต่อทริป → CO₂ equivalent
- Route optimization ลดการปล่อย CO₂ ไปกี่กิโลกรัม/เดือน
- สถิติขยะคัดแยก vs ขยะรวม

**รายงาน:**
- Monthly Carbon Report
- Annual ESG Summary สำหรับ อปท. ส่งหน่วยงานกำกับ

---

### 4.6 Workload Auto-Balancing

**ปัญหาที่แก้ไข:** เมื่อพนักงานขาด/ลา ต้องจัดสรรงานใหม่ด้วยมือ

**วิธีทำงาน:**
- เมื่อ driver/meter reader แจ้งลา → ระบบ auto-redistribute stops ไปยังคนอื่น
- คำนวณ load per worker และแจ้ง supervisor ถ้า overload
- รองรับ Floating Workers (พนักงานที่ไม่ได้ assign ประจำ)

---

### 4.7 Multi-Channel Payment Expansion

**เหตุผล:** ยิ่งชำระสะดวก → อัตราจัดเก็บสูงขึ้น

| Channel | สถานะ | หมายเหตุ |
|---------|-------|---------|
| PromptPay QR | ✅ มีแล้ว | ฟรี ไม่มีค่า MDR |
| LINE Pay / Rabbit LINE Pay | Phase 2 | MDR ~1.5% |
| TrueMoney Wallet | Phase 2 | MDR ~1.5% |
| Counter Service (7-11, Family Mart) | Phase 3 | ต้องต่อ API |
| QR30 (โอนพร้อมเพย์ทุกธนาคาร) | Phase 2 | ผ่าน payment gateway |
| Installment Plan via Credit Card | Phase 3 | สำหรับยอดสูง |

---

## 5. Schema Additions

### 5.1 Design Decisions

```
ทุก table ใหม่ต้องมี:
  - id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  - org_id UUID NOT NULL REFERENCES organizations(id)
  - created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  - updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  - Row Level Security enabled

ไม่แก้ไข table เดิม ยกเว้น ALTER TABLE ... ADD COLUMN (never DROP, never RENAME)
JSONB ใช้สำหรับ: configuration, optimization parameters/results, metadata ที่เปลี่ยนบ่อย
```

---

### 5.2 Group 1 — Module Subscription Tables

```sql
-- =====================================================
-- MODULE SUBSCRIPTION SYSTEM
-- =====================================================

-- Global Module Catalog (Platform Level — ไม่มี org_id)
CREATE TABLE platform_modules (
  id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  code            VARCHAR(30)  NOT NULL UNIQUE,           -- 'AI-ROUTE', 'FIELD-METER' etc.
  name_th         VARCHAR(100) NOT NULL,
  name_en         VARCHAR(100) NOT NULL,
  description     TEXT,
  module_group    VARCHAR(30)  NOT NULL
                  CHECK (module_group IN ('core','field','tax','intelligence','platform')),
  depends_on      VARCHAR(30)[],                          -- ต้อง subscribe modules นี้ก่อน
  min_tier        subscription_tier NOT NULL DEFAULT 'starter',
  is_active       BOOLEAN      NOT NULL DEFAULT TRUE,
  sort_order      INT          NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Org Module Subscriptions (Feature Flags per Org)
CREATE TABLE org_module_subscriptions (
  id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID         NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  module_id       UUID         NOT NULL REFERENCES platform_modules(id),
  module_code     VARCHAR(30)  NOT NULL,                  -- denormalized สำหรับ fast lookup
  status          VARCHAR(20)  NOT NULL DEFAULT 'active'
                  CHECK (status IN ('active','trial','suspended','cancelled')),
  trial_ends_at   TIMESTAMPTZ,
  subscribed_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  cancelled_at    TIMESTAMPTZ,
  config          JSONB        NOT NULL DEFAULT '{}',     -- module-specific config
  notes           TEXT,
  created_by      UUID         REFERENCES users(id) ON DELETE SET NULL,
  updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  UNIQUE (org_id, module_id)
);

CREATE INDEX idx_org_modules_org     ON org_module_subscriptions (org_id, status);
CREATE INDEX idx_org_modules_code    ON org_module_subscriptions (org_id, module_code, status);

-- Org Module Subscription History (audit trail)
CREATE TABLE org_module_subscription_history (
  id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID         NOT NULL REFERENCES organizations(id),
  module_code     VARCHAR(30)  NOT NULL,
  old_status      VARCHAR(20),
  new_status      VARCHAR(20)  NOT NULL,
  changed_by      UUID         REFERENCES users(id) ON DELETE SET NULL,
  changed_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  reason          TEXT
);

-- RLS
ALTER TABLE platform_modules               ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_module_subscriptions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_module_subscription_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY pm_read_all    ON platform_modules FOR SELECT USING (TRUE);
CREATE POLICY oms_org_select ON org_module_subscriptions FOR SELECT
  USING (org_id = current_org_id());
CREATE POLICY oms_admin_write ON org_module_subscriptions FOR ALL
  USING (org_id = current_org_id()
    AND user_has_org_role(current_user_id(), current_org_id(), ARRAY['super_admin','admin']));

-- View: Active modules for current org
CREATE OR REPLACE VIEW v_active_modules AS
SELECT pm.code, pm.name_th, pm.name_en, pm.module_group,
       oms.status, oms.trial_ends_at, oms.config
FROM org_module_subscriptions oms
JOIN platform_modules pm ON pm.id = oms.module_id
WHERE oms.org_id = current_org_id()
  AND oms.status IN ('active','trial')
  AND (oms.trial_ends_at IS NULL OR oms.trial_ends_at > NOW());
```

---

### 5.3 Group 2 — Route Optimization Tables

```sql
-- =====================================================
-- AI ROUTE OPTIMIZATION ENGINE
-- =====================================================

-- Enhanced Vehicles (ALTER existing table)
ALTER TABLE vehicles
  ADD COLUMN IF NOT EXISTS gps_device_id   VARCHAR(100),    -- GPS tracker ID
  ADD COLUMN IF NOT EXISTS fuel_type       VARCHAR(20)
                           CHECK (fuel_type IN ('diesel','gasoline','electric','hybrid')),
  ADD COLUMN IF NOT EXISTS fuel_capacity_l DECIMAL(6,2),    -- ความจุถังน้ำมัน (ลิตร)
  ADD COLUMN IF NOT EXISTS fuel_eff_km_l   DECIMAL(5,2),    -- อัตราสิ้นเปลืองน้ำมัน km/ลิตร
  ADD COLUMN IF NOT EXISTS avg_speed_kmh   DECIMAL(5,2) DEFAULT 30,
  ADD COLUMN IF NOT EXISTS max_stops       INT DEFAULT 150, -- จำนวน stops สูงสุดต่อทริป
  ADD COLUMN IF NOT EXISTS maintenance_due DATE;

-- Route Optimization Jobs
-- บันทึกทุก request ที่ส่งไป optimization engine
CREATE TABLE route_optimization_jobs (
  id                  UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id              UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  job_type            VARCHAR(30)   NOT NULL
                      CHECK (job_type IN ('waste_collection','meter_reading','mixed')),
  target_date         DATE          NOT NULL,
  status              VARCHAR(20)   NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending','processing','completed','failed','cancelled')),
  -- Input
  vehicle_ids         UUID[]        NOT NULL,               -- รถที่ใช้ในการ optimize
  stop_count          INT           NOT NULL DEFAULT 0,
  input_params        JSONB         NOT NULL DEFAULT '{}',  -- constraints, preferences
  -- Output
  algorithm_used      VARCHAR(50),                          -- 'or-tools', 'google-maps-opt'
  result_summary      JSONB,                                -- distance saved, time saved, etc.
  improvement_pct     DECIMAL(5,2), -- % improvement vs baseline (manual route)
  -- Timing
  submitted_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  started_at          TIMESTAMPTZ,
  completed_at        TIMESTAMPTZ,
  error_message       TEXT,
  -- Approval
  approved_by         UUID          REFERENCES users(id) ON DELETE SET NULL,
  approved_at         TIMESTAMPTZ,
  created_by          UUID          REFERENCES users(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_opt_jobs_org    ON route_optimization_jobs (org_id, target_date DESC);
CREATE INDEX idx_opt_jobs_status ON route_optimization_jobs (org_id, status);

-- Optimized Route Plans
-- 1 job สร้างได้หลาย plans (1 plan ต่อ 1 vehicle)
CREATE TABLE optimized_route_plans (
  id                  UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id              UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  job_id              UUID          NOT NULL REFERENCES route_optimization_jobs(id) ON DELETE CASCADE,
  vehicle_id          UUID          NOT NULL REFERENCES vehicles(id) ON DELETE RESTRICT,
  driver_id           UUID          REFERENCES users(id) ON DELETE SET NULL,
  plan_date           DATE          NOT NULL,
  status              VARCHAR(20)   NOT NULL DEFAULT 'draft'
                      CHECK (status IN ('draft','approved','in_progress','completed','cancelled')),
  -- Metrics (planned)
  planned_stop_count  INT           NOT NULL DEFAULT 0,
  planned_distance_km DECIMAL(8,2),
  planned_duration_min INT,
  planned_fuel_l      DECIMAL(6,2),
  planned_start_time  TIME,
  planned_end_time    TIME,
  -- Metrics (actual — filled during/after execution)
  actual_stop_count   INT,
  actual_distance_km  DECIMAL(8,2),
  actual_duration_min INT,
  actual_fuel_l       DECIMAL(6,2),
  actual_start_time   TIMESTAMPTZ,
  actual_end_time     TIMESTAMPTZ,
  -- Comparison
  baseline_distance_km DECIMAL(8,2), -- ระยะทางก่อน optimize (สำหรับ comparison)
  route_geojson       JSONB,          -- เส้นทางทั้งหมดเป็น GeoJSON LineString
  created_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_opt_plans_org    ON optimized_route_plans (org_id, plan_date DESC);
CREATE INDEX idx_opt_plans_job    ON optimized_route_plans (job_id);
CREATE INDEX idx_opt_plans_driver ON optimized_route_plans (driver_id, plan_date DESC);

-- Optimized Route Stops (ordered stops in a plan)
-- Polymorphic: stop_type กำหนดว่า entity_id อ้างอิงตาราง ไหน
CREATE TABLE optimized_route_stops (
  id                UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id            UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  plan_id           UUID          NOT NULL REFERENCES optimized_route_plans(id) ON DELETE CASCADE,
  sequence_no       INT           NOT NULL,               -- ลำดับการแวะ (1, 2, 3, ...)
  stop_type         VARCHAR(20)   NOT NULL
                    CHECK (stop_type IN ('depot','household','meter','sign','waypoint')),
  entity_id         UUID,                                 -- NULL สำหรับ depot/waypoint
  -- Location
  latitude          DECIMAL(9,6)  NOT NULL,
  longitude         DECIMAL(9,6)  NOT NULL,
  address_label     VARCHAR(300),                         -- ที่อยู่สำหรับแสดงใน UI
  -- Time Windows
  planned_arrival   TIMESTAMPTZ,                          -- ETA จาก optimization
  planned_departure TIMESTAMPTZ,
  time_window_from  TIME,                                 -- ช่วงเวลาที่ต้องแวะ (constraint)
  time_window_to    TIME,
  service_time_min  INT           NOT NULL DEFAULT 3,     -- นาทีที่ใช้แต่ละจุด
  -- Actual Execution
  actual_arrival    TIMESTAMPTZ,
  actual_departure  TIMESTAMPTZ,
  status            VARCHAR(20)   NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','skipped','completed','problem')),
  skip_reason       VARCHAR(100),
  notes             TEXT,
  -- Geo-fencing
  verified_at_location BOOLEAN    NOT NULL DEFAULT FALSE,
  verification_dist_m  INT,                               -- ระยะห่างจากพิกัดที่ควรอยู่ตอน verify
  created_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_opt_stops_plan   ON optimized_route_stops (plan_id, sequence_no);
CREATE INDEX idx_opt_stops_entity ON optimized_route_stops (entity_id) WHERE entity_id IS NOT NULL;
CREATE INDEX idx_opt_stops_status ON optimized_route_stops (org_id, status) WHERE status = 'pending';

-- Field Worker GPS Tracking
-- บันทึก GPS ระหว่างออกงาน (partitioned by month for performance)
CREATE TABLE field_worker_locations (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id         UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id         UUID          REFERENCES optimized_route_plans(id) ON DELETE SET NULL,
  recorded_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  latitude        DECIMAL(9,6)  NOT NULL,
  longitude       DECIMAL(9,6)  NOT NULL,
  accuracy_m      DECIMAL(6,2),
  speed_kmh       DECIMAL(5,2),
  heading_deg     DECIMAL(6,2),
  activity        VARCHAR(20)
                  CHECK (activity IN ('driving','walking','stationary','unknown'))
) PARTITION BY RANGE (recorded_at);

-- สร้าง partition รายเดือน (ตัวอย่าง 2 เดือน)
CREATE TABLE field_worker_locations_2025_04
  PARTITION OF field_worker_locations
  FOR VALUES FROM ('2025-04-01') TO ('2025-05-01');
CREATE TABLE field_worker_locations_2025_05
  PARTITION OF field_worker_locations
  FOR VALUES FROM ('2025-05-01') TO ('2025-06-01');

CREATE INDEX idx_fwl_user_time ON field_worker_locations (user_id, recorded_at DESC);
CREATE INDEX idx_fwl_plan      ON field_worker_locations (plan_id, recorded_at DESC);

-- Trip Efficiency Records (สรุปต่อทริป สำหรับ analytics)
CREATE TABLE trip_efficiency_records (
  id                    UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id                UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  plan_id               UUID          REFERENCES optimized_route_plans(id),
  -- สำหรับ non-optimized trips (backward compat)
  collection_trip_id    UUID          REFERENCES collection_trips(id),
  meter_round_id        UUID          REFERENCES meter_reading_rounds(id),
  trip_type             VARCHAR(20)   NOT NULL
                        CHECK (trip_type IN ('waste_collection','meter_reading')),
  trip_date             DATE          NOT NULL,
  vehicle_id            UUID          REFERENCES vehicles(id),
  driver_id             UUID          REFERENCES users(id),
  -- Efficiency Metrics
  total_stops_planned   INT           NOT NULL DEFAULT 0,
  total_stops_completed INT           NOT NULL DEFAULT 0,
  total_stops_skipped   INT           NOT NULL DEFAULT 0,
  completion_rate_pct   DECIMAL(5,2),
  -- Distance & Time
  distance_km_planned   DECIMAL(8,2),
  distance_km_actual    DECIMAL(8,2),
  duration_min_planned  INT,
  duration_min_actual   INT,
  -- Cost
  fuel_liters_actual    DECIMAL(6,2),
  fuel_cost_thb         DECIMAL(10,2),
  driver_cost_thb       DECIMAL(10,2),
  total_cost_thb        DECIMAL(10,2),
  -- Optimization
  was_optimized         BOOLEAN       NOT NULL DEFAULT FALSE,
  distance_saved_km     DECIMAL(8,2), -- vs baseline (manual route)
  time_saved_min        INT,
  fuel_saved_l          DECIMAL(6,2),
  co2_saved_kg          DECIMAL(8,3),
  created_at            TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ter_org_date ON trip_efficiency_records (org_id, trip_date DESC);
CREATE INDEX idx_ter_driver   ON trip_efficiency_records (driver_id, trip_date DESC);

-- ALTER meter_reading_rounds เพื่อเชื่อม optimization
ALTER TABLE meter_reading_rounds
  ADD COLUMN IF NOT EXISTS optimized_plan_id UUID REFERENCES optimized_route_plans(id);

-- ALTER collection_trips เพื่อเชื่อม optimization
ALTER TABLE collection_trips
  ADD COLUMN IF NOT EXISTS optimized_plan_id UUID REFERENCES optimized_route_plans(id),
  ADD COLUMN IF NOT EXISTS fuel_liters       DECIMAL(6,2),
  ADD COLUMN IF NOT EXISTS distance_km       DECIMAL(8,2);

-- RLS for new route tables
ALTER TABLE route_optimization_jobs    ENABLE ROW LEVEL SECURITY;
ALTER TABLE optimized_route_plans      ENABLE ROW LEVEL SECURITY;
ALTER TABLE optimized_route_stops      ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_worker_locations     ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_efficiency_records    ENABLE ROW LEVEL SECURITY;

-- Generic org-scoped policies (officers read/write, field workers read own plans)
CREATE POLICY roj_select ON route_optimization_jobs FOR SELECT USING (org_id = current_org_id());
CREATE POLICY roj_write  ON route_optimization_jobs FOR ALL
  USING (org_id = current_org_id()
    AND user_has_org_role(current_user_id(), current_org_id(), ARRAY['admin','officer']));

CREATE POLICY orp_select ON optimized_route_plans FOR SELECT USING (org_id = current_org_id());
CREATE POLICY ors_select ON optimized_route_stops FOR SELECT USING (org_id = current_org_id());
CREATE POLICY fwl_select ON field_worker_locations FOR SELECT USING (org_id = current_org_id());
CREATE POLICY ter_select ON trip_efficiency_records FOR SELECT USING (org_id = current_org_id());
```

---

### 5.4 Group 3 — Value-Add Feature Tables

```sql
-- =====================================================
-- VALUE-ADD FEATURES
-- =====================================================

-- Smart Dunning Rules (per org)
CREATE TABLE dunning_rules (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name            VARCHAR(100)  NOT NULL,
  is_active       BOOLEAN       NOT NULL DEFAULT TRUE,
  -- Trigger
  days_overdue    INT           NOT NULL,       -- กี่วันหลังครบกำหนด
  min_amount_thb  DECIMAL(10,2) DEFAULT 0,      -- ยอดขั้นต่ำที่จะ trigger
  -- Action
  action_type     VARCHAR(30)   NOT NULL
                  CHECK (action_type IN ('line_notify','sms','email','add_penalty','assign_officer','legal_notice')),
  message_template_id UUID      REFERENCES notification_templates(id),
  escalate_to_role VARCHAR(30), -- role ที่จะได้รับ alert
  auto_add_penalty BOOLEAN      NOT NULL DEFAULT FALSE,
  sort_order      INT           NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Dunning Execution Log
CREATE TABLE dunning_log (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  dunning_rule_id UUID          NOT NULL REFERENCES dunning_rules(id),
  bill_id         UUID          NOT NULL REFERENCES bills(id),
  household_id    UUID          NOT NULL REFERENCES households(id),
  executed_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  action_type     VARCHAR(30)   NOT NULL,
  success         BOOLEAN       NOT NULL DEFAULT TRUE,
  result_message  TEXT
);

-- Household QR Codes
CREATE TABLE household_qr_codes (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  household_id    UUID          NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  qr_token        VARCHAR(64)   NOT NULL UNIQUE,  -- random token ใน QR URL
  qr_type         VARCHAR(20)   NOT NULL DEFAULT 'payment'
                  CHECK (qr_type IN ('payment','info','meter','field_check')),
  generated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  expires_at      TIMESTAMPTZ,                    -- NULL = ไม่หมดอายุ
  is_active       BOOLEAN       NOT NULL DEFAULT TRUE,
  last_scanned_at TIMESTAMPTZ,
  scan_count      INT           NOT NULL DEFAULT 0
);

CREATE INDEX idx_hqr_token     ON household_qr_codes (qr_token);
CREATE INDEX idx_hqr_household ON household_qr_codes (household_id);

-- Arrears Risk Scores (ผลจาก ML model)
CREATE TABLE arrears_risk_scores (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  household_id    UUID          NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  score_date      DATE          NOT NULL,         -- วันที่คำนวณ (ทุกเดือน)
  risk_score      INT           NOT NULL CHECK (risk_score BETWEEN 0 AND 100),
  risk_level      VARCHAR(10)   NOT NULL
                  CHECK (risk_level IN ('low','medium','high','critical')),
  contributing_factors JSONB    NOT NULL DEFAULT '{}',  -- ปัจจัยที่ส่งผลต่อ score
  prev_score      INT,          -- score เดือนที่แล้ว (สำหรับ trend)
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  UNIQUE (org_id, household_id, score_date)
);

CREATE INDEX idx_ars_org_date  ON arrears_risk_scores (org_id, score_date DESC);
CREATE INDEX idx_ars_high_risk ON arrears_risk_scores (org_id, risk_level, score_date DESC)
  WHERE risk_level IN ('high','critical');

-- Carbon Footprint Records
CREATE TABLE carbon_footprint_records (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  period_month    DATE          NOT NULL,         -- วันแรกของเดือน
  trip_type       VARCHAR(20)   NOT NULL,
  -- Fuel & Emissions
  total_trips     INT           NOT NULL DEFAULT 0,
  total_km        DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_fuel_l    DECIMAL(10,2) NOT NULL DEFAULT 0,
  co2_emitted_kg  DECIMAL(10,3) NOT NULL DEFAULT 0,
  -- Savings (from route optimization)
  km_saved        DECIMAL(10,2) NOT NULL DEFAULT 0,
  fuel_saved_l    DECIMAL(10,2) NOT NULL DEFAULT 0,
  co2_saved_kg    DECIMAL(10,3) NOT NULL DEFAULT 0,
  cost_saved_thb  DECIMAL(12,2) NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  UNIQUE (org_id, period_month, trip_type)
);

-- RLS for new value-add tables
ALTER TABLE dunning_rules          ENABLE ROW LEVEL SECURITY;
ALTER TABLE dunning_log            ENABLE ROW LEVEL SECURITY;
ALTER TABLE household_qr_codes     ENABLE ROW LEVEL SECURITY;
ALTER TABLE arrears_risk_scores    ENABLE ROW LEVEL SECURITY;
ALTER TABLE carbon_footprint_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY dr_select ON dunning_rules FOR SELECT USING (org_id = current_org_id());
CREATE POLICY dl_select ON dunning_log   FOR SELECT USING (org_id = current_org_id());
CREATE POLICY hqr_select ON household_qr_codes FOR SELECT USING (org_id = current_org_id());
CREATE POLICY ars_select ON arrears_risk_scores FOR SELECT USING (org_id = current_org_id());
CREATE POLICY cfr_select ON carbon_footprint_records FOR SELECT USING (org_id = current_org_id());
```

---

### 5.5 Schema Change Summary

| # | การเปลี่ยนแปลง | Tables | Phase |
|---|---------------|--------|-------|
| 1 | Module Subscription System | platform_modules, org_module_subscriptions (+history) | 2 |
| 2 | Route Optimization Jobs | route_optimization_jobs | 2 |
| 3 | Optimized Route Plans | optimized_route_plans, optimized_route_stops | 2 |
| 4 | GPS Field Tracking | field_worker_locations (partitioned) | 2 |
| 5 | Trip Efficiency Records | trip_efficiency_records | 2 |
| 6 | Enhanced Vehicles | ALTER vehicles (+6 columns) | 2 |
| 7 | Link optimization to existing tables | ALTER collection_trips, meter_reading_rounds | 2 |
| 8 | Smart Dunning | dunning_rules, dunning_log | 3 |
| 9 | QR Household Codes | household_qr_codes | 3 |
| 10 | Arrears Risk Scores | arrears_risk_scores | 3 |
| 11 | Carbon Footprint | carbon_footprint_records | 3 |

**ผลรวม: 13 ตารางใหม่ + 3 ALTER ADD COLUMN — ไม่มีการแก้ไข / ลบ table เดิม**

---

## 6. Backward Compatibility Guarantees

### 6.1 หลักการ "Never Break Existing Code"

```
กฎที่ทีม Engineering ต้องปฏิบัติตามเสมอ:

✅ ALLOWED:
   ALTER TABLE ... ADD COLUMN (with DEFAULT or nullable)
   CREATE TABLE (new tables)
   CREATE INDEX (non-blocking: CREATE INDEX CONCURRENTLY)
   CREATE VIEW / FUNCTION (new ones)
   INSERT new rows (seed data, module catalog)

❌ NOT ALLOWED without migration plan:
   DROP TABLE / DROP COLUMN
   RENAME TABLE / RENAME COLUMN
   ALTER COLUMN type (without casting)
   Remove API endpoints (deprecate first, remove after 2 versions)
   Change FK relationships of existing tables
```

### 6.2 Feature Flag Gate — Existing orgs ไม่ได้รับ impact

```
Phase 2 features (Route Optimization) จะ:
  1. มีอยู่ใน Database แต่ยังไม่แสดงใน UI
  2. ต้องมี org_module_subscriptions record ที่ active จึงจะเห็น
  3. Existing orgs จะไม่เห็น features ใหม่จนกว่าจะ subscribe

ผลลัพธ์:
  - Existing customers ไม่ได้รับ disruption
  - New features safe to deploy ไปยัง production ก่อน GA
  - QA สามารถทดสอบใน production environment ด้วย test org
```

### 6.3 API Versioning Strategy

```
/api/v1/...   ← current stable (ไม่แตะ)
/api/v2/...   ← Phase 2 features (route optimization)
/api/v3/...   ← Phase 3 features (analytics, BI)

Mobile App backward compat:
  - Field worker apps ต้องรองรับ API version ที่เก่ากว่า 2 versions
  - Force update ทำได้เฉพาะ major version change
```

---

## 7. Phased Development Plan

### Phase 0 — Foundation (เสร็จแล้ว / กำลังทำ)
**เป้าหมาย:** Core billing system พร้อม go-live

| สิ่งที่ต้องทำ | สถานะ |
|-------------|-------|
| Schema v3.0–v3.4 — Multi-tenant, RLS, billing, OCR, Sign Tax, Module, Dunning, ACID | ✅ เสร็จ |
| Collection Routes + Sticker System | ✅ เสร็จ |
| Phase 1 M1: Meter Reading OCR schema | ✅ เสร็จ |
| Phase 1 M2: ภาษีป้าย schema | ✅ เสร็จ |
| UI Design Brief v1 — 69 screens (รวม 14 Dunning screens) | ✅ เสร็จ |
| PRD v1.1 — FastAPI + AWS Bangkok tech stack | ✅ เสร็จ |

**Deliverables:** Core billing platform พร้อม demo กับลูกค้า

---

### Phase 1 — Core Billing + Field Apps (3-4 เดือน)
**เป้าหมาย:** MVP ที่ลูกค้าแรกใช้งานได้จริง

```
Sprint 1-2  (เดือน 1):
  [ ] Resident Portal (R-01 ถึง R-12) — Mobile App
  [ ] Officer Portal — Billing (O-01 ถึง O-08)
  [ ] PromptPay QR payment flow
  [ ] LINE Notify integration

Sprint 3-4  (เดือน 2):
  [ ] Officer Portal — Approvals + Issues (O-09 ถึง O-11)
  [ ] Driver App (D-01 ถึง D-04)
  [ ] Sticker System
  [ ] Admin screens (A-01 ถึง A-04)

Sprint 5-6  (เดือน 3):
  [ ] Meter Reader App — M-01 ถึง M-03 (OCR core)
  [ ] Officer Portal — Meter Management (O-16, O-17)
  [ ] Tax Surveyor App — TS-01, TS-02
  [ ] Officer Portal — ภาษีป้าย (O-19 ถึง O-21)

Sprint 7-8  (เดือน 4):
  [ ] Super Admin Portal (SA-01 ถึง SA-03)
  [ ] Pilot กับ อปท. แรก (Early Adopter)
  [ ] Bug fixes + performance tuning
  [ ] Reports พื้นฐาน (O-13)
```

**KPIs Phase 1:**
- อปท. ที่ใช้งานจริง: 1-3 แห่ง
- อัตราการจัดเก็บ: วัดผลหลัง 3 เดือน
- Bug rate: < 5 bugs/week หลัง go-live

---

### Phase 2 — Route Intelligence + Module System (3-4 เดือน)
**เป้าหมาย:** AI Route Optimization + เปิด Module Marketplace

```
Sprint 9-10  (เดือน 5):
  [ ] Schema: Module Subscription tables
  [ ] Schema: Route Optimization tables
  [ ] Schema: GPS Tracking (partitioned)
  [ ] Module Subscription UI (Super Admin)
  [ ] Feature flag middleware ใน backend

Sprint 11-12  (เดือน 6):
  [ ] OR-Tools integration (route optimization engine)
  [ ] Waste Collection Route Optimizer — Officer UI
  [ ] Optimized Route → Driver App (show optimized sequence)
  [ ] GPS Tracking (background location update)

Sprint 13-14  (เดือน 7):
  [ ] Meter Reading Route Optimizer
  [ ] Optimized Route → Meter Reader App
  [ ] Geo-fencing verification (FIELD-METER + FIELD-WASTE)
  [ ] Trip Efficiency Report (O-13 enhancement)

Sprint 15-16  (เดือน 8):
  [ ] QR Household Code generation + scanning
  [ ] Smart Dunning Engine (basic rules)
  [ ] Multi-channel payment: LINE Pay, TrueMoney
  [ ] Carbon Footprint tracking (beta)
  [ ] Package bundles UI for new customers
```

**KPIs Phase 2:**
- Route optimization: ลดระยะทางเฉลี่ย ≥15%
- Field worker GPS coverage: ≥90% of working hours
- Module subscriptions: upsell ≥50% ของ Phase 1 customers
- อปท. ที่ใช้งาน: 5-15 แห่ง

---

### Phase 3 — Analytics & Intelligence (3-4 เดือน)
**เป้าหมาย:** Premium tier + BI + Predictive features

```
Sprint 17-18  (เดือน 9):
  [ ] Arrears Risk Scoring (ML model training + inference)
  [ ] Risk Dashboard สำหรับ Officer/Supervisor
  [ ] Smart Dunning: ขยาย rules + automation
  [ ] BI Dashboard (SA-03 enhancement + Org-level)

Sprint 19-20  (เดือน 10):
  [ ] Workload Auto-Balancing
  [ ] Carbon Footprint full report
  [ ] Benchmarking (anonymized cross-org comparison)
  [ ] Advanced Reports + export

Sprint 21-22  (เดือน 11):
  [ ] ภาษีที่ดินและสิ่งปลูกสร้าง (schema + UI)
  [ ] ใบอนุญาต (schema + basic UI)
  [ ] Counter Service payment channels

Sprint 23-24  (เดือน 12):
  [ ] Citizen CRM + ร้องเรียน (E4)
  [ ] API Gateway สำหรับ 3rd party integration
  [ ] Enterprise SLA dashboard
  [ ] Security audit + penetration testing
```

**KPIs Phase 3:**
- Predictive model accuracy: ≥75% on high-risk prediction
- อปท. ที่ใช้งาน: 30-50 แห่ง
- Enterprise tier customers: ≥3 แห่ง
- MRR เติบโต ≥50% จาก Phase 2

---

### Phase 4 — Scale & Ecosystem (ต่อเนื่อง)
**เป้าหมาย:** Platform expansion + IoT integration + marketplace

```
  [ ] API Marketplace สำหรับ 3rd party developers
  [ ] Integration: กรมส่งเสริม / กระทรวงมหาดไทย
  [ ] Multi-language support (ภาษาอังกฤษ + ภาษาท้องถิ่น)
  [ ] Franchise model: ให้บริษัทอื่น resell ได้
  [ ] Enterprise custom modules
  [ ] AWS IoT Core — GPS hardware tracking สำหรับรถเก็บขยะ (MQTT)
  [ ] Google Maps Route Optimization API — Enterprise VRP (> 1,000 stops)
  [ ] White-label branding ต่อ อปท.
```

---

## 8. Technology Stack Recommendations

### 8.1 Route Optimization Engine Options

| Option | ข้อดี | ข้อเสีย | แนะนำสำหรับ |
|--------|-------|---------|------------|
| **Google OR-Tools** | ฟรี, open-source, ยืดหยุ่นสูง, ทำงาน on-premise | ต้องพัฒนา integration เอง, ต้องมี ML engineer | Phase 2 เริ่มต้น |
| **OpenRouteService** | Free tier มี, self-host ได้, REST API ง่าย | Accuracy ต่ำกว่า Google Maps | Phase 2 สำรอง |
| **Google Maps Route Optimization API** | แม่นยำที่สุด, real-time traffic, ง่าย | มีค่าใช้จ่าย (~$10/1000 requests) | Phase 3 Enterprise tier |
| **Custom Algorithm** | Control เต็มที่ | ใช้เวลาพัฒนานาน | Phase 4 (ถ้า scale ใหญ่) |

**คำแนะนำ:** เริ่ม Phase 2 ด้วย OR-Tools (รันใน Celery worker — async, ไม่ block API) → ถ้า customers ต้องการ real-time traffic aware routing → upgrade เป็น Google Maps Route Optimization สำหรับ Enterprise tier (Phase 4)

> **Note (v1.1):** OR-Tools รัน native ใน FastAPI Python environment — ไม่ต้องมี microservice แยก ลดความซับซ้อนของ infrastructure

### 8.2 GPS Tracking Architecture

**Phase 1–3: Mobile GPS Polling (ตามที่ตกลง)**

```
Mobile App (PWA)
  → Background Location API (browser/native)
  → Batch upload ทุก 30 วินาที → FastAPI endpoint
  → AWS ElastiCache Redis (queue buffer)
  → Celery worker → RDS PostgreSQL (field_worker_locations partitioned table)
  → WebSocket (FastAPI/Redis pub-sub) → Officer Portal (real-time map)

Privacy Controls:
  - Track เฉพาะเวลาเปิด "Start Trip" → ปิด "End Trip"
  - ลบข้อมูล GPS หลัง 90 วัน (configurable per org)
  - พนักงานเห็นตัวเองเท่านั้น — Officer เห็นทุกคน
```

**Phase 4: IoT GPS Expansion Path (อนาคต)**

```
GPS Hardware Device (บนรถเก็บขยะ / มิเตอร์รีดเดอร์)
  → MQTT Protocol → AWS IoT Core (Bangkok region)
  → IoT Rule → AWS SQS → Celery consumer
  → RDS PostgreSQL (same field_worker_locations table)
  → WebSocket → Officer Portal

เหตุผลที่เริ่ม Mobile GPS ก่อน:
  - ไม่มีค่า hardware เพิ่มเติมในช่วง pilot
  - Schema รองรับทั้ง 2 แบบ (user_id เชื่อมได้ทั้ง mobile และ IoT device)
  - Phase 4 เพิ่ม device_id column + IoT consumer worker เท่านั้น
```

### 8.3 ML Model for Risk Scoring

```
Input Features (ต่อ household ต่อเดือน):
  - จำนวนเดือนที่ค้างชำระใน 12 เดือนที่ผ่านมา
  - ยอดค้างสูงสุดในประวัติ
  - วันเฉลี่ยที่ชำระหลังครบกำหนด
  - ประเภทอาคาร (residential/commercial)
  - ประวัติการ respond ต่อ notification
  - ฤดูกาล (บางช่วงค้างมากกว่าปกติ)

Model: Logistic Regression → LightGBM (เมื่อมีข้อมูลเพียงพอ)
Training: ทุกเดือน ด้วยข้อมูล anonymized รวมจากทุก org
Inference: Celery batch worker รายเดือน (ไม่ต้อง real-time)
Stack: scikit-learn / LightGBM (native ใน FastAPI Python — ไม่ต้องมี ML platform แยก)
```

### 8.4 Backend API — FastAPI Architecture

```
FastAPI Application Structure:
  app/
  ├── api/
  │   ├── v1/           ← Phase 1 stable endpoints
  │   ├── v2/           ← Phase 2 features (route opt, dunning)
  │   └── v3/           ← Phase 3 features (analytics, ML)
  ├── workers/
  │   ├── dunning.py    ← Celery dunning scheduler
  │   ├── billing.py    ← Celery batch billing (ACID-safe)
  │   ├── notify.py     ← LINE / SMS sender
  │   ├── route_opt.py  ← OR-Tools VRP solver
  │   └── risk_score.py ← ML inference monthly batch
  ├── db/               ← asyncpg connection pool
  ├── models/           ← Pydantic schemas
  └── services/         ← Business logic

Deployment:
  FastAPI app  → AWS ECS Fargate (auto-scaling)
  Celery workers → AWS ECS Fargate (separate task definition)
  Redis broker → AWS ElastiCache
  Database     → AWS RDS PostgreSQL Multi-AZ (Bangkok)
  Entry point  → AWS API Gateway HTTP API → ECS
```

---

## 9. ROI & Pricing Justification

### 9.1 ผลตอบแทนจาก Route Optimization (สำหรับ อปท.)

**สมมติ: อปท. ขนาดกลาง มีรถ 3 คัน ออกวัน 250 วัน/ปี**

| รายการ | ก่อน Optimize | หลัง Optimize (ประมาณการ) | ประหยัด/ปี |
|--------|-------------|------------------------|-----------|
| ระยะทาง/วัน | 80 กม./คัน | 65 กม./คัน (-19%) | 11,250 กม. |
| น้ำมัน (8 ลิตร/100กม.) | 192 ลิตร/วัน | 156 ลิตร/วัน | 9,000 ลิตร |
| ค่าน้ำมัน (@35 บาท/ลิตร) | — | — | **315,000 บาท** |
| เวลางาน/วัน | 7.5 ชั่วโมง/คัน | 6 ชั่วโมง/คัน | 1.5 ชั่วโมง/คัน |
| ค่าแรงล่วงเวลา (OT) | มีบ่อย | แทบไม่มี | **~50,000-100,000 บาท** |

> **รวมประหยัด: ~365,000-415,000 บาท/ปี** จากรถ 3 คัน
>
> ค่า subscription AI-ROUTE Module (ประมาณการ): ~36,000-60,000 บาท/ปี
> → ROI ≈ 6-11x ใน 1 ปี → Payback period < 2 เดือน

### 9.2 Value Proposition ต่อ Tier

| Tier | Module หลัก | ราคาเพิ่ม (ประมาณ) | ROI หลัก |
|------|------------|-----------------|---------|
| Basic | Core Billing | — | เก็บค่าธรรมเนียมได้ครบขึ้น |
| Field Pack | + FIELD-WASTE + STICKER | +X% | ค้างชำระลด 15-25% |
| Water Pack | + FIELD-METER + OCR | +X% | เวลาจดมิเตอร์ลด 80% |
| Pro | + AI-ROUTE + GEO-FENCE | +X% | น้ำมัน/แรงงานลด 15-20% |
| Enterprise | ทั้งหมด + BI + Predict | +X% | ROI รวม > 10x |

> ราคาจริงคำนวณตาม household count + จำนวน modules — ให้ทีม Pricing กำหนดหลัง Phase 1

### 9.3 Features ที่ช่วย Justify Price Increase ได้มากที่สุด

1. **AI Route Optimization** — ROI วัดได้ชัดเจน เป็นตัวเลข ลูกค้าคำนวณ payback เองได้
2. **Geo-fencing Verification** — โปร่งใส ตรวจสอบได้ ป้องกัน fraud
3. **Smart Dunning** — เพิ่มรายได้โดยตรง โดยไม่เพิ่มพนักงาน
4. **Predictive Risk Scoring** — เป็น "intelligence" ที่คู่แข่งไม่มี
5. **ESG / Carbon Report** — ตอบสนองความต้องการใหม่จากหน่วยงานกำกับ

---

---

## 10. Infrastructure Architecture — AWS Bangkok

### 10.1 เหตุผลที่เลือก AWS Bangkok (ap-southeast-7)

| เกณฑ์ | AWS Bangkok | เหตุผล |
|-------|------------|--------|
| Data Residency | ✅ ครบ | region เปิดปลาย 2024, ข้อมูลอยู่ในไทย 100% |
| PDPA มาตรา 28 | ✅ ผ่าน | ไม่มี cross-border PII transfer |
| Cybersecurity Act | ✅ ผ่าน | CloudTrail + WAF + encryption at rest |
| ราคา | ✅ แข่งขันได้ | ใกล้เคียง Singapore region แต่ latency ต่ำกว่า |
| Managed Services | ✅ ครบ | RDS, ElastiCache, ECS Fargate, API GW, S3 ทั้งหมดใน Bangkok |

### 10.2 Infrastructure Diagram

```
┌─────────────────────── AWS ap-southeast-7 Bangkok ─────────────────────────┐
│                                                                              │
│  [Internet / อปท. Users]                                                    │
│        │                                                                     │
│        ▼                                                                     │
│  [AWS CloudFront] ─── Static assets (React PWA, images)                    │
│        │                                                                     │
│        ▼                                                                     │
│  [AWS WAF] ─── OWASP ruleset, rate limiting, DDoS protection               │
│        │                                                                     │
│        ▼                                                                     │
│  [AWS API Gateway HTTP API] ─── $1/million calls                           │
│        │  JWT authorizer, route-level throttling                             │
│        │                                                                     │
│        ▼                                                                     │
│  [AWS ECS Fargate — FastAPI] ──────────── [AWS ElastiCache Redis]          │
│        │   Auto-scaling, 2+ tasks          Celery broker + cache            │
│        │                                         │                          │
│        │                              [ECS Fargate — Celery Workers]        │
│        │                                ├── dunning_scheduler               │
│        │                                ├── billing_batch                   │
│        │                                ├── notification_sender             │
│        │                                └── route_optimizer (OR-Tools)      │
│        │                                                                     │
│        ▼                                                                     │
│  [AWS RDS PostgreSQL 15 Multi-AZ]                                           │
│        Primary (Bangkok AZ-a) ←→ Standby (Bangkok AZ-b)                    │
│        WAL streaming + automated backup (7 วัน)                            │
│                                                                              │
│  [AWS S3 Bangkok] ── รูปถ่าย, เอกสาร, PDF exports (AES-256)              │
│                                                                              │
│  [AWS CloudTrail + CloudWatch] ── Audit log ระดับ infra + APM              │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

External Services (ไม่เก็บ PII):
  Google Cloud Vision API ── OCR ภาพมิเตอร์ (stripped ก่อนส่ง)
  LINE Messaging API ─────── ส่ง notification
  Twilio SMS ─────────────── SMS fallback
  Sentry / Datadog ───────── Error monitoring / APM
```

### 10.3 API Gateway — AWS API Gateway (HTTP API)

| ข้อดี | รายละเอียด |
|-------|-----------|
| ราคา | $1.00 / million API calls (ถูกกว่า REST API ~70%) |
| JWT Authorizer | verify JWT โดยไม่ต้อง lambda → latency ต่ำ |
| Rate limiting | per-route throttling (เช่น payment endpoint 100 req/วินาที) |
| Integration | direct ECS integration, ไม่ต้องมี ALB เพิ่ม |
| CORS | built-in CORS config ต่อ route |

**ประมาณการค่าใช้จ่าย (Phase 1 — 5 orgs, 50K calls/วัน):**
```
API Gateway:  50,000 × 30 = 1.5M calls/เดือน × $1/M = $1.50/เดือน
ECS Fargate:  2 tasks × 0.25 vCPU × 0.5 GB → ~$15-20/เดือน
RDS db.t3.medium Multi-AZ: ~$80/เดือน
ElastiCache cache.t3.micro: ~$15/เดือน
S3 + CloudFront: ~$5/เดือน

รวม Phase 1: ~$120-130 USD/เดือน (ก่อนใช้ Reserved Instance)
```

---

## 11. Celery Worker Architecture

### 11.1 Worker Types และ Queue Routing

```
┌─────────────────────────────────────────────────────────┐
│                   Redis Broker (ElastiCache)             │
├─────────────┬──────────────┬───────────────┬────────────┤
│  Queue:     │  Queue:      │  Queue:       │  Queue:    │
│  dunning    │  billing     │  notify       │  route_opt │
└──────┬──────┴──────┬───────┴────────┬──────┴─────┬──────┘
       │             │                │            │
       ▼             ▼                ▼            ▼
  dunning_      billing_        notify_       route_opt_
  scheduler     batch           sender        worker
  worker        worker          worker        (OR-Tools)

  รายวัน 02:00   รายรอบ         on-demand     on-demand
  scan overdue   billing cycle   after event   after approve
```

### 11.2 Worker Specifications

| Worker | Trigger | Task | ACID Guarantee |
|--------|---------|------|----------------|
| `dunning_scheduler` | Cron 02:00 น. ทุกวัน | scan bills overdue → trigger policy steps | Advisory lock per org |
| `billing_batch` | Manual / scheduled | สร้างบิลทุกครัวเรือนใน billing cycle | Checkpoint table + advisory lock |
| `notification_sender` | Event-driven | ส่ง LINE / SMS / email | Idempotency key ต่อ message |
| `route_optimizer` | On-demand (user trigger) | OR-Tools VRP solve | ผล store ใน optimized_route_plans |
| `risk_scorer` | Monthly cron | ML inference ต่อ household | Batch upsert ใน arrears_risk_scores |

### 11.3 Celery Configuration

```python
# celery_config.py
from celery import Celery

app = Celery("gismo")
app.config_from_object({
    "broker_url": "redis://elasticache-endpoint:6379/0",
    "result_backend": "redis://elasticache-endpoint:6379/1",
    "task_serializer": "json",
    "result_expires": 3600,
    "task_routes": {
        "workers.dunning.*":   {"queue": "dunning"},
        "workers.billing.*":   {"queue": "billing"},
        "workers.notify.*":    {"queue": "notify"},
        "workers.route_opt.*": {"queue": "route_opt"},
    },
    "beat_schedule": {
        "daily-dunning-scan": {
            "task": "workers.dunning.run_daily_scan",
            "schedule": crontab(hour=2, minute=0),  # 02:00 ทุกวัน
        },
        "monthly-risk-score": {
            "task": "workers.risk_scorer.run_monthly",
            "schedule": crontab(day_of_month=1, hour=3, minute=0),
        },
    },
})
```

---

## 12. GPS Tracking & IoT Expansion Path

### 12.1 Phase 1–3: Mobile GPS Polling

```
สำหรับ Phase 1-3 ใช้ Mobile GPS ผ่าน PWA Browser API:
  - Geolocation API (browser-native, ไม่ต้องมี SDK พิเศษ)
  - Poll ทุก 30 วินาที → batch POST ไป /api/v1/field/locations
  - FastAPI endpoint → Redis queue → Celery consumer → PostgreSQL
  - Officer Portal รับข้อมูลผ่าน WebSocket (FastAPI + Redis pub-sub)

ข้อดี: ไม่มีค่า hardware เพิ่ม, deploy เร็ว, ทดสอบกับ pilot ได้ทันที
ข้อเสีย: battery drain สูงกว่า IoT device, accuracy ขึ้นกับสัญญาณมือถือ
```

### 12.2 Phase 4: AWS IoT Core (MQTT) Expansion

```
เมื่อ อปท. ต้องการ GPS hardware บนรถ (แม่นยำกว่า, battery ดีกว่า):

GPS Hardware Device (4G/LTE + GPS chip)
  → MQTT Protocol (lightweight, เหมาะ IoT)
  → AWS IoT Core (Bangkok region)
  → IoT Rule Engine → AWS SQS
  → Celery SQS consumer → PostgreSQL (same table, device_id column)
  → WebSocket → Officer Portal

Migration Plan (Mobile → IoT):
  1. เพิ่ม device_id column ใน field_worker_locations (ALTER ADD — no downtime)
  2. Deploy IoT Core rule + SQS consumer (parallel กับ mobile API)
  3. ทั้ง mobile และ IoT device ทำงานพร้อมกันได้ (hybrid period)
  4. Phase out mobile GPS เมื่อ hardware ติดตั้งครบทุกรถ
```

### 12.3 เปรียบเทียบ Mobile GPS vs IoT GPS

| Attribute | Mobile GPS (Phase 1-3) | IoT Hardware (Phase 4) |
|-----------|----------------------|----------------------|
| ค่าติดตั้ง | ฟรี (ใช้มือถือที่มีอยู่) | 2,000–5,000 บาท/คัน |
| GPS Accuracy | ±5–15 เมตร | ±2–5 เมตร |
| Battery impact | สูง (drain มือถือ) | ต่ำ (device มี battery เอง) |
| Internet dependency | ต้องมีสัญญาณมือถือ | 4G SIM card ใน device |
| ข้อมูล continuous | บางครั้งหาย (app background) | ต่อเนื่อง 24/7 |
| Protocol | HTTPS REST | MQTT (lightweight) |
| เหมาะกับ | Pilot, อปท. เล็ก | Scale-up, รถมาก |

---

## 13. Two-Sided Collection Architecture (v3.6)

### 13.1 พฤติกรรมการเก็บขยะสองฝั่ง

```
รถจอด (1 จุด = 1 cluster)
  ├── คนงาน A → ฝั่งซ้าย (road_side = 'left')
  └── คนงาน B → ฝั่งขวา (road_side = 'right')
                     ↓
         บันทึก collection_event ต่อบ้าน
         (collected / skipped_unpaid)
```

**ผลลัพธ์:** ลดจำนวนจุดจอด ≈ 50% → ลดเวลาและระยะทาง

---

### 13.2 Road Side Detection Algorithm

**Function: `detect_road_side_simple()`**

```python
# Cross-product calculation (ทิศทางเวกเตอร์ถนน × เวกเตอร์บ้าน)
cross = (road_lng2 - road_lng1) * (house_lat - road_lat1) \
      - (road_lat2 - road_lat1) * (house_lng - road_lng1)

if   cross >  threshold: road_side = 'left'
elif cross < -threshold: road_side = 'right'
else:                    road_side = 'center'   # ซอย/ทางตัน
```

**threshold** = 1e-6 (ป้องกัน floating-point noise บน GPS ±5–15 เมตร)

**แหล่งข้อมูล road vector:**
- Phase 1: คำนวณจากลำดับ GPS waypoints ของเส้นทางที่บันทึกไว้ใน `collection_routes`
- Phase 2+: OpenStreetMap road geometry (osm_road_id) — แม่นยำกว่า

**road_side population strategy:**

| แหล่งที่มา | `road_side_source` | เมื่อไหร่ |
|-----------|-------------------|---------|
| `detect_road_side_simple()` | `gps_auto` | Route Optimizer Celery worker รัน |
| เจ้าหน้าที่กรอก ระหว่าง survey | `survey_field` | TAX-PROPERTY field survey (แผนที่ภาษีที่ดิน) |
| Admin แก้ด้วยมือ | `manual` | กรณี auto-detect ผิด |

---

### 13.3 Cluster Generation (Route Optimizer Celery Worker)

```
Route Optimizer รัน (Celery: route_optimizer worker)
  1. Load households ใน route พร้อม GPS + road_side
  2. Project coordinates → road_position_m (ระยะตามถนน)
  3. Group households ที่ road_position_m ใกล้กัน (tolerance: 15 เมตร)
     → สร้าง collection_stop_clusters record ต่อกลุ่ม
  4. Assign cluster_id → collection_route_stops
  5. Count left_side_count + right_side_count + center_count ต่อ cluster
  6. Estimate stop time: estimated_stop_min = MAX(left_count, right_count) × 2 นาที
```

---

### 13.4 Collection Skip Rule — Business Logic

```json
organizations.collection_skip_rule = {
  "skip_unpaid": true,
  "skip_threshold_days": 0,
  "show_unpaid_on_map": true,
  "allow_worker_override": false
}
```

| Rule | ผลลัพธ์ |
|------|--------|
| `skip_unpaid: true` | บ้านที่ payment_status ≠ paid/partial → required_action = skip |
| `skip_threshold_days: 0` | ค้างชำระแม้แค่วันเดียวก็ skip ทันที |
| `allow_worker_override: false` | ปุ่ม [เก็บ] disabled บน D-03 — ไม่มี override ทุกกรณี |
| `show_unpaid_on_map: true` | pin สีแดงยังแสดงบน D-02 (driver เห็น แต่ skip เท่านั้น) |

**Ground Truth:** `payment_status_at_collection` ถ่ายจาก DB ณ เวลากดปุ่ม — ไม่อ่านสติ๊กเกอร์ กรณีสติ๊กเกอร์หลุดหรือเจ้าของบ้านไม่ติด ระบบยังคงถูกต้อง

---

### 13.5 Printable Collection Map — Phase 2

| Item | รายละเอียด |
|------|-----------|
| Output | PDF A4 ต่อ route/zone — แผนผังบ้านสองฝั่ง พร้อมสีสถานะ |
| Data source | `v_collection_route_map` |
| Library | WeasyPrint (Python) + SVG map overlay |
| เหตุผลที่เลื่อน Phase 2 | ต้องการ map tile rendering + layout design บน A4 — ซับซ้อนกว่า mobile view |
| Use case | พิมพ์แจกพนักงานก่อนออกรถ — อ่านผังได้โดยไม่ต้องพึ่งมือถือ |

---

*เอกสารนี้เป็น living document — อัปเดตเมื่อ product direction หรือ technical decision เปลี่ยนแปลง*  
*v1.2 — เมษายน 2569: Two-Sided Collection (road_side detection, cluster generation, collection skip rule)*  
*v1.1 — เมษายน 2569: FastAPI + AWS Bangkok + Celery + IoT expansion path*

*Confidential — For Product & Engineering Team Only*
