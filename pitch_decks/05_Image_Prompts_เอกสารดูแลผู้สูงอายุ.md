# 🎨 Image Prompts — เอกสารดูแลผู้สูงอายุ (03.html)

> ใช้ prompt เหล่านี้กับ AI image generator ตัวไหนก็ได้ (Midjourney / DALL·E / Firefly / Imagen ฯลฯ)
> **gen แล้วบันทึกไฟล์ตามชื่อใน "Save as" → วางในโฟลเดอร์ `images/elderly-care/` ของ smartdatapresent**
> ระบบในไฟล์ 03.html มี `onerror` รองรับ — ถ้ายังไม่มีรูป จะโชว์ placeholder แทน วางรูปแล้วขึ้นเอง

---

## กฎรูปทั้งชุด (ใส่ต่อท้ายทุก prompt)

**Style lock (Civic Trust):**
- โทนสี: forest green (#1F4D3F) + sage + cream (#F5EFE0) accents · warm, trustworthy, calm
- อารมณ์: อบอุ่น · เห็นใจ · มีศักดิ์ศรี (ไม่ใช่หดหู่/น่าสงสาร)
- คน: **ผู้สูงอายุไทย/เอเชียตะวันออกเฉียงใต้** ผิวสีแทน สมจริง วัย 65-80
- คุณภาพ: photorealistic editorial photography, soft natural light, shallow depth of field

**ห้ามมี (no-brand / compliance):**
- ❌ ห้ามมีโลโก้ · ยี่ห้อ · ตัวหนังสือบนอุปกรณ์/หน้าจอที่อ่านออก
- ❌ ห้ามมีหน้าจอ UI ที่เห็นข้อมูลคนไข้จริง (กัน PDPA)
- ❌ ห้ามมีกล้องวงจรปิดจ่อหน้าคน (กันภาพ surveillance)
- ❌ ห้ามมีเลือด/เข็ม/ภาพการแพทย์น่ากลัว · ห้ามชุดกาวน์ รพ. แบบหดหู่
- ❌ ห้ามมีข้อความ/ตัวอักษรในรูป (จะใส่ข้อความใน HTML เอง)

**Aspect ratio:** ระบุในแต่ละรูป

---

## รูปที่ 1 — HERO (หน้า 1) ⭐ สำคัญสุด

**Save as:** `images/elderly-care/hero-elderly.jpg`
**Aspect:** 4:5 (แนวตั้ง)

```
A warm, dignified portrait of an elderly Thai woman (around 70) sitting alone
by a window in a modest traditional Thai home during daytime. Soft natural
window light. She looks calm and content but the framing suggests she is alone
in the house. Wooden interior, a few potted plants. Editorial documentary
photography style, shallow depth of field, muted warm tones with forest-green
and cream color grading. Conveys care and empathy, not pity. No text, no logos,
no medical equipment visible. Photorealistic.
```

---

## รูปที่ 2 — ชุดอุปกรณ์ดูแลสุขภาพ (สำหรับหน้า "ผู้สูงอายุได้รับอะไรบ้าง")

**Save as:** `images/elderly-care/health-kit.jpg`
**Aspect:** 16:9

```
A clean, neatly arranged flat-lay of a personal home health-monitoring kit on a
cream-colored fabric surface: a generic smartwatch (plain, no visible brand),
a simple blood-pressure cuff, a small fingertip pulse-oximeter clip, a compact
glucose meter, and a soft carrying pouch. Soft top-down studio light, forest-green
and cream palette, calm and trustworthy product photography. Devices are plain
and unbranded with no readable text or screens. No logos. Photorealistic.
```

---

## รูปที่ 3 — ผู้สูงอายุสวมนาฬิกา ใช้ชีวิตปกติ (หน้า "ป้องกันถูกกว่ารักษา")

**Save as:** `images/elderly-care/active-senior.jpg`
**Aspect:** 16:9

```
An elderly Thai man (around 72) smiling while watering plants in his garden in
the morning, wearing a plain unbranded smartwatch on his wrist. He looks healthy,
independent and happy. Warm morning light, lush green garden, forest-green and
cream color grading. Documentary lifestyle photography, conveys active healthy
aging and independence. No text, no logos, no readable watch screen. Photorealistic.
```

---

## รูปที่ 4 — อสม. เยี่ยมบ้าน (หน้า "วันธรรมดาของ อสม." / "เก็บข้อมูล")

**Save as:** `images/elderly-care/osm-visit.jpg`
**Aspect:** 16:9

```
A warm scene of a Thai community health volunteer (middle-aged woman, casual
polo shirt, friendly) visiting an elderly woman at her home, gently helping her
use a simple blood-pressure cuff at a wooden table. Both smiling, natural daylight,
homey Thai interior. Forest-green and cream tones, documentary photography,
conveys trust and community care. No uniforms with visible logos, no readable
screens, no text. Photorealistic.
```

---

## รูปที่ 5 — เซนเซอร์เรดาร์ในห้อง (หน้า "ความเป็นส่วนตัว · ไม่ติดกล้อง") — illustration

**Save as:** `images/elderly-care/radar-privacy.png`
**Aspect:** 4:3 · **สไตล์: clean vector illustration (ไม่ใช่ภาพถ่าย)**

```
A clean, minimal vector illustration showing a cross-section of a private room
(bedroom/bathroom) with a small discreet wall-mounted sensor emitting soft
concentric wave arcs toward a stylized human silhouette standing, and a second
silhouette shown fallen on the floor highlighted in a warm alert tone. The waves
suggest motion-sensing, NOT a camera image. Forest-green (#1F4D3F), sage, and
cream (#F5EFE0) palette, flat modern infographic style, calm and reassuring.
Emphasize "sees movement, not images." No text labels, no camera lens, no faces.
```

---

## รูปที่ 6 — Dashboard ศูนย์ดูแลของเทศบาล ⭐ (เปลี่ยนใหม่ · ให้ดูเหมือนจริง น่าเชื่อถือ)

> **หมายเหตุ:** เวอร์ชัน vector ว่างๆ เดิมถูกตัดทิ้ง เพราะทำให้ลูกค้ารู้สึกว่า "ระบบยังไม่มีอะไร"
> แทนที่ด้วย **mockup UI จริง** ที่ออกแบบแล้ว → ไฟล์ `pitch_decks/ui/coc_dashboard_mockup.html`
> **วิธีใช้:** เปิดไฟล์นั้นใน browser → แคปหน้าจอ (หรือพิมพ์ PDF) → ได้รูป dashboard ที่ดูเหมือนระบบจริง

**Save as:** `images/elderly-care/coc-dashboard.png` (แคปจาก mockup ข้างบน)

> **⚠️ PDPA:** หน้าหลักที่โชว์ในที่ประชุม **ห้ามมีชื่อ-นามสกุล + ข้อมูลสุขภาพรายคน**
> (= ข้อมูลส่วนบุคคลอ่อนไหว ม.26) → ออกแบบเป็น **GIS + สถิติรวม ไม่ระบุตัวตน** แทน
> ส่วน "ดูรายบุคคล" ทำเป็นกล่องล็อก สื่อว่า "เฉพาะเจ้าหน้าที่ที่มีสิทธิ์ + audit log"

**ถ้าจะให้ Claude design / AI ออกแบบ dashboard ใหม่ ใช้ prompt นี้ (เวอร์ชัน GIS · PDPA-safe):**

```
Design a realistic, trustworthy GIS overview dashboard for a Thai municipality's
"community health overview center". The MAIN screen must be AGGREGATE and
ANONYMOUS — NO individual names, NO per-person health data on the main view
(PDPA-sensitive). Include:

1. Top bar: "ภาพรวมสุขภาพชุมชน · เทศบาลตำบลสาธิต" + a shield pill
   "ข้อมูลสรุป ไม่ระบุตัวตน".
2. A GIS choropleth MAP of 7 villages (ม.1-ม.7) color-coded by area risk
   (red = high risk, amber = watch, green = normal, teal = well-covered),
   with a marked point for "รพ.สต. / ศูนย์ดูแล". Title the map "ระดับความเสี่ยงรายพื้นที่"
   with a plain color legend (เสี่ยงสูง / เฝ้าระวัง / ปกติ / ครอบคลุมดี) — do NOT use the
   internal jargon "ปิงปอง 7 สี" anywhere on the customer-facing screen.
3. Four aggregate stat cards: elderly in area (1,284), LTC dependents (96),
   care coverage (87%), community health volunteers อสม. (62).
4. A "disease totals (anonymous)" panel with horizontal bars: hypertension (418),
   diabetes (301), heart disease (147), respiratory (89).
5. A "zone risk this week" panel: pills like "ม.4 · 5 emergencies",
   "ม.2 · recurring flood point", "ม.6 · low อสม. coverage", "ม.1,5,7 · normal".
6. A small LOCKED card "ข้อมูลรายบุคคล" with a lock icon, text: individual
   health summaries are viewable only by authorized staff (login + PDPA audit log).

STYLE: Civic Trust palette — forest green (#1F4D3F) header, sage (#4A7C59),
cream (#F5EFE0) bg, white cards, Sarabun Thai font. Clean, flat, credible
government SaaS look — like a working product, not a concept sketch.

HARD RULES:
- NO brand names (no vendor/OEM/chip/software names) — generic only
- NO individual names or per-person vitals on the main screen (PDPA)
- All aggregate numbers clearly fictional/sample
```

> 💡 **ใช้ mockup HTML ที่ทำให้แล้วดีที่สุด** (`ui/coc_dashboard_mockup.html` — GIS + สถิติรวม + กล่องล็อก PDPA · สีตรงเอกสาร แก้ข้อความไทยง่าย) — prompt ข้างบนไว้เผื่ออยากให้ AI gen เป็นรูปภาพแทน

---

## รูปที่ 7 (ทางเลือก) — ครอบครัวอุ่นใจ (หน้า benefits / CTA)

**Save as:** `images/elderly-care/family-peace.jpg`
**Aspect:** 16:9

```
A heartwarming scene of a younger Thai adult (working age) looking relieved and
smiling while glancing at a phone, in a modern setting, implying they can check
on their elderly parent remotely. Optional split feel with a calm elderly parent
at home in soft focus. Warm tones, forest-green and cream grading, lifestyle
documentary photography, conveys peace of mind across distance. No readable phone
screen, no logos, no text. Photorealistic.
```

---

## วิธีวางรูปลงไฟล์ 03.html (เมื่อ gen เสร็จ)

1. สร้างโฟลเดอร์ (ถ้ายังไม่มี): `smartdatapresent/public/images/elderly-care/` หรือ `images/elderly-care/`
2. วางไฟล์ตามชื่อ "Save as" ข้างบน
3. เปิด 03.html — hero จะขึ้นรูปอัตโนมัติ (มี path `images/elderly-care/hero-elderly.jpg` ฝังไว้แล้ว)
4. รูปอื่นๆ (2-7) ยังไม่ได้ฝัง `<img>` ในสไลด์ — บอกผมได้ว่าอยากวางรูปไหนในสไลด์ไหน เดี๋ยวผมแทรก `<img>` + caption ให้ (ตอนนี้เว้นไว้เพื่อไม่ให้สไลด์แน่นเกินอ่าน)

> 💡 **แนะนำลำดับความสำคัญ:** รูป 1 (hero) > รูป 5 (เรดาร์ illustration · ช่วยอธิบาย "ไม่ติดกล้อง") > รูป 2 (ชุดอุปกรณ์) > ที่เหลือ
> ถ้าจะ gen แค่ 2-3 รูป เลือก 1, 5, 2 ก่อน
