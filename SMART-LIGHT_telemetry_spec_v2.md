# SMART-LIGHT — Telemetry JSON Spec v2 + Phase Balance Logic

> สำหรับ dev ใช้ปรับ payload + เพิ่ม balance feature
> Owner: Tua · อ้างอิงไฟล์ต้นฉบับ `data.json` (event_id 59)
> Architecture ที่ยืนยันแล้ว: **โคม = 1 เฟส (1P) ต่อตายตัว** · **ตู้ MDB = 3 เฟส (3P) วัดด้วย CT + Loara power meter**

---

## ส่วน A — สรุป: ต้องเพิ่ม/แก้/ลบอะไร เพราะอะไร

### A.1 ต้องเพิ่ม (สำคัญสุด)

| Field ใหม่ | ค่า | เพราะอะไร |
|---|---|---|
| `phase_mode` | `"1P"` / `"3P"` | **ตัวสวิตช์หลัก** — software ต้องรู้ก่อนว่า payload มาจากตู้ 3P หรือโคม 1P ถึงจะรู้ว่าควรรัน balance logic หรือไม่ ถ้าไม่มี field นี้ frontend ต้องเดาจากการมี `_l2/_l3` ซึ่งเปราะและพัง |
| `measure_point` | `"MDB"` / `"luminaire"` | แยกว่าค่านี้วัดที่ตู้ (CT+Loara) หรือที่โคม — กันการเอาค่าตู้ไปแสดงเป็นค่าโคม |
| `phase_load_w` | `{l1, l2, l3}` | สรุปกำลังต่อเฟสให้พร้อมใช้ ลดงานคำนวณซ้ำฝั่ง frontend |
| `recommended_action` | object (ดู §C.3) | ผลลัพธ์ balance logic — บอกช่างว่าต้องย้ายโคมจากเฟสไหนไปเฟสไหน กี่โคม |
| `meter_model` | `"Loara"` | traceability / debug |
| `thresholds` (optional) | object | ค่า ± ต่อ site (ปรับได้ ไม่ hardcode) |

### A.2 ต้องแก้/รวม

| Field เดิม | ปัญหา | แก้เป็น |
|---|---|---|
| `current_a: 4.015` (top-level) | กำกวม — ไม่รู้ว่ากระแสรวมหรือเฟสไหน ขณะที่มี `current_l1/l2/l3` แยกอยู่แล้ว | `current_total_a` ระบุชัดว่ารวม |
| `voltage: 225.73` | เป็นค่าเฉลี่ย 3 เฟส แต่ชื่อกำกวม | `voltage_avg` |
| `brightness: 80` + `dim_level_pct: 80` | ซ้ำซ้อน ค่าเท่ากัน | เลือกใช้ `dim_level_pct` ตัวเดียว |

### A.3 ที่ JSON มีอยู่แล้วและดี (เก็บไว้)

- `voltage_unbalance_pct` และ `current_unbalance_pct` — มีอยู่แล้ว เยี่ยมมาก (เป็นหัวใจของ balance)
- `current_neutral` — สำคัญสำหรับเฝ้าระวัง 3P
- `power_w_l1/l2/l3` — ตรวจแล้ว 417+270+218 = 905 = `power_w` ✓ สอดคล้องกัน

### A.4 หลักการแยก 1P vs 3P

ไม่ต้องแยก endpoint หรือไฟล์ schema — ใช้ `phase_mode` เป็นตัวสวิตช์ตัวเดียว:

| ประเด็น | 1P (โคม) | 3P (ตู้ MDB) |
|---|---|---|
| Field ที่ใช้ | `voltage_avg`, `current_total_a`, `power_w`, `power_factor`, `energy_kwh` | + ชุด `_l1/_l2/_l3` + `current_neutral` + `*_unbalance_pct` |
| Balance logic | **ปิด** (ไม่มีความหมาย) | **เปิด** |
| Neutral / unbalance | ไม่เกี่ยว | เฝ้าระวัง |

---

## ส่วน B — สูตรคำนวณ (Formulas)

### B.1 Current Unbalance (NEMA — ใช้เป็นหลัก)

```
I_avg = (I_l1 + I_l2 + I_l3) / 3
current_unbalance_pct = ( max( |I_l1 − I_avg| , |I_l2 − I_avg| , |I_l3 − I_avg| ) / I_avg ) × 100
```

**ตรวจกับ data.json:**
I_avg = (1.879 + 1.169 + 0.967) / 3 = 1.338
max dev = |1.879 − 1.338| = 0.541
→ 0.541 / 1.338 × 100 = **40.4%** ✓ (ตรงกับ `current_unbalance_pct: 40.42`)

### B.2 Voltage Unbalance (IEC/NEMA)

```
V_avg = (V_l1 + V_l2 + V_l3) / 3
voltage_unbalance_pct = ( max( |V_l1 − V_avg| , |V_l2 − V_avg| , |V_l3 − V_avg| ) / V_avg ) × 100
```

**ตรวจกับ data.json:**
V_avg = (221.5 + 231 + 224.7) / 3 = 225.73
max dev = |231 − 225.73| = 5.27
→ 5.27 / 225.73 × 100 = **2.33%** ✓ (ตรงกับ `voltage_unbalance_pct: 2.34`)

### B.3 Neutral Current (กฎเฝ้าระวังสำหรับช่าง)

```
I_max = max(I_l1, I_l2, I_l3)
neutral_alert = ( current_neutral > 0.5 × I_max )
```

