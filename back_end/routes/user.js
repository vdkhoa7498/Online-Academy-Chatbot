const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const user = await User.find();
  res.send(user);
});

router.post("/", async (req, res) => {
  const { details } = await validate(req.body);
  if (details) return res.status(204).send(details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(204).send("User already registered");

  user = new User(
    _.pick(req.body, ["username", "email", "password", "fullName"])
  );
  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  // const token = user.generateAuth();

  return res.send(_.pick(user, ["_id", "username", "email", "fullName"]));
});

module.exports = router;
