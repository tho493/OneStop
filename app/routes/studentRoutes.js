const express = require('express');
const { getStudents, createStudent, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentController');
const authenticateToken  = require('../middleware/auth')


const router = express.Router();

router.get('/', authenticateToken, getStudents);
router.post('/', authenticateToken, createStudent);
router.get('/get/:id', authenticateToken, getStudentById);
router.post('/update/:id', authenticateToken, updateStudent);
router.get('/delete/:id', authenticateToken, deleteStudent);

module.exports = router;