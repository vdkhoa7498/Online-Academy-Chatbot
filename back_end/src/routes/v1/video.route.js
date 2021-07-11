const express = require('express');
const validate = require('../../middlewares/validate');
const videosController = require('../../controllers/video.controller');
const videoValidate = require('../../validations/video.validation');
const router = express.Router();

router
  .route('/')
  .get(videosController.getVideos)
  .post(validate(videoValidate.createVideos), videosController.createVideos);

module.exports = router;
