const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../controllers/authController');

router.post('/login', adminController.login);
router.post('/setup', adminController.setup);
router.get('/dashboard', auth, adminController.dashboard);
router.get('/verify', auth, adminController.verify);

module.exports = router;
