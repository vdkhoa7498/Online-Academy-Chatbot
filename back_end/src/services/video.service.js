const httpStatus = require('http-status');
const Video = require('../models/video.model');
const ApiError = require('../utils/ApiError');
const Promise = require("bluebird");

const createVideos = async (videoBody) => {
  let videos = []
  const {courseId, videoList} = videoBody
  await Promise.mapSeries(videoList, async (item) => {
    const data = {courseId, ...item}
    const video = await Video.create(data)
    videos = [...videos, video]
  })
  return videos;
};

const getAllVideos = async () => {
  return await Video.find();
};

const queryVideos = async (filter, options) => {
  const videos = await Video.paginate(filter, options);
  return videos;
};

const deleteByCourseId = async (courseId) => {
  return await Video.deleteMany({ courseId: courseId });
}

module.exports = {
  createVideos,
  queryVideos,
  getAllVideos,
  deleteByCourseId
};
