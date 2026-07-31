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
exports.getAllProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.message });
    });
};
