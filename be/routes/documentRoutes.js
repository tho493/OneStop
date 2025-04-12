const express = require('express');
const { uploadDocument, downloadDocument, getDocumentById, getAllDocuments, deleteDocument } = require('../controllers/documentController');
const authenticateToken  = require('../middleware/auth')

const router = express.Router();

// ======================= Routes for document =======================
router.get('/',authenticateToken, getAllDocuments);
router.get('/:id',authenticateToken, getDocumentById);
router.get('/download/:id', downloadDocument);
router.post('/upload/',authenticateToken, uploadDocument);
router.delete('/:id',authenticateToken, deleteDocument);

module.exports = router;