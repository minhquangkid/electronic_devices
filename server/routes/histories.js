const express = require("express");

const cartController = require("../controllers/history");

const router = express.Router();

router.get("/histories", cartController.getHistoryByUserId);

router.get("/histories/:id", cartController.getHistoryDetail);

module.exports = router;
