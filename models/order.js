const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/db.js");

class Order {
  constructor(userId, items) {
    this.userId = userId;
    this.items = items;
  }
  save() {
    const db = getDb();
    return db.collection("orders").insertOne(this);
  }
  static fetchByUserId(userId) {
    const db = getDb();
    return db
      .collection("orders")
      .find({
        userId: new ObjectId(userId),
      })
      .toArray();
  }
}

module.exports = Order;
