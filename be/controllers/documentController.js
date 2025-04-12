const { sql } = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

        const document_name = req.body.document_name;

        const file = req.file;

        if (!document_name) {
            return res.status(400).send('Không có tên tài liệu')
        }

        if (!file) {
            return res.status(400).send('Không có file nào được tải lên');
        }

        try {
            const result = await sql.query`
                INSERT INTO Documents (file_name, file_path)
                OUTPUT INSERTED.document_id
                VALUES (${document_name}, ${file.path})`;

            const documentId = result.recordset[0].document_id;
            res.status(201).json({ message: 'Tài liệu được tải lên thành công', document_id: documentId });
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

module.exports = { uploadDocument, downloadDocument, getDocumentById, getAllDocuments, deleteDocument };