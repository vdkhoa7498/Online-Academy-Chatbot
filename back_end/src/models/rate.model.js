const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const rateSchema = mongoose.Schema(
  {
    userId: { 
        type: mongoose.SchemaTypes.ObjectId, 
        ref: 'User', 
        required: true 
    },
    courseId: { 
        type: mongoose.SchemaTypes.ObjectId, 
        ref: 'Course', 
        required: true 
    },
    content: { 
        type: String,
    },
    point: { 
        type: Number,
        default: 5
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
rateSchema.plugin(toJSON);
rateSchema.plugin(paginate);

const Rate = mongoose.model('Rate', rateSchema);

module.exports = Rate;
