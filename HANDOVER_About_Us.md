# HANDOVER — สร้างหน้า "About Us / แนะนำตัว" ใน smartdatapresent

> **ถึง:** Claude Code
> **จาก:** ทีมวางแผนเนื้อหา (chat Cowork)
> **งาน:** แปลง mockup `about_story.html` → React route จริงในเว็บ + เสียบรูปจริง
> **วันที่:** 2026-06-23

---

## 0. ภาพรวมงาน (อ่านก่อน)

มี mockup เสร็จแล้วที่ root: **`about_story.html`** — เป็นหน้าแนะนำกลุ่ม **Smart B2G** เล่าเรื่องสองทีม (Gismo ฮาร์ดแวร์ + CodeCube ซอฟต์แวร์) ที่มาบรรจบกัน

**สิ่งที่ต้องทำ:**
1. สร้าง React page ใหม่ `src/pages/AboutUs.jsx` ตามเนื้อหา+ดีไซน์ของ `about_story.html`
2. เพิ่ม route `/#/about` ใน `App.jsx` + ลิงก์ใน `Nav.jsx`
3. เสียบรูป/วิดีโอจริงจาก `public/images/about/` และ `public/videos/about/` แทน placeholder
4. ทำการแก้ไขเนื้อหา 3 จุดที่ระบุใน §4

> ⚠️ **MANDATORY — audit ก่อนแก้ (PROJECT_INSTRUCTION §11.2):** ก่อนแตะ `App.jsx`, `Nav.jsx`, `Footer.jsx` ต้องอ่านไฟล์เต็ม + เขียน audit report สั้น ๆ (purpose/exports/side-effects) ก่อนแก้ การสร้างไฟล์ใหม่ `AboutUs.jsx` ไม่ต้อง audit แต่การแตะไฟล์เดิมต้อง

---

## 1. ดีไซน์ / โครงสร้าง

- ใช้ **Civic Trust palette** (มีใน `src/index.css`): `--civic-primary #0F6E56`, `--civic-surface #FAF7EE`, `--civic-accent #BA7517` ฟอนต์ **Sarabun**
- โครง slide-by-slide ตาม `about_story.html` (เปิดไฟล์ดู CSS + เนื้อหาได้เลย — ลอก style ได้)
- ใช้แถบสีบน slide แยกทีม: **ส้ม `#BA7517` = ฮาร์ดแวร์ (Gismo)** · **เขียว `#0F6E56` = ซอฟต์แวร์ (CodeCube)**
- ใช้ component เดิมถ้ามี (`Section`, `SectionHeader`) · ใช้ Framer Motion fade-up ตาม pattern หน้าอื่น
- รองรับ responsive (มือถือ 1 คอลัมน์)

## 2. โครงเนื้อหา 10 ส่วน (ตาม about_story.html)

1. **Hero** — "เบื้องหลังระบบของเรา คือสองทีมที่เดินทางคนละสาย แล้วมาบรรจบกัน"
2. **Gismo คือใคร** — PCBA → โคมไฟ LED ปี 2553
3. **โรงงาน & มาตรฐาน** — เครื่องจักร + มอก. (**ดู §4 แก้ไข 2 จุด: เพิ่มคลิป PCBA + แก้คำ**)
4. **งานยาก Gismo** — 6 ผลงาน (MMTH, EGAT, ห้วยขวาง, TOA, Panasonic, สนามโสมาภา FIFA)
5. **CodeCube คือใคร** — ยุติธรรม, True Digital Park, GISTDA, NT
6. **custom เหตุฉุกเฉิน** — ทน.มาบตาพุด + นิคมมาบตาพุด
7. **คลิป Central World** — ระบบแจ้งเตือนความสูงรถ
8. **IoT การทางพิเศษ** — ข้อมูลด่านเก็บเงิน
9. **จุดบรรจบ** — จับมือทำ Smart Street Light (Gismo=HW, CodeCube=SW)
10. **ปิดด้วยโลโก้ลูกค้า**

---

## 3. รูป/วิดีโอ — เสียบจากไฟล์จริง

### 3.1 Gismo (ตั้งชื่อชัดแล้ว — ใช้ได้เลย)
โฟลเดอร์: `public/images/about/gismo/`

