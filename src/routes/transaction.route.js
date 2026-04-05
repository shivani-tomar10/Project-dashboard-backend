const express = require("express");
const router = express.Router();
const controller = require("../controllers/transaction.controller");
const role = require("../middleware/role.middleware");

// Only admin can create
router.post("/", role(["admin"]), controller.createTransaction);

// Admin + Analyst can read
router.get("/", role(["admin", "analyst"]), controller.getTransactions);

module.exports = router;
