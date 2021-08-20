const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCourse = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    picture: Joi.string(),
    description: Joi.string().required(),
    shortDescription: Joi.string().required(),
    categoryId: Joi.string().required().custom(objectId),
    lecturerId: Joi.string().required().custom(objectId),
    preView: Joi.number(),
    price: Joi.number(),
    voucher: Joi.number(),
    status: Joi.string(),
  }),
};

const editCourse = {
  params: Joi.object().keys({
    courseId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    picture: Joi.string(),
    description: Joi.string().required(),
    shortDescription: Joi.string().required(),
    categoryId: Joi.string().required().custom(objectId),
    preView: Joi.number(),
    price: Joi.number(),
    voucher: Joi.number(),
    status: Joi.string(),
  }),
};

const getCourses = {
  query: Joi.object().keys({
    title: Joi.string(),
    category: Joi.string(),
    search: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createCourse,
  getCourses,
  editCourse,
};
