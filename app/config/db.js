const sql = require('mssql');
require('dotenv').config();

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER || "localhost", // IP server sql
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true,
        port: 1433
    }
}

const connectDB = async () => {
    try {
        let pool = await sql.connect(sqlConfig);
        console.log('Kết nối cơ sở dữ liệu thành công');
        return pool;
    } catch (err) {
        console.error('Kết nối cơ sở dữ liệu thất bại: ', err.message);
        console.error('Chi tiết lỗi: ', err);
    }
};

module.exports = { connectDB, sql };