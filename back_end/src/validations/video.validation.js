const Joi = require('joi');
const { objectId } = require('./custom.validation');

const video = Joi.object().keys({
  title: Joi.string().required(),
  url: Joi.string().required(),
});

const createVideos = {
  body: Joi.object().keys({
    courseId: Joi.string().required().custom(objectId),
    videoList: Joi.array().items(video).required(),
  }),
};

const getVideos = {
  query: Joi.object().keys({
    search: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const setCurrentTime = {
  body: Joi.object().keys({
    videoId: Joi.string().required().custom(objectId),
    userId: Joi.string().required().custom(objectId),
    currentTime: Joi.number().required(),
  }),
};

const deleteVideo = {
  params: Joi.object().keys({
    videoId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createVideos,
  getVideos,
  deleteVideo,
  setCurrentTime,
};
