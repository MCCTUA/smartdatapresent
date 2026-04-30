# Images & Video Needed — ElderlyCare Page

หน้าที่: `/Users/ggt/Documents/Coding/Gismo/smartdatapresent/src/pages/ElderlyCare.jsx`

วางไฟล์ทั้งหมดในโฟลเดอร์นี้: `public/images/elderly-care/`

โทนภาพที่ต้องการ:
- คนเอเชีย/หน้าคล้ายคนไทย (ผู้สูงอายุไทย หรือเอเชียตะวันออกเฉียงใต้)
- โทนอบอุ่น ไม่ใช่ stock เชิงพาณิชย์ที่ดูปลอม
- หลีกเลี่ยงภาพที่ดูเป็น "โฆษณายา" — ต้องการ "ครอบครัวจริง / ชุมชนจริง"
- License: Pexels หรือ Unsplash (ฟรี ใช้เชิงพาณิชย์ได้ ไม่ต้องเครดิต)

## รายการที่ต้องโหลด (6 ไฟล์)

| ไฟล์ที่บันทึก | ใช้ที่ section | คำค้นแนะนำ (Pexels) | ขนาดแนะนำ |
|----------------|----------------|---------------------|------------|
| `hero-elderly.jpg` | Hero — รูปใหญ่ขวามือ | "elderly asian woman home" / "asian grandmother" / "thai elderly" | 1200x900 |
| `pillar-radar.jpg` | Pillar 1 — ในบ้าน | "elderly bathroom safety" / "asian senior at home" / "elderly bedroom" | 1000x800 |
| `pillar-cctv.jpg` | Pillar 2 — เมือง | "city cctv camera" / "smart city street" / "thailand street view" | 1000x800 |
| `pillar-wearable.jpg` | Pillar 3 — เดินทาง | "elderly asian smartwatch" / "senior outdoor walking" / "asian grandmother market" | 1000x800 |
| `demo-radar.mp4` | Demo section | ค้น Pexels Videos: "elderly walking home" / "smart home" / "radar visualization" | 1280x720 มาก ≤ 30s |
| `demo-poster.jpg` | Poster ก่อน video เล่น | screenshot จาก demo-radar.mp4 หรือ rendering ของอุปกรณ์ | 1280x720 |

## วิธีโหลด (Pexels)

1. ไปที่ https://www.pexels.com/search/{คำค้น}/
2. กรอง: "Free for use" — Pexels License (ใช้ได้ทั้งหมด)
3. เลือกภาพที่หน้าคล้ายคนไทย/เอเชียตะวันออกเฉียงใต้
4. ดาวน์โหลด ขนาด **Large** (1920x หรือใกล้เคียง) — ไม่ต้องใหญ่กว่านี้ จะหนัก
5. **เปลี่ยนชื่อไฟล์** ตามตารางด้านบน
6. วางใน `public/images/elderly-care/`

สำหรับ video:
- https://www.pexels.com/videos/ → ค้นด้วยคำค้น
- เลือกความยาวสั้น 5-30 วินาที
- ขนาด HD 1280x720 หรือ Full HD 1920x1080
- บีบอัด: ใช้ `ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow -vf scale=1280:-2 -an demo-radar.mp4` เพื่อลดขนาดไฟล์ให้ < 10MB

## คำค้นเพิ่มเติม (ถ้าไม่เจอ)

**Hero / ผู้สูงอายุไทย:**
- "vietnamese elderly woman"
- "asian senior smile"
- "filipino grandmother"
- "indonesian elderly"
- "thailand grandfather"

**Bathroom / Bedroom (ห้องที่จะติดเรดาร์):**
- "asian elderly bathroom"
- "modern asian bathroom"
- "minimal bedroom interior"
- "elderly home interior asia"

**CCTV / เมือง:**
- "thailand bangkok street"
- "asian city traffic"
- "cctv pole urban"
- "smart city iot"

**Wearable / SOS:**
- "asian elderly smartwatch"
- "senior wearing watch outdoor"
- "grandmother walking park"
- "elderly market shopping asia"

## ถ้าไม่ใส่รูป — Fallback

หน้าเว็บมี **fallback gradient** ในทุกจุดที่ใช้ `<img>` — ถ้าไฟล์ไม่มี รูปจะถูกซ่อนและแสดงพื้นหลังสีเขียวแทน หน้าเว็บยังใช้งานได้ปกติ ไม่พัง

## Diagrams ที่อยู่ใน code แล้ว (ไม่ต้องโหลด)

ผมได้สร้าง SVG diagrams ใน code ตรงๆ — ไม่ต้องโหลดเพิ่ม:

1. **TimelineDiagram** — เปรียบเทียบ Reactive vs Proactive (อยู่ใน Pain Points section)
2. **ArchitectureDiagram** — 3 sources → COC → 3 actions (อยู่ใน System Flow section)
3. **RadarDiagram** — ภาพตัดข้างห้อง + เซนเซอร์ + คนยืน/ล้ม (อยู่ใน Privacy section)

ทุก diagram ใช้ Civic Trust palette เดียวกับหน้าเว็บ ปรับขนาดตามจอได้
