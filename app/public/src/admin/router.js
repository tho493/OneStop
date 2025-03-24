const express = require('express');
const path = require('path');
const router = express.Router();

const { getTotalApplications, getPendingApplicationsCount, getApprovedApplicationsCount } = require('../../../controllers/applicationController');



router.get('/', async (req, res) => {
    const totalApplications = await getTotalApplications();
    const pendingApplicationsCount = await getPendingApplicationsCount();
    const approvedApplicationsCount = await getApprovedApplicationsCount();
    res.render(path.join(__dirname, 'pages', 'index.ejs'), { totalApplications, pendingApplicationsCount, approvedApplicationsCount });
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'login.html'));
});

module.exports = router;