const { sql } = require('../config/db');

// Lấy danh sách sinh viên
const getAllStudents = async (req, res) => {
    try {
        const result = await sql.query(`SELECT * FROM Students`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Lấy sinh viên theo ID
const getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql.query`SELECT * FROM Students WHERE student_id = ${id}`;
        if (result.recordset.length === 0) {
            return res.status(404).send('Sinh viên không tìm thấy');
        }
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Tạo sinh viên mới
const createStudent = async (req, res) => {
    const {student_id, full_name, date_of_birth, address, phone_number, email, password } = req.body;
    try {
        const result = await sql.query`
            INSERT INTO Students (student_id, full_name, date_of_birth, address, phone_number, email, password) 
            VALUES (${student_id}, ${full_name}, ${date_of_birth}, ${address}, ${phone_number}, ${email}, ${password})`;
        // const studentId = result.recordset[0].student_id;
        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Đã xảy ra lỗi.');
        }
        res.status(201).json({ message: 'Sinh viên được tạo thành công', student_id });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Cập nhật sinh viên
const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { full_name, date_of_birth, address, phone_number, email, password } = req.body;
    try {
        const result = await sql.query`
            UPDATE Students 
            SET full_name = ${full_name}, 
                date_of_birth = ${date_of_birth}, 
                address = ${address}, 
                phone_number = ${phone_number}, 
                email = ${email}, 
                password = ${password}, 
                updated_at = GETDATE() 
            WHERE student_id = ${id}`;
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Sinh viên không tìm thấy');
        }
        res.json({ message: 'Thông tin sinh viên đã được cập nhật thành công' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Xóa sinh viên
const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql.query`DELETE FROM Students WHERE student_id = ${id}`;
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Sinh viên không tìm thấy');
        }
        res.json({ message: 'Sinh viên đã được xóa thành công' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { getAllStudents, createStudent, getStudentById, updateStudent, deleteStudent };