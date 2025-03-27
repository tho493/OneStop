const express = require('express');
const { getApplications, createApplication, getApplicationById, getTotalApplications, getPendingApplicationsCount, getApprovedApplicationsCount, getRejectedApplicationsCount } = require('../controllers/applicationController');
const authenticateToken  = require('../middleware/auth')

const router = express.Router();

router.get('/',authenticateToken , getApplications);
router.post('/', authenticateToken, createApplication);
router.get('/get/:id', authenticateToken, getApplicationById)
router.get('/getTotalCount', getTotalApplications);
router.get('/getPendingCount', getPendingApplicationsCount);
router.get('/getApprovedCount', getApprovedApplicationsCount);
router.get('/getRejectCount', getRejectedApplicationsCount)

module.exports = router;