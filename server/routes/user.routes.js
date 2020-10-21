const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { getUsers, deleteUser, getUserById, updateUser } = require("../controllers/user.controller");
const { registerUser } = require("../controllers/auth.controller");

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/add", registerUser);
router.delete("/delete/:id", deleteUser);
router.post("/update/:id", updateUser);

module.exports = router;
