const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateHash = function (password) {
  return bcrypt.hash(password, 10);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
