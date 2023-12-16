const app = require("./app");

const port = process.env.PORT || 3000;

require("dotenv").config();

app.listen(port, () => {
  console.log("Server running. Use our API on port: 3000");
});
