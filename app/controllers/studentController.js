const { sql } = require('../config/db');

// Lấy danh sách sinh viên
const getStudents = async (req, res) => {
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
        const result = await sql.query(`SELECT * FROM Students WHERE student_id = '${id}'`);
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
    const { full_name, date_of_birth, address, phone_number, email, password } = req.body;
    try {
        const result = await sql.query(`
            INSERT INTO Students (full_name, date_of_birth, address, phone_number, email, password) 
            OUTPUT INSERTED.student_id
            VALUES ('${full_name}', '${date_of_birth}', '${address}', '${phone_number}', '${email}', '${password}')`);
        
        const studentId = result.recordset[0].student_id;
        res.status(201).json({ message: 'Sinh viên được tạo thành công', student_id: studentId });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { getStudents, createStudent, getStudentById };