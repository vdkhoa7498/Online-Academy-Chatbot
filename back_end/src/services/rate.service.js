var ObjectId = require('mongodb').ObjectId;
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Rate = require('../models/rate.model');

const createRate = async (userId, courseId, content) => {
  const rate = await Rate.findOne({courseId: courseId, userId: userId })
  if (rate) {
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

const getRateListByCourseId = async (courseId) => {
  let id = new ObjectId(courseId);
  return await Rate.aggregate([
    {
      $match: {
        courseId: id
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    }
  ])
}

module.exports = {
  createRate,
  getRateListByCourseId
}