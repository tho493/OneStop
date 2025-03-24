const express = require('express');
const path = require('path');
const router = express.Router();

// const { getNumberAll } = require('../../../../controllers/applicationController');

router.get('/', async (req, res) => {
    res.send("User web");
});

module.exports = router;