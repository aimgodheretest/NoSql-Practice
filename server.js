const express = require("express");
const { mongoDbConnection, getDb } = require("./utils/db.js");
const app = express();

mongoDbConnection(() => {
  app.listen(3000, () => {
    console.log(`Server Started...`);
  });
});
