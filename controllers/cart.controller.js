const User = require("../models/user");
const Product = require("../models/product");

exports.addToCart = (req, res) => {
  const { userId, productId } = req.body;

  User.findById(userId)
    .then((user) => {
      console.log(user);
      
      return Product.findById(productId).then((product) => {
        return user.addToCart(product);
      });
    })
    .then(() => {
      res.status(200).json({
        message: "Product added successfully",
      });
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        error: err.message,
      });
    });
};

exports.getCart = (req, res, next) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then((user) => {
      return user.getCart();
    })
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
};
exports.removeFromCart = (req, res, next) => {
  const { userId, productId } = req.params;

  User.findById(userId)
    .then((user) => {
      return user.removeFromCart(productId);
    })
    .then(() => {
      res.status(200).json({
        message: "Product removed successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
};
