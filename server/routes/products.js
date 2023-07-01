const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

router.get("/products", productsController.getProducts);

router.get("/products/:id", productsController.getDetailProduct);

router.get("/products-pagination", productsController.getPaging);
module.exports = router;
