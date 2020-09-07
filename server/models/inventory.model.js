const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inventorySchema = new Schema(
  {
    username: {
      username: { type: String, required: true },
      description: { type: String, required: false },
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
