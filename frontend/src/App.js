// src/App.js
import React, { useState } from 'react';
import './App.css';
import UserTab from './components/UserTab/UserTab';
import AdminTab from './components/AdminTab/AdminTab';

function App() {
  const [activeTab, setActiveTab] = useState('user');
  const [result, setResult] = useState(null);

  // 1. State thông tin cơ bản (Dùng để hiển thị tên, mã KH)
  const [userData, setUserData] = useState({
    userId: '',
    fullName: ''
  });

  // 2. State số tiền vay (Input riêng cho DSS)
  const [loanAmount, setLoanAmount] = useState(100000000);

  // 3. State dữ liệu chuyên sâu (Input cho ML Model)
  const [userProfile, setUserProfile] = useState({
    age: 30,
    occupation: "Engineer",
    annual_income: 50000,
    monthly_inhand_salary: 4000,
    num_bank_accounts: 2,
    num_credit_card: 4,
    interest_rate: 15,
    num_of_loan: 2,
    type_of_loan: "Auto Loan",
    delay_from_due_date: 5,
    num_of_delayed_payment: 2,
    changed_credit_limit: 1,
    num_credit_inquiries: 3,
    outstanding_debt: 1200,
    credit_mix: "Standard",
    credit_history_age_months: 24,
    payment_of_min_amount: "Yes",
    total_emi_per_month: 200,
    amount_invested_monthly: 100,
    payment_behaviour: "Low_spent_Small_value_payments",
    monthly_balance: 300
  });

  // 4. State môi trường (Admin cấu hình)
  const [envData, setEnvData] = useState({
    inflation_L: 3.0,
    exchange_rate_D: 0.05,
    geopolitics_W: 0.2,
    reserve_V: 1000000000
  });

  const handleEvaluate = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Gửi object userProfile phức tạp cho AI
          user_profile: userProfile, 
          // Gửi số tiền vay cho DSS
          loan_amount: parseFloat(loanAmount),
          // Gửi các biến môi trường
          inflation_L: parseFloat(envData.inflation_L),
          exchange_rate_D: parseFloat(envData.exchange_rate_D),
          geopolitics_W: parseFloat(envData.geopolitics_W),
          reserve_V: parseFloat(envData.reserve_V)
        })
      });
      
      const data = await response.json();
      setResult(data);
      
    } catch (error) {
      console.error("Error:", error);
      alert("Lỗi kết nối Backend! Hãy chắc chắn server đang chạy.");
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Hệ Trợ Giúp Quyết Định Tín Dụng (DSS)</h1>
        <p>Credit Scoring & Environment Adaptive Threshold Model</p>
      </header>
      
      <div className="tabs-navigation">
        <button 
          className={activeTab === 'user' ? 'tab-btn active' : 'tab-btn'} 
          onClick={() => setActiveTab('user')}
        >
          Nhập Liệu Khách Hàng
        </button>
        <button 
          className={activeTab === 'admin' ? 'tab-btn active' : 'tab-btn'} 
          onClick={() => setActiveTab('admin')}
        >
          Admin Dashboard
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'user' ? (
          <UserTab 
            // Truyền đủ các props cần thiết
            userData={userData}             
            setUserData={setUserData}       
            userProfile={userProfile}       
            setUserProfile={setUserProfile} 
            loanAmount={loanAmount}         
            setLoanAmount={setLoanAmount}   
            onSubmit={() => {
                alert("Đã lưu hồ sơ! Chuyển sang tab Admin để duyệt.");
                setActiveTab('admin');
            }}
          />
        ) : (
          <AdminTab 
            envData={envData} 
            setEnvData={setEnvData} 
            // AdminTab cần hiển thị tên người dùng và số tiền vay
            userData={{...userData, loanAmount: loanAmount}} 
            result={result}
            onEvaluate={handleEvaluate}
          />
        )}
      </div>
    </div>
  );
}

export default App;