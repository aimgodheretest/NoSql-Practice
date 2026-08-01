const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cart.controller");

router.post("/cart", addToCart);
router.get("/cart/:userId", getCart);
router.delete("/cart/:userId/:productId", removeFromCart);

module.exports = router;
