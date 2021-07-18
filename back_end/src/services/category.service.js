const httpStatus = require('http-status');
const Category = require('../models/category.model');
const Course = require('../models/courses.model');
const ApiError = require('../utils/ApiError');

const createCategory = async (categoryBody) => {
  const category = await Category.create(categoryBody);
  return category;
};

const getAllCategories = async () => {
  return await Category.find();
};

const getAllCategoriesAdmin = async () => {
  const allCategories = await Category.find();

  // Total courses group by category
  const coursesGroupByCategory = await Course.aggregate([
    {
      $group: {
        _id: '$categoryId',
        totalCourses: {
          $sum: 1
        }
      }
    }
  ]);
  // Join with all
  for (let i = 0; i < allCategories.length; i++) {
    let found = false;
    for (let j = 0; j < coursesGroupByCategory.length; j++) {
      if (allCategories[i]._id.equals(coursesGroupByCategory[j]._id)) {
        found = true;
        allCategories[i] = allCategories[i].toObject();
        allCategories[i].totalCourses = coursesGroupByCategory[j].totalCourses;
        break;
      }
    }
    if (!found) {
      allCategories[i] = allCategories[i].toObject();
      allCategories[i].totalCourses = 0;
    }
  }
  // Sum for parent
  for (let i = 0; i < allCategories.length; i++) {
    for (let j = 0; j < allCategories.length; j++) {
      if (allCategories[i]._id.equals(allCategories[j].parentId)) {
        allCategories[i].totalCourses += allCategories[j].totalCourses;
      }
    }
  }

  return allCategories;
}

const queryCategory = async (filter, options) => {
  const users = await Category.paginate(filter, options);
  return users;
};

const getCategoryById = async (categoryId) => {
  const category =  await Category.findById(categoryId);
  return category
};

const editCategory = async (categoryBody) => {
  const category = await Category.findOne({ _id: categoryBody._id })
  category.name = categoryBody.name;
  category.parentId = categoryBody.parentId;
  category.save();
  return category;
};

const deleteCategory = async (categoryId) => {
  await Category.deleteOne({ _id: categoryId })
  return 'success';
}

module.exports = {
  createCategory,
  queryCategory,
  getAllCategories,
  getAllCategoriesAdmin,
  getCategoryById,
  editCategory,
  deleteCategory
};
