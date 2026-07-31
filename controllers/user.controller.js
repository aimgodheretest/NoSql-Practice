const User = require("../models/user.js");

exports.createUser = (req, res, next) => {
  const { username, email } = req.body;

  const user = new User(username, email);

  user
    .save()
    .then(() => {
      res.json({ message: "User Created" });
      return;
    })
    .catch((err) => {
      console.log(err);
    });
};
