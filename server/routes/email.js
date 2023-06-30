const express = require('express');

const cartController = require('../controllers/email');

const router = express.Router();

router.post('/email', cartController.postEmail);

module.exports = router;