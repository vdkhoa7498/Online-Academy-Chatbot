const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { courseService } = require('../services/index');

const getCourses = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'category']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const courses = await courseService.queryCourses(filter, options);
  res.send(courses);
});

const getCoursesByCategoryId = catchAsync(async (req, res) => {
  const filter = pick(req.params, ['categoryId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const courses = await courseService.queryCoursesByCategoryId(filter, options);
  res.send(courses);
});

const getCourseById = catchAsync(async (req, res) => {
  const course = await courseService.getCourseById(req.params.courseId);
  res.send(course);
});

const createCourse = catchAsync(async (req, res) => {
  const course = await courseService.createCourse(req.body);
  res.status(httpStatus.CREATED).send(course);
});

const addView = catchAsync(async (req, res) => {
  courseId = req.body.courseId;
  const course = await courseService.addView(courseId);
  res.status(httpStatus.OK).send(course);
});

const getVideoOfCourse = catchAsync(async (req, res) => {
  const videos = await courseService.getVideosOfCourse(req.params.courseId)
  console.log("videos", videos);
  res.status(httpStatus.OK).send(videos)
})

module.exports = {
  getCourses,
  createCourse,
  addView,
  getCoursesByCategoryId,
  getCourseById,
  getVideoOfCourse
};
