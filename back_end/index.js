const express = require("express");
const auth = require("./routes/auth");
const user = require("./routes/user");

const PORT = 8888;
const app = express();

app.use(express.json());

require("./startup/cors.js")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

// app.use("/auth", auth);
app.use("/users", user);

const server = app.listen(PORT, () => {
  console.log("listening on ", PORT);
});
