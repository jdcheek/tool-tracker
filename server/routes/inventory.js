const router = require("express").Router();
let Inventory = require("../models/inventory.model");

router.route("/").get((req, res) => {
  Inventory.find()
    .then((inventory) => res.json(inventory))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const location = req.body.location;
  const date = Date.parse(req.body.date);
  const out = Boolean(req.body.out);
  const missing = Boolean(req.body.missing);

  const newInventory = new Inventory({
    username,
    description,
    location,
    date,
    out,
    missing,
  });

  newInventory
    .save()
    .then(() => res.json("Inventory added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
