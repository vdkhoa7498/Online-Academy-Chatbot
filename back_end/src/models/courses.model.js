const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  picture: { 
    type: String,
    required: true,
  },
  description: { 
    type: String, 
    required: true 
  },
  shortDescription: { 
    type: String, 
    required: true 
  },
  categoryId: { 
    type: mongoose.SchemaTypes.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  status:{
    type: String,
    enum: ['complete', 'incomplete'],
    default: 'incomplete',
  },
  view: { 
    type: Number, 
    default: 0
  },
  price: { 
    type: Number, 
    default: 0
  },
  voucher: { 
    type: Number, 
    default: 0 
  },
  rateScore:{
    type: Number,
    default: 0
  },
  ratings:{
    type: Number,
    default: 0
  },
  lecturerId:{
    type: mongoose.SchemaTypes.ObjectId, 
    required: true, 
    ref: 'User' 
  },
  studentNumber:{
    type: Number,
    default: 0
  },
  preView: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true,
});

// add plugin that converts mongoose to json
courseSchema.plugin(toJSON);
courseSchema.plugin(paginate);

courseSchema.index({title: 'text', description: 'text', shortDescription: 'text'})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
