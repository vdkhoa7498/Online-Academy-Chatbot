const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services/index');

const getCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.send(categories);
});

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});

module.exports = { getCategories, createCategory };
