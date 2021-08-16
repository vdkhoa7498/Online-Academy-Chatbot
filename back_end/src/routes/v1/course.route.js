const express = require('express');
const validate = require('../../middlewares/validate');
const coursesController = require('../../controllers/course.controller');
const courseValidate = require('../../validations/course.validation');
const router = express.Router();

router
  .route('/')
  .get(coursesController.getCourses)
  .post(validate(courseValidate.createCourse), coursesController.createCourse);

router.post('/addView', coursesController.addView);
router.get('/high-light', coursesController.getHighLightCourses);

router.get('/:courseId', coursesController.getCourseById);
router.delete('/:courseId', coursesController.deleteCourse);
router.put('/:courseId', validate(courseValidate.editCourse), coursesController.editCourseById);

router.get('/category/:categoryId', coursesController.getCoursesByCategoryId);
router.get('/learning/:courseId', coursesController.getVideoOfCourse);

module.exports = router;
