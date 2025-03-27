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

        req.user = user;

        // Kiểm tra loại người dùng
        if (user.type === 'admin') {
            req.user.role = "admin";
        } else if (user.type === 'user') {
            req.user.role = "user";
        } else {
            return res.status(403).send({ message: "Loại người dùng không hợp lệ" });
        }

        next();

    });
};

module.exports = authenticateToken;