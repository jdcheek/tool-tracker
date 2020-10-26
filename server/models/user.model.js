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
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    } else {
      console.log('Wrong password');
      throw new Error("Invalid Credentials");
    }
  } else {
    console.log('No user');
    throw new Error({ error: "User not found" });
  }
};

userSchema.statics.encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.generateAuthToken = async function () {
  user = this;

  const token = jwt.sign(
    { _id: user._id.toString(), username: user.username, isAdmin: user.isAdmin },
    process.env.AUTHTOKENSTRING, { expiresIn: '86400s' }
  );
  // user.tokens = await user.tokens.concat({ token });
  // try {
  //   await User.findOneAndUpdate({ _id: user._id }, { $set: { tokens: user.tokens } });
  // } catch (error) {
  //   throw new Error(error);
  // }
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
