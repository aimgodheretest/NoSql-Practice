const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/db");
const Product = require("./product");
const Order = require("./order");
class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart || {
      items: [],
    };
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({
        _id: new ObjectId(userId),
      })
      .then((user) => {
        if (!user) return null;
        return new User(user.name, user.email, user.cart, user._id);
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

  getCart() {
    const productIds = this.cart.items.map((item) => {
      return item.productId;
    });
    return Product.fetchAllByIds(productIds);
  }

  removeFromCart(productId) {
    const db = getDb();

    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });

    return db.collection("users").updateOne(
      { _id: this._id },
      {
        $set: {
          "cart.items": updatedCartItems,
        },
      },
    );
  }

  addOrder() {
    const db = getDb();
    const order = new Order(this._id, this.cart.items);

    return order.save().then(() => {
      db.collection("orders").updateOne(
        {
          _id: this._id,
        },
        {
          $set: {
            "cart.items": [],
          },
        },
      );
    });
  }
}

module.exports = User;
