const express = require("express");
const router = express.Router();
const {
  postAddProduct,
  getAllProducts,
} = require("../controllers/product.controller.js");

router.post("/products", postAddProduct);
router.get("/products", getAllProducts);

module.exports = router;
