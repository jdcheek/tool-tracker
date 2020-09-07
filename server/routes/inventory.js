const express = require("express");
const router = express.Router();
let Inventory = require("../models/inventory.model");

router.get("/", (req, res) => {
  Inventory.find()
    .then((inventory) => res.json(inventory))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/add", (req, res) => {
  const username = req.body.username;
  const description = req.body.description;

  const newInventory = new Inventory({
    username,
    description,
  });

  newInventory
    .save()
    .then(() => res.json("Inventory added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
