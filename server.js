const path = require("path");
const express = require("express");
const { mongoDbConnection, getDb } = require("./utils/db.js");
const app = express();
const productRoutes = require("./routes/productRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/products-page", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "products.html"));
});

app.get("/add-product", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "add-product.html"));
});

app.get("/cart-page", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "cart.html"));
});

app.get("/orders-page", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "orders.html"));
});

app.get("/admin-products", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "admin-products.html"));
});

app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", cartRoutes);
app.use("/", orderRoutes);

mongoDbConnection(() => {
  app.listen(3000, () => {
    console.log(`Server Started...`);
  });
});
