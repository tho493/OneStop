const { sql } = require('../config/db');

// Lấy danh sách loại yêu cầu
const getLoaiYeuCau = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Loai_yeu_cau`;
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Lấy loại yêu cầu theo ID
const getLoaiYeuCauById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql.query`SELECT * FROM Loai_yeu_cau WHERE loai_yeu_cau_id = ${id}`;
        if (result.recordset.length === 0) {
            return res.status(404).send('Loại yêu cầu không tìm thấy');
        }
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Tạo loại yêu cầu mới
const createLoaiYeuCau = async (req, res) => {
    const { ten_loai, document_id } = req.body;
    try {
        const result = await sql.query`
            INSERT INTO Loai_yeu_cau (ten_loai, document_id)
            OUTPUT INSERTED.loai_yeu_cau_id
            VALUES (${ten_loai}, ${document_id})`;

            const loai_yeu_cau_id = result.recordset[0].loai_yeu_cau_id;
        res.status(201).json({ message: 'Loại yêu cầu được tạo thành công', loai_yeu_cau_id });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Cập nhật loại yêu cầu
const updateLoaiYeuCau = async (req, res) => {
    const { id } = req.params;
    const { ten_loai, document_id } = req.body;
    try {
        const result = await sql.query`
            UPDATE Loai_yeu_cau 
            SET ten_loai = ${ten_loai}, document_id = ${document_id}
            WHERE loai_yeu_cau_id = ${id}`;
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Loại yêu cầu không tìm thấy');
        }
        res.json({ message: 'Loại yêu cầu đã được cập nhật thành công' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Xóa loại yêu cầu
const deleteLoaiYeuCau = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql.query`DELETE FROM Loai_yeu_cau WHERE loai_yeu_cau_id = ${id}`;
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Loại yêu cầu không tìm thấy');
        }
        res.json({ message: 'Loại yêu cầu đã được xóa thành công' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {getLoaiYeuCau, getLoaiYeuCauById, createLoaiYeuCau, updateLoaiYeuCau, deleteLoaiYeuCau};