| placeholder เดิม | ไฟล์จริง |
|---|---|
| #1 เครื่องจักรโรงงาน | `SMT_Machine_01.jpg` (+ ดู §4: เพิ่มคลิป `SMT_LED_PCBA_01.mp4`) |
| #1 เสริม / QC | `QC_Process_01.jpg` |
| #2 ใบ มอก. | `TISI_certificate_1955-2551.jpg` |
| #3 High Mast MMTH | `MMTH.jpg` |
| #4 EGAT | `EGAT.jpg` |
| #5 ไฟถนนห้วยขวาง | `กทม.ห้วยขวาง.jpg` |
| #6 Solar TOA | `TOA.jpg` |
| #7 Panasonic | `Panasonics.jpg` |
| #8 สนามโสมาภา FIFA | `Football FiFa.jpg` |

### 3.2 CodeCube (⚠️ ต้องเลือกรูปเอง)
โฟลเดอร์: `public/images/about/codecube/`

**ปัญหา:** รูปต้นฉบับของ CodeCube ความละเอียดต่ำ/ภาพแตก จึง **export ออกมาจาก PowerPoint company profile ทั้ง 33 สไลด์** (ไฟล์ `CodeCube Company Profile/Slide1.jpeg` … `Slide33.jpeg`)

**ให้ Claude Code ทำ:**
1. **ใช้ไฟล์ `.jpeg` เท่านั้น — ลบ/ข้าม `.tiff`** (tiff ไฟล์ใหญ่ เบราว์เซอร์ไม่รองรับ)
2. เปิดดูสไลด์ที่แมปด้านล่าง แล้ว **เลือก/ครอปส่วนที่เหมาะกับ placeholder** (เอาเฉพาะภาพหน้าจอระบบ ตัดขอบ/หัวสไลด์ที่มี logo CodeCube ออกถ้ารก)

| placeholder | สไลด์ที่ตรงเนื้อหา (จาก company profile) |
|---|---|
| #9 กระทรวงยุติธรรม | `Slide9.jpeg` (สนง.กิจการยุติธรรม Big Data) · มี Slide10–12 (กรมคุมประพฤติ) เป็นตัวเลือกเสริม |
| #10 True Digital Park | `Slide19.jpeg` |
| #11 GISTDA | `Slide20.jpeg` |
| #12 NT | `Slide21.jpeg` |
| #13 เหตุฉุกเฉินมาบตาพุด | **ใช้รูปจาก `public/images/emergency-mgmt/` แทน** (event_dashboard.png / create_event.png) — เป็นภาพระบบของเราที่ไม่มีแบรนด์ supplier · อย่าใช้สไลด์ที่มีแบรนด์ ADZOSS |
| #15 IoT การทางพิเศษ | `Slide25.jpeg` (EXAT) |

> หมายเหตุ: ถ้าสไลด์ไหนเลือกแล้วมี logo/ข้อความแบรนด์ CodeCube มุมสไลด์ ครอปออกได้ตามสะดวก — เป้าหมายคือโชว์ "หน้าจอระบบ" ไม่ใช่หน้าสไลด์

### 3.3 โลโก้ลูกค้า (หน้าปิดท้าย)
โฟลเดอร์: `public/images/about/codecube/` มี `True Digital.png`, `การทางพิเศษ.png` แล้ว
- โลโก้ที่เหลือ (EGAT, ยุติธรรม, GISTDA, NT, มาบตาพุด, Panasonic, TOA) — **ดึงจากสไลด์ company profile** (`Slide8.jpeg` มี logo wall ของ CodeCube) หรือครอปจากรูปงานที่มี ถ้าไม่มีจริง ๆ ให้ทำเป็นกล่องชื่อข้อความแทนชั่วคราว
- ⚠️ **ห้ามมีโลโก้ ADZOSS** เด็ดขาด

### 3.4 วิดีโอ
โฟลเดอร์: `public/videos/about/`
- #14 คลิป Central World — ถ้ายังไม่มีไฟล์ ใช้ต้นฉบับที่ `public/videos/over-height/main.mp4` (มี poster `main_poster.jpg`) **แต่ต้องเช็ค watermark กล้อง/IP/แบรนด์ก่อน** ถ้ามีให้ทำ note ไว้ว่ายังต้อง crop
- คลิป PCBA — `public/images/about/gismo/SMT_LED_PCBA_01.mp4` (ดู §4.1)

