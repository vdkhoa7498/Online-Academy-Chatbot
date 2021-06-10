const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  picture: { type: Array }, //  required: true,,
  description: { type: String, required: true },
  categoryId: { type: String, required: true },
  voteId: { type: Array },
  price: { type: Number, required: true },
  voucher: { type: Number, default: 0 },
  lastUpdate: { type: Date, default: new Date() },
  studentId: { type: Array },
  videoId: { type: Array },
  averageRate: { type: Number, default: 0 },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
