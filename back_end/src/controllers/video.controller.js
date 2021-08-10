const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { videoService } = require('../services/index');

const getVideos = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['courseId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const courses = await videoService.queryVideos(filter, options);
  res.send(courses);
});

const createVideos = catchAsync(async (req, res) => {
  const course = await videoService.createVideos(req.body);
  res.status(httpStatus.CREATED).send(course);
});
const setCurrentTime = catchAsync(async (req, res) => {
  const video = await videoService.updateCurrentTime(req.body);

  res.status(200).send('update Success');
});

const deleteVideo = catchAsync(async (req, res) => {
  const message = await videoService.deleteVideoById(req.params.videoId);
  res.status(httpStatus.OK).send(message);
});


module.exports = {
  getVideos,
  createVideos,
  deleteVideo,
  setCurrentTime,
};
