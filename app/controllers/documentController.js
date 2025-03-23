const { sql } = require('../config/db');

// Thêm tài liệu
const uploadDocument = async (req, res) => {
    const { application_id, document_type, file_path } = req.body;
    try {
        await sql.query`
            INSERT INTO Documents (application_id, document_type, file_path)
            VALUES ('${application_id}', '${document_type}', '${file_path}')`;
        
        res.status(201).send('Tài liệu được tải lên thành công');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getAllDocuments = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Documents`;
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Lấy tài liệu theo ID
const getDocumentById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql.query`SELECT * FROM Documents WHERE document_id = '${id}'`;
        if (result.recordset.length === 0) {
            return res.status(404).send('Tài liệu không tìm thấy');
        }
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { uploadDocument, getDocumentById, getAllDocuments };