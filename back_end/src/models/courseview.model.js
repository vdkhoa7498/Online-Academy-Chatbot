const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const courseViewSchema = mongoose.Schema(
  {
    courseId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Course',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
courseViewSchema.plugin(toJSON);
courseViewSchema.plugin(paginate);

const CourseView = mongoose.model('CourseView', courseViewSchema);

module.exports = CourseView;
