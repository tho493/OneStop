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
    student_id INT PRIMARY KEY,
    full_name NVARCHAR(100),
    date_of_birth DATE ,
    address NVARCHAR(255),
    phone_number NVARCHAR(15),
    email NVARCHAR(100) UNIQUE,
    password NVARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE() 
);

-- Tạo bảng Documents
CREATE TABLE Documents (
    document_id INT PRIMARY KEY IDENTITY(1,1),
    document_type NVARCHAR(100) NOT NULL,
		file_name NVARCHAR(255) NOT NULL,
    file_path NVARCHAR(255) NOT NULL,
    uploaded_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Loai_yeu_cau (
		loai_yeu_cau_id INT PRIMARY KEY IDENTITY(1,1),
		ten_loai NVARCHAR(200),
		document_id INT
)

CREATE TABLE Yeu_cau (
		yeu_cau_id INT PRIMARY KEY IDENTITY(1,1),
		loai_yeu_cau_id INT NOT NULL,
		student_id INT,
		message NVARCHAR(MAX),
		status NVARCHAR(20) CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
		FOREIGN KEY (loai_yeu_cau_id) REFERENCES Loai_yeu_cau(loai_yeu_cau_id),
		FOREIGN KEY (student_id) REFERENCES Students(student_id)
)

-- Tạo bảng Notifications
CREATE TABLE Notifications (
    notification_id INT PRIMARY KEY IDENTITY(1,1),
    student_id INT NOT NULL,
    message NVARCHAR(MAX) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);