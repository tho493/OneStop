const { sql } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let jwt_secret = process.env.JWT_SECRET || "tho493";

// Đăng nhập
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await sql.query(`SELECT * FROM Admin WHERE username = '${username}'`);
        if (result.recordset.length == 0) {
            return res.status(404).send({ message: 'Tài khoản không tồn tại' });
        }
        
        const user = result.recordset[0];
        // const match = await bcrypt.compare(password, user.password);
        
        if (password != user.password) {
            return res.status(401).send({ message: 'Mật khẩu không chính xác' });
        }
        
        const token = jwt.sign({ id: user.username, email: user.email }, jwt_secret, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { login };