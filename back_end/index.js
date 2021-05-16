const express = require("express");

const PORT = 8888;
const app = express();

const server = app.listen(PORT, () => {
  console.log("listening on ", PORT);
});
