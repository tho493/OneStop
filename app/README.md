<h1 align="center">Cấu trúc API</h1>

<p align="center">API cho hệ thống hỗ trợ sinh viên</p>

# Xác minh người dùng

### 1. Đăng Nhập Người Dùng

- **Endpoint**: `POST /login`
- **Mô tả**: Xác thực người dùng (quản trị viên hoặc sinh viên) và trả về token JWT nếu thông tin đăng nhập hợp lệ.
- **Tham số**:

  - **Body**:
    ```json
    {
      "username": "example_user",
      "password": "example_password"
    }
    ```

- **Phản hồi thành công**:

  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    {
      "token": "your_jwt_token",
      "type": "user/admin"
    }
    ```

- **Lỗi**:
  - **Mã trạng thái**: 400 Bad Request
    - **Nội dung**:
      ```json
      {
        "message": "Tài khoản không hợp lệ"
      }
      ```
  - **Mã trạng thái**: 401 Unauthorized
    - **Nội dung**:
      ```json
      {
        "message": "Mật khẩu không chính xác"
      }
      ```
  - **Mã trạng thái**: 404 Not Found
    - **Nội dung**:
      ```json
      {
        "message": "Tài khoản không tồn tại"
      }
      ```
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

### 2. Xác Thực Token

- **Endpoint**: `GET /authToken`.
- **Mô tả**: Xác thực token JWT từ header `Authorization`. Đảm bảo người dùng đã đăng nhập và có quyền truy cập.
- **Tham số**: Không có.
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK (nếu URL là `/authToken`)
    - **Nội dung**:
      ```json
      {
        "type": "admin" // hoặc "user"
      }
      ```
- **Lỗi**:
  - **Mã trạng thái**: 401 Unauthorized
    - **Nội dung**:
      ```json
      {
        "message": "Bạn chưa đăng nhập"
      }
      ```
  - **Mã trạng thái**: 403 Forbidden
    - **Nội dung**:
      ```json
      {
        "message": "Token không hợp lệ"
      }
      ```
  - **Mã trạng thái**: 403 Forbidden (nếu loại người dùng không hợp lệ)
    - **Nội dung**:
      ```json
      {
        "message": "Loại người dùng không hợp lệ"
      }
      ```

### Lưu Ý

- Token được lấy từ header `Authorization` phải có định dạng `Bearer <token>`.
- Middleware sẽ gán thông tin người dùng vào `req.user` để các hàm xử lý tiếp theo có thể sử dụng.

# Document

### 1. Tải Tài Liệu Lên

- **Endpoint**: `POST /documents/upload`
- **Mô tả**: Tải tài liệu lên máy chủ và lưu vào cơ sở dữ liệu.
- **Tham số**:
  - **Body** (multipart/form-data):
    - `document_type`: Loại tài liệu.
    - `document_name`: Tên tài liệu.
    - `document`: Tệp tài liệu.
- **Phản hồi thành công**:
  - **Mã trạng thái**: 201 Created
  - **Nội dung**:
    ```json
    {
      "message": "Tài liệu được tải lên thành công",
      "document_id": 1
    }
    ```
- **Lỗi**:
  - **Mã trạng thái**: 400 Bad Request
    - **Nội dung**:
      ```json
      {
        "message": "Không có tên tài liệu" // hoặc "Không có file nào được tải lên"
      }
      ```
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

### 2. Tải Tài Liệu Xuống

- **Endpoint**: `GET /documents/:id`
- **Mô tả**: Tải tài liệu từ máy chủ dựa trên `document_id`.
- **Tham số**:
  - `id`: ID của tài liệu.
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**: Tệp tài liệu sẽ được tải xuống.
- **Lỗi**:
  - **Mã trạng thái**: 404 Not Found
    - **Nội dung**:
      ```json
      {
        "message": "Tài liệu không tìm thấy" // hoặc "File không tồn tại"
      }
      ```
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi khi tải file"
      }
      ```

### 3. Lấy Tất Cả Tài Liệu

