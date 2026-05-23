# เนื้อหาหน้า mmWave Radar — Smart Data Website

**Audience:** Dealer/Partner CCTV รายใหญ่ (B2B) ที่ติดตั้งงานราชการภาคกลาง
**Goal:** เปิดจินตนาการให้ partner เห็นว่า เอา radar ไปต่อยอดกับ CCTV เดิมของเขาได้ยังไง → เกิดงานใหม่ร่วมกัน
**Tone:** B2B partner-to-partner · พูด spec ได้ · พูด feature ได้ · ห้ามคุยเรื่องราคาในหน้านี้ (ราคาคุยตัวต่อตัว)
**Framework:** Pain → Benefit → Solution → Differentiator → Use cases → Demo

---

## SECTION 1 — Hero (เปิดด้วย Pain ของ partner CCTV)

### Eyebrow chip
`SMART TRAFFIC · SENSOR FUSION`

### Hero headline
**กล้องเดิมของคุณ เก่งกลางวัน — แต่ยังตอบลูกค้าไม่ได้ตอนกลางคืน ฝนตก และย้อนแสง**

### Sub-headline
mmWave Radar เสริมกล้อง CCTV ที่คุณติดตั้งให้ลูกค้าอยู่แล้ว
ให้นับรถ วัดความเร็ว แยกประเภทยานพาหนะ ได้แม่นยำ 24 ชั่วโมง ทุกสภาพอากาศ
**โดยไม่ต้องเปลี่ยนกล้อง ไม่ต้องเปลี่ยน NVR**

### Primary CTA
`คุยโจทย์งานจริงกับเรา` (link → Contact / LINE OA)

