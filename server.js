const express = require("express");
const { mongoDbConnection, getDb } = require("./utils/db.js");
const app = express();
const productRoutes = require("./routes/productRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

app.use(express.json());
app.use("/", userRoutes);
app.use("/", productRoutes);

mongoDbConnection(() => {
  app.listen(3000, () => {
    console.log(`Server Started...`);
  });
});
