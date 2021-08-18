const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { rateService, courseService } = require('../services');

const createRate = catchAsync(async (req, res) => {
  const rate = await rateService.createRate(req.user.id, req.params.courseId, req.body);

  return res.status(200).send(rate);
});

module.exports = {
  createRate,
};
