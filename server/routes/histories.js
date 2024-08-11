const express = require("express");

const cartController = require("../controllers/history");
const authorize = require("../middleware/author");

const router = express.Router();

router.get("/histories", authorize, cartController.getHistoryByUserId);

router.get("/histories/:id", authorize, cartController.getHistoryDetail);

router.get("/histories-all", authorize, cartController.getHistoryAll);

module.exports = router;
