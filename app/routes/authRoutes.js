const express = require('express');
const { loginAdmin, loginUser } = require('../controllers/authController');
const authenticateToken = require('../middleware/auth')

const router = express.Router();

router.get('/authToken', authenticateToken)
router.post('/loginAdmin', loginAdmin);
router.post('/loginUser', loginUser);

module.exports = router;