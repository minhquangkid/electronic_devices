const express = require("express");

const cartController = require("../controllers/carts");
const authorize = require("../middleware/author");

const router = express.Router();

router.post("/carts/add", authorize, cartController.addCart);
router.get("/carts", authorize, cartController.getCart);
router.put("/carts/update", authorize, cartController.updateCart);
router.delete("/carts/delete", authorize, cartController.deleteItemCart);
module.exports = router;
