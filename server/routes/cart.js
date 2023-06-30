const express = require('express');

const cartController = require('../controllers/carts');

const router = express.Router();

router.post('/carts/add', cartController.addCart);
router.get('/carts', cartController.getCart);
router.put('/carts/update', cartController.updateCart);
router.delete('/carts/delete', cartController.deleteItemCart);
module.exports = router;