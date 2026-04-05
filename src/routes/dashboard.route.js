const express = require("express");
const router = express.Router();
const controller = require("../controllers/dashboard.controller");
const role = require("../middleware/role.middleware");

// Only analyst & admin can access
router.get("/summary", role(["admin", "analyst"]), controller.getSummary);

module.exports = router;