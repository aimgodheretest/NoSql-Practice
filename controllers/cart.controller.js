const User = require("../models/user.js");

exports.addToCart = (req, res, next) => {
  const { userId, productId } = req.body;

  User.findById(userId)
    .then((user) => {
      return user.addToCart(productId);
    })
    .then(() => {
      res.status(200).json({ message: "Product added to cart" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
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
        .then(user => {
            return user.removeFromCart(productId);
        })
        .then(() => {
            res.status(200).json({
                message: "Product removed successfully"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err.message
            });
        });
};