const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const videoSchema = mongoose.Schema(
  {
    courseId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Course',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    lastWatchTime: [
      {
        userId: mongoose.SchemaTypes.ObjectId,
        time: String,
        watchedPercent: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
videoSchema.plugin(toJSON);
videoSchema.plugin(paginate);

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
