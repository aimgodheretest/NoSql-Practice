const mongoose = require("mongoose");

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
Mongoose Instance Method
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
Mongoose Instance Method
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
Mongoose Instance Method
*/
userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });

  this.cart.items = updatedCartItems;

  return this.save();
};

module.exports = mongoose.model("User", userSchema);
