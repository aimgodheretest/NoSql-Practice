const User = require("../models/user");
const Order = require("../models/order");

exports.postOrder = (req, res, next) => {
  const { userId } = req.body;

  User.findById(userId)
    .then((user) => {
      return user.addOrder();
    })
    .then(() => {
      res.status(200).json({
        message: "Order placed successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
};
exports.getOrders = (req, res) => {
  const userId = req.params.userId;

  Order.find({ user: userId })
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        error: err.message,
      });
    });
};
