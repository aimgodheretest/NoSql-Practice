const express = require("express");
const router = express.Router();
const { postAddProduct } = require("../controllers/product.controller.js");

router.post("/products", postAddProduct);

module.exports = router;
