const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { videoService } = require('../services/index');

const getVideos = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'category']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const courses = await videoService.queryVideos(filter, options);
  res.send(courses);
});

const createVideos = catchAsync(async (req, res) => {
  const course = await videoService.createVideos(req.body);
  res.status(httpStatus.CREATED).send(course);
});


module.exports = {
  getVideos,
  createVideos,
};
