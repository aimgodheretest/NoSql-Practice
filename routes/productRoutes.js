const express = require("express");
const router = express.Router();
const {
  postAddProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller.js");

router.post("/products", postAddProduct);
router.get("/products", getAllProducts);
router.get("/products/:productId", getProductById);
router.put("/products/:productId", updateProduct);
router.delete("/products/:productId", deleteProduct);

module.exports = router;
