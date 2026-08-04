const User = require("../models/user");

exports.createUser = (req, res, next) => {
  const { username, email } = req.body;

  const user = new User({
    name: username,
    email: email,
    cart: {
      items: [],
    },
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User created successfully",
        user: result,
      });
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        error: err.message,
      });
    });
};
