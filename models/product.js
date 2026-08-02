const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/db.js");

class Product {
  constructor(title, price, description, productUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.productUrl = productUrl;
  }
  save() {
    const db = getDb();
    return db
      .collection("product")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("product").find().toArray();
  }

  static findById(productId) {
    const db = getDb();
    return db.collection("product").findOne({
      _id: new ObjectId(productId),
    });
  }

  static fetchAllByIds(productIds) {
    const db = getDb();
    return db
      .collection("product")
      .find({
        _id: {
          $in: productIds,
        },
      })
      .toArray();
  }

  static updateById(productId, productData) {
    const db = getDb();
    return db
      .collection("product")
      .updateOne({ _id: new ObjectId(productId) }, { $set: productData });
  }

  static deleteById(productId) {
    const db = getDb();
    return db.collection("product").deleteOne({ _id: new ObjectId(productId) });
  }
}
module.exports = Product;
