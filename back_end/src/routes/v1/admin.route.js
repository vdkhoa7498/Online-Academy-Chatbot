const express = require('express');
const categoryController = require('../../controllers/category.controller');
const courseController = require('../../controllers/course.controller');
const userController = require('../../controllers/user.controller');
const validate = require('../../middlewares/validate');
const categoryValidate = require('../../validations/index');

const router = express.Router();

router.route('/categories').get(categoryController.getCategoriesAdmin)
router.route('/courses').get(courseController.getAllCourses)

router
  .route('/users/:userId')
  .put(userController.editUserAdmin)
  .delete(userController.deleteUser);

router.route('/users/lock/:userId').get(userController.lockUser);
router.route('/users/unlock/:userId').get(userController.unlockUser);

module.exports = router;
