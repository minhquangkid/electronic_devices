const express = require('express');

const cartController = require('../controllers/carts');

const router = express.Router();

router.post('/carts/add', cartController.addCart);

module.exports = router;