const express = require('express');
const { uploadDocument, getDocumentById, getAllDocuments } = require('../controllers/documentController');
const authenticateToken  = require('../middleware/auth')


const router = express.Router();
router.get('/', authenticateToken, getAllDocuments)
router.post('/', authenticateToken, uploadDocument);
router.get('/get/:id', authenticateToken, getDocumentById);

module.exports = router;