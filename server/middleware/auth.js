const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const auth = async (req, res, next) => {
  try {
    const token = await req.header("cookie").replace("jwt=", "");
    const decoded = jwt.verify(token, process.env.AUTHTOKENSTRING);
    if (decoded) {
      const dbUser = await User.findById(decoded._id);
      if (dbUser.isAdmin) {
        next();
      } else {
        res.status(401).send({ message: "Unauthorized Access" });
      }
    } else {
      return res.status(401).send("Unauthorized");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = auth;
