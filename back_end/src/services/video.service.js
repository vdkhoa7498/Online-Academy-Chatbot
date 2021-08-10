const httpStatus = require('http-status');
const Video = require('../models/video.model');
const ApiError = require('../utils/ApiError');
const Promise = require('bluebird');

const createVideos = async (videoBody) => {
  let videos = [];
  const { courseId, videoList } = videoBody;
  await Promise.mapSeries(videoList, async (item) => {
    const data = { courseId, ...item };
    const video = await Video.create(data);
    videos = [...videos, video];
  });
  return videos;
};

const getAllVideos = async () => {
  return await Video.find();
};

const queryVideos = async (filter, options) => {
  const videos = await Video.paginate(filter, options);
  return videos;
};
const updateCurrentTime = async ({ videoId, userId, currentTime }) => {
  const videos = await Video.findById(videoId);
  const userTime = videos.lastWatchTime.find((v) => v.userId.equals(userId));
  if (userTime) userTime.time = currentTime;
  else videos.lastWatchTime.push({ userId, time: currentTime });

  await videos.save();
  return videos;
};

const deleteByCourseId = async (courseId) => {
  return await Video.deleteMany({ courseId: courseId });
};

module.exports = {
  createVideos,
  queryVideos,
  getAllVideos,
  deleteByCourseId,
  updateCurrentTime,
};
