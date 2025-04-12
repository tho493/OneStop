const { sql } = require('../config/db');

// Lấy danh sách sinh viên
const getAllAdmin = async (req, res) => {
    try {
        const result = await sql.query(`SELECT * FROM Admin`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Lấy sinh viên theo ID
const getAdminById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql.query`SELECT * FROM Admin WHERE manager_id = ${id}`;
        if (result.recordset.length === 0) {
            return res.status(404).send('Tài khoản không tìm thấy');
        }
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Tạo sinh viên mới
const createAdmin = async (req, res) => {
    const { full_name, username, password } = req.body;
    try {
        const result = await sql.query`
            INSERT INTO Students (full_name, username, password) 
            OUTPUT INSERTED.manager_id
            VALUES (${full_name}, ${username}, ${password})`;
        const manager_id = result.recordset[0].manager_id;
        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Đã xảy ra lỗi.');
        }
        res.status(201).json({ message: 'Tài khoản admin được tạo thành công', manager_id });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Cập nhật sinh viên
const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { full_name, username, password } = req.body;
    try {
        const result = await sql.query`
            UPDATE Admin 
            SET full_name = ${full_name}, 
                username = ${username}, 
                password = ${password}, 
                updated_at = GETDATE() 
            WHERE manager_id = ${id}`;
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Admin không tìm thấy');
        }
        res.json({ message: 'Thông tin admin đã được cập nhật thành công' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Xóa sinh viên
const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql.query`DELETE FROM Admin WHERE manager_id = ${id}`;
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Admin không tìm thấy');
        }
        res.json({ message: 'Admin đã được xóa thành công' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { getAllAdmin, getAdminById, createAdmin, updateAdmin, deleteAdmin };