**ตรวจกับ data.json:** I_max = 1.879 → 0.5 × 1.879 = 0.94 vs neutral 0.912 → 0.912 < 0.94 → ยังไม่เตือน แต่ใกล้ (เหลือง)

### B.4 Load Rebalance Recommendation (แนะนำย้ายโคม)

```
target_per_phase = power_w_total / 3
สำหรับแต่ละเฟส:  surplus_phase = power_w_phase − target_per_phase

donor_phase    = เฟสที่ surplus มากสุด (โหลดเกิน → ดึงออก)
receiver_phase = เฟสที่ surplus ติดลบมากสุด (โหลดขาด → เติมเข้า)

lamps_to_move ≈ round( (surplus_donor) / avg_watt_per_lamp / 2 )
   // หาร 2 เพราะการย้าย 1 โคม ลดฝั่ง donor และเพิ่มฝั่ง receiver พร้อมกัน
```

**ตรวจกับ data.json:** target = 905/3 = 301.7W
L1 = 417 (surplus +115) = donor · L3 = 218 (surplus −84) = receiver
ถ้าโคม ~80–100W → ย้าย ~1 โคม จาก **L1 → L3**

---

## ส่วน C — ค่า ± (Thresholds) + Logic เตือน

### C.1 Current Unbalance Threshold

| ระดับ | ช่วง | สี | การกระทำ |
|---|---|---|---|
| ปกติ | ≤ 10% | เขียว | — |
| เฝ้าระวัง | 10–20% | เหลือง | วางแผนย้ายในรอบบำรุงรักษา |
| เตือน | 20–30% | ส้ม | ควรย้ายโหลดรอบถัดไป |
| วิกฤต | > 30% | แดง | ย้ายด่วน (data.json = 40% → **แดง**) |

### C.2 Voltage Unbalance Threshold

| ระดับ | ช่วง | สี |
|---|---|---|
| ปกติ | ≤ 2% | เขียว |
| เฝ้าระวัง | 2–3% | เหลือง (data.json = 2.34% → เหลือง) |
| เตือน | > 3% | แดง |

> **หมายเหตุค่า ±:** อ้างหลัก NEMA MG-1 (±10% สำหรับมอเตอร์) + IEC สำหรับแรงดัน แต่ lighting load ≠ มอเตอร์ → ตั้งเป็น **config ปรับได้ต่อ site** แล้ว fine-tune จากข้อมูลจริง 2–4 สัปดาห์แรก **ห้าม hardcode**

### C.3 Alert Logic (pseudocode)

```
if phase_mode != "3P":
    skip balance logic ทั้งหมด   // โคม 1P ไม่มี balance

if voltage_unbalance_pct > 3:
    ALERT  "แรงดันไม่สมดุล เสี่ยงอุปกรณ์เสียหาย"

if current_unbalance_pct > 30:
    ALERT-CRITICAL "โหลดเฟสไม่สมดุลรุนแรง"
    show recommended_action (donor → receiver, lamps_to_move)
    map_marker = แดง
elif current_unbalance_pct >= 20:
    WARN + recommended_action (ไม่ด่วน)

if current_neutral > 0.5 × max(I_l1, I_l2, I_l3):
    WARN "กระแส neutral สูงผิดปกติ — ตรวจการกระจายโหลด"
```

---

## ส่วน D — JSON Schema v2 (ตัวอย่าง payload หลังแก้)

```json
{
  "success": true,
  "source": "smartpole_connect",
  "device_id": "SPC-GROUP-SIM-001",
  "event_id": 59,

  "phase_mode": "3P",
  "measure_point": "MDB",
  "meter_model": "Loara",

  "metrics": {
    "voltage_avg": 225.73,
    "current_total_a": 4.015,
    "frequency": 50,
    "power_w": 905,
    "power_va": 952.6,
    "power_var": 297.5,
    "power_factor": 0.95,
    "energy_kwh_import": 1234.5,
    "energy_kwh_export": 0,

    "voltage_l1": 221.5,  "voltage_l2": 231,    "voltage_l3": 224.7,
    "current_l1": 1.879,  "current_l2": 1.169,  "current_l3": 0.967,
    "current_neutral": 0.912,

    "phase_load_w": { "l1": 417, "l2": 270, "l3": 218 },
    "pf_l1": 0.95, "pf_l2": 0.95, "pf_l3": 0.95,

    "voltage_unbalance_pct": 2.34,
    "current_unbalance_pct": 40.42,
    "thd_v": 1.5, "thd_i": 12.4,

    "ambient_lux": 14,
    "dim_level_pct": 80,
    "cabinet_temp": 38.5,
    "relay_state": "on"
  },

  "balance": {
    "status": "critical",
    "current_unbalance_pct": 40.42,
    "voltage_unbalance_pct": 2.34,
    "neutral_alert": false,
    "recommended_action": {
      "donor_phase": "L1",
      "receiver_phase": "L3",
      "lamps_to_move": 1,
      "note": "ย้ายโคมจาก L1 ไป L3 ~1 โคม เพื่อลด current unbalance"
    }
  },

  "thresholds": {
    "current_unbalance": { "warn": 20, "critical": 30 },
    "voltage_unbalance": { "warn": 2, "critical": 3 },
    "neutral_ratio": 0.5
  },

  "state_summary": {
    "connection_state": "online",
    "operational_state": "normal",
    "lamp_state": "on"
  }
}
```

> 1P payload: ใส่ `phase_mode: "1P"`, `measure_point: "luminaire"`, ตัด block `_l1/_l2/_l3`, `current_neutral`, `balance` ออกได้
