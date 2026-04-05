const db = require("../config/db");

// Create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email required" });
    }

    const [result] = await db.execute(
      "INSERT INTO users (name, email, role) VALUES (?, ?, ?)",
      [name, email, role || "viewer"]
    );

    res.json({
      message: "User created successfully",
      userId: result.insertId
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Users
exports.getUsers = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};