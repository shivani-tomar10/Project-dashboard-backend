const db = require("../config/db");

exports.getSummary = async (req, res) => {
  try {
    // Total Income
    const [income] = await db.execute(
      `SELECT SUM(amount) AS total FROM transactions WHERE type = 'income'`
    );

    // Total Expense
    const [expense] = await db.execute(
      `SELECT SUM(amount) AS total FROM transactions WHERE type = 'expense'`
    );

    // Category Breakdown
    const [categories] = await db.execute(`
      SELECT category, SUM(amount) AS total
      FROM transactions
      GROUP BY category
    `);

    // Recent Transactions
    const [recent] = await db.execute(`
      SELECT * FROM transactions
      ORDER BY date DESC
      LIMIT 5
    `);

    const totalIncome = income[0].total || 0;
    const totalExpense = expense[0].total || 0;

    res.json({
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
      categoryBreakdown: categories,
      recentTransactions: recent
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};