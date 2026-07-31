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
    return db.collection("product")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err); 
      });
  }
}
module.exports = Product;
