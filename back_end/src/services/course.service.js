const httpStatus = require('http-status');
const Course = require('../models/courses.model');
const Category = require('../models/category.model');
const ApiError = require('../utils/ApiError');
const videoService = require('./video.service');
const Video = require('../models/video.model');

const createCourse = async (courseBody) => {
  const course = await Course.create(courseBody);
  return course;
};

const getAllCourses = async () => {
  return await Course.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
      },
    },
  ]);
};

const queryCourses = async (filter, options) => {
  if (filter.search) {
    filter.$text = { $search: filter.search };
    delete filter.search;
  }
  if (filter.rateScoreFilter) {
    filter.rateScore = { $gte: filter.rateScoreFilter };
    delete filter.rateScoreFilter;
  }
  if (filter.priceFilter) {
    if (filter.priceFilter == 0) {
      filter.price = 0;
    } else {
      filter.price = { $ne: 0 };
    }
  }
  console.log(filter);
  const courses = await Course.paginate(filter, options);
  return courses;
};

const queryCoursesByCategoryId = async (filter, options) => {
  if (filter.categoryId) {
    const categories = await Category.find({ parentId: filter.categoryId });
    if (categories.length > 0) {
      filter.categoryId = { $in: [...categories] };
    }
  }
  const courses = await Course.paginate(filter, options);
  return courses;
};

const getCourseById = async (courseId) => {
  const course = await Course.findById(courseId);
  return course;
};

const editCourseById = async (courseId, updateBody) => {
  const course = await Course.findById(courseId);
  Object.assign(course, updateBody);
  await course.save();
  return course;
};

const getLectureListByCourseId = async (courseId) => {
  const lectureList = await Video.find({ courseId: courseId });
  return lectureList;
};

const getOtherCourses = async (currentCourseId, categoryId) => {
  const otherCourses = await Course.find({ categoryId: categoryId, courseId: { $ne: currentCourseId } });
  return otherCourses;
};

const addView = async (courseId) => {
  const course = await Course.findOne({ _id: courseId });
  course.view = course.view + 1;
  await course.save();
  return course;
};

const getVideosOfCourse = async (courseId) => {
  const videos = await Video.find({ courseId });

  return videos;
};

const findWithListId = async (coursesId) => {
  const courses = await Course.find({
    _id: { $in: coursesId },
  });

  const cloneCourses = JSON.parse(JSON.stringify(courses));

  for (let i = 0; i < courses.length; i++) {
    const category = await Category.findById(cloneCourses[i].categoryId);
    cloneCourses[i].category = category.name;
  }

  return cloneCourses;
};

const deleteCourse = async (courseId) => {
  await videoService.deleteByCourseId(courseId);
  await Course.deleteOne({ _id: courseId });
  return 'success';
};

module.exports = {
  createCourse,
  editCourseById,
  queryCourses,
  getAllCourses,
  addView,
  getVideosOfCourse,
  findWithListId,
  getCourseById,
  getLectureListByCourseId,
  getOtherCourses,
  queryCoursesByCategoryId,
  deleteCourse,
};
