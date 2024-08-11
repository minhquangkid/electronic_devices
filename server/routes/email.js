const express = require("express");

const cartController = require("../controllers/email");
const authorize = require("../middleware/author");
const router = express.Router();

router.post("/email", authorize, cartController.postEmail);

module.exports = router;
