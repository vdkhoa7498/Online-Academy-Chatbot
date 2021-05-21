const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  fullName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  // isAdmin: Boolean,
  // isTeacher: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      email: this.email,
      // isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

async function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    fullName: Joi.string().min(2).max(255).required(),
  });

  try {
    return await schema.validateAsync(user);
  } catch (error) {
    return error;
  }
}

exports.User = User;
exports.validate = validateUser;
