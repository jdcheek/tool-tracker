const User = require("../models/user.model");
const userCtrl = {};

userCtrl.userLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.updateOne();

    res.status(200).send("logged out");
  } catch (error) {
    res.status(500).send(error);
  }
};

userCtrl.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users)
  } catch (error) {
    res.status(400).send({ error });
  }
};

module.exports = userCtrl;
