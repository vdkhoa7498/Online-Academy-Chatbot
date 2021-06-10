const httpStatus = require('http-status');
const Course = require('../models/courses.model');
const ApiError = require('../utils/ApiError');

const createCourse = async (courseBody) => {
  const course = await Course.create(courseBody);
  return course;
};

const getAllCourses = async () => {
  return await Course.find();
};

const queryCourse = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

module.exports = {
  createCourse,
  queryCourse,
  getAllCourses,
};
