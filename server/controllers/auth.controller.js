const User = require("../models/user.model");
const authCtrl = {};

authCtrl.registerUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    newUser.password = await User.encryptPassword(newUser.password);
    await newUser.save();
    res.status(201).send({ created: true });
  } catch (error) {
    res.status(400).send({ error });
  }
};

authCtrl.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByCredentials(username, password);
    const token = await user.generateAuthToken();
    res.status(200)
    res.cookie('jwt', token, { maxAge: 60 * 60 * 1000, httpOnly: true, sameSite: true })
    res.send({ username: user.username })
  } catch (error) {
    res.status(400).send({ error });
  }
};

module.exports = authCtrl;