### Secondary CTA
`ดูคลิปสาธิต ↓` (anchor → #demo)

### Hero visual
- พื้นหลัง: video loop จาก 0518.mov (มี overlay แสดง count/speed) — autoplay · muted · loop · playsinline
- เลเยอร์: ข้อความ hero อยู่ฝั่งซ้าย, video อยู่ฝั่งขวา (desktop) / ซ้อนใต้ข้อความ (mobile)

---

## SECTION 2 — Pain panel (สิ่งที่ partner CCTV รู้ดีว่าลูกค้าบ่น)

### Section eyebrow
`ปัญหาที่ดีลเลอร์ CCTV เจอประจำ`

### Section headline
**ลูกค้าซื้อกล้องไปแล้ว แต่ขอข้อมูลเพิ่มอีกเรื่อยๆ**

### 4 Pain cards (icon + title + 1 บรรทัด description)

**Pain 1 — มืดแล้วนับไม่ได้**
ตอนกลางคืน กล้อง IR ก็ยังตกหล่น มอเตอร์ไซค์เล็ก รถความเร็วสูง หรือรถที่เปิดไฟสูงย้อนเลนส์ ระบบนับพลาด

**Pain 2 — ฝน หมอก ฝุ่น = ภาพไม่ชัด**
หน้าฝนทีไร ภาพเบลอ AI detect ผิด ลูกค้าโทรมาขอสรุปจราจรไม่ได้ ทีมต้องไปกู้ระบบ

**Pain 3 — ความเร็วต้องวัดจริง ไม่ใช่ประมาณการ**
ลูกค้าราชการเริ่มถามว่า "วัดความเร็วได้ทุกคันไหม" เพราะต้องเอาไปทำรายงานความปลอดภัยถนน CCTV เดี่ยวๆ ไม่มีคำตอบ

**Pain 4 — ขยายงานยาก ถ้าต้องพึ่ง compute หนัก**
จะเพิ่ม analytics ลึกๆ ก็ต้องไปอัปเกรด AI box, เพิ่ม GPU, เพิ่ม bandwidth — งบบาน, ลูกค้าถอย

---

## SECTION 3 — Solution overview (Radar + CCTV = Sensor Fusion)

### Section eyebrow
`แนวทางที่เราเสนอ`

### Section headline
**ไม่ต้องเปลี่ยนกล้อง — แค่เติม mmWave Radar เป็น "ตาที่สอง"**

### Lead paragraph
mmWave Radar คือเซนเซอร์คลื่นความถี่สูง ที่มองเห็นการเคลื่อนไหวด้วย **คลื่นวิทยุ ไม่ใช่แสง**
แปลว่ามันทำงานได้ดี **ในที่ที่กล้องทำงานไม่ดี** — กลางคืน, ฝน, หมอก, ฝุ่น, ย้อนแสง
เมื่อเอามาทำงานคู่กับ CCTV ของคุณ ระบบจะใช้ข้อมูลจาก radar เป็นความจริงหลัก (ground truth)
และให้ CCTV เป็นตัวยืนยันภาพ + อ่านป้ายทะเบียน → ได้ข้อมูลที่แม่นกว่า CCTV เดี่ยวๆ มาก

### 3-step "How it works" (horizontal cards)

**STEP 1 — Radar ตรวจจับ**
mmWave Radar ส่งคลื่นออกไปและรับสะท้อนกลับ
ได้ระยะ + ความเร็ว + ทิศทาง ของทุกวัตถุที่เคลื่อนไหวในรัศมีหลายร้อยเมตร — แม้ในความมืดสนิท

**STEP 2 — CCTV ยืนยันภาพ**
เมื่อ radar เจอวัตถุ ระบบจะ trigger ให้กล้อง CCTV ในตำแหน่งเดียวกัน snap ภาพ ณ จังหวะที่รถอยู่ในเฟรมพอดี
ภาพคมขึ้น, ลด false snap, ลด storage

**STEP 3 — รวมข้อมูล ส่งให้ลูกค้า**
ระบบหลังบ้านนำข้อมูล radar (count, speed, class) + ภาพจาก CCTV + ป้ายทะเบียน
มารวมเป็น dashboard เดียว แสดงแบบ real-time + ย้อนหลังได้

---

## SECTION 4 — Features (Spec ที่ partner ต้องรู้)

### Section eyebrow
`ความสามารถของ mmWave Radar ที่เราใช้`

### Section headline
**เซนเซอร์ระดับงานจราจร ที่ออกแบบสำหรับ outdoor 24/7**

### Feature grid (6 cards · icon + title + bullet)

**1. นับยานพาหนะแบบทุกคัน ไม่มีตกหล่น**
- ตรวจจับได้ทุกขนาด ตั้งแต่มอเตอร์ไซค์ถึงรถบรรทุก
- ความแม่นยำในการนับ ใกล้ระดับสายตามนุษย์
- ทำงานได้ทั้งตอนกลางวันและกลางคืน ไม่มีจุดบอด

**2. วัดความเร็วได้ทุกคันแบบ real-time**
- วัด instantaneous speed ของทุกวัตถุที่ผ่านพื้นที่ตรวจจับ
- ใช้หลัก Doppler effect — เป็นการวัดจริง ไม่ใช่ประมาณจากภาพ
- รายงานเป็น km/h ส่งเข้า dashboard ทันที

**3. แยกประเภทยานพาหนะอัตโนมัติ**
- แยกได้: มอเตอร์ไซค์ / รถยนต์ / รถบรรทุก / รถบัส / คนเดิน
- ใช้ขนาด radar cross-section + รูปแบบความเร็ว ในการจำแนก
- ไม่ต้องพึ่งแสง — ใช้งานคืนได้แม่นเท่ากลางวัน

**4. ทำงานในทุกสภาพอากาศ**
- คลื่น mmWave ทะลุฝน หมอก ฝุ่น ควัน ได้
- ไม่กระทบจากแสงย้อน / หน้าฝน / ตอนพลบค่ำ
- IP-rated สำหรับติดตั้ง outdoor ระยะยาว

**5. ระยะตรวจจับไกล ครอบคลุมหลายเลน**
- ระยะตรวจจับยาน 200+ เมตร
- ครอบคลุมถนน 4–6 เลนต่อชุด
- ลดจำนวนจุดติดตั้ง เทียบกับการใช้ CCTV หลายตัว

**6. กินไฟต่ำ ใช้ compute ของกล้องเดิมได้**
- กินไฟต่ำกว่า AI camera หลายเท่า
- ส่งข้อมูลเป็น metadata (เลข count, speed, class) ไม่ใช่ video
- bandwidth ที่ต้องใช้น้อยมาก — ใช้กับ network เดิมของไซต์ลูกค้าได้

---

## SECTION 5 — Differentiator (CCTV-only vs CCTV + Radar)

### Section eyebrow
`ทำไมแค่ CCTV ไม่พอ`

### Section headline
**เปรียบเทียบสิ่งที่ลูกค้าเคยได้ vs สิ่งที่ลูกค้าจะได้**

### Comparison table

| สถานการณ์ | CCTV เดี่ยว | CCTV + mmWave Radar |
|---|---|---|
| กลางวัน อากาศดี | นับได้ดี | นับได้ดี + วัดความเร็วจริง |
| กลางคืน | ตกหล่น เห็นบางคัน | นับครบทุกคัน |
| ฝนตก / หมอก | ภาพเบลอ AI ผิดพลาด | ทำงานปกติ |
| ย้อนแสง / พระอาทิตย์ตก | กล้องบอด ช่วงเวลาหนึ่ง | ทำงานปกติ |
| วัดความเร็วทุกคัน | ทำได้ แต่ใช้ compute สูง | ทำได้ทันที ทุกคัน |
| แยก class ยานพาหนะ | ใช้ AI vision — แม่นเฉพาะกลางวัน | แม่นทั้งกลางวัน-กลางคืน |
| Bandwidth ที่ใช้ | สูง (video stream) | ต่ำมาก (metadata) |
| จุดติดตั้งต่อพื้นที่ครอบคลุม | หลายจุด | ลดได้ครึ่งหนึ่ง |

### Bottom-line statement (bold)
**Radar ไม่ได้มาแทนกล้อง — มันมาทำให้กล้องของคุณเก่งขึ้น 24/7**

---

## SECTION 6 — Use cases (เปิดจินตนาการ partner)

### Section eyebrow
`เอาไปทำงานอะไรกับลูกค้าได้บ้าง`

### Section headline
**6 application ที่ partner CCTV เสนอลูกค้าได้ทันที**

### 6 Use case cards (icon + title + 2-3 บรรทัด)

**01 · Traffic Flow Analytics สำหรับ อปท.**
รายงานปริมาณจราจรรายชั่วโมง / รายวัน / รายสัปดาห์ ต่อเส้นทาง พร้อม peak hours
ใช้วางแผนสัญญาณไฟ, ปรับเลน, ขออนุมัติงบขยายถนน — ข้อมูลพร้อมตอบสภา

**02 · Speed Monitoring & Black Spot Detection**
รายงานความเร็วเฉลี่ย + ตำแหน่งที่รถใช้ความเร็วเกินสม่ำเสมอ
ส่งให้ตำรวจ / กรมทางหลวง / ขนส่ง ใช้วางแผนจุดติดป้าย, ลูกระนาด, กล้องจับความเร็ว

**03 · LPR Trigger (เพิ่มความแม่น LPR เดิม)**
Radar trigger ให้กล้องของคุณ snap ภาพในจังหวะที่รถอยู่ตำแหน่งดีที่สุด
ลด false snap, ลด storage 60–80%, เพิ่ม LPR accuracy โดยไม่ต้องเปลี่ยน engine

**04 · School Zone / Hospital Zone Safety**
ตรวจจับรถที่เกินความเร็วในเขตโรงเรียน / โรงพยาบาล อัตโนมัติ
ส่ง alert เข้า LINE / Dashboard ของเทศบาล → ใช้เป็นหลักฐานก่อนเกิดเหตุจริง

**05 · Parking & Stop Detection**
ตรวจจับรถจอดผิดที่ / จอดในจุดห้ามจอด / จอดนานเกินกำหนด
ตั้ง zone ได้อิสระ — ทำงานบนกล้องและพื้นที่เดิมของลูกค้า

**06 · Vehicle Class Tolling / Fee Capture**
นับและแยกประเภทยานพาหนะที่เข้า-ออกพื้นที่ (ตลาด, ด่านชุมชน, สวนสาธารณะ)
ใช้สอบยอดค่าธรรมเนียม / ตรวจสอบรายได้ — ลูกค้าราชการชอบมาก เพราะเป็น audit trail

---

## SECTION 7 — Demo clip (ของจริง)

### Section anchor
`#demo`

### Section eyebrow
`คลิปจริง · ไม่ใช่ animation`

### Section headline
**ดู mmWave Radar ทำงานจริง 26 วินาที**

### Lead text (1 บรรทัด ใต้ headline)
ทดสอบจริง · นับยานพาหนะ + วัดความเร็ว + แยกประเภท ในคลิปเดียว

### Video embed
- ใส่ `<video controls poster="poster.jpg">` โหลด `0518.mov` (แปลงเป็น `.mp4` H.264 + AAC)
- ขนาด: max-width 960px, aspect 21:9 (ต้นฉบับ 2340×1080)
- ใต้ video: คำอธิบายสั้นๆ "ภาพจากการทดสอบจริงบนถนนสาธารณะ — ขอสงวนตำแหน่งจุดทดสอบ"

### CTA ใต้ video
`อยากเห็นทดสอบบนไซต์ของลูกค้าคุณ? นัดเราเข้าไป survey →`

---

## SECTION 8 — Partner ecosystem (เปิดทางทำงานร่วม)

### Section eyebrow
`Smart Data ทำงานร่วมกับ partner ยังไง`

### Section headline
**เราเป็นเซนเซอร์ + ข้อมูล — คุณเป็นคนติดตั้งและดูแลลูกค้า**

### 3 Pillars (icon + title + 2 บรรทัด)

**1. เราให้เซนเซอร์ + integration**
mmWave Radar + middleware ที่เชื่อมกับ NVR / VMS ของลูกค้า
คุณไม่ต้องเรียนระบบใหม่ — เราเตรียม SDK + คนเทคพร้อม support

**2. คุณคุมไซต์ + ลูกค้า**
Partner เป็นคนสำรวจหน้างาน, ติดตั้ง, ส่งมอบ, ดูแลหลังการขาย
รายได้ recurring จากค่าบริการดูแล + ค่าขยายระบบเป็น phase

**3. ร่วมออกแบบเป็นงาน-โดย-งาน**
แต่ละโครงการคุยเงื่อนไขกันใหม่ได้ — Pilot 1 จุด, Full 10+ จุด, หรือ retrofit ของเดิม
ไม่มี lock-in, ไม่มี exclusivity บังคับ

---

## SECTION 9 — Final CTA

### Headline
**บ่ายนี้ ลองเอาโจทย์ลูกค้าจริงมาคุยกัน**

### Sub-headline
1 ชั่วโมง · เราดูรายการกล้องที่คุณติดตั้งให้ลูกค้า · ชี้จุดที่ radar จะเสริมได้
· เสนอ pilot ที่ทำได้ภายในไตรมาสนี้

### Primary CTA
`นัดคุยตัวต่อตัว` (link → LINE OA / Calendly)

### Secondary CTA
`ดาวน์โหลด one-pager (PDF)` (link → /downloads/mmwave_one_pager.pdf)

### Contact strip (ด้านล่าง footer)
ทีม Smart Data · พร้อมเข้าหน้างาน ภาคกลาง / ภาคเหนือ / ภาคตะวันออก

---

## คำที่ "ห้ามใช้" บนหน้านี้ (เพราะลูกค้าจะ paste prompt นี้ใส่ Claude Code)

- ห้ามใช้: ราคา, บาท, %, ROI, accuracy % ตัวเลข, ชื่อแบรนด์ chip (TI, Infineon, NXP), ชื่อแบรนด์กล้อง (Hikvision, Dahua, Axis)
- ใช้คำว่า "mmWave Radar" ได้ (เป็น generic term ของเทคโนโลยี ไม่ใช่ brand)
- ใช้คำว่า "ความแม่นยำใกล้สายตามนุษย์" / "แม่นยำระดับงานจราจร" แทน accuracy %
- ใช้คำว่า "ลด storage 60–80%" ได้ (เป็น engineering claim ทั่วไป ไม่ใช่ ROI การเงิน)

---

## เช็คลิสต์ก่อน publish (สำหรับ Tua)

- [ ] เนื้อหา section 1-9 ครบ
- [ ] Video 0518.mov แปลงเป็น .mp4 web-optimized แล้ว
- [ ] Poster frame (jpg) ที่เลือกแล้ว — แนะนำเลือก frame ที่มี overlay count + speed ชัดที่สุด
- [ ] LINE OA / Calendly link วางถูกที่ 2 ตำแหน่ง (hero + final CTA)
- [ ] เปิดดูบนมือถือแล้ว video ยัง autoplay ได้ (ต้อง muted + playsinline)
- [ ] ลองทดลอง pitch กับเพื่อนในทีม 1 รอบ — โดน pain หรือยัง

---

*เนื้อหานี้สร้างสำหรับ B2B partner CCTV pitch · ห้ามนำไปใช้กับ end-customer ราชการโดยตรง (ต้องผ่าน present-smart-city-app skill เพื่อ apply rules: no brand / no price / pain-first)*
