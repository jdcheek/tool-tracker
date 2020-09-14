const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inventorySchema = new Schema(
  {
    tool_number: { type: String, required: true },
    description: { type: String, required: false },
    location: {
      shelf: { type: Number, required: true },
      bin: { type: String, required: true },
    },
    status: {
      checked_out: { type: Boolean, required: true },
      username: { type: String, required: false },
      date: { type: Date, required: false },
      missing: { type: Boolean, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;

// {lb}
// "{"tool_number"}":"{f1}",
// "{"location"}":{lb}{"shelf"}":"{f2}","{"bin"}":"{f3}{rb}
// "{"status"}":{lb}
// "{"checked_out"}":"{"false"}",
// "{"username"}":"{""}",
// "{"date"}":"{""}",
// "{"missing"}":"{"false"}"
// {rb}
// {rb}
