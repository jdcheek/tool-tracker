const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isAdmin: {
      required: true,
      default: false,

      type: Boolean,
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  console.log(user);
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    } else {
      throw new Error("Invalid Credentials");
    }
  } else {
    throw new Error({ error: "User not found" });
  }
};

userSchema.methods.encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.generateAuthToken = async function (user) {

  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.AUTHTOKENSTRING
  );
  user.tokens = await user.tokens.concat({ token });

  try {
    await User.findOneAndUpdate({ _id: user._id }, { tokens: user.tokens });
  } catch (error) {
    throw new Error(error);
  }
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
