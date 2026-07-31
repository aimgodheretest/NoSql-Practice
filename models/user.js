const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/db");

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  static findbyId(userId) {
    const db = getDb();
    return db.collection("users").findone({
      _id: new ObjectId(userId),
    });
  }
}

module.exports = User;
