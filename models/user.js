const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/db");

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
    this.cart = {
      items: [],
    };
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  static findById(userId) {
    const db = getDb();
    return db.collection("users").findOne({
      _id: new ObjectId(userId),
    });
  }

  addToCart(productId) {
    const db = getDb();
    return User.findById(this._id).then((user) => {
      const cartItems = user.cart.items;

      const productIndex = cartItems.findIndex((item) => {
        return item.productId.toString() === productId.toString();
      });

      let updatedCartItems = [...cartItems];
      if (productIndex >= 0) {
        updatedCartItems[productIndex].quantity++;
      } else {
        updatedCartItems.push({
          productId: new ObjectId(productId),
          quantity: 1,
        });
      }
      return db
        .collection("users")
        .updateOne(
          { _id: this._id },
          { $set: { "cart.items": updatedCartItems } },
        );
    });
  }
}

module.exports = User;
