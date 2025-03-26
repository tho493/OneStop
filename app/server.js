const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { connectDB } = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const documentRoutes = require('./routes/documentRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
connectDB();

// Middleware static
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'public'))

// Middleware log
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/api/students', studentRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api', authRoutes)

app.use((req, res, next) => {
    res.status(404).send({message: "Địa chỉ không tồn tại"})
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});