- **Endpoint**: `GET /documents`
- **Mô tả**: Lấy danh sách tất cả tài liệu trong cơ sở dữ liệu.
- **Tham số**: Không có.
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    [
        {
            "document_id": 1,
            "document_type": "type",
            "file_name": "example.pdf",
            "file_path": "uploads/example.pdf"
        },
        ...
    ]
    ```
- **Lỗi**:
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

### 4. Lấy Tài Liệu Theo ID

- **Endpoint**: `GET /documents/:id`
- **Mô tả**: Lấy thông tin chi tiết của tài liệu dựa trên `document_id`.
- **Tham số**:
  - `id`: ID của tài liệu.
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    {
      "document_id": 1,
      "document_type": "type",
      "file_name": "example.pdf",
      "file_path": "uploads/example.pdf"
    }
    ```
- **Lỗi**:
  - **Mã trạng thái**: 404 Not Found
    - **Nội dung**:
      ```json
      {
        "message": "Tài liệu không tìm thấy"
      }
      ```
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

### 5. Xóa Tài Liệu

- **Endpoint**: `DELETE /documents/:id`
- **Mô tả**: Xóa tài liệu dựa trên `document_id`.
- **Tham số**:
  - `id`: ID của tài liệu.
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    {
      "message": "Tài liệu đã được xóa thành công"
    }
    ```
- **Lỗi**:
  - **Mã trạng thái**: 404 Not Found
    - **Nội dung**:
      ```json
      {
        "message": "Tài liệu không tìm thấy"
      }
      ```
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

# Students

### 1. Lấy Tất Cả Sinh Viên

- **Endpoint**: `GET /students`
- **Mô tả**: Lấy danh sách tất cả sinh viên trong cơ sở dữ liệu.
- **Tham số**: Không có.
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    [
        {
            "student_id": 1,
            "full_name": "Nguyen Van A",
            "date_of_birth": "2000-01-01",
            "address": "123 Street, City",
            "phone_number": "0123456789",
            "email": "nguyenvana@example.com"
        },
        ...
    ]
    ```
- **Lỗi**:
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

### 2. Lấy Sinh Viên Theo ID

- **Endpoint**: `GET /students/:id`
- **Mô tả**: Lấy thông tin chi tiết của sinh viên dựa trên `student_id`.
- **Tham số**:
  - `id`: ID của sinh viên.
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    {
      "student_id": 1,
      "full_name": "Nguyen Van A",
      "date_of_birth": "2000-01-01",
      "address": "123 Street, City",
      "phone_number": "0123456789",
      "email": "nguyenvana@example.com"
    }
    ```
- **Lỗi**:
  - **Mã trạng thái**: 404 Not Found
    - **Nội dung**:
      ```json
      {
        "message": "Sinh viên không tìm thấy"
      }
      ```
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

### 3. Tạo Sinh Viên Mới

- **Endpoint**: `POST /students`
- **Mô tả**: Tạo một sinh viên mới trong cơ sở dữ liệu.
- **Tham số**:
  - **Body**:
    ```json
    {
      "student_id": 1,
      "full_name": "Nguyen Van A",
      "date_of_birth": "2000-01-01",
      "address": "123 Street, City",
      "phone_number": "0123456789",
      "email": "nguyenvana@example.com",
      "password": "securepassword"
    }
    ```
- **Phản hồi thành công**:
  - **Mã trạng thái**: 201 Created
  - **Nội dung**:
    ```json
    {
      "message": "Sinh viên được tạo thành công",
      "student_id": 1
    }
    ```
- **Lỗi**:
  - **Mã trạng thái**: 400 Bad Request
    - **Nội dung**:
      ```json
      {
        "message": "Đã xảy ra lỗi."
      }
      ```
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

### 4. Cập Nhật Thông Tin Sinh Viên

- **Endpoint**: `PUT /students/:id`
- **Mô tả**: Cập nhật thông tin của sinh viên dựa trên `student_id`.
- **Tham số**:
  - `id`: ID của sinh viên.
- **Tham số**:
  - **Body**:
    ```json
    {
      "full_name": "Nguyen Van B",
      "date_of_birth": "2001-01-01",
      "address": "456 Street, City",
      "phone_number": "0987654321",
      "email": "nguyenb@example.com",
      "password": "newpassword"
    }
    ```
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    {
      "message": "Thông tin sinh viên đã được cập nhật thành công"
    }
    ```
