const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!config.get("requiresAuth")) return next();

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("No token provided");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(400).send("Invalid token");
  }
};
