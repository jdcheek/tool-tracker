
const { Router } = require("express");
const router = Router();
const { loginUser, logOutUser, getUserStatus } = require("../controllers/auth.controller");


router.post("/login", loginUser);
router.get("/logout", logOutUser)
router.get("/status", getUserStatus)

module.exports = router;