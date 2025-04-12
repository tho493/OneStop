const express = require('express');
const  { getAllAdmin, createAdmin, getAdminById, updateAdmin, deleteAdmin } = require('../controllers/adminController');
const authenticateToken = require('../middleware/auth')

const router = express.Router();

// ======================= Routes for AuthRouter =======================

router.get('/', authenticateToken, getAllAdmin); // Lấy toàn bộ danh sách
router.get('/:id', authenticateToken, getAdminById); // Lấy thông tin theo ID
router.post('/', authenticateToken, createAdmin); // Tạo mới
router.put('/:id', authenticateToken, updateAdmin); // Cập nhật
router.delete('/:id', authenticateToken, deleteAdmin); // Xóa

module.exports = router;