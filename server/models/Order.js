const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'StallProduct'
    } 
  ]
});

/*
    {
      type: Schema.Types.ObjectId,
      ref: 'Stall.products'
    } 
    */

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
