const { sql } = require('../config/db');
const jwt = require('jsonwebtoken');
let jwt_secret = process.env.JWT_SECRET || "tho493";

const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
    try {
        let result = await sql.query(`SELECT * FROM Admin WHERE username = '${username}'`);

        if (result.recordset.length > 0) {
            // Admin tồn tại
            const user = result.recordset[0];
            if (password !== user.password) {
                return res.status(401).send({ message: 'Mật khẩu không chính xác' });
            }

            const token = jwt.sign({ id: user.username, email: user.email, type: "admin" }, jwt_secret, { expiresIn: '1h' });

            return res.json({ token, type: "admin" });
        }

        result = await sql.query(`SELECT * FROM Students WHERE username = '${username}'`);

        if (result.recordset.length === 0) {
            return res.status(404).send({ message: 'Tài khoản không tồn tại' });
        }

        const user = result.recordset[0];
        if (password !== user.password) {
            return res.status(401).send({ message: 'Mật khẩu không chính xác' });
        }

        const token = jwt.sign({ id: user.student_id, email: user.email, type: "user" }, jwt_secret, { expiresIn: '1h' });

        res.json({ token, type: "user" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


module.exports = { login };