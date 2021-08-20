const express = require('express');
const categoryController = require('../../controllers/category.controller');
const validate = require('../../middlewares/validate');
const categoryValidate = require('../../validations/index');
const auth = require('../../middlewares/auth');


const router = express.Router();

router.route('/top-registered-category').get(categoryController.getTopRegisteredCategory);

router
  .route('/')
  .get(categoryController.getCategories)
  .post(auth('admin'), validate(categoryValidate), categoryController.createCategory)
  .put(auth('admin'), validate(categoryValidate), categoryController.editCategory);

router.route('/:categoryId').get(categoryController.getCategoryById).delete(auth('admin'), categoryController.deleteCategory);


module.exports = router;
