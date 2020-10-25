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
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send({ error });
  }
};

userCtrl.updateUser = async (req, res) => {
  const updateUser = {}
  updateUser.username = req.body.username
  updateUser.isAdmin = req.body.isAdmin
  if (req.body.password !== "") {
    updateUser.password = await User.encryptPassword(req.body.password)
  }
  try {
    await User.findOneAndUpdate({ _id: req.params.id }, { $set: updateUser }, { new: true })
    res.status(200).send({ message: "User updated" })
  } catch (error) {
    res.status(400).send({ error });
  }
};

userCtrl.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send({ message: "User deleted" })
  } catch (error) {
    res.status(400).send({ error });
  }
};

userCtrl.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user)
  } catch (error) {
    res.status(400).send({ error });
  }
};



module.exports = userCtrl;
