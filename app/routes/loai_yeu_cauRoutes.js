const express = require('express');
const router = express.Router();
const { getLoaiYeuCau, getLoaiYeuCauById, createLoaiYeuCau, updateLoaiYeuCau, deleteLoaiYeuCau } = require('../controllers/loai_yeu_cauController');
const authenticateToken  = require('../middleware/auth')

// ======================= Routes for Loai_yeu_cau =======================

router.get('/', authenticateToken, getLoaiYeuCau); // Lấy danh sách loại yêu cầu
router.get('/:id', authenticateToken, getLoaiYeuCauById); // Lấy loại yêu cầu theo ID
router.post('/', authenticateToken, createLoaiYeuCau); // Tạo loại yêu cầu mới
router.put('/:id', authenticateToken, updateLoaiYeuCau); // Cập nhật loại yêu cầu
router.delete('/:id', authenticateToken, deleteLoaiYeuCau); // Xóa loại yêu cầu

module.exports = router;