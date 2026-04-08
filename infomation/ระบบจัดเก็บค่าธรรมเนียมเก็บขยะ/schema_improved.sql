-- ==============================================================================
-- ระบบบริหารจัดการค่าธรรมเนียมท้องถิ่น (Local Fee Management System)
-- Version: 2.0 (Improved with Anti-Fraud & Anti-Scam Features)
-- Database: PostgreSQL
-- ==============================================================================

-- เปิดใช้งาน UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. ระบบจัดการสิทธิ์และผู้ใช้งาน (RBAC)
-- ==============================================================================

CREATE TABLE Roles (
    role_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_name VARCHAR(50) UNIQUE NOT NULL, -- 'Citizen', 'Accountant', 'Meter_Reader', 'Collector', 'Admin', 'Executive'
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE User_Roles (
    user_id UUID REFERENCES Users(user_id) ON DELETE CASCADE,
    role_id UUID REFERENCES Roles(role_id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id)
);

-- ==============================================================================
-- 2. ระบบป้องกันมิจฉาชีพ (Anti-Scam Features)
-- ==============================================================================

-- ตารางตรวจสอบตัวตนเจ้าหน้าที่ (Officer Identity Verification)
CREATE TABLE Officer_Identities (
    officer_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES Users(user_id) ON DELETE CASCADE,
    employee_code VARCHAR(50) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    photo_url VARCHAR(255), -- รูปถ่ายเจ้าหน้าที่สำหรับแสดงบนเว็บตรวจสอบ
    qr_code_token VARCHAR(255) UNIQUE NOT NULL, -- Token สำหรับสร้าง QR Code ประจำตัว
    is_verified BOOLEAN DEFAULT TRUE,
    status VARCHAR(20) DEFAULT 'Active', -- 'Active', 'Suspended', 'Resigned'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 3. ข้อมูลประชาชนและบ้าน
-- ==============================================================================

CREATE TABLE Residents (
    resident_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES Users(user_id) ON DELETE SET NULL, -- ผูกกับ Users กรณีลงทะเบียนใช้งานระบบ
    national_id VARCHAR(13) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Line_User_Mapping (
    mapping_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resident_id UUID REFERENCES Residents(resident_id) ON DELETE CASCADE,
    line_user_id VARCHAR(100) UNIQUE NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE, -- เพิ่ม: ยืนยันตัวตนผ่าน Official LINE ป้องกันมิจฉาชีพสวมรอย
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Houses (
    house_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resident_id UUID REFERENCES Residents(resident_id) ON DELETE RESTRICT,
    house_number VARCHAR(50) NOT NULL,
    village_no VARCHAR(10), -- หมู่ที่
    alley VARCHAR(100),     -- ซอย
    street VARCHAR(100),    -- ถนน
    sub_district VARCHAR(100) NOT NULL, -- ตำบล
    district VARCHAR(100) NOT NULL,     -- อำเภอ
    province VARCHAR(100) NOT NULL,     -- จังหวัด
    postal_code VARCHAR(5) NOT NULL,
    zone_code VARCHAR(50),  -- รหัสโซนสำหรับจัดสายรถเก็บขยะ
    latitude DECIMAL(10, 8), -- เพิ่ม: พิกัดบ้านสำหรับ Geofencing
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (house_number, village_no, sub_district)
);

-- ==============================================================================
-- 4. ระบบมิเตอร์ (น้ำ/ไฟ)
-- ==============================================================================

CREATE TABLE Meters (
    meter_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    house_id UUID REFERENCES Houses(house_id) ON DELETE CASCADE,
    meter_number VARCHAR(50) UNIQUE NOT NULL,
    meter_type VARCHAR(20) NOT NULL, -- 'Water', 'Electricity'
    installation_date DATE,
    status VARCHAR(20) DEFAULT 'Active', -- 'Active', 'Inactive', 'Maintenance'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Meter_Readings (
    reading_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meter_id UUID REFERENCES Meters(meter_id) ON DELETE CASCADE,
    reader_user_id UUID REFERENCES Users(user_id) ON DELETE RESTRICT, -- ผู้จดมิเตอร์
    reading_date DATE NOT NULL,
    reading_value DECIMAL(10, 2) NOT NULL,
    previous_value DECIMAL(10, 2) NOT NULL,
    usage_amount DECIMAL(10, 2) GENERATED ALWAYS AS (reading_value - previous_value) STORED,
    photo_evidence_url VARCHAR(255), -- เพิ่ม: รูปถ่ายมิเตอร์ป้องกันการจดเลขผิด/ทุจริต
    reading_latitude DECIMAL(10, 8), -- เพิ่ม: พิกัดขณะจด (Geofencing)
    reading_longitude DECIMAL(11, 8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 5. ระบบบริการและอัตราค่าธรรมเนียม
-- ==============================================================================

CREATE TABLE Service_Types (
    service_type_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_code VARCHAR(20) UNIQUE NOT NULL, -- 'GARBAGE', 'WATER', 'ELECTRICITY'
    service_name VARCHAR(100) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL, -- 'Monthly', 'Yearly'
    description TEXT
);

CREATE TABLE Rate_Configurations (
    rate_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_type_id UUID REFERENCES Service_Types(service_type_id) ON DELETE CASCADE,
    rate_type VARCHAR(50) NOT NULL, -- 'Fixed', 'Per_Unit', 'Tiered'
    unit_price DECIMAL(10, 2) NOT NULL,
    effective_from DATE NOT NULL,
    effective_to DATE, -- ถ่าเป็น NULL คือใช้อยู่ปัจจุบัน (ไม่กระทบยอดเก่า)
    created_by UUID REFERENCES Users(user_id) ON DELETE RESTRICT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 6. ระบบใบแจ้งหนี้และการเรียกเก็บเงิน
-- ==============================================================================

CREATE TABLE Invoices (
    invoice_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    house_id UUID REFERENCES Houses(house_id) ON DELETE RESTRICT,
    billing_period_start DATE NOT NULL,
    billing_period_end DATE NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending', -- 'Pending', 'Paid', 'Overdue', 'Cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Invoice_Items (
    item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES Invoices(invoice_id) ON DELETE CASCADE,
    service_type_id UUID REFERENCES Service_Types(service_type_id) ON DELETE RESTRICT,
    reading_id UUID REFERENCES Meter_Readings(reading_id) ON DELETE SET NULL, -- NULL ได้ถ้าเป็นค่าขยะ (Fixed)
    rate_id UUID REFERENCES Rate_Configurations(rate_id) ON DELETE RESTRICT, -- ผูกกับ Rate ณ เวลานั้น
    quantity DECIMAL(10, 2) NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL
);

-- ==============================================================================
-- 7. ระบบการชำระเงินและ Payment Gateway (Anti-Fraud)
-- ==============================================================================

CREATE TABLE Payment_Gateways (
    gateway_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gateway_name VARCHAR(100) NOT NULL, -- 'Krungthai', 'GSB', 'PromptPay'
    merchant_id VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE Payments (
    payment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES Invoices(invoice_id) ON DELETE RESTRICT,
    gateway_id UUID REFERENCES Payment_Gateways(gateway_id) ON DELETE RESTRICT,
    transaction_reference VARCHAR(100) UNIQUE, -- Ref จากธนาคาร
    qr_reference VARCHAR(100) UNIQUE, -- เพิ่ม: Dynamic QR Code Ref เฉพาะบิลนี้ (Anti-Scam)
    amount_paid DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP WITH TIME ZONE NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- 'QR_Code', 'Bank_Transfer', 'Credit_Card' (งดรับ 'Cash')
    status VARCHAR(20) DEFAULT 'Completed', -- 'Pending', 'Completed', 'Failed', 'Refunded'
    
    -- ส่วนของการกระทบยอด (Auto-Reconciliation)
    reconciliation_status VARCHAR(20) DEFAULT 'Pending', -- 'Pending', 'Matched', 'Discrepancy'
    reconciled_at TIMESTAMP WITH TIME ZONE,
    
    receipt_number VARCHAR(50) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 8. ระบบติดตามหนี้ค้างชำระ (Arrears & Penalties)
-- ==============================================================================

CREATE TABLE Arrears (
    arrear_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES Invoices(invoice_id) ON DELETE CASCADE,
    days_overdue INTEGER NOT NULL,
    penalty_amount DECIMAL(10, 2) DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'Active', -- 'Active', 'Resolved', 'Legal_Action'
    last_warning_date DATE,
    warning_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Warning_Letters (
    warning_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    arrear_id UUID REFERENCES Arrears(arrear_id) ON DELETE CASCADE,
    warning_level INTEGER NOT NULL, -- 1, 2, 3 (เกิน 3 ตัดบริการ)
    sent_date DATE NOT NULL,
    delivery_method VARCHAR(50), -- 'Mail', 'LINE', 'In_Person'
    status VARCHAR(20) DEFAULT 'Sent', -- 'Sent', 'Delivered', 'Acknowledged'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 9. ระบบบริการเก็บขยะ (Service Tracking & Anti-Fraud)
-- ==============================================================================

CREATE TABLE Garbage_Collections (
    collection_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    house_id UUID REFERENCES Houses(house_id) ON DELETE CASCADE,
    collector_user_id UUID REFERENCES Users(user_id) ON DELETE RESTRICT,
    collection_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'Completed', -- 'Completed', 'Skipped_Unpaid', 'Missed'
    
    -- เพิ่ม: มาตรการยืนยันการปฏิบัติงาน (Anti-Fraud)
    gps_latitude DECIMAL(10, 8) NOT NULL, -- บังคับบันทึกพิกัด (Geofencing)
    gps_longitude DECIMAL(11, 8) NOT NULL,
    photo_evidence_url VARCHAR(255), -- รูปถ่ายหน้าบ้าน/ถังขยะ
    
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 10. ระบบตรวจสอบและติดตามการทุจริต (Immutable Audit Logs)
-- ==============================================================================

CREATE TABLE Audit_Logs (
    log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES Users(user_id) ON DELETE SET NULL,
    action_type VARCHAR(50) NOT NULL, -- 'UPDATE_RATE', 'CANCEL_INVOICE', 'MANUAL_RECONCILE', 'VOID_RECEIPT'
    table_name VARCHAR(50) NOT NULL,
    record_id UUID NOT NULL,
    old_data JSONB, -- ข้อมูลก่อนแก้
    new_data JSONB, -- ข้อมูลหลังแก้
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 11. Database Triggers (Automation & Data Integrity)
-- ==============================================================================

-- Trigger: อัปเดต updated_at อัตโนมัติ
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_modtime BEFORE UPDATE ON Users FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_houses_modtime BEFORE UPDATE ON Houses FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_invoices_modtime BEFORE UPDATE ON Invoices FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_arrears_modtime BEFORE UPDATE ON Arrears FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_officers_modtime BEFORE UPDATE ON Officer_Identities FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Trigger: อัปเดตสถานะ Invoice เมื่อ Payment สำเร็จ
CREATE OR REPLACE FUNCTION update_invoice_status_on_payment()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'Completed' THEN
        UPDATE Invoices SET status = 'Paid' WHERE invoice_id = NEW.invoice_id;
        -- ปิดสถานะหนี้ค้าง (ถ้ามี)
        UPDATE Arrears SET status = 'Resolved', updated_at = CURRENT_TIMESTAMP WHERE invoice_id = NEW.invoice_id AND status = 'Active';
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trg_update_invoice_status AFTER INSERT OR UPDATE ON Payments
FOR EACH ROW EXECUTE FUNCTION update_invoice_status_on_payment();

-- ==============================================================================
-- 12. Indexes สำหรับเพิ่มประสิทธิภาพ (Performance Optimization)
-- ==============================================================================

CREATE INDEX idx_houses_resident ON Houses(resident_id);
CREATE INDEX idx_invoices_house ON Invoices(house_id);
CREATE INDEX idx_invoices_status ON Invoices(status);
CREATE INDEX idx_payments_invoice ON Payments(invoice_id);
CREATE INDEX idx_arrears_status ON Arrears(status);
CREATE INDEX idx_meters_house ON Meters(house_id);
CREATE INDEX idx_meter_readings_meter ON Meter_Readings(meter_id);
CREATE INDEX idx_garbage_house_date ON Garbage_Collections(house_id, collection_date);
CREATE INDEX idx_audit_logs_table_record ON Audit_Logs(table_name, record_id);
CREATE INDEX idx_payments_reconciliation ON Payments(reconciliation_status);
