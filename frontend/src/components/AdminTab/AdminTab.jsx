// src/components/AdminTab/AdminTab.jsx
import React from 'react';

function AdminTab({
    envData = {},
    setEnvData,
    userData = {},
    result,
    onEvaluate
}) {

    const handleEnvChange = (e) => {
        const { name, value } = e.target;
        // Chặn lỗi nếu setEnvData chưa được truyền
        if (!setEnvData) return;
        setEnvData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="panel admin-panel">
            <h2>2. Admin Dashboard & Đánh Giá</h2>

            {/* Thông tin hồ sơ đang xem xét */}
            <div className="card" style={{ marginBottom: '20px', borderLeft: '5px solid #3498db' }}>
                <h3>Thông tin hồ sơ</h3>
                <p><strong>Khách hàng:</strong> {userData.fullName || 'Chưa nhập tên'} (ID: {userData.userId || 'N/A'})</p>
                <p><strong>Điểm tín dụng:</strong> {result ? result.user_credit_score : "Chưa đánh giá"}</p>
                <p><strong>Khoản vay đề nghị:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(userData.loanAmount || 0)}</p>
            </div>

            <div className="dashboard-grid">
                {/* Cột 1: Cấu hình Môi trường */}
                <div className="card">
                    <h3>Biến Môi Trường (Vĩ mô)</h3>
                    <p className="small-text">Điều chỉnh các chỉ số kinh tế để cập nhật ngưỡng rủi ro.</p>

                    <div className="form-group">
                        <label>Chỉ số lạm phát (%):</label>
                        <input type="range" min="0" max="50" step="0.1" name="inflation_L" value={envData.inflation_L || 0} onChange={handleEnvChange} />
<span>{envData.inflation_L || 0}%</span>
                    </div>
                    <div className="form-group"> 
                        <label>Biến động tỷ giá hối đoái 6 tháng vừa qua (%):</label>
                        <input type="range" min="0" max="20" step="0.01" name="exchange_rate_D" value={envData.exchange_rate_D || 0} onChange={handleEnvChange} />
<span>{envData.exchange_rate_D || 0}%</span>
                    </div>
                    <div className="form-group">
                        <label>Chỉ số bất ổn địa chính trị tự đánh giá khách quan (0-1):</label>
                        <input type="range" min="0" max="1" step="0.1" name="geopolitics_W" value={envData.geopolitics_W || 0} onChange={handleEnvChange} />
<span>{envData.geopolitics_W || 0}</span>
                    </div>
                    <div className="form-group">
                        <label>Vốn dự trữ của ngân hàng (VNĐ):</label>
                        <input
    type="text"
    name="reserve_V"
    value={envData.reserve_V ? Number(envData.reserve_V).toLocaleString('en-US') : ''}
    onChange={(e) => {
        const rawValue = e.target.value.replace(/,/g, '');
        if (!isNaN(rawValue)) {
            handleEnvChange({ target: { name: 'reserve_V', value: rawValue } });
        }
    }}
/>
                    </div>

                    <button className="btn-evaluate" onClick={onEvaluate}>
                        CHẠY ĐÁNH GIÁ (RUN MODEL)
                    </button>
                </div>

                {/* Cột 2: Kết quả */}
                <div className="card">
                    <h3>Kết Quả Đánh Giá</h3>
                    {result ? (
                        <div className={`result-box ${result.is_approved ? 'approved' : 'rejected'}`}>
                            <h1 className="decision-text">
                                {result.is_approved ? "ĐỒNG Ý DUYỆT VAY" : "TỪ CHỐI KHOẢN VAY"}
                            </h1>

                            <div className="metrics-grid">
                                <div className="metric-item">
                                    <label>Ngưỡng Thích Ứng T(S)</label>
                                    <strong>{result.metrics.Threshold_TS}</strong>
                                </div>
                                <div className="metric-item">
                                    <label>Rủi ro tổng hợp (E)</label>
                                    <strong>{result.metrics.E_score}</strong>
                                </div>
                                <div className="metric-item">
                                    <label>Chỉ số Môi trường (S)</label>
                                    <strong>{result.metrics.S_score}</strong>
                                </div>
                            </div>

                            <div className="conditions-list">
                                <p>Chi tiết điều kiện:</p>
                                <ul>
                                    <li>Điểm tín dụng ≥ Ngưỡng T(S): {result.conditions.Credit_Score_Check ? "✅ Đạt" : "❌ Không đạt"}</li>
                                    <li>Quy mô khoản vay (rM) ≥ 0.3: {result.conditions.Loan_Amount_Check ? "✅ Đạt" : "❌ Không đạt"}</li>
                                    <li>Rủi ro tổng hợp (E) ≥ 0.5: {result.conditions.Risk_Score_Check ? "✅ Đạt" : "❌ Không đạt"}</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', marginTop: '50px', color: '#999' }}>
                            <p>Chưa có dữ liệu đánh giá.</p>
                            <p>Vui lòng nhấn nút "Chạy Đánh Giá".</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminTab;