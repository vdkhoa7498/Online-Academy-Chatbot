const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const otpSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expires: {
        type: Date,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
otpSchema.plugin(toJSON);

/**
 * @typedef otp
 */
const otp = mongoose.model('otp', otpSchema);

module.exports = otp;