- **Lỗi**:
  - **Mã trạng thái**: 404 Not Found
    - **Nội dung**:
      ```json
      {
        "message": "Sinh viên không tìm thấy"
      }
      ```
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

### 5. Xóa Sinh Viên

- **Endpoint**: `DELETE /students/:id`
- **Mô tả**: Xóa sinh viên dựa trên `student_id`.
- **Tham số**:
  - `id`: ID của sinh viên.
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    {
      "message": "Sinh viên đã được xóa thành công"
    }
    ```
- **Lỗi**:
  - **Mã trạng thái**: 404 Not Found
    - **Nội dung**:
      ```json
      {
        "message": "Sinh viên không tìm thấy"
      }
      ```
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

# Loại yêu cầu

### 1. Lấy Danh Sách Loại Yêu Cầu

- **Endpoint**: `GET /loai-yeu-cau`
- **Mô tả**: Lấy danh sách tất cả loại yêu cầu trong cơ sở dữ liệu.
- **Tham số**: Không có.
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    [
        {
            "loai_yeu_cau_id": 1,
            "ten_loai": "Yêu cầu A",
            "document_id": 1
        },
        ...
    ]
    ```
- **Lỗi**:
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

### 2. Lấy Loại Yêu Cầu Theo ID

- **Endpoint**: `GET /loai-yeu-cau/:id`
- **Mô tả**: Lấy thông tin chi tiết của loại yêu cầu dựa trên `loai_yeu_cau_id`.
- **Tham số**:
  - `id`: ID của loại yêu cầu.
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    {
      "loai_yeu_cau_id": 1,
      "ten_loai": "Yêu cầu A",
      "document_id": 1
    }
    ```
- **Lỗi**:
  - **Mã trạng thái**: 404 Not Found
    - **Nội dung**:
      ```json
      {
        "message": "Loại yêu cầu không tìm thấy"
      }
      ```
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

### 3. Tạo Loại Yêu Cầu Mới

- **Endpoint**: `POST /loai-yeu-cau`
- **Mô tả**: Tạo một loại yêu cầu mới trong cơ sở dữ liệu.
- **Tham số**:
  - **Body**:
    ```json
    {
      "ten_loai": "Yêu cầu A",
      "document_id": 1
    }
    ```
- **Phản hồi thành công**:
  - **Mã trạng thái**: 201 Created
  - **Nội dung**:
    ```json
    {
      "message": "Loại yêu cầu được tạo thành công",
      "loai_yeu_cau_id": 1
    }
    ```
- **Lỗi**:
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

### 4. Cập Nhật Loại Yêu Cầu

- **Endpoint**: `PUT /loai-yeu-cau/:id`
- **Mô tả**: Cập nhật thông tin của loại yêu cầu dựa trên `loai_yeu_cau_id`.
- **Tham số**:
  - `id`: ID của loại yêu cầu.
- **Tham số**:
  - **Body**:
    ```json
    {
      "ten_loai": "Yêu cầu B",
      "document_id": 2
    }
    ```
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    {
      "message": "Loại yêu cầu đã được cập nhật thành công"
    }
    ```
- **Lỗi**:
  - **Mã trạng thái**: 404 Not Found
    - **Nội dung**:
      ```json
      {
        "message": "Loại yêu cầu không tìm thấy"
      }
      ```
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

### 5. Xóa Loại Yêu Cầu

