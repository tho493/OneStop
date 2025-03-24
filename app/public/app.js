const express = require('express');
const path = require('path');
const router = express.Router();

const adminRouter = require('./src/adm/router')
const userRouter = require('./src/user/router')
// const { getApplications, createApplication, getApplicationById, getNumberAll } = require('../controllers/applicationController');

router.use(express.static(path.join(__dirname, 'src')));

router.get('/', userRouter)
router.get('/admin', adminRouter)


module.exports = router;