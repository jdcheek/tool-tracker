const express = require("express");
const router = express.Router();
const { getUsers, deleteUser, getUserById, updateUser } = require("../controllers/user.controller");
const { registerUser } = require("../controllers/auth.controller");
const auth = require('../middleware/auth')
//TODO set private routes



router.get("/", auth, getUsers);
router.get("/:id", auth, getUserById);
router.post("/add", auth, registerUser);
router.delete("/delete/:id", auth, deleteUser);
router.post("/update/:id", auth, updateUser);

module.exports = router;
