const mongoose = require("mongoose");

const mongoDbConnection = () => {
  return mongoose.connect(process.env.MONGO_URI);
};

module.exports = mongoDbConnection;
