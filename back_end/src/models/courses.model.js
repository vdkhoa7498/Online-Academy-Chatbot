const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  picture: { 
    type: Array,
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
  price: { 
    type: Number, 
    required: true 
  },
  voucher: { 
    type: Number, 
    default: 0 
  },
},
{
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
