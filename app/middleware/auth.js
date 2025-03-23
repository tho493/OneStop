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
        // next();
        return res.status(200).send({ message: "Xác thực thành công"})
    });
};

module.exports = authenticateToken;