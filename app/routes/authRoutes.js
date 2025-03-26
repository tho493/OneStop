const express = require('express');
const { login } = require('../controllers/authController');
const authenticateToken = require('../middleware/auth')

const router = express.Router();

router.get('/authToken', authenticateToken)
router.post('/login', login);

module.exports = router;