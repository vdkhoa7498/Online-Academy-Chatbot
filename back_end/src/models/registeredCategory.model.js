const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const registeredCategorySchema = mongoose.Schema(
  {
    categoryId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
registeredCategorySchema.plugin(toJSON);
registeredCategorySchema.plugin(paginate);

const RegisteredCategory = mongoose.model('RegisteredCategory', registeredCategorySchema);

module.exports = RegisteredCategory;
