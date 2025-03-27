const { sql } = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs')

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('document');

const uploadDocument = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        const { application_id, document_type } = req.body;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).send('Không có file nào được tải lên');
        }

        try {
            const promises = files.map(file => {
                return sql.query`
                    INSERT INTO Documents (application_id, document_type, file_path)
                    VALUES (${application_id}, ${document_type}, ${file.path})`;
            });

            await Promise.all(promises);
            res.status(201).send('Tài liệu được tải lên thành công');
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
};

const downloadDocument = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql.query`SELECT * FROM Documents WHERE document_id = ${id}`;
        
        if (result.recordset.length === 0) {
            return res.status(404).send('Tài liệu không tìm thấy');
        }

        const document = result.recordset[0];
        const filePath = document.file_path;

        if (!fs.existsSync(filePath)) {
            return res.status(404).send('File không tồn tại');
        }

        res.download(filePath, path.basename(filePath), (err) => {
            if (err) {
                console.error("Lỗi khi tải file:", err.message);
                res.status(500).send('Lỗi khi tải file');
            }
        });
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

const getDocumentById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql.query`SELECT * FROM Documents WHERE document_id = ${id}`;
        if (result.recordset.length === 0) {
            return res.status(404).send('Tài liệu không tìm thấy');
        }
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateDocument = async (req, res) => {
    const { id } = req.params;
    const { document_type } = req.body;
    const file_path = req.file ? req.file.path : null;

    try {
        const updateQuery = `
            UPDATE Documents 
            SET document_type = ${document_type}, 
                file_path = ${file_path ? file_path : 'file_path'} 
            WHERE document_id = ${id}`;

        const result = await sql.query(updateQuery);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Tài liệu không tìm thấy');
        }
        res.json({ message: 'Tài liệu đã được cập nhật thành công' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteDocument = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql.query`DELETE FROM Documents WHERE document_id = ${id}`;
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Tài liệu không tìm thấy');
        }
        res.json({ message: 'Tài liệu đã được xóa thành công' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { uploadDocument, downloadDocument, getDocumentById, getAllDocuments, updateDocument, deleteDocument };