const express = require('express');
const categoryController = require('../../controllers/category.controller');
const courseController = require('../../controllers/course.controller');
const validate = require('../../middlewares/validate');
const categoryValidate = require('../../validations/index');

const router = express.Router();

router.route('/categories').get(categoryController.getCategoriesAdmin)
router.route('/courses').get(courseController.getAllCourses)

module.exports = router;
