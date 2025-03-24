const jwt = require('jsonwebtoken');
let jwt_secret = process.env.JWT_SECRET || "tho493";

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).send({ message: "Bạn chưa đăng nhập" });

    jwt.verify(token, jwt_secret, (err, user) => {
        if (err) {
            console.error("Token hết hạn hoặc không hợp lệ:", err.message);
            return res.status(403).send({ message: "Token không hợp lệ" });
        }

        // Gán thông tin người dùng vào req.user
        req.user = user;

        // Kiểm tra loại người dùng
        if (user.type === 'admin') {
            return res.status(200).send({ message: "Xác thực thành công với quyền người dùng", type: "admin" });
        } else if (user.type === 'user') {
            return res.status(200).send({ message: "Xác thực thành công với quyền người dùng", type: "user" });
        } else {
            // Nếu loại người dùng không hợp lệ
            return res.status(403).send({ message: "Loại người dùng không hợp lệ" });
        }
    });
};

module.exports = authenticateToken;