---

## 4. แก้ไขเนื้อหา 3 จุด (สำคัญ — Tua สั่ง)

### 4.1 หน้า "โรงงาน & มาตรฐาน" (slide 3) — เพิ่มคลิป PCBA
เพิ่ม video player แสดงคลิป `public/images/about/gismo/SMT_LED_PCBA_01.mp4` ในหน้านี้ (วางคู่กับรูปเครื่องจักร/ใบมอก.) — ให้เห็นกระบวนการผลิต PCBA จริง เพิ่มน้ำหนักความเป็นโรงงานผลิตเอง
- ใส่ `poster` + `controls` + `playsInline` · ไม่ autoplay เสียง

### 4.2 แก้คำ "จริง" ที่ดูเหมือนแก้ตัว (slide 3 หัวข้อ)
**เดิม (บรรทัด 124 ใน about_story.html):**
> "โรงงานจริง เครื่องจักรจริง มาตรฐานรับรองจริง"

❌ ปัญหา: คนไทยอ่านแล้วเหมือน "พยายามยืนยันว่าไม่โกหก" = ดูไม่โปร

✅ **เปลี่ยนเป็นภาษามืออาชีพ ตัดคำว่า "จริง" ออก** — เลือกใช้ข้อใดข้อหนึ่ง (หรือปรับให้เข้ากับโทน):
- **"ผลิตในโรงงานของเรา ด้วยมาตรฐานระดับอุตสาหกรรม"**
- "โรงงาน เครื่องจักร และการรับรองมาตรฐานครบครัน"
- "ควบคุมคุณภาพทุกขั้นตอน ตั้งแต่แผงวงจรถึงโคมสำเร็จ"

> จุดอื่นที่มีคำว่า "จริง" (เช่น "ทำงานจริง", "พื้นที่จริง", "วินาทีจริง") **คงไว้ได้** — เป็นภาษาธรรมชาติ ไม่ได้สื่อแก้ตัว แก้เฉพาะหัวข้อ slide 3 เท่านั้น

### 4.3 ตรวจ ADZOSS หลุดไหม
- หน้าทั้งหมด **ห้ามมีชื่อ/โลโก้ ADZOSS** (เป็น supplier ที่เราเป็น dealer)
- รูป #13 + คลิป #14 ต้องไม่มีแบรนด์ supplier โผล่ในภาพ

---

## 5. กฎที่ต้องคุม (compliance)
- ✅ เอ่ยชื่อหน่วยงานลูกค้าได้ (EGAT, ยุติธรรม, GISTDA, NT, การทางพิเศษ, มาบตาพุด, Panasonic, MMTH, TOA, True Digital Park, โสมาภา)
- ❌ ห้ามมี ADZOSS / แบรนด์ supplier ระบบ
- ❌ ไม่ใส่ตัวเลขที่ verify ไม่ได้ (เช่น "4 ล้าน txn/วัน") · ไม่ใส่ราคา/ROI%
- ❌ คลิป/ภาพ Central World ใช้คำ "เฝ้าระวัง/เตือน/บันทึก" ไม่ใช่ "ตรวจวัด"

## 6. เสร็จแล้วเช็ค
- [ ] `/#/about` เปิดได้ · ลิงก์จาก Nav ทำงาน
- [ ] รูป Gismo เสียบครบ 8 + คลิป PCBA เล่นได้
- [ ] รูป CodeCube เลือก+ครอปแล้ว (jpeg ไม่ใช่ tiff)
- [ ] หัวข้อ slide 3 ไม่มีคำว่า "จริง" แบบแก้ตัวแล้ว
- [ ] ไม่มี ADZOSS / ตัวเลข unverify / ราคา หลุด
- [ ] responsive มือถือ + `npm run build` ผ่าน
- [ ] audit report ของ App.jsx/Nav.jsx แนบก่อนแก้

## 7. ไฟล์อ้างอิง
- Mockup: `about_story.html` (root)
- ขนาดรูป: `about_story_IMAGE_SPEC.md`
- README แต่ละโฟลเดอร์: `public/images/about/*/README.md`
