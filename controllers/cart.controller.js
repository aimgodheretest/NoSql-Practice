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
