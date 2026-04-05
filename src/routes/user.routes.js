const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const role = require("../middleware/role.middleware");

// ✅ ONLY protected routes
router.post("/", role(["admin"]), userController.createUser);
router.get("/", role(["admin", "analyst"]), userController.getUsers);

module.exports = router;