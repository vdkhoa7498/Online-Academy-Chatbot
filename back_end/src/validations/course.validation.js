const Joi = require('joi');

const createCourse = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    title: Joi.string().required(),
    picture: Joi.array(),
    description: Joi.string(),
    categoryId: Joi.string().required(),
    voteId: Joi.string(),
    price: Joi.number().required(),
    voucher: Joi.number(),
    studentId: Joi.array(),
    videoId: Joi.array(),
  }),
};

module.exports = {
  createCourse,
};
