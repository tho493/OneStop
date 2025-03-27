const express = require('express');
const { uploadDocument, downloadDocument, getDocumentById, getAllDocuments, updateDocument, deleteDocument } = require('../controllers/documentController');
const authenticateToken  = require('../middleware/auth')

const router = express.Router();

router.post('/upload/',authenticateToken, uploadDocument);
router.get('/download/:id',authenticateToken, downloadDocument);
router.get('/',authenticateToken, getAllDocuments);
router.get('/:id',authenticateToken, getDocumentById);
router.post('/update/:id',authenticateToken, updateDocument);
router.delete('/:id',authenticateToken, deleteDocument);

module.exports = router;