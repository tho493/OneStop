const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { connectDB } = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const documentRoutes = require('./routes/documentRoutes');
const authRoutes = require('./routes/authRoutes');
const yeu_cau = require('./routes/yeu_cauRoutes');
const loai_yeu_cau = require('./routes/loai_yeu_cauRoutes');
const admin = require('./routes/adminRoutes')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
connectDB();

// Middleware log
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/api/students', studentRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/loai-yeu-cau', loai_yeu_cau);
app.use('/api/yeu-cau', yeu_cau);
app.use('/admin', admin)
app.use('/api', authRoutes)

app.use((req, res, next) => {
    res.status(404).send({message: "Địa chỉ không tồn tại"})
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});