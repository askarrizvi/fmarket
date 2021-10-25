const mongoose = require('mongoose');

const { Schema } = mongoose;

const stallProductSchema = new Schema({
  details: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0.01
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  }
});

const StallProduct = mongoose.model('StallProduct', stallProductSchema);

module.exports = StallProduct;