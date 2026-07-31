require("dotenv").config();
const mongoDB = require("mongodb");
const MongoClient = mongoDB.MongoClient;

let db;

const mongoDbConnection = (callback) => {
  MongoClient.connect(process.env.MONGO_URI)
    .then((client) => {
      console.log("MongoDB Connected.");
      db = client.db();
      callback();
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
const getDb = () => {
  if (db) {
    return db;
  }
  throw "No Db Found!";
};

module.exports = { mongoDbConnection, getDb };
