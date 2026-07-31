const Product = require("../models/product.js");

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);

  const { title, price, description, productUrl } = req.body;

  const product = new Product(title, price, description, productUrl);
  product
    .save()
    .then(() => {
      res.json({ message: "Product Created" });
      return;
    })
    .catch((err) => {
      console.log(err);
    });
};
