const express = require('express');
const router = express.Router();
const { getYeuCau, getYeuCauById, createYeuCau, updateYeuCau, deleteYeuCau, uploadYeuCau, downloadYeuCau, getTypeFromStudent, updateYeuCauStatus } = require('../controllers/yeu_cauController');
const authenticateToken  = require('../middleware/auth')
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadsDir = path.join(__dirname, '../uploads');

// Đảm bảo thư mục tồn tại
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true }); // recursive để đảm bảo tạo được cả path nếu cần
}

// Cấu hình storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage })

// ======================= Routes for Yeu_cau =======================
router.get('/', authenticateToken, getYeuCau); // Lấy danh sách yêu cầu
router.get('/:id', authenticateToken, getYeuCauById); // Lấy yêu cầu theo ID
router.get('/student-type/:student_id', authenticateToken, getTypeFromStudent); // Lấy yêu cầu theo ID
router.get("/download/:filename", downloadYeuCau) // download hồ sơ yêu cầu
router.post('/', authenticateToken, upload.single('fileStudent'), createYeuCau); // Sinh viên tạo yêu cầu mới
// router.post('/create', authenticateToken, createYeuCau);
router.put("/status/:id", authenticateToken, updateYeuCauStatus); // sửa trạng thái
router.post('/uploads/', upload.single('fileStudent') ,uploadYeuCau); //
// router.put('/:id', authenticateToken, upload.single('fileStudent'), updateYeuCau); // Cập nhật yêu cầu
router.delete('/:id', authenticateToken, deleteYeuCau); // Xóa yêu cầu

module.exports = router;