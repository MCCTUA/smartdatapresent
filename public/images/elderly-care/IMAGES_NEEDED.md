# Images & Video — ElderlyCare Page

หน้าที่: `/Users/ggt/Documents/Coding/Gismo/smartdatapresent/src/pages/ElderlyCare.jsx`

วางไฟล์ทั้งหมดในโฟลเดอร์นี้: `public/images/elderly-care/`

## รูปที่ Tua แนบมาแล้ว — Save ลงตามชื่อไฟล์ด้านล่าง

ภาพทั้ง 5 รูปที่แนบในแชต ให้ save ตามตารางนี้:

| ภาพในแชต | Save เป็นไฟล์ | ใช้ที่ section |
|----------|----------------|----------------|
| **ภาพ 1:** mmWave Radar 3-Axis Detection (infographic ขาว-น้ำเงิน อธิบาย radar + working process) | `radar-technical.png` | **Privacy section** — แทน RadarDiagram (รูปที่ Tua ส่งดีกว่า) |
| **ภาพ 2:** Wearable Device อุปกรณ์สวมใส่ดูแลผู้สูงอายุ (ผู้สูงอายุล้ม + smartwatch + แอป alert + แอปผู้ดูแล) | `pillar-wearable.jpg` | **Pillar 3 — เมื่อออกนอกบ้าน** |
| **ภาพ 3:** ระบบกล้อง CCTV ดูแลผู้สูงอายุในที่สาธารณะ (โรงพยาบาล + ตรวจจับการล้ม + แจ้งเตือน) | `pillar-cctv.jpg` | **Pillar 2 — พื้นที่สาธารณะ** |
| **ภาพ 4:** Occupancy/Heatmap research data (กราฟ + heatmap จาก radar) | `data-insights.png` | **Data Insights section** ใหม่ |
| **ภาพ 5:** ผู้สูงอายุใน modern home + radar pulse animation | `hero-elderly.jpg` | **Hero (รูปขวามือ)** |

**สำคัญ:** ภาพ 5 ใช้ทั้ง **Hero** และเป็น `pillar-radar-home.jpg` สำหรับ Pillar 1 ด้วย — copy 2 ครั้ง:
- `hero-elderly.jpg`
- `pillar-radar-home.jpg`

## Checklist สรุป — ไฟล์ที่ต้องวาง 6 ไฟล์

```
public/images/elderly-care/
├── hero-elderly.jpg            ← ภาพ 5 (ผู้สูงอายุใน modern home)
├── pillar-radar-home.jpg       ← ภาพ 5 (เดียวกับ hero — copy)
├── pillar-cctv.jpg             ← ภาพ 3 (CCTV โรงพยาบาล)
├── pillar-wearable.jpg         ← ภาพ 2 (Wearable + ผู้สูงอายุล้ม)
├── radar-technical.png         ← ภาพ 1 (3-Axis Detection infographic)
└── data-insights.png           ← ภาพ 4 (Occupancy/Heatmap)
```

## วิธี Save ภาพจากแชต (Mac)

1. คลิกขวาภาพในแชต → **Save Image As**
2. เปลี่ยนชื่อตามตารางด้านบน
3. บันทึกที่ `/Users/ggt/Documents/Coding/Gismo/smartdatapresent/public/images/elderly-care/`

## ถ้าไม่ใส่รูป — Fallback

หน้าเว็บมี **fallback** ในทุกจุด:
- รูปที่หาไม่เจอ จะถูกซ่อนอัตโนมัติ (ไม่แสดง broken image icon)
- Privacy section ถ้า `radar-technical.png` ไม่มี — จะ fallback ไปใช้ `RadarDiagram` (SVG) แทน

## SVG Diagrams ที่อยู่ใน code (ไม่ต้องโหลด)

ผมสร้าง SVG diagrams ใน code ตรงๆ ใช้คู่กับรูปที่ Tua ส่ง:

1. **TimelineDiagram** — เปรียบเทียบ Reactive vs Proactive (ใน Pain Points)
2. **ArchitectureDiagram** — 3 sources → COC → 3 actions (ใน System Flow)
3. **RadarDiagram** — fallback สำหรับ Privacy section ถ้ารูป radar-technical.png ไม่มี
