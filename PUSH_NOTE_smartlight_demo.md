# Push Note — SmartLight Field-Ops Slides + Demo UI (2026-06-17)

Commit `1662492` พร้อมแล้วใน repo `smartdatapresent` (branch `main`) — **sandbox push เองไม่ได้** (ไม่มี GitHub credentials) Tua push เองจากเครื่อง

## คำสั่ง push

> ⚠️ ก่อนรัน git: ดู Google Drive icon = **"Up to date" ✓** ก่อนทุกครั้ง (กัน `.git/index.lock` race ตาม CLAUDE.md §9)

```bash
cd "$HOME/Documents/Coding/Gismo/smartdatapresent"
git log --oneline -1        # ควรเห็น 1662492 feat(smartlight): add field-ops slides...
git push
```

ถ้าเจอ `fatal: Unable to create '.../.git/index.lock': File exists`:
```bash
ps aux | grep -v grep | grep git     # ถ้ามี Cursor/VS Code gitWorker → ปิด editor ก่อน
rm -f .git/index.lock .git/HEAD.lock
# รอ Drive "Up to date" ✓ แล้วค่อย git push
```

## สิ่งที่เปลี่ยน (commit 1662492 · 3 ไฟล์)

### A. PitchDeck.jsx — เพิ่ม 2 สไลด์ใหม่ (ต่อท้าย ไม่รื้อของเดิม)
- **Slide 19 (Slide19a)** — *Pain งานกองช่าง*: งานแจ้งซ่อมเข้าหลายทาง (โทร/LINE/เดินมาบอก/หัวหน้าสั่ง) → ตกหล่น ตอบสภาฯ ไม่ได้ → flow ทางออก: รับแจ้ง→เปิดใบงาน→มอบหมาย→ติดตาม→ปิด→รายงาน
- **Slide 20 (Slide19b)** — *ระบบเดียว เริ่มเล็ก ขยายได้*: ไฟถนน (เริ่มที่นี่) + ประปา + ถนน/ฝาท่อ + ครุภัณฑ์ + เรื่องร้องเรียน · มีรูปประกอบ · **ปุ่ม "เปิดดูหน้างานแจ้งซ่อมจริง"** → เปิด demo ที่ **tab faults**
- ภาษาผสม 2 กลุ่ม: หัวหน้ากองช่าง (งานไม่ตกหล่น ไปตรงจุด) + ผู้บริหาร (ตอบสภาฯ เห็นภาพรวม ลดภาระงาน)
- `SmartLightDemoModal` เพิ่ม prop `initialTab` (default `dashboard` → **Slide 7 เดิมไม่กระทบ**)
- `TOTAL_SLIDES` 19→21 · `slides[]` + `Toolbar titles[]` sync · สไลด์ปิดท้าย (เลข 21) ปรับ 3 คำถามให้ครอบคลุมงานกองช่าง

### B. หน้า demo UI (public/ui/smartlight-demo/)
- **faults.html** (หน้าหลักของธีมใหม่) — แปลงเป็นภาษาไทยงานกองช่างทั้งหน้า (ใบงาน · ผู้รับผิดชอบ · รับแจ้ง · ปิดงาน) · เพิ่มงาน **ไม่ใช่โคมไฟ** แบบเนียน: ท่อประปารั่วหน้าตลาด (แจ้งผ่าน LINE) · ฝาท่อชำรุด · ครุภัณฑ์เครื่องตัดหญ้าเสีย · เพิ่มประเภทงานในตัวกรอง · ใส่รูปหน้างานจริงใน popup แผนที่
- **device.html** — แปลง header/label เป็นไทย (คงกรอบทะเบียนโคมไฟ IoT ตามที่ตกลง) · โซน/หน่วยงานเป็นไทย

### กฎที่ผ่าน (CLAUDE.md)
- §1 pain-first ✓ · §1.7 ไม่มี brand/price/ROI ✓ · §12 framing = บริหารสินทรัพย์หน่วยงานเอง + งานซ่อมบำรุง (ปลอดภัย) ✓ · naming filter = ใช้ "ระบบบริหารงานซ่อมบำรุง/งานกองช่าง" ไม่มี "smart" ตรงๆ ✓
- §11.2 audit-before-edit ✓ (audit report + รออนุมัติ Tua ก่อนแก้)

### เทสต์ที่รันแล้ว (ผ่านทั้งหมด)
- esbuild parse PitchDeck.jsx ✓
- SSR render → 21 สไลด์ · มีสไลด์ใหม่ทั้ง 2 ✓
- jsdom interaction: ปุ่ม Slide 20 เปิด modal ที่ faults.html ✓ · ESC ปิด ✓ · Slide 7 ยังเปิด dashboard.html (ไม่ regression) ✓
- HTML tag balance faults/device ✓

### หมายเหตุ
- งานท่อประปา/ครุภัณฑ์ในหน้า demo = **ตัวอย่างให้ลูกค้าเห็นว่าระบบรับงานอื่นได้** (mockup ของ dev ยังไม่มี backend จริง)
- ดูผลจริง: `npm run dev` → เปิด `/#/smart-street-light` (deck) → เลื่อนไปสไลด์ 19-20 → กดปุ่มเปิด demo
- ไฟล์ PUSH_NOTE นี้ + emergency_app.html + infomation mockups ยังไม่ commit (untracked) — commit แยกเมื่อพร้อม
