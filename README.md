<h1 align=center>Hệ thống một cửa SDU</h1>

<p align="center">
    Project hỗ trợ sinh viên nhập học một cách tiện lợi và nhanh chóng.
    <br />
    <br />
    <a href="https://github.com/tho493/student-enrollment.git/issues">Report Bug</a>
    ·
    <a href="https://github.com/tho493/student-enrollment.git/pulls">Request Feature</a>
    </p>
</p>

# Công nghệ sử dụng

- Frontend: ReactJS
- Backend: NodeJS
- Database: SQL Server

# Bắt đầu

## Yêu cầu

- Node.js và npm (Node Package Manager)
- Git
- SQL server

0. Clone repository về máy

   ```sh
   git clone https://github.com/tho493/student-enrollment.git
   ```

## Cài đặt server

1. Di chuyển vào thư mục be của project

   ```sh
   cd student-enrollment/be
   ```

2. Cài đặt các package cần thiết

   ```sh
   npm install
   ```

3. Tạo database

- Khởi tạo database sql server bằng file database.sql

4. Tạo file .env và thêm các thông tin API

   ```
   DB_USER=username_sql_server
   DB_PASSWORD=password_sql_server
   DB_SERVER=host_sql_server
   DB_NAME=database_name_sql_server
   JWT_SECRET=tho493
   ```

5. Chạy server
   ```sh
   npm start
   ```

### Hình ảnh console khi khởi chạy thành công

<image src="image/start_be.png">

## Cài đặt giao diện

1. Di chuyển vào thư mục be của project

   ```sh
   cd student-enrollment/fe
   ```

2. Cài đặt các package cần thiết

   ```sh
   npm install
   ```

3. Chạy giao diện

   ```sh
   npm run dev
   ```

Vite sẽ tự động truy cập vào trang web này

<h2 align=center>Giao diện hệ thống</h2>

### Giao diện quản lý

- Quản lý tài liệu
  <image src="image/list_docs.png">
  <image src="image/add_docs.png">

- Quản lý sinh viên
  <image src="image/list_student.png">
  <image src="image/add_student.png">
  <image src="image/edit_student.png">

- Quản lý yêu cầu
  <image src="image/yeu_cau.png">

### Giao diện người dùng

- Giao diện đăng nhập
  <image src="image/login.png">

- Giao diện trang chủ
  <image src="image/home_1.png">
  <image src="image/home_2.png">
  <image src="image/home_3.png">

- Giao diện thông tin giới thiệu
  <image src="image/info.png">

- Giao diện danh sách thủ tục
  <image src="image/danh_sach_thu_tuc.png">

- Giao diện nộp thủ tục
  <image src="image/nop_thu_tuc.png">

# Thông tin liên hệ

Nguyễn Chí Thọ - [@tho493](https://facebook.com/tho493) - chitho040903@gmail.com - Leader
<br>
Tăng Quang Nghĩa - [@nghiahd147](https://github.com/nghiahd147) - Co-Leader

Project Link: [https://github.com/tho493/student-enrollment.git](https://github.com/tho493/student-enrollment.git)

# Notes

Chương trình là bài tập của môn đồ án. Mục đích nghiên cứu
