const mongoose = require("mongoose");
const Order = require("./order");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

/*
addToCart Mongoose Instance Method
*/
userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((item) => {
    return item.productId.toString() === product._id.toString();
  });

  let updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    updatedCartItems[cartProductIndex].quantity += 1;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: 1,
    });
  }

  this.cart.items = updatedCartItems;

  return this.save();
};

/*
getCart Mongoose Instance Method
*/
userSchema.methods.getCart = function () {
  return this.populate("cart.items.productId").then((user) => {
    return user.cart.items.map((item) => {
      return {
        ...item.productId._doc,
        quantity: item.quantity,
      };
    });
  });
};

/*
removeFromCart Mongoose Instance Method
*/
userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });

  this.cart.items = updatedCartItems;

  return this.save();
};
/*
addOrder Mongoose Instance Method

*/
userSchema.methods.addOrder = function () {
  return this.populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((item) => {
        return {
          quantity: item.quantity,
          product: {
            ...item.productId._doc,
          },
        };
      });

      const order = new Order({
        user: this._id,
        items: products,
      });

      return order.save();
    })
    .then(() => {
      this.cart.items = [];
      return this.save();
    });
};

module.exports = mongoose.model("User", userSchema);
