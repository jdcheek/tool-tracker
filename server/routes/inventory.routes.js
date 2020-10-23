const express = require("express");
const { getInventory, createInventory, getInventoryById, deleteInventory, updateInventory } = require("../controllers/inventory.controller");
const router = express.Router();
const Inventory = require("../models/inventory.model");

router.get("/", getInventory);
router.post("/add", createInventory);
router.get("/:id", getInventoryById);
router.delete("/:id", deleteInventory);
router.post("/update/:id", updateInventory);

module.exports = router;
