const express = require("express");

const productsController = require("../controllers/products");
const authorize = require("../middleware/author");
const router = express.Router();

router.get("/products", authorize, productsController.getProducts);

router.get("/products/:id", authorize, productsController.getDetailProduct);

router.get("/products-pagination", authorize, productsController.getPaging);
module.exports = router;