- **Endpoint**: `DELETE /loai-yeu-cau/:id`
- **Mô tả**: Xóa loại yêu cầu dựa trên `loai_yeu_cau_id`.
- **Tham số**:
  - `id`: ID của loại yêu cầu.
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    {
      "message": "Loại yêu cầu đã được xóa thành công"
    }
    ```
- **Lỗi**:
  - **Mã trạng thái**: 404 Not Found
    - **Nội dung**:
      ```json
      {
        "message": "Loại yêu cầu không tìm thấy"
      }
      ```
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

# Yêu cầu

### 1. Lấy Danh Sách Yêu Cầu

- **Endpoint**: `GET /yeu-cau`
- **Mô tả**: Lấy danh sách tất cả yêu cầu trong cơ sở dữ liệu.
- **Tham số**: Không có.
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    [
        {
            "yeu_cau_id": 1,
            "loai_yeu_cau_id": 1,
            "student_id": 1,
            "message": "Yêu cầu hỗ trợ",
            "status": "Mới"
        },
        ...
    ]
    ```
- **Lỗi**:
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

### 2. Lấy Yêu Cầu Theo ID

- **Endpoint**: `GET /yeu-cau/:id`
- **Mô tả**: Lấy thông tin chi tiết của yêu cầu dựa trên `yeu_cau_id`.
- **Tham số**:
  - `id`: ID của yêu cầu.
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    {
      "yeu_cau_id": 1,
      "loai_yeu_cau_id": 1,
      "student_id": 1,
      "message": "Yêu cầu hỗ trợ",
      "status": "pending"
    }
    ```
- **Lỗi**:
  - **Mã trạng thái**: 404 Not Found
    - **Nội dung**:
      ```json
      {
        "message": "Yêu cầu không tìm thấy"
      }
      ```
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

### 3. Tạo Yêu Cầu Mới

- **Endpoint**: `POST /yeu-cau`
- **Mô tả**: Tạo một yêu cầu mới trong cơ sở dữ liệu.
- **Tham số**:
  - **Body**:
    ```json
    {
      "loai_yeu_cau_id": 1,
      "student_id": 1,
      "message": "Yêu cầu hỗ trợ"
    }
    ```
- **Phản hồi thành công**:
  - **Mã trạng thái**: 201 Created
  - **Nội dung**:
    ```json
    {
      "message": "Yêu cầu được tạo thành công",
      "yeu_cau_id": 1
    }
    ```
- **Lỗi**:
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

### 4. Cập Nhật Yêu Cầu

- **Endpoint**: `PUT /yeu-cau/:id`
- **Mô tả**: Cập nhật thông tin của yêu cầu dựa trên `yeu_cau_id`.
- **Tham số**:
  - `id`: ID của yêu cầu.
- **Tham số**:
  - **Body**:
    ```json
    {
      "loai_yeu_cau_id": 1,
      "student_id": 1,
      "message": "Cập nhật yêu cầu hỗ trợ",
      "status": "approved"
    }
    ```
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    {
      "message": "Yêu cầu đã được cập nhật thành công"
    }
    ```
- **Lỗi**:
  - **Mã trạng thái**: 404 Not Found
    - **Nội dung**:
      ```json
      {
        "message": "Yêu cầu không tìm thấy"
      }
      ```
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

### 5. Xóa Yêu Cầu

- **Endpoint**: `DELETE /yeu-cau/:id`
- **Mô tả**: Xóa yêu cầu dựa trên `yeu_cau_id`.
- **Tham số**:
  - `id`: ID của yêu cầu.
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    {
      "message": "Yêu cầu đã được xóa thành công"
    }
    ```
- **Lỗi**:
  - **Mã trạng thái**: 404 Not Found
    - **Nội dung**:
      ```json
      {
        "message": "Yêu cầu không tìm thấy"
      }
      ```
  - **Mã trạng thái**: 500 Internal Server Error
    - **Nội dung**:
      ```json
      {
        "message": "Lỗi máy chủ"
      }
      ```

## Cách Sử Dụng

1. **Khởi động máy chủ**:
   ```bash
   node server.js
   ```
