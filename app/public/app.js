const express = require('express');
const path = require('path');
const router = express.Router();

const adminRouter = require('./src/admin/router')
const userRouter = require('./src/user/router')
// const { getApplications, createApplication, getApplicationById, getNumberAll } = require('../controllers/applicationController');

router.use(express.static(path.join(__dirname, 'src')));

router.use('/', userRouter)
router.use('/admin', adminRouter)


module.exports = router;