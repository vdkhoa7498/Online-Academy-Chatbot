const express = require('express');
const categoryController = require('../../controllers/category.controller');
const courseController = require('../../controllers/course.controller');
const userController = require('../../controllers/user.controller');
const validate = require('../../middlewares/validate');
const categoryValidate = require('../../validations/index');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/categories').get(auth('admin'), categoryController.getCategoriesAdmin)
router.route('/courses').get(courseController.getAllCourses)

router
  .route('/users/:userId')
  .put(auth('admin'), userController.editUserAdmin)
  .delete(auth('admin'), userController.deleteUser);

router.route('/users/lock/:userId').get(auth('admin'), userController.lockUser);
router.route('/users/unlock/:userId').get(auth('admin'), userController.unlockUser);

module.exports = router;
