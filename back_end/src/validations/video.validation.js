const Joi = require('joi');
const { objectId } = require('./custom.validation');

const video = Joi.object().keys({
  title: Joi.string().required(),
  url: Joi.string().required(),
})

const createVideos = {
    body: Joi.object().keys({
      courseId: Joi.string().required().custom(objectId),
      videoList: Joi.array().items(video).required(),
    })
};

const getVideos = {
  query: Joi.object().keys({
    search: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createVideos,
  getVideos,
};
