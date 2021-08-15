const express = require('express');
const categoryController = require('../../controllers/category.controller');
const validate = require('../../middlewares/validate');
const categoryValidate = require('../../validations/index');

const router = express.Router();

router.route('/top-registered-category').get(categoryController.getTopRegisteredCategory);

router
  .route('/')
  .get(categoryController.getCategories)
  .post(validate(categoryValidate), categoryController.createCategory)
  .put(validate(categoryValidate), categoryController.editCategory);

router.route('/:categoryId').get(categoryController.getCategoryById).delete(categoryController.deleteCategory);


module.exports = router;
