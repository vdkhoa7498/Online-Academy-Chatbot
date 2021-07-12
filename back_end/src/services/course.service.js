const httpStatus = require('http-status');
const Course = require('../models/courses.model');
const Category = require('../models/category.model');
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

const queryCoursesByCategoryId = async (filter, options) => {
  const courses = await Course.paginate(filter, options);
  return courses;
};

const getCourseById = async (courseId) => {
  const course =  await Course.findById(courseId);
  return course
};

const addView = async (courseId) => {
  const course = await Course.findOne({_id: courseId})
  course.view = course.view + 1;
  await course.save();
  return course;
};

const findWithListId = async(coursesId) => {
  const courses = await Course.find({
    '_id': { $in: coursesId}
  })

  const cloneCourses = JSON.parse(JSON.stringify(courses));

  for (let i = 0; i < courses.length; i++) {
    const category = await Category.findById(cloneCourses[i].categoryId);
    cloneCourses[i].category = category.name;
  }

  return cloneCourses;
}

module.exports = {
  createCourse,
  queryCourses,
  getAllCourses,
  addView,
  findWithListId,
  getCourseById,
  queryCoursesByCategoryId,
};
