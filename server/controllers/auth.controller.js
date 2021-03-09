const User = require("../models/user.model");
const authCtrl = {};

authCtrl.registerUser = async (req, res) => {
  const newUser = new User(req.body);
  const retypedPassword = req.body.retypedPassword;
  if (!req.body.username || !req.body.password) {
    res.status(400).send("Invalid Username or password");
    return;
  }
  if (newUser.username.length < 3) {
    res.status(400).send("Username must be greater than 3 characters");
    return;
  }
  if (newUser.password.length < 8) {
    res.status(400).send("Password must be greater than 8 characters");
    return;
  }
  if (newUser.password !== retypedPassword) {
    console.log(newUser.password, newUser.retypedPassword);
    res.status(400).send("Passwords do not match");
    return;
  }

  try {
    newUser.password = await User.encryptPassword(newUser.password);
    await newUser.save();
    res.status(201).send("User successfully created");
  } catch (error) {
    res.status(400).send("There was an issue with your request");
  }
};

authCtrl.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByCredentials(username, password);
    const token = await user.generateAuthToken();
    res.status(200);
    res.cookie("jwt", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: true,
    });
    res.send({
      isLoggedIn: true,
      username: user.username,
      isAdmin: user.isAdmin,
      toolsCheckedOut: user.toolsCheckedOut,
    });
  } catch (error) {
    res.status(400).send("There was an issue with your request");
  }
};

authCtrl.logOutUser = (req, res) => {
  try {
    res.clearCookie("jwt", {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: true,
    });
    res.send(`Logged out successfully`);
  } catch (error) {
    res.status(400).send({ error });
  }
};

authCtrl.getUserStatus = async (req, res) => {
  try {
    if (req.header("cookie")) {
      const token = await req.header("cookie").replace("jwt=", "");
      const user = await User.findByToken(token);
      if (user.message === "Unauthorized Access") {
        res.status(401).send(user.message);
      } else {
        res.status(200).send({
          isLoggedIn: true,
          isAdmin: user.isAdmin,
          username: user.username,
          id: user._id,
          toolsCheckedOut: user.toolsCheckedOut,
        });
      }
    } else {
      res.status(401).send("Unauthorized");
      return;
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = authCtrl;
