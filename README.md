# Hệ Trợ Giúp Quyết Định Tín Dụng (DSS Credit)

Dự án này là một hệ thống hỗ trợ ra quyết định (DSS) kết hợp với mô hình AI để đánh giá rủi ro tín dụng cho khách hàng cá nhân. Hệ thống bao gồm một Backend (Python/FastAPI) và Frontend (ReactJS).

## Cấu trúc dự án

- **backend/**: Server xử lý logic, chạy mô hình AI và thuật toán DSS.
- **frontend/**: Giao diện người dùng cho Khách hàng (nhập liệu) và Admin (cấu hình, phê duyệt).

## Hướng dẫn cài đặt và chạy

### 1. Backend (Python)

```bash
cd backend
# Tạo môi trường ảo (nếu chưa có)
python -m venv venv

# Kích hoạt môi trường ảo
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Cài đặt thư viện
pip install fastapi uvicorn pydantic

# Chạy server
uvicorn main:app --reload
```
Server sẽ chạy tại: `http://localhost:8000`

### 2. Frontend (ReactJS)

```bash
cd frontend

# Cài đặt dependencies
npm install

# Chạy ứng dụng
npm start
```
Ứng dụng sẽ chạy tại: `http://localhost:3000`

## Tính năng chính

1.  **User Tab**: Nhập thông tin hồ sơ vay vốn, tự động tính toán các chỉ số tài chính sơ bộ.
2.  **Admin Tab**:
    *   Dashboard điều chỉnh các biến vĩ mô (Lạm phát, Tỷ giá, Bất ổn chính trị, Dự trữ ngoại hối).
    *   Hệ thống tự động tính toán Ngưỡng thích ứng (Dynamic Threshold).
    *   Đưa ra quyết định: "Đồng ý" hoặc "Từ chối" dựa trên luật kết hợp (Rule-based) và điểm AI.

## Công nghệ sử dụng

-   **Backend**: FastAPI, Python.
-   **Frontend**: ReactJS, CSS Modules.
