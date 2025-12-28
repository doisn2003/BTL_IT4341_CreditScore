# Hướng dẫn chạy Backend

Thư mục này chứa mã nguồn Backend của hệ thống DSS Credit Score, được xây dựng bằng Python và FastAPI.

## Yêu cầu hệ thống
- Python 3.8 trở lên.

## Các bước cài đặt

### 1. Tạo môi trường ảo (Virtual Environment)
Mở terminal tại thư mục này (`backend/backend`) và chạy lệnh sau để tạo môi trường ảo tên là `venv`:

```bash
python -m venv venv
```

### 2. Kích hoạt môi trường ảo
*   **Windows:**
    ```bash
    .\venv\Scripts\activate
    ```
*   **macOS / Linux:**
    ```bash
    source venv/bin/activate
    ```

### 3. Cài đặt các thư viện cần thiết
Sau khi kích hoạt môi trường ảo, chạy lệnh cài đặt các thư viện phụ thuộc:

```bash
pip install fastapi uvicorn pydantic
```
*(Nếu sau này có thêm file `requirements.txt`, bạn có thể chạy `pip install -r requirements.txt`)*

## Khởi động Server

Để chạy server backend, hãy sử dụng lệnh `uvicorn`:

```bash
uvicorn main:app --reload
```

*   Server sẽ khởi động tại địa chỉ: `http://localhost:8000`
*   Swagger UI (Tài liệu API tự động): `http://localhost:8000/docs`

## Cấu trúc file
*   `main.py`: File chính chứa cấu hình FastAPI và các API endpoints.
*   `dss_engine.py`: Chứa logic xử lý của hệ thống hỗ trợ ra quyết định (DSS).
