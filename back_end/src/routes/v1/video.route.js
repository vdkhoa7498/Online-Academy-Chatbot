const express = require('express');
const validate = require('../../middlewares/validate');
const videosController = require('../../controllers/video.controller');
const videoValidate = require('../../validations/video.validation');
const auth = require('../../middlewares/auth');
const router = express.Router();

router
  .route('/')
  .get(auth(), videosController.getVideos)
  .post(auth('lecturer'), validate(videoValidate.createVideos), videosController.createVideos)
  .put(auth('student'), validate(videoValidate.setCurrentTime), videosController.setCurrentTime);

router.delete('/:videoId', validate(videoValidate.deleteVideo), videosController.deleteVideo);

module.exports = router;
