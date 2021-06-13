const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const watchListSchema = mongoose.Schema({
  videoId: { 
    type: mongoose.SchemaTypes.ObjectId, 
    ref: 'Video', 
    required: true 
  },
  courseId: { 
    type: mongoose.SchemaTypes.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  userId: { 
    type: mongoose.SchemaTypes.ObjectId, 
    ref: 'User', 
    required: true 
  },
  duration: { 
    type: Number, 
    required: true 
  },
},
{
  timestamps: true,
});

// add plugin that converts mongoose to json
watchListSchema.plugin(toJSON);
watchListSchema.plugin(paginate);

const WatchList = mongoose.model('WatchList', watchListSchema);

module.exports = WatchList;
