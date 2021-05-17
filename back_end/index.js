const express = require("express");
const cors = require("cors");
const auth = require("./routes/auth");

const PORT = 8888;
const app = express();

app.use(cors());

app.use("/auth", auth);

const server = app.listen(PORT, () => {
  console.log("listening on ", PORT);
});
