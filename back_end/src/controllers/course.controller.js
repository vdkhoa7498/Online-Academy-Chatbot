const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { courseService } = require('../services/index');

const getCourses = catchAsync(async (req, res) => {
  const courses = await courseService.getAllCourses();
  res.send(courses);
});

const createCourse = catchAsync(async (req, res) => {
  const course = await courseService.createCourse(req.body);
  res.status(httpStatus.CREATED).send(course);
});

module.exports = {
  getCourses,
  createCourse,
};
