const express = require('express');
const validate = require('../../middlewares/validate');
const coursesController = require('../../controllers/course.controller');
const courseValidate = require('../../validations/course.validation');
const router = express.Router();

router
  .route('/')
  .get(coursesController.getCourses)
  .post(validate(courseValidate.createCourse), coursesController.createCourse);

router.post('/addView',  coursesController.addView);

router.get('/:courseId', coursesController.getCourseById)
router.get('/category/:categoryId', coursesController.getCoursesByCategoryId)

module.exports = router;
