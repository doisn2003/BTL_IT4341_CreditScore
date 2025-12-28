// src/components/UserTab.js
import React from 'react';

function UserTab({
    userData = { userId: '', fullName: '' },
    setUserData,
    userProfile = {},
    setUserProfile,
    loanAmount = 0,
    setLoanAmount,
    onSubmit
}) {

    // Hàm xử lý thay đổi cho UserProfile (AI Data)
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        // Chặn lỗi nếu userProfile chưa khởi tạo
        if (!setUserProfile) return;

        const finalValue = e.target.type === 'number' ? parseFloat(value) || 0 : value;
        setUserProfile(prev => ({ ...prev, [name]: finalValue }));
    };

    // Helper để lấy giá trị an toàn
    const p = (key) => userProfile[key] !== undefined ? userProfile[key] : '';

    return (
        <div className="panel user-panel">
            <h2>1. Nhập Hồ Sơ Vay Vốn</h2>

            {/* --- PHẦN 0: THÔNG TIN ĐỊNH DANH --- */}
            <fieldset className="fieldset-group">
                <legend>Thông tin định danh</legend>
                <div className="grid-2">
                    <div className="form-group">
                        <label>Mã Khách Hàng:</label>
                        <input
                            type="text"
                            value={userData.userId || ''}
                            onChange={(e) => setUserData && setUserData({ ...userData, userId: e.target.value })}
                            placeholder="KH001"
                        />
                    </div>
                    <div className="form-group">
                        <label>Họ và Tên:</label>
                        <input
                            type="text"
                            value={userData.fullName || ''}
                            onChange={(e) => setUserData && setUserData({ ...userData, fullName: e.target.value })}
                            placeholder="Nguyễn Văn A"
                        />
                    </div>
                </div>
            </fieldset>

            {/* --- PHẦN 1: THÔNG TIN CÁ NHÂN (Cho AI) --- */}
            <fieldset className="fieldset-group">
                <legend>Thông tin nhân khẩu học (AI Model)</legend>
                <div className="grid-2">
                    <div className="form-group">
                        <label>Tuổi:</label>
                        <input type="number" name="age" value={p('age')} onChange={handleProfileChange} />
                    </div>
                    <div className="form-group">
                        <label>Nghề nghiệp:</label>
                        <input type="text" name="occupation" value={p('occupation')} onChange={handleProfileChange} />
                    </div>
                    <div className="form-group">
                        <label>Thu nhập năm ($):</label>
                        <input type="number" name="annual_income" value={p('annual_income')} onChange={handleProfileChange} />
                    </div>
                    <div className="form-group">
                        <label>Lương thực nhận ($):</label>
                        <input type="number" name="monthly_inhand_salary" value={p('monthly_inhand_salary')} onChange={handleProfileChange} />
                    </div>
                </div>
            </fieldset>

            {/* --- PHẦN 2: TÀI CHÍNH & NỢ --- */}
            <fieldset className="fieldset-group">
                <legend>Tình trạng tài chính</legend>
                <div className="grid-2">
                    <div className="form-group">
                        <label>Số dư nợ hiện tại ($): <span style={{ color: 'red' }}>*</span></label>
                        <input type="number" name="outstanding_debt" value={p('outstanding_debt')} onChange={handleProfileChange} />
                    </div>
                    <div className="form-group">
                        <label>Số ngày trễ hạn TB:</label>
                        <input type="number" name="delay_from_due_date" value={p('delay_from_due_date')} onChange={handleProfileChange} />
                    </div>
                    <div className="form-group">
                        <label>Lãi suất thẻ (%):</label>
                        <input type="number" name="interest_rate" value={p('interest_rate')} onChange={handleProfileChange} />
                    </div>
                    <div className="form-group">
                        <label>Số khoản vay:</label>
                        <input type="number" name="num_of_loan" value={p('num_of_loan')} onChange={handleProfileChange} />
                    </div>
                    <div className="form-group">
                        <label>Số thẻ tín dụng:</label>
                        <input type="number" name="num_credit_card" value={p('num_credit_card')} onChange={handleProfileChange} />
                    </div>
                    <div className="form-group">
                        <label>Số TK ngân hàng:</label>
                        <input type="number" name="num_bank_accounts" value={p('num_bank_accounts')} onChange={handleProfileChange} />
                    </div>
                </div>
            </fieldset>

            {/* --- PHẦN 3: LỊCH SỬ --- */}
            <fieldset className="fieldset-group">
                <legend>Lịch sử & Hành vi</legend>
                <div className="grid-2">
                    <div className="form-group">
                        <label>Credit Mix:</label>
                        <select name="credit_mix" value={p('credit_mix')} onChange={handleProfileChange}>
                            <option value="Standard">Standard</option>
                            <option value="Good">Good</option>
                            <option value="Bad">Bad</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Tuổi đời tín dụng (tháng):</label>
                        <input type="number" name="credit_history_age_months" value={p('credit_history_age_months')} onChange={handleProfileChange} />
                    </div>
                    <div className="form-group">
                        <label>Thanh toán tối thiểu:</label>
                        <select name="payment_of_min_amount" value={p('payment_of_min_amount')} onChange={handleProfileChange}>
                            <option value="Yes">Có</option>
                            <option value="No">Không</option>
                            <option value="NM">NM</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Hành vi thanh toán:</label>
                        <select name="payment_behaviour" value={p('payment_behaviour')} onChange={handleProfileChange}>
                            <option value="Low_spent_Small_value_payments">Low spent, Small value</option>
                            <option value="High_spent_Medium_value_payments">High spent, Medium value</option>
                            <option value="High_spent_Large_value_payments">High spent, Large value</option>
                        </select>
                    </div>
                </div>
            </fieldset>

            {/* --- PHẦN 4: DSS INPUT --- */}
            <div className="dss-section">
                <h3>Yêu cầu khoản vay</h3>
                <div className="form-group">
                    <label>Số tiền muốn vay (VND) <span style={{ color: 'red' }}>*</span>:</label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount && setLoanAmount(e.target.value)}
                        style={{ fontSize: '18px', fontWeight: 'bold' }}
                    />
                    <small>Dùng để tính rủi ro quy mô vốn (rM)</small>
                </div>
            </div>

            <button className="btn-primary" onClick={onSubmit} style={{ marginTop: '20px' }}>
                Gửi Hồ Sơ & Đánh Giá (Chuyển Admin)
            </button>
        </div>
    );
}

export default UserTab;