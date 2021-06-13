const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  parentId: { 
    type: mongoose.SchemaTypes.ObjectId, 
    default: null, 
    ref: 'Category' 
  },
},
{
  timestamps: true,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
