const { sql } = require('../config/db');

// Lấy danh sách đơn ứng tuyển
const getApplications = async (req, res) => {
    try {
        const result = await sql.query(`SELECT * FROM Applications`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getNumberAll = async () => {
    try {
        const result = await sql.query(`SELECT COUNT(*) as count FROM Applications`);
        return JSON.stringify(result.recordset[0].count);
    } catch (error) {
        return "error";
    }
};



// Lấy đơn ứng tuyển theo ID
const getApplicationById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql.query(`SELECT * FROM Applications WHERE application_id = ${id}`);
        if (result.recordset.length === 0) {
            return res.status(404).send('Hồ sơ không tìm thấy');
        }
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Thêm đơn ứng tuyển mới
const createApplication = async (req, res) => {
    const { student_id, status } = req.body;
    try {
        await sql.query(`INSERT INTO Applications (student_id, status) VALUES (${student_id}, ${status})`);
        res.status(201).send('Hồ sơ được tạo thành công');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { getApplications, createApplication, getApplicationById, getNumberAll };