const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services/index');

const getCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.send(categories);
});

const getCategoriesAdmin = catchAsync(async (req, res) => {
  const categories = await categoryService.getAllCategoriesAdmin();
  res.send(categories);
})

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});

const getCategoryById = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.categoryId);
  res.send(category);
});

const editCategory = catchAsync(async (req, res) => {
  const category = await categoryService.editCategory(req.body);
  res.status(httpStatus.OK).send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  const message = await categoryService.deleteCategory(req.params.categoryId);
  res.status(httpStatus.OK).send(message);
})

const getTopRegisteredCategory = catchAsync(async (req, res) => {
  const category = await categoryService.getTopRegisteredCategory();
  res.send(category);
});

module.exports = { getCategories, getCategoriesAdmin, createCategory, getCategoryById, editCategory, deleteCategory, getTopRegisteredCategory };
