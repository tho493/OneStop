const express = require('express');
const path = require('path');
const router = express.Router();

router.use(express.static(path.join(__dirname, 'src')));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './src/pages/index.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './src/pages/login.html'));
});

module.exports = router;