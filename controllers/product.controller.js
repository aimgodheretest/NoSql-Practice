const Product = require("../models/product.js");

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);

  const { title, price, description, productUrl } = req.body;

  const product = new Product({
    title,
    price,
    description,
    productUrl,
  });

  product
    .save()
    .then(() => {
      res.status(201).json({
        message: "Product Created",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getAllProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getProductById = (req, res) => {
  Product.findById(req.params.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.json(product);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateProduct = (req, res) => {
  const productId = req.params.productId;

  Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        error: err.message,
      });
    });
};
exports.deleteProduct = (req, res) => {
  const productId = req.params.productId;

  Product.findByIdAndDelete(productId)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.status(200).json({
        message: "Product deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        error: err.message,
      });
    });
};
