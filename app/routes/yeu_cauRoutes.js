const express = require('express');
const router = express.Router();
const { getYeuCau, getYeuCauById, createYeuCau, updateYeuCau, deleteYeuCau } = require('../controllers/yeu_cauController');
const authenticateToken  = require('../middleware/auth')

// ======================= Routes for Yeu_cau =======================
router.get('/', authenticateToken, getYeuCau); // Lấy danh sách yêu cầu
router.get('/:id', authenticateToken, getYeuCauById); // Lấy yêu cầu theo ID
router.post('/', authenticateToken, createYeuCau); // Tạo yêu cầu mới
router.put('/:id', authenticateToken, updateYeuCau); // Cập nhật yêu cầu
router.delete('/:id', authenticateToken, deleteYeuCau); // Xóa yêu cầu

module.exports = router;