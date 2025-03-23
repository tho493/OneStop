CREATE DATABASE StudentEnrollment;

USE StudentEnrollment;

-- Tạo bảng Admin
CREATE TABLE Admin(
manager_id INT PRIMARY KEY IDENTITY(1,1),
full_name NVARCHAR(255) NOT NULL,
username NVARCHAR(255) NOT NULL,
password NVARCHAR(255) NOT NULL,
created_at DATETIME DEFAULT GETDATE(),
updated_at DATETIME DEFAULT GETDATE()
)

-- Tạo bảng Students
CREATE TABLE Students (
    student_id INT PRIMARY KEY IDENTITY(1,1),
    full_name NVARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    address NVARCHAR(255),
    phone_number NVARCHAR(15),
    email NVARCHAR(100) UNIQUE NOT NULL,
    password NVARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE() 
);

-- Tạo bảng Applications
CREATE TABLE Applications (
    application_id INT PRIMARY KEY IDENTITY(1,1),
    student_id INT NOT NULL,
    submission_date DATETIME DEFAULT GETDATE(),
    status NVARCHAR(20) CHECK (status IN ('pending', 'approved', 'rejected')) NOT NULL,
    reviewed_at DATETIME,
    FOREIGN KEY (student_id) REFERENCES Students(student_id) -- Đặt khóa ngoại ở đây
);

-- Tạo bảng Documents
CREATE TABLE Documents (
    document_id INT PRIMARY KEY IDENTITY(1,1),
    application_id INT NOT NULL,
    document_type NVARCHAR(100) NOT NULL,
    file_path NVARCHAR(255) NOT NULL,
    uploaded_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (application_id) REFERENCES Applications(application_id) -- Đặt khóa ngoại ở đây
);

-- Tạo bảng Notifications
CREATE TABLE Notifications (
    notification_id INT PRIMARY KEY IDENTITY(1,1),
    student_id INT NOT NULL,
    message NVARCHAR(MAX) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (student_id) REFERENCES Students(student_id) -- Đặt khóa ngoại ở đây
);