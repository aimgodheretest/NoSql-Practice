const express = require("express");
const mongoDbConnection = require("./utils/db.js");
const app = express();

mongoDbConnection((client) => {
  //   console.log(client);
  app.listen(3000, () => {
    console.log(`Server Started...`);
  });
});
