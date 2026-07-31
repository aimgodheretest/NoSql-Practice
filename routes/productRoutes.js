const express = require("express");
const router = express.Router();
const {
  postAddProduct,
  getAllProducts,
  getProductById,
} = require("../controllers/product.controller.js");

router.post("/products", postAddProduct);
router.get("/products", getAllProducts);
router.get("/products/:productId", getProductById);

module.exports = router;
