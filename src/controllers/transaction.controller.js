const db = require("../config/db");

// Create Transaction
exports.createTransaction = async (req, res) => {
  try {
    const { amount, type, category, date } = req.body;

    if (!amount || !type || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const [result] = await db.execute(
      `INSERT INTO transactions (amount, type, category, date, user_id)
       VALUES (?, ?, ?, ?, ?)`,
      [amount, type, category, date, req.user.id]
    );

    res.json({
      message: "Transaction created",
      transactionId: result.insertId
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Transactions
exports.getTransactions = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT * FROM transactions ORDER BY date DESC`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
