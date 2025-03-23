# Student Enrollment API

API cho hệ thống nhập học của sinh viên, cho phép quản lý thông tin sinh viên và đơn ứng tuyển.

## Cấu Trúc API

### 1. Lấy Danh Sách Sinh Viên

- **Endpoint**: `GET /api/students`
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
            "email": "nguyenvana@example.com",
            "created_at": "2023-01-01T00:00:00Z",
            "updated_at": "2023-01-01T00:00:00Z"
        },
        ...
    ]
    ```
- **Lỗi**:
  - **Mã trạng thái**: 500 Internal Server Error
  - **Nội dung**: Thông báo lỗi nếu có vấn đề xảy ra trong quá trình truy xuất dữ liệu.

### 2. Thêm Sinh Viên Mới

- **Endpoint**: `POST /api/students`
- **Mô tả**: Thêm một sinh viên mới vào cơ sở dữ liệu.
- **Tham số**:
  - **Body**:
    ```json
    {
      "full_name": "Nguyen Van B",
      "date_of_birth": "2001-02-02",
      "address": "456 Avenue, City",
      "phone_number": "0987654321",
      "email": "nguyenvanb@example.com",
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
  - **Nội dung**: Thông báo lỗi nếu thông tin không hợp lệ.
  - **Mã trạng thái**: 500 Internal Server Error
  - **Nội dung**: Thông báo lỗi nếu có vấn đề xảy ra trong quá trình thêm sinh viên.

### 3. Lấy Danh Sách Đơn Ứng Tuyển

- **Endpoint**: `GET /api/applications`
- **Mô tả**: Lấy danh sách tất cả đơn ứng tuyển trong cơ sở dữ liệu.
- **Tham số**: Không có.
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    [
        {
            "application_id": 1,
            "student_id": 1,
            "submission_date": "2023-01-10T00:00:00Z",
            "status": "pending",
            "reviewed_at": null
        },
        ...
    ]
    ```
- **Lỗi**:
  - **Mã trạng thái**: 500 Internal Server Error
  - **Nội dung**: Thông báo lỗi nếu có vấn đề xảy ra trong quá trình truy xuất dữ liệu.

### 4. Thêm Đơn Ứng Tuyển Mới

- **Endpoint**: `POST /api/applications`
- **Mô tả**: Thêm một đơn ứng tuyển mới vào cơ sở dữ liệu.
- **Tham số**:
  - **Body**:
    ```json
    {
      "student_id": 1,
      "status": "pending"
    }
    ```
- **Phản hồi thành công**:
  - **Mã trạng thái**: 201 Created
  - **Nội dung**: Thông báo thành công.
- **Lỗi**:
  - **Mã trạng thái**: 400 Bad Request
  - **Nội dung**: Thông báo lỗi nếu thông tin không hợp lệ.
  - **Mã trạng thái**: 500 Internal Server Error
  - **Nội dung**: Thông báo lỗi nếu có vấn đề xảy ra trong quá trình thêm đơn ứng tuyển.

### 5. Lấy Đơn Ứng Tuyển Theo ID

- **Endpoint**: `GET /api/applications/:id`
- **Mô tả**: Lấy thông tin đơn ứng tuyển theo ID.
- **Tham số**:
  - **URL Parameter**: `id` - ID của đơn ứng tuyển cần lấy.
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    {
      "application_id": 1,
      "student_id": 1,
      "submission_date": "2023-01-10T00:00:00Z",
      "status": "pending",
      "reviewed_at": null
    }
    ```
- **Lỗi**:
  - **Mã trạng thái**: 404 Not Found
  - **Nội dung**: "Đơn ứng tuyển không tìm thấy" nếu không có đơn ứng tuyển với ID đã chỉ định.
  - **Mã trạng thái**: 500 Internal Server Error
  - **Nội dung**: Thông báo lỗi nếu có vấn đề xảy ra trong quá trình truy xuất dữ liệu.

### 6. Tải Lên Tài Liệu

- **Endpoint**: `POST /api/documents`
- **Mô tả**: Thêm một tài liệu cho đơn ứng tuyển.
- **Tham số**:
  - **Body**:
    ```json
    {
      "application_id": 1,
      "document_type": "Bằng cấp",
      "file_path": "/path/to/document.pdf"
    }
    ```
- **Phản hồi thành công**:
  - **Mã trạng thái**: 201 Created
  - **Nội dung**: "Tài liệu được tải lên thành công".
- **Lỗi**:
  - **Mã trạng thái**: 500 Internal Server Error
  - **Nội dung**: Thông báo lỗi nếu có vấn đề xảy ra trong quá trình tải lên tài liệu.

### 7. Lấy Tài Liệu Theo ID

- **Endpoint**: `GET /api/documents/:id`
- **Mô tả**: Lấy tài liệu theo ID.
- **Tham số**:
  - **URL Parameter**: `id` - ID của tài liệu cần lấy.
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    {
      "document_id": 1,
      "application_id": 1,
      "document_type": "Bằng cấp",
      "file_path": "/path/to/document.pdf",
      "uploaded_at": "2023-01-01T00:00:00Z"
    }
    ```
- **Lỗi**:
  - **Mã trạng thái**: 404 Not Found
  - **Nội dung**: "Tài liệu không tìm thấy" nếu không có tài liệu với ID đã chỉ định.
  - **Mã trạng thái**: 500 Internal Server Error
  - **Nội dung**: Thông báo lỗi nếu có vấn đề xảy ra trong quá trình truy xuất dữ liệu.

### 8. Lấy Tất Cả Tài Liệu

- **Endpoint**: `GET /api/documents`
- **Mô tả**: Lấy tất cả tài liệu.
- **Phản hồi thành công**:
  - **Mã trạng thái**: 200 OK
  - **Nội dung**:
    ```json
    [
      {
        "document_id": 1,
        "application_id": 1,
        "document_type": "Bằng cấp",
        "file_path": "/path/to/document.pdf",
        "uploaded_at": "2023-01-01T00:00:00Z"
      },
      {
        "document_id": 2,
        "application_id": 2,
        "document_type": "Giấy tờ tùy thân",
        "file_path": "/path/to/another_document.pdf",
        "uploaded_at": "2023-01-02T00:00:00Z"
      }
    ]
    ```
- **Lỗi**:
  - **Mã trạng thái**: 500 Internal Server Error
  - **Nội dung**: Thông báo lỗi nếu có vấn đề xảy ra trong quá trình truy xuất dữ liệu.

## Cách Sử Dụng

1. **Khởi động máy chủ**:
   ```bash
   node server.js
   ```
