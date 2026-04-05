const express = require("express");
const authMiddleware = require("./middleware/auth.middleware");
const app = express();

app.use(express.json());
app.use(authMiddleware);
app.use("/users", require("./routes/user.routes"));
app.use("/transactions", require("./routes/transaction.route"));
app.use("/dashboard", require("./routes/dashboard.route"));

app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app;

