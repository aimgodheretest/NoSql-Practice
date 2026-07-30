require("dotenv").config();
const mongoDB = require("mongodb");
const MongoClient = mongoDB.MongoClient;

const mongoDbConnection = (callback) => {
  MongoClient.connect(process.env.MONGO_URI)
    .then((client) => {
      console.log("MongoDB Connected.");
      callback(client);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = mongoDbConnection;
