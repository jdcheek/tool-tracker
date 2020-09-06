const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const toolsSchema = new Schema(
  {
    username: {
      username: { type: String, required: true },
      description: { type: String, required: false },
      location: { type: String, required: true },
      date: { type: Date, required: true },
      out: { type: Boolean, required: true },
      missing: { type: Boolean, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Tools = mongoose.model("Tools", toolsSchema);

module.exports = Tools;