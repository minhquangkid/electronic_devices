const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/users/login', authController.postLogin);

router.post('/users/signup', authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;