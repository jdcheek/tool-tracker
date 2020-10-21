const express = require("express");
const router = express.Router();
const Inventory = require("../models/inventory.model");

router.get("/", (req, res) => {
  Inventory.find()
    .then((inventory) => res.json(inventory))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  const tool_number = req.body.tool_number;
  const description = req.body.description;
  const location = req.body.location;
  const status = req.body.status;

  const newInventory = new Inventory({
    tool_number,
    description,
    location,
    status,
  });

  newInventory
    .save()
    .then(() => res.json("Inventory added."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
  Inventory.findById(req.params.id)
    .then((inventory) => res.json(inventory))
    .catch((err) => res.status(400).json("Error " + err));
});

router.delete("/:id", (req, res) => {
  Inventory.findByIdAndDelete(req.params.id)
    .then(() => res.json("Item deleted."))
    .catch((err) => res.status(400).json("Error " + err));
});

router.post("/update/:id", (req, res) => {
  Inventory.findById(req.params.id)
    .then((inventory) => {
      inventory.tool_number = req.body.tool_number;
      inventory.description = req.body.description;
      inventory.location = req.body.location;
      inventory.status = req.body.status;

      inventory
        .save()
        .then(() => res.json("Item updated."))
        .catch((err) => res.status(400).json("Error " + err));
    })
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
