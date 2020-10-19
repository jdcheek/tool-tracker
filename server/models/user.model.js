const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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
      type: Boolean,
    },
    tokens: [
      {
        token: {
          type: String,
          require: true,
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

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.AUTHTOKENSTRING
  );
  user.tokens = user.tokens.concat({ token });

  try {
    await user.save();
  } catch (error) {
    throw new Error(error);
  }

  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  return userObject.tokens;
};

const User = model("User", userSchema);

module.exports = User;
