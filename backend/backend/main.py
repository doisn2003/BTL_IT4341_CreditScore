from fastapi import FastAPI
from pydantic import BaseModel
from dss_engine import DecisionSupportSystem
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Config CORS để React gọi được API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 1. ĐỊNH NGHĨA DATA MODEL CHO ML (AI) ---
class UserProfile(BaseModel):
    # Thông tin cá nhân
    age: int
    occupation: str 
    annual_income: float
    monthly_inhand_salary: float
    
    # Tài khoản & Nợ
    num_bank_accounts: int
    num_credit_card: int
    interest_rate: float
    num_of_loan: int
    type_of_loan: str # Ví dụ: "Auto Loan, Credit-Builder Loan"
    delay_from_due_date: int
    num_of_delayed_payment: int
    changed_credit_limit: float
    num_credit_inquiries: int
    outstanding_debt: float
    
    # Lịch sử & Hành vi
    credit_mix: str # "Good", "Standard", "Bad"
    credit_history_age_months: int # Quy đổi ra tổng số tháng
    payment_of_min_amount: str # "Yes", "No", "NM"
    total_emi_per_month: float
    amount_invested_monthly: float
    payment_behaviour: str 
    monthly_balance: float

# --- 2. MODEL TỔNG HỢP (Gửi từ Frontend lên) ---
class LoanApplicationRequest(BaseModel):
    user_profile: UserProfile   # Dữ liệu dành cho AI Model
    loan_amount: float          # Dữ liệu dành cho DSS (Biến M)
    
    # Các biến môi trường admin set
    inflation_L: float
    exchange_rate_D: float
    geopolitics_W: float
    reserve_V: float

# Hàm fetch data 2 chiều ở đây
@app.post("/api/evaluate")
def evaluate_loan(data: LoanApplicationRequest):
    # ---------------------------------------------------------
    # BƯỚC 1: GỌI MODEL ML (Phần việc của team ML)
    # ---------------------------------------------------------
    # Tại đây, truyền data.user_profile vào hàm predict của team ML.
    # Ví dụ: credit_score_Y = ml_model.predict(data.user_profile)
    # Ở đây anh giả lập một tí để code DSS chạy được:
    # Giả sử (dòng 71): ai_prediction_label = "Good"
    # ---------------------------------------------------------

    # Để nguyên logic tính số ngẫu nhiên này cho khách quan và đỡ nghèo nàn output
    import random
    ai_prediction_label = "Good"
    if ai_prediction_label == "Good":
        credit_score_Y = random.uniform(0.8, 0.95)
    elif ai_prediction_label == "Standard":
        credit_score_Y = random.uniform(0.4, 0.8)
    else:
        credit_score_Y = random.uniform(0.0, 0.4)

    # ---------------------------------------------------------
    # BƯỚC 2: CHẠY HỆ THỐNG DSS
    # ---------------------------------------------------------

    # Cấu hình hằng số hệ thống
    constants = {
        'L_max': 10.0,      # Lạm phát tối đa 10%
        'L_min': 0.0,
        'V_total': 100000000000.0 # 100 Tỷ vốn
    }

    # Khởi tạo bộ máy DSS
    dss = DecisionSupportSystem()

    # Chuẩn hóa đầu vào
    normalized_inputs = dss.normalize_inputs(
        Y=credit_score_Y,
        M=data.loan_amount,
        V=data.reserve_V,
        L=data.inflation_L,
        D=data.exchange_rate_D,
        W=data.geopolitics_W,
        constants=constants
    )

    # Tính toán kết quả
    result = dss.evaluate(normalized_inputs)
    
    # Trả về thêm credit_score gốc để hiển thị bên Dashboard Admin
    result["user_credit_score"] = credit_score_Y
    
    return result

# Chạy server: uvicorn main:app --reload