const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Rate = require('../models/rate.model');

const createRate = async (userId, courseId, content) => {
  const rate = await Rate.findOne({courseId: courseId, userId: userId })
  if (rate) {
    console.log("rate", rate);
    return null;
  }
  const newRate = new Rate();
  newRate.userId = userId;
  newRate.courseId = courseId;
  newRate.content = content.content;
  newRate.point = content.rate;

  await newRate.save();

  return newRate;
}

module.exports = {
  createRate
}