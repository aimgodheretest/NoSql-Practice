const express = require("express");
const router = express.Router();

const { postOrder, getOrders } = require("../controllers/order.controller");

router.post("/orders", postOrder);
router.get("/orders/:userId", getOrders);

module.exports = router;
