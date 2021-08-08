const express = require('express');
const validate = require('../../middlewares/validate');
const videosController = require('../../controllers/video.controller');
const videoValidate = require('../../validations/video.validation');
const auth = require('../../middlewares/auth');
const router = express.Router();

router
  .route('/')
  .get(videosController.getVideos)
  .post(validate(videoValidate.createVideos), videosController.createVideos)
  .put(auth(), validate(videoValidate.setCurrentTime), videosController.setCurrentTime);

module.exports = router;
