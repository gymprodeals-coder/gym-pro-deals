const express = require('express');
const router = express.Router();
const redirectController = require('../controllers/redirectController');

router.get('/:id/:store', redirectController.redirectStore);

module.exports = router;
