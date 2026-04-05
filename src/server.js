require("dotenv").config();
require("./config/db");
const app = require("./app.js");

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});