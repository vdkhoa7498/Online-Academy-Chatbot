const httpStatus = require('http-status');
const Category = require('../models/category.model');
const ApiError = require('../utils/ApiError');

const createCategory = async (categoryBody) => {
  const category = await Category.create(categoryBody);
  return category;
};

const getAllCategories = async () => {
  return await Category.find();
};

const queryCategory = async (filter, options) => {
  const users = await Category.paginate(filter, options);
  return users;
};

const getCategoryById = async (categoryId) => {
  const category =  await Category.findById(categoryId);
  return category
};

module.exports = {
  createCategory,
  queryCategory,
  getAllCategories,
  getCategoryById,
};
