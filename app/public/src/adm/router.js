const express = require('express');
const path = require('path');
const router = express.Router();

// const { getNumberAll } = require('../../../controllers/applicationController');

// router.get('/', async (req, res) => {
//     const total = await getNumberAll();
//     res.render(path.join(__dirname, 'pages', 'index.ejs'), { total });
// });

// router.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'pages', 'login.html'));
// });

router.get('/', async (req, res) => {
    res.send("admin web");
});

module.exports = router;