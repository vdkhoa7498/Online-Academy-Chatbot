const express = require('express');
const categoryController = require('../../controllers/category.controller');
const validate = require('../../middlewares/validate');
const categoryValidate = require('../../validations/index');

const router = express.Router();

router.route('/categories').get(categoryController.getCategoriesAdmin).post(validate(categoryValidate), categoryController.createCategory);

module.exports = router;
