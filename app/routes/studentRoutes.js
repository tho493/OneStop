const express = require('express');
const { getStudents, createStudent, getStudentById } = require('../controllers/studentController');
const authenticateToken  = require('../middleware/auth')


const router = express.Router();

router.get('/', authenticateToken, getStudents);
router.post('/', authenticateToken, createStudent);
router.get('/get/:id', authenticateToken, getStudentById)

module.exports = router;