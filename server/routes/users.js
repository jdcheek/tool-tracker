const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
let User = require("../models/user.model");

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", async (req, res) => {
  // const username = req.body.username;
  // const password = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 10),
    isAdmin: false,
  });

  newUser
    .save()
    .then(() => res.json("User added."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/delete/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch((err) => res.status(400).json("Error " + err));
});

router.post("/update/:id", (req, res) => {
  User.findById(req.params.id)
    .then(async (user) => {
      user.username = req.body.username;
      user.password = await bcrypt.hash(req.body.password, 10);

      user
        .save()
        .then(() => res.json("User updated."))
        .catch((err) => res.status(400).json("Error " + err));
    })
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
