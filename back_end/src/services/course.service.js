const httpStatus = require('http-status');
const Course = require('../models/courses.model');
const Category = require('../models/category.model');
const ApiError = require('../utils/ApiError');
const videoService = require('./video.service');
const Video = require('../models/video.model');
const CourseView = require('../models/courseview.model');

const createCourse = async (courseBody) => {
  courseBody.description = courseBody.description.replace(/&lt;/g, '<');
  const course = await Course.create(courseBody);
  return course;
};

const getHighLightCourses = async () => {
  const courses = await CourseView.aggregate([
    {
      $group: {
        _id: {
          courseId: "$courseId",
          week: { $week: new Date("$createdAt") }
        },
        count: { $sum: 1 },
      },
    },
    {
      $limit: 4,
    },
    { $sort : { count: -1 } },
  ]);
  let courseIdList = []
  courses.map((item)=>{
    courseIdList=[...courseIdList, item._id.courseId]
  })
  const results = await Course.paginate({_id: {$in: courseIdList}}, {})
  return results;
};

const getAllCourses = async () => {
  return await Course.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'lecturerId',
        foreignField: '_id',
        as: 'lecturer'
      }
    }
  ]);
};

const queryCourses = async (filter, options) => {
  filter.disabled=false;
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

const getCoursesByLecturerId = async (lecturerId) => {
  const result = await Course.find({ lecturerId: lecturerId });
  return result;
}

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
  const otherCourses = await Course.find({ categoryId: categoryId, _id: { $ne: currentCourseId } });
  return otherCourses;
};

const addView = async (courseId) => {
  await CourseView.create({courseId})
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

const lockCourse = async (courseId) => {
  let course = await Course.findOne({ _id: courseId });
  course.disabled = true;
  await course.save();
  return 'success';
}

const unlockCourse = async (courseId) => {
  let course = await Course.findOne({ _id: courseId });
  course.disabled = false;
  await course.save();
  return 'success';
}

module.exports = {
  getHighLightCourses,
  createCourse,
  editCourseById,
  queryCourses,
  getAllCourses,
  addView,
  getVideosOfCourse,
  findWithListId,
  getCourseById,
  getCoursesByLecturerId,
  getLectureListByCourseId,
  getOtherCourses,
  queryCoursesByCategoryId,
  deleteCourse,
  lockCourse,
  unlockCourse
};
