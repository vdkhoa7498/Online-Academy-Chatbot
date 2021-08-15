const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { courseService, rateService, userService } = require('../services/index');

const getCourses = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'category', 'lecturerId', 'search', 'rateScoreFilter', 'priceFilter']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const courses = await courseService.queryCourses(filter, options);
  res.send(courses);
});

const getAllCourses = catchAsync(async (req, res) => {
  const allCourses = await courseService.getAllCourses();
  res.send(allCourses);
})

const getCoursesByCategoryId = catchAsync(async (req, res) => {
  const filter = pick(req.params, ['categoryId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const courses = await courseService.queryCoursesByCategoryId(filter, options);
  res.send(courses);
});

const getCourseById = catchAsync(async (req, res) => {
  // Basic info
  let course = await courseService.getCourseById(req.params.courseId);
  course = course.toObject();

  // Count students
  let countStudents = await userService.countStudentsByCourseId(req.params.courseId);
  course.countStudents = countStudents;

  // Lectures
  const lectures = await courseService.getLectureListByCourseId(req.params.courseId);
  course.lectures = lectures;

  // Other courses
  const otherCourses = await courseService.getOtherCourses(course._id, course.categoryId);
  course.otherCourses = [];
  otherCourses.forEach(otherCourse => {
    course.otherCourses.push(otherCourse.toObject());
  });

  // Lecturer details
  const lecturerDetails = await getLecturerDetails(course.lecturerId);
  course.lecturerDetails = lecturerDetails;

  // Rates
  let rates = await rateService.getRateListByCourseId(req.params.courseId);
  course.rates = rates;
  let rateScore = 0;
  rates.forEach(rate => { rateScore += rate.point});
  rateScore /= rates.length;
  course.rateScore = rateScore;
  course.ratings = rates.length;

  res.send(course);
});

const getLecturerDetails = async (lecturerId) => {
  // Basic info
  let lecturerDetails = await userService.getLecturerInfo(lecturerId);
  lecturerDetails = lecturerDetails.toObject();

  // Get all courses owned
  let coursesOwned = await courseService.getCoursesByLecturerId(lecturerId);
  lecturerDetails.countCourses = coursesOwned.length;

  // For each course count stundents and get rates
  let countStudents = 0;
  let rateScore = 0;
  let ratings = 0;
  for (const course of coursesOwned) {
    const count = await userService.countStudentsByCourseId(course._id.toString());
    countStudents += count;

    let rates = await rateService.getRateListByCourseId(course._id);
    ratings += rates.length;
    rates.forEach(rate => { rateScore += rate.point });
  };
  rateScore /= ratings;

  lecturerDetails.countStudents = countStudents;
  lecturerDetails.rateScore = rateScore;
  lecturerDetails.ratings = ratings;

  return lecturerDetails;
}

const editCourseById = catchAsync(async (req, res) => {
  // Basic info
  let course = await courseService.editCourseById(req.params.courseId, req.body);
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

const deleteCourse = catchAsync(async (req, res) => {
  const message = await courseService.deleteCourse(req.params.courseId);
  res.status(httpStatus.OK).send(message);
});

const getVideoOfCourse = catchAsync(async (req, res) => {
  const videos = await courseService.getVideosOfCourse(req.params.courseId);
  res.status(httpStatus.OK).send(videos);
});

module.exports = {
  getCourses,
  getAllCourses,
  createCourse,
  addView,
  getCoursesByCategoryId,
  getCourseById,
  deleteCourse,
  getVideoOfCourse,
  editCourseById,
};
