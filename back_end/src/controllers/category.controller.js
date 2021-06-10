const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const getCategories = catchAsync(async (req, res) => {
  console.log('Get category');
});

const createCategory = catchAsync(async (req, res) => {
  console.log('Create category');
});

module.exports = { getCategories, createCategory };
