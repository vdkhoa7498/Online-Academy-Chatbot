const express = require('express');
const categoryController = require('../../controllers/category.controller');
const validate = require('../../middlewares/validate');
const categoryValidate = require('../../validations/index');

const router = express.Router();

router.route('/').get(categoryController.getCategories).post(validate(categoryValidate), categoryController.createCategory);
router.route('/:categoryId').get(categoryController.getCategoryById)

module.exports = router;
