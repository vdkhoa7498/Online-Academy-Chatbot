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

const queryCourses = async (filter, options) => {
  const courses = await Course.paginate(filter, options);
  return courses;
};

const addView = async (courseId) => {
  const course = await Course.findOne({_id: courseId})
  course.view = course.view + 1;
  await course.save();
  return course;
};

module.exports = {
  createCourse,
  queryCourses,
  getAllCourses,
  addView,
};
