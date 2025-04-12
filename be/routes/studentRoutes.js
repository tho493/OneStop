const express = require('express');
const { getAllStudents, createStudent, getStudentById, updateStudent, deleteStudent, getStudentByMsv } = require('../controllers/studentController');
const authenticateToken  = require('../middleware/auth')

const router = express.Router();

// ======================= Routes for students =======================

router.get('/', authenticateToken, getAllStudents); // Lấy toàn bộ danh sách
router.get('/:id', authenticateToken, getStudentById); // Lấy thông tin theo ID
router.post('/', authenticateToken, createStudent); // Tạo mới
router.put('/:id', authenticateToken, updateStudent); // Cập nhật
router.delete('/:id', authenticateToken, deleteStudent); // Xóa

module.exports = router;