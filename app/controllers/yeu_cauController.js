const { sql } = require('../config/db')

// Lấy danh sách yêu cầu
const getYeuCau = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Yeu_cau`;
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Lấy yêu cầu theo ID
const getYeuCauById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql.query`SELECT * FROM Yeu_cau WHERE yeu_cau_id = ${id}`;
        if (result.recordset.length === 0) {
            return res.status(404).send('Yêu cầu không tìm thấy');
        }
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Tạo yêu cầu mới
const createYeuCau = async (req, res) => {
    const { loai_yeu_cau_id, student_id, status, message } = req.body;
    try {
        const result = await sql.query`
            INSERT INTO Yeu_cau (loai_yeu_cau_id, student_id, status, message)
            OUTPUT INSERTED.yeu_cau_id
            VALUES (${loai_yeu_cau_id}, ${student_id}, ${status}, ${message})`;

            const yeu_cau_id = result.recordset[0].yeu_cau_id;
        res.status(201).json({ message: 'Yêu cầu được tạo thành công', yeu_cau_id });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Cập nhật yêu cầu
const updateYeuCau = async (req, res) => {
    const { id } = req.params;
    const { loai_yeu_cau_id, student_id, status, message } = req.body;
    try {
        const result = await sql.query`
            UPDATE Yeu_cau 
            SET loai_yeu_cau_id = ${loai_yeu_cau_id}, 
                student_id = ${student_id}, 
                status = ${status},
                message = ${message}, 
                updated_at = GETDATE() 
            WHERE yeu_cau_id = ${id}`;

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Yêu cầu không tìm thấy');
        }
        res.json({ message: 'Yêu cầu đã được cập nhật thành công' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Xóa yêu cầu
const deleteYeuCau = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql.query`DELETE FROM Yeu_cau WHERE yeu_cau_id = ${id}`;
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Yêu cầu không tìm thấy');
        }
        res.json({ message: 'Yêu cầu đã được xóa thành công' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { getYeuCau, getYeuCauById, createYeuCau, updateYeuCau, deleteYeuCau };