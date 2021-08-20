const express = require('express');
const validate = require('../../middlewares/validate');
const coursesController = require('../../controllers/course.controller');
const courseValidate = require('../../validations/course.validation');
const router = express.Router();
const auth = require('../../middlewares/auth');

router
  .route('/')
  .get(coursesController.getCourses)
  .post(auth('lecturer'), validate(courseValidate.createCourse), coursesController.createCourse);

router.post('/addView', coursesController.addView);
router.get('/high-light', coursesController.getHighLightCourses);

router.get('/:courseId', coursesController.getCourseById);
router.delete('/:courseId', auth('lecturer'), coursesController.deleteCourse);
router.put('/:courseId', auth('lecturer'), validate(courseValidate.editCourse), coursesController.editCourseById);

router.get('/category/:categoryId', coursesController.getCoursesByCategoryId);
router.get('/learning/:courseId', auth('student'), coursesController.getVideoOfCourse);

router.get('/lock/:courseId', auth('admin'), coursesController.lockCourse);
router.get('/unlock/:courseId', auth('admin'), coursesController.unlockCourse);

module.exports = router;
