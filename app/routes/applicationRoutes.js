const express = require('express');
const { getApplications, createApplication, getApplicationById } = require('../controllers/applicationController');
const authenticateToken  = require('../middleware/auth')

const router = express.Router();

router.get('/',authenticateToken , getApplications);
router.post('/', authenticateToken, createApplication);
router.get('/get/:id', authenticateToken, getApplicationById)

module.exports = router;